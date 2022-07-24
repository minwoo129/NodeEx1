const mongoose = require('mongoose');

const { Schema } = mongoose;
module.exports = mongoose.model('Room', new Schema({
    title: {
        type: String,
        required: true
    },
    max: {
        type: Number,
        required: true,
        default: 10,
        min: 2
    },
    owner: {
        type: String,
        required: true
    },
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}));