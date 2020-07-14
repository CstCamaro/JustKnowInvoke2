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
            split:".split",        // next 按钮class
            anchor :0,               //偏移量
            iWidth : ""
        }
    }
    /**
     * @name    wbScroll    微博滚动函数
     * @param   {Object}    初始值
     */
    function scroll(ele,options){
        var opts = $.extend({}, $.qqScroll.defaults, options),
            obj = ele,
            scroller = {};
        scroll.prototype.resetScroll = function(num,width){
                    scroller.fn._resetScroll(num,width);
                };
        scroller.box = obj.find(opts.inner);
        scroller.list = scroller.box.find(opts.list);
        scroller.items = scroller.list.find(opts.split);
        scroller.itemSum = scroller.items.length;
        scroller.prevBtn = obj.find(opts.prev);
        scroller.nextBtn = obj.find(opts.next);
        scroller.itemWidth = opts.iWidth || scroller.items.outerWidth();
        scroller.itemHeight = scroller.items.outerHeight();

        scroller.fn = {
            _resetScroll :function(num,width){
                (typeof num == 'number') && (opts.step = num);
                (typeof width == 'number') && (scroller.moveVal = width);
                if (opts.direction == "left" || opts.direction == "right") {
                    scroller.list.css({
                        width: scroller.moveVal * scroller.itemSum * 2 + "px"
                    })
                    if(opts.anchor != 0){
                        scroller.box.scrollLeft(opts.anchor * scroller.moveVal);
                        scroller.remainder = opts.anchor % opts.step;
                    }else{
                        scroller.box.scrollLeft(0);
                    }
                }
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
                    case "top":
                        _max = 0;
                        if (d == "left") {
                            _dis = scroller.box.scrollLeft() - (scroller.moveVal * opts.step);
                                if (_dis == (opts.anchor - opts.step) * scroller.moveVal) {
                                    scroller.box.scrollLeft((scroller.itemSum + opts.anchor) * scroller.moveVal);
                                    if(scroller.itemSum%opts.step !=0) {
                                        _dis = scroller.box.scrollLeft() - (scroller.itemSum % opts.step * scroller.moveVal);
                                    }else{
                                        _dis = scroller.box.scrollLeft()-(scroller.moveVal * opts.step);
                                    }
                                }
                            scroller.box.animate({"scrollLeft": _dis}, opts.speed, function() {
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
                        _max = (scroller.itemSum + opts.anchor) * scroller.moveVal;
                        if (d == "right") {
                            _dis = scroller.box.scrollLeft() + (scroller.moveVal * opts.step);
                            if (_dis >= _max) {
                                _dis = _max
                            }
                            scroller.box.animate({"scrollLeft": _dis}, opts.speed, function() {
                                if (parseInt(scroller.box.scrollLeft(), 10) >= _max) {
                                    scroller.box.scrollLeft(opts.anchor * scroller.moveVal);
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
                    if(opts.anchor != 0){
                        scroller.box.scrollLeft(opts.anchor * scroller.moveVal);
                        scroller.remainder = opts.anchor % opts.step;
                    }
                }

                if (opts.auto) {
                    scroller.box.hover(function () {
                        scroller.fn.stop();
                    }, function () {
                        scroller.fn.start();
                    });
                    scroller.fn.start();
                }
                scroller.fn.addControl();
            }
        }

        scroller.fn.init();
    }
    $.fn.qqScroll = function (options){
        var scrollObj = $.data(this[0], "plugin_scroll");
        if(scrollObj){
            return scrollObj;
        }
        scrollObj = new scroll($(this), options);
        $.data(this[0], "plugin_scroll",scrollObj);
        return scrollObj;
    }

})(jQuery);
/*  |xGv00|c39af316a6490cac9a6080cfb48be01e */