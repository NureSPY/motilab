const express = require('express');
const router = express.Router();
const query = require('../dbConnector')
router.use((req,res,next)=>{
    console.log("[Mark query]");
    next();
})


router.route('/')
.get((req,res)=>{
    query('SELECT * FROM lpr;',response=>{
        console.log(response);
        res.send(response)
    })
})
.post((req,res)=>{
    query(`INSERT IGNORE INTO lpr(LName) VALUES('${req.body.LName}')`,response=>{
        console.log(res);
        res.send({affectedRows:response.affectedRows})
    })
})
.delete((req,res)=>{
  query(`DELETE FROM lpr WHERE LName='${req.body.LName}'`,response=>{
      console.log(response);
      res.send({affectedRows:response.affectedRows})
  })
})
.put((req,res)=>{
  query(`UPDATE lpr SET LName='${req.body.newLName}' WHERE LName='${req.body.LName}'`,response=>{
      console.log(response);
      res.send({affectedRows:response.affectedRows})
  })
})
    


module.exports = router;