/**
 * @file Métodos para inserción borrado y actualización de dispositivos 
 *  
 * @author Rubén San José Cruces 
 */

'use strict'
//importación del esquema de dispositivo
const Device = require('../model/device')
const Save = require('../utils/log_save')


/**
 * Pinta la pantalla de anadir dispositivos
 *
 * @param {*} req
 * @param {*} res
 */
function showAddDevice(req, res) {
    var baseUrl = req.baseUrl;
    console.log("baseUrl de showAddDevice");
    console.log(baseUrl);
    let path = (req.path).slice(1);
    if (baseUrl == "/admon") {
        var data = {
            title: 'Insertar un nuevo dispositivo',
            path: path
        }
        res.render('deviceAdd', data);
    }
}

/**
 * (API-REST) Busca un dispositivo por identificador que se le pasa por parámetro GET
 *
 * @param {*} req
 * @param {*} res
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


/**
 * Retorna todos los dispositivos por solicitud get(el listado de dispositivos)
 *
 * @param {*} req
 * @param {*} res
 */
function getDevices(req, res) {
    var baseUrl = req.baseUrl;
    let path = (req.path).slice(1);
    Device.find({}, (err, devices) => {
        if (baseUrl == "/admon") {
            console.log("Entra en retornar todos los dispositivos.(admon)");
            if (err) { return res.status(500).send({ message: `Error al realizar la petición: ${error}` }); }
            if (!devices) { return res.status(404).send({ message: 'Actualmente no existen dispositivos dados de alta en el sistema.' }); }
            var data = {
                title: 'Dashboard',
                devices: devices,
                path: path
            }
            res.render('devices', data);

        }
        if (baseUrl == "/api") {
            console.log("Entra en retornar todos los dispositivos.(api)");
            if (err) { return res.status(500).send({ message: `Error al realizar la petición: ${error}` }); }
            if (!devices) { return res.status(404).send({ message: 'Actualmente no existen dispositivos dados de alta en el sistema.' }); }
            res.status(200).send({ devices });
        }
    });
}


/**
 * Actualiza valor del dispositivo[id_disp, valor]
 *
 * @param {*} req
 * @param {*} res
 */
function updateDevice(req, res) {
    console.log("Entra por actualizacion");
    Device.findByIdAndUpdate(req.params.device_id, req.body, (err, device) => {
        if (err) {
            return res.status(500).send({ message: `Error al actualizar el dispositivo ${err}` });
        }
        if (!device) {
            return res.status(404).send({ message: 'No se ha encontrado el dispositivo' });
        }
        res.status(200).send({ message: "Dispositivo se ha actualizado correctamente" });
    });
}

/**
 * Elimina, borra un dispositivo
 *
 * @param {*} req
 * @param {*} res
 */
function deleteDevice(req, res) {
    console.log("controller Entra en delete " + req.params.device_id);
    Device.findById(req.params.device_id, (err, device) => {
        if (err) {
            return res.status(500).send({ message: `Error al borrar el  dispositivo ${err}` });
        }
        if (!device) {
            return res.status(404).send({ message: 'No se ha encontrado el dispositivo' });
        }
        device.remove(err => {
            if (err) {
                return res.status(500).send({ message: `Error al borrar el dispositivo: ${error}` });
            }
        });
        res.status(200).send({ message: "Dispositivo borrado correctamente" });
    });
}

/**
 * Inserta un nuevo dispositivo
 *
 * @param {*} req
 * @param {*} res
 * @return {Response} Mensaje de éxito o error a la hora de insertar el dispositivo
 */
function insertDevice(req, res) {
    console.log("Entar en dar de alta un dispositivo");
    Save.saveRequestToFile(req);
    //Instanciamos un nuevo objeto de tipo Device
    let device = new Device();
    device.device_name = req.body.device_name;
    device.mac_address = req.body.mac_address;
    device.place = req.body.place;
    device.description = req.body.description;
    device.device_type = String(req.body.device_type).toLowerCase();

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
    deleteDevice,
    showAddDevice
}
