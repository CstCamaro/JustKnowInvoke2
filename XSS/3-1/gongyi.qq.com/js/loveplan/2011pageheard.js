var LoveplanFormat_monthlymoney = function(moneynum,objectname){
	moneynum = parseInt(moneynum);
	var money_num = moneynum.toString();
	var money_num_array = new Array();
	var num_value = 0;
	var indexnum = 0;
	for(var i=0;i<money_num.length;i++){
		num_value = money_num_array[indexnum++] = money_num.substr(i,1);

		if((money_num.length-i-1)%3 == 0 && i >=0 && i < (money_num.length-1) && money_num.length > 5) 
		{
			money_num_array[indexnum++] = ",";

		}

	}
	
	
	var HtmlCodeFormat = "";
	for(var i=0;i<money_num_array.length;i++){
		if(money_num_array[i] == ",") classname = 'class="dian"';else classname = '';
		HtmlCodeFormat+="<li "+classname+">"+money_num_array[i]+"</li>";
	}	
	document.getElementById(objectname).innerHTML = HtmlCodeFormat;
};

var Global_PageHeardLoginInfo = function(Objectname){
	if(global_userinfoobject.global_gongyiuserinfo == 0){  //未登陆态
		document.getElementById('Global_pageheardObj').innerHTML = ' 您好，欢迎参与腾讯公益 <a href="javascript:ptloginopenfun();void(0);" title="用户登录" class="login_btn" id="Global_pageheardLoginBtnObj"></a>';	
		return true;
	}



	var  HtmlCode ="";
		 HtmlCode+="<span>[<a class=\"colorless\" title=\"退出\"  href=\"javascript:ptlogoutopenfun('');void(0);\">退出</a>]</span>";
         HtmlCode+="<span><a title=\"个人中心\"  href=\"http://gongyi.qq.com/mygongyi.htm\" ><strong>个人中心</strong></a></span>";
	
	
	if(global_userinfoobject.global_gongyiuserinfo == 1){   //登陆态
		var InterceptNick = $.Tjs_Intercept_str($.Tjs_HtmlEncode(global_userinfoobject.jsonnick),22,true);  //QQ昵称
		var global_appurl = global_userinfoobject.appurl;
		var global_usertype = global_userinfoobject.usertype;
		var booleishavemonthly = false;
		
		if(typeof(newMsgCount)!='undefined' && newMsgCount != '' && newMsgCount != null && newMsgCount > 0)
			newMsgCounts = newMsgCount;
		else
			newMsgCounts = 0;
		HtmlCode+="<span style=\"padding-right:10px;\">消息(<a href=\"http://npoapp.gongyi.qq.com/user_msg/msg_list\" style=\"margin:0;\">"+newMsgCounts+"</a>)</span>";

		if(global_usertype == 0 || global_usertype ==2){   //global_usertype == 0（0什么都不是，1组织，2志愿者，3组织且志愿者）
			
			//用户注册了未审核的
			if(global_userinfoobject.orgtype == 0) //(-1没有注册，0注册未审核，1审核通过，2不通过，3组织删除，4草稿)
			{
				if(global_userinfoobject.ngotype == 1) //高校组织
				{
					HtmlCode+="<span>组织注册审核中 <a href=\"http://npoapp.gongyi.qq.com/_OrgInputInfo_\">可点此补充资料</a></span>";
				}
				else  //公益组织
				{
					HtmlCode+="<span>组织注册审核中 <a href=\"http://npoapp.gongyi.qq.com/_OrgInputInfo\">可点此补充资料</a></span>";
				}
				
			}
			else
			{
				if(typeof(global_uinobject)=="undefined" || typeof(global_uinobject.total_Money_Num)=="undefined" || global_uinobject.total_Money_Num<=0 )
				{
					//HtmlCode+="<span>参与<a href='http://gongyi.qq.com/loveplan/' target='_blank'>月捐计划</a></span>";
				}
				else
				{	
					HtmlCode+="<span>本月已捐款<a href=\""+global_appurl+"_MonthlyList\">( <strong>"+global_uinobject.thismonthly_project_sucess+"</strong> )</a></span>";
					HtmlCode+="<span>本月待续捐<a href=\""+global_appurl+"_MonthlyList\">( <strong>"+global_uinobject.thismonthly_project_fail+"</strong> )</a></span>";
					booleishavemonthly = true;
				}//参与月捐计划，点亮公益勋章

				if(global_userinfoobject.qq_lovestep>0){
					HtmlCode+="<span class=\"gongyi_level open\" title='爱心积分:"+global_userinfoobject.qq_loveindex+"'> <i class=\"lv\"></i> <em class=\"num"+global_userinfoobject.qq_lovestep+"\"></em> </span>";
					//HtmlCode+="<span>成长阶段:</span>";
				}
			}
			
		}else if(global_usertype == 1 || global_usertype ==3){  //
			InterceptNick =  $.Tjs_Intercept_str($.Tjs_HtmlEncode(global_userinfoobject.npousernames[0]),22,true);     ;  //是组织的，不显示QQ昵称，显示其组织名,组织名取22个字节，即11个汉字，其为true，加...，否则就不显示...
			 
			HtmlCode+="<span><a   href=\""+global_appurl+"_OrgCenter\"><strong>机构管理</strong></a></span>";
				if(global_uinobject.npoactivity_orginfo!="" && ( global_uinobject.npoactivity_orginfo[0]!=0 || global_uinobject.EnterTotal_Cnt!=0))
				{
					HtmlCode+="<span>已发布的活动<a href=\""+global_appurl+"organizer/pagePiece/2/1/0\" target=\"_blank\">( <strong>"+global_uinobject.npoactivity_orginfo[0]+"</strong> )</a></span>";
					HtmlCode+="<span>待总结的活动<a href=\""+global_appurl+"_WaitSumUp\" target=\"_blank\">( <strong>"+global_uinobject.npoactivity_orginfo[6]+"</strong> )</a></span>";
				}
				else
				{

					HtmlCode+="<span>已发布的活动<a href=\""+global_appurl+"organizer/pagePiece/2/1/0\" target=\"_blank\">( <strong>0</strong> )</a></span>";
					HtmlCode+="<span >待总结的活动<a  href=\""+global_appurl+"_WaitSumUp\" target=\"_blank\">( <strong>0</strong> )</a></span>";
				}
		}	
		
		HtmlCode+="<span style=\" margin-left:15px\">&nbsp;</span><span class='loginname'>欢迎您，"+InterceptNick+"</span>";
	}
	
	document.getElementById(Objectname).innerHTML = HtmlCode;
}


var Global_PageHeardLoginInfo_back = function(Objectname){
	if(global_userinfoobject.global_gongyiuserinfo == 0){
		document.getElementById('Global_pageheardObj').innerHTML = ' 您好，欢迎参与腾讯公益 <a href="javascript:ptloginopenfun();void(0);" title="用户登录" class="login_btn" id="Global_pageheardLoginBtnObj"></a>';	
		return true;
	}



	var  HtmlCode ="";
		 HtmlCode+="<span>[<a class=\"colorless\" title=\"退出\"  href=\"javascript:ptlogoutopenfun('');void(0);\">退出</a>]</span>";
		 HtmlCode+="<span><a title=\"进入我的个人中心\"  href=\"http://gongyi.qq.com/mygongyi.htm\" >进入我的<strong>个人中心</strong></a></span>";
	
	
	if(global_userinfoobject.global_gongyiuserinfo == 1){
		var InterceptNick = $.Tjs_Intercept_str($.Tjs_HtmlEncode(global_userinfoobject.jsonnick),14,false);
		
		var global_appurl = global_userinfoobject.appurl;
		var global_usertype = global_userinfoobject.usertype;
		var booleishavemonthly = false;
		if(global_usertype == 0 || global_usertype ==2){

			if(typeof(global_uinobject)=="undefined" || typeof(global_uinobject.total_Money_Num)=="undefined" || global_uinobject.total_Money_Num<=0 )
			{
				HtmlCode+="<span>参与<a href='http://gongyi.qq.com/loveplan/' target='_blank'>月捐计划</a></span>";
			}
			else
			{
				HtmlCode+="<span>本月已捐款<a href=\""+global_appurl+"_MonthlyList\">( <strong>"+global_uinobject.thismonthly_project_sucess+"</strong> )</a></span>";
				HtmlCode+="<span>本月待续捐<a href=\""+global_appurl+"_MonthlyList\">( <strong>"+global_uinobject.thismonthly_project_fail+"</strong> )</a></span>";
				booleishavemonthly = true;
			}//参与月捐计划，点亮公益勋章
			
			
			if(!booleishavemonthly){//有月捐数据的情况下不显示活动数据
				if(global_uinobject.EnterTotal_Cnt==null||global_uinobject.EnterTotal_Cnt<=0)
				{
					HtmlCode+="<span>参与<a href='http://gongyi.qq.com/npo/PNEvent_list.htm'>公益活动</a></span>";
				}
				else
				{
					HtmlCode+="<span>参加公益活动<a href=\""+global_appurl+"_MyactivityList\">( <strong>"+global_uinobject.EnterTotal_Cnt+"</strong> )</a></span>";
				}
			}
			
			/*
			if(global_usertype == 0 )
			{
				HtmlCode+="<span><a  href=\""+global_appurl+"_OrgInputInfo\">公益组织注册</a></span>";
				HtmlCode+="<span><a  href=\""+global_appurl+"_VolunterInputInfo\">志愿者注册</a></span>";
			}
			else
			{
				HtmlCode+="<span  class=\"sp1\">&nbsp;&nbsp;<a  href=\""+global_appurl+"_OrgInputInfo\">公益组织注册</a></span>";
			}
			*/
			
			if(global_userinfoobject.qq_lovestep>0){
				HtmlCode+="<span class=\"gongyi_level open\" title='爱心积分:"+global_userinfoobject.qq_loveindex+"'> <i class=\"lv\"></i> <em class=\"num"+global_userinfoobject.qq_lovestep+"\"></em> </span>";
				//HtmlCode+="<span>成长阶段:</span>";
			}
			
			
		}else if(global_usertype == 1 || global_usertype ==3){
				
				if(global_uinobject.npoactivity_orginfo!="" && ( global_uinobject.npoactivity_orginfo[0]!=0 || global_uinobject.EnterTotal_Cnt!=0))
				{
					HtmlCode+="<span>已发布的活动<a href=\""+global_appurl+"organizer/pagePiece/2/1/0\" target=\"_blank\">( <strong>"+global_uinobject.npoactivity_orginfo[0]+"</strong> )</a></span>";
					HtmlCode+="<span>待总结的活动<a href=\""+global_appurl+"_WaitSumUp\" target=\"_blank\">( <strong>"+global_uinobject.npoactivity_orginfo[6]+"</strong> )</a></span>";
				}
				else
				{
					HtmlCode+="<span>您的公益组织已成功通过审核!</span>";
				}
				
				HtmlCode+="<span><a style=\" margin-left:15px\"  href=\""+global_appurl+"_OrgCenter\">进入管理中心</a></span>";
				if( global_usertype == 1 ) 
				{
					HtmlCode+="<span><a  href=\""+global_appurl+"_VolunterInputInfo\">志愿者注册</a></span>";
				}
		}	
		
		
		//HtmlCode+="<span><a href=\"http://gongyi.qq.com/mygongyi.htm\"><strong>个人中心</strong></a></span>";
		//HtmlCode+="<span>[<a href=\"javascript:ptlogoutopenfun('')\">退出</a>]</span>";
		//InterceptNick=InterceptNick="使 ss";
		//alert('dd');
		HtmlCode+="<span class='loginname'>欢迎您，<a class=\"colorless\" href=\"http://gongyi.qq.com/mygongyi.htm\" title=\""+global_userinfoobject.jsonnick+"\">"+InterceptNick+"</a></span>";
		
		
		//html="<div style=\"overflow:hidden; width:5em;height:1em;\" >"+InterceptNick+"</div>";
		//InterceptNick=InterceptNick.substr(0,9);
		//HtmlCode+="<span style=\"white-space:nowrap;width:5em;height:15px;overflow:hidden;text-overflow:ellipsis;text-align:left;\"><a class=\"colorless\" href=\"http://gongyi.qq.com/mygongyi.htm\" title=\""+global_userinfoobject.jsonnick+"\">"+InterceptNick+"</a></span><span  style=\"float;left\">欢迎您，</span>";
	}
	
	
	document.getElementById(Objectname).innerHTML = HtmlCode;
}


var Global_InitMemuShow = function(n,type, x){
	if(typeof x == "undefined") var x =-1;

	if(typeof type!="undefined" && type=="monthly"){
		$('#Global_GongyiMenuIdObj').removeClass().addClass('index_head');//切换月捐专用的log头class
		$('#Global_GongyiLogObj').attr('href','http://gongyi.qq.com/loveplan/').attr('title','月捐计划');
	}
	
	
	$("#nav li").attr("class","");
	$("#nav li").eq(n).attr("class","nav_lishw");
	$(".nav_lishw .v a").attr("class","sele");
	$(".nav_lishw .kind_menu").show();
	
	//alert(x);
	if(x >= 0 ){
		$(".nav_lishw .kind_menu").find("a").eq(x).removeClass().addClass("select");
		//alert($(".nav_lishw .kind_menu").find("a").eq(x).text());
	}
};/*  |xGv00|b477aa94bfc9c0e567345f1a12918c7b */