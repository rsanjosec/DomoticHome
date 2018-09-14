'use strict'
/** 
 * Entada a la  aplicación
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


app.listen(cf.web_server_port, function(){
    
    var fecha = new Fecha();
    console.log(cf_color.FgYellow+'%s'+cf_color.Reset,  "Servidor iniciado en puerto " + cf.web_server_port+".  "+ fecha.getFecha() + "  " + fecha.getTiempo() );
    mongoose.connect(cf.db_conection,{ useNewUrlParser: true }, (err, res)=>{
         if(err){
             console.log("Se ha producido un error al conectar con la basde de datos");        
             throw err;
         } 
         console.log("Conexión establecida con la base de datos");         
     });

});