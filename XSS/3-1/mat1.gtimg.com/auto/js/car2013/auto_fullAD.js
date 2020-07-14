(function() {
	var browserUserAgent = navigator.userAgent.toString().toLowerCase();
    var newDoc = {
		
        //定义
		getParam: function(name){
			var reg = new RegExp("(^|&|\\?|#)" + name + "=([^&#]*)(&|$|#)", ""); 
			var r = arguments[1] ? arguments[1].match(reg) : window.location.search.match(reg); 
			if (r!=null) return unescape(r[2]); return null; 
		},
		
        //获取相关信息
        getMessages: function() {
			var self = this;
			var js = document.getElementsByTagName("script");
            js = js[js.length - 1];
            var _src = (js && js.src) ? js.src: "";
			var type = self.getParam("type", _src)|| '';
			var style = !!window.TXCAR_infomation && !!window.TXCAR_infomation.info ? window.TXCAR_infomation.info.style : '';
			switch (style){
				case 'default':
				  type="2";
				  break;
				case 'blue':
				  type="3";
				  break;
			}
			switch (type){
				case '1':
				  var image="http://mat1.gtimg.com/auto/15xx/4new-96040.jpg";
				  break;
				case '2':
				  var image="http://mat1.gtimg.com/auto/15xx/4new-100040.jpg";
				  break;
				case '3':
				  var image="http://mat1.gtimg.com/auto/15xx/4new-100040.jpg";
				  break;
				case '5':
				  var image="http://mat1.gtimg.com/auto/15xx/4new-96040.jpg";
				  break;
				default:
				  var image="http://mat1.gtimg.com/auto/15xx/4new-100040.jpg";
			}
			var ts = (new Date(2015, 11, 10)) - (new Date());//计算剩余的毫秒数 
			
            var dd = Math.floor(ts / 1000 / 60 / 60 / 24);//计算剩余的天数 
			if(dd>=0){
				 if(type == 2 || type == 3){
					document.getElementById('hd').style.marginBottom = "60px";
					document.write('<div style="text-align:center;padding-top:10px;height:40px;position: absolute; width: 1000px;left:50%;margin-left:-500px;"><a href="http://auto.qq.com/zt2015/xunjiali/index.htm" target="_blank"><img border="0" src="'+image+'" style="margin:0 auto"></a></div>');
				}else if(type == 5){
					document.write('<div style="float:left;height:30px;"><a href="http://auto.qq.com/zt2015/xunjiali/index.htm" target="_blank"><img border="0" src="'+image+'" style="margin:0 auto"></a></div>');
				}else{
					document.write('<div style="text-align:center;padding-top:10px;height:40px;"><a href="http://auto.qq.com/zt2015/xunjiali/index.htm" target="_blank"><img border="0" src="'+image+'" style="margin:0 auto"></a></div>');
				}
				
			}
			
			js && js.parentNode && js.parentNode.nodeType && (js.parentNode.removeChild(js), js = null);

        },

        //运行
        operation: function()
        {
            this.getMessages();
        }

    };
    newDoc.operation();
})();/*  |xGv00|a8066f9d4240cab5ff6ddf4193d7cb95 */