const express = require('express');
const router = express.Router();
const query = require('../dbConnector')
router.use((req,res,next)=>{
    console.log("[Vector query]");
    next();
})

router.route('/')
      .get((req, res)=>{
        query('select * from vector;',response=>{
          res.send(response)
        })
      })
      .post((req,res)=>{
        let{AName, MName} = req.body;
        query(`select IdAlt from alternative where AName='${AName}'`,response=>{
            let {IdAlt} = response[0];
            query(`select IdMark from mark where MName='${MName}'`,response=>{
                let {IdMark} = response[0];
                query(`insert into vector(IdAlt, IdMark) values('${IdAlt}','${IdMark}')`,response=>{
                    res.send({affectedRows: response.affectedRows})
                })
            })
        })
      })
      .delete((req,res)=>{
        let{AName, MName} = req.body;
        query(`select IdAlt from alternative where AName='${AName}'`,response=>{
            let {IdAlt} = response[0];
            query(`select IdMark from mark where MName='${MName}'`,response=>{
                let {IdMark} = response[0];
                query(`delete from vector where IdAlt='${IdAlt}' AND IdMark='${IdMark}'`,response=>{
                    res.send({affectedRows: response.affectedRows})
                })
            })
        })
      })
      .put((req,res)=>{
        let{AName, MName, newAName, newMName} = req.body;
        query(`UPDATE vector SET IdAlt =(SELECT IdAlt from alternative WHERE AName='${newAName}'),
        IdMark =(SELECT IdMark from mark WHERE MName='${newMName}')
        where IdAlt = (select IdAlt from alternative where AName='${AName}') AND
        IdMark = (select IdMark from mark where MName='${MName}')`,response=>{
            res.send({affectedRows: response.affectedRows})
        })
 
      })


module.exports = router;