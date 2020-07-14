var Global_ObjectStat=document;
var Global_script="script";
var Global_StatHost="//trace.gongyi.qq.com";
var jsStatByKid={
	type:'版本号：',haha:'小样,你使用的浏览器是：',browserArr:[1,11,2,3,4,5,6,7,8,9,10],debug:false,init:function(){
		var thisURL=this.htmlEncode(this.getCurrentURL());
		var thisRefer=this.htmlEncode(this.getCurrentRefer());
		if(typeof(debugRefer)!='undefined'&&debugRefer.length>0)thisRefer=this.htmlEncode(debugRefer);
		var rs=this.getBrowserInfo();
		var uin=this.getUin();
		var isLogin=this.isLogin();
		var ticket=this.htmlEncode(this.getUrlParamVal('ticket'));
		if(typeof(debugTicket)!='undefined')ticket=9999;
		var returnStr='browser='+rs[0]+'&version='+rs[1]+'&uin='+uin+'&refer='+thisRefer+'&ticket='+ticket+'&isLogin='+isLogin+'&cururl='+thisURL;
		if(this.debug){
			this.console("窗体url:"+thisURL);
			this.console("ticket:"+ticket);
			this.console("uin:"+uin);
			this.console("isLogin:"+isLogin);
			this.console("referrer:"+thisRefer);
			this.console(this.haha+rs[0]+';'+this.type+rs[1]);
			this.console('');
			this.console("返回的字符串："+returnStr)
		
		};
		return returnStr
	
	}
	,htmlEncode:function(sStr){
		sStr=sStr.replace(/&/g,"&amp;");
		sStr=sStr.replace(/>/g,"&gt;");
		sStr=sStr.replace(/</g,"&lt;");
		sStr=sStr.replace(/"/g,"&quot;");
		sStr=sStr.replace(/'/g,"&#39;");
		return sStr
	
	}
	,console:function(msg){
		document.write(msg+'<br />')
	
	}
	,getCurrentURL:function(){
		thisURL=document.URL;
		thisURL=thisURL.replace(/\&/g,'@');
		return thisURL
	
	}
	,getCurrentRefer:function(){
		thisRefer=document.referrer;
		thisRefer=thisRefer.replace(/\&/g,'@');
		return thisRefer
	
	}
	,getUin:function(){
		var uin=this.getCookie('pt2gguin');
		uin=uin.replace(/^\s+|\s+$/g,"");
		if(uin.length<1)return'';
		for(i=0;i;i++){
			c=uin.charAt(i);
			if(c!='o'&&c!='O'&&c!='0')break
		
		};
		return uin.substr(i)
	
	}
	,isLogin:function(){
		var skey=this.getCookie('skey');
		skey=skey.replace(/^\s+|\s+$/g,"");
		return skey.length<1?0:1
	
	}
	,getUrlParamVal:function(paras){
		var url=window.location.href;
		var paraString=url.substring(url.indexOf("?")+1,url.length).split("&");
		var paraObj={};
		for(i=0;j=paraString[i];i++){
			paraObj[j.substring(0,j.indexOf("=")).toLowerCase()]=j.substring(j.indexOf("=")+1,j.length)
		
		};
		var returnValue=paraObj[paras.toLowerCase()];
		if(typeof(returnValue)=="undefined"){
			return""
		
		}
		else{
			return returnValue
		
		}
	}
	,getCookie:function(objName){
		var arrStr=document.cookie.split("; ");
		for(var i=0;i<arrStr.length;i++){
			var temp=arrStr[i].split("=");
			if(temp[0]==objName)return unescape(temp[1])
		
		};
		return''
	
	}
	,getBrowserInfo:function(){
		ua=navigator.userAgent.toLowerCase();
		if(ua.indexOf("metasr")>0){
			type=ua.match(/se[ |\/]([\d.]+)/)[1];
			return[this.browserArr[0],type]
		
		}
		else if(ua.indexOf("360")>0){
			return[this.browserArr[1],4]
		
		}
		else if(ua.indexOf("maxthon")>0){
			type=ua.match(/maxthon[ |\/]([\d.]+)/)[1];
			return[this.browserArr[2],type]
		
		}
		else if(ua.indexOf("qqbrowser")>0){
			type=ua.match(/qqbrowser[ |\/]([\d.]+)/)[1];
			return[this.browserArr[3],type]
		
		}
		else if(ua.indexOf("msie")>0){
			type=ua.match(/msie[ |\/]([\d.]+)/)[1];
			return[this.browserArr[4],type]
		
		}
		else if(ua.indexOf("chrome")>0){
			type=ua.match(/chrome[ |\/]([\d.]+)/)[1];
			return[this.browserArr[5],type]
		
		}
		else if(ua.indexOf("firefox")>0){
			type=ua.match(/firefox[ |\/]([\d.]+)/)[1];
			return[this.browserArr[6],type]
		
		}
		else if(ua.indexOf("opera")>0){
			type=ua.match(/version[ |\/]([\d.]+)/)[1];
			return[this.browserArr[7],type]
		
		}
		else if(ua.indexOf("safari")>0){
			type=ua.match(/version[ |\/]([\d.]+)/)[1];
			return[this.browserArr[8],type]
		
		};
		return['0','0']
	
	}
};
var Global_StatParameter=jsStatByKid.init();
function StatCreateIframe(){
	try{
		$.getScript(Global_StatHost+'/cgi-bin/GongyiStat.v2?'+Global_StatParameter)
	
	}
	catch(e){}

};
// StatCreateIframe();
// /*  |xGv00|5b61084f834e9b87f5b8892d4edf273f */