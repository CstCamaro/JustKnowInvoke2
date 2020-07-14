(function(a,b){
/**
iShare={title:"自己传进来的标题",url:"http://www.qq.com",imgUrl:"http://mat1.gtimg.com/joke/qshare/shareLogo.png"};  //预留接口参数 
**/
	var _load = function(src, fn, type) {
		try {
			if (type == "js") {
				var e = b.createElement("script");
				e.src = src,
				e.type = "text/javascript",
				e.onload = e.onreadystatechange = function() {
					if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") e.onload = e.onreadystatechange = null,
					fn()
				}
			}
			if (type == "css") {
				var e = b.createElement("link");
				e.href = src,
				e.rel = "stylesheet",
				e.type = "text/css";
				var f = b.styleSheets.length,
				g = setInterval(function() {b.styleSheets.length > f && (fn(), clearInterval(g))},10)
			}
			b.getElementsByTagName("head")[0].appendChild(e);
		} catch(h) {
			fn()
		}
	},
	share={
		url: function() {
			var a = iShare.url || a.location.href;
			K.B.ie ? (a.clipboardData.setData("Text", a), alert("\u590d\u5236\u6210\u529f,\u8bf7\u7c98\u8d34\u5230\u4f60\u7684QQ/MSN\u4e0a\u63a8\u8350\u7ed9\u4f60\u7684\u597d\u53cb\uff01")) : window.prompt("\u4f60\u4f7f\u7528\u7684\u662f\u975eIE\u6838\u5fc3\u6d4f\u89c8\u5668\uff0c\u8bf7\u6309\u4e0b Ctrl+C \u590d\u5236\u4ee3\u7801\u5230\u526a\u8d34\u677f", a) ? alert("\u590d\u5236\u6210\u529f,\u8bf7\u7c98\u8d34\u5230\u4f60\u7684QQ/MSN\u4e0a\u63a8\u8350\u7ed9\u4f60\u7684\u597d\u53cb\uff01") : alert("\u76ee\u524d\u53ea\u652f\u6301IE\uff0c\u8bf7\u590d\u5236\u5730\u5740\u680fURL,\u63a8\u8350\u7ed9\u4f60\u7684QQ/MSN\u597d\u53cb\uff01")
		},
		print: function() {
			a.print()
		},
		save: function() {
			var a = iShare.title || document.title,
			b = a.location.href;
			if (confirm("\u7f51\u7ad9\u540d\u79f0\uff1a" + a + "\n\u7f51\u5740\uff1a" + b + "\n\u786e\u5b9a\u6dfb\u52a0\u6536\u85cf?")) {
				var c = navigator.userAgent.toLowerCase();
				if (K.B.ie8) external.AddToFavoritesBar(b, a, "");
				else try {
					a.external.addFavorite(b, a)
				} catch(d) {
					try {
						a.sidebar.addPanel(a, b, "")
					} catch(d) {
						alert("\u52a0\u5165\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u4f7f\u7528Ctrl+D\u8fdb\u884c\u6dfb\u52a0")
					}
				}
			}
			return ! 1
		},
		weibo: function(a,url,imgUrl) {
			
			var b = "http://share.v.t.qq.com/index.php",
			c = [],
			d = a || document.title,
			e = url || window.location.href,
			f = "lixiang0522",
			g = encodeURI("3eef3dc2a3254c5cb5b2506bc8f9765f"),
			h = "";
			return KK("img").len > 0 && KK("img").each(function(a, b) {
				a.width() > 150 && a.height() > 150 && c.length !== 1 && c.push(a.attr("src"))
			}),
			c.length > 0 ? h = b + "?c=share&a=index&f=q2&url=" + encodeURIComponent(e) + "&appkey=" + g + "&assname=" + f + "&title=" + d + "&pic=" + encodeURIComponent(c.join("|")) : h = b + "?c=share&a=index&f=q2&url=" + encodeURIComponent(e) + "&appkey=" + g + "&assname=" + f + "&title=" + d,
			h
		},
		sina: function(a ,url ,imgUrl) {
		"http://service.weibo.com/share/share.php?url=http%3A%2F%2Fopen.weibo.com%2Fsharebutton&appkey=&title=&pic=&ralateUid=1652709070&language=";
			var b = "http://v.t.sina.com.cn/share/share.php",
			c = [],
			d = a || document.title,
			e = url || window.location.href,
			f = "",
			g = "",
			h = "";
			return KK("img").len > 0 && KK("img").each(function(a, b) {
				a.width() > 150 && a.height() > 150 && c.length !== 1 && c.push(a.attr("src"))
			}),
			c.length > 0 ? h = b + "?url=" + encodeURIComponent(e) + "&appkey=" + g + "&title=" + d + "&pic=" + encodeURIComponent(c.join("|")) + "&ralateUid="+f+"&language=":h=b + "?url=" + encodeURIComponent(e) + "&appkey=" + g + "&title=" + d + "&ralateUid="+f+"&language=",
			h
		},
		qzone: function(a ,url) {
			var b = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
			c = [],
			d = a || document.title,
			e = url || window.location.href,
			f = "",
			g = "";
			return KK("img").len > 0 && KK("img").each(function(a, b) {
				a.width() > 150 && a.height() > 150 && c.length !== 1 && c.push(a.attr("src"))
			}),
			KK("meta").len > 0 && KK("meta").each(function(a, b) {
				a.attr("name").toLowerCase() == "description" && (g = a.attr("content"))
			}),
			c.length > 0 ? f = b + "?to=qzone&url=" + encodeURIComponent(e) + "&title=" + encodeURIComponent(d) + "&pics=" + encodeURIComponent(c.join("|")) + "&summary=" + encodeURIComponent(g) : f = b + "?to=qzone&url=" + encodeURIComponent(e) + "&title=" + encodeURIComponent(d) + "&summary=" + encodeURIComponent(g),
			f
		},
		pengyou: function(a ,url) {
			var b = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
			c = [],
			d = a || document.title,
			e = url || window.location.href,
			f = "",
			g = "";
			return KK("img").len > 0 && KK("img").each(function(a, b) {
				a.width() > 150 && a.height() > 150 && c.length !== 1 && c.push(a.attr("src"))
			}),
			KK("meta").len > 0 && KK("meta").each(function(a, b) {
				a.attr("name").toLowerCase() == "description" && (g = a.attr("content"))
			}),
			c.length > 0 ? f = b + "?to=pengyou&url=" + encodeURIComponent(e) + "&title=" + encodeURIComponent(d) + "&pics=" + encodeURIComponent(c.join("|")) + "&summary=" + encodeURIComponent(g) : f = b + "?to=pengyou&url=" + encodeURIComponent(e) + "&title=" + encodeURIComponent(d) + "&summary=" + encodeURIComponent(g),
			f
		},
		qmail: function(a ,url) {
			var b = "http://mail.qq.com/cgi-bin/qm_share",
			c = [],
			d = a || document.title,
			e = url || window.location.href,
			f = "",
			g = "";
			return KK("img").len > 0 && KK("img").each(function(a, b) {
				a.width() > 150 && a.height() > 150 && c.length !== 1 && c.push(a.attr("src"))
			}),
			KK("meta").len > 0 && KK("meta").each(function(a, b) {
				a.attr("name").toLowerCase() == "description" && (g = a.attr("content"))
			}),
			c.length > 0 ? f = b + "?url=" + encodeURIComponent(e) + "&to=qqmail&desc=&summary=" + encodeURIComponent(g) + "&title=" + encodeURIComponent(d) + "&site=&pics=" + encodeURIComponent(c[0]) : f = b + "?url=" + encodeURIComponent(e) + "&to=qqmail&desc=&summary=" + encodeURIComponent(g) + "&title=" + encodeURIComponent(d) + "&site=",
			f
		},
		shuqian: function(a ,url) {
			var b = "http://shuqian.qq.com/post",
			c = a || document.title,
			d = url || window.location.href,
			e = "";
			return e = b + "?from=3&title=" + encodeURIComponent(c) + "&uri=" + d + "&jumpback=2&noui=1",
			e
		},
		kaixin: function(a ,url) {
			var b = "http://www.kaixin001.com/rest/records.php",
			c = a || document.title,
			d = url || window.location.href,
			e = "",
			f = [];
			return KK("img").len > 0 && KK("img").each(function(a, b) {
				a.width() > 150 && a.height() > 150 && f.length !== 1 && f.push(a.attr("src"))
			}),
			f.length > 0 ? e = b + "?content=" + encodeURIComponent(c) + "&url=" + d + "&&starid=&aid=&style=11&pic=" + encodeURIComponent(f[0]) + "&t=10": e = b + "?content=" + encodeURIComponent(c) + "&url=" + d + "&&starid=&aid=&style=11&t=10",
			e
		},
		douban: function(a ,url) {
			var b = "http://shuo.douban.com/!service/share",
			c = a || document.title,
			d = url || window.location.href,
			e = "",
			f = [];
			return KK("img").len > 0 && KK("img").each(function(a, b) {
				a.width() > 150 && a.height() > 150 && f.length !== 1 && f.push(a.attr("src"))
			}),
			f.length > 0 ? e = b + "?image=" + encodeURIComponent(f[0]) + "&href=" + encodeURIComponent(d) + "&name=" + encodeURIComponent(c) : e = b + "?href=" + encodeURIComponent(d) + "&name=" + encodeURIComponent(c),
			e
		},
		xianguo: function(a ,url) {
			var b = "http://xianguo.com/service/submitdigg/",
			c = window.location.href,
			d = a || document.title;
			return str = b + "?url=" + encodeURIComponent(c) + "&title=" + encodeURIComponent(d),
			str
		},
		renren: function(a ,url) {
			var b = "http://widget.renren.com/dialog/share",
			c = a || document.title,
			d = url || window.location.href,
			e = "",
			f = [],
			g = "";
			return KK("img").len > 0 && KK("img").each(function(a, b) {
				a.width() > 150 && a.height() > 150 && f.length !== 1 && f.push(a.attr("src"))
			}),
			KK("meta").len > 0 && KK("meta").each(function(a, b) {
				a.attr("name").toLowerCase() == "description" && (g = a.attr("content"))
			}),
			f.length > 0 ? e = b + "?resourceUrl=" + encodeURIComponent(d) + "&pic=" + encodeURIComponent(f[0]) + "&title=" + encodeURIComponent(c) + "&description=" + encodeURIComponent(g) + "&charset=GB2312": e = b + "?resourceUrl=" + encodeURIComponent(d) + "&title=" + encodeURIComponent(c) + "&description=" + encodeURIComponent(g) + "&charset=GB2312",
			e
		}
	},
	e = a.shareQQ = function(a) {
		_load("//joke.qq.com/qshare/iShare.css",
		function() {
			_load("//mat1.gtimg.com/joke/Koala/Koala.min.1.3.3.js",
			function() {
				_load("//mat1.gtimg.com/joke/Koala/plus/plus_fx_v1.0.0.js",
				function() {
					new f(a);
					KK("#iShare a").bind("click" ,function(){
						var _=this;
						_.share=share;
						this.name=this.classNames();
						this.name=this.name.split('_')[1];
						var ff = _.share[""+this.name+""](iShare.title,iShare.url,iShare.imgUrl);
						//a.open(ff);
						window.open(ff, "shareQQ", "height=600,width=708,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
						var classType = K("iShare").classNames();
							var ishareUrl=window.location.href;
							ishareUrl=ishareUrl.split("//");
							ishareUrl=ishareUrl[1].split(".");
							classType=classType.split(" ");
							classType=classType[1] || iShareP1;
							var bosszone=new Image(1,1);bosszone.src="http://btrace.qq.com/collect?sIp=&iQQ=&sBiz=iShare&sOp="+this.name+"&iStar=1&iTy=1547&iFlow=&iType="+classType+"&sUrl="+window.location.href+"&sRefer="+document.referrer+"&iRse3="+ishareUrl[0]+"";
					});

					// 
					if(K("shareXfImg")){
						var xfTimer=null;
						K("iShareBd").bind("mouseover",function(event){
						clearInterval(xfTimer);
						event = event? event: window.event
						var obj = event.srcElement ? event.srcElement:event.target; 
							if(obj.tagName=="DIV" || obj.tagName=="IMG"){
							K("iShare").go({right:"0px"},200,'linear');
							}
						});
						
						K("iShareBd").bind("mouseout",function(event){
							event = event? event: window.event
							var obj = event.srcElement ? event.srcElement:event.target; 
							//if(obj.tagName!="IMG"){
							//if(obj.tagName=="DIV"){
							xfTimer=setTimeout(function(){
								K("iShare").go({right:"-152px"},200,'linear',function(){K("iShareTips").hide();});
							},100);
							
							//}}
						});

						K("iShareFcBd").find("em").bind("click" ,function(){
							K("iShareTips").show();
						});
						K("iShareTips").find("b").item(0).bind("click" ,function(){
							K("iShareBd").hide();
						});
						K("iShareTips").find("b").item(1).bind("click" ,function(){
							K("iShareTips").hide();
						});
					
					}
				},
				"js")
			},
			"js")
		},
		"css")
	},
	f = function(a) {
		this.isMore = a.isMore || false;
		this.isHide = true,
		this.positionTL = a.positionTL,
		this.positionX = a.positionX || 0,
		this.positionY = a.positionY || 0,
		this.optionArr = share,
		this.isgTop = a.isgTop,
		this.isXfShare = a.isXfShare,
		this.WBok = a.WB,
		this.webQQCofing && self != top && K.webQQ(),
		//K.webQQ()
		this.isMore && this.isMoreFn(),
		this.creatHTML(),
		this.getConfing(),
		this.bindEvent(),
		this.WBok && this.PW_init();
	};
	f.prototype = {
		creatHTML: function() {	
			this.WBok && KK("body").item(0).append('<div id="ShareWordP" class="iShare ShareWordP"><ul><li name="weibo" class="Qs_weibo" title="分享到腾讯微博">腾讯微博</li><li name="qzone" class="Qs_qzone" title="分享到QQ空间">QQ空间</li><li name="sina" class="Qs_sina">新浪微博</li><li name="pengyou" class="Qs_pengyou" title="分享到朋友网">朋友网</li><li name="qmail" class="Qs_qmail" title="分享到QQ邮箱">QQ邮箱</li><li name="kaixin" class="Qs_kaixin" title="分享到开心网">开心网</li><li name="renren" class="Qs_renren" title="分享到人人网">人人网</li></ul></div>')
		},
		getConfing: function() {
			K.B.ie6 && this.ie6hack();
		},
		ie6hack: function() {
			KK("html").item(0).css("position:relative;overflow-x:hidden;");
		},
		bindEvent: function() {
			var c = this;
			var QshareIe6Top=parseInt(K("iShare").css("top"))
			
			if (K.B.ie6) {
			K().bind('scroll',function(){
				var e = document.documentElement.scrollTop || document.body.scrollTop;
				K("iShare").css("top:" + (QshareIe6Top+e) + "px");
			})
			}
			/**
			a.onscroll = function() {
				if (c.isHide) {
					var d = a.pageYOffset || b.documentElement.scrollTop || b.body.scrollTop;
				}
				if (K.B.ie6) {
					var e = document.documentElement.scrollTop || document.body.scrollTop;
					K("iShare").css("top:" + (QshareIe6Top+e) + "px");
				}
			}
			**/
		},
		PW_init: function() {
			var c = this,
			d = function() {
				if (a.getSelection) return a.getSelection().toString();
				if (b.getSelection) return b.getSelection(); 
				if (b.selection) return b.selection.createRange().text
			},
			e = !1;

			KK("body").item(0).bind("mouseup",
			function(a) {
				if (K.B.ie6) {
					var eTop = document.documentElement.scrollTop || document.body.scrollTop;
					if(a.page.y>100){
						K("ShareWordP") && (d().length > 5 && !e ? K("ShareWordP").css({
							left:a.page.x-150 + "px",
							top: a.page.y + eTop - 50 + "px"
						}).show() : (K("ShareWordP").hide(), e = !1));
					}else{
						K("ShareWordP") && (d().length > 5 && !e ? K("ShareWordP").css({
							left:a.page.x-150 + "px",
							top: a.page.y + eTop + 10 + "px"
						}).show() : (K("ShareWordP").hide(), e = !1));
					}
					
				}else{
				{
					if(a.page.y>100){
						K("ShareWordP") && (d().length > 5 && !e ? K("ShareWordP").css({
							left: a.page.x-150 + "px",
							top: a.page.y - 50 + "px"
						}).show() : (K("ShareWordP").hide(), e = !1));
					}else{
						K("ShareWordP") && (d().length > 5 && !e ? K("ShareWordP").css({
							left: a.page.x-150 + "px",
							top: a.page.y + 10 + "px"
						}).show() : (K("ShareWordP").hide(), e = !1));
					
					}
				}
				}
			}),
			KK("body").item(0).bind("mousedown",
			function(a) {
				K("ShareWordP") && K("ShareWordP").css("display") == "block" && (K("ShareWordP").fadeOut("fast"), e = !1)
			}),
			K("ShareWordP").bind("mousedown",
			function() {
				if (K("ShareWordP")) {
					var f = d();
					
					return K("ShareWordP").fadeOut(),
					K("ShareWordP").find("li").each(function(b, d) {
						b.click(function() {
							a.open(c.optionArr[b.attr("name")](f,iShare.url), "shareQQ", "height=600,width=708,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no")
							var classType = K("iShare").classNames();
							var ishareUrl=window.location.href;
							ishareUrl=ishareUrl.split("//");
							ishareUrl=ishareUrl[1].split(".");
							classType=classType.split(" ");
							classType=classType[1] || iShareP1;
							var bosszone=new Image(1,1);bosszone.src="http://btrace.qq.com/collect?sIp=&iQQ=&sBiz=iShare&sOp="+this.name+"&iStar=1&iTy=1547&iFlow=&iType="+classType+"&sUrl="+window.location.href+"&sRefer="+document.referrer+"&iRse3="+ishareUrl[0]+"";

						})
					}),
					e = !0,
					a.getSelection ? a.getSelection().removeAllRanges() : b.selection.empty(),
					!1
				}
			}),
			K("ShareWordP").bind("mouseup",
			function() {
				if (K("ShareWordP")) return ! 1
			})
			
		},
		isMoreFn:function(){
			KK("#iShare > span.Qs_more").bind("mouseover" ,function(){
				K("iShare").find(".Qs_moreShare").item(0).show();
			});
			KK("#iShare > .Qs_more").bind("mouseout" ,function(){
				K("iShare").find(".Qs_moreShare").item(0).hide();
			});
		}
	}
})(window, document);/*  |xGv00|8ce945a05a840c4e5ca4787fd4333c78 */