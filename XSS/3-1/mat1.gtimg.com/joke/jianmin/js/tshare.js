/**
 * @author  jianminlu
 * @update  2014-04-01 16:27
 * @tShare  {Function}  带话题功能的分享 tShare.init({topic:"2014年全国两会", shareId:"tShare"});
 * @param   {Object}    参数
 *  @topic   {String}   分享话题，默认为空
 *  @shareid {String}   绑定ID，默认为tShare
 */
;(function(W, D){
    // iShare
    document.domain = "qq.com";
    var tShare = window['tShare'] = function(o){
        return new _tShare(o);
    },
    _tShare = function(o){
        if(o && o.topic){
            this.topic = "%23" + o.topic + "%23";
        }else{
            this.topic = "";
        }
        if(o && o.shareId){
            this.shareId = o.shareId
        }else{
            this.shareId = "tShare";
        }
        if(o && o.mobielurl){
            this.mobielurl = o.mobielurl;
        }else{
            this.mobielurl = "";
        }
        this.init();
    };
    _tShare.prototype = {
        shareList: {
            x: W.screen.width,
            y: W.screen.height,
            twb: function(title, pic, url) {
                var siteUrl = "http://share.v.t.qq.com/index.php",
                appkey = encodeURI("3eef3dc2a3254c5cb5b2506bc8f9765f"),
                site = siteUrl + "?c=share&a=index&f=q2&url=" + encodeURIComponent(url) + "&appkey=" + appkey + "&title=" + title + "&pic=" + encodeURIComponent(pic);
                W.open(site, "twb", "height=600,width=708,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
            },
            sina: function(title, pic, url) {
                var siteUrl = "http://service.weibo.com/share/share.php",
                appkey = "",
                site = siteUrl + "?url=" + encodeURIComponent(url) + "&appkey=" + appkey + "&title=" + title + "&pic=" + encodeURIComponent(pic);
                W.open(site, "sina", "height=600,width=708,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
            },
            qzone: function(title, pic, url) {
                var siteUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
                summary = "";
                site = siteUrl + "?to=qzone&url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title) + "&pics=" + encodeURIComponent(pic) + "&summary=" + encodeURIComponent(summary);
                W.open(site, "qzone", "height=540, width=580, top="+(this.y-540)/2 + ", left=" + (this.x-580)/2 + ", toolbar=no, menubar=no, resizable=yes, location=yes,status=no" );
            },
            qq: function(title, pic, url){
                var siteUrl = "http://connect.qq.com/widget/shareqq/index.html";
                site = siteUrl + "?url=" + encodeURIComponent(url) + "&showcount=0&desc=" + encodeURIComponent(title) +"&pics=" + encodeURIComponent(pic)+ "&charset=GB2312";
                W.open(site, "qq", "height=600, width=780, top="+(this.y-600)/2 + ", left=" + (this.x-780)/2 + ", toolbar=no, menubar=no, resizable=yes, location=yes,status=no" );
            }
        },
        getScript: function(file, callback, charset) {
            var head = D.getElementsByTagName('head')[0],
            js = D.createElement('script');
            charset && js.setAttribute('charset', charset);
            js.setAttribute('src', file);
            head.appendChild(js);
            if (!/*@cc_on!@*/0) {
                js.onload = function() {
                    callback && callback();
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
        },
        init: function(){
            var _this = this;
            var shareList = D.getElementById(_this.shareId),
                domA = shareList.getElementsByTagName("a");
            for(var i = 0, l = domA.length; i < l; i ++){
                if(domA[i].name == "mobile"){
                    var _obj = domA[i];
                    var _url = _this.mobielurl ? _this.mobielurl : D.location.href;
                    _this.getScript("http://news.open.qq.com/qrcode/gen.php?callback=qrcode&url=" + _url);
                    W.qrcode = function(res){
                        _obj.innerHTML = '<span class="qrcode"><img width="100" src=' + res.url + ' /><br /><p>手机阅读分享</p></span>';
                    }
                }else{
                    domA[i].onclick = function(e){
                        var name = this.name || '',
                            parent = this.parentNode,
                            title = parent.getAttribute('name') || D.title,
                            src = parent.getAttribute('pic'),
                            url = parent.getAttribute('url') || W.location.href;
                        if(name == "twb" || name == "sina"){
                            title = _this.topic + title;
                        }
                        if(_this.shareList[name]){
                            _this.shareList[name](title, src, url);
                        }
                    }
                }
            }
        }
    }
})(window, document);/*  |xGv00|5ed6caf752d5126d3e7a3de8f53f8f37 */