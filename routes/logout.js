var express = require('express');
var router = express.Router();
var auth = require('../middlewares/authentication');//-------Middleware

router.get('/', auth.isLoggedIn, (req, res)=>{
    req.logOut();
    res.send('Successful Logout.');
});


module.exports= router;