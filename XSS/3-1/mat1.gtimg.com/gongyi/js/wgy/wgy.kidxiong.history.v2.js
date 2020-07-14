//var weiboTopic = [95080072951785 ,20199082407960 ];
var orderWeiboTopicID = 0;
var ERROR_NET_EX = '您的网络有问题，请检查网络后重试';
var NUMPERPAGE = 20;
var LISTENDESC = '<div class="listen_now" style="color:#999">订阅成功<div>';
var GDREAMSTATUS = 0;
var INIT=true;

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
/*	if(page>0)
		$("#dreamlist_my").hide();
	else
		$("#dreamlist_my").show();
*/
	showDreamList(page);
	var targetOffset = $("#dreamlist").offset().top;
	$('html, body').animate({scrollTop: targetOffset}, 300);
	autoScroll();
}

function showDreamList(page) {
	var smalldreamlist = smalldreamlist_history;
	if (typeof(smalldreamlist) == "undefined") {
		$("#dreamlist").html("<li></li>");
		return false;
	} else {
		/*if(INIT==true){
			INIT=false;
			smalldreamlist = smalldreamlist.concat(smalldreamlist_v2);
		}*/

		
		var A = typeof(weiaiResCount)!='undefined'?weiaiResCount:smalldreamlist.length;
		var B = "";
		$("#dreamlist").empty();
		
		page=parseInt((page)-1);
				
		var total=Math.ceil(A/NUMPERPAGE);
		if(page<0||page>total)
			page=gDreamPage;
		page=page<0?0:page;
		page=page>total?total:page;
		var start = page*NUMPERPAGE;
		var dataLen = smalldreamlist.length;
		var end = (dataLen <= NUMPERPAGE)?dataLen:start+NUMPERPAGE;
		end=end>A?A:end;
		for (; start < end; start++) {
			var D = smalldreamlist[start].id;
			var n_m=parseInt(smalldreamlist[start].n_m/100);
			var o_m=parseInt(smalldreamlist[start].o_m/100);
			var rand = parseInt(Math.random()*(9999999-1+1) + 1); 
			B = '<li><div class="orgPic"><a href="'+smalldreamlist[start].url+'" hidefocus target="_blank"><img src="' + smalldreamlist[start].icon + '"/><div style="width:50px;height:21px;position:absolute;z-index;10;left:139px;top:98px;"></a></div></div><div class="one_r"><h3 id="dreamtitle_' + D + '"><a href="'+smalldreamlist[start].url+'" hidefocus target="_blank">' + smalldreamlist[start].title + '</a></h3><p class="p1"><b>简介：</b>' + smalldreamlist[start].desc + '&nbsp;&nbsp;<br /><b>执行组织：</b>'+smalldreamlist[start].organizer+'</p><span class="zhichi" style="padding-left:0;"><b style="font-size:14px;">实际筹款：</b><span id="om_' +D+ '" style="font-size:14px;">'+o_m+'</span>元</span><div class="wb_ly"></div></div></li>';
			$("#dreamlist").append(B);
		}
		
		if(isSearch==1)
		{
			$('#dreamlist').append("<div class='turn_page'>"+weiaiPages+"</div>");
			return;
		}else{
			if(total<=1)return false;
			var prevpage=page;
			prevpage=prevpage<0?0:prevpage;
			var nextpage=page+2;
			nextpage=nextpage>(total+1)?total:nextpage;
			curPage = parseInt(page)+1;
			var pageStr="<div class='turn_page'><span class='totalRows'>"+curPage+"/"+total+"</span>";
			if(page!=0) pageStr+="<a href='?p="+prevpage+"' hidefocus>上一页</a>";
			for(i=1;i<=total;i++){
				if(page==i-1){
					cur='current';
					onclickstr='';
				}
				else{
					cur='';
					onclickstr='changeDreamList('+(i)+')';
				}
				pageStr+="<a class='"+cur+"' href=\"?p="+(i)+"\">"+i+"</a>";
			}
			if(nextpage> 0 && nextpage<=total) pageStr+="<a href='?p="+nextpage+"' hidefocus>下一页</a>";
			pageStr += "</div>";
			
			$('#dreamlist').append(pageStr);
			gDreamPage=page;
			
		}
		
		
		return false;
	}
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

$(function() {
	if(isSearch==1)
		p=1;
	else
		p = !p?1:p;
	showDreamList(p);
});/*  |xGv00|a062303d165415da3f1025d598d916da */