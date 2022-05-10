const mongoose = require('mongoose');

const connection = require("../mongo");

const Bill = require('../schemas/bill');

const billFee = new mongoose.Schema({
    description: {
        type: String,
        enum : ['base', 'fixes', 'other'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    billFee_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        index: true
    }
})

const BillFee = connection.model('BillFee', billFee);

module.exports = BillFee;