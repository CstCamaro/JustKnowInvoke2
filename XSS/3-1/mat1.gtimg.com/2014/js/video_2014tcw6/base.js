/**
 * 基础模块
 * @author allexwang (allexwang@tencent.com)
 */
var baseMoudle = {};

/**
 * var data = $y('action-data'); dataProcess(data,'name');
 * @param {actionData:string}
 * @param {name:string}
*/
baseMoudle.dataProcess = function(actionData, name) {
    var d = actionData;
    var arr = d.split("&");
    var data = {};

    for (var i = 0; i < arr.length; i++) {
        var t = arr[i].split("=");
        var s1 = t[0],
            s2 = t[1];
        data[s1] = s2;
        if (s1 == name) {
            return data[s1];
        }
    }
    return data;
};

/**
 * [getCookie 获取cookie]
 * @param  {[type]} Name [description]
 * @return {[type]}      [description]
 * baseMoudle.getCookie('name')
 */
baseMoudle.getCookie = function (Name) {
    var search = Name + "=";
    if(document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if(offset != -1){
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if(end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end));
        }else{
            return ""
        }
    }
};

/**
 * get location.search parameters
 * @param  {[type]} paras [description]  is string
 * getRequest('string');
 */
baseMoudle.getRequest = function(paras){
    var url = location.search;
    var _request = {};

    if( url.indexOf("?") != -1){
        var str = url.substr(1),
            i = 0,
            strs = str.split("&");

        for( ;i<strs.length;i+=1 ){
            _request[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
        }
    }

    var value = _request[paras.toLowerCase()];
    if(typeof(value) == "undefined"){
        return "";
    } else {
        return value;
    }
};

/**
 * [setCharest 提交表单的时候瞬间转变页面编码]
 */
baseMoudle.setCharest = function(){
	var isIE = document.all && window.external; 
	if (document.charset != 'utf-8' && isIE) {
		var charset = document.charset;
		document.charset = 'utf-8';
		setTimeout(function() {
		    document.charset = charset;
	    }, 0);
	}
};

/**
 * [uaMatch description]
 * @param  {[version]} ua [description]
 * @return {[browser]}    [description].
 * matched = uaMatch(navigator.userAgent);
 * console.log(matched.browser)
 */
baseMoudle.uaMatch = function( ua ) {
	ua = ua.toLowerCase();

	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};
};

/**
 * [setupTopHook 返回顶部方法]
 * @return {[type]} [description]
 */
baseMoudle.setupTopHook = function() {
	var matched = baseMoudle.uaMatch(navigator.userAgent);
	var ie6 = (matched.browser == 'msie' && matched.version == "6.0");

	$Jq('li[node-type=setupTop]').click(function(e) {
		e.preventDefault();
		window.scrollTo(0, 0);
	});

	$Jq(window).on('scroll resize', function(e) {
		if ($Jq(document).scrollTop() > 600) {
			$Jq('#dtdh').show();
		} else {
			$Jq('#dtdh').hide();
		}
	});

	if (ie6) {
		$Jq(window).on('scroll resize', function(e) {
			var doc = document.documentElement,
			top = doc.scrollTop + doc.clientHeight - $Jq('#dtdh').outerHeight(true) - 200;
			$Jq('#dtdh').css('top', top);
		});
	}
};

/**
 * object.create 
 */
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
};

if(typeof Array.isArray === 'undefined'){
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === "[object Array]";
	};
}

/**
 * 截取字符串长度
 */
//设置字符串
String.prototype.encodeHTML = function() {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(this));
    return div.innerHTML.replace(/\s/g, "&nbsp;").replace(/"/g, "&quot;");
};
//获取字符长度
String.prototype.getByteLength = function() {
    return this.replace(/[^\x00-\xff]/g, "rr").length;
};
String.prototype.decodeHTML = function() {
    return this.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '\"').replace(/&#39;/g, '\'').replace(/&amp;/g, '&');
};
String.prototype.cutString = function(n, suf, encodeFlag) {
    //var r = /[^\x00-\xff]/g;
    var str = this,
    suf = suf || '';
    if ( !! encodeFlag === false) {
        str = this.decodeHTML();
        if (str.getByteLength() <= n) return str.encodeHTML();
        var m = Math.floor(n / 2);
        for (var i = m, len = str.getByteLength(); i <= len; i++) {
            if (str.substr(0, i).getByteLength() > n) {
                return (str.substr(0, i - 1) + suf).encodeHTML();
            }
        }
        return (str + suf).encodeHTML();
    } else {
        if (str.getByteLength() <= n) return str;
        var m = Math.floor(n / 2);
        for (var i = m, len = str.getByteLength(); i <= len; i++) {
            if (str.substr(0, i).getByteLength() > n) {
                return str.substr(0, i - 1) + suf;
            }
        }
        return str + suf;
    }
};/*  |xGv00|22e83e666e15be4a1ee99cc2f42d9aa4 */