

function autoAddEllipsis(pStr, pLen) {

    var _ret = cutString(pStr, pLen);
    var _cutFlag = _ret.cutflag;
    var _cutStringn = _ret.cutstring;

    if ("1" == _cutFlag) {
        return _cutStringn + "...";
    } else {
        return _cutStringn;
    }
}
function cutString(pStr, pLen) {

    var _strLen = pStr.length;

    var _tmpCode;

    var _cutString;

    var _cutFlag = "1";

    var _lenCount = 0;

    var _ret = false;

    if (_strLen <= pLen/2) {
        _cutString = pStr;
        _ret = true;
    }

    if (!_ret) {
        for (var i = 0; i < _strLen ; i++ ) {
            if (isFull(pStr.charAt(i))) {
                _lenCount += 2;
            } else {
                _lenCount += 1;
            }

            if (_lenCount > pLen) {
                _cutString = pStr.substring(0, i);
                _ret = true;
                break;
            } else if (_lenCount == pLen) {
                _cutString = pStr.substring(0, i + 1);
                _ret = true;
                break;
            }
        }
    }

    if (!_ret) {
        _cutString = pStr;
        _ret = true;
    }

    if (_cutString.length == _strLen) {
        _cutFlag = "0";
    }

    return {"cutstring":_cutString, "cutflag":_cutFlag};
}
function isFull (pChar) {
    for (var i = 0; i < pChar.strLen ; i++ ) {
        if ((pChar.charCodeAt(i) > 128)) {
            return true;
        } else {
            return false;
        }
    }
}


$(function(){

    $("#slides").slides({
        preload: true,
        preloadImage:"http://mat1.gtimg.com/zj/yuwanli/city_ningbo/images/loading.gif",
        generatePagination: true,
        currentClass: 'current',
        effect: 'slide',
        play: 5000,
        pause: 1500,
        hoverPause: true,
        slidesLoaded:function(){
            $($("#slides .slide")[0]).addClass("current");
        },
        animationComplete:function(e){
            $("#slides .slide").removeClass("current");
            $($("#slides .slide")[e-1]).toggleClass("current");
        }
    });

    $("#slideImg").slides({
        preload: true,
        preloadImage:"http://mat1.gtimg.com/zj/yuwanli/city_ningbo/images/loading.gif",
        generatePagination: true,
        currentClass: 'current',
        effect: 'slide',
        play: 5000,
        pause: 1500,
        hoverPause: true
    });
    $(".section0 .menu li").hover(function(){
        $(this).find("img").stop(true,true).slideToggle()
    })
    $(".slides .pagination li a").hover(function () {
        $(this).click();
    });
    $(".banner ul li.active").hover(function(){
        $(".slide-box").stop(true,true).slideDown().show();
    },function(){
        $(".slide-box").stop(true,true).slideUp();
    });

    $(document).on("click",".btn-submit",function(){
        //if(!$("#protocol")[0].checked){
        //    var html = $(".protocolText").html()
        //    alert("请勾选"+html)
        //}else{
            var id = $(this).attr("data-id");
            reg_new(id);
        //}

    })
    $(window).scroll(function(){
        if($(window).scrollTop()>=150){
            $(".banner").addClass("fixed");
            $(".toTop").fadeIn();
        }else{
            $(".banner").removeClass("fixed");
            $(".toTop").fadeOut();
        }
    });
    $(".toTop").click(function(){
        $("html,body").animate({"scrollTop": "0px"}, "slow");
    });

    $(".section0 .formCon .title span").on("click",function(){
        $(".section0 .formCon .title span").removeClass("active")
        $(this).addClass("active")
        if($(this).index()==0){
            $(".section0 .formCon form").animate({"left":"0"},1000)
            $(".section0 .formCon .imgCon").animate({"left":"100%"},1000)
        }else{
            $(".section0 .formCon form").animate({"left":"-100%"},1000)
            $(".section0 .formCon .imgCon").animate({"left":"0"},1000)
        }
    })
    $.each($(".limit"), function (e) {
        $(this).html(autoAddEllipsis($(this).html(),parseInt($(this).attr("data-limit"))));
    });

    $(".active-box").each(function(e){

        var length = Math.ceil($(this).find(".item").length/12);
        $(this).css({
            "top":-e*48+"px",
            "width":length*110+"px"
        });
        if(length == 1){
            $(this).find(".title a").css("display","none");
        }


    });

});/*  |xGv00|5b71674716228f321df2a4cfebc58430 */