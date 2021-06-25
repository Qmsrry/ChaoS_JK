var mongoose = require('mongoose');
var config = require('./config.js');

module.exports = function () {
    mongoose.set('useCreateIndex', true)
    var db = mongoose.connect(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 120 });
    require('../models/auth.js');
    require('../models/user.js');
    require('../models/device.js')
    return db;
}