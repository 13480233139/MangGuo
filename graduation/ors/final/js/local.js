/**
 * 
 * @authors kong
 * @date    2017-08-25 15:32:19
 * @version $Id$
 */

var Local = function(socket){
	// 游戏对象
	var	game;
	// 事件间隔
	var INTERVAL = 200;
	// 定时器
	var timer = null;
	// 时间计数器
	var timerCount = 0;
	// 时间
	var time = 0;
	// 绑定键盘事件
	var bindKeyEvent = function(){
		document.onkeydown = function(e){
			if(e.keyCode == 38){ //上
				game.rotate();
				socket.emit('rotate');
			} else if(e.keyCode == 39){ //右
				game.right();
				socket.emit('right');
			} else if(e.keyCode == 40){ //下
				game.down();
				socket.emit('down');
			} else if(e.keyCode == 37){ //左
				game.left();
				socket.emit('left');
			} else if(e.keyCode == 32){ //空格
				game.fall();
				socket.emit('fall');
			}
		}
	}
	// 随机生成一个方块种类
	var generateType = function(){
		return Math.ceil(Math.random() * 7) - 1;
	}
	// 随机生成一个旋转次数
	var generateDir = function(){
		return Math.ceil(Math.random() * 4) - 1;
	}
	// 移动
	var move = function(){
		timerFunc();
		if(!game.down()){
			game.fixed();
			socket.emit('fixed');
			var line = game.checkClear();
			if(line){ 
				game.addScore(line); 
				socket.emit('line',line);
				if(line > 1){
					var  bottomLines = generlocal_ataBottomLine(line);
					socket.emit('bottomLines',bottomLines);
				}
			}
			var gameOver = game.checkGameOver();
			if(gameOver){
				game.gameOver(false);
				socket.emit('lose');
				stop();
			}else{
				var typeN = generateType();
				var dirN = generateDir();
				game.performNext(typeN,dirN);
				socket.emit('next',{
					type:typeN,
					dir:dirN
				})
			}
		}else{
			socket.emit('down');
		}
	}
	//随机生成干扰行
	//
	var generlocal_ataBottomLine = function(lineNum){
		var lines = [];
		for(var i=0; i<lineNum;i++){
			var line = [];
			for(var j=0; j<10; j++){
				line.push(Math.ceil(Math.random() * 2) - 1);
			}
			lines.push(line);
		}
		return lines;
	}
	// 计时函数
	var timerFunc = function(){
		timerCount =timerCount + 1;
		if(timerCount == 5){
			timerCount = 0;
			time = time + 1;
			game.setTime(time);
			socket.emit('time',time);
		}
	}
	//开始
	var start = function(){
		var doms = {
			gameDiv: document.getElementById('local_game'),
			nextDiv: document.getElementById('local_next'),
			timeDiv: document.getElementById('local_time'),
			scoreDiv: document.getElementById('local_score')
		}

		game = new Game();
		var type = generateType();
		var dir = generateDir();
		game.init(doms,type,dir);
		socket.emit('init',{
			type:type,
			dir:dir
		})
		var typeN = generateType();
		var dirN = generateDir();
		game.performNext(typeN,dirN);
		socket.emit('next',{
			type:typeN,
			dir:dirN
		})
		bindKeyEvent();
		timer = setInterval(move,INTERVAL)
	}
	var stop = function(){
		if(timer){
			clearInterval(timer);
			timer = null;
		}
		document.onkeydown  =  null;
	}
	//监听开始
	socket.on('start',function(){
		document.getElementById('waitingBG').style.display = "none";
		start();
	})
	socket.on('lose',function(){
		game.gameOver(true);
		stop();
	})
	socket.on('leave',function(){
		document.getElementById('waitingBG').style.display = "block";
		document.getElementById('waiting').innerHTML = '对方掉线了<a href="javascript:;" onclick="location.reload()">[重新匹配]</a>';
		stop();
	})
	socket.on('bottomLines',function(data){
		game.addTaiLines(data);
		socket.emit('addTaiLines',data);
	})
}