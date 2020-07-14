(function($){
$.scroll_ad=function(o){
	o=$.extend({
		time:8000,
		target:"#CQ_gd_a",
		s_width:300
	},o||{});
	setInterval(function(){
		if($(o.target).css("left")=="0px"){
			$(o.target).animate({left:'-='+o.s_width+"px"},"slow");
		}
		else{
			$(o.target).animate({left:0+"px"},"slow");
		}
	},o.time);
}
})(jQuery)/*  |xGv00|36ead1ff429cab7c2bc0120848786e30 */