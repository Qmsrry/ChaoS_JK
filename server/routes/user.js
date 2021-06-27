const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

/* Get token, Return user info */
router.get('/', function (req, res, next) {
  console.log(req.user);
  const token = req.user.email;
  console.log(token);
  if (token)
  {
    User.findOne({ email: token },
      function (err, doc) {
        if (err) return console.error(err);
        if (doc)//存在该邮箱对应用户数据
        {
          payload = { name: doc.name, role: doc.role, avatar: null }
          res.status(200);
          res.json({...payload });
        }
        else {
          res.status(404);
          res.json({ message: "获取用户信息失败" });
        }
      });
  }
  else
  {
    res.status(401);
    res.json({ status: 1, message: "用户验证失败" })
  }
  
});
module.exports = router;