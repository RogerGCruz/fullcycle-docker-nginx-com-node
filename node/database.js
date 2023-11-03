const config = {
    host: "db",
    user: "root",
    password: "root",
    database: "fullcycle"
  };
  
var mysql = require('mysql');
var connection = mysql.createConnection(config);

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;