const DeviceData = require('../model/device-data');
var mqtt = require('mqtt');
//var client = mqtt.connect({ port: 1883, host: 'localhost', keepalive: 10});
var client = mqtt.connect({ port: 1993, host: 'localhost' });

const DeviceDataController = require('../controllers/device-data');

//# conexion enviando usuario y password
// var client  = mqtt.connect('mqtt://127.0.0.1:1883', {
//     username: 'login',
//     password: 'pass'
// });

//client.subscribe('medicion/consumo')
//client.publish('medicion/consumo', 'blblblbllsss')
// client.on('message', function (topic, message) {
//   console.log(message)
// })
// client.end()

// var deviceRoot = "medicion/consumo/"; //deviceroot is topic name given in arduino code 
// client.subscribe(deviceRoot+"+"); //subscribing to the topic name
// client=mqtt.connect({ host: 'localhost', port: 1883 });
var contador = 0;

client.on('connect', function () {
  console.log("A la escucha de nuevos mensajes");
  client.subscribe('medicion/consumo');
  //client.subscribe('temperatura/topic')
});

client.on('message', function (topic, message) {
  // message is Buffer 
  console.log("Enta un nuevo mensaje");
  
  if (topic == 'medicion/consumo') {

    DeviceDataController.insertDeviceDataTres(message);
   // client.end();




    // //contador += 1;
    // console.log(message.toString());
    // var myMessage = message.toString();
    // var obj = JSON.parse(myMessage);
    // // DeviceDataController.insertDeviceDataDos(obj);     
    // let device = new DeviceData();
    // let device_name = "A_aa_bb";
    // let val = 0.789;
    // console.log("a111 ");
    // device.save((err, device) => {
    //   console.log("222: ");
    //   //en caso de error se muestra un mensaje
    //   console.log("entra dentro de device data");

    //   if (err) { console.log("Se ha producido un error"); console.log(err); }
    //   console.log(cf_color.FgMagenta + '%s' + cf_color.Reset, " Se inserta el registro ");
    //   console.log(deviceStored);
    // });




  } else {
    console.log(message.toString());
  }
  //client.end();  
});


client.on('error', function (error) {
  console.log('mqtt error: ' + error);
  client.end();
});

client.on('close', function () {
  console.log('mqtt closed');

});

client.on('offline', function () {
  console.log('offline');

});

client.on('reconnect', function () {
  console.log('reconnect');
});


module.exports.getContador = function () {
  console.log('valor de contador: ' + contador);
};
