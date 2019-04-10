var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/multiuserbudgetcalculator', {useNewUrlParser: true})
.then(res=>{
    console.log("connected to mongo")
});



module.exports = mongoose;