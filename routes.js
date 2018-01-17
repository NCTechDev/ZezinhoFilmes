'use strict'

module.exports = function (app) {

    // Rotas
    app.use(function (req, res, next) {
        console.log('%s %s', req.method, req.url)
    })

    // Home
    app.get('/', function (req, res) {
        res.sendFile('index.html')
    })

}