var {sqlCon} = require('./config/dbConnection')
var bcrypt = require('bcryptjs');

sqlCon.query(`update users SET password = "${bcrypt.hashSync("hello", 8)}" where id=1`,(err,result)=>{
    if(err) throw err
    console.log(result.affectedRows,"row updated")
})