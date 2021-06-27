var mongoose = require('mongoose');
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

const deviceSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    id: { type: Number, require: true},
    name: String,
    online: Boolean,
    warning: [Boolean],
    time: Date,
    data: Number,
    packages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pkg' }],
    location: [pointSchema]
}, { timestamps: { createdAt: 'createtime' } });
deviceSchema.index({ owner: 1, id: 1 }, { unique: true });
mongoose.model('Device', deviceSchema);
