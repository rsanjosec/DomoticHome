/**
 * Define un eschema de tipo device para una base de datos mongo
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

})
//para exportar este modelo, utilizamos el método model de mongoose
//(nombre_del_esquema, var_esquema )
module.exports = mongoose.model('Dispositivos', DeviceSchema);

