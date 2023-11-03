var express = require('express');
var router  = express.Router();
var db      = require('../database');

/**
 * Initializes the database by creating tables and inserting a new person.
 *
 * @param {string} name - The name of the person to be inserted.
 * @return {undefined} This function does not return any value.
 */
function initDb() {
    createTables();
    insertPeople("FullCycle User at " + new Date().toISOString());
}

/**
 * Creates tables in the database.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function createTables() {
    let sql =   `CREATE TABLE IF NOT EXISTS people( `+
                    ` id int primary key auto_increment, `+
                    ` name varchar(255) not null `+
                `)`;

    db.query(sql, function (err, result, fields) {
        if (err) throw err;
    });
}

/**
 * Inserts a new person into the database.
 *
 * @param {string} name - The name of the person to be inserted.
 * @return {undefined} This function does not return anything.
 */
function insertPeople(name) {
    let sql = `INSERT INTO people(name) VALUES('${name}')`;
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
    });
}

router.get('/', function (req, res, next) {
    initDb();
    let sql =   `SELECT * ` + 
                `FROM people `+ 
                `ORDER BY id DESC`;
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
            res.render('index', { title: 'Full Cycle!', userData: data });
    });
});

module.exports = router;