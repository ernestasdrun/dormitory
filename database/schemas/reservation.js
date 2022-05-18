const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const connection = require("../mongo");

const User = require('../schemas/user');
const Room = require('../schemas/room');

const reservation = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    startingDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["Nepatvirtinta", "Sutarties pasirašymas", "Laukiama depozito", "Apgyvendinimas", "Įvikdyta", "Atšaukta"],
        required: true
    },
    type: {
        type: String,
        enum: ["firstTime", "onHold"],
        required: true
    },
    roomNum: {
        type: String,
        required: true
    },
    floorNum: {
        type: Number,
        required: true
    },
    dormNum: {
        type: Number,
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
        required: true,
        index: true
    }
})

const Reservation = connection.model('Reservation', reservation);

module.exports = Reservation;