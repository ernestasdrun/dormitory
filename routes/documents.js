var express = require('express');
const req = require('express/lib/request');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Document = require("../database/schemas/document");
const User = require('../database/schemas/user');

router.use(cors({origin: 'http://localhost:3000'}));
router.use(fileupload());
router.use(express.static("files"));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/create/:user/:reservation', (req, res) => {
  User.find({_id: req.params.user}).exec().then(result => {
    const document = new Document({
      file: req.files.file.data,
      fileName: req.files.file.name,
      isSigned: false,
      userName: result[0].firstName,
      userSurname: result[0].surname,
      user_id:  req.params.user,
      reservation_id: req.params.reservation
    });
    document.save().then(result => {
      res.status(200).json({
        message: "handling request",
        createdDocument: document
      })
  })
})
.catch(err => console.log("error " + err));
});


router.get('/getFiles', (req, res) => {
  Document.find().select({file: 0}).exec().then(result => {
    res.status(200).send(result);
  })
  .catch(err => console.log("error " + err));
});

router.get('/getList/:user', (req, res) => {
  User.find({userName: req.params.user}).exec().then(result => {
    Document.find({user_id: result[0]._id}).select({file: 0}).exec().then(result => {
      res.status(200).send(result);
  })
  .catch(err => console.log(err));
});
});


router.get('/getFullFile/:id', (req, res) => {
  Document.find({_id: req.params.id}).select('file').exec().then(result => {
    res.status(200).send(result);
  })
  .catch(err => console.log("error " + err));
});


router.post('/update', (req, res) => {
  const id = req.body._id;
  const updateOps = {};
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key];
  }
  Document.updateOne({_id: id}, {$set: updateOps}).exec().then(result => {
    res.status(200).json(result);
  }).catch(err => res.status(500).json({
    error: err
  }))
});



router.post("/upload", (req, res) => {
  const newpath = __dirname + "/files/";
  const file = req.files.file;
  const filename = file.name;
 
  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    } else res.status(200).send({ message: "File Uploaded", code: 200 });
  });
});

module.exports = router;