
import express from 'express';
import Joi from '@hapi/joi';
import { passport } from '../auth/auth';
import { v4 as uuidv4 } from 'uuid';

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
    app.get('/profile/:userId', async (req, res) => {
        // console.log('here my REQ  ===> ', req.params);
        const { _id } = req.params.userId;
        try {
            const userSongs = songsCollection.find({ userId: _id }).toArray();
            res.status(200).json(userSongs);
        } catch (err) {
            res.status(500).send('Error retrieving your songs');
        }
    });

    // createSong
    app.post('/profile/:userId/createSong', passport.authenticate('jwt', { session: false }), async (req, res) => {
        try {
            const data = req.body;
            const customId = await uuidv4().split('-').join('');
            const songUrl = await getSongUploadURL(customId);
            const insertNewSong = await songsCollection.insertOne({
                _id: random.uuid(),
                userId: data.userId,
                name: data.name,
                session: data.session,
                goodIdea: data.goodIdea,
                createdDate: new Date(),
                soundAttachement: songUrl,
            });
            if (insertNewSong.result.ok === 1) {
                const { _id, name, session, createdAt } = insertNewSong.ops[0];
                res.status(201).json('Song saved succesfully', insertNewSong.ops[0]);
            } else {
                res.status(500).send('Error saving your song')
            }
        } catch (err) {
            
        }
    });

    // editSong
    app.put('/profile/:userId/editSong', passport.authenticate('jwt', { session: false }), async (req, res) => {
        try {
            const song = req.song;
            
            const editSong = await songsCollection.updateOne({ _id: song._id }, { $set: song });
            if (editSong.matchedCount === 1) {
                res.status(200).json('Song edited succesfully');
            }
        } catch (err) {
            res.status(500).json('Error while editing song');
        }
    });

    // deleteSong
    app.delete('/profile/:userId/songs/deleteSong', passport.authenticate('jwt', { session: false }), async (req, res) => {
        try {
            const songToDelete = req.song;
            const deleteSong = await songsCollection.deleteOne(songToDelete);
            if (deleteSong.deletedCount === 1) {
                res.status(200).json('Song deleted succesfully');
            }
        } catch (err) {
            res.status(500).json('Error while deleting song');
        }
    });


};

