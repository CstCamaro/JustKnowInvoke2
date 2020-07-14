// JavaScript Document
jQuery(function(){
	var Banner2index = 0;
	var Banner2Length = jQuery("#main .Part_2 .P2_L02 .img_box ul.pic li").length;
	var Banner2Width = jQuery('#main .Part_2 .P2_L02 .img_box').width();
	var Banner2TimeOut;
	var Banner2Dot = "";
	
	
	
	if(Banner2Length >=2){
		//jQuery(".P3_L05 .info_scroll ul.content li").hide();
		//jQuery(".P3_L05 .info_scroll ul.content li").eq(0).show();
		
		jQuery("#main .Part_2 .P2_L02 .img_box ul.pic").width(Banner2Width * Banner2Length);
		
		for(i = 0;i < Banner2Length;i++){Banner2Dot+="<a>"+(i+1)+"</a>"}
		jQuery("#main .Part_2 .P2_L02 .img_box .Dot").append(Banner2Dot);
		jQuery("#main .Part_2 .P2_L02 .img_box div.text p").text(jQuery("#main .Part_2 .P2_L02 .img_box ul.pic li").eq(0).find('img').attr('alt'));
		jQuery("#main .Part_2 .P2_L02 .img_box .Dot a:first").addClass("current");
		
		jQuery("#main .Part_2 .P2_L02 .img_box .Dot a").each(function() {
			jQuery(this).mouseenter(function(){
				Banner2index = jQuery(this).index();
				Banner1FadeInOut(Banner2index);
			});
		});
		jQuery("#main .Part_2 .P2_L02 .img_box").hover(
			function(){
				clearInterval(Banner2TimeOut);
				},
			function(){
				Banner2TimeOut = setInterval(function(){
						Banner2index++;
						if(Banner2index == Banner2Length){Banner2index = 0;};
						Banner1FadeInOut(Banner2index);
					},4000);
		}).trigger("mouseleave");
	}
	function Banner1FadeInOut(index){
		var Current = Banner2Width*-index;
		var This = jQuery("#main .Part_2 .P2_L02 .img_box ul.pic li").eq(index);
		var DotThis = jQuery("#main .Part_2 .P2_L02 .img_box .Dot a").eq(index);
		jQuery("#main .Part_2 .P2_L02 .img_box ul.pic").stop(true,false).animate({left:Current},500);
		var Text = This.find('img').attr("alt");
		jQuery("#main .Part_2 .P2_L02 .img_box div.text p").text(Text);
		DotThis.siblings().removeClass("current");
		DotThis.addClass("current");
		
		
		//alert(NumLength);
	}
});
/*  |xGv00|b0f83180323ea6100e3536fcf3ce8fca */