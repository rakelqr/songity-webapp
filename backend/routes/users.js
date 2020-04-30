require('dotenv').config();
import { passport, generateToken } from '../auth/auth';


module.exports = function (app, db) {
    const usersCollection = db.collection('users');
    console.log('entramos a users');

    // insert NEW user
    app.post('/registration', passport.authenticate('registration', { session: false }),
        async (req, res, next) => {
            res.json({
                message: 'Logged in successfully!',
                user: req.user
            });

    });

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
                req.login(user, { session: false }, async err => {
                    try {
                        const { _id, userName } = user;
                        await generateToken({ _id, userName}, res);
                        console.log('Back from token generation');
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
        })
        // .redirect(`/profile/${req.user._id}/songs`);
    });
    
    app.get('logout', (req, res, next) => {
        console.log('entramos al logout')
        res.clearCookie('jwt').json('Logout donde succesfully. Bye!');
    });

};
