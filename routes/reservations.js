var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Reservation = require("../database/schemas/reservation");

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create', (req, res) => {
    const reservation = new Reservation({
      //_id: new mongoose.Types.ObjectId(),
      creationDate: req.body.creationDate,
      startingDate: req.body.startingDate,
      endDate: req.body.endDate,
      status: req.body.status,
      type: req.body.type,
      room_id: req.body.room_id,
      user_id: req.body.user_id,
    });
    reservation.save().then(result => {
      console.log(result)
    }).catch(err => console.log(err));
    res.status(200).json({
      message: "handling request",
      createdReserv: reservation
    })
  });


module.exports = router;