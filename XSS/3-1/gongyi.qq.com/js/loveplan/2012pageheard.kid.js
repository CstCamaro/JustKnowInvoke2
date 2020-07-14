var _cookie_obj = GyLib.Cookie();
var global_uinobject = {"npoactivity_userinfo":[],"npoactivity_orginfo":[],"EnterTotal_Cnt":0,"FMoneyOfRemain":0}; 
var global_userinfoobject = {'nick':'','uin':0}; 

function ptloginopenfun(){
	GyLib.Login.on();
}

function ptlogoutopenfun(){
	GyLib.Login.out();
}

var Global_PageHeardLoginInfo_v2 = function(Objectname){
	if(typeof(global_userinfoobject) == 'undefined' || typeof(global_userinfoobject.code) =='undefined' || global_userinfoobject.code != 0){  //未登陆态
		document.getElementById('Global_pageheardObj').innerHTML = '您好，欢迎参与腾讯公益 | <a id="Global_pageheardLoginBtnObj" title="用户登录" href="javascript:ptloginopenfun();void(0);">用户登录</a>';	
		return true;
	}
	var HtmlCode = '<ul>';	
	if(global_userinfoobject.code == 0){   //登陆态
		var InterceptNick = global_userinfoobject.nick.entities();  //QQ昵称
		var _usertype = global_userinfoobject.idcode||global_userinfoobject.universay;
		var needPayProjectNum = global_userinfoobject.needPayProjectNum;
		var newMsgCounts = global_userinfoobject.msgNum;
		HtmlCode += "<li>您好，"+InterceptNick.subString(0,20)+"</li>";
		//HtmlCode += "<li id=\"top_uloveplan_t\"><a target='_blank' href='http://npoapp.gongyi.qq.com/_MonthlyList'>本月待捐("+needPayProjectNum+")</a></li>";
	}	
	HtmlCode += "<li id=\"top_ucenter_t\"><a target='_blank' href='//gongyi.qq.com/monthlyList.htm' title='个人中心'>个人中心</a></li>";
    HtmlCode += "<li id=\"top_help_t\"><a target='_blank' href='//gongyi.qq.com/loveplan/donations_help.htm' title='帮助'>帮助</a>   </li><li><a href='javascript:ptlogoutopenfun();void(0);' title='退出'>退出</a></li>";
	document.getElementById(Objectname).innerHTML = HtmlCode;
}

function changeNavTab(i){
	$('.top_navigate a').removeClass('ihover');
	$('.top_navigate li').eq(i).children('a').addClass('ihover');
}

function getGySkeyFromCookie(){
	
	var filterXSS = function(e) {
		if (!e) return e;
		for (; e != unescape(e);) e = unescape(e);
		for (var r = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], n = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], a = 0; a < r.length; a++) e = e.replace(new RegExp(r[a], "gi"), n[a]);
		return e;
   };
   var _gy_udata = filterXSS(_cookie_obj.get("GY_UDATA"));
	
	if(_gy_udata.length>0){
		_gy_udata = _gy_udata.replace(/&#x22;/ig,'"');
		global_userinfoobject = JSON.parse(_gy_udata);
		return _gy_udata;
	}
	return '';
}

function setGySkeyToCookie(data){
	global_userinfoobject = data;
	_str = JSON.stringify(data);
	var expires = new Date();
	expires.setTime(expires.getTime() + 50 * 60 * 1000); //50分钟有效
	_cookie_obj.set("GY_UDATA",_str,expires,"/","gongyi.qq.com");
}

/*初始化登录状态*/
function initHeaderLoginPlane(callback,initLoginInfo){
	//try{
		var _skey = _cookie_obj.get('skey');
		if(_skey.length>0){
			/*var _gy_udata = getGySkeyFromCookie();
			if(_gy_udata.length>0 && global_userinfoobject.skey==_skey){//cookie中有用户信息
				if(typeof initLoginInfo=='function')
					initLoginInfo(global_userinfoobject);
				else
					Global_PageHeardLoginInfo_v2("Global_pageheardObj");
				setGySkeyToCookie(global_userinfoobject);
				if(typeof callback=='function')
					callback(global_userinfoobject);
			}
			else{
			*/	window['_cbCheckLogin'] = function(data){
					var _skey = _cookie_obj.get('skey');
					if(data.code==0){
						data.skey = _skey;
						setGySkeyToCookie(data.info);
						if(typeof initLoginInfo=='function')
							initLoginInfo(data.info);
						else
							Global_PageHeardLoginInfo_v2("Global_pageheardObj");
					}
					if(typeof callback=='function')
						callback(data.info);
				}
				
				// var _url = '//yundonate.gongyi.qq.com/cgi-bin/Login?g_tk='+getSekyToekn()+'&r='+Math.random()+'&jsoncallback=_cbCheckLogin';
				var _url = '//ssl.gongyi.qq.com/cgi-bin/Login?g_tk='+getSekyToekn()+'&r='+Math.random()+'&jsoncallback=_cbCheckLogin';
				document.write('<script charset="utf-8" src="'+_url+'"><\/script>');
          /*  $.ajax({
                type:"GET",
                url:'http://yundonate.gongyi.qq.com/cgi-bin/Login',
                dataType:'jsonp',
                data:{},
                jsonp : "jsoncallback",
                "jsoncallback":'?',
                success:function (data) {
                    if(data.code==0){
                        data.skey = _skey;
                        setGySkeyToCookie(data.info);
                        Global_PageHeardLoginInfo_v2("Global_pageheardObj");
                    }
                    if(typeof callback=='function')
                        callback();
                },
                scriptCharset:'utf-8',
                contentType: "application/x-www-form-urlencoded; charset=utf-8"
            })*/
				
				/*var _script = document.createElement( 'script' ),
		        _head = document.head ||
		        document.getElementsByTagName( 'head' )[0] ||
		        document.documentElement;
				_script.type = 'text/javascript';
        		_script.src = url;
				_head.appendChild(_script);*/
				//不能在document.ready里使用
				
				return;
			/*}*/
		}
		else{
			global_userinfoobject.code = -1;
			_cookie_obj.clear("GY_UDATA","","/","gongyi.qq.com");
			if(typeof callback=='function')
				callback();
		}
	//}catch(e){}
}


//菜单中微爱菜单的事件 
$().ready(function(){
	$("ul.top_navigate li.drop").hover(function(){
		$(this).addClass("dropHover");
		$(this).find("div").show();
		
	},function(){
		$(this).removeClass("dropHover");
		$(this).find("div").hide();
		});
});

function getSekyToekn(){
			var str = GyLib.Cookie().get('skey'),hash = 5381;
			if(!str) return false;
			for(var i = 0, len = str.length; i < len; ++i)
			{
				hash += (hash << 5) + str.charAt(i).charCodeAt();
			}
			return hash & 0x7fffffff;
		}
		/*  |xGv00|4c583dab4834782681f80b0b104d9873 */