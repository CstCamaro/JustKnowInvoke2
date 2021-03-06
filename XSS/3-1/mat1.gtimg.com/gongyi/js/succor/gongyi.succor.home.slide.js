function $$(i) {
	return document.getElementById(i)
}

function getTag(e, p) {
	return p.getElementsByTagName(e)
}
var ws = ws || {};
ws.fader = function() {
	function b(b, c) {
		a.n = b;
		for(s in c) {
			a[s] = c[s]
		}
		this.build()
	}
	var a = {
		position: 0,
		auto: 0,
		navEvent: "click",
		duration: .25
	};
	b.prototype.build = function() {
		var b = $$(a.id),
			c = a.slides = getTag("li", b),
			d = c.length,
			e = a.count = 0;
		b.style.overflow = "hidden";
		for(e; e < d; e++) {
			var f = c[e];
			if(f.parentNode == b) {
				f.className += "cp_fader";
				f.opacity = 0;
				f.style.filter = "alpha(opacity=0)";
				a.count++
			}
			if(a.pauseHover) {
				f.onmouseover = new Function(a.n + ".pause()");
				f.onmouseout = new Function(a.n + ".play()")
			}
		}
		if(a.navid) {
			var g = $$(a.navid);
			if(a.pauseHover) {
				g.onmouseover = new Function(a.n + ".pause()");
				g.onmouseout = new Function(a.n + ".play()")
			}
			g.style.display = "block";
			a.nav = getTag("li", g);
			for(var h = 0; h < a.count; h++) {
				if(a.nav[h].addEventListener) {
					a.nav[h].addEventListener(a.navEvent, new Function(a.n + ".pos(" + h + ")"), 0)
				} else {
					a.nav[h].attachEvent("on" + a.navEvent, new Function(a.n + ".pos(" + h + ")"), 0)
				}
			}
		}
		a.cssTrans = document.body.style.webkitTransition !== undefined || document.body.style.MozTransition !== undefined;
		this.pos(a.position, a.auto, 1)
	};
	b.prototype.play = function() {
		if(!a.slides.ai) {
			a.slides.ai = setInterval(new Function(a.n + ".move(1, 1)"), a.auto * 1e3)
		}
	};
	b.prototype.pause = function() {
		clearInterval(a.slides.ai);
		a.slides.ai = 0
	};
	b.prototype.move = function(b, c) {
		var d = a.current + b,
			e = b == 1 ? d == a.count ? 0 : d : d < 0 ? a.count - 1 : d;
		this.pos(e, c)
	};
	b.prototype.pos = function(b, c) {
		if(a.current != b) {
			var d = a.slides[b];
			for(var e = 0; e < a.count; e++) {
				a.slides[e].style.zIndex = e == b ? 3 : e == a.current ? 2 : 1
			}
			clearInterval(d.si);
			this.pause();
			if(a.nav) {
				for(var e = 0; e < a.count; e++) {
					a.nav[e].className = e == b ? a.activeClass : ""
				}
			}
			if(a.duration) {
				if(a.cssTrans) {
					if(d.className.indexOf("cp_fade") != -1) {
						d.className = d.className.replace(" cp_fade", "")
					}
					d.si = setTimeout(function() {
						d.className += " cp_fade"
					}, 20);
					if((c || a.auto && a.resume) && !a.slides.ai) {
						this.play()
					}
				} else {
					if(d.opacity >= 100) {
						d.opacity = d.style.opacity = 0;
						d.style.filter = "alpha(opacity=0)"
					}
					d.si = setInterval(new Function(a.n + ".fade(" + b + ", " + c + ")"), a.duration * 1e3 / 10)
				}
				a.current = b
			}
		}
	};
	b.prototype.fade = function(b, c) {
		var d = a.slides[b];
		if(d.opacity >= 100) {
			clearInterval(d.si);
			if((c || a.auto && a.resume) && !a.slides.ai) {
				this.play()
			}
		} else {
			d.opacity += 10;
			d.style.opacity = d.opacity / 100;
			d.style.filter = "alpha(opacity=" + d.opacity + ")"
		}
	};
	return {
		init: b
	}
}()/*  |xGv00|76b341a721d6059771bf41461ab3790c */