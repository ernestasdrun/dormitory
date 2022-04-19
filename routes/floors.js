var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Floor = require("../database/schemas/floor");
const Dorm = require('../database/schemas/dorm');

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create', (req, res) => {
    const floor = new Floor({
      //_id: new mongoose.Types.ObjectId(),
      floor: req.body.floor,
      floorRooms: req.body.floorRooms,
      dorm_id: req.body.dorm_id
    });
    floor.save().then(result => {
      console.log(result)
    }).catch(err => console.log(err));
    res.status(200).json({
      message: "handling request",
      createdFloor: floor
    })
  });

  router.get('/get_:dorm', (req, res) => {
    Dorm.find({dormNumber: req.params.dorm}).exec().then(result => {
      Floor.find({dorm_id: result[0]._id}).exec().then(result => {
        console.log(result);
        res.status(200).json(result);
      })
    })
    .catch(err => console.log(err));
  });
  



module.exports = router;