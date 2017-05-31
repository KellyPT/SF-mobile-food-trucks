// var request = require('request');
//
// request('http://data.sfgov.org/resource/bbb8-hzi6.json', function (error, response, body) {
//   console.log(body);
// });

// to run:
// $ npm install request && node FoodTruckFinder.js

var request = require('request');
var url = require('url');

var options = {
    protocol: "http:",
    host: "data.sfgov.org",
    pathname: "/resource/bbb8-hzi6.json",
    search: "$query=SELECT applicant, location LIMIT 10"
};

var dataURL = url.format(options);

request(dataURL, function(error, response, body){
    if (error) {
        console.log("Failed to load business IDs from API");
        process.exit(1);
      }
    var results = JSON.parse(body);
    console.log(results);
});

// Applicant
// PermitLocation
// start24 <= Now <= end24
// DayOfWeek
// sorted alphabetically
