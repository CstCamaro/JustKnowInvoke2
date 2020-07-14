var cookie = {
  setItem: function (key, value, expireTime, domain) {
    var text = key + "=" + value;
    if (expireTime) {
      var date = new Date();
      date.setTime(date.getTime() + 6e4 * expireTime);
      text += "; expires=" + date.toUTCString();
    }
    text += "; path=/";
    domain && (text += "; domain=" + domain);
    document.cookie = text;
  },
  getItem: function (key) {
    if (key) {
      var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
      if (arr != null) {
        return unescape(arr[2]);
      }
    }
  },
  removeItem: function (key, domain) {
    this.setItem(key, "", -1, domain)
  }
};

function ZHIBOTAI(nodeId, conf) {
  this.nodeId = nodeId;
  this.otherNode = conf && conf.node; //影响的其他节点
  this.curPos = null; //当前播放视频序号
  this.pureData = []; //存放需要的数据，包括直播id，序号等
  this.beaus = {}; //对象集合
  this.curScreen = 0;
  this.count = 0; //总屏数
  this.perNum = 3; //每屏条数
  this.playerInfo = {};
  this.init();
}
ZHIBOTAI.prototype = {
    constructor: ZHIBOTAI,
    init: function () {
      var obj = document.getElementById('zhibotai');
      if (!this.nodeId || !obj) {
        return;
      }

      //获取直播台数据
      var urlTxt = 'http://data.v.qq.com/live/v2/api/live/nodelives?scope=news_detail&reqsrc=news_detail';
      $.ajax({
        url: urlTxt,
        data: {
          'node_id': this.nodeId,
          'number': 12
        },
        dataType: 'jsonp',
        jsonpCallback: 'tvStationBack'
      });
    },
    operate: function (list) {
      var len = list.length;
      var htmlTxt = this.buildHtml(list, len);

      $('[data-node="list"]', '#zhibotai').html(htmlTxt);
      this.buildBeaus(); //获取对象数据
      if (cookie.getItem('gjzq_closeAuto') == '1') {
        $('[node-type="autoPlay"]', '.tvStation').addClass('close');
      }
      //初始化切换按钮
      $(this.beaus['slide'][0]).hide();
      if (list.length <= this.perNum) {
        $(this.beaus['slide'][1]).hide();
      }
      //有直播则创建播放框
      if (this.curPos != null) {
        this.buildPlayer(list[this.curPos]);
        this.otherNode && $('#' + this.otherNode).hide();
        $('[node-name="zhibotai"]').siblings().removeClass('cur')
          .end()
          .addClass('cur');
        $('#zhibotai').show();
        this.bind();
      } else {
        $('#dianbotai').show();
        $('[node-name="dianbotai"]').show().addClass('cur');
        $('[node-name="zhibotai"]').hide();
        $('#zhibotai').hide();
      }
    },
    stringToJson: function (str) {
      if (str) {
        var arr = str.split('&');
        var data = {};
        for (var i = 0; i < arr.length; i++) {
          var temp = arr[i].split('=');
          data[temp[0]] = temp[1];
        }
        return data;
      }
    },
    buildHtml: function (list, len) {
      var allH = [];
      var sta = false; //开关
      for (var i = 0; i < len; i++) {
        if (!sta && list[i].playing_status == 1 && list[i].stream_id) {
          this.curPos = i; //当前播放视频序号
          sta = true;
        }
        //playing_status: 1直播中 2已结束  3未开始
        var mainH = [];
        var match = list[i].match;
        if (match && match.homeName && match.awayName) { //对阵赛
          mainH = ['<div class="match clearfix">',
            '<span class="col1"><span>', match.homeName, '</span>', list[i].playing_status == 1 ? '<br><em>' +
            match.homeGoal + '</em>' : '', '</span>',
            list[i].playing_status == 1 ? '<span class="col2 playing">正在直播</span>' :
            '<span class="col2"><span class="no">未开始</span><br/><span>' + list[i].start_time.substring(5, 16) +
            '</span></span>',
            '<span class="col3"><span>', match.awayName, '</span>', list[i].playing_status == 1 ? '<br><em>' +
            match.awayGoal + '</em>' : '', '</span>',
            '</div>'
          ].join('');
        } else { //非对阵赛
          mainH = ['<div class="info">',
            '<p>', list[i].title, '</p>',
            list[i].playing_status == 1 ? '<span class="playing">正在直播</span>' : '<span>' + list[i].start_time.substring(
              5, 16) + '</span>',
            '</div>'
          ].join('');
        }
        var item = ['<li data-node="item"', list[i].playing_status == 3 ? ' class="noStart"' :
          ' data-action="item" data-data="pos=' + i + '"', '>',
          list[i].playing_status == 3 ? '<a class="linkZB" target="_blank" href="' + list[i].shared.pc_url +
          '"></a>' : '',
          '<strong>', list[i].catalog_name, '</strong>',
          mainH,

          '</li>'
        ].join('');
        allH.push(item);
        //存储数据{序号、直播ID、播放地址}
        this.pureData.push({
          'pos': i,
          'id': list[i].stream_id,
          'url': list[i].shared.pc_url
        });
      }

      return allH.join('');
    },
    buildBeaus: function () { //获取需要的对象
      this.beaus['go'] = $('[data-node="go"]', '#zhibotai');
      this.beaus['playBtn'] = $('[data-node="playBtn"]', '#zhibotai');
      this.beaus['liveBox'] = $('[data-node="liveBox"]', '#zhibotai');
      this.beaus['list'] = $('[data-node="list"]', '#zhibotai');
      this.beaus['item'] = $('[data-node="item"]', '#zhibotai');
      this.beaus['slide'] = $('[data-node="slide"]', '#zhibotai');
      this.count = Math.ceil(this.beaus['item'].length / this.perNum);
    },

    setPlayingSign: function (name, sign) { //设置当前播放器播放状态
      // 初始化全局命名空间
      if (!window.gjzq_playing_sign) window.gjzq_playing_sign = {};
      window.gjzq_playing_sign[name] = sign;
    },
    isAnyVideoPlaying: function () { //检查当前页面是否有播放器在播放
      if (window.gjzq_playing_sign) {
        for (var n in window.gjzq_playing_sign) {
          if (window.gjzq_playing_sign.hasOwnProperty(n) && window.gjzq_playing_sign[n]) {
            return true;
          }
        }
      }
      return false;
    },

    updataLive: function (pos) {
      var isAutoplay = true;

      var self = this;
      window.liveClickSwitch = function (data) {
          if (!data) {
            return;
          }
          if (data.code == 'stop') {
            self.setPlayingSign('liveVideo', false);
          } else if (data.code == 'play') {
            self.setPlayingSign('liveVideo', true);
            $(window).trigger('video:pause', 'liveVideo');
            console.log('zhibo:tell rel_video need to pause');
          }
        }
        //创建播放器
      self.playerInfo['video'] = new tvp.VideoInfo();
      self.playerInfo['video'].setChannelId(self.pureData[pos].id + '');
      self.playerInfo['player'] = new tvp.Player();
      self.playerInfo['player'].create({
        width: 360,
        height: 225,
        type: 1,
        video: self.playerInfo['video'],
        modId: "liveVideo",
        autoplay: isAutoplay,
        onplay: function (e) {
          if (isAutoplay) {
            $(window).trigger('video:pause', 'liveVideo');
            console.log('zhibo:play')
          }
          //监听使直播播放器自动停止
          $(window).on('video:pause', function (event, trigger) {
            if (trigger != 'liveVideo') {
              self.playerInfo['player'].getPlayer().stopVideo(); //直播停止
              self.setPlayingSign('liveVideo', false);
              console.log('trigger:zhibo_stop');
            }
          });

        }
      });
      self.beaus['go'].attr('href', self.pureData[pos].url);
      self.beaus['liveBox'].show();
      self.beaus['playBtn'].hide();
      //更新页面显示状态
      self.beaus['item'].removeClass('cur');
      $(self.beaus['item'][pos]).addClass('cur');
    },
    buildPlayer: function (item) {
      //aboutVideo_v: 1相关视频开启自动播放  0关闭自动播放
      var dc_tv_play = cookie.getItem('dc_tv_play');
      var dc_tv_closeAuto = cookie.getItem('dc_tv_closeAuto');
      //自动播放关闭或24小时内自动播放过
      if (dc_tv_closeAuto == '1' || dc_tv_play == '1') { //已经播放过直播，显示图片
        //获取直播的封面图
        var picUrl = item.images && item.images['300x168'] ? item.images['300x168'].url : null;
        picUrl && this.beaus['playBtn'].attr('src', picUrl);
        //显示直播封面图
        this.beaus['playBtn'].show();
        this.beaus['liveBox'].hide();
        //更新页面上当前状态
        $(this.beaus['item'][this.curPos]).addClass('cur');
      } else { //开启自动播放&&未播放过直播，显示直播
        //底层原有相关视频静音
        isRelvideoMute = true;
        this.updataLive(this.curPos);
        //存放播放信息
        cookie.setItem('dc_tv_play', '1', 24 * 60, 'qq.com');
      }
    },
    bind: function () {
      var that = this;
      $('[data-action="item"]', '#zhibotai').bind('click', function (e) {
        if ($(this).hasClass('cur')) {
          return;
        }
        var obj = that.stringToJson($(this).attr('data-data'));
        var pos = parseInt(obj.pos);
        that.updataLive(pos);
        that.curPos = pos;
      });
      this.beaus['playBtn'].bind('click', function (e) {
        that.updataLive(that.curPos);
      });
      this.beaus['slide'].bind('click', function (e) {
        var obj = that.stringToJson($(this).attr('data-data'));
        var idx = parseInt(obj.idx);
        var other = this;
        if ((idx > 0 && that.curScreen > 0) || (idx < 0 && that.curScreen < that.count - 1)) {
          that.curScreen -= idx;
          that.beaus['list'].animate({
            'marginTop': '+=' + idx * 56 * that.perNum + 'px'
          }, 1000);
          that.beaus['slide'].show();
          if (that.curScreen <= 0 || that.curScreen >= that.count - 1) {
            $(other).hide();
          }
        }
      });
      this.beaus['liveBox'].bind('mouseenter', function (e) {
        that.beaus['go'].fadeIn();
      });
      this.beaus['liveBox'].bind('mouseleave', function (e) {
        that.beaus['go'].fadeOut();
      });
    }
  }
  //window.zhiboT_nodeReplace='no';
// window.zhiboT_nodeId = 11;
window.zhibotai = new ZHIBOTAI(window.zhiboT_nodeId || 4, {
  node: window.zhiboT_nodeReplace || 'dianbotai'
});

//jsonp回调
window.tvStationBack = function (data) {
  if (data.response && data.response.code === 0) {
    var info = data.data;
    var list = info.lives;
    if (list && list.length > 0) {
      zhibotai.operate(list);
    } else {
      $('li[node-name="zhibotai"]').hide();
      $('#dianbotai').show();
    }
  }
}

window.newVideos = function (data) {
  if (data.code === 0) {
    var list = data.data;
    if (list && list.length >= 12) {
      dianbotai.operate(list.slice(0, 12));
    } else {
      $('#dianbotai').hide();
    }
  }
};

function DIANBOTAI() {
  this.curPos = 0; //当前播放视频序号
  this.pureData = []; //存放需要的数据，包括直播id，序号等
  this.beaus = {}; //对象集合
  this.curScreen = 0;
  this.count = 4; //总屏数
  this.perNum = 3; //每屏条数
  this.player = null;
  this.video = null;
  this.init();
}

DIANBOTAI.prototype = {
  constructor: DIANBOTAI,
  init: function () {
    var self = this;
    var obj = document.getElementById('dianbotai');
    if (!obj) {
      return;
    }

    //获取点播台数据
    var urlTxt = 'http://sports.qq.com/c/sports-isocce-index-interface-newvideos.htm';
    $.getScript(urlTxt, function() {
      self.buildPlayer();
    });
  },
  operate: function (list) {
    var len = list.length;
    var htmlTxt = this.buildHtml(list, len);

    $('ul', '#dianbotai').html(htmlTxt);
    this.buildBeaus(); //获取对象数据
    if (cookie.getItem('gjzq_closeAuto') == '1') {
      $('[node-type="autoPlay"]', '.tvStation').addClass('close');
    }
    //初始化切换按钮
    $(this.beaus['slide'][0]).hide();
    if (list.length <= this.perNum) {
      $(this.beaus['slide'][1]).hide();
    }
    this.bind();
  },
  stringToJson: function (str) {
    if (str) {
      var arr = str.split('&');
      var data = {};
      for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].split('=');
        data[temp[0]] = temp[1];
      }
      return data;
    }
  },
  buildHtml: function (list, len) {
    var str = '',
      allnumc;
    for (var i = 0; i < len; i++) {
      allnumc = list[i]['play_count'];
      if (parseInt(allnumc) >= 10000) {
        allnumc = parseFloat(parseInt(allnumc) / 10000).toFixed(1) + '\u4E07';
      }
      str += '<li><div class="dbbox"><div class="txt">' + list[i]['title'] +
        '</div><div class="tool"><em><i></i></em>' + allnumc + '</div></div></li>';

      this.pureData.push({
        'pos': i,
        'id': list[i]['vid'],
        'url': list[i]['url']
      });
    }
    return str;
  },
  buildBeaus: function () { //获取需要的对象
    this.beaus['list'] = $('[data-node="list"]', '#dianbotai');
    this.beaus['item'] = $('li', '#dianbotai');
    this.beaus['slide'] = $('[data-node="slide"]', '#dianbotai');
    this.beaus['autoPlay'] = $('[node-type="autoPlay"]', '#dianbotai');
    //this.count = Math.ceil(this.beaus['item'].length/this.perNum);
  },

  updataLive: function (pos, autoplay) {
    $('#db_mod_player').css({
      'opacity': 0,
      visibility: 'hidden'
    });
    var that = this;
    var video = this.video = new tvp.VideoInfo();
    video.setVid(that.pureData[pos].id + "");
    var player = this.player = new tvp.Player();
    player.create({
      width: 400,
      height: 300,
      video: video,
      modId: "db_mod_player",
      autoplay: autoplay,
      vodFlashExtVars: {
        searchpanel: 0,
        clientbar: 0
      },
      plugins: {
        AppBanner: !1,
        AppRecommend: !1,
        AppFollow: !1
      },
      //playerType:'html5',
      ongetnext: function (e) {
        if (that.curPos >= that.pureData.length - 1) return;
        that.curPos++;
        that.updataLive(that.curPos, true);
        if (that.curPos + 1 > (that.curScreen + 1) * that.perNum) {
          that.beaus['slide'].eq(1).click();
        }
      }
    });

    setTimeout(function () {
      that.resizePlayer(360, 225);
    }, 1000);
    //更新页面显示状态
    this.beaus['item'].removeClass('cur');
    $(this.beaus['item'][pos]).addClass('cur');
  },

  resizePlayer: function (w, h) {
    if (!this.player || !this.player.getPlayerType) return;
    w = ("number" === typeof w) ? w : "100%";
    h = ("number" === typeof h) ? h : "";

    var player_type = this.player.getPlayerType(); // 播放器类型 flash | html5
    // 如果是flash播放器，拿到flash object后设置attr
    if ("flash" === player_type || "liveflash" === player_type) {
      var flash = this.player.getPlayer();
      flash.setAttribute("width", w);
      flash.setAttribute("height", h);
      // 如果是html5播放器，找到其容器后设置css
    } else if ("html5" === player_type) {
      $('#db_mod_player').find(".tenvideo_player").css({
        width: w,
        height: h
      });
    }

    $('#db_mod_player').css({
      'opacity': 1,
      'visibility': 'visible'
    });
  },

  buildPlayer: function () {
    var gjzq_closeAuto = cookie.getItem('gjzq_closeAuto');
    this.updataLive(this.curPos, !!!gjzq_closeAuto);
  },
  bind: function () {
    var that = this;
    this.beaus['item'].bind('click', function () {
      if ($(this).hasClass('cur')) {
        return;
      }
      var pos = parseInt($(this).index());
      that.updataLive(pos, true);
      that.curPos = pos;
    });

    this.beaus['slide'].bind('click', function () {
      var obj = that.stringToJson($(this).attr('data-data'));
      var idx = parseInt(obj.idx);
      var other = this;
      if ((idx > 0 && that.curScreen > 0) || (idx < 0 && that.curScreen < that.count - 1)) {
        that.curScreen -= idx;
        that.beaus['list'].animate({
          'marginTop': '+=' + idx * 56 * that.perNum + 'px'
        }, 1000);
        that.beaus['slide'].show();
        if (that.curScreen <= 0 || that.curScreen >= that.count - 1) {
          $(other).hide();
        }
      }
    });
  }
}

window.dianbotai = new DIANBOTAI(6, {
  node: 'news-tab'
});

$('.tvStation [node-type="autoPlay"]').on('click', function (e) {
  if (cookie.getItem('gjzq_closeAuto') == '1') {
    $(this).removeClass('close');
    cookie.removeItem('gjzq_closeAuto'); //开启自动播放
  } else {
    $(this).addClass('close');
    cookie.setItem('gjzq_closeAuto', '1', 30 * 24 * 60); //关闭自动播放
  }
});

$('.tvStation').on('click', '.hd h2', function (e) {
  var $self = $(this),
    $parent = $self.parent('li'),
    name = $parent.attr('node-name');

  $parent.siblings().removeClass('cur')
    .end()
    .addClass('cur');

  $('#' + name).siblings().hide()
    .end()
    .show();
});
/*  |xGv00|5502fece2d2e15f55f2deb0c807073d2 */