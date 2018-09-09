'use strict'
const User = require('../model/user');
const service = require('../services');
//const dateFormat = require('dateformat');
const moment = require('moment');
//NOta: PARA depuracion
const Type = require('type-of-is');

function loginUser(req, res) {

    let usuario = req.body.mail;
    let pass = req.body.password;
    console.log("usuario"+ usuario+ " pass:"+ pass)

    // User.findOne({ type: 'iphone' }).exec(function (err, adventure) {});
    // find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});

     User.findOne({ user_email: req.body.mail, user_password:req.body.password }, (err, user) => {
         console.log("entra en la busque da de usuario");
         if (err) { return res.status(500).send({ message: err }) }
         if (!user) { return res.status(404).send({ message: "NO existe el usuario" }) }
         console.log("accede a la aplicaión");
         //console.dir(user);

         res.status(200).send({ message: "login correcto" })
     });

    // User.findOneAndUpdate({ user_email: req.body.mail, user_password:req.body.password },{lastLogin:Date.now()}, (err, user) => {
    //     console.log("entra en la busque da de usuario");
    //     if (err) { return res.status(500).send({ message: err }) }
    //     if (!user) { return res.status(404).send({ message: "NO existe el usuario" }) }
    //     // console.log("accede a la aplicaión");
    //     // console.dir(user);
    //     console.log("antes de la redireccion");
        
    //     res.redirect("/admon");

    //     //res.status(200).send({ message: "login correcto" })
    // });

     
};

function showAddUser(req, res, next) {
    var baseUrl = req.baseUrl;

    console.log("--- baseUrl de showAddUser  (1) ----");
    console.log(req.originalUrl);   // return /admon/add-user
    console.log(req.baseUrl);       // return  /admon
    console.log(req.path);          // return /add-user
    let path = (req.path).slice(1);

    console.log("path");
    console.log(path);

    if (req.baseUrl == "/admon") {
        console.log("***************ZZZZZZZ path:" + path + "ZZZZZZZZ*****************************");
        var data = {
            title: 'Insertar un nuevo usuario',
            path: path
        }
        res.render('userAdd', data);
    }

};




//para el registro del usuario
function addUser(req, res) {
    console.log("ENTRA EN REGISTER");
    console.dir(req.baseUrl);
    console.log("-----------**------------");
    // console.dir(req.body);
    console.log("-----------**------------");

    let user = new User();

    user.user_email = req.body.email;
    user.user_name = req.body.name;
    user.user_surname = req.body.surname;
    user.user_password = req.body.password;


    //creación  del usuario
    user.save((err) => {
        //en el caso de error se retorna el correpondiente mensaje    
        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
        // si todo correcto se crea el usuario
        return res.status(201).send({ token: service.createToken(user) });

    });

    // user.save((err, userStored) => {
    //     //en el caso de error se retorna el correpondiente mensaje    
    //     if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
    //     // si todo correcto se crea el usuario
    //     res.status(200).send({ user: userStored });

    //   });

};
//para la autenticación del usuario
// NOTE: se traspasa esta funcion con comportamiento similar a controllers/admon.js
function login(req, res) {
    User.find({ email: req.body.email }, (err, user) => {
        if (err) { return res.status(500).send({ message: err }) }
        if (!user) { return res.status(404).send({ message: "NO existe el usuario" }) }
        req.user = user;
        res.status(200).send({ message: "login correcto", token: service.createToken(user) })
    })
};



//retorna un listado de los usuarios registrados en la aplicación
function getUsers(req, res) {
    var baseUrl = req.baseUrl;
    let path = (req.path).slice(1);
    moment.locale('es');
    User.find({}, (err, users) => {

        if (baseUrl == "/admon") {
            console.log("Entra en retornar todos los dispositivos.(admon)");
            if (err) { return res.status(500).send({ message: `Error al realizar la petición: ${error}` }); }
            if (!users) { return res.status(404).send({ message: 'Actualmente no existen usuarios dados de alta en el sistema.' }); }
            //sobreescritura del objeto para poder cambiar sus propiedades    
            let users2 = JSON.parse(JSON.stringify(users));
            users2.forEach(user => {
                user['dateRegister']=moment( user['dateRegister'] ).format('LLLL');;
                user['lastLogin']=moment( user['lastLogin'] ).format('LLLL');;
            });
            var data = {
                title: 'Listado de usuarios',
                users: users2,
                path: path
            }


            res.render('users', data);
        }
    });
};


//elimina, borra un usuario
function deleteUser(req, res) {
    console.log("controller Entra en DELETE " + req.params.user_id);
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            return res.status(500).send({ message: `Error al borrar el usuario ${err}` });
        }
        if (!user) {
            return res.status(404).send({ message: 'No se ha encontrado el dispositivo' });
        }
        user.remove(err => {
            if (err) {
                return res.status(500).send({ message: `Error al borrar el usuario: ${error}` });
            }
        });
        res.status(200).send({ message: "Usuario borrado correctamente" });
    });
};
//actualiza valor del dispositivo[id_disp, valor]
function updateUser(req, res) {
    console.log("Entra por actualizacion de usuario");
    User.findByIdAndUpdate(req.params.user_id, req.body, (err, user) => {
        if (err) {
            return res.status(500).send({ message: `Error al actualizar el usuario ${err}` });
        }
        if (!user) {
            return res.status(404).send({ message: 'No se ha encontrado el usuario' });
        }
        res.status(200).send({ message: "Usuario actualizado correctamente" });
    });
}


module.exports = {
    addUser,
    getUsers,
    showAddUser,
    login,
    deleteUser,
    updateUser,
    loginUser
}