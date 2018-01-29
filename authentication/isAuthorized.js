'use strict'

module.exports = function isAuthorized(level_number) {
    return function (req, res, next) {
        if (level_number.indexOf(req.session.passport.user.access_level) != -1)
            return next()
        else
            res.redirect('/logout')
    }
}
