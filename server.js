var path = require('path');
var Promise = require("bluebird");
var get = Promise.promisifyAll(require("request"));
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Twit = require('twit');
var https = require('https');
var url = require('url');
var querystring = require('querystring');
var extend = require('util')._extend;
var flatten = require('./app/util/flatten');

var app = express();

app.use('/', express.static(path.join(__dirname, '/app/public')));
app.use('/', express.static(path.join(__dirname, '/app/views')));
app.use('/', express.static(path.join(__dirname, '/app/util')));

app.set('views', __dirname + '/app/views');

console.log(__dirname)

var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");

// defaults for dev outside bluemix
var service_url = "https://gateway.watsonplatform.net/systemu/service/";
var service_username = "12312a68-fdff-4064-9928-eb088a960815";
var service_password = "KUwy0neR5kpV";

// Twitter config
var T = new Twit({
        consumer_key:         'nnnMzv63aJKbQgzF77vQLXCm0'
      , consumer_secret:      'BAG1XL3PHUVw6AsW7K0dRcIv6qkITkWARmZL9Bb8nOKfTkbTpo'
      , access_token:         '35398491-9KTshSy7QNiKh0Ia71AeZ6D1XMg6teKJWAwp6YNNE'
      , access_token_secret:  'ivIGOcV4OHxW9lRrW7pevEcxwtk2RDGzVSW6IdOqz9R0D'
});

if (process.env.VCAP_SERVICES) {
  console.log('Parsing VCAP_SERVICES');
  var services = JSON.parse(process.env.VCAP_SERVICES);
  //service name, check the VCAP_SERVICES in bluemix to get the name of the services you have
  var service_name = 'user_modeling';
  
  if (services[service_name]) {
    var svc = services[service_name][0].credentials;
    service_url = svc.url;
    service_username = svc.username;
    service_password = svc.password;
  } else {
    console.log('The service '+service_name+' is not in the VCAP_SERVICES, did you forget to bind it?');
  }

} else {
  console.log('No VCAP_SERVICES found in ENV, using defaults for local development');
}

console.log('service_url = ' + service_url);
console.log('service_username = ' + service_username);
console.log('service_password = ' + new Array(service_password.length).join("X"));

var auth = 'Basic ' + new Buffer(service_username + ':' + service_password).toString('base64');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  // index.html will be rendered on '/'
});

var dataFromTwitterUS="";
var dataFromTwitterPerState="";
var flatTraitsArray = {USdata: null, stateData: null};

app.post('/map', function(req, res){
  var res = res;
  console.log('Data received from font-end ==================================================');
  console.log(req.body.geo);
  console.log(req.body.subject);
  console.log('End of data received from font-end ===========================================');

  // See User Modeling API docs. Path to profile analysis is /api/v2/profile
  // remove the last / from service_url if exist
 
    
  // create a profile request with the text and the htpps options and call it
  // `req.body.subject` is the subject that was entered by the end user
  // TODO: to have the end user enter the date
  var analyzeState = function () {
    console.log('analyzeState')
    T.get('search/tweets', { q: ''+req.body.subject+' since:2014-10-01', 
                             count: 5000, geocode: req.body.geo, lang: 'en' },
                             function(err, data, response) {
      console.log(data.statuses.length)
      for(var i = 0; i < data.statuses.length; i++) {
        // accumulate the data (each tweet as a text) received from twitter
        //console.log(data.statuses[i].text)
        dataFromTwitterPerState += data.statuses[i].text;
      }
      watson(dataFromTwitterPerState, res, false);
      // var stream = T.stream('statuses/filter', { locations: req.body.geo,
      //                        track: req.body.subject, 
      //                        lang: 'en', geo_enabled: true });

      // stream.on('tweet', function (tweet) {
      //   dataFromTwitter += tweet.text;
      //   if (dataFromTwitter.length < 1000) {
      //   } else {
      //     analyzeWithWatson(dataFromTwitter);
      //     stream.stop();
      //   }
      // });
      // ***************** DO NOT MODIFY ********************************
      // ================  Watson analysis ==============================

    });
  };

  var analyzeNation = function() {
    console.log('analyzeNation')
    var geoUS = ['39.8','-95.583068847656','2500km']
    T.get('search/tweets', { q: ''+req.body.subject+' since:2014-10-01', 
                             count: 5000, geocode: geoUS , lang: 'en' },
                             function(err, data, response) {

      for(var i = 0; i < data.statuses.length; i++) {
        // accumulate the data (each tweet as a text) received from twitter
        //console.log(data.statuses[i].text)
        dataFromTwitterUS += data.statuses[i].text;
      }
      watson(dataFromTwitterUS, res, true);
      analyzeState();
      // var stream = T.stream('statuses/filter', { locations: req.body.geo,
      //                        track: req.body.subject, 
      //                        lang: 'en', geo_enabled: true });

      // stream.on('tweet', function (tweet) {
      //   dataFromTwitter += tweet.text;
      //   if (dataFromTwitter.length < 1000) {
      //   } else {
      //     analyzeWithWatson(dataFromTwitter);
      //     stream.stop();
      //   }
      // });
      // ***************** DO NOT MODIFY ********************************

    });
  };
  analyzeNation();
}); 

// ================  Watson analysis ==============================
var watson =  function(data, res, called) {

  var parts = url.parse(service_url.replace(/\/$/,''));
  var profile_options = { host: parts.hostname,
    port: parts.port,
    path: parts.pathname + "/api/v2/profile",
    method: 'POST',
    headers: {
      'Content-Type'  :'application/json',
      'Authorization' :  auth }
    };

  create_profile_request(profile_options, data)(function(error,profile_string) {
    console.log('dataFromTwitterUS', data);
    if (error) console.log(error);
    else {
      // parse the profile and format it
      var profile_json = JSON.parse(profile_string);
      var flat_traits = flatten.flat(profile_json.tree);

      // Extend the profile options and change the request path to get the visualization
      // Path to visualization is /api/v2/visualize, add w and h to get 900x900 chart
      var viz_options = extend(profile_options, { path :  parts.pathname + "/api/v2/visualize?w=900&h=900&imgurl=%2Fimages%2Fapp.png"})

      // create a visualization request with the profile data
      create_viz_request(viz_options,profile_string)(function(error,viz) {
        if (error) res.render('index',{'error': error.message});
        else {
          //Here we get the results from Watson and send it back to the client
          //console.log(flat_traits);
          if (called) {
            flatTraitsArray.USdata = flat_traits;
          } else {
            flatTraitsArray.stateData = flat_traits;
            res.send(flatTraitsArray);
          }
        }
      });
    }
  });
};
//======== end Watson analysis =============================== 

// creates a request function using the https options and the text in content
// the function that return receives a callback
var create_profile_request = function(options,content) {
  return function (/*function*/ callback) {
    // create the post data to send to the User Modeling service
    var post_data = {
      'contentItems' : [{ 
        'userid' : 'dummy',
        'id' : 'dummyUuid',
        'sourceid' : 'freetext',
        'contenttype' : 'text/plain',
        'language' : 'en',
        'content': content
      }]
    };
    // Create a request to POST to the User Modeling service
    var profile_req = https.request(options, function(result) {
      result.setEncoding('utf-8');
      var response_string = '';

      result.on('data', function(chunk) {
        response_string += chunk;
      });
      
      result.on('end', function() {

        if (result.statusCode != 200) {
          var error = JSON.parse(response_string);
          callback({'message': error.user_message}, null);
        } else
          callback(null,response_string);
      });
    });
  
    profile_req.on('error', function(e) {
      callback(e,null);
    });

    profile_req.write(JSON.stringify(post_data));
    profile_req.end();
  }
};
// creates a request function using the https options and the profile 
// the function that return receives a callback
var create_viz_request = function(options,profile) {
  return function (/*function*/ callback) {
    // Create a request to POST to the User Modeling service
    var viz_req = https.request(options, function(result) {
      result.setEncoding('utf-8');
      var response_string = '';

      result.on('data', function(chunk) {
        response_string += chunk;
      });
      
      result.on('end', function() {
        if (result.statusCode != 200) {
          var error = JSON.parse(response_string);
          callback({'message': error.user_message}, null);
        } else
          callback(null,response_string);      });
    });
  
    viz_req.on('error', function(e) {
      callback(e,null);
    });
    viz_req.write(profile);
    viz_req.end();
  }
};

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port, host);
