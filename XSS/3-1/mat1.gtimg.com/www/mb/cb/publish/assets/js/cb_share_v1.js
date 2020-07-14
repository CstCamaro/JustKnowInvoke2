function cb_share_content(e,evt) {
	var t = document.getElementById("cb_share_div");
	t.style.display = "block";
	cb_share_open = 1;
	if (e == 1) {
		document.getElementById("cb_ts_triangle").className = "tb_wx_share_triangle";
		document.getElementById("cb_ts_wx").style.display = "block";
		document.getElementById("cb_ts_wxf").style.display = "none"
	}
	if (e == 2) {
		document.getElementById("cb_ts_triangle").className = "tb_wx_share_triangleF";
		document.getElementById("cb_ts_wxf").style.display = "block";
		document.getElementById("cb_ts_wx").style.display = "none"
	}
	if(window.event){
		event.cancelBubble = true;
	}else{
		evt.stopPropagation();
	}
	cb_otherShareClose()
}

function cb_otherShareClose() {
	document.onclick = function() {
		//console.log(cb_share_open);
		if (cb_share_open) {
			document.getElementById("cb_share_div").style.display = "none";
			cb_share_open = 0;
			document.onclick = function() {}
		}
	}
}

function cb_shareSina() {
	cb_share.sina(hdPic)
}

function cb_shareWeibo() {
	cb_share.weibo(hdPic)
}

function cb_shareQQ() {
	cb_share.qq(hdPic)
}

function cb_shareQzone() {
	cb_share.qzone(hdPic)
}

function cb_shareWx(e) {
	cb_share_content(1,e)
}

function cb_shareWxf(e) {
	cb_share_content(2,e)
}
var cb_share = window.cb_share || {};
cb_share = {
	sina: function(e) {
		var t = 0,
			n = e.pic.length;
		for (var t = 0; t < n; t++) parseInt(this.loadImg(e.pic[t]).w) < 150 && parseInt(this.loadImg(e.pic[t]).h) < 150 && e.pic.splice(t, 1);
		var r = "http://service.weibo.com/share/share.php",
			i = e.url,
			s = e.title,
			o = "",
			u = "",
			a = "",
			f = e.pic && e.pic.join("||") || "";
		a = r + "?url=" + encodeURIComponent(i) + "&appkey=" + o + "&title=" + s + "&pic=" + f + "&ralateUid=" + u + "&language=" + "&searchPic=" + !1, window.open(a, "shareSina", "height=480,width=608,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no")
	},
	weibo: function(e) {
		var t = "http://share.v.t.qq.com/index.php",
			n = e.title,
			r = e.url,
			i = "",
			s = encodeURI("3eef3dc2a3254c5cb5b2506bc8f9765f"),
			o = "",
			u = 0,
			a = e.pic.length;
		for (var u = 0; u < a; u++) parseInt(this.loadImg(e.pic[u]).w) < 150 && parseInt(this.loadImg(e.pic[u]).h) < 150 && e.pic.splice(u, 1);
		e.pic.length > 0 ? o = t + "?c=share&a=index&f=q2&url=" + encodeURIComponent(r) + "&appkey=" + s + "&assname=" + i + "&title=" + n + "&pic=" + encodeURIComponent(e.pic.join("|")) : o = t + "?c=share&a=index&f=q2&url=" + encodeURIComponent(r) + "&appkey=" + s + "&assname=" + i + "&title=" + n, window.open(o, "shareWeibo", "height=480,width=608,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no")
	},
	qq: function(e) {
		var t = "http://connect.qq.com/widget/shareqq/index.html";
		url = e.url, title = e.title, x = window.screen.width, y = window.screen.height, k = "";
		var n = 0,
			r = e.pic.length;
		for (var n = 0; n < r; n++) parseInt(this.loadImg(e.pic[n]).w) < 150 && parseInt(this.loadImg(e.pic[n]).h) < 150 && e.pic.splice(n, 1);
		k = t + "?url=" + encodeURIComponent(url) + "&showcount=0&desc=" + encodeURIComponent(title) + "&summary=&title=" + encodeURIComponent(title) + "&pics=&style=203&width=19&height=22", window.open(k, "shareQQ", "height=540,width=720, top = " + (y - 540) / 2 + ", left = " + (x - 720) / 2 + ", toolbar=no,menubar=no,resizable=yes,location=yes,status=no")
	},
	qzone: function(e) {
		var t = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
			n = e.title,
			r = e.url,
			i = "",
			s = "",
			o = window.screen.width,
			u = window.screen.height,
			a = 0,
			f = e.pic.length;
		for (var a = 0; a < f; a++) parseInt(this.loadImg(e.pic[a]).w) < 150 && parseInt(this.loadImg(e.pic[a]).h) < 150 && e.pic.splice(a, 1);
		e.pic.length > 0 ? i = t + "?to=qzone&url=" + encodeURIComponent(r) + "&title=" + encodeURIComponent(n) + "&pics=" + encodeURIComponent(e.pic.join("|")) + "&summary=" + encodeURIComponent(s) : i = t + "?to=qzone&url=" + encodeURIComponent(r) + "&title=" + encodeURIComponent(n) + "&summary=" + encodeURIComponent(s), window.open(i, "shareQzone", "height=480,width=608, top = " + (u - 480) / 2 + ", left = " + (o - 608) / 2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no")
	},
	wx: function() {},
	loadImg: function(e) {
		var t = new Image;
		return t.src = e, t.complete ? {
			w: t.width,
			h: t.height
		} : (t.onload = function() {
			return {
				w: t.width,
				h: t.height
			}
		}, {
			w: t.width,
			h: t.height
		})
	}
};
var cb_share_open = 0;
document.getElementById("cb_share2sina").onclick = cb_shareSina;
document.getElementById("cb_share2weibo").onclick = cb_shareWeibo;
document.getElementById("cb_share2qq").onclick = cb_shareQQ;
document.getElementById("cb_share2qzone").onclick = cb_shareQzone;
document.getElementById("cb_share2wx").onclick = cb_shareWx;
document.getElementById("cb_share2wxf").onclick = cb_shareWxf;/*  |xGv00|6742e8aa42acb138f3928f8f354120d6 */