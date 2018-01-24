'use strict'

const mongoose = require('mongoose'),
    uri = 'mongodb://localhost/zezinho-filmes'

mongoose.connect(uri)
mongoose.Promise = global.Promise

mongoose.connection.on('connected', function () {
    console.log("Connected to database " + uri)
})
mongoose.connection.on('error', function (err) {
    console.error(err)
})

module.exports = mongoose
