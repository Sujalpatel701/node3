const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name: String,
    pass: String
});

const admin1 = mongoose.model('admin1', adminSchema);
module.exports = admin1;
