const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const {con} = require('../db')

// increment salary
// router.post('/',[
//         body('eid').isNumeric(),
//         body('salary').isFloat()
//     ],
//     async (req,res)=>{
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         sql1 = 'SELECT salary FROM employee WHERE eid=?';
//         value=req.body.eid;
//         let curSalary;
//         await con.execute(sql1,[value],function(rows,results){
//             console.log(results);
//             curSalary=results[0].salary;
//             console.log(curSalary);

//             curSalary+=req.body.salary;
//             console.log(curSalary);

//             sql2 = 'UPDATE employee SET salary=? WHERE eid=?';
//             values=[curSalary,req.body.eid];

//             con.query(sql2,values,function(err,result){
//                 if(err) throw err;
//                 console.log(result);
//                 res.status(200).send(result);
//             });
//         });

//     });


router.post('/',[
    body('eid').isNumeric(),
    body('salary').isFloat()
],
(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    sql = 'UPDATE employee SET salary=salary+? WHERE eid=?';
    values=[req.body.salary,req.body.eid];
    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log(result);
        res.status(200).send(result);
    });

});

    module.exports = router;