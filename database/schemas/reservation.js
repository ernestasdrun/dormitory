const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const connection = require("../mongo");

const User = require('../schemas/user');
const Room = require('../schemas/room');

const reservation = new mongoose.Schema({
    creationDate: {
        type: Date,
        required: true
    },
    startingDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["processing", "complete", "canceled"],
        required: true
    },
    type: {
        type: String,
        enum: ["firstTime", "onHold"],
        required: true
    },
    room_id: {
        type: mongoose.Schema.ObjectId,
        ref: Room,
        required: true,
        index: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        index: true
    }
})

const Reservation = connection.model('Reservation', reservation);

module.exports = Reservation;