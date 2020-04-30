const getDb = (collection) => {
    return collection;
};

const getFromIndex = (db) => {
    const usersCollection = db.collection('users');
    console.log('entramos a users');
    getDb(usersCollection);
};

module.exports = { getFromIndex, getDb }