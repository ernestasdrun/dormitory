var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Dorm = require("../database/schemas/dorm");
const Floor = require('../database/schemas/floor');

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create', (req, res) => {
    const dorm = new Dorm({
      //_id: new mongoose.Types.ObjectId(),
      dormNumber: req.body.dormNumber,
      dormAddress: req.body.dormAddress,
      dormFloors: req.body.dormFloors,
    });
    dorm.save().then(result => {
      console.log(result)
    }).catch(err => console.log(err));
    res.status(200).json({
      message: "handling request",
      createdDorm: dorm
    })
});

router.get('/get', (req, res) => {
  Dorm.find().exec().then(result => {
    res.status(200).json(result);
  })
  .catch(err => console.log(err));
});

router.get('/getWithFloors', (req, res) => {
  var resJson = [];
  var dorm = null;
  Dorm.find().exec().then(result => {
    var arrSize = result.length;
    for (var index = 0; index <  result.length; index++) {
      dorm = result[index];
      console.log(dorm.dormAddress);
      Floor.find({dorm_id: dorm._id}).exec().then(result => {
        console.log(result[0].dorm_id);
        var floorList = result;
        Dorm.find({_id: result[0].dorm_id}).exec().then(result => {

          resJson.push({dorm: result[0], floors: floorList})

          if (resJson.length === arrSize) {
            res.status(200).send(resJson);
          }


        })

      }).catch(err => res.status(500).send(err));
    }
  })
  .catch(err => res.status(500).send(err));

});



module.exports = router;