var mongoose = require('../lib/mongo');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new Schema({
    id: ObjectId,
    email: String,
    password: String 
})


var User = mongoose.model('user',userSchema);

module.exports = User;