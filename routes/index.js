var express = require('express');
var router = express.Router();
var User = require("../models/User");

router.get('/', (req,res)=>{
    User.find((err,result)=>{
        if(err) throw err;
        res.send({
            result
        });
    });

})

module.exports = router;