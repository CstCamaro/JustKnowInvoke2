/***ip定向保存空间**/
var citys = {};
citys.cityID = '',
citys.ipUrl = "//fw.qq.com/ipaddress";
citys.exist = false;
citys.list = [
	{
		name:"北京",
		cn:"beijing",
		cityId:54
	},{
		name:"沈阳",
		cn:"shenyang",
		cityId:262
	},{
		name:"南京",
		cn:"nanjing",
		cityId:220
	},{
		name:"杭州",
		cn:"hangzhou",
		cityId:395
	},{
		name:"上海",
		cn:"shanghai",
		cityId:321
	},{
		name:"福州",
		cn:"fuzhou",
		cityId:56
	},{
		name:"广州",
		cn:"guangzhou",
		cityId:68
	},{
		name:"武汉",
		cn:"wuhan",
		cityId:173
	},{
		name:"长沙",
		cn:"changsha",
		cityId:179
	},{
		name:"成都",
		cn:"chengdu",
		cityId:302
	},{
		name:"重庆",
		cn:"chongqing",
		cityId:55
	},{
		name:"西安",
		cn:"xian",
		cityId:296
	},{
		name:"郑州",
		cn:"zhengzhou",
		cityId:161
	},{
		name:"济南",
		cn:"jinan",
		cityId:337
	},
	{
		name:"大连",
		cn:"dalian",
		cityId:254
	},
	{
		name:"东莞",
		cn:"dongguan",
		cityId:66
	},
	{
		name:"佛山",
		cn:"foshan",
		cityId:67
	},
	{
		name:"合肥",
		cn:"hefei",
		cityId:46
	},
	{
		name:"昆明",
		cn:"kunming",
		cityId:385
	},
	{
		name:"南昌",
		cn:"nanchang",
		cityId:235
	},
	{
		name:"青岛",
		cn:"qingdao",
		cityId:342
	},
	{
		name:"深圳",
		cn:"shenzhen",
		cityId:78
	},
	{
		name:"石家庄",
		cn:"shijiazhuang",
		cityId:200
	},
	{
		name:"太原",
		cn:"taiyuan",
		cityId:328
	},
	{
		name:"厦门",
		cn:"xiamen",
		cityId:63
	},
	{
		name:"贵阳",
		cn:"guiyang",
		cityId:102
	},
	{
		name:"宁波",
		cn:"ningbo",
		cityId:400
	},
	{
		name:"中山",
		cn:"zhongshan",
		cityId:82
	},
	{
		name:"珠海",
		cn:"zhuhai",
		cityId:85
	},
	{
		name:"湛江",
		cn:"zhanjiang",
		cityId:84
	},
	{
		name:"江门",
		cn:"jiangmen",
		cityId:72
	},
	{
		name:"惠州",
		cn:"huizhou",
		cityId:69
	},
	{
		name:"宜昌",
		cn:"yichang",
		cityId:178
	},
	{
		name:"南宁",
		cn:"nanning",
		cityId:96
	},
	{
		name:"金华",
		cn:"jinhua",
		cityId:398
	},
	{
		name:"湖州",
		cn:"huzhou",
		cityId:396
	},
	{
		name:"温州",
		cn:"wenzhou",
		cityId:404
	},
	{
		name:"嘉兴",
		cn:"jiaxing",
		cityId:397
	},
	{
		name:"绍兴",
		cn:"shaoxing",
		cityId:402
	},
	{
		name:"台州",
		cn:"taizhou",
		cityId:403
	},
	{
		name:"保定",
		cn:"baoding",
		cityId:193
	},
	{
		name:"邢台",
		cn:"xingtai",
		cityId:202
	},
	{
		name:"泸州",
		cn:"luzhou",
		cityId:310
	},
	{
		name:"秦皇岛",
		cn:"qinhuangdao",
		cityId:199
	},
	{
		name:"孝感",
		cn:"xiaogan",
		cityId:175
	},
	{
		name:"唐山",
		cn:"tangshan",
		cityId:201
	},
	{
		name:"绵阳",
		cn:"mianyang",
		cityId:312
	},
	{
		name:"茂名",
		cn:"maoming",
		cityId:73
	},
	{
		name:"阳江",
		cn:"yangjiang",
		cityId:80
	},
	{
		name:"南通",
		cn:"nantong",
		cityId:221
	},
	{
		name:"苏州",
		cn:"suzhou",
		cityId:222
	},
	{
		name:"徐州",
		cn:"xuzhou",
		cityId:226
	},
	{
		name:"无锡",
		cn:"wuxi",
		cityId:225
	},
	{
		name:"常州",
		cn:"changzhou",
		cityId:217
	},
	{
		name:"镇江",
		cn:"zhenjiang",
		cityId:229
	},
	{
		name:"天津",
		cn:"tianjin",
		cityId:350
	},
	{
		name:"衡水",
		cn:"hengshui",
		cityId:196
	},
	{
		name:"十堰",
		cn:"shiyan",
		cityId:169
	},
	{
		name:"沧州",
		cn:"cangzhou",
		cityId:195
	},
	{
		name:"盐城",
		cn:"yancheng",
		cityId:227
	},
	{
		name:"邯郸",
		cn:"handan",
		cityId:197
	},
	{
		name:"泉州",
		cn:"quanzhou",
		cityId:61
	},
	{
		name:"南充",
		cn:"nanchong",
		cityId:313
	},
	{
		name:"淮安",
		cn:"huaian",
		cityId:218
	},
	{
		name:"扬州",
		cn:"yangzhou",
		cityId:228
	},
	{
		name:"泰州",
		cn:"tz",
		cityId:224
	},
	{
		name:"蚌埠",
		cn:"bengbu",
		cityId:38
	},
	{
		name:"芜湖",
		cn:"wuhu",
		cityId:51
	},
	{
		name:"南阳",
		cn:"nanyang",
		cityId:151
	},
	{
		name:"衡阳",
		cn:"hengyang",
		cityId:183
	},
	{
		name:"承德",
		cn:"chengde",
		cityId:194
	},
	{
		name:"黄山",
		cn:"huangshan",
		cityId:453
	},
	{
		name:"大理",
		cn:"dali",
		cityId:381
	},
	{
		name:"岳阳",
		cn:"yueyang",
		cityId:1474
	},
	{
		name:"曲靖",
		cn:"qujing",
		cityId:390
	},
	{
		name:"洛阳",
		cn:"luoyang",
		cityId:149
	},
	{
		name:"济南",
		cn:"jinan",
		cityId:337
	},
	{
		name:"兰州",
		cn:"lanzhou",
		cityId:115
	},
	{
		name:"海口",
		cn:"haikou",
		cityId:130
	},
	{
		name:"乌鲁木齐",
		cn:"wlmq",
		cityId:369
	},
	{
		name:"济宁",
		cn:"jining",
		cityId:338
	},
	{
		name:"襄阳",
		cn:"xiangyang",
		cityId:174
	},
	{
		name:"淄博",
		cn:"zibo",
		cityId:349
	},
	{
		name:"潍坊",
		cn:"weifang",
		cityId:346
	},
	{
		name:"淮北",
		cn:"huaibei",
		cityId:44
	},
	{
		name:"菏泽",
		cn:"heze",
		cityId:336
	},
	{
		name:"咸宁",
		cn:"xianning",
		cityId:176
	},
	{
		name:"韶关",
		cn:"shaoguan",
		cityId:77
	},
	{
		name:"西宁",
		cn:"xining",
		cityId:288
	},
	{
		name:"临沂",
		cn:"linyi",
		cityId:341
	},
	{
		name:"阜阳",
		cn:"fuyang",
		cityId:42
	},
	{
		name:"伊宁",
		cn:"yining",
		cityId:369
	},
	{
		name:"马鞍山",
		cn:"mas",
		cityId:48
	},{
		name:"哈尔滨",
		cn:"haerbin",
		cityId:208
	},{
		name:"吉林",
		cn:"jilin",
		cityId:244
	},{
		name:"德州",
		cn:"dezhou",
		cityId:334
	},{
		name:"烟台",
		cn:"yantai",
		cityId:347
	},{
		name:"长春",
		cn:"changchun",
		cityId:243
	},{
		name:"安庆",
		cn:"anqing",
		cityId:36
	},{
		name:"哈密",
		cn:"hami",
		cityId:359
	},{
		name:"宣城",
		cn:"xuancheng",
		cityId:52
	},{
		name:"宜宾",
		cn:"yibin",
		cityId:318
	},{
		name:"泰安",
		cn:"taian",
		cityId:344
	},{
		name:"聊城",
		cn:"liaocheng",
		cityId:340
	},{
		name:"临沂",
		cn:"linyi",
		cityId:341
	},{
		name:"泰州",
		cn:"tz",
		cityId:224
	},{
		name:"湘潭",
		cn:"xiangtan",
		cityId:186
	},{
		name:"内江",
		cn:"neijiang",
		cityId:314
	},{
		name:"德阳",
		cn:"deyang",
		cityId:304
	},{
		name:"乐山",
		cn:"leshan",
		cityId:308
	},{
		name:"松原",
		cn:"songyuan",
		cityId:246
	},{
		name:"四平",
		cn:"siping",
		cityId:247
	},{
		name:"延边",
		cn:"yanji",
		cityId:249
	},{
		name:"赣州",
		cn:"ganzhou",
		cityId:231
	},{
		name:"运城",
		cn:"yuncheng",
		cityId:331
	},{
		name:"珠海",
		cn:"zhuhai",
		cityId:85
	},{
		name:"资阳",
		cn:"ziyang",
		cityId:319
	},{
		name:"广安",
		cn:"guangan",
		cityId:306
	},{
		name:"六安",
		cn:"luan",
		cityId:47
	},{
		name:"连云港",
		cn:"lyg",
		cityId:219
	},{
		name:"肇庆",
		cn:"zhaoqing",
		cityId:83
	},{
		name:"周口",
		cn:"zhoukou",
		cityId:159
	},{
		name:"百色",
		cn:"baise",
		cityId:87
	},{
		name:"梧州",
		cn:"wuzhou",
		cityId:98
	}
];
citys.curCity = {
	name:'全国',
	cn:''
};

//IP地址定位
function fixPosition(){
	$.ajax({
		type:'GET',
		url:citys.ipUrl,
		scriptCharset:'gb2312',
		dataType:'script',
		success:function(){
			//console.log(IPData);
			var tem = IPData,add = '',href ='',area ='',cityId = '0',cn = '';
			if( $.trim(tem[3]).length == 0 ){
				add = ($.trim(tem[2])).replace(/市|区|省/,"");
			}else{
				add = ($.trim(tem[3])).replace(/市|区|省/,"");
			}
			for(var i = 0; i<citys.list.length ;i++){
				if(citys.list[i].name == add){
					area = citys.list[i].cn;
					cityId = citys.list[i].cityId;
					cn = citys.list.cn;
				}
			}
			//襄樊改名襄阳
			if((IPData[2].split("省")[0] == '湖北') && (IPData[3].split("市")[0] == '襄樊')){
				area = "xiangyang";
				add = "襄阳";
				cn = "xiangyang";
				cityId = 174;
			}
			//定位为大理州修复
			if((IPData[2].split("省")[0] == '云南') && (IPData[3].split("州")[0] == '大理')){
				area = "dali";
				add = "大理";
				cn = "dali";
				cityId = 381;
			}
			//泉州定位是泉市
			if((IPData[2].split("省")[0] == '福建') && (IPData[3].split("市")[0] == '泉')){
				area = "quanzhou";
				add = "泉州";
				cn = "quanzhou";
				cityId = 61;
			}

			//泉州定位是泉市
			if((IPData[2].split("省")[0] == '新疆') && (IPData[3].split("地区")[0] == '哈密')){
				area = "hami";
				add = "哈密";
				cn = "hami";
				cityId = 359;
			}
			
			//延边定位是延边州
			if((IPData[2].split("省")[0] == '吉林') && (IPData[3].split("州")[0] == '延边')){
				area = "yanji";
				add = "延边";
				cn = "yanji";
				cityId = 249;
			}
			
			//citys.getIpInfo(citys.getUrl('all','',cityId),cn);
			href = 'http://' + area +'.auto.qq.com/';
			$('#position').html(add).parent().attr('href',href);
			/*
			if( !!area.length){
				//拉取对应城市的行情、降价、报价信息
				$("#cityHQ").html(add);
				$("#cityJJ").html(add);
				$("#cityBJ").html(add);
				citys.getbjpage(cityId);
				citys.getjjpage(citys.getUrl('jj','',cityId));
			}else{
				//拉取北京站的信息
			}
			*/
		}
	});
};
fixPosition();


function getBtraceUrl(param) {
    var url = 'http://btrace.qq.com/kvcollect?BossId=3827&Pwd=1690839746';
    var tempParam = '',
        tempArr = [];
    try{
    	for (var key in param) {
	      tempArr.push(key + '=' + param[key])
	    }
    }catch(err){
    	console.log('param参数有问题，请检查。'+err);
    }
    tempParam = tempArr.join("&");
	//console.log('tempParam',tempParam)
    if(tempParam){
    	return url + '&' + tempParam +'&'+Math.random();
    }else{
    	return url;
    }
}

function btraceDo(param){
	var iurl = getBtraceUrl(param);
	var gImage = new Image(1,1);
		gImage.src = iurl;
}



/*===============================auto.dev.js=================================*/
/*
 * jQuery Cookie Plugin v1.3.1
 */
/*===============================auto.dev.js=================================*/
;(function(e,f,b){var d=/\+/g;function g(j){return j}function h(j){return c(unescape(j.replace(d," ")))}function c(j){if(j.indexOf('"')===0){j=j.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}return j}function i(j){return a.json?JSON.parse(j):j}var a=e.cookie=function(r,q,w){if(q!==b){w=e.extend({},a.defaults,w);if(q===null){w.expires=-1}if(typeof w.expires==="number"){var s=w.expires,v=w.expires=new Date();v.setDate(v.getDate()+s)}q=a.json?JSON.stringify(q):String(q);return(f.cookie=[escape(r),"=",a.raw?q:escape(q),w.expires?"; expires="+w.expires.toUTCString():"",w.path?"; path="+w.path:"",w.domain?"; domain="+w.domain:"",w.secure?"; secure":""].join(""))}var j=a.raw?g:h;var u=f.cookie.split("; ");var x=r?null:{};for(var p=0,n=u.length;p<n;p++){var o=u[p].split("=");var k=j(o.shift());var m=j(o.join("="));if(r&&r===k){x=i(m);break}if(!r){x[k]=i(m)}}return x};a.defaults={};e.removeCookie=function(k,j){if(e.cookie(k)!==null){e.cookie(k,null,j);return true}return false}})(jQuery,document);

;(function($) {
	document.domain = 'qq.com';
	var doc  = document,port='',win  = window,_loc = location;
	//公共部分
	// 模拟commonJS require
	var require=function(module){
		var exports={};
		module = require.modules[module]||undefined;
		typeof module == 'function' && module.call(exports,exports);
		return exports;
	}
	require.modules={};
	require.registar=function(module,fn){
		module && fn && (require.modules[module]=fn);
	};
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
	//事件停止响应
	$.stopEvent=function(event){
		if(event){
			(event && event.stopPropagation) ? event.stopPropagation() : (event.cancelBubble = true);
			(event && event.preventDefault) ? event.preventDefault() : (event.returnValue = false);
		}
	}
	//事件订阅
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
	//各个功能模块

	//顶部搜索
	require.registar('topSearch',function(exports){
		var module,data,index,input,form,rsBox,placeholder,loaded;
		var serial_py_json='//js.data.auto.qq.com/car_public/template/serial_py.js';
		var ie6789=$.browser.ie678||$.browser.ie9;
		function insertData(){
			if(window._autoapp_site_serial_py_json){
				data=_autoapp_site_serial_py_json;
				rsBox.html(get(null)||"<span>\u65e0\u76f8\u5173\u63a8\u8350</span>");
				$(document).on('click','.header-search li a',function(){
					$.stopEvent(event);
					var url = $(this).attr('_href');
					var value = $(this).text();
					var a=document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
					var iQQ=(a==null?"":unescape(a[2]));
					var param = {
						sIp:'',
						iQQ: iQQ,
						sBiz:1,
						sOp:2,
						sUrl:escape(url),
						sLocalUrl: escape(location.href),
						sKeyword: encodeURIComponent(value),
						sId:url.match(/\d/g).join('')
					}
					btraceDo(param);
					url&&window.open(url);
				});
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
			//console.log(code);
			if(code==13){$.stopEvent(e);submitOpen(e);return false;}
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
		function submitOpen(e){
				$.stopEvent(e);
				var value=$.trim(input.val()),url="";
				url=~index?rsBox.find("li").eq(index).children('a').attr("href"):value?("http://cgi.data.auto.qq.com/php/search.php?fuzzy_search=1&keyword="+encodeURI(value)):"http://data.auto.qq.com/";
				var param = {
					sIp:'',
					iQQ: '',
					sBiz:1,
					sOp:1,
					sUrl:url,
					sLocalUrl: location.href,
					sKeyword:encodeURIComponent(value),
					sId:''
				};
				btraceDo(param);
				//console.dir(param);
				url&&window.open(url);
				//return false;
		}
		function get(value){
			var rsData=[],count=0;					
			value&&(value=value.toLowerCase());
			for(var i=0,len=data.length;i<len;i+=1){
				var item=data[i];
				if(!value||(typeof item["n"] =="string"&&item["n"].indexOf(value)+1)||(typeof item["p"]=="string"&&item["p"].indexOf(value)+1)){
					rsData.push('<li><a _href="http://data.auto.qq.com/car_serial/'+item.i+'" title="'+item.n+'">'+item.n+'<span class="acronym">'+item.s.toUpperCase()+'</span></a></li>');
					count++;
					if(count==10)break;
				}
			}
			rsData.length&&(rsData=new Array('<ul>').concat(rsData),rsData.push('</ul>'));
			return rsData.join("");
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

			
			$('.search_car_btn').bind('click',submitOpen);
			input.css('outline','none').siblings('.search_car_btn').unbind().bind('click',submitOpen);
			
			
			eventSubscribe("click",function(active){
				if(active!=module)blur();
			});
			
			input.keyup(keyup).focus(focus).click(function(e){
				$.stopEvent(e);
				eventSpeaker("click",module);					

				!loaded&&$.getScript(serial_py_json,insertData);
			})
		}
	});
	
		
	$(function(){
		$('.search_ipt').length && require('topSearch').init('.search_ipt'); //顶部搜索
	});
})(jQuery);
/*  |xGv00|bd4c10764ebf65b2d750c026738718f7 */