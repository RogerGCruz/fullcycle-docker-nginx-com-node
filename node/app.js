const express = require('express')
const app = express()
const connection = require('./database');

const port = 3000

function initDb(connection) {
  createTables(connection);
}

function createTables(connection) {
  let sql =   `CREATE TABLE IF NOT EXISTS people( `+
                ` id int primary key auto_increment, `+
                ` name varchar(255) not null `+
              `)`;

  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
  });
}

function insertPeople(connection) {
  const name = 'FullCycle User at ' + new Date().toISOString();
  const sql = `INSERT INTO people(name) VALUES('${name}')`;
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
  });
}

const select = selectPeople(connection)

function selectPeople(connection) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM people`;
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

const listPeople = async () => {
  const allPeople = (await select)
  console.log(allPeople)
  return allPeople
}

app.get('/', async (req, res) => {
  initDb(connection)
  insertPeople(connection)
  const people = await listPeople();
  const listPeopleItems = people.map(item => `<li align="center">${item.name}</li>`).join('');
  const html = `<h1 align="center">Full Cycle Rocks!</h1>\n<ul>${listPeopleItems}</ul>`;
  res.send(html)
})