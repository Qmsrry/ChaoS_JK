const mongoose = require('mongoose');
const {mongodb} = require('../../.config.js');

module.exports = function () {
    mongoose.set('useCreateIndex', true)
    const db = mongoose.connect('mongodb://'+mongodb.db+':'+mongodb.port+'/'+mongodb.db, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 120 });
    require('../../db/models/auth');
    require('../../db/models/user');
    require('../../db/models/device')
    require('../../db/models/pkg')
    return db;
}