'use strict'

const service = require("../services/")

//next para la ejecución de la ruta, pasando la funcionalidad al controlador final
function isUserAuth(req, res, next) {
    //comprobación de si existe el parámetro  authorization en las cabecera de la solicitud http
    //en caso de no existir el parámetro se retorna un codigo de estado 403
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'no tiene autorización para acceder al recurso solicitado' });
    }

    const token = req.headers.authorization.split(" ")[1];
    console.log("000");
    service.decodeToken(token)
        .then(response => {
            console.log("111");
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status)
        })
} 

module.exports = { isUserAuth };