var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var userId = 0;
io.on('connection', function (socket) {
	socket.emit('userId', userId++);
	console.log(userId);
	socket.on('send', function (data) { 
		socket.broadcast.emit('receive', data);
	});	
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
