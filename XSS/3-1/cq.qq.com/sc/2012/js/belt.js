(function($){
	
$.fn.belt = function(opts){
	var settings = {
		
	};
	opts = opts || {};
	$.extend(settings, opts);
	
	return this.each(function(){
		var i = 0;
		var sList = $(".belt .screen");
		var count = sList.length;
		$(sList[i]).show();
		var swidth = $(".belt .screen").width();
		$(".belt-handler-left").click(function(e){
			e.preventDefault();
			$(sList[i]).animate({left: "490px"}, 200);
			i--;
			if( i < 0 ) {
				i = count - 1;
			}
			$(sList[i]).css("left", "-490px");
			$(sList[i]).animate({left:"0px"}, 200).show();
		});
		
		$(".belt-handler-right").click(function(e){
			e.preventDefault();
			
			$(sList[i]).animate({left: "-490px"}, 200);
			i++;
			if(i >= count) {
				i = 0;
			} 
			$(sList[i]).css("left", "490px");
			$(sList[i]).animate({left:"0px"}, 200).show();
		});
		
	}); 	
};

})(jQuery);/*  |xGv00|f3e1fca825ab1cd836341cb0476d3d11 */