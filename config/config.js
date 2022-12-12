const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8HewhY0fb3c7A6v',
    database: 'udemy_delivery'
});

db.connect(function(err) {
    if (err) throw err;  
  
    console.log('DATABASE CONNECTED!');
});

module.exports = db;