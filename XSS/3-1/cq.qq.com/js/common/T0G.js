//使用J_merge.hta之后需要对以下行号段代码进行修补
// 65:T.OnDOMLoaded.Load  2775:T.PingPGV
//=============
//建立 T 命名空间
var T = new Object();
//=============
T.debugMode = true;
//=============
if(!T.debugMode&&location.search.indexOf('?debug')==-1){window.onerror=function(){return true}}

/**===========================**/
T.Reflow=function(){
	var b = document.body;
	if(!b)return;
	b.style.zoom = b.style.zoom=="1"?"100%":"1";
}

T.GetUIN=function(){
	function RepUIN(uin)
	{
	uin=String(uin);
	if(uin.length>15)uin=uin.substr(0,10);
	return uin.replace(/^(\D|0)+/ig,'').replace(/(\D.*)/gi,'');
	}
		var uin=T.GetCookie('zzpaneluin');
		if(uin)uin=RepUIN(uin);
		else{
			uin=T.GetCookie('uin');
			if(uin)uin=RepUIN(uin);
			else uin=0;
		}
	//====}
	if(!uin>10000)uin=0;
	return uin;}
/**================================================================**/
T.isIE = !!document.all;
T.$ = function(a){return typeof(a)=='string'?document.getElementById(a):a};


//if(!T.isIE)document.write("<script src='http://q1.city.qq.com/js/T_ff.js'><\/script>");


Array.prototype.______Array = function(){return '______Array'}

var JSON = {
    org: 'http://www.JSON.org',
    copyright: '(c)2005 JSON.org',
    license: 'http://www.crockford.com/JSON/license.html',

    stringify: function (arg) {
        var c, i, l, s = '', v;

        switch (typeof arg) {
        case 'object':
            if (arg) {

                if (arg.______Array&&arg.______Array()== '______Array') {
                    for (i = 0; i < arg.length; ++i) {
                        v = this.stringify(arg[i]);
                        if (s) {
                            s += ',';
                        }
                        s += v;
                    }
                    return '[' + s + ']';
                } else if (typeof arg.toString != 'undefined') {
                    for (i in arg) {

                        v = arg[i];
                        if (typeof v != 'undefined' && typeof v != 'function') {
                            v = this.stringify(v);
                            if (s) {
                                s += ',';
                            }
                            s += this.stringify(i) + ':' + v;
                        }
                    }
                    return '{' + s + '}';
                }
            }
            return 'null';
        case 'number':
            return isFinite(arg) ? String(arg) : 'null';
        case 'string':
            l = arg.length;
            s = '"';
            for (i = 0; i < l; i += 1) {
                c = arg.charAt(i);
                if (c >= ' ') {
                    if (c == '\\' || c == '"') {
                        s += '\\';
                    }
                    s += c;
                } else {
                    switch (c) {
                        case '\b':
                            s += '\\b';
                            break;
                        case '\f':
                            s += '\\f';
                            break;
                        case '\n':
                            s += '\\n';
                            break;
                        case '\r':
                            s += '\\r';
                            break;
                        case '\t':
                            s += '\\t';
                            break;
                        default:
                            c = c.charCodeAt();
                            s += '\\u00' + Math.floor(c/16).toString(16)+(c%16).toString(16);
                    }
                }
            }
            return s + '"';
        case 'boolean':
            return String(arg);
        default:
            return 'null';
        }
    },
    parse: function (text) {
        var at = 0;
        var ch = ' ';

        function error(m) {
            throw {
                name: 'JSONError',
                message: m,
                at: at - 1,
                text: text
            };
        }

        function next() {
            ch = text.charAt(at);
            at += 1;
            return ch;
        }

        function white() {
            while (ch != '' && ch <= ' ') {
                next();
            }
        }

        function str() {
            var i, s = '', t, u;

            if (ch == '"') {
		outer:	while (next()) {
                    if (ch == '"') {
                        next();
                        return s;
                    } else if (ch == '\\') {
                        switch (next()) {
                        case 'b':
                            s += '\b';
                            break;
                        case 'f':
                            s += '\f';
                            break;
                        case 'n':
                            s += '\n';
                            break;
                        case 'r':
                            s += '\r';
                            break;
                        case 't':
                            s += '\t';
                            break;
                        case 'u':
                            u = 0;
                            for (i = 0; i < 4; i += 1) {
                                t = parseInt(next(), 16);
                                if (!isFinite(t)) {
                                    break outer;
                                }
                                u = u * 16 + t;
                            }
                            s += String.fromCharCode(u);
                            break;
                        default:
                            s += ch;
                        }
                    } else {
                        s += ch;
                    }
                }
            }
            error("Bad string");
        }

        function arr() {
            var a = [];

            if (ch == '[') {
                next();
                white();
                if (ch == ']') {
                    next();
                    return a;
                }
                while (ch) {
                    a.push(val());
                    white();
                    if (ch == ']') {
                        next();
                        return a;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad array");
        }

        function obj() {
            var k, o = {};

            if (ch == '{') {
                next();
                white();
                if (ch == '}') {
                    next();
                    return o;
                }
                while (ch) {
                    k = str();
                    white();
                    if (ch != ':') {
                        break;
                    }
                    next();
                    o[k] = val();
                    white();
                    if (ch == '}') {
                        next();
                        return o;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad object");
        }

        function num() {
            var n = '', v;
            if (ch == '-') {
                n = '-';
                next();
            }
            while (ch >= '0' && ch <= '9') {
                n += ch;
                next();
            }
            if (ch == '.') {
                n += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    n += ch;
                }
            }
            if (ch == 'e' || ch == 'E') {
                n += 'e';
                next();
                if (ch == '-' || ch == '+') {
                    n += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    n += ch;
                    next();
                }
            }
            v = +n;
            if (!isFinite(v)) {
                error("Bad number");
            } else {
                return v;
            }
        }

        function word() {
            switch (ch) {
                case 't':
                    if (next() == 'r' && next() == 'u' && next() == 'e') {
                        next();
                        return true;
                    }
                    break;
                case 'f':
                    if (next() == 'a' && next() == 'l' && next() == 's' &&
                            next() == 'e') {
                        next();
                        return false;
                    }
                    break;
                case 'n':
                    if (next() == 'u' && next() == 'l' && next() == 'l') {
                        next();
                        return null;
                    }
                    break;
            }
            error("Syntax error");
        }

        function val() {
            white();
            switch (ch) {
                case '{':
                    return obj();
                case '[':
                    return arr();
                case '"':
                    return str();
                case '-':
                    return num();
                default:
                    return ch >= '0' && ch <= '9' ? num() : word();
            }
        }

        return val();
    }
};



//=================================================================
//=================================================================
//=================================================================
/** 清除数组中重复的元素 */
Array.prototype.Unique = function()
{
    var a = {}; for(var i=0; i<this.length; i++)
    {
        if(typeof a[this[i]] == "undefined")
        a[this[i]] = 1;
    }
    this.length = 0;
    for(var c in a) this[this.length] = c;
    return this;
}

String.prototype.URI = function()
{
    return encodeURIComponent(this);
}
Number.prototype.URI = function(){ return this; }
/********************************************/
String.prototype.stripTags = function() {
    return this.replace(/<\/?[^>]+>/gi, '');
}
String.prototype.toURL = function()
{
    return this.replace(/\s|\%|\&|\"|\'|\\/ig,'');
}
String.prototype.length2 = function(sigle)//sigle为真表示一个汉字按2个算，否则则按三个算
{
	var _$num = this.length;
    var _$arr = this.match(/[^\x00-\x80]/ig);
	if(_$arr!=null)_$num+= sigle?_$arr.length:_$arr.length*2;
	return _$num;
}
/** 去除前后的空格 */
String.prototype.trim = function()
{
   return this.replace(/(^\s+)|\s+$/g,"");
}
/** 去除前后的空格，包括全角 */
String.prototype.trim2 = function()
{
   return this.replace(/(^\s+)|\s+$|^　+|　+$/g,"");
}

String.prototype.right = function(n)
{
   return this.substr(this.length-n,this.length);
}

String.prototype.left = function(n)
{
   return this.substr(0,n);
}

String.prototype.left2 = function(n,m)
{
    var len = 0;
    var rs = ""; //截取的字符
    for(var i=0;len<n;i++)
    {
		if ((this.charCodeAt(i) >= 0) && (this.charCodeAt(i) <= 255))
		{
			len ++;
		}
		else
		{
			len +=(m==2?2:3);
		}
		if (len<=n) rs += this.substr(i,1);
		else break;
    }
	if (rs.length2()>n) rs = rs.substr(0,i-2);
    return rs;
}

String.prototype.widthTrim = function(n,m)
{
	if (n>=this.length+2) return this;
	return this.substr(0,n)+'...';
	//*****
    var len = 0;
    var rs = ""; //截取的字符
    for(var i=0;len<n;i++)
    {
		if ((this.charCodeAt(i) >= 0) && (this.charCodeAt(i) <= 255))
		{
			if (m==2) len +=0.5;
			else len ++;
		}
		else
		{
			len +=2;
		}
		if (len<=n) rs += this.substr(i,1);
		else break;
    }
	if (rs.length<this.length) rs +='...';
    return rs;
}

/** 一般应用于 conten_VAL.toHTML() */
String.prototype.toHTML = function(onerow)
{
    var temp = this.replace(/&/g,"&amp;").replace(/\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/ /g,"&nbsp;").replace(/\n/g,onerow==2?'<br>':'').replace(/\s|\t/g,onerow==2?' ':'');
    return temp;
}
String.prototype.toText = function()
{
    var a = this.stripTags();
    var b = document.createElement("DIV");
    b.innerHTML = a;
    return b.innerText.trim2();
}
String.prototype.toValue = function()
{
    return this.replace(/&/g,"&#38;").replace(/\"/g,"&#34;").replace(/\'/g,'&#39;').replace(/</g,"&#60;").replace(/>/g,"&#62;").replace(/\t/g,"　").replace(/\n/g,'');
}
String.prototype.toTextareaValue = function()
{
    return this.replace(/&/g,"&#38;").replace(/\"/g,"&#34;").replace(/\'/g,'&#39;').replace(/</g,"&#60;").replace(/>/g,"&#62;").replace(/\t/g,"　");
}
String.prototype.toTitle = function()
{
    return this.replace(/&/g,'&#38;').replace(/\"/g,'&#34;').replace(/\'/g,'&#39;').replace(/</g,"&#60;").replace(/>/g,"&#62;").replace(/\n/ig,'&#10;');
}
String.prototype.toTitle2 = function()
{
    return this.replace(/\'/g,'&#39;').replace(/\"/g,'&#34;').replace(/&/g,'&#38;');
}
/**================================================================**/

T.GetRand = function(_$onlyNum)
{
    return String(Math.random()).replace('0.','');
}

T.SetElemProgidAlpha = function(o, n)
{
if (!n) n=70;
o.style.filter="Alpha(opacity="+n+")";
o.style.MozOpacity=n/100;
}

T.LoadDeferImg = function(_$defer_time, _$element, _$defer_src)
{
	_$defer_src     = _$defer_src || "defer_src";
    _$element       = _$element || window.document.body;
	if (_$defer_time <0 || _$defer_time==undefined || _$defer_time== null || _$defer_time==='')
    {
        _$defer_time = 50;
    }
	window.setTimeout(function(){T._$LoadDeferImg(_$defer_time,_$element,_$defer_src)},_$defer_time);
}

T._$LoadDeferImg = function(_$defer_time,_$element, _$defer_src)
{
	var _$mainImg = {};
	var _$allImg = _$element.getElementsByTagName('IMG');
	for (var i=0; i<_$allImg.length; i++)
	{
		var _src = _$allImg[i].getAttribute(_$defer_src);
		if (!_src) continue;

		if (window.HTMLElement) //因为非 IE 不存在图片反复加载BUG，所以此处跳过
		{
			_$allImg[i].src = _src;
			continue;
		}

		//以下代码为 IE 的实现
		var _$newimg = new Image();
        _$newimg.src = _src;
        if(_$newimg.fileSize>-1)
        {
            _$allImg[i].src = _$allImg[i].getAttribute(_$defer_src);
            continue;
        }

        if (_$mainImg[_src])
		{
			if (_$allImg[i].style.visibility != 'hidden')
			{
				_$allImg[i].style.visibility = 'hidden';
			}
			_$mainImg[_src].linkImg.push(_$allImg[i]);
		}
		else
		{
			_$mainImg[_src] = _$allImg[i];
			_$mainImg[_src].linkImg = [];

			_$allImg[i].onload = function()
            {
                var evtsrc = window.event.srcElement;
                var _src = evtsrc.getAttribute(_$defer_src);
                window.setTimeout(
                    function(){
                        for (var j=0; j<_$mainImg[_src].linkImg.length; j++)
                        {
                            _$mainImg[_src].linkImg[j].src = _src;
                            _$mainImg[_src].linkImg[j].style.visibility = 'inherit';
                        }
			        },_$defer_time);
            }
		}
	}//for (var i=0; i<allImg.length; i++) ==> END
    window.setTimeout(function(){
	    for (c in _$mainImg) { _$mainImg[c].src = c; }},_$defer_time/5);
}

/**===============================================================**/
/**===============================================================**/
T.emptyResultTimer = null;

T.lastHideFrame = "";

T.PostData2 = function(_$action,_$data,_$successEvent,_$failEvent,_$errorEvent,_$backParam)
{
	if(typeof _$failEvent=='object'){_$backParam=_$failEvent;_$failEvent=''}
	else if(typeof _$errorEvent=='object'){_$backParam=_$errorEvent;_$errorEvent=''}
	if(typeof _$backParam=='object'){
		if (T.isIE)_$backParam="'"+JSON.stringify(_$backParam).replace(/\"/g,'&#34;').replace(/\'/g,'&#39;')+"'";
	}

	var _$channel=0;
	if (typeof(_$action)!='string')
	{
		_$channel =  _$action[0];
		_$action = _$action[1];
		//if (_$channel>99999) {alert('通道号过大');return}
	}
	if (_$channel==0)_$channel=T.GetRand(true);

    function toHTML2(str)
    {
        return str.replace(/&/g,"&#38;").replace(/\"/g,"&#34;").replace(/\'/g,'&#39;').replace(/</g,"&#60;").replace(/>/g,"&#62;");
    }

	var path=location.href.replace('http://','').replace(/\/.*/,'');

    var _$form = document.createElement("FORM");
        _$form.action = _$action;
        _$form.method = "post";
        _$form.target = 'TDOM_IframeChannel_'+_$channel+'_'+path;

    var _$innerHTML = "";
    if (_$data.constructor==Array)
    {
        for (var i=0;i<_$data.length;i++)
        {
			var _$pos = _$data[i].indexOf('=');
            if (_$pos>0)
            {
				var _$name = _$data[i].substr(0,_$pos);
                var _$val = _$data[i].substr(_$pos+1);
				_$innerHTML += "<input type='hidden' name='"+_$name+"' value='"+toHTML2(_$val)+"'>";
			}
        }
    }
    else if (_$data.constructor==Object)
    {
        for (c in _$data)
        {
            var _$val = String(_$data[c]);
            _$innerHTML += "<input type='hidden' name='"+c+"' value='"+toHTML2(_$val)+"'>";
        }
    }
    else if (_$data.constructor==String)
    {
        var _$params = _$data.split("&");
        for (var i=0;i<_$params.length;i++)
        {
            var _$pos = _$params[i].indexOf('=');
            var _$name = _$params[i].substr(0,_$pos);
            var _$val = decodeURIComponent(_$params[i].substr(_$pos+1));
            _$innerHTML += "<input type='hidden' name='"+_$name+"' value='"+toHTML2(_$val)+"'>";
        }
    }

    _$form.innerHTML = _$innerHTML;

    document.body.appendChild(_$form);
    T.CreateHideFrame2(_$successEvent,_$failEvent,_$errorEvent,_$channel,_$backParam);

    _$form.submit();

    try{
        if (event && event.srcElement)
        {
            //if (LoadingWaitor) LoadingWaitor.swapNode(lastEvtElm);

            lastEvtElm = event.srcElement;
            //if (LoadingWaitor) LoadingWaitor.removeNode(true);

            LoadingWaitor = document.createElement("IMG");
            LoadingWaitor.src = "http://q1.city.qq.com/images/Spinner.gif";
            LoadingWaitor.swapNode(lastEvtElm);
        }
    }catch(e){}
}


var LoadingWaitor,lastEvtElm;


T.CreateHideFrame2 = function(_$successEvent,_$failEvent,_$errorEvent,_$channel,_$backParam)
{
    if (_$channel.length<=5)//注意。开发人员指定的通道id值正整数必须不大于9999
    {
        var a = T.$('TDOM_IframeChannel_'+_$channel);
        if (a) {a.removeNode(true)};
    }

	var path=location.href.replace('http://','').replace(/\/.*/,'');

	if (!T.isIE)
	{
		var a = document.createElement('IFRAME');
		//a.setAttribute('ID',_$frameName);
		//a.setAttribute('NAME','TDOM_IframeChannel_'+_$channel+'_'+window.location.hostname);

		a.setAttribute('NAME','TDOM_IframeChannel_'+_$channel+'_'+path);

		a.style.display='none';
		document.body.appendChild(a);
		a.onload = function(){T.OnPostData2Load(this,_$successEvent,_$failEvent,_$errorEvent,_$backParam)};
		//a.unonload = function(){a.onload=function(){}};
	}
	else
	{
		for (var i=0;i<arguments.length-1;i++)
		{
			if (typeof(arguments[i])=='function'){arguments[i] = T.GetFunction(arguments[i]) }
			else if(arguments[i]=='' || arguments[i]==undefined || arguments[i]==null || typeof(arguments[i])=='string'){}
			//else if(typeof(arguments[i])!='object'){alert("T.CreateHideFrame2 入参不正确"); return }
		}
		var _$es = [];
		_$es.push(_$successEvent || "''");
		_$es.push(_$failEvent || "''");
		_$es.push(_$errorEvent || "''");
		_$es.push(_$backParam || "''");
		var _$onload = "T.OnPostData2Load(this,"+_$es.join()+")";

		var h = '<iframe name="TDOM_IframeChannel_'+_$channel+'_'+path+'"';;
		if (_$channel) h += ' id="TDOM_IframeChannel_'+_$channel+'"';
		h += ' style="display:none" onload="'+_$onload+'"><\/iframe>';

		var a = document.createElement("iframe");
		document.body.appendChild(a);
		a.outerHTML = h;
	}
}

//传递
//T.AbortChannel([10,100])
T.AbortChannel = function(chans)
{
	if (arguments.length==0)
	{
		var iframes = document.body.getElementsByTagName('IFRAME');
		for (var i=iframes.length;i>0;i--)
		{
			if (iframes[i-1].getAttribute("id").indexOf('TDOM_IframeChannel_')>-1)
			{
				T.RemoveIFrame(iframes[i-1]);
			}
		}
		return;
	}
	for (var i=chans.length;i>0;i--)
	{
		var iframe = T.$('TDOM_IframeChannel_'+chan[i-1]);
		T.RemoveIFrame(iframe);
	}
}

T.OnPostData2Load = function(iframeObj ,_$successEvent ,_$failEvent ,_$errorEvent ,_$backParam)
{
	_$backParam=JSON.parse(_$backParam||"{}");

    if (LoadingWaitor)
    {
		try{
			LoadingWaitor.swapNode(lastEvtElm);
			LoadingWaitor = "";
		}catch(e){}
    }
	window.setTimeout(function(){T.RemoveIFrame(iframeObj)},50);
	var RESULT;
	if (!T.isIE && iframeObj.src=='about:blank') return;

		try{ //当主页面设定了domument.domain时，子页面加载过程中没有完成时加载出错
			RESULT = iframeObj.contentWindow.name;
		}catch(e){return}

		if(!RESULT||RESULT==iframeObj.name) return;//一般发生在通道被释放时

		RESULT = RESULT.replace(/\r\n/g,'\\r\\n');

		eval("RESULT="+RESULT);

		T.UpdateLastTime();

        if(!RESULT){if(_$errorEvent)_$errorEvent();return}


    var r=Number(RESULT.sys_param.ret_code);
	if(r==0&&_$successEvent)_$successEvent(RESULT,_$backParam);
	else if(r!=0&&_$failEvent)_$failEvent(RESULT,_$backParam);
    else if(!T.PrepResult(RESULT,true)){ return }
    else alert("操作成功")
}


T.AfterFormSubmit = function(_$frameName)
{
    T.UpdateLastTime();
    T.RemoveHideFrame(_$frameName);
}


T.GetFunction = function(_$function)
{
    var _$functionStr = String(_$function);
	_$functionStr = _$functionStr.replace(/\/\*(.+)*\*\//,' ');
    return _$functionStr.replace(/^function\s*\n*(\w+)\(/,'function(').replace(/\"/g,'&#34;').replace(/\'/g,'&#39;');
}

var _$loadDataCharset='utf-8';
T.SetLoadDataCharset = function(c){
	if(!c)return;
	c=c.toLowerCase();
	if(c=='gb2312'||c=='utf-8')_$loadDataCharset=c;
}

//此函数内部的引号(' ")方式不能轻易变更
//当_$url传递数组形式的时候，第一个参数表示通道号，应小于10000
//T.LoadData2([10,url][,...])
T.LoadData2=function(_$url,_$successEvent,_$failEvent,_$errorEvent,_$backParam)
{
	window.setTimeout(function(){T.TryHideLoader(1)},8000);
	if(typeof _$failEvent=='object'){_$backParam=_$failEvent;_$failEvent=''}
	else if(typeof _$errorEvent=='object'){_$backParam=_$errorEvent;_$errorEvent=''}
	if(typeof _$backParam=='object'){
		if (T.isIE)_$backParam="'"+JSON.stringify(_$backParam).replace(/\"/g,'&#34;').replace(/\'/g,'&#39;')+"'";
	}

	T.PrepShowLoader();
	var _$channel=0;
	if (typeof(_$url)!='string')
	{
		_$channel =  _$url[0];
		//if (_$channel>9999) {alert('通道号过大');return}
		_$url = _$url[1];
		var a = T.$('TDOM_IframeChannel_'+_$channel);

		if (a) {T.RemoveIFrame(a);T.TryHideLoader(true)};
	}
	if (_$channel==0) _$channel= T.GetRand(true);

	if (T.isIE)
	{
		for (var i=1;i<arguments.length;i++)
		{
			if (typeof(arguments[i])=='function'){arguments[i] = T.GetFunction(arguments[i]) }
			else if(_$backParam){}
			else if(arguments[i]=='' || arguments[i]==undefined || arguments[i]==null || typeof(arguments[i])=='string'){}
			else {alert("T.LoadData2 入参不正确"); return }
		}
		var _$es = [];

		_$es.push(_$successEvent || "''");
		_$es.push(_$failEvent || "''");
		_$es.push(_$errorEvent || "''");
		_$es.push(_$backParam || "''");
		var _$onload = "T.OnLoadData2Load(this,"+_$es.join()+")";
	}

	//****美丽的分割线

		T.lastTime=new Date();
	var sciptsrc = "javascript:document.write('<script>try{var a=parent.document.body}catch(e){document.domain=";

	sciptsrc += T.isIE?"\\&#39;qq.com\\&#39;":'"qq.com"'; //此处引号的方式不能轻易变更

	sciptsrc += "}finally{};";
	sciptsrc += T.debugMode?"":"window.onerror=function(e){return true}";
	sciptsrc += "<\/script><script charset="+_$loadDataCharset+" src="+_$url+"><\/script>');document.close()";
	if (!T.isIE)
	{
		var a = document.createElement('IFRAME');
		if (_$channel) a.setAttribute('ID','TDOM_IframeChannel_'+_$channel);
		a.style.display='none';
		document.body.appendChild(a);
		a.onload = function(){T.OnLoadData2Load(this,_$successEvent ,_$failEvent ,_$errorEvent,_$backParam)};
		a.src = sciptsrc;
	}
	else
	{
		var a = document.createElement('iframe');
		document.body.appendChild(a);

		var h = '<iframe';
		if (_$channel) h += ' id="TDOM_IframeChannel_'+_$channel+'"';
		h +=' style="display:none" onerror="" onload="'+_$onload+'" src="'+sciptsrc+'"><\/iframe>';

		a.outerHTML = h;

	}
}
T.lastTime='';

T.PreCreateLoadChannel=function()
{
	var a = document.createElement('iframe');
		document.body.appendChild(a);
		T.lastTime=new Date();
		var h = '<iframe id="TDOM_IframeChannel_1" src="blank.htm"><\/iframe>';
		a.outerHTML = h;
}

T.OnLoadData2Load=function(iframeObj,_$successEvent,_$failEvent,_$errorEvent,_$backParam)
{
	_$backParam=JSON.parse(_$backParam||"{}");

	T.TryHideLoader(true);

	var RESULT;
	if (!T.isIE && iframeObj.src=='about:blank') return;

	window.setTimeout(function(){T.RemoveIFrame(iframeObj)},50);

    try{
        RESULT = iframeObj.contentWindow.RESULT;
		if(!RESULT){if(_$errorEvent)_$errorEvent(_$backParam);return}
    }catch(e){
        if(_$errorEvent)_$errorEvent(_$backParam);return
	}finally{}

    var r=Number(RESULT.sys_param.ret_code);
	if(r==0&&_$successEvent)_$successEvent(RESULT,_$backParam);
	else if(r!=0&&_$failEvent)_$failEvent(RESULT,_$backParam);
	else T.PrepResult(RESULT,true);
}


T.RemoveIFrame = function(obj)
{
	if (!obj) return;
	var st = obj.readyState;
	if (st=='interactive'||st=='loading') T.TryHideLoader(true);
	obj.src='about:blank';

	if (T.isIE)obj.removeNode(true)
	else window.setTimeout(function(){obj.removeNode(true)},200);
}

T.RemoveHideFrame = function(_$frameName)
{
    T.lastHideFrame = "";
	if (!T.isIE)window[_$frameName].location.replace('about:blank');
    try{document.getElementById(_$frameName).removeNode(true);}catch(e){}finally{}
}
//=================================================================
T.UpdateLastTime = function()
{
var a = String(new Date().getTime()).substr(0,10);
T.SetCookie('gLT', a, new Date(new Date().getTime()+1000*60*30), '/','qq.com');
return a;
}

T.GetLastTime = function()
{
    var a = T.GetCookie("gLT");
    if (a) return a;
    else return T.UpdateLastTime();
}

//=================================================================
T.SetCookie = function(name, value)
{
var argv = arguments;
var argc = arguments.length;
var expires = (argc > 2) ? argv[2] : null;
var path = (argc > 3) ? argv[3] : "/";
var domain = (argc > 4) ? argv[4] : "qq.com";
var secure = (argc > 5) ? argv[5] : false;
try
{
document.cookie = name + "=" + escape (value) +
((expires == null) ? "": ("; expires=" + expires.toGMTString())) +
((path == null) ? "" : ("; path=" + path)) +
((domain == null) ? "" : ("; domain=" + domain)) +
((secure == true) ? "; secure" : "");
}
catch(e){alert("请启用 Cookie 功能");return "";}finally{}
}

T.GetCookie = function(name)
{
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return _$Private_getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;

    function _$Private_getCookieVal(offset)
    {
        var endstr;
        try
        {
            endstr = document.cookie.indexOf (";", offset);
            if (endstr == -1) endstr = document.cookie.length;
            return unescape(document.cookie.substring(offset, endstr));
        }
        catch(e){ alert("请启用 Cookie 功能");return ""; }finally{}
    }
}



var RESULT = {};


T.LoadData = function(_$url ,_$successEvent ,_$failEvent ,_$resultName)
{
	window.setTimeout(function(){T.TryHideLoader(1)},8000);

    var lt = T.GetLastTime();
	if (!_$resultName)_$resultName='';

	var _$channel=0;
	if (typeof(_$url)!='string'&&_$url.constructor==Array)
	{
		_$channel =  _$url[0];
		_$url = _$url[1];
	}
	if (_$channel==0) _$channel= T.GetRand(true);

	T.LoadJS([_$channel,_$url],[_$successEvent,_$failEvent],lt,_$resultName);
}


T.LoadJS = function(_, _$callback, _$param, _$resultName)//callback在是数组的话表示是LoadData调用的多个回调
{
	T.PrepShowLoader();
    var _$imgcacheBase = '/';
	var _$channel;

    var _$resultName = "";

    if (_.constructor==Array && _[1])
    {
        _$channel = _[0];
	    _ = _[1];
    }
    if (_.indexOf('http://')==-1) _ = _$imgcacheBase+_.replace(/^\//,'');

    if (_$param || _$resultName)
    {
	    if (_.indexOf("?")>-1) _ += "&";
	    else _ += "?";
        _ += _$param;
        if (_$resultName) _ += "&Gjsname="+_$resultName;
    }
	_ = _.replace('?&','?');

    var h = document.getElementsByTagName("head")[0];
    var s = document.createElement("script");
    s.language = "javascript";
    s.type = "text/javascript";
	s.charset = _$loadDataCharset; //utf-8
	if(_$channel)s.id = 'TDOM_ScriptChannel_'+_$channel;

	if(T._$srcScriptState[_]=='loading'){window.status='正在请求('+String(new Date().getTime()).right(5)+'): '+_;window.setTimeout(function(){window.status=''},3000);return}
    T._$srcScriptState[_] = 'loading';

    if (T.isIE)
    {
        s.src = "";
        h.appendChild(s);
        window.setTimeout(function(){s.src = _; TryCallBack()},0);
    }
    else
    {
        s.src = _;
        h.appendChild(s);
        TryCallBack();
    }

    function TryCallBack()
    {
        if (T.isIE)
        {
            s.onreadystatechange = function()
            {
                if (s.readyState=="loaded" || s.readyState=="complete") //for IE)
                {
                    _$OnInnerJSLoaded();
                }
            }
        }
        else
        {
            s.onload = function(){ _$OnInnerJSLoaded(); } //for FireFox
        }
        s.onerror = function(){
				T.TryHideLoader(true);

				var errmsg="retcode:null,remark:'找不到ret_code'";
				T.ReportError(errmsg);
				window.setTimeout(function(){
					T._$srcScriptState[_] = 'loaded';
				},2000);
				T.ERROR.MSG(14);
				s.removeNode(true);
            }
    }

    function _$OnInnerJSLoaded()
    {
		T.TryHideLoader(true);
		s.removeNode(true);

		window.setTimeout(function(){
        T._$srcScriptState[_] = 'loaded';
		},1500);
        if (typeof(_$callback)=='function') { _$callback = _$callback; }
        else if (typeof(_$callback)=='string' && typeof(eval(_$callback))=='function')
             { _$callback = eval(_$callback); }
        else if (typeof(_$callback)=='object')//表示是LoadData
        {
			window.setTimeout(function(){
            T._$srcScriptState[_] = null;
			},1510);
            for (var i=0;i<_$callback.length;i++)
            {
                if (_$callback[i]){
                    if (typeof(_$callback[i])=='string') { _$callback[i] = eval(_$callback[i]) }
                    else if (typeof(_$callback[i])=='function') { }
                    else { alert('参数类型错误') }
                }
                else{ _$callback[i] = "" }
            }
        }
        else { _$callback = function(){} }

        var _$callbackResult;
        if (_$resultName)
        {
            _$callbackResult = eval(_$resultName);
        }
        else
        {
            _$callbackResult = RESULT;
        }

        if (typeof(_$callback)=='object')//LoadJS
        {
            var _$successEvent=_$callback[0], _$failEvent=_$callback[1];
            try{
                var _$ret_code = Number(_$callbackResult.sys_param.ret_code);
            }catch(e){
                var errmsg="retcode:null,remark:'找不到ret_code'";
                T.ReportError(errmsg);
                return;}
            if (_$ret_code>0)
            {
                if (Number(String(new Date().getTime()).substr(0,10))>Number(T.GetLastTime())+5)
                {
                    T.UpdateLastTime();
                }
            }

            if (_$ret_code!=0 && _$failEvent)
            {
                _$failEvent(_$callbackResult);
                return;
            }
            if (!T.PrepResult(_$callbackResult,true)){ return }
            else {
                if (_$successEvent){
                    _$successEvent(_$callbackResult)
                }else{alert("缺少回调函数")}
            }
        }
        else
        {
            _$callback(_$callbackResult);
        }
    }
}
//*****************************************************************
var loaderCounter=0 ,showLoaderTimer;
T.PrepShowLoader = function(n)
{
	loaderCounter++;
	if (!n || n<1000) n= 1000;
	window.clearTimeout(showLoaderTimer);
	showLoaderTimer = window.setTimeout(T.ShowLoader ,n);
}

T.ShowLoader = function()
{
    var a = T.$('DOM_waitState');
    if (a)
	{
		a.style.display='';
		a.style.top = document.body.scrollTop+"px";
	}
	else
    {
        var nd = document.createElement("DIV");
        document.body.appendChild(nd);

		_$style = "position:absolute;top:0px;right:0px;z-index:1000";
		nd.outerHTML = '<DIV id="DOM_waitState" style="'+_$style+'"><img src=\'http://q1.city.qq.com/images/waiter.gif\' width=16 height=16></DIV>';
    }
	window.attachEvent('onscroll',function(){
		var a = T.$('DOM_waitState');
		if (a && a.style.display=='') a.style.top = document.body.scrollTop+"px";
	});
}
T.TryHideLoader = function(reduce)
{
	if(reduce)loaderCounter--;
	if(loaderCounter>0)return;
	if(loaderCounter<0)loaderCounter=0;
	window.clearTimeout(showLoaderTimer);
	var a = T.$('DOM_waitState');
    if (a) a.style.display='none';
}

T._$srcScriptState = {}; //{'1.js':'loading','http://ww.qq.com/a.js':'loaded'}

T.SrcScriptState = function(_)
{
    if (T.isIE)
	{
		var scs = document.scripts;
		for (var i=0; i<scs.length; i++)
		{
            if (scs[i].src==_)
			{
			if (scs[i].readyState=='loaded' || scs[i].readyState=='complete') { return 'loaded'; }
			else if (scs[i].readyState=='loading') { return 'loading'; }
			}
		}
	}
    else
    {
        if (T._$srcScriptState[_]) { return T._$srcScriptState[_]; }
    }
    return null; //return undefuned
}


T.LoadCSS=function(_,_$timeout)
{
	_$timeout=_$timeout||50;
	var h=document.getElementsByTagName("head")[0];
    var c = document.createElement("link");
    c.rel = "stylesheet";
    c.type = "text/css";
    c.href = "";
    h.appendChild(c);
	c.href = _;
}

T.OnSuccessEvent_Default = function(){}

T.OnErrorEvent_Default = function(_$jsData)
{
    if (!_$jsData) {T.ERROR.MSG(0); return;}
    var _$returnCode = Number(_$jsData.sys_param.ret_code);
    if (T.ERROR.msg[_$returnCode]) T.ERROR.MSG(_$returnCode,_$jsData.sys_param.ret_msg);
    else T.ERROR.MSG(0);
}

T.PrepResult = function(_$jsData,_$force)
{
    try{
        if (_$force==true && !_$jsData){ alert("找不到数据");return false; }
    	else { _$jsData = _$jsData || eval("RESULT"); }
        var _$ret_code = Number(_$jsData.sys_param.ret_code);

        switch (_$ret_code)
        {
            case 0:
                return true;
            case 4011:
                    T.fireLogin_BackOnCancel = 0;
                    top.T.CreateLoginFrameWin();
                break;
            default:
                T.ERROR.MSG(_$ret_code,'',_$force);
                break;
        }
        return false;
    }catch (e){
        T.JSERROR.MSG(0,"T.PrepResult");
        return false;
    }finally{}
    return true;
}

T.CreateLoginFrameWin = function(appid,s_url)
{
T.LoadJS("http://q1.city.qq.com/js/fireLogin.js",function(){T.CreateLoginFrameWin(5000701)});
}

T.WriteJS = function(src)
{
document.write("<script src='"+src+"'><\/script>");
}

T.pingPGVTimer='';
T.PingPGV = function(t)
{
	//if(T.debugMode)return;
	window.clearTimeout(T.pingPGVTimer);
	if (!t) t=1500;
	if(typeof(pgvMain)=='function') T.pingPGVTimer=window.setTimeout(p,t);
	else
	{
		window.clearTimeout(T.pingPGVTimer);
		T.pingPGVTimer=window.setTimeout(function(){T.LoadJS('//mat1.gtimg.com/ping.js',p)},t);
	}

	function p()
	{
		window.clearTimeout(T.pingPGVTimer);
		pvRepeatCount = 1;
		try{
			var url=window.location.href;
			if(typeof(pgvMain)=='function')T.pingPGVTimer=window.setTimeout(pgvMain,400);
		}catch(e){}
	}
}

T.ResetAllXMP=function(){var a=document.getElementsByTagName('XMP');
for(var i=0; i<a.length; i++)T.RenderDOM(a[i],-1);}
T.TryRenderDOM=function(){}
T.GetRand=function(_$onlyNum){var r=String(Math.random()).replace('0.','');
if(_$onlyNum){return r}
return "r"+r;}
T.RenderDOM=function(_$tplDOM,_$data,_$renderType){if(typeof _$tplDOM=='string'){_$tplDOM=T.$(_$tplDOM);}
if(!_$tplDOM){return;}
if(_$renderType==0){_$tplDOM.outerHTML=T.TP.processDOMTemplate(_$tplDOM,_$data);
return;}
var _$C_prefix="__TPL_RENDERFROM_prefix_";
var _$tplDOMID=_$tplDOM.getAttribute("id");
if(!_$tplDOMID){_$tplDOMID="__RAND_ElEM_ID_"+T.GetRand(true);
_$tplDOM.setAttribute("id",_$tplDOMID);}
if(_$renderType!=2){try{
if(_$tplDOM.nextSibling&&_$tplDOM.nextSibling.getAttribute("ID")==_$C_prefix+_$tplDOMID){if(T.isIE){_$tplDOM.nextSibling.removeNode(true);}
else{var _$nextElem=document.getElementById(_$tplDOMID).nextSibling;
document.getElementById(_$tplDOMID).parentNode.removeChild(_$nextElem);}}}catch(e){}finally{}
try{
if(_$renderType==-1||String(_$data)=="-1")return;}catch(e){}}
var _$rendedHTML=T.TP.processDOMTemplate(_$tplDOMID,_$data);
if(_$tplDOM.insertAdjacentHTML){_$tplDOM.insertAdjacentHTML("afterEnd","<span id='"+_$C_prefix+_$tplDOMID+"'>"+_$rendedHTML+"</span>");}
else{_$rendedHTML=new String(_$rendedHTML).trim();
var _$fragment=_$tplDOM.ownerDocument.createElement('span');
_$fragment.setAttribute("id",_$C_prefix+_$tplDOMID);
_$fragment.innerHTML=_$rendedHTML;
_$tplDOM.parentNode.insertBefore(_$fragment,_$tplDOM.nextSibling);}}
T.TP={};
(function(){
if(T.TP==null)
T.TP=new Object();
if(T.TP.evalEx==null)
T.TP.evalEx=function(src){return eval(src);};
var UNDEFINED;
if(Array.prototype.pop==null)
Array.prototype.pop=function(){
if(this.length===0){return UNDEFINED;}
return this[--this.length];};
if(Array.prototype.push==null)
Array.prototype.push=function(){
for(var i=0; i<arguments.length;++i){this[this.length]=arguments[i];}
return this.length;};
T.TP.parseTemplate=function(tmplContent,optTmplName,optEtc){
if(optEtc==null)
optEtc=T.TP.parseTemplate_etc;
var funcSrc=parse(tmplContent,optTmplName,optEtc);
var func=T.TP.evalEx(funcSrc,optTmplName,1);
if(func!=null)
return new optEtc.Template(optTmplName,tmplContent,funcSrc,func,optEtc);
return null;}
try{
String.prototype.process=function(context,optFlags){
var template=T.TP.parseTemplate(this,null);
if(template!=null)
return template.process(context,optFlags);
return this;}}catch(e){}finally{}
T.TP.parseTemplate_etc={};
T.TP.parseTemplate_etc.statementTag="forelse|for|if|elseif|else|var|macro";
T.TP.parseTemplate_etc.statementDef={
"if"     :{delta:  1,prefix: "if(",suffix: "){",paramMin: 1},
"else"   :{delta:  0,prefix: "}else{"},
"elseif" :{delta:  0,prefix: "}else if(",suffix: "){",paramDefault: "true"},
"/if"    :{delta:-1,prefix: "}"},
"for"    :{delta:  1,paramMin: 3,
prefixFunc : function(stmtParts,state,tmplName,etc){
if(stmtParts[2]=="in"){
var iterVar=stmtParts[1];
if(stmtParts[4]=="to"){
var lbound=stmtParts[3];
var ubound=stmtParts[5];
var step=1;
if(stmtParts[6]=="by"){
step=stmtParts[7];}
var ret=[
"var ",iterVar,"_ct=0;",
"var ",iterVar,"_index=-1;",
"var __LENGTH_STACK__;",
"if(typeof(__LENGTH_STACK__)=='undefined'||!__LENGTH_STACK__.length)__LENGTH_STACK__=new Array();",
"__LENGTH_STACK__[__LENGTH_STACK__.length]=0;",// Push a new for-loop onto the stack of loop lengths.
"if((",step,">0&&",lbound,"<",ubound,")||(",step,"<0&&",lbound,">",ubound,")){",
"for(var ",iterVar,"=",lbound,"; ",
iterVar,(step<0 ? ">" : "<"),ubound,"; ",
iterVar,"+=",step,"){",
iterVar,"_ct++;",
iterVar,"_index++;",
"__LENGTH_STACK__[__LENGTH_STACK__.length-1]++;",
].join("");
return ret;}
else{
var listVar="__LIST__"+iterVar;
return["var ",listVar,"=",stmtParts[3],";",
"var __LENGTH_STACK__;",
"if(typeof(__LENGTH_STACK__)=='undefined'||!__LENGTH_STACK__.length)__LENGTH_STACK__=new Array();",
"__LENGTH_STACK__[__LENGTH_STACK__.length]=0;",// Push a new for-loop onto the stack of loop lengths.
"if((",listVar,")!=null){",
"var ",iterVar,"_ct=0;",// iterVar_ct variable,added by B. Bittman
"for(var ",iterVar,"_index in ",listVar,"){",
iterVar,"_ct++;",
"if(typeof(",listVar,"[",iterVar,"_index])=='function'){continue;}",// IE 5.x fix from Igor Poteryaev.
"__LENGTH_STACK__[__LENGTH_STACK__.length-1]++;",
"var ",iterVar,"=",listVar,"[",iterVar,"_index];"].join("");}}
else{
if(T.debugMode){throw new etc.ParseError(tmplName,state.line,"bad for loop statement: "+stmtParts.join(' '));}}}},
"forelse" :{delta:  0,prefix: "}}if(__LENGTH_STACK__[__LENGTH_STACK__.length-1]==0){if(",suffix: "){",paramDefault: "true"},
"/for"    :{delta:-1,prefix: "}}; delete __LENGTH_STACK__[__LENGTH_STACK__.length-1];"},// Remove the just-finished for-loop from the stack of loop lengths.
"var"     :{delta:  0,prefix: "var ",suffix: ";"},
"macro"   :{delta:  1,
prefixFunc : function(stmtParts,state,tmplName,etc){
var macroName=stmtParts[1].split('(')[0];
return["var ",macroName,"=function",
stmtParts.slice(1).join(' ').substring(macroName.length),
"{var _OUT_arr=[]; var _OUT={write: function(m){if(m)_OUT_arr.push(m);}}; "].join('');}},
"/macro"  :{delta:-1,prefix: " return _OUT_arr.join('');};"}}
T.TP.parseTemplate_etc.modifierDef={
"eat"        : function(v){return "";},
"escape"     : function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");},
"capitalize" : function(s){return String(s).toUpperCase();},
"default"    : function(s,d){return s!=null ? s : d;}}
T.TP.parseTemplate_etc.modifierDef.h=T.TP.parseTemplate_etc.modifierDef.escape;
T.TP.parseTemplate_etc.Template=function(tmplName,tmplContent,funcSrc,func,etc){
this.process=function(context,flags){
if(context==null)
context={};
if(context._MODIFIERS==null)
context._MODIFIERS={};
if(context.defined==null)
context.defined=function(str){return(context[str]!=undefined);};
for(var k in etc.modifierDef){
if(context._MODIFIERS[k]==null)
context._MODIFIERS[k]=etc.modifierDef[k];}
if(flags==null)
flags={};
var resultArr=[];
var resultOut={write: function(m){resultArr.push(m);}};
try{
func(resultOut,context,flags);}catch(e){
if(!T.debugMode)return;
if(flags.throwExceptions==true)
throw e;
var result=new String(resultArr.join("")+"[ERROR: "+e.toString()+(e.message ? '; '+e.message : '')+"]");
result["exception"]=e;
return result;}finally{}
return resultArr.join("");}
this.name=tmplName;
this.source=tmplContent;
this.sourceFunc=funcSrc;
this.toString=function(){return "T.TP.Template["+tmplName+"]";}}
T.TP.parseTemplate_etc.ParseError=function(name,line,message){
this.name=name;
this.line=line;
this.message=message;}
T.TP.parseTemplate_etc.ParseError.prototype.toString=function(){
return("T.TP template ParseError in "+this.name+": line "+this.line+","+this.message);}
var parse=function(body,tmplName,etc){
body=cleanWhiteSpace(body);
var funcText=["var T_TP_Template_TEMP=function(_OUT,_CONTEXT,_FLAGS){with(_CONTEXT){"];
var state={stack:[],line: 1};
var endStmtPrev=-1;
while(endStmtPrev+1<body.length){
var begStmt=endStmtPrev;
begStmt=body.indexOf("{",begStmt+1);
while(begStmt>=0){
var endStmt=body.indexOf('}',begStmt+1);
var stmt=body.substring(begStmt,endStmt);
var blockrx=stmt.match(/^\{(cdata|minify|eval)/);
if(blockrx){
var blockType=blockrx[1];
var blockMarkerBeg=begStmt+blockType.length+1;
var blockMarkerEnd=body.indexOf('}',blockMarkerBeg);
if(blockMarkerEnd>=0){
var blockMarker;
if(blockMarkerEnd-blockMarkerBeg<=0){
blockMarker="{/"+blockType+"}";}else{
blockMarker=body.substring(blockMarkerBeg+1,blockMarkerEnd);}
var blockEnd=body.indexOf(blockMarker,blockMarkerEnd+1);
if(blockEnd>=0){
emitSectionText(body.substring(endStmtPrev+1,begStmt),funcText);
var blockText=body.substring(blockMarkerEnd+1,blockEnd);
if(blockType=='cdata'){
emitText(blockText,funcText);}else if(blockType=='minify'){
emitText(scrubWhiteSpace(blockText),funcText);}else if(blockType=='eval'){
if(blockText!=null&&blockText.length>0)
funcText.push('_OUT.write((function(){'+blockText+'})());');}
begStmt=endStmtPrev=blockEnd+blockMarker.length-1;}}}else if(body.charAt(begStmt-1)!='$'&&// Not an expression or backslashed,
body.charAt(begStmt-1)!='\\'){
var offset=(body.charAt(begStmt+1)=='/' ? 2 : 1);
if(body.substring(begStmt+offset,begStmt+10+offset).search(T.TP.parseTemplate_etc.statementTag)==0)
break;}
begStmt=body.indexOf("{",begStmt+1);}
if(begStmt<0)
break;
var endStmt=body.indexOf("}",begStmt+1);
if(endStmt<0)
break;
emitSectionText(body.substring(endStmtPrev+1,begStmt),funcText);
emitStatement(body.substring(begStmt,endStmt+1),state,funcText,tmplName,etc);
endStmtPrev=endStmt;}
emitSectionText(body.substring(endStmtPrev+1),funcText);
if(state.stack.length!=0)
throw new etc.ParseError(tmplName,state.line,"unclosed,unmatched statement(s): "+state.stack.join(","));
funcText.push("}}; T_TP_Template_TEMP");
return funcText.join("");}
var emitStatement=function(stmtStr,state,funcText,tmplName,etc){
var parts=stmtStr.slice(1,-1).split(' ');
var stmt=etc.statementDef[parts[0]];
if(stmt==null){
emitSectionText(stmtStr,funcText);
return;}
if(stmt.delta<0){
if(state.stack.length<=0)
throw new etc.ParseError(tmplName,state.line,"close tag does not match any previous statement: "+stmtStr);
state.stack.pop();}
if(stmt.delta>0)
state.stack.push(stmtStr);
if(stmt.paramMin!=null&&
stmt.paramMin>=parts.length)
throw new etc.ParseError(tmplName,state.line,"statement needs more parameters: "+stmtStr);
if(stmt.prefixFunc!=null)
funcText.push(stmt.prefixFunc(parts,state,tmplName,etc));
else
funcText.push(stmt.prefix);
if(stmt.suffix!=null){
if(parts.length<=1){
if(stmt.paramDefault!=null)
funcText.push(stmt.paramDefault);}else{
for(var i=1; i<parts.length; i++){
if(i>1)
funcText.push(' ');
funcText.push(parts[i]);}}
funcText.push(stmt.suffix);}}
var emitSectionText=function(text,funcText){
if(text.length<=0)
return;
var nlPrefix=0;
var nlSuffix=text.length-1;
while(nlPrefix<text.length&&(text.charAt(nlPrefix)=='\n'))
nlPrefix++;
while(nlSuffix>=0&&(text.charAt(nlSuffix)==' '||text.charAt(nlSuffix)=='\t'))
nlSuffix--;
if(nlSuffix<nlPrefix)
nlSuffix=nlPrefix;
if(nlPrefix>0){
funcText.push('if(_FLAGS.keepWhitespace==true)_OUT.write("');
var s=text.substring(0,nlPrefix).replace('\n','\\n');
if(s.charAt(s.length-1)=='\n')
s=s.substring(0,s.length-1);
funcText.push(s);
funcText.push('");');}
var lines=text.substring(nlPrefix,nlSuffix+1).split('\n');
for(var i=0; i<lines.length; i++){
emitSectionTextLine(lines[i],funcText);
if(i<lines.length-1)
funcText.push('_OUT.write("\\n");\n');}
if(nlSuffix+1<text.length){
funcText.push('if(_FLAGS.keepWhitespace==true)_OUT.write("');
var s=text.substring(nlSuffix+1).replace('\n','\\n');
if(s.charAt(s.length-1)=='\n')
s=s.substring(0,s.length-1);
funcText.push(s);
funcText.push('");');}}
var emitSectionTextLine=function(line,funcText){
var endMarkPrev='}';
var endExprPrev=-1;
while(endExprPrev+endMarkPrev.length<line.length){
var begMark="${",endMark="}";
var begExpr=line.indexOf(begMark,endExprPrev+endMarkPrev.length);
if(begExpr<0)
break;
if(line.charAt(begExpr+2)=='%'){
begMark="${%";
endMark="%}";}
var endExpr=line.indexOf(endMark,begExpr+begMark.length);
if(endExpr<0)
break;
emitText(line.substring(endExprPrev+endMarkPrev.length,begExpr),funcText);
var exprArr=line.substring(begExpr+begMark.length,endExpr).replace(/\|\|/g,"#@@#").split('|');
for(var k in exprArr){
if(exprArr[k].replace&&k!="extend")
exprArr[k]=exprArr[k].replace(/#@@#/g,'||');}
funcText.push('_OUT.write(');
emitExpression(exprArr,exprArr.length-1,funcText);
funcText.push(');');
endExprPrev=endExpr;
endMarkPrev=endMark;}
emitText(line.substring(endExprPrev+endMarkPrev.length),funcText);}
var emitText=function(text,funcText){
if(text==null||
text.length<=0)
return;
text=text.replace(/\\/g,'\\\\');
text=text.replace(/\n/g,'\\n');
text=text.replace(/\"/g,'\\"');
funcText.push('_OUT.write("');
funcText.push(text);
funcText.push('");');}
var emitExpression=function(exprArr,index,funcText){
var expr=exprArr[index];
if(index<=0){
funcText.push(expr);
return;}
var parts=expr.split(':');
funcText.push('_MODIFIERS["');
funcText.push(parts[0]);
funcText.push('"](');
emitExpression(exprArr,index-1,funcText);
if(parts.length>1){
funcText.push(',');
funcText.push(parts[1]);}
funcText.push(')');}
var cleanWhiteSpace=function(result){
result=result.replace(/\t/g,"    ");
result=result.replace(/\r\n/g,"\n");
result=result.replace(/\n{1,}/g,"\n");
result=result.replace(/\r/g,"\n");
result=result.replace(/^(\s*\S*(\s+\S+)*)\s*$/,'$1');
return result;}
var scrubWhiteSpace=function(result){
result=result.replace(/^\s+/g,"");
result=result.replace(/\s+$/g,"");
result=result.replace(/\s+/g," ");
result=result.replace(/^(\s*\S*(\s+\S+)*)\s*$/,'$1');
return result;}
T.TP.parseDOMTemplate=function(element,optDocument,optEtc){
if(optDocument==null)
optDocument=document;
if(typeof element=='string'){element=optDocument.getElementById(element);}
var content=element.value;
if(content==null)
content=element.innerHTML;
content=content.replace(/&lt;/g,"<").replace(/&gt;/g,">");
return T.TP.parseTemplate(content,element,optEtc);}
T.TP.processDOMTemplate=function(element,context,optFlags,optDocument,optEtc){
return T.TP.parseDOMTemplate(element,optDocument,optEtc).process(context,optFlags);}})();


if (window.T){
T.Loginout = function(){
    if (T.$('D_loginHref').innerText=='登录') {
        T.CreateLoginFrameWin();
    }else{
        T.LoadData('http://c2.area.qq.com/common/logout.php?'+Math.random(),T.OnLoginOut);
    }
}

T.LoadUserInfo = function(){
    T.LoadData('http://c2.area.qq.com/common/systime.php?'+Math.random(),T.OnLoginIn);
}

T.CheckUserLogin = function(){
    var uin=T.GetUIN();
    if(uin > 10000){
        T.LoadData('http://c2.area.qq.com/common/systime.php',function(R){
            if(R.sys_param.uin>10000) T.OnLoginIn(R);
            if(T.$('D_loginHref')) T.$('D_loginHref').style.visibility='visible';
            T.Reflow();
        });
    }
}

T.OnLoginIn = function(R){
    if (R) UIN_RESULT= R;
    try{
        T.$('D_loginHref').innerText = '退出';
        if(!T.$('D_userNickSpan'))return;
        T.$('D_userNickSpan').innerHTML="欢迎您，"+UIN_RESULT.sys_param.unick.toHTML();
    }catch(e){}
    try{
        var a = top.T.AfterLoginRC;
        if (a){
            a = new Function(a);
            a();
        }
    }catch(e){}

    window.setTimeout(function(){top.T.AfterLoginRC = ""},850);
    if(window.OnLoginSuccess&&!top.T.AfterLoginRC)window.setTimeout(function(){OnLoginSuccess(R,'slow')},500);
}
T.AfterLoginRC = "";
T.OnLoginOut = function(){
    T.$('D_userNickSpan').innerHTML = "已退出，再见";
    window.setTimeout(function(){T.$('D_userNickSpan').innerText=''},1000);
    T.$('D_loginHref').innerText = '登录';
    if(window.OnLogoutSuccess)window.OnLogoutSuccess();
}
}

// verify
String.prototype.Trim = function() {
  var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
  return (m == null) ? "" : m[1];
}
String.prototype.isMobile = function() {
  return (/^(?:13\d|15[0-9])-?\d{5}(\d{3}|\*{3})$/.test(this.Trim()));
}
String.prototype.isTel = function() {
    if (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{1,}))?$/.test(this.Trim())) {
        return true;
    } else if (/^(400|800)-(\d{3})-(\d){4}$/.test(this.Trim())) {
        return true;
    }
    return false;
}
String.prototype.isUrl = function() {
    return (/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(this.Trim()));
}
String.prototype.isEmail = function() {
    return (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.Trim()));
}
String.prototype.isQQ = function() {
    return (/^(\d{5,10})$/.test(this.Trim()));
}
String.prototype.isNumeric = function() {
    return (/^(\d+)$/.test(this.Trim()));
}
String.prototype.isNormalStr = function() {
    return this.Trim().match(/^(\w|[\u4E00-\u9FA5])*$/);
}
/*  |xGv00|35dde162eac8d7df9efe1b6ac7d746ea */