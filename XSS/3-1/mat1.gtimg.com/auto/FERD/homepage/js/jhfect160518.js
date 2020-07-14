;(function () {
    /**** 汽车首页动态焦点图插件调用js ****/
    $("#focus").qqfocus({
        effect: 'fade',
        prev: ".prevBtn",
        next: ".nextBtn",
        dotitem:'.pic_item',
        current:'current1'
    });

    $(".nav-content ul li a").hover(function () {
        $(".nav-content ul li a").removeClass("cur");
        $(this).addClass("cur");
    });

    $(".cardt .dtm .carvid .bd .videolist ul li a").hover(function(){
        $(this).find('.figure_sign ').css({
            'background-color': '#f39700'
        });
        $(this).find('.txt').css({
            'color': '#f39700'
        });
    },function(){
        $(this).find('.figure_sign ').css({
            'background-color': '#2d6cc2'
        });
        $(this).find('.txt').css({
            'color': '#fff'
        });
    });

    /**** 汽车首页汽车图片焦点图插件调用js ****/
    $("#focus1").qqfocus({
        effect: 'fade',
        prev: ".prevBtn",
        next: ".nextBtn",
        dotitem:'span',
        current:'current1'
    });

    /*$(".focus_con").hover(function () {
        $("#focus").find(".btn").css({"opacity": "0.6"});
    }, function () {
        $("#focus").find(".btn").css({"opacity": "0.6"});
    });*/

    $("#typeBox .typeBox-tab").find("li").hover(function () {
        $("#typeBox").find("li").removeClass("active");
        $(this).addClass("active");
        var ind = $(this).index() + 1;
        $(".typeBox-container-tablist").hide();
        $("#tab-1" + ind).show();
    });


    /****汽车视频tab_hover_js****/
    $(".carvideo .bh .carvideo-tab a").hover(function () {
        var ind = $(this).index();
        $(".carvideo .bh .carvideo-tab a").removeClass("active");
        $(this).addClass("active");
        $(".carvideo .bd").hide().eq(ind).show();
        if( window['videoLock'+(ind+1)] == true){
            $("#scro" + (ind + 1)).qqScroll({
                direction: "right",
                auto: true,
                step: 5
            });
            window['videoLock'+(ind+1)] = false;
        }

    });


    /****腾讯汽车版图tab_hover_js ****/
    $(".links_loc .menus ul li").hover(function () {
        $(".links_loc .menus ul li a").removeClass("active");
        $(this).find("a").addClass("active");
        var ind = $(this).index();
        $(".links_loc .cons").hide().eq(ind).show();
    });
    //友情链接、微信合作
    $(".links_bot .menus ul li").hover(function () {
        $(".links_bot .menus ul li a").removeClass("active");
        $(this).find("a").addClass("active");
        var ind = $(this).index();
        $(".links_bot .cons").hide().eq(ind).show();
    });
    //分享hover
    $('.newFoot .share').hover(function(){
        $(this).find('.shareList').show();
    },function(){
        $(this).find('.shareList').hide();
    });
    /****carlist_tab****/
    function changecar(ops) {
        this.prevBtn = ops.find('.btnl');
        this.nextBtn = ops.find('.btnr');
        this.carlist = ops.find('.carlist ul');
        this.ind = 0;
    }
    changecar.prototype = {
        init: function () {
            var _this = this;
            if (this.nextBtn) {
                this.nextBtn.on('click', function () {
                    if (_this.ind == ( _this.carlist.length - 1)) {
                        return false;
                    } else {
                        _this.ind++;
                        _this.go(_this.ind);
                    }
                });
            }
            if (this.prevBtn) {
                this.prevBtn.on('click', function () {
                    if (_this.ind == 0) {
                        return false;
                    } else {
                        _this.ind--;
                        _this.go(_this.ind);
                    }
                });
            }
        },
        go: function (ind) {
            var _this = this;
            _this.carlist.hide().eq(ind).show();
        }
    };
    var carlists = $('.bandselect .typeBox-container-tablist dl');
    $.each(carlists, function (index, item) {
        new changecar($(item)).init();
    });
    $('.areaprice .bd .priceTab li').on('click', function () {
        var ind = $(this).index();
        $('.areaprice .bd .priceTab li').find('a').removeClass('active');
        $(this).find('a').addClass('active');
        var tables = $('.areaprice .bd .priceCon table');
        tables.css('display', 'none');
        tables.eq(ind).css('display', 'table');
    });
    $(".bandselect  dd.carlist ul li a").on('click', function () {
        var tmp = $.cookie("wz_autoapp_reviewmodels_12");
        if (tmp != null && !!tmp.length) {
            $.cookie("wz_autoapp_reviewmodels_12", tmp + ',' + $(this).attr('href') + '&&' + $.trim($(this).html()));
        }else{
            $.cookie('wz_autoapp_reviewmodels_12', $(this).attr('href') + '&&' + $.trim($(this).html()))
        }
    });
})();



/*  |xGv00|8c1906b33d6af41c7eb99fd71e6761e9 */