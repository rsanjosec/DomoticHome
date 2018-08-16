'use strict'
/**
 * COntrolador de las soliciticitudes referentes a la API de la aplicación
 */

//importación del esquema de dispositivo
const Device = require('../model/device')
const Save = require('../utils/log_save')
/*
Busca un dispositivo por identificador que se le pasa por parámetro GET
*/
function getDevice(req, res) {
    //retorna un código 200 http y responde con un mensaje de tipo json
    //recuperamos el id del dispositivo a mostrar
    console.log("entra en retorna un elemento");
    Save.saveRequestToFile(req);
    

    Device.findById(req.params.id_device, (err, device) => {
        //si se produce un error
        if (err) { return res.status(500).send({ message: `Error al buscar el dispositivo: ${error}` }); }
        //si no se envuentra el dispositivo
        if (!device) { return res.status(404).send({ message: `No se encuenta el dispositivo solicitado` }); }
        //si todo ok se retorna el dispositivo      
        return res.status(200).send({ device });


    });
}
/*
Retorna todos los dispositivos por solicitud get(el listado de dispositivos)
*/


function getDevices(req, res) {

    console.log("PINTA baseUrl");
    console.dir(req.baseUrl);
    var baseUrl =  req.baseUrl;
    Device.find({}, (err, devices) => {
       

        if(baseUrl=="/admon"){
            console.log("Entra en retornar todos los dispositivos.(admon)");
            if (err) { return res.status(500).send({ message: `Error al realizar la petición: ${error}` }); }
            if (!devices) { return res.status(404).send({ message: 'Actualmente no existen dispositivos dados de alta.' }); }
            //console.dir(devices);
            //res.status(200).render( { devices });
            
          console.dir(devices);
            
            var data =   {
                title: 'Dashboard',
                devices: devices
            }
            res.render('devices', data);
            
        }
        if(baseUrl=="/api"){
            console.log("Entra en retornar todos los dispositivos.(api)");
            if (err) { return res.status(500).send({ message: `Error al realizar la petición: ${error}` }); }
            if (!devices) { return res.status(404).send({ message: 'Actualmente no existen dispositivos dados de alta.' }); }
            //console.dir(devices);
            res.status(200).send({ devices });
        }

      
    });
}

//actualiza valor del dispositivo[id_disp, valor]
function updateDevice(req, res) {
    console.log("Entra por actualizacion");

    Device.findByIdAndUpdate(req.params.device_id, req.body, (err, device) => {
        if (err) { return res.status(500).send({ message: `Error al actualizar el dispositivo ${err}` }); }
        if (!device) { return res.status(404).send({ message: 'No se ha encontrado el dispositivo' }); }
        res.status(200).send({ message: "Dispositivo se ha actualizado correctamente" })
    })
}

//elimina, borra un dispositivo
function deleteDevice(req, res) {
    console.log("Entra en delete " + req.params.device_id);

    Device.findById(req.params.device_id, (err, device) => {
        if (err) { return res.status(500).send({ message: `Error al borrar el  dispositivo ${err}` }); }
        if (!device) { return res.status(404).send({ message: 'No se ha encontrado el dispositivo' }); }
        device.remove(err => {
            if (err) { return res.status(500).send({ message: `Error al borrar el dispositivo: ${error}` }); }
        });
        res.status(200).send({ message: "Dispositivo borrado correctamente" })
    })
}

// para multipart/form-data:  app.post('/items', upload.array(), (req, res, next)=>{

function insertDevice(req, res) {
    console.log("Entar en dar de alta un dispositivo");
    //pinta lo que le llega en el body del mensaje

    Save.saveRequestToFile(req);
    console.log("device description:" + req.body.description);

    //Instanciamos un nuevo objeto de tipo Device
    let device = new Device();

    device.device_name = req.body.device_name;
    device.mac_address = req.body.mac_address;
    device.place = req.body.place;
    device.description = req.body.description;
    device.device_type = req.body.device_type;

    device.save((err, deviceStored) => {
        //en caso de error se muestra un mensaje
        if (err) return res.status(500).send({ message: `Se ha procucido un error al guardar el dispositivo. Error ${err}` });
        res.status(200).send({ device: deviceStored });
    });
}

module.exports = {
    getDevice,
    getDevices,
    updateDevice,
    insertDevice,
    deleteDevice
}
