var request = require('request');
var url = require('url');
var moment = require('moment');
require('moment-timezone');
var columnify = require('columnify');

var localDate = moment();
var sfDate = moment.tz(localDate.format(), "America/Los_Angeles");
var currentDay = sfDate.day();
var currentTime = sfDate.format("HH:mm");

var resultsPerPage = 10;
var pageOffset = 1; // default pageOffset to 1, unless it's defined in the arguments
if (process.argv.length > 2){
    var parse = parseInt(process.argv[2]);
    if (!isNaN(parse)){ // if parsable then assign to pageOffset
        pageOffset = parse > 1 ? parse : 1;
    }
}
var offsetValue = (pageOffset - 1) * resultsPerPage; // pageOffset starts from 1

var options = {
    protocol: "http:",
    host: "data.sfgov.org",
    pathname: "/resource/bbb8-hzi6.json",
    search: "$query=SELECT applicant AS food_truck, location AS address, start24 AS start_time, end24 AS end_time, permit WHERE dayorder=" + currentDay + " AND start_time <='" + currentTime + "' AND '" + currentTime + "'<= end_time ORDER BY food_truck ASC LIMIT " + resultsPerPage + " OFFSET " + offsetValue
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
        {
            columnSplitter: '  |  ',
            columns: ['food_truck', 'permit', 'address', 'start_time', 'end_time']
        }
    ));
});
