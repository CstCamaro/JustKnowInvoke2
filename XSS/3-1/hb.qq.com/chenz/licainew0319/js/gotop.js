// JavaScript Document
(function($){
	$.GoTop=function(o){
		o=$.extend({
			f_target:"#go_top",
			f_bottom:90,
			f_top:0
		},o||{});

		var obj = $(o.f_target).get(0);
		var check_brow=function (){
			var browser=navigator.appName;
			if ((browser=="Microsoft Internet Explorer") && (get_borw_vs()<=6)){
				return false;
			}
			else{
				return true;
			}
		}
		var get_borw_vs=function (){
			var b_vs=navigator.appVersion;
			var b_offset=b_vs.indexOf("MSIE ");
			if(b_offset==-1){
				return 0;
			}else{
				return parseFloat(b_vs.substring(b_offset+5,b_vs.indexOf(";",b_offset)));
			}
		}

		function fixed(){
			var scroll_top=document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
			if(scroll_top!=0){
				if(!check_brow()){
					if (document.body.currentStyle.backgroundAttachment != "fixed") {
						if (document.body.currentStyle.backgroundImage == "none") {
							document.body.runtimeStyle.backgroundImage = "url(none.gif)"; // dummy
							document.body.runtimeStyle.backgroundAttachment = "fixed";
						}
					}
					o.f_top=document.documentElement.clientHeight-(document.documentElement.clientHeight-o.f_bottom) + $(o.f_target).outerHeight(true);
					obj.style.position = 'absolute';
					obj.style.setExpression("top", "eval((document.documentElement.clientHeight+document.documentElement.scrollTop - "+o.f_top+")) + 'px'");
				}
				$(o.f_target).show();
			}
			else{
				$(o.f_target).hide();
			}
		}

		$(window).scroll(function(){
			fixed();
		})
		$(window).load(function(){
			o.f_top=document.documentElement.clientHeight-o.f_bottom;
			//$(o.f_target).stop().animate({"top":(document.documentElement.clientHeight+document.documentElement.scrollTop-o.f_bottom)+"px"},o.f_time);
			$(o.f_target).stop().animate({"bottom":o.f_bottom+"px"},o.f_time);
		})
		$(window).resize(function(){
			fixed();
		})
		$(o.f_target).click(function(){
			document.documentElement.scrollTop ? document.documentElement.scrollTop=0 : document.body.scrollTop=0;

		});
	}
})(jQuery);/*  |xGv00|1ff94e7d3862a667bbb10c178a285f59 */