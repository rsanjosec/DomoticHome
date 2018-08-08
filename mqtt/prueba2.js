var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var mqtt = require('mqtt')
//var client  = mqtt.connect('mqtt://localhost')
var client = mqtt.connect({ port: 1993, host: 'localhost', keepalive: 10});
var connectionsArray = [];
 
var temperatura=0;
var irms=0;
 
client.on('connect', function () {
    console.log("11111111");
  client.subscribe('medicion/consumo')
  client.subscribe('temperatura/topic')
})
 
client.on('message', function (topic, message) {
    console.log("22222222");
  // message is Buffer 
  if(topic == 'medicion/consumo') {
 	data = '{"irms":"'+message.toString()+'"}';
	irms = message.toString();
  } else {
      data = '{"temperatura":"'+message.toString()+'"}';
	temperatura = message.toString();
  }
 
  updateSockets(data);
})
 
 
io.on('connection', function(socket){
	console.log('Number of connections:' + connectionsArray.length);
 
	socket.on('disconnect', function(){
		var socketIndex = connectionsArray.indexOf(socket);
    		console.log('socketID = %s got disconnected', socketIndex);
    		if (~socketIndex) {
      			connectionsArray.splice(socketIndex, 1);
	    	}
	});
 
 	console.log('A new socket is connected!');
 	connectionsArray.push(socket);
 
        data = '{"irms":"'+irms+'"}';
	 updateSockets(data);
 
      data = '{"temperatura":"'+temperatura+'"}';
	  updateSockets(data);
 
 
});
 
 
app.get('/', function (req, res) {
    console.log("ENTRA LA SOLIcitud")
    res.sendFile(path.join(__dirname,'index.html'));
})
 
 
http.listen(3000, function(){
  console.log('listening on *:3000');
});
 
 
 
var updateSockets = function(data) {
  // adding the time of the last update
  data.time = new Date();
  console.log(data);
  connectionsArray.forEach(function(tmpSocket) {
    tmpSocket.emit('notification', data);
  });
};
 
console.log("Server started successfully!");