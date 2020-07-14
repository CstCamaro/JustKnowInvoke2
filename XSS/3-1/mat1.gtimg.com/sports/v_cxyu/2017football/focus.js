/**
 * @version 0.3 添加左右按钮, 修改按钮bug, 修改焦点图和按钮顺序bug
 * @author  jianminlu
 * @update  2014-06-16 23:20
 */
(function ($) {
  /**
   * @name    qqfocus     页卡函数
   * @param   {Object}    初始值
   */
  $.fn.qqfocus = function (options) {
    var focuser = {};
    var opts = $.extend({}, {
      event: 'mouseover', //mouseover click
      conbox: '.focus_con', //内容容器
      condot: '.focus_dot', //切换容器
      conitem: '.item', //内容标签class
      dotitem: 'a', //切换器标签 默认为a
      current: 'current', //切换样式
      effect: 'fade', //切换效果 scrollx|scrolly|fade|none
      speed: 1000, //动画速度
      space: 3000, //时间间隔
      auto: true, //自动滚动
      prev: ".prevBtn",
      next: ".nextBtn",
      isSeamless: false
    }, options);
    focuser.timer = null;
    focuser.index = 0;
    focuser.last_index = 0;
    focuser.conbox = $(this).find(opts.conbox);
    focuser.conitem = focuser.conbox.find(opts.conitem);
    focuser.condot = $(this).find(opts.condot);
    focuser.dotitem = focuser.condot.find(opts.dotitem);
    focuser.prev = $(this).find(opts.prev);
    focuser.next = $(this).find(opts.next);
    focuser.rightside = false;
    focuser.leftside = false;
    focuser.lastitem = focuser.conitem.eq(focuser.conitem.length - 1);
    focuser.firstitem = focuser.conitem.eq(0);

    focuser.fn = {
      slide: function () {
        if (focuser.index >= focuser.conitem.length) {
          focuser.index = 0;
          focuser.rightside = true;
        }
        focuser.dotitem.removeClass(opts.current).eq(focuser.index).addClass(opts.current);
        switch (opts.effect) {
        case 'scrollx':
          focuser.conitem.css({
            "float": "left"
          });
          focuser.conbox.css({
            "position": "relative"
          });
          focuser.conbox.width(focuser.conitem.length * focuser.conitem.width());
          if (opts.isSeamless && focuser.leftside == true) {
            focuser.lastitem.css('left', -focuser.conitem.length * focuser.conitem.width() + 'px');
            focuser.conbox.stop().animate({
              left: focuser.conitem.width() + 'px'
            }, opts.speed, function () {
              focuser.lastitem.css('left', 0);
              focuser.conbox.css('left', -focuser.conitem.width() * (focuser.conitem.length - 1) + 'px');
            });
            focuser.leftside = false;
            break;
          }
          if (opts.isSeamless && focuser.rightside == true) {
            focuser.firstitem.css('right', -focuser.conitem.length * focuser.conitem.width() + 'px');
            focuser.conbox.stop().animate({
              left: -focuser.conitem.length * focuser.conitem.width() + 'px'
            }, opts.speed, function () {
              focuser.firstitem.css('right', 0);
              focuser.conbox.css('left', 0);
            });
            focuser.rightside = false;
            break;
          }
          focuser.conbox.stop().animate({
            left: -focuser.conitem.width() * Math.abs(focuser.index) + 'px'
          }, opts.speed);
          break;
        case 'scrolly':
          focuser.conitem.css({
            display: 'block'
          });
          focuser.conbox.css({
            "position": "relative"
          });
          focuser.conbox.stop().animate({
            top: -focuser.conitem.height() * Math.abs(focuser.index) + 'px'
          }, opts.speed);
          break;
        case 'fade':
          if (focuser.conbox.css('opacity') == 1) {
            focuser.conbox.css('opacity', 0);
          }
          focuser.conbox.animate({
            'opacity': 1
          }, opts.speed / 2);
          focuser.conitem.eq(focuser.last_index).stop().css('display', "none").end().eq(focuser.index).css(
            'display', "block").stop();
          break;
        case 'none':
          focuser.conitem.hide().eq(focuser.index).show();
          break;
        }
        focuser.last_index = focuser.index;
        focuser.index++;
      },
      next: function () {
        focuser.fn.stop();
        focuser.fn.slide();
        focuser.fn.play();
      },
      prev: function () {
        focuser.index = focuser.index < 2 ? (focuser.leftside = true, (focuser.conitem.length - focuser.index)) :
          focuser.index - 2;
        focuser.fn.stop();
        focuser.fn.slide();
        focuser.fn.play();
      },
      stop: function () {
        clearInterval(focuser.timer);
      },
      play: function () {
        clearInterval(focuser.timer);
        if (opts.auto) {
          focuser.timer = setInterval(focuser.fn.slide, opts.space);
        }
      },
      init: function () {
        if (opts.effect == 'fade') {
          focuser.conitem.eq(focuser.index).css({
            'display': "block"
          }).siblings().css({
            'display': "none"
          });
        }
        if (opts.auto) {
          focuser.fn.play();
        } else {
          focuser.fn.stop();
        }
        focuser.dotitem.bind(opts.event, function () {
          focuser.index = $(this).index();
          focuser.fn.stop();
          focuser.fn.slide();
          focuser.fn.play();
        });

        focuser.conbox.hover(focuser.fn.stop, focuser.fn.play);
        focuser.prev.hover(focuser.fn.stop, focuser.fn.play);
        focuser.next.hover(focuser.fn.stop, focuser.fn.play);
        focuser.fn.slide();

        focuser.prev.bind("click", focuser.fn.prev);
        focuser.next.bind("click", focuser.fn.next);
      }
    };
    focuser.fn.init();
  }
})(jQuery);
/*  |xGv00|f464d6565043a45c8f22141ad0cfc13b */