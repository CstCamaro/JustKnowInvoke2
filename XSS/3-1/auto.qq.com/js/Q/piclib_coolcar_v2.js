/* 
 * Ô´×Ôhttp://data.auto.qq.com/piclib/chequ.shtml
 */
var FBrowser = (function() {
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
        isIE: !!window.attachEvent && !isOpera,
        isOpera: isOpera,
        isSafari: ua.indexOf('AppleWebKit/') > -1,
        isFirefox: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
        MobileSafari: /Apple.*Mobile.*Safari/.test(ua),
        isChrome: !!window.chrome
    };
})();
FBrowser.isIE6 = FBrowser.isIE && !window.XMLHttpRequest;
FBrowser.isIE7 = FBrowser.isIE && !!window.XMLHttpRequest;
String.prototype.lTrim = function() {
    return this.replace(/^\s*/, "");
}
String.prototype.rTrim = function() {
    return this.replace(/\s*$/, "");
}
String.prototype.trim = function() {
    return this.rTrim().lTrim();
}
String.prototype.hasChinese = function() {
    return /[^\u00-\uff]/g.test(this);
}
String.prototype.onlyChinese = function() {
    return /^[\u0391-\uffe5]+$/g.test(this);
}
String.prototype.hash_filter = function() {
    return this.replace(/[^a-f0-9]/gi, '');
}
String.prototype.bytes = function() {
    return this.replace(/[^\x00-\xff]/gi, 'xx').length;
}
function Fstr_pad(s, n, pad) {
    if (s.length >= n) return s;
    var p = n - s.length;
    for (var i = 0; i < p; i++) s = pad + '' + s;
    return s;
}
function Farray_exist(d, v) {
    for (var i = 0; i < d.length; i++) {
        if (d[i] == v) return true;
    }
    return false;
}
window.clearRunInterval = window.clearInterval;
window.clearRunTimeout = window.clearTimeout;
function Fid(id) {
    return document.getElementById(id);
}
function Fname(name) {
    if (document.all) {
        var ret = [];
        var els = document.all(name);
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (el.getAttribute("name") == name) {
                ret.push(el);
            }
        }
        return ret;
    }
    return document.getElementsByName(name);
}
function FtagName(name) {
    return document.getElementsByTagName(name);
}
function Fempty(v) {
    if (v != null && (typeof(v) == 'object' || typeof(v) == 'function')) return false;
    return (("" == v || undefined == v || null == v) ? true: false);
}
function FisTagName(e, tagName) {
    return ((e.tagName.toUpperCase() == tagName.toUpperCase()) ? true: false);
}
function FstrLeft(s, n) {
    var s2 = s.slice(0, n),
    i = s2.bytes();
    if (i <= n) return s2;
    i -= s2.length;
    switch (i) {
    case 0:
        return s2;
    case n:
        return s.slice(0, n >> 1);
    default:
        var k = n - i,
        s3 = s.slice(k, n),
        j = s3.replace(/[\x00-\xff]/g, "").length;
        return j ? s.slice(0, k) + FstrLeft(s3, j) : s.slice(0, k);
    }
}
window.setRunTimeout = function(fn, dt) {
    if (typeof(fn) != 'function') return false;
    var p = new Array();
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) p[i - 2] = arguments[i];
    }
    var f = function() {
        fn.apply(null, p)
    }
    return window.setTimeout(f, dt);
}
window.setRunInterval = function(fn, dt) {
    if (typeof(fn) != 'function') return false;
    var p = new Array();
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) p[i - 2] = arguments[i];
    }
    var f = function() {
        fn.apply(null, p)
    }
    return window.setInterval(f, dt);
}
function FxmlEncode(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");
}
function FgetURLArgs() {
    var q = location.search.substring(1).replace("&amp;", "&").split("&");
    var p = new Object();
    for (var i = 0; i < q.length; i++) {
        var pos = q[i].indexOf('=');
        if ( - 1 == pos) continue;
        p[q[i].substring(0, pos)] = unescape(q[i].substring(pos + 1));
    }
    return p;
}
function FaddOptionToSelect(id, txt, v, selected) {
    var e = Fid(id);
    if (Fempty(e) || !FisTagName(e, 'select')) return false;
    var s = !!selected;
    e.options[e.options.length] = new Option(txt, v, s, s);
    return true;
}
function FclearOptionsOfSelect(id) {
    var e = Fid(id);
    if (Fempty(e) || !FisTagName(e, 'select')) return false;
    e.options.length = 0;
}
function FsetValuesOfSelect(id, v, stat) {
    var e = Fid(id);
    var v1 = new Array();
    if (Fempty(e) || !FisTagName(e, 'select')) return false;
    if (typeof(v) != 'object') {
        v1[0] = v;
    } else {
        v1 = v;
    }
    for (var i = 0; i < e.options.length; i++) {
        e.options[i].selected = false;
        if (Fempty(v1)) e.options[i].selected = stat;
        else if (Farray_exist(v1, e.options[i].value)) e.options[i].selected = stat;
    }
}
function FgetValuesOfSelect(id) {
    var e = Fid(id);
    if (Fempty(e) || !FisTagName(e, 'select')) return null;
    var v = new Array();
    for (var i = 0,
    j = 0; i < e.options.length; i++) {
        if (true == e.options[i].selected) v[j++] = e.options[i].value;
    }
    return ((1 == v.length) ? v[0] : v)
}
function FsetValuesOfCheckbox(name, v, stat) {
    var e = Fname(name);
    if (v && v.constructor != Array) v = new Array(v);
    for (var i = 0; i < e.length; i++) {
        if (Fempty(e[i]) || e[i].type != 'checkbox') continue;
        e[i].checked = false;
        if (Fempty(v)) e[i].checked = stat;
        else if (Farray_exist(v, e[i].value)) e[i].checked = stat;
    }
}
function FgetValuesOfCheckbox(name) {
    var e = Fname(name);
    var v = new Array();
    for (var i = 0; i < e.length; i++) {
        if (Fempty(e[i]) || e[i].type != 'checkbox') continue;
        if (e[i].checked == true) v[v.length] = e[i].value;
    }
    return v;
}
function FsetValueOfRadio(name, v) {
    var e = Fname(name);
    for (var i = 0; i < e.length; i++) {
        if (Fempty(e[i]) || e[i].type != 'radio') continue;
        if (e[i].value == v) e[i].checked = true;
    }
}
function FgetValueOfRadio(name) {
    var e = Fname(name);
    for (var i = 0; i < e.length; i++) {
        if (e[i].type != 'radio') continue;
        if (e[i].checked == true) return e[i].value;
    }
    return null;
}
var Cookie = {
    setCookie: function(name, value, expires, path, domain, secure) {
        if (window._testing) domain = location.host;
        document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path: "; path=/") + ((domain) ? "; domain=" + domain: "; domain=data.auto.qq.com") + ((secure) ? "; secure": "");
    },
    getCookie: function(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    },
    clearCookie: function(name, path, domain) {
        if (Cookie.getCookie(name)) {
            if (window._testing) domain = location.host;
            document.cookie = name + "=" + ((path) ? "; path=" + path: "; path=/") + ((domain) ? "; domain=" + domain: "; domain=data.auto.qq.com") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
        }
    },
    clearAnyway: function(name, path, domain) {
        document.cookie = name + "=" + ((path) ? "; path=" + path: "; path=/") + ((domain) ? "; domain=" + domain: "; domain=data.auto.qq.com") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
    }
};
function FgetEventTarget(evt) {
    return evt.target || evt.srcElement;
}
function FgetEvent(evt) {
    if (!evt) {
        var ev = window.event;
        if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
                evt = c.arguments[0];
                if (evt && Event == evt.constructor) {
                    break;
                }
                c = c.caller;
            }
        } else {
            return ev;
        }
    }
    return evt;
}
function FisLeftKeyDown(evt) {
    evt = evt || window.event;
    return (((evt.which) && (evt.which == 1)) || ((evt.button) && (evt.button == 1)));
}
function FactClick(obj) {
    if (Fempty(obj)) return;
    if (document.all) {
        obj.click();
    } else {
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        obj.dispatchEvent(evt);
    }
}
function FaddEvent(e, evt, fn, isID) {
    if (isID == true) e = Fid(e);
    if (!Fempty(e.attachEvent) && (typeof(e.attachEvent) == "function" || typeof(e.attachEvent) == "object")) e.attachEvent("on" + evt, fn);
    else if (!Fempty(e.addEventListener) && (typeof(e.addEventListener) == "function" || typeof(e.addEventListener) == "object")) e.addEventListener(evt, fn, false);
}
function FremoveEvent(e, evt, fun, isID) {
    if (isID == true) e = Fid(e);
    if (!Fempty(e.detachEvent) && (typeof(e.detachEvent) == "function" || typeof(e.detachEvent) == "object")) e.detachEvent("on" + evt, fun);
    else if (!Fempty(e.removeEventListener) && (typeof(e.removeEventListener) == "function" || typeof(e.removeEventListener) == "object")) e.removeEventListener(evt, fun, false);
}
function FstopEventTransfer(evt) {
    if (evt.preventDefault) {
        evt.stopPropagation();
        evt.preventDefault();
    } else {
        evt.returnValue = false;
        evt.cancelBubble = true;
    }
}
function FstopObjectEventTransfer(e, evts) {
    if (Fempty(e) || Fempty(evts)) return;
    var l = evts.split(",");
    for (var i = 0; i < l.length; i++) {
        var evt = l[i].trim();
        if (Fempty(evt)) continue;
        var fn = function(event) {
            event = FgetEvent(event);
            FstopEventTransfer(event);
        }
        FaddEvent(e, evt, fn);
    }
}
function FsetEventCapture(target) {
    if (target.setCapture) {
        target.setCapture();
    } else {
        if (!FBrowser.isFirefox && document.captureEvents) {
            document.captureEvents(Event.MouseMove | Event.MouseUp);
        }
    }
}
function FreleaseEventCapture(target) {
    if (target.releaseCapture) {
        target.releaseCapture();
    } else {
        if (!FBrowser.isFirefox && document.releaseEvents) {
            document.releaseEvents(Event.MouseMove | Event.MouseUp);
        }
    }
}
function FgetWindowSize() {
    if (FBrowser.isIE6 || FBrowser.isOpera) return {
        width: document.body.clientWidth,
        height: document.documentElement.clientHeight || document.body.clientHeight || 0
    };
    else return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    };
}
function FgetPageSize() {
    if (FBrowser.isIE6) return {
        width: document.body.scrollWidth,
        height: document.body.scrollHeight
    };
    if (document.documentElement) return {
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight
    };
    else return {
        width: document.body.scrollWidth,
        height: document.body.scrollHeight
    };
}
function FgetScrollPosition() {
    if (FBrowser.isIE6) return {
        left: document.body.scrollLeft,
        top: document.body.scrollTop || document.documentElement.scrollTop
    };
    if (document.documentElement) {
        return {
            left: document.documentElement.scrollLeft,
            top: document.body.scrollTop || document.documentElement.scrollTop
        };
    } else return {
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    };
}
function FgetPosition(e, isID) {
    if (isID == true) e = Fid(e);
    var left = 0,
    top = 0,
    w = e.offsetWidth,
    h = e.offsetHeight;
    do {
        top += e.offsetTop || 0;
        left += e.offsetLeft || 0;
        e = e.offsetParent;
    } while ( e );
    return {
        x: left,
        y: top,
        width: w,
        height: h
    };
}
function FsetPosition(e, x, y, w, h, isID) {
    if (isID == true) e = Fid(e);
    if (e.style.position == "absolute") {
        e.style.left = x + "px";
        e.style.top = y + "px";
    } else if (e.style.position == "relative") {
        var p = FgetPosition(e.offsetParent);
        e.style.left = (x - p.x) + "px";
        e.style.top = (y - p.y) + "px";
    }
    if (w >= 0) e.style.width = w + "px";
    if (h >= 0) e.style.height = h + "px";
}
function FgetOffsetPosition(e1, e2) {
    var p1 = FgetPosition(e1);
    var p2 = FgetPosition(e2);
    return {
        x: (p1.x - p2.x),
        y: (p1.y - p2.y)
    };
}
function FsetOffsetPosition(e1, e2, x, y, isID) {
    if (isID == true) {
        e1 = Fid(e1);
        e2 = Fid(e2);
    }
    var p = FgetPosition(e2);
    FsetPosition(e1, x + p.x, y + p.y);
}
function FsetOffsetPositionByRate(e1, e2, nx, ny, isID) {
    if (isID == true) {
        e1 = Fid(e1);
        e2 = Fid(e2);
    }
    var s1 = FgetPosition(e1);
    var s2 = FgetPosition(e2);
    FsetPosition(e1, (s2.x + (s2.width - s1.width) / nx), (s2.y + (s2.height - s1.height) / ny), -1, -1);
}
function FsetOffsetWindowPosition(e, x, y, isID) {
    if (isID == true) e = Fid(e);
    var p = FgetScrollPosition();
    FsetPosition(e, x + p.left, y + p.top, -1, -1);
}
function FsetOffsetWindowPositionByRate(e, nx, ny, isID) {
    if (isID == true) e = Fid(e);
    var s = FgetWindowSize();
    FsetOffsetWindowPosition(e, (s.width - e.offsetWidth) / nx, (s.height - e.offsetHeight) / ny);
}
function FhasSameParent(e1, e2, isID) {
    if (isID == true) {
        e1 = Fid(e1);
        e2 = Fid(e2);
    }
    if (Fempty(e1) || Fempty(e2)) return false;
    return (e1.parentNode == e2.parentNode);
}
function FsetStyleFloat(e, v, isID) {
    if (isID == true) e = Fid(e);
    if (e.style.styleFloat != undefined) e.style.styleFloat = v;
    else e.style.cssFloat = v;
}
function FgetAttr(e, name, isID) {
    if (isID == true) e = Fid(e);
    return e.getAttribute(name);
}
function FisSameUrl(u1, u2) {
    if (u1 == u2) return true;
    var d1 = document.location.host;
    var d2 = d1;
    var re = /^(http:\/\/([^\/]+))?(\/[\S]*)$/i;
    var p1 = u1.match(re);
    if (!Fempty(p1[2])) d1 = p1[2];
    var p2 = u2.match(re);
    if (!Fempty(p2[2])) d2 = p2[2];
    return ((d1 == d2 && p1[3] == p2[3]) ? true: false);
}
function array_search(arr, sw) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == sw) {
            return i;
        }
    }
    return - 1;
}
function array_remove(arr, dx) {
    if (isNaN(dx) || dx > arr.length) {
        return arr;
    }
    arr.splice(dx, 1);
    return arr;
}
function FremoveElement(eid) {
    var e = Fid(eid);
    if (e) {
        e.parentNode.removeChild(e);
    }
}
function obj_clone(old_obj) {
    var newObj = new Object();
    for (elements in old_obj) {
        newObj[elements] = old_obj[elements];
    }
    return newObj;
}
function DrawImage(ImgD, img_width, img_height) {
    var image = new Image();
    image.src = ImgD.src;
    if (img_width <= 0 && img_height <= 0) {
        return;
    }
    var draw_type = 0;
    if (img_width > 0 && img_height > 0) {
        draw_type = (ImgD.width / img_width >= ImgD.height / img_height) ? 1 : 2;
    } else if (img_width > 0 && img_height <= 0) {
        draw_type = 1;
    } else {
        draw_type = 2;
    }
    if (draw_type == 1) {
        if (image.width > img_width) {
            ImgD.width = img_width;
            ImgD.height = (image.height * img_width) / image.width;
        } else {
            ImgD.width = image.width;
            ImgD.height = image.height;
        }
    } else if (draw_type == 2) {
        if (image.height > img_height) {
            ImgD.height = img_height;
            ImgD.width = (image.width * img_height) / image.height;
        } else {
            ImgD.width = image.width;
            ImgD.height = image.height;
        }
    }
}
var FGetImg = function(sUrl, fCallback) {
    var img = new Image();
    img.src = sUrl + '?t=' + Math.random();
    if (FBrowser.isIE) {
        img.onreadystatechange = function() {
            if (this.readyState == "loaded" || this.readyState == "complete") {
                fCallback({
                    width: img.width,
                    height: img.height,
                    url: sUrl
                });
            }
        };
    } else if (FBrowser.isFirefox || FBrowser.isSafari || FBrowser.isOpera || FBrowser.isChrome) {
        img.onload = function() {
            fCallback({
                width: img.width,
                height: img.height,
                url: sUrl
            });
        };
    } else {
        fCallback({
            width: img.width,
            height: img.height,
            url: sUrl
        });
    }
};
var PTLOGIN2_AID = '5003201';
function FvalidateUin(uin) {
    var R = /^[1-9]\d{4,11}$/;
    return R.test(uin);
}
function FgetUin() {
    if (!Cookie.getCookie("uin")) {
        var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
        var uin = (a == null ? "": unescape(a[2]));
        if (uin == "") return false;
        else return uin;
    }
    var uin_str = Cookie.getCookie("uin");
    var uin = parseInt(uin_str.substr(1, (uin_str.length - 1)), 10);
    if (FvalidateUin(uin)) return uin;
    return false;
}
function Flogout() {
    Cookie.clearCookie('uin', '/', 'qq.com');
    Cookie.clearCookie('luin', '/', 'qq.com');
    Cookie.clearCookie('skey', '/', 'qq.com');
    Cookie.clearCookie('lskey', '/', 'qq.com');
}
function FisLogon() {
    if (Cookie.getCookie("skey")) {
        return true;
    }
    return false;
}
function FInputOnFocus(obj) {
    obj.style.color = "#333";
    if (obj.value == obj.defaultValue) {
        obj.value = "";
    }
}
function FInputOnBlur(obj) {
    if (obj.value == "") {
        obj.value = obj.defaultValue;
        obj.style.color = "#666";
    }
}
var FObjId = function(s) {
    return (typeof s == "object") ? s: document.getElementById(s);
};
var FJsLoader = {
    load: function(sId, sUrl, fCallback, chset) {
        try {
            FObjId(sId).parentNode.removeChild(FObjId(sId));
            FObjId(sId) = null;
        } catch(e) {}
        var _script = document.createElement("script");
        _script.setAttribute("id", sId);
        _script.setAttribute("type", "text/javascript");
        _script.setAttribute("src", sUrl);
        if (chset) _script.setAttribute("charset", chset);
        else _script.setAttribute("charset", "gb2312");
        document.getElementsByTagName("head")[0].appendChild(_script);
        if (FBrowser.isIE) {
            _script.onreadystatechange = function() {
                if (this.readyState == "loaded" || this.readyState == "complete") {
                    try {
                        FObjId(_script).parentNode.removeChild(FObjId(_script));
                        FObjId(_script) = null;
                    } catch(e) {}
                    fCallback();
                }
            };
        } else if (FBrowser.isFirefox || FBrowser.isSafari || FBrowser.isOpera || FBrowser.isChrome) {
            _script.onload = function() {
                try {
                    FObjId(_script).parentNode.removeChild(FObjId(_script));
                    FObjId(_script) = null;
                } catch(e) {}
                fCallback();
            };
        } else {
            try {
                FObjId(_script).parentNode.removeChild(FObjId(_script));
                FObjId(_script) = null;
            } catch(e) {}
            fCallback();
        }
    }
};
var g_boss_img = new Array(10);
for (var i = 0; i < 10; i++) {
    g_boss_img[i] = new Image(1, 1);
}
function FWebBossBtnStat(iQQ, iTy, iBtnType) {
    var index = Math.floor(Math.random() * 10);
    g_boss_img[index].src = "http://btrace.qq.com/collect?sIp=&iQQ=" + iQQ + "&sBiz=&sOp=" + iBtnType + "&iSta=&iTy=" + iTy + "&iFlow=" + (new Date()).valueOf() + "&sBtnType=" + iBtnType + "&iClickNum=1";
}
function FWebBossStatSync(iQQ, iTy, sCommentType) {
    var index = Math.floor(Math.random() * 10);
    g_boss_img[index].src = "http://btrace.qq.com/collect?sIp=&iQQ=" + iQQ + "&sBiz=&sOp=&iSta=&iTy=" + iTy + "&iFlow=" + (new Date()).valueOf() + "&sCommentType=" + sCommentType + "&iNum=1";
}
var uin = FgetUin();
function load_piclist(id) {
    cur_page = 1;
    var jsonUrl = '//js.data.auto.qq.com/piclib/json/coolcar_' + id + '.json';
    FJsLoader.load('car_piclist', jsonUrl,
    function() {
        if (typeof carpics != "undefined") {
            coolcar_list = carpics;
        }
    });
}
function show_more() {
    FWebBossBtnStat(uin, 1314, 'coolcar_showmore');
    var num_perpage = 30;
    if (cur_page * num_perpage >= coolcar_list['total']) {
        return false;
    }
    cur_page++;
    show_list(coolcar_list['piclist'], coolcar_list['total'], coolcar_list['img_prefix'], coolcar_list['album_prefix'], num_perpage);
    resetMaxHeight();
}
function show_list(pic_list, total_num, img_prefix, album_prefix, num_perpage) {
    if (cur_page > 0) {
        var start_pos = (cur_page - 1) * num_perpage;
        var end_pos = cur_page * num_perpage;
    }
    if (end_pos >= total_num) {
        Fid('more_piclist').style.display = 'none';
        end_pos = total_num;
    } else {
        Fid('more_piclist').style.display = 'block';
    }
    if (cur_page > 1) {
        var pic_html = Fid('car_pic_list').innerHTML;
    } else {
        var pic_html = '';
    }
    for (i = start_pos; i < end_pos; i++) {
        tmp_str = '<li><a href="' + album_prefix + pic_list[i]['AlbumUrl'] + '" target="_blank"><img src="' + img_prefix + pic_list[i]['FImgUrl'] + '" alt="' + pic_list[i]['FName'] + '" /></a><div></div>' + '<h3><a href="' + album_prefix + pic_list[i]['AlbumUrl'] + '" target="_blank">' + pic_list[i]['FName'] + '</a></h3></li>';
        pic_html = pic_html + tmp_str;
    }
    Fid('car_pic_list').innerHTML = pic_html;
    resetMaxHeight();
}
var client_h = document.documentElement.clientHeight || document.body.clientHeight || 0;
var max_height = Fid('cb_all').offsetTop + Fid('cb_all').offsetHeight;
var gotoTop = Fid('goTop');
if (null !== gotoTop) {
    gotoTop.style.display = "none";
    if (FBrowser.isIE7) {
        FaddEvent(gotoTop, "click",
        function() {
            window.scrollTo(0, 0);
            FWebBossBtnStat(uin, 1314, 'model_gototop');
            return false;
        },
        false);
    }
}
var response = null;
function resetMaxHeight() {
    max_height = Fid('cb_all').offsetTop + Fid('cb_all').offsetHeight;
    collectScroll();
}
function collectScroll() {
    if (null == gotoTop || gotoTop.childElementCount == 0) return;
    if (null !== response) {
        clearTimeout(response);
        response = null;
    }
    var scrollTop = FgetScrollPosition();
    gotoTop.style.display = "none";
    if (0 != scrollTop.top) {
        if (scrollTop.top + client_h >= max_height) {
            gotoTop.childNodes[0].style.bottom = scrollTop.top + client_h - max_height + "px";
            if (FBrowser.isIE6 && scrollTop.top + client_h >= max_height - 1) {
                gotoTop.childNodes[0].style.bottom = scrollTop.top + client_h - max_height - 1 + "px";
            }
            gotoTop.style.display = "block";
        } else {
            if (FBrowser.isIE6) {
                response = setTimeout(function() {
                    gotoTop.childNodes[0].style.bottom = 0 + "px";
                    gotoTop.style.display = "block";
                },
                200);
            } else {
                gotoTop.childNodes[0].style.bottom = 0 + "px";
                gotoTop.style.display = "block";
            }
        }
    }
}
function resizeEvent() {
    client_h = document.documentElement.clientHeight || document.body.clientHeight || 0;
    collectScroll();
}
window.onscroll = collectScroll;
window.onresize = resizeEvent;
/*  |xGv00|6c0120e4227496ff9f16e846988db453 */