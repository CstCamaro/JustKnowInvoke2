var Wii = {};

Wii.ptlogin = {
    // 登陆QQ
    loginQQ: function (callbackfun, closeCallbackFun) {
        if (callbackfun == undefined) {
            $.loginQQ({
                jumpTo: '/'
            });
        } else {
            $.loginQQ({
                callback: callbackfun,
                closeCallback: closeCallbackFun
            });
        }
    },
    // 退出QQ登陆
    logoutQQ: function (callbackfun) {
        if (callbackfun == undefined) {
            $.logoutQQ({
                jumpTo: '/'
            });
        } else {
            $.logoutQQ({
                callback: callbackfun
            });
        }
    },
    // 获取当前是否已QQ登陆
    isLoginQQ: function () {
        return $.isLoginQQ();
    }
};

