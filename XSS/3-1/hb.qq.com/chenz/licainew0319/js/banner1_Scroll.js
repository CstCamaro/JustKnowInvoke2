// JavaScript Document
jQuery(function(){
	var Banner1index = 0;
	var Banner1Length = jQuery("#main .Part_1 .P1_L01 ul.pic li").length;
	var Banner1Width = jQuery('#main .Part_1 .P1_L01').width();
	var Banner1TimeOut;
	var Banner1Dot = "";
	
	
	
	if(Banner1Length >=2){
		//jQuery(".P3_L05 .info_scroll ul.content li").hide();
		//jQuery(".P3_L05 .info_scroll ul.content li").eq(0).show();
		
		jQuery("#main .Part_1 .P1_L01 ul.pic").width(Banner1Width * Banner1Length);
		
		for(i = 0;i < Banner1Length;i++){Banner1Dot+="<a>"+(i+1)+"</a>"}
		jQuery("#main .Part_1 .P1_L01 .Dot").append(Banner1Dot);
		jQuery("#main .Part_1 .P1_L01 div.text p").text(jQuery("#main .Part_1 .P1_L01 ul.pic li").eq(0).find('img').attr('alt'));
		jQuery("#main .Part_1 .P1_L01 .Dot a:first").addClass("current");
		
		jQuery("#main .Part_1 .P1_L01 .Dot a").each(function() {
			jQuery(this).mouseenter(function(){
				Banner1index = jQuery(this).index();
				Banner1FadeInOut(Banner1index);
			});
		});
		jQuery("#main .Part_1 .P1_L01").hover(
			function(){
				clearInterval(Banner1TimeOut);
				},
			function(){
				Banner1TimeOut = setInterval(function(){
						Banner1index++;
						if(Banner1index == Banner1Length){Banner1index = 0;};
						Banner1FadeInOut(Banner1index);
					},4000);
		}).trigger("mouseleave");
	}
	function Banner1FadeInOut(index){
		var Current = Banner1Width*-index;
		var This = jQuery("#main .Part_1 .P1_L01 ul.pic li").eq(index);
		var DotThis = jQuery("#main .Part_1 .P1_L01 .Dot a").eq(index);
		jQuery("#main .Part_1 .P1_L01 ul.pic").stop(true,false).animate({left:Current},500);
		var Text = This.find('img').attr("alt");
		jQuery("#main .Part_1 .P1_L01 div.text p").text(Text);
		DotThis.siblings().removeClass("current");
		DotThis.addClass("current");
		
		
		//alert(NumLength);
	}
});
/*  |xGv00|2360647985e7bceefc6658d7bea1345e */