
var url = require('url');
var crypto = require("crypto");
var mongoose = require('mongoose');
var shortid = require('shortid');


var Dbfind = {


    del : function(obj,req,res,logMsg){
        var params = url.parse(req.url,true);
        var targetId = params.query.uid;
        if(shortid.isValid(targetId)){
            obj.remove({_id : params.query.uid},function(err,result){
                if(err){
                    res.end(err);
                }else{
                    console.log(logMsg+" success!");
                    res.end("success");
                }
            })
        }else{
            res.end("非法参数");
        }

    },
    findAll : function(obj,req,res,logMsg){
        obj.find({}, function (err,result) {
            if(err){
                res.next(err);
            }else{
                console.log(logMsg+" success!");
                return res.json(result);
            }
        })
    },
    findOne : function(obj,req,res,logMsg){ 
        var params = url.parse(req.url,true);
        var targetId = params.query.uid;
        if(shortid.isValid(targetId)){
            obj.findOne({_id : targetId}, function (err,result) {
                if(err){
                    res.next(err);
                }else{
                    console.log(logMsg+" success!");
                    return res.json(result);
                }
            })
        }else{
            res.end("非法参数");
        }

    },
    updateOneByID : function(obj,req,res,logMsg){
        var params = url.parse(req.url,true);
        var targetId = params.query.uid;

        if(shortid.isValid(targetId)){
            var conditions = {_id : targetId};
            req.body.updateDate = new Date();
            var update = {$set : req.body};
            obj.update(conditions, update, function (err,result) {
                if(err){
                    res.end(err);
                }else{
                    console.log(logMsg+" success!");
                    res.end("success");
                }
            })
        }else{
            res.end("非法参数");
        }

    },
    addOne : function(obj,req,res){
        var newObj = new obj(req.body);
        newObj.save(function(err){
            if(err){
                res.end(err);
            }else{
                res.end("success");
            }
        });
    },

    pagination : function(obj,req,res,conditions){

        var params = url.parse(req.url,true);
        var startNum = (params.query.currentPage - 1)*params.query.limit + 1;
        var currentPage = Number(params.query.currentPage);
        var limit = Number(params.query.limit);
        var pageInfo;

        var query;
        if(conditions && conditions.length > 1){
            query=obj.find().or(conditions);
        }
        else if(conditions){
            query=obj.find(conditions);
        }
        else{
            query=obj.find({});
        }
        query.sort({'date': -1});
 
        query.exec(function(err,docs){
            if(err){
                console.log(err)

            }else {
                pageInfo = {
                    "totalItems" : docs.length,
                    "currentPage" : currentPage,
                    "limit" : limit,
                    "startNum" : Number(startNum)
                };

                return res.json({
                    docs : docs.slice(startNum - 1,startNum + limit -1),
                    pageInfo : pageInfo
                });
            }
        })
    },

    getPaginationResult : function(obj,req,res,q,filed){
        var searchKey = req.query.searchKey;
        var page = parseInt(req.query.page);
        var limit = parseInt(req.query.limit);
        if (!page) page = 1;
        if (!limit) limit = 15;
        var order = req.query.order;
        var sq = {}, Str, A = 'problemID', B = 'asc';
        if (order) {    
            Str = order.split('_');
            A = Str[0]; B = Str[1];
            sq[A] = B;   
        } else {
            sq.date = -1;  
        }

        var startNum = (page - 1)*limit;
        var resultList;
        var resultNum;
        if(q && q.length > 1){ 
            resultList = obj.find({'state':true}).or(q,filed).sort(sq).skip(startNum).limit(limit);
            resultNum = obj.find({'state':true}).or(q,filed).count();
        }else{
            resultList = obj.find(q,filed).sort(sq).skip(startNum).limit(limit);
            resultNum = obj.find(q,filed).count();
        }
        var pageInfo = {
            "totalItems" : resultNum,
            "currentPage" : page,
            "limit" : limit,
            "startNum" : startNum +1,
            "searchKey" : searchKey
        };
        var datasInfo = {
            docs : resultList,
            pageInfo : pageInfo
        };

        return datasInfo;
    },

    getDatasByParam : function(obj,req,res,q){
        var order = req.query.order;
        var limit = parseInt(req.query.limit);
        var sq = {}, Str, A = 'problemID', B = 'asc';
        if (order) {    
            Str = order.split('_');
            A = Str[0]; B = Str[1];
            sq[A] = B;    
        } else {
            sq.date = -1;    
        }
        if(!limit){
            return obj.find(q).sort(sq);
        }else{
            return obj.find(q).sort(sq).skip(0).limit(limit);
        }


    },

    getKeyArrByTokenId : function(tokenId){
        var newLink = DbOpt.decrypt(tokenId,settings.encrypt_key);
        var keyArr = newLink.split('$');
        return keyArr;
    },

    getCount : function(obj,req,res,conditions){ 
        obj.count(conditions, function (err, count) {
            if (err){
                console.log(err);
            }else{
                return res.json({
                    count : count
                });
            }

        });
    },
    encrypt : function(data,key){ 
        var cipher = crypto.createCipher("bf",key);
        var newPsd = "";
        newPsd += cipher.update(data,"utf8","hex");
        newPsd += cipher.final("hex");
        return newPsd;
    },
    decrypt : function(data,key){ 
        var decipher = crypto.createDecipher("bf",key);
        var oldPsd = "";
        oldPsd += decipher.update(data,"hex","utf8");
        oldPsd += decipher.final("utf8");
        return oldPsd;
    }
};



module.exports = Dbfind;