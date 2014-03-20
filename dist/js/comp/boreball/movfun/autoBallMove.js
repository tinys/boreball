/**
 * 
 */
LIT.define("comp/boreball/movfun/autoBallMove",function($){
	return function(ball){
		var xObj = {
			flag:-1,
			rate:0,
			lastDate:0,
			start:0
		},yObj={
			flag:1,
			lastDate:0,
			rate:0,
			start:0,
			maxRate:0
		},
		ballObj = {
			lastDate:0
		},
		// 开始位置
		start={
			x:0,
			y:0,
			heigh:0
		},
		G = 9.8*40;
		
		
		var getX = function(t){
			var moveTime = (t - xObj.lastDate)/1000;
			return xObj.start + xObj.rate * moveTime * xObj.flag;
		},
		getY = function(t){
			var moveTime = (t - yObj.lastDate)/1000;
			if(yObj.flag>0){
				return yObj.start + G*Math.pow(moveTime,2)/2
			}else{
				return yObj.start - yObj.rate*moveTime + G*Math.pow(moveTime,2)/2
			}
		},
		refreshY = function(t){
			var moveTime = (t - yObj.lastDate)/1000;
			if(yObj.flag >0){
				yObj.rate = G * moveTime;
				yObj.maxRate = Math.max(yObj.maxRate,yObj.rate);
			}else{
				yObj.rate = yObj.maxRate - G * moveTime;
			}
		},
		circle = function(circle,t){
			if(!ballObj.lastDate){
				ballObj.lastDate = t;
			}
			if(!isInBox(ball,circle)){
				// 逃出球体
				ball.inBox = false;
				yObj.flag = -1;
				var angle = 0;
				// 在box 右边
				if( ball.x >= circle.x){
					if(circle.startAngle >0){
						xObj.flag = 1;
					}else{
						xObj.flag = -1;
					}
					angle = circle.startAngle;
				}
				// 在左边
				if( ball.x < circle.x){
					if(circle.endAngle > Math.PI){
						xObj.flag = 1;
					}else{
						xObj.flag = -1;
					}
					angle = circle.endAngle;
				}
				
				xObj.rate = Math.abs(Math.sin(angle) * yObj.maxRate);
				yObj.rate = Math.abs(Math.cos(angle) * yObj.maxRate);
				xObj.lastDate = t;
				yObj.lastDate = t;
				yObj.start = ball.y;
				xObj.start = ball.x;
				
				return false;
			}
			var moveTime = (t - ballObj.lastDate)/1000;
			var totalRangle = Math.abs(circle.endAngle - circle.startAngle),
				totalLength =  totalRangle * Math.PI * circle.radius/4;
			// 从左边入手
			if(moveTime ==0){
				if(ball.x > circle.x){
					xObj.flag = -1;
				}else{
					xObj.flag = 1;
				}
			}
			var angle = 0;
			if(xObj.flag > 0){
				angle = circle.endAngle - yObj.maxRate*moveTime/totalLength*totalRangle
			}else{
				angle = circle.startAngle + yObj.maxRate*moveTime/totalLength*totalRangle
			}
			return {
				x:circle.x + Math.cos(angle)*(circle.radius-ball.radius) ,
				y:circle.y + Math.sin(angle)*(circle.radius-ball.radius)
			}
		};
		
		
		var ballList = ball.param.circleList;
		
		var isInBox = function(point,circle){
			var x = point.x - circle.x,
					y = point.y - circle.y;
					
			var lang = Math.sqrt(Math.pow(x,2) +  Math.pow(y,2));

			if(lang <= (point.radius + circle.radius)){
				var rangle = 0;
				if(y < 0){
					rangle = Math.PI*2-Math.acos(x/lang);
					var min =  circle.startAngle;
					if(min < 0 && x >0){
						rangle = -Math.acos(x/lang);
					}
				}else{
					rangle = Math.acos(x/lang)
				}
				
				if(rangle >= circle.startAngle && rangle <=circle.endAngle){
					return true;
				}
			}
			return false;
		}
		
		ball.init = function(){
			xObj.start = ball.param.startX;
			yObj.start = ball.param.startY;
			start.x = ball.param.startX;
			start.y = ball.param.startY;
		}
		ball.mometion = function(per, movTime){
			movTime = movTime || Date.now();
			if(!xObj.lastDate){
				xObj.lastDate = movTime;
				yObj.lastDate = movTime;
			}
			if(!ball.inBox){
				ballList.forEach(function(a,i){
					if(isInBox(ball,a)){
						ball.inBox = a;
						ballObj.lastDate = movTime;
						yObj.maxRate =G*Math.sqrt(Math.abs(start.y - ball.y-ball.radius)*2/G);
						return false;
					}
				})
			}
			if(ball.inBox){
				// box 运动
				var point = circle(ball.inBox,movTime);
				if(point){
					return point;
				}
			}else{
				refreshY(movTime);
			}
			
			var x = getX(movTime),
				y = getY(movTime);
			
			return {
				x:x,
				y:y
			}
		}
		ball.isStop = function(){
			return ball.x <0 || ball.x > ball.canvas.width || ball.y < 0 && ball.y > ball.canvas.height;
		}
	}
})
