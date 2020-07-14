(function($){

/**
 * JQuery 焦点图广告插件
 * @author bing.peng
 */
$.fn.adfocus = function(opts){
	var settings = {
		interval:5000
	};
	opts = opts || {};
	$.extend(settings, opts);
	
	var ad = {
		index: 0,
		init: function() {			
			var width = $(".ad-focus").width();
			var tempString = "<div class=\"ad-focus-imgs\">" + $(".ad-focus").html() + "</div>";
			var aimgList = $(".ad-focus a");
			ad.count = aimgList.length;
			
			tempString += "<div class=\"ad-focus-handler\">";
			$.each( aimgList, function(i, n){
				var href = $(n).attr("href");
				var title = $(n).attr("title");
				tempString += "<a href=\""+ href +"\">"+ title +"</a>";
			});
			tempString += "</div><div style=\"clear:both;\"></div>";
			//alert("tempString:" + tempString);
			$(".ad-focus").html(tempString);
			
			var aWidth = parseInt(width/ad.count);
			var excess = width - aWidth * ad.count;
			$(".ad-focus-handler a").width(aWidth);
			$(".ad-focus-handler a:first-child").width(aWidth+excess);
			
			$(".ad-focus-handler a").hover(
				function() {
					ad.show($(this));
					ad.stopAuto();
				},
				function() {
					ad.startAuto();
				}
			);
		},	
		show: function(o) {
			$(".ad-focus-handler .selected").removeClass("selected");
			$(".ad-focus-imgs a").hide();
			var href = o.addClass("selected").attr("href");
			$(".ad-focus-imgs a[href='" + href + "']").show();
		},
		startAuto: function() {
			this.intervalId = setInterval(function() {
				if( ad.index < (ad.count - 1)  ) {
					ad.index++;
				}
				else {
					ad.index = 0;
				}
				ad.show($(".ad-focus-handler a:eq("+ ad.index +")"));
			}, settings.interval);
		},
		stopAuto: function() {
			clearInterval(ad.intervalId);
		}
	};
	return this.each(function(){
		$(this).addClass("ad-focus");
		ad.init();
		ad.show($(".ad-focus-handler a:eq("+ ad.index +")"));
		ad.startAuto();
	}); 	
}	

})(jQuery);/*  |xGv00|af74cf9559f1a373d21ffbf0891ac62d */