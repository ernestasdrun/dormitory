var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Warning = require("../database/schemas/warning");

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create', (req, res) => {
    const warning = new Warning({
      value: req.body.value, //number
      message: req.body.message, //string
      dateReceived: req.body.dateReceived, //date
      isActive: req.body.isActive, //bool
      user_id: req.body.user_id, // object id
    });
    warning.save().then(result => {
      console.log(result)
    }).catch(err => console.log(err));
    res.status(200).json({
      message: "handling request",
      createdWarning: warning
    })
  });


module.exports = router;