const moment = require("moment");

var Duration = require("duration");

let m = moment(); // Create a new date, which defaults to the current time
//m = moment("2016-08-02 15:37"); // Parse an ISO 8601 date string
//m.month(9);

console.log(m.format("DD"));

//console.log(m.month(9));
console.log(m.format("MM"));

console.log(m.format("yyyy"));

console.log(m.format("MM").toString() + m.format("yyyy").toString());

console.log(Date.now());

var duration = new Duration(
  new Date("Mon Oct 12 2020 12:48:29 GMT+0530"),
  new Date("Mon Oct 12 2020 20:15:29 GMT+0530")
);

console.log("duration: " + duration.minutes);

/* var datetime = new Date();
console.log(datetime);
var month = datetime.getMonth()+1;
console.log(month);
var year = datetime.getFullYear();
console.log(year); */
