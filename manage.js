
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var ManageSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    name:  String,
    manageName:  String,
    password:String,
    phoneNum:Number,
    eMail:String,
    userImg:{ type: String, default: "/upload/images/userlogo.png" },
    registerDate:{type:Date,default:Date.now}

});
var Manage = mongoose.model("Manage",ManageSchema);

module.exports = Manage;


