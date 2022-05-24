const mongoose = require('mongoose');

const connection = require("./../mongo");

const admin = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const Admin = connection.model('Admin', admin);

module.exports = Admin;