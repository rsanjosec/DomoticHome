'use strict'
const express = require('express');
const app = express();
//analiza ficheros de tipo json recibidos en el body del mensaje
//análisisi de formularios
const bodyParser = require('body-parser');
// permite la subida de ficheros y reconocimiento de formularios
// https://github.com/expressjs/multer
const multer = require("multer");
//orm para manejar mongo
const mongoose = require("mongoose")
/*
1.application/x-www-form-urlencoding
Para el envío de formularios de texto, se puede utilizar este método de envio, de echo por defecto este el el método de envío
si no seindica nada a lahora de enviar un formulario.
2.multipart/form-data
Se debe de utilizar bien para el envío de ficheros o bien para envio de carcteres que estén fuera del juego de caracteres ASCII
*/


//multer permite la subida de ficheros o bien de datos mediante el método
//de envio multipart/form-data
const upload = multer();
const Fecha = require("./utils")
//Detección de tipo de objeto
const typeDetect = require("type-detect")
//Lectura, escritura de ficheros(File System)
const fs = require('fs');


//importación del controlado de un dispositivo
const DeviceController = require('./controllers/device_controller')
//importación de los colores de consola
const ConsoleColors = require('./config/console_colors')




function convertirATexto(obj){
    let cadena = [];
    cadena.push("{");
    for (const prop in obj) {
        cadena.push(prop, ":", convertirATexto(obj[prop]), ",");
    }
cadena.push("{");
return cadena; 
}





app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/items', (req, res)=>{
    let aa = new Fecha();
    let fecha = aa.getFecha();
    //res.send("hola desde get!!"+fecha );
    res.send({message:'hola desde get!!'});
});


app.get('/items2/:name', (req, res)=>{
    res.status(200).send({message:`hola ${req.params.name}`});
});

//app.post('/items', upload.array(), (req, res, next)=>{
app.post('/items',  upload.array(), (req, res)=>{

    saveRequestToFile(req);
    //retorno de código http. mesanje de respuesta
    res.status(200).send({message:'solicitud recibida correctamente!'});
    
});

/*
 PARA LOS DIPOSITIVOS

 Aunque la url es identica, el sistema sabe distingir dado el tipo de solicitud que
  se le efectúa (GET,POST,PUT,DELETE), de esta formaatenderá  y retornará una respuesta decuada para cda tipo
  de solicitud que reciba
  referencia:
  https://es.wikipedia.org/wiki/Protocolo_de_transferencia_de_hipertexto#M%C3%A9todos_de_petici%C3%B3n
*/


//Retorna todos los dispositivos 
app.get("/api/devices", DeviceController.getDevices);
//Busca un dispositivo por identificador
app.get('/api/device/:id_device', DeviceController.getDevice);
//Actualiza valor del dispositivo[id_disp, valor]
app.put("/api/device/:device_id", DeviceController.updateDevice);
//elimina, borra un dispositivo
app.delete("/api/device/:device_id", DeviceController.deleteDevice);
// añade un dispositivo
app.post('/api/device', DeviceController.insertDevice);


/*
ESTABLECER CONEXIÓN CON LA BASE DE DATOS
mongoose.connection -> 
Establece una conexión con la base de datos

"mongodb://localhost:27017/device",
Cadena de conexión con la base de datos, tiene el siguiente formato:
mongodb://Ip_base_de_datos/puerto/nombre_de_la_base_datos

(err, res), función de callback que recibe dos parámetros: un error(si se produce) y una repuesta de confirmación

*/


app.listen(8080, function(){
    console.log("----------------------------------------");
    console.log("----------------------------------------");
    var fecha = new Fecha();
    console.log(FgYellow+'%s'+Reset, "Servidor iniciado!!  "+ fecha.getFecha() + "  " + fecha.getTiempo() );
    // cadena de conexion
    // mongodb:// define el tipo de base de datos con alque se conectara, para este caso mongodb
    // localhost host/ip donde esta alojada la base de adtos
    // 27017 puerto con el que se establece la conexion contra la base de datos.
    // devices nombre de la base de datos
     mongoose.connect("mongodb://localhost:27017/devices", (err, res)=>{
         if(err){
             console.log("Se ha producido un error al conectar con la basde de datos");        
             throw err;
         } 
         console.log("Conexión establecida con la base de datos");         
     });

});
