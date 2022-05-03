var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const User = require("../database/schemas/user");
const Employee = require('../database/schemas/employee');

router.use(cors({origin: 'http://localhost:3000'}));






router.post('/login_:userName', function(req, res, next) { 
  if (req.body.userType == 10){
    User.findOne({ userName: req.body.userName }).then(selected => {
      if (selected == null) {
        res.status(400).json({
          message: "user not found"
        })
      }
      else if (selected.userName == req.body.userName && selected.password == req.body.password) {
        res.status(200).send(true)
      }
      else {
        res.status(400).json({
          message: "Wrong credentials"
        })
      }
    })
  } else if (req.body.userType == 20) {
    Employee.findOne({ userName: req.body.userName }).then(selected => {
      if (selected == null) {
        res.status(400).json({
          message: "employee not found"
        })
      }
      else if (selected.userName == req.body.userName && selected.password == req.body.password) {
        res.status(200).send(true)
      }
      else {
        res.status(400).json({
          message: "Wrong credentials"
        })
      }
    })
  } else {
    res.status(400).json({
      message: "Nepasirinktos pareigos"
    })
  }
});

router.post('/register', (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    surname: req.body.surname,
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    notPaid: 0,
    room_id: null
  });
  user.save().then(result => {
    console.log(result)
  }).catch(err => console.log(err));
  res.status(200).json({
    message: "handling request",
    createdUser: user
  })
});

router.delete('/remove_:userName', (req, res) => {
  const user = req.params.userName;
  User.deleteOne({userName: user}).exec().then(result => {
    res.status(200).json(result);
  }).catch(err => res.status(500).json({
    error: err
  }))
});


router.post('/update_:userName', (req, res) => {
  const user = req.params.userName;
  const updateOps = {};
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key];
  }
  User.updateOne({userName: user}, {$set: updateOps}).exec().then(result => {
    res.status(200).json(result);
  }).catch(err => res.status(500).json({
    error: err
  }))
});


router.get('/hasRoom_:userName', (req, res) => {
  const user = req.params.userName;
  User.find({userName: user, room_id: null}).exec().then(result => {
    if (result == null) {
      res.status(200).send('1');
    } else {
      res.status(200).send('0');
    }
  }).catch(err => res.status(500).json({
    error: err
  }))
});

router.get('/info_:userName', (req, res) => {
  const user = req.params.userName;
  User.find({userName: user}).select({"_id": 0, "password": 0, "notPaid": 0, "__v": 0}).exec().then(result => {
    res.status(200).type('json').send(result);
  }).catch(err => res.status(500).json({
    error: err
  }))
});




module.exports = router;
