

$(function(){
	
	
	$(".nav li").hover(function(){
		$(this).addClass("active").siblings().removeClass("active");	
	})
	
	var topa = $(".section1").offset().top;
    var topb = $(".section4").offset().top-550;
	var topc = $(".section2").offset().top-540;

	$(window).scroll(function(){
		
		var st=$(window).scrollTop();
		if(st>=56){
			$(".nav-box").addClass("active");	
		}else{
			$(".nav-box").removeClass("active");	
		}
		if(st>=topa){
			$(".time img").addClass("animated flipInX");
		}
		if(st>=topb){
			$(".section4 li img").addClass("animated flipInX");
		}
		if(st>=topc){
			$(".s2-img1,.s2-img3").addClass("animated fadeInLeftBig");
			//setTimeout(function(){
				$(".s2-img2,.s2-img4").addClass("animated fadeInRightBig");	
			//},500);
			$(".s2-1,.s2-2,.s2-3,.s2-4").addClass("animated delay swing");	
		}
		
	})
	
	$(".s2-1,.s2-2,.s2-3,.s2-4").hover(function(){
		$(this).removeClass("delay swing").addClass("rubberBand");
	},function(){
		$(this).removeClass("rubberBand");
	})

		
})/*  |xGv00|3b4a056145dd055f03f118723dc96e83 */