(function ($) {
    $.fn.navtab = function (configs) {
        var settings = $.extend({toggleClass: "current", targetClass: "subnav"}, configs || {});
        return this.each(function () {
            var container = this;
            var $tags = $(container).children();
            var cur = 0;
            var index = 0;
            $tags.each(function (i, item) {
                if ($(item).hasClass(settings.toggleClass)) {
                    if (i !== index) {
                        cur = index = i
                    }
                }
                if ($(this).children("." + settings.targetClass)) {
                    var targetNode = $(this).children("." + settings.targetClass)
                }
                $(item).hover(function () {
                    $tags.eq(cur).removeClass(settings.toggleClass);
                    $(this).addClass(settings.toggleClass);
                    cur = i;
                    if (!!targetNode) {
                        targetNode.slideDown(200)
                    }
                }, function () {
                    if (!!targetNode) {
                        targetNode.hide()
                    }
                })
            });
            $(container).mouseleave(function () {
                if (cur !== index) {
                    $tags.eq(cur).removeClass(settings.toggleClass);
                    $tags.eq(index).addClass(settings.toggleClass);
                    cur = index
                }
            })
        })
    };
    $.fn.picfade = function (configs) {
        var settings = $.extend({
            tags: "li",
            toggleClass: "on",
            auto: true,
            shownav: true,
            timerange: 6000
        }, configs || {});
        return this.each(function () {
            var container = this;
            var $tags = $(container).children();
            var tagslen = $tags.size();
            if (tagslen < 2) {
                return false
            }
            var curid = 0;
            var targetid = 0;
            var timer;
            if (settings.shownav) {
                var $nav = $('<div class="circle"></div>').insertAfter(container);
                var navStr = "";
                for (var i = 0; i < tagslen; i++) {
                    navStr += "<span>&nbsp;</span>"
                }
                var $as = $nav.html(navStr).children();
                $as.first().addClass(settings.toggleClass);
                $as.each(function (i, item) {
                    $(item).mouseover(function () {
                        settings.auto = false;
                        targetid = i;
                        fade(curid, targetid);
                        curid = targetid
                    }).mouseout(function () {
                        settings.auto = true
                    })
                })
            }
            $(container).hover(function () {
                settings.auto = false
            }, function () {
                settings.auto = true
            });
            timer = settings.timerange > 100 ? window.setInterval(function () { // 2018/11/29 取消自动轮播，修改为timerange>100才启动轮播
                if (!settings.auto) {
                    return false
                }
                if (targetid === tagslen - 1) {
                    targetid = 0
                } else {
                    targetid += 1
                }
                fade(curid, targetid);
                curid = targetid
            }, settings.timerange) : null;
            function fade(cid, nextid) {
                if (cid === nextid) {
                    return false
                }
                $tags.eq(cid).fadeOut(1000);
                $tags.eq(nextid).fadeIn(800);
                if (settings.shownav) {
                    $as.eq(cid).removeClass(settings.toggleClass);
                    $as.eq(nextid).addClass(settings.toggleClass)
                }
            }
        })
    };
    $.fn.pgvClick = function (configs) {
        var settings = $.extend({attrName: "pgv", domainName: "im.qq.com"}, configs || {});
        return this.each(function () {
            if (typeof pgvSendClick !== "function") {
                return false
            }
            var getHash = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.hash.substring(1).match(reg);
                if (!!r) {
                    return unescape(r[2])
                }
                return null
            };
            var getSearch = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substring(1).match(reg);
                if (!!r) {
                    return unescape(r[2])
                }
                return null
            };
            var adtagData = getSearch("adtag") || getHash("adtag") || "";
            $(this).bind("click", function (event) {
                var target = event.target;
                var tags = [];
                do {
                    var pgv = $(target).attr(settings.attrName);
                    if (pgv) {
                        if (!!adtagData) {
                            tags.push(pgv + "adtag=" + adtagData)
                        } else {
                            tags.push(pgv)
                        }
                    }
                } while (target.parentNode && target.parentNode != document && (target = target.parentNode));
                pgvSendClick({virtualDomain: settings.domainName, hottag: tags.join(";")})
            });
        });
    };
    var cookie = {
        get: function (n) {
            var m = document.cookie.match(new RegExp("(^| )" + n + "=([^;]*)(;|$)"));
            return !m ? "" : decodeURIComponent(m[2])
        }, set: function (name, value, domain, path, hour) {
            var expire = new Date();
            expire.setTime(expire.getTime() + (hour ? 3600000 * hour : 30 * 24 * 60 * 60 * 1000));
            document.cookie = name + "=" + value + "; expires=" + expire.toGMTString() + "; path=" + (path ? path : "/") + "; " + (domain ? ("domain=" + domain + ";") : "")
        }, del: function (name, domain, path) {
            document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (path ? path : "/") + "; " + (domain ? ("domain=" + domain + ";") : "")
        }, uin: function () {
            var u = cookie.get("uin");
            return !u ? null : parseInt(u.substring(1, u.length), 10)
        }
    };
    var htmlEncodeDict = {'"': "#34", "<": "#60", ">": "#62", "&": "#38", " ": "#160"};
    var encodeHtml = function (s) {
        s += "";
        return s.replace(/["<>& ]/g, function (all) {
            return "&" + htmlEncodeDict[all] + ";"
        })
    };
    $.extend({
        qReport: function (configs) {
            var buffer = {}, INDEX_TABLE = $.extend({
                "1": [0, 519487],
                "2": [0, 519488],
                "3": [0, 519489]
            }, configs || {}), timer = null;
            var sendReport = function (url) {
                var img = new Image();
                img.src = url;
                img.onload = img.onerror = function () {
                    this.onload = this.onerror = null
                };
                img = null
            };

            function sendAll() {
                var msg = [];
                for (var i in buffer) {
                    msg.push(buffer[i] + "-" + INDEX_TABLE[i][0] + "-" + INDEX_TABLE[i][1] + "_" + buffer[i])
                }
                if (msg.length > 0) {
                    sendReport("https://mma.qq.com/cgi-bin/report/report2?id=172&rs=" + msg.join("|_|") + "&r=" + Math.random());
                    buffer = {}
                }
            }

            return function (key, value) {
                if (INDEX_TABLE[key]) {
                    buffer[key] = (buffer[key] || 0) + (value || 1);
                    if (timer) {
                        window.clearTimeout(timer)
                    }
                    timer = window.setTimeout(sendAll, 500)
                }
            }
        }(),
        checkLogin:function(){
            window.loginAll = function (json) {
                if (json && json.result == 0) {
                    uin = cookie.uin();
                    $("#login").hide();
                    $("#nick").html("hi," + encodeHtml(json.nick));
                    var imgurl="https://q1.qlogo.cn/g?b=qq&s=100&nk="+uin;  ///json.Face

                    //var $loginImg = $('<img id="loginImg" src="' + imgurl + '" alt="" />').insertAfter("#login");
                    var loginImg = document.getElementById("loginImg");
                    if(!loginImg){
                       var $loginImg = $('<img id="loginImg" src="' + imgurl + '" alt="" />').insertAfter("#login");
                    }else{
                        $("#loginImg").attr("src",imgurl);
                        $("#loginImg").show();
                    }
                    $("#loginInfo").addClass("logined");
                    $("#loginInfo").hover(function () {
                        if ($(this).hasClass("logined")) {
                            $("#loginPenel").slideDown(300);
                        }
                    },function(){
                        $("#loginPenel").hide();
                    });
                }
            };
            try {
                var uin = cookie.uin();
                var skey = cookie.get("skey");
                if (!!uin) {
                    $.getScript("https://proxy.now.qq.com/tx_tls_gate=qfwd.qq.com/?uin=" + uin + "&skey=" + skey + "&func=loginAll&refresh=0&ran=" + Math.random(), function () {
                    })
                }
            } catch (e) {
            }
        },
        loginSuccess:function(){
            $("#login_div").hide();
            $("#overlay").fadeOut();
            this.checkLogin();
        }
    });
    $.fn.imLogin = function (configs) {
        var settings = $.extend({loginPenel: "loginPenel", loginBtn: "login", lgoutBtn: "lgout"}, configs || {});
        return this.each(function () {
            var target = this;
            $.checkLogin();
            function str2JSON(msg) {
                // borrow from jquery
                var rvalidchars = /^[\],:{}\s]*$/,
                    rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
                    rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
                    rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;

                if (rvalidchars.test(msg.replace(rvalidescape, "@")
                        .replace(rvalidtokens, "]")
                        .replace(rvalidbraces, "")) ) {
                    return (new Function("return " + msg))();
                }
                return {};
            }
            window.ptlogin2_onClose = function () {
                $("#login_div").hide();
                $("#overlay").fadeOut();
            };
            window.ptlogin2_onResize = function (width, height) {
                $("#login_div").css({width: width, height: height, visibility: "hidden"}).css("visibility", "visible")
            };
            if (typeof window.postMessage !== "undefined") {
                window.onmessage = function (event) {
                    var msg = event || window.event;
                    var data;
                    if (typeof JSON !== "undefined") {
                        data = JSON.parse(msg.data)
                    } else {
                        data = str2JSON(msg.data)
                    }
                    switch (data.action) {
                        case"close":
                            ptlogin2_onClose();
                            break;
                        case"resize":
                            ptlogin2_onResize(data.width, data.height);
                            break;
                        default:
                            break
                    }
                }
            }
            var showLogin = function () {
                var loginWin = $("#login_div");
                var s_url=/^https/.test(window.location)?"https://im.qq.com/loginSuccess.html":"http://im.qq.com/loginSuccess.html";
                if (!loginWin.length) {
                    loginWin = $('<div id="login_div" class="login_div"><iframe name="login_frame" id="login_frame" frameborder="0" scrolling="auto" width="100%" height="100%" src="https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=501038301&target=self&s_url=' + s_url + '"></iframe></div>');
                    loginWin.appendTo($("body"))
                }else{
                    $("#login_frame").attr("src","https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=501038301&target=self&s_url="+s_url);
                }
                $("#overlay").css({opacity: "0.5"}).fadeIn();
                $("#overlay").css({height: $(document).height()});
                loginWin.show()
            };
            $(target).click(function (e) {
                e.preventDefault();
                showLogin()
            });
            $("#" + settings.lgoutBtn).click(function (e) {
                e.preventDefault();
                cookie.del("uin", ".qq.com");
                cookie.del("skey", ".qq.com");
                cookie.del("uin", "im.qq.com");
                cookie.del("skey", "im.qq.com");
                $("#" + settings.loginPenel).hide();
                $(target).show();
                $("#loginImg").hide();
                $("#loginInfo").removeClass("logined");
            });
        });
    };
    $.fn.xyt = function (configs) {
        var settings = $.extend({viewBtn: "viewOnline", closeBtn: "flashClose",cur_online:"cur_online"}, configs || {});
        return this.each(function () {
            var target=this;
            /*window.online_resp = function (data) {
                if (data && data.data.count && data.code==0) {
                    alert(2);
                    $("#"+settings.cur_online).text(data.data.count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
                }
            };*/
            var swf=/^https/.test(window.location)?"https://im.qq.com/online/flash/ht/fla_https.swf":"http://im.qq.com/online/flash/ht/fla_http.swf";
            swfobject.embedSWF(swf, "flashBox", "910", "700", "9.0.0", "expressInstall.swf");
            /*$.getJSON("https://mmatest.qq.com/simsonhe2/mqqactivity/cgi/starmap/get_online", function (data) {
                alert(3);
                if (data && data.data.count && data.code==0) {
                    $("#"+settings.cur_online).text(data.data.count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
                }
            });*/
            $.ajax({
                type: "GET",
                url: "https://mma.qq.com/mqqactivity/cgi/starmap/get_online",
                dataType: "jsonp",
                success: function(data) {
                    if (data && data.data.count && data.code==0) {
                        $("#"+settings.cur_online).text(data.data.count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))
                    }
                }
            });
            $("#"+settings.viewBtn).click(function (e) {
                e.preventDefault();
                $("#flashDiv").show();
                $("#overlay").css({opacity: "0.9"}).fadeIn();
                $("#overlay").css({height: $(document).height()})
            });
            $("#" + settings.closeBtn).click(function (e) {
                e.preventDefault();
                $("#flashDiv").hide();
                $("#overlay").fadeOut();
            });
        });
    }
})(jQuery);