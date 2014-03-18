LIT.define("comp/boreball/madeBalls",function($){
	var MoveMentBall = $.require("comp/boreball/MovementBall");
	
	return function(canvas,width,height,movefuns,options){
		var ballCollection = {
			ballList:[],
			onDraw:[],
			init:function(canvas,width,height,movefuns){
				var _this = this;
				_this.canvas = canvas;
				_this.ctx = canvas.getContext("2d");
				_this.width = width;
				_this.height = height;
				_this.movefuns = movefuns;
				_this.param = {
					pointX:250,
					pointY:150,
					radius:100,
					time:2000,
				};
				if(options){
					for(var i in options){
						_this.param[i] = options[i];
					}
				}
			},
			create:function(count){
				var _this = this;
				var colorList = ["#91caf1","#bad5de","#cbd2b3","#c0bf9d","#aba398","#818181","#929190"];
				var createBall = function(ix){
					var option = {
						color:colorList[ix] || "#929190",
						ballRadius:10
					}
					for(var i in _this.param){
						option[i] = _this.param[i];
					}
					var ball = new MoveMentBall(_this.canvas,option,_this.movefuns);
					
					_this.ballList.push(ball);
				};
				var index = 0;
				var createMoreBall = function(){
					if(count <= 0){
						return;
					}
					count--;
					createBall(index++);
					_this.createTimeout = setTimeout(function(){
						createMoreBall();
					},60)
				}
				createMoreBall();
				
				_this.loop();
			},
			clearAll:function(){
				var _this = this;
				_this.ctx.clearRect(0,0,_this.width,_this.height);
			},
			_draw:function(){
				var _this = this,length = _this.ballList.length;
				if(!_this.start){
					_this.start = Date.now();
				}
				var now = Date.now();
				var dis = _this.start - now,
					percent = dis/200;
				percent > 1 &&(percent = percent%_this.param.time);
				
				_this.ballList.forEach(function(a,i){
					if(!a.isStop()){
						a.move(percent,now);
						return;
					}
					length --;
				})
				_this.onDraw.forEach(function(a,i){
					a.apply(_this);
				})
				return length > 0;
			},
			clear:function(){
				var _this = this;
				if(_this.createTimeout){
					clearTimeout(_this.createTimeout);
				}
				_this.ballList.length = 0;
				_this.clearAll();
			},
			loop:function(){
				var _this = this;
				_this.clearAll();
				if(_this._draw()){
					$.nextFrame(function(){
						_this.loop();
					})
				}
			}
		}
		ballCollection.init(canvas,width,height,movefuns);
		return ballCollection;
	}
})
