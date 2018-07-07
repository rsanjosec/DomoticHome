'use strict'

const express = require('express');
const app = express();
//analiza ficheros de tipo json recibidos en el body del mensaje y análisisi de formularios
const bodyParser = require('body-parser');
// permite la subida de ficheros y reconocimiento de formularios
// https://github.com/expressjs/multer
const multer = require("multer");

const rtApi = require('./router')


/*
1.application/x-www-form-urlencoding
Para el envío de formularios de texto, se puede utilizar este método de envio, de echo por defecto este el el método de envío
si no seindica nada a lahora de enviar un formulario.
2.multipart/form-data
Se debe de utilizar bien para el envío de ficheros o bien para envio de carcteres que estén fuera del juego de caracteres ASCII
*/




//importación del controlado de un dispositivo
const DeviceController = require('./controllers/device_controller')
//importación de los colores de consola
//const ConsoleColors = require('./config/console_colors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', rtApi);

module.exports = app;
