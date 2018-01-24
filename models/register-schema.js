'use strict'

const mongoose = require('../database/connection')

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    user: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    access_level: {
        type: Number,
        enum: [0, 1],
        default: 0
    }
}, { collection: 'usuario',
    timestamps: true })

const register = mongoose.model('register', registerSchema)

module.exports = register
