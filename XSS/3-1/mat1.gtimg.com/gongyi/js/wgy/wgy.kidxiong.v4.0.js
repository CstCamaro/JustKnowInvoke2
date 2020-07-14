//var weiboTopic = [95080072951785 ,20199082407960 ];
var orderWeiboTopicID = 0;
var ERROR_NET_EX = '您的网络有问题，请检查网络后重试';
var NUMPERPAGE = 5;
var LISTENDESC = '<div class="listen_now" style="color:#999">订阅成功<div>';
var GDREAMSTATUS = 0;
var INIT=true;
function initWeiboTopic() {
	var N = weiboTopic.length;
	var A = parseInt(Math.random() * N);
	changeWeiboTopic(A);
	orderWeiboTopicID = A;
}
function showTipLayer(title,msg){
	hideTipLayer();
	hideTip3Layer();
	$('#tipLayer .top div').html(title);
	$('#tipLayer .content').html(msg);
	$('#tipLayer .content_wgy').html(msg);
	var A = parseInt($(window).width()) - 407;
	var T = parseInt($(window).height()) - 279;
	$("#tipLayer").css("left", (A / 2) + "px");
	$('#tipLayer').css('top', $(document).scrollTop()+'px');
	$('#tipLayer').css('margin-top',(T/2)+'px');
	$('#tipLayer').show();
}
function hideTipLayer(){
	$('#tipLayer').hide();
	$('#tipOutLayer').hide();
}
function showTip3Layer(title,msg){
	hideTipLayer();
	hideTip3Layer();
	$('#tip3Layer .top div').html(title);
	$('#tip3Layer .contentss').html(msg);
	$('#tip3Layer .content_wgy').html(msg);
	var A = parseInt($(window).width()) - 301;
	var T = parseInt($(window).height()) - 175;
	$("#tip3Layer").css("left", (A / 2) + "px");
	$('#tip3Layer').css('top', $(document).scrollTop()+'px');
	$('#tip3Layer').css('margin-top',(T/2)+'px');
	$('#tip3Layer').show();
}
function hideTip3Layer(){
	$('#tip3Layer').hide();
	$('#tipOutLayer').hide();
	hideDonateLayer();
}
function orderWeiboTopic() {
	if(gIsLogin==1)
	{
		var url="//wgyapp.gongyi.qq.com/wgy/orderWeiboTopic?" + Math.random() + "&topicid=" + weiboTopic[orderWeiboTopicID].id;
		$.getScript(url,
		function() {
			if (typeof(orderWeiboObj) != "undefined" && orderWeiboObj != null && orderWeiboObj != "") {
				if(orderWeiboObj.code==-1){
					changeUin();
					return false;
				}
				var str=orderWeiboObj.msg;
				if(str==false){
					showTip3Layer('温馨提示','<div>'+ERROR_NET_EX+'</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
					return false;
				}
				if (str.substr(0, 3) == "0,0") {
					weiboTopic[orderWeiboTopicID].text=LISTENDESC;
					$('#listenspan').html(LISTENDESC);
					return false;
				} else {
					showTip3Layer('温馨提示','<div>'+ERROR_NET_EX+'</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
					return false;
				}
				orderWeiboObj = null;
				return false
			}
			showTip3Layer('温馨提示','<div>'+ERROR_NET_EX+'</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
			return false;
		});
	}
	else
	{
		changeUin();
		return false;
	}
}
function tFunc(R){}

function broadcastWeibo(flag){
	if(gIsLogin==1)
	{
		var content = $("#weibotextarea").val();
		var n=content.indexOf("了解更多：//gongyi.qq.com/wgy");
		if(n<0)
			content+="了解更多：//gongyi.qq.com/wgy";
		var url='//wgyapp.gongyi.qq.com/wgy/broadcastWeibo?desc='+encodeURIComponent(content)+'&r='+Math.random();
		$.getScript(url,
		function(){
			if (typeof(rsObj) != "undefined" && rsObj != null && rsObj != "") {
				if(rsObj.code==-1){
					changeUin();
					return false;
				}
				if(rsObj.code==-2){
					showTip3Layer('温馨提示','<div>请输入广播内容</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
					return false;
				}
				var str=rsObj.msg;
				var rsStr=str.substr(0, 3);
				if (rsStr == "0,0") {
					var title=content.split('#');
					if(title[1]==weiboTopic[0].title||title[1]==weiboTopic[1].title||title[1]==weiboTopic[2].title)
						$.getScript("http://t.qq.com/asyn/userAttrSave.php?t=116&v=1&cb=tFunc");
					var str='<div>恭喜您，广播成功。</div>';
					if(recvObj>=1){
						flushAccount();
						str+='<div>所有未领取的微爱基金在2011年12月1日零时清零。</div><a href="javascript:void(obtainWjj('+flag+'));" hidefocus class="obtainwjj"></a>';
						recvObj==null;
						showTip3Layer('领取微爱基金',str);
					}
					else{
						str+='<div>今天该话题下的微爱基金已领取完毕。</div><div>感谢您的热心参与。</div><a href="javascript:void(hideTipLayer());" hidefocus class="close_btn"></a>';
						showTipLayer('温馨提示',str);
					}
					rsObj = null;
					return false;
				}
				var rsArr=rsObj.msg.split(',');
				var errorMsg='<div>'+ERROR_NET_EX+'</div>';
				switch(rsArr[2]){
					case '3':errorMsg='<div>您还没有开通微博</div><div><a href="http://t.qq.com" hidefocus target="_blank">马上开通微博</a></div>';break;
					case '13':errorMsg='<div>请不要反复广播相同内容的微博</div>';break;
					case '4':errorMsg='<div>请不要广播不文明的微博</div>';break;
					case '5':errorMsg='<div>禁止访问</div>';break;
					case '8':errorMsg='<div>广播的内容过长</div>';break;
					case '9':errorMsg='<div>请不要广播垃圾信息</div>';break;
					case '10':errorMsg='<div>您的广播太快</div>';break;
					default:errorMsg='<div>'+ERROR_NET_EX+'</div>';
				}
				showTip3Layer('温馨提示',errorMsg+'<a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
				rsObj = null;
				return false
			}
			showTip3Layer('温馨提示','<div>'+ERROR_NET_EX+'</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
			return false;
		})
	}
	else{
		changeUin();
		return false;
	}
}


function IsURL(url){
	url = url.match(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]':+!]*([^<>\"\"])*$/);
	return url==null?false:true;
}

function inputNumberOnly(val,e){
	var key = window.event?e.keyCode:e.which;
	if (key<48 || key>57){
	   window.event?e.keyCode=0:e.which=0;
	 } 
}
function calcDonateDesc(){
	var D = $("#donateLayerDesc").val();
	var C = 140 - strlen(D);
	$('#donateLayerDescLen').html(C);
	if (C <= 0) {
		$('#donateLayerDescLen').html('0');
		$("#donateLayerDesc").val(getStrByLen(D, 140))
	}
}
function calcWeiboText() {
	var D = $("#weibotextarea").val();
	var C = 140 - strlen(D);
	$("#weibotextarealen").html(C);
	if (C <= 0) {
		$("#weibotextarealen").html("0");
		$("#weibotextarea").val(getStrByLen(D, 140))
	}
}
function initDonateLayer(){
	/*
	var def=$.Tjs_Get('defaultfocus');
	if(def>=1){
		showDonateLayer(def);
	}
	*/
}
function changeUin() {
	var B = new Date();
	var A = $.Tjs_GetThisPageUrl();
	if (A.indexOf("defaultfocus") >= 0) {
		A = A.replace(/defaultfocus=([0-9]*)/gi, "defaultfocus=" + gIndex)
	} else {
		if (A.indexOf("?") >= 0) {
			A = A + "&defaultfocus=" + gIndex
		} else {
			A = A + "?defaultfocus=" + gIndex
		}
	}
	if (A.indexOf("tm") >= 0) {
		A = A.replace(/tm=([0-9]*)/gi, "tm=" + B.valueOf())
	} else {
		if (A.indexOf("?") >= 0) {
			A = A + "&tm=" + B.valueOf()
		} else {
			A = A + "?tm=" + B.valueOf()
		}
	}
	ptlogin_init("用户登录", A, "", "", "", true, 0);
	openLogin(openparam_info);
	$(window.frames["login_frame"].document).find("input[type='reset']").val("关闭")
}
function enableDonateLayerMoney() {
	$("#donateLayerMoney").removeAttr("disabled");
	$("#donateLayerMoney").focus()
}
function disableDonateLayerMoney() {
	$("#donateLayerMoney").attr("disabled", true);
	$("#donateLayerMoney").val("")
}
function showDonateLayer(B) {
	//调试
	//showDonateLayerV3(B);
	//return;
	$("#donateLayerTip").hide();
	$("#donateLayerMoney").val("");
	gOrganizer = $("#dream_uin_" + B).val();
	gDreamID = $("#dream_id_" + B).val();
	$("input[name='donateLayerType']:first").attr("checked", true);
	gIndex = B;
	$("#donateOutLayer").css("height", $(document).height() + "px");
	var A = parseInt($(window).width()) - parseInt($("#donateLayer").width());
	$("#donateLayer").css("left", (A / 2) + "px");
	$('#donateLayer').css('top', $(document).scrollTop()+'px');
	$("#donateLayerTitle").html($("#dreamtitle_" + B).html());
	$("#donateLayerOrganizer").val(gOrganizer);
	$("#donateLayerID").val(gDreamID);
	$("#donateLayerUin").val(gUin);
	$("#donateOutLayer").show();
	$('#donateLayerMoney').attr('disabled',true);
	$('#donateLayerDesc').val('');
	$("#donateLayer").show()
}
function showFlowTip(i){
	$('#flow_tip1').hide();
	$('#flow_tip2').hide();
	$('#flow_tip'+i).show();
}
function hideFlowTip(i){
	$('#flow_tip'+i).hide();
}
/*
function showObtainLayer(){
	$('#obtainLayer').show();
}
function hideObtainLayer(){
	//window.location.reload()
	$('#obtainLayer').hide();
	return false;
}
*/
function showObtainTipLayer(msg){
	$('#obtainTipLayerText').html(msg);
	$('#obtainTipLayer').show();
	return false;
}
function hideObtainTipLayer(){
	$('#obtainTipLayer').hide();
	return false;
}
function hideDonateLayer() {
	$("#donateOutLayer").hide();
	$("#donateLayer").hide();
	$("#donateLayerV3").hide();
	return false;
}
function showDonateTipLayer() {
	$("#donateOutLayer").css("height", $(document).height() + "px");
	$("#donateOutLayer").show();
	$("#donateLayerTitle").html($("#dreamtitle_" + gIndex).html());
	var A = parseInt($(window).width()) - parseInt($("#donateLayer").width());
	$("#donateTipLayer").css("left", (A / 2) + "px");
	$('#donateTipLayer').css('top', $(document).scrollTop()+'px');
	$("#donateTipLayer").show();
	return false;
}
function hideDonateTipLayer() {
	$("#donateOutLayer").hide();
	$("#donateTipLayer").hide();
	return false;
}
function hideApplyDreamLayer(){
	$('#applyDreamIframe').hide();
	$('#applyDreamOutLayer').hide();
	return false;
}
function resizeApplyIframe(w,h){
	var A = parseInt($(window).width()) - w;
	A/=2;
	var B=($(window).height()-h)/2;
	$('#applyDreamIframe').attr('left',A+'px');
	$('#applyDreamIframe').attr('top',B+'px');
	$('#applyDreamIframe').attr('width',w+'px');
	$('#applyDreamIframe').attr('height',h+'px');
	return false;
}
function ReloginApplyDreamLayer(){
	hideApplyDreamLayer();
	ptloginopenfun();
	return false;
}
function RepeatApplyDreamLayer(){
	GDREAMSTATUS = 1;
	$("#applyDreamOutLayer").css("height", $(document).height() + "px");
	var A = parseInt($(window).width()) - 293;
	A/=2;
	var H=($(window).height()-167)/2;
	H=$(document).scrollTop()+H;
	$('#applyDreamIframe').css('width','293px').css('left',A+'px').css('top',H+'px').css('height','167px').attr('src','http://gongyi.qq.com/wgy/applyDreamRepeat.htm');
	$('#applyDreamIframe').show();
	$("#applyDreamOutLayer").show();
}
function showApplyDreamLayer() {
	if(gIsLogin!=1){
		ptloginopenfun();
		return false;
	}
	if(GDREAMSTATUS == 1) {RepeatApplyDreamLayer();return false;}

	$.getScript('//wgyapp.gongyi.qq.com/weimx/check/'+Math.random(),function(){
	if (typeof(rs) != "undefined" && rs != null)
	{
			if(rs==-1){
				ReloginApplyDreamLayer();
				return false;
			}
			else if(rs==-2){
				var W = 293;
				var H = 167;
				var L = parseInt($(window).width()) - W;
				L/=2;
				var T=($(window).height()-H)/2;
				T=$(document).scrollTop()+T;
				if(T<0) T=0;
				var src="http://gongyi.qq.com/wgy/applyDreamRepeat.htm";
			}
			else{
				var W = 500;
				var H = 589;
				var L = parseInt($(window).width()) - W;
				L/=2;
				var T=($(window).height()-H)/2;
				T=$(document).scrollTop()+T;
				if(T<0) T=0;
				var src="http://gongyi.qq.com/wgy/applyDream.v2.htm";
			}
			$("#applyDreamOutLayer").css("height", $(document).height() + "px");
	
			if(typeof(APPLYIFRAME)=='undefined'||APPLYIFRAME!=true){
				$("<iframe src='"+src+"' width='"+W+"px' height='"+H+"px' scrolling='no' frameborder=0 name='applyDreamIframe' id='applyDreamIframe' style='z-index:25;position:absolute;top:"+T+"px;left:"+L+"px;'></iframe>").appendTo('body');
				APPLYIFRAME=true;
			}else{
				$('#applyDreamIframe').css('width',W+'px').css('left',L+'px').css('top',T+'px').css('height',H+'px').attr('src',src);
			}
			$('#applyDreamIframe').show();
			$("#applyDreamOutLayer").show();
		}
	});

	return false;
}
function doDonate() {
	$("#donateLayerTip").text("正在提交，请等待...").show();
	var F = $("input[name='donateLayerType']:checked").val();
	var J = $("#donateLayerMoney").val();
	var I = encodeURIComponent($("#donateLayerDesc").val());
	if (gOrganizer <= 0 || gDreamID <= 0) {
		$("#donateLayerTip").text("请选择捐赠的微爱梦想").show();
		return false
	}
	var G = "#sm_" + gDreamID;
	var Z = "#om_" + gDreamID;
	var R = "#rand_" +gDreamID;
	
	var H = "//wgyapp.gongyi.qq.com/donate/add?" + Math.random() + "&uin=" + gOrganizer + "&dreamid=" + gDreamID + "&donateType=" + F + "&donateMoney=" + J + "&donateDesc=" + I + "&t=" + R;
	$.getScript(H,
	function() {
		if (typeof(rsObj) != "undefined" && rsObj != null) {
			if (rsObj.code == 0 || rsObj.code == 1) {
				if (rsObj.code == 1) {
					$(G).html(parseInt($(G).html()) + 1);
				}
				$(Z).html(parseInt($(Z).html())+rsObj.money);
				$("#p_donate").html(parseInt($("#p_donate").html()) + rsObj.money);
				$("#p_balance").html(parseInt($("#p_balance").html()) - rsObj.money);
				$('#donateTipTitle').html($('#dreamtitle_'+gDreamID).html());
				$('#donateTipMoney').text(rsObj.money);
				disableDonateLayerMoney();
				hideDonateLayer();
				showDonateTipLayer();
				if($('#sharetoweibo').attr('checked')&&I.length>=1)
				{
					var url='//wgyapp.gongyi.qq.com/wgy/broadcastWeibo?desc='+I+'&r='+Math.random();
					$.getScript(url,function(){})
				}
				flushAccount();
			} else {
				if (rsObj.code == -1) {
					ptloginopenfun()
				} else {
					$("#donateLayerTip").html(rsObj.msg).show();
					if (rsObj.code == -7) {
						enableDonateLayerMoney();
						$("#donateLayerMoney").val(rsObj.money)
					}
				}
			}
			rsObj = null;
			return false
		}
		showTip3Layer('温馨提示','<div>'+ERROR_NET_EX+'</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
		return false;
	})
}
function wdebug(msg){
	if(window.console && window.console.log){
		window.console.log(msg);
	}
}
function showDesc(){
	$('#detail').show();
}
function hideDesc(){
	$('#detail').hide();
}
function autoScroll(){
	if(INIT==true)return false;
	var scrollPos;
	var ver=jsStatByKid.getBrowserInfo();
	var browser=parseInt(ver[0]);
	if(browser==4||browser==1||browser==6||browser==3) {
		scrollPos = document.documentElement;
	}
	else{
		scrollPos = document.body;
	}
	var top = $('#dreamlist').offset().top;
	$(scrollPos).animate({ scrollTop : top }, "slow");
}

function changeDreamList(page){
	showDreamList(page);
	autoScroll();
}
function showDreamList(page) {
	if (typeof(smalldreamlist) == "undefined") {
		$("#dreamlist").html("<li></li>");
		return false;
	} else {
		var A = smalldreamlist.length;
		var B = "";
		$("#dreamlist").empty();
		var total=Math.ceil(A/NUMPERPAGE);
		if(page<0||page>total)
			page=gDreamPage;
		page=page<0?0:page;
		page=page>total?total:page;
		var start = page*NUMPERPAGE;
		var end = start+NUMPERPAGE;
		end=end>A?A:end;
		for (; start < end; start++) {
			var D = smalldreamlist[start].id;
			var n_m=parseInt(smalldreamlist[start].n_m/100);
			var o_m=parseInt(smalldreamlist[start].o_m/100);
			var rand = parseInt(Math.random()*(9999999-1+1) + 1); 
			if(n_m > o_m)
				B = '<li><input type="hidden" id="rand_"'+D+'" value="'+rand+'" /><input type="hidden" id="dream_uin_' + D + '" value="' + smalldreamlist[start].uin + '" /><input type="hidden" id="dream_id_' + D + '" value="' + D + '" /><div class="orgPic"><a href="'+smalldreamlist[start].url+'" hidefocus target="_blank"><img src="' + smalldreamlist[start].icon + '" /><div style="width:50px;height:21px;position:absolute;z-index;10;left:139px;top:98px;"></a></div></div><div class="one_r"><h3 id="dreamtitle_' + D + '">' + smalldreamlist[start].title + '</h3><p class="p1"><b>简介：</b>' + smalldreamlist[start].desc + '&nbsp;&nbsp;<a href="' + smalldreamlist[start].url + '" hidefocus target="_blank">详情>></a></p><a href="javascript:void(donate(' + D + '))" hidefocus title="捐赠微爱基金" class="wjj_btn"></a><span class="zhichi">本月<span style="font-weight:600;font-size:15px" id="sm_' + D + '">' + smalldreamlist[start].s_m + '</span>人支持，总受捐赠微爱基金<span id="om_' + D + '" style="font-weight:600;font-size:15px;">'+o_m+'</span>元</span><div class="wb_ly"></div></div></li>';
			else
				B = '<li><input type="hidden" id="dream_uin_' + D + '" value="' + smalldreamlist[start].uin + '" /><input type="hidden" id="dream_id_' + D + '" value="' + D + '" /><div class="orgPic"><a href="'+smalldreamlist[start].url+'" hidefocus target="_blank"><img src="' + smalldreamlist[start].icon + '"/><div style="width:50px;height:21px;position:absolute;z-index;10;left:139px;top:98px;"></a></div></div><div class="one_r"><h3 id="dreamtitle_' + D + '">' + smalldreamlist[start].title + '</h3><p class="p1"><b>简介：</b>' + smalldreamlist[start].desc + '&nbsp;&nbsp;<a href="' + smalldreamlist[start].url + '" hidefocus target="_blank">详情>></a></p><a href="javascript:void(0)" title="捐赠微爱基金" hidefocus class="wjj_btn_gray"></a><span class="zhichi">本月<span style="font-weight:600;font-size:15px" id="sm_' + D + '">' + smalldreamlist[start].s_m + '</span>人支持，总受捐赠微爱基金<span id="om_' +D+ '" style="font-weight:600;font-size:15px;">'+o_m+'</span>元</span><div class="wb_ly"></div></div></li>';
			$("#dreamlist").append(B);
		}
		if(INIT==true){
			INIT=false;
			$.getScript("//wgyapp.gongyi.qq.com/wgy/pageLoaded?s=10&r=" + Math.random(),function(){});
		}
		if(total<=1)return false;
		var prevpage=page-1;
		prevpage=prevpage<0?0:prevpage;
		var nextpage=page+1;
		nextpage=nextpage>(total-1)?(total-1):nextpage;
		var pageStr="<div class='pager'><div class='stat'>"+(page+1)+"/"+total+"</div><ul><li class='label'><a href='javascript:void(changeDreamList("+prevpage+"));' hidefocus>上一页</a></li>";
		for(i=1;i<=total;i++){
			if(page==i-1){
				cur='cur';
				onclickstr='';
			}
			else{
				cur='';
				onclickstr='changeDreamList('+(i-1)+')';
			}
			pageStr+="<li class='"+cur+"'><a href='javascript:void("+onclickstr+");' hidefocus>"+i+"</a></li>";
			//pageStr+="<li class='"+cur+"'><a href='javascript:;'>"+i+"</a></li>";
		}
		pageStr+="<li class='label'><a href='javascript:void(changeDreamList("+nextpage+"));' hidefocus>下一页</a></li></ul></div>"+'<a class="link_xx gotoDreamList" href="javascript:autoScroll2Blank(\'.wgy_dream\');" hidefocus id="gotoDreamList2" v="2" style="float:right;margin-top:-22px;">返回本期微爱梦想&gt;&gt;</a>';
		$('#dreamlist').append(pageStr);
		bindDreamLinkEvent();
		gDreamPage=page;
		return false;
	}
}
function showTopList() {
	if (typeof(toplist) == "undefined") {
		$("#toplist").html("<li></li>")
	} else {
		var A = toplist.length;
		$("#toplist").empty();
		var B = "";
		for (var C = 0; C < A; C++) {
			B = '<li><img src="' + toplist[C].head50 + '" width="50" height="50" /><div class="phb_r"><p style="width:100px;overflow:hidden;height:27px;">' + toplist[C].nickname + '</p><p class="cor1">捐赠微爱基金：<b class="cor3">' + toplist[C].donate_money + "</b>元</p></div></li>";
			$("#toplist").append(B)
		}
	}
}
function donate(A) {
	if (gIsLogin) {
		showDonateLayer(A)
	} else {
		ptloginopenfun()
	}
	return false
}
function gotoDonate(){
	hideTipLayer();
	changeDreamList(gDreamPage);
	return false;
}
function obtainWjj(flag) {
	hideTipLayer();
	hideTip3Layer();
	$.getScript("//wgyapp.gongyi.qq.com/income/get?" + Math.random(),
	function() {
		if (typeof(rsObj) != "undefined" && rsObj != null) {
			if (rsObj.code == 0) {
				flushAccount();
				if(flag)
					showTipLayer('捐赠微爱基金',rsObj.msg+'<a href="http://gongyi.qq.com/wgy#dream_anchor" hidefocus onclick="hideTipLayer()" target="_blank" class="donatewjj"></a>');
				else
					showTipLayer('捐赠微爱基金',rsObj.msg+'<a href="javascript:void(gotoDonate());" hidefocus class="donatewjj"></a>');
			} else if(rsObj.code == -1)  {
				ptloginopenfun()
			}
			else if(rsObj.code == -2)
			{
				showTip3Layer('温馨提示',rsObj.msg+'<a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
			}
			else
				showTip3Layer('温馨提示','<div>'+ERROR_NET_EX+'</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
			rsObj = null;
			return false
		}
		else
			showTip3Layer('温馨提示','<div>'+ERROR_NET_EX+'</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
	})
}
function obtainWjj2() {
	hideTipLayer();
	hideTip3Layer();
	$.getScript("//wgyapp.gongyi.qq.com/income/get2?" + Math.random(),
	function() {
		if (typeof(rsObj) != "undefined" && rsObj!= null) {
			if(rsObj.code==-2){
				showTip3Layer('温馨提示','<div>'+rsObj.msg+'</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
				rsObj = null;
				return false;
			}else{
				showTipLayer('捐赠微爱基金','<div>'+rsObj.msg+'</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
				rsObj = null;
				return false;
			}
		}
		else
			showTip3Layer('温馨提示','<div>'+ERROR_NET_EX+'</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
			return false;
	})
}
function listen() {
	var A = [];
	$("input[name='recv_listen']:checked").each(function() {
		A.push($(this).val())
	});
	if (A.length < 1) {
		showTip3Layer('温馨提示','<div>请选择一个收听对象</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
	} else {
		$.getScript("//wgyapp.gongyi.qq.com/wgy/getinfo?" + Math.random(),
		function() {
			if (typeof(rsObj) != "undefined" && rsObj != null) {
				if (rsObj.code == 0) {
					var B = "u=";
					B += A.join(",");
					var D = "//npoapp.gongyi.qq.com/succor/weibo/listen/?"+B+"&callback=listenWeiboCallBack&varname=listenRs";
					jQuery.getScript(D,function(){
						if(listenRs==1){
							showTip3Layer('温馨提示','<div>请选择一个收听对象</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
						}
						else if(listenRs==2){
							ptloginopenfun();
						}
						else if(listenRs==0){
							showTip3Layer('温馨提示','<div>收听成功</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
						}
						else{
							showTip3Layer('温馨提示','<div>网络异常，请稍后重试</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
						}
					});
				} else if (rsObj.code == -1){
					ptloginopenfun()
				}
				else
					showTip3Layer('温馨提示','<div>'+ERROR_NET_EX+'</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
				rsObj = null;
				return false
			}
			showTip3Layer('温馨提示','<div>'+ERROR_NET_EX+'</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
		})
	}
	return false;
}
function listenWeiboCallBack(A) {
	if (A.result == 0) {
		showTip3Layer('恭喜您','<div>收听成功</div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
	} else {
		if (A.result == -2) {
			showTip3Layer('温馨提示','<div>您还没有开通微博</div><div><a href="http://t.qq.com" hidefocus target="_blank">马上开通微博</a></div><a href="javascript:void(hideTip3Layer());" hidefocus class="close_btn"></a>');
		}
	}
}
function changeWeiboTopic(F) {
	var A = "#weiboid" + F;
	var B = $(A).html();
	$('#listenspan').html(weiboTopic[F].text);
	$("#wb_title").html('<a target="_blank" href="' + weiboTopic[F].url + '" hidefocus>'+B+'</a>');
	$("#weibotitle li").removeClass("cur");
	$("#weibotitle li:eq(" + F + ")").addClass("cur");
	$("#weibotextarea").val(B + weiboTopic[F].desc+"了解更多：//gongyi.qq.com/wgy");
	$("#weibodesc").html(weiboTopic[F].desc + '<a target="_blank" href="' + weiboTopic[F].url + '" hidefocus>了解详情>></a>');
	orderWeiboTopicID=F;
	calcWeiboText();
	return false;
}
function formatNum(number)
{
	if (number.length<= 3)
	return (number == '' ? '0' : number);
	else
	{
	     var mod = number.length%3;
	     var output = (mod == 0 ? '' : (number.substring(0,mod)));
	     for (i=0 ; i< Math.floor(number.length/3) ; i++)
	     {
	       if ((mod ==0) && (i ==0))
	       output+= number.substring(mod+3*i,mod+3*i+3);
	       else
	       output+= ',' + number.substring(mod+3*i,mod+3*i+3);
	     }
	     return (output);
	}
}
function showPeopleNum() {
	if (typeof(weigy_weibo_total) == "undefined") {
		$("#total_num").html("<li>0</li>")
	} else {
		weigy_weibo_total=formatNum(String(weigy_weibo_total));
		weigy_weibo_total=weigy_weibo_total.split("");
		var A = weigy_weibo_total.length;
		var B = "";
		for (var C = 0; C < A; C++) {
			if(!isNaN(weigy_weibo_total[C]))
				B += "<li>" + String(weigy_weibo_total[C]) + "</li>";
		}
		$("#total_num").html(B)
	}
}
function showLoveList() {
	if (typeof(monthly_user_new) == "undefined") {
		$("#lovelist").html("<li></li>")
	} else {
		var A = monthly_user_new.length;
		var C = "";
		for (var D = 0; D < A; D++) {
			if (!monthly_user_new[D].memo) {
				var B = ""
			} else {
				var B = "<li>贴心祝福：" + $.Tjs_HtmlEncode(monthly_user_new[D].memo) + "</li>"
			}
			C += '<li class="whole"><a href="http://gongyi.qq.com/userinfo.htm?gyuin=' + monthly_user_new[D].uin + '" hidefocus class="s_tb"><img src="' + monthly_user_new[D].face + '" width="40" height="40"  onerror="this.src=\'http://mat1.qq.com/view/10years/face/1.gif\';" /></a><ul class="gudingk"><li>' + $.Tjs_HtmlEncode(monthly_user_new[D].nickname) + "</li><li>爱心积分：" + monthly_user_new[D].power + "</li>" + B + "</ul></li>"
		}
		$("#lovelist").html(C);
		$("#ParentTables").scrollZone({
			isMarquee: true,
			isEqual: false,
			scrollDelay: 20,
			direction: "up"
		})
	}
}
function initIframeAccount(){
	$.getScript("//wgyapp.gongyi.qq.com/account/get?" + Math.random(),
	function() {
		if (typeof(accountObj) != "undefined" && accountObj != null) {
			if (accountObj.code == 1) {
				gIsLogin = 1;
				gUin = accountObj.info.uin;
				accountObj = null;
				return false
			}
		}
		gIsLogin = 0;
		gUin = 0
	})
}
function initAccount() {
	$.getScript("//wgyapp.gongyi.qq.com/account/get?do=init&r=" + Math.random(),
	function() {
		if (typeof(accountObj) != "undefined" && accountObj != null) {
			if (accountObj.code == 1) {
				var nickname=fliterText(accountObj.info.nickname);
				$("#LoveplanLoingHeardObjectname").html('<span style="float:left">欢迎您，'+nickname + "&nbsp;&nbsp;成长阶段：</span><span class='gongyi_level "+(global_userinfoobject.love_step>0?'open':'close')+"'><i class='lv'></i><em class='num"+(String(global_userinfoobject.love_step))+"'></em></span>&nbsp;&nbsp;<a href='http://gongyi.qq.com/mygongyi.htm' hidefocus>进入我的个人中心</a>&nbsp;&nbsp;<a href='javascript:ptlogoutopenfun();' hidefocus>[退出]</a></span>");
				var str='<div class="login_on"> <div class="user_info"> <a><img src="' + accountObj.info.headimg + '" /></a> <h3 style="width:130px;height:24px;overflow:hidden;float:left;" class="STYLE2">'+nickname+'</h3> <span class="sp2">成长阶段：</span> <span class="gongyi_level '+(global_userinfoobject.love_step>0?'open':'close')+'"><i class="lv"></i><em class="num'+(String(global_userinfoobject.love_step))+'"></em></span> </div><div style="border-bottom:1px solid #dbdbdb;width:90%;height:2px;overflow:hidden;margin:0 auto"></div><p style="margin-top:22px">已支持微爱项目数：<b class="cor2" id="p_donate_project">' + accountObj.info.donate_project + '</b><p style="margin-top:0px">可以使用的公益豆：<b class="cor2">'+accountObj.gyd+'</b></p><p style="margin-top:0px"><a href="http://gongyi.qq.com/helper/gyd.htm" target="_blank">什么是公益豆？</a></p><div style="float:right;border:1px solid #e3e3e3;width:36px;height:22px;margin-top:-62px;margin-right:5% !important;margin-right:2.5%;background-color:#e3e3e3;color:#296326;padding:0;text-indent:0;text-align:center"><a href="javascript:void(flushAccount());" hidefocus>刷新</a></div>';
				if(accountObj.info.money_remain <= 0)
					var money_remain = 0;
				else
					var money_remain = accountObj.info.money_remain;
				
				str = str+'</div>';
				$("#login_main_panel .panel").html(str);
				gIsLogin = 1;
				gUin = accountObj.info.uin;
				accountObj = null;
				initDonateLayer();
				return false
			}
		}
		$("#LoveplanLoingHeardObjectname").html('您好，[<a href="javascript:ptloginopenfun();void(0);" hidefocus>请登录</a>]<a href="http://gongyi.qq.com/" hidefocus>公益网首页</a><a href="http://gongyi.qq.com/loveplan/" hidefocus>月捐计划</a><a href="http://gongyi.qq.com/npo" hidefocus>公益生活</a><a href="http://www.qq.com/" hidefocus>腾讯首页</a><a href="http://support.qq.com/beta2/simple/index.html?fid=358" hidefocus>反馈意见</a>');
		$("#login_main_panel .panel").html('<div class="normal"> <a href="javascript:ptloginopenfun();" hidefocus class="lqjijin_btn"></a> <p class="p2">请先<strong><a href="javascript:ptloginopenfun();" hidefocus>登录</a></strong>，登录后您可以查看</p><ul style="width:230px;overflow:hidden;"><li>您支持的微爱梦想数量</li></ul></div>');
		gIsLogin = 0;
		gUin = 0
	})
}
function flushAccount(){
	if(gIsLogin==1){
		$.getScript("http://wgyapp.gongyi.qq.com/account/get?do=flush&r=" + Math.random(),
		function() {
			if (typeof(accountObj) != "undefined" && accountObj != null) {
				if (accountObj.code == 1) {
					$('#p_donate_money').html(String(accountObj.info.money_donate)+"元");
					$('#p_donate_project').html(String(accountObj.info.donate_project));
					if(isYjAct)
					{
						if(accountObj.yuejuan_info != null) $('#p_balance_money').html(String(accountObj.info.money_remain)+"元");
					}
					gIsLogin = 1;
					gUin = accountObj.info.uin;
					accountObj = null;
					return false
				}
			}
			$("#LoveplanLoingHeardObjectname").html('您好，[<a href="javascript:ptloginopenfun();void(0);" hidefocus>请登录</a>]<a href="//gongyi.qq.com/" hidefocus>公益网首页</a><a href="//gongyi.qq.com/loveplan/" hidefocus>月捐计划</a><a href="//gongyi.qq.com/npo" hidefocus>公益生活</a><a href="http://www.qq.com/" hidefocus>腾讯首页</a><a href="http://support.qq.com/beta2/simple/index.html?fid=358" hidefocus>反馈意见</a>');
			$("#login_main_panel .panel").html('<div class="normal"> <a href="javascript:ptloginopenfun();" hidefocus class="lqjijin_btn"></a> <p class="p2">请先<strong><a href="javascript:ptloginopenfun();" hidefocus>登录</a></strong>，登录后您可以查看</p><ul style="width:230px;overflow:hidden;"><li>您已捐赠多少微爱基金</li><li>您捐赠的微爱梦想数量</li></ul></div>');
			gIsLogin = 0;
			gUin = 0 ;
		})
	}
}
function flushTotalMoney() {
	$.getScript("//gongyi.qq.com/js/wgy/smallmoney.json.js?" + Math.random(),
	function() {
		if (typeof(smallmoney) != "undefined" && smallmoney != null) {
			var A = smallmoney.length;
			var B = "";
			for (var C = 0; C < A; C++) {
				if(isNaN(smallmoney[C])){
					B += "<li style='background:none;width:15px'>" + String(smallmoney[C]) + "</li>";
					break;
				}
				else
					B += "<li>" + String(smallmoney[C]) + "</li>";
			}
			C++;
			for(;C<A;C++){
				B += "<li class='total_xiaoshu' style='padding-top:2px;'>" + String(smallmoney[C]) + "</li>";
			}
			$("#total_money").html(B);
			gTotalMoney = smallmoney[0];
			smallmoney = null
		} else {
			$("#total_money").html("<li>0</li>")
		}
	})
}

function fliterText(text)
{
	var temp = text;
	temp = temp.replace(/\'/gim,"");
	temp = temp.replace(/\"/gim,"");
	temp = temp.replace(/<script[^>]*?>(.*?)<\/script>/gim,"$1");
	temp = temp.replace(/<(p|p>)/gi, "$1");
	temp = temp.replace(/<(\/p)/gi,   "$1");
	temp = temp.replace(/<(sup>)/gi, "$1");
	temp = temp.replace(/<(\/sup)/gi, "$1");
	temp = temp.replace(/<(sub)/gi,   "$1");
	temp = temp.replace(/<(\/sub)/gi, "$1");
	temp = temp.replace(/<(table)/gi, "$1");
	temp = temp.replace(/<(\/table)/gi, "$1");
	temp = temp.replace(/<(tr|tr>)/gi, "$1");
	temp = temp.replace(/<(\/tr)/gi, "$1");
	temp = temp.replace(/<(td|td>)/gi, "$1");
	temp = temp.replace(/<(\/td)/gi, "$1"); 
	temp = temp.replace(/<(img)/gi, "$1");
	temp = temp.replace(/<(br)/gi,   "$1");
	temp = temp.replace(/([^>]*)>/gi,"$1");
	temp = temp.replace(/<[^>]*>/gi,"");
	temp = temp.replace(/\&nbsp;/gi,"");
	temp = temp.replace(/(<tr)[^>]*(>)/gi,"$1$2");
	temp = temp.replace(/(<td)[^>]*(>)/gi,"$1$2");
	temp = temp.replace(/(<td)[^>]*/gi,"$1");
	temp = temp.replace(/(<[^>]*)[^>]*([^>]*>)/gi,"$1$2");
	temp = temp.replace(/[^>]*(>)/gi,"$1$2");
	temp = temp.replace(/<p[^>]*>/gi,"<p>");
	temp = temp.replace(/(<img)[^>]*(>)/gi,"$1 src=\"\""+"$2");
	return temp;
}

$.fn.numeral = function() {
	$(this).css("ime-mode", "disabled");
	this.bind("keypress",function(e) {
		if (!$.browser.mozilla) {  
            if (e.keyCode && (e.keyCode < 48 || e.keyCode > 57)) {
                e.preventDefault();  
            }  
        } else {  
            if (e.charCode && (e.charCode < 48 || e.charCode > 57)) {
                e.preventDefault();  
            }  
        }  
	});
	this.bind("blur", function() {
	   if (isNaN(this.value)) {
			this.value = "";
		}
	});
	this.bind("paste", function() {
		var s = clipboardData.getData('text');
		if (!/\D/.test(s));
		value = s.replace(/^0*/, '');
		return false;
	});
	this.bind("dragenter", function() {
		return false;
	});
	this.bind("keyup", function() {
	if (/(^0+)/.test(this.value)) {
		this.value = this.value.replace(/^0*/, '');
		}
	});
};

Array.prototype.swap = function(i, j) 
{ 
	var temp = this[i]; 
	this[i] = this[j]; 
	this[j] = temp; 
} 

Array.prototype.bubbleSort = function() 
{ 
	for (var i = this.length - 1; i > 0; --i) 
	{ 
		for (var j = 0; j < i; ++j) 
		{ 
			if (this[j] > this[j + 1]) this.swap(j, j + 1); 
		} 
	} 
} 

Array.prototype.selectionSort = function() 
{ 
	for (var i = 0; i < this.length; ++i) 
	{ 
		var index = i; 
		for (var j = i + 1; j < this.length; ++j) 
		{ 
			if (this[j] < this[index]) index = j; 
		} 
		this.swap(i, index); 
	} 
} 

Array.prototype.insertionSort = function() 
{ 
	for (var i = 1; i < this.length; ++i) 
	{ 
		var j = i, value = this[i]; 
		while (j > 0 && this[j - 1] > value) 
		{ 
			this[j] = this[j - 1]; 
			--j; 
		} 
		this[j] = value; 
	} 
} 

Array.prototype.shellSort = function() 
{ 
	for (var step = this.length >> 1; step > 0; step >>= 1) 
	{ 
		for (var i = 0; i < step; ++i) 
		{ 
			for (var j = i + step; j < this.length; j += step) 
			{ 
				var k = j, value = this[j]; 
				while (k >= step && this[k - step] > value) 
				{ 
					this[k] = this[k - step]; 
					k -= step; 
				} 
				this[k] = value; 
			} 
		} 
	} 
} 

Array.prototype.quickSort = function(s, e) 
{ 
	if (s == null) s = 0; 
	if (e == null) e = this.length - 1; 
	if (s >= e) return; 
		this.swap((s + e) >> 1, e); 
	var index = s - 1; 
	for (var i = s; i <= e; ++i) 
	{ 
		if (this[i] <= this[e]) this.swap(i, ++index); 
	} 
	this.quickSort(s, index - 1); 
	this.quickSort(index + 1, e); 
} 

Array.prototype.stackQuickSort = function() 
{ 
	var stack = [0, this.length - 1]; 
	while (stack.length > 0) 
	{ 
		var e = stack.pop(), s = stack.pop(); 
		if (s >= e) continue; 
		this.swap((s + e) >> 1, e); 
		var index = s - 1; 
		for (var i = s; i <= e; ++i) 
		{ 
			if (this[i] <= this[e]) this.swap(i, ++index); 
		} 
		stack.push(s, index - 1, index + 1, e); 
	} 
} 

Array.prototype.mergeSort = function(s, e, b) 
{ 
	if (s == null) s = 0; 
	if (e == null) e = this.length - 1; 
	if (b == null) b = new Array(this.length); 
	if (s >= e) return; 
	var m = (s + e) >> 1; 
	this.mergeSort(s, m, b); 
	this.mergeSort(m + 1, e, b); 
	for (var i = s, j = s, k = m + 1; i <= e; ++i) 
	{ 
		b[i] = this[(k > e || j <= m && this[j] < this[k]) ? j++ : k++]; 
	} 
	for (var i = s; i <= e; ++i) this[i] = b[i]; 
} 

Array.prototype.heapSort = function() 
{ 
	for (var i = 1; i < this.length; ++i) 
	{ 
		for (var j = i, k = (j - 1) >> 1; k >= 0; j = k, k = (k - 1) >> 1) 
		{ 
			if (this[k] >= this[j]) break; 
			this.swap(j, k); 
		} 
	} 
	for (var i = this.length - 1; i > 0; --i) 
	{ 
		this.swap(0, i); 
		for (var j = 0, k = (j + 1) << 1; k <= i; j = k, k = (k + 1) << 1) 
		{ 
			if (k == i || this[k] < this[k - 1]) --k; 
			if (this[k] <= this[j]) break; 
			this.swap(j, k); 
		} 
	} 
} 

var site_url = window.location.href.toLowerCase();

$(function() {
	$("#check_all_listen").bind("click",
	function() {
		$("input[name='recv_listen']").attr("checked", $("#check_all_listen").attr("checked"))
	});

	$("input[name='recv_listen']").bind("click",
		function(){
			if($("input[name='recv_listen']:checked").length==9){
				$("#check_all_listen").attr("checked",true);
			}
			else{
				$("#check_all_listen").removeAttr("checked");
			}
	});

	$('#donateLayerMoney').numeral();
});/*  |xGv00|0748470da53844f68e82f9ddcac0a854 */