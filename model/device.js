 /**
 * @file Define el modelo/esquema del documento de device que será representado sobre la base de datos MOngoDB 
 *  
 * @author Rubén San José Cruces 
 */   
'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const DeviceSchema = schema({    
    device_name: String,
    mac_address: String,
    //se define una enumeración, con los posibles valores a seelecionar en la inserción de un nuevo documento
    place      :{type: String, enum:['salón', 'habitación1','habitación2','cocina','baño']},
    description: String,
    device_type: {type: String, enum:['arduino', 'esp32']},

});
//para exportar este modelo, utilizamos el método model de mongoose
//(nombre_del_esquema, var_esquema )
module.exports = mongoose.model('Devices', DeviceSchema);

