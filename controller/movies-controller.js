'use strict'

const indexService = require('../service/movies-service')

const indexController = {

    // Cadastrar Tipo
    registerType: function (req, res) {
        indexService.registerType(req.body, function (error, status, message) {
            res.status(status).json({ message: message })
        })
    },
    // Listar Tipo
    listType: function (req, res) {
        indexService.listType(function (error, status, message, types) {
            res.status(status).json({ message: message, type: types })
        })
    },
    // Editar Tipo
    updateType: function (req, res) {
        indexService.updateType(req.body, function (error, status, message) {
            res.status(status).json({ message: message })
        })
    },
    // Excluir Tipo
    deleteType: function (req, res) {
        indexService.deleteType(req.body, function (error, status, message) {
            res.status(status).json({ message: message })
        })
    },
    // Cadastrar Categoria
    registerCategory: function (req, res) {
        indexService.registerCategory(req.body, function (error, status, message) {
            res.status(status).json({ message: message })
        })
    },
    // Listar Categoria
    listCategory: function (req, res) {
        indexService.listCategory(function (error, status, message, categories) {
            res.status(status).json({ message: message, category: categories })
        })
    },
    // Editar Categoria
    updateCategory: function (req, res) {
        indexService.updateCategory(req.body, function (error, status, message) {
            res.status(status).json({ message: message })
        })
    },
    // Excluir Categoria
    deleteCategory: function (req, res) {
        indexService.deleteCategory(req.body, function (error, status, message) {
            res.status(status).json({ message: message })
        })
    }

}

module.exports = indexController
