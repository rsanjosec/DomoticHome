'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DeviceDataSchema= new Schema({
    device_name: String,
   // val: Number,   
    createdAt: { type: Date, default: Date.now }
});

//para exportar este modelo, utilizamos el método model de mongoose
//(nombre_del_esquema, var_esquema )
module.exports = mongoose.model('DeviceData', DeviceDataSchema);