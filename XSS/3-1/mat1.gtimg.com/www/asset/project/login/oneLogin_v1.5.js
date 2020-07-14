/** 
 author:curls
 time:2014-04-29 09:42:23 
*/
define(function(a) {
	function b(a, b) {
		var c = "";
		c = "; top:" + (i.B.ie6 ? document.documentElement.clientHeight / 2 + document.documentElement.scrollTop + "px" : "50%"), d.main && (d.main.style.cssText = "width:" + a + "px; height:" + b + "px; display:block; margin-left:-" + parseInt(a / 2) + "px; margin-top:-" + parseInt(b / 2) + c)
	}
	function c() {
		d.layer && (document.body.removeChild(d.layer), d.layer = null)
	}
	function d() {
		if (!d.layer) {
			d.layer = document.createElement("div"), d.layer.id = "login_layer", d.main = document.createElement("div"), d.main.id = "login_layer_main", d.main.innerHTML = '<iframe id="login_one_frame" height="100%" scrolling="auto" width="100%" frameborder="0" src=""></iframe>', d.bg = document.createElement("div"), d.bg.id = "login_layer_bg", d.layer.appendChild(d.main), d.layer.appendChild(d.bg), document.body.appendChild(d.layer), d.bg.style.cssText = "display:block; height:" + Math.max(document.body.clientHeight, document.documentElement.clientHeight) + "px", i.$("login_one_frame").src = "https://xui.ptlogin2.qq.com/cgi-bin/xlogin?&appid=636014201&target=self&border_radius=1&maskOpacity=40&s_url=http%3A//www.qq.com/qq2012/loginSuccess.htm"
		}
	}
	function e(a) {
		var b = '<div class="quickArea menu user">{user}</div><div class="quickArea menu">{weibo}</div><div class="quickArea menu">{qzone}</div><div class="quickArea menu">{qmail}</div><div class="quickArea menu">{dy}</div><div class="quickArea menu">{sc}</div>';
		0 == a.result && (i.localData.set("Mblog-totalnum", a.info.Mblog.totalnum || ""), i.localData.set("Mblog-msgnum", a.info.Mblog.msgnum || ""), i.localData.set("Mblog-atnum", a.info.Mblog.atnum || ""), i.localData.set("Mblog-fansnum", a.info.Mblog.fansnum || ""), i.localData.set("QZone-totalnum", a.info.QZone.totalnum || ""), i.localData.set("QZone-passivenum", a.info.QZone.passivenum || ""), i.localData.set("QZone-initnum", a.info.QZone.initnum || ""), i.localData.set("QZone-aboutnum", a.info.QZone.aboutnum || ""), i.localData.set("QMail-totalnum", a.info.QMail.totalnum || ""), i.localData.set("QMail-inboxnum", a.info.QMail.inboxnum || ""), i.localData.set("QMail-bottlenum", a.info.QMail.bottlenum || ""), i.localData.set("QMail-gmailnum", a.info.QMail.gmailnum || ""), i.localData.set("QMail-dmailnum", a.info.QMail.dmailnum || ""), i.localData.set("Article", a.info.Article || ""), i.localData.set("nick", a.nick), i.localData.set("Face", a.Face || "http://mat1.gtimg.com/www/login/images/user.jpg"), i.localData.set("Vip", a.Vip), window.nick = a.nick, window.Face = a.Face || "http://mat1.gtimg.com/www/login/images/user.jpg", window.uin = Number(i.cookie("uin").substring(1)), f(b, a)), document.getElementById("commentIframe") && registerCoralEvent.publicLogined(uin, nick, Face)
	}
	function f(a, b) {
		var a = a.replace(/\{([^\}]+)\}/gi, function(a, c) {
			var d = "";
			return "user" == c && (d += '<a href="javascript:;" class="menu-hd" rel="nofollow"><img src="' + (b.Face || "http://mat1.gtimg.com/news/dc/temp/c1.jpg") + '" id="userPic_s"/>' + (parseInt(b.Vip) > 0 ? '<span class="userVip"><img src="http://mat1.gtimg.com/news/dc/images/Member.png" class="icon_member"/></span>' : "") + '</a><div class="menu-bd"><div class="menu-bd-in"><div class="picT clearfix"><img class="picT-p" src="' + (b.Face || "http://mat1.gtimg.com/www/login/images/user.jpg") + '" id="userPic_b"/><div class="picT-t"><p>您好，<span id="userName">' + b.nick + "</span></p><p>" + (parseInt(b.Vip) > 0 ? '<span class="userVip"><img src="http://mat1.gtimg.com/news/dc/images/Member.png"/>VIP<em class="userVip_num">' + b.Vip + "</em></span>" : "") + '<a href="javascript:void(0);" id="loginOut" target="_self">[退出]</a></p></div></div></div></div>'), "weibo" == c && (d += b.info.Mblog.totalnum ? '<a href="http://t.qq.com" id="weiboLink" target="_blank" class="quickLink menu-hd weiboLink" aria-expanded="true" bosszone="gqweiboinfor"><em>微博</em><span class="infoNum">' + (b.info.Mblog.totalnum > 99 ? "99+" : b.info.Mblog.totalnum) + '</span></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="gqweiboinfor"><dt>微博</dt>' + (b.info.Mblog.msgnum ? '<dd><a href="http://t.qq.com/messages/inbox?pref=qqcom.home.wbinbox"target="_blank">私信<span id="msgNum">' + b.info.Mblog.msgnum + "</span></a></dd>" : "") + (b.info.Mblog.atnum ? '<dd><a href="http://t.qq.com/at?pref=qqcom.home.wbat"target="_blank">提到我的<span id="atNum">' + b.info.Mblog.atnum + "</span></a></dd>" : "") + (b.info.Mblog.fansnum ? '<dd><a href="http://t.qq.com/follower.php?pref=qqcom.home.wbfollow"target="_blank">新增听众<span id="fansNum">' + b.info.Mblog.fansnum + "</span></a></dd>" : "") + "</dl>" : '<a href="http://t.qq.com" id="weiboLink" target="_blank" class="quickLink menu-hd  weiboLink" aria-expanded="true" bosszone="gqweiboinfor"><em>微博</em></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd"><dt><a href="http://t.qq.com" target="_blank" bosszone="gqweiboinfor">点击查看腾讯微博</a></dt></dl>'), "qzone" == c && (d += b.info.QZone.totalnum ? '<a href="http://qzone.qq.com" id="qzoneLink" target="_blank" class="quickLink menu-hd qzoneLink" aria-expanded="true" bosszone="gqqzoneinfor"><em>Qzone</em><span class="infoNum">' + (b.info.QZone.totalnum > 99 ? "99+" : b.info.QZone.totalnum) + '</span></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="gqqzoneinfor"><dt>QQ空间：</dt>' + (b.info.QZone.passivenum ? '<dd><a href="http://qzone.qq.com" target="_blank">我的动态<span>' + b.info.QZone.passivenum + "</span></a></dd>" : "") + (b.info.QZone.initnum ? '<dd><a href="http://qzone.qq.com" target="_blank">好友动态<span>' + b.info.QZone.initnum + "</span></a></dd>" : "") + (b.info.QZone.aboutnum ? '<dd><a href="http://qzone.qq.com" target="_blank">我的参与<span>' + b.info.QZone.aboutnum + "</span></a></dd>" : "") + "</dl>" : '<a href="http://qzone.qq.com" id="qzoneLink" target="_blank" class="quickLink menu-hd qzoneLink" aria-expanded="true" bosszone="gqqzoneinfor"><em>Qzone</em></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="gqqzoneinfor"><dt><a href="http://qzone.qq.com" target="_blank">点击查看QQ空间</a></dt></dl>'), "qmail" === c && (d += b.info.QMail.totalnum ? '<a href="http://mail.qq.com" id="qmailLink" target="_blank" class="quickLink menu-hd qmailLink" aria-expanded="true" bosszone="gqqmailinfor"><em>QQ邮箱</em><span class="infoNum">' + (b.info.QMail.totalnum > 99 ? "99+" : b.info.QMail.totalnum) + '</span></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="gqqmailinfor"><dt>QQ邮箱：</dt>' + (b.info.QMail.inboxnum ? '<dd><a href="http://mail.qq.com"target="_blank">未读邮件<span>' + b.info.QMail.inboxnum + "</span></a></dd>" : "") + (b.info.QMail.bottlenum ? '<dd><a href="http://mail.qq.com"target="_blank">漂流瓶<span>' + b.info.QMail.bottlenum + "</span></a></dd>" : "") + (b.info.QMail.gmailnum ? '<dd><a href="http://mail.qq.com"target="_blank">群邮件<span>' + b.info.QMail.gmailnum + "</span></a></dd>" : "") + (b.info.QMail.dmailnum ? '<dd><a href="http://mail.qq.com"target="_blank">文件夹<span>' + b.info.QMail.dmailnum + "</span></a></dd>" : "") + "</dl>" : '<a href="http://mail.qq.com" id="qmailLink" target="_blank" class="quickLink menu-hd qmailLink" aria-expanded="true" bosszone="gqqmailinfor"><em>QQ邮箱</em></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="gqqmailinfor"><dt><a href="http://mail.qq.com" target="_blank">点击查看QQ邮箱</a></dt></dl>'), "dy" === c && (d += b.info.Article ? '<a href="http://dy.qq.com/" id="dyLink" target="_blank" class="quickLink menu-hd dyLink" aria-expanded="true" bosszone="bookinginfor"><em>订阅</em><span class="infoNum">' + (b.info.Article > 99 ? "99+" : b.info.Article) + '</span></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="bookinginfor"><dt>订阅：</dt>' + ('<dd><a href="http://dy.qq.com"target="_blank">今日更新<span>' + (b.info.Article > 99 ? "99+" : b.info.Article) + "</span></a></dd>") + "</dl>" : '<a href="http://dy.qq.com/" id="dyLink" target="_blank" class="quickLink menu-hd dyLink" aria-expanded="true" bosszone="bookinginfor"><em>订阅</em></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="bookinginfor"><dt><a href="http://dy.qq.com" target="_blank">点击查看订阅</a></dt></dl>'), "sc" === c && (d += '<a href="http://ilike.qq.com/" id="dyLike" target="_blank" class="quickLink menu-hd dyLike" aria-expanded="true" bosszone="collectinpage"  title="收藏"><em>收藏</em></a>'), d
		});
		i.addClass("login", "logined"), i.$("login").innerHTML = a, i.$$("menu", "div", i.$("login")) && i.each(i.$$("menu", "div", i.$("login")), function(a) {
			i.addEvent(a, "mouseover", function() {
				var b = i.$$("menu-hd", "*", a)[0],
					c = i.$$("menu-bd", "*", a)[0];
				i.hasClass(a, "hover") || i.addClass(a, "hover"), b && c && (clearTimeout(a.timer), i.getX(b) + 140 > i.windowWidth() ? c.style.right = 0 : c.style.left = 0, a.timer = setTimeout(function() {
					c.style.display = "block"
				}, 25))
			}), i.addEvent(a, "mouseout", function() {
				var b = i.$$("menu-hd", "*", a)[0],
					c = i.$$("menu-bd", "*", a)[0];
				i.removeClass(a, "hover"), b && c && (clearTimeout(a.timer), a.timer = setTimeout(function() {
					i.removeClass(a, "hover"), c.style.display = "none"
				}, 50))
			})
		}), i.addEvent(i.$("loginOut"), "click", function() {
			return setTimeout(function() {
				login.loginOut()
			}, 5), i.$("commentIframe") && registerCoralEvent.publicLogout(), !1
		})
	}
	function g() {
		var a = function(a) {
				return isNaN(a) ? 0 : a
			},
			b = i.localData,
			c = {
				result: "0",
				nick: b.get("nick"),
				Vip: a(b.get("Vip")),
				Face: b.get("Face"),
				info: {
					QZone: {
						totalnum: a(b.get("QZone-totalnum")),
						passivenum: a(b.get("QZone-passivenum")),
						initnum: a(b.get("QZone-initnum")),
						aboutnum: a(b.get("QZone-aboutnum"))
					},
					QMail: {
						totalnum: a(b.get("QMail-totalnum")),
						inboxnum: a(b.get("QMail-inboxnum")),
						bottlenum: a(b.get("QMail-bottlenum")),
						gmailnum: a(b.get("QMail-gmailnum")),
						dmailnum: a(b.get("QMail-dmailnum"))
					},
					Mblog: {
						totalnum: a(b.get("Mblog-totalnum")),
						msgnum: a(b.get("Mblog-msgnum")),
						atnum: a(b.get("Mblog-atnum")),
						fansnum: a(b.get("Mblog-fansnum"))
					},
					Article: a(b.get("Article"))
				}
			};
		e(c)
	}
	try {
		document.domain = "qq.com"
	} catch (h) {}
	var i = a("http://mat1.gtimg.com/www/asset/lib/ui");
	window.ptlogin2_onResize = b, window.ptlogin2_onClose = c, window.userLogin = d, window.loginAll = e, window.login = {
		init: function() {
			this.clsFun()
		},
		isLogin: function() {
			return !!i.cookie("skey") && !! i.cookie("uin")
		},
		clsFun: function() {
			var a = "loginBg_def";
			window.loginBg_customer ? "object" == typeof loginBg_customer.style ? (this.importCss(loginBg_customer), a = "loginBg_customer") : a = loginBg_customer.style ? "loginBg_" + loginBg_customer.style : "loginBg_def" : (loginBg_customer = {}, a = "loginBg_def"), i.addClass("loginWrap", a)
		},
		importCss: function(a) {
			var b = document.createElement("style"),
				c = (a.style.bg ? ".loginBg_customer { background: " + a.style.bg + " }" : " ") + (a.style.hoverBg ? ".loginBg_customer .logined .hover .quickLink { background-color: " + a.style.hoverBg + " }" : "") + (a.btn ? ".loginBg_customer .loginBtn{width:" + a.btn.width + "; height:" + a.btn.height + ";text-align:center;color:" + a.btn.color + "; background:" + a.btn.bg + ";}.loginBg_customer .loginBtn:hover{color:" + a.btn.hoverColor + "; background:" + a.btn.hoverBg + "}" : "");
			(document.getElementsByTagName("head")[0] || document.body).appendChild(b), b.styleSheet ? b.styleSheet.cssText = c : b.appendChild(document.createTextNode(c))
		},
		noLoginHtml: i.$("loginWrap").innerHTML,
		loginCheck: function() {
			if (this.isLogin()) {
				uin = Number(i.cookie("uin").substring(1)), skey = i.cookie("skey");
				try {
					var a = "http://qfwd.qq.com/?uin=" + uin + "&skey=" + skey + "&func=loginAll&refresh=0&ran=" + Math.random();
					i.loadJs(a, function() {}, "utf-8"), i.localData.set("loginTime", (new Date).getTime())
				} catch (b) {}
			}
		},
		loginOut: function() {
			var a = this;
			i.loadJs("https://ui.ptlogin2.qq.com/js/ptloginout.js?" + Math.random(), function() {
				pt_logout.logout(function(b) {
					b && a.loginOutCall()
				})
			})
		},
		loginOutCall: function() {
			i.removeClass("loginWrap", "logined"), login.cbArr = [], login.cleanCbLogin(), i.$("loginWrap").innerHTML = this.noLoginHtml
		},
		loginSuccess: function() {
			if (d.layer && (document.body.removeChild(d.layer), d.layer = null), login.cbArr.length > 0) for (var a = login.cbArr.length - 1; a >= 0; a--) setTimeout(function() {
				login.cbArr[a]()
			}, 0);
			login.loginCheck(), login.cbLogin && login.cbLogin(), login.cleanCbLogin()
		},
		cbArr: new Array,
		cbLogin: function() {},
		cleanCbLogin: function() {
			this.cbLogin = null, login.cbArr = []
		}
	}, i.ready(function() {
		var a = i.localData.get("loginTime") || 0,
			b = (new Date).getTime();
		login.isLogin() && (b - a > 6e4 ? login.loginCheck() : g())
	});
	//监听message事件
				if (typeof window.postMessage !== 'undefined') {
					window.onmessage = function(event) {
						var msg = event || window.event; // 兼容IE8
						var data;
						if (typeof  JSON !== 'undefined') // IE7兼容模式不存在JSON对象
							data = JSON.parse(msg.data);
						else
							data = str2JSON(msg.data);

						switch (data.action) {
							case 'close':
							ptlogin2_onClose();
							break;

							case 'resize':
							ptlogin2_onResize(data.width, data.height);
							break;

							default:
							break;
						}
					}
				} else { //不支持postMessage的IE6，7 hack方法
					navigator.ptlogin_callback = function(msg) {
						var data = str2JSON(msg);
						switch (data.action) {
							case 'close':
								ptlogin2_onClose();
								break;
							case 'resize':
								ptlogin2_onResize(data.width, data.height);
								break;

							default: 
								break;
						}
					}
				}
				/**
				 * [str2JSON 降字符串转换成json对象]
				 * @param  {String} str [json字符串]
				 * @return {Object}
				 */
				function str2JSON(msg) {
					// borrow from jquery
					var rvalidchars = /^[\],:{}\s]*$/,
					rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
					rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
					rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;
					if (rvalidchars.test(msg.replace(rvalidescape, "@")
									.replace(rvalidtokens, "]")
									.replace(rvalidbraces, "")) ) {
						return (new Function("return " + msg))();
					}
					return {};
				}
	
});/*  |xGv00|2e899877582fea978dc500f996c006c1 */