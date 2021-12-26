var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var adminloginRouter = require('./routes/admin/login')
var adminIndexRouter = require('./routes/admin/index');
var adminRegisterRouter = require('./routes/admin/register');
var checkPostcodeRouter = require('./routes/api/checkpostcode')
var insertLeadsRouter = require('./routes/api/insertleads')
var listAllLeadsRouter = require('./routes/api/listallleads')

var jwt = require('jsonwebtoken');
var jwtAuthAdmin = require('./utils/jwtAuthAdmin')

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/logout", (req, res) => {
        console.log("this is working")
        res.cookie('token', 'expired', {
            expires: new Date(Date.now() + 86400),
            secure: false, // set to true if your using https
            httpOnly: true,
        });
        res.cookie('sessionData', 'expired', {
            expires: new Date(Date.now() + 86400),
            secure: false, // set to true if your using https
            httpOnly: true,
        });
        res.redirect('/login')
    })
    // Api routes

app.use('/login', adminloginRouter)
app.use('/register', adminRegisterRouter)
app.use('/dashboard', jwtAuthAdmin, adminIndexRouter);
app.use('/checkpostcode',checkPostcodeRouter)
app.use('/insertleads',insertLeadsRouter)
app.use('/listallleads',listAllLeadsRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));

});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('page404');
    console.log(err)
});



app.listen(process.env.port, () => {
    console.log("app is running on port", process.env.port)
})
module.exports = app;