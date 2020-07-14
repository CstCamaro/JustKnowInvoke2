(function() {
  var e;

  require.config({
    urlArgs: "_v=1.0",
    baseUrl: 'http://mat1.gtimg.com/www/mobtosite/js',
    paths: {
      'zepto': 'zepto.min',
      'domReady': "domReady",
      'mustache': 'mustache',
      'jimu-libs': 'jimu-libs',
      'jquery': 'http://mat1.gtimg.com/www/mobtosite/js/jquery-1.10.2.min',
      'Comment': 'comment_api',
      'tvp': "http://imgcache.gtimg.cn/tencentvideo_v1/tvp/js/tvp.player_v2",
      'share': "./share"
    },
    shim: {
      'share': {
        exports: 'share'
      }
    }
  });

  try {
    document.domain = 'qq.com';
  } catch (_error) {
    e = _error;
  }

  require(['jquery', 'Comment', 'share'], function($, Comment, Share) {
    return $(function() {
      var comment_dom, dom_id, oShare;
      Share.share2weixin = Share.share2weixin || function(opt) {
        var head;
        head = 'http://v.qq.com/share/weixin.html?site=腾讯网&style=203&width=16&height=16&';
        opt = !!opt ? opt : {};
        opt.title = !!opt.title ? opt.title : document.title;
        opt.desc = !!opt.title ? opt.title : document.title;
        opt.url = !!opt.url ? opt.url : window.location.href;
        this._shareto(head, opt);
        return this;
      };
      oShare = $('.layout .share');
      oShare.mouseenter(function() {
        return $(this).addClass('hover');
      });
      oShare.mouseleave(function() {
        return $(this).removeClass('hover');
      });
      oShare.off('click', 'ul li');
      oShare.on('click', 'ul li', function(e) {
        var d, _type;
        e.preventDefault();
        e.stopPropagation();
        d = $(this);
        _type = d.attr('class');
        return Share[_type]({
          url: location.href,
          title: document.title,
          pic: ''
        });
      });
      $("#navListMore").mouseover(function() {
        return $("#navListMore ul").show();
      });
      $("#navListMore").mouseout(function() {
        return $("#navListMore ul").hide();
      });
      $(".layout-content").on('mouseover', '.share-layer .share', function() {
        return $(this).parent().addClass('share-layer-show');
      });
      $(".layout-content").on('mouseout', '.share-layer .share', function() {
        return $(this).parent().removeClass('share-layer-show');
      });
      comment_dom = $(".m-comment");
      dom_id = comment_dom.attr('id');
      if (!dom_id) {
        return;
      }
      window.cmt_id = comment_dom.attr("data-cmt_id");
      window.registerCoralEvent = {
        ownStyle: 'http://mat1.gtimg.com/www/mobtosite/mobile_sync_article/mobile_sync_article_comment.css'
      };
      /(^\.+)\.qq/i.test(window.location.href);
      window.cmt_site = RegExp.$1;
      return Comment.create(dom_id);
    });
  });

}).call(this);
/*  |xGv00|8e25d61c877133a2ed777173be89987e */