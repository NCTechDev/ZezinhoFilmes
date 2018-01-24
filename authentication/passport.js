'use strict'

const indexController = require('../controller/index-controller'),
    localStrategy = require('passport-local').Strategy

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        let sessionUser = {
            _id: user._id,
            username: user.username,
            access_level: user.access_level
        }
        done(null, sessionUser)
    })

    passport.deserializeUser(function (sessionUser, done) {
        done(null, sessionUser)
    })

    passport.use('localLogin',
        new localStrategy({
            usernameField: 'inpUser',
            passwordField: 'inpPassword'
        }, function (inpUser, inpPassword, done) {
            indexController.login(inpUser, inpPassword, function (error, user, message) {
                // exception
                if (error) return done(error)
                // authentication failure
                if (!user) return done(null, false, message)
                // authenticated
                return done(null, user, message)
            })
        })
    )

}
