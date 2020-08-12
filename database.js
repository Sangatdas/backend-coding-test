const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 20,
    host: "localhost",
    user: "sangat",
    password: "password",
    database: "searchdb"
});

module.exports = pool;