var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var loadJs = function loadJs(url, callback) {
    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var script = void 0,
        options = void 0,
        s = void 0;
    if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) === 'object') {
        options = url;
        url = undefined;
    }
    s = options || {};
    url = url || s.url;
    callback = callback || s.success;
    script = document.createElement('script');
    script.async = s.async || false;
    script.type = 'text/javascript';
    if (s.charset) {
        script.charset = s.charset;
    }
    if (s.cache === false) {
        url = url + (/\?/.test(url) ? '&' : '?') + '_=' + new Date().getTime();
    }
    script.src = url;
    head.insertBefore(script, head.firstChild);
    if (callback) {
        document.addEventListener ? script.addEventListener('load', callback, false) : script.onreadystatechange = function () {
            if (/loaded|complete/.test(script.readyState)) {
                script.onreadystatechange = null;
                callback();
            }
        };
    }
};
var createFrame = function createFrame() {
    var dialogFrame = document.createElement('iframe');
    dialogFrame.id = 'openVip';
    dialogFrame.style.cssText = ['width:', '570px;', 'position:', 'fixed;', 'top:', '50%;', 'left:', '50%;', 'margin-top:', '-260px;', 'margin-left:', '-285px;', 'border-radius:', '4px;', 'display:', 'none;', 'z-index:', '4001;'].join('');
    dialogFrame.frameBorder = 'no';
    dialogFrame.scrolling = 'auto';
    dialogFrame.allowTransparency = 'true';
    dialogFrame.src = '//sports.qq.com/kbsweb/openvip-newlogin.htm';
    window.document.getElementsByTagName('body')[0].appendChild(dialogFrame);
    return dialogFrame;
};

var createFrameMask = function createFrameMask() {
    var mask = document.createElement('div');
    mask.id = 'vipFrameMask';
    mask.style.cssText = ['width:', '100%;', 'height:', '100%;', 'position:', 'fixed;', 'top:', '0;', 'left:', '0;', 'background-color:', '#000;', 'opacity:', '0.3;', 'border-radius:', '4px;', 'display:', 'none;', 'z-index:', '4000;'].join('');
    window.document.getElementsByTagName('body')[0].appendChild(mask);
    return mask;
};

// 创建关闭高级会员系统维护暂停开放的弹窗的按钮
var createSVipTipsFrameBtn = function createSVipTipsFrameBtn() {
    var button = document.createElement('div');
    button.id = 'sVipTipsFrameBtn';
    button.style.cssText = ['width:', '110px;', 'height:', '40px;', 'cursor:', 'pointer;', 'line-height:', '40px;', 'margin:', '30px auto;', 'background:', '#5F6369;'].join('');
    button.innerText = '我知道了';
    return button;
};
// 创建高级会员系统维护暂停开放的弹窗
var createSVipTipsFrameMask = function createSVipTipsFrameMask() {
    var mask = document.createElement('div');
    var button = createSVipTipsFrameBtn();
    mask.id = 'sVipTipsFrameMask';
    mask.style.cssText = ['display:', 'none;', 'width:', '576px;', 'height:', '200px;', 'position:', 'fixed;', 'top:', '50%;', 'left:', '50%;', 'z-index:', '4001;', 'margin-top:', '-53px;', 'margin-left:', '-288px;', 'text-align:', 'center;', 'background:', '#1A1E21;', 'padding:', '40px;', 'color:', '#ffffff;', 'font-size:', '16px;', 'border-radius:', '4px;', 'box-sizing:', 'border-box;'].join('');
    mask.innerText = '尊敬的用户您好，目前腾讯体育高级会员系统维护暂停开放充值入口，恢复后将第一时间告知于您，给您带来不便深表歉意。';
    mask.appendChild(button);
    window.document.getElementsByTagName('body')[0].appendChild(mask);
    return mask;
};

var options = {};

loadJs({ url: '//midas.gtimg.cn/midas/minipay_v2/jsapi/cashier.js', charset: 'utf-8' });
var vipFrame = createFrame();
var vipFrameMask = createFrameMask();
// 创建高级会员提示弹窗
var sVipTipsFrameMask = createSVipTipsFrameMask();

window.sportsVip = {
    open: function open(opt) {
        // 如果是高级会员 弹窗提示
        if (opt.params.memberId === '2') {
            this._closeSVipTips();
            this._showSVipTips();
            return;
        }
        if (vipFrameMask.style.display === 'block') {
            return;
        }
        options = opt;
        var params = opt.params;
        var _this = this;
        if (params.vid) {
            params.aid.vid = params.vid;
            params.sceneParam = {
                vid: params.vid
            };
        } else if (params.mid) {
            params.aid.mid = params.mid;
            params.sceneParam = {
                mid: params.mid
            };
        } else if (params.packageId) {
            params.sceneParam = {
                packageId: params.packageId
            };
        }
        vipFrame.contentWindow.vip.open({
            openParams: params
        });
        _this._show();
    },
    _show: function _show() {
        vipFrame.style.display = 'block';
        vipFrameMask.style.display = 'block';
    },
    _close: function _close(type) {
        try {
            // 续费过程中关闭可能出现异常
            if (options.onClose) options.onClose();
            vipFrameMask.style.display = 'none';
            this._hideFrame();
        } catch (e) {}
    },
    // 显示高级会员的提示弹窗
    _showSVipTips: function _showSVipTips() {
        vipFrameMask.style.display = 'block';
        sVipTipsFrameMask.style.display = 'block';
    },
    // 关闭高级会员的提示弹窗
    _closeSVipTips: function _closeSVipTips() {
        document.getElementById('sVipTipsFrameBtn').onclick = function () {
            vipFrameMask.style.display = 'none';
            sVipTipsFrameMask.style.display = 'none';
        };
    },
    _hideFrame: function _hideFrame() {
        vipFrame.style.display = 'none';
    },
    _success: function _success() {
        if (options.onSuccess) options.onSuccess();
    },
    _error: function _error() {
        if (options.onError) options.onError();
    },
    _showMinipay: function _showMinipay(params) {
        var _this2 = this;

        var _this = this;
        window.sportsWebApi.fetchUserInfo(function (userInfo) {
            // 拉webpay前需要新拉取一次用户信息，防止在浮层没关闭与拉起webpay之间登陆用户的类型发生变化导致的用户信息误传
            if (userInfo.isLogin && userInfo.isStrong) {
                var loginInfo = {};
                params.aid = _this2._remark(options.params.aid); // aid webpay上报
                if (userInfo.mainLogin === 'qq') {
                    loginInfo = {
                        openid: userInfo.openid,
                        openkey: userInfo.access_token,
                        session_id: 'openid',
                        session_type: 'kp_accesstoken'
                    };
                    params.appid = params.appid.qq;
                    params.pf = params.pf.qq;
                } else if (userInfo.mainLogin === 'wx') {
                    loginInfo = {
                        openid: userInfo.openid,
                        openkey: userInfo.accesstoken || userInfo.access_token,
                        session_id: 'hy_gameid',
                        session_type: 'wc_actoken'
                    };
                    params.appid = params.appid.wx;
                    params.pf = params.pf.wx;
                }
                window.midas.minipay.service({
                    methods: {
                        onSuccess: _this._success,
                        onError: _this._error,
                        onClose: _this._close,
                        onNoResult: function onNoResult() {}
                    }
                }, _extends({
                    editableForTeam: '0',
                    price_type: 'upgrade',
                    disableSend: 'true'
                }, loginInfo, params));
            } else {
                _this._close();
                window.sportsWebApi.userLogin();
            }
        });
    },
    _remark: function _remark(opts) {
        var FIXEDSTR = 's0$$1:1'; // 固定字符串PC端
        var keys = {
            client: 1, // 平台，1：web端
            refer: 3, // 开通来源（3）的编码
            mid: 6, // 比赛id
            vid: 8
        };
        Object.keys(keys).forEach(function (k) {
            if (opts[k]) {
                FIXEDSTR += '$' + keys[k] + ':' + opts[k];
            }
        });
        return FIXEDSTR;
    },
    _setFrameSize: function _setFrameSize(w, h, vCenter) {
        vipFrame.style.height = h + 'px';
        vipFrame.style.width = w + 'px';
        vipFrame.style.marginLeft = -w / 2 + 'px';
        if (vCenter) {
            vipFrame.style.marginTop = -h / 2 + 'px';
        } else {
            vipFrame.style.marginTop = '-260px';
        }
    }
};/*  |xGv00|24d9d91b031c9744da192b5aceddb53a */