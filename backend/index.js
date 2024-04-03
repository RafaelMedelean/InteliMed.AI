// server.js
import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import passport from 'passport';
import session from 'express-session';
import initializePassport from './src/config/passportConfig.js';
const app = express();
const PORT = process.env.PORT || 8001;
const corsOptions = {
    origin: 'http://localhost:5173', // or your frontend origin
    credentials: true, // to allow cookies
  };
  
  app.use(cors(corsOptions));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(
    session({
        secret: 'secret',  // Alegeți un secret real pentru producție
        resave: false,  // De obicei setat la false pentru magazine de sesiuni bazate pe store
        saveUninitialized: false,  // Nu salvați sesiuni neinițializate
        cookie: {
            httpOnly: true,  // Îmbunătățiți securitatea prin setarea cookie-urilor ca HttpOnly
            secure: false,  // Setat la true dacă sunteți în HTTPS
            maxAge: 1000 * 60 * 60 * 24,  // Expiră după 24 de ore
        },
    })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    initializePassport(passport);
    

app.use('/public', express.static('public'));

// Routes
app.use('/api/users', userRoutes);

const startServer = async () => {
    await connectDB(); // Connect to the database
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

startServer();
