/**
 * @ version v0.1
 * @ author  wpzheng
 * @ update  2016-03-07 19:23
 */

(function($){

    // 默认取值
    $.paraScroll = {
        direction:"right",      //滚动方向
        step :1,               //滚动步长
        speed:800,            //滚动速度
        time:4000,           //自动滚动间隔时间 
        auto:true,          //是否自动滚动
        prev:".prev",      //按钮CLASS值 
        next:".next",     //按钮CLASS值
        inner:".inner",  //包裹元素CLASS值
        list:".list",   //UL的CLASS值
        split:".split" //LI的CLASS值
    }

    $.fn.paraScroll = function (options) {
         var opts = $.extend({}, $.paraScroll, options),
            obj = $(this),
            scroller = {};

            scroller.box = obj.find(opts.inner);              // inner
            scroller.list = scroller.box.find(opts.list);    // ul
            scroller.items = scroller.list.find(opts.split);// li
            scroller.itemSum = scroller.items.length;      // 个数
            scroller.prevBtn = obj.find(opts.prev);
            scroller.nextBtn = obj.find(opts.next);
            scroller.itemWidth = scroller.items.outerWidth(); // 包括padding+border 不包括margin ,若outerWidth(true) 就包括margin
            scroller.itemHeight = scroller.items.outerHeight();
            scroller.itemallWidth=0;


            // MAIN FUNCTION
            scroller.fn = {
                navCon:function(v){
                    var item = 0;
                    if(v == scroller.itemallWidth){
                        item = 1;
                    }else{
                        item = scroller.itemSum-((scroller.itemallWidth-v)/scroller.itemWidth-1);
                    }
                    obj.find(".scroll-dotted li").removeClass("current");
                    obj.find(".scroll-dotted li").eq(item-1).addClass("current");
                },
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
                            _max = 0;
                            if (parseInt(scroller.box.scrollLeft(), 10) == 0) {
                                scroller.box.scrollLeft(scroller.itemSum * scroller.moveVal);
                            }
                            _dis = scroller.box.scrollLeft() - (scroller.moveVal * opts.step);
                            scroller.fn.navCon(_dis);
                            scroller.box.animate({"scrollLeft": _dis}, opts.speed, function() {});
                            break;
                        case "top":
                            _max = 0;
                            if (parseInt(scroller.box.scrollTop(), 10) == 0) {
                                scroller.box.scrollTop(scroller.itemSum * scroller.moveVal);
                            }
                            _dis = scroller.box.scrollTop() - (scroller.moveVal * opts.step);
                            scroller.fn.navCon(_dis);
                            scroller.box.animate({"scrollTop": _dis}, opts.speed, function() {});
                            break;
                        case "right":
                            _max = scroller.itemSum * scroller.moveVal;
                            _dis = scroller.box.scrollLeft() + (scroller.moveVal * opts.step);
                            scroller.fn.navCon(_dis);
                            scroller.box.animate({"scrollLeft": _dis}, opts.speed, function() {
                                if (parseInt(scroller.box.scrollLeft(), 10) >= _max) {
                                    scroller.box.scrollLeft(0);
                                };
                            });
                            break;
                        case "bottom":
                            _max = scroller.itemSum * scroller.moveVal;
                            _dis = scroller.box.scrollTop() + (scroller.moveVal * opts.step);
                            scroller.fn.navCon(_dis);
                            scroller.box.animate({"scrollTop": _dis}, opts.speed, function() {
                                if (parseInt(scroller.box.scrollTop(), 10) >= _max) {
                                    scroller.box.scrollTop(0);
                                };
                            });
                            break;
                    }
                    scroller.box.queue(function() {
                        scroller.fn.addControl();
                        scroller.fn.start();
                        $(this).dequeue();
                    });
                },
                init: function(){
               
                    // 当为一个li时不滚动
                    if (scroller.itemSum <= 1) {
                        return; 
                    }

                    // 判断上下/左右滚动
                    if (opts.direction == "left" || opts.direction == "right") {
                        scroller.itemallWidth = scroller.itemWidth * scroller.itemSum;
                        if ( scroller.itemallWidth <= scroller.box.outerWidth()) {return;}
                        scroller.prevVal = "left";
                        scroller.nextVal = "right";
                        scroller.moveVal = scroller.itemWidth;
                    } else {
                        scroller.itemallWidth = scroller.itemHeight * scroller.itemSum;
                        if ( scroller.itemallWidth <= scroller.box.outerHeight()) {return;}
                        scroller.prevVal = "top";
                        scroller.nextVal = "bottom";
                        scroller.moveVal = scroller.itemHeight;
                    }
                     // 初始化点
                    var _dottedHtml = "";
                    for(var j=0;j<scroller.itemSum;j++){
                        if(j==0){
                            _dottedHtml += '<li class="current" data-slide="'+scroller.moveVal*j+'">1</li>';
                        }else{
                            _dottedHtml += '<li data-slide="'+scroller.moveVal*j+'">'+(j+1)+'</li>';
                        }  
                    }
                    obj.find(".scroll-dotted").html(_dottedHtml);
 
                    /**
                     *  点击dotted代码初始化
                     *  鼠标移入是停止自动滚动
                     *****************************/
                    $(".scroll-dotted li").on("click",function(){
                        var _scrolldistance = $(this).attr("data-slide");
                            _scrolldistance = Number(_scrolldistance);
                        $(".scroll-dotted li").removeClass("current");
                        $(this).addClass("current");
                        // 左右滚动
                        if(opts.direction == "left" || opts.direction == "right"){
                            scroller.box.animate({"scrollLeft":_scrolldistance}, opts.speed, function() {});
                        }
                        // 上下滚动
                        if(opts.direction == "top" || opts.direction == "bottom"){
                            scroller.box.animate({"scrollTop": _scrolldistance}, opts.speed, function() {});
                        }
                    })
                    $(".scroll-dotted").hover(function(){
                        scroller.fn.stop();
                    },function(){
                        scroller.fn.start();
                    })

                    // 克隆+设置UL宽度
                    scroller.list.append(scroller.list.html());
                    if (opts.direction == "left" || opts.direction == "right") {
                        scroller.list.css({
                            width: scroller.itemWidth * scroller.itemSum * 2 + "px"
                        })
                    }

                    // 鼠标移入停止滚动
                    scroller.box.hover(function() {
                        scroller.fn.stop();
                    }, function() {
                        scroller.fn.start();
                    });
                    // 左右点击绑定
                    scroller.fn.addControl();
                    scroller.fn.start();
                }
            }
            scroller.fn.init();
    }
})(jQuery);/*  |xGv00|efcb8a695286aa503a7cc0170ddbb502 */