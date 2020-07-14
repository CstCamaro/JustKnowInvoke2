try {
    document.domain = "qq.com"
} catch(e) {}
String.prototype.hasString = function(b) {
    if (typeof b == "object") {
        for (var a = 0,
        c = b.length; a < c; a++) if (!this.hasString(b[a])) return false;
        return true
    } else if (this.indexOf(b) != -1) return true
};
function UIAjaxForFollow(o){
	var xmlHttp,
		complete,
		timeout;
	if(o.crossDomain){
		var crossFrame = UI.G('proxy_ifrm');			
		if(!crossFrame)
			return;
		xmlHttp = crossFrame.contentWindow.xmlHttp();
	}
	else xmlHttp = UIXmlHttpForFollow(); 
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 1){
			if (o.timeout && o.fail){ //超时
				timeout = setTimeout(function(){
					if (!complete){
						xmlHttp.abort();
						o.fail();
					}
				},o.timeout);
			}
		}
		else if (xmlHttp.readyState == 2){
			if (o.send){
				o.send();
			}
		}
		else if (xmlHttp.readyState == 4){
			complete = 1;
			if (xmlHttp.status == 200){
				try{
					o.success(xmlHttp.responseText);
				}catch(e){}
			}
			else{
				if (o.fail){
					clearTimeout(timeout);
					o.fail();
				}
			}
		}
	}
	if (typeof o.data == 'object') {
		var data = [];
		for (var i in o.data) {
			data.push(i + '=' + encodeURIComponent(o.data[i]));
		}
		o.data = data.join('&');
	}
	if (o.type == 'get') {
		xmlHttp.open('GET',o.url + (o.url.hasString('?') ? '&' : '?') + o.data,true);
		xmlHttp.send(null);
	}
	else {
		xmlHttp.open('POST',o.url,true);
		xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlHttp.send(o.data);
	}
	return xmlHttp;
}
function UIXmlHttpForFollow(){
	var xmlHttp;
	if (window.ActiveXObject){
		xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	}else if (window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
	return xmlHttp;
}
UI = window.UI || {
    getScript: function(b, a, c) {
        var d = UI.DC("script");
        if (a) if (UI.B.ie) d.onreadystatechange = function() {
            if (d.readyState == "loaded" || d.readyState == "complete") a()
        };
        else d.onload = a;
        c && UI.A(d, "charset", c); 
        UI.A(d, "type", "text/javascript");
        UI.A(d, "src", b);
        UI.GT(document, "head")[0].appendChild(d)
    },
    cookie: function(b, a, c) {
        if (a == undefined) {
            b = b + "=";
            a = document.cookie.split(";");
            for (c = 0; c < a.length; c++) {
                for (var d = a[c]; d.charAt(0) == " ";) d = d.substring(1, d.length);
                if (d.indexOf(b) == 0) return decodeURIComponent(d.substring(b.length, d.length))
            }
            return null
        } else {
            d = "";
            if (c) {
                d = new Date;
                d.setTime(d.getTime() + c * 24 * 60 * 60 * 1E3);
                d = "; expires=" + d.toGMTString()
            }
            document.cookie = b + "=" + a + d + "; path=/"
        }
    },
    
    getX: function(b) {
        return b.offsetParent ? b.offsetLeft + UI.getX(b.offsetParent) : b.offsetLeft
    },
    getY: function(b) {
        return b.offsetParent ? b.offsetTop + UI.getY(b.offsetParent) : b.offsetTop
    },
    width: function(b) {
        return parseInt(b.offsetWidth)
    },
    height: function(b) {
        return parseInt(b.offsetHeight)
    },
    windowWidth: function() {
        var b = document.documentElement;
        return self.innerWidth || b && b.clientWidth || document.body.clientWidth
    },
    windowHeight: function() {
        var b = document.documentElement;
        return self.innerHeight || b && b.clientHeight || document.body.clientHeight
    },
    scrollX: function(b) {
        var a = document.documentElement;
        if (b) {
            var c = b.parentNode,
            d = b.scrollLeft || 0;
            if (b == a) d = UI.scrollX();
            return c ? d + UI.scrollX(c) : d
        }
        return self.pageXOffset || a && a.scrollLeft || document.body.scrollLeft
    },
    scrollY: function(b) {
        var a = document.documentElement;
        if (b) {
            var c = b.parentNode,
            d = b.scrollTop || 0;
            if (b == a) d = UI.scrollY();
            return c ? d + UI.scrollY(c) : d
        }
        return self.pageYOffset || a && a.scrollTop || document.body.scrollTop
    },
    html: function(b) {
        var a = UI.DC("div"),
        c = [];
        a.innerHTML = b;
        UI.each(a.childNodes,
        function(d) {
            c.push(d)
        });
        return c
    },
    A: function(b, a, c) {
        if (c == undefined) return b.getAttribute(a);
        else c == "" ? b.removeAttribute(a) : b.setAttribute(a, c)
    },
    C: function(b, a, c) {
        if (c == undefined) if (window.getComputedStyle) {
            a = a.replace(/([A-Z])/g, "-$1");
            a = a.toLowerCase();
            return window.getComputedStyle(b, null).getPropertyValue(a)
        } else {
            if (b.currentStyle) {
                if (a == "opacity") return b.style.filter.indexOf("opacity=") >= 0 ? parseFloat(b.style.filter.match(/opacity=([^)]*)/)[1]) / 100 : "1";
                return b.currentStyle[a]
            }
        } else if (a == "opacity" && UI.B.ie) b.style.filter = (b.filter || "").replace(/alpha\([^)]*\)/, "") + "alpha(opacity=" + c * 100 + ")";
        else b.style[a] = c
    },
    DC: function(b) {
        return document.createElement(b)
    },
    G: function(b) {
        return document.getElementById(b)
    },
    GT: function(b, a) {
        return b.getElementsByTagName(a)
    },
    EA: function(b, a, c, d) {
        if (UI.isString(b)) {
            var g = c;
            c = function() {
                eval(g)
            }
        }
        if (b.addEventListener) {
            if (a == "mousewheel") a = "DOMMouseScroll";
            b.addEventListener(a, c, d);
            return true
        } else return b.attachEvent ? b.attachEvent("on" + a, c) : false
    },
    isUndefined: function(b) {
        return typeof b == "undefined"
    },
    isFunction: function(b) {
        return this.getType(b) == "Function"
    },
    isString: function(b) {
        return this.getType(b) == "String"
    },
    getType: function(b) {
        return Object.prototype.toString.call(b).slice(8, -1)
    },
    trim: function(b) {
        return b.replace(/^\s+|\s+$/g, "")
    },
    each: function(b, a) {
        if (UI.isUndefined(b[0])) for (var c in b) UI.isFunction(b[c]) || a(c, b[c]);
        else {
            c = 0;
            for (var d = b.length; c < d; c++) UI.isFunction(b[c]) || a(b[c], c)
        }
    },
    ready: function(b) {
        if (UI.ready.done) return b();
        if (UI.isReady.done) UI.readyDo.push(b);
        else {
            UI.readyDo = [b];
            UI.isReady()
        }
    },
    readyDo: [],
    isReady: function() {
        if (!UI.isReady.done) {
            UI.isReady.done = true;
            if (document.addEventListener) document.addEventListener("DOMContentLoaded",
            function() {
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                UI.onReady()
            },
            false);
            else if (document.attachEvent) {
                var b = top != self;
                if (b) document.attachEvent("onreadystatechange",
                function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        UI.onReady()
                    }
                });
                else document.documentElement.doScroll && !b &&
                function() {
                    if (!UI.ready.done) {
                        try {
                            document.documentElement.doScroll("left")
                        } catch(a) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        UI.onReady()
                    }
                } ()
            }
            UI.EA(window, "load", UI.onReady)
        }
    },
    onReady: function() {
        if (!UI.ready.done) {
            UI.ready.done = true;
            for (var b = 0,
            a = UI.readyDo.length; b < a; b++) try {
                UI.readyDo[b]()
            } catch(c) {}
            UI.readyDo = null
        }
    },
    B: function() {
        var b = {},
        a = navigator.userAgent;
        b.ie6 = a.hasString("MSIE 6") && !a.hasString("MSIE 7") && !a.hasString("MSIE 8");
        b.ie8 = a.hasString("MSIE 8");
        b.ie = a.hasString("MSIE");
        b.safari = a.hasString("WebKit");
        b.ipad = a.hasString("iPad");
        b.firefox = a.hasString("Firefox");
        return b
    } ()
};
UI.B.ie && document.execCommand("BackgroundImageCache", false, true);
UI.bind = function(b, a) {
    var c = a || window;
    return function() {
        return b.apply(c, arguments)
    }
};
UI.safeHtml = function(b) {
    return b.replace(/</g, "&lt;").replace(/>/g, "&gt;")
};
UI.removeCookie = function(b) {
    var a = "; expires=" + (new Date).toGMTString();
    document.cookie = b + "=" + a + "; domain=qq.com; path=/";
};
MI = window.MI || {};
MI.S = function(b, a) {
    try {
        if (window.localStorage) if (a != undefined) localStorage[b] = a;
        else return localStorage[b] || "";
        else if (UI.B.ie) {
            if (!MI.S._body) MI.S._body = UI.html('<input style="display:none;behavior:url(#default#userData)" id="usersData">')[0];
            var c = MI.S._body;
            if (!c.appended) {
                document.body.appendChild(c);
                c.appended = 1
            }
            try {
                c.load("oXMLBranch")
            } catch(d) {}
            if (a != undefined) {
                a == "" ? c.removeAttribute(b) : UI.A(c, b, a);
                c.save("oXMLBranch")
            } else return UI.A(c, b) || ""
        } else return "$No$"
    } catch(g) {
        MI.Bos("btnPortalStorageFull");
        MI.S.clear()
    }
};
MI.S.clear = function() {
    var b = /^draft|top|time|option|tips/,
    a = window.localStorage;
    if (a) try {
        for (var c in a) c.match(b) || (a[c] = "")
    } catch(d) {} else if (UI.B.ie) {
        var g = MI.S._body;
        g.load("oXMLBranch");
        UI.each(g.xmlDocument.firstChild.attributes,
        function(l) {
            try {
                var n = l.nodeName;
                n.match(b) || g.removeAttribute(n)
            } catch(o) {}
        });
        g.save("oXMLBranch")
    }
};
MI.Bos = function(b, a) {
    try {
        var c = UI.trim(UI.cookie("o_cookie"));
        MI.Bos.pic.src = "http://btrace.qq.com/collect?sIp=&iQQ=" + c + "&sBiz=microblog&sOp=" + b + "&iSta=0&iTy=18&iFlow=0" + (a ? "&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=" + a: "")
    } catch(d) {}
};
MI.Bos.pic = new Image;
MI.Popup = function(b) {
    var a = this;
    a.body = document.body;
    a.title = b.title;
    a.titleCls = b.titleCls;
    a.width = b.width;
    a.height = b.height;
    a.src = b.src;
    a.isDrag = false;
    a.noDrag = false;
    a.referEl = document.getElementById("mini_nav_qq");
    a.isIE = document.all ? true: false;
    a.getMX = function(c) {
        return a.isIE ? c.clientX + Math.max(document.body.scrollLeft, document.documentElement.scrollLeft) : c.pageX
    };
    a.getMY = function(c) {
        return a.isIE ? c.clientY + Math.max(document.body.scrollTop, document.documentElement.scrollTop) : c.pageY
    };
    a.setEvent = function(c) {
        c.setCapture && c.setCapture();
        window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
    };
    a.releaseEvent = function(c) {
        c.releaseCapture && c.releaseCapture();
        window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
    };
    a.creatDom = function(c, d) {
        function g(p, s) {
            function h(f, m, i) {
                if (! (!f || typeof i != "string")) {
                    m = m ? m: "";
                    i = i ? i: "";
                    f.style[m] = i;
                    return f
                }
            }
            if (s) if (typeof s == "string") for (var j = /\s?([a-z\-]*)\:\s?([^;]*);?/gi,
            k; (k = j.exec(s)) != null;) h(p, k[1], k[2]);
            else if (typeof s == "object") for (j in s) h(p, j, s[j])
        }
        var l = document.createElement(c.tag || "div"),
        n = l.setAttribute ? true: false;
        for (var o in c) if (! (o == "tag" || o == "children" || o == "cn" || o == "html" || o == "style" || typeof c[o] == "function")) if (o == "cls") {
            if (c.cls) l.className = c.cls
        } else if (n) l.setAttribute(o, c[o]);
        else l[o] = c[o];
        if (c.html) l.innerHTML = c.html;
        g(l, c.style);
        d && d.appendChild(l);
        return l
    };
    a.getObjPosition = function(c) {
        var d = {};
        d.x = c.offsetLeft;
        for (d.y = c.offsetTop; c = c.offsetParent;) {
            d.x += c.offsetLeft;
            d.y += c.offsetTop
        }
        return d
    };
    a.getWindowSize = function() {
        var c = {};
        if (window.self && self.innerWidth) {
            c.width = self.innerWidth;
            c.height = self.innerHeight;
            return c
        }
        if (document.documentElement && document.documentElement.clientHeight) {
            c.width = document.documentElement.clientWidth;
            c.height = document.documentElement.clientHeight;
            return c
        }
        c.width = document.body.clientWidth;
        c.height = document.body.clientHeight;
        return c
    };
    a.keyDownListener = function(c) {
        c = c ? c: window.event;
        c.keyCode == 27 && a.closePopup()
    };
    a.keyDownAddListener = function() {
        a.isIE ? document.attachEvent("onkeydown", a.keyDownListener) : document.addEventListener("keydown", a.keyDownListener, false)
    };
    a.keyDownRemoveListener = function() {
        a.isIE ? document.detachEvent("onkeydown", a.keyDownListener) : document.removeEventListener("keydown", a.keyDownListener, false)
    };
    a.createInfoWindow = function(c, d) {
        a.layerbg = a.creatDom({
            cls: "share_layer"
        });
        a.main = a.creatDom({
            cls: "share_layer_main"
        });
        a.layerTitle = a.creatDom({
            cls: "share_layer_title"
        });
        var g = a.creatDom({
            tag: "h3",
            html: a.title,
            cls: a.titleCls || ""
        });
        a.close = a.creatDom({
            tag: "a",
            title: "关闭",
            cls: "del_fri",
            href: "javascript:void(0)",
            html: "X"
        });
        a.close.onmousedown = function() {
            a.releaseEvent(a.layerTitle);
            a.closePopup()
        };
        a.layerTitle.appendChild(g);
        a.layerTitle.appendChild(a.close);
        a.main.appendChild(a.layerTitle);
        a.con = a.creatDom({
            cls: "share_layer_cont"
        });
        a.iframe = a.creatDom({
            tag: "iframe"
        });
        a.iframe.setAttribute("frameBorder", "0", 0);
        a.iframe.setAttribute("marginheight", "0");
        a.iframe.setAttribute("marginwidth", "0");
        a.iframe.setAttribute("scrolling", "no");
        a.iframe.style.width = a.width + "px";
        a.iframe.style.height = a.height + "px";
        a.iframe.style.display = "block";
        a.con.appendChild(a.iframe);
        window.setTimeout(function() {
            a.iframe.setAttribute("src", a.src, 0)
        },
        5);
        a.main.appendChild(a.con);
        g = a.creatDom({
            cls: "bg"
        });
        a.layerbg.appendChild(a.main);
        a.layerbg.appendChild(g);
        a.body.appendChild(a.layerbg);
        a.floatPopup(c, d);
        a.dragPopup(a.layerTitle, a.layerbg)
    };
    a.tr = function() {
        var c = this,
        d = UI.width(c.referEl),
        g = UI.getX(c.referEl);
        c.layerbg.style.width = c.width + 2 + "px";
        c.layerbg.style.left = g + d - c.width - 9 + "px";
        c.layerbg.style.top = "-8px"
    };
    a.floatPopup = function(c, d) {
        if (d == "top-right" && a.referEl) a.tr();
        else {
            c = (UI.windowWidth() - a.width) / 2;
            if (c < 0) c = 0;
            d = (UI.windowHeight() - a.height - 30) / 2;
            if (d < 0) d = 0;
            a.layerbg.style.width = a.width + 2 + "px";
            a.layerbg.style.left = UI.scrollX() + c + "px";
            a.layerbg.style.top = UI.scrollY() + d + "px"
        }
    };
    a.dragPopup = function(c, d) {
        c.onmousedown = function(g) {
            d.style.position = "absolute";
            var l = document;
            if (!g) g = window.event;
            x = g.layerX ? g.layerX: g.offsetX;
            y = g.layerY ? g.layerY: g.offsetY;
            a.setEvent(c);
            l.onmousemove = function(n) {
                if (!a.noDrag) {
                    if (!n) n = window.event;
                    var o = a.getMX(n),
                    p = a.getMY(n);
                    if (!n.pageX) n.pageX = o;
                    if (!n.pageY) n.pageY = p;
                    o = n.pageY - y;
                    d.style.left = n.pageX - x - (a.isIE ? 10 : 7) + "px";
                    d.style.top = o - (a.isIE ? 10 : 7) + "px"
                }
            };
            l.onmouseup = function() {
                a.isDrag = false;
                a.releaseEvent(c);
                l.onmousemove = null;
                l.onmouseup = null;
                l.onselectstart = null
            };
            l.onselectstart = function() {
                return false
            }
        }
    };
    a.resizePopup = function(c) {
        if (c.width) a.iframe.style.width = c.width + "px";
        if (c.height) a.iframe.style.height = c.height + "px"
    };
    a.showPopup = function(c, d, g) {
        a.noDrag = g;
        a.layerbg && a.closePopup();
        a.createInfoWindow(c, d);
        a.layerTitle.style.cursor = g ? "default": "move";
        a.keyDownAddListener()
    };
    a.closePopup = function() {
        a.timeId && clearInterval(a.timeId);
        a.layerbg.style.display = "none";
        a.layerbg.parentNode.removeChild(a.layerbg);
        a.iframe.src = "";
        a.iframe.parentNode.removeChild(a.iframe);
        a.layerbg = null;
        a.keyDownRemoveListener()
    };
    a.dataCenter = {}
};
function mb_cbLogin() {
	try{
		MI.Login.popup.closePopup();}
	catch(e){}
    MI.Login.callerName && MI.Login.cbLogin[MI.Login.callerName] && MI.Login.cbLogin[MI.Login.callerName]();
    MI.Bos("btnPortalLoginOK")
}
if (!MI.Login) MI.Login = {
    callerName: "",
    cbLogin: {},
    popup: new MI.Popup({
        title: "微博登录",
        titleCls: "mblogo",
        width: 376,
        height: 200,
        src: "http://mini.t.qq.com/mblogin_iframe.htm"
    }),
    logout: function() {
        UI.removeCookie("uin", "", 0);
        UI.removeCookie("skey", "", 0);
        UI.removeCookie("luin", "", 0);
        UI.removeCookie("lskey", "", 0);
        MI.AccountInfo.clearLocal()
    },
    getUin: function() {
        var b = UI.cookie("uin") || UI.cookie("luin");
        if (!b) return 0;
        b = parseInt(b.replace(/[^\d]/g, ""), 10);
        if (!isNaN(b) && b > 1E4) return b;
        return 0
    },
    setCallback: function(b, a) {
        this.cbLogin[b] = a
    },
    showPopup: function(b, a, c, d) {
        this.callerName = b;
        this.popup.showPopup(a, c, d)
    }
};
function mb_cbAccountInfo(b) {
    var a = false,
    c = false;
    if (b.result == -1) {
        MI.Login.logout();
        c = true
    } else if (b.result == -3) a = true;
    else if (b.result) return;
    var d;
    if (b.info) d = {
        uin: b.info[0] || "",
        nick: UI.safeHtml(b.info[1] || ""),
        mbid: b.info[2] || "",
        mbnick: b.info[3] || ""
    };
    MI.AccountInfo.cacheInfo(d);
    MI.AccountInfo.callback(d, a, c)
}
if (!MI.AccountInfo) MI.AccountInfo = {
    uin: MI.Login.getUin(),
    callerName: "",
    cbAccountInfo: {},
    nickDelay: 3E5,
    mbDelay: 12E5,
    setCallback: function(b, a) {
        this.cbAccountInfo[b] = a
    },
    callback: function(b, a, c) {
        var d = this;
        d.callerName && d.cbAccountInfo[d.callerName] && d.cbAccountInfo[d.callerName](b, a, c)
    },
    cacheInfo: function(b) {
        if (b) {
            var a = +new Date,
            c = b.uin;
            this.uin = c;
            try{            	
	            MI.S("account_lasttime", a);
	            MI.S("account_time_" + c, a);
	            MI.S("account_nick_" + c, b.nick);
	            MI.S("account_mbid_" + c, b.mbid);
	            MI.S("account_mbnick_" + c, b.mbnick);
            }catch(e){}
        }
    },
    getFromLocal: function(b) {
        if (b) {
            var a = MI.S("account_time_" + b);
            if (a) {
                var c = this,
                d = UI.safeHtml(MI.S("account_nick_" + b)),
                g = MI.S("account_mbid_" + b),
                l = MI.S("account_mbnick_" + b),
                n = g ? c.mbDelay: c.nickDelay;
                if (d) if ( + new Date - a > n) c.clear(b);
                else return {
                    uin: b,
                    nick: d,
                    mbid: g,
                    mbnick: l
                }
            }
        }
    },
    get: function(b, a) {
        var c = this;
        b = c.getFromLocal(b);
        c.callerName = a;
        b ? c.callback(b) : UI.getScript("http://mini.t.qq.com/mini/mycheck.php?r=" + (new Date).getTime())
    },
    clearLocal: function() {
        this.clear(this.uin)
    },
    clear: function(b) {
        if (b) {
            try{	            
	            MI.S("account_time_" + b, "");
	            MI.S("account_nick_" + b, "");
	            MI.S("account_mbid_" + b, "");
	            MI.S("account_mbnick_" + b, "")
            }catch(e){}
        }
    },
    clearLocalAll: function() {
        var b = MI.S("account_lasttime");
        if (b) {
            var a = this; + new Date - b > a.mbDelay && MI.S.clear()
        }
    }
};
function ptlogin2_onResizeMb(b, a) {
    MI.Login.popup.resizePopup({
        height: a
    })
};
UI.GC = function() {
    function b(h, j) {
        if (!j) {
            j = h;
            h = document
        }
        h = h || document;
        if (!/^[\w\-_#]+$/.test(j) && h.querySelectorAll) return a(h.querySelectorAll(j));
        if (j.indexOf(",") > -1) {
            j = j.split(/,/g);
            for (var k = [], f = 0, m = j.length; f < m; ++f) k = k.concat(b(h, j[f]));
            return s(k)
        }
        j = j.match(g);
        var i = j.pop();
        k = (i.match(n) || p)[1];
        f = !k && (i.match(l) || p)[1];
        m = i.split(".").slice(2);
        i = !k && (i.match(o) || p)[1];
        if (f && !i && h.getElementsByClassName) i = a(h.getElementsByClassName(f));
        else {
            i = !k && a(h.getElementsByTagName(i || "*"));
            if (f) i = d(i, "className", RegExp("(^|\\s)" + f + "(\\s|$)"), m);
            if (k) return (h = h.getElementById(k)) ? [h] : []
        }
        return j[0] && i[0] ? c(j, i) : i
    }
    function a(h) {
        try {
            return Array.prototype.slice.call(h)
        } catch(j) {
            for (var k = [], f = 0, m = h.length; f < m; ++f) k[f] = h[f];
            return k
        }
    }
    function c(h, j, k) {
        var f = h.pop();
        if (f === ">") return c(h, j, true);
        var m = [],
        i = -1,
        q = (f.match(n) || p)[1],
        r = !q && (f.match(l) || p)[1];
        f = !q && (f.match(o) || p)[1];
        var w = -1,
        v, t, u;
        for (f = f && f.toLowerCase(); v = j[++w];) {
            t = v.parentNode;
            do {
                u = (u = (u = !f || f === "*" || f === t.nodeName.toLowerCase()) && (!q || t.id === q)) && (!r || RegExp("(^|\\s)" + r + "(\\s|$)").test(t.className));
                if (k || u) break
            } while ( t = t . parentNode );
            if (u) m[++i] = v
        }
        return h[0] && m[0] ? c(h, m) : m
    }
    function d(h, j, k, f) {
        var m = -1,
        i, q = -1,
        r = [];
        for (f = f || ""; i = h[++m];) if (k.test(i[j]) && i[j].hasString(f)) r[++q] = i;
        return r
    }
    var g = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
    l = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
    n = /^(?:[\w\-_]+)?#([\w\-_]+)/,
    o = /^([\w\*\-_]+)/,
    p = [null, null],
    s = function() {
        var h = +new Date,
        j = function() {
            var k = 1;
            return function(f) {
                var m = f[h],
                i = k++;
                if (!m) {
                    f[h] = i;
                    return true
                }
                return false
            }
        } ();
        return function(k) {
            for (var f = k.length,
            m = [], i = -1, q = 0, r; q < f; ++q) {
                r = k[q];
                if (j(r)) m[++i] = r
            }
            h += 1;
            return m
        }
    } ();
    return b
} ();
MI.AccountInfo.nickDelay = 0;
MI.AccountInfo.mbDelay = 0;
var g_mi_followtype = g_mi_followtype || 0; 
var g_mi_followall = g_mi_followall || 1;
MI.FollowAll = function(b) {
    var a = this;
    a.name = "followall_" + g_mi_followall++;
    a.listEl = b.listId && UI.G(b.listId);
    a.allEl = b.allId && UI.G(b.allId);
    a.followEl = b.followId && UI.G(b.followId);
    a.init()
};
MI.FollowAll.prototype.init = function() {
    var b = this;
    MI.Login.setCallback(b.name, UI.bind(b.getAccountInfo, b));
    MI.AccountInfo.setCallback(b.name, UI.bind(b.follow, b));
    if (b.allEl) b.allEl.onclick = function() {
        if (b.listEl) {
            var a = this.checked,
            c = UI.GC(b.listEl, "input[type=checkbox]");
            UI.each(c,
            function(d) {
                d.checked = a
            })
        }
    };
    if (b.followEl) b.followEl.onclick = function() {
        if (b.getIds().length) MI.Login.getUin() ? b.getAccountInfo() : MI.Login.showPopup(b.name, this);
        else alert("请选择要收听的人")
    }
};
MI.FollowAll.prototype.getAccountInfo = function() {
    var b = MI.Login.getUin();
    b && MI.AccountInfo.get(b, this.name)
};
MI.FollowAll.prototype.follow = function(b, a, c) {
    var d = this;
    if (c && d.followEl) MI.Login.showPopup(d.name, d.followEl);
    else if (a) window.open("http://t.qq.com/?pref=qqcom.followall");
    else if (d.followEl) {
        a = d.getIds();
        if (a.length) if (b.mbid) {
			g_mi_followtype = 1;
            //UI.getScript("http://mini.t.qq.com/follow.php?)
            var params = "u=" + a.join(",") + "&R=" + (new Date).getTime();
            UIAjaxForFollow({
				url: "http://mini.t.qq.com/follow.php",
				type: 'post',//上线改POST
				data: params,
				crossDomain: true,
				success: function(ret){					
					var b = eval('('+ret+')');
					if (b.result == -1) MI.Login.logout();	
				    else if (b.result != 0) {
						alert("收听失败！");
					}
					else{
						if(1==g_mi_followtype)	{
							MI.List.init();
						}
						g_mi_curlsitEl.f_type = 1;
					}
				}
			});
        } else window.open("http://t.qq.com/?pref=qqcom.followall");
        else alert("请选择要收听的人")
    }
};
MI.FollowAll.prototype.getIds = function() {
	g_mi_List = this.listEl;
    for (var b = UI.GC(this.listEl, "input[type=checkbox]"), a = [], c = 0, d = b.length; c < d; c++) b[c].checked && a.push(b[c].value);
    return a
};
var g_mi_curlsitEl = null;
var g_mi_followone = g_mi_followone || 1;
MI.FollowOne = function(o) {
	var Self = this;
	Self.name = 'followone_' + (g_mi_followone++);
	g_mi_curlsitEl = Self.listEl = o.listId && UI.G(o.listId);
	Self.pref = o.pref;
	Self.init();
}

MI.FollowOne.prototype.init = function() {
	var Self = this;
	
	// 设置登录回调
	MI.Login.setCallback(Self.name, UI.bind(Self.getAccountInfo, Self));
	
	// 设置取帐号信息回调
	MI.AccountInfo.setCallback(Self.name, UI.bind(Self.follow, Self));
	if (Self.listEl) {
	    var list = UI.GC(Self.listEl, 'input[type=button]');
		var unfolBtn = UI.G('unfollow' + UI.A(Self.listEl, 'id'));
    	for (var i = 0,len = list.length; i < len; i++) {
    		list[i].onclick = function() {
    		    Self.followOne = [UI.A(this, 'val')];
            	if (!Self.followOne.length) {
            		alert('请选择要收听的人');
            		return;
            	}
            	var uin = MI.Login.getUin();
            	if (!uin) MI.Login.showPopup(Self.name, this);
            	else Self.getAccountInfo();
            }
    	}
		unfolBtn.onclick = function(){
			Self.followOne = [UI.A(list[0], 'val')];
			if (!Self.followOne.length) {
				alert('请选择要取消收听的人');
				return;
			}
			var uin = MI.Login.getUin();
			if (!uin) MI.Login.showPopup(Self.name, this);
			else Self.getAccountInfo();
		}		
	}
}

MI.FollowOne.prototype.getAccountInfo = function() {
	var uin = MI.Login.getUin();
	if (uin) MI.AccountInfo.get(uin, this.name);
}

MI.FollowOne.prototype.followOne = [];
MI.FollowOne.prototype.hide=function(){
	var Self=this;
	if(Self.listEl){
		var list = UI.GC(Self.listEl, 'input[type=button]');		
		
		if(typeof Self.listEl.f_type == 'undefined' ||　Self.listEl.f_type == 1){
			list[0].style.display='none';
		}else{
			list[0].style.display='block';
		}
	}
}
MI.FollowOne.prototype.follow = function(infoObj, black, nologin) {
	var Self = this;
	if (nologin) {
		MI.Login.showPopup(Self.name, Self.followEl);
		return;
	}
	
	var idx = 'http://t.qq.com/?pref=qqcom.' + Self.pref;
	if (black) {
		window.open(idx);
		return;
	}
	
	var ids = Self.followOne 
	if (!ids.length) {
		alert('请选择要收听的人');
		return;
	}
	
	if (infoObj.mbid) {
		g_follow_pref = Self.pref;
		g_mi_followtype = 0;
		if(typeof Self.listEl.f_type == 'undefined' || Self.listEl.f_type == 0){
			//UI.getScript('http://mini.t.qq.com/follow.php?c=1&u='	+ ids.join(',') + '&R=' + new Date().getTime(), null, 'utf-8');
			var params = "u=" + ids.join(",") + "&R=" + (new Date).getTime();
            UIAjaxForFollow({
				url: "http://mini.t.qq.com/follow.php",
				type: 'post',//上线改POST
				data: params,
				crossDomain: true,
				success: function(ret){
					var b = eval('('+ret+')');
					if (b.result == -1) MI.Login.logout();	
				    else if (b.result != 0) {
						alert("收听失败！");
					}
					else{
						if(1==g_mi_followtype)	{
							MI.List.init();
						}
						g_mi_curlsitEl.f_type = 1;					
						Self.hide();
					}
				}
			});
		}else{
			//UI.getScript('http://radio.t.qq.com/api/relation/unfollow.php?u='+ ids.join(',') + '&c=mb_unFollow&R=' + new Date().getTime(), null, 'utf-8');
			var params = "u=" + ids.join(",") + "&R=" + (new Date).getTime();
            UIAjaxForFollow({
				url: "http://mini.t.qq.com/api/relation/unfollow.php",
				type: 'post',//上线改POST
				data: params,
				crossDomain: true,
				success: function(ret){
					var b = eval('('+ret+')');
					if (b.result == -1) MI.Login.logout();	
				    else if (b.result != 0) {
						alert("取消收听失败！");
					}
					else{
						g_mi_curlsitEl.f_type = 0;						
						Self.hide();
					}
				}
			});
		}
	} else {
		window.open(idx);
	}
}

var g_mi_List = g_mi_List || "";
if (!MI.List) MI.List = {			
	SelectedGroupId : "",
	HtmlEl : '<div class="D" style="display:none;" id="follow_group_container"><div class="bg" ></div><div class="CR" ><table cellspacing="0" cellpadding="0" border="0" class="tbSendMsg"><tbody><tr> <td class="tl"></td><td class="tm"></td><td class="tr"></td></tr><tr><td class="lm"></td><td><div class="DWrap"><div class="DTitle"><h1 class="DmainTit"><i></i>收听成功</h1></div><a href="javascript:void(0);" class="DClose close" title="关闭" onclick="MI.List.close();"></a><div class="DCont"><div id="foedSets" class="foedSets"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><th>选择名单分组：</th><td><div class="Dlist"><a id="SelectedGroup" class="citySel showMyList" href="javascript:void(0);" onclick="MI.List.toggleDisplay(\'DmyList\');"><span class="showMyList"></span></a><div class="DmyList" id="DmyList"></div></div><a  href="javascript:void(0);" onclick="MI.List.show(\'DcreateList\');">新建名单</a><div style="display:none;" class="DcreateList" id="DcreateList"><div  id="listFollowForm"><p><span><input type="text" class="inputTxt" name="name" id="new_name"></span><br><span></span></p><p>浏览权限：<label><input type="radio" checked="" value="0" name="priv" id="priv" class="check1"><b style="display:none" class="pass"></b>所有人可见</label><label><input type="radio" value="1" name="priv" class="check1">仅自己可见</label><span></span></p><p><input type="button" class="btn1" onclick="MI.List.createNewList();" value="创建"/><a href="javascript:void(0);" onclick="MI.List.hidden(\'DcreateList\');">取消</a></p></div></div></td></tr><tr><th></th><td class="funBox"><button class="btn1" onclick="MI.List.groupUser();">完成</button></td></tr></tbody></table></div></div></div></td><td class="rm"></td></tr><tr><td class="bl"></td><td class="bm"></td><td class="br"></td></tr></tbody></table></div></div>',
	AddItem : function(id,groupinfo,parentObj){
		var item = document.createElement("label");
		parentObj.appendChild(item);
		item.id = "list_"+id;
		item.value = id;
		item.title = groupinfo.name;
		item.onmouseover = function(){
			this.style.backgroundColor = "#DCDDDE";
		};
		item.onmouseout = function(){
			this.style.backgroundColor = "#fff";
		};
		item.onclick = function(){
			UI.G('SelectedGroup').innerHTML = this.title + "<span class='showMyList'></span>";
			MI.List.SelectedGroupId = this.value;
		};
		if( 1 == groupinfo.locked )item.innerHTML = groupinfo.name + '<em class="ico_slock"></em>';
		else item.innerHTML = groupinfo.name ;
	},
	init : function(){
		if(!UI.G("follow_group_container")){
			var divObj = document.createElement("DIV");
			divObj.innerHTML = MI.List.HtmlEl;
			document.body.appendChild(divObj);
			UI.G('follow_group_container').onclick = function (event){
				event = event?event:window.event;
				var srcObj = event.srcElement?event.srcElement:event.target;
				if(-1 == srcObj.className.indexOf("showMyList")){
					MI.List.hidden('DmyList');
				}
			}
		}
		UI.G('follow_group_container').style.top = UI.scrollY()+"px";
		window.onscroll=function(){		
			UI.G('follow_group_container').style.top = UI.scrollY()+"px";
		}
		UI.G('SelectedGroup').innerHTML = "<span class='showMyList'></span>";
		MI.List.SelectedGroupId = "";
		MI.List.show("follow_group_container");
		UI.getScript("http://radio.t.qq.com/api/list/oif_mylist.php");
	},
	initList : function(jsondata,listConObj){
		listConObj.innerHTML = "";
		for(data in jsondata){
			MI.List.AddItem(data,jsondata[data],listConObj);
		}
	},
	close : function(){
		MI.List.hidden('follow_group_container');
		MI.List.hidden('DcreateList');

		window.onscroll = null;
	},	
	createNewList : function(){
		UI.getScript("http://radio.t.qq.com/api/list/oif_createlist.php?name="+encodeURIComponent(UI.G("new_name").value)+"&priv="+(UI.G("priv").checked?"0":"1"));
	},
	groupUser : function(){
		var ids = MI.List.getIds();
		if (ids.length) if(MI.List.SelectedGroupId){
			UI.getScript("http://radio.t.qq.com/api/list/oif_joinlist.php?accounts="+ids.join(",")+"&lid="+MI.List.SelectedGroupId);
		}
		else{
			MI.List.close();
		}
	},
	show : function(el){
		UI.G(el) &&	(UI.G(el).style.display = "block");
		return true;
	},
	hidden : function(el){
		UI.G(el) &&	(UI.G(el).style.display = "none");
		return false;
	},
	toggleDisplay : function(el){
		if(UI.G(el)){ 
			if(UI.G(el).style.display != "block") 
				MI.List.show(el);
			else MI.List.hidden(el); 
		}
	},
	getIds : function() {
		for (var b = UI.GC(g_mi_List, "input[type=checkbox]"), a = [], c = 0, d = b.length; c < d; c++) b[c].checked && a.push(b[c].value);
		return a;
	}
}

function cb_mylist(jsondata){
	if (jsondata.result == -1) MI.Login.logout();	
	else if(jsondata.result!=0){
		alert(jsondata.msg);
	}
	else{
		MI.List.initList(jsondata.info,UI.G('DmyList'));
	}
}
function cb_createlist(jsondata){
	if (jsondata.result == -1) MI.Login.logout();	
	else if(jsondata.result!=0) alert(jsondata.msg);
	else{
		UI.G('SelectedGroup').innerHTML = UI.G("new_name").value + "<span class='showMyList'></span>";
		MI.List.SelectedGroupId = jsondata.createId;
		var info = {
			name:UI.G("new_name").value,
			locked:(UI.G("priv").checked?"0":"1")
		}
		MI.List.AddItem(jsondata.createId,info,UI.G('DmyList'));
		MI.List.hidden('DcreateList');
	}
}
function cb_joinlist(jsondata){
	if (jsondata.result == -1) MI.Login.logout();	
	else if(jsondata.result!=0) alert(jsondata.msg);
	else{
		MI.List.close();
		
	}
}
UI.ready(function(){
	try{document.domain = "qq.com"}catch(e){}
	if(!UI.G('followPorxyIfrm')){
		var ifrEl = UI.DC("iframe");
		UI.C(ifrEl,"display","none");
		UI.A(ifrEl,"id","proxy_ifrm");
		document.body.appendChild(ifrEl);
		UI.A(ifrEl,"src","http://mini.t.qq.com/proxy.html");
	}	
})
/*  |xGv00|552a2474fb9f7811332de1edfdc88b38 */