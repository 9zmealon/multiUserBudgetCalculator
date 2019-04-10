var mongoose = require('../lib/mongo');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var incomeSchema = new Schema({
    iid: ObjectId,
    uid: {type: ObjectId, ref:'users'},
    title: String,
    price: Number

});

var Income = mongoose.model('incomes', incomeSchema);
module.exports = Income;
