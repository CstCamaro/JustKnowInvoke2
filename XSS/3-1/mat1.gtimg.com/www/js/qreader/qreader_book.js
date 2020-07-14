(function(){
	document.domain = 'qq.com';
	var iframeClass = function(){
		var th = this;
		th.body = document.body;	

		th.layerbg;
		th.main;
		th.layerTitle;
		th.con;
		th.close;
		th.iframe;
		th.$ = function(e){return document.getElementById(e);}
		th.isDrag=false;
		th.isIE=document.all?true:false;

		th.getMX=function(e){return th.isIE?e.clientX+Math.max(document.body.scrollLeft,document.documentElement.scrollLeft):e.pageX;}
		th.getMY=function(e){return th.isIE?e.clientY+Math.max(document.body.scrollTop,document.documentElement.scrollTop):e.pageY;}
		th.setEvent=function(a){if(a.setCapture)a.setCapture();if(window.captureEvents)window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);}
		th.releaseEvent=function(a){if(a.releaseCapture)a.releaseCapture();if(window.releaseEvents)window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);}
		th.creatDom=function(o,parentNode){function applyStyles(el, styles){function setStyle(el,prop, value){if(!el||typeof value !="string") return;prop=prop?prop:"";value=value?value:"";el.style[prop]=value;return el};if(!styles)	return;if(typeof styles == "string"){var re = /\s?([a-z\-]*)\:\s?([^;]*);?/gi,matches;while ((matches = re.exec(styles)) != null){setStyle(el,matches[1], matches[2])}}else if (typeof styles=="object"){for (var style in styles){setStyle(el,style,styles[style])}}};var el=document.createElement(o.tag||'div'),useSet=el.setAttribute?true:false; for(var attr in o){if(attr=="tag"||attr=="children"||attr=="cn"||attr=="html"||attr=="style"||typeof o[attr]=="function") continue;if(attr=="cls"){el.className = o["cls"];}else{if(useSet) el.setAttribute(attr,o[attr]);else el[attr] = o[attr];}}if(o.html){el.innerHTML=o.html;}applyStyles(el,o.style);if(parentNode){parentNode.appendChild(el);}return el}
		th.getObjPosition=function(obj){var a={};a.x = obj.offsetLeft,a.y = obj.offsetTop;while(obj=obj.offsetParent){a.x += obj.offsetLeft;a.y += obj.offsetTop;}return a;}
		th.getWindowSize=function(){var a={};if(window.self&&self.innerWidth){a.width=self.innerWidth;a.height=self.innerHeight;return a;}if(document.documentElement&&document.documentElement.clientHeight){a.width=document.documentElement.clientWidth;a.height=document.documentElement.clientHeight;return a;}a.width=document.body.clientWidth;a.height=document.body.clientHeight;return a;}
		th.keyDownListener=function(e){
			e=e?e:window.event;
			if(e.keyCode == 27){
				th.closePopup();
			}
		}
		th.keyDownAddListener=function(){
			if(th.isIE){
				document.attachEvent("onkeydown",th.keyDownListener);
			}else{
				document.addEventListener("keydown",th.keyDownListener,false);
			}
		}
		th.keyDownRemoveListener=function(){
			if(th.isIE){
				document.detachEvent("onkeydown",th.keyDownListener);
			}else{
				document.removeEventListener("keydown",th.keyDownListener,false);
			}
		}
		th.createInfoWindow=function(data,obj){
			th.title = data.title;
			th.width = data.width;
			th.height = data.height;
			th.src = data.src;
			th.dataCenter={}
			th.dataCenter.tp = data.tp;
			th.dataCenter.site = data.site;
			th.dataCenter.cata = data.cata;
			th.dataCenter.countDown = data.countDown;
			th.dataCenter.cn = encodeURIComponent(data.cn);
			th.dataCenter.srcObj = obj;

			th.layerbg = document.createElement("div");
			th.layerbg.className = 'share_layer';
			th.layerbg.innerHTML = '<div class="share_layer_main" ><div class="share_layer_title" style="cursor: move;"><h3 class=""></h3><a title="¹Ø±Õ" class="del_fri">X</a></div><div class="share_layer_cont"><iframe frameborder="0" name="Login_Frame" id="Login_Frame" width="397" height="190" scrolling="no"></iframe></div></div>';
			th.layerbg.children[0].children[0].children[0].innerHTML = th.title;
			th.layerbg.children[0].children[0].children[1].onmousedown = function(e){
				th.releaseEvent(th.layerTitle);
				th.closePopup();
			};

			th.layerTitle = th.layerbg.children[0].children[0];
			
			th.iframe = th.layerbg.children[0].children[1].children[0];
			th.iframe.style.width = th.width + 'px';
			th.iframe.style.height = th.height + 'px';
			th.iframe.SourceObj = this;
			window.setTimeout(function(){th.iframe.setAttribute('src',th.src,0);},5)

			document.getElementsByTagName("body")[0].appendChild(th.layerbg);
		
			th.floatPopup(obj);

			th.dragPopup(th.layerTitle,th.layerbg);
		}
		th.reinitIframe = function(){
			var iframe = th.iframe;
			try{
				var bHeight = iframe.contentWindow.document.body.scrollHeight;
				var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
				var height = Math.max(bHeight, dHeight);
				iframe.height =  height;
			}catch (ex){}
		}
		th.floatPopup=function(obj){
			var sLeft = document.body.scrollLeft||document.documentElement.scrollLeft;
			var sTop = document.body.scrollTop||document.documentElement.scrollTop;
			var wins = {width : sLeft+th.getWindowSize().width , height : sTop+th.getWindowSize().height};
			var pos = th.getObjPosition(obj);
			if((pos.y + th.height) > wins.height){
				pos.y = pos.y - obj.offsetHeight - th.height - th.layerTitle.offsetHeight - 30;
			}else{
				pos.y = pos.y + obj.offsetHeight + 5;
			}
			pos.x = pos.x - obj.offsetWidth/2

			th.layerbg.style.width = th.width + 2 + 'px';
			th.layerbg.style.left = pos.x + 'px';
			th.layerbg.style.top = pos.y + 'px';
		}
		th.dragPopup=function(obj,con){
			obj.onmousedown=function(a){
				con.style.position="absolute";
				th.isDrag=true;
				var d=document;
				if(!a)a=window.event;
				x=a.layerX?a.layerX:a.offsetX;
				y=a.layerY?a.layerY:a.offsetY;
				th.setEvent(obj);
				var zl;
				d.onmousemove=function(a){
					if(!th.isDrag)	return;
					if(!a)a=window.event;
					var mx=th.getMX(a);
					var my=th.getMY(a);
					if(!a.pageX)a.pageX=mx;
					if(!a.pageY)a.pageY=my;
					var tx=a.pageX-x;
					var ty=a.pageY-y;
					con.style.left=tx - (th.isIE?10:7) +"px";
					con.style.top=ty - (th.isIE?10:7) +"px";
				}
				d.onmouseup=function(a){
					th.isDrag=false;
					th.releaseEvent(obj);
					d.onmousemove=null;
					d.onmouseup=null;
					d.onselectstart=null;
				}
				d.onselectstart=function(){return false;}
			}
		}
		th.resizePopup=function(a){//width,height
			if(a.width)	th.iframe.style.width = a.width + 'px';
			if(a.height)	th.iframe.style.height = a.height + 'px';
		}
		th.showPopup=function(data,obj){
			if(th.layerbg)	th.closePopup();
			th.createInfoWindow(data,obj);
			th.keyDownAddListener();
		}
		th.closePopup=function(){
			if(th.layerbg){
				th.layerbg.style.display = 'none';
				th.layerbg.parentNode.removeChild(th.layerbg);
				th.iframe.src = '';
				th.iframe.parentNode.removeChild(th.iframe);
				th.layerbg = null;
				th.keyDownRemoveListener();
			}
		}
	}	
	window["QreaderIFr"]= new iframeClass();
})();
window.QreaderIFr_ptlogin2resize = function(width, height) {
	QreaderIFr.resizePopup({height: height});
}
window._addPtlogin2_onResizeFunc = function(func){
	var t = window.ptlogin2_onResize;
	if(typeof t != "function"){
		window.ptlogin2_onResize = func;
	}else{
		window.ptlogin2_onResize = function(width,height){
			//try{t(width,height);}catch(e){};
			try{func(width,height);}catch(e){}
		}
	}
}/*  |xGv00|1e7b130c1f91ae1be8febbd20903faa2 */