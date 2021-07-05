function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

var SKEY = getUrlParam("skey")
var UIN = getUrlParam("uin")
var vendor_lib = function (e) {
  function t(n) {
    if (r[n]) return r[n].exports;
    var a = r[n] = {"exports": {}, "id": n, "loaded": !1};
    return e[n].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
  }

  var n = window["webpackJsonpvendor_lib"];
  window["webpackJsonpvendor_lib"] = function (r, i) {
    for (var o, s, c = 0, l = []; c < r.length; c++) s = r[c], a[s] && l.push.apply(l, a[s]), a[s] = 0;
    for (o in i) e[o] = i[o];
    for (n && n(r, i); l.length;) l.shift().call(null, t)
  };
  var r = {}, a = {"0": 0};
  return t.e = function (e, n) {
    if (0 === a[e]) return n.call(null, t);
    if (void 0 !== a[e]) a[e].push(n); else {
      a[e] = [n];
      var r = document.getElementsByTagName("head")[0], i = document.createElement("script");
      i.type = "text/javascript", i.charset = "utf-8", i.async = !0, i.src = t.p + "js/" + ({"1": "develop"}[e] || e) + "." + {"1": "cb91b24a533b995f4b45"}[e] + ".js", r.appendChild(i)
    }
  }, t.m = e, t.c = r, t.p = "//midas.gtimg.cn/midas/minipay_v2/", t(0)
}({
  "0": function (e, t, n) {
    e.exports = n
  }, "43759118": function (e, t, n) {
    var r, a, i = !1, o = (n(88981800), n(107740998));
    e.exports = {
      "init": function (e, t) {
        if (!e || !t) throw Error("appid and openkey must provided");
        i || (this.reset(e, t), i = !0)
      }, "isInit": function () {
        return i
      }, "getSck": function () {
        // if (!i) throw Error("sck must init");
        return (o.hex_md5("1450000186" + SKEY) + "").toUpperCase()
      }, "genSck": function (e, t) {
        return (o.hex_md5(e + t) + "").toUpperCase()
      }, "reset": function (e, t) {
        if (!e || !t) throw Error("appid and openkey must provided");
        r = e, a = t
      }
    }
  }, "43866881": function (e, t, n) {
    var r = n(88981800), a = r.fn.getParams(), i = {"isSandbox": "1" == a.sandbox, "isDev": "2" == a.sandbox};
    i.isProduction = !i.isSandbox && !i.isDev, e.exports = i
  }, "52137608": function (e, t) {
    e.exports = {
      "_data": {}, "set": function (e, t) {
        this._data[e] = t
      }, "get": function (e) {
        return this._data[e] || ""
      }
    }
  }, "55191419": function (e, t, n) {
    var r = n(80667616), a = 15, i = e.exports = function (e) {
      if (e = e || {}, this.opt = e, this.sessionObj = e.sessionObj, !e.uuid || !e.sessionObj || !e.onSuccess) throw Error("You should provide uuid,cgi obj and onSuccess Event handler");
      this.count = 0, this.isDestroyed = !1
    };
    i.prototype.start = function () {
      var e = this;
      if (!this.isDestroyed && this.opt.uuid) {
        var t, n = "push_cb_" + parseInt(1e7 * Math.random());
        window[n] = function (e) {
          window.jsonName = null, t = e
        };
        var i = this.sessionObj.getSessionParam(),
          o = "//" + (this.opt.sandbox ? "sandbox." : "") + "jspay.qq.com/jsonp?uin=" + i.openid + "&skey=" + i.openkey + "&uuid=" + this.opt.uuid + "&cb=" + n + "&junhan=" + Math.random();
        r.getScript(o, function () {
          if (!e.isDestroyed) {
            var n = ~~t;
            switch (n >= 300 && n <= 400 && (n = 300), n) {
              case 0:
                if (e.count > a) return void (e.opt.onTimeout && e.opt.onTimeout());
                e.count++, e.start();
                break;
              case 1:
                e.opt.onPaying && e.opt.onPaying(), e.start();
                break;
              case 300:
                e.opt.onScan && e.opt.onScan(), e.start();
                break;
              case 1e3:
                e.opt.onSuccess && e.opt.onSuccess(), e.opt.uuid = null
            }
          }
        })
      }
    }, i.prototype.destroy = function () {
    }, i.prototype.abort = function () {
      try {
        "stop" in window ? window.stop() : document.execCommand("Stop"), this.opt.uuid = null
      } catch (e) {
      }
      this.isDestroyed = !0
    }
  }, "56034868": function (e, t, n) {
    var r = n(88981800), a = function (e) {
      e = e || {}, this.opt = e, this.interval = null
    };
    a.prototype.stop = function (e) {
      var t = {"0": "Timeout", "1": "Interval"};
      window["clear" + t[e]](this.interval), this.interval = null
    }, t.CountDown = function (e) {
      if (e = e || {}, a.call(this, e), !(e.time && e.beforeCount && e.counting && e.countEnd)) throw Error("can not use countDown");
      this.retry()
    }, r.inherits(t.CountDown, a), t.CountDown.prototype.retry = function () {
      var e = this.opt;
      e.beforeCount();
      var t = e.time, n = function () {
        if (this.interval) return e.counting(t), t <= 0 ? (this.stop(1), void e.countEnd()) : void t--
      };
      this.interval = setInterval(n.bind(this), 1e3), n.call(this)
    }, t.Timeout = function (e) {
      e = e || {}, e.time = e.time || 5, a.call(this, e), this.interval = setTimeout(function () {
        this.interval && (this.stop(0), e.timeUp && e.timeUp())
      }.bind(this), 1e3 * e.time)
    }, r.inherits(t.Timeout, a)
  }, "65547813": function (e, t, n) {
    var r = n(80667616), a = n(88981800), i = function () {
      this.init()
    };
    i.prototype = {
      "init": function (e) {
        e = e || {};
        var t = this;
        t.interactionEvents = ["input", "change", "mouseup"], t.records = {}, t.loadTime = (new Date).getTime(), t.bindEvents()
      }, "findTrack": function (e) {
        for (; e.parentNode;) {
          var t = r(e).data("track");
          if (t) return t;
          e = e.parentNode
        }
        return null
      }, "bindEvents": function () {
        for (var e = this, t = 0; t < e.interactionEvents.length; t++) r(document.body).bind(e.interactionEvents[t], function (t) {
          t.stopPropagation();
          var n = e.findTrack(t.target);
          n && e.add(t, n)
        })
      }, "add": function (e, t) {
        var n = this, a = r(e.target), i = (new Date).getTime(), o = {
          "event": e.type,
          "title": a.attr("title"),
          "value": a.val(),
          "content": e.target.innerText,
          "ts": i - n.loadTime
        };
        return n.records[t] = o, n
      }
    }, e.exports = {
      "init": function () {
        i.instance || (i.instance = new i)
      }, "get": function () {
        return i.instance && i.instance.records
      }, "serialize": function (e) {
        var t = {
          "friendInput": "a",
          "customAmountInput": "b",
          "changeId": "c",
          "channel": "d",
          "product": "e",
          "payBtn": "f",
          "chooseArea": "g",
          "chooseServer": "h",
          "chooseRole": "i"
        }, n = ["v=1"];
        return a.fn.each(e, function (e, r) {
          "mouseup" === e.event && n.push(t[r] + ",m," + e.ts), "input" !== e.event && "change" !== e.event || n.push(t[r] + ",i," + e.ts + "," + e.value)
        }), n.join(";")
      }
    }
  }, "68485499": function (e, t) {
    !function () {
      "use strict";
      var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      window.btoa || (window.btoa = function (t) {
        for (var n, r, a = String(t), i = 0, o = e, s = ""; a.charAt(0 | i) || (o = "=", i % 1); s += o.charAt(63 & n >> 8 - i % 1 * 8)) {
          if ((r = a.charCodeAt(i += .75)) > 255) throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
          n = n << 8 | r
        }
        return s
      }), window.atob || (window.atob = function (t) {
        var n = String(t).replace(/[=]+$/, "");
        if (n.length % 4 == 1) throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        for (var r, a, i = 0, o = 0, s = ""; a = n.charAt(o++); ~a && (r = i % 4 ? 64 * r + a : a, i++ % 4) ? s += String.fromCharCode(255 & r >> (-2 * i & 6)) : 0) a = e.indexOf(a);
        return s
      })
    }()
  }, "68821120": function (e, t, n) {
    var r = n(88981800), a = function (e) {
      return parseInt(e, 10)
    }, i = r.fn.getParams(), o = {}, s = {"change_wx_openid": a};
    r.fn.each(i, function (e, t, n) {
      s[t] && (n[t] = s[t](e))
    }), e.exports = {"urlParams": i, "computed": o}
  }, "73059877": function (e, t, n) {
    var r = n(88981800), a = r, i = n(76812298), o = n(80667616), s = n(105812088), c = n(43759118),
      l = (n(107740998), n(113677689)), u = n(68821120), f = n(99817079), d = u.urlParams;
    n(111001777);
    var p = e.exports = function (e) {
      e = e || {}, this.opt = e, this.report = f, this.pf = e.pf, this.aid = e.aid, this.pfkey = e.pfkey || "pfkey", this.appid = e.appid, this.sandbox = ~~e.sandbox, this.sessionObj = e.sessionObj || null, this.mid = e.mid || "r";
      var t = "api.unipay.qq.com";
      0 == ~~this.sandbox ? this.domain = t : 1 == ~~this.sandbox ? this.domain = "sandbox." + t : 2 == ~~this.sandbox ? this.domain = "dev." + t : 3 == ~~this.sandbox && (this.domain = "testing." + t), this.domainq = this.sandbox ? "sandbox.api.unipay.qq.com" : "q.unipay.qq.com", this.aesKey = this.sandbox ? "0269bd8009164afc" : "2Wozy2aksie1puXU", c.init(this.appid, this.sessionObj.openkey), !e.diableAutoCookie && this.setLoginToCookie(), this.webversion = e.webversion
    };
    p.url = {
      "webBuyPage": {"url": "$domain$/v1/r/$appid$/web_page_info?", "https": !1},
      "webGoodsInfo": {"url": "$domain$$params$&", "https": !1},
      "webSaveGoods": {"url": "$domain$/v1/$mid$/$appid$/web_save?", "https": !1},
      "webSaveGoods2": {"url": "$params$&", "https": !1},
      "webSaveGoods3": {"url": "$domain$$params$&", "https": !1},
      "webSave": {"url": "$domain$/v1/r/$appid$/web_save?", "https": !1},
      "getToken": {"url": "$domain$/v1/r/$appid$/get_token?", "https": !1},
      "mobilePay": {"url": "$domain$/v1/r/$appid$/mobile_pay?", "https": !0},
      "mobileGetQrcode": {"url": "$domain$/v1/$mid$/$appid$/mobile_get_qrcode?", "https": !0},
      "mobileoverseacommon": {"url": "$domain$/v1/r/$appid$/mobile_overseas_common?", "https": !1},
      "mobileGetBalance": {"url": "$domain$/v1/$mid$/$appid$/mobile_get_balance?", "https": !1},
      "mobileWirelessProc": {"url": "$domain$/v1/r/$appid$/mobile_wireless_proc?", "https": !1},
      "mobileGetCardBillInfo": {"url": "$domain$/v1/r/$appid$/mobile_get_cardbill_info?", "https": !1},
      "friendlist": {"url": "$domain$/v1/$mid$/$appid$/web_get_friends?", "https": !1},
      "openedServices": {"url": "$domain$/v1/$mid$/$appid$/mobile_month_opend?", "https": !0},
      "mobileGetImage": {"url": "$domain$/v1/r/$appid$/mobile_get_image?", "https": !0},
      "wechatQuery": {"url": "$domain$/v1/r/$appid$/wechat_query?", "https": !0},
      "payResult": {"url": "$domain$/v1/r/$appid$/get_pay_result?", "https": !1},
      "roleList": {"url": "$domain$/v1/r/$appid$/get_role_list?", "https": !1},
      "getQrCode": {"url": "$domain$/v1/r/$appid$/qrcode?", "https": !1},
      "rcRestrict": {"url": "$domain$/v1/r/$appid$/rc_restrict?", "https": !1},
      "gameMainAccount": {"url": "$domain$/v1/r/$appid$/get_game_main_account?", "https": !1},
      "mobileCouponsInfo": {"url": "$domain$/v1/r/$appid$/mobile_coupons_info?", "https": !1},
      "mobileCouponsRollback": {"url": "$domain$/v1/r/$appid$/mobile_coupons_rollback?", "https": !1},
      "getBankList": {"url": "$domain$/v1/r/$appid$/get_bank_list?", "https": !1}
    }, p.ajax = o.ajax, p.get = o.get, p.post = o.post, p.prototype = {
      "genAesMsg": function (e, t) {
        var n = [];
        return r.lang.isString(e) ? n = e : (r.fn.each(t, function (t) {
          n.push(t + "=" + (e[t] || ""))
        }), n = n.join("&")), n
      }, "aes": function (e, t) {
        var n = this.genAesMsg(e, t), r = i.AES.encrypt(i.enc.Latin1.parse(n), i.enc.Latin1.parse(this.aesKey), {
          "padding": i.pad.ZeroPadding,
          "iv": i.enc.Latin1.parse(this.aesKey),
          "mode": i.mode.ECB
        }).ciphertext.toString(i.enc.Hex);
        return {"encrypt_msg": r, "msg_len": n.length}
      }, "aesDecrypt": function (e) {
        if (e = e || "", "" === e) return "";
        e = i.enc.Hex.parse(e), e = i.enc.Base64.stringify(e);
        var t = i.AES.decrypt(e, i.enc.Utf8.parse(this.aesKey), {"padding": i.pad.ZeroPadding, "mode": i.mode.ECB});
        return t.toString(i.enc.Utf8)
      }, "_getCgiUrl": function (e, t, n, i) {
        n = n || {}, i = i || {};
        var o, s = a.fn.safeGet(window.__midasStaticConfig_midas_webpay, "itemMap.webpay.force_http_offerid");
        e.https && !this.sandbox || "https:" == location.protocol ? (o = "https", s.indexOf(this.appid) > -1 && (o = "http")) : o = "http", this.webversion && (t.webversion = this.webversion), d.change_wx_openid && (t.change_wx_openid = d.change_wx_openid), t.from_https = 1, !n.appid && t.sck || (t.sck = c.genSck(n.appid || this.appid, decodeURIComponent(t.openkey))), a.fn.isOpenid(t.provide_uin) && (t.extend = encodeURIComponent("provide_no_type=openid&provide_uin=" + t.provide_uin), delete t.provide_uin);
        var l = r.fn.getParam("qqAppid");
        return l && (t.offerid_for_qq_appid = l), r.tmpl(e.url, r.fn.extend({
          "appid": this.appid,
          "mid": this.mid || "r",
          "domain": [o, "://", i.domainq ? this.domainq : this.domain].join("")
        }, n)) + r.req.serializeParam(t)
      }, "getMobilePf": function () {
        return this.pf + "-minipay-android"
      }, "resetSession": function (e, t, n, r) {
        var a = new l({
          "openid": e,
          "openkey": t,
          "sessionid": n || this.sessionObj.sessionid,
          "sessiontype": r || this.sessionObj.sessiontype
        });
        this.sessionObj = a, this.setLoginToCookie(), t && this.resetSck(this.appid, t)
      }, "resetSck": function (e) {
        c.reset(e, this.sessionObj.openkey)
      }, "setLoginToCookie": function () {
        try {
          if (a.cookie.del("midas_openkey", {"domain": ".qq.com"}), a.cookie.del("midas_openid", {"domain": ".qq.com"}), a.cookie.set("midas_openid", this.sessionObj.openid, {
            "domain": ".qq.com",
            "disableTime": !0
          }), a.cookie.set("midas_openkey", this.sessionObj.openkey, {
            "domain": ".qq.com",
            "disableTime": !0
          }), "function" == typeof this.report) try {
          } catch (e) {
          }
          a.cookie.get("midas_openid") || "function" == typeof this.report && this.report("midas.cookie.fail", {"resultinfo": {"err": "cookie_set_fail"}})
        } catch (e) {
          "function" == typeof this.report && this.report("midas.cookie.fail", {"resultinfo": {"err": e.message}})
        }
      }, "_getSessionInfo": function () {
        var e = this._getSessionParam();
        return a.fn.each(["openid", "openkey"], function (t) {
          delete e[t]
        }), e
      }, "_getSessionParam": function (e) {
        var t = {};
        e ? t = e.getSessionParam() : (t = this.sessionObj.getSessionParam(), t.sck = c.getSck());
        var n = document.getElementById("mkey"), a = n ? o(n).attr("mkey") : "";
        return t.anti_auto_script_token_id = a ? this.aesDecrypt(a) : "", r.fn.extend({
          "pf": this.pf,
          "pfkey": this.pfkey,
          "aid": this.aid,
          "from_h5": 1,
          "pc_st": s,
          "r": Math.random()
        }, t)
      }, "_getExtendParam": function (e) {
        var t = decodeURIComponent(r.fn.getParam("cgiExtend")), n = r.fn.getParams(t, ";", ":"), a = {};
        return n["*"] && r.fn.extend(a, r.fn.getParams(n["*"])), r.fn.each(n, function (t, n) {
          var i = n.split(/\s*,\s*/);
          i.indexOf(e) > -1 && r.fn.extend(a, r.fn.getParams(t))
        }), a
      }, "_report": function (e, t) {
        t = t || {}, "function" == typeof this.report && this.report(e, {"resultinfo": t, "resultcode": t.ret})
      }, "_doRequestPost": function (e, t, n) {
        var r = e.split("?"), a = r[1];
        e = r[0];
        var i = new XMLHttpRequest;
        i.open("POST", e, !0), i.withCredentials = !0;
        try {
          i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        } catch (o) {
        }
        i.onreadystatechange = function () {
          if (4 === i.readyState) {
            var n, r = i.status;
            if (r >= 200 && r < 300) try {
              n = JSON.parse(i.responseText)
            } catch (o) {
              n = {"ret": -9998, "path": e + "?" + a, "msg": "系统繁忙，请稍后再试"}
            }
            n || (n = {"ret": -9e3, "err_code": -(9e3 + r), "path": e + "?" + a, "msg": "系统繁忙，请稍后再试"}), t(n)
          }
        }, i.send(a)
      }, "_doRequestJsonp": function (e, t, n) {
        var a, i = n.callback || "_h5pay" + Math.floor(1e6 * Math.random());
        e = r.fn.insertParam({"format": "jsonp_" + i}, e), window[i] = function (e) {
          a = e
        };
        o.getScript(e).done(function () {
          a || (a = {"ret": -9998, "path": e, "msg": "系统繁忙，请稍后再试！"}), t(a)
        }).fail(function (e) {
          self._report("req." + cginame + ".jsonp.fail", {"ret": "-9999", "networkType": "jsonp"})
        })
      }, "_doRequest": function (e, t, n) {
        var a = this, i = ((new Date).getTime(), e.split("?")[0].split("/")), o = i[i.length - 1],
          s = (r.fn.getParam("type", e), this._getExtendParam(o));
        e = r.fn.addParam(r.fn.extend(s, {
          "t": (new Date).getTime(),
          "__refer": "string" == typeof document.referrer ? encodeURIComponent(document.referrer.substr(0, 4e3)) : ""
        }), e);
        var c = "XMLHttpRequest" in window && "undefined" != typeof (new XMLHttpRequest).withCredentials && !/MSIE|adobeair/i.test(navigator.userAgent),
          l = c ? "ajax" : "jsonp";
        this._report("req." + o + ".start", {"networkType": l, "url": r.fn.delParam(["__refer"], e)});
        var u = function (e) {
          if (0 == e.ret) {
            var n = {"networkType": l};
            e.info && e.info.portal_serial_no && (n.portal_serial_no = e.info.portal_serial_no), a._report("req." + o + ".success", n)
          } else a._report("req." + o + ".fail", {"ret": e.ret, "err_code": e.err_code, "networkType": l});
          if ("function" == typeof t) try {
            t(e)
          } catch (r) {
          }
        }.bind(this);
        c ? this._doRequestPost(e, u, n) : this._doRequestJsonp(e, u, n)
      }, "jsonp": function (e, t, n) {
        n = n || {};
        var a = (/(\w+)\?/.exec(e) || [])[1], i = this._getExtendParam(a);
        e = r.fn.addParam(i, e), n.proxy ? t({"ret": 0, "jump": e}) : this._doRequest(e, t, n)
      }, "getQbSurplus": function (e, t) {
      }, "getQqacctYue": function (e, t, n) {
        e = e || {};
        var a = {"cmd": 4};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), this.jsonp(this._getCgiUrl(p.url.wechatQuery, a), t, n)
      }, "getPayResult": function (e, t, n) {
        e = e || {};
        var a = {};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), a.pf = this.getMobilePf(), this.jsonp(this._getCgiUrl(p.url.payResult, a), t, n)
      }, "getVerifyCode": function (e) {
      }, "webSave": function (e, t, n) {
        e = e || {};
        var i, o, s = this;
        i = {
          "wx_direct_pay": 0,
          "wx_publice_pay": "wechat" === e.pay_method ? 1 : 0
        }, e.session && (o = e.session, delete e.session), e.provide_uin && a.fn.isOpenid(e.provide_uin) && (i.extend = encodeURIComponent("provide_no_type=openid&provide_uin=" + e.provide_uin), delete e.provide_uin), r.fn.extend(i, this._getSessionParam(o)), r.fn.extend(i, e), r.fn.extend(i, this.xMidasEncrypt(i, ["token_id", "openid", "openkey", "session_id", "session_type", "zoneid", "pay_method", "buy_quantity", "mb_pwd", "pay_id", "auth_key", "card_value", "accounttype", "provide_uin", "extend", "ts"]));
        var c = i.encrypt_way ? "new" : "no";
        f("encrypt." + c), s.jsonp(s._getCgiUrl(p.url.webSave, i, n), t, n)
      }, "xMidasEncrypt": function (e, t) {
        var n = a.fn.safeGet(window.__midasStaticConfig_midas_webpay, "itemMap.webpay.old_encrypt_offerid") || [];
        if (n.indexOf(this.appid) > -1) return null;
        var i = this,
          o = r.fn.extend({}, e, {"ts": 1 * document.getElementById("xMidasTimestamp").value + Math.round(((new Date).getTime() - window.__startTime || 0) / 1e3)}),
          s = i.genAesMsg(o, t), c = document.getElementById("xMidasToken").value;
        if (c) {
          var l = document.getElementById("xMidasVersion").value, u = r.monitorTime(function () {
            try {
              return xMidas.crypt({"d": s})
            } catch (e) {
              return null
            }
          });
          return null === u.result ? (f.times("xmidas.error", u.times), {}) : (f.times("xmidas.encrypt", u.times), {
            "encrypt_msg": u.result,
            "base_key_version": l,
            "encrypt_way": "web_new_encrypt",
            "web_token": c
          })
        }
      }, "mobilePay": function (e, t) {
        e = e || {};
        var n, a = "buy";
        n = {
          "wx_direct_pay": 0,
          "wx_publice_pay": "wechat" === e.pay_method ? 1 : 0
        }, r.fn.extend(n, this._getSessionParam()), r.fn.extend(n, e), r.fn.extend(n, this.aes(n, ["token_id", "openid", "openkey", "session_id", "session_type", "zoneid", "pay_method", "buy_quantity", "mb_pwd", "pay_id", "auth_key", "card_value", "accounttype"])), this.jsonp(this._getCgiUrl(p.url.mobilePay, n), t, a)
      }, "webBuyPage": function (e, t, n) {
        e = e || {};
        var a = {"type": "save"};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), this.jsonp(this._getCgiUrl(p.url.webBuyPage, a), t, n)
      }, "getBankList": function (e, t, n) {
        e = e || {};
        var a = {"pay_method": "bank:82"};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), this.jsonp(this._getCgiUrl(p.url.getBankList, a), t, n)
      }, "friendsPay": function (e, t, n) {
        e = e || {};
        var a = {"action": "new_friends_pay", "friends_pay_source": "web"};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), r.fn.extend(a, this.aes(a, ["openid", "openkey", "session_id", "session_type", "zoneid", "pay_method", "buy_quantity"])), this.jsonp(this._getCgiUrl(p.url.getToken, a), t, n)
      }, "webQBInfo": function (e, t, n) {
        e = e || {};
        var a = {"type": "qb"};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), this.jsonp(this._getCgiUrl(p.url.webBuyPage, a), t, n)
      }, "webMonthInfo": function (e, t, n) {
        e = e || {};
        var a = {"type": "month"};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), this.jsonp(this._getCgiUrl(p.url.webBuyPage, a, n), t, n)
      }, "webGoodsInfo": function (e, t, n) {
        e = e || {};
        var a = {"type": "bg"}, i = this._getSessionParam();
        r.fn.extend(a, i), r.fn.extend(a, t), this.jsonp(this._getCgiUrl(p.url.webGoodsInfo, a, {"params": e.params}), n)
      }, "mobileOpendService": function () {
        opt = opt || {};
        var e = {};
        r.fn.extend(e, this._getSessionParam()), r.fn.extend(e, params), this.jsonp(this._getCgiUrl(p.url.openedServices, e, {"params": opt.params}), callback)
      }, "friendsPayGoods": function (e, t, n) {
        e = e || {};
        var i, o = {"type": "bg", "action": "new_friends_pay", "friends_pay_source": "web"}, s = e._url,
          c = (e._mid, e._params);
        if (delete e._url, delete e._mid, delete e._params, e.session && (i = e.session, delete e.session), r.fn.extend(o, this._getSessionParam(i)), r.fn.extend(o, e), r.fn.extend(o, this.aes(o, ["openid", "openkey", "session_id", "session_type", "zoneid", "pay_method", "buy_quantity"])), c) {
          var l = a.fn.getParam("out_trade_no", c);
          l ? delete o.out_trade_no : c = a.fn.delParam("out_trade_no", c), /\/web_page_info\?/.test(c) ? (c = c.replace(/\/[a-z_]+\?/, "/get_token?"), this.jsonp(this._getCgiUrl(p.url.webSaveGoods3, o, {"params": c}), t, n)) : this.jsonp(this._getCgiUrl(p.url.webSaveGoods2, o, {"params": c}), t, n)
        } else s ? this.jsonp(s + "&" + r.req.serializeParam(o), t, n) : this.jsonp(this._getCgiUrl(p.url.friendsPay, o), t, n)
      }, "webSaveGoods": function (e, t, n) {
        e = e || {};
        var i, o = {"type": "bg"}, s = this, c = e._url, l = e._mid, u = e._params;
        delete e._url, delete e._mid, delete e._params, e.session && (i = e.session, delete e.session), r.fn.extend(o, this._getSessionParam(i)), r.fn.extend(o, e), r.fn.extend(o, this.xMidasEncrypt(r.fn.extend({}, o, r.fn.getParams(u)), ["token_id", "openid", "openkey", "session_id", "session_type", "zoneid", "pay_method", "buy_quantity", "mb_pwd", "pay_id", "auth_key", "card_value", "accounttype", "provide_uin", "extend", "ts"]));
        var d = o.encrypt_way ? "new" : "no";
        if (f("encrypt." + d), u) {
          var h = a.fn.getParam("out_trade_no", u);
          h ? delete o.out_trade_no : u = a.fn.delParam("out_trade_no", u), /\/web_page_info\?/.test(u) ? (u = u.replace(/\/[a-z_]+\?/, "/web_save?"), s.jsonp(s._getCgiUrl(p.url.webSaveGoods3, o, {"params": u}), t, n)) : s.jsonp(s._getCgiUrl(p.url.webSaveGoods2, o, {"params": u}), t, n)
        } else c ? s.jsonp(c + "&" + r.req.serializeParam(o), t, n) : s.jsonp(s._getCgiUrl(p.url.webSaveGoods, o, {"mid": l}), t, n)
      }, "mobileGetBalance": function (e, t, n) {
        e = e || {};
        var a = {};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), r.fn.extend(a, this.aes(a, ["openid", "openkey", "session_id", "session_type"])), this.jsonp(this._getCgiUrl(p.url.mobileGetBalance, a), t, n)
      }, "mobileGetQrcode": function (e) {
        var t = {};
        r.fn.extend(t, this._getSessionParam());
        var n = e.tokenUrl;
        delete e.tokenUrl, e.token_id = r.fn.getParam("token_id", n), r.fn.extend(t, e), r.fn.extend(t, this.aes(t, ["type", "token_id", "discountid", "openid", "openkey", "session_id", "session_type"])), delete t.openkey, delete t.token_id, delete t.type, delete t.discountid, r.fn.extend(t, {
          "size": 400,
          "pushtype": "NodeJS"
        });
        var a = n.split("/"), i = {};
        return a[2] && (i.mid = a[2]), this._getCgiUrl(p.url.mobileGetQrcode, t, i)
      }, "mobileGetCardBillInfo": function (e, t, n) {
        e = e || {};
        var a = {};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), a.pf = a.pf + "-minipay-android", this.jsonp(this._getCgiUrl(p.url.mobileGetCardBillInfo, a), t, n)
      }, "setupPooling": function (e) {
        e = e || {};
        var t, n = this, r = function (t) {
          if (top != window) switch (parseInt(t, 10)) {
            case 0:
              n.setupPooling(e);
              break;
            case 1:
              e.onPaying && e.onPaying();
              break;
            case 10:
            case 20:
            case 1e3:
              e.onSuccess && e.onSuccess()
          }
        }, a = this.sessionObj.getSessionParam(), i = "jsonp_" + Math.floor(1e4 * Math.random());
        window[i] = function (e) {
          t = e
        };
        var s = "http://" + (this.sandbox ? "sandbox." : "") + "jspay.qq.com/jsonp?mutil=1&uin=" + a.openid + "&skey=" + a.openkey + "&uuid=" + e.uuid + "&cb=" + i + "&junhan=" + Math.random();
        o.getScript(s, function () {
          r(t)
        })
      }, "mobileWirelessProc": function (e, t, n) {
        e = e || {};
        var a = {};
        return r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), a.pf = this.getMobilePf(), r.fn.extend(a, this.aes(a, ["type", "amt", "buy_quantity", "mobile", "sms_authcode", "token_id", "portal_serial_no", "hf_billno", "provide_uin", "product_id", "service_code", "accounttype", "action", "type", "discountid", "openid", "openkey", "session_id", "session_type", "extend"])), r.fn.each(["amt"], function (e) {
          try {
            delete a[e]
          } catch (t) {
          }
        }), this.jsonp(this._getCgiUrl(p.url.mobileWirelessProc, a, n), t)
      }, "clubDiscount": function (e, t, n) {
        e = e || {};
        var a = {"cmd": 9, "from": "PC"};
        return r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), this.jsonp(this._getCgiUrl(p.url.wechatQuery, a, n), t, n)
      }, "getFriendlist": function (e, t, n) {
        e = e || {};
        var a = {};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), this.jsonp(this._getCgiUrl(p.url.friendlist, a, {}, n), t, n)
      }, "mobileGetImage": function (e, t, n) {
        e = e || {};
        var a = {};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), a.pf = this.getMobilePf(), this.jsonp(this._getCgiUrl(p.url.mobileGetImage, a), t, n)
      }, "wechatQuery": function (e, t, n) {
        n = n || {}, e = e || {};
        var a = {};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), this.jsonp(this._getCgiUrl(p.url.wechatQuery, a), t, n)
      }, "getRestrictBalance": function (e, t, n) {
        r.fn.extend(e, {"cmd": 24}), this.wechatQuery(e, t, n)
      }, "getRoleList": function (e, t, n) {
        n = n || {}, e = e || {};
        var a = {};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), this.jsonp(this._getCgiUrl(p.url.roleList, a), t, n)
      }, "getQrcode": function (e, t, n) {
        e = e || {}, n = n || {};
        var a = {};
        return r.fn.extend(a, e), "l" == e.a ? r.tmpl(p.url.getQrCode.url, {
          "domain": [location.protocol, "//", e.domainq ? this.domainq : this.domain].join(""),
          "appid": this.appid
        }) + r.req.serializeParam(a) : void this.jsonp(this._getCgiUrl(p.url.getQrCode, a), t, n)
      }, "rcRestrict": function (e, t, n) {
        n = n || {}, e = e || {};
        var a = {};
        r.fn.extend(a, e, this._getSessionParam()), this.jsonp(this._getCgiUrl(p.url.rcRestrict, a), t, n)
      }, "getGameMainAccount": function (e, t, n) {
        n = n || {}, e = e || {};
        var a = {};
        r.fn.extend(a, this._getSessionParam()), r.fn.extend(a, e), this.jsonp(this._getCgiUrl(p.url.gameMainAccount, a), t, n)
      }, "getCouponList": function (e, t, n) {
        e = e || {};
        var r = {};
        a.fn.extend(r, this._getSessionParam()), a.fn.extend(r, e), a.fn.extend(r, this.aes(r, ["openid", "openkey", "session_id", "session_type", "pf"])), this.jsonp(this._getCgiUrl(p.url.mobileCouponsInfo, r, {}, n), t, n)
      }, "revertCoupon": function (e, t, n) {
        e = e || {};
        var r = {"action": "rollback_freeze_sp_coupons"};
        a.fn.extend(r, this._getSessionParam()), a.fn.extend(r, e), a.fn.extend(r, this.aes(r, ["openid", "openkey", "session_id", "session_type", "pf", "channel_orderid", "out_trade_no", "pay_method"])), ["channel_orderid", "out_trade_no", "pay_method"].forEach(function (e) {
          try {
            delete r[e]
          } catch (t) {
          }
        }), this.jsonp(this._getCgiUrl(p.url.mobileCouponsRollback, r, n), t, n)
      }, "querySignStatus": function (e, t, n) {
        e = e || {};
        var r = {};
        return "wechat" === e.type ? (r.cmd = 17, r.wx_serialno = e.billNo) : "qqwallet" === e.type ? (r.cmd = 23, r.orderid = e.billNo) : console.error("type is not valid."), this.wechatQuery(r, t, n)
      }
    }
  }, "74520267": function (e, t, n) {
    var r = n(88981800), a = function (e, t) {
      if (window.cashier && window.cashier[e]) {
        var n = Array.prototype.slice.call(arguments, 1);
        window.cashier[e].apply(null, n)
      }
    }, i = e.exports = {
      "openWindow": function (e) {
        a("openwindow", e)
      }, "notify": function (e, t) {
        a(e, t)
      }, "resize": function (e, t) {
        r.delayRun("resize", function () {
          a("resize", e.w, e.h)
        }, 4)
      }, "trigger": function (e, t) {
        a("on" + e.replace(/^\w{1}/, function (e) {
          return e.toUpperCase()
        }), t)
      }, "register": function (e, t) {
        window.cashier && window.cashier.on(e, function (e) {
          t(e)
        })
      }, "unregister": function (e, t) {
        window.cashier && window.cashier.off(e, t)
      }, "confirmClose": function (e, t) {
        r.lang.isFunction(t) && (o[e] = t)
      }, "removeConfirmClose": function (e) {
        delete o[e]
      }
    }, o = {
      "default": function () {
        return !0
      }
    };
    i.register("confirmClose", function () {
      var e = !0;
      for (var t in o) if (o[t]() === !1) {
        e = !1;
        break
      }
      a("messageCallback", {"key": "confirmClose", "canClose": e})
    })
  }, "76812298": function (e, t, n) {
    var r;
    r = function (e, t, n) {
      var r = r || function (e, t) {
        var n = {}, r = n.lib = {}, a = function () {
        }, i = r.Base = {
          "extend": function (e) {
            a.prototype = this;
            var t = new a;
            return e && t.mixIn(e), t.hasOwnProperty("init") || (t.init = function () {
              t.$super.init.apply(this, arguments)
            }), t.init.prototype = t, t.$super = this, t
          }, "create": function () {
            var e = this.extend();
            return e.init.apply(e, arguments), e
          }, "init": function () {
          }, "mixIn": function (e) {
            for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
            e.hasOwnProperty("toString") && (this.toString = e.toString)
          }, "clone": function () {
            return this.init.prototype.extend(this)
          }
        }, o = r.WordArray = i.extend({
          "init": function (e, n) {
            e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length
          }, "toString": function (e) {
            return (e || c).stringify(this)
          }, "concat": function (e) {
            var t = this.words, n = e.words, r = this.sigBytes;
            if (e = e.sigBytes, this.clamp(), r % 4) for (var a = 0; a < e; a++) t[r + a >>> 2] |= (n[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 24 - 8 * ((r + a) % 4); else if (65535 < n.length) for (a = 0; a < e; a += 4) t[r + a >>> 2] = n[a >>> 2]; else t.push.apply(t, n);
            return this.sigBytes += e, this
          }, "clamp": function () {
            var t = this.words, n = this.sigBytes;
            t[n >>> 2] &= 4294967295 << 32 - 8 * (n % 4), t.length = e.ceil(n / 4)
          }, "clone": function () {
            var e = i.clone.call(this);
            return e.words = this.words.slice(0), e
          }, "random": function (t) {
            for (var n = [], r = 0; r < t; r += 4) n.push(4294967296 * e.random() | 0);
            return new o.init(n, t)
          }
        }), s = n.enc = {}, c = s.Hex = {
          "stringify": function (e) {
            var t = e.words;
            e = e.sigBytes;
            for (var n = [], r = 0; r < e; r++) {
              var a = t[r >>> 2] >>> 24 - 8 * (r % 4) & 255;
              n.push((a >>> 4).toString(16)), n.push((15 & a).toString(16))
            }
            return n.join("")
          }, "parse": function (e) {
            for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - 4 * (r % 8);
            return new o.init(n, t / 2)
          }
        }, l = s.Latin1 = {
          "stringify": function (e) {
            var t = e.words;
            e = e.sigBytes;
            for (var n = [], r = 0; r < e; r++) n.push(String.fromCharCode(t[r >>> 2] >>> 24 - 8 * (r % 4) & 255));
            return n.join("")
          }, "parse": function (e) {
            for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - 8 * (r % 4);
            return new o.init(n, t)
          }
        }, u = s.Utf8 = {
          "stringify": function (e) {
            try {
              return decodeURIComponent(escape(l.stringify(e)))
            } catch (t) {
              throw Error("Malformed UTF-8 data")
            }
          }, "parse": function (e) {
            return l.parse(unescape(encodeURIComponent(e)))
          }
        }, f = r.BufferedBlockAlgorithm = i.extend({
          "reset": function () {
            this._data = new o.init, this._nDataBytes = 0
          }, "_append": function (e) {
            "string" == typeof e && (e = u.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
          }, "_process": function (t) {
            var n = this._data, r = n.words, a = n.sigBytes, i = this.blockSize, s = a / (4 * i),
              s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0);
            if (t = s * i, a = e.min(4 * t, a), t) {
              for (var c = 0; c < t; c += i) this._doProcessBlock(r, c);
              c = r.splice(0, t), n.sigBytes -= a
            }
            return new o.init(c, a)
          }, "clone": function () {
            var e = i.clone.call(this);
            return e._data = this._data.clone(), e
          }, "_minBufferSize": 0
        });
        r.Hasher = f.extend({
          "cfg": i.extend(), "init": function (e) {
            this.cfg = this.cfg.extend(e), this.reset()
          }, "reset": function () {
            f.reset.call(this), this._doReset()
          }, "update": function (e) {
            return this._append(e), this._process(), this
          }, "finalize": function (e) {
            return e && this._append(e), this._doFinalize()
          }, "blockSize": 16, "_createHelper": function (e) {
            return function (t, n) {
              return new e.init(n).finalize(t)
            }
          }, "_createHmacHelper": function (e) {
            return function (t, n) {
              return new d.HMAC.init(e, n).finalize(t)
            }
          }
        });
        var d = n.algo = {};
        return n
      }(Math);
      !function () {
        var e = r, t = e.lib.WordArray;
        e.enc.Base64 = {
          "stringify": function (e) {
            var t = e.words, n = e.sigBytes, r = this._map;
            e.clamp(), e = [];
            for (var a = 0; a < n; a += 3) for (var i = (t[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (t[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | t[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255, o = 0; 4 > o && a + .75 * o < n; o++) e.push(r.charAt(i >>> 6 * (3 - o) & 63));
            if (t = r.charAt(64)) for (; e.length % 4;) e.push(t);
            return e.join("")
          }, "parse": function (e) {
            var n = e.length, r = this._map, a = r.charAt(64);
            a && (a = e.indexOf(a), -1 != a && (n = a));
            for (var a = [], i = 0, o = 0; o < n; o++) if (o % 4) {
              var s = r.indexOf(e.charAt(o - 1)) << 2 * (o % 4), c = r.indexOf(e.charAt(o)) >>> 6 - 2 * (o % 4);
              a[i >>> 2] |= (s | c) << 24 - 8 * (i % 4), i++
            }
            return t.create(a, i)
          }, "_map": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }
      }(), function (e) {
        function t(e, t, n, r, a, i, o) {
          return e = e + (t & n | ~t & r) + a + o, (e << i | e >>> 32 - i) + t
        }

        function n(e, t, n, r, a, i, o) {
          return e = e + (t & r | n & ~r) + a + o, (e << i | e >>> 32 - i) + t
        }

        function a(e, t, n, r, a, i, o) {
          return e = e + (t ^ n ^ r) + a + o, (e << i | e >>> 32 - i) + t
        }

        function i(e, t, n, r, a, i, o) {
          return e = e + (n ^ (t | ~r)) + a + o, (e << i | e >>> 32 - i) + t
        }

        for (var o = r, s = o.lib, c = s.WordArray, l = s.Hasher, s = o.algo, u = [], f = 0; 64 > f; f++) u[f] = 4294967296 * e.abs(e.sin(f + 1)) | 0;
        s = s.MD5 = l.extend({
          "_doReset": function () {
            this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878])
          }, "_doProcessBlock": function (e, r) {
            for (var o = 0; 16 > o; o++) {
              var s = r + o, c = e[s];
              e[s] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
            }
            var o = this._hash.words, s = e[r + 0], c = e[r + 1], l = e[r + 2], f = e[r + 3], d = e[r + 4],
              p = e[r + 5], h = e[r + 6], v = e[r + 7], m = e[r + 8], g = e[r + 9], y = e[r + 10], b = e[r + 11],
              _ = e[r + 12], w = e[r + 13], x = e[r + 14], C = e[r + 15], k = o[0], E = o[1], T = o[2], S = o[3],
              k = t(k, E, T, S, s, 7, u[0]), S = t(S, k, E, T, c, 12, u[1]), T = t(T, S, k, E, l, 17, u[2]),
              E = t(E, T, S, k, f, 22, u[3]), k = t(k, E, T, S, d, 7, u[4]), S = t(S, k, E, T, p, 12, u[5]),
              T = t(T, S, k, E, h, 17, u[6]), E = t(E, T, S, k, v, 22, u[7]), k = t(k, E, T, S, m, 7, u[8]),
              S = t(S, k, E, T, g, 12, u[9]), T = t(T, S, k, E, y, 17, u[10]), E = t(E, T, S, k, b, 22, u[11]),
              k = t(k, E, T, S, _, 7, u[12]), S = t(S, k, E, T, w, 12, u[13]), T = t(T, S, k, E, x, 17, u[14]),
              E = t(E, T, S, k, C, 22, u[15]), k = n(k, E, T, S, c, 5, u[16]), S = n(S, k, E, T, h, 9, u[17]),
              T = n(T, S, k, E, b, 14, u[18]), E = n(E, T, S, k, s, 20, u[19]), k = n(k, E, T, S, p, 5, u[20]),
              S = n(S, k, E, T, y, 9, u[21]), T = n(T, S, k, E, C, 14, u[22]), E = n(E, T, S, k, d, 20, u[23]),
              k = n(k, E, T, S, g, 5, u[24]), S = n(S, k, E, T, x, 9, u[25]), T = n(T, S, k, E, f, 14, u[26]),
              E = n(E, T, S, k, m, 20, u[27]), k = n(k, E, T, S, w, 5, u[28]), S = n(S, k, E, T, l, 9, u[29]),
              T = n(T, S, k, E, v, 14, u[30]), E = n(E, T, S, k, _, 20, u[31]), k = a(k, E, T, S, p, 4, u[32]),
              S = a(S, k, E, T, m, 11, u[33]), T = a(T, S, k, E, b, 16, u[34]), E = a(E, T, S, k, x, 23, u[35]),
              k = a(k, E, T, S, c, 4, u[36]), S = a(S, k, E, T, d, 11, u[37]), T = a(T, S, k, E, v, 16, u[38]),
              E = a(E, T, S, k, y, 23, u[39]), k = a(k, E, T, S, w, 4, u[40]), S = a(S, k, E, T, s, 11, u[41]),
              T = a(T, S, k, E, f, 16, u[42]), E = a(E, T, S, k, h, 23, u[43]), k = a(k, E, T, S, g, 4, u[44]),
              S = a(S, k, E, T, _, 11, u[45]), T = a(T, S, k, E, C, 16, u[46]), E = a(E, T, S, k, l, 23, u[47]),
              k = i(k, E, T, S, s, 6, u[48]), S = i(S, k, E, T, v, 10, u[49]), T = i(T, S, k, E, x, 15, u[50]),
              E = i(E, T, S, k, p, 21, u[51]), k = i(k, E, T, S, _, 6, u[52]), S = i(S, k, E, T, f, 10, u[53]),
              T = i(T, S, k, E, y, 15, u[54]), E = i(E, T, S, k, c, 21, u[55]), k = i(k, E, T, S, m, 6, u[56]),
              S = i(S, k, E, T, C, 10, u[57]), T = i(T, S, k, E, h, 15, u[58]), E = i(E, T, S, k, w, 21, u[59]),
              k = i(k, E, T, S, d, 6, u[60]), S = i(S, k, E, T, b, 10, u[61]), T = i(T, S, k, E, l, 15, u[62]),
              E = i(E, T, S, k, g, 21, u[63]);
            o[0] = o[0] + k | 0, o[1] = o[1] + E | 0, o[2] = o[2] + T | 0, o[3] = o[3] + S | 0
          }, "_doFinalize": function () {
            var t = this._data, n = t.words, r = 8 * this._nDataBytes, a = 8 * t.sigBytes;
            n[a >>> 5] |= 128 << 24 - a % 32;
            var i = e.floor(r / 4294967296);
            for (n[(a + 64 >>> 9 << 4) + 15] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), n[(a + 64 >>> 9 << 4) + 14] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), t.sigBytes = 4 * (n.length + 1), this._process(), t = this._hash, n = t.words, r = 0; 4 > r; r++) a = n[r], n[r] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);
            return t
          }, "clone": function () {
            var e = l.clone.call(this);
            return e._hash = this._hash.clone(), e
          }
        }), o.MD5 = l._createHelper(s), o.HmacMD5 = l._createHmacHelper(s)
      }(Math), function () {
        var e = r, t = e.lib, n = t.Base, a = t.WordArray, t = e.algo, i = t.EvpKDF = n.extend({
          "cfg": n.extend({"keySize": 4, "hasher": t.MD5, "iterations": 1}),
          "init": function (e) {
            this.cfg = this.cfg.extend(e)
          },
          "compute": function (e, t) {
            for (var n = this.cfg, r = n.hasher.create(), i = a.create(), o = i.words, s = n.keySize, n = n.iterations; o.length < s;) {
              c && r.update(c);
              var c = r.update(e).finalize(t);
              r.reset();
              for (var l = 1; l < n; l++) c = r.finalize(c), r.reset();
              i.concat(c)
            }
            return i.sigBytes = 4 * s, i
          }
        });
        e.EvpKDF = function (e, t, n) {
          return i.create(n).compute(e, t)
        }
      }(), r.lib.Cipher || function (e) {
        var t = r, n = t.lib, a = n.Base, i = n.WordArray, o = n.BufferedBlockAlgorithm, s = t.enc.Base64,
          c = t.algo.EvpKDF, l = n.Cipher = o.extend({
            "cfg": a.extend(), "createEncryptor": function (e, t) {
              return this.create(this._ENC_XFORM_MODE, e, t)
            }, "createDecryptor": function (e, t) {
              return this.create(this._DEC_XFORM_MODE, e, t)
            }, "init": function (e, t, n) {
              this.cfg = this.cfg.extend(n), this._xformMode = e, this._key = t, this.reset()
            }, "reset": function () {
              o.reset.call(this), this._doReset()
            }, "process": function (e) {
              return this._append(e), this._process()
            }, "finalize": function (e) {
              return e && this._append(e), this._doFinalize()
            }, "keySize": 4, "ivSize": 4, "_ENC_XFORM_MODE": 1, "_DEC_XFORM_MODE": 2, "_createHelper": function (e) {
              return {
                "encrypt": function (t, n, r) {
                  return ("string" == typeof n ? v : h).encrypt(e, t, n, r)
                }, "decrypt": function (t, n, r) {
                  return ("string" == typeof n ? v : h).decrypt(e, t, n, r)
                }
              }
            }
          });
        n.StreamCipher = l.extend({
          "_doFinalize": function () {
            return this._process(!0)
          }, "blockSize": 1
        });
        var u = t.mode = {}, f = function (t, n, r) {
          var a = this._iv;
          a ? this._iv = e : a = this._prevBlock;
          for (var i = 0; i < r; i++) t[n + i] ^= a[i]
        }, d = (n.BlockCipherMode = a.extend({
          "createEncryptor": function (e, t) {
            return this.Encryptor.create(e, t)
          }, "createDecryptor": function (e, t) {
            return this.Decryptor.create(e, t)
          }, "init": function (e, t) {
            this._cipher = e, this._iv = t
          }
        })).extend();
        d.Encryptor = d.extend({
          "processBlock": function (e, t) {
            var n = this._cipher, r = n.blockSize;
            f.call(this, e, t, r), n.encryptBlock(e, t), this._prevBlock = e.slice(t, t + r)
          }
        }), d.Decryptor = d.extend({
          "processBlock": function (e, t) {
            var n = this._cipher, r = n.blockSize, a = e.slice(t, t + r);
            n.decryptBlock(e, t), f.call(this, e, t, r), this._prevBlock = a
          }
        }), u = u.CBC = d, d = (t.pad = {}).Pkcs7 = {
          "pad": function (e, t) {
            for (var n = 4 * t, n = n - e.sigBytes % n, r = n << 24 | n << 16 | n << 8 | n, a = [], o = 0; o < n; o += 4) a.push(r);
            n = i.create(a, n), e.concat(n)
          }, "unpad": function (e) {
            e.sigBytes -= 255 & e.words[e.sigBytes - 1 >>> 2]
          }
        }, n.BlockCipher = l.extend({
          "cfg": l.cfg.extend({"mode": u, "padding": d}), "reset": function () {
            l.reset.call(this);
            var e = this.cfg, t = e.iv, e = e.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) var n = e.createEncryptor; else n = e.createDecryptor, this._minBufferSize = 1;
            this._mode = n.call(e, this, t && t.words)
          }, "_doProcessBlock": function (e, t) {
            this._mode.processBlock(e, t)
          }, "_doFinalize": function () {
            var e = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              e.pad(this._data, this.blockSize);
              var t = this._process(!0)
            } else t = this._process(!0), e.unpad(t);
            return t
          }, "blockSize": 4
        });
        var p = n.CipherParams = a.extend({
          "init": function (e) {
            this.mixIn(e)
          }, "toString": function (e) {
            return (e || this.formatter).stringify(this)
          }
        }), u = (t.format = {}).OpenSSL = {
          "stringify": function (e) {
            var t = e.ciphertext;
            return e = e.salt, (e ? i.create([1398893684, 1701076831]).concat(e).concat(t) : t).toString(s)
          }, "parse": function (e) {
            e = s.parse(e);
            var t = e.words;
            if (1398893684 == t[0] && 1701076831 == t[1]) {
              var n = i.create(t.slice(2, 4));
              t.splice(0, 4), e.sigBytes -= 16
            }
            return p.create({"ciphertext": e, "salt": n})
          }
        }, h = n.SerializableCipher = a.extend({
          "cfg": a.extend({"format": u}), "encrypt": function (e, t, n, r) {
            r = this.cfg.extend(r);
            var a = e.createEncryptor(n, r);
            return t = a.finalize(t), a = a.cfg, p.create({
              "ciphertext": t,
              "key": n,
              "iv": a.iv,
              "algorithm": e,
              "mode": a.mode,
              "padding": a.padding,
              "blockSize": e.blockSize,
              "formatter": r.format
            })
          }, "decrypt": function (e, t, n, r) {
            return r = this.cfg.extend(r), t = this._parse(t, r.format), e.createDecryptor(n, r).finalize(t.ciphertext)
          }, "_parse": function (e, t) {
            return "string" == typeof e ? t.parse(e, this) : e
          }
        }), t = (t.kdf = {}).OpenSSL = {
          "execute": function (e, t, n, r) {
            return r || (r = i.random(8)), e = c.create({"keySize": t + n}).compute(e, r), n = i.create(e.words.slice(t), 4 * n), e.sigBytes = 4 * t, p.create({
              "key": e,
              "iv": n,
              "salt": r
            })
          }
        }, v = n.PasswordBasedCipher = h.extend({
          "cfg": h.cfg.extend({"kdf": t}), "encrypt": function (e, t, n, r) {
            return r = this.cfg.extend(r), n = r.kdf.execute(n, e.keySize, e.ivSize), r.iv = n.iv, e = h.encrypt.call(this, e, t, n.key, r), e.mixIn(n), e
          }, "decrypt": function (e, t, n, r) {
            return r = this.cfg.extend(r), t = this._parse(t, r.format), n = r.kdf.execute(n, e.keySize, e.ivSize, t.salt), r.iv = n.iv, h.decrypt.call(this, e, t, n.key, r)
          }
        })
      }(), function () {
        for (var e = r, t = e.lib.BlockCipher, n = e.algo, a = [], i = [], o = [], s = [], c = [], l = [], u = [], f = [], d = [], p = [], h = [], v = 0; 256 > v; v++) h[v] = 128 > v ? v << 1 : v << 1 ^ 283;
        for (var m = 0, g = 0, v = 0; 256 > v; v++) {
          var y = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4, y = y >>> 8 ^ 255 & y ^ 99;
          a[m] = y, i[y] = m;
          var b = h[m], _ = h[b], w = h[_], x = 257 * h[y] ^ 16843008 * y;
          o[m] = x << 24 | x >>> 8, s[m] = x << 16 | x >>> 16, c[m] = x << 8 | x >>> 24, l[m] = x, x = 16843009 * w ^ 65537 * _ ^ 257 * b ^ 16843008 * m, u[y] = x << 24 | x >>> 8, f[y] = x << 16 | x >>> 16, d[y] = x << 8 | x >>> 24, p[y] = x, m ? (m = b ^ h[h[h[w ^ b]]], g ^= h[h[g]]) : m = g = 1
        }
        var C = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], n = n.AES = t.extend({
          "_doReset": function () {
            for (var e = this._key, t = e.words, n = e.sigBytes / 4, e = 4 * ((this._nRounds = n + 6) + 1), r = this._keySchedule = [], i = 0; i < e; i++) if (i < n) r[i] = t[i]; else {
              var o = r[i - 1];
              i % n ? 6 < n && 4 == i % n && (o = a[o >>> 24] << 24 | a[o >>> 16 & 255] << 16 | a[o >>> 8 & 255] << 8 | a[255 & o]) : (o = o << 8 | o >>> 24, o = a[o >>> 24] << 24 | a[o >>> 16 & 255] << 16 | a[o >>> 8 & 255] << 8 | a[255 & o], o ^= C[i / n | 0] << 24), r[i] = r[i - n] ^ o
            }
            for (t = this._invKeySchedule = [], n = 0; n < e; n++) i = e - n, o = n % 4 ? r[i] : r[i - 4], t[n] = 4 > n || 4 >= i ? o : u[a[o >>> 24]] ^ f[a[o >>> 16 & 255]] ^ d[a[o >>> 8 & 255]] ^ p[a[255 & o]]
          }, "encryptBlock": function (e, t) {
            this._doCryptBlock(e, t, this._keySchedule, o, s, c, l, a)
          }, "decryptBlock": function (e, t) {
            var n = e[t + 1];
            e[t + 1] = e[t + 3], e[t + 3] = n, this._doCryptBlock(e, t, this._invKeySchedule, u, f, d, p, i), n = e[t + 1], e[t + 1] = e[t + 3], e[t + 3] = n
          }, "_doCryptBlock": function (e, t, n, r, a, i, o, s) {
            for (var c = this._nRounds, l = e[t] ^ n[0], u = e[t + 1] ^ n[1], f = e[t + 2] ^ n[2], d = e[t + 3] ^ n[3], p = 4, h = 1; h < c; h++) var v = r[l >>> 24] ^ a[u >>> 16 & 255] ^ i[f >>> 8 & 255] ^ o[255 & d] ^ n[p++], m = r[u >>> 24] ^ a[f >>> 16 & 255] ^ i[d >>> 8 & 255] ^ o[255 & l] ^ n[p++], g = r[f >>> 24] ^ a[d >>> 16 & 255] ^ i[l >>> 8 & 255] ^ o[255 & u] ^ n[p++], d = r[d >>> 24] ^ a[l >>> 16 & 255] ^ i[u >>> 8 & 255] ^ o[255 & f] ^ n[p++], l = v, u = m, f = g;
            v = (s[l >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[255 & d]) ^ n[p++], m = (s[u >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[d >>> 8 & 255] << 8 | s[255 & l]) ^ n[p++], g = (s[f >>> 24] << 24 | s[d >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[255 & u]) ^ n[p++], d = (s[d >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[255 & f]) ^ n[p++], e[t] = v, e[t + 1] = m, e[t + 2] = g, e[t + 3] = d
          }, "keySize": 8
        });
        e.AES = t._createHelper(n)
      }(), r.mode.ECB = function () {
        var e = r.lib.BlockCipherMode.extend();
        return e.Encryptor = e.extend({
          "processBlock": function (e, t) {
            this._cipher.encryptBlock(e, t)
          }
        }), e.Decryptor = e.extend({
          "processBlock": function (e, t) {
            this._cipher.decryptBlock(e, t)
          }
        }), e
      }(), r.pad.ZeroPadding = {
        "pad": function (e, t) {
          var n = 4 * t;
          e.clamp(), e.sigBytes += n - (e.sigBytes % n || n)
        }, "unpad": function (e) {
          for (var t = e.words, n = e.sigBytes - 1; !(t[n >>> 2] >>> 24 - 8 * (n % 4) & 255);) n--;
          e.sigBytes = n + 1
        }
      }, n.exports = r
    }.call(t, n, t, e), !(void 0 !== r && (e.exports = r))
  }, "78057199": function (e, t, n) {
    var r = n(80667616);
    r.libraries.ms.$init = function (e) {
      for (var t in e) e.hasOwnProperty(t) && "function" == typeof e[t] && (e[t] = e[t].bind(e))
    }
  }, "80667616": function (e, t, n) {
    var r, i;
    !function (t, n) {
      "object" == typeof e && "object" == typeof e.exports ? e.exports = t.document ? n(t, !0) : function (e) {
        if (!e.document) throw new Error("Avalon requires a window with a document");
        return n(e)
      } : n(t)
    }("undefined" != typeof window ? window : this, function (n, o) {
      function s() {
        n.console && g.debug && Function.apply.call(console.log, console, arguments)
      }

      function c() {
      }

      function l(e) {
        return Function.apply(c, e)
      }

      function u(e, t) {
        "string" == typeof e && (e = e.match(nt) || []);
        for (var n = {}, r = void 0 !== t ? t : 1, a = 0, i = e.length; a < i; a++) n[e[a]] = r;
        return n
      }

      function f(e, t, n) {
        var r = "for(var " + e + "i=0,n = this.length; i < n; i++){" + t.replace("_", "((i in this) && fn.call(scope,this[i],i,this))") + "}" + n;
        return Function("fn,scope", r)
      }

      function d(e) {
        return it.test(ct.call(e))
      }

      function p(e) {
        if (!e) return !1;
        var t = e.length;
        if (t === t >>> 0) {
          var n = ct.call(e).slice(8, -1);
          if (/(?:regexp|string|function|window|global)$/i.test(n)) return !1;
          if ("Array" === n) return !0;
          try {
            return {}.propertyIsEnumerable.call(e, "length") !== !1 || /^\s?function/.test(e.item || e.callee)
          } catch (r) {
            return !e.window
          }
        }
        return !1
      }

      function h() {
        return (new XMLSerializer).serializeToString(this)
      }

      function v(e, t) {
        if (e && e.childNodes) for (var n, r = e.childNodes, a = 0; n = r[a++];) if (n.tagName) {
          var i = Ve.createElementNS(Dt, n.tagName.toLowerCase());
          lt.forEach.call(n.attributes, function (e) {
            i.setAttribute(e.name, e.value)
          }), v(n, i), t.appendChild(i)
        }
      }

      function m(e) {
        var t = {};
        for (var n in e) t[n] = e[n];
        var r = t.target = e.srcElement;
        if (0 === e.type.indexOf("key")) t.which = null != e.charCode ? e.charCode : e.keyCode; else if (Bt.test(e.type)) {
          var a = r.ownerDocument || Ve, i = "BackCompat" === a.compatMode ? a.body : a.documentElement;
          t.pageX = e.clientX + (i.scrollLeft >> 0) - (i.clientLeft >> 0), t.pageY = e.clientY + (i.scrollTop >> 0) - (i.clientTop >> 0), t.wheelDeltaY = t.wheelDelta, t.wheelDeltaX = 0
        }
        return t.timeStamp = new Date - 0, t.originalEvent = e, t.preventDefault = function () {
          e.returnValue = !1
        }, t.stopPropagation = function () {
          e.cancelBubble = !0
        }, t
      }

      function g(e) {
        for (var t in e) if (st.call(e, t)) {
          var n = e[t];
          "function" == typeof g.plugins[t] ? g.plugins[t](n) : "object" == typeof g[t] ? avalon.mix(g[t], n) : g[t] = n
        }
        return this
      }

      function y(e) {
        return (e + "").replace(Xt, "\\$&")
      }

      function b(e, t) {
        var n = this.$events || (this.$events = {}), r = n[e] || (n[e] = []);
        if ("function" == typeof t) {
          var a = t;
          a.uuid = "_" + ++mt, t = {
            "element": dt,
            "type": "user-watcher",
            "handler": c,
            "vmodels": [this],
            "expr": e,
            "uuid": a.uuid
          }, t.wildcard = /\*/.test(e)
        }
        if (t.update) t.oneTime || avalon.Array.ensure(r, t); else {
          if (/\w\.*\B/.test(e) || "*" === e) {
            t.getter = c;
            var i = this;
            t.update = function () {
              var e = this.fireArgs || [];
              e[2] && t.handler.apply(i, e), delete this.fireArgs
            }, r.sync = !0, avalon.Array.ensure(r, t)
          } else avalon.injectBinding(t);
          a && (t.handler = a)
        }
        return function () {
          t.update = t.getter = t.handler = c, t.element = Ve.createElement("a")
        }
      }

      function _(e, t) {
        var n = this.$events;
        if (n && n[e]) {
          t && (t[2] = e);
          var r = n[e];
          if (x(r, t), t && n["*"] && !/\./.test(e)) for (var a, i = 0; a = n["*"][i++];) try {
            a.handler.apply(this, t)
          } catch (o) {
          }
          var s = this.$up;
          s && (this.$pathname && _.call(s, this.$pathname + "." + e, t), _.call(s, "*." + e, t))
        } else {
          if (s = this.$up, this.$ups) {
            for (var c in this.$ups) _.call(this.$ups[c], c + "." + e, t);
            return
          }
          if (s) {
            var l = this.$pathname;
            "" === l && (l = "*");
            var u = l + "." + e;
            r = u.split("."), r.indexOf("*") === -1 ? (_.call(s, u, t), r[1] = "*", _.call(s, r.join("."), t)) : _.call(s, u, t)
          }
        }
      }

      function w(e, t) {
        for (; ;) {
          if (e.$watch) {
            var n = e.$events || (e.$events = {}), r = n[t] || (n[t] = []);
            return void on.collectDependency(r)
          }
          if (e = e.$up, !e) break;
          t = e.$pathname + "." + t
        }
      }

      function x(e, t) {
        if (e) {
          new Date - cn > 444 && "object" == typeof e[0] && L();
          for (var n, r = [], a = [], i = 0; n = e[i++];) "user-watcher" === n.type ? r.push(n) : a.push(n);
          if (g.async) {
            for (xr.render(), i = 0; n = a[i++];) if (n.update) {
              n.uuid = n.uuid || "_" + ++mt;
              var o = n.uuid;
              xr.queue[o] || (xr.queue[o] = "__", xr.queue.push(n))
            }
          } else for (i = 0; n = a[i++];) n.update && n.update();
          for (i = 0; n = r[i++];) (t && t[2] === n.expr || n.wildcard) && (n.fireArgs = t), n.update()
        }
      }

      function C(e, t) {
        return t = t || {}, t.watch = !0, E(e, t)
      }

      function k() {
      }

      function E(e, t) {
        function n(e) {
          return l[e] === !0
        }

        if (!e || e.$id && e.$accessors || e.nodeName && e.nodeType > 0) return e;
        t = t || tt;
        var r = t.force || tt, a = t.old, i = a && a.$accessors || tt, o = new k, c = {}, l = {}, f = [], d = [],
          p = {};
        e.$skipArray && (p = u(e.$skipArray), delete e.$skipArray);
        var h = e.$computed;
        if (h) {
          delete e.$computed;
          for (var v in h) l[v] = !0, function (e, t) {
            var n;
            c[e] = {
              "get": function () {
                return n = t.get.call(this)
              }, "set": function (r) {
                if ("function" == typeof t.set) {
                  var a = n;
                  t.set.call(this, r);
                  var i = this[e];
                  this.$fire && i !== a && this.$fire(e, i, a)
                }
              }, "enumerable": !0, "configurable": !0
            }
          }(v, h[v])
        }
        for (v in e) {
          var m = e[v];
          Vt[v] || (l[v] = !0), "function" == typeof m || m && m.nodeName && m.nodeType > 0 || !r[v] && ("$" === v.charAt(0) || Vt[v] || p[v]) ? f.push(v) : T(m) ? (s("warning:计算属性建议放在$computed对象中统一定义"), function (e, t) {
            var n;
            c[e] = {
              "get": function () {
                return n = t.get.call(this)
              }, "set": function (r) {
                if ("function" == typeof t.set) {
                  var a = n;
                  t.set.call(this, r);
                  var i = this[e];
                  this.$fire && i !== a && this.$fire(e, i, a)
                }
              }, "enumerable": !0, "configurable": !0
            }
          }(v, m)) : (d.push(v), i[v] ? c[v] = i[v] : c[v] = S(v, m))
        }
        c["$model"] = Zt, o = Jt(o, c, e), f.forEach(function (t) {
          o[t] = e[t]
        }), M(o, "$ups", null), M(o, "$id", "anonymous"), M(o, "$up", a ? a.$up : null), M(o, "$track", Object.keys(l)), M(o, "$active", !1), M(o, "$pathname", a ? a.$pathname : ""), M(o, "$accessors", c), M(o, "hasOwnProperty", n), t.watch && (M(o, "$watch", function () {
          return b.apply(o, arguments)
        }), M(o, "$fire", function (e, t) {
          if (0 === e.indexOf("all!")) {
            var n = e.slice(4);
            for (var r in avalon.vmodels) {
              var a = avalon.vmodels[r];
              a.$fire && a.$fire.apply(a, [n, t])
            }
          } else _.call(o, e, [t])
        })), d.forEach(function (t) {
          var n = a && a[t], r = o[t] = e[t];
          r && "object" == typeof r && (r.$up = o, r.$pathname = t), _.call(o, t, [r, n])
        });
        for (v in h) m = o[v];
        return o.$active = !0, o
      }

      function T(e) {
        if (e && "object" == typeof e) {
          for (var t in e) if ("get" !== t && "set" !== t) return !1;
          return "function" == typeof e.get
        }
      }

      function S(e, t) {
        var n;
        return t = NaN, {
          "get": function () {
            return this.$active && w(this, e), t
          }, "set": function (r) {
            if (t !== r) {
              var a = t;
              n = $(r, t), n ? t = n : (n = void 0, t = r), Object(n) === n && (n.$pathname = e, n.$up = this), this.$active && _.call(this, e, [t, a])
            }
          }, "enumerable": !0, "configurable": !0
        }
      }

      function $(e, t, n, r) {
        if (Array.isArray(e)) return A(e, t, r);
        if (avalon.isPlainObject(e)) {
          if (t && "object" == typeof t) {
            var a = Yt(e), i = Yt(t);
            if (a.join(";") === i.join(";")) {
              for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
              return t
            }
            t.$active = !1
          }
          return E(e, {"old": t, "watch": r})
        }
        return n ? e : void 0
      }

      function A(e, t, n) {
        if (t && t.splice) {
          var r = [0, t.length].concat(e);
          return t.splice.apply(t, r), t
        }
        for (var a in rn) e[a] = rn[a];
        M(e, "$up", null), M(e, "$pathname", ""), M(e, "$track", D(e.length)), e._ = E({"length": NaN}, {"watch": !0}), e._.length = e.length, e._.$watch("length", function (t, n) {
          _.call(e.$up, e.$pathname + ".length", [t, n])
        }), n && M(e, "$watch", function () {
          return b.apply(e, arguments)
        }), ft ? Object.defineProperty(e, "$model", Zt) : e.$model = N(e);
        for (var i = 0, o = e.length; i < o; i++) {
          var s = e[i] = $(e[i], 0, 1, 1);
          Object(s) === s && (s.$up = e)
        }
        return e
      }

      function M(e, t, n) {
        Kt ? Object.defineProperty(e, t, {"value": n, "writable": !0, "enumerable": !1, "configurable": !0}) : e[t] = n
      }

      function N(e) {
        var t = avalon.type(e);
        if ("array" === t) {
          for (var n = [], r = 0; r < e.length; r++) n[r] = N(e[r]);
          return n
        }
        if ("object" === t) {
          var a = {};
          for (r in e) if ("__proxy__" !== r && "__data__" !== r && "__const__" !== r && e.hasOwnProperty(r)) {
            var i = e[r];
            a[r] = i && i.nodeType ? i : N(i)
          }
          return a
        }
        return e
      }

      function O(e, t, n, r) {
        var a = t[n];
        return 4 !== arguments.length ? a.get.call(e) : void a.set.call(e, r)
      }

      function P(e, t) {
        for (var n = {}, r = 0, a = t.length; r < a; r++) {
          n[r] = e[r];
          var i = t[r];
          i in n ? (e[r] = n[i], delete n[i]) : e[r] = e[i]
        }
      }

      function D(e) {
        for (var t = [], n = 0; n < e; n++) t[n] = yt("$proxy$each");
        return t
      }

      function j(e, t, n) {
        switch (t) {
          case"push":
          case"unshift":
            n = D(n.length);
            break;
          case"splice":
            if (n.length > 2) {
              n[1], n.length - 2;
              n = [n[0], n[1]].concat(D(n.length - 2))
            }
        }
        Array.prototype[t].apply(e, n)
      }

      function B(e, t) {
        t.oneTime || e && avalon.Array.ensure(e, t) && t.element && (R(t, e), new Date - cn > 444 && L())
      }

      function I(e, t) {
        for (var n, r = [], a = 0; n = e[a++];) r.push(t ? n.$id : n.$key);
        return r.join(";")
      }

      function R(e, t) {
        e.list = t, e.i = ~~e.i, e.uuid || (e.uuid = "_" + ++mt), sn[e.uuid] || (sn[e.uuid] = "__", sn.push(e))
      }

      function L(e) {
        for (var t = ln || sn.length, n = 0; e = sn[--t];) if (e.i < 7) {
          if (null === e.element) {
            sn.splice(t, 1), e.list && (avalon.Array.remove(e.list, e), delete sn[e.uuid]);
            continue
          }
          if (H(e.element)) {
            if (sn.splice(t, 1), avalon.Array.remove(e.list, e), q(e), n++ > 500) {
              ln = t;
              break
            }
            continue
          }
          e.i++, 7 === e.i && (e.i = 14)
        } else e.i--;
        cn = new Date
      }

      function q(e) {
        delete sn[e.uuid], e.element = null, e.rollback && e.rollback();
        for (var t in e) e[t] = null
      }

      function H(e) {
        try {
          e.parentNode.nodeType
        } catch (t) {
          return !0
        }
        return e.ifRemove && !dt.contains(e.ifRemove) && Ke === e.parentNode ? (e.parentNode && e.parentNode.removeChild(e), !0) : e.msRetain ? 0 : 1 === e.nodeType ? !dt.contains(e) : !avalon.contains(dt, e)
      }

      function F(e) {
        var t = e.nodeName;
        return t.toLowerCase() === t && e.scopeName && "" === e.outerText
      }

      function U(e) {
        "url(#default#VML)" !== e.currentStyle.behavior && (e.style.behavior = "url(#default#VML)", e.style.display = "inline-block", e.style.zoom = 1)
      }

      function z(e) {
        return e.replace(/([a-z\d])([A-Z]+)/g, "$1-$2").toLowerCase()
      }

      function X(e) {
        return !e || e.indexOf("-") < 0 && e.indexOf("_") < 0 ? e : e.replace(/[-_][^-_]/g, function (e) {
          return e.charAt(1).toUpperCase()
        })
      }

      function G(e) {
        if (!("classList" in e)) {
          e.classList = {"node": e};
          for (var t in yn) e.classList[t.slice(1)] = yn[t]
        }
        return e.classList
      }

      function W(e) {
        try {
          if ("object" == typeof e) return e;
          e = "true" === e || "false" !== e && ("null" === e ? null : +e + "" === e ? +e : bn.test(e) ? avalon.parseJSON(e) : e)
        } catch (t) {
        }
        return e
      }

      function V(e) {
        return e.window && e.document ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
      }

      function Q(e, t) {
        if (e.offsetWidth <= 0) {
          if (Dn.test(kn["@:get"](e, "display"))) {
            var n = {"node": e};
            for (var r in Pn) n[r] = e.style[r], e.style[r] = Pn[r];
            t.push(n)
          }
          var a = e.parentNode;
          a && 1 === a.nodeType && Q(a, t)
        }
      }

      function K(e) {
        var t = e.tagName.toLowerCase();
        return "input" === t && /checkbox|radio/.test(e.type) ? "checked" : t
      }

      function J(e, t) {
        var n = [], r = !!t;
        t = t || 0;
        for (var a = "unknown", i = "", o = 0; o < e.length; o++) {
          var s = e.charAt(o);
          if ("'" === s || '"' === s) "unknown" === a ? a = s : a === s && (a = "unknown"); else if ("\\" === s) "'" !== a && '"' !== a || o++; else if (Ln.test(s)) "unknown" === a ? (a = "variable", i = s) : "maybePath" === a ? (i = n.pop(), i += "." + s, a = "variable") : "variable" === a && (i += s); else if (/\w/.test(s)) "variable" === a && (i += s); else if ("." === s) "variable" === a && i && (n.push(i), i = "", a = "maybePath"); else if ("[" === s) {
            if ("variable" === a || "maybePath" === a) {
              i && (n.push(i), i = "");
              var c = n.length, u = n[c - 1], f = J(e.slice(o), o);
              if (f.length) n[c - 1] = u + ".*", n = f.concat(n); else {
                var d = e.slice(o + 1, f.i);
                try {
                  var p = l(["return " + d])();
                  n[c - 1] = u + "." + p
                } catch (h) {
                }
              }
              a = "maybePath", o = f.i
            }
          } else if ("]" === s) {
            if (r) return n.i = o + t, Y(n, i), n
          } else qn.test(s) && "\r" !== s && "\n" !== s ? "variable" === a && (Y(n, i) && (a = "maybePath"), i = "") : (Y(n, i), a = "unknown", i = "")
        }
        return Y(n, i), n
      }

      function Y(e, t) {
        if (t && !In[t]) return e.push(t), !0
      }

      function Z(e, t, n, r) {
        for (var a, i = [], o = " = " + n + ".", s = e.length; a = e[--s];) for (var c, l = a.split("."), u = l[0]; (c = l.shift()) && t.hasOwnProperty(c);) i.push(u + o + u), r.observers.push({
          "v": t,
          "p": a
        }), e.splice(s, 1);
        return i
      }

      function ee(e) {
        e = e.trim();
        var t = Fn.get(e);
        if (t) return t.concat();
        for (var n, r = J(e), a = {}, i = [], o = 0; n = r[o++];) a[n] || (a[n] = 1, i.push(n));
        return Fn.put(e, i).concat()
      }

      function te(e, t, n) {
        var r = n.filters;
        "string" == typeof r && r.trim() && !n._filters && (n._filters = re(r.trim()));
        var a = ee(e), i = new Date - 0, o = [], s = [], c = [];
        n.observers = [];
        for (var u = 0, f = t.length; u < f; u++) if (a.length) {
          var d = "vm" + i + "_" + u;
          s.push(d), c.push(t[u]), o.push.apply(o, Z(a, t[u], d, n))
        }
        n.args = c;
        var p = n.type, h = t.map(function (e) {
          return String(e.$id).replace(Hn, "$1")
        }) + e + p, v = Un.get(h);
        if (v) {
          if ("duplex" === p) {
            var m = Un.get(h + "setter");
            n.setter = m.apply(m, n.args)
          }
          return n.getter = v
        }
        if (o.length || o.push("fix" + i), "duplex" === p) {
          var g = {};
          o.forEach(function (e) {
            var t = e.split("=");
            g[t[0].trim()] = t[1].trim()
          }), e = e.replace(/[\$\w]+/, function (e) {
            return g[e] ? g[e] : e
          });
          var y = l(s.concat("'use strict';return function(vvv){" + e + " = vvv\n}\n"));
          Un.put(h + "setter", y), n.setter = y.apply(y, n.args)
        }
        if ("on" === p) {
          e.indexOf("(") === -1 ? e += ".call(this, $event)" : e = e.replace("(", ".call(this,"), s.push("$event"), e = "\nreturn " + e + ";";
          var b = e.lastIndexOf("\nreturn"), _ = e.slice(0, b), w = e.slice(b);
          e = _ + "\n" + w
        } else e = "\nreturn " + e + ";";
        return v = l(s.concat("'use strict';\nvar " + o.join(",\n") + e)), Un.put(h, v)
      }

      function ne(e) {
        var t = Ft.test(e);
        if (t) {
          var n = me(e);
          return 1 === n.length ? n[0].expr : n.map(function (e) {
            return e.type ? "(" + e.expr + ")" : tr(e.expr)
          }).join(" + ")
        }
        return e
      }

      function re(e) {
        return e = e.replace(zn, "").replace(Xn, function () {
          return "],|"
        }).replace(Gn, function (e, t) {
          return "[" + tr(t)
        }).replace(Wn, function () {
          return '"],["'
        }).replace(Vn, function () {
          return '",'
        }) + "]", l(["return [" + e + "]"])()
      }

      function ae(e) {
        return er.lastIndex = 0, '"' + (er.test(e) ? String(e).replace(er, Zn) : e) + '"'
      }

      function ie(e, t, n) {
        var r = setTimeout(function () {
          var a = e.innerHTML;
          clearTimeout(r), a === n ? t() : ie(e, t, a)
        })
      }

      function oe(e, t) {
        var n = e.getAttribute("avalonctrl") || t.$id;
        e.setAttribute("avalonctrl", n), t.$events && (t.$events.expr = e.tagName + '[avalonctrl="' + n + '"]')
      }

      function se(e, t, n) {
        var r = e.getAttribute(t);
        if (r) for (var a, i = 0; a = n[i++];) if (a.hasOwnProperty(r) && "function" == typeof a[r]) return a[r]
      }

      function ce(e, t) {
        for (var n, r = 0; n = e[r++];) n.vmodels = t, Ot[n.type].init(n), avalon.injectBinding(n), n.getter && 1 === n.element.nodeType && n.element.removeAttribute(n.name);
        e.length = 0
      }

      function le(e, t) {
        return e.priority - t.priority
      }

      function ue(e, t) {
        for (var n, r = e.attributes, a = {}, i = 0; n = r[i++];) {
          var o = n.name;
          if (n.specified && !cr.test(o)) {
            var s = X(n.name);
            /^on\-[\w-]+$/.test(o) ? a[s] = se(e, o, t) : a[s] = W(n.value)
          }
        }
        return a
      }

      function fe(e, t, n) {
        var r = !0;
        if (t.length) {
          for (var a, i = mr ? mr(e) : e.attributes, o = [], c = {}, l = 0; a = i[l++];) {
            var u = a.name;
            if (!c[u] && (c[u] = 1, a.specified && (n = u.match(ir)))) {
              var f = n[1], d = n[2] || "", p = a.value;
              if (or[f] ? (d = f, f = "on") : sr[f] && (d = f, f = "attr", u = "ms-" + f + "-" + d, s("warning!请改用" + u + "代替" + a.name + "!")), Ot[f]) {
                var h = p.replace(ar, ""), v = p !== h, m = {
                  "type": f,
                  "param": d,
                  "element": e,
                  "name": u,
                  "expr": h,
                  "oneTime": v,
                  "uuid": "_" + ++mt,
                  "priority": (Ot[f].priority || 10 * f.charCodeAt(0)) + (Number(d.replace(/\D/g, "")) || 0)
                };
                if ("html" === f || "text" === f) {
                  var g = ve(p).filters;
                  m.expr = m.expr.replace(g, ""), m.filters = g.replace(gr, function () {
                    return m.type = "html", m.group = 1, ""
                  }).trim()
                } else if ("duplex" === f) var y = u; else if ("ms-if-loop" === u) m.priority += 100; else if ("ms-attr-value" === u) var b = u;
                o.push(m)
              }
            }
          }
          if (o.length) {
            for (o.sort(le), y && b && "INPUT" === e.nodeName && "text" === e.type && s("warning!一个控件不能同时定义ms-attr-value与" + y), l = 0; m = o[l]; l++) {
              if (f = m.type, lr.test(f)) return ce(o.slice(0, l + 1), t);
              r && (r = !ur.test(f))
            }
            ce(o, t)
          }
        }
        r && !nr[e.tagName] && (be(e) ? e.msResolved : 1) && (rr && rr(e), de(e, t))
      }

      function de(e, t) {
        var n = avalon.slice(e.childNodes);
        pe(n, t)
      }

      function pe(e, t) {
        function n(e) {
          setTimeout(function () {
            avalon.component(e)
          })
        }

        for (var r, a = 0; r = e[a++];) switch (r.nodeType) {
          case 1:
            var i = r;
            if (!i.msResolved && i.parentNode && 1 === i.parentNode.nodeType) {
              var o = be(i);
              if (o) {
                var s = i.localName ? i.localName.replace(o + ":", "") : i.nodeName, c = o + ":" + X(s);
                Cr.push({
                  "library": o,
                  "element": i,
                  "fullName": c,
                  "widget": s,
                  "vmodels": t,
                  "name": "widget"
                }), avalon.components[c] && n(c)
              }
            }
            he(r, t), r.msHasEvent && avalon.fireDom(r, "datasetchanged", {"bubble": r.msHasEvent});
            break;
          case 3:
            Ft.test(r.nodeValue) && ge(r, t, a)
        }
      }

      function he(e, t, n) {
        var r = e.getAttribute("ms-skip");
        if (!e.getAttributeNode) return s("warning " + e.tagName + " no getAttributeNode method");
        var a = e.getAttributeNode("ms-important"), i = e.getAttributeNode("ms-controller");
        if ("string" != typeof r) {
          if (n = a || i) {
            var o = avalon.vmodels[n.value];
            if (!o) return;
            t = n === a ? [o] : [o].concat(t);
            var c = n.name;
            e.removeAttribute(c), avalon(e).removeClass(c), oe(e, o)
          }
          fe(e, t), o && setTimeout(function () {
            o.$fire("ms-scan-end", e)
          })
        }
      }

      function ve(e) {
        if (e.indexOf("|") > 0) {
          var t = e.replace(br, function (e) {
            return Array(e.length + 1).join("1")
          }), n = t.replace(yr, "ᄢ㍄").indexOf("|");
          if (n > -1) return {"type": "text", "filters": e.slice(n).trim(), "expr": e.slice(0, n)}
        }
        return {"type": "text", "expr": e, "filters": ""}
      }

      function me(e) {
        for (var t, n, r = [], a = 0; ;) {
          if (n = e.indexOf(qt, a), n === -1) break;
          if (t = e.slice(a, n), t && r.push({"expr": t}), a = n + qt.length, n = e.indexOf(Ht, a), n === -1) break;
          t = e.slice(a, n), t && r.push(ve(t.replace(_r, ""))), a = n + Ht.length
        }
        return t = e.slice(a), t && r.push({"expr": t}), r
      }

      function ge(e, t, n) {
        var r = [], a = me(e.data);
        if (a.length) {
          for (var i, o = 0; i = a[o++];) {
            var s = Ve.createTextNode(i.expr);
            i.type && (i.expr = i.expr.replace(ar, function () {
              return i.oneTime = !0, ""
            }), i.element = s, i.filters = i.filters.replace(gr, function () {
              return i.type = "html", ""
            }), i.pos = 1e3 * n + o, r.push(i)), pt.appendChild(s)
          }
          e.parentNode.replaceChild(pt, e), r.length && ce(r, t)
        }
      }

      function ye(e, t) {
        if (t) for (var n, r = 0; n = e[r++];) if (n.hasOwnProperty(t) && "object" == typeof n[t]) {
          var a = n[t];
          return a.$model || a
        }
        return {}
      }

      function be(e) {
        if (e.scopeName && "HTML" !== e.scopeName) return e.scopeName;
        var t = e.nodeName.toLowerCase(), n = t.indexOf(":");
        return n > 0 ? t.slice(0, n) : void 0
      }

      function _e(e) {
        return null == e ? "" : e
      }

      function we(e, t, n) {
        return t.param.replace(rt, function (r) {
          var a = avalon.duplexHooks[r];
          a && "function" == typeof a[n] && (e = a[n](e, t))
        }), e
      }

      function xe() {
        for (var e = jr.length - 1; e >= 0; e--) {
          var t = jr[e];
          t() === !1 && jr.splice(e, 1)
        }
        jr.length || clearInterval(Dr)
      }

      function Ce(e) {
        var t = NaN, n = NaN;
        if (e.setSelectionRange) t = e.selectionStart, n = e.selectionEnd; else if (document.selection && document.selection.createRange) {
          var r = document.selection.createRange();
          t = 0 - r.duplicate().moveStart("character", -1e5), n = t + r.text.length
        }
        return {"start": t, "end": n}
      }

      function ke(e, t, n) {
        if (e.value && !e.readOnly) if (e.createTextRange) {
          var r = e.createTextRange();
          r.collapse(!0), r.moveStart("character", t), r.select()
        } else e.selectionStart = t, e.selectionEnd = n
      }

      function Ee(e, t) {
        if (!e || 1 !== e.nodeType) return null;
        if (t) var n = t.effectName,
          r = t.effectDriver; else n = e.getAttribute("data-effect-name"), r = e.getAttribute("data-effect-driver");
        if (!n || !r) return null;
        var a = Ur.pop() || new $e;
        return a.el = e, a.driver = r, a.useCss = "j" !== r, a.useCss && (t && avalon(e).addClass(t.effectClass), a.cssEvent = "t" === r ? Ir : Rr), a.name = n, a.callbacks = avalon.effects[n] || {}, a
      }

      function Te(e, t) {
        var n = e.getAttribute("data-effect-name");
        if (n) {
          t.effectName = n, t.effectDriver = e.getAttribute("data-effect-driver");
          var r = +e.getAttribute("data-effect-stagger");
          t.effectLeaveStagger = +e.getAttribute("data-effect-leave-stagger") || r, t.effectEnterStagger = +e.getAttribute("data-effect-enter-stagger") || r, t.effectClass = e.className || NaN
        }
      }

      function Se(e) {
        return e.replace(/^[\S]/g, function (e) {
          return e.toUpperCase()
        })
      }

      function $e() {
      }

      function Ae(e, t) {
        var n = e.callbacks[t + "Class"];
        return "string" == typeof n ? n : "function" == typeof n ? n() : e.name + "-" + t
      }

      function Me(e, t, n) {
        var r = e.callbacks[t];
        r && r.call(e, e.el, n)
      }

      function Ne(e, t, n) {
        var r = e.templateCache && e.templateCache[t];
        if (r) {
          for (var a, i = Ve.createDocumentFragment(); a = r.firstChild;) i.appendChild(a);
          return i
        }
        return avalon.parseHTML(n)
      }

      function Oe(e) {
        for (var t = Ve.createDocumentFragment(), n = 0, r = e.length; n < r; n++) t.appendChild(e[n]);
        return t
      }

      function Pe(e, t, n) {
        for (var r, a = 0; r = e[a++];) r.className === n.effectClass && avalon.effect.apply(r, t, c, c, n)
      }

      function De(e, t, n) {
        return e ? setTimeout(t, ++n * e) : t(), n
      }

      function je(e, t, n) {
        for (var r = pt.cloneNode(!1), a = e, i = a.nodeValue, o = t && Math.max(+t.staggerIndex, 0), s = avalon.slice(a.parentNode.childNodes), l = s.indexOf(a); ;) {
          var u = s[--l];
          if (!u || 0 === String(u.nodeValue).indexOf(i)) break;
          !n && t && u.className === t.effectClass ? (e = u, function (e) {
            t.staggerIndex = De(t.effectLeaveStagger, function () {
              avalon.effect.apply(e, 0, c, function () {
                r.appendChild(e)
              }, t)
            }, o)
          }(u)) : r.insertBefore(u, r.firstChild)
        }
        return r.appendChild(a), r
      }

      function Be(e, t, n, r, a) {
        var i = e.template.cloneNode(!0), o = avalon.slice(i.childNodes);
        i.appendChild(n.$anchor), a && t.appendChild(i);
        var s, c = e.param || "el";
        n[c];
        s = [n].concat(e.vmodels);
        var l = {"nodes": o, "vmodels": s, "content": i};
        r.push(l)
      }

      function Ie(e) {
        var t = "object" === e.xtype ? He : Le, n = t(e), r = n.$anchor || (n.$anchor = e.element.cloneNode(!1));
        return r.nodeValue = e.signature, n.$outer = e.$outer, n
      }

      function Re(e, t, n) {
        if ("array" === n) {
          e.$remove = function () {
            t.$repeat.removeAt(e.$index)
          };
          var r = t.param;
          e.$watch(r, function (n) {
            var r = e.$index;
            t.$repeat[r] = n
          })
        } else e.$watch("$val", function (n) {
          t.$repeat[e.$key] = n
        })
      }

      function Le(e, t) {
        for (var n = e.param || "el", r = 0, a = Yr.length; r < a; r++) {
          var i = Yr[r];
          if (i && i.hasOwnProperty(n)) {
            Yr.splice(r, 1), t = i;
            break
          }
        }
        return t || (t = qe(n)), t
      }

      function qe(e) {
        var t = {
          "$outer": {},
          "$index": 0,
          "$oldIndex": 0,
          "$anchor": null,
          "$first": !1,
          "$last": !1,
          "$remove": avalon.noop
        };
        t[e] = NaN;
        var n = {"$last": 1, "$first": 1, "$index": 1};
        n[e] = 1;
        var r = C(t, {"force": n});
        return r.$id = yt("$proxy$each"), r
      }

      function He(e) {
        var t = e.param || "el";
        return Zr.pop() || Fe(t)
      }

      function Fe(e) {
        var t = {"$key": "", "$val": NaN, "$index": 0, "$oldIndex": 0, "$outer": {}, "$anchor": null};
        t[e] = NaN;
        var n = {"$key": 1, "$val": 1, "$index": 1};
        n[e] = 1;
        var r = C(t, {"force": n});
        return r.$id = yt("$proxy$with"), r
      }

      function Ue(e, t, n) {
        var r = e[t];
        if (r) {
          var a = 0 === r.$id.indexOf("$proxy$each") ? Yr : Zr;
          r.$outer = {};
          for (var i in r.$events) {
            var o = r.$events[i];
            Array.isArray(o) && (o.length = 0, i === n ? r[n] = NaN : "$val" === i && (r.$val = NaN))
          }
          a.unshift(r) > g.maxRepeatSize && a.pop(), delete e[t]
        }
      }

      function ze(e, t) {
        var n = "_" + e;
        if (!ze[n]) {
          var r = Ve.createElement(e);
          dt.appendChild(r), t = ft ? getComputedStyle(r, null).display : r.currentStyle.display, dt.removeChild(r), ze[n] = t
        }
        return ze[n]
      }

      function Xe(e, t, n, r) {
        e = (e + "").replace(/[^0-9+\-Ee.]/g, "");
        var a = isFinite(+e) ? +e : 0, i = isFinite(+t) ? Math.abs(t) : 3, o = r || ",", s = n || ".", c = "",
          l = function (e, t) {
            var n = Math.pow(10, t);
            return "" + (Math.round(e * n) / n).toFixed(t)
          };
        return c = (i ? l(a, i) : "" + Math.round(a)).split("."), c[0].length > 3 && (c[0] = c[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, o)), (c[1] || "").length < i && (c[1] = c[1] || "", c[1] += new Array(i - c[1].length + 1).join("0")), c.join(s)
      }

      function Ge() {
        try {
          dt.doScroll("left"), pa()
        } catch (e) {
          setTimeout(Ge)
        }
      }

      var We = new Date - 0, Ve = n.document, Qe = Ve.getElementsByTagName("head")[0],
        Ke = Qe.insertBefore(document.createElement("avalon"), Qe.firstChild);
      Ke.innerHTML = "X<style id='avalonStyle'>.avalonHide{ display: none!important }</style>", Ke.setAttribute("ms-skip", "1"), Ke.className = "avalonHide";
      var Je = /\[native code\]/, Ye = function (e) {
        "undefined" != typeof Raven && Raven.captureException && Raven.captureException(e)
      }, Ze = function (e, t) {
        "undefined" != typeof Raven && Raven.captureException && Raven.captureBreadcrumb({
          "message": e,
          "category": "tag",
          "data": t || {}
        })
      };
      Ze("avalon start");
      var et = "$" + We, tt = {}, nt = /[^, ]+/g, rt = /\w+/g, at = /^\[object SVG\w*Element\]$/,
        it = /^\[object (?:Window|DOMWindow|global)\]$/, ot = Object.prototype, st = ot.hasOwnProperty,
        ct = ot.toString, lt = Array.prototype, ut = lt.slice, ft = n.dispatchEvent, dt = Ve.documentElement,
        pt = Ve.createDocumentFragment(), ht = Ve.createElement("div"), vt = {};
      "Boolean Number String Function Array Date RegExp Object Error".replace(nt, function (e) {
        vt["[object " + e + "]"] = e.toLowerCase()
      });
      var mt = 1024, gt = NaN;
      n.VBArray && (gt = document.documentMode || (n.XMLHttpRequest ? 7 : 6));
      var yt = function (e) {
        return e = e || "avalon", String(Math.random() + Math.random()).replace(/\d\.\d{4}/, e)
      };
      if (avalon = function (e) {
        return new avalon.init(e)
      }, avalon.nextTick = new function () {
        function e() {
          for (var e = a.length, t = 0; t < e; t++) a[t]();
          a = a.slice(e)
        }

        var t = n.setImmediate, r = n.MutationObserver;
        if (t) return t.bind(n);
        var a = [];
        if (r) {
          var i = document.createTextNode("avalon");
          new r(e).observe(i, {"characterData": !0});
          var o = !1;
          return function (e) {
            a.push(e), o = !o, i.data = o
          }
        }
        return function (e) {
          setTimeout(e, 4)
        }
      }, !"司徒正美".trim) {
        var bt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function () {
          return this.replace(bt, "")
        }
      }
      var _t = !{"toString": null}.propertyIsEnumerable("toString"), wt = function () {
        }.propertyIsEnumerable("prototype"),
        xt = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        Ct = xt.length;
      Object.keys || (Object.keys = function (e) {
        var t = [], n = wt && "function" == typeof e;
        if ("string" == typeof e || e && e.callee) for (var r = 0; r < e.length; ++r) t.push(String(r)); else for (var a in e) n && "prototype" === a || !st.call(e, a) || t.push(String(a));
        if (_t) for (var i = e.constructor, o = i && i.prototype === e, s = 0; s < Ct; s++) {
          var c = xt[s];
          o && "constructor" === c || !st.call(e, c) || t.push(c)
        }
        return t
      }), Array.isArray || (Array.isArray = function (e) {
        return "[object Array]" === ct.call(e)
      }), c.bind || (Function.prototype.bind = function (e) {
        if (arguments.length < 2 && void 0 === e) return this;
        var t = this, n = arguments;
        return function () {
          var r, a = [];
          for (r = 1; r < n.length; r++) a.push(n[r]);
          for (r = 0; r < arguments.length; r++) a.push(arguments[r]);
          return t.apply(e, a)
        }
      });
      var kt = lt.slice;
      try {
        kt.call(document.documentElement)
      } catch (Et) {
        ut = lt.slice = function (e, t) {
          if (t = "undefined" != typeof t ? t : this.length, Array.isArray(this)) return kt.call(this, e, t);
          var n, r, a = [], i = this.length, o = e || 0;
          o = o >= 0 ? o : i + o;
          var s = t ? t : i;
          if (t < 0 && (s = i + t), r = s - o, r > 0) if (a = new Array(r), this.charAt) for (n = 0; n < r; n++) a[n] = this.charAt(o + n); else for (n = 0; n < r; n++) a[n] = this[o + n];
          return a
        }
      }
      if (!/\[native code\]/.test(lt.map)) {
        var Tt = {
          "indexOf": function (e, t) {
            var n = this.length, r = ~~t;
            for (r < 0 && (r += n); r < n; r++) if (this[r] === e) return r;
            return -1
          },
          "lastIndexOf": function (e, t) {
            var n = this.length, r = null == t ? n - 1 : t;
            for (r < 0 && (r = Math.max(0, n + r)); r >= 0; r--) if (this[r] === e) return r;
            return -1
          },
          "forEach": f("", "_", ""),
          "filter": f("r=[],j=0,", "if(_)r[j++]=this[i]", "return r"),
          "map": f("r=[],", "r[i]=_", "return r"),
          "some": f("", "if(_)return true", "return false"),
          "every": f("", "if(!_)return false", "return true"),
          "reduce": function (e) {
            if (null === this) throw new TypeError("Array.prototype.reduce called on null or undefined");
            if ("function" != typeof e) throw new TypeError(e + " is not a function");
            var t, n = Object(this), r = n.length >>> 0, a = 0;
            if (arguments.length >= 2) t = arguments[1]; else {
              for (; a < r && !(a in n);) a++;
              if (a >= r) throw new TypeError("Reduce of empty array with no initial value");
              t = n[a++]
            }
            for (; a < r;) a in n && (t = e(t, n[a], a, n)), a++;
            return t
          },
          "reduceRight": function (e) {
            if (null === this || "undefined" == typeof this) throw new TypeError("Array.prototype.reduce called on null or undefined");
            if ("function" != typeof e) throw new TypeError(e + " is not a function");
            var t, n = Object(this), r = n.length >>> 0, a = r - 1;
            if (arguments.length >= 2) t = arguments[1]; else {
              for (; a >= 0 && !(a in n);) a--;
              if (a < 0) throw new TypeError("Reduce of empty array with no initial value");
              t = n[a--]
            }
            for (; a >= 0; a--) a in n && (t = e(t, n[a], a, n));
            return t
          }
        };
        for (var St in Tt) lt[St] = Tt[St]
      }
      avalon.init = function (e) {
        this[0] = this.element = e
      }, avalon.fn = avalon.prototype = avalon.init.prototype, avalon.type = function (e) {
        return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? vt[ct.call(e)] || "object" : typeof e
      }, avalon.isFunction = "object" == typeof alert ? function (e) {
        try {
          return /^\s*\bfunction\b/.test(e + "")
        } catch (t) {
          return !1
        }
      } : function (e) {
        return "[object Function]" === ct.call(e)
      }, avalon.isWindow = function (e) {
        return !!e && (e == e.document && e.document != e)
      }, d(n) && (avalon.isWindow = d);
      var $t, At;
      for ($t in avalon({})) break;
      At = "0" !== $t, avalon.isPlainObject = function (e, t) {
        if (!e || "object" !== avalon.type(e) || e.nodeType || avalon.isWindow(e)) return !1;
        try {
          if (e.constructor && !st.call(e, "constructor") && !st.call(e.constructor.prototype, "isPrototypeOf")) return !1
        } catch (n) {
          return !1
        }
        if (At) for (t in e) return st.call(e, t);
        for (t in e) ;
        return void 0 === t || st.call(e, t)
      }, Je.test(Object.getPrototypeOf) && (avalon.isPlainObject = function (e) {
        return "[object Object]" === ct.call(e) && Object.getPrototypeOf(e) === ot
      }), avalon.mix = avalon.fn.mix = function () {
        var e, t, n, r, a, i, o = arguments[0] || {}, s = 1, c = arguments.length, l = !1;
        for ("boolean" == typeof o && (l = o, o = arguments[1] || {}, s++), "object" == typeof o || avalon.isFunction(o) || (o = {}), s === c && (o = this, s--); s < c; s++) if (null != (e = arguments[s])) for (t in e) {
          n = o[t];
          try {
            r = e[t]
          } catch (u) {
            continue
          }
          o !== r && (l && r && (avalon.isPlainObject(r) || (a = Array.isArray(r))) ? (a ? (a = !1, i = n && Array.isArray(n) ? n : []) : i = n && avalon.isPlainObject(n) ? n : {}, o[t] = avalon.mix(l, i, r)) : void 0 !== r && (o[t] = r))
        }
        return o
      }, avalon.mix({
        "rword": nt, "subscribers": et, "version": 1.56, "ui": {}, "log": s, "slice": function (e, t, n) {
          return ut.call(e, t, n)
        }, "noop": c, "error": function (e, t) {
          throw(t || Error)(e)
        }, "oneObject": u, "range": function (e, t, n) {
          n || (n = 1), null == t && (t = e || 0, e = 0);
          for (var r = -1, a = Math.max(0, Math.ceil((t - e) / n)), i = new Array(a); ++r < a;) i[r] = e, e += n;
          return i
        }, "eventHooks": {}, "bind": function (e, t, n, r) {
          var a = avalon.eventHooks, i = a[t];
          "object" == typeof i && (t = i.type || t, r = i.phase || !!r, n = i.fix ? i.fix(e, n) : n);
          var o = ft ? n : function (t) {
            n.call(e, m(t))
          };
          return ft ? e.addEventListener(t, o, r) : e.attachEvent("on" + t, o), o
        }, "unbind": function (e, t, n, r) {
          var a = avalon.eventHooks, i = a[t], o = n || c;
          "object" == typeof i && (t = i.type || t, r = i.phase || !!r), ft ? e.removeEventListener(t, o, r) : e.detachEvent("on" + t, o)
        }, "css": function (e, t, n) {
          e instanceof avalon && (e = e[0]);
          var r, a = /[_-]/.test(t) ? X(t) : t;
          if (t = avalon.cssName(a) || a, void 0 === n || "boolean" == typeof n) {
            r = kn[a + ":get"] || kn["@:get"], "background" === t && (t = "backgroundColor");
            var i = r(e, t);
            return n === !0 ? parseFloat(i) || 0 : i
          }
          if ("" === n) e.style[t] = ""; else {
            if (null == n || n !== n) return;
            isFinite(n) && !avalon.cssNumber[a] && (n += "px"), r = kn[a + ":set"] || kn["@:set"], r(e, t, n)
          }
        }, "each": function (e, t) {
          if (e) {
            var n = 0;
            if (p(e)) for (var r = e.length; n < r && t(n, e[n]) !== !1; n++) ; else for (n in e) if (e.hasOwnProperty(n) && t(n, e[n]) === !1) break
          }
        }, "getWidgetData": function (e, t) {
          var n = avalon(e).data(), r = {};
          for (var a in n) 0 === a.indexOf(t) && (r[a.replace(t, "").replace(/\w/, function (e) {
            return e.toLowerCase()
          })] = n[a]);
          return r
        }, "Array": {
          "ensure": function (e, t) {
            if (e.indexOf(t) === -1) return e.push(t)
          }, "removeAt": function (e, t) {
            return !!e.splice(t, 1).length
          }, "remove": function (e, t) {
            var n = e.indexOf(t);
            return !!~n && avalon.Array.removeAt(e, n)
          }
        }
      });
      var Mt = avalon.bindingHandlers = {}, Nt = avalon.bindingExecutors = {}, Ot = avalon.directives = {};
      avalon.directive = function (e, t) {
        return Mt[e] = t.init = t.init || c, Nt[e] = t.update = t.update || c, Ot[e] = t
      };
      var Pt = new function () {
        function e(e) {
          this.size = 0, this.limit = e, this.head = this.tail = void 0, this._keymap = {}
        }

        var t = e.prototype;
        return t.put = function (e, t) {
          var n = {"key": e, "value": t};
          return this._keymap[e] = n, this.tail ? (this.tail.newer = n, n.older = this.tail) : this.head = n, this.tail = n, this.size === this.limit ? this.shift() : this.size++, t
        }, t.shift = function () {
          var e = this.head;
          e && (this.head = this.head.newer, this.head.older = e.newer = e.older = this._keymap[e.key] = void 0, delete this._keymap[e.key])
        }, t.get = function (e) {
          var t = this._keymap[e];
          if (void 0 !== t) return t === this.tail ? t.value : (t.newer && (t === this.head && (this.head = t.newer), t.newer.older = t.older), t.older && (t.older.newer = t.newer), t.newer = void 0, t.older = this.tail, this.tail && (this.tail.newer = t), this.tail = t, t.value)
        }, e
      };
      if (avalon.contains = function (e, t) {
        try {
          for (; t = t.parentNode;) if (t === e) return !0;
          return !1
        } catch (n) {
          return !1
        }
      }, Ve.contains || (Ve.contains = function (e) {
        return avalon.contains(Ve, e)
      }), n.SVGElement) {
        Ve.createTextNode("x").contains || (Node.prototype.contains = function (e) {
          return !!(16 & this.compareDocumentPosition(e))
        });
        var Dt = "http://www.w3.org/2000/svg", jt = Ve.createElementNS(Dt, "svg");
        jt.innerHTML = '<circle cx="50" cy="50" r="40" fill="red" />', at.test(jt.firstChild) || Object.defineProperties(SVGElement.prototype, {
          "outerHTML": {
            "enumerable": !0,
            "configurable": !0,
            "get": h,
            "set": function (e) {
              var t = this.tagName.toLowerCase(), n = this.parentNode, r = avalon.parseHTML(e);
              if ("svg" === t) n.insertBefore(r, this); else {
                var a = Ve.createDocumentFragment();
                v(r, a), n.insertBefore(a, this)
              }
              n.removeChild(this)
            }
          }, "innerHTML": {
            "enumerable": !0, "configurable": !0, "get": function () {
              var e = this.outerHTML, t = new RegExp("<" + this.nodeName + '\\b(?:(["\'])[^"]*?(\\1)|[^>])*>', "i"),
                n = new RegExp("</" + this.nodeName + ">$", "i");
              return e.replace(t, "").replace(n, "")
            }, "set": function (e) {
              if (avalon.clearHTML) {
                avalon.clearHTML(this);
                var t = avalon.parseHTML(e);
                v(t, this)
              }
            }
          }
        })
      }
      !dt.outerHTML && n.HTMLElement && HTMLElement.prototype.__defineGetter__("outerHTML", h);
      var Bt = /^(?:mouse|contextmenu|drag)|click/, It = avalon.eventHooks;
      if ("onmouseenter" in dt || avalon.each({"mouseenter": "mouseover", "mouseleave": "mouseout"}, function (e, t) {
        It[e] = {
          "type": t, "fix": function (t, n) {
            return function (r) {
              var a = r.relatedTarget;
              if (!a || a !== t && !(16 & t.compareDocumentPosition(a))) return delete r.type, r.type = e, n.call(t, r)
            }
          }
        }
      }), avalon.each({
        "AnimationEvent": "animationend",
        "WebKitAnimationEvent": "webkitAnimationEnd"
      }, function (e, t) {
        n[e] && !It.animationend && (It.animationend = {"type": t})
      }), "oninput" in Ve.createElement("input") || (It.input = {
        "type": "propertychange", "fix": function (e, t) {
          return function (n) {
            if ("value" === n.propertyName) return n.type = "input", t.call(e, n)
          }
        }
      }), void 0 === Ve.onmousewheel) {
        var Rt = void 0 !== Ve.onwheel ? "wheel" : "DOMMouseScroll", Lt = "wheel" === Rt ? "deltaY" : "detail";
        It.mousewheel = {
          "type": Rt, "fix": function (e, t) {
            return function (n) {
              n.wheelDeltaY = n.wheelDelta = n[Lt] > 0 ? -120 : 120, n.wheelDeltaX = 0, Object.defineProperty && Object.defineProperty(n, "type", {"value": "mousewheel"}), t.call(e, n)
            }
          }
        }
      }
      avalon.config = g;
      var qt, Ht, Ft, Ut, zt, Xt = /[-.*+?^${}()|[\]\/\\]/g, Gt = {
        "interpolate": function (e) {
          if (qt = e[0], Ht = e[1], qt === Ht) {
            throw new SyntaxError("openTag!==closeTag")
          }
          g.openTag = qt, g.closeTag = Ht;
          var t = y(qt), n = y(Ht);
          Ft = new RegExp(t + "([\\s\\S]*)" + n), Ut = new RegExp(t + "([\\s\\S]*)" + n, "g"), zt = new RegExp(t + "[\\s\\S]*" + n + "|\\sms-")
        }
      };
      g.plugins = Gt, g.plugins["interpolate"](["{{", "}}"]), g.async = !0, g.debug = !0, g.paths = {}, g.shim = {}, g.maxRepeatSize = 100;
      var Wt = avalon.vmodels = {};
      avalon.define = function (e) {
        var t = e.$id;
        t || s("warning: vm必须指定$id");
        var n = C(e);
        return n.$id = t, Wt[t] = n
      };
      var Vt = u("$id,$watch,$fire,$events,$model,$skipArray,$active,$pathname,$up,$track,$accessors,$ups"),
        Qt = Object.defineProperty, Kt = !0;
      try {
        Qt({}, "_", {"value": "x"});
        var Jt = Object.defineProperties
      } catch (Et) {
        Kt = !1
      }
      var Yt = Je.test(Object.key) ? Object.key : function (e) {
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && !Vt[n] && t.push(n);
        return t
      }, Zt = {
        "get": function () {
          return N(this)
        }, "set": c, "enumerable": !1, "configurable": !0
      };
      Ze("avalon core", {"defineProperty": Kt, "supportVB": gt});
      try {
        if (!Kt && ("__defineGetter__" in avalon && (Qt = function (e, t, n) {
          return "value" in n && (e[t] = n.value), "get" in n && e.__defineGetter__(t, n.get), "set" in n && e.__defineSetter__(t, n.set), e
        }, Jt = function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && Qt(e, n, t[n]);
          return e
        }), gt)) {
          var en = {};
          n.execScript(["Function parseVB(code)", "\tExecuteGlobal(code)", "End Function"].join("\n"), "VBScript"), Jt = function (e, t, r) {
            var a = [];
            a.push("\r\n\tPrivate [__data__], [__proxy__]", "\tPublic Default Function [__const__](d" + We + ", p" + We + ")", "\t\tSet [__data__] = d" + We + ": set [__proxy__] = p" + We, "\t\tSet [__const__] = Me", "\tEnd Function");
            var i = {};
            for (e in t) i[e] = !0, a.push("\tPublic Property Let [" + e + "](val" + We + ")", '\t\tCall [__proxy__](Me,[__data__], "' + e + '", val' + We + ")", "\tEnd Property", "\tPublic Property Set [" + e + "](val" + We + ")", '\t\tCall [__proxy__](Me,[__data__], "' + e + '", val' + We + ")", "\tEnd Property", "\tPublic Property Get [" + e + "]", "\tOn Error Resume Next", "\t\tSet[" + e + '] = [__proxy__](Me,[__data__],"' + e + '")', "\tIf Err.Number <> 0 Then", "\t\t[" + e + '] = [__proxy__](Me,[__data__],"' + e + '")', "\tEnd If", "\tOn Error Goto 0", "\tEnd Property");
            for (e in r) i[e] !== !0 && (i[e] = !0, a.push("\tPublic [" + e + "]"));
            for (e in Vt) i[e] !== !0 && (i[e] = !0, a.push("\tPublic [" + e + "]"));
            a.push("\tPublic [hasOwnProperty]"), a.push("End Class");
            var o = a.join("\r\n"), s = en[o];
            if (!s) {
              s = yt("VBClass");
              try {
                n.parseVB("Class " + s + o), n.parseVB(["Function " + s + "Factory(a, b)", "\tDim o", "\tSet o = (New " + s + ")(a, b)", "\tSet " + s + "Factory = o", "End Function"].join("\r\n")), en[o] = s
              } catch (c) {
                Ye(c)
              }
            }
            var l = n[s + "Factory"](t, O);
            return l
          }
        }
      } catch (Et) {
        Ye(Et)
      }
      var tn = ["push", "pop", "shift", "unshift", "splice"], nn = Array.prototype, rn = {
        "notify": function () {
          _.call(this.$up, this.$pathname)
        }, "set": function (e, t) {
          if (e >>> 0 === e && this[e] !== t) {
            if (e > this.length) throw Error(e + "set方法的第一个参数不能大于原数组长度");
            _.call(this.$up, this.$pathname + ".*", [t, this[e]]), this.splice(e, 1, t)
          }
        }, "contains": function (e) {
          return this.indexOf(e) !== -1
        }, "ensure": function (e) {
          return this.contains(e) || this.push(e), this
        }, "pushArray": function (e) {
          return this.push.apply(this, e)
        }, "remove": function (e) {
          return this.removeAt(this.indexOf(e))
        }, "removeAt": function (e) {
          return e >>> 0 === e ? this.splice(e, 1) : []
        }, "size": function () {
          return this._.length
        }, "removeAll": function (e) {
          if (Array.isArray(e)) for (var t = this.length - 1; t >= 0; t--) e.indexOf(this[t]) !== -1 && (an.call(this.$track, t, 1), an.call(this, t, 1)); else if ("function" == typeof e) for (t = this.length - 1; t >= 0; t--) {
            var n = this[t];
            e(n, t) && (an.call(this.$track, t, 1), an.call(this, t, 1))
          } else an.call(this.$track, 0, this.length), an.call(this, 0, this.length);
          ft || (this.$model = N(this)), this.notify(), this._.length = this.length
        }, "clear": function () {
          return this.removeAll(), this
        }
      }, an = nn.splice;
      tn.forEach(function (e) {
        var t = nn[e];
        rn[e] = function () {
          for (var n = [], r = 0, a = arguments.length; r < a; r++) n[r] = $(arguments[r], 0, 1, 1);
          var i = t.apply(this, n);
          return j(this.$track, e, n), ft || (this.$model = N(this)), this.notify(), this._.length = this.length, i
        }
      }), "sort,reverse".replace(nt, function (e) {
        rn[e] = function () {
          var t = this.concat(), n = this, r = Math.random(), a = [], i = !1;
          nn[e].apply(n, arguments);
          for (var o = 0, s = t.length; o < s; o++) {
            var c = n[o], l = t[o];
            if (c === l) a.push(o); else {
              var u = t.indexOf(c);
              a.push(u), t[u] = r, i = !0
            }
          }
          return i && (P(this.$track, a), ft || (this.$model = N(this)), this.notify()), this
        }
      });
      var on = function () {
        var e, t = [];
        return {
          "begin": function (n) {
            t.push(e), e = n
          }, "end": function () {
            e = t.pop()
          }, "collectDependency": function (t) {
            e && e.callback(t)
          }
        }
      }();
      avalon.injectBinding = function (e) {
        e.handler = e.handler || Ot[e.type].update || c, e.update = function () {
          var t = !1;
          e.getter || (t = !0, on.begin({
            "callback": function (t) {
              B(t, e)
            }
          }), e.getter = te(e.expr, e.vmodels, e), e.observers.forEach(function (t) {
            t.v.$watch(t.p, e)
          }), delete e.observers);
          try {
            var n, r, a = e.fireArgs;
            if (delete e.fireArgs, a) n = a[0], r = a[1]; else if ("on" === e.type) n = e.getter + ""; else try {
              n = e.getter.apply(0, e.args)
            } catch (i) {
              n = null
            }
            if (r = "undefined" == typeof r ? e.oldValue : r, e._filters && (n = oa.$filter.apply(0, [n].concat(e._filters))), e.signature) {
              var o = avalon.type(n);
              if ("array" !== o && "object" !== o) throw Error("warning:" + e.expr + "只能是对象或数组");
              e.xtype = o;
              var c = I(e.proxies || [], o), l = n.$track || ("array" === o ? D(n.length) : Object.keys(n));
              e.track = l, c !== l.join(";") && (e.handler(n, r), e.oldValue = 1)
            } else Array.isArray(n) && n.length !== (r && r.length) ? (e.handler(n, r), e.oldValue = n.concat()) : "oldValue" in e && n === r || (e.handler(n, r), e.oldValue = Array.isArray(n) ? n.concat() : n)
          } catch (i) {
            delete e.getter, s("warning:exception throwed in [avalon.injectBinding] ", i);
            var u = e.element;
            u && 3 === u.nodeType && (u.nodeValue = qt + (e.oneTime ? "::" : "") + e.expr + Ht), Ye(i)
          } finally {
            t && on.end()
          }
        }, e.update()
      };
      var sn = avalon.$$subscribers = [], cn = new Date, ln = 0, un = {
        "area": [1, "<map>", "</map>"],
        "param": [1, "<object>", "</object>"],
        "col": [2, "<table><colgroup>", "</colgroup></table>"],
        "legend": [1, "<fieldset>", "</fieldset>"],
        "option": [1, "<select multiple='multiple'>", "</select>"],
        "thead": [1, "<table>", "</table>"],
        "tr": [2, "<table>", "</table>"],
        "td": [3, "<table><tr>", "</tr></table>"],
        "g": [1, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">', "</svg>"],
        "_default": ft ? [0, "", ""] : [1, "X<div>", "</div>"]
      };
      un.th = un.td, un.optgroup = un.option, un.tbody = un.tfoot = un.colgroup = un.caption = un.thead, String("circle,defs,ellipse,image,line,path,polygon,polyline,rect,symbol,text,use").replace(nt, function (e) {
        un[e] = un.g
      });
      var fn = /<([\w:]+)/, dn = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        pn = ft ? /[^\d\D]/ : /(<(?:script|link|style|meta|noscript))/gi,
        hn = u(["", "text/javascript", "text/ecmascript", "application/ecmascript", "application/javascript"]),
        vn = /<(?:tb|td|tf|th|tr|col|opt|leg|cap|area)/, mn = Ve.createElement("script"), gn = /<|&#?\w+;/;
      avalon.parseHTML = function (e) {
        var t = pt.cloneNode(!1);
        if ("string" != typeof e) return t;
        if (!gn.test(e)) return t.appendChild(Ve.createTextNode(e)), t;
        e = e.replace(dn, "<$1></$2>").trim();
        var n, r, a = (fn.exec(e) || ["", ""])[1].toLowerCase(), i = un[a] || un._default, o = ht;
        ft || (e = e.replace(pn, "<br class=msNoScope>$1")), o.innerHTML = i[1] + e + i[2];
        var s = o.getElementsByTagName("script");
        if (s.length) for (var c, l = 0; c = s[l++];) hn[c.type] && (r = mn.cloneNode(!1), lt.forEach.call(c.attributes, function (e) {
          e && e.specified && (r[e.name] = e.value, r.setAttribute(e.name, e.value))
        }), r.text = c.text, c.parentNode.replaceChild(r, c));
        if (!ft) {
          var u = "X<div>" === i[1] ? o.lastChild.firstChild : o.lastChild;
          if (u && "TABLE" === u.tagName && "tbody" !== a) for (s = u.childNodes, l = 0; c = s[l++];) if ("TBODY" === c.tagName && !c.innerHTML) {
            u.removeChild(c);
            break
          }
          s = o.getElementsByTagName("br");
          for (var f = s.length; c = s[--f];) "msNoScope" === c.className && c.parentNode.removeChild(c);
          for (s = o.all, l = 0; c = s[l++];) F(c) && U(c)
        }
        for (l = i[0]; l--; o = o.lastChild) ;
        for (; n = o.firstChild;) t.appendChild(n);
        return t
      }, avalon.innerHTML = function (e, t) {
        if (!ft && !pn.test(t) && !vn.test(t)) try {
          return void (e.innerHTML = t)
        } catch (n) {
        }
        var r = this.parseHTML(t);
        this.clearHTML(e).appendChild(r)
      }, avalon.clearHTML = function (e) {
        for (e.textContent = ""; e.firstChild;) e.removeChild(e.firstChild);
        return e
      };
      var yn = {
        "_toString": function () {
          var e = this.node, t = e.className, n = "string" == typeof t ? t : t.baseVal;
          return n.split(/\s+/).join(" ")
        }, "_contains": function (e) {
          return (" " + this + " ").indexOf(" " + e + " ") > -1
        }, "_add": function (e) {
          this.contains(e) || this._set(this + " " + e)
        }, "_remove": function (e) {
          this._set((" " + this + " ").replace(" " + e + " ", " "))
        }, "__set": function (e) {
          e = e.trim();
          var t = this.node;
          at.test(t) ? t.setAttribute("class", e) : t.className = e
        }
      };
      "add,remove".replace(nt, function (e) {
        avalon.fn[e + "Class"] = function (t) {
          var n = this[0];
          return t && "string" == typeof t && n && 1 === n.nodeType && t.replace(/\S+/g, function (t) {
            G(n)[e](t)
          }), this
        }
      }), avalon.fn.mix({
        "hasClass": function (e) {
          var t = this[0] || {};
          return 1 === t.nodeType && G(t).contains(e)
        }, "toggleClass": function (e, t) {
          for (var n, r = 0, a = String(e).match(/\S+/g) || [], i = "boolean" == typeof t; n = a[r++];) {
            var o = i ? t : !this.hasClass(n);
            this[o ? "addClass" : "removeClass"](n)
          }
          return this
        }, "attr": function (e, t) {
          return 2 === arguments.length ? (this[0].setAttribute(e, t), this) : this[0].getAttribute(e)
        }, "data": function (e, t) {
          switch (e = "data-" + z(e || ""), arguments.length) {
            case 2:
              return this.attr(e, t), this;
            case 1:
              var n = this.attr(e);
              return W(n);
            case 0:
              var r = {};
              return lt.forEach.call(this[0].attributes, function (t) {
                t && (e = t.name, e.indexOf("data-") || (e = X(e.slice(5)), r[e] = W(t.value)))
              }), r
          }
        }, "removeData": function (e) {
          return e = "data-" + z(e), this[0].removeAttribute(e), this
        }, "css": function (e, t) {
          if (avalon.isPlainObject(e)) for (var n in e) avalon.css(this, n, e[n]); else var r = avalon.css(this, e, t);
          return void 0 !== r ? r : this
        }, "position": function () {
          var e, t, n = this[0], r = {"top": 0, "left": 0};
          if (n) return "fixed" === this.css("position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), "HTML" !== e[0].tagName && (r = e.offset()), r.top += avalon.css(e[0], "borderTopWidth", !0), r.left += avalon.css(e[0], "borderLeftWidth", !0), r.top -= e.scrollTop(), r.left -= e.scrollLeft()), {
            "top": t.top - r.top - avalon.css(n, "marginTop", !0),
            "left": t.left - r.left - avalon.css(n, "marginLeft", !0)
          }
        }, "offsetParent": function () {
          for (var e = this[0].offsetParent; e && "static" === avalon.css(e, "position");) e = e.offsetParent;
          return avalon(e || dt)
        }, "bind": function (e, t, n) {
          if (this[0]) return avalon.bind(this[0], e, t, n)
        }, "unbind": function (e, t, n) {
          return this[0] && avalon.unbind(this[0], e, t, n), this
        }, "val": function (e) {
          var t = this[0];
          if (t && 1 === t.nodeType) {
            var n = 0 === arguments.length, r = n ? ":get" : ":set", a = Bn[K(t) + r];
            if (a) var i = a(t, e); else {
              if (n) return (t.value || "").replace(/\r/g, "");
              t.value = e
            }
          }
          return n ? i : this
        }
      });
      var bn = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, _n = /^[\],:{}\s]*$/, wn = /(?:^|:|,)(?:\s*\[)+/g,
        xn = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        Cn = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;
      avalon.parseJSON = n.JSON ? JSON.parse : function (e) {
        if ("string" == typeof e) {
          if (e = e.trim(), e && _n.test(e.replace(xn, "@").replace(Cn, "]").replace(wn, ""))) return new Function("return " + e)();
          avalon.error("Invalid JSON: " + e)
        }
        return e
      }, avalon.fireDom = function (e, t, n) {
        if (Ve.createEvent) {
          var r = Ve.createEvent("Events");
          r.initEvent(t, !0, !0, n), avalon.mix(r, n), e.dispatchEvent(r)
        } else dt.contains(e) && (r = Ve.createEventObject(), avalon.mix(r, n), e.fireEvent("on" + t, r))
      }, avalon.each({"scrollLeft": "pageXOffset", "scrollTop": "pageYOffset"}, function (e, t) {
        avalon.fn[e] = function (n) {
          var r = this[0] || {}, a = V(r), i = "scrollTop" === e;
          return arguments.length ? void (a ? a.scrollTo(i ? avalon(a).scrollLeft() : n, i ? n : avalon(a).scrollTop()) : r[e] = n) : a ? t in a ? a[t] : dt[e] : r[e]
        }
      });
      var kn = avalon.cssHooks = {}, En = ["", "-webkit-", "-o-", "-moz-", "-ms-"],
        Tn = {"float": ft ? "cssFloat" : "styleFloat"};
      if (avalon.cssNumber = u("animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom"), avalon.cssName = function (e, t, n) {
        if (Tn[e]) return Tn[e];
        t = t || dt.style;
        for (var r = 0, a = En.length; r < a; r++) if (n = X(En[r] + e), n in t) return Tn[e] = n;
        return null
      }, kn["@:set"] = function (e, t, n) {
        try {
          e.style[t] = n
        } catch (r) {
        }
      }, n.getComputedStyle) kn["@:get"] = function (e, t) {
        if (!e || !e.style) throw new Error("getComputedStyle要求传入一个节点 " + e);
        var n, r = getComputedStyle(e, null);
        return r && (n = "filter" === t ? r.getPropertyValue(t) : r[t], "" === n && (n = e.style[t])), n
      }, kn["opacity:get"] = function (e) {
        var t = kn["@:get"](e, "opacity");
        return "" === t ? "1" : t
      }; else {
        var Sn = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, $n = /^(top|right|bottom|left)$/, An = /alpha\([^)]*\)/i,
          Mn = !!n.XDomainRequest, Nn = "DXImageTransform.Microsoft.Alpha",
          On = {"thin": Mn ? "1px" : "2px", "medium": Mn ? "3px" : "4px", "thick": Mn ? "5px" : "6px"};
        kn["@:get"] = function (e, t) {
          var n = e.currentStyle, r = n[t];
          if (Sn.test(r) && !$n.test(r)) {
            var a = e.style, i = a.left, o = e.runtimeStyle.left;
            e.runtimeStyle.left = n.left, a.left = "fontSize" === t ? "1em" : r || 0, r = a.pixelLeft + "px", a.left = i, e.runtimeStyle.left = o
          }
          return "medium" === r && (t = t.replace("Width", "Style"), "none" === n[t] && (r = "0px")), "" === r ? "auto" : On[r] || r
        }, kn["opacity:set"] = function (e, t, n) {
          var r = e.style, a = isFinite(n) && n <= 1 ? "alpha(opacity=" + 100 * n + ")" : "", i = r.filter || "";
          r.zoom = 1, r.filter = (An.test(i) ? i.replace(An, a) : i + " " + a).trim(), r.filter || r.removeAttribute("filter")
        }, kn["opacity:get"] = function (e) {
          var t = e.filters.alpha || e.filters[Nn], n = t && t.enabled ? t.opacity : 100;
          return n / 100 + ""
        }
      }
      "top,left".replace(nt, function (e) {
        kn[e + ":get"] = function (t) {
          var n = kn["@:get"](t, e);
          return /px$/.test(n) ? n : avalon(t).position()[e] + "px"
        }
      });
      var Pn = {"position": "absolute", "visibility": "hidden", "display": "block"}, Dn = /^(none|table(?!-c[ea]).+)/;
      "Width,Height".replace(nt, function (e) {
        var t = e.toLowerCase(), n = "client" + e, r = "scroll" + e, a = "offset" + e;
        kn[t + ":get"] = function (t, n, r) {
          var i = -4;
          "number" == typeof r && (i = r), n = "Width" === e ? ["Left", "Right"] : ["Top", "Bottom"];
          var o = t[a];
          return 2 === i ? o + avalon.css(t, "margin" + n[0], !0) + avalon.css(t, "margin" + n[1], !0) : (i < 0 && (o = o - avalon.css(t, "border" + n[0] + "Width", !0) - avalon.css(t, "border" + n[1] + "Width", !0)), i === -4 && (o = o - avalon.css(t, "padding" + n[0], !0) - avalon.css(t, "padding" + n[1], !0)), o)
        }, kn[t + "&get"] = function (e) {
          var n = [];
          Q(e, n);
          for (var r, a = kn[t + ":get"](e), i = 0; r = n[i++];) {
            e = r.node;
            for (var o in r) "string" == typeof r[o] && (e.style[o] = r[o])
          }
          return a
        }, avalon.fn[t] = function (i) {
          var o = this[0];
          if (0 === arguments.length) {
            if (o.setTimeout) return o["inner" + e] || o.document.documentElement[n] || o.document.body[n];
            if (9 === o.nodeType) {
              var s = o.documentElement;
              return Math.max(o.body[r], s[r], o.body[a], s[a], s[n])
            }
            return kn[t + "&get"](o)
          }
          return this.css(t, i)
        }, avalon.fn["inner" + e] = function () {
          return kn[t + ":get"](this[0], void 0, -2)
        }, avalon.fn["outer" + e] = function (e) {
          return kn[t + ":get"](this[0], void 0, e === !0 ? 2 : 0)
        }
      }), avalon.fn.offset = function () {
        var e = this[0], t = {"left": 0, "top": 0};
        if (!e || !e.tagName || !e.ownerDocument) return t;
        var n = e.ownerDocument, r = n.body, a = n.documentElement, i = n.defaultView || n.parentWindow;
        if (!avalon.contains(a, e)) return t;
        e.getBoundingClientRect && (t = e.getBoundingClientRect());
        var o = a.clientTop || r.clientTop, s = a.clientLeft || r.clientLeft,
          c = Math.max(i.pageYOffset || 0, a.scrollTop, r.scrollTop),
          l = Math.max(i.pageXOffset || 0, a.scrollLeft, r.scrollLeft);
        return {"top": t.top + c - o, "left": t.left + l - s}
      };
      var jn = /^<option(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s+value[\s=]/i, Bn = {
          "option:get": gt ? function (e) {
            return jn.test(e.outerHTML) ? e.value : e.text.trim()
          } : function (e) {
            return e.value
          }, "select:get": function (e, t) {
            for (var n, r = e.options, a = e.selectedIndex, i = Bn["option:get"], o = "select-one" === e.type || a < 0, s = o ? null : [], c = o ? a + 1 : r.length, l = a < 0 ? c : o ? a : 0; l < c; l++) if (n = r[l], (n.selected || l === a) && !n.disabled) {
              if (t = i(n), o) return t;
              s.push(t)
            }
            return s
          }, "select:set": function (e, t, n) {
            t = [].concat(t);
            for (var r, a = Bn["option:get"], i = 0; r = e.options[i++];) (r.selected = t.indexOf(a(r)) > -1) && (n = !0);
            n || (e.selectedIndex = -1)
          }
        }, In = {},
        Rn = ["break,case,catch,continue,debugger,default,delete,do,else,false", "finally,for,function,if,in,instanceof,new,null,return,switch,this", "throw,true,try,typeof,var,void,while,with", "abstract,boolean,byte,char,class,const,double,enum,export,extends", "final,float,goto,implements,import,int,interface,long,native", "package,private,protected,public,short,static,super,synchronized", "throws,transient,volatile", "arguments,let,yield,undefined"].join(",");
      Rn.replace(/\w+/g, function (e) {
        In[e] = !0
      });
      var Ln = /[a-z_$]/i, qn = /[\s\uFEFF\xA0]/, Hn = /(\$proxy\$[a-z]+)\d+$/, Fn = new Pt(218), Un = new Pt(128);
      avalon.normalizeExpr = ne, avalon.parseExprProxy = te;
      var zn = /\)\s*$/, Xn = /\)\s*\|/g, Gn = /\|\s*([$\w]+)/g, Wn = /"\s*\["/g, Vn = /"\s*\(/g,
        Qn = {"92": "\\\\", "34": '\\"', "8": "\\b", "12": "\\f", "10": "\\n", "13": "\\r", "9": "\\t"}, Kn = "000000",
        Jn = function (e, t) {
          return (Kn + (t || 0)).slice(-e)
        }, Yn = "\\u00", Zn = function (e) {
          var t = e.charCodeAt(0), n = Qn[t];
          return n ? n : Yn + Jn(2, t.toString(16))
        }, er = /[\x00-\x1f\x22\x5c]/g, tr = "undefined" != typeof JSON ? JSON.stringify : ae;
      avalon.scan = function (e, t) {
        e = e || dt;
        var n = t ? [].concat(t) : [];
        he(e, n)
      };
      var nr = u("area,base,basefont,br,col,command,embed,hr,img,input,link,meta,param,source,track,wbr,noscript,script,style,textarea".toUpperCase()),
        rr = gt && n.MutationObserver ? function (e) {
          for (var t, n = e.firstChild; n;) {
            var r = n.nextSibling;
            3 === n.nodeType ? t ? (t.nodeValue += n.nodeValue, e.removeChild(n)) : t = n : t = null, n = r
          }
        } : 0, ar = /^\s*::/, ir = /ms-(\w+)-?(.*)/,
        or = u("animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit"),
        sr = u("value,title,alt,checked,selected,disabled,readonly,enabled,href,src"),
        cr = /^(ms-\S+|data-\S+|on[a-z]+|id|style|class)$/, lr = /^if|widget|repeat$/, ur = /^each|with|html|include$/;
      if (!ft) var fr = new Pt(512), dr = /\s+([^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g, pr = /^['"]/,
        hr = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/i, vr = /&amp;/g, mr = function (e) {
          var t = e.outerHTML;
          if ("</" === t.slice(0, 2) || !t.trim()) return [];
          var n = t.match(hr)[0];
          ">" === n.slice(-1) && (n = n.slice(0, -1));
          var r, a, i = [], o = fr.get(n);
          if (o) return o;
          for (; r = dr.exec(n);) {
            a = r[2], a && (a = (pr.test(a) ? a.slice(1, -1) : a).replace(vr, "&"));
            var s = r[1].toLowerCase(), c = {"name": s, "specified": !0, "value": a || ""};
            i.push(c)
          }
          return fr.put(n, i)
        };
      var gr = /\|\s*html(?:\b|$)/, yr = /\|\|/g, br = /(['"])(\\\1|.)+?\1/g, _r = /\r?\n/g, wr = function () {
        this.queue = []
      };
      wr.prototype = {
        "render": function (e) {
          if (!this.locked) {
            this.locked = e ? dt.offsetHeight + 10 : 1;
            var t = this;
            avalon.nextTick(function () {
              t.flush()
            })
          }
        }, "flush": function () {
          for (var e, t = 0; e = this.queue[t++];) e.update && e.update();
          this.locked = 0, this.queue = []
        }
      };
      var xr = new wr, Cr = [], kr = [], Er = {
        "$construct": function () {
          return avalon.mix.apply(null, arguments)
        },
        "$ready": c,
        "$init": c,
        "$dispose": c,
        "$container": null,
        "$childReady": c,
        "$replace": !1,
        "$extend": null,
        "$$template": function (e) {
          return e
        }
      };
      avalon.components = {}, avalon.component = function (e, t) {
        t && (avalon.components[e] = avalon.mix({}, Er, t));
        for (var r, a = 0; r = Cr[a]; a++) e === r.fullName && (Cr.splice(a, 1), a--, function (t, r, a, i) {
          if (!avalon.contains(Ve, a) || a.msResolved) return void avalon.Array.remove(Cr, t);
          var o = 1, s = t.library, c = avalon.libraries[s] || Er;
          if (!a.getAttribute("ms-attr-identifier")) {
            var l = ue(a, t.vmodels), u = ye(t.vmodels, l.config || t.fullName), f = l.$id || l.identifier || yt(i);
            delete l.config, delete l.$id, delete l.identifier;
            var d = {}, p = avalon.components[r.$extend];
            p ? (avalon.mix(!0, d, p), d = p.$construct.call(a, d, {}, {})) : avalon.mix(!0, d, r), d = avalon.components[e].$construct.call(a, d, u, l), d.$refs = {}, d.$id = f;
            var h = d.$slot, v = d.$replace, m = d.$container, g = d.$template;
            delete d.$slot, delete d.$replace, delete d.$container, delete d.$construct;
            var y = avalon.define(d) || {};
            a.msResolved = 1, y.$init(y, a), c.$init(y, a);
            for (var b, _, w = a.childNodes, x = {}, C = 0; _ = w[C++];) {
              var k = 1 === _.nodeType && _.getAttribute("slot") || h;
              k && (x[k] ? x[k].push(_) : x[k] = [_])
            }
            y.$$template && (avalon.clearHTML(a), a.innerHTML = y.$$template(g));
            for (C in x) if (y.hasOwnProperty(C)) {
              var E = x[C];
              if (E.length) {
                for (var T = pt.cloneNode(!0), S = 0; b = E[S++];) T.appendChild(b);
                y[C] = T
              }
              x[C] = null
            }
            x = null;
            var $ = a.children[0] || a.firstChild;
            if (v) {
              a.parentNode.replaceChild($, a), $.msResolved = 1;
              var A = (a.style.cssText, a.className);
              a = t.element = $, A && avalon(a).addClass(A)
            }
            m && m.appendChild(a), avalon.fireDom(a, "datasetchanged", {"library": s, "vm": y, "childReady": 1});
            var M = 0, N = avalon.bind(a, "datasetchanged", function (e) {
              if (e.childReady && e.library === s && (o += e.childReady, y !== e.vm && (y.$refs[e.vm.$id] = e.vm, e.childReady === -1 && (M++, y.$childReady(y, a, e)), e.stopPropagation())), 0 === o) {
                var r = setTimeout(function () {
                  clearTimeout(r), y.$ready(y, a, t.vmodels), c.$ready(y, a, t.vmodels)
                }, M ? Math.max(17 * M, 100) : 17);
                avalon.unbind(a, "datasetchanged", N), t.rollback = function () {
                  try {
                    y.$dispose(y, a), c.$dispose(y, a)
                  } catch (e) {
                  }
                  delete avalon.vmodels[y.$id]
                }, R(t, kr), n.chrome && a.addEventListener("DOMNodeRemovedFromDocument", function () {
                  setTimeout(L)
                })
              }
            });
            if (he(a, [y].concat(t.vmodels)), avalon.vmodels[y.$id] = y, a.childNodes.length) var O = setTimeout(function () {
              clearTimeout(O), avalon.fireDom(a, "datasetchanged", {"library": s, "vm": y, "childReady": -1})
            }, 17); else avalon.fireDom(a, "datasetchanged", {"library": s, "vm": y, "childReady": -1})
          }
        }(r, avalon.components[e], r.element, r.widget))
      }, avalon.libraries = [], avalon.library = function (e, t) {
        Ve.namespaces && Ve.namespaces.add(e, "http://www.w3.org/1999/xhtml"), avalon.libraries[e] = avalon.mix({
          "$init": c,
          "$ready": c,
          "$dispose": c
        }, t || {})
      }, avalon.library("ms");
      var Tr = ["autofocus,autoplay,async,allowTransparency,checked,controls", "declare,disabled,defer,defaultChecked,defaultSelected", "contentEditable,isMap,loop,multiple,noHref,noResize,noShade", "open,readOnly,selected"].join(","),
        Sr = {};
      Tr.replace(nt, function (e) {
        Sr[e.toLowerCase()] = e
      });
      var $r = {
          "accept-charset": "acceptCharset",
          "char": "ch",
          "charoff": "chOff",
          "class": "className",
          "for": "htmlFor",
          "http-equiv": "httpEquiv"
        },
        Ar = ["accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan", "dateTime,defaultValue,frameBorder,longDesc,maxLength,marginWidth,marginHeight", "rowSpan,tabIndex,useMap,vSpace,valueType,vAlign"].join(",");
      Ar.replace(nt, function (e) {
        $r[e.toLowerCase()] = e
      });
      var Mr = avalon.directive("attr", {
        "init": function (e) {
          if (e.expr = ne(e.expr.trim()), "include" === e.type) {
            var t = e.element;
            Te(t, e), e.includeRendered = se(t, "data-include-rendered", e.vmodels), e.includeLoaded = se(t, "data-include-loaded", e.vmodels);
            var n = e.includeReplace = !!avalon(t).data("includeReplace");
            avalon(t).data("includeCache") && (e.templateCache = {}), e.start = Ve.createComment("ms-include"), e.end = Ve.createComment("ms-include-end"), n ? (e.element = e.end, e._element = t, t.parentNode.insertBefore(e.start, t), t.parentNode.insertBefore(e.end, t.nextSibling)) : (t.insertBefore(e.start, t.firstChild), t.appendChild(e.end))
          }
        }, "update": function (e) {
          var t = this.element, r = this.param;
          if ("href" === r || "src" === r) {
            if ("string" != typeof e || dt.hasAttribute || (e = e.replace(/&amp;/g, "&")), t[r] = e, n.chrome && "EMBED" === t.tagName) {
              var a = t.parentNode, i = document.createComment("ms-src");
              a.replaceChild(i, t), a.replaceChild(t, i)
            }
          } else {
            var o = e === !1 || null === e || void 0 === e;
            !ft && $r[r] && (r = $r[r]);
            var s = Sr[r];
            if ("boolean" == typeof t[s] && (t[s] = !!e, e || (o = !0)), o) return t.removeAttribute(r);
            var c = !at.test(t) && (!(!Ve.namespaces || !F(t)) || r in t.cloneNode(!1));
            c ? t[r] = e + "" : t.setAttribute(r, e)
          }
        }
      });
      "title,alt,src,value,css,include,href".replace(nt, function (e) {
        Ot[e] = Mr
      }), avalon.directive("class", {
        "init": function (e) {
          var t = e.param, n = e.type;
          if (!t || isFinite(t) ? (e.param = "", Ot.effect.init(e)) : (s("ms-" + n + '-xxx="yyy"这种用法已经过时,请使用ms-' + n + '="xxx:yyy"'), e.expr = "[" + tr(t) + "," + e.expr + "]", e.oldStyle = t), "hover" === n || "active" === n) {
            if (!e.hasBindEvent) {
              var r = e.element, a = avalon(r), i = "mouseenter", o = "mouseleave";
              if ("active" === n) {
                r.tabIndex = r.tabIndex || -1, i = "mousedown", o = "mouseup";
                var c = a.bind("mouseleave", function () {
                  e.toggleClass && a.removeClass(e.newClass)
                })
              }
            }
            var l = a.bind(i, function () {
              e.toggleClass && a.addClass(e.newClass)
            }), u = a.bind(o, function () {
              e.toggleClass && a.removeClass(e.newClass)
            });
            e.rollback = function () {
              a.unbind("mouseleave", c), a.unbind(i, l), a.unbind(o, u)
            }, e.hasBindEvent = !0
          }
        }, "update": function (e) {
          var t = this, n = avalon(this.element);
          t.newClass = e[0], t.toggleClass = !!e[1], t.oldClass && t.newClass !== t.oldClass && n.removeClass(t.oldClass), t.oldClass = t.newClass, "class" === t.type && (t.oldStyle ? n.toggleClass(t.oldStyle, !!e[1]) : n.toggleClass(t.newClass, t.toggleClass))
        }
      }), "hover,active".replace(nt, function (e) {
        Ot[e] = Ot["class"]
      }), avalon.directive("css", {
        "init": Ot.attr.init, "update": function (e) {
          avalon(this.element).css(this.param, e)
        }
      }), avalon.directive("data", {
        "priority": 100, "update": function (e) {
          var t = this.element, n = "data-" + this.param;
          e && "object" == typeof e ? t[n] = e : t.setAttribute(n, String(e))
        }
      });
      var Nr = /^(?:checkbox|radio)$/, Or = /^(?:radio|checked)$/,
        Pr = /^(file|button|reset|submit|checkbox|radio|range)$/;
      avalon.directive("duplex", {
        "priority": 2e3, "init": function (e, t) {
          function n(t) {
            e.changed.call(this, t, e)
          }

          function r() {
            p = !0
          }

          function a() {
            p = !1
          }

          var i = e.element, o = e.vmodels;
          e.changed = se(i, "data-duplex-changed", o) || c;
          var l = [], f = u("string,number,boolean,checked");
          "radio" === i.type && "" === e.param && (e.param = "checked"), e.param.replace(rt, function (n) {
            Nr.test(i.type) && Or.test(n) && ("radio" === n && s("ms-duplex-radio已经更名为ms-duplex-checked"), n = "checked", e.isChecked = !0, e.xtype = "radio"), "bool" === n ? (n = "boolean", s("ms-duplex-bool已经更名为ms-duplex-boolean")) : "text" === n && (n = "string", s("ms-duplex-text已经更名为ms-duplex-string")), f[n] && (t = !0), avalon.Array.ensure(l, n)
          }), t || l.push("string"), e.param = l.join("-"), e.xtype || (e.xtype = "SELECT" === i.tagName ? "select" : "checkbox" === i.type ? "checkbox" : "radio" === i.type ? "radio" : /^change/.test(i.getAttribute("data-duplex-event")) ? "change" : "input");
          var d = e.bound = function (t, n) {
            i.addEventListener ? i.addEventListener(t, n, !1) : i.attachEvent("on" + t, n);
            var r = e.rollback;
            e.rollback = function () {
              i.avalonSetter = null, avalon.unbind(i, t, n), r && r()
            }
          }, p = !1, h = function (t) {
            var r = i.value;
            if (!p && r !== e.oldValue && null !== e.pipe) {
              var a = e.pipe(r, e, "get");
              try {
                e.oldValue = r, e.setter(a), n.call(i, a)
              } catch (o) {
                s(o)
              }
            }
          };
          switch (e.xtype) {
            case"radio":
              e.bound("click", function () {
                var t = e.pipe(i.value, e, "get");
                try {
                  e.setter(t), n.call(i, t)
                } catch (r) {
                  s(r)
                }
              });
              break;
            case"checkbox":
              d(ft ? "change" : "click", function () {
                var t = i.checked ? "ensure" : "remove", r = e.getter.apply(0, e.vmodels);
                Array.isArray(r) || (s("ms-duplex应用于checkbox上要对应一个数组"), r = [r]);
                var a = e.pipe(i.value, e, "get");
                avalon.Array[t](r, a), n.call(i, r)
              });
              break;
            case"change":
              d("change", h);
              break;
            case"input":
              gt ? (gt > 8 ? (9 === gt && d("keyup", h), d("input", h)) : d("propertychange", function (e) {
                "value" === e.propertyName && h()
              }), d("dragend", function () {
                setTimeout(function () {
                  h()
                }, 17)
              })) : (d("input", h), d("compositionstart", r), d("compositionend", a), d("DOMAutoComplete", h));
              break;
            case"select":
              d("change", function () {
                var t = avalon(i).val();
                if (t = Array.isArray(t) ? t.map(function (t) {
                  return e.pipe(t, e, "get")
                }) : e.pipe(t, e, "get"), t + "" !== e.oldValue) try {
                  e.setter(t)
                } catch (n) {
                  s(n)
                }
              }), d("datasetchanged", function (t) {
                if ("selectDuplex" === t.bubble) {
                  var r = e._value, a = Array.isArray(r) ? r.map(String) : r + "";
                  avalon(i).val(a), i.oldValue = a + "", n.call(i, a)
                }
              })
          }
          "input" !== e.xtype || Pr.test(i.type) || ("hidden" !== i.type && (d("focus", function () {
            i.msFocus = !0
          }), d("blur", function () {
            i.msFocus = !1
          })), i.avalonSetter = h, Br(function () {
            if (avalon.contains(dt, i)) this.msFocus || h(); else if (!i.msRetain) return !1
          }))
        }, "update": function (e) {
          var t, n = this.element, r = this;
          if (!this.init) {
            for (var a in avalon.vmodels) {
              var i = avalon.vmodels[a];
              i.$fire("avalon-ms-duplex-init", r)
            }
            var o = r.pipe || (r.pipe = we);
            o(null, r, "init"), this.init = 1
          }
          switch (this.xtype) {
            case"input":
            case"change":
              if (t = this.pipe(e, this, "set"), t !== this.oldValue) {
                var s = !1;
                if (n.msFocus) try {
                  var c = Ce(n);
                  c.start === c.end && (c = c.start, s = !0)
                } catch (l) {
                }
                n.value = r.oldValue = t, s && ke(n, c, c)
              }
              break;
            case"radio":
              t = r.isChecked ? !!e : e + "" === n.value, 6 === gt ? setTimeout(function () {
                n.defaultChecked = t, n.checked = t
              }, 31) : n.checked = t;
              break;
            case"checkbox":
              var u = [].concat(e);
              t = this.pipe(n.value, this, "get"), n.checked = u.indexOf(t) > -1;
              break;
            case"select":
              r._value = e, n.msHasEvent ? avalon.fireDom(n, "datasetchanged", {"bubble": n.msHasEvent}) : n.msHasEvent = "selectDuplex"
          }
        }
      });
      gt && avalon.bind(Ve, "selectionchange", function (e) {
        var t = Ve.activeElement || {};
        !t.msFocus && t.avalonSetter && t.avalonSetter()
      }), avalon.duplexHooks = {
        "checked": {
          "get": function (e, t) {
            return !t.oldValue
          }
        }, "string": {
          "get": function (e) {
            return e
          }, "set": _e
        }, "boolean": {
          "get": function (e) {
            return "true" === e
          }, "set": _e
        }, "number": {
          "get": function (e, t) {
            var n = parseFloat(e + "");
            if (-e === -n) return n;
            var r = /strong|medium|weak/.exec(t.element.getAttribute("data-duplex-number")) || ["medium"];
            switch (r[0]) {
              case"strong":
                return 0;
              case"medium":
                return "" === e ? "" : 0;
              case"weak":
                return e
            }
          }, "set": _e
        }
      };
      var Dr, jr = [];
      avalon.tick = function (e) {
        1 === jr.push(e) && (Dr = setInterval(xe, 60))
      };
      var Br = c;
      new function () {
        function e(e) {
          t[this.tagName].call(this, e), !this.msFocus && this.avalonSetter && this.avalonSetter()
        }

        try {
          var t = {}, n = HTMLInputElement.prototype, r = HTMLTextAreaElement.prototype, a = HTMLInputElement.prototype;
          Object.getOwnPropertyNames(a), t["INPUT"] = Object.getOwnPropertyDescriptor(n, "value").set, Object.defineProperty(n, "value", {"set": e}), t["TEXTAREA"] = Object.getOwnPropertyDescriptor(r, "value").set, Object.defineProperty(r, "value", {"set": e})
        } catch (i) {
          Br = avalon.tick
        }
      }, avalon.directive("effect", {
        "priority": 5, "init": function (e) {
          var t, n, r = e.expr, a = r.replace(Ut, function (e) {
            return e.replace(/./g, "0")
          }).indexOf(":");
          a === -1 ? (t = r, n = !0) : (t = r.slice(0, a), n = r.slice(a + 1)), t = Ft.test(r) ? ne(t) : tr(t), e.expr = "[" + t + "," + n + "]"
        }, "update": function (e) {
          var t = e[0], r = this.element;
          if (r.getAttribute("data-effect-name") !== t) {
            r.removeAttribute("data-effect-driver");
            var a = r.style, i = n.getComputedStyle ? n.getComputedStyle(r) : null, o = !1;
            if (i && (Lr || qr)) {
              var s = a[Hr] || i[Hr];
              s && "0s" !== s && (r.setAttribute("data-effect-driver", "t"), o = !0), o || (s = a[Fr] || i[Fr], s && "0s" !== s && (r.setAttribute("data-effect-driver", "a"), o = !0))
            }
            o || avalon.effects[t] && (r.setAttribute("data-effect-driver", "j"), o = !0), o && r.setAttribute("data-effect-name", t)
          }
        }
      }), avalon.effects = {}, avalon.effect = function (e, t) {
        avalon.effects[e] = t
      };
      var Ir, Rr, Lr = !1, qr = !1, Hr = avalon.cssName("transition-duration"),
        Fr = avalon.cssName("animation-duration");
      new function () {
        var e, t = {
          "TransitionEvent": "transitionend",
          "WebKitTransitionEvent": "webkitTransitionEnd",
          "OTransitionEvent": "oTransitionEnd",
          "otransitionEvent": "otransitionEnd"
        };
        for (var r in t) {
          if (n[r]) {
            e = t[r];
            break
          }
          try {
            document.createEvent(r);
            e = t[r];
            break
          } catch (a) {
          }
        }
        "string" == typeof e && (Lr = !0, Ir = e), t = {
          "AnimationEvent": "animationend",
          "WebKitAnimationEvent": "webkitAnimationEnd"
        };
        var i;
        for (r in t) if (n[r]) {
          i = t[r];
          break
        }
        "string" == typeof i && (Lr = !0, Rr = i)
      };
      var Ur = [], zr = new wr;
      $e.prototype = {
        "contrustor": $e, "enterClass": function () {
          return Ae(this, "enter")
        }, "leaveClass": function () {
          return Ae(this, "leave")
        }, "actionFun": function (e, t, n) {
          if (!document.hidden) {
            var r = this, a = r.el, i = "leave" === e;
            e = i ? "leave" : "enter";
            var o = i ? "enter" : "leave";
            Me(r, "abort" + Se(o)), Me(r, "before" + Se(e)), i || t(a);
            var s = function (o) {
              "undefined" != typeof r.cssEvent && a.removeEventListener(r.cssEvent, r.cssCallback), i ? (t(a), avalon(a).removeClass(r.cssClass)) : "a" === r.driver && avalon(a).removeClass(r.cssClass), o !== !0 && (Me(r, "after" + Se(e)), n && n(a)), r.dispose()
            };
            r.useCss ? (r.cssCallback && r.cssCallback(!0), r.cssClass = Ae(r, e), r.cssCallback = s, r.update = function () {
              a.addEventListener(r.cssEvent, r.cssCallback), i || "t" !== r.driver || avalon(a).removeClass(r.cssClass)
            }, avalon(a).addClass(r.cssClass), zr.render(!0), zr.queue.push(r)) : Me(r, e, s)
          }
        }, "enter": function (e, t) {
          this.actionFun.apply(this, ["enter"].concat(avalon.slice(arguments)))
        }, "leave": function (e, t) {
          this.actionFun.apply(this, ["leave"].concat(avalon.slice(arguments)))
        }, "dispose": function () {
          this.update = this.cssCallback = null, Ur.unshift(this) > 100 && Ur.pop()
        }
      };
      var Xr = function (e, t) {
        var n = ut.call(arguments, 0);
        "function" != typeof n[2] && n.splice(2, 0, c), "function" != typeof n[3] && n.splice(3, 0, c);
        var r = n[2], a = n[3], i = n[4], o = Ee(e, i);
        if (!o) return r(), a(), !1;
        var s = t ? "enter" : "leave";
        o[s](r, a)
      };
      avalon.mix(avalon.effect, {
        "apply": Xr, "append": function (e, t, n, r) {
          return Xr(e, 1, function () {
            t.appendChild(e)
          }, n, r)
        }, "before": function (e, t, n, r) {
          return Xr(e, 1, function () {
            t.parentNode.insertBefore(e, t)
          }, n, r)
        }, "remove": function (e, t, n, r) {
          return Xr(e, 0, function () {
            e.parentNode === t && t.removeChild(e)
          }, n, r)
        }
      }), avalon.directive("html", {
        "update": function (e) {
          var t = this, n = this.element, r = 1 !== n.nodeType, a = r ? n.parentNode : n;
          if (a) {
            if (e = null == e ? "" : e, 3 === n.nodeType) {
              var i = yt("html");
              a.insertBefore(Ve.createComment(i), n), t.element = Ve.createComment(i + ":end"), a.replaceChild(t.element, n), n = t.element
            }
            if ("object" != typeof e) var o = avalon.parseHTML(String(e)); else if (11 === e.nodeType) o = e; else if (1 === e.nodeType || e.item) {
              var s = 1 === e.nodeType ? e.childNodes : e.item;
              for (o = pt.cloneNode(!0); s[0];) o.appendChild(s[0])
            }
            if (s = avalon.slice(o.childNodes), r) {
              for (var c = n.nodeValue.slice(0, -4); ;) {
                var l = n.previousSibling;
                if (!l || 8 === l.nodeType && l.nodeValue === c) break;
                a.removeChild(l)
              }
              a.insertBefore(o, n)
            } else avalon.clearHTML(n).appendChild(o);
            pe(s, t.vmodels)
          }
        }
      }), avalon.directive("if", {
        "priority": 10, "update": function (e) {
          function t() {
            a.getAttribute(r.name) && (a.removeAttribute(r.name), fe(a, r.vmodels)), r.rollback = null
          }

          var n, r = this, a = this.element, i = r.stamp = +new Date, o = function () {
            i === r.stamp && (r.recoverNode = null)
          };
          r.recoverNode && r.recoverNode();
          try {
            if (!a.parentNode) return;
            n = a.parentNode
          } catch (l) {
            return
          }
          if (e) {
            if (8 === a.nodeType) {
              var u = r.keep, f = avalon.effect.apply(u, 1, function () {
                i === r.stamp && (a.parentNode.replaceChild(u, a), a = r.element = u, u.getAttribute("_required") && (a.required = !0, a.removeAttribute("_required")), a.querySelectorAll && avalon.each(a.querySelectorAll("[_required=true]"), function (e) {
                  e.required = !0, e.removeAttribute("_required")
                }), t())
              }, o);
              f = f === !1
            }
            f || t()
          } else if (1 === a.nodeType) {
            a.required === !0 && (a.required = !1, a.setAttribute("_required", "true"));
            try {
              avalon.each(a.querySelectorAll(":required"), function (e) {
                a.required = !1, e.setAttribute("_required", "true")
              })
            } catch (l) {
            }
            var d = r.element = Ve.createComment("ms-if"), p = a.nextSibling;
            r.recoverNode = function () {
              r.recoverNode = null, d.parentNode !== n && (n.insertBefore(d, p), r.keep = a)
            }, avalon.effect.apply(a, 0, function () {
              if (r.recoverNode = null, i === r.stamp) {
                a.parentNode.replaceChild(d, a);
                try {
                  r.getter() ? s("directive:ms-if: never been here.") : (r.keep = a, r.rollback = c)
                } catch (e) {
                  r.keep = a, Ke.appendChild(a), r.rollback = function () {
                    a.parentNode === Ke && Ke.removeChild(a)
                  }
                }
              }
            }, o)
          }
        }
      });
      var Gr = /<noscript.*?>(?:[\s\S]+?)<\/noscript>/gim, Wr = /<noscript.*?>([\s\S]+?)<\/noscript>/im,
        Vr = function () {
          return new (n.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP")
        }, Qr = avalon.templateCache = {};
      avalon.directive("include", {
        "init": Ot.attr.init, "update": function (e) {
          var t = this, n = this.element, r = t.vmodels, a = t.includeRendered, i = t.effectName && t.effectClass,
            o = t.templateCache, c = t.includeReplace, l = t.includeLoaded, u = c ? n.parentNode : n, f = t._element;
          t.recoverNodes = t.recoverNodes || avalon.noop;
          var d = function (s) {
            var d = t._stamp = +new Date;
            if (l) {
              var p = l.apply(u, [s].concat(r));
              "string" == typeof p && (s = p)
            }
            a && ie(u, function () {
              a.call(u)
            }, NaN);
            var h = t.includeLastID || "_default";
            t.includeLastID = e;
            var v = o && o[h] || Ve.createElement(n.tagName || t._element.tagName);
            i && (v.className = i, u.insertBefore(v, t.start)), (o || {})[h] = v;
            var m = t.recoverNodes();
            for (m && u.insertBefore(m, t.end); ;) {
              var g = t.start.nextSibling;
              if (!g || g === v || g === t.end) break;
              v.appendChild(g)
            }
            avalon.effect.remove(v, u, function () {
              o && d === t._stamp && Ke.appendChild(v)
            }, t);
            var y = u, b = avalon.noop, _ = avalon.noop, w = Ne(t, e, s), x = avalon.slice(w.childNodes);
            c && i ? (y = f, y.innerHTML = "", y.setAttribute("ms-skip", "true"), u.insertBefore(y, t.end.nextSibling), b = function () {
              y.insertBefore(w, null)
            }, _ = function () {
              t.recoverNodes = avalon.noop, d === t._stamp && (w = Oe(x), u.insertBefore(w, t.end), pe(x, r)), y.parentNode === u && u.removeChild(y)
            }, t.recoverNodes = function () {
              return t.recoverNodes = avalon.noop, Oe(x)
            }) : b = function () {
              u.insertBefore(w, t.end), pe(x, r)
            }, avalon.effect.apply(y, "enter", b, _)
          };
          if ("src" === t.param) if ("string" == typeof Qr[e]) avalon.nextTick(function () {
            d(Qr[e])
          }); else if (Array.isArray(Qr[e])) Qr[e].push(d); else {
            var p = Vr();
            p.onreadystatechange = function () {
              if (4 === p.readyState) {
                var t = p.status;
                if (t >= 200 && t < 300 || 304 === t || 1223 === t) {
                  for (var n, r = p.responseText, a = 0; n = Qr[e][a++];) n(r);
                  Qr[e] = r
                } else s("ms-include load [" + e + "] error")
              }
            }, Qr[e] = [d], p.open("GET", e, !0), "withCredentials" in p && (p.withCredentials = !0), p.setRequestHeader("X-Requested-With", "XMLHttpRequest"), p.send(null)
          } else {
            var h = e && 1 === e.nodeType ? e : Ve.getElementById(e);
            if (h) {
              if ("NOSCRIPT" === h.tagName && !h.innerHTML && !h.fixIE78) {
                p = Vr(), p.open("GET", location, !1), p.send(null);
                for (var v = Ve.getElementsByTagName("noscript"), m = (p.responseText || "").match(Gr) || [], g = m.length, y = 0; y < g; y++) {
                  var b = v[y];
                  b && (b.style.display = "none", b.fixIE78 = (m[y].match(Wr) || ["", "&nbsp;"])[1])
                }
              }
              avalon.nextTick(function () {
                d(h.fixIE78 || h.value || h.innerText || h.innerHTML)
              })
            }
          }
        }
      });
      var Kr = /\(([^)]*)\)/, Jr = avalon.directive("on", {
        "priority": 3e3, "init": function (e) {
          var t = e.expr;
          e.type = "on";
          var n = e.param.replace(/-\d+$/, "");
          if ("function" == typeof Jr[n + "Hook"] && Jr[n + "Hook"](e), t.indexOf("(") > 0 && t.indexOf(")") > -1) {
            var r = (t.match(Kr) || ["", ""])[1].trim();
            "" !== r && "$event" !== r || (t = t.replace(Kr, ""))
          }
          e.expr = t
        }, "update": function (e) {
          var t = this, n = this.element;
          e = function (e) {
            var n = t.getter || c;
            return n.apply(this, t.args.concat(e))
          };
          var r = t.param.replace(/-\d+$/, "");
          if ("scan" === r) e.call(n, {"type": r}); else if ("function" == typeof t.specialBind) t.specialBind(n, e); else var a = avalon.bind(n, r, e);
          t.rollback = function () {
            "function" == typeof t.specialUnbind ? t.specialUnbind() : avalon.unbind(n, r, a)
          }
        }
      });
      avalon.directive("repeat", {
        "priority": 90, "init": function (e) {
          var t = e.type;
          e.cache = {}, e.enterCount = 0;
          var n = e.element;
          if (1 === n.nodeType) {
            n.removeAttribute(e.name), Te(n, e), e.param = e.param || "el", e.sortedCallback = se(n, "data-with-sorted", e.vmodels);
            var r = se(n, "data-" + t + "-rendered", e.vmodels), a = yt(t), i = Ve.createComment(a + ":start"),
              o = e.element = Ve.createComment(a + ":end");
            if (e.signature = a, e.start = i, e.template = pt.cloneNode(!1), "repeat" === t) {
              var s = n.parentNode;
              s.replaceChild(o, n), s.insertBefore(i, o), e.template.appendChild(n)
            } else {
              for (; n.firstChild;) e.template.appendChild(n.firstChild);
              n.appendChild(i), n.appendChild(o), s = n
            }
            if (e.element = o, r) var c = avalon.bind(s, "datasetchanged", function () {
              r.apply(s, s.args), avalon.unbind(s, "datasetchanged", c), s.msRendered = r
            })
          }
        }, "update": function (e, t) {
          var n = this, r = this.xtype;
          this.enterCount += 1;
          var a = !t;
          if (a) {
            n.$outer = {};
            var i = "$key", o = "$val";
            "array" === r && (i = "$first", o = "$last");
            for (var s, c = 0; s = n.vmodels[c++];) if (s.hasOwnProperty(i) && s.hasOwnProperty(o)) {
              n.$outer = s;
              break
            }
          }
          var l = this.track;
          if (n.sortedCallback) {
            var u = n.sortedCallback.call(_, l);
            u && Array.isArray(u) && (l = u)
          }
          var f = "move";
          n.$repeat = e;
          var d = [], p = a && pt.cloneNode(!1), h = [], v = this.param, m = avalon.mix({}, this.cache),
            y = this.element, b = l.length, _ = y.parentNode, w = 0;
          for (c = 0; c < b; c++) {
            var x = l[c];
            m[x] || w++
          }
          var C = 0;
          for (c in m) C++;
          var k = (!b || w === b) && C > 10;
          if (k) for (var E = y.previousSibling, T = n.start; E !== T;) _.removeChild(E), E = y.previousSibling;
          for (c = 0; c < b; c++) {
            x = l[c];
            var S = m[x];
            if (S) d.push({}), m[x] = !0; else {
              if (S = Ie(this), S.$up = null, "array" === r) {
                f = "add", S.$id = x;
                var $ = e[c];
                S[v] = $, Object($) === $ && ($.$ups = $.$ups || {}, $.$ups[v] = S)
              } else f = "append", S.$key = x, S.$val = e[x], S[v] = {"$key": S.$key, "$val": S.$val};
              this.cache[x] = S;
              var A = S.$anchor || (S.$anchor = y.cloneNode(!1));
              A.nodeValue = this.signature, Be(n, p, S, d, a && !n.effectDriver), Re(S, n, r)
            }
            1 === this.enterCount && (S.$active = !1, S.$oldIndex = S.$index, S.$active = !0, S.$index = c), "array" === r ? (S.$first = 0 === c, S.$last = c === b - 1) : S.$val = N(e[x]), h.push(S)
          }
          if (this.proxies = h, a && !n.effectDriver) _.insertBefore(p, y), d.forEach(function (e) {
            pe(e.nodes || [], e.vmodels), e.nodes = e.vmodels = null
          }); else {
            var M = n.staggerIndex = 0;
            for (x in m) m[x] !== !0 && (f = "del", !k && je(m[x].$anchor, n, !0), Ue(this.cache, x, v), m[x] = null);
            for (c = 0; c < b; c++) {
              S = h[c], x = "array" === r ? S.$id : S.$key;
              var O = h[c - 1], P = O ? O.$anchor : n.start;
              m[x] ? S.$index !== S.$oldIndex && !function (e, t) {
                M = De(n.effectEnterStagger, function () {
                  var r = je(e.$anchor), a = avalon.slice(r.childNodes);
                  _.insertBefore(r, t.nextSibling), Pe(a, 1, n)
                }, M)
              }(S, P) : !function (e, t) {
                var r = e.nodes, i = e.vmodels;
                r && (M = De(n.effectEnterStagger, function () {
                  _.insertBefore(e.content, t.nextSibling), pe(r, i), !a && Pe(r, 1, n)
                }, M)), e.nodes = e.vmodels = null
              }(d[c], P)
            }
          }
          if (!e.$track) for (x in this.cache) Ue(this.cache, x, v);
          !function (e) {
            _.args = e, _.msRendered && _.msRendered.apply(_, e)
          }(g.newWatch ? arguments : [f]);
          var D = setTimeout(function () {
            clearTimeout(D), avalon.fireDom(_, "datasetchanged", {"bubble": _.msHasEvent})
          });
          this.enterCount -= 1
        }
      }), "with,each".replace(nt, function (e) {
        Ot[e] = avalon.mix({}, Ot.repeat, {"priority": 1400})
      });
      var Yr = [], Zr = [];
      avalon.directive("text", {
        "update": function (e) {
          var t = this.element;
          if (e = null == e ? "" : e, 3 === t.nodeType) try {
            t.data = e
          } catch (n) {
          } else "textContent" in t ? t.textContent = e : t.innerText = e
        }
      }), avalon.parseDisplay = ze, avalon.directive("visible", {
        "init": function (e) {
          Te(e.element, e)
        }, "update": function (e) {
          var t, n = this, r = this.element, a = !this.effectName;
          return this.stamp ? (t = this.stamp = +new Date, void (e ? avalon.effect.apply(r, 1, function () {
            if (t === n.stamp) {
              var e = r.getAttribute("data-effect-driver") || "a";
              a && (r.style.display = n.display || ""), "a" !== e && "t" !== e || "none" === avalon(r).css("display") && (r.style.display = n.display || ze(r.nodeName))
            }
          }) : avalon.effect.apply(r, 0, function () {
            t === n.stamp && (r.style.display = "none")
          }))) : (t = this.stamp = +new Date, void (e ? (r.style.display = n.display || "", "none" === avalon(r).css("display") && (r.style.display = n.display = ze(r.nodeName))) : r.style.display = "none"))
        }
      });
      var ea = /<script[^>]*>([\S\s]*?)<\/script\s*>/gim, ta = /\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g,
        na = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/gi, ra = {
          "a": /\b(href)\=("javascript[^"]*"|'javascript[^']*')/gi,
          "img": /\b(src)\=("javascript[^"]*"|'javascript[^']*')/gi,
          "form": /\b(action)\=("javascript[^"]*"|'javascript[^']*')/gi
        }, aa = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, ia = /([^\#-~| |!])/g, oa = avalon.filters = {
          "uppercase": function (e) {
            return e.toUpperCase()
          }, "lowercase": function (e) {
            return e.toLowerCase()
          }, "truncate": function (e, t, n) {
            return t = t || 30, n = "string" == typeof n ? n : "...", e.length > t ? e.slice(0, t - n.length) + n : String(e)
          }, "$filter": function (e) {
            for (var t = 1, n = arguments.length; t < n; t++) {
              var r = arguments[t], a = avalon.filters[r[0]];
              if ("function" == typeof a) {
                var i = [e].concat(r.slice(1));
                e = a.apply(null, i)
              }
            }
            return e
          }, "camelize": X, "sanitize": function (e) {
            return e.replace(ea, "").replace(na, function (e, t) {
              var n = e.toLowerCase().match(/<(\w+)\s/);
              if (n) {
                var r = ra[n[1]];
                r && (e = e.replace(r, function (e, t, n) {
                  var r = n.charAt(0);
                  return t + "=" + r + "javascript:void(0)" + r
                }))
              }
              return e.replace(ta, " ").replace(/\s+/g, " ")
            })
          }, "escape": function (e) {
            return String(e).replace(/&/g, "&amp;").replace(aa, function (e) {
              var t = e.charCodeAt(0), n = e.charCodeAt(1);
              return "&#" + (1024 * (t - 55296) + (n - 56320) + 65536) + ";"
            }).replace(ia, function (e) {
              return "&#" + e.charCodeAt(0) + ";"
            }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
          }, "currency": function (e, t, n) {
            return (t || "￥") + Xe(e, isFinite(n) ? n : 2)
          }, "number": Xe
        };
      new function () {
        function e(e) {
          return parseInt(e, 10) || 0
        }

        function t(e, t, n) {
          var r = "";
          for (e < 0 && (r = "-", e = -e), e = "" + e; e.length < t;) e = "0" + e;
          return n && (e = e.substr(e.length - t)), r + e
        }

        function n(e, n, r, a) {
          return function (i) {
            var o = i["get" + e]();
            return (r > 0 || o > -r) && (o += r), 0 === o && r === -12 && (o = 12), t(o, n, a)
          }
        }

        function r(e, t) {
          return function (n, r) {
            var a = n["get" + e](), i = (t ? "SHORT" + e : e).toUpperCase();
            return r[i][a]
          }
        }

        function a(e) {
          var n = -1 * e.getTimezoneOffset(), r = n >= 0 ? "+" : "";
          return r += t(Math[n > 0 ? "floor" : "ceil"](n / 60), 2) + t(Math.abs(n % 60), 2)
        }

        function i(e, t) {
          return e.getHours() < 12 ? t.AMPMS[0] : t.AMPMS[1]
        }

        var o = {
            "yyyy": n("FullYear", 4),
            "yy": n("FullYear", 2, 0, !0),
            "y": n("FullYear", 1),
            "MMMM": r("Month"),
            "MMM": r("Month", !0),
            "MM": n("Month", 2, 1),
            "M": n("Month", 1, 1),
            "dd": n("Date", 2),
            "d": n("Date", 1),
            "HH": n("Hours", 2),
            "H": n("Hours", 1),
            "hh": n("Hours", 2, -12),
            "h": n("Hours", 1, -12),
            "mm": n("Minutes", 2),
            "m": n("Minutes", 1),
            "ss": n("Seconds", 2),
            "s": n("Seconds", 1),
            "sss": n("Milliseconds", 3),
            "EEEE": r("Day"),
            "EEE": r("Day", !0),
            "a": i,
            "Z": a
          }, s = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
          c = /^\/Date\((\d+)\)\/$/;
        oa.date = function (t, n) {
          var r, a, i = oa.date.locate, l = "", u = [];
          if (n = n || "mediumDate", n = i[n] || n, "string" == typeof t) if (/^\d+$/.test(t)) t = e(t); else if (c.test(t)) t = +RegExp.$1; else {
            var f = t.trim(), d = [0, 0, 0, 0, 0, 0, 0], p = new Date(0);
            f = f.replace(/^(\d+)\D(\d+)\D(\d+)/, function (t, n, r, a) {
              var i = 4 === a.length ? [a, n, r] : [n, r, a];
              return d[0] = e(i[0]), d[1] = e(i[1]) - 1, d[2] = e(i[2]), ""
            });
            var h = p.setFullYear, v = p.setHours;
            f = f.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function (t, n, r, a, i) {
              return d[3] = e(n), d[4] = e(r), d[5] = e(a), i && (d[6] = Math.round(1e3 * parseFloat("0." + i))), ""
            });
            var m = 0, g = 0;
            f = f.replace(/Z|([+-])(\d\d):?(\d\d)/, function (t, n, r, a) {
              return h = p.setUTCFullYear, v = p.setUTCHours, n && (m = e(n + r), g = e(n + a)), ""
            }), d[3] -= m, d[4] -= g, h.apply(p, d.slice(0, 3)), v.apply(p, d.slice(3)), t = p
          }
          if ("number" == typeof t && (t = new Date(t)), "date" === avalon.type(t)) {
            for (; n;) a = s.exec(n), a ? (u = u.concat(a.slice(1)), n = u.pop()) : (u.push(n), n = null);
            return u.forEach(function (e) {
              r = o[e], l += r ? r(t, i) : e.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }), l
          }
        };
        var l = {
          "AMPMS": {"0": "上午", "1": "下午"},
          "DAY": {"0": "星期日", "1": "星期一", "2": "星期二", "3": "星期三", "4": "星期四", "5": "星期五", "6": "星期六"},
          "MONTH": {
            "0": "1月",
            "1": "2月",
            "2": "3月",
            "3": "4月",
            "4": "5月",
            "5": "6月",
            "6": "7月",
            "7": "8月",
            "8": "9月",
            "9": "10月",
            "10": "11月",
            "11": "12月"
          },
          "SHORTDAY": {"0": "周日", "1": "周一", "2": "周二", "3": "周三", "4": "周四", "5": "周五", "6": "周六"},
          "fullDate": "y年M月d日EEEE",
          "longDate": "y年M月d日",
          "medium": "yyyy-M-d H:mm:ss",
          "mediumDate": "yyyy-M-d",
          "mediumTime": "H:mm:ss",
          "short": "yy-M-d ah:mm",
          "shortDate": "yy-M-d",
          "shortTime": "ah:mm"
        };
        l.SHORTMONTH = l.MONTH, oa.date.locate = l
      };
      var sa = avalon.modules = {
        "domReady!": {"exports": avalon, "state": 3},
        "avalon": {"exports": avalon, "state": 4}
      };
      sa.exports = sa.avalon;
      var ca, la = n.require, ua = n.define;
      Gt.loader = function (e) {
        var t = ca && e;
        n.require = t ? ca : la, n.define = t ? ca.define : ua
      }, new function () {
        function e(e, t) {
          var n = "js";
          e = e.replace(/^(\w+)\!/, function (e, t) {
            return n = t, ""
          }), "ready" === n && (s("debug: ready!已经被废弃，请使用domReady!"), n = "domReady");
          var r = "";
          e = e.replace($, function (e) {
            return r = e, ""
          });
          var a = "." + n, i = /js|css/.test(a) ? a : "";
          e = e.replace(/\.[a-z0-9]+$/g, function (e) {
            return e === a ? (i = e, "") : e
          });
          var o = avalon.mix({"query": r, "ext": i, "res": n, "name": e, "toUrl": v}, t);
          return o.toUrl(e), o
        }

        function t(e) {
          var t = e.name, n = e.res, r = sa[t], a = t && e.urlNoQuery;
          if (r && r.state >= 1) return t;
          if (r = sa[a], r && r.state >= 3) return ca(r.deps || [], r.factory, a), a;
          if (t && !r) {
            r = sa[a] = {"id": a, "state": 1};
            var i = function (a) {
              B[n] = a, a.load(t, e, function (e) {
                arguments.length && void 0 !== e && (r.exports = e), r.state = 4, o()
              })
            };
            B[n] ? i(B[n]) : ca([n], i)
          }
          return t ? a : n + "!"
        }

        function r(e, t) {
          for (var n, a = 0; n = e[a++];) if (4 !== sa[n].state && (n === t || r(sa[n].deps, t))) return !0
        }

        function i(e, t, n) {
          var r = u(e.src);
          return e.onload = e.onreadystatechange = e.onerror = null, !(t || n && sa[r] && !sa[r].state) || (setTimeout(function () {
            Qe.removeChild(e), e = null
          }), void s("debug: 加载 " + r + " 失败" + t + " " + !sa[r].state))
        }

        function o() {
          e:for (var e, t = E.length; e = E[--t];) {
            var n = sa[e], r = n.deps;
            if (r) {
              for (var a, i = 0; a = r[i]; i++) if (4 !== Object(sa[a]).state) continue e;
              4 !== n.state && (E.splice(t, 1), h(n.id, n.deps, n.factory), o())
            }
          }
        }

        function l(e, t, n) {
          function r() {
            var r = T.pop();
            r && r.require(t), n && n(), i(a, !1, !c) && (s("debug: 已成功加载 " + e), t && E.push(t), o())
          }

          var a = Ve.createElement("script"), c = "onload" in a, l = c ? "onload" : "onreadystatechange";
          a[l] = c ? r : function () {
            j.test(a.readyState) && r()
          }, a.onerror = function () {
            i(a, !0)
          }, a.className = et, a.src = e, Qe.insertBefore(a, Qe.firstChild), s("debug: 正准备加载 " + e)
        }

        function u(e) {
          return (e || "").replace($, "")
        }

        function f(e) {
          return /^(?:[a-z]+:)?\/\//i.test(String(e))
        }

        function d(e, t) {
          return "1"[0] ? e[t] : e.getAttribute(t, 4)
        }

        function p() {
          var e;
          try {
            a.b.c()
          } catch (t) {
            e = t.stack, !e && n.opera && (e = (String(t).match(/of linked script \S+/g) || []).join(" "))
          }
          if (e) return e = e.split(/[@ ]/g).pop(), e = "(" === e[0] ? e.slice(1, -1) : e.replace(/\s/, ""), u(e.replace(/(:\d+)?:\d+$/i, ""));
          for (var r, i = Qe.getElementsByTagName("script"), o = i.length; r = i[--o];) if (r.className === et && "interactive" === r.readyState) {
            var s = d(r, "src");
            return r.className = u(s)
          }
        }

        function h(e, t, r) {
          var a = Object(sa[e]);
          a.state = 4;
          for (var i, o = 0, c = []; i = t[o++];) if ("exports" === i) {
            var l = a.exports || (a.exports = {});
            c.push(l)
          } else c.push(sa[i].exports);
          try {
            var u = r.apply(n, c)
          } catch (f) {
            s("执行[" + e + "]模块的factory抛错： ", f)
          }
          return void 0 !== u && (a.exports = u), I.test(e) && delete sa[e], delete a.factory, u
        }

        function v(e) {
          0 === e.indexOf(this.res + "!") && (e = e.slice(this.res.length + 1));
          var t = e, n = 0, r = this.baseUrl, a = this.parentUrl || r;
          w(e, g.paths, function (e, r) {
            t = t.replace(r, e), n = 1
          }), n || w(e, g.packages, function (e, n, r) {
            t = t.replace(r.name, r.location)
          }), this.mapUrl && w(this.mapUrl, g.map, function (e) {
            w(t, e, function (e, n) {
              t = t.replace(n, e), a = r
            })
          });
          var i = this.ext;
          i && n && t.slice(-i.length) === i && (t = t.slice(0, -i.length)), f(t) || (a = this.built || /^\w/.test(t) ? r : a, t = C(a, t));
          var o = t + i;
          return t = o + this.query, o = t.replace($, function (e) {
            return this.query = e, ""
          }), w(e, g.urlArgs, function (e) {
            t += (t.indexOf("?") === -1 ? "?" : "&") + e
          }), this.url = t, this.urlNoQuery = o
        }

        function m(e, t, n) {
          var r = _(e, t, n);
          return r.sort(x), r
        }

        function y(e) {
          return new RegExp("^" + e + "(/|$)")
        }

        function b(e) {
          return function () {
            var t;
            return e.init && (t = e.init.apply(n, arguments)), t || e.exports && k(e.exports)
          }
        }

        function _(e, t, n) {
          var r = [];
          for (var a in e) if (st.call(e, a)) {
            var i = {"name": a, "val": e[a]};
            r.push(i), i.reg = "*" === a && t ? /^/ : y(a), n && "*" !== a && (i.reg = new RegExp("/" + a.replace(/^\//, "") + "(/|$)"))
          }
          return r
        }

        function w(e, t, n) {
          t = t || [];
          for (var r, a = 0; r = t[a++];) if (r.reg.test(e)) return n(r.val, r.name, r), !1
        }

        function x(e, t) {
          var n = e.name, r = t.name;
          return "*" === r ? -1 : "*" === n ? 1 : r.length - n.length
        }

        function C(e, t) {
          if ("/" !== e.charAt(e.length - 1) && (e += "/"), "./" === t.slice(0, 2)) return e + t.slice(2);
          if (".." === t.slice(0, 2)) {
            for (e += t; R.test(e);) e = e.replace(R, "");
            return e
          }
          return "/" === t.slice(0, 1) ? e + t.slice(1) : e + t
        }

        function k(e) {
          if (!e) return e;
          var t = n;
          return e.split(".").forEach(function (e) {
            t = t[e]
          }), t
        }

        var E = [], T = [], S = /\.js$/i, $ = /(\?[^#]*)$/, A = [], M = !1;
        ca = avalon.require = function (n, r, a, i) {
          if (M) {
            Array.isArray(n) || avalon.error("require方法的第一个参数应为数组 " + n);
            var s = [], l = {}, u = a || "callback" + setTimeout("1");
            i = i || {}, i.baseUrl = g.baseUrl;
            var f = !!i.built;
            if (a && (i.parentUrl = a.substr(0, a.lastIndexOf("/")), i.mapUrl = a.replace(S, "")), f) {
              var d = e(i.defineName, i);
              u = d.urlNoQuery
            } else n.forEach(function (n) {
              var r = e(n, i), a = t(r);
              a && (l[a] || (s.push(a), l[a] = "司徒正美"))
            });
            var p = sa[u];
            p && 4 === p.state || (sa[u] = {
              "id": u,
              "deps": f ? n.concat() : s,
              "factory": r || c,
              "state": 3
            }), p || E.push(u), o()
          } else if (A.push(avalon.slice(arguments)), arguments.length <= 2) {
            M = !0;
            for (var h, v = A.splice(0, A.length); h = v.shift();) ca.apply(null, h)
          }
        }, ca.define = function (e, t, n) {
          "string" != typeof e && (n = t, t = e, e = "anonymous"), Array.isArray(t) || (n = t, t = []);
          var a = {"built": !M, "defineName": e}, i = [t, n, a];
          n.require = function (e) {
            if (i.splice(2, 0, e), sa[e]) {
              sa[e].state = 3;
              var t = !1;
              try {
                t = r(sa[e].deps, e)
              } catch (a) {
              }
              t && avalon.error(e + "模块与之前的模块存在循环依赖，请不要直接用script标签引入" + e + "模块")
            }
            delete n.require, ca.apply(null, i)
          };
          var o = a.built ? "unknown" : p();
          if (o) {
            var s = sa[o];
            s && (s.state = 2), n.require(o)
          } else T.push(n)
        }, ca.config = g, ca.define.amd = sa;
        var N = g["orig.paths"] = {}, O = g["orig.map"] = {}, P = g["packages"] = [], D = g["orig.args"] = {};
        avalon.mix(Gt, {
          "paths": function (e) {
            avalon.mix(N, e), g.paths = m(N)
          }, "map": function (e) {
            avalon.mix(O, e);
            var t = m(O, 1, 1);
            avalon.each(t, function (e, t) {
              t.val = m(t.val)
            }), g.map = t
          }, "packages": function (e) {
            e = e.concat(P);
            for (var t, n = {}, r = [], a = 0; t = e[a++];) {
              t = "string" == typeof t ? {"name": t} : t;
              var i = t.name;
              if (!n[i]) {
                var o = C(t.location || i, t.main || "main");
                o = o.replace(S, ""), r.push(t), n[i] = t.location = o, t.reg = y(i)
              }
            }
            g.packages = r.sort()
          }, "urlArgs": function (e) {
            "string" == typeof e && (e = {"*": e}), avalon.mix(D, e), g.urlArgs = m(D, 1)
          }, "baseUrl": function (e) {
            if (!f(e)) {
              var t = Qe.getElementsByTagName("base")[0];
              t && Qe.removeChild(t);
              var n = Ve.createElement("a");
              n.href = e, e = d(n, "href"), t && Qe.insertBefore(t, Qe.firstChild)
            }
            e.length > 3 && (g.baseUrl = e)
          }, "shim": function (e) {
            for (var t in e) {
              var n = e[t];
              Array.isArray(n) && (n = e[t] = {"deps": n}), n.exportsFn || !n.exports && !n.init || (n.exportsFn = b(n))
            }
            g.shim = e
          }
        });
        var j = /complete|loaded/, B = ca.plugins = {
          "domReady": {"load": c}, "js": {
            "load": function (e, t, n) {
              var r = t.url, a = t.urlNoQuery, i = g.shim[e.replace(S, "")];
              i ? ca(i.deps || [], function () {
                var e = avalon.slice(arguments);
                l(r, a, function () {
                  n(i.exportsFn ? i.exportsFn.apply(0, e) : void 0)
                })
              }) : l(r, a)
            }
          }, "css": {
            "load": function (e, t, n) {
              var r = t.url, a = Ve.createElement("link");
              a.rel = "stylesheet", a.href = r, Qe.insertBefore(a, Qe.firstChild), s("debug: 已成功加载 " + r), n()
            }
          }, "text": {
            "load": function (e, t, n) {
              var r = t.url, a = Vr();
              a.onreadystatechange = function () {
                if (4 === a.readyState) {
                  var e = a.status;
                  e > 399 && e < 600 ? avalon.error(r + " 对应资源不存在或没有开启 CORS") : (s("debug: 已成功加载 " + r), n(a.responseText))
                }
              };
              var i = "_=" + (new Date - 0), o = r.indexOf("?") === -1 ? r + "?" + i : r + "&" + i;
              a.open("GET", o, !0), "withCredentials" in a && (a.withCredentials = !0), a.setRequestHeader("X-Requested-With", "XMLHttpRequest"), a.send(), s("debug: 正准备加载 " + r)
            }
          }
        };
        ca.checkDeps = o;
        var I = /^callback\d+$/, R = /\/\w+\/\.\./, L = Ve.scripts[Ve.scripts.length - 1],
          q = L.getAttribute("data-main");
        if (q) {
          Gt.baseUrl(q);
          var H = g.baseUrl;
          g.baseUrl = H.slice(0, H.lastIndexOf("/") + 1), l(H.replace(S, "") + ".js")
        } else {
          var F = u(d(L, "src"));
          g.baseUrl = F.slice(0, F.lastIndexOf("/") + 1)
        }
      };
      var fa, da = [], pa = function (e) {
        fa = !0;
        var t = avalon.require;
        for (t && t.checkDeps && (sa["domReady!"].state = 4, t.checkDeps()); e = da.shift();) e(avalon)
      };
      if ("complete" === Ve.readyState) setTimeout(pa); else if (ft) Ve.addEventListener("DOMContentLoaded", pa); else {
        Ve.attachEvent("onreadystatechange", function () {
          "complete" === Ve.readyState && pa()
        });
        try {
          var ha = null === n.frameElement
        } catch (Et) {
        }
        dt.doScroll && ha && n.external && Ge()
      }
      avalon.bind(n, "load", pa), avalon.ready = function (e) {
        fa ? e(avalon) : da.push(e)
      }, avalon.config({"loader": !0}), avalon.ready(function () {
        avalon.scan(Ve.body)
      }), Ze("avalon end", {}), r = [], i = function () {
        return avalon
      }.apply(t, r), !(void 0 !== i && (e.exports = i));
      var va = n.avalon;
      return avalon.noConflict = function (e) {
        return e && n.avalon === avalon && (n.avalon = va), avalon
      }, void 0 === o && (n.avalon = avalon), avalon
    })
  }, "82564377": function (e, t, n) {
    var r;
    r = function () {
      function e(e) {
        for (var r = 1; r < arguments.length; r++) n(this, arguments[r]);
        this.queue = !(null != this.queue && !this.queue), this.easing = avalon.easing[this.easing] ? this.easing : "ease", this.count = this.count === 1 / 0 || t(this.count) ? this.count : 1, this.gotoEnd = !1;
        var a = this.duration;
        this.duration = "number" == typeof a ? a : /^\d+ms$/.test(a) ? parseFloat(a) : /^\d+s$/.test(a) ? 1e3 * parseFloat(a) : 400
      }

      function t(e) {
        return +e === e >>> 0
      }

      function n(e, t, r) {
        if (r) "function" == typeof t ? e.bind(r, t) : e[r] = t; else switch (avalon.type(t)) {
          case"object":
            for (var a in t) n(e, t[a], a);
            break;
          case"number":
            e.duration = t;
            break;
          case"string":
            "slow" === t ? e.duration = 600 : "fast" === t ? e.duration = 200 : e.easing = t;
            break;
          case"function":
            e.bind("complete", t)
        }
      }

      function r(e, t) {
        var n = [null, null], r = [null, null], a = [null, null], i = function (i, o) {
          return a[o] = 3 * e[o], r[o] = 3 * (t[o] - e[o]) - a[o], n[o] = 1 - a[o] - r[o], i * (a[o] + i * (r[o] + i * n[o]))
        }, o = function (e) {
          return a[0] + e * (2 * r[0] + 3 * n[0] * e)
        }, s = function (e) {
          for (var t, n = e, r = 0; ++r < 14 && (t = i(n, 0) - e, !(Math.abs(t) < .001));) n -= t / o(n);
          return n
        };
        return function (e) {
          return i(s(e), 1)
        }
      }

      function a() {
        if (window.requestAnimationFrame) return {
          "start": requestAnimationFrame.bind(window),
          "stop": cancelAnimationFrame.bind(window)
        };
        if (window.mozCancelRequestAnimationFrame && window.mozCancelAnimationFrame) return {
          "start": mozRequestAnimationFrame.bind(window),
          "stop": mozCancelAnimationFrame.bind(window)
        };
        if (window.webkitRequestAnimationFrame && webkitRequestAnimationFrame(String)) return {
          "start": webkitRequestAnimationFrame.bind(window),
          "stop": (window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame).bind(window)
        };
        var e = 0, t = Date.now || function () {
          return (new Date).getTime()
        };
        return {
          "start": function (n) {
            var r = t(), a = 16 - (r - e);
            return a < 0 && (a = 0), e = r + a, setTimeout(n, a)
          }, "stop": function (e) {
            clearTimeout(e)
          }
        }
      }

      function i(e) {
        if (e.queue) {
          for (var t, n = 1, r = g.length; t = g[--r];) if (t.elem === e.elem) {
            t.troops.push(e), n = 0;
            break
          }
          n && g.unshift(e)
        } else g.push(e);
        m || (m = v.start(function a() {
          m && (o(), v.start(a))
        }))
      }

      function o() {
        for (var e = g.length; --e >= 0;) g[e].paused || g[e].elem && s(g[e], e) || g.splice(e, 1);
        0 === g.length && (v.stop(m), m = null)
      }

      function s(e, t) {
        var n = +new Date;
        if (e.startTime) {
          var r = (n - e.startTime) / e.duration, a = e.gotoEnd || r >= 1;
          if (e.playState) {
            for (var i, o = 0; i = e.tweens[o++];) i.run(r, a);
            e.fire("step")
          }
          if (a || 0 == e.count) if (e.count--, e.fire("after"), e.count <= 0) {
            e.fire("complete");
            var s = e.troops.shift();
            if (!s) return !1;
            g[t] = s, s.troops = e.troops
          } else e.startTime = e.gotoEnd = !1, e.frameName = ("fx" + Math.random()).replace(/0\./, ""), e.revert ? e.revertTweens() : e.createTweens(avalon.isHidden(e.elem))
        } else e.playState && (e.fire("before"), e.build()), e.startTime = n;
        return !0
      }

      function c(e) {
        this.$events = {}, this.elem = e, this.troops = [], this.tweens = [], this.orig = {}, this.props = {}, this.count = 1, this.frameName = ("fx" + Math.random()).replace(/0\./, ""), this.playState = !0
      }

      function l(e, t, n, r) {
        var a, i = e.elem, o = i.dataShow || {}, s = new u(t, e), c = o[t] || s.cur();
        if (/color$/i.test(t)) parts = [d(c), d(n)]; else {
          parts = b.exec(c);
          var l = parts && parts[3] || (avalon.cssNumber[t] ? "" : "px");
          if ("toggle" === n && (n = r ? "show" : "hide"), "show" === n) e.showState = "show", avalon.css(i, t, 0), parts = [0, parseFloat(c)]; else if ("hide" === n) e.showState = "hide", e.orig[t] = c, parts = [parseFloat(c), 0], n = 0; else if (parts = b.exec(n), parts) {
            if (parts[2] = parseFloat(parts[2]), parts[3] && parts[3] !== l) {
              var f = i.cloneNode(!0);
              f.style.visibility = "hidden", f.style.position = "absolute", i.parentNode.appendChild(f), avalon.css(f, t, parts[2] + (parts[3] ? parts[3] : 0)), parts[2] = parseFloat(avalon.css(f, t)), i.parentNode.removeChild(f)
            }
            a = parts[2], c = parseFloat(c), parts[1] && (a = c + (parts[1] + 1) * parts[2]), parts = [c, a]
          }
        }
        c = parts[0], a = parts[1], c + "" != a + "" ? (s.start = c, s.end = a, s.unit = l || "", e.tweens.push(s)) : delete e.props[t]
      }

      function u(e, t) {
        this.elem = t.elem, this.name = e, this.easing = avalon.easing[t.easing], /color$/i.test(e) && (this.update = this.updateColor)
      }

      function f(e, t) {
        var n = {};
        return _.concat.apply([], _.slice(0, t)).forEach(function (t) {
          n[t] = e
        }), n
      }

      function d(e) {
        var t = e.toLowerCase(), n = [];
        if (x[t]) return x[t];
        if (0 === t.indexOf("rgb")) {
          var r = t.match(/(\d+%?)/g), a = r[0].indexOf("%") !== -1 ? 2.55 : 1;
          return x[t] = [parseInt(r[0]) * a, parseInt(r[1]) * a, parseInt(r[2]) * a]
        }
        return "#" === t.charAt(0) ? (4 === t.length && (t = t.replace(/([^#])/g, "$1$1")), t.replace(/\w{2}/g, function (e) {
          n.push(parseInt(e, 16))
        }), x[t] = n) : window.VBArray ? x[t] = C(t) : x.white
      }

      var p = avalon.fn.animate = function (t, n) {
        var r = new c(this[0]);
        if ("number" == typeof t) r.duration = t, 1 === arguments.length && (r.playState = !1); else if ("object" == typeof t) {
          for (var a in t) {
            var o = avalon.cssName(a) || a;
            a !== o && (t[o] = t[a], delete t[a])
          }
          r.props = t
        }
        return e.apply(r, arguments), i(r), this
      };
      avalon.mix(p, {"fps": 30});
      var h = {
        "linear": [.25, .25, .75, .75],
        "ease": [.25, .1, .25, 1],
        "swing": [.25, .1, .25, 1],
        "easeIn": [.42, 0, 1, 1],
        "easeOut": [0, 0, .58, 1],
        "easeInOut": [.42, 0, .58, 1],
        "easeInQuad": [.55, .085, .68, .53],
        "easeInCubic": [.55, .055, .675, .19],
        "easeInQuart": [.895, .03, .685, .22],
        "easeInQuint": [.755, .05, .855, .06],
        "easeInSine": [.47, 0, .745, .715],
        "easeInExpo": [.95, .05, .795, .035],
        "easeInCirc": [.6, .04, .98, .335],
        "easeInBack": [.6, -.28, .735, .045],
        "easeOutQuad": [.25, .46, .45, .94],
        "easeOutCubic": [.215, .61, .355, 1],
        "easeOutQuart": [.165, .84, .44, 1],
        "easeOutQuint": [.23, 1, .32, 1],
        "easeOutSine": [.39, .575, .565, 1],
        "easeOutExpo": [.19, 1, .22, 1],
        "easeOutCirc": [.075, .82, .165, 1],
        "easeOutBack": [.175, .885, .32, 1.275],
        "easeInOutQuad": [.455, .03, .515, .955],
        "easeInOutCubic": [.645, .045, .355, 1],
        "easeInOutQuart": [.77, 0, .175, 1],
        "easeInOutQuint": [.86, 0, .07, 1],
        "easeInOutSine": [.445, .05, .55, .95],
        "easeInOutExpo": [1, 0, 0, 1],
        "easeInOutCirc": [.785, .135, .15, .86],
        "easeInOutBack": [.68, -.55, .265, 1.55],
        "custom": [0, .35, .5, 1.3],
        "random": [Math.random().toFixed(3), Math.random().toFixed(3), Math.random().toFixed(3), Math.random().toFixed(3)]
      };
      avalon.easing = {}, avalon.each(h, function (e, t) {
        avalon.easing[e] = r([t[0], t[1]], [t[2], t[3]])
      });
      var v = new a, m = null, g = avalon.timeline = [], y = document.documentElement;
      avalon.isHidden = function (e) {
        return 0 === e.sourceIndex || "none" === avalon.css(e, "display") || !avalon.contains(y, e)
      }, c.prototype = {
        "constructor": c, "bind": function (e, t, n) {
          var r = this.$events[e] || (this.$events[e] = []), a = n ? "unshift" : "push";
          r[a](t)
        }, "fire": function (e) {
          for (var t, n = Array.prototype.slice.call(arguments, 1), r = this.$events[e] || [], a = 0; t = r[a++];) t.call(this.elem, n)
        }, "build": function () {
          var e = this, t = e.elem, n = e.props, r = t.style, a = !window.getComputedStyle, i = avalon.isHidden(t);
          ("height" in n || "width" in n) && (e.overflow = [r.overflow, r.overflowX, r.overflowY]);
          var o = r.display || avalon.css(t, "display"), s = t.getAttribute("olddisplay");
          s ? "none" !== o ? t.setAttribute("olddisplay", o) : o = s : ("none" === o && (r.display = "", o = avalon.css(t, "display"), "none" === o && (o = avalon.parseDisplay(t.nodeName))), t.setAttribute("olddisplay", o)), r.display = o, "inline" === o && "none" === avalon.css(t, "float") && (a && "inline" !== avalon.parseDisplay(t.nodeName) ? r.zoom = 1 : r.display = "inline-block"), this.createTweens(i), e.overflow && (r.overflow = "hidden", e.bind("after", function () {
            r.overflow = e.overflow[0], r.overflowX = e.overflow[1], r.overflowY = e.overflow[2]
          })), e.bind("after", function () {
            if ("hide" === e.showState) {
              this.style.display = "none", this.dataShow = {};
              for (var t in e.orig) this.dataShow[t] = e.orig[t], avalon.css(this, t, e.orig[t])
            }
          }), this.build = avalon.noop
        }, "createTweens": function (e) {
          this.tweens = [];
          for (var t in this.props) l(this, t, this.props[t], e)
        }, "revertTweens": function () {
          for (var e, t = 0; e = this.tweens[t++];) {
            var n = e.start, r = e.end;
            e.start = r, e.end = n, this.props[e.name] = Array.isArray(e.start) ? "rgb(" + e.start + ")" : e.unit ? e.start + e.unit : e.start
          }
        }
      };
      var b = new RegExp("^(?:([+-])=|)(" + /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source + ")([a-z%]*)$", "i");
      u.prototype = {
        "constructor": u, "cur": function () {
          var e = u.propHooks[this.name];
          return e && e.get ? e.get(this) : u.propHooks._default.get(this)
        }, "run": function (e, t) {
          this.update(e, t);
          var n = u.propHooks[this.name];
          n && n.set ? n.set(this) : u.propHooks._default.set(this)
        }, "updateColor": function (e, t) {
          if (t) var n = this.end; else {
            var r = this.easing(e);
            n = this.start.map(function (e, t) {
              return Math.max(Math.min(parseInt(e + (this.end[t] - e) * r, 10), 255), 0)
            }, this)
          }
          this.now = "rgb(" + n + ")"
        }, "update": function (e, t) {
          this.now = t ? this.end : this.start + this.easing(e) * (this.end - this.start)
        }
      }, u.propHooks = {
        "_default": {
          "get": function (e) {
            var t = avalon.css(e.elem, e.name);
            return t && "auto" !== t ? t : 0
          }, "set": function (e) {
            avalon.css(e.elem, e.name, e.now + e.unit)
          }
        }
      }, ["scrollTop", "scrollLeft"].forEach(function (e) {
        u.propHooks[e] = {
          "get": function (e) {
            return e.elem[e.name]
          }, "set": function (e) {
            e.elem[e.name] = e.now
          }
        }
      }), avalon.fn.mix({
        "delay": function (e) {
          return this.animate(e)
        }, "pause": function () {
          for (var e, t = this[0], n = 0; e = g[n]; n++) e.elem === t && (e.paused = new Date - 0);
          return this
        }, "resume": function () {
          for (var e, t = new Date, n = this[0], r = 0; e = g[r]; r++) e.elem === n && (e.startTime += t - e.paused, delete e.paused);
          return this
        }, "stop": function (e, t) {
          e = e ? "1" : "", t = t ? "1" : "0";
          for (var n, r = parseInt(e + t, 2), a = this[0], i = 0; n = g[i]; i++) if (n.elem === a) switch (n.gotoEnd = !0, n.count = 0, r) {
            case 0:
              n.playState = n.revert = !1;
              break;
            case 1:
              n.revert = !1;
              break;
            case 2:
              delete n.elem;
              break;
            case 3:
              n.troops.forEach(function (e) {
                e.gotoEnd = !0
              })
          }
          return this
        }
      });
      var _ = [["height", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], ["opacity"]],
        w = {
          "slideDown": f("show", 1),
          "slideUp": f("hide", 1),
          "slideToggle": f("toggle", 1),
          "fadeIn": {"opacity": "show"},
          "fadeOut": {"opacity": "hide"},
          "fadeToggle": {"opacity": "toggle"}
        };
      avalon.each(w, function (e, t) {
        avalon.fn[e] = function () {
          var n = [].concat.apply([t, {"frameName": e}], arguments);
          return this.animate.apply(this, n)
        }
      }), String("toggle,show,hide").replace(avalon.rword, function (e) {
        avalon.fn[e] = function () {
          var t = [].concat.apply([f(e, 3), {"frameName": e}], arguments);
          return this.animate.apply(this, t)
        }
      });
      var x = {
        "black": [0, 0, 0],
        "gray": [128, 128, 128],
        "white": [255, 255, 255],
        "orange": [255, 165, 0],
        "red": [255, 0, 0],
        "green": [0, 128, 0],
        "yellow": [255, 255, 0],
        "blue": [0, 0, 255]
      };
      if (window.VBArray) var C = new function () {
        var e;
        try {
          var t = new ActiveXObject("htmlfile");
          t.write("<body>"), t.close(), e = t.body
        } catch (n) {
          e = createPopup().document.body
        }
        var r = e.createTextRange();
        return function (t) {
          e.style.color = String(t).trim();
          var n = r.queryCommandValue("ForeColor");
          return [255 & n, (65280 & n) >> 8, (16711680 & n) >> 16]
        }
      };
      avalon.parseColor = d
    }.call(t, n, t, e), !(void 0 !== r && (e.exports = r))
  }, "85151090": function (e, t) {
    var n = Object.prototype.toString, r = {
      "_handlers": {}, "on": function (e, t) {
        this._handlers[e] || (this._handlers[e] = []), this._handlers[e].push(t)
      }, "once": function (e, t) {
        function n() {
          r.off(e, n), t.apply(r, arguments)
        }

        var r = this;
        this.on(e, n)
      }, "trigger": function (e) {
        var t = this;
        if (t._handlers[e]) {
          for (var n = Array.prototype.slice.call(arguments, 1), r = 0, a = t._handlers[e].length; r < a; r++) t._handlers[e] && t._handlers[e][r] && t._handlers[e][r].apply(t, n);
          return t
        }
      }, "emit": function () {
        return this.trigger.apply(this, arguments)
      }, "off": function (e, t) {
        if (t) {
          if ("[object Array]" == n.call(this._handlers[e])) for (var r = 0, a = this._handlers[e].length; r < a; ++r) if (this._handlers[e][r] == t) {
            this._handlers[e].splice(r, 1);
            break
          }
        } else this._handlers[e] = []
      }
    };
    e.exports = r
  }, "88981800": function (e, t, n) {
    n(68485499), n(115781265);
    var r = null;
    try {
      r = window.localStorage
    } catch (a) {
    }
    String.format = function () {
      var e = arguments[0] || "";
      if (arguments.length > 1) if (2 == arguments.length && "object" == typeof arguments[1]) {
        var t = arguments[1];
        for (var n in t) if (t.hasOwnProperty(n) && void 0 != t[n]) {
          var r = new RegExp("({" + n + "})", "g");
          e = e.replace(r, t[n])
        }
      } else for (var a = 1; a < arguments.length; a++) if (void 0 != arguments[a]) {
        var r = new RegExp("({[" + (a - 1) + "]})", "g");
        e = e.replace(r, arguments[a])
      }
      return e
    }, function () {
    }.bind || (Function.prototype.bind = function (e) {
      if (arguments.length < 2 && void 0 === e) return this;
      var t = this, n = arguments;
      return function () {
        var r, a = [];
        for (r = 1; r < n.length; r++) a.push(n[r]);
        for (r = 0; r < arguments.length; r++) a.push(arguments[r]);
        return t.apply(e, a)
      }
    });
    var i = e.exports = {
      "isIsolated": function () {
        return top == window
      }, "supportFilter": function () {
        var e = "WebkitAppearance" in document.documentElement.style;
        void 0 === e && (e = !1);
        var t = (document.documentMode, !!window.ActiveXObject), n = t && !window.XMLHttpRequest;
        return el = document.createElement("div"), el.style.cssText = (e ? "-webkit-" : "") + "filter: blur(2px);", !n && 0 != el.style.length && (void 0 === document.documentMode || document.documentMode > 9)
      }, "Id": function (e) {
        return document.getElementById(e)
      }, "appendCSSUnit": function (e) {
        return e + "px"
      }, "escHTML": function (e, t) {
        var n = ["&", "&amp;", "<", "&lt;", ">", "&gt;", " ", "&nbsp;", '"', "&quot;", "'", "&#39;", "\\r", "<br>", "\\n", "<br>"];
        t && n.reverse(), e = "" + e;
        for (var r = 0, a = e; r < n.length; r += 2) a = a.replace(new RegExp(n[r], "g"), n[1 + r]);
        return a
      }, "delayRun": function (e, t, n, r) {
        r = r || window, r._delayRunList ? r._delayRunList[e] && (clearTimeout(r._delayRunList[e]), r._delayRunList[e] = -1) : r._delayRunList = {}, r._delayRunList[e] = setTimeout(function () {
          t.call(r)
        }, ~~n)
      }, "lang": {
        "is": function (e, t) {
          var n = Object.prototype.toString.call(t).slice(8, -1);
          return void 0 !== t && null !== t && n === e
        }, "isNumber": function (e) {
          return this.is("Number", e)
        }, "isString": function (e) {
          return this.is("String", e)
        }, "isFunction": function (e) {
          return this.is("Function", e)
        }, "isObject": function (e) {
          return this.is("Object", e)
        }, "isDocument": function (e) {
          return null != e && e.nodeType == e.DOCUMENT_NODE
        }, "isWindow": function (e) {
          return null != e && e == e.window
        }, "isPlainObject": function (e) {
          return i.lang.isObject(e) && !i.lang.isWindow(e) && Object.getPrototypeOf(e) == Object.prototype
        }, "isArray": function (e) {
          return this.is("Array", e)
        }, "isTruthy": function (e) {
          return !!e && "false" !== e && "0" !== e && "undefined" !== e && "null" !== e
        }, "isFalsy": function (e) {
          return !this.isTruthy(e)
        }
      }, "fn": {
        "stop": function () {
          try {
            "stop" in window ? window.stop() : document.execCommand("Stop")
          } catch (e) {
          }
        }, "formatFloat": function (e, t, n, r) {
          r = ~~r ? ~~r : t + 1;
          var a = Math.round(e * Math.pow(10, r));
          return Math[n](a / Math.pow(10, r - t)) / Math.pow(10, t)
        }, "emptyFunc": function () {
        }, "uuid": function (e, t) {
          var n, r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), a = r, i = [];
          if (t = t || a.length, e) for (n = 0; n < e; n++) i[n] = a[0 | Math.random() * t]; else {
            var o;
            for (i[8] = i[13] = i[18] = i[23] = "-", i[14] = "4", n = 0; n < 36; n++) i[n] || (o = 0 | 16 * Math.random(), i[n] = a[19 == n ? 3 & o | 8 : o])
          }
          return i.join("")
        }, "getParam": function (e, t) {
          var n = t || window.location.href;
          if (e && n) {
            var r = new RegExp("(\\?|#|&|^)" + e + "=([^&^#]*)(#|&|$)"), a = n.match(r);
            return a ? a[2] : ""
          }
          return ""
        }, "delParam": function (e, t) {
          return e instanceof Array || (e = [e]), t = t.replace(/[\r\n]/g, ""), i.fn.each(e, function (e) {
            t = t.replace(new RegExp("(?:&" + e + "=[^&]*)", "g"), ""), t = t.replace(new RegExp("(?:\\?" + e + "=[^&]*&?)", "g"), "?")
          }), t
        }, "addParam": function (e, t) {
          var n = [];
          i.fn.each(e, function (e, t) {
            n.push(t)
          }), t = i.fn.delParam(n, t);
          var r = i.req.serializeParam(e);
          return t += /(\?|&)$/.test(t) ? "" + r : /\?/.test(t) ? "&" + r : "?" + r
        }, "insertParam": function (e, t) {
          var n = t.split("?"), r = n[0], a = n[1];
          return t = i.fn.addParam(e, r), "&" === a[0] && (a = a.slice(1)), t + "&" + a
        }, "getParams": function (e, t, n) {
          e = e || location.href, t = t || "&", n = n || "=";
          for (var r, a, i = e.replace(/.+?\?/, "").replace(/#.*/, "").split(t), o = {}, s = 0; s < i.length; s++) {
            var c = i[s], l = c.indexOf(n);
            if (l > -1 && (r = c.substr(0, l))) {
              a = c.substr(l + 1);
              try {
                o[r] = a
              } catch (u) {
                o[r] = a
              }
            }
          }
          return o
        }, "buildUrl": function (e) {
          if (!e || !e.path) return "";
          var t = e.hash || i.fn.addParam(e.hashQuery, e.hashPath);
          return i.fn.addParam(e.query, e.path) + "#" + t
        }, "each": function (e, t) {
          var n, r = 0, a = e.length, o = void 0 === a && i.lang.isObject(e);
          if (o) {
            for (var s in e) if (t.call(e[s], e[s], s, e) === !1) break
          } else for (n = e[0]; r < a && !1 !== t.call(n, n, r, e); n = e[++r]) ;
          return e
        }, "map": function (e, t, n) {
          var r = i.lang.isArray(e), a = i.lang.isObject(e), o = null;
          if (r) {
            o = [];
            for (var s = 0; s < e.length; s++) o.push(t.call(n, e[s], s, e))
          }
          if (a) {
            o = {};
            for (var c in e) o[c] = t.call(n, e[c], c, e)
          }
          return o
        }, "flatMap": function (e, t) {
          return [].concat.apply([], e.map(t))
        }, "safeGet": function (e, t, n, r) {
          for (r = 0, t = t.split ? t.split(".") : t; e && r < t.length;) e = e[t[r++]];
          return void 0 === e ? n : e
        }, "extract": function (e, t) {
          var n = {};
          return i.fn.each(t, function (t) {
            n[t] = e[t]
          }), n
        }, "extend": function (e) {
          for (var t = 1; t <= arguments.length; t++) for (var n in arguments[t]) e[n] = arguments[t][n];
          return e
        }, "splitFirst": function (e, t) {
          var n = e.indexOf(t);
          return n === -1 ? [e] : [e.substring(0, n), e.substring(n + 1)]
        }, "isOpenid": function (e) {
          return /[0-9a-f]{32}/i.test(e)
        }, "desensitize": function (e) {
          if ("string" != typeof e) return e;
          if (/\*/.test(e)) return e;
          var t = e.length;
          return t < 5 ? e : t <= 6 ? e.slice(0, 2) + "**" + e.slice(4 - t) : t <= 7 ? e.slice(0, 2) + "***" + e.slice(5 - t) : t <= 9 ? e.slice(0, 3) + "***" + e.slice(6 - t) : e.slice(0, 3) + "****" + e.slice(7 - t)
        }, "matchDesensitized": function (e, t) {
          var n = !0;
          return e.split("").forEach(function (e, r) {
            t[r] !== e && (n = !("*" !== t[r] || !n) && /\d/.test(e))
          }), n
        }, "getStringWidth": function (e) {
          return e.replace(/[^\x00-\xff]/g, "aa").length
        }, "trimToWidth": function (e, t) {
          for (var n = "", r = 0, a = 0; a < e.length; a++) {
            var i = e.charCodeAt(a);
            r += i >= 0 && i <= 128 ? 1 : 2, r <= t && (n += e[a])
          }
          return n
        }
      }, "req": {
        "form": function (e, t, n, r, a) {
          var o = "jsSubmitter", s = document.getElementById(o);
          if (s || (s = document.createElement("form"), s.id = o, r && (s.acceptCharset = r), s.method = n || "POST", s.target = a || "_blank", s.style.display = "none", document.body.appendChild(s)), s.innerHTML = "", i.lang.isObject(t)) {
            var c;
            for (key in t) c = document.createElement("input"), c.type = "hidden", c.name = key, c.value = t[key], s.appendChild(c)
          }
          c = document.createElement("input"), c.type = "submit", c.style.display = "none", s.appendChild(c), i.dom.addEvent(s, "click", function () {
            r && (document.charset = r, s.setAttribute("accept-charset", r))
          }), s.action = e, c.click(), s.innerHTML = ""
        }, "serializeParam": function (e) {
          if (!e) return "";
          var t = [];
          for (var n in e) "undefined" == typeof e[n] && null == e[n] || t.push(n + "=" + e[n]);
          return t.join("&")
        }, "loadScript": function (e, t, n, r) {
          var a = document.getElementsByTagName("head")[0], i = document.createElement("script"), o = !1;
          i.onload = i.onreadystatechange = function () {
            o || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (o = !0, t(!0), i.onload = i.onreadystatechange = null, a && i.parentNode && a.removeChild(i))
          }, i.charset = r || "utf-8", i.src = e, a.insertBefore(i, a.firstChild)
        }
      }, "tmpl": function (e, t) {
        return "string" == typeof e ? e.replace(/\$([a-zA-Z0-9_\.]*)\$/g, function (e, n) {
          if (n.indexOf(".") !== -1) {
            n = n.split(/\./g);
            var r = t;
            return i.fn.each(n, function (e) {
              r = r[e]
            }), r || ""
          }
          return "undefined" != typeof t[n] ? t[n] : ""
        }) : e
      }, "math": {
        "add": function (e, t) {
          var n, r, a, i;
          if (n = e.toString().split("."), n = n.length > 1 ? n[1].length : 0, r = t.toString().split("."), r = r.length > 1 ? r[1].length : 0, i = Math.abs(n - r), a = Math.pow(10, Math.max(n, r)), i > 0) {
            var o = Math.pow(10, i);
            n > r ? (e = Number(e.toString().replace(".", "")), t = Number(t.toString().replace(".", "")) * o) : (e = Number(e.toString().replace(".", "")) * o, t = Number(t.toString().replace(".", "")))
          } else e = Number(e.toString().replace(".", "")), t = Number(t.toString().replace(".", ""));
          return (e + t) / a
        }, "sub": function (e, t) {
          var n, r, a, i;
          return n = e.toString().split("."), n = n.length > 1 ? n[1].length : 0, r = t.toString().split("."), r = r.length > 1 ? r[1].length : 0, a = Math.pow(10, Math.max(n, r)), i = n >= r ? n : r, ((e * a - t * a) / a).toFixed(i)
        }, "mul": function (e, t) {
          var n = 0, r = e.toString(), a = t.toString(), i = r.split("."), o = a.split(".");
          return n += i.length > 1 ? i[1].length : 0, n += o.length > 1 ? o[1].length : 0, Number(r.replace(".", "")) * Number(a.replace(".", "")) / Math.pow(10, n)
        }, "div": function (e, t) {
          var n, r, a, i;
          return n = e.toString().split("."), n = n.length > 1 ? n[1].length : 0, r = t.toString().split("."), r = r.length > 1 ? r[1].length : 0, a = Number(e.toString().replace(".", "")), i = Number(t.toString().replace(".", "")), a / i * Math.pow(10, r - n)
        }, "toDecimal": function (e, t, n) {
          t = "undefined" == typeof t ? 2 : t;
          var r = e;
          if (isNaN(r)) return !1;
          var a = r.toString(), i = a.indexOf(".");
          if (i < 0) {
            if (!n) {
              a += ".";
              for (var o = 0; o < t; ++o) a += "0"
            }
          } else {
            var s = a.split("."), c = s[1].substr(0, t);
            if (c.length < t) for (var o = 0, l = t - c.length; o < l; ++o) n || (c += "0");
            a = [s[0], c].join(".")
          }
          return a
        }
      }, "filter": {
        "number": function (e) {
          return isNaN(Number(e)) ? "" : e
        }, "min": function (e, t) {
          var n = Number(e), r = !isNaN(n);
          return r && n < t ? t : e
        }, "max": function (e, t) {
          var n = Number(e), r = !isNaN(n);
          return r && n > t ? t : e
        }
      }, "dom": {
        "addEvent": function (e, t, n) {
          e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, function () {
            return n.call(e, window.event)
          }) : e["on" + t] = n
        }
      }, "localStorage": {
        "_retry": !0, "_maxRetry": 1, "_prefix": /^midas\.minipay_v2?\:/, "get": function (e, t) {
          if (r) {
            var n;
            e = "midas.minipay_v2:" + e;
            try {
              n = r.getItem(e)
            } catch (a) {
              return
            }
            return n ? t ? JSON.parse(n) : n : void 0
          }
        }, "set": function (e, t, n) {
          if (r) {
            n = "undefined" == typeof n ? this._retry : n;
            var a = e;
            e = "midas.minipay_v2:" + e;
            try {
              r.setItem(e, t)
            } catch (i) {
              if (n) for (var o = this._maxRetry; o > 0;) o--, this.removeAll(), this.set(a, t, !1)
            }
          }
        }, "remove": function (e) {
          if (r) try {
            r.removeItem(e)
          } catch (t) {
          }
        }, "removeAll": function () {
          if (r) for (var e = this._prefix, t = r.length - 1; t >= 0; t--) {
            var n = r.key(t);
            e.test(n) && r.removeItem(n)
          }
        }
      }, "cookie": {
        "get": function (e) {
          var t = document.cookie.match(new RegExp("(?:^|;\\s)" + e + "=(.*?)(?:;\\s|$)"));
          return t ? i.filterXSS(unescape(t[1])) : ""
        }, "set": function (e, t, n) {
          n = n || {};
          var r = new Date, a = n.domain || "pay.qq.com", i = n.path || "/", o = n.time || 31536e7;
          r.setTime(r.getTime() + o), document.cookie = e + "=" + escape(t) + "; path=" + i + "; domain=" + a + (n.disableTime ? "" : "; expires=" + r.toUTCString())
        }, "del": function (e, t) {
          var n = t || {};
          n.time = -new Date - 1, i.cookie.set(e, "", n)
        }
      }, "discount": {
        "noDiscountInterval": {"*": [[1, 99]]}, "initNoDiscountInterval": function (e) {
          function t(e) {
            return e ? e.split(";").filter(Boolean).map(function (e) {
              var t = e.split("-").map(function (e) {
                return parseInt(e, 10)
              }).sort(function (e, t) {
                return e - t
              });
              return 1 === t.length ? [t[0], t[0]] : t
            }) : null
          }

          if (e) {
            var n = e.channel;
            this.noDiscountInterval = n.map(function (e) {
              return {"name": e.name, "interval": t(e.no_discount_interval)}
            }).reduce(function (e, t) {
              return e[t.name] = t.interval, e
            }, this.noDiscountInterval)
          }
        }, "checkHasDiscount": function (e, t) {
          var n = i.fn.formatFloat(100 * e, 0, "round"), r = this.noDiscountInterval[t] || this.noDiscountInterval["*"],
            a = r.some(function (e) {
              var t = e[0], r = e[1];
              return n >= t && n <= r
            });
          return !a
        }
      }
    };
    i.inherits = function (e, t) {
      var n = function () {
      };
      n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e, e._super = t
    }, i.filterXSS = function (e) {
      if (!e) return e;
      for (; e != unescape(e);) e = unescape(e);
      for (var t = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], n = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], r = 0; r < t.length; r++) e = e.replace(new RegExp(t[r], "gi"), n[r]);
      return e
    }, i.universeProtocol = function (e) {
      return e.replace(/http(\b|s):(?=\/\/)/i, location.protocol)
    }, i.loginJump = function (e, t, n) {
      t = t || "ptlogin", isNewWin = n || !0;
      var r = "ptlogin" === t ? "http://ptlogin2.qq.com/jump?clientuin=" + i.cookie.get("uin").substring(1) + "&skey=" + i.cookie.get("skey") + "&u1=" + encodeURIComponent(e) : "https://www.tenpay.com/cgi-bin/v1.0/communitylogin.cgi?p_uin=" + i.cookie.get("uin") + "&skey=" + i.cookie.get("skey") + "&u1=" + encodeURIComponent(e);
      return n ? window.open(r) : window.location.href = r, r
    }, i.calcTotalPrice = function (e, t) {
      return 100 * t * e / 100
    }, i.Raven = {
      "captureMessage": function (e) {
        "undefined" != typeof Raven && Raven.captureMessage && Raven.captureMessage(e, {"level": "warning"})
      }, "captureException": function (e) {
        "undefined" != typeof Raven && Raven.captureException && Raven.captureException(e)
      }, "captureBreadcrumb": function (e, t) {
        "undefined" != typeof Raven && Raven.captureBreadcrumb && Raven.captureBreadcrumb({
          "message": e,
          "category": "tag",
          "data": t || {}
        })
      }
    }, i.openWindow = function (e, t) {
      try {
        "post" == t || "POST" == t ? i.req.form(e.split("?")[0], i.fn.getParams(e), "post", null, "_blank") : window.open(e, "_blank")
      } catch (n) {
        i.Raven.captureMessage("window.open:" + n.message)
      }
    }, i.createWindow = function () {
      var e = null;
      try {
        e = window.open("about:blank", "_blank")
      } catch (t) {
        e && e.close(), e = null
      }
      return {
        "open": function (t) {
          e && (e.location.href = t)
        }, "close": function () {
          e && e.close(), e = null
        }
      }
    }, i.handleDisableChannel = function (e) {
      var t = i.fn.getParam("disable_channel").split(",").filter(Boolean);
      if (0 !== t.length) {
        var n = ["channel", "recommend_channel", "continous_recommend_channel"], r = function (e) {
          var n = i.lang.isObject(e) ? e.name : e;
          return t.indexOf(n) === -1
        };
        n.forEach(function (t) {
          i.lang.isArray(e[t]) && (e[t] = e[t].filter(r))
        })
      }
    }, i.hexToBase64 = function (e) {
      return window.btoa(String.fromCharCode.apply(null, e.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")))
    }, i.monitorTime = function (e) {
      var t = (new Date).getTime(), n = e(), r = (new Date).getTime();
      return {"result": n, "times": r - t}
    }
  }, "91187074": function (e, t, n) {
    function r(e, t) {
      var n = s.routes[e];
      if (!n) return !1;
      for (var r = 0, a = n.length; r < a; ++r) n[r].apply(null, arguments);
      return !0
    }

    var a = n(85151090), i = n(88981800), o = [], s = {
      "_handlers": {}, "routes": {}, "add": function (e, t) {
        return this.routes[e] = this.routes[e] || [], this.routes[e].push(t), this
      }, "remove": function (e) {
        return this.routes[e] = null, this
      }, "flush": function () {
        return this.routes = {}, this
      }, "back": function (e) {
        this.emit("back", this.getCurrent()), this.go(o[o.length - 2], e)
      }, "go": function (e, t) {
        var n = o.indexOf(e);
        if (n != -1) {
          for (var a = o.splice(n + 1, o.length), i = 0, s = a.length; i < s; ++i) this.emit("back", a[i], t);
          r(o[o.length - 1], !0, t)
        } else r(e, !1, t) && o.push(e);
        return this
      }, "getCurrent": function () {
        return o[o.length - 1]
      }
    };
    i.fn.each(a, function (e, t) {
      "function" == typeof e && (s[t] = e)
    }), e.exports = s
  }, "98480501": function (e, t, n) {
    var r = n(88981800), a = n(85151090), i = function () {
      this._handlers = {}
    };
    r.fn.each(a, function (e, t) {
      "function" == typeof e && (i.prototype[t] = e)
    }), r.fn.extend(i.prototype, {
      "addListener": function (e) {
        if ("function" != typeof e) throw Error("listener must be a function");
        return this.on("stateChange", e), function () {
          this.off("stateChange", e)
        }.bind(this)
      }, "dispatch": function (e, t) {
        this.onDispatch(e, t)
      }, "onDispatch": r.fn.emptyFunc, "emitChange": function () {
        this.emit("stateChange")
      }
    }), e.exports = i
  }, "98911480": function (e, t) {
    var n;
    !function () {
      function e(e) {
        this.mode = u.MODE_8BIT_BYTE, this.data = e, this.parsedData = [];
        for (var t = [], n = 0, r = this.data.length; r > n; n++) {
          var a = this.data.charCodeAt(n);
          a > 65536 ? (t[0] = 240 | (1835008 & a) >>> 18, t[1] = 128 | (258048 & a) >>> 12, t[2] = 128 | (4032 & a) >>> 6, t[3] = 128 | 63 & a) : a > 2048 ? (t[0] = 224 | (61440 & a) >>> 12, t[1] = 128 | (4032 & a) >>> 6, t[2] = 128 | 63 & a) : a > 128 ? (t[0] = 192 | (1984 & a) >>> 6, t[1] = 128 | 63 & a) : t[0] = a, this.parsedData = this.parsedData.concat(t)
        }
        this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239))
      }

      function t(e, t) {
        this.typeNumber = e, this.errorCorrectLevel = t, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []
      }

      function r(e, t) {
        if (void 0 == e.length) throw new Error(e.length + "/" + t);
        for (var n = 0; n < e.length && 0 == e[n];) n++;
        this.num = new Array(e.length - n + t);
        for (var r = 0; r < e.length - n; r++) this.num[r] = e[r + n]
      }

      function a(e, t) {
        this.totalCount = e, this.dataCount = t
      }

      function i() {
        this.buffer = [], this.length = 0
      }

      function o() {
        return "undefined" != typeof CanvasRenderingContext2D
      }

      function s() {
        var e = !1, t = navigator.userAgent;
        return /android/i.test(t) && (e = !0, aMat = t.toString().match(/android ([0-9]\.[0-9])/i), aMat && aMat[1] && (e = parseFloat(aMat[1]))), e
      }

      function c(e, t) {
        for (var n = 1, r = l(e), a = 0, i = m.length; i >= a; a++) {
          var o = 0;
          switch (t) {
            case f.L:
              o = m[a][0];
              break;
            case f.M:
              o = m[a][1];
              break;
            case f.Q:
              o = m[a][2];
              break;
            case f.H:
              o = m[a][3]
          }
          if (o >= r) break;
          n++
        }
        if (n > m.length) throw new Error("Too long data");
        return n
      }

      function l(e) {
        var t = encodeURI(e).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
        return t.length + (t.length != e ? 3 : 0)
      }

      e.prototype = {
        "getLength": function () {
          return this.parsedData.length
        }, "write": function (e) {
          for (var t = 0, n = this.parsedData.length; n > t; t++) e.put(this.parsedData[t], 8)
        }
      }, t.prototype = {
        "addData": function (t) {
          var n = new e(t);
          this.dataList.push(n), this.dataCache = null
        }, "isDark": function (e, t) {
          if (0 > e || this.moduleCount <= e || 0 > t || this.moduleCount <= t) throw new Error(e + "," + t);
          return this.modules[e][t]
        }, "getModuleCount": function () {
          return this.moduleCount
        }, "make": function () {
          this.makeImpl(!1, this.getBestMaskPattern())
        }, "makeImpl": function (e, n) {
          this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
          for (var r = 0; r < this.moduleCount; r++) {
            this.modules[r] = new Array(this.moduleCount);
            for (var a = 0; a < this.moduleCount; a++) this.modules[r][a] = null
          }
          this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(e, n), this.typeNumber >= 7 && this.setupTypeNumber(e), null == this.dataCache && (this.dataCache = t.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, n)
        }, "setupPositionProbePattern": function (e, t) {
          for (var n = -1; 7 >= n; n++) if (!(-1 >= e + n || this.moduleCount <= e + n)) for (var r = -1; 7 >= r; r++) -1 >= t + r || this.moduleCount <= t + r || (this.modules[e + n][t + r] = n >= 0 && 6 >= n && (0 == r || 6 == r) || r >= 0 && 6 >= r && (0 == n || 6 == n) || n >= 2 && 4 >= n && r >= 2 && 4 >= r)
        }, "getBestMaskPattern": function () {
          for (var e = 0, t = 0, n = 0; 8 > n; n++) {
            this.makeImpl(!0, n);
            var r = p.getLostPoint(this);
            (0 == n || e > r) && (e = r, t = n)
          }
          return t
        }, "createMovieClip": function (e, t, n) {
          var r = e.createEmptyMovieClip(t, n), a = 1;
          this.make();
          for (var i = 0; i < this.modules.length; i++) for (var o = i * a, s = 0; s < this.modules[i].length; s++) {
            var c = s * a, l = this.modules[i][s];
            l && (r.beginFill(0, 100), r.moveTo(c, o), r.lineTo(c + a, o), r.lineTo(c + a, o + a), r.lineTo(c, o + a), r.endFill())
          }
          return r
        }, "setupTimingPattern": function () {
          for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[e][6] && (this.modules[e][6] = 0 == e % 2);
          for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[6][t] && (this.modules[6][t] = 0 == t % 2)
        }, "setupPositionAdjustPattern": function () {
          for (var e = p.getPatternPosition(this.typeNumber), t = 0; t < e.length; t++) for (var n = 0; n < e.length; n++) {
            var r = e[t], a = e[n];
            if (null == this.modules[r][a]) for (var i = -2; 2 >= i; i++) for (var o = -2; 2 >= o; o++) this.modules[r + i][a + o] = -2 == i || 2 == i || -2 == o || 2 == o || 0 == i && 0 == o
          }
        }, "setupTypeNumber": function (e) {
          for (var t = p.getBCHTypeNumber(this.typeNumber), n = 0; 18 > n; n++) {
            var r = !e && 1 == (1 & t >> n);
            this.modules[Math.floor(n / 3)][n % 3 + this.moduleCount - 8 - 3] = r
          }
          for (var n = 0; 18 > n; n++) {
            var r = !e && 1 == (1 & t >> n);
            this.modules[n % 3 + this.moduleCount - 8 - 3][Math.floor(n / 3)] = r
          }
        }, "setupTypeInfo": function (e, t) {
          for (var n = this.errorCorrectLevel << 3 | t, r = p.getBCHTypeInfo(n), a = 0; 15 > a; a++) {
            var i = !e && 1 == (1 & r >> a);
            6 > a ? this.modules[a][8] = i : 8 > a ? this.modules[a + 1][8] = i : this.modules[this.moduleCount - 15 + a][8] = i
          }
          for (var a = 0; 15 > a; a++) {
            var i = !e && 1 == (1 & r >> a);
            8 > a ? this.modules[8][this.moduleCount - a - 1] = i : 9 > a ? this.modules[8][15 - a - 1 + 1] = i : this.modules[8][15 - a - 1] = i
          }
          this.modules[this.moduleCount - 8][8] = !e
        }, "mapData": function (e, t) {
          for (var n = -1, r = this.moduleCount - 1, a = 7, i = 0, o = this.moduleCount - 1; o > 0; o -= 2) for (6 == o && o--; ;) {
            for (var s = 0; 2 > s; s++) if (null == this.modules[r][o - s]) {
              var c = !1;
              i < e.length && (c = 1 == (1 & e[i] >>> a));
              var l = p.getMask(t, r, o - s);
              l && (c = !c), this.modules[r][o - s] = c, a--, -1 == a && (i++, a = 7)
            }
            if (r += n, 0 > r || this.moduleCount <= r) {
              r -= n, n = -n;
              break
            }
          }
        }
      }, t.PAD0 = 236, t.PAD1 = 17, t.createData = function (e, n, r) {
        for (var o = a.getRSBlocks(e, n), s = new i, c = 0; c < r.length; c++) {
          var l = r[c];
          s.put(l.mode, 4), s.put(l.getLength(), p.getLengthInBits(l.mode, e)), l.write(s)
        }
        for (var u = 0, c = 0; c < o.length; c++) u += o[c].dataCount;
        if (s.getLengthInBits() > 8 * u) throw new Error("code length overflow. (" + s.getLengthInBits() + ">" + 8 * u + ")");
        for (s.getLengthInBits() + 4 <= 8 * u && s.put(0, 4); 0 != s.getLengthInBits() % 8;) s.putBit(!1);
        for (; !(s.getLengthInBits() >= 8 * u) && (s.put(t.PAD0, 8), !(s.getLengthInBits() >= 8 * u));) s.put(t.PAD1, 8);
        return t.createBytes(s, o)
      }, t.createBytes = function (e, t) {
        for (var n = 0, a = 0, i = 0, o = new Array(t.length), s = new Array(t.length), c = 0; c < t.length; c++) {
          var l = t[c].dataCount, u = t[c].totalCount - l;
          a = Math.max(a, l), i = Math.max(i, u), o[c] = new Array(l);
          for (var f = 0; f < o[c].length; f++) o[c][f] = 255 & e.buffer[f + n];
          n += l;
          var d = p.getErrorCorrectPolynomial(u), h = new r(o[c], d.getLength() - 1), v = h.mod(d);
          s[c] = new Array(d.getLength() - 1);
          for (var f = 0; f < s[c].length; f++) {
            var m = f + v.getLength() - s[c].length;
            s[c][f] = m >= 0 ? v.get(m) : 0
          }
        }
        for (var g = 0, f = 0; f < t.length; f++) g += t[f].totalCount;
        for (var y = new Array(g), b = 0, f = 0; a > f; f++) for (var c = 0; c < t.length; c++) f < o[c].length && (y[b++] = o[c][f]);
        for (var f = 0; i > f; f++) for (var c = 0; c < t.length; c++) f < s[c].length && (y[b++] = s[c][f]);
        return y
      };
      for (var u = {"MODE_NUMBER": 1, "MODE_ALPHA_NUM": 2, "MODE_8BIT_BYTE": 4, "MODE_KANJI": 8}, f = {
        "L": 1,
        "M": 0,
        "Q": 3,
        "H": 2
      }, d = {
        "PATTERN000": 0,
        "PATTERN001": 1,
        "PATTERN010": 2,
        "PATTERN011": 3,
        "PATTERN100": 4,
        "PATTERN101": 5,
        "PATTERN110": 6,
        "PATTERN111": 7
      }, p = {
        "PATTERN_POSITION_TABLE": [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
        "G15": 1335,
        "G18": 7973,
        "G15_MASK": 21522,
        "getBCHTypeInfo": function (e) {
          for (var t = e << 10; p.getBCHDigit(t) - p.getBCHDigit(p.G15) >= 0;) t ^= p.G15 << p.getBCHDigit(t) - p.getBCHDigit(p.G15);
          return (e << 10 | t) ^ p.G15_MASK
        },
        "getBCHTypeNumber": function (e) {
          for (var t = e << 12; p.getBCHDigit(t) - p.getBCHDigit(p.G18) >= 0;) t ^= p.G18 << p.getBCHDigit(t) - p.getBCHDigit(p.G18);
          return e << 12 | t
        },
        "getBCHDigit": function (e) {
          for (var t = 0; 0 != e;) t++, e >>>= 1;
          return t
        },
        "getPatternPosition": function (e) {
          return p.PATTERN_POSITION_TABLE[e - 1]
        },
        "getMask": function (e, t, n) {
          switch (e) {
            case d.PATTERN000:
              return 0 == (t + n) % 2;
            case d.PATTERN001:
              return 0 == t % 2;
            case d.PATTERN010:
              return 0 == n % 3;
            case d.PATTERN011:
              return 0 == (t + n) % 3;
            case d.PATTERN100:
              return 0 == (Math.floor(t / 2) + Math.floor(n / 3)) % 2;
            case d.PATTERN101:
              return 0 == t * n % 2 + t * n % 3;
            case d.PATTERN110:
              return 0 == (t * n % 2 + t * n % 3) % 2;
            case d.PATTERN111:
              return 0 == (t * n % 3 + (t + n) % 2) % 2;
            default:
              throw new Error("bad maskPattern:" + e)
          }
        },
        "getErrorCorrectPolynomial": function (e) {
          for (var t = new r([1], 0), n = 0; e > n; n++) t = t.multiply(new r([1, h.gexp(n)], 0));
          return t
        },
        "getLengthInBits": function (e, t) {
          if (t >= 1 && 10 > t) switch (e) {
            case u.MODE_NUMBER:
              return 10;
            case u.MODE_ALPHA_NUM:
              return 9;
            case u.MODE_8BIT_BYTE:
              return 8;
            case u.MODE_KANJI:
              return 8;
            default:
              throw new Error("mode:" + e)
          } else if (27 > t) switch (e) {
            case u.MODE_NUMBER:
              return 12;
            case u.MODE_ALPHA_NUM:
              return 11;
            case u.MODE_8BIT_BYTE:
              return 16;
            case u.MODE_KANJI:
              return 10;
            default:
              throw new Error("mode:" + e)
          } else {
            if (!(41 > t)) throw new Error("type:" + t);
            switch (e) {
              case u.MODE_NUMBER:
                return 14;
              case u.MODE_ALPHA_NUM:
                return 13;
              case u.MODE_8BIT_BYTE:
                return 16;
              case u.MODE_KANJI:
                return 12;
              default:
                throw new Error("mode:" + e)
            }
          }
        },
        "getLostPoint": function (e) {
          for (var t = e.getModuleCount(), n = 0, r = 0; t > r; r++) for (var a = 0; t > a; a++) {
            for (var i = 0, o = e.isDark(r, a), s = -1; 1 >= s; s++) if (!(0 > r + s || r + s >= t)) for (var c = -1; 1 >= c; c++) 0 > a + c || a + c >= t || (0 != s || 0 != c) && o == e.isDark(r + s, a + c) && i++;
            i > 5 && (n += 3 + i - 5)
          }
          for (var r = 0; t - 1 > r; r++) for (var a = 0; t - 1 > a; a++) {
            var l = 0;
            e.isDark(r, a) && l++, e.isDark(r + 1, a) && l++, e.isDark(r, a + 1) && l++, e.isDark(r + 1, a + 1) && l++, (0 == l || 4 == l) && (n += 3)
          }
          for (var r = 0; t > r; r++) for (var a = 0; t - 6 > a; a++) e.isDark(r, a) && !e.isDark(r, a + 1) && e.isDark(r, a + 2) && e.isDark(r, a + 3) && e.isDark(r, a + 4) && !e.isDark(r, a + 5) && e.isDark(r, a + 6) && (n += 40);
          for (var a = 0; t > a; a++) for (var r = 0; t - 6 > r; r++) e.isDark(r, a) && !e.isDark(r + 1, a) && e.isDark(r + 2, a) && e.isDark(r + 3, a) && e.isDark(r + 4, a) && !e.isDark(r + 5, a) && e.isDark(r + 6, a) && (n += 40);
          for (var u = 0, a = 0; t > a; a++) for (var r = 0; t > r; r++) e.isDark(r, a) && u++;
          var f = Math.abs(100 * u / t / t - 50) / 5;
          return n += 10 * f
        }
      }, h = {
        "glog": function (e) {
          if (1 > e) throw new Error("glog(" + e + ")");
          return h.LOG_TABLE[e]
        }, "gexp": function (e) {
          for (; 0 > e;) e += 255;
          for (; e >= 256;) e -= 255;
          return h.EXP_TABLE[e]
        }, "EXP_TABLE": new Array(256), "LOG_TABLE": new Array(256)
      }, v = 0; 8 > v; v++) h.EXP_TABLE[v] = 1 << v;
      for (var v = 8; 256 > v; v++) h.EXP_TABLE[v] = h.EXP_TABLE[v - 4] ^ h.EXP_TABLE[v - 5] ^ h.EXP_TABLE[v - 6] ^ h.EXP_TABLE[v - 8];
      for (var v = 0; 255 > v; v++) h.LOG_TABLE[h.EXP_TABLE[v]] = v;
      r.prototype = {
        "get": function (e) {
          return this.num[e]
        }, "getLength": function () {
          return this.num.length
        }, "multiply": function (e) {
          for (var t = new Array(this.getLength() + e.getLength() - 1), n = 0; n < this.getLength(); n++) for (var a = 0; a < e.getLength(); a++) t[n + a] ^= h.gexp(h.glog(this.get(n)) + h.glog(e.get(a)));
          return new r(t, 0)
        }, "mod": function (e) {
          if (this.getLength() - e.getLength() < 0) return this;
          for (var t = h.glog(this.get(0)) - h.glog(e.get(0)), n = new Array(this.getLength()), a = 0; a < this.getLength(); a++) n[a] = this.get(a);
          for (var a = 0; a < e.getLength(); a++) n[a] ^= h.gexp(h.glog(e.get(a)) + t);
          return new r(n, 0).mod(e)
        }
      }, a.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]],
        a.getRSBlocks = function (e, t) {
          var n = a.getRsBlockTable(e, t);
          if (void 0 == n) throw new Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t);
          for (var r = n.length / 3, i = [], o = 0; r > o; o++) for (var s = n[3 * o + 0], c = n[3 * o + 1], l = n[3 * o + 2], u = 0; s > u; u++) i.push(new a(c, l));
          return i
        }, a.getRsBlockTable = function (e, t) {
        switch (t) {
          case f.L:
            return a.RS_BLOCK_TABLE[4 * (e - 1) + 0];
          case f.M:
            return a.RS_BLOCK_TABLE[4 * (e - 1) + 1];
          case f.Q:
            return a.RS_BLOCK_TABLE[4 * (e - 1) + 2];
          case f.H:
            return a.RS_BLOCK_TABLE[4 * (e - 1) + 3];
          default:
            return
        }
      }, i.prototype = {
        "get": function (e) {
          var t = Math.floor(e / 8);
          return 1 == (1 & this.buffer[t] >>> 7 - e % 8)
        }, "put": function (e, t) {
          for (var n = 0; t > n; n++) this.putBit(1 == (1 & e >>> t - n - 1))
        }, "getLengthInBits": function () {
          return this.length
        }, "putBit": function (e) {
          var t = Math.floor(this.length / 8);
          this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++
        }
      };
      var m = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]],
        g = function () {
          var e = function (e, t) {
            this._el = e, this._htOption = t
          };
          return e.prototype.draw = function (e) {
            function t(e, t) {
              var n = document.createElementNS("http://www.w3.org/2000/svg", e);
              for (var r in t) t.hasOwnProperty(r) && n.setAttribute(r, t[r]);
              return n
            }

            var n = this._htOption, r = this._el, a = e.getModuleCount();
            Math.floor(n.width / a), Math.floor(n.height / a), this.clear();
            var i = t("svg", {
              "viewBox": "0 0 " + String(a) + " " + String(a),
              "width": "100%",
              "height": "100%",
              "fill": n.colorLight
            });
            i.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"), r.appendChild(i), i.appendChild(t("rect", {
              "fill": n.colorDark,
              "width": "1",
              "height": "1",
              "id": "template"
            }));
            for (var o = 0; a > o; o++) for (var s = 0; a > s; s++) if (e.isDark(o, s)) {
              var c = t("use", {"x": String(o), "y": String(s)});
              c.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template"), i.appendChild(c)
            }
          }, e.prototype.clear = function () {
            for (; this._el.hasChildNodes();) this._el.removeChild(this._el.lastChild)
          }, e
        }(), y = "svg" === document.documentElement.tagName.toLowerCase(), b = y ? g : o() ? function () {
          function e() {
            this._elImage.src = this._elCanvas.toDataURL("image/png"), this._elImage.style.display = "block", this._elCanvas.style.display = "none"
          }

          function t(e, t) {
            var n = this;
            if (n._fFail = t, n._fSuccess = e, null === n._bSupportDataURI) {
              var r = document.createElement("img"), a = function () {
                n._bSupportDataURI = !1, n._fFail && _fFail.call(n)
              }, i = function () {
                n._bSupportDataURI = !0, n._fSuccess && n._fSuccess.call(n)
              };
              return r.onabort = a, r.onerror = a, r.onload = i, void (r.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
            }
            n._bSupportDataURI === !0 && n._fSuccess ? n._fSuccess.call(n) : n._bSupportDataURI === !1 && n._fFail && n._fFail.call(n)
          }

          if (this._android && this._android <= 2.1) {
            var n = 1 / window.devicePixelRatio, r = CanvasRenderingContext2D.prototype.drawImage;
            CanvasRenderingContext2D.prototype.drawImage = function (e, t, a, i, o, s, c, l) {
              if ("nodeName" in e && /img/i.test(e.nodeName)) for (var u = arguments.length - 1; u >= 1; u--) arguments[u] = arguments[u] * n; else "undefined" == typeof l && (arguments[1] *= n, arguments[2] *= n, arguments[3] *= n, arguments[4] *= n);
              r.apply(this, arguments)
            }
          }
          var a = function (e, t) {
            this._bIsPainted = !1, this._android = s(), this._htOption = t, this._elCanvas = document.createElement("canvas"), this._elCanvas.width = t.width, this._elCanvas.height = t.height, e.appendChild(this._elCanvas), this._el = e, this._oContext = this._elCanvas.getContext("2d"), this._bIsPainted = !1, this._elImage = document.createElement("img"), this._elImage.style.display = "none", this._el.appendChild(this._elImage), this._bSupportDataURI = null
          };
          return a.prototype.draw = function (e) {
            var t = this._elImage, n = this._oContext, r = this._htOption, a = e.getModuleCount(), i = r.width / a,
              o = r.height / a, s = Math.round(i), c = Math.round(o);
            t.style.display = "none", this.clear();
            for (var l = 0; a > l; l++) for (var u = 0; a > u; u++) {
              var f = e.isDark(l, u), d = u * i, p = l * o;
              n.strokeStyle = f ? r.colorDark : r.colorLight, n.lineWidth = 1, n.fillStyle = f ? r.colorDark : r.colorLight, n.fillRect(d, p, i, o), n.strokeRect(Math.floor(d) + .5, Math.floor(p) + .5, s, c), n.strokeRect(Math.ceil(d) - .5, Math.ceil(p) - .5, s, c)
            }
            this._bIsPainted = !0
          }, a.prototype.makeImage = function () {
            this._bIsPainted && t.call(this, e)
          }, a.prototype.isPainted = function () {
            return this._bIsPainted
          }, a.prototype.clear = function () {
            this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height), this._bIsPainted = !1
          }, a.prototype.round = function (e) {
            return e ? Math.floor(1e3 * e) / 1e3 : e
          }, a
        }() : function () {
          var e = function (e, t) {
            this._el = e, this._htOption = t
          };
          return e.prototype.draw = function (e) {
            for (var t = this._htOption, n = this._el, r = e.getModuleCount(), a = Math.floor(t.width / r), i = Math.floor(t.height / r), o = ['<table style="border:0;border-collapse:collapse;">'], s = 0; r > s; s++) {
              o.push("<tr>");
              for (var c = 0; r > c; c++) o.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + a + "px;height:" + i + "px;background-color:" + (e.isDark(s, c) ? t.colorDark : t.colorLight) + ';"></td>');
              o.push("</tr>")
            }
            o.push("</table>"), n.innerHTML = o.join("");
            var l = n.childNodes[0], u = (t.width - l.offsetWidth) / 2, f = (t.height - l.offsetHeight) / 2;
            u > 0 && f > 0 && (l.style.margin = f + "px " + u + "px")
          }, e.prototype.clear = function () {
            this._el.innerHTML = ""
          }, e
        }();
      n = function (e, t) {
        if (this._htOption = {
          "width": 256,
          "height": 256,
          "typeNumber": 4,
          "colorDark": "#000000",
          "colorLight": "#ffffff",
          "correctLevel": f.H
        }, "string" == typeof t && (t = {"text": t}), t) for (var n in t) this._htOption[n] = t[n];
        "string" == typeof e && (e = document.getElementById(e)), this._android = s(), this._el = e, this._oQRCode = null, this._oDrawing = new b(this._el, this._htOption), this._htOption.text && this.makeCode(this._htOption.text)
      }, n.prototype.makeCode = function (e) {
        this._oQRCode = new t(c(e, this._htOption.correctLevel), this._htOption.correctLevel), this._oQRCode.addData(e), this._oQRCode.make(), this._el.title = e, this._oDrawing.draw(this._oQRCode), this.makeImage()
      }, n.prototype.makeImage = function () {
        "function" == typeof this._oDrawing.makeImage && (!this._android || this._android >= 3) && this._oDrawing.makeImage()
      }, n.prototype.clear = function () {
        this._oDrawing.clear()
      }, n.CorrectLevel = f
    }(), e.exports = n
  }, "99817079": function (e, t, n) {
    function r(e) {
      var t = "reportImage_" + (new Date).getTime() + "_" + Math.random(), n = y[t] = new Image;
      n.onload = n.onerror = function () {
        y[t] = null
      }, n.src = e
    }

    function a() {
      try {
        var e = _.shift();
        e && r(e)
      } catch (t) {
      }
      f = setTimeout(a, w)
    }

    var i = n(88981800), o = 7, s = function () {
      return +new Date
    }, c = i.fn.getParams(), l = n(43866881), u = location.href.match(/(\w+)(?=\.(shtml|html))/);
    u = u ? u[0] : null;
    var f, d = {"offermedia": c.appid ? c.appid.split(",")[0] : "", "servicecode": ""},
      p = ["offermedia", "servicecode"], h = 1, v = n(105812088), m = {
        "tradetime": {"dbIndex": "6"},
        "qquin": {"dbIndex": "3"},
        "resultcode": {"dbIndex": "7"},
        "servicecode": {"dbIndex": "19"},
        "pid": {"dbIndex": "13"},
        "iformat": {"dbIndex": "21"},
        "offerId": {"dbIndex": "24"},
        "offermedia": {"dbIndex": "25"},
        "quantity": {"dbIndex": "23"},
        "device": {"dbIndex": "31"},
        "action": {"dbIndex": "20"},
        "firstreq": {"dbIndex": "37"},
        "tokentime": {"dbIndex": "38"},
        "amtunit": {"dbIndex": "41"},
        "isbatch": {"dbIndex": "43"},
        "offerplatform": {"dbIndex": "26"},
        "setid": {"dbIndex": "50"},
        "refer": {"dbIndex": "42"},
        "costcoin": {"dbIndex": "51"},
        "requrl": {"dbIndex": "36"},
        "aerr": {"dbIndex": "35"},
        "resultinfo": {
          "dbIndex": "8", "serialize": function (e) {
            var t = i.lang.isObject(e);
            if (!t) return "";
            var n = [];
            return i.fn.each(e, function (e, t) {
              n.push(t + "=" + encodeURIComponent(e))
            }), n.join("&")
          }
        },
        "askedqquin": {"dbIndex": "4"},
        "transactionid": {"dbIndex": "29"}
      }, g = function () {
        var e, t = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
        return t && (e = t.timing), e ? e.navigationStart : ""
      }, y = window, b = "1" == window._USE_REPORT_QUEUE, _ = [], w = 1e3;
    b && (f = setTimeout(a, w));
    var x = function (e, t) {
      if (e && u) {
        t = t || {};
        var n = t.queued;
        delete t.queued, b && (n = !0);
        var a = {};
        e = String.format("{type}.{iformat}", {"type": u, "iformat": e});
        var f, p = [], h = s();
        i.Raven.captureBreadcrumb(e, t), i.fn.extend(a, t, d, {
          "iformat": e,
          "resultcode": t.resultcode || "0",
          "tradetime": t.tradetime || "10",
          "transactionid": v,
          "qquin": c.openid || +i.cookie.get("uin").replace(/[^\d]/g, "") || i.cookie.get("midas_openid"),
          "isbatch": c.session_type || "",
          "offerId": c.appid || "",
          "firstreq": c.session_id || "",
          "amtunit": c.wxappid || "",
          "costcoin": c.aid || "",
          "aerr": g(),
          "offerplatform": c.pf || "",
          "tokentime": h,
          "device": "minipayv2",
          "setid": navigator.userAgent,
          "refer": "string" == typeof document.referrer ? encodeURIComponent(document.referrer.substr(0, 1e3)) : "",
          "requrl": encodeURIComponent(location.href)
        }), i.fn.each(a, function (e, t) {
          f = m[t], f && p.push(f.dbIndex + "=" + encodeURIComponent(f.serialize ? f.serialize(e) : e))
        });
        var y, w = ["game.pv", "goods.pv", "qb.pv", "month.pv"].indexOf(a.iformat) > -1;
        y = l.isDev || l.isSandbox || w ? String.format("//{domain}api.unipay.qq.com/v1/900/15499/log_data?num=1&record0={report}&rr={r}", {
          "domain": l.isDev || l.isSandbox ? "sandbox." : "",
          "report": encodeURIComponent(p.join("|")),
          "r": Math.random()
        }) : String.format("//szmg.qq.com/cgi-bin/log_data.fcg?num=1&record0={report}&rr={r}", {
          "report": encodeURIComponent(p.join("|")),
          "r": Math.random()
        }), n ? _.push(y) : r(y), _.length >= o && E.flush()
      }
    }, C = {}, k = {
      "_maxCount": 3, "getTimeTick": function () {
        return s()
      }, "userTrace": function (e, t) {
        if (t = t || {}, C[e]) {
          var n = this.getTimeTick(), r = C[e];
          x(e, {"resultinfo": i.fn.extend({"times": n - r.timeStart}, r.options)}), delete C[e]
        } else {
          var a = t.startTime || this.getTimeTick();
          delete t.startTime, C[e] = {"timeStart": a, "options": t}
        }
      }, "reportPerformance": function () {
        var e, t = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
        if (t && (e = t.timing), e && e.navigationStart > 0) {
          var n = e.loadEventEnd - e.navigationStart;
          if (n <= 0) {
            return void setTimeout(function () {
              k._maxCount-- > 0 && k.reportPerformance()
            }, 200)
          }
          for (var r = 0, a = 0, i = 0, o = t.getEntries && t.getEntries() || [], s = 0; s < o.length; s++) {
            var c = o[s];
            /\.js$/.test(c.name) ? r += c.duration : /\.css$/.test(c.name) ? a += c.duration : (/\.jpe{0,1}g$/.test(c.name) || /\.png$/.test(c.name) || /\.gif$/.test(c.name)) && (i += c.duration)
          }
          var l = e.domainLookupEnd - e.domainLookupStart, u = e.connectEnd - e.connectStart,
            f = e.responseEnd - e.requestStart, d = e.domComplete - e.responseEnd,
            p = e.responseStart - e.navigationStart;
          x("timer.firstpage", {
            "action": n,
            "resultinfo": {
              "times": n,
              "dns": l,
              "connect": u,
              "pageRTD": f,
              "dom": d,
              "ttfb": p,
              "js": r,
              "css": a,
              "img": i
            }
          })
        } else x("timer.ffirstpage", {"action": k.getTimeTick() - __startTime});
        k.reportPerformance = function () {
          throw new Error("reportPerformance 用于上报从请求发出到Dom Ready之间的性能数据，不需要重复上报")
        }
      }
    }, E = function (e, t) {
      x(e, t)
    };
    E.times = function (e, t, n) {
      e && E(e, i.fn.extend({"resultinfo": {"times": t}}, n))
    }, E.queue = function (e, t) {
      e && (t = t || {}, t.queued = !0, E(e, t))
    }, E.flush = function () {
      try {
        for (var e = _.length, t = _.splice(0, e), n = 0, e = t.length; n < e; ++n) t[n] && r(t[n])
      } catch (a) {
      }
    }, E.user = {
      "action": function (e, t, n) {
        var r = {"action": t, "pid": h};
        i.lang.isObject(n) && (r.resultinfo = n), E(e, r), h++
      }, "setReportFields": function (e) {
        i.fn.each(e, function (e, t) {
          p.indexOf(t) > -1 && (d[t] = e || "")
        })
      }
    }, E.Performance = k, n.e(1, function (e) {
      var t = n(80008990);
      t.run()
    }), e.exports = E
  }, "100152084": function (e, t) {
    "serviceWorker" in navigator && "undefined" != typeof caches && "undefined" != typeof fetch && "undefined" != typeof Promise && navigator.serviceWorker.register("/midas/minipay_v2/views/serviceWorker.js").then(function (e) {
    })["catch"](function (e) {
    })
  }, "105812088": function (e, t, n) {
    var r = n(88981800);
    e.exports = window._activity_api_session_token || r.fn.uuid() + (new Date).getTime()
  }, "107740998": function (e, t) {
    function n(e) {
      return d(r(f(e), e.length * h))
    }

    function r(e, t) {
      e[t >> 5] |= 128 << t % 32, e[(t + 64 >>> 9 << 4) + 14] = t;
      for (var n = 1732584193, r = -271733879, a = -1732584194, u = 271733878, f = 0; f < e.length; f += 16) {
        var d = n, p = r, h = a, v = u;
        n = i(n, r, a, u, e[f + 0], 7, -680876936), u = i(u, n, r, a, e[f + 1], 12, -389564586), a = i(a, u, n, r, e[f + 2], 17, 606105819), r = i(r, a, u, n, e[f + 3], 22, -1044525330), n = i(n, r, a, u, e[f + 4], 7, -176418897), u = i(u, n, r, a, e[f + 5], 12, 1200080426), a = i(a, u, n, r, e[f + 6], 17, -1473231341), r = i(r, a, u, n, e[f + 7], 22, -45705983), n = i(n, r, a, u, e[f + 8], 7, 1770035416), u = i(u, n, r, a, e[f + 9], 12, -1958414417), a = i(a, u, n, r, e[f + 10], 17, -42063), r = i(r, a, u, n, e[f + 11], 22, -1990404162), n = i(n, r, a, u, e[f + 12], 7, 1804603682), u = i(u, n, r, a, e[f + 13], 12, -40341101), a = i(a, u, n, r, e[f + 14], 17, -1502002290), r = i(r, a, u, n, e[f + 15], 22, 1236535329), n = o(n, r, a, u, e[f + 1], 5, -165796510), u = o(u, n, r, a, e[f + 6], 9, -1069501632), a = o(a, u, n, r, e[f + 11], 14, 643717713), r = o(r, a, u, n, e[f + 0], 20, -373897302), n = o(n, r, a, u, e[f + 5], 5, -701558691), u = o(u, n, r, a, e[f + 10], 9, 38016083), a = o(a, u, n, r, e[f + 15], 14, -660478335), r = o(r, a, u, n, e[f + 4], 20, -405537848), n = o(n, r, a, u, e[f + 9], 5, 568446438), u = o(u, n, r, a, e[f + 14], 9, -1019803690), a = o(a, u, n, r, e[f + 3], 14, -187363961), r = o(r, a, u, n, e[f + 8], 20, 1163531501), n = o(n, r, a, u, e[f + 13], 5, -1444681467), u = o(u, n, r, a, e[f + 2], 9, -51403784), a = o(a, u, n, r, e[f + 7], 14, 1735328473), r = o(r, a, u, n, e[f + 12], 20, -1926607734), n = s(n, r, a, u, e[f + 5], 4, -378558), u = s(u, n, r, a, e[f + 8], 11, -2022574463), a = s(a, u, n, r, e[f + 11], 16, 1839030562), r = s(r, a, u, n, e[f + 14], 23, -35309556), n = s(n, r, a, u, e[f + 1], 4, -1530992060), u = s(u, n, r, a, e[f + 4], 11, 1272893353), a = s(a, u, n, r, e[f + 7], 16, -155497632), r = s(r, a, u, n, e[f + 10], 23, -1094730640), n = s(n, r, a, u, e[f + 13], 4, 681279174), u = s(u, n, r, a, e[f + 0], 11, -358537222), a = s(a, u, n, r, e[f + 3], 16, -722521979), r = s(r, a, u, n, e[f + 6], 23, 76029189), n = s(n, r, a, u, e[f + 9], 4, -640364487), u = s(u, n, r, a, e[f + 12], 11, -421815835), a = s(a, u, n, r, e[f + 15], 16, 530742520), r = s(r, a, u, n, e[f + 2], 23, -995338651), n = c(n, r, a, u, e[f + 0], 6, -198630844), u = c(u, n, r, a, e[f + 7], 10, 1126891415), a = c(a, u, n, r, e[f + 14], 15, -1416354905), r = c(r, a, u, n, e[f + 5], 21, -57434055), n = c(n, r, a, u, e[f + 12], 6, 1700485571), u = c(u, n, r, a, e[f + 3], 10, -1894986606), a = c(a, u, n, r, e[f + 10], 15, -1051523), r = c(r, a, u, n, e[f + 1], 21, -2054922799), n = c(n, r, a, u, e[f + 8], 6, 1873313359), u = c(u, n, r, a, e[f + 15], 10, -30611744), a = c(a, u, n, r, e[f + 6], 15, -1560198380), r = c(r, a, u, n, e[f + 13], 21, 1309151649), n = c(n, r, a, u, e[f + 4], 6, -145523070), u = c(u, n, r, a, e[f + 11], 10, -1120210379), a = c(a, u, n, r, e[f + 2], 15, 718787259), r = c(r, a, u, n, e[f + 9], 21, -343485551), n = l(n, d), r = l(r, p), a = l(a, h), u = l(u, v)
      }
      return Array(n, r, a, u)
    }

    function a(e, t, n, r, a, i) {
      return l(u(l(l(t, e), l(r, i)), a), n)
    }

    function i(e, t, n, r, i, o, s) {
      return a(t & n | ~t & r, e, t, i, o, s)
    }

    function o(e, t, n, r, i, o, s) {
      return a(t & r | n & ~r, e, t, i, o, s)
    }

    function s(e, t, n, r, i, o, s) {
      return a(t ^ n ^ r, e, t, i, o, s)
    }

    function c(e, t, n, r, i, o, s) {
      return a(n ^ (t | ~r), e, t, i, o, s)
    }

    function l(e, t) {
      var n = (65535 & e) + (65535 & t), r = (e >> 16) + (t >> 16) + (n >> 16);
      return r << 16 | 65535 & n
    }

    function u(e, t) {
      return e << t | e >>> 32 - t
    }

    function f(e) {
      for (var t = Array(), n = (1 << h) - 1, r = 0; r < e.length * h; r += h) t[r >> 5] |= (e.charCodeAt(r / h) & n) << r % 32;
      return t
    }

    function d(e) {
      for (var t = p ? "0123456789ABCDEF" : "0123456789abcdef", n = "", r = 0; r < 4 * e.length; r++) n += t.charAt(e[r >> 2] >> r % 4 * 8 + 4 & 15) + t.charAt(e[r >> 2] >> r % 4 * 8 & 15);
      return n
    }

    var p = 0, h = 8;
    e.exports = {"hex_md5": n}
  }, "111001777": function (module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
      function IE() {
        if (window.VBArray) {
          var e = document.documentMode;
          return e ? e : window.XMLHttpRequest ? 7 : 6
        }
        return 0
      }

      function parseJS(e) {
        var t = eval;
        if (e = e.trim()) if (1 === e.indexOf("use strict")) {
          var n = document.createElement("script");
          n.text = e, head.appendChild(n).parentNode.removeChild(n)
        } else t(e)
      }

      function parseXML(e, t, n) {
        try {
          var r = document.documentMode;
          window.DOMParser && (!r || r > 8) ? (n = new DOMParser, t = n.parseFromString(e, "text/xml")) : (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e))
        } catch (a) {
          t = void 0
        }
        return t && t.documentElement && !t.getElementsByTagName("parsererror").length || avalon.error("Invalid XML: " + e), t
      }

      function ajaxExtend(e) {
        e = avalon.mix({}, defaults, e), e.type = e.type.toUpperCase();
        var t = "string" == typeof e.data ? e.data : avalon.param(e.data);
        if (e.querystring = t || "", e.url = e.url.replace(rhash, "").replace(rprotocol, location.protocol + "//"), "boolean" != typeof e.crossDomain) {
          var n = document.createElement("a");
          try {
            n.href = e.url;
            var r = "1"[0] ? n.href : n.getAttribute("href", 4);
            n.href = r, e.crossDomain = originAnchor.protocol + "//" + originAnchor.host != n.protocol + "//" + n.host
          } catch (a) {
            e.crossDomain = !0
          }
        }
        return e.hasContent = !rnoContent.test(e.type), e.hasContent || (t && (e.url += (rquery.test(e.url) ? "&" : "?") + t), e.cache === !1 && (e.url += (rquery.test(e.url) ? "&" : "?") + "_time=" + (new Date - 0))), e
      }

      function ok(e) {
        return e
      }

      function ng(e) {
        throw e
      }

      function paramInner(e, t, n) {
        var r;
        if (Array.isArray(t)) avalon.each(t, function (t, r) {
          rbracket.test(e) ? n(e, r) : paramInner(e + "[" + ("object" == typeof r ? t : "") + "]", r, n)
        }); else if (avalon.isPlainObject(t)) for (r in t) paramInner(e + "[" + r + "]", t[r], n); else n(e, t)
      }

      function tryDecodeURIComponent(e) {
        try {
          return decodeURIComponent(e)
        } catch (t) {
          return e
        }
      }

      function addSubObject(e, t, n) {
        var r = t.match(r5b5d);
        if (!r) return !0;
        for (var a, i, o, s = [], c = !0; (i = t.lastIndexOf("%5B")) && i !== -1;) o = t.slice(i).slice(3, -3), t = t.slice(0, i), "" === o ? s.unshift({"action": "pushArrayElement"}) : (o >>> 0) + "" === o ? s.unshift({
          "action": "setSubArray",
          "value": o
        }) : c ? s.unshift({
          "action": "setObjectProperty",
          "value": tryDecodeURIComponent(o)
        }) : s.unshift({"action": "setSubObjet", "value": tryDecodeURIComponent(o)}), c = !1;
        for (c = !0; a = s.shift();) {
          var l = /Object/.test(a.action);
          switch (c && (t in e || (e[t] = l ? {} : []), c = !1, e = e[t]), a.action) {
            case"pushArrayElement":
              e.push(n);
              break;
            case"setObjectProperty":
              e[a.value] = n;
              break;
            case"setSubObjet":
              a.value in e || (e[a.value] = {}), e = e[a.value];
              break;
            case"setSubArray":
              a.value in e || (e[a.value] = []), e = e[a.value]
          }
        }
      }

      function trimLine(e) {
        return e.replace(rline, "\r\n")
      }

      var avalon = __webpack_require__(80667616);
      __webpack_require__(115781265);
      var global = window, DOC = global.document, encode = encodeURIComponent, decode = decodeURIComponent,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rhash = /#.*$/,
        rquery = /\?/, rjsonp = /(=)\?(?=&|$)|\?\?/, r20 = /%20/g, radd = /\+/g, r5b5d = /%5B(.*?)%5D$/,
        originAnchor = document.createElement("a");
      originAnchor.href = location.href;
      var accepts = {
        "xml": "application/xml, text/xml",
        "html": "text/html",
        "text": "text/plain",
        "json": "application/json, text/javascript",
        "script": "text/javascript, application/javascript",
        "*": ["*/"] + ["*"]
      }, useOnload = 0 === IE() || IE() > 8;
      String.prototype.startsWith || (String.prototype.startsWith = function (e, t) {
        return t = t || 0, this.lastIndexOf(e, t) === t
      });
      var head = DOC.getElementsByTagName("head")[0], isLocal = !1;
      try {
        isLocal = rlocalProtocol.test(location.protocol)
      } catch (e) {
      }
      new function () {
        var s = ["XMLHttpRequest", "ActiveXObject('MSXML2.XMLHTTP.6.0')", "ActiveXObject('MSXML2.XMLHTTP.3.0')", "ActiveXObject('MSXML2.XMLHTTP')", "ActiveXObject('Microsoft.XMLHTTP')"];
        s[0] = IE() < 8 && 0 !== IE() && isLocal ? "!" : s[0];
        for (var i = 0, axo; axo = s[i++];) try {
          if (eval("new " + axo)) {
            avalon.xhr = new Function("return new " + axo);
            break
          }
        } catch (e) {
        }
      };
      var supportCors = "withCredentials" in avalon.xhr(), defaults = {
        "type": "GET",
        "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
        "async": !0,
        "jsonp": "callback"
      }, XHRMethods = {
        "setRequestHeader": function (e, t) {
          return this.requestHeaders[e] = t, this
        }, "getAllResponseHeaders": function () {
          return 4 === this.readyState ? this.responseHeadersString : null
        }, "getResponseHeader": function (e, t) {
          if (4 === this.readyState) {
            for (; t = rheaders.exec(this.responseHeadersString);) this.responseHeaders[t[1]] = t[2];
            t = this.responseHeaders[e]
          }
          return void 0 === t ? null : t
        }, "overrideMimeType": function (e) {
          return this.mimeType = e, this
        }, "abort": function (e) {
          return e = e || "abort", this.transport && this.respond(0, e), this
        }, "dispatch": function (e, t) {
          var n = t;
          if (this.transport) {
            this.readyState = 4;
            var r = e >= 200 && e < 300 || 304 === e;
            if (r) if (204 === e) n = "nocontent"; else if (304 === e) n = "notmodified"; else if ("undefined" == typeof this.response) {
              var a = this.options.dataType || this.options.mimeType;
              (!a && this.responseText || this.responseXML) && (a = this.getResponseHeader("Content-Type") || "", a = a.match(/json|xml|script|html/i) || ["text"], a = a[0].toLowerCase());
              var i = this.responseText || "", o = this.responseXML || "";
              try {
                this.response = avalon.ajaxConverters[a].call(this, i, o)
              } catch (s) {
                r = !1, this.error = s, n = "parsererror"
              }
            }
            this.status = e, this.statusText = n + "", this.timeoutID && (clearTimeout(this.timeoutID), delete this.timeoutID), this._transport = this.transport;
            var c = this;
            r ? (this._resolve([this.response, n, this]), window.setTimeout(function () {
              avalon.ajaxGlobalEvents.success(c, c.options, c.response)
            }, 0)) : (this._reject([this, n, this.error]), window.setTimeout(function () {
              avalon.ajaxGlobalEvents.error(c, c.options, n)
            }, 0)), delete this.transport, ajaxActive--, window.setTimeout(function () {
              avalon.ajaxGlobalEvents.complete(c, c.options)
            }, 0), 0 === ajaxActive && window.setTimeout(function () {
              avalon.ajaxGlobalEvents.stop()
            }, 0)
          }
        }
      }, ajaxActive = 0;
      avalon.ajax = function (e, t) {
        e && e.url || avalon.error("参数必须为Object并且拥有url属性"), e = ajaxExtend(e);
        var n, r, a = {
          "responseHeadersString": "",
          "responseHeaders": {},
          "requestHeaders": {},
          "querystring": e.querystring,
          "readyState": 0,
          "uniqueID": ("" + Math.random()).replace(/0\./, ""),
          "status": 0
        }, t = new avalon.Promise(function (e, t) {
          r = e, n = t
        });
        t.options = e, t._reject = n, t._resolve = r;
        var i = [], o = [];
        Array("done", "fail", "always").forEach(function (e) {
          t[e] = function (t) {
            return "function" == typeof t && ("fail" !== e && i.push(t), "done" !== e && o.push(t)), this
          }
        });
        var s = e.async === !1;
        s && (avalon.log("warnning:与jquery1.8一样,async:false这配置已经被废弃"), t.async = !1), avalon.mix(t, a, XHRMethods), t.then(function (e) {
          e = Array.isArray(e) ? e : void 0 === e ? [] : [e];
          for (var n, r = 0; n = i[r++];) n.apply(t, e);
          return e
        }, function (e) {
          e = Array.isArray(e) ? e : void 0 === e ? [] : [e];
          for (var n, r = 0; n = o[r++];) n.apply(t, e);
          return e
        }), t.done(e.success).fail(e.error).always(e.complete);
        var c = e.dataType, l = avalon.ajaxTransports;
        (e.crossDomain && !supportCors || rjsonp.test(e.url)) && "json" === c && "GET" === e.type && (c = e.dataType = "jsonp");
        var u = e.form ? "upload" : c, f = l[u] || l.xhr;
        avalon.mix(t, f), t.preproccess && (c = t.preproccess() || c), e.contentType && t.setRequestHeader("Content-Type", e.contentType), t.setRequestHeader("Accept", accepts[c] ? accepts[c] + ", */*; q=0.01" : accepts["*"]);
        for (var d in e.headers) t.setRequestHeader(d, e.headers[d]);
        return e.async && e.timeout > 0 && (t.timeoutID = setTimeout(function () {
          t.abort("timeout"), t.dispatch(0, "timeout")
        }, e.timeout)), 0 === ajaxActive && avalon.ajaxGlobalEvents.start(), avalon.ajaxGlobalEvents.send(t, e), ajaxActive++, t.request(), t
      }, "get,post".replace(avalon.rword, function (e) {
        avalon[e] = function (t, n, r, a) {
          return "function" == typeof n && (a = a || r, r = n, n = void 0), avalon.ajax({
            "type": e,
            "url": t,
            "data": n,
            "success": r,
            "dataType": a
          })
        }
      }), avalon.getScript = function (e, t) {
        return avalon.get(e, null, t, "script")
      }, avalon.getJSON = function (e, t, n) {
        return avalon.get(e, t, n, "json")
      }, avalon.upload = function (e, t, n, r, a) {
        return "function" == typeof n && (a = r, r = n, n = void 0), avalon.ajax({
          "url": e,
          "type": "post",
          "dataType": a,
          "form": t,
          "data": n,
          "success": r
        })
      }, avalon.ajaxGlobalEvents = {}, ["start", "stop", "complete", "error", "success", "send"].forEach(function (e) {
        avalon.ajaxGlobalEvents[e] = avalon.noop
      }), avalon.ajaxConverters = {
        "text": function (e) {
          return e
        }, "xml": function (e, t) {
          return void 0 !== t ? t : parseXML(e)
        }, "html": function (e) {
          return avalon.parseHTML(e)
        }, "json": function (e) {
          return avalon.parseJSON || avalon.log("avalon.parseJSON不存在,请升级到最新版"), avalon.parseJSON(e)
        }, "script": function (e) {
          return parseJS(e), e
        }, "jsonp": function () {
          var e, t;
          return this.jsonpCallback.startsWith("avalon.") ? (t = this.jsonpCallback.replace(/avalon\./, ""), e = avalon[t], delete avalon[t]) : e = window[this.jsonpCallback], e
        }
      };
      var rbracket = /\[\]$/;
      avalon.param = function (e) {
        var t, n = [], r = function (e, t) {
          t = "function" == typeof t ? t() : null == t ? "" : t, n[n.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (Array.isArray(e)) avalon.each(e, r); else for (t in e) paramInner(t, e[t], r);
        return n.join("&").replace(r20, "+")
      }, avalon.unparam = function (e, t, n) {
        t = t || "&", n = n || "=";
        var r = {};
        if ("string" != typeof e || 0 === e.length) return r;
        e.indexOf("?") !== -1 && (e = e.split("?").pop());
        for (var a, i = e.split(t), o = 0; a = i[o++];) {
          var s = a.split("=");
          if (1 === s.length) r[s[0]] = ""; else {
            var c = s[0].replace(radd, "%20"), l = tryDecodeURIComponent(s.slice(1).join("=").replace(radd, " "));
            if (addSubObject(r, c, l)) {
              var u = tryDecodeURIComponent(c);
              Object.prototype.hasOwnProperty.call(r, u) ? Array.isArray(r[u]) ? r[u].push(l) : r[u] = [r[u], l] : r[u] = l
            }
          }
        }
        return r
      };
      var rinput = /select|input|button|textarea/i, rcheckbox = /radio|checkbox/, rline = /\r?\n/g;
      avalon.serialize = function (e) {
        var t = {};
        return Array.prototype.filter.call(e.getElementsByTagName("*"), function (e) {
          if (rinput.test(e.nodeName) && e.name && !e.disabled) return !rcheckbox.test(e.type) || e.checked
        }).forEach(function (e) {
          var n = avalon(e).val();
          n = Array.isArray(n) ? n.map(trimLine) : trimLine(n);
          var r = e.name;
          r in t ? Array.isArray(n) ? t[r].push(n) : t[r] = [t[r], n] : t[r] = n
        }), avalon.param(t, !1)
      };
      var transports = avalon.ajaxTransports = {
        "xhr": {
          "request": function () {
            var e = this, t = this.options, n = this.transport = new avalon.xhr;
            n.open(t.type, t.url, t.async, t.username, t.password), this.mimeType && n.overrideMimeType && n.overrideMimeType(this.mimeType), t.crossDomain && "withCredentials" in n && (n.withCredentials = !0), t.crossDomain || (this.requestHeaders["X-Requested-With"] = "XMLHttpRequest");
            for (var r in this.requestHeaders) n.setRequestHeader(r, this.requestHeaders[r] + "");
            if (t.progressCallback) {
              var a = document.all && !window.atob;
              a || (n.upload.onprogress = t.progressCallback)
            }
            var i = t.dataType;
            "responseType" in n && /^(blob|arraybuffer|text)$/.test(i) && (n.responseType = i, this.useResponseType = !0), n.send(t.hasContent && (this.formdata || this.querystring) || null), t.async && 4 !== n.readyState ? useOnload ? n.onload = n.onerror = function (t) {
              this.readyState = 4, this.status = "load" === t.type ? 200 : 500, e.respond()
            } : n.onreadystatechange = function () {
              e.respond()
            } : this.respond()
          }, "respond": function (e, t) {
            var n = this.transport;
            if (n) {
              t && this.timeoutID && (clearTimeout(this.timeoutID), delete this.timeoutID);
              try {
                var r = 4 === n.readyState;
                if (t || r) if (n.onreadystatechange = avalon.noop, useOnload && (n.onerror = n.onload = null), t) r || "function" != typeof n.abort || n.abort(); else {
                  var a = n.status, i = n.responseText;
                  this.responseText = "string" == typeof i ? i : void 0;
                  try {
                    var o = n.responseXML;
                    this.responseXML = o.documentElement
                  } catch (s) {
                  }
                  this.useResponseType && (this.response = n.response), this.responseHeadersString = n.getAllResponseHeaders();
                  try {
                    var c = n.statusText
                  } catch (s) {
                    this.error = s, c = "firefoxAccessError"
                  }
                  a || !isLocal || this.options.crossDomain ? 1223 === a && (a = 204) : a = this.responseText ? 200 : 404, this.dispatch(a, c)
                }
              } catch (l) {
                t || this.dispatch(500, l)
              }
            }
          }
        }, "jsonp": {
          "preproccess": function () {
            var e = this.options, t = this.jsonpCallback = e.jsonpCallback || "avalon.jsonp" + setTimeout("1");
            return rjsonp.test(e.url) ? e.url = e.url.replace(rjsonp, "$1" + t) : e.url = e.url + (rquery.test(e.url) ? "&" : "?") + e.jsonp + "=" + t, t.startsWith("avalon.") ? (t = t.replace(/avalon\./, ""), avalon[t] = function (e) {
              avalon[t] = e
            }) : window[t] = function (e) {
              window[t] = e
            }, "script"
          }
        }, "script": {
          "request": function () {
            var e = this.options, t = this.transport = DOC.createElement("script");
            e.charset && (t.charset = e.charset);
            var n = this;
            t.onerror = t[useOnload ? "onload" : "onreadystatechange"] = function () {
              n.respond()
            }, t.src = e.url, head.insertBefore(t, head.firstChild)
          }, "respond": function (e, t) {
            var n = this.transport;
            if (n) {
              t && this.timeoutID && (clearTimeout(this.timeoutID), delete this.timeoutID);
              var r = /loaded|complete|undefined/i.test(n.readyState);
              if (t || r) {
                n.onerror = n.onload = n.onreadystatechange = null;
                var a = n.parentNode;
                if (a && a.removeChild(n), !t) {
                  var i;
                  if (this.jsonpCallback) {
                    var o = this.jsonpCallback.startsWith("avalon.") ? avalon[this.jsonpCallback.replace(/avalon\./, "")] : window[this.jsonpCallback];
                    i = "function" == typeof o ? [500, "error"] : [200, "success"]
                  } else i = [200, "success"];
                  this.dispatch.apply(this, i)
                }
              }
            }
          }
        }, "upload": {
          "preproccess": function () {
            var e, t = this.options;
            "function" == typeof t.form.append ? (e = t.form, t.contentType = "") : e = new FormData(t.form), avalon.each(t.data, function (t, n) {
              e.append(t, n)
            }), this.formdata = e
          }
        }
      };
      if (avalon.mix(transports.jsonp, transports.script), avalon.mix(transports.upload, transports.xhr), !window.FormData) {
        var str = 'Function BinaryToArray(binary)\r\n\t                 Dim oDic\r\n\t                 Set oDic = CreateObject("scripting.dictionary")\r\n\t                 length = LenB(binary) - 1\r\n\t                 For i = 1 To length\r\n\t                     oDic.add i, AscB(MidB(binary, i, 1))\r\n\t                 Next\r\n\t                 BinaryToArray = oDic.Items\r\n\t              End Function';
        execScript(str, "VBScript"), avalon.fixAjax = function () {
          function e(e) {
            var t = avalon.parseHTML("<iframe  id='" + e + "' name='" + e + "' style='position:absolute;left:-9999px;top:-9999px;'/>").firstChild;
            return (DOC.body || DOC.documentElement).insertBefore(t, null)
          }

          function t(e, t) {
            var n, r, a, i, o, s = [];
            for (n in t) for (r = Array.isArray(t[n]), a = r ? t[n] : [t[n]], i = 0; i < a.length; i++) o = DOC.createElement("input"), o.type = "hidden", o.name = n, o.value = a[i], e.appendChild(o), s.push(o);
            return s
          }

          avalon.ajaxConverters.arraybuffer = function () {
            var e = this.tranport && this.tranport.responseBody;
            if (e) return new VBArray(BinaryToArray(e)).toArray()
          }, avalon.ajaxTransports.upload = {
            "request": function () {
              var n = this, r = this.options, a = "iframe-upload-" + this.uniqueID, i = r.form,
                o = this.transport = e(a),
                s = {"target": i.target || "", "action": i.action || "", "enctype": i.enctype, "method": i.method},
                c = r.data ? t(i, r.data) : [];
              i.target = a, i.action = r.url, i.method = "POST", i.enctype = "multipart/form-data", this.uploadcallback = avalon.bind(o, "load", function (e) {
                n.respond(e)
              }), i.submit();
              for (var l in s) i[l] = s[l];
              c.forEach(function (e) {
                i.removeChild(e)
              })
            }, "respond": function (e) {
              var t, n = this.transport;
              if (n) {
                if (e && "load" === e.type) {
                  var r = n.contentWindow.document;
                  this.responseXML = r, r.body && (this.responseText = r.body.innerHTML, (t = r.body.firstChild) && "PRE" === t.nodeName.toUpperCase() && t.firstChild && (this.responseText = t.firstChild.nodeValue)), this.dispatch(200, "success")
                }
                this.uploadcallback = avalon.unbind(n, "load", this.uploadcallback), delete this.uploadcallback, setTimeout(function () {
                  n.parentNode.removeChild(n)
                })
              }
            }
          }, delete avalon.fixAjax
        }, avalon.fixAjax()
      }
      return avalon
    }.call(exports, __webpack_require__, exports, module), !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  }, "113677689": function (e, t, n) {
    var r;
    r = function (e, t, r) {
      var a = n(88981800), i = r.exports = function (e) {
        this.openid = e.openid, this.openkey = e.openkey, this.sessionid = e.sessionid, this.sessiontype = e.sessiontype, this.nickInfo = {}
      };
      a.fn.extend(i.prototype, {
        "getSessionParam": function () {
          return {
            "openid": encodeURIComponent(this.openid),
            "openkey": encodeURIComponent(this.openkey),
            "session_id": encodeURIComponent(this.sessionid),
            "session_type": encodeURIComponent(this.sessiontype)
          }
        }, "addSessionParam": function (e) {
          return a.fn.addParam({
            "openid": encodeURIComponent(this.openid),
            "openkey": encodeURIComponent(this.openkey),
            "sessionid": encodeURIComponent(this.sessionid),
            "sessiontype": encodeURIComponent(this.sessiontype)
          }, e)
        }, "getUin": function () {
          return ""
        }
      })
    }.call(t, n, t, e), !(void 0 !== r && (e.exports = r))
  }, "115781265": function (e, t, n) {
    var r;
    r = function (e, t, r) {
      function a(e) {
        return e
      }

      function i(e) {
        throw e
      }

      function o(e) {
        return this.then(e, i)
      }

      function s(e) {
        return this.then(a, e)
      }

      function c() {
        var e = {};
        return e.promise = new this(function (t, n) {
          e.resolve = t, e.reject = n
        }), e
      }

      function l(e, t) {
        if ("boolean" == typeof e.async) var n = e.async; else n = e.async = !0;
        n ? window.setTimeout(t, 0) : t()
      }

      function u(e, t) {
        if ("pending" === e._state) if (t && "function" == typeof t.then) {
          var n = t instanceof v ? "_then" : "then";
          t[n](function (t) {
            d(e, t, !0)
          }, function (t) {
            d(e, t, !1)
          })
        } else d(e, t, !0)
      }

      function f(e, t) {
        "pending" === e._state && d(e, t, !1)
      }

      function d(e, t, n) {
        e._fired = !0, e._value = t, e._state = n ? "fulfilled" : "rejected", l(e, function () {
          e._callbacks.forEach(function (t) {
            e._fire(t.onSuccess, t.onFail)
          })
        })
      }

      function p(e, t) {
        t = Array.isArray(t) ? t : [];
        var n, r = 0, a = [];
        return new v(function (i, o) {
          function s(s, c) {
            s.then(function (o) {
              n || (a[c] = o, r++, (e || r >= t.length) && (i(e ? o : a), n = !0))
            }, function (e) {
              n = !0, o(e)
            })
          }

          t.length || i();
          for (var c = 0, l = t.length; c < l; c++) s(t[c], c)
        })
      }

      var h = n(80667616), v = function (e) {
        this._callbacks = [];
        var t = this;
        if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e) throw new TypeError("not a function");
        e(function (e) {
          u(t, e)
        }, function (e) {
          f(t, e)
        })
      };
      v.resolve = function (e) {
        return new v(function (t) {
          t(e)
        })
      },
        v.reject = function (e) {
          return new v(function (t, n) {
            n(e)
          })
        }, v.prototype = {
        "constructor": v, "_state": "pending", "_fired": !1, "_fire": function (e, t) {
          if ("rejected" === this._state) {
            if ("function" != typeof t) throw this._value;
            t(this._value)
          } else "function" == typeof e && e(this._value)
        }, "_then": function (e, t) {
          if (this._fired) {
            var n = this;
            l(n, function () {
              n._fire(e, t)
            })
          } else this._callbacks.push({"onSuccess": e, "onFail": t})
        }, "then": function (e, t) {
          e = "function" == typeof e ? e : a, t = "function" == typeof t ? t : i;
          var n = this, r = new v(function (r, a) {
            n._then(function (t) {
              try {
                t = e(t)
              } catch (n) {
                return void a(n)
              }
              r(t)
            }, function (e) {
              try {
                e = t(e)
              } catch (n) {
                return void a(n)
              }
              r(e)
            })
          });
          for (var o in n) m[o] || (r[o] = n[o]);
          return r
        }, "done": o, "catch": s, "fail": s
      };
      var m = {"_state": 1, "_fired": 1, "_value": 1, "_callbacks": 1};
      v.all = function (e) {
        return p(!1, e)
      }, v.race = function (e) {
        return p(!0, e)
      }, v.defer = c, h.Promise = v;
      var g = window.Promise;
      /native code/.test(g) && (g.prototype.done = o, g.prototype.fail = s, g.defer || (g.defer = c)), r.exports = window.Promise = g || v
    }.call(t, n, t, e), !(void 0 !== r && (e.exports = r))
  }
});

function get_anti_auto_script_token_id(){
  i = vendor_lib(76812298);
  e = getUrlParam("mkey")
  e = i.enc.Hex.parse(e),
    e = i.enc.Base64.stringify(e);
  var t = i.AES.decrypt(e, i.enc.Utf8.parse("2Wozy2aksie1puXU"), {
    "padding": i.pad.ZeroPadding,
    "mode": i.mode.ECB
  });
  let token_id = t.toString(i.enc.Utf8);
  console.log("token_id",token_id);
  return token_id
}

function get_sck(){
  j = vendor_lib(43759118)
  console.log("sck -> ",j.getSck())
  return j.getSck()
}

let sck = get_sck();
let token_id = get_anti_auto_script_token_id();
let api_url = "https://api.unipay.qq.com/v1/r/1450000186/web_get_friends?openid="+UIN.slice(2)+"&openkey="+SKEY+"&session_id=uin&session_type=skey&sck="+sck+"&anti_auto_script_token_id="+token_id;
prompt("open url in new browser or new incognito window",api_url);

