(function($){
$.fn.HoverShowTitle = function(param){
	var param = $.extend({
		isAnimate: false,
		target: '.hs',
		isHasTitleBar:true,
		titleBar: {
			titleBar_height:40,
			titleBar_bgColor:'#000',
			titleBar_alpha:0.5
		},
		titleFont: {
			titleFont_size:12,
			titleFont_weight:'bold',
			titleFont_family:'Verdana',
			titleFont_color:'#fff'
		}
	},param);
	var titleBar_bak = {
		titleBar_height: 40,
		titleBar_bgcolor: '#000',
		titleBar_alpha: 0.5
	}
	var titleFont_bak = {
		titleFont_size: 12,
		titleFont_weight: 'bold',
		titleFont_family:'Verdana',
		titleFont_color:'#fff'
	}
	for(var key in titleBar_bak){
		if(param.titleBar[key] == undefined){
			param.titleBar[key] = titleBar_bak[key];
		}
	}
	for(var key in titleFont_bak){
		if(param.titleFont[key] == undefined){
			param.titleFont[key] = titleFont_bak[key];
		}
	}
	var hstthis = "";
	var hstbs = "";

	if(param.isAnimate){
		$(this).hover(function(event){
			hstthis = this;
			hstbs = $(hstthis).selector;
			if(!$(this).children().is("div")){
				hst_create();
			}else{
				$("div",this).slideDown(100);
			}

		},function(){
			$("div",this).slideUp(100);
		});
	}else{
		$(param.target).each(function(){
			hstthis = this;
			hst_create();
		})
	}


	function hst_create(){
		var hst_imgaewidth = $("img",hstthis ).width();
		var hst_imgaeheight = $("img",hstthis ).height();
		var hst_title_con =  $("img",hstthis).attr('alt');
		$(hstthis).css({
			width: hst_imgaewidth+'px',
			height: hst_imgaeheight+'px',
			position:"relative",
			overflow:"hidden"
		});
		$(hstthis).append("<div class='hst_titleBar'></div>");
		$(".hst_titleBar",hstthis).css({
			height: param.titleBar.titleBar_height+"px",
			width: "100%",
			position: "absolute",
			bottom: 0,
			left: 0,
			background: param.titleBar.titleBar_bgColor,
			opacity:  param.titleBar.titleBar_alpha
		});
		$(hstthis).append("<div class='hst_titleCon'><h2 style='height:"+ param.titleBar.titleBar_height+"px;font-size:"+param.titleFont.titleFont_size+"px;font-weight:"+param.titleFont.titleFont_weight+";line-height:"+ param.titleBar.titleBar_height+"px;text-align:center;color:"+param.titleFont.titleFont_color+"'>"+hst_title_con+"</h2></div>");
		$(".hst_titleCon",hstthis).css({
			height: param.titleBar.titleBar_height+"px",
			width: "100%",
			position: "absolute",
			bottom: 0,
			left: 0,
			'font-family': param.titleFont.titleFont_family
		});
	};
}
})(jQuery)/*  |xGv00|11d9e886ce17457f7f0d4a29757a65c0 */