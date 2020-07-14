// JavaScript Document

var site_url = window.location.href.toLowerCase();	
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
};



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
	//$('#'+objectname).html(HtmlCodeFormat);
	document.getElementById(objectname).innerHTML = HtmlCodeFormat;
};


var LoveplanInitPageHeardLogininfo = function(jsobject){
	var ideafeek = "http://support.qq.com/beta2/simple/index.html?fid=358";	
	var LoginHtmlCode = "";
	if(jsobject.global_gongyiuserinfo == 0){
		LoginHtmlCode = '您好，[<a href="javascript:ptloginopenfun();void(0);">请登录</a>]<a href="http://gongyi.qq.com">公益网首页</a><a href="http://gongyi.qq.com/loveplan/">月捐计划</a><a href="http://gongyi.qq.com/npo">公益生活</a><a href="'+ideafeek+'"  target=\"_blank\">反馈意见</a>';
	}else{
		LoginHtmlCode = '您好，<a href="http://gongyi.qq.com/mygongyi.htm">'+jsobject.jsonnick+'</a>[<a href="javascript:ptlogoutopenfun(\'\')">退出</a>]<a href="http://gongyi.qq.com">公益网首页</a><a href="http://gongyi.qq.com/loveplan/">月捐计划</a><a href="http://gongyi.qq.com/npo">公益生活</a><a href="'+ideafeek+'"  target=\"_blank\">反馈意见</a>';
	}
	//$('#LoveplanLoingHeardObjectname').html(LoginHtmlCode);
	document.getElementById('LoveplanLoingHeardObjectname').innerHTML = LoginHtmlCode;
}


var LoveplanInitLogininfo = function(Objectname,npoflag){
	/*关闭*/
	//document.getElementById(Objectname).style.display='none';	
	LoveplanInitPageHeardLogininfo(global_userinfoobject);
	//return false;
	
	var HtmlCode ="";
	if(global_userinfoobject.global_gongyiuserinfo == 1){
		var global_appurl = global_userinfoobject.appurl;
		var global_usertype = global_userinfoobject.usertype;
		//global_usertype = 3;
		if(global_usertype == 0 || global_usertype ==2){
			HtmlCode+="<div class=\"fensi\">";
			HtmlCode+="  <div class=\"top\"><img src=\""+global_userinfoobject.userlog+"/60\"  id='UserImgOBjectId' width=60 />";
			HtmlCode+="    <h3 class=\"STYLE2\" id='UserNameOBjectId' style='height:30px; width:120px; overflow:hidden;' title="+global_userinfoobject.jsonnick+">"+global_userinfoobject.jsonnick+"</h3>";
	
			if(global_userinfoobject.qq_lovestep>0){ //var ClassNameLv = "open";else  var ClassNameLv = "close";
				HtmlCode+="    <span style='float:left;width:55px'>成长阶段</span><span  class=\"gongyi_level open\" style='float:left;margin:0px aux;' title='爱心积分:"+global_userinfoobject.qq_loveindex+"'><i class=\"lv\"></i><em class=\"num"+global_userinfoobject.qq_lovestep+"\"></em></span> </div>";
			}else{
				HtmlCode+="    <span style='float:left;width:55px'>&nbsp;</span></div>";
			}
	
			HtmlCode+="  <dl>";
			if(typeof(global_uinobject)=="undefined" || typeof(global_uinobject.total_Money_Num)=="undefined" || global_uinobject.total_Money_Num<=0 )
			{
				HtmlCode+="    <p style='margin-left:15px;margin-bottom:10px;'>参与<a href='http://gongyi.qq.com/loveplan/' target='_blank'>月捐计划</a>，点亮公益勋章</p>";
			}
			else
			{
				HtmlCode+="    <dt>月捐计划：</dt>";
				HtmlCode+="    <dd>本月已成功捐款<a href=\""+global_appurl+"_MonthlyList\">( <strong>"+global_uinobject.thismonthly_project_sucess+"</strong> )</a></dd>";
				HtmlCode+="    <dd>未成功捐款<a href=\""+global_appurl+"_MonthlyList\">( <strong>"+global_uinobject.thismonthly_project_fail+"</strong> )</a></dd>";
				HtmlCode+="    <p></p>";
				HtmlCode+="    <p></p>";
			
			}//参与月捐计划，点亮公益勋章
			
			
			if(global_uinobject.EnterTotal_Cnt==null||global_uinobject.EnterTotal_Cnt<=0)
			{
				HtmlCode+="   <p style='margin-left:15px;margin-bottom:10px;'>参与<a href='http://gongyi.qq.com/npo/PNEvent_list.htm'>公益活动</a>，开启你的公益生活</p>";
			}
			else
			{
				HtmlCode+="    <p style=\" margin-left:15px\" >公益活动：  参加公益活动<a href=\""+global_appurl+"_MyactivityList\">( <strong>"+global_uinobject.EnterTotal_Cnt+"</strong> )</a></p>";
				HtmlCode+="    ";
			}
	
			HtmlCode+="  </dl>";
			if(global_usertype == 0 )
			{
				HtmlCode+="  <p class=\"top_right\"  ><a style=\" margin-left:10px\" href=\"http://gongyi.qq.com/mygongyi.htm\">进入个人中心>></a></p>";
				HtmlCode+="  <p class=\"p5\" ><span  class=\"sp1\">&nbsp;&nbsp;<a  href=\""+global_appurl+"_OrgInputInfo\">公益组织注册</a></span><br><span class=\"sp2\">";
				HtmlCode+="	  &nbsp;&nbsp;<a  href=\""+global_appurl+"_VolunterInputInfo\">志愿者注册</a></span></p>";
			}
			else
			{
				HtmlCode+="  <p class=\"top_right\"  ><a style=\" margin-left:10px\" href=\"http://gongyi.qq.com/mygongyi.htm\">进入个人中心>></a></p>";
				HtmlCode+="  <p class=\"p5\">&nbsp;&nbsp;<span class=\"sp1\"><a href=\""+global_appurl+"_OrgInputInfo\">公益组织注册</a></span></p>";
			}
			
			HtmlCode+="</div>";
				
		}else if(global_usertype == 1 || global_usertype ==3){
				if(global_userinfoobject.npousernames[0] == null)
					global_userinfoobject.npousernames[0] = global_userinfoobject.npousernames[1] = global_userinfoobject.npousernames[2] = global_userinfoobject.nick;
					
				HtmlCode+="<div class=\"fensi\">";
				HtmlCode+="  <div class=\"top\"><img src=\""+global_userinfoobject.npolog+"/60\" width=60 />";
				HtmlCode+="	<h3 class=\"STYLE2\" id='UserNameOBjectId' style='height:30px; width:120px; overflow:hidden;margin-top:20px;' title=\""+global_userinfoobject.npousernames[0]+"\">"+global_userinfoobject.npousernames[0].substr(0,8)+"</h3>";
				HtmlCode+="	</div>";
				
				if(global_uinobject.npoactivity_orginfo!="" && ( global_uinobject.npoactivity_orginfo[0]!=0 || global_uinobject.EnterTotal_Cnt!=0))
				{
					HtmlCode+="  <dl>";
					HtmlCode+="    <p></p>";
					HtmlCode+="    <p></p>";
					HtmlCode+="    <dt>公益活动：</dt>";
					HtmlCode+="	<dd>已发布的活动<a href=\""+global_appurl+"organizer/pagePiece/2/1/0\" target=\"_blank\">( <strong>"+global_uinobject.npoactivity_orginfo[0]+"</strong> )</a></dd>";
					HtmlCode+="	<dd>待总结的活动<a href=\""+global_appurl+"_WaitSumUp\" target=\"_blank\">( <strong>"+global_uinobject.npoactivity_orginfo[6]+"</strong> )</a></dd>";
					HtmlCode+="  </dl>";			
				}
				else
				{
					HtmlCode+="  <dl>";
					HtmlCode+="    <dt style='height:50px;'>您的公益组织已成功通过审核，您可以发起公益活动、发布优秀项目，与爱心网友畅快互动。</dt>";
					HtmlCode+="    <p></p>";
					HtmlCode+="    <p></p>";
					HtmlCode+="  </dl>";
				}
				HtmlCode+="  <p class=\"top_left\" ><a style=\" margin-left:15px\"  href=\""+global_appurl+"_OrgCenter\">进入管理中心>></a><a  style=\" margin-left:22px\" href=\"http://gongyi.qq.com/mygongyi.htm\">进入个人中心>></a></p>";
				if( global_usertype == 1 ) HtmlCode+="  <p class=\"p5\" style=\" margin-right:15px\">&nbsp;&nbsp;&nbsp;<span class=\"sp2\"><a  href=\""+global_appurl+"_VolunterInputInfo\">志愿者注册</a></span></p>";
				HtmlCode+="</div>";
		}		
	}else{

		var HtmlCode = "";
		HtmlCode+="<div class=\"login\"><a href=\"javascript:ptloginopenfun();\"><img src=\"http://mat1.gtimg.com/gongyi/2011images/2011loveplan/public/images/login_online.jpg\" width=\"191\" height=\"40\" /></a> 登录后，您可以：";
		HtmlCode+="  <ul>";
		HtmlCode+="	<li><a href=\"http://gongyi.qq.com/mygongyi.htm\" target=\"_blank\">查看您的公益成长动态</a></li>";
		HtmlCode+="	<li><a href=\"http://npoapp.gongyi.qq.com/_MonthlyList\" target=\"_blank\">查看您的月捐记录</a></li>";
		HtmlCode+="  </ul>";
		HtmlCode+="</div>";
	}
	
	document.getElementById(Objectname).innerHTML = HtmlCode;
}
/*  |xGv00|5c3ab15014d3ba1787b4a187a1ff802f */