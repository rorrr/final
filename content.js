var mongoose = require('mongoose');
var shortid = require('shortid');
var RW = require('../util/randomWord');
var rw = RW('abcdefghijklmnopqrstuvwxyz1234567890');

var Schema = mongoose.Schema;

var ContentSchema = new Schema({
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
    classLists:String,
    contentTemp:String,
    smallImg:String
});
var Content = mongoose.model("Content",ContentSchema);

module.exports = Content;
