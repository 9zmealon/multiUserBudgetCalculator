var mongoose = require('mongoose');
// mongoose.set('debug', true);//=======================================================imp
mongoose.connect('mongodb://localhost:27017/multiuserbudgetcalculator', {useNewUrlParser: true})
// .then(res=>{
//     console.log("Connected")
// });


module.exports = mongoose;