/* update: 2014-06-12 7:37 */

/**
 * Fixed({
 *    id: "menu",       容器ID
 *    distance: 100,    触发离顶部的距离
 *    stay: 30,         触发后离顶部的距离
 *    isTop: true       是否为顶部定位
 * });
 *
 * @author jianminlu
 * @update 2013-10-02 17:05
 * @version v0.2
 */
(function(W, D){
    Function.prototype.before = function(func) {
        var __self = this;
        return function() {
            if (func.apply(this, arguments) === false) {
                return false;
            }
            return __self.apply(this, arguments);
        }
    }
    var Fixed = W['Fixed'] = function(o){
        return new _Fixed(o);
    },
    _Fixed = function(o){
        this.id = o.id;               // obj id
        this.distance = o.distance != undefined ? o.distance : 0;   // 触发离顶部的距离
        this.stay = o.stay != undefined ? o.stay : 0;   // 触发离顶部的距离
        this.isTop = o.isTop != undefined ? o.isTop : false;
        this.init();
    }
    _Fixed.prototype = {
        setFixed: function (){
            var _this = this;
            var obj = D.getElementById(_this.id);
            var scrollTop = D.body.scrollTop || D.documentElement.scrollTop;
            var ie6 = !W.XMLHttpRequest;
            if(ie6){
                obj.className = obj.className;
            }
            if(!_this.isTop){  // top
                if(scrollTop > _this.distance - _this.stay){
                    obj.style.display = "block";
                    if(ie6){
                        obj.style.position = "absolute";
                    }else{
                        obj.style.position = "fixed";
                    }
                }else{
                    obj.style.display = "none";
                }
            }else{  // menu
                if(scrollTop > _this.distance - _this.stay){
                    if(ie6){
                        obj.style.top = scrollTop + _this.stay + "px";
                    }else{
                        obj.style.position = "fixed";
                        obj.style.top = _this.stay + "px";
                    }
                }else{
                    obj.style.position = "absolute";
                    obj.style.top = _this.distance + "px";
                }
            }
        },
        init: function(){
            var _this = this;
            W.onscroll = (W.onscroll || function(){}).before(function(){
                _this.setFixed();
            });
            _this.setFixed();
        }
    }
})(window, document);

/**
 * @author  jianminlu
 * @update  2014-03-17 11:20
 * @name    {Function}  countDown
 * @param   {Object}
 *      @domId      {String}    domID
 *      @startTime  {String}    2015/1/30 年/月/日 时:分:秒
 *      @endTime    {String     2014/1/30 年/月/日 时:分:秒
 *      @flag       {Boolean}   true / false
 */
(function(W, D){
    var countDown = W['countDown'] = function(o){
        return new _countDown(o);
    },
    _countDown = function(o){
        this.endTime = o.endTime;
        this.startTime = o.startTime;;
        this.dom = D.getElementById(o.domId);
        this.i = 0;
        this.flag = o.flag;
        this.init();
    };
    _countDown.prototype = {
        auto: function(){
            var _this = this;
            setTimeout(function(){
                _this.init(_this.endTime, _this.domId);
            }, 1000);
        },
        ten: function(t){
            if(t < 10){
                t = "0" + t;
            }
            return t;
        },
        init: function(){
            var _this = this,
                time = 0;
            _this.i ++;
            if(_this.flag){
                time = (new Date(_this.endTime).getTime() - new Date(_this.startTime).getTime() + 1000 * _this.i) / 1000 
            }else{
                time = (new Date(_this.endTime).getTime() - new Date(_this.startTime).getTime() - 1000 * _this.i) / 1000 
            }
            var day = _this.ten(Math.floor(time / (60 * 60 * 24))),
                hour = _this.ten(Math.floor(time /(60 * 60)) - day * 24),
                minute = _this.ten(Math.floor(time /60) - (day * 24 * 60) - (hour * 60)),
                second = _this.ten(Math.floor(time) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60));
            if( day > 0 ){
                _this.dom.innerHTML = "<span class='day'>" + day + "</span>\u5929";
            }else{
                _this.dom.innerHTML = "<span class='hour'>" + hour + "</span>\u5c0f\u65f6";
            }
            _this.auto();
        }
    }
})(window, document);

/**
 * @description scrollBar模拟滚动条事件 依赖 jQuery
 * @author jianminlu
 * @update 2014-05-13 17:10
 * @version v0.1
 */
(function($){
    var scrollBar = window['scrollBar'] = function(o){
        return new _scrollBar(o);
    },
    _scrollBar = function(o){
        var _this = this;
        this.mod = $("#" + o.mod);
        this.con = $("#" + o.con);
        this.bar = $("#" + o.bar);
        this.btn = $("#" + o.btn);
        this.dis = o.direction;
        this.range = o.range || 10;
        this.modH = this.dis == "y" ? this.mod.height() : this.mod.width();
        this.conH = this.dis == "y" ? this.con.height() : this.con.width();
        this.btnH = (this.modH * this.modH / this.conH) < 20 ? 20 : (this.modH * this.modH / this.conH);
        this.TxtScroll();
    };
    _scrollBar.prototype = {
        TxtScroll: function(){
            var _this = this;
            if(_this.conH - _this.modH > 0){
                if(_this.dis == "x"){
                    _this.bar.css({"width": _this.modH + "px"});
                }else{
                    _this.bar.css({"height": _this.modH + "px"});
                }
                _this.bar.show();
                _this.startDrag(_this.btn);
            }else{
                _this.bar.hide();
            }
            if(_this.dis == "x"){
                _this.btn.css({"width": _this.btnH + "px"});
            }else{
                _this.btn.css({"height": _this.btnH + "px"});
            }
        },
        startDrag: function(btn){
            var _this = this,
                _move = false,  //移动标记
                _y; //鼠标离控件左上角的相对位置
            btn.click(function(){}).mousedown(function(e){
                _move = true;
                if(_this.dis == "x"){
                    _y = e.pageX - parseInt(btn.css("left"));
                }else{
                    _y = e.pageY - parseInt(btn.css("left"));
                }
                btn.fadeTo(20, 0.9);    //点击后开始拖动并透明显示
                return false;
            });
            $(document).mousemove(function(e){
                if(_move){  //移动时根据鼠标位置计算控件左上角的绝对位置
                    if(_this.dis == "x"){
                        _this.drag(e.pageX - _y);
                    }else{
                        _this.drag(e.pageY - _y);
                    }
                }
            }).mouseup(function(){
                _move = false;
                btn.fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
            });
            _this.con.bind('mousewheel DOMMouseScroll', function(e, delta){
                if(_this.bar.css('display') == 'none') return;
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
                var delta = parseInt(e.originalEvent.wheelDelta || - e.originalEvent.detail);
                var y = parseInt(btn.css("left"));
                if(delta < 0){
                    y += _this.range;
                }else{
                    y -= _this.range;
                }
                _this.drag(y);
                return false;
            });
        },
        drag: function (y){
            var _this = this;
            if(y <= 0){
                y = 0;
            }else if( y >= (_this.modH - _this.btnH)){
                y = (_this.modH - _this.btnH)
            }
            var t = (_this.modH - _this.conH) * y / (_this.modH - _this.btnH);
            if(_this.dis == "x"){
                _this.btn.css({"left": y});
                _this.con.css({"left": t});
            }else{
                _this.btn.css({"top": y});
                _this.con.css({"top": t});
            }
            return this;
        },
        scrollTo: function(t){
            var _this = this;
            var y = -(_this.modH - _this.btnH) * t / (_this.modH - _this.conH);
            if(y <= 0){
                y = 0;
            }else if( y >= (_this.modH - _this.btnH)){
                y = (_this.modH - _this.btnH)
            }
            var t = (_this.modH - _this.conH) * y / (_this.modH - _this.btnH);
            if(_this.dis == "x"){
                _this.btn.animate({"left": y});
                _this.con.animate({"left": t});
            }else{
                _this.btn.animate({"top": y});
                _this.con.animate({"top": t});
            }
            return this;
        }
    }
})(jQuery);

/**
 * @version 0.2
 * @author  jianminlu
 * @update  2013-07-02 11:19
 */
(function($){
    // 默认值
    $.qqScroll = {
        defaults:{
            direction:"right",  // 滚动方向
            step:1,             // 滚动步长
            speed:800,          // 滚动速度
            time:4000,          // 自动滚动间隔时间
            auto:true,          // 是否自动滚动
            prev:".prev",       // prev 按钮class
            next:".next",        // next 按钮class
            inner:".inner",        // next 按钮class
            list:".list",        // next 按钮class
            split:".split"        // next 按钮class
        }
    }
    /**
     * @name    wbScroll    微博滚动函数
     * @param   {Object}    初始值
     */
    $.fn.qqScroll = function (options){

        var opts = $.extend({}, $.qqScroll.defaults, options),
            obj = $(this),
            scroller = {};

            scroller.box = obj.find(opts.inner);
            scroller.list = scroller.box.find(opts.list);
            scroller.items = scroller.list.find(opts.split);
            scroller.itemSum = scroller.items.length;
            scroller.prevBtn = obj.find(opts.prev);
            scroller.nextBtn = obj.find(opts.next);
            scroller.itemWidth = scroller.items.outerWidth();
            scroller.itemHeight = scroller.items.outerHeight();

        scroller.fn = {
            start: function() {
                if (!opts.auto) {
                    return;
                }
                scroller.fn.stop();
                scroller.run = setTimeout(function() {
                    scroller.fn.goto(opts.direction);
                }, opts.time);
            },
            stop: function() {
                if (typeof(scroller.run) !== "undefined") {
                    clearTimeout(scroller.run);
                }
            },
            addControl: function() {
                if (scroller.prevBtn.length) {
                    scroller.prevBtn.bind("click", function() {
                        scroller.fn.goto(scroller.prevVal);
                    });
                }
                if (scroller.nextBtn.length) {
                    scroller.nextBtn.bind("click", function() {
                        scroller.fn.goto(scroller.nextVal);
                    });
                }
            },
            removeControl: function() {
                if (scroller.prevBtn.length) {
                    scroller.prevBtn.unbind("click");
                }
                if (scroller.nextBtn.length) {
                    scroller.nextBtn.unbind("click");
                }
            },
            goto: function(d) {
                scroller.fn.stop();
                scroller.fn.removeControl();
                scroller.box.stop(true);
                var _max;
                var _dis;
                switch (d) {
                    case "left":
                    case "top":
                        _max = 0;
                        if (d == "left") {
                            if (parseInt(scroller.box.scrollLeft(), 10) == 0) {
                                scroller.box.scrollLeft(scroller.itemSum * scroller.moveVal);
                            }
                            _dis = scroller.box.scrollLeft() - (scroller.moveVal * opts.step);

                            if (_dis < _max) {
                                _dis = _max
                            }
                            scroller.box.animate({"scrollLeft": _dis}, opts.speed, function() {
                                if (parseInt(scroller.box.scrollLeft(), 10) <= _max) {
                                    scroller.box.scrollLeft(0);
                                }
                                scroller.fn.addControl();
                            });
                        } else {
                            if (parseInt(scroller.box.scrollTop(), 10) == 0) {
                                scroller.box.scrollTop(scroller.itemSum * scroller.moveVal);
                            }
                            _dis = scroller.box.scrollTop() - (scroller.moveVal * opts.step);
                            if (_dis < _max) {
                                _dis = _max
                            }
                            scroller.box.animate({"scrollTop": _dis}, opts.speed, function() {
                                if (parseInt(scroller.box.scrollTop(), 10) <= _max) {
                                    scroller.box.scrollTop(0);
                                }
                                scroller.fn.addControl();
                            });
                        }
                        break;
                    case "right":
                    case "bottom":
                        _max = scroller.itemSum * scroller.moveVal;
                        if (d == "right") {
                            _dis = scroller.box.scrollLeft() + (scroller.moveVal * opts.step);
                            if (_dis > _max) {
                                _dis = _max
                            }
                            scroller.box.animate({"scrollLeft": _dis}, opts.speed, function() {
                                if (parseInt(scroller.box.scrollLeft(), 10) >= _max) {
                                    scroller.box.scrollLeft(0);
                                }
                            });
                        } else {
                            _dis = scroller.box.scrollTop() + (scroller.moveVal * opts.step);
                            if (_dis > _max) {
                                _dis = _max
                            }
                            scroller.box.animate({"scrollTop": _dis}, opts.speed, function() {
                                if (parseInt(scroller.box.scrollTop(), 10) >= _max) {
                                    scroller.box.scrollTop(0);
                                };
                            });
                        }
                        break;
                }
                scroller.box.queue(function() {
                    scroller.fn.addControl();
                    scroller.fn.start();
                    $(this).dequeue();
                });
            },

            init: function(){

                if (scroller.itemSum <= 1) {
                    return;
                }

                if (opts.direction == "left" || opts.direction == "right") {
                    if (scroller.itemWidth * scroller.itemSum <= scroller.box.outerWidth()) {return;}
                    scroller.prevVal = "left";
                    scroller.nextVal = "right";
                    scroller.moveVal = scroller.itemWidth;
                } else {
                    if (scroller.itemHeight * scroller.itemSum <= scroller.box.outerHeight()) {return;}
                    scroller.prevVal = "top";
                    scroller.nextVal = "bottom";
                    scroller.moveVal = scroller.itemHeight;
                }

                scroller.list.append(scroller.list.html());
                if (opts.direction == "left" || opts.direction == "right") {
                    scroller.list.css({
                        width: scroller.itemWidth * scroller.itemSum * 2 + "px"
                    })
                }

                scroller.box.hover(function() {
                    scroller.fn.stop();
                }, function() {
                    scroller.fn.start();
                });
                scroller.fn.addControl();
                scroller.fn.start();
            }
        }

        scroller.fn.init();
    }
})(jQuery);

/**
 * @version 0.3 添加左右按钮, 修改按钮bug
 * @author  jianminlu
 * @update  2014-02-13 11:46
 */
(function($){
    /**
     * @name    qqfocus     页卡函数
     * @param   {Object}    初始值
     */
    $.fn.qqfocus = function(options){
        var focuser = {};
        var opts = $.extend({}, {
            event: 'mouseover',     //mouseover click
            conbox: '.focus_con',   //内容容器
            condot: '.focus_dot',   //切换容器
            conitem: '.item',       //内容标签class
            dotitem: 'a',           //切换器标签 默认为a
            current: 'current',     //切换样式
            effect: 'fade',         //切换效果 scrollx|scrolly|fade|none
            speed: 1000,            //动画速度
            space: 3000,            //时间间隔
            auto: true,              //自动滚动
            prev: ".prevBtn",
            next: ".nextBtn"
        }, options);
        focuser.timer = "";
        focuser.index = 0;
        focuser.last_index = 0;
        focuser.conbox = $(this).find(opts.conbox);
        focuser.conitem = focuser.conbox.find(opts.conitem);
        focuser.condot = $(this).find(opts.condot);
        focuser.dotitem = focuser.condot.find(opts.dotitem);
        focuser.prev = $(this).find(opts.prev);
        focuser.next = $(this).find(opts.next);

        focuser.fn = {
            slide: function () {
                if (focuser.index >= focuser.conitem.length){
                    focuser.index = 0;
                }
                focuser.dotitem.removeClass(opts.current).eq(focuser.index).addClass(opts.current);
                switch (opts.effect) {
                    case 'scrollx':
                        focuser.conitem.css({"float":"left"});
                        focuser.conbox.css({"position": "relative"});
                        focuser.conbox.width(focuser.conitem.length * focuser.conitem.width());
                        focuser.conbox.stop().animate({left:-focuser.conitem.width() * Math.abs(focuser.index) + 'px'}, opts.speed);
                        break;
                    case 'scrolly':
                        focuser.conitem.css({display:'block'});
                        focuser.conbox.css({"position": "relative"});
                        focuser.conbox.stop().animate({top:-focuser.conitem.height() * Math.abs(focuser.index) + 'px'}, opts.speed);
                        break;
                    case 'fade':
                        if(focuser.conbox.css('opacity') == 1){
                            focuser.conbox.css('opacity', 0);
                        }
                        focuser.conbox.animate({'opacity':1}, opts.speed / 2);
                        focuser.conitem.eq(focuser.last_index).stop().css('display', "none").end().eq(focuser.index).css('display', "block").stop();
                        break;
                    case 'none':
                        focuser.conitem.hide().eq(focuser.index).show();
                        break;
                }
                focuser.last_index = focuser.index;
                focuser.index ++;
            },
            next: function(){
                focuser.fn.stop();
                focuser.fn.slide();
                focuser.fn.play();
            },
            prev: function () {
                focuser.index = focuser.index <= -focuser.conitem.length+2 ? 8 : focuser.index - 2;
                focuser.fn.stop();
                focuser.fn.slide();
                focuser.fn.play();
            },
            stop: function(){
                clearInterval(focuser.timer);
            },
            play: function(){
                if (opts.auto) {
                    focuser.timer = setInterval(focuser.fn.slide, opts.space);
                }
            },
            init: function(){
                if (opts.effect == 'fade') {
                    focuser.conitem.eq(focuser.index).css({'display':"block"}).siblings().css({'display':"none"});
                }
                if (opts.auto){
                    focuser.fn.play();
                }else{
                    focuser.fn.stop();
                }
                focuser.dotitem.bind(opts.event, function() {
                    focuser.index = $(this).index();
                    focuser.fn.stop();
                    focuser.fn.slide();
                    focuser.fn.play();
                });
                focuser.conbox.hover(focuser.fn.stop, focuser.fn.play);
                focuser.fn.slide();
                focuser.prev.bind("click", focuser.fn.prev);
                focuser.next.bind("click", focuser.fn.next);
            }
        };
        focuser.fn.init();
    }
})(jQuery);


//(function(){

    // 积分榜页卡
    var groupTab = {
        tab: function(i){
            $("#rank_tabs .hd_item").removeClass("hover").eq(i).addClass("hover");
            $("#rank_tabs .bd_item").hide().eq(i).show();
        },
        init: function(){
            var _this = this;
            _this.tab(0);
            $("#rank_tabs .hd_item").each(function(index, obj){
                $(obj).hover(function(){
                    _this.tab(index);
                }, function(){
                    _this.tab(index);
                });
            });
        }
    };

    // 全部赛程弹层
    var matchAll = {
        hideTip: function(){
            var _btn = $("#match_all_btn");
            _btn.css({"z-index":"2"});
            _btn.find(".txt").html("\u5168\u90e8\u8d5b\u7a0b");
            _btn.find("i").removeClass("up");
            $("#page_tips").animate({height:"0"}, function(){
                $("#page_tips").hide();
                $("#page_bg").hide();
            })
        },
        showTip: function(){
            var _btn = $("#match_all_btn");
            _btn.css({"z-index":"10003"});
            _btn.find(".txt").html("\u9690\u85cf\u8d5b\u7a0b");
            _btn.find("i").addClass("up");
            $("#page_bg").show();
            $("#page_tips").show().animate({height:"805px"}, 600);
        },
        tab: function(index){
            $("#match_all .hd h2").removeClass("current").eq(index).addClass("current");
            $("#match_all .tab_item").hide().eq(index).show();
        },
        init: function(){
            var _this = this;
            // tab
            _this.tab(0);
            $("#match_all .hd h2").each(function(index, obj){
                $(obj).hover(function(){
                    _this.tab(index);
                });
            });
            // tips
            var _h = $(document).height();
            $("#page_bg").css({height: _h + "px"}).bind("click", function(){
                _this.hideTip();
            });
            $("#match_all_btn").bind("click", function(){
                if(!$("#match_all_btn i").hasClass("up")){
                    _this.showTip();
                    // 全部赛程订阅
                    dingYue.init();
                }else{
                    _this.hideTip();
                }
            });
        }
    }

    // 赛程滚动条
    var matchScroll = {
        domSC: $("#sc_list"),
        setWidth: function(){
            var _this = this;
            var len = _this.domSC.find(".item").length;
            var w = _this.domSC.find(".item").outerWidth();
            _this.domSC.css({width: len * w + "px"});
        },
        hover: function(){
            this.domSC.find(".item").hover(function(){
                $(this).find(".ft").stop().animate({top: "-55px"});
            }, function(){
                $(this).find(".ft").stop().animate({top: "0px"});
            });
        },
        bar: function(){
            var _this = this;
            var len = _this.domSC.find(".status_3").length;
            var bar = scrollBar({
                direction: "x",
                range: 10,
                mod: "mod_top_sc",
                con: "sc_list",
                bar: "scroll_bar",
                btn: "scroll_btn"
            });
            if(len){
                bar.scrollTo(170 * (len - 2));
            }
            return bar;
        },
        init: function(){
            this.setWidth();
            this.hover();
            this.bar();
        }
    };

    // 视频节目导航
    var mainNav = {
        sh: 300,
        side: $("#nav_side"),
        falg: 0,
        template: function(){
            $.getScript("http://mat1.gtimg.com/news/tenyears/pc/template.js");
        },
        vlist: function(obj, idx, vids, vtype){
            var _this = this;
            var vid = vids.join();
            var arrData = {
                list: []
            };
            var _adHtml = "";
            $.ajax({
                url: "http://data.video.qq.com/fcgi-bin/data?tid=" + vtype + "&appid=10001009&appkey=c5a3e1529a7ba805&otype=json&idlist=" + vid,
                dataType: "jsonp",
                success: function(res){
                    if(res.results){
                        // 视频
                        if(vtype == 44 && res.results.length > 0){
                            for(var i = 0, l = res.results.length; i < l; i ++){
                                arrData.list.push(res.results[i]["fields"]);
                            }
                        }
                        // 专辑
                        if(vtype == 43 && res.results.length > 0){
                            for(var i = 0, l = res.results.length; i < l; i ++){
                                //arrData.list = res.results[i]["fields"]["c_vids"];
                                arrData.list.push(res.results[i]["fields"]);
                            }
                            for(var i = 0; i < arrData.list.length; i ++){
                                arrData.list[i].c_pic_228_128 = arrData.list[i].c_pic2_url;
                                arrData.list[i].c_play_url = arrData.list[i].c_url;
                            }
                        }
                        // 判断是否有广告
                        if($(obj).attr("data-ad")){
                            var _src = $(obj).attr("data-ad");
                            var _url = $(obj).attr("data-ad-url");
                            arrData.list = arrData.list.length > 4 ? arrData.list.slice(0, 4) : arrData.list;
                            $(".mod_v[tips-item=" + idx + "] .v_list").addClass("ad_list");
                            _adHtml = '<li class="ad_box"><a href="' + _url + '" target="_blank"><img src="' + _src + '"></a></li>';
                        };
                        arrData.list.length = arrData.list.length > 8 ? 8 :arrData.list.length;
                        // 填充模板
                        $(".mod_v[tips-item=" + idx + "] .v_list").html(_adHtml + template.render("vlistHtml", arrData));

                        var _info = $("#nav_info");
                        var _fh = _this.side.find(".bd").offset().top;
                        var _wh = $(window).height() + $(window).scrollTop();
                        var _ih = _info.outerHeight();
                        var _idx = $(obj).attr("data-item");
                        var _idlm = $(obj).attr("data-id");

                        var _top = $(obj).offset().top > (_wh - _ih) ? (_wh - _ih - _fh) : $(obj).offset().top - _fh;
                        _top = _top < -1 ? -1 : _top;
                        _this.side.find(".n_item").removeClass("current");
                        $(obj).addClass("current");
                        _info.find(".mod_v").hide();
                        _info.find(".mod_v[tips-item="+_idx+"]").show();
                        _info.stop().animate({top: _top + "px"}, 50).show();

                    }
                }
            });
        },
        vlm: function(obj, lmid, idx){
            var _this = this,
                vids = [],
                vtype = "";
            var _adHtml = "";
            $.ajax({
                url: "http://v.qq.com/worldcup2014/json/" + lmid + ".json",
                dataType: "script",
                success: function() {
                    var res = QZOutputJson;
                    if(res.data && res.data.length > 0){
                        var _len = res.data.length > 8 ? 8 : res.data.length
                        for(var i = 0; i < _len; i ++){
                            if(res.data[i].video_id){
                                vids.push(res.data[i].video_id);
                                vtype = 44;
                            }
                            if(res.data[i].cover_id){
                                vids.push(res.data[i].cover_id);
                                vtype = 43;
                            }
                        }
                        _this.vlist(obj, idx, vids, vtype);
                        _this.flag = 1;
                    }else{
                        if($(obj).attr("data-ad")){
                            var _src = $(obj).attr("data-ad");
                            var _url = $(obj).attr("data-ad-url");
                            $(".mod_v[tips-item=" + idx + "] .v_list").addClass("ad_list");
                            _adHtml = '<li class="ad_box"><a href="' + _url + '" target="_blank"><img src="' + _src + '"></a></li>';
                        }else{
                            _adHtml = "";
                        }
                        $(".mod_v[tips-item=" + idx + "] .v_list").html('<li class="no-data">\u6682\u65e0\u6570\u636e</li>' + _adHtml);
                        _this.flag = 0;
                    }
                    $(obj).attr({"flag": _this.flag});
                }
            });
        },
        showTips: function(obj){

            var _this = this;
            var _info = $("#nav_info");
            var _fh = _this.side.find(".bd").offset().top;
            var _wh = $(window).height() + $(window).scrollTop();
            var _ih = _info.outerHeight();
            var _idx = $(obj).attr("data-item");
            var _idlm = $(obj).attr("data-id");

            var _top = $(obj).offset().top > (_wh - _ih) ? (_wh - _ih - _fh) : $(obj).offset().top - _fh;
            _top = _top < -1 ? -1 : _top;
            _this.side.find(".n_item").removeClass("current");
            $(obj).addClass("current");
            _info.find(".mod_v").hide();
            _info.find(".mod_v[tips-item="+_idx+"]").show();
            _info.stop().animate({top: _top + "px"}, 50).show();

            if($(obj).attr("data") == undefined || $(obj).attr("flag") == 0){
                _this.vlm(obj, _idlm, _idx);
                $(obj).attr({"flag": _this.flag});
            }
        },
        hideTips: function(){
            $("#nav_info").stop().hide();
            this.side.find(".n_item").removeClass("current");
        },
        hideSide: function(){
            this.hideTips();
            $("#nav_side .bd").animate({top: "45px"});
        },
        scroll: function(){
            var _st = $(document).scrollTop();
            var _t = this.sh - _st + 45 < -762 ? -762 : this.sh - _st + 45;
            if(_st > this.sh){
                $("#mod_nav_inner").addClass("fixed");
                if($.browser.msie && $.browser.version <= 6){
                    $("#nav_side .bd").css({top: "45px"});
                }else{
                    $("#nav_side .hd").css({"cursor": "pointer"});
                    $("#nav_side .bd").css({top: _t + "px"});
                    $("#nav_side .hd i").show().addClass("up");
                }
                $("#nav_info").hide();
                $("#nav_side .hd .n_item").removeClass("current");
            }else{
                $("#nav_side .hd i").hide().addClass("up");
                $("#nav_side .hd").css({"cursor": "default"});
                $("#mod_nav_inner").removeClass("fixed");
                $("#nav_side .bd").css({top: "45px"});
            }
        },
        toggle: function(){
            var _this = this;
            $("#nav_side .hd").bind("click", function(){
                var _i = $(this).find("i");
                var _st = $(document).scrollTop();
                if(_st > _this.sh){
                    if(_i.hasClass("up")){
                        _i.removeClass("up");
                        $("#nav_side .bd").animate({top: "45px"});
                    }else{
                        _i.addClass("up");
                        $("#nav_side .bd").animate({top: _this.sh - _st + 45 + "px"});
                        $("#nav_info").hide();
                        $("#nav_side .hd .n_item").removeClass("current");
                    }
                }
            });
        },
        init: function(){
            var _this = this;
            _this.toggle();
            _this.template();

            var flag = true;
            $("#nav_side .n_item").each(function(index, obj){
                $(obj).mouseenter(function(){
                    _this.showTips(this);
                });
            });
            $("#nav_side").mouseleave(function(){
                _this.hideTips();
            });
            $("#nav_info .info_close").bind("click", function(){
                _this.hideTips();
            });
        }
    }

    // 全部赛程订阅
    var dingYue = {
        txt: ["订阅", "已订阅"],
        siteUrl: "http://sportswebapi.qq.com",
        loadData: function(o){
            var _this = this;
            $.ajax({
                url: this.siteUrl + "/user/attendMatch?matchId=" + o.matchId + "&competitionId=" + o.competitionId + "&type=" + o.type + "&callback=&t=",
                dataType: 'jsonp',
                success: function(data){
                    if(data[0] == 4){
                        window.userLogin();
                        window.loginAllCallBack = function(){
                            _this.loadData(o);
                        };
                    }else{
                        if(o.type == 1){
                            $(o.obj).attr({"title": _this.txt[1]}).addClass("dy_on");
                            $(o.obj).find("b").html(_this.txt[1]);
                        }else{
                            $(o.obj).attr({"title": _this.txt[0]}).removeClass("dy_on");
                            $(o.obj).find("b").html(_this.txt[0]);
                        }
                    }
                }
            });
        },
        checkData:function(o){
            var _this = this;
            $.ajax({
                url: this.siteUrl + "/pinMatch/hasAttendMatches?mixedMatchIds=" + o.competitionId + "_" + o.matchId + "&callback=&t=",
                dataType: 'jsonp',
                success: function(data){
                    if(data[1][0] && data[1][0].hasAttend == 1){
                        $(o.obj).attr({"title": _this.txt[1]}).addClass("dy_on");
                        $(o.obj).find("b").html(_this.txt[1]);
                    }else{
                        $(o.obj).attr({"title": _this.txt[0]}).removeClass("dy_on");
                        $(o.obj).find("b").html(_this.txt[0]);
                    }
                }
            });
        },
        init: function(){
            var _this = this;
            $("#match_all .dy").each(function(index, obj){
                _this.checkData({
                    matchId: $(obj).attr("matchId"),
                    competitionId: $(obj).attr("competitionId"),
                    obj: obj
                })
            });
            $("#match_all .dy").live("click", function(){
                var type = 1;
                if($(this).hasClass("dy_on")){
                    type = 0;
                }
                _this.loadData({
                    matchId: $(this).attr("matchId"),
                    competitionId: $(this).attr("competitionId"),
                    type: type,
                    obj: this
                });
            });
        }
    }

    // 会员页卡
    var qqVip = {
        tab: function(i){
            $("#mod_vip_tab .tab_hd a").removeClass("hover").eq(i).addClass("hover");
            $("#mod_vip_tab .focus").removeClass("current").eq(i).addClass("current");
        },
        init: function(){
            var _this = this;
            _this.tab(0);
            $("#mod_vip_tab .tab_hd a").each(function(index, obj){
                $(obj).hover(function(){
                    _this.tab(index);
                });
            });
            $("#focus_vip1").qqfocus({
                effect: 'scrollx',
                speed: 500,
                space: 5000
            });
            $("#focus_vip2").qqfocus({
                effect: 'scrollx',
                speed: 500,
                space: 5000
            });
            $("#focus_vip3").qqfocus({
                effect: 'scrollx',
                speed: 500,
                space: 5000
            });
        }
    }

    // 高清组图
    var HDpic = {
        init: function(){
            var _dom = $(".mod_pics .shadow");
            var _len = _dom.length;
            _dom.each(function(index, obj){
                var r = parseInt(Math.random()*10) % 2;
                if(r && index > 0){
                    _dom.eq(index).addClass("shadow2");
                }
            });
        }
    }

    // 地方站选择城市
    var citySel = {
        data:{
            "\u4e0a\u6d77": "sh",
            "\u5e7f\u4e1c": "gds",
            "\u91cd\u5e86": "cq",
            "\u9655\u897f": "sx",
            "\u6e56\u5357": "hn",
            "\u6e56\u5317": "hb",
            "\u798f\u5efa": "fj",
            "\u6cb3\u5357": "ha",
            "\u6d59\u6c5f": "zj",
            "\u8fbd\u5b81": "ln",
            "\u6c5f\u82cf": "js"
        },
        getData: function(city){
            var _this = this;
            $.ajax({
                dataType: "html",
                //contentType: "text/html;charset=gb2312",
                contentType: "application/x-www-form-urlencoded;charset=gb2312",
                url: "/index_inc/dfz/" + city + "/jnh.htm?t=" + new Date().getTime(),
                success: function(msg) {
                    $("#dfz_jnh").html(msg);
                    _this.scrollFn();
                }
            });
        },
        scrollFn: function(){
            $("#dfz_jnh").qqScroll({
                direction: "bottom",
                list:".pic_list",
                auto: false,
                step: 4
            });
        },
        init: function(){
            var _this = this;
            var _sel = $("#sel_city");
            _this.scrollFn();
            _sel.hover(function(){
                $(this).addClass("hover");
            }, function(){
                $(this).removeClass("hover");
            });
            $.getScript("http://fw.qq.com:80/ipaddress", function(){
                if(IPData && IPData[2] && _this.data[IPData[2].substr(0, 2)]){
                    var _city = IPData[2].substr(0, 2);
                    _this.getData(_this.data[_city]);
                    $("#sel_city .opt").html(_city + '<i class="icons fr"></i>');
                }
            });
            _sel.find(".sel_list a").removeClass("hover").eq(1).addClass("hover");
            _sel.find(".sel_list a").each(function(index, obj){
                var _city = $(this).html();
                $(obj).click(function(){
                    _this.getData(_this.data[_city]);
                    _sel.find(".sel_list a").removeClass("hover");
                    $(this).addClass("hover");
                    $("#sel_city .opt").html($(this).html() + '<i class="icons fr"></i>');
                });
            });
        }
    }

    // 导航地方站
    var navDfz = {
        init: function(){
            $("#nav_dfz").mouseenter(function(){
                $(this).addClass("hover").find(".sel_list").animate({height:"336px"});
            }).mouseleave(function(){
                $(this).removeClass("hover").find(".sel_list").animate({height:"0"});
            });
        }
    }

    // 热点新闻刷新
    var hotNews = {
        load: function(obj, url, callback){
            $.ajax({
                url: url + "?t=" + new Date().getTime(),
                success: function(res){
                    obj.parent().find(".inner").html(res);
                    callback();
                }
            });
        },
        init: function(callback){
            var _this = this;
            $(".scroll_B .refresh").click(function(){
                $(this).addClass("refresh_bg").find(".icons").addClass("data_loading");
                var _url = $(this).attr("data-url");
                _this.load($(this), _url, callback);
            });
        }
    }

//})(jQuery);/*  |xGv00|3d7b6fc2852160c8eeacff6e37ad6d9d */