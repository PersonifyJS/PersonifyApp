var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var mongojs = require('mongojs');
var db = mongojs('hack_project', ["mentors"]);
var app = express();


//*****routes*****//
// var routes = require('./routes/index');
// var mentorRoute = require('./routes/mentor');

// app.use('/', studentRoute);
// app.use('/mentor', mentorRoute);
// app.engine('html');


app.use('/', express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + 'public');

// app.set('view engine', html)
// app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/mentor', jsonParser, function(req, res){
    console.log('called from server.js');
    console.log('res', JSON.stringify(req.body.name));
    db.mentors.insert(req.body, function(err, doc){
      console.log(doc)
      res.send(doc);
    });

});

app.get('/mentor', function(req, res){
    db.mentors.find(function(err, docs){
      console.log('docs from get', docs )
      res.send(docs);
    })
});


app.listen(3000);

console.log('Server started: http://localhost:3000/');
