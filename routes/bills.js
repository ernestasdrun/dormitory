var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Bill = require("../database/schemas/bill");
const Fee = require("../database/schemas/billFee");
const Room = require('../database/schemas/room');

router.use(cors({origin: 'http://localhost:3000'}));

//Stripe API key
const stripe = require("stripe")('sk_test_51KvQTcDUppirLbInSXaGQNKrgEklAUkko1eGqWzTZEAsjCuKS5ZPD1WA4ZHCGHubTc0CSHkLgQNgwQkdf1rmQGfV000DWVrx2q');

router.use(express.static("public"));
router.use(express.json());





const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return Room.find({_id: items[0].room_id}).exec().then(result => {
    return result[0].roomPrice * 2;
  }).catch(err => console.log("error " + err));
};



router.post("/depositPayment", async (req, res) => {
  const { items } = req.body;
  const calculatedAmount = await calculateOrderAmount(items);

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








router.post('/create', (req, res) => {
  let date_ob = new Date();
    const bill = new Bill({
      //_id: new mongoose.Types.ObjectId(),
      dateCreated: date_ob,
      deadlineDate: date_ob,
      totalAmount: 0,
      isPaid: false,
      type: req.body.type,
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

router.post('/addFee/:id', (req, res) => {
  Bill.updateOne({_id: req.params.id}, {$push: {fees: {description: req.body.description, amount: req.body.amount}}, $inc: {totalAmount: req.body.amount}}).exec().then(result => {
    res.status(200).send(result);
  }).catch(err => console.log(err));
});



//trinti, nebereikia atskiro objekto
router.post('/createFee', (req, res) => {
  const fee = new Fee({
    description: req.body.description,
    amount: req.body.amount,
    billFee_id: req.body.billFee_id
  });
  fee.save().then(result => {
    console.log(result)
  }).catch(err => console.log(err));
  res.status(200).json({
    message: "handling request",
    createdFee: fee
  })
});


module.exports = router;