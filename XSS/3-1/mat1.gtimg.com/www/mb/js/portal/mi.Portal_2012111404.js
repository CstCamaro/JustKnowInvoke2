String.prototype.hasString = function(a) {
    if (typeof a == "object") {
        for (var b = 0,
        e = a.length; b < e; b++) if (!this.hasString(a[b])) return false;
        return true
    } else if (this.indexOf(a) != -1) return true
};
String.prototype.breakWord = function(a, b) {
    b || (b = "<wbr/>");
    return this.replace(RegExp("(\\w{" + (a ? a: 0) + "})(\\w)", "g"),
    function(e, c, f) {
        return c + b + f
    })
};
var _MUI; (function() {
    _MUI = {
        ajax: function(a) {
            var b, e, c;
            if (a.crossDomain) {
                var f = _MUI.G("proxy_ifrm");
                if (!f) return;
                b = f.contentWindow.xmlHttp()
            } else b = _MUI.xmlHttp();
            b.onreadystatechange = function() {
                if (b.readyState == 1) {
                    if (a.timeout && a.fail) c = setTimeout(function() {
                        if (!e) {
                            b.abort();
                            a.fail()
                        }
                    },
                    a.timeout)
                } else if (b.readyState == 2) a.send && a.send();
                else if (b.readyState == 4) {
                    e = 1;
                    if (b.status == 200) try {
                        a.success(b.responseText)
                    } catch(i) {} else if (a.fail) {
                        clearTimeout(c);
                        a.fail()
                    }
                }
            };
            if (_MUI.isObject(a.data)) {
                f = [];
                for (var g in a.data) f.push(g + "=" + encodeURIComponent(a.data[g]));
                a.data = f.join("&")
            }
            if (a.type == "get") {
                b.open("GET", a.url + (a.url.hasString("?") ? "&": "?") + a.data, true);
                b.send(null)
            } else {
                b.open("POST", a.url, true);
                b.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                b.send(a.data)
            }
            return b
        },
        get: function(a, b, e) {
            var c = _MUI.xmlHttp(),
            f = a.hasString("?") ? "&": "?";
            c.onreadystatechange = function() {
                if (c.readyState == 4 && c.status == 200) try {
                    e(c.responseText)
                } catch(h) {} else return c
            };
            if (b != undefined) if (_MUI.isObject(b)) {
                var g = [],
                i;
                for (i in b) g.push(i + "=" + encodeURIComponent(b[i]));
                a += f + g.join("&")
            } else a += f + b;
            c.open("GET", a, true);
            c.send(null);
            return c
        },
        xmlHttp: function() {
            var a;
            if (window.ActiveXObject) a = new ActiveXObject("Microsoft.XMLHTTP");
            else if (window.XMLHttpRequest) a = new XMLHttpRequest;
            return a
        },
        crossAsynJson: function(a, b, e, c) {
            var f = _MUI.DC("script"),
            g = _MUI.GT(document, "head")[0];
            window[b] = function(i) {
                try {
                    window[b] = undefined
                } catch(h) {}
                try {
                    delete window[b]
                } catch(k) {}
                e(i);
                g && setTimeout(function() {
                    g.removeChild(f)
                },
                5)
            };
            c && _MUI.A(f, "charset", c);
            _MUI.A(f, "type", "text/javascript");
            _MUI.A(f, "src", a);
            g.appendChild(f)
        },
        afax: function(a) {
            var b = _MUI.G("mbPublishFrom");
            _MUI.G("mbPublishFrame");
            _MUI.A(b, "action", a.url);
            for (var e in a.data) {
                var c = _MUI.DC("input");
                _MUI.A(c, "name", e);
                _MUI.A(c, "value", a.data[e]);
                _MUI.append(c, b)
            }
            b.submit()
        },
        afaxClear: function() {
            var a = _MUI.G("mbPublishFrom"),
            b = _MUI.G("mbPublishFrame");
            if (b.src != "about:blank") b.src = "about:blank";
            a.action = "";
            a.reset();
            _MUI.each(_MUI.GC(a, "input"),
            function(e) {
                _MUI.remove(e)
            })
        },
        getScript: function(a, b, e) {
            var c = _MUI.DC("script");
            if (b) if (_MUI.B.ie) c.onreadystatechange = function() {
                if (c.readyState == "loaded" || c.readyState == "complete") b()
            };
            else c.onload = b;
            e && _MUI.A(c, "charset", e);
            _MUI.A(c, "type", "text/javascript");
            _MUI.A(c, "src", a);
            _MUI.GT(document, "head")[0].appendChild(c)
        },
        getCss: function(a, b, e) {
            var c = e ? e: _MUI.DC("link");
            if (b) c.onload = b;
            if (!e) {
                _MUI.A(c, "rel", "stylesheet");
                _MUI.A(c, "type", "text/css");
                _MUI.GT(document, "head")[0].appendChild(c)
            }
            _MUI.A(c, "href", a)
        },
        evalScript: function(a) {
            var b = this.regExp.script; (a = a.match(RegExp(b, "img"))) && _MUI.each(a,
            function(e) {
                eval(e.match(RegExp(b, "im"))[1])
            })
        },
        regExp: {
            script: "<script[^>]*>([\\S\\s]*?)<\/script>"
        },
        encode: function(a) {
            return escape(_MUI.utfEncode(a))
        },
        decode: function(a) {
            return _MUI.utfDecode(unescape(a))
        },
        utfEncode: function(a) {
            a = a.replace(/\r\n/g, "\n");
            for (var b = "",
            e = 0; e < a.length; e++) {
                var c = a.charCodeAt(e);
                if (c < 128) b += String.fromCharCode(c);
                else {
                    if (c > 127 && c < 2048) b += String.fromCharCode(c >> 6 | 192);
                    else {
                        b += String.fromCharCode(c >> 12 | 224);
                        b += String.fromCharCode(c >> 6 & 63 | 128)
                    }
                    b += String.fromCharCode(c & 63 | 128)
                }
            }
            return b
        },
        utfDecode: function(a) {
            for (var b = "",
            e = 0,
            c = c1 = c2 = 0; e < a.length;) {
                c = a.charCodeAt(e);
                if (c < 128) {
                    b += String.fromCharCode(c);
                    e++
                } else if (c > 191 && c < 224) {
                    c2 = a.charCodeAt(e + 1);
                    b += String.fromCharCode((c & 31) << 6 | c2 & 63);
                    e += 2
                } else {
                    c2 = a.charCodeAt(e + 1);
                    c3 = a.charCodeAt(e + 2);
                    b += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    e += 3
                }
            }
            return b
        },
        parseUrl: function(a, b) {
            var e = a ? a: document.location.href,
            c = {};
            b = b || "?";
            if (!e.hasString(b)) return c;
            e = e.split(b)[1].split("&");
            for (var f = 0; f < e.length; f++) {
                var g = e[f].replace(/#.*$/g, "").split("=");
                g[1] || (g[1] = "");
                c[g[0]] = _MUI.B.ie ? g[1] : _MUI.decode(g[1])
            }
            return c
        },
        cookie: function(a, b, e) {
            if (b == undefined) {
                a += "=";
                b = document.cookie.split(";");
                for (e = 0; e < b.length; e++) {
                    for (var c = b[e]; c.charAt(0) == " ";) c = c.substring(1, c.length);
                    if (c.indexOf(a) == 0) return decodeURIComponent(c.substring(a.length, c.length))
                }
                return null
            } else {
                c = "";
                if (e) {
                    c = new Date;
                    c.setTime(c.getTime() + e * 864E5);
                    c = "; expires=" + c.toGMTString()
                }
                document.cookie = a + "=" + b + c + "; path=/"
            }
        },
        drag: function(a, b, e) {
            var c = document;
            e = e != undefined ? e: true;
            _MUI.EA(a, "mousedown",
            function(f) {
                b.start && b.start(f);
                if (e) if (a.setCapture) a.setCapture();
                else window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                if (b.drag) c.onmousemove = b.drag;
                c.onmouseup = function() {
                    if (e) if (a.releaseCapture) a.releaseCapture();
                    else window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                    b.stop && b.stop(f);
                    c.onmousemove = null;
                    c.onmouseup = null;
                    b.call && b.call(f)
                }
            })
        },
        animate: function(a, b, e, c, f, g) {
            f = f || 0.4;
            var i = b.hasString("scroll"),
            h = "height,width,marginLeft,marginTop".hasString(b),
            k,
            j = setInterval(function() {
                var p, m, l, n = b == "opacity";
                p = h ? a.style[b] : i ? a[b] : _MUI.C(a, b);
                if (n) {
                    p *= 100;
                    e *= 100;
                    if (e > 100) e = 100
                } else i || (p = p == "auto" ? 0 : Number(p.slice(0, -2)));
                if (Math.abs(e - p) <= 3 || i && k == p) {
                    p = e;
                    clearInterval(j)
                }
                l = (e - p) * f;
                if (!n) if (l > 0 && l < 1) l = 1;
                else if (l < 0 && l > -1) l = -1;
                m = k = p + l;
                if (!n && (l < 0 && e - m > 0 || l > 0 && m - e > 0)) m = e;
                if (h) a.style[b] = m + "px";
                else if (i) a[b] = parseInt(m);
                else _MUI.C(a, b, !n ? m + "px": m / 100 + "");
                if (p == e) if (_MUI.isString(c)) eval(c);
                else c && c()
            },
            g || 40);
            return j
        },
        getX: function(a) {
            return a.offsetParent ? a.offsetLeft + _MUI.getX(a.offsetParent) : a.offsetLeft
        },
        getY: function(a) {
            return a.offsetParent ? a.offsetTop + _MUI.getY(a.offsetParent) : a.offsetTop
        },
        within: function(a, b) {
            var e = _MUI.getX(b) - _MUI.scrollX(),
            c = _MUI.width(b) + e,
            f = _MUI.getY(b) - _MUI.scrollY(),
            g = _MUI.height(b) + f,
            i = {};
            if (a[0] > e && a[0] < c && a[1] > f && a[1] < g) {
                if (a[0] - e < (c - e) / 2) i.left = true;
                if (a[1] - f < (g - f) / 2) i.top = true;
                return i
            }
        },
        frameX: function(a) {
            return a.frameElement ? _MUI.getX(a.frameElement) + _MUI.frameX(a.parent) : 0
        },
        frameY: function(a) {
            return a.frameElement ? _MUI.getY(a.frameElement) + _MUI.frameY(a.parent) : 0
        },
        width: function(a) {
            return parseInt(a.offsetWidth)
        },
        height: function(a) {
            return parseInt(a.offsetHeight)
        },
        pageWidth: function() {
            return document.body.scrollWidth || document.documentElement.scrollWidth
        },
        pageHeight: function() {
            return document.body.scrollHeight || document.documentElement.scrollHeight
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
                var e = a.parentNode,
                c = a.scrollLeft || 0;
                if (a == b) c = _MUI.scrollX();
                return e ? c + _MUI.scrollX(e) : c
            }
            return self.pageXOffset || b && b.scrollLeft || document.body.scrollLeft
        },
        scrollY: function(a) {
            var b = document.documentElement;
            if (a) {
                var e = a.parentNode,
                c = a.scrollTop || 0;
                if (a == b) c = _MUI.scrollY();
                return e ? c + _MUI.scrollY(e) : c
            }
            return self.pageYOffset || b && b.scrollTop || document.body.scrollTop
        },
        scrollTo: function(a, b, e) {
            if (a == document.documentElement || a == document.body) return window.scrollTo(b, e)
        },
        hide: function(a) {
            if (_MUI.isString(a)) a = this.G(a);
            if (a) {
                var b = this.C(a, "display");
                if (b != "none") a.__curDisplay = b;
                a.style.display = "none"
            }
        },
        show: function(a) {
            if (_MUI.isString(a)) a = this.G(a);
            if (a) a.style.display = a.__curDisplay || ""
        },
        toggle: function(a) {
            if (_MUI.isString(a)) a = this.G(a);
            this.C(a, "display") == "none" ? this.show(a) : this.hide(a)
        },
        hasClass: function(a, b) {
            if (!a || !a.className) return false;
            return a.className != a.className.replace(RegExp("\\b" + b + "\\b"), "")
        },
        addClass: function(a, b) {
            if (a) if (a.className) if (this.hasClass(a, b)) return false;
            else a.className += " " + b;
            else a.className = b
        },
        removeClass: function(a, b) {
            if (a) a.className = a.className.replace(RegExp("\\b" + b + "\\b"), "")
        },
        toggleClass: function(a, b) {
            this.hasClass(a, b) ? this.removeClass(a, b) : this.addClass(a, b)
        },
        next: function(a) {
            a = a.nextSibling;
            if (a == null) return false;
            return _MUI.isElement(a) ? a: this.next(a)
        },
        prev: function(a) {
            a = a.previousSibling;
            if (a == null) return false;
            return _MUI.isElement(a) ? a: this.prev(a)
        },
        remove: function(a) {
            a && a.parentNode && a.parentNode.removeChild(a)
        },
        append: function(a, b) {
            b.appendChild(a)
        },
        prepend: function(a, b) {
            var e = b.firstChild;
            e ? _MUI.before(a, e) : _MUI.append(a, b)
        },
        after: function(a, b) {
            var e = b.parentNode;
            e.lastChild == a ? e.appendChild(a) : e.insertBefore(a, b.nextSibling)
        },
        before: function(a, b) {
            b.parentNode.insertBefore(a, b)
        },
        replace: function(a, b) {
            b.parentNode.replaceChild(a, b)
        },
        tmpl: function() {
            var a = {};
            return function b(e, c) {
                var f = !/\W/.test(e) ? a[e] = a[e] || b(_MUI.G(e).innerHTML) : _MUI.tmplString(e);
                return c ? f(c) : f
            }
        } (),
        tmplString: function(a) {
            return new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');")
        },
        html: function(a) {
            var b = _MUI.DC("div"),
            e = [];
            b.innerHTML = a;
            _MUI.each(b.childNodes, function(c) {
                e.push(c)
            });
            return e
        },
        css: function(a, b) {
            var e;
            if (!b) {
                b = _MUI.DC("style");
                _MUI.A(b, "type", "text/css");
                _MUI.append(b, _MUI.GT(document, "head")[0])
            }
            if (b.styleSheet) b.styleSheet.cssText = a;
            else {
                e = document.createTextNode(a);
                _MUI.append(e, b)
            }
        },
        text: function a(b) {
            var e = [];
            b = b.childNodes;
            for (var c = 0,
            f = b.length; c < f; c++) e.push(b[c].nodeType != 1 ? b[c].nodeValue: a(b[c]));
            return e.join("")
        },
        parent: function(a, b) {
            if (_MUI.isArray(a)) {
                var e = [];
                _MUI.each(a,
                function(c) {
                    if (b && _MUI.hasClass(c.parentNode, b) || !b) e.push(c.parentNode)
                });
                return e
            }
            return a.parentNode
        },
        parents: function(a, b) {
            if (b) {
                var e = [],
                c = _MUI.parents(a);
                _MUI.each(c,
                function(f) {
                    _MUI.hasClass(f, b) && e.push(f)
                });
                return e
            }
            c = a.parentNode;
            return c.nodeName == "HTML" ? [c] : [c].concat(_MUI.parents(c))
        },
        children: function(a, b) {
            var e = [];
            if (b) b = b.split("|");
            _MUI.each(a.childNodes,
            function(c) {
                var f = false;
                if (b) for (var g = 0,
                i = b.length; g < i; g++) if (_MUI.hasClass(c, b[g])) {
                    f = true;
                    break
                }
                if (_MUI.isElement(c) && (!b || f)) e.push(c)
            });
            return e
        },
        A: function(a, b, e) {
            if (e == undefined) return a.getAttribute(b);
            else e == "" ? a.removeAttribute(b) : a.setAttribute(b, e)
        },
        C: function(a, b, e) {
            if (e == undefined) if (window.getComputedStyle) {
                b = b.replace(/([A-Z])/g, "-$1");
                b = b.toLowerCase();
                return window.getComputedStyle(a, null).getPropertyValue(b)
            } else {
                if (a.currentStyle) {
                    if (b == "opacity") return a.style.filter.indexOf("opacity=") >= 0 ? parseFloat(a.style.filter.match(/opacity=([^)]*)/)[1]) / 100 : "1";
                    return a.currentStyle[b]
                }
            } else if (b == "opacity" && _MUI.B.ie) a.style.filter = (a.filter || "").replace(/alpha\([^)]*\)/, "") + "alpha(opacity=" + e * 100 + ")";
            else a.style[b] = e
        },
        DC: function(a) {
            return document.createElement(a)
        },
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
        EA: function(a, b, e, c) {
            if (_MUI.isString(a)) {
                var f = e;
                e = function() {
                    eval(f)
                }
            }
            if (a.addEventListener) {
                if (b == "mousewheel") b = "DOMMouseScroll";
                a.addEventListener(b, e, c);
                return true
            } else return a.attachEvent ? a.attachEvent("on" + b, e) : false
        },
        ER: function(a, b, e) {
            if (a.removeEventListener) {
                a.removeEventListener(b, e, false);
                return true
            } else return a.detachEvent ? a.detachEvent("on" + b, e) : false
        },
        G: function(a) {
            return document.getElementById(a)
        },
        GT: function(a, b) {
            return a.getElementsByTagName(b)
        },
        GC: function() {
            function a(j, p) {
                if (!p) {
                    p = j;
                    j = document
                }
                j = j || document;
                if (!/^[\w\-_#]+$/.test(p) && j.querySelectorAll) return b(j.querySelectorAll(p));
                if (p.indexOf(",") > -1) {
                    for (var m = p.split(/,/g), l = [], n = 0, o = m.length; n < o; ++n) l = l.concat(a(j, m[n]));
                    return k(l)
                }
                m = p.match(c);
                o = m.pop();
                l = (o.match(g) || h)[1];
                var q = !l && (o.match(f) || h)[1];
                n = o.split(".").slice(2);
                o = !l && (o.match(i) || h)[1];
                if (q && !o && j.getElementsByClassName) o = b(j.getElementsByClassName(q));
                else {
                    o = !l && b(j.getElementsByTagName(o || "*"));
                    if (q) {
                        q = RegExp("(^|\\s)" + q + "(\\s|$)");
                        var r = -1,
                        s, u = -1,
                        t = [];
                        for (n = n || ""; s = o[++r];) if (q.test(s.className) && s.className.hasString(n)) t[++u] = s;
                        o = t
                    }
                    if (l) return (m = j.getElementById(l)) ? [m] : []
                }
                return m[0] && o[0] ? e(m, o) : o
            }
            function b(j) {
                try {
                    return Array.prototype.slice.call(j)
                } catch(p) {
                    for (var m = [], l = 0, n = j.length; l < n; ++l) m[l] = j[l];
                    return m
                }
            }
            function e(j, p, m) {
                var l = j.pop();
                if (l === ">") return e(j, p, true);
                var n = [],
                o = -1,
                q = (l.match(g) || h)[1],
                r = !q && (l.match(f) || h)[1];
                l = !q && (l.match(i) || h)[1];
                var s = -1,
                u, t, v;
                for (l = l && l.toLowerCase(); u = p[++s];) {
                    t = u.parentNode;
                    do {
                        v = (v = (v = !l || l === "*" || l === t.nodeName.toLowerCase()) && (!q || t.id === q)) && (!r || RegExp("(^|\\s)" + r + "(\\s|$)").test(t.className));
                        if (m || v) break
                    } while ( t = t . parentNode );
                    if (v) n[++o] = u
                }
                return j[0] && n[0] ? e(j, n) : n
            }
            var c = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
            f = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
            g = /^(?:[\w\-_]+)?#([\w\-_]+)/,
            i = /^([\w\*\-_]+)/,
            h = [null, null],
            k = function() {
                var j = +new Date,
                p = function() {
                    var m = 1;
                    return function(l) {
                        var n = l[j],
                        o = m++;
                        if (!n) {
                            l[j] = o;
                            return true
                        }
                        return false
                    }
                } ();
                return function(m) {
                    for (var l = m.length,
                    n = [], o = -1, q = 0, r; q < l; ++q) {
                        r = m[q];
                        if (p(r)) n[++o] = r
                    }
                    j += 1;
                    return n
                }
            } ();
            return a
        } (),
        isDate: function(a) {
            return this.getType(a) == "Date"
        },
        cloneDate: function(a) {
            if (!a) return a;
            d = new Date;
            d.setTime(a.getTime());
            return d
        },
        formatDate: function(a, b) {
            for (var e = b.replace(/\W/g, ",").split(","), c = ["yyyy", "MM", "dd", "hh", "mm", "ss", "ww"], f = {
                y: a.getFullYear(),
                M: a.getMonth() + 1,
                d: a.getDate(),
                h: a.getHours(),
                m: a.getMinutes(),
                s: a.getSeconds(),
                w: a.getDay()
            },
            g = 0, i = e.length; g < i; g++) for (var h = e[g], k = 0; k < 7; k++) {
                var j = c[k].slice( - 1);
                if (h.hasString(j)) {
                    if (j == "w" && f[j] == 0) f[j] = 7;
                    b = h.hasString(c[k]) ? b.replace(RegExp(c[k], "g"), this.addZero(f[j])) : b.replace(RegExp(c[k].slice(c[k].length / 2), "g"), f[j])
                }
            }
            return b
        },
        parseDate: function(a, b) {
            b || (b = "yyyy-MM-dd");
            b = b.replace(/\W/g, ",").split(",");
            a = a.replace(/\D/g, ",").split(",");
            var e = 2E3,
            c = 0,
            f = 1,
            g = 0,
            i = 0,
            h = 0;
            _MUI.each(b,
            function(k, j) {
                if (a[j] != "" && !isNaN(a[j])) {
                    if (k.hasString("y")) e = Number(a[j]);
                    if (k.hasString("M")) c = Number(a[j]) - 1;
                    if (k.hasString("d")) f = Number(a[j]);
                    if (k.hasString("h")) g = Number(a[j]);
                    if (k.hasString("m")) i = Number(a[j]);
                    if (k.hasString("s")) h = Number(a[j]);
                    if (k.hasString("w")) h = Number(a[j])
                }
            });
            return new Date(e, c, f, g, i, h)
        },
        isObject: function(a) {
            return typeof a == "object"
        },
        isElement: function(a) {
            return a && a.nodeType == 1
        },
        isUndefined: function(a) {
            return typeof a == "undefined"
        },
        isFunction: function(a) {
            return this.getType(a) == "Function"
        },
        isNumber: function(a) {
            return this.getType(a) == "Number"
        },
        isString: function(a) {
            return this.getType(a) == "String"
        },
        isArray: function(a) {
            return this.getType(a) == "Array"
        },
        getType: function(a) {
            return Object.prototype.toString.call(a).slice(8, -1)
        },
        addZero: function(a, b) {
            b || (b = 2);
            return Array(Math.abs(("" + a).length - (b + 1))).join(0) + a
        },
        trim: function(a) {
            return a.replace(/^\s+|\s+$/g, "")
        },
        random: function(a, b) {
            if (a == undefined) a = 0;
            if (b == undefined) b = 9;
            return Math.floor(Math.random() * (b - a + 1) + a)
        },
        has: function(a, b) {
            for (var e = 0,
            c = a.length; e < c; e++) if (a[e] == b) return true;
            return false
        },
        each: function(a, b) {
            if (_MUI.isUndefined(a[0])) for (var e in a) _MUI.isFunction(a[e]) || b(e, a[e]);
            else {
                e = 0;
                for (var c = a.length; e < c; e++) _MUI.isFunction(a[e]) || b(a[e], e)
            }
        },
        merge: function(a, b) {
            var e = [];
            if (b) {
                _MUI.each(b,
                function(c) {
                    _MUI.has(a, c) || e.push(c)
                });
                return a.concat(e)
            } else {
                _MUI.each(a,
                function(c) {
                    _MUI.has(e, c) || e.push(c)
                });
                return e
            }
        },
        ready: function(a) {
            if (_MUI.ready.done) return a();
            if (_MUI.isReady.done) _MUI.readyDo.push(a);
            else {
                _MUI.readyDo = [a];
                _MUI.isReady()
            }
        },
        readyDo: [],
        isReady: function() {
            if (!_MUI.isReady.done) {
                _MUI.isReady.done = true;
                if (document.readyState == "complete") _MUI.onReady();
                else if (document.addEventListener) document.addEventListener("DOMContentLoaded",
                function() {
                    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                    _MUI.onReady()
                },
                false);
                else if (document.attachEvent) {
                    var a = top != self;
                    if (a) document.attachEvent("onreadystatechange",
                    function() {
                        if (document.readyState === "complete") {
                            document.detachEvent("onreadystatechange", arguments.callee);
                            _MUI.onReady()
                        }
                    });
                    else document.documentElement.doScroll && !a &&
                    function() {
                        if (!_MUI.ready.done) {
                            try {
                                document.documentElement.doScroll("left")
                            } catch(b) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            _MUI.onReady()
                        }
                    } ()
                }
                _MUI.EA(window, "load", _MUI.onReady)
            }
        },
        onReady: function() {
            if (!_MUI.ready.done) {
                _MUI.ready.done = true;
                for (var a = 0,
                b = _MUI.readyDo.length; a < b; a++) try {
                    _MUI.readyDo[a]()
                } catch(e) {}
                _MUI.readyDo = null
            }
        },
        B: function() {
            var a = {},
            b = navigator.userAgent;
            a.win = b.hasString("Windows") || b.hasString("Win32");
            a.ie6 = b.hasString("MSIE 6") && !b.hasString("MSIE 7") && !b.hasString("MSIE 8");
            a.ie8 = b.hasString("MSIE 8");
            a.ie = b.hasString("MSIE");
            a.opera = window.opera || b.hasString("Opera");
            a.safari = b.hasString("WebKit");
            a.ipad = b.hasString("iPad");
            a.mac = b.hasString("Mac");
            a.firefox = b.hasString("Firefox");
            return a
        } ()
    };
    _MUI.B.ie && document.execCommand("BackgroundImageCache", false, true)
})();
try {
    document.domain = "qq.com"
} catch(e$$17) {}
_$ = _MUI.G;
_$$ = _MUI.GC;
var _MI = _MI || {};
_MI = {
    app: {
        talkbox: "http://mat1.gtimg.com/www/mb/js/portal/mi.TalkBox_110224.js"
    },
    time: null,
    string: {
        length: function(a) {
            var b = a.match(/[^\x00-\x80]/g);
            return a.length + (b ? b.length: 0)
        },
        escape: function(a) {
            return _MI.string.html(a).replace(/'/g, "\\'")
        },
        escapeReg: function(a) {
            for (var b = [], e = 0; e < a.length; e++) {
                var c = a.charAt(e);
                switch (c) {
                case ".":
                    b.push("\\x2E");
                    break;
                case "_$":
                    b.push("\\x24");
                    break;
                case "^":
                    b.push("\\x5E");
                    break;
                case "{":
                    b.push("\\x7B");
                    break;
                case "[":
                    b.push("\\x5B");
                    break;
                case "(":
                    b.push("\\x28");
                    break;
                case "|":
                    b.push("\\x28");
                    break;
                case ")":
                    b.push("\\x29");
                    break;
                case "*":
                    b.push("\\x2A");
                    break;
                case "+":
                    b.push("\\x2B");
                    break;
                case "?":
                    b.push("\\x3F");
                    break;
                case "\\":
                    b.push("\\x5C");
                    break;
                default:
                    b.push(c)
                }
            }
            return b.join("")
        },
        html: function(a) {
            return a.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        },
        cut: function(a, b, e) {
            e = _MUI.isUndefined(e) ? "...": e;
            var c = [],
            f = "";
            if (_MI.string.length(a) > b) {
                a = a.split("");
                f = 0;
                for (var g = a.length; f < g; f++) if (b > 0) {
                    c.push(a[f]);
                    b -= _MI.string.length(a[f])
                } else break;
                f = c.join("") + e
            } else f = a;
            return f
        },
        id: function(a) {
            return a.match(/[^\/]+_$/g)[0].replace("#M", "")
        },
        account: function(a) {
            return a.match(/@[^@]+_$/g)[0].slice(1, -1)
        }
    },
    number: {
        format: function(a) {
            return (a + "").replace(/(?=(?!\b)(?:\w{3})+_$)/g, ",")
        }
    },
    random: function(a) {
        return parseInt((new Date).getTime() / (a || 1))
    },
    json: function(a) {
        var b = {};
        try {
            b = eval("(" + a + ")")
        } catch(e) {}
        return b
    },
    tmpl: {
        reply: '<div class="zfWrap"><div class="SA"><em>◆</em><span>◆</span></div><div class="top"><span class="left"><span class="replyTitle"></span>　<span class="addReply"></span></span><a href="#" class="close" title="关闭">关闭</a></div><iframe class="comts" src="about:blank" frameborder="0" scrolling="no" style="height:0"></iframe><div class="cont"><textarea class="inputTxt"></textarea></div><div class="bot"><div class="left" style="margin-right:1ex"><span class="number cNote"></span></div><div class="left"></div><input type="button" class="inputBtn sendBtn" value="" /><span class="countTxt"></span><a href="#" class="ico_face" title="表情"></a></div><div class="talkSuc" style="display:none"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg"></span></div></div>'
    },
    selectTxt: function(a, b, e) {
        if (document.createRange) a.setSelectionRange(b, e);
        else {
            a = a.createTextRange();
            a.collapse(1);
            a.moveStart("character", b);
            a.moveEnd("character", e - b);
            a.select()
        }
    },
    insertTxt: function(a, b, e, c) {
        if (c == undefined) c = 0;
        a.focus();
        if (document.selection) {
            a = document.selection.createRange();
            a.moveStart("character", -c);
            a.text = b
        } else {
            var f = a.value,
            g = e + b.length - c;
            a.value = f.substring(0, e - c) + b + f.substring(e, f.length);
            _MI.selectTxt(a, g, g, g)
        }
    },
    countNum: function(a, b, e) {
        if (! (!a || a.innerHTML.hasString("超过"))) {
            var c = a.innerHTML.replace(/\D/g, "") || 0;
            c = e ? MI.number.format(parseInt(c.replace(/,/g, "")) + b) : parseInt(c) + b;
            a.innerHTML = c < 0 ? 0 : c
        }
    },
    fC: {
        numFormat: [],
        num: []
    },
    follow: function(a, b, e, c) {
        function f() {
            var h = MI.Login.getUin();
            if (h && MI.S("account_mbid_" + h)) if (!b.sending) {
                var k = -1;
                h = b.className;
                var j = _$("followedNum_" + a),
                p = _$("followNum_" + a),
                m = h != "addAttention" && h != "delAttention";
                if (h == "addAttention" || m) {
                    k = 1;
                    h = "http://radio.t.qq.com/mini/follow.php"
                } else h = "http://radio.t.qq.com/mini/unfollow.php";
                b.sending = 1;
                var l = "u=" + a + "&" + _MI.AcInfo() + "&r=" + _MI.random();
                _MUI.ajax({
                    url: h,
                    type: "post",
                    data: l,
                    crossDomain: true,
                    success: function(n) {
                        n = _MI.json(n);
                        b.sending = 0;
                        if (n.result == 0) {
                            if (!m) b.className = k == 1 ? "delAttention": "addAttention";
                            j && _MI.countNum(j, k);
                            p && _MI.countNum(p, k);
                            for (var o = 0,
                            q = _MI.fC.numFormat.length; o < q; o++) _MI.countNum(_MI.fC.numFormat[o], k, 1);
                            o = 0;
                            for (q = _MI.fC.num.length; o < q; o++) _MUI.A(_MI.fC.num[o], "rel") == a && _MI.countNum(_MI.fC.num[o], k);
                            e && e(k, n)
                        } else n.result == -100 && _MI.code.show({
                            msg: n.msg,
                            code: n.info,
                            call: function() {
                                _MI.follow(a, b, e, c)
                            }
                        })
                    }
                })
            }
        }
        if (!_MI.fC.init) {
            _MI.fC.numFormat = _$$(".followNumFormat");
            _MI.fC.num = _$$(".followNum");
            _MI.fC.init = 1
        }
        if (MI.Login) {
            MI.Login.setCallback("follow_send", f);
            MI.AccountInfo.setCallback("follow_send", f);
            var g = MI.Login.getUin(),
            i = MI.S("account_mbid_" + g);
            if (!g || !i) {
                c = c || "qq.com";
                MI.Login.popup.src = g ? "http://mini.t.qq.com/invite/quick.php?pref=" + c: "http://mini.t.qq.com/mblogin_quick.htm?pref=" + c;
                MI.Login.showPopup("follow_send", b);
                _MI.Bos("btnAddAttentionNotLogin", _MI.Host());
                return false
            } else f()
        } else {
            window.open("http://t.qq.com");
            _MI.Bos("btnAddAttentionNotLogin", _MI.Host())
        }
    }
};
_MI.Bos = function(a, b, e) {
    var c, f = {
        iFlow: 0,
        iFrom: "",
        iPubFrom: "",
        sUrl: "",
        iUrlType: "",
        iPos: "",
        sText: "",
        iBak1: "",
        iBak2: "",
        sBak1: "",
        sBak2: ""
    },
    g = 302;
    if (_MUI.isObject(a)) {
        c = 1;
        a.iUrlType = MI.boss || "";
        a.sUrl = document.location.host + document.location.pathname;
        for (var i in f) _MUI.isUndefined(a[i]) || (f[i] = a[i]);
        random = a.random;
        g = a.id;
        a = a.name
    }
    if (a.hasString("http")) _MI.Bos.pic[_MUI.random(0, 99)].src = a;
    else try {
        var h = _MI.Uin(),
        k = "";
        e = e ? e: "";
        if (c) for (i in f) k += "&" + i + "=" + f[i];
        else {
            b = b || _MI.boss;
            if (_MUI.isNumber(b)) k = "&sServerIp=&iBackInt1=" + b + "&iBackInt2=&sBackStr1=";
            else if (_MUI.isString(b)) k = "&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=" + b;
            k = k + "&iFlow=0&Fsite=" + _MI.Article.site + "&Ftype=" + e
        }
        _MI.Bos.pic[_MUI.random(0, 99)].src = "http://btrace.qq.com/collect?sIp=&iQQ=" + h + "&sBiz=microblog&sOp=" + a + "&iSta=0&iTy=" + g + k
    } catch(j) {}
};
_MI.Bos.pic = []; (function() {
    for (var a = 0; a < 100; ++a) _MI.Bos.pic.push(new Image)
})();
_MI.feedBack = function(a, b) {
    function e(m) {
        var l = [];
        l = m.split(",");
        return l.length
    }
    function c(m, l) {
        for (var n in m) if (typeof m[n] == "object") {
            l[n] = {};
            c(m[n], l[n])
        } else l[n] = m[n]
    }
    if (a.sBak1) a.iFlow = e(a.sBak1);
    else if (a.sBak2) a.iFlow = e(a.sBak2);
    var f;
    f = b ? b: (new Date).getTime();
    if (a.iFlow > 20) {
        a.iBak2 = f;
        var g = [],
        i = [],
        h,
        k;
        h = {};
        k = {};
        c(a, h);
        c(a, k);
        var j = "";
        if (a.sBak1) j = a.sBak1;
        else if (a.sBak2) j = a.sBak2;
        var p = [];
        p = j.split(",");
        for (j = 0; j < 20; j++) g.push(p[j]);
        for (j = 20; j < a.iFlow; j++) i.push(p[j]);
        if (a.sBak1) {
            h.sBak1 = g.join(",");
            k.sBak1 = i.join(",")
        } else if (a.sBak2) {
            h.sBak2 = g.join(",");
            k.sBak2 = i.join(",")
        }
        h.iFlow = 20;
        k.iFlow = a.iFlow - 20;
        MI.Bos(h);
        _MI.feedBack(k, f)
    } else _MI.Bos(a)
};
_MI.Host = function() {
    return window.location.host
};
_MI.Uin = function() {
    var a = "";
    try {
        a = _MUI.trim(_MUI.cookie("luin") || _MUI.cookie("uin"))
    } catch(b) {}
    return Number(a.replace(/o/g, ""))
};
_MI.ClientUin = _MI.ClientKey = "";
_MI.AcInfo = function() {
    return "uin=" + MI.Login.getUin() + "&clientuin=" + _MI.ClientUin + "&clientkey=" + _MI.ClientKey
};
MIIco = ["auth", "expo", "star"];
MIIcoHtml = ['<a href="http://t.qq.com/certification" target="_blank" class="vip" bossZone="followallrz" title="腾讯认证"></a>', '<a href="http://blog.qq.com/zt/2010/2010expo/shibovol.htm" title="2010上海世博志愿者" target="_blank" class="ico_expo"></a>', '<a href="http://ent.qq.com/zt2010/star2010/fans.htm" class="ico_star" title="星光达人" target="_blank"></a>'];
function MIIcon(a) {
    return "<%for(var k=0,num=MIIco.length;k<num;k++){if(" + a + "[MIIco[k]]){%><%=MIIcoHtml[k]%><%;break;}}%>"
} (function() {
    _MI.tmpl.sCard = '<div class="mbSourceCardInfo" style="display:none"><div class="arrowBox"><div calss="arrow"></div></div><div class="mbloading"></div></div>';
    _MI.tmpl.userInfo = '<div class="mbCardUserDetail">\t\t<div class="userPic"><a title="<%=info.nick%>(@<%=info.name%>)" href="http://t.qq.com/<%=info.name%>?pref=<%=info.pref%>tx2" bossZone="followalltx2" rel="<%=info.nick%>(@<%=info.name%>)" target="_blank"><%if(info.head){%><img src="<%=info.head%>/50" /><%}else{%><img src="http://mat1.gtimg.com/www/mb/images/head_50.jpg" /><%}%></a></div>\t\t<div class="userInfo">\t\t\t<div class="nick"><a title="<%=info.nick%>(@<%=info.name%>)" href="http://t.qq.com/<%=info.name%>?pref=<%=info.pref%>name" bossZone="followallname" target="_blank"><span><%=info.nick%></span></a>' + MIIcon("info.flag") + '</div>\t\t\t<div class="follower"><%if(info.num[1] > 0){%><a title="听众：<%=info.num[1]%>人" href="http://t.qq.com/<%=info.name%>/follower?pref=<%=info.pref%>tz" bossZone="followalltz" target="_blank"><span>听众：</span><span><%=info.num[1]%>人</span></a><%}else{%>&nbsp;<%}%></div>\t\t\t<div class="attentBoxWrap" follow="<%=info.follow%>" uid="<%=info.name%>"><a href="javascript:;" class="addAttention" title="立即收听" style="display: none;" bossZone="followallst"><span>+收听</span></a><a href="#"class="delAttention" title="已收听" style="display: none;"><span>已收听</span></a></div>\t\t</div>\t\t<%if(info.msgInfo){%>\t\t<div class="userNew">\t\t\t<div class="titleBox"><span>最新消息</span> <span class="timer" title="<%=info.uTime%>" rel="<%=info.msgTime%>"><%=info.uTime%></span></div>\t\t\t<div class="news"><%=info.msgInfo%><a target="_blank" href="http://t.qq.com/<%=info.name%>?pref=<%=info.pref%>more" bossZone="followallmore">更多</a></div>\t\t</div>\t\t<%}%>\t</div>';
    _MI.tmpl.shareArticlePic = '<div class="mbArticleSharePic"><div class="mbArticleShareBtn"><span>转播到腾讯微博</span></div></div>'
})();
_MI.Article = typeof ARTICLE_INFO != "undefined" ? ARTICLE_INFO: {
    site: "qqcom"
};
_MI.Time = typeof _SERVER_TIME_FULL_ != "undefined" ? _SERVER_TIME_FULL_: "";
_MI.ServerTime = _MI.Time ? (new Date(_MI.Time[0], _MI.Time[1], _MI.Time[2], _MI.Time[3], _MI.Time[4])).getTime() : (new Date).getTime();
_MI.updateTime = function(a) {
    var b;
    b = _MI.ServerTime / 1E3;
    var e = new Date,
    c = parseInt(_MUI.A(a, "rel")) / 1E3,
    f = new Date,
    g = b - c,
    i = parseInt(g / 60);
    parseInt(g / 3600);
    g = parseInt(g / 86400);
    var h = a.title.split(" ")[1];
    e.setTime(b + "000");
    f.setTime(c + "000");
    if (b = i == 0 ? "刚刚": i < 60 ? i + "分钟前": i > 59 && g == 0 ? (e.getDate() == f.getDate() ? "今天": "昨天") + " " + h: g == 1 && e.getDate() - f.getDate() < 2 ? "昨天 " + h: e.getFullYear() == f.getFullYear() ? a.title.split("年")[1] : a.title) a.innerHTML = b
};
_MI.WebSCard = {
    boss: null,
    callback: null,
    hoverTime: null,
    last: null,
    tmpl: _MI.tmpl.sCard,
    tmplInfo: _MI.tmpl.userInfo,
    pref: "",
    build: function(a, b, e) {
        var c = this;
        a = _$(a);
        c.pref = b ? b: "qqcom"; (a = _$$(a, e ? e: ".mbSourceCard")) && a.length && _MUI.each(a,
        function(f) {
            if (_MUI.A(f, "rel")) {
                f.onmouseover = function() {
                    c.show(f, b);
                    _MUI.addClass(f.parentNode, "hover")
                };
                f.onmouseout = function() {
                    c.hide(f);
                    _MUI.removeClass(f.parentNode, "hover")
                }
            }
        })
    },
    show: function(a, b) {
        var e = this,
        c = _$$(a.parentNode, ".mbSourceCardInfo")[0];
        if (!c) {
            e.buildCard(a, b);
            c = _$$(a.parentNode, ".mbSourceCardInfo")[0]
        }
        clearTimeout(e.hoverTime);
        e.hoverTime = setTimeout(function() {
            _MUI.show(c);
            e.last && e.last != c && _MUI.hide(e.last);
            e.last = c
        },
        100)
    },
    hide: function(a) {
        var b = _$$(a.parentNode, ".mbSourceCardInfo")[0];
        clearTimeout(this.hoverTime);
        this.hoverTime = setTimeout(function() {
            _MUI.hide(b)
        },
        50)
    },
    buildCard: function(a, b) {
        var e = this,
        c = _MUI.A(a, "rel");
        _MUI.A(a, "reltitle");
        var f = _MUI.A(a, "loaded"),
        g = _MUI.html(e.tmpl)[0];
        _MUI.after(g, a);
        var i = _$$(a.parentNode, ".mbSourceCardInfo")[0],
        h = _$$(i, ".mbCardUserDetail")[0],
        k = _$$(i, ".mbloading")[0];
        g = _$$(i, ".mbCardUserErr")[0];
        _MUI.show(i);
        g && _MUI.hide(g);
        i.onmouseover = function() {
            e.show(a);
            _MUI.addClass(this.parentNode, "hover")
        };
        i.onmouseout = function() {
            e.hide(a);
            _MUI.removeClass(this.parentNode, "hover")
        };
        if (!f) {
            _MUI.show(k);
            f = "userCard" + Math.floor(Math.random() * 1E4);
            _MUI.crossAsynJson("http://radio.t.qq.com/mini/userCard.php?&u=" + c + "&callback=" + f + "&r=" + _MI.random(), f,
            function(j) {
                k && _MUI.hide(k);
                if (b) j.info.pref = b;
                var p = document.createDocumentFragment();
                if (j.result == 0) {
                    _MUI.A(a, "loaded", "1");
                    j = _MUI.html((new _MUI.tmplString(e.tmplInfo))(j));
                    _MUI.each(j,
                    function(m) {
                        _MUI.append(m, p)
                    });
                    h ? _MUI.replace(p, h) : _MUI.append(p, i);
                    e.addEvent(i); (j = _$$(h, ".userNew")[0]) && _MI.updateTime(_$$(j, ".timer")[0]);
                    _MUI.hasClass(i.parentNode, "hover") || _MUI.hide(i)
                } else e.errEvent(a)
            },
            function() {
                e.errEvent(a);
                _MI.Bos("btnUserCardLoadFail")
            },
            5E3)
        }
    },
    errEvent: function(a) {
        var b = _MUI.A(a, "rel"),
        e = _MUI.A(a, "reltitle");
        a = _$$(a.parentNode, ".mbSourceCardInfo")[0];
        var c = _$$(a, ".mbCardUserDetail")[0],
        f = _$$(a, ".mbloading")[0],
        g = document.createDocumentFragment();
        b = _MUI.html('<div class="mbCardUserErr"><table><tr><td><span class="mbIcon_a"></span><a href="http://t.qq.com/' + b + '" target="_blank">点击访问' + (e ? e + "的微博": "腾讯微博") + '</a><span class="mbIcon_b"></span></td></tr></table></div>');
        _MUI.each(b,
        function(i) {
            _MUI.append(i, g)
        });
        f && _MUI.hide(f);
        c ? _MUI.replace(g, c) : _MUI.append(g, a)
    },
    addEvent: function(a) {
        a = _$$(a, ".attentBoxWrap");
        var b, e = this;
        a && a.length && _MUI.each(a,
        function(c) {
            uid = _MUI.A(c, "uid");
            b = _MUI.A(c, "follow");
            add = _$$(c, ".addAttention")[0];
            del = _$$(c, ".delAttention")[0];
            b == 1 ? _MUI.show(del) : _MUI.show(add);
            add.onclick = function() {
                registerZone2({
                    bossZone: "followallst",
                    url: ""
                },
                1);
                var f = this;
                _MI.follow(uid, f,
                function() {
                    _MUI.hide(f);
                    _MUI.show(_MUI.next(f));
                    f.className = "addAttention";
                    _MI.feedBack({
                        name: "portal",
                        iPos: 30,
                        iBak1: 3,
                        sBak2: uid + ":" + _MI.Article.site,
                        id: 1191
                    })
                },
                e.pref);
                return false
            };
            del.onclick = function() {
                return false
            }
        })
    }
};
_MI.ArticleInfo = function() {
	var a = {},
    b = document.title;
    b = b.indexOf("#") > 0 ? encodeURI(b.substr(0, document.title.indexOf("#")).replace(/\_[\u4E00-\u9FA5]+\_腾讯网/g, "")) : encodeURI(b.replace(/\_[\u4E00-\u9FA5]+\_腾讯网/g, ""));
    a.title = b;
    a.source = 1000001;
    a.site = encodeURI("http://www.qq.com");
    b = window.location.href;
    b = b.indexOf("#") > 0 ? encodeURI(b.substr(0, b.indexOf("#"))) : encodeURI(b);
    a.url = b;
    return a
};
_MI.ShareArticlePic = {
    boss: null,
    callback: null,
    tmpl: _MI.tmpl.shareArticlePic,
    build: function(a, b) {
        if (typeof GroupjsUrl == "undefined") {
            this._body = _MUI.isString(a) ? _$(a) : a;
            this._pic = _$$(this._body, "img");
            this._pref = b ? b: "qqcom";
            this.addEvent()
        }
    },
    addEvent: function() {
        var a = this,
        b;
        setTimeout(function() {
            _MUI.each(a._pic, function(e) {
                var c = _MUI.width(e),
                f = _MUI.height(e),
                g;
                if (c > 150 && f > 150) {
                    f = e.parentNode.tagName.toLocaleLowerCase() == "a" ? e.parentNode: e;
                    g = _MUI.html(a.tmpl)[0];
                    _MUI.append(f.cloneNode(true), g);
                    _MUI.replace(g, f);
                    b = _$$(g, ".mbArticleShareBtn")[0];
					g.style.cssText += "width:" + c + "px;";

                    g.onmouseover = function() {
                        _MUI.addClass(g, "hover");
                    };
                    g.onmouseout = function() {
                        _MUI.removeClass(g, "hover")
                    };
                    b.onclick = function(i) {
                        _MUI.E(i).stop();
                        _MI.Share.pop({
                            pic: e.src,
                            pref: a._pref
                        });
                        _MI.Bos("btnPicShareBtnClick", "", a._pref);
                        return false
                    }
                }
            })
        },
        100)
    }
};
_MI.ShareArticle = {
    boss: null,
    callback: null,
    build: function(a, b) {
        this._body = _MUI.isString(a) ? _$(a) : a;
        this.addEvent(b)
    },
    addEvent: function(a) {
        var b = this;
        if (b._body) {
            a = a ? a: "qqcom";
            b._body.onclick = function() {
                _MI.Share.pop({
                    pref: a,
                    target: this,
                    pic: b.getPicUrl("Cnt-Main-Article-QQ")
                });
                return false
            }
        }
    },
    getPicUrl: function(a) {
        a = _$$(document.getElementById(a), "img");
        var b, e = "";
        for (b in a) {
            var c = a[b],
            f = _MUI.width(c),
            g = _MUI.height(c);
            if (f > 100 || g > 100) {
                e = c.src;
                break
            }
        }
        return e
    }
};
_MI.Share = {
    popup: null,
    url: "http://radio.t.qq.com/share.php",
    article: {
        url: "",
        pic: "",
        pref: "",
        pos: ""
    },
    pubUrl: "",
    pop: function(a) {
        var b = _MI.ArticleInfo();
        a = a ? a: {};
        var e = "";
        if (typeof g_official_account != "undefined") e = "&source=" + g_official_account;
        this.pubUrl = this.url + "?title=" + (a.txt ? encodeURI(a.txt) : b.title) + (a.surl ? "&surl=" + a.surl: "&url=" + b.url) + (a.pic ? "&pic=" + a.pic: "") + "&pref=" + (a.pref ? a.pref: "qqcom") + e;
        this.article.pic = a.pic;
        this.article.pref = a.pref;
        this.article.pos = a.target;
        if (!this.popup) this.popup = new MI.Popup({
            title: "转播到腾讯微博",
            titleCls: "mblogo",
            width: 600,
            height: 200
        });
        this.popwin();
        this.popup.src = this.pubUrl
    },
    popwin: function() {
        var a = MI.Login.getUin(),
        b = MI.S("account_mbid_" + a);
        if (!a || !b) {
            MI.Login.setCallback("publish_login", UI.bind(this.show, this));
            MI.AccountInfo.setCallback("publish_login", UI.bind(this.show, this));
            b = this.article.pref || "qq.com";
            MI.Login.popup.src = a ? "http://mini.t.qq.com/invite/quick.php?pref=" + b: "http://mini.t.qq.com/mblogin_quick.htm?pref=" + b;
            MI.Login.showPopup("publish_login", this.article.pos)
        } else this.show()
    },
    show: function() {
        var a = MI.Login.getUin();
        a && MI.S("account_mbid_" + a) && this.popup.showPopup()
    },
    hide: function() {
        this.popup.hidePopup()
    },
    close: function() {
        this.popup.closePopup()
    },
    publish: function() {
        var a = this;
        setTimeout(function() {
            var b = MI.Login.getUin(),
            e = MI.S("account_mbid_" + b);
            if (b && e) a.show();
            else if (!e) window.mb_quick_reg_call = a.publish
        },
        300)
    }
};
_MI.Portal = {};
_MI.Follow = function(a, b) {
    this._body = _MUI.isString(a) ? _$(a) : a;
    this._pref = b ? b: "qqcom";
    this.addEvent()
};
_MI.Follow.prototype = {
    boss: null,
    addEvent: function() {
        var a = this,
        b = _$$(a._body, ".attentBoxWrap");
        b && b.length && _MUI.each(b,
        function(e) {
            var c = _MUI.A(e, "uid"),
            f = _MUI.A(e, "follow"),
            g = _$$(e, ".addAttention")[0];
            e = _$$(e, ".delAttention")[0];
            f == 1 ? _MUI.show(e) : _MUI.show(g);
            g.onclick = function() {
                var i = this;
                _MI.follow(c, i,
                function(h, k) {
                    if (k.result == 0) {
                        _MUI.hide(i);
                        _MUI.show(_MUI.next(i));
                        i.className = "addAttention";
                        _MI.Bos("portalAttention", _MI.Host(), a._pref)
                    }
                },
                a.pref);
                _MI.Bos("btnFollowClick", "", a._pref);
                return false
            };
            e.onclick = function() {
                return false
            }
        })
    }
};
_MI.FollowAll = function(a, b, e, c, f) {
    this._body = _MUI.isString(a) ? _$(a) : a;
    this._followBtn = _MUI.isString(b) ? _$(b) : b;
    this._pref = c ? c: "qqcom";
    this._class = e ? e: "";
    this._successCall = f;
    this.addEvent()
};
_MI.FollowAll.prototype = {
    boss: null,
    addEvent: function() {
        var a = this,
        b = _$$(a._body, ".userCheckItem");
        _$$(a._body, ".attentBoxWrap");
        var e = _$$(a._body, ".addAttention");
        _$$(a._body, ".delAttention");
        _MUI.each(e,
        function(c) {
            var f = _MUI.A(c.parentNode, "uid"),
            g = _MUI.A(c, "follow"),
            i = _$$(c.parentNode, ".delAttention")[0];
            g == 1 ? _MUI.show(i) : _MUI.show(c);
            c.onclick = function() {
                var h = this;
                _MI.follow(f, h,
                function(k, j) {
                    if (j.result == 0) {
                        _MUI.hide(h);
                        _MUI.show(_MUI.next(h));
                        h.className = "addAttention";
                        _MI.Bos("portalAttention", _MI.Host(), a._pref + "dg");
                        _MI.feedBack({
                            name: "portal",
                            iPos: 30,
                            iBak1: 3,
                            sBak2: f + ":" + _MI.Article.site,
                            id: 1191
                        })
                    }
                },
                a._pref);
                _MI.Bos("btnFollowClick", _MI.Host(), a._pref + "dg");
                return false
            };
            i.onclick = function() {
                return false
            }
        });
        a._followBtn.onclick = function() {
            var c = this,
            f = [],
            g;
            _MUI.each(b,
            function(k) {
                k.value && k.checked && f.push(k.value)
            });
            if (f.length <= 0) alert("请选择要收听的人");
            else {
                g = _MUI.A(c, "follow");
                var i = "";
                if (f.length > 0) for (var h = 0; h < f.length; ++h) i += f[h] + ":" + _MI.Article.site + ",";
                h = i.length;
                if (i.substring(h - 1, h) == ",") i = i.substring(0, h - 1);
                g || _MI.follow(f, c,
                function(k, j) {
                    if (j.result == 0) {
                        a._successCall && setTimeout(a._successCall, 1E3);
                        _MUI.A(c, "follow", "1");
                        c.innerHTML = "收听成功";
                        _MUI.addClass(c, "followed");
                        _MI.feedBack({
                            name: "portal",
                            iPos: 30,
                            iBak1: 4,
                            sBak2: i,
                            id: 1191
                        })
                    }
                },
                a._pref);
                return false
            }
        }
    }
};
_MI.GetTopicCount = function(a, b) {
    this._body = _MUI.isString(a) ? _$(a) : a;
    this._pref = b ? b: "qqcom";
    this._topic = _MUI.A(this._body, "rel");
    this._count = _$$(this._body, ".topic_num")[0];
    this._topic && this.send();
    _$$(this._body, "a")[0].onclick = function() {
        _MI.Bos("btnTopicCountClick")
    }
};
_MI.GetTopicCount.prototype = {
    url: "http://radio.t.qq.com/friend/topicnum.php",
    send: function() {
        var a = this;
        _MUI.crossAsynJson(a.url + "?t=" + encodeURIComponent(a._topic) + "&callback=topicCallback&r=" + _MI.random(), "topicCallback",
        function(b) {
            if (b) if (Number(b.result) == 0 && Number(b.info) > 0) a._count.innerHTML = Number(b.info)
        })
    }
};
_MI.TalkList = function(a) {
    var b = this;
    b._body = _MUI.isString(a) ? _$(a) : a;
    b._list = _MUI.children(b._body);
    a = (new _MUI.tmplString(_MI.tmpl.reply))({});
    b._talk = b._relay = _MUI.html(a)[0];
    b._relay = _MUI.html(a)[0];
    b.relayBox = new _MI.TalkBox(b._relay);
    b.relayBox.autoHeight = 136;
    b.relayBox.txtTipSend = "转播中";
    b.relayBox._btn.title = "转播";
    b.relayBox.hideCall = function() {
        _MUI.removeClass(_$(b.cur), "cur")
    };
    b.relayBox.start = function() {
        b.updateRelayNum();
        b.talkBox._txt.blur();
        b.focus()
    };
    b.relayBox.success = function() {
        b.talkBox.hide();
        b.talkBox.display = 0;
        _MUI.removeClass(_$(b.cur), "hover");
        if (b._relayNum) {
            _MI.countNum(b._relayNum, 1);
            b._relayNum.innerHTML = b._relayNum.innerHTML;
            _MUI.addClass(b._relayNum.parentNode, "zfNumShow");
            b._relayNum = null
        }
    };
    b.relayBox._numSon = _$$(b.relayBox._body, ".number")[0];
    _MUI.EA(b.relayBox._close, "click",
    function() {
        b.replyHide()
    });
    setTimeout(function() {
        for (var h = 0,
        k = b._list.length; h < k; h++) b.addEvent(b._list[h])
    },
    0);
    var e = "";
    a = "";
    for (var c = [], f = [], g = 0; g < b._list.length; ++g) {
        var i = _$$(b._list[g], ".userName")[0];
        if (g == b._list.length - 1) {
            e += _MUI.A(i, "rel");
            a += b._list[g].id
        } else {
            e += _MUI.A(i, "rel") + ",";
            a += b._list[g].id + ","
        }
        c.push(_MUI.A(i, "rel"));
        f.push(b._list[g].id)
    }
    for (g = 0; g < c.length; ++g) {
        e = Math.floor(Math.random() * 1E4);
        i = "http://radio.t.qq.com/mini/userCard.php?&u=" + c[g] + "&callback=talbList_wbCount_callback" + e + "&r=" + _MI.random();
        _MUI.crossAsynJson(i, "talbList_wbCount_callback" + e,
        function(h) {
            if (h.result == 0) for (var k = 0; k < c.length; ++k) {
                if (c[k] == h.info.name) {
                    _$$(b._list[k], ".listenNumberDc")[0].innerHTML = "" + h.info.num[1];
                    _$$(b._list[k], ".listenNumberDc")[0].parentNode.parentNode.style.visibility = "visible"
                }
            } else for (h = 0; h < c.length; ++h) _$$(b._list[h], ".listenNumberDc")[0].parentNode.parentNode.style.visibility = "hidden"
        },
        "utf-8")
    }
    e = Math.floor(Math.random() * 1E4);
    _MUI.crossAsynJson("http://radio.t.qq.com/api/message/getRtNum.php?ids=" + a + "&c=reply_listen_count_callback" + e, "reply_listen_count_callback" + e,
    function(h) {
        if (h.result == 0) for (var k = 0; k < f.length; ++k) {
            var j = h.info[f[k]].rt;
            if (j) _$$(b._list[k], ".replayNumberDc")[0].innerHTML = "(" + j + ")"
        } else for (k = 0; k < f.length; ++k) _$$(b._list[k], ".replayNumberDc")[0].innerHTML = ""
    },
    "utf-8")
};
_MI.TalkList.prototype = {
    replyCont: "",
    focus: function() {
        if (!_MUI.hasClass(document.body, "ipad")) {
            var a = _$$(_$(this.cur), ".time"),
            b = a.length;
            if (b) {
                a = a[b - 1];
                if (_MUI.B.ie) a.onfocusout = function() {
                    document.activeElement.nodeName == "BODY" && a.focus()
                };
                a.focus()
            }
        }
    },
    reply: function(a, b, e) {
        var c = this;
        c.talkBox = c.relayBox;
        c._talk = c.talkBox._body;
        c.talkBox.iconPic = c.iconPic;
        _MUI.C(c.talkBox._txt, "height", "");
        _MUI.removeClass(c.talkBox._btn, "disabled");
        _MUI.removeClass(c._talk, "pubSuc");
        if (c.talkBox.display) {
            this.talkBox.hide();
            this.replyHide()
        } else {
            var f = _$(a),
            g = a,
            i = c.cur,
            h = _$$(f, ".zfNum")[0],
            k = _$$(f, ".userName strong a")[0].innerHTML,
            j;
            _$$(f, ".userName .vip");
            _$$(f, ".userName .ico_expo");
            _$$(f, ".userName a");
            _$$(f, ".userName a");
            var p = _$$(f, ".msgCnt")[0].cloneNode(1),
            m,
            l = _$$(f, ".replyBox")[0];
            m = _$$(f, ".replyBox .msgCnt")[0];
            _$$(f, ".userPic");
            var n, o = c.talkBox._txt;
            if (h) g = h.href.match(/[^\/]+_$/g)[0];
            if (b) {
                _MUI.each(_$$(p, "em"),
                function(r) {
                    var s = _MUI.A(r, "rel");
                    if (s) r.innerHTML = s
                });
                _MUI.each(_$$(p, "img"),
                function(r) {
                    var s = r.title;
                    s && _MUI.after(_MUI.html("<b>/" + s + "</b>")[0], r)
                })
            }
            h = _MUI.text(p);
            if (m) {
                m = _MUI.text(m).split(":");
                if (b) {
                    j = k;
                    k = m[0]
                }
                m = m.slice(1).join(":")
            }
            i && _MUI.removeClass(_$(i), "cur");
            _MUI.addClass(f, "cur");
            this._relayNum = b ? _$$(f, ".relayNum")[0] : null;
            i = "转播原文，转播内容会发送给你的听众";
            var q;
            i += "<br>顺便说两句:";
            _$$(this._talk, ".replyTitle")[0].innerHTML = b == 2 ? "点评原文，点评内容不会发送给你的听众": b ? i: "对话是半公开的，不会出现在你听众的主页上，但是可以到你的页面看到<br>对 <b>" + k + "</b> 说:";
            this.talkBox._body.className = b == 2 ? "talkWrap comtWrap": b ? "zfWrap": "talkWrap";
            if (l && j && (b == 1 || b == 2)) {
                this.talkBox._addReply.innerHTML = '<a href="#" title="你可以通过“删除之前的转播理由”来去掉前面人的转播理由">［删除之前的转播理由］</a>';
                n = this.talkBox._addReply.txt = " || @undefined: " + _MUI.trim(h);
                _MUI.show(this.talkBox._addReply);
                if (!_MUI.B.ipad) o.onkeyup = function() {
                    clearTimeout(q);
                    q = setTimeout(function() {
                        if (!o.value.hasString(n)) {
                            _MUI.hide(c.talkBox._addReply);
                            o.onkeyup = null
                        }
                    },
                    400)
                }
            } else {
                _MUI.hide(this.talkBox._addReply);
                o.onkeyup = null
            }
            c.talkBox.talkId = a;
            c.talkBox.type = b ? 1 : 2;
            this.talkBox._txt.value = "";
            this.talkBox.countTxt();
            _MUI.append(this._talk, _$$(f, ".msgBox")[0]);
            setTimeout(function() {
                o.focus();
                if (c.replyCont) o.value += c.replyCont;
                if (n) o.value += n;
                c.talkBox.countTxt()
            },
            0);
            if (b != 0) c.talkBox._numSon.innerHTML = '<a href="/p/t/' + g + "/" + (b == 1 ? "?t=1": "?t=2") + '" onclick="_MI.Bos(\'btn' + (b == 1 ? "Relay": "Comt") + 'View\')" target="_blank">' + (e != 0 && e ? "查看所有 " + e + " 条" + (b == 1 ? "转播": "点评") : "") + "</a>";
            this.cur = a;
            this.talkBox.display = 1
        }
    },
    replyHide: function() {
        _MUI.removeClass(_$(this.cur), "cur");
        _MUI.removeClass(_$(this.cur), "hover");
        if (this.talkBox) this.talkBox.display = 0
    },
    updateRelayNum: function() {
        var a = _$(this.cur),
        b = this.talkBox.type,
        e;
        if (b == 4 || b == 5) e = ".comt";
        else if (b == 1) e = ".relay";
        if (e && a) {
            a = _$$(a, e)[0];
            _MUI.A(a, "num", 1 + parseInt(_MUI.A(a, "num")))
        }
    },
    addEvent: function(a) {
        var b = this;
        _$$(a, ".relay")[0].onclick = function() {
            b.reply(a.id, 1);
            _MI.Bos("btnReply");
            return false
        }
    }
};
_MI.GoTop = {
    _body: null,
    delay: {},
    resize: 0,
    position: function() {
        this.build()
    },
    build: function(a, b) {
        function e(o) {
            l = o && _MUI.E(o).type == "resize" || g.resize;
            clearTimeout(g.delay.position);
            _MUI.B.ie6 && _MUI.hide(g._body);
            g.delay.position = setTimeout(c, _MUI.B.ie6 ? 400 : 0)
        }
        function c() {
            var o = _MUI.pageHeight();
            if (l) {
                j = _MUI.windowHeight();
                h = _MUI.getX(f) + _MUI.width(f) - i;
                g.resize = 0
            }
            m = _MUI.scrollY();
            g._body.style.cssText = "left:" + h + "px;";
            _MUI.show(g._body);
            n = m + j - o;
            if (n >= -k) g._body.style.cssText += ";position:absolute;top:" + (o - 37 - k) + "px"
        }
        var f = _$(a);
        if (f) {
            var g = this,
            i = 5,
            h = _MUI.getX(f) + _MUI.width(f) - i,
            k,
            j = _MUI.windowHeight(),
            p = _MUI.pageHeight(),
            m,
            l,
            n;
            g._body = _$(b);
            if (f) {
                k = p - (_MUI.getY(f) + _MUI.height(f));
                e();
                g._body.onfocus = function() {
                    this.blur()
                };
                _MUI.EA(window, "scroll", e);
                _MUI.EA(window, "resize", e)
            }
        }
    }
};
_MI.TQueue = [];
_MI.TalkBox = function(a) {
    if (this._body = _MUI.isString(a) ? _$(a) : a) {
        var b = this;
        b._txt = b._$("textarea") || b._$(".inputTxt");
        b._tip = b._$(".countTxt");
        b._guide = b._$("h2 em");
        b._tipBig = b._$(".talkSuc");
        b._btn = b._$(".sendBtn");
        b._topic = b._$(".creatNew");
        b._topicNewYear = b._$(".creatNewYear");
        b._face = b._$(".insertFace .txt,a.ico_face");
        b._video = b._$(".uploadVideo");
        b._videoAnchor = _$$(b._video, ".txt")[0];
        b._music = b._$(".uploadMusic");
        b._musicAnchor = _$$(b._music, ".txt")[0];
        b._pic = b._$(".uploadPic");
        b._picForm = b._$(".picForm");
        b._picBtn = b._$(".picForm input");
        b._close = b._$(".close");
        b._num = [_$("talkNum")];
        b._addReply = b._$(".addReply");
        b._addComt = b._$(".addComt");
        b._comts = b._$(".comts");
        if (b._guide) b.guide = b._guide.innerHTML;
        _MUI.ready(function() {
            setTimeout(function() {
                b._txt.blur();
                b.countTxt()
            },
            0);
            var e = function() {
                b.sending || b.countTxt()
            },
            c = function() {
                clearTimeout(b.delay.count);
                b.delay.count = setTimeout(e, 75)
            };
            _MUI.EA(b._txt, "keypress", c);
            _MUI.EA(b._txt, "input", c);
            _MUI.EA(b._txt, "paste", c);
            _MUI.EA(b._txt, "cut", c);
            b._txt.onbeforeeditfocus = c;
            b._body.onkeydown = function(f) {
                if (!b.sending) {
                    f = _MUI.E(f);
                    if (f.ctrl && f.key == 13) {
                        b.sending = 1;
                        c();
                        b.send();
                        _MI.Bos("btnCtrlEnter")
                    } else b._pic && _MI.Capture && _MI.Capture.uploader && f.key == 86 && f.ctrl && _MI.Capture.upload()
                }
            };
            b._body.onkeyup = function() {
                b.sending || c()
            };
            b._txt.onfocus = function() {
                _MUI.addClass(this, "focus");
                this.focused = 1
            };
            b._txt.onblur = function() {
                var f = this;
                clearTimeout(b.delay.blur);
                b.delay.blur = setTimeout(function() {
                    _MUI.removeClass(f, "focus");
                    b.sending || b.countTxt()
                },
                0);
                this.focused = 0
            };
            b._btn.onclick = function() {
                if (!_MUI.hasClass(this, "disabled")) {
                    b.countTxt();
                    b.send();
                    switch (b.type) {
                    case null:
                        _MI.Bos("btnSend");
                        break;
                    case 1:
                        _MI.Bos("btnSendReply");
                        break;
                    case 2:
                        _MI.Bos("btnSendRelay");
                        break;
                    case 3:
                        _MI.Bos("btnSendMsg");
                        break;
                    case 4:
                        _MI.Bos("btnSendRelayList");
                        break;
                    case 5:
                        _MI.Bos("btnSendComt")
                    }
                }
            };
            if (b._close) b._close.onclick = function() {
                _MUI.B.ie && _MUI.C(b._close, "right", "9999px");
                setTimeout(function() {
                    b.hide();
                    _MUI.C(b._close, "right", "")
                },
                0);
                _MI.Bos("btnClose");
                return false
            }
        })
    }
};
_MI.TalkBox.prototype = {
    delay: {},
    delayTime: 1500,
    delayVideo: null,
    delayVideoTime: null,
    url: "http://radio.t.qq.com/friend/publish.php",
    type: null,
    source: 1000001,
    countType: "",
    iconPic: 0,
    pic: "",
    sourcepic: "",
    code: null,
    topic: null,
    talkId: null,
    txtMax: 140,
    txtCache: "",
    txtTopic: "#输入话题标题#",
    txtPic: "#分享照片#",
    txtVideo: "",
    txtMusic: "#分享音乐#",
    txtTip: {
        empty: "请输入内容",
        fail: "发送失败,请重试",
        repeat: "请不要连续发表重复内容"
    },
    txtTipSend: "广播中",
    addList: 0,
    addCheck: null,
    addNum: 1,
    autoHeight: 0,
    tmpl: "",
    countUrl: 1,
    countTxt: function() {
        var a = this,
        b = a._txt.value,
        e, c, f;
        e = b.match(RegExp("((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\_$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*", "gi")) || [];
        var g = 0,
        i = 0;
        a.length = c = _MI.string.length(b);
        if (c < 500) {
            a.countUrl && _MUI.each(e,
            function(h) {
                b = b.replace(h, "_");
                i++;
                f = h.length;
                if (f > 256) g += f - 256
            });
            a.length = c = Math.ceil((_MI.string.length(_MUI.trim(b).replace(RegExp(a.txtTopic, "g"), "")) + i * 20 + g) / 2)
        }
        if (! (!c && a._tip.innerHTML.hasString(a.txtTip.empty))) {
            if (c > this.txtMax) {
                e = '超出<em class="error">';
                a._btn.disable = 1
            } else {
                e = "还能输入<em>";
                a._btn.disable = 0
            }
            if (c == 0) a._btn.disable = 1;
            a.showTip(e + Math.abs(a.txtMax - c) + "</em>字");
            if (a._msgTo && (a._msgTo.value == "" || a._msgTo.error)) a._btn.disable = 1;
            if (c <= a.txtMax && a.type == 1) a._btn.disable = 0;
            if (a.autoHeight) {
                clearTimeout(this.delay.height);
                this.delay.height = setTimeout(function() {
                    _MUI.C(a._txt, "height", "");
                    var h = a._txt.scrollHeight;
                    if (_MUI.B.ie) if (a.autoHeight > 40 && h < 38) h = 37;
                    else if (a.autoHeight <= 40 && h <= 18) h = 16;
                    if (a.autoHeight > 40 && h >= a.autoHeight) h = a.autoHeight;
                    if (h >= 136) {
                        h = 136;
                        _MUI.C(a._txt, "overflowY", "auto")
                    } else _MUI.C(a._txt, "overflowY", "hidden");
                    _MUI.C(a._txt, "height", h + "px");
                    a._txt.nextSibling && _MUI.C(a._txt.nextSibling, "height", h + "px")
                },
                _MUI.B.ipad ? 800 : 100)
            }
            if (a.autoSave && c <= this.txtMax && _MI.isS) {
                clearTimeout(a.delay.save);
                a.delay.save = setTimeout(function() {
                    a.save()
                },
                80)
            }
        }
    },
    focus: function() {
        _MI.focus(this._txt)
    },
    guideReset: function() {
        this._guide.innerHTML = this.guide;
        _MUI.A(this._guide, "user", "")
    },
    save: function() {},
    showTip: function(a, b) {
        b == 2 ? _MUI.addClass(this._tip, "loading") : _MUI.removeClass(this._tip, "loading");
        this._tip.innerHTML = b == 1 ? '<span class="error">' + a + "</span>": a
    },
    flashTip: function() {
        clearInterval(this.delay.flashTip);
        _MUI.C(this._tip, "opacity", "0");
        this.delay.flashTip = _MUI.animate(this._tip, "opacity", 1, 0, 0.1)
    },
    hide: function() {
        _MUI.remove(this._body);
        this.hideCall && this.hideCall()
    },
    hideCall: null,
    success: null,
    getContentFunc: null,
    send: function() {
        var a = this,
        b;
        b = _MUI.trim(a._txt.value.replace(RegExp(a.txtTopic, "g"), ""));
        if (a.getContentFunc != null) b = _MUI.trim(a.getContentFunc().replace(RegExp(a.txtTopic, "g"), ""));
        MI.Login.setCallback("MB_PUBLISH_RELAY", UI.bind(a.send, a));
        MI.AccountInfo.setCallback("MB_PUBLISH_RELAY", UI.bind(a.send, a));
        var e = MI.Login.getUin(),
        c = MI.S("account_mbid_" + e);
        if (!e || !c) {
            if (e) c || MI.Bos("btnPublishNotReg");
            else MI.Bos("btnPublishNotLogin");
            MI.Login.popup.src = e ? "http://mini.t.qq.com/invite/quick.php?pref=": "http://mini.t.qq.com/mblogin_quick.htm?pref=";
            MI.Login.showPopup("publishInfoWin", this)
        } else if (!_MUI.hasClass(a._btn, "disabled")) if (a._btn.disable || _MUI.hasClass(a._btn, "disabled")) {
            a.length == 0 && a.showTip(a.txtTip.empty, 1);
            a._txt.focus();
            a._msgTo && _MUI.trim(a._msgTo.value) == "" && a._msgTo.focus();
            a.sending = 0;
            a.flashTip()
        } else {
            a._btn.disable = 1;
            _MUI.addClass(a._btn, "disabled");
            if (!a.type && !a.pic && !a.topic && b.match(/^@[a-zA-Z]{1}[\w|-]{0,19}_$/g)) document.location.href = "/" + b.slice(1) + "?from=1";
            else {
                a.delay.tip = setTimeout(function() {
                    a.showTip(a.txtTipSend, 2)
                },
                500);
                b = a.sourcePic != "" ? {
                    content: b.replace(/＠/g, "@").replace(/＃/g, "#"),
                    countType: a.countType,
                    sourcepic: a.sourcePic
                }: {
                    content: b.replace(/＠/g, "@").replace(/＃/g, "#"),
                    countType: a.countType
                };
                if (a.type) {
                    b.pId = a.talkId;
                    b.type = a.type
                }
                if (a._msgTo) b.account = a._msgTo.value.replace(/^@/, "");
                if (a.topic) b.content = (b.content.match(RegExp(_MI.string.escapeReg(a.topic))) ? "": a.topic) + b.content;
                a.addCheck && b.content.hasString(a.addCheck);
                b.source = a.source ? a.source: 1000001;
                a.start && a.start();
                _MI.TQueue["mb_" + (b.pId ? b.pId: "TalkBox")] = a;
                _MUI.afax({
                    url: a.url,
                    data: b
                });
                a.delay.timeout = setTimeout(function() {
                    a.showTip(a.txtTip.fail, 1);
                    a._btn.disable = 0;
                    _MUI.removeClass(a._btn, "disabled")
                },
                2E4)
            }
        }
    },
    countNum: function(a) {
        if (! (a > 0 && !this.addNum)) if (this._num.length) for (var b = 0,
        e = this._num.length; b < e; b++) _MI.countNum(this._num[b], a)
    },
    _$: function(a) {
        return _$$(this._body, a)[0]
    }
};
_MI.TalkBoxMsgTips = {
    m_0: "转播成功",
    "m_-1": "未登录",
    "m_-2": "未注册用户",
    "m_-3": "系统错误",
    "m_-4": "发表失败",
    "m_-5": "连接超时",
    "m_-6": "含敏感词",
    "m_-7": "网络安全问题",
    "m_-8": "参数错误",
    "m_-9": "说话太快了",
    "m_-10": "原文已删除",
    "m_-11": "系统繁忙",
    "m_-12": "说话太快了",
    "m_-13": "内容重复了",
    "m_-14": "话题数过多",
    "m_-15": "操作被限制",
    "m_-16": "请输入内容",
    "m_-17": "原文审核中",
    "m_-18": "再说点什么",
    "m_-100": "验证码有误",
    "m_-101": "验证码非法",
    "m_-102": "请输验证码"
};
function _MB_PUBLISH_CALLBACK_(a, b) {
    _MUI.afaxClear();
    if (b) {
        b.msg = _MI.TalkBoxMsgTips["m_" + b.result];
        if (b.result == 0 && !a) b.msg = "广播成功";
        var e = "mb_" + (a ? a: "TalkBox"),
        c = _MI.TQueue[e];
        clearTimeout(c.delay.timeout);
        c._txt.blur();
        if (b.result == -100) {
            _MI.code.show({
                msg: b.msg,
                code: b.info,
                call: function(f) {
                    c.code = f;
                    c.send()
                }
            });
            _MUI.removeClass(c._btn, "disabled");
            c._btn.disable = 0;
            setTimeout(function() {
                c.countTxt()
            },
            500)
        } else {
            clearTimeout(c.delay.tip);
            c.showTip(b.msg || "", b.result < 0 ? 1 : 0);
            c.flashTip();
            c.delay.tip = setTimeout(function() {
                _MUI.animate(c._tip, "opacity", 1,
                function() {
                    if (b.result == 0) c._txt.value = "";
                    try {
                        c._txt.focus()
                    } catch(f) {}
                    c.countTxt();
                    if (c._msgTo && b.result > -9 && b.result < -5) try {
                        c._msgTo.select()
                    } catch(g) {}
                    _MUI.C(c._tip, "opacity", "");
                    c._tip.style.filter = "";
                    c.sending = 0;
                    _MUI.removeClass(c._btn, "disabled");
                    if (c.success && b.result == 0) {
                        c.success(b);
                        _MUI.hide(c._tipBig)
                    }
                })
            },
            b.result == 0 ? c.delayTime: c.delayTime + 1E3)
        }
        c.successStart && b.result == 0 && c.successStart(b);
        c.failStart && b.result != 0 && c.failStart(b);
        setTimeout(function() {
            delete _MI.TQueue[e]
        },
        200);
        MI.Bos("btnPublish_" + b.result)
    }
}
_MUI.ready(function() {
    try {
        document.domain = "qq.com"
    } catch(a) {}
    var b = document.getElementById("proxy_ifrm");
    if (!b) {
        b = _MUI.DC("iframe");
        b.style.display = "none";
        b.setAttribute("id", "proxy_ifrm");
        b.src = "http://radio.t.qq.com/proxy.html";
        _MUI.GT(document, "body")[0].appendChild(b)
    }
});
/*  |xGv00|0d86757777fb25a9690bed608086ffa7 */