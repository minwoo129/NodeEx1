const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

module.exports = mongoose.model('Comment', new Schema({
    commenter: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}));