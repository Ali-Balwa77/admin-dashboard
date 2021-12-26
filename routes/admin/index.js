var express = require('express');
var router = express.Router();
// var dataTable = require('./usersDatatable')
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies,"this is in cookies");
  res.render('admin/index');
});

// router.use('/usersDatatable', dataTable);

module.exports = router;
