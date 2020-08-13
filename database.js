const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "sangat",
    password: "password",
    database: "searchdb",
    timeout: 1800,
    connectTimeout: 3000
});

module.exports = pool;