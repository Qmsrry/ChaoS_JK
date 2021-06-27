const mongoose = require('mongoose');
const db = require('./config/mongoose.js')();
const Auth = mongoose.model('Auth');
const Code = mongoose.model('Code');
const User = mongoose.model('User');
const Device = mongoose.model('Device');

const TEST_User = new User({
  name: "test",
  email: "csjk@zju.edu.cn",
  role: "admin"
})

TEST_User.save();