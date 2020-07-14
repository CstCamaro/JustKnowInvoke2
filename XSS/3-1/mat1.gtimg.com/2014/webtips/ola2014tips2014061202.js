//tips 
var Time=_SERVER_TIME_FULL_;
var sOla2014WebTipsTimestamp= Time[0]+"-"+Time[1]+"-"+Time[2]+" "+Time[3]+":"+Time[4]+":"+Time[5];
var Ola2014WebTips = new Object();


Ola2014WebTips.Browser = {ie: /msie/.test(window.navigator.userAgent.toLowerCase()),moz: /gecko/.test(window.navigator.userAgent.toLowerCase()),opera: /opera/.test(window.navigator.userAgent.toLowerCase())};

Ola2014WebTips.$ = function(s){return (typeof s == 'object') ? s: document.getElementById(s);};

Ola2014WebTips.Element = {
	remove: function(){
		for (var i=0; i<arguments.length; i++){
			try{
				if(Ola2014WebTips.$(arguments[i])) Ola2014WebTips.$(arguments[i]).parentNode.removeChild(Ola2014WebTips.$(arguments[i]));
			}catch (e){;}
		}
	}
}

Ola2014WebTips.loadJs = function(file, callback, charset){
	var _doc = document.getElementsByTagName('head')[0];
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', file);
	js.setAttribute('charset', charset || "utf-8" );
	_doc.appendChild(js);
	if (!/*@cc_on!@*/0) {
		js.onload = function () {
			callback();
		}
	} else {
		js.onreadystatechange = function () {
			if (js.readyState == 'loaded' || js.readyState == 'complete') {
				 js.onreadystatechange = null;
				 callback && callback();
			}
		}
	}
	return false;
}	

Ola2014WebTips.Cookie = {
	setCookie : function(name, value, expires, path, domain, secure)
	{document.cookie = name + "=" + escape(value) +((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");},
	getCookie : function(name){var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));if (arr != null){return unescape(arr[2]);}return "";},
	clearCookie : function(name, path, domain)
	{if (Ola2014WebTips.Cookie.getCookie(name)){document.cookie = name + "=" + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";}}
}

Ola2014WebTips.check = function(){	
	if(typeof sOla2014WebTipsTimestamp != "undefined") {
		if(Ola2014WebTips.Cookie.getCookie("ola2014_tips_qqcom") != "noPush"){
			Ola2014WebTips.push(sOla2014WebTipsTimestamp);
		}
	}
}

Ola2014WebTips.setCookie = function(){	
	var expires = new Date();
	expires.setTime(expires.getTime() + 30*60*1000);//过期时间 分*秒*毫秒
	Ola2014WebTips.Cookie.setCookie("ola2014_tips_qqcom","noPush", expires, "/", "qq.com");
};

Ola2014WebTips.push = function(sOla2014WebTipsTimestamp){ Ola2014WebTips.PopBox.enetgetMsg(); }

window.setTimeout(function(){ Ola2014WebTips.check(); }, 16000);

//Page object
Ola2014WebTips.Page = {
	getPageWidth: function(){return document.body.scrollWidth || document.documentElement.scrollWidth || 0;},
	getPageHeight: function(){return document.body.scrollHeight || document.documentElement.scrollHeight || 0;},
	getBodyWidth: function(){return document.documentElement.clientWidth || document.body.clientWidth || 0;},
	getBodyHeight: function(){return document.documentElement.clientHeight || document.body.clientHeight || 0;},
	getBodyLeft: function(){return document.body.scrollLeft || document.documentElement.scrollLeft || window.pageXOffset || 0;},
	getBodyTop: function(){return document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0;},
	getBody: function(){
		return {
			width: this.getBodyWidth(),
			height: this.getBodyHeight(),
			left: this.getBodyLeft(),
			top: this.getBodyTop()
		};
	},
	getScreenWidth: function(){return window.screen.width;},
	getScreenHeight: function(){return window.screen.height;}
};

Ola2014WebTips.PopBox = {
	dispSecond : 15*1000,//显示时间 秒*毫秒
	enetdivTop :"",enetdivLeft : "",enetdivHeight : "",enetdivWidth : "",enetdocHeight: "",enetdocWidth: "",
	enetobjTimer: "",
    enetgetMsg : function() {
		try{
			Ola2014WebTips.PopBox.enetdivTop = parseInt(Ola2014WebTips.$("tipsAll").style.top, 10);			
			Ola2014WebTips.PopBox.enetdivLeft = parseInt(Ola2014WebTips.$("tipsAll").style.left, 10);
			Ola2014WebTips.PopBox.enetdivHeight = parseInt(Ola2014WebTips.$("tipsAll").offsetHeight, 10);
			Ola2014WebTips.PopBox.enetdivWidth = parseInt(Ola2014WebTips.$("tipsAll").offsetWidth, 10);
			Ola2014WebTips.PopBox.enetdocWidth = Ola2014WebTips.Page.getBodyWidth();
			Ola2014WebTips.PopBox.enetdocHeight = Ola2014WebTips.Page.getBodyHeight();
			Ola2014WebTips.$("tipsAll").style.top = parseInt(Ola2014WebTips.Page.getBodyTop(),10) + Ola2014WebTips.PopBox.enetdocHeight + 10 + 'px'; // Ola2014WebTips.PopBox.enetdivHeight
			//Ola2014WebTips.$("tipsAll").style.right = parseInt(Ola2014WebTips.Page.getBodyLeft(),10 ) + Ola2014WebTips.PopBox.enetdocWidth - Ola2014WebTips.PopBox.enetdivWidth + 'px';
			Ola2014WebTips.$("tipsAll").style.visibility="visible";
			Ola2014WebTips.PopBox.flash();
			Ola2014WebTips.PopBox.enetobjTimer = window.setInterval(Ola2014WebTips.PopBox.enetmoveDiv, 10);
		}catch(e){}
	},
	enetresizeDiv : function () {
		//i+=1;
		//if(i>800) enetcloseDiv() /自动关闭时间
		try{
			Ola2014WebTips.PopBox.enetdivHeight = parseInt(Ola2014WebTips.$("tipsAll").offsetHeight,10);
			Ola2014WebTips.PopBox.enetdivWidth = parseInt(Ola2014WebTips.$("tipsAll").offsetWidth,10) ;
			Ola2014WebTips.PopBox.enetdocWidth = Ola2014WebTips.Page.getBodyWidth();
			Ola2014WebTips.PopBox.enetdocHeight = Ola2014WebTips.Page.getBodyHeight();
			Ola2014WebTips.$("tipsAll").style.top = Ola2014WebTips.PopBox.enetdocHeight - Ola2014WebTips.PopBox.enetdivHeight + parseInt(Ola2014WebTips.Page.getBodyTop(),10) + 'px';
			Ola2014WebTips.$("tipsAll").style.right = Ola2014WebTips.PopBox.enetdocWidth - Ola2014WebTips.PopBox.enetdivWidth + parseInt(Ola2014WebTips.Page.getBodyLeft(),10) + 'px';
		}catch(e){}
	},
	enetmoveDiv: function() {
		try
		{
			if(parseInt(Ola2014WebTips.$("tipsAll").style.top,10) <= (Ola2014WebTips.PopBox.enetdocHeight - Ola2014WebTips.PopBox.enetdivHeight + parseInt(Ola2014WebTips.Page.getBodyTop(),10)))
			{
				window.clearInterval(Ola2014WebTips.PopBox.enetobjTimer);
				Ola2014WebTips.PopBox.enetobjTimer = window.setInterval(Ola2014WebTips.PopBox.enetresizeDiv,1);
				setTimeout(Ola2014WebTips.PopBox.enetcloseDiv, Ola2014WebTips.PopBox.dispSecond);
				
			}
			Ola2014WebTips.PopBox.enetdivTop = parseInt(Ola2014WebTips.$("tipsAll").style.top,10);
			Ola2014WebTips.$("tipsAll").style.top = Ola2014WebTips.PopBox.enetdivTop - 2 + 'px';
		}catch(e){}
	},
	flash: function(url){
		Ola2014WebTips.loadJs('http://mat1.qq.com/www/js/swfobjectopt.js', function(){
			var url = document.getElementById('flashShow').getAttribute('data-src');
			var sofocus = new SWFObject(url, "flash_focus", "100%", "100%", "9.0.28", "#FFFFFF"); 
				sofocus.addParam("allowNetworking", "all"); 
				sofocus.addParam("allowScriptAccess", "always"); 
				sofocus.addParam("allowFullScreen", "true"); 
				sofocus.addParam("scale", "noscale");
				sofocus.addParam("wmode", "transparent");
				sofocus.write("flashShow"); 
		});
	},
	enetcloseDiv:function() {
		Ola2014WebTips.$('tipsAll').style.visibility='hidden';
		//window.setTimeout(Ola2014WebTips.check, 30*1000);//cookie过期验证 秒*毫秒
		Ola2014WebTips.setCookie();
	}
};/*  |xGv00|99a1532b3167b402fbed6a0796971e7d */