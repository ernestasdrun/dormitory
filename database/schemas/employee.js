const mongoose = require('mongoose');

const connection = require("./../mongo");
const Dorm = require('./dorm');

const employee = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    userName: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    responsibleDorm: {
        type: mongoose.Schema.ObjectId,
        ref: Dorm,
        index: true
    },
    privilleges: {
        type: String,
        enum : ['administration','watcher'],
        required: true
    },
})

const Employee = connection.model('Employee', employee);

module.exports = Employee;