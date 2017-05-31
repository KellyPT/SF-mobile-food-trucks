// var request = require('request');
//
// request('http://data.sfgov.org/resource/bbb8-hzi6.json', function (error, response, body) {
//   console.log(body);
// });

// to run:
// $ npm install request && node FoodTruckFinder.js

var request = require('request');
var url = require('url');
var columnify = require('columnify');

var currentDate = new Date();
var currentDay = currentDate.getDay();

var currentTime = "'" + ("0" + (currentDate.getHours() + 10)).slice(-2) + ":" + ("0" + currentDate.getMinutes()).slice(-2) + "'";

var resultsPerPage = 10;
var pageOffset = 1; // default pageOffset to 1, unless it's defined in the arguments
if (process.argv.length > 2){
    var parse = parseInt(process.argv[2]);
    if (!isNaN(parse)){ // if parsable then assign to pageOffset
        pageOffset = parse;
    }
}
var offsetValue = (pageOffset - 1) * resultsPerPage; // pageOffset starts from 1

var options = {
    protocol: "http:",
    host: "data.sfgov.org",
    pathname: "/resource/bbb8-hzi6.json",
    search: "$query=SELECT applicant, location, dayorder, start24, end24, permit WHERE dayorder=" + currentDay + " AND start24 <=" + currentTime + " AND " + currentTime + "<= end24 ORDER BY permit ASC LIMIT " + resultsPerPage + " OFFSET " + offsetValue
};

var dataURL = url.format(options);

request(dataURL, function(error, response, body){
    if (error) {
        console.log("Failed to load data.");
        process.exit(1);
      }
    var results = JSON.parse(body);
    var current_index = 0;

    console.log(columnify(
        results,
        { columnSplitter: '  |  '}
    ));
});
