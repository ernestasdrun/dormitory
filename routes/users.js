var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');

const User = require("../database/schemas/user");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res) => {
  const user = new User({
    //_id: new mongoose.Types.ObjectId(),
    firstName: req.body.name,
    surname: req.body.surname,
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  });
  user.save().then(result => {
    console.log(result)
  }).catch(err => console.log(err));
  res.status(200).json({
    message: "handling request",
    createdUser: user
  })
})

module.exports = router;
