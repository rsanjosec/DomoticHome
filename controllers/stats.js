/**
 * @file Métodos correspondientes al controlador de estadísticas 
 *  
 * @author Rubén San José Cruces 
 */

'use strict'

//importación del esquema de dispositivo
const Stats = require('../model/device-data')
const mongoose = require('mongoose');
const Util = require("../utils/stats")
// var Highcharts = require('highcharts');
// // Load module after Highcharts is loaded
// require('highcharts/modules/exporting')(Highcharts);
// // Create the chart
// Highcharts.chart('container', { /*Highcharts options*/ });


//retorna la platilla de visualización de la home de administración
function getStats(req, res) {
    var dataSeries = {
        title: 'Estadísticas',
        data: [{
            name: 'Installation',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
            name: 'Manufacturing',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }, {
            name: 'Sales & Distribution',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        }, {
            name: 'Project Development',
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
        }, {
            name: 'Other',
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        }]
    }

    //render('nombre de la plantilla renderizar', datos que se pasan como parámetro)     
    res.format({
        'text/html': function () {
            res.status(200).render('stats', { url: req.url, layout: 'statsTemplate', dataSeries });
        }
    });
}



/**
 *  Retorna todos los dispositivos para un rango de fechas dado 
 *  o bien para el dispositivo indicado en el parámetro req.deviceName
 * @param {*} req  Objeto Request 
 * @param {*} res  Objeto Response
 * @returns {object} json con los datos solicitados
 */
function getStatByDataRange(req, res) {
    // si req.deviceName es vacio, retorna todos los dispositivos
    if (Object.keys(req.deviceName).length === 0) {
        Stats.find({
            _id: { $gte: mongoose.Types.ObjectId(req.startDate), $lte: mongoose.Types.ObjectId(req.endDate) }
        }, (err, devicedata) => {
            if (err) { return res.status(500).send({ message: err }) }
            if (!devicedata) { return res.status(404).send({ message: "NO hay datos para este dispositivo" }) }
            return res.status(200).send({ devicedata })
        });
        //en caso contrario retorna datos para el dispositivo indicado en el parametro sobre el rango de fechas asignado            
    } else {
        Stats.find({
            _id: { $gte: mongoose.Types.ObjectId(req.startDate), $lte: mongoose.Types.ObjectId(req.endDate) },
            device_name: req.deviceName
        }, (err, devicedata) => {
            if (err) { return res.status(500).send({ message: err }) }
            if (!devicedata) { return res.status(404).send({ message: "NO hay datos para este dispositivo" }) }
            return res.status(200).send({ devicedata })
        });
    }
};

/**
 * Retorna registros a partir de la fecha pasada como parametro en adelante,
 * para todos los dispositivos o bien para el dispositivo que se envíe por parámetro.
 * 
 * @param {*} req Objeto Request
 * @param {*} res Objeto Response
 *  
 */
function getStatFromDate(req, res) {
    console.log("consulta de todos los dispositivos");
    if (Object.keys(req.deviceName).length === 0) {
        Stats.find({ _id: { $gte: mongoose.Types.ObjectId(req.startDate) } }, (err, devicedata) => {
            if (err) { return res.status(500).send({ message: err }) }
            if (!devicedata) { return res.status(404).send({ message: "NO hay datos para este dispositivo" }) }
            return res.status(200).send({ devicedata })
        });
    } else {
        Stats.find({
            _id: { $gte: mongoose.Types.ObjectId(req.startDate) },
            device_name: req.deviceName
        }, (err, devicedata) => {
            if (err) { return res.status(500).send({ message: err }) }
            if (!devicedata) { return res.status(404).send({ message: "NO hay datos para este dispositivo" }) }
            return res.status(200).send({ devicedata })
        });
    }
};

/**
 * Retorna registros a partir de la el día presente para un dispositivo dado
 * 
 * @param {*} req Objeto Request
 * @param {*} res Objeto Response
 *  
 */
function getStatDeviceToday(req, res) {
    console.log("consulta el despositivo selecionado en la fecha de hoy");

    let responseData = {}
    Stats.find({ _id: { $gte: mongoose.Types.ObjectId(Util.todayToMongoId()) }, device_name: req.deviceName }, (err, devicedata) => {
        if (err) { return res.status(500).send({ message: err }) }
        if (!devicedata) { return res.status(404).send({ message: "NO hay datos para este dispositivo" }) }
        let arrDatos = [];

        for (let i = 0; i < devicedata.length; i++) {
            const element = devicedata[i];
            console.log(element);
            arrDatos.push([Date.parse(Util.dateFromObjectId(element.id)), element.val]);
        }
        console.dir(arrDatos);
        responseData.deviceName = req.deviceName;
        responseData.arrDatos = arrDatos;
        return res.status(200).send(responseData);
    })
};




module.exports = {
    getStats,
    getStatFromDate,
    getStatByDataRange,
    getStatDeviceToday
};