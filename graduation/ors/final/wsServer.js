var app = require('http').createServer()
var io = require('socket.io')(app);

var PORT = 3000;

app.listen(PORT);

console.log("正在监听端口："+ PORT);

//客户端计数
var clientCount = 0;

//用来保存客户端的socket
var socketMap = {};

var bindListener = function(socket, event){
	socket.on(event,function(data){
  	if(socket.clientNum % 2 == 0){
  		if(socketMap[socket.clientNum - 1]){
  			socketMap[socket.clientNum - 1].emit(event,data);
  		}
  	}else{
  		if(socketMap[socket.clientNum + 1]){
  			socketMap[socket.clientNum + 1].emit(event,data);
  		}
  	}
  })
}

io.on('connection', function (socket) {
  clientCount++;
  socket.clientNum = clientCount;
  socketMap[clientCount] = socket;

  if(clientCount % 2 ==1){
		socket.emit("waiting","等待另一个玩家");
  }else{
  	if(socketMap[socket.clientNum - 1]){
	  	socket.emit("start");
	  	socketMap[(clientCount - 1)].emit('start');
  	}else{
  		socket.emit("leave");
  	}
  }
  bindListener(socket,'init');
  bindListener(socket,'next');
  bindListener(socket,'rotate');
  bindListener(socket,'down');
  bindListener(socket,'right');
  bindListener(socket,'left');
  bindListener(socket,'fall');
  bindListener(socket,'fixed');
  bindListener(socket,'line');
  bindListener(socket,'time');
  bindListener(socket,'lose');
  bindListener(socket,'bottomLines');
  bindListener(socket,'addTaiLines');

  socket.on('disconnect',function(){
  	if(socket.clientNum % 2 == 0){
  		if(socketMap[socket.clientNum - 1]){
  			socketMap[socket.clientNum - 1].emit('leave');
  		}
  	}else{
  		if(socketMap[socket.clientNum + 1]){
  			socketMap[socket.clientNum + 1].emit('leave');
  		}
  	}
  	delete(socketMap[socket.clientNum]);
  })
});
