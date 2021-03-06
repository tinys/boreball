

LIT.define("page/ball/borball1",function($){
	var madeBall = $.require("comp/boreball/madeBalls"),
		freeFall = $.require("comp/boreball/movfun/freeCircle"),
		circle = $.require("comp/boreball/circle");
	
	var canvas = document.getElementById("canvas");
	if(!canvas.getContext){
		return;
	}
	var made = madeBall(canvas,canvas.width,canvas.height,freeFall,{
		startX:350,
		startY:50,
		
		pointX:320,
		pointY:240,
		radius:30,
		
		ballRadius:5
	});
	var range = $("#range");
	made.create(range.val());
	
	range.bind("change",function(){
		made.clear();
		$("#showNumber").html(this.value);
		made.create(this.value);
	})
	var oneCircle = circle(canvas,{
		x:320,
		y:240,
		color:"#818181",
		radius:32.5
	});
	oneCircle.draw();
	made.onDraw.push(function(){
		oneCircle.draw();
	})
})
