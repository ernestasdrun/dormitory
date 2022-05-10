var express = require('express');
var router = express.Router();
var cors = require('cors');
var nodeCron = require('node-cron');

const User = require("../database/schemas/user");
const Bill = require("../database/schemas/bill");
const Room = require("../database/schemas/room");


router.use(cors({origin: 'http://localhost:3000'}));


//0 0 0 1 * *
//* * * * * *
const job = nodeCron.schedule("0 0 0 1 * *", function generateBills() {
    // find users that have room and update bills for them
    User.find({ room_id: { $ne: null } }).exec().then(result => {
        for (var index = 0; index < result.length; index++) {
            User.find({_id: result[index]._id}).exec().then(result => {
                var userId = result[0]._id;
                console.log(userId);
                Room.find({_id: result[0].room_id}).exec().then(result => {
                    let date_ob = new Date();
                    let deadline_date = new Date();
                    // update current bill (show to user) and create a new one to store fees for next month
                    Bill.updateOne({user_id: userId, isSent: false, type: 'bill'}, {$push: {fees: {description: "Administravimas, komunaliniai mokesčiai", amount: result[0].roomPrice}}, $inc: {totalAmount: result[0].roomPrice}}).set({isSent: true, dateCreated: date_ob, deadlineDate: new Date(deadline_date.setMonth(deadline_date.getMonth()+1))}).exec().then(result => {
                        const bill = new Bill({
                            dateCreated: date_ob,
                            deadlineDate: date_ob,
                            totalAmount: 0,
                            isPaid: false,
                            isSent: false,
                            type: "bill",
                            user_id: userId
                        });
                        bill.save()
        
                        if (result[index] == result.length) {
        
                        }
                    })
                    console.log(new Date().toLocaleString() + " " + result.length);
                })
            })
        }

    })



});


module.exports = router;