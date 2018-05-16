'use strict'

const indexService = require('../service/movies-service'),
    fs = require('fs'),
    httpStatus = require('http-status')

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
    },
    // Cadastrar Catálogo
    registerCatalog: function (req, res, filenameCapa, message) {
        if (message) res.status(httpStatus.UNAUTHORIZED).json({ message: message })
        else if (filenameCapa === null) res.status(httpStatus.UNAUTHORIZED).json({ message: "Nenhum arquivo foi anexado." })
        else {
            indexService.registerCatalog(req.body, filenameCapa, function (error, status, message) {
                if (status === httpStatus.INTERNAL_SERVER_ERROR) {
                    fs.unlink('public/img/' + filenameCapa, function (err) {
                        if (err) {
                            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                                message: 'Os dados não foram cadastrados no MongoDB, mas ocorreu um error ao excluir a imagem ' + filenameCapa
                            })
                        } else res.status(status).json({ message: message })
                    })
                } else res.status(status).json({ message: message })
            })
        }
    },
    // Listar Catálogo
    listCatalog: function (req, res) {
        indexService.listCatalog(function (error, status, message, catalogs) {
            res.status(status).json({ message: message, catalog: catalogs })
        })
    },
    // Editar Catálogo
    returnACatalog: function (req, res, idParam) {
        indexService.returnACatalog(idParam, function (error, status, message, catalog) {
            res.status(status).json({ message: message, catalog: catalog })
        })
    },
    updateCatalog: function (req, res, filenameCapa, message) {
        if (message) res.status(httpStatus.UNAUTHORIZED).json({ message: message })
        else {
            indexService.updateCatalog(req.body, filenameCapa, function (error, status, message) {
                if (status === httpStatus.OK && filenameCapa) {
                    fs.unlink('public/img/' + req.body.inpLastImage, function (err) {
                        if (err) {
                            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                                message: 'Os dados do MongoDB foram excluídos, mas ocorreu um error ao excluir a imagem ' + req.body.inpLastImage,
                                lastBDImage: filenameCapa
                            })
                        } else res.status(status).json({ message: message, lastBDImage: filenameCapa })
                    })
                } else res.status(status).json({ message: message, lastBDImage: req.body.inpLastImage })
            })
        }
    },
    // Excluir Catálogo
    deleteCatalog: function (req, res) {
        indexService.deleteCatalog(req.body, function (error, status, message, BDImage) {
            if (status === httpStatus.OK) {
                fs.unlink('public/img/' + BDImage, function (err) {
                    if (err) {
                        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                            message: 'Os dados do MongoDB foram excluídos, mas ocorreu um error ao excluir a imagem ' + BDImage
                        })
                    } else res.status(status).json({ message: message })
                })
            } else res.status(status).json({ message: message })
        })
    },
    // Paginação
    paginate: function (req, res, page) {
        indexService.paginate(page, function (error, status, message, catalogs, countPages) {
            res.status(status).json({ message: message, catalog: catalogs, countPages: countPages, currentPage: page })
        })
    }

}

module.exports = indexController
