
import express from 'express';
import Joi from '@hapi/joi';
import { passport } from '../auth/auth';
import { v4 as uuidv4 } from 'uuid';
import { random } from 'faker';

const router = express.Router();
const songSchema = Joi.object({
    _id: Joi.string(),
    userId: Joi.string(),
    name: Joi.string(),
    session: Joi.string(),
    goodIdea: Joi.boolean(),
    createdDate: Joi.date(),
    soundAttachement: Joi.string(),
});

const getSongUploadURL = async (songId) => {
    const endpoint = `https://ac9uyqbu09.execute-api.eu-central-1.amazonaws.com/dev/songs/${songId}/upload`
    try {
        const response = await fetch(endpoint, {
            method: 'POST'
        });
        const json = await response.json();
        const { uploadUrl } = json;
        return uploadUrl;
    } catch (e) {
        throw new Error('This is an error');
    };
};

module.exports = function(app, db) {
    console.log('entramos a songs');
    const songsCollection = db.collection('songs');

    app.get('/', (req, res) => {
        res.send('Server is running in my localhost. I have to run.');
    });

    app.get('/first', (req, res) => {
        songsCollection.find({}).toArray((err, docs) => {
            if (err) {
                console.log(err)
                res.error(err)
            } else {
                res.json(docs)
            }
        })
    });
    // app.use('/user', passport.authenticate('jwt', { session: false }));

    // getSongs
    app.get('/profile/:userId/songs', async (req, res) => {
        // console.log('here my REQ  ===> ', req);
        const { _id } = req.user;
        try {
            const userSongs = songsCollection.find({ userId: _id }).toArray();
            res.status(200).json(userSongs);
        } catch (err) {
            res.status(500).send('Error retrieving your songs');
        }
    });

    // createSong
    // app.post('/:userId/songs/newSong', passport.authenticate('jwt', { session: false }), (req, res) => {
    //     const data = req.body;
    //     songsCollection.insertOne({
    //         _id: random.uuid(),
    //         userId: data.userId,
    //         name: data.name,
    //         session: data.session,
    //         goodIdea: data.goodIdea,
    //         createdDate: new Date(),
    //         soundAttachement: songUrl,
    //     });
    //     // check what returns
    //     // error
    //     res.status(500).send("An error occured in the registration");
    //     // everything ok
    //     res.status(201);
    //     // Redirection to /:userId/:songId
    //     res.json('MESSAGE TO EDIT');
    // });

    // // editSong
    // app.put('/:userId/songs/:songId', passport.authenticate('jwt', { session: false }), (req, res) => {

    // });

    // // deleteSong
    // app.delete('/:userId/songs/:songId', passport.authenticate('jwt', { session: false }), (req, res) => {

    // })


}

