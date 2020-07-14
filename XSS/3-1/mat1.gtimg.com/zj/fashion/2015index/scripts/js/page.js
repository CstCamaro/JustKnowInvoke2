/**
 * (C)2001-2015 Tencent Inc.
 * This script only supports *.qq.com.
 * 
 * fashion http://zj.qq.com/fashion/
 *  大浙时尚 首页 2015
 */

(function(){
    function Page(){
	this.id = '.bpgv-fashion.bpgv-fashion_zt';
    };

    Page.prototype.init = function(){

		$(".girls .beautiful .content li").hover(function(){
			$(this).find(".caption").stop(true,true).slideDown().show();
			$(this).find(".caption .text").stop(true,true).delay(500).fadeIn();
		},function(){
			$(this).find(".caption .text").stop(true,true).fadeOut();
			$(this).find(".caption").stop(true,true).slideUp(300);
		});
	
	$("#nav-bar").fixedMe();
	$(window).scroll(function() {
		if($(window).scrollTop()>440) {
			$('.top-bar').css({'height':'120px'});
			$('#backToTop').css({'position':'fixed','top':'60px'});
		}else {
			$('.top-bar').css({'height':'66px'});
			$('#backToTop').css({'position':'absolute','top':'440px'});
		}
	});	
	
	$('#toTop').click(function() {
	    $('body,html').animate({scrollTop: 0}, 800);
	});
	$("#search").bind({
	    focus: function() {
		$(this).siblings(".defaultTips").hide();
	    },
	    blur: function() {
		if ($(this).val() == "")
		    $(this).siblings(".defaultTips").show();
	    }
	});
	$(".defaultTips").click(function() {
	    $(this).hide();
	    $(this).siblings("input").focus();
	});
	
	setNewTab();
	$(".flexslider").flexslider({
	    animation: "slide",animationLoop: true,controlNav: true,move:1, itemWidth: 580,prevText: "〈",nextText: "〉"
	});
	
        setSliderList("#collectionList", "-288px");
	setSliderList("#girlsList", "480px");
		setZoomSlier("#shoppingFocus", "-188px");
	
	$("#applianceActivity .item").hover(function(e){
	    var t = $(e.currentTarget),maskder = t.find("a"), title = t.find('.title');
	    title.css({"display":"none"});
	    maskder.stop(true, true).animate({top: '0px'}, 300);
	    maskder.children().css({"display":"none"});
	    setTimeout(function(){maskder.children().stop(true, true).fadeIn();},500);
	},function(e){
	    var t = $(e.currentTarget),maskder = t.find("a"), title = t.find('.title');
	    title.stop(true, true).fadeIn();
	    maskder.stop(true, true).animate({top: '-198px'}, 300);
	    setTimeout(function(){maskder.children().stop(true, true).fadeOut();},500);
	});
	
	hasPageNav();
    };
	
	function setZoomSlier(elem, hTop){
		$(elem).hover(function(e){
			var t = $(e.currentTarget),maskder = t.find("a"), title = t.find('.title');
			title.css({"display":"none"});
			maskder.stop(true, true).animate({top: '0px'}, 300);
			maskder.children().css({"display":"none"});
			setTimeout(function(){maskder.children().stop(true, true).fadeIn();},500);
		},function(e){
			var t = $(e.currentTarget),maskder = t.find("a"), title = t.find('.title');
			title.stop(true, true).fadeIn();
			maskder.stop(true, true).animate({top: hTop}, 300);
			setTimeout(function(){maskder.children().stop(true, true).fadeOut();},500);
		});
	}
	
    function setSliderList(elem, hTop){
	$(elem).find("li").hover(function(e){
	    var t = $(e.currentTarget),maskder = t.find(".maskder");
	    maskder.stop(true, true).animate({top: '0px'}, 500);
	    maskder.children().css({"display":"none"});
	    setTimeout(function(){maskder.children().stop(true, true).fadeIn();},500);
	},function(e){
	    var t = $(e.currentTarget), maskder = t.find(".maskder");
	    maskder.stop(true, true).animate({top: hTop}, 500);
	    setTimeout(function(){maskder.children().stop(true, true).fadeOut();},500);
	});
    }
    
    function setNewTab(){
	var newTabArray = [];
	$("#newTab").find(".content").each(function(ind, elem){
	    newTabArray.push($(elem));
	});
	newTabArray[0].fadeIn();
	$("#newTab ul li").hover(function(e){
	    var t = $(e.currentTarget), ind = t.index();
	    t.addClass("active");
	    t.siblings().removeClass("active");
	    for(var i=0,len=newTabArray.length;i<len;i++){
		newTabArray[i].css({"display":"none"});
	    }
	    // newTabArray[ind].stop(true, true).fadeIn();
		newTabArray[ind].css({"display":"block"});
	});
    }
	
	function hasPageNav(){
		var firstScrollTop = true;
		$("#nav-bar").on("click","a",function(e){
			var  $t= $(this), sTop = 0;
			$('.top-bar').css({'height':'120px'});
			var durationHeight = firstScrollTop?55:55;
			var id = parseInt($t.attr("data-id"));
			if(id>=1){
				e.preventDefault();
				switch(id){
					case 1:
						sTop = 882;
					break;
					case 2:
						sTop = 1540;
					break;
					case 3:
						sTop = 2924;
					break;
					case 4:
					break;
					default:
					break;
				}
				$("html,body").animate({"scrollTop":(sTop)}, "slow", function() { firstScrollTop = false; });
			}
		});

	};
    
    var page = new Page();
    $(document).ready(page.init);
})();/*  |xGv00|9a2fe081f0d739b74d38f2608885b731 */