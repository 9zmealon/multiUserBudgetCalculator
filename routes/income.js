var express = require('express');
var router = express.Router();
var connection = require('../lib/dbConnection');
var Income = require('../models/Income');

var auth = require('../middlewares/authentication');//-------Middleware

router.get('/', auth.isLoggedIn, function (req, res, next) {//------income table of current user

  connection.query("SELECT uid, iid, title, price FROM users NATURAL JOIN income where uid = ?", req.user.uid,
    (err, result) => {
      if (err) throw err;
      res.send({ ...result })
    });
});

router.get('/:id/user-income', auth.isLoggedIn, function (req, res, next) {//------table data by user INcOME id

  connection.query("SELECT uid, iid, title, price FROM users NATURAL JOIN income where iid = ?", req.params.id,
    (err, result) => {
      if (err) throw err;
      res.send({ ...result, message: 'Successfully inserted' })
    });
});

router.post('/', auth.isLoggedIn, (req,res)=>{//-------data insert
  var insertO ={
    uid: req.user.uid,
    title: req.body.title,
    price: req.body.price
  };
  if(!insertO.title || !insertO.price) return res.send('title or price is empty.');
  connection.query('insert into income set ?', insertO, (err, result)=>{
    if(err)  throw err;
    res.redirect(301, `/income/${result.insertId}/user-income`)
  });
});
module.exports = router;