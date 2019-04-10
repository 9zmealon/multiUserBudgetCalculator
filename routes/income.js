var express = require('express');
var router = express.Router();
var Income = require('../models/Income');

var auth = require('../middlewares/authentication');//-------Middleware

router.get('/', auth.isLoggedIn, function (req, res, next) {//------income table of current user

  Income.find({uid: req.user._id}).populate("uid").exec(
    (err, result) => {
      if (err) throw err;
      res.send({ ...result })
    });
});

router.get(`/:id/user-income`, auth.isLoggedIn, function (req, res, next) {//------table data by user EXPENSES id
  Income.find({uid: req.params.id}).populate("uid").exec(
      (err, result) => {
          if (err) throw err;
          res.send({ ...result, message: 'insert OK.' })
      });
});

router.post('/', auth.isLoggedIn, (req,res)=>{//-------data insert
  var insertO ={
    uid: req.user._id,
    title: req.body.title,
    price: req.body.price
  };
  if(!insertO.title || !insertO.price) return res.send('title or price is empty.');
  var income = new Income(insertO);
  income.save( (err, result)=>{
    if(err)  throw err;
    res.redirect(301, `/income/${result._id}/user-income`);
  });
});
module.exports = router;