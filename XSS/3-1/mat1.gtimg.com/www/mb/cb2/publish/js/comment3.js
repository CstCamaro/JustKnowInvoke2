function Comment () {
    this.initCfg = {
        targetId: 0,
        commentId: 0,
        reqnum: 10,
        page: 0,
        token: null,
        __uin: null,
    }
    var cfg = '';
}
Comment.prototype = {
    //初始化
    initStart: function (cfg) {
        //配置文件
        this.cfg = $.extend(this.initCfg, cfg);
        //变量
        var btnMoreComment = $("#get_more_comment_" + this.cfg.targetId);
        var btnSubmit = $("#comment_submit_" + this.cfg.targetId);
        var btnLogin = $("#login_qq_btn_" + this.cfg.targetId);
        //初始化函数
        this.commentList();
        this.isLogin();
        //发消息使用key
        if (this.getKey()) {
            this.cfg.token = generateToken(getKey());
        }
        var wx_open_id = G_getCookie("cross_openid");
        var wx_access_token = G_getCookie("cross_access_token");

        if (wx_open_id != '' && wx_access_token != '') {
            this.cfg.token = generateTokenWeixin(getKeyWeixin());
            $("#access_token_" + this.cfg.targetId).val(wx_access_token);
            $("#openid_" + this.cfg.targetId).val(wx_open_id);
            $("#noLogin_" + this.cfg.targetId).hide();
            $("#hasLogin_" + this.cfg.targetId).show();
        } else {
            $("#appid_" + this.cfg.targetId).val("");
            $("#logintype_" + this.cfg.targetId).val("");
            $("#wxapi_" + this.cfg.targetId).val("");
        }
        $("#topCallback_" + this.cfg.targetId).val();

        var that = this;
        //点击事件
        btnMoreComment.click(function () {
            that.commentList(that.cfg.commentId);
        });
        btnSubmit.click(function () {
            var commentContent = $('#comment_content_' + that.cfg.targetId).val();
            if (commentContent == "") {
                //alert("请输入点内容吧");
                return false;
            }
            $("#token_" + that.cfg.targetId).val(that.cfg.token);
            $("#targetid_" + that.cfg.targetId).val(that.cfg.targetId);
            $('#commentForm_' + that.cfg.targetId).submit();
            $targetId = that.cfg.targetId;
        });
        btnLogin.click(function () {
            qqLogin();
        });

    },
    //拉取评论列表
    commentList: function () {

        var commentUrl = "//coral.qq.com/article/" + this.cfg.targetId + "/comment?commentid=" + this.cfg.commentId + "&reqnum=" + this.cfg.reqnum + "&tag=&_=";
        var that = this;

        $.ajax({
            type: 'get',
            url: commentUrl,
            dataType: 'jsonp',
            jsonp: 'callback',
            // jsonpCallback : 'mainComment',
            success: function (data) {

                that.cfg.page++;
                var Coment = data.data;
                var comment_total_num = Coment.total;
                var comment_all_pages = Math.ceil(comment_total_num / that.cfg.reqnum);
                that.cfg.commentId = Coment.last;
                $("#comment_total_num_" + that.cfg.targetId).html(comment_total_num);
                $("#comment_list_show_" + that.cfg.targetId).append(that.commentStart(Coment.commentid));
                if ((Coment.reqnum != Coment.retnum) || that.cfg.page > comment_all_pages) {
                    $("#get_more_comment_" + that.cfg.targetId).hide();
                }
            }
        });
        this.cfg = that.cfg;
    },
    commentStart: function (str) {
        var res = "";
        for (var i in str) {
            res += "<li>" +
                "<span class='img_Header'><img src='" + str[i].userinfo.head + "'></span>" +
                "<div class='text_wrapper'>" +
                "<p><span class='font-name'>" + this.userStart(str[i].userinfo) + "</span><em>" + str[i].timeDifference + "</em></p><div><p>" + str[i].content + "</p></div></div>" +
                "</li>";
        }
        return res;
    },
    //解析用户信息
    userStart: function (str) {
        var nick = str["nick"];
        return nick ? nick : "匿名";
    },
    isLogin: function () {
        //验证登录
        if (!this.cfg.__uin) {
            $('#hasLogin_' + this.cfg.targetId).hide();
            $('#noLogin_' + this.cfg.targetId).show();
        } else {
            $('#noLogin_' + this.cfg.targetId).hide();
            $('#hasLogin_' + this.cfg.targetId).show();
        }
    },
    getKey: function () {
        return jQuery.MYcookie('skey') || jQuery.MYcookie('lskey');
    },
}
//发送消息后回调函数
function topCallback (str) {
    if (str.errCode == 0) {
        var cont = str.data;
        var content = "<li><span class='img_Header'><img src='" + cont.userinfo.head + "'></span><div class='text_wrapper'><p><span class='font-name'>" + userStart(cont.userinfo) + "</span><em>刚刚</em></p><div><p>" + cont.content + "</p></div></div></li>";
        $("#comment_content_" + $targetId).val("");
        $("#comment_list_show_" + $targetId).prepend(content);
    } else {
        alert("错误");
    }
}
function userStart (str) {
    var nick = str["nick"];
    return nick ? nick : "匿名";
}
//QQ用户登录
function qqLogin () {
    //判断设备分辨率，小屏统一用移动登录
    //之后判断微信cookie是否存在，否则调用统一登录

    //通用登录样式 12 8 9 5
    var loginStyle = 12;
    var w = window,
        d = document,
        e = d.documentElement;
    var dev_xx = document.documentElement.clientWidth || document.body.clientWidth;
    //console.log(dev_xx);
    //暂定用屏幕宽度判断设备
    if (_checkMobile()) {
        loginStyle = 9;
        var qqLoginUrl = "//ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&style=" + loginStyle + "&low_login=0&link_target=blank&appid=636014201&target=self&s_url=" + backUrl;
        location.href = qqLoginUrl + "#comment";
    } else {
        //pc
        var qqLoginUrl = "//ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&style=" + loginStyle + "&low_login=0&link_target=blank&appid=636014201&target=self&s_url=" + backUrl;
        location.href = qqLoginUrl;
    }
}

//weixin
function G_getCookie (name) {
    var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
    var m = document.cookie.match(r);
    return (!m ? "" : m[1]);
}

function G_setCookie (name, value, domain, path, hour) {
    if (hour) {
        var today = new Date();
        var expire = new Date();
        expire.setTime(today.getTime() + 3600000 * hour);
    }
    document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + tb.config.domainPrefix + ";"));
    return true;
}

function G_delCookie (name, domain, path) {
    document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=qq.com;"));
}
function getKeyWeixin () {
    return wx_access_token;
}
function generateToken (key) {
    var hash = 2013;
    for (var i = 0, len = key.length; i < len; i++) {
        hash += (hash << 5) + key.charCodeAt(i);
    }
    return hash & 0x7fffffff;
}
function generateTokenWeixin (a) {
    var k = 2013;
    if (a)
        for (var p = 0, m = a.length; p < m; p++)
            k += (k << 5) + a.charCodeAt(p);
    return k & 2147483647
}

var wx_try_login = G_getCookie("wx_try_login");
var CAN_COOKIE = true;
if (!wx_try_login) {
    G_setCookie("wx_try_login", "1", "qq.com", "/", 1);
    if (!G_getCookie("wx_try_login")) {
        CAN_COOKIE = false;
    }
}

var wx_open_id = G_getCookie("cross_openid");
var wx_access_token = G_getCookie("cross_access_token");
var wx_cross_expires_in = G_getCookie("cross_expires_in");
var IS_LOGIN_FLAGIS_LOGIN_FLAG = true;

var G_LOGIN_URL = "//imp.qq.com/index.php/weixin/oauth2/cross?redirect_url=";
var ua = navigator.userAgent;
var isWechart = ua.indexOf("MicroMessenger") > 0 ? true : false;
//微信用户登录
if (CAN_COOKIE && isWechart) {
    var nowTime = new Date();
    var expireTime = nowTime - wx_cross_expires_in * 1000;
    if ((wx_open_id == "" || wx_access_token == "" || expireTime >= 0) && !wx_try_login) {
        IS_LOGIN_FLAG = false;
        var url = G_LOGIN_URL;
        url += encodeURIComponent(location.href);
        location.href = url;
    }
    else {
        G_delCookie("wx_try_login", "qq.com", "/");
    }
}

/*
 * jQuery cookie plugin
 * 已设置默认设置（config.defaults），domain=qq.com，path=/
 */
(function ($, document, undefined) {
    var pluses = /\+/g;

    function raw (s) {
        return s;
    }

    function decoded (s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    var config = $.MYcookie = function (key, value, options) {
        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);
            if (value === null) {
                options.expires = -1;
            }
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie;
            }
        }

        return null;
    };

    config.defaults = {
        path: '/',
        expires: 7
    };

    $.removeCookie = function (key, options) {
        if ($.MYcookie(key) !== null) {
            $.MYcookie(key, null, options);
            return true;
        }
        return false;
    };
})(jQuery, document);/*  |xGv00|7c1d85aef488c04fb0e28b208c7e80f0 */