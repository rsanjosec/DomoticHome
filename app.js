'use strict'
const express = require('express');
//motor de plantilllas express-handlebars
const exphbs = require('express-handlebars');

//analiza ficheros de tipo json recibidos en el body del mensaje y análisisi de formularios
const bodyParser = require('body-parser');
//rutas absolutas y concatenación
const path = require('path');
// permite la subida de ficheros y reconocimiento de formularios
// https://github.com/expressjs/multer
//const multer = require("multer");



const app = express();


const rtApi = require('./router');


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

//para los ficheros estáticos
app.use(express.static(path.join(__dirname, 'public')));
console.log("__dirname");
console.log(__dirname);

app.engine('hbs', exphbs({
    extname: '.hbs', 
    defaultLayout: 'default', 
    layoutsDir: __dirname + '/views/layouts',
    partialsDir  : [
        //  path to your partials
        __dirname + '/views/partials',
    ]
}));
app.set('view engine', 'hbs');


//llamada a el login de la web app

// app.get('/', (req, res) => {
//   var data =   {
//         title: 'Página principal',
//         "employees": [
//             {"firstName": "John", "lastName": "Doe"},
//             {"firstName": "Anna", "lastName": "Smith"},
//             {"firstName": "Peter", "lastName": "Jones"}
//         ]
//     }
    
//      res.render('login', data);
// });


app.get('/', (req, res) => {
    var data =   {
          title: 'Dashboard',
          "employees": [
              {"firstName": "John", "lastName": "Doe"},
              {"firstName": "Anna", "lastName": "Smith"},
              {"firstName": "Peter", "lastName": "Jones"}
          ]
      }
      
       res.render('home', data);
  });
  
  



app.get('/prueba', (req, res) => {
    res.render('prueba')
})


app.use('/api', rtApi);

module.exports = app;
