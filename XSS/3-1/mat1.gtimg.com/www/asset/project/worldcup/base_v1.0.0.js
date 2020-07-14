seajs.use('boss', function(boss){
	boss.bossFun(1604, 'EXmainNav', 'daohang');
});

seajs.use('project/worldcup/$.structure');

seajs.use('$', function(){

	/* baidu nav init */
	(function(){
		var  href = window.location.href;
		if(href.search(/baidu/i) > -1){
			$('.top-nav').hide();
			$('.top-nav-baidu').show();
			$('#tcopyright').hide();
		}
	})();
	
	//init
	var ul = $('.nav-Article-QQ ul'), fUl = $('#extendFixed').find('.menu-bd');
	fUl.append(ul.clone());
	//share
	$('#menu_share').hover(function(){
		$(this).addClass('currentBtn');
	}, function(){
		$(this).removeClass('currentBtn');
	});
	//extendFied
	var fixedObj = $('#extendFixed'), layout1 = $('#layout1'), topNavH = $('.top-nav').height(), adH = $('.body-Top-Ad').height(), isFixed = false, isAbsolute = false, isRelative = false, Stimer = null;

	var scrollFun = function(t){
		var t = document.body.scrollTop || document.documentElement.scrollTop;
        $(window).resize(function() {
            t = document.body.scrollTop || document.documentElement.scrollTop;
        }); 

		var wH = $(window).height(), bH = $('#Cnt-Main-Article-QQ').height() + $('#innerCon').height() + 200, fH = $('.foot-Article-QQ').height(), top = $('#mLayout').offset().top,  eH = $('#extendFixed').height();
		//console.log(bH, eH, fH, top);	
		if (ie6) {
			if(fixedObj && layout1){
				clearTimeout(Stimer);
				Stimer = null;
				if(t >= top){
					Stimer = setTimeout(function(){
                		//fixedObj.show();
                		$('.fixed-nav').show();
						fixedObj.css({position: 'absolute', left: 0, top: Math.min(t - top, bH - eH + 44) + 10,'zoom': 1});
					}, 500);  
				}else{
					Stimer = setTimeout(function(){
						fixedObj.css({'position':'relative', 'zoom': 1, top: 0});
						//fixedObj.show();
						$('.fixed-nav').hide();
					}, 500);
				}
			}
        } else {
        	if(fixedObj && layout1){
				if(t >= top){
					if (bH <= t + eH - top) {
	                    if (!isAbsolute) {
	                    	//console.log('isAbsolute');
	                        isFixed = false;
	                        isRelative = false;
	                        isAbsolute = true;
	                        var this_height = bH - eH + 44 ;
	                        fixedObj.css({
	                            position: "absolute",
	                            top: this_height
	                        });
	                    }
	                }else{
	                	if(!isFixed) {
							//console.log('fixed');
							$('.fixed-nav').show();
							fixedObj.css({'position':'fixed', 'top' : 10});
							isFixed = true;
							isRelative = false;
							isAbsolute = false;
						}
	                }
				}else{
					if(!isRelative){
						//console.log('realtive');
						fixedObj.css({'position':'relative', 'top': 0, 'zoom': 1});
						fixedObj.show();
						$('.fixed-nav').hide();
						isRelative = true;
						isFixed = false;
						isAbsolute = false;
					}
				}
			}
        }		
	}
	$(window).bind('scroll', function(){
		scrollFun();
	});
	$(function(){
		scrollFun();
	});
	var timer = null;
	$(window).resize(function(){
		clearTimeout(timer);
			timer = setTimeout(function(){
				scrollFun();
			}, 700);
	});

	$('.menu').hover(function(){
		$(this).addClass('active');
		$(this).find('.menu-bd').show();
	}, function(){
		$(this).removeClass('active');
		$(this).find('.menu-bd').hide();
	});

});

//insert Text
seajs.use('project/worldcup/$.insertTxt');

//dataAnalysis
seajs.use('project/worldcup/$.dataAnalysis', function(){
	//时间轴
	seajs.use('project/worldcup/timeline_v1.0.0');

});

//team player
seajs.use("project/worldcup/mod_team_player", function(){

	//attend
	seajs.use(['lib/ui','pin/wtg'], function(ui, wtg){
		var para = {}, oDiv = ui.$('wd'),
			oMatchBtn = ui.$$('matchBtn','div', oDiv), arr = [];


		var matchBtn = ui.$$('matchBtn', 'div', oDiv);

		ui.each(matchBtn, function(a, i){	
			var str = a.getAttribute('data-competitionid') + '_' + a.getAttribute('data-matchid');
			arr.push(str);
			wtg.matchBtn(a, {w: 200}, 'right_recom', addNum);
			
		})
		//查询关注
		var url = 'http://sportswebapi.qq.com/pinMatch/hasAttendMatches?mixedMatchIds=' + arr.join('|') + '&callback=hasAttendMatches' + '&ran=' + Math.random(),  _fun;

		ui.crossAsynJson(url, 'hasAttendMatches', function(data){	
			var hasA = data[1];
			if(data[0] == 0){
				ui.each(matchBtn, function(a, i){
					_fun = function(i){
						ui.$$('addAttBtn', 'div', a)[0].style.display = (hasA[i].hasAttend == 0 ? 'block' : 'none');
						ui.$$('delAttBtn', 'div', a)[0].style.display = (hasA[i].hasAttend == 1 ? 'block' : 'none');
					}
					_fun(i);
					wtg.pushCallback(function(){_fun(i);});
				});
			};
			ui.each(matchBtn, function(a, i){
				ui.$$('delAttBtn', 'div', a)[0].onmouseover = function(){
					var span  = this.getElementsByTagName('span')[0], a = this.getElementsByTagName('a')[0];
					a.style.visibility = 'visible';
				}

				ui.$$('delAttBtn', 'div', a)[0].onmouseout = function(){
					var span  = this.getElementsByTagName('span')[0], a = this.getElementsByTagName('a')[0];
					a.style.visibility = 'hidden';
				}
			});
			
			
		}, 'utf-8');


		function addNum(obj){
			//add Person
			var addBtn = ui.$$('addAttBtn', 'div', obj)[0], 
				delBtn = ui.$$('delAttBtn', 'div', obj)[0],
				matchId = obj.getAttribute('data-matchid'),
				one = 'one_' + matchId;
			
			if(addBtn.style.display == 'none'){
				ui.$(one).className = 'addOne';
				ui.$(one).innerHTML = '+1';
				ui.animate(ui.$(one), {top : -20, opacity : 100}, 1, function(){
					ui.css(ui.$(one), 'opacity', 0);
					ui.css(ui.$(one), 'top', 0);
					//ui.$(numID).innerHTML = n+1;
				});
			}else{
				ui.$(one).className = 'delOne';
				ui.$(one).innerHTML = '-1';
				ui.animate(ui.$(one), {top : -20, opacity : 100}, 1, function(){
					ui.css(ui.$(one), 'opacity', 0);
					ui.css(ui.$(one), 'top', 0);
					//ui.$(numID).innerHTML = n-1;
				});
			}
		}

	});
});

//team Palyer News
seajs.use('project/worldcup/$.worldcupNews');


/*
add icon
*/
(function(){
	var TrimLeft = function(str)
	{
		var whitespace = '\t\r\n 　';
		while(str.length > 0 && whitespace.indexOf(str.substr(0, 1)) != -1)
		{
			str = str.substr(1);
		}
		return str;
	};

	var TrimRight = function(str)
	{
		var whitespace = '\t\r\n 　';
		while(str.length > 0 && whitespace.lastIndexOf(str.substr(str.length - 1, 1)) != -1)
		{
			str = str.substr(0, str.length - 1);
		}
		return str;
	};

	var Trim = function(str)
	{
		return TrimLeft(TrimRight(str));
	};

	var GetLastAvaNode = function(nodes)
	{
		for(var i=nodes.length-1; i>=0; --i)
		{
			var itemNode = nodes[i];
			if(itemNode.nodeName != "#text")
				return itemNode;
			else
			{
				if(Trim(itemNode.nodeValue) != "")
					return itemNode;
				else
				{
					continue;
				}
			}
		}
		return null;
	};

	var contentEleObj = document.getElementById('Cnt-Main-Article-QQ');
	 
	if(contentEleObj.childNodes.length>0)
	{
		var lastEleObj = contentEleObj.children[contentEleObj.children.length-1];
		if(lastEleObj.tagName.toLowerCase() == "p")
		{
			var avaNode = GetLastAvaNode(lastEleObj.childNodes);
			if(avaNode && 
				avaNode.nodeName == "#text" && Trim(avaNode.nodeValue).length > 15)
			{
				var iconEleObj = document.createElement("img");
				iconEleObj.src = "http://www.qq.com/favicon.ico";
				iconEleObj.width = "16";
				iconEleObj.height = "16";
				var linkEleObj = document.createElement("a");
				linkEleObj.href = "http://www.qq.com/?pref=article";
				linkEleObj.target = "_blank";
				linkEleObj.alt = "\u70B9\u51FB\u8FDB\u5165\u817E\u8BAF\u9996\u9875";
				linkEleObj.title = "\u70B9\u51FB\u8FDB\u5165\u817E\u8BAF\u9996\u9875";
				linkEleObj.id = "backqqcom";
				//linkEleObj.setAttribute('bossZone','backqqcom');
				 
        linkEleObj.style.cssText=";white-space:nowrap;";
				var textEleObj = document.createElement("span");
        textEleObj.innerHTML = "\u8FD4\u56DE\u817E\u8BAF\u7F51\u9996\u9875>>";
				textEleObj.style.cssText=";padding-left:5px; font-size:14px;"; 
        textEleObj.bossZone = "backqqcom";
				linkEleObj.appendChild(iconEleObj);
				lastEleObj.appendChild(linkEleObj);
				linkEleObj.appendChild(textEleObj);
				linkEleObj.onclick = function(){
         registerZone2({bossZone:'backqqcom',url:'http://www.qq.com/?pref=article'},1)
         }

			}
		}
	}
	 
})();
document.domain="qq.com";
//buttom tool S
var T = 92, t = 0, isRec = false, goTop = qq.G("goTop"), ie6 = qq.B.ie6,  accessPlayer;

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
	//推荐浮层
	var winH = qq.windowHeight();

	if(ie6){
		ie6Fixed('scrollBtn', 400);
	}
});

qq.G('goTop') && qq.EA(qq.G('goTop'), 'click', function(){
	windowScroll(0);
	return false
});

//ie6 scrollBtn Fixed
function ie6Fixed(obj, posT){
	var obj = (typeof obj == 'string') ? qq.G(obj) : obj;
	var parent = obj.parentNode;
	var y = qq.getY(parent);

	obj.style.top = document.documentElement.scrollTop + document.body.scrollTop - y  + posT + "px";
}

function chgFollowallListBoss1(){registerZone2({bossZone:'followallbt1',url:''},1);}

/* 转播到微博 */

_MUI.ready(function(){
	if(qq.G('dp_followall_list_10')) new _MI.FollowAll('dp_followall_list_10','dp_followall_button_10','','qqcom.dp.followall',chgFollowallListBoss1);
	_MI.WebSCard.build('dp_followall_list_10','qqcom.dp.followall','.a-followall-tips');
	_MI.WebSCard.build('mbSourceCard','qqcom.dp.titleinfo');//微博名片
	_MI.WebSCard.build('Cnt-Main-Article-QQ','qqcom.keyword','.a-tips-Article-QQ');//内容区微博名片
	_MI.ShareArticlePic.build('Cnt-Main-Article-QQ','qqcom.dp.sharepic');	
	WBwd("Cnt-Main-Article-QQ");
});

//统计
var bossID = 1604, purl = location.href, userQQ = qq.cookie("uin") ? Number(qq.cookie("uin").substring(1)) : '';

function tongji_1(){
	var iurl = 'http://btrace.qq.com/collect?sIp=&iQQ=' + userQQ + '&sBiz=' + 'jirihuati' + '&sOp=expicNews&iSta=&iTy=' + bossID + '&iFlow=&sUrl=' + escape(location.href) + '&iBak=&sBak=&ran=' + Math.random();
		gImage_1 = new Image(1,1);
		gImage_1.src = iurl;

}
function tongji_2(){
	var iurl = 'http://btrace.qq.com/collect?sIp=&iQQ=' + userQQ + '&sBiz=' + 'tonghaoyuedu' + '&sOp=exthRead&iSta=&iTy=' + bossID + '&iFlow=&sUrl=' + escape(location.href) + '&iBak=&sBak=&ran=' + Math.random();
		gImage_2 = new Image(1,1);
		gImage_2.src = iurl;

}

//无障碍
qq.EA(document, 'keydown', function(e){
	var isAlt = false, is2 = false, is3 = false, e = qq.E(e);
	if(e.alt){ isAlt = true }
	if(e.key == 50) { is2 = true }
	if(e.key == 51) { is3 = true }
	
	if(isAlt && is2){
		qq.G('nav').getElementsByTagName('div')[0].setAttribute('title', '%5bfc%822a%ff0c%60a8%53ef%4ee5%901a%8fc7%4e0a%4e0b%952e%6765%9009%62e9%5bfc%822a');
		rwAccess_2();
	}
	if(isAlt && is3){
		qq.G('Cnt-Main-Article-QQ').parentNode.setAttribute('title', '%6b63%6587%ff0c%60a8%53ef%4ee5%901a%8fc7%4e0a%4e0b%952e%6765%9605%8bfb%5185%5bb9');
		rwAccess_3();
	}
});

if(qq.G('accessPlay')){
	qq.G('accessPlay').onfocus = function(){
		rwAccess_v();
	}
}
var accessPlayerState = 1;
qq.EA(qq.G(document), 'keydown', function(e){
 		var isSpace = false, e = qq.E(e);
		if(e.key == 32) { isSpace = true }
		if(isSpace && accessPlayer){
			if(accessPlayer && accessPlayerState == 1){
				videoPlayer.pause();
				accessPlayerState = 0;
				}
			else if(accessPlayer && accessPlayerState == 0){
				videoPlayer.play();
				accessPlayerState = 1;
				}
			}	
	});
qq.EA(qq.G(document), 'keydown', function(e){
	var isEsc = false, e = qq.E(e);
	if(e.key == 27) { isEsc = true }
	if(isEsc && accessPlayer){
		videoPlayer.pause();
		qq.G('relVideo').style.display = 'none';
		qq.G('relInfo').style.display = 'block';
		qq.G('relInfo').style.height = '105px';
		qq.showOpacity(qq.G('relInfo'), 200, 50);
		qq.G('goRead').focus();
		}
	});
//键盘控制视频结束

function rwAccess_v(){
	var iurl = 'http://btrace.qq.com/collect?sIp=&iQQ=&sBiz=&sOp=accesskeyV&iSta=&iTy=1617&iFlow=&iSite=' + escape(location.hostname) + '&sUrl=&sRefer=&sLink=&iUseragent=&iScreen=&iRes1=&iRes2=&iRes3=&iRes4=' + Math.random();
		rwImage_v = new Image(1,1);
		rwImage_v.src = iurl;

}

function rwAccess_2(){
	var iurl = 'http://btrace.qq.com/collect?sIp=&iQQ=&sBiz=&sOp=accesskey2&iSta=&iTy=1617&iFlow=&iSite=' + escape(location.hostname) + '&sUrl=&sRefer=&sLink=&iUseragent=&iScreen=&iRes1=&iRes2=&iRes3=&iRes4=' + Math.random();
		rwImage_2 = new Image(1,1);
		rwImage_2.src = iurl;

}

function rwAccess_3(){
	var iurl = 'http://btrace.qq.com/collect?sIp=&iQQ=&sBiz=&sOp=accesskey3&iSta=&iTy=1617&iFlow=&iSite=' + escape(location.hostname) + '&sUrl=&sRefer=' + escape(document.referrer) +'&sLink=&iUseragent=' + navigator.userAgent + '&iScreen=' + screen.width + '*' + screen.height + '&iRes1=&iRes2=&iRes3=&iRes4=' + Math.random();
		rwImage_3 = new Image(1,1);
		rwImage_3.src = iurl;

}

function ExposureBoss(id, name){
	var iurl = 'http://btrace.qq.com/collect?sIp=&iQQ=' + userQQ + '&sBiz=' + (arguments[2] ? arguments[2] : '') + '&sOp=' + name + '&iSta=&iTy=' + id + '&iFlow=&sUrl=' + escape(location.href) + '&iBak=&sBak=&ran=' + Math.random();
		gImage = new Image(1,1);
		gImage.src = iurl;
}
/*  |xGv00|d38e477da8349d0773a0eab6cb20fc85 */