(function($){

$.fn.simpleTabs = function(opts){	
	var set = {
		id: 	"",
		event:	"mousemove"
	};
	opts = opts || {};
	$.extend(set, opts);
	
	function randomChar(length)  {  
	    length = length || 32;  
	    var source = "abcdefghzklmnopqrstuvwxyz";  
	    var random = "";  
	    for(var i = 0;i < length; i++)  {  
	        random += source.charAt(Math.ceil(Math.random()*100000000)%source.length);  
	    }  
	    return random;  
	}
	
	if( $(this).attr("id") == "undefined" ) {
		$(this).attr("id", randomChar(10));
	}
	
	set.id = $(this).attr("id");
	
	return this.each(function(){
		var selector = ".tabs-head a";
		if( set.id != "" ) {
			selector = "#" + set.id + " " + selector;
		}
		$(selector).bind(set.event, function(e){
			e.preventDefault();
			
			selector = ".tabs-head a";
			if( set.id != "" ) {
				selector = "#" + set.id + " " + selector;
			}
			$(selector).removeClass("selected");
			$(this).addClass("selected");
			var target = $(this).attr("href");
			
			selector = ".tabs-content .tabs-item";
			if( set.id != "" ) {
				selector = "#" + set.id + " " + selector;
			}
			$(selector).hide();
			$(target).show();
		});
	});
};

})(jQuery);/*  |xGv00|ee6218e687ec629840d62af0c0eab1d8 */