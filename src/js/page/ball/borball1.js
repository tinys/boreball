

LIT.define("page/ball/borball1",function($){
	var madeBall = $.require("comp/boreball/madeBalls"),
		freeFall = $.require("comp/boreball/movfun/freeFall");
	
	var canvas = document.getElementById("canvas");
	if(!canvas.getContext){
		return;
	}
	var made = madeBall(canvas,canvas.width,canvas.height,freeFall);
	var range = $("#range");
	made.create(range.val());
	
	range.bind("change",function(){
		made.clear();
		$("#showNumber").html(this.value);
		made.create(this.value);
	})
})
