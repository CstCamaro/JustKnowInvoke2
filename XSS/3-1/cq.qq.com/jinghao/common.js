$(function(){
	var m=0;
	var liL=$(".nav ul li").length;
	for(var i=0;i<liL;i++){
		m+=$(".nav ul li").eq(i).outerWidth();
	}
	$(".nav ul").css({"width":m+"px","margin":"auto"})
		   
	$(".nav li").click(function(){
		$(".nav li").removeClass("current");
		$(".nav li").find("h3").css("color","#05030b");
		$(".nav li").find("p").css("color","#666");
		$(this).addClass("current");
		$(this).find("h3").css("color","#fff");
		$(this).find("p").css("color","#fff");
		
		var n=$(this).index();
		$(".main .sub-main").removeClass("active");
		$(".main .sub-main").eq(n).addClass("active");
	})
	
	$(".sub-main-l li a").click(function(){
		$(".sub-main-l li a").removeClass("current");
		$(this).addClass("current");
	})
	
	$(window).scroll(function(){
		var h=$(".banner").height()+102;
		if($(window).scrollTop()>h){
			$(".sub-main-l").removeClass("sub-main-l1").addClass("sub-main-l2");
		}else{
			$(".sub-main-l").removeClass("sub-main-l2").addClass("sub-main-l1");
		}
		
	})
	
	
})/*  |xGv00|aa5cee56f1dda5c4e56f2d67c232e474 */