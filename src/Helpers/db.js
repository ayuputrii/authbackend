const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'authdb'
})

conn.connect(function(error) {
    if (error) throw error
    console.log('Database has Connected')

});

module.exports = conn