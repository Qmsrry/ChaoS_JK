var mongoose = require('mongoose');

const PkgSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
    topic: String,
    payload: {
        warning: Boolean,
        location: [Number],
        time: Date,
        data: String,
    },
}, { timestamps: { createdAt: 'createtime' } });

mongoose.model('Pkg', PkgSchema);