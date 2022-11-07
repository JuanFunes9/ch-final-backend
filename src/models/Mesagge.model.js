const { Schema, model } = require('mongoose');

const MessageSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text:  {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = model('Message', MessageSchema);