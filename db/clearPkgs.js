const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/iot', { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 120 });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

//设备信息
const deviceSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    id: { type: Number, require: true, unique: true },
    name: String,
    online: Boolean,
    warning: [Boolean],
    time: Date,
    data: Number,
    packages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pkg' }],
    location: [pointSchema]
}, { timestamps: { createdAt: 'createtime' } });

const PkgSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
    topic: String,
    payload: {
        warning: Boolean,
        location: [Number],
        time: Date,
        data: String,
    },
}, { timestamps: { createdAt: 'createtime' } });

const Pkg = mongoose.model('Pkg', deviceSchema);

Pkg.deleteMany({},function (err, res) {
    process.exit();
})