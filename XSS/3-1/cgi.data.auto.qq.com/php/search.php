<!doctype html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>高级搜索_车型大全_腾讯汽车</title><link href="//auto.qq.com/css/datalib/search/css_searcr_v2.8.css" rel="stylesheet" type="text/css" />
<script language="javascript" src="//auto.qq.com/js/datalib/common.js"></script>
<script>
String.prototype.getLength=function()
{
  return this.replace(/[^ -�]/gi,'xx').length;
}
function del_url_params(url,name)
{
	var reg=new RegExp("([\?|&])"+name+"=([^&]*)");
	return url.replace(reg,"").replace("#","");
}
function set_url_params(name,value)
{
	url=location.href;
	if(location.href.match('manufacturer_id')!=null)
	{
		url=url.replace(/[\?]*/i,"").replace("#","");
	}
	if(name!='brand_id' && name!='page_no')
	{
		url=del_url_params(url,'brand_id');
		url=del_url_params(url,'page_no');
	}
	if(name=='brand_id')
	{
		url=del_url_params(url,'page_no');
	}
	if(location.href.match(name)!=null)
	{
		var reg=new RegExp("([\?|&])"+name+"=([^&]*)");
		location.href=url.replace(reg,"$1"+name+"="+escape(value)).replace("#","");
	}else{
		if(location.href.match(/\?/i)!=null)
		{
			location.href=url+"&"+name+"="+value;
		}else{
			location.href=url+"?"+name+"="+value;
		}
	}
}
function FBossStatSearch(sOp,value,obj)
{
	if(obj.className=='selected_2')
	{
		return ;
	}
	var uin = FgetUin();
	if ( uin == false )
	{
	    uin='';
	}
	g_boss_img.src = "//btrace.qq.com/collect?sIp=&iQQ=" + uin + "&sBiz=&sOp="+ sOp +"&iSta=&iTy=1148&iFlow=&iType=" + value;
}
function set_and_href(name,value)
{
	set_url_params(name,value);
}
function set_or_href(name,value)
{
	var tmp_int=parseInt(get_url_params(name));
	var tmp_value=parseInt(value);
	//没有，则加入
	if(tmp_value==0)
	{
		set_url_params(name,0);
		return false;
	}
	if((tmp_int & tmp_value)==tmp_value)
	{
		//已经选择过的，则抹掉
		if(tmp_int!=NaN)
		{
			tmp_int^=tmp_value;
		}
	}else{
		if(tmp_int!=NaN)
		{
			tmp_int|=tmp_value;
		}
	}
	set_url_params(name,tmp_int);
}
function set_mem_href()
{
	var url_begin=window.location.href.indexOf(".php");
	var url_string=window.location.href.substr(url_begin+4);
	var brand_id=get_url_params('brand_id');
	//mem_mesosphere template
	var mem_url="//cgi.data.auto.qq.com/php/mem_mesosphere.php"+url_string;
	//var mem_url="//cgi.data.auto.qq.com/car_public/template/mem_mesosphere.php"+url_string;
	//mem_mesosphere end
	JsLoader.load("search_mem",mem_url,function(){
	var tmp_str='';
	if(brand_json_str)
	{
	    if ($$("search_brand_num")) {
		    $$("search_brand_num").innerHTML="符合您选择条件的厂商("+brand_json_str.length+")";
		}		
		var brand_json_arr_num=0;
		for(key in brand_json_str)
		{
			if(brand_json_str[key][1]!=undefined)
			{
				brand_json_arr_num++;
				if(brand_json_arr_num==14)
				{
					tmp_str+='<li id="brand_more_show_li_open"><a href="#" onclick="return set_brand_more_show(true);"><img src="//mat1.gtimg.com/auto/datalib/newindex/moresb.gif" /></a></li><div style="display:none;" id="brand_more_show">';
				}
				tmp_str+='<li id="brand_show_'+brand_json_str[key][0]+'"';
				if(brand_id==brand_json_str[key][0])
				{
					tmp_str+='><span class="selected_2"><a href="#" onclick="javascript:set_and_href(\'brand_id\',0);" title="'+brand_json_str[key][2]+'">'
				}else{
					tmp_str+='><a href="#" onclick="javascript:set_and_href(\'brand_id\','+brand_json_str[key][3]+');" title="'+brand_json_str[key][2]+'">';
				}
				tmp_str+=brand_json_str[key][1];
				if(brand_id==brand_json_str[key][0])
				{
					tmp_str+='</a></span>';
				}else{
					tmp_str+='</a>';
				}
				tmp_str+='</li>';
			}
		}
		if(brand_json_arr_num>=14)
		{
			tmp_str+='</div><li style="display:none;" id="brand_more_show_li_close"><a href="#" onclick="return set_brand_more_show(false);"><img src="//mat1.gtimg.com/auto/datalib/newindex/moresb_b.gif" /></a></li>';
		}
		if ($$("search_brand_list")) {
		    $$("search_brand_list").innerHTML=tmp_str;
		}
		//if the brand_id is selected,always open
		if((brand_id!='' && brand_id!=0)&&brand_json_arr_num>=14)
		{
			set_brand_more_show(true);
		}
	}
});
}
function set_brand_more_show(flag)
{
	if(flag==true)
	{
		$$("brand_more_show").style.display="block";
		$$("brand_more_show_li_open").style.display="none";
		$$("brand_more_show_li_close").style.display="block";
	}else{
		$$("brand_more_show").style.display="none";
		$$("brand_more_show_li_open").style.display="block";
		$$("brand_more_show_li_close").style.display="none";
	}
	return false;
}
function show_model_hid_id(id)
{
	if($$('model_hid_id_'+id).style.display=='none')
	{
		$$('model_hid_id_'+id).style.display='block';
		$$('model_div_id_'+id).style.display="none";
		$$('model_table_id_'+id).style.display="block";
	}else{
		$$('model_hid_id_'+id).style.display='none';
		$$('model_div_id_'+id).style.display="block";
		$$('model_table_id_'+id).style.display="none";
	}
	return true;
}
function mouseout_model_hid_id(id)
{
	if($$('model_hid_id_'+id).style.display=='none')
	{
		$$('model_table_id_'+id).className='outbg';
	}else{
		$$('model_table_id_'+id).className='outzkbg';
	}
	return false;
}
function Fempty(v){
	if(v!=null && (typeof(v)=='object' || typeof(v)=='function')) return false;
	return ((""==v || undefined==v || null==v)?true:false);
}
function change_page2(page_no)
{
	if(page_no=='')
	{
		return false;
	}
	if(page_no>127)
	{
		return false;
	}
	if(page_no<1)
	{
		return false;
	}
	set_and_href('page_no',page_no);
	return false;
}
function change_page()
{
	var page_no=parseInt($$('change_page_id').value);
	
	if(page_no=='')
	{
		alert("请填写页数");
		$$('change_page_id').focus();
		return false;
	}
	
	if(isNaN(page_no)==true)
	{
		alert("填写的页数格式不是数字");
		$$('change_page_id').focus();
		return false;
	}
	if(page_no>127)
	{
		alert("超过最大页数,最大页数为:127");
		$$('change_page_id').focus();
		return false;
	}
	if(page_no<1)
	{
		alert("超过最小页数,最小页数为:1");
		$$('change_page_id').focus();
		return false;
	}
	set_and_href('page_no',page_no);
	return false;
}
function change_page_bottom()
{
	var page_no=parseInt($$('change_page_id_bottom').value);
	
	if(page_no=='')
	{
		alert("请填写页数");
		$$('change_page_id_bottom').focus();
		return false;
	}
	
	if(isNaN(page_no)==true)
	{
		alert("填写的页数格式不是数字");
		$$('change_page_id_bottom').focus();
		return false;
	}
	if(page_no>127)
	{
		alert("超过最大页数,最大页数为:127");
		$$('change_page_id_bottom').focus();
		return false;
	}
	if(page_no<1)
	{
		alert("超过最小页数,最小页数为:1");
		$$('change_page_id_bottom').focus();
		return false;
	}
	set_and_href('page_no',page_no);
	return false;
}
function change_page_order()
{
	page_order=$$('page_order_id').value;
	set_and_href('order',page_order);
	return false;
}
function change_page_order2()
{
	page_order=$$('page_order_id2').value;
	set_and_href('order',page_order);
	return false;
}

function StringBuffer() {
	this._strings_ = new Array;
}

StringBuffer.prototype.append = function(str) {
	this._strings_.push(str);
}

StringBuffer.prototype.toString = function() {
	return this._strings_.join("");
}

StringBuffer.prototype.reset= function() {
	this._strings_ = new Array;
}

function addReviewCompare()
{
	var chkboxs = $$("reviewBott").getElementsByTagName("input");
	var toAdds = new Array();
	for(var i=0;i<chkboxs.length;i++)
	{
		if(chkboxs[i].name.indexOf("checkbox_")!=-1)
		{
			if(chkboxs[i].checked)
			{
				toAdds.push(chkboxs[i].value);
				/*var value_arr=chkboxs[i].value.split('|');
				if(value_arr.length==2)
				{
					addCompareItem(value_arr[0],value_arr[1]);
				}*/
			}
		}
	}
	var arrLen=0;
	if(Cookie.getCookie("wz_autoapp_compare")!=null)
	{
		var exItems = Cookie.getCookie("wz_autoapp_compare").split("|");
		arrLen=exItems.length;
	}
		if(arrLen==5)
		{
			alert("对不起，您已经添了5款车型，请至少删除一款再添加!");
			return;
		}
		else if((arrLen+toAdds.length)>5)
		{
			alert("对不起，您只能再添加"+(5-arrLen)+"款车型!");
			return;	
		}
		else
		{
			for(var j = 0;j<toAdds.length;j++)
			{
					var value_arr=toAdds[j].split('|');
					if(value_arr.length==2)
					{
						addCompareItem(value_arr[0],value_arr[1]);
					}		
			}
		}
}

// 从左边截取n个字符，如果包含汉字，则汉字按两个字符计算  
function FstrLeft(s, n) 
{  
     var s2 = s.slice(0, n),  i = s2.replace(/[^ -�]/g, "**").length;  
     if (i <= n) return s2;  
     i -= s2.length;  
     switch (i) 
	 {  
         case 0: return s2;  
         case n: return s.slice(0, n>>1);  
         default:  
             var k = n - i,s3 = s.slice(k, n), j = s3.replace(/[ -�]/g, "").length;
             return j ? s.slice(0, k) + FstrLeft(s3, j) : s.slice(0, k);  
     }
}

function initReviewModels()
{
	var reviewModels = Cookie.getCookie("wz_autoapp_reviewmodels");
	var strBott = new StringBuffer();
	
	if(!reviewModels)
	{
			strBott.append('<table width="860" border="0" cellpadding="0" cellspacing="0" class="mart10 marb10" style="margin-left:15px;">');
			strBott.append('<tr>');
			strBott.append('<td align="center">暂无浏览车型</td>');
			strBott.append('</tr>');
			strBott.append('</table>');
			
	}
	else
	{
	
			var arrModels = reviewModels.split("|");
						
			strBott.append('<table width="860" border="0" cellpadding="0" cellspacing="0" class="mart10 marb10" style="margin-left:15px;">');
			strBott.append('<tr>');

			var i=0
			for(;i<arrModels.length;i++)
			{
				var strModel = arrModels[i].split(',');
				strBott.append('<td width="190" height="28" title="'+strModel[0]+'" ><input type="checkbox" id="check_bot_'+i+'" ctext='+strModel[0]+' name="checkbox_'+i+'" value="'+strModel[1]+'|'+strModel[0]+'" />'+FstrLeft(strModel[0],24)+'</td>');

			}
			
			for(var j=i;j<4;j++)
			{
				strBott.append('<td width="190" height="28">&nbsp;</td>');
			}
			
			
			strBott.append('<td width="88" align="right"><a href="javascript:void(0)" onclick="addReviewCompare();"><img src="//mat1.gtimg.com/auto/datalib/newcompare/dbbut1.gif" /></a></td>');
			strBott.append('</tr>');
			strBott.append('</table>');
	
	}
	
	if($$("reviewBott"))
	{
		$$("reviewBott").innerHTML = strBott.toString();
	}
	
}
function mouseonit(obj)
{
	if(obj.className=='')
	{
		obj.className="selected_3";
	}
}
function mouseoutit(obj)
{
	if(obj.className=='selected_3')
	{
		obj.className="";
	}
}
</script>
</head>

<body>
<style type="text/css">
/*带一键登录全站迷你导航960宽*/
.mininav div{margin:0;padding:0;}
.mininav{width:100%;height:28px;background:#fdfdfd url(http://mat1.gtimg.com/www/images/qq2012/mininav.png) repeat-x top center;border-bottom:1px solid #ebebeb;}
.mininavInner{width:960px;height:28px;margin:0 auto!important;}
.mininavInner a{color:#666;text-decoration:none;font-family:"宋体";}
.mininavInner a:hover{color:#2d374b;}
.mininavInner .mininavLeft{float:left;margin-top:8px;color:#c7c7c7;font-size:12px;}
.mininavInner .mininavLeft .fl{color:#c7c7c7;}
</style>
<div class="mininav">
	<div class="mininavInner">
		<div class="mininavLeft">
			<div class="fl">
				<a href="http://www.qq.com/" target="_blank" id="qqindex">腾讯网首页</a> | <a href="http://www.qq.com/map/" target="_blank" id="webmap">网站地图</a>
			</div>
		</div>
		<style type="text/css">
ul,li{margin:0;padding:0;}
li{list-style:none;}
.fl{float:left;}
.fr{float:right;}
.dis{display:block;}
.undis{display:none;}
.loginSmartTop,.loginSmartBottom{background-image:url(http://mat1.gtimg.com/www/images/qq2012/qqbg_1.5.2.png); background-repeat:no-repeat;}
a.login,a.login:hover,a.weiboLogin,a.weiboLogin:hover,a.qzoneLogin,a.qzoneLogin:hover,a.mailLogin,a.mailLogin:hover,a.pengyouLogin,a.pengyouLogin:hover,.mininavRight .weibo,.mininavRight .weibo:hover,.mininavRight .qzone,.mininavRight .qzone:hover,.mininavRight .mail,.mininavRight .mail:hover,.mininavRight .pengyou,.mininavRight .pengyou:hover{background-image:url(http://mat1.gtimg.com/www/images/qq2012/loginall_1.2.png); background-repeat:no-repeat;}
a.login{width:70px;height:28px;display:block;float:right;background-position:left -450px;}
a.login:hover{background-position:left -500px;}
a.weiboLogin{width:30px;height:28px;display:block;float:right;background-position:left -50px;}
a.weiboLogin:hover{background-position:right -50px;}
a.qzoneLogin{width:30px;height:28px;display:block;float:right;background-position:left -100px;}
a.qzoneLogin:hover{background-position:right -100px;}
a.mailLogin{width:30px;height:28px;display:block;float:right;background-position:left -150px;}
a.mailLogin:hover{background-position:right -150px;}
a.pengyouLogin{width:28px;height:28px;display:block;float:right;background-position:left -200px;}
a.pengyouLogin:hover{background-position:right -200px;}
.mininavRight{font-size:12px;}
.mininavRight .weibo{background-position:7px -243px;}
.mininavRight .weibo:hover{background-position:-79px -243px;}
.mininavRight .qzone{background-position:7px -294px;}
.mininavRight .qzone:hover{background-position:-74px -294px;}
.mininavRight .mail{background-position:7px -340px;}
.mininavRight .mail:hover{background-position:-77px -340px;}
.mininavRight .pengyou{background-position:7px -394px;}
.mininavRight .pengyou:hover{background-position:-76px -394px;}
.mininavRight{float:right;color:#c7c7c7;line-height:28px;}
.mininavRight a{color:#666;}
.mininavRight .qqNameLayout{margin-right:4px;color:#c7c7c7;}
.mininavRight .qqName{margin-right:12px;color:#666;float:left;}
.mininavRight .weibo{font-family:Tahoma,"宋体";padding:0 7px;display:block;height:28px;float:left;text-indent:17px;}
.mininavRight .weibo:hover{color:#fff;background-color:#458fce;}
.mininavRight .qzone{font-family:Tahoma,"宋体";padding:0 7px;display:block;height:28px;float:left;text-indent:22px;}
.mininavRight .qzone:hover{color:#fff;background-color:#458fce;}
.mininavRight .mail{font-family:Tahoma,"宋体";padding:0 7px;display:block;height:28px;float:left;text-indent:19px;}
.mininavRight .mail:hover{color:#fff;background-color:#458fce;}
.mininavRight .pengyou{font-family:Tahoma,"宋体";padding:0 7px;display:block;height:28px;float:left;text-indent:20px;}
.mininavRight .pengyou:hover{color:#fff;background-color:#458fce;}
.loginSmartBox{width:120px;height:auto;background:#fffbef;position:absolute;top:28px;z-index:100;}
.loginSmartTop{width:120px;height:3px;overflow:hidden;background-position:-350px -210px;}
.loginSmartBottom{width:120px;height:3px;overflow:hidden;background-position:-350px -230px;}
.loginSmartContent{width:118px;border-left:1px solid #f1f1f1;border-right:1px solid #f1f1f1;}
.loginSmartInner{width:116px;border-left:1px solid #f4d9a4;border-right:1px solid #f4d9a4;}
.loginSmartInner ul{width:100%;padding:2px 0;}
.loginSmartInner li{width:100%;height:20px;line-height:20px;color:#666;text-indent:8px;text-align:left;}
.loginSmartInner li a{color:#666;}
.loginSmartInner li a:hover span{color:#cd0200;}
.loginSmartInner li a span,.loginSmartInner li a:hover span{font-family:Tahoma;}
#pengyouIcon{position:relative;z-index:10000;}
#mailIcon{position:relative;z-index:10000;}
#qzoneIcon{position:relative;z-index:10000;}
#weiboIcon{position:relative;z-index:10000;}
#loginOut:hover{text-decoration:underline;color:#cd0200;}
.loginBg{width:100%;min-width:1024px;position:absolute;top:0;left:0;z-index:8888;display:none;background:url(http://mat1.gtimg.com/www/images/qq2012/alphabg.png); _background:#000;_opacity:0.3_;filter:alpha(opacity=30);}

.mininavRight .qzone{width:auto;}
.mininavLeft div{line-height:14px;}
.mininavRight div{line-height:28px;}
</style>

<div class="mininavRight" id="logkey">
	<div id="loginAll" class="fr">
		<a href="http://mail.qq.com" class="mailLogin" id="qmail" target="_blank"></a>
		<a href="http://qzone.qq.com" class="qzoneLogin" id="qzone" target="_blank"></a>
		<a href="http://t.qq.com?pref=qqcom.home.weiboIN" class="weiboLogin" id="weibo" target="_blank"></a>
		<a href="javascript:void(0);" class="login" onclick="userLogin();" target="_self" id="onekey"></a>
	</div>
	<div id="logined" class="fr" style="display:none;">
		<div id="mailIcon" class="fr">
			<a href="http://mail.qq.com" class="mail" id="mailNum" style="padding:0 15px;" target="_blank"></a>
			<div class="loginSmartBox undis" id="mailSmart" style="right:0;">
				<div class="loginSmartTop"></div>
				<div class="loginSmartContent">
					<div class="loginSmartInner">
						<ul>
							<li id="mailTitle">QQ邮箱:</li>
							<li id="inboxLi" class="undis"><a href="http://mail.qq.com" target="_blank">未读邮件 (<span id="inboxNum"></span>)</a></li>
							<li id="bottleLi" class="undis"><a href="http://mail.qq.com" target="_blank">漂流瓶 (<span id="bottleNum"></span>)</a></li>
							<li id="gmailLi" class="undis"><a href="http://mail.qq.com" target="_blank">群邮件 (<span id="gmailNum"></span>)</a></li>
							<li id="dmailLi" class="undis"><a href="http://mail.qq.com" target="_blank">文件夹 (<span id="dmailNum"></span>)</a></li>
						</ul>
					</div>
				</div>
				<div class="loginSmartBottom"></div>
			</div>
		</div>
		<div id="qzoneIcon" class="fr">
			<a href="http://qzone.qq.com" class="qzone" id="qzoneNum" style="padding:0 16px;" target="_blank"></a>
			<div class="loginSmartBox undis" id="qzoneSmart" style="right:0;">
				<div class="loginSmartTop"></div>
				<div class="loginSmartContent">
					<div class="loginSmartInner">
						<ul>
							<li id="qzoneTitle">QQ空间:</li>
							<li id="passiveLi" class="undis"><a href="http://qzone.qq.com" target="_blank">我的动态 (<span id="passiveNum"></span>)</a></li>
							<li id="InitLi" class="undis"><a href="http://qzone.qq.com" target="_blank">好友动态 (<span id="InitNum"></span>)</a></li>
							<li id="AboutLi" class="undis"><a href="http://qzone.qq.com" target="_blank">我的参与 (<span id="AboutNum"></span>)</a></li>
						</ul>
					</div>
				</div>
				<div class="loginSmartBottom"></div>
			</div>
		</div>
		<div id="weiboIcon" class="fr">
			<a href="http://t.qq.com?pref=qqcom.home.weiboenter" class="weibo" id="weiboNum" style="padding:0 14px;" target="_blank"></a>
			<div class="loginSmartBox undis" id="weiboSmart" style="left:0;">
				<div class="loginSmartTop"></div>
				<div class="loginSmartContent">
					<div class="loginSmartInner">
						<ul>
							<li id="weiboTitle">腾讯微博:</li>
							<li id="msgLi" class="undis"><a href="http://t.qq.com/messages/inbox?pref=qqcom.home.wbinbox" target="_blank">私信 (<span id="msgNum"></span>)</a></li>
							<li id="atLi" class="undis"><a href="http://t.qq.com/at?pref=qqcom.home.wbat" target="_blank">提到我的 (<span id="atNum"></span>)</a></li>
							<li id="fansLi" class="undis"><a href="http://t.qq.com/follower.php?pref=qqcom.home.wbfollow" target="_blank">新增听众 (<span id="fansNum"></span>)</a></li>
						</ul>
					</div>
				</div>
				<div class="loginSmartBottom"></div>
			</div>
		</div>
		<div class="qqNameLayout fr">
			<span class="qqName">您好，<span id="userName"></span> <span>[</span><a href="javascript:void(0);" id="loginOut" target="_self">退出</a><span>]</span></span>|
		</div>
	</div>
</div>

<div id="loginBg" class="loginBg"></div>
<div id="login_div" style="position:fixed;_position:absolute;width:400px;height:382px;padding:0;margin:0;top:50%;left:-9999px;margin:-165px 0 0 -276px;_margin-top:0;z-index:99999;visibility:hidden;">
	<iframe id="login_frame" height="100%" scrolling="auto" width="100%" frameborder="0" src=""></iframe>
</div> 

<script type="text/javascript">var MI = {};(function(b){var a=document.createElement("script");a.setAttribute("charset","utf-8");a.setAttribute("type","text/javascript");a.setAttribute("src",b);document.getElementsByTagName("head")[0].appendChild(a)})("http://mat1.gtimg.com/www/mb/js/portal/mi.MiniNav__v1.0.0.js");</script>

<script type="text/javascript">
//<![CDATA[ 
document.domain="qq.com";
function ptlogin2_onResize(width, height) {
	//获得浮动Div对象
	login_wnd = document.getElementById("login_div");
	if (login_wnd)  {
		//重新设置大小注意，一定要加px，否则firefox下有问题
		login_wnd.style.width = width + "px";
		login_wnd.style.height = height + "px";
		//最好重新调整登录框的位置， 这儿略....
		//先隐藏，在显示，这样可以避免滚动条的出现
		login_wnd.style.visibility = "hidden"
		login_wnd.style.visibility = "visible"
		login_wnd.style.marginLeft = "-"+parseInt(width/2) + 'px';
		login_wnd.style.marginTop = "-"+parseInt(height/2) + 'px';
	}
}
function ptlogin2_onClose(){
	document.getElementById("login_div").style.left = "-9999px";
	document.getElementById("loginBg").style.display = "none";
}
function userLogin(){
	document.getElementById("login_frame").src = "http://ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=636014201&target=self&s_url=http%3A//www.qq.com/qq2012/loginSuccess.htm";
	document.getElementById("login_div").style.left = "50%";
	document.getElementById("loginBg").style.display = "block";
	document.getElementById("loginBg").style.width= document.body.clientWidth + "px";
	document.getElementById("loginBg").style.height= document.body.clientHeight + "px";
}
/*一键登录数据*/
function loginAll(obj){
	if(obj.result == 0){
		MblogTotalnum = obj.info.Mblog.totalnum || 0; QQ.localData.set('Mblog-totalnum', obj.info.Mblog.totalnum); 
		MblogMsgnum = obj.info.Mblog.msgnum || 0; QQ.localData.set('Mblog-msgnum', obj.info.Mblog.msgnum);
		MblogAtnum = obj.info.Mblog.atnum || 0; QQ.localData.set('Mblog-atnum', obj.info.Mblog.atnum);
		MblogFansnum = obj.info.Mblog.fansnum || 0; QQ.localData.set('Mblog-fansnum', obj.info.Mblog.fansnum);
		QZoneTotalnum = obj.info.QZone.totalnum || 0; QQ.localData.set('QZone-totalnum', obj.info.QZone.totalnum);
		QZonePassivenum = obj.info.QZone.passivenum || 0; QQ.localData.set('QZone-passivenum', obj.info.QZone.passivenum);
		QZoneInitnum = obj.info.QZone.initnum || 0; QQ.localData.set('QZone-initnum', obj.info.QZone.initnum);
		QZoneAboutnum = obj.info.QZone.aboutnum || 0; QQ.localData.set('QZone-aboutnum', obj.info.QZone.aboutnum);
		QMailTotalnum = obj.info.QMail.totalnum || 0; QQ.localData.set('QMail-totalnum', obj.info.QMail.totalnum);
		QMailInboxnum = obj.info.QMail.inboxnum || 0; QQ.localData.set('QMail-inboxnum', obj.info.QMail.inboxnum);
		QMailBottlenum = obj.info.QMail.bottlenum || 0; QQ.localData.set('QMail-bottlenum', obj.info.QMail.bottlenum);
		QMailGmailnum = obj.info.QMail.gmailnum || 0; QQ.localData.set('QMail-gmailnum', obj.info.QMail.gmailnum);
		QMailDmailnum = obj.info.QMail.dmailnum || 0; QQ.localData.set('QMail-dmailnum', obj.info.QMail.dmailnum);
		/*
		FriendTotalnum = obj.info.Friend.totalnum || 0; QQ.localData.set('Friend-totalnum', obj.info.Friend.totalnum);
		FriendPassivenum = obj.info.Friend.passivenum || 0; QQ.localData.set('Friend-passivenum', obj.info.Friend.passivenum);
		FriendInitnum = obj.info.Friend.initnum || 0; QQ.localData.set('Friend-initnum', obj.info.Friend.initnum);
		FriendAboutnum = obj.info.Friend.aboutnum || 0; QQ.localData.set('Friend-aboutnum', obj.info.Friend.aboutnum);
		*/
		userInfoUin = uin; QQ.localData.set('Uin', uin);
		nick = userInfoName = obj.nick.replace(/</,"&lt;").replace(/>/,"&gt;"); QQ.localData.set('nick', userInfoName);
		userInfoVip = obj.Vip; QQ.localData.set('Vip', userInfoVip || 0);
		Face = userInfoFace = obj.Face || 'http://mat1.gtimg.com/news/dc/temp/c1.jpg'; QQ.localData.set('Face', userInfoFace || 'http://mat1.gtimg.com/news/dc/temp/c1.jpg');
		
		UI && UI.getScript("http://mini.t.qq.com/mini/mycheck.php?r=" + (new Date).getTime());//add 20130226

		if(MblogTotalnum){
			if(MblogTotalnum > 99){
				document.getElementById("weiboNum").innerHTML = "99+";
			}else{
				document.getElementById("weiboNum").innerHTML = MblogTotalnum;
			}
			document.getElementById("weiboNum").style.padding = "0 7px";
			if(MblogMsgnum != ""){
				document.getElementById("msgNum").innerHTML = MblogMsgnum;
				document.getElementById("msgLi").style.display = "block";
			}
			if(MblogAtnum != ""){
				document.getElementById("atNum").innerHTML = MblogAtnum;
				document.getElementById("atLi").style.display = "block";
			}
			if(MblogFansnum != ""){
				document.getElementById("fansNum").innerHTML = MblogFansnum;
				document.getElementById("fansLi").style.display = "block";
			}
		}else{
			document.getElementById("weiboTitle").innerHTML = "<a href='http://t.qq.com' target='_blank'>点击查看腾讯微博</a>";
		}
		if(QZoneTotalnum){
			if(QZoneTotalnum > 99){
				document.getElementById("qzoneNum").innerHTML = "99+";
			}else{
				document.getElementById("qzoneNum").innerHTML = QZoneTotalnum;
			}
			document.getElementById("qzoneNum").style.padding = "0 7px";
			if(QZonePassivenum != ""){
				document.getElementById("passiveNum").innerHTML = QZonePassivenum;
				document.getElementById("passiveLi").style.display = "block";
			}
			if(QZoneInitnum != ""){
				document.getElementById("InitNum").innerHTML = QZoneInitnum;
				document.getElementById("InitLi").style.display = "block";
			}
			if(QZoneAboutnum != ""){
				document.getElementById("AboutNum").innerHTML = QZoneAboutnum;
				document.getElementById("AboutLi").style.display = "block";
			}
		}else{
			document.getElementById("qzoneTitle").innerHTML = "<a href='http://qzone.qq.com' target='_blank'>点击查看QQ空间</a>";
		}
		if(QMailTotalnum){
			if(QMailTotalnum > 99){
				document.getElementById("mailNum").innerHTML = "99+";
			}else{
				document.getElementById("mailNum").innerHTML = QMailTotalnum;
			}
			document.getElementById("mailNum").style.padding = "0 7px";
			weiDu = QMailTotalnum - QMailInboxnum - QMailBottlenum - QMailGmailnum - QMailDmailnum;
			if(QMailInboxnum != ""){
				if(weiDu != 0){
					document.getElementById("inboxNum").innerHTML = Number(QMailInboxnum) + Number(weiDu);
					document.getElementById("inboxLi").style.display = "block";
				}else{
					document.getElementById("inboxNum").innerHTML = QMailInboxnum;
					document.getElementById("inboxLi").style.display = "block";
				}
			}else if(weiDu != 0){
				document.getElementById("inboxNum").innerHTML = weiDu;
				document.getElementById("inboxLi").style.display = "block";
			}
			if(QMailBottlenum != ""){
				document.getElementById("bottleNum").innerHTML = QMailBottlenum;
				document.getElementById("bottleLi").style.display = "block";
			}
			if(QMailGmailnum != ""){
				document.getElementById("gmailNum").innerHTML = QMailGmailnum;
				document.getElementById("gmailLi").style.display = "block";
			}
			if(QMailDmailnum != ""){
				document.getElementById("dmailNum").innerHTML = QMailDmailnum;
				document.getElementById("dmailLi").style.display = "block";
			}
			if(QMailInboxnum == "" && QMailBottlenum == "" && QMailGmailnum == "" && QMailDmailnum == ""){
				document.getElementById("mailTitle").innerHTML = "<a href='http://mail.qq.com' target='_blank'>点击查看QQ邮箱</a>";
			}
		}else{
			document.getElementById("mailTitle").innerHTML = "<a href='http://mail.qq.com' target='_blank'>点击查看QQ邮箱</a>";
		}
		document.getElementById("mailIcon").onmouseover = function(){
			document.getElementById("mailSmart").style.display = "block";
		}
		document.getElementById("mailIcon").onmouseout = function(){
			document.getElementById("mailSmart").style.display = "none";
		}
		document.getElementById("qzoneIcon").onmouseover = function(){
			document.getElementById("qzoneSmart").style.display = "block";
		}
		document.getElementById("qzoneIcon").onmouseout = function(){
			document.getElementById("qzoneSmart").style.display = "none";
		}
		document.getElementById("weiboIcon").onmouseover = function(){
			document.getElementById("weiboSmart").style.display = "block";
		}
		document.getElementById("weiboIcon").onmouseout = function(){
			document.getElementById("weiboSmart").style.display = "none";
		}
		
		document.getElementById("userName").innerHTML = userInfoName;
		document.getElementById("logined").style.display = "block";
		document.getElementById("loginAll").style.display = "none";
		document.getElementById("loginOut").onclick = function(){
			login.loginOut();
			//MI &&　MI.Login.logout();//打通微博一键登录
			//新版评论add
			if(window['ifr_cmt_status'] && document.getElementById('commentIframe')){
				 document.getElementById('commentIframe').contentWindow.publicLogout();
				 //registerCoralEvent.publicLogout();
			}
			return false;
		}
		if(typeof loginAllCallBack=="function"){
			loginAllCallBack(userInfoName);
		}
	}
	
	//新版评论add
	if(window['ifr_cmt_status'] && document.getElementById('commentIframe')){
		document.getElementById('commentIframe').contentWindow.publicLogined(uin, nick, Face);
	}
}
function reloadLoginInfo(){
var _obj = {"result":"0","Uin":QQ.localData.get('Uin'),"nick":QQ.localData.get('nick'),"Vip":QQ.localData.get('Vip'),"Face":QQ.localData.get('Face'),"info":{"QZone":{"totalnum":parseInt(QQ.localData.get('QZone-totalnum')),"passivenum":parseInt(QQ.localData.get('QZone-passivenum')),"initnum":parseInt(QQ.localData.get('QZone-initnum')),"aboutnum":parseInt(QQ.localData.get('QZone-aboutnum'))},/*"Friend":{"totalnum":parseInt(QQ.localData.get('Friend-totalnum')),"passivenum":parseInt(QQ.localData.get('Friend-passivenum')),"initnum":parseInt(QQ.localData.get('Friend-initnum')),"aboutnum":parseInt(QQ.localData.get('Friend-aboutnum'))},*/"QMail":{"totalnum":parseInt(QQ.localData.get('QMail-totalnum')),"inboxnum":parseInt(QQ.localData.get('QMail-inboxnum')),"bottlenum":parseInt(QQ.localData.get('QMail-bottlenum')),"gmailnum":parseInt(QQ.localData.get('QMail-gmailnum')),"dmailnum":parseInt(QQ.localData.get('QMail-dmailnum'))},"Mblog":{"totalnum":parseInt(QQ.localData.get('Mblog-totalnum')),"msgnum":parseInt(QQ.localData.get('Mblog-msgnum')),"atnum":parseInt(QQ.localData.get('Mblog-atnum')),"fansnum":parseInt(QQ.localData.get('Mblog-fansnum'))}}}
	loginAll(_obj);
}
window.QQ = {};
QQ.localData = {
	 hname:location.hostname ? location.hostname : 'localStatus',
	 isLocalStorage:window.localStorage ? true : false,
	 dataDom:null,
	 initDom:function(){ //初始化userData
		 if(!this.dataDom){
			 try{
				 this.dataDom = document.createElement('input');//这里使用hidden的input元素
				 this.dataDom.type = 'hidden';
				 this.dataDom.style.display = "none";
				 this.dataDom.addBehavior('#default#userData');//这是userData的语法
				 document.body.appendChild(this.dataDom);
				 var exDate = new Date();
				 exDate = exDate.getDate()+30;
				 this.dataDom.expires = exDate.toUTCString();//设定过期时间
			 }catch(ex){
				 return false;
			 }
		 }
		 return true;
	 },
	 set:function(key,value){
		 if(this.isLocalStorage){
			 window.localStorage.setItem(key,value);
		 }else{
			 if(this.initDom()){
				 this.dataDom.load(this.hname);
				 this.dataDom.setAttribute(key,value);
				 this.dataDom.save(this.hname)
			 }
		 }
	 },
	 get:function(key){
		 if(this.isLocalStorage){
			 return window.localStorage.getItem(key);
		 }else{
			 if(this.initDom()){
				 this.dataDom.load(this.hname);
				 return this.dataDom.getAttribute(key);
			 }
		 }
	 },
	 remove:function(key){
		 if(this.isLocalStorage){
			 localStorage.removeItem(key);
		 }else{
			 if(this.initDom()){
				 this.dataDom.load(this.hname);
				 this.dataDom.removeAttribute(key);
				 this.dataDom.save(this.hname)
			 }
		 }
	 }
}
QQ.Cookie={
	set:function(name,value,expires,path,domain){
		if(typeof expires=="undefined"){
			expires=new Date(new Date().getTime()+3600*1000);
		}
		document.cookie=name+"="+escape(value)+((expires)?"; expires="+expires.toGMTString():"")+((path)?"; path="+path:"; path=/")+((domain)?";domain="+domain:"");
	},
	get:function(name){
		var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr!=null){
			return unescape(arr[2]);
		}
		return null;
	},
	clear:function(name,path,domain){
		if(this.get(name)){
			document.cookie=name+"="+((path)?"; path="+path:"; path=/")+((domain)?"; domain="+domain:"")+";expires=Fri, 02-Jan-1970 00:00:00 GMT";
		}
	}
};
function getExpires(a){//a:hour
	var expires=new Date(new Date().getTime()+(a?a:1)*24*3600*1000);
	return expires;
}

window["login"] = {
	loginCheck:function(){
		if(QQ.Cookie.get("skey")){
			uin = Number(QQ.Cookie.get("uin").substring(1));
			skey = QQ.Cookie.get("skey");
			try{
				var loginScript = document.createElement ("script");
				loginScript.charset="utf-8";
				loginScript.src = "http://qfwd.qq.com/?uin=" + uin + "&skey=" + skey + "&func=loginAll&refresh=0&ran="+Math.random();
				document.getElementsByTagName('head')[0].appendChild(loginScript);
				QQ.localData.set("loginTime", (new Date()).getTime());
			}catch(e){}
		}
	},
	loginCountCheck:function(obj){
		if(document.getElementById(obj).innerHTML != ""){
			document.getElementById(obj).innerHTML = "";
			document.getElementById(obj).parentNode.parentNode.style.display = "none";
		}
	},
	loginOut:function(){
		//var _this = this;
		UI.getScript('https://ui.ptlogin2.qq.com/js/ptloginout.js', function(){
			pt_logout.logout(function(n){
				if(!n){
					//fail
				}
				else{
					//success
					login.loginOutCall();
				}
			});
		});
	},
	loginOutCall: function(){
		var d = (new Date).getTime();
		//QQ.Cookie.clear("skey", '/', "qq.com");
		document.getElementById("logined").style.display = "none";
		document.getElementById("loginAll").style.display = "block";
		login.loginCountCheck("weiboNum");
		login.loginCountCheck("msgNum");
		login.loginCountCheck("atNum");
		login.loginCountCheck("fansNum");
		login.loginCountCheck("qzoneNum");
		login.loginCountCheck("passiveNum");
		login.loginCountCheck("InitNum");
		login.loginCountCheck("AboutNum");
		login.loginCountCheck("mailNum");
		login.loginCountCheck("inboxNum");
		login.loginCountCheck("bottleNum");
		login.loginCountCheck("gmailNum");
		login.loginCountCheck("dmailNum");
		document.getElementById("weiboTitle").innerHTML = "腾讯微博:";
		document.getElementById("qzoneTitle").innerHTML = "QQ空间:";
		document.getElementById("mailTitle").innerHTML = "QQ邮箱:";
		
		document.getElementById("weiboNum").style.padding = "0 14px";
		document.getElementById("qzoneNum").style.padding = "0 16px";
		document.getElementById("mailNum").style.padding = "0 15px";
		if(typeof loginOutCallBack=="function"){
			loginOutCallBack();
		}
		login.cbArr = [];
		login.cleanCbLogin();
	},
	loginSuccess:function(){
		document.getElementById("loginBg").style.display = "none";
		document.getElementById("login_div").style.left = "-9999px";
		document.getElementById("logined").style.display = "block";
		document.getElementById("loginAll").style.display = "none";
		//加载回调
		if(login.cbArr.length > 0){
			for(var i = login.cbArr.length-1; i >= 0; i--){
				login.cbArr[i]();
			}
		}
		//点击回调
		login.loginCheck();
		login.cbLogin();
		login.cleanCbLogin();
		
	},
	cbArr : new Array(),//加载回调
	cbLogin : function(){},//点击回调
	cleanCbLogin : function(){
		this.cbLogin = function(){}
	}
}
function EA( node, type, listener ) { 
    if (node.addEventListener) {
        node.addEventListener( type, listener, false );
        return true;
    } else if(node.attachEvent) {
        node['e'+type+listener] = listener;
        node[type+listener] = function(){node['e'+type+listener]( window.event );}
        node.attachEvent( 'on'+type, node[type+listener] );
        return true;
    }
    return false;
}
//登录本地存储
EA(window, "load", function(){
	if(QQ.Cookie.get("skey")){
		var _t = QQ.localData.get('loginTime') || 0, t = new Date().getTime();
		if(t - _t > 60000 || QQ.Cookie.get("uin") != QQ.localData.get('Uin')) {
			login.loginCheck();
		}else{
			reloadLoginInfo();
		}
	}
});
//]]>
</script>
	</div>
</div>
<script type="text/javascript">
(function(){var e={webmap:"webmap",qqindex:"qqindex",logkey:"logkey",onekey:"onekey",weibo:"weibo",qzone:"qzone",qmail:"qmail",friend:"friend",loginOut:"logquit",weiboIcon:"weiboinfor",qzoneIcon:"qzoneinfor",mailIcon:"qmailinfor",pengyouIcon:"friendinfor"},t=function(){for(var t in e){if(!e.hasOwnProperty(t))return;var n=document.getElementById(t);n&&n.setAttribute("bossZone",e[t])}};t()})()
</script>
<script type="text/javascript">
//移动端左右边距
if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){document.getElementsByTagName("body")[0].style.minWidth = "1028px";}
</script><!--[if !IE]>|xGv00|391c10b45046351ab35a91ecc9e5bb6e<![endif]--><!--[if !IE]>|xGv00|a8ce686608a3a9361ed61a413546b702<![endif]-->


<script type="text/javascript">
var TIME_BEFORE_LOAD_CRYSTAL = (new Date).getTime();
</script>
<script src="http://ra.gtimg.com/web/crystal/v2.1Beta07Build073/crystal-min.js" id="l_qq_com" arguments="{'extension_js_src':'http://ra.gtimg.com/web/crystal/v2.1Beta07Build073/crystal_ext-min.js','lview_time_out':10,'mo_page_ratio':0.01,'mo_page_url':'http://dp3.qq.com/qqcom/','mo_ping_ratio':0.01,'mo_ping_script':'http://ra.gtimg.com/sc/mo_ping-min.js'}"></script>
<script type="text/javascript">
if(typeof crystal === 'undefined' && Math.random() <= 1) {
  (function() {
    var TIME_AFTER_LOAD_CRYSTAL = (new Date).getTime();
    var img = new Image(1,1);
    img.src = "http://dp3.qq.com/qqcom/?adb=1&blockjs="+(TIME_AFTER_LOAD_CRYSTAL-TIME_BEFORE_LOAD_CRYSTAL);
  })();
}
</script>
<style>.absolute{position:absolute;}</style>
<script language="javascript">
var smartbox_boss_img=new Image(1,1);
var Browser = new Object();

Browser.ua = window.navigator.userAgent.toLowerCase();
Browser.ie = /msie/.test(Browser.ua);
Browser.moz = /gecko/.test(Browser.ua);

var $ = function(s)
{
	return (typeof s == "object") ? s: document.getElementById(s);
};

var $N = function(s)
{
	return (typeof s == "object") ? s: document.getElementsByName(s);
};

var $T = function(s)
{
	return (typeof s == "object") ? s: document.getElementsByTagName(s);
};

var $C = function(tag)
{
	return document.createElement(tag);
};

function Farray_exist(d,v)
{
	for(var i=0;i<d.length;i++)
	{
		if(d[i]==v) return true;
	}
	return false;
}

//获取uin
function getUin()
{
    var arr = document.cookie.match(new RegExp("(^| )o_cookie=([^;]*)(;|$)"));
    var uin = '';

    if (arr != null)
    {
        uin = arr[2];
        uin = uin.replace(new RegExp("[^0-9]","gm"), "");
        uin = uin.replace(new RegExp("^0+","gm"), "");
    }

    return uin;
}

//获取当前用户的uin
var g_uin = getUin();

var g_boss_img = new Image(1,1);

/** click_type类型：
 *  'calcapp'：打开购车计算器的用户中，多少用户点击导航和搜索，并带来多少PV（内置浏览器中）
 *  'webqq_browser'：在webqq内置浏览器中浏览的用户，多少人二次点击导航跳出，跳出的PV是多少
 */
function FWebBossLinkStat(iQQ, iTy, sLinkType, sClickType)
{
	g_boss_img.src="http://btrace.qq.com/collect?sIp=&iQQ="+iQQ+"&sBiz=&sOp=&iSta=&iTy="+iTy+"&iFlow=&sLinkType=" + sLinkType + "&sClickType=" + sClickType + "&iClickNum=1";
}
//Element
var Element = {
	isEmpty: function(e)
	{
		return /^\s*$/.test($(e).innerHTML);
	},

	isVisible: function(e)
	{
		return $(e).style.display != 'none';
	},

	show: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			$(arguments[i]).style.display = "block";
		}
	},

	hide: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			$(arguments[i]).style.display = "none";
		}
	},

	toggle: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			Element[Element.isVisible($(arguments[i])) ? 'hide': 'show']($(arguments[i]));
		}
	},

	remove: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			try
			{
				$(arguments[i]).parentNode.removeChild($(arguments[i]));
			}
			catch (e)
			{
			}
		}
	},

	create: function(parent, tag, attr)
	{
		var _e = $C(tag);

		for (var i=0; i<attr.length; i++)
		{
			_e.setAttribute(attr[i][0], attr[i][1]);
		}

		$(parent).appendChild(_e);
	},

	getElementWidth: function(e)
	{
		return $(e).offsetWidth;
	},

	getElementHeight: function(e)
	{
		return $(e).offsetHeight;
	},

	getElementLeft: function(e)
	{
		return (e==null) ? 0 : ($(e).offsetLeft + Element.getElementLeft($(e).offsetParent));
	},

	getElementTop: function(e)
	{
		return (e==null) ? 0 : ($(e).offsetTop + Element.getElementTop($(e).offsetParent));
	},

	scrollIntoView: function(e)
	{
		var x = Element.getElementLeft(e);
		var y = Element.getElementTop(e);
		window.scrollTo(x, y);
	}
};

var JsLoader = {
	load: function(sId, sUrl, fCallback, chset)
	{
		Element.remove(sId);

		var _script = document.createElement("script");
		_script.setAttribute("id", sId);
		_script.setAttribute("type", "text/javascript");
		_script.setAttribute("src", sUrl);

		if (chset)
		_script.setAttribute("charset", chset);
		else
		_script.setAttribute("charset", "gb2312");

		document.getElementsByTagName("head")[0].appendChild(_script);

		if (Browser.ie)
		{
			_script.onreadystatechange = function()
			{
				if (this.readyState=="loaded" || this.readyState=="complete")
				{
					Element.remove(_script);
					fCallback();
				}
			};
		}
		else if (Browser.moz)
		{
			_script.onload = function()
			{
				Element.remove(_script);
				fCallback();
			};
		}
		else
		{
			Element.remove(_script);
			fCallback();
		}
	}
};

//window onload 事件添加
function add_loadEvent(func)
{
	var oldonload = window.onload;
	if(typeof window.onload != 'function')
	{
		window.onload = func;
	}
	else
	{
		window.onload = function(){
			oldonload();
			func();
		};
	}
}
function get_url_params(name)
{
	var reg=new RegExp("([\?|&])"+ name +"=([^&]*)");
	if (reg.test(location.href)) return decodeURIComponent(RegExp.$2.replace(/\+/g, " ")); return "";
}

function is_InArray(arr,val)
{
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i] == val)
		return true;
	}
	return false;
}

function save_this_page()
{
	if(!confirm('确定将此页面添加到收藏夹吗？'))
	{
		return false;
	}

	if (/msie/.test(window.navigator.userAgent.toLowerCase()))
	{
		//ie下的
		window.external.AddFavorite(window.location.href, document.title);
	}else if (/gecko/.test(window.navigator.userAgent.toLowerCase()))
	{
		//ff的
		window.sidebar.addPanel(document.title, window.location.href, "");
	}else
	{
		alert("加入收藏失败，请使用Ctrl+D进行添加");
	}
	return false;
}
</script>

<style>
/* 公共布局
----------------------------------------------- */
body,div,dl,dt,dd,table,tr,th,td,form{ margin:0; padding:0; color:#333; font-size:12px; font-family:"\5B8B\4F53","Arial Narrow",Tahoma;}
ul,ol,li,dl,dt,dd{ list-style-type:none; margin:0; padding:0;}
li{ vertical-align:bottom;}
h1,h2,h3,h4,h5,h6{ margin:0; padding:0;}
strong{ font-weight:bold;}
img{ vertical-align:bottom; border:0;}
a:link,a:visited{ color:#333; text-decoration:none;}
a:hover{ color:#d90606; text-decoration:underline;}

.cls{ clear:both; height:0; font:0/0 Arial;}
.clearfix:after{ display:block; clear:both; visibility:hidden; content:"."; height:0;}
* html .clearfix{ height:1%;}
.wrapper{ width:960px; margin:0 auto;}

/* 引用首页样式
----------------------------------------------- */
table{border-collapse:collapse;border-spacing:0}
p{ margin:0;}
.layout{width:1000px;margin:0 auto}
.layout:after,.hd:after,.bd:after,.ft:after,.cf:after,.Q-tList:after,.Q-tList ul:after,.Q-tList ol:after,.Q-pList:after,.Q-pList ul:after,.Q-tpList:after,.Q-tpList ul:after,.Q-tpWrap:after{content:"";display:table;clear:both}
.layout,.hd,.bd,.ft,.cf,.Q-tList,.Q-tList ul,.Q-tList ol,.Q-pList,.Q-pList ul,.Q-tpList,.Q-tpList ul,.Q-tpWrap{*zoom:1}
.mt5{margin-top:5px!important}
.mt10{margin-top:10px!important}
.mt15{margin-top:15px!important}
.mt20{margin-top:20px!important}
.mt25{margin-top:25px!important}
.mt30{margin-top:30px!important}
.mt35{margin-top:35px!important}
.mr20{margin-right:20px!important}
.mr40{margin-right:40px!important}
.pt10{padding-top:10px}
.search_car_btn,.car_nav li em,.head_top .select_city .btn em,.dujia,.history_links span .eye,#cp_xczx .search_btn,.foucs_pic .mini_nav li a,.mini_task li a,.foucs_pic .mini_nav li.active a,.mini_task li.active a,.cx_content_item .play_btn,.heavy_list .keyword .en,.txcp .up_btn em,.txcp .down_btn em,.car_tools li a em,.auto-menu h4 .open,.auto-menu .state-open h4 .open,.depr_list li .price .green_arr,.hide_panel .up_arr,.union .intro .join_btn,.ask_price_btn,.recommend ul li .online_ask_btn,.city_options_box .up_arr,.change_time .left_btn em,.change_time .right_btn em,.xc_select_btn .down_arr,.xc_select_btn .up_arr,.cshy_top .chose_city .btn .down,.cshy_top .chose_city .btn .up,.ct_way li .link em,#top_select_city .up_arr,#toTop{background:url("//mat1.gtimg.com/auto/2014/images/auto_sprite.png") no-repeat}
.logoAutoQQ{display:none}

/*header_box*/
.head_top{height:32px}
.logo_wrap,.logo_wrap a,.logo_wrap,.logo_wrap img{display:block;height:30px;width:128px}
.head_top .select_city{height:25px;width:172px;margin-top:7px}
.head_top .select_city .slt1,.head_top .select_city .slt2{height:25px;width:72px;text-align:right}
.head_top .select_city .slt2{width:79px;position:relative;z-index:111}
.head_top .select_city .slt2 .cx_options_box{width:255px;left:10px;top:35px;_top:37px;height:90px;position:absolute; display:none}
#top_select_city li{display:block;float:left;width:51px;line-height:30px;text-align:center}
.head_top .select_city .btn{display:inline-block;height:25px;line-height:22px;color:#666;padding-right:20px;position:relative}
.head_top .select_city .btn:hover{text-decoration:none}
.head_top .select_city .btn em{display:block;height:5px;width:9px;position:absolute;top:9px;right:5px;overflow:hidden}
.head_top .select_city .btn em.down{background-position:-948px -17px}
.head_top .select_city .btn em.up{background-position:-965px -34px}
.hide_panel{position:relative;border:1px solid #d3d3d3;padding:8px 14px 10px}
.hide_panel .left{width:290px;margin-right:10px}
.hide_panel .headline{border-bottom:1px dashed #ccc;padding:6px 0 10px}
.hide_panel .headline .pic{display:block;height:90px;width:135px;margin:5px 12px 0 0}
.hide_panel .headline .link{font:14px/26px "\5FAE\8F6F\96C5\9ED1","\9ED1\4F53"}
.hide_panel .headline p{color:#666;line-height:22px;margin-top:4px}
.hide_panel .left ul{display:block;padding-top:7px}
.hide_panel .left ul li{width:290px;height:26px;overflow:hidden}
.hide_panel .left ul li a{font-size:14px;line-height:26px}
.hide_panel .middle{width:410px}
.hide_panel .middle ul{float:left;width:200px;margin-right:10px}
.hide_panel .middle ul.last{margin:0}
.hide_panel .middle ul li{width:200px;height:36px;overflow:hidden}
.hide_panel .middle ul li a{width:200px;height:36px;font:14px/36px "\5B8B\4F53"}
.hide_panel .right{width:250px;margin-top:6px}
.hide_panel .hot_active{height:30px;background-color:#333}
.hide_panel .hot_active img{display:block;float:left;height:18px;width:148px;margin-top:5px}
.hide_panel .hot_art{display:block;margin-top:1px;height:136px;width:250px;position:relative}
.hide_panel .hot_art img{height:136px;width:250px}
.dujia{vertical-align:middle;display:inline-block;height:14px;width:28px;background-position:-152px -61px;color:#fff;font:12px/14px "\5FAE\8F6F\96C5\9ED1","\9ED1\4F53";text-align:right;overflow:hidden}
.hide_panel .up_arr,#top_select_city .up_arr{display:block;width:14px;height:8px;background-position:-965px -17px;position:absolute;top:-8px;left:160px;overflow:hidden}
#top_select_city .up_arr{left:20px}

.pp_options_box,.cx_options_box,.city_options_box{display:none;position:absolute;width:228px;height:274px;border:1px solid #bbb;top:30px;left:0;background-color:#fff;z-index:100}
.hot_art .mask{display:block;height:79px;width:100%;background:url("//mat1.gtimg.com/auto/2014/images/mask.png") no-repeat;_background-image:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='//mat1.gtimg.com/auto/2014/images/mask.png',sizingMethod='crop');position:absolute;bottom:0;left:0;cursor:pointer}
.hot_art span{font:14px/38px "\5B8B\4F53";text-align:center;height:38px;display:block;width:100%;position:absolute;left:0;bottom:0;color:#fff}
.hot_art:hover{text-decoration:none}
.hot_art:hover span{text-decoration:none;cursor:pointer}
/*搜车*/
.search_car{height:20px;width:390px;padding:5px 0 3px 8px;border:2px solid #d3d3d3;position:relative;z-index:1}
.search_ipt{height:20px;width:298px;border:none;*border:0;font:14px/20px "\5B8B\4F53"}
.search_car_btn{position:absolute;top:-2px;right:-2px;display:block;height:32px;width:86px;background-position:-824px 0}
.results_list{border:2px solid #D3D3D3;border-top:none;left:-2px;position:absolute;top:30px;width:398px;background-color:#fff;z-index:1}
.results_list li{height:24px}
.results_list li a{display:block;height:24px;line-height:24px;padding-left:10px;position:relative}
.results_list li a .acronym{display:block;height:24px;width:100px;position:absolute;top:0;right:0}
.results_list li a:hover,.results_list li a.select{text-decoration:none;background-color:#f1f1f1}
/*版式切换*/
.head_top .tab_format{margin-top:4px;border:1px solid #1c8dd5}
.head_top .tab_format a{display:block;height:26px;width:64px;float:left;line-height:26px;text-align:center;color:#1c8dd5;font-size:12px}
.head_top .tab_format a:hover{color:#c00}
.head_top .tab_format a.active{background-color:#1c8dd5;color:#fff;font-weight:bold;cursor:default}
.head_top .tab_format a.active:hover{text-decoration:none;color:#fff}


/* 公共布局补充
----------------------------------------------- */
.marginT20{margin-top:20px!important}

/* 宽1000px 
.all_nav{ width:1000px;}
.all_nav li{ width:66px;}
.all_nav li.first{ width:76px;}
.navSub{ width:1000px;}
*/

/* 宽960px */
.layout{ width:960px;}
.all_nav{ width:960px;}
.all_nav li{ width:64px;}
.all_nav li.first{ width:64px;}
.navSub{ width:960px;}

.W1000{ width:1000px;}
.hide_panel .up_arr{ left:180px;}
.fl{ float:left;}
.fr{ float:right;}
#market .right .layout{ width:720px;}
</style>

<!-- 2014首页内页改版通用头部 -->
	<!--手动更新页面抓取管理任务ID：2359-->
<!--logo城市切换-->
    <div class="head_top layout mt25">
		<!--logo-->
		<div class="logo_wrap fl">
			<a href="//auto.qq.com/" target="_blank"><img src="//mat1.gtimg.com/auto/2014/images/auto_logo.png" alt="腾讯汽车" /></a>
			<h1 class="logoAutoQQ"><a href="//auto.qq.com/">腾讯汽车</a></h1>
		</div>

		<!--城市切换-->
        <div class="select_city fl" bosszone="bd">
	<div class="slt2 fl">
		<a id="top_city_btn" href="javascript:;" class="btn">更换地区<em class="down"></em></a>
		<div id="top_select_city" class="cx_options_box" style="height:150px;">
			<span class="up_arr"></span>
			<ul>
				<li><a target="_blank" href="//beijing.auto.qq.com">北京</a></li>
				<li><a target="_blank" href="//shanghai.auto.qq.com">上海</a></li>
				<li><a target="_blank" href="//chongqing.auto.qq.com">重庆</a></li>
				<li><a target="_blank" href="//guangzhou.auto.qq.com">广州</a></li>
				<li><a target="_blank" href="//shenyang.auto.qq.com">沈阳</a></li>
				<li><a target="_blank" href="//zhengzhou.auto.qq.com">郑州</a></li>
				<li><a target="_blank" href="//nanjing.auto.qq.com">南京</a></li>
				<li><a target="_blank" href="//hangzhou.auto.qq.com">杭州</a></li>
				<li><a target="_blank" href="//fuzhou.auto.qq.com">福州</a></li>
				<li><a target="_blank" href="//wuhan.auto.qq.com">武汉</a></li>
				<li><a target="_blank" href="//changsha.auto.qq.com">长沙</a></li>
				<li><a target="_blank" href="//xian.auto.qq.com">西安</a></li>
				<li><a target="_blank" href="//chengdu.auto.qq.com">成都</a></li>
				<li><a target="_blank" href="//qingdao.auto.qq.com">青岛</a></li>
				<li><a target="_blank" href="//hefei.auto.qq.com">合肥</a></li>
				<li><a target="_blank" href="//nanchang.auto.qq.com">南昌</a></li>
				<li><a target="_blank" href="//jinan.auto.qq.com">济南</a></li>
				<li><a target="_blank" href="//xiamen.auto.qq.com">厦门</a></li>
				<li><a target="_blank" href="//changchun.auto.qq.com">长春</a></li>
				<li><a target="_blank" href="//haerbin.auto.qq.com">哈尔滨</a></li>
				<li><a target="_blank" href="//dalian.auto.qq.com">大连</a></li>
				<li><a target="_blank" href="//quanzhou.auto.qq.com">泉州</a></li>
			</ul>
		</div>
	</div>
</div>
		<!--搜车-->
		<div class="search_car fl" bosszone="dhserch">
	<form>
		<input class="search_ipt" type="text" value="" placeholder="奥迪 A4L" />
		<a href="javascript:;" class="search_car_btn"></a>
	</form>
</div>
		<!--版式切换-->

	</div>
    
    <!--隐藏面板-->
	<div class="layout mt10 W1000">
		<div id="hide_panel" class="hide_panel cf" style="display:none;">
			<div id="hide_panel_left" class="left fl" bosszone="left"></div>
			<div id="hide_panel_middle" class="middle fl cf" bosszone="middle"></div>
			<div id="hide_panel_right" class="right fr" bosszone="right"></div>
			<span class="up_arr"></span>
		</div>
	</div>
<!-- 子导航 -->
<script type="text/javascript" src="//mat1.gtimg.com/www/js/jquery-1.10.2.min.js"></script>
<script type="text/javascript">
	
	/*============================auto.js=================================*/
typeof $ === 'undefined' && typeof jQuery !== 'undefined' && ($=jQuery);

/**
 * 隐藏面板
 **/
function TPanel(ops) {
	this.btn = ops.btn;
	this.panel = ops.panel;
	this.event = ops.event || "click";
	this.timer = null;
	this.delay = ops.delay || 8000;
	this.open = false;
	this.effect = ops.effect || false;
	this.init();
}
TPanel.prototype = {
	init: function () {
		var _this = this;
		this.btn.on(this.event, function (e) {
	
			_this.toggle();

			
			if (e && e.stopPropagation) {
				e.stopPropagation();
			} else {
				window.event.cancelBubble = true;
			}
				
			return false;
		});

		if (_this.effect) {
			
			$("body").on("click", function (){
			
				_this.hide_pan();
			});
		}
	},
	show_pan: function(){
		this.btn.find("em:not(.up)").addClass("up");
		this.panel.is(':hidden') && this.panel.show();
	},
	hide_pan: function () {
		this.btn.find("em").removeClass("up");
		!this.panel.is(":hidden") && this.panel.hide();
	},
	clear: function(){
		(this.timer) && clearTimeout(this.timer);
		this.btn.find("em.up").removeClass("up");
	},
	set: function(){
		var _this = this;
		this.timer = setTimeout(function () {
			_this.toggle();
		}, _this.delay);
	},
	down_pan: function () {
		this.btn.find("em").addClass("up");
		this.panel.slideDown();
	},
	toggle: function () {
		this.btn.find("em").toggleClass("up");
		if (this.effect) {
			this.panel.toggle();
		} else {
			this.panel.slideToggle();
		}
	}
};

/*头部隐藏面板*/

var top_city = new TPanel({
	btn: $("#top_city_btn"),
	panel: $("#top_select_city"),
	delay: 1500,
	effect: true
});


/*===============================auto.dev.js=================================*/

;(function($){if(!$)return;
document.domain = 'qq.com';
var doc  = document,port='',win  = window,_loc = location;
	// 
	$(function(){
		$('.search_ipt').length && $.getScript('//mat1.gtimg.com/auto/2014/js/auto.dev.js'); //顶部搜索
	})
})(window.jQuery)
	
	
	
	</script>
<style>
/* 公共布局
----------------------------------------------- */
body,div,dl,dt,dd,table,tr,th,td,form{ margin:0; padding:0; color:#333; font-size:12px; font-family:"\5B8B\4F53","Arial Narrow",Tahoma;}
ul,ol,li,dl,dt,dd{ list-style-type:none; margin:0; padding:0;}
li{ vertical-align:bottom;}
h1,h2,h3,h4,h5,h6{ margin:0; padding:0;}
strong{ font-weight:bold;}
img{ vertical-align:bottom; border:0;}
a:link,a:visited{ color:#333; text-decoration:none;}
a:hover{ color:#d90606; text-decoration:underline;}

.cls{ clear:both; height:0; font:0/0 Arial;}
.clearfix:after{ display:block; clear:both; visibility:hidden; content:"."; height:0;}
* html .clearfix{ height:1%;}
.wrapper{ width:960px; margin:0 auto;}

/* 引用首页样式
----------------------------------------------- */
.layout{width:1000px;margin:0 auto}
.hide_panel .up_arr{ left:180px;}
.fl{ float:left;}
.fr{ float:right;}

/*头部导航*/
.all_nav{height:35px;border-bottom:4px solid #1c8dd5}
.all_nav ul{width:100%;display:table;border-collapse:collapse}
.all_nav li{display:block;float:left;width:66px}
.all_nav li.first{width:76px}
.all_nav li a{display:block;font:14px/35px "\5FAE\8F6F\96C5\9ED1","\9ED1\4F53";text-align:center;color:#333}
.all_nav li a:hover,.all_nav li a.active{color:#fff;background-color:#1c8dd5;text-decoration:none}

/* header
----------------------------------------------- */
/* 子导航 */
.navSub{ height:41px; background:#fafafa url(http://mat1.gtimg.com/auto/1/2014/lineX.png) repeat-x 0 bottom;}
.navSub li{ float:left; height:41px; padding:0 15px !important; font:18px/40px "\5FAE\8F6F\96C5\9ED1", "\9ED1\4F53";}
.navSub li a:link,.navSub li a:visited{ color:#bababa;}
.navSub li a:hover,.navSub li a:active{ color:#c00; text-decoration:none;}
.navSub li.on{ height:40px; border-bottom:1px solid #1c8dd5;}
.navSub li.on a:link,.navSub li.on a:visited{ color:#333;}
.navSub li.on a:hover,.navSub li.on a:active{ color:#c00;}

.navSub ul{ float:left;}
.navSub li{ padding:0 18px;}
/* 按品牌选车 */
.navSub .searchAutoBrand{ position:relative; z-index:101; float:left; height:41px; padding:0 10px;}
.navSub .searchAutoBrand .searchautobox{}
.navSub .searchAutoBrand caption,
.navSub .searchAutoBrand th,
.navSub .searchAutoBrand li,
.navSub .searchAutoBrand dt{ text-align:left;}
.navSub .searchAutoBrand .dis{ display:inline;}
.navSub .searchAutoBrand .undis{ display:none;}
.navSub .searchAutoBrand .change,
.navSub .searchAutoBrand .changed{ display:inline; float:left; cursor:pointer; width:74px; height:26px; margin:6px 0 0 0; border:1px solid #e8e8e8; padding-left:14px; background:url("http://img1.gtimg.com/auto/pics/hv1/227/136/1603/104269982.png") no-repeat; font:12px/26px "\5B8B\4F53"; text-align:center;}
.navSub .searchAutoBrand .changed{ position:relative; z-index:101; height:27px; border:1px solid #409ed9; border-bottom:0; background:#fff url("http://img1.gtimg.com/auto/pics/hv1/45/137/1603/104270055.png") no-repeat 9px 11px;}
.navSub .searchAutoBrand .link{ display:inline; overflow:hidden; float:left; width:360px; height:16px; margin:14px 0 0 18px; line-height:18px;}
.navSub .searchAutoBrand .link a{ margin-right:13px; color:#5274a5;}
.navSub .searchAutoBrand .line{ float:left; width:1px; height:25px; margin:8px 0 0 10px; background:url("http://mat1.gtimg.com/auto/datalib/topsearch_v3/sb_pic8.gif") no-repeat;}
#autoselectpanel{ position:absolute; left:10px; top:33px; z-index:99; border:1px solid #46a0d9;}
#autoselectpanel .inner{ display:inline-block; *display:inline; zoom:1; overflow:hidden; height:375px; padding:28px 0 0 11px; background:#fff;}
#autoselectpanel .close{ position:absolute; right:10px; top:10px; cursor:pointer; width:15px; height:15px; background:url("http://mat1.gtimg.com/auto/datalib/topsearch_v3/close.gif") no-repeat; text-indent:-9999px;}
#autoselectpanel .cbbox{ display:inline; overflow:hidden; *zoom:1; float:left; width:231px; margin-right:11px;}
#autoselectpanel .zimu{ overflow:hidden; *zoom:1; width:225px;}
#autoselectpanel .zimu ul{ float:none;}
#autoselectpanel .zimu ul li{ float:left; width:22px; height:20px; margin:0 3px 3px 0; padding:0 !important; color:#ccc; font:12px/20px Verdana; text-align:center;}
#autoselectpanel .zimu ul li a{ display:block; height:20px; color:#333;}
#autoselectpanel .zimu ul li a:hover,
#autoselectpanel .zimu ul li a.on{ background:#389bda; color:#fff; text-decoration:none;}
#autoselectpanel .zimu ul li.t{ width:225px; font-family:"\5B8B\4F53"; font-weight:normal;}
#autoselectpanel .zimu ul li.t a{ float:left; width:60px;}
#autoselectpanel .cbbox .list{ overflow:hidden; *zoom:1; width:231px; padding:5px 0 0 0px;}
#autoselectpanel .cbbox .list ul{ float:none; width:231px;}
#autoselectpanel .cbbox .list ul li{ display:inline; float:left; width:92px; height:18px; margin-right:23px; padding:3px 0 2px 0 !important; color:#039; font:12px/18px "\5B8B\4F53";}
#autoselectpanel .cbbox .list ul li a{ display:block; width:72px; height:18px; padding-left:10px; color:#076aa9; line-height:18px;}
#autoselectpanel .cbbox .list ul li a:hover,
#autoselectpanel .cbbox .list ul li a.on{ background:#1c8dd5; color:#fff; text-decoration:none;}
#autoselectserialbox{ float:left; width:400px; height:355px; border-left:1px solid #dfdfdf; padding-left:14px;}
#autoselectserialbox dl a:hover{ color:#db0906; text-decoration:none;}
#autoselectserialbox dt{ padding:0 0 10px 7px; color:#076aa9; font-weight:bold; line-height:normal;}
#autoselectserialbox dt a{ color:#076aa9;}
#autoselectserialbox dt a.disable{ cursor:default; color:#999;}
#autoselectserialbox dt a.disable:hover{ color:#999;}
#autoselectserialbox dd ul{ overflow:hidden; *zoom:1; float:none; padding-bottom:10px;}
#autoselectserialbox dd ul li{ width:100px; float:left; height:22px; padding:0 !important; font:12px/22px "\5B8B\4F53";}
#autoselectserialbox dd ul li a{ color:#076aa9;}
#autoselectserialbox dd ul li a.disable{ cursor:default; color:#999;}
#autoselectserialbox dd ul li a.disable:hover{ color:#999;}

/* 车型大全 */
.navSub .searchCategory{ position:relative; float:left; width:110px; height:41px;}
.navSub a.searchCategoryBt{ display:block; padding-left:10px; font:18px/40px "\5FAE\8F6F\96C5\9ED1", "\9ED1\4F53"; text-align:left;}
.navSub .searchCategory div{ position:absolute; left:0; top:0; width:110px; height:40px;}
.navSub .searchCategory a:link,.navSub .searchCategory a:visited{ color:#333;}
.navSub .searchCategory a:hover,.navSub .searchCategory a:active{ color:#c00; text-decoration:none;}
.navSub .searchCategory span{ display:block; position:absolute; right:10px; top:16px; width:9px; height:9px; background:url(http://img1.gtimg.com/auto/pics/hv1/203/231/1595/103773983.png) no-repeat center center; -ms-transition:all 0.3s ease-in-out; -moz-transition:all 0.3s ease-in-out; -webkit-transition:all 0.3s ease-in-out; -o-transition:all 0.3s ease-in-out; transition:all 0.3s ease-in-out;}
.navSub .hover{ position:relative; z-index:102;}
.navSub .hover div{ width:108px; height:146px; border:1px solid #e1e1e1; border-top:0; background:#fff;}
.navSub .hover a.searchCategoryBt{ padding-left:9px;}
.navSub .hover span{ right:9px; -ms-transform:rotate(180deg); -moz-transform:rotate(180deg); -webkit-transform:rotate(180deg); -o-transform:rotate(180deg); transform:rotate(180deg); -ms-transition:all 0.3s ease-in-out; -moz-transition:all 0.3s ease-in-out; -webkit-transition:all 0.3s ease-in-out; -o-transition:all 0.3s ease-in-out; transition:all 0.3s ease-in-out;}
.navSub .searchCategory ul{ display:none; z-index:99999; float:none; width:106px; padding:1px; background:#fafafa;}
.navSub .searchCategory li{ float:none; height:25px; border-top:1px solid #efefef; padding:0; font:12px/25px "\5B8B\4F53";}
.navSub .searchCategory li a{ display:block; height:25px; text-align:center;}
.navSub .searchCategory li a:link,.navSub .searchCategory li a:visited{ color:#333;}
.navSub .searchCategory li a:hover,.navSub .searchCategory li a:active{ background:#1c8dd5; color:#fff;}

/* 公共布局补充
----------------------------------------------- */

/* 宽1000px
.all_nav{ width:1000px;}
.all_nav li{ width:66px;}
.all_nav li.first{ width:76px;}
.navSub{ width:1000px;}
 */
 
/* 宽960px */
.layout{ width:960px;}
.all_nav{ width:960px;}
.all_nav li{ width:64px;}
.all_nav li.first{ width:64px;}
.navSub{ width:960px;}


.W1000{ width:1000px;}
.mt15{margin-top:25px!important}
.hide_panel .up_arr{ left:180px;}
.fl{ float:left;}
.fr{ float:right;}

.wrap .right .layout{ width:100% !important;}
</style>

<!--全站导航-->
	<!--全站导航-->
	<div class="all_nav layout mt15" bosszone="all">
		<ul id="autoMianNav">
			<li class="first"><a href="http://auto.qq.com" target="_blank">首页</a></li>
			<li><a href="http://data.auto.qq.com/car_brand/index.shtml" target="_blank">选车</a></li>
			<li><a href="http://auto.qq.com/newcar.htm" target="_blank">新车</a></li>
			<li><a href="http://auto.qq.com/guide.htm" target="_blank">导购</a></li>
			<li><a href="http://auto.qq.com/evaluat.htm" target="_blank">评测</a></li>
			<li><a href="http://data.auto.qq.com/car_public/1/hq.shtml" target="_blank">行情</a></li>
			<li><a href="http://auto.qq.com/jiangjia.htm" target="_blank">降价</a></li>
			<li><a href="http://auto.qq.com/service.htm" target="_blank">用车</a></li>
			<li><a href="http://auto.qq.com/tech.htm" target="_blank">科技</a></li>
			<li><a href="http://auto.qq.com/club.htm" target="_blank">互动</a></li>
			<li><a href="http://auto.qq.com/news.htm" target="_blank">行业</a></li>
			<li><a href="http://auto.qq.com/comment.htm" target="_blank">评论</a></li>
			<li><a href="http://auto.qq.com/autophoto.htm" target="_blank">图吧</a></li>
			<li><a href="http://auto.qq.com/topcar/index.htm" target="_blank">御驾</a></li>
			<li><a href="http://auto.qq.com/Zhuanti/huizong.htm" target="_blank">专题</a></li>
		</ul>
	</div>
	<script>
	//<![CDATA[
		function lightAutoNav(obj){
			var curHref = window.location.href.replace(window.location.search,'');
			var mianNavA = document.getElementById(obj).getElementsByTagName("a");
			for (var i = 0; i < mianNavA.length; i++) {
				if(mianNavA[i].href == curHref){
					mianNavA[i].href = "javascript:void(0);";
					mianNavA[i].className = "active";
					mianNavA[i].target = "_self";
				}
			}
		}
		lightAutoNav("autoMianNav");
	//]]>
	</script><!--[if !IE]>|xGv00|04211ba1d6c69423934950a3a407b82e<![endif]-->
<!-- 子导航 -->
<div class="wrapper navSub">
	<div class="searchAutoBrand">
		<script type="text/javascript">
		//热门品牌列表
		var g_HotBrandList="大众 丰田 本田 日产 别克 奥迪 雪佛兰 福特 宝马 现代 比亚迪 马自达 奇瑞 长城";
		</script>
		<script type="text/javascript">
		//车型搜索导航数据统计
		//10:品牌打开
		//13:车系点击
		//14:厂商点击
		//30:关键字输入框点击
		//31:关键字推荐车系
		//32:关键字搜索
		
		if((typeof g_boss_img) === 'undefined'){
			var g_boss_img = new Image(1,1);
		}
		function BossLinkAutoTopSearch(iLinkType,iSelect,sKeyword){
			//汽车首页搜索
			g_boss_img.src="http://btrace.qq.com/collect?sIp=&iQQ=&sBiz=&sOp=&iSta=&iTy=306&iFlow=&iPage=0&iLinkType=" + iLinkType + "&iSelect=" + iSelect + "&sKeyword="+sKeyword;
		}
		var AutoSiteSearch={
			letterList:"A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z",
			cur_page:0, //0:普通页面,没有选中态; 1:车系首页,该车系需要选中态; 2:品牌首页(例如长安福特)，该品牌需要选中态;
			selectedLid:0,
			selectedBid:0,
			selectedSid:0,
			serialPageLid:0,
			serialPageBid:0,
			serialPageSBid:0,
			serialPageSid:0,
			$:function(s){
				return(typeof s=='object')?s:document.getElementById(s);
			},
			bind:function(el,evt,fn){
				if(el.attachEvent){
					el.attachEvent("on"+evt,fn);
				}else if(el.addEventListener){
					el.addEventListener(evt,fn,false);
				}else{
					el["on"+evt]=fn;
				}
			},//$(s)
			Browser:{
		
				ie:/msie/.test(window.navigator.userAgent.toLowerCase()),
				moz:/gecko/.test(window.navigator.userAgent.toLowerCase()),
				opera:/opera/.test(window.navigator.userAgent.toLowerCase()),
				safari:/safari/.test(window.navigator.userAgent.toLowerCase())
		
			},
		
			JsLoader:{
				load: function(sUrl, fCallback, chset)
				{
		
					var _script = document.createElement("script");
					_script.setAttribute("type", "text/javascript");
					_script.setAttribute("src", sUrl);
		
					if (chset)
					_script.setAttribute("charset", chset);
					else
					_script.setAttribute("charset", "gb2312");
		
					document.getElementsByTagName("head")[0].appendChild(_script);
		
					if (AutoSiteSearch.Browser.ie)
					{
						_script.onreadystatechange = function()
						{
							if (this.readyState=="loaded" || this.readyState=="complete")
							{
								fCallback();
							}
						};
					}
					else if (AutoSiteSearch.Browser.moz)
					{
						_script.onload = function()
						{
							fCallback();
						};
					}
					else
					{
						fCallback();
					}
				}
			},
			openSelectPanelForSerialPage:function(){
				var url="http://js.data.auto.qq.com/car_public/1/manufacturer_list_json.js";
				AutoSiteSearch.JsLoader.load(url,function(){
					var strHtml="";	
					var data=oManufacturerData.arrManufacturer;
					var len=data.length;
					for(var i=0;i<len;i++)
					{
						var item=data[i];
						if(AutoSiteSearch.serialPageBid==item['ID'])
						{
							var first_letter=item['FirstLetter'];
							var letters_arr=AutoSiteSearch.letterList.split(",");
							for(var i_letter=0;i_letter<letters_arr.length;i_letter++)
							{
								if(letters_arr[i_letter].indexOf(first_letter)>=0)
								{
									AutoSiteSearch.serialPageLid=i_letter+1;
									AutoSiteSearch.selectLetters(AutoSiteSearch.serialPageLid, letters_arr[i_letter]);
									AutoSiteSearch.selectBrand(AutoSiteSearch.serialPageBid);
									return;
								}
							}
						}
					}
				})
			},
			openSelectPanel:function(){
				var cc = document.getElementById("autoselectpanel");
				if (cc.className == "undis") {
					cc.className="dis";
					document.getElementById("changeid").className="changed";
					if(this.serialPageBid!=0 && this.serialPageLid==0)
					{
						//车系页、经销商页、品牌页首次打开车型选单
						this.openSelectPanelForSerialPage();

						return;
					}
					if(this.selectedLid == 0 && this.selectedBid == 0)
					{
						this.selectLetters(0,'hot');
					}
				}
				else {
					this.closeSelectPanel();
				}
			},
			closeSelectPanel:function(){
				var cc = document.getElementById("autoselectpanel");
				cc.className="undis";
				document.getElementById("changeid").className="change";
			},
			selectLetters:function(lid,letters) {
				for(i=0;i<=26;i++)
				{
					var temp = document.getElementById("Letters_"+i);
					if (temp)
					{
						if(i==lid)
							temp.className = "on";
						else
							temp.className = "";
					}
				}
			
				if(this.selectedLid != 0)
					this.selectedBid = 0;
				this.selectedLid = lid;
				this.createBrandContent(letters);
			
				this.setSerialDisplay(false);
			},
			createBrandContent:function(letters) {
				var brand_content=document.getElementById("brand_content");
				if(!brand_content)
					return;
				var url="http://js.data.auto.qq.com/car_public/1/manufacturer_list_json.js";
				AutoSiteSearch.JsLoader.load(url,function(){
					var strHtml="";	
					var data=oManufacturerData.arrManufacturer;
					var len=data.length;
					if(letters == "hot")
					{
						//热门品牌
						var brand_list=g_HotBrandList;
						var brand_arr=brand_list.split(" ");
						for(var b_i=0; b_i<brand_arr.length; b_i++)
						{
							for(var i=0;i<len;i++)
							{
								var item=data[i];
								if(brand_arr[b_i]==item["Name"])
								{
									//<li><a href="#" id="Brand_2" onclick="selectBrand(2);" class="on" >铃木</a></li>
									strHtml+='<li panel="auto_select"><a href="#" hideFocus="true" id="Brand_'+item['ID']+'" panel="auto_select" onclick="AutoSiteSearch.selectBrand('+item['ID']+');return false;" >'+item['Name']+'</a></li>';
								}
							}
						}
					}
					else
					{
						for(var i=0;i<len;i++)
						{
							var item=data[i];
							if(letters.indexOf(item["FirstLetter"])>=0)
							{
								//<li><a href="#" id="Brand_2" onclick="selectBrand(2);" class="on" >铃木</a></li>
								if(AutoSiteSearch.selectedBid == item['ID'])
									strHtml+='<li panel="auto_select"><a class="on" href="#" hideFocus="true" id="Brand_'+item['ID']+'" panel="auto_select" onclick="AutoSiteSearch.selectBrand('+item['ID']+');return false;" >'+item['Name']+'</a></li>';
								else
									strHtml+='<li panel="auto_select"><a href="#" hideFocus="true" id="Brand_'+item['ID']+'" panel="auto_select" onclick="AutoSiteSearch.selectBrand('+item['ID']+');return false;" >'+item['Name']+'</a></li>';
							}
						}
					}
					brand_content.innerHTML=strHtml;
				})
			},
			setSerialDisplay:function(bDisplay) {
				var tmp=document.getElementById("autoselectserialbox");
				if(tmp)
				{
					if(bDisplay){
						tmp.className = "dis";
						document.getElementById("autoselectpanel").style.width = "668px";
					}else{
						tmp.className = "undis";
						document.getElementById("autoselectpanel").style.width = "253px";
					}
				}
			},
			selectBrand:function(bid) {
				if(this.selectedBid!=0)
				{
		
					var last_selected = document.getElementById("Brand_"+this.selectedBid);
					if(last_selected)
					{
						last_selected.className = "";
					}
				}
				var current_selected = document.getElementById("Brand_"+bid);
				if(current_selected)
				{
					current_selected.className = "on";
					this.selectedBid = bid;
				}
					
				this.createSerialContent(bid);
				this.setSerialDisplay(true);
				
				BossLinkAutoTopSearch(10,bid,""); //选择了品牌
			},
			createSerialContent:function(bid){
				var serial_content=document.getElementById("serial_content");
				if(!serial_content)
					return;
				var surl="http://js.data.auto.qq.com/car_manufacturer/"+bid+"/serial_list_json.js";
				AutoSiteSearch.JsLoader.load(surl,function(){
					var data=oManufacturerSerialData.arrSerial;
					var len=data.length;
					var brand_arr = new Array();//例如：长安福特、进口福特
					var strHtml_arr = new Array();
					for(var i=0;i<len;i++)


					{
						var item=data[i];
						if(item['ID'] == 727) //只有该车系名称过长
							item['PureName']="COUNTRYMAN";
						var arr_pos = AutoSiteSearch.pos_in_array(brand_arr,item['BrandName']);
						if(arr_pos < 0)
						{
							var stmp = ""; 
							if(2 == AutoSiteSearch.cur_page && item['BrandId'] == AutoSiteSearch.serialPageSBid)
								stmp += '<dt panel="auto_select" ><a panel="auto_select" class="disable" href="#">' + item['BrandName'] + '</a></dt>';
							else
								stmp += '<dt panel="auto_select" ><a panel="auto_select" target="_blank" href="http://data.auto.qq.com/car_brand/' + item['BrandId'] + '/index.shtml" onclick="AutoSiteSearch.selectManu(' + item['BrandId'] + ');">' + item['BrandName'] + '</a></dt>';
							stmp += '<dd panel="auto_select" ><ul panel="auto_select">';
							if(item['ID'] == AutoSiteSearch.serialPageSid)
								stmp += '	<li panel="auto_select">·<a panel="auto_select" class="disable" href="#">' + item['PureName'] + '</a></li>';
							else
								stmp += '	<li panel="auto_select">·<a panel="auto_select" target="_blank" href="http://data.auto.qq.com/car_serial/' + item['ID'] + '/index.shtml" onclick="AutoSiteSearch.selectSerial(' + item['ID'] + ');">' + item['PureName'] + '</a></li>';
							brand_arr.push(item['BrandName']);
							strHtml_arr.push(stmp);
						}
						else
						{
							if(item['ID'] == AutoSiteSearch.serialPageSid)
								strHtml_arr[arr_pos] += '	<li panel="auto_select">·<a panel="auto_select" class="disable" href="#">' + item['PureName'] + '</a></li>';
							else
								strHtml_arr[arr_pos] += '	<li panel="auto_select">·<a panel="auto_select" target="_blank" href="http://data.auto.qq.com/car_serial/' + item['ID'] + '/index.shtml" onclick="AutoSiteSearch.selectSerial(' + item['ID'] + ');">' + item['PureName'] + '</a></li>';
						}
					}
					var strHtml = "";
					for(var i=0;i<strHtml_arr.length;i++)
					{
						strHtml_arr[i] += '</ul></dd>';
						strHtml += strHtml_arr[i];
					}
					serial_content.innerHTML=strHtml;
				})
			},
			pos_in_array:function(arr,ele) {
				for(var i=0;i<arr.length;i++)
				{
					if(arr[i] == ele)
					return i;
				}
				return -1;
			},
			selectSerial:function(sid){
				BossLinkAutoTopSearch(13,sid,""); //按车系搜索
			},
			selectManu:function(mid){
				BossLinkAutoTopSearch(14,mid,""); //按厂商搜索
			},
			collapseAllSelects:function(){
				var list=document.getElementsByTagName("div");
				for(var i=0,len=list.length;i<len;i++){
					var item=list[i];
					if(item.getAttribute("isselect")){
						item.style.display="none";
					}
				}
			},//collapseAllSelects()
			collapseOtherSelects:function(thisid){
				var list=document.getElementsByTagName("div");
				for(var i=0,len=list.length;i<len;i++){
					var item=list[i];
					if(item.getAttribute("isselect")&&item.id!=thisid){
						item.style.display="none";
					}
				}
			}
		};
		</script>
		<script type="text/javascript">
		(function(){
			/****
			var strEvent="mousedown";
			if(AutoSiteSearch.Browser.opera)
			strEvent="click";
			/****
			AutoSiteSearch.bind(AutoSiteSearch.$("id_manulist"),strEvent,function(evt){
				evt=evt||window.event;
				AutoSiteSearch.selectManu(evt);
			});
			****/
			AutoSiteSearch.bind(document,"click",function(evt){
				evt=evt||window.event;
				var el=evt.srcElement||evt.target;
				var tn=el.tagName.toUpperCase();
				
				if(((tn==="A"||tn==="DIV")&&el.getAttribute("isselect"))){
					
				}else if(el.getAttribute("iscap")){
					AutoSiteSearch.collapseOtherSelects(el.getAttribute("selel"));
				}else{
					if(el.getAttribute("panel")==="auto_select"){
		
					}
					else{
						AutoSiteSearch.closeSelectPanel();
					}
					AutoSiteSearch.collapseAllSelects();
				}
			});
		})();
		</script>
		<div class="searchautobox">
			<div id="changeid" class="change" panel="auto_select" onclick="AutoSiteSearch.openSelectPanel();">按品牌选车</div>
			<div id="autoselectpanel" class="undis">
				<div class="close" title="关闭" onclick="AutoSiteSearch.closeSelectPanel();">关闭</div>
				<div class="inner" panel="auto_select"> 
					<!-- 品牌 -->
					<div class="cbbox" panel="auto_select"> 
						<!-- 品牌字母列表 -->
						<div class="zimu" panel="auto_select">
							<ul panel="auto_select">
								<li panel="auto_select" class="t"><a href="#" hideFocus="true" panel="auto_select" id="Letters_0" onclick="AutoSiteSearch.selectLetters(0,'hot');return false;">热门品牌</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_1" onclick="AutoSiteSearch.selectLetters(1,'A');return false;">A</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_2" onclick="AutoSiteSearch.selectLetters(2,'B');return false;">B</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_3" onclick="AutoSiteSearch.selectLetters(3,'C');return false;">C</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_4" onclick="AutoSiteSearch.selectLetters(4,'D');return false;">D</a></li>
								<li panel="auto_select">E</li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_6" onclick="AutoSiteSearch.selectLetters(6,'F');return false;">F</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_7" onclick="AutoSiteSearch.selectLetters(7,'G');return false;">G</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_8" onclick="AutoSiteSearch.selectLetters(8,'H');return false;">H</a></li>
								<li panel="auto_select">I</li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_10" onclick="AutoSiteSearch.selectLetters(10,'J');return false;">J</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_11" onclick="AutoSiteSearch.selectLetters(11,'K');return false;">K</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_12" onclick="AutoSiteSearch.selectLetters(12,'L');return false;">L</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_13" onclick="AutoSiteSearch.selectLetters(13,'M');return false;">M</a></li>
								<li panel="auto_select">N</li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_15" onclick="AutoSiteSearch.selectLetters(15,'O');return false;">O</a></li>
								<li panel="auto_select">P</li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_17" onclick="AutoSiteSearch.selectLetters(17,'Q');return false;">Q</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_18" onclick="AutoSiteSearch.selectLetters(18,'R');return false;">R</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_19" onclick="AutoSiteSearch.selectLetters(19,'S');return false;">S</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_20" onclick="AutoSiteSearch.selectLetters(20,'T');return false;">T</a></li>
								<li panel="auto_select">U</li>
								<li panel="auto_select">V</li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_23" onclick="AutoSiteSearch.selectLetters(23,'W');return false;">W</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_24" onclick="AutoSiteSearch.selectLetters(24,'X');return false;">X</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_25" onclick="AutoSiteSearch.selectLetters(25,'Y');return false;">Y</a></li>
								<li panel="auto_select"><a href="#" hideFocus="true" panel="auto_select" id="Letters_26" onclick="AutoSiteSearch.selectLetters(26,'Z');return false;">Z</a></li>
							</ul>
						</div>


						<!-- 品牌名称列表 -->
						<div class="list" panel="auto_select">
							<ul id="brand_content" panel="auto_select"></ul>
						</div>
					</div>
					<!-- 车系 -->
					<div class="undis" id="autoselectserialbox" panel="auto_select"> 
						<dl id="serial_content" panel="auto_select"></dl>
					</div>
				</div>
			</div>
			<span class="line"></span>
		</div>
	</div>
	<div class="searchCategory" id="searchCategory">
		<div>
			<a href="javascript:void(0);" target="_self" class="searchCategoryBt">车型大全</a>
			<span></span>
			<ul>
				<!--<li><a target="_blank" href="http://data.auto.qq.com/car_brand/index.shtml" onClick="BossLinkAutoTopSearch(41,0,'');">按品牌</a></li>-->
				<li><a target="_blank" href="http://data.auto.qq.com/car_public/1/index_price.shtml" onClick="BossLinkAutoTopSearch(42,0,'');">按价格</a></li>
				<li><a target="_blank" href="http://data.auto.qq.com/car_public/1/index_type.shtml" onClick="BossLinkAutoTopSearch(43,0,'');">按级别</a></li>
				<li><a target="_blank" href="http://data.auto.qq.com/car_public/1/index_country.shtml" onClick="BossLinkAutoTopSearch(45,0,'');">按国别</a></li>
				<li><a target="_blank" href="http://data.auto.qq.com/car_public/1/index_use.shtml" onClick="BossLinkAutoTopSearch(46,0,'');">按用途</a></li>
			</ul>
		</div>
	</div>
	<ul id="navSub">
		<li><a href="http://data.auto.qq.com/car_brand/index.shtml" target="_self">选车</a></li>
		<li><a id="gouche_tuku" href="http://data.auto.qq.com/piclib/index.shtml" target="_self">图库</a></li>
		<li><a href="http://cgi.data.auto.qq.com/php/search.php" target="_self">选车工具</a></li>
		<li><a href="http://data.auto.qq.com/car_public/1/compare.shtml" target="_self">车型对比</a></li>
		<li><a href="http://data.auto.qq.com/car_public/1/calc.shtml#stype=quankuan&brandid=0&seriesid=0&modelid=0&firstpay=3&year=3" target="_self">导购计算</a></li>
		<li><a href="http://data.auto.qq.com/car_video/index.shtml" target="_self">视频导购</a></li>
		<li><a href="http://data.auto.qq.com/car_public/1/wom.shtml" target="_self">车友点评</a></li>
		<li><a href="http://data.auto.qq.com/car_public/1/ratingrank.shtml#list=0,3" target="_self">排行榜</a></li>
	</ul>
</div>
<script>
//<![CDATA[
	// 隐藏主导航
	function hiddenNav(n){
		document.getElementById("autoMianNav").getElementsByTagName("li")[n].style.display = "none";
	}
	//hiddenNav(7);
	//hiddenNav(10);
	
	// 车型大全下拉
	function categoryShowHidden(obj){
		var obj = document.getElementById(obj);
		obj.onmouseover = function(){
			this.className = "searchCategory hover";
			this.getElementsByTagName("ul")[0].style.display = "block"
		}
		obj.onmouseout = function(){
			this.className = "searchCategory";
			this.getElementsByTagName("ul")[0].style.display = "none"
		}
	}
	categoryShowHidden("searchCategory");
	
	// 点亮当前主导航
	function lightAutoMainNav(obj,n){
		var mianNavA = document.getElementById(obj).getElementsByTagName("a");
		mianNavA[n].className = "active";
		mianNavA[n].href = "javascript:void(0);";
		mianNavA[n].target = "_self";
	}
	lightAutoMainNav("autoMianNav",1);
	
	// 点亮当前子导航
	function lightAutoSubNav(obj){
		var curHref = window.location.href;
		var mianNavLi = document.getElementById(obj).getElementsByTagName("li");
		for (var i = 0; i < mianNavLi.length; i++){
			var mianNavLiA = mianNavLi[i].getElementsByTagName("a")[0];
			if(mianNavLiA.href == curHref){
				mianNavLi[i].className = "on";
				mianNavLiA.href = "javascript:void(0);";
				mianNavLiA.target = "_self";
			}
		}
		//图库子导航点亮处理
		var tuku = new Array(5);
		tuku[0] = "http://data.auto.qq.com/piclib/index.shtml";
		tuku[1] = "http://data.auto.qq.com/piclib/tujie.shtml";
		tuku[2] = "http://data.auto.qq.com/piclib/chequ.shtml";
		tuku[3] = "http://data.auto.qq.com/piclib/model.shtml";
		tuku[4] = "http://data.auto.qq.com/piclib/mshow.shtml";
		if(tuku[0] == curHref || tuku[1] == curHref || tuku[2] == curHref || tuku[3] == curHref || tuku[4] == curHref){
			var mianNavLi1A = mianNavLi[1].getElementsByTagName("a")[0];
			mianNavLi[1].className = "on";
			mianNavLi1A.href = "javascript:void(0);";
			mianNavLi1A.target = "_self";
		}
	}
	lightAutoSubNav("navSub");
//]]>
</script><div class="xzcxbox1">
 <dl class="tjxz">
  <dt class="tjxz">按价格选：</dt>
  <dd class="tjxz blue039">
  	<span class="span_a span_disable" style="cursor:default" onclick="javascript:set_and_href('price',0);javascript:FBossStatSearch('price',0,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="不限"><a href="#">不限</a></span><span  onclick="javascript:set_or_href('price',1);javascript:FBossStatSearch('price',1,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="5万元以下"><a href="#">5万元以下</a></span><span  onclick="javascript:set_or_href('price',2);javascript:FBossStatSearch('price',2,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="5-10万元"><a href="#">5-10万元</a></span><span  onclick="javascript:set_or_href('price',4);javascript:FBossStatSearch('price',4,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="10-15万元"><a href="#">10-15万元</a></span><span  onclick="javascript:set_or_href('price',8);javascript:FBossStatSearch('price',8,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="15-20万元"><a href="#">15-20万元</a></span><span  onclick="javascript:set_or_href('price',16);javascript:FBossStatSearch('price',16,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="20-30万元"><a href="#">20-30万元</a></span><span  onclick="javascript:set_or_href('price',32);javascript:FBossStatSearch('price',32,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="30-50万元"><a href="#">30-50万元</a></span><span  onclick="javascript:set_or_href('price',64);javascript:FBossStatSearch('price',64,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="50万元以上"><a href="#">50万元以上</a></span>
  </dd>
  
  <dt class="tjxz">按排量选：</dt>
  <dd class="tjxz blue039"><span class="span_a span_disable" style="cursor:default" onclick="javascript:set_and_href('displacement',0);javascript:FBossStatSearch('displacement',0,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="不限"><a href="#">不限</a></span><span  onclick="javascript:set_or_href('displacement',1);javascript:FBossStatSearch('displacement',1,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="1.0L以下"><a href="#">1.0L以下</a></span><span  onclick="javascript:set_or_href('displacement',2);javascript:FBossStatSearch('displacement',2,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="1.0-1.2L"><a href="#">1.0-1.2L</a></span><span  onclick="javascript:set_or_href('displacement',4);javascript:FBossStatSearch('displacement',4,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="1.3-1.5L"><a href="#">1.3-1.5L</a></span><span  onclick="javascript:set_or_href('displacement',8);javascript:FBossStatSearch('displacement',8,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="1.6L"><a href="#">1.6L</a></span><span  onclick="javascript:set_or_href('displacement',16);javascript:FBossStatSearch('displacement',16,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="1.8L"><a href="#">1.8L</a></span><span  onclick="javascript:set_or_href('displacement',32);javascript:FBossStatSearch('displacement',32,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="2.0-2.4L"><a href="#">2.0-2.4L</a></span><span  onclick="javascript:set_or_href('displacement',64);javascript:FBossStatSearch('displacement',64,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="2.5-3.0L"><a href="#">2.5-3.0L</a></span><span  onclick="javascript:set_or_href('displacement',128);javascript:FBossStatSearch('displacement',128,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="3.0-3.5L"><a href="#">3.0-3.5L</a></span><span  onclick="javascript:set_or_href('displacement',256);javascript:FBossStatSearch('displacement',256,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="3.6-4.2L"><a href="#">3.6-4.2L</a></span><span  onclick="javascript:set_or_href('displacement',512);javascript:FBossStatSearch('displacement',512,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="4.2L以上"><a href="#">4.2L以上</a></span>
  </dd>
  <dt class="tjxz">按变速箱：</dt>
  <dd class="tjxz blue039"><span class="span_a span_disable" style="cursor:default" onclick="javascript:set_and_href('gearbox',0);javascript:FBossStatSearch('gearbox',0,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="不限"><a href="#">不限</a></span><span  onclick="javascript:set_or_href('gearbox',1);javascript:FBossStatSearch('gearbox',1,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="手动"><a href="#">手动</a></span><span  onclick="javascript:set_or_href('gearbox',2);javascript:FBossStatSearch('gearbox',2,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="自动"><a href="#">自动</a></span><span  onclick="javascript:set_or_href('gearbox',4);javascript:FBossStatSearch('gearbox',4,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="手自一体"><a href="#">手自一体</a></span><span  onclick="javascript:set_or_href('gearbox',8);javascript:FBossStatSearch('gearbox',8,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="无级变速"><a href="#">无级变速</a></span><span  onclick="javascript:set_or_href('gearbox',16);javascript:FBossStatSearch('gearbox',16,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="双离合"><a href="#">双离合</a></span>
  </dd>
  <dt class="tjxz">按配置选：</dt>
  <dd class="tjxz blue039">
  	<span class="span_a span_disable" style="cursor:default" onclick="javascript:set_or_href('configure',0);javascript:FBossStatSearch('configure',0,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="不限"><a href="#">不限</a></span><span  onclick="javascript:set_or_href('configure',1);javascript:FBossStatSearch('configure',1,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="天窗"><a href="#">天窗</a></span><span  onclick="javascript:set_or_href('configure',2);javascript:FBossStatSearch('configure',2,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="电子导航"><a href="#">电子导航</a></span><span  onclick="javascript:set_or_href('configure',4);javascript:FBossStatSearch('configure',4,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="泊车辅助"><a href="#">泊车辅助</a></span><span  onclick="javascript:set_or_href('configure',8);javascript:FBossStatSearch('configure',8,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="无钥匙启动"><a href="#">无钥匙启动</a></span><span  onclick="javascript:set_or_href('configure',16);javascript:FBossStatSearch('configure',16,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="定速巡航"><a href="#">定速巡航</a></span><span  onclick="javascript:set_or_href('configure',32);javascript:FBossStatSearch('configure',32,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="氙气大灯"><a href="#">氙气大灯</a></span><span  onclick="javascript:set_or_href('configure',64);javascript:FBossStatSearch('configure',64,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="车载蓝牙"><a href="#">车载蓝牙</a></span><span  onclick="javascript:set_or_href('configure',128);javascript:FBossStatSearch('configure',128,this);" onmouseover="javascript:mouseonit(this);" onmouseout="javascript:mouseoutit(this);" title="车身稳定控制"><a href="#">车身稳定控制</a></span>
  </dd>
 </dl>
</div>	<DIV class="tjts" style="FONT-SIZE: 12px;position:relative;"><span  class="blue039" style="float:right;"><a id="tospt_1" href="javascript:linktosupport();">反馈建议</a>&nbsp;&nbsp;</span>符合条件的记录共0条&nbsp;</DIV>
<div class="xczxwarp">
 <div class="xczxcol708" style="" align="center">
   <div class="ppxsbox" style="border-bottom-style:none;">
 <div align="center" class= "d1" style="height:678px; height:129px; border: 1px;border-color:#FFEFB7; border-style:solid;background-color:#FFFCE5;margin-top:23px;" >
  <div style="padding-top:32px;"></div>
  <div style="padding-bottom:10px;color: #0489b7;font-weight: bold;font-size:16px;">欢迎使用腾讯车型大全高级搜索</div>
<div style=" width:308px; color:A3D2EE;border-top:1px dashed #A3D2EE;height:1px;overflow:hidden;" ></div>
<div class="STYLE3 STYLE4" style="padding-top:10px;font-size: 12px;color: #666666">点击选择条件，搜索您想要查看的车型</div>
</div>
 </div>
 </div>
<div class="xczxcol250">
 <!--
  <div class="sctjed">
  <table width="245" border="0" cellspacing="0" cellpadding="0" align="center" style="margin-top:2px; background: url(//mat1.gtimg.com/auto/datalib/newindex/jbbg2.gif) no-repeat top">
  <tr>
    <td height="32" style="padding-left:10px;" class="gary1 fontbold">您使用过的搜车条件</td>
  </tr>
  <tr style="BACKGROUND: url(//mat1.gtimg.com/auto/datalib/newindex/xx1.gif) repeat-x 30% bottom" style="padding-left:10px;" id="qq_auto_search_type_id" class="blue039">
  </tr>
  <tr>
  	<td height="15" align="center" class="blue039">&nbsp;</td>
  </tr>
  <tr>
    <td height="34" align="center" class="blue039">tccar</td>
  </tr>
  <tr>
    <td height="34" valign="top">
	    <table width="245" border="0" cellspacing="0" cellpadding="0">
	      <tr>
	        <td width="63">&nbsp;</td>
	        <td width="97"><img src="//mat1.gtimg.com/auto/datalib/newindex/bcbut1.gif" width="86" height="23" style="cursor:pointer" onclick="return save_search_type('');" /></td>
	        <td width="23"></td>
	        <td width="62" valign="bottom" class="blue039 fontl20"></td>
	      </tr>
	    </table>
    </td>
  </tr>
</table>
</div>
-->
  <!--<div class="ad1"><img src="//mat1.gtimg.com/auto/datalib/newindex/img4.gif" width="250" height="230" alt="广告"  /></div>-->
  <table width="250" border="0" cellspacing="0" cellpadding="0" style="border:1px solid #D4D4D4; border-right:none; margin-top:0px;" class="mart10">
  <!--<tr>
	<td align="right" height="20px" valign="bottom" class="blue039"><a id="tospt_2" href="javascript:linktosupport();">反馈建议</a>&nbsp;&nbsp;</td>
  </tr>-->
   <tr>
     <td height="628" valign="top">
     
     <div class="mod2" style="border:none;border-bottom:1px solid #d7d7d7">
      <div class="inner">
        <div class="hd">
          <h5>网友关注车型</h5>
        </div>
        <div class="bd">
          <div id="tab">
            <ul>
              <li class="ck" onmouseover="tabss_z('tab','cont',0,'li','table')">热门车</li>
              <li onmouseover="tabss_z('tab','cont',1,'li','table')">新车</li>
            </ul>
          </div>
          <div id="cont">
            <table width="220" border="0" cellspacing="0" cellpadding="0" class="dis">
            <tr>
                <th width="38">排名</th>
                <th width="92">车型名称</th>
                <th width="90" class="cen">价格</th>
                </tr>
              <tr>
	<td></td>
	<td class="blue1"><a title="上汽大通T60" href="http://data.auto.qq.com/car_serial/1745/index.shtml" target="_blank">上汽大通T60</a></td>
	<td align="right" class="gary1">19.98-19.98万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="Velite" href="http://data.auto.qq.com/car_serial/1744/index.shtml" target="_blank">Velite</a></td>
	<td align="right" class="gary1">0.00-0.00万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="第五代发现" href="http://data.auto.qq.com/car_serial/1743/index.shtml" target="_blank">第五代发现</a></td>
	<td align="right" class="gary1">0.00-0.00万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="荣威ei6" href="http://data.auto.qq.com/car_serial/1742/index.shtml" target="_blank">荣威ei6</a></td>
	<td align="right" class="gary1">0.00-0.00万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="荣威i6" href="http://data.auto.qq.com/car_serial/1741/index.shtml" target="_blank">荣威i6</a></td>
	<td align="right" class="gary1">0.00-0.00万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="哈弗H2s" href="http://data.auto.qq.com/car_serial/1740/index.shtml" target="_blank">哈弗H2s</a></td>
	<td align="right" class="gary1">8.38-10.28万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="巴博斯 smart fortwo" href="http://data.auto.qq.com/car_serial/1739/index.shtml" target="_blank">巴博斯 smart fortwo</a></td>
	<td align="right" class="gary1">22.80-22.80万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="巴博斯 smart forfour" href="http://data.auto.qq.com/car_serial/1738/index.shtml" target="_blank">巴博斯 smart forfour</a></td>
	<td align="right" class="gary1">23.80-23.80万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="名爵ZS" href="http://data.auto.qq.com/car_serial/1737/index.shtml" target="_blank">名爵ZS</a></td>
	<td align="right" class="gary1">0.00-0.00万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="Giulia" href="http://data.auto.qq.com/car_serial/1736/index.shtml" target="_blank">Giulia</a></td>
	<td align="right" class="gary1">0.00-0.00万</td>
</tr>

            </table>
            <table width="220" border="0" cellspacing="0" cellpadding="0" class="undis">
            <tr>
                <th width="38">排名</th>
                <th width="92">车型名称</th>
                <th width="90" class="cen">价格</th>
                </tr>
              <tr>
	<td></td>
	<td class="blue1"><a title="上汽大通T60" href="http://data.auto.qq.com/car_serial/1745/index.shtml" target="_blank">上汽大通T60</a></td>
	<td align="right" class="gary1">19.98-19.98万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="Velite" href="http://data.auto.qq.com/car_serial/1744/index.shtml" target="_blank">Velite</a></td>
	<td align="right" class="gary1">0.00-0.00万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="第五代发现" href="http://data.auto.qq.com/car_serial/1743/index.shtml" target="_blank">第五代发现</a></td>
	<td align="right" class="gary1">0.00-0.00万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="荣威ei6" href="http://data.auto.qq.com/car_serial/1742/index.shtml" target="_blank">荣威ei6</a></td>
	<td align="right" class="gary1">0.00-0.00万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="荣威i6" href="http://data.auto.qq.com/car_serial/1741/index.shtml" target="_blank">荣威i6</a></td>
	<td align="right" class="gary1">0.00-0.00万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="哈弗H2s" href="http://data.auto.qq.com/car_serial/1740/index.shtml" target="_blank">哈弗H2s</a></td>
	<td align="right" class="gary1">8.38-10.28万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="巴博斯 smart fortwo" href="http://data.auto.qq.com/car_serial/1739/index.shtml" target="_blank">巴博斯 smart fortwo</a></td>
	<td align="right" class="gary1">22.80-22.80万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="巴博斯 smart forfour" href="http://data.auto.qq.com/car_serial/1738/index.shtml" target="_blank">巴博斯 smart forfour</a></td>
	<td align="right" class="gary1">23.80-23.80万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="名爵ZS" href="http://data.auto.qq.com/car_serial/1737/index.shtml" target="_blank">名爵ZS</a></td>
	<td align="right" class="gary1">0.00-0.00万</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="Giulia" href="http://data.auto.qq.com/car_serial/1736/index.shtml" target="_blank">Giulia</a></td>
	<td align="right" class="gary1">0.00-0.00万</td>
</tr>

            </table>
          </div>
        </div>
      </div>
    </div>
    <!--汽车关注榜end-->
 <!--网友点评榜begin-->
    <div class="mod2" style="border:none;">
      <div class="inner">
        <div class="hd">
          <h5>车友热评榜</h5>
        </div>
        <div class="bd">
          <div id="tab1">
            <ul>
              <li class="ck" onmouseover="tabss_z('tab1','cont1',0,'li','table')">周排行</li>
              <li onmouseover="tabss_z('tab1','cont1',1,'li','table')">总排行</li>
            </ul>
          </div>
          <div id="cont1">
            <table width="220" border="0" cellspacing="0" cellpadding="0" class="dis">
              <tr>
                <th width="38">排名</th>
                <th width="105">车型名称</th>
                <th width="52" align="right" class="r">总点评量</th>
                <th width="25">&nbsp;</th>
              </tr>
              <tr>
	<td></td>
	<td class="blue1"><a title="上汽大通T60" href="http://data.auto.qq.com/car_serial/1745/index.shtml" target="_blank">上汽大通T60</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="Velite" href="http://data.auto.qq.com/car_serial/1744/index.shtml" target="_blank">Velite</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="第五代发现" href="http://data.auto.qq.com/car_serial/1743/index.shtml" target="_blank">第五代发现</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="荣威ei6" href="http://data.auto.qq.com/car_serial/1742/index.shtml" target="_blank">荣威ei6</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="荣威i6" href="http://data.auto.qq.com/car_serial/1741/index.shtml" target="_blank">荣威i6</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="哈弗H2s" href="http://data.auto.qq.com/car_serial/1740/index.shtml" target="_blank">哈弗H2s</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="巴博斯 smart fortwo" href="http://data.auto.qq.com/car_serial/1739/index.shtml" target="_blank">巴博斯 smart fortwo</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="巴博斯 smart forfour" href="http://data.auto.qq.com/car_serial/1738/index.shtml" target="_blank">巴博斯 smart forfour</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="名爵ZS" href="http://data.auto.qq.com/car_serial/1737/index.shtml" target="_blank">名爵ZS</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="Giulia" href="http://data.auto.qq.com/car_serial/1736/index.shtml" target="_blank">Giulia</a></td>
	<td align="right" class="gary1">0</td>
</tr>

            </table>
            <table width="220" border="0" cellspacing="0" cellpadding="0" class="undis">
              <tr>
                <th width="38">排名</th>
                <th width="105">车型名称</th>
                <th width="52" align="right" class="r">总点评量</th>
                <th width="25">&nbsp;</th>
              </tr>
              <tr>
	<td></td>
	<td class="blue1"><a title="上汽大通T60" href="http://data.auto.qq.com/car_serial/1745/index.shtml" target="_blank">上汽大通T60</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="Velite" href="http://data.auto.qq.com/car_serial/1744/index.shtml" target="_blank">Velite</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="第五代发现" href="http://data.auto.qq.com/car_serial/1743/index.shtml" target="_blank">第五代发现</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="荣威ei6" href="http://data.auto.qq.com/car_serial/1742/index.shtml" target="_blank">荣威ei6</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="荣威i6" href="http://data.auto.qq.com/car_serial/1741/index.shtml" target="_blank">荣威i6</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="哈弗H2s" href="http://data.auto.qq.com/car_serial/1740/index.shtml" target="_blank">哈弗H2s</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="巴博斯 smart fortwo" href="http://data.auto.qq.com/car_serial/1739/index.shtml" target="_blank">巴博斯 smart fortwo</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="巴博斯 smart forfour" href="http://data.auto.qq.com/car_serial/1738/index.shtml" target="_blank">巴博斯 smart forfour</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="名爵ZS" href="http://data.auto.qq.com/car_serial/1737/index.shtml" target="_blank">名爵ZS</a></td>
	<td align="right" class="gary1">0</td>
</tr>
<tr>
	<td></td>
	<td class="blue1"><a title="Giulia" href="http://data.auto.qq.com/car_serial/1736/index.shtml" target="_blank">Giulia</a></td>
	<td align="right" class="gary1">0</td>
</tr>

            </table>
          </div>
        </div>
      </div>
    </div>
    <!--网友点评榜end-->
       
      </td>
   </tr>
 </table>
 </div>
 <table width="934" border="0" cellspacing="0" cellpadding="0" align="center"></table>
</div><style>
.footer{width:960px; margin:10px auto 0}
.footer a{color:#666; }
.footer a:hover{color:#d90606; }
.footer .hd{width:960px; height:38px; background:url(http://mat1.gtimg.com/auto/datalib/serialindexv2/footerhdbg.gif) no-repeat;position:relative;  }
.scrfbox{width:301px;position:absolute; top:10px;left:265px; }
.scrfbox .input{width:257px; height:16px; float:left;padding:4px 0 1px 8px;*padding:5px 0 0 8px;_padding:5px 0 0 8px; border:none;
background:url(http://mat1.gtimg.com/auto/datalib/serialindexv2/footerpic1.gif) no-repeat;font-size:12px; color:#999}
.butf{width:36px; height:21px; line-height:24px; float:left; border:none; margin:0px; font-size:12px;
background:url(http://mat1.gtimg.com/auto/datalib/serialindexv2/footerpic2.gif) no-repeat; cursor:pointer}
.scrtxt{font-family:Tahoma,"宋体";color:#ccc;position:absolute; top:14px;left:580px;}
.scrtxt a{color:#666; }
.footer .bd{width:958px; border:1px solid #D7D7D7;border-top:none;background:#f9f9f9;color:#666; }
.footer .bd div{padding:20px 0 20px 10px;*zoom:1;overflow:hidden;}
dl.coom,dl.shequ,dl.chezhan{width:217px; line-height:24px;background:url(http://mat1.gtimg.com/auto/datalib/serialindexv2/xxs.gif) repeat-y right; float:left;margin-left:15px; display:inline }
dl.coom dt,dl.shequ dt,dl.chezhan dt{ font-size:14px; font-weight:700; }
dl.coom dd ul li,dl.shequ dd ul li,dl.chezhan dd ul li{float:left;width:90px;}
dl.shequ{width:130px; }
dl.chezhan{width:90px;background:none;  }
dl.shequ dd ul,dl.chezhan dd ul{width:90px; }
legend{display:none;}
fieldset {margin:0;padding:0;border:0 none;}

</style>

<div class="footer">
	<script language="javascript">
//拼音部分
var auto_py_key = "吖哎安肮凹八挀扳邦勹陂奔伻皀边灬憋汃冫癶峬嚓偲参仓撡冊嵾噌叉犲辿伥抄车抻阷吃充抽出膗巛刅吹旾踔呲从凑粗汆镩蹿崔邨搓咑呆丹当刀恴揼灯仾嗲敁刁爹丁丟东吺剢耑叾吨多妸奀鞥仒发帆匚飞分丰覅仏垺夫旮侅干冈皋戈给根更工勾估瓜乖关光归丨呙妎咍兯夯茠诃黒拫亨乊叿齁乎花怀欢巟灰昏吙丌加戋江艽阶巾坕冂丩凥姢噘军咔开刊忼尻匼肎劥空廤扝夸蒯宽匡亏坤扩垃来兰啷捞仂雷塄唎俩嫾簗蹽咧厸伶溜咯龙娄噜驴孪掠抡捋嘸妈埋颟牤猫庅呅椚掹踎宀喵乜民名谬摸哞某母拏腉囡囔孬疒娞嫩莻妮拈娘鸟捏脌宁妞农羺奴女疟奻硸噢妑拍眅乓抛呸喷匉丕片剽氕姘乒钋剖仆七掐千呛悄切亲靑宆丘区峑炔夋亽呥穣荛惹人扔日戎厹嶿堧桵闰挼仨毢三桒掻色森僧杀筛山伤弰奢申升尸収书刷衰闩双谁妁厶忪凁苏狻夊孙唆他囼坍汤仐忑膯剔天旫怗厅囲偷凸湍推吞乇屲歪乛尣危塭翁挝乌夕呷仙乡灱些忄兴凶休戌吅疶坃丫咽央幺倻膶一乚应哟佣优扜囦曰蒀帀災兂牂傮啫贼怎曽吒夈沾张佋蜇贞凧之中州朱抓拽专妆隹宒卓仔孖宗邹租劗厜尊昨".split("");
var auto_py_pinyin = "a ai an ang ao ba bai ban bang bao bei ben beng bi bian biao bie bin bing bo bu ca cai can cang cao ce cen ceng cha chai chan chang chao che chen cheng chi chong chou chu chuai chuan chuang chui chun chuo ci cong cou cu cuan chuan cuan cui cun cuo da dai dan dang dao de den deng di dia dian diao die ding diu dong dou du duan dui dun duo e en eng er fa fan fang fei fen feng fiao fo fou fu ga gai gan gang gao ge gei gen geng gong gou gu gua guai guan guang gui gun guo ha hai han hang hao he hei hen heng ho hong hou hu hua huai huan huang hui hun huo ji jia jian jiang jiao jie jin jing jiong jiu ju juan jue jun ka kai kan kang kao ke ken keng kong kou ku kua kuai kuan kuang kui kun kuo la lai lan lang lao le lei leng li lia lian liang liao lie lin ling liu lo long lou lu lv luan lve lun luo m ma mai man mang mao me mei men meng mi mian miao mie min ming miu mo mou mei mu na nai nan nang nao ne nei nen n ni nian niang niao nie nin ning niu nong nou nu nv nve nuan nuo ou pa pai pan pang pao pei pen peng pi pian piao pie pin ping po pou pu qi qia qian qiang qiao qie qin qing qiong qiu qu quan que qun ra ran rang rao re ren reng ri rong rou ru ruan rui run ruo sa sai san sang sao se sen seng sha shai shan shang shao she shen sheng shi shou shu shua shuai shuan shuang shui shuo si song sou su suan sui sun suo ta tai tan tang tao te teng ti tian tiao tie ting tong tou tu tuan tui tun tuo wa wai wan wang wei wen weng wo wu xi xia xian xiang xiao xie xin xing xiong xiu xu xuan xue xun ya yan yang yao ye yen yi yin ying yo yong you yu yuan yue yun za zai zan zang zao ze zei zen zeng zha zhai zhan zhang zhao zhe zhen zheng zhi zhong zhou zhu zhua zhuai zhuan zhuang zhui zhun zhuo zai zi zong zou zu zuan zui zun zuo".split(/\x20/);
var cache = {};
var arrTree = [];
var Cn2PinYin;
function _set_bin_tree(a,b)
{
	var c = Math.floor((a+b) / 2);
	if(c==b && b<a)			//节点
	{
		arrTree.push("r='", auto_py_pinyin[c], "';");
		return;
	}
	arrTree.push(			//左分支
	"if(w.localeCompare('", auto_py_key[c], "')<0)");
	_set_bin_tree(a, c-1, 1);
	arrTree.push("else ");	//右分支
	_set_bin_tree(c+1, b, 2);
}
function set_pinyin_init()
{
	arrTree.push("var r=cache[w];if(!r)");				//检查缓存
	_set_bin_tree(0, auto_py_key.length-1);								//-递归生成源码
	arrTree.push("return cache[w]=r;");					//-写入缓存
	Cn2PinYin = new Function("w", arrTree.join(""));	//编译
}
function get_cur_pinyin(content)
{
	var fn = Cn2PinYin;
	var arr = [];
	var ch;
	for(var i=0,n=content.length; i<n; i++)
	{
		ch = content.charAt(i);
		arr[i] = (ch<"一" || ch>"龥")?ch:fn(ch);
	}
	return arr.join("");
}
//全局变量区
search_url="http://cgi.data.auto.qq.com/php/search.php";
auto_url="http://data.auto.qq.com/"
cur_keyword="";
is_presskeyword=false;
init_keyword_str="输入关键字搜索";
all_inputlist_num=0;
cur_inputlist_num=0;


function init_py_list()
{
	var py_list_url="http://js.data.auto.qq.com/car_public/template/serial_py.js";
	JsLoader.load("py_list_url",py_list_url,function(){});
	set_pinyin_init();
}

function clickSearchButton()
{
	cur_inputlist_num=0;
	return search_keyword('keyword2');
}

/** 搜索相关函数 **/
function search_keyword(input_name)
{
	var keyword=Fid(input_name);
	var prefix = 'input_a_';
	if(keyword.value==null || keyword.value=='' || keyword.value==init_keyword_str)
	{
		alert("请填写关键字");
		return false;
	}
	if(input_name=='keyword2'){
		prefix = 'input_b_';
	}
	if(cur_inputlist_num!=0)
	{
		search_keyword_v2(Fid(prefix+cur_inputlist_num).innerHTML);
		return false;
	}
	
	var search_tmp_str=search_url+"?keyword="+encodeURIComponent(keyword.value)+"&fuzzy_search=1";

	if(window.location.pathname.indexOf("search.php")!=-1)
	{
		location.href=search_tmp_str;
	}else{
		window.open(search_tmp_str);
	}
	return false;
}
function search_keyword_v2(id)
{
	var cur_id=parseInt(id,10);
	if(isNaN(cur_id) || cur_id==0)
	{
		return false;
	}
	
	var search_tmp_str=auto_url+"car_serial/"+cur_id+"/index.shtml";
	window.open(search_tmp_str);
	return false;
}

function clear_keyword(input_name)
{
	return false;
}
function cancel_event(evt)
{
	evt=evt||window.event;
	if(evt.preventDefault){
		evt.stopPropagation();
		evt.preventDefault();
	}else{
		evt.returnValue=false;
		evt.cancelBubble=true;
	}
}
function click_keyword(obj,evt)
{
	cancel_event(evt);
	if(obj.value==init_keyword_str)
	{
		obj.value='';
                  obj.style.color="#000000";
	}
	open_smartbox(obj);
	return false;
}
function blur_keyword(obj)
{
  if(obj.value=="")
  {
    obj.value=init_keyword_str;
    obj.style.color="#94A3AB";
  }
}
function onfocus_keyword(obj)
{
	if(obj.value==init_keyword_str){
		obj.value="";
		obj.style.color="#000000";
	}
}
function mouseover_item(item_prefix,id)
{
    //var item_prefix = "input_item_";
	for(i=1;i<(all_inputlist_num+1);i++)
	{
		Fid(item_prefix+i).className='';
	}
	Fid(item_prefix+id).className='focus';
	cur_inputlist_num=id;
	return false;
}
/*function click_submit()
{
close_smartbox();
return true;
}*/
function keyup_keyword(obj,e)
{
	var ev = e? e : window.event;
	var obj_search_inputlist = 'search_inputlist';
	var item_prefix = "input_item_";
	is_presskeyword=true;
	if(ev.keyCode==27)
	{
		close_smartbox();
	}/*else if(ev.keyCode==13){
	alert(1);
	search_keyword_v2(Fid('input_a_'+cur_inputlist_num).innerHTML);
	return false;
	}*/else if(ev.keyCode==40){
	//方向键-下
	if(obj.value=='')
	{
		return false;
	}
	//需要区分是顶部的关键字搜索还是底部的关键字搜索
	if(obj.getAttribute('name')=='keyword2'){
		obj_search_inputlist = 'bottom_search_inputlist';
		item_prefix = "input_item_b_";
	}
	
	Fid(obj_search_inputlist).style.display="block";
	focus_inputlist(item_prefix,cur_inputlist_num,0);
	}else if(ev.keyCode==38){
		//方向键-上
		if(obj.value=='')
		{
			return false;
		}
		if(obj.getAttribute('name')=='keyword2'){
			obj_search_inputlist = 'bottom_search_inputlist';
			item_prefix = "input_item_b_";
		}
		Fid(obj_search_inputlist).style.display="block";
		focus_inputlist(item_prefix,cur_inputlist_num,1);
	}else{		
		open_smartbox(obj);
	}
	return false;
}
function focus_inputlist(item_prefix,id,flag)
{
	if(flag==0)
	{
		id+=1;
	}else{
		id-=1;
	}
	if(id>=all_inputlist_num)
	{
		id=all_inputlist_num;
	}
	if(id<=0)
	{
		id=0;
	}
	if(Fid(item_prefix+id))
	{
		for(i=1;i<(all_inputlist_num+1);i++)
		{
			Fid(item_prefix+i).className='';
		}
		Fid(item_prefix+id).className="focus";
		cur_inputlist_num=id;
	}
}
function open_smartbox(obj)
{	
	var keyword=Fid(obj).value;
	search_smartbox(obj,keyword);
	return false;
}
function close_smartbox()
{
	cur_inputlist_num=0;
	close_all_smartbox();
	return false;
}
function close_all_smartbox()
{
	var item=Fid('search_inputlist');
	
	if(item != null && typeof(item)!="undefined" && item.style.display != "none")
	{
		item.style.display="none";	
		item.innerHTML = "";
	}
	
	item = Fid('bottom_search_inputlist');
	if(item != null && typeof(item)!="undefined" && item.style.display != "none")
	{
		item.style.display="none";	
		item.innerHTML = "";
	}
	return true;
}

function close_single_smartbox(boxname)
{
	var item=Fid(boxname);
	
	if(item != null && typeof(item)!="undefined" && item.style.display != "none")
	{
		item.style.display="none";	
		item.innerHTML = "";
	}
	
	return true;
}

function gb_substr(str,len)
	{
		if (len == null || len <= 0)
		{
			return "";
		}
		var str_len = str.length;
		if(len >= str_len * 2)
		{
			return str;
		}
		var get_len = 0;
		for (;get_len < str_len && len > 0; get_len++)
		{
			if (str.charCodeAt(get_len) > 255 || str.charCodeAt(get_len) < 0)
			{
				len -= 2;
			}else{
				len--;
			}
		}
		if (len < 0)
		{
			get_len -= 1;
		}
		if (get_len == str_len)
		{
			return str;
		}else{
			return str.substr(0,get_len);
		}
	}
function gb_length(str)
{
	return str.replace(/[^\x00-\xff]/gi,'xx').length;
}
function search_smartbox(obj,keyword)
{

	all_inputlist_num=0;
	cur_inputlist_num=0;
	var obj_search_inputlist = 'search_inputlist';
	var input_prefix = "input_a_";
	var item_prefix = "input_item_";	
	
	//需要区分是顶部的关键字搜索还是底部的关键字搜索
	if(obj.getAttribute('name')=='keyword2'){
		obj_search_inputlist = 'bottom_search_inputlist';
		input_prefix = "input_b_";
		item_prefix = "input_item_b_";		
	}
	
	if(keyword!='' && keyword!=init_keyword_str)
	{
		//先转换为拼音
		keyword=get_cur_pinyin(keyword.toLowerCase().replace(/\s/,''));
		//再进行比对
		var tmp_html_str='<ul>';
		if(typeof _autoapp_site_serial_py_json != "undefined")
		{
			for(cur_key in _autoapp_site_serial_py_json)
			{
				if(all_inputlist_num>=9)
				{
					break;
				}
				if(typeof(_autoapp_site_serial_py_json[cur_key]['p'])!="undefined" && _autoapp_site_serial_py_json[cur_key]['p'].match(keyword)!=null)
				{
					tmp_html_str+='<li id="'+ item_prefix +(all_inputlist_num+1)+'" onmouseover="return mouseover_item(\''+item_prefix+'\','+(all_inputlist_num+1)+');"><a href="#" id="'+ input_prefix +(all_inputlist_num+1)+'" style="display:none">'+_autoapp_site_serial_py_json[cur_key]['i']+'</a><a href="#" onclick="return click_inputlist_item(\''+item_prefix+'\','+(all_inputlist_num+1)+','+_autoapp_site_serial_py_json[cur_key]['i']+');">';
					tmp_sname=_autoapp_site_serial_py_json[cur_key]['n'];
					if(gb_length(tmp_sname)>20)
					{
						tmp_sname=gb_substr(tmp_sname,17)+"...";
					}
					
					tmp_html_str+=tmp_sname;

						
					if(typeof(_autoapp_site_serial_py_json[cur_key]['d'])!='undefined')
					{
						tmp_html_str+='<font style="color:#666">(进口)</font>';
						tmp_sname+='(进口)';
					}
					tmp_sblank='';
					for(i=gb_length(tmp_sname);i<=23;i++)
					{
						tmp_sblank+='&nbsp;';
					}
					tmp_ss=_autoapp_site_serial_py_json[cur_key]['s'].toUpperCase();
					tmp_sk=keyword.toUpperCase();
					tmp_pos=tmp_ss.indexOf(tmp_sk);
					if(tmp_pos>=0)
					{
						tmp_ss0=tmp_ss.substr(0,tmp_pos);
						tmp_ss1=tmp_sk;
						tmp_ss2=tmp_ss.substr(tmp_pos+tmp_ss1.length);
					}
					else
					{
						tmp_ss0=tmp_ss;
						tmp_ss1='';
						tmp_ss2='';
					}
					//tmp_html_str+=tmp_sblank+'<font style="color:red">'+_autoapp_site_serial_py_json[key]['s'].toUpperCase()+'</font>';
					tmp_html_str+=tmp_sblank+'<font style="color:#333333;">'+tmp_ss0+'</font><font style="color:#d90606">'+tmp_ss1+'</font><font style="color:#333333">'+tmp_ss2+'</font>';
					tmp_html_str+='</a>';
					tmp_html_str+='</li>';
					all_inputlist_num++;
				}
			}
			if(all_inputlist_num==0)
			{
				tmp_html_str+='无相关推荐';
			}
		}
		tmp_html_str+='</ul>';
		Fid(obj_search_inputlist).innerHTML=tmp_html_str;
		Fid(obj_search_inputlist).style.display="block";
	}else{
		close_smartbox();
	}
}
function click_inputlist_item(item_prefix,item_id,id)
{
	cur_inputlist_num=item_id;
    //var item_prefix = "input_item_";
	for(i=1;i<(all_inputlist_num+1);i++)
	{
		Fid(item_prefix+i).className='';
	}
	close_smartbox();
	search_keyword_v2(id);
	return false;
}
function add_document_click(func)
{
	var oldclick = document.onclick;
	if(typeof document.onclick != 'function')
	{
		document.onclick = func;
	}
	else
	{
		document.onclick = function(){
			oldclick();
			func();
		};
	}
}
/** 搜索相关函数--end **/
//添加onload事件
add_loadEvent(function(){add_document_click(function(){close_all_smartbox();});init_py_list();});
</script>
<style>
/* 搜索SMARTBOX */
#bottom_search_inputlist {font:12px/1.75 "宋体",arial,sans-serif;background:#ffffff;}
#bottom_search_inputlist ol, #bottom_search_inputlist ul{list-style:none}
#bottom_search_inputlist h1, #bottom_search_inputlist h2, #bottom_search_inputlist h3, #bottom_search_inputlist h4, #bottom_search_inputlist h5, #bottom_search_inputlist h6 {font-size:100%;font-weight:400;}
#bottom_search_inputlist legend {display:none;}
#bottom_search_inputlist a {color:#000;text-decoration:none;}
#bottom_search_inputlist a:hover {color:#000;text-decoration:underline;}
#bottom_search_inputlist {width:298px; border:1px solid #9FA9C0; border-top:none}
#bottom_search_inputlist ul{ padding:0 1px;}
#bottom_search_inputlist ul li {line-height:22px; display:block}
#bottom_search_inputlist ul li a { line-height:22px;padding-left:3px;display:block;zoom:1 }
#bottom_search_inputlist ul li a:hover {text-decoration:none}
#bottom_search_inputlist .focus {line-height:22px;padding-left:3px;  background:#D0E2EB; text-decoration:none}
#bottom_search_inputlist .tips { border-top:1px solid #d5d5d5; line-height:16px; margin:0 auto; padding:5px 2px; color:#666}
#bottom_search_inputlist .tips .red {color:#f00}
/* 搜索SMARTBOX_END */
</style>
 <div class="hd">
 <fieldset>
          <legend>搜索:</legend>
 <span class="scrfbox">
 <form name="keyword_search2" id="keyword_search2" action="" onsubmit="return search_keyword('keyword2');">
		    <input name="keyword2" id="keyword2" class="input" autocomplete="off" value="输入关键字搜索" onblur="return blur_keyword(this);" onfocus="return onfocus_keyword(this);" onclick="return click_keyword(this,event);" onkeyup="return keyup_keyword(this,event);" type="text">
		    <input name="Submit2" value="搜索" class="butf" type="button" onclick="clickSearchButton();">
		    </form>
            <div class="inputlist" style="display: none;" id="bottom_search_inputlist"></div>
		  </span>
		  <span class="scrtxt" style="margin-left: 8px; line-height: 17px;"><a href="http://data.auto.qq.com/car_public/1/ratingrank.shtml" target="_blank">排行榜</a> | <a href="http://cgi.data.auto.qq.com/php/search.php" target="_blank">选车工具</a></span>
			<span class="scrtxt" style="left: 890px; width: 60px; text-align: right;"><script language="javascript">
function linktosupport(){	
	var cur_url = window.location.href	
	if(typeof cur_url !='undefined'){
		var support_url = 'http://support.qq.com/discuss/389_1.shtml?SSTAG=' + encodeURIComponent(cur_url);		
		window.open(support_url);
	}	
}
</script>
<a id="support_link" href="javascript:linktosupport();" >反馈建议</a>
<!--[if !IE]>|xGv00|0b272db4579fbd569c37d4778a402388<![endif]--></span>
		  
		  </fieldset>
 </div>





<!--[if !IE]>|xGv00|bc49afbe902b674a53ddbfa918635c2a<![endif]-->
	<div class="bd">
  <div>
  
  
  <dl class="coom">
   <dt>购车</dt>
   <dd>
    <ul>
	 <li><a href="http://data.auto.qq.com/car_public/1/piclib.shtml" target="_blank">车型图库</a></li>
	 <li><a href="http://auto.qq.com/l/buycar/newcar/list.htm"  target="_blank">新车</a></li>
	 <li><a href="http://data.auto.qq.com/car_public/1/compare.shtml" target="_blank">车型对比</a></li>
	 <li><a href="http://auto.qq.com/buycar/hq.htm" target="_blank">行情</a></li>
	 <li><a href="http://data.auto.qq.com/car_public/1/wom.shtml" target="_blank">车友点评</a></li>
	 <li><a href="http://auto.qq.com/l/buycar/evaluating/list.htm" target="_blank">试驾评测</a></li>
	 <li><a href="http://data.auto.qq.com/car_public/1/calc.shtml#stype=quankuan&brandid=0&seriesid=0&modelid=0" target="_blank">购车计算</a></li>
	 <li><a href="http://auto.qq.com/buycar/purchases/db.htm" target="_blank">对比导购</a></li>
	</ul>
   </dd>
  </dl>
  
  <dl class="coom">
   <dt>用车</dt>
   <dd>
    <ul>
	 <li><a href="http://auto.qq.com/l/service/servicing/list.htm" target="_blank">维修养护</a></li>
	 <li><a href="http://auto.qq.com/service/wz_yccb.htm" target="_blank">养车成本</a></li>
	 <li><a href="http://auto.qq.com/l/service/insurance/list.htm" target="_blank">保险理赔</a></li>
	 <li><a href="http://auto.qq.com/zt2010/qcjyzs/index.htm" target="_blank">用车宝典</a></li>
	 <li><a href="http://auto.qq.com/l/service/refit/list.htm" target="_blank">汽车改装</a></li>
	 <li><a href="http://auto.qq.com/zt/2008/autoxuetang/autoxuet.htm" target="_blank">知识讲堂</a></li>
	 <li><a href="http://auto.qq.com/l/service/titbit/list.htm" target="_blank">玩车趣闻</a></li>
	 <li><a href="http://auto.qq.com/l/service/sharing/list.htm" target="_blank">车友锦囊</a></li>
	</ul>
   </dd>
  </dl>
  
  <dl class="coom">
   <dt>资讯</dt>
   <dd>
    <ul>
	 <li><a href="http://auto.qq.com/l/news/industry/list.htm" target="_blank">行业新闻</a></li>
	 <li><a href="http://auto.qq.com/news/lm_ctjj.htm" target="_blank">车坛聚焦</a></li>
	 <li><a href="http://auto.qq.com/l/news/movement/list.htm" target="_blank">市场动态</a></li>
	 <li><a href="http://auto.qq.com/news/lm_sdgc.htm" target="_blank">深度观察</a></li>
	 <li><a href="http://auto.qq.com/l/news/comment/list.htm" target="_blank">评论分析</a></li>
	 <li><a href="http://auto.qq.com/news/lm_cssm.htm" target="_blank">车市扫描</a></li>
	 <li><a href="http://auto.qq.com/l/news/recall/list.htm" target="_blank">召回</a></li>
	 <li><a href="http://auto.qq.com/zixun/czk.htm" target="_blank">车周刊</a></li>
	</ul>
   </dd>
  </dl>
  <dl class="shequ">
   <dt>社区</dt>
   <dd>
    <ul>
	 <li><a href="http://bbs.qq.com/navi.htm?f=7#preExpand=7&preType=0" target="_blank">地方车友会</a></li>
	 <li><a href="http://bbs.qq.com/navi.htm?f=7#preExpand=7&preType=0" target="_blank">品牌车友会 </a></li>
	 <li><a href="http://wenwen.soso.com/z/c87228416.htm?ch=fl.fl" target="_blank">问答</a></li>
	 <li><a href="http://blog.qq.com/auto/index.htm" target="_blank">博客</a> </li>
	 
	</ul>
   </dd>
  </dl>
   <dl class="chezhan">
   <dt>车展</dt>
   <dd>
    <ul>
	 <li><a href="http://auto.qq.com/2010/" target="_blank">北京车展</a></li>
	 <li><a href="http://auto.qq.com/2009/" target="_blank">上海车展</a></li>
	 <li><a href="http://auto.qq.com/guangzhou/" target="_blank">广州车展</a></li></ul>
   </dd>
  </dl>

  </div>
 </div><!--[if !IE]>|xGv00|1e9f1474efbbd08ecf62a8f57df71f70<![endif]-->
    <style>
#CopyRight2006 {font-size:12px;color:black;background:white;clear:both;margin:0 auto;}
#CopyRight2006 a.tocft:link,a.tocft:visited{font-size:12px;color:black;text-decoration: none;}
#CopyRight2006 a.tocft:hover{font-size:12px;color:red;text-decoration: underline;}
</style>
<table width="960" border="0" align="center" cellpadding="0" cellspacing="0" id="CopyRight2006">
<tr>
    <td height="30" colspan="2"></td>
  </tr>
  <tr>
    <td height="25" colspan="2" align="center"><a href="http://www.tencent.com/" class="tocft" target="_blank">关于腾讯 </a> | <a href="http://www.tencent.com/index_e.shtml" class="tocft" target="_blank">About Tencent </a> | <a href="http://www.qq.com/contract.shtml" class="tocft" target="_blank">服务条款 </a> | <a href="http://adver.qq.com/" class="tocft" target="_blank">广告服务 </a> | <a href="http://hr.tencent.com/" class="tocft" target="_blank">腾讯招聘 </a> | <a href="http://gongyi.qq.com/" class="tocft" target="_blank">腾讯公益 </a> | <a href="http://service.qq.com/" class="tocft" target="_blank">客服中心 </a> | <a href="http://www.qq.com/map/" class="tocft" target="_blank">网站导航 </a></td>
  </tr>
  <tr>
    <td width="556" height="25" align="right">Copyright &copy; 1998 - 2013 Tencent Inc. All Rights Reserved </td>
    <td width="194" align="left"><a href="http://www.sznet110.gov.cn/netalarm/index.jsp" target="_blank"><img src="http://img1.qq.com/www/pics/816/816587.gif" hspace="5" border="0" width="36" height="43"/></a></td>
  </tr>
  <tr>
    <td height="25" colspan="2" align="center">腾讯公司 版权所有</td>
  </tr>
</table>


<div style="display:none;">
<script language="javascript" src="http://pingjs.qq.com/ping.js"></script>
<script language="javascript">
function inHref(str)
{
    return (window.location.href.indexOf(str) != -1) ? true : false;
}
if(typeof(pgvMain) == 'function')
{
    /*
    pgv_qiche_serial 车系页
    pgv_qiche_model 车型页
    pgv_qiche_sl_news 车系相关资讯  
    pgv_qiche_sl_news_zh 车系综合新闻
    pgv_qiche_sl_news_dg 车系导购
    pgv_qiche_sl_news_hq 车系行情
    pgv_qiche_sl_news_sj 车系试驾
    pgv_qiche_sl_news_xd 车系心得
    pgv_qiche_sl_cp 同系车型对比
    pgv_qiche_sl_ml 车系、车型汇总
    pgv_qiche_search 车型库搜索
    pgv_qiche_compare 对比工具
    pgv_qiche_ml_zc 在产车型
    pgv_qiche_ml_tc 停产车型
    pgv_qiche_fuelcost 车系油耗
    pgv_qiche_wom 车系口碑(总)
    pgv_qiche_wom_new 车系口碑新
    pgv_qiche_wom_good 车系口碑好评
    pgv_qiche_wom_bad 车系口碑坏评
    pgv_qiche_wom_list 车系口碑列表
    pgv_qiche_wom_detail 点评详情页面
    pgv_qiche_rank 排行榜页面
    pgv_qiche_compare_data 对比工具_参数配置
    pgv_qiche_compare_pic  对比工具_图片
    pgv_qiche_compare_wom  对比工具_点评
    pgv_qiche_fuelaccount 油耗统计
    pgv_qiche_user 个人中心
    pgv_qiche_user_custom 个人中心客人页面
    pgv_qiche_wom_tag 点评tag页卡
    pgv_qiche_userset 个人设置页面
    pgv_qiche_fuel_custom 油耗客人页
    pgv_qiche_wbwom_list 车系微评列表
    pgv_qiche_carbrand_index 车型大全首页
    pgv_qiche_carbrand_index_price 车型大全首页按价格页
    pgv_qiche_carbrand_index_type 车型大全首页按级别页
    pgv_qiche_carbrand_index_use 车型大全首页按用途页
    pgv_qiche_carbrand_index_country 车型大全首页按国别页
    pgv_qiche_cardetail_all 车型详解汇总
    */
    if(inHref("car_brand") && inHref("index.shtml"))
    {
        vsPgvCol = "pgv_qiche_carbrand_index";
    }else if(inHref("car_public/1") && inHref("index_price"))
    {
        vsPgvCol = "pgv_qiche_carbrand_index_price";
    }else if(inHref("car_public/1") && inHref("index_type"))
    {
        vsPgvCol = "pgv_qiche_carbrand_index_type";
    }else if(inHref("car_public/1") && inHref("index_use"))
    {
        vsPgvCol = "pgv_qiche_carbrand_index_use";
    }else if(inHref("car_public/1") && inHref("index_country"))
    {
        vsPgvCol = "pgv_qiche_carbrand_index_country"
    }else if(inHref("serial") && inHref("index.shtml"))
    {
        vsPgvCol = "pgv_qiche_serial;pgv_qiche_sl_ml;";
    }else if(inHref("serial") && inHref("news.shtml"))
    {
        vsPgvCol = "pgv_qiche_sl_news_zh;pgv_qiche_sl_news;pgv_qiche_sl_ml;";
    }else if(inHref("serial") && inHref("news_dg.shtml"))
    {
        vsPgvCol = "pgv_qiche_sl_news_dg;pgv_qiche_sl_news;pgv_qiche_sl_ml;";
    }else if(inHref("serial") && inHref("news_hq.shtml"))
    {
        vsPgvCol = "pgv_qiche_sl_news_hq;pgv_qiche_sl_news;pgv_qiche_sl_ml;";
    }else if(inHref("serial") && inHref("news_sj.shtml"))
    {
        vsPgvCol = "pgv_qiche_sl_news_sj;pgv_qiche_sl_news;pgv_qiche_sl_ml;";
    }else if(inHref("serial") && inHref("news_xd.shtml"))
    {
        vsPgvCol = "pgv_qiche_sl_news_xd;pgv_qiche_sl_news;pgv_qiche_sl_ml;";
    }else if(inHref("serial") && inHref("modelscompare.shtml"))
    {
        vsPgvCol = "pgv_qiche_sl_cp;pgv_qiche_sl_ml;";
    }else if(inHref("models") && inHref("index.shtml"))
    {
        vsPgvCol = "pgv_qiche_model;pgv_qiche_sl_ml;";
        if (typeof STATUS != "undefined")
        {
            if(STATUS == "在产")
            {
                vsPgvCol = "pgv_qiche_model;pgv_qiche_sl_ml;pgv_qiche_ml_zc;";
            }
            else if (STATUS == "停产")
            {
                vsPgvCol = "pgv_qiche_model;pgv_qiche_sl_ml;pgv_qiche_ml_tc;";
            }
        }
    }else if(inHref("cgi.data.auto.qq.com/php/search.php"))
    {
        vsPgvCol = "pgv_qiche_search;";
    }else if(inHref("serial") && inHref("fuelcost.shtml"))
    {
        vsPgvCol = "pgv_qiche_fuelcost;";
    }else if (inHref("car_public") && (inHref("fuelcostrank.shtml") || inHref("fuelcostrank_2.shtml")))
    {
        vsPgvCol = "pgv_qiche_fuelcost;pgv_qiche_rank;";
    }else if (inHref("car_public") && inHref("ratingrank.shtml"))
    {
        vsPgvCol = "pgv_qiche_rank;";
    }else if(inHref("serial") && inHref("wom.shtml"))
    {
        vsPgvCol = "pgv_qiche_wom;";
    }else if(inHref("car_public") && inHref("wom.shtml"))
    {
        vsPgvCol = "pgv_qiche_wom;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=womreply"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_detail;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=wom") && !inHref("list=1"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_new;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=wom") && !inHref("list=1") && inHref("class=1"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_new;pgv_qiche_wom_good;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=wom") && !inHref("list=1") && inHref("class=2"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_new;pgv_qiche_wom_bad;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=wom") && inHref("list=1") && inHref("tag=") && !inHref("tag!=100"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_new;pgv_qiche_wom_list;pgv_qiche_wom_tag;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=wom") && inHref("list=1") && inHref("class=4"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_new;pgv_qiche_wbwom_list;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=wom") && inHref("list=1"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_new;pgv_qiche_wom_list;";
    }else if (inHref("car_public") && inHref("pic_compare.shtml"))
    {
        vsPgvCol = "pgv_qiche_compare;pgv_qiche_compare_pic;";
    }else if (inHref("car_public") && inHref("womcompare.shtml"))
    {
        vsPgvCol = "pgv_qiche_compare;pgv_qiche_compare_wom;";
    }else if (inHref("car_public") && inHref("compare.shtml"))
    {
        vsPgvCol = "pgv_qiche_compare;pgv_qiche_compare_data;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=userset"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_userset;pgv_qiche_user;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=user") && inHref("u="))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_user;pgv_qiche_user_custom;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=user"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_user;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=fuelaccount") && inHref("u="))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_fuelaccount;pgv_qiche_user;pgv_qiche_fuel_custom;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=fuelaccount"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_fuelaccount;pgv_qiche_user;";
    }else if (inHref("data.auto.qq.com") && inHref("car_detail_tag"))
    {
        vsPgvCol = "pgv_qiche_cardetail_all;";
    }

    pvCurDomain = "data.auto.qq.com";
    pvCurUrl = window.location.href.substring(window.location.href.indexOf(".com") + 4);
    pgvMain();
    }
</script>

</div>






<!--[if !IE]>|xGv00|1f85fd2669aeaaa54a625b27d07db2c1<![endif]-->
</div>

<!--[if !IE]>|xGv00|39f07ede0dedfde75b089c1fcd8b67e2<![endif]-->
<script type="text/javascript" src="//mat1.gtimg.com/auto/js/car2013/dealer_admin/registration.js?action=pop&type=search_car&w=480&bgcolor=ffffff&color=676767" charset="utf-8"></script>
</body>
<script language="javascript">
function tabss_z(o1,o2,n,o1c,o2c){
			var m_n = document.getElementById(o1).getElementsByTagName(o1c);
			var c_n = document.getElementById(o2).getElementsByTagName(o2c);
			//var d_n = document.getElementById(o3).getElementsByTagName(o3c);
			for(i=0;i<m_n.length;i++){
				 m_n[i].className=i==n?"ck":"";
 				 c_n[i].className=i==n?"dis":"undis";
				 //d_n[i].className=i==n?"dis":"undis";
			}
        }set_mem_href();//get_search_type();
initReviewModels();
</script>
</html>