function loadProject(typeid,items){
	try
	{
		var query_str = '';
/*		if(typeof(typeid) != 'undefined' && typeid>0)
		{
			query_str = '&s_tid='+typeid;
		}else{
			typeid = 0;
		}
*/
		//var url = "http://npoapp.gongyi.qq.com/succor/project_v1/show_list?isajax=1&ishome=1"+query_str+"";
		//var url = "http://gongyi.qq.com/js/succor/pclist/succor.p.home.list.12."+typeid+".js";
		var url = "//gongyi.qq.com/js/succor/pclist/succor.p.home.v3.js";
		$.ajax({
			'type':'GET',
			'url':url,
			'dataType':'jsonp',
			'jsonp':'jsoncallback',
			'jsonpCallback':'_Callback',
			'data':'',
			'success':function(data){
				if(data.status==1)
				{
					fillProjectCount(data.info.pCount);//列表填充
					fillProject_v2(data.info.pCateList);//列表填充
				}else if(data.status==0){
					alert(data.info);
				}
			}
		});
	}catch(e){}
}

/*
 * */
function initProjectList()
{
	//loadProject(0);
	$("p#cateNavigate a").each(function(i){
		$(this).click(function(){
			var cateId = $(this).attr('cid');
			$("p#cateNavigate a").removeClass('current');
			$(this).addClass('current');
			var isLoaded = $('ul#projectList_'+i).attr('isLoaded');
			if(isLoaded==0)
			{
				loadProject(cateId,i);
				$('ul#projectList_'+i).attr('isLoaded',1);
			}
			$('ul.tjzt_ul').hide();
			$('ul#projectList_'+i).show();
		});
	});
}

//显示捐助模块
function showDonateDiv(title,fundid,projectid){
	GyLib.Donate.show(1,title,fundid,projectid,1,1);
}

function fillProjectCount(data)
{
	if(typeof(data.s1) != 'undefined') $("#h_donate_s1").html(data.s1);
	if(typeof(data.s2) != 'undefined') $("#h_donate_s2").html(data.s2);
	if(typeof(data.s3) != 'undefined') $("#h_donate_s3").html(data.s3);
}

function fillProject_v2(project){
	if(project==false) return false;
	var _obj = $('#home_list_wrap');
	var _cateLen = project.length;
	var _cHtml = "";
	for(var i=0;i<_cateLen;i++)
	{
		var s_status = '';
		if(project[i].id == 75)
			s_status = '&s_status=0';
		_cHtml += '<div class="home-list-wrap">\
		<div class="home-list-title"><h4>'+project[i].name+'</h4><a class="more-1" href="http://gongyi.qq.com/succor/project_list_v2.htm?s_tid='+project[i].id+s_status+'">更多</a><div class="clearFix"></div></div>';
		var _list = project[i].list,_pLen = project[i].list.length;
		_cHtml += '<ul class="home-list-ul">';
		for(var j=0;j<_pLen;j++)
		{
			if (j%4 == 0 && j>0)
			{
				_cHtml += '<div class="clearFix" style="height:40px;"></div>';
			}
			if (j%4 == 0) {
				var _durl = 'http://gongyi.qq.com/succor/detail.htm?id='+_list[j].id;
				var _dimg = _list[j].img+'/200';
				if(typeof(_list[j].durl) != 'undefined' && _list[j].durl != "")
				{
					_durl = _list[j].durl;
					_dimg = _list[j].img;
				}
				_cHtml += '<li class="list-recommend"><div class="h-p-recommend-imgs"><a href="'+_durl+'" target="_blank"><img src="'+_dimg+'" width="200" height="200" /></a><div class="h-p-text"><p title="'+_list[j].title+'">'+_list[j].title+'</p></div></div></li>';
			}else{
				_cHtml += '<li><div class="h-p-imgs"><a href="http://gongyi.qq.com/succor/detail.htm?id='+_list[j].id+'" target="_blank"><img src="'+_list[j].img+'/120" width="120" height="120" /></a><div class="h-p-text"><p title="'+_list[j].title+'">'+_list[j].title+'</p></div></div>';
				var needMoney = _list[j].needMoney/100;
				var donatedMoney = _list[j].obtainMoney;
				if(needMoney>0 && _list[j].status==1)
				{
					var _haveNeed = parseFloat(needMoney-donatedMoney);
					_haveNeed = Math.round(_haveNeed*100)/100
					_cHtml += '<p class="h-p-t" title="目标：'+needMoney+'元\r\n已筹：'+(donatedMoney||0)+'元">尚缺：<span class="h-p-t1-span">'+_haveNeed+'</span>元</p>';
				}else if(_list[j].status==3){
					_cHtml += '<p class="h-p-t">共筹款：<span class="h-p-t1-span">'+(donatedMoney||0)+'</span>元</p>';
				}else{
					_cHtml += '<p class="h-p-t">已筹：<span class="h-p-t1-span">'+(donatedMoney||0)+'</span>元</p>';
				}
				_cHtml += '<p class="h-p-t">捐款人数：<span class="h-p-t2-span">'+(_list[j].donateNum||0)+'</span>人</p>';
				if(_list[j].status==1)
					_cHtml += '<div class="h-p-btn"><a href="javascript:showDonateDiv(\''+_list[j].title+'\','+_list[j].fundID+','+_list[j].id+');" class="btn-donate-2">我要捐款</a></div>';
				else if(_list[j].status==3)
					_cHtml += '<div class="h-p-btn"><a href="http://gongyi.qq.com/succor/detail.htm?id='+_list[j].id+'" target="_blank" class="btn-donate-2">查看结项报告</a></div>';
			_cHtml += '</li>';
			}
		}
		_cHtml += '<div class="clearFix"></div></ul><div class="clearFix"></div>';
		_cHtml += '</div>';	
	}
	_obj.append(_cHtml);
}

/*项目填充*/
function fillProject(project,sid){
	var _obj = $('#projectList_'+sid);
	if(project!=false){
		var _num = 12;
		var _len = project.length;
		if(_len < _num)
			_num = _len;
		if(_num>0){
			var _projectObj = '';
			for(i=0;i<_num;i++){
				//project[i].base = project[i];
				var _li_m = (i+1)%3==0?'':'li_m';
				var needMoney = project[i].needMoney/100;
				var _li_h = i>2?' li_h':'';
				_projectObj += '<li class="tjzt_li '+_li_m+_li_h+'"><div class="tjzt_img"><a href="http://gongyi.qq.com/succor/detail.htm?id='+project[i].id+'" target="_blank"><img src="'+project[i].img+'/200" width="200" height="200" border="0"/></a></div><a class="tjzt_sp1" target="_blank" href="http://gongyi.qq.com/succor/detail.htm?id='+project[i].id+'">'+project[i].title+'</a>';
				//if(needMoney>0) _projectObj += '目标：<span class="hot_sp1">'+needMoney+'</span>元 &nbsp;';
				//if(needMoney>=100000) 
				//	donatedMoney = parseInt(project[i].obtainMoney);
				//else
					donatedMoney = project[i].obtainMoney;
				if(needMoney>0)
				{
					var _haveNeed = parseFloat(needMoney-donatedMoney);
					_haveNeed = Math.round(_haveNeed*100)/100
					_projectObj += '<p class="tjzt_sp2" title="目标：'+needMoney+'元\r\n已筹：'+(donatedMoney||0)+'元"><span class="tjzt_sp3">尚缺：</span><span class="hot_sp1">'+_haveNeed+'</span>元</p>';
				}else{
					_projectObj += '<p class="tjzt_sp2"><span class="tjzt_sp3">已筹：</span><span class="hot_sp1">'+(donatedMoney||0)+'</span>元</p>';
				}
					
				_projectObj += '<p class="tjzt_sp2">捐款人数：<span class="hot_sp2">'+(project[i].donateNum||0)+'</span>人</p><p class="tjzt_sp4"><a class="tjzt_sp5 zhufuTipsBtns" id="zhufuTipsBtn" href="javascript:void(0);" pid="'+project[i].id+'" uin="'+project[i].exeOrganizerUin+'">'+(project[i].blessNum||0)+'</a>';
				if(project[i].status == 1) _projectObj += '<a class="wyjk_a" href="javascript:void(0);" onclick="showDonateDiv(\''+project[i].title+'\','+project[i].fundID+','+project[i].id+');">我要捐款</a>';
				 _projectObj += '</p></li>';
				//_obj.append(_projectObj);
			}
			_obj.html(_projectObj);			
		}
		_obj.find(".zhufuTipsBtns").each(function(i){
				$(this).click(function(){
					if(global_userinfoobject.nick.length <= 0)
					{
						$.cookie('zfHomeTips',$(this).attr('pid'));
						ptloginopenfun();
						return false;
					}
					var _oldObj = $(this).parent().find("div#zhufuWrap");
					if(typeof(_oldObj.css('display')) != 'undefined') 
					{
						if(_oldObj.css('display')=='none')
						{
							_oldObj.show();
							return;
						}else{
							_oldObj.hide();
							return;
						}
						return;
					}
					$("div#zhufuWrap").remove();
					var uin = $(this).attr('uin');
					var pid = $(this).attr('pid');
					//if(typeof(uin) != 'number' || typeof(pid) != 'number') return false;
					var htmlContent = '<div class="zhufuTips" id="zhufuWrap">\
								<div class="title">\
									<h3>请写下您的祝福</h3>\
									<a href="javascript:closeZhufuTips(0);" class="closets"></a>\
								</div>\
								<div class="textAreaWrap"><textarea class="textAreaWrap" id="zhufuTextarea"></textarea></div>\
								<p>您的祝福将同步到微博空间(140字以内，还能输入<em>140</em>个字)</p>\
								<div class="footmenu"><input type="button" value="发布祝福" class="btn_zhufu" id="send" title="发布祝福" /><div class="clearFix"></div></div><div class="clearFix"></div>\
							</div>';
					$(this).parent().append(htmlContent);
					$("div#zhufuWrap").succor_weibo({type:4,pid:pid,buin:uin,callback:function(){$("#zhufuWrap").hide()}});
					
		
				});
			});
	}
	else{
		_obj.html('暂时没有项目');
	}
	_obj.attr('isLoaded',1);
}

/*关闭祝福Tips*/
function closeZhufuTips()
{
	$("div#zhufuWrap").hide();
}

function doHelp(){
	var _url = 'http://npoapp.gongyi.qq.com/succor/project_apply/apply';
	if(global_userinfoobject.idcode<1){//普通用户
		//从微薄接口来去是否是认证微薄用户
		var url = "http://npoapp.gongyi.qq.com/succor/volunteer/isWeiboVip?isajax=1&jsoncallback=?";
		$.getJSON(url,function(data){
			if(data.status==1){
				if(data.info.identify>=1){//已经是组织用户了
					//window.open(_url);
					window.location =_url;
					return true;
				}
				else{//不是则显示注册认证的页面
					showTips1('1.您是腾讯微博认证用户 (<a href="http://t.qq.com/certification" target="_blank" class="c-a">点击申请</a>)；<br />2.您是公募基金会，并且已经在腾讯公益平台注册；<br />3.您已经挂靠在某个公募基金会之下，并已经将资料提交到腾讯公益，且已经审核通过；<br />请确认取得如上任意一种身份信息后，再提交求助信息。',3,{"title":'发布乐捐求助信息，需符合如下条件（任意一种）：'});
					return true;
				}
			}
		});
	}
	else{//公募组织或者是志愿者
		window.location = _url;
		//window.open(_url);
		return true;
	}
}

function iWantHelp(){
	if(global_userinfoobject.code != 0){  //未登陆态
		var _cookie = new GyLib.Cookie();
		var _cookie_name = "iWantHelp";
		_cookie_obj.set(_cookie_name,1);
		ptloginopenfun();
		return false;
	}
	else{//已经登录，判断用户的状态
		doHelp();
	}
}

function autoDoHelp(){
	var _cookie = new GyLib.Cookie();
	var _cookie_name = "iWantHelp";
	var _flag = _cookie_obj.get(_cookie_name);
	if(_flag){
		_cookie_obj.clear(_cookie_name);
		doHelp();
	}
}

function getBindNum(){
	var _url = 'http://npoapp.gongyi.qq.com/userinfo/getBindNum?isajax=1&jsoncallback=?';
	$.getJSON(_url,function(data){
		var _num = parseInt(data.bindnum);
		$('#authedNum').html(_num);
	});
}

function getPublishNum(){
	var _url = 'http://npoapp.gongyi.qq.com/userinfo/getPublishedProjectNum?isajax=1&jsoncallback=?';
	$.getJSON(_url,function(data){
		var _num = parseInt(data.publishnum);
		$('#pulishedNum').html(_num);
	});
}

function getStat(){
	var _url = 'http://npoapp.gongyi.qq.com/userinfo/getStatData?isajax=1&jsoncallback=?';
	$.getJSON(_url,function(data){
		var _publishnum  = 0;
		if(data.publishnum!=false)
			_publishnum = parseInt(data.publishnum);
		$('#pulishedNum').html(data.publishnum);
		
		var _bindnum  = 0;
		if(data.bindnum!=false)
			_bindnum = parseInt(data.bindnum);
		$('#authedNum').html(data.bindnum);
		
		var _unauthnum  = 0;
		if(data.unauthnum!=false)
			_unauthnum= parseInt(data.unauthnum);
		$('#unauthedNum').html(_unauthnum);
	});
}

function showFlowTips(i){
	var _text = ['腾讯微博的认证用户可直接发起求助信息','志愿团成员对项目的真实性进行确认后，可以对项目真实性进行投票','救助项目经过志愿团核实为真实项目后，可有公募基金会认领，认领后才可上线并接受公众捐款','救助项目正式上线并接受公众捐款','募款完成后，由执行公益组织根据善款使用计划展开线下项目救助','项目完成后，由执行组织提交结项报告并公示，通过用户认可后即可结项'];
	var _pos = ['10px','28px','46px','118px','136px','172px'];
	$('#flow-tips-text').html(_text[i]);
	$('#flow-tips').css('top',_pos[i]).show();
}

function hideFlowTips(){
	$('#flow-tips').hide();
}

function setAccountInfo(){
	if(global_userinfoobject.code != 0){  //未登陆态
		return true;
	}
	else{
		var _nickname = global_userinfoobject.nick.entities();  //QQ昵称
		$('#account_name').html(_nickname);
		var _headimg = global_userinfoobject.head;
		if(_headimg==false||_headimg=='false')
			_headimg = 'http://mat1.gtimg.com/gongyi/2011images/gongyi50.gif?/50';
		else
			_headimg += '/100';
		$('#accountImg').attr('src',_headimg);
		var _love_point = global_userinfoobject.love_point>0?global_userinfoobject.love_point:0;
		$('#mypoint').text(_love_point);
		$('#mydonateproject').html(projnumObj);
		var _level = '_gary';
		var _iconTitle = '';
		if(global_userinfoobject.love_step>0)
		{
			_level = global_userinfoobject.love_step;
			_iconTitle = '爱心企鹅'+global_userinfoobject.love_step+'级(行动中)';
		}else
		{
			_iconTitle = '爱心企鹅';
		}
		
		var _money = !isNaN(global_userinfoobject.donation_money)?global_userinfoobject.donation_money:0;
		_money = parseFloat(_money);
		_money += parseFloat(!isNaN(global_uinobject.total_Money_Num)?global_uinobject.total_Money_Num:0);
		_money = _money.toFixed(2);
		$('#mydonatemoney').html(_money);
		$('#accountInfoPlane').show();
		$('#loginPlane').hide();
		var _point_level = [108,2000,7000,20000,50000,100000,180000,300000];
		if(_level>=1)
			var _point_process = (_love_point/_point_level[_level]).toFixed(1);
		else
			var _point_process = 0;
		_point_process*=100;
		$('#my_update_process').css('width',_point_process+'%');
		if(global_userinfoobject.idcode>0){
			/*
			if(ISURGENCY){//紧急态
				$('.publishedNum').html(global_userinfoobject.publishnum);
				//$('#authedNum').html(global_userinfoobject.authednum);
				$('#unauthedNum').html(global_userinfoobject.unauthnum);
				getBindNum();
			}
			else{//非紧急态
				//getPublishNum();
				getStat();
			}
			*/
			getStat();
			if(global_userinfoobject.idcode==1){//公益组织
				//$('#orgSpan').show();
				$('#volunteerSpan').hide();
				$('#authedDiv').show();
				$("#vpublicprojectWrap").remove();
				$("#myVunbind").remove();
				$("#fpublicprojectWrap").remove();
				$('#lp2').hide();
				$('#lp3').show();
				$('#lp4').hide();
			}
			else{
				//$('#orgSpan').hide();
				$('#volunteerSpan').show();
				$('#authedDiv').hide();
				$("#fpublicprojectWrap").remove();
				$("#vPulishedNum").remove();
				$("#myVunbind").show();
				$(".vHideWrap").hide();
				$('#lp2').hide();
				$('#lp3').hide();
				$('#lp4').show();
			}
			$('#lp2').hide();
			$('#volunteer_icon').show().attr('title','腾讯公益志愿团成员');
			$('#projestStatPlane').show();
		}
		else{
			//$('#accountInfoPlane').css('height','229px');
			$('#projestStatPlane').remove();
			$('#fpublicprojectWrap').remove();
			$('#vpublicprojectWrap').remove();
			$(".myinfos2").css('border','none');
			$('#volunteer_icon').hide();
			$('#lp2').show();
			$('#lp3').hide();
			$('#lp4').hide();
		}
		
		
		$('#together_icon').hide();
		$('#my_icon').show();
		$('#mylevel').addClass('level'+_level).attr('title',_iconTitle).attr('zoom',1);
		autoDoHelp();
	}
}
//最新捐助列表
function toplist_v1(){
	
	try
	{
		var _url = '//gongyi.qq.com/js/succor/donateTopList/succor.home.toplist.js';
		$.ajax({
			'type':'GET',
			'url':_url,
			'dataType':'jsonp',
			'jsonp':'jsoncallback',
			'jsonpCallback':'_Callback_htoplist',
			'data':{isajax:1},
			'success':function(data){
				if(data.status==1)
				{
					fill_donate_toplist(data.info,5);			
				}else if(data.status==0){
					//alert(data.info);
				}
			}
			});
	}catch(e){}

}

var fill_donate_toplist = function(data,rows)
{
	try{
		if(typeof(data) == 'undefined' || !data)
		{
			$("#toplist").remove();
			return;
		}// return;
		if(typeof(rows) == 'undefined') rows=5;
		var content = face = lastClass = '';
		var cnt = data.length;
		var money=0;
		if(cnt<=0) return false;
		for(i=0;i<cnt;i++)
		{
			var money = data[i].Value/100;
			var _head = data[i].head50;
			if(typeof(_head)!='undefined'){
				if(_head.indexOf('p.qpic.cn')>0)
					var headImg = _head+'/60';
				else
					var headImg = _head+'/50';
			}
			else if(typeof(_head)!='undefined')
				var headImg = _head;
			var nickname = data[i].Nice2;
			nickname = nickname.replace('"','');
			nickname = nickname.replace("'",'');
			if(!nickname)
				nickname = '匿名';
			if(i==rows-1)
				lastClass='last';
			content += '<li class="'+lastClass+'"><img src="'+headImg+'" width="50" /><h5>'+nickname+'</h5><p>捐助<span>'+money+'</span>元</p></li>';		
			if((i+1)==rows) break;
		}
		$("#toplist").html(content);
	}catch(e){}
	
}
//最新捐助列表
function toplist(){
	var _url = 'http://cache.gongyi.qq.com/succor/gettoplist/toplist?r='+Math.random();
	$.getScript(_url,function(){
		if(toplist==false)
			return ;
		var num = 5;
		var len = toplist.length;
		if(len<num)
			num=len;
		var content='';
		var lastClass='';
		for(i=0;i<num;i++){
			var money = toplist[i].Value/100;
			var _head = toplist[i].head50;
			if(typeof(_head)!='undefined'){
				if(_head.indexOf('p.qpic.cn')>0)
					var headImg = _head+'/60';
				else
					var headImg = _head+'/50';
			}
			else if(typeof(_head)!='undefined')
				var headImg = _head;
			var nickname = toplist[i].Nice;
			nickname = nickname.replace('"','');
			nickname = nickname.replace("'",'');
			if(!nickname)
				nickname = '匿名';
			if(i==num-1)
				lastClass='last';
			content += '<li class="'+lastClass+'"><img src="'+headImg+'" width="50" /><h5>'+nickname+'</h5><p>捐助<span>'+money+'</span>元</p></li>';
		}
		$('#toplist').html(content);
	})
}

//公益组织排行榜
function orgSort(){
	var _url = "http://cache.gongyi.qq.com/succor/getOrgSort/org/?r="+Math.random();
	$.getScript(_url,function(){
		$('#orgSortList').empty();
		var _num = org.length;
		if(_num>0){
			var _content = '<li class="ph_li"><div class="ph_shuzi ph_title">排名</div><div class="ph_name ph_title">昵称</div><div class="ph_jifen ph_title">认领项目数</div></li>';
			for(i=0;i<_num;i++){
				_content += '<li class="ph_li"><div class="ph_shuzi"><p class="ph_shuzi1">'+(i+1)+'</p></div><div class="ph_name"><div class="ph_img"><img src="'+org[i].headImg+'"/></div><a class="ph_n " href="#">'+org[i].name+'</a><div class="ph_bio"></div></div><div class="ph_jifen"><p class="jifen_p">'+org[i].total+'</p></div></li>';
			}
			$('#orgSortList').html(_content);
		}
	});
}

//项目证实
function v1(){
	if(global_userinfoobject.code != 0){  //没有登录提示登录
		ptloginopenfun();
		return true;
	}
	var _idcode = global_userinfoobject.idcode;
	if(_idcode==1){//公募组织
		_msg = '您是具备公募资格的公益组织，可直接认领救助项目，系统将转入项目认领页面，是否确认？';
		_url = 'http://gongyi.qq.com/succor/project_apply.htm';
		_showPromptDiv(_msg,function(){closeTipDiv();window.open(_url)});
	}
	else if(_idcode==2){//志愿团
		window.open('http://gongyi.qq.com/succor/project_apply.htm');
	}
	else{
		showTips1('您当前还不是志愿团成员，暂时无法进行项目证实。',3);
		/*_showPromptDiv('查看待证实的项目需要您具备志愿团成员的身份，是否现在就前往页面加入？',function(){
		closeTipDiv();
		window.open('http://gongyi.qq.com/succor/volunteer.htm');
		});*/
	}
}

//机构认领
function v2(){
	if(global_userinfoobject.code != 0){  //没有登录提示登录
		ptloginopenfun();
		return true;
	}
	if(global_userinfoobject.idcode==1){//公募组织
		window.location.href='http://gongyi.qq.com/succor/project_apply.htm';
	}
	else{
		var _url = 'http://npoapp.gongyi.qq.com/userinfo/getOrgStatus?callback=?';
		$.getJSON(_url,function(data){
			if(data.code==0){
				var _msg='';
				var _url = '';
				if(data.status==1){//审核通过
					window.location.href='http://gongyi.qq.com/succor/project_apply.htm';
				}
				else if(data.status==-1){
					_msg = '您还未注册腾讯公益平台公益组织，是否现在注册？';
					_url = 'http://npoapp.gongyi.qq.com/_OrgInputInfo';
					_showPromptDiv(_msg,function(){window.open(_url);closeTipDiv();});
				}
				else if(data.status==-2){
					_msg = '您的公益组织资料审核不通过，不能认领救助项目。';
					showTips1(_msg,3);
				}
				else if(data.status==-3){
					_msg = '您的公益组织资料正在审核中，暂时还不能查看待认领的救助项目。我们将通过邮箱通知您审核结果，请耐心等待';
					showTips1(_msg,3);
				}
				else if(data.status==2){
					_msg = '您的公募资料正在审核中，审核通过后我们将通过邮箱通知您，届时您可以认领救助项目，请耐心等待。';
					showTips1(_msg,3);
				}
				else if(data.status==4){
					_msg = '您已注册公益组织，但还未上传公募机构资料，是否现在上传？';
					_url = 'http://npoapp.gongyi.qq.com/succor/fill/complete';
					_showPromptDiv(_msg,function(){window.open(_url);closeTipDiv();});
				}
				else{
					_msg = '您的公募资料审核不通过中，不能认领救助项目。';
					showTips1(_msg,3);
				}
				
			}
			else if(data.code==2001)
				ptloginopenfun();
		});
		//_showPromptDiv('查看待证实的项目需要您具备志愿团成员的身份，是否现在就前往页面加入？',function(){window.location.href='http://gongyi.qq.com/succor/volunteer.htm'});
	}
}/*  |xGv00|c3a4fd5c2868a8e21eddf51c9d324b35 */