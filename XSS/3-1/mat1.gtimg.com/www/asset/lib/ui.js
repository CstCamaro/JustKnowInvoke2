define(function(require, exports, module){	


	//函数只执行一次
	Function.prototype.once = function(){
		var exed = false, _self = this;
		return function(){
			if(exed) return;
			else{
				exed = true;
				_self.apply(this, arguments);
			}
		}
	}
	
	//AOP before
	Function.prototype.before = function( func ){
		var _self = this;
		return function(){
			if(func.apply(this, arguments) == false){
				return false;
			}
			return _self.apply(this, arguments);
		}
	}
	
	//AOP after
	Function.prototype.after = function( func ){
		var _self = this;
		return function(){
			var ret = _self.apply(this, arguments);
			if(ret === false){
				return false;
			}
			func.apply(this, arguments);
			return ret;
		}
	}

	String.prototype.hasString = function(a) {
	    if (typeof a == "object") {
	        for (var b = 0, c = a.length; b < c; b++) if (!this.hasString(a[b])) return false;
	        return true
	    } else if (this.indexOf(a) != -1) return true
	};
	/* UI */
	if(!window['ui']) {
		var ui = {};
	}

	var isCompatible = function (other) {
		if( other===false 
			|| !Array.prototype.push
			|| !Object.hasOwnProperty
			|| !document.createElement
			|| !document.getElementsByTagName
			) {
			alert('TR- if you see this message isCompatible is failing incorrectly.');
			return false;
		}
		return true;
	}
	function getType(o) {
		return Object.prototype.toString.call(o).slice(8, -1)
	}

	function $(){
		var elements = new Array();
		for (var i = 0; i < arguments.length; i++) {
			var element = arguments[i];
			if (typeof element == 'string') {
				element = document.getElementById(element);
			}
			if (arguments.length == 1) {
				return element;
			}
			elements.push(element);
		}
		return elements;
	}
	ui['$'] = $;
	function $$( className, tag, parent ){
		parent = parent || document;
		if(!(parent = $(parent))) return false;
		var allTags = (tag == "*" && parent.all) ? parent.all : parent.getElementsByTagName(tag);
		var matchingElements = new Array();
		className = className.replace(/\-/g, "\\-");
		var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
		
		var element;
		for(var i=0; i<allTags.length; i++){
			element = allTags[i];
			if(regex.test(element.className)){
				matchingElements.push(element);
			}
		}
		return matchingElements;
	}
	ui['$$'] = $$;
	function addEvent( node, type, listener ){
		if(!isCompatible()) { return false }
		if(!(node = $(node))) return false;
		
		if (node.addEventListener) {
			node.addEventListener( type, listener, false );
			return true;
		} else if(node.attachEvent) {
			node['e'+type+listener] = listener;
			node[type+listener] = function(){node['e'+type+listener]( window.event );}
			node.attachEvent( 'on'+type, node[type+listener] );
			return true;
		}
		return false;
	}
	ui['addEvent'] = addEvent;
	function removeEvent( node, type, listener ){
		if(!(node = $(node))) return false;
		if (node.removeEventListener) {
			node.removeEventListener( type, listener, false );
			return true;
		} else if (node.detachEvent) {
			node.detachEvent( 'on'+type, node[type+listener] );
			node[type+listener] = null;
			return true;
		}
		return false;
	}
	ui['removeEvent'] = removeEvent;
	function css(obj, attr, value){
		if(arguments.length==2)
		{
			if(attr!='opacity') {
				return parseInt(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr]);
			} else {
				return Math.round(100*parseFloat( obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr] ));
			}
		}
		else if(arguments.length==3)
			switch(attr) {
				case 'width':
				case 'height':
				case 'paddingLeft':
				case 'paddingTop':
				case 'paddingRight':
				case 'paddingBottom':
					value=Math.max(value,0);
				case 'left':
				case 'top':
				case 'marginLeft':
				case 'marginTop':
				case 'marginRight':
				case 'marginBottom':
					obj.style[attr]=value+'px';
					break;
				case 'opacity':
					obj.style.filter="alpha(opacity:"+value+")";
					obj.style.opacity=value/100;
					break;
				default:
					obj.style[attr]=value;
			}
		
		return function (attr_in, value_in){css(obj, attr_in, value_in)};
	}
	ui['css'] = css;

	function crossAsynJson(url, fun, cb, charset){
		var script = document.createElement("script"),
		head = document.getElementsByTagName('head')[0];
		window[fun] = function(i) {
			window[fun] = undefined;
			try {
				delete window[fun]
			} catch(k) {}
			cb(i);
			
			head && setTimeout(function() {
				head.removeChild(script)
			}, 5)
		};
		charset && script.setAttribute('charset', charset);
		script.setAttribute('src', url);
		head.appendChild(script)
	}
	ui['crossAsynJson'] = crossAsynJson;
	function loadJs(file, callback, charset){
		var _doc = document.getElementsByTagName('head')[0];
		var js = document.createElement('script');
		js.setAttribute('type', 'text/javascript');
		js.setAttribute('src', file);
		js.setAttribute('charset', charset || "utf-8" );
		_doc.appendChild(js);
		if (!/*@cc_on!@*/0) {
			js.onload = function () {
				callback();
			}
		} else {
			js.onreadystatechange = function () {
				if (js.readyState == 'loaded' || js.readyState == 'complete') {
					 js.onreadystatechange = null;
					 callback && callback();
				}
			}
		}

		return false;
	}	
	ui['loadJs'] = loadJs;
	function loadedJs(file, callback){
		var _doc = document.getElementsByTagName('head')[0];
		var js = document.createElement('script');
		js.setAttribute('type', 'text/javascript');
		js.setAttribute('src', file);
		_doc.appendChild(js);
		if (!/*@cc_on!@*/0) {
			js.onload = function () {
				callback && callback();
				_doc && setTimeout(function() {
					_doc.removeChild(js)
				}, 5)
			}
		} else {
			js.onreadystatechange = function () {
				if (js.readyState == 'loaded' || js.readyState == 'complete') {
					 js.onreadystatechange = null;
					 callback && callback();
					 _doc && setTimeout(function() {
						_doc.removeChild(js)
					}, 5)
				}
			}
		}
		
		return false;
	}	
	ui['loadedJs'] = loadedJs;
	function getX(obj){
		return obj.offsetParent ? obj.offsetLeft + getX(obj.offsetParent) : obj.offsetLeft
	}
	ui['getX'] = getX;
	function getY(obj){
		return obj.offsetParent ? obj.offsetTop + getY(obj.offsetParent) : obj.offsetTop
	}
	ui['getY'] = getY;

	function pageWidth() {
        return document.body.scrollWidth || document.documentElement.scrollWidth
    }
    ui['pageWidth'] = pageWidth;
    function pageHeight() {
        return document.body.scrollHeight || document.documentElement.scrollHeight
    }
    ui['pageHeight'] = pageHeight;
    function windowWidth() {
        var a = document.documentElement;
        return self.innerWidth || a && a.clientWidth || document.body.clientWidth
    }
    ui['windowWidth'] = windowWidth;
    function windowHeight() {
        var a = document.documentElement;
        return self.innerHeight || a && a.clientHeight || document.body.clientHeight
    }
	ui['windowHeight'] = windowHeight;

	function scrollX(a) {
        var doc = document.documentElement;
        if (a) {
            var c = a.parentNode,
            e = a.scrollLeft || 0;
            if (a == doc) e = ui.scrollX();
            return c ? e + ui.scrollX(c) : e
        }
        return self.pageXOffset || doc && doc.scrollLeft || document.body.scrollLeft
    }
    ui['scrollX'] = scrollX;
    function scrollY(a) {
        var b = document.documentElement;
        if (a) {
            var c = a.parentNode,
            e = a.scrollTop || 0;
            if (a == b) e = ui.scrollY();
            return c ? e + ui.scrollY(c) : e
        }
        return self.pageYOffset || b && b.scrollTop || document.body.scrollTop
    }
    ui['scrollY'] = scrollY;
    function scrollTo(b, c) {
        return window.scrollTo(b, c)
    }
	ui['scrollTo'] = scrollTo;
	function each(obj, fn){
		if (typeof obj[0] == 'undefined') for (var k in obj) (getType(obj[k]) == 'Function') || fn(k, obj[k]);
		else {
			var i = 0, len = obj.length;
			for (i = 0 ; i < len; i++) (getType(obj[i]) == 'Function') || fn(obj[i], i)
		}
	}
	ui['each'] = each;
	var ANIMATE_TYPE={
		BUFFER: 1,
		FLEX: 2
	};

	function StopAnimate(obj) {
		clearInterval(obj.timer);
	}

	function animateBuffer(obj, oTarget, fnCallBack, fnDuring) {
		var bStop=true;
		var attr='';
		var speed=0;
		var cur=0;
		
		for(attr in oTarget) {
			cur=css(obj, attr);
			if(oTarget[attr]!=cur)
			{
				bStop=false;
				
				speed=(oTarget[attr]-cur)/5;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				
				css(obj, attr, cur+speed);
			}
		}
		
		if(fnDuring)fnDuring.call(obj);
		
		if(bStop) {
			clearInterval(obj.timer);
			obj.timer=null;
			
			if(fnCallBack)fnCallBack.call(obj);
		}
	}

	function animateFlex(obj, oTarget, fnCallBack, fnDuring) {
		var bStop=true;
		var attr='';
		var speed=0;
		var cur=0;
		
		for(attr in oTarget) {
			if(!obj.oSpeed)obj.oSpeed={};
			if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
			cur=css(obj, attr);
			if(Math.abs(oTarget[attr]-cur)>=1 || Math.abs(obj.oSpeed[attr])>=1) {
				bStop=false;
				
				obj.oSpeed[attr]+=(oTarget[attr]-cur)/5;
				obj.oSpeed[attr]*=0.7;
				
				css(obj, attr, cur+obj.oSpeed[attr]);
			}
		}
		
		if(fnDuring)fnDuring.call(obj);
		
		if(bStop) {
			clearInterval(obj.timer);
			obj.timer=null;
			
			if(fnCallBack)fnCallBack.call(obj);
		}
	}
	/**
		@para object obj：目标元素
		@para object  oTarget：{left:100px; height:200px} 最终结果
		@para string iType: ANIMATE_TYPE.BUFFER(缓冲) /ANIMATE_TYPE.FLEX(加速)
		@para function fnCallBack: 完成回调
		@para function fnDuring：运动调用
	*/
	function animate(obj, oTarget, iType, fnCallBack, fnDuring) {
		var fnMove=null;
		if(obj.timer) {
			clearInterval(obj.timer);
		}
		//console.log(iType);
		switch(iType) {
			case ANIMATE_TYPE.BUFFER:
				fnMove = animateBuffer;
				break;
			case ANIMATE_TYPE.FLEX:
				fnMove = animateFlex;
				break;
		}
		//console.log(fnCallBack);
		obj.timer=setInterval(function (){
			fnMove(obj, oTarget, fnCallBack, fnDuring);
		}, 30);
	}
	ui['animate'] = animate;
	function E(a){
		a = window.event || a;
		return {
			clone: true,
			stop: function() {
				if (a && a.stopPropagation) a.stopPropagation();
				else a.cancelBubble = true
			},
			prevent: function() {
				if (a && a.preventDefault) a.preventDefault();
				else a.returnValue = false
			},
			target: a.target || a.srcElement,
			x: a.clientX || a.pageX,
			y: a.clientY || a.pageY,
			button: a.button,
			key: a.keyCode,
			shift: a.shiftKey,
			alt: a.altKey,
			ctrl: a.ctrlKey,
			type: a.type,
			wheel: a.wheelDelta / 120 || -a.detail / 3
		}
	}
	ui['E'] = E;

	function cookie(name, value, expires, path, domain) {
		if (arguments.length == 1) {
			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			if(arr != null){
				return decodeURIComponent(arr[2]);
			}
			return null;
		} else {	
			if(!arguments[1]){
				document.cookie = name + "=11" + ((path) ? "; path="+path:"; path=/")+((domain) ? "; domain="+domain : "") + "; expires=Fri, 02-Jan-1970 00:00:00 GMT";
			}else{
				e = "";
				e = new Date;
				if (!expires) {
					e.setTime(e.getTime() + 24*60*60*1E3);
					
				}else{
					e.setTime(e.getTime() + expires*24*60*60*1E3);
				}
				e = "; expires=" + e.toGMTString()
				document.cookie = name + "=" + value + e + ((path) ? "; path=" + path : "; path=/") + ((domain) ? ";domain=" + domain : "");
			}
		}
	}
	ui['cookie'] = cookie;

	ui.localData = {
		 hname:location.hostname ? location.hostname : 'localStatus',
		 isLocalStorage:window.localStorage ? true : false,
		 dataDom:null,
		 initDom:function(){ //初始化userData
			 if(!this.dataDom){
				 try{
					 this.dataDom = document.createElement('input');//这里使用hidden的input元素
					 this.dataDom.type = 'hidden';
					 this.dataDom.style.display = "none";
					 this.dataDom.addBehavior('#default#userData');//这是userData的语法
					 document.body.appendChild(this.dataDom);
					 var exDate = new Date();
					 exDate = exDate.getDate()+30;
					 this.dataDom.expires = exDate.toUTCString();//设定过期时间
				 }catch(ex){
					 return false;
				 }
			 }
			 return true;
		 },
		 set:function(key,value){
			 if(this.isLocalStorage){
				 window.localStorage.setItem(key,value);
			 }else{
				 if(this.initDom()){
					
					 this.dataDom.load(this.hname);
					 this.dataDom.setAttribute(key,value);
					 this.dataDom.save(this.hname)
				 }
			 }
		 },
		 get:function(key){
			 if(this.isLocalStorage){
				 return window.localStorage.getItem(key);
			 }else{
				 if(this.initDom()){
					 this.dataDom.load(this.hname);
					 return this.dataDom.getAttribute(key);
				 }
			 }
		 },
		 remove:function(key){
			 if(this.isLocalStorage){
				 localStorage.removeItem(key);
			 }else{
				 if(this.initDom()){
					 this.dataDom.load(this.hname);
					 this.dataDom.removeAttribute(key);
					 this.dataDom.save(this.hname)
				 }
			 }
		 }
	};
	function getClass(element) {
		if(!(element = $(element))) return false;
		return element.className.replace(/\s+/,' ').split(' ');
	};
	ui['getClass'] = getClass;

	function hasClass(element, className) {
		if(!(element = $(element))) return false;
		var classes = getClass(element);
		for (var i = 0; i < classes.length; i++) {
			if (classes[i] === className) { return true; }
		}
		return false;
	};
	ui['hasClass'] = hasClass;

	function addClass(element, className) {
		if(!(element = $(element))) return false;
		element.className += (element.className ? ' ' : '') + className;
		return true;
	};
	ui['addClass'] = addClass;

	function removeClass(element, className) {
		if(!(element = $(element))) return false;
		var classes = getClass(element);
		var length = classes.length
		for (var i = length-1; i >= 0; i--) {
			if (classes[i] === className) { delete(classes[i]); }
		}
		element.className = classes.join(' ');
		return (length == classes.length ? false : true);
	};
	ui['removeClass'] = removeClass;

	ui.ready = function(a) {
        if (ui.ready.done) return a();
        if (ui.isReady.done) ui.readyDo.push(a);
        else {
            ui.readyDo = [a];
            ui.isReady()
        }
    }
    ui.readyDo = [];
    ui.isReady = function() {
        if (!ui.isReady.done) {
            ui.isReady.done = true;
            if (document.readyState == "complete") ui.onReady();
            else if (document.addEventListener) document.addEventListener("DOMContentLoaded",
				function() {
					document.removeEventListener("DOMContentLoaded", arguments.callee, false);
					ui.onReady()
				}, false);
            else if (document.attachEvent) {
                var a = top != self;
                if (a) document.attachEvent("onreadystatechange",
                function() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        ui.onReady()
                    }
                });
                else document.documentElement.doScroll && !a &&
                function() {
                    if (!ui.ready.done) {
                        try {
                            document.documentElement.doScroll("left")
                        } catch(b) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        ui.onReady()
                    }
                } ()
            }
            ui.addEvent(window, "load", ui.onReady)
        }
    }
    ui.onReady = function() {
        if (!ui.ready.done) {
            ui.ready.done = true;
            for (var a = 0, b = ui.readyDo.length; a < b; a++) try {
                ui.readyDo[a]()
            } catch(c) {}
            ui.readyDo = null
        }
    }

	function B() {
        var a = {},
        b = navigator.userAgent;
        a.win = b.hasString("Windows") || b.hasString("Win32");
        a.ie6 = b.hasString("MSIE 6") && !b.hasString("MSIE 7") && !b.hasString("MSIE 8");
        a.ie8 = b.hasString("MSIE 8");
        a.ie = b.hasString("MSIE");
        a.opera = window.opera || b.hasString("Opera");
        a.safari = b.hasString("WebKit");
        a.ipad = b.hasString("iPad");
        a.mac = b.hasString("Mac");
        a.firefox = b.hasString("Firefox");
        return a
    }

    ui['B'] = B();

	return ui
});/*  |xGv00|afab9bf14290a7f1bba137af4f2b0492 */