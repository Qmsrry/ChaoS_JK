const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Auth = mongoose.model('Auth');
const Code = mongoose.model('Code');
const User = mongoose.model('User');
const transport = require('../config/smtp.js')();
const {http} = require('../../.config.js')
const jwt = require('jsonwebtoken')
const randomFns = () => { // 生成6位随机数
  let code = ""
  for (let i = 0; i < 6; i++) {
    code += parseInt(Math.random() * 10)
  }
  return parseInt(code)
}
/* Get username & passwod, Return the token */
router.put('/', function (req, res, next) {
  const{username, password} = req.body
  console.log(req.body)
  Auth.findOne({username,password},
    function (err, doc) {
      if (err) return console.error(err);
      if (doc)//存在该用户名与密码
      {
        const token = 'Bearer ' + jwt.sign(
          {
            _id: doc._id,
            email:doc.email
          },
          http.secret,
          {
            expiresIn: 3600 * 24 * 3
          }
        )
        res.status(200);
        res.json({ token })
      }
      else
      {
        res.status(401);
        res.json({message: "用户名或密码错误"})
      }
    });
});

/* Log out*/
router.delete('/', function (req, res, next) {
  res.status(204);
  res.send();
});

/* Register*/
router.post('/', async function (req, res, next) {
  const { username, password, email, code } = req.body;
  const u = await Auth.findOne({ username }).exec();
  const e = await Auth.findOne({ email }).exec();
  const c = await Code.findOne({ email }).exec();
  console.log(c);
  if (u||e)
  {
    res.status(400);
    res.send({message:'已有相同用户名或邮箱'});
  }
  else if (!c) {
    res.status(400);
    res.send({ message: '验证码不存在' });
  }
  else if (code != c.code)
  {
    res.status(400);
    res.send({ message: '验证码错误' });
  }
  else {
    const NEW_Auth = new Auth({
      username,
      password,
      email,
    });
    const NEW_User = new User({
      name: username,
      email,
      role: "admin"
    })
    NEW_Auth.save();
    NEW_User.save();
    res.status(201);
    res.send();
  }
  
});

/*Got Code*/
router.post('/code', async function (req, res, next) {
  const { email } = req.body;
  console.log(req.body.email);
  const e = await Auth.findOne({ email }).exec();
  if (e) {
    res.status(400);
    res.send({ message: '已有相同邮箱' });
  }
  const code = randomFns();
  transport.sendMail({
    from: 'csjk@zju.edu.cn', // 发件邮箱
    to: email, // 收件列表
    subject: '验证你的电子邮件', // 标题
    html: `
     <p>你好！</p>
     <p>您正在注册ChaoS_JK账号</p>
     <p>您的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
     <p>***该验证码5分钟内有效***</p>` // html 内容
  },
    function (error, data) {
      if (error) console.log(error);
      transport.close(); // 如果没用，关闭连接池
    });
  await Code.deleteMany({ email }).exec();
  const _ = await Code.insertMany({ email, code });
  setTimeout(async () => {    //5分钟后失效
    await Code.deleteMany({ email })
  }, 1000 * 60 * 5);
  res.status(201);
  res.send();
});
module.exports = router;