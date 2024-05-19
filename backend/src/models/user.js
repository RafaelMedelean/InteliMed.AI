// src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: String,
    isMedic: Boolean,
    university: String});

const User = mongoose.model('User', userSchema);

export default User;


// Path: backend/src/config/db.js