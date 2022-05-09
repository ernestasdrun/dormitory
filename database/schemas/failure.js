const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const connection = require("../mongo");

const User = require('../schemas/user');
const Floor = require('../schemas/floor');
const Dorm = require('../schemas/dorm');

const failure = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true,
    },
    status: {
        type: String,
        enum: ["processing", "completed", "canceled"],
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    room_id: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true,
        index: true
    }
})

const Failure = connection.model('Failure', failure);

module.exports = Failure;