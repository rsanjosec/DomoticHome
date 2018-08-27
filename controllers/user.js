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


function getDevices(req, res) {

    console.log("PINTA baseUrl");
    console.dir(req.baseUrl);
    var baseUrl =  req.baseUrl;
    Device.find({}, (err, devices) => {
       

        if(baseUrl=="/admon"){
            console.log("Entra en retornar todos los dispositivos.(admon)");
            if (err) { return res.status(500).send({ message: `Error al realizar la petición: ${error}` }); }
            if (!devices) { return res.status(404).send({ message: 'Actualmente no existen dispositivos dados de alta.' }); }
            //console.dir(devices);
            //res.status(200).render( { devices });
            
          console.dir(devices);
            
            var data =   {
                title: 'Dashboard',
                devices: devices
            }
            res.render('users', data);
            
        }
        if(baseUrl=="/api"){
            console.log("Entra en retornar todos los dispositivos.(api)");
            if (err) { return res.status(500).send({ message: `Error al realizar la petición: ${error}` }); }
            if (!devices) { return res.status(404).send({ message: 'Actualmente no existen dispositivos dados de alta.' }); }
            //console.dir(devices);
            res.status(200).send({ devices });
        }

      
    });
}

module.exports = {
    getUsers,
    register,
    login
}