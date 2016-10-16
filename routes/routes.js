var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Confession = require('../models/confession');
var database = "mongodb://localhost:27017/confession";

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/', function(req, res, next) {
  Confession.find({})
    .exec(function(err, con) {
      if (err) res.send(err);
      else res.json(con);
    });
});

router.get('/:id', function(req, res, next) {
  Confession.find({
    _id: req.params.id
    })
    .exec(function(err, con) {
      if (err) res.send(err);
      else res.json(con);
    });
});

router.post('/new', function(req, res) {
  if (req.body) {
    var newcon = new Confession();

    newcon.name = req.body.name;
    newcon.message = req.body.message;
    newcon.created_at = new Date();

    newcon.save(function(err, con) {
      if (err) res.send(err);
      else {
        res.json({
          value: true,
          message: "Confession created successfully",
          data: con
        });
      }
    });
  } else {
    res.json({
      value: false,
      message: "No parameters passed"
    });
  }
});

router.delete('/:id', function(req, res) {
  if (req.body) {
    Confession.findOneAndRemove({
      _id: req.params.id
    }, function(err, con) {
      if (err) {
        console.log('error occured' + err);
      } else {
        res.json({
          status: true,
          message: "Deleted successfully",
          data: con
        });
      }
    });
  } else {
    console.log('Please pass parameters to delete confession');
  }
});


module.exports = router;