// JavaScript Document  微爱捐赠jquery扩展包
//var rsR = {"donatePer":null,"donateCount":null,"donated":null,"isDonate":0,"weiai_money":0,"yuejuan_info":0};
(function($) {     
	$.fn.wgy_donate = function(options) {    
		var defaults = {  
			//捐赠框样式
			showWgyWrapId:options.layerId?options.layerId:'wgyLayer',  
			descId:options.descId?options.descId:'wgyDesc',
			background: '#FFF',
			//最多字数
			txtCount : 140 ,
			syId:'syWrap',
			btnId:options.btnId?options.btnId:'wgyBtn',
			countId:options.countId?options.countId:'wgySyCount'
		};  
	// Extend our default options with those provided.
	var user_uin=0;  
	var opts = $.extend(defaults, options);	
	
	if(opts.vd==0)
		var wgyDatas = smalldreamlist_v100_0;
	else if(opts.vd==1)
		var wgyDatas = smalldreamlist_v100_1;
	else if(opts.vd==2)
		var wgyDatas = smalldreamlist_v100_2;
	else if(opts.vd==3)
		var wgyDatas = smalldreamlist_v100_3;							
	else
		var wgyDatas = smalldreamlist_v100_1;	
	var wgyData;
	if(opts.index>=0)
		wgyData = wgyDatas[opts.index];
	else if(opts.wgy_id>0)
	{
		for(var kks in wgyDatas)
		{
			if(wgyDatas[kks].id==opts.wgy_id)
			{
					wgyData = wgyDatas[kks];
					break;
			}
		}
	}	
	
 	/**
	* 按钮点击事件,拉取用户初始捐赠数据
	* 插件入口
	*/
	//
	return this.bind('click',function(){
		//用户登陆判断
		if(global_userinfoobject.uin <= 0)
		{
		//	$.cookie('loginBid',B);
			ptloginopenfun();
			return false;
		}
		user_uin = global_userinfoobject.uin;
		var gy_key = setGyToken();
		$.getScript("http://wgyapp.gongyi.qq.com/donate_v5/checkDonateTimes?gy_key="+gy_key+"&pid="+wgyData.id+"&r="+Math.random(),function(){
			if(typeof(rsObj)!='undefined' && rsObj!=null && typeof(rsObj.code)!='undefined' && rsObj.code==-1)
			{
				ptloginopenfun();
				return;
			}
			if(typeof(rsR) != "undefined" && rsR != null && rsR != "")
			{			
				if(rsR.isDonate!=1)
				{
					toSupport(1);
					return;
				}
				$("#"+opts.showWgyWrapId).remove();
				var wgyLayerWraps = $.fn.wgy_donate.getLayer(wgyData,rsR);
				$("body").append(wgyLayerWraps);
				$wgyWrap = $("#"+opts.showWgyWrapId);				//弹出框对象
				$wgyDesc = $("#"+opts.descId);						//祝福textarea对象
				$wgyBtn = $("#"+opts.btnId);						//祝福botton	
				$syWrap = $("#"+opts.countId);							//祝福botton
	/*-逻辑判断显示-----------------------------------------------------------------------------------------*/	
				
	/*-逻辑判断显示-----------------------------------------------------------------------------------------*/
				
				
				//弹出背景框
				showBoxBg();
				//弹出捐赠层						
				showLayer($wgyWrap);
				//字数统计
				$wgyDesc.keyup(function(){
					//字数统计
					zfCln($wgyDesc,$syWrap);
				});
				
				//点击事件
				$wgyBtn.click(function(){
					//字数统计
					if(user_uin<=0)
					{
						if(typeof(getWgyUser) == 'function')
						{
							user_uin = getWgyUser();
						}else{
							return false;	
						}
						//return false;
					}
					if(user_uin<=0) return false;
					
					doWgy();
				});
				
			}
		});
				
	});
	
	
	
	/**
	* 弹出浮动层
	*/
	function showLayer(obj) {  
		var xwidth = obj.width();
		var xheight = obj.height();
		var A = parseInt($(window).width()) - xwidth;
		var T = parseInt($(window).height()) - xheight;
		obj.css("position","absolute");
		//obj.css("position","fixed");
		obj.css("z-index",30);
		obj.css("left", (A/2) + "px");
		obj.css('top', parseInt($(document).scrollTop()+(T/2-50))+'px');
		//obj.css('top', parseInt(T/2-50)+'px');
		obj.find(".closet").click(function(){
			hideBoxBg();
			obj.hide();	
		});
		obj.show();
		return;
	};	
	
	
	/**
	* 捐赠处理回调函数
	*/
	function doWgy() {  
		var content =$wgyDesc.val();
		if(content==''||content.replace(' ','') == '')
		{
			alert("请您填写微博祝福");
			$wgyDesc.focus();
			return false;
		}
		
		var isShare_val = $("#"+opts.showWgyWrapId+" input[name='isShare']:checked").val();
		if(typeof(isShare_val) != "undefined" && isShare_val != null && isShare_val==1)
		{
			var shareUrl = '&shareuin='+wgyData.uin+'&shareid='+wgyData.share_id;
		}else
		{
			var shareUrl = "";
		}
		
		//button 隐藏--------start
		$wgyBtn.hide();
		$("#"+opts.showWgyWrapId+" .submitWrap").html("<div style=\"text-align:center;color:green;font-weight:bold;line-height:200%;font-size:14px;\">数据加载中....</div>");
		//-------------------end
		var gy_key = setGyToken();
		$.getScript('http://wgyapp.gongyi.qq.com/weibo/broadcastV5_1?gy_key='+gy_key+'&did='+wgyData.id+'&desc='+encodeURIComponent(content)+'&wid='+wgyData.weibo_id+'&uin='+wgyData.uin+'&ref=i'+shareUrl+'&r='+Math.random(),
			function(response,status){
				if (typeof(rsObj) != "undefined" && rsObj != null && rsObj != "") {
					if(rsObj.code==-1){
						ptloginopenfun();
						return false;
					}
					if(rsObj.code==-2){
						showAlerts('温馨提示','请您填写微博祝福',1);
						return false;
					}
				
					if(rsObj.code==0 || typeof(rsShareObj) != "undefined" || (typeof(rsWeiaiObj) != "undefined" && rsWeiaiObj.code==0))
					{
						//hideDonateLayer();
						//成功
						var resMsg = '<div class="contentsss"><p>捐赠成功，感谢您的支持！</p><p>\"<span id="donateTipTitle"><a href="'+wgyData.url+'" target="_blank">'+wgyData.title+'</a></span></p><p>感谢您的热心参与，请关注该微爱梦想的进展。</p><p>温馨提示：月捐用户参与微爱项目更有额外奖励。<a href="http://gongyi.qq.com/loveplan/?ticket=20111101140626880039" hidefocus target="_blank"><span style="color:#0091d2">开通月捐&gt;&gt;</span></a></p></div>';
						showAlerts('支持微爱梦想',resMsg,1,460);
						if(typeof(flushAccount)!='undefined' && typeof(flushAccount)=='function') flushAccount();//初始化用户信息
						//rsObj = null;
						rsShareObj = null;
						
						if(rsObj.code==0){
							var str=rsObj.msg;
							if(str)
							{
								var rsStr=str.substr(0,3);
								if (rsStr == "0,0") {
									rsObj = null;
									$.getScript("http://t.qq.com/asyn/userAttrSave.php?t=116&v=1&cb=tFunc");
								}
							}
						}
						
						return false;	
					}
					
					//失败处理
					var rsArr=rsObj.msg.split(',');
					var ERROR_NET_EX = "捐赠不成功，可能是网络问题引起，请您返回重试。";
					var errorMsg='<div>'+ERROR_NET_EX+'</div>';
					switch(rsArr[2]){
						case '3':errorMsg='您还没有开通微博<br /><a href="http://t.qq.com" target="_blank">马上开通微博</a>';break;
						case '13':errorMsg='请不要反复广播相同内容的微博';break;
						case '4':errorMsg='请不要广播不文明的微博';break;
						case '5':errorMsg='禁止访问';break;
						case '8':errorMsg='广播的内容过长';break;
						case '9':errorMsg='请不要广播垃圾信息';break;
						case '10':errorMsg='您的广播太快';break;
						default:errorMsg='捐赠不成功，可能是网络问题引起，请您返回重试。';
					}
					showAlerts('错误提示',errorMsg,1);
					rsObj = null;
					return false;
				}
				showAlerts('错误提示','捐赠不成功，可能是网络问题引起，请您返回重试。',1);
			}
		);
		
		
		
	};
	
	/**
	* 完成2次后继续支持
	*/
	function toSupport(mtype){
		if(user_uin<=0)
		{
			if(typeof(getWgyUser) == 'function')
			{
				user_uin = getWgyUser();
			}else{
				return false;	
			}
		}
		if(user_uin<=0) return false;
		var layerWrap;
		if(mtype==1)
			layerWrap = $.fn.wgy_donate.getSupportLayer();
		else if(mtype==2)
			layerWrap = $.fn.wgy_donate.getOverLayer();
		showAlerts('支持微爱梦想',layerWrap,0,470);
		$("#pt_broadcastBtn").click(function(){
			var content = $("#plBroadcastWgyDesc").val();
			if(content==''||content.replace(' ','') == '')
			{
				alert("请您填写微博祝福");
				$("#plBroadcastWgyDesc").focus();
				return false;
			}	
			var shareUrl = '&shareuin='+wgyData.uin+'&shareid='+wgyData.share_id;
			var gy_key = setGyToken();
			$.getScript('http://wgyapp.gongyi.qq.com/weibo/ptbroadcast?gy_key='+gy_key+'&desc='+encodeURIComponent(content)+'&wid='+wgyData.weibo_id+'&uin='+wgyData.uin+'&ref=i'+shareUrl+'&r='+Math.random(),
			function(){
				if (typeof(rsObj) != "undefined" && rsObj != null && rsObj != "") {
					if(rsObj.code==-1){
						ptloginopenfun();
						return false;
					}
					if(rsObj.code==-2){
						showAlerts('温馨提示','<div>请您填写微博祝福</div>',1);
						return false;
					}
					/*success*/
					if(rsObj.code==0 || rsShareObj.code==0 || rsWeiaiObj.code==0)
					{
						//hideBroadcastLayer();
						rsShareObj = null;
						showAlerts("温馨提示","日积跬步，以至千里，感谢您的支持！",1);	
						return false;	
					}
					
					
					var rsArr=rsObj.msg.split(',');
					var ERROR_NET_EX = "转播不成功，可能是网络问题引起，请您返回重试。";
					var errorMsg='<div>'+ERROR_NET_EX+'</div>';
					switch(rsArr[2]){
						case '3':errorMsg='您还没有开通微博<br /><a href="http://t.qq.com" target="_blank">马上开通微博</a>';break;
						case '13':errorMsg='请不要反复广播相同内容的微博';break;
						case '4':errorMsg='请不要广播不文明的微博';break;
						case '5':errorMsg='禁止访问';break;
						case '8':errorMsg='广播的内容过长';break;
						case '9':errorMsg='请不要广播垃圾信息';break;
						case '10':errorMsg='您的广播太快';break;
						default:errorMsg='转播不成功，可能是网络问题引起，请您返回重试。';
					}
					showAlerts('错误提示',errorMsg,1);
					rsObj = null;
					return false
				}
				
			});
			
			
			
			
		});
		$("#plBroadcastWgyDesc").keyup(function(){
			//字数统计
			zfCln($("#plBroadcastWgyDesc"),$("#ptSupportCount"));
		});
	}
	
	//弹出背景框
	function showBoxBg()
	{
		hideBoxBg();
		$("body").append("<div id=\"floatBoxBg\" style=\"position:absolute;\"></div>");
		$("#floatBoxBg").attr('style','background:'+opts.background+';filter:alpha(opacity=80);opacity:0.8;position:absolute;top:0;left:0;');
		$("#floatBoxBg").css({display:"block",width:$(document).width(),height:$(document).height()});
	}
	
	//隐藏背景框
	function hideBoxBg()
	{
		$("#floatBoxBg").remove();
	}
	
	//隐藏Tips
	function hideTips(tipsId)
	{
		hideBoxBg();
		//var tipsId = eval("tipsId"+tipsId);
		$("#"+tipsId).hide();
	}
	
	//弹出层
	function showAlerts(title,msg,isclose,width_v)
	{
		$("#alertsWrap").remove();
		var closeBtn = "";
		if(isclose)
		{
			closeBtn = "<a class=\"closet\" style=\"background:url(http://mat1.gtimg.com/gongyi/2011star/closeTips.jpg) no-repeat;display:block;height:29px;width:65px;margin:0 auto;\"></a>";	
		}
		if(!width_v) width_v=300;
		$("body").append("<div id=\"alertsWrap\" style=\"color:#000;position:absolute;display:none;border:2px #d7d7d7 solid; background:#FFF;padding-bottom:10px;width:"+width_v+"px;\"><div style=\"height:32px; overflow:hidden; background:#F1F1F1; clear:both;\"><h4 class=\"titles\" style=\"list-style:none; padding:0; margin:0; color:#3F3F3F; font-weight:100; font-size:12px; float:left; width:180px; line-height:32px; padding-left:13px;\">Loading...</h4><span class=\"closet\" style=\"float:right; background:url(http://mat1.gtimg.com/gongyi/wgy/closeTips.png) no-repeat; width:11px; padding:3px; cursor:pointer; display:block; text-indent:-9999px; margin-top:10px;\" title=\"关闭\">cloase</span></div><div class=\"contents\" style=\"padding:10px; padding-top:10px; line-height:180%;clear:both;overflow:hidden;\"></div>"+closeBtn+"</div>");
		showBoxBg();
		$("#alertsWrap .titles").html(title);
		if(typeof(msg) != 'undefined' && msg!='' && msg!=null) $("#alertsWrap .contents").html(msg);
		showLayer($("#alertsWrap"));
		$("#"+opts.showWgyWrapId).hide();
		return;
	}
	
	
		  
	  
	  
	 //私有函数，计算剩余字符
	function zfCln(txtarea,syWrap)
	{
		var maxCount = opts.txtCount;
		var sy;
		var content = txtarea.val();
		sy = clnTextCount(txtarea.val(),maxCount);
		if(sy<0)
		{
			txtarea.val(getStrByLen(content,maxCount));
			alert('超过规定字符数');//$('p#boradcast_tips').html('内容超过限制...');
			//is_send = false;
			sy = "0";	
		}
		if(syWrap) syWrap.html(sy);	
	}	
	//计算字符
	function clnTextCount(D,maxCount)
	{
		if(!maxCount) maxCount = opts.txtCount;
		D = D.replace(/\s/ig,"");
		var C = maxCount - strlen(D);
		return C;
	} 
	/* Private 计算字符串长度*/
	function strlen(D) {
		var C = 0;
		for (i = 0; i < D.length; i++) {
			if (isChinese(D.charAt(i)) == true) {
				C = C + 1
			} else {
				C = C + 0.5
		}
	}
		return Math.floor(C)
	}
	
	// Private 判断是否中文字符
	function isChinese(D) {
		var C = /[u00-uFF]/ig;
		return ! C.test(D)
	}
	// Private 截取内容
	function getStrByLen(K, J) {
		if(typeof(K)=='undefined') return '';
		if(typeof(J)=='undefined') J=0;
		else{
			J = parseInt(J);
		if(J<0)
			J=100;
		}
		var G = "";
		var L = 0;
		var H = "";
		for (var I = 0; I < K.length; I++) {
			H = K.charAt(I);
			if (H.match(/[^\x00-\xff]/ig) != null) {
				L += 1
			} else {
				L += 0.5
			}
			if (L > J) {
				break
			}
			G += H
		}
		if(K.length>J) G+='...';
		return G
	}
	
	  
	 	function checkMoneyFormat(value)
		{
			var preg = /^[0-9]{1,}(\.[0-9]{1}0{0,1}){0,1}$/g;
			if(preg.test(value))
			{
				return true;
			}else{
				alert("微爱基金格式错误！");
				$("#"+opts.showWgyWrapId+" #donate_weiai_Money").focus();
				return false;
			}
		} 
	
		 
	};//END plugin   

	//弹出捐赠框
	//$.fn.wgy_donate.
	
	
	
	//状态弹出
	/*$.fn.wgy_donate.showStatus = function() {  
		alert('返回状态');
	};
	*/
	
	

})(jQuery);  

function tFunc(){return;}



$.fn.wgy_donate.getLayer = function(wgyData,rsR){
		var wgyLayerWrap = '<div id="wgyLayer" class="donateV3Tips" style="display:none; width:500px; color:#000;position:absolute; margin-top:75px; left:0;z-index:6; border:2px #d7d7d7 solid; background:#FFF; padding-bottom:20px;">\
 	<div class="titleWrap" style="height:32px; overflow:hidden; background:#F1F1F1; clear:both;"><h4 class="titleV3" style="list-style:none; padding:0; margin:0; color:#3F3F3F; font-weight:100; font-size:12px; float:left; width:300px; line-height:32px; padding-left:13px;">支持微爱梦想</h4><span class="closeTips closet" title="关闭" style="float:right; background:url(http://mat1.gtimg.com/gongyi/wgy/closeTips.png) no-repeat; width:11px; padding:3px; cursor:pointer; display:block; text-indent:-9999px; margin-top:10px;">cloase</span></div>\
 	<table border="0" cellpadding="0" cellspacing="0" style="margin:0 4px;" style="margin-top:10px;">\
        <tr><th class="titleL" style="width:88px; font-weight:100; text-align:right;line-height:38px;">支持项目：</th><td id="donateLayerTitle"><a href="'+wgyData.url+'" target="_blank">'+wgyData.title+'</a></td></tr>\
        <tr>\
        	<th class="titleL" style=" font-weight:100; text-align:right;">我的祝福：</th><td>\
            <textarea id="wgyDesc" name="donateLayerDesc" style="width:368px; height:80px;"></textarea><br />\
		<div style="margin-top:5px;font-weight:500;"><span class="tips">（<span id="textCount" style="display:none;"></span>还能输入<span id="wgySyCount">140</span>个字，您的祝福将同步到微博和空间）</span></div>\
		            </td>\
        </tr>\
        <tr><td colspan="2" class="notifyT" style="text-align:center;display:none;">小提示：支持成功后，即可点亮微博爱心图标和QQ爱心图标</td></tr>\
        <tr style="display:none;"><td colspan="2" class="notifyT" style="text-align:center;">&nbsp;&nbsp;分享到空间：<input type="checkbox" name="isShare" value="1" checked="checked" /></td></tr>\
    </table>\
    <div class="pp1 error" style="display:none" id="donateLayerTip"><p class="pp1 x"></p></div>\
	<div class="submitWrap"><a class="submit_btn" id="wgyBtn" style="display:block;width:86px;height:40px; overflow:hidden; background:url(http://mat1.gtimg.com/gongyi/wgy/btn.v3.png) no-repeat -212px -175px; margin:0 auto;"></a></div>\
 </div>';

	return wgyLayerWrap;
	
	}
	
$.fn.wgy_donate.getSupportLayer = function(){	
	return '<div style="padding:0px;"><h4 style="font-size:12px;margin:0;padding:0;font-weight:100;padding-bottom:8px;">该项目您今天已支持了，但还可以继续发表祝福支持微爱梦想，感谢您的支持</h4><div><textarea id="plBroadcastWgyDesc" name="plBroadcastWgyDesc" style="width:440px;overflow-y:auto;"></textarea><div style="margin-top:5px;font-weight:500;color:#999;"><span>&nbsp;（还能输入<span id="ptSupportCount">140</span>个字，您的祝福将同步到微博和空间）</span></div></div><div class="submitWrap" style="clear:both;"><a class="submit_btn" style="display:block;width:86px;height:40px; overflow:hidden; background:url(http://mat1.gtimg.com/gongyi/wgy/btn.v3.png) no-repeat -212px -175px; margin:0 auto;" id="pt_broadcastBtn"></a></div></div>';
	}
		
$.fn.wgy_donate.getOverLayer = function(){	
	return '<div style="padding:0px;"><h4 style="font-size:12px;margin:0;padding:0;font-weight:100;padding-bottom:8px;">感谢您的热心参与，虽然本期微爱捐赠已经结束，但您还可以继续支持微爱梦想，发表公益祝福，向更多人传播爱心！再次感谢。</h4><div><textarea id="plBroadcastWgyDesc" name="plBroadcastWgyDesc" style="width:440px;overflow-y:auto;"></textarea><div style="margin-top:5px;font-weight:500;"><span>&nbsp;（还能输入<span id="ptSupportCount">140</span>个字，您的祝福将同步到微博和空间）</span></div></div><div class="submitWrap" style="clear:both;"><a class="submit_btn" style="display:block;width:86px;height:40px; overflow:hidden; background:url(http://mat1.gtimg.com/gongyi/wgy/btn.v3.png) no-repeat -212px -175px; margin:0 auto;" id="pt_broadcastBtn"></a></div></div>';
	}	
	
function setGyToken()
{
	var str = getCookie_h('skey'),hash = 5381;
	for(var i = 0, len = str.length; i < len; ++i)
	{
		hash += (hash << 5) + str.charAt(i).charCodeAt();
	}
	return hash & 0x7fffffff;
}
function getCookie_h(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;

}	
	/*  |xGv00|903ee3ace397b2b93f81b7217245617d */