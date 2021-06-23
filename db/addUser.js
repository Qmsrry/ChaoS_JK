const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/iot', { useNewUrlParser: true, useUnifiedTopology: true, keepAlive:120});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    role: String,
    devices: [{ type: Schema.Types.ObjectId, ref: 'Device' }]
}
);

const User = mongoose.model('User', userSchema);