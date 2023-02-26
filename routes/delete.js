const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const {con} = require('../db')

//delete a particular row based on eid
router.post('/',[
        body('eid').isNumeric(),
    ],
(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    sql = 'DELETE FROM employee WHERE eid=?';

    con.query(sql,req.body.eid,function(err,result){
        if(err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

module.exports = router;