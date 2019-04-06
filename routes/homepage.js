var express = require('express');
var router = express.Router();

var auth = require('../middlewares/authentication');//-------Middleware


router.get('/homepage', auth.isLoggedIn, (req, res) => {
  res.send({
    user: req.user.email,
    income: '/income',
    expenses: `/expenses`,
    logout: '/logout'
  });
});

module.exports = router;
