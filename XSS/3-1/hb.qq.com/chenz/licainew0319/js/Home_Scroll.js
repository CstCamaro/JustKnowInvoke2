// JavaScript Document
jQuery(document).ready(function(){
	var index = 0;
	var NumLength = jQuery(".P3_L05 .info_scroll ul.content li").length;
	var TimeOut;
	var Dot = "";
	if(NumLength >=2){
		//jQuery(".P3_L05 .info_scroll ul.content li").hide();
		//jQuery(".P3_L05 .info_scroll ul.content li").eq(0).show();
		
		jQuery(".P3_L05 .info_scroll ul.content li").stop(true,false).animate({opacity:0},10);
		jQuery(".P3_L05 .info_scroll ul.content li").eq(0).stop(true,false).animate({opacity:1},10);
		
		
		for(i = 0;i < NumLength;i++){Dot+="<a></a>"}
		jQuery(".P3_L05 .info_scroll ul.content").after("<div class='Dot'>"+Dot+"</div>");
		var BannerWidth = jQuery(".P3_L05 .info_scroll").width();
		jQuery(".P3_L05 .info_scroll .Dot a:last").css("margin-right","0px");
		jQuery(".P3_L05 .info_scroll .Dot a:first").addClass("current");
		
		jQuery(".P3_L05 .info_scroll .Dot a").each(function() {
			jQuery(this).mouseenter(function(){
				index = jQuery(this).index();
				FadeInOut(index);
			});
		});
		jQuery(".P3_L05 .info_scroll").hover(
			function(){
				clearInterval(TimeOut);
				},
			function(){
				TimeOut = setInterval(function(){
						index++;
						if(index == NumLength){index = 0;};
						FadeInOut(index);
					},4000);
		}).trigger("mouseleave");
		jQuery(".P3_L05 .info_scroll .Dot").mouseenter(function(){
			clearInterval(TimeOut);
		});
	}
	function FadeInOut(index){
		
		var This = jQuery(".P3_L05 .info_scroll ul.content li").eq(index);
		var DotThis = jQuery(".P3_L05 .info_scroll .Dot a").eq(index);
		This.css("z-index","20").stop(true,false).animate({opacity:1},500).siblings().css("z-index","15").stop(true,false).animate({opacity:0.1},800);
		DotThis.siblings().removeClass("current");
		DotThis.addClass("current");
		
		
		//alert(NumLength);
	}
});
/*  |xGv00|cf21a85f095bee52bbf934056f71c29d */