var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Employee = require("../database/schemas/employee");

router.use(cors({origin: 'http://localhost:3000'}));

router.post('/login_:userName', function(req, res, next) { 
    if (req.body.userType == 10){
      Employee.findOne({ userName: req.body.userName }).then(selected => {
        if (selected == null) {
          res.status(400).json({
            message: "user not found"
          })
        }
        //console.log("Selected user: " + selected.userName);
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
      
    } else {
      res.status(400).json({
        message: "Nepasirinktos pareigos"
      })
    }
  });

  router.post('/register', (req, res) => {
    console.log(req.body.email);
    const employee = new Employee({
      //_id: new mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      surname: req.body.surname,
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      privilleges: req.body.privilleges
    });
    employee.save().then(result => {
      console.log(result)
    }).catch(err => console.log(err));
    res.status(200).json({
      message: "handling request",
      createdUser: employee
    })
  });

  module.exports = router;