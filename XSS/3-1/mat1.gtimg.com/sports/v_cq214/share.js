// JavaScript Document

//分享	
$(document).ready(function(e) {
	var share_html = '<ul class="shareBtn16 onShares">\
						  <li class="shareButton share2wb"><a href="javascript:void(0)" class="qqweibo">腾讯微博</a></li>\
						  <li class="shareButton share2qzone"><a href="javascript:void(0)" class="qzone">QQ空间</a></li>\
						  <li class="shareButton share2qq"><a href="javascript:void(0)" class="qq">QQ好友</a></li>\
						  <li class="shareButton share2sina"><a href="javascript:void(0)" class="sinaweibo">新浪微博</a></li>\
					  </ul>';
	$('.J_btnShare').hover(function(){
		if($(this).find('.onShares').length){
			$(this).find('.onShares').show();
		}else{
			$(this).append(share_html);
		}
	}, function(){
        var _this = this;
		window.setId = setTimeout(function(){
			$('.onShares', _this).hide();
		}, 500);
	})
    $(document).on('click', '.onShares li a', function(e){
		e.preventDefault();
		var $this = $(this),
			className = $this.attr('class'),
			$shareBox = $this.parents('.J_shareBox');
		var title = $shareBox.find('.J_title').text(),
			url = $shareBox.find('.J_url').attr('href'),
			pic = $shareBox.find('.J_src').attr('src'),
			dec = $shareBox.find('.J_dec').text();
		var site = window.share_site? window.share_site:'';
		switch(className){
			case 'qzone':
				postToQzone(title, dec, pic, url, site);
				break;
			case 'sinaweibo':
				shareToSina(title, dec, pic, url);
				break;
			case 'renren':
				shareToRenren(title, url, site);
				break;
			case 'qqemail':
				postToQQEmail(title, dec, pic, url, site);
				break;
			case 'qqweibo':
				postToWb(title, pic, url);
				break;
			case 'kaixin':
				shareToKaixin(title, url, site);
				break;
			case 'wechat':
				shareToWechat(url);
				break;
			case 'qq':
				shareToQQ(title, dec, pic, url, site);
				break;
		}
	});
	
});


<!--分享到腾讯微博--> 
//参数说明：title说明文字，pic小图片，url分享要链接到的地址
function postToWb(title,pic,url){
	var _t = encodeURI(title);//当前页面title，使用document.title
	var _url = encodeURIComponent(url);//当前页的链接地址使用document.location
	var _appkey = 801564356;//你从腾讯获得的appkey，如果有appkey,直接写入key值，例如：_appkey=123456
	var _pic = encodeURI(pic);//（例如：var _pic='图片url1|图片ur家电频道首页改版l2|图片url3....）
	var _site = encodeURIComponent(location.href);//你的网站地址
	var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic;
	w = window.screen.width, h = window.screen.height;
	window.open( _u,'分享到腾讯微博', "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}
 
<!--分享到QQ空间--> 
//参数说明：title标题，summary摘要，pic小图片，url分享要链接到的地址
function postToQzone(title,summary,pic,url,site){
	var p = {
		url:url,
		showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
		//desc:'',/*默认分享理由(可选)*/
		summary:summary||'',/*分享摘要(可选)*/
		title:title,/*分享标题(可选)*/
		site:site||'',/*分享来源 如：腾讯网(可选)*/
		pics:pic, /*分享图片的路径(可选)*/
		style:'203',
		width:98,
		height:22
	};
	var s = [];
		for(var i in p){
		s.push(i + '=' + encodeURIComponent(p[i]||''));
	}
	var _u='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+s.join('&'),
		w = window.screen.width,
		h = window.screen.height;
		window.open( _u,'分享到QQ空间和朋友网', "height=580,width=708,top=" + (h-580)/2 + ",left=" + (w-708)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}

<!--分享到QQ邮箱--> 
function postToQQEmail(title,summary,pic,url,site){
	var p = {
		url:url,/*当前页面url，使用location.href*/
		to:'qqmail',
		desc:'', /*默认分享理由(可选)*/
		summary:summary,/*摘要(可选)*/
		title:title,/*分享标题(可选)*/
		site:site||'',/*分享来源 如：腾讯网(可选)*/
		pics:pic /*分享图片的路径(可选)*/
	};
	var s = [];
		for(var i in p){
		s.push(i + '=' + encodeURIComponent(p[i]||''));
	}
	w = window.screen.width, h = window.screen.height;
	var _u = 'http://mail.qq.com/cgi-bin/qm_share?'+ s.join("&");
	window.open( _u, '分享到QQ邮箱', "height=580,width=708,top=" + (h-580)/2 + ",left=" + (w-708)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
};


<!--分享到新浪微博--> 
function shareToSina(articleTitle,articleURL){
	var url = "http://v.t.sina.com.cn/share/share.php",
	_url = articleURL,
	_title = articleTitle,
	_appkey = '',
	_ralateUid = '',
	c = '',
	w = window.screen.width, h = window.screen.height;
	c = url + "?url=" + encodeURIComponent(_url) + "&appkey=" + _appkey + "&title=" + _title + "&ralateUid=" + _ralateUid + "&language=";

	window.open(c, "分享到新浪微博", "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}		

<!--分享到开心--> 
function shareToKaixin(articleTitle,articleURL,formsite){
	var url = "http://www.kaixin001.com/rest/records.php",
	_url = articleURL,
	_title = articleTitle,
	c = '',
	w = window.screen.width, h = window.screen.height;
	c = url + "?content=" + encodeURIComponent(_title) + "&url=" + _url + "&from="+ encodeURIComponent(formsite) +"&starid=&aid=&style=11&t=10";
	var win = window.open(c, "分享到开心网", "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}

<!--分享到人人--> 
function shareToRenren(articleTitle,articleURL){
	var url = "http://widget.renren.com/dialog/share",
	_url =articleURL,
	_title =articleTitle,
	c = '',


	w = window.screen.width, h = window.screen.height;
	
	c = url + "?resourceUrl=" + _url + "&title=" + _title + "&charset=GB2312";

	window.open(c, "分享到人人网", "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}

<!--分享到微信--> 
function shareToWechat(url){
	var $popup = $('#bdshare_weixin_qrcode_dialog');
	$popup.show().css({left:($(window).width()*0.5)+220, top:($(window).height()*0.5)-($popup.height()*0.5)});
	$('#bdshare_weixin_qrcode_dialog_qr').html('').qrcode(url+ '#' +window.location.hash.substr(1));
	$('.bd_weixin_popup_close').on('click', function(e){
		e.preventDefault();
		$popup.hide();
	});
}

<!--分享到QQ--> 
function shareToQQ(title,summary,pic,url,site){	
	var p = {
			url:url, /*获取URL，可加上来自分享到QQ标识，方便统计*/
			desc:'', /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
			title:title, /*分享标题(可选)*/
			summary:summary, /*分享摘要(可选)*/
			pics:pic, /*分享图片(可选)*/
			flash: '', /*视频地址(可选)*/
			site:site||'', /*分享来源(可选) 如：QQ分享*/
			style:'201',
			width:32,
			height:32
		};
	var s = [];
	for(var i in p){
		s.push(i + '=' + encodeURIComponent(p[i]||''));
	}
	var _u='http://connect.qq.com/widget/shareqq/index.html?'+s.join('&'),
		w = window.screen.width,
		h = window.screen.height;
		window.open( _u,'分享到QQ好友', "height=600,width=800,top=" + (h-600)/2 + ",left=" + (w-800)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");	
}
/*  |xGv00|e2d4539745b4e31adb8910c08cccae90 */