/**
 * date: 2018-7-30 
 * 修改登录方式为QQ互联
 */
window.QQ = {};
QQ.Cookie = {
  set: function (name, value, expires, path, domain) {
    if (typeof expires == "undefined") {
      expires = new Date(new Date().getTime() + 3600 * 1000);
    }
    document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "; path=/") + ((domain) ? ";domain=" + domain : "");
  },
  get: function (name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
      return unescape(arr[2]);
    }
    return null;
  },
  clear: function (name, path, domain) {
    if (this.get(name)) {
      document.cookie = name + "=" + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
    }
  }
};
var getMD5 = function (str) {
  var hexcase = 0;
  var b64pad = '';
  var chrsz = 8;
  var mode = 32;

  function hex_md5(s) {
    return binl2hex(core_md5(str2binl(s), s.length * chrsz))
  }

  function b64_md5(s) {
    return binl2b64(core_md5(str2binl(s), s.length * chrsz))
  }

  function str_md5(s) {
    return binl2str(core_md5(str2binl(s), s.length * chrsz))
  }

  function hex_hmac_md5(key, data) {
    return binl2hex(core_hmac_md5(key, data))
  }

  function b64_hmac_md5(key, data) {
    return binl2b64(core_hmac_md5(key, data))
  }

  function str_hmac_md5(key, data) {
    return binl2str(core_hmac_md5(key, data))
  }

  function core_md5(x, len) {
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd)
    }
    if (mode == 16) {
      return Array(b, c)
    } else {
      return Array(a, b, c, d)
    }
  }

  function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
  }

  function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
  }

  function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
  }

  function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t)
  }

  function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
  }

  function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
    var ipad = Array(16),
      opad = Array(16);
    for (var i = 0; i < 16; i++) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5C5C5C5C
    }
    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128)
  }

  function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF)
  }

  function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  function str2binl(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin
  }

  function binl2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz) str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
    return str
  }

  function binl2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF)
    }
    return str
  }

  function binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
      var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
      for (var j = 0; j < 4; j++) {
        if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
        else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F)
      }
    }
    return str
  }
  return hex_md5(str)
}



var getCSRFToken = function (skey) {
  var md5key = 'tencentQQVIP123443safde&!%^%1282';
  var salt = 5381;

  var hash = [],
    ASCIICode;
  hash.push((salt << 5));
  if (QQ.Cookie.get("skey")) {
    for (var i = 0, len = skey.length; i < len; ++i) {
      ASCIICode = skey.charAt(i).charCodeAt(0);
      hash.push((salt << 5) + ASCIICode);
      salt = ASCIICode
    }
  }

  return getMD5(hash.join('') + md5key)
}

setTimeout(function () {
  var defaultOpts = {
    beforeLogin: $(".beforeLogin"), //登录前dom
    afterLogin: $(".afterLogin"), //登录后dom
    latelyPlayed: $(".lately_played") //最近玩过dom
  };

  function token() {
    if (QQ.Cookie.get("skey")) { //auth.isLLogin() 是判断QQ是否登录方法，可以自行修改。
      var cookieValue = QQ.Cookie.get("skey") || "";
      if ("" === cookieValue) {
        return "";
      }
      var hash = 5381;
      for (var i = 0, len = cookieValue.length; i < len; i++) {
        hash += (hash << 5) + cookieValue.charCodeAt(i);
      }
      hash = hash & 2147483647;
      return hash;
    } else if (QQ.Cookie.get("access_token") !== null) {
      return QQ.Cookie.get("access_token").substr(0, 10);
    } else {
      return "";
    }
  };

  function userinfo(_token, g_tk) { //用户信息
    $.ajax({ //获取昵称和头像
      url: '//iwan.qq.com/api/v1/getNickAndAvatar?token=' + _token,
      method: "get",
      dataType: "jsonp",
      jsonpCallback: "nickCallBack",
      data: {
        jsonp: "nickCallBack"
      },
      success: function (res) {
        //console.log('res', res)
        $(".afterLogin .user_head img").attr("src", res.data.avatar);
        $(".afterLogin .user_name").html(res.data.nick);
      }
    });

    $.ajax({ //获取会员信息			
      url: '//cgi.vip.qq.com/profile/userinfo',
      method: "get",
      dataType: "jsonp",
      data: {
        data: 'uin,is_club,is_superclub,level,is_year_club',
        g_tk: g_tk
      },
      success: function (res) {
        var level = res.level;
        if (res.is_club == 1 && res.is_superclub == 0) { //现在是会员
          $("#hy1").addClass("kghy" + level);
        } else if (res.is_club == 1 && res.is_superclub == 1) { //现在是超级会员
          $("#hy1").hide();
          $("#cjhy1").show().addClass("cjhy" + level);
        } else if (res.is_club == 0 && res.is_superclub == 0 && res.level !== 0) { //曾经是普通会员，掉了只有等级
          $("#hy1").addClass("ever-vip-" + level);
        } else if (res.is_club == 0 && res.is_superclub == 1 && res.level !== 0) { //曾经是超级会员，掉了只有等级
          $("#hy1").hide();
          $("#cjhy1").show().addClass("ever-svip-" + level);
        } else { //所有条件均为0，从来都不是会员玩家默认添加初始会员等级为1的图标
          $("#hy1").addClass("ever-vip-1");
        }

        if (res.is_year_club == 1) { //年费会员
          $(".nianfei").addClass("nianfei1");
        } else {
          //不是年费会员
        }


      }
    });

    $.ajax({ //获取积分			
      url: '//iwan.qq.com/interface/getuerscore?r=1473755806154&_=1473755805903',
      method: "get",
      dataType: "jsonp",
      jsonpCallback: "uerscore",
      data: {
        jsonp: "uerscore"
      },
      success: function (res) {
        var code = res.code;
        var gold = res.gold;
        var silver = res.silver;
        $(".user-money-g").html(gold);
        $(".user-money-s").html(silver);
      }
    });

    $.ajax({ //最近玩过			
      url: '//iwan.qq.com/pc/getLatePlayGame',
      method: "get",
      dataType: "jsonp",
      jsonpCallback: "playedCallback",
      data: {
        jsonp: "playedCallback",
        num: 4
      },
      success: function (res) {
        var data_list = res.data;
        var playedlist_html = '';
        if (data_list.length != 0) {
          for (var i = 0; i < data_list.length; i++) {
            if (i < 4) {
              var Flink;
              if (data_list[i].FServer) {
                Flink = data_list[i].FServer[0].serverId;
                var serverId = data_list[i].FServer[0].server;
                var Fgid = data_list[i].FGameId;
                Flink = 'http://iwan.qq.com/playgame?gid=' + Fgid + '&sid=' + Flink + '&sname=' + encodeURI(serverId);
              } else {
                Flink = data_list[i].FHomePage;
              }
              playedlist_html += '<li><a href="' + Flink + '" target="_blank"><img name="page_cnt_1" src="' + httpHandle(data_list[i].FPic1) + '" alt="' + data_list[i].FGameName + '"></a></li>';
            }
          }
          $("#played_cont").html(playedlist_html);
          defaultOpts.latelyPlayed.show();
        } else { //未玩过
          defaultOpts.latelyPlayed.hide();
        }
      }
    });
    setTimeout(function () {
      defaultOpts.afterLogin.show();
    }, 100);
  };

  //首先判断登录	
  if (QQ.Cookie.get("qq_access_token")) { //已登录
    defaultOpts.beforeLogin.hide();
    var _token = token();
    var skey = QQ.Cookie.get("skey");
    var g_tk = getCSRFToken(skey);
    if (_token) {
      userinfo(_token, g_tk);
    } else {
      defaultOpts.beforeLogin.show();
      defaultOpts.afterLogin.hide();
      defaultOpts.latelyPlayed.hide();
    }
  } else { //未登录
    defaultOpts.beforeLogin.show();
    defaultOpts.afterLogin.hide();
    defaultOpts.latelyPlayed.hide();
  }

  //退出后初始化
  function aiwanLoginOut() {
    defaultOpts.beforeLogin.show();
    defaultOpts.afterLogin.hide();
    defaultOpts.latelyPlayed.hide();
    $("#hy1").attr('class', '').addClass('qq-vip kghy');
    $("#cjhy1").attr('class', '').addClass('cjhy');
    $(".nianfei").attr('class', '').addClass('qq-vip-year nianfei');
    $(".user-money-g").html("");
    $(".user-money-s").html("");
  }

  //登陆成功
  function aiwanLoginIn() {
    var _token = token();
    var skey = QQ.Cookie.get("skey");
    var g_tk = getCSRFToken(skey);
    userinfo(_token, g_tk);
    defaultOpts.beforeLogin.hide();
    defaultOpts.afterLogin.show();
    defaultOpts.latelyPlayed.show();
  }

  window.aiwan = {
    loginIn: aiwanLoginIn,
    loginOut: aiwanLoginOut
  }

  $.ajax({ //游戏礼包		
    url: '//iwan.qq.com/pc/getModuleBlock?id=495',
    method: "get",
    dataType: "jsonp",
    jsonpCallback: "gamespackageCallBack",
    data: {
      jsonp: "gamespackageCallBack"
    },
    success: function (res) {
      var data_list = res.data.block_data.block_info;
      var gameslist_html = '';
      if (data_list.length != 0) {
        for (var i = 0; i < data_list.length; i++) {
          gameslist_html += '<li class="item cf false">' +
            '<div class="pic"><a href="' + data_list[i].target_url + '" target="_blank"><img name="page_cnt_1" src="' + httpHandle(data_list[i].pic_url) + '" alt="' + data_list[i].target_url + '"></a></div>' +
            '<div class="txt"><h4><a href="' + data_list[i].target_url + '" target="_blank">' + data_list[i].title + '</a></h4><p>' + data_list[i].describe + '</p></div>' +
            '</li>'
        }
      }
      $("#games_package_cont").html(gameslist_html);
    }
  });

  function httpHandle(url) {
    var pos = url.indexOf('http:');
    var _url = pos >= 0 ? url.substring(5) : url;
    return _url;
  }
}, 500);/*  |xGv00|1828390271e8866ecd9e01f82de55b9a */