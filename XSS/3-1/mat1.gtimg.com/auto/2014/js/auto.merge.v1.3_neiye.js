/*============================auto.js=================================*/
typeof $ === 'undefined' && typeof jQuery !== 'undefined' && ($=jQuery);
/**
 * ip定向保存空间
 **/
var citys = {};

citys.ipUrl = "http://fw.qq.com:80/ipaddress";
citys.exist = false;
citys.list = [
	{
		name:"北京",
		cn:"beijing",
		url:"http://auto.qq.com/buycar/homemarket/hq_beijing/hangqingtop10.htm"
	},{
		name:"沈阳",
		cn:"shenyang",
		url:"http://auto.qq.com/buycar/homemarket/hq_liaoning/hq_shenyang/hangqingtop10.htm"	
	},{
		name:"南京",
		cn:"nanjing",
		url:"http://auto.qq.com/buycar/homemarket/hq_jiangsu/hq_nanjing/hangqingtop10.htm"	
	},{
		name:"杭州",
		cn:"hangzhou",
		url:"http://auto.qq.com/buycar/homemarket/hq_zhejiang/hq_hangzhou/hangqingtop10.htm"	
	},{
		name:"上海",
		cn:"shanghai",
		url:"http://auto.qq.com/buycar/homemarket/hq_shanghai/hangqingtop10.htm"	
	},{
		name:"福州",
		cn:"fuzhou",
		url:"http://auto.qq.com/buycar/homemarket/hq_fujian/hq_fuzhou/hangqingtop10.htm"	
	},{
		name:"广州",
		cn:"guangzhou",
		url:"http://auto.qq.com/buycar/homemarket/hq_guangdong/hq_guangzhou/hangqingtop10.htm"	
	},{
		name:"武汉",
		cn:"wuhan",
		url:"http://auto.qq.com/buycar/homemarket/hq_hubei/hq_wuhan/hangqingtop10.htm"	
	},{
		name:"长沙",
		cn:"changsha",
		url:"http://auto.qq.com/buycar/homemarket/hq_hunan/hq_changsha/hangqingtop10.htm"	
	},{
		name:"成都",
		cn:"chengdu",
		url:"http://auto.qq.com/buycar/homemarket/hq_sichuan/hq_chengdu/hangqingtop10.htm"	
	},{
		name:"重庆",
		cn:"chongqing",
		url:"http://auto.qq.com/buycar/homemarket/hq_chongqing/hangqingtop10.htm"	
	},{
		name:"西安",
		cn:"xian",
		url:"http://auto.qq.com/buycar/homemarket/hq_shanxi/hq_xian/hangqingtop10.htm"	
	},{
		name:"郑州",
		cn:"zhengzhou",
		url:"http://auto.qq.com/buycar/homemarket/hq_henan/hq_zhengzhou/hangqingtop10.htm"	
	}
];


/**
 * 隐藏面板
 **/
function TPanel(ops) {
	this.btn = ops.btn;
	this.panel = ops.panel;
	this.event = ops.event || "click";
	this.timer = null;
	this.delay = ops.delay || 4000;
	this.open = false;
	this.effect = ops.effect || false;
	this.init();
}
TPanel.prototype = {
	init: function () {
		var _this = this;
		this.btn.on(this.event, function (e) {
	
			_this.toggle();

			
			if (e && e.stopPropagation) {
				e.stopPropagation();
			} else {
				window.event.cancelBubble = true;
			}
				
			return false;
		});

		if (_this.effect) {
			
			$("body").on("click", function (){
			
				_this.hide_pan();
			});
		}
	},
	show_pan: function(){
		this.btn.find("em:not(.up)").addClass("up");
		this.panel.is(':hidden') && this.panel.show();
	},
	hide_pan: function () {
		this.btn.find("em").removeClass("up");
		!this.panel.is(":hidden") && this.panel.hide();
	},
	clear: function(){
		(this.timer) && clearTimeout(this.timer);
		this.btn.find("em.up").removeClass("up");
	},
	set: function(){
		var _this = this;
		this.timer = setTimeout(function () {
			_this.toggle();
		}, _this.delay);
	},
	down_pan: function () {
		this.btn.find("em").addClass("up");
		this.panel.slideDown();
	},
	toggle: function () {
		this.btn.find("em").toggleClass("up");
		if (this.effect) {
			this.panel.toggle();
		} else {
			this.panel.slideToggle();
		}
	}
};

/*头部隐藏面板*/
var top_panel = new TPanel({
	btn: $("#control_panel_btn"),
	panel: $("#hide_panel")
});

var top_city = new TPanel({
	btn: $("#top_city_btn"),
	panel: $("#top_select_city"),
	delay: 1500,
	effect: true
});

$.getScript(citys.ipUrl, function(){
//	var IPData = new Array("113.141.119.105","","陕西省","安阳市");
	if(!$("#control_panel_btn").length){return;}
	var flag = true;
	$(citys.list).each(function (i,e) {
		if ((IPData[3] == '' && IPData[2].split("市")[0] == e.name) || (IPData[3]!=''&&IPData[3].split("市")[0] == e.name)) {
			flag = false;
			citys.exist = true;
			$.ajax({
				url: e.url,
				dataType: "html",
				success: function (html) {
					$("#control_panel_btn").attr("bosszone",e.cn+"auto");
					$("#control_panel_btn").find("span").html(e.name);
					$("#hide_panel_middle").empty().append(html);
					$("#slt1").show();
					$("#slt2").show();
					$("#control_panel_href").attr('href','http://'+e.cn+'.auto.qq.com');
				}
			});
			$.ajax({
				url: "http://auto.qq.com/index_inc/2014/" + e.cn + "auto/hq_x.htm",
				dataType: "html",
				success: function (html) {
					$("#hide_panel_left").empty().append(html);
				}
			});
			$.ajax({
				url: "http://auto.qq.com/index_inc/2014/" + e.cn + "auto/hq_z.htm",
				dataType: "html",
				success: function (html) {
					$("#hide_panel_right").empty().append(html);
				}
			});
			top_panel.down_pan();
		}
	});
	if(flag){
		$('#slt1').hide();
		$('#slt2').show();
	}
	if (citys.exist) {top_panel.set();}
});


var hot_car_num = 0;

$.ajax({
	url:"http://i.match.qq.com/auto/hotserial",
	dataType:"jsonp",
	success: function (d){
		if (d.code == 0 && d.num > 0) {
			//$("#hot_cars").empty();
			$("#hot_cars").find("ul:not(.first)").remove();
			
			for (var i=0; i<24; i++) {
				if (hot_car_num >= 16) {return }
				var flag = 0;
				if ((hot_car_num%8 == 0 && i == 0) || (hot_car_num%8 == 0 && i >= 8))  {
					var oUl = $('<ul></ul>');
					$("#hot_cars").append(oUl);
				}
				
				$("#hot_cars").find("ul.first li a").each(function () {
					if ($(this).attr("sid") == d.serials[i].id) {
						flag = 1;
					}
				});
				if (!flag) {
					hot_car_num++;
					var oLi = $('<li><a target="_blank" href="http://data.auto.qq.com/car_serial/'+d.serials[i].id+'/index.shtml?alg=at">'+d.serials[i].name+'</a></li>');
					oUl.append(oLi);
				}
			}

			if ($("#hot_cars").find("ul:not(.first)").eq(0).find("li").length == 0) {
				$("#hot_cars").find("ul:not(.first)").eq(0).remove();
			}
		}
	}
});


/**
 * 焦点图
 **/
function Foucs(ops) {
	this.cons = ops.cons;
	this.menus = ops.menus;
	this.btnL = ops.btnL || null;
	this.btnR = ops.btnR || null;
	this.event = ops.event || "mouseover";
	this.cls = ops.cls || "active";
	this.cur = 0;
	this.timer = null;
	this.delay = ops.delay || 4000;
	this.init();
}
Foucs.prototype = {
	init: function () {
		var _this = this;
		this.menus.each(function (i) {
			$(this).on(_this.event, function () {
				_this.clear();
				_this.cur = i;
				_this.change(i);
			});
		});
		
		this.cons.on("mouseover", function () {
			_this.clear();
		}).on("mouseout", function () {
			_this.set();
		});

		if (this.btnL) {
			this.btnL.on("mouseover", function () {
				_this.clear();
			}).on("mouseout", function () {
				_this.set();
			}).on("click", function () {
				_this.cur--;
				if (_this.cur < 0) {
					_this.cur = _this.menus.length-1;
				}
				_this.change(_this.cur);
			});
		}

		if (this.btnR) {
			this.btnR.on("mouseover", function () {
				_this.clear();
			}).on("mouseout", function () {
				_this.set();
			}).on("click", function () {
				_this.cur++;
				if (_this.cur >= _this.menus.length) {
					_this.cur = 0;
				}
				_this.change(_this.cur);
			});
		}
		
		this.set();
	},
	clear: function () {
		if (this.timer) {clearInterval(this.timer);}
	},
	set: function () {
		var _this = this;
		this.clear();
		this.timer = setInterval(function () {
			_this.cur = (_this.cur+1)%_this.cons.length;
			_this.change(_this.cur);
		}, this.delay);
	},
	change: function (index) {
		var _this = this;
		
		this.menus.removeClass(this.cls).eq(index).addClass(this.cls);
		this.cons.eq(index).hide().css({
			"z-index":3
		}).fadeIn("slow",function () {
			_this.cons.css({"z-index":1}).eq(index).css({"z-index":2});
			_this.changing = false;
		});
	}
};


/**
 * 页卡切换
 **/
function Tab(ops) {
	this.menus = ops.menus;
	this.cons = ops.cons;
	this.clsname = ops.clsname || "active";
	this.event = ops.event || "mouseover";
	this.cur = ops.cur || 0;
	this.lbtn = ops.lbtn || null;
	this.rbtn = ops.rbtn || null;
	
	this.init();
}
Tab.prototype = {
	init: function () {
		var _this = this;
		this.menus.each(function (i) {
			$(this).on(_this.event, function () {
				_this.cur = i;
				_this.change(_this.cur);
			});
		});

		if (this.lbtn) {
			this.lbtn.on("click", function () {
				_this.cur--;
				if (_this.cur < 0) {
					_this.cur = _this.menus.length -1;
				}
				_this.change(_this.cur);
			});
		}

		if (this.rbtn) {
			this.rbtn.on("click", function () {
				_this.cur++;
				if (_this.cur >= _this.menus.length) {
					_this.cur = 0;
				}
				_this.change(_this.cur);
			});
		}
		
		this.change(this.cur);
	},
	change: function (i) {
		this.menus.removeClass(this.clsname).eq(i).addClass(this.clsname);
		this.cons.hide().eq(i).show();
	}
}

/*有情链接*/
var links1 = new Tab({
	menus: $(".links_bot .menus a"),
	cons: $(".links_bot .cons")
});


/*历史回顾*/
var history_timer = null;
$("#hgIcon").on("mouseover",function () {
	if (history_timer) {clearTimeout(history_timer);}
	$(".datebar").show().attr("aria-disabled", "false").attr("aria-hidden", "false").attr("tabindex", "0");
}).on("keydown", function () {
	$(this).attr("aria-pressed", "true");
}).on("keyup", function () {
	$(this).attr("aria-pressed", "false");
}).on("mouseout", function () {
	history_timer = setTimeout(function () {
		$(".datebar").hide().attr("aria-disabled", "true").attr("aria-hidden", "true").attr("tabindex", "-1");
	}, 1500);
});

$(".datebar").on("mouseover", function () {
	if (history_timer) {clearTimeout(history_timer);}
		$(".datebar").show();
}).on("mouseout", function () {
	history_timer = setTimeout(function () {
		$(".datebar").hide();	
	}, 1000);
});

/*回到顶部*/
var ie6=!-[1,]&&!window.XMLHttpRequest;
$(window).scroll(function () {
	if ($(window).scrollTop() > $(window).height()) {
		$("#toTop").show();
		if (ie6) {
			$("#toTop").css({
				"position":"absolute",
				"top":$(window).scrollTop()+$(window).height()-100
			});
			
		}
	} else {
		$("#toTop").hide();
	}
});



/*===============================auto.dev.js=================================*/
/*
 * jQuery Cookie Plugin v1.3.1
 */
;(function(e,f,b){var d=/\+/g;function g(j){return j}function h(j){return c(unescape(j.replace(d," ")))}function c(j){if(j.indexOf('"')===0){j=j.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}return j}function i(j){return a.json?JSON.parse(j):j}var a=e.cookie=function(r,q,w){if(q!==b){w=e.extend({},a.defaults,w);if(q===null){w.expires=-1}if(typeof w.expires==="number"){var s=w.expires,v=w.expires=new Date();v.setDate(v.getDate()+s)}q=a.json?JSON.stringify(q):String(q);return(f.cookie=[escape(r),"=",a.raw?q:escape(q),w.expires?"; expires="+w.expires.toUTCString():"",w.path?"; path="+w.path:"",w.domain?"; domain="+w.domain:"",w.secure?"; secure":""].join(""))}var j=a.raw?g:h;var u=f.cookie.split("; ");var x=r?null:{};for(var p=0,n=u.length;p<n;p++){var o=u[p].split("=");var k=j(o.shift());var m=j(o.join("="));if(r&&r===k){x=i(m);break}if(!r){x[k]=i(m)}}return x};a.defaults={};e.removeCookie=function(k,j){if(e.cookie(k)!==null){e.cookie(k,null,j);return true}return false}})(jQuery,document);

(function($){if(!$)return;
document.domain = 'qq.com';
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

/*
* 各个功能模块
*
*/

	// 选车中心  selectCarCenter.js
	require.registar('selectCarCenter',function(exports){
		
		var configs={el:'#cp_xczx .select_search_box'};
		var getId=function(id){return document.getElementById(id||'')};
		configs.getApi=function(key,id){
			var api={
				'brand':'http://js.data.auto.qq.com/car_public/1/manufacturer_list_json.js',
				'serial':'http://js.data.auto.qq.com/car_manufacturer/'+id+'/serial_list_json.js',
				'serialDetail':'http://data.auto.qq.com/car_serial/'+id,
				'brandSearch':'http://cgi.data.auto.qq.com/php/search.php?manufacturer_id='+id
			}
			return api[key]||'';
		}
		
		

		function select(options){
			var aClass='subItemBtnActive';
			var selector=options.selector||'';
			var module='_'+Math.random();
			var el=$(selector);
			var btn=options.btn;
			var popBody=btn.siblings('div');
			
			function blur(){
				popBody.removeClass(aClass).hide();
				$(document.documentElement).unbind('click',blur);
			}
			function show(){
				popBody.addClass(aClass).show();
				$(document.documentElement).bind('click',blur);					
			}
			btn.bind('click',function(e){
				$.stopEvent(e);
				eventSpeaker('click',module);
				if(popBody.children('div').children('div').children().length){
					return popBody.hasClass(aClass)?blur():show();
				}
			});
			
			eventSubscribe('click',function(active){
				if(active!=module)blur();
			});
		}
		
		function subSelect(event,type){
			var option=$(event.target).closest('a');
			var inputBox=$(event.target).closest('.select_item').children('.xc_select_btn');
			var isBrand=!!$(event.target).closest('.brand').length;
			if(option.length){
				var val=option.attr('data-value')||'';
				var valArr=val.split(',');
				if(valArr.length==2){
					var valId=valArr[0],valName=valArr[1];
					inputBox.attr('data-value',val).children('span').text(valName);
					isBrand&&setTimeout(function(){getSerial(valId)},0);;
				}
			}
		
		}
		
		
		var getBrand= exports.getBrand=function(){		
			$.getScript(configs.getApi('brand'),parse);
			
			function parse(){
				var rs=new Array();
				if(window.oManufacturerData){
					var tmp={}
					$.each(oManufacturerData.arrManufacturer,function(index,item){
						var bLetter=item.FirstLetter;
						var sName=item.Name;
						!tmp[bLetter]&&(tmp[bLetter]=['<span class="">'+bLetter+'</span>']);
						tmp[bLetter].push('<a href="javascript:;" data-value="'+item.ID+','+sName+'">'+sName+'</a>');
					})
					for(var key in tmp)rs.push('<div class="pp_ops_item">'+(tmp[key].join('')||'')+'</div>');
					$(configs.el).find('.pp_ops_list').html(rs.join('')).bind('click',subSelect);
					
				}
			
			}
		
		}
		
		var getSerial=exports.getSerial=function(brandId){
			$.getScript(configs.getApi('serial',brandId),parse);
			
			function parse(){
			//debugger;
				var rs=new Array('<ul><li><a href="javascript:;" data-value="0,\u9009\u62e9\u8f66\u7cfb" >\u9009\u62e9\u8f66\u7cfb</a></li>')
				//console.log(configs.getApi('serial',brandId));
				if(window.oManufacturerSerialData){
					var tmp={}
					$.each(oManufacturerSerialData.arrSerial,function(index,item){
						var bName=item.BrandName;
						var sName=item.Name;
						!tmp[bName]&&(tmp[bName]=['<li><span>'+bName+'</span></li>']);
						tmp[bName].push('<li><a href="javascript:;" title="'+sName+'" data-value="'+item.ID+','+sName+'">'+sName+'</a></li>');
					})
					for(var key in tmp)rs.push(tmp[key].join('')||'');
					rs.push('</ul>')
					$(configs.el).find('.cx_ops_list').html(rs.join('')).unbind('click').bind('click',subSelect).find('a').first().trigger('click');				
				}
			
			}	
		}
		
		exports.submit=function(event){
			$.stopEvent(event);
			var brand=[],serial=[],url=''
			$(configs.el).find('.xc_select_btn').each(function(index,item){
				var value=$(item).attr('data-value')||'';
				if($(item).closest('.brand').length){
					brand=value.split(',');
				}else{				
					serial=value.split(',');
				}
			});
			if(brand.length!==2){alert('\u8bf7\u9009\u62e9\u54c1\u724c\u6216\u8f66\u7cfb');return }
				url=configs.getApi('brandSearch',brand[0]);
			if(+serial[0]){
				url=configs.getApi('serialDetail',serial[0]);
			}
			window.open(url);
		}
		
		exports.init=function(opts){
			$.extend(configs,opts);
			$('<style type="text/css">.pp_ops_win, .cx_ops_win{width:100%;*position:relative;}</style>').appendTo('body');
			this.getBrand();
			$(configs.el).find('.select_item').each(function(){
				select({selector:$(this),btn:$(this).find('.xc_select_btn').attr('data-value','')});
			});
			$(configs.el).find('.search_btn').bind('click',this.submit);
		}
	});
	
	$(function(){
		require('selectCarCenter').init(); //选车中心
		$('.search_ipt').length && $.getScript('http://mat1.gtimg.com/auto/2014/js/auto.dev.js'); //顶部搜索
	})
	
})(window.jQuery)/*  |xGv00|3bb8569910eb05367085612509f9f2e0 */