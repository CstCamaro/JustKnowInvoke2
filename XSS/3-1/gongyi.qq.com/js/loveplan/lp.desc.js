function explodeDesc(source){
	var _isExplode = $('#lp_project_intro').data('is-explode');
	if(typeof(_isExplode)=='undefined'||_isExplode==''){
		$('#lp_project_intro').data('is-explode','true');
		$('#lp_project_intro').removeClass('lp_project_intro_hide');
		$(source).html('收起↑');
	}
	else{
		$('#lp_project_intro').data('is-explode','');
		$('#lp_project_intro').addClass('lp_project_intro_hide');
		$(source).html('全部展开↓');
	}
}

function bindIntroHideEvent(){
	$('#explodeBtn').toggle(function(){
		$('.lp_project_intro_hide').show();
		$(this).html('收起↑');
	},function(){
		$('.lp_project_intro_hide').hide();
		$(this).html('全部展开↓');
	})
}

function formatNumber(n, s){ 
    if (typeof s == "undefined") 
        s = "";
    n = parseInt(n);
    n = parseInt(n) + Number(((n - parseInt(n)) + "").substring(0, 3));
    if (n / 1000 >= 1) {
        var nn = '' + n;
        nn = nn.substring(nn.length - 3, nn.length);
        s = ',' + nn + s;
        return formatNumber(parseInt(n / 1000), s);
    }
    else {
        return n + s;
    }
}

function loadStat(opts){
	console.log(ProjectCountNewJsonObject)
	var _money = ProjectCountNewJsonObject.ProjectCountRmbNum;
	var _people = ProjectCountNewJsonObject.CurrentMonthUserNum;
	var _str = '';
	if(typeof(opts)=='undefined'){
		$('#statTotal').parent().parent().remove();
	}
	else if(typeof(opts)=='object'){
		if(opts.unit!=undefined){
			//_money = Math.floor(_money/opts.unit);
			$('#statTotal').text(Math.floor(_money/opts.unit));
		}
		else{
			$('#statTotal').text(opts.val);
		}
	}
	_str = formatNumber(_money);
	$('#statMoney').text(_str);
	_str = formatNumber(_people);
	$('#statPeople').text(_str);
}

function loadSlideImg(pid){
	var _url = "//gongyi.qq.com/js/monthly/pclist/monthly.img.5."+pid+".js";
	$.ajax({
		url:_url,
		dataType:'script',
		type:'get',
		error:function(){},
		success:function(data){
			data = eval('('+data+')');
			var _len = data.length;
			if(_len<1){
				$('#slide-group').hide();
			}
			else{
				$('#big-list').empty();
				$('#small-list').empty();
				for(i=0;i<_len;i++){
					var _o = data[i];
					$('<li>\
						<img src="'+_o.img_url+'">\
						<div class="slide_preview_title" id="slide-text">'+_o.title+'</div>\
					</li>').appendTo('#big-list');
					$('<li>\
						<a href="javascript:;">\
							<img src="'+_o.img_small_url+'"></a>\
					</li>').appendTo('#small-list');
				}
				$('#small-list li').eq(0).addClass('current');
				$('#small-list').show();
				new slider();
			}
		}
	});
}

function loadSupportNum(orguin){
	var _url = 'http://npoapp.gongyi.qq.com/loveplan/org/getSupportNum/'+orguin+'?isajax=1';
	$.ajax({
		'type':'GET',
		'url':_url,
		'dataType':'jsonp',
		'jsonp':'jsoncallback',
		'jsonpCallback':'_Callback',
		'success':function(data){
			if(data.status==1)
				$('#support-num').text(data.info.f_num);
			else
				$('#support-num').text(0);
		}
	});
}

function supportOrg(){
	var _url = 'http://npoapp.gongyi.qq.com/loveplan/org/index/'+orguin+'?isajax=1';
	$.ajax({
		'type':'GET',
		'url':_url,
		'dataType':'jsonp',
		'jsonp':'jsoncallback',
		'jsonpCallback':'_Callback',
		'success':function(data){
			if(data.info.code==-1)
				ptloginopenfun();
			else if(data.info.code==1)
				showTips1('您好，每天只能支持公益组织一次，您今天已经支持过了，感谢您的参与！',3);
			else if(data.info.code==0)
				$('#support-num').text(data.info.num);
		}
	})
}

function loadBless(){
	var _len = LeaveWordArray.length;
	if(_len==0){
		$('#bless').html('<li>暂时无爱心祝福</li>');
	}
	else{
		_len = _len>=15?15:_len;
		$('#ulist').empty();
		var _d = getCurrentDate();
		for(i=0;i<_len;i++){
			var _p = LeaveWordArray[i];

			var _img = _p.User_photo;
			var _default_img = _img.indexOf('mat1');
			if(_default_img<0)
				_img = _img.substr(0,_img.length-3)+'50';
			var _level = _p.User_LoveStep;
			var _level_css = "icon_love lv"+_level;
			if(_level<1)
				_level_css = "level_gary";
			var _ctime = _p.Abandtimes;
			var _ctime = _ctime.split(" ");
			var _date = _ctime[0];
			var _showTime = '';
			
			if(_d == _date){//当天的记录
				var _time = _ctime[1];
				_showTime = _time.substr(0,5);
			}
			else{
				_showTime = _date.substr(5,5);
			}
			
			if(_p.Nice=='')
				_p.Nice = '匿名';			
			$('<li>\
				<span  tabindex="-1" class="avatar">\
					<img style="width:30px;height:30px" src="'+_img+'" alt="">\
				</span>\
				<dl>\
					<dt class="clearfix">\
					    <span style="float: left" >'+_p.Nice+'</span>\
						<a href="//gongyi.qq.com/loveplan/chengzhangtixi.htm" target="_blank"><i class="'+_level_css+'"></i></a>\
						<span class="fr">'+_showTime+'</span>\
					</dt>\
					<dd>祝福：'+_p.Context+'</dd>\
				</dl>\
			</li>').appendTo('#ulist');
		}
		//autoMove('ulistzone','ulist','ulistcopy');
		$('#ulistzone').kxbdSuperMarquee({
			isMarquee:true,
			isEqual:false,
			scrollDelay:60,
			direction:'up'
		});
	}
}

function loadOrgLevel(){
	$('#orguin').text(orguin);
	var _exp = org_exp.exp-1;
	var _step = 0;
	
	var _level_img_arr = [['exp_01.png','exp_01_.png'],['exp_02.png','exp_02_.png'],['exp_03.png','exp_03_.png'],['exp_04.png','exp_04_.png']];
	var _index = Math.floor(_exp/5);
	var _step = _exp%5+1;
	var _str = "<a id='exphref' target='_blank' href='http://gongyi.qq.com/npo/pointDetail.htm?qq="+org_exp.org_qq+"&point="+org_exp.totalPoint+"&exp="+org_exp.exp+"&status=0'>";
	for(i=0;i<5;i++){
		if(i<_step)
			_str+='<div class="lv'+(_index+1)+'"></div>';
		else
			_str+='<div class="lv'+(_index+1)+'-gary"></div>';
	}
	$('#org-level-group').html(_str);
	$("<a href='http://gongyi.qq.com/npo/pointDetail.htm?qq="+org_exp.org_qq+"&point="+org_exp.totalPoint+"&exp="+org_exp.exp+"&status=0' style='position:relative;top:-5px;left:5px' target='_blank'>"+org_exp.exp+'</a>').appendTo('#org-level-group');
}

function donate(){
	showDonateDiv(ProjectCountNewJsonObject.ProjectName,ProjectCountNewJsonObject.ProjectFund_id,ProjectCountNewJsonObject.ProjectActid);
}

function loadRecommendProject(){
	var _url = "//gongyi.qq.com/js/monthly/mlist/monthly.home.v1.js";
	$.ajax({
		url:_url,
		dataType:'script',
		type:'get',
		async:false,
		error:function(){},
		success:function(data){
			data = eval('('+data+')');
			var _len = data.length;
			if(_len<1){
				$('#recommend-project dd').html('暂时没有推荐项目');
			}
			else{
				$('#recommend-project dd').remove();
				var total=0;
				_max = data.length;
				for(i=0;i<_max;i++){
					var _p = data[i];
					if(_p.id!=ProjectCountNewJsonObject.ProjectActid){						
						$('<dd>\
							<a target="_blank" href="'+_p.url+'" title="'+_p.title+'">\
								<img target="_blank" width="273" height="130" src="http://mat1.gtimg.com/gongyi/2013yuejuan/detail_tuijian/'+_p.id+'_273130.jpg" alt="'+_p.title+'" title="'+_p.title+'">\
								<div class="lp_recommend_title">'+_p.title+'</div>\
							</a>\
						</dd>').appendTo('#recommend-project');
						total++;
						if(total>=2)
							return ;
					}
				}
			}
		}
	})
}

function listenWeibo(n){
	var _cookie = new GyLib.Cookie();
	var _key = _cookie.setGyToken();
	var D = "http://npoapp.gongyi.qq.com/succor/weibo/listen/?u="+n+"&gy_key="+_key+"callback=listenWeiboCallBack&varname=listenRs";
	$.getScript(D,function(){
		if(listenRs==1){
			showTips1('请选择一个收听对象',3);
		}
		else if(listenRs==2){
			ptloginopenfun();
		}
		else if(listenRs==0){
			showTips1('收听成功',1);
		}
		else if(listenRs==80103){
			showTips1('您已经收听过此公益组织',3);
		}
		else{
			showTips1('网络异常，请稍后重试',2);
		}
	});
}

function initFeedback(){
	var _isLoaded = $('#feedback-this-year').data('isLoaded');
	if(typeof(_isLoaded)=='undefined'||_isLoaded=='')
		loadFeedback('init');
}

function showTab(index,id){
	$('.lp_project_tab li').removeClass('current');
	$('#feedback').hide();
	$('#interaction').hide();
	$('#desc').hide();
	$('#'+id).show();
	$('.lp_project_tab li').eq(index).addClass('current');
	if(id=='interaction'){
		/*
		var _url = $('#wallid').attr('src');
		if(_url==null||_url==''||_url.length<1)
			$('#wallid').attr('src',global_w_url);
		*/
		var _isLoaded = $('#wallid').data('isLoaded');
		if(typeof(_isLoaded)=='undefined'||_isLoaded==''){
			window.showTxWbYDQ(document.getElementById("wallid"), {"width":"100%","height":"100%","appkey":"800100208","theme":0,"nobg":0,"ModuleConfigure":{"TitleModule":0,"PubModule":0,"TabModule":0,"TimelineModule":1},"TimelineDetail":{"HeadStyle":1,"PageStyle":1,"PicStyle":0,"TwitterNum":20},"PubModuleConfigure":{"InitialContent":"#月捐力量# 说点什么吧","InsertFunction":[0,1,2],"SourceUrl":"http://dev.t.qq.com/websites/read/","position":0},"TitleModuleConfigure":{"OfficialAccount":"api_weibo"},"TimelineModuleConfigure":[{"Condition":["月捐力量"],"ConditionType":1,"ContentType":0,"Famous":0,"MessageType":0,"Name":"月捐力量","SortType":1}],"filter":"null"} , function(d){$('#wallid').data('isLoaded','true')} );
		}
	}
}

function showFeedbackTab(index,id){
	$('.lp_feedback_tab li').removeClass('current');
	$('#feedback-tab1').hide();
	$('#feedback-tab2').hide();
	$('#'+id).show();
	$('.lp_feedback_tab li').eq(index).addClass('current');
	if(index==0)
		$('.lp_feedback_nav').show();
	else{
		$('.lp_feedback_nav').hide();
		$('.lp_feedback_tab li').eq(index).addClass('last');
	}
}

function bindBackfeedMoreEvent(){
	$(".lp_feedback_more_btn").toggle(function(){
	 		$(this).parents(".lp_feedback_more_li_innerdiv").find("tr.lp_feedback_more_hide").show();
	 		$(this).html("收起全部&uarr;");
	 },function(){
	 		$(this).parents(".lp_feedback_more_li_innerdiv").find("tr.lp_feedback_more_hide").hide();
	 		$(this).html("展开全部&darr;");
	 })
}

function setFeedbackBtn(){
	var _cur = $('#feedback-this-year').data('current');
	var _total=$('#feedback-this-year li').length;
	var _item_per_page=$('#feedback-this-year').data('_item_per_page');
	var _page = Math.ceil(_total/_item_per_page)-1;

	$('.lp_feedback_nav div').removeClass('hover').unbind('mouseover').unbind('mouseout');
	if(_cur>0)
		$('.lp_feedback_nav div').eq(0).bind('mouseover',function(){
			$(this).addClass('hover').css('cursor','pointer');
		}).bind('mouseout',function(){
			$(this).removeClass('hover');
		}).attr('title','上一页');
	else
		$('.lp_feedback_nav div').eq(0).css('cursor','default').bind('mouseover',function(){
			$(this).removeClass('hover');
		}).removeAttr('title');
	if(_cur>=_page){
		$('.lp_feedback_nav div').eq(1).css('cursor','default').bind('mouseover',function(){
			$(this).removeClass('hover');
		}).removeAttr('title');
	}
	else{
		$('.lp_feedback_nav div').eq(1).bind('mouseover',function(){
			$(this).addClass('hover').css('cursor','pointer');
		}).bind('mouseout',function(){
			$(this).removeClass('hover');
		}).attr('title','下一页');
	}
}

function gotoFeedback(flag){
	var _cur = $('#feedback-this-year').data('current');
	if(typeof(_cur)=='undefined'||_cur=='')
		_cur = 0;
	if(flag=='prev')
		_cur--;
	else if(flag=='next')
		_cur++;
	if(_cur<0)
		_cur = 0;
	var _total=$('#feedback-this-year li').length;
	var _item_per_page=$('#feedback-this-year').data('_item_per_page');
	var _page = Math.ceil(_total/_item_per_page)-1;
	if(_cur>_page)
		_cur = _page;
	var _start = _cur*_item_per_page;
	var _end = _start+_item_per_page;
	if(_end>_total)
		_end = _total;

	$('#feedback-this-year li').each(function(index,obj){
		if(index>=_start&&index<_end)
			$(obj).removeClass('lp_feedback_list_hide');
		else
			$(obj).addClass('lp_feedback_list_hide');
	});
	$('#feedback-this-year').data('current',_cur);	
	setFeedbackBtn();
}

function loadFeedback(){
	var _isLoaded = $('#feedback-more').data('isloaded');
	if(_isLoaded!=true){
		var _url = '//gongyi.qq.com/js/monthly/pclist/monthly.report.'+projectid+'.js?'+Math.random();
		$.ajax({
			url:_url,
			dataType:'text',
			type:'get',
			success:function(data){
				data = eval('('+data+')');
				if(data==false||data==''){
					$('#latest-report-con').html('目前没有善款反馈');
					$('#feedback-this-year').html('<li>目前没有善款反馈</li>');
					$('#latest-report-img').remove();
					return ;
				}
				//加载本年度的反馈报告
				var _date = new Date();
				var _year = _date.getFullYear();
				var _this_year = data[_year];
				if(_this_year == null || _this_year == '')
					_this_year = data[_year-1];
				if(_this_year!=null&&_this_year!=''){
					$('#feedback-this-year').empty();
					var _item_per_page = 4;
					$('#feedback-this-year').data('_item_per_page',_item_per_page);
					var _hideStep = 0;
					var _item = [];
					var _arr = [];
					var j = 1;	//第一个月展示在上面，历史的从索引为1的数据开始展示
					for(key in _this_year){
						var _m = _this_year[key];
						_item = [_m.title,_m.url,_m.img,_m.summary,_m.year,_m.id];
						_arr.push(_item);
					}
					_arr.reverse();
					var _len = _arr.length-1;
					var _m = _arr[0];
					$('#latest-report-con').html(_m[3]+'<a href="http://gongyi.qq.com/loveplan/project_report.htm?pid='+projectid+'&rid='+_m[5]+'" class="mod_more" target="_blank">详情&gt;&gt;</a>');
					if(!!_m[2] && _m[2].length >= 3)
						$('#latest-report-img').html('<li><img src="'+_m[2][1]+'" alt=""></li><li><img src="'+_m[2][2]+'" alt=""></li>');
					else if(!!_m[2] && _m[2].length == 1)
						$('#latest-report-img').html('<li><img src="'+_m[2][0]+'" alt="" width="320" /></li>');
					if(_len == 0){//当反馈报告为当年的第一个月份的时候，需要拉取上一年的反馈报告来展示
						var _last_year  = data[_year-1];
						if(_last_year != null && _last_year != ''){
							_last_year = data[_year-1]; 
							_arr = [];
							for(key in _last_year){
								var _m = _last_year[key];
								_item = [_m.title,_m.url,_m.img,_m.summary,_m.year,_m.id];
								_arr.push(_item);
							}
							_arr.reverse();
							_len = _arr.length-1;
							j = 0;	//如果是展示去年的，那么这从数据位0的地方开始展示
						}
					}

					for(;j<=_len;j++){
						var _hideClass= '';
						_m = _arr[j];
						if(++_hideStep>_item_per_page)
							_hideClass = 'lp_feedback_list_hide';
						var _url = '//gongyi.qq.com/loveplan/project_report.htm?pid='+projectid+'&rid='+_m[5];
						$('<li class="clearfix '+_hideClass+'">\
							<a href="'+_url+'" class="fl" target="_blank">\
								<img src="'+_m[2][0]+'" alt=""></a>\
							<dl class="fl">\
								<dt><a href="'+_url+'" target="_blank">'+_m[0]+'</a></dt>\
								<dd>'+_m[3]+'<a href="'+_url+'" target="_blank" class="mod_more">详情&gt;&gt;</a>\
								</dd>\
							</dl>\
						</li>').appendTo('#feedback-this-year');
					}
					if(_len<1){
						$('<li class="clearfix">目前没有善款反馈</li>').appendTo('#feedback-this-year');
					}
					$('#feedback-this-year').data('current',0);	
				}
				$('#feedback-more').data('isloaded',true);
				setFeedbackBtn();
				//加载往年的反馈报告
				$('#feedback-more').empty();
				var _pastReportNum = 0;
				for(i=_year;i>=2010;i--){//每年的数据
					var _y = data[i];

					if(_y!=null&&_y!=''){
						_pastReportNum++;
						var _o = $('<li class="clearfix"></li>');
						$('<div class="time"><em>'+i+'</em>年<i class="icon_arrow_right"></i></div>').appendTo(_o);
						var _div = $('<div class="lp_feedback_more_li_innerdiv"></div>');
						var _table = $('<table></table>');
						var _hideStep = 0;
						var _arr = [];
						var _item = [];
						for(key in _y){
							_item = [_y[key].title,_y[key].url,_y[key].id];
							_arr.push(_item);
						}
						
						_arr.reverse();
						var _len = _arr.length-1;
						for(j=0;j<=_len;j++){
							var _hideClass= '';
							var _m = _arr[j];
							if(++_hideStep>3)
								_hideClass = 'lp_feedback_more_hide';
							
							var _str = '<tr class="'+(_hideStep%2==0?'even':'')+' '+_hideClass+'">';
							_str += '<td><a href="http://gongyi.qq.com/loveplan/project_report.htm?pid='+projectid+'&rid='+_m[2]+'" target="_blank">'+_m[0]+'</a></td>';
							j++;
							if(j>_len){
								_str += '<td>&nbsp;</td>';
								_str += '<td>&nbsp;</td></tr>';
								$(_str).appendTo(_table);
							}
							else{
								//break;
								_m = _arr[j];
								_str += '<td><a href="http://gongyi.qq.com/loveplan/project_report.htm?pid='+projectid+'&rid='+_m[2]+'" target="_blank">'+_m[0]+'</a></td>';
								_str += '<td>&nbsp;</td></tr>';
								$(_str).appendTo(_table);
							}
						}
						if(_hideStep>3)
							$('<a class="lp_feedback_more_btn" href="javascript:void(0);">展开全部&darr;</a>').appendTo(_div);
						_table.appendTo(_div);
						_div.appendTo(_o);
						_o.appendTo('#feedback-more');
					}
				}
				if(_pastReportNum<1){
					$('<li class="clearfix" style="background:none">目前没有善款反馈</li>').appendTo('#feedback-more');
				}
				bindBackfeedMoreEvent();
				$('#feedback-more li:last').removeClass('clearfix').addClass('last');
			},
			error:function(){}
		});
	}
}

function showFlowTips(i){
	var _text = ['包括捐款QQ号码、捐款时间、金额、发票邮寄地址','公益组织核对信息、打印发票、安排邮寄','等待邮寄发票，获得捐款发票'];
	var _pos = ['-22px','32px','68px'];
	$('#flow-tips-text').html(_text[i]);
	$('#flow-tips').css('top',_pos[i]).show();
} 

function hideFlowTips(){
$('#flow-tips').hide();
} 

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}

function autoShowFeedback(){
	var f = parseInt(getQueryString('fb'));
	if(f==1){
		//document.body.scrollTop = '492';
		//$("document").scrollTop(492);
		$('html,body').animate({scrollTop:492}, 0);
		showTab(1,'feedback');initFeedback();
	}
}

$(function(){ 
	var fankui = GyLib.Url().getPara("fankui");
	if(fankui=="fk"){
		showTab(1,'feedback');initFeedback();
	}
});


/*  |xGv00|34b60f56ae1bfc7bb8f0a038dcb05aaa */