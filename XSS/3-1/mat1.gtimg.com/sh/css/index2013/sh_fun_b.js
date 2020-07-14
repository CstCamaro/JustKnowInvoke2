//登录
D.login(
	function() {
	var info = D.login.getInfo();
	$('#logininfo').html('欢迎您 , <a href="http://t.qq.com" target="_blank">'+info.nick+'</a> <img width="30" class="face" id="h'+info.uin+'" /> <a onclick="D.login.loginOut()" href="javascript:void(0)">退出</a>');
	D.login.getFace(info.uin);
	},
	function () {
	$('#logininfo').html('<a href="javascript:;" class="mini_nav_qq_login" onclick="D.login.getLogin()"></a><a href="http://reg.t.qq.com/index.php?pref=qqcom.mininav">注册</a>');
	}
);


/*//取当前天气
function getWeather(){
	var time = new Date();
	var nowYear = time.getFullYear();
	var nowMonth = (time.getMonth()+1);
	var nowDay = time.getDate();
	var weekDay = time.getDay();
	var nowWeekday;
	var arr_week = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
	var arr_week1 = new Array("","星期一","星期二","星期三","星期四","星期五","星期六","星期日");
	var __weatherTxt = ['晴', '多云', '阴', '阵雨', '雷阵雨', '雷阵雨并伴有冰雹', '雨夹雪', '小雨', '中雨', '大雨', '暴雨', '大暴雨', '特大暴雨', '阵雪', '小雪', '中雪', '大雪', '暴雪', '雾', '冻雨', '沙尘暴', '小雨-中雨', '中雨-大雨', '大雨-暴雨', '暴雨-大暴雨', '大暴雨-特大暴雨', '小雪-中雪', '中雪-大雪', '大雪-暴雪', '浮尘', '扬沙', '强沙尘暴', '飑', '龙卷风', '弱高吹雪', '轻雾', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '霾']
	var __windDir = ['', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风', '北风', '旋转不定']
	var __windPower = ['微风', '3-4级', '4-5级', '5-6级', '6-7级', '7-8级', '8-9级', '9-10级', '10-11级', '11-12级']
    var __weatherMidImg = { 'defaultUrl': '//mat1.gtimg.com/weather/weatherIco/midImg/', 'ico': [{ 'img': 'm0.png' }, { 'img': 'm1.png' }, { 'img': 'm2.png' }, { 'img': 'm3.png' }, { 'img': 'm4.png' }, { 'img': 'm5.png' }, { 'img': 'm6.png' }, { 'img': 'm7.png' }, { 'img': 'm8.png' }, { 'img': 'm9.png' }, { 'img': 'm10.png' }, { 'img': 'm10.png' }, { 'img': 'm10.png' }, { 'img': 'm13.png' }, { 'img': 'm14.png' }, { 'img': 'm16.png' }, { 'img': 'm16.png' }, { 'img': 'm17.png' }, { 'img': 'm18.png' }, { 'img': 'm19.png' }, { 'img': 'm20.png' }, { 'img': 'm8.png' }, { 'img': 'm9.png' }, { 'img': 'm10.png' }, { 'img': 'm10.png' }, { 'img': 'm10.png' }, { 'img': 'm16.png' }, { 'img': 'm16.png' }, { 'img': 'm17.png' }, { 'img': 'm29.png' }, { 'img': 'm30.png' }, { 'img': 'm20.png' }, { 'img': 'm32.png' }, { 'img': 'm33.png' }, { 'img': 'm14.png' }, { 'img': 'm18.png'},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': ''},{'img': 'm29.png'}] };
	nowWeekday = arr_week[weekDay];
	var nowTimeHour = time.getHours();	
	var tKey = null;
	if(nowTimeHour<20&&nowTimeHour>4){
		//var n=weatherMap.weatherIcon[__weather_qqindex.wt].day;	
		var n=weatherMap.weatherIcon[__weather_city.wk['0'][0].wt].day;	
	} else{
		//var n=weatherMap.weatherIcon[__weather_qqindex.wt].night;
		var n=weatherMap.weatherIcon[__weather_city.wk['0'][0].wt].night;
	}		
	
	var timeBlance = nowYear+'-'+nowMonth+'-'+nowDay + ' 20:00:00';
	for (var t = 0; t < 14; t++) {
		if ( __weather_city.wk['0'][t].ts == timeBlance) {
			tKey = t;
			break;
		}
	}

	if(tKey == null){
		tKey=0;
	}else{
		tKey = tKey + 1;
	}

	var __wt = parseInt(__weather_qqindex.wt);
	var __wd = parseInt(__weather_city.wk['0'][0].wd);
	var __wp = parseInt(__weather_city.wk['0'][0].wp);

	var __bg = __weatherMidImg.defaultUrl + __weatherMidImg.ico[__wt].img;
	$('#weatherDay').html(nowYear+'-'+nowMonth+'-'+nowDay);
	$('#weatherWeekday').html(nowWeekday);
	$('#weatherIcon').attr('style','background:url('+n+') center center no-repeat');
	$('#weathertp').html(__weather_qqindex.tp+'℃');
	$('#nowTp1').html(__weatherTxt[__wt]);
	$('#nowTp2').html(__weather_qqindex.tmin+"℃~"+__weather_qqindex.tmax+"℃");
	$('#nowTp3').html(__windDir[__wd]+"("+__windPower[__wp]+")");
	$(".nowDayImg").attr('style','background:url('+__bg+') center center no-repeat');
	var showWeek='';
	

	for(var i=1;i<7;i++){
		if(nowTimeHour<18&&nowTimeHour>8){
			var nDay = __weather_city.wk['0'][i+i].te.split(" ")[0];
			var nWeekday = arr_week1[__weather_city.wk['0'][i+i].wkd];
			var nTp = __weather_city.wk['0'][i+i].tmax;
			var nWeek=weatherMap.weatherIcon[__weather_city.wk['0'][i+i].wt].day;	
			showWeek = showWeek + '<li><em class="nDay">'+nDay+'</em><em class="nWeekday">'+nWeekday+'</em><em class="nWeek" style="background:url('+nWeek+') center center no-repeat"></em><em class="nTp">'+nTp+'℃</em></li>'
		} else{
			var nDay = __weather_city.wk['0'][i+i-1].te.split(" ")[0];
			var nWeekday = arr_week1[__weather_city.wk['0'][i+i-1].wkd];
			var nTp =  __weather_city.wk['0'][i+i-1].tmax;
			var nWeek=weatherMap.weatherIcon[__weather_city.wk['0'][i+i-1].wt].night;
			showWeek = showWeek + '<li><em class="nDay">'+nDay+'</em><em class="nWeekday">'+nWeekday+'</em><em class="nWeek" style="background:url('+nWeek+') center center no-repeat"></em><em class="nTp">'+nTp+'℃</em></li>'
		}
	}
	$("#weWeek").append(showWeek);
}
getWeather();*/

//全局变量
var cNews = 0;	// 换头条的标识
$(function(){
	
	//导航
	$(".nav_sh_box > li").hover(function(){
		var tem = $(this).index();
		$(".nav_sh_con").addClass("undis");
		$(".nav_sh_con").eq(tem).removeClass("undis");
		$(".nav_sh_box > li").removeClass("on");
		$(this).addClass("on");
	});

	//一周天气
	$("#weather_out").hover(
		function(){$(".daybox").show()},
		function(){$(".daybox").hide()}
	);

	//换头条
	$("#h_cnews > .h_change > .h_change_up").click(function(){
			cNews -= 1;
			if (cNews < 0){
				cNews = $("#h_cnews > .hotnw").length -1;
			}
			$("#h_cnews > .hotnw").hide();
			$("#h_cnews > .hotnw").eq(cNews).fadeIn("");
	});

	$("#h_cnews > .h_change > .h_change_down").click(function(){
		cNews += 1;
			if (cNews> $("#h_cnews > .hotnw").length -1){
				cNews = 0;
			}
			$("#h_cnews > .hotnw").hide();
			$("#h_cnews > .hotnw").eq(cNews).fadeIn("");
	});

	//活动和优惠
	$(".h_hdyh_hd > ul > li").hover(function(){
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		$(".h_hdyh_bd > .h_hdyh_box").addClass("undis");
		$(".h_hdyh_bd > .h_hdyh_box").eq($(this).index()).removeClass("undis");
	});
	$(".sCode > .hd > .clo").click(function(){
		$(".mask").hide();
		$(".sCode > .bd > p").hide();
		$(".sCode").addClass("undis");
	});

	//热专题
	$("#h_hzt > .bd > ul >li").hover(function(){
		$(this).siblings("li").removeClass("on");
		$(this).addClass("on");
	});

	//图片集
	$(".ppic").hover(
		function(){
			$(this).find(".pshare").show();
		},
		function(){
			$(this).find(".pshare").hide();
		}
	);

	//网站地图
	$(".webmap > .hd").click(
		function(){
			if($(this).find("span").hasClass("down")){
				$(".webmap > .bd").slideUp();
				$(this).find("span").removeClass("down");
			}else{
				$(".webmap > .bd").slideDown();
				$(this).find("span").addClass("down");
			}
		}
	);
	$(".mapbox > .split").hover(
		function(){
			$(this).css("background-color","#809ee3")	;
		},
		function(){
			$(this).css("background-color","#8eb4f2")	;
		}
	);
	//图片分享
	$(".pshare").hover(
		function(){

			var tem = '<div class="shshare cf"><a href="javascript:;" target="_self" class="share_sina" onclick="picshare(this,0)"></a><a href="javascript:;" class="share_tqq" target="_self" onclick="picshare(this,1)"></a><a href="javascript:;" class="share_tzone" target="_self" onclick="picshare(this,2)"></a><a href="javascript:;" class="share_tmali" target="_self" onclick="picshare(this,3)"></a><a href="javascript:;" class="share_kx" target="_self" onclick="picshare(this,4)"></a><a href="javascript:;" class="share_rr" target="_self" onclick="picshare(this,5)"></a></div>' ;
			$(this).append(tem);
		},
		function(){
			$(".shshare").remove();
		}
	);
	//文章分享
	$(".plS").hover(
		function(){
			var tem = '<div class="shtxtshare cf"><a href="javascript:;" target="_self" class="share_sina" onclick="txtshare(this,0)"></a><a href="javascript:;" class="share_tqq" target="_self" onclick="txtshare(this,1)"></a><a href="javascript:;" class="share_tzone" target="_self" onclick="txtshare(this,2)"></a><a href="javascript:;" class="share_tmali" target="_self" onclick="txtshare(this,3)"></a><a href="javascript:;" class="share_kx" target="_self" onclick="txtshare(this,4)"></a><a href="javascript:;" class="share_rr" target="_self" onclick="txtshare(this,5)"></a></div>' ;
			$(this).append(tem);
		},
		function(){
			$(".shtxtshare").remove();
		}
	);
	

});

//回到顶部
(function() {
    var $backToTopEle = $('.backtop > a');
	$backToTopEle.click(function() {
            $("html, body").animate({ scrollTop: 0 }, 500);
    });
	var $backToTopFun = function() {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 0)? $(".backtop").css('display','block') : $(".backtop").css('display','none');	
        //IE6下的定位

        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 310);    
        }
    };
    $(window).bind("scroll", $backToTopFun);
    $(function() { $backToTopFun(); });
})();

//图片分享
function picshare(obj , key){
		var articleTitle = $(obj).parent().parent().siblings("a").find("img").attr("alt");
		var articlePic = $(obj).parent().parent().siblings("a").find("img").attr("data-original");
		var articleURL = $(obj).parent().parent().siblings("a").attr("href");
		
		switch(key){
			case 0:	{
				shareToSina(articleTitle,articleURL,articlePic);
				break;
			}
			case 1:	{
				postToWb(articleTitle,articlePic,articleURL);
				break;
			}
			case 2:	{
				postToQzone(articleTitle,'',articlePic,articleURL);
				break;
			}
			case 3:	{
				postToQQEmail(articleTitle,'',articlePic,articleURL);
				break;
			}
			case 4:	{
				shareToKaixin(articleTitle,articleURL);
				break;
			}
			case 5:	{
				shareToRenren(articleTitle,articleURL);
				break;
			}
		}
}
//文章分享
function txtshare(obj , key){
		var articleTitle = $(obj).parent().parent().attr("title");
		var articleURL = $(obj).parent().parent().attr("slink");
		
		switch(key){
			case 0:	{
				shareToSina(articleTitle,articleURL,'');
				break;
			}
			case 1:	{
				postToWb(articleTitle,'',articleURL);
				break;
			}
			case 2:	{
				postToQzone(articleTitle,'','',articleURL);
				break;
			}
			case 3:	{
				postToQQEmail(articleTitle,'','',articleURL);
				break;
			}
			case 4:	{
				shareToKaixin(articleTitle,articleURL);
				break;
			}
			case 5:	{
				shareToRenren(articleTitle,articleURL);
				break;
			}
		}
}

//设置为首页
function SetHome(obj,vrl){
        try{
                obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
        }
        catch(e){
                if(window.netscape){
                        try{
                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
                        }catch (e){
                        		alert('抱歉！您的浏览器不支持直接设为首页。请在浏览器地址栏输入"about:config"并回车然后将[signed.applets.codebase_principal_support]设置为"true"，点击"加入收藏"后忽略安全提示，即可设置成功。');
                        }
                        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                        prefs.setCharPref('browser.startup.homepage',vrl);
                 }else{  
		        alert('抱歉，您的浏览器不支持自动设置首页, 请使用浏览器菜单手动设置!');
		    }
        }
}

//焦点图
Qfast.add('fx', { path: "//mat1.gtimg.com/joke/Koala/plusfx1.0.min.js", type: "js" });  
Qfast.add('widgets', { path: "//mat1.gtimg.com/joke/Koala/plus/Terminator2.2.min.js", type: "js", requires: ['fx'] });  
Qfast(false, 'widgets', function () {  
	K.tabs({  
		id: 'focus', 
		conId: "D1pic1", 
		tabId:"D1fBt",  
		tabTn:"a",  
		conCn: '.fcon',
		auto: 1,
		effect: '',
		eType: 'mouseover', 
		pageBt:true,
		bns: ['.prev', '.next'],                              
		interval: 4000
	})  

})  

	//分享到微博 参数说明：title说明文字，pic小图片，url分享要链接到的地址
	function postToWb(title,pic,url){
		var _t = encodeURI(title);//当前页面title，使用document.title
		var _url = encodeURIComponent(url);//当前页的链接地址使用document.location
		var _appkey = 801298467;//你从腾讯获得的appkey，如果有appkey,直接写入key值，例如：_appkey=123456
		var _pic = encodeURI(pic);//（例如：var _pic='图片url1|图片url2|图片url3....）
		var _site = 'http://sh.qq.com';//你的网站地址
		var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic;
		w = window.screen.width, h = window.screen.height;
		window.open( _u,'分享到腾讯微博', "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
	}

	//分享到QQ空间  参数说明：title标题，summary摘要，pic小图片，url分享要链接到的地址
		function postToQzone(title,summary,pic,url){
			var p = {
				url:url,
				showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
				desc:'',/*默认分享理由(可选)*/
				summary:summary,/*分享摘要(可选)*/
				title:title,/*分享标题(可选)*/
				site:'',/*分享来源 如：腾讯网(可选)*/
				pics:pic, /*分享图片的路径(可选)*/
				style:'203',
				width:98,
				height:22
				};
				var s = [];
				for(var i in p){
				s.push(i + '=' + encodeURIComponent(p[i]||''));
				}
				var _u='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+s.join('&');
						w = window.screen.width, h = window.screen.height;
						window.open( _u,'分享到QQ空间和朋友网', "height=580,width=708,top=" + (h-580)/2 + ",left=" + (w-708)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
		}

		//分享到QQ邮箱
		function postToQQEmail(title,summary,pic,url){
			var p = {
			url:url,/*当前页面url，使用location.href*/
			to:'qqmail',
			desc:'', /*默认分享理由(可选)*/
			summary:summary,/*摘要(可选)*/
			title:title,/*分享标题(可选)*/
			site:'',/*分享来源 如：腾讯网(可选)*/
			pics:pic /*分享图片的路径(可选)*/
			};
			var s = [];
			for(var i in p){
			s.push(i + '=' + encodeURIComponent(p[i]||''));
			}
			w = window.screen.width, h = window.screen.height;
			var _u = 'http://mail.qq.com/cgi-bin/qm_share?'+ s.join("&");
			window.open( _u,'分享到QQ邮箱', "height=580,width=708,top=" + (h-580)/2 + ",left=" + (w-708)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
		};


		//分享到新浪微博
		function shareToSina(articleTitle,articleURL,articlePic){
			var url = "http://v.t.sina.com.cn/share/share.php",
			_url = articleURL,
			_title = articleTitle,
			_appkey = '',
			_ralateUid = '',
			c = '', pic = articlePic;
			w = window.screen.width, h = window.screen.height;
			c = url + "?url=" + encodeURIComponent(_url) + "&appkey=" + _appkey + "&title=" + _title + "&pic=" + pic + "&ralateUid=" + _ralateUid + "&language=";
			window.open(c, "shareQQ", "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
		}
		//分享到开心
		function shareToKaixin(articleTitle,articleURL){
			var url = "http://www.kaixin001.com/rest/records.php",
			_url = articleURL,
			_title = articleTitle,
			c = '', pic = [],
			w = window.screen.width, h = window.screen.height;
			c = url + "?content=" + encodeURIComponent(_title) + "&url=" + _url + "&&starid=&aid=&style=11&t=10";
			var win = window.open(c, "shareQQ", "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
		}
		//分享到人人
		function shareToRenren(articleTitle,articleURL){
			var url = "http://widget.renren.com/dialog/share",
			_url =articleURL,
			_title =articleTitle,
			c = '', pic = [],
			w = window.screen.width, h = window.screen.height;
			c = url + "?resourceUrl=" + _url + "&title=" + _title + "&charset=GB2312";
			window.open(c, "shareQQ", "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
		}

	var shareFlag=0;
	function shareshow(o){
		o.getElementsByTagName('div')[0].style.display='block';
	}
	function sharehide(o){
		o.getElementsByTagName('div')[0].style.display='none';
	}

	document.domain = 'qq.com';
	var votenum = [];
	var allnum = 0;
	(function () {
	var AppPlatform = window['AppPlatform'] = {
		Survey: {
			Input: {
				callback: function (a, b) {
					try {
						window.frames["Ansy_Post"].location.replace("about:blank")
					} catch (e) { };
					document.getElementById("Ansy_Post").innerHTML = '<iframe id="Ansy_Post_iframe" name="Ansy_Post_iframe" src="about:blank" style="display:none"></iframe>';
					switch (a) {
						case '0':
							alert('感谢投票');
							var colArr = [];
							var tempNum = 0;
							allnum = allnum+1;
							var key = parseInt(AppPlatform.optid);
							votenum[key] = parseInt(votenum[key]) +1;
							for (var i = 0; i < votenum.length-1; i++) {
								colArr[i] = Math.round(votenum[i] / allnum * 100) / 100;
								tempNum += colArr[i] * 100;
							}
							colArr[votenum.length-1] = (100 - tempNum) / 100;
							for (var i2 = 0; i2 < votenum.length; i2++) {
								document.getElementById("show_"+i2).innerHTML = Math.round(colArr[i2] * 100) + "%";
							}
							break;
						case '3':
							alert('对不起，该投票尚未开始，请稍侯参与');
							break;
						case '4':
							alert('对不起，该投票已结束');
							break;
						case '5':
							alert('对不起，该投票尚未发布');
							break;
						case '11':
							alert('对不起，您已参与过此投票，请勿重复提交');
							break;
						case '14':
							alert('请登录参与投票!');
							document.getElementById("Login_Box").style.display = "block";
							document.getElementById("Login_Frame").src = 'http://ui.ptlogin2.qq.com/cgi-bin/login?target=top&link_target=blank&f_url=loginerroralert&hide_title_bar=1&style=1&appid=5000501&s_url=http://lady.qq.com/vote20120323.htm';
							return false;
							break;
						default:
							var subId = b.split("-")[0], optid = b.split("-")[1].split(":")[0], count = b.split("-")[1].split(":")[1];
							var show = document.getElementById("show_" + AppPlatform.bigid + "_" + AppPlatform.sid + "_" + AppPlatform.optid);
							if (show) {
								show.innerHTML = parseInt(count) + parseInt(show.innerHTML);
							}
					}

				}
			}
		}
	};

	var vote=window['vote']=function(arg) {
		this.voteData = arg;
		this.voteL = this.voteData.length;

		this.resultJson = null;
		this.sbjinfo = null;
	}

	vote.prototype = {
		loaded: function (pjtId, callback) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = '//page.vote.qq.com/?id=' + pjtId + '&tpl=json&result=yes';

			var head = document.getElementsByTagName('head')[0];
			head.appendChild(script);

			if (script.attachEvent) {
				script.attachEvent('onreadystatechange', function () {
					if (script.readyState == 'loaded' || script.readyState == 'complete') {
						callback();
					}
				})
			} else if (script.addEventListener) {
				script.addEventListener('load', callback, false);
			} else {
				callback();
			}

		},
		bind: function (o, eType, fn) {

			if (o.attachEvent) {
				o.attachEvent('on' + eType, fn);
			} else {
				o.addEventListener(eType, fn, false);
			}

		},
		post: function (vSequ, vId, vSubjId, vOptId, a, b) {
			AppPlatform.bigid = vSequ;
			AppPlatform.optid = b;
			AppPlatform.sid = a;

			var vvId = document.createElement('input');
			vvId.type = 'hidden';
			vvId.name = 'PjtID';
			vvId.value = vId;

			var vResult = document.createElement('input');
			vResult.type = 'hidden';
			vResult.name = 'result';
			vResult.value = '0';

			var vFmt = document.createElement('input');
			vFmt.type = 'hidden';
			vFmt.name = 'fmt';
			vFmt.value = 'js';

			var vSbj = document.createElement('input');
			vSbj.type = 'hidden';
			vSbj.name = 'sbj_' + vSubjId + '[]';
			vSbj.value = vOptId;

			var vWb = document.createElement('input');
			vWb.type = 'hidden';
			vWb.name = 'wb';
			vWb.value = '1';

			var postFormId = 'voteContainer_' + vSequ + '_form';
			var postForm = document.getElementById(postFormId);

			postForm.appendChild(vvId);
			postForm.appendChild(vResult);
			postForm.appendChild(vFmt);
			postForm.appendChild(vSbj);
			postForm.appendChild(vWb);

			postForm.target = 'Ansy_Post_iframe';
			postForm.action = 'http://input.vote.qq.com/survey.php';
			postForm.method = 'post';

			if (this.resultJson.f_RuleId == '2') {
				if (this.getCookie('uin') == null) {
					document.getElementById("Login_Box").style.display = "block";
					document.getElementById("Login_Frame").src = 'http://ui.ptlogin2.qq.com/cgi-bin/login?target=top&link_target=blank&f_url=loginerroralert&hide_title_bar=1&style=1&appid=5000501&s_url=http://joke.qq.com/vote20120326.htm';
					return false;
				}
			}
			postForm.submit();
		},
		getCookie: function (a) {
			var b = document.cookie.match(new RegExp("(^| )" + a + "=([^;]*)(;|$)"));
			if (b != null) {
				return window.unescape(b[2])
			}
			return null
		},
		init: function () {
			var voteId = this.voteData[0].voteId;
			var sequ = this.voteData[0].sequ;

			if (document.getElementById('Ansy_Post_iframe')) {
				var iframe = document.createElement('iframe');
				iframe.id = 'Ansy_Post_iframe';
				iframe.name = 'Ansy_Post_iframe';
				iframe.style.display = 'none';

				var Ansy_Post = document.getElementById('Ansy_Post');
				Ansy_Post.appendChild(iframe);

			}
			var _this = this;
			this.loaded(voteId, function () {
				_this.resultJson = {};
				_this.resultJson = PrjtInfo;

				var pjtId = _this.resultJson.f_PjtId;
				_this.sbjinfo = _this.resultJson.sbjinfo;

				var l = _this.sbjinfo.length;
				
				for (var i = 0; i < l; i++) {
					var sbjId = _this.sbjinfo[i].f_SbjId;
					var optinfo = _this.sbjinfo[i].optinfo;
					var m = optinfo.length;

					for (var j = 0; j < m; j++) {
						var showE = 'show_' + sequ + '_0_' + j;
						var showBox = document.getElementById(showE);
						votenum[j] = optinfo[j].f_Count;
						allnum += parseInt(optinfo[j].f_Count);
						if (showBox) {
							showBox.innerHTML = optinfo[j].f_Count;
						}
						
						(function (a, b) {
							var voteBtn = 'voteBtn_' + sequ + '_0_' + b;
							var vBtn = document.getElementById(voteBtn);
							var OptId = optinfo[b].f_OptId;

							if (vBtn) {
								_this.bind(vBtn, 'click', function () {
								_this.post(sequ, pjtId, sbjId, OptId, a, b);
								})
							}
						})(i, j)
					}
				}
				
				var argL = _this.voteData.length;
				if (argL > 1) {
					_this.voteData.shift();
					setTimeout(function () {
						_this.resultJson = {};
						_this.init();
					}, 100)

				}
			});
		}
	}
	})();/*  |xGv00|2fe2e451aa0788b8d6f96417be9ce759 */