//jQuery(document).ready(function($){$(".foot-index-list-l img,.foot-info-list li img,.nojj-list li img").lazyload({ placeholder : "//mat1.gtimg.com/cq/tech/3c/images/default.png", effect : "fadeIn",failurelimit : 10});});

$(function(){
	$(".top-left li").hover(function(){
		$(this).css("background","#000");								 
	},function(){
		$(this).css("background","url(static/images/line.jpg) no-repeat center right");								 
	})
	

	$(".nav li").hover(function(){
		$(".nav li").removeClass("active");
		$(this).addClass("active");							
	})
	
	$(".aside").hover(function(){
		$(this).css("background-position","0 -54px");						   
	},function(){
		$(this).css("background-position","0 0");						   
	})
	

	
	$(".foot-index-list").hover(function(){
		$(this).css("background","#f6f6f6");									   
	},function(){
		$(this).css("background","#fff");									   
	})
	
	$(".foot-label a").hover(function(){
		$(this).css("background","#9f0b21");								  
	},function(){
		$(this).css("background","#bc364a");								  
	})
	

		
})/*  |xGv00|0eb3547e644c7558292be906de04118c */