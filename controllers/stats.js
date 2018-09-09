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
        ],
    }



    var dataSeries = {
        data:[  {
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
        'text/html':function(){
          res.status(200).render('stats', { url: req.url, layout: 'statsTemplate', dataSeries });
        }
      });

    
      //db.reservations.find({ dateTime: { '$gte': new Date("Tue, 31 Mar 2015 02:30:00 GMT"), '$lte': new Date("Tue, 31 Mar 2015 03:30:00 GMT") }, minParty: { '$lte': 2 }, maxParty: { '$gte': 2 }, _user: { '$exists': false } })
      // db.posts.find({"created_on": {"$gte": start, "$lt": end}})
}

function getStatByDataRange(req, res) {
    //el formato de la fecha debe de ser del tipo "2012-04-23T18:25:43.511Z"
    User.find({ email: req.body.email }, (err, user) => {
        if (err) { return res.status(500).send({ message: err }) }
        if (!user) { return res.status(404).send({ message: "NO existe el usuario" }) }
        req.user = user;
        res.status(200).send({ message: "login correcto", token: service.createToken(user) })
    })
};






module.exports = {
    getStats,      
}