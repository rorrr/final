var express = require('express');
var router = express.Router();
var SiteInfo=require("../models/siteInfo");
var InfoList=require("../models/infoList");

router.get('/info', function(req, res, next) {
  SiteInfo.find({}, function (error, result) {
    console.log(result);
    if(error){
      res.json({err:error})
    }else{
      res.json(result)
    }
  })
});
router.get('/infolist', function(req, res, next) {
  InfoList.find({}, function (error, result) {
    console.log(result);
    if(error){
      res.json({err:error})
    }else{
      res.json(result)
    }
  })
});
router.post('/info', function(req, res, next) {
  SiteInfo.findOne({}, function (error,result) {
    if(result == null){
      const addSiteInfo=new SiteInfo(req.body);
      addSiteInfo.save(function (error) {
        if(error){
          res.json({err:error})
        }else{
          res.json({status:1})
        }
      })
    }else{
      SiteInfo.findOne({},req.body, function (error, result) {
        if(error){
          console.log(error)
        }else{
          SiteInfo.findOneAndUpdate({_id:result._id},req.body, function (error,result) {
            res.json({status:1})
          });

        }
      })
    }
  })
});

module.exports = router;
