(function($) {
	$.fn.PageSet = function() {
		Page = $(this).attr('rel');
		_ListDiv = $(this);
		_PageDiv = $("<div id=PageList></div>")
		_artList = _ListDiv.children("ul:first").children("li");
		var i = 0,p=1;
		_artList.each(function(_data){
			if( i%Page == 0){
				tmpUL = $("<UL id='page_"+p+"' style='display:none;'></UL>");
				_ListDiv.append(tmpUL);
				$("<a>"+p+"</a>")
				.css('font','normal normal 14px "Arial"')
				.css('line-height','16px')
				.css('margin','0 0 0 8px')
				.css('padding','1px 3px 1px 3px')
				.css('text-decoration','none')
				.css('color','#0049D0')
				.css('cursor','pointer')
				.attr('id',"pp_"+p)
				.attr('rel',p)
				.attr('href','javascript:void(0);')
				.bind('click',function(){showPage($(this).attr('rel'));})
				.appendTo(_PageDiv);
				p++;
			}
			tmpUL.append(this);
			i++;
		});
		if(p > 2) _ListDiv.append(_PageDiv);
		showPage(1);
	};
	function showPage(num){
		$("a[id^='pp_']").css('font-weight','').css('background','').css('color','#0049D0');
		$("UL[id^='page_']").hide();
		$("#page_"+num).show();
		$("#pp_"+num).css('font-weight','bold').css('background','#0049D0').css('color','#FFFFFF').blur();
	}
})(jQuery);

$(document).ready(function(){
	$("#PageSet").PageSet();
});/*  |xGv00|70a53c9f49544f3182fb8521af6be51f */