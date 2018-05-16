'use strict'

const register = require('../models/register-schema'),
    httpStatus = require('http-status'),
    bcrypt = require('bcryptjs')

const indexService = {
    // Register
    register: function (bodyData, callback) {
        let hashedPassword = bcrypt.hashSync(bodyData.inpRegPassword, 10),
            data = new register({
                username: bodyData.inpRegUsername,
                user: bodyData.inpRegUser,
                password: hashedPassword
            })

        data.save(function (error, doc) {
            if (error) {
                if (error.code === 11000)
                    callback(error, httpStatus.UNAUTHORIZED, 'Usuário já está em uso.')
                else
                    callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos :( Tente novamente.')
            } else {
                callback(null, httpStatus.CREATED, 'Cadastro realizado com sucesso.')
            }
        })
    },
    // Login
    login: function (inpUser, inpPassword, callback) {
        register.findOne({ user: inpUser }, '_id username password access_level', function (error, doc) {
            if (doc == null || doc.length == 0) {
                callback(new Error(), httpStatus.UNAUTHORIZED, 'Usuário inválido.')
            } else if (!bcrypt.compareSync(inpPassword, doc.password)) {
                callback(new Error(), httpStatus.UNAUTHORIZED, 'Senha inválida.')
            } else {
                callback(null, httpStatus.OK, 'Login realizado com sucesso.', doc)
            }
        })
    },
    // Register
    update: function (bodyData, idAdm, callback) {
        let hashedPassword = bcrypt.hashSync(bodyData.inpPassword, 10)

        register.findById(idAdm, 'username user password', function (error, foundDoc) {
            if (error) {
                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos :( Tente novamente.')
            } else {
                if (foundDoc) {
                    foundDoc.username = bodyData.inpUsername
                    foundDoc.user = bodyData.inpUser
                    foundDoc.password = hashedPassword
                    foundDoc.save(function (error, doc) {
                        if (error) {
                            if (error.code === 11000)
                                callback(error, httpStatus.UNAUTHORIZED, 'Usuário já está em uso.')
                            else
                                callback(error, httpStatus.INTERNAL_SERVER_ERROR, 'Desculpe-nos :( Tente novamente.')
                        } else {
                            callback(null, httpStatus.OK, 'Atualizado com sucesso.', doc.username)
                        }
                    })
                } else
                    callback(new Error(), httpStatus.UNAUTHORIZED, 'Usuário inválido.')
            }
        })
    }

}

module.exports = indexService
