var mongoose = require('mongoose');
var config = require('./config.js');

module.exports = function() {
    var db = mongoose.connect(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 120 });
    require('../models/auth.js');
    require('../models/user.js');
    return db;
}