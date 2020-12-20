
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var ColumnSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    name:  String,
    columnpid:Number,
    columnid:Number,
    level:Number,
    columnTop:Boolean,
    url:String,
    sort:String,
    descriptable:String

});
var Column = mongoose.model("Column",ColumnSchema);

module.exports = Column;


