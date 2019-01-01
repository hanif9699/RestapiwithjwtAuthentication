const mongoose = require('mongoose');
const memberSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const member = mongoose.model('member', memberSchema);
module.exports = member;