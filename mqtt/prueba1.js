'use strict'
let mqtt = require('mqtt')
let client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
    const msg0 = {id:"axc1234", value:0.8234};
    const msg1 = "Hola mundo";
    client.subscribe('DomoticHome')
    client.publish('DomoticHome', msg0)
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    client.end()
})