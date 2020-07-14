(function($){if(!$)return;
//document.domain = 'qq.com';
var doc  = document,port='',win  = window,_loc = location;
/*
* 公共部分
*
*/
	
	// 模拟commonJS require
	var require=function(module){
		var exports={};
		module=require.modules[module]||undefined;
		typeof module=='function'&&module.call(exports,exports);
		return exports;
	}
	
	
	require.modules={};

	require.registar=function(module,fn){
		module&&fn&&(require.modules[module]=fn);
	}
	
	// 浏览器判断
	var userAgent = navigator.userAgent.toString().toLowerCase();
	$.browser = {
		tt  : /tencenttraveler|qqbrowser/i.test( userAgent ),
		ie6 : !-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent),
		ie7 : /msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (document.documentMode == 7),
		ie8 : /msie.[8]\.0/i.test(userAgent) || (document.documentMode == 8),
		ie67 : ((!-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent)) || (/msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (document.documentMode == 7))),
		ie78 : /msie.[7|8]\.0/i.test(userAgent),
		ie678: !$.support.leadingWhitespace,
		ie9 : /msie.[7|9]\.0/i.test(userAgent) && /mozilla\/[4|5]\.0/i.test(userAgent) && /trident\/5\.0/i.test(userAgent) || (document.documentMode == 9),
		safari: /webkit/i.test( userAgent ), 
		chrome: /chrome/i.test(userAgent) && /mozilla/i.test(userAgent) ,
		msie  : /msie/i.test(userAgent) && !/opera/.test(userAgent),
		ff:  /.*(firefox)\/([\w.]+).*/i.test(userAgent)
	};
	
	// 事件停止响应
	$.stopEvent=function(event){
		if(event){
			(event && event.stopPropagation) ? event.stopPropagation() : (event.cancelBubble = true);
			(event && event.preventDefault) ? event.preventDefault() : (event.returnValue = false);
		}
	}
	//  事件订阅
	var eventSubscribeBox={};
	function eventSubscribe(type,fn){
		eventSubscribeBox[type]=eventSubscribeBox[type]||[];
		eventSubscribeBox[type].push(fn);				
	}
	function eventSpeaker(type,evt){
		var box=eventSubscribeBox[type];
		if(box){
			var i=box.length;
			while(i){
				i--;
				box[i](evt)
			}
		}
	}

	// 顶部搜索
	require.registar('topSearch',function(exports){
		var module,data,index,input,form,rsBox,placeholder,loaded;
		var serial_py_json='//js.data.auto.qq.com/car_public/template/serial_py.js';
		var ie6789=$.browser.ie678||$.browser.ie9;
		
		function insertData(){
			if(window._autoapp_site_serial_py_json){
				data=_autoapp_site_serial_py_json;
				rsBox.html(get(null)||"<span>\u65e0\u76f8\u5173\u63a8\u8350</span>");
				loaded=true;
			}
		}
		function blur(){
			var val=input.val();
			rsBox.hide();
			input.css("color",val?"#333":"#a9a9a9").val(val||placeholder);
			$(document).unbind("click",blur)
		}
		
		function focus(){
			var position=input.position();
			var top=position.top+input.height()+2,left=position.left;
			rsBox.show();//.css({top:top,left:left})
			input.css("color","#333").val(input.val()==placeholder?"":input.val());
			$(document).bind("click",blur)
		}
		
		function keyup(e){
			var total=rsBox.find("li").length-1||0;
			var code=e.keyCode;
			if(code==13){input.closest('form').trigger('submit');return;};
			if(code==38||code==40){
				if(code==38){
					index--;
					if(index<0){index=total}						
				}else{
					index++;
					if(index>total){index=0}						
				}
				var selected=rsBox.find("li").eq(index).children('a');
				selected.closest('ul').find('.select').removeClass('select');
				selected.addClass("select");
				input.css("color","#333").val(selected.attr("title"));
			}else{
				index=-1;
				rsBox.html(get($.trim(this.value))||"<span>\u65e0\u76f8\u5173\u63a8\u8350</span>");
			}
			return false;
		}
		function submitOpen(){
				var value=$.trim(input.val()),url="";
				url=~index?rsBox.find("li").eq(index).children('a').attr("href"):value?("//cgi.data.auto.qq.com/php/search.php?fuzzy_search=1&keyword="+encodeURI(value)):"//data.auto.qq.com/";
				behaviorBoss({//搜索单独上报
					sKeyword : encodeURI(value),
					sUrl : escape(url),
					sOp :1
				})
				url&&window.open(url);	
				return false;	
		}
		function get(value){
			var rsData=[],count=0;					
			value&&(value=value.toLowerCase());
			for(var i=0,len=data.length;i<len;i+=1){
				var item=data[i];
				if(!value||(typeof item["n"] =="string"&&item["n"].indexOf(value)+1)||(typeof item["p"]=="string"&&item["p"].indexOf(value)+1)){
					rsData.push('<li><a href="//data.auto.qq.com/car_serial/'+item.i+'" target="_blank" title="'+item.n+'" id="'+item.i+'">'+item.n+'<span class="acronym">'+item.s.toUpperCase()+'</span></a></li>');
					count++;
					if(count==10)break;
				}
			}
			rsData.length&&(rsData=new Array('<ul>').concat(rsData),rsData.push('</ul>'));
			return rsData.join("");
		}
		function behaviorBoss(options){
			var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
            var iQQ = (a == null ? "" : unescape(a[2]));
			var defaluts = {
				sBiz:1,
				iQQ: iQQ,
				sLocalUrl: escape(location.href)
			};
			var opts = $.extend({},defaluts, options);
			var param = '';
			$.each(opts,function(k,v){
				param += '&'+k+'='+v
			})
			var iurl = '//btrace.qq.com/kvcollect?BossId=3827&Pwd=1690839746'+param+ '&_=' + Math.random();
			var gImage = new Image(1, 1);
			gImage.src = iurl;
		}
		
		exports.init=function(id){
			module="autoComplete_"+Math.random();
			data=[];
			index=-1;
			input=$(id);
			form=input.closest("form");
			rsBox=$('<div style="position:absolute;display:none;" class="autoComplete results_list" />').appendTo(input.parent());
			placeholder=input.attr("placeholder");
			input.attr("placeholder","");
			loaded=false;
			var val=input.val();
			input.css("color","#a9a9a9").val(val||placeholder);

			input.css('outline','none').siblings('.search_car_btn').unbind().bind('click',submitOpen);
			form.bind('submit',submitOpen);
			
			eventSubscribe("click",function(active){
				if(active!=module)blur();
			});
			
			input.keyup(keyup).focus(focus).click(function(e){
				$.stopEvent(e);
				eventSpeaker("click",module);					
				!loaded&&$.getScript(serial_py_json,insertData);
			})
			
			rsBox.undelegate('a','click').delegate('a','click',function(){
				var _this = $(this);
				behaviorBoss({//搜索单独上报
					sKeyword : encodeURI($.trim(input.val())),
					sUrl : escape(_this.attr('href')),
					sOp :2,
					serialId : _this.attr('id')
				})
			})
		
		}
	});
	
	
	// 
	$(function(){
		$('.search_ipt').length && require('topSearch').init('.search_ipt'); //顶部搜索
	}())
	
})(window.jQuery)/*  |xGv00|183aab3350c7aa65134a42fda95f6f46 */