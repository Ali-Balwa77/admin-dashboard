var jwt = require('jsonwebtoken')
var {sqlCon}= require('../config/dbConnection')
const getCurrentUser = (req) => {
    console.log(req.cookies.token)
    const decrypt = jwt.verify(req.cookies.token, process.env.jwt_secret);
    let query =  `select * from tbl_client where client_Id = ${decrypt.id}`
    sqlCon.query(query,(err,result)=>{
      if(err) console.error(err)
      // console.log(result)
      return result
    })
}
module.exports = getCurrentUser;