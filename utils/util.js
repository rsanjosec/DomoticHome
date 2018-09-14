/**
 * @file Utilidades varias
 *  
 * @author Rubén San José Cruces 
 */

'use strict'

class Fecha {
    constructor() {
        var fecha = new Date();
        this.dia = fecha.getFullYear();
        this.mes = fecha.getMonth();
        this.anio = fecha.getDate();
        this.hora = fecha.getHours();
        this.min = fecha.getMinutes();
        this.seg = fecha.getSeconds();
    }
    getFecha() {
        return this.anio + "/" + this.mes + "/" + this.dia;
    }
    getTiempo() {
        return this.hora + ":" + this.min + ":" + this.seg;
    }
}

module.exports = Fecha

     
