// src/routes/userRoutes.js
import express from 'express';
import { loginUser, signupUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

export default router;

// src/controllers/userController.js