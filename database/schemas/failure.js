const mongoose = require('mongoose');

const connection = require("../mongo");

const User = require('../schemas/user');
const Room = require('./room');

const failure = new mongoose.Schema({
    image: {
        type: Buffer
    },
    status: {
        type: String,
        enum: ["processing", "completed", "canceled"],
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["window_issues", "plumbing_issues", "electricity_issues", "other_issues"]
    },
    comment: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    dateResolved: {
        type: Date,
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true,
        index: true
    },
    room_id: {
        type: mongoose.Schema.ObjectId,
        ref: Room,
        required: true,
        index: true
    }
})

const Failure = connection.model('Failure', failure);

module.exports = Failure;