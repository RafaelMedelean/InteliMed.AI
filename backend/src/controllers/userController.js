// src/controllers/userController.js
import User from '../models/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// This is your controller function for handling sign-ups.
export const signupUser = async (req, res) => {
    try {
        const { username, password, email, phoneNumber, donation, gender, intro, isMedic, university } = req.body;

        // Basic validation for required fields
        if (!(username && password && email)) {
            return res.status(400).json({ error: 'Username, password, and email are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            phoneNumber,
            donation,
            gender,
            intro,
            isMedic: isMedic === 'true',
            university
        });

        await newUser.save();

        // Prepare the response, excluding the password
        const userForResponse = { ...newUser.toObject() };
        delete userForResponse.password;
        res.status(201).json(userForResponse);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
};

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find the user either by username or email
        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Check if the provided password matches the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

        // Send the token to the client
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.toString() });
    }
};