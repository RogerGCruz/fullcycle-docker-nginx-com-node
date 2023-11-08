const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'fullcycle'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;