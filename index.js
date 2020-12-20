var express = require('express');
var router = express.Router();

var Manage=require('../models/manage');
var Dbfind=require('../util/Dbfind');



router.post('/register', function(req, res, next) {
  Manage.findOne({manageName:req.body.manageName}, function (error,result) {
    if(result==null){
      req.body.password=Dbfind.encrypt(req.body.password,'juzishu');
      var addManage=new Manage(req.body);
      addManage.save(function (error, result) {
        if(error){
          res.json({err:error})
        }else{
          res.json({status:1})
        }
      });
    }else{
      res.json({status:0})
    }
  })
});
router.post('/login', function(req, res, next) {
  req.header("Access-Control-Allow-Credentials: true");
  req.body.password=Dbfind.encrypt(req.body.password,'juzishu');
  Manage.findOne({manageName:req.body.manageName,password:req.body.password}, function (error,result) {
    if(error){
      res.json({err:error})
    }else{
      if(result==null){
        res.json({status:0});
      }else{
        res.json({status:1,id:result._id})
      }
    }

  })
});
module.exports = router;
