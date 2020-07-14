//=============qq======================
  try {
    document.domain = 'qq.com';
  } catch (_error) {
    e = _error;
  }
  var push_dev_qq = 0;
	var push_dev_wx = 0;
	var isLogin = false;
	var __uin = getUin();
	//document.domain="qq.com";
	var weixintoken;
	var backUrl = window.location.href;
	var wx_open_id = G_getCookie("cross_openid");
	var wx_access_token = G_getCookie("cross_access_token");
//QQ用户登录
function qqLogin() {
	//判断设备分辨率，小屏统一用移动登录
	//通用登录样式 12 8 9 5
	var loginStyle = 12;
	var w = window, 
	d = document,
	e = d.documentElement;
	var dev_xx =document.documentElement.clientWidth || document.body.clientWidth;
	//console.log(dev_xx);
	//暂定用屏幕宽度判断设备
	if(_checkMobile()){
		loginStyle = 9;	
		var qqLoginUrl="http://ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&style="+loginStyle+"&low_login=0&link_target=blank&appid=636014201&target=self&s_url="+backUrl;
		location.href = qqLoginUrl;
	}else{
	//pc
		cbtb_showLogin();
	}
}
function getUin(){
	return cbtb_getQQUin();

}
function generateToken(key) {
    var hash = 2013;
    for(var i = 0, len = key.length; i < len; i++) {
        hash += (hash << 5) + key.charCodeAt(i);
    }
    return hash & 0x7fffffff;
}

function getKey() {
    return cbtb_Cookie('skey') || cbtb_Cookie('lskey');
}


//========weixin==================
var wx_try_login = G_getCookie("wx_try_login");
var CAN_COOKIE = true;
if(!wx_try_login)
{
	G_setCookie("wx_try_login", "1","qq.com","/",1);
	//console.log(" ---"+G_getCookie("wx_try_login"));
	if(!G_getCookie("wx_try_login"))
	{
		CAN_COOKIE = false;
	}
}

var wx_open_id = G_getCookie("cross_openid");
var wx_access_token = G_getCookie("cross_access_token");
var wx_cross_expires_in = G_getCookie("cross_expires_in");

var G_LOGIN_URL = "http://imp.qq.com/index.php/weixin/oauth2/cross?redirect_url=";
var ua = navigator.userAgent;
var isWechart = ua.indexOf("MicroMessenger") > 0 ? true : false;
//微信用户登录
if(CAN_COOKIE && isWechart)
{
	var nowTime = new Date();
	var expireTime = nowTime  - wx_cross_expires_in * 1000;
	if((wx_open_id == "" || wx_access_token == "" || expireTime >= 0) && !wx_try_login)
	{
		IS_LOGIN_FLAG = false;
		var url = G_LOGIN_URL;
		url += encodeURIComponent(location.href);	
        location.href = url;
		//$(".c3").html("go weixin " +url);
	}
	else{
		G_delCookie("wx_try_login" , "qq.com" , "/");
	}
}
function wxloginout() {
	G_delCookie("wx_try_login" , "qq.com" , "/");
	location.href = location.href ;
}
function getKeyWeixin() {
    return wx_access_token;
}
function generateTokenWeixin(a) {
	var k = 2013;
	if (a)
		for (var p = 0, m = a.length; p < m; p++)
			k += (k << 5) + a.charCodeAt(p);
	return k & 2147483647
}
//weixin
function G_getCookie(name) {
		var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
		var m = document.cookie.match(r);
		return (!m ? "" : m[1]);
}

function G_setCookie(name, value, domain, path, hour) {
	if (hour) {
		var today = new Date();
		var expire = new Date();
		expire.setTime(today.getTime() + 3600000 * hour);
	}
	document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + tb.config.domainPrefix + ";"));
	return true;
}

function G_delCookie(name, domain, path) {
	document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=qq.com;"));
}


function _checkMobile()  
{  
   var userAgentInfo = navigator.userAgent;  
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone");  
   var flag = false;  
   for (var v = 0; v < Agents.length; v++) {  
	   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = true; break; }  
   }  
   return flag;  
}
function debug_test() {
	//$("body").append("oid "+wx_open_id +" tok "+wx_access_token +" uid "+ __uin+" CC"+ CAN_COOKIE+" p_wx  "+ push_dev_wx +" p_qq "+ push_dev_qq );
}
function userloginindTemp() {
	if(push_dev_wx == "0" && push_dev_qq =="0"){
		qqLogin();
	}
}

			navigator.ptlogin_callback = function(data) {
                if (typeof JSON !== 'undefined') data = JSON.parse(data);
                else data = cbtb_str2JSON(data);

                switch (data.action) {
                case 'close':
                    ptlogin2_onClose();
                    break;

                case 'resize':
                    ptlogin2_onResize(data.width, data.height);
                    break;
                }
            }
            if (typeof window.postMessage !== 'undefined') {
                window.onmessage = function(event) {
                    console.log(event.origin);
                    var msg = event || window.event; // 此处兼容IE8
                    var data;
                    //console.log(data)
                    if (typeof JSON !== 'undefined') data = JSON.parse(msg.data);
                    else data = cbtb_str2JSON(msg.data);

                    switch (data.action) {
                    case 'close':
                        ptlogin2_onClose();
                        break;
                    case 'resize':
                        ptlogin2_onResize(data.width, data.height);
                        break;
                    }
                }
            }
            function cbtb_getQQUin() {
                var cookieUin = cbtb_Cookie('uin') || cbtb_Cookie('luin');
                return cookieUin && cookieUin.match(/[1-9][0-9]*/)[0];

            }
            function cbtb_Cookie(name) {
                var arg = name + "=";
                var alen = arg.length;
                var clen = document.cookie.length;
                var i = 0;
                while (i < clen) {
                    var j = i + alen;
                    if (document.cookie.substring(i, j) == arg) return cbtb_getCookieVal(j);
                    i = document.cookie.indexOf(" ", i) + 1;
                    if (i == 0) break;
                }
                return null;
            }
            function cbtb_getCookieVal(offset) {
                var endstr = document.cookie.indexOf(";", offset);
                if (endstr == -1) endstr = document.cookie.length;
                return unescape(document.cookie.substring(offset, endstr));
            }
            function cbtb_str2JSON(str) {
                //eval('var __pt_json=' + str);
                //return __pt_json;
                return null;
            }
            function ptlogin2_onResize(width, height) {
                var login_wnd = document.getElementById("login_div");
                document.getElementById("login_frame").style.height = height + 'px';
                document.getElementById("login_frame").style.width = width + 'px';
                if (login_wnd) {
                    login_wnd.style.width = width + "px";
                    login_wnd.style.height = height + "px";
                    login_wnd.style.visibility = "hidden";
                    login_wnd.style.visibility = "visible";
                    login_wnd.style.marginLeft = -width / 2 + 'px';
                    login_wnd.style.marginTop = -height / 2 + 'px';
					//login_wnd.style.top = (document.body.offsetHeight - 170) / 2 + document.body.scrollTop;
                }
				console.log(
					"height:"+document.getElementById("login_frame").style.height+
					"/n width:"+document.getElementById("login_frame").style.width
				)
                console.log(document.body.offsetHeight - 170/ 2 + document.body.scrollTop)
            }
            function ptlogin2_onClose() {
                document.getElementById("overlay").style.display = "none";
                document.getElementById("login_div").style.display = "none";
				document.getElementById("login_div").style.marginLeft = '-9999px';
                document.getElementById("login_frame").style.display = "none";
                document.getElementById("login_frame").src = "";
				console.log("close");
            }
            function cbtb_logout_reload() {
                location.reload();
            }
            function Ptlogin2_login_ok(obj) {
                //console.log(obj)
				console.log("qq login is ok")
            }
            function cbtb_logout() {
                pt_logout.logout(cbtb_logout_reload);
            }
            function loadPtlogin() {
                if (cbtb_url == "" || cbtb_url == "undefined") {
                    cbtb_url = location.href;
                }
                var s_url = 'https://www.qq.com/qq2012/loginSuccess.htm';//encodeURIComponent(cbtb_url);
                var proxy_url = encodeURIComponent('https://www.qq.com/qq2012/loginSuccess.htm');
                var url = 'https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=636014201&s_url=' + s_url + '&style=20&proxy_url=' + proxy_url + '&target=self';
                //console.log(url);
                document.getElementById("login_frame").src = url;
            }

            function cbtb_showLogin(e) {
                /*e = e || window.event;
                document.getElementById('overlay').className = 'overlay';
                document.getElementById('overlay').style.display = 'block';
                // ie
                document.getElementById("login_frame").onreadystatechange = function() {
                    if (document.readyState == 'complete') {
                        document.getElementById("login_frame").onreadystatechange = null;
                        document.getElementById("login_div").style.display = 'block';
                        document.getElementById("login_frame").style.display = 'block';
                    }
                }
                document.getElementById("login_frame").onload = function() {
                    document.getElementById("login_div").style.display = 'block';
                    document.getElementById("login_frame").style.display = 'block';
                }
                loadPtlogin();*/
                loginStyle = 12;	
                var qqLoginUrl="http://ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&style="+loginStyle+"&low_login=0&link_target=blank&appid=636014201&target=self&s_url="+backUrl;
                location.href = qqLoginUrl;
            }
            function cbtb_init() {
                var qq_uid = cbtb_getQQUin();
                if (qq_uid) {
                    document.getElementById("tb_qq_uid").innerHTML = qq_uid;
                    document.getElementById("tb_login_content_out").style.display = 'block';
                    document.getElementById("tb_login_content_in").style.display = 'none';
                    document.getElementById('http_logout').onclick = cbtb_logout;
                } else {
                    document.getElementById("tb_login_content_out").style.display = 'none';
                    document.getElementById("tb_login_content_in").style.display = 'block';
                    document.getElementById('http_login').onclick = cbtb_showLogin;
                    document.getElementById('overlay').onclick = ptlogin2_onClose;
                }
            }
			var login = {
						loginSuccess: function(){
							ptlogin2_onClose();
							cbtb_init();
							try {
								cbtb_api();
							} catch (_error) {
								e = _error;
							}
							
						}
			};/*  |xGv00|ced6883f051a5b88ed37cee3a584d647 */