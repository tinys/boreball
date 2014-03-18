LIT.define("comp/boreball/movfun/freeFall",function($){
	var freeFall = function(ball){
		var G = 9.8*60;
		var height = ball.param.height;
		
		ball.init = function(){
			ball.x = 150;
			ball.y = 0;
		}
		var isStop = false,flag = 1;
		ball.mometion = function(percent,movedTime){
			movedTime = Math.abs(movedTime) /1000;
			var dis = 0;
			
			ball.turningTime || (ball.turningTime =0);
			var realMoveTime = movedTime- ball.turningTime
			if(flag >0){
				dis = G*Math.pow(realMoveTime,2)/2;
				if(dis > ball.canvas.height){
					dis =ball.canvas.height;
					ball.turningTime = movedTime;
					ball.maxRate = G * realMoveTime;
					flag = -1;
				}
			}else{
				dis = ball.canvas.height - (ball.maxRate *realMoveTime- G*Math.pow(realMoveTime,2)/2 );
				if(dis<0){
					dis = 0;
					ball.turningTime = movedTime;
					flag = 1;
				}
			}
			return {
				x:150,
				y:dis
			}
		};
		ball.isStop = function(){
			return isStop;
		}
	}
	return freeFall;
})
