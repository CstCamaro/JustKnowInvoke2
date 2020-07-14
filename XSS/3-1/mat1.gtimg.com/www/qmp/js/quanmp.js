$(function(){
    window.icedzhangshare = function(data){
        if(data.code){
            $("#imgewm").html("<img src='" + data.url + "'>");
        }else{
            $("#imgewm,#phone").hide();
        }
    }
    if(mobileUrl && mobileUrl != "null" && mobileUrl != "NULL"){
        $.getScript('http://news.open.qq.com/qrcode/gen.php?url='+ mobileUrl +'&callback=window.icedzhangshare');
    }else{
        $("#imgewm,#phone").hide();
    };
    //  点击跳转
    var _baseUrl = 'http://news.qq.com/mediaplus/';
    var _navHtml =  '<a href="'+_baseUrl+'home.htm" target="_blank"><span>\u9996\u9875</span></a>'+
        '<a href="'+_baseUrl+'djby.htm" target="_blank"><span>\u72ec\u5bb6\u7f16\u8bd1</span></a>'+
        '<a href="'+_baseUrl+'quanmp.htm" target="_blank"><span>\u5168\u5a92\u89c2</span></a>'+
        '<a href="'+_baseUrl+'msj.htm" target="_blank"><span>\u5a92\u89c6\u754c</span></a>'+
        '<a href="http://news.qq.com" target="_blank"><span>\u817e\u8baf\u65b0\u95fb</span></a>';
    $("#nav").find("div").html(_navHtml);
    $(window).scroll(function(){
        // 分享功能
        if ($(window).scrollTop() < 312) {
            $(".share_list").css({
                "position": "absolute",
                "top": 144
            });
        }
        if ($(window).scrollTop() >= 312) {
            $(".share_list").css({
                "position": "fixed",
                "top": 20
            });
        }
        // 置顶功能
        if ($(window).scrollTop() > 220) {
            $(".go_top_btn").fadeIn();
        } else {
            $(".go_top_btn").fadeOut();
        }
    })
    $(".go_top_btn").click(function () {
        $('html, body').animate({
            scrollTop: 0
        },"slow");
    });
})/*  |xGv00|4460be28853d02a80974086dd898a1c7 */