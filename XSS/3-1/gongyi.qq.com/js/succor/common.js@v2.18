var global_userinfoobject = {'nick':''}; 
var newMsgCount = 0;
var global_actidtotal = 0; 
var global_donatetotal = {"donation_cnt":0,"donation_money":0,"donation_getjifen":0,"donation_defcnt":0}; 
var projnumObj = 0; 
var volunteerStat = {"unauth":0,"authed":0}; 
var global_uinobject = {"npoactivity_userinfo":[],"npoactivity_orginfo":[],"EnterTotal_Cnt":0,"FMoneyOfRemain":0}; 
var NeedAppraiseObject = []; 
var _cookie_obj = GyLib.Cookie();

var ISURGENCY = true;
changeNavTab(2);

/*function getGySkeyFromCookie(){
	var _gy_skey = _cookie_obj.get("gy_skey");
	if(_gy_skey.length>0){//cookie??????????
		var _arr = _gy_skey.split('|');
		global_userinfoobject.code = 0;
		global_userinfoobject.nick = eval('"'+unescape(_arr[0])+'"');
		global_userinfoobject.idcode = _arr[1];
		global_userinfoobject.head = _arr[2];
		global_userinfoobject.donation_cnt = _arr[3];
		global_userinfoobject.donation_money = _arr[4];
		global_userinfoobject.donation_getjifen = _arr[5];
		global_userinfoobject.donation_defcnt = _arr[6];
		global_userinfoobject.love_point = _arr[7];
		global_userinfoobject.love_step = _arr[8];
		global_userinfoobject.unauthnum = _arr[9];
		global_userinfoobject.publishnum = _arr[10];
		global_userinfoobject.msgNum = _arr[11];
		global_userinfoobject.needPayProjectNum =_arr[12];
		global_userinfoobject.uin = _arr[13];
		global_userinfoobject.skey = _arr[14];
		global_userinfoobject.donateProjectNum = _arr[15];
		global_userinfoobject.recommendProject = _arr[16];
		global_userinfoobject.needPayID = _arr[17];
		global_userinfoobject.doubleIcon = _arr[18];
		global_userinfoobject.universay  = _arr[19];
	}
	return _gy_skey;
}


function setGySkeyToCookie(data){
	var _arr = [];
	_arr[0] = escape(data.nick);
	_arr[1] = data.idcode;
	_arr[2] = data.head;
	_arr[3] = data.donation_cnt;
	_arr[4] = data.donation_money;
	_arr[5] = data.donation_getjifen;
	_arr[6] = data.donation_defcnt;
	_arr[7] = data.love_point;
	_arr[8] = data.love_step;
	_arr[9] = data.unauthnum;
	_arr[10] = data.publishnum;
	_arr[11] = data.msgNum;
	_arr[12] = data.needPayProjectNum;
	_arr[13] = data.uin;
	_arr[14] = data.skey;
	_arr[15] = data.donateProjectNum;
	_arr[16] = data.recommendProject;
	_arr[17] = data.needPayID;
	_arr[18] = data.doubleIcon;
	_arr[19] = data.universay;
	var _str = _arr.join('|');
	var expires = new Date();
	expires.setTime(expires.getTime() + 50 * 60 * 1000); //50????????
	_cookie_obj.set("gy_skey",_str,expires,"/","gongyi.qq.com");
    global_userinfoobject.code = 0;
	global_userinfoobject.skey = data.skey;
	global_userinfoobject.uin = data.uin;
	global_userinfoobject.nick = eval('"'+data.nick+'"');
	global_userinfoobject.head = data.head;
	global_userinfoobject.idcode = data.idcode;
	global_userinfoobject.donation_cnt = data.donation_cnt;
	global_userinfoobject.donation_money = data.donation_money;
	global_userinfoobject.donation_getjifen = data.donation_getjifen;
	global_userinfoobject.donation_defcnt = data.donation_defcnt;
	global_userinfoobject.love_point = data.love_point;
	global_userinfoobject.love_step = data.love_step;
	global_userinfoobject.unauthnum = data.unauthnum;
	global_userinfoobject.publishnum = data.publishnum;
	global_userinfoobject.msgNum = data.msgNum;
	global_userinfoobject.needPayProjectNum = data.needPayProjectNum;
	global_userinfoobject.donateProjectNum = data.donateProjectNum;
	global_userinfoobject.recommendProject = data.recommendProject;
	global_userinfoobject.needPayID = data.needPayID;
	global_userinfoobject.doubleIcon = data.doubleIcon;
	global_userinfoobject.universay  = data.universay;
}

/!*??????????*!/
function initHeaderLoginPlane(callback){
    try{
        if(!ISURGENCY){//???????????????
            var _url = 'http://npoapp.gongyi.qq.com/_GetUserInfo2?callback=?';
            $.getJSON(_url,function(data){
                if(data.code==0){
                    global_userinfoobject = data;
                    global_userinfoobject.nick = eval('"'+global_userinfoobject.nick+'"');
                    Global_PageHeardLoginInfo_v2("Global_pageheardObj");
                }
                if(typeof callback=='function')
                    callback();
                return ;
            });
        }
        else{//???????cookie???????
            var _skey = _cookie_obj.get('skey');
            if(_skey.length>0){
                var _gy_skey = getGySkeyFromCookie();
                if(_gy_skey.length>0&&global_userinfoobject.skey==_skey){//cookie??????????
                    Global_PageHeardLoginInfo_v2("Global_pageheardObj");
                    setGySkeyToCookie(global_userinfoobject);
                    if(typeof callback=='function')
                        callback();
                }
                else{
                    var _url = 'http://npoapp.gongyi.qq.com/_GetUserInfo2?callback=?';
                    $.getJSON(_url,function(data){
                        if(data.code==0){
                            data.skey = _skey;
                            setGySkeyToCookie(data);
                            Global_PageHeardLoginInfo_v2("Global_pageheardObj");
                        }
                        if(typeof callback=='function'){
                            callback();
                        }
                    });
                }
            }
            else{
                global_userinfoobject.code = -1;
                _cookie_obj.clear("gy_skey","","/","gongyi.qq.com");
                if(typeof callback=='function')
                    callback();
            }
        }
    }catch(e){}
}*/

/*pageheard.succor.v3.js*/
function getGySkeyFromCookie(){
 var _gy_udata = _cookie_obj.get("GY_UDATA");
 if(_gy_udata.length>0){
 _gy_udata = _gy_udata.replace(/&#x22;/ig,'"');
 global_userinfoobject = JSON.parse(_gy_udata);
 if(!!global_userinfoobject && !!global_userinfoobject.uin) global_userinfoobject.uin = global_userinfoobject.uin.replace(/[^\d]/,"");
 return _gy_udata;
 }
 return '';
 }
function setGySkeyToCookie(data){
 global_userinfoobject = data;
 if(global_userinfoobject.head==false||global_userinfoobject.head=='false'||(!!global_userinfoobject.head && global_userinfoobject.head.length<1)){
 global_userinfoobject.head = 'http://mat1.gtimg.com/gongyi/2011images/gongyi50.gif?/50';
 }
 
 data["uin"] = _cookie_obj.get("uin").replace(/[^\d]/,"");
 //data["skey"] = _cookie_obj.get("skey");
 _str = JSON.stringify(data);
 var expires = new Date();
 expires.setTime(expires.getTime() + 50 * 60 * 1000); //50????????
 _cookie_obj.set("GY_UDATA",_str,expires,"/","gongyi.qq.com");
 }
var Global_PageHeardLoginInfo_v2 = function(Objectname){
    if(typeof(global_userinfoobject) == 'undefined' || typeof(global_userinfoobject.code) =='undefined' || global_userinfoobject.code != 0){  //??????
        document.getElementById('Global_pageheardObj').innerHTML = '??????????????????? | <a id="Global_pageheardLoginBtnObj" title="??????" href="javascript:ptloginopenfun();void(0);">??????</a>';
        return true;
    }
    var HtmlCode = '<ul>';
    if(global_userinfoobject.code == 0){   //????
        console.log(global_userinfoobject)
		if(!!global_userinfoobject.nick){
            var InterceptNick = global_userinfoobject.nick.entities();  //QQ???
        }else if(!!global_userinfoobject.info.nick){
            var InterceptNick = global_userinfoobject.info.nick.entities();  //QQ???
        }
        var _usertype = global_userinfoobject.idcode||global_userinfoobject.universay;
        var needPayProjectNum = global_userinfoobject.needPayProjectNum;
        var newMsgCounts = global_userinfoobject.msgNum;
        HtmlCode += "<li>你好"+InterceptNick.subString(0,20)+"</li>";
        //HtmlCode += "<li id=\"top_uloveplan_t\"><a target='_blank' href='http://npoapp.gongyi.qq.com/_MonthlyList'>???????("+needPayProjectNum+")</a></li>";
	}
	HtmlCode += "<li id=\"top_ucenter_t\"><a target='_blank' href='http://npoapp.gongyi.qq.com/_MonthlyList' title='捐款记录'>捐款记录</a></li>";
    HtmlCode += "<li id=\"top_help_t\"><a target='_blank' href='http://gongyi.qq.com/loveplan/donations_help.htm' title='帮助中心'>帮助中心</a>   </li><li><a href='javascript:ptlogoutopenfun();void(0);' title='退出'>退出</a></li>";

    // HtmlCode += "<li id=\"top_ucenter_t\"><a target='_blank' href='http://npoapp.gongyi.qq.com/_MonthlyList' title='????????'>????????</a></li>";
    // HtmlCode += "<li id=\"top_help_t\"><a target='_blank' href='http://gongyi.qq.com/loveplan/donations_help.htm' title='????'>????</a>   </li><li><a href='javascript:ptlogoutopenfun();void(0);' title='???'>???</a></li>";
	if(document.getElementById(Objectname)){
		document.getElementById(Objectname).innerHTML = HtmlCode;
	}else{
		window.location.reload();
	}
	
}

/*??????????*/
function initHeaderLoginPlane(callback){
    try{
        var _skey = _cookie_obj.get('skey');
        if(_skey.length>0){
            var _gy_skey = getGySkeyFromCookie();
            if(_gy_skey.length>0 && global_userinfoobject.skey==_skey){//cookie??????????
				console.log(global_userinfoobject.skey)
                // global_userinfoobject = data;
                // global_userinfoobject.nick = eval('"'+global_userinfoobject.nick+'"');
                Global_PageHeardLoginInfo_v2("Global_pageheardObj");
                setGySkeyToCookie(global_userinfoobject);
                if(typeof callback=='function')
                    callback(global_userinfoobject);
            }
            else{
                console.log(global_userinfoobject,_skey)
                window['_cbCheckLogin'] = function(data){
                	console.log('_cbCheckLogin')
                    var _skey = _cookie_obj.get('skey');
                    if(data.code==0){
                        data.skey = _skey;
                        setGySkeyToCookie(data);
                        Global_PageHeardLoginInfo_v2("Global_pageheardObj");
                    }
                    if(typeof callback=='function')
                        callback(data);
                }
                //var _url = 'http://npoapp.gongyi.qq.com/user/userInfo/getFullInfo?g_tk='+$.gyUtil.getToken()+'&r='+Math.random()+'&jsoncallback=_cbCheckLogin';
                // var _url = '//yundonate.gongyi.qq.com/cgi-bin/Login?g_tk='+getSekyToekn()+'&r='+Math.random()+'&jsoncallback=_cbCheckLogin';
                var _url = '//ssl.gongyi.qq.com/cgi-bin/Login?g_tk='+getSekyToekn()+'&r='+Math.random()+'&jsoncallback=_cbCheckLogin';
                //http://yundonate.gongyi.qq.com/cgi-bin/Login?g_tk=1726247869&r=0.23632721294522985&jsoncallback=_cbCheckLogin


				// document.write('<script src="'+_url+'" charset="utf-8"><\/script>');
				$.ajax({
					type:"GET",
					url:_url,
					dataType:'jsonp',
					data:{},
					jsonp : "_cbCheckLogin",
					"jsoncallback":'?',
					
					scriptCharset:'utf-8',
					contentType: "application/x-www-form-urlencoded; charset=utf-8"
				})
                // document.head.insertAdjacentHTML('afterbegin','<script src="'+_url+'" charset="utf-8"><\/script>');

				/*var _script = document.createElement( 'script' ),
				 _head = document.head ||
				 document.getElementsByTagName( 'head' )[0] ||
				 document.documentElement;
				 _script.type = 'text/javascript';
				 _script.src = url;
				 _head.appendChild(_script);*/
                //??????document.ready?????

                return;
            }
        }
        else{
            global_userinfoobject.code = -1;
            _cookie_obj.clear("GY_UDATA","","/","gongyi.qq.com");
            if(typeof callback=='function')
                callback();
        }
    }catch(e){}
}

$().ready(function(){
	$("ul.top_navigate li.drop").hover(function(){
		$(this).addClass("dropHover");
		$(this).find("div").show();
		
	},function(){
		$(this).removeClass("dropHover");
		$(this).find("div").hide();
		});
});


/*
*	desc			????????????????
*	author			kidxiong
*	date			2013-4-19
*/
function createTipDiv(options){
	var _o = $.extend({'contentId':'floatDiv','maskId':'tipsMask','opacity':0.9},options);
	//?????????
	_maskObj = GyLib.Effect.Mask({id:_o.maskId,opacity:_o.opacity});
	_maskObj.create();
	
	//?????????
	var _obj = $('#'+_o.contentId);
	if(_obj[0]!=null)
		return [_obj,_maskObj];
	var _content = '<div id="'+_o.contentId+'" class="floatDiv"><div class="floatTitle"><a href="javascript:void(0)" class="floatClose">X</a><h4>??????</h4></div><div class="floatContent" id="floatContent"><h4 class="tips-title"></h4><p class="tips-content"></p></div><div style="text-align:center;padding-bottom:15px;"><a class="floatCloseBtn" id="sureBtn" style="float:none;margin:0 auto">???</a></div></div>';
	$('body').append(_content);
	$('.floatClose').bind('click',function(){closeTipDiv()});
	//$('.floatCloseBtn').bind('click',function(){closeTipDiv()});
	
	if(typeof(options)!="undefined" && typeof(options.successBack)!="undefined" && typeof(options.successBack)=="function")
	{
		//var _funss = options.successBack;
		//$('#sureBtn').attr('href',"javascript:void("+options.successBack+"())");
		$('#sureBtn').bind('click',options.successBack);
	}
	else
		$('#sureBtn').bind('click',function(){closeTipDiv()});
		
	_obj = $('#'+_o.contentId);
	return [_obj,_maskObj];
	
}

/*
*	desc			????????????[??????????????]
*	author			kidxiong
*	date			2013-4-19
*/
function closeTipDiv(){
	$('.floatDiv').hide();
	$('#'+GyLib.Effect.Mask.handlerID).hide();
}

/*
*	desc			???????????????
*	author			kidxiong
*	date			2013-4-19
*/
function createPromptDiv(options){
	var _o = $.extend({'promptId':'promptDiv','maskId':'tipsMask','opacity':0.9,'okFunc':function(){}},options);
	//?????????
	_maskObj = GyLib.Effect.Mask({id:_o.maskId,opacity:_o.opacity});
	_maskObj.create();
	
	//?????????
	var _obj = $('#'+_o.promptId);
	if(_obj[0]!=null)
		return [_obj,_maskObj];
	var _content = '<div id="'+_o.promptId+'" class="floatDiv"><div class="floatTitle"><a href="javascript:void(0);" class="floatClose">X</a><h4>??????</h4></div><div class="floatContent" id="floatContent"><p></p><div style="clear:both"></div><div style="width:100%;float:left;text-align:center;"><div style="text-align:center;"><div id="floatOkBtn" class="floatOkBtn">???</div><div style="margin-left:15px;" id="floatCloseBtn" class="floatCloseBtn">???</div></div></div></div></div>';
	$('body').append(_content);
	$('#floatOkBtn').bind('click',function(){_o.okFunc()});
	$('.floatClose').bind('click',function(){closeTipDiv()});
	$('.floatCloseBtn').bind('click',function(){closeTipDiv()});
	_obj = $('#'+_o.promptId);
	return [_obj,_maskObj];
}

/*
*	desc			?????????????????
*	author			kidxiong
*	date			2013-4-19
*/
function _showPromptDiv(text,callback){
	var _promptObj = createPromptDiv({'okFunc':callback});
	var _maskObj = _promptObj[1];
	var _promptDiv = _promptObj[0];
	_maskObj.show();
	var _index = _maskObj.getIndex();
	_promptDiv.find(".floatContent p").html(text);
	_promptDiv.floatDiv('middle').css('zIndex',_index+1).show();
	_promptDiv.show();
}
/*
//?????????
var initLoginStatus = function()
{
	if(global_userinfoobject.global_gongyiuserinfo == 0)
	{
		ptloginopenfun();return false;
	}
	if((typeof(volunteerStat) != 'undefined' && volunteerStat) || (typeof(fundStat) != 'undefined' && fundStat))
	{}else{
		//alert("?????????????");
		window.location = 'http://gongyi.qq.com/succor';
		return false;
	}
	return true;
}
*/

//???????????????cookie??
function writeVolunteerNumToCookie(num){
	var _cookie = new GyLib.Cookie();
	var _cookie_name = "gy_volunteer_num";
	var _num = _cookie.get(_cookie_name);
	if(num!=_num){
		var date=new Date(); 
		date.setTime(date.getTime()+24*60*60*1000); //1??????
		_cookie_obj.set(_cookie_name,num,date);
	}
}

//??????????????cookie????????????????
function getVolunteerNum(){
	var _cookie = new GyLib.Cookie();
	var _cookie_name = "gy_volunteer_num";
	var num = String(_cookie.get(_cookie_name));
	if(num.length<1){
		var url = "http://npoapp.gongyi.qq.com/succor/volunteer/getTotalVolunteer?isajax=1&jsoncallback=?";
		$.getJSON(url,function(data){
			if(data.status==1){
				var _num = data.info.num;
				writeVolunteerNumToCookie(_num);
				return String(_num);
			}
		});
	}
	else{
		return num;
	}
}

//????????????????
var getVolunteer = function(){
	var url = "http://npoapp.gongyi.qq.com/succor/volunteer/isWeiboVip?isajax=1&jsoncallback=?";
	$.getJSON(url,function(data){
		if(data.status==1){
			var num=0;
			if(data.info.num!=null){
				num = parseInt(data.info.num);
			}
			$('.volunteer_num').html(String(num));
			if(data.info.identify==2){//?????????????
				$('#identify0').hide();
				$('#identify1').hide();
				$('#identify2 .zyt_sta_text').html('????????????????????g????');
				$('#gotoApplyListBtn').html('?????????????');
				$('#identify2').show();
				$('.zyt_p_n').show();
				return ;
			}
			if(data.info.identify==3){//????????????
				$('#identify0').hide();
				$('#identify1').hide();
				$('#identify2 .zyt_sta_text').html('?????????????????????????????');
				$('#gotoApplyListBtn').html('????????????');
				$('#identify2').show();
				$('.zyt_p_n').show();
				return ;
			}
			if(data.info.identify==1){//????????vip?????????????????
				$('#identify0').hide();
				$('#identify2').hide();
				$('#identify1').show();
				$('.zyt_p_n').show();
				return;
			}
			else{//????????????????????
				$('#identify1').hide();
				$('#identify2').hide();
				$('#identify0').show();
				$('.zyt_p_n').show();
				return;
			}
			
		}
	});
}
//??????????
function applyVolunteer(){
	var url = "http://npoapp.gongyi.qq.com/succor/volunteer/apply?isajax=1&jsoncallback=?";
	$.getJSON(url,function(data){
		if(data.status==1){
			if(data.info.code==0){
				_showPromptDiv('?????????????????????????????????????????',function(){window.location.href='http://gongyi.qq.com/succor/project_apply.htm'});
				$('#identify0').hide();
				$('#identify1').hide();
				$('#identify2 .zyt_sta_text').html('???????????????')
				$('#identify2').show();
				$('.zyt_p_n').show();
				return ;
				return ;
			}
			else if(data.info.code==1){//????????vip?????????????????
				//alert('????????????????????????????');
				var _tipsObj = createTipDiv();
				var _contentDiv = _tipsObj[0];
				var _maskObj = _tipsObj[1];
				_maskObj.show();
				var _index = _maskObj.getIndex();
				_contentDiv.find('#floatContent p').html('????????????????????????????!');
				_contentDiv.floatDiv('middle').css('zIndex',_index+1).show();
				return;
			}
			else if(data.info.code==11){
				ptloginopenfun();return false;
			}
			else if(data.info.code==10){//????????????????????
				alert('???????????????????');
				return;
			}
			
		}
	});
}

function getUrlParamVal(paras){
	var url = window.location.href;
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
	var paraObj = {}
	for (i=0; j=paraString[i]; i++){
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	
	if(typeof(returnValue)=="undefined"){
		return "";
	}else{
		return returnValue;
	}
}

var showTips1 = function(content,flag,opt)
{
	var cssClass = '';
	if(typeof(flag) != 'number') flag = 1;
	if(flag==1)
	{
		cssClass = 'tips_success';
	}else if(flag==2)
	{
		cssClass = 'tips_error';
	}else if(flag==3)
	{
		cssClass = 'tips_warning';
	}
	//var _tipsOpt = {};
	
	
	var _tipsObj = createTipDiv();
	var _contentDiv = _tipsObj[0];
	var _maskObj = _tipsObj[1];
	_maskObj.show();
	var _index = _maskObj.getIndex();
	
	if(typeof(opt) != 'undefined')
	{
		if(typeof(opt.title) != 'undefined')
		{
			_contentDiv.find('#floatContent').html('<h4 class="tips-title '+cssClass+'">'+opt.title+'</h4>');
			_contentDiv.find('#floatContent').append('<p class="tips-content">'+content+'</p>');
		}
		else{
			_contentDiv.find('#floatContent').html('<p class="'+cssClass+'">'+content+'</p>');
		}
		if(typeof(opt.width) != 'undefined') _contentDiv.width(opt.width);
		if(typeof(opt.sBackFun) != "undefined" && typeof(opt.sBackFun) == "function")
		{
			//_tipsOpt = {successBack:opt.sBackFun};
			$('#sureBtn').bind('click',opt.sBackFun);
		}
		
	}else{
		_contentDiv.find('#floatContent').html('<p class="'+cssClass+'">'+content+'</p>');
	}
	
	//_contentDiv.floatDiv('middle').css('zIndex',_index+1).show();
	var win = GyLib.Window().viewSize();
	win.width = (win.width - _contentDiv.width())/2;
	win.width = win.width<0?0:win.width;
	win.height = (win.height - _contentDiv.height())/2;
	win.height = win.height<0?0:win.height;
	_contentDiv.PositionFixed({x:win.width,y:win.height}).show(); 
	return;
}
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                //date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				date.setTime(date.getTime() + (options.expires * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
function fixedIE6Png(){
	DD_belatedPNG.fix('ul.top_navigate li a.ihover,ul.top_navigate li a:hover,.money_plane,.my_iocn1,.my_iocn3,.myinfo_cen_iocn,.arrow_play,.focus_around_white,.focus_around_light,.tjzt_sp5,.wyjk_a,.btn_zhufu,#mylevel,.flow-tips-arrow');
}


/*  |xGv00|8fecc55c838571b6b55f6f8a145e9ea6 */