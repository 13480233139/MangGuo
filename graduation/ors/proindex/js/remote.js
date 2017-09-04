/**
 * 
 * @authors kong
 * @date    2017-08-25 15:32:19
 * @version $Id$
 */

var  Remote = function(){
	// 游戏对象
	var	game;
	// 绑定按钮事件
	var bindEvents = function(){
		document.getElementById('down').onclick =function(){
			game.down();
		}
		document.getElementById('left').onclick =function(){
			game.left();
		}
		document.getElementById('right').onclick =function(){
			game.right();
		}
		document.getElementById('rotate').onclick =function(){
			game.rotate();
		}
		document.getElementById('fall').onclick =function(){
			game.fall();
		}
		document.getElementById('fixed').onclick =function(){
			game.fixed();
		}
		document.getElementById('performNext').onclick =function(){
			game.performNext(2,2);
		}
		document.getElementById('checkClear').onclick =function(){
			game.checkClear();
		}
		document.getElementById('checkGameOver').onclick =function(){
			game.checkGameOver(true);
		}
		document.getElementById('setTime').onclick =function(){
			game.setTime(20);
		}
		document.getElementById('addScore').onclick =function(){
			game.addScore(1);
		}
		document.getElementById('addTaiLines').onclick =function(){
			game.addTaiLines([[0,1,0,1,0,1,0,0,1,1]]);
		}
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
	this.start = start;
	this.bindEvents = bindEvents;
}