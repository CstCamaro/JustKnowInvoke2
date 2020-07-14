define(function(require, exports, module){
	//同域
	try {
	    document.domain = "qq.com"
	} catch(e) {};
	//工具库
	var ui = require('http://mat1.gtimg.com/www/asset/lib/ui');
	//var ui = require('http://u.qq.com/dc/miniNav/asset/lib/ui');
	// login S
	//窗体位置、宽高样式定义
	function ptlogin2_onResize(width, height) {
		
		var t = '';
		t = '; top:' + (ui.B.ie6 ? document.documentElement.clientHeight/2 + document.documentElement.scrollTop + 'px' : '50%');
		//获得浮动Div对象
		if (userLogin['main'])  {
			userLogin['main'].style.cssText = 'width:' + width + 'px; height:' + height + 'px; display:block; margin-left:-' +  parseInt(width/2) + 'px; margin-top:-' + parseInt(height/2) + t;
		}
	}
	window['ptlogin2_onResize'] = ptlogin2_onResize;

	//窗体关闭回调
	function ptlogin2_onClose(){
		if(userLogin['layer']) {
			document.body.removeChild(userLogin['layer']);
			userLogin['layer'] = null;
		}
	}
	window['ptlogin2_onClose'] = ptlogin2_onClose;
	function userLogin(){
		if(userLogin['layer']) return;
		var main, bg;
		userLogin['layer'] = document.createElement('div')
			userLogin['layer'].id = 'login_layer';
			
			userLogin['main'] = document.createElement('div'), userLogin['main'].id = 'login_layer_main', userLogin['main'].innerHTML = '<iframe id="login_one_frame" height="100%" scrolling="auto" width="100%" frameborder="0" src=""></iframe>',
			userLogin['bg'] = document.createElement('div'), userLogin['bg'].id = 'login_layer_bg';

			userLogin['layer'].appendChild(userLogin['main']), userLogin['layer'].appendChild(userLogin['bg']);
		
			document.body.appendChild(userLogin['layer']);
			userLogin['bg'].style.cssText = 'display:block; height:' + Math.max(document.body.clientHeight, document.documentElement.clientHeight) + 'px';
			ui.$("login_one_frame").src = "https://xui.ptlogin2.qq.com/cgi-bin/xlogin?&low_login=0&appid=636014201&target=self&border_radius=1&maskOpacity=40&s_url=http%3A//www.qq.com/qq2012/loginSuccess.htm";
			
	}
	window['userLogin'] = userLogin;
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
	/*一键登录数据*/
	function loginAll(obj){
		var loginStr = '<div class="quickArea menu user">{user}</div><div class="quickArea menu">{weibo}</div><div class="quickArea menu">{qzone}</div><div class="quickArea menu">{qmail}</div><div class="quickArea menu">{dy}</div><div class="quickArea menu">{sc}</div>';

		if(obj.result == 0){
			ui.localData.set('Mblog-totalnum', obj.info.Mblog.totalnum||'');
			ui.localData.set('Mblog-msgnum', obj.info.Mblog.msgnum||'');
			ui.localData.set('Mblog-atnum', obj.info.Mblog.atnum||'');
			ui.localData.set('Mblog-fansnum', obj.info.Mblog.fansnum||'');
			ui.localData.set('QZone-totalnum', obj.info.QZone.totalnum||'');
			ui.localData.set('QZone-passivenum', obj.info.QZone.passivenum||'');
			ui.localData.set('QZone-initnum', obj.info.QZone.initnum||'');
			ui.localData.set('QZone-aboutnum', obj.info.QZone.aboutnum||'');
			ui.localData.set('QMail-totalnum', obj.info.QMail.totalnum||'');
			ui.localData.set('QMail-inboxnum', obj.info.QMail.inboxnum||'');
			ui.localData.set('QMail-bottlenum', obj.info.QMail.bottlenum||'');
			ui.localData.set('QMail-gmailnum', obj.info.QMail.gmailnum||'');
			ui.localData.set('QMail-dmailnum', obj.info.QMail.dmailnum||'');
			
			ui.localData.set('Article', obj.info.Article||'');

			ui.localData.set('nick', obj.nick);
			ui.localData.set('Face', obj.Face || 'http://mat1.gtimg.com/www/login/images/user.jpg');
			
			ui.localData.set('Vip', obj.Vip);
			/* useInfo */
			window['nick'] = obj.nick, 
			window['Face'] = obj.Face || 'http://mat1.gtimg.com/www/login/images/user.jpg', 
			window['uin'] = Number(ui.cookie("uin").substring(1));
			//console.log(obj);
			buildLogin(loginStr, obj);
		}
		
		//新版评论add
		if(document.getElementById('commentIframe')){
			registerCoralEvent.publicLogined(uin, nick, Face);
		}
		
	}

	window['loginAll'] = loginAll;
	
	function buildLogin(loginStr, obj){
		
		var loginStr = loginStr.replace(/\{([^\}]+)\}/gi, function(m, r){	
			var str = '';
			if(r == 'user'){
				//str += '\u4F60\u597D\uFF0C<span id="nick">' + obj.nick + '</span> <a href="javascript:;" id="loginOut" bosszone="logquit">\u9000\u51FA</a>';
				str += '<a href="javascript:;" class="menu-hd" rel="nofollow"><img src="' + (obj.Face || 'http://mat1.gtimg.com/news/dc/temp/c1.jpg') + '" id="userPic_s"/>' + ( parseInt(obj.Vip) > 0 ? '<span class="userVip"><img src="http://mat1.gtimg.com/news/dc/images/Member.png" class="icon_member"/></span>' : '') + '</a><div class="menu-bd"><div class="menu-bd-in"><div class="picT clearfix"><img class="picT-p" src="' + (obj.Face || 'http://mat1.gtimg.com/www/login/images/user.jpg') + '" id="userPic_b"/><div class="picT-t"><p>\u60A8\u597D\uFF0C<span id="userName">' + obj.nick + '</span></p><p>' + (parseInt(obj.Vip) > 0 ? '<span class="userVip"><img src="http://mat1.gtimg.com/news/dc/images/Member.png"/>VIP<em class="userVip_num">' + obj.Vip + '</em></span>':'') + '<a href="javascript:void(0);" id="loginOut" target="_self">[\u9000\u51FA]</a></p></div></div></div></div>';
			}
			if(r == 'weibo'){
				if(obj.info.Mblog.totalnum){
					str += '<a href="http://t.qq.com" id="weiboLink" target="_blank" class="quickLink menu-hd weiboLink" aria-expanded="true" bosszone="gqweiboinfor"><em>\u5FAE\u535A</em><span class="infoNum">' + (obj.info.Mblog.totalnum > 99 ? '99+' : obj.info.Mblog.totalnum) + '</span></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="gqweiboinfor"><dt>\u5FAE\u535A</dt>' + (obj.info.Mblog.msgnum ? '<dd><a href="http://t.qq.com/messages/inbox?pref=qqcom.home.wbinbox"target="_blank">\u79C1\u4FE1<span id="msgNum">' + obj.info.Mblog.msgnum + '</span></a></dd>':'') + (obj.info.Mblog.atnum ? '<dd><a href="http://t.qq.com/at?pref=qqcom.home.wbat"target="_blank">\u63D0\u5230\u6211\u7684<span id="atNum">' + obj.info.Mblog.atnum + '</span></a></dd>':'') + (obj.info.Mblog.fansnum ? '<dd><a href="http://t.qq.com/follower.php?pref=qqcom.home.wbfollow"target="_blank">\u65B0\u589E\u542C\u4F17<span id="fansNum">' + obj.info.Mblog.fansnum + '</span></a></dd>' : '') + '</dl>';
				}else{
					str += '<a href="http://t.qq.com" id="weiboLink" target="_blank" class="quickLink menu-hd  weiboLink" aria-expanded="true" bosszone="gqweiboinfor"><em>\u5FAE\u535A</em></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd"><dt><a href="http://t.qq.com" target="_blank" bosszone="gqweiboinfor">\u70B9\u51FB\u67E5\u770B\u817E\u8BAF\u5FAE\u535A</a></dt></dl>';
				}
			}

			if(r == 'qzone'){
				if(obj.info.QZone.totalnum){
					str += '<a href="http://qzone.qq.com" id="qzoneLink" target="_blank" class="quickLink menu-hd qzoneLink" aria-expanded="true" bosszone="gqqzoneinfor"><em>Qzone</em><span class="infoNum">' + (obj.info.QZone.totalnum > 99 ? '99+' : obj.info.QZone.totalnum) + '</span></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="gqqzoneinfor"><dt>QQ\u7A7A\u95F4\uFF1A</dt>' + (obj.info.QZone.passivenum ? '<dd><a href="http://qzone.qq.com" target="_blank">\u6211\u7684\u52A8\u6001<span>' + obj.info.QZone.passivenum + '</span></a></dd>':'') + (obj.info.QZone.initnum ? '<dd><a href="http://qzone.qq.com" target="_blank">\u597D\u53CB\u52A8\u6001<span>' + obj.info.QZone.initnum + '</span></a></dd>':'') + (obj.info.QZone.aboutnum ? '<dd><a href="http://qzone.qq.com" target="_blank">\u6211\u7684\u53C2\u4E0E<span>' + obj.info.QZone.aboutnum + '</span></a></dd>':'') + '</dl>';
				}else{
					str += '<a href="http://qzone.qq.com" id="qzoneLink" target="_blank" class="quickLink menu-hd qzoneLink" aria-expanded="true" bosszone="gqqzoneinfor"><em>Qzone</em></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="gqqzoneinfor"><dt><a href="http://qzone.qq.com" target="_blank">\u70B9\u51FB\u67E5\u770BQQ\u7A7A\u95F4</a></dt></dl>';
				}
			}

			if(r === 'qmail'){
				if(obj.info.QMail.totalnum){
					str += '<a href="http://mail.qq.com" id="qmailLink" target="_blank" class="quickLink menu-hd qmailLink" aria-expanded="true" bosszone="gqqmailinfor"><em>QQ\u90AE\u7BB1</em><span class="infoNum">' + (obj.info.QMail.totalnum > 99 ? '99+' : obj.info.QMail.totalnum) + '</span></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="gqqmailinfor"><dt>QQ\u90AE\u7BB1\uFF1A</dt>' + (obj.info.QMail.inboxnum ? '<dd><a href="http://mail.qq.com"target="_blank">\u672A\u8BFB\u90AE\u4EF6<span>' + obj.info.QMail.inboxnum + '</span></a></dd>':'') + (obj.info.QMail.bottlenum ? '<dd><a href="http://mail.qq.com"target="_blank">\u6F02\u6D41\u74F6<span>' + obj.info.QMail.bottlenum + '</span></a></dd>':'') + (obj.info.QMail.gmailnum ? '<dd><a href="http://mail.qq.com"target="_blank">\u7FA4\u90AE\u4EF6<span>' + obj.info.QMail.gmailnum + '</span></a></dd>':'') + (obj.info.QMail.dmailnum ? '<dd><a href="http://mail.qq.com"target="_blank">\u6587\u4EF6\u5939<span>' + obj.info.QMail.dmailnum + '</span></a></dd>':'') +'</dl>';
				}else{
					str += '<a href="http://mail.qq.com" id="qmailLink" target="_blank" class="quickLink menu-hd qmailLink" aria-expanded="true" bosszone="gqqmailinfor"><em>QQ\u90AE\u7BB1</em></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="gqqmailinfor"><dt><a href="http://mail.qq.com" target="_blank">\u70B9\u51FB\u67E5\u770BQQ\u90AE\u7BB1</a></dt></dl>';
				}
			}

			if(r === 'dy'){
				if(obj.info.Article){
					str += '<a href="http://dy.qq.com/" id="dyLink" target="_blank" class="quickLink menu-hd dyLink" aria-expanded="true" bosszone="bookinginfor"><em>\u8BA2\u9605</em><span class="infoNum">' + (obj.info.Article > 99 ? '99+' : obj.info.Article) + '</span></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="bookinginfor"><dt>\u8BA2\u9605\uFF1A</dt>' + ('<dd><a href="http://dy.qq.com"target="_blank">\u4ECA\u65E5\u66F4\u65B0<span>' + (obj.info.Article > 99 ? '99+' : obj.info.Article) + '</span></a></dd>') +'</dl>';
				}else{
					str += '<a href="http://dy.qq.com/" id="dyLink" target="_blank" class="quickLink menu-hd dyLink" aria-expanded="true" bosszone="bookinginfor"><em>\u8BA2\u9605</em></a><dl aria-disabled="true" aria-hidden="true" class="menu-bd" bosszone="bookinginfor"><dt><a href="http://dy.qq.com" target="_blank">\u70B9\u51FB\u67E5\u770B\u8BA2\u9605</a></dt></dl>';
				}
			}
			if(r === 'sc'){
				str += '<a href="http://ilike.qq.com/" id="dyLike" target="_blank" class="quickLink menu-hd dyLike" aria-expanded="true" bosszone="collectinpage"  title="\u6536\u85CF"><em>\u6536\u85CF</em></a>';
			}
			return str;
		});
		ui.addClass('login', 'logined');
		ui.$('login').innerHTML = loginStr;
		if(ui.$$('menu', 'div', ui.$('login'))){
			ui.each(ui.$$('menu', 'div', ui.$('login')), function(obj, index){	
				ui.addEvent(obj, 'mouseover', function(){
					
					var _hd = ui.$$('menu-hd', '*', obj)[0], _bd = ui.$$('menu-bd', '*', obj)[0];
					
					if( !ui.hasClass(obj, 'hover')) ui.addClass(obj, 'hover');;
					if(!_hd || !_bd) return;
					clearTimeout(obj.timer);

					if(ui.getX(_hd) + 140 > ui.windowWidth()){
						_bd.style.right = 0;
					}else{
						_bd.style.left = 0;
					}

					obj.timer = setTimeout(function(){
						_bd.style.display = 'block';
						
					}, 25);	
				});
				ui.addEvent(obj, 'mouseout', function(){
					var _hd = ui.$$('menu-hd', '*', obj)[0],_bd = ui.$$('menu-bd', '*', obj)[0];
					ui.removeClass(obj, 'hover');
					if(!_hd || !_bd) return;
					clearTimeout(obj.timer);
					obj.timer = setTimeout(function(){
						ui.removeClass(obj, 'hover');
						_bd.style.display = 'none';
					}, 50);
				});
			});
		};
		ui.addEvent(ui.$('loginOut'), 'click', function(){
			setTimeout(function(){
				login.loginOut();
			}, 5);
			//新版评论add
			if(ui.$('commentIframe')){
				  registerCoralEvent.publicLogout();
			}
			return false;
		});
	}

	window["login"] = {
		init: function(){
			this.clsFun();
		},
		isLogin: function(){
			return !!ui.cookie('skey');
		},
		clsFun: function(){
			var cls = 'loginBg_def';
			if(window['loginBg_customer']){
				if(typeof loginBg_customer.style == 'object'){
					this.importCss(loginBg_customer);
					cls = 'loginBg_customer';
				}else{
					cls = loginBg_customer.style ? 'loginBg_' + loginBg_customer.style : 'loginBg_def';
				}
			}else{
				loginBg_customer = {};
				cls = 'loginBg_def';
			}
			ui.addClass('loginWrap', cls);	
		},
		importCss: function(cssObj) {
			var style = document.createElement('style');
			var styles = (cssObj.style.bg ? '.loginBg_customer { background: ' + cssObj.style.bg + ' }' : ' ') + 
						 (cssObj.style.hoverBg ? '.loginBg_customer .logined .hover .quickLink { background-color: ' + cssObj.style.hoverBg + ' }' : '') + 
						 (cssObj.btn ? '.loginBg_customer .loginBtn{width:' + cssObj.btn.width + '; height:' + cssObj.btn.height + ';text-align:center;color:' + cssObj.btn.color + '; background:' + cssObj.btn.bg + ';}.loginBg_customer .loginBtn:hover{color:' + cssObj.btn.hoverColor + '; background:' + cssObj.btn.hoverBg + '}' : '');
			(document.getElementsByTagName('head')[0] || document.body).appendChild(style);
			if (style.styleSheet) {
				style.styleSheet.cssText = styles;
			} else {
				style.appendChild(document.createTextNode(styles));
			}
		},
		noLoginHtml: ui.$('loginWrap').innerHTML,
		loginCheck: function(){
			//console.log('loginCheck');
			if(ui.cookie("skey")){
				uin = Number(ui.cookie("uin").substring(1));
				skey = ui.cookie("skey");
				try{
					var url = "http://qfwd.qq.com/?uin=" + uin + "&skey=" + skey + "&func=loginAll&refresh=0&ran=" + Math.random();			
					ui.loadJs(url, function(){}, 'utf-8');
					ui.localData.set('loginTime', (new Date()).getTime());
				}catch(e){}
			}
		},
		loginOut:function(){
			var _this = this;
			ui.loadJs('https://ui.ptlogin2.qq.com/js/ptloginout.js?' + Math.random(), function(){
				pt_logout.logout(function(n){
					if(!n){
					}
					else{
						_this.loginOutCall();
					}
				});
			});
		},
		loginOutCall: function(){
			ui.removeClass('loginWrap', 'logined');
			login.cbArr = [];
			login.cleanCbLogin();
			ui.$('loginWrap').innerHTML = this.noLoginHtml;
		},
		loginSuccess:function(){
			//console.log('loginSuccess');
			if(userLogin['layer']) {
				document.body.removeChild(userLogin['layer']);
				userLogin['layer'] = null;
			}
			
			//加载回调
			//console.log(this.cbArr);
			if(login.cbArr.length > 0){
				for(var i = login.cbArr.length-1; i >= 0; i--){
					login.cbArr[i]();
				}
			}
			//点击回调
			login.loginCheck();
			login.cbLogin && login.cbLogin();
			login.cleanCbLogin();
		},
		cbArr : new Array(),//加载回调
		cbLogin : function(){},//点击回调
		cleanCbLogin : function(){
			this.cbLogin = null;
		}
	}

	function reloadLoginInfo(){
		var nFun = function(n){
				return isNaN(n) ? 0 : n;
		};
		var D = ui.localData;
		var _obj = {"result":"0","nick":D.get('nick'),"Vip":nFun(D.get('Vip')),"Face":D.get('Face'),"info":{"QZone":{"totalnum":nFun(D.get('QZone-totalnum')),"passivenum":nFun(D.get('QZone-passivenum')),"initnum":nFun(D.get('QZone-initnum')),"aboutnum":nFun(D.get('QZone-aboutnum'))},"QMail":{"totalnum":nFun(D.get('QMail-totalnum')),"inboxnum":nFun(D.get('QMail-inboxnum')),"bottlenum":nFun(D.get('QMail-bottlenum')),"gmailnum":nFun(D.get('QMail-gmailnum')),"dmailnum":nFun(D.get('QMail-dmailnum'))},"Mblog":{"totalnum":nFun(D.get('Mblog-totalnum')),"msgnum":nFun(D.get('Mblog-msgnum')),"atnum":nFun(D.get('Mblog-atnum')),"fansnum":nFun(D.get('Mblog-fansnum'))}, 'Article': nFun(D.get('Article'))}};	
		loginAll(_obj);
	}

	ui.ready(function(){
		var _t = ui.localData.get('loginTime') || 0, t = new Date().getTime();

		if(!ui.cookie('skey') ) return;
		if(t - _t > 60000) {
			login.loginCheck();
		}else{
			reloadLoginInfo();		
		}
	});

	//login E
});/*  |xGv00|0c88e6a1058af4aeffc8577c988e3a75 */