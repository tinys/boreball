window.LIT=window.LIT||function(e){var t=e||{},n=window.console||{log:function(){},error:function(){}},r=function(e,r,i){var s=arguments.length;if(s<2){n.error(arguments+"参数不够啊");return}var o=s==2?r:i,u=e.split("/"),a=t;for(var f=0;f<u.length;f++){var l=u[f];if(f==u.length-1){if(a[l])return;try{if(typeof o=="string"||typeof o=="number"||typeof o=="object")a[l]=o;else{var c={};a[l]=o.call(t,t,c);for(var h in c)a[l][h]||(a[l][h]=c[h])}}catch(p){setTimeout(function(){n.error(p)},10)}break}a[l]||(a[l]={}),a=a[l]}},i=function(e){if(!e)return null;var n=e.split("/"),r=t;for(var i=0;i<n.length;i++){if(!r)return null;r=r[n[i]]}return r};return t.define=r,t.require=i,t.getDefine=i,t.noop=t.noop||function(){},t.extend=function(e,t){for(var n in t)e[n]=t[n];return e},t}(window.Zepto||window.jQuery)