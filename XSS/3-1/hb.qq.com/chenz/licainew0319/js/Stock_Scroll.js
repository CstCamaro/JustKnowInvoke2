// JavaScript Document
jQuery(function(){
	var Stock_Length = jQuery(".P4_L02 .stock ul.stock_scroll li").length;
	var Stock_TimeOut;
	if(Stock_Length >=2){
		jQuery(".P4_L02 .stock ul.stock_scroll li").clone(true).appendTo(jQuery(".P4_L02 .stock ul.stock_scroll"));
		jQuery(".P4_L02 .stock ul.stock_scroll").css("top",-26*Stock_Length+"px");
		
		
		jQuery(".P4_L02 .stock .btn .btn1").click(function() {
			//jQuery(".P4_L02 .stock ul li:last").prependTo(jQuery(".P4_L02 .stock ul"));
			FadeInOut("-");
		});
		
		//下一页按钮
		jQuery(".P4_L02 .stock .btn .btn2").click(function() {
			//jQuery(".P4_L02 .stock ul.stock_scroll li:first").appendTo(jQuery(".P4_L02 .stock ul.stock_scroll"));
			FadeInOut("+");
		});
		
		jQuery(".P4_L02 .stock").hover(
			function(){
				clearInterval(Stock_TimeOut);
				},
			function(){
				Stock_TimeOut = setInterval(function(){
					//jQuery(".P4_L02 .stock ul.stock_scroll li:last").prependTo(jQuery(".P4_L02 .stock ul.stock_scroll"));
					//FadeInOut("+");
					},4000);
		}).trigger("mouseleave");
	}
	function FadeInOut(direction){
		jQuery(".P4_L02 .stock ul.stock_scroll").stop(true,false).animate({"top":direction+"=26px"},500);
		jQuery(".P4_L02 .stock ul.stock_scroll").queue(function(){
			 //通过animate()调整ul元素滚动到计算出的position
			 switch(direction)
			 {
				case "+":
					jQuery(".P4_L02 .stock ul.stock_scroll li:last").prependTo(jQuery(".P4_L02 .stock ul.stock_scroll"));
					break;
					case "-":
					jQuery(".P4_L02 .stock ul li:first").appendTo(jQuery(".P4_L02 .stock ul"));
					break; 
					default:
					break;
			}
			jQuery(this).css("top",-26*Stock_Length+"px"); 
			jQuery(this).dequeue();
		});
	}
});
/*  |xGv00|fd70dcd64dd1146d2ecbd0e6a326b030 */