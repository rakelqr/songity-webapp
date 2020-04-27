require('dotenv').config();
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './docs/mainDoc';
import { init } from './config/config';
import songs from './routes/songs';
import users from './routes/users';

const app = express();
const port = 3003;
const secret = process.env.JWT_SECRET_KEY

// MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(passport.initialize());
app.use(cookieParser(secret));

init()
    .then(db => {
        users(app, db);
        songs(app, db);
        app.listen(port, () => console.log(`Server listening on port ${port}`))}
    ).catch(err => console.error('Failed connection to database', err));

// listen
// app.listen(port, () => console.log(`Server listening on port ${port}`));
