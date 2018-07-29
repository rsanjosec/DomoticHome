'use strict'
/** 
 * Entada de la aplaicación
*/

const mongoose = require("mongoose")
const app = require('./app')
const Fecha = require("./utils/util")
const cf = require("./config/config")
const cf_color = require("./config/console_colors")

/*
ESTABLECER CONEXIÓN CON LA BASE DE DATOS
mongoose.connection -> 
Establece una conexión con la base de datos

"mongodb://localhost:27017/device",
Cadena de conexión con la base de datos, tiene el siguiente formato:
mongodb://Ip_base_de_datos/puerto/nombre_de_la_base_datos

(err, res), función de callback que recibe dos parámetros: un error(si se produce) y una repuesta de confirmación

*/
app.on('listening',function(){
    console.log('ok, server is running');
});
console.log("antes de utilizar listen");
app.listen(cf.web_server_port, function(){
    console.log("----------------------------------------");
    var fecha = new Fecha();
    console.log(cf_color.FgYellow+'%s'+cf_color.Reset,  "Servidor iniciado en puerto " + cf.web_server_port+".  "+ fecha.getFecha() + "  " + fecha.getTiempo() );
    // cadena de conexion
    // mongodb:// define el tipo de base de datos con alque se conectara, para este caso mongodb
    // localhost host/ip donde esta alojada la base de adtos
    // 27017 puerto con el que se establece la conexion contra la base de datos.
    // devices nombre de la base de datos
     mongoose.connect(cf.db_conection, (err, res)=>{
         if(err){
             console.log("Se ha producido un error al conectar con la basde de datos");        
             throw err;
         } 
         console.log("Conexión establecida con la base de datos");         
     });

});