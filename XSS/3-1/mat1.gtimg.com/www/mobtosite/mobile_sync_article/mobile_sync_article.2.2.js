(function() {
  var e;

  require.config({
    urlArgs: "_v=1.0",
    baseUrl: 'https://mat1.gtimg.com/www/mobtosite/js',
    paths: {
      'zepto': 'zepto.min',
      'domReady': "domReady",
      'mustache': 'mustache',
      'jimu-libs': 'jimu-libs',
      'jquery': 'https://mat1.gtimg.com/www/mobtosite/js/jquery-1.10.2.min',
      'Comment': 'comment_api',
      'tvp': "https://imgcache.gtimg.cn/tencentvideo_v1/tvp/js/tvp.player_v2",
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
      require(['https://mat1.gtimg.com/www/mobtosite/mobile_sync_article/m-group-imgs.1.2.js']);
      Share.share2weixin = Share.share2weixin || function(opt) {
        var head;
        head = 'https://v.qq.com/share/weixin.html?site=腾讯网&style=203&width=16&height=16&';
        opt = !!opt ? opt : {};
        opt.title = !!opt.title ? opt.title : document.title;
        opt.desc = !!opt.title ? opt.title : document.title;
        opt.url = !!opt.url ? opt.url : window.location.href;
        this._shareto(head, opt);
        return this;
      };
      oShare = $('#page-share-card');
      oShare.mouseenter(function() {
        return $(this).addClass('share-hover');
      });
      oShare.mouseleave(function() {
        return $(this).removeClass('share-hover');
      });
      oShare.off('click', 'ul li');
      oShare.on('click', 'ul li', function(e) {
        var d, _img, _type;
        e.preventDefault();
        e.stopPropagation();
        d = $(this);
        _type = d.attr('class');
        _img = $(".hd-photos .img img").attr('src');
        return Share[_type]({
          url: location.href,
          title: document.title,
          pic: _img
        });
      });
      $("#navListMore").mouseover(function() {
        return $("#navListMore ul").show();
      });
      $("#navListMore").mouseout(function() {
        return $("#navListMore ul").hide();
      });
      $(".layout-content").on('mouseover', '.share-layer .share', function() {
        $(this).parent().addClass('share-layer-show');
        return $(this).parents('.share-layer').css('z-index', '1001');
      });
      $(".layout-content").on('mouseout', '.share-layer .share', function() {
        $(this).parent().removeClass('share-layer-show');
        return $(this).parents('.share-layer').css('z-index', '1000');
      });
      comment_dom = $(".m-comment");
      dom_id = comment_dom.attr('id');
      $('[hidden_id]').parents('.m-datacell').hide();
      if (!dom_id) {
        return;
      }
      window.cmt_id = comment_dom.attr("data-cmt_id");
      window.registerCoralEvent = {
        ownStyle: 'https://mat1.gtimg.com/www/mobtosite/mobile_sync_article/mobile_sync_article_comment.css'
      };
      /(^\.+)\.qq/i.test(window.location.href);
      window.cmt_site = RegExp.$1;
      return Comment.create(dom_id);
    });
  });

}).call(this);
/*  |xGv00|8a33e0a9ee23fa905e3a9c6faafaef3b */