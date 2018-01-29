'use strict'

const indexService = require('../service/index-service'),
    httpStatus = require('http-status')

const indexController = {

    // Register
    register: function (req, res) {
        indexService.register(req.body, function (error, status, message) {
            res.status(status).json({ message: message })
        })
    },
    // Login
    login: function (inpUser, inpPassword, callback) {
        indexService.login(inpUser, inpPassword, function (error, status, message, user) {
            if (status == httpStatus.OK) callback(null, user, message)
            else if (status == httpStatus.UNAUTHORIZED) callback(null, false, message)
            else callback(error)
        })
    },
    // Update
    update: function (req, res, idAdm) {
        indexService.update(req.body, idAdm, function (error, status, message, username) {
            res.status(status).json({ message: message, username: username })
        })
    }

}

module.exports = indexController
