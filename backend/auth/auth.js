require('dotenv').config();
import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { v4 as uuidv4 } from 'uuid';


const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};
const validatePassword =  async (password, dbPassword) => {
    return await compare(password, dbPassword);
};

passport.use('login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await usersCollection.findOne({ userName: email }, { userName: 1, password: 1 });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const isValidUser = await validatePassword(password, user.password);
            if (!isValidUser) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);

        } catch (error) {
            return done(error);
        }
    }
));

passport.use('signup', 
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            //Save the information provided by the user to the the database
            // const user = await UserModel.create({ email, password });
            //Send the user information to the next middleware
            // return done(null, user);
            const userExists = await usersCollection.findOne({ userName: email });
            if (userExists) {
                return done(null, false, { message: 'Sorry,but that email has already an account.' });
                // res.status(409).json('Sorry,but that email has already an account');
            } else {
                const hashedPassword = await generateHashedPassword(password);
                const customId = uuidv4().split('-').join('');
                const newUser = {
                    _id: customId,
                    userName: email,
                    password: hashedPassword,
                    createdAt: new Date(),
                };
                // quizá aquí el schema validate con Joi => const user = new User(data)
                const insertNewUser = await usersCollection.insertOne(newUser);

                if (insertNewUser.result.ok === 1) {
                    done(null, user, { message: 'User created succesfully' })
                } else {
                    done(null, false, { message: 'Error while saving user' });
                }
            };
        } catch (error) {
            done(error);
        }
    }
));
