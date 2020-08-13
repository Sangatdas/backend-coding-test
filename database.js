const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: "db",
    user: "root",
    password: "root",
    database: "searchdb",
    timeout: 1800,
    connectTimeout: 3000
});

module.exports = pool;