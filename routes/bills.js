var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Bill = require("../database/schemas/bill");

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create', (req, res) => {
    const bill = new Bill({
      //_id: new mongoose.Types.ObjectId(),
      dateCreated: req.body.dateCreated,
      deadlineDate: req.body.deadlineDate,
      newAmount: req.body.newAmount,
      miscAmount: req.body.miscAmount,
      totalAmount: req.body.totalAmount,
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


module.exports = router;