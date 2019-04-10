var express = require('express');
var router = express.Router();
var Income = require("../models/Income");

router.get('/', (req,res)=>{
    Income.find({}).populate("users").exec(function (err,result){
        if(err) throw err;
        console.log(result)
        res.send(
            result
        );
    });


})

module.exports = router;