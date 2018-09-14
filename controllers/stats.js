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
 * @param {*} req  Objeto Request 
 * @param {*} res  Objeto Response
 * @returns {object} json con los datos solicitados
 */
function getStatByDataRange(req, res) {
    console.log("consulta de fecha sobre dispositivos");
    //el formato de la fecha debe de ser del tipo "2012-04-23T18:25:43.511Z"

    console.log(req.startDate);
    console.log(req.endDate);

    req.startDate = "5b9900e3f7f90d14bf95b16b";
    req.endDate = "5b9900ebf7f90d14bf95b173";
    req.deviceName = ""
    Stats.find({ _id: { $gte: mongoose.Types.ObjectId(req.startDate), $lte: mongoose.Types.ObjectId(req.endDate) } }, (err, devicedata) => {
        if (err) { return res.status(500).send({ message: err }) }
        if (!devicedata) { return res.status(404).send({ message: "NO hay datos para este dispositivo" }) }
        return res.status(200).send({ devicedata })
    });
};

/**
 * Retorna registros a partir de la fecha pasada como parametro.
 * 
 * @param {*} req Objeto Request
 * @param {*} res Objeto Response
 *  
 */
function getStatFromDate(req, res) {
    console.log("consulta de todos los dispositivos");

    Stats.find({ _id: { $gte: mongoose.Types.ObjectId(req.startDate) } }, (err, devicedata) => {
        if (err) { return res.status(500).send({ message: err }) }
        if (!devicedata) { return res.status(404).send({ message: "NO hay datos para este dispositivo" }) }
        return res.status(200).send({ devicedata })
    })
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
    let deviceName = req.deviceName;
    let responseData ={}
    Stats.find({ _id: { $gte: mongoose.Types.ObjectId(Util.todayToMongoId()) }, device_name: "frigorífico" }, (err, devicedata) => {
        if (err) { return res.status(500).send({ message: err }) }
        if (!devicedata) { return res.status(404).send({ message: "NO hay datos para este dispositivo" }) }
        console.log("retorna los dispositivos");
        let arrDatos = [];
       
        for (let i = 0; i < devicedata.length; i++) {
            const element = devicedata[i];
           // arrDatos.push([element.id, element.val]);
            arrDatos.push([Date.parse(Util.dateFromObjectId(element.id)), element.val]);
        }
        console.dir(arrDatos);
        responseData.deviceName=req.deviceName;
        responseData.arrDatos=arrDatos;

        return res.status(200).send(responseData);
        //return res.status(200).send({ devicedata })
    })
};




module.exports = {
    getStats,
    getStatFromDate,
    getStatByDataRange,
    getStatDeviceToday
};