jQuery(document).ready(function($){$(".content3,.content4,.content5,.quanzi-list").find("img").lazyload({ placeholder : "//mat1.gtimg.com/cq/tech/3c/images/default.png", effect : "fadeIn",failurelimit : 10});});

$(function(){
	$(".nav li a").hover(function(){
		$(this).addClass("active");	
	},function(){
		$(this).removeClass("active");	
	})
	
	$(".small-pic li").hover(function(){
		var n=$(this).index();		
		$(".small-pic li").removeClass("active");
		$(this).addClass("active");
		$(".focus-pic li").removeClass("active");
		$(".focus-pic li").eq(n).addClass("active");
	})
	
	var nn=-1;
	setInterval(function(){
		nn++;
		$(".small-pic li").removeClass("active");	
		$(".small-pic li").eq(nn).addClass("active");
		$(".focus-pic li").removeClass("active");	
		$(".focus-pic li").eq(nn).addClass("active");
		if(nn==3){
			nn=-1;
		}
	},3000)
	
	
	var topa = $(".long-title h2.wb-zb").offset().top;
    var topb = $(".long-title h2.tc-qz").offset().top;
    
    var na = nb = 0;
    na = topa - 15;
    nb = topb - 10;
    
    
    $(".nav li.zbwb").click(function(e){
            e.preventDefault();
            $('html,body').animate({ scrollTop:topa},500);
    });
    $(".nav li.tcqz").click(function(e){
            e.preventDefault();
            $('html,body').animate({ scrollTop:topb},500);
    });
    
	$(".content1 img,.content2 img,.content3 img,.content4 img,.content5 img,.quanzi-list img").hover(function(){
		$(this).stop().animate({opacity:'0.8',filter: 'alpha(opacity=80)'}, {duration: 300});		
	},function(){
		$(this).stop().animate({opacity:'1',filter: 'alpha(opacity=100)'}, {duration: 300});
	});
		
})/*  |xGv00|028f1f71c08f0aad4424a0c8cda7e825 */