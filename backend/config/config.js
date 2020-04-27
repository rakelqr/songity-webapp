require('dotenv').config();
import { MongoClient } from 'mongodb';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
let db;

const init = () => MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db('Sounditi');
    return db;
  });

module.exports = { init };
