const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Auth = mongoose.model('Auth');

const transport = require('../config/smtp.js')();
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

router.put('/code', async function (req, res, next) {
  const { email } = req.body;
  console.log(req.body);
  const e = await Auth.findOne({ email }).exec();
  if (e) {
    res.status(400);
    res.send({ message: '已有相同邮箱' });
  }
  transport.sendMail({
    from: 'csjk@zju.edu.cn', // 发件邮箱
    to: email, // 收件列表
    subject: '验证你的电子邮件', // 标题
    html: `
     <p>你好！</p>
     <p>您正在注册ChaoS_JK账号</p>
     <p>你的验证码是：<strong style="color: #ff4e2a;">123456</strong></p>
     <p>***该验证码5分钟内有效***</p>` // html 内容
  },
    function (error, data) {
      if (error) console.log(error);
      transport.close(); // 如果没用，关闭连接池
    })
  res.status(201);
  res.send();
});
module.exports = router;