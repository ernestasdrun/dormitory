const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const connection = require("../mongo");

const User = require('../schemas/user');

const document = new mongoose.Schema({
    isSigned: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true,
        index: true
    }
})

const Document = connection.model('Document', document);

module.exports = Document;