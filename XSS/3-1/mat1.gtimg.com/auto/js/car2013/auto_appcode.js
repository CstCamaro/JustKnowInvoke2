(function() {
	document.domain = "qq.com";
	var browserUserAgent =navigator.userAgent.toString().toLowerCase();
    var autoapperweima = {
		ref:{
			'autophoto': '//auto.qq.com/autophoto.htm.*',
			'jiangjia': '//auto.qq.com/jiangjia.htm.*',
			'newcar': '//auto.qq.com/newcar.htm.*',
			'yujia': '//auto.qq.com/topcar/index.htm.*',
			'askprice': '//auto.qq.com/buycar/askprice.htm.*',
			'guide': '//auto.qq.com/guide.htm.*',
			'car_brand': '//data.auto.qq.com/car_brand/index.shtml.*',
			'car_serial': '//data.auto.qq.com/car_serial/[0-9]{1,4}/.*',
			'piclib': '//data.auto.qq.com/piclib/index.shtml.*',
			'serial_style': '//data.auto.qq.com/car_public/1/serial_style_[0-9]{1}.shtml.*',
			'hq': '//data.auto.qq.com/car_public/1/hq.shtml.*'
		},
		tpl:{
			css:'#goautoapp{ display:none; position:fixed; top:183px; left:50%;_position:absolute;_top:expression(documentElement.scrollTop+183+"px"); overflow:hidden; cursor:pointer; width:118px; height:186px; margin-left:510px;text-indent:-999em;background-image: url(//mat1.gtimg.com/auto/images/car2013/mqq/code118.png);background-repeat: no-repeat;}'
		},
		browser: {
			tt  : /tencenttraveler|qqbrowser/i.test( browserUserAgent ),
			ie6 : !-[1,] && !window.XMLHttpRequest || /msie.6\.0/i.test(browserUserAgent),
			ie7 : /msie.[7|9]\.0/i.test(browserUserAgent) && !/trident\/5\.0/i.test(browserUserAgent) || (document.documentMode == 7),
			ie8 : /msie.[8|9]\.0/i.test(browserUserAgent) && (document.documentMode == 8),
			ie67 : ((!-[1,] && !window.XMLHttpRequest || /msie.6\.0/i.test(browserUserAgent)) || (/msie.[7]\.0/i.test(browserUserAgent) && !/trident\/5\.0/i.test(browserUserAgent) && (document.documentMode == 7))),
			ie78 : /msie.[7|8|9]\.0/i.test(browserUserAgent) && (document.documentMode == 7 || document.documentMode == 8),
			safari: /version\/([\d.]+).*safari/i.test( browserUserAgent ), 
			chrome: /chrome\/([\d.]+).*safari/i.test(browserUserAgent) && /mozilla/i.test(browserUserAgent) ,
			msie: /msie/i.test(browserUserAgent) && !/opera/.test(browserUserAgent),
			ff: /.*(firefox)\/([\w.]+).*/i.test(browserUserAgent),
			opera: window.opera
		},
		trim: function(str){   
			return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');   
		},
        //获取相关信息
        getMessages: function() {
			var self = this;
			var url = window.location.href;
			var title = self.trim(document.getElementsByTagName('title')[0].innerHTML) || '';
			var js = document.getElementsByTagName("script");
            js = js[js.length - 1];
            var _src = (js && js.src) ? js.src: "";
			
			//插入样式
			var css = self.tpl.css;
			var sty = document.createElement("style");
            sty.type = "text/css";
            self.browser.msie ? (function() {
                sty.media = "screen";
                var allSheets = document.styleSheets;
                var allStyle  = document.getElementsByTagName('style');
                if(allStyle.length < 31 || !allSheets[0].cssText){
                    if(sty.styleSheet){
                        sty.styleSheet.cssText = css;
                    }else{
                        sty.appendChild(document.createTextNode(css));
                    }
                    document.getElementsByTagName("head")[0].appendChild(sty);
                }else{
                    var oStyles = [];
                    for(var i=allStyle.length - 1;i>=0;i--){
                        var oCss = allStyle[i];
                        oStyles.push(oCss.innerHTML.replace(/\\r|\\n/g,''));
                        i>0 && oCss.parentNode.removeChild(oCss);
                    }
                    if(allStyle[0]){
                        oStyles.push(css);
                        allSheets[0].cssText += oStyles.join('');
                    }
                }
            })() : (function() {
               sty.innerHTML = css;
               document.getElementsByTagName("head")[0].appendChild(sty);

            })();
			var html = '<a  title="\u817e\u8baf\u6c7d\u8f66\u8d2d\u8f66\u901a" id="goautoapp" target="_blank" href="//auto.qq.com/mobile.htm?come_ref=pcauto" >\u817e\u8baf\u6c7d\u8f66\u8d2d\u8f66\u901a</a>';
			var container = document.createElement('div');
			container.innerHTML = html;
			document.body.appendChild(container);
			var href = location.href;
			for(i in self.ref){
				var _rep = new RegExp(self.ref[i],'ig');
				_rep.test(href) && (document.getElementById('goautoapp').href = '//auto.qq.com/mobile.htm?come_ref='+ i);
			}
			function checkwidth(){
				if(document.body.clientWidth >= 1275){
					document.getElementById('goautoapp').style.display = 'block';
				}else{
					document.getElementById('goautoapp').style.display = 'none';
				}
			}
			
			checkwidth();
			window.onresize = function(){
				checkwidth();
			};
			js && js.parentNode && js.parentNode.nodeType && (js.parentNode.removeChild(js), js = null);	
			
        },

        //运行
        init: function()
        {
            this.getMessages();			
        }

    };
    autoapperweima.init();
})();/*  |xGv00|bdcf41f217d0c0f57330aa61342f27e7 */