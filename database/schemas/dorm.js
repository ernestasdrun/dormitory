const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const connection = require("../mongo");

const dorm = new mongoose.Schema({
    dormNumber: {
        type: Number,
        required: true,
        unique: true
    },
    dormAddress: {
        type: String,
        required: true,
        unique: true
    },
    dormFloors: {
        type: Number,
        required: true
    },
})

const Dorm = connection.model('Dorm', dorm);

module.exports = Dorm;