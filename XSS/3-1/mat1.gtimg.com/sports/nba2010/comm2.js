//计算字符串长度
 String.prototype.strLen = function() {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
		if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) len += 2; else len ++;
   }
   return len;
 }
//将字符串拆成字符，并存到数组中
String.prototype.strToChars = function(){
   var chars = new Array();
   for (var i = 0; i < this.length; i++){
       chars[i] = [this.substr(i, 1), this.isCHS(i)];
   }
  String.prototype.charsArray = chars;
    return chars;
}
//判断某个字符是否是汉字
String.prototype.isCHS = function(i){
    if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) 
        return true;
   else
       return false;
}
//截取字符串（从start字节到end字节）
String.prototype.subCHString = function(start, end){
   var len = 0;
   var str = "";
   this.strToChars();
   for (var i = 0; i < this.length; i++) {
      if(this.charsArray[i][1])
           len += 2;
       else
           len++;
      if (end < len)
          return str;
       else if (start < len)
          str += this.charsArray[i][0];
   }
   return str;
}
//截取字符串（从start字节截取length个字节）
String.prototype.subCHStr = function(start, length){
   return this.subCHString(start, start + length);
}

function eventBindObj(id,obj,callback)
{
	$(id).obj = obj;
    addEventHandler($(id),  "click", callback); 
}

function initComponent(dispatcher,dataConfig)
{
    var len = dataConfig.length;
    for(var i = 0; i< len ; i++)
    {
        if(typeof dataConfig[i]["name"] == 'function'){
            var com = new dataConfig[i]["name"](dataConfig[i]["url"],dataConfig[i]["opid"],dataConfig[i]["file"],dataConfig[i]["config"]);
            dispatcher.register_component(com);
        }
    }   
}

function each(a, b) {
    if (isUndefined(a[0])) for (var c in a) isFunction(a[c]) || b(c, a[c]);
    else {
        c = 0;
        for (var d = a.length; c < d; c++) isFunction(a[c]) || b(a[c], c)
    }
}

function addEventHandler(oTarget, sEventType, fnHandler) {
        if (oTarget.addEventListener) {
                oTarget.addEventListener(sEventType, fnHandler, false);
        } else if (oTarget.attachEvent) {
                oTarget.attachEvent("on" + sEventType, fnHandler);
        } else {
                oTarget["on" + sEventType] = fnHandler;
        }
};

function removeEventHandler(oTarget, sEventType, fnHandler) {
        if (oTarget.removeEventListener) {
                oTarget.removeEventListener(sEventType, fnHandler, false);
        } else if (oTarget.detachEvent) {
                oTarget.detachEvent("on" + sEventType, fnHandler);
        } else {
                oTarget["on" + sEventType] = null;
        }
};

function trim(a) {
    return a.replace(/^\s+|\s+$/g, "");
}

function isUndefined(a) {
    return typeof a == "undefined";
}

if (!String.trim) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g,'');
	}
}

function $() {
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
function getElementsByClassName(className, tag, parent){
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

function JsLoad(sUrl ,options){
	options = options || {};
	if(!options.sId) options.sId = 'jsload_'+Math.random();
	if(!options.varname) options.varname = 'datav4';
	var sId = 'jsload_'+options.sId;
	
	if($(sId)!='undefined'&&$(sId)!=null){
		$(sId).parentNode.removeChild($(sId));
	}
	var _script = document.createElement("script");
	_script.setAttribute("id", sId);
	_script.setAttribute("type", "text/javascript");
	_script.setAttribute("src", sUrl);
	document.getElementsByTagName("head")[0].appendChild(_script);

	if (!!document.all) {// IE
		_script.onreadystatechange = function(){
			var responseText = null;
			if (this.readyState == "loaded" || this.readyState == "complete") {
				if(options.completeListener) {
					try{
						this.responseText = eval('('+options.varname+')');		  	  
						if(typeof this.responseText != null){
							options.completeListener(this.responseText);
						}else{
							if(options.errorListener) {
								options.errorListener();
							}
						}
					}
					catch(e)
					{
						if(options.errorListener) 
						{
							options.errorListener();
						}
					}
				}
				_data=null;
				if($(sId)!='undefined'&&$(sId)!=null){
					$(sId).parentNode.removeChild($(sId));
				}
			}
		};
	}
	else {// FF
		_script.onload = function(){
			var responseText = null;
			if(options.completeListener) {
				try{
					this.responseText = eval('('+options.varname+')'); 
					if(typeof this.responseText!=null){
						options.completeListener(this.responseText);
					}else{
						if(options.errorListener) {
							options.errorListener();
						}	
					}
				}
				catch(e)
				{
				  if(options.errorListener) {
						options.errorListener();
					}
				}
			}
			_data=null;
			//alert( sId );
			
			if($(sId)!='undefined'&&$(sId)!=null){
				$(sId).parentNode.removeChild($(sId));
			}
		};
	}
} 

//event功能
function addEvent(target, eventName, handler, argsObject ) {
	var eventHandler = handler;
	if(argsObject)
	{ 
		eventHander = function(e)
		{
			handler.call(argsObject, e);
		}
	}
	if(window.attachEvent)// IE
		target.attachEvent("on" + eventName, eventHander );
	else// FF
		target.addEventListener(eventName, eventHander, false);
	return true;
}
function removeEvent(node, type, listener ) {
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

function extend() {// deep 2
	var target = arguments[0] || {}, i = 1, length = arguments.length, options;
	if ( (options = arguments[ 1 ]) != null ){
		for ( var name in options ) {
			var src = target[ name ], copy = options[ name ];
			if ( target === copy ){
				continue;
			}
			if (  copy && typeof copy === "object" && typeof src === "object" ){
				target[ name ] = extend( src, copy );
			}else if ( copy !== 'undefined' ){
				target[ name ] = copy;
			}
		}
	}
	return target;
}

function isFunction( obj ) {
	return Object.prototype.toString.call(obj) === "[object Function]";
}

/*------- Begin: 页面表格标签淡入淡出效果 -------*/
var sAlpha = 0;
var inteval = 0.1;
getObj = function(id){
	return document.getElementById(id);
}
function MyPcTurnM(obj,Myclasson,Myclassoff){
  var Pobj=obj.parentNode;
  var Pid=Pobj.id;
  var Pdiv=Pobj.getElementsByTagName("div");
  for(i=0;i<Pdiv.length;i++){
  	if(Pdiv[i]==obj){
  	  Pdiv[i].className=Myclasson;
  	  getObj(Pid+i).className="";
  	} else {
  	  Pdiv[i].className=Myclassoff;
  	  getObj(Pid+i).className="undis";
  	}
  }
}

function FlashOnePxSwitch(obj, divIdName){
  var divObj = $(divIdName);
  if('on' != obj.className)
  {
    divObj.className = "FlashOffPix";  
  }
  else
  {
    divObj.className = "FlashOnPix";  
  }
}

function filterArr(arr){   
    var temp = [];   
    for(var n = 0; n < arr.length; n++){   
        if(!hasArr(arr[n], temp)){   
            temp.push(arr[n]);   
        }   
    }   
    return temp;   
}   
  
function hasArr(obj, arr){   
    for(var i = 0; i < arr.length; i++){   
        if(arr[i] == obj){   
            return true;   
        }   
    }   
    return false;   
} 

function MyTransTimer(id, fcolor, tcolor)
{
	this.id = id;
	this.fcolor = fcolor;
	this.tcolor = tcolor;
	this.timer = null;
	this.count = 0;
}
MyTransTimer.prototype.getColor = function (fcolor, tcolor, n)
{
	var fr = parseInt(fcolor.substr(1,2), 16);
	var fg = parseInt(fcolor.substr(3,2), 16);
	var fb = parseInt(fcolor.substr(5,2), 16);
	var tr = parseInt(tcolor.substr(1,2), 16);
	var tg = parseInt(tcolor.substr(3,2), 16);
	var tb = parseInt(tcolor.substr(5,2), 16);
	if (fr>tr)
	{
		var rr = Math.ceil(fr - ((fr-tr)*n/100)).toString(16);
		if (rr.length<2)
			rr = "0"+rr;
	}
	else
	{
		var rr = Math.ceil(fr + ((tr-fr)*n/100)).toString(16);
		if (rr.length<2)
			rr = "0"+rr;
	}
	if (fg>tg)
	{
		var rg = Math.ceil(fg - ((fg-tg)*n/100)).toString(16);
		if (rg.length<2)
			rg = "0"+rg;
	}
	else
	{
		var rg = Math.ceil(fg + ((tg-fg)*n/100)).toString(16);
		if (rg.length<2)
			rg = "0"+rg;
	}
	if (fb>tb)
	{
		var rb = Math.ceil(fb - ((fb-tb)*n/100)).toString(16);
		if (rb.length<2)
			rb = "0"+rb;
	}
	else
	{
		var rb = Math.ceil(fb + ((tb-fb)*n/100)).toString(16);
		if (rb.length<2)
			rb = "0"+rb;
	}
	return("#"+rr+rg+rb);
}
MyTransTimer.prototype.transTimer = function ( font )
{
	var obj = document.getElementById(this.id);
	if (!obj)
	{
		return;
	}
	if( font == 1 ){
		obj.style.color = this.getColor(this.fcolor,this.tcolor,this.count);
	}
	else{
		obj.style.background = this.getColor(this.fcolor,this.tcolor,this.count);	
	}
	this.count+=10;
	if (this.count>100)
	{
		clearInterval(this.timer);
		return;
	}
	var self=this;
	setTimeout(function(){self.transTimer( font );},200);
}

function formatTable(id)
{
	var list = $(id).getElementsByTagName("tr");
	for(i=0;i<list.length;i++)
	{
		if(i%2)
		{
			list[i].className="m";
		}
		list[i].onmouseover = function(){this.cn=this.className;this.className="s";}
		list[i].onmouseout = function(){this.className=this.cn;}
	}
}

/*  |xGv00|4eef329bd4042a9bdc2a78aa457dc667 */