function getBtraceUrl(param) {
    var url = '//btrace.qq.com/kvcollect?sBiz=index';
    var tempParam = '',
		tempArr = [],
		obj = {
			BossId:3827,
			Pwd:1690839746
		};
	//Object.assign(obj, param);
	$.extend(obj,param);
    try{
    	for (var key in obj) {
	      tempArr.push(key + '=' + obj[key])
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
//BOSS统计
var boss = (function(opt) {
	var LOOPTRY = 10;		
	opt = window.bossOpt? window.bossOpt : opt;
	var json = function(data){
		var o = {};
		if (data){
			try{
				o = eval('(' + data + ')');
			}catch(e){};
		}
		return o;
	};
	$(document.body).on('click', function(e) {
		var bossZone = '';
		for (var i = 0, tagNode = e.target; i < LOOPTRY; i++) {
			if (!!tagNode) {
				if (!!tagNode && !!tagNode.hasAttribute && tagNode.hasAttribute('ask_boss')) {
					bossZone = $(tagNode).attr('ask_boss');
					bossZone = json(bossZone);
					var _opt = $.extend({}, opt);
					_opt = $.extend(_opt, bossZone);
					btraceDo(_opt);
				}
				if (!!tagNode && !!tagNode.hasAttribute && tagNode.hasAttribute('boss')) {
					bossZone = $(tagNode).attr('boss');
					bossZone = json(bossZone);
					opt = $.extend(opt, bossZone);
					btraceDo(opt);
					break;
				}
				tagNode = tagNode.parentNode;
			}
		}

	});
})();
//懒加载图片
$.fn.picLazyLoad = function (settings) {
    var $this = $(this),
        _winScrollTop = $(window).scrollTop() || 0,
        _winHeight = $(window).height();
    settings = $.extend({
        threshold: 0, // 提前高度加载
        placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'
    }, settings || {});

    // 执行懒加载图片
    lazyLoadPic();

    // 滚动触发换图
    $(window).on('scroll', function () {
        _winScrollTop = $(window).scrollTop();
        lazyLoadPic();
    });

    // 懒加载图片
    function lazyLoadPic() {
        $this.each(function () {
            var $self = $(this);
            // 如果是img
            if ($self.is('img')) {
                if ($self.attr('data-original')) {
                    var _offsetTop = $self.offset().top;
                    if ((_offsetTop - settings.threshold) <= (_winHeight + _winScrollTop) && _offsetTop > _winScrollTop) {
                        $self.attr('src', $self.attr('data-original'));
                        $self.removeAttr('data-original');
                        $self.removeClass('lazyload');
                    }
                }
                // 如果是背景图
            } else {
                if ($self.attr('data-original')) {
                    // 默认占位图片
                    if ($self.css('background-image') == 'none') {
                        $self.css('background-image', 'url(' + settings.placeholder + ')');
                    }
                    var _offsetTop = $self.offset().top;
                    if ((_offsetTop - settings.threshold) <= (_winHeight + _winScrollTop)) {
                        $self.css('background-image', 'url(' + $self.attr('data-original') + ')');
                        $self.removeAttr('data-original');
                    }
                }
            }
        });
    }
}

//sha1
!function(){"use strict";function t(t){t?(f[0]=f[16]=f[1]=f[2]=f[3]=f[4]=f[5]=f[6]=f[7]=f[8]=f[9]=f[10]=f[11]=f[12]=f[13]=f[14]=f[15]=0,this.blocks=f):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}var h="object"==typeof window?window:{},s=!h.JS_SHA1_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;s&&(h=global);var i=!h.JS_SHA1_NO_COMMON_JS&&"object"==typeof module&&module.exports,e="function"==typeof define&&define.amd,r="0123456789abcdef".split(""),o=[-2147483648,8388608,32768,128],n=[24,16,8,0],a=["hex","array","digest","arrayBuffer"],f=[],u=function(h){return function(s){return new t(!0).update(s)[h]()}},c=function(){var h=u("hex");s&&(h=p(h)),h.create=function(){return new t},h.update=function(t){return h.create().update(t)};for(var i=0;i<a.length;++i){var e=a[i];h[e]=u(e)}return h},p=function(t){var h=eval("require('crypto')"),s=eval("require('buffer').Buffer"),i=function(i){if("string"==typeof i)return h.createHash("sha1").update(i,"utf8").digest("hex");if(i.constructor===ArrayBuffer)i=new Uint8Array(i);else if(void 0===i.length)return t(i);return h.createHash("sha1").update(new s(i)).digest("hex")};return i};t.prototype.update=function(t){if(!this.finalized){var s="string"!=typeof t;s&&t.constructor===h.ArrayBuffer&&(t=new Uint8Array(t));for(var i,e,r=0,o=t.length||0,a=this.blocks;r<o;){if(this.hashed&&(this.hashed=!1,a[0]=this.block,a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),s)for(e=this.start;r<o&&e<64;++r)a[e>>2]|=t[r]<<n[3&e++];else for(e=this.start;r<o&&e<64;++r)(i=t.charCodeAt(r))<128?a[e>>2]|=i<<n[3&e++]:i<2048?(a[e>>2]|=(192|i>>6)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):i<55296||i>=57344?(a[e>>2]|=(224|i>>12)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++r)),a[e>>2]|=(240|i>>18)<<n[3&e++],a[e>>2]|=(128|i>>12&63)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.block=a[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,h=this.lastByteIndex;t[16]=this.block,t[h>>2]|=o[3&h],this.block=t[16],h>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,h,s=this.h0,i=this.h1,e=this.h2,r=this.h3,o=this.h4,n=this.blocks;for(t=16;t<80;++t)h=n[t-3]^n[t-8]^n[t-14]^n[t-16],n[t]=h<<1|h>>>31;for(t=0;t<20;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i&e|~i&r)+o+1518500249+n[t]<<0)<<5|o>>>27)+(s&(i=i<<30|i>>>2)|~s&e)+r+1518500249+n[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|~o&i)+e+1518500249+n[t+2]<<0)<<5|e>>>27)+(r&(o=o<<30|o>>>2)|~r&s)+i+1518500249+n[t+3]<<0)<<5|i>>>27)+(e&(r=r<<30|r>>>2)|~e&o)+s+1518500249+n[t+4]<<0,e=e<<30|e>>>2;for(;t<40;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i^e^r)+o+1859775393+n[t]<<0)<<5|o>>>27)+(s^(i=i<<30|i>>>2)^e)+r+1859775393+n[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^i)+e+1859775393+n[t+2]<<0)<<5|e>>>27)+(r^(o=o<<30|o>>>2)^s)+i+1859775393+n[t+3]<<0)<<5|i>>>27)+(e^(r=r<<30|r>>>2)^o)+s+1859775393+n[t+4]<<0,e=e<<30|e>>>2;for(;t<60;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i&e|i&r|e&r)+o-1894007588+n[t]<<0)<<5|o>>>27)+(s&(i=i<<30|i>>>2)|s&e|i&e)+r-1894007588+n[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|o&i|s&i)+e-1894007588+n[t+2]<<0)<<5|e>>>27)+(r&(o=o<<30|o>>>2)|r&s|o&s)+i-1894007588+n[t+3]<<0)<<5|i>>>27)+(e&(r=r<<30|r>>>2)|e&o|r&o)+s-1894007588+n[t+4]<<0,e=e<<30|e>>>2;for(;t<80;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i^e^r)+o-899497514+n[t]<<0)<<5|o>>>27)+(s^(i=i<<30|i>>>2)^e)+r-899497514+n[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^i)+e-899497514+n[t+2]<<0)<<5|e>>>27)+(r^(o=o<<30|o>>>2)^s)+i-899497514+n[t+3]<<0)<<5|i>>>27)+(e^(r=r<<30|r>>>2)^o)+s-899497514+n[t+4]<<0,e=e<<30|e>>>2;this.h0=this.h0+s<<0,this.h1=this.h1+i<<0,this.h2=this.h2+e<<0,this.h3=this.h3+r<<0,this.h4=this.h4+o<<0},t.prototype.hex=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return r[t>>28&15]+r[t>>24&15]+r[t>>20&15]+r[t>>16&15]+r[t>>12&15]+r[t>>8&15]+r[t>>4&15]+r[15&t]+r[h>>28&15]+r[h>>24&15]+r[h>>20&15]+r[h>>16&15]+r[h>>12&15]+r[h>>8&15]+r[h>>4&15]+r[15&h]+r[s>>28&15]+r[s>>24&15]+r[s>>20&15]+r[s>>16&15]+r[s>>12&15]+r[s>>8&15]+r[s>>4&15]+r[15&s]+r[i>>28&15]+r[i>>24&15]+r[i>>20&15]+r[i>>16&15]+r[i>>12&15]+r[i>>8&15]+r[i>>4&15]+r[15&i]+r[e>>28&15]+r[e>>24&15]+r[e>>20&15]+r[e>>16&15]+r[e>>12&15]+r[e>>8&15]+r[e>>4&15]+r[15&e]},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return[t>>24&255,t>>16&255,t>>8&255,255&t,h>>24&255,h>>16&255,h>>8&255,255&h,s>>24&255,s>>16&255,s>>8&255,255&s,i>>24&255,i>>16&255,i>>8&255,255&i,e>>24&255,e>>16&255,e>>8&255,255&e]},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(20),h=new DataView(t);return h.setUint32(0,this.h0),h.setUint32(4,this.h1),h.setUint32(8,this.h2),h.setUint32(12,this.h3),h.setUint32(16,this.h4),t};var y=c();i?module.exports=y:(h.sha1=y,e&&define(function(){return y}))}();


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
    function ajaxFn(options,_success,_complete,_error) {
        //_data.version = "100";
        var _data = options.data;
        _data.salt = "t*e&n^c%e%n#t@a(u*t&o";
        _data._t = Date.parse(new Date()) / 1000;	
        options.dataType && options.dataType == 'jsonp' && options.jsonpCallback && (_data.callback = options.jsonpCallback);
        var _sign = sha1(objSortToArrJoinString(_data));
        _data.sign = _sign;
        _data.callback && (delete _data.callback);
        delete _data.salt;
        $.ajax({
            type: options.type.toUpperCase(), // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            url: options.url,
            data: options.contentType == 'application/json;charset=utf-8' ? JSON.stringify(_data) : _data,
            contentType: options.contentType ? options.contentType : "application/x-www-form-urlencoded",
            dataType: options.dataType?options.dataType:'json',
            jsonpCallback:options.dataType == 'jsonp' ? options.jsonpCallback : '',
            async: true, //请求是否异步
            cache:true,
            beforeSend: function(xhr, settings) {
                //console.log(xhr, settings);
                //beforeSend();
            },
            success: function(data, status, xhr) {
                _success(data);
            },
            complete: function(xhr, status) {
                //请求完成后回调函数 (请求成功或失败之后均调用)
                typeof _complete == 'function' && _complete();
                delete _data.sign;
            },
            error: function(xhr, errorType, error) {
                //console.log(xhr, errorType, error);
                _error(xhr, errorType, error);
            }
            
        });
        
    }
    /**
     * 对象转字符串
     */
    function objSortToArrJoinString (obj) {
        // salt: "t*e&n^c%e%n#t@a(u*t&o",
        // _t: Date.parse(new Date()) / 1000,
        var newkey = Object.keys(obj).sort();
        var newObj = {};
        var arr = [];
        var i = 0
        for (var j = 0; j < newkey.length; j++) {
            newObj[newkey[j]] = obj[newkey[j]];
        }
        for (var item in newObj) {
            arr[i] = item + '=' + newObj[item];
            i++;
        }
        //console.log(obj, arr.join('@'))
        return arr.join('@');
    }
	//各个功能模块
	//选车中心  selectCarCenter.js
	require.registar('selectCarCenter',function(exports){
		var configs = {
			el:"#chooseBox .chooseBox-content-search"
		};

		var getId = function(id){
			return document.getElmentById(id||'');
		}

		configs.getApi = function(key,id){
			var api = {
				'brand':'//js.data.auto.qq.com/car_public/1/manufacturer_list_json.js',
				'serial':'//js.data.auto.qq.com/car_manufacturer/'+id+'/serial_list_json.js',
				'models':'//js.data.auto.qq.com/car_serial/'+ id +'/model_list.js',
				'searcarByBrand':'//cgi.data.auto.qq.com/php/search.php?brand_id=' + id,
				'searBySerial':'//data.auto.qq.com/car_serial/'+ id +'/',
				'searByModel':'//data.auto.qq.com/car_models/' + id + '/',
				'searpriByBand':'//baojia.auto.qq.com/php/baojia_center.php?brandid=' + id,
				'searpriBySerial':'//api.ait.auto.qq.com/page/pc/enquiry?&serial_id=' + id + '&source_type=web_auto_index',
				'searpriByModel':'//api.ait.auto.qq.com/page/pc/enquiry?&model_id=' + id + '&source_type=web_auto_index'
			};
			return api[key]||'';
		}

		function select(options){
			var aClass = 'subItemBtnActive';
			var selector = options.selector || '';
			var module = '_' + Math.random();
			var el = $(selector);
			var btn = options.btn;
			var popBody = btn.siblings('div');

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
				if($(this).parent().hasClass('selectBox-band')){
					if(popBody.find('.pp_ops_item').length){
						return popBody.hasClass(aClass)?blur():show();
					}
				}else{
					if(popBody.find('ul li').length){
						return popBody.hasClass(aClass)?blur():show();
					}
				}
			});

			eventSubscribe('click',function(active){
				if(active != module) blur();
			});
		}


		function subSelect(event,type){
			var option= $(event.target).closest('a');
			var inputBox= $(event.target).closest('.items').children('.tips');
			var isBrand= !!$(event.target).closest('.selectBox-band').length;
			if(option.length){
				var val=option.attr('data-value')||'';
				var valArr=val.split(',');
				if(valArr.length==2){
					var valId=valArr[0],valName=valArr[1];
					inputBox.attr('data-value',val).children('span').addClass('checked').text(valName);
					isBrand&&setTimeout(function(){getSerial(valId)},0);
				}
			}
		}

		function subSelect1(event,type){
			var option = $(event.target).closest('a');
			var inputBox = $(event.target).closest('.items').children('.tips');
			var isSerial = !!$(event.target).parents().find('.selectBox-carx').length;
			if(option.length){
				var val=option.attr('data-value')||'';
				var valArr=val.split(',');
				if(valArr.length==2){
					var valId=valArr[0],valName=valArr[1];
					inputBox.attr('data-value',val).children('span').addClass('checked').text(valName);
					isSerial && setTimeout(function(){getModel(valId)},0);
				}
			}
		}

		var getBand = exports.getBand = function(){
			$.getScript(configs.getApi('brand'),parse);
			function parse(){
				var rs = new Array();
				var tmp={},temp="",tempL="",flag = 0,count=0;
				if(window.oManufacturerData){
					var bandlist = oManufacturerData.arrManufacturer;
					$.each(bandlist,function(index,item){

						if( tempL == '' ){
							if(flag == 0){
								temp +='<div class="pp_ops_item" id="' + bandlist[index].FirstLetter + '">';
								temp +='<span class="" id="'+ bandlist[index].FirstLetter +'">'+ bandlist[index].FirstLetter + '</span>';
							}

							tempL = bandlist[index].FirstLetter;

						}

						if(bandlist[index].FirstLetter == tempL){
							if(index>0 && bandlist[index-1].FirstLetter!=bandlist[index].FirstLetter&&count ){
								tempL = bandlist[index-1].FirstLetter;
								count == 0;

							}else{
								temp +='<a href="javascript:;" data-value="'+bandlist[index].ID+','+bandlist[index].Name+'">'+bandlist[index].Name+'</a>';
								count++;
							}


						}
						

						if( bandlist[index].FirstLetter != tempL ){
							temp +='</div>';
							temp +='<div class="pp_ops_item" id="' + bandlist[index].FirstLetter + '">';
							temp +='<span class="" id="'+ bandlist[index].FirstLetter +'">'+ bandlist[index].FirstLetter + '</span>';
							temp +='<a href="javascript:;" data-value="'+bandlist[index].ID+','+bandlist[index].Name+'">'+bandlist[index].Name+'</a>';
							tempL = '';
							flag = 1;
							count++;
						}

					});
					$("#bandlist").html(temp);
					var banditems = $(".bandselect  .pp_ops_item");
					for(var i = 0 ; i < banditems.length; i++){
						$(banditems[i]).find("a").last().css({"border-bottom":"none"});
					}

					$(".bandselect .selectBox .pp_ops_item a").hover(function(){
						$(".bandselect .selectBox .pp_ops_item a").removeClass("active");
						$(this).addClass("active");
					});
					
					$("#bandlist").bind('click',subSelect);
				}
			}
		}

		var getSerial = exports.getSerial = function(bandId){
			$.getScript(configs.getApi('serial',bandId),parse);
			function parse(){
				var rs=new Array('<ul><li><a class="first" href="javascript:void(0);" data-value="0,选择车系(可不选)">选择车系(可不选)</a></li>')
				if(window.oManufacturerSerialData){
					var tmp={};
					$.each(oManufacturerSerialData.arrSerial,function(index,item){
						var bName = item.BrandName;
						var sName = item.Name;
						!tmp[bName] && (tmp[bName] = ['<li><span>'+bName+'</span></li>']);
						tmp[bName].push('<li><a href="javascript:;" title="'+sName+'" data-value="'+item.ID+','+sName+'">'+sName+'</a></li>');
					});
					for(var key in tmp)
						rs.push(tmp[key].join('')||'');
						rs.push('</ul>');
					$(configs.el).find('#seriallist').html(rs.join('')).unbind('click').bind('click',subSelect1).find('a').first().trigger('click');
					$(configs.el).find('#moduellist').find('a').first().trigger('click');
					$(configs.el).find('#moduellist').html('');
				}
			
			}	
		}

		var getModel = exports.getModel = function(serialId){
			if(serialId == '0'){
				return;
			}
			$.getScript(configs.getApi('models',serialId),parse);
			function parse(){
				var rs=new Array('<ul><li><a class="first" href="javascript:void(0);" data-value="0,选择车型(可不选)">选择车系(可不选)</a></li>')
				if(window.oSameSerialModelData){
					var tmp={};
					$.each(oSameSerialModelData.arrModel,function(index,item){
						var bName = item.BrandName;
						var sName = item.Name;
						!tmp[bName] && (tmp[bName] = ['<li><span>'+bName+'</span></li>']);
						tmp[bName].push('<li><a href="javascript:;" title="'+sName+'" data-value="'+item.ID+','+sName+'">'+sName+'</a></li>');
					});
					for(var key in tmp)
						rs.push(tmp[key].join('')||'');
						rs.push('</ul>');
					$(configs.el).find('#moduellist').html(rs.join('')).unbind('click').bind('click',subSelect).find('a').first().trigger('click');
				}
			}	
		}
		
		exports.submit = function(event){
			//$.stopEvent(event);
			
			var brand=[],serial=[],model=[],url='';
			$(configs.el).find('.tips').each(function(index,item){
				var value=$(item).attr('data-value')||'';
				if($(item).parent().hasClass('selectBox-band')){
					brand= value.split(',');
				}
				if($(item).parent().hasClass('selectBox-cars')){
					serial=value.split(',');
				}
				if($(item).parent().hasClass('selectBox-carx')){
					model=value.split(',');
				}
			});
			if( $(event.target).hasClass('zxc') ){
				if(brand.length!==2){alert('请选择品牌或车系或车型');return}
					url=configs.getApi('searcarByBrand',brand[0]);
				if(+serial[0]){
					url=configs.getApi('searBySerial',serial[0]);
				}
				if(+model[0]){
					url=configs.getApi('searByModel',model[0]);
				}
			}else{
				if(brand.length!==2){alert('请选择品牌或车系或车型');return}
					url=configs.getApi('searpriByBand',brand[0]);
				if(+serial[0]){
					url=configs.getApi('searpriBySerial',serial[0]);
				}
				if(+model[0]){
					url=configs.getApi('searpriByModel',model[0])+'&serial_id='+serial[0];
				}
			}
			var iFlow = 0;
			if($(event.target).hasClass('zxc')){
				iFlow = 1;
			}else{
				iFlow = 2;
			}
			var a=document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
			var iQQ=(a==null?"":unescape(a[2]));
			var param = {
				sIp:'',
				iQQ: iQQ,
				sBiz:1,
				iFlow: iFlow,
				sOp:3,
				sUrl:escape(url),
				sLocalUrl: escape(location.href),
				bId: $('#band_select').attr('data-value').split(',')[0],
				modelId: $('#cars_select').attr('data-value').split(',')[0],
				sId: $('#carx_select').attr('data-value').split(',')[0]
			}
			console.log(param);
			btraceDo(param);
			window.open(url);
			//$(".zxc").attr('href',url);
		};

		exports.init = function(opt){
			$.extend(configs,opt);
			$(configs.el).find('.letterlist a').bind('click',function(e) {
				$.stopEvent(e);
				var zm = $(this).text();
				var selector = '#' + zm;
				var height = 0;
				var bandlists = $(configs.el).find('#bandlist');
				if( bandlists.children('div').length ){
					var prevDoms = $(selector).prevAll();
					for (var i = 0; i < prevDoms.length; i++) {
						 height += $(prevDoms[i]).height();
					};
				}
				$(configs.el).find('#bandbox .optionbox-container').scrollTop(height);
			});

			this.getBand();
			$(configs.el).find(".items").each(function(){
				var $self = $(this);
				select({
					selector: $self,
					btn: $self.find('.tips').attr('data-value','')
				});
			});
			$(configs.el).find('.zxc').bind('click',this.submit);
			$(configs.el).find('.xbj').bind('click',this.submit);

		}
	});
	//汽车图片  selectpic.js
	require.registar('selectpic',function(exports){
		var configs = {
			el:"#searchpic"
		};

		var getId = function(id){
			return document.getElmentById(id||'');
		}

		configs.getApi = function(key,id){
			var api = {
				'brand':'//js.data.auto.qq.com/car_public/1/manufacturer_list_json.js',
				'serial':'//js.data.auto.qq.com/car_manufacturer/'+id+'/serial_list_json.js',
				'bandpic':'//data.auto.qq.com/piclib/index.shtml#bid=' + id,
				'serialpic':'//data.auto.qq.com/piclib/index.shtml#sid=' + id
			}
			return api[key]||'';
		}

		function select(options){
			var aClass = 'subItemBtnActive';
			var selector = options.selector || '';
			var module = '_' + Math.random();
			var el = $(selector);
			var btn = options.btn;
			var popBody = btn.siblings('div');

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
				if($(this).parent().hasClass('selectBox-band')){
					if(popBody.find('.pp_ops_item').length){
						return popBody.hasClass(aClass)?blur():show();
					}
				}else{
					if(popBody.find('ul li').length){
						return popBody.hasClass(aClass)?blur():show();
					}
				}
			});

			eventSubscribe('click',function(active){
				if(active != module) blur();
			});

		}

		function subSelect(event,type){
			var option = $(event.target).closest('a');
			var inputBox = $(event.target).closest('.items').children('.tips');
			var isBrand = !!$(event.target).closest('.selectBox-band').length;
			if(option.length){
				var val=option.attr('data-value')||'';
				var valArr=val.split(',');
				if(valArr.length==2){
					var valId=valArr[0],valName=valArr[1];
					inputBox.attr('data-value',val).children('span').addClass('checked').text(valName);
					isBrand && setTimeout(function(){getSerial(valId)},0);
				}
			}
		}

		var getBand = exports.getBand = function(){
			$.getScript(configs.getApi('brand'),parse);
			function parse(){
				var rs = new Array();
				var tmp={},temp='',tempL='';
				if(window.oManufacturerData){
					var bandlist = oManufacturerData.arrManufacturer;
					$.each(bandlist,function(index,item){
						if(tempL == '' || tempL == 'undefined'){
							temp +='<div class="pp_ops_item" id="' + bandlist[index].FirstLetter + '1">'; 
							tempL = bandlist[index].FirstLetter;
							temp +='<span class="" id="'+ bandlist[index].FirstLetter +'">'+ bandlist[index].FirstLetter + '</span>';
						}
						if(bandlist[index].FirstLetter == tempL){
							temp +='<a href="javascript:;" data-value="'+bandlist[index].ID+','+bandlist[index].Name+'">'+bandlist[index].Name+'</a>';
						}else{
							temp +='</div>';
							tempL = "";
						}
					});
					$("#pic_bandlist").html(temp);
					var banditems = $('.carpic  .pp_ops_item');
					for(var i = 0 ; i < banditems.length; i++){
						$(banditems[i]).find("a").last().css({'border-bottom':'none'});
					}

					$('.carpic .optionbox .optionbox-container .pp_ops_item a').hover(function(){
						$('.carpic .optionbox .optionbox-container .pp_ops_item a').removeClass("active");
						$(this).addClass("active");
					});

					$("#pic_bandlist").bind('click',subSelect);
				}
			}
		}


		var getSerial = exports.getSerial = function(bandId){
			$.getScript(configs.getApi('serial',bandId),parse);

			function parse(){
				var rs=new Array('<ul><li><a href="javascript:;" data-value="0,选择车系(可不选)" >选择车系(可不选)</a></li>')
				if(window.oManufacturerSerialData){
					var tmp={};
					$.each(oManufacturerSerialData.arrSerial,function(index,item){
						var bName = item.BrandName;
						var sName = item.Name;
						!tmp[bName] && (tmp[bName] = ['<li><span>'+bName+'</span></li>']);
						tmp[bName].push('<li><a href="javascript:;" title="'+sName+'" data-value="'+item.ID+','+sName+'">'+sName+'</a></li>');
					});

					for(var key in tmp)
						rs.push(tmp[key].join('')||'');
						rs.push('</ul>');

					$(configs.el).find('.selectBox-cars #pic_seriallist').html(rs.join('')).unbind('click').bind('click',subSelect).find('a').first().trigger('click');				
				}
			
			}	
		}

		exports.submit = function(event){
			//$.stopEvent(event);
			var brand=[],serial=[],url='';
			$(configs.el).find('.tips').each(function(index,item){
				var value= $(item).attr('data-value')||'';
				if( $(item).closest('.selectBox-band').length){
					brand=value.split(',');
				}else{				
					serial=value.split(',');
				}
			});
			if(brand.length!==2){alert('请选择品牌或车系');return }
				url=configs.getApi('bandpic',brand[0]);
			if(+serial[0]){
				url=configs.getApi('serialpic',serial[0]);
			}
			console.log(url)
	
			var a=document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
			var iQQ=(a==null?"":unescape(a[2]));
			var param = {
				sIp:'',
				iQQ: iQQ,
				sBiz:1,
				sOp:4,
				sUrl:escape(url),
				sLocalUrl: escape(location.href),
				bId: $('#pic_band_select').attr('data-value').split(',')[0],
				sId: $('#pic_cars_select').attr('data-value').split(',')[0]
			}
			//console.log('param1',param);
			btraceDo(param);
			window.open(url);
		}

		exports.init = function(opt){
			$.extend(configs,opt);

			$(configs.el).find('.letterlist a').bind('click',function(e) {
				$.stopEvent(e);
				var zm = $(this).text();
				var selector = '#' + zm + '1';
				var height = 0;
				var bandlists = $(configs.el).find('#pic_bandlist');
				if( bandlists.children('div').length ){
					var prevDoms = $(selector).prevAll();
					for (var i = 0; i < prevDoms.length; i++) {
						 height += $(prevDoms[i]).height();
					};
				}
				$(configs.el).find('#pic_bandbox .optionbox-container').scrollTop(height);
			});

			this.getBand();
			$(configs.el).find(".items").each(function(){
				select({
					selector:$(this),
					btn:$(this).find('.tips').attr('data-value','')
				});
			});
			$(configs.el).find('.xbj').bind('click',this.submit);
		}
	});
	//曾经看过
	require.registar('visitHistory',function(exports){
		exports.init=function(el){
			var history= $.cookie("wz_autoapp_reviewmodels_12")||'',tmp='<div class="viewed-container"><span class="viewLogo share10-view-logo"></span><span>看过:</span><div class="viewed-container-cars"><ul class="cf" id="cp_cxdq">';
			history=history.split(",").reverse();
			for(var i=0; i<history.length; i++){
				if(i>2)break;
				var arr = history[i].split('&&');
				tmp +='<li><a href="' + arr[0] +'" target="_blank">' + arr[1] + '</a></li>';
			}
			tmp += '</ul></div></div>';
			history[0].length > 1 && $(el).append(tmp);
		}
	});
	// 顶部搜索
    require.registar('topSearch', function (exports) {
        var module, data, index, input, form, rsBox, placeholder, loaded;
        var serial_py_json = 'http://js.data.auto.qq.com/car_public/template/serial_py.js';
        var ie6789 = $.browser.ie678 || $.browser.ie9;
        var flag = true;
        var timer = null;
        function insertData() {
            if (window._autoapp_site_serial_py_json) {
                data = _autoapp_site_serial_py_json;
                rsBox.html(get(null) || "<span>\u65e0\u76f8\u5173\u63a8\u8350</span>");
                $(document).on('click', '.header-search li a', function () {
                    $.stopEvent(event);
                    var url = $(this).attr('_href');
                    var value = $(this).text();
                    var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
                    var iQQ = (a == null ? "" : unescape(a[2]));
                    var param = {
                        sIp: '',
                        iQQ: iQQ,
                        sBiz: 1,
                        sOp: 2,
                        sUrl: escape(url),
                        sLocalUrl: escape(location.href),
                        sKeyword: encodeURIComponent(value),
                        sId: url.match(/\d/g).join('')
                    }
                    btraceDo(param);
                    url && window.open(url);
                });
                loaded = true;
            }
        }
        function getQs(name, url) {
            if (!url) url = document.URL;
            //url = url.toLowerCase(); // This is just to avoid case sensitiveness  
            name = name.replace(/[\[\]]/g, "\\$&"); // This is just to avoid case sensitiveness for query parameter name
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        function blur() {
            var val = input.val();
            rsBox.hide();
            input.css("color", val ? "#333" : "#a9a9a9").val(val || placeholder);
            $(document).unbind("click", blur)
        }

        function focus() {
            var position = input.position();
            var top = position.top + input.height() + 2, left = position.left;
            rsBox.html() != '' && rsBox.show();//.css({top:top,left:left})
            input.css("color", "#333").val(input.val() == placeholder  ? "" : input.val());
            get($.trim(input.val()));
            $(document).bind("click", blur);
            var param = {
                sOp: 'search_focus',
				searchFrom: 'index',
				BossId:7991,
				Pwd:733793333,
				sBiz:'pc_search'
            };
            btraceDo(param);
        }

        function keyup(e) {
            var total = rsBox.find("li").length - 1 || 0;
            var code = e.keyCode;
            var _this = this;
            //console.log(code);
            if (code == 13) { 
                $.stopEvent(e);
                submitOpen(e); 
                return false; 
			}
			if (code == 37 || code == 39) {
				return false; 
			}
            if (code == 38 || code == 40) {
                if (code == 38) {
                    index--;
                    if (index < 0) { index = total }
                } else {
					console.log(index)
                    index++;
                    if (index > total) { index = 0 }
                }
                var selected = rsBox.find("li").eq(index).children('a');
                selected.closest('ul').find('.select').removeClass('select');
                selected.addClass("select");
                input.css("color", "#333").val(selected.attr("title"));
            } else {
                index = -1;
                clearTimeout(timer)
                timer = setTimeout(function () {
                    get($.trim(_this.value));
                }, 100)

            }
            return false;
        }
        function submitOpen(e) {
			$.stopEvent(e);
			input.trigger('blur');
			rsBox.hide();
            var value = $.trim(input.val()), url = "";
            url = ~index ? rsBox.find("li").eq(index).children('a').attr("href") : "https://ait.auto.qq.com/car_public/search.shtml?keyword=" + encodeURI(value);
            //url =  value ? ("https://cgi.data.auto.qq.com/php/search.php?fuzzy_search=1&keyword=" + encodeURI(value)) : "https://data.auto.qq.com/";            
            var param = {
                sOp: ~index ? 'search_recommend':'search_btn',
                searchFrom: 'index',
				BossId:7991,
				Pwd:733793333,
				sBiz:'pc_search'
            };
            btraceDo(param);
            //console.dir(param);
            url &&  window.open(url) ;
            index = -1;
            //return false;
        }
        
        function get(value) {
            var rsData = [], count = 0;
            if (!flag) {
                return false
            }
            flag = false;
            ajaxFn({
				url: 'https://ait.auto.qq.com/search/suggest',
				type: "GET",
				data: {
					keyword: value,
					source:'pc',
					callback: 'search_key' //为签名而加，跟jsonpCallback同名，jsonp才需要
				},
				dataType: 'jsonp',
				jsonpCallback: "search_key" //指定回调函数名称
			},
				function success(oRet) {
					if (oRet.code == 10000) {
                        var data = oRet.data.list;
                        flag = true;
                        for (var i = 0, len = data.length; i < len; i += 1) {
                            var item = data[i];
                            item.price = (item.price_low == '0.00'? '<span class="acronym" style="color: #666;">暂无报价</span>' : '<span class="acronym">' + item.price_low + '-' + item.price_high + '万</span>');
                            rsData.push('<li><a target="_blank" title="' + item.keyword + '" href="//data.auto.qq.com/car_serial/' + item.id + '" >' + item.keyword + item.price+'</a></li>');
                            count++;
                            if (count == 10) break;

                        }

                        rsData.length && (rsData = new Array('<ul><p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAUUlEQVQoU2NkQALLj3/6j8yPtORjhPHhDJAAnRUuP/65noHhfwOy2zDZjA1gN+JXzNgQacnbCPcMdsUQRSDD0HyN7AyEIgyFCGcwMMBMgrkXAKYfKupG96GPAAAAAElFTkSuQmCC">点击直达车系详情</p>').concat(rsData), rsData.push('</ul>'));
                        rsData.length > 0 ? rsBox.show().html(rsData.join("")) : rsBox.hide().html('');
                        rsBox.find("li").on('click',function(){
                            var param = {
                                sOp: 'search_recommend',
                                searchFrom: 'index',
								BossId:7991,
								Pwd:733793333,
								sBiz:'pc_search'
                            };
                            btraceDo(param);
                        })
                    }
				},
				function complete() {
				},
				function error() {
                }
            )
            

        }

        exports.init = function (id) {
            module = "autoComplete_" + Math.random();
            data = [];
            index = -1;
            input = $(id);
            form = input.closest("form");
            rsBox = $('<div style="position:absolute;display:none;" class="autoComplete results_list" />').appendTo(input.parent());
            placeholder = input.attr("placeholder");
            input.attr("placeholder", "");
            loaded = false;
            var val = input.val();
            input.css("color", "#a9a9a9").val(val || placeholder);


            $('.search_car_btn').bind('click', submitOpen);
            input.css('outline', 'none').siblings('.search_car_btn').unbind().bind('click', submitOpen);


            eventSubscribe("click", function (active) {
                if (active != module) blur();
            });

            input.keyup(keyup).focus(focus).click(function (e) {
                $.stopEvent(e);
                eventSpeaker("click", module);
                //    !loaded && $.getScript(serial_py_json, insertData);
            })
        }
    });
	//购车-选车
	require.registar('selectAndBuyCar',function(exports){
		var api='//js.data.auto.qq.com/car_public/brand_man_serial_auto.js';
		var db;
		
		function moduleDb(data){
			data=data||[];			
			var db={
				serial:data,
				search:function(key,fn){
					var list=typeof key =="object"?key:this[key];
					list=list.reverse(),i=list.length;
					while(i--)fn(list[i]);
					list.reverse();
				}
			}
		var budget=["7\u4e07\u4ee5\u4e0b","7-10\u4e07","10-15\u4e07","15-22\u4e07","22-35\u4e07","35-50\u4e07","50-100\u4e07","100-300\u4e07","300\u4e07\u4ee5\u4e0a"],
				nation=["\u4e2d\u56fd","\u7f8e\u56fd","\u5fb7\u56fd","\u65e5\u672c","\u6cd5\u56fd","\u82f1\u56fd","\u610f\u5927\u5229"].join("|");
				for(var i=0,len=data.length;i<len;i+=1){
					var serial=data[i];
					var option=((~nation.indexOf(serial.BCountry))?serial.BCountry:"\u5176\u4ed6")+"|"+serial.Level+"|"+serial.Useway;
					var max=+serial.PriceHigh,min=+serial.PriceLow;
					$.each(budget,function(a,b){
						var c,d,e=b.split("-");
						if(e.length==2){
							c=parseInt(e[0]),d=parseInt(e[1]);
						}else{
							c=parseInt(e[0]);
							if(c>7){
								c=c;
								d=1000000;
							}else{
								c=0.0001;
								d=7;
							}
						}
						if((max>c&&max<d)||(!(min<c)&&min<d)||(min<c&&max>d)){
							option+=("|"+b);
						}
					
					});
					serial.option=option;
				}
			return db;		
		}
		function _getTpl(){
			var tpl='<li>\
						<a href="//data.auto.qq.com/car_serial/{ID}" target="_blank" class="pic">\
							<img style="width:100%;height:100%;" src="//img1.gtimg.com/datalib_img/{Pic}" alt="">\
						</a>\
						<a href="//data.auto.qq.com/car_serial/{ID}" target="_blank" class="txt">{Name}</a>\
					</li>';
			return tpl.replace(/\s+/g," ");
		}
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (searchElement , fromIndex) {
				var i,pivot = (fromIndex) ? fromIndex : 0,length;
				if (!this) {
					throw new TypeError();
				}
				length = this.length;
				if (length === 0 || pivot >= length){
					return -1;
				}
				if (pivot < 0) {
					pivot = length - Math.abs(pivot);
				}
				for (i = pivot; i < length; i++){
					if (this[i] === searchElement) {
						return i;
					}
				}
				return -1;
			}
		}
		$.extend(exports,{_type:'brand',
			_rule:{budget:[],nation:[],use:[],level:[]},
			_letter:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
			_viewCount:5,
			_ltExist:{},
			_existOption:{nation:{},level:{},use:{},budget:{}},
_diy20170511:0,//智能选车默认手动更新(1/4)
			addRule:function(key,value){
				this._rule[key]=new Array(value);
			},
			removeRule:function(key,value){
				this._rule[key]=new Array();
			},
			ruleURLPStr:function(){
				var hash=this.rule2Hash();
				return 'type='+this._type+'#'+hash;
			},
			rule2Hash:function(){
				var rl=this._rule;
				var hs=rl["budget"].join("-")+"_"+rl["nation"].join("-")+"_"+rl["use"].join("-")+"_"+rl["level"].join("-");
				return encodeURI(hs);
			},
			clear:function(key){
				this._rule[key]=new Array();
			},
			clearAll:function(){
				var key="budget,nation,use,level",_rule=this._rule;
				$.each(key.split(","),function(a,b){
					_rule[b]=new Array();
				})
			},
			switchRule:function(key,value){
				var rl=this._rule;
				rl[key]&&((rl[key].indexOf(value)+1)?this.removeRule(key,value):this.addRule(key,value));
			},
			cmd:function(cmd){
				cmd=typeof cmd =="string" ? cmd.split("."):"";
				var fn=this[cmd.shift()];
				typeof fn=="function" && fn.apply(this,cmd)
			},
			regSearch:function(){
				var value=location.search.substr(1)||"brand";
				value&&(this._type=value)
			},
			setSearch:function(value){
				value=value||"brand";
				this._type=value;
			},
			insertContainer:function(arr){
				var div=$("<div/>"),container=$(this.container),cb=this.callback;
if(this._diy20170511){//智能选车默认手动更新(2/4)
				var html=arr.join("");
	//console.log(arr);
				arr=null;
}else{
	/*
	var _diy20170511Arr = [
		'<li> <a href="//data.auto.qq.com/car_serial/1691" target="_blank" class="pic"> <img style="width:100%;height:100%;" src="//img1.gtimg.com/datalib_img/CarSerial/20160810/20160810_164308_65901950_thumbnail_280_200.jpg" alt=""> </a> <a href="//data.auto.qq.com/car_serial/1691" target="_blank" class="txt">比速M3</a> </li>',
		'<li> <a href="//data.auto.qq.com/car_serial/1691" target="_blank" class="pic"> <img style="width:100%;height:100%;" src="//img1.gtimg.com/datalib_img/CarSerial/20160810/20160810_164308_65901950_thumbnail_280_200.jpg" alt=""> </a> <a href="//data.auto.qq.com/car_serial/1691" target="_blank" class="txt">比速M3</a> </li>',
		'<li> <a href="//data.auto.qq.com/car_serial/1691" target="_blank" class="pic"> <img style="width:100%;height:100%;" src="//img1.gtimg.com/datalib_img/CarSerial/20160810/20160810_164308_65901950_thumbnail_280_200.jpg" alt=""> </a> <a href="//data.auto.qq.com/car_serial/1691" target="_blank" class="txt">比速M3</a> </li>',
		'<li> <a href="//data.auto.qq.com/car_serial/1691" target="_blank" class="pic"> <img style="width:100%;height:100%;" src="//img1.gtimg.com/datalib_img/CarSerial/20160810/20160810_164308_65901950_thumbnail_280_200.jpg" alt=""> </a> <a href="//data.auto.qq.com/car_serial/1691" target="_blank" class="txt">比速M3</a> </li>',
		'<li> <a href="//data.auto.qq.com/car_serial/1691" target="_blank" class="pic"> <img style="width:100%;height:100%;" src="//img1.gtimg.com/datalib_img/CarSerial/20160810/20160810_164308_65901950_thumbnail_280_200.jpg" alt=""> </a> <a href="//data.auto.qq.com/car_serial/1691" target="_blank" class="txt">比速M3</a> </li>'
	];
	*/
	var html=_diy20170511Arr.join("");
}
				jQuery.browser.ie67&&(html=html.replace(/eventForIE6/g,' onmouseover=\'javascript:jQuery(this).addClass("hover").parents(".listAll").addClass("hover");\' onmouseout=\'javascript:jQuery(this).removeClass("hover").parents(".listAll").removeClass("hover");\' '));

				html = $(html);
				html.last().attr('id','last');
				div.append(html);
				container.append(div);
				cb&&cb(div[0]);
				div=null,html=null,container=null,cb=null;
			},
			batchProcess:function(arr,fn){
				if(!arr.length)return;
				fn.call(this,arr.splice(0,5));
				var _this=this,_arg=arguments;
				setTimeout(function(){_this.batchProcess.apply(_this,_arg)},100);
			},
			searchSerial:function(){
				var letter=this._letter.split("").reverse(),items={};
				var sTpl=_getTpl(),ltExist=this._ltExist={},existOption={};
				var vReg=/\{(\w+)\}/g;
				
				var letterType=this._type=='brand'?'BLetter':'FirstLetter';
				
				var rl=this._rule;
				var budget=rl["budget"].join(""),nation=rl["nation"].join("-"),level=rl["level"].join("-"),use=rl["use"].join("-");
				
				
				var result=[];
				db.search("serial",function(serial){
					var option=serial.option;
					if((!budget||option.indexOf(budget)+1)&&(!level||option.indexOf(level)+1)&&(!use||option.indexOf(use)+1)){
						result.push(serial);
						$.each(serial["option"].split("|"),function(a,b){existOption[$.trim(b)]=true})
					}
				});			
				var count=0;
				this._existOption=existOption;
				this.beMark();
				existOption={};
				db.search(result,function(serial){
					var option=serial.option;
					if((!nation||serial.option.indexOf(nation)+1)&&serial.ProducingState!='\u505c\u4ea7'){
						var index=serial[letterType];
						ltExist[index]=true;
						!items[index]&&(items[index]=[]);
						count++;
						items[index].push(sTpl.replace(vReg,function($1,$2){
							return serial[$2]||""
						}));
						$.each(serial['option'].split('|'),function(a,b){existOption[$.trim(b)]=true})
					
					}
				})
				this._existOption=existOption;
				this._count=count;
				var i=letter.length,larr=[]; 
				var _viewCount=this._viewCount;
				var tpArr=[];
				while(i--){
					var index=letter[i];
					if(items[index]){
						_viewCount&&(_viewCount--,larr.push(items[index].shift()));
						tpArr=tpArr.concat(items[index]);
					}
				}
				var fillStr=tpArr.splice(0,_viewCount).join('');
				fillStr&&larr.push(fillStr);
				this.batchProcess(larr,this.insertContainer);
			},
			beAnchor:function(){
				var ltArr=[],ltExist=this._ltExist,widgetName=jQuery.widgetName;
				var ruleURLPStr=this.ruleURLPStr();
				$.each(this._letter.split(""),function(i,l){
					var anchor=ltExist[l]?('<a target="_blank" href="//data.auto.qq.com/car_brand/index.shtml?'+ruleURLPStr+'_container_'+l+'">'+l+'</a>'):('<a href="javascript:;" class="disable">'+l+'</a>');
					ltArr.push(anchor);
				});
				$(".letter",this.selector).html(ltArr.join(""));
			},
			beMark:function(_breakName){
				var keys=["budget","nation","use","level"],rl=this._rule,tSelector="#select4"+this._type;
				var existOption=this._existOption;
				$(tSelector).length && ($(tSelector)[0].checked=true);
				$(".quickOption li",this.selector).each(function(i,b){
					var key=keys[i];
					if(key==_breakName){return}
					var r=rl[key];
					$("a",b).each(function(n,el){
						el=$(el);
						var rStr=r?r.join("-"):"";
						var rReg=el.attr("value");
						rReg=rReg.substr(rReg.lastIndexOf(".")+1);
							if(!existOption[rReg]&&!el.hasClass("clear")){
								el.addClass("disable");return;									
							}else{										
								el.removeClass("disable")
							}
						(rStr.indexOf(rReg)+1)&&(el.addClass("select").siblings().removeClass("select"));
					})
					!r.length&&$(".clear",b).addClass("select").siblings().removeClass("select");
				});
if((rl[keys[0]].length == 0) && (rl[keys[1]].length == 0) && (rl[keys[2]].length == 0) && (rl[keys[3]].length == 0)){//智能选车默认手动更新(3/4)
	this._diy20170511 = 0;
}else{
	this._diy20170511 = 1;
}
			},
			selectedOption:function(){

				var txt='<h3>\u5f53\u524d\u9009\u62e9\u8f66\u8f86\u6761\u4ef6</h3>',keys=['budget','nation','use','level'],rule=this._rule,rs=[];
					$.each(keys,function(n,key){
						var item=rule[key].join('');
						item&&rs.push('<a href="javascript:;" value="clear.'+key+'.'+item+'" class="selected">'+item+'</a>')
					});

					rs=rs.length?'<li>'+txt+rs.join('')+'<a href="javascript:;" value="clearAll" class="clearAllBtn" >\u6e05\u7a7a</a></li>':' ';
this._diy20170511 = rs.length ? 1 : 0;//智能选车默认手动更新(4/4)
					$(".selectedOption",this.selector).html(rs)
			},
			query:function(){
				this.container.empty();
				this.searchSerial();
				this.beAnchor();
				this.beMark("nation");
				this.selectedOption();
			}
		})

		exports.searchCar=function(selector){
			var qs=this,dimenValue = 'brand';
			qs.container=$("#model_list").empty();
			qs.selector=selector;
			qs.callback=function(div){
				if(qs._count<=qs._viewCount)return;
				var link='//data.auto.qq.com/car_brand/index.shtml?'+qs.ruleURLPStr();
				var readMore='<li class="last"><a href="'+link+'" target="_blank" class="pic">\
									<b style="display:block;">\u70b9\u51fb\u67e5\u770b\u66f4\u591a\u7ed3\u679c<br>\u8f66\u578b('+qs._count+'\u6b3e)</b>\
								</a>\
								<a href="'+link+'" target="_blank" class="txt">\u67e5\u770b\u66f4\u591a</a>\
							</li>';
					$(div).append(readMore.replace(/\s+/,' '));
			}
			
			
			function straceSearchCar(){
				var a=document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
				var iQQ=(a==null?"":unescape(a[2]));
				var param = {
					sIp:'',
					iQQ: iQQ,
					sBiz:1,
					sOp:11,
					sLocalUrl: location.href,
					dimen:dimenValue,
					price:'',
					country:'',
					carusage:'',
					carlevel:''
				};
				
				$(".selectedOption li a.selected").each(function(index,item){
					//console.log('hahah');
					//console.log($(item).attr('value').split('.')[1]);
					if($(item).attr('value').split('.')[1] == 'budget'){
						param.price = encodeURIComponent($(item).attr('value').split('.')[2])
					}
					
					if($(item).attr('value').split('.')[1] == 'nation'){
						param.country = encodeURIComponent($(item).attr('value').split('.')[2])
					}
					
					if($(item).attr('value').split('.')[1] == 'use'){
						param.carusage = encodeURIComponent($(item).attr('value').split('.')[2])
					}
					
					if($(item).attr('value').split('.')[1] == 'level'){
						param.carlevel = encodeURIComponent($(item).attr('value').split('.')[2])
					}
				});
				
				
				//console.log(param);
				btraceDo(param);
			}
			
			// 按 品牌|车系 切换
			$("input[type=radio]",selector).unbind().bind("click",function(){
				dimenValue = this.value;
				qs.setSearch(this.value);
				qs.query();
				straceSearchCar();
				return;
			});
			// 多关键字组合检索
			$(".quicklyBody",selector).unbind().bind("click",function(e){
				var el=$(e.target),cmd=el.attr("value");					
				if(!el.is("a")||el.is(".disable"))return;
				if(el.hasClass("clear")&&el.hasClass("select"))return;
				$(selector).addClass("disable");
				cmd&&qs.cmd(cmd);
				qs.query();
				setTimeout(function(){$(selector).removeClass("disable")},1000);
				straceSearchCar();
				return;
			});
			
			qs.query();
		};
		
		exports.getVisit=function(){
			var C_Visit=$.cookie("wz_autoapp_ReviewSerials");
			var visitLink=[],competition=[],serialId=[],competitionLink=[];
			if(C_Visit){
				C_Visit=C_Visit.split("|").reverse();
				$.each(C_Visit,function(a,b){
					var item;
					b&&(item=b.split(","));
					if(item.length==3){
						var id=item[1];
						visitLink.push('<a target="_blank"  href="//data.auto.qq.com/car_serial/'+id+'">'+item[0]+'</a>');
						serialId.push(+id)				
					}				
				});
				serialId=serialId.splice(0,2);
				db.search("serial",function(serial){
					var sid=serial.ID,serialCompetion=serial.Competionserial;
					((sid==serialId[0]||sid==serialId[1])&&serialCompetion)&&(competition.push(serialCompetion))				
				});
				$.each(competition,function(a,b){
					$.each(b.split(";"),function(c,d){
						var item=d.split("|");
						(item.length==2)&&competitionLink.push('<a target="_blank" href="//data.auto.qq.com/car_serial/'+item[0]+'">'+item[1]+'</a>')
					});
				});
			}
			var domHistory=$("#search .history");
			var domLike=$("#search .like");
			visitLink.length?domHistory.show().children("p").html(visitLink.join("")):domHistory.remove();
			competitionLink.length?domLike.show().children("p").html(competitionLink.join("")):domLike.remove();
		}
		exports.init=function(selector){
			if(!$(selector).length){return;}
			var self=this;
			$.getScript(api,function(){
				if(window.oBrandSerialData){
					db=moduleDb(oBrandSerialData.list);
					self.searchCar(selector);
					self.getVisit();
				}
			})
		}
    });
    //新闻列表
	require.registar('newsList',function(exports){
        exports.op={
            data:{},
            api:{
                news:'https://ait.auto.qq.com/home/page/category/list',
                coral:'https://coral.qq.com/article/batchcommentnumv2?needup=1&source=1'
            },
			tpl:'<% for(var i = 0; i < newArr.length; i++){ %>\
				<% if(newArr[i].img_url.length>0){ %>\
					<% if(newArr[i].img_url.length<3){ %>\
						<li class="">\
							<a target="_blank" class="pic" href="//new.qq.com/omn/<%= newArr[i].cms_id %>.html">\
								<img  class="lazyload" src="https://mat1.gtimg.com/auto/images/ait/point.png" data-original="<%= newArr[i].img_url[0] %>">\
							</a>\
							<div class="newTxt">\
								<h3 class="minH"><a target="_blank" href="//new.qq.com/omn/<%= newArr[i].cms_id %>.html"><%= newArr[i].title %></a></h3>\
								<div class="tags">\
									<% for(var j = 0; j < newArr[i].tags_detail.length; j++){ %>\
									<a class="tag" target="_blank" href="//new.qq.com/tag/<%= newArr[i].tags_detail[j].tag_id %>" data-bossirs="new_tag"><%= newArr[i].tags_detail[j].tag_name %></a>\
									<% } %>\
								</div>\
								<div class="newFoot">\
									<h5><span class="source"><%= newArr[i].source_name %></span><span class="time"><%= newArr[i].pub_time %></span></h5>\
									<a class="cmt" targetid="<%= newArr[i].comment_id %>" href="//coral.qq.com/<%= newArr[i].comment_id %>" target="_blank" >0</a>\
								</div>\
							</div>\
						</li>\
					<% }else{ %>\
						<li class="items">\
							<h3><a target="_blank" href="//new.qq.com/omn/<%= newArr[i].cms_id %>.html"><%= newArr[i].title %></a></h3>\
							<a class="pics" href="//new.qq.com/omn/<%= newArr[i].cms_id %>.html" target="_blank">\
								<% for(var k = 0; k < newArr[i].img_url.length; k++){ %>\
									<img class="fl picture lazyload" src="https://mat1.gtimg.com/auto/images/ait/point.png" data-original="<%= newArr[i].img_url[k] %>">\
									<% } %>\
								</a>\
							</a>\
							<div class="newTxt">\
								<div class="newFoot">\
									<h5><span class="source"><%= newArr[i].source_name %></span><span class="time"><%= newArr[i].pub_time %></span></h5>\
									<div class="tags fl" boss="{BossId:&#39;7991&#39;,Pwd:&#39;733793333&#39;,sOp:&#39;index_news_tag&#39;}">\
									<% for(var j = 0; j < newArr[i].tags_detail.length; j++){ %>\
										<a class="tag" target="_blank" href="//new.qq.com/tag/<%= newArr[i].tags_detail[j].tag_id %>" data-bossirs="new_tag"><%= newArr[i].tags_detail[j].tag_name %></a>\
										<% } %>\
									</div>\
									<a class="cmt" boss="{BossId:&#39;7991&#39;,Pwd:&#39;733793333&#39;,sOp:&#39;index_news_comment&#39;}" href="//coral.qq.com/<%= newArr[i].comment_id %>" target="_blank" targetid="<%= newArr[i].comment_id %>" >0</a>\
								</div>\
							</div>\
						</li>\
					<% } %>\
				<% } %>\
			<% } %>'
        }; 
        //计算时差
        exports.getDateDiff = function(dateTimeStamp) {
            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var halfamonth = day * 15;
            var month = day * 30;
            var now = new Date().getTime();
            var diffValue = now - dateTimeStamp;
            if (diffValue < 0) {
                //若日期不符则弹窗口告之,结束日期不能小于开始日期！
                return '';
            }
            var monthC = diffValue / month;
            var weekC = diffValue / (7 * day);
            var dayC = diffValue / day;
            var hourC = diffValue / hour;
            var minC = diffValue / minute;
            if (monthC >= 1) {
                result =  parseInt(monthC) + "个月前";
            }else if (weekC >= 1) {
                result =  parseInt(weekC) + "周前";
            }else if (dayC >= 1) {
                result = parseInt(dayC) + "天前";
            }else if (hourC >= 1) {
                result =  parseInt(hourC) + "小时前";
            }else if (minC >= 1) {
                result = parseInt(minC) + "分钟前";
            } else{
                result = "刚刚发布"; 
            }
            return result;
        }
        exports.getCommentNum=function(ids){
            ajaxFn({
				url: this.op.api.coral,
				type: "GET",
				data: {
                    targetids:ids,
				},
				dataType: 'jsonp',
			},
				function success(oRet) {
					if (oRet.errCode == 0) {
                        oRet.data.map(function(index){
                            index.commentnum >0 && $('.cmt[targetid="'+index.targetid+'"]').show().html(index.commentnum) 
                        })
                    }
				},
				function complete() {
				},
				function error() {
                }
            )
        }
        exports.getDate=function(dom,category,next_id){
            var _this = this;
            ajaxFn({
				url: _this.op.api.news,
				type: "GET",
				data: {
                    next_id:next_id,
					category: category,
					callback: category //为签名而加，跟jsonpCallback同名，jsonp才需要
				},
				dataType: 'jsonp',
				jsonpCallback: category //指定回调函数名称
			},
				function success(oRet) {
					if (oRet.code == 10000) {
                        oRet.data.newArr = [];
                        oRet.data.comment_id = [];
                        oRet.data.list.map(function(index){
                            if(!_this.op.data[index.cms_id]){
                                oRet.data.newArr.push(index)
                            };
                            oRet.data.comment_id.push(index.comment_id);
                        })
                        oRet.data.newArr.map(function(index){
                            for(var i=0 ; i<index.img_url.length;i++){
                                index.img_url[i] = index.img_url[i].replace("_197130/0","_295195/0");
                            }
                            index.pub_time = _this.getDateDiff(index.pub_time*1000)
                        })
                        $(dom).find('ul').append(txTpl(_this.op.tpl,oRet.data));
                        if(oRet.data.has_next == 1){
							$(dom).find('.getMore').attr('next_id',oRet.data.next_id);
							
                        }else{
                            $(dom).find('.getMore').hide();
                        }
                        _this.getCommentNum(oRet.data.comment_id.join(','))
                        $('.lazyload').length && $('.lazyload').picLazyLoad();
                    }
				},
				function complete() {
				},
				function error() {
                }
            )
        }
		exports.init=function(el){
			var _this = this;
			var flag = true;
			_this.el = $(el);
			var oList = _this.el.find('.list');
			var boss = ['index_news_tab_xinche','index_news_tab_daogou','index_news_tab_keji','index_news_tab_yongche','index_news_tab_hangye'];
            _this.category = ['auto_new','auto_daogou','auto_tech','auto_yongche','auto_chanye'];
            
			_this.getDate(oList.eq(0),_this.category[0],0);
			_this.index = 0;
            _this.el.find('.menus li').click(function(){
                var _that = $(this);
				var index = _that.index();
				_this.index = index;
                _that.siblings().find('a').removeClass('active');
                _that.find('a').addClass('active');
                oList.eq(index).find('li').length==0 && _this.getDate(oList.eq(index),_this.category[index],0);
                oList.hide();
				oList.eq(index).show();
				var param = {
					sOp: boss[index],
					BossId:7991,
					Pwd:733793333,
					sBiz:'autoindex'
				};
				btraceDo(param);
            })
            _this.el.find('.getMore').each(function (index) {
                $(this).on('click', function () {
                    var _that = $(this);
                    var id = _that.attr('next_id');
					_this.getDate(oList.eq(index),_this.category[index],id);
                })
			})
			
			// 滚动触发
			$(window).on('scroll', function () {
				_winScrollTop = $(window).scrollTop();
				_winHeight = $(window).height();
				_offsetTop = $('.qczx').offset().top;
				var oMore = _this.el.find('.getMore').eq(_this.index);
				_getMoreTop = oMore.offset().top;
				if (_winScrollTop + _winHeight - 100 > _offsetTop && flag ) {
					var param = {
						sOp: boss[0],
						BossId:7991,
						Pwd:733793333,
						sBiz:'autoindex'
					};
					btraceDo(param);
					flag = false;
				}
				if (_winScrollTop + _winHeight + 50  > _getMoreTop && oMore.attr('load')!=1 ) {
					oMore.trigger('click').attr('load',1);
				}
			});

		}
	});
	//新闻列表
	require.registar('newsTopList',function(exports){
        exports.op={
            data:{},
            api:{
                news:'https://ait.auto.qq.com/home/page/category/list',
            },
			tpl:'<% for(var i = 0; i < list.length; i++){ %>\
				<li> <a href="//new.qq.com/omn/<%= list[i].cms_id %>.html" title="<%= list[i].title %>" target="_blank"><%= list[i].title %></a></li>\
			<% } %>'
        }; 
        exports.getDate=function(dom,category,next_id){
            var _this = this;
            ajaxFn({
				url: _this.op.api.news,
				type: "GET",
				data: {
                    next_id:next_id,
					category: category,
					callback: category //为签名而加，跟jsonpCallback同名，jsonp才需要
				},
				dataType: 'jsonp',
				jsonpCallback: category //指定回调函数名称
			},
				function success(oRet) {
					if (oRet.code == 10000) {
						oRet.data.list.length>3 && (oRet.data.list.length=3);
						$(dom).prepend(txTpl(_this.op.tpl,oRet.data));
                    }
				},
				function complete() {
				},
				function error() {
                }
            )
        }
		exports.init=function(el){
			var _this = this;
			_this.el = $(el);
			_this.getDate(_this.el,'auto_yongche',0);
		}
	});
	$(function(){
		require('selectCarCenter').init();//选车中心
		require('selectpic').init();//汽车图片
		$('.viewed').length && require('visitHistory').init('.viewed'); //浏览历史
		$('.search_ipt').length && require('topSearch').init('.search_ipt'); //顶部搜索
        $('#quickly').length  && require('selectAndBuyCar').init('#quickly'); //选车买车
		$('.qczx-l').length  && require('newsList').init('.qczx-l'); //新闻资讯
		$('#yw3list').length  && require('newsTopList').init('#yw3list'); //新闻资讯
	});
})(jQuery);