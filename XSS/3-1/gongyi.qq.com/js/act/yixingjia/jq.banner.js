;(function($){
	 //cycle images begin
	 $.fn.bannerShow = function(settings){
	     settings = jQuery.extend({
		        wraper : "wraper",
			  autotime : 6000,
			    isAuto : true,
			    cur : 0, //当前位置
			    timer : null
		 }, settings || {});
		 
		 return this.each(function(){
		     //var timer;
		     //var cur = 0; //当前位置
		     showmc(settings.cur);
			 var container = this;
			 var tnav = $(".circle", container),
				  lis = $("li", tnav);
			 
			 $(this).hover(function(){
			     settings.isAuto = false;
			 },function(){
			     settings.isAuto = true;
			 });
			 
			 lis.each(function(i, item){
				 $(item).mouseover(function(){
				 	/*if(settings.timer){
				 		window.clearInterval(settings.timer);
				 	}*/
				     settings.cur = i;
				     lis.removeClass().eq(settings.cur).addClass("on");
					 showmc(settings.cur);
					 
				 });
			 });
			 
			 settings.timer = setInterval(function(){
			     if(!settings.isAuto) {
			     	//window.clearInterval(settings.timer);
			     	return false;
			     }
				 /*lis.each(function(i, item){
				     if($(item).hasClass("on")) settings.cur = i;
					 showmc(settings.cur);
				 });*/
				 if(settings.cur == lis.size()-1){
				    settings.cur = 0;
				    showmc(settings.cur);
					lis.removeClass().eq(settings.cur).addClass("on");
				 }else{
				    settings.cur += 1;
				    showmc(settings.cur);
					lis.removeClass().eq(settings.cur).addClass("on");
				 }
			 }, settings.autotime);
			 
			 function showmc(i){
			 	var $img = $(".sideShow div").eq(i).find("img");
			 	if(!$img.attr("src") && !!$img.attr("data-src")){
			 		$img.attr("src",$img.attr("data-src"));
			 	}
			 	$(".sideShow div").css({"z-index":0}).fadeOut(1000);
			 	$(".sideShow div").eq(i).css({"z-index":1}).fadeIn(1000);
				 
			 }
			 
		 });
	 };
	 //cycle images end
})(jQuery);/*  |xGv00|b8c95a3af1d2f9d00ef4b4b7e87314a3 */