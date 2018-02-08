'use strict'

const type = require('../models/type-schema'),
    httpStatus = require('http-status')

const moviesService = {

    // Cadastrar Tipo
    registerType: function (bodyData, callback) {
        let data = new type({
            name: bodyData.inpTipo
        })
        data.save(function (error) {
            if (error) {
                if (error.code === 11000)
                    callback(error, httpStatus.UNAUTHORIZED, 'Tipo já está em uso.')
                else
                    callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos :( Tente novamente.')
            } else {
                callback(null, httpStatus.CREATED, 'Cadastro realizado com sucesso.')
            }
        })
    },
    // Listar Tipo
    listType: function (callback) {
        type.find({}, function (error, doc) {
            if (error)
                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos :( Tente novamente.')
            else if (doc == null || doc.length == 0)
                callback(new Error(), httpStatus.OK, 'Nenhum tipo encontrado.')
            else
                callback(null, httpStatus.OK, 'Lista de tipos retornada com sucesso.', doc)

        })
    },
    // Editar Tipo
    updateType: function (bodyData, callback) {
        type.findById(bodyData.id, function (error, foundDoc) {
            if (error) {
                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos :( Tente novamente.')
            } else {
                if (foundDoc) {
                    foundDoc.name = bodyData.name
                    foundDoc.save(function (error) {
                        if (error) {
                            if (error.code === 11000)
                                callback(error, httpStatus.UNAUTHORIZED, 'Tipo já está em uso.')
                            else
                                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos :( Tente novamente.')
                        } else
                            callback(null, httpStatus.OK, 'Tipo atualizado com sucesso.')
                    })
                } else
                    callback(new Error(), httpStatus.UNAUTHORIZED, 'Tipo inválido.')
            }
        })
    },
    // Deletar Tipo
    deleteType: function (bodyData, callback) {
        type.findByIdAndRemove(bodyData.id, function (error) {
            if (error)
                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos :( Tente novamente.')
            else
                callback(null, httpStatus.OK, 'Tipo excluído com sucesso.')
        })
    }

}

module.exports = moviesService
