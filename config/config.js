/**
 * Fichero de configuracion de la aplicaicón
 */
// NOTE: unificar la cadenadb_connection
module.exports={
    web_server_port: 8081,
    db_conection: "mongodb://localhost:27017/devices",
    SECRET_CODE: "DomoticHome18-07-2018",
    debug: false,
    mqtt:{
        namespace:"medicion/consumo",
        hostname: "localhost",
        port:1993
    },
    mongodb:{
        hostname:"localhost",
        port:27017,
        database:"devices",
        collection: "devicedatas",
    }

}