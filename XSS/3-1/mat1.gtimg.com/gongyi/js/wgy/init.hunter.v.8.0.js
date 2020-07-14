gIsLogin = 0;
gUin = 0;
gOrganizer = 0;
gDreamID = 0;
gIndex = 0;
gDreamPage=0;
gTotalMoney=1;
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
	
function getUrlMiao()
{
	var url = window.location.href;
	var returnValue = url.substring(url.indexOf("#")+1,url.length);
	if(returnValue.indexOf("?")>=0)
	{
		var tihuan = returnValue.substring(returnValue.indexOf("?"),returnValue.length);
		returnValue = returnValue.replace(tihuan,'');
	}
	
	if(typeof(returnValue)=="undefined"){
		return "";
	}else{
		return returnValue;
	}
}
	
	
function loginBackDonate()
{
	//µÇÂ½·µ»Øµ¯³ö¾èÔù¿ñ
	curLoginBid = $.cookie('loginBid');
	if(global_userinfoobject.uin > 0 && global_userinfoobject.global_gongyiuserinfo == 1 && curLoginBid>70)
	{
		curLoginVid = $.cookie('loginVid')>0?$.cookie('loginVid'):0;
		toDonate(curLoginBid,curLoginVid);		
		$.cookie('loginBid',null);
		$.cookie('loginVid',null);
	}else if(curLoginBid>0)
	{
		$.cookie('loginBid',null);
		$.cookie('loginVid',null);
	}
}/*  |xGv00|09aece30f25a62a306ed5f6968b41846 */