
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var InfoListSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    mingcheng:{type:String,default:"Default site name"},
    footInfo:{type:String,default:"default bottom information"},
    email:{type:String,default:"email"},
    xxLists:Array,
    aaLists:Array,
    bbLists:Array,
    yyLists:Array,
    ccLists:Array,
    ddLists:Array,
    c_tittle:{type:String,default:"tittle"},
    c_keywords:{type:String,default:"keyword"},
    powers:Array,
    sidekicks:Array,
    jianjie:{type:String,default:"。。。。。。。。。"}
});
var InfoList = mongoose.model("InfoList",InfoListSchema);

module.exports = InfoList;


