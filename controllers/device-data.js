'use strict'
/**
 * CONTROLADOR DESACTIVADO POR BUB EN EL MÉTODO SAVE() DE MONGOOSE
 * COntrolador de las soliciticitudes referentes a la API de la aplicación
 */

//importación del esquema de dispositivo

const DeviceData = require('../model/device-data');
const Save = require('../utils/log_save');
const cf_color = require("../config/console_colors");


function insertDeviceData(req, res) {
    console.log("Entar en dar de alta un dispositivo");
    //Instanciamos un nuevo objeto de tipo Device
    let device = new DeviceData();
    device.device_name = req.body.device_name;
    device.val = req.body.val;
    //guardado sobre la base de datos
    device.save((err, deviceStored) => {
        //en caso de error se muestra un mensaje
        if (err) return res.status(500).send({ message: `Se ha procucido un error al guardar el dispositivo. Error ${err}` });
        res.status(200).send({ device: deviceStored });
    });
}



function insertDeviceDataDos(data) {
    console.log("Entar controlador de insertar los datos de un dispositivo");
    //Instanciamos un nuevo objeto de tipo Device
    let device = new DeviceDataSchema();
    // let device_name = data.device_name;
    // let val = data.val;
    let device_name = "A_aa_bb";
    let val = 0.789;
    device.device_name = device_name;
    device.val = val;
    //console.log(cf_color.FgCyan + '%s' + cf_color.Reset, "insertDeviceDataDos - val : " + val);

    try {
        device.save((err, deviceStored) => {
            //en caso de error se muestra un mensaje
            if (err) { console.log("Se ha producido un error"); console.log(err); }
            console.log(cf_color.FgMagenta + '%s' + cf_color.Reset, " Se inserta el registro ");
            // res.status(200).send({devicedata: deviceStored});


            // if(err) return res.status(500).send( {message:`Se ha procucido un error al guardar el dispositivo. Error ${err}`});  
            // res.status(200).send({devicedata: deviceStored});
        });


    } catch (error) {
        console.log("Se ha producido una excepción");
        console.log(error);
    }
}


function insertDeviceDataTres(data) {
    console.log("insertDeviceDataTres");
    console.log(data.toString());
    var datos = JSON.parse(data);

  
    console.log(cf_color.FgRed + '%s' + cf_color.Reset, "device_name: " + datos.device_name);
    //Instanciamos un nuevo objeto de tipo Device
    // let device = new DeviceData();
    // device.device_name = data;

    const devicedata = new DeviceData({
        device_name: "sdfsdf",

    });


    // console.log(cf_color.FgRed + '%s' + cf_color.Reset, "--------------");
    // console.dir(devicedata);
    console.log(cf_color.FgRed + '%s' + cf_color.Reset, "--------------");

    devicedata.markModified();

    devicedata.save().then((docs) => { 
        console.log(cf_color.FgRed + '%s' + cf_color.Reset, "------ACIERTO--------");
        console.log(docs.length);
    }).catch((err) => {
        console.log(cf_color.FgRed + '%s' + cf_color.Reset, "------ERROR--------");
        console.log(err);
    });


    // devicedata.save((err) =>{
    //     console.log("111.XXXXX!!!!");

    //     if (err) console.log("error");
    //     console.log(device);
    // });

    //devicedata.save();


    // device.device_name="sdfsdf222";
    // device.save().then(function(device) {
    //     console.log("222.XXXXX!!!!");
    //     console.log(device);  
    // });


    // var result = device.save((err, device) => {
    //     //en caso de error se muestra un mensaje
    //     if (err) {console.log(err); throw err;}
    //     console.log("acierto!!!!!!!!")
    // });
    // console.log(result);

    console.log(cf_color.FgRed + '%s' + cf_color.Reset, "------FIN--------");




    // var midevicedata = new DeviceData();
    // midevicedata.device_name = "sdfsd";
    // midevicedata.val = 0.232;

    // midevicedata.save(function (err) {

    //     if (err) { console.log(err); throw err };

    //     console.log('DISPOSITIVO GUARDADDO.');
    // });



    // var deviceDataSchema = mongoose.Schema({
    //     deviceName: String,
    //     val: Number,
    //     createdAt: { type: Date, default: Date.now }
    // });

    // var DeviceData = mongoose.model('DeviceData', deviceDataSchema);

    // var miDeviceData = new DeviceData({
    //     device_name : "ax232",
    //     val:0.2233
    // });

    // miDeviceData.save(function(err) {
    //     if (err) { console.log(err); throw err};

    //     console.log('DISPOSITIVO GUARDADDO.');
    // });




}
module.exports = { insertDeviceData, insertDeviceDataDos, insertDeviceDataTres }
