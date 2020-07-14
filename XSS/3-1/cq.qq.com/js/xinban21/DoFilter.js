$(function(){
	var sw2 = 0;
	$(".XFtab li").mouseover(function(){
		sw2 = $(".XFtab li").index(this);
		myShow2(sw2);
	});
	function myShow2(i){
		$(".XFtab li").eq(i).addClass("selectTag").siblings("li").removeClass("selectTag");

		$(".Coupons").eq(i).stop(true,true).fadeIn(600).siblings(".Coupons").fadeOut(600);
	}
	//滑入停止动画，滑出开始动画
	$(".Coupons").hover(function(){
		if(myTime){
		   clearInterval(myTime);
		}
	},function(){
		myTime = setInterval(function(){
		  myShow2(sw2)
		  sw2++;
		  if(sw2==3){sw2=0;}
		} , 4000);
	});
	$(".XFtab li").hover(function(){
		if(myTime){
		   clearInterval(myTime);
		}
	},function(){
		myTime = setInterval(function(){
		  myShow2(sw2)
		  sw2++;
		  if(sw2==3){sw2=0;}
		} , 4000);
	});
	//自动开始
	var myTime = setInterval(function(){
	   myShow2(sw2)
	   sw2++;
	   if(sw2==3){sw2=0;}
	} , 4000);
})

Qfast.add('common',{path:"//cq.qq.com/js/xinban21/ued_common.js",type:"js"});//如已调用请删除
Qfast.add('scroll',{path:"//cq.qq.com/js/xinban21/ued_scroll.js",type:"js",requires: ['common']});//如已调用请删除

Qfast(false,'scroll',function(){
var Scroll = new uedScroll();
Scroll.scrollContId = "pic";//主体区域
Scroll.scrollSplit = {mytag:"div",myclass:"split"};//滚动单元和class名
Scroll.arrLeftId = "btn_left";//左按钮
Scroll.arrRightId = "btn_right";//右按钮
Scroll.sSliceIndex = 3;//每次滚动单元的个数  
Scroll.sDir = 1;//滚动方向:1为左右、2为上下 
Scroll.nStep = 20;//速度，越大越快 
Scroll.nType = 2;//滚动类型:1为返回式、2为循环式、3在循环式自动滚动时设置 
Scroll.autoPlay = true;//是否自动滚动 
Scroll.autoPlayTime = 10;//自动滚动间隔时间（秒） 设置为0，则不停顿   
Scroll.init();
})

Qfast(false,'scroll',function(){
var Scroll01 = new uedScroll();
Scroll01.scrollContId = "pic01";//主体区域
Scroll01.scrollSplit = {mytag:"div",myclass:"s01"};//滚动单元和class名
Scroll01.arrLeftId = "left01";//左按钮
Scroll01.arrRightId = "right01";//右按钮
Scroll01.sSliceIndex = 1;//每次滚动单元的个数  
Scroll01.sDir = 1;//滚动方向:1为左右、2为上下 
Scroll01.nStep = 20;//速度，越大越快 
Scroll01.nType = 2;//滚动类型:1为返回式、2为循环式、3在循环式自动滚动时设置 
Scroll01.autoPlay = true;//是否自动滚动 
Scroll01.autoPlayTime = 3;//自动滚动间隔时间（秒） 设置为0，则不停顿   
Scroll01.init();
})

Qfast(false,'scroll',function(){
var Scroll02 = new uedScroll();
Scroll02.scrollContId = "pic02";//主体区域
Scroll02.scrollSplit = {mytag:"div",myclass:"s02"};//滚动单元和class名
Scroll02.arrLeftId = "left02";//左按钮
Scroll02.arrRightId = "right02";//右按钮
Scroll02.sSliceIndex = 1;//每次滚动单元的个数  
Scroll02.sDir = 2;//滚动方向:1为左右、2为上下 
Scroll02.nStep = 20;//速度，越大越快 
Scroll02.nType = 2;//滚动类型:1为返回式、2为循环式、3在循环式自动滚动时设置 
Scroll02.autoPlay = true;//是否自动滚动 
Scroll02.autoPlayTime = 3;//自动滚动间隔时间（秒） 设置为0，则不停顿   
Scroll02.init();
})

Qfast(false,'scroll',function(){
var Scroll03 = new uedScroll();
Scroll03.scrollContId = "pic03";//主体区域
Scroll03.scrollSplit = {mytag:"div",myclass:"s03"};//滚动单元和class名
Scroll03.arrLeftId = "left03";//左按钮
Scroll03.arrRightId = "right03";//右按钮
Scroll03.sSliceIndex = 1;//每次滚动单元的个数  
Scroll03.sDir = 1;//滚动方向:1为左右、2为上下 
Scroll03.nStep = 20;//速度，越大越快 
Scroll03.nType = 2;//滚动类型:1为返回式、2为循环式、3在循环式自动滚动时设置 
Scroll03.autoPlay = true;//是否自动滚动 
Scroll03.autoPlayTime = 3;//自动滚动间隔时间（秒） 设置为0，则不停顿   
Scroll03.init();
})

LeftLoad();/*  |xGv00|e0288ef2373d037fbae8092e6167ea11 */

/*  |xGv00|96477fd96988e599320d6ed0c4b5ed63 */