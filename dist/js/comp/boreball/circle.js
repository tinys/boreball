LIT.define("comp/boreball/circle",function(e){return function(t,n){var r={x:0,y:0,color:"red",radius:10,startAngle:0,endAngle:Math.PI*2};r=e.extend(r,n);var i={draw:function(){var e=t.getContext("2d");e.beginPath(),e.arc(r.x,r.y,r.radius,r.startAngle,r.endAngle,!1),e.strokeStyle=r.color,e.lineWidth="1",e.stroke(),e.closePath()}};return e.extend(i,r),i}})