'use strict'
const mongoose = require('mongoose');
const User = require('../model/user')
const service = require('../services')
//para el registro del usuario
function register(req, res) {
    const user = new User({
        email = req.body.email,
        name = req.body.name,
        surname = req.body.surname
    });
    //en el caso de error se retorna el correpondiente mensaje
    user.save((err) => res.status(500).send({ message: `Error al crear el uusario: ${err}` }));
    //sino 
    return res.status(200).send({token:service.createToken(user)})
};
//para la utenticación del usuario
function login() {

};

module.exports = {
    register,
    login
}