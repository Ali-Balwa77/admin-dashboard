var jwt = require('jsonwebtoken');

const jwtAuthAdmin = (req, res, next) => {
    const token = req.cookies.token || '';
    try {
      if (!token) {
        console.log("no token")
        return res.redirect('/login')
        // return res.status(401).json('You need to Login')
   
      }
      const decrypt = jwt.verify(token, process.env.jwt_admin_secret);
      req.user = {
        id: decrypt.id,
        admin: decrypt.admin
      };
      next();
    } catch (err) {
      console.log(err)
      if(err.toString() == "JsonWebTokenError: jwt malformed") return res.redirect('/login')
      if(err.toString() == "JsonWebTokenError: invalid signature") return res.render('unauthorizedAccess')
      
      return res.status(500).json(err.toString());
      
    }
  };

module.exports = jwtAuthAdmin