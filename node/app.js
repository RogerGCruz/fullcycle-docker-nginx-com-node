const express     = require('express')
const app         = express()
const connection  = require('./database');
const port        = 3000
const table       = initDB(connection)
const insert      = insertPeople(connection)
const select      = selectPeople(connection)

/**
 * Retrieves a list of people.
 *
 * @return {Array} The list of people.
 */
const listPeople = async () => {
  const allPeople = (await select)
  return allPeople
}

/**
 * Initializes the database by creating a table named 'people' if it doesn't exist.
 *
 * @param {Object} connection - The connection object to the database.
 * @return {Promise} A promise that resolves with the result of the query if successful, or rejects with an error if there was an error executing the query.
 */
function initDB(connection) {
  return new Promise((resolve, reject) => {
    const sql = `create table if not exists people (
      id int not null auto_increment,
      name varchar(255) not null,
      primary key (id)
    )`
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

/**
 * Insert a new person into the database.
 *
 * @param {Object} connection - The connection object for the database.
 * @return {void} This function does not return any value.
 */
function insertPeople(connection) {
  const name = 'FullCycle User at ' + new Date().toISOString();
  const sql = `INSERT INTO people(name) VALUES('${name}')`;
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
  });
}

/**
 * Retrieves all the people from the database.
 *
 * @param {Object} connection - The database connection object.
 * @return {Promise} A promise that resolves to an array of people objects.
 */
function selectPeople(connection) {
  return new Promise((resolve, reject) => {
    const sql = `select * from people`
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

// Route default
app.get('/', async (req, res) => {
  const peoples = await listPeople()
  const listPeoples = '<ul>' + peoples.map(item => `<li>${item.name}</li>`).join('') + '</ul>'
  res.send(`<h1>Full Cycle Rocks!</h1>\n${listPeoples}`)
})

// Start the server
app.listen(port, () => {
  console.log(`Server start: ${port}`)
})