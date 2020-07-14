try {
    document.domain = "qq.com"
} catch(e$$5) {}
String.prototype.hasString = function(a) {
    if (typeof a == "object") {
        for (var b = 0,
        c = a.length; b < c; b++) if (!this.hasString(a[b])) return false;
        return true
    } else if (this.indexOf(a) != -1) return true
};
UI = window.UI || {
    getScript: function(a, b, c) {
        var d = UI.DC("script");
        if (b) if (UI.B.ie) d.onreadystatechange = function() {
            if (d.readyState == "loaded" || d.readyState == "complete") b()
        };
        else d.onload = b;
        c && UI.A(d, "charset", c);
        UI.A(d, "type", "text/javascript");
        UI.A(d, "src", a);
        UI.GT(document, "head")[0].appendChild(d)
    },
    cookie: function(a, b, c, d) {
        if (b) {
            var e = "";
            if (c) {
                e = new Date;
                e.setTime(e.getTime() + c * 864E5);
                e = "; expires=" + e.toGMTString()
            }
            document.cookie = a + "=" + b + e + "; path=/" + (d ? ";domain=" + d: "")
        } else {
            a += "=";
            b = document.cookie.split(";");
            for (c = 0; c < b.length; c++) {
                for (d = b[c]; d.charAt(0) == " ";) d = d.substring(1, d.length);
                if (d.indexOf(a) == 0) return decodeURIComponent(d.substring(a.length, d.length))
            }
            return null
        }
    },
    getX: function(a) {
        return a.offsetParent ? a.offsetLeft + UI.getX(a.offsetParent) : a.offsetLeft
    },
    getY: function(a) {
        return a.offsetParent ? a.offsetTop + UI.getY(a.offsetParent) : a.offsetTop
    },
    width: function(a) {
        return parseInt(a.offsetWidth)
    },
    height: function(a) {
        return parseInt(a.offsetHeight)
    },
    windowWidth: function() {
        var a = document.documentElement;
        return self.innerWidth || a && a.clientWidth || document.body.clientWidth
    },
    windowHeight: function() {
        var a = document.documentElement;
        return self.innerHeight || a && a.clientHeight || document.body.clientHeight
    },
    scrollX: function(a) {
        var b = document.documentElement;
        if (a) {
            var c = a.parentNode,
            d = a.scrollLeft || 0;
            if (a == b) d = UI.scrollX();
            return c ? d + UI.scrollX(c) : d
        }
        return self.pageXOffset || b && b.scrollLeft || document.body.scrollLeft
    },
    scrollY: function(a) {
        var b = document.documentElement;
        if (a) {
            var c = a.parentNode,
            d = a.scrollTop || 0;
            if (a == b) d = UI.scrollY();
            return c ? d + UI.scrollY(c) : d
        }
        return self.pageYOffset || b && b.scrollTop || document.body.scrollTop
    },
    hide: function(a) {
        if (UI.isString(a)) a = this.G(a);
        if (a) {
            var b = this.C(a, "display");
            if (b != "none") a.__curDisplay = b;
            a.style.display = "none"
        }
    },
    show: function(a) {
        if (UI.isString(a)) a = this.G(a);
        if (a) a.style.display = a.__curDisplay || ""
    },
    toggle: function(a) {
        if (UI.isString(a)) a = this.G(a);
        this.C(a, "display") == "none" ? this.show(a) : this.hide(a)
    },
    html: function(a) {
        var b = UI.DC("div"),
        c = [];
        b.innerHTML = a;
        UI.each(b.childNodes,
        function(d) {
            c.push(d)
        });
        return c
    },
    A: function(a, b, c) {
        if (c == undefined) return a.getAttribute(b);
        else c == "" ? a.removeAttribute(b) : a.setAttribute(b, c)
    },
    C: function(a, b, c) {
        if (c == undefined) if (window.getComputedStyle) {
            b = b.replace(/([A-Z])/g, "-$1");
            b = b.toLowerCase();
            return window.getComputedStyle(a, null).getPropertyValue(b)
        } else {
            if (a.currentStyle) {
                if (b == "opacity") return a.style.filter.indexOf("opacity=") >= 0 ? parseFloat(a.style.filter.match(/opacity=([^)]*)/)[1]) / 100 : "1";
                return a.currentStyle[b]
            }
        } else if (b == "opacity" && UI.B.ie) a.style.filter = (a.filter || "").replace(/alpha\([^)]*\)/, "") + "alpha(opacity=" + c * 100 + ")";
        else a.style[b] = c
    },
    DC: function(a) {
        return document.createElement(a)
    },
    G: function(a) {
        return document.getElementById(a)
    },
    GT: function(a, b) {
        return a.getElementsByTagName(b)
    },
    GC: function() {
        function a(h, n) {
            if (!n) {
                n = h;
                h = document
            }
            h = h || document;
            if (!/^[\w\-_#]+$/.test(n) && h.querySelectorAll) return b(h.querySelectorAll(n));
            if (n.indexOf(",") > -1) {
                for (var j = n.split(/,/g), g = [], k = 0, i = j.length; k < i; ++k) g = g.concat(a(h, j[k]));
                return p(g)
            }
            j = n.match(d);
            i = j.pop();
            g = (i.match(l) || m)[1];
            var o = !g && (i.match(e) || m)[1];
            k = i.split(".").slice(2);
            i = !g && (i.match(f) || m)[1];
            if (o && !i && h.getElementsByClassName) i = b(h.getElementsByClassName(o));
            else {
                i = !g && b(h.getElementsByTagName(i || "*"));
                if (o) {
                    o = RegExp("(^|\\s)" + o + "(\\s|$)");
                    var r = -1,
                    s, t = -1,
                    q = [];
                    for (k = k || ""; s = i[++r];) if (o.test(s.className) && s.className.hasString(k)) q[++t] = s;
                    i = q
                }
                if (g) return (j = h.getElementById(g)) ? [j] : []
            }
            return j[0] && i[0] ? c(j, i) : i
        }
        function b(h) {
            try {
                return Array.prototype.slice.call(h)
            } catch(n) {
                for (var j = [], g = 0, k = h.length; g < k; ++g) j[g] = h[g];
                return j
            }
        }
        function c(h, n, j) {
            var g = h.pop();
            if (g === ">") return c(h, n, true);
            var k = [],
            i = -1,
            o = (g.match(l) || m)[1],
            r = !o && (g.match(e) || m)[1];
            g = !o && (g.match(f) || m)[1];
            var s = -1,
            t, q, u;
            for (g = g && g.toLowerCase(); t = n[++s];) {
                q = t.parentNode;
                do {
                    u = (u = (u = !g || g === "*" || g === q.nodeName.toLowerCase()) && (!o || q.id === o)) && (!r || RegExp("(^|\\s)" + r + "(\\s|$)").test(q.className));
                    if (j || u) break
                } while ( q = q . parentNode );
                if (u) k[++i] = t
            }
            return h[0] && k[0] ? c(h, k) : k
        }
        var d = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
        e = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
        l = /^(?:[\w\-_]+)?#([\w\-_]+)/,
        f = /^([\w\*\-_]+)/,
        m = [null, null],
        p = function() {
            var h = +new Date,
            n = function() {
                var j = 1;
                return function(g) {
                    var k = g[h],
                    i = j++;
                    if (!k) {
                        g[h] = i;
                        return true
                    }
                    return false
                }
            } ();
            return function(j) {
                for (var g = j.length,
                k = [], i = -1, o = 0, r; o < g; ++o) {
                    r = j[o];
                    if (n(r)) k[++i] = r
                }
                h += 1;
                return k
            }
        } ();
        return a
    } (),
    E: function(a) {
        if (a && a.clone) return a;
        a = window.event || a;
        return {
            clone: true,
            stop: function() {
                if (a && a.stopPropagation) a.stopPropagation();
                else a.cancelBubble = true
            },
            prevent: function() {
                if (a && a.preventDefault) a.preventDefault();
                else a.returnValue = false
            },
            target: a.target || a.srcElement,
            x: a.clientX || a.pageX,
            y: a.clientY || a.pageY,
            button: a.button,
            key: a.keyCode,
            shift: a.shiftKey,
            alt: a.altKey,
            ctrl: a.ctrlKey,
            type: a.type,
            wheel: a.wheelDelta / 120 || -a.detail / 3
        }
    },
    EA: function(a, b, c, d) {
        if (UI.isString(a)) {
            var e = c;
            c = function() {
                eval(e)
            }
        }
        if (a.addEventListener) {
            if (b == "mousewheel") b = "DOMMouseScroll";
            a.addEventListener(b, c, d);
            return true
        } else return a.attachEvent ? a.attachEvent("on" + b, c) : false
    },
    isUndefined: function(a) {
        return typeof a == "undefined"
    },
    isFunction: function(a) {
        return this.getType(a) == "Function"
    },
    isString: function(a) {
        return this.getType(a) == "String"
    },
    getType: function(a) {
        return Object.prototype.toString.call(a).slice(8, -1)
    },
    trim: function(a) {
        return a.replace(/^\s+|\s+$/g, "")
    },
    each: function(a, b) {
        if (UI.isUndefined(a[0])) for (var c in a) UI.isFunction(a[c]) || b(c, a[c]);
        else {
            c = 0;
            for (var d = a.length; c < d; c++) UI.isFunction(a[c]) || b(a[c], c)
        }
    },
    ready: function(a) {
        if (UI.ready.done) return a();
        if (UI.isReady.done) UI.readyDo.push(a);
        else {
            UI.readyDo = [a];
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
                var a = top != self;
                if (a) document.attachEvent("onreadystatechange",
                function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        UI.onReady()
                    }
                });
                else document.documentElement.doScroll && !a &&
                function() {
                    if (!UI.ready.done) {
                        try {
                            document.documentElement.doScroll("left")
                        } catch(b) {
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
            for (var a = 0,
            b = UI.readyDo.length; a < b; a++) try {
                UI.readyDo[a]()
            } catch(c) {}
            UI.readyDo = null
        }
    },
    B: function() {
        var a = {},
        b = navigator.userAgent;
        a.ie6 = b.hasString("MSIE 6") && !b.hasString("MSIE 7") && !b.hasString("MSIE 8");
        a.ie8 = b.hasString("MSIE 8");
        a.ie = b.hasString("MSIE");
        a.safari = b.hasString("WebKit");
        a.ipad = b.hasString("iPad");
        a.firefox = b.hasString("Firefox");
        return a
    } ()
};
UI.B.ie && document.execCommand("BackgroundImageCache", false, true);
UI.bind = function(a, b) {
    var c = b || window;
    return function() {
        return a.apply(c, arguments)
    }
};
UI.safeHtml = function(a) {
    return a.replace(/</g, "&lt;").replace(/>/g, "&gt;")
};
UI.removeCookie = function(a) {
    var b = "; expires=" + (new Date).toGMTString();
    document.cookie = a + "=" + b + "; domain=qq.com; path=/"
};
var MI = MI || {};
MI.random = function(a) {
    return parseInt((new Date).getTime() / (a || 1))
};
MI.S = function(a, b) {
    try {
        if (window.localStorage) if (b) localStorage[a] = b;
        else return localStorage[a] || "";
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
            if (b != undefined) {
                b == "" ? c.removeAttribute(a) : UI.A(c, a, b);
                c.save("oXMLBranch")
            } else return UI.A(c, a) || ""
        } else return "$No$"
    } catch(e) {
        MI.Bos("btnPortalStorageFull");
        MI.S.clear()
    }
};
MI.S.clear = function() {
    var a = /^draft|top|time|option|tips/,
    b = window.localStorage;
    if (b) try {
        for (var c in b) c.match(a) || (b[c] = "")
    } catch(d) {} else if (UI.B.ie) {
        var e = MI.S._body;
        e.load("oXMLBranch");
        UI.each(e.xmlDocument.firstChild.attributes,
        function(l) {
            try {
                var f = l.nodeName;
                f.match(a) || e.removeAttribute(f)
            } catch(m) {}
        });
        e.save("oXMLBranch")
    }
};
MI.Bos = function(a, b) {
    try {
        var c = UI.trim(UI.cookie("o_cookie"));
        MI.Bos.pic.src = "http://btrace.qq.com/collect?sIp=&iQQ=" + c + "&sBiz=microblog&sOp=" + a + "&iSta=0&iTy=214&iFlow=0" + (b ? "&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=" + b: "")
    } catch(d) {}
};
MI.Bos.pic = new Image;
MI.Popup = function(a) {
    var b = this;
    b.body = document.body;
    b.title = a.title;
    b.titleCls = a.titleCls;
    b.width = a.width;
    b.height = a.height;
    b.src = a.src;
    b.isDrag = false;
    b.noDrag = false;
    b.referEl = document.getElementById("mini_nav_qq");
    b.isIE = document.all ? true: false;
    b.getMX = function(c) {
        return b.isIE ? c.clientX + Math.max(document.body.scrollLeft, document.documentElement.scrollLeft) : c.pageX
    };
    b.getMY = function(c) {
        return b.isIE ? c.clientY + Math.max(document.body.scrollTop, document.documentElement.scrollTop) : c.pageY
    };
    b.setEvent = function(c) {
        c.setCapture && c.setCapture();
        window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
    };
    b.setTitle = function(c) {
        b.layerTitle.firstChild.innerHTML = c
    };
    b.releaseEvent = function(c) {
        c.releaseCapture && c.releaseCapture();
        window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
    };
    b.creatDom = function(c, d) {
        var e = document.createElement(c.tag || "div"),
        l = e.setAttribute ? true: false,
        f;
        for (f in c) if (! (f == "tag" || f == "children" || f == "cn" || f == "html" || f == "style" || typeof c[f] == "function")) if (f == "cls") {
            if (c.cls) e.className = c.cls
        } else if (l) e.setAttribute(f, c[f]);
        else e[f] = c[f];
        if (c.html) e.innerHTML = c.html; (function(m, p) {
            function h(g, k, i) {
                if (! (!g || typeof i != "string")) {
                    g.style[k ? k: ""] = i ? i: "";
                    return g
                }
            }
            if (p) if (typeof p == "string") for (var n = /\s?([a-z\-]*)\:\s?([^;]*);?/gi,
            j; (j = n.exec(p)) != null;) h(m, j[1], j[2]);
            else if (typeof p == "object") for (n in p) h(m, n, p[n])
        })(e, c.style);
        d && d.appendChild(e);
        return e
    };
    b.getObjPosition = function(c) {
        var d = {};
        d.x = c.offsetLeft;
        for (d.y = c.offsetTop; c = c.offsetParent;) {
            d.x += c.offsetLeft;
            d.y += c.offsetTop
        }
        return d
    };
    b.getWindowSize = function() {
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
    b.keyDownListener = function(c) {
        c = c ? c: window.event;
        c.keyCode == 27 && b.closePopup()
    };
    b.keyDownAddListener = function() {
        b.isIE ? document.attachEvent("onkeydown", b.keyDownListener) : document.addEventListener("keydown", b.keyDownListener, false)
    };
    b.keyDownRemoveListener = function() {
        b.isIE ? document.detachEvent("onkeydown", b.keyDownListener) : document.removeEventListener("keydown", b.keyDownListener, false)
    };
    b.createInfoWindow = function(c, d) {
        b.layerbg = b.creatDom({
            cls: "share_layer"
        });
        b.main = b.creatDom({
            cls: "share_layer_main"
        });
        b.layerTitle = b.creatDom({
            cls: "share_layer_title"
        });
        var e = b.creatDom({
            tag: "h3",
            html: b.title,
            cls: b.titleCls || ""
        });
        b.close = b.creatDom({
            tag: "a",
            title: "关闭",
            cls: "del_fri",
            href: "javascript:void(0)",
            html: "X"
        });
        b.close.onmousedown = function() {
            b.releaseEvent(b.layerTitle);
            b.closePopup()
        };
        b.layerTitle.appendChild(e);
        b.layerTitle.appendChild(b.close);
        b.main.appendChild(b.layerTitle);
        b.con = b.creatDom({
            cls: "share_layer_cont"
        });
        b.iframe = b.creatDom({
            tag: "iframe"
        });
        b.iframe.setAttribute("id", "mbPopupWinFrame");
        b.iframe.setAttribute("name", "mbPopupWinFrame");
        b.iframe.setAttribute("frameBorder", "0", 0);
        b.iframe.setAttribute("marginheight", "0");
        b.iframe.setAttribute("marginwidth", "0");
        b.iframe.setAttribute("scrolling", "no");
        b.iframe.style.width = b.width + "px";
        b.iframe.style.height = b.height + "px";
        b.iframe.style.display = "block";
        b.con.appendChild(b.iframe);
        window.setTimeout(function() {
            b.iframe.setAttribute("src", b.src, 0)
        },
        5);
        b.main.appendChild(b.con);
        e = b.creatDom({
            cls: "bg"
        });
        b.layerbg.appendChild(b.main);
        b.layerbg.appendChild(e);
        b.body.appendChild(b.layerbg);
        b.floatPopup(c, d);
        b.dragPopup(b.layerTitle, b.layerbg)
    };
    b.tr = function() {
        var c = UI.width(this.referEl),
        d = UI.getX(this.referEl);
        this.layerbg.style.width = this.width + 2 + "px";
        this.layerbg.style.left = d + c - this.width - 9 + "px";
        this.layerbg.style.top = "-8px"
    };
    b.floatPopup = function(c, d, e) {
        if (d == "top-right" && b.referEl) b.tr();
        else {
            c = (UI.windowWidth() - b.width) / 2;
            if (c < 0) c = 0;
            d = (UI.windowHeight() - b.height - 30) / 2;
            if (d < 0) d = 0;
            b.layerbg.style.width = b.width + 2 + "px";
            b.layerbg.style.left = e ? e.left: UI.scrollX() + c + "px";
            b.layerbg.style.top = e ? e.left: UI.scrollY() + d + "px"
        }
    };
    b.dragPopup = function(c, d) {
        c.onmousedown = function(e) {
            d.style.position = "absolute";
            var l = document;
            if (!e) e = window.event;
            x = e.layerX ? e.layerX: e.offsetX;
            y = e.layerY ? e.layerY: e.offsetY;
            b.setEvent(c);
            l.onmousemove = function(f) {
                if (!b.noDrag) {
                    if (!f) f = window.event;
                    var m = b.getMX(f),
                    p = b.getMY(f);
                    if (!f.pageX) f.pageX = m;
                    if (!f.pageY) f.pageY = p;
                    m = f.pageY - y;
                    d.style.left = f.pageX - x - (b.isIE ? 10 : 7) + "px";
                    d.style.top = m - (b.isIE ? 10 : 7) + "px"
                }
            };
            l.onmouseup = function() {
                b.isDrag = false;
                b.releaseEvent(c);
                l.onmousemove = null;
                l.onmouseup = null;
                l.onselectstart = null
            };
            l.onselectstart = function() {
                return false
            }
        }
    };
    b.resizePopup = function(c) {
        if (c.width) {
            b.layerbg.style.width = c.width + 2 + "px";
            b.iframe.style.width = c.width + "px"
        }
        if (c.height) b.iframe.style.height = c.height + "px"
    };
    b.showPopup = function(c, d, e, l) {
        b.noDrag = e;
        b.layerbg && b.closePopup();
        b.createInfoWindow(c, d, l);
        b.layerTitle.style.cursor = e ? "default": "move";
        b.keyDownAddListener()
    };
    b.closePopup = function(e) {
        b.timeId && clearInterval(b.timeId);
        b.iframe.parentNode.removeChild(b.iframe);
        b.layerbg.parentNode.removeChild(b.layerbg);
        b.layerbg = null;
        b.keyDownRemoveListener();
		UI.E(e).stop();
    };
    b.hidePopup = function() {
        b.layerbg.style.display = "none"
    };
    b.dataCenter = {}
};
function mb_cbRegister() {
    try {
        MI.Login.popup.closePopup()
    } catch(a) {}
    mb_cbLogin()
}
function mb_cbLogin() {
    window.mb_quick_reg_call && window.mb_quick_reg_call();
    MI.AccountInfo.get();
    MI.Login.callerName && MI.Login.cbLogin[MI.Login.callerName] && MI.Login.cbLogin[MI.Login.callerName]();
    if (MI.Login.callerName != "statusbar") try {
        _MB_WEBTOP_STATUSBAR_.update()
    } catch(a) {}
    typeof _MB_WEB_FOLLOWING_CHANGE_ == "function" && _MB_WEB_FOLLOWING_CHANGE_();
    MI.Bos("btnPortalLoginOK")
}
function mb_quick_reg(a, b, c) {
    b = b || "";
    if (MI.AccountInfo.uin && MI.S("account_uin_" + MI.AccountInfo.uin)) if (MI.S("account_mbid_" + MI.AccountInfo.uin)) c && c();
    else {
        MI.Login.popup.src = "http://mini.t.qq.com/invite/quick.php?pref=" + b;
        MI.Login.showPopup(b, a);
        if (c) window.mb_quick_reg_call = function() {
            c();
            window.mb_quick_reg_call = null
        }
    } else {
        MI.Login.popup.src = "http://mini.t.qq.com/mblogin_quick.htm?pref=" + b;
        MI.Login.showPopup(b, a);
        if (c) window.mb_quick_reg_call = function() {
            c();
            window.mb_quick_reg_call = null
        }
    }
    MI.Login.from = b;
    MI.Bos("btnPortalQuickLogin", b)
}
mb_quick_reg_call = null;
if (!MI.Login) MI.Login = {
    callerName: "",
    cbLogin: {},
    from: window.location.host,
    popup: new MI.Popup({
        title: "微博登录",
        titleCls: "mblogo",
        width: 576,
        height: 167,
         src: "http://mini.t.qq.com/mblogin_quick.htm?pref=" + window.location.host
		/// src:'http://ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=636014201&target=self&s_url=http%3A//www.qq.com/qq2012/loginSuccess.htm'
    }),
    logout: function() {
        UI.removeCookie("uin", "", 0);
        UI.removeCookie("skey", "", 0);
        UI.removeCookie("luin", "", 0);
        UI.removeCookie("lskey", "", 0);
        MI.AccountInfo.clearLocal()
    },
    getUin: function() {
        var a = UI.cookie("uin") || UI.cookie("luin");
        if (!a) return 0;
        a = parseInt(a.replace(/[^\d]/g, ""), 10);
        if (!isNaN(a) && a > 1E4) return a;
        return 0
    },
    setCallback: function(a, b) {
        this.cbLogin[a] = b
    },
    showPopup: function(a, b, c, d, e) {
        this.callerName = a;
        this.popup.showPopup(b, c, d, e)
    }
};
function mb_cbAccountInfo(a) {
    var b = false,
    c = false;
    if (a.result == -1) {
        MI.Login.logout();
        c = true
    } else if (a.result == -3) b = true;
    else if (a.result) return;
    var d;
    if (a.info) d = {
        uin: a.info[0] || "",
        nick: UI.safeHtml(a.info[1] || ""),
        mbid: a.info[2] || "",
        mbnick: a.info[3] || "",
        data: a
    };
    MI.AccountInfo.cacheInfo(d);
    MI.AccountInfo.callback(d, b, c)
}
if (!MI.AccountInfo) MI.AccountInfo = {
    uin: MI.Login.getUin(),
    callerName: "",
    cbAccountInfo: {},
    nickDelay: 3E5,
    mbDelay: 12E5,
    setCallback: function(a, b) {
        this.cbAccountInfo[a] = b
    },
    callback: function(a, b, c) {
        this.callerName && this.cbAccountInfo[this.callerName] && this.cbAccountInfo[this.callerName](a, b, c);
        MI.Login.callerName != this.callerName && MI.Login.callerName && this.cbAccountInfo[MI.Login.callerName] && this.cbAccountInfo[MI.Login.callerName](a, b, c)
    },
    cacheInfo: function(a) {
        if (a) {
            var b = +new Date,
            c = a.uin;
            this.uin = c;
            this.nick = a.nick;
            this.account = a.mbid;
            MI.S("account_lasttime", b);
            MI.S("account_time_" + c, b);
            MI.S("account_uin_" + c, a.uin);
            MI.S("account_nick_" + c, a.nick);
            MI.S("account_mbid_" + c, a.mbid);
            MI.S("account_mbnick_" + c, a.mbnick)
        }
    },
    getFromLocal: function(a) {
        if (a) {
            var b = MI.S("account_time_" + a);
            if (b) {
                var c = UI.safeHtml(MI.S("account_nick_" + a)),
                d = MI.S("account_mbid_" + a),
                e = MI.S("account_mbnick_" + a);
                if (d && e) if ( + new Date - b > (d ? this.mbDelay: this.nickDelay)) this.clear(a);
                else return {
                    uin: a,
                    nick: c,
                    mbid: d,
                    mbnick: e
                }
            }
        }
    },
    get: function(a, b) {
        var c = this.getFromLocal(a);
        this.callerName = b;
        c ? this.callback(c) : UI.getScript("http://mini.t.qq.com/mini/mycheck.php?r=" + (new Date).getTime())
    },
    clearLocal: function() {
        this.clear(this.uin)
    },
    clear: function(a) {
        if (a) {
            MI.S("account_time_" + a, "");
            MI.S("account_uin_" + a, "");
            MI.S("account_nick_" + a, "");
            MI.S("account_mbid_" + a, "");
            MI.S("account_mbnick_" + a, "")
        }
    },
    clearLocalAll: function() {
        var a = MI.S("account_lasttime");
        a && +new Date - a > this.mbDelay && MI.S.clear()
    }
};
function ptlogin2_onResizeMb(a, b) {
    MI.Login.popup.resizePopup({
        height: b
    })
}
MI.StatusBar = function(a) {
    this.loginEl = a.loginEl;
    this.logoutEl = a.logoutEl;
    this.entryEl = a.entryEl;
    this.infoEl = a.infoEl;
    this.logoEl = a.logoEl;
    this.regEl = a.regEl;
    this.loginPos = a.loginPos;
    this.loginNoDrag = a.loginNoDrag;
    this.init()
};
MI.StatusBar.prototype.init = function() {
    var a = this;
    MI.Login.setCallback("statusbar", UI.bind(a.update, a));
    MI.AccountInfo.setCallback("statusbar", UI.bind(a.showInfo, a));
    a.update();
    if (a.loginEl) a.loginEl.onclick = function() {
        var b = MI.Login.getUin();
        if (b) MI.AccountInfo.get(b, "statusbar");
        else {
            UI.G("mbCarduserNotLogin") && UI.hide(UI.G("mbCarduserNotLogin"));
            MI.Login.showPopup("statusbar", this, a.loginPos, a.loginNoDrag)
        }
        MI.Bos("btnPortalLogin");
        return false
    };
    if (a.logoutEl) a.logoutEl.onclick = function() {
        MI.Login.logout();
        a.update();
        MI.Bos("btnPortalLogout");
        return false
    };
    if (a.regEl) a.regEl.onclick = function() {
        MI.Bos("btnPortalReg")
    }
};
MI.StatusBar.prototype._show = function(a, b) {
    a.style.display = b
};
MI.StatusBar.prototype.update = function() {
    var a = MI.Login.getUin();
    a ? MI.AccountInfo.get(a, "statusbar") : this.showLogin()
};
MI.StatusBar.prototype.showLogin = function() {
    this.loginEl && this._show(this.loginEl, "");
    this.logoutEl && this._show(this.logoutEl, "none");
    this.entryEl && this._show(this.entryEl, "none");
    this.infoEl && this._show(this.infoEl, "none");
    this.regEl && this._show(this.regEl, "");
    var a = MI.Login.getUin(),
    b = UI.cookie("mbCardUserNotLoginTips"),
    c = UI.G("mbCarduserNotLogin"),
    d = UI.GC(".mbClose")[0];
    if (!a && b != 1) {
        UI.show(c);
        d.onclick = function(e) {
            UI.E(e).stop();
            UI.hide(c);
            UI.cookie("mbCardUserNotLoginTips", "1", 1, ".qq.com")
        }
    }
};
MI.StatusBar.prototype.showInfo = function(a, b) {
    function c() {
        clearTimeout(l);
        l = setTimeout(function() {
            UI.show(UI.G("mbCardUserInfo"))
        },
        50);
        return false
    }
    function d() {
        clearTimeout(l);
        l = setTimeout(function() {
            UI.hide(UI.G("mbCardUserInfo"))
        },
        50);
        return false
    }
    function e() {
        d();
        UI.cookie("mbCardUserInfoTips", "1", 1, ".qq.com")
    }
    if (!b) if (a) {
        var l, f = '<span><a href="http://t.qq.com?pref=qqcom.mininav" target="_blank">微博</a> 欢迎您</span><em><a target="_blank" href="http://t.qq.com' + (a.mbid ? "/" + a.mbid + "/": "") + '?pref=qqcom.mininav" onclick="MI.Bos(\'' + (a.mbid ? "btnPortalJump1": "btnPortalJump2") + "')\">";
        f += a.mbid ? a.mbnick + "(@" + a.mbid + ")": a.nick + "(" + a.uin + ")";
        f += "</a></em>";
        if (a.mbid && a.data && a.data.info[4] > 0) f += '<span><a class="mbAtMe" target="_blank" href="http://t.qq.com/at?pref=qqcom.mininav" onclick="MI.Bos(\'' + (a.mbid ? "btnPortalJump1": "btnPortalJump2") + "')\">" + a.data.info[4] + "条消息提到我</a></span>";
        this.infoEl.innerHTML = f;
        if (this.entryEl) {
            this.entryEl.innerHTML = '<a class="mbRegBtn" target="_blank" href="http://t.qq.com' + (a.mbid ? "/" + a.mbid + "/": "") + '?pref=qqcom.mininav" onclick="MI.Bos(\'' + (a.mbid ? "btnPortalJump3": "btnPortalJump4") + "')\">" + (a.mbid ? "进入": "开通") + "微博</a>";
            if (!a.mbid) {
                f = '\t\t\t<div id="mbCardUserInfo" class="mbCardUserInfo" style="display:none">\t\t\t\t<div class="arrowBox"><div calss="arrow"></div></div>\t\t\t\t<div class="mbClose"><a href="#"><span>关闭</span></a></div>\t\t\t\t<div class="mbCardUserDetail">\t\t\t\t\t<div><span class="mbUserNick">' + a.nick + "</span>你好，\t\t\t\t";
                if (a.data && a.data.info[4] > 0) f += '你有<span class="mbFriends">' + a.data.info[4] + "</span>个好友已经开通了腾讯微博。";
                f += '快来加入微博吧。</div>\t\t\t\t\t<div class="mbReg"><a href="http://t.qq.com?pref=qqcom.toptips" target="_blank">开通微博</a></div>\t\t\t\t</div>\t\t\t</div>\t\t\t';
                this.entryEl.innerHTML += f
            }
            if (!a.mbid) {
                UI.GC(".mbRegBtn");
                f = UI.GC(".mbClose")[1];
                UI.GC(".mbCardUserInfo");
                var m = UI.G("mbCarduserNotLogin");
                m && UI.hide(m);
                c();
                f.onclick = e;
                UI.cookie("mbCardUserInfoTips") == 1 && m && d(m)
            }
        }
        this.loginEl && this._show(this.loginEl, "none");
        this.logoutEl && this._show(this.logoutEl, "block");
        this.entryEl && this._show(this.entryEl, "block");
        this.infoEl && this._show(this.infoEl, "");
        this.regEl && this._show(this.regEl, "none")
    }
};
var _MB_WEBTOP_STATUSBAR_;
UI.ready(function() {
    if (UI.G("mblog_login_button")) _MB_WEBTOP_STATUSBAR_ = new MI.StatusBar({
        loginEl: UI.G("mblog_login_button"),
        logoutEl: UI.G("mblog_logout_text"),
        regEl: UI.G("mblog_login_text"),
        entryEl: UI.G("mblog_enter_button"),
        infoEl: UI.G("mblog_logined_info"),
        loginPos: "top-right"
    })
})

/*  |xGv00|32db8c2e852f57120c26fd442203f3bf */