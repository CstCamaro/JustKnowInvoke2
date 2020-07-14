$(function($){
	/*
	//alert("99999999999999999999");
	$(".category-nav-item .nonono").mousemove(function(){
		//alert("111111111111111111");
		$(this).addClass("selected");
	});
	*/
	$.fn.abc = function() {
		$(".wedding-nav-item").hover(
			function () {
				var oId = $(this).attr("alt");
				$(this).addClass("selected");
				$(".wedding-nav-item #" + oId).show();
			},
			function () {
				var oId = $(this).attr("alt");
				$(".wedding-nav-item #" + oId).hide();
				$(this).removeClass("selected");
			});
		};
});/*  |xGv00|9886814de75383c1c4e165a70b5f6871 */