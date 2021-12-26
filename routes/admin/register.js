var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if(req.cookies.token && req.cookies.token != 'expired') return res.redirect('/')
  res.render('/register');
});

module.exports = router;