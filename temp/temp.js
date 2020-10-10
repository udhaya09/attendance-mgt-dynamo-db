const moment = require('moment');

let m = moment();                 // Create a new date, which defaults to the current time
m = moment('2016-08-02 15:37');   // Parse an ISO 8601 date string
//m.month(9);  

//console.log(m.month(9));
console.log(m.format('MM'));

console.log(m.format('yyyy'));

console.log(m.format('MM').toString() + m.format('yyyy').toString());



/* var datetime = new Date();
console.log(datetime);
var month = datetime.getMonth()+1;
console.log(month);
var year = datetime.getFullYear();
console.log(year); */