const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const connection = require("../mongo");
const User = require('../schemas/user');

const bill = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true,
        index: true
    }
})

const Bill = connection.model('Bill', bill);

module.exports = Bill;