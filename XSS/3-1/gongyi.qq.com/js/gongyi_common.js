/*
 * Created by Hobo <hobowo#tencent.com>
 * Http://www.qq.com/
 */
 //j.common.js	---begin


// Global variable
window.undefined = window.undefined;
window.debug = false;

//print window error
window.onerror = function(msg, url, line)
{
	if (window.debug)
	{
		var err = "url  ：" + url + "\nline ：" + line + " 行\nerror：" + msg;

		if (!window.confirm(err + "\n\n页面含有如上脚本错误,是否继续报告错误?"))
		{
			window.debug = false;
		}
	}

	return true;
};

//Browser check
var Browser = new Object();

Browser.ua = window.navigator.userAgent.toLowerCase();
Browser.ie = /msie/.test(Browser.ua);
Browser.moz = /gecko/.test(Browser.ua);
Browser.opera = /opera/.test(Browser.ua);

//shortcut method
var $ = function(s)
{
	return (typeof s == "object") ? s: document.getElementById(s);
};

var $N = function(s)
{
	return (typeof s == "object") ? s: document.getElementsByName(s);
};

var $T = function(s)
{
	return (typeof s == "object") ? s: document.getElementsByTagName(s);
};

var $C = function(tag)
{
	return document.createElement(tag);
};

var $A = function(a)
{
	if (!a)
	{
		return new Array();
	}
	else
	{
		var r = new Array();

		for (var i=0; i<a.length; i++)
		{
			r.push(a[i]);
		}

		return r;
	}
};

//Object Prototype extension
String.prototype.trim = function()
{
	return this.replace(/^\s*|\s*$/ig, "");
};

String.prototype.left = function(n)
{
	return this.substr(0, n);
};

String.format = function(s)
{
	for (var i=1; i<arguments.length; i++)
	{
		s = s.replace(new RegExp("\\{"+(i-1)+"\\}", "g"), arguments[i]);
	}

	return s;
};

if (!String.prototype.localeCompare)
{
	String.prototype.localeCompare = function(s)
	{
		return (this>s) ? 1 : (this<s ? -1 : 0);
	};
}

if (!Array.prototype.pop)
{
	Array.prototype.pop = function()
	{
		return this.length!=0 ? this[--this.length] : null;
	};
}

if (!Array.prototype.push)
{
	Array.prototype.push = function()
	{
		var startLength = this.length;
		
		for (var i = 0; i < arguments.length; i++)
		{
			this[startLength + i] = arguments[i];
		}

		return this.length;
	};
}

if (Array.prototype.shift)
{
	Array.prototype.shift = function()
	{
		var r = this[0];

		for (var i=0; i<this.length-1; i++)
		{
			this[i] = this[i + 1];
		}

		this.length--;
		return r;
	};
}

Array.prototype.sortByAlpha = function()
{
	return this.sort(function(a, b)
	{
		if (a.length < b.length)
		{
			return 1;
		}
		else if (a.length == b.length)
		{
			return b.localeCompare(a);
		}
		else
		{
			return -1;
		}
	});
};

Number.prototype.format = function(n)
{
	if (this.toString().length >= n)
	{
		return this;
	}

	return ((new Array(n).join("0")+(this|0)).slice(-n));
};

Date.prototype.format = function(s)
{
	var o = {
		"y+": this.getFullYear(),
		"M+": this.getMonth()+1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth()+3)/3),
		"S" : this.getMilliseconds()
	};

	for (var k in o)
	{
		if (new RegExp("("+ k +")").test(s))
		{
			s = s.replace(RegExp.$1, o[k].format(RegExp.$1.length));
		}
	}

	return s;
};

//Math.random extension
var _rnd = Math.random;

Math.random = function(n)
{
	if (n == undefined)
	{
		return _rnd();
	}
	else if (n.toString().match(/^\-?\d*$/g))
	{
		return Math.ceil(_rnd() * n);
	}
	else
	{
		return null;
	}
};

//Function.bind
Function.prototype.bind = function()
{
	var _this = this, args = $A(arguments), object = args.shift();

	return function()
	{
		return _this.apply(object, args);
	};
};

//Function.call & Function.apply (ie5)
if (!Function.prototype.call)
{
	Function.prototype.apply = function(object, argu)
	{
		object = object || window;
		argu = argu || new Array();

		try
		{
			object.__apply__ = this;
			var result = eval("object.__apply__(" + argu.join(", ") + ")");
			object.__apply__ = null;
		}
		catch (e)
		{
			var result = this(argu[0], argu[1], argu[2], argu[3], argu[4]);
		}

		return result;
	};

	Function.prototype.call = function()
	{
		var args = $A(arguments), object = args.shift();

		return this.apply(object, args)
	};
}

//Mozilla browser Event*HTMLElement extension
if (Browser.moz)
{
	var GetEvent = function()
	{
		var _f = GetEvent.caller;

		while (_f)
		{
			if (_f.arguments[0])
			{
				var _fac = _f.arguments[0].constructor;

				if (_fac==Event || _fac==MouseEvent || _fac==KeyboardEvent)
				{
					return _f.arguments[0];
				}
			}

			_f = _f.caller;
		}

		return null;
	};

	window.constructor.prototype.__defineGetter__("event", function()
	{
		return GetEvent();
	});

	Window.prototype.attachEvent =HTMLElement.prototype.attachEvent
		= Node.prototype.attachEvent = function(sType, fHandler)
	{
		this.addEventListener(sType.replace(/^on/i, ""), fHandler, false);
	};

	Window.prototype.detachEvent = HTMLElement.prototype.detachEvent
		= Node.prototype.detachEvent = function(sType, fHandler)
	{
		this.removeEventListener(sType.replace(/^on/i, ""), fHandler, false);
	};
}

//Switch
var Switch = {
	set: function(s, v)
	{
		return this[s] = v ? true : false;
	},

	get: function(s)
	{
		return this[s] ? this[s] : (this[s] = false);
	},

	toggle: function(s)
	{
		return this[s] ? this[s]=!this[s] : (this[s] = true);
	}
};

//Element
var Element = {
	isEmpty: function(e)
	{
		return /^\s*$/.test($(e).innerHTML);
	},

	isVisible: function(e)
	{
		return $(e).style.display != 'none';
	},

	show: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			$(arguments[i]).style.display = "block";
		}
	},

	hide: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			$(arguments[i]).style.display = "none";
		}
	},

	toggle: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			Element[Element.isVisible($(arguments[i])) ? 'hide': 'show']($(arguments[i]));
		}
	},

	remove: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			try
			{
				$(arguments[i]).parentNode.removeChild($(arguments[i]));
			}
			catch (e)
			{
			}
		}
	},

	create: function(parent, tag, attr)
	{
		var _e = $C(tag);

		for (var i=0; i<attr.length; i++)
		{
			_e.setAttribute(attr[i][0], attr[i][1]);
		}

		$(parent).appendChild(_e);
	},

	getElementWidth: function(e)
	{
		return $(e).offsetWidth;
	},

	getElementHeight: function(e)
	{
		return $(e).offsetHeight;
	},

	getElementLeft: function(e)
	{
		return (e==null) ? 0 : ($(e).offsetLeft + Element.getElementLeft($(e).offsetParent));
	},

	getElementTop: function(e)
	{
		return (e==null) ? 0 : ($(e).offsetTop + Element.getElementTop($(e).offsetParent));
	}
};

//UrlParser
var UrlParser = function(sUrl)
{
	this.__construct(sUrl);
};

UrlParser.prototype = {
	__construct: function(sUrl)
	{
		this._href = sUrl || document.location.href;
	},

	getDomain: function()
	{
		if (this._href.match(new RegExp('^(([a-z]+)://([^\\/]+)\/?)(.*)', 'i')))
		{
			return RegExp.$1;
		}
		else
		{
			return null;
		}
	},

	getParam: function(sName)
	{
		if (this._href.match(new RegExp("(&|\\u003F)" + sName + "=([^&#]*)(&|$|#)")))
		{
			return RegExp.$2;
		}
		else
		{
			return null;
		}
	}
};

UrlParser.getInstance = function()
{
	if (!this.__instance__)
	{
		this.__instance__ = new UrlParser();
	};

	return this.__instance__;
};

//Hash
var HashTable = function()
{
	this.__construct();
};

HashTable.prototype = {
	__construct: function()
	{
		this._hash = new Object();
	},

	set: function(key, value, rewrite)
	{
		if (rewrite !== false)
		{
			this._hash[key] = value;
		}
		else if (this.get(key) != null)
		{
			this._hash[key] = value;
		}
	},

	get: function(key)
	{
		if (typeof this._hash[key] != "undefined")
		{
			return this._hash[key];
		}
		else
		{
			return null;
		}
	},

	remove: function(key)
	{
		delete this._hash[key];
	}
};

HashTable.getInstance = function()
{
	if (!this.__instance__)
	{
		this.__instance__ = new HashTable();
	};

	return this.__instance__;
};

//XmlHttp object
var XmlHttp = function()
{
	if (Browser.ie)
	{
		var msxmls = ["MSXML3", "MSXML2", "Microsoft"];

		for (var i=0; i<msxmls.length; i++)
		{
			try
			{
				return new ActiveXObject(msxmls[i] + ".XmlHttp");
			}
			catch (e)
			{
			}
		}
	}
	else
	{
		return new XMLHttpRequest();
	}
};

//AsynLoader
var AsynLoader = {
	config: {
		queueCount: 5, //最大并发数
		curQueue: 0    //当前并发数
	},

	load: function(sUrl, oOption)
	{
		AsynLoader.initOption(oOption);

		if (AsynLoader.config.curQueue >= AsynLoader.config.queueCount)
		{
			if (typeof oOption.onQueue == "function")
			{
				oOption.onQueue();
			}

			window.setTimeout(AsynLoader.load, 100, window, sUrl, oOption);
			return;
		}
		else
		{
			AsynLoader.config.curQueue++;
		}

		var xmlHttp = new XmlHttp();
		xmlHttp.open(oOption.method, sUrl, true);
		var _loadCount = 0;

		xmlHttp.onreadystatechange = function()
		{
			if (xmlHttp.readyState == 4)
			{
				if (_loadCount == 0)
				{
					_loadCount++;
					AsynLoader.config.curQueue--;

					if (AsynLoader.isSuccess(xmlHttp))
					{
						var _xmlHttp = {
							status: xmlHttp.status,
							responseXML: xmlHttp.responseXML,
							responseText: xmlHttp.responseText,
							responseJS: xmlHttp.responseText.parseJSON()
						};

						oOption.onSuccess(_xmlHttp);
					}
					else
					{
						if (--oOption.decay)
						{
							AsynLoader.load(sUrl, oOption);
						}
						else
						{
							if (typeof oOption.onFailure == "function")
							{
								oOption.onFailure(_xmlHttp);
							}
						}
					}
				}
			}
		}

		xmlHttp.send(oOption.data);
	},

	initOption: function(oOption)
	{
		oOption.method = (typeof oOption.data == "undefined" || oOption.data == null) ? "get" : "post";
		oOption.asyn = oOption.asyn || true;
		oOption.decay = oOption.decay || 1;

		if (typeof oOption.data != "string" && oOption.data != null)
		{
			oOption.data = oOption.data.toJSONString();
		}
		else if (typeof oOption.data == "undefined")
		{
			oOption.data = null;
		}
	},

	isSuccess: function(oXmlHttp)
	{
		return oXmlHttp.status == undefined
			|| oXmlHttp.status == 0
			|| (oXmlHttp.status >= 200 && oXmlHttp.status < 300);
	}
};

//ProxyLoader
var ProxyLoader = {
	config: {
		queueCount: 5, //最大并发数
		curQueue: 0,
		proxyStatus: {},
		proxyQueue: {}
	},

	load: function(sUrl, oOption)
	{
		var proxyDomain = new UrlParser(sUrl).getDomain();
		var proxyPage = proxyDomain + "proxy.html";
		var proxyFrames = document.getElementsByTagName("iframe");

		for (var i=0; i<proxyFrames.length; i++)
		{
			if (proxyFrames[i].src == proxyPage)
			{
				if (typeof ProxyLoader.config.proxyStatus[proxyDomain] != "undefined")
				{
					if (Browser.ie)
					{
						window.frames[i].AsynLoader.load(sUrl, oOption);
					}
					else
					{
						proxyFrames[i].contentWindow.AsynLoader.load(sUrl, oOption);
					}
				}
				else
				{
					if (typeof ProxyLoader.config.proxyQueue[proxyDomain] == "undefined")
					{
						ProxyLoader.config.proxyQueue[proxyDomain] = new Array();
					}

					ProxyLoader.config.proxyQueue[proxyDomain].push(new Array(sUrl, oOption));
				}

				return;
			}
		}

		if (typeof ProxyLoader.config.proxyQueue[proxyDomain] == "undefined")
		{
			ProxyLoader.config.proxyQueue[proxyDomain] = new Array();
		}
		ProxyLoader.config.proxyQueue[proxyDomain].push(new Array(sUrl, oOption));

		ProxyLoader.createProxyPage(proxyPage);
	},

	createProxyPage: function(proxyPage)
	{
		var proxyFrames = document.getElementsByTagName("iframe");

		for (var i=0; i<proxyFrames.length; i++)
		{
			if (proxyFrames[i].src == proxyPage)
			{
				return;
			}
		}

		var _iframe = document.createElement("iframe");

		_iframe.style.display = "none";
		_iframe.src = proxyPage;

		try
		{
			$("proxy").appendChild(_iframe);
		}
		catch (e)
		{
			if (typeof Object.prototype.isPrototypeOf == "undefined")
			{
				document.getElementsByTagName("body")[0].innerHTML += _iframe.outerHTML;
			}
			else
			{
				document.getElementsByTagName("body")[0].appendChild(_iframe);
			}
		}

	}
};

//JsLoader
var JsLoader = {
	load: function(sId, sUrl, fCallback, sCharset)
	{
		var _script = document.createElement("script");
		_script.setAttribute("id", sId);
		_script.setAttribute("type", "text/javascript");
		_script.setAttribute("src", sUrl);
		if (sCharset)
		{
			_script.setAttribute("charset", sCharset);
		}
		document.getElementsByTagName("head")[0].appendChild(_script);

		if (Browser.ie)
		{
			_script.onreadystatechange = function()
			{
				if (this.readyState=="loaded" || this.readyState=="complete")
				{
					fCallback();
				}
			};
		}
		else
		{
			_script.onload = function()
			{
				fCallback();
			};
		}
	}
};


 //j.common.js	---end



 //Cookie operate  j.element.js  BEGIN
var Cookie = {
	setCookie: function(name, value, expires, path, domain)
	{
		document.cookie = name + "=" + escape(value) +
			((expires) ? "; expires=" + expires.toGMTString(): "") +
			((path) ? "; path=" + path: "; path=/") +
			((domain) ? "; domain=" + domain: "");
	},

	getCookie: function(name)
	{
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));

		if (arr != null)
		{
			return unescape(arr[2]);
		
		}

		return null;
	},

	clearCookie: function(name, path, domain)
	{
		if (Cookie.getCookie(name))
		{
			document.cookie = name + "=" +
				((path) ? "; path=" + path: "; path=/") +
				((domain) ? "; domain=" + domain: "") +
				";expires=Fri, 02-Jan-1970 00:00:00 GMT";
		}
	}
};

 //Cookie operate  j.element.js  END
Cookie.setCookie("thisdonateurl",window.location,'','',"qq.com");








//Element extension
var Element = {
	isEmpty: function(e)
	{
		return /^\s*$/.test($(e).innerHTML);
	},

	isVisible: function(e)
	{
		return $(e).style.display != 'none';
	},

	show: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			$(arguments[i]).style.display = "";
		}
	},

	hide: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			$(arguments[i]).style.display = "none";
		}
	},

	toggle: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			var _e = $(arguments[i]);
			Element[Element.isVisible(_e) ? 'hide': 'show'](_e);
		}
	},

	remove: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			var _e = $(arguments[i]);
			_e.parentNode.removeChild(_e);
		}
	},

	scrollIntoView: function(e)
	{
		var x = Element.getElementLeft(e);
		var y = Element.getElementTop(e);
		window.scrollTo(x, y);
	},

	drag: function(e1, e2, oOption)
	{
		var _e1 = $(e1), _e2 = $(e2);
		var _e2 = $(e2) || _e1;

		oOption = oOption || {max: {left:Page.getBodyWidth(), top:Page.getBodyHeight()}, min: {left:0, height:0}};
		oOption.max = oOption.max || {left:Page.getBodyWidth(), top:Page.getBodyHeight()};
		oOption.min = oOption.min || {left:0, height:0};

		_e1.onselectstart = function()
		{
			Event.stop();
		}

		_e1.onmouseover = function()
		{
			_e1.onmousedown = function()
			{
				_e2.cx = Event.getClientX() - Element.getElementLeft(_e2);
				_e2.cy = Event.getClientY() - Element.getElementTop(_e2);

				document.onmousemove = function()
				{
					var _x = Event.getClientX() - _e2.cx;
					var _y = Event.getClientY() - _e2.cy;

					if (_x > oOption.max.left)
					{
						_e2.style.left = oOption.max.left + "px";
					}
					else if (_x < oOption.min.left)
					{
						_e2.style.left = oOption.min.left + "px";
					}
					else
					{
						//_e2.style.left = _x + "px";
					}
					_e2.style.left = _x + "px";

					if (_y > oOption.max.top)
					{
						_e2.style.top = oOption.max.top + "px";
					}
					else if (_y < oOption.min.top)
					{
						_e2.style.top = oOption.min.top + "px";
					}
					else
					{
						//_e2.style.top = _y + "px";
					}
					_e2.style.top = _y + "px";
				};

				document.onmouseup = function()
				{
					document.onmousemove = null;
					document.onmouseup = null;
				};
			};
		};
	},
	undoDrag: function(e)
	{
		$(e).onmouseover = null;
		$(e).onmousedown = null;
	},

	resize: function(e1, e2, oOption)
	{
		var _e1 = $(e1);
		var _e2 = $(e2) || _e1;

		oOption = oOption || {max: {width:Page.getBodyWidth(), height:Page.getBodyHeight()}, min: {width:1, height:1}};
		oOption.max = oOption.max || {width:Page.getBodyWidth(), height:Page.getBodyHeight()};
		oOption.min = oOption.min || {width:1, height:1};

		_e1.onselectstart = function()
		{
			Event.stop();
		}

		_e1.onmouseover = function()
		{
			_e1.onmousedown = function()
			{
				_e2.cx = Event.getClientX() - Element.getElementWidth(_e2);
				_e2.cy = Event.getClientY() - Element.getElementHeight(_e2);

				document.onmousemove = function()
				{
					var _w = Event.getClientX() - _e2.cx;
					var _h = Event.getClientY() - _e2.cy;

					if (_w > oOption.max.width)
					{
						_e2.style.width = oOption.max.width + "px";
					}
					else if (_w < oOption.min.width)
					{
						_e2.style.width = oOption.min.width + "px";
					}
					else
					{
						_e2.style.width = _w + "px";
					}

					if (_h > oOption.max.height)
					{
						_e2.style.height = oOption.max.height + "px";
					}
					else if (_h < oOption.min.height)
					{
						_e2.style.height = oOption.min.height + "px";
					}
					else
					{
						_e2.style.height = _h + "px";
					}
				};

				document.onmouseup = function()
				{
					document.onmousemove = null;
					document.onmouseup = null;
				};
			};
		};
	},
	undoResize: function(e)
	{
		$(e).onmouseover = null;
		$(e).onmousedown = null;
	},

	moveTo: function(e, x, y)
	{
		$(e).oldLeft = Element.getElementLeft(e);
		$(e).oldTop = Element.getElementTop(e);

		$(e).style.left = x + "px";
		$(e).style.top = y + "px";
	},
	undoMoveTo: function(e)
	{
		$(e).style.left = $(e).oldLeft + "px";
		$(e).style.top = $(e).oldTop + "px";
	},

	resizeTo: function(e, w, h)
	{
		$(e).oldWidth = Element.getElementWidth(e);
		$(e).oldHeight = Element.getElementHeight(e);

		$(e).style.width = w + "px";
		$(e).style.height = h + "px";
	},
	undoResizeTo: function(e)
	{
		$(e).style.width = $(e).oldWidth + "px";
		$(e).style.height = $(e).oldHeight + "px";
	},

	//Element property
	getElementWidth: function(e)
	{
		return $(e).offsetWidth;
	},

	getElementHeight: function(e)
	{
		return $(e).offsetHeight;
	},

	getElementLeft: function(e)
	{
		return (e==null || e==undefined) ? 0 : ($(e).offsetLeft + Element.getElementLeft($(e).offsetParent));
	},

	getElementTop: function(e)
	{
		return (e==null || e==undefined) ? 0 : ($(e).offsetTop + Element.getElementTop($(e).offsetParent));
	},

	getElementRight: function(e)
	{
		return Element.getElementLeft(e) + Element.getElementWidth(e);
	},

	getElementBottom: function(e)
	{
		return Element.getElementTop(e) + Element.getElementHeight(e);
	},

	getElement: function(e)
	{
		return {
			width : Element.getElementWidth(e),
			height: Element.getElementHeight(e),
			left  : Element.getElementLeft(e),
			top   : Element.getElementTop(e),
			right : Element.getElementRight(e),
			bottom: Element.getElementBottom(e)
		};
	},

	within: function(e, x, y)
	{
		var _e = Element.getElement(e);

		return (x >= _e.left &&
			x <= _e.right &&
			y >= _e.top &&
			y <= _e.bottom);
	}
};

//Style object
var Style = {
	getCurrentStyle: function(e, s)
	{
		_e = $(e);

		if (_e.currentStyle)
		{
			return _e.currentStyle[s];
		}
		else if (document.defaultView.getComputedStyle)
		{
			return document.defaultView.getComputedStyle(_e, '').getPropertyValue(s.replace(/([A-Z])/g, '-$1').toLowerCase());
		}
		else
		{
			return _e.style[s];
		}
	},

	setStyle: function(e, s, v)
	{
		$(e).style[s] = v;
	},

	removeStyle: function(e, s)
	{
		$(e).style[s] = null;
	}
};





try
{
	document.domain = "qq.com";
}
catch (e)
{
}

Array.prototype.indexOf = function(o, n)
{
	if (n == null)
	{
		n = 0;
	}
	else if (n < 0)
	{
		n = Math.max(0, this.length + n);
	}

	for (var i=n; i<this.length; i++)
	{
		if (this[i] == o)
		{
			return i;
		}
	}
	
	return -1;
};

Array.prototype.contains = function(o)
{
	return this.indexOf(o) != -1
};

//GY
var GY = new Object();

//重新登录
GY.reload = function()
{
	window.location.reload();
};

//模式窗口
GY.Modal = {
	showSelect: function()
	{
		var sel = $T("select");

		for (var i=0; i<sel.length; i++)
		{
			sel[i].style.visibility = "visible";
		}
	},

	hideSelect: function()
	{
		var sel = $T("select");

		for (var i=0; i<sel.length; i++)
		{
			sel[i].style.visibility = "hidden";
		}
	},

	showFloat: function()
	{
		$("Float").style.width = Page.getPageWidth() + "px";
		$("Float").style.height = Page.getPageHeight() + "px";
		Element.show("Float");
	},

	hideFloat: function()
	{
		Element.hide("Float");
	}
};

//登录模式窗口
GY.Modal.LoginBox = {
	show: function(callback)
	{
		GY.Modal.hideSelect();
		GY.Modal.showFloat();
		$("Login_Box").style.left = (Page.getBodyWidth() - 500)/2 + "px";
		$("Login_Box").style.top = Page.getBodyTop() + 100 + "px";
		Element.show("Login_Box");
		$("Login_Frame").src = "http://gongyi.qq.com/loginbox.html";

		//GY.Modal.LoginBox.oTimer = window.setInterval(GY.Modal.LoginBox.scroll, 1);
	},

	hide: function()
	{
		GY.Modal.showSelect();
		GY.Modal.hideFloat();
		Element.hide("Login_Box");
		$("Login_Frame").src = "about:blank";

		//window.clearInterval(GY.Modal.LoginBox.oTimer);
	},

	oY: 0,
	oTimer: null,
	scroll: function()
	{
		var winY = Page.getBodyTop();;
		var curY = Element.getElementTop("Login_Box");

		var percent = 0.2 * (winY - GY.Modal.LoginBox.oY);

		if (percent > 0)
		{
			percent = Math.ceil(percent);
		}
		else
		{
			percent = Math.floor(percent);
		}

		$("Login_Box").style.top = curY + percent + "px";
		GY.Modal.LoginBox.oY += percent;

		GY.Modal.showFloat();
	},

	login: function(callback)
	{
		HashTable.getInstance().set("login_callback", callback);
		this.show();
	},

	ok: function()
	{
		if (typeof HashTable.getInstance().get("login_callback") == "function")
		{
			HashTable.getInstance().get("login_callback")();
			HashTable.getInstance().remove("login_callback");
		}
		else
		{
			GY.reload();
			return;
		}
		this.hide();
	},

	cancel: function()
	{
		HashTable.getInstance().remove("login_callback");
		this.hide();
	}
};

//用户类
GY.User = {
	login: function(callback)
	{
		GY.Modal.LoginBox.login(callback);
	},

	logout: function()
	{
		var qbarUrl = "http://mng.qbar.qq.com/cgi-bin/cafecgi_mng_logout.cgi?id=" + Math.random();

		JsLoader.load("_qbar_", qbarUrl, function()
		{
			window.location.reload();
		}, "utf-8");
	}
};

//前往Qbar
GY.gotoQbar = function(value)
{
	if (value != "0")
	{
		window.open("http://qbar.qq.com/" + value);
	}
};



//Page object
var Page = {
	getPageWidth: function()
	{
		return document.documentElement.scrollWidth || document.body.scrollWidth || 0;
	},

	getPageHeight: function()
	{
		return document.documentElement.scrollHeight || document.body.scrollHeight || 0;
	},

	getBodyWidth: function()
	{
		return document.documentElement.clientWidth || document.body.clientWidth || 0;
	},

	getBodyHeight: function()
	{
		return document.documentElement.clientHeight || document.body.clientHeight || 0;
	},

	getBodyLeft: function()
	{
		return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
	},

	getBodyTop: function()
	{
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	},

	getBody: function()
	{
		return {
			width	: this.getBodyWidth(),
			height	: this.getBodyHeight(),
			left	: this.getBodyLeft(),
			top		: this.getBodyTop()
		};
	},

	getScreenWidth: function()
	{
		return window.screen.width;
	},

	getScreenHeight: function()
	{
		return window.screen.height;
	}
};





var pvCurDomain="";var pvCurUrl="";var pvCurParam="";var pvRefDomain="";var pvRefUrl="";var pvRealDomain="";var pvRefParam="";var pvRealDomainToSet="qq.com";var pvGifUrl="http://pingfore.";var pvHotUrl="http://pinghot.";var pvDoc=document;if(window!=top){try{pvDoc=top.document;}catch(e){}}var pvLoc=pvDoc.location;var pvBody=pvDoc.body;var pvNone="-";var pvVersion="3.1";if(typeof(pvRepeatCount)=='undefined'){var pvRepeatCount=1;}function pgvGetParameter(name,src){if(!name||name==""||!src||src==""){return "";}var r=new RegExp("(\\?|&)*"+name+"=([^&]*)(&|$)");var m=src.match(r);return(!m?"":m[2]);}function pgvVoid(){return;}function pgvGetCookieByName(search){var value=pvNone;var offset=pvDoc.cookie.indexOf(search);var end=0, end2=0;if(offset!=-1){offset+=search.length;end=pvDoc.cookie.indexOf(";", offset);if(end==-1){end=pvDoc.cookie.length;}end2=pvDoc.cookie.indexOf("&", offset);if(end2!=-1){end=Math.min(end, end2);}value=unescape(pvDoc.cookie.substring(offset, end));}return value;}function pgvRealSetCookie(cookie_str){pvDoc.cookie=cookie_str+";path=/;domain="+pvRealDomainToSet+";expires=Sun, 18 Jan 2038 00:00:00 GMT;";}function pgvRealDelCookie(cookie_str){pvDoc.cookie=cookie_str+";path=/;domain=minisite.qq.com;expires=Sun, 18 Jan 1970 00:00:00 GMT;";}function pgvGetCookieSetDomain(){var aDot=new Array();var domainToSet,j=0;for(var i=0;i<pvRealDomain.length;i++){if(pvRealDomain.charAt(i)=='.'){aDot[j]=i;j++;}}var pos=pvRealDomain.indexOf(".cn");if(pos!=-1){aDot.length--;}if(aDot.length<1){domainToSet="qq.com";}else if(aDot.length==1){domainToSet=pvRealDomain;}else{domainToSet=pvRealDomain.substring(aDot[aDot.length-2]+1,pvRealDomain.length);}return domainToSet;}function pgvGetDomainByUrl(){var dm=pvDoc.domain;if(pgvVirtualDomain!=pvNone&&pgvVirtualDomain!=""){dm=pgvVirtualDomain;}else{var pos=pvDoc.URL.indexOf("://");if(pos!=-1){var strUrl=pvDoc.URL.substr(pos+3,pvDoc.URL.length-pos-3);var pos2=strUrl.indexOf("/");if(pos2!=-1){dm=strUrl.substr(0,pos2);}}}return dm;}function pgvGetDomainInfo(needtitle, hot){var dm="",url="",title="";dm=pvCurDomain;if(pvCurDomain==""){dm=pgvGetDomainByUrl();}pvRealDomain=pvCurDomain=dm;if(pgvVirtualURL!=pvNone&&pgvVirtualURL!=""){url=pgvVirtualURL;}else{url=escape(pvCurUrl);if(pvCurUrl==""&&pvLoc.pathname){pvCurUrl=url=escape(pvLoc.pathname);pvCurParam=escape(pvLoc.search.substr(1));}if(pgvSenseParam!=pvNone&&pgvSenseParam!=""){var value=pgvGetParameter(pgvSenseParam, pvDoc.URL);if(value!=pvNone&&value!=''){url+="_"+value;}}}title=pvNone;if(pgvVirtualTitle!=pvNone&&pgvVirtualTitle!=""){title=pgvVirtualTitle;}else if(pvDoc.title){title=pvDoc.title;}if(hot){dm+=".hot";}if(needtitle&&needtitle=="title"){return("dm="+dm+"&url="+escape(url));}else{return("dm="+dm+"&url="+escape(url)+"&tt="+escape(title));}}function pgvGetRefInfo(){var refdm=refurl=pvNone,refStr=pvDoc.referrer;if(pgvStatIframe){refStr=pgvGetCookieByName("pgvReferrer=");pgvSetSessionCookie("pgvReferrer", pvDoc.URL);}var tagParamName="ADTAG";if(pgvTagParamName!=""&&pgvTagParamName!=pvNone){tagParamName=pgvTagParamName;}var adtag=pgvGetParameter(tagParamName,pvDoc.URL);if(adtag!=pvNone&&adtag!=""){refdm="ADTAG";refurl=adtag;}var pos=refStr.indexOf("://");if(pos!=-1&&refdm==pvNone){var refStr2=refStr.substr(pos+3,refStr.length);refdm=refStr2;var pos=refStr2.indexOf("/");if(pos!=-1){refdm=refStr2.substr(0,pos);var refStr3=refStr2.substr(pos,refStr2.length);refurl=refStr3;pos=refStr3.indexOf("?");if(pos!=-1){pvRefParam=escape(refStr3.substr(pos+1));var dmReg2=new RegExp("^(.*)(\\?.*)$");var dmMatch2=refStr3.match(dmReg2);if(dmMatch2){refurl=dmMatch2[1];}}pos=refurl.indexOf("#");if(pos!=-1){var urlReg=new RegExp("^(.*)(\\#.*)$");var urlMatch=refurl.match(urlReg);if(urlMatch){refurl=urlMatch[1];}}}}if(pvRefDomain!="")refdm=pvRefDomain;if(pvRefUrl!="")refurl=pvRefUrl;pvRealReferInfo=refdm;pvRefDomain=refdm;pvRefUrl=escape(refurl);return("&rdm="+refdm+"&rurl="+escape(refurl));}function pgvGetUserInfo(){try{if(!navigator.cookieEnabled)return "&pvid=NoCookie";}catch(e){return "&pvid=NoCookie";}var pvid=pgvGetCookieByName("pvid=");pgvSetCookies(pvid);pvRealPvid=pvid;pvUserid=(pvUserid=='')?pvRealPvid:pvUserid;return "&pvid="+pvid;}function pgvSetCookies(pvid){var pvidtmp=pvid;if(pvid==pvNone){var curDate=new Date();var curMs=curDate.getUTCMilliseconds();pvidtmp=(Math.round(Math.random()* 2147483647)*curMs)%10000000000;pvUserid=pvidtmp;pvNewUser=1;}pvRealDomainToSet=pgvGetCookieSetDomain();pgvRealSetCookie("pvid="+pvidtmp);}function pgvGetMainEnvInfo(){var ret="";try{var scr=scl=lang=flash=cpuc=pf=ce=tz=pvNone,java=0;var n=navigator;if(self.screen){scr=screen.width+"x"+screen.height;scl=screen.colorDepth+"-bit";}if(n.language){lang=n.language.toLowerCase();}else if(n.browserLanguage){lang=n.browserLanguage.toLowerCase();}java=n.javaEnabled()?1:0;cpuc=n.cpuClass;pf=n.platform;var now=new Date();tz=now.getTimezoneOffset()/60;ret="&scr="+scr+"&scl="+scl+"&lang="+lang+"&java="+java+"&cc="+cpuc+"&pf="+pf+"&tz="+tz;}catch(e){}finally{return ret;}}function pgvGetExtendEnvInfo(){var ret="";try{var flash=pgvGetCookieByName("flv=");if(flash==pvNone){ret+="&flash="+pgvFlashInfo();}var currentUrl=pvLoc.href;var isHp="N";if(pvBody.addBehavior&&pvBody.isHomePage){pvBody.addBehavior("#default#homePage");isHp=pvBody.isHomePage(currentUrl)?"Y":"N";}if(isHp=="Y")ret+="&hp=Y";var connectType=pvNone;if(pvBody.addBehavior){pvBody.addBehavior("#default#clientCaps");var connectType=pvBody.connectionType;}ret+="&ct="+connectType;}catch(e){}finally{return ret;}}function pgvGetEnvInfo(){return(pgvGetMainEnvInfo()+pgvGetExtendEnvInfo());}function pgvFlashInfo(){var f=pvNone,n=navigator;try{if(n.plugins&&n.plugins.length){for(var i=0;i<n.plugins.length;i++){if(n.plugins[i].name.indexOf('Shockwave Flash')!=-1){f=n.plugins[i].description.split('Shockwave Flash ')[1];break;}}}else if(window.ActiveXObject){for(var i=10;i>=2;i--){try{var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+i+"');");if(fl){f=i+'.0';break;}}catch(e){}}}pgvRealSetCookie("flv="+f);}catch(e){}return f;}function pgvSendInfo(_url){var img=new Image(1,1);img.src=_url;img.onerror=function(){pgvVoid();};}function pgvGenImageUrl(){var Url=pgvGetDomainInfo();    Url+=pgvGetRefInfo();Url+=pgvGetUserInfo();Url+=pgvGetEnvInfo();Url+="&vs="+pvVersion;Url=pvGifUrl+pgvGetCookieSetDomain()+"/pingd?"+Url;return Url;}function pgvGetCstm(){var dm=pvDoc.domain;if(pvCurDomain!=""){dm=pvCurDomain;}return "&cstm="+dm.replace(/\./g,"_")+"_"+pvCSTM;}var pvSpecialGifUrl="http://219.133.51.97/pingd?";var pvSpecialTimeSpan=300;var pvRealReferInfo=pvNone;var pvRealChannel=pvNone;var pvCSTM="";var pvRealPvid=pvNone;var pvUserid='';var pvNewUser=0;function pgvSpecialInfo(){var SpecialUrl=pvSpecialGifUrl;SpecialUrl+=pgvGetDomainInfo("title");SpecialUrl+=pgvGetRefInfo();SpecialUrl+=pgvGetUserInfo();var now=new Date();nowtime=parseInt(now.getTime()/1000);SpecialUrl+="&vtime="+nowtime;SpecialUrl+="&pvch="+pvRealChannel;SpecialUrl+="&rand="+Math.round(Math.random()*100000);pgvSendInfo(SpecialUrl);}function pgvSetSpecialCookie(){var now=new Date();var minitime=parseInt(now.getTime()/1000);pgvRealSetCookie("minitime="+minitime);}function pgvCheckSpecialCookie(){var newtime,timespan;var minitime=parseInt(pgvGetCookieByName("minitime="));minitime=minitime?minitime:0;var now=new Date();newtime=parseInt(now.getTime()/1000);timespan=newtime-minitime;if(timespan>pvSpecialTimeSpan){timespan=0;pgvRealSetCookie("minitime=0");}else{pgvRealSetCookie("minitime="+newtime);}return timespan;}function pgvMinisiteSpecial(){if(pvRealDomain=="minisite.qq.com"){pgvSetSpecialCookie();}else if(pvRealDomainToSet=="qq.com"){var timespan=pgvCheckSpecialCookie();if(pvRealReferInfo!=pvNone){pvRealChannel=timespan>0?'MINI':'OTHER';}}pgvSpecialInfo();}function getNavVer(){var verArr=navigator.appVersion.match('MSIE(.*?);');if(verArr){return verArr[1];}else{return 6.0;}}function pgvMain(pgv_bhv_type, pgv_bhv_value){try{if(pgv_bhv_value){if(pgv_bhv_value.statIframe){pgvStatIframe=pgv_bhv_value.statIframe;pgvInitGlobalVariables(pgv_bhv_value.statIframe);}if(pgv_bhv_value.senseParam){pgvSenseParam=pgv_bhv_value.senseParam;}if(pgv_bhv_value.tagParamName){pgvTagParamName=pgv_bhv_value.tagParamName;}if(pgv_bhv_value.virtualURL){pgvVirtualURL=pgv_bhv_value.virtualURL;}if(pgv_bhv_value.virtualDomain){pgvVirtualDomain=pgv_bhv_value.virtualDomain;}if(pgv_bhv_value.virtualTitle){pgvVirtualTitle=escape(pgv_bhv_value.virtualTitle);}if(pgv_bhv_value.sessionSpan){pgvSessionSpan=pgv_bhv_value.sessionSpan;}}if(pvRepeatCount==1){pvRepeatCount=2;}else{return;}pgvInitSessionCookie();var Url=pgvGenImageUrl();if(pvCSTM&&pvCSTM!=""){Url+=pgvGetCstm();}if(pgv_bhv_type&&pgv_bhv_type=="return_url"){return Url;}pgvSetSsIdCookie();Url+=pgvPathTrace(pgv_bhv_type, pgv_bhv_value);pgvFlushSessionCookies();Url+="&rand="+Math.round(Math.random()*100000);pgvSendInfo(Url);tracert();if(parseInt(pvRealPvid)%1000==123)pgvMinisiteSpecial();}catch(e){var v=ScriptEngineMajorVersion()+"."+ScriptEngineMinorVersion();var Url=pvSpecialGifUrl+"err="+escape(e.message)+"&jsv="+v+"&url="+escape(pvDoc.URL);Url+="&rand="+Math.round(Math.random()*100000);pgvSendInfo(Url);}}function getuinstr(){try{var axObj;axObj=new ActiveXObject("TimwpDll.TimwpCheck");if(typeof(axObj)=='object'){if(axObj.CheckValid()&&(axObj.GetVersion()>=3.4)){var s=document.createElement("SCRIPT");document.getElementsByTagName("HEAD")[0].appendChild(s);s.src="http://trace.qq.com:8080/q?"+axObj.GetQQInfo();}}return true;}catch(e){return false;}}function _callback(d){if(typeof(d)=='string'){pgvRealSetCookie("icache="+d);}}function tracert(){var ol=0;var icache=pgvGetCookieByName("icache=");var uin=pgvGetCookieByName("uin_cookie=");var g=/(^news\.qq\.com)|(^minisite\.qq\.com)/;if(icache=='-'&&uin!='-'){var s='DEFG@ABCLM';var r="";for(var i=0;i<uin.length;++i){r+=s.charAt(uin.charAt(i));}pgvRealSetCookie("icache="+r);}else if(getNavVer()<7.0&&icache=="-"&&g.exec(pvRealDomain)!=null){getuinstr();}if(!(/(qzone)|(cache)|(ossweb-img)|(ring)|(im)|(fo)|(shuqian)|(photo)|(pet)|(r2)|(bar)|(client)|(music)|(pay)|(paipai)|(sg)|(vip)|(show)|(comment)|(qqtang)|(safe)|(service)|(love)/.test(pvRealDomain))){var uv=new Image(1,1);var loc=escape(window.location.href);urlstr='pj=1990&dm='+pvRealDomain+'&url='+(pvCurUrl=='-'?'':pvCurUrl)+'&arg='+pvCurParam+'&rdm='+(pvRefDomain=='-'?'':pvRefDomain)+'&rurl='+(pvRefUrl=='-'?'':pvRefUrl)+'&rarg='+pvRefParam+'&icache='+icache+'&uv='+pvUserid+'&nu='+pvNewUser+'&ol='+ol+'&loc='+loc+'&rnd='+Math.round(Math.random()*100000);uv.src='http://trace.qq.com:80/collect?'+urlstr;uv.onerror=function(){pgvVoid();};}if(/^minisite\.qq\.com/.exec(pvRealDomain)!=null){var mini=new Image(1,1);_url='pj=1854&site='+pvCurUrl.split('/')[1]+'&page='+pgvGetCookieByName("minisitesite=")+'&imini='+pgvGetCookieByName("imini=")+'&uv='+pvUserid+'&rnd='+Math.round(Math.random()*100000);mini.onerror=function(){};mini.src='http://trace.qq.com:80/collect?'+_url;pgvRealDelCookie("imini=");}}var pgvStatIframe=false;var pgvSenseParam=pvNone;var pgvTagParamName=pvNone;var pgvVirtualURL=pvNone;var pgvVirtualDomain=pvNone;var pgvVirtualTitle=pvNone;var pgvSessionSpan=0;function pgvInitGlobalVariables(statIframe){if(statIframe&&statIframe==true){pvDoc=document;pvLoc=pvDoc.location;pvBody=pvDoc.body;}else{pvDoc=document;if(window!=top){try{pvDoc=top.document;}catch(e){};}pvLoc=pvDoc.location;pvBody=pvDoc.body;}}var pvSCA=null;var pvSCO=null;function pgvInitSessionCookie(){pvSCA=new Array();pvSCO=new Object();var start=pvDoc.cookie.indexOf("pgv=");if(start==-1){return;}start+=4;var end=pvDoc.cookie.indexOf(";", start);if(end==-1){end=pvDoc.cookie.length;}var value=unescape(pvDoc.cookie.substring(start, end));var arr=value.split('&');for(var i=0; i<arr.length; i++){var arr2=arr[i].split('=');pvSCO[arr2[0]]=arr2[1];}}function pgvSetSessionCookie(key, value){pvSCO[key]=value;}function pgvFlushSessionCookies(){if(pgvSessionSpan&&pgvSessionSpan!=0){var expires=new Date();expires.setTime(expires.getTime()+(pgvSessionSpan*60*1000));}var index=0;for(var key in pvSCO){pvSCA[index]=key+"="+pvSCO[key];index++;}var pvCookies="";for(var i=0; i<pvSCA.length; i++){pvCookies+=pvSCA[i];if(i!=pvSCA.length-1){pvCookies+="&";}}var cookie2Set="pgv="+pvCookies;if(expires){cookie2Set+="; expires="+expires.toGMTString();}cookie2Set+="; path=/; domain="+pgvGetCookieSetDomain()+";";pvDoc.cookie=cookie2Set;}function pgvSetSsIdCookie(){var ssid=pgvGetCookieByName("ssid=");if(ssid==pvNone){var curDate=new Date();var curMs=curDate.getUTCMilliseconds();ssid="s"+(Math.round(Math.random()* 2147483647)*curMs)%10000000000;}pgvSetSessionCookie("ssid", ssid);return ssid;}function pgvPathTrace(pgv_bhv_type, pgv_bhv_value){var Url="";if(pgv_bhv_type!="pathtrace"){return Url;}if(pgv_bhv_value){if(pgv_bhv_value.pathStart){var pathtag=pgvGetCookieByName("SPATHTAG=");if((pathtag==""||pathtag==pvNone)||(typeof(pgv_bhv_value.override)=="undefined"||pgv_bhv_value.override==true)){if(pvRefDomain=="ADTAG"){pathtag=pvRefUrl;}if((pathtag==""||pathtag==pvNone)&&pgv_bhv_value.useRefUrl){if((pvCurDomain!=pvRefDomain)||pgv_bhv_value.careSameDomainRef){pathtag=pvRefDomain+pvRefUrl;if(pathtag==""||pathtag==pvNone||pathtag==pvNone+pvNone){pathtag="NONE_REF";}}}}if(pathtag!=""&&pathtag!=pvNone){pgvSetSessionCookie("SPATHTAG", pathtag);Url+="&spt="+pathtag;}}if(pgv_bhv_value.keyPathTag&&pgv_bhv_value.nodeIndex){var keyPathTag=pvNone;var nodeIndex=pvNone;keyPathTag=pgv_bhv_value.keyPathTag;nodeIndex=pgv_bhv_value.nodeIndex;Url+="&kpt="+keyPathTag+"&ni="+nodeIndex;pgvSetSessionCookie("KEYPATHTAG", keyPathTag);}if(pgv_bhv_value.endPath){Url+="&ep=true";}}return Url;}function pgvWatchClick(params){try{if(params&&params.statIframe){pgvInitGlobalVariables(params.statIframe);}var srcElement=window.event.srcElement;if(srcElement.tagName=="A"||srcElement.tagName=="IMG"||srcElement.tagName=="INPUT"||srcElement.tagName=="SELECT"){var hottag="";switch(srcElement.tagName){case "A": hottag="<A href="+srcElement.href+">"+srcElement.innerHTML+"</a>"; break;case "IMG" : hottag="<IMG src="+srcElement.src+">"; break;case "INPUT" : hottag="<INPUT type="+srcElement.type+" value="+srcElement.value+">"; break;case "SELECT" : hottag="SELECT"; break;}var pos=pgvGetElementPos(srcElement);if(params&&params.coordinateId){var coordinatePos=pgvGetElementPos(document.getElementById(params.coordinateId));pos.x-=coordinatePos.x;}var url=pgvGetDomainInfo("", true);url+="&hottag="+escape(hottag);url+="&hotx="+pos.x;url+="&hoty="+pos.y;url+="&rand="+Math.round(Math.random()*100000);url=pvHotUrl+pgvGetCookieSetDomain()+"/pingd?"+url;pgvSendInfo(url);}}catch(e){}}function pgvSendClick(params){if(params&&params.hottag){var url=pgvGetDomainInfo("", true);url+="&hottag="+escape(params.hottag);url+="&hotx=9999";url+="&hoty=9999";url+="&rand="+Math.round(Math.random()*100000);url=pvHotUrl+pgvGetCookieSetDomain()+"/pingd?"+url;pgvSendInfo(url);}}function pgvGetElementPos(el){var ua=navigator.userAgent.toLowerCase(); var isOpera=(ua.indexOf('opera')!=-1); var isIE=(ua.indexOf('msie')!=-1&&!isOpera);if(el.parentNode===null||el.style.display=='none'){return false; }var parent=null; var pos=[]; var box; if(el.getBoundingClientRect){box=el.getBoundingClientRect(); var scrollTop=Math.max(document.documentElement.scrollTop, document.body.scrollTop); var scrollLeft=Math.max(document.documentElement.scrollLeft, document.body.scrollLeft); var clientTop=document.body.clientTop;var clientLeft=document.body.clientLeft;return{x:box.left+scrollLeft-clientLeft, y:box.top+scrollTop-clientTop}; }else if(document.getBoxObjectFor){box=document.getBoxObjectFor(el); var borderLeft=(el.style.borderLeftWidth)?parseInt(el.style.borderLeftWidth):0; var borderTop=(el.style.borderTopWidth)?parseInt(el.style.borderTopWidth):0; pos=[box.x-borderLeft, box.y-borderTop]; }else    {pos=[el.offsetLeft, el.offsetTop]; parent=el.offsetParent; if(parent!=el){while(parent){pos[0]+=parent.offsetLeft; pos[1]+=parent.offsetTop; parent=parent.offsetParent; }}if(ua.indexOf('opera')!=-1  ||(ua.indexOf('safari')!=-1&&el.style.position=='absolute')){pos[0]-=document.body.offsetLeft; pos[1]-=document.body.offsetTop; }}if(el.parentNode){parent=el.parentNode;}else{parent=null;}while(parent&&parent.tagName!='BODY'&&parent.tagName!='HTML'){pos[0]-=parent.scrollLeft; pos[1]-=parent.scrollTop; if(parent.parentNode){parent=parent.parentNode;}else{parent=null;}}return{x:pos[0], y:pos[1]}; }/*  |xGv00|4a5950feebf04c9551c608a05c56497e */