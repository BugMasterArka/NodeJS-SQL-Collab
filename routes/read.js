const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const {con} = require('../db')

// read entire table
router.post('/',(req,res)=>{

    let sql = "SELECT * FROM employee;"

    con.query(sql, function(err, result){
        if(err) throw err;
        console.log(result);
        res.status(200).send(result);
    })
});

//read only a particular column
router.post('/column',[
        body("eid").isBoolean(),
        body("ename").isBoolean(),
        body("salary").isBoolean()
    ],(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // TODO: incomplete
});

module.exports = router;