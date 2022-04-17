const mongoose = require('mongoose');

const connecttion = mongoose.createConnection("mongodb://0.0.0.0:27017/dormitorySystem")

/*mongoose.connect('mongodb://0.0.0.0:27017/dormitorySystem').then(() => {
    console.log("connected");
}).catch((error) => {
    console.log(error);
})*/

module.exports = connecttion;