var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Document = require("../database/schemas/document");

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create', (req, res) => {
    const document = new Document({
      //_id: new mongoose.Types.ObjectId(),
      isSigned: req.body.isSigned,
      user_id: req.body.user_id
    });
    document.save().then(result => {
      console.log(result)
    }).catch(err => console.log(err));
    res.status(200).json({
      message: "handling request",
      createdDocument: document
    })
});


module.exports = router;