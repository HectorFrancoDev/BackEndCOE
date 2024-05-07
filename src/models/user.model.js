const { Schema, model } = require("mongoose");

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
    },

    is_active: {
        type: Boolean,
        default: true
    }

})

module.exports = model('User', UserSchema)