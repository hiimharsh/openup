var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb   = require('mongodb');
var mongoose  = require('mongoose');
var db        = mongoose.connect('mongodb://localhost:27017/confession');
var localPath = __dirname;

// Set enviornments
var app = express();
var route     = require('./routes/routes');

app.set('view engine', 'html');
app.set('views', path.join(__dirname,  'views'));

app.use(express.static(__dirname + 'views')); 
app.use(express.static(path.join(__dirname, 'client'))); 
app.use('/admin/api/json/confessions', route);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000, function (err) {
  if(err) console.log("Error listening to port: 3000 " + err);
  else console.log("Listening on port: 3000");
});

app.get('/', function (req, res) {
  res.sendFile(localPath + '/views/index.html');
});