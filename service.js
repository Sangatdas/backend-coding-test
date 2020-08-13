const pool = require('./database');
const mysql = require('mysql');

// Keeps record of searches made by various users
exports.insertSearch = (search) => {
    try {
        const SQL = mysql.format("INSERT INTO searches (username, crypto, searched_on) VALUES (?, ?, CURRENT_TIMESTAMP)", [search.username, search.crypto]);
        pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(SQL, (err) => {
                if (err) throw err;
                console.info("Inserted 1 rows");
                conn.release();
            });
        })
    } catch (err) {
        console.error(err);
    }
}

// Gets top 100 (by default) crypto searches made by all users
exports.getTopSearch = (search) => {
    let limit = 100;
    limit = (search.limit && search.limit > 0) ? parseInt(search.limit) : limit;
    const SQL = mysql.format("SELECT crypto FROM (SELECT crypto, COUNT(*) FROM distinct_search_last_24_hours GROUP BY crypto ORDER BY COUNT(*) DESC) AS counts", [limit]);
    let result = new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(err);          
            conn.query(SQL, (err, result) => {
                if (err) reject(err);
                conn.release();
                resolve(result);
            });
        });
    });
    return result;
}

// Gets last 100 (by default) crypto searches by a particular user
exports.getLastSearchByUser = (search) => {
    let limit = 100;
    limit = (search.limit && search.limit > 0) ? parseInt(search.limit) : limit;
    const SQL = mysql.format("SELECT DISTINCT crypto FROM (SELECT crypto, searched_on FROM searches WHERE username=? ORDER BY timestamp DESC LIMIT ?) AS last_searched", [search.username, limit]);
    let result = new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(err);          
            conn.query(SQL, (err, result) => {
            if (err) reject(err);               
                conn.release();
                resolve(result);
            });
        });
    });
    return result;
}