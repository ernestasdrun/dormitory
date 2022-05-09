const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const connection = require("./../mongo");

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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    privilleges: {
        type: String,
        enum : ['administration','watcher'],
        required: true
    },
})

const Employee = connection.model('Employee', employee);

module.exports = Employee;