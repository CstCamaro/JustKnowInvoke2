/**
 * User: yaoqli
 * Date: 16-6-8
 */
var adUrl="//game.qq.com/time/qqadv/Info_new_15217.js?v="+Math.random();
console.log('NZcomm');
var NZcomm={
	loadScript:function(url, callback) {
		var script = document.createElement('script');
		script.type = "text/javascript";
		if (script.readyState) {
			script.onreadystatechange = function() {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					if (callback) {
						callback()
					}
				}
			}
		} else {
			script.onload = function() {
				if (callback) {
					callback()
				}
			}
		}
		script.src = url;
		document.body.appendChild(script)
	},
	pvCount:function(){
		$.getScript("//tajs.qq.com/stats?sId=22043461",function(){$.getScript("//pingjs.qq.com/tcss.ping.https.js",function(){if(typeof(pgvMain)=='function')pgvMain()})});
		$.getScript("//game.gtimg.cn/images/js/title.js",function(){setTimeout(function(){$(".ost_inner").css({"width":1200})},1000)})
	},
	speedReport:function(pageFlag) {
		var imgSendTimePoint,
			s = [],
			url;
		for (var i = 0; i < timePoints.length; i++) {
			if ( !! timePoints[i]) {
				s.push((i + 1) + "=" + (timePoints[i] - d0))
			}
		}
		url = "//isdspeed.qq.com/cgi-bin/r.cgi?flag1=7718&flag2=38&flag3=" + pageFlag + "&" + s.join("&");
		if (Math.random() < 0.8) {
			imgSendTimePoint = new Image();
			imgSendTimePoint.src = url
		}
	},
	tabControl:function(nav,con){
		var navList=$("#"+nav).find("a"),conNode=$("#"+con),cursor=$("#"+nav).find("i"),node_width=navList.eq(0).width()+1;
		navList.each(function(index){
			$(this).mouseenter(function(){
				navList.removeClass().eq(index).addClass("current");
				conNode.find("ul").hide().eq(index).show();
				cursor.stop(false,true).animate({"left":index*node_width},400);
			});
		});
	},
	roll:function(){
		$.getScript(adUrl,function(){
			NZcomm.tabControl("newsNav","newsCon");
			NZcomm.tabControl("playerNav","playerCon");
			NZcomm.tabControl("videoNav","videoCon");
			NZcomm.tabControl("eventNav","eventCon");
			NZcomm.advertsManagement();
		});
	},
	carouselMain:function () {
		var tabList=$("#rollTab").find("a"),official_nav_html='',cooper_nav_html='',officialMod=$("#officialMod"),officialNav=$("#officialNav"),cooperMod=$("#cooperMod"),cooperNav=$("#cooperNav"),
			official_list=officialMod.find("a"),official_len=official_list.length,cooper_list=cooperMod.find("a"),cooper_len=cooper_list.length,rollMod=$(".roll_mod ");
		tabList.each(function(index){
			$(this).click(function(){
				tabList.removeClass().eq(index).addClass("current");
				rollMod.fadeOut().eq(index).fadeIn();
			});
		});

		for(var i=0;i<official_len;i++){
			var alt=official_list.eq(i).find("img").attr("alt");
			official_nav_html+='<span>'+alt+'</span>';
		}
		officialNav.find("p").html(official_nav_html).find("span:first").addClass("current").css({"width":790/official_len});
		officialNav.find("span").css({"width":(790-2*(official_len-1))/official_len});

		for(var i=0;i<cooper_len;i++){
			var alt=cooper_list.eq(i).find("img").attr("alt");
			if(alt){
				cooper_nav_html+='<span>'+alt+'</span>';
			}else{
				console.log(i);
			}
		}
		cooperNav.find("p").html(cooper_nav_html).find("span:first").addClass("current").css({"width":790/cooper_len});
		cooperNav.find("span").css({"width":(790-2*(cooper_len-1))/cooper_len});
		NZcomm.carousel("official",790,3000);
		NZcomm.carousel("cooper",790,3200);
	},
	carousel:function(id,w,tim){
		var idItem=$("#"+id),defaults={
			maxClass:idItem.find("ul"),
			minClass:idItem.find("div"),
			maxWidth:w,
			picTimer:null,
			num:0
		},maxClass=defaults.maxClass,minClass=defaults.minClass,maxLen=maxClass.find("li").length;
		idItem.hover(function(){
			clearInterval(defaults.picTimer);
		},function(){
			defaults.picTimer=setInterval(function(){
				if(defaults.num == maxLen) {
					picMoveFirst();
					defaults.num=0;
				} else {
					picMoves(defaults.num);
				}
				defaults.num++;
			},tim)
		}).trigger("mouseleave");
		minClass.find("span").each(function(index){
			$(this).bind("mouseover",function(){
				picMoves(index);
				defaults.num=index;
			});
		});
		function picMoves(index) {
			minClass.find("span").removeClass().eq(index).addClass("current");
			maxClass.stop(true,false).animate({"left":-defaults.maxWidth*index});
		}
		function picMoveFirst(){
			maxClass.append(maxClass.find("li:first").clone());
			maxClass.stop(true,false).animate({"left":-defaults.maxWidth*maxLen},300,function(){
				maxClass.css("left",0);
				maxClass.find("li:last").remove();
			});
			minClass.find("span").removeClass("current").eq(0).addClass("current");
		}
	},
	sideAnimation:function(){
		var up=$(".sd_up"),down=$(".sd_down"),ribbon=$(".sd_ribbon"),icon=$(".side_down_icon"),ms=$(".side_down_ms"),media=$(".media"),mediaList=$(".media_list"),logined=$(".logined"),loginedDetails=$(".logined_details");
		up.animate({top:0},500);
		down.animate({bottom:0},500,function(){
			ribbon.fadeIn();
			icon.delay(100).animate({top:30});
			ms.delay(100).animate({top:100},300,function(){
				ribbon.find("i").addClass("current");
				//NZcomm.getUserInfo();
			});
		});
		media.hover(function(){
			mediaList.fadeIn();
		},function(){
			mediaList.fadeOut();
		});
		mediaList.find("a").click(function(){
			mediaList.hide();
		});
		logined.hover(function(){
			loginedDetails.stop(false,true).animate({width:358});
		},function(){
			loginedDetails.stop(false,true).animate({width:0});
		})
	},
	modArr:[],
	advertsManagement:function(){
		var newsFirstLinks=$(".news_first_links"),new_first_txt=$(".new_first_txt"),picUrl='//game.gtimg.cn/upload/adw/';
		$.getScript(adUrl,function(){
			var obj=oDaTaNew15217;
			console.log(obj.pos16310);
			if(obj.pos16309){
				var thisPos=obj.pos16309;
				newsFirstLinks.attr({"href":thisPos[1]});
				newsFirstLinks.find("img").show().attr({"src":picUrl+thisPos[2]});
				new_first_txt.attr({"href":thisPos[1]});
				new_first_txt.html(decodeURIComponent(thisPos[0]));
			}
			fillContent("player_ad0",obj.pos16310);//赛事专区广告位1
			fillContent("player_ad1",obj.pos16311);//赛事专区广告位2
			fillContent("monomerAd0",obj.pos16312);//单体广告位1
			fillContent("monomerAd1",obj.pos16313);//单体广告位2
			fillContent("monomerAd2",obj.pos16314);//单体广告位3
			fillContent("brand0",obj.pos16330);//品牌广告位1
			fillContent("brand1",obj.pos16331);//品牌广告位2
			fillContent("brand2",obj.pos16332);//品牌广告位3
			fillContent("eventLinks",obj.pos16333);//赛专区广告位3
			function fillContent(id,pos){
				var nodeItem=$("#"+id);
				if(pos){
					nodeItem.attr({"href":pos[1]});
					nodeItem.find("img").show().attr({"src":picUrl+pos[2],"alt":decodeURIComponent(pos[0])});
					NZcomm.modArr.push(pos[1]);//添加曝光数据
				}else{
					nodeItem.find("img").show()
				}
			}
			console.log("所有:"+NZcomm.modArr.join("|"));
			try {
				EAS.ADShow(NZcomm.modArr.join("|"));//曝光上报所有广告位
			}catch (e) {
				console.log(e);
			}
			NZcomm.advertReport();//点击曝光
		})
	},
	advertReport:function(){
		//头部官方 ，头部合作，品牌活动，新闻专区第一条，玩家专区第一条，玩家专区第二条，赛事专区左侧第一条
		var officialMod=$("#officialMod a"),cooperMod=$("#cooperMod a"),brand=$(".brand a"),news_first_links=$(".news_first_links"),player_ad0=$("#player_ad0"),player_ad1=$("#player_ad1"),eventLinks=$("#eventLinks");
		//添加中部三条
		var monomerAd0=$('#monomerAd0'),monomerAd1=$('#monomerAd1'),monomerAd2=$('#monomerAd2');
		officialMod.each(function(){
			$(this).click(function(){
				ADClick($(this));
			})
		});
		cooperMod.each(function(){
			$(this).click(function(){
				ADClick($(this));
			})
		});
		brand.each(function(){
			$(this).click(function(){
				ADClick($(this));
			})
		});
		news_first_links.click(function(){ADClick($(this));});
		player_ad0.click(function(){ADClick($(this));});
		player_ad1.click(function(){ADClick($(this));});
		eventLinks.click(function(){ADClick($(this));});
        monomerAd0.click(function(){ADClick($(this));});
        monomerAd1.click(function(){ADClick($(this));});
        monomerAd2.click(function(){ADClick($(this));});
		function ADClick(id){
			EAS.ADClick(id.attr("href"));
		}
	},
	getUserData:function(areaid) {
		$.getScript("//apps.game.qq.com/nz/a20141211officalweb/userSimpleInfo.php?sArea="+areaid,function(){
			$("#killNumber").html(userInfo.msg.kill);NZcomm.setCookie("kill",userInfo.msg.kill);
			$("#killBekilled").html(userInfo.msg.kill_bekilled);NZcomm.setCookie("kill_bekilled",userInfo.msg.kill_bekilled);
			$("#killWin").html(userInfo.msg.win);NZcomm.setCookie("win",userInfo.msg.win);
			$("#killWinLose").html(userInfo.msg.win_lose+"%");NZcomm.setCookie("win_lose",userInfo.msg.win_lose);
		})
	},
	delUserData:function(){
		NZcomm.delCookie("kill");
		NZcomm.delCookie("kill_bekilled");
		NZcomm.delCookie("win");
		NZcomm.delCookie("win_lose");
		$("#killNumber").html("");
		$("#killBekilled").html("");
		$("#killWin").html("");
		$("#killWinLose").html("");
	},
	getUserInfo:function(){
		LoginManager.checkLogin(function(){
			LoginManager.getUserFace(function(obj){
				if(LoginManager.isLogin()){//判断是否登录
					$("#loginedFace").find("img").attr("src",obj.userFace);//获取qq头像图片

				}
				$.loadScript("//ossweb-img.qq.com/images/js/roleselector/roleselectorv3.js",function(){
					//公共的查角色信息
					var commonRoleSelector = function(callback){
						LoginManager.submitLogin(function(){
							var roleSelector = RoleSelector.init({
								'gameId' : 'nz', //业务ID
								'isQueryRole' : true, //是否查询角色信息，如果只需要选择大区，则设置为false
								'isShutdownSubmit' : false, //默认停机以后不查询
								'submitEvent' : function(roleObject){
									callback(roleObject);
								}
							});
							roleSelector.show();
						});
					};
					commonRoleSelector(function(obj){
						//console.log(obj.submitData.areaid);
						NZcomm.getUserData(obj.submitData.areaid);
					});
				});
			});
		}, function(){});
	},
	setCookie:function(name,value){
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},
	getCookie:function(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]);
		}else{
			return null;
		}
	},
	delCookie:function(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cVal=NZcomm.getCookie(name);
		if(cVal!=null){
			document.cookie= name + "="+cVal+";expires="+exp.toGMTString();
		}
	},
	bindArea:function(){
		//公共的查角色信息
		var commonRoleSelector = function(callback){
			LoginManager.submitLogin(function(){
				var roleSelector = RoleSelector.init({
					'gameId' : 'nz', //业务ID
					'isQueryRole' : true, //是否查询角色信息，如果只需要选择大区，则设置为false
					'isShutdownSubmit' : false, //默认停机以后不查询
					'submitEvent' : function(roleObject){
						callback(roleObject);
					}
				});
				roleSelector.show();
			});
		};
		commonRoleSelector(function(obj){
			//console.log(obj.submitData.areaid);
			NZcomm.getUserData(obj.submitData.areaid);
			NZcomm.setCookie("area","[更改]");
			$("#loginArea").html(NZcomm.getCookie("area"));
		});
	},
	loginSatus:function(){
		$.getScript("//ossweb-img.qq.com/images/js/milo_bundle/milo.js",function(){
			LoginManager.checkLogin(function(){
					//document.getElementById("loginQQ").innerHTML = LoginManager.getUserUin();
					//NZcomm.getRoleMessage();
					LoginManager.getUserFace(function(obj){
						if(obj.isLogin){//判断是否登录
							$("#loginedFace").find("img").attr("src",obj.userFace);//获取qq头像图片
							$("#loginArea").html(NZcomm.getCookie("area"));
							$("#killNumber").html(NZcomm.getCookie("kill"));
							$("#killBekilled").html(NZcomm.getCookie("kill_bekilled"));
							$("#killWin").html(NZcomm.getCookie("win"));
							$("#killWinLose").html(NZcomm.getCookie("win_lose"));
						}
					});
				},function(){
					NZcomm.setCookie("area","[绑定]");
					$("#loginArea").html(NZcomm.getCookie("area"));
				}
			);
		});
	},
	nzDownLoad:function(){
		$.getScript("//nz.qq.com/web201206/download/20120917820/download.js",function(){
			$(".side_down").attr("href",down.nzzs);
		});
	},
	textAnimate:function () {
		$.getScript('//nz.qq.com/web201606/jquery.lettering.js',function () {
			$.getScript('//nz.qq.com/web201606/jquery.textillate.js',function () {
				$('.tlt').textillate({
					// the default selector to use when detecting multiple texts to animate
					selector: '.texts',

					// enable looping
					loop: true,

					// sets the minimum display time for each text before it is replaced
					minDisplayTime: 2000,

					// sets the initial delay before starting the animation
					// (note that depending on the in effect you may need to manually apply
					// visibility: hidden to the element before running this plugin)
					initialDelay: 0,

					// set whether or not to automatically start animating
					autoStart: true,

					// custom set of 'in' effects. This effects whether or not the
					// character is shown/hidden before or after an animation
					inEffects: ['fadeInLeftBig'],

					// custom set of 'out' effects
					outEffects: [ 'hinge' ],
					// in animation settings
					'in': {
						// set the effect name
						effect: 'fadeInLeftBig',

						// set the delay factor applied to each consecutive character
						delayScale: 1.5,

						// set the delay between each character
						delay: 50,

						// set to true to animate all the characters at the same time
						sync: false,

						// randomize the character sequence
						// (note that shuffle doesn't make sense with sync = true)
						shuffle: false,

						// reverse the character sequence
						// (note that reverse doesn't make sense with sync = true)
						reverse: false,

						// callback that executes once the animation has finished
						callback: function () {}
					},

					// out animation settings.
					'out': {
						effect: 'hinge',
						delayScale: 1.5,
						delay: 50,
						sync: false,
						shuffle: false,
						reverse: false,
						callback: function () {}
					},
					// callback that executes once textillate has finished
					callback: function () {},
					// set the type of token to animate (available types: 'char' and 'word')
					type: 'char'
				});
			})
		})
	},
	tabSwitch:function(id,item,con){
		var navList=$("#"+id).find(item),conList=$("."+con);
		retrieveSub();
		conList.each(function(index){
			navList.eq(index).click(function(){
				navList.removeClass().eq(index).addClass("current");
				conList.hide().eq(index).show();
			});
		});
		function retrieveSub(){
			var thisUrl=location.href,s=thisUrl.indexOf("tab=");
			if(s<0){
				navList.removeClass().eq(0).addClass("current");
			}else{
				var thisVal=thisUrl.substring(s+4,s+5);
				if(thisVal==2){
					navList.removeClass().eq(1).addClass("current");
					conList.hide().eq(1).show();
				}else{
					navList.removeClass().eq(0).addClass("current");
					conList.hide().eq(0).show();
				}
			}
		}
	},
	nzSurvey:function(){
		$(".v_tips_con").animate({"top":"-150px"},1000);
		$(".v_tips_close").click(function(){
			$(".v_tips_con").animate({"top":0},500);
		});
	},
	urlChangeClass:function(aUrl,bUrl,cUrl,dUrl){
		var thisUrl=location.href,newsNavArr=$("#newsNav").find("a");
		if(thisUrl.indexOf(aUrl)!=-1){
			newsNavArr.removeClass().eq(0).addClass("current");
		}else if(thisUrl.indexOf(bUrl)!=-1){
			newsNavArr.removeClass().eq(1).addClass("current");
		}else if(thisUrl.indexOf(cUrl)!=-1){
			newsNavArr.removeClass().eq(2).addClass("current");
		}else if(thisUrl.indexOf(dUrl)!=-1){
			newsNavArr.removeClass().eq(3).addClass("current");
		}else{
			newsNavArr.removeClass().eq(0).addClass("current");
		}
	},
	getRoleMessage:function(){
		$.getScript('//ossweb-img.qq.com/images/js/milo/milo.js',function(){
			amsCfg_432484 = {
				"iActivityId": 135639, //活动id
				"iFlowId":    432484, //流程id
				"sNeedSubmitPopDiv":  false ,
				"fFlowSubmitEnd": function(res){
					if(res.sOutValue1==1 && res.sOutValue2==1){
						window.location.href='//nz.qq.com/main_test.shtml';
					}
					if((res.sOutValue3=="" || res.sOutValue3<10)&&(res.sOutValue4=="" || res.sOutValue4<10) ){
						window.location.href='//nz.qq.com/main_test.shtml';
					}
				},
				"fFlowSubmitFailed":function(res){
				}
			};
			amsSubmit(135639,432484);
		})

	},
	dialog:function() {
		var createDia = (function() {
			var parentNode = $($('body')[0]);
			var diaDom =$('<div class="dia" id="dia"><div class="dia-con"><div class="dia-video" id="video"></div></div><a href="javascript:void(0);" class="close"></a></div>');
			parentNode.append(diaDom);

			$.getScript('//vm.gtimg.cn/tencentvideo/txp/js/txplayer.js',function(){
				var player = new Txplayer({
				  containerId: 'video',
				  vid: 'g0549ae2jjt',
				  width: '550',
				  height:306,
				  autoplay:true
				});
			})
		})();
		var showDia = function() {
			$('#dia').show();
		};

		$('#dia .close').bind("click",function(){
			$("#video").html('');
			$('#dia').hide();
		});

		showDia();
	},
	getCookie:function(name) {
		if(document.cookie.length > 0) {
			var cookieStart = document.cookie.indexOf(name + "=");
			if(cookieStart !== -1) {
				cookieStart = cookieStart + name.length + 1;
				var cookieEnd = document.cookie.indexOf(";", cookieStart);
				if(cookieEnd === -1) {
					cookieEnd = document.cookie.length;
				}
				return decodeURIComponent(document.cookie.substring(cookieStart, cookieEnd));
			}
		}
		return "";
	},
	setCookie:function(name,value,expireDays) {
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate()+expireDays);
		document.cookie = name+ "=" +encodeURIComponent(value) + ((expireDays==null) ? "" : ";expires="+expireDate.toGMTString());
	},
	init:function(){
		NZcomm.pvCount();
		// NZcomm.nzDownLoad();
    $('#gjSearch').on('click',function () {
      var searchValue = $('#gjInput').val();
      if(searchValue){
        $('#gjInput').val('');
        location.href='//nz.qq.com/cp/a20180702search/index.html?keyword='+encodeURIComponent(searchValue);
      }else{
        alert('请输入关键字');
      }
    })
		/*var day = new Date();
		day = day.getDate();
		var cookieDate = NZcomm.getCookie('lastDialogDay');
		if(cookieDate != day) {
			NZcomm.dialog();
			NZcomm.setCookie('lastDialogDay', day, 1);
		}*/
	}
};
NZcomm.init();

