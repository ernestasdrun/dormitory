var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Failure = require("../database/schemas/failure");

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create', (req, res) => {
    const failure = new Failure({
      //_id: new mongoose.Types.ObjectId(),
      status: req.body.status,
      type: req.body.type,
      dorm_id: req.body.dorm_id,
      floor_id: req.body.floor_id,
      user_id: req.body.user_id
    });
    failure.save().then(result => {
      console.log(result)
    }).catch(err => console.log(err));
    res.status(200).json({
      message: "handling request",
      createdFail: failure
    })
});


module.exports = router;