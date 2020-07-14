

$(".cal-cir").hover(function () {
    $(".cal-cir").removeClass("cal-cir-hover").find('.cir-dia').hide();
    $(this).addClass("cal-cir-hover").find('.cir-dia').show();
},function () {
    $(".cal-cir").removeClass("cal-cir-hover").find('.cir-dia').hide();
});
var initSlider=function () {
        var sliderIndex = 0, timer;
        var sliderPic=$('.slider-pics .slider-pic');
        var sliderPage=$('.slider-pagination');
        var picNum=sliderPic.size();
        for(var i=0;i<picNum;i++){
            if(i==0){
                sliderPage.append("<a class='slider-pagination-on' href='javascript:;'></a>");
            }else{
                sliderPage.append("<a href='javascript:;'></a>");
            }
        }
        var slider = function(index){
                sliderPic.hide().eq(index).show();
                sliderPage.children('a').removeClass('slider-pagination-on').eq(index).addClass('slider-pagination-on');
            },
            nextClick = function(){
                if(sliderIndex >= picNum-1){
                    sliderIndex = 0;
                }else{
                    sliderIndex++;
                }
                slider(sliderIndex);
            },
            prevClick = function(){
                if(sliderIndex <= 0){
                    sliderIndex = picNum-1;
                }else{
                    sliderIndex--;
                }
                slider(sliderIndex);
            };

        sliderPage.children('a').each(function(index){
            $(this).mouseover(function(){
                sliderIndex = index;
                slider(sliderIndex);
            });
        });

        $('.bd-left .slider').hover(function(){
            clearInterval(timer);
        },function(){
            timer = setInterval(nextClick, 6000);
        });
        timer = setInterval(nextClick, 6000);
}

/*hot*/
;(function () {
    var hotstyle=['blue','red','zs','qs','hs'];
    var d=['top','bottom','middle'];
    $('.ht .bk-bd .bds a').each(function (index) {
        if(index>4){
            $(this).addClass(hotstyle[parseInt(Math.random()*5)]);
        }else{
            $(this).addClass(hotstyle[index]);
        }
        if((index+1)%2==0){
            $(this).css("vertical-align",d[parseInt(Math.random()*3)]);
        }else{
            $(this).css("vertical-align","baseline");
        }
    });
    $('.ht .bk-bd .bds').css("opacity",1);
})();



(function() {
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

/*  |xGv00|b6ed3ac5b338391aaa59802e2907e8b8 */