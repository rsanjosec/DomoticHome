'use strict'
const mongoose = require('mongoose');
const User = require('../model/user');
const service = require('../services');

//para el registro del usuario
function register(req, res) {
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
    });
    //creación  del usuario
    user.save((err) => {
        //en el caso de error se retorna el correpondiente mensaje    
        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
        // si todo correcto se crea el usuario
        return res.status(201).send({ token: service.createToken(user) })
      })

};
//para la utenticación del usuario
function login(req, res) {
    User.find({ email: req.body.email }, (err, user) => {
        if (err) { return res.status(500).send({ message: err }) }
        if (!user) { return res.status(404).send({ message: "NO existe el usuario" }) }
        req.user = user;
        res.status(200).send({ message: "login correcto", token: service.createToken(user) })
    })
};

module.exports = {
    register,
    login
}