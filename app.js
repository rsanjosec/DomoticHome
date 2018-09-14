'use strict'
//asignada variable para poder parar mediante comando stop el servidor con npm stop, configurado en package.json-> scripts
process.title = "domoticHome";
const express = require('express');
//motor de plantilllas express-handlebars
const exphbs = require('express-handlebars');
//const helpers = require('./lib/helpers');


var helpers = require('handlebars-helpers');
var eq = helpers.comparison();
var equalsLength = helpers.array();
var compare = helpers.comparison();


//analiza ficheros de tipo json recibidos en el body del mensaje y análisisi de formularios
const bodyParser = require('body-parser');
//rutas absolutas y concatenación
const path = require('path');
// permite la subida de ficheros y reconocimiento de formularios
// https://github.com/expressjs/multer
//const multer = require("multer");

const app = express();


//gestion de rutas en general(errores)
const rtGen = require('./router/general')
//rutas para la api
const rtApi = require('./router/api');
//rutas para las páginas de administración de la web app
const rtAdm = require('./router/admon');
/*
1.application/x-www-form-urlencoding
Para el envío de formularios de texto, se puede utilizar este método de envio, de echo por defecto este el el método de envío
si no seindica nada a lahora de enviar un formulario.
2.multipart/form-data
Se debe de utilizar bien para el envío de ficheros o bien para envio de carcteres que estén fuera del juego de caracteres ASCII
*/


//importación del controlado de un dispositivo
//const DeviceController = require('./controllers/device')
//importación de los colores de consola
//const ConsoleColors = require('./config/console_colors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ruta para los ficheros estáticos "public"
app.use(express.static(path.join(__dirname, 'public')));
console.log("__dirname" + __dirname);


var hbs = exphbs.create({
    extname: '.hbs', 
    defaultLayout: 'default',
    helpers: {
        foo: function () { return 'FOO!'; },
        bar: function () { return 'BAR!'; },
        json: function (context) { return JSON.stringify(context); } ,
        ifEquals: function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        },
    },    
    layoutsDir: __dirname + '/views/layouts',
    partialsDir  : [
        __dirname + '/views/partials',
    ]
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//definicion de las rutas creadas en Router
app.use('/api', rtApi);
app.use('/admon', rtAdm);
app.use('/', rtGen);

module.exports = app;
