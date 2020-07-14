$(".nav-select").hover(function () {
        $(this).find(".select-bx").finish();
        $(this).find(".select-bx").fadeIn(200).animate({top:"80px"},200).animate({top:"53px"},"fast",function () {selectstate=true});
    },function () {
        $(this).find(".select-bx").finish();
        $(this).find(".select-bx").fadeOut(200).css("top","0");
    }
);
/*返回顶部*/
;(function(){
    var $backToTopEle = $('<div class="backToTop"></div>').appendTo("body").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
    }), $backToTopFun = function() {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 0)? $backToTopEle.show(): $backToTopEle.hide();
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 166);
        }
    };
    $(window).bind("scroll", $backToTopFun);
    $(function() { $backToTopFun(); });
})();


/*顶部导航固定*/
(function(){
    var s = $(document).scrollTop();
    var offsetH = $(".monNav").offset().top;
    $(window).scroll(function(){
        s = $(document).scrollTop();
        s > offsetH ? $(".monNav").addClass("fixed") : $(".monNav").removeClass("fixed");
    });
    $(function(){
        var s = $(document).scrollTop();
        var offsetH = $(".monNav").offset().top;
        s > offsetH ? $(".monNav").addClass("fixed") : $(".monNav").removeClass("fixed");
    })
})();/*  |xGv00|240c1c990b7cc159baca0956e1cea0b8 */