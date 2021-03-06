const pool = require('./database');
const mysql = require('mysql');

// Keeps record of searches made by various users
exports.insertSearch = (search) => {
    try {
        const SQL = mysql.format("INSERT INTO searches (userId, coinId, searched_on) VALUES (?, ?, CURRENT_TIMESTAMP)", [search.userId, search.coinId]);
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
// Gets last 100 (by default) crypto searches by a particular user
exports.getSearch = (userId, limit) => {
    
    let search_limit = 100;
    search_limit = (limit && limit > 0) ? parseInt(limit) : search_limit;
    let SQL = "";
    // Decide query based on input
    if (userId)
        SQL = mysql.format("SELECT DISTINCT coinId FROM (SELECT coinId, searched_on FROM searches WHERE userId=? ORDER BY searched_on DESC LIMIT ?) AS last_searched", [userId, search_limit]);
    else
        SQL = mysql.format("SELECT coinId FROM (SELECT coinId, COUNT(*) FROM distinct_search_last_24_hours GROUP BY coinId ORDER BY COUNT(*) DESC LIMIT ?) AS counts", [search_limit]);
    
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