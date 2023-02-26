const express = require('express')
// const sql = require('./db')

const app = express()
app.use(express.json())

// inserting values to the table
app.use('/api/insert',require('./routes/insert'))

// reading values from table
app.use('/api/read',require('./routes/read'))

// updating columns in table
app.use('/api/update',require('./routes/update'))

app.listen(3000,()=>{
    console.log('Server running on port 3000')
    // sql.connectToSQL();
})