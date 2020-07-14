function ptloginopenfun(){
	GyLib.Login.on();
}

function ptlogoutopenfun(){
	GyLib.Login.out();
}

var Global_PageHeardLoginInfo_v2 = function(){
	if(global_userinfoobject.code != 0){  //未登陆态
		return ;
	}
	var _nick = global_userinfoobject.nick.entities();  //QQ昵称
	$('#yunying-login-txt').html('您好！'+_nick.subString(0,20));
	$('#yunying-menu-logout').hide();
	$('#yunying-menu-login').show();
}

function changeNavTab(i){
	$('.top_navigate a').removeClass('ihover');
	$('.top_navigate li').eq(i).children('a').addClass('ihover');
}

var _cookie_obj = GyLib.Cookie();
var global_uinobject = {"npoactivity_userinfo":[],"npoactivity_orginfo":[],"EnterTotal_Cnt":0,"FMoneyOfRemain":0}; 
var global_userinfoobject = {'nick':''}; 
function getGySkeyFromCookie(){
	var _gy_skey = _cookie_obj.get("gy_bskey");
	if(_gy_skey.length>0){//cookie中有用户信息
		var _arr = _gy_skey.split('|');
		global_userinfoobject.code = 0;
		global_userinfoobject.nick = eval('"'+unescape(_arr[0])+'"');
		global_userinfoobject.idcode = _arr[1];
		global_userinfoobject.head = _arr[2];
		global_userinfoobject.msgNum = _arr[3];
		global_userinfoobject.uin = _arr[4];
		global_userinfoobject.needPayProjectNum =_arr[5];
		return _gy_skey;
	}
	_gy_skey = _cookie_obj.get("gy_skey");
	if(_gy_skey.length>0){
		var _arr = _gy_skey.split('|');
		global_userinfoobject.code = 0;
		global_userinfoobject.nick = eval('"'+unescape(_arr[0])+'"');
		global_userinfoobject.idcode = _arr[1];
		global_userinfoobject.head = _arr[2];
		global_userinfoobject.msgNum = _arr[11];
		global_userinfoobject.needPayProjectNum =_arr[12];
		global_userinfoobject.uin = _arr[13];
		return _gy_skey;
	}
	return '';
}

function setGySkeyToCookie(data){
	var _arr = [];
	_arr[0] = escape(data.nick);
	_arr[1] = data.idcode;
	_arr[2] = data.head;
	_arr[3] = data.msgNum;
	_arr[4] = data.uin;
	_arr[5] = global_userinfoobject.needPayProjectNum;

	var _str = _arr.join('|');
	var expires = new Date();
	expires.setTime(expires.getTime() + 5 * 60 * 1000); //50分钟有效
	_cookie_obj.set("gy_bskey",_str,expires,"/","gongyi.qq.com");
	global_userinfoobject.code = 0;
	global_userinfoobject.uin = data.uin;
	global_userinfoobject.nick = eval('"'+data.nick+'"');
	global_userinfoobject.head = data.head;
	global_userinfoobject.idcode = data.idcode;
	global_userinfoobject.msgNum = data.msgNum;
	global_userinfoobject.needPayProjectNum = data.needPayProjectNum;
}

/*初始化登录状态*/
function initHeaderLoginPlane(callback){
	try{
		var _skey = _cookie_obj.get('skey');
		if(_skey.length>0){
			var _gy_skey = getGySkeyFromCookie();
			if(_gy_skey.length>0&&global_userinfoobject.skey==_skey){//cookie中有用户信息
				Global_PageHeardLoginInfo_v2("Global_pageheardObj");
				setGySkeyToCookie(global_userinfoobject);
				if(typeof callback=='function')
					callback();
			}
			else{
				var _url = 'http://npoapp.gongyi.qq.com/_GetBaseUserInfo?callback=?';
				$.getJSON(_url,function(data){
					if(data.code==0){
						data.skey = _skey;
						setGySkeyToCookie(data);
						Global_PageHeardLoginInfo_v2("Global_pageheardObj");
					}
					if(typeof callback=='function')
						callback();
				});
			}
		}
		else{
			global_userinfoobject.code = -1;
			_cookie_obj.clear("gy_bskey","","/","gongyi.qq.com");
			if(typeof callback=='function')
				callback();
		}
	}catch(e){}
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
});/*  |xGv00|da22fed2d1dc775151237276a368202a */