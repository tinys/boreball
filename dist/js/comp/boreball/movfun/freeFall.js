LIT.define("comp/boreball/movfun/freeFall",function(e){var t=function(e){var t=588,n=e.param.height;e.init=function(){e.x=150,e.y=0};var r=!1,i=1;e.mometion=function(n,r){r=Math.abs(r)/1e3;var s=0;e.turningTime||(e.turningTime=0);var o=r-e.turningTime;return i>0?(s=t*Math.pow(o,2)/2,s>e.canvas.height&&(s=e.canvas.height,e.turningTime=r,e.maxRate=t*o,i=-1)):(s=e.canvas.height-(e.maxRate*o-t*Math.pow(o,2)/2),s<0&&(s=0,e.turningTime=r,i=1)),{x:150,y:s}},e.isStop=function(){return r}};return t})