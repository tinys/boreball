/**
 * 移动的球
 * @author dongyajie
 * @param {Object} canvas
 * @param {Object} option
 * @param {Object} movingFun
 */
LIT.define("comp/boreball/MovementBall", function($){
    var MoveMentBall = function(canvas, option, movingFun){
        var _this = this;
        _this.param = {
            pointX: 0,
            pointY: 0,
            radius: 100,
            
            // 动画1秒一周期
            time: 1000,
            color: "#000",
            ballRadius: 10,
            // 位置
            x: 0,
            y: 0
        };
        if (option) {
            for (var i in option) {
                _this.param[i] = option[i];
            }
        };
        if (movingFun) {
            movingFun(_this);
        }
        _this.canvas = canvas;
        _this.ctx = canvas.getContext("2d");
        // 球的圆点的位置
        _this.init();
        _this.move();
    };
	
	MoveMentBall.prototype = {
		// 匀速圆周
		mometion:function(timePer){
			var _this = this;
			// 360 MI.PI*2
			var angle = timePer * 360*Math.PI/180;
			var disX = Math.cos(angle) * _this.distance,
				disY = Math.sin(angle) * _this.distance;
			return {
				x:_this.param.pointX +disX,
				y:_this.param.pointY +disY,
			}
		},
		init:function(){
			var _this = this;
			if(!_this.param.x && !_this.param.y){
				_this.x = _this.param.pointX + _this.param.radius-_this.param.ballRadius/2;
				_this.y = _this.param.pointY
			}
			_this.distance = Math.sqrt(Math.pow(Math.abs(_this.x -_this.param.pointX ),2) +  Math.pow(Math.abs(_this.y - _this.param.pointY ),2));
		},
		move:function(percent,now){
			var _this = this;
			if(!_this.startTime){
				_this.startTime = Date.now();
			}
			now = now || Date.now();
			var dis = now - _this.startTime;
			percent = percent || dis/_this.param.time;
			
			var calc = _this.mometion(percent,now);
			if(calc){
				_this.x = calc.x;
				_this.y = calc.y;
				_this._draw();
			}
			return calc;
		},
		_draw:function(){
			var _this = this, ctx =_this.ctx;
			ctx.beginPath();
			ctx.arc(_this.x,_this.y,_this.param.ballRadius,0,Math.PI*2,false);
			ctx.fillStyle = _this.param.color;
			ctx.lineWidth="1";
			ctx.fill();
			ctx.closePath();
		},
		isStop:function(){
			return false;
		},
		destroy:function(){
			var _this = this;
			_this.ctx = null;
			_this.canvas = null;
		}
	};
	
	return MoveMentBall;
})
