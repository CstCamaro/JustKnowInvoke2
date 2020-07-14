//<![CDATA[
//全局
/* GetObj begin */
function GetObj(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else if(document.layers){return eval("document.layers['"+objName+"']")}else{return eval('document.all.'+objName)}}
/* GetObj end */

/* 显示/隐藏一个容器 begin */
function hiddenObj(ObjId){GetObj(ObjId).style.display="none"}function showObj(ObjId){GetObj(ObjId).style.display="block"}
/* 显示/隐藏一个容器 end */

/* 改变className begin */
function chgClassName(ObjId,className){GetObj(ObjId).className=className}
/* 改变className end */

function showTime(){var date=new Date();var year=date.getYear();year=(year<2008)?(year+1900):year;var month=date.getMonth()+1;var day=date.getDate();var time=year+"."+month+"."+day;return time;}


eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('m 6(a,b,c,d,e){5.u=6.$(a);7(5.u==k&&a!="n"){M y N("6(p)参数错误:p 对像存在!(Z:"+a+")")};7(!6.q){6.q=y 1r()};5.p=6.q.9;6.q.1d(5);5.1s=r;5.8=[];5.10=c==k?0:c;5.E=5.10;5.11=d==k?"1t":d;5.13=e==k?"":e;5.F=r;j f=P("6.q["+5.p+"].F = z");j g=P("6.q["+5.p+"].F = r");7(a!="n"){7(5.u.v){5.u.v("14",f)}w{5.u.Q("15",f,r)}};7(a!="n"){7(5.u.v){5.u.v("16",g)}w{5.u.Q("17",g,r)}};7(18(b)!="1u"){b="1v"};b=b.1w();1x(b){U"14":5.B="15";G;U"16":5.B="17";G;U"1y":5.B="1z";G;U"1A":5.B="1B";G;1C:5.B="1D"};5.H=r;5.A=k;5.R=1E};6.t.1F="1.1G";6.t.1H="1I";6.t.1e=m(a,b,c,d,e){7(6.$(a)==k&&a!="n"){M y N("1e(1f)参数错误:1f 对像存在!(Z:"+a+")")};j f=5.8.9;7(c==""){c=k};5.8.1d([a,b,c,d,e]);j g=P(\'6.q[\'+5.p+\'].C(\'+f+\')\');7(a!="n"){7(6.$(a).v){6.$(a).v("1J"+5.B,g)}w{6.$(a).Q(5.B,g,r)}};7(f==5.10){7(a!="n"){6.$(a).V=5.11};7(6.$(b)){6.$(b).J.W=""};7(5.p!="n"){7(c!=k){5.u.J.1g=c}};7(d!=k){S(d)}}w{7(a!="n"){6.$(a).V=5.13};7(6.$(b)){6.$(b).J.W="n"}};j h=P("6.q["+5.p+"].F = z");j i=P("6.q["+5.p+"].F = r");7(6.$(b)){7(6.$(b).v){6.$(b).v("14",h)}w{6.$(b).Q("15",h,r)};7(6.$(b).v){6.$(b).v("16",i)}w{6.$(b).Q("17",i,r)}}};6.t.C=m(a,b){7(18(a)!="19"){M y N("C(1h)参数错误:1h 不是 19 类型!(Z:"+a+")")};7(b!=z&&5.E==a){K};j i;T(i=0;i<5.8.9;i++){7(i==a){7(5.8[i][0]!="n"){6.$(5.8[i][0]).V=5.11};7(6.$(5.8[i][1])){6.$(5.8[i][1]).J.W=""};7(5.p!="n"){7(5.8[i][2]!=k){5.u.J.1g=5.8[i][2]}};7(5.8[i][3]!=k){S(5.8[i][3])}}w 7(5.E==i||b==z){7(5.8[i][0]!="n"){6.$(5.8[i][0]).V=5.13};7(6.$(5.8[i][1])){6.$(5.8[i][1]).J.W="n"};7(5.8[i][4]!=k){S(5.8[i][4])}}};5.E=a};6.t.1a=m(){7(s.9!=5.8.9){M y N("1a()参数错误:参数数量与标签数量不符!(9:"+s.9+")")};j a=0,i;T(i=0;i<s.9;i++){a+=s[i]};j b=1K.1a(),1b=0;T(i=0;i<s.9;i++){1b+=s[i]/a;7(b<1b){5.C(i);G}}};6.t.1i=m(){7(s.9!=5.8.9){M y N("1i()参数错误:参数数量与标签数量不符!(9:"+s.9+")")};7(!(/^\\d+$/).1j(6.D)){K};j a=0,i;T(i=0;i<s.9;i++){a+=s[i]};j b=6.D%a;7(b==0){b=a};j c=0;T(i=0;i<s.9;i++){c+=s[i];7(c>=b){5.C(i);G}}};6.t.1L=m(a){7(18(a)=="19"){5.R=a};X(5.A);5.A=1c("6.q["+5.p+"].Y()",5.R);5.H=z};6.t.Y=m(){7(5.H==r||5.F==z){K};5.1k()};6.t.1k=m(){j a=5.E;a++;7(a>=5.8.9){a=0};5.C(a);7(5.H==z){X(5.A);5.A=1c("6.q["+5.p+"].Y()",5.R)}};6.t.1M=m(){j a=5.E;a--;7(a<0){a=5.8.9-1};5.C(a);7(5.H==z){X(5.A);5.A=1c("6.q["+5.p+"].Y()",5.R)}};6.t.1N=m(){X(5.A);5.H=r};6.$=m(a){7(x.1l){K S(\'x.1l("\'+a+\'")\')}w{K S(\'x.1O.\'+a)}};6.1m=m(l){j i="",I=l+"=";7(x.L.9>0){j a=x.L.1n(I);7(a!=-1){a+=I.9;j b=x.L.1n(";",a);7(b==-1)b=x.L.9;i=1P(x.L.1Q(a,b))}};K i},6.1o=m(O,o,l,I){j i="",c="";7(l!=k){i=y 1p((y 1p).1R()+l*1S);i="; 1T="+i.1U()};7(I!=k){c=";1V="+I};x.L=O+"="+1W(o)+i+c};6.D=6.1m("1q");7((/^\\d+$/).1j(6.D)){6.D++}w{6.D=1};6.1o("1q",6.D,12);',62,121,'|||||this|SubShowClass|if|label|length||||||||||var|null||function|none||ID|childs|false|arguments|prototype|parentObj|attachEvent|else|document|new|true|autoPlayTimeObj|eventType|select|sum|selectedIndex|mouseIn|break|autoPlay||style|return|cookie|throw|Error||Function|addEventListener|spaceTime|eval|for|case|className|display|clearInterval|autoPlayFunc|value|defaultID|openClassName||closeClassName|onmouseover|mouseover|onmouseout|mouseout|typeof|number|random|percent|setInterval|push|addLabel|labelID|background|num|order|test|nextLabel|getElementById|readCookie|indexOf|writeCookie|Date|SSCSum|Array|lock|selected|string|onmousedown|toLowerCase|switch|onclick|click|onmouseup|mouseup|default|mousedown|5000|version|30|author|mengjia|on|Math|play|previousLabel|stop|all|unescape|substring|getTime|3600000|expires|toGMTString|domain|escape'.split('|'),0,{}))

try{document.execCommand('BackgroundImageCache', false, true);}catch(e){}


eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('k h={$:8(1d){3(e.1K){b 1n(\'e.1K("\'+1d+\'")\')}f{b 1n(\'e.1Y.\'+1d)}},1Z:1X.1V.1c("1W")!=-1?12:1a,p:8(l,i,I){3(l.1o){l.1o("1p"+i,I)}f{l.23(i,I,1a)}},24:8(l,i,I){3(l.1k){l.1k("1p"+i,I)}f{l.22(i,I,1a)}},20:8(O){k o="",l=O+"=";3(e.x.L>0){k i=e.x.1c(l);3(i!=-1){i+=l.L;k I=e.x.1c(";",i);3(I==-1)I=e.x.L;o=21(e.x.1P(i,I))}};b o},1O:8(i,l,o,c){k O="",I="";3(o!=R){O=Q 1v((Q 1v).1U()+o*1S);O="; 1Q="+O.1R()};3(c!=R){I=";1T="+c};e.x=i+"="+2e(l)+O+I},2i:8(I,l){3(I.q[l]){b I.q[l]}f 3(I.1x){b I.1x[l]}f 3(e.1e&&e.1e.1r){k i=e.1e.1r(I,R);b i.2j(l)}f{b R}}};8 a(r,M,G,H){2.r=r;2.M=M;2.G=G;2.H=H;2.1b="28";2.1i="25";2.N=[];2.E=0;2.y=0;2.13=10;2.n=10;2.B=0;2.15=12;2.1F=5;k Y,F,j="z";2.v=e.11("1j");2.m=e.11("1j");2.V=e.11("1j");3(!a.d){a.d=[]};2.g=a.d.L;a.d.1N(2);2.2d=8(){3(!2.r){1t Q 1s("?r.");b};2.6=h.$(2.r);3(!2.6){1t Q 1s("r??.(r = \\""+2.r+"\\")");b};2.6.q.1u=2.y+"2b";2.6.q.1q="1w";2.m.T=2.V.T=2.6.T;2.6.T="";2.6.W(2.v);2.v.W(2.m);2.v.W(2.V);2.v.q.1q="1w";2.v.q.29="1";2.v.q.1u="26";2.m.q.1m="1l";2.V.q.1m="1l";h.p(2.6,"27",s("a.d["+2.g+"].1D()"));h.p(2.6,"18",s("a.d["+2.g+"].16()"));3(2.M){2.P=h.$(2.M);3(2.P){h.p(2.P,"1J",s("a.d["+2.g+"].1y()"));h.p(2.P,"1I",s("a.d["+2.g+"].1f()"));h.p(2.P,"18",s("a.d["+2.g+"].1f()"))}};3(2.G){2.K=h.$(2.G);3(2.K){h.p(2.K,"1J",s("a.d["+2.g+"].1A()"));h.p(2.K,"1I",s("a.d["+2.g+"].1g()"));h.p(2.K,"18",s("a.d["+2.g+"].1g()"))}};3(2.H){2.17=h.$(2.H);3(2.17){k 1H=D.14(2.m.1B/2.y+0.4),i,t;1M(i=0;i<1H;i++){t=e.11("2f");2.17.W(t);2.N.1N(t);3(i==2.B){t.U=2.1b}f{t.U=2.1i};t.2c=""+(i+1)+"?";h.p(t,"2a",s("a.d["+2.g+"].1G("+i+")"))}}};3(2.15){2.16()}};2.1A=8(){3(j!="z"){b};j="S";F=19("a.d["+2.g+"].1z()",2.13)};2.1y=8(){3(j!="z"){b};j="S";F=19("a.d["+2.g+"].1E()",2.13)};2.1z=8(){3(2.6.7+2.n>=2.m.w){2.6.7=2.6.7+2.n-2.m.w}f{2.6.7+=2.n};2.J()};2.1E=8(){3(2.6.7-2.n<=0){2.6.7=2.m.w+2.6.7-2.n}f{2.6.7-=2.n};2.J()};2.1g=8(){3(j!="S"){b};j="X";Z(F);k A=2.E-2.6.7%2.E;2.C(A)};2.1f=8(){3(j!="S"){b};j="X";Z(F);k A=-2.6.7%2.E;2.C(A)};2.C=8(u,1h){k 9=u/5;3(!1h){3(9>2.n){9=2.n};3(9<-2.n){9=-2.n}};3(D.1L(9)<1&&9!=0){9=9>=0?1:-1}f{9=D.14(9)};k 2g=2.6.7+9;3(9>0){3(2.6.7+9>=2.m.w){2.6.7=2.6.7+9-2.m.w}f{2.6.7+=9}}f{3(2.6.7-9<=0){2.6.7=2.m.w+2.6.7-9}f{2.6.7+=9}};u-=9;3(D.1L(u)==0){j="z";3(2.15){2.16()};2.J();b}f{2.J();2k("a.d["+2.g+"].C("+u+","+1h+")",2.13)}};2.1C=8(){3(j!="z"){b};j="X";2.C(2.E,12)};2.16=8(){3(!2.15){b};Z(Y);Y=19("a.d["+2.g+"].1C()",2.1F*2h)};2.1D=8(){Z(Y)};2.1G=8(u){3(j!="z"){b};j="X";k A=u*2.y-2.6.7;2.C(A,12)};2.J=8(){2.B=D.14(2.6.7/2.y);3(2.B>D.14(2.m.1B/2.y+0.4)-1){2.B=0};k i;1M(i=0;i<2.N.L;i++){3(i==2.B){2.N[i].U=2.1b}f{2.N[i].U=2.1i}}}};',62,145,'||this|if|||scrollContDiv|scrollLeft|function|thisMove|ScrollPic|return||childs|document|else|ID|testCode||_state|var||listDiv01|space||addEvent|style|scrollContId|Function|tempObj|num|stripDiv|scrollWidth|cookie|frameWidth|ready|fill|pageIndex|move|Math|pageWidth|_scrollTimeObj|arrRightId|dotListId||accountPageIndex|arrRightObj|length|arrLeftId|dotObjArr||arrLeftObj|new|null|floating|innerHTML|className|listDiv02|appendChild|stoping|_autoTimeObj|clearInterval||createElement|true|speed|round|autoPlay|play|dotListObj|mouseout|setInterval|false|dotClassName|indexOf|objName|defaultView|rightEnd|leftEnd|quick|dotOnClassName|DIV|detachEvent|left|cssFloat|eval|attachEvent|on|overflow|getComputedStyle|Error|throw|width|Date|hidden|currentStyle|rightMouseDown|moveLeft|leftMouseDown|offsetWidth|next|stop|moveRight|autoPlayTime|pageTo|pages|mouseup|mousedown|getElementById|abs|for|push|writeCookie|substring|expires|toGMTString|3600000|domain|getTime|appVersion|MSIE|navigator|all|isIE|readCookie|unescape|removeEventListener|addEventListener|delEvent|dotItemOn|32766px|mouseover|dotItem|zoom|click|px|title|initialize|escape|span|temp|1000|readStyle|getPropertyValue|setTimeout'.split('|'),0,{}))


function FocusPic(BigPicID,SmallPicsID,TitleID,MemoID,width,height){this.Data=[];this.ImgLoad=[];this.TimeOut=5000;var isIE=navigator.appVersion.indexOf("MSIE")!=-1?true:false;this.width=width;this.height=height;this.adNum=0;var TimeOutObj;if(!FocusPic.childs){FocusPic.childs=[]};this.showTime=null;this.showSum=10;this.ID=FocusPic.childs.push(this)-1;this.listCode='<span><a href="[$url]" target="_blank"><img src="[$pic]" onmouseover="FocusPic.childs[[$thisId]].select([$num])" alt="[$title]" /></a></span>';this.Add=function(BigPic,SmallPic,Title,Url,Memo){var ls;this.Data.push([BigPic,SmallPic,Title,Url,Memo]);ls=this.ImgLoad.length;this.ImgLoad.push(new Image);this.ImgLoad[ls].src=BigPic};this.TimeOutBegin=function(){clearInterval(TimeOutObj);TimeOutObj=setInterval("FocusPic.childs["+this.ID+"].next()",this.TimeOut)};this.TimeOutEnd=function(){clearInterval(TimeOutObj)};this.select=function(num,noAction){if(num>this.Data.length-1){return};if(num==this.adNum){return};this.TimeOutBegin();if(BigPicID){if(this.$(BigPicID)){var aObj=this.$(BigPicID).getElementsByTagName("a")[0];aObj.href=this.Data[num][2];if(this.aImgY){this.aImgY.style.display='none';this.aImg.style.zIndex=0};this.aImgY=this.$('F'+this.ID+'BF'+this.adNum);this.aImg=this.$('F'+this.ID+'BF'+num);clearTimeout(this.showTime);this.showSum=10;if(!noAction){this.showTime=setTimeout("FocusPic.childs["+this.ID+"].show()",50)}else{if(isIE){this.aImg.style.filter="alpha(opacity=100)"}else{this.aImg.style.opacity=1}}}};if(TitleID){if(this.$(TitleID)){this.$(TitleID).innerHTML="<a href=\""+this.Data[num][2]+"\" target=\"_blank\">"+this.Data[num][3]+"</a>"}};if(MemoID){if(this.$(MemoID)){this.$(MemoID).innerHTML=this.Data[num][4]}};if(SmallPicsID){if(this.$(SmallPicsID)){var sImg=this.$(SmallPicsID).getElementsByTagName("span"),i;for(i=0;i<sImg.length;i++){if(i==num||num==(i-this.Data.length)){sImg[i].className="selected"}else{sImg[i].className=""}}}};if(this.onselect){this.onselect()};this.adNum=num};var absPosition=function(obj,parentObj){var left=obj.offsetLeft,top=obj.offsetTop,tempObj=obj;while(tempObj.id!=document.body&tempObj.id!=document.documentElement&tempObj!=parentObj){tempObj=tempObj.offsetParent;left+=tempObj.offsetLeft;top+=tempObj.offsetTop};return{left:left,top:top}};this.show=function(){this.showSum--;if(this.aImgY){this.aImgY.style.display='block'};this.aImg.style.display='block';if(isIE){this.aImg.style.filter="alpha(opacity=0)";this.aImg.style.filter="alpha(opacity="+(10-this.showSum)*10+")"}else{this.aImg.style.opacity=0;this.aImg.style.opacity=(10-this.showSum)*0.1};if(this.showSum<=0){if(this.aImgY){this.aImgY.style.display='none'};this.aImg.style.zIndex=0;this.aImgY=null}else{this.aImg.style.zIndex=2;this.showTime=setTimeout("FocusPic.childs["+this.ID+"].show()",50)}};this.next=function(){var temp=this.adNum;temp++;if(temp>=this.Data.length){temp=0};this.select(temp)};this.pre=function(){var temp=this.adNum;temp--;if(temp<0){temp=this.Data.length-1};this.select(temp)};this.MInStopEvent=function(ObjID){if(ObjID){if(this.$(ObjID)){if(this.$(ObjID).attachEvent){this.$(ObjID).attachEvent("onmouseover",Function("FocusPic.childs["+this.ID+"].TimeOutEnd()"));this.$(ObjID).attachEvent("onmouseout",Function("FocusPic.childs["+this.ID+"].TimeOutBegin()"))}else{this.$(ObjID).addEventListener("mouseover",Function("FocusPic.childs["+this.ID+"].TimeOutEnd()"),false);this.$(ObjID).addEventListener("mouseout",Function("FocusPic.childs["+this.ID+"].TimeOutBegin()"),false)}}}};this.begin=function(){this.MInStopEvent(TitleID);this.MInStopEvent(SmallPicsID);this.MInStopEvent(BigPicID);this.adNum=-1;var i,temp="";if(BigPicID){if(this.$(BigPicID)){var aObj=this.$(BigPicID).getElementsByTagName("a")[0];aObj.style.zoom=1;this.$(BigPicID).style.position="relative";this.$(BigPicID).style.zoom=1;this.$(BigPicID).style.overflow="hidden";for(i=0;i<this.Data.length;i++){temp+='<img src="'+this.Data[i][0]+'" id="F'+this.ID+'BF'+i+'" style="display:'+(i==0?'block':'none')+'" galleryimg="no"'+(this.width?' width="'+this.width+'"':'')+(this.height?' height="'+this.height+'"':'')+' alt="'+this.Data[i][3]+'" />'};aObj.innerHTML=temp;var imgObjs=aObj.getElementsByTagName("img"),XY=absPosition(imgObjs[0],this.$(BigPicID));for(i=0;i<imgObjs.length;i++){imgObjs[i].style.position="absolute";imgObjs[i].style.top=XY.top+"px";imgObjs[i].style.left=XY.left+"px"}}};if(SmallPicsID){if(this.$(SmallPicsID)){tempHTML="";for(i=0;i<this.Data.length;i++){temp=this.listCode;temp=temp.replace(/\[\$url\]/ig,this.Data[i][2]);temp=temp.replace(/\[\$pic\]/ig,this.Data[i][1]);temp=temp.replace(/\[\$thisId\]/ig,this.ID);temp=temp.replace(/\[\$num\]/ig,i);temp=temp.replace(/\[\$num\+1\]/ig,i+1);temp=temp.replace(/\[\$title\]/ig,this.Data[i][3]);tempHTML+=temp};this.$(SmallPicsID).innerHTML=tempHTML}};this.TimeOutBegin();this.select(0,true)};this.$=function(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval('document.all.'+objName)}}};


var focusUtils = {
	//当鼠标移动到number上时
	hoverNum : function(e){
		e = window.event? event : e;
		var numObj = e.srcElement || e.target;
		if(numObj){
			numObj.style.backgroundColor = "red";
			numObj.setAttribute("ishovering","true");
		}
	},
	//当鼠标移出number时
	leaveNum : function(e){
		e = window.event? event : e;
		var numObj = e.srcElement || e.target;
		if(numObj){
			numObj.removeAttribute("ishovering");
			if(numObj.className != "selected"){
				numObj.style.backgroundColor = "";
			}
		}
	},
	absPosition : function(obj,parentObj){
		var left = obj.offsetLeft;
		var top = obj.offsetTop;
		var tempObj = obj;
		while(tempObj.id!=document.body & tempObj.id!=document.documentElement & tempObj != parentObj){
			tempObj = tempObj.offsetParent;
			left += tempObj.offsetLeft;
			top += tempObj.offsetTop;
		};
		return {left:left,top:top};
	}
}

//初始化
//function FocusPic(FocusImgID,BigPicID,NumberID,NumberBgID,TitleID,width,height,title_height)
//param:
//		FocusImgID: 顶层容器ID ( div )
//		BigPicID: 图片容器ID ( div )
//		NumberID: 数字页码容器ID( div )
//		NumberBgID: 数字页面背景容器ID( div )
//		TitleID: 标题容器ID ( div )
//		width: !! 图片宽度 int ( 单位px )
//		height: !! 图片高度 int ( 单位px )
//		title_height: 标题行高 int ( 单位px )
//
//添加图片方法:
//Add = function(BigPic,Title,Url)
//param:
//		BigPic: 图片Url
//		Title: 该项标题
//		Url: 外链url
//	begin() 开始执行
//	TimeOut = 5000 默认切换时间
function FocusPicNew(FocusImgID,BigPicID,NumberID,NumberBgID,TitleID,width,height,title_height){
	this.Data = [];
	this.TimeOut = 5000;
	var isIE = navigator.appVersion.indexOf("MSIE")!=-1?true:false;
	this.width = width;
	this.height = height;
	this.title_height = title_height;
	this.selectedIndex = 0;
	var TimeOutObj;
	if(!FocusPicNew.childs){FocusPicNew.childs = []};
	this.showTime = null;
	this.showSum = 10;
	this.ID = FocusPicNew.childs.push(this) - 1;
	this.listCode = '<span style="cursor:pointer; margin:0px; padding:1px 5px 1px 5px; border-left:solid 1px white; border-right:solid 1px #cccccc;" src="[$pic]" onclick="FocusPicNew.childs[[$thisId]].select([$num])">[$numtoShow]</span>';
	this.Add = function(BigPic,Title,Url){
		var ls;
		this.Data.push([BigPic,Title,Url]);
	};
	this.TimeOutBegin = function(){
		clearInterval(TimeOutObj);
		TimeOutObj = setInterval("FocusPicNew.childs[" + this.ID + "].next()",this.TimeOut);
	};
	this.TimeOutEnd = function(){
		clearInterval(TimeOutObj);
	};
	this.select = function(num,noAction){
		if(num>this.Data.length - 1){return};
		if(num == this.selectedIndex){return};
		this.TimeOutBegin();

		if(BigPicID){if(this.$(BigPicID)){
			var aObj = this.$(BigPicID).getElementsByTagName("a")[0];
			aObj.href = this.Data[num][2];

			if(this.aImgY){
				this.aImgY.style.display = 'none';
				this.aImg.style.zIndex = 0;
			};

			this.aImgY = this.$('FN' + this.ID + 'BF' + this.selectedIndex);
			this.aImg = this.$('FN' + this.ID + 'BF' + num);

			clearTimeout(this.showTime);
			this.showSum = 10;
			if(!noAction){
				this.showTime = setTimeout("FocusPicNew.childs[" + this.ID + "].show()",30);
			}else{
				if(isIE){
					this.aImg.style.filter = "alpha(opacity=100)";
				}else{
					this.aImg.style.opacity = 1;
				};
			};
		}};
		if(TitleID){if(this.$(TitleID)){
			this.$(TitleID).innerHTML = "<a href=\"" + this.Data[num][2] + "\" target=\"_blank\">" + this.Data[num][1] + "</a>";
		}};
		if(NumberID){if(this.$(NumberID)){
			var sImg = this.$(NumberID).getElementsByTagName("span"),i;
			for(i=0;i<sImg.length;i++){
				if(i==num || num == (i - this.Data.length)){sImg[i].className = "selected"; sImg[i].style.backgroundColor="red";}else{sImg[i].className = ""; if(sImg[i].getAttribute("ishovering") != "true"){ sImg[i].style.backgroundColor="";}};
			}
		}};
		this.selectedIndex = num;
		if(this.onchange){
			this.onchange();
		};
	};
	this.show = function(){
		this.showSum --;
		if(this.aImgY){this.aImgY.style.display = 'block'};

		this.aImg.style.display = 'block';
		if(isIE){
			this.aImg.style.filter = "alpha(opacity=0)";
			this.aImg.style.filter = "alpha(opacity=" + (10 - this.showSum) * 10 + ")";

		}else{
			this.aImg.style.opacity = 0;
			this.aImg.style.opacity = (10 - this.showSum) * 0.1;
		};
		if(this.showSum <= 0){
			if(this.aImgY){this.aImgY.style.display = 'none'};
			this.aImg.style.zIndex = 0;
			this.aImgY = null;
		}else{
			this.aImg.style.zIndex = 2;
			this.showTime = setTimeout("FocusPicNew.childs[" + this.ID + "].show()",50);
		};
	};
	this.next = function(){
		var temp = this.selectedIndex;
		temp++;
		if(temp>=this.Data.length){temp=0};
		this.select(temp);
	};
	this.pre = function(){
		var temp = this.selectedIndex;
		temp--;
		if(temp<0){temp=this.Data.length-1};
		this.select(temp);
	};
	this.begin = function(){
		this.selectedIndex = -1;
		var i,temp = "";
		//设置container
		if(FocusImgID){
			if(this.$(FocusImgID)){
				var topObj = this.$(FocusImgID);
				topObj.style.width = this.width + "px";
				topObj.style.height = this.height + this.title_height + "px";
				var _hb = document.createElement("div"); _hb.className = "BorderHack1"; _hb.style.width = this.width + "px"; topObj.appendChild(_hb);
				_hb = document.createElement("div"); _hb.className = "BorderHack2"; _hb.style.height = this.height + "px"; topObj.appendChild(_hb);
				_hb = document.createElement("div"); _hb.className = "BorderHack3"; _hb.style.width = this.width + "px"; _hb.style.bottom = this.title_height + "px"; topObj.appendChild(_hb);
				_hb = document.createElement("div"); _hb.className = "BorderHack4"; _hb.style.height = this.height + "px"; topObj.appendChild(_hb);
			}
		}
		if(TitleID){
			if(this.$(TitleID)){
				this.$(TitleID).style.width = this.width + "px";
				this.$(TitleID).style.height = this.title_height + "px";
				this.$(TitleID).style.lineHeight = this.title_height + "px";
			}
		}
		if(NumberBgID){
			if(this.$(NumberBgID)){
				this.$(NumberBgID).style.bottom = this.title_height + 1 + "px";
			}
		}
		if(BigPicID){if(this.$(BigPicID)){ //大图
			var aObj = this.$(BigPicID).getElementsByTagName("a")[0];
			aObj.style.zoom = 1;
			this.$(BigPicID).style.position = "relative";
			this.$(BigPicID).style.zoom = 1;
			this.$(BigPicID).style.overflow = "hidden";
			this.$(BigPicID).style.height = this.height + "px";
			for(i=0;i<this.Data.length;i++){
				temp += '<img src="' + this.Data[i][0] + '" id="FN' + this.ID + 'BF' + i + '" style="display:' + (i==0?'block':'none') + '" galleryimg="no"' + (this.width?' width="' + this.width + '"':'') + (this.height?' height="' + this.height + '"':'') + ' alt="' + this.Data[i][1] + '" />';
			};
			aObj.innerHTML = temp;
			var imgObjs = aObj.getElementsByTagName("img");
			var XY = focusUtils.absPosition(imgObjs[0],this.$(BigPicID));
			for(i=0;i<imgObjs.length;i++){
				imgObjs[i].style.position = "absolute";
				imgObjs[i].style.top = XY.top + "px";
				imgObjs[i].style.left = XY.left + "px";
				imgObjs[i].style.width = this.width + "px";
				imgObjs[i].style.height = this.height + "px";
			};
		}};
		if(NumberID){if(this.$(NumberID)){
			tempHTML = "";
			for(i=0;i<this.Data.length;i++){
				temp = this.listCode;
				temp = temp.replace(/\[\$thisId\]/ig,this.ID);
				temp = temp.replace(/\[\$num\]/ig,i);
				temp = temp.replace(/\[\$numtoShow\]/ig,i + 1);
				temp = temp.replace(/\[\$title\]/ig,this.Data[i][1]);
				tempHTML += temp;
			};
			this.$(NumberID).innerHTML = tempHTML;
			this.$(NumberID).style.bottom = this.title_height + 1 + "px";
			var sImg = this.$(NumberID).getElementsByTagName("span"),i;
			for(i=0;i<sImg.length;i++){
				if(window.attachEvent){
					sImg[i].attachEvent("onmouseover", focusUtils.hoverNum);
					sImg[i].attachEvent("onmouseout", focusUtils.leaveNum);
				}else{
					sImg[i].addEventListener("mouseover", focusUtils.hoverNum, false);
					sImg[i].addEventListener("mouseout", focusUtils.leaveNum, false);
				}
			}
		}};
		this.TimeOutBegin();
		this.select(0,true);
	};
	this.$ = function(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval('document.all.'+objName)}}
};



if(typeof(RotatorAD)!='function'){
var RotatorAD = function(rad,nad,div_id){

var date = new Date();
var id = 0;
var max = 99;
var url = document.location.href;
var cookiename = 'aaa'+escape(url.substr(url.indexOf('/',7),2)+url.substring(url.lastIndexOf('/')));
var timeout = 1440; //24h
var w = rad.width;
var h = rad.height;
var bnum = rad.num;
var num = rad.num;
var num2 = rad.num2;
var marginType = (typeof(rad.mtype)=="undefined")?0:rad.mtype;
var ary = new Array();
//过滤无效商广
for(var i=0; i<rad.length; i++){
	var start = strToDate(rad[i][2].replace('<startdate>','').replace('</startdate>',''));
	var end = strToDate(rad[i][3].replace('<enddate>','').replace('</enddate>',''),true);
	if(date>start && date<end){
		ary.push([rad[i][0], rad[i][1], rad[i][4], rad[i][5]?rad[i][5]:'0']);
	}
}
//过滤无效垫底
var vnad = new Array();
for(var i=0; i<nad.length; i++){
	if(nad[i][2]==null){
		vnad.push([nad[i][0], nad[i][1], '', '0']);
	}else{
		var start = strToDate(nad[i][2].replace('<startdate>','').replace('</startdate>',''));
		var end = strToDate(nad[i][3].replace('<enddate>','').replace('</enddate>',''),true);
		if(date>start && date<end){
			vnad.push([nad[i][0], nad[i][1], '', '0']);
		}
	}
}
//补位
var nn = 0;
if(vnad.length>0 && (num2==null || ary.length<num2)){
	for(var i=0; i<(num2==null?rad.num:num2); i++){
		if(i>ary.length-1){
			ary.push([vnad[nn][0], vnad[nn][1], '', '0']);
			if(++nn > nad.length-1) nn = 0;
		}
	}
}
 
ary.sort(function(x,y){return x[3]-y[3];});
 
if(typeof(globalRotatorId)=='undefined' || globalRotatorId==null || isNaN(globalRotatorId)){
	curId = G(cookiename);

	curId = curId==""?Math.floor(Math.random()*max):++curId;
	if(curId>max || curId==null || isNaN(curId)) curId=0;
	S(cookiename,curId,timeout);
	globalRotatorId = curId;
}
id=globalRotatorId%num;

//Show AD
if(ary.length==0) return; //如果没有广告则不显示
var n = id;

try{
  if(typeof(ary[n][0])=="undefined" || ary[n][0]=="") return;
  var type = ary[n][0].substring(ary[n][0].length-3).toLowerCase();
  var od = document.getElementById(div_id);
  if(od && marginType==1){od.style.marginTop = 8 + "px";}
  if(od && marginType==2){od.style.marginBottom = 8 + "px";}
  if(od && marginType==3){od.style.marginTop = 8 + "px";od.style.marginBottom = 8 + "px";}
}catch(e){return;}

if(type=='swf'){
var of = new newFlash(ary[n][0], div_id+'_swf', w, h, "7", "", false, "High");
of.addParam("wmode", "opaque");
of.addParam("allowScriptAccess", "always");
of.addVariable("adlink", escape(ary[n][1]));
if(ary[n][2]!="" && ary[n][2]!=null){of.addVariable("_did", ary[n][2]);}
of.write(div_id);
}else if(type=='jpg' || type=='gif'){
if(ary[n][2]!="" && ary[n][2]!=null){
  od.innerHTML = '<a href="'+ary[n][1]+'" target="_blank" onclick="try{_S_acTrack('+ary[n][2]+');}catch(e){}"><img src="'+ary[n][0]+'" border="0" width="'+w+'" height="'+h+'" /></a>';
}else{
  od.innerHTML = '<a href="'+ary[n][1]+'" target="_blank"><img src="'+ary[n][0]+'" border="0" width="'+w+'" height="'+h+'" /></a>';
}
}else if(type=='htm' || type=='tml'){
od.innerHTML = '<iframe id="ifm_'+div_id+'" frameborder="0" scrolling="no" width="'+w+'" height="'+h+'"></iframe>';
document.getElementById('ifm_'+div_id).src = ary[n][0];
}else if(type=='.js'){ //js
document.write('<script language="javascript" type="text/javascript" src="'+ary[n][0]+'"></scr'+'ipt>');
}else{ //textlink
    if(ary[n][2]!="" && ary[n][2]!=null){
  document.write('<a href="'+ary[n][1]+'" onclick="try{_S_acTrack('+ary[n][2]+');}catch(e){}"  target="_blank">'+ary[n][0]+'</a>');
    }else{
  document.write('<a href="'+ary[n][1]+'"  target="_blank">'+ary[n][0]+'</a>');
}
}

function G(N){
	var c=document.cookie.split("; ");
	for(var i=0;i<c.length;i++){
		var d=c[i].split("=");
		if(d[0]==N)return unescape(d[1]);
	}return '';
};
function S(N,V,Q){
	var L=new Date();
	var z=new Date(L.getTime()+Q*60000);
	document.cookie=N+"="+escape(V)+";path=/;expires="+z.toGMTString()+";";
};
function strToDate(str,ext){
	var arys = new Array();
	arys = str.split('-');
	var newDate = new Date(arys[0],arys[1]-1,arys[2],9,0,0);
	if(ext){
		newDate = new Date(newDate.getTime()+1000*60*60*24);
	}
	return newDate;
}

}
}
//]]>/*  |xGv00|8b20eca57b33aa365605342bf83d8c5c */