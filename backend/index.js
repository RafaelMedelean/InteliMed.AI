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
import { MongoClient, ServerApiVersion } from "mongodb";
//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   OpenAi API key
dotenv.config();
const MONGOURL = process.env.MONGO_URL;
const client = new MongoClient(MONGOURL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8001 ;
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

app.use('/public', express.static(path.join(__dirname, 'public')));

app.post('/upload', (req, res) => {
    const { image } = req.body;
    console.log(image);
    
    // console.log(image);

        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).json({ error: 'Failed to save image' });
        }
        res.json({ filename });

});


// app.get('/threeimg', (req, res) => {
//     const imagesDirectory = path.join(__dirname, 'public', 'images');
//     console.log(imagesDirectory);
//     fs.readdir(imagesDirectory, (err, files) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to list images' });
//         }

//         const imageUrls = files.map(file => `http://localhost:${PORT}/images/${file}`);
//         res.json(imageUrls);
//     });
// });

let latestResult = {}; // Variable to store the latest result




// POST endpoint to receive the selected value and determine the result
app.post('/nodulevar', async (req, res) => {
    const { selectedValue } = req.body;
     console.log(`Received ANA ARE MERE selection: ${selectedValue}`);

    if (selectedValue === true) {
        // If client sends true, respond with a positive message
        latestResult = {
            success: true,
            message: "Congrats, your input is valuable!"
        };
    } else {
       
        const messages = [
            "Understand what lung nodules are: small growths on the lungs, often detected through X-rays or CT scans.",
            "Know that not all lung nodules are cancerous; many are benign and don't require treatment.",
            "Learn about the causes of lung nodules, including infections, inflammation, and previous illnesses.",
            "Familiarize yourself with the symptoms of lung nodules, though many are asymptomatic and found incidentally.",
            "Research how lung nodules are diagnosed through imaging tests and, in some cases, biopsy procedures.",
            "Explore the different treatment options for lung nodules, depending on their cause and risk factors.",
            "Understand the importance of regular follow-up imaging to monitor changes in the size or appearance of lung nodules.",
            "Educate yourself on the risk factors for malignant lung nodules, including smoking and family history.",
            "Read about recent studies and advancements in the detection and treatment of lung nodules.",
            "Consult with healthcare professionals or thoracic specialists for personalized advice and information."
        ];
        const randomIndex = Math.floor(Math.random() * messages.length); // Adjusted to ensure it covers all indices from 0 to 9

        // Pick a random message from the messages array
        const randomMessage = messages[randomIndex];
        
        // Example of printing all messages
        messages.forEach((message, index) => {
            console.log(`${index + 1}: ${message}`);
        });
        
        latestResult = {
            success: false,
            message: randomMessage // Replace this with the actual API response
        };


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



app.get('/external-api-data', async (req, res) => {
    try {
        // Replace 'https://api.external.com/data' with the actual API URL you want to fetch data from
        const response = await axios.get('https://api.external.com/data');
        
        // Send the data received from the external API back to the client
        res.json(response.data);
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error fetching data from external API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); 

app.listen(PORT, async () => {
    await run()
    console.log(`Server is running on port ${PORT}`);
});