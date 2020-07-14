!function (w, d) {
    var uc = function (a) {
        return encodeURIComponent(a)
    }, str2json = function (s) {
        if (w.JSON) try {
            return w.JSON.parse(s)
        } catch (e) {
            return null
        } else try {
            return eval("var __txjson__=" + s), __txjson__
        } catch (e) {
            return null
        }
    }, doUrl = function (a) {
        var b = "http://read.v.t.qq.com?", c = a.ModuleConfigure, d = a.TimelineDetail, e = a.PubModuleConfigure,
            f = a.TitleModuleConfigure, g = function (a) {
                return a.RelayId ? "relayid=" + uc(a.RelayId) + "&" : a.ReplyId ? "replyid=" + uc(a.ReplyId) + "&" : ""
            }(e);
        return b + g + ["config=" + [a.appkey, a.theme, a.nobg, [1, c.TitleModule, c.PubModule, c.TabModule, c.TimelineModule].join(""), d.PageStyle, d.PicStyle, d.HeadStyle, d.TwitterNum, [e.position].concat(e.InsertFunction).join(""), a.LoginStyle || 0].join("-"), "account=" + f.OfficialAccount, "sendbox=" + [uc(e.SourceUrl), uc(e.InitialContent)].join("|")].join("&")
    }, doParam = function (a) {
        for (var b = [], c = ["Name", "ConditionType", "Condition", "SortType", "Famous", "ContentType", "MessageType"], d = 0, e = a.length; e > d; d++) {
            for (var f = [], g = 0, h = c.length; h > g; g++) "Condition" === c[g] ? f.push(uc(a[d][c[g]].join("	"))) : f.push(a[d][c[g]]);
            b.push(f.join("	"))
        }
        return b.join("\n")
    }, callback = function (a, b, c, d) {
        var e = b.TimelineDetail.PageStyle, f = function (b) {
            var e = function (e) {
                if (e && (e = str2json(e), null !== e)) if (e.loginCallback && d && d(e.type), "resize" === e.action) {
                    if (2 !== b) return;
                    a.height !== e.data.height && (a.height = e.data.height)
                } else if (void 0 !== c) return c(e)
            };
            if (2 === b || c) if (window.postMessage) window.addEventListener ? window.addEventListener("message", function (a) {
                e(a.data)
            }) : window.attachEvent("onmessage", function (a) {
                e(a.data)
            }); else {
                {
                    a.contentWindow
                }
                setInterval(function () {
                    a.clientWidth > 0 && a.clientHeight > 0 && (e(window.name), window.name = "")
                }, 500)
            }
        }, g = function (b, c) {
            b.postMessage ? b.postMessage(c, "*") : b.name = c, a.hasCallBack || (f(e), a.hasCallBack = !0)
        }, h = function (a, b) {
            a.onreadystatechange = function () {
                "complete" === a.readyState && b()
            }
        }, i = function () {
            var c = a.contentWindow, d = doParam(b.TimelineModuleConfigure);
            return g(c, d || "0"), !1
        };
        window.postMessage ? document.all ? h(a, i) : a.onload = i : h(a, i), a.src = doUrl(b)
    };
    w.console = w.console || {
        log: function () {
        }
    }, w.showTxWbYDQ = callback
}(window, document);/*  |xGv00|945f4804ed372d2ab2f36cb0059ea097 */