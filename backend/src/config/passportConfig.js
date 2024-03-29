
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user.js';
import passport from 'passport';

export default function initializePassport(passport) {
    console.log('passport initialized');
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
            // Match user by email or username
            try {
                // Determine if 'username' is an email or a username
              //  console.log(username);
                const isEmail = username.includes('@');
                const query = isEmail ? { email: username } : { username: username };

                const user = await User.findOne(query);
                if (!user) {
                    return done(null, false, { message: 'No user found with that email or username' });
                }

                // Match password
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            } catch (err) {
                console.log(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
