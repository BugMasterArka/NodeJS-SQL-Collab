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

        let sql = 'SELECT';
        if(req.body.eid==true)
            sql = sql + ' eid';
        if(req.body.ename==true && req.body.eid==true)
            sql = sql + ', ename';
        else if(req.body.ename==true && req.body.eid==false)
            sql = sql + ' ename';
        if(req.body.salary==true && (req.body.eid==true || req.body.ename==true))
            sql = sql + ', salary';
        else if(req.body.salary==true && (req.body.eid==false || req.body.ename==false))
            sql = sql + ' salary';
        sql = sql + ' FROM employee;';
        console.log(sql);
        con.query(sql, function(err,result){
            if(err) throw err;
            console.log(result);
            res.status(200).send(result);
        });
});

module.exports = router;