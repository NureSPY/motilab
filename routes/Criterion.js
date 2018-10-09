const express = require('express');
const router = express.Router();
const query = require('../dbConnector')
router.use((req,res,next)=>{
    console.log("[Criterion query]");
    next();
})

router.route('/')
      .get((req, res)=>{
        query('select * from criterion;',response=>{
          res.send(response)
        })
      })
      .post((req,res)=>{
        let {CName, CType, OptimType, EdIzmer, ScaleType} = req.body;
        query(`INSERT IGNORE INTO criterion(CName, CType, OptimType, EdIzmer, ScaleType) 
        VALUES('${CName}','${CType}','${OptimType}','${EdIzmer}','${ScaleType}')`,response=>{
          res.send({affectedRows:response.affectedRows})
        })
      })
      .delete((req,res)=>{
        let {CName} = req.body;
        try {
          query(`delete from criterion where CName='${CName}'`,response=>{
            res.send({affectedRows:response.affectedRows})
          })
        } catch (error) {
          res.send(`Error: ${error}`)
        }
      })
      .put((req,res)=>{
        let {CName,newCName, CType, OptimType, EdIzmer, ScaleType} = req.body;
        query(`UPDATE criterion SET CName ='${newCName}'
                                    ,CType='${CType}'
                                    ,OptimType='${OptimType}'
                                    ,EdIzmer='${EdIzmer}'
                                    ,ScaleType='${ScaleType}'
                                    WHERE CName='${CName}'`
        ,response=>{
          res.send({affectedRows:response.affectedRows})
            console.log(data)
        })
        
      })


module.exports = router;