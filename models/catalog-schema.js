'use strict'

const mongoose = require('../database/connection')

const catalogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'type',
        required: true
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }],
    image: {
        type: String,
        required: true
    },
    sinopse: {
        type: String,
        required: true
    }
}, { collection: 'catalogo',
    timestamps: true })

const catalog = mongoose.model('catalog', catalogSchema)

module.exports = catalog
