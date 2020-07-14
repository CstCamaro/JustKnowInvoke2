function scrollTab(){};
scrollTab.prototype={
	_a:{},
	_b:{},
	_c:'',
	_e:'',
	_f:'',
	_curclicked:0,
	_def:0,
	init:function(a,b,c,e,f){
		this._a=a || {};
		this._b=b || {};
		this._c=c;
		this._e=e;
		this._f=f;
		if(a.size()==b.size()){
			this._setAction();
		}
	},
	_setAction:function(){
		var t=this ,focusIv=null;
		var curclickedadd=function(i){t._curclicked=i+1;if(t._curclicked==t._a.length) t._curclicked=0;};
		var swBtn=function(i){
			t._a.removeClass(t._c);
			t._b.hide();
			t._b.eq(i).show();
			jQuery(t._a).eq(i).addClass(t._c);
			curclickedadd(i);
		}
		var setAutoplay=function(){
		  focusIv=setInterval(function(){
			swBtn(t._curclicked);
		  },t._e);}
		var resetAutoplay=function(){clearInterval(focusIv);setAutoplay();};
		var hoverTag=function(){jQuery(t._a).each(function(i){
			t._b.eq(i).hover(function(){
				timeout=window.setTimeout(function(){swBtn(i);},200);
				clearInterval(focusIv);
			},function(){
				window.clearTimeout(timeout);
				if(t._f==true){
					resetAutoplay();
				}
			});
			jQuery(this).hover(function(){
				timeout=window.setTimeout(function(){swBtn(i);},200);
				clearInterval(focusIv);
			},function(){
				window.clearTimeout(timeout);
				if(t._f==true){
					resetAutoplay();
				}
			});
		  });}
		hoverTag();
		swBtn(t._def);
		if(t._f==true){
			setAutoplay();
		}
  }
};/*  |xGv00|f7c89ca2128a86226e9ea6d6d1b9e905 */