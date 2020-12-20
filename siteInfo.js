
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var SiteInfoSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    mingcheng:{type:String,default:"default site name"},
    footInfo:{type:String,default:"default bottom information"},
    email:{type:String,default:"email"},
    xxLists:{type:String,default:"list options"},
    aaLists:{type:String,default:"list options"},
    bbLists:{type:String,default:"list options"},
    yyLists:{type:String,default:"list options"},
    ccLists:{type:String,default:"list options"},
    ddLists:{type:String,default:"list options"},
    c_tittle:{type:String,default:"tittle"},
    c_keywords:{type:String,default:"keyword"},
    powers:{type:String,default:"。。。。。。。"},
    sidekicks:{type:String,default:"。。。。。"},
    jianjie:{type:String,default:"。。。。。。。。。"}
});
var SiteInfo = mongoose.model("SiteInfo",SiteInfoSchema);

module.exports = SiteInfo;


