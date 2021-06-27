const mongoose = require('mongoose');
const {mongodb} = require('../../.config.js');

module.exports = function () {
    mongoose.set('useCreateIndex', true)
    const db = mongoose.connect('mongodb://'+mongodb.ip+':'+mongodb.port+'/'+mongodb.db, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 120 });
    require('../../db/models/auth.js');
    require('../../db/models/user.js');
    require('../../db/models/device.js')
    require('../../db/models/pkg.js')
    return db;
}