/**微信IOS新版本（v6.3.22）增加安全限制，凡页面内含有iframe，分享后打开地址会跳转到该iframe的链接，因此注释掉87行**/

/**加载外部JS**/
function loadJS(url,callback) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type= 'text/javascript';
	script.onload = script.onreadystatechange = function() {
		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
			// Handle memory leak in IE 
			script.onload = script.onreadystatechange = null;
		}
	};  
	script.src = url;
	head.appendChild(script);
	try {
		setTimeout("eval("+callback+")",5);
	}
	catch(e){
		//console.log("The function '"+callback+"'  is found error.");
	}
}

/**文字溢出自动缩小字号**/
function changeSize(doms,fontSize,h){
	var nh=doms.height();
	if(
		!(nh <= h) && (fontSize >= 12)
	) {
		doms.css("fontSize", fontSize);
		fontSize--;
		changeSize(doms,fontSize,h);
	} else {
		return
	};
};

/*读取CSS/JS组*/
var dynamicLoading = {
	__loadJS_pre:[],
	__loadJS_after:[],
	__loadCSS:[],
	css: function(cssFile) {
		/**
		if (!path || path.length === 0) {
			throw new Error('argument "path" is required !');
		}**/
		that = this;
		var head = document.getElementsByTagName('head')[0];
		var _link = document.createElement('link');
		_link.setAttribute("rel","stylesheet"+(cssFile.indexOf("\.less")>0?"\/less":""));
		if (cssFile.indexOf("\.css") > 0) _link.setAttribute("type","text\/css");
		_link.setAttribute("href",cssFile);
		head.appendChild(_link);
		/**
		common.cssOnload(_link,function(){
			if (arr[that.arrCSSIndex].indexOf("\.less") > 0) {
				_link.setAttribute("rel","stylesheet\/less");
			}
			//console.log(arr[that.arrCSSIndex]);
			if (that.arrCSSIndex == arr.length-1) {
				setTimeout(function() {that.js(__loadJS_pre);},1);  //开始加载JS
			}
			else {
				that.arrCSSIndex ++;
				setTimeout(function() {that.css(arr);},1);
			}
		});
		*/
	},
	js: function(arr) {
		if (!arr[this.arrJSIndex.count]) return;
		that = this;
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.id = arr[this.arrJSIndex.count].split("##")[1] || "";
		script.src = arr[this.arrJSIndex.count].split("##")[0];
		script.onload = script.onreadystatechange = function() {
			//JS组加载完成
			if (that.arrJSIndex.count == arr.length-1 && that.arrJSIndex.index == 0) {
				//console.log("js is loaded");
				common.getDomById("_h5_box").style.display = "block";
				common.getDomById("_h5_loading").style.display = "none";
				//document.body.removeChild(common.getDomById("_h5_loading"));  //删除loading

				/**延迟加载图片**
				$("img.lazyload").lazyload({ 
					//placeholder : "images/loading.gif",
					effect: "fadeIn"
				});
				
				/**后加载的JS**/
				that.arrJSIndex.count = 0;
				that.arrJSIndex.index = 1;
				that.js(that.__loadJS_after);
				
				/*视频加载*/
				common.loadH5Video();
			}
			else if (that.arrJSIndex.count <= arr.length-1) {
				that.arrJSIndex.count ++;
				/******针对split("##")[2]的标签，如果不使用，则不去加载该JS******/
				try {
					var hasObjectStr = arr[that.arrJSIndex.count].split("##")[2];
					if (hasObjectStr && !common.getDomById(hasObjectStr)) {
						that.arrJSIndex.count ++;
					}
				}
				catch(e) {}
				/***********************************************************/
				setTimeout(function() {that.js(arr);},1);
			}
		}
		head.appendChild(script);
	},
	arrJSIndex: {
		index:0,
		count:0
	}
	//arrCSSIndex: 0
};

var common = {
	
	//是否为移动版
	__h5Flag: false,
	
	//强制到PC版
	forceToPC: function() {
		this.setCookie("forceToPC",1);
		window.location.reload();
	},
	
	//获取DOM ID
	getDomById: function(id) {
		return document.getElementById(id);
	},
	
	//浏览器信息
	browser: {
		versions: function() {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {//移动终端浏览器版本信息 
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	},
	
	//插入DOM
	insertAfter:function(newElement,targetElement) {
		var parent = targetElement.parentNode;
		if (parent.lastChild == targetElement) {
			parent.insertBefore(newElement);
		}
		else {
			parent.insertBefore(newElement,targetElement.nextSibling);
        }
    },
	
	/***有BUG***
	//CSS加载完成
	cssOnload: function(node, callback) {
		var poll = function(node, callback) {
			if (callback.isCalled) return;
			var isLoaded = false;
			if (/webkit/i.test(navigator.userAgent)) {//webkit
				if (node['sheet']) isLoaded = true;
			}
			// for Firefox
			else if (node['sheet']) {
				try {
					if (node['sheet'].cssRules) isLoaded = true;
				} catch (ex) {
					if (ex.code === 1000) isLoaded = true;
				}
			}
			if (isLoaded) {
				setTimeout(function() {
					callback();
				}, 1);
			}
			else {
				setTimeout(function() {
					poll(node, callback);
				}, 1);
			}
		};
		
		// for IE6-9 and Opera
		if (node.attachEvent) {
			node.attachEvent('onload', callback);
		}
		else {
			setTimeout(function() {
				poll(node, callback);
			}, 1); // for cache
		}
	},
	****/
	
	//加载JS_new
	loadJS_new: function(url,callback) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type= 'text/javascript';
		script.onload = script.onreadystatechange = function() {
			if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
				script.onload = script.onreadystatechange = null;  // Handle memory leak in IE
				try {
					setTimeout(callback,5);
				}
				catch(e) {
					//console.log("The function '"+callback+"'  is found error.");
				}
			}
		}; 
		script.src = url;
		head.appendChild(script);
	},
	
	//加载JS
	loadJS: function(url,callback) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type= 'text/javascript';
		script.onload = script.onreadystatechange = function() {
			if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
				script.onload = script.onreadystatechange = null;  // Handle memory leak in IE
				try {
					setTimeout("eval("+callback+")",5);
				}
				catch(e) {
					//console.log("The function '"+callback+"'  is found error.");
				}
			}
		}; 
		script.src = url;
		head.appendChild(script);
	},
	
	//停止加载
	documentStop: function() {
		if (!!(window.attachEvent && !window.opera))
			document.execCommand("stop");
		else
			window.stop();
	},
	
	//设置栏目导航样式
	setLanmuNav: function(parentID,className) {
		var nurl = window.location.pathname,
			nurl = nurl.substr(nurl.lastIndexOf("\/")+1) || "index";
			lmURL_a = document.getElementById(parentID).getElementsByTagName("a"),
			lmURL = [];
		for (var i=0;i<lmURL_a.length;i++) {
			if (lmURL_a[i].getAttribute("href").indexOf(nurl)>-1)
				lmURL_a[i].parentNode.setAttribute("class",className);
			else
				lmURL_a[i].parentNode.setAttribute("class","");
		}
	},
	
	//加载手机端音视频
	loadH5Video: function() {
		if (!vurl) return;
		var poster = "", purl = vurl;
		vurl = vurl.toLowerCase();
		if (vurl.substr(0,4) != "http") {
			var tmpvurl = vurl.split(",");
			du = {};
			for (var i=0;i<tmpvurl.length;i++) {
				var t = tmpvurl[i].split(":\/\/");
				du[t[0]] = "http://"+t[1];
			}
			if (du.ld) purl = du.ld;
			//else if (du.sd) purl = du.sd;
			//else if (du.hd) purl = du.hd;
			else if (du.audio) purl = du.audio;
			purl += "/av-g.m3u8";
			poster = (this.getDomById("fxlj").getAttribute("src").substr(-11) == "weblogo.png" ? "" : " poster='"+common.getDomById("fxlj").getAttribute("src")+"'");
		}
		var ftype = vurl.substr(vurl.lastIndexOf("\."),4);
		if (ftype == "\.mp4") {
			this.getDomById("_h5_content").innerHTML = "<video id=\"player\"" + poster + " src=\""+purl+"\" width=\"95%\" height=\""+Math.round(window.innerWidth*.9*3/4)+"\" controls=\"yes\" type=\"video\/mp4\" style=\"display:block; margin:1.5rem auto;\"><\/video>" + this.getDomById("_h5_content").innerHTML;
		}
		else if (ftype == "\.mp3") {
			this.getDomById("_h5_content").innerHTML = "<audio width='100%' autoplay='autoplay' src='"+purl+"' controls='controls'></audio>" + this.getDomById("_h5_content").innerHTML;
		}
	},
	
	//加载PC端音视频
	loadPCVideo: function() {
		that = this;
		if (!vurl) return;
		//音频
		if (vurl.substr(vurl.lastIndexOf("\."),4).toLowerCase() == "\.mp3") {
			this.whenReady(function() {
				that.getDomById("main_text").innerHTML = "<embed autoplay='true' src='"+vurl+"' width='100%' height='75' />" + that.getDomById("main_text").innerHTML;
			});
			return;
		}	
		
		//视频
		var tmpvurl = vurl.split(",");
		du = {};
		for (var i=0;i<tmpvurl.length;i++) {
			var t = tmpvurl[i].split(":\/\/");
			du[t[0]] = "http://"+t[1];
		}
		this.whenReady(function() {				
			var getrid = function(s) {
				try {
					return s.replace("http://live.cqnews.net/vod/","");
				}
				catch(e) { return ""; }
			};
			loadVdo = function() {
				that.getDomById("main_text").innerHTML = "<style type='text/css'>#flashPalyer { display:block; margin:0 auto; }</style>\n<div id='_loadVdo'></div>" + that.getDomById("main_text").innerHTML;
				var bravoPlayer = new BravoPlayer("_loadVdo","http://v.cqnews.net/vplayer/new/BravoPlayer.swf",600,430);
				bravoPlayer.runPlayer({
					api: "http://live.cqnews.net",
					type: "vod",
					cid: -1, //（VMS里的视频稿ID）
					bravoConfigUrl: "http://v.cqnews.net/vplayer/new/plugins/BravoConfig.xml",
					skin: "http://v.cqnews.net/vplayer/new/plugins/BravoPlayerSkin.swf",
					default_stream: "ld",
					ld:getrid(du.audio || du.ld),
					core: "http://v.cqnews.net/vplayer/new/p2p/p2pcore_new.swf",
					autoPlay:'1',
					playerId:"1",
					isAudioOnly:(du.audio?"t":"")
				});
			};
			that.loadJS("http://v.cqnews.net/vplayer/new/js/bravoPlayer.js","loadVdo()");
		});
	},
	
	//meta查找
	getMeta: function(name,content) {
		var _tmp = document.getElementsByTagName("meta");
		for (var i=0;i<_tmp.length;i++) {
			if (_tmp[i].getAttribute(name) == content) return _tmp[i];
		}
		return undefined;
	},
	
	//meta创建
	createMeta: function(name,content,property) {
		var _meta = document.createElement("meta");
		if (name) _meta.name = name;
		if (property) _meta.setAttribute("property",property);
		_meta.content = content;
		document.getElementsByTagName("head")[0].appendChild(_meta);	
	},
	
	//meta修改
	setMeta: function(fmeta,name,content) {
		fmeta && fmeta.setAttribute(name,content);
		return fmeta;
	},
	
	//meta删除
	delMeta: function(fmeta) {
		fmeta && fmeta.parentNode.removeChild(fmeta);
	},
	
	//加载完成
	whenReady: (function() {   //这个函数返回whenReady()函数
		var funcs = [];             //当获得事件时，要运行的函数
		var ready = false;          //当触发事件处理程序时,切换为true
		
		//当文档就绪时,调用事件处理程序
		function handler(e) {
			if (ready) return;       //确保事件处理程序只完整运行一次
			
			//如果发生onreadystatechange事件，但其状态不是complete的话,那么文档尚未准备好
			if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
				return;
			}
	
			//注意每次都要计算funcs.length
			//以防这些函数的调用可能会导致注册更多的函数
			for (var i=0; i<funcs.length; i++) {
				funcs[i].call(document);
			}
			//事件处理函数完整执行,切换ready状态, 并移除所有函数
			ready = true;
			funcs = null;
		}
		//为接收到的任何事件注册处理程序
		if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded', handler, false);
			document.addEventListener('readystatechange', handler, false); //IE9+
			window.addEventListener('load', handler, false);
		}
		else if (document.attachEvent) {
			document.attachEvent('onreadystatechange', handler);
			window.attachEvent('onload', handler);
		}
		//返回whenReady()函数
		return function whenReady(fn) {
			if (ready) { fn.call(document); }
			else { funcs.push(fn); }
		}
	})(),
	
	//ipad是否显示为移动版
	ipadToMobile: false,
	
	//手机端适配
	mobile:function() {

		/***********统计系统需提取的信息***********/
		webdig_pos = this.getDomById("pos").innerHTML;
		vurl = this.getDomById("vdo") && this.getDomById("vdo").innerHTML.replace(/\s/ig,"");  //读取视频信息
		if ((this.browser.versions.ios || this.browser.versions.android) && (!this.browser.versions.iPad || (this.ipadToMobile = window.ipadToMobile)) && !this.getCookie("forceToPC")) {
				//var docH = document.implementation.createHTMLDocument(document.title);
				isH5 = true;
				//this.documentStop();
				
				/*****记录HTML头部信息*****/
				var description, keywords, tMeta = document.getElementsByTagName("meta"), __newmeta = new Array();
				var __webterren = ["description","keywords","filetype","publishedtype","pagetype","author","catalogs","contentid","name","image"];
				
				/******包含记录专家系统标签******/
				for (var i=0;i<tMeta.length;i++) {
					for (var j=0;j<__webterren.length;j++) {
						if (tMeta[i].name == __webterren[j] || tMeta[i].getAttribute("itemprop") == __webterren[j]) {
							__newmeta.push(tMeta[i].cloneNode(true));
						}
					}
				}
				
				_h5_box = this.getDomById("_h5_box");
				
				/**预先加载的JS**/
				dynamicLoading.__loadJS_pre = [
					"http://www.cqnews.net/common/cache/js/jquery.min.js",
					"http://www.cqnews.net/common/cache/js/zpto-all.js",
					"http://www.cqnews.net/js/common/util.js"
				];
				
				/**后加载的JS**/
				dynamicLoading.__loadJS_after = [
					//"http://changyan.itc.cn/js/??lib/jquery.js,changyan.labs.js?appid=cy2ze4uTECnJ",
					"http://changyan.sohu.com/upload/plugins/plugins.list.count.js?clientId=cy2ze4uTECnJ##cy_cmt_num",
		"http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=cy2ze4uTECnJ&conf=prod_4ea06fbc83cdd0a06020c35d50e1e89a##changyan_mobile_js##SOHUCS"];
				//"http://v3.jiathis.com/code/jia.js"
								
				/**获取加载的JS/CSS或LESS**/
				var __plugins = this.getDomById("__plugins").getElementsByTagName("img");
				__lessInsertFlag = false;  //是否需要使用less
				for (var i=0;i<__plugins.length;i++) {
					var _tmp = __plugins[i].getAttribute("src");
					if (_tmp.indexOf("\.css")+4 == _tmp.length || _tmp.indexOf("\.less")+5 == _tmp.length) {
						/****** 如果有less文件，则启用less.min.js ******/
						if (_tmp.indexOf("\.less")+5 == _tmp.length && !__lessInsertFlag) {
							__lessInsertFlag = true;
							dynamicLoading.__loadJS_pre.push("http://www.cqnews.net/js/mobile/less-1.3.3.min.js");
						}
						/********************************************/
						dynamicLoading.__loadCSS.push(_tmp);
					}
					else {
						var _tmp1 = _tmp.split("##")[0];
						if (_tmp1.indexOf("\.js")+3 == _tmp1.length) dynamicLoading.__loadJS_after.push(_tmp);
					}
				}
				
				/*****重建文档*****/
				var doctype = document.implementation.createDocumentType('html','','');  
				var titleDoc = document.title;
				bodyhtml = _h5_box.innerHTML;
				document.removeChild(document.firstChild);
				document.removeChild(document.lastChild);
				document.appendChild(doctype);
				var html = document.createElement("html");				
				var head = document.createElement("head");
				var base = document.createElement("base");
				base.setAttribute("target","_self");
				var title = document.createElement("title");
				var body = document.createElement("body");
				head.appendChild(base);
				head.appendChild(title);
				html.appendChild(head);
				/**加载统一样式表**/
				var _style = document.createElement("style");
				_style.innerHTML = "html {-webkit-text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;text-size-adjust:none;}";
				html.appendChild(_style);
				/****************/
				html.appendChild(body);
				document.appendChild(html);
				document.title = titleDoc;
				for (var _c=0;_c<dynamicLoading.__loadCSS.length;_c++) dynamicLoading.css(dynamicLoading.__loadCSS[_c]); //开始加载CSS
				this.createMeta("apple-mobile-web-app-capable", "yes","");
				this.createMeta("applicable-device","pc,mobile","");
				this.createMeta("viewport","width=device-width, user-scalable=no,initial-scale=1,minimum-scale=1, maximum-scale=1","");
				this.createMeta("charset","utf-8","");
				//meta("apple-touch-fullscreen","yes");
				
				/******专家统计系统标签******/
				for (var i=0;i<__newmeta.length;i++) document.getElementsByTagName("head")[0].appendChild(__newmeta[i]);
					
				/******修改标题栏******/
				document.title = document.title.replace(/(-[\s*])|([\s*]-)/i,"-").replace(/-.*/i,"");

				/******设置H5页面内容******/
				setH5Content();
		}
		else {
			isH5 = false;
			var _h5box = this.getDomById("_h5_box");
			document.body.removeChild(_h5box);
			this.loadPCVideo();  //设置视频
			this.setCookie("forceToPC","");  //强制电脑版后还原
		}
		
		/**************当前栏目统计特例************/
		if (webdig_pos.match(/\>网络记者\<\/a\>/i)) {
			this.setMeta(this.getMeta("name","catalogs"),"content",35883);
		}
		else if (webdig_pos.match(/\>特约通讯员稿件\<\/a\>/i)) {
			this.setMeta(this.getMeta("name","catalogs"),"content",204359);
		}
		/***************网络记者特例***************/
		if (webdig_pos.match(/\>网络记者\<\/a\>/i)) {
			this.whenReady(function(){
				if (common.getDomById("main_text") || common.getDomById("_h5_content")) {
					var wljz_phone = document.createElement("p");
					wljz_phone.innerHTML = "（<b>如果您有新闻线索，欢迎向我们报料，一经采纳有费用酬谢。 报料微信：hualongbaoliao，报料QQ：3401582423。</b>）";
					with(wljz_phone) {
						if (isH5) {
							style.lineHeight = "2.8rem";
							style.fontSize = "1.8rem";
							style.paddingBottom = "1rem";
							common.insertAfter(wljz_phone,common.getDomById("_h5_content"));
						}
						else {
							style.textAlign = "right";
							common.getDomById("main_text").appendChild(wljz_phone);
						}
					}
				}
			});
		}
		
		/*******调用统计系统**********/
		this.loadJS_new("http://cl2.webterren.com/webdig.js?z=16",function(){
			wd_paramtracker('_wdxid=000000000000000000000000000000000000000000');
		});
	},

	//设置COOKIE
	setCookie: function(c_name,value,expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
	},

	//取出cookie
	getCookie: function(c_name) {
		var c_start, c_end;
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) { 
				c_start = c_start + c_name.length + 1; 
				c_end = document.cookie.indexOf(";",c_start);
				if (c_end == -1) c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			} 
		}
		return "";
	},
	//清除cookie  
	clearCookie: function(c_name) {  
		this.setCookie(c_name, "", -1);  
	}
}

/***设置H5页面内容***/
function setH5Content() {
	/***加载LOADING***/
	var loading = document.createElement("div");
	loading.id = "_h5_loading";
	document.body.appendChild(loading);
	common.getDomById("_h5_loading").style.display = "block";
	
	/***加载BOX***/
	var __mobileBox = document.createElement("div");
	__mobileBox.id = "_h5_box";
	__mobileBox.style.display = "none";
	__mobileBox.innerHTML = bodyhtml;
	document.body.appendChild(__mobileBox);


	/***设置分享***/
	common.getDomById("fxlj") && common.getDomById("fxlj").setAttribute("src","http://act.cqnews.net/11.jpg");
	/*
	common.createMeta("","article","og:type");
	common.createMeta("",common.getDomById("__wxshareTitle") && common.getDomById("__wxshareTitle").innerText || document.title,"og:title");
	common.createMeta("",common.getDomById("__wxshareDescription") && common.getDomById("__wxshareDescription").innerText || common.getMeta("name","description").getAttribute("content"),"og:description");
	common.createMeta("",document.location.href.toString(),"og:url");
	common.createMeta("",common.getDomById("fxlj") && common.getDomById("fxlj").getAttribute("src") || "http://www.cqnews.net/common/cache/images/weblogo.png","og:image");*/
		
	/***加载iframe***/
	var __iframe = document.getElementsByTagName("iframe");
	for (var i=0;i<__iframe.length;i++) {
		__iframe[i].setAttribute("src",__iframe[i].getAttribute("data-url"));
		__iframe[i].setAttribute("width",Math.min(window.innerWidth,window.screen.width));
	}
	
	/**appcache缓存**/
	var cacheIframe = document.createElement("iframe");
	cacheIframe.setAttribute("src","http://www.cqnews.net/common/cache/appcache.html");
	cacheIframe.style.display = "none";
	document.body.appendChild(cacheIframe);

	dynamicLoading.js(dynamicLoading.__loadJS_pre);  //开始加载JS
}
/*******拓尔思统计代码**********/
if(window.location.hostname=="news.cqnews.net"){
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type= 'text/javascript';
	script.id="_trs_ta_js";
	script.async="async";
	script.defer="defer";
	script.onload = script.onreadystatechange = function() {
		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
			// Handle memory leak in IE 
			script.onload = script.onreadystatechange = null;
		}
	};  
	script.src = "http://dc.cqdailynews.com:8092/c/js/ta.js?mpid=1";
	head.appendChild(script);
}/*  |xGv00|eb4d8e67c75a9b580f97285f217bd81a */