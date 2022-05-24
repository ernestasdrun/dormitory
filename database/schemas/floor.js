const mongoose = require('mongoose');

const connection = require("../mongo");

const Dorm = require('../schemas/dorm');

const floor = new mongoose.Schema({
    floor: {
        type: Number,
        required: true
    },
    floorRooms: {
        type: Number,
        required: true
    },
    dorm_id: {
        type: mongoose.Schema.ObjectId,
        ref: Dorm,
        required: true,
        index: true
    }
})

const Floor = connection.model('Floor', floor);

module.exports = Floor;