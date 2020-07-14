define('project/worldcup/$.mrwb', function(require, exports, module){
	var mbObj = {};
	var ui = require('ui');
	var boss = require('boss');

	var popHtml = function(){
		var str = '<div class="modulebox_win" style="display: none;" id="pop_viewer"><a href="javascript:;" class="modulebox_close" title="关闭" onclick="_iframe_close()"></a><div class="modulebox_border"></div><h2 class="modulebox_title" id="modulebox_title">转播原文&#65292;把它分享给你的听众</h2><div class="modulebox_content"><iframe src="about:blank" frameborder="0" width="100%" height="470" marginwidth="0" marginheight="0" id="read_frame" allowtransparency="true"></iframe></div></div>';
		$('body').append(str);
	}

	window['openSendBox'] = function (wb_type,wb_id,title) {

	popHtml();

	 var config = {
	  "appkey": "801300956",//801300956
	  "theme": 0,
	  "nobg": 1,
	  "LoginStyle": 1,//1表示用iframe形式登录
	  "ModuleConfigure": {
	   "PubModule": 1,
	   "TabModule": 0,
	   "TimelineModule": 0,
	   "TitleModule": 0
	  },
	  "TimelineDetail": {
	   "HeadStyle": 1,
	   "PageStyle": 0,
	   "PicStyle": 0,
	   "TwitterNum": 20
	  },
	  "PubModuleConfigure": {
	   //"RelayId": wb_id,
	   "InitialContent": "",//设置转播框内的初始内容
	   "InsertFunction": [2, 0],
	   "SourceUrl": location.href,
	   "position": 0
	  },
	  "TitleModuleConfigure": {
	   "OfficialAccount": "api_weibo"
	  },
	  "TimelineModuleConfigure": []
	 };
	 
	 delete config["PubModuleConfigure"]["relayid"];
	 delete config["PubModuleConfigure"]["replyid"];
	 
	 var pop =  document.getElementById("pop_viewer"); 

	try{
		 if (wb_type && wb_id){
		  config["PubModuleConfigure"][wb_type] = wb_id;
		 config["PubModuleConfigure"]["InsertFunction"] = [2, 0];
		 }else{
		  config["PubModuleConfigure"]["InsertFunction"] = [2,0,1];
		 }
	}catch(e){}

	 window.showTxWbYDQ(document.getElementById("read_frame"), config , function(d) {
	  if (d.ret === 0) {
	   setTimeout(function() {
	    pop.style.display = 'none';
	   },
	   500);
	  }
	 });

	 document.getElementById("modulebox_title").innerHTML = title;
	 pop.style.display = "block";


	 var l = (ui.windowWidth() - pop.offsetWidth) / 2 + ui.scrollX(), t = (ui.windowHeight() - 120) / 2 + ui.scrollY();
	 pop.style.left = l + 'px';
	 pop.style.top = t + 'px';
	}
	window['_iframe_close'] = function (){
		document.getElementById('read_frame').src = '';
		document.getElementById('pop_viewer').style.display = 'none';
	}

	window['follow'] = function (obj, id){
		function f(){
			var c = obj.className, h, m, k;
			m = c != "addAttention" && c != "delAttention";
			if (c == "addAttention" || m) {
				k = 1;
				h = "http://radio.t.qq.com/mini/follow.php"
			} else h = "http://radio.t.qq.com/mini/unfollow.php";
			obj.sending = 1;
			var l = "u=" + id + "&" + _MI.AcInfo() + "&r=" + _MI.random();
			_MUI.ajax({
				url: h,
				type: "post",
				data: l,
				crossDomain: true,
				success: function(n) {
					n = _MI.json(n);
					if(n.result == 0){
						obj.className = k == 1 ? "delAttention": "addAttention";
						obj.innerHTML = k == 1 ? '取消' : '+收听';
					}
				} 
			})
		}

		if(ui.cookie('skey')){
			f();
		}else{
			userLogin();
		}
		
	};
	String.prototype.realLength = function(){
		return this.replace(/[^\x00-\xff]/g,"**").length;
	};
	String.prototype.cut = function(limit){
		if(this.realLength() <= limit) return this;
		var len = Math.min(this.length, limit);
		var tmp = '';
		for(var i=len; i>=0; --i){
			var tmp = this.substring(0, i);
			if(tmp.realLength() <= limit) return tmp;
		}
		return tmp;
	};

	var _url = 'http://tcomment.qq.com/wb/artrt/fetchAction?url='+ARTICLE_INFO.article_url+'&cn=2&callback=mingrenFun', mingrenFun = '';
	ui.crossAsynJson(_url, 'mingrenFun', function(obj){
		var str = '';
		//if(obj.total == 0) return;
		var _arrStr = [];
		for(var i = 0; i < obj.total; i++) {
			var h = obj.contents[i];
			var userUrl = h.userInfo.url.search(/http:\/\//) > -1 ? h.userInfo.url + '/50' : 'http://mat1.gtimg.com/www/mb/img/p1/head_normal_50.png';
			var txt = '';
			var nick = h.userInfo.nick,
			    name = h.userInfo.name,
				sign = h.userInfo.sid;

			if(h.content.realLength() > 90){
				txt = h.content.cut(70) + '……'
			}else{
				txt = h.content;
			}
			var a = 'http:\/\/t.qq.com/' +　name;
			str = '<div class="mrwb-list clearfix">' + 
					'<div class="mrwb-user followall_mod" bosszone="mrMblog">' + 
						'<iframe src="http://follow.v.t.qq.com/index.php?c=follow&a=quick&appkey=801455866&sign=' + sign + '&v=2&name=' + name +  '&style=1000&f=1" frameborder="0" scrolling="auto" width="60" height="75" marginwidth="0" marginheight="0" allowtransparency="true"></iframe>'+
					'</div>' + 
					'<div class="mrwb-con">' + 
						'<p bosszone="mrMblog"><a href="' + a + '" target="_blank" class="mrwb-name">' + nick + '</a><span class="vip"></span></p>' + 
						'<p bosszone="mrMblog" class="mrwb-txt">' + txt + '</p>' + 
						'<p class="timewrap clearfix"><span class="time">' +  h.wbtime + '</span><a href="javascript:void(0)" class="r undis" onclick="openSendBox(\'RelayId\', \''+h.id + '\', \'转播原文&#65292;把它分享给你的听众\')" bosszone="MblogRE">转播</a></p>' + 
					'</div>'+ 
				 '</div>';
			_arrStr.push(str);
		}
		//微视
		var url = 'http://www.qq.com/json_data_djak/weishi/weishi_sjb_data.json?t=' + Math.random();
		ui.loadJs(url, function(){
			var con = '';

			for(var i = 0; i < 3 - obj.total; i++){	
				if(weishiData[i]){
					con = weishiData[i].content;

					
					if(con && con.realLength() > 54){
						con = con.cut(46) + '……'
					}

					str = '<div class="mrws-list clearfix" bosszone="SJBrweishi">'+ 
						'<div class="mrws-pic">'+ 
							'<a href="' + weishiData[i].t_url + '" target="_blank"><img src="' + weishiData[i].cover + '" />'+ 
							'<span class="bg" onclick="registerZone2({bossZone:\'SJBrweishi\',url:\'\'},1);"></span>'+ 
							'</a>'+ 
						'</div>'+ 
						'<div class="mrws-con">'+ 
							'<p class="mrws-user"><a target="_blank" href="http://www.weishi.com/u/' + weishiData[i].uid + '">' + weishiData[i].nick + '</a></p>'+ 
							'<p class="mrws-txt">' + con + '<a href="' + weishiData[i].t_url + '" target="_blank"><i class="ico_ws_play"></i></a></p>'+ 
							'<p class="timewrap clearfix">'+ 
								'<span class="icon_ws"></span>'+ 
							'</p>'+ 
						'</div>'+ 
					'</div>';
					_arrStr.push(str);
				}
			}

			ui.$('mrwb').innerHTML = _arrStr.reverse().join('');
		});
		
		//boss
		boss.bossFun(1604, 'EXmrMblog', 'mingrenweibo');
	})

	return mbObj;
});



/*  |xGv00|0fed15fb23fa2b0eba34299fe52d2ee7 */