

LIT.define("page/ball/borball1",function($){
	var madeBall = $.require("comp/boreball/madeBalls"),
		freeFall = $.require("comp/boreball/movfun/autoBallMove"),
		circle = $.require("comp/boreball/circle");
	
	var canvas = document.getElementById("canvas");
	if(!canvas.getContext){
		return;
	}
	var circle1 = circle(canvas,{
		x:58,
		y:190,
		color:"#818181",
		radius:30,
		startAngle:Math.PI/9,
		endAngle:Math.PI*3.7/3
	});
	
	
	var circle2 = circle(canvas,{
		x:140,
		y:196,
		color:"#818181",
		radius:25,
		startAngle:0,
		endAngle:Math.PI*12/11
	});
	
	
	var circle3 = circle(canvas,{
		x:221,
		y:192,
		color:"#818181",
		radius:30,
		startAngle:-Math.PI/3.5,
		endAngle:Math.PI
	});
	
	
	var drawBottom = function(circle,lastW,lastY){
		var x = circle.x,y = circle.y,radius = circle.radius;
		lastY = lastY || y+radius+10;
		lastW = lastW || 10;
		var ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.moveTo(x,y+radius);
		ctx.lineTo(x,lastY);
		ctx.strokeStyle="#818181";
		ctx.lineWidth="1";
		ctx.stroke();
		
		ctx.moveTo(x-lastW/2,lastY);
		ctx.lineTo(x+lastW/2,lastY);
		ctx.stroke();
		
		ctx.closePath();
	}
	var drawCanvas = function(){
		circle1.draw();
		circle2.draw();
		circle3.draw();
		drawBottom(circle1,10,230);
		drawBottom(circle2,10,230);
		drawBottom(circle3,10,230);
	}
	
	
	drawCanvas();
	
	
	// 驱动小球
	var made = madeBall(canvas,canvas.width,canvas.height,freeFall,{
		startX:160,
		startY:10,
		
		pointX:140,
		pointY:190,
		radius:25,
		
		ballRadius:5,
		circleList:[circle1,circle2,circle3]
	});
	made.create(1);
	made.onDraw.push(function(){
		drawCanvas();
	})
	
	var range = $("#range");
	range.bind("change",function(){
		made.clear();
		$("#showNumber").html(this.value);
		made.create(this.value);
	})
})
