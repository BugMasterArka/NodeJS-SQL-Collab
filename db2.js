const {createPool} = require('mysql')

exports.pool = createPool({
    host    :'localhost',
    user    :'root',
    password:'root',
    database:'mysql_test',
    connectionLimit: 10
})