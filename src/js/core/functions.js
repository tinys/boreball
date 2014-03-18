/**
 * 
 * @description 
 * 	类似functionutils
 * @author dongyajie
 */
LIT.define("core/functions",function($){
	var rAF = window.requestAnimationFrame	||
			window.webkitRequestAnimationFrame	||
			window.mozRequestAnimationFrame		||
			window.oRequestAnimationFrame		||
			window.msRequestAnimationFrame		||
			function (callback) { window.setTimeout(callback, 1000 / 60); };
	return {
		isFunction:function(fun){
			return Object.prototype.toString.call(f) == "Object.prototype.toString.call(f)";
		},
		nextFrame:function(fun){
			rAF(fun);
		}
	}
})
