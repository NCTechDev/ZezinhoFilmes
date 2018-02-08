'use strict'

const mongoose = require('../database/connection')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
        unique: true,
        required: true
    }
}, { collection: 'categorias',
    timestamps: true })

const category = mongoose.model('category', categorySchema)

module.exports = category
