(function($){

$.fn.category_nav = function(opts) {			
	var settings = {
		stat: 'fold'	//expansion
	};
	opts = opts || {};
	$.extend(settings, opts);

	return this.each(function(){
		if( settings.stat == 'fold' ) {
			$("#category-menu").hover(
				function() {
					$(this).addClass("selected");
					$("#category-nav").show();
				},
				function(){
					$(this).removeClass("selected");
					$("#category-nav").hide();
				}
			);
		}
		
		$("#category-nav .category-nav-item").hover(
			function() {
				$(this).css("border-bottom", "1px solid #F24845").css("border-top", "1px solid #F24845");
				var target = $(this).attr("alt");
				//alert(target);
				$("#" + target).show();
			},
			function() {
				$(this).css("border-bottom", "1px solid #FFECD3").css("border-top", "1px solid #FFF9F1");
				var target = $(this).attr("alt");
				$("#" + target).hide();
			}
		);
		
		if( settings.stat == 'expansion' ) {
			$("#category-menu").addClass("selected");
			$("#category-nav").show();
		}
	}); 	
};

})(jQuery);/*  |xGv00|f0ca67878f45a12e54539638ea25ec27 */