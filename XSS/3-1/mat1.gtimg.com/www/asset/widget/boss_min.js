/** 
 author:curls
 time:2014-04-21 16:41:31 
*/
define("widget/boss_min",function(a){var b=a("ui"),c={bossFun:function(a,b){var c=document.cookie.match(new RegExp("(^|)o_cookie=([^;]*)(;|$)")),d=null==c?"":unescape(c[2]),e="http://btrace.qq.com/collect?sIp=&iQQ="+d+"&sBiz="+(arguments[2]?arguments[2]:"")+"&sOp="+b+"&iSta=&iTy="+a+"&iFlow=&sUrl="+escape(location.href)+"&iBak=&sBak=&ran="+Math.random(),f=new Image(1,1);f.src=e},Exposure:function(a,d,e){b.addEvent(window,"load",function(){c.ExposureFun(a,d,e)})},ExposureFun:function(a,d,e){var f=b.getY(a),g=b.windowHeight();g>f?(a.show=!0,c.bossFun(1604,d,e)):b.addEvent(window,"scroll",function(){var h=b.scrollY();h>f-g+50&&!a.show&&(a.show=!0,c.bossFun(1604,d,e))})}};return c});/*  |xGv00|3daf54ea132e2817ffe3113a30653d49 */