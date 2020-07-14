


$(".nav-select").hover(function () {
        $(this).find(".select-bx").finish();
        $(this).find(".select-bx").fadeIn(200).animate({top:"60px"},200).animate({top:"43px"},"fast",function () {selectstate=true});
    },function () {
        $(this).find(".select-bx").finish();
        $(this).find(".select-bx").fadeOut(200).css("top","0");
    }
);

/*美妆实验�?*/
$(function(){
    $('.lab-slider-items .lab-slider-item').first().clone().appendTo('.slider-box');
    var slen=$(".lab-slider-items .lab-slider-item").size();
    var next=$(".lab-slider .next");
    var prev=$(".lab-slider .prev");
    var index=0;
    var timer;
    var rightLock,leftLock;
    var swidth=$(".lab-slider-items .lab-slider-item").width();

    $(".slider-box").width(swidth*slen);

    var moveRight=function () {
        rightLock=false;
        if(index==slen){
            $('.lab-slider-items .slider-box').css('marginLeft','0px');
            index=1;
        }
        $('.lab-slider-items .slider-box').animate({"marginLeft": -swidth*index+"px"}, 500,function () {
            rightLock=true;
        });
    };
    var moveLeft=function () {
        leftLock=false;
        if(index==-1){
            $('.lab-slider-items .slider-box').css('marginLeft',-(slen-1)*swidth+'px');
            index=slen-2;
        }
        $('.lab-slider-items .slider-box').animate({"marginLeft": -swidth*index+"px"}, 500,function () {
            leftLock=true;
        });
    };
    next.click(function(){
        if(rightLock==false)return false;
        index++;
        moveRight();
    });
    prev.click(function () {
        if(leftLock==false)return false;
        index--;
        moveLeft();
    });

    $(".lab-slider").hover(function () {
            clearInterval(timer);
        },function () {
            timer=setInterval(function () {
                index++;
                moveRight();
            },5000)
        }
    );
    timer=setInterval(function () {
        index++;
        moveRight();
    },5000)
});

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
            var share={
                qzone: function(url,pic,desc) {
                    var p = {
                        url:url,
                        showcount:'1',/*是否显示分享总数,显示�?'1'，不显示�?'0' */
                        desc:desc,/*默认分享理由(可��?)*/
                        summary:'',/*分享摘要(可��?)*/
                        title:'',/*分享标题(可��?)*/
                        site:'',/*分享来源 如：腾讯�?(可��?)*/
                        pics:pic, /*分享图片的路�?(可��?)*/
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
                            var weixinWrap="<div class='weixinWrap'><div class='tria icon'></div><div class='pic fl'><img src='"+data.url+"' /></div><div class='ifo'><p>扫一扫，用手机看新闻�?</p><p>用微信扫描还可以</p><p>分享至好友和朋友�?</p></div></div>";
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

//chizhuanyoudao
$(function () {
    var clen=$(".bd-right .czyd a").size();
    var cwidth=$(".bd-right .czyd a").width();
    $(".bd-right .czyd .czydWrap").width(clen*cwidth);
    var czydstate;

    function czydChange(){
        if(czydstate==false)return;
        czydstate=false;
        $('.bd-right .czyd .czydWrap').animate({"marginLeft": -cwidth+"px"}, 500,function () {
            $(".bd-right .czyd a").last().after($(".bd-right .czyd a").first());
            $(".bd-right .czyd .czydWrap").css("marginLeft",0);
            czydstate=true;
        });
    }
    set=setInterval(czydChange,5000);

    $(".bd-right .czyd").mouseenter(function () {
        clearInterval(set);
    }).mouseleave(function () {
        set=setInterval(czydChange,5000);
    });
})

/*footer滚动�?*/

$(function () {
    $(".footer .f-list ul.wrap").bxSlider({
        infiniteLoop:true,
        pager:false,
        slideWidth: 175,
        minSlides: 5,
        maxSlides: 5,
        moveSlides: 1,
        slideMargin:29,
        auto:true,
        pause:5000,
        autoHover: true,
        speed:500,
        controls:false
    });
})



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

/*  |xGv00|261df32585b69f51b546ae069b1d8af5 */