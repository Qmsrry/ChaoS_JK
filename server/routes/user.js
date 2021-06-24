var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const User = mongoose.model('User');

/* Get token, Return user info */
router.get('/', function (req, res, next) {
  const token = req.get("Authorization");
  console.log(token);
  if (token)
  {
    User.findOne({ email: token },
      function (err, doc) {
        if (err) return console.error(err);
        if (doc)//存在该邮箱对应用户数据
        {
          console.log(req.get("Authorization"))
          payload = { name: doc.name, role: doc.role, avatar: null }
          res.json({ status: 0, ...payload });
        }
        else {
          res.json({ status: 1, message: "获取用户信息失败" })
        }
      });
  }
  else
  {
    res.json({ status: 1, message: "用户验证失败!" })
  }
  
});
module.exports = router;