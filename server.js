'use strict'

const express = require('express'),
    app = express()

app.use(express.static("public"))

const port = 8080,
    hostname = "localhost"
app.listen(port, onStart())

require('./routes')(app)

function onStart() {
    console.log(`Server started at http://${hostname}:${port}`)
}
