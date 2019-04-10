var express = require('express');
var router = express.Router();
// var connection = require('../lib/dbConnection');

var auth = require('../middlewares/authentication');//-------Middleware

router.get(`/`, auth.isLoggedIn, function (req, res, next) {//------table data of current user
    connection.query("SELECT uid, eid, title, price FROM users NATURAL JOIN expenses where uid = ?", req.user.uid,
        (err, result) => {
            if (err) throw err;
            res.send({ ...result })
        });
});

router.get(`/:id/user-expenses`, auth.isLoggedIn, function (req, res, next) {//------table data by user EXPENSES id
    connection.query("SELECT uid, eid, title, price FROM users NATURAL JOIN expenses where eid = ?", req.params.id,
        (err, result) => {
            if (err) throw err;
            res.send({ ...result, message: 'insert OK.' })
        });
});

router.post('/', auth.isLoggedIn, (req,res)=>{//-------data insert
    var insertO ={
      uid: req.user.uid,
      title: req.body.title,
      price: req.body.price
    };
    if(!insertO.title || !insertO.price) return res.send('title or price is empty.');
    connection.query('insert into expenses set ?', insertO, (err, result)=>{
      if(err)  throw err;
      res.redirect(301, `/expenses/${result.insertId}/user-expenses`)
    });
  });
module.exports = router;