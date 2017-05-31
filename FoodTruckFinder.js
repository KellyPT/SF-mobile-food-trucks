var request = require('request');

request('http://data.sfgov.org/resource/bbb8-hzi6.json', function (error, response, body) {
  console.log(body);
});

// to run:
// $ npm install request && node FoodTruckFinder.js