

$(function(){
	$(".nav li").hover(function(){
		$(this).addClass("active");	
	},function(){
		$(this).removeClass("active");	
	})
	
	$(window).scroll(function(){
		
		var st=$(window).scrollTop();
		if(st>=1420){
			$(".nav").addClass("po");
		}else{
			$(".nav").removeClass("po");
		}
	})
	
		
})/*  |xGv00|52de37caf31a14a01a9ae72392ef20b8 */