WXShareData = function () {
    var __wximgObj = document.getElementById("fxlj"),
        __wxtitleObj = document.getElementById("__wxshareTitle"),
        __wxdescObj = document.getElementById("__wxshareDescription"),
        __wxlinkObj = document.getElementById("__wxshareUrl");

    /****获取META的DESCRIPTION****/
    var _desc = '',
        metaObj = document.getElementsByTagName("meta");
    for (var ii in metaObj) {
        if (typeof metaObj[ii].name != "undefined" && metaObj[ii].name.toLowerCase() == "description") {
            _desc = metaObj[ii].content;
        }
    }
    /****************************/
    this.tlink = 'http://wxin2.cqnews.net/jsconfig.aspx?gp=7b79e5eb52484c758cea6533a776fe5d&url=';
    //this.tlink = 'http://wxin2.cqnews.net/jsconfig.aspx?gp=58de585ca80b49a28b87e8568db65c95&url=';
    this.turl = escape(document.location.href.split("#")[0]);
    this.data = {
        title: __wxtitleObj ? __wxtitleObj.innerText.trim() : document.title,
        desc: __wxdescObj ? __wxdescObj.innerText.trim() : (_desc || document.title),
        link: __wxlinkObj ? __wxlinkObj.innerText.trim() : document.location.href,
        imgUrl: __wximgObj ? __wximgObj.src : 'http://www1.cqnews.net/images/weblogo.png'
    };

    this.callback = {
        __MenuShareAppMessageSuccess: function () { },
        __MenuShareTimelineSuccess: function () { },
        __MenuShareQQSuccess: function () { },
        __MenuShareWeiboSuccess: function () { }
    };

    this.wxDataAction = function () {
        var gw = new getWXdata(this.data, this.callback);
        gw.setWXConfig();
    };

    this.resetWXData = function (_data) {
        for (var x in _data) eval("this.data." + x + " = _data." + x);
        this.wxDataAction();
    };

    this.resetWXCallback = function (_callback) {
        for (var x in _callback) eval("this.callback." + x + " = _callback." + x);
        this.wxDataAction();
    };
}

function setWXdata(shareCallback) {
    var __common = {
        loadJS: function (url, callback) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.onload = script.onreadystatechange = function () {
                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                    script.onload = script.onreadystatechange = null;  // Handle memory leak in IE
                    try {
                        setTimeout(function () { callback() }, 5);
                    }
                    catch (e) {
                        //console.log("The function '"+callback+"'  is found error.");
                    }
                }
            };
            script.src = url;
            head.appendChild(script);
        }
    };

    __common.loadJS(wxShareData.tlink + wxShareData.turl, function () {
        wxShareData.wxDataAction();
    });
}

function getWXdata(shareData, shareCallback) {
    this.shareData = shareData;
    this.shareCallback = shareCallback;
    this.setWXConfig = function () {
        var obj = eval('(' + WxinJsJdkPar + ')');
        var that = this;
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: obj.appId, // 必填，公众号的唯一标识
            timestamp: obj.timestamp, // 必填，生成签名的时间戳
            nonceStr: obj.nonceStr, // 必填，生成签名的随机串
            signature: obj.signature,// 必填，签名，见附录1
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.error(function (res) {
            console.log(res);
        });
        wx.ready(function () {
            wx.showOptionMenu();
         //   wx.onMenuShareAppMessage({ //发送给朋友
//                title: that.shareData.title, // 分享标题
//                desc: that.shareData.desc, // 分享描述
//                link: that.shareData.link, // 分享链接
//                imgUrl: that.shareData.imgUrl, // 分享图标
//                trigger: function (res) {
//                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
//                },
//                success: function (res) { that.shareCallback.__MenuShareAppMessageSuccess(); },
//                cancel: function (res) { that.shareCallback.__MenuShareAppMessageCancel(); },
//                fail: function (res) { that.shareCallback.__MenuShareAppMessageFail(); }
//            });
		 
		 wx.updateAppMessageShareData({ //发送给朋友
                title: that.shareData.title, // 分享标题
                desc: that.shareData.desc, // 分享描述
                link: that.shareData.link, // 分享链接
                imgUrl: that.shareData.imgUrl}, // 分享图标
				function (res) { that.shareCallback.__MenuShareAppMessageSuccess(); });
		 
            wx.onMenuShareTimeline({ //分享到朋友圈
                title: that.shareData.title,
                link: that.shareData.link,
                imgUrl: that.shareData.imgUrl,
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                },
                success: function (res) { that.shareCallback.__MenuShareTimelineSuccess(); },
                cancel: function (res) { that.shareCallback.__MenuShareTimelineCancel(); },
                fail: function (res) { that.shareCallback.__MenuShareTimelineFail(); }
            });
            wx.onMenuShareQQ({ //分享到qq
                title: that.shareData.title,
                desc: that.shareData.desc,
                link: that.shareData.link,
                imgUrl: that.shareData.imgUrl,
                trigger: function (res) { },
                complete: function (res) { that.shareCallback.__MenuShareQQComplete(); },
                success: function (res) { that.shareCallback.__MenuShareQQSuccess(); },
                cancel: function (res) { that.shareCallback.__MenuShareQQCancel(); },
                fail: function (res) { that.shareCallback.__MenuShareQQFail(); }
            });
            wx.onMenuShareWeibo({ //分享到微博
                title: that.shareData.title,
                desc: that.shareData.desc,
                link: that.shareData.link,
                imgUrl: that.shareData.imgUrl,
                trigger: function (res) { },
                complete: function (res) { that.shareCallback.__MenuShareWeiboComplete(); },
                success: function (res) { that.shareCallback.__MenuShareWeiboSuccess(); },
                cancel: function (res) { that.shareCallback.__MenuShareWeiboCancel(); },
                fail: function (res) { that.shareCallback.__MenuShareWeiboFail(); }
            });
        });
    };
}

; (function () {
    //隐藏微信分享菜单
    try {
        var onBridgeReady = function () { WeixinJSBridge.call('hideOptionMenu'); };
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }
    catch (e) { //console.log("不是微信浏览器");
    }

    //设置分享信息
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            script.onload = script.onreadystatechange = null;  // Handle memory leak in IE 
        }
        try {
            setTimeout(function () {
                wxShareData = new WXShareData();
                setWXdata(wxShareData.callback);
            }, 5);
        }
        catch (e) { }
    };
    script.src = "http://res.wx.qq.com/open/js/jweixin-1.4.0.js";
    head.appendChild(script);
})();

/*********更新分享信息*********/
function setWXShareData(wxdata) {
    try {
        wxShareData.resetWXData(wxdata);
    }
    catch (e) {
        setTimeout(function () { setWXShareData(wxdata) }, 100);
    }
}
//setWXShareData({title: "新标题"});
/****************************/


/******分享后事件重定义范例******/
function setWXShareCallback(wxcallback) {
    try {
        wxShareData.resetWXCallback(wxcallback);
    }
    catch (e) {
        setTimeout(function () { setWXShareCallback(wxcallback) }, 100);
    }
}
/*************DEMO***********
setWXShareCallback({
	__MenuShareAppMessageSuccess:function() {},
	__MenuShareTimelineSuccess:function() {},
	__MenuShareQQSuccess:function() {},
	__MenuShareWeiboSuccess:function() {}
});
/****************************//*  |xGv00|f1f2c88972801875bd8449ef394a558d */