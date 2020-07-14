(function(){var d=function(e){var f=this;f.body=document.body;f.title=e.title;f.width=e.width;f.height=e.height;f.src=e.src;f.layerbg;f.main;f.layerTitle;f.con;f.close;f.iframe;f.isDrag=false;f.isIE=document.all?true:false;f.getMX=function(a){return f.isIE?a.clientX+Math.max(document.body.scrollLeft,document.documentElement.scrollLeft):a.pageX};f.getMY=function(a){return f.isIE?a.clientY+Math.max(document.body.scrollTop,document.documentElement.scrollTop):a.pageY};f.setEvent=function(g){if(g.setCapture){g.setCapture()}if(window.captureEvents){window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP)}};f.releaseEvent=function(g){if(g.releaseCapture){g.releaseCapture()}if(window.releaseEvents){window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP)}};f.creatDom=function(k,g){function j(n,o){function q(r,t,s){if(!r||typeof s!="string"){return}t=t?t:"";s=s?s:"";r.style[t]=s;return r}if(!o){return}if(typeof o=="string"){var m=/\s?([a-z\-]*)\:\s?([^;]*);?/gi,p;while((p=m.exec(o))!=null){q(n,p[1],p[2])}}else{if(typeof o=="object"){for(var l in o){q(n,l,o[l])}}}}var i=document.createElement(k.tag||"div"),h=i.setAttribute?true:false;for(var a in k){if(a=="tag"||a=="children"||a=="cn"||a=="html"||a=="style"||typeof k[a]=="function"){continue}if(a=="cls"){i.className=k.cls}else{if(h){i.setAttribute(a,k[a])}else{i[a]=k[a]}}}if(k.html){i.innerHTML=k.html}j(i,k.style);if(g){g.appendChild(i)}return i};f.getObjPosition=function(h){var g={};g.x=h.offsetLeft,g.y=h.offsetTop;while(h=h.offsetParent){g.x+=h.offsetLeft;g.y+=h.offsetTop}return g};f.getWindowSize=function(){var g={};if(window.self&&self.innerWidth){g.width=self.innerWidth;g.height=self.innerHeight;return g}if(document.documentElement&&document.documentElement.clientHeight){g.width=document.documentElement.clientWidth;g.height=document.documentElement.clientHeight;return g}g.width=document.body.clientWidth;g.height=document.body.clientHeight;return g};f.keyDownListener=function(a){a=a?a:window.event;if(a.keyCode==27){f.closePopup()}};f.keyDownAddListener=function(g){if(f.isIE){document.attachEvent("onkeydown",f.keyDownListener)}else{document.addEventListener("keydown",f.keyDownListener,false)}};f.keyDownRemoveListener=function(){if(f.isIE){document.detachEvent("onkeydown",f.keyDownListener)}else{document.removeEventListener("keydown",f.keyDownListener,false)}};f.createInfoWindow=function(g){f.layerbg=f.creatDom({cls:"share_layer"});f.main=f.creatDom({cls:"share_layer_main"});f.layerTitle=f.creatDom({cls:"share_layer_title"});var i=f.creatDom({tag:"h3",html:f.title});f.close=f.creatDom({tag:"a",title:"\u5173\u95ed",cls:"del_fri",href:"javascript:void(0)",html:"X"});f.stopPropagation=function(a){var a=a||window.event;if(a&&a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}};f.close.onmousedown=function(a){f.releaseEvent(f.layerTitle);f.closePopup();f.stopPropagation(a)};f.layerTitle.appendChild(i);f.layerTitle.appendChild(f.close);f.main.appendChild(f.layerTitle);f.con=f.creatDom({cls:"share_layer_cont"});f.iframe=f.creatDom({tag:"iframe"});f.iframe.setAttribute("frameBorder","0",0);f.iframe.setAttribute("marginheight","0");f.iframe.setAttribute("marginwidth","0");f.iframe.setAttribute("scrolling","no");f.iframe.style.width=f.width+"px";f.iframe.style.height=f.height+"px";f.iframe.style.display="block";f.con.appendChild(f.iframe);window.setTimeout(function(){f.iframe.setAttribute("src",f.src,0)},5);f.main.appendChild(f.con);var h=f.creatDom({cls:"bg"});f.layerbg.appendChild(f.main);f.layerbg.appendChild(h);f.body.appendChild(f.layerbg);f.floatPopup(g);f.dragPopup(f.layerTitle,f.layerbg)};f.floatPopup=function(h){var i=document.body.scrollLeft||document.documentElement.scrollLeft;var g=document.body.scrollTop||document.documentElement.scrollTop;var j={width:i+f.getWindowSize().width,height:g+f.getWindowSize().height};var k=f.getObjPosition(h);if((k.y+f.height)>j.height){k.y=k.y-h.offsetHeight-f.height-f.layerTitle.offsetHeight-30}else{k.y=k.y+h.offsetHeight+5}k.x=k.x-h.offsetWidth/2;f.layerbg.style.width=f.width+2+"px";f.layerbg.style.left=(j.width-f.width)/2+"px";f.layerbg.style.top=(g+(f.getWindowSize().height-f.height)/2)+"px"};f.dragPopup=function(g,a){g.onmousedown=function(h){a.style.position="absolute";f.isDrag=true;var j=document;if(!h){h=window.event}x=h.layerX?h.layerX:h.offsetX;y=h.layerY?h.layerY:h.offsetY;f.setEvent(g);var i;j.onmousemove=function(m){if(!f.isDrag){return}if(!m){m=window.event}var o=f.getMX(m);var n=f.getMY(m);if(!m.pageX){m.pageX=o}if(!m.pageY){m.pageY=n}var l=m.pageX-x;var k=m.pageY-y;a.style.left=l-(f.isIE?10:7)+"px";a.style.top=k-(f.isIE?10:7)+"px"};j.onmouseup=function(k){f.isDrag=false;f.releaseEvent(g);j.onmousemove=null;j.onmouseup=null;j.onselectstart=null};j.onselectstart=function(){return false}}};f.resizePopup=function(g){if(g.width){f.iframe.style.width=g.width+"px";f.layerbg.style.width=g.width+2+"px"}if(g.height){f.iframe.style.height=g.height+"px"}};f.showPopup=function(g){if(g){var h=g.className;if(h=="s_qzone"){f.title="\u5206\u4eab\u5230QQ\u7a7a\u95f4";f.src="http://imgcache.qq.com/qzone/app/qzshare/news_share.html#url="+ARTICLE_INFO.article_url}if(h=="s_qq"){f.title="\u5206\u4eab\u7ed9QQ\u597d\u53cb";f.src="http://connect.qq.com/widget/shareqq/index.html?url="+encodeURIComponent(ARTICLE_INFO.article_url)+"&site=qqcom&iframe=true&showcount=0&desc=&summary=&title=&pics=&style=203&width=19&height=22"}}if(f.layerbg){f.closePopup()}f.createInfoWindow(g);f.keyDownAddListener()};f.closePopup=function(){f.layerbg.style.display="none";f.layerbg.parentNode.removeChild(f.layerbg);f.iframe.src="";f.iframe.parentNode.removeChild(f.iframe);f.layerbg=null;f.keyDownRemoveListener()};f.dataCenter={}};var c={title:"\u5206\u4eab\u5230QQ\u7a7a\u95f4",width:600,height:185,src:"http://imgcache.qq.com/qzone/app/qzshare/news_share.html#url="+ARTICLE_INFO.article_url};var b={title:"\u5206\u4eab\u7ed9QQ\u597d\u53cb",width:580,height:540,src:"http://connect.qq.com/widget/shareqq/index.html?url="+encodeURIComponent(ARTICLE_INFO.article_url)+"&site=qqcom&iframe=true&showcount=0&desc=&summary=&title=&pics=&style=203&width=19&height=22"};window.share2qzone=new d(c);window.share2qq=new d(b);window.share2qzone_ptlogin2resize=function(e,a){share2qzone.resizePopup({height:a})};window.share2qq_ptlogin2resize=function(e,a){share2qq.resizePopup({height:a})};window._addPtlogin2_onResizeFunc=function(e){var a=window.ptlogin2_onResize;if(typeof a!="function"){window.ptlogin2_onResize=e}else{window.ptlogin2_onResize=function(g,f){try{a(g,f)}catch(h){}try{e(g,f)}catch(h){}}}}})();(function(){window.share2qmail=new function(c){var b=this;b.body=document.body;b.title=c.title;b.width=c.width;b.height=c.height;b.src=c.src;b.isDrag=false;b.isIE=document.all?true:false;b.getMX=function(a){return b.isIE?a.clientX+Math.max(document.body.scrollLeft,document.documentElement.scrollLeft):a.pageX};b.getMY=function(a){return b.isIE?a.clientY+Math.max(document.body.scrollTop,document.documentElement.scrollTop):a.pageY};b.setEvent=function(a){a.setCapture&&a.setCapture();window.captureEvents&&window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP)};b.releaseEvent=function(a){a.releaseCapture&&a.releaseCapture();window.releaseEvents&&window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP)};b.creatDom=function(a,i){var j=document.createElement(a.tag||"div"),g=j.setAttribute?true:false,h;for(h in a){if(!(h=="tag"||h=="children"||h=="cn"||h=="html"||h=="style"||typeof a[h]=="function")){if(h=="cls"){j.className=a.cls}else{if(g){j.setAttribute(h,a[h])}else{j[h]=a[h]}}}}if(a.html){j.innerHTML=a.html}(function(f,k){function l(n,p,m){if(!(!n||typeof m!="string")){n.style[p?p:""]=m?m:"";return n}}if(k){if(typeof k=="string"){for(var e=/\s?([a-z\-]*)\:\s?([^;]*);?/gi,d;(d=e.exec(k))!=null;){l(f,d[1],d[2])}}else{if(typeof k=="object"){for(e in k){l(f,e,k[e])}}}}})(j,a.style);i&&i.appendChild(j);return j};b.getObjPosition=function(a){var e={};e.x=a.offsetLeft;for(e.y=a.offsetTop;a=a.offsetParent;){e.x+=a.offsetLeft;e.y+=a.offsetTop}return e};b.getWindowSize=function(){var a={};if(window.self&&self.innerWidth){a.width=self.innerWidth;a.height=self.innerHeight;return a}if(document.documentElement&&document.documentElement.clientHeight){a.width=document.documentElement.clientWidth;a.height=document.documentElement.clientHeight;return a}a.width=document.body.clientWidth;a.height=document.body.clientHeight;return a};b.keyDownListener=function(a){a=a?a:window.event;a.keyCode==27&&b.closePopup()};b.keyDownAddListener=function(){b.isIE?document.attachEvent("onkeydown",b.keyDownListener):document.addEventListener("keydown",b.keyDownListener,false)};b.keyDownRemoveListener=function(){b.isIE?document.detachEvent("onkeydown",b.keyDownListener):document.removeEventListener("keydown",b.keyDownListener,false)};b.createInfoWindow=function(a){b.layerbg=b.creatDom({cls:"share_layer"});b.main=b.creatDom({cls:"share_layer_main"});b.layerTitle=b.creatDom({cls:"share_layer_title"});var e=b.creatDom({tag:"h3",html:b.title});b.close=b.creatDom({tag:"a",title:"\u5173\u95ed",cls:"del_fri",href:"javascript:void(0)",html:"X"});b.stopPropagation=function(d){var d=d||window.event;if(d&&d.stopPropagation){d.stopPropagation()}else{d.cancelBubble=true}};b.close.onmousedown=function(d){b.releaseEvent(b.layerTitle);b.closePopup();b.stopPropagation(d)};b.layerTitle.appendChild(e);b.layerTitle.appendChild(b.close);b.main.appendChild(b.layerTitle);b.con=b.creatDom({cls:"share_layer_cont"});b.iframe=b.creatDom({tag:"iframe"});b.iframe.setAttribute("frameBorder","0",0);b.iframe.setAttribute("marginheight","0");b.iframe.setAttribute("marginwidth","0");b.iframe.setAttribute("scrolling","no");b.iframe.style.width=b.width+"px";b.iframe.style.height=b.height+"px";b.iframe.style.display="block";b.con.appendChild(b.iframe);window.setTimeout(function(){b.iframe.setAttribute("src",b.src,0)},5);b.main.appendChild(b.con);e=b.creatDom({cls:"bg"});b.layerbg.appendChild(b.main);b.layerbg.appendChild(e);b.body.appendChild(b.layerbg);b.floatPopup(a);b.dragPopup(b.layerTitle,b.layerbg)};b.floatPopup=function(d){var e=document.body.scrollLeft||document.documentElement.scrollLeft;var a=document.body.scrollTop||document.documentElement.scrollTop;var f={width:e+b.getWindowSize().width,height:a+b.getWindowSize().height};var g=b.getObjPosition(d);if((g.y+b.height)>f.height){g.y=g.y-d.offsetHeight-b.height-b.layerTitle.offsetHeight-30}else{g.y=g.y+d.offsetHeight+5}g.x=g.x-d.offsetWidth/2;b.layerbg.style.width=b.width+2+"px";b.layerbg.style.left=(f.width-b.width)/2+"px";b.layerbg.style.top=(a+(b.getWindowSize().height-b.height)/2)+"px"};b.dragPopup=function(a,e){a.onmousedown=function(g){e.style.position="absolute";b.isDrag=true;var d=document;if(!g){g=window.event}x=g.layerX?g.layerX:g.offsetX;y=g.layerY?g.layerY:g.offsetY;b.setEvent(a);d.onmousemove=function(k){if(b.isDrag){if(!k){k=window.event}var f=b.getMX(k),j=b.getMY(k);if(!k.pageX){k.pageX=f}if(!k.pageY){k.pageY=j}f=k.pageY-y;e.style.left=k.pageX-x-(b.isIE?10:7)+"px";e.style.top=f-(b.isIE?10:7)+"px"}};d.onmouseup=function(){b.isDrag=false;b.releaseEvent(a);d.onmousemove=null;d.onmouseup=null;d.onselectstart=null};d.onselectstart=function(){return false}}};b.resizePopup=function(a){if(a.width){b.iframe.style.width=a.width+"px";b.layerbg.style.width=a.width+2+"px"}if(a.height){b.iframe.style.height=a.height+"px"}};b.showPopup=function(a){b.layerbg&&b.closePopup();b.createInfoWindow(a);b.keyDownAddListener()};b.closePopup=function(){b.layerbg.style.display="none";b.layerbg.parentNode.removeChild(b.layerbg);b.iframe.src="";b.iframe.parentNode.removeChild(b.iframe);b.layerbg=null;b.keyDownRemoveListener()};b.dataCenter={}}({title:"\u5206\u4eab\u5230QQ\u90ae\u7bb1",width:600,height:430,src:"http://mail.qq.com/cgi-bin/qm_share_qz?url="+ARTICLE_INFO.article_url});window.share2qmail_ptlogin2resize=function(c,b){share2qmail.resizePopup({height:b})};window._addPtlogin2_onResizeFunc=function(c){var b=window.ptlogin2_onResize;window.ptlogin2_onResize=typeof b!="function"?c:function(a,g){try{b(a,g)}catch(h){}try{c(a,g)}catch(e){}}}})();var opt={title:encodeURIComponent(ARTICLE_INFO.title),imgsrc:"",url:ARTICLE_INFO.article_url+"?mobile",appid:"wx66e51778a48681ad"};function pageShareWX(){qq.getScript("http://mat1.gtimg.com/www/weixin/sharewx_v1.0.0.js",function(){sharewx(opt)},"utf-8")}function share2sina(){var f=qq.GT(qq.G("Cnt-Main-Article-QQ"),"img"),l=[];for(var e=0,j=f.length;e<j;e++){if(qq.width(f[e])>150&&qq.height(f[e])>150){l.push(f[e].src)}}var a="http://service.weibo.com/share/share.php",d=ARTICLE_INFO.article_url,m=ARTICLE_INFO.title,b="",h="",k="",g=l.join("||")||"";k=a+"?url="+encodeURIComponent(d)+"&appkey="+b+"&title="+m+"&pic="+g+"&ralateUid="+h+"&language=&searchPic="+false;window.open(k,"shareQQ","height=480,width=608,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no")}function share2kaixin(){var d="http://www.kaixin001.com/rest/records.php",f=ARTICLE_INFO.article_url,e=ARTICLE_INFO.title,j="",b=[],a=window.screen.width,g=window.screen.height;j=d+"?content="+encodeURIComponent(e)+"&url="+f+"&starid=&aid=&style=11&t=10";var i=window.open(j,"shareQQ","height=480,width=608,top="+(g-480)/2+",left="+(a-608)/2+",toolbar=no,menubar=no,resizable=yes,location=yes,status=no")}function share2renren(){var d="http://widget.renren.com/dialog/share",f=ARTICLE_INFO.article_url,e=ARTICLE_INFO.title,i="",b=[],a=window.screen.width,g=window.screen.height;i=d+"?resourceUrl="+f+"&title="+e+"&charset=GB2312";window.open(i,"shareQQ","height=480,width=608,top="+(g-480)/2+",left="+(a-608)/2+",toolbar=no,menubar=no,resizable=yes,location=yes,status=no")}(function(a){var b=a.WBwd=function(c){return new b.fn.init(c)};b.fn=b.prototype={$:function(c){return document.getElementById(c)},_x:0,_y:0,_getSele:function(){if(a.getSelection){return a.getSelection().toString()}else{if(document.getSelection){return D.getSelection()}else{if(document.selection){return document.selection.createRange().text}}}},_stopBubble:function(c){if(!document.all){c.stopPropagation()}else{window.event.cancelBubble=true}},_stopDefault:function(c){if(!document.all){c.preventDefault()}else{window.event.returnValue=false;return false}},_getX:function(d){var c=d.offsetLeft;while(d=d.offsetParent){c+=d.offsetLeft}return c},_getY:function(d){var c=d.offsetTop;while(d=d.offsetParent){c+=d.offsetTop}return c},_getPicUrl:function(k){var j=_$$(document.getElementById(k),"img"),e,c="";for(e in j){var g=j[e],d=_MUI.width(g),f=_MUI.height(g);if(d>100||f>100){c=g.src;break}}return c},_getTipsPos:function(g,h,f){var d=a.event||g,c=this;this._x=d.clientX-this._getX(this.$(h))+document.body.scrollLeft+document.documentElement.scrollLeft;this._y=d.clientY-this._getY(this.$(h))+document.body.scrollTop+document.documentElement.scrollTop;if(!f){this.$("tipsWBzf").style.left=this._x+"px";this.$("tipsWBzf").style.top=this._y-32+"px"}else{this.$("tipsWBzf").style.left=this._x+"px";this.$("tipsWBzf").style.top=this._y-32+"px"}},_setTips:function(f){this.$(f).style.position="relative";var c=this;var d=document.createDocumentFragment();var e=document.createElement("DIV");e.id="tipsWBzf";e.style.cssText="width:59px;height:22px;position:absolute;visibility: hidden;text-decoration:none;z-index:899;cursor:pointer";e.innerHTML='<span style="position:relative;"><a href="javascript:void(0)" style="position:absolute;left:0;top:0;z-index:900;display:block;width:59px;height:22px;background:url(http://mat1.gtimg.com/news/2011/logo.png) no-repeat;" title="\u8f6c\u64ad\u81f3\u5fae\u535a"></a></span>';d.appendChild(e);this.$(f).appendChild(d)},init:function(f){if(f){var c=this,e=false,d="";this._setTips(f);this.$(f).onmouseup=function(g){if(c._getSele().length>10&&!e){if(!document.all){c.$("tipsWBzf").style.visibility="visible";c._getTipsPos(g,f,false)}else{c.$("tipsWBzf").style.visibility="visible";c._getTipsPos(g,f,true)}if(d==c._getSele()&&c.$("tipsWBzf").style.visibility=="visible"){d="";c.$("tipsWBzf").style.visibility="hidden";e=false}else{d=c._getSele()}}else{c.$("tipsWBzf").style.visibility="hidden";e=false}};this.$("tipsWBzf").onmousedown=function(){c.$("tipsWBzf").style.visibility="hidden";var h=c._getSele(),g=window.location.href;if(g.indexOf("#")>0){g=encodeURI(g.substr(0,g.indexOf("#")))}else{g=encodeURI(g)}if(_MI.Article.title!=""){h="\u3010"+ARTICLE_INFO.title+"\u3011"+h}if(_MI.string.length(h)>119){h=_MI.string.cut(h,119*2-4)}_MI.Bos("qqcom.dp.huaci",null,"qqcom.dp.wradio");_MI.Share.pop({txt:h,surl:g,pic:c._getPicUrl(f),pref:"qqcom.dp.wradio"});e=true;window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();return false};this.$("tipsWBzf").onmouseup=function(){return false};document.onmousedown=function(g){if(c.$("tipsWBzf").style.visibility=="visible"){c.$("tipsWBzf").style.visibility="hidden";e=false}}}}};b.fn.init.prototype=b.prototype})(window);
/*  |xGv00|f27970abdec7796991aea7419e3fce13 */