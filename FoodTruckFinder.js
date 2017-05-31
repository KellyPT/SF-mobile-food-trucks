// var request = require('request');
//
// request('http://data.sfgov.org/resource/bbb8-hzi6.json', function (error, response, body) {
//   console.log(body);
// });

// to run:
// $ npm install request && node FoodTruckFinder.js

var request = require('request');
var url = require('url');
var moment = require('moment');
require('moment-timezone');
var columnify = require('columnify');

var localDate = moment();
var sfDate = moment.tz(localDate.format(), "America/Los_Angeles");
var currentDay = sfDate.day();
var currentTime = sfDate.format("HH:mm");

console.log("Day of week (SF) = " + currentDay);
console.log("Time (SF) = " + currentTime);

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
    search: "$query=SELECT applicant, location, dayorder, start24, end24, permit WHERE dayorder=" + currentDay + " AND start24 <='" + currentTime + "' AND '" + currentTime + "'<= end24 ORDER BY permit ASC LIMIT " + resultsPerPage + " OFFSET " + offsetValue
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
