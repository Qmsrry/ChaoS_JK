const mongoose = require('mongoose');
const MongoPersistence = require('aedes-persistence-mongodb')
mongoose.connect('mongodb://localhost:27017/mqtt-test',
    { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 120 }
);
const instance = MongoPersistence({
    db: mongoose.connection.db
})
