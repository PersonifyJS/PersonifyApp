var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var app = express();


//*****routes*****//

app.use('/', express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + 'public');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
  
});

app.post('/', jsonParser, function(req, res){

});


app.listen(3000);

console.log('Server started: http://localhost:3000/');
