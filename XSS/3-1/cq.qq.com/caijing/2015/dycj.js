jQuery(document).ready(function($){
	
	$(".nav li").hover(function(){
		$(this).addClass("active");	
	},function(){
		$(this).removeClass("active");	
	})
	$(".edu-news p.p1 span.sp2").hover(function(){
		$(this).addClass("active");	
		$(this).parent().parent().find(".share-box").show();
	},function(){
		$(this).removeClass("active");
		$(this).parent().parent().find(".share-box").hide();
	})
	
	$(".share-box").hover(function(){
		$(this).show()	
	},function(){
		$(this).hide()	
	})
	
	
	$(".c1,.c2").addClass("active");
	var n=0;
	var m=$(".content3-l .edu-news-box").length;
    $(".load-more").click(function(){
    	n++;
		if(n==m){
			n=0	
         }
		$(".content3-l .edu-news-box").eq(n).addClass("active").siblings().removeClass("active");
    })
	
	 $("#totop").click(function(){
        $('html,body').animate({scrollTop: "0"}, 800);
    })



});
/*  |xGv00|7338e43e0ee2197280e88b764b9c52d6 */