/*!
 * Application run from here
 *
 * @author samhou<samhou@tencent.com>
 * @date 2016/05/05 11:36
 */
(function(win, doc, $, undefined) {
  'use strict';

  win.DrawImage = function(ImgD, w, h) {
    var image = new Image();

    image.src = ImgD.src;
    if (image.width > 0 && image.height > 0) {
      if (w / h > image.width / image.height) {
        ImgD.width = w;
      } else {
        ImgD.height = h;
      }
    }
  }

  // slide
  $(".slide").qqfocus({
    effect: 'scrollx',
    event: 'click',
    prev: ".prev",
    space: 5000,
    speed: 300,
    conbox: '.slide-list', //内容容器
    condot: '.slide-nav', //切换容器
    conitem: '.slide-item', //内容标签class
    next: ".next",
    isSeamless: true,
    current: 'current',
    dotitem: 'li'
  });

  $(window).on('scroll', function(e) {
    var height = $(document).scrollTop(),
      $gotop = $('.elevator').find('.gotop');
    if (height > 1000) {
      $gotop.css({
        visibility: 'visible'
      });
    } else {
      $gotop.css({
        visibility: 'hidden'
      });
    }
  });

  $('body').on('click', '.elevator .gotop', function() {
    $('body,html').animate({
      scrollTop: 0
    }, 1000);
  });

  // board tab switch
  $('body').on('mouseover', 'ul.title-nav', function(e) {
    var $target = $(e.target),
      type = $target.attr('data-type');

    if (type === undefined) {
      return;
    }

    if ($target.hasClass('current')) {
      return;
    }

    $target.parent('ul.title-nav').find('li.title-item').removeClass('current');
    $target.addClass('current');
    $('.board-content').hide();
    $('#' + type).show();
  });

  $('body').on('mouseover', 'ul.board-nav', function(e) {
    var $target = $(e.target),
      team = $target.attr('data-team'),
      $dist;

    if (team === undefined) {
      return;
    }

    if ($target.parent('li.board-nav-item').hasClass('current')) {
      return;
    }

    $target.parents('ul.board-nav').find('li.board-nav-item').removeClass('current');
    $target.parent('li.board-nav-item').addClass('current');

    $dist = $('#' + team);
    $dist.parent('.tab-content').find('.tab-panel').hide();
    $dist.show();
  });

  win.score = function(data) {
    var type = 'score';
    if (data.code == 0) {
      iscore(type, data);
    }
  };

  win.shooter = function(data) {
    var type = 'shooter';

    if (data.code == 0) {
      iscore(type, data);
    }
  };

  // function iscore(type, data) {
  //   var laliga,

  //     // 英超
  //     premierleague,

  //     // 德甲
  //     bundesliga,

  //     // 意甲
  //     seriea,
  //     // fa甲
  //     fajia;

  //   laliga = data.data[0];
  //   premierleague = data.data[1];
  //   bundesliga = data.data[3];
  //   seriea = data.data[2];
  //   fajia = data.data[4];

  //   renderTeam(type, 'laliga', laliga);
  //   renderTeam(type, 'premierleague', premierleague);
  //   renderTeam(type, 'bundesliga', bundesliga);
  //   renderTeam(type, 'seriea', seriea);
  //   renderTeam(type, 'fajia', fajia);


  //   function renderTeam(type, name, data) {
  //     var $target = $('#' + type + '-' + name).find('table'),
  //       result = {},
  //       tpl;

  //     result.teams = data.data.slice(0, 5);
  //     tpl = template('tpl-' + type, result);
  //     $target.html(tpl);
  //   }
  // }

  // loadScoreShooter('score');
  // loadScoreShooter('shooter');

  // // load score & shooter
  // function loadScoreShooter(type) {
  //   type = type || 'score';
  //   var url = 'http://sports.qq.com/c/sports-isocce-index-interface-';
  //   if (type == 'score') {
  //     url += 'score.htm';
  //   } else if (type == 'shooter') {
  //     url += 'shooter.htm';
  //   }

  //   $.getScript(url, function() {});
  // }

  win.exclusive = function(data) {
    if (data.code == 1) {
      var $target = $('#exclusive-list'),
        result = {},
        tpl;

      result.exclusives = data.data.slice(0, 6);
      tpl = template('tpl-exclusive-list', result);
      $target.html(tpl);
    }
  };

  // remote load exclusive data
  $.getScript('http://sports.qq.com/c/sports-isocce-index-interface-exclusive.htm', function() {});

  win.wonderfull = function(data) {
    if (data.code == 1) {
      var $target = $('#hot-pics'),
        result = {},
        tpl;

      result.hotpics = data.data.slice(0, 8);
      for (var i = 0, len = result.hotpics.length; i < len; i++) {
        result.hotpics[i].img_url = result.hotpics[i].img_url.replace(/_small/, '');
      }

      tpl = template('tpl-hot-pics', result);
      $target.html(tpl);
      $("img.lazy").lazyload({
        effect: "fadeIn"
      });
    }
  };

  // remote load wonderfull list
  $.getScript('http://sports.qq.com/c/sports-isocce-index-interface-wonderfull.htm', function() {});

  var hotVideo = [];
  $('body').on('click', '.hot-video .loadmore', function(e) {
    var $self = $(this),
      page = parseInt($self.attr('data-page'), 10);

    if ($self.hasClass('disabled')) {
      return false;
    }

    var result = {};

    result.videos = hotVideo.slice(page * 10, (page + 1) * 10);
    renderHotVideo(result);

    if (page >= 6) {
      $self.text("没有更多内容了");
      $self.addClass('disabled');
    }

    page++;
    $self.attr('data-page', page);
  });

  window.hotVideos = function(data) {
    if (data.code == 0) {
      hotVideo = data.data;

      var result = {},
        tpl;

      result.videos = hotVideo.slice(0, 10);
      renderHotVideo(result);
    }
  };

  function renderHotVideo(data) {
    var $target = $('#hot-video'),
      tpl;

    tpl = template('tpl-hot-video', data);
    $target.append(tpl);
    $("img.lazy").lazyload({
      effect: "fadeIn"
    });
  }

  $.getScript('http://sports.qq.com/c/sports-isocce-index-interface-hotvideos.htm', function() {});
  // loadHotVideo();

  function loadHotVideo(page, callback) {
    var offset = 10;
    page = page || 1;
    $.ajax({
      url: 'http://i.match.qq.com/pac/videohot?calltype=hot&page=' + page + '&offset=' + offset + '&format=json',
      dataType: 'jsonp',
      success: function(data) {
        var $target = $('#hot-video'),
          result = {},
          tpl;

        result.videos = data.data;
        tpl = template('tpl-hot-video', result);
        $target.append(tpl);
        $("img.lazy").lazyload({
          effect: "fadeIn"
        });
        callback && callback();
      },
      error: function(data) {
        console.error(data.msg);
      }
    });
  }

  $('body').on('mouseover', 'ul.tab-list', function(e) {
    e.preventDefault();

    var $target = $(e.target),
      type = $target.attr('data-type');

    if (type === undefined) {
      return false;
    }

    if ($target.parent('.tab-title').hasClass('active')) {
      return false;
    }

    $target.parent('.tab-title').parents('ul.tab-list').find('.tab-title').removeClass('active');
    $target.parent('.tab-title').addClass('active');

    $('#' + type).parent('.tab-content').find('.tab-panel').hide();
    $('#' + type).show();
  });

  var feedInfos = {};


  // loadFeed()
  loadFeed('headline');
  loadFeed('premierleague');
  loadFeed('laliga');
  loadFeed('bundesliga');
  loadFeed('seriea');
  loadFeed('fajia');
  win.headline = function(data) {
    var type = 'headline';

    if (data.code == 1) {
      feedHelper(type, data);
    }
  };
  win.premierleague = function(data) {
    var type = 'premierleague';

    if (data.code == 1) {
      feedHelper(type, data);
    }
  };
  win.laliga = function(data) {
    var type = 'laliga';

    if (data.code == 1) {
      feedHelper(type, data);
    }
  }
  win.bundesliga = function(data) {
    var type = 'bundesliga';

    if (data.code == 1) {
      feedHelper(type, data);
    }
  };
  win.seriea = function(data) {
    var type = 'seriea';

    if (data.code == 1) {
      feedHelper(type, data);
    }
  };
  // 与接口中关键字对应
  win.fajia = function(data) {
    var type = 'fajia';

    if (data.code == 1) {
      feedHelper(type, data);
    }
  };


  function feedHelper(type, data) {
    for (var i = 0, len = data.data.length; i < len; i++) {
      if (data.data[i].intro.length > 70) {
        data.data[i].intro = data.data[i].intro.substring(0, 75) + '...';
      }

      data.data[i].img_url = data.data[i].img_url.replace(/_small/, '');
    }
    feedInfos[type] = data.data;

    renderFeedFlow(data.data.slice(0, 10), type);
  }

  function loadFeed(type, page) {
    var offset = 10;
    page = page || 1;

    var teamMap = {
      headline: 37,
      // 西甲
      laliga: 24,

      // 英超
      premierleague: 23,

      // 德甲
      bundesliga: 26,

      // 意甲
      seriea: 25,
      // fa甲
      fajia: 147
    };

    var url = 'http://sports.qq.com/c/sports-isocce-index-interface-' + type + '.htm';
    $.getScript(url, function() {});
  };

  function renderFeedFlow(data, type, callback) {

    var $target = $('#feed-' + type).find('ul.feed-list'),
      $loadMore = $target.find('.loadmore'),
      result = {},
      tpl;


    result.infos = data;
    tpl = template('tpl-feed-flow', result);
    // console.log(tpl);
    $target.append(tpl);

    callback && callback();
    $("img.lazy").lazyload({
      effect: "fadeIn"
    });
  }

  $('body').on('click', '.info-feed .loadmore', function(e) {
    e.preventDefault();

    var $self = $(this),
      $feedList = $self.parent('.tab-panel').find('.feed-list'),
      type = $self.attr('data-type'),
      page = parseInt($self.attr('data-page'), 10),
      data = [];

    if (page * 10 >= feedInfos[type].length) {
      $self.text("没有更多内容了");
      $self.addClass('disabled');
    } else {
      data = feedInfos[type].slice(page * 10, (page + 1) * 10);
      renderFeedFlow(data, type, function() {
        $self.attr('data-page', (page + 1));
      });
    }
  });

  // loadNewVideo();
  // load new video
  function loadNewVideo() {
    var url = 'http://i.match.qq.com/pac/videohot?calltype=new&format=json';

    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(data) {
        var $target = $('#new-video'),
          result = {},
          tpl;

        result.videos = data.data;
        tpl = template('tpl-new-video', result);
        $target.html(tpl);
        console.log(data);
      },
      error: function(data) {
        console.error(data.msg);
      }
    })
  }
})(window, document, window.jQuery);
/*  |xGv00|407d66a95351e0ab19105c7e9ebe2c82 */