/*
*	desc		腾讯公益JS库文件
*	ver			v1.1
*	modify		修改新版的捐款弹出层
*/
/**
*
*  Base64 encode / decode
*
*  @author haitao.tu
*  @date   2010-04-26
*  @email  tuhaitao@foxmail.com
*
*/
function Base64() {
	// private property
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
	// public method for encoding
	this.encode = function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
			_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}
 
	// public method for decoding
	this.decode = function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}
 
	// private method for UTF-8 encoding
	_utf8_encode = function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
		return utftext;
	}
 
	// private method for UTF-8 decoding
	_utf8_decode = function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}

/*
*	desc		截取字符串
*	author		kidxiong
*	ex			string.subString(startIndex,length,hosDot);
*									起始位置，长度，是否需要点
*/
String.prototype.subString=function()
{
    var start = arguments[0]||0;
    var len = arguments[1]||1;
    var hasDot = arguments[2]||false;
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = this.replace(chineseRegex,"**").length;
	var strLength2 = strLength;
    var charArr = [];
    var index = 0;
    for(var i = 0;i < strLength;i++){
        singleChar = this.charAt(i).toString();
        if(singleChar.match(chineseRegex) != null){
            strLength --;
        }
		charArr[index] = singleChar;
		index++;
    }
	var tmpArr = charArr.slice(start,len+start);
	newStr = tmpArr.join('');
    
    if(hasDot && strLength2 > len){
        newStr += "...";
    }
    return newStr;
}

/*
*	desc		转码
*	author		kidxiong
*	ex			string.entities()
*/
String.prototype.entities = function(){
	var str = this.toString();
	str = str.replace(/&/g,"&amp;");
	str = str.replace(/>/g,"&gt;");
	str = str.replace(/</g,"&lt;");
	str = str.replace(/"/g,"&quot;");
	str = str.replace(/'/g,"&#39;");
	return str;
}

/*
*	desc		html字符安全过滤
*	author		kidxiong
*	ex			string.toSafe()
*/
String.prototype.toSafe = function(){
	var str = this.toString();
	str = str.replace(/&amp;/g,"");
	str = str.replace(/&gt;/,"");
	str = str.replace(/&lt;/g,"");
	str = str.replace(/quot;/g,"");
	str = str.replace(/#39;/g,"");
	str = str.replace(/&/g,"");
	str = str.replace(/>/g,"");
	str = str.replace(/</g,"");
	str = str.replace(/"/g,"");
	str = str.replace(/'/g,"");
	str = str.replace(/%3C/g,"");
	str = str.replace(/%3c/g,"");
	str = str.replace(/%3E/g,"");
	str = str.replace(/%3e/g,"");
	str = str.replace(/%+\/v8/g,"");
	return str;
}

String.prototype.Base64 = function(){

}

String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.ltrim=function(){
	return this.replace(/(^\s*)/g,"");
}

String.prototype.rtrim=function(){
	return this.replace(/(\s*$)/g,"");
}


/*
*	desc		判断是否是中文字符
*	author		kidxiong
*	ex			string.isChinese
*/
String.prototype.isChinese = function(){
	var C1 = /[u00-uFF]/;
	var C2 = /[^\x00-\xff]/g;
	return C1.test(this.toString())||C2.test(this.toString());
}

/*
*	desc		获取字符串的长度,对中文有效
*	author		kidxiong
*	ex			string.getStrCnLen()
*/
String.prototype.getStrCnLen = function() {
	var C = 0;
	var str = this.toString();
	var chineseRegex = /[^\x00-\xff]/g;
	var strLength = this.replace(chineseRegex,"**").length;
	for (var i = 0; i < strLength; i++) {
		var _tmp = str.charAt(i);
		if(_tmp.length>=1){
			if (this.isChinese(str.charAt(i)) == true) {
				C = C + 1;
			} else {
				C = C + 0.5
			}
		}
	}
	return Math.floor(C);
}

/*
*	desc			是否是安全字符
*	author			kidxiong
*	ex				string.isSafeChar()
*/
String.prototype.isSafeChar = function(){
	//var reg=/^[\u4E00-\u9FA5a-zA-Z\d^\.、_\-\(\)\[\]\&\s]+$/g;
	var reg = /[&><'"]/g;
	return !reg.test(this.toString());
}

/*
*	desc			添加一个CSS样式文件到文档流中
*	author			kidxiong
*	ex				addCssFileToDocument(url)
*/
function addCssFileToDocument(url){
	if(url.length<4) return ;
	var _linkObjArr = $('link');
	if(_linkObjArr.length>0){
		for(var o in _linkObjArr){
			if($(o).attr('href')==url) return ;
		}
		var css = document.createElement("link");
		css.rel = 'stylesheet';
		css.media = 'screen';
		css.type = "text/css";
		css.href = url;
		$(css).appendTo('HEAD');
	}
	return ;
}

/*
*	desc			固定浮动层的位置
*	author			kidxiong
*	ex				$('#id').floatDiv('center');
*/
jQuery.fn.floatDiv=function(location){
	//ie6要隐藏纵向滚动条
	var isIE6=false;
	if($.browser.msie && $.browser.version=="6.0"){
		$("html").css("overflow-x","auto").css("overflow-y","hidden");
		isIE6=true;
	};
	$("body").css({margin:"0px",padding:"0",
		border:"0px",
		height:"100%",
		overflow:"auto"
	});
	return this.each(function(){
		var loc;//层的绝对定位位置
		if(location==undefined || location.constructor == String){
			switch(location){
				case("rightbottom")://右下角
					loc={right:"0px",bottom:"0px"};
					break;
				case("leftbottom")://左下角
					loc={left:"0px",bottom:"0px"};
					break;	
				case("lefttop")://左上角
					loc={left:"0px",top:"0px"};
					break;
				case("righttop")://右上角
					loc={right:"0px",top:"0px"};
					break;
				case("middle")://居中
					var l=0;//居左
					var t=0;//居上
					var windowWidth,windowHeight;//窗口的高和宽
					//取得窗口的高和宽
					if (self.innerHeight) {
						windowWidth=self.innerWidth;
						windowHeight=self.innerHeight;
					}else if (document.documentElement&&document.documentElement.clientHeight) {
						windowWidth=document.documentElement.clientWidth;
						windowHeight=document.documentElement.clientHeight;
					} else if (document.body) {
						windowWidth=document.body.clientWidth;
						windowHeight=document.body.clientHeight;
					}
					l=windowWidth/2-$(this).width()/2;
					t=windowHeight/2-$(this).height()/2;
					loc={left:l+"px",top:t+"px"};
					break;
				default://默认为右下角
					loc={right:"0px",bottom:"0px"};
					break;
			}
		}else{
			loc=location;
		}
		$(this).css('top',loc.top).css('left',loc.left).css("position","fixed");
		if(isIE6){
			$(this).css('margin-top','').css('margin-left','');
			if(loc.right==undefined){
				//2008-4-1修改：当自定义right位置时无效，这里加上一个判断
				//有值时就不设置，无值时要加18px已修正层位置
				var _r = $(this).css("right");
				if(_r==null || _r=="" || _r=='auto'){
					$(this).css("right","18px");
				}
			}
			$(this).css("position","absolute");
		}
	});
};

/*
*	desc		input控件只能输入数字
*	author		kidxiong
*	ex			$('#id').inputNumber();
*/
jQuery.fn.inputNumber=function(){
	return this.each(function(){
		$(this).val($(this).val().replace(/[^0-9|\.]*/g,''));
	});
};

/*
*	desc		得到对象的绝对位置
*	author		kidxiong
*	ex			$('#id').absolutePosition();
*/
jQuery.fn.absolutePosition=function(){
	var e=$(this)[0];
	if(typeof(e)=='undefined')
		return false;
	var Left	=e.offsetLeft;
	var Top		=e.offsetTop;
	var Width	=e.offsetWidth;
	var Height	=e.offsetHeight;
	while(e=e.offsetParent){
		Left+=e.offsetLeft;
		Top+=e.offsetTop;
	}
	return Array(Left,Top,Width,Height);
};

(function($) {
	jQuery.fn.PositionFixed = function(options) {
		var defaults = {
			css:'',
			x:0,
			y:0
		};
		var o = jQuery.extend(defaults, options);
		
		var isIe6=false; //is ie ? yes:ie no: not ie
		if($.browser.msie && parseInt($.browser.version)==6)
			isIe6=true;			
		
		var html= $('html');
	if (isIe6 && html.css('backgroundAttachment') !== 'fixed') {
			html.css('backgroundAttachment','fixed') 
		};
		
		return this.each(function() {
		var domThis=$(this)[0];
		var objThis=$(this);
			if(isIe6)
			{
				
				 var left = parseInt(o.x) - html.scrollLeft(),
						top = parseInt(o.y) - html.scrollTop();
					objThis.css('position' , 'absolute');	
					
					domThis.style.setExpression('left', 'eval((document.documentElement).scrollLeft + ' + o.x + ') + "px"');
					domThis.style.setExpression('top', 'eval((document.documentElement).scrollTop + ' + o.y + ') + "px"');
					
			}
			else
			{
				objThis.css('position' , 'fixed').css('top',o.y).css('left',o.x);
			}
		
		});

	};
})(jQuery);

(function(){
	//初始化类，作为命名空间使用
	GyLib = new Object;
	
	/***		文档类		***/
	GyLib.Window = function(){
		this.viewWidth=function(){ 
			var w = 0, D=document; 
			if( D.documentElement && D.documentElement.clientWidth ) { 
				w = D.documentElement.clientWidth; 
			} else if( D.body && D.body.clientWidth ) { 
				w = D.body.clientWidth; 
			}
			return w ; 
		};
		
		this.viewHeight=function(){ 
			var h = 0, D=document; 
			if(document.compatMode!='CSS1Compat'){ 
				h = D.body.clientHeight; 
			}else{ 
				if( D.documentElement && D.documentElement.clientHeight ) { 
					h = D.documentElement.clientHeight; 
				} else if( D.body && D.body.clientHeight ) { 
					h = D.body.clientHeight; 
				} 
			}
			return h; 
		};
		
		this.contentWidth = function(){
			return Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth);
		}
		
		this.contentHeight = function(){
			return Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight);
		}
		
		this.scrollTop = function(){
			var t=0;
			if(document.documentElement&&document.documentElement.scrollTop)
			{
				t=document.documentElement.scrollTop;
			}
			else if(document.body)
			{
				t=document.body.scrollTop;
			}
			return t;
		}
		
		this.viewSize=function(){return {width:this.viewWidth(),height:this.viewHeight(),top:this.scrollTop()}};
		this.contentSize = function(){return {width:this.contentWidth(),height:this.contentHeight()}};
		this.maskSize = function(){return {width:this.viewWidth(),height:this.contentHeight()}};
		
		return this;
	}
	/***		文档类结束		***/
	
	/***		URL类		***/
	GyLib.Url = function(){
		var _paraArr=[];
		var _baseUrl = '';
		var _paraCnt = 0;
		var _flag = false;
		
		function _getParas(){
			if(_flag == false){
				var _paraString = window.location.search.replace(/.*\?/,"").split("&");
				var j='';
				for (var i=0; j=_paraString[i]; i++){
					_paraArr[j.substring(0,j.indexOf("=")).entities()] = j.substring(j.indexOf("=")+1,j.length).entities();
					_paraCnt++;
				}
				var _url_array = window.top.location.href.split("?");
				_baseUrl =_url_array[0];
				_flag = true;
			}
		}
		
		this.getParas = function(){
			_getParas();
			return _paraArr;
		}
		
		this.getPara = function(name){
			if(_flag == false){
				this.getParas();
			}
			return typeof(_paraArr[name])=='undefined' ? '' :_paraArr[name];
		}
		
		this.getBaseUrl = function(){
			if(_flag == false){
				this.getParas();
			}
			return _baseUrl;
		}
		
		this.getFullUrl = function(){
			return window.location.href;
		}
		return this;
	}
	
	GyLib.Url.prototype.flag = false;
	/***		URL类结束		***/
	
	/***		COOKIE类		***/
	GyLib.Cookie = function(){
		this.set = function(key,val,expires, path, domain){
			var _str = key + "=" + escape(val) + ((expires) ? "; expires=" + expires.toGMTString(): "") + ((path) ? "; path=" + path: "; path=/") + ((domain) ? "; domain=" + domain: "");
			document.cookie = _str;
		}
		this.get = function(key){
			var filterXSS = function(e) {
				if (!e) return e;
				for (; e != unescape(e);) e = unescape(e);
				for (var r = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], n = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], a = 0; a < r.length; a++) e = e.replace(new RegExp(r[a], "gi"), n[a]);
				return e;
		   };
			var _arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
			return filterXSS(_arr != null ? unescape(_arr[2]) : '');
		}
		this.clear = function(key,val,path,domain){
			var _val = this.get(key);
			if(this.get(key).length>0){
				var date=new Date(); 
				date.setTime(date.getTime()-24*60*60*30*365);
				this.set(key,'',date,path,domain);
			}
			var _val = this.get(key);
		}
		this.setGyToken = function(){
			var str = this.get('skey'),hash = 5381;
			for(var i = 0, len = str.length; i < len; ++i)
			{
				hash += (hash << 5) + str.charAt(i).charCodeAt();
			}
			return hash & 0x7fffffff;
		}
		return this;
	}
	/***		COOKIE类结束		***/
	
	GyLib.Effect = new Object;
	
	/********	特效类   ***/
	GyLib.Effect.Mask = function(options){
		var defaults={
			id:'GyLib_MaskDiv',
			bgcolor:'#333',
			opacity:1
		}
		
		var _opts = $.extend(defaults,options);
		var _maskDiv = null;
		GyLib.Effect.Mask.handlerID = 0;
		
		this.create = function(){
			_maskDiv = $('#'+_opts.id);
			if(_maskDiv[0]==null){
				_maskDiv = $("<div id='"+_opts.id+"' class='maskDiv' style='filter:alpha(Opacity="+_opts.opacity*100+");opacity:"+_opts.opacity+"'></div>").prependTo('body');
				var win = GyLib.Window().maskSize();
				_maskDiv.css('width',win.width+'px').css('height',win.height+'px');
			}
			GyLib.Effect.Mask.handlerID = _opts.id;
			return this;
		}
		
		this.get = function(){
			if(_maskDiv[0]==null)
				this.create();
			return _maskDiv;
		}
		
		this.getIndex = function(){
			if(_maskDiv[0]==null)
				this.create();
			return parseInt(_maskDiv.css('zIndex'));
		}
		
		this.getId = function(){
			if(_maskDiv[0]==null)
				this.create();
			return _maskDiv.attr('id');
		}
		
		this.show = function(){
			$('#'+_opts.id).css('position','absolute').show();
		}
		
		this.hide = function(){
			$('#'+_opts.id).hide().css('position','none');
		}
		
		GyLib.Effect.Mask.setIndex=function(zIndex){
			$('#'+GyLib.Effect.Mask.handlerID).css('zIndex',zIndex);
		}
		return this;
	}
	/********	特效类结束    ******/
	
	/****		ZIndex管理类	********/
	GyLib.ZIndex = function(){
		this.push = function(id){
			var _obj = $('#'+id);
			if(_obj[0]!=null){
				if(id!=GyLib.ZIndex.__max_id__){
					var _tmp = $('#'+GyLib.ZIndex.__max_id__);
					var zIndex = parseInt(_tmp.css('zIndex'));
					zIndex++;
					if(_tmp[0]==null){
						GyLib.ZIndex.__max_id__ = id;
						
					}
					else if(id!=GyLib.ZIndex.__max_id__){
						GyLib.ZIndex.__max_id__ = id;
						_obj.css('zIndex',zIndex);
					}
					GyLib.ZIndex.Arr[id]=zIndex;
				}
				
				if(id!=GyLib.ZIndex.__min_id__){					
					var _tmp = $('#'+GyLib.ZIndex.__min_id__);
					if(_tmp[0]==null || zIndex<parseInt(_tmp.css('zIndex'))){
						GyLib.ZIndex.__min_id__ = id;
					}
					GyLib.ZIndex.Arr[id]=zIndex;
				}
			}
		}
		
		this.toTop = function(id){
			var _obj = $('#'+id);
			if(_obj[0]!=null){
				var zIndex = parseInt(_obj.css('zIndex'));
				GyLib.ZIndex.Arr[id]=zIndex;
				if(id!=GyLib.ZIndex.__max_id__){
					var _tmp = $('#'+GyLib.ZIndex.__max_id__);
					var _max_index = parseInt(_tmp.css('zIndex'));
					if(_tmp[0]!=null)
						_tmp.css('zIndex',zIndex);
					
					_obj.css('zIndex',_max_index+1);
					GyLib.ZIndex.__max_id__ = id;
				}
			}	
		}
		
		this.getIndex = function(id){
			var _obj = $('#'+id);
			if(_obj[0]!=null){
				return parseInt(_obj.css('zIndex'));
			}
		}
		
		this.unpush = function(id){
			
		}
		return this;
	}
	
	GyLib.ZIndex.Arr = [];
	GyLib.ZIndex.__max_id__ = '';
	GyLib.ZIndex.__min_id__ = '';
	GyLib.ZIndex.__max_index__ = 0;
	/****		ZIndex管理类结束	********/
	
	
	/***************
	登录和退出的类
	***************/
	GyLib.Login=function(options){
		//私有变量，默认设置
		var defaults={
			id:'GyLib_loginDiv',
			title:'公益网用户登录',
			returnUrl:'',
			type:'',
			isClose:1,
			isFixed:1,
			callback:function(){},
			fullUrl:'',
			target:'self',
			hideTitleBar:0,
			opacity:0.9
		};
		
		var _opts = $.extend(defaults,options);
		var _bgcolor = '&bgcolor=FFFFFF';
		var _uin = '&uin=';
		var _reset_text = '&reset_text=%D6%D8%CC%EE';
		var _f_url = "&f_url=loginerroralert";
		var _low_login = '&low_login=0';
		var _hide_title_bar = '&hide_title_bar='+_opts.hideTitleBar;
		var _hide_close_icon = '&hide_close_icon='+(parseInt(_opts.isClose)==1?0:1);
		var _appid = '&appid=30000101';
		var _style = '&style=0';
		var _target = '&target='+_opts.target;
		var _hide_uin_tip = '&hide_uin_tip=0';
		var _requestStr='';
		var _maskObj;
		
		//私有函数
		function init(){
		}
		
		//获取是否存在登录用的div，如果不存在，则新建一个插入到dom树中
		function getLoginDiv(){
			_opts.loginDiv = $('#'+_opts.id);
			/*
			if(_opts.loginDiv[0]==null){
				var _maskObj = GyLib.Effect.Mask({id:_opts.id});
				_maskObj.create();
				
				//_opts.loginDiv = _maskObj.get();
				
				_opts.loginDiv = $("<div id='"+_opts.id+"' style='position:absolute;display:none;left: 0; top: 0; width:1px; height:1px; padding:0; margin:0px;z-index:9999;background-color:#fff'></div>").appendTo('body');
			}
			*/
			
			var zIndex=0;
			GyLib.Login.__mask_div_id__ = _opts.id+'_mask_';
			_maskObj = GyLib.Effect.Mask({id:GyLib.Login.__mask_div_id__,opacity:_opts.opacity});
			_maskObj.create();
			GyLib.ZIndex().push(GyLib.Login.__mask_div_id__);
			zIndex = _maskObj.getIndex();
			
			_maskObj.show();
			
			if(_opts.loginDiv[0]==null){
				_opts.loginDiv = $("<div id='"+_opts.id+"' style='position:absolute;display:none;left: 0; top: 0; width:1px; height:1px; padding:0; margin:0px;z-index:9999;background-color:#fff'></div>").appendTo('body');
			}
			else
				_opts.loginDiv.css('zIndex',9999).css('position','absolute');
			GyLib.ZIndex().push(_opts.id);
			if(9999<=zIndex){
				zIndex++;
				_opts.loginDiv.css('zIndex',zIndex);
			}
			
			if(GyLib.Login.prototype.lastRequestStr[_opts.id] != _requestStr){
				_opts.loginDiv.find('#login_frame').remove();
				$("<iframe name='login_frame' id='login_frame' style='position:absolute;left:-10000px;' frameborder='0' scrolling='auto' src=''></iframe>").prependTo(_opts.loginDiv);
			}
		}
		
		//拼接传递给ptlogin接口的参数
		function getRequestStr(){
			if(_requestStr!='')
				return ;
			if(_opts.title=='')
				_opts.title='公益网用户登录';
			if(_opts.type==''||opts.type!='npo')
				_opts.cgiurl = 'http://pay.gongyi.qq.com/cgi-bin/Login';
			else
				_opts.cgiurl = 'http://pay.gongyi.qq.com/cgi-bin/NpoLogin';
			//alert("_opts.returnUrl  000  :"+_opts.returnUrl);
			if(_opts.returnUrl.length<1){
				_opts.returnUrl = GyLib.Url().getFullUrl();
			}
			if(_opts.fullUrl=='')
				_opts.fullUrl = "s_url="+escape(_opts.cgiurl+"?"+Math.random()+"&rebackurl="+escape(_opts.returnUrl));
			else
				_opts.fullUrl = "s_url="+escape(_opts.fullUrl);
				
			var qlogin_jump = '';
			if(_opts.type.toLocaleLowerCase()=='npo'){
				qlogin_jump = '&qlogin_jumpname=GonyiYiPtLogin2&qlogin_param='+escape(Math.random()+'rebackurl='+escape(_opts.returnUrl)+'&qlogin_auto_login=0');
			}
			else
				qlogin_jump = '';
				
			_requestStr=_opts.fullUrl+_bgcolor+'&title='+_opts.title+_uin+_reset_text+_f_url+_low_login+_hide_title_bar+_hide_close_icon+_appid+_style+_target+_hide_uin_tip+qlogin_jump;
			
			var firstChar = _requestStr.substr(0,1);
			var url = 'http://ui.ptlogin2.qq.com/cgi-bin/login';
			if(firstChar=='?')
				_requestStr = url+_requestStr;
			else if(firstChar == '&')
				_requestStr = url+'?1=1'+_requestStr;
			else
				_requestStr = url+'?'+_requestStr;
		}
		
		function _setIframePosition(loginFrame,win){
			if(_opts.isFixed){
				//loginFrame.floatDiv("middle");
				/*
				win.width = (win.width-loginFrame.width())/2;
				win.width = win.width<0?0:win.width;
				loginFrame.PositionFixed({x:win.width,y:50}); 
				*/
				win.width = (win.width-loginFrame.width())/2;
				win.width = win.width<0?0:win.width;
				var _h = loginFrame.height()<1?490:loginFrame.height();
				win.height = (win.height-_h)/2;
				win.height = win.height<0?0:win.height;
				loginFrame.PositionFixed({x:win.width,y:win.height}); 
			}
			else{
				win.width = (win.width-loginFrame.width())/2;
				win.height = (win.height-loginFrame.height())/2;
				win.width = win.width<0?0:win.width;
				win.height = win.height<0?0:win.height;
				loginFrame.css('top',win.height).css('left',win.width);
			}
		}
		
		this.init = function(loginFrame){
			getRequestStr();
			getLoginDiv();
		};
		
		this.showDiv = function(){
			$('.ie6hide').hide();
			document.domain = 'qq.com';

			var win = GyLib.Window().viewSize();			
			loginFrame = _opts.loginDiv.find('#login_frame');
			//$('#'+_opts.id).css('display','block');
			_opts.loginDiv.css('display','block');
			
			if(GyLib.Login.prototype.lastRequestStr[_opts.id] != _requestStr){
				loginFrame.attr('src',_requestStr);
				
				if (loginFrame[0].attachEvent){
					loginFrame[0].attachEvent("onload", function(){
						_setIframePosition(loginFrame,win);
					});
					loginFrame.show();
				} else {
					loginFrame[0].onload = function(){
						_setIframePosition(loginFrame,win);
					};
					loginFrame.show();
				}
			}
			else{
				_setIframePosition(loginFrame,win);
				loginFrame.show();
			}
			
			GyLib.Login.prototype.lastRequestStr[_opts.id] = _requestStr;
			GyLib.Login.handlerID = _opts.id;	
		}
		
		this.close = function(){
			$('#'+_opts.id).find('#login_frame').css('top','-10000px').css('position','').css('zIndex',0);
			$('#'+_opts.id).css('position','').hide();
			GyLib.ZIndex().unpush('#'+GyLib.Login.__mask_div_id__);
			$('.ie6hide').show();
		}
		
		this.setToTop = function(){
			GyLib.ZIndex().toTop(GyLib.Login.__mask_div_id__);
			var zIndex = GyLib.ZIndex().getIndex(GyLib.Login.__mask_div_id__);
			zIndex++
			$('#'+GyLib.Login.handlerID).css('zIndex',zIndex);
		}
		
		//类函数
		GyLib.Login.func1 = function(){alert('func1')};
		//私有函数
		function init1(){
			alert("this is init");
		}
		
		GyLib.Login.setIndex=function(zIndex){
			$('#'+GyLib.Login.handlerID).css('zIndex',zIndex);
		}
		
		return this;
	}
	
	GyLib.Login.currentObj = this;
	GyLib.Login.prototype.lastRequestStr=[];
	GyLib.Login.lastRequestStr1='';
	GyLib.Login.__mask_div_id__ = 0;
	
	//类函数
	GyLib.Login.on = function(initObj){
		if(typeof(initObj)!='object')
			initObj = {};
		var _login = new GyLib.Login(initObj);
		_login.init();
		_login.showDiv();
	};
	
	GyLib.Login.out = function(callback){
		var _cookie = new GyLib.Cookie();
		_cookie.clear("uin","","/","qq.com");
		_cookie.clear("skey","","/","qq.com");
		_cookie.clear("uin_cookie","","/","qq.com");
		_cookie.clear("verifysession","","/","qq.com");
		_cookie.clear("adid","","/","qq.com");
		_cookie.clear("euin_cookie","","/","qq.com"); 
		_cookie.clear("GY_G_DONATOR","","/","gongyi.qq.com"); 
		_cookie.clear("GY_qqnick","","/","gongyi.qq.com"); 
		_cookie.clear("GY_ThisDo_Url","","/","gongyi.qq.com");
		_cookie.clear("GY_Npoobject","","/","gongyi.qq.com");
		_cookie.clear("GY_DEFAULTFOCUS","","/","gongyi.qq.com");
		_cookie.clear("gy_skey","","/","gongyi.qq.com");
		_cookie.clear("gy_bskey","","/","gongyi.qq.com");
		if(typeof(callback)=='function')
			callback();
		else
			 window.location.reload();
	}
	
	GyLib.Login.close = function(){
		$('#'+GyLib.Login.handlerID).find('#login_frame').css('top','-10000px').css('position','').hide();
		$('#'+GyLib.Login.handlerID).css('position','').hide();
		var _maskObj = $('#'+GyLib.Login.__mask_div_id__);
		if(_maskObj[0]!=null){
			_maskObj.css('position','').hide();
		}
		$('.ie6hide').show();
	}
	/***************
	登录和退出的类  结束
	***************/
	
	/***************
	捐赠类
	***************/
	
	GyLib.Donate=function(options){
		//私有变量，默认设置
		var defaults={
			projectData:{},
			id:'GyLib_donateDiv',
			isMask:0,
			maskDivId:'GyLib_maskDiv',
			isFixed:1,
			opacity:0.9,
			showTab:0
		};
		
		var _opts = $.extend(defaults,options);
		_opts.nologinProjectArr = [];
		var _donateObj;
		var _formObj;
		var _donateDiv;
		var _maskObj;
		
		function _setDonateDiv(){
			_donateDiv = _formObj.find('#dd_wrap');
			_donateDiv.empty();
			if(_donateDiv[0]==null){
				var _donateDiv = $('<div id="dd_wrap" class="dd_wrap"></div>');
			}
			
				$('<div class="dd_header clearfix">\
					<h3><strong id="dd_title1" style="font-size:14px;float:left">单笔捐款项目</strong><div style="float:left">&nbsp;──&nbsp;</div><div id="dd_title2" style="font-size:14px;width:320px;height:25px;overflow:hidden;float:left"></div></h3>\
					<a href="javascript:GyLib.Donate.close();" title="关闭">X</a>\
					</div>').appendTo(_donateDiv);
				//if(_opts.projectData.type!=1)
				
				var _cookie_obj = GyLib.Cookie();
				var _isCardDonate= 0 || _cookie_obj.get("cd_key");
				if(_isCardDonate==0){
					var _gylib_url_obj = GyLib.Url();
					var _url = _gylib_url_obj.getFullUrl();
					if(_url.indexOf('cdkey')>=0){
						_isCardDonate = 1;
						var expires = new Date();
						expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000); //1年有效
						_cookie_obj.set("cd_key",1,expires);
					}
				}	
				var _tmpStr = '';
				
				if(_isCardDonate == 1){
					_tmpStr = '<li id="pageC" style="border-left:1px solid #ddd;border-right:0"><a href="javascript:;" name="item4">月捐卡捐款</a></li>';
					
				}
				
				$('<div class="dd_tab" id="ddTab"><ul class="clearfix"><li class="current" id="pageM"><a href="javascript:;" name="item1">月捐（个人）</a></li><li id="pageD"><a href="javascript:;" name="item2">双人捐</a></li><li id="pageL" style="border-right:0"><a href="javascript:;" name="item3">单笔捐款</a></li>'+_tmpStr+'</ul></div>').appendTo(_donateDiv);
				
				var _contDiv = $('<div class="dd_cont" style="border:1px solid #fff"></div>').appendTo(_donateDiv);
				
				$('<div class="dd_item" id="dd_monthDonate" style="display: block;" style="border:1px solid #fff">\
					<ul style="border:1px solid #fff">\
						<li><label> 月捐定额：</label>10元/月</li>\
						<li><label>QQ号码：</label><span id="qq1"></span><span class="dd_tips">（每月发送项目反馈邮件）</span><input type="hidden" name="qq" id="qq" value=""/></li>\
						<li class="dd_pay clearfix"><label>支付方式：</label>\
							<ul class="clearfix paymethod">\
								<li class="current"><input type="radio" id="pay_method1" group="month" value="8001" name="pay" checked="check"><label for="id1">财付通余额</label></li>\
								<li><input type="radio" id="pay_method2" value="8104" group="month" name="pay"><label for="id2">快捷支付</label></li>\
								<li><input type="radio" value="8002" id="pay_method3" group="month" name="pay"><label for="id3">网上银行</label></li>\
							</ul></li>\
						<li class="dd_bless">\
							<label for="myBless">我的祝福：</label>\
							<textarea name="memo" id="memo" cols="40" rows="3"></textarea>\
						</li>\
					</ul>\
					<a href="javascript:;" onclick="GyLib.Donate.submitForm()" class="dd_btn">确认捐款</a>\
					<div style="border:1px solid #fff" class="dd_footer clearfix">\
						<input type="checkbox" name="xiyiobject" id="xiyiobject"  checked="checked" />\
						<label for="userAgreement">1.使用财付通余额、快捷支付每月自动捐款10元，同意并接受《<a href="https://www.tenpay.com/v2.0/main/trust/trust_service.shtml" target="_blank">财付通委托代扣协议</a>》《<a href="http://gongyi.qq.com/term.htm" target="_blank">腾讯公益网用户协议</a>》;<br>2.使用网上银行，需每月登录个人中心续捐。</label>\
					</div></div>').appendTo(_contDiv);
					
				$('<div class="dd_item" id="dd_togetherDonate" style="border:1px solid #fff">\
					<ul style="border:1px solid #fff">\
						<li><label> 月捐定额：</label>20元/月<span class="dd_tips">（每人每月10元）</span></li>\
						<li><label>捐款QQ号码：</label><span id="qq2"></span><span class="dd_tips">（每月发送项目反馈邮件）</span><input type="hidden" name="qq" id="qq" value=""/></li>\
						<li class="dd_qq">\
							<label for="qqNum" style="line-height:27px">他/她的QQ号码：</label>\
							<input type="text" name="othr_qq" id="othr_qq" value="" maxlength="11" />\
							<span class="dd_tips">（每月向两个QQ号码发送反馈邮件）</span>\
						</li>\
						<li class="dd_pay clearfix">\
							<label>支付方式：</label>\
							<ul class="paymethod">\
								<li class="current"><input type="radio" id="pay_method4" group="together" value="8001" name="pay1" checked="check"><label for="id4">财付通余额</label></li>\
								<li><input type="radio" value="8104" id="pay_method5" group="together" name="pay1"><label for="id5">快捷支付</label></li>\
								<li><input type="radio" id="pay_method6" group="together" value="8002" name="pay1"><label for="id6">网上银行</label></li>\
							</ul>\
						</li>\
						<li class="dd_bless">\
							<label for="myBless">我的祝福：</label>\
							<textarea name="memo" id="memo" cols="40" rows="3"></textarea>\
						</li>\
					</ul>\
					<a href="javascript:;" onclick="GyLib.Donate.submitForm()" class="dd_btn">确认捐款</a>\
					<div style="border:1px solid #fff" class="dd_footer clearfix">\
						<input type="checkbox" name="xiyiobject" id="xiyiobject"  checked="checked" />\
						<label for="userAgreement">\
							1.使用财付通余额、快捷支付每月自动捐款20元，同意并接受《<a href="https://www.tenpay.com/v2.0/main/trust/trust_service.shtml" target="_blank">财付通委托代扣协议</a>》《<a href="http://gongyi.qq.com/term.htm" target="_blank">腾讯公益网用户协议</a>》;<br>2.使用网上银行，需每月登录个人中心续捐。</label>\
					</div></div>').appendTo(_contDiv);
					
				$('<div class="dd_item" id="dd_hashDonate" style="border:1px solid #fff" >\
					<ul style="border:1px solid #fff">\
						<li class="dd_num clearfix">\
							<label>捐款金额：</label>\
							<a href="javascript:;" id="money_50" class="current d_donate_money">50元</a>\
							<a href="javascript:;" id="money_100" class="d_donate_money">100元</a>\
							<a href="javascript:;" class="d_donate_money" id="money_200">200元</a>\
							<div id="dd_othernum" class="dd_othernum">\
								<label style="height:24px;line-height:24px" for="">其他</label>\
								<input type="text" id="amountelse" style="height:14px" name="amountelse" value="" maxlength="8" />\
								<span>元</span>\
							</div>\
						</li>\
						<li class="dd_qq">\
							<label for="qqNum">QQ号码：</label>\
							<input type="text" readonly="true" name="qq" id="qq" value="" maxlength="11" />\
							<span class="dd_tips">（项目动态向此QQ号码反馈）</span>\
						</li>\
						<li class="dd_bless">\
							<label for="myBless">我的祝福：</label>\
							<textarea id="memo" name="memo" cols="40" rows="3"></textarea>\
						</li>\
					</ul>\
					<a href="javascript:;" onclick="GyLib.Donate.submitForm()" class="dd_btn">确认捐款</a>\
					<div style="border:1px solid #fff" class="dd_footer dd_footer2 clearfix">\
						<input type="checkbox" id="xiyiobject" checked="checked" checked="checked" />\
						<label for="userAgreement">\
							同意并接受《<a href="http://gongyi.qq.com/term.htm" target="_blank">腾讯公益网用户协议</a>》\
						</label>\
					</div><input type="hidden" value="5000" id="amount_input" name="amount_input"></div>').appendTo(_contDiv);
					
				if(_isCardDonate==1){
					$('<div class="dd_item" id="dd_cardDonate" style="border:1px solid #fff;display:none" >\
						<ul style="border:1px solid #fff">\
							<li class="dd_qq clearfix">\
								<label>月捐卡序列号：</label>\
								<input type="text" id="cdkey" style="width:265px;" name="cdkey" value="" />\
							</li>\
							<li class="dd_num clearfix">\
								<label>捐赠金额：</label>10元<input id="amount" name="amount" type="radio" value="1000" style="display:none"/>\
							</li>\
							<li class="dd_qq">\
								<label for="qqNum">QQ号码：</label>\
								<input type="text" readonly="true" name="qq" id="qq" value="" maxlength="11" />\
							</li>\
							<li class="dd_bless">\
								<label for="myBless">我的祝福：</label>\
								<textarea id="memo" name="memo" cols="40" rows="3"></textarea>\
							</li>\
						</ul>\
						<a href="javascript:;" onclick="GyLib.Donate.submitForm()" class="dd_btn">确认捐款</a>\
						<div style="border:1px solid #fff" class="dd_footer dd_footer2 clearfix">\
							<input type="checkbox" id="xiyiobject" checked="checked" checked="checked" />\
							<label for="userAgreement">\
								同意并接受《<a href="http://gongyi.qq.com/term.htm" target="_blank">腾讯公益网用户协议</a>》\
							</label>\
						</div><input type="hidden" value="5000" id="amount_input" name="amount_input"></div>').appendTo(_contDiv);
					}
				
				_donateDiv.appendTo(_formObj);
				
				$.each(['50','100','200'],function(i,n){
					$('#money_'+n).bind('click',function(){
						$('#amountelse').val('');
						$('#amount_input').val(n*100);
						$('#amount').val(n*100);
						$('.d_donate_money').removeClass('current');
						$(this).addClass('current');
						$('#dd_othernum').removeClass('dd_othernum_focus');
					});
				});
				
				$.each([1,2,3,4,5,6],function(i,n){
					$('#pay_method'+n).bind('click',function(){
						var index = n%3-1;
						var _p = $(this).parent().parent();
						_p.find('li').removeClass('current');
						_p.find('li').eq(index).addClass('current');
						$('#bank_type').val($(this).val());
					});
				});
				
				$('.paymethod li').each(function(i,n){
					$(this).bind('click',function(){
						$(this).find('input')[0].click();
					});
				});
				
				$('#amountelse').bind('focus',function(){
					$('.d_donate_money').removeClass('current');
					$('#dd_othernum').addClass('dd_othernum_focus');
				}).bind('blur',function(){
					var _money = $('#amountelse').val()	*100;
					$('#amount').val(_money);
					$('#amount_input').val(_money);
				}).bind('keyup',function(){
					$(this).inputNumber();
				});
				
				_donateDiv.find('#other_amount').bind('click',function(){
					//GyLib.Donate.moneyInput($(this).val());
					$(this).inputNumber();
				});
				
				_donateDiv.find('input[name="amountelse"]').bind('keyup',function(){
					$(this).inputNumber();
				});
				
				_donateDiv.find('input[name="qq"]').bind('keyup',function(){
					$(this).inputNumber();
				});
				
				_donateDiv.find('#othr_qq').bind('keyup',function(){
					$(this).inputNumber();
				});
				
				_donateDiv.find('#xiyiobject').bind('change',function(){
					GyLib.Donate.showErrBorder(this);
				});
				
				_donateDiv.find('#loveplancheck').bind('change',function(){
					GyLib.Donate.showErrBorder(this);
				});
				
				_donateDiv.find('#pageM').bind('click',function(){
					GyLib.Donate.change(0);
				});
				_donateDiv.find('#pageL').bind('click',function(){
					GyLib.Donate.change(1);
				});
				_donateDiv.find('#pageD').bind('click',function(){
					GyLib.Donate.change(2);
				});
				_donateDiv.find('#pageC').bind('click',function(){
					GyLib.Donate.change(3);
				});
				
				_donateDiv.find('input[name=amount_input]').bind('change',function(){
					if($(this).val()!=-1){
						$('#ProjectDonateion_other_num_div').hide();
						$('#amountelse').val('');
					}
					else{
						$('#ProjectDonateion_other_num_div').show();
						$('#amountelse').val('');
					}
				});			
			//}
			_donateDiv.find('#dd_title2').text(_opts.projectData.title);	
			
			if(_opts.projectData.type==0){
				_donateDiv.find('#ddTab').show();
				GyLib.Donate.change(GyLib.Donate.__sub_donate_type__);
			}
			else if(_opts.projectData.type==1 || _opts.projectData.type==4){
				_donateDiv.find('#ddTab').hide();
				GyLib.Donate.change(_opts.projectData.type);
			}				
		}
		
		function _getDonateObj(){
			_donateObj = $('#'+_opts.id);
			var zIndex=0;
			if(_opts.isMask){
				GyLib.Donate.__mask_div_id__ = _opts.id+'_mask_';
				_maskObj = GyLib.Effect.Mask({id:GyLib.Donate.__mask_div_id__,opacity:_opts.opacity});
				_maskObj.create();
				GyLib.ZIndex().push(GyLib.Donate.__mask_div_id__);
				zIndex = _maskObj.getIndex();
				_maskObj.show();
			}
			if(_donateObj[0]==null){
				_donateObj = $('<div class="dialog_donation" id="'+_opts.id+'"></div>').appendTo('body');
			}
			else
				_donateObj.css('zIndex',9999);
			GyLib.ZIndex().push(_opts.id);
			if(9999<=zIndex){
				zIndex++;
				_donateObj.css('zIndex',zIndex);
			}
		}
		
		function _setFormObj(){
			_formObj = _donateObj.find('#donateForm');
			if(_formObj[0]==null){
				if(_opts.projectData.type==0){
					_formObj = $('<form target="_blank" style="border:1px solid #525252" id="donateForm" name="MonthlyForm_payrequest" method="get" action="'+GyLib.Donate.__monthly_submit_url__+'"></form>').appendTo(_donateObj);
				}
				else if(_opts.projectData.type==1 || _opts.projectData.type==4){
					_formObj = $('<form style="border:1px solid #525252" target="_blank" id="donateForm" name="ProjectDonateion_payrequest" method="get" action="'+GyLib.Donate.__hash_submit_url__+'"></form>').appendTo(_donateObj);
					$('<input type="hidden" id="nickname" name="nickname" value="">').appendTo(_formObj);
					$('<input type="hidden" id="prepaymonth" name="prepaymonth" value="">').appendTo(_formObj);
				}
				$('<input type="hidden" id="amount" name="amount" value="1000">').appendTo(_formObj);
				$('<input type="hidden" id="clientkey" name="clientkey" value="">').appendTo(_formObj);
				$('<input type="hidden" id="Metch_id" name="Metch_id" value="ProjectDonateion">').appendTo(_formObj);
				$('<input type="hidden" id="Fund_Id" name="Fund_Id" value="">').appendTo(_formObj);
				$('<input type="hidden" id="Prog_id" name="Prog_id" value="">').appendTo(_formObj);
				$('<input type="hidden" id="Even_Id" name="Even_Id" value="">').appendTo(_formObj);
				$('<input type="hidden" id="Even_Name" name="Even_Name" value="">').appendTo(_formObj);
				$('<input type="hidden" id="methodstr" name="methodstr" value="">').appendTo(_formObj);
				$('<input type="hidden" id="comewhere" name="comewhere" value="">').appendTo(_formObj);
				$('<input type="hidden" id="bank_type" name="bank_type" value="">').appendTo(_formObj);
				$('<input type="hidden" id="F_type" name="F_type" value="">').appendTo(_formObj);
				$('<input type="hidden" id="g_tk" name="g_tk" value="">').appendTo(_formObj);
				$('<input type="hidden" id="g_flag" name="gf" value="PC">').appendTo(_formObj);
				$('<input type="hidden" id="g_type" name="gt" value="">').appendTo(_formObj);
			}
			_setDonateDiv();
		}
		
		function _setFormUnitVal(){
			if(_opts.projectData.type==0){//月捐
				var _name = _opts.projectData.title;
			}
			else if(_opts.projectData.type==1 || _opts.projectData.type==4){//散捐
				var _name = _opts.projectData.title;
			}
			
			var fclientkey = "";
			var clientkey = "";
			var clientuin = "";
			
				
			var _gylib_url_obj = GyLib.Url();
			var _cookie_obj = GyLib.Cookie();
			
			clientkey = _gylib_url_obj.getPara("clientkey");
			if(clientkey==""){
				var ADUIN = _gylib_url_obj.getPara("ADUIN");
				if(ADUIN!="") clientkey = "QQ0807";
			}else{
				if(clientkey.length>20)	{
					clientkey = "QQ0807";
					fclientkey = clientkey;
				}
			}
			
			clientuin = _gylib_url_obj.getPara("clientuin");
			if(clientuin == "")
				clientuin = _gylib_url_obj.getPara("ADUIN");
			if(clientkey)
				_cookie_obj.set("GY_ckey",clientkey,'','',"gongyi.qq.com");
				
			if(!clientkey) 
				clientkey = _cookie_obj.get("GY_ckey");
				
			var P_STR = new Array("","","");
			var P_STR_TMP = new Array("","","");
			var _gy_p_str = _cookie_obj.get("GY_P_STR");
			var _gy_g_donate = _cookie_obj.get("GY_G_DONATOR");
			if(_gy_p_str){
				P_STR = _gy_p_str.split("^|^");
				if(_gy_g_donate)
					P_STR_TMP = _gy_g_donate.split("^|^"); 
				if(P_STR[0]=="")
					P_STR[0] = P_STR_TMP[1];
				if(P_STR[1]=="")
					P_STR[1] = P_STR_TMP[0];
			}else{
				if(_gy_g_donate)
					P_STR_TMP = _gy_g_donate.split("^|^"); 
				P_STR = new Array(P_STR_TMP[1],P_STR_TMP[0],"");
			}

			var P_TN 	=	P_STR[0]?P_STR[0]:"";
			var P_TQ 	=	P_STR[1]?P_STR[1]:"";
			var P_TC 	=	P_STR[2]?P_STR[2]:"";
			P_TN = P_TN.toSafe();
			P_TQ = P_TQ.toSafe();
			if(P_TC=="")
				P_TC = _cookie_obj.get("QQ_IPAddress");
			P_TC = P_TC.toSafe();
				
			_formObj = _donateObj.find('#donateForm');
			if(clientuin){
				_formObj.find('input[name=qq]').val(clientuin);
				$('#qq1').text(clientuin);
				$('#qq2').text(clientuin);
			}
			else{
				if(typeof(P_TQ)!='undefined'&&P_TQ!='undefined'&&P_TQ.length>=1){
					_formObj.find('input[name=qq]').val(P_TQ);
				}
				else
					_formObj.find('input[name=qq]').removeAttr('readonly');
				$('#qq1').text(clientuin);
				$('#qq2').text(clientuin);
			}
			
			_formObj.find('input[name="city"]').val(P_TC);
			
			var _qq_nick = _cookie_obj.get('GY_qqnick').toSafe();

			if(_qq_nick)
				_formObj.find('input[name="nickname"]').val(_qq_nick);
			else
				_formObj.find('input[name="nickname"]').val(P_TN);
			
			if(clientkey){
				_formObj.find('#clientkey').val(clientkey);
				_formObj.find('#comewhere').val(clientkey);
			}
			else{
				try{
					_formObj.find('#comewhere').val(window.location);
				}
				catch(e)
				{
					_formObj.find('#comewhere').val('');
				}
			}
			
			var _uin = _cookie_obj.get("uin");
			
			if(_uin){
				_uin = _uin.replace(/^o0*/, "");
				_formObj.find('input[name=qq]').val(_uin);
				$('#qq1').text(_uin);
				$('#qq2').text(_uin);
			}
			
			var _invitekeyvalue = _cookie_obj.get("GY_invitekeyvalue");
			if(_invitekeyvalue)
				_formObj.find('#comewhere').val(_invitekeyvalue);
			
			_formObj.find('#Fund_Id').val(_opts.projectData.fundid);
			_formObj.find('#Prog_id').val(_opts.projectData.projid);
			_formObj.find('#Even_Id').val(_opts.projectData.evenid);
			_formObj.find('#Even_Name').val(_name);			
			_formObj.find('#prepaymonth').val('1');
			
			var _metch_id_val = '';
			if(_opts.projectData.type==0)
				_metch_id_val = 'MonthlyForm';
			else if(_opts.projectData.type==1)
				_metch_id_val = 'ProjectDonateion';
			_formObj.find('#Metch_id').val(_metch_id_val);
			
			_formObj.find('#methodstr').val('prog');
			if(typeof _opts.projectData.g_type!='undefined')
				_formObj.find('#g_type').val(_opts.projectData.g_type);
		}
		
		this.show = function(){
			if(_opts.projectData.fundid != GyLib.Donate.__fund_id__ || _opts.projectData.projid != GyLib.Donate.__project_id__){
				GyLib.Donate.__sub_donate_type__ = 0;
			}
				
			GyLib.Donate.handlerID = _opts.id;
			GyLib.Donate.__donate_type__ = _opts.projectData.type;
			GyLib.Donate.__fund_id__ = _opts.projectData.fundid ;
			GyLib.Donate.__project_id__ = _opts.projectData.projid;
			GyLib.Donate.__title__ = _opts.projectData.title;
			
			_getDonateObj();
			//_setDonateObjTitle();
			_setFormObj();
			_setFormUnitVal();
			
			var _cookie_obj = GyLib.Cookie();
			var _uin = _cookie_obj.get("uin");
			var _nologinFlag = false;
			for(var i in _opts.nologinProjectArr){
				if(GyLib.Donate.__project_id__ == _opts.nologinProjectArr[i] )
				{
					_nologinFlag = true;
				}
			}
			if(_nologinFlag==false && _uin.length<5){
				GyLib.Donate.close();
				GyLib.Donate.relogin();
				return false;
			}
			GyLib.Cookie().set('GY_DEFAULTFOCUS','');
			
			_donateObj.show();
			var win = GyLib.Window().viewSize();
			var wrap = $('#dd_wrap');
			if(_opts.isFixed){
				win.width = (win.width-wrap.width())/2;
				win.width = win.width<0?0:win.width;
				var _h = wrap.height()<1?400:wrap.height();
				win.height = (win.height-_h)/2;
				win.height = win.height<0?0:win.height;
				_donateObj.PositionFixed({x:win.width,y:win.height}); 
			}
			else{
				_donateObj.css('position','absolute');
				win.width = (win.width-wrap.width())/2;
				win.height = (win.height-wrap.height())/2;
				win.height+=win.top;
				win.width = win.width<0?0:win.width;
				win.height = win.height<0?0:win.height;
				_donateObj.css('top',win.height).css('left',win.width);
			}
			
			if(GyLib.Donate.lastPID != _opts.projectData.projid && _opts.projectData.type==0){
				_tabArr = ['pageM','pageD','pageL'];
				$('#pageM').removeClass('current');
				$('#pageD').removeClass('current');
				$('#pageL').removeClass('current');
				$('#'+_tabArr[_opts.showTab])[0].click();
			}
			GyLib.Donate.lastPID = _opts.projectData.projid;
		}
		return this;
	}
	
	GyLib.Donate.handlerID = 0;
	GyLib.Donate.lastPID = 0;
	GyLib.Donate.__donate_type__= 0 ;
	GyLib.Donate.__title__ = null;
	GyLib.Donate.__sub_donate_type__ = 0;
	GyLib.Donate.__fund_id__ = 0;
	GyLib.Donate.__project_id__ = 0;
	GyLib.Donate.__mask_div_id__ = 0;
	GyLib.Donate.__monthly_submit_url__ = "http://pay.gongyi.qq.com/cgi-bin/GongyiMonthlyEntry";
	GyLib.Donate.__hash_submit_url__ = "http://pay.gongyi.qq.com/cgi-bin/GongyiDonateEntry";
	GyLib.Donate.__card_submit_url__ = "http://pay.gongyi.qq.com/cgi-bin/GongyiMonthlyCard";
	GyLib.Donate.__double_monthly_submit_url__ = "http://pay.gongyi.qq.com/cgi-bin/GongyiDoubleMonthlyEntry";
	
	GyLib.Donate.__cloud_monthly_submit_url__ = "http://yundonate.gongyi.qq.com/cgi-bin/GongyiMonthlyEntry";
	GyLib.Donate.__cloud_hash_submit_url__ = "http://yundonate.gongyi.qq.com/cgi-bin/GongyiDonateEntry";
	GyLib.Donate.__cloud_card_submit_url__ = "http://pay.gongyi.qq.com/cgi-bin/GongyiMonthlyCard";
	GyLib.Donate.__cloud_double_monthly_submit_url__ = "http://yundonate.gongyi.qq.com/cgi-bin/GongyiDoubleMonthlyEntry";
	//GyLib.Donate.__cloud_activity_submit_url__ = "http://yundonate.gongyi.qq.com/cgi-bin/ActDonateEntry";
	GyLib.Donate.__cloud_activity_submit_url__ = "http://wxdev.gongyi.qq.com/cgi-bin/ActDonateEntry";
	
	GyLib.Donate.show = function(type,title,fundid,projid,isMask,isFixed,showTab){
		$('.ie6hide').hide();
		var donateLayer = new GyLib.Donate({projectData:{
			type:type,
			title:title,
			fundid:fundid,
			projid:projid
		},isMask:isMask,isFixed:isFixed,showTab:showTab});
		donateLayer.show();
	}
	
	GyLib.Donate.show_v2 = function(options){
		/*
		var defaults={
			projectData:{},
			id:'GyLib_donateDiv',
			isMask:0,
			maskDivId:'GyLib_maskDiv',
			isFixed:1,
			opacity:0.9,
			showTab:0
		};*/
		options.isMask = 1;
		options.isFixed = 1;
		options.showTab = 0;
		$('.ie6hide').hide();
		var donateLayer = new GyLib.Donate(options);
		donateLayer.show();
	}
	
	GyLib.Donate.close = function(){
		$('.ie6hide').show();
		$('#'+GyLib.Donate.handlerID).hide();
		var _maskObj = $('#'+GyLib.Donate.__mask_div_id__);
		if(_maskObj[0]!=null)
			_maskObj.hide();
		GyLib.Cookie().set('GY_DEFAULTFOCUS','');
	}
	
	//0:月捐	1：散捐		2：一起捐	3:月捐卡	4:益行家活动
	GyLib.Donate.change = function(type){
		var _donateObj = $('#'+GyLib.Donate.handlerID);
		var _formObj = _donateObj.find('#donateForm');
		var _skey = GyLib.Cookie().setGyToken();
		if(type==0){
			_formObj.attr('action',GyLib.Donate.__monthly_submit_url__);
			_formObj.find("#F_type").val('Monthly');
			_formObj.find('#bank_type').val(_formObj.find('input[name="pay"]:checked').val());
			_formObj.find('#g_tk').val(_skey);
			
			_donateObj.find("#pageM").addClass('current');
			_donateObj.find("#pageC").removeClass('current');
			_donateObj.find("#pageD").removeClass('current');
			_donateObj.find("#pageL").removeClass('current');
			_donateObj.find('input[name="amount"]').val(1000);
			
			_donateObj.find('#dd_title1').html('月捐项目');
			
			$('#dd_hashDonate').hide();
			$('#dd_togetherDonate').hide();
			$('#dd_cardDonate').hide();
			$('#dd_monthDonate').show();
		}
		else if(type==1||type==4){
			if(type==1)
				_formObj.attr('action',GyLib.Donate.__cloud_hash_submit_url__);
			else
				_formObj.attr('action',GyLib.Donate.__cloud_activity_submit_url__);
			_formObj.find("#bank_type").val(8107);
			_formObj.find("#F_type").val('Abandon');
			_formObj.find('#g_tk').val(_skey);
			
			_donateObj.find("#pageL").addClass('current');
			_donateObj.find("#pageC").removeClass('current');
			_donateObj.find("#pageD").removeClass('current');
			_donateObj.find("#pageM").removeClass('current');
			_donateObj.find('input[name="amount"]').val(0);
			$.each(['50','100','200'],function(i,n){
				if($('#money_'+n).hasClass('current')){
					_donateObj.find('input[name="amount"]').val(n*100);
				}
			});
			
			_donateObj.find('#dd_title1').html('单笔捐款项目');
			
			$('#dd_monthDonate').hide();
			$('#dd_togetherDonate').hide();
			$('#dd_cardDonate').hide();
			$('#dd_hashDonate').show();
			
			var _money = $('#amountelse').val();
			if(_money.length>0)
				_donateObj.find('input[name="amount"]').val(_money*100);
			if(_donateObj.find('input[name="amount"]').val()<=0){
				$('#money_50').addClass('current');
				_donateObj.find('input[name="amount"]').val(5000);
			}
		}
		else if(type==2){
			_formObj.attr('action',GyLib.Donate.__double_monthly_submit_url__);
			_formObj.find("#F_type").val('Monthly');
			_formObj.find('#bank_type').val(_formObj.find('input[name="pay1"]:checked').val());
			_formObj.find('#g_tk').val(_skey);
			
			_donateObj.find("#pageD").addClass('current');
			_donateObj.find("#pageC").removeClass('current');
			_donateObj.find("#pageM").removeClass('current');
			_donateObj.find("#pageL").removeClass('current');
			_donateObj.find('input[name="amount"]').val(2000);
			_donateObj.find('#dd_title1').html('月捐项目');
			
			$('#dd_monthDonate').hide();
			$('#dd_hashDonate').hide();
			$('#dd_cardDonate').hide();
			$('#dd_togetherDonate').show();
		}
		else if(type==3){
			_formObj.attr('action',GyLib.Donate.__card_submit_url__);
			_formObj.find("#bank_type").val(8002);
			
			_donateObj.find("#pageC").addClass('current');
			_donateObj.find("#pageD").removeClass('current');
			_donateObj.find("#pageM").removeClass('current');
			_donateObj.find("#pageL").removeClass('current');
			_donateObj.find('input[name="amount"]').val(1000);
			_donateObj.find('#dd_title1').html('月捐项目');
			
			$('#dd_monthDonate').hide();
			$('#dd_hashDonate').hide();
			$('#dd_togetherDonate').hide();
			$('#dd_cardDonate').show();
		}
		GyLib.Donate.__sub_donate_type__ =  type;
	}
	
	GyLib.Donate.relogin = function(){
		var _cookieStr= GyLib.Donate.handlerID+'|'+GyLib.Donate.__donate_type__+'|'+GyLib.Donate.__title__+'|'+GyLib.Donate.__fund_id__+'|'+GyLib.Donate.__project_id__ +'|'+GyLib.Donate.__mask_div_id__+'|'+GyLib.Donate.__sub_donate_type__;

		var expires = new Date();
		expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000); //1年有效
		GyLib.Cookie().set('GY_DEFAULTFOCUS',_cookieStr,expires);
		
		var _returnUrl = GyLib.Url().getFullUrl();
		var _log = new GyLib.Login({returnUrl:_returnUrl});
		
		_log.init();
		_log.showDiv();
		_log.setToTop();
		
		var _maskObj = $('#'+GyLib.Donate.__mask_div_id__);
		if(_maskObj[0]!=null)
			_maskObj.hide();
	}
	
	GyLib.Donate.showErrBorder=function(obj){
		if($(obj)[0].checked)
			$(obj).parent().css('border','#FFFFFF 0px solid');
		else
			$(obj).parent().css('border','#FF0000 1px solid');
	}
	
	GyLib.Donate.checkTogetherDonate = function(){
		if(GyLib.Donate.__sub_donate_type__==2){
			if($('#othr_qq').val()<10000){
				alert("请输入他/她的QQ号码");
				return false;
			}
		}
		return true;
	}
	
	GyLib.Donate.checkCardDonate = function(){
		if(GyLib.Donate.__sub_donate_type__==3){
			var cdkey=$('#cdkey').val();
			if(cdkey=='')
			{
				alert('请输入月捐卡序列号');
				$('#cdkey').focus();
				return false;
			}
		}
		return true;
	}
	
	GyLib.Donate.checkForm=function(type){
	
		var _donateObj = $('#'+GyLib.Donate.handlerID);
		var _donateDiv = _donateObj.find('#dd_wrap');
		var _uin_obj = _donateDiv.find('#qq');
		var _uin = _uin_obj.val();
		if(_uin!="" && _uin < 10000){
			alert("必须录入的捐款QQ号号码不合法，请重新录入");
			_uin_obj[0].focus();
			return false;
		}
	
		if(GyLib.Donate.checkTogetherDonate()!=true)
			return false;
		
		if(GyLib.Donate.checkCardDonate()!=true)
			return false;
		
		var _item=['#dd_monthDonate','#dd_togetherDonate','#dd_hashDonate','#dd_cardDonate'];
		var _index = 0;
		if(GyLib.Donate.__sub_donate_type__!=1){
			_donateDiv.find('#ddTab li').each(function(i,n){
				if($(this).hasClass('current')){
					_index = i;
				}
			});
		}
		else{//散捐
			_index = 2;
		}
		var _xieyi_obj = $(_item[_index]).find('#xiyiobject');
		GyLib.Donate.showErrBorder(_xieyi_obj);
		if(!_xieyi_obj[0].checked) {
			alert('请选择确认《腾讯公益网用户协议》');
			return false;
		}
		
		var _memo_str = $(_item[_index]).find('#memo').val();
		var _memo_len = _memo_str.getStrCnLen();
		if(_memo_len>50){
			alert("您的祝福留言过长，请保留100个字符或50个汉字以内");
			return false;
		}
		

		var _formObj = _donateObj.find('#donateForm');
		_formObj.find('#F_type').val(GyLib.Donate.__donate_type__==1?'Abandon':'Monthly');
		var _money = _donateObj.find('#amount').val();
		if(_money<=0){
			alert('请输入捐助金额');
			return false;
		}
		/*
		if(GyLib.Donate.__donate_type__==0)
			_formObj.find('#amount').val(1000);
		*/
		return true;
	}
	
	GyLib.Donate.submitForm_v2=function(){
		var _donateObj = $('#'+GyLib.Donate.handlerID);
		var _formObj = _donateObj.find('#donateForm');

		var expires = new Date();
		expires.setTime(expires.getTime() + 12 * 30 * 24 * 60 * 60 * 1000); //1年有效
		var _nickname	= _formObj.find('input[name="nickname"]').val();
		var _uin	= _formObj.find('input[name="uin"]').val();
		var _city	= _formObj.find('input[name="city"]').val();	
		var _cookie =_nickname+"^|^"+_uin+"^|^"+_city 
		GyLib.Cookie().set("GY_P_STR",_cookie,expires,'','gongyi.qq.com');
		
		if(GyLib.Donate.__sub_donate_type__==0){
			$('#dd_hashDonate').remove();
			$('#dd_togetherDonate').remove();
			$('#dd_cardDonate').remove();
		}
		else if(GyLib.Donate.__sub_donate_type__==1||GyLib.Donate.__sub_donate_type__==4){
			$('#dd_monthDonate').remove();
			$('#dd_togetherDonate').remove();
			$('#dd_cardDonate').remove();
		}
		else if(GyLib.Donate.__sub_donate_type__==2){
			$('#dd_monthDonate').remove();
			$('#dd_hashDonate').remove();
			$('#dd_cardDonate').remove();
		}
		else if(GyLib.Donate.__sub_donate_type__==3){
			$('#dd_monthDonate').remove();
			$('#dd_hashDonate').remove();
			$('#dd_togetherDonate').remove();
		}
		
		_formObj[0].submit();
		GyLib.Donate.close();
	}
	
	GyLib.Donate.submitForm = function(){
		if(GyLib.Donate.checkForm())
		{
			var _uin = GyLib.Cookie().get("uin");
			var _skey = GyLib.Cookie().get("skey");
			if(_uin==null||_skey==null||_uin.length<1||_skey.length<1)
				GyLib.Donate.submitForm_v2();
			else{
				var _url = "https://www.tenpay.com/app/v1.0/communitylogin.cgi?p_uin="+_uin+"&skey="+_skey+"&u1=&appid=113&win=self";
				var _iframe = $('#tenpay_iframe');
				if(_iframe[0]==null)
					$('<iframe id="tenpay_iframe" frameborder="0px" scroll="no" border="0px" src="'+_url+'" width="1px" height="1px"></iframe>').appendTo('body');
				else
					_iframe.attr('src',_url);
					
				GyLib.Donate.submitForm_v2();
			}
		}
	}
	
	/***************
	捐赠类      结束
	***************/
})(jQuery);

function ptlogin2_onClose(){
	GyLib.Login.close();
	GyLib.Cookie().set('GY_DEFAULTFOCUS','');
}

var JSON;if(!JSON)JSON={};(function(){"use strict";function f(a){return a<10?"0"+a:a}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){if(typeof this.valueOf=='function')return this.valueOf();else return ''}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(h,i){var c,e,d,f,g=gap,b,a=i[h];if(a&&typeof a==="object"&&typeof a.toJSON==="function")a=a.toJSON(h);if(typeof rep==="function")a=rep.call(i,h,a);switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";gap+=indent;b=[];if(Object.prototype.toString.apply(a)==="[object Array]"){f=a.length;for(c=0;c<f;c+=1)b[c]=str(c,a)||"null";d=b.length===0?"[]":gap?"[\n"+gap+b.join(",\n"+gap)+"\n"+g+"]":"["+b.join(",")+"]";gap=g;return d}if(rep&&typeof rep==="object"){f=rep.length;for(c=0;c<f;c+=1)if(typeof rep[c]==="string"){e=rep[c];d=str(e,a);d&&b.push(quote(e)+(gap?": ":":")+d)}}else for(e in a)if(Object.prototype.hasOwnProperty.call(a,e)){d=str(e,a);d&&b.push(quote(e)+(gap?": ":":")+d)}d=b.length===0?"{}":gap?"{\n"+gap+b.join(",\n"+gap)+"\n"+g+"}":"{"+b.join(",")+"}";gap=g;return d}}if(typeof JSON.stringify!=="function")JSON.stringify=function(d,a,b){var c;gap="";indent="";if(typeof b==="number")for(c=0;c<b;c+=1)indent+=" ";else if(typeof b==="string")indent=b;rep=a;if(a&&typeof a!=="function"&&(typeof a!=="object"||typeof a.length!=="number"))throw new Error("JSON.stringify");return str("",{"":d})};if(typeof JSON.parse!=="function")JSON.parse=function(text,reviver){var j;function walk(d,e){var b,c,a=d[e];if(a&&typeof a==="object")for(b in a)if(Object.prototype.hasOwnProperty.call(a,b)){c=walk(a,b);if(c!==undefined)a[b]=c;else delete a[b]}return reviver.call(d,e,a)}text=String(text);cx.lastIndex=0;if(cx.test(text))text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)});if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse");}})();

$().ready(function(){//是否有默认的捐赠项目需要展示
	var _cookieStr = GyLib.Cookie().get('GY_DEFAULTFOCUS');
	if(_cookieStr.length>1){
		var _tmpArr = _cookieStr.split('|');
		if(typeof(_tmpArr[1])!='undefined'
			&&typeof(_tmpArr[2])!='undefined'
			&&typeof(_tmpArr[3])!='undefined'
			&&typeof(_tmpArr[4])!='undefined')
			GyLib.Donate.show(_tmpArr[1],_tmpArr[2],_tmpArr[3],_tmpArr[4],1);
	}
});/*  |xGv00|9eeae9974e9f6bbea6aad41ab40b5c36 */