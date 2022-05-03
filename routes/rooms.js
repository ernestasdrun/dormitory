var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Room = require("../database/schemas/room");
const Floor = require('../database/schemas/floor');
const Dorm = require('../database/schemas/dorm');

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create', (req, res) => {
    const room = new Room({
      //_id: new mongoose.Types.ObjectId(),
      number: req.body.number, //strin
      maxResidents: req.body.maxResidents, //number
      residents: 0,
      floor_id: req.body.floor_id, // object id
    });
    room.save().then(result => {
      res.status(200).json({
        message: "handling request",
        createdRoom: room
      })
    }).catch(err => console.log(err));
    res.status(400).json({
      message: "handling request failed"
    })
  });


  router.get('/get/:dorm/:floor/:residents', (req, res) => {
    Dorm.find({dormNumber: req.params.dorm}).exec().then(result => {
      Floor.find({dorm_id: result[0]._id, floor: req.params.floor}).exec().then(result => {      
        Room.find({floor_id: result[0]._id, maxResidents: req.params.residents}).exec().then(result => {
        res.status(200).json(result);
      })
    })
    })
    .catch(err => console.log(err));
  });


  router.get('/getRoom/:id', (req, res) => {
    Room.find({_id: req.params.id}).exec().then(result => {
      res.status(200).json(result);
    })
    .catch(err => console.log(err));
  });



module.exports = router;