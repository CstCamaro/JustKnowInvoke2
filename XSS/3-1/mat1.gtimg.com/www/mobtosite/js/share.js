//share
var share = {
	/**
    * 分享到腾讯微博
	* Rich化必须满足条件
	* 1）title, url不为空，同时line1,line2,line3中至少一个不为空；
    * 2）接口根据url，pic参数，判断为视频页面或能获取到有效图片。
    * 如果不满足rich化转播条件，则会进行普通微博转播。
    * @param {Object} opt {
	*   title  : 分享的文字内容，rich化最多15个全角字符长度
	*   url    : 分享的资源Url
    *   pic    ：需要分享的图片url，多张以|连接 
	*   appkey ：用于分享后显示来源
    *   line1  ：图片右边第一行的文字，最多15个全角字符的长度
    *   line2  ：图片右边第二行的文字，最多15个全角字符的长度
    *   line3  ：图片右边第三行的文字，最多50个全角字符的长度
	* }
	**/
	share2qq:function(opt){
		var head =  'http://connect.qq.com/widget/shareqq/index.html?';
		opt = opt?opt:{};
		opt.title = opt.title?opt.title:$(document).attr('title');	
		opt.url = opt.url?opt.url:window.location.href;
		this._shareto(head,opt);
	},
	
   /**
    * 分享到腾讯微博
	* Rich化必须满足条件
	* 1）title, url不为空，同时line1,line2,line3中至少一个不为空；
    * 2）接口根据url，pic参数，判断为视频页面或能获取到有效图片。
    * 如果不满足rich化转播条件，则会进行普通微博转播。
    * @param {Object} opt {
	*   title  : 分享的文字内容，rich化最多15个全角字符长度
	*   url    : 分享的资源Url
    *   pic    ：需要分享的图片url，多张以|连接 
	*   appkey ：用于分享后显示来源
    *   line1  ：图片右边第一行的文字，最多15个全角字符的长度
    *   line2  ：图片右边第二行的文字，最多15个全角字符的长度
    *   line3  ：图片右边第三行的文字，最多50个全角字符的长度
	* }
	**/
	share2tmblog:function(opt){
		var head =  'http://share.v.t.qq.com/index.php?c=share&a=index&';
		opt = opt?opt:{};
		opt.title = opt.title?opt.title:$(document).attr('title');	
		opt.url = opt.url?opt.url:window.location.href;
		this._shareto(head,opt);
	},
	
   /**
    * 分享到QQ空间
    * @param {Object} opt {
	*   url       : 分享的资源Url
	*   desc      : 默认分享理由(可选)
	*   summary   : 分享摘要(可选)
	*   title     : 分享标题(可选)
	*   site      : 分享来源 如：腾讯网(可选)
	*   pics      : 分享图片的路径(可选)
	* }
	**/
	share2qzone:function(opt){
		var head = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
		opt = opt?opt:{};
		opt.title = opt.title?opt.title:$(document).attr('title');	
		opt.url = opt.url?opt.url:window.location.href;
		this._shareto(head,opt);
		
	},
	
	/**
    * 分享到腾讯朋友
    * @param {Object} opt {
	*   url       : 分享的资源Url
	*   desc      : 默认分享理由(可选)
	*   summary   : 分享摘要(可选)
	*   title     : 分享标题(可选)
	*   site      : 分享来源 如：腾讯网(可选)
	*   pics      : 分享图片的路径(可选)
	* }
	**/
	share2tpeng:function(opt){
		var head = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&';
		opt = opt?opt:{};
		opt.title = opt.title?opt.title:$(document).attr('title');	
		opt.url = opt.url?opt.url:window.location.href;
		this._shareto(head,opt);
	},
	
	/**
    * 分享到新浪微博
    * @param {Object} opt {
	*	url       : 分享的资源Url
	*	appkey    : 您申请的应用appkey,显示分享来源(可选)
	*	title     : 分享的文字内容(可选)
	*	pic       : 分享图片的路径(可选)
	* }
	**/
	share2sina:function(opt){
		var head = 'http://service.weibo.com/share/share.php?rnd=' + new Date().valueOf() + '&';
		opt = opt?opt:{};
		opt.title = opt.title?opt.title:$(document).attr('title');	
		opt.url = opt.url?opt.url:window.location.href;
		this._shareto(head,opt);
	},
	
	/**
    * 分享到人人网
    * @param {Object} opt {
	*	resourceUrl : 分享的资源Url
	*	srcUrl      : 分享的资源来源Url
	*	pic         : 分享的主题图片Url
	*	title       : 分享的标题
	*	description : 分享的详细描述
	* }
	**/
	share2renren:function(opt){
		var head = 'http://widget.renren.com/dialog/share?';
		opt = opt?opt:{};
		opt.title = opt.title?opt.title:$(document).attr('title');	
		opt.resourceUrl = opt.resourceUrl?opt.resourceUrl:window.location.href;
		this._shareto(head,opt);
	},
	
	
	/**
    * 分享到QQ邮箱
    * @param {Object} opt {
	*	url     : 分享的资源Url
	*	desc    : 默认分享理由(可选)
	*	summary : 摘要(可选)
	*	title   : 分享标题(可选)
	*	site    : 分享来源 如：腾讯网(可选)
	*	pics    : 分享图片的路径(可选)
	* }
	**/
	share2qmail:function(opt){
		var head = 'http://mail.qq.com/cgi-bin/qm_share?to=qqmail&';
		opt = opt?opt:{};
		opt.title = opt.title?opt.title:$(document).attr('title');	
		opt.url = opt.url?opt.url:window.location.href;
		this._shareto(head,opt);
	},
	
	/**
    * 分享到开心网
    * @param {Object} opt {
	*	url       : 分享的资源Url
	*	content   : (可选)分享的文字内容
	*	pic       : (可选)分享的图片,多个使用半角逗号分隔
	* }
	**/
	share2kaixin:function(opt){
		var head = 'http://www.kaixin001.com/rest/records.php?style=11&';
		opt = opt?opt:{};
		opt.title = opt.title?opt.title:$(document).attr('title');		
		opt.url = opt.url?opt.url:window.location.href;
		this._shareto(head,opt);
	},
	
	
	_isEmptyObj:function(opt){
		for(var name in opt){
			return false;
		}
		return true;
	},
	
	_shareto:function(head,opt){
		var param_str = [];
		for(var key in opt){
			param_str.push(key + '=' + encodeURIComponent(opt[key]||''));
		}
		var share_url = head + param_str.join('&');
		window.open(share_url);
	}
};/*  |xGv00|f7d9e85140d2ab50099953408bc8b9a2 */