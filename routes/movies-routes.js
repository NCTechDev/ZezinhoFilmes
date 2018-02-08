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
    // Cadastrar Categorias
    app.get('/cadastrar-categorias', isLoggedIn, isAuthorized([0]), function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/view/movies/register-category.html'))
    })
    app.post('/cadastrar-categorias', isLoggedIn, isAuthorized([0]), function (req, res) {
        moviesController.registerCategory(req, res)
    })
    // Listar Categorias
    app.get('/listar-categorias', isLoggedIn, isAuthorized([0]), function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/view/movies/list-category.html'))
    })
    app.get('/retornar-categorias', isLoggedIn, isAuthorized([0]), function (req, res) {
        moviesController.listCategory(req, res)
    })
    // Editar Categorias
    app.post('/editar-categorias', isLoggedIn, isAuthorized([0]), function (req, res) {
        moviesController.updateCategory(req, res)
    })
    // Excluir Categorias
    app.post('/excluir-categorias', isLoggedIn, isAuthorized([0]), function (req, res) {
        moviesController.deleteCategory(req, res)
    })

}