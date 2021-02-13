var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TipSchema = Schema({
    es: {
        type: String,
        trim: true
    },
    en: {
        type: String,
        trim: true
    },
    lang: {
        type: Number,
        require: true
    },
    id: {
        type: Number,
        require: true,
        unique: true
    }
});

module.exports = mongoose.model('Tip', TipSchema);