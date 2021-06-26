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
        res.status(200);
        res.json({ token: doc.email })
      }
      else
      {
        res.status(401);
        res.json({message: "用户名或密码错误"})
      }
    });
});

router.delete('/', function (req, res, next) {
  res.status(204);
  res.send();
});
module.exports = router;