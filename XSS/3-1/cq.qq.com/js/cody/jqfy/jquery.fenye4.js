(function($){
$.fenye=function(o){
	o=$.extend({
		ListDiv:"#PageSet1",
		pagediv:"#page1",
		Page:5
	},o||{});
	var _pagedivnum=$("<div class='pagenum'></div>");
	var _r=$("<span class='r' style='display:inline-block;width:50px;height:20px;text-align:center;margin-right:5px;border:1px solid #CCDBE4'><a class='r1'>上一页</a></span>");
	var _n=$("<span class='n' style='display:inline-block;width:50px;height:20px;text-align:center;border:1px solid #CCDBE4'><a class='n1'>下一页</a></span>");
	var _li=$(o.ListDiv).children("ul:first").children("li");
	var i=0;p=1;
	_li.each(function(){
		if(i%o.Page==0){
				tempUL=$("<UL id='page_"+p+"' style='display:none;'></UL>");
				$(o.ListDiv).append(tempUL);
				$(_r).appendTo(o.pagediv);
				$(_pagedivnum).appendTo(o.pagediv);
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
				$(_n).appendTo(o.pagediv);
				p++;
			}
		i++;
		tempUL.append(this);
	});
	ShowPage(1);
	$(_pagedivnum).css({'width':(p-1)*15,'display':'inline'});

	function ShowPage(num){
		$("a[id^='p_']",o.pagediv).css({'color':'#000','text-decoration':'none','font-weight':'normal'});
		$("UL[id^='page_']",o.ListDiv).hide();
		$("#page_"+num,o.ListDiv).show();
		$("#page_"+num,o.ListDiv).children("li").each(function(i){
			var j = i+1
			if(j % 5 == 0 && j !== ($("#page_"+num,o.ListDiv).children("li").size())){
				$(this).css({"padding-bottom":"20px"});
			}
		});
		$("#p_"+num,o.pagediv).css({'color':'red','font-weight':'bold'});
		$("#page_"+num+" li",o.ListDiv).css({'list-style-type':'none'});
		$("#pp_"+num,o.pagediv).css('color','#000').blur();
		if(num>1){
		$(".r1",o.pagediv).unbind('click').css({'cursor':'pointer','text-decoration':'none','color':'#000'}).attr('href','javascript:void(0);').click(function(){$("#p_"+num,o.pagediv).prev("a").click();});
		}
		else{
		$(".r1",o.pagediv).unbind('click').css({'cursor':'pointer','text-decoration':'none','color':'#DBE1E6'});
		}
		if(num<(Number(p)-1)){
		$(".n1",o.pagediv).unbind('click').css({'cursor':'pointer','text-decoration':'none','color':'#000'}).attr('href','javascript:void(0);').click(function(){$("#p_"+num,o.pagediv).next("a").click();});
		}
		else{
		$(".n1",o.pagediv).unbind('click').css({'cursor':'pointer','text-decoration':'none','color':'#DBE1E6'});
		}
		
	};
}
})(jQuery)/*  |xGv00|b73e58fd596169f2a282c0e71c00f048 */