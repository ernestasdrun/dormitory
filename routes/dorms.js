var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Dorm = require("../database/schemas/dorm");

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create', (req, res) => {
    const dorm = new Dorm({
      //_id: new mongoose.Types.ObjectId(),
      dormNumber: req.body.dormNumber,
      dormAddress: req.body.dormAddress,
      dormFloors: req.body.dormFloors,
    });
    dorm.save().then(result => {
      console.log(result)
    }).catch(err => console.log(err));
    res.status(200).json({
      message: "handling request",
      createdDorm: dorm
    })
});

router.get('/get', (req, res) => {
  Dorm.find().exec().then(result => {
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err => console.log(err));
});



module.exports = router;