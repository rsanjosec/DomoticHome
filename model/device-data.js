'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const SchemaTypes = mongoose.Schema.Types;

const DeviceDataSchema= new Schema({
    device_name: String,
    val: Number,  
    createdAt: { type: Date}
});

//para exportar este modelo, utilizamos el método model de mongoose
//(nombre_del_esquema, var_esquema )
module.exports = mongoose.model('DeviceData', DeviceDataSchema);

/*
 "_id" : ObjectId("5b944d9666a9273a4796ed5f"),
    "device_name" : "cocina_1",
    "val" : 0.19895,
    "time" : "00:30:46"



    ------otro esquema ------

    {
  "id": "84bf3a7602f2a2bc7c4d7bca",
  "user_id": "github_rsanjosec",
  "token": "58b8f47e926ea24275e20da8",
  "name": "arduino Uno",
  "shared_with": "",
  "online": false,
  "shadow": {},
  "created_at": "0001-01-01T00:00:00Z",
  "last_seen": "0001-01-01T00:00:00Z"
}


*/