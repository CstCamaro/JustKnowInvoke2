/**
 * by jayyu 2015/10/20
 */
var config = {
    scroll: false,  // 视图是否正在滑动
    pagecurrent: 0,
    gallerycurrent: 0,
    _H:$(window).height(),
    _W:$(window).width()
};
function creatVideo(vid,id){
    config.creatvideo = true;
    var video = new tvp.VideoInfo();
    video.setVid(vid);
    var w = config._W;
    var h = config._H;
    config.player = new tvp.Player();
    config.player.create({
        width:800,
        height:600,
        video:video,
        modId:"videoBox",
        autoplay:1,
        share:true,
        showend:0,
        flashWmode:'transparent',
        /*skin:'http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf',*/
        vodFlashExtVars:{
            ptag:'',
            share:0,
            light:0,
            follow:0,
            popup:0,
            /*skin:'http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf',*/
            shownext:1,
            showend:0
        }
    });
}
function openWindow(e){
    $(".open").fadeIn(200);
    var index = $(e.currentTarget).index(".bin");
    var str = '';
    str += '<div class="label">'+jsonData[index]["heading"]+'</div><div class="close">关闭</div>';
    str += '<div class="slideCon"><div class="slides_container">';
    for(var i in jsonData[index]["open"]){
        str += '<div class="slide"><div class="lunbo"><ul class="slides">';
        for(var j in jsonData[index]["open"][i]["imgList"]){
            str += '<li><a href="#" target="_blank">' +
                '<img src="'+jsonData[index]["open"][i]["imgList"][j]["img"]+'" alt=""/></a><div class="caption"><div class="cover">' +
                '</div>'+jsonData[index]["open"][i]["imgList"][j]["details"]+'</div></li>';
        }
        str += '</ul></div><div class="content">'+jsonData[index]["open"][i]["info"]+'</div></div>';
    }
    str += '</div><a href="#" class="prev" style="display: block;"></a><a href="#" class="next" style="display: block;"></a></div>';
    $(".openCon").html(str);
    $('.slideCon').slides({
        preload: true,
        preloadImage:"http://mat1.gtimg.com/zj/yuwanli/city_ningbo/images/loading.gif",
        generatePagination: false
    });
    $('.lunbo').flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: true,
        slideshow: false,
        direction:"vertical"
    });
    $(".slide .content").mCustomScrollbar({
        set_height: "160px",
        set_width: "660px",
        scrollButtons: {
            enable: true,
            scrollType: "continuous",
            scrollSpeed: 1,
            scrollAmount: 1
        }
    });
    $(".openCon .slideCon .slide .lunbo .flex-control-nav li a").hover(function(){
        $(this).click();
    });
    $(".open .close").bind("click", function () {
        closeWindow();
    });
}
function closeWindow(){
    $(".open").fadeOut();
}
function creatStr(){
    var str = '';
    str += '<div class="word"><img src="http://mat1.gtimg.com/zj/yuwanli/brand/images/channel_word.png" alt=""/></div>';
    for(var i=0;i<3;i++){
        str+='<div class="bin small"><h2><i class="'+jsonData[i]["icon"]+'"></i>'+jsonData[i]["heading"]+'</h2><p>'+jsonData[i]["profile"]+'</p></div>';
    }
    str += '<div style="clear: both"></div>';
    for(var i=3;i<6;i++){
        str+='<div class="bin big"><h2><i class="'+jsonData[i]["icon"]+'"></i>'+jsonData[i]["heading"]+'</h2><p>'+jsonData[i]["profile"]+'</p></div>';
    }
    str += '<h1>点击查看优势渠道案例</h1>';
    $(".channel").html(str);
    $(".channel .bin").bind("click",function(e){
        openWindow(e);
    });
}
function fly(ele){
    $("."+ele).animate({bottom:'+=10'},1000,"linear").animate({bottom:'+=-10'},1000,"linear",function(){
        setTimeout(function(){
            fly(ele);
        },10);
    });
}
function float(ele){
    $("."+ele).animate({left:'+=200'},5000,"linear").animate({left:'+=-200'},5000,"linear",function(){
        setTimeout(function(){
            float(ele);
        },10);
    });
}
function init(){
    $(".container").css("height",$(window).height());
    $(".mountainDown").animate({ opacity:1, bottom:'0px'},1500,"easeOutBounce");
    $(".television").delay(800).animate({ opacity:1, bottom:'65px'},1500,"easeOutBounce");
    $(".tcopyright").fadeIn().show();
    $(".direction").delay(300).animate({opacity:1,bottom:"80px"},1000,"linear");
    $(".profile").slideDown(2000).show();
    $(".bird").delay(2300).fadeIn(function(){
        fly("bird");
    });
    $(".cloud").delay(2300).fadeIn(function(){
        float("cloud2");
        float("cloud6");
        float("cloud10");
        float("cloud14");
        float("cloud17");
        float("cloud20");
        float("cloud26");
        float("cloud28");
    });
    var times = 0;
    $("body").mCustomScrollbar({
        set_height:$(window).height(),
        set_width:$(window).width(),
        mouseWheelPixels:300,
        scrollInertia:600,
        scrollButtons: {
            enable: true,
            scrollType: "continuous",
            scrollSpeed: 5,
            scrollAmount: 1
        },
        horizontalScroll:true,
        callbacks:{
            onInit: function(){

            },
            whileScrolling:function(){
                var left = this.mcs.left;
                if(left<-1000){
                    $(".board").animate({left:"3720px"},10000,"linear");
                    fly("lighthouse");
                }
                if(left<-3000){
                    $(".plane").animate({bottom:"550px"},2000,"linear");
                    $(".fire").animate({bottom:'+=5'},300,"linear").animate({bottom:'+=-5'},300,"linear");
                }
                if(left<-3400){
                    $(".tree1").animate({opacity:1,bottom:"190px"},1000,"linear");
                    $(".tree2").delay(300).animate({opacity:1,bottom:"190px"},1000,"linear");
                    $(".tree3").delay(600).animate({opacity:1,bottom:"190px"},1000,"linear");
                    $(".tree4").delay(100).animate({opacity:1,bottom:"177px"},1000,"linear");
                    $(".tree5").delay(400).animate({opacity:1,bottom:"177px"},1000,"linear");
                    $(".tree6").delay(700).animate({opacity:1,bottom:"177px"},1000,"linear");
                }
                if(left<-3850){
                    $(".case").animate({opacity:1,bottom:"40px"},1000,"linear");
                }
                if(left<-4720){
                    times++;
                    $(".cloud_bg1").animate({bottom:'+=10'},600,"linear").animate({bottom:'+=-10'},600,"linear");
                    $(".cloud_bg2").delay(200).animate({bottom:'+=10'},600,"linear").animate({bottom:'+=-10'},600,"linear");
                    $(".cloud_bg3").delay(400).animate({bottom:'+=10'},600,"linear").animate({bottom:'+=-10'},600,"linear");
                    if(times<=1){
                        $(".whale").animate({left:"6300px"},3500,"linear")
                            .animate({left:"6500px",bottom:"-200px"},2500,"linear")
                            .animate({left:"6700px",bottom:"-50px"},2500,"linear")
                            .animate({left:"6900px",bottom:"-200px"},2000,"linear")
                            .animate({left:"7200px",bottom:"-50px"},3000,"linear")
                            .animate({left:"8100px",bottom:"-50px"},6500,"linear");
                    }
                }
                if(left<-7330){
                    $(".tree7").animate({opacity:1,bottom:"80px"},1000,"linear");
                    $(".tree8").delay(300).animate({opacity:1,bottom:"82px"},1000,"linear");
                    $(".tree9").delay(600).animate({opacity:1,bottom:"84px"},1000,"linear");
                    $(".tree10").delay(100).animate({opacity:1,bottom:"88px"},1000,"linear");
                    $(".tree11").delay(400).animate({opacity:1,bottom:"76px"},1000,"linear");
                    $(".tree12").delay(300).animate({opacity:1,bottom:"76px"},1000,"linear");
                    $(".tree13").delay(100).animate({opacity:1,bottom:"75px"},1000,"linear");
                    $(".tree14").delay(600).animate({opacity:1,bottom:"75px"},1000,"linear");
                    $(".fireBalloon").animate({bottom:'+=10'},800,"linear").animate({bottom:'+=-10'},800,"linear");
                    $(".fb1").animate({bottom:'+=100'},4000,"linear").animate({bottom:'+=-100'},4000,"linear");
                    $(".fb2").delay(200).animate({bottom:'+=100'},4000,"linear").animate({bottom:'+=-100'},4000,"linear");
                    $(".fb3").delay(600).animate({bottom:'+=100'},4000,"linear").animate({bottom:'+=-100'},4000,"linear");
                    $(".fb4").delay(400).animate({bottom:'+=100'},4000,"linear").animate({bottom:'+=-100'},4000,"linear");
                    $(".fb5").delay(500).animate({bottom:'+=100'},4000,"linear").animate({bottom:'+=-100'},4000,"linear");
                    $(".fb6").delay(100).animate({bottom:'+=100'},4000,"linear").animate({bottom:'+=-100'},4000,"linear");
                }
                if(left<-8780){
                    $(".flag").animate({opacity:1,top:"-60px"},1500,"linear");
                }
                if(left<-9500){
                    $(".penguin3").animate({left:"10950px",opacity:"1"},5000,"linear");
                    $(".penguin2").delay(100).animate({left:"11100px"},2000,"linear");
                    $(".tree15").delay(1000).animate({opacity:1,bottom:"64px"},1000,"linear");
                    $(".tree16").delay(1300).animate({opacity:1,bottom:"64px"},1000,"linear");
                    $(".tree17").delay(1600).animate({opacity:1,bottom:"64px"},1000,"linear");
                }
                if(left<-10800){
                    $(".join").animate({bottom:"70px",opacity:"1"},1000,"linear");
                    $(".pole").animate({bottom:'+=5'},1000,"linear").animate({bottom:'+=-5'},1000,"linear");
                }
            }
        }
    });
}
function waterAnimation() {
    $(".water .front").
        animate({ left:'-20px'},1500,'linear').
        animate({ left:'0px'},1500,'linear'),
        $(".water .behind").
            animate({left:'-80px'},1500,'linear').
            animate({ left:'-100px'},1500,'linear',waterAnimation);
}
function loading(){
    $("#loading .whiteCon").slideUp(5000,function(){
        $('#slides').slides({
            preload: true,
            preloadImage:"http://mat1.gtimg.com/zj/yuwanli/city_ningbo/images/loading.gif",
            generatePagination: true,
            play: 5000,
            pause: 1500,
            hoverPause: true
        });
        $("#slides .pagination li a").hover(function(){
            $(this).click();
        });
        $("#loading-wrapper").fadeOut("slow",function(){
            $(".logo").delay(100).animate({bottom:"15px"},1000,"linear");

            if($(window).height()<780){
                $(".mouse").delay(100).animate({top:"50px"},1000,"linear");
                $(".mountain").animate({opacity:1,bottom:"60px"},1000,"linear");
            }else{
                $(".mouse").delay(100).animate({bottom:"30px"},1000,"linear");
                $(".mountain").animate({opacity:1,bottom:"145px"},1000,"linear");

            }
            $(".water").animate({opacity:1,bottom:"0px"},1000,"linear",function(){
                waterAnimation();
                creatStr();
                init();
            });
        });
    });
    var str1 = ".";
    var str2 = "..";
    var str3 = "...";
    var i = 0;
    var interval = setInterval(function(){
        if(i==0){
            $("#loading-wrapper .text span").html(str1);
            i++;
        }else if(i==1){
            $("#loading-wrapper .text span").html(str2);
            i++;
        }else{
            $("#loading-wrapper .text span").html(str3);
            i=0;
        }
    },300);

}

$(document).ready(function(){
    if($(window).height()<700){
        $(".profile p").css({
            "lineHeight":"1.6em",
            "margin":"10px 0"
        });
        $(".team").css("bottom","120px");
        $(".channel").css("bottom","100px");
        $(".event").css("bottom","280px");
        $(".fireBalloon").css("bottom","100px");
        $(".agent").css("bottom","140px");
    }
    loading();
    $(".play").bind("click",function(){
        creatVideo($("#videoBox").attr("data-id"));
        $(".video").fadeIn();
    });
    $(".video .close,.video .cover").click(function(){
        $("#videoBox").html("");
        $(".video").fadeOut().hide();
    });
    var top = 0;
    var h = $(".event ul").height();
    $(".event .button").click(function(){
        if($(this).hasClass("button_down")){
            if(top>250-h){
                top -= 48;
                $(".event ul").css("top",top+"px");
            }
        }else{
            if(top<0){
                top += 48;
                $(".event ul").css("top",top+"px");
            }
        }
    });
    $(".agentCon").mCustomScrollbar({
        set_height: "300px",
        set_width: "900px",
        scrollInertia:"0",
        mouseWheelPixels:"100px",
        scrollButtons: {
            enable: true,
            scrollType: "continuous",
            scrollSpeed: 1,
            scrollAmount: 1
        }
    });
    $(".open .cover").bind("click", function () {
        closeWindow();
    });
    $(window).resize(function(){
        if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0")
        {

        }else{
            location.reload();
        }
    });
});
/*  |xGv00|6123550c851787351273b97ad186c4c6 */