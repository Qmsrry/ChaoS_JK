var mongoose = require('mongoose');
const CodeSchema = new mongoose.Schema({
    email: String,
    code: Number,
});
mongoose.model('Code', CodeSchema);