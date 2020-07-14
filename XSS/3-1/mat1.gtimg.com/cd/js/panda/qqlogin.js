document.domain = 'qq.com';
var qqlogin = {
	userinfo: null,
	succfunc: null,
	failfunc: null,
	cookie: function (name, value, seconds, domain) {
		if (!value) {
			name += '=';
			value = document.cookie.split(';');
			for (var e = 0; e < value.length; e++) {
				var k = this.trim(value[e]);
				if (k.indexOf(name) == 0) {
					return unescape(k.substring(name.length, k.length));
				}
			}
			return null;
		}
		if (seconds) {
			var expires = new Date();
				expires.setTime(expires.getTime() + seconds * 1000);
			seconds = "; expires=" + expires.toGMTString();
		} else {
			seconds = '';
		}
		document.cookie = name + "=" + escape(value) + seconds + "; path=/" + (domain ? ";domain=" + domain : '');
	},
	
	load: function (url, callback, charset) {
		var script = document.createElement('script');
		if (callback) {
			if (navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
				script.onreadystatechange = function() {
					if (script.readyState == 'loaded' || script.readyState == 'complete') callback();
				};
			} else {
				script.onload = callback;
			}
		}
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', url);
		charset && script.setAttribute('charset', charset);
		document.getElementsByTagName('head')[0].appendChild(script);
	},
	
	loginCheck: function(succ, fail) {
		if(typeof succ == 'function') qqlogin.succfunc = succ;
		if(typeof fail == 'function') qqlogin.failfunc = fail;
		window.loginAll = function(R) {
			if(R.result == 0) {
				qqlogin.userinfo = R;
				typeof qqlogin.succfunc == 'function' && qqlogin.succfunc();
			} else {
				typeof qqlogin.failfunc == 'function' && qqlogin.failfunc();
			}
		};
		if (qqlogin.cookie('skey')) {
            if (qqlogin.cookie('uin')) {
                uin = Number(qqlogin.cookie('uin').substring(1));
            }
            skey = qqlogin.cookie('skey');
            qqlogin.load("http://qfwd.qq.com/?uin=" + uin + "&skey=" + skey + "&func=loginAll&refresh=0&ran=" + Math.random(), null, 'utf-8');
        } else {
        	typeof succ == 'function' && fail();
        }
	},
	
	loginSuccess: function() {
		this.loginCheck();
		pt.hidePtui();
	},
	
	login: function() {
		this.load('https://xui.ptlogin2.qq.com/js/ptlogin_v1.js', function() {
			pt.setParams({
				"appid": 5000701,
				"s_url": "http://cd.qq.com/product/qqloginSuccess.htm",
				"style": 20,
				"protocol": "https:",
				"domain": "qq.com",
				"border_radius": 1,
				"target": "self",
				"maskOpacity": 40
			});
			
			pt.showPtui();
			pt.setCallback('close', function() {
				qqlogin.close();
			});
		}, 'utf-8');
	},
	logout: function() {
		qqlogin.load('https://ui.ptlogin2.qq.com/js/ptloginout.js', function() {
            pt_logout.logout(function(b) {
            	typeof qqlogin.failfunc == 'function' && qqlogin.failfunc();
            });
        });
		this.load('https://xui.ptlogin2.qq.com/js/ptlogin_v1.js', function() {
			pt.logout(function() {
				typeof qqlogin.failfunc == 'function' && qqlogin.failfunc();
			});
		}, 'utf-8');
	},
	close: function() {},
	resize: function() {},
	trim: function (str) {
		return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
	}
};
/*  |xGv00|ae1b42a1b71dea7400217df7b34aca3e */