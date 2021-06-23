var mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    role: String,
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }]
}
);
mongoose.model('User', userSchema);