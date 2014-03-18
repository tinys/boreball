LIT.define("comp/boreball/circle",function($){
	return function(canvas,option){
		var options = {
			x:0,
			y:0,
			radius:10
		}
		options = $.extend(options,option);
		
		return {
			draw:function(){
				var ctx = canvas.getContext("2d");
				ctx.beginPath();
				ctx.arc(options.x,options.y,options.radius,0,Math.PI,false);
				ctx.strokeStyle="red";
				ctx.lineWidth="1";
				ctx.stroke();
				ctx.closePath();
			}
		}
	}
})
