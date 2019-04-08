var mongoose = require('../lib/mongo');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var incomeSchema = new Schema({
    iid: ObjectId,
    uid: ObjectId,
    title: String,
    price: Number

});

var Income = mongoose.model('income', incomeSchema);
module.exports = Income;
