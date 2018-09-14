/**
 * @file Utilidades varias para las estadísticas
 *  
 * @author Rubén San José Cruces 
 */

'use strict'

//recive una fecha en formato yyy-mm-dd y retorna fecha formato monngose
var objectIdFromDate = function (date) {
    return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
};
//recibe un string en formato fecha mongoose y 
//retorna una fecha con formato 2018-09-09T18:31:12.000Z en string
var dateFromObjectId = function (objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};


let todayToMongoId = function () {
    let currentDate = new Date().toISOString().slice(0, 10).toString();
    let d = new Date(currentDate);   
    return (objectIdFromDate(d));
}

//module.exports = Fecha ;
module.exports = {dateFromObjectId,todayToMongoId }