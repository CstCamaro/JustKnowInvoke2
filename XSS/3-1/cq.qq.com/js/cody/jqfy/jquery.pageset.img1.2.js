(function(){
	$.fn.PageSet=function(){
		_ListDiv=this;
		Page=$(this).attr('rel');
		_pagediv=$("#page");
		_pagedivnum=$("<div id='pagenum'></div>");
		_r=$("<span id='r' style='display:inline-block;width:50px;height:20px;text-align:center;margin-right:5px;border:1px solid #CCDBE4'><a id='r1'>上一页</a></span>");
		_n=$("<span id='n' style='display:inline-block;width:50px;height:20px;text-align:center;border:1px solid #CCDBE4'><a id='n1'>下一页</a></span>");
		_li=_ListDiv.children("ul:first").children("li");
		var i=0;p=1;
		_li.each(function(){
			if(i%Page==0){
				tempUL=$("<UL id='page_"+p+"' style='display:none;' rel='true'></UL>");
				_ListDiv.append(tempUL);
				$(_r).appendTo(_pagediv);
				$(_pagedivnum).appendTo(_pagediv);
				$("<a>"+p+"</a>")
				.css('line-height','21px')
				.css('border','1px solid #CCDBE4')
				.css('margin-right','5px')
				.css({'display':'inline-block','width':'25px','height':'20px','text-align':'center'})
				.attr('id','p_'+p)
				.attr('href','javascript:void(0);')
				.attr('rel',p)
				.bind('click',function(){ShowPage($(this).attr('rel'));})
				.appendTo(_pagedivnum);
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
		$("a[id^='p_']").css({'color':'#000','text-decoration':'none','font-weight':'normal'});
		$("UL[id^='page_']").hide();
		$("#page_"+num).show();
		$("#p_"+num).css({'color':'red','font-weight':'bold'});
		$("#page_"+num+" li").each(function(){
			if($("#page_"+num).attr('rel')){
				$(".aimg",this).css({"background":"url("+$(".aimg",this).attr('rel')+") no-repeat center center"});
			}
			$("#page_"+num).attr('rel','false');
		}).css({'list-style-type':'none'});
		$("#pp_"+num).css('color','#000').blur();
		if(num>1){
		$("#r1").unbind('click').css({'cursor':'pointer','text-decoration':'none','color':'#000'}).attr('href','javascript:void(0);').click(function(){$("#p_"+num).prev("a").click();});
		}
		else{
		$("#r1").unbind('click').css({'cursor':'pointer','text-decoration':'none','color':'#DBE1E6'});
		}
		if(num<(Number(p)-1)){
		$("#n1").unbind('click').css({'cursor':'pointer','text-decoration':'none','color':'#000'}).attr('href','javascript:void(0);').click(function(){$("#p_"+num).next("a").click();});
		}
		else{
		$("#n1").unbind('click').css({'cursor':'pointer','text-decoration':'none','color':'#DBE1E6'});
		}
		
	};
})(jQuery);

$(document).ready(function(){
	$("#PageSet").PageSet();
	$("#PageSet").css({'float':'left'});
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
});/*  |xGv00|7c22a4e48c80fcd6bcf0d2c9e1f4ad49 */