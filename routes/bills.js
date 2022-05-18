var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Bill = require("../database/schemas/bill");
const Room = require('../database/schemas/room');
const User = require('../database/schemas/user');
const Floor = require("../database/schemas/floor");
const Dorm = require('../database/schemas/dorm');

router.use(cors({origin: 'http://localhost:3000'}));

//Stripe API key
const stripe = require("stripe")('sk_test_51KvQTcDUppirLbInSXaGQNKrgEklAUkko1eGqWzTZEAsjCuKS5ZPD1WA4ZHCGHubTc0CSHkLgQNgwQkdf1rmQGfV000DWVrx2q');

router.use(express.static("public"));
router.use(express.json());


const calculateDepositAmount = (items) => {
  return Room.find({_id: items[0].room_id}).exec().then(result => {
    return result[0].roomPrice * 2;
  }).catch(err => console.log("error " + err));
};

router.post("/depositPayment", async (req, res) => {
  const { items } = req.body;
  const calculatedAmount = await calculateDepositAmount(items);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculatedAmount,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    amount: paymentIntent.amount,
  });
});


router.post("/billPayment", async (req, res) => {
  const { items } = req.body;
  console.log("AMOUNTTTTTT: " + items[0].totalAmount);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: items[0].totalAmount,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    amount: paymentIntent.amount,
  });
});



function createBill(req, res) {
  let date_ob = new Date();
  const bill = new Bill({
    dateCreated: date_ob,
    deadlineDate: date_ob,
    totalAmount: 0,
    isPaid: false,
    isSent: false,
    type: "bill",
    user_id: req.body.user_id
  });
  bill.save().then(result => {
    console.log(result)
  }).catch(err => console.log(err));
  res.status(200).json({
    message: "handling request",
    createdBill: bill
  })
}

router.post('/create', (req, res) => {
  createBill(req, res);
});

router.post('/createDeposit', (req, res) => {
  let date_ob = new Date();
    const bill = new Bill({
      dateCreated: date_ob,
      deadlineDate: date_ob,
      fees: [{
        description: "deposit",
        amount: req.body.amount
    }],
      totalAmount: req.body.amount,
      isPaid: true,
      isSent: true,
      type: "deposit",
      user_id: req.body.user_id
    });
    bill.save().then(result => {
      console.log(result)
    }).catch(err => console.log(err));
    res.status(200).json({
      message: "handling request",
      createdBill: bill
    })
});



router.get('/getList', (req, res) => {

  var resJson = [];
  var arrSize = null;
  User.find({ room_id: { $ne: null } }).exec().then(result => {
    arrSize = result.length;

    for (var index = 0; index < result.length; index++) {
      User.find({_id: result[index]._id}).exec().then(result => {
        var user = result;

        Room.find({_id: result[0].room_id}).exec().then(result => {
          var room = result[0].number;

          Floor.find({_id: result[0].floor_id}).exec().then(result => {
            Dorm.find({_id: result[0].dorm_id}).exec().then(result => {
              var dorm = result[0].dormAddress;

              User.find({userName: user[0].userName}).exec().then(result => {
                Bill.find({user_id: result[0]._id, isSent: true}).select().exec().then(result => {

                  console.log("BILL: " + result[0]._id);
                  resJson.push({roomNumber: room, dormAddress: dorm, user: user, result})

                  if (resJson.length === arrSize) {
                    res.status(200).send(resJson);
                  }
              })
            })
            })
          })
      })
      })
    }
  })
  .catch(err => console.log(err));

});

router.get('/getList/:user', (req, res) => {
  var user = null;
  var room = null;
  var dorm = null;
  User.find({userName: req.params.user}).exec().then(result => {
    user = result;
    Room.find({_id: result[0].room_id}).exec().then(result => {
      room = result[0].number;
      Floor.find({_id: result[0].floor_id}).exec().then(result => {
        Dorm.find({_id: result[0].dorm_id}).exec().then(result => {
          dorm = result[0].dormAddress;
          User.find({userName: req.params.user}).exec().then(result => {
            Bill.find({user_id: result[0]._id, isSent: true}).select().exec().then(result => {
              console.log(result);
              res.status(200).send({roomNumber: room, dormAddress: dorm, user: user, result});
          })
        })
      })
    })
  })
  .catch(err => console.log(err));
  });
});

//add fee insertion to bill with isSent false



router.post('/update', (req, res) => {
  const id = req.body._id;
  const updateOps = {};
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key];
  }
  Bill.updateOne({_id: id}, {$set: updateOps}).exec().then(result => {
    res.status(200).json(result);
  }).catch(err => res.status(500).json({
    error: err
  }))
});


module.exports = router;