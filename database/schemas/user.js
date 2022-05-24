const mongoose = require('mongoose');

const connection = require("./../mongo");

const Room = require('../schemas/room');

const user = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    reservedFrom: {
        type: Date,
    },
    reservedTill: {
        type: Date,
    },
    notPaid: {
        type: Number,
        required: true
    },
    room_id: {
        type: mongoose.Schema.ObjectId,
        ref: Room,
        index: true
    }
})

const User = connection.model('User', user);

module.exports = User;