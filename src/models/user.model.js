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

    profile_pic: {
        type: String
    },

    role: {
        type: String,
        required: true,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },

    is_active: {
        type: Boolean,
        default: true
    }

})

module.exports = model('User', UserSchema)