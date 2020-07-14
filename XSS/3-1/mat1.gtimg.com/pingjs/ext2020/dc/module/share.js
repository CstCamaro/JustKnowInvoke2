/**
 * Created by tangentguo on 2016/5/9.
 */

;(function($) {
    var title = ARTICLE_INFO.title;
    var url = ARTICLE_INFO.article_url;
    var openCss = "height=540,width=720, top = " + (window.screen.height - 540) / 2 + ", left = " + (window.screen.width - 720) / 2 + ", toolbar=no,menubar=no,resizable=yes,location=yes,status=no";
    //获取文章内的图片
    var pictures = getPicture('|');
    function getPicture(sp){
        var t = [];
        $('#Cnt-Main-Article-QQ img').each(function(el,i){
            var el = $(this);
            el.width()>150 && el.height() > 150 && t.push(el.attr('src'));
        });
        return encodeURIComponent(t.join(sp))
    }

    //微博分享
    var shareTOsina = function() {
        var t = pictures;
        var i = "http://service.weibo.com/share/share.php"
            , s = url
            , o = title
            , u = ""
            , a = ""
            , f = ""
            , l = getPicture('||');
        f = i + "?url=" + encodeURIComponent(s) + "&appkey=" + u + "&title=" + o + "&pic=" + l + "&ralateUid=" + a + "&language=&searchPic=" + !1,
            window.open(f, "shareQQ", openCss)
    };

    var linkedIn = function(){
        var shareUrl =  'http://www.linkedin.com/shareArticle?mini=true&ro=true&title='+encodeURIComponent(title)+'&url='+encodeURIComponent(url)+'&summary=&source=&armin=armin';
        window.open(shareUrl, "shareLinkedIn", openCss);
    };

    //qq分享
    var shareTOqq = function(){
        var t = "http://connect.qq.com/widget/shareqq/index.html";
        var k = t + "?url=" + encodeURIComponent(url) + "&showcount=0&desc=" + encodeURIComponent(title) + "&summary=&title=" + encodeURIComponent(title) + "&pics=&style=203&width=19&height=22";
        window.open(k, "shareQQ", openCss)
    }

    //qzone分享
    var shareTOqzone = function(e) {
        var t = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"
            , n = title
            , r = url
            , i = ""
            , s = ""
            , f = pictures?("&pics=" + pictures):'';
        i = t + "?to=qzone&url=" + encodeURIComponent(r) + "&title=" + encodeURIComponent(n) + f + "&summary=" + encodeURIComponent(s)
        window.open(i, "shareQzone", openCss)
    }

    //腾讯微博分享
    var shareTOqqweibo = function(){
        var t = "http://share.v.t.qq.com/index.php"
            , n = title
            , r = url
            , i = ""
            , s = encodeURI("3eef3dc2a3254c5cb5b2506bc8f9765f")
            , o = ""
            , u = 0
            , a = pictures?("&pic=" + pictures):''
        o = t + "?c=share&a=index&f=q2&url=" + encodeURIComponent(r) + "&appkey=" + s + "&assname=" + i + "&title=" + n + a
        window.open(o, "shareWeibo", openCss)
    }
    //二维码图片生成库
    $.getScript('https://mat1.gtimg.com/rain/apub2019/2d06c1f823f3.qrcode.min.js')

    //分派
    var share = {
        'sina':shareTOsina,
        'qq':shareTOqq,
        'qzone':shareTOqzone,
        'qq_weibo':shareTOqqweibo,
        'linkedIn':linkedIn
    }

    var hasqrcode = false
    $(document).on('click','[data-tshare]',function(e){
        e.preventDefault();
        if(hasqrcode) return
        var self = $(this);
        var t = $(this).attr('data-tshare');
        if(t=='weixin'){
            if(self.data('qrcode')) return
            self.data('qrcode',1)
            new QRCode(document.getElementById("qrcode_0"), window.location.href);
            new QRCode(document.getElementById("ewmimg"), window.location.href);
            hasqrcode = true
        }else{
            share[t]();
        }
    });
})(jQuery);

//2019-6-18


/*  |xGv00|d0f7f375c992dedfd700e264b468e631 */