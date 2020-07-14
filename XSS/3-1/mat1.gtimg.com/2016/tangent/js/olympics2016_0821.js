/*--------liyuanfeng-PC0:更新于Thu Aug 11 2016 12:03:35 GMT+0800 (中国标准时间)------------*/
define('util/boss',[],function(){
	var BOSS = function(){
	    if(typeof(BOSS_CONFIG) == 'undefined' || !BOSS_CONFIG){
	    	BOSS_CONFIG={};
	    	!BOSS_CONFIG.exposure && (BOSS_CONFIG.exposure={});
	    	!BOSS_CONFIG.registerZone && (BOSS_CONFIG.registerZone={});
	    }
	    this.initExposure();
	    this.initRegister();
	}
	BOSS.prototype = {
		constructor:BOSS,
		initExposure:function(){
			var sUrl = escape(location.href);
			var bossData={
		    	BossId:1604,
		    	Pwd:0,
		    	sOp:'',
		    	iQQ:'',
		    	sBiz:'',
		    	sUrl:sUrl
		    }
			this.exposureData = $.extend(true,bossData,BOSS_CONFIG.exposure);
		},
		initRegister:function(){
			var localUrl = location.href;//当前页面url
			var site = localUrl.substring(7,localUrl.indexOf('.qq.com'));
			site = site.substr(site.lastIndexOf('.')+1);
			var bossData={
		    	BossId:1408,
		    	Pwd:0,
		    	sOp:'',
		    	sBiz:'qq.com',
		    	iQQ:'',
		    	site:site,
		    	tmplType:ARTICLE_INFO.type || '',
		    	sUrl:'',
		    	sLocalUrl:escape(localUrl)
		    }
			this.registerData = $.extend(true,bossData,BOSS_CONFIG.registerZone);
		},
		operate:function(bossData){
			var gImage;
			var arr=[]
			for(keys in bossData){
				var temp = keys+'='+bossData[keys];
				arr.push(temp);
			}
			var str=arr.join('&');
			var iurl = 'http://btrace.qq.com/kvcollect?'+str+'&ran='+Math.random();
			gImage = new Image(1,1);
			gImage.src = iurl;
		},
		exposure:function(id,name){
			var num = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
			var iQQ = (num==null?"":unescape(num[2]));
			this.exposureData['BossId'] = id;
			this.exposureData['sOp'] = name;
			this.exposureData['iQQ'] = iQQ;
			this.exposureData['sBiz'] = arguments[2] || '';
			this.operate(this.exposureData);
		},
		registerZone:function(param,clickType){
			var loopTryNum = 10;//向上查询级数
		    var loop=4;//标签向上查询的级数
		    var purl='';
		    var zoneId='';
			
			if(typeof clickType == 'undefined'){//页面结构上加bosszone触发上报
				var ev = window.event || param;
		        var et = ev.srcElement || ev.target;
		        //向上查找A标签
		        while(et && loop-- > 0){
					if("A"==et.tagName || "BODY"==et.tagName){
						break;
					}else{
						et = et.parentNode;
					}
				}
		        if(!et){return;}
			    var type=et.tagName;
			    if (type != "A") {return;}
			    //获取点击链接
			    purl = et.href;
			    for(var i=loopTryNum-1,tagNode=et;i>=0;i--,tagNode=tagNode.parentNode){
			        if(tagNode && tagNode.attributes['bosszone']){
			            zoneId = tagNode.attributes['bosszone'].nodeValue;
			            break
				    }
			        if("BODY"==tagNode.tagName){return;}
			    }
			    if(!zoneId){return;}
			    
			}else{//js手动触发上报
				param.bossId && (this.registerData['BossId'] = param.bossId);
				zoneId = param.bossZone;
				purl = param.url || '';
			}
			
			var num=document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
			var iQQ=(num==null?"":unescape(num[2]));
			this.registerData['sOp'] = zoneId;
			this.registerData['iQQ'] = iQQ;
			this.registerData['sUrl'] = escape(purl);
			this.operate(this.registerData);
		}
	}
	var boss = new BOSS();
	var registerZone2=function(){
		boss.registerZone();	
	}
	//点击触发上报
	if(document.addEventListener){
		document.addEventListener("click",registerZone2, false);
	}else if(document.attachEvent){
		document.attachEvent("onclick", registerZone2);
	}else{
		document.onclick = registerZone2;
	}
	return {
		registerZone:function(obj,param){
			boss.registerZone.call(boss,obj,param);
		},
		exposure:function(id,name,sBiz){
			boss.exposure.call(boss,id,name,sBiz);
		}
	}
});







/**
 * 工具函数提取自：http://mat1.gtimg.com/news/dc/js/ui_v1.0.0.js
 * 重构参照之前版本: http://mat1.gtimg.com/www/asset/project/login/oneLogin_v1.5.js
 * 使用说明：
 * 定义登录成功回调函数 login.cbLogin = function(){//业务处理}
 * 定义退出回调函数 login.loginOutCall = function(){//业务处理}
 * 必要的dom渲染完执行 login.init();
 */
define('util/login',[],function() {
    var cookie=function(f,h,c,i,g){if(arguments.length==1){var b=document.cookie.match(new RegExp("(^| )"+f+"=([^;]*)(;|$)"));if(b!=null){return decodeURIComponent(b[2])}return null}else{if(!arguments[1]){document.cookie=f+"=11"+((i)?"; path="+i:"; path=/")+((g)?"; domain="+g:"")+"; expires=Fri, 02-Jan-1970 00:00:00 GMT"}else{e="";if(!c){e=new Date;e.setTime(e.getTime()+24*60*60*1000);e="; expires="+e.toGMTString()}document.cookie=f+"="+h+((c)?"; expires="+c.toGMTString():e)+((i)?"; path="+i:"; path=/")+((g)?";domain="+g:"")}}};
    //本地存储
    var localData={hname:location.hostname?location.hostname:"localStatus",isLocalStorage:window.localStorage?true:false,dataDom:null,initDom:function(){if(!this.dataDom){try{this.dataDom=document.createElement("input");this.dataDom.type="hidden";this.dataDom.style.display="none";this.dataDom.addBehavior("#default#userData");document.body.appendChild(this.dataDom);var c=new Date();c=c.getDate()+30;this.dataDom.expires=c.toUTCString()}catch(b){return false}}return true},set:function(b,c){if(this.isLocalStorage){window.localStorage.setItem(b,c)}else{if(this.initDom()){this.dataDom.load(this.hname);this.dataDom.setAttribute(b,c);this.dataDom.save(this.hname)}}},get:function(b){if(this.isLocalStorage){return window.localStorage.getItem(b)}else{if(this.initDom()){this.dataDom.load(this.hname);return this.dataDom.getAttribute(b)}}},remove:function(b){if(this.isLocalStorage){localStorage.removeItem(b)}else{if(this.initDom()){this.dataDom.load(this.hname);this.dataDom.removeAttribute(b);this.dataDom.save(this.hname)}}}};
    //resize居中
    function reszie(a, b) {
        var c ="; top:" + (i.B.ie6 ? document.documentElement.clientHeight / 2 + document.documentElement.scrollTop + "px" : "50%");
        login.main && (login.main.style.cssText = "width:" + a + "px; height:" + b + "px; display:block; margin-left:-" + parseInt(a / 2) + "px; margin-top:-" + parseInt(b / 2) + c)
    }
    //关闭并从html移除浮层
    function close_iframe_layer() {
        login.layer && (document.body.removeChild(login.layer), login.layer = null )
    }
    //创建浮层
    function creat_iframe_layer() {
        if (!login.layer) {
            login.layer = document.createElement("div"),
                login.layer.id = "login_layer",
                login.main = document.createElement("div"),
                login.main.id = "login_layer_main",
                login.main.innerHTML = '<iframe id="login_one_frame" height="100%" scrolling="auto" width="100%" frameborder="0" src=""></iframe>',
                login.bg = document.createElement("div"),
                login.bg.id = "login_layer_bg",
                login.layer.appendChild(login.main),
                login.layer.appendChild(login.bg),
                document.body.appendChild(login.layer),
                login.bg.style.cssText = "display:block; height:" + Math.max(document.body.clientHeight, document.documentElement.clientHeight) + "px",
                document.getElementById("login_one_frame").src = "http://ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=636014201&target=self&s_url=http%3A//www.qq.com/qq2012/loginSuccess.htm"
        }
    }
    //登录成功返回接口信息执行回调
    function login_callback(a) {
        localData.set("nick", a.nick);
        localData.set("Face", a.Face || "http://mat1.gtimg.com/www/login/images/user.jpg");
        localData.set("Vip", a.Vip);
        window.nick = a.nick;
        window.Face = a.Face || "http://mat1.gtimg.com/www/login/images/user.jpg";
        window.uin = Number(cookie("uin").substring(1));
        login.cbLogin();
       // document.getElementById("commentIframe") && registerCoralEvent.publicLogined(uin, nick, Face);
    }
    //已经登录直接执行回调函数
    function g(){
        var a = function(a) {return isNaN(a) ? 0 : a }
            , b = localData
            , c = { result: "0", nick: b.get("nick"), Vip: a(b.get("Vip")), Face: b.get("Face")}
        login_callback(c);
    }
    function loadJs(file,callback,charset){var _doc=document.getElementsByTagName("head")[0];var js=document.createElement("script");js.setAttribute("type","text/javascript");js.setAttribute("src",file);js.setAttribute("charset",charset||"utf-8");_doc.appendChild(js);if(!/*@cc_on!@*/0){js.onload=function(){callback()}}else{js.onreadystatechange=function(){if(js.readyState=="loaded"||js.readyState=="complete"){js.onreadystatechange=null;callback&&callback()}}}return false};

    try {document.domain = "qq.com"} catch (h) {}
    window.ptlogin2_onResize = reszie,
    window.ptlogin2_onClose = close_iframe_layer,
    window.userLogin = creat_iframe_layer,
    window.loginAll = login_callback,
    window.login = {
        init: function() {
            var a = localData.get("loginTime") || 0
                , b = (new Date).getTime();
            login.isLogin() && (b - a > 6e4 ? login.loginCheck() : g())
        },
        isLogin: function() {
            return !!cookie("skey") && !!cookie("uin")
        },
        noLoginHtml: document.getElementById("oneKey").innerHTML,
        loginCheck: function() {
            if (this.isLogin()) {
                uin = Number(cookie("uin").substring(1)),
                    skey = cookie("skey");
                try {
                    var a = "http://qfwd.qq.com/?uin=" + uin + "&skey=" + skey + "&func=loginAll&refresh=0&ran=" + Math.random();
                    loadJs(a, function() {}, "utf-8"),
                        localData.set("loginTime", (new Date).getTime())
                } catch (b) {}
            }
        },
        loginOut: function() {
            var a = this;
            loadJs("https://ui.ptlogin2.qq.com/js/ptloginout.js?" + Math.random(), function() {
                pt_logout.logout(function(b) {
                    b && a.loginOutCall()
                })
            })
        },
        loginOutCall: function() {

        },
        loginSuccess: function() {
            close_iframe_layer();
            login.loginCheck();
            login.cbLogin && login.cbLogin();
        },
        cbLogin: function() {}
    };
    return login;
});
/**体育一键登录*/
define('common/sportsLogin',['require','../util/login'],function(require){
	var login = require('../util/login');
		$('#login').hover(function (e) {
		    if($(this).hasClass('logined')) $(this).addClass('hover');
		}, function (e) {
		    $(this).removeClass('hover');
		});
	
		//修改退出回调函数
		login.loginOutCall = function(){
		    $('#login').removeClass('logined hover');
		    $("#oneKey").html(login.noLoginHtml);
		    $('#tiyu_member').html('开通体育会员');
		    registerCoralEvent.publicLogout();//退出评论
		}
		
		//登录成功回调函数
		login.cbLogin = function () {
		    $('#oneKey').html('<img src="'+window.Face+'"/>');
		    $('#userName').html(nick);
		    $('#login').addClass('logined');
		    //改变评论状态
		    document.getElementById("commentIframe") && window.registerCoralEvent && registerCoralEvent.publicLogined(uin, nick, Face);
		    //请求体育vip
		    $.ajax({
		        url:'http://sportswebapi.qq.com/vip/status',
		        dataType:'jsonp',
		        success:function(data){
		            if(data[0]!=0) return;
		            if(parseInt(data[1].vip)!==0){
		                $('#tiyu_member').text('体育会员');
		                $('#loginWrap .get_vip').hide();
		                $('#userName').parent().html(nick);
		                $('#saytopvip').html('您好，尊贵的体育会员');
		                window.__tenplay_getuinfo = function() {return 10;};//体育会员免广告
		            }else{
		                $('#saytopvip').html('');
		            }
		        }
		    });
		    //获取kb
		    $.ajax({
		        url:'http://guess.sports.qq.com/sportsWeb/balance',
		        dataType:'jsonp',
		        success:function(data){
		            if(data.code==0){
		                $('#vip-zuan').text(data.data.kb);
		            }
		        }
		    });
		};
	    login.init();
	   // ExposureBoss(1604, 'EXmainNav', 'dc');
	
});



define('core/getSection',[],function(){
	var getSectionTxt = function(){
		var txt = "";
		if(document.selection) {
			txt = document.selection.createRange().text;
		} else {
			txt = document.getSelection();
		}
		return txt.toString();
	}
	return {getSection:getSectionTxt};
});

define('core/getPosition',[],function(){
	var getPosition = function(event,parent){
		var parent=parent||$('body');
		return {
			x:event.clientX - parent.offset().left + document.body.scrollLeft + document.documentElement.scrollLeft,
			y:event.clientY - parent.offset().top + document.body.scrollTop + document.documentElement.scrollTop
		}
	}
	return getPosition;
});

define('util/zonedWord',['../core/getSection','../core/getPosition'],function(section,getPosition){
	function zonedword(el,options,callback){
		if(!el){return;}
		if(typeof el == 'string'){
			el = $('#'+el);
		}
		options=$.extend(true, {
			id:'tips',		//搜索提示框id
			lens:[2,9],		//搜索关键字长度范围
			tipHtml:'<a href="#" target="_blank">tips</div>'
		}, options);
		 var tipsObj = false;
		 el.bind('mouseup',function(e){
		 	var txt = section.getSection();
		 	var len = txt.length;
		 	if(len<=0){return;}		 	
		 	var min = options.lens[0] || 1;
		 	var max = options.lens[1] || len;
		 	if(len>=min && len<=max){
		 		if(!tipsObj){
		 			var tipsBox = '<div style="display:none" id="'+options.id+'"></div>';
			 		el.append(tipsBox);
			 		$('#'+options.id).html(options.tipHtml);
			 		tipsObj=$('#'+options.id);
		 		}
		 		var pos = getPosition(e,el);
		 		tipsObj.css({left: pos.x, top: pos.y}).show();
		 		callback && callback(tipsObj,txt);
		 	}
		 	
		 	
		});
		$(document, 'body').bind('mousedown', function(){
			tipsObj && tipsObj.hide();
		});
	}
	return zonedword;
});

define('common/zonedSearch',['require','../util/zonedWord','../util/boss'],function(require){
	var zendWord = require('../util/zonedWord');
	var boss = require('../util/boss');
	var article=$('#Cnt-Main-Article-QQ');
	var obj={
		id:'sogouTips',
		tipHtml:'<a href="#" bosszone="floatsearch" target="_blank">\u641C\u7D22</a>'
	}
	var isFirist = true;
	zendWord(article,obj,function(tips,txt){
		txt = (txt == '，' ? '%A3%AC' : encodeURIComponent(txt));
		var src = 'http://www.sogou.com/tx?hdq=sogou-wsse-b58ac8403eb9cf17-3001&query='+txt;
		$('a',tips).attr('href',src);
		boss.exposure(1604,'Exfloatsearch','sogou');
		if(!isFirist){return;}
		isFirist = false;
		if(tips){
			tips.bind('mousedown', function(e){
				return false
			});
			tips.bind('mouseup', function(e){
				return false
			});
		}
		
	});
});

/**
 * cookie相关操作
 */
define('core/cookie',[],function(){
	var cookie={
		setItem: function(key, value, expireTime,domain){
	        var text = key + "=" + value;
	        if(expireTime){
	        	 var date = new Date();
	        	 date.setTime(date.getTime() + 6e4 * expireTime);
	        	 text += "; expires="+date.toUTCString();
	        }	                  	
	        text += "; path=/";
	        domain && (text += "; domain="+domain);
	        document.cookie = text;
	    },
	    getItem: function(key) {
	    	if (key) {
			var arr=document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
	        	if(arr!==null){
	        		return unescape(arr[2]);
	        	}
	    	}	                   
	    },
	    removeItem: function(key,domain) {
	        this.setItem(key, "", -1,domain);
	    }
	    
	};
	return cookie;
});

/**划词收藏*/
define('common/zonedCollect',['require','../core/cookie','../util/zonedWord','../util/boss'],function(require){
	var cookie = require('../core/cookie');
	var zendWord = require('../util/zonedWord');
	var boss = require('../util/boss');
	var article=$('#Cnt-Main-Article-QQ');
	var obj={
		id:'hcsc',
		lens:[11,117],	
		tipHtml:'<div class="hcfc" id="hcfc" style="display: none;"></div><div class="scTools" id="scTools" bosszone="gotofavor" style="display: none; background: rgb(255, 255, 255);"><span>收藏成功</span><a href="http://ilike.qq.com" target="_blank">查看我的收藏&gt;&gt;</a></div>'
	}
	var isFirist = true;
	zendWord(article,obj,function(tips,txt){
		if(!tips){return;}
		$('#scTools',tips).hide();
		$('#hcfc',tips).show();
		if(!isFirist){return;}
		isFirist = false;
		tips.bind('mouseup',function(e){
			return false;
		});
		tips.bind('mousedown',function(e){
			return false;
		});

		$('#hcfc',tips).bind('click',function(e){
			boss.registerZone({bossZone:'wordFvr'},1);
			$(this).hide();
			if(cookie.getItem("skey")){//已登录
				var url =['http://i.match.qq.com/keep/a?url=',ARTICLE_INFO.article_url,'&ty=2','&pa=',txt,'&fr=腾讯',ARTICLE_INFO.site_cname].join('');
				$.ajax(url,{
					dataType:'jsonp',
					success:function(data){
						if(data.code == 0){
							$('#scTools',tips).show();
						}
					}
				});
			}else{//未登录
				userLogin();
			}
		});
	});
});
/**文章末尾加icon*/
define('common/endIcon',[],function(){
	var articleId = document.getElementById('Cnt-Main-Article-QQ');
	if(!articleId){return;}
	var lastChild = $(articleId).children().last();
	if(lastChild[0].tagName.toLowerCase() == 'p' && $.trim($(lastChild[0]).text()).length > 15){
		var txt='<a bosszone="backqqcom" href="http://www.qq.com/?pref=article" target="_blank" title="点击进入腾讯首页" id="backqqcom" style="white-space: nowrap;"><img src="http://www.qq.com/favicon.ico" width="16" height="16"><span style="padding-left: 5px; font-size: 14px;">返回腾讯网首页&gt;&gt;</span></a>'
		$(lastChild).append(txt);
	}
});

define('common/relatedSearch',['../util/boss'],function(boss){
	var SogouPid = {
		auto: 'sogou-wsse-fd8c07a31f8a8591-0005',
		tech: 'sogou-wsse-fd8c07a31f8a8591-0001',
		gongyi: 'sogou-wsse-fd8c07a31f8a8591-0029',
		ru: 'sogou-wsse-fd8c07a31f8a8591-0051',
		comic: 'sogou-wsse-fd8c07a31f8a8591-0030',
		digi: 'sogou-wsse-fd8c07a31f8a8591-0052',
		foxue: 'sogou-wsse-fd8c07a31f8a8591-0031',
		fashion: 'sogou-wsse-fd8c07a31f8a8591-0006',
		sports: 'sogou-wsse-fd8c07a31f8a8591-0007',
		house: 'sogou-wsse-fd8c07a31f8a8591-0008',
		edu: 'sogou-wsse-fd8c07a31f8a8591-0009',
		finance: 'sogou-wsse-fd8c07a31f8a8591-0010',
		stock: 'sogou-wsse-fd8c07a31f8a8591-0010',
		gamezone: 'sogou-wsse-fd8c07a31f8a8591-0011',
		news: 'sogou-wsse-fd8c07a31f8a8591-0012',
		astro: 'sogou-wsse-fd8c07a31f8a8591-0013',
		baby: 'sogou-wsse-fd8c07a31f8a8591-0014',
		health: 'sogou-wsse-fd8c07a31f8a8591-0015',
		cul: 'sogou-wsse-fd8c07a31f8a8591-0016',
		ent: 'sogou-wsse-fd8c07a31f8a8591-0002',
		cd:'sogou-wsse-fd8c07a31f8a8591-0017',
		fj:'sogou-wsse-fd8c07a31f8a8591-0020',
		xian:'sogou-wsse-fd8c07a31f8a8591-0004',
		js:'sogou-wsse-fd8c07a31f8a8591-0019',
		hebei:'sogou-wsse-fd8c07a31f8a8591-0003',
		ln:'sogou-wsse-fd8c07a31f8a8591-0022',
		sh:'sogou-wsse-fd8c07a31f8a8591-0023',
		hn:'sogou-wsse-fd8c07a31f8a8591-0024',
		henan:'sogou-wsse-fd8c07a31f8a8591-0025',
		gd:'sogou-wsse-fd8c07a31f8a8591-0026',
		zj:'sogou-wsse-fd8c07a31f8a8591-0021',
		bj:'sogou-wsse-fd8c07a31f8a8591-0032',
		tj:'sogou-wsse-fd8c07a31f8a8591-0033',
		hb:'sogou-wsse-fd8c07a31f8a8591-0027',
		cq:'sogou-wsse-fd8c07a31f8a8591-0028'
	};
	//SogouKeywords对象由有模板输出到页面
	if(SogouPid[ARTICLE_INFO.site] && SogouKeywords && SogouKeywords.btn == 'on'){
		var n = 12;
		var list = SogouKeywords && SogouKeywords.txt || '';
		if(!list || list.length<=0) {return;}
		var len = list.length>n?n:list.length;
		var bossIndex = 3;
		var html =[];
		for(var i=0;i < len;i++){
			if(i<9){
				bossIndex =  Math.ceil((i+1)/3);
			}
			var txt = '<li bosszone="Rsearch' + bossIndex+ '"><a target="_blank" href="https://www.sogou.com/tx?hdq=' + SogouPid[ARTICLE_INFO.site] + '&query=' + encodeURIComponent(list[i]) + '">' + list[i] + '</a></li>';
			html.push(txt);
		};
		$('#SogouKeywordsList').html('<ul>'+html.join('')+'</ul>');
		$('#keySearch').show();
		setTimeout(function(){
			boss.exposure(1604, 'EXRsearch', 'SogouKeywords');
		}, 5);	
	}
	
});
define('util/share',[],function(){
	//获取文章内的图片
    var pictures = [];
    function getPicture(){
        if(pictures.length>0) return pictures;
        var t = [];
        $('#Cnt-Main-Article-QQ img').each(function(el,i){
            var el = $(this);
            el.width()>150 && el.height() > 150 && t.push(el.attr('src'));
        });
        return t;
    }
    
	//qq
	var para_qq = {
        title: "\u5206\u4eab\u7ed9QQ\u597d\u53cb",
        width: 580,
        height: 540,
        src: "http://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(ARTICLE_INFO.article_url) + "&site=qqcom&iframe=true&showcount=0&desc=&summary=&title=&pics=&style=203&width=19&height=22"
    };
    //qq空间
    var para_qzone = {
        title: "\u5206\u4eab\u5230QQ\u7a7a\u95f4",
        width: 600,
        height: 185,
        src: "http://imgcache.qq.com/qzone/app/qzshare/news_share.html#url=" + ARTICLE_INFO.article_url
    };
    //腾讯微博
    var para_wb = {
        title: "\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a",
        width: 580,
        height: 220,
        src: "http://share.v.t.qq.com/index.php?c=share&a=index&" + function(e) {
            var n = [];
            for (var r in e) n.push([r, encodeURIComponent(e[r])].join("="));
            return n.join("&").slice(0, 2048)
        }({cs: 1, bm: "110", url: location.href, appkey: "801300956", title: document.title, pic: getPicture().join("|")})
    };
	
	//pop 类
    function creatDom(){
    	var w = $(window).width();
    	var h = $(window).height();
        var self = this;
        if(!document.getElementById('share_layer')){
            var html = '<div id="share_layer" class="share_layer" style="width: 582px;position: fixed;top:200px;z-index: 99999;display: none">' +
                '<div class="share_layer_main">' +
                '<div class="share_layer_title"><h3></h3><a title="关闭" class="del_fri" href="javascript:void(0)">X</a></div>' +
                '<div class="share_layer_cont">' +
                '</div></div></div>';
            $('body').append(html);
        };
        this.layerbg = $('#share_layer')[0];
        this.layer = $('#share_layer');
        this.iframe;
        //关闭弹窗
        this.closePopup = function () {
            self.layer.hide();
        };
        //绑定关闭按钮
        this.layer.find('.del_fri').click(this.closePopup);

        this.set = function (opt) {
            this.layer.show().css({width:opt.width+2,'left':(w-opt.width+2)/2});
            this.layer.find('.share_layer_title h3').html(opt.title);
            this.layer.find('.share_layer_cont').html('<iframe frameborder="0" marginheight="0" marginwidth="0" scrolling="no" style="width:'+opt.width+'px; height:'+opt.height+'px; display: block;" src="'+opt.src+'"></iframe>');
            this.iframe = this.layer.find('iframe')[0];
        };
        this.resizePopup = function (obj) {
            obj.width&&this.layer.css({width:obj.width+2,'left':(w-obj.width+2)/2});
            obj.width&&this.layer.find('iframe').width(obj.width);
            if(obj.height){
                this.layer.find('iframe').height(obj.height);
                this.layer.css('top',(h-this.layer.height())/2);
            }
        };
        //拖动
        this.draging = false;
        this.drag_start = {x:0,y:0};
        this.layer.find('.share_layer_title').on('mousedown',function(e){
            e.preventDefault();
            self.draging = true;
            self.drag_start.x = e.pageX;
            self.drag_start.y = e.pageY;
            self.top = parseInt(self.layer.css('top'));
            self.left = parseInt(self.layer.css('left'));
            //console.log(self.layer,self.left,self.top);
        });
        $(window).on('mousemove',function(e){
            if(!self.draging) return;
            e.preventDefault();
            var left = e.pageX - self.drag_start.x;
            var top = e.pageY - self.drag_start.y;
            //console.log(left,top);
            self.layer.css({top:top+self.top,left:left+self.left});
        });
        $(document).on('mouseup',function(e){
            self.draging = false;
        });
    }
	
	//微博分享
    var shareTOsina = function() {
        var t = getPicture();
        var i = "http://service.weibo.com/share/share.php"
            , s = ARTICLE_INFO.article_url
            , o = ARTICLE_INFO.title
            , u = ""
            , a = ""
            , f = ""
            , l = t.join("||") || "";
        f = i + "?url=" + encodeURIComponent(s) + "&appkey=" + u + "&title=" + o + "&pic=" + l + "&ralateUid=" + a + "&language=&searchPic=" + !1,
            window.open(f, "shareQQ", "height=480,width=608,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no")
    };
    
    var linkedIn = function(){
    	var shareUrl =  'http://www.linkedin.com/shareArticle?mini=true&ro=true&title='+encodeURIComponent(ARTICLE_INFO.title)+'&url='+encodeURIComponent(ARTICLE_INFO.article_url)+'&summary=&source=&armin=armin';
   		window.open(shareUrl, "shareLinkedIn", "height=480,width=608,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
    };
    
    
    
	var layer = new creatDom();
	
	//qq分享
	var shareTOqq = function(){
		layer.set(para_qq);
	}
	
	//qzone分享
	var shareTOqzone = function(){
		layer.set(para_qzone);
	}
	
	//腾讯微博分享
	var shareTOqqweibo = function(){
		layer.set(para_wb);
	}
	
	var orcodeSrc = '';
	//获取二维码
	var getQrcode = function(qqUrl,callback){
		if(orcodeSrc){
			callback({url:orcodeSrc});
			return;
		}
		if(!qqUrl){return;}
		 $.ajax({
            url:'http://news.open.qq.com/qrcode/gen.php',
            data:{url:qqUrl},
            dataType:'jsonp',
            jsonpCallback:'getQrcode',
            success: function(data){
                orcodeSrc = data.url;
                callback(data);
            }
        });
	}
	
	
	//iframe 回调调整等
    window.share2qzone = window.share2qq = layer;
    $(window).on("message", function(e) {
        var data = e.originalEvent.data;
        try{
            var json = window.JSON?JSON.parse(data):eval(data);
            if(json.action==='resize'){ json.data && layer.resizePopup(json.data);}
            //分享后关闭微博
            json.action === "success" && layer.closePopup();
        }catch(e){}
    });
    return {
    	shareTOsina:shareTOsina,
    	shareTOqq:shareTOqq,
    	shareTOqzone:shareTOqzone,
    	shareTOqqweibo:shareTOqqweibo,
    	getQrcode:getQrcode,
    	shareToLinkedIn:linkedIn
    }
});
/**分享*/
define('common/share',['../util/share','../util/boss'],function(share,boss){
	var hasImg1 = false;
	var hasImg2 = false;
	var init = function(){
		bind();
	};
	var bind = function(){
		$('#shareBtn').bind('mouseenter',bindFunc['shareEnter']);
		$('#shareBtn').bind('mouseleave',bindFunc['shareLeave']);
		var clickShare = ['shareTweibo','shareQzone','shareQQ','shareSina','shareWeixin','shareLinkedIn'];
		$('#shareWx').bind('mouseenter',bindFunc['shareWxEnter']);
		$('#shareWx').bind('mouseleave',bindFunc['shareWxLeave']);
		$(document).bind('click',bindFunc['docClick']);
		for(var i=0;i<clickShare.length;i++){
			$('[data-node="'+clickShare[i]+'"]').bind('click',bindFunc[clickShare[i]]);
		}
		$(document).on('click','#t_weibo',bindFunc['shareTweibo']);//文章内组图幻灯，分享到微博
	};

	var bindFunc={
		'shareEnter':function(e){
			$(this).addClass('showItem');
		},
		'shareLeave':function(e){
			$(this).removeClass('showItem');
		},
		'shareTweibo':function(e){
			share.shareTOqqweibo();
		},
		'shareQzone':function(e){
			share.shareTOqzone();
		},
		'shareQQ':function(e){
			share.shareTOqq();
		},
		'shareSina':function(e){
			share.shareTOsina();
		},
		'shareWeixin':function(e){
			share.getQrcode(ARTICLE_INFO.article_url,function(data){
				if(!hasImg2){
					var src = data.url;
					$('#ewmimg').attr('src',src);
					hasImg2 = true;
				}
				$('#wemcn').show();
				
			});
			return false;
		},
		'docClick':function(e){
			$('#wemcn').hide();
		},
		'shareWxEnter':function(e){
			var _this = this;
			share.getQrcode(ARTICLE_INFO.article_url,function(data){
				if(!hasImg1){
					var src = data.url;
					$('img',_this).attr('src',src);
					hasImg1 = true;
				}
				$('.ewmBox',_this).show();
				boss.registerZone({bossZone:'msWx'},1);
			});
		},
		'shareWxLeave':function(e){
			$('.ewmBox',this).hide();
		},
		'shareLinkedIn':function(e){
			share.shareToLinkedIn(e);
		}
	}
	init();
});
/**评论*/
define('common/comment',[],function(){
	if(typeof(cmt_id) == "undefined"){return;}
	try {document.domain = "qq.com"} catch (h) {}
	window.registerCoralEvent=$.extend({
			code: 1,
			listHiden: ARTICLE_INFO.site.search(/news|finance|view/) == -1 ? 0 : 1,
	        commentNums:1,
			commentHotNums:3,
			loginEvent: function(){
				userLogin();
			},
			publicLogined: function(uin,nick,headUrl){ 
			   var _ifr = document.getElementById('commentIframe'); 
			   if(typeof _ifr.contentWindow.publicLogined == 'function') document.getElementById('commentIframe').contentWindow.publicLogined(uin,nick,headUrl);
			},
			publicLogout: function(){
				 var _ifr = document.getElementById('commentIframe'); 
				 if(typeof _ifr.contentWindow.publicLogined == 'function') document.getElementById('commentIframe').contentWindow.publicLogout();
			}		
		}, commentData);
	//老版评论id兼容
	if(cmt_id > 1e9){
		var cmt_ifr_url = 'http://coral.qq.com/article/' + cmt_id + '/commentnum?callback=_cbSum&source=1&t=' + Math.random();	
			$.ajax({
				url:cmt_ifr_url,
				dataType:'jsonp',
				jsonpCallback:'comment',
				success:function(data){
					if(data.errCode == 0){
						var num = data.data.commentnum;//总帖数
						if(!registerCoralEvent.getCmtNumBack){
							$('#cmtLink').attr('href','http://coral.qq.com/' + cmt_id);
							$('#cmtNum').text(num);
							$('#cmtNum2').text(num);
						}else{
							registerCoralEvent.getCmtNumBack(num);
						}
						
					}
				}
                
			})		
	}
	//加载iframe
	var loadIfra = function(){
		$('#commentIframe').attr('src','http://www.qq.com/coral/coralBeta3/coralMainDom3.0.htm').show();
		$('#commentIframe').load(function(e){
			if(window['nick']){
				registerCoralEvent.publicLogined(uin, nick, Face);
			}
		});
	};
	var commentY = $('#commentIframe').position().top;
	var windowH = $(window).height();
	if(commentY<windowH){
		loadIfra();
	}else{
		$(window).bind('scroll',function(){
			var scrollTop = $(this).scrollTop();
			if(scrollTop+windowH+500>commentY){
				loadIfra();
				$(window).unbind('scroll',arguments.callee);
			}
		});
	}
	
	
});

/**右侧电梯和导航条scroll*/
define('common/scroll',[],function(){
	/**返回顶部**/
	var backToTop={
		dom:$('#goTop'),
		top:100,
		speed:1000,
		showBackDom:function(){
			if ($(window).scrollTop()>this.top){
                this.dom.fadeIn(this.speed);
            }
            else
            {
               this.dom.fadeOut(this.speed);
            }
		},
		bindEvent:function(){
			var self=this;
			$(window).scroll(function(){
				self.throttle(self.showBackDom,self);
			});
			this.dom.on('click',function(){
				 $('body,html').animate({scrollTop:0},self.speed);
        		// return false;
			});
		},
		throttle:function(method,context){		//函数节流
			if(method.timerId)clearTimeout(method.timerId);
            method.timerId=setTimeout(function(){
                method.call(context);
            },500);
        },
		init:function(){
			this.showBackDom();
			this.bindEvent();
		}
	};
	backToTop.init();
});

define('core/stringToJson',[],function(){
	var stringToJson = function(str){
		if(str){
			var arr = str.split('&');
			var data ={};
			for(var i=0;i<arr.length;i++){
				var temp = arr[i].split('=');
				data[temp[0]] = temp[1];
			}
			return data;
		}
	}
	return stringToJson;
	
});

define('core/buildDom',[],function(){
	return function(obj){
		var temp = $('[data-node]',obj);
		var nodes={};
		for(var i=0,l=temp.length;i<l;i++){
			var txt = $(temp[i]).attr('data-node');
			!nodes[txt] && (nodes[txt]=[]);
			nodes[txt].push(temp[i]);
		}
		return nodes;
	}
});

define('common/zhibotai',['require','../core/stringToJson','../util/boss','../core/cookie','../core/buildDom'],function(require){
	var stringToJson=require('../core/stringToJson');
	var boss = require('../util/boss');
	var cookie = require('../core/cookie');
	var buildDom = require('../core/buildDom');
	function TVStation(idTxt,nodeId,conf){
		this._idTxt =idTxt;
		this._id = $('#'+this._idTxt);
		this._nodeId = nodeId;
		this._num = conf && conf.num || 21;
		this._otherMod = conf && conf.otherMod || '';
		if(this._otherMod){
			!this.other && (this.other={});
			this.other['id'] = $('#'+this._otherMod);
			this.other['tit'] = conf && conf.otherTit || '';;
			this.other['class'] = conf && conf.otherClass || '';
		}
		this._curPostion=0;//当前直播索引
		this.init();
	}
	TVStation.prototype={
		constructor:TVStation,
		liveData:{},//存储直播相关数据
		playerInfo:{},//存储播放器相关信息
		setPlayingSign:function(name,sign){//设置当前播放器播放状态
			// 初始化全局命名空间
			if (!window.dc_playing_sign) window.dc_playing_sign = {};
			window.dc_playing_sign[name] = sign;
		},
		isAnyVideoPlaying:function(){//检查当前页面是否有播放器在播放			
			 if (window.dc_playing_sign) {
		        for (var n in window.dc_playing_sign) {
		            if (window.dc_playing_sign.hasOwnProperty(n) && window.dc_playing_sign[n]) {
		                return true;
		            }
		        }
		    } 
		     return false;
		},
		initAjax:function(urlTxt){
			var _this = this;
			$.ajax({
				url:urlTxt,
				data:{'node_id':this._nodeId,'number':this._num},
				dataType:'jsonp',
				jsonpCallback:'tvStationBack',
				success:function(data){
					if(data.response && data.response.code===0){
						var info =data.data;
						var list = info.lives;
						if(list && list.length>0){
							_this.operate(list);
						}
					}
				}
			});
		},
		creatPlayer:function(vid,isAutoplay){
			var _this = this;
			window.liveClickSwitch = function(data){
				if(!data){return;}
				if(data.code == 'stop'){
					_this.setPlayingSign('liveVideo',false);
					boss.registerZone({bossZone:'zbttzicon'},1);
				}else if(data.code == 'play'){
					_this.setPlayingSign('liveVideo',true);
					$(window).trigger('video:pause','liveVideo');
					boss.registerZone({bossZone:'zbtbficon'},1);
				}
			}			
			//创建播放器
			_this.playerInfo['video'] = new tvp.VideoInfo();
			_this.playerInfo['video'].setChannelId(vid);
			_this.playerInfo['player'] = new tvp.Player();
			_this.playerInfo['player'].create({
			    width: 300,
			    height: 190,
			    type: 1,
			    video: _this.playerInfo['video'],
			    modId: "liveVideo",
				flashWmode:'transparent',
			    autoplay: isAutoplay,
			    flashWmode:'transparent',
			    liveFlashExtVars:{
			    	skin:'skins/TencentPlayerLiveMiniSkinV4.swf',
			    	pic:'http://mat1.gtimg.com/sports/dc2015/cover.jpg',
			    	funClickObj:'liveClickSwitch'
			    },
			    onplay:function(e){
			    	if(isAutoplay){
			    		var p = _this.playerInfo['player'].getPlayer();
                        if( p && p.setVolume) {
                        	p.setVolume(0);
                        }
			    		$(window).trigger('video:pause','liveVideo');
			    		console.log('zhibo:play')
			    	}
				//监听使直播播放器自动停止
				$(window).on('video:pause',function(event,trigger){
					if(trigger !='liveVideo'){
					_this.playerInfo['player'].getPlayer().stopVideo();//直播停止
					_this.setPlayingSign('liveVideo',false);
					console.log('trigger:zhibo_stop');
					}
				});	

			    }
 			});	
		},
		buildLive:function(vid){
			var isAutoplay=true;
			var dc_live_closeAuto = cookie.getItem('dc_live_closeAuto');//是关闭启自动播放
			var dc_live_played = cookie.getItem('dc_live_played');//24小时内是否播放过直播
			//关闭自动播放或者24h播放过直播则不自动播放
			if(dc_live_closeAuto =='1' || dc_live_played == '1'){
				isAutoplay = false;
				//设置全局标识，直播不自动播放
				this.setPlayingSign('liveVideo',false);
			}else{
				//设置全局标识，直播自动播放
				this.setPlayingSign('liveVideo',true);
				cookie.setItem('dc_live_played','1',24*60,'qq.com');				
			}
			//创建直播播放器
			this.creatPlayer(vid,isAutoplay);
			boss.exposure(1604, 'szbtbfk', 'zhibotai');
		},
		buildHtml:function(list,len){
			var mainH=[];
			var sta = false;//开关
			for(var i=0;i<len;i++){
				//playing_status: 1直播中 2已结束  3未开始
				if(list[i].playing_status==2){continue;}
				if(!sta && list[i].playing_status==1 && list[i].stream_id){
					this._curPostion = i+1;//当前播放视频序号
					sta = true;
				}
				var match = list[i].match;
				var nodeH,col4;
				col4 = list[i].playing_status==1?'<span class="col4 playing">直播中</span>':'<span class="col4">'+list[i].start_time.substring(5,10)+'<br/>'+list[i].start_time.substring(10,16)+'</span>';
				//对阵赛
				if(match && match.homeName && match.awayName){
					nodeH =['<div class="match clearfix">',
								'<span class="col1">'+match.awayName+'</span>',
								'<span class="col2">',list[i].playing_status==1?(match.awayGoal+'-'+match.homeGoal):'—','</span>',
								'<span class="col3">'+match.homeName+'</span>',
								col4,
							'</div>'].join('');
				}else{//非对阵赛
					nodeH =['<div class="info">',
								'<p>'+list[i].title+'</p>',
								col4,
							'</div>'].join('');
				}
				var item=['<li ',list[i].playing_status==1?'data-node="item" data-data="pos='+i+'"':'',this._curPostion==i+1?'class="cur"':'','><strong>',list[i].catalog_name,'</strong>',nodeH,list[i].playing_status==3?'<a class="linkZB" target="_blank" href="'+list[i].shared.pc_url+'"></a>':'','</li>'].join('');
				mainH.push(item);
				//存储数据{序号、直播ID,直播地址}
				!this.liveData['pureData'] && (this.liveData['pureData']=[]);
				this.liveData['pureData'].push({'pos':i,'vid':String(list[i].stream_id),'url':list[i].shared.pc_url});
			}
			return mainH.join('');
		},
		tabSwitch:function(curMod,otherTit,status){
			$(curMod).addClass('cur');				
			$(otherTit).removeClass('cur');
			var liveMod = this.liveData['nodes']['tvStation'];
			if(status){
				this.other['id'].hide();
				$(liveMod).show();
			}else{
				$(liveMod).hide();
				this.other['id'].show();
			}
		},
		initList:function(len){//初始化列表区
			//设置列表滚动切换初始值
			!this.listSwitch && (this.listSwitch={});
			this.listSwitch['cur'] = 0;				
			this.listSwitch['average'] = 7;
			this.listSwitch['count'] = Math.ceil(len/this.listSwitch['average']);
			
			//初始化切换按钮
			$(this.liveData['nodes']['slide'][0]).hide();
			if(len<=this.listSwitch['average']){
				$(this.liveData['nodes']['slide'][1]).hide();
			}
			//列表区事件
			$(this.liveData['nodes']['slide']).bind('click',this,this.listSlide);
			
		},
		listSlide:function(e){
			var _this = e.data;
			var obj = stringToJson($(this).attr('data-data'));
			var idx = parseInt(obj.idx);
			if((idx>0 &&_this.listSwitch['cur']>0) || (idx<0 && _this.listSwitch['cur']<_this.listSwitch['count']-1)){							
				_this.listSwitch['cur'] -= idx;
				
				$(_this.liveData['nodes']['list']).animate({'marginTop':'+='+idx*35*_this.listSwitch['average']+'px'},1000);
				$(_this.liveData['nodes']['slide']).show();
				if(_this.listSwitch['cur']<=0 || _this.listSwitch['cur']>=_this.listSwitch['count']-1){
					$(this).hide();
				}
			}
			var sop = idx>0?'zbtlistprev':'zbtlistnext';
			boss.registerZone({bossZone:sop},1);
		},
		bind:function(){
			var _this = this;
			$(_this.liveData['nodes']['autoPlay']).bind('click',function(e){
				if(cookie.getItem('dc_live_closeAuto') == '1'){
					$(this).removeClass('close');
			    	cookie.removeItem('dc_live_closeAuto','qq.com');//开启自动播放
			    	boss.registerZone({bossZone:'zbtplayopen'},1);
			    }else{
			    	$(this).addClass('close');
			    	//关闭自动播放,默认7天时间	
			    	cookie.setItem('dc_live_closeAuto','1',7*24*60,'qq.com');
			    	boss.registerZone({bossZone:'zbtplayclose'},1);	
			    }
			});
			$(_this.liveData['nodes']['mainTit']).bind('click',_this.liveData['nodes']['zhiboTit'],function(e){	
				if($(this).hasClass('cur')){return;}
				var otherTit = e.data;
				_this.tabSwitch(this,otherTit,false);
				boss.registerZone({bossZone:'zcmkturnon'},1);
			});
			$(_this.liveData['nodes']['zhiboTit']).bind('click',_this.liveData['nodes']['mainTit'],function(e){
				if($(this).hasClass('cur')){return;}
				var otherTit = e.data;
				_this.tabSwitch(this,otherTit,true);
				boss.registerZone({bossZone:'zbtturnon'},1);
			});
			
			_this.liveData['nodes']['item'] && $(_this.liveData['nodes']['item']).bind('click',function(e){
				if($(this).hasClass('cur')){return;}
				var obj =stringToJson($(this).attr('data-data'));
				var pos = parseInt(obj.pos);
				$(_this.liveData['nodes']['item']).removeClass('cur');
				$(this).addClass('cur');
				$(_this.liveData['nodes']['go']).attr('href',_this.liveData['pureData'][pos].url);
				
				//切换直播视频
				_this.playerInfo['video'].setChannelId(_this.liveData['pureData'][pos].vid);
				var vid = _this.liveData['pureData'][pos].vid;
				_this.playerInfo['player'].play(_this.playerInfo['video']);
				$(window).trigger('video:pause','liveVideo');
				console.log('zhibo:tell rel_video need to pause');
				_this._curPostion = pos+1;
				boss.registerZone({bossZone:'zbtlisttitle'},1);

			});
			$(_this.liveData['nodes']['playBox']).bind('mouseenter',function(e){
				$(_this.liveData['nodes']['go']).fadeIn();
				boss.exposure(1604, 'szbtbfkenter', 'zhibotai');
			});
			$(_this.liveData['nodes']['playBox']).bind('mouseleave',function(e){
				$(_this.liveData['nodes']['go']).fadeOut();	
			});
			$(_this.liveData['nodes']['go']).click(function(e){
				boss.registerZone({bossZone:'zbtbfkenter'},1);
			})
		},
		operate:function(list){
			var len = list.length;
			//构建列表区域
			var htmlTxt = this.buildHtml(list,len);			
			//不显示直播台模块
			if(!this._curPostion && len<5){
				return;
			}
			//以下是显示直播台的情况	
			if(this._otherMod){
				$(this.other['id']).hide();
				this.other['tit'] && $(this.liveData['nodes']['mainTit']).html('<h2>'+this.other['tit']+'</h2>');
				$(this.liveData['nodes']['mainTit']).show();
				this.other['class'] && this.other['id'].addClass(this.other['class']);
			}			
			$(this.liveData['nodes']['list']).html(htmlTxt);
			this.liveData['nodes'] = buildDom(this._id);	
			var liveVideo = this.liveData['nodes']['tvStation'];
			
			//初始化"自动播放"状态
			if(cookie.getItem('dc_live_closeAuto')=='1'){
				$(this.liveData['nodes']['autoPlay']).addClass('close');
			}
			if(this._curPostion){//当前有直播
				//直播相关逻辑
				this.buildLive(this.liveData['pureData'][this._curPostion-1].vid);
				//直播台页卡为当前页卡
				$(liveVideo).addClass('veryTv').show();
				$(this.liveData['nodes']['zhiboTit']).addClass('cur');
				$(this.liveData['nodes']['playBox']).show();//显示播放器
				$(this.liveData['nodes']['go']).attr('href',this.liveData['pureData'][this._curPostion-1].url);				
			}else if(len>=5){
				if(this._otherMod){
					$(this.liveData['nodes']['tvStation']).hide();
					$(this.liveData['nodes']['mainTit']).addClass('cur');
					this.other['id'].show();
				}
				this.initList(len);
			}
			this._id.show();
			this.bind();
		},
		init:function(){
			var obj = document.getElementById(this._idTxt);
			if(!obj){
				return false;
			}		
			this.liveData['nodes'] = buildDom(this._id);			
			var urlTxt='http://data.v.qq.com/live/v2/api/live/nodelives?scope=news_detail&reqsrc=news_detail';
			this.initAjax(urlTxt);
		}
	}
	return TVStation;

});

define('common/recommend',[],function(){
	function Recommend(idTxt,list){
		this._id = document.getElementById(idTxt);
		if(!this._id){return;}
		this.list = list;
		this.init();
		
	}
	Recommend.prototype={
		constructor:Recommend,
		init:function(){
			this.baseNum = 7;
			this.cur = 7;
			this.count = 0;
			var htmlTxt = this.buildHtml(this.list)
			$('[data-node="list"]',this._id).html(htmlTxt);
			$(this._id).show();
			this.bind();
		},
		buildHtml:function(list){
			var that = this;
			var len = list.length <=28?list.length:28;
			var i = (len<=that.baseNum?0:that.baseNum);
			var box=[];
			for(;i<len;i++){
				that.count++;
				var picSrc = (list[i].img_url2?list[i].img_url2:list[i].img_url?list[i].img_url:'');
				var item = ['<li class="clearfix',!picSrc?' noPic':'','"',that.count>that.baseNum?' style="display:none"':'','>',
								picSrc?'<a target="_blank" class="pic" href="'+list[i].url+'"><img src="'+picSrc+'" alt="'+list[i].short_title+'"></a>':'',
								'<div class="info">',
									'<h3><a target="_blank" href="'+list[i].url+'">'+list[i].title+'</a></h3>',
									'<p>'+list[i].pubtime+'</p>',
									'<p class="txt">'+list[i].intro+'</p>',
								'</div>',
							'</li>'].join('');
				box.push(item);					
			}
			if(that.count>that.baseNum){
				$('[data-node="more"]',that._id).show();
			}
			return box.join('');
		},
		bind:function(){
			var that = this;
			var items = $('[data-node="list"] li',that._id);
			$('[data-node="more"]',that._id).bind('click',function(e){
				that.cur = that.cur+that.baseNum;
				var len = that.cur<=that.count?that.cur:that.count;
			 	for(var i=that.baseNum;i<len;i++){
			 		$(items[i]).show();
			 	}
			 	if(that.cur>=that.count){
			 		$('[data-node="more"]',that._id).hide();
			 	}
			});
		}
	}
	return Recommend;
});

define('olympics2016/hotChoice',['../common/recommend'],function(Recommend){
	var id = document.getElementById('hotChoice');
	if(!id){
		return;
	}
	var C = {
		buildHtml:function(list){
			var len = list.length <=7?list.length:7;
			var box=[];
			for(var i=0;i<len;i++){
				var item = ['<li>',
								'<p><a href="'+list[i].url+'" target="_blank">'+list[i].title+'</a></p><em><i> </i></em>',
							'</li>'].join('');
				box.push(item);		
							
			}
			
			return box.join('');
		}
	}
	
	var bind = function(){
		var initTop = $('#hotChoice').offset().top;
		
		$(window).bind('scroll',function(e){
		 	var scrollT = $(this).scrollTop();
            if(scrollT >= initTop){
            	var tagAboutPos = $('#tag_about').offset();//为你推荐
				var tagAboutTop = tagAboutPos?tagAboutPos.top:0;
            	if(tagAboutTop && scrollT>tagAboutTop){
            		$('#hotChoice').css({'position':'absolute','top':tagAboutTop-initTop});
            	}else{
            		$('#hotChoice').css({'position': 'fixed','top':0});
            	}
            }else{
           		$('#hotChoice').css({'position': 'relative','top':0});
           }
		});
	}
	
	
	var init = function(){
		$.ajax({
			url:'http://i.match.qq.com/pac/aoyun2016news',
			dataType:'jsonp',
			success:function(data){
				if(data.code == 1){
					var list = data.data;
					var htmlTxt = C.buildHtml(list);
					$('[data-node="list"]','#hotChoice').html(htmlTxt);
					$('#hotChoice').show();
					bind();
					new Recommend('recommend',list);//为你推荐
				}
			}
		});
	}
	
	init();
	
});

define('olympics2016/focus',[],function(){
	var id = document.getElementById('focus');
	if(!id){return;}
	var C = {
		buildHtml:function(list){
			var len = list.length <=6?list.length:6;
			var box=[];
			for(var i=0;i<len;i++){
				var picSrc = (list[i].img_url2?list[i].img_url2:list[i].img_url?list[i].img_url:'');
				var item = ['<li>',
								'<a target="_blank" href="'+list[i].url+'">',
								'<span class="pic"><img src="'+picSrc+'" alt="'+list[i].short_title+'"></span>',
								'<span>'+list[i].title+'</span>',
							'</a></li>'].join('');
				box.push(item);					
			}
			return box.join('');
		}
	}
	var init = function(){
		$.ajax({
			url:'http://i.match.qq.com/pac/openapi?id=68',
			dataType:'jsonp',
			success:function(data){
				if(data.code == 1){
					var list = data.data;
					var htmlTxt = C.buildHtml(list);
					$('[data-node="list"]',id).html(htmlTxt);
					$(id).show();
				}
			}
		});
	}
	init();
});

define('olympics2016/medals',['../util/boss'],function(boss){
	//status:1 本届奖牌榜，2 上届奖牌榜
	function Medals(idTxt,status){
		var _id = document.getElementById(idTxt);
		if(!_id){return;}
		this._id = _id;
		this.status = status;
		this.init();
	}
	Medals.prototype = {
		constructor:Medals,
		init:function(){
			var that = this;
			/*$.ajax('http://i.match.qq.com/pac/olympicmedal',{
	            dataType:'jsonp',
	            jsonpCallback:'callback',
	            success: function (data) {
	            	if(data.code ===0){
						console.log(data);
	            		var list = data.data;
	            		var info;
	            		if(that.status ===1){
	            			info = list[0];
	            		}else if(that.status ===2){
	            			info = list[1];
	            		}else{
	            			return;
	            		}
	            		if(!info || info.length<=0){return;}
	            		that.buildHtml(info);
	            		
	            	}
	            }
	     	});*/
			//更换接口
			$.ajax('http://ziliaoku.sports.qq.com/cube/index?cubeId=34&dimId=67&params=&limit=10&from=benchang',{
				dataType:'jsonp',
				jsonpCallback:'callback',
				success: function (data) {
					if(data.code ===0){
						//console.log(data);
						var info = data.data.OlyMedalList;

						if(!info || info.length<=0){return;}
						that.buildHtml(info);

					}
				}
			});
			//--------------------------
		},
		buildHtml:function(info){
			var that = this;
			var len = info.length;
			len = len>6?6:len;
			var items = [];
			for(i=0;i<len;i++){
				var item = info[i];
				var sum = parseInt(item.gold)+parseInt(item.silver)+parseInt(item.bronze);
				var temp =[
					'<tr>',
						'<td><span',i<=2?' class="top"':'','>'+(i+1)+'</span></td>',
						'<td>'+item.countryCnName+'</td>',
						'<td>'+item.gold+'</td>',
						'<td>'+item.silver+'</td>',
						'<td>'+item.bronze+'</td>',
						'<td>'+sum+'</td>',
					'</tr>'].join('');
				items.push(temp);
			}
			$('[data-node="con"]',that._id).append(items.join(''));

			// 添加奖牌榜点击调转对应国家的奖牌榜 start
			$('tr:gt(0)', that._id).css('cursor', 'pointer');
			$('tr:gt(0)', that._id).css('borderBottom', '1px solid #f9f9f9');
			$('tr:gt(0)', that._id).bind('click', function() {
				window.open('http://stats.2016.qq.com/medals/country.htm?t9=2016-08-06~2016-08-23&t5=' + info[$(this).index() -1].country);
				boss.registerZone({bossZone:'jpb_guojia'},1);
			});
			$('tr:gt(0)', that._id).hover(function() {
				$(this).addClass('odd');
				$(this).children().eq(1).css('color', '#ff8327');
			},function() {
				$(this).removeClass('odd');
				$(this).children().eq(1).css('color', '');
			});
			// 添加奖牌榜点击调转对应国家的奖牌榜 end

			$(that._id).show();
		}
	}
	
	return Medals;
});

define('olympics2016/video',[],function(){
	var _id = document.getElementById('olyVideo');
	if(!_id){return;}
	//热门视频
	$.ajax({
		url: 'http://i.match.qq.com/pac/olympicvideo',
		type: 'GET',
		dataType: 'jsonp',
		success:function(data){
			if(data && data.code===0){
				var list = data.data;
				var len = list.length>4?4:list.length;
				if(!len){return;}
				var items = [];
				for(var i=0;i<len;i++){
					var item = list[i].fields;
					var temp = [
						'<li bosszone="vnews'+(i+1)+'">',
							'<a href="'+item.url+'" target="_blank" class="pic">',
								'<img src="'+item.pic_228_128+'" alt="'+item.title+'"/><em><i></i></em>',
							'</a>',
							'<a href="'+item.url+'" target="_blank" class="txt">'+item.title+'</a>',
						'</li>'].join('');
					items.push(temp);
				}
				$('[data-node="list"]',_id).prepend(items.join(''));
				$(_id).show();
			}
		}
	})
});

requirejs.config({
	baseUrl:'js'
});
requirejs(['require','util/boss','common/sportsLogin','common/zonedSearch','common/zonedCollect','common/endIcon','common/relatedSearch','common/share','common/comment','common/scroll','common/zhibotai',
'olympics2016/hotChoice','olympics2016/focus','olympics2016/medals','olympics2016/video'],function(require){
	var boss =require('util/boss');
	boss.exposure(1604,'rio_wenzhang','dc');
	var Medals = require('olympics2016/medals');
	new Medals('lastMedals',1);
	
	//直播台
	var TVStation =require('common/zhibotai');
	window.zhibotai=new TVStation('tvMerge',4,{'num':21,'otherMod':'mergeMod','otherTit':'热门视频','otherClass':'mergeMod'});

});



define("olympics2016.js", function(){});


//# sourceMappingURL=../maps/js/olympics2016.js.map
/*  |xGv00|f8b7bd5c8fbbd1962af1ebe2086db4ba */