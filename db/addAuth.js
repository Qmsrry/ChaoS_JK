const mongoose = require('mongoose');
const db = require('./config/mongoose.js')();
const Auth = mongoose.model('Auth');
const Code = mongoose.model('Code');
const User = mongoose.model('User');
const Device = mongoose.model('Device');

const TEST_Auth = new Auth({
  username: "test",
  password: "test",
  email: "csjk@zju.edu.cn"
});

TEST_Auth.save()