require('dotenv').config();
import express from 'express';
import jwt from 'jsonwebtoken';
import { passport, generateToken } from '../auth/auth';
import Joi from '@hapi/joi';

const secret = process.env.JWT_SECRET_KEY;

const router = express.Router();
const loginRedirection = {
    successRedirect: '/:userId/songs',
    failureRedirect: '/login',
    failureFlash: true,
};

module.exports = function (app, db) {
    const usersCollection = db.collection('users');
    console.log('entramos a users');

    app.get('/second', async (req, res) => {
        try {
            const users = await usersCollection.find({}).toArray();
            res.json(users)
        } catch (err) {
            console.error(err);
        }
    });

    // insert NEW user
    app.post('/registration', passport.authenticate('registration', { session: false }),
        async (req, res, next) => {
            res.json({
                message: 'Logged in successfully!',
                user: req.user
            });

    });

    const redirection = {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    };

    // LOGIN for user
    app.post('/login', async (req, res, next) => {
        console.log('ENTRO AL LOGIN');
        passport.authenticate('login', async (err, user, info) => {
            try {
                console.log('entro???');
                if (err || !user) {
                    const error = new Error('An Error occurred while authentication');
                    return res.sendStatus(401) && next(error);
                };
                console.log('Show me here the info ???', info);

                req.login(user, { session: false }, async err => {
                    try {
                        const { _id, userName } = user;
                        // jwt.sign({ user }, secret, (err, token) => {
                        //     console.log("jwt generated", err, token);

                        //     if (err) return res.status(500).json(err);
                        //     res.cookie("jwt", token, {
                        //             httpOnly: true
                        //         })
                        //         .send();
                        //     res.json({ jwt: token });
                        // });
                        // const token = await jwt.sign({ _id, userName }, secret, { expiresIn: '2d' });
                        await generateToken({ _id, userName}, res);
                        console.log('De vuelta de la generación del token');
                        // return res.json(token);
                    } catch (err) {
                        next(err);
                    }
                });

            } catch(error) {
                next(error);
            }
        })(req, res, next);
        // res.redirect('/profile');
    });

    app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        console.log('in profile, my user id ', req.user._id);
        res.json({
            user: req.user
        }).redirect(`/profile/${req.user._id}/songs`);
    })
    
    

    app.get('logout', (req, res, next) => {
        console.log('entramos al logout')
        res.clearCookie('jwt').json('Logout donde succesfully. Bye!');
    });

};
