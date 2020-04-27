require('dotenv').config();
import express from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import Joi from '@hapi/joi';

const secret = process.env.JWT_SECRET_KEY;
const router = express.Router();


module.exports = function (app, db) {
    const usersCollection = db.collection('users');
    console.log('entramos a users');

    const opts = {
        jwtFromRequest: req => req.cookies && req.cookies.jwt,
        secretOrKey: secret
    };
    
    passport.use(
        'jwt',
        new JwtStrategy(opts, (payload, done) => {
            // try {
            // } catch (err) {
            // }
            console.log('received cookie info', payload);
            return done(null, payload.user);
        })
    );
    

    app.get('/second', async (req, res) => {
        try {
            const users = await usersCollection.find({}).toArray();
            res.json(users)
        } catch (err) {
            console.error(err);
        }
    });

    // LOGIN for user
    app.get('/signin', (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
            try {
                if (err || !user) {
                    const error = new Error('An Error occurred');
                    return res.sendStatus(401) && next(error);
                };
                console.log('Show me here the info ???', info);
                req.login(user, { session: false }, async error => {
                    if (error) return next(error);
                    const token = await jwt.sign({ user }, secret, { expiresIn: '1d' });
                    if (!token) return res.status(500).json(err);
                    res.cookie('jwt', token, {
                        expires: new Date(Date.now() + 259200), // 3 días
                        httpOnly: true })
                        .send();
                    return res.json({ jwt: token });
                });

            } catch(error) {
                next(error);
            }
        });
    });

    // insert NEW user
    app.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {

        res.json({
            message: 'Logged in successfully!',
            user: req.user
        });
       
    });

};
