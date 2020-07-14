function MIIcon(e) {
	return "<%for(var k=0,num=MIIco.length;k<num;k++){if(" + e + "[MIIco[k]]){%><%=MIIcoHtml[k]%><%;break;}}%>"
}
function _MB_PUBLISH_CALLBACK_(e, t) {
	_MUI.afaxClear();
	if (t) {
		t.msg = _MI.TalkBoxMsgTips["m_" + t.result],
		t.result == 0 && !e && (t.msg = "\u5e7f\u64ad\u6210\u529f");
		var n = "mb_" + (e ? e: "TalkBox"),
		r = _MI.TQueue[n];
		clearTimeout(r.delay.timeout),
		r._txt.blur(),
		t.result == -100 ? (_MI.code.show({
			msg: t.msg,
			code: t.info,
			call: function(e) {
				r.code = e,
				r.send()
			}
		}), _MUI.removeClass(r._btn, "disabled"), r._btn.disable = 0, setTimeout(function() {
			r.countTxt()
		},
		500)) : (clearTimeout(r.delay.tip), r.showTip(t.msg || "", t.result < 0 ? 1: 0), r.flashTip(), r.delay.tip = setTimeout(function() {
			_MUI.animate(r._tip, "opacity", 1,
			function() {
				t.result == 0 && (r._txt.value = "");
				try {
					r._txt.focus()
				} catch(e) {}
				r.countTxt();
				if (r._msgTo && t.result > -9 && t.result < -5) try {
					r._msgTo.select()
				} catch(n) {}
				_MUI.C(r._tip, "opacity", ""),
				r._tip.style.filter = "",
				r.sending = 0,
				_MUI.removeClass(r._btn, "disabled"),
				r.success && t.result == 0 && (r.success(t), _MUI.hide(r._tipBig))
			})
		},
		t.result == 0 ? r.delayTime: r.delayTime + 1e3)),
		r.successStart && t.result == 0 && r.successStart(t),
		r.failStart && t.result != 0 && r.failStart(t),
		setTimeout(function() {
			delete _MI.TQueue[n]
		},
		200),
		MI.Bos("btnPublish_" + t.result)
	}
}
String.prototype.hasString = function(e) {
	if (typeof e == "object") {
		for (var t = 0, n = e.length; t < n; t++) if (!this.hasString(e[t])) return ! 1;
		return ! 0
	}
	if (this.indexOf(e) != -1) return ! 0
},
String.prototype.breakWord = function(e, t) {
	return t || (t = "<wbr/>"),
	this.replace(RegExp("(\\w{" + (e ? e: 0) + "})(\\w)", "g"),
	function(e, n, r) {
		return n + t + r
	})
};
var _MUI; (function() {
	_MUI = {
		ajax: function(e) {
			var t,
			n,
			r;
			if (e.crossDomain) {
				var i = _MUI.G("proxy_ifrm");
				if (!i) return;
				t = i.contentWindow.xmlHttp()
			} else t = _MUI.xmlHttp();
			t.onreadystatechange = function() {
				if (t.readyState == 1) e.timeout && e.fail && (r = setTimeout(function() {
					n || (t.abort(), e.fail())
				},
				e.timeout));
				else if (t.readyState == 2) e.send && e.send();
				else if (t.readyState == 4) {
					n = 1;
					if (t.status == 200) try {
						e.success(t.responseText)
					} catch(i) {} else e.fail && (clearTimeout(r), e.fail())
				}
			};
			if (_MUI.isObject(e.data)) {
				i = [];
				for (var s in e.data) i.push(s + "=" + encodeURIComponent(e.data[s]));
				e.data = i.join("&")
			}
			return e.type == "get" ? (t.open("GET", e.url + (e.url.hasString("?") ? "&": "?") + e.data, !0), t.send(null)) : (t.open("POST", e.url, !0), t.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), t.send(e.data)),
			t
		},
		get: function(e, t, n) {
			var r = _MUI.xmlHttp(),
			i = e.hasString("?") ? "&": "?";
			r.onreadystatechange = function() {
				if (r.readyState != 4 || r.status != 200) return r;
				try {
					n(r.responseText)
				} catch(e) {}
			};
			if (t != undefined) if (_MUI.isObject(t)) {
				var s = [],
				o;
				for (o in t) s.push(o + "=" + encodeURIComponent(t[o]));
				e += i + s.join("&")
			} else e += i + t;
			return r.open("GET", e, !0),
			r.send(null),
			r
		},
		xmlHttp: function() {
			var e;
			return window.ActiveXObject ? e = new ActiveXObject("Microsoft.XMLHTTP") : window.XMLHttpRequest && (e = new XMLHttpRequest),
			e
		},
		crossAsynJson: function(e, t, n, r) {
			var i = _MUI.DC("script"),
			s = _MUI.GT(document, "head")[0];
			window[t] = function(e) {
				try {
					window[t] = undefined
				} catch(r) {}
				try {
					delete window[t]
				} catch(o) {}
				n(e),
				s && setTimeout(function() {
					s.removeChild(i)
				},
				5)
			},
			r && _MUI.A(i, "charset", r),
			_MUI.A(i, "type", "text/javascript"),
			_MUI.A(i, "src", e),
			s.appendChild(i)
		},
		afax: function(e) {
			var t = _MUI.G("mbPublishFrom");
			_MUI.G("mbPublishFrame"),
			_MUI.A(t, "action", e.url);
			for (var n in e.data) {
				var r = _MUI.DC("input");
				_MUI.A(r, "name", n),
				_MUI.A(r, "value", e.data[n]),
				_MUI.append(r, t)
			}
			t.submit()
		},
		afaxClear: function() {
			var e = _MUI.G("mbPublishFrom"),
			t = _MUI.G("mbPublishFrame");
			t.src != "about:blank" && (t.src = "about:blank"),
			e.action = "",
			e.reset(),
			_MUI.each(_MUI.GC(e, "input"),
			function(e) {
				_MUI.remove(e)
			})
		},
		getScript: function(e, t, n) {
			var r = _MUI.DC("script");
			t && (_MUI.B.ie ? r.onreadystatechange = function() { (r.readyState == "loaded" || r.readyState == "complete") && t()
			}: r.onload = t),
			n && _MUI.A(r, "charset", n),
			_MUI.A(r, "type", "text/javascript"),
			_MUI.A(r, "src", e),
			_MUI.GT(document, "head")[0].appendChild(r)
		},
		getCss: function(e, t, n) {
			var r = n ? n: _MUI.DC("link");
			t && (r.onload = t),
			n || (_MUI.A(r, "rel", "stylesheet"), _MUI.A(r, "type", "text/css"), _MUI.GT(document, "head")[0].appendChild(r)),
			_MUI.A(r, "href", e)
		},
		evalScript: function(a) {
			var b = this.regExp.script; (a = a.match(RegExp(b, "img"))) && _MUI.each(a,
			function(e) {
				eval(e.match(RegExp(b, "im"))[1])
			})
		},
		regExp: {
			script: "<script[^>]*>([\\S\\s]*?)</script>"
		},
		encode: function(e) {
			return escape(_MUI.utfEncode(e))
		},
		decode: function(e) {
			return _MUI.utfDecode(unescape(e))
		},
		utfEncode: function(e) {
			e = e.replace(/\r\n/g, "\n");
			for (var t = "", n = 0; n < e.length; n++) {
				var r = e.charCodeAt(n);
				r < 128 ? t += String.fromCharCode(r) : (r > 127 && r < 2048 ? t += String.fromCharCode(r >> 6 | 192) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128)), t += String.fromCharCode(r & 63 | 128))
			}
			return t
		},
		utfDecode: function(e) {
			for (var t = "", n = 0, r = c1 = c2 = 0; n < e.length;) r = e.charCodeAt(n),
			r < 128 ? (t += String.fromCharCode(r), n++) : r > 191 && r < 224 ? (c2 = e.charCodeAt(n + 1), t += String.fromCharCode((r & 31) << 6 | c2 & 63), n += 2) : (c2 = e.charCodeAt(n + 1), c3 = e.charCodeAt(n + 2), t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63), n += 3);
			return t
		},
		parseUrl: function(e, t) {
			var n = e ? e: document.location.href,
			r = {};
			t = t || "?";
			if (!n.hasString(t)) return r;
			n = n.split(t)[1].split("&");
			for (var i = 0; i < n.length; i++) {
				var s = n[i].replace(/#.*$/g, "").split("=");
				s[1] || (s[1] = ""),
				r[s[0]] = _MUI.B.ie ? s[1] : _MUI.decode(s[1])
			}
			return r
		},
		cookie: function(e, t, n) {
			if (t == undefined) {
				e += "=",
				t = document.cookie.split(";");
				for (n = 0; n < t.length; n++) {
					for (var r = t[n]; r.charAt(0) == " ";) r = r.substring(1, r.length);
					if (r.indexOf(e) == 0) return decodeURIComponent(r.substring(e.length, r.length))
				}
				return null
			}
			r = "",
			n && (r = new Date, r.setTime(r.getTime() + n * 864e5), r = "; expires=" + r.toGMTString()),
			document.cookie = e + "=" + t + r + "; path=/"
		},
		drag: function(e, t, n) {
			var r = document;
			n = n != undefined ? n: !0,
			_MUI.EA(e, "mousedown",
			function(i) {
				t.start && t.start(i),
				n && (e.setCapture ? e.setCapture() : window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)),
				t.drag && (r.onmousemove = t.drag),
				r.onmouseup = function() {
					n && (e.releaseCapture ? e.releaseCapture() : window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)),
					t.stop && t.stop(i),
					r.onmousemove = null,
					r.onmouseup = null,
					t.call && t.call(i)
				}
			})
		},
		animate: function(a, b, e, c, f, g) {
			f = f || .4;
			var i = b.hasString("scroll"),
			h = "height,width,marginLeft,marginTop".hasString(b),
			k,
			j = setInterval(function() {
				var p,
				m,
				l,
				n = b == "opacity";
				p = h ? a.style[b] : i ? a[b] : _MUI.C(a, b),
				n ? (p *= 100, e *= 100, e > 100 && (e = 100)) : i || (p = p == "auto" ? 0: Number(p.slice(0, -2)));
				if (Math.abs(e - p) <= 3 || i && k == p) p = e,
				clearInterval(j);
				l = (e - p) * f,
				n || (l > 0 && l < 1 ? l = 1: l < 0 && l > -1 && (l = -1)),
				m = k = p + l,
				!n && (l < 0 && e - m > 0 || l > 0 && m - e > 0) && (m = e),
				h ? a.style[b] = m + "px": i ? a[b] = parseInt(m) : _MUI.C(a, b, n ? m / 100 + "": m + "px"),
				p == e && (_MUI.isString(c) ? eval(c) : c && c())
			},
			g || 40);
			return j
		},
		getX: function(e) {
			return e.offsetParent ? e.offsetLeft + _MUI.getX(e.offsetParent) : e.offsetLeft
		},
		getY: function(e) {
			return e.offsetParent ? e.offsetTop + _MUI.getY(e.offsetParent) : e.offsetTop
		},
		within: function(e, t) {
			var n = _MUI.getX(t) - _MUI.scrollX(),
			r = _MUI.width(t) + n,
			i = _MUI.getY(t) - _MUI.scrollY(),
			s = _MUI.height(t) + i,
			o = {};
			if (e[0] > n && e[0] < r && e[1] > i && e[1] < s) return e[0] - n < (r - n) / 2 && (o.left = !0),
			e[1] - i < (s - i) / 2 && (o.top = !0),
			o
		},
		frameX: function(e) {
			return e.frameElement ? _MUI.getX(e.frameElement) + _MUI.frameX(e.parent) : 0
		},
		frameY: function(e) {
			return e.frameElement ? _MUI.getY(e.frameElement) + _MUI.frameY(e.parent) : 0
		},
		width: function(e) {
			return parseInt(e.offsetWidth)
		},
		height: function(e) {
			return parseInt(e.offsetHeight)
		},
		pageWidth: function() {
			return document.body.scrollWidth || document.documentElement.scrollWidth
		},
		pageHeight: function() {
			return document.body.scrollHeight || document.documentElement.scrollHeight
		},
		windowWidth: function() {
			var e = document.documentElement;
			return self.innerWidth || e && e.clientWidth || document.body.clientWidth
		},
		windowHeight: function() {
			var e = document.documentElement;
			return self.innerHeight || e && e.clientHeight || document.body.clientHeight
		},
		scrollX: function(e) {
			var t = document.documentElement;
			if (e) {
				var n = e.parentNode,
				r = e.scrollLeft || 0;
				return e == t && (r = _MUI.scrollX()),
				n ? r + _MUI.scrollX(n) : r
			}
			return self.pageXOffset || t && t.scrollLeft || document.body.scrollLeft
		},
		scrollY: function(e) {
			var t = document.documentElement;
			if (e) {
				var n = e.parentNode,
				r = e.scrollTop || 0;
				return e == t && (r = _MUI.scrollY()),
				n ? r + _MUI.scrollY(n) : r
			}
			return self.pageYOffset || t && t.scrollTop || document.body.scrollTop
		},
		scrollTo: function(e, t, n) {
			if (e == document.documentElement || e == document.body) return window.scrollTo(t, n)
		},
		hide: function(e) {
			_MUI.isString(e) && (e = this.G(e));
			if (e) {
				var t = this.C(e, "display");
				t != "none" && (e.__curDisplay = t),
				e.style.display = "none"
			}
		},
		show: function(e) {
			_MUI.isString(e) && (e = this.G(e)),
			e && (e.style.display = e.__curDisplay || "")
		},
		toggle: function(e) {
			_MUI.isString(e) && (e = this.G(e)),
			this.C(e, "display") == "none" ? this.show(e) : this.hide(e)
		},
		hasClass: function(e, t) {
			return ! e || !e.className ? !1: e.className != e.className.replace(RegExp("\\b" + t + "\\b"), "")
		},
		addClass: function(e, t) {
			if (e) if (e.className) {
				if (this.hasClass(e, t)) return ! 1;
				e.className += " " + t
			} else e.className = t
		},
		removeClass: function(e, t) {
			e && (e.className = e.className.replace(RegExp("\\b" + t + "\\b"), ""))
		},
		toggleClass: function(e, t) {
			this.hasClass(e, t) ? this.removeClass(e, t) : this.addClass(e, t)
		},
		next: function(e) {
			return e = e.nextSibling,
			e == null ? !1: _MUI.isElement(e) ? e: this.next(e)
		},
		prev: function(e) {
			return e = e.previousSibling,
			e == null ? !1: _MUI.isElement(e) ? e: this.prev(e)
		},
		remove: function(e) {
			e && e.parentNode && e.parentNode.removeChild(e)
		},
		append: function(e, t) {
			t.appendChild(e)
		},
		prepend: function(e, t) {
			var n = t.firstChild;
			n ? _MUI.before(e, n) : _MUI.append(e, t)
		},
		after: function(e, t) {
			var n = t.parentNode;
			n.lastChild == e ? n.appendChild(e) : n.insertBefore(e, t.nextSibling)
		},
		before: function(e, t) {
			t.parentNode.insertBefore(e, t)
		},
		replace: function(e, t) {
			t.parentNode.replaceChild(e, t)
		},
		tmpl: function() {
			var e = {};
			return function t(n, r) {
				var i = /\W/.test(n) ? _MUI.tmplString(n) : e[n] = e[n] || t(_MUI.G(n).innerHTML);
				return r ? i(r) : i
			}
		} (),
		tmplString: function(e) {
			return new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + e.replace(/[\r\t\n]/g, " ").split("<%").join(" ").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split(" ").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');")
		},
		html: function(e) {
			var t = _MUI.DC("div"),
			n = [];
			return t.innerHTML = e,
			_MUI.each(t.childNodes,
			function(e) {
				n.push(e)
			}),
			n
		},
		css: function(e, t) {
			var n;
			t || (t = _MUI.DC("style"), _MUI.A(t, "type", "text/css"), _MUI.append(t, _MUI.GT(document, "head")[0])),
			t.styleSheet ? t.styleSheet.cssText = e: (n = document.createTextNode(e), _MUI.append(n, t))
		},
		text: function a(e) {
			var t = [];
			e = e.childNodes;
			for (var n = 0, r = e.length; n < r; n++) t.push(e[n].nodeType != 1 ? e[n].nodeValue: a(e[n]));
			return t.join("")
		},
		parent: function(e, t) {
			if (_MUI.isArray(e)) {
				var n = [];
				return _MUI.each(e,
				function(e) { (t && _MUI.hasClass(e.parentNode, t) || !t) && n.push(e.parentNode)
				}),
				n
			}
			return e.parentNode
		},
		parents: function(e, t) {
			if (t) {
				var n = [],
				r = _MUI.parents(e);
				return _MUI.each(r,
				function(e) {
					_MUI.hasClass(e, t) && n.push(e)
				}),
				n
			}
			return r = e.parentNode,
			r.nodeName == "HTML" ? [r] : [r].concat(_MUI.parents(r))
		},
		children: function(e, t) {
			var n = [];
			return t && (t = t.split("|")),
			_MUI.each(e.childNodes,
			function(e) {
				var r = !1;
				if (t) for (var i = 0, s = t.length; i < s; i++) if (_MUI.hasClass(e, t[i])) {
					r = !0;
					break
				}
				_MUI.isElement(e) && (!t || r) && n.push(e)
			}),
			n
		},
		A: function(e, t, n) {
			if (n == undefined) return e.getAttribute(t);
			n == "" ? e.removeAttribute(t) : e.setAttribute(t, n)
		},
		C: function(e, t, n) {
			if (n == undefined) {
				if (window.getComputedStyle) return t = t.replace(/([A-Z])/g, "-$1"),
				t = t.toLowerCase(),
				window.getComputedStyle(e, null).getPropertyValue(t);
				if (e.currentStyle) return t == "opacity" ? e.style.filter.indexOf("opacity=") >= 0 ? parseFloat(e.style.filter.match(/opacity=([^)]*)/)[1]) / 100: "1": e.currentStyle[t]
			} else t == "opacity" && _MUI.B.ie ? e.style.filter = (e.filter || "").replace(/alpha\([^)]*\)/, "") + "alpha(opacity=" + n * 100 + ")": e.style[t] = n
		},
		DC: function(e) {
			return document.createElement(e)
		},
		E: function(e) {
			return e && e.clone ? e: (e = window.event || e, {
				clone: !0,
				stop: function() {
					e && e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
				},
				prevent: function() {
					e && e.preventDefault ? e.preventDefault() : e.returnValue = !1
				},
				target: e.target || e.srcElement,
				x: e.clientX || e.pageX,
				y: e.clientY || e.pageY,
				button: e.button,
				key: e.keyCode,
				shift: e.shiftKey,
				alt: e.altKey,
				ctrl: e.ctrlKey,
				type: e.type,
				wheel: e.wheelDelta / 120 || -e.detail / 3
			})
		},
		EA: function(a, b, e, c) {
			if (_MUI.isString(a)) {
				var f = e;
				e = function() {
					eval(f)
				}
			}
			return a.addEventListener ? (b == "mousewheel" && (b = "DOMMouseScroll"), a.addEventListener(b, e, c), !0) : a.attachEvent ? a.attachEvent("on" + b, e) : !1
		},
		ER: function(e, t, n) {
			return e.removeEventListener ? (e.removeEventListener(t, n, !1), !0) : e.detachEvent ? e.detachEvent("on" + t, n) : !1
		},
		G: function(e) {
			return document.getElementById(e)
		},
		GT: function(e, t) {
			return e.getElementsByTagName(t)
		},
		GC: function() {
			function e(l, p) {
				p || (p = l, l = document),
				l = l || document;
				if (!/^[\w\-_#]+$/.test(p) && l.querySelectorAll) return t(l.querySelectorAll(p));
				if (p.indexOf(",") > -1) {
					for (var d = p.split(/,/g), v = [], m = 0, y = d.length; m < y; ++m) v = v.concat(e(l, d[m]));
					return a(v)
				}
				d = p.match(r),
				y = d.pop(),
				v = (y.match(s) || u)[1];
				var w = !v && (y.match(i) || u)[1];
				m = y.split(".").slice(2),
				y = !v && (y.match(o) || u)[1];
				if (w && !y && l.getElementsByClassName) y = t(l.getElementsByClassName(w));
				else {
					y = !v && t(l.getElementsByTagName(y || "*"));
					if (w) {
						w = RegExp("(^|\\s)" + w + "(\\s|$)");
						var E = -1,
						S,
						x = -1,
						T = [];
						for (m = m || ""; S = y[++E];) w.test(S.className) && S.className.hasString(m) && (T[++x] = S);
						y = T
					}
					if (v) return (d = l.getElementById(v)) ? [d] : []
				}
				return d[0] && y[0] ? n(d, y) : y
			}
			function t(e) {
				try {
					return Array.prototype.slice.call(e)
				} catch(t) {
					for (var n = [], r = 0, i = e.length; r < i; ++r) n[r] = e[r];
					return n
				}
			}
			function n(e, t, r) {
				var a = e.pop();
				if (a === ">") return n(e, t, !0);
				var l = [],
				c = -1,
				p = (a.match(s) || u)[1],
				d = !p && (a.match(i) || u)[1];
				a = !p && (a.match(o) || u)[1];
				var v = -1,
				m,
				y,
				b;
				for (a = a && a.toLowerCase(); m = t[++v];) {
					y = m.parentNode;
					do {
						b = (b = (b = !a || a === "*" || a === y.nodeName.toLowerCase()) && (!p || y.id === p)) && (!d || RegExp("(^|\\s)" + d + "(\\s|$)").test(y.className));
						if (r || b) break
					}
					while (y = y.parentNode);
					b && (l[++c] = m)
				}
				return e[0] && l[0] ? n(e, l) : l
			}
			var r = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
			i = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
			s = /^(?:[\w\-_]+)?#([\w\-_]+)/,
			o = /^([\w\*\-_]+)/,
			u = [null, null],
			a = function() {
				var e = +(new Date),
				t = function() {
					var t = 1;
					return function(n) {
						var r = n[e],
						i = t++;
						return r ? !1: (n[e] = i, !0)
					}
				} ();
				return function(n) {
					for (var r = n.length, i = [], s = -1, o = 0, u; o < r; ++o) u = n[o],
					t(u) && (i[++s] = u);
					return e += 1,
					i
				}
			} ();
			return e
		} (),
		isDate: function(e) {
			return this.getType(e) == "Date"
		},
		cloneDate: function(e) {
			return e ? (d = new Date, d.setTime(e.getTime()), d) : e
		},
		formatDate: function(e, t) {
			for (var n = t.replace(/\W/g, ",").split(","), r = ["yyyy", "MM", "dd", "hh", "mm", "ss", "ww"], i = {
				y: e.getFullYear(),
				M: e.getMonth() + 1,
				d: e.getDate(),
				h: e.getHours(),
				m: e.getMinutes(),
				s: e.getSeconds(),
				w: e.getDay()
			},
			s = 0, o = n.length; s < o; s++) for (var u = n[s], a = 0; a < 7; a++) {
				var f = r[a].slice( - 1);
				u.hasString(f) && (f == "w" && i[f] == 0 && (i[f] = 7), t = u.hasString(r[a]) ? t.replace(RegExp(r[a], "g"), this.addZero(i[f])) : t.replace(RegExp(r[a].slice(r[a].length / 2), "g"), i[f]))
			}
			return t
		},
		parseDate: function(e, t) {
			t || (t = "yyyy-MM-dd"),
			t = t.replace(/\W/g, ",").split(","),
			e = e.replace(/\D/g, ",").split(",");
			var n = 2e3,
			r = 0,
			i = 1,
			s = 0,
			o = 0,
			u = 0;
			return _MUI.each(t,
			function(t, l) {
				e[l] != "" && !isNaN(e[l]) && (t.hasString("y") && (n = Number(e[l])), t.hasString("M") && (r = Number(e[l]) - 1), t.hasString("d") && (i = Number(e[l])), t.hasString("h") && (s = Number(e[l])), t.hasString("m") && (o = Number(e[l])), t.hasString("s") && (u = Number(e[l])), t.hasString("w") && (u = Number(e[l])))
			}),
			new Date(n, r, i, s, o, u)
		},
		isObject: function(e) {
			return typeof e == "object"
		},
		isElement: function(e) {
			return e && e.nodeType == 1
		},
		isUndefined: function(e) {
			return typeof e == "undefined"
		},
		isFunction: function(e) {
			return this.getType(e) == "Function"
		},
		isNumber: function(e) {
			return this.getType(e) == "Number"
		},
		isString: function(e) {
			return this.getType(e) == "String"
		},
		isArray: function(e) {
			return this.getType(e) == "Array"
		},
		getType: function(e) {
			return Object.prototype.toString.call(e).slice(8, -1)
		},
		addZero: function(e, t) {
			return t || (t = 2),
			Array(Math.abs(("" + e).length - (t + 1))).join(0) + e
		},
		trim: function(e) {
			return e.replace(/^\s+|\s+$/g, "")
		},
		random: function(e, t) {
			return e == undefined && (e = 0),
			t == undefined && (t = 9),
			Math.floor(Math.random() * (t - e + 1) + e)
		},
		has: function(e, t) {
			for (var n = 0, r = e.length; n < r; n++) if (e[n] == t) return ! 0;
			return ! 1
		},
		each: function(e, t) {
			if (_MUI.isUndefined(e[0])) for (var n in e) _MUI.isFunction(e[n]) || t(n, e[n]);
			else {
				n = 0;
				for (var r = e.length; n < r; n++) _MUI.isFunction(e[n]) || t(e[n], n)
			}
		},
		merge: function(e, t) {
			var n = [];
			return t ? (_MUI.each(t,
			function(t) {
				_MUI.has(e, t) || n.push(t)
			}), e.concat(n)) : (_MUI.each(e,
			function(e) {
				_MUI.has(n, e) || n.push(e)
			}), n)
		},
		ready: function(e) {
			if (_MUI.ready.done) return e();
			_MUI.isReady.done ? _MUI.readyDo.push(e) : (_MUI.readyDo = [e], _MUI.isReady())
		},
		readyDo: [],
		isReady: function() {
			if (!_MUI.isReady.done) {
				_MUI.isReady.done = !0;
				if (document.readyState == "complete") _MUI.onReady();
				else if (document.addEventListener) document.addEventListener("DOMContentLoaded",
				function() {
					document.removeEventListener("DOMContentLoaded", arguments.callee, !1),
					_MUI.onReady()
				},
				!1);
				else if (document.attachEvent) {
					var e = top != self;
					e ? document.attachEvent("onreadystatechange",
					function() {
						document.readyState === "complete" && (document.detachEvent("onreadystatechange", arguments.callee), _MUI.onReady())
					}) : document.documentElement.doScroll && !e &&
					function() {
						if (!_MUI.ready.done) {
							try {
								document.documentElement.doScroll("left")
							} catch(e) {
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
				_MUI.ready.done = !0;
				for (var e = 0, t = _MUI.readyDo.length; e < t; e++) try {
					_MUI.readyDo[e]()
				} catch(n) {}
				_MUI.readyDo = null
			}
		},
		B: function() {
			var e = {},
			t = navigator.userAgent;
			return e.win = t.hasString("Windows") || t.hasString("Win32"),
			e.ie6 = t.hasString("MSIE 6") && !t.hasString("MSIE 7") && !t.hasString("MSIE 8"),
			e.ie8 = t.hasString("MSIE 8"),
			e.ie = t.hasString("MSIE"),
			e.opera = window.opera || t.hasString("Opera"),
			e.safari = t.hasString("WebKit"),
			e.ipad = t.hasString("iPad"),
			e.mac = t.hasString("Mac"),
			e.firefox = t.hasString("Firefox"),
			e
		} ()
	},
	_MUI.B.ie && document.execCommand("BackgroundImageCache", !1, !0)
})();
try {
	document.domain = "qq.com"
} catch(e$$17) {}
_$ = _MUI.G,
_$$ = _MUI.GC;
var _MI = _MI || {};
var varbtitle;
_MI = {
	app: {
		talkbox: "http://mat1.gtimg.com/www/mb/js/portal/mi.TalkBox_110224.js"
	},
	time: null,
	string: {
		length: function(e) {
			var t = e.match(/[^\x00-\x80]/g);
			return e.length + (t ? t.length: 0)
		},
		escape: function(e) {
			return _MI.string.html(e).replace(/'/g, "\\'")
		},
		escapeReg: function(e) {
			for (var t = [], n = 0; n < e.length; n++) {
				var r = e.charAt(n);
				switch (r) {
				case ".":
					t.push("\\x2E");
					break;
				case "_$":
					t.push("\\x24");
					break;
				case "^":
					t.push("\\x5E");
					break;
				case "{":
					t.push("\\x7B");
					break;
				case "[":
					t.push("\\x5B");
					break;
				case "(":
					t.push("\\x28");
					break;
				case "|":
					t.push("\\x28");
					break;
				case ")":
					t.push("\\x29");
					break;
				case "*":
					t.push("\\x2A");
					break;
				case "+":
					t.push("\\x2B");
					break;
				case "?":
					t.push("\\x3F");
					break;
				case "\\":
					t.push("\\x5C");
					break;
				default:
					t.push(r)
				}
			}
			return t.join("")
		},
		html: function(e) {
			return e.replace(/</g, "&lt;").replace(/>/g, "&gt;")
		},
		cut: function(e, t, n) {
			n = _MUI.isUndefined(n) ? "...": n;
			var r = [],
			i = "";
			if (_MI.string.length(e) > t) {
				e = e.split(""),
				i = 0;
				for (var s = e.length; i < s; i++) {
					if (! (t > 0)) break;
					r.push(e[i]),
					t -= _MI.string.length(e[i])
				}
				i = r.join("") + n
			} else i = e;
			return i
		},
		id: function(e) {
			return e.match(/[^\/]+_$/g)[0].replace("#M", "")
		},
		account: function(e) {
			return e.match(/@[^@]+_$/g)[0].slice(1, -1)
		}
	},
	number: {
		format: function(e) {
			return (e + "").replace(/(?=(?!\b)(?:\w{3})+_$)/g, ",")
		}
	},
	random: function(e) {
		return parseInt((new Date).getTime() / (e || 1))
	},
	json: function(a) {
		var b = {};
		try {
			b = eval("(" + a + ")")
		} catch(e) {}
		return b
	},
	tmpl: {
		reply: '<div class="zfWrap"><div class="SA"><em>\u25c6</em><span>\u25c6</span></div><div class="top"><span class="left"><span class="replyTitle"></span>\u3000<span class="addReply"></span></span><a href="#" class="close" title="\u5173\u95ed">\u5173\u95ed</a></div><iframe class="comts" src="about:blank" frameborder="0" scrolling="no" style="height:0"></iframe><div class="cont"><textarea class="inputTxt"></textarea></div><div class="bot"><div class="left" style="margin-right:1ex"><span class="number cNote"></span></div><div class="left"></div><input type="button" class="inputBtn sendBtn" value="" /><span class="countTxt"></span><a href="#" class="ico_face" title="\u8868\u60c5"></a></div><div class="talkSuc" style="display:none"><span class="ico_tsW"><span class="ico_ts"></span></span><span class="msg"></span></div></div>'
	},
	selectTxt: function(e, t, n) {
		document.createRange ? e.setSelectionRange(t, n) : (e = e.createTextRange(), e.collapse(1), e.moveStart("character", t), e.moveEnd("character", n - t), e.select())
	},
	insertTxt: function(e, t, n, r) {
		r == undefined && (r = 0),
		e.focus();
		if (document.selection) e = document.selection.createRange(),
		e.moveStart("character", -r),
		e.text = t;
		else {
			var i = e.value,
			s = n + t.length - r;
			e.value = i.substring(0, n - r) + t + i.substring(n, i.length),
			_MI.selectTxt(e, s, s, s)
		}
	},
	countNum: function(e, t, n) {
		if ( !! e && !e.innerHTML.hasString("\u8d85\u8fc7")) {
			var r = e.innerHTML.replace(/\D/g, "") || 0;
			r = n ? MI.number.format(parseInt(r.replace(/,/g, "")) + t) : parseInt(r) + t,
			e.innerHTML = r < 0 ? 0: r
		}
	},
	fC: {
		numFormat: [],
		num: []
	},
	follow: function(e, t, n, r) {
		function i() {
			var i = MI.Login.getUin();
			if (i && MI.S("account_mbid_" + i) && !t.sending) {
				var s = -1;
				i = t.className;
				var o = _$("followedNum_" + e),
				u = _$("followNum_" + e),
				f = i != "addAttention" && i != "delAttention";
				i == "addAttention" || f ? (s = 1, i = "http://radio.t.qq.com/mini/follow.php") : i = "http://radio.t.qq.com/mini/unfollow.php",
				t.sending = 1;
				var l = "u=" + e + "&" + _MI.AcInfo() + "&r=" + _MI.random();
				_MUI.ajax({
					url: i,
					type: "post",
					data: l,
					crossDomain: !0,
					success: function(i) {
						i = _MI.json(i),
						t.sending = 0;
						if (i.result == 0) {
							f || (t.className = s == 1 ? "delAttention": "addAttention"),
							o && _MI.countNum(o, s),
							u && _MI.countNum(u, s);
							for (var l = 0, h = _MI.fC.numFormat.length; l < h; l++) _MI.countNum(_MI.fC.numFormat[l], s, 1);
							l = 0;
							for (h = _MI.fC.num.length; l < h; l++) _MUI.A(_MI.fC.num[l], "rel") == e && _MI.countNum(_MI.fC.num[l], s);
							n && n(s, i)
						} else i.result == -100 && _MI.code.show({
							msg: i.msg,
							code: i.info,
							call: function() {
								_MI.follow(e, t, n, r)
							}
						})
					}
				})
			}
		}
		_MI.fC.init || (_MI.fC.numFormat = _$$(".followNumFormat"), _MI.fC.num = _$$(".followNum"), _MI.fC.init = 1);
		if (MI.Login) {
			MI.Login.setCallback("follow_send", i),
			MI.AccountInfo.setCallback("follow_send", i);
			var s = MI.Login.getUin(),
			o = MI.S("account_mbid_" + s);
			if (!s || !o) return r = r || "qq.com",
			MI.Login.popup.src = s ? "http://mini.t.qq.com/invite/quick.php?pref=" + r: "http://mini.t.qq.com/mblogin_quick.htm?pref=" + r,
			MI.Login.showPopup("follow_send", t),
			_MI.Bos("btnAddAttentionNotLogin", _MI.Host()),
			!1;
			i()
		} else window.open("http://t.qq.com"),
		_MI.Bos("btnAddAttentionNotLogin", _MI.Host())
	}
},
_MI.Bos = function(e, t, n) {
	var r,
	i = {
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
	s = 302;
	if (_MUI.isObject(e)) {
		r = 1,
		e.iUrlType = MI.boss || "",
		e.sUrl = document.location.host + document.location.pathname;
		for (var o in i) _MUI.isUndefined(e[o]) || (i[o] = e[o]);
		random = e.random,
		s = e.id,
		e = e.name
	}
	if (e.hasString("http")) _MI.Bos.pic[_MUI.random(0, 99)].src = e;
	else try {
		var u = _MI.Uin(),
		a = "";
		n = n ? n: "";
		if (r) for (o in i) a += "&" + o + "=" + i[o];
		else t = t || _MI.boss,
		_MUI.isNumber(t) ? a = "&sServerIp=&iBackInt1=" + t + "&iBackInt2=&sBackStr1=": _MUI.isString(t) && (a = "&sServerIp=&iBackInt1=&iBackInt2=&sBackStr1=" + t),
		a = a + "&iFlow=0&Fsite=" + _MI.Article.site + "&Ftype=" + n;
		_MI.Bos.pic[_MUI.random(0, 99)].src = "http://btrace.qq.com/collect?sIp=&iQQ=" + u + "&sBiz=microblog&sOp=" + e + "&iSta=0&iTy=" + s + a
	} catch(f) {}
},
_MI.Bos.pic = [],
function() {
	for (var e = 0; e < 100; ++e) _MI.Bos.pic.push(new Image)
} (),
_MI.feedBack = function(e, t) {
	function n(e) {
		var t = [];
		return t = e.split(","),
		t.length
	}
	function r(e, t) {
		for (var n in e) typeof e[n] == "object" ? (t[n] = {},
		r(e[n], t[n])) : t[n] = e[n]
	}
	e.sBak1 ? e.iFlow = n(e.sBak1) : e.sBak2 && (e.iFlow = n(e.sBak2));
	var i;
	i = t ? t: (new Date).getTime();
	if (e.iFlow > 20) {
		e.iBak2 = i;
		var s = [],
		o = [],
		u,
		a;
		u = {},
		a = {},
		r(e, u),
		r(e, a);
		var f = "";
		e.sBak1 ? f = e.sBak1: e.sBak2 && (f = e.sBak2);
		var l = [];
		l = f.split(",");
		for (f = 0; f < 20; f++) s.push(l[f]);
		for (f = 20; f < e.iFlow; f++) o.push(l[f]);
		e.sBak1 ? (u.sBak1 = s.join(","), a.sBak1 = o.join(",")) : e.sBak2 && (u.sBak2 = s.join(","), a.sBak2 = o.join(",")),
		u.iFlow = 20,
		a.iFlow = e.iFlow - 20,
		MI.Bos(u),
		_MI.feedBack(a, i)
	} else _MI.Bos(e)
},
_MI.Host = function() {
	return window.location.host
},
_MI.Uin = function() {
	var e = "";
	try {
		e = _MUI.trim(_MUI.cookie("luin") || _MUI.cookie("uin"))
	} catch(t) {}
	return Number(e.replace(/o/g, ""))
},
_MI.ClientUin = _MI.ClientKey = "",
_MI.AcInfo = function() {
	return "uin=" + MI.Login.getUin() + "&clientuin=" + _MI.ClientUin + "&clientkey=" + _MI.ClientKey
},
MIIco = ["auth", "expo", "star"],
MIIcoHtml = ['<a href="http://t.qq.com/certification" target="_blank" class="vip" bossZone="followallrz" title="\u817e\u8baf\u8ba4\u8bc1"></a>', '<a href="http://blog.qq.com/zt/2010/2010expo/shibovol.htm" title="2010\u4e0a\u6d77\u4e16\u535a\u5fd7\u613f\u8005" target="_blank" class="ico_expo"></a>', '<a href="http://ent.qq.com/zt2010/star2010/fans.htm" class="ico_star" title="\u661f\u5149\u8fbe\u4eba" target="_blank"></a>'],
function() {
	_MI.tmpl.sCard = '<div class="mbSourceCardInfo" style="display:none"><div class="arrowBox"><div calss="arrow"></div></div><div class="mbloading"></div></div>',
	_MI.tmpl.userInfo = '<div class="mbCardUserDetail">  <div class="userPic"><a title="<%=info.nick%>(@<%=info.name%>)" href="http://t.qq.com/<%=info.name%>?pref=<%=info.pref%>tx2" bossZone="followalltx2" rel="<%=info.nick%>(@<%=info.name%>)" target="_blank"><%if(info.head){%><img src="<%=info.head%>/50" /><%}else{%><img src="http://mat1.gtimg.com/www/mb/images/head_50.jpg" /><%}%></a></div>  <div class="userInfo">   <div class="nick"><a title="<%=info.nick%>(@<%=info.name%>)" href="http://t.qq.com/<%=info.name%>?pref=<%=info.pref%>name" bossZone="followallname" target="_blank"><span><%=info.nick%></span></a>' + MIIcon("info.flag") + '</div>   <div class="follower"><%if(info.num[1] > 0){%><a title="\u542c\u4f17\uff1a<%=info.num[1]%>\u4eba" href="http://t.qq.com/<%=info.name%>/follower?pref=<%=info.pref%>tz" bossZone="followalltz" target="_blank"><span>\u542c\u4f17\uff1a</span><span><%=info.num[1]%>\u4eba</span></a><%}else{%>&nbsp;<%}%></div>   <div class="attentBoxWrap" follow="<%=info.follow%>" uid="<%=info.name%>"><a href="javascript:;" class="addAttention" title="\u7acb\u5373\u6536\u542c" style="display: none;" bossZone="followallst"><span>+\u6536\u542c</span></a><a href="#"class="delAttention" title="\u5df2\u6536\u542c" style="display: none;"><span>\u5df2\u6536\u542c</span></a></div>  </div>  <%if(info.msgInfo){%>  <div class="userNew">   <div class="titleBox"><span>\u6700\u65b0\u6d88\u606f</span> <span class="timer" title="<%=info.uTime%>" rel="<%=info.msgTime%>"><%=info.uTime%></span></div>   <div class="news"><%=info.msgInfo%><a target="_blank" href="http://t.qq.com/<%=info.name%>?pref=<%=info.pref%>more" bossZone="followallmore">\u66f4\u591a</a></div>  </div>  <%}%> </div>',
	_MI.tmpl.shareArticlePic = '<div class="mbArticleSharePic"><div class="mbArticleShareBtn"><span>\u8f6c\u64ad\u5230\u817e\u8baf\u5fae\u535a</span></div></div>'
} (),
_MI.Article = typeof ARTICLE_INFO != "undefined" ? ARTICLE_INFO: {
	site: "qqcom"
},
_MI.Time = typeof _SERVER_TIME_FULL_ != "undefined" ? _SERVER_TIME_FULL_: "",
_MI.ServerTime = _MI.Time ? (new Date(_MI.Time[0], _MI.Time[1], _MI.Time[2], _MI.Time[3], _MI.Time[4])).getTime() : (new Date).getTime(),
_MI.updateTime = function(e) {
	var t;
	t = _MI.ServerTime / 1e3;
	var n = new Date,
	r = parseInt(_MUI.A(e, "rel")) / 1e3,
	i = new Date,
	s = t - r,
	o = parseInt(s / 60);
	parseInt(s / 3600),
	s = parseInt(s / 86400);
	var u = e.title.split(" ")[1];
	n.setTime(t + "000"),
	i.setTime(r + "000");
	if (t = o == 0 ? "\u521a\u521a": o < 60 ? o + "\u5206\u949f\u524d": o > 59 && s == 0 ? (n.getDate() == i.getDate() ? "\u4eca\u5929": "\u6628\u5929") + " " + u: s == 1 && n.getDate() - i.getDate() < 2 ? "\u6628\u5929 " + u: n.getFullYear() == i.getFullYear() ? e.title.split("\u5e74")[1] : e.title) e.innerHTML = t
},
_MI.WebSCard = {
	boss: null,
	callback: null,
	hoverTime: null,
	last: null,
	tmpl: _MI.tmpl.sCard,
	tmplInfo: _MI.tmpl.userInfo,
	pref: "",
	build: function(e, t, n) {
		var r = this;
		e = _$(e),
		r.pref = t ? t: "qqcom",
		(e = _$$(e, n ? n: ".mbSourceCard")) && e.length && _MUI.each(e,
		function(e) {
			_MUI.A(e, "rel") && (e.onmouseover = function() {
				r.show(e, t),
				_MUI.addClass(e.parentNode, "hover")
			},
			e.onmouseout = function() {
				r.hide(e),
				_MUI.removeClass(e.parentNode, "hover")
			})
		})
	},
	show: function(e, t) {
		var n = this,
		r = _$$(e.parentNode, ".mbSourceCardInfo")[0];
		r || (n.buildCard(e, t), r = _$$(e.parentNode, ".mbSourceCardInfo")[0]),
		clearTimeout(n.hoverTime),
		n.hoverTime = setTimeout(function() {
			_MUI.show(r),
			n.last && n.last != r && _MUI.hide(n.last),
			n.last = r
		},
		100)
	},
	hide: function(e) {
		var t = _$$(e.parentNode, ".mbSourceCardInfo")[0];
		clearTimeout(this.hoverTime),
		this.hoverTime = setTimeout(function() {
			_MUI.hide(t)
		},
		50)
	},
	buildCard: function(e, t) {
		var n = this,
		r = _MUI.A(e, "rel");
		_MUI.A(e, "reltitle");
		var i = _MUI.A(e, "loaded"),
		s = _MUI.html(n.tmpl)[0];
		_MUI.after(s, e);
		var o = _$$(e.parentNode, ".mbSourceCardInfo")[0],
		u = _$$(o, ".mbCardUserDetail")[0],
		a = _$$(o, ".mbloading")[0];
		s = _$$(o, ".mbCardUserErr")[0],
		_MUI.show(o),
		s && _MUI.hide(s),
		o.onmouseover = function() {
			n.show(e),
			_MUI.addClass(this.parentNode, "hover")
		},
		o.onmouseout = function() {
			n.hide(e),
			_MUI.removeClass(this.parentNode, "hover")
		},
		i || (_MUI.show(a), i = "userCard" + Math.floor(Math.random() * 1e4), _MUI.crossAsynJson("http://radio.t.qq.com/mini/userCard.php?&u=" + r + "&callback=" + i + "&r=" + _MI.random(), i,
		function(r) {
			a && _MUI.hide(a),
			t && (r.info.pref = t);
			var i = document.createDocumentFragment();
			r.result == 0 ? (_MUI.A(e, "loaded", "1"), r = _MUI.html((new _MUI.tmplString(n.tmplInfo))(r)), _MUI.each(r,
			function(e) {
				_MUI.append(e, i)
			}), u ? _MUI.replace(i, u) : _MUI.append(i, o), n.addEvent(o), (r = _$$(u, ".userNew")[0]) && _MI.updateTime(_$$(r, ".timer")[0]), _MUI.hasClass(o.parentNode, "hover") || _MUI.hide(o)) : n.errEvent(e)
		},
		function() {
			n.errEvent(e),
			_MI.Bos("btnUserCardLoadFail")
		},
		5e3))
	},
	errEvent: function(e) {
		var t = _MUI.A(e, "rel"),
		n = _MUI.A(e, "reltitle");
		e = _$$(e.parentNode, ".mbSourceCardInfo")[0];
		var r = _$$(e, ".mbCardUserDetail")[0],
		i = _$$(e, ".mbloading")[0],
		s = document.createDocumentFragment();
		t = _MUI.html('<div class="mbCardUserErr"><table><tr><td><span class="mbIcon_a"></span><a href="http://t.qq.com/' + t + '" target="_blank">\u70b9\u51fb\u8bbf\u95ee' + (n ? n + "\u7684\u5fae\u535a": "\u817e\u8baf\u5fae\u535a") + '</a><span class="mbIcon_b"></span></td></tr></table></div>'),
		_MUI.each(t,
		function(e) {
			_MUI.append(e, s)
		}),
		i && _MUI.hide(i),
		r ? _MUI.replace(s, r) : _MUI.append(s, e)
	},
	addEvent: function(e) {
		e = _$$(e, ".attentBoxWrap");
		var t,
		n = this;
		e && e.length && _MUI.each(e,
		function(e) {
			uid = _MUI.A(e, "uid"),
			t = _MUI.A(e, "follow"),
			add = _$$(e, ".addAttention")[0],
			del = _$$(e, ".delAttention")[0],
			t == 1 ? _MUI.show(del) : _MUI.show(add),
			add.onclick = function() {
				registerZone2({
					bossZone: "followallst",
					url: ""
				},
				1);
				var e = this;
				return _MI.follow(uid, e,
				function() {
					_MUI.hide(e),
					_MUI.show(_MUI.next(e)),
					e.className = "addAttention",
					_MI.feedBack({
						name: "portal",
						iPos: 30,
						iBak1: 3,
						sBak2: uid + ":" + _MI.Article.site,
						id: 1191
					})
				},
				n.pref),
				!1
			},
			del.onclick = function() {
				return ! 1
			}
		})
	}
},
_MI.ArticleInfo = function() {
	var e = {},
	t = document.title;
	return t = t.indexOf("#") > 0 ? encodeURI(t.substr(0, document.title.indexOf("#")).replace(/\_[\u4E00-\u9FA5]+\_\u817e\u8baf\u7f51/g, "")) : encodeURI(t.replace(/\_[\u4E00-\u9FA5]+\_\u817e\u8baf\u7f51/g, "")),
	e.title = varbtitle,
	e.source = 1000001,
	e.site = encodeURI("http://www.qq.com"),
	t = ARTICLE_INFO.article_url,
	e.url = t,
	e
},
_MI.ShareArticlePic = {
	boss: null,
	callback: null,
	tmpl: _MI.tmpl.shareArticlePic,
	build: function(e, t) {
		typeof GroupjsUrl == "undefined" && (this._body = _MUI.isString(e) ? _$(e) : e, this._pic = _$$(this._body, "img"), this._pref = t ? t: "qqcom", this.addEvent())
	},
	addEvent: function() {
		var e = this,
		t;
		setTimeout(function() {
			_MUI.each(e._pic,
			function(n) {
				var r = _MUI.width(n),
				i = _MUI.height(n),
				s;
				r > 150 && i > 150 && n.getAttribute("name") != "videoPic" && (i = n.parentNode.tagName.toLocaleLowerCase() == "a" ? n.parentNode: n, s = _MUI.html(e.tmpl)[0], _MUI.append(i.cloneNode(!0), s), _MUI.replace(s, i), t = _$$(s, ".mbArticleShareBtn")[0], s.onmouseover = function() {
					_MUI.A(s, "r") || (s.style.cssText += "width:" + r + "px;", _MUI.A(s, "r", 1)),
					_MUI.addClass(s, "hover")
				},
				s.onmouseout = function() {
					_MUI.removeClass(s, "hover")
				},
				t.onclick = function(t) {
					return _MUI.E(t).stop(),
					_MI.Share.pop({
						pic: n.src,
						pref: e._pref
					}),
					_MI.Bos("btnPicShareBtnClick", "", e._pref),
					!1
				})
			})
		},
		100)
	}
},
_MI.ShareArticle = {
	boss: null,
	callback: null,
	build: function(e, t) {
		this._body = _MUI.isString(e) ? _$(e) : e,
		this.addEvent(t)
	},
	addEvent: function(e) {
		var t = this;
		
		t._body && (e = e ? e: "qqcom", t._body.onclick = function() {	
			var pic = K(this).parent(5).find(".picto").attr("src");
			var target =  K(this).parent(5).find(".linkto").attr("href");
			
			varbtitle= encodeURIComponent(K(this).parent(5).find(".linkto").html());
			
			ARTICLE_INFO.article_url = target; 
			
			return _MI.Share.pop({
				pref: e,
				target: this,
				pic: pic
			}),
			!1
		})
	},
	getPicUrl: function(e) {
		e = _$$(document.getElementById(e), "img");
		var t,
		n = "";
		for (t in e) {
			var r = e[t],
			i = _MUI.width(r),
			s = _MUI.height(r);
			if (i > 100 || s > 100) {
				n = r.src;
				break
			}
		}
		return n
	}
},

_MI.ShareArticle2 = {
	boss: null,
	callback: null,
	build: function(e, t) {
		this._body = _MUI.isString(e) ? _$(e) : e,
		this.addEvent(t)
	},
	addEvent: function(e) {
		var t = this;
		t._body && (e = e ? e: "qqcom", t._body.onclick = function() {
			
			////console.log(K(this).parent(6));
			var pic = K(this).parent(6).find(".picto").attr("src");
			var target =  K(this).parent(6).find(".linkto").attr("href");
			varbtitle= encodeURIComponent(K(this).parent(6).find(".linkto").html());
			
			ARTICLE_INFO.article_url = target; 
			
			return _MI.Share.pop({
				pref: e,
				target: this,
				pic: pic
			}),
			!1
		})
	},
	getPicUrl: function(e) {
		e = _$$(document.getElementById(e), "img");
		var t,
		n = "";
		for (t in e) {
			var r = e[t],
			i = _MUI.width(r),
			s = _MUI.height(r);
			if (i > 100 || s > 100) {
				n = r.src;
				break
			}
		}
		return n
	}
},

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
	pop: function(e) {
		var t = _MI.ArticleInfo();
		e = e ? e: {};
		var n = "";
		
		typeof g_official_account != "undefined" && (n = "&source=" + g_official_account),
		this.pubUrl = this.url + "?title=" + (e.txt ? encodeURI(e.txt) : t.title) + (e.surl ? "&surl=" + e.surl: "&url=" + t.url) + (e.pic ? "&pic=" + e.pic: "") + "&pref=" + (e.pref ? e.pref: "qqcom") + n,
		this.article.pic = e.pic,
		this.article.pref = e.pref,
		this.article.pos = e.target,
		
		
		this.popup || (this.popup = new MI.Popup({
			title: "\u8f6c\u64ad\u5230\u817e\u8baf\u5fae\u535a",
			titleCls: "mblogo",
			width: 600,
			height: 200
		}));
		
		this.popwin();
		this.popup.src = this.pubUrl
		
	},
	popwin: function() {
		var e = MI.Login.getUin();
		//alert(e);
		var t = MI.S("account_mbid_" + e); 
		if(e===0){ 
			userLogin();
			// if(K.B.ie){
				// userLogin();
			// }else{ 
				// console.log("dada");
				// MI.Login.setCallback("publish_login", SUI.bind(this.show, this)), 
				// MI.AccountInfo.setCallback("publish_login", SUI.bind(this.show, this)), 
				
				// t = this.article.pref || "qq.com", 
				// MI.Login.popup.src = e ? "http://mini.t.qq.com/invite/quick.php?pref=" + t: "http://mini.t.qq.com/mblogin_quick.htm?pref=" + t, MI.Login.showPopup("publish_login", this.article.pos)				
			// }
		}else{ 
			this.show()
		} 
		// ! e(
			
			// // MI.Login.setCallback("publish_login", SUI.bind(this.show, this)), 
			// // MI.AccountInfo.setCallback("publish_login", SUI.bind(this.show, this)), 
			
			// // t = this.article.pref || "qq.com", 
			// // MI.Login.popup.src = e ? "http://mini.t.qq.com/invite/quick.php?pref=" + t: "http://mini.t.qq.com/mblogin_quick.htm?pref=" + t, MI.Login.showPopup("publish_login", this.article.pos)
		// ) 
		// : this.show()
		
		//console.log(this.article);
	},
	show: function() {
		var e = MI.Login.getUin();
		this.popup.showPopup();
	},
	hide: function() {
		this.popup.hidePopup()
	},
	close: function() {
		this.popup.closePopup()
	},
	publish: function() {
		var e = this;
		setTimeout(function() {
			var t = MI.Login.getUin(),
			n = MI.S("account_mbid_" + t);
			t && n ? e.show() : n || (window.mb_quick_reg_call = e.publish)
		},
		300)
	}
},
_MI.Portal = {},

_MUI.ready(function() {
	try {
		document.domain = "qq.com"
	} catch(e) {}
	var t = document.getElementById("proxy_ifrm");
	t || (t = _MUI.DC("iframe"), t.style.display = "none", t.setAttribute("id", "proxy_ifrm"), t.src = "http://radio.t.qq.com/proxy.html", _MUI.GT(document, "body")[0].appendChild(t))
})/*  |xGv00|fd1489243e5852ccbe157adb8273eb70 */