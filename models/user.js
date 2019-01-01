const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    }

});

UserSchema.plugin(timestamp);
const User = mongoose.model('customer', UserSchema);
module.exports = User;
