// NOTE: contemplar la opción de guardar muchos documentos de golpe  https://www.w3schools.com/nodejs/nodejs_mongodb_insert.asp

'use strict'
const mongodb = require('mongodb');
const mqtt = require('mqtt');
const config = require('../config/config');
const cf_color = require("../config/console_colors")

//cadena de conexión para el cliente mqtt
var mqttUri = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
//instancia la cliente mqtt
var client = mqtt.connect(mqttUri);
//cadena de conexión para la bd Mongo
var mongoUri = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port + '/' + config.mongodb.database;

//el cliente se suscribe a la lista definida en la variable de configuración

/**
 * 
 */
client.on('connect', function () {
    client.subscribe(config.mqtt.namespace);
    console.log(cf_color.FgGreen + '%s' + cf_color.Reset, "Cliente mqtt a la escucha ...");
});

client.on('error', function (err) {
    console.log(cf_color.FgRed + '%s' + cf_color.Reset, "Se ha producido un error en el cliente mqtt");
    console.log(err);
});

let contador = 0;
mongodb.MongoClient.connect(mongoUri, { useNewUrlParser: true }, function (error, database) {
    if (error != null) { throw error; }

    var dbo = database.db(config.mongodb.database);
    //asignar un índice al documento mongo (por defecto=0)
    dbo.createIndex({ "topic": 1 });
    //cliente mqtt a la escucha
    client.on('message', function (topic, message) {
        //se convierte el mesaje que llega como estring a un objeto javascript
        var deviceData = JSON.parse(message);
        //cada 1 minuto se muestra por pantalla el registro insertado
        if (contador % 60 === 0) { console.log(deviceData); }
        contador++;

        //se procede al insertado del registro sobre la coleción
        dbo.collection(config.mongodb.collection).insertOne(deviceData, function (error, result) {
            if (error != null) {
                console.log(cf_color.FgRed + '%s' + cf_color.Reset, "Se ha producido un error en la insercion del registro");
                console.log("ERROR: " + error);
                dbo.close();
            }
        });
    });
});