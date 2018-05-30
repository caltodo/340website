
var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});


app.use(bodyParser.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine);

app.set('mysql', mysql);
app.set('view engine', 'handlebars');
app.set('port', 7982);

//app.use('/static', express.static('public'));

app.get('/', function(req,res){
      res.render('home.handlebars')
});
app.use('/Players', require('./Players.js'));
app.get('/Players', function(req,res){
      res.render('Players');
});


app.get('/Averages', function(req,res){
      res.render('Averages');
});

app.get('/Teams', function(req,res){
      res.render('Teams');
});

app.get('/Matches', function(req,res){
      res.render('Matches');
});

app.get('/Positions', function(req,res){
      res.render('Positions');
});

app.get('/Conference', function(req,res){
      res.render('Conference');
});

app.use('/', express.static('public'));

//app.use('/Players', require('~/340website/StatsWebsite/Players.js'));
//Worry about that for sql stuff

//app.use('/Players', require('./Players.js'));

app.use(function(req,res){
      res.type('text/plain');
      res.status(404);
      res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


//http://flip3.engr.oregonstate.edu:7982/

app.listen(app.get('port'), function(){
      console.log('Express started on http://localhost: ' + app.get('port') + 'Press Ctrl-c to terminate.');
});

