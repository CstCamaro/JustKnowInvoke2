/*! [ishare] */
/* version:1.1 */
/* author:zomiezhang | deanhuang */
/*2016-3-18 */
! function() {
    function a(a, b) {
        this.target = a, this.name = b || a.toString()
    }

    function b(a) {
        this.targets = {}, this.name = a
    }
    var c = "postMessage" in window;
    a.prototype.postMessage = c ? function(a) {
        this.target.postMessage(a, "*")
    } : function(a) {
        var b = window.navigator["__QC__" + this.name];
        "function" == typeof b && b(a, window)
    }, b.prototype.addTarget = function(b, c) {
        var d = new a(b, c);
        this.targets[d.name] = d
    }, b.prototype.listenMessage = function(a) {
        c ? "addEventListener" in document ? window.addEventListener("message", a, !1) : "attachEvent" in document && window.attachEvent("onmessage", a) : window.navigator["__QC__" + this.name] = a
    }, window.Messenger = b
}(),
function(a) {
    var b = a.iShareNew = function(a) {
        return new b.fn.init(a)
    };
    b.fn = b.prototype = {
        g: function(a) {
            return document.getElementById(a)
        },
        cssReady: !1,
        jsReady: !1,
        infoArray: [],
        init: function(a) {
            var b = this;
            this.uid = (new Date).getTime() + this.RndNum(8), this.coreJS = "//mat1.gtimg.com/www/js/jquery/jquery-1.9.1.min.js", this.coreCSS = "http://ln.qq.com/images/c/startup/share.css?20160318", this.infoArray.push({
                uid: this.uid,
                ages: a
            }), a.ContentId || document.write("<div id='shareWRAP_" + this.uid + "'></div>"), this.cssReady ? "undefined" != typeof jQuery ? (b.jsReady = !0, b.checkSta()) : b.loadCore(b.coreJS, "js", function() {
                b.jsReady = !0, b.checkSta()
            }) : this.loadCore(this.coreCSS, "css", function() {
                b.cssReady = !0, "undefined" != typeof jQuery ? (b.jsReady = !0, b.checkSta()) : b.loadCore(b.coreJS, "js", function() {
                    b.jsReady = !0, b.checkSta()
                })
            })
        },
        RndNum: function(a) {
            for (var b = "", c = 0; a > c; c++) b += Math.floor(10 * Math.random());
            return b
        },
        checkSta: function() {
            if (this.cssReady && this.jsReady) {
                ! function(a) {
                    var b = [],
                        c = 0,
                        d = {
                            bossName: {
                                mode: {
                                    iShareWrap: "\u56FE\u6807\u5F0F",
                                    iShareFloatWrap: "\u60AC\u6D6E\u5F0F\u53F3\u4FA7",
                                    iShareFloatWrapLeft: "\u60AC\u6D6E\u5F0F\u5DE6\u4FA7"
                                },
                                button: {
                                    tsina: ["\u65B0\u6D6A\u5FAE\u535A", !1],
                                    tqq: ["\u817E\u8BAF\u5FAE\u535A", !0, 580, 356],
                                    QQ: ["QQ", !0, 720, 511],
                                    qzone: ["QQ\u7A7A\u95F4", !0, 602, 400, 305],
                                    mail: ["QQ\u90AE\u7BB1", !0, 600, 588],
                                    kaixin001: ["\u5F00\u5FC3\u7F51", !1],
                                    renren: ["\u4EBA\u4EBA\u7F51", !1],
                                    weixin: ["\u5FAE\u4FE1", !0, 280, 115],
                                    fb: ["Facebook", !1],
                                    twitter: ["Twitter", !1]
                                }
                            },
                            floatColor: {
                                1: {
                                    blue: "//mat1.gtimg.com/joke/tomiezhang/ishare/r1.gif",
                                    black: "//mat1.gtimg.com/joke/tomiezhang/ishare/r2.gif",
                                    gray: "//mat1.gtimg.com/joke/tomiezhang/ishare/r3.gif",
                                    blues: "//mat1.gtimg.com/joke/tomiezhang/ishare/r4.gif",
                                    green: "//mat1.gtimg.com/joke/tomiezhang/ishare/r5.gif",
                                    org: "//mat1.gtimg.com/joke/tomiezhang/ishare/r6.gif",
                                    red: "//mat1.gtimg.com/joke/tomiezhang/ishare/r7.gif",
                                    pink: "//mat1.gtimg.com/joke/tomiezhang/ishare/r8.gif",
                                    blood: "//mat1.gtimg.com/joke/tomiezhang/ishare/r9.gif"
                                },
                                2: {
                                    blue: "//mat1.gtimg.com/joke/tomiezhang/ishare/l1.gif",
                                    black: "//mat1.gtimg.com/joke/tomiezhang/ishare/l2.gif",
                                    gray: "//mat1.gtimg.com/joke/tomiezhang/ishare/l3.gif",
                                    blues: "//mat1.gtimg.com/joke/tomiezhang/ishare/l4.gif",
                                    green: "//mat1.gtimg.com/joke/tomiezhang/ishare/l5.gif",
                                    org: "//mat1.gtimg.com/joke/tomiezhang/ishare/l6.gif",
                                    red: "//mat1.gtimg.com/joke/tomiezhang/ishare/l7.gif",
                                    pink: "//mat1.gtimg.com/joke/tomiezhang/ishare/l8.gif",
                                    blood: "//mat1.gtimg.com/joke/tomiezhang/ishare/r9.gif"
                                }
                            },
                            cssMOD: ["iShareWrap", "iShareFloatWrap", "iShareFloatWrapLeft"]
                        }, e = {
                            getpic: function() {
                                var b = [];
                                return a("img").length > 0 && a("img").each(function() {
                                    a(this).width() > 150 && a(this).height() > 150 && b.push(a(this).attr("src"))
                                }), b
                            },
                            pushDate: function(a, b, c, d) {
                                window.bossimg = new Image(1, 1);
                                var f = "";
                                if ("function" == typeof trimUin && "function" == typeof pgvGetCookieByName) try {
                                    f = trimUin(pgvGetCookieByName("o_cookie="))
                                } catch (g) {}
                                window.bossimg.src = "http://btrace.qq.com/collect?sIp=&iQQ=" + f + "&sBiz=ishare&sOp=&iSta=&iTy=1729&iFlow=" + e.RndNum(9) + "&mode=" + encodeURIComponent(a) + "&button=" + encodeURIComponent(b) + "&url=" + encodeURIComponent(c) + "&site=" + encodeURIComponent(d)
                            },
                            getDomain: function(a) {
                                var b = /http:\/\/([^\/]+)\//i;
                                return domain = a.match(b), null == domain ? "" : domain[1]
                            },
                            getMeta: function() {
                                var a = document.getElementsByTagName("meta"),
                                    b = "";
                                for (i in a) "undefined" != typeof a[i].name && "description" == a[i].name.toLowerCase() && (b = a[i].content);
                                return b
                            },
                            RndNum: function(a) {
                                for (var b = "", c = 0; a > c; c++) b += Math.floor(10 * Math.random());
                                return b
                            }
                        }, f = {
                            tqq: function(a, b, c) {
                                return "http://share.v.t.qq.com/index.php?c=share&a=index&cs=1&bm=110&appkey=801300956&url=" + encodeURIComponent(a) + "&pic=" + encodeURIComponent(b) + "&title=" + encodeURIComponent(c)
                            },
                            QQ: function(a, b, c, d) {
                                return "http://connect.qq.com/widget/shareqq/iframe_index.html?url=" + encodeURIComponent(a) + "&showcount=0&desc=" + encodeURIComponent("\u52A0\u70B9\u8BC4\u8BBA\u5427...") + "&summary=" + encodeURIComponent(d) + "&title=" + encodeURIComponent(c) + "&pics=&style=203&width=19&height=22"
                            },
                            qzone: function(a, b, c) {
                                return "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(a) + "&where=10&pics=" + encodeURIComponent(b) + "&desc=" + encodeURIComponent(c)
                            },
                            weixin: function(a) {
                                return "http://joke.qq.com/QQCOMQRCODE.htm?url=" + encodeURIComponent(a)
                            },
                            mail: function(a, b, c) {
                                return b ? "http://mail.qq.com/cgi-bin/qm_share?url=" + encodeURIComponent(a) + "&to=qqmail&desc=" + encodeURIComponent(c) + "&summary=" + encodeURIComponent(e.getMeta()) + "&title=" + encodeURIComponent(c) + "&pics=" + encodeURIComponent(b) + "&site=" : "http://mail.qq.com/cgi-bin/qm_share?url=" + encodeURIComponent(a) + "&to=qqmail&desc=" + encodeURIComponent(c) + "&summary=" + encodeURIComponent(e.getMeta()) + "&title=" + encodeURIComponent(c) + "&site="
                            }
                        };
                    a.fn.ishareNew = function(g) {
                        var h = {
                            mod: 0,
                            icon: 2,
                            share: ["tsina", "tqq", "QQ", "qzone", "mail", "weixin", "kaixin001", "renren"],
                            shareword: document.title,
                            isShowTime: !0,
                            top: "150px",
                            bgStyle: "green",
                            shareurl: document.location.href,
                            sharepic: e.getpic()[0],
                            ContentId: null
                        }, i = a.extend(h, g.ages);
                        return this.each(function() {
                            var h = i,
                                j = g.uid,
                                k = "";
                            if (k += '<div id="iShareNew_' + j + '" class="' + d.cssMOD[h.mod] + '"', 1 == h.mod && h.top && h.bgStyle || 2 == h.mod && h.top && h.bgStyle) {
                                k += ' style="top:' + h.top + ';">', k += '<div class="neibu">', k += '<div class="shareBar"><img src="' + d.floatColor[h.mod][h.bgStyle] + '"/></div><div class="shareCoent">', k += '<div class="title"><span class="closeTips" title="\u4E0D\u518D\u663E\u793A\u5206\u4EAB\u6309\u94AE"></span>', k += h.isShowTime ? "<em>\u5206\u4EAB\u6B21\u6570:<strong class='showTime_" + h.icon + "'></strong></em>" : "<em>\u5206\u4EAB\u6B21\u6570...</em>", k += "</div>";
                                for (var l = 0; l < h.share.length; l++) k += '<a href="javascript:;" class="iShare_' + h.icon + "_" + h.share[l] + '" name="' + h.share[l] + '" title="\u5206\u4EAB\u6B21\u6570' + d.bossName.button[h.share[l]][0] + '"><span class="icon"></span><span class="text">' + d.bossName.button[h.share[l]][0] + "</span></a>";
                                k += "</div>", k += "</div>"
                            } else {
                                k += ">";
                                for (var l = 0; l < h.share.length; l++) k += '<a href="javascript:;" class="iShare_' + h.icon + "_" + h.share[l] + '" name="' + h.share[l] + '" title="\u5206\u4EAB\u6B21\u6570' + d.bossName.button[h.share[l]][0] + '"></a>';
                                h.isShowTime && (k += "<a href='javascript:;' class='showTime_" + h.icon + "'></a>")
                            }
                            k += "</div>", a(".iShareNewMask")[0] || a("body").append('<div class="iShareNewMask"></div><div class="iShareNewWrapBrower"><div class="iShareNewWrapMain"><div class="iShareNew_layer_title"> <h3>分享到</h3><a title="关闭" class="del_fri" href="javascript:void(0)">X</a></div><div class="iShareNew_layer_cont"><iframe id="iShareNew_layer_cont_iframe" frameborder="0" name="iShareNew_layer_cont_iframe" marginheight="0" marginwidth="0"  scrolling="no"></iframe></div></div></div>'), a(this).html(k), h.isShowTime && b.push({
                                u: "http://i.jiathis.com/url/shares.php?url=" + encodeURIComponent(h.shareurl),
                                el: "#iShareNew_" + j,
                                child: ".showTime_" + h.icon
                            }), a("#iShareNew_" + j).find(".showTime_" + h.icon).html("0"), a("#iShareNew_" + j).find(".closeTips").click(function() {
                                a("#iShareNew_" + j).hide()
                            });
                            var m = function() {
                                a(".iShareNewMask").hide(), a(".iShareNewWrapBrower").hide(), a(".iShareNew_layer_cont").html('<iframe id="iShareNew_layer_cont_iframe" frameborder="0" name="iShareNew_layer_cont_iframe" marginheight="0" marginwidth="0"  scrolling="no"></iframe>'), a(".iShareNew_layer_cont").height("auto")
                            };
                            a("#iShareNew_" + j).find("a").unbind("click").bind("click", function() {
                                if (d.bossName.button[a(this).attr("name")][1]) {
                                    var b = d.bossName.button[a(this).attr("name")][2],
                                        c = d.bossName.button[a(this).attr("name")][3],
                                        g = d.bossName.button[a(this).attr("name")][4];
                                    a(".iShareNewMask").show().height(a(document).height()), a(".iShareNewWrapBrower").show(), a(".iShareNew_layer_title").find("h3").html("\u5206\u4EAB\u5230" + d.bossName.button[a(this).attr("name")][0]), a("#iShareNew_layer_cont_iframe").attr("src", f[a(this).attr("name")](h.shareurl, h.sharepic, h.shareword, e.getMeta())), window.QQshareCallback = function(b) {
                                        if ("close" == b.data) m();
                                        else {
                                            var c = a.parseJSON(b.data);
                                            "resize" == c.action && a(".iShareNew_layer_cont").height(c.data.height), "success" == c.action && m()
                                        }
                                    }, window.QZONE = {
                                        FrontPage: {
                                            closePopup: function() {
                                                m()
                                            }
                                        }
                                    };
                                    var i = new Messenger("topWin");
                                    i.listenMessage(QQshareCallback), a("#iShareNew_layer_cont_iframe").load(function() {
                                        "undefined" == typeof h.sharepic && g ? a(this).height(g) : a(this).height(c), a(this).width(b), a(".iShareNewWrapBrower").css("width", b + 2 + "px").css("top", (a(window).height() - c) / 2 + a(window).scrollTop() + "px").css("left", (a(window).width() - b) / 2 + a(window).scrollLeft() + "px")
                                    }), a("body").append('<iframe id="iShareNew_layer_cont_count_iframe" frameborder="0" marginheight="0" marginwidth="0" src="http://s.jiathis.com/?webid=qzone&url=' + encodeURIComponent(h.shareurl) + "&title=" + encodeURIComponent(h.shareword) + "&pic=" + encodeURIComponent(h.sharepic) + '&uid=1626433&jid=1344496797938582" scrolling="no" style="width:1px;height:1px;display:none"></iframe>'), a("#iShareNew_layer_cont_count_iframe").load(function() {
                                        a(this).remove()
                                    })
                                } else window.open("http://s.jiathis.com/?webid=" + a(this).attr("name") + "&url=" + encodeURIComponent(h.shareurl) + "&title=" + encodeURIComponent(h.shareword) + "&pic=" + encodeURIComponent(h.sharepic) + "&uid=1626433&jid=1344496797938582", "\u817E\u8BAF\u7F51ishare", "height=600, width=560,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no,top=200,left=200");
                                return e.pushDate(d.bossName.mode[a("#iShareNew_" + j).attr("class")], d.bossName.button[a(this).attr("name")], h.shareurl, e.getDomain(h.shareurl)), !1
                            }), a(".del_fri").click(function() {
                                m()
                            }), 1 == h.mod && (a("html").css({
                                position: "relative",
                                "overflow-x": "hidden"
                            }), a("." + d.cssMOD[h.mod]).find(".neibu").bind("mouseenter", function(b) {
                                b = b ? b : window.event;
                                var c = b.srcElement ? b.srcElement : b.target;
                                ("IMG" == c.tagName || "DIV" == c.tagName) && a(this).parent().animate({
                                    right: "0px"
                                })
                            }).bind("mouseleave", function() {
                                var b = this;
                                setTimeout(function() {
                                    a(b).parent().animate({
                                        right: "-216px"
                                    }, "fast")
                                }, 400)
                            })), 2 == h.mod && (a("html").css({
                                position: "relative",
                                "overflow-x": "hidden"
                            }), a("." + d.cssMOD[h.mod]).find(".neibu").bind("mouseenter", function(b) {
                                ("IMG" == b.target.nodeName || "DIV" == b.target.nodeName) && a(this).parent().animate({
                                    left: "0px"
                                }, "fast")
                            }).bind("mouseleave", function() {
                                var b = this;
                                setTimeout(function() {
                                    a(b).parent().animate({
                                        left: "-216px"
                                    }, "fast")
                                }, 400)
                            })), window.$CKE = {
                                rdc: function(d) {
                                    var e = 0;
                                    e = parseInt(d.shares) < 1e3 ? parseInt(d.shares) : Math.ceil(parseInt(d.shares) / 1e3) + "K", a(b[c].el).find(b[c].child).html(e), c < b.length && a.getScript(b[++c].u)
                                }
                            }, b.length > 0 && a.getScript(b[c].u)
                        })
                    }
                }(jQuery);
                var a = "function" == typeof $j ? $j : $;
                a.each(this.infoArray, function(b, c) {
                    c.ages.ContentId ? a("#" + c.ages.ContentId).ishareNew(c) : a("#shareWRAP_" + c.uid).ishareNew(c)
                })
            } else this.init()
        },
        isCssCreat: !1,
        loadCore: function(a, b, c) {
            if ("js" == b) try {
                var d = document.createElement("script");
                d.src = a, d.id = "coreJS", d.type = "text/javascript", this.g("coreJS") || document.getElementsByTagName("head")[0].appendChild(d), d.addEventListener ? d.addEventListener("load", c, !1) : d.attachEvent && d.attachEvent("onreadystatechange", function() {
                    (4 == d.readyState || "complete" == d.readyState || "loaded" == d.readyState) && c()
                })
            } catch (e) {
                c()
            } else if (this.isCssCreat) try {
                var f = new Image;
                f.onerror = c, f.src = a
            } catch (e) {
                c()
            } else {
                var g = document.createElement("link");
                g.type = "text/css", g.rel = "stylesheet", g.id = "coreCSS", g.href = a, this.g("coreCSS") || document.getElementsByTagName("head")[0].appendChild(g), this.isCssCreat = !0;
                var h = this;
                g.onload = function() {
                    h.isCssLoaded = !0
                }, setTimeout(function() {
                    h.loadCore(a, b, c)
                }, 100)
            }
        }
    }, b.fn.init.prototype = b.fn
}(window); /*  |xGv00|a2751ae50a36f5f6cecd79c67a9c74e5 */