const mongoose = require('mongoose');
const db = require('./config/mongoose.js')();
const Auth = mongoose.model('Auth');
const Code = mongoose.model('Code');
const User = mongoose.model('User');
const Device = mongoose.model('Device');

Device.updateMany({}, { location: [], packages: [], data: 0 }, function (err, res) {
    process.exit();
})


