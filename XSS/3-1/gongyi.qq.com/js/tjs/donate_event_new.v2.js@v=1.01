var MaxQQNumber = 4294960000; //2147000000
document.domain="qq.com";

if(window.top.location!=''){
	//var Windows_ThispageUrl	=window.top.location.protocol+"//"+window.top.location.host+window.top.location.pathname+window.top.location.search+window.top.location.hash;
	var Windows_ThispageUrl	=window.top.location.href;
}else{
	var Windows_ThispageUrl	=$.Tjs_GetThisPageUrl();
}

$.Tjs_setCookie("GY_ThisDo_Url",Windows_ThispageUrl,'','',"gongyi.qq.com");
var Windows_ThispageFun="";
var SERVER_TEMP			= $.Tjs_HtmlEncode(window.location.search.replace(/.*\?/,"")); //HtmlEncode 进行安全验证


/////////////
//取得数据信息以备初始化
var fclientkey="";
var clientkey="";
var clientuin="";
if(SERVER_TEMP!=""){
	var clientkey = $.Tjs_Get("clientkey");
	if(clientkey==""){
		var ADUIN = $.Tjs_Get("ADUIN");
		if(ADUIN!="") clientkey = "QQ0807";
	}else{
		if(clientkey.length>20)	{
			clientkey = "QQ0807";
			var fclientkey = clientkey;
		}
	}
	var clientuin = $.Tjs_Get("clientuin");	if(clientuin=="") clientuin =$.Tjs_Get("ADUIN");	
	if(clientkey) 	$.Tjs_setCookie("GY_ckey",clientkey,'','',"gongyi.qq.com");
}else{
	var clientkey = "";
	var clientuin = "";
}
if(!clientkey) 		var clientkey = $.Tjs_getCookie("GY_ckey");


if($.Tjs_getCookie("GY_P_STR")){
	if($.Tjs_getCookie("GY_P_STR"))			var P_STR = $.Tjs_getCookie("GY_P_STR").split("^|^");else var P_STR = new Array("","","");
	if($.Tjs_getCookie("GY_G_DONATOR"))		var P_STR_TMP = $.Tjs_getCookie("GY_G_DONATOR").split("^|^"); else var P_STR_TMP = new Array("","","");
	if(P_STR[0]==""){P_STR[0] = P_STR_TMP[1];}
	if(P_STR[1]==""){P_STR[1] = P_STR_TMP[0];}
}else{
	if($.Tjs_getCookie("GY_G_DONATOR"))		var P_STR_TMP = $.Tjs_getCookie("GY_G_DONATOR").split("^|^"); else var P_STR_TMP = new Array("","","");
	var P_STR = new Array(P_STR_TMP[1],P_STR_TMP[0],"");
}

var P_TN 	=	P_STR[0]?P_STR[0]:"";
var P_TQ 	=	P_STR[1]?P_STR[1]:"";
var P_TC 	=	P_STR[2]?P_STR[2]:"";
/////////////提取完成







//取ＩＰ地址ＣＯＯＫＩＥ，如果没有的话则直接拉
//2010-1-20 添加城市代码，如果捐赠者的城市所添和空，则默认一个值给他
if(!$.Tjs_getCookie('QQ_IPAddress')){
	$.getScript("http://fw.qq.com:80/ipaddress?"+Math.random(), function(){
		var expires = new Date();
		expires.setTime(expires.getTime() + 6 * 30 * 24 * 60 * 60 * 1000); //6个月有效
		ipvalue = IPData[2]+","+IPData[3];
		$.Tjs_setCookie("QQ_IPAddress",ipvalue,expires,'','gongyi.qq.com');
		var Global_QQ_IPAddress = ipvalue;
	});
}else{
	var Global_QQ_IPAddress 	= $.Tjs_getCookie('QQ_IPAddress');
}


function Link_Tools_ReplaceAll(p_strContent,p_strTag,p_strVal)
{
	var strTag = "\\$"+p_strTag+"\\$";
	var reg = new RegExp(strTag,"g");
	return p_strContent.replace(reg,p_strVal);
}

/*接口函数*/
/*
初始化捐款表单
obj : 表单对像
type: monthly月捐，abandon散捐
ProjectObj:初始化项目的信息对像：格式： {"Fund_Id":20,"Prog_id":46,"Even_Id":0,"ProjectName":"网添绿色-幸福家园生态扶贫全民行动"};
*/
var Global_InterFace_AbandOnFromInit = function(obj, type, ProjectObj){
	if(typeof type == "undefined") type = "abandon";

	obj.Even_Name.value = ProjectObj.ProjectName;
	obj.Fund_Id.value = ProjectObj.Fund_Id;
	obj.Prog_id.value = ProjectObj.Prog_id;
	obj.Even_Id.value = ProjectObj.Even_Id;
	
	if(type == "abandon")
	{
		if(P_TN) obj.nickname.value = P_TN;
		if(P_TQ) obj.qq.value = P_TQ;
		if(P_TC) obj.city.value = P_TC;
		
		if(clientuin) obj.qq.value = clientuin;
		if($.Tjs_getCookie("qqnick")) obj.nickname.value = $.Tjs_getCookie("qqnick");
	}
	
	if(clientkey){
		obj.clientkey.value = clientkey;
		obj.comewhere.value = clientkey;
	}else{
		try{
			obj.comewhere.value = window.location;
		}catch(e){
			obj.comewhere.value = "";
		};
	}
	
	if($.Tjs_getCookie("uin")) obj.qq.value =$.Tjs_getCookie("uin").replace(/^o0*/, "");
	if($.Tjs_getCookie("GY_invitekeyvalue")){
		obj.comewhere.value  = $.Tjs_getCookie("GY_invitekeyvalue");
	}
	
};

//月捐提交检查表单
var Global_InterFace_MonthlyCheckForm = function(StrFormName){
	var formobj = document.getElementById(StrFormName+"_payrequest");
	if(formobj.qq.value ==''){
		alert("必须录入月捐的QQ号");
		formobj.qq.focus();
		return false;
	}else{
		if(formobj.qq.value < 10000){
			alert("必须录入月捐的QQ号号码不合法，请重新录入");
			formobj.qq.focus();
			return false;
		}
	}
	
	var memo_str = formobj.memo.value;
	if(memo_str.length>0 && $.Tjs_StrLength(memo_str)>100){
		alert("您的祝福留言过长，请保留100个字符或50个汉字以内！");
		return false;
	}
	if(!formobj.loveplancheck.checked){
		alert("您必须接受捐赠协议才可以开通月捐");
		$('#loveplancheck').parent().css("border","1px solid #FF0000");
		return false;
	}
	return true;
};

//月捐提交检查表单
var Global_InterFace_MonthlyCheckForm_v2 = function(StrFormName){
	var formobj = document.getElementById(StrFormName+"_payrequest");
	if(formobj.qq.value ==''){
		alert("必须录入月捐的QQ号");
		formobj.qq.focus();
		return false;
	}else{
		if(formobj.qq.value < 10000){
			alert("必须录入月捐的QQ号号码不合法，请重新录入");
			formobj.qq.focus();
			return false;
		}
	}
	
	var memo_str = formobj.memo.value;
	if(memo_str.length>0 && $.Tjs_StrLength(memo_str)>100){
		alert("您的祝福留言过长，请保留100个字符或50个汉字以内！");
		return false;
	}

	if(!formobj.loveplancheck.checked)
	{
		alert("您必须接受捐赠协议才可以开通月捐");
		$('#loveplancheck').parent().css("border","1px solid #FF0000");
		return false;
	}			
	
	return true;
};

//月捐表单提交
var Global_InterFace_MonthlySubmit = function(StrFormName){
	if(Global_InterFace_MonthlyCheckForm(StrFormName)){
		Global_InterFace_OnSumit(StrFormName);
	}
};	  

//月捐选择开通方式
var Global_InterFace_SelectSubmitType = function(obj){
	if(obj.value=='8002'){
		$('#LovePlan_Tencent_Gongyi').hide();
		$('#Tencent_Gongyi').show();
		$('#UsedBanktoDonateObject').show();
	}else {
		$('#Tencent_Gongyi').hide();
		$('#LovePlan_Tencent_Gongyi').show();
		$('#UsedBanktoDonateObject').hide();
	}
};


//月捐表单提交
var Global_InterFace_MonthlySubmit_v4 = function(StrFormName,SelectSubmitType){
	Global_InterFace_SelectSubmitType(SelectSubmitType);
	document.getElementById('bank_type').value=SelectSubmitType;
	if(Global_InterFace_MonthlyCheckForm_v2(StrFormName)){
		Global_InterFace_OnSumit(StrFormName);
	}
};

var Global_InterFace_MonthlySubmit_v2 = function(StrFormName,SelectSubmitType){
	var strUin = "" ;
	var strSkey = "" ;
			
	strUin = $.Tjs_getCookie("uin") ;
	strSkey = $.Tjs_getCookie("skey") ;
	//设置g_tk值
	if(!!strSkey && strSkey.length>0) document.getElementById('monthly_g_tk').value = getACSRFToken(strSkey);
	
	if( strUin == null || strSkey == null ||  strUin.length <= 0 || strSkey.length <= 0 ){
		Global_InterFace_MonthlySubmit_v4(StrFormName,SelectSubmitType);
	}else{
		var _url = "https://www.tenpay.com/app/v1.0/communitylogin.cgi?p_uin=" + strUin + "&skey=" + strSkey + "&u1=&appid=113&win=self";
		
		var _iframe = $('#tenpay_iframe');
		if(_iframe[0]==null)
			$('<iframe id="tenpay_iframe" frameborder="0px" scroll="no" border="0px" src="'+_url+'" width="1px" height="1px"></iframe>').appendTo('body');
		else
			_iframe.attr('src',_url);
			
		var strBrowse = navigator.userAgent;
		if( strBrowse.indexOf("QQBrowser") > 0)
		{	
			Global_InterFace_MonthlySubmit_v4(StrFormName,SelectSubmitType);
		}
		else
		{
			setTimeout("Global_InterFace_MonthlySubmit_v4('"+ StrFormName+"',"+ SelectSubmitType + ")",500);  //无论成功与否	
		}
	}
};


var Global_interFace_CheckAbandonFrom_v2 = function(banktype){
	var formobj = Global_Win_AbandonFromObject;
	if(formobj.qq.value!="" && formobj.qq.value < 10000){
		alert("必须录入的捐款QQ号号码不合法，请重新录入");
		formobj.qq.focus();
		return false;
	}
	
	if(banktype == 8002){
		if(formobj.xiyiobject.checked) {
			$('#xiyiobject').parent().css('border','#FFFFFF 0px solid');
			Global_InterFace_SelectType(banktype,'ProjectDonateion');
		}else {
			$('#xiyiobject').parent().css('border','#FF0000 1px solid');
			alert('请选择确认《腾讯公益网用户协议》');
		}
	}else{
		if(formobj.xiyiobject.checked) {
			$('#xiyiobject').parent().css('border','#FFFFFF 0px solid');
			Global_InterFace_SelectType(banktype,'ProjectDonateion');
		}else {
			$('#xiyiobject').parent().css('border','#FF0000 1px solid');
			alert('请选择确认《腾讯公益网用户协议》');
		}
	}
};

//散捐表单检查，并提交 
var Global_InterFace_CheckAbandonFrom = function(banktype){
	var strUin = "" ;
	var strSkey = "" ;
			
	strUin = $.Tjs_getCookie("uin") ;
	strSkey = $.Tjs_getCookie("skey") ;
	//设置g_tk值
	if(!!strSkey && strSkey.length>0) document.getElementById('succor_g_tk').value = getACSRFToken(strSkey);
	if(strUin == null || strSkey == null || strUin.length <= 0 || strSkey.length <= 0 ){
		Global_interFace_CheckAbandonFrom_v2(banktype);
	}else{
  	 						
		var _url = "https://www.tenpay.com/app/v1.0/communitylogin.cgi?p_uin=" + strUin + "&skey=" + strSkey + "&u1=&appid=113&win=self";
		
		var _iframe = $('#tenpay_iframe');
		if(_iframe[0]==null)
			$('<iframe id="tenpay_iframe" frameborder="0px" scroll="no" border="0px" src="'+_url+'" width="1px" height="1px"></iframe>').appendTo('body');
		else
			_iframe.attr('src',_url);
			
		var strBrowse = navigator.userAgent;
		if( strBrowse.indexOf("QQBrowser") > 0)
		{
			Global_interFace_CheckAbandonFrom_v2(banktype);	
		}
		else
		{
			setTimeout("Global_interFace_CheckAbandonFrom_v2('"+ banktype+"')",500);
		}
	}
};


//处理样式切换
var Global_InterFace_SelectChangeCss = function (obj){
	if(obj.checked) {
		$(obj).parent().css('border','#FFFFFF 0px solid');
	}else{
		$(obj).parent().css('border','#FF0000 1px solid');
	}
};

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

/* 散捐选择其他，自行录入金额 */
function Global_InterFace_InputMoney(idvalue){
	if(idvalue=="-1"){
		$('#ProjectDonateion_other_num_div').show();
	}else{
		$('#ProjectDonateion_other_num_div').hide();
	}	
}


/* 选择捐赠方式 */
function Global_InterFace_SelectType(banktype,StrFormName)
{
	var formobject = document.getElementById(StrFormName+"_payrequest");
	var varBanktype=formobject.bank_type;
	varBanktype.value=banktype;
	Global_InterFace_OnSumit(StrFormName);	
}


function Global_InterFace_checkname(name)
{
  var reg=/^[\u4E00-\u9FA5a-zA-Z\d^\.、_\-\(\)\[\]\&\s]+$/g;
   if(!reg.test(name))
  {
         return false;
  }
     return true;
}



/* 财付通在线捐款JS	*/
//通用检查表单数据
function Global_InterFace_OnSumit(StrFormName){
	var formobject = document.getElementById(StrFormName+"_payrequest");
	var Div_Object = document.getElementById(StrFormName+"_other_num_div");
	var QQobject   = formobject.qq;
	var SubmitEven_Name  = formobject.Even_Name.vlaue;
	var SubmitFund_Id	= formobject.Fund_Id.vlaue;
	var SubmitProg_id	= formobject.Prog_id.vlaue;
	if(SubmitEven_Name == "" || SubmitFund_Id =="" || SubmitProg_id ==""){		
		alert("项目捐赠信息不能为空!");
		return false;
	}
	
	
	if(Div_Object.style.display==""){
		if(formobject.amountelse.value==""){
			alert("请输入捐赠金额!");
			Div_Object.style.dispaly="";
			formobject.amountelse.focus();
			return false;
		}else{
			var isvalue_num2 = parseInt(parseFloat(formobject.amountelse.value)*100);
			if(isvalue_num2<=0){
				//alert("金额必须大于0.01元"+isvalue_num2);
				alert("金额必须大于0.01元");
				return false;
			}
		}
	}
	
	if(formobject.city.value == '' && typeof(Global_QQ_IPAddress)!="undefined"){
		formobject.city.value = Global_QQ_IPAddress;
	}
	


	if(formobject.nickname.value!="" && !Global_InterFace_checkname(formobject.nickname.value))
	{
		alert("捐赠不合法,只允许输入数字,英文字母和汉字!建议您重新修改捐赠名！")
		formobject.nickname.select();
		formobject.nickname.focus();
		return false;
	}
	
	if(QQobject.value!="" && isNaN(QQobject.value))
	{
	   alert("QQ号必须为数字");
	   QQobject.value="";
	   QQobject.focus();
	   return false;
	}else{
		if(parseInt(QQobject.value) > MaxQQNumber){
		   alert("QQ号有误!");
		   QQobject.value="";
		   QQobject.focus();
		   return false;
		}
	}

	
	
	var textLength = $.Tjs_StrLength(formobject.memo.value);
	if(textLength > 100){
		//alert("请填写小于50汉字或100个字符的留言!");
		alert("您的祝福留言过长，请保留100个字符或50个汉字以内！");
		formobject.memo.select();
		formobject.memo.focus();
		return false;
	}



	Global_InterFace_Do_Donate(StrFormName);
}


//提交捐赠表单
var Global_InterFace_Do_Donate = function(StrFormName)
{
	var formobject = document.getElementById(StrFormName+"_payrequest");
	var expires = new Date();
	expires.setTime(expires.getTime() + 12 * 30 * 24 * 60 * 60 * 1000); //1年有效
	var ThisFromNick_Value	= formobject.nickname.value;
	var ThisFromQQ_Value	= formobject.qq.value;
	var ThisFromCity_Value	= formobject.city.value;	
	var CookieStrValue =ThisFromNick_Value+"^|^"+ThisFromQQ_Value+"^|^"+ThisFromCity_Value 
	$.Tjs_setCookie("GY_P_STR",CookieStrValue,expires,'','gongyi.qq.com');

	if (!$.Tjs_getCookie("uin") || !$.Tjs_getCookie("skey")){
		formobject.submit();
	}else{
		var QQobject   = formobject.qq;
		if(QQobject.value=='')
			QQobject.value = $.Tjs_getCookie("uin").replace(/^o0*/, "");
		formobject.submit();
	}
};
/*　 财付通在线捐款结束	*/


/* COPY THISPAGE URL*/
function Global_InterFace_CopyUrlThispage(fontobject)
{	
	$.Tjs_JsCopyTo(window.location.toString());
	$(fontobject).html("<font color='#FF0000'>复制成功</font>");
}

function getACSRFToken(str){   
    var hash = 5381;   
    for(var i = 0, len = str.length; i < len; ++i){   
        hash += (hash << 5) + str.charAt(i).charCodeAt();   
    }   
    return hash & 0x7fffffff;   
};/*  |xGv00|ea2e3ad27225e55486f057a352e2f4dd */