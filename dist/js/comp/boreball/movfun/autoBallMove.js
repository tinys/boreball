LIT.define("comp/boreball/movfun/autoBallMove",function(e){return function(e){var t={flag:-1,rate:0,lastDate:0,start:0},n={flag:1,lastDate:0,rate:0,start:0,maxRate:0},r={lastDate:0},i={x:0,y:0,heigh:0},s=392,o=function(e){var n=(e-t.lastDate)/1e3;return t.start+t.rate*n*t.flag},u=function(e){var t=(e-n.lastDate)/1e3;return n.flag>0?n.start+s*Math.pow(t,2)/2:n.start-n.rate*t+s*Math.pow(t,2)/2},a=function(e){var t=(e-n.lastDate)/1e3;n.flag>0?(n.rate=s*t,n.maxRate=Math.max(n.maxRate,n.rate)):n.rate=n.maxRate-s*t},f=function(i,s){r.lastDate||(r.lastDate=s);if(!c(e,i)){e.inBox=!1,n.flag=-1;var o=0;return e.x>=i.x&&(i.startAngle>0?t.flag=1:t.flag=-1,o=i.startAngle),e.x<i.x&&(i.endAngle>Math.PI?t.flag=1:t.flag=-1,o=i.endAngle),t.rate=Math.abs(Math.sin(o)*n.maxRate),n.rate=Math.abs(Math.cos(o)*n.maxRate),t.lastDate=s,n.lastDate=s,n.start=e.y,t.start=e.x,!1}var u=(s-r.lastDate)/1e3,a=Math.abs(i.endAngle-i.startAngle),f=a*Math.PI*i.radius/4;u==0&&(e.x>i.x?t.flag=-1:t.flag=1);var o=0;return t.flag>0?o=i.endAngle-n.maxRate*u/f*a:o=i.startAngle+n.maxRate*u/f*a,{x:i.x+Math.cos(o)*(i.radius-e.radius),y:i.y+Math.sin(o)*(i.radius-e.radius)}},l=e.param.circleList,c=function(e,t){var n=e.x-t.x,r=e.y-t.y,i=Math.sqrt(Math.pow(n,2)+Math.pow(r,2));if(i<=e.radius+t.radius){var s=0;if(r<0){s=Math.PI*2-Math.acos(n/i);var o=t.startAngle;o<0&&n>0&&(s=-Math.acos(n/i))}else s=Math.acos(n/i);if(s>=t.startAngle&&s<=t.endAngle)return!0}return!1};e.init=function(){t.start=e.param.startX,n.start=e.param.startY,i.x=e.param.startX,i.y=e.param.startY},e.mometion=function(h,p){p=p||Date.now(),t.lastDate||(t.lastDate=p,n.lastDate=p),e.inBox||l.forEach(function(t,o){if(c(e,t))return e.inBox=t,r.lastDate=p,n.maxRate=s*Math.sqrt(Math.abs(i.y-e.y-e.radius)*2/s),!1});if(e.inBox){var d=f(e.inBox,p);if(d)return d}else a(p);var v=o(p),m=u(p);return{x:v,y:m}},e.isStop=function(){return e.x<0||e.x>e.canvas.width||e.y<0&&e.y>e.canvas.height}}})