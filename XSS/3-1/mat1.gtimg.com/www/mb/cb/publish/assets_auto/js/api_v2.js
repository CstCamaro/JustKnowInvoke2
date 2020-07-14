var cbApi = {
	wexin : function(img,uri,titles,desc){
		var ua = navigator.userAgent;
		var isqqvideo = ua.match(/QQLiveBrowser\/([\d.]+)/) || ua.match(/QQLiveBrowser/);
		var isandroid = ua.match(/(Android)\s+([\d.]+)/);
        var isipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var isipod = ua.match(/(iPod).*OS\s([\d_]+)/);
        var isiphone = !isipod && !isipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
		var isWX = ua.indexOf("MicroMessenger") > 0 ? true : false;
		if(isWX){
			weixin_s.init(img,100, 100,titles,desc,uri);
		}
			img = img?img:"";
			title = titles?titles:document.title;
			desc = desc?desc:"详情："+document.location.href+" ";
			uri =uri?uri:document.location.href;
		try{
			var ua = navigator.userAgent;
			//news
			if(ua.match(/qqnews\/([\.\d]+)/i)){
				if(ua.match(/(Android)\s+([\d.]+)/)){
					$.getScript('http://mat1.gtimg.com/www/js/newsapp/jsapi/news.js?_tsid=1', function(){
						if(window.TencentNews && window.TencentNews.setShareArticleInfo){
							//window.TencentNews.setShareArticleInfo(titles,desc,desc,uri,img);
							window.TencentNews.setShareArticleInfo(titles,titles,desc,uri,img);
						}
					})
				}else{
					document.addEventListener('TencentNewsJSInjectionComplete', function(){
						setTimeout(function(){
							if(window.TencentNews && window.TencentNews.setShareArticleInfo){
								//window.TencentNews.setShareArticleInfo(titles,desc,desc,uri,img);
								window.TencentNews.setShareArticleInfo(titles,titles,desc,uri,img);
							}
						},500);
					});
				}
			}
		}catch(err){}
		if(isqqvideo){
			function connectTenvideoJSBridge(callback) {
				if (window.TenvideoJSBridge) {
					callback(TenvideoJSBridge)
				} else {
					document.addEventListener('onTenvideoJSBridgeReady', function() {
						callback(TenvideoJSBridge)
					}, false)
				}
			}
			connectTenvideoJSBridge(function(bridge) {
				 bridge.invoke("setMoreInfo",{"hasRefresh":true, "hasShare":true, "hasFollow":false, "shareInfo":{"title":title, "subTitle":desc, "singleTitle":title, "content":desc, "contentTail":title, "imageUrl":img, "url":uri, "style":"0", "picList":[{"imgUrl":img, "thumbUrl":img}], "coverId":"", "videoId":""}}  );
			})
		}
	}
		
}

var weixin_s = {
	img : "",
	width : 100,
	height : 100,
	title : document.title,
	desc : "详情："+document.location.href+" ",
	url : document.location.href,
	init : function(img, width, height, title, desc, url, appid) {
		weixin_s.img = img;
		weixin_s.width = width || 100;
		weixin_s.height = height || 100;
		weixin_s.title = title || document.title;
		weixin_s.desc = desc||"详情："+document.location.href+" ",
		weixin_s.url = url || document.location.href;
        weixin_s.url = weixin_s.url.replace(window.location.hash,"");
        weixin_s.url = weixin_s.url.replace(window.location.search,"");
		weixin_s.appid = appid || '';
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			WeixinJSBridge.on('menu:share:appmessage', function (argv) {
				weixin_s._ShareFriend();
			});
			WeixinJSBridge.on('menu:share:timeline', function (argv) {
				weixin_s._ShareTL();
			});
			WeixinJSBridge.on('menu:share:weibo', function (argv) {
				weixin_s._ShareWB();
			});
		}, false);
	},
    imagePreview : function (curSrc,srcList) {
        if(!curSrc || !srcList || srcList.length == 0) {
            return;
        }
        WeixinJSBridge.invoke('imagePreview', {
            'current' : curSrc,
            'urls' : srcList
        });
    },
    _ShareFriend : function () {
        WeixinJSBridge.invoke('sendAppMessage', {
            'appid': weixin_s.appid,
            'img_url': weixin_s.img,
            'img_width': weixin_s.width,
            'img_height': weixin_s.height,
            'link': weixin_s.url,
            'desc': weixin_s.desc,
            'title': weixin_s.title
        }, function (res) {
            //_report('send_msg', res.err_msg);
        })
    },
    _ShareTL : function() {
        WeixinJSBridge.invoke('shareTimeline', {
            'img_url': weixin_s.img,
            'img_width': weixin_s.width,
            'img_height': weixin_s.height,
            'link': weixin_s.url,
            'desc': weixin_s.desc,
            'title': weixin_s.title
        }, function (res) {
           // _report('timeline', res.err_msg);
        });
    },
    _ShareWB : function() {
        WeixinJSBridge.invoke('shareWeibo', {
            'content': weixin_s.desc,
            'url': weixin_s.url,
        }, function (res) {
           // _report('weibo', res.err_msg);
        });
    }
}/*  |xGv00|22201cb16206eb62ae021bcf3e99cde7 */