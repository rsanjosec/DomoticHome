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


// +++++ GESTIÓN DE RUTAS DESDE EL INTERFAZ WEB +++++
router.get("/", AdmonController.getHome);
router.get("/devices", DeviceController.getDevices);
//muestra la página de añadir un dispositivo
router.get("/add-device", DeviceController.showAddDevice);
//ruta para usuarios
router.get("/users", UserControler.getUsers);
//muestra la página de añadir un usuario
router.get("/add-user", UserControler.showAddUser);
//para las Estadísticas
router.get("/users", StatsControler.getStats);




module.exports = router;