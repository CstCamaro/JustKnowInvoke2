jQuery(document).ready(function($){$(document).find("img").lazyload({ placeholder : "//mat1.gtimg.com/cq/tech/3c/images/default.png", effect : "fadeIn",failurelimit : 10});});

$(function(){
    var s=$(".vip_nav li").index($(".active"));
    $(".menu ul").eq(s).addClass("active");

	$(".vip_nav li").hover(function(){
		var iIndex=$(this).index();								  
		$(".vip_nav li").removeClass("active");
		$(this).addClass("active");
		$(".menu ul").removeClass("active");
		$(".menu ul").eq(iIndex).addClass("active");
	})   
		   
	$(".section-title-c li a").hover(function(){
		var iIndex=$(this).parents().index();								  
		$(".section-title-c li a").removeClass("active");
		$(this).addClass("active");
		$(this).parent().parent().parent().parent().parent().find(".section-content .section-content-l-c").removeClass("active");
		$(this).parent().parent().parent().parent().parent().find(".section-content .section-content-l-c").eq(iIndex).addClass("active");
	})	
	
	
	$(".ph-title-list li a").hover(function(){
		var iIndex=$(this).parents().index();
		$(this).parent().parent().find("li").removeClass("active");
		$(this).parent().addClass("active");
		$(".ph-title-list li a").removeClass("active");
		$(this).addClass("active");
		$(this).parent().parent().parent().parent().parent().find(".ph-main-list ul").removeClass("current");
		$(this).parent().parent().parent().parent().parent().find(".ph-main-list ul").eq(iIndex).addClass("current");
	})
	
	$(".ymgx-section-title-c li").hover(function(){
		var iIndex=$(this).index();								  
		$(".ymgx-section-title-c li").removeClass("active");
		$(this).addClass("active");
		$(".ymgx-main .ymgx-main-sub").removeClass("active");
		$(".ymgx-main .ymgx-main-sub").eq(iIndex).addClass("active");
	}) 
	
	$(".ymgx-section-title-c li").hover(function(){
		var iIndex=$(this).index();								  
		$(".ymgx-section-title-c li").removeClass("active");
		$(this).addClass("active");
		$(".ylbg-main .ymgx-main-sub").removeClass("active");
		$(".ylbg-main .ymgx-main-sub").eq(iIndex).addClass("active");
	}) 
	
	$(".qcxy-list li:nth-child(2n)").css("margin-right","0");
	$(".yp-list3 li:nth-child(4n)").css("margin-right","0");
	$(".yp-list4 li:nth-child(4n)").css("margin-right","0");
	$(".yp-list5 li:nth-child(3n)").css("margin-right","0");
	
	$(".d_prev").hover(function(){
		$(this).css("background-position","-390px -59px");							
	},function(){
		$(this).css("background-position","-331px 0");							
	})
	$(".d_next").hover(function(){
		$(this).css("background-position","-390px 0");							
	},function(){
		$(this).css("background-position","-331px -59px");							
	})
	
	$(".banner .prevBtn i").hover(function(){
		$(this).css("background-position","-390px -59px");							
	},function(){
		$(this).css("background-position","-331px 0");							
	})
	$(".banner .nextBtn i").hover(function(){
		$(this).css("background-position","-390px 0");							
	},function(){
		$(this).css("background-position","-331px -59px");							
	})
})/*  |xGv00|2bb41351e979317ae48c21bcf150d7a3 */