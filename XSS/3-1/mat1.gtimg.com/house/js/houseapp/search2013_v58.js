var FBrowser = (function () {
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
String.prototype.lTrim = function () {
    return this.replace(/^\s*/, "");
}
String.prototype.rTrim = function () {
    return this.replace(/\s*$/, "");
}
String.prototype.trim = function () {
    return this.rTrim().lTrim();
}
String.prototype.hasChinese = function () {
    return /[^\u00-\uff]/g.test(this);
}
String.prototype.onlyChinese = function () {
    return /^[\u0391-\uffe5]+$/g.test(this);
}
String.prototype.hash_filter = function () {
    return this.replace(/[^a-f0-9]/gi, '');
}
String.prototype.bytes = function () {
    return this.replace(/[^\x00-\xff]/gi, 'xx').length;
}

function Fstr_pad(s, n, pad) {
    if (s.length >= n) return s;
    var p = n - s.length;
    for (var i = 0; i < p; i++)
        s = pad + '' + s;
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
    if (v != null && (typeof (v) == 'object' || typeof (v) == 'function')) return false;
    return (("" == v || undefined == v || null == v) ? true : false);
}

function FisTagName(e, tagName) {
    return ((e.tagName.toUpperCase() == tagName.toUpperCase()) ? true : false);
}

function FstrLeft(s, n) {
    var s2 = s.slice(0, n), i = s2.bytes();
    if (i <= n) return s2;
    i -= s2.length;
    switch (i) {
        case 0:
            return s2;
        case n:
            return s.slice(0, n >> 1);
        default:
            var k = n - i, s3 = s.slice(k, n), j = s3.replace(/[\x00-\xff]/g, "").length;
            return j ? s.slice(0, k) + FstrLeft(s3, j) : s.slice(0, k);
    }
}

window.setRunTimeout = function (fn, dt) {
    if (typeof (fn) != 'function') return false;
    var p = new Array();
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) p[i - 2] = arguments[i];
    }
    var f = function () {
        fn.apply(null, p)
    }
    return window.setTimeout(f, dt);
}
window.setRunInterval = function (fn, dt) {
    if (typeof (fn) != 'function') return false;
    var p = new Array();
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) p[i - 2] = arguments[i];
    }
    var f = function () {
        fn.apply(null, p)
    }
    return window.setInterval(f, dt);
}

function FgetURLArgs() {
    var q = location.search.substring(1).replace("&", "&").split("&");
    var p = new Object();
    for (var i = 0; i < q.length; i++) {
        var pos = q[i].indexOf('=');
        if (-1 == pos) continue;
        p[q[i].substring(0, pos)] = unescape(q[i].substring(pos + 1));
    }
    return p;
}

var filterXSS = function (str) {
    if (!str) {
        return str;
    }
    while (str !== unescape(str)) {
        str = unescape(str);
    }
    var r = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"];
    var n = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"];
    for (i = 0; i < r.length; i++) {
        str = str.replace(new RegExp(r[i], "gi"), n[i]);
    }
    return str;
};
var Cookie = {
    setCookie: function (name, value, expires, path, domain, secure) {
        if (window._testing) domain = location.host;
        document.cookie = name + "=" + escape(value) +
            ((expires) ? "; expires=" + expires.toGMTString() : "") +
            ((path) ? "; path=" + path : "; path=/") +
            ((domain) ? "; domain=" + domain : "; domain=db.house.qq.com") +
            ((secure) ? "; secure" : "");
    }, getCookie: function (name) {
        var match;
        return filterXSS((match = document.cookie.match(RegExp("(^|;\\s*)" + name + "=([^;]*)(;|$)"))) ? unescape(match[2]) : null)
    }, clearCookie: function (name, path, domain) {
        if (Cookie.getCookie(name)) {
            if (window._testing) domain = location.host;
            document.cookie = name + "=" +
                ((path) ? "; path=" + path : "; path=/") +
                ((domain) ? "; domain=" + domain : "; domain=db.house.qq.com") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
        }
    }, clearAnyway: function (name, path, domain) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "; path=/") +
            ((domain) ? "; domain=" + domain : "; domain=db.house.qq.com") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
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
    if (!Fempty(e.attachEvent) && (typeof (e.attachEvent) == "function" || typeof (e.attachEvent) == "object"))
        e.attachEvent("on" + evt, fn); else if (!Fempty(e.addEventListener) && (typeof (e.addEventListener) == "function" || typeof (e.addEventListener) == "object"))
        e.addEventListener(evt, fn, false);
}

function FremoveEvent(e, evt, fun, isID) {
    if (isID == true) e = Fid(e);
    if (!Fempty(e.detachEvent) && (typeof (e.detachEvent) == "function" || typeof (e.detachEvent) == "object"))
        e.detachEvent("on" + evt, fun); else if (!Fempty(e.removeEventListener) && (typeof (e.removeEventListener) == "function" || typeof (e.removeEventListener) == "object"))
        e.removeEventListener(evt, fun, false);
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
        var fn = function (event) {
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
    if (FBrowser.isIE6 || FBrowser.isOpera)
        return {
            width: document.body.clientWidth,
            height: document.documentElement.clientHeight || document.body.clientHeight || 0
        }; else
        return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight};
}

function FgetPageSize() {
    if (FBrowser.isIE6)
        return {width: document.body.scrollWidth, height: document.body.scrollHeight};
    if (document.documentElement)
        return {width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight}; else
        return {width: document.body.scrollWidth, height: document.body.scrollHeight};
}

function FgetScrollPosition() {
    if (FBrowser.isIE6)
        return {left: document.body.scrollLeft, top: document.body.scrollTop || document.documentElement.scrollTop};
    if (document.documentElement) {
        return {
            left: document.documentElement.scrollLeft,
            top: document.body.scrollTop || document.documentElement.scrollTop
        };
    } else
        return {left: document.body.scrollLeft, top: document.body.scrollTop};
}

function FgetPosition(e, isID) {
    if (isID == true) e = Fid(e);
    var left = 0, top = 0, w = e.offsetWidth, h = e.offsetHeight;
    do {
        top += e.offsetTop || 0;
        left += e.offsetLeft || 0;
        e = e.offsetParent;
    } while (e);
    return {x: left, y: top, width: w, height: h};
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
    return {x: (p1.x - p2.x), y: (p1.y - p2.y)};
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

function FgetAttr(e, name, isID) {
    if (isID == true) e = Fid(e);
    return e.getAttribute(name);
}

function array_search(arr, sw) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == sw) {
            return i;
        }
    }
    return -1;
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

var FObjId = function (s) {
    return (typeof s == "object") ? s : document.getElementById(s);
};
var FJsLoader = {
    load: function (sId, sUrl, fCallback, chset) {
        try {
            FObjId(sId).parentNode.removeChild(FObjId(sId));
        } catch (e) {
        }
        var _script = document.createElement("script");
        _script.setAttribute("id", sId);
        _script.setAttribute("type", "text/javascript");
        _script.setAttribute("src", sUrl);
        if (chset)
            _script.setAttribute("charset", chset); else
            _script.setAttribute("charset", "gb2312");
        document.getElementsByTagName("head")[0].appendChild(_script);
        if (FBrowser.isIE) {
            _script.onreadystatechange = function () {
                if (this.readyState == "loaded" || this.readyState == "complete") {
                    try {
                        FObjId(_script).parentNode.removeChild(FObjId(_script));
                    } catch (e) {
                    }
                    fCallback();
                }
            };
        } else if (FBrowser.isFirefox || FBrowser.isSafari || FBrowser.isOpera || FBrowser.isChrome) {
            _script.onload = function () {
                try {
                    FObjId(_script).parentNode.removeChild(FObjId(_script));
                } catch (e) {
                }
                fCallback();
            };
        } else {
            try {
                FObjId(_script).parentNode.removeChild(FObjId(_script));
            } catch (e) {
            }
            fCallback();
        }
    }
};

function FgetAbsTop(e) {
    var t = e.offsetTop;
    while (e = e.offsetParent) {
        t += e.offsetTop;
    }
    return t;
}

function FtoPosAnchor(e) {
    if (null == e || typeof e == "undefined") {
        return;
    }
    window.scroll(0, FgetAbsTop(e));
}

function FtoMiddlePosAnchor(e) {
    if (typeof e == "string") {
        e = Fid(e);
    }
    if (null == e || typeof e == "undefined") {
        return;
    }
    var x_pos = 0;
    var cur_size_arr = FgetWindowSize();
    var y_pos = FgetAbsTop(e) - ((parseInt(cur_size_arr['height']) - parseInt(e.offsetHeight)) / 2);
    window.scroll(x_pos, y_pos);
}

FStringBuffer = function () {
    this._strings_ = new Array;
}
FStringBuffer.prototype.append = function (str) {
    this._strings_.push(str);
}
FStringBuffer.prototype.toString = function () {
    return this._strings_.join("");
}
FStringBuffer.prototype.reset = function () {
    this._strings_ = new Array;
}

function FCookieFrame(idPrefix, src, fun) {
    this._cf = document.createElement("iframe");
    this._cf.id = idPrefix + "_cookie_frame";
    this._cf.name = idPrefix + "_cookie_frame";
    this._cf.style.display = "none";
    document.getElementsByTagName("body")[0].appendChild(this._cf);
    this._cf.src = src;
    if (typeof fun == "function") {
        FaddEvent(this._cf, 'load', fun);
    }
}

FCookieFrame.prototype.getCookie = function (name) {
    try {
        return this._cf.contentWindow.g(name);
    } catch (e) {
        return null;
    }
}
FCookieFrame.prototype.clearCookie = function (name, path, domain) {
    if (this.getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "; path=/") +
            ((domain) ? "; domain=" + domain : "; domain=data.auto.qq.com") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
    }
}
var PTLOGIN2_AID = '638009104';

function FvalidateUin(uin) {
    var R = /^[1-9]\d{4,11}$/;
    return R.test(uin);
}

function FgetUin() {
    if (!Cookie.getCookie("uin")) {
        return false;
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

function FHTMLEncode(input) {
    var converter = document.createElement("div");
    if (FBrowser.isIE) {
        converter.innerText = input;
    } else {
        converter.textContent = input;
    }
    var output = converter.innerHTML;
    converter = null;
    return output;
}

function searchUpBoss(name, bossId) {
    if (isNaN(bossId)) {
        return false;
    }
    var iCity = '';
    if ((typeof (g_city_info) != 'undefined') && (typeof (g_city_info['FId']) != 'undefined')) {
        iCity = g_city_info['FId'];
    }
    var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
    var iQQ = (a == null ? "" : unescape(a[2]));
    var g_boss_search = new Image(1, 1);
    g_boss_search.src = '//btrace.qq.com/collect?sIp=&iQQ=' + iQQ + '&sBiz=&sOp=' + name + '&iSta=&iTy=' + bossId + '&iFlow=&iCity=' + iCity + '&ftime=' + new Date().getTime();
    return true;
}

var SmartBoxTop = {
    formId: 'smartbox_form',
    inputBoxId: 'search_input',
    resultListBoxId: 'search_house_result',
    resultListId: 'search_house_list',
    searchBtnId: 'search_btn',
    inputBoxMsg: '������ؼ��֣�¥����/����/ƴ���ȣ�',
    noResultMsg: '',
    itemIdPrefix: 'smartbox_item_',
    curItemIdx: -1,
    itemCount: 0,
    inputBoxMsgColor: '#AEAEAE',
    inputColor: '#000000',
    filterStr: "[^\u4e00-\u9fA5a-z0-9@��]",
    promptMsg: '������ؼ��֣�¥����/����/ƴ���ȣ�',
    citySubName: 'bj',
    domain: 'db.house.qq.com',
    cache: null,
    lastIndex: '',
    input: '',
    tip_1: '������Ӹ�¥�̣������ظ���ӡ�',
    tip_2: 'û����Ҫ�ҵ�¥�̣����������롣',
    ajaxCallback: function () {
        var resultList = Fid(SmartBoxTop.resultListId);
        if (typeof smartbox_data_json == 'undefined' || Fempty(smartbox_data_json)) {
            SmartBoxTop.closeResultBox();
            return;
        } else {
            var list = smartbox_data_json;
            SmartBoxTop.itemCount = list.length;
            if (SmartBoxTop.itemCount <= 0) {
                SmartBoxTop.closeResultBox();
                return;
            }
            SmartBoxTop.cache = list;
            SmartBoxTop.hasData = true;
            resultList.innerHTML = '';
            for (var i = 0; i < list.length; i++) {
                if (list[i].houseName.length >= 12) {
                    var showName = list[i].houseName.substr(0, 14);
                    showName += '...';
                    var li = '<li id="' + SmartBoxTop.itemIdPrefix + i + '" title="' + list[i].houseName + '" onclick="SmartBoxTop.clickItem(event,' + list[i].houseId + ',\'' + list[i].houseName + '\')" onmouseover="SmartBoxTop.mouseoverItem(' + i + ')"><div>' + showName + '</div></li>';
                } else {
                    var li = '<li id="' + SmartBoxTop.itemIdPrefix + i + '" onclick="SmartBoxTop.clickItem(event,' + list[i].houseId + ',\'' + list[i].houseName + '\')" onmouseover="SmartBoxTop.mouseoverItem(' + i + ')"><div>' + list[i].houseName + '</div></li>';
                }
                resultList.innerHTML += li;
            }
            var resultBox = Fid(SmartBoxTop.resultListBoxId);
            resultBox.style.display = 'block';
            resultBox.onmouseout = function () {
                SmartBoxTop.mouseOutList();
            };
        }
    },
    ajax: function () {
        var inputValue = Fid(SmartBoxTop.inputBoxId).value;
        var reg = new RegExp(SmartBoxTop.filterStr, 'ig');
        inputValue = inputValue.replace(reg, '');
        var url = '//' + SmartBoxTop.domain + '/index.php?mod=smartbox&act=query&q=' + encodeURIComponent(inputValue) + '&c=' + SmartBoxTop.citySubName + '&r=' + Math.random();
        FJsLoader.load('smartbox_ajax', url, SmartBoxTop.ajaxCallback);
    },
    keyup: function (e) {
        var input = Fid(SmartBoxTop.inputBoxId);
        var ev = e ? e : window.event;
        if (ev.keyCode != 13) {
        }
        if (ev.keyCode == 27) {
            SmartBoxTop.closeResultBox();
        } else if (ev.keyCode == 40) {
            if (Fid(SmartBoxTop.inputBoxId).value == '') {
                return false;
            }
            if (SmartBoxTop.curItemIdx < SmartBoxTop.itemCount - 1) {
                SmartBoxTop.curItemIdx++;
                input.value = SmartBoxTop.cache[SmartBoxTop.curItemIdx].houseName;
            } else {
                SmartBoxTop.curItemIdx = -1;
                input.value = SmartBoxTop.input;
            }
            SmartBoxTop.focusItem(SmartBoxTop.curItemIdx);
        } else if (ev.keyCode == 38) {
            if (Fid(SmartBoxTop.inputBoxId).value == '') {
                return false;
            }
            if (SmartBoxTop.curItemIdx == -1) {
                SmartBoxTop.curItemIdx = SmartBoxTop.itemCount - 1;
                input.value = SmartBoxTop.cache[SmartBoxTop.curItemIdx].houseName;
            } else if (SmartBoxTop.curItemIdx > 0) {
                SmartBoxTop.curItemIdx--;
                input.value = SmartBoxTop.cache[SmartBoxTop.curItemIdx].houseName;
            } else {
                SmartBoxTop.curItemIdx--;
                input.value = SmartBoxTop.input;
            }
            SmartBoxTop.focusItem(SmartBoxTop.curItemIdx);
        } else if (ev.keyCode == 13) {
            SmartBoxTop.input = input.value;
            if ('' == input.value.trim()) {
                SmartBoxTop.closeResultBox();
            } else {
            }
        } else {
            SmartBoxTop.input = input.value;
            if ('' == input.value.trim()) {
                SmartBoxTop.closeResultBox();
            } else {
                SmartBoxTop.openResultBox();
            }
        }
        return false;
    },
    mouseOutList: function () {
        SmartBoxTop.curItemIdx = -1;
        SmartBoxTop.focusItem(SmartBoxTop.curItemIdx);
    },
    click: function (event) {
        var e = event ? event : window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        var input = Fid(SmartBoxTop.inputBoxId);
        if ((SmartBoxTop.inputBoxMsg != input.value) && ('' != input.value.trim())) {
        } else {
            input.value = '';
            input.style.color = SmartBoxTop.inputColor;
        }
        SmartBoxTop.openResultBox();
    },
    focusItem: function (itemIdx) {
        for (var i = 0; i < SmartBoxTop.itemCount; i++) {
            var item = Fid(SmartBoxTop.itemIdPrefix + i);
            if (Fempty(item)) {
                return false;
            }
            if (i == itemIdx) {
                item.className = 'focus';
            } else {
                item.className = '';
            }
        }
    },
    mouseoverItem: function (itemIdx) {
        for (var i = 0; i < SmartBoxTop.itemCount; i++) {
            var item = Fid(SmartBoxTop.itemIdPrefix + i);
            if (i == itemIdx) {
                item.className = 'focus';
            } else {
                item.className = '';
            }
        }
    },
    clickItem: function (event, houseId, houseName) {
        var e = event ? event : window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        SmartBoxTop.closeResultBox();
        var input = Fid(SmartBoxTop.inputBoxId).value;
        if (!Fempty(SmartBoxTop.cache)) {
            for (var i = 0; i < SmartBoxTop.cache.length; i++) {
                if (houseId == SmartBoxTop.cache[i].houseId && houseName == SmartBoxTop.cache[i].houseName) {
                    Fid(SmartBoxTop.inputBoxId).value = SmartBoxTop.cache[i].houseName;
                    window.open('//db.house.qq.com/' + Fid('cur_city').value + '_' + houseId + '/');
                    return false;
                }
            }
        }
        return false;
    },
    initInputBoxMsg: function () {
        var input = Fid(SmartBoxTop.inputBoxId);
        if ('' == input.value.trim()) {
            input.value = SmartBoxTop.inputBoxMsg;
            input.style.color = SmartBoxTop.inputBoxMsgColor;
        }
    },
    openResultBox: function () {
        document.onclick = function () {
            SmartBoxTop.initInputBoxMsg();
            SmartBoxTop.closeResultBox();
            document.onclick = null;
        };
        SmartBoxTop.curItemIdx = -1;
        var input = Fid(SmartBoxTop.inputBoxId);
        if ('' == input.value.trim() || '0' == input.value.trim()) {
            return;
        }
        SmartBoxTop.ajax();
    },
    closeResultBox: function () {
        var resultBox = Fid(SmartBoxTop.resultListBoxId);
        resultBox.style.display = 'none';
        var resultList = Fid(SmartBoxTop.resultListId);
        resultList.innerHTML = '';
    },
    add: function (houseInfo) {
        var input = Fid(SmartBoxTop.inputBoxId);
        if (input.value.trim() == '' || input.value == SmartBoxTop.inputBoxMsg) {
            alert(SmartBoxTop.promptMsg);
            input.focus();
            document.onclick = function () {
                SmartBoxTop.initInputBoxMsg();
                document.onclick = null;
            };
            input.style.color = SmartBoxTop.inputColor;
            input.value = '';
            return;
        }
        add_smartbox_house(houseInfo.houseId, houseInfo.houseName);
        return false;
    },
    addEventSimple: function (obj, evt, fn) {
        if (obj.attachEvent) {
            obj.attachEvent('on' + evt, fn);
        } else if (obj.addEventListener) {
            obj.addEventListener(evt, fn, false);
        }
    },
    init: function () {
        SmartBoxTop.citySubName = Fid('cur_city').value;
        var input = Fid(SmartBoxTop.inputBoxId);
        if (!Fempty(input)) {
            input.onclick = function (event) {
                SmartBoxTop.click(event);
            };
            input.onkeyup = function (event) {
                SmartBoxTop.keyup(event);
            };
        }
        var form = Fid(SmartBoxTop.formId);
        if (!Fempty(form)) {
            form.onsubmit = function () {
                if (-1 != SmartBoxTop.curItemIdx) {
                    var idx = SmartBoxTop.cache[SmartBoxTop.curItemIdx].houseDomain;
                    var houseId = SmartBoxTop.cache[SmartBoxTop.curItemIdx].houseId;
                    if ('' == idx) {
                        idx = houseId;
                    }
                    var url = '//' + SmartBoxTop.domain + '/' + SmartBoxTop.citySubName + '_' + idx + '/';
                    window.open(url);
                } else {
                    SmartBoxTop.search();
                }
                return false;
            };
        }
    },
    search: function () {
        var input = Fid(SmartBoxTop.inputBoxId);
        if (input.value.trim() == '' || input.value == SmartBoxTop.inputBoxMsg) {
            alert(SmartBoxTop.promptMsg);
            input.focus();
            document.onclick = function () {
                SmartBoxTop.initInputBoxMsg();
                document.onclick = null;
            };
            input.style.color = SmartBoxTop.inputColor;
            input.value = '';
            return;
        }
        var inputVal = input.value;
        var reg = new RegExp(SmartBoxTop.filterStr, 'ig');
        inputVal = inputVal.replace(reg, ' ');
        inputVal = inputVal.trim();
        var searchURL = '//' + SmartBoxTop.domain + '/index.php?mod=search&city=' + SmartBoxTop.citySubName + '&all=';
        var url = searchURL + encodeURIComponent(inputVal);
        window.location = url;
        return false;
    },
    checkInput: function () {
        var input = Fid(SmartBoxTop.inputBoxId).value;
        if (!Fempty(SmartBoxTop.cache)) {
            for (var i = 0; i < SmartBoxTop.cache.length; i++) {
                if (input == SmartBoxTop.cache[i].houseName) {
                    return true;
                }
            }
        }
        return false;
    },
    getSelectedHouseInfo: function () {
        if (!Fempty(SmartBoxTop.cache)) {
            if (!Fempty(Fid(SmartBoxTop.inputBoxId))) {
                var val = Fid(SmartBoxTop.inputBoxId).value;
                for (var i = 0; i < SmartBoxTop.cache.length; i++) {
                    if (val == SmartBoxTop.cache[i].houseName) {
                        return SmartBoxTop.cache[i];
                    }
                }
            }
        }
        return null;
    }
};
SmartBoxTop.init();
var HouseRV = {
    cookieName: "wz_houseapp_Reviews2",
    maxStore: 30,
    maxRV: 3,
    expire: 30,
    UITopContainerId: 'history',
    cf: null,
    domain: 'db.house.qq.com',
    initItem: null,
    maxLength: 9,
    timer: null,
    init: function (callback) {
        HouseRV.cf = new FCookieFrame("house_rv_ifame", "/cookie/cookie.shtml", function () {
            callback();
        });
    },
    add_item: function (newItem) {
        HouseRV.initItem = newItem;
    },
    show_rv: function (isnewyouth) {
        HouseRV.cf = new FCookieFrame("house_rv_ifame", "/cookie/cookie.shtml", function () {
            if (!Fempty(HouseRV.initItem)) {
                HouseRV.put(HouseRV.initItem);
            }
            HouseRV._updateTop(isnewyouth);
        });
    },
    show_all: function (callback) {
        HouseRV.cf = new FCookieFrame("house_rv_ifame", "/cookie/cookie.shtml", function () {
            if (!Fempty(HouseRV.initItem)) {
                HouseRV.put(HouseRV.initItem);
            }
            if (typeof callback == "function") {
                callback();
            }
        });
    },
    getItemId: function (item) {
        if (item == null) {
            return null;
        } else {
            return HouseRV.undoStr(item[0]);
        }
    },
    getItemName: function (item) {
        if (item == null) {
            return null;
        } else {
            return HouseRV.undoStr(item[1]);
        }
    },
    getItemSellStatus: function (item) {
        if (item == null) {
            return null;
        } else {
            return HouseRV.undoStr(item[2]);
        }
    },
    getItemDomain: function (item) {
        if (item == null) {
            return null;
        } else {
            return HouseRV.undoStr(item[3]);
        }
    },
    getItemCity: function (item) {
        if (item == null) {
            return null;
        } else {
            return HouseRV.undoStr(item[4]);
        }
    },
    doStr: function (str) {
        str = str.replace(/\|/g, '|');
        str = str.replace(/,/g, ',');
        return str;
    },
    undoStr: function (str) {
        str = str.replace(/|/g, '|');
        str = str.replace(/,/g, ',');
        return str;
    },
    setCookie: function (str) {
        var expires = new Date();
        var t = expires.getTime();
        t += HouseRV.expire * 24 * 60 * 60 * 1000;
        expires.setTime(t);
        Cookie.setCookie(HouseRV.cookieName, str, expires, "/cookie", HouseRV.domain);
    },
    put: function (newItem) {
        var i = 0, isIn = false;
        var rv = HouseRV._get();
        if (!Fempty(newItem)) {
            for (i = 0; i < newItem.length; i++) {
                newItem[i] = HouseRV.doStr(newItem[i]);
            }
        } else {
            return;
        }
        if (rv != null) {
            for (i = 0; i < rv.length; i++) {
                var item = rv[i].split("|");
                if (HouseRV.getItemId(item) == HouseRV.getItemId(newItem)) {
                    isIn = true;
                    break;
                }
            }
            if (isIn) {
                rv.splice(i, 1);
                rv.push(newItem.join("|"));
            } else {
                if (rv.length >= HouseRV.maxStore) {
                    rv.shift();
                }
                rv.push(newItem.join("|"));
            }
        } else {
            rv = [newItem.join("|")];
        }
        HouseRV.setCookie(rv.join(","));
    },
    _get: function () {
        if (Fempty(HouseRV.cf)) {
            return null;
        }
        var rv = HouseRV.cf.getCookie(HouseRV.cookieName);
        return Fempty(rv) ? null : rv.split(",");
    },
    _span_mouseover: function (id) {
        clearTimeout(HouseRV.timer);
        var bb = Fid('history').getElementsByTagName('button');
        for (k = 0; k < bb.length; k++) {
            bb[k].style.visibility = "hidden";
        }
        Fid(id).style.visibility = "visible";
    },
    _mouseout: function (id) {
        HouseRV.timer = setTimeout(function () {
            Fid(id).style.visibility = "hidden";
        }, 100);
    },
    _btn_mouseover: function (id) {
        clearTimeout(HouseRV.timer);
    },
    _updateTop: function (isnewyouth) {
        var ele = Fid(HouseRV.UITopContainerId);
        var html = '��������';
        var rvArray = HouseRV._get();
        var count = 0;
        if (rvArray != null) {
            for (var i = rvArray.length - 1; i >= 0; i--) {
                if (count >= HouseRV.maxRV) {
                    break;
                }
                var item = rvArray[i].split("|");
                var idx = HouseRV.getItemDomain(item);
                var id = HouseRV.getItemId(item);
                if (typeof g_house_info != "undefined" && g_house_info.FId == id) {
                    continue;
                }
                if (Fempty(idx.trim())) {
                    idx = id;
                }
                var name = HouseRV.getItemName(item);
                var showName = name;
                if (_HTMLDeCode(name).length > 9) {
                    showName = _HTMLEnCode(_HTMLDeCode(showName).substr(0, 9)) + '...';
                }
                var city = HouseRV.getItemCity(item);
                if (isnewyouth == 0) {
                    html += '<span><a href="//db.house.qq.com/' + city + '_' + idx + '/" title=' + name + ' target="_blank">' + showName + '</a><span class="adds_link" onclick="addCompareItem(\'' + city + '\',' + id + ',\'' + name + '\',12);">&#160;</span></span>';
                } else {
                    btnid = 'rv_btn_' + id;
                    html += '<span onmouseover="HouseRV._span_mouseover(\'' + btnid + '\');" onmouseout="HouseRV._mouseout(\'' + btnid + '\');"><a href="//db.house.qq.com/' + city + '_' + idx + '/" title=' + name + ' target="_blank">' + showName
                        + '</a> <button id="' + btnid + '" class="btn_db" type="button" style="visibility: hidden;" onclick="addCompareItem(\''
                        + city + '\',' + id + ',\'' + name + '\',12);" onmouseover="HouseRV._btn_mouseover(\'' + btnid + '\');" onmouseout="HouseRV._mouseout(\'' + btnid + '\');">�Ա�</button></span>';
                }
                count++;
            }
            if (html != '��������') {
                ele.innerHTML = html;
            }
        }
    },
    removeHouseById: function (houseId, obj) {
        var rvArray = HouseRV._get();
        var newRvArray = new Array();
        if (rvArray != null) {
            for (var i = 0; i < rvArray.length; i++) {
                var item = rvArray[i].split("|");
                var id = HouseRV.getItemId(item);
                if (id != houseId) {
                    newRvArray[newRvArray.length] = rvArray[i];
                }
            }
        }
        HouseRV.setCookie(newRvArray.join(","));
        var node = obj.parentNode;
        node.parentNode.removeChild(node);
        init_compare_title();
    },
    clearCookie: function () {
        HouseRV.setCookie('');
    }
};
var g_cur_city = null;
var g_compare_num = 4;
var g_cmp_expires = 15;

function get_cur_city() {
    if (typeof g_city_info != "undefined" && g_city_info['FSubName'] != null) {
        g_cur_city = g_city_info['FSubName'];
        return;
    }
    var url = window.location.href;
    url = url.substring(url.indexOf(".com") + 5);
    var end = url.indexOf("_");
    if (end <= 0) {
        end = url.indexOf("/");
    }
    url = url.substring(0, end);
    if (url == "" || url == null) {
        var reg = new RegExp("(^|&)city=([^&]*)(&|$)");
        if (window.location.search.substr(1).match(reg)) {
            g_cur_city = RegExp.$2;
        }
    } else {
        g_cur_city = url;
    }
}

function check_select_num(obj) {
    var houseids = get_check_house();
    if (houseids.length > 4) {
        if (typeof obj != undefined) {
            obj.checked = false;
        }
        open_compare_tip('�ף�������ͬʱ�Ա�4��¥��');
        return false;
    }
}

function get_check_house() {
    var div = document.getElementById("choose");
    var is = div.getElementsByTagName("input");
    var houseid = [];
    for (var i = 0; i < is.length; i++) {
        if (is[i].type == 'checkbox' && is[i].checked == true) {
            houseid.push(is[i].value);
        }
    }
    return houseid;
}

function initCompareBar() {
    var compCookie = Cookie.getCookie("wz_houseapp_compare_new");
    if (compCookie != null) {
        var cookieArr = compCookie.split("||");
        var cur_city = cookieArr[0];
        if (cur_city != g_cur_city || cookieArr[1].length < 2) {
            Cookie.clearCookie("wz_houseapp_compare_new");
            return false;
        }
    }
    var show_houseids = [];
    var compare_select_str = '';
    var compare_history_str = '';
    var url_prefix = '//' + window.location.hostname + '/';
    if (compCookie) {
        var cmp_arr = cookieArr[1].split("|");
        var cmp_len = cmp_arr.length;
        for (var i = 0; i < cmp_len; i++) {
            var house_info = cmp_arr[i].split(",");
            var housename = house_info[0];
            if (housename.length > 10) {
                housename = house_info[0].substr(0, 10);
                housename += '...';
            }
            compare_select_str += '<li><a onclick="removeCompareItem(' + house_info[1] + ',this)" class="del fr" href="javascript:void(0);">ɾ��</a><input checked onclick="return check_select_num(this);" type="checkbox" class="fl" value="' + house_info[1] + '"><a title="' + house_info[0] + '" class="fl" target="_blank" href="' + url_prefix + g_cur_city + '_' + house_info[1] + '">' + housename + '</a></li>';
            show_houseids.push(house_info[1]);
        }
        if (compare_select_str) {
            FId('compare_select_item_title').style.display = 'block';
            FId('compare_select_item').style.display = 'block';
            Fid("compare_select_item").innerHTML = compare_select_str;
        }
    }
    var history_cookie = HouseRV._get();
    history_cookie = history_cookie ? history_cookie : [];
    history_cookie = history_cookie.reverse();
    var history_item_num = 0;
    for (var i = 0; i < history_cookie.length; i++) {
        if (history_item_num >= 4) {
            break;
        }
        var tmp = history_cookie[i].split('||')[0];
        var history_house = tmp.split('|');
        if (array_search(show_houseids, history_house[0]) == -1) {
            var housename = history_house[1];
            if (housename.length > 10) {
                housename = history_house[1].substr(0, 10);
                housename += '...';
            }
            compare_history_str += '<li><a onclick="HouseRV.removeHouseById(' + history_house[0] + ', this)" class="del fr" href="javascript:void(0);">ɾ��</a><input onclick="return check_select_num(this);" type="checkbox" class="fl" value="' + history_house[0] + '"><a title="' + history_house[1] + '" class="fl" target="_blank" href="' + url_prefix + g_cur_city + '_' + history_house[0] + '">' + housename + '</a></li>';
            history_item_num++;
        }
    }
    if (compare_history_str) {
        FId('compare_history_item_title').style.display = 'block';
        FId('compare_history_item').style.display = 'block';
        Fid("compare_history_item").innerHTML = compare_history_str;
    }
    if (!compare_select_str && !compare_history_str) {
        FId('nochoose').style.display = 'block';
    }
}

function addCompareItem(cur_city, h_id, h_name) {
    if (cur_city != g_cur_city) {
        open_compare_tip("��ѡ��ͬһ���е�¥��");
        return false;
    }
    var compare = Cookie.getCookie("wz_houseapp_compare_new");
    if (compare) {
        var cookieArr = compare.split("||");
        var house_arr = new Array();
        if (cookieArr.length >= 2 && cookieArr[0] == g_cur_city && cookieArr[1].length > 2) {
            house_arr = cookieArr[1].split("|");
        }
        var len = house_arr.length;
        if (len >= 4) {
            open_compare_tip('�ף�������4��¥��');
            return false;
        }
        for (var i = 0; i < len; i++) {
            var house_info = house_arr[i].split(",");
            if (house_info[1] == h_id) {
                open_compare_tip("������Ӹ�¥��");
                return;
            }
        }
        house_arr.unshift(h_name + "," + h_id);
        Cookie.setCookie("wz_houseapp_compare_new", g_cur_city + "||" + house_arr.join("|"), get_cmp_expires());
    } else {
        Cookie.setCookie("wz_houseapp_compare_new", g_cur_city + "||" + h_name + "," + h_id, get_cmp_expires());
    }
    initCompareBar();
    Fid('nochoose').style.display = 'none';
    Fid('compare_bar').style.display = 'block';
}

function removeCompareItem(h_id, obj) {
    var compare = Cookie.getCookie("wz_houseapp_compare_new");
    if (compare) {
        var cookieArr = compare.split("||");
        var house_arr = new Array();
        if (cookieArr.length >= 2 && cookieArr[0] == g_cur_city) {
            house_arr = cookieArr[1].split("|");
        }
        var len = house_arr.length;
        var new_house_arr = new Array();
        for (var i = 0; i < len; i++) {
            if (house_arr[i].split(",")[1] != h_id) {
                new_house_arr.push(house_arr[i]);
            }
        }
        if (new_house_arr.length == 0) {
            Cookie.clearCookie("wz_houseapp_compare_new");
        } else {
            Cookie.setCookie("wz_houseapp_compare_new", g_cur_city + "||" + new_house_arr.join("|"), get_cmp_expires());
        }
    }
    var node = obj.parentNode;
    node.parentNode.removeChild(node);
    init_compare_title();
}

function removeAllItem() {
    Cookie.clearCookie("wz_houseapp_compare_new");
    initCompareBar();
}

function init_compare_title() {
    var select_house_item = Fid('compare_select_item').getElementsByTagName('li');
    var history_house_item = Fid('compare_history_item').getElementsByTagName('li');
    if (select_house_item.length == 0) {
        hideElement('compare_select_item');
        hideElement('compare_select_item_title');
    }
    if (history_house_item.length == 0) {
        hideElement('compare_history_item');
        hideElement('compare_history_item_title');
    }
    if (select_house_item.length == 0 && history_house_item.length == 0) {
        showElement('nochoose');
    }
}

function goCompare() {
    var cmp_url = '//db.house.qq.com/' + g_cur_city + '/compare.shtml#cmpstr=';
    var houseids = get_check_house();
    if (houseids.length == 0) {
        return false;
    }
    window.open(cmp_url + houseids.join(","));
}

function get_cmp_expires() {
    var expires = new Date();
    var t = expires.getTime();
    t += g_cmp_expires * 60000;
    expires.setTime(t);
    return expires;
}

get_cur_city();

function openCompare() {
    Fid('floatCom').style.display = 'none';
    Fid('compare_bar').style.display = 'block';
}

function closeCompare() {
    Fid('floatCom').style.display = 'block';
    Fid('compare_bar').style.display = 'none';
}

function FgetPosition(e, isID) {
    if (isID == true)
        e = Fid(e);
    var left = 0, top = 0, w = e.offsetWidth, h = e.offsetHeight;
    do {
        top += e.offsetTop || 0;
        left += e.offsetLeft || 0;
        e = e.offsetParent;
    } while (e);
    return {x: left, y: top, width: w, height: h};
}

(function () {
    function SIPRivalposHeader() {
        var height = (document.documentElement.scrollTop - 150 + document.documentElement.clientHeight / 2) + "px";
        Fid('floatCom').style.top = height;
        Fid('compare_bar').style.top = height;
    };
    if (FBrowser.isIE6) {
        window.attachEvent("onload", SIPRivalposHeader);
        window.attachEvent("onresize", SIPRivalposHeader);
        window.attachEvent("onscroll", SIPRivalposHeader);
    }
    ;
})();

function hide(id) {
    var obj = Fid(id);
    if (obj) {
        obj.style.display = 'none';
    }
}

function show(id) {
    var obj = Fid(id);
    if (obj) {
        obj.style.display = 'block';
    }
}

function load_history() {
    var history_cookie = HouseRV._get();
    history_cookie = history_cookie ? history_cookie : [];
    history_cookie = history_cookie.reverse();
    var hids = [];
    for (var i = 0; i < history_cookie.length; i++) {
        if (i >= 5) {
            break;
        }
        var tmp = history_cookie[i].split('||')[0];
        var history_house = tmp.split('|');
        hids.push(history_house[0]);
    }
    FJsLoader.load('history' + (new Date * 1), "/index.php?mod=homepage&act=history&hids=" + hids.join(","), function () {
        var history_arr = [];
        if (history_json.code == 0) {
            var data = history_json.data;
            if (data.length == 0) {
                Fid('history_container').style.display = 'none';
                return;
            }
            var len = data.length;
            for (var i = 0; i < len; i++) {
                if (i > 4) {
                    break;
                }
                var classname1 = '', classname2 = 'undis';
                if (i == 0) {
                    classname1 = 'on';
                    classname2 = '';
                }
                var host = window.location.host;
                var url = '//' + host + '/' + data[i].citysubname + "_" + data[i].id + "/";
                var housename = (data[i].name).substr(0, 6);
                if ((data[i].name).length > 7) {
                    housename += "...";
                }
                style = '';
                if ((data[i].shortdiscount && !data[i].featurename) || (!data[i].shortdiscount && data[i].featurename)) {
                    style = 'style="margin-top:14px;"';
                }
                var youhui = '<li ' + style + '>�Żݣ�' + data[i].shortdiscount + '</li>';
                if (!data[i].shortdiscount) {
                    youhui = '';
                }
                var tese = '<li ' + style + '>��ɫ��' + data[i].featurename + '</li>';
                if (!data[i].featurename) {
                    tese = '';
                }
                data[i].cover = data[i].cover ? data[i].cover : '//mat1.gtimg.com/house/datalib/search/no_pic.gif';
                data[i].businessname = data[i].businessname ? data[i].businessname : '&#160;';
                history_arr.push('<dt class="' + classname1 + '">\
                    <ul class="cf">\
                        <li class="name fl">\
                        <a title="' + data[i].name + '" href="' + url + '" target="_blank" bosszone= "boss1858,shistory">' + housename + '</a></li>\
                        <li class="area fl">' + data[i].businessname + '</li>\
                        <li class="price fr">\
                            <em>' + data[i].price + '</em>\
                        </li>\
                    </ul>\
                </dt>\
                <dd  class="' + classname2 + '">\
                    <div class="box2 cf">\
                        <a href="' + url + '" target="_blank" class="fl">\
                            <img src="' + data[i].cover + '" bosszone = "boss1858,shistory">\
                        </a>\
                        <ul class="fl">' + youhui + tese + '</ul>\
                    </div>\
                </dd>');
            }
            var history_html = '\
            <h2 class="yh">������������¥��</h2>\
            <ul class="tMenu yh cf">\
                <li class="name fl">¥������</li>\
                <li class="area fl">��������</li>\
                <li class="price fr">���±���</li>\
            </ul>\
            <dl id="history_record">' + history_arr.join("") + '</dl>';
            Fid('history_container').innerHTML = history_html;
        } else {
            Fid('history_container').innerHTML = '���س�����ˢ��ҳ������';
        }
        var time_flag = null;
        var yhMod = Fid("history_record");
        var dts = yhMod.getElementsByTagName('dt');
        var dds = yhMod.getElementsByTagName('dd');
        for (var i = 0, len1 = dts.length; i < len1; i++) {
            (function (i) {
                dts[i].onmouseover = function () {
                    time_flag = setTimeout(function () {
                        for (var j = 0; j < len1; j++) {
                            dts[j].className = "";
                            dds[j].className = "undis";
                        }
                        dts[i].className = "on";
                        dds[i].className = "";
                        clearTimeout(time_flag);
                        time_flag = null;
                    }, 100);
                }
            })(i)
        }
    });
}

HouseRV.init(function () {
    load_history();
    initCompareBar();
});

function getByClass(oParent, sClass) {
    var aTmp = [], aEle = oParent.getElementsByTagName('*');
    for (var i = 0, l = aEle.length; i < l; i++) {
        if (aEle[i].className.indexOf(sClass) != -1) {
            aTmp.push(aEle[i]);
        }
    }
    return aTmp;
}

function setImg(dom, tagName) {
    var img = dom.getElementsByTagName(tagName)[0];
    var srcurl = img.getAttribute("_src");
    if (srcurl) {
        img.src = srcurl;
        img.removeAttribute('_src');
    }
}

if (Fempty(g_housetype_spec)) {
    var g_housetype_spec = '';
}
var g_search_condition_map = {
    'region': 'CA',
    'business': 'CA',
    'priceseg': 'NA',
    'housetype': 'CF',
    'sellstatus': 'ND',
    'unit': 'CG',
    'feature': 'CB',
    'opendate': 'NC',
    'buildtype': 'CC',
    'position': 'NE',
    'subway': 'CD',
    'station': 'CJ',
    'subway_distance': 'CK'
};

function getSosoParam(searchCondition) {
    var type = searchCondition.substr(searchCondition.length - 1, 1);
    searchCondition = searchCondition.substr(0, searchCondition.length - 1);
    return g_search_condition_map[searchCondition] + '' + type;
}

function checkPriceSegInput(startId, endId) {
    var startPrice = Fid(startId).value;
    var endPrice = Fid(endId).value;
    if ((startPrice != parseInt(startPrice)) || (endPrice != parseInt(endPrice)) || (parseInt(startPrice) > parseInt(endPrice) || parseInt(endPrice) > 9999999)) {
        alert('��������ȷ�ļ۸�');
        return false;
    }
    return true;
}

var g_search_condition_id_prefix = 'search_condition_';
var g_search_condition_customer_replacement = '';
var g_search_condition_customer_search = 'input_submit';

function searchCondition(condition_id, search_val) {
    this.condition_id = condition_id;
    this.id = condition_id.replace(g_search_condition_id_prefix, '');
    this.search_val = search_val;
    this.is_customer_search = false;
    this.parenttype = '';
    if (!Fempty(Fid(this.condition_id)) && !FEmpty(Fid(this.condition_id).attributes["parenttype"])) {
        this.parenttype = Fid(this.condition_id).attributes["parenttype"].value;
    }
    if (this.condition_id.indexOf(g_search_condition_customer_search) != -1) {
        this.is_customer_search = true;
        this.id = this.id.replace(g_search_condition_customer_search, g_search_condition_customer_replacement);
    }
    var t = this.id.split('_');
    this.val = t[t.length - 1];
    t.splice(t.length - 1, 1);
    this.type = t.join('_');
    if (this.is_customer_search) {
        var startPrice = parseInt(Fid(g_search_condition_id_prefix + this.type + '_input_start').value);
        var endPrice = parseInt(Fid(g_search_condition_id_prefix + this.type + '_input_end').value);
        if (startPrice == endPrice) {
            this.txt = startPrice + 'Ԫ';
        } else {
            this.txt = startPrice + '-' + endPrice + 'Ԫ';
        }
    } else {
        if (this.type == 'all') {
            this.txt = this.search_val;
        } else {
            this.txt = Fid(condition_id).innerHTML;
        }
    }
    this.showtype = this.type.charAt(this.type.length - 1);
    this.real_type = this.type.substr(0, this.type.length - 1);
    this.selectedList = g_selected_search_condition_list;
}

searchCondition.prototype = {
    select: function () {
        var realtype = this.type.substr(0, this.type.length - 1);
        switch (realtype) {
            case'region':
                if (!Fempty(Fid(g_cur_business_id))) {
                    Fid(g_cur_business_id).className = 'none';
                }
                if (!Fempty(Fid(g_cur_business_container_id))) {
                    Fid(g_cur_business_container_id).style.display = 'none';
                }
                var business_id = 'search_condition_region_business' + this.showtype + '_' + this.val;
                g_cur_business_container_id = business_id;
                if (!Fempty(Fid(business_id))) {
                    Fid(business_id).style.display = 'block';
                }
                break;
            case'subway':
                if (!Fempty(Fid(g_cur_station_id))) {
                    Fid(g_cur_station_id).className = 'none';
                }
                if (!Fempty(Fid(g_cur_station_container_id))) {
                    Fid(g_cur_station_container_id).style.display = 'none';
                }
                var subwaystation_id = 'search_condition_subway_station' + this.showtype + '_' + this.val;
                g_cur_station_container_id = subwaystation_id;
                if (!Fempty(Fid(subwaystation_id))) {
                    Fid(subwaystation_id).style.display = 'block';
                }
                var hash_name = getSosoParam('station' + this.showtype);
                var hash_value = '';
                updateHashString(hash_name, hash_value);
                break;
            case'business':
                if (!Fempty(Fid(g_cur_business_id))) {
                    Fid(g_cur_business_id).className = 'none';
                }
                g_cur_business_id = this.condition_id;
                if (!Fempty(Fid(g_cur_business_id))) {
                    Fid(g_cur_business_id).className = 'on';
                }
                var item = g_selected_search_condition_list.getItemByType('region' + this.showtype);
                item.txt = Fid(item.condition_id).innerHTML;
                if (!Fempty(item)) {
                    item.txt += this.txt;
                }
                g_selected_search_condition_list.show();
                return false;
                break;
            case'station':
                if (!Fempty(Fid(g_cur_station_id))) {
                    Fid(g_cur_station_id).className = 'none';
                }
                g_cur_station_id = this.condition_id;
                if (!Fempty(Fid(g_cur_station_id))) {
                    Fid(g_cur_station_id).className = 'on';
                }
                var item = g_selected_search_condition_list.getItemByType('subway' + this.showtype);
                item.txt = Fid(item.condition_id).innerHTML;
                if (!Fempty(item)) {
                    item.txt += this.txt;
                }
                g_selected_search_condition_list.show();
                return false;
                break;
        }
        if (this.is_customer_search) {
        } else {
            Fid(this.condition_id).className = 'on';
        }
        var condition_id = g_selected_search_condition_list.removeSearchType(this.type);
        if (condition_id) {
            var t = new searchCondition(condition_id);
            if (!t.is_customer_search) {
                Fid(condition_id).className = '';
            }
        }
        if (this.val == 'default' && this.type != 'all') {
        } else {
            g_selected_search_condition_list.add(this);
            var default_html_id = g_search_condition_id_prefix + this.type + '_default';
            if (!Fempty(Fid(default_html_id))) {
                Fid(default_html_id).className = '';
            }
        }
        g_selected_search_condition_list.show();
    }
};
var g_choosed_search_condition = false;

function selectedSearchConditionList() {
    this.list = [];
    this.htmlPrefix = 'selected_search_condition_';
    this.containerId = 'selected_search_condition_container';
}

selectedSearchConditionList.prototype = {
    removeParentType: function (parenttype) {
        var len = this.list.length;
        var item = null;
        for (var i = 0; i < len; i++) {
            item = this.list[i];
            if (item.parenttype == parenttype) {
                this.list.splice(i, 1);
                return item.condition_id;
            }
        }
        return null;
    }, removeSearchType: function (type) {
        var len = this.list.length;
        var item = null;
        for (var i = 0; i < len; i++) {
            item = this.list[i];
            if (item.type == type) {
                this.list.splice(i, 1);
                return item.condition_id;
            }
        }
        return null;
    }, add: function (searchConditionObj) {
        this.list.push(searchConditionObj);
    }, getItemByType: function (type) {
        var len = this.list.length;
        var item = null;
        for (var i = 0; i < len; i++) {
            item = this.list[i];
            if (item.type == type) {
                return item;
            }
        }
        return null;
    }, contain: function (condition_id) {
        var len = this.list.length;
        for (var i = 0; i < len; i++) {
            var item = this.list[i];
            if (item.condition_id == condition_id) {
                return true;
            }
        }
        return false;
    }, remove: function (id) {
        id = id.replace(this.htmlPrefix, '');
        if (id == 'all_default') {
            updateHashString('all', '');
        }
        var len = this.list.length;
        for (var i = 0; i < len; i++) {
            var item = this.list[i];
            if (item.id == id) {
                this.list.splice(i, 1);
                break;
            }
        }
        if (FEmpty(item)) {
            return false;
        }
        if (!item.is_customer_search) {
            Fid(item.condition_id).className = '';
        }
        Fid(g_search_condition_id_prefix + item.type + '_default').className = 'on';
        switch (item.real_type) {
            case'region':
                if (!Fempty(Fid(g_cur_business_container_id))) {
                    Fid(g_cur_business_container_id).style.display = 'none';
                }
                g_cur_business_container_id = '';
                if (!Fempty(Fid(g_cur_business_id))) {
                    Fid(g_cur_business_id).className = '';
                }
                g_cur_business_id = '';
                break;
            case'subway':
                if (!Fempty(Fid(g_cur_station_container_id))) {
                    Fid(g_cur_station_container_id).style.display = 'none';
                }
                g_cur_station_container_id = '';
                if (!Fempty(Fid(g_cur_station_id))) {
                    Fid(g_cur_station_id).className = '';
                }
                g_cur_station_id = '';
                var hash_name = getSosoParam('station' + item.showtype);
                var hash_value = '';
                updateHashString(hash_name, hash_value);
                break;
        }
        hash_name = getSosoParam(item.type);
        hash_value = '';
        updateHashString(hash_name, hash_value);
        get_concern_list(get_ajax_param_map());
        var search_url = '//' + g_domain + "/index.php?mod=search&act=newsearch&city=" + g_city_info.FSubName + '&' + get_ajax_param_map();
        FJsLoader.load('search_result', search_url, update_search_result);
    }, show: function () {
        var html = this.getHTML();
        Fid(this.containerId).innerHTML = html;
        if (Fempty(html)) {
            g_choosed_search_condition = false;
            update_last_bottom_line();
            Fid('selected_search_condition_wrap').style.display = 'none';
        } else {
            g_choosed_search_condition = true;
            update_last_bottom_line();
            Fid('selected_search_condition_wrap').style.display = 'block';
        }
    }, getHTMLId: function (id) {
        return this.htmlPrefix + id;
    }, getHTML: function () {
        var len = this.list.length;
        var html = '';
        for (var i = 0; i < len; i++) {
            var item = this.list[i];
            if (g_showtype == item.showtype || item.type == 'all') {
                html += '<li class="cf">'
                    + '<a id="' + this.getHTMLId(item.id) + '" style="cursor:pointer;" class="ico closeTerm" onclick="g_selected_search_condition_list.remove(\'' + this.getHTMLId(item.id) + '\');g_selected_search_condition_list.show();return false;"></a>'
                    + item.txt
                    + '</li>';
            }
        }
        return html;
    }
};
var g_selected_search_condition_list = new selectedSearchConditionList();

function get_default_search_condition_id(condition_id) {
    return condition_id.replace(/\_[0-9]+$/, '_default');
}

var g_search_order = 0;
var g_page_no = 1;
var g_domain = 'db.house.qq.com';
var g_cur_business_container_id = '';
var g_cur_station_container_id = '';
var g_cur_business_id = '';
var g_cur_station_id = '';
var g_cur_distance_condition_id = '';

function update_search_result() {
    if (typeof (pgvMain) == 'function') {
        pvRepeatCount = 1;
        var rf = get_param('rf');
        if (rf == "bsem") {
            var colSite = window.location.host.replace(/.qq.com$/, '').replace(/\./g, '-');
            var pgvInfo = "L." + colSite + ".bpgv-" + rf + ".bpgv-" + g_city_info.FSubName + ".bpgv-search";
            pgvMain({pgUserType: pgvInfo});
        } else {
            pgvMain();
        }
    }
    if (typeof search_result != 'undefined') {
        Fid('search_result_list').innerHTML = search_result;
    }
    if (typeof search_result_list_num != 'undefined') {
        Fid('search_result_num').innerHTML = search_result_list_num;
    }
}

function getCoords(el) {
    if (typeof el == 'string') {
        el = Fid(el);
    }
    var box = el.getBoundingClientRect(), doc = el.ownerDocument, body = doc.body, html = doc.documentElement,
        clientTop = html.clientTop || body.clientTop || 0, clientLeft = html.clientLeft || body.clientLeft || 0,
        top = box.top
            + (self.pageYOffset || html.scrollTop || body.scrollTop)
            - clientTop, left = box.left
        + (self.pageXOffset || html.scrollLeft || body.scrollLeft)
        - clientLeft
    return {'top': top, 'left': left};
};

function getAbsPoint(e) {
    if (typeof e == 'string') {
        e = Fid(e);
    }
    var x = e.offsetLeft;
    var y = e.offsetTop;
    var de = document.documentElement;
    while (e = e.offsetParent) {
        x += e.offsetLeft;
        y += e.offsetTop;
        if (e && e != de && !FBrowser.isOpera) {
            x += e.clientLeft;
            y += e.clientTop;
        }
        alert(e.tagName);
    }
    return {"left": x, "top": y};
}

function goToTop() {
    var eletop = getCoords(Fid('search_result_list')).top;
    var status = Fid('selected_search_condition_wrap').style.display;
    var other = 0;
    if (FBrowser.isIE6 || FBrowser.isIE7) {
        other = 6;
    }
    var top;
    if (status == 'block') {
        top = eletop - 143 + other;
    } else {
        top = eletop - 69 + other;
    }
    document.documentElement.scrollTop = document.body.scrollTop = top;
}

function search_by_condition(condition_id, condition, order, page, unit) {
    var hash_name = '';
    var hash_value = '';
    condition = Fempty(condition) ? '' : condition;
    if (typeof order != 'undefined' && !Fempty(order)) {
        switch (condition_id) {
            case'search_order_default':
                g_search_order = 0;
                Fid('search_order_default').parentNode.className = 'fl m aOnColor';
                Fid('search_order_price').parentNode.className = 'price ico fl pDown';
                Fid('search_order_opendate').parentNode.className = 'time ico fl';
                searchUpBoss("orderpage", 1686);
                break;
            case'search_order_price':
                if (g_search_order == 10) {
                    g_search_order = 11;
                    Fid('search_order_price').parentNode.className = 'price ico fl pDown aOnColor';
                    Fid('search_order_opendate').parentNode.className = 'time ico fl';
                    Fid('search_order_default').parentNode.className = 'fl m';
                } else {
                    g_search_order = 10;
                    Fid('search_order_price').parentNode.className = 'price ico fl aOnColor';
                    Fid('search_order_opendate').parentNode.className = 'time ico fl';
                    Fid('search_order_default').parentNode.className = 'fl m';
                }
                searchUpBoss("sellprice", 1686);
                break;
            case'search_order_opendate':
                if (g_search_order == 6) {
                    g_search_order = 5;
                    Fid('search_order_opendate').parentNode.className = 'time ico fl aOnColor';
                    Fid('search_order_price').parentNode.className = 'price ico fl pDown';
                    Fid('search_order_default').parentNode.className = 'fl m';
                } else {
                    g_search_order = 6;
                    Fid('search_order_opendate').parentNode.className = 'time ico fl tDown aOnColor';
                    Fid('search_order_price').parentNode.className = 'price ico fl pDown';
                    Fid('search_order_default').parentNode.className = 'fl m';
                }
                searchUpBoss("opentime", 1686);
                break;
        }
        updateHashString('page', 1);
        g_page_no = 1;
        updateHashString('st', g_search_order);
    } else if (typeof page != 'undefined' && !Fempty(page)) {
        updateHashString('page', page);
        g_page_no = page;
    } else {
        if (typeof unit == 'undefined' || Fempty(unit)) {
            unit = 1;
        }
        unit = parseInt(unit);
        updateHashString('unit', unit);
        g_selected_search_condition_list.removeSearchType('all');
        updateHashString('all', '');
        var is_customer_priceseg = false;
        if (condition_id == 'search_condition_priceseg' + g_showtype + '_input_submit') {
            is_customer_priceseg = true;
            if (!checkPriceSegInput('search_condition_priceseg' + g_showtype + '_input_start', 'search_condition_priceseg' + g_showtype + '_input_end')) {
                return false;
            }
            condition = parseInt(Fid('search_condition_priceseg' + g_showtype + '_input_start').value) + ':' + parseInt(Fid('search_condition_priceseg' + g_showtype + '_input_end').value);
        }
        if (g_selected_search_condition_list.contain(condition_id) && !is_customer_priceseg) {
            return false;
        }
        var sc = new searchCondition(condition_id, condition);
        sc.select();
        hash_name = getSosoParam(sc.type);
        if (sc.val != 'default') {
            hash_value = condition + '$' + sc.val;
        } else {
            switch (sc.real_type) {
                case'region':
                    if (!Fempty(Fid(g_cur_business_container_id))) {
                        Fid(g_cur_business_container_id).style.display = 'none';
                    }
                    g_cur_business_container_id = '';
                    if (!Fempty(Fid(g_cur_business_id))) {
                        Fid(g_cur_business_id).className = '';
                    }
                    g_cur_business_id = '';
                    break;
                case'subway':
                    if (!Fempty(Fid(g_cur_station_container_id))) {
                        Fid(g_cur_station_container_id).style.display = 'none';
                    }
                    g_cur_station_container_id = '';
                    if (!Fempty(Fid(g_cur_station_id))) {
                        Fid(g_cur_station_id).className = '';
                    }
                    g_cur_station_id = '';
                    break;
            }
            hash_value = '';
        }
        updateHashString('page', 1);
        g_page_no = 1;
        updateHashString(hash_name, hash_value);
    }
    get_concern_list(get_ajax_param_map());
    bossSendTop(hash_name.replace(/\d+/g, ''));
    bossSendTopNew(hash_name);
    searchTop(hash_name.replace(/\d+/g, ''));
    var search_url = '//' + g_domain + "/index.php?mod=search&act=newsearch&city=" + g_city_info.FSubName + '&' + get_ajax_param_map();
    FJsLoader.load('search_result', search_url, update_search_result);
    if (page > 0) {
        goToTop();
    }
    return false;
}

function init_search() {
    var pageurl = window.location.href;
    if (pageurl.indexOf("undefined") != -1) {
        window.location.href = pageurl.replace(/undefined/g, '');
        return false;
    }
    var all_search_condition = '';
    all_search_condition += get_ajax_param_map_with_id();
    all_search_condition = all_search_condition.split('&');
    var subway_condition_id = null;
    var subway_search_value = null;
    var distance_search_value = null;
    var station_condition_id = null;
    var station_search_value = null;
    var distance_condition_id = null;
    var len = all_search_condition.length;
    var search_condition_list = [];
    var focus_region_id = '';
    var focus_subway_id = '';
    var focus_distance_id = '';
    for (var i = 0; i < len; i++) {
        var search_condition = all_search_condition[i];
        search_condition = search_condition.split('=');
        if (search_condition.length == 2) {
            var param = search_condition[0];
            var param_val = search_condition[1];
            if (Fempty(param_val)) {
                continue;
            }
            var t = param_val;
            t = t.split('$');
            var search_value = t[0];
            var value = t[1];
            var type = get_search_type_by_param(param);
            if (!Fempty(type)) {
                var showtype = param.charAt(param.length - 1);
                var real_param = param.substr(0, param.length - 1);
                if (value == g_search_condition_customer_replacement) {
                    Fid('search_condition_priceseg' + showtype + '_input_start').value = parseInt(search_value.split(':')[0]);
                    Fid('search_condition_priceseg' + showtype + '_input_end').value = parseInt(search_value.split(':')[1]);
                    var condition_id = g_search_condition_id_prefix + type + '_' + g_search_condition_customer_search;
                } else {
                    switch (real_param) {
                        case'CA':
                            var city_region_business = search_value;
                            city_region_business = city_region_business.split(':');
                            var region_id = city_region_business[1];
                            focus_region_id = region_id;
                            var condition_id = g_search_condition_id_prefix + 'region' + showtype + '_' + region_id;
                            var one_search_condition = new searchCondition(condition_id, search_value);
                            one_search_condition.select();
                            var business_container_id = 'search_condition_region_business' + showtype + '_' + region_id;
                            if (!Fempty(Fid(business_container_id))) {
                                Fid(business_container_id).style.display = 'block';
                            }
                            if (city_region_business.length == 3) {
                                var business_id = city_region_business[2];
                                condition_id = g_search_condition_id_prefix + 'business' + showtype + '_' + business_id;
                                one_search_condition = new searchCondition(condition_id, search_value);
                                one_search_condition.select();
                            }
                            condition_id = '';
                            break;
                        case'CD':
                            subway_condition_id = g_search_condition_id_prefix + type + '_' + value;
                            focus_subway_id = value;
                            subway_search_value = search_value;
                            condition_id = '';
                            break;
                        case'CJ':
                            station_condition_id = g_search_condition_id_prefix + type + '_' + value;
                            station_search_value = search_value
                            condition_id = '';
                            break;
                        case'CK':
                            distance_condition_id = g_search_condition_id_prefix + 'subway_distance2' + '_' + value;
                            focus_distance_id = value;
                            distance_search_value = search_value;
                            condition_id = '';
                            break;
                        default:
                            var condition_id = g_search_condition_id_prefix + type + '_' + value;
                            break;
                    }
                }
                if (Fempty(Fid(condition_id))) {
                    continue;
                }
                var one_search_condition = new searchCondition(condition_id, search_value);
                one_search_condition.select();
            } else {
                switch (param) {
                    case'all':
                        var all_value = Fid('search_condition_all_default').value;
                        if (!Fempty(param_val) && !Fempty(all_value)) {
                            var one_search_condition = new searchCondition('search_condition_all_default', all_value);
                            one_search_condition.select();
                        }
                        break;
                    case'sm':
                        if (param_val == 1) {
                            showmore();
                        }
                        break;
                    case'st':
                        switch (search_value) {
                            case'3':
                                Fid('search_order_price').parentNode.className = 'price ico fl';
                                break;
                            case'6':
                                Fid('search_order_opendate').parentNode.className = 'time ico fl tDown';
                                break;
                        }
                        break;
                    case'page':
                        break;
                    case'showtype':
                        g_showtype = param_val;
                        if (!Fid('search_condition_subway_tab') && g_showtype == 2) {
                            g_showtype = 1;
                        }
                        if (g_showtype == 1) {
                            Fid('search_condition_tab_region') && (Fid('search_condition_tab_region').style.display = 'block');
                            Fid('search_condition_tab_subway') && (Fid('search_condition_tab_subway').style.display = 'none');
                            Fid('search_condition_showmore') && (Fid('search_condition_showmore').style.display = 'block');
                            Fid('search_condition_subway_tab') && (Fid('search_condition_subway_tab').className = '');
                            Fid('search_condition_region_tab') && (Fid('search_condition_region_tab').className = 'ico on');
                        } else if (g_showtype == 2) {
                            Fid('search_condition_tab_region') && (Fid('search_condition_tab_region').style.display = 'none');
                            Fid('search_condition_tab_subway') && (Fid('search_condition_tab_subway').style.display = 'block');
                            Fid('search_condition_showmore') && (Fid('search_condition_showmore').style.display = 'none');
                            Fid('search_condition_subway_tab') && (Fid('search_condition_subway_tab').className = 'ico on');
                            Fid('search_condition_region_tab') && (Fid('search_condition_region_tab').className = '');
                        }
                        break;
                }
            }
        }
    }
    if (!Fempty(Fid(subway_condition_id))) {
        var one_search_condition = new searchCondition(subway_condition_id, subway_search_value);
        one_search_condition.select();
        var subway_station_id = 'search_condition_subway_station_' + value;
        if (!Fempty(Fid(subway_station_id))) {
            Fid(subway_station_id).style.display = 'block';
            g_cur_station_container_id = subway_station_id;
        }
        if (!Fempty(station_search_value)) {
            var hash_name = getSosoParam('station2');
            var hash_value = station_search_value + '$' + station_search_value;
            updateHashString(hash_name, hash_value);
        }
        if (!Fempty(Fid(station_condition_id))) {
            g_cur_station_id = station_condition_id;
            var one_search_condition = new searchCondition(station_condition_id, station_search_value);
            one_search_condition.select();
        }
    }
    if (!Fempty(Fid(distance_condition_id))) {
        g_cur_distance_condition_id = distance_condition_id;
        var one_search_condition = new searchCondition(distance_condition_id, distance_search_value);
        one_search_condition.select();
        var hash_name = getSosoParam('subway_distance2');
        updateHashString(hash_name, distance_search_value + '$' + distance_search_value);
    }
    if (g_showtype == 2) {
        document.title = '¥������_������ѯ_��Ѷ����';
    } else {
        document.title = '¥������_�����ѯ_��Ѷ����';
    }
    var hash_name = 'showtype';
    var hash_value = g_showtype;
    updateHashString(hash_name, hash_value);
    get_concern_list(get_ajax_param_map());
    var search_url = '//' + g_domain + "/index.php?mod=search&act=newsearch&city=" + g_city_info.FSubName + '&' + get_ajax_param_map();
    FJsLoader.load('search_result', search_url, update_search_result);
    var focus_url = '//' + g_domain + "/index.php?mod=search&";
    return false;
}

function get_search_type_by_param(param) {
    var showtype = param.charAt(param.length - 1);
    param = param.substr(0, param.length - 1);
    for (var con in g_search_condition_map) {
        var t = g_search_condition_map[con];
        if (param == t) {
            return con + showtype;
        }
    }
    return null;
}

var g_showtype = 1;

function changeSearchConditionTab(tab_id) {
    if (g_showtype == 1 && tab_id == 2) {
        Fid('search_condition_tab_region').style.display = 'none';
        Fid('search_condition_tab_subway').style.display = 'block';
        Fid('search_condition_showmore').style.display = 'none';
        Fid('search_condition_subway_tab').className = 'ico on';
        Fid('search_condition_region_tab').className = '';
        g_showtype = 2;
        var hash_name = 'showtype';
        var hash_value = g_showtype;
        updateHashString(hash_name, hash_value);
        g_selected_search_condition_list.show();
        get_concern_list(get_ajax_param_map());
        var search_url = '//' + g_domain + "/index.php?mod=search&act=newsearch&city=" + g_city_info.FSubName + '&' + get_ajax_param_map();
        FJsLoader.load('search_result', search_url, update_search_result);
        document.title = '¥������_������ѯ_��Ѷ����';
        searchUpBoss("searchbytraffic", 1686);
    } else if (g_showtype == 2 && tab_id == 1) {
        Fid('search_condition_tab_region').style.display = 'block';
        Fid('search_condition_tab_subway').style.display = 'none';
        Fid('search_condition_showmore').style.display = 'block';
        Fid('search_condition_subway_tab').className = '';
        Fid('search_condition_region_tab').className = 'ico on';
        g_showtype = 1;
        var hash_name = 'showtype';
        var hash_value = g_showtype;
        updateHashString(hash_name, hash_value);
        get_concern_list(get_ajax_param_map());
        g_selected_search_condition_list.show();
        var search_url = '//' + g_domain + "/index.php?mod=search&act=newsearch&city=" + g_city_info.FSubName + '&' + get_ajax_param_map();
        FJsLoader.load('search_result', search_url, update_search_result);
        document.title = '¥������_�����ѯ_��Ѷ����';
        searchUpBoss("searchbyarea", 1686);
    }
}

var g_is_showmore = false;

function update_last_bottom_line() {
    if (g_is_showmore) {
        if (g_choosed_search_condition) {
            Fid('search_condition_container_position').className = 'cf';
            if (g_showtype == 1) {
                Fid('search_condition_container_position').className = 'cf openBottom';
            }
        } else {
            if (g_showtype == 1) {
                Fid('search_condition_container_position').className = 'cf openBottom';
            }
        }
        Fid('search_condition_container_sellstatus').className = 'cf';
    } else {
        Fid('search_condition_container_sellstatus').className = 'cf openBottom';
    }
}

function showmore() {
    Fid('selected_search_condition_wrap').style.paddingTop = '30px';
    g_is_showmore = true;
    update_last_bottom_line();
    Fid('showmore').style.display = 'none';
    Fid('showless').style.display = 'block';
    Fid('search_condition_container_unit').style.display = 'block';
    Fid('search_condition_container_feature').style.display = 'block';
    Fid('search_condition_container_opendate').style.display = 'block';
    Fid('search_condition_container_buildtype').style.display = 'block';
    Fid('search_condition_container_position').style.display = 'block';
    updateHashString('sm', 1);
    searchUpBoss("showmore", 1686);
}

function showless() {
    Fid('selected_search_condition_wrap').style.paddingTop = '20px';
    g_is_showmore = false;
    update_last_bottom_line();
    Fid('showmore').style.display = 'block';
    Fid('showless').style.display = 'none';
    Fid('search_condition_container_unit').style.display = 'none';
    Fid('search_condition_container_feature').style.display = 'none';
    Fid('search_condition_container_opendate').style.display = 'none';
    Fid('search_condition_container_buildtype').style.display = 'none';
    Fid('search_condition_container_position').style.display = 'none';
    updateHashString('sm', 0);
    searchUpBoss("closemore", 1686);
}

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
    var returnVal, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    returnVal = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            returnVal += base64EncodeChars.charAt(c1 >> 2);
            returnVal += base64EncodeChars.charAt((c1 & 0x3) << 4);
            returnVal += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            returnVal += base64EncodeChars.charAt(c1 >> 2);
            returnVal += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            returnVal += base64EncodeChars.charAt((c2 & 0xF) << 2);
            returnVal += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        returnVal += base64EncodeChars.charAt(c1 >> 2);
        returnVal += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        returnVal += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        returnVal += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return returnVal;
}

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, returnVal;
    len = str.length;
    i = 0;
    returnVal = "";
    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        returnVal += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return returnVal;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        returnVal += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return returnVal;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        returnVal += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return returnVal;
}

function HashMap() {
    this.length = 0;
    this.prefix = "hashmap_prefix_qq_house";
}

HashMap.prototype.isset = function (key) {
    return this[this.prefix + key] != undefined ? true : false;
}
HashMap.prototype.put = function (key, value) {
    this[this.prefix + key] = value;
    this.length++;
}
HashMap.prototype.get = function (key) {
    for (var strKey in this) {
        if (strKey == this.prefix + key)
            return this[strKey];
    }
}
HashMap.prototype.remove = function (key) {
    this.length--;
    delete this[this.prefix + key];
}
HashMap.prototype.toString = function (cbDealVal) {
    var str = "";
    var replaceStr = null;
    for (var strKey in this) {
        if (strKey.substring(0, this.prefix.length) == this.prefix) {
            if (typeof cbDealVal != 'undefined') {
                var t = cbDealVal(this[strKey]);
            } else {
                var t = this[strKey];
            }
            replaceStr = this[strKey];
            str += "&" + strKey.substring(this.prefix.length) + "="
                + t;
        }
    }
    return str;
}
HashMap.prototype.gethash = function () {
    var str = "";
    var replaceStr = null;
    for (var strKey in this) {
        if (strKey.substring(0, this.prefix.length) == this.prefix) {
            replaceStr = this[strKey];
            str += "-" + strKey.substring(this.prefix.length) + "_"
                + this[strKey];
        }
    }
    str = base64encode(str);
    return str;
}
QueryHrefString = function (str, maps) {
    if (!Fempty(g_init_query_param)) {
        for (var i in g_init_query_param) {
            if (!maps.isset(i) && g_init_query_param[i] != "add" && typeof (g_init_query_param[i]) != "function") {
                maps.put(i, g_init_query_param[i]);
            }
        }
    }
    var name, value, i;
    var tmp = str.indexOf("#");
    if (tmp >= 0) {
        str = str.substr(0, tmp);
    }
    var num = str.indexOf("?");
    str = str.substr(num + 1);
    var arrtmp = str.split("&");
    for (i = 0; i < arrtmp.length; i++) {
        num = arrtmp[i].indexOf("=");
        if (num > 0) {
            name = arrtmp[i].substring(0, num);
            value = arrtmp[i].substr(num + 1);
            if (!maps.isset(name) && !g_init_query_param[name]) {
                maps.put(name, value);
            }
        }
    }
}
QueryHashString = function (str, maps) {
    try {
        var name, value, i;
        str = str.replace(new RegExp("#", "gm"), "");
        str = base64decode(str);
        var arrtmp = str.split("-");
        for (i = 0; i < arrtmp.length; i++) {
            num = arrtmp[i].indexOf("_");
            if (num > 0) {
                name = arrtmp[i].substring(0, num);
                value = arrtmp[i].substr(num + 1);
                maps.put(name, value);
            }
        }
    } catch (e) {
        alert("��������,����ȷ�Ϻ�,�ύ");
        return;
    }
}
updateHashString = function (newname, newvalue) {
    var maps = new HashMap();
    try {
        var name, value, i;
        var str = location.hash;
        if (str) {
            str = str.replace(new RegExp("#", "gm"), "");
            str = base64decode(str);
            var arrtmp = str.split("-");
            for (i = 0; i < arrtmp.length; i++) {
                num = arrtmp[i].indexOf("_");
                if (num > 0) {
                    name = arrtmp[i].substring(0, num);
                    value = arrtmp[i].substr(num + 1);
                    maps.put(name, value);
                }
            }
        }
        maps.put(newname, newvalue);
        var hashstr = maps.gethash();
        location.hash = hashstr;
    } catch (e) {
        alert("��������,����ȷ�Ϻ�,�ύ");
        return;
    }
}
removeHashString = function (key) {
    var maps = new HashMap();
    try {
        var hrefstr = location.href;
        var hashstr = location.hash;
        QueryHashString(hashstr, maps);
        QueryHrefString(hrefstr, maps);
        maps.put(key, '');
        maps.remove(key);
        var hashstr = maps.gethash();
        location.hash = hashstr;
    } catch (e) {
        return;
    }
}
getdistinctpara = function (params) {
    var maps = new HashMap();
    try {
        var name, value, i;
        var arrtmp = params.split("&");
        for (i = 0; i < arrtmp.length; i++) {
            num = arrtmp[i].indexOf("=");
            if (num > 0) {
                name = arrtmp[i].substring(0, num);
                value = arrtmp[i].substr(num + 1);
                maps.put(name, value);
            }
        }
        return maps.toString(function (str) {
            return str.split('$')[0];
        });
    } catch (e) {
        alert("��������,����ȷ�Ϻ�,�ύ");
        return;
    }
}
get_ajax_param_map = function () {
    var maps = new HashMap();
    var hrefstr = location.href;
    var hashstr = location.hash;
    QueryHashString(hashstr, maps);
    QueryHrefString(hrefstr, maps);
    maps.put("act", "");
    maps.remove("act");
    var str = maps.toString(function (str) {
        return str.split('$')[0];
    });
    var t = str.split('&');
    var new_t = [];
    var flagCF = false;
    for (var i = 0; i < t.length; i++) {
        var item = t[i];
        if (item.length >= 4) {
            var t2 = item.split('=');
            var t3 = t2[0];
            var flag = false;
            for (var con in g_search_condition_map) {
                var t4 = g_search_condition_map[con];
                var t5 = t3.substr(0, t3.length - 1);
                if (t5 == t4) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                if (t3 == 'page') {
                    new_t[new_t.length] = 'page_no=' + t2[1];
                } else {
                    new_t[new_t.length] = item;
                }
            } else {
                var showtype = t3.charAt(t3.length - 1);
                if (showtype == g_showtype) {
                    t3 = t3.substr(0, t3.length - 1);
                    new_t[new_t.length] = t3 + '=' + t2[1];
                }
                if (t4 == "CF" && t2[1] == g_housetype_spec) {
                    flagCF = true;
                }
            }
        }
    }
    var cf_search_id = "search_condition_priceseg" + g_showtype + "_" + g_housetype_spec;
    if (flagCF) {
        if (!FEmpty(Fid(cf_search_id))) {
            Fid(cf_search_id).style.display = "block";
        }
    } else {
        if (!FEmpty(Fid(cf_search_id))) {
            Fid(cf_search_id).style.display = "none";
        }
        var condition_id = g_selected_search_condition_list.removeParentType("housetype" + g_showtype + "_" + g_housetype_spec);
        if (condition_id) {
            Fid(g_search_condition_id_prefix + "priceseg" + g_showtype + '_default').className = 'on';
            key = getSosoParam("priceseg" + g_showtype);
            removeHashString(key);
            var t = new searchCondition(condition_id);
            if (!t.is_customer_search) {
                Fid(condition_id).className = '';
            }
        }
        g_selected_search_condition_list.show();
    }
    return new_t.join('&');
}
get_ajax_param_map_with_id = function () {
    var maps = new HashMap();
    var hrefstr = location.href;
    var hashstr = location.hash;
    QueryHashString(hashstr, maps);
    QueryHrefString(hrefstr, maps);
    maps.put("act", "");
    maps.remove("act");
    return maps.toString();
}
call_back_handler_error = function (data) {
    alert(data);
    location.href = "//www.qq.com/?pgv_ref=404";
}
init_search();

function display_house_detail_info(id, obj) {
    var detail_info_div = document.getElementById('house_detail_' + id);
    if (obj.className == 'moreInfo') {
        detail_info_div.style.display = 'block';
        obj.className = 'moreInfo_normal';
    } else {
        detail_info_div.style.display = 'none';
        obj.className = 'moreInfo';
    }
}

function change_collect_status() {
    var houseId = FId('xfd_houseid').value;
    var a = FId('collect_' + houseId);
    if (a.className == 'collect') {
        a.className = 'collectOn';
        a.innerHTML = 'ȡ���ղ�';
        a.setAttribute("bosszone", "boss1789,searchresult_cancle");
        a.onclick = (function (id) {
            return function () {
                xfd_cancel(id, change_collect_status);
                return false;
            };
        })(houseId);
    } else {
        a.className = 'collect';
        a.innerHTML = '�ղ�';
        a.setAttribute("bosszone", "boss1789,searchresult_favorite");
        a.onclick = (function (id) {
            return function () {
                kft_xfd_house_attention(id, change_collect_status);
                return false;
            };
        })(houseId);
    }
}

function xfd_cancel(houseid, callback) {
    FId('xfd_houseid').value = houseid;
    var url = '/index.php?mod=compare&act=cancelxfd&houseid=' + houseid + '&rt=' + Math.random();
    FJsLoader.load('xfd_cancel', url, function () {
        if ('undefined' == typeof rst_data) {
            return false;
        }
        if (0 == rst_data['code']) {
            if ('function' == typeof callback) {
                callback();
            }
            g_callback = '';
            FId('xfd_houseid').value = '';
        } else if (1 == rst_data['code']) {
            kft_click_login(3);
        } else if (rst_data['code'] < 0) {
            kft_gb_signup_err_open();
            return false;
        }
        return false;
    });
}

function searchPageLoginCallback() {
    var house_ids = '';
    var house_ids_arr = new Array();
    var houseid_input = Fid('search_result_list').getElementsByTagName('input');
    var house_num = houseid_input.length;
    for (var i = 0; i < house_num; i++) {
        house_ids_arr.push(houseid_input[i].value);
    }
    house_ids = house_ids_arr.join('|');
    if (!Fempty(house_ids)) {
        var url = "/index.php?mod=user&act=getCollectedHouseIds&houseids=" + house_ids + '&city=' + Fid('cityid').value;
        FJsLoader.load('login_success_callback', url, function () {
            if (!Fempty(rst_data)) {
                var collect_house = rst_data['data'];
                var houseId;
                while (true) {
                    if (collect_house.length == 0) {
                        break;
                    }
                    houseId = collect_house.shift();
                    var collect_a = 'collect_' + houseId;
                    if (!Fempty(Fid(collect_a))) {
                        Fid(collect_a).className = 'collectOn';
                        Fid(collect_a).innerHTML = 'ȡ���ղ�';
                        Fid(collect_a).onclick = (function (id) {
                            return function () {
                                xfd_cancel(id, change_collect_status);
                                return false;
                            };
                        })(houseId);
                    }
                }
            }
        });
    }
}

function loginOutCallBack() {
    var houseId;
    var houseid_input = Fid('search_result_list').getElementsByTagName('input');
    var house_num = houseid_input.length;
    for (var i = 0; i < house_num; i++) {
        houseId = houseid_input[i].value;
        var collect_a = 'collect_' + houseId;
        if (!Fempty(Fid(collect_a))) {
            Fid(collect_a).className = 'collect';
            Fid(collect_a).innerHTML = '�ղ�';
            Fid(collect_a).onclick = (function (id) {
                return function () {
                    kft_xfd_house_attention(id, change_collect_status);
                    return false;
                };
            })(houseId);
        }
    }
}

function FaddEvent(e, evt, fn, isID) {
    if (isID == true) e = Fid(e);
    if (!Fempty(e.attachEvent) && (typeof (e.attachEvent) == "function" || typeof (e.attachEvent) == "object"))
        e.attachEvent("on" + evt, fn); else if (!Fempty(e.addEventListener) && (typeof (e.addEventListener) == "function" || typeof (e.addEventListener) == "object"))
        e.addEventListener(evt, fn, false);
}

function getParamKV(hashParam) {
    var res = {'CA': '', 'CD': ''};
    var tmp = new Array();
    var temp_kv;
    for (var j in res) {
        if (hashParam.indexOf(j)) {
            tmp = hashParam.split('&');
            var tmp_length = tmp.length;
            for (var i = 0; i < tmp_length; i++) {
                temp_kv = tmp[i].split('=');
                if (!Fempty(temp_kv[0]) && temp_kv[0] == j) {
                    res[j] = !Fempty(temp_kv[1]) ? temp_kv[1] : '';
                    break;
                }
            }
        }
    }
    return res;
}

function showError(err) {
    if (window['console'] && window['console']['error']) {
        window['console']['error'](err);
    }
}

function update_suggest_result(rs) {
    try {
        if (rs.code !== 0) {
            Fid('search_suggest_list').innerHTML = '<p class="loading">��ȡʧ��</p>';
            showError(rs.msg);
            return;
        }
        var originList = rs.data.list;
        if (originList.length === 0) {
            Fid('search_suggest_list').innerHTML = '<p class="loading">�б�Ϊ��</p>';
            return;
        }
        var html = [];
        html.push(['<ul class="tMenu yh cf">', '<li class="name fl">¥������</li>', '<li class="area fl">��������</li>', '<li class="price fr">���±���</li>', '</ul>'].join(''));
        html.push('<dl id="search_favorite">');
        var list = [];
        for (var key in originList) {
            if (originList.hasOwnProperty(key)) {
                list.push(originList[key]);
            }
        }
        var rcType = null;
        for (var index = 0; index < list.length; index++) {
            var item = list[index];
            if (rcType === null) {
                rcType = item.FRcmmndType;
            }
            if (rcType !== item.FRcmmndType) {
                rcType = 2;
            }
            var featureHtml = [];
            if (item.FShortDiscountArr.FShortDiscount) {
                featureHtml.push('<li style="">�Żݣ�' + item.FShortDiscountArr.FShortDiscount + '</li>');
            }
            if (item.FFeatureArr.length > 0) {
                featureHtml.push('<li style="">��ɫ��' + item.FFeatureArr[0].FName + '</li>');
            }
            var strFeatureHtml = featureHtml.join('');
            if (featureHtml.length <= 1) {
                strFeatureHtml = strFeatureHtml.replace('style=""', 'style="margin-top:14px;"')
            }
            item.FCover = item.FCover || '//mat1.gtimg.com/house/datalib/search/no_pic.gif';
            item.price = item.FPriceType === '0' ? item.FShowPrice.FShowName : item.FShowPrice.FPrice;
            var bossStr = 'bosszone="boss1858,search_guess_house-' + item.FRcmmndType + '"';
            html.push(['<dt class="' + (index === 0 ? 'on' : '') + '">', '<ul class="cf">', '<li class="name fl">', '<a target="_blank" title="' + item.FName + '" href="' + item.FUrl + '" ' + bossStr + '>' + item.FName + '</a>', '</li>', '<li class="area fl">' + item.FRegionStr + '</li>', '<li class="price fr"><em>' + item.price + '</em></li>', '</ul>', '</dt>', '<dd class="' + (index === 0 ? '' : 'undis') + '">', '<div class="box2 cf">', '<a class="fl" target="_blank" href="' + item.FUrl + '" ' + bossStr + '>', '<img src="' + item.FCover + '"></a>', '<ul class="fl">', strFeatureHtml, '</ul>', '</div>', '</dd>'].join(''));
        }
        html.push('</dl>');
        Fid('search_suggest_list').innerHTML = html.join('');
        searchUpBoss('search_guess_house_load-' + rcType, '1858');
        var time_flag = null;
        var yhMod_concern = Fid("search_suggest_list");
        var dts = yhMod_concern.getElementsByTagName('dt');
        var dds = yhMod_concern.getElementsByTagName('dd');
        for (var i = 0, len1 = dts.length; i < len1; i++) {
            (function (i) {
                dts[i].onmouseover = function () {
                    time_flag = setTimeout(function () {
                        for (var j = 0; j < len1; j++) {
                            dts[j].className = "";
                            dds[j].className = "undis";
                        }
                        dts[i].className = "on";
                        dds[i].className = "";
                        clearTimeout(time_flag);
                        time_flag = null;
                    }, 100);
                };
            })(i)
        }
    } catch (err) {
        Fid('search_suggest_list').innerHTML = '<p class="loading">���ݻ�ȡʧ��</p>';
        showError(err);
    }
}

function load_suggest_list() {
    Fid('search_suggest_list').innerHTML = '<p class="loading">������...</p>';
    var jsonp = 'jsonp' + (new Date() - 0);
    window[jsonp] = function (rs) {
        update_suggest_result(rs);
        delete window[jsonp];
        jsonp = null;
    };
    FJsLoader.load('search_suggest_result', '//openapi.house.qq.com/index.php?mod=rcmmndsys&act=house&city=' + g_cur_city + '&btype=1&rn=5&callback=' + jsonp, function () {
    });
}

function update_bottomguess_list(rs) {
    try {
        if (rs.code !== 0) {
            showError(rs.msg);
            return;
        }
        var originList = rs.data.list;
        if (originList.length === 0) {
            showError('[update_bottomguess_list] �б�Ϊ��');
            return;
        }
        var html = [];
        var list = [];
        for (var key in originList) {
            if (originList.hasOwnProperty(key)) {
                list.push(originList[key]);
            }
        }
        var rcType = null;
        for (var index = 0; index < list.length; index++) {
            var item = list[index];
            if (rcType === null) {
                rcType = item.FRcmmndType;
            }
            if (rcType !== item.FRcmmndType) {
                rcType = 2;
            }
            item.FCover = item.FCover || '//mat1.gtimg.com/house/datalib/search/no_pic.gif';
            item.price = item.FPriceType === '0' ? item.FShowPrice.FShowName : ('<em>' + item.FShowPrice.FPrice + '</em>' + item.FShowPrice.FUnitName);
            item.title = item.FName.length > 10 ? item.FName.slice(0, 9) + '...' : item.FName;
            html.push(['<li>', '<a href="' + item.FUrl + '" target="_blank" bosszone="boss1858,search_bottomguess-' + item.FRcmmndType + '" title="' + item.FName + '">', '<img src="' + item.FCover + '" />' + item.title, '</a>', '<p>' + item.price + '</p>', '</li>'].join(''));
        }
        searchUpBoss('search_bottomguess_load-' + rcType, '1858');
        Fid('bottomguess_title').style.display = '';
        var bottomguessListNode = Fid('bottomguess_list');
        bottomguessListNode.innerHTML = html.join('');
        bottomguessListNode.style.display = '';
    } catch (err) {
        showError(err);
    }
}

function load_bottomguess_list() {
    var jsonp = 'jsonp' + (new Date() - 0);
    window[jsonp] = function (rs) {
        update_bottomguess_list(rs);
        delete window[jsonp];
        jsonp = null;
    };
    FJsLoader.load('bottomguess_result', '//openapi.house.qq.com/index.php?mod=rcmmndsys&act=house&city=' + g_cur_city + '&btype=1&rn=6&callback=' + jsonp, function () {
    });
}

(function () {
    FaddEvent(Fid('search_suggest_tabmenu'), 'mouseenter', function () {
        if (Fid('search_suggest_tabmenu').className === 'yh menuSuggest') {
            Fid('search_suggest_tabmenu').className = 'yh menuSuggest menuOn';
            Fid('search_suggest_list').className = 'tabSuggest tabOn';
            Fid('search_concern_tabmenu').className = 'yh menuConcern';
            Fid('search_concern_list').className = 'tabConcern';
            searchUpBoss('search_guess', '1858');
        }
    });
    FaddEvent(Fid('search_concern_tabmenu'), 'mouseenter', function () {
        if (Fid('search_suggest_tabmenu').className === 'yh menuSuggest menuOn') {
            Fid('search_suggest_tabmenu').className = 'yh menuSuggest';
            Fid('search_suggest_list').className = 'tabSuggest';
            Fid('search_concern_tabmenu').className = 'yh menuConcern menuOn';
            Fid('search_concern_list').className = 'tabConcern tabOn';
            searchUpBoss('search_areaPopular', '1858');
        }
    });
    FaddEvent(Fid('search_suggest_refresh'), 'click', function (evt) {
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        }
        load_suggest_list();
    });
    load_bottomguess_list();
})();
var search_concern_house = null;

function update_concern_result() {
    if (typeof search_concern_type != 'undefined' && !Fempty(search_concern_type)) {
        Fid('search_concern_type').value = search_concern_type;
    }
    if (typeof search_concern_house != 'undefined' && !Fempty(search_concern_house)) {
        Fid('search_concern_list').innerHTML = search_concern_house;
        Fid('search_suggest_tab').className = 'slideBox suggestTab suggestTabFull';
        var time_flag = null;
        var yhMod_concern = Fid("search_concern_list");
        var dts = yhMod_concern.getElementsByTagName('dt');
        var dds = yhMod_concern.getElementsByTagName('dd');
        for (var i = 0, len1 = dts.length; i < len1; i++) {
            (function (i) {
                dts[i].onmouseover = function () {
                    time_flag = setTimeout(function () {
                        for (var j = 0; j < len1; j++) {
                            dts[j].className = "";
                            dds[j].className = "undis";
                        }
                        dts[i].className = "on";
                        dds[i].className = "";
                        clearTimeout(time_flag);
                        time_flag = null;
                    }, 100);
                };
            })(i)
        }
        return false;
    } else {
        Fid('search_suggest_tab').className = 'slideBox suggestTab';
    }
}

function get_concern_list(kvs) {
    Fid('search_suggest_tab').className = 'slideBox suggestTab';
    load_suggest_list();
    search_concern_house = null;
    var ca_cd = getParamKV(kvs);
    if (!Fempty(ca_cd['CA'])) {
        var temp_region = !Fempty(ca_cd['CA'].split(':')[1]) ? ca_cd['CA'].split(':')[1] : '';
        var concern_type = Fid('search_concern_type').value;
        if (concern_type == ('region_' + temp_region)) {
            Fid('search_suggest_tab').className = 'slideBox suggestTab suggestTabFull';
        } else {
            FJsLoader.load('search_concern_result', '//' + g_domain + "/index.php?mod=search&act=getconcernhouse&city=" + g_city_info.FId + '&district=' + temp_region, update_concern_result);
        }
    } else if (!Fempty(ca_cd['CD'])) {
        var temp_subway = !Fempty(ca_cd['CD']) ? ca_cd['CD'] : '';
        var concern_type = Fid('search_concern_type').value;
        if (concern_type == ('subway_' + temp_subway)) {
            Fid('search_suggest_tab').className = 'slideBox suggestTab suggestTabFull';
            return false;
        } else {
            FJsLoader.load('search_concern_result', '//' + g_domain + "/index.php?mod=search&act=getconcernhouse&city=" + g_city_info.FId + '&subway=' + temp_subway, update_concern_result);
        }
    }
    return false;
}

function bossSendTop(zoneId) {
    if (zoneId == '') {
        return false;
    }
    var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
    var iQQ = (a == null ? "" : unescape(a[2]));
    var url = '//btrace.qq.com/collect?sIp=&iQQ=' + iQQ + '&sBiz=&sOp=' + zoneId + '&iSta=&iTy=549&iFlow=' + new Date() * 1;
    gImage = new Image(1, 1);
    gImage.src = url;
}

function bossSendTopNew(zoneId) {
    var map = {
        'CA1': 'ddistrict',
        'NA1': 'dprice',
        'CF1': 'dproperty',
        'ND1': 'dsale',
        'CG1': 'dtype',
        'CB1': 'dpoi',
        'NC1': 'ddate',
        'CC1': 'dbuild',
        'NE1': 'dround',
        'CD2': 'subsub',
        'CJ2': 'subsub',
        'NA2': 'subprice',
        'CF2': 'subproperty',
        'ND2': 'subsale'
    };
    if (zoneId == '' || typeof map[zoneId] == 'undefined') {
        return false;
    }
    bosszone = map[zoneId];
    var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
    var iQQ = (a == null ? "" : unescape(a[2]));
    var url = '//btrace.qq.com/collect?sIp=&iQQ=' + iQQ + '&sBiz=&sOp=' + bosszone + '&iSta=&iTy=1858&iFlow=' + new Date() * 1;
    gImage = new Image(1, 1);
    gImage.src = url;
}

FaddEvent(window, 'load', function () {
    var time_flag = null;
    var yhMod = Fid("search_hot");
    if (Fempty(yhMod)) {
        return false;
    }
    var dts = yhMod.getElementsByTagName('dt');
    var dds = yhMod.getElementsByTagName('dd');
    for (var i = 0, len1 = dts.length; i < len1; i++) {
        (function (i) {
            dts[i].onmouseover = function () {
                time_flag = setTimeout(function () {
                    for (var j = 0; j < len1; j++) {
                        dts[j].className = "";
                        dds[j].className = "undis";
                    }
                    dts[i].className = "on";
                    dds[i].className = "";
                    clearTimeout(time_flag);
                    time_flag = null;
                }, 100);
            }
        })(i)
    }
})

function close_compare_tip() {
    hideElement('compare_tip');
    kft_close_mask();
}

function open_compare_tip(msg) {
    Fid('compare_tip_msg').innerHTML = msg;
    showlayer('compare_tip');
    showElement('compare_bar');
}

function hideElement(id) {
    var element = Fid(id);
    if (element) {
        element.style.display = 'none';
    }
}

function showElement(id) {
    var element = Fid(id);
    if (element) {
        element.style.display = '';
    }
}

function showlayer(id) {
    var yhxx = Fid(id);
    yhxx.style.display = 'block';
    yhxx.cssName = 'share_layer';
    var windowHeight, windowWidth;
    windowHeight = document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight;
    if (document.body.clientWidth != undefined) {
        windowWidth = document.body.clientWidth;
    } else {
        windowWidth = window.innerWidth;
    }
    var left = (windowWidth - yhxx.offsetWidth) / 2;
    var top = (windowHeight - yhxx.offsetHeight) / 2;
    yhxx.style.left = left + 'px';
    yhxx.style.top = top + 'px';
    yhxx.style.zIndex = 10040;

    function SIPRivalposHeader() {
        var height = (document.documentElement.scrollTop - 100 + document.documentElement.clientHeight / 2) + "px";
        Fid(id).style.top = height;
    };
    if (FBrowser.isIE6) {
        yhxx.style.position = 'absolute';
        SIPRivalposHeader();
        window.attachEvent("onload", SIPRivalposHeader);
        window.attachEvent("onresize", SIPRivalposHeader);
        window.attachEvent("onscroll", SIPRivalposHeader);
    } else {
        yhxx.style.position = 'fixed';
    }
    kft_open_mask();
}

document.domain = "qq.com";
var code_to_msg = {
    201: '��ȷ��¥��/·��',
    202: '����ȷ��д����',
    203: '����ȷѡ���Ա�',
    204: '����ȷ��д��ϵ�ֻ�',
    205: '����ȷ��д�����ַ',
    206: '����ȷ��дͼƬ��֤��',
    207: '���Ķ������',
    208: '����̫Ƶ��'
};
var code_to_id = {
    202: 'gb_name',
    203: 'gb_sex',
    204: 'gb_mobile',
    205: 'gb_email',
    206: 'gb_authcode',
    207: 'gb_announce'
};
var g_callback = '';

function kft_gb_route_signup(kftid, kftrtid, callback) {
    kft_gb_kft_selected('', kftid, kftrtid, callback);
    FId('gb_tk').value = kft_gb_anti_csrf_token();
    FId('form_gb_signup').submit();
    boss_statistics(1631, 'signup');
    return false;
}

function kft_gb_house_signup(houseid, callback) {
    kft_gb_kft_selected(houseid, '', '', callback);
    FId('gb_tk').value = kft_gb_anti_csrf_token();
    FId('form_gb_signup').submit();
    boss_statistics(1631, 'signup');
    return false;
}

function kft_xfd_house_attention(houseid, callback) {
    var cityid = FId('cityid').value;
    if (houseid <= 0) {
        alert('��ȷ��¥��');
    }
    g_callback = callback;
    FId('xfd_houseid').value = houseid;
    var url = '/index.php?mod=kanfang&act=xfdsubmit&houseid=' + houseid + '&cityid=' + cityid + '&' + Math.random();
    FJsLoader.load('xfd_add', url, function () {
        if ('undefined' == typeof rst_data) {
            return false;
        }
        if (0 == rst_data['code']) {
            if ('function' == typeof callback) {
                callback();
            }
            g_callback = '';
            FId('xfd_houseid').value = '';
        } else if (1 == rst_data['code']) {
            kft_click_login(3);
        } else if (3 == rst_data['code']) {
            ahref = "//db.house.qq.com/" + rst_data['data']['cityname'] + "/kanfangtuan/mymsg";
            FId('collect_dup_ahref').href = ahref;
            kft_gb_house_collect_dup_open();
            if ('function' == typeof callback) {
                callback();
            }
            g_callback = '';
            FId('xfd_houseid').value = '';
        } else if (rst_data['code'] < 0) {
            kft_gb_signup_err_open();
            return false;
        }
        return false;
    });
}

function kft_gb_signup_submit() {
    var houseid = FId('gb_houseid').value;
    var name = FId('gb_name').value;
    var mobile = FId('gb_mobile').value;
    var kftid = FId('gb_kftid').value;
    var kftrtid = FId('gb_kftrtid').value;
    if (houseid) {
        if (typeof bossSend1988 != 'undefined') {
            bossSend1988(name, mobile, houseid, kftid, kftrtid);
        }
    } else {
        if (typeof bossSend1988Route != 'undefined') {
            bossSend1988Route(name, mobile, kftid, kftrtid);
        }
    }
    kft_gb_signup_info_err_clear();
    var rst = kft_gb_signup_check();
    if (rst) {
        FId('gb_tk').value = kft_gb_anti_csrf_token();
        FId('form_gb_signup').submit();
    }
}

function kft_login() {
    var cityid = FId('cityid').value;
    var url = '/index.php?mod=kanfang&act=userlogin&cityid=' + cityid;
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                var KFTFocusHouseIds = FId('KFTFocusHouseIds').value;
                var KFTRouteIds = FId('KFTRouteIds').value;
                var KFTSGCommendHouseIds = FId('KFTSGCommendHouseIds').value;
                var KFTSGSearchHouseIds = FId('KFTSGSearchHouseIds').value;
                var KFTSGTop10HouseIds = FId('KFTSGTop10HouseIds').value;
                var KFTSGAttentionHouseIds = FId('KFTSGAttentionHouseIds').value;
                url += '&KFTFocusHouseIds=' + KFTFocusHouseIds;
                url += '&KFTRouteIds=' + KFTRouteIds;
                url += '&KFTSGCommendHouseIds=' + KFTSGCommendHouseIds;
                url += '&KFTSGSearchHouseIds=' + KFTSGSearchHouseIds;
                url += '&KFTSGTop10HouseIds=' + KFTSGTop10HouseIds;
                url += '&KFTSGAttentionHouseIds=' + KFTSGAttentionHouseIds;
                break;
            case'kft_route':
                var KFTRouteIds = FId('KFTRouteIds').value;
                url += '&KFTRouteIds=' + KFTRouteIds;
                break;
            default:
                break;
        }
    }
    url += '&' + Math.random();
    FJsLoader.load('kft_login', url, function () {
        if ('undefined' == typeof rst_data) {
            return false;
        }
        if ((0 == rst_data['code']) || (101 == rst_data['code'])) {
            if (!FEmpty(page)) {
                switch (page) {
                    case'kft_index':
                        index_login_init(rst_data['data']);
                        break;
                    case'kft_route':
                        route_login_init(rst_data['data']);
                        break;
                    default:
                        break;
                }
            }
        } else if (rst_data['code'] < 0) {
            kft_gb_signup_err_open();
        }
        return false;
    });
}

function kft_gb_submit_result(code, msg, data) {
    if (code != 1) {
        boss_statistics(1631, 'islogin');
    }
    if (0 == code) {
        boss_statistics(1631, 'signupsucess');
        var callback = g_callback;
        g_callback = '';
        var houseid = FId('gb_houseid').value;
        var routeid = FId('gb_kftrtid').value;
        kft_gb_signup_close();
        json_data = eval('(' + data + ')');
        var ut = json_data['ut'];
        ahref = "//db.house.qq.com/" + json_data['cityname'] + "/kanfangtuan/mymsg";
        if (FEmpty(houseid)) {
            var signup_num_id = "route_sign_num";
            if (1 == ut) {
                var signup_num_id = "anonymous_route_sign_num";
            }
            if (!FEmpty(FId(signup_num_id))) {
                FId(signup_num_id).innerHTML = json_data['routeSignupNum'];
            }
            FId('signup_success_ahref_1').href = ahref;
            FId('signup_success_ahref_2').href = ahref;
            if (1 == ut) {
                kft_gb_route_anonymous_signup_success_open();
            } else {
                kft_gb_route_signup_success_open();
            }
        } else {
            var signup_num_id = "house_attention_num";
            if (1 == ut) {
                var signup_num_id = "anonymous_house_attention_num";
            }
            if (!FEmpty(FId(signup_num_id))) {
                FId(signup_num_id).innerHTML = json_data['houseSignupNum'];
            }
            msg = "<em>" + json_data['houseName'] + "</em>" + json_data['KFTHouseStatus'];
            FId('house_attention_success_span').innerHTML = msg;
            FId('attention_success_ahref_1').href = ahref;
            FId('attention_success_ahref_2').href = ahref;
            if (1 == ut) {
                kft_gb_house_anonymous_attention_success_open();
            } else {
                kft_gb_house_attention_success_open();
            }
        }
        var pageObj = FId('page');
        if (!FEmpty(pageObj)) {
            var page = FId('page').value;
            switch (page) {
                case'kft_index':
                    if (1 != ut) {
                        userKFTInfo(json_data);
                    }
                    var houseids = [];
                    var routeids = [];
                    if (!FEmpty(routeid)) {
                        routeids = [Number(routeid)];
                        joinIcons(0, routeids);
                        houseids = json_data['houseids'];
                        id = "kft_route_signup_num_" + routeid;
                        if (!FEmpty(FId(id))) {
                            FId(id).innerHTML = json_data['routeSignupNum'];
                        }
                    } else {
                        houseids = [Number(houseid)];
                    }
                    kft_gb_signup_succ_refresh(houseids);
                    break;
                case'kft_route':
                    if (1 != ut) {
                        userKFTInfo(json_data);
                    }
                    if (!FEmpty(routeid)) {
                        var id = "kft_route_" + routeid;
                        routeIcons(0, id);
                        id = "kft_route_signup_num_" + routeid;
                        if (!FEmpty(FId(id))) {
                            FId(id).innerHTML = json_data['routeSignupNum'];
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        if ('function' == typeof callback) {
            callback();
        }
    } else if (1 == code) {
        boss_statistics(1631, 'notlogin');
        if (FEmpty(FId('gb_houseid').value)) {
            kft_click_login(1);
            kft_ptlogin_anonymous_open();
        } else {
            kft_click_login(2);
            kft_ptlogin_anonymous_open();
        }
    } else if (2 == code) {
        boss_statistics(1631, 'inputinfo');
        try {
            json_data = eval('(' + data + ')');
            var fm = document.getElementById('form_gb_signup');
            fm.name.value = json_data.name;
            fm.sex[0].checked = fm.sex[0].value == json_data.sex;
            fm.sex[1].checked = fm.sex[1].value == json_data.sex;
            fm.mobile.value = json_data.mobile;
            fm.email.value = json_data.email;
        } catch (e) {
        }
        kft_gb_signup_open();
    } else if (3 == code) {
        boss_statistics(1631, 'signupdup');
        var houseid = FId('gb_houseid').value;
        var routeid = FId('gb_kftrtid').value;
        kft_gb_signup_close();
        json_data = eval('(' + data + ')');
        ahref = "//db.house.qq.com/" + json_data['cityname'] + "/kanfangtuan/mymsg";
        if (FEmpty(houseid)) {
            FId('signup_dup_ahref').href = ahref;
            kft_gb_route_signup_dup_open();
        } else {
            FId('attention_house_dup_ahref').href = ahref;
            kft_gb_house_attention_dup_open();
        }
        var pageObj = FId('page');
        if (!FEmpty(pageObj)) {
            var page = FId('page').value;
            switch (page) {
                case'kft_index':
                    var houseids = [];
                    var routeids = [];
                    if (!FEmpty(routeid)) {
                        routeids = [Number(routeid)];
                        joinIcons(0, routeids);
                        houseids = json_data['houseids'];
                    } else {
                        houseids = [Number(houseid)];
                    }
                    kft_gb_signup_succ_refresh(houseids);
                    break;
                case'kft_route':
                    if (!FEmpty(FId(routeid))) {
                        signup_num_id = "route_signup_num";
                        var id = "kft_route_" + routeid;
                        routeIcons(0, id);
                        id = "kft_route_signup_num_" + routeid;
                        if (!FEmpty(FId(id))) {
                            FId(id).innerHTML = json_data['routeSignupNum'];
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    } else if (code < 0) {
        boss_statistics(1631, 'signuperr');
        var isSignupInfoErr = 0;
        var regInfoObj = FId('resgInfo');
        if (!FEmpty(regInfoObj) && ('none' != regInfoObj.style.display)) {
            codeTmp = -1 * code;
            if ((typeof code_to_id[codeTmp] != "undefined") || (typeof code_to_msg[codeTmp] != "undefined")) {
                isSignupInfoErr = 1;
            }
        }
        if (isSignupInfoErr) {
            kft_gb_signup_msg_show(code);
        } else {
            kft_gb_signup_close();
            kft_gb_signup_err_open();
        }
    }
    return false;
}

function kft_gb_user_anonymous() {
    ptlogin2_onClose();
    FId('gb_ut').value = 1;
    kft_gb_signup_open();
    return false;
}

function kft_gb_kft_selected(houseid, kftid, kftrtid, callback) {
    if ('' != houseid) {
        FId('gb_houseid').value = houseid;
    }
    if ('' != kftid) {
        FId('gb_kftid').value = kftid;
    }
    if ('' != kftrtid) {
        FId('gb_kftrtid').value = kftrtid;
    }
    g_callback = callback;
    FId('gb_cityid').value = FId('cityid').value;
}

function kft_gb_signup_check() {
    var check_result = kft_gb_check_param();
    if (check_result < 0) {
        kft_gb_signup_msg_show(check_result);
        return false;
    }
    return true;
}

function kft_gb_check_param() {
    var obj_house = FId("gb_houseid");
    var obj_kft = FId("gb_kftid");
    var obj_kft_r = FId("gb_kftrtid");
    if ((FEmpty(obj_house) || obj_house.value <= 0) && (FEmpty(obj_kft) || obj_kft.value <= 0 || FEmpty(obj_kft_r) || obj_kft_r.value <= 0)) {
        return -201;
    }
    obj = FId("gb_name");
    if (FEmpty(obj) || FEmpty(obj.value) || obj.value.bytes > 40) {
        return -202;
    }
    obj = FId("gb_mobile");
    var reg_m = /^0?1\d{10}$/;
    if (FEmpty(obj) || !reg_m.test(obj.value)) {
        return -204;
    }
    obj = FId("gb_announce");
    if (FEmpty(obj) || !obj.checked) {
        return -207;
    }
    return 0;
}

function kft_change_img() {
    FId('authcode_img').src = "//ptlogin2.qq.com/getimage?aid=" + PTLOGIN2_AID + "&" + Math.random();
    return false;
}

function kft_gb_signup_msg_show(code) {
    code *= -1;
    var show_msg = "������Ϣ����";
    if (typeof code_to_msg[code] != "undefined") {
        show_msg = code_to_msg[code];
    }
    if ((typeof code_to_id[code] != "undefined")) {
        var obj = FId(code_to_id[code]);
        if (!FEmpty(obj)) {
            obj.focus();
        }
    }
    kft_gb_signup_info_err_show(show_msg);
}

function kft_gb_clear_param() {
    FId("form_gb_signup").reset();
}

function kft_gb_clear_info() {
    FId('gb_name_info').innerHTML = '';
    FId('gb_mobile_info').innerHTML = '';
    FId('gb_sunum_info').innerHTML = '';
    FId('gb_info').innerHTML = '';
    FId('gb_name_info').style.display = 'none';
    FId('gb_mobile_info').style.display = 'none';
    FId('gb_sunum_info').style.display = 'none';
    FId('gb_info').style.display = 'none';
}

function kft_gb_signup_open() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.stop();
                break;
            default:
                break;
        }
    }
    if (FBrowser.isIE6) {
        FId('resgInfo').style.top = document.documentElement.scrollTop + document.documentElement.clientHeight / 2 + "px";
    }
    FId('resgInfo').style.left = '50%';
    FId('resgInfo').style.display = "block";
    kft_open_mask();
}

function kft_gb_signup_close() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.init('fsE2', 'E2pic1', true);
                break;
            default:
                break;
        }
    }
    kft_gb_clear_param();
    g_callback = '';
    FId('gb_houseid').value = '';
    FId('gb_kftid').value = '';
    FId('gb_kftrtid').value = '';
    FId('gb_cityid').value = '';
    FId('gb_ut').value = 2;
    FId('resgInfo').style.left = '-1000px';
    FId('resgInfo').style.display = "none";
    kft_close_mask();
    kft_gb_signup_info_err_clear();
    return false;
}

function kft_gb_route_signup_success_open() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.stop();
                break;
            default:
                break;
        }
    }
    if (FBrowser.isIE6) {
        FId('route_signup_success_div').style.top = document.documentElement.scrollTop + document.documentElement.clientHeight / 2 + "px";
    }
    FId('route_signup_success_div').style.left = '50%';
    FId('route_signup_success_div').style.display = "block";
    kft_open_mask();
    return false;
}

function kft_gb_route_signup_success_close() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.init('fsE2', 'E2pic1', true);
                break;
            default:
                break;
        }
    }
    FId('route_signup_success_div').style.left = '-1000px';
    FId('route_signup_success_div').style.display = "none";
    kft_close_mask();
    return false;
}

function kft_gb_route_anonymous_signup_success_open() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.stop();
                break;
            default:
                break;
        }
    }
    if (FBrowser.isIE6) {
        FId('route_anonymous_signup_success_div').style.top = document.documentElement.scrollTop + document.documentElement.clientHeight / 2 + "px";
    }
    FId('route_anonymous_signup_success_div').style.left = '50%';
    FId('route_anonymous_signup_success_div').style.display = "block";
    kft_open_mask();
    return false;
}

function kft_gb_route_anonymous_signup_success_close() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.init('fsE2', 'E2pic1', true);
                break;
            default:
                break;
        }
    }
    FId('route_anonymous_signup_success_div').style.left = '-1000px';
    FId('route_anonymous_signup_success_div').style.display = "none";
    kft_close_mask();
    return false;
}

function kft_gb_route_signup_dup_open() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.stop();
                break;
            default:
                break;
        }
    }
    if (FBrowser.isIE6) {
        FId('route_signup_dup_div').style.top = document.documentElement.scrollTop + document.documentElement.clientHeight / 2 + "px";
    }
    FId('route_signup_dup_div').style.left = '50%';
    FId('route_signup_dup_div').style.display = "block";
    kft_open_mask();
    return false;
}

function kft_gb_route_signup_dup_close() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.init('fsE2', 'E2pic1', true);
                break;
            default:
                break;
        }
    }
    FId('route_signup_dup_div').style.left = '-1000px';
    FId('route_signup_dup_div').style.display = "none";
    kft_close_mask();
    return false;
}

function kft_gb_house_attention_success_open() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.stop();
                break;
            default:
                break;
        }
    }
    if (FBrowser.isIE6) {
        FId('house_attention_success_div').style.top = document.documentElement.scrollTop + document.documentElement.clientHeight / 2 + "px";
    }
    FId('house_attention_success_div').style.left = '50%';
    FId('house_attention_success_div').style.display = "block";
    kft_open_mask();
    return false;
}

function kft_gb_house_attention_success_close() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.init('fsE2', 'E2pic1', true);
                break;
            default:
                break;
        }
    }
    FId('house_attention_success_div').style.left = '-1000px';
    FId('house_attention_success_div').style.display = "none";
    kft_close_mask();
    return false;
}

function kft_gb_house_anonymous_attention_success_open() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.stop();
                break;
            default:
                break;
        }
    }
    if (FBrowser.isIE6) {
        FId('house_anonymous_attention_success_div').style.top = document.documentElement.scrollTop + document.documentElement.clientHeight / 2 + "px";
    }
    FId('house_anonymous_attention_success_div').style.left = '50%';
    FId('house_anonymous_attention_success_div').style.display = "block";
    kft_open_mask();
    return false;
}

function kft_gb_house_anonymous_attention_success_close() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.init('fsE2', 'E2pic1', true);
                break;
            default:
                break;
        }
    }
    FId('house_anonymous_attention_success_div').style.left = '-1000px';
    FId('house_anonymous_attention_success_div').style.display = "none";
    kft_close_mask();
    return false;
}

function kft_gb_house_collect_dup_open() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.stop();
                break;
            default:
                break;
        }
    }
    if (FBrowser.isIE6) {
        FId('house_collect_dup_div').style.top = document.documentElement.scrollTop + document.documentElement.clientHeight / 2 + "px";
    }
    FId('house_collect_dup_div').style.left = '50%';
    FId('house_collect_dup_div').style.display = "block";
    kft_open_mask();
    return false;
}

function kft_gb_house_collect_dup_close() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.init('fsE2', 'E2pic1', true);
                break;
            default:
                break;
        }
    }
    FId('house_collect_dup_div').style.left = '-1000px';
    FId('house_collect_dup_div').style.display = "none";
    kft_close_mask();
    return false;
}

function kft_gb_signup_info_err_show(msg) {
    var errRstObj = FId('kft_error_result');
    if (!FEmpty(errRstObj)) {
        errRstObj.innerHTML = msg;
        errRstObj.style.display = '';
    }
}

function kft_gb_signup_info_err_clear() {
    var errRstObj = FId('kft_error_result');
    if (!FEmpty(errRstObj)) {
        errRstObj.innerHTML = '';
        errRstObj.style.display = 'none';
    }
}

function kft_gb_signup_err_open() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.stop();
                break;
            default:
                break;
        }
    }
    if (FBrowser.isIE6) {
        FId('gb_err_div').style.top = document.documentElement.scrollTop + document.documentElement.clientHeight / 2 + "px";
    }
    FId('gb_err_div').style.left = '50%';
    FId('gb_err_div').style.display = "block";
    kft_open_mask();
}

function kft_gb_signup_err_close() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.init('fsE2', 'E2pic1', true);
                break;
            default:
                break;
        }
    }
    FId('gb_err_div').style.left = '-1000px';
    FId('gb_err_div').style.display = "none";
    kft_close_mask();
}

function kft_gb_signup_succ_refresh(houseids) {
    focusIcons(0, houseids);
    groupIcons(0, houseids);
    top10Icons(0, houseids);
    ;favoriteIcons(0, houseids);
    refresh_focus_house_gb_num();
}

function kft_gb_sg_xfd_refresh() {
    var houseid = FId('xfd_houseid').value;
    if (!FEmpty(houseid)) {
        collectIcons(0, [Number(houseid)]);
    }
}

function kft_popup_error_info() {
    if (FBrowser.isIE6) {
        FId('popup_err_div').style.top = document.documentElement.scrollTop + document.documentElement.clientHeight / 2 + "px";
    }
    FId('popup_err_div').style.left = '50%';
    FId('popup_err_div').style.display = "block";
    kft_open_mask();
    return false;
}

function kft_popup_error_close() {
    FId('popup_err_div').style.left = '-1000px';
    FId('popup_err_div').style.display = "none";
    kft_close_mask();
    return false;
}

function kft_gb_house_attention_dup_open() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.stop();
                break;
            default:
                break;
        }
    }
    if (FBrowser.isIE6) {
        FId('house_attention_dup_div').style.top = document.documentElement.scrollTop + document.documentElement.clientHeight / 2 + "px";
    }
    FId('house_attention_dup_div').style.left = '50%';
    FId('house_attention_dup_div').style.display = "block";
    kft_open_mask();
    return false;
}

function kft_gb_house_attention_dup_close() {
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.init('fsE2', 'E2pic1', true);
                break;
            default:
                break;
        }
    }
    FId('house_attention_dup_div').style.left = '-1000px';
    FId('house_attention_dup_div').style.display = "none";
    kft_close_mask();
    return false;
}

function kft_gb_anti_csrf_token() {
    var cUin = kft_gb_get_cookie('uin');
    var cSkey = kft_gb_get_cookie('skey');
    var tokenStr = '';
    if ((false != cUin) && (false != cSkey)) {
        tokenStr = cUin + cSkey;
    }
    if ("" == tokenStr) {
        var cLuin = kft_gb_get_cookie('luin');
        var cLskey = kft_gb_get_cookie('lsey');
        if ((false != cLuin) && (false != cLskey)) {
            tokenStr = cLuin + cLskey;
        }
    }
    if ("" == tokenStr) {
        return "";
    }
    var hash = 5381;
    for (var i = 0, len = tokenStr.length; i < len; ++i) {
        hash = ((hash << 5) & 0x7fffffff) + tokenStr.charAt(i).charCodeAt() + hash;
    }
    return hash & 0x7fffffff;
}

function kft_gb_get_cookie(cName) {
    if (document.cookie.length <= 0) {
        return false;
    }
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cArr = cookies[i].split('=');
        cArr[0] = cArr[0].replace(/(^\s*)|(\s*$)/, "");
        if ((2 == cArr.length) && (cArr[0] == cName)) {
            return cArr[1];
        }
    }
    return false;
}����
document.domain = "qq.com";
var g_login_success = false;

function kft_ptlogin(default_domain) {
    default_domain = escape(default_domain.replace(/http:/, ""));
    default_domain = "http:" + default_domain;
    FId("login_frame").src = "//ui.ptlogin2.qq.com/cgi-bin/login?appid=" + PTLOGIN2_AID + "&s_url=" + default_domain + "&target=self";
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.stop();
                break;
            case'kft_zhuanti':
                FId('login_div').style.cssText = 'display: none; position: fixed; z-index: 1000000; padding: 0pt; width: 372px; height: 210px; top: 50%; left: -500px; margin: -105px 0px 0px -186px;_position:absolute;_bottom:auto; _top:expression(eval(document.documentElement.scrollTop)+210); _margin-top:expression((eval(document.documentElement.clientHeight)-210)/2);';
                if ('undefined' != typeof g_login_pos) {
                    g_login_pos = 1;
                }
                break;
            case'kft_home':
                FId('login_div').style.cssText = 'display: none; position: fixed; z-index: 1000000; padding: 0pt; width: 372px; height: 210px; top: 50%; left: -500px; margin: -105px 0px 0px -186px;_position:absolute;_bottom:auto; _top:expression(eval(document.documentElement.scrollTop)+210); _margin-top:expression((eval(document.documentElement.clientHeight)-210)/2);';
                if ('undefined' != typeof g_login_pos) {
                    g_login_pos = 1;
                }
                break;
            default:
                break;
        }
    }
    if (FBrowser.isIE6) {
        FId('login_div').style.top = document.documentElement.scrollTop + document.documentElement.clientHeight / 2 + "px";
    }
    FId('login_div').style.left = '50%';
    FId('login_div').style.display = "block";
    kft_open_mask();
}

function kft_click_login(to) {
    var default_domain = '//db.house.qq.com/index.php?mod=user&act=login&to=' + to;
    kft_ptlogin(default_domain);
}

function ptlogin2_onResize(width, height) {
    login_wnd = FId("login_div");
    if (login_wnd) {
        login_wnd.style.width = width + "px";
        login_wnd.style.height = height + "px";
        login_wnd.style.marginTop = (height / -2) + "px";
        login_wnd.style.marginLeft = (width / -2) + "px";
        login_wnd.style.visibility = "hidden";
        login_wnd.style.visibility = "visible";
        login_wnd.style.display = "block";
    }
    if (width > 10 && height > 10) {
        nologin_wnd = FId("nologin_div");
        nologin_wnd.style.width = width - 2 + "px";
    }
}

function ptlogin2_onClose() {
    if ('undefined' == typeof g_login_pos) {
        kft_ptlogin_anonymous_close();
        FId('login_div').style.left = '-500px';
        FId('login_div').style.display = "none";
        kft_close_mask();
    } else if (1 == g_login_pos) {
        kft_ptlogin_anonymous_close();
        FId('login_div').style.left = '-500px';
        FId('login_div').style.display = "none";
        kft_close_mask();
        g_login_pos = 0;
    } else if ('function' == typeof g_login_div_ptlogin_close) {
        g_login_div_ptlogin_close();
    }
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                si.init('fsE2', 'E2pic1', true);
                break;
            case'kft_zhuanti':
                if ('undefined' != typeof g_login_div_css) {
                    FId('login_div').style.cssText = g_login_div_css;
                }
                break;
            case'kft_home':
                if ('undefined' != typeof g_login_div_css) {
                    FId('login_div').style.cssText = g_login_div_css;
                }
                break;
            default:
                break;
        }
    }
    if (!g_login_success) {
        boss_statistics(1631, 'abstainoption');
    } else {
        g_login_success = false;
    }
}

function login_success(to) {
    g_login_success = true;
    ptlogin2_onClose();
    boss_statistics(1563, 'userlogin');
    boss_statistics(1563, 'loginall');
    var pageObj = FId('page');
    if (!FEmpty(pageObj)) {
        var page = FId('page').value;
        switch (page) {
            case'kft_index':
                if ('function' == typeof kft_login) {
                    kft_login();
                }
                break;
            case'kft_route':
                if ('function' == typeof kft_login) {
                    kft_login();
                }
                break;
            case'kft_home':
                if ('function' == typeof g_home_kft_login) {
                    g_home_kft_login();
                }
                break;
            case'min_nav_2013':
                login.loginCheck();
                if (typeof comparePageLoginCallback != 'undefined') {
                    comparePageLoginCallback();
                }
                if (typeof homePageLoginCallback != 'undefined') {
                    homePageLoginCallback();
                }
                if (typeof searchPageLoginCallback != 'undefined') {
                    searchPageLoginCallback();
                }
                break;
            default:
                break;
        }
    }
    var citySubname = 'bj';
    if (!FEmpty(FId('citySubname')) && !FEmpty(FId('citySubname').value)) {
        citySubname = FId('citySubname').value;
    }
    switch (to) {
        case 1:
            callback = g_callback;
            kftid = FId('gb_kftid').value;
            kftrtid = FId('gb_kftrtid').value;
            if ('function' == typeof kft_gb_route_signup) {
                kft_gb_route_signup(kftid, kftrtid, callback);
            }
            break;
        case 2:
            callback = g_callback;
            houseid = FId('gb_houseid').value;
            if ('function' == typeof kft_gb_house_signup) {
                kft_gb_house_signup(houseid, callback);
            }
            break;
        case 3:
            callback = g_callback;
            houseid = FId('xfd_houseid').value;
            var aEle = FId('collect_' + houseid);
            setTimeout(function () {
                if ('function' == typeof kft_xfd_house_attention && aEle.className == 'collect') {
                    kft_xfd_house_attention(houseid, callback);
                }
            }, 1000);
            break;
        case 11:
            window.location = "//db.house.qq.com/" + citySubname + "/kanfangtuan/myhouse";
            break;
        case 12:
            window.location = "//db.house.qq.com/" + citySubname + "/kanfangtuan/mymsg";
            break;
        case 13:
            window.location = "//db.house.qq.com/" + citySubname + "/kanfangtuan/myhouse";
            if ('function' == typeof moreFavHouses) {
                moreFavHouses();
            }
            break;
        case 14:
            window.location = "//db.house.qq.com/" + citySubname + "/kanfangtuan/myhouse";
            if ('function' == typeof moreGroupbuyHouses) {
                moreGroupbuyHouses();
            }
            break;
        case 15:
            if ('function' == typeof moreMyMessages) {
                moreMyMessages();
            }
            break;
        default:
            break;
    }
    return false;
}

function kft_ptlogout() {
    document.cookie = "uin=; path=/; domain=qq.com; expires=Fri, 02-Jan-1970 00:00:00 GMT";
    document.cookie = "skey=; path=/; domain=qq.com; expires=Fri, 02-Jan-1970 00:00:00 GMT";
    return false;
}

function kft_ptlogin_anonymous_open() {
    var nologin_wnd = FId("nologin_div");
    nologin_wnd.style.display = "block";
}

function kft_ptlogin_anonymous_close() {
    var nologin_wnd = FId("nologin_div");
    nologin_wnd.style.display = "none";
}

function kft_myxfd_exit(cityname) {
    window.location = "/" + cityname + "/kanfangtuan";
}

function kft_reload() {
    window.location.href = window.location.href;
    window.location.reload;
}

(function () {
    function SIP_Rival_posHeader() {
        var height = document.documentElement.scrollTop + document.documentElement.clientHeight / 2 + "px";
        if (!FEmpty(FId('resgInfo'))) {
            FId('resgInfo').style.top = height;
        }
        if (!FEmpty(FId('route_signup_success_div'))) {
            FId('route_signup_success_div').style.top = height;
        }
        if (!FEmpty(FId('route_anonymous_signup_success_div'))) {
            FId('route_anonymous_signup_success_div').style.top = height;
        }
        if (!FEmpty(FId('route_signup_dup_div'))) {
            FId('route_signup_dup_div').style.top = height;
        }
        if (!FEmpty(FId('house_attention_success_div'))) {
            FId('house_attention_success_div').style.top = height;
        }
        if (!FEmpty(FId('house_anonymous_attention_success_div'))) {
            FId('house_anonymous_attention_success_div').style.top = height;
        }
        if (!FEmpty(FId('house_collect_dup_div'))) {
            FId('house_collect_dup_div').style.top = height;
        }
        if (!FEmpty(FId('popup_err_div'))) {
            FId('popup_err_div').style.top = height;
        }
        if (!FEmpty(FId('house_attention_dup_div'))) {
            FId('house_attention_dup_div').style.top = height;
        }
        if (!FEmpty(FId('login_div'))) {
            FId('login_div').style.top = height;
        }
    };
    if (FBrowser.isIE6) {
        window.attachEvent("onload", SIP_Rival_posHeader);
        window.attachEvent("onresize", SIP_Rival_posHeader);
        window.attachEvent("onscroll", SIP_Rival_posHeader);
    }
    ;
})();

function kft_open_mask(callback) {
    var cur_size_arr = FgetPageSize();
    var tmp_size_arr = FgetWindowSize();
    if (cur_size_arr['height'] < tmp_size_arr['height']) {
        cur_size_arr['height'] = tmp_size_arr['height'];
    }
    FId('alert_float_layer').style.width = cur_size_arr['width'] + "px";
    FId('alert_float_layer').style.height = cur_size_arr['height'] + "px";
    FId('alert_float_layer').style.display = "";
    if (typeof callback == "function") {
        callback();
    }
}

function kft_close_mask(callback) {
    FId('alert_float_layer').style.display = "none";
    if (typeof callback == 'function') {
        callback();
    }
}

function FId(id) {
    return document.getElementById(id);
}

function FEmpty(v) {
    if (v != null && (typeof (v) == 'object' || typeof (v) == 'function')) return false;
    return (("" == v || undefined == v || null == v) ? true : false);
}

function IsIE6() {
    return (!!window.ActiveXObject && !window.XMLHttpRequest);
}

function getUin() {
    var arr = document.cookie.match(new RegExp("(^| )o_cookie=([^;]*)(;|$)"));
    var uin = '';
    if (arr != null) {
        uin = arr[2];
        uin = uin.replace(new RegExp("[^0-9]", "gm"), "");
        uin = uin.replace(new RegExp("^0+", "gm"), "");
    }
    return uin;
};var g_boss_img = new Image(1, 1);

function boss_statistics() {
    var iTy = arguments[0] ? arguments[0] : 1554;
    var sOp = arguments[1] ? arguments[1] : "other";
    var oPage = arguments[2] ? arguments[2] : "other";
    var oPosition = arguments[3] ? arguments[3] : "other";
    var sIp = arguments[4] ? arguments[4] : "";
    var iQQ = arguments[5] ? arguments[5] : getUin();
    var sBiz = arguments[6] ? arguments[6] : "";
    var iSta = arguments[7] ? arguments[7] : "";
    var iFlow = arguments[8] ? arguments[8] : "";
    var iCity = '';
    if ((typeof (g_city_info) != 'undefined') && (typeof (g_city_info['FSubName']) != 'undefined')) {
        iCity = g_city_info['FSubName'];
    }
    g_boss_img.src = '//btrace.qq.com/collect?sIp=' + sIp + '&iQQ=' + iQQ + '&sBiz=' + sBiz + '&sOp=' + sOp + '&iSta=' + iSta + '&iTy=' + iTy + '&iFlow=' + iFlow + '&oPage=' + oPage + '&oPosition=' + oPosition + '&iCity=' + iCity + '&ftime=' + new Date().getTime();
}

function bossRequest1988($paramsObj) {
    var tmpArr = [];
    for (var i = 0; i < $paramsObj.length; i++) {
        for (var j in $paramsObj[i]) {
            tmpArr.push(j + '=' + encodeURIComponent($paramsObj[i][j]));
        }
    }
    var sendUrl = "//btrace.qq.com/collect?" + tmpArr.join('&');
    var gImage = new Image(1, 1);
    gImage.src = sendUrl;
}

function ajax(args) {
    function createXHR() {
        return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    }

    function params(o) {
        var a = [];
        for (var i in o) {
            a.push(encodeURIComponent(i) + "=" + encodeURIComponent(o[i]));
        }
        return a.join("&");
    }

    var xhr = createXHR();
    args.method = args.method || "get";
    if (!args.cache) {
        args.data.cache = (new Date() * 1);
    }
    var data_str = params(args.data)
    if (/get/i.test(args.method) && data_str) {
        args.url += args.url.indexOf("?") < 0 ? '?' : '&';
        args.url += data_str;
    }
    xhr.open(args.method, args.url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (!args.datatype || args.datatype.toLowerCase() === 'text') {
                args.success(xhr.responseText);
            } else {
                args.success(xhr.responseXML);
            }
        }
    };
    if (/post/i.test(args.method)) {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
    } else {
        xhr.send();
    }
}

function searchTop(hashName) {
    var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
    var iQQ = (a == null ? "" : unescape(a[2]));
    var iCityId = typeof g_city_info != 'undefined' ? g_city_info.FId : 0;
    var sDomain = document.domain;
    var sUrl = window.location.href;
    var sRef = document.referrer;
    var maps = {};
    var url_para_str = get_ajax_param_map();
    url_para_arr = url_para_str.split('&');
    var len = url_para_arr.length;
    for (var i = 0; i < len; i++) {
        var para_tmp = url_para_arr[i].split('=');
        maps[para_tmp[0]] = para_tmp[1];
    }
    var zone = maps['CA'] ? maps['CA'] : '';
    zoneArr = zone.split(':');
    var iRegionId = zoneArr[1] ? zoneArr[1] : '';
    var iBusinessId = zoneArr[2] ? zoneArr[2] : '';
    var sKey = maps['all'] ? maps['all'] : '';
    var sPriceSegment = maps['NA'] ? maps['NA'].replace(':', '-') : '';
    var price_segment_map = {"0-10000": 1, "10001-20000": 2, "20001-30000": 3, "30001-40000": 4, "40001-9999999": 5}
    var iPriceSegId = 0;
    if (sPriceSegment in price_segment_map) {
        iPriceSegId = price_segment_map[sPriceSegment];
    }
    var sHouseTypeIds = maps['CF'] ? maps['CF'] : '';
    var iSellStatus = maps['ND'] ? maps['ND'] : '';
    var sHouseUnitIds = maps['CG'] ? maps['CG'] : '';
    var sFeatureIds = maps['CB'] ? maps['CB'] : '';
    var sOpenDate = maps['NC'] ? maps['NC'] : '';
    var sOpenDateIndex = 0;
    if (g_search_order == 5 || g_search_order == 6) {
        sOpenDateIndex = g_search_order;
    }
    var sBuildTypeIds = maps['CC'] ? maps['CC'] : '';
    var iPositionId = maps['NE'] ? maps['NE'] : '';
    var sSubwayIds = maps['CD'] ? maps['CD'] : '';
    var sSubwayStationIds = maps['CJ'] ? maps['CJ'] : '';
    var params = [{sIp: ""}, {iQQ: iQQ}, {sBiz: ''}, {sOp: 'topSearch'}, {iSta: ''}, {iTy: 1988}, {iFlow: new Date() * 1}, {sDomain: sDomain}, {sUrl: sUrl}, {sRef: sRef}, {sUserName: ''}, {sTelphone: ''}, {iCityId: iCityId}, {iRegionId: iRegionId}, {iBusinessId: iBusinessId}, {iHouseId: ''}, {sPrice: ''}, {iPriceSegId: iPriceSegId}, {sPriceSegment: sPriceSegment}, {sHouseTypeIds: sHouseTypeIds}, {iSellStatus: iSellStatus}, {sHouseUnitIds: sHouseUnitIds}, {sFeatureIds: sFeatureIds}, {sOpenDate: sOpenDate}, {sOpenDateIndex: sOpenDateIndex}, {sBuildTypeIds: sBuildTypeIds}, {iPositionId: iPositionId}, {sSubwayIds: sSubwayIds}, {sSubwayStationIds: sSubwayStationIds}, {iKFTId: ''}, {iKFTRouteId: ''}];
    bossRequest1988(params);
}

Fid("search_result_list") && FaddEvent(Fid("search_result_list"), 'click', function (evt) {
    var evt = window.event || evt;
    var target = evt.srcElement || evt.target;
    var loopTryNum = 10;
    try {
        var hid = purl = zoneId = '';
        if (target.tagName != 'A' && target.tagName != 'IMG') {
            return true;
        }
        if (target.tagName == "A") {
            purl = target.href;
        } else if (target.tagName == "IMG") {
            purl = target.parentNode.href;
        }
        for (var i = loopTryNum - 1, tagNode = target; i >= 0; i--, tagNode = tagNode.parentNode) {
            if (tagNode.attributes['bossSend']) {
                zoneId = tagNode.attributes['bossSend'].nodeValue;
                hid = tagNode.attributes['data-hid'].nodeValue;
                break;
            }
        }
        purl = purl.replace("javascript:void(0)", '');
        if (zoneId) {
            searchResult(zoneId, purl, hid);
        }
    } catch (e) {
    } finally {
    }
});

function searchResult(zoneId, purl, hid) {
    var url = "/index.php"
    ajax({
        url: url, data: {mod: "homepage", act: "bossHouseInfo", houseid: hid}, method: 'get', success: function (rst) {
            if (rst) {
                var data = window.JSON && window.JSON.parse ? window.JSON.parse(rst) : (new Function("return " + rst))();
                if (data.code == 0) {
                    var houseInfo = data.data;
                    var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
                    var iQQ = (a == null ? "" : unescape(a[2]));
                    var sDomain = document.domain;
                    var sUrl = window.location.href;
                    var sRef = document.referrer;
                    var params = [{sIp: ""}, {iQQ: iQQ}, {sBiz: ''}, {sOp: zoneId}, {iSta: ''}, {iTy: 1988}, {iFlow: new Date() * 1}, {sDomain: sDomain}, {sUrl: sUrl}, {sRef: sRef}, {sUserName: ''}, {sTelphone: ''}, {iCityId: houseInfo.FCityId}, {iRegionId: houseInfo.FRegionId}, {iBusinessId: houseInfo.FBusinessId}, {iHouseId: houseInfo.FId}, {sPrice: houseInfo.price}, {iPriceSegId: ''}, {sPriceSegment: ''}, {sHouseTypeIds: houseInfo.FHouseTypeIds}, {iSellStatus: houseInfo.FSellStatus}, {sHouseUnitIds: houseInfo.FHouseUnitIds}, {sFeatureIds: houseInfo.FFeatureIds}, {sOpenDate: houseInfo.FOpenDate}, {sOpenDateIndex: ''}, {sBuildTypeIds: houseInfo.FBuildTypeIds}, {iPositionId: houseInfo.FPositionId}, {sSubwayIds: houseInfo.FSubwayIds}, {sSubwayStationIds: houseInfo.FSubwayStationIds}, {iKFTId: ''}, {iKFTRouteId: ''}];
                    bossRequest1988(params);
                } else {
                }
            }
        }
    });
}

function bossSend1988(name, mobile, hid, kftid, routeid) {
    var url = "/index.php"
    ajax({
        url: url, data: {mod: "homepage", act: "bossHouseInfo", houseid: hid}, method: 'get', success: function (rst) {
            if (rst) {
                var data = window.JSON && window.JSON.parse ? window.JSON.parse(rst) : (new Function("return " + rst))();
                if (data.code == 0) {
                    var houseInfo = data.data;
                    var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
                    var iQQ = (a == null ? "" : unescape(a[2]));
                    var sDomain = document.domain;
                    var sUrl = window.location.href;
                    var sRef = document.referrer;
                    var params = [{sIp: ""}, {iQQ: iQQ}, {sBiz: ''}, {iSta: ''}, {iTy: 1988}, {iFlow: new Date() * 1}, {sDomain: sDomain}, {sUrl: sUrl}, {sRef: sRef}, {sUserName: name}, {sTelphone: mobile}, {iCityId: houseInfo.FCityId}, {iRegionId: houseInfo.FRegionId}, {iBusinessId: houseInfo.FBusinessId}, {iHouseId: houseInfo.FId}, {sPrice: houseInfo.price}, {iPriceSegId: ''}, {sPriceSegment: ''}, {sHouseTypeIds: houseInfo.FHouseTypeIds}, {iSellStatus: houseInfo.FSellStatus}, {sHouseUnitIds: houseInfo.FHouseUnitIds}, {sFeatureIds: houseInfo.FFeatureIds}, {sOpenDate: houseInfo.FOpenDate}, {sOpenDateIndex: ''}, {sBuildTypeIds: houseInfo.FBuildTypeIds}, {iPositionId: houseInfo.FPositionId}, {sSubwayIds: houseInfo.FSubwayIds}, {sSubwayStationIds: houseInfo.FSubwayStationIds}];
                    if (parseInt(kftid) && parseInt(routeid)) {
                        params.splice(3, 0, {sOp: "signupKFT"});
                    } else {
                        params.splice(3, 0, {sOp: "signupHouse"});
                    }
                    params.push({iKFTId: kftid});
                    params.push({iKFTRouteId: routeid});
                    bossRequest1988(params);
                } else {
                }
            }
        }
    });
}

function bossSend1988Route(name, mobile, kftid, routeid) {
    var url = "/index.php"
    ajax({
        url: url,
        data: {mod: "homepage", act: "bossRoute", name: name, mobile: mobile, kftid: kftid, routeid: routeid},
        method: 'get',
        success: function (rst) {
        }
    });
}/*  |xGv00|6437ff798f9f44abbf9c3e7a291817f1 */