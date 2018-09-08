'use strict'

// var Highcharts = require('highcharts');
// // Load module after Highcharts is loaded
// require('highcharts/modules/exporting')(Highcharts);
// // Create the chart
// Highcharts.chart('container', { /*Highcharts options*/ });


//retorna la platilla de visualización de la home de administración
function getStats(req, res) {
      var data =   {
        title: 'Estadísticas',
        "employees": [
            {"firstName": "John", "lastName": "Doe"},
            {"firstName": "Anna", "lastName": "Smith"},
            {"firstName": "Peter", "lastName": "Jones"}
        ]
    }
    //render('nombre de la plantilla renderizar', datos que se pasan como parámetro)     
    

    res.render('stats', {  data: data});
}





module.exports = {
    getStats,      
}