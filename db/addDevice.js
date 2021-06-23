const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/iot', { useNewUrlParser: true, useUnifiedTopology: true, keepAlive:120});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const userSchema = new mongoose.Schema({
  name : String,
  email: {
    type: String,
    unique: true
  },
  role: String,
  devices: [{ type: Schema.Types.ObjectId, ref: 'Device' }]
}
)

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
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    id:{type:Number, require:true, unique:true},
    name: String,
    online: Boolean,
    warning: Boolean,
    time: Date,
    data: Number,
    packages: [{ type: Schema.Types.ObjectId, ref: 'Pkg' }],
    location: [pointSchema]
});

const User = mongoose.model('User', userSchema);
const Device = mongoose.model('Device', deviceSchema);

User.findOne({ name: 'test' }, function (err, res) {
    const test_id = res._id;
    for (var i = 0; i < 10; i++) {
        const TEST_Pos = { type: 'Point', coordinates: [i, i] };
        const TEST_Device = new Device({
            id :i,
            owner: test_id,
            name: "robot" + i,
            online: true,
            warning: false,
            data:i,
            time : new Date(),
        })
        TEST_Device.location.push(TEST_Pos);
        TEST_Device.markModified('time')
        TEST_Device.save()
    }
})


