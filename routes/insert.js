const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const {con} = require('../db')

//inserting
router.post('/',[
        body('eid').isNumeric(),
        body('ename').isLength({min: 5}),
        body('salary').isFloat()
    ],  
    (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body)

        let sql = `INSERT INTO employee VALUES (?,?,?);`;
        let values = [req.body.eid,req.body.ename,req.body.salary];

        con.query(sql, values,function (err, result) {
            if (err) throw err;
            console.log(result)
            console.log("Number of records inserted: " + result.affectedRows);
            res.status(200).json({"status":"ok"})
        });

});

//testing route
router.post('/testBody',[
        body('eid').isNumeric(),
        body('ename').isLength({min: 5}),
        body('salary').isFloat()
    ],
(req,res)=>{
    console.log(req.body)
    res.status(200).json({"status":"ok"});
})

module.exports = router;