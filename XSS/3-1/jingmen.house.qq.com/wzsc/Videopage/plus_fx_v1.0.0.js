(function(g) {
    var f = g.Koala,
    c = Math.pow,
    e = Math.sin,
    l = Math.PI,
    i = 1.70158,
    d = 1,
    h = "KoloaData" + ( + new Date() + "").slice( - 8),
    b = [],
    j = {};
    f.P.fn.extend({
        go: function(o, q, s, r) {
            var p = this,
            n, m = k.setOptions(this, q, s, r);
            if (f.C.isFunction(o)) {
                n = o().type
            } else {
                n = null
            }
            o = k.setProps(p, o, n);
            k.queue(p,
            function() {
                var u = {},
                w = {},
                v;
                f.A.each(o,
                function(x, y) {
                    if (n === "showfx") {
                        if (y === "opacity") {
                            k.setOpacity(p, "0")
                        } else {
                            p.css(y, "0px")
                        }
                    }
                    u[y] = k.parseStyle(k.getStyleNew(p, y));
                    w[y] = k.parseStyle(o[y])
                });
                var t = new a(p, m, o, n);
                t.start(u, w)
            });
            return this
        },
        delay: function(m) {
            if (f.C.isNumber(m)) {
                k.queue(this, m)
            }
            return this
        },
        fadeOut: function(m, o, n) {
            this.go(function() {
                return k.fxAttrs("hidefx", 2)
            },
            m, o, n);
            return this
        },
        fadeIn: function(m, o, n) {
            this.go(function() {
                return k.fxAttrs("showfx", 2)
            },
            m, o, n);
            return this
        },
        showfx: function(n, p, o) {
            var m = this.ele;
			if(this.css("display")==="none"){
				this.css("display:block");
			};
            if (n) {
                this.go(function() {
                    return k.fxAttrs("showfx", 0)
                },
                n, p, o)
            } else {
                m.showfx()
            }
            return this
        },
        hidefx: function(n, p, o) {
            var m = this;
            if (n) {
                this.go(function() {
                    return k.fxAttrs("hidefx", 0)
                },
                n, p, o)
            } else {
                m.hidefx()
            }
            return this
        },
        slideDown: function(m, o, n) {
			if(this.css("display")==="none"){
				this.css("display:block");
			};
            this.go(function() {
                return k.fxAttrs("showfx", 1)
            },
            m, o, n);
            return this
        },
        slideUp: function(m, o, n) {
            this.go(function() {
                return k.fxAttrs("hidefx", 1)
            },
            m, o, n);
            return this
        },
        slideToggle: function(n, p, o) {
            var m = this;
            k.getStyleNew(m, "display") === "none" ? this.slideDown(n, p, o) : this.slideUp(n, p, o);
            return this
        },
        showToggle: function(n, p, o) {
            var m = this;
            k.getStyleNew(m, "display") === "none" ? this.showfx(n, p, o) : this.hidefx(n, p, o);
            return this
        },
        fadeToggle: function(n, p, o) {
            var m = this;
            k.getStyleNew(m, "display") === "none" ? this.fadeIn(n, p, o) : this.fadeOut(n, p, o);
            return this
        }
    });
    var k = {
        Easing: {
            linear: function(m) {
                return m
            },
            easeIn: function(m) {
                return m * m
            },
            easeOut: function(m) {
                return (2 - m) * m
            },
            easeBoth: function(m) {
                return (m *= 2) < 1 ? 0.5 * m * m: 0.5 * (1 - (--m) * (m - 2))
            },
            easeInStrong: function(m) {
                return m * m * m * m
            },
            easeOutStrong: function(m) {
                return 1 - (--m) * m * m * m
            },
            easeBothStrong: function(m) {
                return (m *= 2) < 1 ? 0.5 * m * m * m * m: 0.5 * (2 - (m -= 2) * m * m * m)
            },
            easeOutQuart: function(m) {
                return - (c((m - 1), 4) - 1)
            },
            easeInOutExpo: function(m) {
                if (m === 0) {
                    return 0
                }
                if (m === 1) {
                    return 1
                }
                if ((m /= 0.5) < 1) {
                    return 0.5 * c(2, 10 * (m - 1))
                }
                return 0.5 * ( - c(2, -10 * --m) + 2)
            },
            easeOutExpo: function(m) {
                return (m === 1) ? 1 : -c(2, -10 * m) + 1
            },
            swingFrom: function(m) {
                return m * m * ((i + 1) * m - i)
            },
            swingTo: function(m) {
                return (m -= 1) * m * ((i + 1) * m + i) + 1
            },
            backIn: function(m) {
                if (m === 1) {
                    m -= 0.001
                }
                return m * m * ((i + 1) * m - i)
            },
            backOut: function(m) {
                return (m -= 1) * m * ((i + 1) * m + i) + 1
            },
            bounce: function(m) {
                var n = 7.5625,
                o;
                if (m < (1 / 2.75)) {
                    o = n * m * m
                } else {
                    if (m < (2 / 2.75)) {
                        o = n * (m -= (1.5 / 2.75)) * m + 0.75
                    } else {
                        if (m < (2.5 / 2.75)) {
                            o = n * (m -= (2.25 / 2.75)) * m + 0.9375
                        } else {
                            o = n * (m -= (2.625 / 2.75)) * m + 0.984375
                        }
                    }
                }
                return o
            }
        },
        speed: {
            slow: 600,
            fast: 200,
            defaults: 400
        },
        fxAttrs: function(o, n) {
            var m = [["width", "height", "opacity", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"], ["height", "paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"], ["opacity"]];
            return {
                attrs: m[n],
                type: o
            }
        },
        getStyleNew: function(n, m) {
			if(m==="width"){
				return n.width()+"px";
			}
			if(m==="height"){
				return n.height()+"px";
			}
            if ((m === "left" || m === "right" || m === "top" || m === "bottom") && n.getStyle(m) === "auto") {
                return "0px"
            }
            if ((m === "marginRight" || m === "marginLeft" || m === "marginTop" || m === "marginBottom") && n.getStyle(m) === "auto") {
                return "0px"
            }
            if (m === "opacity") {
                var o = n.opacity();
                return (o === 1 || o === 0) ? o.toFixed(0) : o.toFixed(1)
            }
            if ((m === "borderTopWidth" || m === "borderRightWidth" || m === "borderBottomWidth" || m === "borderLeftWidth") && (n.getStyle(m) === "thin" || n.getStyle(m) === "medium" || n.getStyle(m) === "thick")) {
                return "0px"
            }
            return n.getStyle(m) + ""
        },
        parseColor: function(s) {
            var q, p, o;
            if (/rgb/.test(s)) {
                var n = s.match(/\d+/g);
                q = n[0];
                p = n[1];
                o = n[2]
            } else {
                if (/#/.test(s)) {
                    var m = s.length;
                    if (m === 7) {
                        q = parseInt(s.slice(1, 3), 16);
                        p = parseInt(s.slice(3, 5), 16);
                        o = parseInt(s.slice(5), 16)
                    } else {
                        if (m === 4) {
                            q = parseInt(s.charAt(1) + s.charAt(1), 16);
                            p = parseInt(s.charAt(2) + s.charAt(2), 16);
                            o = parseInt(s.charAt(3) + s.charAt(3), 16)
                        }
                    }
                } else {
                    return s
                }
            }
            return {
                r: parseFloat(q),
                g: parseFloat(p),
                b: parseFloat(o)
            }
        },
        parseStyle: function(o) {
            var n = parseFloat(o),
            m = o.replace(/^[\-\d\.]+/, "");
            return isNaN(n) ? {
                val: this.parseColor(m),
                unit: "",
                fn: function(q, s, t, w) {
                    var v = (q.r + (s.r - q.r) * w).toFixed(0),
                    u = (q.g + (s.g - q.g) * w).toFixed(0),
                    p = (q.b + (s.b - q.b) * w).toFixed(0);
                    return "rgb(" + v + "," + u + "," + p + ")"
                }
            }: {
                val: n,
                unit: m,
                fn: function(p, q, r, s) {
                    return (p + (q - p) * s).toFixed(3) + r
                }
            }
        },
        newObj: function(m, o) {
            o = o !== undefined ? o: 1;
            var n = {};
            f.A.each(m,
            function(p, q) {
                n[p] = o
            });
            return n
        },
        setOptions: function(p, o, r, q) {
            var m = this,
            n = {};
            n.duration = (function(s) {
                if (f.C.isNumber(s)) {
                    return s
                } else {
                    if (f.C.isString(s) && m.speed[s]) {
                        return m.speed[s]
                    } else {
                        if (!s) {
                            return m.speed.defaults
                        }
                    }
                }
            })(o);
            n.callback = function() {
                if (f.C.isFunction(q)) {
                    q()
                }
                m.dequeue(p)
            };
            n.easing = (function(s) {
                if (f.C.isString(s) && k.Easing[s]) {
                    return k.Easing[s]
                } else {
                    if (f.C.isFunction(s)) {
                        return s
                    } else {
                        return k.Easing.easeBoth
                    }
                }
            })(r);
            return n
        },
        setProps: function(q, o, n) {
            if (n) {
                var m = o().attrs,
                n = o().type,
                t,
                s,
                r;
                if (n === "hidefx") {
                    t = m[0] === "opacity" ? "0": "0px";
                }
                s = this.newObj(m, t);
                if (n === "showfx") {
                    for (r in s) {
                        s[r] = this.getStyleNew(q, r)
                    }
                }
                return s
            } else {
                if (o && typeof o === "object") {
                    return o
                }
            }
        },
        data: function(n, q, p) {
            if (f.C.isString(n)) {
                if (q !== undefined) {
                    j[n] = q
                }
                return j[n]
            } else {
                if (f.C.isObj(n)) {
                    var m, o;
                    if (!n[h]) {
                        m = n[h] = ++d;
                        o = j[m] = {}
                    } else {
                        m = n[h];
                        o = j[m]
                    }
                    if (!o[h]) {
                        o[h] = {}
                    }
                    if (p !== undefined) {
                        o[h][q] = p
                    }
                    return o[h][q]
                }
            }
        },
        removeData: function(o, q) {
            if (f.C.isString(o)) {
                delete j[o]
            } else {
                if (f.C.isObj(o)) {
                    if (!o[h]) {
                        return
                    }
                    var p = function(s) {
                        var r;
                        for (r in s) {
                            return false
                        }
                        return true
                    },
                    n = function() {
                        try {
                            delete o[h]
                        } catch(r) {
                            o.removeAttribute(h)
                        }
                    },
                    m = o[h];
                    if (q) {
                        delete j[m][h][q];
                        if (p(j[m][h])) {
                            delete j[m];
                            n()
                        }
                    } else {
                        delete j[m];
                        n()
                    }
                }
            }
        },
        queue: function(n, m) {
            var o = this.data(n, "KQueue") || this.data(n, "KQueue", []);
            if (m) {
                o.push(m)
            }
            if (o[0] !== "runing") {
                this.dequeue(n)
            }
        },
        dequeue: function(o) {
            var m = this,
            p = m.data(o, "KQueue") || m.data(o, "KQueue", []),
            n = p.shift();
            if (n === "runing") {
                n = p.shift()
            }
            if (n) {
                p.unshift("runing");
                if (f.C.isNumber(n)) {
                    setTimeout(function() {
                        m.dequeue(o)
                    },
                    n)
                } else {
                    if (f.C.isFunction(n)) {
                        n.call(o,
                        function() {
                            m.dequeue(o)
                        })
                    }
                }
            }
            if (!p.length) {
                m.removeData(o, "KQueue")
            }
        },
        setOpacity: function(m, n) {
            if ("getComputedStyle" in g) {
                m.node.style.opacity = n === 1 ? "": n
            } else {
                m.node.style.zoom = 1;
                m.node.style.filter = n === 1 ? "": "alpha(opacity=" + n * 100 + ")"
            }
        }
    };
    var a = function(p, m, o, n) {
        this.ele = p;
        this.options = m;
        this.props = o;
        this.type = n
    };
    a.prototype = {
        start: function(n, o) {
            this.startTime = +new Date();
            this.source = n;
            this.target = o;
            b.push(this);
            var m = this;
            if (m.timer) {
                return
            }
            m.timer = g.setInterval(function() {
                for (var p = 0,
                q; q = b[p++];) {
                    q.run()
                }
                if (!b.length) {
                    m.stop()
                }
            },
            13)
        },
        run: function(q) {
            var E = this.ele,
            z = this.type,
            A = this.props,
            n = this.startTime,
            F = +new Date(),
            o = this.options.duration,
            u = n + o,
            D = F > u ? 1 : (F - n) / o,
            y = this.options.easing(D),
            w = 0,
            r = 0,
            m;
            for (m in A) {
                w += 1
            }
            E.css("overflow", "hidden");
            if (z === "showfx") {
                E.css("display:block");
            }
            for (m in A) {
                r += 1;
                var C = this.source[m].val,
                s = this.target[m].val,
                v = this.target[m].unit;
                if (q || F >= u) {
                    E.css("overflow", "");
                    if (z === "hidefx") {
                        E.css("display:none")
                    }
                    if (z) {
                        if (m === "opacity") {
                            k.setOpacity(E, 1)
                        } else {
                            E.css(m, (z === "hidefx" ? C: s) + v)
                        }
                    } else {
                        E.css(m, /color/i.test(m) ? "rgb(" + s.r + "," + s.g + "," + s.b + ")": s + v)
                    }
                    if (r === w) {
                        this.complete();
                        this.options.callback.call(E)
                    }
                } else {
                    if (C === s) {
                        continue
                    }
                    var B = this.target[m].fn(C, s, v, y);
                    if (m === "opacity") {
                        k.setOpacity(E, (C + (s - C) * y).toFixed(3))
                    } else {
                        E.css(m, B)
                    }
                }
            }
        },
        complete: function() {
            for (var m = b.length - 1; m >= 0; m--) {
                if (this === b[m]) {
                    b.splice(m, 1)
                }
            }
        },
        stop: function() {
            window.clearInterval(this.timer);
            this.timer = undefined
        }
    }
})(window);/*  |xGv00|a6e0352a3f30a10128d4ac1bdb5fd603 */