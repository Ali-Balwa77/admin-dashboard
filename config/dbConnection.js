
var mysql = require('mysql');


var sqlCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin-dashboard"
});

sqlCon.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



module.exports = {sqlCon};