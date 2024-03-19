const mongoose = require('mongoose');
const try1Schema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
});

const Try1 = mongoose.model('try1', try1Schema);
module.exports = Try1;
