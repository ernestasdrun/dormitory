var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Room = require("../database/schemas/room");

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create', (req, res) => {
    const room = new Room({
      //_id: new mongoose.Types.ObjectId(),
      number: req.body.number, //strin
      maxResidents: req.body.maxResidents, //number
      floor_id: req.body.floor_id, // object id
    });
    room.save().then(result => {
      console.log(result)
    }).catch(err => console.log(err));
    res.status(200).json({
      message: "handling request",
      createdRoom: room
    })
  });


module.exports = router;