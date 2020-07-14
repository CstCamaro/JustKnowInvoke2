(function() {
    var SUGGEST_ITEM_NUMS_ = 9;
    var g = !0, h = null, k = !1;
    function ma(a) {
        if (a.persisted) r.value = "f";
        w.value = b.value;
    }
    function G() {
        if (e) {
            var a = documentFakeInput_ ? documentFakeInput_ :b;
            j.left = X(a, "offsetLeft") + "px";
            j.top = X(a, "offsetTop") + a.offsetHeight - 1 + "px";
            j.width = a.offsetWidth + "px";
            if (u) n.left = j.left, n.top = j.top, n.width = e.offsetWidth + "px", n.height = e.offsetHeight + "px";
        }
    }
    function H(a, c) {
        a.visibility = c ? "visible" :"hidden";
    }
    function P(a, c, b) {
        var e = document.createElement("input");
        e.type = "hidden";
        e.name = a;
        e.value = c;
        e.disabled = b;
        return x.appendChild(e);
    }
    function na() {
        q || s();
        q = k;
    }
    function oa() {
        if (q) window.event.cancelBubble = g, window.event.returnValue = k;
        q = k;
    }
    function Q(a) {
        var c = a.keyCode;
        if (27 == c && "visible" == j.visibility) return s(), I(f), a.cancelBubble = g, 
        a.returnValue = k;
        if (!z(c) && !A(c)) return g;
        J++;
        1 == J % 3 && R(c);
        return k;
    }
    function Y(a) {
        a = a.keyCode;
        (!K || !z(a) && !A(a)) && 0 == J && R(a);
        J = 0;
        return !(z(a) || A(a));
    }
    function R(a) {
        if (K && (z(a) || A(a))) {
            q = g;
            try {
                b.blur();
            } catch (c) {}
            window.setTimeout(S, 10);
        }
        if (b.value != v || 39 == a) if (f = b.value, 39 != a) w.value = f;
        A(a) ? Z(l + 1) :z(a) && Z(l - 1);
        G();
        B != f && !p && (p = window.setTimeout(s, 500));
        v = b.value;
        "" == v && !C && L();
    }
    function z(a) {
        return 38 == a || 63232 == a;
    }
    function A(a) {
        return 40 == a || 63233 == a;
    }
    function pa() {
        b.blur();
        r.value = this.a;
        if(scField)scField.value = "sugg";
        I(this.b);
        $ ? aa() && (ba(), x.submit()) :s();
    }
    function ba() {
        var a = x.elements.cid;
        if (T && a) a.value = T;
    }
    function ca() {
        if (!M) {
            if (m) m.className = t + "a";
            this.className = t + "b";
            m = this;
            for (var a = 0; a < o.length; a++) if (o[a] == m) {
                l = a;
                break;
            }
        }
    }
    function qa() {
        M && (M = k, ca.call(this));
    }
    function Z(a) {
        if ("" == B && "" != f) N = "", L(); else if (f == B && C && o && !(0 >= o.length)) if ("visible" == j.visibility) {
            var c = o.length;
            O && (c -= 1);
            if (m) m.className = t + "a";
            a == c || -1 == a ? (l = -1, I(f), S(), r.value = "f") :(a > c ? a = 0 :-1 > a && (a = c - 1), 
            l = a, m = o.item(a), m.className = t + "b", I(m.b), r.value = m.a);
        } else U();
    }
    function s() {
        p && (window.clearTimeout(p), p = h);
        H(j, k);
        u && H(n, k);
    }
    function U() {
        da && (H(j, g), u && H(n, g), G(), M = g);
    }
    function ea(data) {
        if(typeof(data) == "undefined" || data==null || data.length<2)  {
            return false;
        }
        if(scField)scField.value = "";
        data = data[1];
        var res = [f, []];
        for( i = 0; i < data.length; i++) {
            if(i == SUGGEST_ITEM_NUMS_) break;
            res[1].push([data[i], 0, i]);
        }
        a = res;
        0 < D && D--;
        if (a[0] == f) p && (window.clearTimeout(p), p = h), B = a[0], ra(a[1]), l = -1, 
        o = e.rows, (0 < o.length ? U :s)();
    }
    function aa() {
        if ("visible" == j.visibility) ba(); else {
            var a = x.elements.cid;
            if (a) a.value = fa.value;
        }
        s();
        w.disabled = g;
        if (w.value != b.value) r.value = o.item(l).a, w.disabled = k; else if (3 <= E || 10 <= D) r.value = "o";
        return g;
    }
    function L() {
        if (!da) return k;
        if (3 <= E) return k;
        if (N != f && f) {
            var a = (encodeURIComponent || escape)(f);
            D++;
            if (ga) {
                "function" != typeof window.soso_jpcall && (window.soso_jpcall = function(a) {
                    return ea(a);
                });
                var c = document.createElement("script");
                c.type = "text/javascript";
                c.async = g;
                c.id = "sososmartJsonpScriptTag";
                c.src = "http://" + ha + V + "&m=soso_jpcall&key=" + a;
                var a = document.getElementsByTagName("head")[0], b = document.getElementById("sososmartJsonpScriptTag");
                b && a.removeChild(b);
                a.appendChild(c);
            } else sa(a);
            S();
        }
        N = f;
        c = 100;
        for (a = 1; a <= (D - 2) / 2; ++a) c *= 2;
        C = window.setTimeout(L, c + 50);
        return g;
    }
    function I(a) {
        v = b.value = a;
    }
    function S() {
        b.focus();
    }
    function X(a, c) {
        for (var b = 0; a; ) b += a[c], a = a.offsetParent;
        return b;
    }
    function ra(a) {
        for (;0 < e.rows.length; ) e.deleteRow(-1);
        var c = 0, b;
        for (b in a) {
            var f = a[b];
            if (f) {
                c++;
                var d = e.insertRow(-1);
                d.onclick = pa;
                d.onmousedown = ia;
                d.onmouseover = ca;
                d.onmousemove = qa;
                d.b = f[0];
                d.a = f[2];
                d.className = t + "a";
                var j = document.createElement("td");
                j.appendChild(document.createTextNode(f[0]));
                j.className = t + "c";
                if (F && ta.test(f[0])) j.style.paddingTop = "2px";
                d.appendChild(j);
            }
        }
        if (O && 0 < c) a = e.insertRow(-1), a.onmousedown = ia, c = document.createElement("td"), 
        a.className = t + "e", b = document.createElement("span"), a.appendChild(c), c.appendChild(b), 
        b.appendChild(document.createTextNode(O)), b.onclick = function() {
            s();
            B = "";
            window.clearTimeout(C);
            C = h;
            r.value = "x";
        };
    }
    function ia(a) {
        a && a.stopPropagation ? (a.stopPropagation(), U(), b.focus()) :q = g;
        return k;
    }
    function ja() {
        var a = h;
        try {
            a = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (b) {
            try {
                a = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (d) {
                a = h;
            }
        }
        !a && "undefined" != typeof XMLHttpRequest && (a = new XMLHttpRequest());
        return a;
    }
    function sa(a) {
        d && 0 != d.readyState && 4 != d.readyState && d.abort();
        if (d) d.onreadystatechange = function() {};
        if (d = ja()) d.open("GET", V + "&w=" + a, g), d.onreadystatechange = function() {
            if (4 == d.readyState) switch (d.status) {
              case 403:
                E = 1e3;
                break;

              case 302:
              case 500:
              case 502:
              case 503:
                E++;
                break;

              case 200:
                ea(eval(d.responseText));

              default:
                E = 0;
            }
        }, d.send(h);
    }
    function ua() {
        var a = b.value;
        a != v && R(0);
        v = a;
    }
    function y(a, b, d) {
        a.addEventListener ? a.addEventListener(b, d, k) :a.attachEvent("on" + b, d);
    }
    var da = g, ga, v, f, N, B = "", C = h, o = h, m = h, l = -1, x, scField, b, e, j, u = h, n = h, r, w, d = h, V, ha = "api.sugg.sogou.com", T = "", fa, D = 0, E = 0, J = 0, p = h, K, q = k, M = k, ka, F, la, W = navigator.userAgent.toLowerCase();
    ka = -1 != W.indexOf("opera");
    F = -1 != W.indexOf("msie") && !ka;
    la = -1 != W.indexOf("webkit");
    var O = h, ta = RegExp("^[\\s\\u4E00-\\u9FFF\\uF900-\\uFAFF]+$"), t = "soso-smart-", $ = g;
    window.sososmart = {
        init:function(a, c, d, m, o, p, l, q, pid, _scField) {
            scField = _scField;
            x = a;
            b = c;
            documentFakeInput_ = p;
            ga = d;
            O = m;
            $ = o;
            q && (ha = q);
            if (ja() != h) {
                K = g;
                V = "/su?sc=qq&type=web" + (l ? "&smbid=" + l :"") + (pid ? "&pid=" + pid :"");
                T = l ? l :"";
                x.onsubmit = aa;
                b.setAttribute("autocomplete", "off");
                y(b, "blur", na);
                y(b, "beforedeactivate", oa);
                !F && b.addEventListener ? (la ? b.onkeydown = Q :b.onkeypress = Q, b.onkeyup = Y) :(y(b, F ? "keydown" :"keypress", Q), 
                y(b, "keyup", Y));
                f = N = v = b.value;
                e = document.createElement("table");
                e.id = "completeTable";
                e.cellSpacing = e.cellPadding = "0";
                j = e.style;
                e.className = t + "m";
                s();
                document.body.appendChild(e);
                if (F) u = document.createElement("iframe"), n = u.style, u.id = "completeIFrame", 
                n.zIndex = "1", n.position = "absolute", n.display = "block", n.borderWidth = 0, 
                document.body.appendChild(u);
                G();
                y(window, "resize", G);
                y(window, "pageshow", ma);
                K && window.setInterval(ua, 10);
                r = P("idx", "f", k);
                w = P("ori", f, g);
                a = a.elements.cid;
                fa = P("origCid", a ? a.value :"", g);
                L();

				if(document.addEventListener){
				    document.addEventListener("click", registerSearch2, false);
				    document.getElementById("completeTable").addEventListener("click", smartboxClick, false);
			   	}
				else if(document.attachEvent){
				    document.attachEvent("onclick", registerSearch2);
				    document.getElementById("completeTable").attachEvent("onclick", smartboxClick);
			    }
            }
        }
    };
})();/*  |xGv00|96ff80074544806f2641510407bc5bfb */