(function($){
$.fn.dayuwscroll = function(param){
	var o = $.extend({
		parent_ele:'#t1',
		pre_btn:'#left',
		next_btn:'#right',
		path: 'left',
		auto:true,
		time:5000,
		num:1,
		waite_time:1000
	},param);

	var target_ele = $(this).selector;
	var $left = $(o.pre_btn);
	var $right = $(o.next_btn);
	var $con = $(target_ele).find('li');
	var curr = 0;
	var len = $con.length;
	var out_width = $con.outerWidth(true);
	var out_height = $con.outerHeight(true);
	var clear_time = null;
	var wait_time = null;
	var first_click = 0;
	$con.clone().appendTo(target_ele);
	var len_all = $con.length;

	function init(){
		$(o.parent_ele).css({'width':out_width * o.num+'px','height':out_height+'px','overflow':'hidden'});
		$(target_ele).css({'width':out_width * len *2+'px','height':out_height+'px'});
		if(o.auto){
			auto_play();
		}
	}

	function auto_play(){
		switch(o.path){
			case 'left':
				clear_time = window.setInterval(function(){left__click();},o.time);
				break;
			case 'right':
				clear_time = window.setInterval(function(){right_click();},o.time);
				break;
			default :
				clear_time = window.setInterval(function(){left__click();},o.time);
				break;
		}
	}

	function goto_curr(page){

		var dir = page > curr ? 1 : -1;
		//var scroll_width = o.num * out_width * dir;
		var scroll_width = out_width * dir;

		$(o.parent_ele).animate({scrollLeft:'+=' + scroll_width},500,function(){

			if(page == 0){
				$(o.parent_ele).scrollLeft(len * out_width);
				page = len;
			}else if (page > len)
			{
				$(o.parent_ele).scrollLeft(out_width);
				page = 1;
			}
			curr = page;
		});
	}

	function left__click(){
	
		window.clearInterval(clear_time);
		window.clearTimeout(wait_time);

		goto_curr(curr + 1 );
		
		if(o.auto){
			wait_time = setTimeout(function(){auto_play()},o.waite_time);
		}
	}

	$left.bind('click',left__click)

	/*$left.click(function(){

		window.clearInterval(clear_time);
		window.clearTimeout(wait_time);

		goto_curr(curr + 1 );
		
		if(o.auto){
			wait_time = setTimeout(function(){auto_play()},o.waite_time);
		}

	});*/

	function right_click(){
		window.clearInterval(clear_time);
		window.clearTimeout(wait_time);

		if(first_click == 0 && curr == 0){
			$(o.parent_ele).scrollLeft(len * out_width);
			curr = len;
			first_click = 1;
		}
		goto_curr( curr - 1 );

		if(o.auto){
			wait_time = setTimeout(function(){auto_play()},o.waite_time);
		}
	}

	$right.bind('click',right_click);

	/*$right.click(function(){

		window.clearInterval(clear_time);
		window.clearTimeout(wait_time);

		if(first_click == 0 && curr == 0){
			$(o.parent_ele).scrollLeft(len * out_width);
			curr = len;
			first_click = 1;
		}
		goto_curr( curr - 1 );

		if(o.auto){
			wait_time = setTimeout(function(){auto_play()},5000);
		}

	});*/

	return init();
}
})(jQuery)/*  |xGv00|9c3ed8e9ea8040dc21148d6a1973ca4e */