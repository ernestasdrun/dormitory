const mongoose = require('mongoose');

const connection = require("./../mongo");

const Floor = require('../schemas/floor');

const room = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    maxResidents: {
        type: Number,
        enum : [1, 2, 3],
        required: true
    },

    floor_id: {
        type: mongoose.Schema.ObjectId,
        ref: Floor,
        required: true,
        index: true
    }
})

const Room = connection.model('Room', room);

module.exports = Room;