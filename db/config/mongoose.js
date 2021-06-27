const mongoose = require('mongoose');
const { mongodb } = require('../../.config.js');

module.exports = function () {
    mongoose.set('useCreateIndex', true)
    const db = mongoose.connect('mongodb://' + mongodb.ip + ':' + mongodb.port + '/' + mongodb.db, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 120 });
    require('../models/auth');
    require('../models/user');
    require('../models/device')
    require('../models/pkg')
    require('../models/code')
    return db;
}