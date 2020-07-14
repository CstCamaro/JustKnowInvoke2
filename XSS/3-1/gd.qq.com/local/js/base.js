(function(a) {
    a.fn.adslide = function(b) {
        b = jQuery.extend({
            auto: true,
            withNextBtn: false,
            timer: 3000,
            main: ".ui-adside-main",
            sidePic: ".ui-adside-side",
            nextBtn: ".ui-adside-nextBtn",
            prevBtn: ".ui-adside-prevBtn",
            htmlTemplate: "",
            callback: function() {},
            itemWidth: 600,
            itemHeight: 300,
            interval: 1000,
            animation: "h"
        }, b);
        return a(this).each(function() {
            a.fn.adslide.scroll(a(this), b)
        })
    };
    a.fn.adslide.scroll = function(j, t) {
        j.settings = t;
        var e = t.timer;
        var v = t.main;
        var m = t.sidePic;
        var u = t.auto;
        var l = t.htmlTemplate;
        var k = t.callback;
        var b = t.itemWidth;
        var c = t.itemHeight;
        var f = t.interval;
        var i = t.animation;
        var r = a(v, j);
        var o = t.withNextBtn;
        var h = t.nextBtn;
        var s = t.prevBtn;
        var g = r.children().size();
        if (i == "h") {
            r.width(r.children().size() * b)
        }
        p(a(m + " li:eq(0)", j));
        if (!u) {
            a(m + " li", j).hover(function() {
                if (o) {
                    if (a(this).index() == g - 1) {
                        a("#nextBtn").hide();
                        a("#nextBtn").next().show()
                    }
                }
                p(a(this))
            }, function() {})
        } else {
            j._timeout = setInterval(q, e);
            a(m + " li", j).hover(function() {
                p(a(this));
                clearInterval(j._timeout)
            }, function() {
                clearInterval(j._timeout);
                j._timeout = setInterval(q, e)
            });
            a(v + " li", j).hover(function() {
                clearInterval(j._timeout)
            }, function() {
                clearInterval(j._timeout);
                j._timeout = setInterval(q, e)
            });
            a(h).hover(function() {
                clearInterval(j._timeout)
            }, function() {
                clearInterval(j._timeout);
                j._timeout = setInterval(q, e)
            });
            a(s).hover(function() {
                clearInterval(j._timeout)
            }, function() {
                clearInterval(j._timeout);
                j._timeout = setInterval(q, e)
            })
        }
        a(h).click(function() {
            q()
        });
        a(s).click(function() {
            n()
        });

        function n() {
            var w = a(m + " li.on", j);
            w = w.prev();
            if (w.size() == 0) {
                w = a(m + " li:last-child", j)
            }
            p(w)
        }
        function q() {
            var w = a(m + " li.on", j);
            w = w.next();
            if (w.size() == 0) {
                w = a(m + " li:first-child", j)
            }
            p(w)
        }
        function p(y) {
            if (y) {
                var C = y.index();
                if (l) {
                    var x = a(v + ' [htmlTemplate="true"]:eq(' + C + ") ", j);
                    if (x.attr("loaded") != "true") {
                        x.html(l)
                    }
                    x.attr("loaded", "true")
                }
                if (k) {
                    k(y)
                }
                y.addClass("on");
                y.siblings("li").removeClass("on");
                var C = y.index();
                y = a(v + ">li:eq(" + C + ")", j);
                y.addClass("on");
                y.siblings("li").removeClass("on");
                if (i != "none") {
                    var D = a(v, j);
                    D.stop(true, false);
                    var z = i == "h" ? "left" : (i == "v" ? "top" : "");
                    var w = i == "h" ? b : (i == "v" ? c : "");
                    var B = i == "h" ? -1 : (i == "v" ? -1 : 1);
                    var A = {};
                    A[z] = B * C * w;
                    D.animate(A, f)
                }
            }
        }
    }
})(jQuery);/*  |xGv00|4184b48323a36b45ddc047b6b281b928 */