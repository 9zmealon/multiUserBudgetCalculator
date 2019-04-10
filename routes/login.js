var express = require('express');
var router = express.Router();
var User = require("../models/User");//-------Mongo Database

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  (username, password, done) => {
    User.findOne({email: username, password: password},
      (err, result) => {
        if (err) throw err;
        if (!result) return done(null, false, { message: 'user not found' });
        return done(null, result);
      });
  })
);

router.post('/',
  passport.authenticate('local', 
  {
    successRedirect: '/homepage',
    failureRedirect: '404',
    failureFlash: true
  }));


module.exports = router;
