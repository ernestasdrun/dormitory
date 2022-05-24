const mongoose = require('mongoose');

const connection = require("../mongo");

const User = require('../schemas/user');
const Reservation = require('../schemas/reservation');

const document = new mongoose.Schema({
    file: {
        type: Buffer,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    isSigned: {
        type: Boolean,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userSurname: {
        type: String,
        required: true
    },
    dateUploaded: {
        type: Date,
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true,
        index: true
    },
    reservation_id: {
        type: mongoose.Schema.ObjectId,
        ref: Reservation,
        required: true,
        index: true
    }
})

const Document = connection.model('Document', document);

module.exports = Document;