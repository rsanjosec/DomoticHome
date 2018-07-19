'use strict'
const jwt = require('jwt-simple');
//para manejo de fechas
const moment = require('moment');
const config = require('../config/config')

function createToken(user){
    const payload = {
        id: user._id, //recupera el id de usuario demongo
        fAlt: moment().unix(),
        fExp: moment().add(30,'days').unix()

    }
    return jwt.encode(payload, config.SECRET_CODE)
}

module.exports = {createToken};