const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 5,
        max: 255,
        unique: true,
        trim: true,
        required: [true, 'Please add username']
    },
    password: {
        type: String,
        min: 5,
        max: 1024,
        required: [true, 'Please add password']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

module.exports = mongoose.model('User', UserSchema);