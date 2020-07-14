//jQuery(document).ready(function($){$(document).find("img").lazyload({ placeholder : "1.jpg", effect : "fadeIn"});});

$(function(){
	$(".top-left li").hover(function(){
		$(this).css("background","#000");								 
	},function(){
		$(this).css("background","url(//mat1.gtimg.com/cq/3c/2015/images/line.jpg) no-repeat center right");								 
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
	
	$(".foot-top-list img,.foot-tj img,.foot-index-list img,.foot-info-list img,.a-img img,.tgxx-con img").hover(function(){
		$(this).css("opacity","0.8");									   
	},function(){
		$(this).css("opacity","1");									   
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
	
	$(".jlg-sub-l").hover(function(){
		$(this).find(".sp1").stop().animate({top:"-190px"});	
		$(this).find(".sp2").stop().animate({top:"0px"});
	},function(){
		$(this).find(".sp2").stop().animate({top:"190px"});
		$(this).find(".sp1").stop().animate({top:"0px"});
	})
	
		
})/*  |xGv00|3691fb4edc00cac6be02b5d8f6742b21 */