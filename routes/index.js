var express = require('express');
var router = express.Router();
var User = require("../models/User");

router.get('/', (req,res)=>{
    User.find({}).populate("income").exec(function (err,result){
        if(err) throw err;
        console.log(result)
        res.send(
            result
        );
    });


})

module.exports = router;