
'use strict'
//retorna la platilla de visualización de la home de administración
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

    res.render('home', {  data: data});
}





module.exports = {
    getHome,
      
}

  