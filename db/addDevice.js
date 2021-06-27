const mongoose = require('mongoose');
const _ = require('./config/mongoose.js')();
const Auth = mongoose.model('Auth');
const Code = mongoose.model('Code');
const User = mongoose.model('User');
const Device = mongoose.model('Device');
const db = mongoose.connection;
db.once('open', function(){
  console.log('We Are On!');
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
      // console.log("gonna save!");
      TEST_Device.save(function (err,_) {
        if (err) return console.error(err);
        process.exit();
      })
      // console.log("save!");
    }
  });
  process.exit();
});


