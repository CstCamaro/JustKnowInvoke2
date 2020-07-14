!function(){"use strict";function t(t){t?(f[0]=f[16]=f[1]=f[2]=f[3]=f[4]=f[5]=f[6]=f[7]=f[8]=f[9]=f[10]=f[11]=f[12]=f[13]=f[14]=f[15]=0,this.blocks=f):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}var h="object"==typeof window?window:{},s=!h.JS_SHA1_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;s&&(h=global);var i=!h.JS_SHA1_NO_COMMON_JS&&"object"==typeof module&&module.exports,e="function"==typeof define&&define.amd,r="0123456789abcdef".split(""),o=[-2147483648,8388608,32768,128],n=[24,16,8,0],a=["hex","array","digest","arrayBuffer"],f=[],u=function(h){return function(s){return new t(!0).update(s)[h]()}},c=function(){var h=u("hex");s&&(h=p(h)),h.create=function(){return new t},h.update=function(t){return h.create().update(t)};for(var i=0;i<a.length;++i){var e=a[i];h[e]=u(e)}return h},p=function(t){var h=eval("require('crypto')"),s=eval("require('buffer').Buffer"),i=function(i){if("string"==typeof i)return h.createHash("sha1").update(i,"utf8").digest("hex");if(i.constructor===ArrayBuffer)i=new Uint8Array(i);else if(void 0===i.length)return t(i);return h.createHash("sha1").update(new s(i)).digest("hex")};return i};t.prototype.update=function(t){if(!this.finalized){var s="string"!=typeof t;s&&t.constructor===h.ArrayBuffer&&(t=new Uint8Array(t));for(var i,e,r=0,o=t.length||0,a=this.blocks;r<o;){if(this.hashed&&(this.hashed=!1,a[0]=this.block,a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),s)for(e=this.start;r<o&&e<64;++r)a[e>>2]|=t[r]<<n[3&e++];else for(e=this.start;r<o&&e<64;++r)(i=t.charCodeAt(r))<128?a[e>>2]|=i<<n[3&e++]:i<2048?(a[e>>2]|=(192|i>>6)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):i<55296||i>=57344?(a[e>>2]|=(224|i>>12)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++r)),a[e>>2]|=(240|i>>18)<<n[3&e++],a[e>>2]|=(128|i>>12&63)<<n[3&e++],a[e>>2]|=(128|i>>6&63)<<n[3&e++],a[e>>2]|=(128|63&i)<<n[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,e>=64?(this.block=a[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,h=this.lastByteIndex;t[16]=this.block,t[h>>2]|=o[3&h],this.block=t[16],h>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,h,s=this.h0,i=this.h1,e=this.h2,r=this.h3,o=this.h4,n=this.blocks;for(t=16;t<80;++t)h=n[t-3]^n[t-8]^n[t-14]^n[t-16],n[t]=h<<1|h>>>31;for(t=0;t<20;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i&e|~i&r)+o+1518500249+n[t]<<0)<<5|o>>>27)+(s&(i=i<<30|i>>>2)|~s&e)+r+1518500249+n[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|~o&i)+e+1518500249+n[t+2]<<0)<<5|e>>>27)+(r&(o=o<<30|o>>>2)|~r&s)+i+1518500249+n[t+3]<<0)<<5|i>>>27)+(e&(r=r<<30|r>>>2)|~e&o)+s+1518500249+n[t+4]<<0,e=e<<30|e>>>2;for(;t<40;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i^e^r)+o+1859775393+n[t]<<0)<<5|o>>>27)+(s^(i=i<<30|i>>>2)^e)+r+1859775393+n[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^i)+e+1859775393+n[t+2]<<0)<<5|e>>>27)+(r^(o=o<<30|o>>>2)^s)+i+1859775393+n[t+3]<<0)<<5|i>>>27)+(e^(r=r<<30|r>>>2)^o)+s+1859775393+n[t+4]<<0,e=e<<30|e>>>2;for(;t<60;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i&e|i&r|e&r)+o-1894007588+n[t]<<0)<<5|o>>>27)+(s&(i=i<<30|i>>>2)|s&e|i&e)+r-1894007588+n[t+1]<<0)<<5|r>>>27)+(o&(s=s<<30|s>>>2)|o&i|s&i)+e-1894007588+n[t+2]<<0)<<5|e>>>27)+(r&(o=o<<30|o>>>2)|r&s|o&s)+i-1894007588+n[t+3]<<0)<<5|i>>>27)+(e&(r=r<<30|r>>>2)|e&o|r&o)+s-1894007588+n[t+4]<<0,e=e<<30|e>>>2;for(;t<80;t+=5)s=(h=(i=(h=(e=(h=(r=(h=(o=(h=s<<5|s>>>27)+(i^e^r)+o-899497514+n[t]<<0)<<5|o>>>27)+(s^(i=i<<30|i>>>2)^e)+r-899497514+n[t+1]<<0)<<5|r>>>27)+(o^(s=s<<30|s>>>2)^i)+e-899497514+n[t+2]<<0)<<5|e>>>27)+(r^(o=o<<30|o>>>2)^s)+i-899497514+n[t+3]<<0)<<5|i>>>27)+(e^(r=r<<30|r>>>2)^o)+s-899497514+n[t+4]<<0,e=e<<30|e>>>2;this.h0=this.h0+s<<0,this.h1=this.h1+i<<0,this.h2=this.h2+e<<0,this.h3=this.h3+r<<0,this.h4=this.h4+o<<0},t.prototype.hex=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return r[t>>28&15]+r[t>>24&15]+r[t>>20&15]+r[t>>16&15]+r[t>>12&15]+r[t>>8&15]+r[t>>4&15]+r[15&t]+r[h>>28&15]+r[h>>24&15]+r[h>>20&15]+r[h>>16&15]+r[h>>12&15]+r[h>>8&15]+r[h>>4&15]+r[15&h]+r[s>>28&15]+r[s>>24&15]+r[s>>20&15]+r[s>>16&15]+r[s>>12&15]+r[s>>8&15]+r[s>>4&15]+r[15&s]+r[i>>28&15]+r[i>>24&15]+r[i>>20&15]+r[i>>16&15]+r[i>>12&15]+r[i>>8&15]+r[i>>4&15]+r[15&i]+r[e>>28&15]+r[e>>24&15]+r[e>>20&15]+r[e>>16&15]+r[e>>12&15]+r[e>>8&15]+r[e>>4&15]+r[15&e]},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,h=this.h1,s=this.h2,i=this.h3,e=this.h4;return[t>>24&255,t>>16&255,t>>8&255,255&t,h>>24&255,h>>16&255,h>>8&255,255&h,s>>24&255,s>>16&255,s>>8&255,255&s,i>>24&255,i>>16&255,i>>8&255,255&i,e>>24&255,e>>16&255,e>>8&255,255&e]},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(20),h=new DataView(t);return h.setUint32(0,this.h0),h.setUint32(4,this.h1),h.setUint32(8,this.h2),h.setUint32(12,this.h3),h.setUint32(16,this.h4),t};var y=c();i?module.exports=y:(h.sha1=y,e&&define(function(){return y}))}();/*  |xGv00|52cc8a1046b1ef849500c4e64f328330 */
function getBtraceUrl(param) {
    var url = '//btrace.qq.com/kvcollect?BossId=7991&Pwd=733793333&sBiz=pc_search';
    var tempParam = '',
        tempArr = [];
    try {
        for (var key in param) {
            tempArr.push(key + '=' + param[key])
        }
    } catch (err) {
        console.log('param参数有问题，请检查。' + err);
    }
    tempParam = tempArr.join("&");
    // console.log('tempParam',tempParam)
    if (tempParam) {
        return url + '&' + tempParam + '&' + Math.random();
    } else {
        return url;
    }
}

function btraceDo(param) {
    var iurl = getBtraceUrl(param);
    var gImage = new Image(1, 1);
    gImage.src = iurl;
}



/*===============================auto.dev.js=================================*/
/*
 * jQuery Cookie Plugin v1.3.1
 */
/*===============================auto.dev.js=================================*/
; (function (e, f, b) { var d = /\+/g; function g(j) { return j } function h(j) { return c(unescape(j.replace(d, " "))) } function c(j) { if (j.indexOf('"') === 0) { j = j.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\") } return j } function i(j) { return a.json ? JSON.parse(j) : j } var a = e.cookie = function (r, q, w) { if (q !== b) { w = e.extend({}, a.defaults, w); if (q === null) { w.expires = -1 } if (typeof w.expires === "number") { var s = w.expires, v = w.expires = new Date(); v.setDate(v.getDate() + s) } q = a.json ? JSON.stringify(q) : String(q); return (f.cookie = [escape(r), "=", a.raw ? q : escape(q), w.expires ? "; expires=" + w.expires.toUTCString() : "", w.path ? "; path=" + w.path : "", w.domain ? "; domain=" + w.domain : "", w.secure ? "; secure" : ""].join("")) } var j = a.raw ? g : h; var u = f.cookie.split("; "); var x = r ? null : {}; for (var p = 0, n = u.length; p < n; p++) { var o = u[p].split("="); var k = j(o.shift()); var m = j(o.join("=")); if (r && r === k) { x = i(m); break } if (!r) { x[k] = i(m) } } return x }; a.defaults = {}; e.removeCookie = function (k, j) { if (e.cookie(k) !== null) { e.cookie(k, null, j); return true } return false } })(jQuery, document);

; (function ($) {
    document.domain = 'qq.com';
    var doc = document, port = '', win = window, _loc = location;
    //公共部分
    // 模拟commonJS require
    var require = function (module) {
        var exports = {};
        module = require.modules[module] || undefined;
        typeof module == 'function' && module.call(exports, exports);
        return exports;
    }
    require.modules = {};
    require.registar = function (module, fn) {
        module && fn && (require.modules[module] = fn);
    };
    // 浏览器判断
    var userAgent = navigator.userAgent.toString().toLowerCase();
    $.browser = {
        tt: /tencenttraveler|qqbrowser/i.test(userAgent),
        ie6: !-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent),
        ie7: /msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (document.documentMode == 7),
        ie8: /msie.[8]\.0/i.test(userAgent) || (document.documentMode == 8),
        ie67: ((!-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent)) || (/msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (document.documentMode == 7))),
        ie78: /msie.[7|8]\.0/i.test(userAgent),
        ie678: !$.support.leadingWhitespace,
        ie9: /msie.[7|9]\.0/i.test(userAgent) && /mozilla\/[4|5]\.0/i.test(userAgent) && /trident\/5\.0/i.test(userAgent) || (document.documentMode == 9),
        safari: /webkit/i.test(userAgent),
        chrome: /chrome/i.test(userAgent) && /mozilla/i.test(userAgent),
        msie: /msie/i.test(userAgent) && !/opera/.test(userAgent),
        ff: /.*(firefox)\/([\w.]+).*/i.test(userAgent)
    };
    // 事件停止响应
    $.stopEvent = function (event) {
        if (event) {
            (event && event.stopPropagation) ? event.stopPropagation() : (event.cancelBubble = true);
            (event && event.preventDefault) ? event.preventDefault() : (event.returnValue = false);
        }
    }
    // 事件订阅
    var eventSubscribeBox = {};
    function eventSubscribe(type, fn) {
        eventSubscribeBox[type] = eventSubscribeBox[type] || [];
        eventSubscribeBox[type].push(fn);
    }
    function eventSpeaker(type, evt) {
        var box = eventSubscribeBox[type];
        if (box) {
            var i = box.length;
            while (i) {
                i--;
                box[i](evt)
            }
        }
    }
    // 功能模块
    // 顶部搜索
    require.registar('topSearch', function (exports) {
        var module, data, index, input, form, rsBox, placeholder, loaded;
        var serial_py_json = 'https://js.data.auto.qq.com/car_public/template/serial_py.js';
        var ie6789 = $.browser.ie678 || $.browser.ie9;
        var flag = true;
        var timer = null;
        var _searchFrom = '';
        if(location.href.indexOf('car_public/search.shtml') != -1){
            _searchFrom = 'search_index'
        }else if(location.href.indexOf('car_public/enquiry.shtml') != -1){
            _searchFrom = 'enquiry'
        }
        
        function insertData() {
            if (window._autoapp_site_serial_py_json) {
                data = _autoapp_site_serial_py_json;
                rsBox.html(get(null) || "<span>\u65e0\u76f8\u5173\u63a8\u8350</span>");
                $(document).on('click', '.header-search li a', function () {
                    $.stopEvent(event);
                    var url = $(this).attr('_href');
                    var value = $(this).text();
                    var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
                    var iQQ = (a == null ? "" : unescape(a[2]));
                    var param = {
                        sIp: '',
                        iQQ: iQQ,
                        sBiz: 1,
                        sOp: 2,
                        sUrl: escape(url),
                        sLocalUrl: escape(location.href),
                        sKeyword: encodeURIComponent(value),
                        sId: url.match(/\d/g).join('')
                    }
                    btraceDo(param);
                    url && window.open(url);
                });
                loaded = true;
            }
        }
        function getQs(name, url) {
            if (!url) url = document.URL;
            //url = url.toLowerCase(); // This is just to avoid case sensitiveness  
            name = name.replace(/[\[\]]/g, "\\$&"); // This is just to avoid case sensitiveness for query parameter name
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        function blur() {
            var val = input.val();
            rsBox.hide();
            input.css("color", val ? "#333" : "#a9a9a9").val(val || placeholder);
            $(document).unbind("click", blur)
        }

        function focus() {
            var position = input.position();
            var top = position.top + input.height() + 2, left = position.left;
            rsBox.html() != '' && rsBox.show();//.css({top:top,left:left})
            input.css("color", "#333").val(input.val() == placeholder  ? "" : input.val());
            get($.trim(input.val()));
            $(document).bind("click", blur);
            var param = {
                sOp: 'search_focus',
                searchFrom: _searchFrom
            };
            btraceDo(param);
        }

        function keyup(e) {
            var total = rsBox.find("li").length - 1 || 0;
            var code = e.keyCode;
            var _this = this;
            //console.log(code);
            if (code == 13) { 
                $.stopEvent(e);
                submitOpen(e); 
                return false; 
            }
            if (code == 38 || code == 40) {
                if (code == 38) {
                    index--;
                    if (index < 0) { index = total }
                } else {
                    index++;
                    if (index > total) { index = 0 }
                }
                var selected = rsBox.find("li").eq(index).children('a');
                selected.closest('ul').find('.select').removeClass('select');
                selected.addClass("select");
                input.css("color", "#333").val(selected.attr("title"));
            } else {
                index = -1;
                clearTimeout(timer)
                timer = setTimeout(function () {
                    get($.trim(_this.value));
                }, 100)

            }
            return false;
        }
        function submitOpen(e) {
            $.stopEvent(e);
            input.trigger('blur');
			rsBox.hide();
            var value = $.trim(input.val()), url = "";
            url = ~index ? rsBox.find("li").eq(index).children('a').attr("href") : "https://ait.auto.qq.com/car_public/search.shtml?keyword=" + encodeURI(value);
            //url =  value ? ("https://cgi.data.auto.qq.com/php/search.php?fuzzy_search=1&keyword=" + encodeURI(value)) : "https://data.auto.qq.com/";            
            var param = {
                sOp: ~index ? 'search_recommend':'search_btn',
                searchFrom: _searchFrom
            };
            btraceDo(param);
            //console.dir(param);
            url &&  location.href.indexOf('car_public/search.shtml')!=-1 && !~index ?  (location.href = url)  :window.open(url)  ;
            index = -1;
            //return false;
        }
        function crossAjax(_url, func, options) { //ajax
            var op = {
                data: {}
            }
            var _proxy = (!!_url) ? _url : location.href,
                _data = {},
                async = true,
                load = false,
                _name = '_proxy_iframe',
                //    token = op.token,
                proxy = '';

            if (options) {
                _data = options.data ? options.data : _data;
                async = options.async ? options.async : async;
                load = options.load ? options.load : load;
            }
            (!op.data.xmlHttp) && (op.data.xmlHttp = {});
            //load == true && self.pop({load: true});
            var Test = (_proxy && /^(?:(?:[^:\/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(\?(?:[^#]*))?(?:#(.*))?$/.test(_proxy));
            var _host = (!!RegExp.$1) ? RegExp.$1 : location.host.replace('//', '');
            if (Test && !!_host && location.host != _host && $.browser.msie) {
                _name = '_proxy_' + _host.replace(/(\.|\:|\?|\/)/ig, '');
                _proxy = (options && !!options.proxy) ? '//' + _host + options.proxy : '//' + _host + op.currentProxy;

                var oFrame = $('#' + _name);

                oFrame.length ? (function () {
                    (oFrame.attr('src') != _proxy || !op.data.xmlHttp[_name]) ? oFrame.unbind('load').load(sendAjax) : sendAjax(oFrame[0]);
                })() : (function () {
                    oFrame = $('<iframe id="' + _name + '" name="' + _name + '" style="display:none;" src="' + _proxy + '"></iframe>');
                    oFrame.unbind('load').load(sendAjax).appendTo(document.body);
                })();
            } else {
                var ajax = $.ajax({
                    type: (options && options.type ? options.type : 'POST'),
                    url: _url,
                    async: async,
                    contentType: 'application/json;charset=utf-8',
                    data: JSON.stringify(_data)
                });
                ajax.always(resultHandler);
            }

            function sendAjax(e) {
                var iframe = e;
                if (iframe && iframe.type == 'load') {
                    iframe = iframe.target || iframe.srcElement;
                }
                try {
                    var xmlHttp = op.data.xmlHttp[_name] || iframe.contentWindow.xmlHttp;
                    op.data.xmlHttp[_name] = xmlHttp;
                } catch (error) {
                    var xmlHttp = null;
                }
                console.log(xmlHttp);

                if (xmlHttp) {
                    if ($.browser.msie) {
                        $.support.cors = true; //IE下跨域必须设置
                    }
                    var ajax = $.ajax({
                        type: (options && options.type ? options.type : 'POST'),
                        url: _url,
                        async: async,
                        xhr: xmlHttp,
                        contentType: 'application/json;charset=utf-8',
                        data: JSON.stringify(_data)
                    });
                    ajax.always(resultHandler);
                }
            }

            function resultHandler(oResult) {
                typeof func == 'function' && func(oResult);
            }
        }
        function ajaxFn(options,_success,_complete,_error) {
            //_data.version = "100";
            var _data = options.data;
            _data.salt = "t*e&n^c%e%n#t@a(u*t&o";
            _data._t = Date.parse(new Date()) / 1000;	
            options.dataType && options.dataType == 'jsonp' && options.jsonpCallback && (_data.callback = options.jsonpCallback);
            var _sign = sha1(objSortToArrJoinString(_data));
            _data.sign = _sign;
            _data.callback && (delete _data.callback);
            delete _data.salt;
            $.ajax({
                type: options.type.toUpperCase(), // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                url: options.url,
                data: options.contentType == 'application/json;charset=utf-8' ? JSON.stringify(_data) : _data,
                contentType: options.contentType ? options.contentType : "application/x-www-form-urlencoded",
                dataType: options.dataType?options.dataType:'json',
                jsonpCallback:options.dataType == 'jsonp' ? options.jsonpCallback : '',
                async: true, //请求是否异步
                cache:true,
                beforeSend: function(xhr, settings) {
                    //console.log(xhr, settings);
                    //beforeSend();
                },
                success: function(data, status, xhr) {
                    _success(data);
                },
                complete: function(xhr, status) {
                    //请求完成后回调函数 (请求成功或失败之后均调用)
                    typeof _complete == 'function' && _complete();
                    delete _data.sign;
                },
                error: function(xhr, errorType, error) {
                    //console.log(xhr, errorType, error);
                    _error(xhr, errorType, error);
                }
                
            });
            
        }
        /**
         * 对象转字符串
         */
        function objSortToArrJoinString (obj) {
            // salt: "t*e&n^c%e%n#t@a(u*t&o",
            // _t: Date.parse(new Date()) / 1000,
            var newkey = Object.keys(obj).sort();
            var newObj = {};
            var arr = [];
            var i = 0
            for (var j = 0; j < newkey.length; j++) {
                newObj[newkey[j]] = obj[newkey[j]];
            }
            for (var item in newObj) {
                arr[i] = item + '=' + newObj[item];
                i++;
            }
            //console.log(obj, arr.join('@'))
            return arr.join('@');
        }
        function get(value) {
            var rsData = [], count = 0;
            if (!flag) {
                return false
            }
            flag = false;
            ajaxFn({
				url: 'https://ait.auto.qq.com/search/suggest',
				type: "GET",
				data: {
					keyword: value,
					source:'pc',
					callback: 'search_key' //为签名而加，跟jsonpCallback同名，jsonp才需要
				},
				dataType: 'jsonp',
				jsonpCallback: "search_key" //指定回调函数名称
			},
				function success(oRet) {
					if (oRet.code == 10000) {
                        var data = oRet.data.list;
                        flag = true;
                        for (var i = 0, len = data.length; i < len; i += 1) {
                            var item = data[i];
                            item.price = (item.price_low == '0.00'? '<span class="acronym" style="color: #666;">暂无报价</span>' : '<span class="acronym">' + item.price_low + '-' + item.price_high + '万</span>');
                            rsData.push('<li><a target="_blank" title="' + item.keyword + '" href="//data.auto.qq.com/car_serial/' + item.id + '" >' + item.keyword + item.price+'</a></li>');
                            count++;
                            if (count == 10) break;

                        }

                        rsData.length && (rsData = new Array('<ul><p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAUUlEQVQoU2NkQALLj3/6j8yPtORjhPHhDJAAnRUuP/65noHhfwOy2zDZjA1gN+JXzNgQacnbCPcMdsUQRSDD0HyN7AyEIgyFCGcwMMBMgrkXAKYfKupG96GPAAAAAElFTkSuQmCC">点击直达车系详情</p>').concat(rsData), rsData.push('</ul>'));
                        rsData.length > 0 ? rsBox.show().html(rsData.join("")) : rsBox.hide().html('');
                        rsBox.find("li").on('click',function(){
                            var param = {
                                sOp: 'search_recommend',
                                searchFrom: _searchFrom
                            };
                            btraceDo(param);
                        })
                    }
				},
				function complete() {
				},
				function error() {
                }
            )
            

        }

        exports.init = function (id) {
            module = "autoComplete_" + Math.random();
            data = [];
            index = -1;
            input = $(id);
            form = input.closest("form");
            rsBox = $('<div style="position:absolute;display:none;" class="autoComplete results_list" />').appendTo(input.parent());
            placeholder = input.attr("placeholder");
            input.attr("placeholder", "");
            loaded = false;
            var val = input.val();
            input.css("color", "#a9a9a9").val(val || placeholder);


            $('.search_car_btn').bind('click', submitOpen);
            input.css('outline', 'none').siblings('.search_car_btn').unbind().bind('click', submitOpen);


            eventSubscribe("click", function (active) {
                if (active != module) blur();
            });

            input.keyup(keyup).focus(focus).click(function (e) {
                $.stopEvent(e);
                eventSpeaker("click", module);
                //    !loaded && $.getScript(serial_py_json, insertData);
            })
        }
    });
    $(function () {
        $('.search_ipt').length && require('topSearch').init('.search_ipt'); //顶部搜索
    });
})(jQuery);/*  |xGv00|d5c75acccc72a2f41bdd7076b97f8c91 */