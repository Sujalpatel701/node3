const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/';
const dbName = 'test';

mongoose.connect(uri + dbName, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

module.exports = mongoose;