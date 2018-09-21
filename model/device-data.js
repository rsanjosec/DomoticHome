'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('debug', false);// activa el modo de depuración de mongoose


const DeviceDataSchema= new Schema({
    device_name: String,
    val:Number,  
});

//para exportar este modelo, utilizamos el método model de mongoose
//(nombre_del_esquema, var_esquema )
module.exports = mongoose.model('DeviceData', DeviceDataSchema);
