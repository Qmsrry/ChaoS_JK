const mongoose = require('mongoose');
const db = require('./config/mongoose.js')();
const Auth = mongoose.model('Auth');
const Code = mongoose.model('Code');
const User = mongoose.model('User');
const Device = mongoose.model('Device');

const p = Device.find({}, '-_id name location').sort({data: -1}).limit(1).exec();
p.then((res) => {
    console.log(res[0].location.length);
})

