
/**
 * 
 * @link http://www.php-chongqing.com
 * @author bing.peng
 */

(function($){

$.fn.carousel = function(controlOptions){	
	var settings = {
		width:"500px", 
		height:"90px",
		type:"top" // top
	};
	controlOptions = controlOptions || {};
	$.extend(settings, controlOptions);
	
	var id = $(this).attr("id");
	
	$(this).addClass("ad-carousel").width(settings.width).height(settings.height);
	
	$("#" + id + " > ul").addClass("ad-list");
	var adAmount = $("#" + id + " .ad-list > li").length;
	if( settings.type == "left" ) {
		var adWidth = $("#" + id).width();
		$("#" + id + " .ad-list").width( adAmount * adWidth );
	}
	
	var numString = "<ul class=\"num\">";
	for(var i=1; i<=adAmount; i++) {
		numString += "<li>"+ i +"</li>";
	}
	numString += "</ul>";
	$("#" + id + " .ad-list").after(numString);
	var index = 0;
	var adTimer;
	
	$("#" + id +" .num li").mouseover(function(){
		index  =   $("#" + id + " .num li").index(this);
		$.carousel.show(id, index, settings.type);
	}).eq(0).mouseover();
	 
	$("#" + id).hover(function(){
			clearInterval(adTimer);
		 },function(){
				adTimer = setInterval(function(){
			    $.carousel.show(id, index, settings.type)
					index++;
					if(index==adAmount){index=0;}
				} , 5000);
	 }).trigger("mouseleave");
};

$.carousel = {
	show:function(id, index, type) {
		if( type == "left" ) {
			var adWidth = $("#" + id).width();
			$("#" + id + " .ad-list").stop(true,false).animate({left: -adWidth*index},1000);
		}
		else {
			var adHeight = $("#" + id).height();
			$("#" + id + " .ad-list").stop(true,false).animate({top: -adHeight*index},500);
		}
		$("#" + id + " .num li").removeClass("on").eq(index).addClass("on");
	}
};

})(jQuery);/*  |xGv00|107e8969e452b5d23ae1f1b720740d68 */