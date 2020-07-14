
/*============================auto.js=================================*/
typeof $ === 'undefined' && typeof jQuery !== 'undefined' && ($=jQuery);


/**
 * ip定向保存空间
 **/
var citys = {};










//车型大全-热车
var hot_car_num = 0;





//焦点图
/**
 * @version 0.3 添加左右按钮, 修改按钮bug
 * @author  jianminlu
 * @update  2014-02-13 11:46
 */
(function($){
	/**
	 * @name    qqfocus     页卡函数
	 * @param   {Object}    初始值
	 */
	$.fn.qqfocus = function(options){
		var focuser = {};
		var opts = $.extend({}, {
			event: 'mouseover',  //mouseover click
			conbox: '.focus_con',//内容容器
			condot: '.focus_dot',//切换容器
			conitem: 'li',       //内容标签class
			dotitem: 'li',       //切换器标签 默认为li
			current: 'current',  //切换样式
			effect: 'fade',      //切换效果 scrollx|scrolly|fade|none
			speed: 1000,         //动画速度
			space: 3000,         //时间间隔
			auto: true,          //自动滚动
			prev: ".prevBtn",
			next: ".nextBtn"
		}, options);
		focuser.timer = "";
		focuser.index = 0;
		focuser.last_index = 0;
		focuser.conbox = $(this).find(opts.conbox);
		focuser.conitem = focuser.conbox.find(opts.conitem);
		focuser.condot = $(this).find(opts.condot);
		focuser.dotitem = focuser.condot.find(opts.dotitem);
		focuser.prev = $(this).find(opts.prev);
		focuser.next = $(this).find(opts.next);

		focuser.fn = {
			slide: function () {
				if (focuser.index >= focuser.conitem.length){
					focuser.index = 0;
				}
				focuser.dotitem.removeClass(opts.current).eq(focuser.index).addClass(opts.current);
				switch (opts.effect) {
					case 'scrollx':
						focuser.conitem.css({"float":"left"});
						focuser.conbox.css({"position": "relative"});
						focuser.conbox.width(focuser.conitem.length * focuser.conitem.width());
						focuser.conbox.stop().animate({left:-focuser.conitem.width() * Math.abs(focuser.index) + 'px'}, opts.speed);
						break;
					case 'scrolly':
						focuser.conitem.css({display:'block'});
						focuser.conbox.css({"position": "relative"});
						focuser.conbox.stop().animate({top:-focuser.conitem.height() * Math.abs(focuser.index) + 'px'}, opts.speed);
                        break;
					case 'fade':
						if(focuser.conbox.css('opacity') == 1){
							focuser.conbox.css('opacity', 0);
						}
						focuser.conbox.animate({'opacity':1}, opts.speed / 2);
						focuser.conitem.eq(focuser.last_index).stop().css('display', "none").end().eq(focuser.index).css('display', "block").stop();
						break;
					case 'none':
						focuser.conitem.hide().eq(focuser.index).show();
						break;
				}
				focuser.last_index = focuser.index;
				focuser.index ++;
			},
			next: function(){
				focuser.fn.stop();
				focuser.fn.slide();
				focuser.fn.play();
			},
			prev: function () {
				focuser.index = focuser.index < 2 ? (focuser.conitem.length - focuser.index) : focuser.index - 2;
				focuser.fn.stop();
				focuser.fn.slide();
				focuser.fn.play();
			},
			stop: function(){
				clearInterval(focuser.timer);
			},
			play: function(){
				if (opts.auto) {
					focuser.timer = setInterval(focuser.fn.slide, opts.space);
				}
			},
			init: function(){
				if (opts.effect == 'fade') {
					focuser.conitem.eq(focuser.index).css({'display':"block"}).siblings().css({'display':"none"});
				}
				if (opts.auto){
					focuser.fn.play();
				}else{
					focuser.fn.stop();
				}
				focuser.dotitem.bind(opts.event, function() {
					focuser.index = $(this).index();
					focuser.fn.stop();
					focuser.fn.slide();
					focuser.fn.play();
				});
				focuser.conbox.hover(focuser.fn.stop, focuser.fn.play);
				focuser.fn.slide();
				focuser.prev.bind("click", focuser.fn.prev);
				focuser.next.bind("click", focuser.fn.next);
			}
		};
		focuser.fn.init();
	}
})(jQuery);

// 焦点图
$("#focus_A").qqfocus({effect:'scrollx', speed:500, space:8000});

// 热门车型推荐
$(".hotCar").qqfocus({conbox:'.hotCarCon',condot:'.hotCarTab',conitem:'ul',effect:'scrollx', speed:500, space:8000, auto:false, prev: '.prevBtn', next: '.nextBtn'});

// 诚信经销商
$("#jxs").qqfocus({conbox:'.focus_con2',condot:'.focus_dot2',conitem:'ul',effect:'scrollx', speed:500, space:8000, auto:false, prev: '.prevBtn2', next: '.nextBtn2'});

//每日头条右侧滚动
	function AutoAcrollInit(obj){
		var liNum = $(obj).find("li").length;
		if(liNum <= 3){
			$(obj).css({
				width:155 * liNum + "px"
			});
		}else{
			$(obj).css({
				width:155 * 3 + "px"
			});
			$(obj).find("ul").css({
				width:155 * liNum + "px"
			})
			setInterval(function(){
				$(".toutiaoAD").find("ul").animate({
					marginLeft:"-155px"
				},500,function(){
					$(this).css({
						marginLeft:"0"
					}).find("li:first").appendTo(this);
				});
			},3000);
		}
	}
	AutoAcrollInit(".toutiaoAD");

/*  |xGv00|50b042157e9f6975b5d389ad4a3f51f0 */