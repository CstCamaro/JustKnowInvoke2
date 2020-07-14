function setFocus(ID,t){//主函数...
	function $(id) {return document.getElementById(id);}
	function $$(tag,obj){return (typeof obj=='object'?obj:$(obj)).getElementsByTagName(tag);}
	var n='';//标记
	function showPics(num){
		if(n===num) return true;
		if(n==='') n=0;
		else n=num;
		var pics=$$('ul',ID)[0];
		var tit=$$('div',pics)[num];
		if (!pics.style.left){pics.style.left = 0+'px';}
		if (!tit.style.bottom||parseInt(tit.style.bottom)>-34){tit.style.bottom = -34+'px';}
		var endX=-num*$$('div',ID)[0].clientWidth;
		var goimg=function(){
			X=parseInt(pics.style.left);
			if (pics.movement){clearTimeout(pics.movement);}
			if(parseInt(pics.style.left)==endX) return true;
			if((endX-X)>0) X+=Math.ceil((endX-X) / 10);
			else X+=Math.floor((endX-X) / 10);
			pics.style.left=X+'px';
			pics.movement = setTimeout(goimg, 5);
		}
		var gotit=function(){
			var y=parseInt(tit.style.bottom);
			if (tit.movement){clearTimeout(tit.movement);}
			if(y==0) return true;
			y+=Math.ceil((0-y) / 10);
			if(parseInt(pics.style.left)==endX) tit.style.bottom=y+'px';
			if(y<0) tit.movement = setTimeout(gotit, 16);
		}
		goimg();
		gotit();
	}
	function classNormal() {//数字标签样式清除
		var focusBtnList = $$('li',$$('ul',ID)[1]);
		for (var i = 0; i < focusBtnList.length; i++) {
			focusBtnList[i].className = '';
		}
	}
	function focusChange() {//交互切换
		var focusBtnList = $$('li',$$('ul',ID)[1]);
		for (var i = 0; i < focusBtnList.length; i++) {
			focusBtnList[i].I=i;
			focusBtnList[i].onmouseover = function(){
				showPics(this.I);
				classNormal();
				focusBtnList[this.I].className = 'current';
			}
		}
	}
	var autoFocusChange=function() {//自动运行
		if (atuokey) return;
		var focusBtnList = $$('li',$$('ul',ID)[1]);
		for (var i = 0; i < focusBtnList.length; i++) {
			if (focusBtnList[i].className == 'current') {
				var currentNum = i;
			}
		}
		if(currentNum<focusBtnList.length-1){
			showPics(currentNum+1);
			classNormal();
			focusBtnList[currentNum+1].className = 'current';
		}else if(currentNum==focusBtnList.length-1){
			showPics(0);
			classNormal();
			focusBtnList[0].className = 'current';
		}
	}
	var atuokey = '';
	function init(){//初始化<div><span></span><a href="#">文字说明</a></div>
		var ul=$$('ul',ID)[0];
		var li=$$('li',ul);
		var NUM=li.length;
		var wid=$('myloading')?$$('div',ID)[1].clientWidth:$$('div',ID)[0].clientWidth;ul.style.width=wid*NUM+'px';
		for(var i=0;i<NUM;i++){
			var a=li[i].getElementsByTagName('a')[0];
			var img=li[i].getElementsByTagName('img')[0];
			li[i].innerHTML=li[i].innerHTML+'<div><span></span><a href="'+a+'">'+img.alt+'</a></div>';
		}
		var s='<div class="mybtn"><ul>';
		for(var i=0;i<NUM;i++){s+='<li>'+(i+1)+'</li>'}
		s+='</ul></div>';
		$(ID).innerHTML+=s;
		$(ID).removeChild($('myloading'));
		showPics(0);
		classNormal();
		$$('li',$$('ul',ID)[1])[0].className = 'current';
		$(ID).onmouseover = function() {
			atuokey = true;
			clearInterval(auto);
		}
		$(ID).onmouseout = function() {
			atuokey = false;
			auto=setInterval(autoFocusChange, T);
		}
	}
	var T=t*1000;//每帧图片停留的时间，1000=1秒
	var auto='';
	init();
	focusChange();
	auto=setInterval(autoFocusChange, T);
};
window.onload=function(){
	setFocus('myfocus',4);
}
/*  |xGv00|d027482237a1cbf7cc8cb4feb9f63b4e */