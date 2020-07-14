/**
 * @author camdyzeng
 */
var QPHOTO = QPHOTO || {};
(function(){
	var _q = QPHOTO;
	_q.nameSpace = function(path,option,global){
		var _p = path.split(".");
		var _o;
		if(global){
			_o = window[_p[0]] = window[_p[0]] || {};
		}else{
			_o = _q[_p[0]] = _q[_p[0]] || {};
		}
		for(var i=1,l=_p.length;i<l;i++){
			_o = _o[_p[i]] = _o[_p[i]] || {};
		}
		if(option){
			for(var i in option){
				if(_o[i]){
					alert(i + "already defined");
					continue;
				}
				_o[i] = option[i];
			}
		}
		return _o;
	};
	String.prototype.URIencode = function(){
	    return this.replace(/[\x09\x0A\x0D\x21-\x29\x2B\x2C\x2F\x3A-\x3F\x5B-\x5E\x60\x7B-\x7E]/g, function(a){return "%" + ((a.charCodeAt(0) < 16) ? ("0" + a.charCodeAt(0).toString(16)) : (a.charCodeAt(0).toString(16)))}).replace(/[\x00-\x20 ]/g, "+");
	};
	String.prototype.trim = function(){
	    return this.replace(/^\s+|\s+$/g, "");
	}
	String.prototype.URIParam = function() {
		return this.trim().URIencode();
	}
})();
(function(){
	var Q = QPHOTO;
	var _emText = new Array('Î¢Ð¦','Æ²×ì','É«','·¢´ô','µÃÒâ','Á÷Àá','º¦Ðß','±Õ×ì','Ë¯','´ó¿Þ','ÞÏÞÎ','·¢Å­','µ÷Æ¤','ßÚÑÀ','¾ªÑÈ','ÄÑ¹ý','¿á','Àäº¹','×¥¿ñ','ÍÂ','ÍµÐ¦','¿É°®','°×ÑÛ','°ÁÂý','¼¢¶ö','À§','¾ª¿Ö','Á÷º¹','º©Ð¦','´ó±ø','·Ü¶·','ÖäÂî','ÒÉÎÊ','Ðê','ÔÎ','ÕÛÄ¥','Ë¥','÷¼÷Ã','ÇÃ´ò','ÔÙ¼û','²Áº¹','¿Ù±Ç','¹ÄÕÆ','ôÜ´óÁË','»µÐ¦','×óºßºß','ÓÒºßºß','¹þÇ·','±ÉÊÓ','Î¯Çü','¿ì¿ÞÁË','ÒõÏÕ','Ç×Ç×','ÏÅ','¿ÉÁ¯','²Ëµ¶','Î÷¹Ï','Æ¡¾Æ','ÀºÇò','Æ¹ÅÒ','¿§·È','·¹','ÖíÍ·','Ãµ¹å','µòÐ»','Ê¾°®','°®ÐÄ','ÐÄËé','µ°¸â','ÉÁµç','Õ¨µ¯','µ¶','×ãÇò','Æ°³æ','±ã±ã','ÔÂÁÁ','Ì«Ñô','ÀñÎï','Óµ±§','Ç¿','Èõ','ÎÕÊÖ','Ê¤Àû','±§È­','¹´Òý','È­Í·','²î¾¢','°®Äã','NO','OK','°®Çé','·ÉÎÇ','ÌøÌø','·¢¶¶','âæ»ð','×ªÈ¦','¿ÄÍ·','»ØÍ·','ÌøÉþ','»ÓÊÖ','¼¤¶¯','½ÖÎè','Ï×ÎÇ','×óÌ«¼«','ÓÒÌ«¼«');
	function _ubbText(v){
		try{
			v = v.replace(/\n/g,"").replace(/\[em\]e(\d{1,3})\[\/em\]/g, function(){
				return "\\" + _emText[arguments[1] - 100];
			});
			return v;
		}catch(e){};
		return v;
	}
	function _config(conf,value){
		if(conf.ubb){
			value = ubbReplace(value+"","face");
		}
		return value;
	}
	Q.nameSpace("util",{
		"tplReplace" : function(tpl,data,idx,conf){
			var str = (tpl.replace(/\<\%=\@([a-z_]+?)\|((_?[a-z]*?)|(([a-z]*?\.)+[a-z]+?))?\%\>/gi, function(a, b, c){
				var value = data[b];
				if (typeof value == "string") {
					value = value.trim();
				};
				if (value == null) {
					return "";
				}
				if (conf) {
					value = _config(conf, value);
				}
				if (c) {
					var fn = eval(c);
					value = fn(value, data, b);
				}
				return value;
			}).replace(/\<\%=index\%\>/g, idx));
			return str;
		},
		"emText" : _emText
	});
})();
QPHOTO.nameSpace("util",{
	"go" : function(link, aid, lloc, others) {
		var url = link;
		var data = [];
		if(aid){
			data.push("aid=" + aid);
		}
		if(lloc){
			data.push("lloc=" + lloc);
		}
		if(others){
			data.push(others);
		}
		if(data.length > 0){
			url += "#" + data.join("&");
		}
		window.location.href = url;
	},
	"getParameter" : function(name,cancelBubble){
		var r = new RegExp("(\\?|#|&)"+name+"=([^&#]*)(&|#|$)");
		var m = location.href.match(r);
		return (!m?"":m[2]);
	}
});

/**
 * @author camdyzeng
 */
(function(){
	var Q = QPHOTO;
	Q.nameSpace("img",{
		"preLoad" : function(obj,src,width,height,mode,needStatistic,type){
			width = width || 100;
			height = height || 100;
			var mode = mode || 0;
			var img = new Image();
			img.onload = function(){
				this.onload = null;
				_adjust(this,width,height,mode);
				obj.src = this.src;
				obj.style.width = this.width + "px";
				obj.style.height = this.height + "px";
				obj.style.display = "";
				if(height>this.height){
					vMiddle(obj,height,this.height);
				}
				img.onload = null;
				img.onerror = null;
				img = null;
			}
			img.onerror = function(){
				obj.src = 'http://imgcache.qq.com//qzone_v4/client/userinfo_icon/5001.gif';
				img.onload = null;
				img.onerror = null;
				img = null;
			}
			var _st = new Date();
			img.src = src;
		}
	});
	var _scaleVar = 1000;
	function _adjust(img,width,height,bSplit){
		if(img.width < width && img.height < height){//Èç¹ûÁ½±ß¶¼Ð¡ÓÚ±ê×¼¿í¶È,ÄÇÃ´Ô­Í¼ÏÔÊ¾,²»À­ÉìÒ²²»Ñ¹Ëõ
			return;
		}
		var mode = img.height*width>img.width*height?1:2;
		if(bSplit){
			mode = mode==1?2:1;
		}
		switch(mode){
			case 2:
				img.height = Math.round(img.height*width*_scaleVar/img.width)/_scaleVar;
				img.width = width;
				break;
			case 1:
				img.width = Math.round(img.width*height*_scaleVar/img.height)/_scaleVar;
				img.height = height;
				break;
		}
	}
	function vMiddle(img,tH,rH){
		if(tH > rH){
			img.style.marginTop = Math.round((tH-rH)/2) + "px";
		}
	}
})();/*  |xGv00|e47e1ef53108b764bb430f33dfeeef33 */