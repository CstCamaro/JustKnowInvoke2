/**
 * Created by wpzheng on 2015/1/25.
 */
// 分享
function shareaside(o){
	//参数说明：self.tit说明文字，self.pic小图片，self.url分享要链接到的地址
	var self = this;
	self.tit = o.tit;
	self.pic = o.pic;
	self.titsummary = o.intro;
	self.url = o.url;
}
shareaside.prototype={
	postToWb:function(){
		var _t = encodeURI(this.tit);//当前页面title，使用document.title
		var _url = encodeURIComponent(this.url);//当前页的链接地址使用document.location
		var _appkey = encodeURI("appkey");//你从腾讯获得的appkey，如果有appkey,直接写入key值，例如：_appkey=123456
		var _pic = encodeURI(this.pic);//（例如：var _pic='图片url1|图片url2|图片url3....）
		var _site = '';//你的网站地址
		var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic;
		window.open( _u,'分享到腾讯微博');
	},
	//参数说明：title标题，summary摘要，pic小图片，url分享要链接到的地址
	postToQzone:function (){
		var _url = encodeURIComponent(this.url);//当前页的链接地址使用document.location
		var _t = encodeURI(this.tit);//当前页面title，使用document.title
		var _pic = encodeURI(this.pic);//（例如：var _pic='图片url1|图片url2|图片url3....）
		var _summary=encodeURIComponent('');
		var _u = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+_url+'&title='+_t+'&pics='+_pic+'&summary='+_summary;
		window.open( _u,'分享到QQ空间和朋友网');
	},
	shareToSina:function(){
		var url = "http://v.t.sina.com.cn/share/share.php",
			_url = this.url,
			_title = this.tit,
			_appkey = '',
			_ralateUid = '',
			c = '', pic = this.pic;
		c = url + "?url=" + encodeURIComponent(_url) + "&appkey=" + _appkey + "&title=" + _title + "&pic=" + pic + "&ralateUid=" + _ralateUid + "&language=";
		window.open(c, "shareQQ", "height=480,width=608,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
	},
	share2qq:function (){
		//var l = document.getElementById('imgBox').getElementsByTagName('img')[0];
		var a = "http://connect.qq.com/widget/shareqq/index.html",
			d = this.url,
			m = this.tit,
			pic=this.pic,
			pl = '加点评论吧...',
			b = "",
			x = window.screen.width,
			y = window.screen.height;
		h = "", k = ""; //g = l.join("||")||"";
		k = a + "?url=" + encodeURIComponent(d) + "&showcount=0&desc=" + encodeURIComponent(pl) + "&summary=" +  encodeURIComponent(this.titsummary) + "&title="+ encodeURIComponent(m) + "&pics="+ pic +"&style=203&width=19&height=22";
		window.open(k, "", "height = 680, width = 960, top = "+(y-680)/2 + ", left = " + (x-960)/2 + ", toolbar = no, menubar = no, resizable = yes, location = yes,status = no" );
	},
	init:function(){
		var _this=this;
		$('.wb_list').bind('click',function(){
			_this.postToWb();
		});
		$('.qzone_list').bind('click',function(){
			_this.postToQzone();
		});
		$('.xl_list').bind('click',function(){
			_this.shareToSina();
		});
		$('.qq_list').bind('click',function(){
			_this.share2qq();
		});
	}
}

var share1= new shareaside({
	"tit": $("#share_title").html(),
	"pic": $("#share_pic").attr("src"),
	"url": window.location.href,
	"intro": $("#share_intro").html()
});
share1.init();/*  |xGv00|9c247a1a04005c1d702863b6c0e3f099 */