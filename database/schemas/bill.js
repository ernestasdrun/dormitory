const mongoose = require('mongoose');

const connection = require("../mongo");
const User = require('../schemas/user');

const bill = new mongoose.Schema({
    dateCreated: {
        type: Date,
        required: true
    },
    deadlineDate: {
        type: Date,
        required: true
    },
    fees: [{
        description: {
            type: String,
            enum: ['base', 'fixes', 'other', 'deposit'],
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    isSent: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        enum : ['deposit','bill'],
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true,
        index: true
    }
})

const Bill = connection.model('Bill', bill);

module.exports = Bill;