var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LangSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    id: {
        type: Number,
        require: true,
        unique: true
    }
});

module.exports = mongoose.model('Lang', LangSchema);