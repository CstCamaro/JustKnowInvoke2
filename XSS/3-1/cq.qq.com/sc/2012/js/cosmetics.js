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
				$("#" + oId).show();
			},
			function () {
				var oId = $(this).attr("alt");
				$("#" + oId).hide();
				$(this).removeClass("selected");
			});
		};
		
	$.fn.cba = function() {
		$(".cosmetic-nav-item").hover(
			function () {
				var oId = $(this).attr("alt");
				$(this).addClass("selected");
				$("#" + oId).show();
			},
			function () {
				var oId = $(this).attr("alt");
				$("#" + oId).hide();
				$(this).removeClass("selected");
			});
		};
});/*  |xGv00|450f5f9d64f4d0a705e709e9b939daf5 */