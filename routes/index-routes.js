'use strict'

const indexController = require('../controller/index-controller'),
    httpStatus = require('http-status'),
    isLoggedIn = require('../authentication/isLoggedIn'),
    isAuthorized = require('../authentication/isAuthorized')

module.exports = function (app, path, passport) {

    // Rotas
    app.use(function (req, res, next) {
        console.log('%s %s', req.method, req.url)
        next()
    })

    // Home
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'))
    })

    // Register
    app.post('/register', function (req, res) {
        indexController.register(req, res)
    })

    // Login
    app.post('/login', function (req, res) {
        passport.authenticate('localLogin',
            function (error, user, info) {
                if (error)
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({ info: 'Desculpe-nos :( Tente novamente.' })
                if (!user)
                    return res.status(httpStatus.UNAUTHORIZED).json({ info })
                req.login(user, function (error) {
                    if (error)
                        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                            .json({ info: 'Desculpe-nos :( Tente novamente.' })
                    return res.status(httpStatus.OK).json({ info, username: user.username })
                })
            }
        )(req, res)
    })

    // Rotas de acesso
    app.get('/access', function (req, res) {
        if (typeof req.session.passport === 'undefined')
            res.redirect('/logout')
        else if (req.session.passport.user.access_level === 0)
            res.redirect('/index/administrador')
        else if (req.session.passport.user.access_level === 1)
            res.redirect('/index/usuario')
        else
            res.redirect('/logout')

    })

    // Home administrador
    app.get('/index/administrador', isLoggedIn, isAuthorized([0]), function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/view/adm/index-adm.html'))
    })

    // Editar administrador
    app.get('/editar/administrador', isLoggedIn, isAuthorized([0]), function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/view/adm/update-adm.html'))
    })
    app.post('/editar/administrador', isLoggedIn, isAuthorized([0]), function (req, res) {
        indexController.update(req, res, req.session.passport.user._id)
    })

    // Logout
    app.get('/logout', function (req, res) {
        req.session.destroy(function (error) {
            if (error) { return next(error) }
            res.clearCookie('zezinho-filmes')
            res.clearCookie('zezinho-username')
            res.clearCookie('zezinho-expires')
            req.logout()
            res.redirect('/')
        })
    })

    // Session
    app.get('/session', function (req, res) {
        res.status(httpStatus.OK).send(req.session)
    })

    // 404
    app.use(function (req, res) {
        res.status(404).sendFile(path.join(__dirname + '/../public/404.html'))
    })

}
