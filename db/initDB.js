const mongoose = require('mongoose');
const db = require('./config/mongoose.js')();
const Auth = mongoose.model('Auth');
const Code = mongoose.model('Code');
const User = mongoose.model('User');
const Device = mongoose.model('Device');
const Pkg = mongoose.model('Pkg');

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

TEST_Auth.save(function (err, res) {
  if (err) return console.error(err);
  console.log(res);
});
TEST_User.save(function (err, res) {
  if (err) return console.error(err);
  console.log(res);
  User.findOne({ name: 'test' }, function (err, res) {
    const test_id = res._id;
    for (var i = 0; i < 15; i++) {
      const TEST_Pos = { type: 'Point', coordinates: [120, 30] };
      const TEST_Device = new Device({
        id: i,
        owner: test_id,
        name: "test" + i,
        online: true,
        data: 0,
        time: new Date(),
      });
      TEST_Device.location.push(TEST_Pos);
      TEST_Device.warning.push(false);
      TEST_Device.markModified('time')
      TEST_Device.save(function (err, _) {
        if (err) return console.error(err);
      })
    }
    console.log("保存完毕，请退出！");
  });
});

