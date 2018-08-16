
'use strict'

function getHome(req, res) {
     var data =   {
       title: 'Dashboard',
       "employees": [
           {"firstName": "John", "lastName": "Doe"},
           {"firstName": "Anna", "lastName": "Smith"},
           {"firstName": "Peter", "lastName": "Jones"}
       ]
   }
//render('nombre de la plantilla renderizar', datos que se pasan como parámetro)      
res.render('home', data);
}


function getDevices(req, res){
    var data =   {
        title: 'Dashboard',
        "employees": [
            {"firstName": "John", "lastName": "Doe"},
            {"firstName": "Anna", "lastName": "Smith"},
            {"firstName": "Peter", "lastName": "Jones"}
        ]
    }
    res.render('devices', data);
}
// app.get('/', (req, res) => {
//     var data =   {
//           title: 'Dashboard',
//           "employees": [
//               {"firstName": "John", "lastName": "Doe"},
//               {"firstName": "Anna", "lastName": "Smith"},
//               {"firstName": "Peter", "lastName": "Jones"}
//           ]
//       }
      
//        res.render('home', data);
//   });


module.exports = {
    getHome, getDevices  
}

  