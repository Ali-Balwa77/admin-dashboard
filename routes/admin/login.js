var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
// var bcrypt = require('bcryptjs');
var {sqlCon} = require('../../config/dbConnection')
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("this is login trigger")
  console.log(req.cookies)

  if(req.cookies.token && req.cookies.token != 'expired') return res.redirect('/dashboard')
  
  res.render('admin/login', {message: ""});
});

router.post('/', function(req, res, next) {
 loginSql(req,res) 
})

const loginSql = (req,res) =>{
  console.log(req.body,"this is we are getting in body")
  
  let query = `select * from admins where email='${req.body.email}'`
  sqlCon.query(query,(err,result)=>{
    
    if(err) throw err;
    console.log("trigger", result[0])
    if(result[0] !== undefined){
      let user = result[0]
      var token = jwt.sign({ id: user.id }, process.env.jwt_admin_secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      if(user){
        var query = `select * from admins where password='${req.body.password}'`
        sqlCon.query(query,(err,result)=>{
        if(err) throw err;
        console.log(result,"this is the result")
        if(result){
          const oneMinute = 60000
          console.log(new Date(Date.now()))
          console.log(new Date(Date.now() + oneMinute*100))
          res.cookie('token', token, {
            expires: new Date(Date.now() + oneMinute*100),
            secure: false, // set to true if your using https
            httpOnly: true,
          });
          console.log("loggin done")
          res.redirect('/dashboard')
        }else{
          console.log("this is trigger 1=2")
          res.render('admin/login',{message: "wrong password"})
        }
      });}
    }else{
      console.log("this is triggering")
    res.render('admin/login',{message: "No user with this username"})}
  })
}

module.exports = router;
