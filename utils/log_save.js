'use strict'
/**
 * Guarda en un fichero de texto a modo de log lo que se reciba por parámetro
 */
//Lectura, escritura de ficheros(File System)
const fs = require('fs');
const Fecha = require("./util")
const cf_color = require("../config/console_colors")


function saveRequestToFile(req){

    let fecha = new Fecha();
    let registroTiempo = fecha.getFecha() + " "+ fecha.getTiempo();
    let printIp = (req.ip=="::1") ? "localhost" :req.ip;
    let stringLog = "\r\n ---------------" + registroTiempo + " | " +  printIp + "------------------------ \r\n";
    stringLog += JSON.stringify(req.body, null, 4);   
    stringLog += "\n --------------------------------------- \n";
    //muestra por consola el registro que se 

    let result = "";
    let getBody = req.body;
    for (const key in getBody) {
        if (getBody.hasOwnProperty(key)) {
            result +=   key.toString() + ' = ' + getBody[key] + '\n';
        }
    }
    console.log(cf_color.FgBlue+'%s'+cf_color.Reset, result);
    
   
    //res.json(req.body)
    // fs.writeFile 
    fs.appendFile("/home/ruben/data/node/prueba/output/salida_obj.txt", stringLog, (err)=>{
        if(err){             
            console.error(err);
            return;
        }
        console.log("Objeto escrito a fichero");
        
    });
}
module.exports = {saveRequestToFile}