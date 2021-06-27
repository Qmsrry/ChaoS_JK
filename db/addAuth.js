const mongoose = require('mongoose');
const _ = require('./config/mongoose.js')();
const Auth = mongoose.model('Auth');
const Code = mongoose.model('Code');
const User = mongoose.model('User');
const Device = mongoose.model('Device');
const db = mongoose.connection;
db.once('open', function(){
  const TEST_Auth = new Auth({
    username: "test",
    password: "test",
    email: "csjk@zju.edu.cn"
  });
  TEST_Auth.save(function (err, _) {
    if (err) return console.error(err);
    process.exit();
  })
})
