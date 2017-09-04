/**
 * 
 * @authors kong
 * @date    2017-08-25 15:32:19
 * @version $Id$
 */

var Local = function(){
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
			} else if(e.keyCode == 39){ //右
				game.right();
			} else if(e.keyCode == 40){ //下
				game.down();
			} else if(e.keyCode == 37){ //左
				game.left();
			} else if(e.keyCode == 32){ //空格
				game.fall();
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
			var line = game.checkClear();
			if(line){ game.addScore(line); }
			var gameOver = game.checkGameOver();
			if(gameOver){
				alert("你输了");
				stop();
			}else{
				game.performNext(generateType(),generateDir());
			}
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
		game.init(doms,generateType(),generateDir());
		game.performNext(generateType(),generateDir());
		bindKeyEvent();
		timer = setInterval(move,INTERVAL)
	}
	var stop = function(){
		if(timer){
			clearInterval(timer);
			timer = null;
		}
		game.setTime(0);
		document.onkeydown  =  null;
	}
	//导出API
	this.start = start;
}