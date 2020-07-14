(function($){
	$.any_hover=function(o){
		o=$.extend({
			h_div:"#CQ_RightMove",
			s_div:".qxtc",
			x:0,
			y:0
		},o||{});
		$(o.s_div).hide();
		$(o.h_div).hover(function(){
			$(o.s_div).show();
			$( o.h_div+">a").css({"background":"none repeat scroll 0 0 white","border-color":"#BFBFBF #BFBFBF","border-style":"solid solid none","border-width":"1px 1px medium","z-index":"9999"});
			//$(o.s_div).css({"top":"20px","right":"0px","z-index":"9998"});
			$(o.s_div).addClass("s_qxtc");
			},
			function(){
			$(o.s_div).hide();
			$(o.h_div+">a").css({"border":"none"});
			$(o.s_div).css({"display":"none"})
		});
	}
})(jQuery);/*  |xGv00|6222ee34506b7a69bd6d0865d6085216 */