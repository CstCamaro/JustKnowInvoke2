/**
 * @version 0.1
 * @author  jianminlu
 * @update  2013-08-05 10:28
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
            ball: '.ball',                           //ball
            peo1: '.peo1',                           //peo1
            peo2: '.peo2',                           //peo2
            float1: '.float1',                           //float1
            float2: '.float2',                           //float2
            float3: '.float3',                           //float3
            float4: '.float4',                           //float4
            float5: '.float5',                           //float5
            auto: true              //自动滚动
        }, options);
        focuser.timer = "";
        focuser.index = 0;
        focuser.last_index = 0;
        focuser.conbox = $(this).find(opts.conbox);
        focuser.ball = $(this).find(opts.ball);               //ball
        focuser.peo1 = $(this).find(opts.peo1);               //peo1
        focuser.peo2 = $(this).find(opts.peo2);               //peo2
        focuser.float1 = $(this).find(opts.float1);               //float1
        focuser.float2 = $(this).find(opts.float2);               //float2
        focuser.float3 = $(this).find(opts.float3);               //float3
        focuser.float4 = $(this).find(opts.float4);               //float4
        focuser.float5 = $(this).find(opts.float5);               //float5
        focuser.dis1 = 0;
        focuser.dis2 = 0;
        focuser.dis3 = 0;
        focuser.dis4 = 0;
        focuser.dis5 = 0;
        focuser.dis6 = 0;
        focuser.dis7 = 0;
        focuser.dis8 = 0;
        focuser.conitem = focuser.conbox.find(opts.conitem);
        focuser.condot = $(this).find(opts.condot);
        focuser.dotitem = focuser.condot.find(opts.dotitem);
        focuser.fn = {
            slide: function () {
                if (focuser.index >= focuser.conitem.length){
                    focuser.index = 0;
                }
                if(focuser.dis1 >= -420){
	                focuser.dis1 = -720;
                }
                if(focuser.dis2 >= -420){
	                focuser.dis2 = -800;
                }
                if(focuser.dis3 >= -420){
	                focuser.dis3 = -880;
                }
                if(focuser.dis4 >= -420){
	                focuser.dis4 = -1000;
                }
                if(focuser.dis5 >= -420){
	                focuser.dis5 = -800;
                }
                if(focuser.dis6 >= 0){
	                focuser.dis6 = -400;
                }
                if(focuser.dis7 >= -420){
	                focuser.dis7 = -900;
                }
                if(focuser.dis8 >= -420){
	                focuser.dis8 = -800;
                }
                focuser.dotitem.removeClass(opts.current).eq(focuser.index).addClass(opts.current);
                switch (opts.effect) {
                    case 'scrollx':
                        focuser.conitem.css({"float":"left"});
                        focuser.conbox.css({"position": "relative"});
                        focuser.conbox.width((focuser.conitem.length+1) * focuser.conitem.width());
                        focuser.conbox.stop().animate({left:-focuser.conitem.width() * focuser.index}, opts.speed);
                        focuser.dis1 += 100;
                        focuser.dis2 += 80;
                        focuser.dis3 += 100;
                        focuser.dis4 += 60;
                        focuser.dis5 += 80;
                        focuser.dis6 += 80;
                        focuser.dis7 += 80;
                        focuser.dis8 += 60;
                        focuser.ball.animate({'marginLeft':focuser.dis1}, opts.speed / 2);
                        focuser.peo1.animate({'marginLeft':focuser.dis2}, opts.speed / 2);
                        focuser.peo2.animate({'marginRight':focuser.dis3}, opts.speed / 2);
                        focuser.float1.animate({'marginLeft':focuser.dis4}, opts.speed / 2);
                        focuser.float2.animate({'marginLeft':focuser.dis5}, opts.speed / 2);
                        focuser.float3.animate({'marginRight':focuser.dis6}, opts.speed / 2);
                        focuser.float4.animate({'marginRight':focuser.dis7}, opts.speed / 2);
                        focuser.float5.animate({'marginRight':focuser.dis8}, opts.speed / 2);
                        break;
                    case 'scrolly':
                        focuser.conitem.css({display:'block'});
                        focuser.conbox.css({"position": "relative"});
                        focuser.conbox.stop().animate({top:-focuser.conitem.height() * focuser.index + 'px' }, opts.speed);
                        focuser.dis1 += 100;
                        focuser.dis2 += 90;
                        focuser.dis3 += 100;
                        focuser.dis4 += 60;
                        focuser.dis5 += 80;
                        focuser.dis6 += 80;
                        focuser.dis7 += 80;
                        focuser.dis8 += 60;
                        focuser.ball.animate({'marginLeft':focuser.dis1}, opts.speed / 2);
                        focuser.peo1.animate({'marginLeft':focuser.dis2}, opts.speed / 2);
                        focuser.peo2.animate({'marginRight':focuser.dis3}, opts.speed / 2);
                        focuser.float1.animate({'marginLeft':focuser.dis4}, opts.speed / 2);
                        focuser.float2.animate({'marginLeft':focuser.dis5}, opts.speed / 2);
                        focuser.float3.animate({'marginRight':focuser.dis6}, opts.speed / 2);
                        focuser.float4.animate({'marginRight':focuser.dis7}, opts.speed / 2);
                        focuser.float5.animate({'marginRight':focuser.dis8}, opts.speed / 2);
                        break;
                    case 'fade':
                        if(focuser.conbox.css('opacity') == 1){
                            focuser.conbox.css('opacity', 0);
                        }
                        focuser.conbox.animate({'opacity':1}, opts.speed / 2);
                        focuser.conitem.eq(focuser.last_index).stop().css('display', "none").end().eq(focuser.index).css('display', "block").stop();
                        focuser.dis1 += 100;
                        focuser.dis2 += 90;
                        focuser.dis3 += 100;
                        focuser.dis4 += 60;
                        focuser.dis5 += 80;
                        focuser.dis6 += 80;
                        focuser.dis7 += 80;
                        focuser.dis8 += 60;
                        focuser.ball.animate({'marginLeft':focuser.dis1}, opts.speed / 2);
                        focuser.peo1.animate({'marginLeft':focuser.dis2}, opts.speed / 2);
                        focuser.peo2.animate({'marginRight':focuser.dis3}, opts.speed / 2);
                        focuser.float1.animate({'marginLeft':focuser.dis4}, opts.speed / 2);
                        focuser.float2.animate({'marginLeft':focuser.dis5}, opts.speed / 2);
                        focuser.float3.animate({'marginRight':focuser.dis6}, opts.speed / 2);
                        focuser.float4.animate({'marginRight':focuser.dis7}, opts.speed / 2);
                        focuser.float5.animate({'marginRight':focuser.dis8}, opts.speed / 2);
                        break;
                    case 'none':
                        focuser.conitem.hide().eq(focuser.index).show();
                        focuser.dis1 += 100;
                        focuser.dis2 += 90;
                        focuser.dis3 += 100;
                        focuser.dis4 += 60;
                        focuser.dis5 += 80;
                        focuser.dis6 += 80;
                        focuser.dis7 += 80;
                        focuser.dis8 += 60;
                        focuser.ball.animate({'marginLeft':focuser.dis1}, opts.speed / 2);
                        focuser.peo1.animate({'marginLeft':focuser.dis2}, opts.speed / 2);
                        focuser.peo2.animate({'marginRight':focuser.dis3}, opts.speed / 2);
                        focuser.float1.animate({'marginLeft':focuser.dis4}, opts.speed / 2);
                        focuser.float2.animate({'marginLeft':focuser.dis5}, opts.speed / 2);
                        focuser.float3.animate({'marginRight':focuser.dis6}, opts.speed / 2);
                        focuser.float4.animate({'marginRight':focuser.dis7}, opts.speed / 2);
                        focuser.float5.animate({'marginRight':focuser.dis8}, opts.speed / 2);
                        break;
                }
                focuser.last_index = focuser.index;
                focuser.index ++;
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
                    focuser.timer = setInterval(focuser.fn.slide, opts.space);
                }
                focuser.dotitem.bind(opts.event, function() {
                    focuser.index = $(this).index();
                    focuser.fn.stop();
                    focuser.fn.slide();
                    focuser.fn.play();
                });
                focuser.conbox.hover(focuser.fn.stop, focuser.fn.play);
                focuser.fn.slide();
            }
        };
        focuser.fn.init();
    }
})(jQuery);/*  |xGv00|a328200a354478d5b42a6c0524d70b86 */