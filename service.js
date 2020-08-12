const pool = require('./database');

exports.insertSearch = (search) => {
    try {
        const SQL = mysql.format("INSERT INTO searches (username, crypto) VALUES (?, ?, CURRENT_TIMESTAMP)", [search.username, search.crypto]);
        const conn = pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query(SQL, (err, response) => {
                if (err) throw err;
                

                conn.release();
            });
        })
    } catch (err) {
        console.error(err);
    }
}

exports.getTopSearch = () => {

}

exports.getLastSearchByUser = (username) => {

}