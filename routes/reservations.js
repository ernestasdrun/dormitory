var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Reservation = require("../database/schemas/reservation");
const Room = require("../database/schemas/room");
const Floor = require('../database/schemas/floor');
const Dorm = require('../database/schemas/dorm');
const User = require('../database/schemas/user');
const { vary } = require('express/lib/response');

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create/:user', (req, res) => {
  User.find({userName: req.params.user}).exec().then(result => {
  const userId = result[0]._id;
  const username = result[0].firstName;
  const usersur = result[0].surname;
  Dorm.find({dormNumber: req.body.dorm}).exec().then(result => {
    const dormN = result[0].dormNumber;
    Floor.find({dorm_id: result[0]._id, floor: req.body.floor}).exec().then(result => {      
      const floorN = result[0].floor;
      Room.find({floor_id: result[0]._id, number: req.body.room}).exec().then(result => {

        let date_ob = new Date();
        const reservation = new Reservation({
          //_id: new mongoose.Types.ObjectId(),
          creationDate: date_ob,
          //startingDate: req.body.startingDate,
          //endDate: req.body.endDate,
          firstName: username,
          surname: usersur,
          status: "Nepatvirtinta",
          type:"firstTime",
          roomNum: result[0].number,
          floorNum: floorN,
          dormNum: dormN,
          room_id: result[0]._id,
          user_id: userId
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
  })
  }).catch(err => console.log(err));
  });

  router.post('/getList/:user', (req, res) => {
    User.find({userName: req.params.user}).exec().then(result => {
      const firstName = result[0].firstName;
      const surname = result[0].surname;
      Reservation.find({user_id: result[0]._id}).exec().then(result => {
        const resultJson = [{
          firstName: firstName,
          surname: surname,
          reservations: result
        }]
        res.status(200).send(result);
    })
    .catch(err => console.log(err));
  });
});

router.get('/getList', (req, res) => {
    Reservation.find().exec().then(result => {
      res.status(200).send(result);
  })
  .catch(err => console.log(err));
});


router.post('/update', (req, res) => {
  const id = req.body._id;
  const updateOps = {};
  //for (const ops of req.body) {
  //  updateOps[ops.propName] = ops.value;
  //}
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key];
  }
  Reservation.updateOne({_id: id}, {$set: updateOps}).exec().then(result => {
    res.status(200).json(result);
  }).catch(err => res.status(500).json({
    error: err
  }))
});


module.exports = router;