var mongoose = require('../dbConnection/mongo');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
    // _id: ObjectId,
    email: String,
    password: String ,
    incomes: [{type: ObjectId, ref: "incomes"}],
    expenses: [{type: ObjectId, ref: "expenses"}],
})

var User = mongoose.model('users', userSchema);

module.exports = User;