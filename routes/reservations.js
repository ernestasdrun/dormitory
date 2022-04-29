var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Reservation = require("../database/schemas/reservation");
const Room = require("../database/schemas/room");
const Floor = require('../database/schemas/floor');
const Dorm = require('../database/schemas/dorm');

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create', (req, res) => {
  Dorm.find({dormNumber: req.body.dorm}).exec().then(result => {
    Floor.find({dorm_id: result[0]._id, floor: req.body.floor}).exec().then(result => {      
      Room.find({floor_id: result[0]._id, number: req.body.room}).exec().then(result => {
        let date_ob = new Date();
        const reservation = new Reservation({
          //_id: new mongoose.Types.ObjectId(),
          creationDate: date_ob,
          //startingDate: req.body.startingDate,
          //endDate: req.body.endDate,
          status: "processing",
          type:"firstTime",
          room_id: result[0]._id
        });
        reservation.save().then(result => {
          console.log(result)
        }).catch(err => console.log(err));
        res.status(200).json({
          message: "handling request",
          createdReserv: reservation
        })
    })
  })
  }).catch(err => console.log(err));
  });


module.exports = router;