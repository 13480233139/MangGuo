/**
 * 
 * @authors kong
 * @date    2017-08-25 15:32:19
 * @version $Id$
 */

var  Remote = function(socket){
	// 游戏对象
	var	game;
	// 绑定按钮事件
	var bindEvents = function(){
		socket.on('init',function(data){
			start(data.type,data.dir);
		});
		socket.on('next',function(data){
			game.performNext(data.type,data.dir);
		});
		socket.on('rotate',function(data){
			game.rotate();
		});
		socket.on('down',function(data){
			game.down();
		});
		socket.on('right',function(data){
			game.right();
		});
		socket.on('left',function(data){
			game.left();
		});
		socket.on('fall',function(data){
			game.fall();
		});
		socket.on('fixed',function(data){
			game.fixed();
		});
		socket.on('line',function(data){
			game.checkClear();
			game.addScore(data);
		});
		socket.on('time',function(data){
			game.setTime(data);
		});
		socket.on('lose',function(data){
			console.log('what the  fuck');
		});
		socket.on('addTaiLines',function(data){
			game.addTaiLines(data);
		});
	}
	//开始
	var start = function(type,dir){
		var doms = {
			gameDiv: document.getElementById('remote_game'),
			nextDiv: document.getElementById('remote_next'),
			timeDiv: document.getElementById('remote_time'),
			scoreDiv: document.getElementById('remote_score')
		}

		game = new Game();
		game.init(doms, type, dir);
	}

	bindEvents();
}