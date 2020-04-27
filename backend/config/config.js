require('dotenv').config();
import { MongoClient } from 'mongodb';

const connectionString = process.env.MONGODB_URI;
const database = process.env.DATABASE
let db;

const init = () => MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(database);
    return db;
  });

module.exports = { init };
