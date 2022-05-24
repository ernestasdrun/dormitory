var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const Failure = require("../database/schemas/failure");
const User = require('../database/schemas/user');
const Room = require('../database/schemas/room');
const Dorm = require('../database/schemas/dorm');
const Floor = require('../database/schemas/floor');
const Bill = require('../database/schemas/bill');

router.use(cors({origin: 'http://localhost:3000'}));


router.post('/create/:user', (req, res) => {
  let currDate = Date();
  User.find({userName: req.params.user}).exec().then(result => {
    var userId = result[0]._id;
    Room.find({_id: result[0].room_id}).exec().then(result => {
      console.log("ROOM " + result[0]._id);

      const failure = new Failure({
        image: req.body.image,
        status: "processing",
        type: req.body.type,
        comment: req.body.comment,
        dateCreated: currDate,
        user_id: userId,
        room_id: result[0]._id
      });
      failure.save().then(result => {
        console.log(result)
        res.status(200).send();
      }).catch(err => {
        console.log(err);
        res.status(500).send();
      });

  })
  .catch(err => console.log(err));
});
});

router.get('/getRoomList/:user', (req, res) => {
  User.find({userName: req.params.user}).exec().then(result => {
    Room.find({_id: result[0].room_id}).exec().then(result => {
      Failure.find({room_id: result[0]._id}).exec().then(result => {
        res.status(200).send(result);
      }).catch(err => {
        console.log(err);
        res.status(400).send();
        });
  })
  .catch(err => {
    console.log(err);
    res.status(400).send();
    });
}).catch(err => {
  console.log(err);
  res.status(400).send();
  }
);
});


router.get('/gettestFile/', (req, res) => {
  Failure.find().select('image').exec().then(result => {
    const imageD = result[0].image.data
    const imgBase64 = imageD.toString("base64");
    result[0].image.data = imgBase64;
    console.log(result[0].image);
    res.status(200).send(result[0].image);
  })
  .catch(err => console.log("error " + err));
});


router.get('/getList', (req, res) => {
  var resJson = [];
  Failure.find().exec().then(result => {
    var arrSize = result.length;
    for (var index = 0; index < result.length; index++) {
      User.find({_id: result[index].user_id}).exec().then(result => {
        var name = result[0].firstName;
        var surname = result[0].surname;
        Room.find({_id: result[0].room_id}).exec().then(result => {
          var room = result[0].number;
          var floor = result[0].floor_id;
          console.log(result[0]._id);
          Failure.find({room_id: result[0]._id}).exec().then(result => {
            
            var listRes = result;
            Floor.find({_id: floor}).exec().then(result => {
              var floorNum = result[0].floor;
              Dorm.find({_id: result[0].dorm_id}).exec().then(result => {
                var dorm = result[0].dormNumber;
                resJson.push({userName: name, userSurname: surname, userRoom: room, userFloor: floorNum, userDorm: dorm, listRes});
  
                if (resJson.length === arrSize) {
                  res.status(200).send(resJson);
                }
              })
            })
          })
        })
      })
    }
  })
  .catch(err => console.log(err));
});


function calculateFees() {

}


router.post('/update', (req, res) => {
  var date_ob = new Date();
  if (req.body.fStatus == 'completed') {
    var totalUsers = 0;
    var amount = req.body.amount;
    Failure.updateOne({_id: req.body.fail_id}, {status: req.body.fStatus, dateResolved: date_ob}).exec().then(result => {
      Dorm.find({dormNumber: req.body.dorm}).exec().then(result => {
        Floor.find({dorm_id: result[0]._id, floor: req.body.floor}).exec().then(result => {
          Room.find({floor_id: result[0]._id}).exec().then(result => {
  
            var totalRooms = result.length;
            for (var index = 0; index < result.length; index++) {
              totalUsers = totalUsers + result[index].residents;
  
              if (index == result.length - 1) {
                amount = amount / totalUsers;
                for (var i = 0; i < result.length; i++) {
                  console.log(result.length);
                  User.find({room_id: result[i]._id}).exec().then(result => {
                    
                    console.log("test " + result.length);
                    var totalUsers = result.length;
                    for (var u = 0; u < result.length; u++) {
                      
                      Bill.updateOne({user_id: result[u]._id, isSent: false}, {$push: {fees: {description: req.body.feeComment, amount: amount}}, $inc: {totalAmount: amount}}).exec().then(result => {
                        console.log(totalRooms + " " + i + " " + u + " " + totalUsers);
  
                        if (i === totalRooms - 1) {
                          res.status(200).send();
                        }
                      }).catch(err => res.status(500))

                    }
                  }).catch(err => res.status(500))
                  if (i === totalRooms - 1) {
                    res.status(200).send();
                  }
                }
              }
            }
  
          }).catch(err => res.status(500))
        }).catch(err => res.status(500))
      }).catch(err => res.status(500))
    }).catch(err => res.status(500))
  }
  else if (req.body.fStatus == 'canceled') {
    Failure.updateOne({_id: req.body.fail_id}, {status: req.body.fStatus, dateResolved: date_ob}).exec().then(result => {
      res.status(200).send();
    })
    .catch(err => res.status(500))
  }
  else {
    Failure.updateOne({_id: req.body.fail_id}, {status: req.body.fStatus}).exec().then(result => {
      res.status(200).send();
    })
    .catch(err => res.status(500))
  }

});



module.exports = router;