const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/iot', { useNewUrlParser: true, useUnifiedTopology: true, keepAlive:120});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

//验证信息
const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
});

//用户信息
const userSchema = new mongoose.Schema({
  name : String,
  email: {
    type: String,
    unique: true
  },
  role: String,
  devices: [{ type: Schema.Types.ObjectId, ref: 'Device' }]
}
)

//地理坐标
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

//设备信息
const deviceSchema = new mongoose.Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  online: Boolean,
  packages: [{ type: Schema.Types.ObjectId, ref: 'Pkg' }],
  location: [pointSchema]
});

//MQTT包信息
const PkgSchema = new mongoose.Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'Device' },
  payload: {}
});

userSchema.methods.generateToken = function () {
  return this.email;
}

const Auth = mongoose.model('Auth', authSchema);

const User = mongoose.model('User', userSchema);

const Device = mongoose.model('Device', deviceSchema);

const Pkg = mongoose.model('Pkg', PkgSchema);

const TEST_Auth = new Auth({
  username: "test",
  password: "test",
  email: "csjk@zju.edu.cn"
});

const TEST_User = new User({
  name: "test",
  email: "csjk@zju.edu.cn",
  role: "admin"
})

const TEST_Pos = { type: 'Point', coordinates: [0, 0] };

const TEST_Device = new Device({
  owner: TEST_User._id,
  name: "robot",
  online: true,
})

const TEST_Pkg = new Pkg({
  sender: TEST_Device._id,
  payload: {},
})

TEST_Pkg.markModified('payload')
TEST_Device.location.push(TEST_Pos);
TEST_Device.packages.push(TEST_Pkg._id);
TEST_User.devices.push(TEST_Device._id);

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

