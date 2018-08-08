var mqtt = require('mqtt');
//var client  = mqtt.connect("mqtt://test.mosquitto.org",{clientId:"mqttjs01"});
var client = mqtt.connect({ port: 1993, host: 'localhost'});
//var client = mqtt.connect('mqtt://localhost:1883');
client.on("connect", function () {
    console.log("connected");
})