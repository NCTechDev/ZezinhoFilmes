'use strict'

const moviesController = require('../controller/movies-controller'),
    isLoggedIn = require('../authentication/isLoggedIn'),
    isAuthorized = require('../authentication/isAuthorized'),
    cuid = require('cuid'),
    multer = require('multer'),
    path = require('path'),
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/img/')
        },
        filename: function (req, file, cb) {
            let ext = path.extname(file.originalname)
            cb(null, cuid() + ext.toLowerCase())
        }
    }),
    fileFilter = function (req, file, cb) {
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg')
            cb(null, true)
        else return cb('Extensão não permitida.', false)
    },
    upload = multer({
        storage: storage,
        fileFilter: fileFilter
    }).single('fileCapa')

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
    // Cadastrar Catálogo
    app.get('/cadastrar-catalogo', isLoggedIn, isAuthorized([0]), function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/view/movies/register-catalog.html'))
    })
    app.post('/cadastrar-catalogo', isLoggedIn, isAuthorized([0]), function (req, res) {
        upload(req, res, function (errorRejectFile) {
            let filenameCapa = null
            if (req.file) filenameCapa = req.file.filename
            moviesController.registerCatalog(req, res, filenameCapa, errorRejectFile)
        })
    })
    // Listar Catálogo
    app.get('/listar-catalogo', isLoggedIn, isAuthorized([0]), function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/view/movies/list-catalog.html'))
    })
    app.get('/retornar-catalogo', isLoggedIn, isAuthorized([0]), function (req, res) {
        moviesController.listCatalog(req, res)
    })
    // Editar Catálogo
    app.get('/editar-catalogo/:id?', isLoggedIn, isAuthorized([0]), function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/view/movies/update-catalog.html'))
    })
    app.get('/retornar-editar-catalogo/:id?', isLoggedIn, isAuthorized([0]), function (req, res) {
        moviesController.returnACatalog(req, res, req.query.id)
    })
    app.post('/editar-catalogo', isLoggedIn, isAuthorized([0]), function (req, res) {
        upload(req, res, function (errorRejectFile) {
            let filenameCapa = null
            if (req.file) filenameCapa = req.file.filename
            moviesController.updateCatalog(req, res, filenameCapa, errorRejectFile)
        })
    })
    // Excluir Catálogo
    app.post('/excluir-catalogo', isLoggedIn, isAuthorized([0]), function (req, res) {
        moviesController.deleteCatalog(req, res)
    })

}