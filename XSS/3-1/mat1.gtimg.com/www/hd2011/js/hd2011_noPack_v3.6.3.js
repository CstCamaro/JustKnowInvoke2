/*
hdPic:高清组图专用脚本
@版本:hd2011_v2.7.2
@作者:tomiezhang#tencent.com
@时间:2011-3-18
@勇敢的人，恭喜你进入到神秘的bug天堂！
××××××××××××××××××××××××××××××××××××××
@hd2011_v2.9.4
@增加文章分享审核机制，增加放大镜效果
2011-12-8
增加末页广告多频道匹配机制
2012-3-6
地方站末页广告bug修改，pingJS地址修改
2012-3-20
末页广告bug修复，显示当前站点广告后隐藏其他广告
2012-4-9
下图切换位移bug，大于1000px则缓动效果混乱，升级依赖框架到jQ1.5.1
感谢@tammywang发现问题(ps:此妹纸征婚ing，联系方式见顶部)
2012-6-13
加入对联广告入口，依赖crystal,勇帝以后就交给你了哦~
2012-6-19
呵呵，去掉图片预备加载loading图
2012-6-29
修复底部图片滚动混乱
2012-7-25
靠...，大王你可真贫...
2012-11-22
添加新闻客户端推荐
2013-1-8
新年快乐！
广告优化
2013-2-19
button广告去除
2013-3-25
修复房产评论域名指向
2013-5-21
广告配置单独提出来
2013-6-27
优化侧边广告
2013-7-3
新版评论
2013-7-25
pgv 统计
2013-9-27
去掉对联广告
2013-12-19
去掉高清全屏播放
*/

/*json文件开始*/
/*JSON=new function(){this.decode=function(){var filter,result,self,tmp;if($$("toString")){switch(arguments.length){case 2:self=arguments[0];filter=arguments[1];break;case 1:if($[typeof arguments[0]](arguments[0])===Function){self=this;filter=arguments[0]}else self=arguments[0];break;default:self=this;break};if(rc.test(self)){try{result=e("(".concat(self,")"));if(filter&&result!==null&&(tmp=$[typeof result](result))&&(tmp===Array||tmp===Object)){for(self in result)result[self]=v(self,result)?filter(self,result[self]):result[self]}}catch(z){}}else{throw new JSONError("bad data");}};return result};this.encode=function(){var self=arguments.length?arguments[0]:this,result,tmp;if(self===null)result="null";else if(self!==undefined&&(tmp=$[typeof self](self))){switch(tmp){case Array:result=[];for(var i=0,j=0,k=self.length;j<k;j++){if(self[j]!==undefined&&(tmp=JSON.encode(self[j])))result[i++]=tmp};result="[".concat(result.join(","),"]");break;case Boolean:result=String(self);break;case Date:result='"'.concat(self.getFullYear(),'-',d(self.getMonth()+1),'-',d(self.getDate()),'T',d(self.getHours()),':',d(self.getMinutes()),':',d(self.getSeconds()),'"');break;case Function:break;case Number:result=isFinite(self)?String(self):"null";break;case String:result='"'.concat(self.replace(rs,s).replace(ru,u),'"');break;default:var i=0,key;result=[];for(key in self){if(self[key]!==undefined&&(tmp=JSON.encode(self[key])))result[i++]='"'.concat(key.replace(rs,s).replace(ru,u),'":',tmp)};result="{".concat(result.join(","),"}");break}};return result};this.toDate=function(){var self=arguments.length?arguments[0]:this,result;if(rd.test(self)){result=new Date;result.setHours(i(self,11,2));result.setMinutes(i(self,14,2));result.setSeconds(i(self,17,2));result.setMonth(i(self,5,2)-1);result.setDate(i(self,8,2));result.setFullYear(i(self,0,4))}else if(rt.test(self))result=new Date(self*1000);return result};var c={"\b":"b","\t":"t","\n":"n","\f":"f","\r":"r",'"':'"',"\\":"\\","/":"/"},d=function(n){return n<10?"0".concat(n):n},e=function(c,f,e){e=eval;delete eval;if(typeof eval==="undefined")eval=e;f=eval(""+c);eval=e;return f},i=function(e,p,l){return 1*e.substr(p,l)},p=["","000","00","0",""],rc=null,rd=/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/,rs=/(\x5c|\x2F|\x22|[\x0c-\x0d]|[\x08-\x0a])/g,rt=/^([0-9]+|[0-9]+[,\.][0-9]{1,3})$/,ru=/([\x00-\x07]|\x0b|[\x0e-\x1f])/g,s=function(i,d){return"\\".concat(c[d])},u=function(i,d){var n=d.charCodeAt(0).toString(16);return"\\u".concat(p[n.length],n)},v=function(k,v){return $[typeof result](result)!==Function&&(v.hasOwnProperty?v.hasOwnProperty(k):v.constructor.prototype[k]!==v[k])},$={"boolean":function(){return Boolean},"function":function(){return Function},"number":function(){return Number},"object":function(o){return o instanceof o.constructor?o.constructor:null},"string":function(){return String},"undefined":function(){return null}},$$=function(m){function $(c,t){t=c[m];delete c[m];try{e(c)}catch(z){c[m]=t;return 1}};return $(Array)&&$(Object)};try{rc=new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')}catch(z){rc=/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/}};
*/
/*json文件结束*/
/*	var indexPic = 0;
	var loadingProcess= {//全屏播放用
		isJsReady : false,
		isSwfReady : false,
		divName : 'fullSwf',
		swfUrl : '//mat1.gtimg.com/joke/swfflash/picViewsFullScreenv1.0.0.1.0.swf',
		sitePicUrl : '#',
		lastUrl : '#',
		datas : null,
		flashNub:0,
		isFlashReady: function() {
			loadingProcess.isSwfReady = true;
			return loadingProcess.isJsReady;
		},
		setPicHandler : function () {
			var numargs = arguments.length;
			if (typeof window.document.setSoScreen.loadFullScreen != 'undefined') {
				if (numargs >= 1) {
					indexPic = arguments[0];
				}
				window.document.setSoScreen.loadFullScreen(loadingProcess.datas, indexPic);
			} else {
				setTimeout("loadingProcess.setPicHandler()", 300);
			}
		},
		addSwfHandler : function () {
			var sofull = new SWFObject(loadingProcess.swfUrl, "setSoScreen", "48", "12", "9.0.28", "#000000"); 
			 sofull.addParam("allowNetworking", "all"); 
			 sofull.addParam("allowScriptAccess", "always"); 
			 sofull.addParam("allowFullScreen", "true"); 
			 sofull.addParam("wmode", "window"); 
			 sofull.addVariable("fristTips", "第一张");
			 sofull.addVariable("lastTips", "最后一张");
			 sofull.addVariable("gotoUrl",loadingProcess.sitePicUrl);
			 sofull.addVariable("picUrl",loadingProcess.lastUrl);
			 sofull.write(loadingProcess.divName);
		},
		setTitle : function() {
			var title = document.title.replace(/#p.\d/i,"");
			document.title = title;
		},
		callByFullScreen : function (indexId, isExiting) {
			var deDatas = JSON.decode(loadingProcess.datas);
			hdPic.fn._showBig(deDatas,indexId);
		},
		setFullScreenDatas:function (data) {
			loadingProcess.datas = JSON.encode(data);
		},
		initSystems : function (){
			loadingProcess.addSwfHandler();
		}
	};*/
	
	/* delete flash button */


	(function(){
		var parent = '', i = 0;
		var list = document.getElementById('toolBar').getElementsByTagName('ul')[0].getElementsByTagName('li');
		if(document.getElementById('fullSwf')){
			parent = document.getElementById('fullSwf').parentNode;
			for(; i < 2; i++){
				parent.removeChild(list[0]);
			}
		}

	})();

	var hdPic = window.hdPic = function(p){
		return hdPic.fn.init(p);
	};
	hdPic.fn=hdPic.prototype = {
			_tmpArray:[],
			_lastUrl:"",
			_lastTitle:"",
			_isgoOn:false,
			_coentArray:"",
			_coreurl:"//mat1.gtimg.com/www/core/core_v1.5.1.js",
			_pageNow:0,
			_isMove:false,
			_dragx:0,
			_isAuto:false,
			_autoTimer:null,
			_nowSrc:new Image(),
			_preloadN:new Image(),
			_preloadP:new Image(),
			_sourName:"",
			_sourUrl:"",
			_pubTime:"",
			_siteName:"",
			_siteLink:"",
			_isPic:true,
			_isCiment:false,
			_aid:0,
		    _siteEname:"news",
			_auth:"",
			_specificID:"",
			_record : false,
			_clickSum : 0,
			_tempTime : null,
			_isDoc : false,
			_isAD : false,
			_AD_id : '',
			_listLen : 7,
			_coreload:function(file,callback) {
			try {
				var script = document.createElement('script');
				script.src = file;
				script.type = "text/javascript";
				document.getElementsByTagName("head")[0].appendChild(script);
				if( script.addEventListener ) {
					script.addEventListener("load", callback, false);
				} else if(script.attachEvent) {
					script.attachEvent("onreadystatechange", function(){
							if(script.readyState == 4
								|| script.readyState == 'complete'
								|| script.readyState == 'loaded') {
								callback();
							}
					});
				}
			} catch(e) {
				callback();
			}
			try{
	            window.setTimeout(function(e){
	                hdPic.fn._coupletAd(hdPic.fn._pageNow, hdPic.fn._tmpArray);
	            }, 500);
	        }catch(e){}
		},
		_getReady:function(){//大图首次载入ready，初始化播放器区域高度，图片切换效果、hover效果
					$(".pageLeft-bg").show();
					$(".pageRight-bg").show();
					$(".pageLeft").height($("#Main-A").height());
					$(".pageLeft span").css("marginTop",parseInt(($("#Main-A").height()-95)/2));
					$(".pageLeft-bg").height($("#Main-A").height());
					$(".pageRight").height($("#Main-A").height());
					$(".pageRight span").css("marginTop",parseInt(($("#Main-A").height()-95)/2));
					$(".pageRight-bg").height($("#Main-A").height());
					$("#mouseOverleft").height($("#Main-A").height());
					$("#mouseOverleft").width(parseInt($("#Main-A").width()/2));
					$("#mouseOverright").height($("#Main-A").height());
					$("#mouseOverright").width(parseInt($("#Main-A").width()/2));
					$("#mouseOverleft").hover(function(){
						$(".pageLeft").fadeIn("fast");
						$(".pageLeft").attr("title","点击浏览上一张图片，支持'←'翻页");
					},function(){
						$(".pageLeft").fadeOut("fast");
						$(".pageLeft").attr("title","");
					});
					$("#mouseOverright").hover(function(){
						$(".pageRight").fadeIn("fast");
						$(".pageRight").attr("title","点击浏览下一张图片，支持'→'翻页");
					},function(){
						$(".pageRight").fadeOut("fast");
						$(".pageRight").attr("title","");
					}); 
				if($("#Main-D").css("display")=="block"){
					$("#Main-D").fadeTo('slow',1).fadeTo('slow',0.2).fadeTo('slow',1);
				}
				$("#Main-C").fadeTo('slow',1).fadeTo('slow',0.2).fadeTo('slow',1);

				

		},
		nowSite : function(){
			var siteName = window.location.href, siteN=siteName.match(/http:\/\/([^\/]+)\//i)[1], nowSite=siteN.split(".")[0];
			return nowSite;
		},
		secondSite : function(){
			var siteName = window.location.href, siteN=siteName.match(/http:\/\/([^\/]+)\//i)[1], secondSite=siteN.split(".")[1];
			return secondSite;
		},	
		_createAD : function(){
			var _this = this;
			var lastAD = $('#lastAD'), html = '';
			var isShowAD = false;
			if(this.nowSite() == 'news' && hdPic.fn._isShowLastAD && hdPic.fn._isShowLastAD == 1){
				isShowAD = true;
			}

			if(NoLastAD.indexOf(_this.nowSite())==-1 || isShowAD ){
				this._AD_id = 'gaoqing_F_pic';
				html = '<div id="gaoqing_F_pic" style="width:564px;height:362px;" class="l_qq_com"></div>';	
			}else{
				$.each(LastADSet, function(o){
					if(this.split('|')[0] == _this.nowSite()){
						html = '<div id="' + this.split('|')[1] + '" style="width:564px;height:362px;" class="l_qq_com"></div>';
						_this._AD_id = this.split('|')[1];
					}
				});
			}
			lastAD.html(html);
		},
		_buttonAD : function(){
			var _this = this, mainC = $('#Main-C'), BtnAdSite = '',//显示Button广告的频道
				_buttonAdHtml = '<div class="smallPic-wrap">'+
							'<div class="smallPic">'+
								'<a href="javascript:void(0);" onfocus="this.blur()" class="left" id="goleft"></a>'+
								'<div class="left" id="SmallWarp">'+
								'<ul id="Smailllist"> loading.. </ul>'+
								'<a href="javascript:void(0)" onfocus="this.blur()" class="mask"></a>'+
								'</div>'+
								'<a href="javascript:void(0);" onfocus="this.blur()" class="right" id="goright"></a>'+
							'</div>'+
							'<div class="scrollLine"><span class="scrollButton"></span></div>'+
						'</div>'+
						'<div class="smallPic-AD" id="smallPic-AD"><div id="gaoqing_F_slt_button"></div></div>';

			if(new RegExp(_this.nowSite(), 'gi').test(BtnAdSite)){
				mainC.html(_buttonAdHtml);
				mainC.addClass('btnAd');
				crystal.request('gaoqing_F_slt_button');
				this._listLen = 5;
			}else{
				mainC.addClass('noBtnAd');
				this._listLen = 7;
			}

		},
		_lastAD:function(data,siteN){
			var _self = this, lastAD = $('#lastAD');
			$("#lastAD").css({'left':parseInt($("#Main-A").offset().left+($("#Main-A").width()/2-$("#end").width()/2))+'px','top':parseInt($("#Main-A").offset().top+114)+'px','z-index':'999'});
			
			if(this._AD_id){
				$("#lastAD").css('display','block');//准备好广告位
				crystal.getArea(this._AD_id).invoke('open');
			}

			setTimeout(function(){//末页推荐延迟100ms
					_self._showLast(data,siteN)
			},100);
		},
		_insetAD : function(){
			
			var _this = this, insetAD = $('#insetAD'), NoInsetAdSite = 'news, finance, house',//不显示插页广告的频道
				_insetAdHtml = '<div id="gaoqing_F_gqfycb" style="width:564px;height:362px;display:none;" class="l_qq_com"></div>';			
			if(NoInsetAdSite.indexOf(_this.nowSite()) == -1 && _this.secondSite() != 'house'){
				insetAD.html(_insetAdHtml);
			}
		},
		_getLast:function(data){//末页推荐
			var siteName = window.location.href;
			var siteN=siteName.match(/http:\/\/([^\/]+)\//i)[1];
			this._lastAD(data,siteN);
		},
		_showLast:function(data,siteN){
			this.AD = true;
			$("#end").css("left",parseInt(($("#Main-A").width()/2-$("#end").width()/2))+"px");
			$("#Main-A").height($("#Main-A").height());
			$("#end").animate({top:"114px"},"slow",function(){
						$(".pageLeft").height($("#Main-A").height());
						$(".pageLeft span").css("marginTop",parseInt(($("#Main-A").height()-95)/2));
						$(".pageLeft-bg").height($("#Main-A").height());
						$(".pageRight").height($("#Main-A").height());
						$(".pageRight span").css("marginTop",parseInt(($("#Main-A").height()-95)/2));
						$(".pageRight-bg").height($("#Main-A").height());
						$("#mouseOverleft").height($("#Main-A").height());
						$("#mouseOverright").height($("#Main-A").height());
			});
		  $(".firstImg").html("<img src='"+data[0].smallpic+"' width=86 height=56/>");
		  $("h2").html($("h1").html());
		  $("#replayPic").bind("click",function(){
				hdPic.fn._hideLast();
				hdPic.fn._pageNow = 0;
				hdPic.fn._showBig(data,hdPic.fn._pageNow);
		  });
		  $("a.close").bind("click",function(){
				hdPic.fn._hideLast();
				hdPic.fn._showBig(data,hdPic.fn._pageNow);
		  });
		  $("#end .ft").append('<a href="http://news.qq.com/mobile/" target="_blank" class="appDownLoad" bosszone="gqAppDownLoad">手机客户端 读图新体验</a>');
		  this._getThreepic();
		  $(".buttonClik").attr("href",hdPic.fn._siteLink);
		  if(hdPic.fn._isPic){
		  $(".buttonClik").html("进入"+hdPic.fn._siteName+"图片中心");
		  }else{
		  $(".buttonClik").html("进入"+hdPic.fn._siteName+"首页");
		  }
		  if(siteN.split(".")[0] == "finance" || siteN.split(".")[0] == "kid"){
					$("#lastAD").hide();
		 }else{
			  setTimeout(function(){//5s后判断广告层是否存在
					$("#lastAD").hide();
			   },5000);
		 }
		},
		_hideLast:function(){//隐藏末页推荐
			var _this = this;this._isAD = false;
			$("#end").animate({top:"-528px"},"slow",function(){
					
					$(".pageLeft").height($("#Main-A").height());
					$(".pageLeft span").css("marginTop",parseInt(($("#Main-A").height()-95)/2));
					$(".pageLeft-bg").height($("#Main-A").height());
					$(".pageRight").height($("#Main-A").height());
					$(".pageRight span").css("marginTop",parseInt(($("#Main-A").height()-95)/2));
					$(".pageRight-bg").height($("#Main-A").height());
					$("#mouseOverleft").height($("#Main-A").height());
					$("#mouseOverright").height($("#Main-A").height());
					$("#lastAD").hide();
			});
		},
		_getThreepic:function(){//调用末页推荐最后3张图
			var tmp = "",newLength = 3;
			if(typeof lastPic_hd !=="undefined"){
				if (lastPic_hd.length == 3) {
					for (var i = 0; i < lastPic_hd.length; i++) {
						var title = lastPic_hd[i].Title;
						if(title.length>20){
							title = lastPic_hd[i].Title.substring(0,19)+"...";
						}
						tmp += '<li><div><a  bosszone="gqRe' + (i+1) + '" href="' + lastPic_hd[i].Url + '#pref=hdpicture" class="img"  target="_blank"><img src="' + lastPic_hd[i].ImgUrl + '" width="145" title="'+lastPic_hd[i].Title+'" /></a><a href="' + lastPic_hd[i].Url + '#pref=hdpicture" target="_blank" title="'+lastPic_hd[i].Title+'">' + title + '</a></div></li>';
					}
					$("#lastComend").html(tmp);
					$("#lastComend div:eq(0)").css("float","left");
					$("#lastComend div:eq(2)").css("float","right");
					return false;
				} else {
					if (lastPic_hd.length !== 0) {
						for (var i = 0; i < lastPic_hd.length; i++) {
							var title = lastPic_hd[i].Title;
							if(title.length>20){
								title = lastPic_hd[i].Title.substring(0,19)+"...";
							}
							tmp += '<li><div><a bosszone="gqRe' + (i+1)+ '" href="' + lastPic_hd[i].Url + '#pref=hdpicture" class="img"  target="_blank"><img src="' + lastPic_hd[i].ImgUrl + '" width="145" title="'+lastPic_hd[i].Title+'" /></a><a href="' + lastPic_hd[i].Url + '#pref=hdpicture" target="_blank" title="'+lastPic_hd[i].Title+'">' + title + '</a></div></li>';;
						}
					}
				   newLength = 3 - lastPic_hd.length;
			  }
				  $.ajax({  
				   url: "/c/otherPic.js",  
				   type: "GET",   
				   beforeSend: function(x) {  
					   x.setRequestHeader("If-Modified-Since","0");
					   x.setRequestHeader("Charset", "GB2312");
					   x.setRequestHeader("Cache-Control","no-cache");
					},  
				   success: function() {  
					 var arrMe = eval("(" + arguments[0] + ")")[0].root;
						for (i = 0; i < newLength; i++) {
							var title = arrMe[i].article[1].title;
							if(title.length>20){
								title = arrMe[i].article[1].title.substring(0,19)+"...";
							}
							tmp += '<li><div><a bosszone="gqRe' + (i+1) + '" href="' + arrMe[i].article[3].url + '#pref=hdpicture" class="img" target="_blank"><img src="' + arrMe[i].article[4].rec_img + '" width="145" title="'+arrMe[i].article[1].title+'"/></a><a href="' + arrMe[i].article[3].url + '#pref=hdpicture" target="_blank" title="'+arrMe[i].article[1].title+'">' + title + '</a></div></li>';
						}
						$("#lastComend").html(tmp);
						$("#lastComend div:eq(0)").css("float","left");
						$("#lastComend div:eq(2)").css("float","right");
				   } 
			   }); 
			}else{
				 $.ajax({  
				   url: "/c/otherPic.js",  
				   type: "GET",   
				   beforeSend: function(x) {  
					   x.setRequestHeader("If-Modified-Since","0");
					   x.setRequestHeader("Charset", "GB2312");
					   x.setRequestHeader("Cache-Control","no-cache");
					},  
				   success: function() {  
					 var arrMe = eval("(" + arguments[0] + ")")[0].root;
						for (i = 0; i < newLength; i++) {
							var title = arrMe[i].article[1].title;
							if(title.length>20){
								title = arrMe[i].article[1].title.substring(0,19)+"...";
							}
							tmp += '<li><div><a bosszone="gqRe' + (i+1) + '" href="' + arrMe[i].article[3].url + '#pref=hdpicture" class="img" target="_blank"><img src="' + arrMe[i].article[4].rec_img + '" width="145" title="'+arrMe[i].article[1].title+'"/></a><a href="' + arrMe[i].article[3].url + '#pref=hdpicture" target="_blank" title="'+arrMe[i].article[1].title+'">' + title + '</a></div></li>';
						}
						$("#lastComend").html(tmp); 
						$("#lastComend div:eq(0)").css("float","left");
						$("#lastComend div:eq(2)").css("float","right");
				   } 
			   });
			}
		},
		
		_clickleft:function(data){//向前点
			if(hdPic.fn._pageNow>0){
				hdPic.fn._pageNow--;
				hdPic.fn._showBig(data,hdPic.fn._pageNow);
			}else{
				hdPic.fn._pageNow = 0;
				return;
			}
				
		},
		_clickright:function(data){//向后点
			if(hdPic.fn._pageNow<data.length-1){
				this._isAD = false;
				hdPic.fn._pageNow++;
				hdPic.fn._showBig(data,hdPic.fn._pageNow);
			}else{
				var left1 = 131*(hdPic.fn._tmpArray.length - 7), left2 = parseInt($("#Smailllist").css('left'));
				//alert(left1+':'+left2);
				if( (left1+left2) < 10 && !this._isAD) { this._getLast(data);this._isAD = true;}
				
			}
		},
		_bindClick:function(data){//为各种按钮绑定事件、拖拽浏览、快捷键、页面初始焦点
			var _this = this;
			$("#Smailllist li").each(function(i){
				$(this).click(function(){
					hdPic.fn._stopAuto();
					hdPic.fn._showBig(data,i);
				})
			});
			_calTime = function (){
				var curTime = (new Date()).getTime(), oldTime = _this._tempTime || curTime;
				if((curTime - oldTime) < 200) { _this._clickSum++ }
				else { _this._clickSum = 0 }
				_this._tempTime = curTime;
			};
			$("#mouseOverright").bind('click',function(){
				_calTime();
				hdPic.fn._stopAuto();
				hdPic.fn._clickright(data);
				
			});
			$("#goright").bind('click',function(){
				_calTime();
				hdPic.fn._stopAuto();
				hdPic.fn._clickright(data);
			});
			$("#mouseOverleft").bind('click',function(){
				_calTime();
				hdPic.fn._stopAuto();
				hdPic.fn._clickleft(data);
			});
			$("#goleft").bind('click',function(){
				_calTime();
				hdPic.fn._stopAuto();
				hdPic.fn._clickleft(data);	
			});
			//拖拽浏览
			if(hdPic.fn._tmpArray.length>_this._listLen){
				$(".scrollButton").bind("selectstart",function(){return false;})
				$(".scrollButton").click(function(){}).mousedown(function(e){
						_this._isDoc = true;
						hdPic.fn._stopAuto();
					  //设置捕获范围
					  if($(".scrollButton").setCapture){
						  $(".scrollButton").setCapture();
					  }else if(window.captureEvents){
						  window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
					  }
					hdPic.fn._isMove = true;
					hdPic.fn._dragx = e.pageX-parseInt($(".scrollButton").css("left"));
					$(".scrollButton").fadeTo(20, 0.5);
					$("a.mask").hide();
				});
				 $(document).mousemove(function(e){
					if(hdPic.fn._isMove){
						var x=Math.max(0, Math.min(e.pageX-hdPic.fn._dragx,_this._listLen*110));
						$(".scrollButton").css({left:x});
						hdPic.fn._dragmov();
					}
				 }).mouseup(function(){
					hdPic.fn._isMove=false;
					//取消捕获范围
					 if($(".scrollButton").releaseCapture){
						 $(".scrollButton").releaseCapture();
					   }else if(window.captureEvents){
						  window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
					  }
					$(".scrollButton").fadeTo("fast", 1);
					if(parseInt($("#Smailllist").css("left"))%131!==0 && _this._isDoc){
						var argleft = parseInt($("#Smailllist").css("left"));
						$("#Smailllist").animate({left:argleft+(Math.abs(parseInt($("#Smailllist").css("left"))%131))+"px"},"fast");
					};
					_this._isDoc = false;
				 })
			};
			//自动播放
			$(".play").click(function(){
				if(!hdPic.fn._isAuto){
					hdPic.fn._autoplay(data);
				}else{
					hdPic.fn._stopAuto();
				}
			});
			//快捷键
			$(document).bind("keydown",function(e){
				e = window.event || e;
				hdPic.fn._stopAuto();
				e.keyCode == 37 && hdPic.fn._clickleft(data);
				e.keyCode == 39 && hdPic.fn._clickright(data);
				//e.keyCode == 38 && hdPic.fn._clickleft(data);
				//e.keyCode == 40 && hdPic.fn._clickright(data);
			});
			//焦点
				 var scrollPos; 
				if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') { 
					scrollPos = document.documentElement; 
				} 
				else if (typeof document.body != 'undefined') { 
					scrollPos = document.body; 
				} 
				var _topnav = $("#toolBar").offset().top;
				$(scrollPos).animate({scrollTop:_topnav - 10}, 1000);
		},
		_stopAuto:function(){//停止自动播放
			$(".play").html("幻灯播放");
			$(".play").removeClass("stop");
			hdPic.fn._isAuto = false;
			window.clearInterval(hdPic.fn._autoTimer);
		},
		_autoplay:function(data){//自动播放
			$(".play").html("停止播放");
			$(".play").addClass("stop");
			hdPic.fn._isAuto = true;
				this._autoTimer = window.setInterval(function(){
					if(hdPic.fn._pageNow<data.length-1){
						hdPic.fn._pageNow++;
						hdPic.fn._showBig(data,hdPic.fn._pageNow);
					}else{
						hdPic.fn._stopAuto();
						hdPic.fn._getLast(data);
					}
					
				},5000)
		},
		_dragmov:function(){//拖拽浏览用函数
			 var a = parseInt(131 * (parseInt($(".scrollButton").css("left"))/(this._listLen*110))*(this._tmpArray.length - this._listLen));
			 $("#Smailllist").css({left:-a+"px"});
		},
		_replaceTitle:function(){//修正标题bug
			var title = document.title.replace(/#p.\d/i,"");
			document.title = title;
		},
		_showtit:function(n){//设置图片图注显示
			var sours = hdPic.fn._sourUrl!==""?"<a href='"+hdPic.fn._sourUrl+"' target='_blank'>"+hdPic.fn._sourName+"</a>":"<span>"+hdPic.fn._sourName+"</span>";
			var zuozhe = hdPic.fn._auth!==""?"<span style='padding-left:13px;padding-right:0px;'>"+hdPic.fn._auth+"</span>":"";
			if(this._tmpArray[n].showtit==""){
				$("#Main-B").html('<div class="TimeInfo"><span>'+hdPic.fn._pubTime+'</span>'+sours+''+zuozhe+'</div>');//图注装载
			}else{
				$("#Main-B").html('<P>'+this._tmpArray[n].showtit+'</p><div class="TimeInfo"><span>'+hdPic.fn._pubTime+'</span>'+sours+''+zuozhe+'</div>');//图注装载
			}
			$("#Main-B").fadeIn("slow");
			//loadingProcess.setPicHandler(n);
		},
		_creatUrl:function(n){//创建组图浏览url标识
			var _org = /\#p\=/i.test(window.location.href);
			if(!_org){
				window.location.href = window.location.href+"#p=1";
			}else{
				window.location.href = window.location.href.split("#p=")[0] + "#p="+parseInt(n+1);
			}
		},
		_getUrl:function(){//获得组图url标识
			var str = window.location.href.toString(),pos = str.indexOf("#p=");
			var nub = 1;
			if(pos!==-1){
					nub=str.match(/\#p\=(\d{1,})/i)[1];
				}
			return nub;
		},
		_Pload:function(data,n){//预加载前后
			if(data.length>3){//大于3张 才预加载
				if (n != Number(data.length - 1)) {
					this._preloadN.src = data[n + 1].bigpic
				}
			}
		},
		_showBig:function(data,n){//显示大图、显示成功后设置索引值对应的图注、url、组图当前索引值改写、小图位置、统计
			indexPic = n;
			$("#orgPic").attr("href",data[n].bigpic);
			//$("#PicSrc").attr("src","//mat1.gtimg.com/www/hd2011/ajax-loader.gif");
			this._sharwb(data[n].bigpic);
			hdPic.fn._Pload(data,n);
			this._isAD && hdPic.fn._hideLast();
			var img = new Image();
			$("#PicSrc").load(function(){
				//hdPic.fn._autoSca($(this),data[n].bigpic);
				img.src  = data[n].bigpic;
				hdPic.fn._replaceTitle();
				$(this).height()>600?$("#Main-A").height($(this).height()):$("#Main-A").height(600);
				$(this).css("margin-top",parseInt($("#Main-A").height()-$(this).height())/2+"px");
			}, function(){
				w = img.width, h = img.height;
				if(img.complete){
					if(w>980) w = 980;
				}
				img.onerror = function(){
					img = img.onload = img.onerror = null;
				};
				
				img.onload = function(){
					w = img.width;
					h = img.height;
					if(w>980) w = 980;
					img = img.onload = img.onerror = null;
				};
				$("#PicSrc").css('width', w);
			});
			$("#PicSrc").fadeTo("fast", 0, function(){
					
					hdPic.fn._showSmall(n);
					hdPic.fn._showtit(n);
					hdPic.fn._countPV(parseInt(n+1));//统计PGV
					$("#PicSrc").attr("src",data[n].bigpic);
					$("#PicSrc").fadeTo("fast",1);
			 });
			 hdPic.fn._pageNow = n;
			// this._coupletAd(n,data);
		},
		/*
		* 对联广告
		*/
		_coupletAd:function(n,data){
			if(!isInArray(NoCouplet, hdPic.fn._getDomain())){//有广告频道
				var ADnb="gaoqing_couplet";//默认广告位
				$.each(CoupletSet,function(i){
					if(this.ch == hdPic.fn._getDomain() || (this.ch instanceof Array && isInArray(this.ch, hdPic.fn._getDomain()))){//自定义广告
						ADnb=this.ad;
					}
				});
				var div = '<div id="' + ADnb + '" rerender="1"></div>';
				$('#coupletAD').html(div);

				if(typeof crystal != 'undefined' && crystal.render) {
					crystal.render({"loc":ADnb,"curr":n,"total":data.length});	//xxx是广告位id，n是当前图片索引，data.length 为该组图图片总数
				}
			}
			function isInArray(arr, n){
				var i = 0; len = arr.length;
				for(i = len; i >= 0; i--){
					if(arr[i] === n) return true;
				}
				return false;
			}
		},
		_autoSca:function($this,src){
			var img = new Image();
			img.src = src;
			if (img.width > 0 && img.height > 0) {//都大于0
				if(img.width>980) {
					$this.width(980);
				}
			}
		},
		_showSmall:function(n){//小图移动切换逻辑
		var _this = this, _len = hdPic.fn._tmpArray.length
			$("a.mask").show();
			if(_len <= this._listLen){
				$("a.mask").animate({left: (131*n)+4+"px"},"slow");
				return false;
			}
			var _left,_latsindex=this._listLen, _n = Math.floor(this._listLen/2);

			
			if(n>=_n && n<_len-_n){//大于3小于倒数3
				setTimeout(function(){
						if(_this._clickSum > 1) {
							$("#Smailllist").css({left: -131*(n-_n)+"px"});
						}else{
							$("#Smailllist").stop(true, true).animate({left:-131*(n-_n)+"px"},"slow");
						}
					}, 200);
				if(!this._record){
					_left = (131*_n)+4+"px";
					$("a.mask").animate({left:_left},"fast");
					$(".scrollButton").animate({left:_left},"fast");
					this._record = true;
				}
			}else{
				this._record = false;
				if(n>=_len-_n){
					_left = (131*(_latsindex-(_len-n)))+4+"px";
					$("#Smailllist").animate({left:-(_len-this._listLen)*131+"px"},"slow");
					$("a.mask").animate({left:_left},"slow");
					$(".scrollButton").animate({left:_left},"fast");
				}else{
					if(n<2){
						$("#Smailllist").animate({left:"0px"},"slow");
					}
						_left = (131*n)+4+"px";
						$("a.mask").animate({left:_left},"slow");
					
					$(".scrollButton").animate({left:_left},"fast");
				}
				
			}
			
		},
		_sharwb:function(pic){//转发到微博
			$("#Sharewbpic").bind("click",function(){
				_MI.Share.pop(pic,"qqcom.hdpicture.single");
			});
			  _MI.ShareArticle.build('MIcblog','qqcom.hdpicture');
		},
		_iwannComent:function(site,id){//评论
			if(hdPic.fn._aid < 100000000){
				$.getScript("http://sum.comment.gtimg.com.cn/php_qqcom/gsum.php?site="+site+"&c_id="+id,function(){
					return false;
				})
			}else{
				$.getScript("//coral.qq.com/article/batchcommentnum?targetid=" + hdPic.fn._aid + "&callback=_cbSum",function(){
					return false;
				})	
			}
		},
		_countIFrame:function(){//创建统计iframe
			$(".footer").append("<iframe id='iframeP' name='iframeP' src='' style='display:none;width:0px;height:0px;'></iframe>");	
		},
	   _countPV:function(index){//刷新PV
			var _this = this;
			function oldPgvDetail(){
				_this._coreload("//mat1.gtimg.com/ping.js",function(){
					try{
						 if (typeof pgvMain == "function") {
							if(pvRepeatCount==2){
								pvRefDomain=window.location.host;
								pvRefUrl=location.pathname;
							}
							pvRepeatCount =1;
							pgvMain();
						}
					}catch(e){}
					hdPic.fn._creatUrl(parseInt(index-1));
				});
			}
			function newPgvDetail(){
				_this._coreload("//mat1.gtimg.com/pingV3_1_5.js", function(){
					try{
						var catalogPathR1 = ARTICLE_INFO.catalog_full.toString().replace(/-/g,".");
						var catalogPath = catalogPathR1.toString().replace(/_/g, "-"), L, Z, W, M, P;
						if(ARTICLE_INFO.topic.name.length > 0){
							L = "L.",
							Z = "Z." + catalogPath + "." + ARTICLE_INFO.topic.name;
						}else{
							L = "L." + catalogPath,
							Z = "Z.";
						}
						W = "W." + ARTICLE_INFO.type,
						M = "M." + ARTICLE_INFO.tpl.type + ARTICLE_INFO.tpl.stype,
						P = "P." + ARTICLE_INFO.site.replace(/_/g,"-"),
						pgvInfo = L + "_" + Z + "_" + W + "_" + M + "_" + P;
						if(pvRepeatCount==2){
							pvRefDomain=window.location.host;
							pvRefUrl=location.pathname;
						}
						pvRepeatCount = 1;
						if(typeof(pgvMain) == 'function'){if(typeof(pgvInfo) != 'undefined'){pgvMain({pgUserType:pgvInfo});}}
					}catch(e){}
					hdPic.fn._creatUrl(parseInt(index-1));
				});
			}
			//pgv 20130711
			if(window['ARTICLE_INFO'] && window['ARTICLE_INFO']['catalog_full']){	
				newPgvDetail();
			}else {
				oldPgvDetail();
			}
		},
		_getData:function(data,coent){//第一次加载后，初始化大图、小图、绑定事件、统计等
			if(coent!==""){
				$("#Main-D").html(coent);
			}
			if(data.length>0){
				/*成功*/
				$("#Main-A").append("<img src="+data[parseInt(hdPic.fn._getUrl()-1)].bigpic+" id='PicSrc' style='display:none'/>");
				this._getReady();//大图ready
				this._small(data);//装载小图
				this._pageNow = parseInt(hdPic.fn._getUrl()-1);
				this._bindClick(data);
				$("#orgPic").attr("href",data[parseInt(hdPic.fn._getUrl()-1)].bigpic);
				this._showBig(data,parseInt(hdPic.fn._getUrl()-1));
				//setPicHandler
				
			}
		},
		/*_falshInt:function(data){
			loadingProcess.initSystems();//初始化全屏按钮
			loadingProcess.isJsReady = true;
			loadingProcess.setFullScreenDatas(data);//全屏数据传递
		},*/
		_getDomain:function(){//返回域名
			var Do = window.location.hostname;
			return Do.split(".")[0];
		},
		_small:function(data){//第一次加载后初始化小图
			var _tmp="",ulLength=131*data.length;
			$.each(data,function(i){
					if(i==0){
					_tmp+='<li><div><a href="javascript:void(0);" class="select"  onfocus="this.blur()"><img src="'+data[i].smallpic+'" rel="'+data[i].bigpic+'"/><span>'+(i+1)+"/"+data.length+'</span></a></div></li>';
					}else{
					_tmp+='<li><div><a href="javascript:void(0);"  onfocus="this.blur()"><img src="'+data[i].smallpic+'"  rel="'+data[i].bigpic+'"/><span>'+(i+1)+"/"+data.length+'</span></a></div></li>';
					}
			});
			$("#Smailllist").width(ulLength);
			$("#Smailllist").html(_tmp);
			/*放大镜*/
			if(hdPic.fn._getDomain()=="ent" || hdPic.fn._getDomain()=="lady"){//女性、娱乐灰度
				var _width=0,_height=0;
				$("#Smailllist img").each(function(){
					$(this).bind('mouseover',function(e){
							var _selfs = $(this);
							$(".sh").html('<img src="'+$(this).attr('rel')+'" id="preloadBig"/>');
							$("#preloadBig").load(function(){		 
							$(".sh").css({'left':_selfs.offset().left-parseInt(130-61)+'px','top':parseInt(_selfs.offset().top-270)+'px'});
							_width = $(this).width();
							_height=$(this).height();
							$("#preloadBig").css({'left':'0px','top':'0px'});
							$(".sh").fadeIn('slow');
							});
							
					});
					$(this).bind('mousemove',function(e){
						e = e || window.event;
						var x=e.clientX,y=e.clientY,ori=this.getBoundingClientRect(),z=Math.round($(".sh").width()/2);
						var zoom = $("#preloadBig").width()/$(this).width();
						x-=ori.left;
						y-=ori.top;
						$("#preloadBig").css({'left':-parseInt(x*zoom)+'px','top':-parseInt(y*zoom)+'px'});
						
					});
					$("#Smailllist").bind('mouseout',function(){
						$(".sh").fadeOut('slow');
					})
				})
			}
			/*放大镜*/
		},
		/*
			@个性配置
		*/
		_specific:function(){
			if(this._specificID!==""){
				if(this._specificID.indexOf("|")!==-1){
					var DOms = this._specificID.split("|");
					$.each(DOms,function(){
						try{
							$(this).hide();
						}catch(e){}
					})
				}else{
					try{
						$(this._specificID).css("visibility","hidden");
					}catch(e){
					
					}
				}
				
			}
		},
		_query:function(){//第一次加载,使用ajax加载数据,并在成功后把数据格式化到本地 
			 var org = window.location.href;
			$.ajax({  
              url: org.split(".htm")[0]+".hdBigPic.js?time="+Math.random(),
			  /* url:"http://ent.qq.com/a/20110816/000246.hdBigPic.js",*/
               type: "GET",   
               beforeSend: function(x) {  
				   x.setRequestHeader("If-Modified-Since","0");
                   x.setRequestHeader("Charset", "GB2312");
				   x.setRequestHeader("Cache-Control","no-cache");
                },  
               success: function() { //ajax成功
                   var arrMe = eval("(" + arguments[0] + ")");
					var length = arrMe.Children[0].Children[0].Children[0].Content;//长度
					for(var i=0;i<length;i++){
						var txt = arrMe.Children[0].Children[1].Children[i].Children[3].Children[0].Content;
						hdPic.fn._tmpArray.push({'showtit':''+txt.replace(/\<p\>/i,"").replace(/\<\/p\>/i,"")+'', 'showtxt':''+arrMe.Children[0].Children[1].Children[i].Children[0].Children[0].Content+'', 'smallpic':''+arrMe.Children[0].Children[1].Children[i].Children[1].Children[0].Content+'', 'bigpic':''+arrMe.Children[0].Children[1].Children[i].Children[2].Children[0].Content+''})
					}
					hdPic.fn._isgoOn = arrMe.Children[0].Children[5].Children[0].Content==0?false:true;//是否连续播放下一组图
					hdPic.fn._lastTitle = arrMe.Children[0].Children[3].Children[0].Content;//下一篇组图标题
					hdPic.fn._lastUrl = arrMe.Children[0].Children[2].Children[0].Content;//下一篇组图地址
					if(arrMe.Children[0].Children[8].Children.length!==0){
						hdPic.fn._coentArray = arrMe.Children[0].Children[8].Children[0].Content;//底部文章区
						$("#Main-D").show();
					}else{
						hdPic.fn._coentArray = "";
						$("#Main-D").hide();
					}
					/*尼尔森统计结束*/
					/*hdPic.fn._countIFrame();//创建统计iframe;*/
					hdPic.fn._getData(hdPic.fn._tmpArray,hdPic.fn._coentArray);
					//hdPic.fn._falshInt(hdPic.fn._tmpArray);
					if(hdPic.fn._isCiment=="2"){
						hdPic.fn._iwannComent(hdPic.fn._siteEname,hdPic.fn._aid);
					}else{
						$("#toolBar").find("ul.right").hide();
					};
					hdPic.fn._specific();
               },  
               error: function(x, e) {  
					$("#Main-P-QQ").html("<div style='margin:100px auto'>数据加载错误!</div>");
					/*$("#Main-P-QQ").html("<div style='margin:100px auto'>数据加载错误,页面将在<b style='color:red' id='miaoshu'>5</b>秒后跳转图片站!</div>");
					window.setInterval(function(){if(parseInt($("#miaoshu").html())==0){window.location.href="http://"+hdPic.fn._siteEname+".qq.com";return false;}else{$("#miaoshu").html(parseInt($("#miaoshu").html())-1)}},1000);*/
               },  
               complete: function(x) {  
                 //  alert(x.responseText);  
               }  
           });  
		},
		showBottomAD : function(){
			if(this.nowSite() == 'news' ){
				if(hdPic.fn._isShowLastAD && hdPic.fn._isShowLastAD == 1){
					$('#adBottom') && $('#adBottom').show();
				}
			}
		},
		init:function(p){
			window.onerror = ResumeError;
			hdPic.fn._sourName = p.name;//来源;
			hdPic.fn._sourUrl = p.url;//来源Url;
			hdPic.fn._pubTime = p.time;//发布时间;
			hdPic.fn._siteName = p.siteName;//站点中文名
			hdPic.fn._siteLink = p.siteLink;//站点链接
			hdPic.fn._isPic =p.ispic;//是否图片站
			hdPic.fn._isCiment = p.isComent;//是否评论
			hdPic.fn._aid = p.aid;//文章ID
			hdPic.fn._siteEname = p.siteEname;//站点英文名
			hdPic.fn._isShowLastAD = p.isShowLastAD;//是否显示末页广告 1 : 显示 0 : 隐藏
			if(typeof hdpic_specifics!=="undefined"){
				hdPic.fn._specificID =hdpic_specifics;//个性配置隐藏区域
			}
			if(typeof p.auth!=="undefined"){
				hdPic.fn._auth = p.auth;//作者
			}
			
			
			this._coreload(this._coreurl,function(){
				$(document).ready(function($){
					hdPic.fn._query();
					hdPic.fn._createAD();
					hdPic.fn._buttonAD();
					hdPic.fn._insetAD();
					hdPic.fn.showBottomAD();
					crystal.request();

				});
			});
		}
	}
	hdPic.fn.init.prototype = hdPic.fn;
	function _cbSum(){
			hdPic.fn._siteEname.replace('_', '');
			var site = /house/g.test(hdPic.fn._siteEname) ? 'house' : hdPic.fn._siteEname;
			if(hdPic.fn._aid < 100000000){
				$("#iwannComent").html("我要评论("+arguments[0]+")");
				$("#iwannComent").attr("href","http://comment5." + site + ".qq.com/comment.htm?site=" + site + "&id="+hdPic.fn._aid);
			}else{
				$("#iwannComent").html("我要评论("+ arguments[0].data[0].commentnum +")");
				$("#iwannComent").attr("href","//coral.qq.com/" + hdPic.fn._aid);
			}
	};/*  |xGv00|35c0df8d7e9b9426a730cd0e84bc5601 */