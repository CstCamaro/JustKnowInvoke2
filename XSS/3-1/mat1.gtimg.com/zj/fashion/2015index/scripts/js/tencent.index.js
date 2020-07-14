/**
 * (C)2001-2099 Tencent Inc.
 * This script only supports *.qq.com.
 *
 * $Id: D.js 1350 2012-09-28 02:13:46Z sunny $
 */
(function(window) {
    var document = window.document,
	    navigator = window.navigator.userAgent.toLowerCase(),
	    D = function(selector, element) {
		if (!selector)
		    return null;
		element = element || document;

		switch (selector.charAt(0)) {
		    case '#':

			selector = selector.substr(1);
			return document.getElementById(selector);

			break;
		    case '.':

			selector = selector.substr(1);
			var returns = [];
			if (element.getElementsByClassName) {
			    var elements = element.getElementsByClassName(selector);
			    returns = elements;
			} else {
			    elements = element.getElementsByTagName('*');
			    var pattern = new RegExp("(^|\\s)" + selector + "(\\s|$)");
			    for (i = 0, L = elements.length; i < L; i++) {
				if (pattern.test(elements[i].className)) {
				    returns.push(elements[i]);
				}
			    }
			}
			return returns;

			break;
		    default:
			return element.getElementsByTagName(selector);
		}
	    };

    D.browser = function() {
	var types = {'ie': 'msie', 'firefox': '', 'chrome': '', 'opera': '', 'safari': '', 'mozilla': '', 'webkit': '', 'maxthon': '', 'qq': 'qqbrowser', 'mac': '', 'ipad': '', 'iphone': '', 'android': ''},
	other = 1,
		browser = {};
	for (i in types) {
	    var v = types[i] ? types[i] : i,
		    ver = 0;
	    if (navigator.indexOf(v) != -1) {
		var re = new RegExp(v + '(\\/|\\s)([\\d\\.]+)', 'ig');
		var matches = re.exec(navigator);
		ver = matches != null ? matches[2] : true;
		other = ver !== 0 && v != 'mozilla' ? 0 : other;
	    } else {
		ver = 0;
	    }
	    eval('browser.' + i + ' = ver;');
	}
	browser.other = other;
	return browser;
    }();

    D.extend = function(source, destination) {
	destination = destination || this;
	for (var key in source) {
	    destination[key] = source[key];
	}
	return destination;
    };

    D.load = function(url, callback, charset) {
	var script = document.createElement('script');
	if (callback) {
	    if (D.browser.ie) {
		script.onreadystatechange = function() {
		    if (script.readyState == "loaded" || script.readyState == "complete")
			callback();
		};
	    } else {
		script.onload = callback;
	    }
	}
	charset && script.setAttribute('charset', charset);
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', url);
	document.getElementsByTagName('head')[0].appendChild(script);
    };

    D.post = function(url, data, callback, charset) {
	var _charset = D.browser.firefox ? document.characterSet : document.charset,
		hashid = hash(window.location.host, 4);
	document.domain = 'qq.com';

	if (!D('#box' + hashid)) {
	    var divbox = document.createElement('div');
	    divbox.setAttribute('id', 'box' + hashid);
	    divbox.style.display = 'none';
	    divbox.innerHTML = '<iframe src="about:blank" name="frame' + hashid + '" id="frame' + hashid + '" style="display:none"></iframe><form action="" method="post" target="frame' + hashid + '" id="form' + hashid + '"></form>';
	    document.body.appendChild(divbox);
	}
	var iframe = D('#frame' + hashid);
	iframe.callback = function(R) {
	    if (charset && D.browser.ie)
		document.charset = _charset;
	    if (callback)
		callback(R);
	};
	var form = D('#form' + hashid), inputs = '';
	form.setAttribute('action', url);
	if (charset) {
	    if (D.browser.ie) {
		document.charset = charset;
	    } else {
		form.setAttribute('accept-charset', charset);
	    }
	}
	if (data.constructor == Object) {
	    for (c in data) {
		var val = tohtml(data[c]);
		inputs += '<input type="hidden" name="' + c + '" value="' + val + '" />';
	    }
	}
	form.innerHTML = inputs;
	form.submit();
    };

    /**
     * 在qq.com域名下检查登录状态
     * 调用方法：
     * 1、直接调用D.login()返回QQ号或false；
     * 2、D.login(function_succ, function_fail)通过服务器检查，分别传登录成功和失败的JS方法
     * <code>
     * D.login(function () {
     * 		alert(D.login.getUin());
     * }, function () {
     * 	D.login.getLogin(function () {
     * 			window.location.reload();
     * 		});
     * });
     * </code>
     * @param succ function
     * @param fail function
     * @return null | boolean | number
     */
    D.login = function(succ, fail) {
	var uin = D.login.getUin();
	D.login.allSucc = function() {
	    D.login(succ, fail);
	};
	D.login.allFail = fail;
	if (uin < 10000) {
	    if (typeof fail == 'function') {
		D.login.loginInfo = null;
		fail({sys_param: {ret_code: 4011}});
	    }
	    return false;
	}
	if (typeof succ == 'function' || typeof fail == 'function') {
	    var _charset = D.browser.firefox ? document.characterSet : document.charset;
	    if (_charset == 'gb2312') {
		_charset = 'gbk'
	    }
	    D.load('http://app1.area.qq.com/getunick.php?charset=' + _charset.toLowerCase() + '&r=' + Math.random(), function() {
		if (RESULT.sys_param.ret_code == 0) {
		    D.login.loginInfo = {uin: uin, nick: RESULT.sys_param.unick, head: 'http://q1.qlogo.cn/headimg_dl?bs=qq&dst_uin=' + uin + '&src_uin=' + uin + '&fid=' + uin + '&spec=100&url_enc=0&time=' + RESULT.sys_param.sys_time + '&referer=bu_interface&term_type=PC'};
		    if (typeof succ == 'function')
			succ(RESULT);
		} else {
		    D.login.loginInfo = null;
		    if (typeof fail == 'function')
			fail(RESULT);
		}
	    });
	} else {
	    return uin;
	}
    };
    D.extend({
	allSucc: null,
	allFail: null,
	loginSucc: null,
	loginInfo: null,
	getUin: function() {
	    var uin = D.cookie('uin');
	    if (uin) {
		return trim(uin.replace(/^[o0]*/i, ''));
	    }
	    return 0;
	},
	getLogin: function(loginsucc, cover) {
	    loginsucc ? D.login.loginSucc = loginsucc : null;
	    this.loginWindow(cover);
	},
	getInfo: function() {
	    return D.login.loginInfo;
	},
	loginOut: function(outsucc) {
	    var succ = function() {
		if (typeof D.login.allFail == 'function') {
		    D.login.allFail();
		}
		if (typeof outsucc == 'function') {
		    outsucc();
		}
		if (!D.login.allFail && !outsucc) {
		    window.location.reload();
		}
	    };
	    try {
		D.cookie('uin', this.loginInfo.uin, -1, 'qq.com');
		D.cookie('skey', D.cookie('skey'), -1, 'qq.com');
		succ();
	    } catch (e) {
		D.load('http://app1.area.qq.com/logout.php', succ);
	    }
	},
	getFace: function(uin, size) {
	    if (!uin)
		return;
	    if (!D('#h' + uin)) {
		alert('Can\'t find img[tag] of h' + uin);
		return;
	    }
	    size = size || 3;
	    D.load('http://ptlogin2.qq.com/getface?appid=5000701&imgtype=' + size + '&encrytype=0&devtype=0&keytpye=0&uin=' + uin + '&r=' + Math.random());
	    window.pt = {
		setHeader: function(val) {
		    var def = 'http://imgcache.qq.com/ptlogin/v4/style/0/images/1.gif';
		    var hed = val[uin] || def;
		    D('#h' + uin).src = hed;
		}
	    };
	},
	loginWindow: function(cover) {
	    cover = cover === false ? false : true;
	    var logindiv = D('#login_div');
	    if (!logindiv) {
		logindiv = document.createElement('div');
		logindiv.setAttribute('id', 'login_div');
		logindiv.style.position = 'fixed';
		logindiv.style.zIndex = 10000;
		logindiv.style.visibility = 'hidden';
		logindiv.style.top = '50%';
		logindiv.style.width = '400px';
		logindiv.style.height = '382px';
		logindiv.innerHTML = '<iframe id="login_frame" height="100%" scrolling="auto" width="100%" frameborder="0" src=""></iframe>';
		document.body.appendChild(logindiv);
	    } else {
		logindiv.style.display = 'block';
	    }
	    D('#login_frame').src = 'http://ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=5000701&target=self&s_url=http%3A//q1.city.qq.com/login/success.html';

	    var resizefunc = function() {
		D('#login_cover').style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
	    };

	    if (cover) {
		if (!D('#login_cover')) {
		    var mask = document.createElement('div');
		    mask.id = 'login_cover';
		    mask.style.position = 'absolute';
		    mask.style.zIndex = logindiv.style.zIndex - 1;
		    mask.style.left = mask.style.top = '0px';
		    mask.style.width = '100%';
		    mask.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
		    mask.style.backgroundColor = '#000';
		    D.browser.ie ? mask.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=40)' : mask.style.opacity = 0.4;
		    mask.style.display = 'none';
		    document.body.appendChild(mask);
		} else {
		    D('#login_cover').style.display = 'block';
		}
		_attachEvent(window, 'resize', resizefunc, document);
	    }

	    try {
		document.domain = 'qq.com';
	    } catch (e) {
		alert('This script only supports *.qq.com.');
	    }

	    window.ptlogin2_onResize = function(width, height) {
		var login_wnd = D('#login_div');
		if (login_wnd) {
		    login_wnd.style.width = width + 'px';
		    login_wnd.style.height = height + 'px';
		    login_wnd.style.visibility = 'visible';
		    if (D.browser.ie == 6.0) {
			var top = (document.documentElement.clientHeight - height) / 2;
			login_wnd.style.position = 'absolute';
			login_wnd.style.left = (document.body.offsetWidth - width) / 2 + 'px';
			login_wnd.style.top = top + 'px';
			window.onscroll = function() {
			    var scrollTop = document.documentElement.scrollTop || window.pageYOffset;
			    if (scrollTop)
				login_wnd.style.top = (top + scrollTop) + 'px';
			};
		    } else {
			login_wnd.style.left = '50%';
			login_wnd.style.margin = '-' + (height / 2) + 'px 0px 0px -' + (width / 2) + 'px';
		    }
		}
		if (D('#login_cover'))
		    D('#login_cover').style.display = 'block';
	    };
	    window.ptlogin2_onClose = function() {
		D('#login_div').style.display = 'none';
		if (cover) {
		    D('#login_cover').style.display = 'none';
		}
		_detachEvent(window, 'resize', resizefunc, document);
	    };
	    window.OnPTLogin2Success = function() {
		if (typeof D.login.allSucc == 'function') {
		    D.login.allSucc();
		}
		if (typeof D.login.loginSucc == 'function') {
		    D.login.loginSucc();
		}
		if (!D.login.allSucc && !D.login.loginSucc) {
		    window.location.reload();
		}
		return true;
	    };
	}
    }, D.login);

    D.cache = function(key, value, expires) {
	if (!key)
	    return null;
	if (window.localStorage) {
	    if (!value) {
		var exptime = Number(get(key + '_exp'));
		var dateline = new Date().getTime();
		if (!exptime || exptime > dateline) {
		    return get(key);
		} else {
		    set(key, null);
		    set(key + '_exp', null);
		    return null;
		}
	    } else {
		if (expires) {
		    var exptime = new Date().getTime() + expires * 1000;
		    set(key + '_exp', exptime);
		}
		set(key, value);
	    }
	    return true;
	} else {
	    if (value && value.length > 4095) {
		alert('Maximum length of the data for 4095b.');
		value = value.substr(0, 4095);
	    }
	    return D.cookie(key, value, expires);
	}

	function get(skey) {
	    if (typeof window.localStorage[skey] != 'undefined') {
		return window.localStorage[skey];
	    }
	    return null;
	}

	function set(skey, svalue) {
	    return window.localStorage[skey] = svalue;
	}
    };

    D.cookie = function(name, value, seconds, domain) {
	if (!value) {
	    name += '=';
	    value = document.cookie.split(';');
	    for (var e = 0; e < value.length; e++) {
		var k = trim(value[e]);
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
    };

    function hash(string, length) {
	length = length ? length : 32;
	var start = 0, i = 0, result = '', filllen = length - string.length % length,
		stringxor = function(s1, s2) {
		    var s = '';
		    var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		    var max = Math.max(s1.length, s2.length);
		    for (var i = 0; i < max; i++) {
			var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
			s += hash.charAt(k % 52);
		    }
		    return s;
		};
	for (i = 0; i < filllen; i++) {
	    string += "0";
	}
	while (start < string.length) {
	    result = stringxor(result, string.substr(start, length));
	    start += length;
	}
	return result;
    }
    ;

    function tohtml(str) {
	return str.replace(/&/g, "&#38;").replace(/\"/g, "&#34;").replace(/\'/g, '&#39;').replace(/</g, "&#60;").replace(/>/g, "&#62;");
    }

    function _attachEvent(obj, evt, func, eventobj) {
	eventobj = !eventobj ? obj : eventobj;
	if (obj.addEventListener) {
	    obj.addEventListener(evt, func, false);
	} else if (eventobj.attachEvent) {
	    obj.attachEvent('on' + evt, func);
	}
    }

    function _detachEvent(obj, evt, func, eventobj) {
	eventobj = !eventobj ? obj : eventobj;
	if (obj.removeEventListener) {
	    obj.removeEventListener(evt, func, false);
	} else if (eventobj.detachEvent) {
	    obj.detachEvent('on' + evt, func);
	}
    }

    function trim(str) {
	return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
    }

    window.D = D;

})(window);/*  |xGv00|b60f5e227ca9e6df799e6fffcbf7c630 */