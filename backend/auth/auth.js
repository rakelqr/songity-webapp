require('dotenv').config();
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { genSalt, hash, compare } from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { v4 as uuidv4 } from 'uuid';
import { init } from '../config/config';

const secret = process.env.JWT_SECRET_KEY;

const generateHashedPassword = async (password) => {
    const salt = await genSalt(6);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
};
const validatePassword =  async (password, dbPassword) => {
    return await compare(password, dbPassword);
};

const generateToken = async (secureUser, res) => {
    console.log('entro en generate token y este es mi user', secureUser);
    try {
        const token = await jwt.sign({ secureUser }, secret, { expiresIn: '2d' });
        if (!token) return res.status(500);
        console.log('antes de la cookie', token);
        return res.cookie('jwt', token, {
            expires: new Date(Date.now() + 259200), // 3 días
            httpOnly: true
            }).json({ success: true, secureUser, jwt: token });
    } catch (err) {
        return new Error(err);
    }
};

const verifyToken = async (req) => {
    const token = req.cookies.jwt || '';
    try {
        if (!token) {
            return res.status(401).json('Forbidden entry, you need to login')
        }
        const decrypt = await jwt.verify(token, secret);
        req.user = {
            id: decrypt.id,
        };
        next();
    } catch (error) {
        return res.status(500).json(err.toString());
    }
};


passport.use('login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            console.log('entro al pass use');
            const db = await init();
            const usersCollection = db.collection('users');
            const user = await usersCollection.findOne({ userName: email }, { userName: 1, password: 1 });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const isValidUser = await validatePassword(password, user.password);
            if (!isValidUser) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            const { _id, userName, createdAt } = user;
            return done(null, { _id, userName, createdAt });

        } catch (error) {
            return done(error);
        }
    }
));

passport.use('registration', 
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            console.log('entro en use pass de resgister');
            const db = await init();
            const usersCollection = db.collection('users');
            const userExists = await usersCollection.findOne({ userName: email });
            if (userExists) {
                return done(null, false, { message: 'Sorry,but that email has already an account.' });
            } else {
                const hashedPassword = await generateHashedPassword(password);
                const customId = uuidv4().split('-').join('');
                const newUser = {
                    _id: customId,
                    userName: email,
                    password: hashedPassword,
                    createdAt: new Date(),
                };
                // quizá aquí el schema validate con Joi => const user = User(data)
                const insertNewUser = await usersCollection.insertOne(newUser);
                if (insertNewUser.result.ok === 1) {
                    const { _id, userName, createdAt } = insertNewUser.ops[0];
                    done(null, { _id, userName, createdAt }, { message: 'User created succesfully' })
                } else {
                    done(null, false, { message: 'Error while saving user' });
                }
            };
        } catch (error) {
            done(error);
        }
    }
));

passport.use(
    'jwt',
    new JwtStrategy({
        jwtFromRequest: req => req.cookies && req.cookies.jwt,
        secretOrKey: secret,
    }, async (payload, done) => {
        try {
            console.log('received cookie info', payload);
            return done(null, payload.user);
        } catch (err) {
            done(err)
        }
    })
);

module.exports = { generateToken, verifyToken, passport };
