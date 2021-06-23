var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const User = mongoose.model('User');

/* Get token, Return user info */
router.post('/', function (req, res, next) {
  const{token} = req.body
  console.log(req.body)
  User.findOne({email:token},
    function (err, doc) {
      if (err) return console.error(err);
      if (doc)//存在该邮箱对应用户数据
      {
        payload = {name:doc.name, role:doc.role, avatar:null}
        res.json({ status: 0, ...payload });
      }
      else
      {
        res.json({status:1,message: "获取用户信息失败"})
      }
    });
});

router.get('/', function(req, res, next) {
  User.find({},
    function (err, docs) {
      if (err) return console.error(err);
      res.json(docs[0]);
    });
});
module.exports = router;