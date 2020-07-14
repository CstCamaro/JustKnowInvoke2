var iShare = function() {
    var doc = document;
    var getScript = function(file, callback, charset) {
        var _doc = doc.getElementsByTagName('head')[0];
        var js = doc.createElement('script');
        charset && js.setAttribute('charset', charset);
        js.setAttribute('src', file);
        _doc.appendChild(js);
        if (!/*@cc_on!@*/0) {
            js.onload = function() {
                callback()
            }
        } else {
            js.onreadystatechange = function() {
                if (js.readyState == 'loaded' || js.readyState == 'complete') {
                    js.onreadystatechange = null;
                    callback && callback();
                }
            }
        }
        return false;
    };
    //share list
    var share = {
        weibo: function(title, imgUrl, url) {
            var b = "http://share.v.t.qq.com/index.php",
            c = imgUrl || [],
            d = title || doc.title,
            e = url || window.location.href,
            f = "lixiang0522",
            x = window.screen.width,
            y = window.screen.height,
            g = encodeURI("3eef3dc2a3254c5cb5b2506bc8f9765f"),
            h = "";
            h = b + "?c=share&a=index&f=q2&url=" + encodeURIComponent(e) + "&appkey=" + g + "&assname=" + f + "&title=" + d + "&pic=" + encodeURIComponent(c);
            window.open(h, "shareQQ", "height=600,width=708,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
        },
        sina: function(title, imgUrl, url) {
            var b = "http://v.t.sina.com.cn/share/share.php",
            c = imgUrl || [],
            e = url || window.location.href,
            d = title || doc.title,
            f = "",
            g = "",
            x = window.screen.width,
            y = window.screen.height,
            h = "";
            h = b + "?url=" + encodeURIComponent(e) + "&appkey=" + g + "&title=" + d + "&pic=" + encodeURIComponent(c) + "&ralateUid=" + f + "&language=";
            window.open(h, "shareQQ", "height=600,width=708,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
        },
        qzone: function(title, imgUrl, url) {
            var tt = title.replace(/%23/i, "【").replace(/%23/i, "】");
            var pos = tt.lastIndexOf("】");
            var b = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
            c = imgUrl || [],
            //d = tt.substr(0, pos+1) || doc.title,
            d = title || doc.title,
            e = url || window.location.href,
            f = "",
            x = window.screen.width,
            y = window.screen.height,
            //g = title.split("】")[1] == "undefined" ? "" : title.split("】")[1];
            g = "";
            f = b + "?to=qzone&url=" + encodeURIComponent(e) + "&title=" + encodeURIComponent(d) + "&pics=" + encodeURIComponent(c) + "&summary=" + encodeURIComponent(g); //window.open(f, "shareQQ", "height=600,width=708,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
            window.open(f, "", "height = 540, width = 580, top = " + (y - 540) / 2 + ", left = " + (x - 580) / 2 + ", toolbar = no, menubar = no, resizable = yes, location = yes,status = no");
        },
        qq: function(title, imgUrl, url) {
            var tt = title.replace(/%23/i, "【").replace(/%23/i, "】");
            var pos = tt.lastIndexOf("】");
            var a = "http://connect.qq.com/widget/shareqq/index.html",
            d = url || window.location.href,
            //m = tt.substr(0, pos+1) || doc.title,
            m = title || doc.title,
            b = "",
            x = window.screen.width,
            y = window.screen.height,
            h = "",
            k = "",
            //s = title.split("】")[1] == "undefined" ? "" : title.split("】")[1];
            s = "";
            g = imgUrl || [];
            k = a + "?url=" + encodeURIComponent(d) + "&showcount=0&desc=" + encodeURIComponent(s) + "&summary=&title=" + encodeURIComponent(m) + "&pics=&style=203&width=19&height=22"; //window.open(k, "shareQQ", "height=600,width=708,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
            window.open(k, "", "height = 600, width = 780, top = " + (y - 600) / 2 + ", left = " + (x - 780) / 2 + ", toolbar = no, menubar = no, resizable = yes, location = yes,status = no");
        },
        weixin: function(title, imgUrl, url) {
            var tt = title.replace(/%23/i, "【").replace(/%23/i, "】");
            var pos = tt.lastIndexOf("】");
            var opt = {
                //"title": encodeURIComponent(tt.substr(0, pos+1) || doc.title),
                "title": encodeURIComponent(title || doc.title),
                "imgsrc": imgUrl || [],
                "url": url || window.location.href,
                "appid": "wx66e51778a48681ad"
            };
            getScript('http://mat1.gtimg.com/www/weixin/sharewx_v1.0.0.js', function() {
                sharewx(opt);
            }, 'utf-8');
        }
    };
    //init
    var obj = {
        init: function() {
            var self = this;
            jQuery("div[action-type=isShare] a").bind("click", function(e) {
                e.preventDefault();
                var name = this.name || '';
                var parent = this.parentNode;
                var title = parent.getAttribute('name');
                var src = parent.getAttribute('data');
                var url = parent.getAttribute('url');
                share[name](title, src, url);

            });
        }
    };
    if (iShare.instance) {
        return iShare.instance;
    } else {
        obj.init();
        return iShare.instance = obj;
    }
};
iShare();/*  |xGv00|06bc54154a647961da359bc63793308b */