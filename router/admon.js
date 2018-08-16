'use strict'
/**
 * Rutas de  acceso a las diversas entradas para la administración web de la aplicación
 */
const express = require('express');
const router = express.Router();
const DeviceController = require('../controllers/device');
const AdmonController = require('../controllers/admon');
const DeviceDataController = require('../controllers/device-data');
const UserControler = require('../controllers/user');
const auth = require("../middlewares/auth");

/*
 PARA LOS DIPOSITIVOS

 Aunque la url es identica, el sistema sabe distingir dado el tipo de solicitud que
  se le efectúa (GET,POST,PUT,DELETE), de esta formaatenderá  y retornará una respuesta decuada para cda tipo
  de solicitud que reciba
  referencia:
  https://es.wikipedia.org/wiki/Protocolo_de_transferencia_de_hipertexto#M%C3%A9todos_de_petici%C3%B3n
*/




router.get("/", AdmonController.getHome);
router.get("/devices", DeviceController.getDevices);

//Retorna todos los dispositivos 
//para activar la autenticación 
//router.get("/devices", auth.isUserAuth, DeviceController.getDevices);
router.get("/devices", DeviceController.getDevices);
// //Busca un dispositivo por identificador
// router.get('/device/:id_device', DeviceController.getDevice);
// //Actualiza valor del dispositivo[id_disp, valor]
// router.put("/device/:device_id", DeviceController.updateDevice);
// //elimina, borra un dispositivo
// router.delete("/device/:device_id", DeviceController.deleteDevice);
// // añade un dispositivo
// router.post('/device', DeviceController.insertDevice);

// //inserta datos de un dispositivo
// router.post('/device-data', DeviceDataController.insertDeviceData);



// //acceso a las rutas privadas
// router.post("/register", UserControler.register);
// router.post("/login", UserControler.login);

// router.get("/private", auth.isUserAuth, (req, res) => {
//   res.status(200).send({ message: "Acceso concedido." });
// });


module.exports = router;