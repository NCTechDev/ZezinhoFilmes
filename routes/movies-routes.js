'use strict'

const moviesController = require('../controller/movies-controller'),
    isLoggedIn = require('../authentication/isLoggedIn'),
    isAuthorized = require('../authentication/isAuthorized')

module.exports = function (app, path, passport) {

    // Cadastrar Tipos
    app.get('/cadastrar-tipos', isLoggedIn, isAuthorized([0]), function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/view/movies/register-type.html'))
    })
    app.post('/cadastrar-tipos', isLoggedIn, isAuthorized([0]), function (req, res) {
        moviesController.registerType(req, res)
    })
    // Listar Tipos
    app.get('/listar-tipos', isLoggedIn, isAuthorized([0]), function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/view/movies/list-type.html'))
    })
    app.get('/retornar-tipos', isLoggedIn, isAuthorized([0]), function (req, res) {
        moviesController.listType(req, res)
    })
    // Editar Tipos
    app.post('/editar-tipos', isLoggedIn, isAuthorized([0]), function (req, res) {
        moviesController.updateType(req, res)
    })
    // Excluir Tipos
    app.post('/excluir-tipos', isLoggedIn, isAuthorized([0]), function (req, res) {
        moviesController.deleteType(req, res)
    })

}