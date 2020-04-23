const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';

const dbName = 'Sounditi';
let db;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  // ... do something here
  if (err) return log(err);

  db = client.db(dbName)
  console.log(`Connected MongoDB: ${url}`);
  console.log(`Database: ${dbName}`);
});