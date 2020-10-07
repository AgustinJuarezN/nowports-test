const mysql = require("mysql");

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'nowports-test',
}

const connection = mysql.createConnection(config);

module.exports = connection;