var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Floor = require("../database/schemas/floor");

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

module.exports = router;