'use strict'

const mongoose = require('../database/connection')

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
        unique: true,
        required: true
    }
}, { collection: 'tipos',
    timestamps: true })

const type = mongoose.model('type', typeSchema)

module.exports = type
