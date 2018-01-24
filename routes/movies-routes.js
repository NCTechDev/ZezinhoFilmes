'use strict'

const httpStatus = require('http-status')

module.exports = function (app, path, passport) {

    // Home
    app.get('/administrador', isLoggedIn, isAuthorized([0]), function (req, res) {
        res.status(httpStatus.OK).send("Muito bom ver você novamente, " + req.session.passport.user.username)
    })

}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()
    else
        res.redirect('/logout')
}

function isAuthorized(level_number) {
    return function (req, res, next) {
        if (level_number.indexOf(req.session.passport.user.access_level) != -1)
            return next()
        else
            res.redirect('/logout')
    }
}
