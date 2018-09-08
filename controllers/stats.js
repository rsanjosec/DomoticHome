'use strict'

function showAddUser(req, res, next) {
    var baseUrl = req.baseUrl;
    let path = (req.path).slice(1);

    console.log("path" + path);
   

    if (req.baseUrl == "/stats") {
        console.log("***************ZZZZZZZ path:" + path + "ZZZZZZZZ*****************************");
        var data = {
            title: 'Estadísticas',
            path: path
        }
        res.render('stats', data);
    }

};
