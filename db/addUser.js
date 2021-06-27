const mongoose = require('mongoose');
const _ = require('./config/mongoose.js')();
const Auth = mongoose.model('Auth');
const Code = mongoose.model('Code');
const User = mongoose.model('User');
const Device = mongoose.model('Device');
const db = mongoose.connection;
db.once('open', function () {
  const TEST_User = new User({
    name: "test",
    email: "csjk@zju.edu.cn",
    role: "admin"
  })

  TEST_User.save(function (err, _) {
    if (err) return console.error(err);
    process.exit();
  })

});