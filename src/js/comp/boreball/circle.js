LIT.define("comp/boreball/circle",function($){
	return function(canvas,option){
		var options = {
			x:0,
			y:0,
			color:"red",
			radius:10,
			startAngle:0,
			endAngle:Math.PI*2
		}
		options = $.extend(options,option);
		
		var that = {
			draw:function(){
				var ctx = canvas.getContext("2d");
				ctx.beginPath();
				ctx.arc(options.x,options.y,options.radius,options.startAngle,options.endAngle,false);
				ctx.strokeStyle=options.color;
				ctx.lineWidth="1";
				ctx.stroke();
				ctx.closePath();
			}
		}
		$.extend(that,options);
		return that;
	}
})
