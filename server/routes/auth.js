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

router.put('/', async function (req, res, next) {
  const { username, password, email, code } = req.body;
  const u = await Auth.findOne({ username }).exec();
  const e = await Auth.findOne({ email }).exec();
  if (u||e)
  {
    res.status(400);
    res.send({message:'已有相同用户名或邮箱'});
  }
  res.status(201);
  res.send();
});
module.exports = router;