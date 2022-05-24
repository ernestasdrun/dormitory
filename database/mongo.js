const mongoose = require('mongoose');

const connecttion = mongoose.createConnection("mongodb://0.0.0.0:27017/dormitorySystem")


module.exports = connecttion;