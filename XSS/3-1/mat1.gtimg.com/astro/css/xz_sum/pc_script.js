var reader = {
  init: function() {

    this.getcommentnum(config.commid);
    this.slide();
    // this.getreview("2")
  },
  slide: function(length) {
    if ($(".slideinner li").length > 0) {
      $(".review").show();
    };
    if ($(".slideinner li").length > 5) {
      $('#slide .slideinner').jcarousel({});
      $('#slide .prev').jcarouselControl({
        target: '-=5'
      });
      $('#slide .next').jcarouselControl({
        target: '+=5'
      });
      $(".prev").hover(
        function() {
          $(this).addClass("prevhover")
        },
        function() {
          $(this).removeClass("prevhover")
        }
      )
      $(".next").hover(
        function() {
          $(this).addClass("nexthover")
        },
        function() {
          $(this).removeClass("nexthover")
        }
      )
    } else {
      $(".prev,.next").hide();
    };
  },
  getcommentnum: function(id) {
    var url = "//coral.qq.com/article/" + id + "/commentnum?callback=reader.commentcall";
    if (id != "") {
      $.getScript(url, function() {})
    } else {
      $(".commcount").remove();
    }
  },
  commentcall: function(data) {
    if (data.errCode == 0) {
      $(".commcount i").text(data.data.commentnum)
    }
  },
  getreview: function(id) {
    var url = "//yc.open.qq.com/ninja/index.php?c=index&a=product&columnId=" + id + "&count=5&start=0&format=js";
    $.getScript(url, function() {})
  }
}
var ninja_callback = function(data) {
  if (data != "null") {
    var tpl = "";
    for (var i = 0; i < data.length; i++) {
      var _riqi = data[i].n_creattime.split(" ")[0]
      if (data[i].n_image != "" && data[i].n_url != "") {
        tpl += '<li><a href="' + data[i].n_url + '"><h4>' + data[i].n_title + '</h4><div class="image"><img src="' + data[i].n_image + '"><p>第' + data[i].n_times + '期&nbsp;&nbsp;' + _riqi + '</p></div></a></li>'
      }
    };
    $(".slideinner ul").html(tpl);
    $(".review").show();
    reader.slide(data.length);
  } else {
    $(".review").remove();
  };
};

$('.wqlink').click(function() {
  if ($('.wqbox').css("display") == "none") {
    $('.wqbox').fadeIn('fast');
  } else {
    $('.wqbox').fadeOut('fast');
  }
});
$(".close").click(function() {
  $('.wqbox').fadeOut('fast');
})
$(window).scroll(function() {
  if ($(this).scrollTop() > 500) {
    $('.goTop').fadeIn();
  } else {
    $('.goTop').fadeOut();
  }
})
$(".goTop").hover(
  function() {
    $(this).addClass("goTophover");
  },
  function() {
    $(this).removeClass("goTophover");
  }
);


$('.goTop').on("click", function() {
  $("body, html").animate({
    scrollTop: 0
  }, '500');
});

// 分享

window.icedzhangshare = function(data) {
  if (data.code) {
    $("#erweima").html("<img src='" + data.url + "'>");
  } else {
    $("#erweima,#share_m").hide();
  }
}
if (mobileUrl && mobileUrl != "null" && mobileUrl != "NULL") {
  $.getScript('//news.open.qq.com/qrcode/gen.php?url=' + mobileUrl + '&callback=window.icedzhangshare');
} else {
  $("#erweima,#share_m").hide();
}

function shareaside() {
  var self = this; //参数说明：self.tit说明文字，self.pic小图片，self.url分享要链接到的地址
  if ($(".daoyu img").length > 0) {
    self.pic = $(".daoyu").eq(0).find("img").attr("src");
  } else {
    self.pic = config.image;
  }
  self.tit = config.title;
  self.titsummary = config.desc;
  self.url = window.location.href;
}

shareaside.prototype = {
  postToWb: function() {
    var _t = encodeURI(this.tit); //当前页面title，使用document.title
    var _url = encodeURIComponent(this.url); //当前页的链接地址使用document.location
    var _appkey = encodeURI("appkey"); //你从腾讯获得的appkey，如果有appkey,直接写入key值，例如：_appkey=123456
    var _pic = encodeURI(this.pic); //（例如：var _pic='图片url1|图片url2|图片url3....）
    var _site = ''; //你的网站地址
    var _u = '//v.t.qq.com/share/share.php?title=' + _t + '&url=' + _url + '&appkey=' + _appkey + '&site=' + _site + '&pic=' + _pic;
    window.open(_u, '分享到腾讯微博');
  },
  //参数说明：title标题，summary摘要，pic小图片，url分享要链接到的地址
  postToQzone: function() {
    var _url = encodeURIComponent(this.url); //当前页的链接地址使用document.location
    var _t = encodeURI(this.tit); //当前页面title，使用document.title
    var _pic = encodeURI(this.pic); //（例如：var _pic='图片url1|图片url2|图片url3....）
    var _summary = encodeURIComponent('');
    var _u = '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + _url + '&title=' + _t + '&pics=' + _pic + '&summary=' + _summary;
    window.open(_u, '分享到QQ空间和朋友网');
  },
  shareToSina: function() {
    var url = "//v.t.sina.com.cn/share/share.php",
      _url = this.url,
      _title = this.tit,
      _appkey = '',
      _ralateUid = '',
      c = '',
      pic = this.pic;
    c = url + "?url=" + encodeURIComponent(_url) + "&appkey=" + _appkey + "&title=" + _title + "&pic=" + pic + "&ralateUid=" + _ralateUid + "&language=";
    window.open(c, "shareQQ", "height=480,width=608,top=100,left=200,toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
  },
  share2qq: function() {
    //var l = document.getElementById('imgBox').getElementsByTagName('img')[0];
    var a = "//connect.qq.com/widget/shareqq/index.html",
      d = this.url,
      m = this.tit,
      pic = this.pic,
      pl = '加点评论吧...',
      b = "",
      x = window.screen.width,
      y = window.screen.height;
    h = "", k = ""; //g = l.join("||")||"";
    k = a + "?url=" + encodeURIComponent(d) + "&showcount=0&desc=" + encodeURIComponent(pl) + "&summary=" + encodeURIComponent(this.titsummary) + "&title=" + encodeURIComponent(m) + "&pics=" + pic + "&style=203&width=19&height=22";
    window.open(k, "", "height = 680, width = 960, top = " + (y - 680) / 2 + ", left = " + (x - 960) / 2 + ", toolbar = no, menubar = no, resizable = yes, location = yes,status = no");
  },
  init: function() {
    var _this = this;
    // 腾讯微博入口下线
    $('.share_wb').on('click', function() {
      _this.postToWb();
    }).hide();
    $('.share_qzone').on('click', function() {
      _this.postToQzone();
    })
    $('.share_sina').on('click', function() {
      _this.shareToSina();
    })
    $('.share_qq').on('click', function() {
      _this.share2qq();
    })
  }
}
var share1 = new shareaside();
share1.init();

$(function() {
  reader.init();
}) /*  |xGv00|46ce623389c39273d1ee860b684411eb */