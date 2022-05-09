const mongoose = require('mongoose');

const connection = require("./../mongo");

const User = require('../schemas/user');

const warning = new mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    dateReceived: {
        type: Date,
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true,
        index: true
    }
})

const Warning = connection.model('Warning', warning);

module.exports = Warning;