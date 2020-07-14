(function(){
	$.fn.PageSet=function(){
		_ListDiv=this;
		Page=$(this).attr('rel');
		_pagediv=$("#page");
		_pagedivnum=$("<div id='pagenum'></div>");
		_r=$("<span id='r'><a id='r1'>上一页</a></span>");
		_n=$("<span id='n'><a id='n1'>下一页</a></span>");
		_li=_ListDiv.children("ul:first").children("li");
		var i=0;p=1;
		_li.each(function(){
			if(i%Page==0){
				tempUL=$("<UL id='page_"+p+"' style='display:none;'></UL>");
				_ListDiv.append(tempUL);
				$(_r).appendTo(_pagediv);
				$(_pagedivnum).appendTo(_pagediv);
				$("<a>"+p+"</a>")
				.css('line-height','16px')
				.css('padding','1px 3px 1px 3px')
				.attr('id','p_'+p)
				.attr('href','javascript:void(0);')
				.attr('rel',p)
				.bind('click',function(){ShowPage($(this).attr('rel'));})
				.appendTo(_pagedivnum);
				$("#r").css('display','inline');
				$("#n").css('display','inline');
				$(_n).appendTo(_pagediv);
				p++;
			}
			i++;
			tempUL.append(this);
		});
		ShowPage(1);
		$(_pagedivnum).css({'width':(p-1)*15,'display':'inline'});
	};
	
	function ShowPage(num){
		$("a[id^='p_']").css({'color':'#000','text-decoration':'none'});
		$("UL[id^='page_']").hide();
		$("#page_"+num).show();
		$("#p_"+num).css('color','red');
		$("#page_"+num+" li").css({padding:'3px','list-style-type':'none'});
		$("#pp_"+num).css('color','#000').blur();
		if(num>1){
		$("#r1").unbind('click').css({'cursor':'pointer','text-decoration':'none','color':'#000'}).attr('href','javascript:void(0);').click(function(){$("#p_"+num).prev("a").click();});
		}
		else{
		$("#rl").unbind('click').css({'cursor':'pointer','text-decoration':'none','color':'#000'});
		}
		if(num<(Number(p)-1)){
		$("#n1").unbind('click').css({'cursor':'pointer','text-decoration':'none','color':'#000'}).attr('href','javascript:void(0);').click(function(){$("#p_"+num).next("a").click();});
		}
		else{
		$("#n1").unbind('click').css({'cursor':'pointer','text-decoration':'none','color':'#000'});
		}
		
	};
})(jQuery);

$(document).ready(function(){
	$("#PageSet").PageSet();
	$("#PageSet").css({'float':'left','padding':'0px','margin':'0px'});
	$("#PageSet UL").css({'padding':'0px','margin':'0px'});
	$("#page").css({'text-align':'center'});
	$(".black").css({color:'000000','text-decoration':'none'});
	$(".black").hover(
	function(){
		$(this).css('text-decoration','underline');
	},
	function(){
		$(this).css('text-decoration','none');
	}
	);
});/*  |xGv00|899fe1d2df137f0d643f2e37fcbee8c5 */