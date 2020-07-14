/**
 * Created by fannyguo on 2016/2/28.
 */
(function($,win,undefined){
    var defaultOpts = {
        beforeLogin : $(".beforeLogin"),//登录前dom
        afterLogin : $(".afterLogin"),//登录后dom
        messHover : $(".logined,.usermess"),//用户信息触发dom
        usermess : $(".usermess"),//用户信息dom
        rmqdList : $('.tjteam'),//热门球队列表dom
        rmqd : $("#hotteam"),//热门球队dom
        rmqdnum : 4//热门球队数量
    };
    //cookie处理
    var cookie = (function() {
        var cookie = function() {
            return cookie.get.apply(cookie, arguments);
        };
        var utils = cookie.utils = {
            isArray: Array.isArray || function(value) {
                return Object.prototype.toString.call(value) === '[object Array]';
            },
            isPlainObject: function(value) {
                return !!value && Object.prototype.toString.call(value) === '[object Object]';
            },
            toArray: function(value) {
                return Array.prototype.slice.call(value);
            },
            getKeys: Object.keys || function(obj) {
                var keys = [],
                    key = '';
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) keys.push(key);
                }
                return keys;
            },
            // Unlike JavaScript's built-in escape functions, this method
            // only escapes characters that are not allowed in cookies.
            escape: function(value) {
                return String(value).replace(/[,;"\\=\s%]/g, function(character) {
                    return encodeURIComponent(character);
                });
            },
            // Return fallback if the value is not defined, otherwise return value.
            retrieve: function(value, fallback) {
                return value === null ? fallback : value;
            }
        };
        cookie.defaults = {};
        cookie.expiresMultiplier = 60 * 60 * 24;
        cookie.set = function(key, value, options) {
            if (utils.isPlainObject(key)) { // Then `key` contains an object with keys and values for cookies, `value` contains the options object.
                for (var k in key) { // TODO: `k` really sucks as a variable name, but I didn't come up with a better one yet.
                    if (key.hasOwnProperty(k)) this.set(k, key[k], value);
                }
            } else {
                options = utils.isPlainObject(options) ? options : {
                    expires: options
                };
                var expires = options.expires !== undefined ? options.expires : (this.defaults.expires || ''), // Empty string for session cookies.
                    expiresType = typeof(expires);
                if (expiresType === 'string' && expires !== '') expires = new Date(expires);
                else if (expiresType === 'number') expires = new Date(+new Date() + 1000 * this.expiresMultiplier * expires); // This is needed because IE does not support the `max-age` cookie attribute.
                if (expires !== '' && 'toGMTString' in expires) expires = ';expires=' + expires.toGMTString();
                var path = options.path || this.defaults.path; // TODO: Too much code for a simple feature.
                path = path ? ';path=' + path : '';
                var domain = options.domain || this.defaults.domain;
                domain = domain ? ';domain=' + domain : '';
                var secure = options.secure || this.defaults.secure ? ';secure' : '';
                document.cookie = utils.escape(key) + '=' + utils.escape(value) + expires + path + domain + secure;
            }
            return this; // Return the `cookie` object to make chaining possible.
        };
        cookie.remove = function(keys) {
            keys = utils.isArray(keys) ? keys : utils.toArray(arguments);
            for (var i = 0, l = keys.length; i < l; i++) {
                this.set(keys[i], '', -1);
            }
            return this; // Return the `cookie` object to make chaining possible.
        };
        cookie.empty = function() {
            return this.remove(utils.getKeys(this.all()));
        };
        cookie.get = function(keys, fallback) {
            fallback = fallback || undefined;
            var cookies = this.all();
            if (utils.isArray(keys)) {
                var result = {};
                for (var i = 0, l = keys.length; i < l; i++) {
                    var value = keys[i];
                    result[value] = utils.retrieve(cookies[value], fallback);
                }
                return result;
            } else return utils.retrieve(cookies[keys], fallback);
        };
        cookie.all = function() {
            if (document.cookie === '') return {};
            var cookies = document.cookie.split('; '),
                result = {};
            for (var i = 0, l = cookies.length; i < l; i++) {
                var item = cookies[i].split('=');
                var key, val;
                try { key = decodeURIComponent(item[0]); } catch(e) { key = item[0]; }
                try { val = decodeURIComponent(item[1]); } catch(e) { val = item[1]; }
                result[key] = val;
            }
            return result;
        };
        cookie.enabled = function() {
            if (navigator.cookieEnabled) return true;
            var ret = cookie.set('_', '_').get('_') === '_';
            cookie.remove('_');
            return ret;
        };
        return cookie;
    })();

    var cookie_remove_options = {domain: 'qq.com', path: "/", expires: 0};


    var remove_cookies = function(arr) {
        for (var i = 0; i < arr.length; i+=1) {
            if (cookie.get(arr[i])) {
                cookie.set(arr[i], "", cookie_remove_options)};
        }
    };
    function userinfo() {//用户信息
        $.ajax({
            type: "GET",
            url: "http://matchweb.sports.qq.com/sportWeb/userCenter?from=sporthp",
            dataType: "jsonp",
            success: function (data) {
                if (data.code == 0) {
                    var data = data.data;
                    var html = '';
                    if (data.userInfo.length != 0) {
                        defaultOpts.beforeLogin.hide();
                        $(".logined img").attr("src", data.userInfo.avatar);
                        defaultOpts.afterLogin.show();
                        defaultOpts.messHover.off();
                        defaultOpts.messHover.hover(function () {
                            defaultOpts.usermess.show();
                        }, function () {
                            defaultOpts.usermess.hide();
                        });
                        $(".username").html(data.userInfo.nick);
                        if (data.isFollowTeam == "1") {
                            defaultOpts.rmqd.html("我的球队");
                            //$cnxh.html("我的视频");
                        } else {
                            defaultOpts.rmqd.html("热门球队");
                            //$cnxh.html("热门视频");
                        }
                        $.ajax({
                            type: "GET",
                            url: "http://matchweb.sports.qq.com/vip/status?from=sporthp",
                            dataType: "jsonp",
                            success: function (data) {
                                if (data[0] == 0) {
                                    data[1].vip == 0 ? $('.member').show() : $(".vip").addClass('isvip');
                                }
                            }
                        });
                        //tvpNew("0rfksdo79mfbgav", "cid")
                        ////tvpNew("w00184l7cuk","vid");
                        //return;
                    } else {
                        defaultOpts.beforeLogin.show();
                        defaultOpts.afterLogin.hide();
                        defaultOpts.messHover.off();
                        defaultOpts.rmqd.html("热门球队");
                        //$cnxh.html("热门视频");
                    }
                    for (var i = 0; i < data.myTeams.length; i++) {
                        if (i > defaultOpts.rmqdnum-1) break;
                        if (typeof data.myTeams[i].icon != 'undefined' && data.myTeams[i].icon) {
                            html += '<li><img src="' + data.myTeams[i].icon + '" alt=""/></li>';
                        }
                    }
                    defaultOpts.rmqdList.html(html);
                }
            }

        })
    }

    function openLogin() {//打开登录层
        $loginWindow = $("<div>").addClass("qqcom-login-mask").css({
            height: $(document).height() || $("html, body").height()
        });
        var $loginIframe = $("<iframe>").attr({
            scrolling: "no",
            frameborder: "0",
            src: "http://ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=636014201&target=self&s_url=http%3A//www.qq.com/qq2012/loginSuccess.htm"
        });
        // 降域
        try {
            document.domain = "qq.com";
        } catch (err) {
        }
        // 插入dom
        $loginWindow.append($loginIframe);
        $("body").append($loginWindow);
    }

    win.ptlogin2_onClose = function () {//登录层关闭按钮
        $loginWindow.remove();
    };
    win.login = {
        loginSuccess: function () {//登入成功
            $loginWindow.remove();
            userinfo();
        },
        loginout: function (callback) {//登出
            $.getScript('https://ui.ptlogin2.qq.com/js/ptloginout.js', function () {
                pt_logout.logout(function () {
                    remove_cookies(['uin', 'skey', 'luin', 'lskey']);
                    $.isFunction(callback) && callback();
                });
            });
        }
    };
    function init(opts){//入口
        if(typeof opts === "object" ){
            $.extend(defaultOpts,opts);
        }
        userinfo();
        $('body').on('click', '.beforeLogin a', function (e) {
            openLogin();
            e.preventDefault();
        });
        $('body').on('click', '.loginOut', function () {
            login.loginout(userinfo);
            $(".usermess").hide();
        });
    }
    win.loginInit = init;
})(jQuery,window);

/*  |xGv00|d2892e610a50b59c9c9dc27f0427e4ba */