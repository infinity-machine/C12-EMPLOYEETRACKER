const mysql = require('mysql2');

const connect_data = {
    host: 'localhost',
    database: 'emp_data',
    user: 'root', 
    password:''
};

const connect = mysql.createPool(connect_data)

module.exports = connect;