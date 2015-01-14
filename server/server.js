var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var https = require('https');
var url = require('url');
var querystring = require('querystring');
var extend = require('util')._extend;
var Promise = require("bluebird");
var Personify = require('personify');

var app = express();

app.use('/', express.static(path.join(__dirname, '../app/public')));
app.use('/', express.static(path.join(__dirname, '../app/views')));
app.use('/', express.static(path.join(__dirname, '../app/util')));
app.use('/', express.static(path.join(__dirname, '../app/controllers')));

app.set('views', __dirname + '../app/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var config = {
    translateConfig : {
        service_url : "https://gateway.watsonplatform.net/laser/service/api/v1/smt",
        service_username : "54fa5070-8c12-4ab8-b5d4-c126279b5b2a",
        service_password : "WmlLWdYClQBm"
    },
    personalityConfig : {
        service_url: "https://gateway.watsonplatform.net/systemu/service/",
        service_username: "12312a68-fdff-4064-9928-eb088a960815",
        service_password: "KUwy0neR5kpV"
    },
    twitterConfig : {
        consumer_key:         'nnnMzv63aJKbQgzF77vQLXCm0',
        consumer_secret:      'BAG1XL3PHUVw6AsW7K0dRcIv6qkITkWARmZL9Bb8nOKfTkbTpo',
        access_token:         '35398491-9KTshSy7QNiKh0Ia71AeZ6D1XMg6teKJWAwp6YNNE',
        access_token_secret:  'ivIGOcV4OHxW9lRrW7pevEcxwtk2RDGzVSW6IdOqz9R0D'
    }
}

var P = new Personify(config);


app.get('/', function(req, res){
  // index.html will be rendered on '/'
});


app.post('/map', function(req, res){
  // create the object to be send to the client
  var dataObj = { USData: null, stateData: null };
  var res = res;
  console.log('Data received from font-end ==================================================');
  console.log(req.body.geo);
  console.log(req.body.subject);
  console.log('End of data received from font-end ===========================================');
  
  var params1 = { 
                q: req.body.subject, 
                geocode: req.body.geo
              };
  var params2 = { 
                q: req.body.subject, 
                geocode: ['39.8','-95.583068847656','2500km']
              };

  // use searchPersonify from perosonify.js library
  var dataFromUSAndState = function(dataFromUS, dataFromState, err1, err2){
    dataObj = { USData: dataFromUS, stateData: dataFromState, Error1: err1, Error2: err2 }
    res.send(dataObj);
  };
  
  var dataFromUSFunc = function (dataFromState, err1) {
    P.searchPersonify( params2 , function (dataFromUS, err2) {
      if (err2) console.log(err2);
      dataFromUSAndState(dataFromUS, dataFromState, err1, err2);
    });
  }

  var dataFromStateFunc = function() {
    P.searchPersonify( params1 , function (dataFromState, err1) {
      if (err1) console.log(err1);
      dataFromUSFunc(dataFromState, err1);   
    });
  }
  
  dataFromStateFunc();

}); 

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port, host);
