
document.domain="qq.com";

//底部工具 S
var T = 92, statu1 = 0, t = 0, tt = null, navVar = false, isTCBD = false, nav = qq.G('nav'), goTop = qq.G("goTop"), ie6 = qq.B.ie6, temp, g_tcbd_cfr = {}, userLoginStatus = 0, clickStu = false, accessPlayer, Face, nick;


var timer_scroll = null;
function windowScroll(pos, fun){
	var speed = 0;
	clearInterval(timer_scroll);
	timer_scroll = setInterval(function(){
		speed = (pos - qq.scrollY())/5;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if( qq.scrollY() == pos ) { clearInterval(timer_scroll); fun && fun() }
		else{
			qq.scrollTo(0, qq.scrollY() + speed);
		}
	}, 10);
}

qq.EA(window, 'scroll', function(){
	var t = qq.scrollY();
	//返回顶部按钮
	qq.scrollY() > 400 ? goTop.style.display = "block" : goTop.style.display = "none";

	if(ie6){
		ie6Fixed('scrollBtn', 400);
	}
	
	if(!ie6){
		if(t < T){
			T = t + 1;
			if(navVar) return;
			else {
				qq.G('nav').style.position = 'fixed';
				navVar = true;
			}
		}else{
			T = t;
			if(!navVar) return;
			else {
				qq.G('nav').style.position = 'static';
				navVar = false;
			}
		}
	}

});

qq.G('goTop') && qq.EA(qq.G('goTop'), 'click', function(){
	windowScroll(0);
	return false
});
//ie6 scrollBtn Fixed
function ie6Fixed(obj, posT){
	qq.G(obj).style.top = document.documentElement.scrollTop + document.body.scrollTop  + posT + "px";
}
//顶部图片根据浏览器宽度自适应
qq.EA(window, 'load', function(){
	var w = qq.windowWidth();
	showTopPic(w);
	aiKan();
});
//大家爱看；
function aiKan(){
	qq.G('aikan') && qq.get(aiKan_url, function(s){
		qq.G('aikan').innerHTML = s;
		qq.getScript('http://www.qq.com/mb/mat1/mb/js/mi.api.js', function(){
			MIRun(function(){
				//初始化
				MIApi.init({
					id : weiboID,
					user : {
						account : 'qqcom',
						name : 'qqcom'
					},
					login : function(){ //自定义登录，默认为微博的快速登录
						document.getElementById("layoutBg").style.display = "block";
						document.getElementById("layoutBg").style.height = document.body.clientHeight + "px";

						document.getElementById("login_one_frame").src = "http://ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=636014201&target=self&s_url=http%3A//www.qq.com/qq2012/loginSuccess.htm";
						document.getElementById("login_div").style.left = "50%";
					},
					css : false //是否异步引入主css，默认true
				});
				MI.TalkBox.prototype.source = '1000001'
			});
		}, 'utf-8');
		qq.getCss('http://mat1.gtimg.com/www/css/qq2012/weiboApiStyle.css', function(){});
		temp = qq.GC(qq.G('aikan'), '.love-read')[0];
		temp.style.background = '#f6f9fe';
		temp['isShow'] = true;
		qq.each(qq.GC(qq.G('aikan'), '.love-read'), function(a, b){
			a.onmouseover = function(e){
				if(this['isShow']) return; 
				else {
					qq.show(qq.GC(this, '.love-read-con')[0]);
					this.style.background = '#f6f9fe'
					this['isShow'] = true;
					qq.hide(qq.GC(temp, '.love-read-con')[0]);
					temp.style.background = '#fff'
					temp['isShow'] = false;
					temp = this;
				}
			}
		});
		var showTime = function(){
			var d = new Date(), H = parseInt(d.getHours()), M = parseInt(d.getMinutes());
			var t = qq.G('Atime').innerHTML, h = parseInt(t.split(' ')[1].split(':')[0]), m = parseInt(t.split(' ')[1].split(':')[1]);

			var mm =  (H*60 + M) - (h*60 + m);
	//console.log(mm);
			var formatTime = function(m){
				//return (Math.floor(m/60) > 0 ? (Math.floor(m/60) + '小时') : '' ) +  ((m%60) + '分钟前');
				return Math.floor(m/60) > 0 ? (Math.floor(m/60) + '小时前') : ((m%60) + '分钟前');
			}
			qq.G('Atime').innerHTML = formatTime(mm);
		}
		showTime();
		
		qq.EA(qq.G('Atime'), 'click', function(){
			aiKan();
		});

	});
}
//热门推荐
qq.EA(window, 'resize', function(){
	var w = qq.windowWidth();
	showTopPic(w);
	
	
});
function showTopPic(w){
	try{
		var _picList = qq.GT(qq.G('topPic'), 'dl');
		_picList[0].style.cssText = 'float:left';
		if(w <= 1280){
			_picList[3].style.cssText = 'float:right';
			_picList[4].style.cssText = 'display:none';
			_picList[5].style.cssText = 'display:none';
			
		}else if(w > 1280 && w <= 1440){
			_picList[3].style.cssText = '';
			_picList[4].style.cssText = 'float:right; display:block';
			_picList[5].style.cssText = 'display:none';
		}else if(w > 1440){
			_picList[3].style.cssText = '';
			_picList[4].style.cssText = '';
			_picList[5].style.cssText = 'float:right; display:block';
		}
	}catch(e){}	
}

// loagin S
//login argument
var login_wnd = qq.G("login_div"), login_bg = qq.G("layoutBg"), weiboNum = qq.G("weiboNum"), msgNum = qq.G("msgNum"), atNum = qq.G("atNum"), fansNum = qq.G("fansNum"),
qzoneNum = qq.G("qzoneNum"), passiveNum = qq.G("passiveNum"), InitNum = qq.G("InitNum"), AboutNum = qq.G("AboutNum"),
mailNum = qq.G("mailNum"), inboxNum = qq.G("inboxNum"), bottleNum = qq.G("bottleNum"), gmailNum = qq.G("gmailNum");



function ptlogin2_onResize(width, height) {
	var t = '';
	t = '; top:' + (ie6 ? document.documentElement.clientHeight/2 + document.documentElement.scrollTop + 'px' : '50%');
	//获得浮动Div对象
	if (login_wnd)  {
		login_wnd.style.cssText = 'width:' + width + 'px; height:' + height + 'px; display:block; margin-left:-' +  parseInt(width/2) + 'px; margin-top:-' + parseInt(height/2) + t;
	}
}
function ptlogin2_onClose(){
	login_wnd.style.left = "-9999px";
	login_bg.style.display = "none";
}
function userLogin(){
	qq.G("login_one_frame").src = "http://ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=636014201&target=self&s_url=http%3A//www.qq.com/qq2012/loginSuccess.htm";
	login_bg.style.cssText = 'display:block; height:' + document.body.clientHeight + 'px';
}

/*一键登录数据*/
function loginAll(obj){
	if(obj.result == 0){
		MblogTotalnum = obj.info.Mblog.totalnum || 0; qq.localData.set('Mblog-totalnum', obj.info.Mblog.totalnum);
		MblogMsgnum = obj.info.Mblog.msgnum || 0; qq.localData.set('Mblog-msgnum', obj.info.Mblog.msgnum);
		MblogAtnum = obj.info.Mblog.atnum || 0; qq.localData.set('Mblog-atnum', obj.info.Mblog.atnum);
		MblogFansnum = obj.info.Mblog.fansnum || 0; qq.localData.set('Mblog-fansnum', obj.info.Mblog.fansnum);

		QZoneTotalnum = obj.info.QZone.totalnum || 0; qq.localData.set('QZone-totalnum', obj.info.QZone.totalnum);
		QZonePassivenum = obj.info.QZone.passivenum || 0; qq.localData.set('QZone-passivenum', obj.info.QZone.passivenum);
		QZoneInitnum = obj.info.QZone.initnum || 0; qq.localData.set('QZone-initnum', obj.info.QZone.initnum);
		QZoneAboutnum = obj.info.QZone.aboutnum || 0; qq.localData.set('QZone-aboutnum', obj.info.QZone.aboutnum);

		QMailTotalnum = obj.info.QMail.totalnum || 0; qq.localData.set('QMail-totalnum', obj.info.QMail.totalnum);
		QMailInboxnum = obj.info.QMail.inboxnum || 0; qq.localData.set('QMail-inboxnum', obj.info.QMail.inboxnum);
		QMailBottlenum = obj.info.QMail.bottlenum || 0; qq.localData.set('QMail-bottlenum', obj.info.QMail.bottlenum);
		QMailGmailnum = obj.info.QMail.gmailnum || 0; qq.localData.set('QMail-gmailnum', obj.info.QMail.gmailnum);
		QMailDmailnum = obj.info.QMail.dmailnum || 0; qq.localData.set('QMail-dmailnum', obj.info.QMail.dmailnum);

		userInfoName = obj.nick.replace(/</,"&lt;").replace(/>/,"&gt;"); qq.localData.set('nick', userInfoName);
		userInfoVip = obj.Vip; 
		
		if(!userInfoVip){
			qq.localData.set('Vip', 0);	
		}else{
			qq.localData.set('Vip', userInfoVip);
		}
		
		userInfoFace = obj.Face || 'http://mat1.gtimg.com/news/dc/temp/c1.jpg'; qq.localData.set('Face', userInfoFace || 'http://mat1.gtimg.com/news/dc/temp/c1.jpg');

		Face = obj.Face;
		nick = obj.nick;

		if(userInfoVip != 0){
			qq.G('userVip_num').innerHTML = userInfoVip;
			qq.show(qq.G('userVip1'));
			qq.show(qq.G('userVip2'));
			qq.G('userVip2').style.display = 'inline';
		}else{
			qq.hide(qq.G('userVip1'));
			qq.hide(qq.G('userVip2'));
		}
		
		
		qq.A(qq.G('userPic_s'), 'src', userInfoFace);
		qq.A(qq.G('userPic_b'), 'src', userInfoFace);
		
		if(MblogTotalnum){
			if(MblogTotalnum > 99){
				weiboNum.innerHTML = "99+";
			}else{
				weiboNum.innerHTML = MblogTotalnum;
			}
			weiboNum.style.cssText = 'padding:0 7px';
			if(MblogMsgnum != "" || MblogMsgnum != 0){
				msgNum.innerHTML = MblogMsgnum;
				qq.show(qq.G("msgLi"));
			}
			if(MblogAtnum != ""){
				atNum.innerHTML = MblogAtnum;
				qq.show(qq.G("atLi"));
			}
			if(MblogFansnum != ""){
				fansNum.innerHTML = MblogFansnum;
				qq.show(qq.G("fansLi"));
			}
		}else{
			qq.G("weiboTitle").innerHTML = "<a href='http://t.qq.com' target='_blank'>点击查看腾讯微博</a>";
		}
		if(QZoneTotalnum){
			if(QZoneTotalnum > 99){
				qzoneNum.innerHTML = "99+";
			}else{
				qzoneNum.innerHTML = QZoneTotalnum;
			}
			qzoneNum.style.cssText = 'padding:0 7px';
			if(QZonePassivenum != ""){
				passiveNum.innerHTML = QZonePassivenum;
				qq.show(qq.G("passiveLi"));
			}
			if(QZoneInitnum != ""){
				InitNum.innerHTML = QZoneInitnum;
				qq.show(qq.G("InitLi"));
			}
			if(QZoneAboutnum != ""){
				AboutNum.innerHTML = QZoneAboutnum;
				qq.show(qq.G("AboutLi"));
			}
		}else{
			qq.G('qzoneTitle').innerHTML = '<a href="http://qzone.qq.com" target="_blank">点击查看QQ空间</a>';
		}
		if(QMailTotalnum){
			if(QMailTotalnum > 99){
				mailNum.innerHTML = "99+";
			}else{
				mailNum.innerHTML = QMailTotalnum;
			}
			mailNum.style.cssText = 'padding:0 7px';
			weiDu = QMailTotalnum - QMailInboxnum - QMailBottlenum - QMailGmailnum - QMailDmailnum;
			if(QMailInboxnum != ""){
				if(weiDu != 0){
					inboxNum.innerHTML = Number(QMailInboxnum) + Number(weiDu);
					qq.show(qq.G('inboxLi'));
				}else{
					inboxNum.innerHTML = QMailInboxnum;
					qq.show(qq.G('inboxLi'));
				}
			}else if(weiDu != 0){
				inboxNum.innerHTML = weiDu;
				qq.show(qq.G('inboxLi'));
			}
			if(QMailBottlenum != ""){
				bottleNum.innerHTML = QMailBottlenum;
				qq.show(qq.G("bottleLi"));
			}
			if(QMailGmailnum != ""){
				gmailNum.innerHTML = QMailGmailnum;
				qq.show(qq.G('gmailLi'));
			}
			if(QMailDmailnum != ""){
				dmailNum.innerHTML = QMailDmailnum;
				qq.show(qq.G('dmailLi'));
			}
			if(QMailInboxnum == "" && QMailBottlenum == "" && QMailGmailnum == "" && QMailDmailnum == ""){
				qq.G("mailTitle").innerHTML = "<a href='http://mail.qq.com' target='_blank'>点击查看QQ邮箱</a>";
			}
		}else{
			qq.G("mailTitle").innerHTML = "<a href='http://mail.qq.com' target='_blank'>点击查看QQ邮箱</a>";
		}
		
		 var D = "";

		qq.EA(qq.G('mailIcon'), 'mouseover', function(){
			qq.removeClass(qq.G('mailSmart'), 'undis');
		});

		qq.EA(qq.G('mailIcon'), 'mouseout', function(){
			qq.addClass(qq.G('mailSmart'), 'undis');
		});

		qq.EA(qq.G('qzoneIcon'), 'mouseover', function(){
			qq.removeClass(qq.G('qzoneSmart'), 'undis');
		});

		qq.EA(qq.G('qzoneIcon'), 'mouseout', function(){
			qq.addClass(qq.G('qzoneSmart'), 'undis');
		});

		qq.EA(qq.G('weiboIcon'), 'mouseover', function(){
			qq.removeClass(qq.G('weiboSmart'), 'undis');
		});
	
		qq.EA(qq.G('weiboIcon'), 'mouseout', function(){
			qq.addClass(qq.G('weiboSmart'), 'undis');
		});
	
		qq.G("userName").innerHTML = userInfoName;
		qq.show(qq.G('logined'));
		qq.hide(qq.G('loginAll'));
		qq.EA(qq.G('loginOut'), 'click', function(){
			login.loginOut();
		});
	}
	

}

window["login"] = {
	loginCheck : function(){
		if(qq.cookie("skey")){
			uin = Number(qq.cookie("uin").substring(1));
			skey = qq.cookie("skey");
			/*try{
			console.log('loginCheck');
				var url = "http://qfwd.qq.com/?uin=" + uin + "&skey=" + skey + "&func=loginAll&refresh=0&ran=" + Math.random();			
				qq.crossAsynJson(url, 'loginAll', loginAll,  'utf-8');
				console.log('loginCheckloginCheckloginCheckloginCheck');
				
			}catch(e){}*/
			try{
				Qfast.add("loginAll",{path:"http://qfwd.qq.com/?uin="+uin+"&skey="+skey+"&func=loginAll&refresh=0&ran="+Math.random(),type:"js",charset:"utf-8"}),Qfast(!1,"loginAll",function(){})
				qq.localData.set('loginTime', (new Date()).getTime());
				}catch(e){}
		}
	},
	loginCountCheck:function(obj){
		if(qq.G(obj).innerHTML != ""){
			qq.G(obj).innerHTML = "";
			qq.G(obj).parentNode.parentNode.style.display = 'none';
		}
	},
	loginOut:function(){
		var d = (new Date).getTime();
		qq.cookie("skey", '', '', '',  "qq.com");
		qq.cookie("uin", '', '', '',  "qq.com");
		qq.cookie("luin", '', '', '',  "qq.com");
		qq.cookie("lskey", '', '', '',  "qq.com");
		qq.hide(qq.G('logined'));
		qq.show(qq.G('loginAll'));
		//qq.G('cmtUser').setAttribute('src', 'http://mat1.gtimg.com/news/dc/images/user.png');
		//parentLoginSuccess('logout');

		login.loginCountCheck("weiboNum");
		login.loginCountCheck("msgNum");
		login.loginCountCheck("atNum");
		login.loginCountCheck("fansNum");
		login.loginCountCheck("qzoneNum");
		login.loginCountCheck("passiveNum");
		login.loginCountCheck("InitNum");
		login.loginCountCheck("AboutNum");
		login.loginCountCheck("mailNum");
		login.loginCountCheck("inboxNum");
		login.loginCountCheck("bottleNum");
		login.loginCountCheck("gmailNum");
		login.loginCountCheck("dmailNum");

		qq.G('weiboTitle').innerHTML = '腾讯微博:';
		qq.G("qzoneTitle").innerHTML = "QQ空间:";
		qq.G("mailTitle").innerHTML = "QQ邮箱:";
		
		weiboNum.style.cssText = 'padding:0 14px';
		qzoneNum.style.cssText = 'padding:0 16px';
		mailNum.style.cssText = 'padding:0 15px';
		
	},
	loginSuccess:function(){
		login_bg.style.display = "none";
		login_wnd.style.left = "-9999px";
		qq.show(qq.G('logined'));
		qq.hide(qq.G('loginAll'));
		login.loginCheck();
		//parentLoginSuccess('login');
	}
}
qq.each(qq.GC('.menu'), function(a, b){	
		qq.EA(a, 'mouseover', function(){
			var _bd = qq.GC(a, '.menu-bd')[0];
			qq.show(_bd);
		});
		qq.EA(a, 'mouseout', function(){
			var _bd = qq.GC(a, '.menu-bd')[0];
			qq.hide(_bd);
		});
});

function reloadLoginInfo(){
var _obj = {"result":"0","nick":qq.localData.get('nick'),"Vip":qq.localData.get('Vip'),"Face":qq.localData.get('Face'),"info":{"QZone":{"totalnum":parseInt(qq.localData.get('QZone-totalnum')),"passivenum":parseInt(qq.localData.get('QZone-passivenum')),"initnum":parseInt(qq.localData.get('QZone-initnum')),"aboutnum":parseInt(qq.localData.get('QZone-aboutnum'))},"QMail":{"totalnum":parseInt(qq.localData.get('QMail-totalnum')),"inboxnum":parseInt(qq.localData.get('QMail-inboxnum')),"bottlenum":parseInt(qq.localData.get('QMail-bottlenum')),"gmailnum":parseInt(qq.localData.get('QMail-gmailnum')),"dmailnum":parseInt(qq.localData.get('QMail-dmailnum'))},"Mblog":{"totalnum":parseInt(qq.localData.get('Mblog-totalnum')),"msgnum":parseInt(qq.localData.get('Mblog-msgnum')),"atnum":parseInt(qq.localData.get('Mblog-atnum')),"fansnum":parseInt(qq.localData.get('Mblog-fansnum'))}}}
		loginAll(_obj);

}

//登录本地存储
qq.EA(window, 'load', function(){
	var _t = qq.localData.get('loginTime') || 0, t = new Date().getTime();
	if(!qq.cookie('skey')) return;
	if(t - _t > 60000) {
		login.loginCheck();
		
	}else{
		reloadLoginInfo();		
	}
});/*  |xGv00|80f5c261b41d8525906daa99c84d1fbb */