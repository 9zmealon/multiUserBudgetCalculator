var express = require('express');
var router = express.Router();
var connection = require('../lib/dbConnection');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  (username, password, done) => {
    connection.query('select * from users where email = ? and password = ?', [username, password],
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
  }))
module.exports = router;
