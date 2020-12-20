var mongoose = require('mongoose');
var shortid = require('shortid');
var RW = require('../util/randomWord');
var rw = RW('abcdefghijklmnopqrstuvwxyz1234567890');

var Schema = mongoose.Schema;

var ContentListSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    name:{type:String,default:"Chris"},
    author:{type:String,default:"administrators1"},
    yc:{type:String,default:"yuanchuang"},
    childName:{type:String,default:"subtitle"},
    url:String,
    date:String,
    sortDate:{type:Date,default:new Date()},
    oldDate:{type:Date,default:new Date()},
    classLists:String
});
var ContentList = mongoose.model("ContentList",ContentListSchema);

module.exports = ContentList;
