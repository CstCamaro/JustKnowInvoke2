var commentId = 0;
var reqnum = 3;
var page =0;
var token = null;

function initStart(){
    
    commentList(commentId);

	//验证登录
	if(!__uin){
        $('#hasLogin').hide();
        $('#noLogin').show();
	}else{
        $('#noLogin').hide();
        $('#hasLogin').show();
	}
	//发消息使用key
	if(getKey()){
		token = generateToken(getKey());
	}
	var wx_open_id = G_getCookie("cross_openid");
	var wx_access_token = G_getCookie("cross_access_token");

	if(wx_open_id != ''  && wx_access_token != '' ){
		token = generateTokenWeixin(getKeyWeixin());
		$("#access_token").val(wx_access_token);
		$("#openid").val(wx_open_id);
		$("#noLogin").hide();
		$("#hasLogin").show();
    }else{
		$("#appid").val("");
		$("#logintype").val("");
		$("#wxapi").val("");
    }

    //listen function list
    $("#login_qq_btn").on("click",function(){
        qqLogin();//登录
    });
	$("#get_more_comment").on("click",function(){
		commentList(commentId);
	});
	
	$("#comment_submit").on("click",function(){
        var commentContent = $('#comment_content').val();
        if( commentContent == "" ){
            //alert("请输入点内容吧");
            return false;
        }
		$("#token").val(token);
        $("#targetid").val(targetid);
        $('#commentForm').submit();
	});
}

function comment_submit( isPC ){
    if( isPC ){
        var commentContent = $('#comment_content').val();
        if( commentContent == "" ){
            //alert("请输入点内容吧");
            return false;
        }
    }else{
        var commentContent = $('#comment_content_mob').val();
        if( commentContent == "" ){
            //alert("请输入点内容吧");
            return false;
        }
        $('#comment_content').val(commentContent);
    }
    $("#token").val(token);
    $("#targetid").val(targetid);
    $('#commentForm').submit();
}

function getUin(){
    //退出登录后luin还存在，暂时注释掉
	//var cookieUin = jQuery.cookie('uin') || jQuery.cookie('luin');
	var cookieUin = jQuery.MYcookie('uin');
	return cookieUin && cookieUin.match(/[1-9][0-9]*/)[0];
}
function getKey() {
    return jQuery.MYcookie('skey') || jQuery.MYcookie('lskey');
}

//QQ用户登录
function qqLogin() {
	//判断设备分辨率，小屏统一用移动登录
	//之后判断微信cookie是否存在，否则调用统一登录

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
		location.href=qqLoginUrl+"#comment";
	}else{
	//pc
		var qqLoginUrl="http://ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&style="+loginStyle+"&low_login=0&link_target=blank&appid=636014201&target=self&s_url="+backUrl;
		location.href=qqLoginUrl;
	}
}
//读取评论列表
function commentList(p) {
	$("#commentForm").attr('action',"//w.coral.qq.com/article/comment/");
	var str = "//coral.qq.com/article/"+targetid+"/comment?commentid="+p+"&reqnum="+reqnum+"&tag=&callback=mainComment&_=";
	$.ajax({
		type:'get',
		url:str,
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:'mainComment',
		success: function (data) {

			page ++;
			var Coment =  data.data;
			var comment_total_num = Coment.total;
			var comment_all_pages = Math.ceil( comment_total_num/reqnum );
			commentId = Coment.last;
			$("#comment_total_num").html( comment_total_num );
			$("#comment_list_show").append(commentStart(Coment.commentid));
			if((Coment.reqnum != Coment.retnum) || page > comment_all_pages ){
				$("#get_more_comment").hide();
			}
		}
	});
}
//解析评论信息
function commentStart(str) {
	var res ="";
	for(var i in str){
        res +="<li><span class='img_Header'><img src='"+str[i].userinfo.head+"'></span><div class='text_wrapper'><p><span class='font-name'>"+userStart(str[i].userinfo)+"</span><em>"+str[i].timeDifference+"</em></p><div><p>"+str[i].content+"</p></div></div></li>";
	}
	return res;
}
//解析用户信息
function userStart(str) {
	var nick = str["nick"];
	return nick?nick:"匿名";
}

//发送消息后回调函数
function topCallback(str) {
	if(str.errCode == 0){
		var cont = str.data;
        var content ="<li><span class='img_Header'><img src='"+cont.userinfo.head+"'></span><div class='text_wrapper'><p><span class='font-name'>"+userStart(cont.userinfo)+"</span><em>刚刚</em></p><div><p>"+cont.content+"</p></div></div></li>";
		$("#comment_content").val("");
		$("#comment_list_show").prepend(content);
	}else{
		if(str.errCode == 8){
			qqLogin();//登录
		}else{
			alert("系统错误，稍后再试");
		}
		//alert(str.errCode);
	}
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
function getKeyWeixin() {
    return wx_access_token;
}
function generateToken(key) {
    var hash = 2013;
    for(var i = 0, len = key.length; i < len; i++) {
        hash += (hash << 5) + key.charCodeAt(i);
    }
    return hash & 0x7fffffff;
}
function generateTokenWeixin(a) {
	var k = 2013;
	if (a)
		for (var p = 0, m = a.length; p < m; p++)
			k += (k << 5) + a.charCodeAt(p);
	return k & 2147483647
}

var wx_try_login = G_getCookie("wx_try_login");
var CAN_COOKIE = true;
if(!wx_try_login)
{
	G_setCookie("wx_try_login", "1","qq.com","/",1);
	if(!G_getCookie("wx_try_login"))
	{
		CAN_COOKIE = false;
	}
}

var wx_open_id = G_getCookie("cross_openid");
var wx_access_token = G_getCookie("cross_access_token");
var wx_cross_expires_in = G_getCookie("cross_expires_in");
var IS_LOGIN_FLAGIS_LOGIN_FLAG = true;

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
	}
	else{
		G_delCookie("wx_try_login" , "qq.com" , "/");
	}
}
/*
 * jQuery cookie plugin
 * 已设置默认设置（config.defaults），domain=qq.com，path=/
 */
(function ($, document, undefined) {
    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    var config = $.MYcookie = function (key, value, options) {
        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);
            if (value === null) {
                options.expires = -1;
            }
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                    encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path  ? '; path=' + options.path : '',
                    options.domain  ? '; domain=' + options.domain : '',
                    options.secure  ? '; secure' : ''
                    ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie;
            }
        }

        return null;
    };

    config.defaults = {
        path: '/',
        expires: 7
    };

    $.removeCookie = function (key, options) {
        if ($.MYcookie(key) !== null) {
            $.MYcookie(key, null, options);
            return true;
        }
        return false;
    };
})(jQuery, document);/*  |xGv00|a1a4a31ed927d6c673d98017d4ee01cf */