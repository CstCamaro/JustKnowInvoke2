var uedCommon = {};
uedCommon.Version = "1.02";
uedCommon.Author = "Hunkjiang";
uedCommon.CreateDate = "2011-02-16";
uedCommon.EditDate = "2011-05-05";
uedCommon.EditContent = "add fn.realOut()";
uedCommon.fn = {
    getEbyId: function(objectId) {
        if (document.getElementById && document.getElementById(objectId)) {
            return document.getElementById(objectId)
        } else if (document.all && document.all(objectId)) {
            return document.all(objectId)
        } else if (document.layers && document.layers[objectId]) {
            return document.layers[objectId]
        } else {
            return false
        }
    },
    getEbyTag: function(oTag) {
        if (document.getElementsByTagName && document.getElementsByTagName(oTag)) {
            return document.getElementsByTagName(oTag)
        } else {
            return false
        }
    },
    getEbyClass: function(obj, tag, clsName) {
        var reArray = [];
        var target = obj.getElementsByTagName(tag);
        for (i = 0; i < target.length; i++) {
            if (target[i].className == clsName) {
                reArray.push(target[i]);
            }
        }
        return reArray;
    },
    ie: /msie/.test(window.navigator.userAgent.toLowerCase()),
    moz: /gecko/.test(window.navigator.userAgent.toLowerCase()),
    isloaded: function(obj, fCallback) {
        if (this.ie) {
            obj.onreadystatechange = function() {
                if (this.readyState == 'loaded' || this.readyState == 'complete') {
                    fCallback()
                }
            }
        } else if (this.moz) {
            obj.onload = function() {
                fCallback()
            }
        } else {
            fCallback()
        }
    },
    LoadJs: function(sUrl, fCallback) {
        var _script = document.createElement('script');
        _script.setAttribute('type', 'text/javascript');
        _script.setAttribute('charset', 'gb2312');
        _script.setAttribute('src', sUrl);
        document.getElementsByTagName('head')[0].appendChild(_script);
        this.isloaded(_script, fCallback)
    },
    addEvent: function(l, i, I) {
        if (l.attachEvent) {
            l.attachEvent("on" + i, I)
        } else {
            l.addEventListener(i, I, false)
        }
    },
    delEvent: function(l, i, I) {
        if (l.detachEvent) {
            l.detachEvent("on" + i, I)
        } else {
            l.removeEventListener(i, I, false)
        }
    },
	getStyle:function(Ele,Attri){
	var style = '';
	if(Ele.currentStyle)
		{return style = Ele.currentStyle[Attri]}
	else if(window.getComputedStyle)
		{return style = window.getComputedStyle(Ele,null)[Attri];
		}
	},
	setStyle:function(Ele,Attri){
	var style = '';
	if(Ele.currentStyle)
		{return style = Ele.currentStyle[Attri]}
	else if(window.getComputedStyle)
		{return style = window.getComputedStyle(Ele,null)[Attri];
		}
	},
	realOut:function (obj, e, callback) {
        var e = window.event || e,
        relatedTarget = e.toElement || e.relatedTarget;
        while (relatedTarget && relatedTarget != obj) {
            relatedTarget = relatedTarget.parentNode;
        }
        if (!relatedTarget) {
            callback();
        }
    },
	isEobj: function(obj) {
            var oTrue;
            if (obj.nodeType == 1) {
                oTrue = obj
            } else if (obj.nodeType == 3) {
                oTrue = obj.previousSibling
            }
            return oTrue
        }
};
function __firefox(){
    HTMLElement.prototype.__defineGetter__("runtimeStyle", __element_style);
    window.constructor.prototype.__defineGetter__("event", __window_event);
    Event.prototype.__defineGetter__("srcElement", __event_srcElement);
}
function __element_style(){
    return this.style;
}
function __window_event(){
    return __window_event_constructor();
}
function __event_srcElement(){
    return this.target;
}
function __window_event_constructor(){
    if(document.all){
        return window.event;
    }
    var _caller = __window_event_constructor.caller;
    while(_caller!=null){
        var _argument = _caller.arguments[0];
        if(_argument){
            var _temp = _argument.constructor;
            if(_temp.toString().indexOf("Event")!=-1){
                return _argument;
            }
        }
        _caller = _caller.caller;
    }
    return null;
}
if(window.addEventListener){
    __firefox();
}/*  |xGv00|e6de01a122787fbff0b94239afbb7bd0 */