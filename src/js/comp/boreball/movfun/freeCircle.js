/**
 * 
 * @author dongyajie
 */
LIT.define("comp/boreball/movfun/freeCircle",function($){
	return function(ball){
		var start = {
			// 开始位置
			x:0,
			y:0
		},
		// 圆周运动 曲线位置
		circle = {
			x:0,
			y:0,
			// 半径
			radius:100,
			//
			endAngle:-180
		},
		G = 9.8*60;
		var xfuns = {
			step1:{
				st:0,
				ed:0,
				getValue:function(time){
					time = time-this.st;
					return circle.x + Math.cos(_maxRate * time/circle.radius) * circle.radius;
				}
			},
			step2:{
				st:0,
				ed:0,
				getValue:function(time){
					time = time-this.st;
					return circle.x - Math.cos(_maxRate * time/circle.radius) * circle.radius
				}
			},
			defa:{
				getValue:function(time){
					if(time  < xfuns.step1.st || time  > xfuns.step2.ed){
						return start.x;
					}else if(time > xfuns.step1.ed && time < xfuns.step2.st){
						return start.x - circle.radius *2;
					}
				}
			}
		},
		_maxRate = 0,
		peroidTime = 0,
		_height = 0,
		downY = function(time){
			return G*Math.pow(time,2)/2;
		},
		upY = function(time){
			return _maxRate * time - G*Math.pow(time,2)/2;
		},
		circleY = function(time){
			
			return Math.sin(_maxRate * time/circle.radius) * circle.radius
		},
		yfuns = {
			step1:{
				st:0,
				ed:0,
				getValue:function(time){
					var dis = downY(time);
					return start.y + dis;
				}
			},
			step2:{
				st:0,
				ed:0,
				getValue:function(time){
					time = time - this.st;
					var offset = circleY(time);
					return start.y + _height + offset;
				}
			},
			step3:{
				st:0,
				ed:0,
				getValue:function(time){
					time = time - this.st;
					var offset = upY(time);
					return start.y + _height - offset;
				}
			},
			step4:{
				st:0,
				ed:0,
				getValue:function(time){
					time = time - this.st;
					var offset = downY(time);
					return start.y + offset;
				}
			},
			step5:{
				st:0,
				ed:0,
				getValue:function(time){
					time = time - this.st;
					var offset = circleY(time);
					return start.y + _height + offset;
				}
			},
			step6:{
				st:0,
				ed:0,
				getValue:function(time){
					time = time - this.st;
					var offset = upY(time);
					return start.y + _height - offset;
				}
			}
		}
		
		ball.init = function(){
			start.x = ball.param.startX;
			start.y = ball.param.startY;
			
			circle.x = ball.param.pointX;
			circle.y = ball.param.pointY;
			circle.radius = ball.param.radius;
			//circle.endAngle = circle.endAngle || ball.param.endAgle
			
			var height = circle.y - start.y,
				atCircleTime = Math.sqrt(2*height/G),
				maxRate = G*atCircleTime,
				firstLeaveTime = circle.radius * Math.PI/maxRate;
			_maxRate = maxRate;
			_height = height;
			
			xfuns.step1.st = atCircleTime;
			xfuns.step1.ed = atCircleTime+firstLeaveTime;
			
			xfuns.step2.st = xfuns.step1.ed + atCircleTime*2;
			xfuns.step2.ed = xfuns.step2.st + firstLeaveTime;
			
			
			yfuns.step1.ed = atCircleTime;
			yfuns.step2.st = xfuns.step1.st;
			yfuns.step2.ed = xfuns.step1.ed;
			
			yfuns.step3.st = yfuns.step2.ed;
			yfuns.step3.ed = yfuns.step3.st + atCircleTime;
			
			yfuns.step4.st = yfuns.step3.ed;
			yfuns.step4.ed = yfuns.step4.st + atCircleTime;
			
			yfuns.step5.st = xfuns.step2.st;
			yfuns.step5.ed = xfuns.step2.ed;
			
			yfuns.step6.st = yfuns.step5.ed;
			yfuns.step6.ed = yfuns.step5.ed+atCircleTime;
			peroidTime = yfuns.step6.ed;
		}
		var getStep = function(funs,time){
			var step = funs.defa;
			for(var i in funs){
				var stepTemp = funs[i];
				if(stepTemp.st <=time && time <= stepTemp.ed){
					step = stepTemp;
					break;
				}
			}
			return step;
		}
		ball.mometion = function(per,movTime){
			movTime = movTime || Date.now();
			
			movTime = ((movTime-ball.startTime)/1000) % peroidTime;
			
			var xStep = getStep(xfuns,movTime),
				yStep = getStep(yfuns,movTime);
			var x = ball.x,y=ball.y;
			if(xStep){
				x = xStep.getValue(movTime);
			}
			if(yStep){
				y = yStep.getValue(movTime);
			}
			return {
				x:x,
				y:y
			}
		}
	}
})

