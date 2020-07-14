
$(document).ready(function () {
    var e = $("#theme").children(),
        a = $("#stage"),
        n = a.children(),
        i = $("#pager").children(),
        o = $(".super"),
        l = !1,
        t = a.find(".rocket"),
        s = o.find(".section5"),
        d = o.find(".launch"),
        c = $(".btn-download"),
        f = {
            onLeave: function (a, i) {
                e.filter(".active").fadeOut("slow", function () {
                    $(this).removeClass("active")
                }), e.eq(i - 1).fadeIn("slow").addClass("active"), n.eq(a - 1).find(".main").removeClass("playing").addClass(
                    "leaving"), l = !0, 1 == i && 7 == a ? (s.addClass("launch"), t.hide()) : (s.removeClass("launch"),
                    t.show())
            },
            afterLoad: function (e, a) {
                n.eq(a - 1).find(".main").removeClass("leaving").addClass("playing"), i.removeClass("active").eq(a - 1)
                    .addClass("active"), l = !1, 7 == a ? d.show() : d.hide()
				if(a == 4){
					$(".word3").addClass("animated rubberBand");	
				}else{
					$(".word3").removeClass("animated rubberBand");	
				}
				if(a == 5){
					$(".word4").addClass("animated fadeInDown");	
				}else{
					$(".word4").removeClass("animated fadeInDown");	
				}
				if(a == 6){
					$(".word5").addClass("animated fadeInUpBig");	
				}else{
					$(".word5").removeClass("animated fadeInUpBig");	
				}
            },
            afterRender: function () {
                a.find(".section1 .main").addClass("playing")
            },
            afterResize: function () {},
            afterSlideLoad: function () {},
            onSlideLeave: function () {}
        };
    a.fullpage({
        css3: !0,
        loopBottom: !0,
        scrollingSpeed: 800,
        keyboardScrolling: !0,
        afterRender: f.afterRender,
        onLeave: f.onLeave,
        afterLoad: f.afterLoad
    }), i.on("click", function () {
        var e = $(this),
            a = e.index();
        l || e.hasClass("active") || $.fn.fullpage.moveTo(a + 1)
    }), $(".links").on("click", "a", function () {
        var e = $(this),
            a = e.data("type");
        return "wp" == a ? !0 : (e.siblings().removeClass("active").end().addClass("active"), c.attr("href", e.attr(
            "href")).removeClass("android iphone").addClass(a), !l && 0 < i.filter(".active").index() && $.fn.fullpage.moveTo(
            1), !1)
    }), d.on("click", function () {
        l || $.fn.fullpage.moveTo(1)
    }), $(".btn-next").on("click", function () {
        $.fn.fullpage.moveSectionDown()
    })
});/*  |xGv00|c50566004d28c4bc10e562305dd35137 */