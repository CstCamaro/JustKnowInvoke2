function pageShareWX() {
    qq.getScript("http://mat1.gtimg.com/www/weixin/sharewx_v1.0.0.js", function () {
        sharewx(opt)
    }, "utf-8")
}

function share2sina() {
    var e = qq.GT(qq.G("Cnt-Main-Article-QQ"), "img"), t = [];
    for (var n = 0, r = e.length; n < r; n++) qq.width(e[n]) > 150 && qq.height(e[n]) > 150 && t.push(e[n].src);
    var i = "http://service.weibo.com/share/share.php", s = ARTICLE_INFO.article_url, o = ARTICLE_INFO.title, u = "",
        a = "", f = "", l = t.join("||") || "";
    f = i + "?url=" + encodeURIComponent(s) + "&appkey=" + u + "&title=" + o + "&pic=" + l + "&ralateUid=" + a + "&language=&searchPic=" + !1, window.open(f, "shareQQ", "height=480,width=608,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no")
}

function share2kaixin() {
    var e = "http://www.kaixin001.com/rest/records.php", t = ARTICLE_INFO.article_url, n = ARTICLE_INFO.title, r = "",
        i = [], s = window.screen.width, o = window.screen.height;
    r = e + "?content=" + encodeURIComponent(n) + "&url=" + t + "&starid=&aid=&style=11&t=10";
    var u = window.open(r, "shareQQ", "height=480,width=608,top=" + (o - 480) / 2 + ",left=" + (s - 608) / 2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no")
}

function share2renren() {
    var e = "http://widget.renren.com/dialog/share", t = ARTICLE_INFO.article_url, n = ARTICLE_INFO.title, r = "",
        i = [], s = window.screen.width, o = window.screen.height;
    r = e + "?resourceUrl=" + t + "&title=" + n + "&charset=GB2312", window.open(r, "shareQQ", "height=480,width=608,top=" + (o - 480) / 2 + ",left=" + (s - 608) / 2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no")
}

(function () {
    var d = function (e) {
        var t = this;
        t.body = document.body, t.title = e.title, t.width = e.width, t.height = e.height, t.src = e.src, t.layerbg, t.main, t.layerTitle, t.con, t.close, t.iframe, t.isDrag = !1, t.isIE = document.all ? !0 : !1, t.getMX = function (e) {
            return t.isIE ? e.clientX + Math.max(document.body.scrollLeft, document.documentElement.scrollLeft) : e.pageX
        }, t.getMY = function (e) {
            return t.isIE ? e.clientY + Math.max(document.body.scrollTop, document.documentElement.scrollTop) : e.pageY
        }, t.setEvent = function (e) {
            e.setCapture && e.setCapture(), window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
        }, t.releaseEvent = function (e) {
            e.releaseCapture && e.releaseCapture(), window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
        }, t.creatDom = function (e, t) {
            function n(e, t) {
                function n(e, t, n) {
                    if (!e || typeof n != "string") return;
                    return t = t ? t : "", n = n ? n : "", e.style[t] = n, e
                }

                if (!t) return;
                if (typeof t == "string") {
                    var r = /\s?([a-z\-]*)\:\s?([^;]*);?/gi, i;
                    while ((i = r.exec(t)) != null) n(e, i[1], i[2])
                } else if (typeof t == "object") for (var s in t) n(e, s, t[s])
            }

            var r = document.createElement(e.tag || "div"), i = r.setAttribute ? !0 : !1;
            for (var s in e) {
                if (s == "tag" || s == "children" || s == "cn" || s == "html" || s == "style" || typeof e[s] == "function") continue;
                s == "cls" ? r.className = e.cls : i ? r.setAttribute(s, e[s]) : r[s] = e[s]
            }
            return e.html && (r.innerHTML = e.html), n(r, e.style), t && t.appendChild(r), r
        }, t.getObjPosition = function (e) {
            var t = {};
            t.x = e.offsetLeft, t.y = e.offsetTop;
            while (e = e.offsetParent) t.x += e.offsetLeft, t.y += e.offsetTop;
            return t
        }, t.getWindowSize = function () {
            var e = {};
            return window.self && self.innerWidth ? (e.width = self.innerWidth, e.height = self.innerHeight, e) : document.documentElement && document.documentElement.clientHeight ? (e.width = document.documentElement.clientWidth, e.height = document.documentElement.clientHeight, e) : (e.width = document.body.clientWidth, e.height = document.body.clientHeight, e)
        }, t.keyDownListener = function (e) {
            e = e ? e : window.event, e.keyCode == 27 && t.closePopup()
        }, t.keyDownAddListener = function (e) {
            t.isIE ? document.attachEvent("onkeydown", t.keyDownListener) : document.addEventListener("keydown", t.keyDownListener, !1)
        }, t.keyDownRemoveListener = function () {
            t.isIE ? document.detachEvent("onkeydown", t.keyDownListener) : document.removeEventListener("keydown", t.keyDownListener, !1)
        }, t.createInfoWindow = function (e) {
            t.layerbg = t.creatDom({cls: "share_layer"}), t.main = t.creatDom({cls: "share_layer_main"}), t.layerTitle = t.creatDom({cls: "share_layer_title"});
            var n = t.creatDom({tag: "h3", html: t.title});
            t.close = t.creatDom({
                tag: "a",
                title: "\u5173\u95ed",
                cls: "del_fri",
                href: "javascript:void(0)",
                html: "X"
            }), t.stopPropagation = function (e) {
                var e = e || window.event;
                e && e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            }, t.close.onmousedown = function (e) {
                t.releaseEvent(t.layerTitle), t.closePopup(), t.stopPropagation(e)
            }, t.layerTitle.appendChild(n), t.layerTitle.appendChild(t.close), t.main.appendChild(t.layerTitle), t.con = t.creatDom({cls: "share_layer_cont"}), t.iframe = t.creatDom({tag: "iframe"}), t.iframe.setAttribute("frameBorder", "0", 0), t.iframe.setAttribute("marginheight", "0"), t.iframe.setAttribute("marginwidth", "0"), t.iframe.setAttribute("scrolling", "no"), t.iframe.style.width = t.width + "px", t.iframe.style.height = t.height + "px", t.iframe.style.display = "block", t.con.appendChild(t.iframe), window.setTimeout(function () {
                t.iframe.setAttribute("src", t.src, 0)
            }, 5), t.main.appendChild(t.con);
            var r = t.creatDom({cls: "bg"});
            t.layerbg.appendChild(t.main), t.layerbg.appendChild(r), t.body.appendChild(t.layerbg), t.floatPopup(e), t.dragPopup(t.layerTitle, t.layerbg)
        }, t.floatPopup = function (e) {
            var n = document.body.scrollLeft || document.documentElement.scrollLeft,
                r = document.body.scrollTop || document.documentElement.scrollTop,
                i = {width: n + t.getWindowSize().width, height: r + t.getWindowSize().height}, s = t.getObjPosition(e);
            s.y + t.height > i.height ? s.y = s.y - e.offsetHeight - t.height - t.layerTitle.offsetHeight - 30 : s.y = s.y + e.offsetHeight + 5, s.x = s.x - e.offsetWidth / 2, t.layerbg.style.width = t.width + 2 + "px", t.layerbg.style.left = (i.width - t.width) / 2 + "px", t.layerbg.style.top = r + (t.getWindowSize().height - t.height) / 2 + "px"
        }, t.dragPopup = function (e, n) {
            e.onmousedown = function (r) {
                n.style.position = "absolute", t.isDrag = !0;
                var i = document;
                r || (r = window.event), x = r.layerX ? r.layerX : r.offsetX, y = r.layerY ? r.layerY : r.offsetY, t.setEvent(e);
                var s;
                i.onmousemove = function (e) {
                    if (!t.isDrag) return;
                    e || (e = window.event);
                    var r = t.getMX(e), i = t.getMY(e);
                    e.pageX || (e.pageX = r), e.pageY || (e.pageY = i);
                    var s = e.pageX - x, o = e.pageY - y;
                    n.style.left = s - (t.isIE ? 10 : 7) + "px", n.style.top = o - (t.isIE ? 10 : 7) + "px"
                }, i.onmouseup = function (n) {
                    t.isDrag = !1, t.releaseEvent(e), i.onmousemove = null, i.onmouseup = null, i.onselectstart = null
                }, i.onselectstart = function () {
                    return !1
                }
            }
        }, t.resizePopup = function (e) {
            e.width && (t.iframe.style.width = e.width + "px", t.layerbg.style.width = e.width + 2 + "px"), e.height && (t.iframe.style.height = e.height + "px")
        }, t.showPopup = function (e) {
            if (e) {
                var n = e.className;
                n == "s_qzone" && (t.title = "\u5206\u4eab\u5230QQ\u7a7a\u95f4", t.src = "http://imgcache.qq.com/qzone/app/qzshare/news_share.html#url=" + ARTICLE_INFO.article_url), n == "s_qq" && (t.title = "\u5206\u4eab\u7ed9QQ\u597d\u53cb", t.src = "http://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(ARTICLE_INFO.article_url) + "&site=qqcom&iframe=true&showcount=0&desc=&summary=&title=&pics=&style=203&width=19&height=22")
            }
            t.layerbg && t.closePopup(), t.createInfoWindow(e), t.keyDownAddListener()
        }, t.closePopup = function () {
            t.layerbg.style.display = "none", t.layerbg.parentNode.removeChild(t.layerbg), t.iframe.src = "", t.iframe.parentNode.removeChild(t.iframe), t.layerbg = null, t.keyDownRemoveListener()
        }, t.dataCenter = {}
    };
    window.WB = d;
    var para_qzone = {
        title: "\u5206\u4eab\u5230QQ\u7a7a\u95f4",
        width: 600,
        height: 185,
        src: "http://imgcache.qq.com/qzone/app/qzshare/news_share.html#url=" + ARTICLE_INFO.article_url
    }, para_qq = {
        title: "\u5206\u4eab\u7ed9QQ\u597d\u53cb",
        width: 580,
        height: 540,
        src: "http://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(ARTICLE_INFO.article_url) + "&site=qqcom&iframe=true&showcount=0&desc=&summary=&title=&pics=&style=203&width=19&height=22"
    }, para_qmail = {
        title: "\u5206\u4eab\u5230QQ\u90ae\u7bb1",
        width: 600,
        height: 430,
        src: "http://mail.qq.com/cgi-bin/qm_share_qz?url=" + ARTICLE_INFO.article_url
    }, para_wb = {
        title: "\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a",
        width: 580,
        height: 220,
        src: "http://share.v.t.qq.com/index.php?c=share&a=index&" + function (e, t) {
            var n = [];
            for (var r in e) n.push([r, encodeURIComponent(e[r])].join("="));
            return n.sort(function (e, t) {
                return e.length - t.length
            }), n.join("&").slice(0, t)
        }({
            cs: 1,
            bm: "110",
            url: location.href,
            appkey: "801300956",
            title: document.title,
            pic: UI.GC(UI.G("Cnt-Main-Article-QQ"), "img").join("|")
        }).slice(0, 2048)
    };
    window.share2qzone = new d(para_qzone), window.share2qq = new d(para_qq), window.share2mail = new d(para_qmail), window._share2weibo = new d(para_wb), window.share2weibo = {}, window.share2weibo.showPopup = function (e, t) {
        var t = t || UI.G("Cnt-Main-Article-QQ") && UI.GC(UI.G("Cnt-Main-Article-QQ"), "img"), n = [];
        UI.getType(t) == "Array" && UI.each(t, function (e, t) {
            var r = UI.width(e), i = UI.height(e);
            r > 150 && i > 150 && n.push(encodeURIComponent(e.src))
        });
        var r = new d({
            title: "\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a",
            width: 580,
            height: 220,
            src: "http://share.v.t.qq.com/index.php?c=share&a=index&" + function (e, t) {
                var n = [];
                for (var r in e) n.push([r, encodeURIComponent(e[r])].join("="));
                return n.sort(function (e, t) {
                    return e.length - t.length
                }), n.join("&").slice(0, t)
            }({
                cs: 1,
                bm: "110",
                url: location.href,
                appkey: "801300956",
                title: document.title,
                pic: n.join("|")
            }).slice(0, 2048)
        });
        _iframe_onResizeFunc(r), r.showPopup(e)
    }, window.share2qzone_ptlogin2resize = function (e, t) {
        share2qzone.resizePopup({height: t})
    }, window.share2qq_ptlogin2resize = function (e, t) {
        share2qq.resizePopup({height: t})
    }, window._addPtlogin2_onResizeFunc = function (e) {
        var t = window.ptlogin2_onResize;
        typeof t != "function" ? window.ptlogin2_onResize = e : window.ptlogin2_onResize = function (n, r) {
            try {
                t(n, r)
            } catch (i) {
            }
            try {
                e(n, r)
            } catch (i) {
            }
        }
    }, window._iframe_timer = null, window._iframe_onResizeFunc = function (obj) {
        var toJson = function (s) {
            if (window.JSON !== undefined) try {
                return JSON.parse(s)
            } catch (e) {
                return null
            }
            try {
                return eval("var __json__=" + s), __json__
            } catch (e) {
                return null
            }
        }, onMessage = function (e) {
            e = toJson(e);
            if (e && e.action) {
                if (e.action === "resize") {
                    if (e.data && e.data.height) {
                        try {
                            obj.resizePopup({height: e.data.height})
                        } catch (t) {
                        }
                        return
                    }
                    return
                }
                e.action === "success" && obj.closePopup()
            }
        };
        window.postMessage ? window.addEventListener ? window.addEventListener("message", function (e) {
            onMessage(e.data)
        }) : window.attachEvent("onmessage", function (e) {
            onMessage(e.data)
        }) : window._iframe_timer = setInterval(function () {
            onMessage(window.name), window.name = null
        }, 50)
    }
})(), function () {
    window.share2qmail = new function (e) {
        var t = this;
        t.body = document.body, t.title = e.title, t.width = e.width, t.height = e.height, t.src = e.src, t.isDrag = !1, t.isIE = document.all ? !0 : !1, t.getMX = function (e) {
            return t.isIE ? e.clientX + Math.max(document.body.scrollLeft, document.documentElement.scrollLeft) : e.pageX
        }, t.getMY = function (e) {
            return t.isIE ? e.clientY + Math.max(document.body.scrollTop, document.documentElement.scrollTop) : e.pageY
        }, t.setEvent = function (e) {
            e.setCapture && e.setCapture(), window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
        }, t.releaseEvent = function (e) {
            e.releaseCapture && e.releaseCapture(), window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP)
        }, t.creatDom = function (e, t) {
            var n = document.createElement(e.tag || "div"), r = n.setAttribute ? !0 : !1, i;
            for (i in e) i != "tag" && i != "children" && i != "cn" && i != "html" && i != "style" && typeof e[i] != "function" && (i == "cls" ? n.className = e.cls : r ? n.setAttribute(i, e[i]) : n[i] = e[i]);
            return e.html && (n.innerHTML = e.html), function (e, t) {
                function n(e, t, n) {
                    if (!!e && typeof n == "string") return e.style[t ? t : ""] = n ? n : "", e
                }

                if (t) if (typeof t == "string") for (var r = /\s?([a-z\-]*)\:\s?([^;]*);?/gi, i; (i = r.exec(t)) != null;) n(e, i[1], i[2]); else if (typeof t == "object") for (r in t) n(e, r, t[r])
            }(n, e.style), t && t.appendChild(n), n
        }, t.getObjPosition = function (e) {
            var t = {};
            t.x = e.offsetLeft;
            for (t.y = e.offsetTop; e = e.offsetParent;) t.x += e.offsetLeft, t.y += e.offsetTop;
            return t
        }, t.getWindowSize = function () {
            var e = {};
            return window.self && self.innerWidth ? (e.width = self.innerWidth, e.height = self.innerHeight, e) : document.documentElement && document.documentElement.clientHeight ? (e.width = document.documentElement.clientWidth, e.height = document.documentElement.clientHeight, e) : (e.width = document.body.clientWidth, e.height = document.body.clientHeight, e)
        }, t.keyDownListener = function (e) {
            e = e ? e : window.event, e.keyCode == 27 && t.closePopup()
        }, t.keyDownAddListener = function () {
            t.isIE ? document.attachEvent("onkeydown", t.keyDownListener) : document.addEventListener("keydown", t.keyDownListener, !1)
        }, t.keyDownRemoveListener = function () {
            t.isIE ? document.detachEvent("onkeydown", t.keyDownListener) : document.removeEventListener("keydown", t.keyDownListener, !1)
        }, t.createInfoWindow = function (e) {
            t.layerbg = t.creatDom({cls: "share_layer"}), t.main = t.creatDom({cls: "share_layer_main"}), t.layerTitle = t.creatDom({cls: "share_layer_title"});
            var n = t.creatDom({tag: "h3", html: t.title});
            t.close = t.creatDom({
                tag: "a",
                title: "\u5173\u95ed",
                cls: "del_fri",
                href: "javascript:void(0)",
                html: "X"
            }), t.stopPropagation = function (e) {
                var e = e || window.event;
                e && e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            }, t.close.onmousedown = function (e) {
                t.releaseEvent(t.layerTitle), t.closePopup(), t.stopPropagation(e)
            }, t.layerTitle.appendChild(n), t.layerTitle.appendChild(t.close), t.main.appendChild(t.layerTitle), t.con = t.creatDom({cls: "share_layer_cont"}), t.iframe = t.creatDom({tag: "iframe"}), t.iframe.setAttribute("frameBorder", "0", 0), t.iframe.setAttribute("marginheight", "0"), t.iframe.setAttribute("marginwidth", "0"), t.iframe.setAttribute("scrolling", "no"), t.iframe.style.width = t.width + "px", t.iframe.style.height = t.height + "px", t.iframe.style.display = "block", t.con.appendChild(t.iframe), window.setTimeout(function () {
                t.iframe.setAttribute("src", t.src, 0)
            }, 5), t.main.appendChild(t.con), n = t.creatDom({cls: "bg"}), t.layerbg.appendChild(t.main), t.layerbg.appendChild(n), t.body.appendChild(t.layerbg), t.floatPopup(e), t.dragPopup(t.layerTitle, t.layerbg)
        }, t.floatPopup = function (e) {
            var n = document.body.scrollLeft || document.documentElement.scrollLeft,
                r = document.body.scrollTop || document.documentElement.scrollTop,
                i = {width: n + t.getWindowSize().width, height: r + t.getWindowSize().height}, s = t.getObjPosition(e);
            s.y + t.height > i.height ? s.y = s.y - e.offsetHeight - t.height - t.layerTitle.offsetHeight - 30 : s.y = s.y + e.offsetHeight + 5, s.x = s.x - e.offsetWidth / 2, t.layerbg.style.width = t.width + 2 + "px", t.layerbg.style.left = (i.width - t.width) / 2 + "px", t.layerbg.style.top = r + (t.getWindowSize().height - t.height) / 2 + "px"
        }, t.dragPopup = function (e, n) {
            e.onmousedown = function (r) {
                n.style.position = "absolute", t.isDrag = !0;
                var i = document;
                r || (r = window.event), x = r.layerX ? r.layerX : r.offsetX, y = r.layerY ? r.layerY : r.offsetY, t.setEvent(e), i.onmousemove = function (e) {
                    if (t.isDrag) {
                        e || (e = window.event);
                        var r = t.getMX(e), i = t.getMY(e);
                        e.pageX || (e.pageX = r), e.pageY || (e.pageY = i), r = e.pageY - y, n.style.left = e.pageX - x - (t.isIE ? 10 : 7) + "px", n.style.top = r - (t.isIE ? 10 : 7) + "px"
                    }
                }, i.onmouseup = function () {
                    t.isDrag = !1, t.releaseEvent(e), i.onmousemove = null, i.onmouseup = null, i.onselectstart = null
                }, i.onselectstart = function () {
                    return !1
                }
            }
        }, t.resizePopup = function (e) {
            e.width && (t.iframe.style.width = e.width + "px", t.layerbg.style.width = e.width + 2 + "px"), e.height && (t.iframe.style.height = e.height + "px")
        }, t.showPopup = function (e) {
            t.layerbg && t.closePopup(), t.createInfoWindow(e), t.keyDownAddListener()
        }, t.closePopup = function () {
            t.layerbg.style.display = "none", t.layerbg.parentNode.removeChild(t.layerbg), t.iframe.src = "", t.iframe.parentNode.removeChild(t.iframe), t.layerbg = null, t.keyDownRemoveListener()
        }, t.dataCenter = {}
    }({
        title: "\u5206\u4eab\u5230QQ\u90ae\u7bb1",
        width: 600,
        height: 430,
        src: "http://mail.qq.com/cgi-bin/qm_share_qz?url=" + ARTICLE_INFO.article_url
    }), window.share2qmail_ptlogin2resize = function (e, t) {
        share2qmail.resizePopup({height: t})
    }, window._addPtlogin2_onResizeFunc = function (e) {
        var t = window.ptlogin2_onResize;
        window.ptlogin2_onResize = typeof t != "function" ? e : function (n, r) {
            try {
                t(n, r)
            } catch (i) {
            }
            try {
                e(n, r)
            } catch (s) {
            }
        }
    }
}();
var opt = {
    title: encodeURIComponent(ARTICLE_INFO.title),
    imgsrc: "",
    url: ARTICLE_INFO.article_url + "?mobile",
    appid: "wx66e51778a48681ad"
};
(function (e) {
    var t = e.WBwd = function (e) {
        return new t.fn.init(e)
    };
    t.fn = t.prototype = {
        $: function (e) {
            return document.getElementById(e)
        }, _x: 0, _y: 0, _getSele: function () {
            if (e.getSelection) return e.getSelection().toString();
            if (document.getSelection) return D.getSelection();
            if (document.selection) return document.selection.createRange().text
        }, _stopBubble: function (e) {
            document.all ? window.event.cancelBubble = !0 : e.stopPropagation()
        }, _stopDefault: function (e) {
            if (!!document.all) return window.event.returnValue = !1, !1;
            e.preventDefault()
        }, _getX: function (e) {
            var t = e.offsetLeft;
            while (e = e.offsetParent) t += e.offsetLeft;
            return t
        }, _getY: function (e) {
            var t = e.offsetTop;
            while (e = e.offsetParent) t += e.offsetTop;
            return t
        }, _getPicUrl: function (e) {
            var t = _$$(document.getElementById(e), "img"), n, r = "";
            for (n in t) {
                var i = t[n], s = _MUI.width(i), o = _MUI.height(i);
                if (s > 100 || o > 100) {
                    r = i.src;
                    break
                }
            }
            return r
        }, _getTipsPos: function (t, n, r) {
            var i = e.event || t, s = this;
            this._x = i.clientX - this._getX(this.$(n)) + document.body.scrollLeft + document.documentElement.scrollLeft, this._y = i.clientY - this._getY(this.$(n)) + document.body.scrollTop + document.documentElement.scrollTop, r ? (this.$("tipsWBzf").style.left = this._x + "px", this.$("tipsWBzf").style.top = this._y - 32 + "px") : (this.$("tipsWBzf").style.left = this._x + "px", this.$("tipsWBzf").style.top = this._y - 32 + "px")
        }, _setTips: function (e) {
            this.$(e).style.position = "relative";
            var t = this, n = document.createDocumentFragment(), r = document.createElement("DIV");
            r.id = "tipsWBzf", r.style.cssText = "width:59px;height:22px;position:absolute;visibility: hidden;text-decoration:none;z-index:899;cursor:pointer", r.innerHTML = '<span style="position:relative;"><a bosszone="huaciZB" href="javascript:void(0)" style="position:absolute;left:0;top:0;z-index:900;display:block;width:79px;height:25px;background:url(http://mat1.gtimg.com/news/dc/icon_huaci_zb.gif) no-repeat;" title="\u8f6c\u64ad\u81f3\u5fae\u535a"></a></span>', n.appendChild(r), this.$(e).appendChild(n)
        }, init: function (e) {
            if (e) {
                var t = this, n = !1, r = "";
                this._setTips(e), this.$(e).onmouseup = function (i) {
                    t._getSele().length > 10 && !n ? (document.all ? (t.$("tipsWBzf").style.visibility = "visible", t._getTipsPos(i, e, !0)) : (t.$("tipsWBzf").style.visibility = "visible", t._getTipsPos(i, e, !1)), r == t._getSele() && t.$("tipsWBzf").style.visibility == "visible" ? (r = "", t.$("tipsWBzf").style.visibility = "hidden", n = !1) : r = t._getSele()) : (t.$("tipsWBzf").style.visibility = "hidden", n = !1)
                }, this.$("tipsWBzf").onmousedown = function () {
                    t.$("tipsWBzf").style.visibility = "hidden";
                    var e = t._getSele(), r = window.location.href;
                    r.indexOf("#") > 0 ? r = encodeURI(r.substr(0, r.indexOf("#"))) : r = encodeURI(r), _MI.Article.title != "" && (e = "\u3010" + ARTICLE_INFO.title + "\u3011" + e), _MI.string.length(e) > 119 && (e = _MI.string.cut(e, 234)), _MI.Bos("qqcom.dp.huaci", null, "qqcom.dp.wradio");
                    var i = UI.G("Cnt-Main-Article-QQ") && UI.GC(UI.G("Cnt-Main-Article-QQ"), "img"), s = [];
                    return UI.getType(i) == "Array" && UI.each(i, function (e, t) {
                        var n = UI.width(e), r = UI.height(e);
                        n > 150 && r > 150 && s.push(encodeURIComponent(e.src))
                    }), window.WBwd = new WB({
                        title: "\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a",
                        width: 580,
                        height: 220,
                        src: "http://share.v.t.qq.com/index.php?c=share&a=index&" + function (e, t) {
                            var n = [];
                            for (var r in e) n.push([r, encodeURIComponent(e[r])].join("="));
                            return n.sort(function (e, t) {
                                return e.length - t.length
                            }), n.join("&").slice(0, t)
                        }({
                            cs: 1,
                            bm: "110",
                            url: location.href,
                            appkey: "801300956",
                            title: "",
                            summary: e,
                            pic: s.join("|")
                        }).slice(0, 2048)
                    }), _iframe_onResizeFunc(WBwd), WBwd.showPopup(this), n = !0, window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(), !1
                }, this.$("tipsWBzf").onmouseup = function () {
                    return !1
                }, document.onmousedown = function (e) {
                    t.$("tipsWBzf").style.visibility == "visible" && (t.$("tipsWBzf").style.visibility = "hidden", n = !1)
                }
            }
        }
    }, t.fn.init.prototype = t.prototype
})(window)/*  |xGv00|c66b9f182b440c3707ecd91ba0675509 */