const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const connection = require("../mongo");

const User = require('../schemas/user');
const Floor = require('../schemas/floor');
const Dorm = require('../schemas/dorm');

const failure = new mongoose.Schema({
    status: {
        type: String,
        enum: ["processing", "completed", "canceled"],
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    dorm_id: {
        type: mongoose.Schema.ObjectId,
        ref: Dorm,
        required: true,
        index: true
    },
    floor_id: {
        type: mongoose.Schema.ObjectId,
        ref: Floor,
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

const Failure = connection.model('Failure', failure);

module.exports = Failure;