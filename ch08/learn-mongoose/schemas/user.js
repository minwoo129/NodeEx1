const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model('User', new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    married: {
        type: Boolean,
        required: true
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}));