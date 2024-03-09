import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken'; // For generating JWT tokens
import axios from 'axios'; // For making HTTP requests
//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   OpenAi API key
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure this is a secure secret in your .env file

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(MONGOURL)
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection error:', err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    donation: String,
    gender: String,
    intro: String,
    isMedic: Boolean,
    university: String
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
    try {
        const { username, password, email, phoneNumber, donation, gender, intro, isMedic, university } = req.body;
        console.log(req.body);
        if (!(username && password && email)) { // Basic validation for required fields
            return res.status(400).json({ error: 'Username, password, and email are required' });
        }
    // console.log("username:", username, "email:", email, "password:", password, "phoneNumber:", phoneNumber, "donation:", donation);
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            phoneNumber,
            donation,
            gender,
            intro,
            isMedic: isMedic === 'true' ? true : false,
            university
        });
// console.log(newUser);
        await newUser.save();

        // Prepare the response, excluding the password
        const userForResponse = { ...newUser.toObject() };
        delete userForResponse.password;
        res.status(201).json(userForResponse);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

        res.json({ token }); // Send the token to the client
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.get('/threeimg', (req, res) => {
    const imagesDirectory = path.join(__dirname, 'public', 'images');

    fs.readdir(imagesDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to list images' });
        }

        const imageUrls = files.map(file => `http://localhost:${PORT}/images/${file}`);
        res.json(imageUrls);
    });
});

let latestResult = {}; // Variable to store the latest result




// POST endpoint to receive the selected value and determine the result
app.post('/nodulevar', async (req, res) => {
    const { selectedValue } = req.body;
    // console.log(`Received selection: ${selectedValue}`);

    if (selectedValue === true) {
        // If client sends true, respond with a positive message
        latestResult = {
            success: true,
            message: "Congrats, your input is valuable!"
        };
    } else {
        // Placeholder for when client sends false
        // Implement your logic here, for example, calling an external API
        // This is a simplified example to simulate a dynamic response
        const simulatedResponse = "AI, or Artificial Intelligence, is the simulation of human intelligence in machines that are programmed to think and learn like humans.";

        latestResult = {
            success: false,
            message: simulatedResponse // Replace this with the actual API response
        };

        // Below is a commented-out template for making an API call with axios
        /*
        try {
            const response = await axios.post('https://api.your-external-service.com', data, { headers: headers });
            latestResult = {
                success: false,
                message: response.data.someRelevantField // Adjust according to the actual response structure
            };
        } catch (error) {
            console.error('Error calling the external service:', error);
            return res.status(500).send({ error: 'Error processing the request with the external service' });
        }
        */
    }

    res.status(200).json(latestResult);
});

// GET endpoint to return the latest result
app.get('/submissionResult', (req, res) => {
    // Check if there's an answer stored
    if (latestResult.answer || latestResult.message) {
        res.status(200).json(latestResult);
    } else {
        res.status(404).send({ error: 'No result found. Please use /ask or /nodulevar to generate a new result.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
