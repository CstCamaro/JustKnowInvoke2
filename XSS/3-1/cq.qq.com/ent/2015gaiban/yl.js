jQuery(document).ready(function($){$(".section img,.movie-tv img,.wh-yc img,.yl-tj img").lazyload({ placeholder : "//mat1.gtimg.com/cq/tech/3c/images/default.png", effect : "fadeIn",failurelimit : 10});});

$(function(){
	

	$(".nav li").hover(function(){
		$(".nav li").removeClass("active");
		$(this).addClass("active");							
	})
	
	$(".vote li").hover(function(){
		$(".vote li").removeClass("active");
		$(this).addClass("active");
	})
	
	$(".film-tag-list li").hover(function(){
		$(".film-tag-list li").removeClass("active");
		$(this).addClass("active");
	})
	
	$(".aside").hover(function(){
		$(this).css("background-position","0 -600px");						   
	},function(){
		$(this).css("background-position","0 -546px");						   
	})
	
	
	
	

	$(".yqbb-list li.first").addClass("active");
	$(".yqbb-list li").hover(function(){
		$(this).parent().find("li").removeClass("active");
		$(this).addClass("active");
	})
	
	$(".yl-tj-c-sub a,.bigpic a").hover(function(){
		$(this).find("span").addClass("active");						   
	},function(){
		$(this).find("span").removeClass("active");						   
	})
		
})/*  |xGv00|b89d57bb7c8500ed4d9ebd4120d9f063 */