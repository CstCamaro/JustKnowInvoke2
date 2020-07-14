//*分享*/
(function () {
    function itemShare(selector) {
        $(selector).on('mouseenter',".item-share",function () {
            if($(this).find(".share-bx").length){
                $(this).find(".share-bx").show();
                return;
            }
            $(this).css("position","relative").html("<div class='share-bx clearfix'><a class='sina' title='新浪微博' href='javascript:;'></a><a class='qzone' title='QQ空间' href='javascript:;'></a><a class='weixin' title='微信' href='javascript:;'></a></div>");
            var self=this;
            share(self);
        }).on('mouseleave',".item-share",function () {
            if($(this).find(".weixinWrap").length)return;
            $(this).empty();
        });
    }
    itemShare(".shop-items");
    function share(obj) {
        var shareBx=$(obj).find(".share-bx");
        shareBx.on("click","a",function () {
            var className=$(this).attr("class");
            var itemBD=$(obj).parents(".item-bd");
            var itemHD=itemBD.siblings(".item-hd");
            var shareURL=itemHD.find("a").attr("href");
            var sharePic=itemHD.find("img").attr("src");
            var shareDes=itemBD.find(".item-tit a").text()+itemBD.find(".item-cap p").text();
            var onlyimg =$(obj).parents().siblings(".oimgS").find("img").length;
            if(onlyimg >1){
                shareURL = $(obj).parents(".item-ifo").siblings(".item-tit").find("a").attr("href");
                for(var i=0;i<onlyimg;i++){
                    //shareImg.push($(obj).parents(".item-ifo").siblings(".oimgS").find("a:first-child").find("img").attr("src");
                    //sharePic += $(obj).parents(".item-ifo").siblings(".oimgS").find("img").attr("src");
                }
                sharePic = $(obj).parents(".item-ifo").siblings(".oimgS").find("a:first-child").find("img").attr("src");
                shareDes = $(obj).parents(".item-ifo").siblings(".item-tit").find("a").text();
            }

            var share={
                qzone: function(url,pic,desc) {
                    var p = {
                        url:url,
                        showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
                        desc:desc,/*默认分享理由(可选)*/
                        summary:'',/*分享摘要(可选)*/
                        title:'',/*分享标题(可选)*/
                        site:'',/*分享来源 如：腾讯网(可选)*/
                        pics:pic, /*分享图片的路径(可选)*/
                        style:'203',
                        width:98,
                        height:22
                    };
                    var s = [];
                    for(var i in p){
                        s.push(i + '=' + encodeURIComponent(p[i]||''));
                    }
                    var _u='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+s.join('&');
                    w = window.screen.width, h = window.screen.height;
                    window.open( _u,'分享到QQ空间和朋友网', "height=580,width=708,top=" + (h-580)/2 + ",left=" + (w-708)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
                },
                weixin: function(a) {
                    $.getScript('http://news.open.qq.com/qrcode/gen.php?url='+ encodeURIComponent(a) +'&callback=window.showQcode');
                    window['showQcode'] = function(data){
                        if(data.code==0){
                            var weixinWrap="<div class='weixinWrap'><div class='tria icon'></div><div class='pic fl'><img src='"+data.url+"' /></div><div class='ifo'><p>扫一扫，用手机看新闻！</p><p>用微信扫描还可以</p><p>分享至好友和朋友圈</p></div></div>";
                            shareBx.append(weixinWrap);
                            $("body").one("click",function (e) {
                                e.stopPropagation();
                                $(obj).empty();
                            });
                        }
                    };
                },
                sina:function (articleURL,pic,articleTitle) {
                    var url = "http://v.t.sina.com.cn/share/share.php",
                        _url = articleURL,
                        _title = articleTitle,
                        _appkey = '',
                        _ralateUid = '',
                        c = '', pic = pic;
                    w = window.screen.width, h = window.screen.height;
                    c = url + "?url=" + encodeURIComponent(_url) + "&appkey=" + _appkey + "&title=" + _title + "&pic=" + pic + "&ralateUid=" + _ralateUid + "&language=";
                    window.open(c, "shareQQ", "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
                }
            };
            switch(className){
                case "sina":
                    share.sina(shareURL,sharePic,shareDes);
                    break;
                case "qzone":
                    share.qzone(shareURL,sharePic,shareDes);
                    break;
                case "weixin":
                    if(!$(obj).find(".weixinWrap").length){
                        share.weixin(shareURL);
                    }
                    break;
                default:
                    ;
            }
        });
    }
})();

$(".nav-select").hover(function () {
        $(this).find(".select-bx").finish();
        $(this).find(".select-bx").fadeIn(200).animate({top:"80px"},200).animate({top:"53px"},"fast",function () {selectstate=true});
    },function () {
        $(this).find(".select-bx").finish();
        $(this).find(".select-bx").fadeOut(200).css("top","0");
    }
);

/*合作伙伴  滚动*/
var current = 0,auto = null;
function init() {
    $("#hb_scroll .split").eq(0).show();
}
function next() {
    //if(!a){clearPlay();}
    if(current == ($('#hb_scroll .split').size()-1)){current = -1}
    current++;
    $('#hb_scroll .split').eq(current).fadeIn('slow').siblings().hide();
}
function prev() {
    if(current == 0){current = $('#hb_scroll .split').size()}
    current--;
    $('#hb_scroll .split').eq(current).fadeIn('slow').siblings().hide();
}

function autoPlay(){
    auto = setInterval("next(1)",5000);
}
function clearPlay(){
    clearInterval(auto);
}
$(document).ready(autoPlay);

$('#hb_scroll').hover(function(){
    clearPlay();
},function(){
    autoPlay();
});
init();


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
    var offsetH = $(".jjNav").offset().top;
    $(window).scroll(function(){
        s = $(document).scrollTop();
        s > offsetH ? $(".jjNav").addClass("fixed") : $(".jjNav").removeClass("fixed");
    });
    $(function(){
        var s = $(document).scrollTop();
        var offsetH = $(".jjNav").offset().top;
        s > offsetH ? $(".jjNav").addClass("fixed") : $(".jjNav").removeClass("fixed");
    })

})();




/*  |xGv00|7f31618ff340a3093caf9125445e3e43 */