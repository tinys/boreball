/**
 * 依赖核心包
 * 
 * @autor dongyajie
 */
;(function($){
	// 核心包，依赖zepto 
	$.require("lib/zepto");
	$.require("core/LIT");
	
	var funUtils = $.require("core/functions")
	var shortDefine = {
		isFunction:funUtils.isFunction,
		nextFrame:funUtils.nextFrame
	};
	for(var i in shortDefine){
		$[i] = shortDefine[i];
	}
})(LIT);
