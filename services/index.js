'use strict'
const jwt = require('jwt-simple');
//para manejo de fechas
const moment = require('moment');
const config = require('../config/config')

function createToken(user) {
    const payload = {
        id: user._id, //recupera el id de usuario demongo
        fAlt: moment().unix(),
        fExp: moment().add(30, 'days').unix()

    }
    return jwt.encode(payload, config.SECRET_CODE)
}

function decodeToken(token) {
    const decode = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_CODE);
            //si ha caducado el token (fecha expirada)
            if (payload.fExp < moment.unix()) {
                reject({
                    status: 401,
                    message: "El token ha expirado"
                })
            }
            resolve(payload.id)
        } catch (error) {
            reject({
                status: 500,
                message: "Token inválido"
            })
        }
    })
    return decode;
}

module.exports = { createToken, decodeToken };