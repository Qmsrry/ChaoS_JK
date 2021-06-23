var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const Auth = mongoose.model('Auth');

/* Get username & passwod, Return the token */
router.post('/', function (req, res, next) {
  const{username, password} = req.body
  console.log(req.body)
  Auth.findOne({username,password},
    function (err, doc) {
      if (err) return console.error(err);
      if (doc)//存在该用户名与密码
      {
        res.json({status:0,token: doc.email})
      }
      else
      {
        res.json({status:1,message: "用户名或密码错误"})
      }
    });
});

router.get('/', function(req, res, next) {
  Auth.find({},
    function (err, docs) {
      if (err) return console.error(err);
      res.json(docs[0]);
    });
});
module.exports = router;