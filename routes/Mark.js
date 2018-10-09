const express = require('express');
const router = express.Router();
const query = require('../dbConnector')
router.use((req,res,next)=>{
    console.log("[Mark query]");
    next();
})


router.route('/')
      .get((req, res)=>{
        query('select * from mark;',response=>{
          res.send(response)
        })
      })
      .post((req,res)=>{
        let {MName,CName} = req.body;
        query(`select IdCrit from criterion where CName='${CName}'`,data=>{
          let IdCrit = data[0].IdCrit;
          query(`insert into mark(IdCrit, MName) values('${IdCrit}','${MName}')`,data=>{
           console.log(data);
          })
        })
      })
      .delete((req,res)=>{
        let {MName} = req.body;
        try {
          query(`delete from mark where MName='${MName}'`,data=>{
            res.send({affectedRows:data.affectedRows})
          })
        } catch (error) {
          res.send(`Error: ${error}`)
        }
      })
      .put((req,res)=>{
        let {MName,CName} = req.body;
        query(`select IdCrit from criterion where CName='${CName}'`,data=>{
          let IdCrit = data[0].IdCrit;
          query(`UPDATE mark SET MName='${MName}', IdCrit='${IdCrit}'`,data=>{
            res.send({affectedRows:data.affectedRows})
          })
        
        })
        
      })


module.exports = router;