/*站内tips worldcup2010*/
var WebTips = new Object();

WebTips.Browser = {
	ie: /msie/.test(window.navigator.userAgent.toLowerCase()),
	moz: /gecko/.test(window.navigator.userAgent.toLowerCase()),
	opera: /opera/.test(window.navigator.userAgent.toLowerCase())
};

WebTips.$ = function(s)
{
	return (typeof s == 'object') ? s: document.getElementById(s);
};

WebTips.Element = {
	remove: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			try
			{
				if(WebTips.$(arguments[i]))
					WebTips.$(arguments[i]).parentNode.removeChild(WebTips.$(arguments[i]));
			}
			catch (e)
			{
				;
			}
		}
	}
};

WebTips.JsLoader = {
	load: function(sUrl, fCallback)
	{
		WebTips.Element.remove(sUrl);

		var _script = document.createElement('script');
		_script.setAttribute('type', 'text/javascript');
		_script.setAttribute('id', sUrl);
		_script.setAttribute('src', sUrl);
		document.getElementsByTagName('head')[0].appendChild(_script);
		if (WebTips.Browser.ie)
		{
			_script.onreadystatechange = function()
			{
				if (this.readyState=='loaded' || this.readyState=='complete')
				{
					fCallback();
					WebTips.Element.remove(_script);
				}
			};
		}
		else if (WebTips.Browser.moz)
		{
			_script.onload = function()
			{
				fCallback();
				WebTips.Element.remove(_script);
			};

		}
		else
		{
			fCallback();
			WebTips.Element.remove(_script);
		}
	}
	
};

WebTips.Cookie = {
	setCookie : function(name, value, expires, path, domain, secure)
	{
		document.cookie = name + "=" + escape(value) +
			((expires) ? "; expires=" + expires.toGMTString() : "") +
			((path) ? "; path=" + path : "; path=/") +
			((domain) ? "; domain=" + domain : "") +
			((secure) ? "; secure" : "");
	},

	getCookie : function(name)
	{
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));

		if (arr != null)
		{
			return unescape(arr[2]);
		
		}

		return "";
	},

	clearCookie : function(name, path, domain)
	{
		if (WebTips.Cookie.getCookie(name))
		{
			 document.cookie = name + "=" +
				((path) ? "; path=" + path : "; path=/") +
				((domain) ? "; domain=" + domain : "") +
				";expires=Fri, 02-Jan-1970 00:00:00 GMT";
		}
	}
};

WebTips.hwd = 2;/*焦点状态 1:onfocus;0:onblur;*/
WebTips.nCheckInterval = 60000;/*check round time*/

var hSetTimeout = null;
var bSeeIt = false;

WebTips.check = function()
{	
	
	//sWebTipsTimestamp = null;
	WebTips.JsLoader.load("http://refresh.qq.com/d/tips/1/1/tips_timestamp_new.json?cache="+parseInt(Math.random()*100000),function(){	
		if(typeof sWebTipsTimestamp != "undefined")
		
	    { 

		WebTips.IsNeedPush(sWebTipsTimestamp);
			if(sWebTipsTimestamp > WebTips.Cookie.getCookie("www_tips_timestamp_qqcom") && WebTips.IsNeedPush(sWebTipsTimestamp) && !bSeeIt)
			{
				WebTips.push(sWebTipsTimestamp);
				if(bSeeIt){
					WebTips.setCookie();
					};
				
			}
			else
			{ 
				if(hSetTimeout != null) { window.clearTimeout(hSetTimeout); }
				hSetTimeout = window.setTimeout(WebTips.check, WebTips.nCheckInterval);
			}
	    }			
	});
	
}

WebTips.IsNeedPush = function(sTimeStamp){
	var year = parseInt(sTimeStamp.substr(0,4),10);
	var month = parseInt(sTimeStamp.substr(5,2),10)-1;
	var day = parseInt(sTimeStamp.substr(8,2),10);
	var hours = parseInt(sTimeStamp.substr(11,2),10);
	var minutes = parseInt(sTimeStamp.substr(14,2),10);
	var seconds = parseInt(sTimeStamp.substr(17,2),10);
	var time1 = new Date(year,month,day,hours,minutes,seconds);
	var time2 = new Date();
	var time3 = (time2.getTime() - time1.getTime()) /1000;
	var timeout = 3600;
	if(time3 < timeout) //push时长s
	{ 		
		return true;
	}
	else
	{ 
		return false;
	}
}

WebTips.push = function(sWebTipsTimestamp)
{
	
	insWebTipsInfo = null;

	WebTips.JsLoader.load("http://refresh.qq.com/d/tips/1/1/tips_info_v2.json?cache=" + parseInt(Math.random()*100000), function()
	{   
		if (typeof insWebTipsInfo != "undefined")
		{ 
			if (insWebTipsInfo.title != WebTips.Cookie.getCookie("www_tips_title_qqcom"))
			{
				//flag==3 世界杯tips
				if (insWebTipsInfo.flag == "3")
				{
					var sUrl = insWebTipsInfo.url;
					if(sUrl.indexOf("http://") == -1 && sUrl.indexOf("Http://") == -1)
					{
						sUrl = "http://" + sUrl;
					}

					try
					{
						WebTips.$("www_tips_tipstitle1").innerHTML ='<a target="_blank" onclick="WebTips.PGV(3, 2);" href="'+insWebTipsInfo.tipstitleurl1+'">'+insWebTipsInfo.tipstitle1+'</a>';
						WebTips.$("www_tips_title").innerHTML ='<a target="_blank" onclick="WebTips.PGV(3, 2);" href="'+insWebTipsInfo.titleurl+'">'+insWebTipsInfo.title+'</a>';
						WebTips.$("www_tips_imgtitle").innerHTML ='<a target="_blank" onclick="WebTips.PGV(3, 2);" href="'+insWebTipsInfo.imgurl+'"><img width="80" height="80" alt="'+insWebTipsInfo.imgtitle+'" src="'+insWebTipsInfo.imgsrc+'"></a><br><a target="_blank" onclick="WebTips.PGV(3, 2);" href="'+insWebTipsInfo.imgurl+'">'+insWebTipsInfo.imgtitle+'</a>';
						WebTips.$("www_tips_listtitle1").innerHTML ='<a target="_blank" onclick="WebTips.PGV(3, 2);" href="'+insWebTipsInfo.listurl1+'">'+insWebTipsInfo.listtitle1+'</a>';
						WebTips.$("www_tips_listtitle2").innerHTML ='<a target="_blank" onclick="WebTips.PGV(3, 2);" href="'+insWebTipsInfo.listurl2+'">'+insWebTipsInfo.listtitle2+'</a>';
						WebTips.$("www_tips_listtitle3").innerHTML ='<a target="_blank" onclick="WebTips.PGV(3, 2);" href="'+insWebTipsInfo.listurl3+'">'+insWebTipsInfo.listtitle3+'</a>';
						WebTips.$("www_tips_listtitle4").innerHTML ='<a target="_blank" onclick="WebTips.PGV(3, 2);" href="'+insWebTipsInfo.listurl4+'">'+insWebTipsInfo.listtitle4+'</a>';
						WebTips.$("www_tips_tipstitle2").innerHTML ='<a target="_blank" onclick="WebTips.PGV(3, 2);" href="'+insWebTipsInfo.tipstitleurl2+'">'+insWebTipsInfo.tipstitle2+'</a>';
						
					
					}
					catch (e)
					{
					}

					WebTips.PopBox.enetgetMsg();

					//曝光量统计
					WebTips.Url = insWebTipsInfo.url.replace("http://worlcup.qq.com", "");
					WebTips.PGV(1, 1);
				}
								
			}
		}

	});
	
	
}

WebTips.setCookie = function(){
	WebTips.JsLoader.load("http://refresh.qq.com/d/tips/1/1/tips_timestamp_new.json?cache="+parseInt(Math.random()*100000),function(){	

				var expires = new Date();
				expires.setTime(expires.getTime() + 24*60*60*1000);
				WebTips.Cookie.setCookie("www_tips_timestamp_qqcom", sWebTipsTimestamp, expires, "/", "qq.com");
	
			});
		WebTips.JsLoader.load("http://refresh.qq.com/d/tips/1/1/tips_info_v2.json?cache=" + parseInt(Math.random()*100000), function()
	{
				var expires = new Date();
				expires.setTime(expires.getTime() + 24*60*60*1000);
				WebTips.Cookie.setCookie("www_tips_title_qqcom", insWebTipsInfo.title, expires, "/", "qq.com");		
		});
				var gettime = WebTips.Cookie.getCookie("www_tips_timestamp_qqcom");
				var gettitle = WebTips.Cookie.getCookie("www_tips_title_qqcom");
	};
	

WebTips.Url = null;
WebTips.PGV = function(flag, type)
{
	//flag==3 世界杯tips
	//type:1 曝光 || type:2 点击
	if (typeof(pgvMain) == 'function')
	{
	        WebTips.JsLoader.load("http://refresh.qq.com/d/tips/1/1/tips_timestamp_new.json?cache="+parseInt(Math.random()*100000),function(){	

                                        if(typeof sWebTipsTimestamp != "undefined")
                                        {
                                                pvRepeatCount = 1;
                                                pvCurDomain = "worldcup.qq.com";
                                                pvCurUrl = "/web_tips_www_qq_com/" + flag +"/" + sWebTipsTimestamp.replace(/(\s|:)+/g, "_") +"_" + type + ".htm";
                                                pgvMain(0, {
                                                	"virtualDomain" : "worldcup.qq.com",
                                                
                                                	"virtualURL" : "/web_tips_www_qq_com/" + flag +
                                                		"/" + sWebTipsTimestamp.replace(/(\s|:)+/g, "_") +
                                                		"_" + type + ".htm",
                                                
                                                	"virtualTitle" : sWebTipsTimestamp.replace(/(\s|:)+/g, "_") + "__" +
                                                		 "wordcup_tips_" +
                                                		(type==1 ? "exposure" : "click") + "_count__" + WebTips.Url
                                                });
                                        }
			});
	        
	        
		
	}
}


WebTips.onload = function(){
		WebTips.check();
	}


WebTips.onblur = function(){	
	if(hSetTimeout)
	{
		window.clearTimeout(hSetTimeout);
		hSetTimeout = null;

		WebTips.hwd = 0;
	}
};



WebTips.onfocus = function (){	
	if(WebTips.hwd == 0){
		WebTips.hwd = 1;
		WebTips.check();
	}
};

window.onload = function(){WebTips.onload();}
window.onfocus = function(){WebTips.onfocus();}
window.onblur = function(){WebTips.onblur();}

window.onerror = function(){return true;};

//Page object
WebTips.Page = {
	getPageWidth: function(){return document.body.scrollWidth || document.documentElement.scrollWidth || 0;},
	getPageHeight: function(){return document.body.scrollHeight || document.documentElement.scrollHeight || 0;},
	getBodyWidth: function(){return document.documentElement.clientWidth || document.body.clientWidth || 0;},
	getBodyHeight: function(){return document.documentElement.clientHeight || document.body.clientHeight || 0;},
	getBodyLeft: function(){return document.body.scrollLeft || document.documentElement.scrollLeft || window.pageXOffset || 0;},
	getBodyTop: function(){return document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0;},

	getBody: function(){return {
			width  : this.getBodyWidth(),
			height : this.getBodyHeight(),
			left   : this.getBodyLeft(),
			top    : this.getBodyTop()
		};},
	getScreenWidth: function(){return window.screen.width;},
	getScreenHeight: function(){return window.screen.height;}
};

WebTips.PopBox = {
	dispSecond : 30*60*1000,
	enetdivTop :"",
	enetdivLeft : "",
	enetdivHeight : "",
	enetdivWidth : "",
	enetdocHeight: "",
	enetdocWidth: "",
	enetobjTimer: "",
    enetgetMsg : function()
	{
		try{
			WebTips.PopBox.enetdivTop = parseInt(WebTips.$("tipsAll").style.top,10);			
			WebTips.PopBox.enetdivLeft = parseInt(WebTips.$("tipsAll").style.left,10);
			WebTips.PopBox.enetdivHeight = parseInt(WebTips.$("tipsAll").offsetHeight,10);
			WebTips.PopBox.enetdivWidth = parseInt(WebTips.$("tipsAll").offsetWidth,10);
			WebTips.PopBox.enetdocWidth = WebTips.Page.getBodyWidth();
			WebTips.PopBox.enetdocHeight = WebTips.Page.getBodyHeight();
			WebTips.$("tipsAll").style.top = parseInt(WebTips.Page.getBodyTop(),10) + WebTips.PopBox.enetdocHeight + 10 + 'px'; // WebTips.PopBox.enetdivHeight
			WebTips.$("tipsAll").style.right = parseInt(WebTips.Page.getBodyLeft(),10 ) + WebTips.PopBox.enetdocWidth - WebTips.PopBox.enetdivWidth + 'px';
			WebTips.$("tipsAll").style.visibility="visible";
			WebTips.PopBox.enetobjTimer = window.setInterval(WebTips.PopBox.enetmoveDiv,10);
		}
		catch(e){}
	},
	enetresizeDiv : function ()
	{
		//i+=1;
		//if(i>800) enetcloseDiv() /自动关闭时间
		try{
			WebTips.PopBox.enetdivHeight = parseInt(WebTips.$("tipsAll").offsetHeight,10);
			WebTips.PopBox.enetdivWidth = parseInt(WebTips.$("tipsAll").offsetWidth,10) ;
			WebTips.PopBox.enetdocWidth = WebTips.Page.getBodyWidth();
			WebTips.PopBox.enetdocHeight = WebTips.Page.getBodyHeight();
			WebTips.$("tipsAll").style.top = WebTips.PopBox.enetdocHeight - WebTips.PopBox.enetdivHeight + parseInt(WebTips.Page.getBodyTop(),10) + 'px';
			WebTips.$("tipsAll").style.right = WebTips.PopBox.enetdocWidth - WebTips.PopBox.enetdivWidth + parseInt(WebTips.Page.getBodyLeft(),10) + 'px';
		}
		catch(e){}
	},

	enetmoveDiv : function()
	{
		try
		{
			if(parseInt(WebTips.$("tipsAll").style.top,10) <= (WebTips.PopBox.enetdocHeight - WebTips.PopBox.enetdivHeight + parseInt(WebTips.Page.getBodyTop(),10)))
			{
				window.clearInterval(WebTips.PopBox.enetobjTimer);
				WebTips.PopBox.enetobjTimer = window.setInterval(WebTips.PopBox.enetresizeDiv,1);
				setTimeout(WebTips.PopBox.enetcloseDiv,WebTips.PopBox.dispSecond);
			}
			WebTips.PopBox.enetdivTop = parseInt(WebTips.$("tipsAll").style.top,10);
			WebTips.$("tipsAll").style.top = WebTips.PopBox.enetdivTop - 2 + 'px';
		}
		catch(e){}
	},

	enetcloseDiv:function()
	{
		WebTips.$('tipsAll').style.visibility='hidden';
		
		if(WebTips.PopBox.enetobjTimer) 
		{	
			window.clearInterval(WebTips.PopBox.enetobjTimer);
		}
		bSeeIt = true;
		WebTips.setCookie();
		WebTips.check();
	}
};/*  |xGv00|262058d75f0ef54d11f7dab6ec670a3e */