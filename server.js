'use strict'

const bodyParser = require('body-parser'),
    express = require('express'),
    passport = require('passport'),
    session = require('express-session'),
    keySecret = require('./secret/secret'),
    path = require('path'),
    app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(session({
    name: 'zezinho-filmes',
    secret: keySecret,
    cookie: {
        maxAge: 3600000
    },
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

const port = 8080,
    hostname = "localhost"
app.listen(port, onStart())

require('./authentication/passport')(passport)
require('./routes/movies-routes')(app, path, passport)
require('./routes/index-routes')(app, path, passport)

function onStart() {
    console.log(`Server started at http://${hostname}:${port}`)
}
