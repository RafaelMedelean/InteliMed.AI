// server.js
import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/public', express.static('public'));

// Routes
app.use('/api/users', userRoutes);

const startServer = async () => {
    await connectDB(); // Connect to the database
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

startServer();
