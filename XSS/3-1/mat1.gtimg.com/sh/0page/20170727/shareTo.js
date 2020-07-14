// JavaScript Document
function onBridgeReady() {
	//隐藏底部工具条
	WeixinJSBridge.call('hideToolbar');

	//分享至好友
	WeixinJSBridge.on('menu:share:appmessage', function(argv) {
		WeixinJSBridge.invoke('sendAppMessage', {
			"img_url": window.shareData.imgUrl,
			"link": window.shareData.link,
			"desc": window.shareData.content,
			"title": window.shareData.title
		}, function(res) {})
	});

	//分享至朋友圈
	WeixinJSBridge.on('menu:share:timeline', function(argv) {
		WeixinJSBridge.invoke('shareTimeline', {
			"img_url": window.shareData.imgUrl,
			"img_width": window.shareData.imgWidth,
			"img_height": window.shareData.imgHeight,
			"link": window.shareData.link,
			"title": window.shareData.content
		}, function(res) {});
	});

	//分享至微博
	WeixinJSBridge.on('menu:share:weibo', function(argv) {
		WeixinJSBridge.invoke('shareWeibo', {
			"content": window.shareData.content,
			"url": window.shareData.link
		}, function(res) {});
	});

}

if (typeof WeixinJSBridge == "undefined") {
	if (document.addEventListener) {
		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	} else if (document.attachEvent) {
		document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	}
} else {
	onBridgeReady();
}/*  |xGv00|587c8e3d226212bfa6627cc0969250d8 */