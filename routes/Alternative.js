const express = require('express');
const router = express.Router();
const query = require('../dbConnector')
router.use((req,res,next)=>{
    console.log("[Alternative query]");
    next();
})


router.route('/')
        .get((req,res)=>{
            query('SELECT * FROM alternative;', response=>{
                console.log(response);
                res.send(response)
            })
        })
        .post((req,res)=>{
            query(`INSERT IGNORE INTO alternative(AName) VALUES('${req.body.AName}')`,response=>{
                console.log(response);
                res.send({affectedRows:response.affectedRows})
            })
        })
        .delete((req,res)=>{
            query(`DELETE FROM alternative WHERE AName='${req.body.AName}'`,response=>{
                console.log(response);
            })
        })
        .put((req,res)=>{
            query(`UPDATE alternative SET AName='${req.body.newAName}' WHERE AName='${req.body.AName}'`,response=>{
                console.log(response);
            })
        })


module.exports = router;