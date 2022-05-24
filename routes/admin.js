var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Admin = require("../database/schemas/admin");

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create', (req, res) => {
    const admin = new Admin({
        userName: "admin",
        password: "adminPassword"
      });
      admin.save().then(result => {
        console.log(result)
        res.status(200).json({
          message: "handling request",
          createdAdmin: user,
        })
      }).catch(err => {
        console.log(err);
        if ( err && err.code === 11000 ) {
          res.status(500).json({
            duplicate: true
          });
        }
        res.status(500);
      });
});


module.exports = router;