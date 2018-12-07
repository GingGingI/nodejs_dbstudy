const mysql = require('mysql');

var pw = 'root'

module.exports =  mysql.createConnection({
    host    : 'localhost',
    database: 'testdb',
    user    : 'root',
    password: pw
});