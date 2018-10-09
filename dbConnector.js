var mysql = require('mysql');

let pool = mysql.createPool({
  host: "den1.mysql5.gear.host",
  user: "motilab1",
  password: "Zo2y_-EzxK2D",
  database: "motilab1"
});
function query(sql, cb)
{
      pool.getConnection((err, connection) =>{
      connection.query(sql, (err, result) =>{
        if(typeof cb === 'function' && !err)  cb(result);
        
        connection.release();
    
        if (err) throw err;
        });
      })
}

module.exports = query;