var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Room = require("../database/schemas/room");
const Floor = require('../database/schemas/floor');
const Dorm = require('../database/schemas/dorm');
const User = require('../database/schemas/user');

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create', (req, res) => {
    const room = new Room({
      //_id: new mongoose.Types.ObjectId(),
      number: req.body.number, //strin
      maxResidents: req.body.maxResidents, //number
      residents: 0,
      roomPrice: 0,
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

  router.get('/getRoosmByFloor/:id', (req, res) => {
    var resJson = [];
    Room.find({floor_id: req.params.id}).exec().then(result => {
      var arrSize = result.length;
      for (var index = 0; index <  result.length; index++) {
        var room = result[index];

        if (result[index].residents == 0) {
          resJson.push({room: result[0], users: {}})
    
          if (resJson.length === arrSize) {
            res.status(200).send(resJson);
          }
        } else {
          User.find({room_id: room._id}).exec().then(result => {
            var userList = result;
            Room.find({_id: result[0].room_id}).exec().then(result => {
    
              resJson.push({room: result[0], users: userList})
    
              if (resJson.length === arrSize) {
                res.status(200).send(resJson);
              }
    
    
            })
    
          }).catch(err => res.status(500).send(err));
        }
      }
    })
    .catch(err => res.status(500).send(err));





    // Room.find({floor_id: req.params.id}).exec().then(result => {
    //   res.status(200).json(result);
    // })
    // .catch(err => console.log(err));
  });

  router.post('/updatePrice', (req, res) => {
    Room.updateMany({maxResidents: req.body.maxResidents}, {$set: {roomPrice: req.body.roomPrice}}).exec().then(result => {
      res.status(200).json(result);
    })
    .catch(err => console.log(err));
  });


  router.post('/updateCountById/:id', (req, res) => {
    Room.updateOne({_id: req.params.id}, {$inc: {residents: req.body.residents}}).exec().then(result => {
      res.status(200).json(result);
    }).catch(err => res.status(500).json({
      error: err
    }))
  });



module.exports = router;