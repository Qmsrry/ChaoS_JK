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

const Auth = mongoose.model('Auth', authSchema);

const TEST_Auth = new Auth({
  username: "test",
  password: "test",
  email: "csjk@zju.edu.cn"
});

TEST_Auth.save()