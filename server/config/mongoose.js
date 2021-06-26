const mongoose = require('mongoose');
const config = require('./config.js');

module.exports = function () {
    mongoose.set('useCreateIndex', true)
    const db = mongoose.connect(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 120 });
    require('../models/auth.js');
    require('../models/user.js');
    require('../models/device.js')
    require('../models/pkg.js')
    require('../models/code.js')
    return db;
}