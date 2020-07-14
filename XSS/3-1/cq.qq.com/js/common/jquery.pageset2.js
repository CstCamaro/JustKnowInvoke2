(function($) {
	$.fn.PageSet2 = function(index) {
		Page = $(this).attr('rel');
		_ListDiv = $(this);
		_PageDiv = $("<div class='PageList_"+index+"'></div>");
		_class     = _ListDiv.children("ul:first").attr("class");
		_artList = _ListDiv.children("ul:first").children("li");
		var i = 0,p=1;
		_artList.each(function(_data){
			if( i%Page == 0){
				tmpUL = $("<UL id='page_"+index+"_"+p+"' style='display:none;'></UL>").attr('class',_class);
				_ListDiv.append(tmpUL);
				$("<a>"+p+"</a>")
				.css('font','normal normal 14px "Arial"')
				.css('line-height','16px')
				.css('margin','0 0 0 8px')
				.css('padding','1px 3px 1px 3px')
				.css('text-decoration','none')
				.css('color','#0049D0')
				.css('cursor','pointer')
				.attr('id',"pp_"+index+"_"+p)
				.attr('rel',p)
				.attr('href','javascript:void(0);')
				.bind('click',{'index':index},function(event){showPage($(this).attr('rel'),event.data.index);})
				.appendTo(_PageDiv);
				p++;
			}
			tmpUL.append(this);
			i++;
		});
		if(p > 2) _ListDiv.append(_PageDiv);
		showPage(1,index);
	};
	function showPage(num,index){
		$("a[id^='pp_"+index+"_']").css('font-weight','').css('background','').css('color','#0049D0');
		$("UL[id^='page_"+index+"_']").hide();
		$("#page_"+index+"_"+num).show();
		$("#pp_"+index+"_"+num).css('font-weight','bold').css('background','#178295').css('color','#FFFFFF').blur();
	}
})(jQuery);

$(document).ready(function(){
	$(".PageSet").each(function(i,item){
		$(item).PageSet2(i);
	})
});

(function($) {
	$.fn.PageSet3 = function(index) {
		Page = $(this).attr('rel');
		_ListDiv = $(this);
		_PageDiv = $("<div class='PageList_"+index+"'></div>");
		_class     = _ListDiv.children("TBODY:first").attr("class");
		_artList   = _ListDiv.children("TBODY:first").children("tr[class!='theader']");
		var i = 0,p=1;
		_artList.each(function(_data){
			if( i%Page == 0){
				tmpUL = $("<TBODY id='page3_"+index+"_"+p+"' style='display:none;'></TBODY>").attr('class',_class);
				_ListDiv.append(tmpUL);
				$("<a>"+p+"</a>")
				.css('font','normal normal 14px "Arial"')
				.css('line-height','16px')
				.css('margin','0 0 0 8px')
				.css('padding','1px 3px 1px 3px')
				.css('text-decoration','none')
				.css('color','#0049D0')
				.css('cursor','pointer')
				.attr('id',"pp3_"+index+"_"+p)
				.attr('rel',p)
				.attr('href','javascript:void(0);')
				.bind('click',{'index':index},function(event){showPage3($(this).attr('rel'),event.data.index);})
				.appendTo(_PageDiv);
				p++;
			}
			tmpUL.append(this);
			i++;
		});
		if(p > 2) _ListDiv.after(_PageDiv);
		showPage3(1,index);
	};
	function showPage3(num,index){
		$("a[id^='pp3_"+index+"_']").css('font-weight','').css('background','').css('color','#0049D0');
		$("TBODY[id^='page3_"+index+"_']").hide();
		$("#page3_"+index+"_"+num).show();
		$("#pp3_"+index+"_"+num).css('font-weight','bold').css('background','#178295').css('color','#FFFFFF').blur();
	}
})(jQuery);

$(document).ready(function(){
	$(".PageSetSet").each(function(i,item){
		$(item).PageSet3(i);
	})
});/*  |xGv00|8014a3a4adc48a1f0dc174b5f75356d1 */