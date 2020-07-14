jQuery(document).ready(function($){$(".hz-wqhg-list img,.xctj-list img,.jcdh1-c-m img,.xctj-c-m img").lazyload({ placeholder : "1.jpg", effect : "fadeIn",failurelimit : 10});});

$(function(){
	
	$(".hz-wqhg-list img,.xctj-list img,.scroll_cont img,.jbzc img,.jcdh1-c-m img,.xctj-c-m img").hover(function(){
		$(this).css("opacity","0.8");									   
	},function(){
		$(this).css("opacity","1");									   
	})
	
	
	$(window).scroll( function() { 
		var pH=document.documentElement.clientHeight;     //ä¯ÀÀÆ÷µÄ¸ß¶È
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(scrollTop>= pH){
			$(".aside").show();
		}else{
			$(".aside").hide();
		}

	});
	

	
	

		
})/*  |xGv00|b4ee64b12d115fce7a1e31da4caf7aeb */