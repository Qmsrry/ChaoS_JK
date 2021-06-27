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

const TEST_User = new User({
  name: "test",
  role: "admin",
  email: "csjk@zju.edu.cn",
})

const TEST_Pos = { type: 'Point', coordinates: [0, 0] };

const TEST_Device = new Device({
  owner: TEST_User._id,
  name: "robot",
  online: true,
})

const TEST_Pkg = new Pkg({
  owner: TEST_User._id,
  sender: TEST_Device._id,
  topic: String,
  payload: {
    warning: false,
    location: TEST_Pos,
    data: "tmp data",
  },
})

TEST_Pkg.markModified('payload')
TEST_Device.warning.push(false);
TEST_Device.location.push(TEST_Pos);
TEST_Device.packages.push(TEST_Pkg);
TEST_User.devices.push(TEST_Device);

TEST_Auth.save(function (err, res) {
  if (err) return console.error(err);
  console.log(res);
});
TEST_Device.save(function (err, res) {
  if (err) return console.error(err);
  console.log(res);
});
TEST_User.save(function (err, res) {
  if (err) return console.error(err);
  console.log(res);
});
TEST_Pkg.save(function (err, res) {
  if (err) return console.error(err);
  console.log(res);
});

