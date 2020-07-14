! function(t) {
    function e(i) {
        if (a[i]) return a[i].exports;
        var s = a[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return t[i].call(s.exports, s, s.exports, e), s.loaded = !0, s.exports
    }
    var a = {};
    return e.m = t, e.c = a, e.p = "", e(0)
}([function(t, e, a) {
    a(1), a(2), a(4), a(5), a(6), t.exports = a(7)
}, function(t, e) {
    function a(t) {
        this.msg = new Txplayer.Events, this.dataset = {}, this.context = t, this.init()
    }
    var i = Txplayer.util;
    a.prototype = {
        init: function() {
            this.loadSubPlugins()
        },
        loadSubPlugins: function() {
            var t = ["HdPlayerAd", "HdPlayerAdReport", "UiPlayerAd", "YaliuPlayer", "ViewMonitor"],
                e = {
                    superMsg: this.context.msg,
                    userMsg: this.context.userMsg,
                    msg: this.context.msg,
                    $mod: {
                        $playermod: this.context.dataset.$playermod,
                        $progressmod: this.context.dataset.$progressmod,
                        $buttonsleftmod: this.context.dataset.$buttonsleftmod,
                        $buttonsrightmod: this.context.dataset.$buttonsrightmod
                    },
                    gpApi: {
                        isPrepLoad: !1,
                        currentVid: "",
                        nextVid: "",
                        videoAdList: {},
                        adtypeMap: {},
                        adType2VideoType: {
                            "前贴": "loadingad",
                            "中插": "insertad",
                            "后贴": "endingad"
                        },
                        videoType2AdType: {
                            loadingad: "前贴",
                            insertad: "中插",
                            endingad: "后贴"
                        }
                    }
                };
            Txplayer.$.extend(e, this.context), i.loadPlugins.call(this, t, e, this.context.config.settings)
        }
    }, Txplayer.register("H5PlayerAd", a)
}, function(module, exports, __webpack_require__) {
    function UiPlayerAd(t) {
        $ = Txplayer.$, this.msg = new Txplayer.Events, this.dataset = {}, this.context = t, this.init()
    }
    var $ = Txplayer.$,
        util = Txplayer.util,
        api = Txplayer.apiList,
        htmlstr = __webpack_require__(3);
    UiPlayerAd.prototype = {
        init: function() {
            this.dataset.muteClass = "txp_btn_ad_mute", this.write(), this.addEventListener(), this.exportsModuleApis()
        },
        write: function() {
            var t = {
                hideClass: Txplayer.dataset.hideClass,
                noSkipTipsText: "为了给腾讯视频用户提供更多优质美剧，应版权方（华纳）要求，好莱坞会员在观看华纳美剧时无法跳过广告（《吸血鬼日记》《破产姐妹》《无耻之徒》等）。我们会为会员用户继续争取免广告权益，请您谅解，谢谢！",
                noSkipTipsTextMobile: "为了给腾讯视频用户提供更多优质影片，应版权方要求，VIP用户在观看该版影片时无法免广告。我们会为VIP用户继续争取免广告权益，请您谅解，谢谢！",
                trueview: "txp-ui-loadingad-trueview",
                trueviewText: "txp-ui-loadingad-trueviewText",
                countDown: "txp-ui-loadingad-countDown",
                canSkip: "txp-ui-loadingad-canskip",
                enterAd: "txp-ui-loadingad-enterAd",
                noSkip: "txp-ui-loadingad-noskip",
                noSkipText: "txp-ui-loadingad-noSkipText",
                linkArea: "txp-ui-loadingad-linkarea",
                detail: "txp-ui-loadingad-detail",
                adMod: "txp-ui-loadingad-mod",
                volume: "txp-ui-loadingad-volume",
                time: "txp-ui-loadingad-time",
                close: "txp-ui-loadingad-close",
                closeText: "txp-ui-loadingad-closetext",
                trueviewClose: "txp-ui-loadingad-trueviewClose",
                trueviewCloseText: "txp-ui-loadingad-trueviewClosetext",
                why: "txp-ui-loadingad-why",
                pauseAd: "txp-ui-loadingad-pasuead",
                yaliuAd: "txp-ui-loadingad-yaliuad",
                pauseAdImg: "txp-ui-loadingad-pasuead-img",
                pauseAdClose: "txp-ui-loadingad-pausead-close",
                ivbAd: "txp-ui-ivbad",
                ivbAdImg: "txp-ui-ivbad-img",
                dspName: "txp-ui-loadingad-pasuead-dspName",
                noSkipTips: "txp-ui-loadingad-no-skip-tips",
                noSkipTipsClose: "txp-ui-loadingad-no-skip-tips-close",
                isSkipAdButtonShow: this.isSkipAdButtonShow(),
                isTrueviewButtonShow: this.isTrueviewButtonShow(),
                isUseMobileUI: this.isUseMobileUI(),
                isVshou: this.isVshou()
            };
            this.dataset.renderData = t;
            var e = $.tmpl(htmlstr, t);
            this.context.$mod.$playermod.append(e), this.dataset.$ad = this.context.$mod.$playermod.find("[data-role=" + t.adMod + "]"), this.dataset.$trueview = this.context.$mod.$playermod.find("[data-role=" + t.trueview + "]"), this.dataset.$trueviewText = this.context.$mod.$playermod.find("[data-role=" + t.trueviewText + "]"), this.dataset.$countDown = this.context.$mod.$playermod.find("[data-role=" + t.countDown + "]"), this.dataset.$canSkip = this.context.$mod.$playermod.find("[data-role=" + t.canSkip + "]"), this.dataset.$noSkip = this.context.$mod.$playermod.find("[data-role=" + t.noSkip + "]"), this.dataset.$noSkipText = this.context.$mod.$playermod.find("[data-role=" + t.noSkipText + "]"), this.dataset.$enterAd = this.context.$mod.$playermod.find("[data-role=" + t.enterAd + "]"), this.dataset.$linkArea = this.context.$mod.$playermod.find("[data-role=" + t.linkArea + "]"), this.dataset.$detail = this.context.$mod.$playermod.find("[data-role=" + t.detail + "]"), this.dataset.$volume = this.context.$mod.$playermod.find("[data-role=" + t.volume + "]"), this.dataset.$time = this.context.$mod.$playermod.find("[data-role=" + t.time + "]"), this.dataset.$close = this.context.$mod.$playermod.find("[data-role=" + t.close + "]"), this.dataset.$closeText = this.context.$mod.$playermod.find("[data-role=" + t.closeText + "]"), this.dataset.$trueviewClose = this.context.$mod.$playermod.find("[data-role=" + t.trueviewClose + "]"), this.dataset.$trueviewCloseText = this.context.$mod.$playermod.find("[data-role=" + t.trueviewCloseText + "]"), this.dataset.$why = this.context.$mod.$playermod.find("[data-role=" + t.why + "]"), this.dataset.$pauseAd = this.context.$mod.$playermod.find("[data-role=" + t.pauseAd + "]"), this.dataset.$yaliuAd = this.context.$mod.$playermod.find("[data-role=" + t.yaliuAd + "]"), this.dataset.$pauseAdImg = this.context.$mod.$playermod.find("[data-role=" + t.pauseAdImg + "]"), this.dataset.$ivbAd = this.context.$mod.$playermod.find("[data-role=" + t.ivbAd + "]"), this.dataset.$ivbAdImg = this.context.$mod.$playermod.find("[data-role=" + t.ivbAdImg + "]"), this.dataset.$noSkipTips = this.context.$mod.$playermod.find("[data-role=" + t.noSkipTips + "]"), this.dataset.$noSkipTipsClose = this.context.$mod.$playermod.find("[data-role=" + t.noSkipTipsClose + "]"), this.dataset.$pauseAdClose = this.context.$mod.$playermod.find("[data-role=" + t.pauseAdClose + "]"), this.dataset.$dspName = this.context.$mod.$playermod.find("[data-role=" + t.dspName + "]"), this.initDisplay(), this.dataset.yaliuRenderTimers = {}, this.dataset.yaliuCycleTimers = {}
        },
        remove: function() {
            this.dataset.$ad.remove()
        },
        initDisplay: function() {
            util.isSupportMute() || this.dataset.$volume.addClass(Txplayer.dataset.hideClass)
        },
        hide: function() {
            this.dataset.$ad.addClass(Txplayer.dataset.hideClass), this.dataset.$trueview.addClass(Txplayer.dataset.hideClass), this.dataset.$canSkip.addClass(Txplayer.dataset.hideClass), this.dataset.$noSkip.addClass(Txplayer.dataset.hideClass), this.dataset.$enterAd.addClass(Txplayer.dataset.hideClass), this.dataset.$linkArea.addClass(Txplayer.dataset.hideClass), this.dataset.$detail.addClass(Txplayer.dataset.hideClass), this.dataset.$volume.addClass(Txplayer.dataset.hideClass), this.dataset.$close.addClass(Txplayer.dataset.hideClass), this.dataset.$closeText.addClass(Txplayer.dataset.hideClass), this.dataset.$trueviewClose.css("display", "none"), this.dataset.$trueviewCloseText.addClass(Txplayer.dataset.hideClass), this.dataset.$ivbAd.addClass(Txplayer.dataset.hideClass), this.dataset.$pauseAd.addClass(Txplayer.dataset.hideClass), this.dataset.$dspName.addClass(Txplayer.dataset.hideClass)
        },
        hideTime: function(t) {
            t ? this.dataset.$time.addClass(Txplayer.dataset.hideClass) : this.dataset.$time.removeClass(Txplayer.dataset.hideClass)
        },
        mute: function() {
            this.dataset.$volume.addClass(this.dataset.muteClass), this.context.msg.broadcast("mute", {
                showTips: !1,
                broadcast: !1
            }), this.context.msg.broadcast("adMuteChange", {
                mute: !0
            })
        },
        unMute: function() {
            this.dataset.$volume.removeClass(this.dataset.muteClass), this.context.msg.broadcast("unMute", {
                showTips: !1
            });
            var t = this.context.dataset.volume;
            "number" === $.type(t) && t || (t = Txplayer.defaultconfig.volume), this.context.msg.broadcast("setVolume", {
                volume: t,
                isUserAction: !1
            }), this.context.msg.broadcast("adMuteChange", {
                mute: !1
            })
        },
        openAdLink: function(t) {
            if (this.context.dataset.currentAdInfo && this.context.dataset.currentAdInfo.link) {
                !Txplayer.util.mobile || "ZT" == this.context.dataset.currentAdInfo.type && "WZ" == this.context.dataset.currentAdInfo.type || this.context.msg.broadcast("pauseAd"), window.open(this.context.dataset.currentAdInfo.link);
                var e = $.extend({}, this.context.dataset.currentAdInfo);
                t && (e.txpType = t), this.context.msg.broadcast("openAdLink", e)
            }
        },
        skipAd: function(t) {
            this.stopAdCountDownTime(), this.context.dataset.isPlayingAd = !1, this.dataset.adPlayedSeconds = null, this.context.dataset.isSkipAd = !0, this.context.msg.broadcast("skipAd", t)
        },
        getScale: function(t, e, a, i, s) {
            var d, n, o;
            return d = a / t, n = i / e, o = Math.min(d, n), s && (s.width = parseInt(s.width * o), s.height = parseInt(s.height * o)), o
        },
        showIvbAd: function(t) {
            if (t && t.length) {
                t = t[0], this.context.dataset.currentAdInfo = t;
                var e = this.getRichData(t);
                if (e && e.plugins && "new_ivb" === e.plugins.plugType) {
                    var a = 1e3 * parseInt(e.plugins.easeInTime) || 5e3,
                        i = 1e3 * parseInt(e.plugins.easeOutTime) || 5e3,
                        s = 1e3 * parseInt(e.plugins.stayTime) || 5e3,
                        d = function(t) {
                            var d = function(t, a) {
                                e.plugins[t] && (a = a || 0, setTimeout(function() {
                                    Txplayer.util.report(e.plugins[t])
                                }, a))
                            };
                            "start" != t && t || d("startReportUrl"), "end" == t && d("endReportUrl"), t || d("endReportUrl", a + i + s)
                        };
                    if ("N" == e.plugins.needAdMark) return void d();
                    this.dataset.$ad.removeClass(Txplayer.dataset.hideClass), this.dataset.$ivbAd.removeClass(Txplayer.dataset.hideClass);
                    var n, o = {
                            width: 960,
                            height: 60
                        },
                        r = this,
                        l = 50,
                        p = 0,
                        c = 1;
                    n = e.plugins.res[0].content, r.dataset.$ivbAdImg.attr("src", n), this.dataset.$ivbAdImg.off("click").on("click", function() {
                        r.openAdLink()
                    });
                    var u = function() {
                        c = r.getScale(o.width, o.height, r.context.dataset.playerWidth / 2, r.context.dataset.playerHeight, o), r.dataset.$ivbAdImg.css(o), r.dataset.$ivbAd.css({
                            width: o.width + 50,
                            height: o.height,
                            fontSize: parseInt(12 * c)
                        })
                    };
                    this.context.msg.on("resize.ivb", function() {
                        u(), p > 0 && x(p)
                    }), u(), this.dataset.$ivbAd.css("left", "initial");
                    var h = function(t) {
                        t ? r.dataset.$ivbAd.css("bottom", l) : r.dataset.$ivbAd.css("bottom", 5)
                    };
                    h(r.context.dataset.isControlShow), this.context.msg.on("hideUiControl.ivb", function() {
                        r.context.dataset.isControlShow && h(!1)
                    }), this.context.msg.on("beforeUiControlShow.ivb", function() {
                        r.context.dataset.isControlShow || h(!0)
                    });
                    var x = function(t) {
                        switch (p = t, t) {
                            case 0:
                                r.dataset.$ivbAd.css({
                                    left: 0,
                                    right: 0,
                                    bottom: l
                                }), d("end");
                                break;
                            case 1:
                                var e = (r.context.dataset.playerWidth - o.width - 50) / 2;
                                r.dataset.$ivbAd.css({
                                    right: e
                                }), d("start");
                                break;
                            case 2:
                                r.dataset.$ivbAd.css({
                                    right: r.context.dataset.playerWidth
                                })
                        }
                    };
                    r.dataset.$ivbAd.css({
                        right: -(o.width + 50)
                    }), r.dataset.$ivbAd.css({
                        transitionProperty: "right",
                        transitionDuration: a + "ms"
                    }), setTimeout(function() {
                        x(1)
                    }, 100), setTimeout(function() {
                        r.dataset.$ivbAd.css({
                            transitionDuration: i + "ms"
                        }), x(2)
                    }, a + s), setTimeout(function() {
                        r.context.msg.off("hideUiControl.ivb"), r.context.msg.off("beforeUiControlShow.ivb"), r.context.msg.off("resize.ivb"), r.dataset.$ad.addClass(Txplayer.dataset.hideClass), r.dataset.$ivbAd.addClass(Txplayer.dataset.hideClass), x(0)
                    }, a + s + i)
                }
            }
        },
        showPauseAd: function(t) {
            if (!t || !t.length) return this.dataset.$ad.addClass(Txplayer.dataset.hideClass), void this.dataset.$pauseAd.addClass(Txplayer.dataset.hideClass);
            t = t[0], this.context.dataset.currentAdInfo = t, this.dataset.$ad.removeClass(Txplayer.dataset.hideClass), this.dataset.$pauseAd.removeClass(Txplayer.dataset.hideClass);
            var e = t.dsp_name || "";
            this.dataset.$dspName.html(e);
            var a, i, s, d = this;
            if ("array" === $.type(t.image) && (t.image = t.image[0]), a = t.image.url, i = parseInt(t.image.width), s = parseInt(t.image.height), a && 0 === a.indexOf("http")) {
                if (this.dataset.pauseAdSize = {
                        width: i,
                        height: s,
                        bottom: this.dataset.$pauseAd.css("bottom")
                    }, Txplayer.util.mobile && !Txplayer.util.os.ipad) {
                    var n, o, r, l, p;
                    n = 768 / document.body.clientWidth, o = 432 / document.body.clientHeight, r = Math.max(n, o), i = parseInt(i / r), s = parseInt(s / r), l = (document.body.clientHeight - s) / 2, p = (document.body.clientWidth - i) / 2, d.dataset.$pauseAd.css({
                        width: i,
                        height: s,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: "40px",
                        position: "absolute",
                        margin: "auto"
                    })
                }
                this.dataset.$pauseAdImg.attr("src", a).css({
                    width: i,
                    height: s
                }), this.dataset.$pauseAdImg.off("click").on("click", function() {
                    "N" === t.no_click && t.link && d.openAdLink("pauseAd")
                }), this.dataset.isPauseAdShow = !0, this.hideUiPlay(), this.context.msg.broadcast("pauseAdShow", this.context.dataset.currentAdInfo)
            }
        },
        renderYaliuAd: function(t) {
            "pc" === this.context.gpApi.pf_ex ? this.renderYaliuAdByMP4(t, t.mp4_index) : this.renderYaliuAdByPNG(t, t.png_index)
        },
        renderYaliuAdByPNG: function(t, e) {
            var a = this,
                i = "yaliu-ad-canvas-" + t.cid;
            if ("N" == t.no_click) var s = '<canvas data-role="' + i + '" style="display:none;pointer-events:auto;cursor:pointer;"></canvas>';
            else var s = '<canvas data-role="' + i + '" style="display:none;"></canvas>';
            var d = this.context.$mod.$playermod.find("[data-role=" + i + "]");
            d[0] || (this.dataset.$yaliuAd.append(s), d = this.context.$mod.$playermod.find("[data-role=" + i + "]"));
            var n = this.context.dataset.currentTime - t.anchor.begin / 1e3,
                o = t.material[e].data.frames;
            if (t.anchor.interval && "" != t.anchor.interval) var r = 0;
            else var r = parseInt(n) * t.material[e].data.fps;
            var l = this.context.$mod.$playermod[0],
                p = d[0].getContext("2d"),
                c = t.material[e].data.width,
                u = t.material[e].data.height,
                h = l.clientWidth * t.anchor.pos_w,
                x = l.clientHeight * t.anchor.pos_h,
                y = l.clientWidth * t.anchor.pos_x,
                m = l.clientHeight * t.anchor.pos_y;
            p.clearRect(0, 0, h, x), d.attr("width", h), d.attr("height", x), d.css({
                position: "absolute",
                display: "block",
                left: y,
                top: m
            }), this.dataset.$yaliuAd.css({
                display: "block"
            }), "N" == t.no_click && d.off("click").on("click", function() {
                window.open(t.link), a.context.msg.broadcast("openAdLink", t)
            }), this.context.dataset.canReportCids[t.cid] && !this.context.dataset.hasReportCids[t.cid] && (this.context.msg.broadcast("reportAd", t), this.context.dataset.hasReportCids[t.cid] = !0);
            document.createElement("img");
            this.dataset.$yaliuAd.removeClass(Txplayer.dataset.hideClass);
            var g = t.offscreenCanvasArr,
                v = l.clientWidth,
                f = l.clientHeight,
                T = setInterval(function() {
                    a.context.$mod.$playermod[0];
                    return 3 == a.context.dataset.playState ? void d.css({
                        display: "none"
                    }) : 2 == a.context.dataset.playState ? (b(), void A(!1)) : (b(), A(!0), void((r == o.length - 1 || r > o.length - 1) && (a.dataset.$yaliuAd.addClass(Txplayer.dataset.hideClass), t.anchor.interval && (a.dataset.yaliuCycleTimers[t.cid] = setTimeout(function() {
                        r = 0;
                        var e = a.context.dataset.hasShowCidArr.indexOf(t.cid);
                        e > -1 && a.context.dataset.hasShowCidArr.splice(e, 1)
                    }, t.anchor.interval)), d.css({
                        display: "none"
                    }), clearInterval(T), T = null)))
                }, 1e3 / t.material[e].data.fps);
            this.dataset.yaliuRenderTimers[t.cid] = T;
            var A = function(t) {
                    p.clearRect(0, 0, h, x), p.drawImage(g[r], 0, 0, c, u, 0, 0, h, x), t && r++
                },
                b = function() {
                    v == l.clientWidth && f == l.clientHeight || (h = l.clientWidth * t.anchor.pos_w, x = l.clientHeight * t.anchor.pos_h, y = l.clientWidth * t.anchor.pos_x, m = l.clientHeight * t.anchor.pos_y, d.attr("width", h), d.attr("height", x), d.css({
                        position: "absolute",
                        display: "block",
                        left: y,
                        top: m
                    }), v = l.clientWidth, f = l.clientHeight), d.css({
                        display: "block"
                    })
                }
        },
        renderYaliuAdByMP4: function(t, e) {
            var a = this,
                i = "yaliuad-" + t.cid,
                s = "yaliu-sample-canvas-" + t.cid,
                d = "yaliu-ad-canvas-" + t.cid,
                n = '<txpdiv data-role="' + i + '"><canvas data-role="' + s + '" style="display:none;"></canvas><canvas data-role="' + d + '" style="position:absolute;"></canvas></txpdiv>',
                o = a.context.$mod.$playermod.find("[data-role=" + i + "]");
            o[0] || a.dataset.$yaliuAd.append(n);
            var r = t.videoElement,
                l = a.context.$mod.$playermod.find("[data-role=" + s + "]"),
                p = a.context.$mod.$playermod.find("[data-role=" + d + "]");
            r.setAttribute("crossOrigin", "*");
            var c = a.context.$mod.$playermod[0],
                u = l[0].getContext("2d"),
                h = p[0].getContext("2d"),
                x = t.material[e].width,
                y = t.material[e].height,
                m = c.clientWidth * t.anchor.pos_w,
                g = c.clientHeight * t.anchor.pos_h,
                v = c.clientWidth * t.anchor.pos_x,
                f = c.clientHeight * t.anchor.pos_y,
                T = c.clientWidth,
                A = c.clientHeight;
            l.attr("width", x), l.attr("height", y), p.attr("width", x / 2), p.attr("height", y), p.css({
                left: v,
                top: f,
                width: m,
                height: g,
                display: "block"
            }), a.dataset.$yaliuAd.css({
                display: "block"
            }), "N" == t.no_click && p.off("click").on("click", function() {
                window.open(t.link), a.context.msg.broadcast("openAdLink", t)
            });
            var b = a.context.dataset.currentTime - t.anchor.begin / 1e3;
            t.anchor.interval && "" != t.anchor.interval ? r.currentTime = 0 : r.currentTime = b, this.context.dataset.canReportCids[t.cid] && !this.context.dataset.hasReportCids[t.cid] && r.videoCanPlay && (this.context.msg.broadcast("reportAd", t), this.context.dataset.hasReportCids[t.cid] = !0);
            var L = setInterval(function() {
                if (3 == a.context.dataset.playState) return void p.css({
                    display: "none"
                });
                if (2 == a.context.dataset.playState) return C(), void r.pause();
                if (1 == a.context.dataset.playState) {
                    if (!r.videoCanPlay) return;
                    C(), r.play()
                }
                return r.paused || r.ended ? (t.anchor.interval && "" != t.anchor.interval && (a.dataset.yaliuCycleTimers[t.cid] = setTimeout(function() {
                    var e = a.context.dataset.hasShowCidArr.indexOf(t.cid);
                    e > -1 && a.context.dataset.hasShowCidArr.splice(e, 1)
                }, t.anchor.interval)), p.css({
                    display: "none"
                }), clearInterval(L), void(L = null)) : void w()
            }, 1e3 / 24);
            this.dataset.yaliuRenderTimers[t.cid] = L;
            var w = function() {
                    u.drawImage(r, 0, 0, x, y);
                    for (var t = u.getImageData(x / 2, 0, x / 2, y), e = u.getImageData(0, 0, x / 2, y), a = e.data.length / 4, i = 0; i < a; i++) e.data[4 * i + 3] = t.data[4 * i + 1];
                    h.putImageData(e, 0, 0)
                },
                C = function() {
                    T == c.clientWidth && A == c.clientHeight || (m = c.clientWidth * t.anchor.pos_w, g = c.clientHeight * t.anchor.pos_h, v = c.clientWidth * t.anchor.pos_x, f = c.clientHeight * t.anchor.pos_y, p.css({
                        position: "absolute",
                        display: "block",
                        left: v,
                        top: f,
                        width: m,
                        height: g
                    }), T = c.clientWidth, A = c.clientHeight), p.css({
                        display: "block"
                    })
                }
        },
        isSkipAdButtonShow: function() {
            return !((!Txplayer.util.mobile || Txplayer.util.os.ipad) && (Txplayer.util.mobile && !Txplayer.util.os.ipad || "v.qq.com" !== location.hostname && 6 != this.context.dataset.businessId) || !this.context.config || "function" !== $.type(this.context.config.showOpenVIPGuide))
        },
        isTrueviewButtonShow: function() {
            return !(!Txplayer.util.mobile || !this.context.config || "function" !== $.type(this.context.config.showOpenVIPGuide))
        },
        isUseMobileUI: function() {
            return !(!Txplayer.util.mobile || Txplayer.util.os.ipad)
        },
        isVshou: function() {
            return !(!this.context.config || "vshou" !== this.context.config.playerType)
        },
        isHBO: function() {
            var t = this;
            return !(!t.context.dataset.adJson || !t.context.dataset.adJson.adLoc || "2" !== t.context.dataset.adJson.adLoc.adFlag)
        },
        isHuaNa: function() {
            var t = this;
            return !(!t.context.dataset.adJson || !t.context.dataset.adJson.adLoc || "1" !== t.context.dataset.adJson.adLoc.adFlag)
        },
        isAdType: function(t) {
            if (!t) return !1;
            var e = ["loadingad", "insertad", "endingad"];
            return $.inArray(t, e) > -1
        },
        hideUiPlay: function() {
            var t = this;
            t.context.msg.broadcast("hideUiPlay"), t.context.msg.once("videoPause.noSkipTips", function() {
                t.context.msg.broadcast("hideUiPlay")
            })
        },
        adSkip: function(t) {
            var e = this;
            e.context.dataset.adReportData.isskip = 1, e.context.dataset.adReportData.skiptime = parseInt(e.dataset.adPlayedSeconds), e.context.msg.broadcast("adSkip"), e.skipAd(t), e.hide()
        },
        getRichData: function(data) {
            var params, richdata;
            return data && data.params && (params = decodeURIComponent(data.params)), params && (richdata = params.split("richdata=")[1], eval("richdata=" + richdata)), richdata
        },
        showAdUIOnPlaying: function() {
            var t = this,
                e = t.context.dataset.currentPlayListType;
            if (t.isAdType(e) && (t.hide(), !t.context.dataset.isSkipAd)) {
                t.dataset.adListLenth = t.context.msg.getData("calcTotalPlaylist", e);
                var a = t.getRichData(this.context.dataset.currentAdInfo);
                if (this.context.dataset.currentAdInfo) {
                    var i = this.context.dataset.currentAdInfo.dsp_name || "";
                    i ? (this.dataset.$dspName.html(i), this.dataset.$dspName.removeClass(Txplayer.dataset.hideClass)) : this.dataset.$dspName.addClass(Txplayer.dataset.hideClass)
                }
                if (t.dataset.trueview = !1, t.dataset.isAdCanNotSkip = t.context.dataset.isAdCanNotSkip, t.dataset.$ad.removeClass(Txplayer.dataset.hideClass), t.dataset.$detail.removeClass(Txplayer.dataset.hideClass), util.isSupportMute() && t.dataset.$volume.removeClass(Txplayer.dataset.hideClass), t.dataset.$linkArea.removeClass(Txplayer.dataset.hideClass), t.dataset.duration = t.context.dataset.getAdDuration, t.context.dataset.isAdCanSkip) t.isHuaNa() ? t.dataset.$noSkipText.html("应版权方要求，VIP无法免该片广告") : t.isHBO() && (t.dataset.$noSkipText.html("应内容方要求，VIP无法免该片广告"), t.dataset.$why.addClass(Txplayer.dataset.hideClass)), t.dataset.$noSkip.removeClass(Txplayer.dataset.hideClass);
                else if (Txplayer.util.mobile && 1 == t.dataset.adListLenth && a && a.plugins && "Y" === a.plugins.trueview) {
                    if (t.dataset.trueview = !0, t.dataset.$trueview.removeClass(Txplayer.dataset.hideClass), t.isTrueviewButtonShow()) {
                        var s = t.context.dataset.currentAdInfo.duration / 1e3;
                        s > 10 && (!t.dataset.hasOwnProperty("countDown") || t.dataset.countDown == -1) ? (t.dataset.$trueviewText.removeClass(Txplayer.dataset.hideClass), t.dataset.countDown = 5, t.dataset.$countDown.html(t.dataset.countDown)) : (0 === t.dataset.countDown || s <= 10) && (s <= 10 && t.dataset.$trueviewText.addClass(Txplayer.dataset.hideClass), t.dataset.$trueviewClose.css("display", "inline-block"), t.dataset.$trueviewCloseText.removeClass(Txplayer.dataset.hideClass))
                    }
                } else if (!this.context.dataset.currentAdInfo || "WK" !== this.context.dataset.currentAdInfo.type && "KB" !== this.context.dataset.currentAdInfo.type ? t.hideTime(!1) : t.hideTime(!0), t.dataset.$canSkip.removeClass(Txplayer.dataset.hideClass), t.isSkipAdButtonShow()) {
                    var d = t.context.dataset.adJson.adLoc.duration;
                    d && d > 0 && d < 180 ? t.dataset.$closeText.html("关闭广告") : t.dataset.$closeText.html("VIP免广告"), t.dataset.$close.removeClass(Txplayer.dataset.hideClass), t.dataset.$closeText.removeClass(Txplayer.dataset.hideClass)
                }
                t.dataset.$noSkipTips.addClass(Txplayer.dataset.hideClass)
            }
        },
        stopAdCountDownTime: function() {
            var t = this;
            t.dataset.adCountDownTimer && (clearInterval(t.dataset.adCountDownTimer), t.dataset.adCountDownTimer = null)
        },
        startAdCountDownTime: function() {
            var t = this;
            t.dataset.notShowTime = 0, $(this.context.dataset.adList).each(function(e, a) {
                a.duration && ("WK" != a.type && "KB" != a.type || (t.dataset.notShowTime += parseInt(a.duration, 10) / 1e3))
            }), this.stopAdCountDownTime();
            var e, a, i = '<span class="txp_ad_skip" style="background: none">即将进入下一集：</span>';
            "number" === $.type(t.context.dataset.adDuration) && ("number" !== $.type(t.dataset.adPlayedSeconds) && (t.dataset.adPlayedSeconds = 0), a = parseInt(t.context.dataset.adDuration - parseInt(t.dataset.adPlayedSeconds) - t.dataset.notShowTime), a > 0 && (t.context.gpApi.isPrepLoad ? t.dataset.$time.html(i + a) : t.dataset.$time.html(a))), this.dataset.adCountDownTimer = setInterval(function() {
                return t.dataset.adPlayedSeconds += .1, t.context.dataset.adDuration || "number" === $.type(t.context.dataset.adDuration) ? (e = t.context.dataset.adDuration - t.dataset.adPlayedSeconds, e = parseInt(10 * e) / 10, e <= 0 ? (t.dataset.countDown = -1, t.hide(), t.skipAd({
                    force: !0
                }), void t.stopAdCountDownTime()) : void(e === parseInt(e) && (a = e - t.dataset.notShowTime, a > 0 && (t.context.gpApi.isPrepLoad ? t.dataset.$time.html(i + a) : t.dataset.$time.html(a)), t.dataset.countDown > 0 && (t.dataset.countDown--, t.dataset.countDown > 0 ? t.dataset.$countDown.html(t.dataset.countDown) : (t.isTrueviewButtonShow() && (t.dataset.$trueviewClose.css("display", "inline-block"), t.dataset.$trueviewCloseText.removeClass(Txplayer.dataset.hideClass)), t.dataset.$trueviewText.addClass(Txplayer.dataset.hideClass)))))) : (t.hide(), void t.stopAdCountDownTime())
            }, 100)
        },
        getCurrentAdInfo: function() {
            if (this.context.dataset.isPlayingAd) {
                var t = this.context.dataset.currentPlayListType,
                    e = this.context.msg.getData("getPlayListIndex", t);
                this.context.dataset.adList && this.context.dataset.adList[e] && (this.context.dataset.currentAdInfo = this.context.dataset.adList[e]), this.context.dataset.currentAdInfo && "film" === this.context.dataset.currentAdInfo.type && (this.context.dataset.currentAdInfo = null)
            }
        },
        clearVideoAd: function(t) {
            this.hide(), this.dataset.adPlayedSeconds = null, this.stopAdCountDownTime(), t && this.context.gpApi.videoAdList && (this.context.gpApi.videoAdList[t] = [])
        },
        addEventListener: function() {
            var t = this;
            this.dataset.eventsList = {}, this.dataset.eventsList[util.getUniqueMsgKey("resize")] = function(t) {}, this.dataset.eventsList[util.getUniqueMsgKey("enterBrowserFullscreen")] = function(e) {
                t.dataset.isPauseAdShow && Txplayer.util.mobile && !Txplayer.util.os.ipad && t.dataset.$pauseAd.removeClass(Txplayer.dataset.hideClass)
            };
            var e = function(e) {
                    t.dataset.yaliuRenderTimers && t.dataset.yaliuRenderTimers[e] && (clearInterval(t.dataset.yaliuRenderTimers[e]), t.dataset.yaliuRenderTimers[e] = null), t.dataset.yaliuCycleTimers && t.dataset.yaliuCycleTimers[e] && (clearTimeout(t.dataset.yaliuCycleTimers[e]), t.dataset.yaliuCycleTimers[e] = null)
                },
                a = function(e) {
                    if (t.context.dataset.hasShowCidArr && t.context.dataset.hasShowCidArr.indexOf(e) > -1) {
                        var a = "yaliu-ad-canvas-" + e,
                            i = t.context.$mod.$playermod.find("[data-role=" + a + "]");
                        i.css({
                            display: "none"
                        });
                        var s = t.context.dataset.hasShowCidArr.indexOf(e);
                        t.context.dataset.hasShowCidArr.splice(s, 1)
                    }
                };
            this.dataset.eventsList[util.getUniqueMsgKey("userSeekStart")] = function(t) {}, this.dataset.eventsList[util.getUniqueMsgKey("userSeekEnd")] = function(t) {}, this.dataset.eventsList[util.getUniqueMsgKey("yaliuKeybroadSeek")] = function(t) {
                e(t), a(t)
            }, this.dataset.eventsList[util.getUniqueMsgKey("exitBrowserFullscreen")] = function(e) {
                t.dataset.isPauseAdShow && Txplayer.util.mobile && !Txplayer.util.os.ipad && t.dataset.$pauseAd.addClass(Txplayer.dataset.hideClass)
            }, this.dataset.eventsList[util.getUniqueMsgKey("smallWindowModeChange")] = function(e) {
                if (t.dataset.isPauseAdShow) {
                    var a = t.dataset.pauseAdSize.width,
                        i = t.dataset.pauseAdSize.height,
                        s = t.dataset.pauseAdSize.bottom;
                    if (e.isSmallWindow) {
                        var d = i / 214,
                            n = a / 380;
                        n >= d ? (a /= n, i /= n) : (a /= d, i /= d), s = "0"
                    }
                    t.dataset.$pauseAd.css({
                        width: a,
                        height: i,
                        bottom: s
                    })
                }
            }, this.dataset.eventsList[util.getUniqueMsgKey("enterAd")] = function(i) {
                var s = 10,
                    d = function() {
                        if (s <= 0) {
                            clearTimeout(o), t.dataset.$enterAd.addClass(Txplayer.dataset.hideClass);
                            for (var i = 0; i < t.context.dataset.yaliuCidArr.length; i++) {
                                var n = t.context.dataset.yaliuCidArr[i];
                                e(n), a(n)
                            }
                        } else {
                            t.dataset.$time.html(s), s--;
                            var o = setTimeout(d, 1e3)
                        }
                    };
                d(), t.dataset.$ad.removeClass(Txplayer.dataset.hideClass), t.dataset.$enterAd.removeClass(Txplayer.dataset.hideClass), t.hideTime(!1)
            }, this.dataset.eventsList[util.getUniqueMsgKey("videoPlay")] = function(e) {
                t.dataset.isPauseAdShow && (t.hide(), t.dataset.isPauseAdShow = !1)
            }, this.dataset.eventsList[util.getUniqueMsgKey("videoPlaying")] = function(e) {
                e && "film" !== e.playListType ? (t.getCurrentAdInfo(), t.context.dataset.isSkipAd || t.startAdCountDownTime(), t.showAdUIOnPlaying()) : (t.context.dataset.isSkipAd = !1, t.hide(), t.stopAdCountDownTime())
            }, this.dataset.eventsList[util.getUniqueMsgKey("userStopVideo")] = function(e) {
                t.hide(), t.dataset.adPlayedSeconds = null, t.stopAdCountDownTime()
            }, this.dataset.eventsList[util.getUniqueMsgKey("videoEnd")] = function(e) {
                t.dataset.countDown = -1, e.playListTypeEnd && t.isAdType(e.playListType) && t.clearVideoAd(e.playListType), e.playListTypeEnd && e.isAllEnd && t.clearVideoAd()
            }, this.dataset.eventsList[util.getUniqueMsgKey("error")] = function(e) {
                if (e && !t.isAdType(e.type)) return void(t.dataset.adPlayedSeconds = null);
                var a = t.context.dataset.currentPlayListType,
                    i = !1;
                e.type == a && $.isArray(t.context.gpApi.videoAdList[a]) && e.index == t.context.gpApi.videoAdList[e.type].length - 1 && (i = !0), i && t.clearVideoAd(e.type)
            }, this.dataset.eventsList[util.getUniqueMsgKey("videoPause")] = function(e) {
                e && "film" !== e.playListType && t.stopAdCountDownTime()
            }, this.dataset.eventsList[util.getUniqueMsgKey("vidChange")] = function(i) {
                if (t.dataset.adPlayedSeconds = null, t.dataset.countDown = -1, t.stopAdCountDownTime(), t.context.dataset.yaliuCidArr && t.context.dataset.yaliuCidArr.length > 0)
                    for (var s = 0; s < t.context.dataset.yaliuCidArr.length; s++) {
                        var d = t.context.dataset.yaliuCidArr[s];
                        e(d), a(d)
                    }
            }, this.dataset.eventsList[util.getUniqueMsgKey("ivbAdDataReady")] = function(e) {
                e && "array" === $.type(e) && e.length && t.showIvbAd(e)
            }, this.dataset.eventsList[util.getUniqueMsgKey("pauseAdDataReady")] = function(e) {
                if (e && "array" === $.type(e) && e.length) {
                    if ("insertad" === t.context.dataset.currentPlayListType) return;
                    if (1 === t.context.dataset.playState) return;
                    t.showPauseAd(e)
                }
            }, this.dataset.eventsList[util.getUniqueMsgKey("volumeChange")] = function(e) {
                e && e.volume > 0 ? (t.dataset.$volume.removeClass(t.dataset.muteClass), t.context.msg.broadcast("adMuteChange", {
                    mute: !1
                })) : (t.context.dataset.isMute ? e.volume = 0 : e && e.hasOwnProperty("volume") ? e.volume = 0 : e.volume = t.context.dataset.volume, 0 === e.volume && (t.dataset.$volume.addClass(t.dataset.muteClass), t.context.msg.broadcast("adMuteChange", {
                    mute: !0
                })))
            }, this.dataset.eventsList[util.getUniqueMsgKey("renderYaliu")] = function(e) {
                "pc" === t.context.gpApi.pf_ex ? t.dataset.adType = "PSJ" : t.dataset.adType = "WSJ", t.renderYaliuAd(e)
            }, $.each(this.dataset.eventsList, function(e, a) {
                t.context.msg.on(e, a)
            }), this.dataset.privateApis = {}, this.dataset.privateApis.clearLoadingAd = function() {
                t.hide(), t.context.msg.broadcast("pauseAd")
            }, $.each(this.dataset.privateApis, function(e, a) {
                t.context.msg.on(e, a)
            });
            var i = function() {
                if (t.dataset.trueview) return void t.adSkip({
                    force: !0
                });
                var e = t.context.dataset.duration;
                e && e > 0 && e < 180 ? t.adSkip() : t.isSkipAdButtonShow() && (Txplayer.util.mobile && !Txplayer.util.os.ipad ? Txplayer.util.txLoginOnMobile && "function" === $.type(Txplayer.util.txLoginOnMobile.isLogin) && Txplayer.util.txLoginOnMobile.isLogin(function(t) {
                    0 === t ? Txplayer.util.txLoginOnMobile.goLogin() : location.href = "http://film.qq.com/weixin/upay.html?aid=V0$$4:1"
                }) : t.context.config.showOpenVIPGuide(), t.context.msg.broadcast("pauseAd"), t.context.msg.broadcast("closeAdClick"))
            };
            this.dataset.$close.on("click", function() {
                i()
            }), this.dataset.$closeText.on("click", function() {
                i()
            }), this.dataset.$trueviewClose.on("click", function() {
                i()
            }), this.dataset.$trueviewCloseText.on("click", function() {
                i()
            }), this.dataset.$volume.on("click", function() {
                t.dataset.$volume.hasClass(t.dataset.muteClass) ? t.unMute({
                    showTips: !1
                }) : t.mute({
                    showTips: !1
                })
            }), this.dataset.$detail.on("click", function() {
                t.openAdLink()
            }), this.dataset.$linkArea.on("click", function() {
                t.openAdLink()
            }), this.dataset.$why.on("click", function() {
                t.context.msg.broadcast("pauseAd"), t.hideUiPlay(), t.dataset.$noSkipTips.removeClass(Txplayer.dataset.hideClass)
            }), this.dataset.$noSkipTipsClose.on("click", function() {
                t.context.msg.broadcast("playAd"), t.dataset.$noSkipTips.addClass(Txplayer.dataset.hideClass)
            }), this.dataset.$pauseAdClose.on("click", function() {
                t.dataset.$pauseAd.addClass(Txplayer.dataset.hideClass), t.hide()
            }), this.context.msg.on("error", function(e) {
                e && "film" !== e.type && "cgi" !== e.type || (t.context.msg.broadcast("pause"), t.context.msg.broadcast("clearFocusVideoUrl"), t.hide())
            }), this.context.msg.on("beforeVideoPlay", function() {
                t.hide()
            }), this.context.msg.on("setDefinitionStart", function() {
                t.dataset.$pauseAd.addClass(Txplayer.dataset.hideClass), t.hide()
            })
        },
        exportsModuleApis: function() {
            var t = this;
            this.dataset.privateApis = {}, this.dataset.privateApis.hidePlayAdUI = function() {
                t.hide()
            }, this.dataset.privateApis.stopAdCountDownTime = function() {
                t.stopAdCountDownTime()
            }, this.dataset.privateApis.adMuteStateUpdate = function(e) {
                e && e.hasOwnProperty("mute") && (e.mute ? t.mute() : t.unMute())
            }, $.each(this.dataset.privateApis, function(e, a) {
                t.context.msg.on(e, a)
            })
        }
    }, Txplayer.register("UiPlayerAd", UiPlayerAd)
}, function(t, e) {
    t.exports = '<txpdiv data-role="<%=adMod%>" class="txp_ad <%=hideClass%>"> <txpdiv class=txp_ad_inner> <% if(!isUseMobileUI){%> <a data-role="<%=linkArea%>" href=javascript:; class="txp_ad_link <%=hideClass%>"></a> <% } %> <a data-role="<%=detail%>" href=javascript:; class="txp_ad_more <%=hideClass%>">详情点击 <txpdiv class=txp_icon_arrow></txpdiv> </a> <txpdiv style="left:10px;bottom:10px;position:absolute;opacity:.6;font-size:12px;text-shadow:2px 2px #000" data-role="<%=dspName%>" class="<%=hideClass%>"></txpdiv> <txpdiv class=txp_ad_control> <txpdiv data-role="<%=enterAd%>" class="txp_ad_skip <%=hideClass%>"> <txpdiv data-role="<%=time%>" class=txp_ad_countdown>10</txpdiv> <txpdiv class=txp_ad_skip_text>进入广告</txpdiv> </txpdiv> <txpdiv data-role="<%=trueview%>" class="txp_ad_skip <%=hideClass%>"> <txpdiv data-role="<%=time%>" class=txp_ad_countdown></txpdiv> <% if(isTrueviewButtonShow) {%> <txpdiv data-role="<%=trueviewText%>" class=txp_ad_skip_text>你可以在<span data-role="<%=countDown%>">5</span>秒后关闭广告 </txpdiv> <txpdiv data-role="<%=trueviewCloseText%>" class="txp_ad_skip_text <%=hideClass%>">关闭广告</txpdiv> <button data-role="<%=trueviewClose%>" class="txp_btn txp_btn_close <%=hideClass%>" title=关闭广告></button> <% } else {%> <txpdiv data-role="<%=time%>" class=txp_ad_countdown></txpdiv> 广告 <% } %> </txpdiv> <txpdiv data-role="<%=canSkip%>" class="txp_ad_skip <%=hideClass%>"> <% if(!isSkipAdButtonShow||isVshou) {%> 广告剩余: <txpdiv data-role="<%=time%>" class=txp_ad_countdown></txpdiv> 秒 <% } else {%> <txpdiv data-role="<%=time%>" class=txp_ad_countdown></txpdiv> <% if(isUseMobileUI){%> <button data-role="<%=closeText%>" class=txp_ad_skip_text title=VIP免广告>VIP免广告</button> <%}else{%> <%if(isVshou) {%> <txpdiv class=txp_ad_skip_text>广告</txpdiv> <%}else{%> <txpdiv data-role="<%=closeText%>" class="txp_ad_skip_text <%=hideClass%>">VIP免广告</txpdiv> <button data-role="<%=close%>" class="txp_btn txp_btn_close <%=hideClass%>" title=VIP免广告></button> <% }} }%> </txpdiv> <txpdiv data-role="<%=noSkip%>" class="txp_ad_skip <%=hideClass%>"> <txpdiv data-role="<%=time%>" class=txp_ad_countdown></txpdiv> <txpdiv data-role="<%=noSkipText%>" class=txp_ad_skip_text>应版权方要求，VIP无法免该片广告</txpdiv> <button data-role="<%=why%>" class="txp_btn txp_btn_hint" title=无法跳过广告说明></button> </txpdiv> <button data-role="<%=volume%>" class="txp_btn txp_btn_ad_volume <%=hideClass%>"> <svg class="txp_icon txp_icon_volume" version=1.1 viewBox="0 0 24 24"> <use class=txp_svg_volume xmlns:xlink=http://www.w3.org/1999/xlink xlink:href=#txp_svg_volume></use> <use class=txp_svg_volume_mute xmlns:xlink=http://www.w3.org/1999/xlink xlink:href=#txp_svg_volume_mute></use> </svg> </button> </txpdiv> <% if(isUseMobileUI){ %> <txpdiv data-role="<%=noSkipTips%>" class="txp_ad_forbidden <%=hideClass%>"> <div class=txp_forbidden_text> <%=noSkipTipsTextMobile%> </div> <a data-role="<%=noSkipTipsClose%>" class=txp_btn_em href=#>我知道了</a> </txpdiv> <% }else{ %> <txpdiv data-role="<%=noSkipTips%>" class="txp_ad_dialog <%=hideClass%>"> <txpdiv class=txp_dialog_bd> <%=noSkipTipsText%> </txpdiv> <txpdiv data-role="<%=noSkipTipsClose%>" class=txp_ad_btn>我知道了!</txpdiv> <a target=_blank; class=txp_ad_fb href="http://support.qq.com/write.shtml?fid=850">意见反馈</a> <button data-role="<%=noSkipTipsClose%>" class="txp_btn txp_btn_close"></button> </txpdiv> <% } %> </txpdiv> <txpdiv class="txp_ad_corner <%=hideClass%>"> <img alt=""> </txpdiv> <txpdiv data-role="<%=pauseAd%>" class="txp_ad_center <%=hideClass%>"> <button data-role="<%=pauseAdClose%>" class="txp_btn txp_btn_close txp_btn_close_ad" title=跳过广告></button> <img data-role="<%=pauseAdImg%>" alt=""> <txpdiv style=left:8px;bottom:8px;position:absolute;opacity:.6;font-size:12px> <txpdiv style="background:#000;display:inline-block;box-shadow:2px 2px #000">广告</txpdiv> <txpdiv data-role="<%=dspName%>" style="display:inline-block;margin-left:10px;text-shadow:2px 2px #000"></txpdiv> </txpdiv> </txpdiv> <txpdiv class="txp_ad_bottom <%=hideClass%>"> <img alt=""> </txpdiv> <txpdiv data-role="<%=ivbAd%>" class="txp_ad_bottom_lg <%=hideClass%>" style=position:absolute;z-index:2> <img data-role="<%=ivbAdImg%>" alt=""> <span style=opacity:.7>广告</span> </txpdiv> </txpdiv> <txpdiv data-role="<%=yaliuAd%>" class="<%=hideClass%>" style=z-index:2;position:absolute> </txpdiv>';
}, function(t, e) {
    function a(t, e) {
        return "string" == Txplayer.$.type(t) && e && (t += t.indexOf("?") == -1 ? "?" : "&" + Txplayer.$.param(e)), t
    }

    function i(t) {
        n = Txplayer.$, this.msg = new Txplayer.Events, this.dataset = {}, this.context = t, this.init()
    }
    var s, d, n = Txplayer.$,
        o = (Txplayer.apiList, Txplayer.util),
        r = {
            "not-start": 0,
            "request-cgi": 1,
            "request-cgi-done": 1.1,
            playing: 2,
            "play-end": 3
        },
        l = {
            "前贴": "WL|WK",
            "中插": "WC",
            "后贴": "WH",
            "暂停": "WZ",
            "口播": "WK",
            ivb: "WI",
            "压流": "WSJ"
        },
        p = {
            1: {
                type: "ivb",
                area: 1
            }
        },
        c = "WL|WK|WC|WH",
        u = 0,
        h = "H5",
        x = "6",
        y = 1;
    Txplayer.util.os.phone || Txplayer.util.os.tablet ? Txplayer.util.os.ipad ? x = "6" : Txplayer.util.os.iphone ? x = "3" : Txplayer.util.os.android && Txplayer.util.os.tablet ? x = "4" : Txplayer.util.os.android && Txplayer.util.os.phone && (x = "5") : x = "0";
    var m = 0,
        g = null;
    i.prototype = {
        init: function() {
            this.dataset.dataKey = Txplayer.dataset.localStorageKey.adRfid, this.context.dataset.isPlayingAd = !1, this.initAdParams(), this.addEventListener(), this.exportsModuleApis()
        },
        initAdParams: function() {
            this.context.dataset.adReportData = {}, this.dataset.useMiaoBo = !0, s = this.context.gpApi, "pc" === this.getExtentionPlatform() || "mac" === this.getExtentionPlatform() ? (h = this.isInSite() ? "in" : "out", l = {
                "前贴": "LD|KB|PVL",
                "中插": "ZC",
                "后贴": "HT",
                "暂停": "ZT",
                "口播": "KB",
                "压流": "PSJ",
                PPB: "PPB",
                PVL: "PVL",
                ivb: "ZI"
            }, c = "LD|KB|ZC|HT", d = "pc", y = 2) : d = this.getExtentionPlatform(), this.context.dataset.adReportData.pf = h, this.context.gpApi.adtypeMap = l, this.context.gpApi.pf_ex = d, this.getReqId()
        },
        supportAd: function(t) {
            var e = this,
                a = {
                    mac: "前贴,后贴,中插,暂停,PPB,PVL,ivb,压流",
                    pc: "前贴,后贴,中插,暂停,PPB,PVL,ivb,压流",
                    ipad: "前贴,后贴,暂停,ivb,压流",
                    mobile: "前贴,后贴,暂停,ivb,压流",
                    android: "前贴,后贴,暂停,ivb,压流",
                    default: "前贴,后贴"
                };
            if ("pc" == d) return !0;
            if (Txplayer.util.os.ipad) {
                if (a.ipad.indexOf(t) >= 0) return !0
            } else if (Txplayer.util.mobile) {
                if (a.mobile.indexOf(t) >= 0) return "暂停" != t || !!e.context.dataset.isBrowserFullscreen
            } else if (Txplayer.util.os.android) {
                if (a.android.indexOf(t) >= 0) return !0
            } else if (a.default.indexOf(t) >= 0) return !0;
            return !1
        },
        getExtentionPlatform: function() {
            return o.os.iphone ? "iphone" : o.os.ipad ? "ipad" : o.os.android ? "android" : o.os.mac ? "mac" : o.os.windows ? "pc" : ""
        },
        isVideoAd: function(t) {
            if (!t) return !1;
            var e = ["loadingad", "insertad", "endingad"];
            return n.inArray(t, e) > -1
        },
        getAdChannelId: function() {
            if (/ptag=wx\.search/i.test(location.href)) return 64;
            if (this.context.config && this.context.config.hasOwnProperty("chid") && "" != this.context.config.chid) return this.context.config.chid;
            var t = "";
            return /(.*\.)3g\.qq\.com$/i.test(window.location.hostname) ? t = 13 : /(.*\.)?v\.qq\.com$/i.test(window.location.hostname) || o.browser.qqlive ? t = 0 : o.browser.wechat ? t = 3 : o.browser.mqq ? t = 10 : o.browser.qqnews && (t = 2), t
        },
        isInSite: function() {
            return "v.qq.com" === location.hostname || "film.qq.com" === location.hostname || 8 === this.getAdChannelId()
        },
        noAd4Advertisers: function() {
            return "700700700" === Txplayer.util.getUrlParam("oid")
        },
        abortAndReRequest: function() {
            this.dataset.ajaxAdRequest && "function" === Txplayer.$.type(this.dataset.ajaxAdRequest.abort) && this.dataset.ajaxAdRequest.abort(), this.requestCgi({
                adType: "前贴"
            })
        },
        listenTouch: function(t) {
            if ("mac" === this.getExtentionPlatform()) {
                var e = this,
                    a = function(t) {
                        "block" == t.target.style.display && (g = t.target, m < g.currentTime && e.context.dataset.isPlayingAd && (g.currentTime = m))
                    },
                    i = setInterval(function() {
                        g && (m = g.currentTime)
                    }, 1e3);
                t ? (Txplayer.$("video").off("seeking.touchbarAd"), Txplayer.$("video").off("seeked.touchbarAd"), Txplayer.$("video").on("seeking.touchbarAd", a), Txplayer.$("video").on("seeked.touchbarAd", a)) : (clearInterval(i), Txplayer.$("video").off("seeking.touchbarAd"), Txplayer.$("video").off("seeked.touchbarAd"))
            }
        },
        isCgiRequest: function(t, e) {
            var a = "前贴,后贴";
            if (this.dataset.requestList && this.dataset.requestList[e]) {
                if (a.indexOf(e) > -1 && this.dataset.requestList[e].vid == t && this.dataset.requestList[e].status) return !0;
                if (a.indexOf(e) < 0 && this.dataset.requestList[e].vid == t && "hasRequest" == this.dataset.requestList[e].status) return !0
            }
            return !1
        },
        setCgiStatus: function(t, e, a) {
            this.dataset.requestList || (this.dataset.requestList = {}), this.dataset.requestList[e] = {
                vid: t,
                status: a
            }
        },
        requestCgi: function(t) {
            var e = this;
            if ("view.inews.qq.com" === window.location.hostname) return void e.context.msg.broadcast("loadingadIsEmpty", !1);
            t = t || {};
            var a = "http://livew.l.qq.com/livemsg?",
                i = Txplayer.$.Deferred();
            if (isPrepLoad = t.isPrepLoad || !1, vid = t.vid || this.context.dataset.vid, cid = t.cid || e.context.dataset.cid || "", rfid = o.getData(this.dataset.dataKey), !t.adType) return void o.showError("请求广告cgi参数错误, adType必须传");
            if (e.supportAd(t.adType) && !this.isCgiRequest(vid, t.adType)) {
                "https:" === location.protocol && (a = "https://livew.l.qq.com/livemsg?");
                var p = function(a) {
                    "前贴" === t.adType ? e.context.msg.broadcast("loadingadIsEmpty", isPrepLoad) : "后贴" === t.adType ? e.context.msg.broadcast("adEnd", {
                        type: "endingad"
                    }) : "压流" === t.adType && e.context.msg.broadcast("reportDp3B", {
                        bid: "10091000",
                        step: "2",
                        errorcode: "102"
                    }), e.context.dataset.adReportData.errorcode = 101, a || e.context.msg.broadcast("lviewRequestOver", {
                        adType: l[t.adType],
                        vid: vid
                    })
                };
                if (this.noAd4Advertisers() && "前贴" === t.adType) return void p();
                if (!this.noAd4Advertisers()) {
                    e.context.config && "function" === Txplayer.$.type(e.context.config.getUserType) && (e.dataset.pu = e.context.config.getUserType());
                    var c = {
                        pf: h,
                        ad_type: l[t.adType],
                        pf_ex: d,
                        url: location.href,
                        ty: "web",
                        plugin: "1.0.0",
                        v: Txplayer.dataset.ver,
                        coverid: cid,
                        pt: e.context.dataset.businessId || "",
                        vid: vid,
                        flowid: e.context.dataset.flowid || "",
                        guid: e.context.dataset.guid || "",
                        vptag: "",
                        pu: e.dataset.pu || "-1",
                        chid: e.getAdChannelId(),
                        adaptor: y,
                        dtype: 1,
                        live: u,
                        resp_type: "json",
                        _time_random: +new Date
                    };
                    t.hasOwnProperty("zcindex") && (c.zcindex = t.zcindex), "前贴" === t.adType && rfid && (c.rfid = rfid), e.context.dataset.trailerMode && (c.page = "trailerMode", c.trailerMode = 1), "coolOpen" == e.context.config.playerType && (c.page = "coolOpen", e.context.dataset.isAnNewPlayAction ? c.channelId = 1 : c.channelId = 2), "page_langSwitch" == e.context.dataset.adext && (c.page = "langSwitch"), isPrepLoad && (c.preload = 1, c.url = location.href.replace(/(\/)([A-Za-z0-9]+)(\.html)/, "$" + vid + "$3"));
                    var x = o.getAdChannelId();
                    x && (c.chid = x);
                    var m = function(a) {
                            if (e.setCgiStatus(vid, t.adType, "done"), !a) return e.dataset.cgiLoadState.code = 4, void p();
                            if (!(a && a.adList && a.adList.item)) return e.dataset.cgiLoadState.code = 4, void p();
                            if (a.adList.has_scene_info && "0" === a.adList.has_scene_info || "前贴" !== t.adType) {
                                if ("压流" === t.adType) return e.context.dataset.adReportData.adType = l[t.adType], void e.context.msg.broadcast("loadendyaliu", a)
                            } else e.context.msg.broadcast("loadyaliu", "loadyaliu");
                            var d;
                            if (isPrepLoad ? (e.dataset.prepOrderList || (e.dataset.prepOrderList = {}), d = e.dataset.prepOrderList) : d = e.context.dataset, d.adJson = a, a.adLoc && a.adLoc.adFlag + "" != "0" && (d.isAdCanSkip = !0), e.dataset.cgiLoadState.code = 0, d.adList = [], e.dataset.isAdPlayStart = !1, d.reportIndex = 0, e.dataset.isPing = !1, Txplayer.$.isArray(a.adList.item) ? d.adList = a.adList.item : a.adList.item.image && d.adList.push(a.adList.item), "PPB" == t.adType ? e.context.msg.broadcast("ppbAdDataReady", d.adList) : "ivb" === t.adType ? (e.context.msg.broadcast("ivbAdDataReady", d.adList), e.context.msg.broadcast("reportAd", d.adJson.adList.item[0])) : "暂停" === t.adType ? (d.adList = e.filterAdRes(d.adList, !0), 0 === d.adList.length ? e.context.msg.broadcast("reportAd", d.adJson.adList.item[0]) : e.context.msg.broadcast("reportAd", d.adList), e.dataset.isPing = !0) : (d.adList = e.filter(d.adList), n.extend(s.videoAdList[s.adType2VideoType[t.adType]], d.adList)), "前贴" === t.adType && (e.dataset.pvlAd = e.filterAdByType(a.adList.item, "PVL"), e.dataset.loadingAd = d.adList.concat(e.dataset.pvlAd)), e.context.msg.broadcast("lviewRequestOver", {
                                    adType: l[t.adType],
                                    vid: vid,
                                    adJson: a
                                }), "前贴" === t.adType && (e.listenTouch(1), e.recordInsertAdStartTime(a.adLoc.breakTime), a.adLoc.mult && a.adLoc.mult.ivb && e.recordMultTime(a.adLoc.mult.ivb), 0 == e.dataset.pvlAd.length && 0 == d.adList.length || e.context.msg.broadcast("loadingAdDataReady", e.dataset.loadingAd, isPrepLoad)), "后贴" === t.adType && (e.listenTouch(1), e.context.msg.broadcast("endingAdDataReady", d.adList), e.context.dataset.nextVid && e.context.dataset.nextVideoInfo && e.context.dataset.nextVideoInfo.vid && (s.isPrepLoad = !0, e.requestCgi({
                                    adType: "前贴",
                                    isPrepLoad: !0,
                                    vid: e.context.dataset.nextVideoInfo.vid,
                                    cid: e.context.dataset.nextVideoInfo.cid
                                }))), 0 === d.adList.length) {
                                if ("前贴" === t.adType && 0 != e.dataset.pvlAd.length) return;
                                return void p(a)
                            }
                            "中插" === t.adType && (e.listenTouch(1), e.updateInsertAdListStatus(e.dataset.currentInsertAdPoint, r["request-cgi-done"]), e.dataset.isEnterAd = !0, e.context.dataset.isPlayingAd = !0, e.context.msg.broadcast("disableProgress"), e.context.msg.broadcast("disablePlayBtn"), e.context.msg.broadcast("disableDefinitionBtn"), e.enterAd(), setTimeout(function() {
                                e.context.msg.broadcast("insertAdDataReady", {
                                    data: e.context.dataset.adList,
                                    insertTime: e.dataset.currentInsertAdPoint
                                }), e.dataset.isEnterAd = !1
                            }, 1e4)), "暂停" === t.adType && e.context.msg.broadcast("pauseAdDataReady", e.context.dataset.adList), d.adDuration = e.getAdDuration(), i.resolve()
                        },
                        g = function() {
                            if (!e.isCgiRequest(vid, t.adType)) {
                                s.videoAdList[s.adType2VideoType[t.adType]] = [], e.setCgiStatus(vid, t.adType, "hasRequest"), e.context.dataset.adReportData.aid2oid = -1, e.context.dataset.adReportData.adType = l[t.adType], a += Txplayer.$.param(c), o.showInfo("HdPlayerAd.requestCgi.data", c);
                                var d = Txplayer.$.Deferred();
                                d.then(function(t) {
                                    return t
                                }, function() {
                                    return e.dataset.ajaxAdRequest = Txplayer.$.jsonp({
                                        url: a,
                                        dataType: "jsonp",
                                        callbackParameter: "callback",
                                        callback: Txplayer.util.getJsonpCallbackName("livew"),
                                        timeout: 8e3
                                    })
                                }).done(m).fail(function(a, s) {
                                    e.context.dataset.adReportData.errorcode = 202, e.context.msg.broadcast("lviewRequestError", {
                                        adType: l[t.adType],
                                        vid: vid
                                    }), e.setCgiStatus(vid, t.adType, "fail"), "timeout" === s ? e.dataset.cgiLoadState.code = 3 : e.dataset.cgiLoadState.code = 1;
                                    var d;
                                    d = 404 === a.status ? "检测广告被屏蔽" : a.status, o.showError("广告请求失败", d + "-" + s), "前贴" === t.adType && e.context.msg.broadcast("loadingAdRequestError", {
                                        code: a.status,
                                        msg: d,
                                        isPrepLoad: isPrepLoad
                                    }), "压流" === t.adType && e.context.msg.broadcast("reportDp3B", {
                                        bid: "10091000",
                                        step: "2",
                                        errorcode: "101"
                                    }), i.reject()
                                }).always(function(t, a) {
                                    e.dataset.useMiaoBo = !1, e.dataset.cgiLoadState.etime = (new Date).getTime(), e.context.dataset.adReportData.aid2oid = e.dataset.cgiLoadState.etime - e.dataset.cgiLoadState.stime, e.context.msg.broadcast("adCgiLoaded", e.dataset.cgiLoadState)
                                }), e.dataset.cgiLoadState = {
                                    stime: (new Date).getTime(),
                                    adType: t.adType,
                                    isPrepLoad: isPrepLoad,
                                    vid: vid
                                }, e.dataset.useMiaoBo && "前贴" === t.adType && "function" == typeof _tenplayer_getAdData && _tenplayer_getAdData() ? d.resolve(_tenplayer_getAdData()) : d.reject()
                            }
                        };
                    if (!Txplayer.util.mobile || Txplayer.util.os.ipad || !Txplayer.util.txLoginOnMobile || "function" !== n.type(Txplayer.util.txLoginOnMobile.getWXCookie)) return "wx" === o.cookie.get("main_login") && (c.uid = o.cookie.get("vuserid"), c.tkn = o.cookie.get("vusession"), c.lt = "wx"), g(), i;
                    var v = !1;
                    Txplayer.util.txLoginOnMobile.getWXCookie(function(t) {
                        return v ? i : ("wx" === t.main_login && (c.uid = t.vuserid, c.tkn = t.vusession, c.lt = "wx"), g(), v = !0, i)
                    })
                }
            }
        },
        setReportNull: function(t) {
            t.order_id = "1", t.reportUrl = t.reportUrl.replace(/(livemsg\?o\=)(\d+)(\&)/, "$190$3"), t.reportUrlOther = null, t.reportUrlSDK = null
        },
        checkSuffix: function(t, e) {
            t = t.toLowerCase();
            var a = /\.(\w+)(?:$|\?|\#)/.exec(t);
            if (!a || !a[1]) return !1;
            if (!e) return a[1];
            if ("string" == typeof e) return a[1] === e;
            if (Txplayer.$.isArray(e)) {
                for (var i = !1, s = e.length - 1; s >= 0; s--)
                    if (a[1] === e[s]) return i = !0, !0;
                return !1
            }
        },
        filterRichMedia: function(t) {
            return !!(t && t.display_code && t.display_code.length > 0 && "Empty" != t.display_code) && (this.setReportNull(t), !0)
        },
        filterAdByType: function(t, e) {
            var a = [],
                t = t || [],
                e = e || c;
            return Txplayer.$(t).each(function(t, i) {
                i && e.indexOf(i.type) >= 0 && a.push(i)
            }), a
        },
        filter: function(t) {
            var e, a, i, s, d, n = [],
                o = this;
            for (t = Txplayer.$.isArray(t) ? t : [], e = 0, a = t.length; e < a; e++)
                if (i = t[e] || {}, i.oIdx = e + 1, s && s == i.type ? s == i.type && d++ : (d = 1, s = i.type), i.lcount = d, !o.filterRichMedia(i) && i && i.image && i.duration > 0 && (i.image = (Txplayer.$.isArray(i.image) ? i.image[0] : i.image) || {}, i.image && (i.image.url || i.image.vid))) {
                    if (o.checkSuffix(i.image.url, "mp4")) {
                        i.link = "Y" === i.no_click ? "" : i.link, n.push(i);
                        continue
                    }
                    o.setReportNull(i)
                }
            return n
        },
        filterAdRes: function(t, e) {
            var a = [],
                i = this;
            return Txplayer.$(t).each(function(t, s) {
                e && i.filterRichMedia(s) || s && s.image && ("array" === Txplayer.$.type(s.image) && (s.image = s.image[0]), s.image && s.image.width && s.image.height && s.image.url && (i.checkSuffix(s.image.url, ["jpg", "png", "jpeg"]) ? a.push(s) : i.setReportNull(s)))
            }), a
        },
        recordMultTime: function(t) {
            var e = this;
            e.dataset.adLocTimes = [], Txplayer.$(t).each(function(t, a) {
                a && a.time && e.dataset.adLocTimes.push({
                    index: t,
                    time: a.time / 1e3,
                    type: a.type,
                    area: p[a.type].area
                })
            })
        },
        recordInsertAdStartTime: function(t) {
            if (t && t.hasOwnProperty("t")) {
                var e = this,
                    a = [];
                a = "string" === Txplayer.$.type(t.t) ? [t.t] : t.t, e.dataset.insertAdList = [];
                var i = function(t) {
                        var a = e.context.msg.getData("calcTotalPlaylist", "film");
                        if (0 === a) return e.context.msg.once("getVideoUrlSuccess.recordInsertAdStartTime", function() {
                            setTimeout(s, 100), e.context.msg.off("getVideoUrlSuccess.recordInsertAdStartTime")
                        }), 0;
                        if (a >= 2) {
                            var i = t % 300;
                            (i >= 285 || i <= 15) && (t += 30, t >= e.context.dataset.duration && (t -= 60))
                        }
                        return parseInt(t)
                    },
                    s = function() {
                        e.dataset.insertAdList = [], Txplayer.$(a).each(function(t, a) {
                            var s = i(parseInt(a));
                            0 !== s && e.dataset.insertAdList.push({
                                startTime: s,
                                status: r["not-start"]
                            })
                        })
                    };
                s()
            }
        },
        checkInTimeArea: function(t, e, a) {
            return t > e + a ? -1 : t < e - a ? 1 : 0
        },
        getAdPlayPoint: function(t) {
            if (t && this.dataset.adLocTimes) {
                t = parseInt(t);
                var e = this;
                return e.dataset.currentAdPoint = -1, Txplayer.$(e.dataset.adLocTimes).each(function(a, i) {
                    var s = e.checkInTimeArea(t, i.time, i.area);
                    return 0 === s ? e.dataset.currentAdPoint = a : 1 === s ? (e.dataset.nextAdPoint = a, -1) : void 0
                }), -1
            }
        },
        checkAdTime: function(t) {
            if (t && this.dataset.adLocTimes) {
                t = parseInt(t);
                var e = this;
                e.getAdPlayPoint(t), e.dataset.currentAdPoint > -1 && (this.requestCgi({
                    adType: p[e.dataset.adLocTimes[e.dataset.currentAdPoint].type].type,
                    zcindex: e.dataset.adLocTimes[e.dataset.currentAdPoint].index
                }), e.dataset.adLocTimes.splice(e.dataset.currentAdPoint, 1)), 0 === e.dataset.adLocTimes.length
            }
        },
        startInsertAd: function(t) {
            if (t && this.dataset.insertAdList) {
                t = parseInt(t);
                var e = !1,
                    a = 0,
                    i = this,
                    s = function(e) {
                        return t <= e + 15 && t >= e - 15
                    };
                Txplayer.$(i.dataset.insertAdList).each(function(t, d) {
                    if (s(d.startTime) && parseInt(d.status) === r["not-start"]) return i.dataset.currentInsertAdPoint = d.startTime, e = !0, a = t, !1
                }), e && (this.requestCgi({
                    adType: "中插",
                    zcindex: a
                }), this.updateInsertAdListStatus(i.dataset.currentInsertAdPoint, r["request-cgi"]))
            }
        },
        updateInsertAdListStatus: function(t, e) {
            t && e && Txplayer.$(this.dataset.insertAdList).each(function(a, i) {
                if (i.startTime === t) return i.status = e, !1
            })
        },
        getAdCurrentTime: function() {
            if (!this.context.dataset.isPlayingAd) return 0;
            var t = (this.context.dataset.currentPlayListType, this.context.dataset.playListIndex),
                e = this.context.dataset.videoCurrentTime,
                a = 0,
                i = 0;
            return Txplayer.$(this.context.dataset.adList).each(function(e, i) {
                return e !== t && void(i.duration && (a += parseInt(i.duration, 10) / 1e3))
            }), i = e + a, parseInt(i)
        },
        getAdDuration: function() {
            var t = 0;
            return n(this.context.dataset.adList).each(function(e, a) {
                a.duration && (t += parseInt(a.duration, 10) / 1e3)
            }), this.dataset.errAdTime && "number" == n.type(this.dataset.errAdTime) && (t -= this.dataset.errAdTime), t
        },
        getCurrentAdInfo: function() {
            if (!this.context.dataset.isPlayingAd) return {};
            var t = this.context.dataset.currentPlayListType;
            if ("film" === t) return {};
            var e, a = this.context.msg.getData("getPlayListIndex", t);
            return this.context.dataset.adList && this.context.dataset.adList[a] && (e = this.context.dataset.adList[a]), e ? e : {}
        },
        isAdCanSkip: function() {
            return !(!this.context.dataset.adJson || !this.context.dataset.adJson.adLoc || "0" === this.context.dataset.adJson.adLoc.adFlag)
        },
        pauseAd: function() {
            this.context.msg.broadcast("pause")
        },
        playAd: function() {
            this.context.msg.broadcast("play")
        },
        enterAd: function() {
            this.context.msg.broadcast("enterAd")
        },
        skipAd: function(t) {
            t = t || {};
            var e = {
                type: this.context.dataset.currentPlayListType,
                force: !!t.force
            };
            return this.clearDelayReport(), t.force ? void this.context.msg.broadcast("handlerSkipAd", e) : void(this.context.dataset.duration > 180 || (this.context.dataset.isPlayingAd = !1, this.dataset.isEnterAd = !1, this.context.msg.broadcast("handlerSkipAd", e)))
        },
        skipErrorAd: function(t, e) {
            if (t) {
                var a = this,
                    i = a.context.dataset.currentPlayListType,
                    s = a.filterAdByType(a.context.dataset.adList, c),
                    d = s.length - 1 == t.index;
                t.hasOwnProperty("index") && a.context.dataset.adList[t.index] && (a.dataset.errAdTime || (a.dataset.errAdTime = 0), a.dataset.errAdTime += a.context.dataset.adList[t.index].duration / 1e3, a.context.dataset.adDuration = a.getAdDuration()), d && (a.context.dataset.isPlayingAd = !1, a.dataset.isEnterAd = !1, a.dataset.errAdTime = null), e || a.context.msg.broadcast("loadingAdPlayError", {
                    isLastAd: d,
                    type: i
                })
            }
        },
        saveRFID: function() {
            var t = this;
            t.context.dataset.adJson && t.context.dataset.adJson.adLoc && t.context.dataset.adJson.adLoc.rfid && o.setData(t.dataset.dataKey, t.context.dataset.adJson.adLoc.rfid)
        },
        checkPing: function() {
            var t = this,
                e = t.getCurrentAdInfo() || {};
            if (!t.dataset.isEnterAd && (t.dataset.isAdPlayStart || !(t.context.dataset.adList.length > 0) || e.hasOwnProperty("oIdx")))
                if (t.context.dataset.reportIndex > t.context.dataset.adJson.adList.item.length) t.context.dataset.reportIndex = 0, t.dataset.isPing = !0;
                else if (!t.dataset.isPing) {
                t.context.dataset.reportIndex || (t.context.dataset.reportIndex = 1);
                var a = t.context.dataset.reportIndex,
                    i = e.oIdx || t.context.dataset.adJson.adList.item.length;
                for (0 == t.context.dataset.adList.length && (i = t.context.dataset.adJson.adList.item.length); a <= i;) {
                    var s = t.context.dataset.adJson.adList.item[a - 1];
                    s && "1" == s.order_id ? (t.getReportItem(a), t.reportAdByOid(a)) : a == i && (t.context.msg.broadcast("startViewMonitor", e), t.getReportItem(), t.reportAdByOid()), a++, t.context.dataset.reportIndex = a
                }
                i === t.context.dataset.adJson.adList.item.length && (t.dataset.isPing = !0, t.context.dataset.reportIndex = 0)
            }
        },
        getReportItem: function(t) {
            var e = this,
                i = t ? e.context.dataset.adJson.adList.item[t - 1] : e.getCurrentAdInfo(),
                s = [],
                n = 0;
            i && (i.reportUrl && (n = isNaN(i.ReportTime) ? 0 : Math.ceil(i.ReportTime / 1e3), s.push({
                time: n,
                url: a(i.reportUrl, {
                    pf_ex: d,
                    tpid: e.context.dataset.adJson.adLoc.tpid || ""
                }),
                isOther: !1
            })), i.reportUrlOther && i.reportUrlOther.reportitem && (Txplayer.$.isArray(i.reportUrlOther.reportitem) || (i.reportUrlOther.reportitem = [i.reportUrlOther.reportitem]), Txplayer.$.each(i.reportUrlOther.reportitem, function(t, e) {
                e && e.url && (n = isNaN(e.reporttime) ? 0 : Math.ceil(e.reporttime / 1e3), s.push({
                    time: n,
                    url: e.url,
                    isOther: !0
                }))
            })), i.reportUrlSDK && i.reportUrlSDK.reportitem && (Txplayer.$.isArray(i.reportUrlSDK.reportitem) || (i.reportUrlSDK.reportitem = [i.reportUrlSDK.reportitem]), Txplayer.$.each(i.reportUrlSDK.reportitem, function(t, e) {
                e && e.url && (n = isNaN(e.reporttime) ? 0 : Math.ceil(e.reporttime / 1e3), s.push({
                    time: n,
                    url: e.url,
                    isOther: !0
                }))
            })), e.context.dataset.reportObjArr = s)
        },
        reportAdByOid: function(t) {
            function e(t, e, a) {
                var s;
                s = 2 === u ? isNaN(a) ? Math.ceil(currentTime) : a : 0, s = e && e.ReportTime < s ? e.ReportTime : s;
                var d = {
                    from: x,
                    pf: h,
                    v: Txplayer.dataset.ver,
                    dura: i.context.dataset.duration,
                    coverid: i.context.dataset.cid || "",
                    vptag: Txplayer.util.getPTAG() || "",
                    url: location.href,
                    oadid: i.context.dataset.adJson.adLoc.aid || "",
                    lcount: t || 1,
                    t: 1e3 * s
                };
                return "Empty" == e.display_code && (d.chid = i.getAdChannelId()), d
            }
            var i = this;
            if (i.context.dataset.reportObjArr && i.context.dataset.reportObjArr[0]) {
                var s = t ? i.context.dataset.adJson.adList.item[t - 1] : i.getCurrentAdInfo();
                if (!s) return;
                Txplayer.$.each(i.context.dataset.reportObjArr, function(t, d) {
                    if (i.context.dataset.reportObjArr[t]) {
                        var n = 2 === u ? currentTime : 0;
                        if (d) {
                            var o = {
                                url: document.URL
                            };
                            d.isOther || (o = Txplayer.$.extend(o, e(s.lcount, s, d.time)));
                            var r = a(d.url, o),
                                l = i.context.dataset.reportObjArr;
                            n > d.time && n - d.time < 1 || d.time <= n ? Txplayer.util.report(r) : i.delayReport(r, 1e3 * parseInt(d.time)), l[t] = void 0
                        }
                    }
                }), i.context.dataset.reportObjArr = null
            }
        },
        delayReport: function(t, e) {
            var a = this,
                i = setTimeout(function() {
                    Txplayer.util.report(t)
                }, e);
            a.dataset.delayReportArr || (a.dataset.delayReportArr = []), a.dataset.delayReportArr.push(i)
        },
        clearDelayReport: function() {
            var t = this;
            t.dataset.delayReportArr && Txplayer.$.each(t.dataset.delayReportArr, function(t, e) {
                e && clearTimeout(e), e = null
            })
        },
        getAdPlayStatus: function() {
            return this.context.dataset.currentPlayListType && "film" !== this.context.dataset.currentPlayListType ? this.context.dataset.isPlayingAd = !0 : this.context.dataset.isPlayingAd = !1
        },
        addEventListener: function() {
            var t = this;
            this.dataset.eventsList = {}, this.dataset.eventsList[o.getUniqueMsgKey("adPluginMsg")] = function(e) {
                switch (e.name) {
                    case "requestCgi":
                        t.requestCgi({
                            adType: e.params
                        });
                        break;
                    case "reportAd":
                        t.context.msg.broadcast("reportAd", e.params)
                }
            }, this.dataset.eventsList[o.getUniqueMsgKey("videoTimeUpdate")] = function(e) {
                if (t.dataset.isEnterAd) t.context.dataset.isPlayingAd = !0;
                else if (t.context.dataset.isPlayingAd) return void(e && "film" === e.playListType && !t.dataset.isEnterAd && (t.context.dataset.isPlayingAd = !1));
                t.supportAd("中插") && t.startInsertAd(t.context.dataset.currentTime), t.checkAdTime(t.context.dataset.currentTime)
            }, this.dataset.eventsList[o.getUniqueMsgKey("videoTimeUpdate")] = function(e) {
                var a = (t.context.dataset.currentPlayListType, t.context.dataset.currentTime),
                    i = t.context.dataset.duration,
                    s = t.context.dataset.playEndTime;
                e && "film" === e.playListType && !t.dataset.hasRequestEndingAdData && t.context.dataset.isTheLastOfCurrentType && (t.context.dataset.skipPrelude && s > 0 && a >= s && (t.dataset.hasRequestEndingAdData = !0, t.requestCgi({
                    adType: "后贴"
                })), i && i - a <= 5 && (t.dataset.hasRequestEndingAdData = !0, t.requestCgi({
                    adType: "后贴"
                }))), t.context.dataset.adJson && t.context.dataset.adJson.adList && t.checkPing()
            }, this.dataset.eventsList[o.getUniqueMsgKey("videoEnd")] = function(e) {
                e.playListTypeEnd && "loadingad" === e.playListType ? (t.context.dataset.isPlayingAd = !1, t.context.msg.broadcast("loadingAdEnded"), t.saveRFID()) : e.playListTypeEnd && "insertad" === e.playListType && (t.context.dataset.isPlayingAd = !1, t.updateInsertAdListStatus(t.dataset.currentInsertAdPoint, r["play-end"]), t.context.msg.broadcast("insertAdEnded")), e.playListTypeEnd && "film" !== e.playListType && (t.listenTouch(0), t.checkPing(), t.context.msg.broadcast("adEnd", {
                    type: e.playListType
                }), t.context.userMsg.broadcast("adEnd", {
                    type: e.playListType
                }), t.dataset.errAdTime = 0)
            }, this.dataset.eventsList[o.getUniqueMsgKey("videoPlaying")] = function(e) {
                var a = t.context.dataset.currentPlayListType;
                return "film" === a ? void(t.dataset.errAdTime = null) : void("loadingad" !== a || t.dataset.loadingAdHasPlayed ? "insertad" !== a || t.dataset.insertAdHasPlayed ? "endingad" !== a || t.dataset.endingAdHasPlayed || (t.context.msg.broadcast("endingAdStart"), t.context.userMsg.broadcast("adStart", {
                    type: a
                }), t.dataset.endingAdHasPlayed = !0) : (t.context.msg.broadcast("insertAdStart"), t.context.userMsg.broadcast("adStart", {
                    type: a
                }), t.dataset.insertAdHasPlayed = !0) : (t.context.msg.broadcast("loadingAdStart"), t.context.userMsg.broadcast("adStart", {
                    type: a
                }), t.dataset.loadingAdHasPlayed = !0))
            }, this.dataset.eventsList[o.getUniqueMsgKey("videoPlay")] = function(e) {
                t.getAdPlayStatus() && (t.dataset.isAdPlayStart = !0)
            }, this.dataset.eventsList[o.getUniqueMsgKey("videoPlaying")] = function(e) {
                t.getAdPlayStatus() && (t.dataset.isAdPlayStart = !0)
            }, this.dataset.eventsList[o.getUniqueMsgKey("userPausePlayer")] = function() {
                t.context.dataset.isPlayingAd || t.requestCgi({
                    adType: "暂停"
                })
            }, this.dataset.eventsList[o.getUniqueMsgKey("userStopVideo")] = function(e) {
                t.dataset.requestList = null
            }, this.dataset.eventsList[o.getUniqueMsgKey("videoEnd")] = function(e) {
                "film" === e.playListType || "endingad" === e.playListType && e.playListTypeEnd || t.context.msg.broadcast("hideUiPlay"), e.playListTypeEnd && e.isAllEnd && (t.context.dataset.isPlayingAd = !1, t.dataset.hasRequestGetinfo = !1, t.dataset.hasRequestEndingAdData = !1, t.dataset.isEnterAd = !1)
            }, this.dataset.eventsList[o.getUniqueMsgKey("getVideoUrlSuccess")] = function() {
                t.dataset.hasRequestGetinfo = !0
            }, this.dataset.eventsList[o.getUniqueMsgKey("error")] = function(e) {
                return e && !t.isVideoAd(e.type) ? void(t.dataset.errAdTime = null) : (t.context.dataset.adReportData.errorcode = 207, t.context.msg.broadcast("reportAdError", e), void t.skipErrorAd(e))
            }, this.dataset.eventsList[o.getUniqueMsgKey("vidChange")] = function(e, a) {
                t.dataset.hasRequestLoadingAdData = null, t.dataset.hasRequestEndingAdData = null, t.dataset.hasRequestGetinfo = null, t.context.dataset.isPlayingAd = !1, t.dataset.loadingAdHasPlayed = null, t.dataset.insertAdHasPlayed = null, t.dataset.endingAdHasPlayed = null, t.dataset.errAdTime = null, t.dataset.isEnterAd = !1, t.context.dataset.isSkipAd = !1
            }, this.dataset.eventsList[o.getUniqueMsgKey("beforeVideoPlay")] = function(e, a) {
                t.dataset.hasRequestLoadingAdData = null, t.dataset.hasRequestGetinfo = null, s.isPrepLoad = !1, s.currentVid = e, s.currentVid = e, t.dataset.requestList && t.dataset.requestList["前贴"] && e !== a ? t.dataset.requestList["前贴"].vid != e ? (t.dataset.requestList = null, t.abortAndReRequest()) : (t.dataset.isPing = !1, n.extend(t.context.dataset, t.dataset.prepOrderList), t.context.dataset.adDuration = t.getAdDuration(), t.dataset.prepOrderList = null) : (t.dataset.requestList = null, t.requestCgi({
                    adType: "前贴"
                })), t.listenTouch(0)
            }, this.dataset.eventsList[o.getUniqueMsgKey("beforeVideoRePlay")] = function(e) {
                t.dataset.hasRequestLoadingAdData = null, t.dataset.hasRequestGetinfo = null, t.dataset.isEnterAd = !1, t.context.dataset.isRePlay = !0, t.context.dataset.isSkipAd = !1, t.context.dataset.isPlayingAd = !1, t.dataset.loadingAdHasPlayed = null, t.dataset.insertAdHasPlayed = null, t.dataset.endingAdHasPlayed = null, t.dataset.requestList = null
            }, this.dataset.eventsList[o.getUniqueMsgKey("requestYaliu")] = function(e) {
                t.context.dataset.yaliuRequestStart = (new Date).getTime(), t.context.msg.broadcast("reportDp3B", {
                    bid: "10091000",
                    step: "1"
                }), s.isPrepLoad ? t.requestCgi({
                    adType: "压流",
                    isPrepLoad: !0,
                    vid: t.context.dataset.nextVideoInfo.vid,
                    cid: t.context.dataset.nextVideoInfo.cid
                }) : t.requestCgi({
                    adType: "压流"
                })
            }, Txplayer.$.each(this.dataset.eventsList, function(e, a) {
                t.context.msg.on(e, a)
            }), this.context.userMsg.on("1080pVipGuideClose.hdplayerad", function(e) {
                e && "closeSkipAd" === e.action && t.playAd()
            })
        },
        exportsModuleApis: function() {
            var t = this;
            this.dataset.privateApis = {}, this.dataset.privateApis.pauseAd = this.pauseAd.bind(this), this.dataset.privateApis.playAd = this.playAd.bind(this), this.dataset.privateApis.skipAd = this.skipAd.bind(this), this.dataset.privateApis.requestLoadingAd = function() {
                t.requestCgi({
                    adType: "前贴"
                })
            }, Txplayer.$.each(this.dataset.privateApis, function(e, a) {
                t.context.msg.on(e, a)
            })
        },
        getReqId: function() {
            for (var t = [], e = "0123456789abcdef", a = 0; a < 36; a++) t[a] = e.substr(Math.floor(16 * Math.random()), 1);
            t[14] = "4", t[19] = e.substr(3 & t[19] | 8, 1), t[8] = t[13] = t[18] = t[23] = "-";
            var i = t.join("");
            this.context.dataset.reqId = i
        }
    }, Txplayer.register("HdPlayerAd", i)
}, function(t, e, a) {
    function i(t) {
        s = Txplayer.$, this.msg = new Txplayer.Events, this.dataset = {}, this.context = t, this.init()
    }
    var s = Txplayer.$,
        d = Txplayer.util;
    Txplayer.apiList, a(3);
    i.prototype = {
        init: function() {
            this.write(), this.addEventListener()
        },
        write: function() {},
        assemble: function(t) {
            for (var e = {
                    adList: {
                        has_scene_info: t.adList.has_scene_info,
                        IsNeedTime: t.adList.IsNeedTime,
                        item: []
                    },
                    adGetv: t.adGetv,
                    adLoc: t.adLoc
                }, a = 0; a < t.adList.item.length; a++) {
                var i = t.adList.item[a].anchor_binding;
                if (i)
                    for (var s = 0; s < i.length; s++) {
                        var d = t.adList.item[a].order_id,
                            n = i[s].cid,
                            o = i[s].anchor_rule_id,
                            r = i[s].anchor_id,
                            l = this.assembleEachOrder(d, n, o, r, t.adList.item[a], t.scene_info.anchor_rule);
                        e.adList.item.push(l)
                    }
            }
            return e
        },
        assembleEachOrder: function(t, e, a, i, s, d) {
            var n = JSON.parse(JSON.stringify(s));
            delete n.creative, delete n.anchor_binding;
            for (var o = 0; o < s.creative.length; o++) {
                var r = s.creative[o];
                if (r.id == e)
                    for (var l in r) "id" == l ? n.cid = r[l] : n[l] = r[l]
            }
            for (var o = 0; o < s.anchor_binding.length; o++) {
                var p = s.anchor_binding[o];
                p.cid == e && p.anchor_rule_id == a && p.anchor_id == i && (n.link = p.link, n.report_url = p.report_url, n.anchor_rule_id = a)
            }
            for (var o = 0; o < d.length; o++)
                if (d[o].id == a)
                    for (var c = d[o].anchor, u = 0; u < c.length; u++) c[u].id == i && (n.anchor = c[u], n.anchor_rule_type = d[o].type);
            return n
        },
        requestPNG: function(t, e) {
            0 == t.indexOf("http://") && (t = "https://" + t.split("http://")[1]);
            var a = this;
            Txplayer.$.jsonp({
                url: t,
                dataType: "jsonp",
                callbackParameter: "callback",
                callback: "adplayerYaliuJsonpCallback",
                timeout: 2e4,
                cache: !0
            }).done(function(t) {
                for (var i = a.dataset.expandingOrders, s = 0; s < i.length; s++)
                    if (i[s].cid == e) {
                        var d = i[s].png_index;
                        i[s].material[d].data = t, i[s].offscreenCanvasArr = [];
                        var n = t.width,
                            o = t.height;
                        i[s].anchor.pos_w = n / 1920, i[s].anchor.pos_h = o / 1080;
                        for (var r = 0; r < t.frames.length - 1; r++) {
                            var l = t.frames[r],
                                p = "data:image/png;base64," + t.data[l];
                            a.getOffscreenCanvas(p, r, n, o, s, e)
                        }
                    }
                a.context.msg.broadcast("reportDp3B", {
                    bid: "10091000",
                    step: "4",
                    errorcode: "100",
                    index: e,
                    type: "png",
                    cost: (new Date).getTime() - a.context.dataset.yaliuFodderStart[e]
                })
            }).fail(function(t, i) {
                a.context.msg.broadcast("reportDp3B", {
                    bid: "10091000",
                    step: "4",
                    errorcode: "101",
                    type: "png",
                    cost: (new Date).getTime() - a.context.dataset.yaliuFodderStart[e]
                })
            })
        },
        requestMP4: function(t, e) {
            0 == t.indexOf("http://") && (t = "https://" + t.split("http://")[1]);
            for (var a = this, i = a.dataset.expandingOrders, s = 0; s < i.length; s++)
                if (i[s].cid == e) {
                    var d = i[s].mp4_index,
                        n = i[s].material[d].width / 2,
                        o = i[s].material[d].height;
                    i[s].anchor.pos_w = n / 1920, i[s].anchor.pos_h = o / 1080;
                    var r = document.createElement("video");
                    i[s].videoElement = r, r.style.width = n + "px", r.style.height = o + "px";
                    var l = new XMLHttpRequest;
                    l.open("GET", t, !0), l.responseType = "arraybuffer", l.timeout = "6000", l.send(), l.onload = function() {
                        if (200 !== l.status) return alert("Unexpected status code " + l.status + " for " + t), !1;
                        var i = new Uint8Array(l.response),
                            s = window.URL.createObjectURL(new Blob([i], {
                                type: "video/mp4"
                            }));
                        r.src = s, r.videoCanPlay = !0, a.context.msg.broadcast("reportDp3B", {
                            bid: "10091000",
                            step: "4",
                            errorcode: "100",
                            index: e,
                            type: "mp4",
                            cost: (new Date).getTime() - a.context.dataset.yaliuFodderStart[e]
                        })
                    }, l.onerror = function() {
                        a.context.msg.broadcast("reportDp3B", {
                            bid: "10091000",
                            step: "4",
                            errorcode: "101",
                            type: "mp4",
                            cost: (new Date).getTime() - a.context.dataset.yaliuFodderStart[e]
                        })
                    }
                }
        },
        getOffscreenCanvas: function(t, e, a, i, s, d) {
            var n = this,
                o = document.createElement("img");
            o.src = t, o.onload = function() {
                var t = document.createElement("canvas"),
                    d = t.getContext("2d");
                t.width = a, t.height = i, d.drawImage(o, 0, 0, a, i), n.dataset.expandingOrders[s].offscreenCanvasArr[e] = t
            }
        },
        addEventListener: function() {
            var t = this;
            this.dataset.eventsList = {};
            var e = this.dataset.eventsList;
            e[d.getUniqueMsgKey("videoTimeUpdate")] = function(e) {
                var a = t.context.dataset.currentTime,
                    i = t.dataset.expandingOrders;
                if (i)
                    for (var s = 0; s < i.length; s++) {
                        if ("pc" === t.context.gpApi.pf_ex) var d = t.checkTime(i[s], a, 6e3);
                        else var d = t.checkTime(i[s], a, 2e4);
                        var n = t.checkTime(i[s], a, 0);
                        d && !i[s].preload && (t.preload(i[s]), i[s].preload = !0), n ? t.context.dataset.canReportCids[i[s].cid] = !0 : (t.context.dataset.canReportCids[i[s].cid] = !1, t.context.dataset.hasReportCids[i[s].cid] = !1, t.context.msg.broadcast("yaliuKeybroadSeek", i[s].cid)), n && t.context.dataset.hasShowCidArr.indexOf(i[s].cid) == -1 && 1 == t.context.dataset.playState && t.context.dataset.vid == i[s].vid && "film" == e.playListType && ("pc" === t.context.gpApi.pf_ex ? (t.context.dataset.hasShowCidArr.push(i[s].cid), t.context.msg.broadcast("renderYaliu", i[s])) : i[s].material[i[s].png_index].data && (t.context.dataset.hasShowCidArr.push(i[s].cid), t.context.msg.broadcast("renderYaliu", i[s]))), "film" != e.playListType && t.context.msg.broadcast("yaliuKeybroadSeek", i[s].cid)
                    }
            }, e[d.getUniqueMsgKey("loadyaliu")] = function(e) {
                t.context.msg.broadcast("requestYaliu")
            }, e[d.getUniqueMsgKey("loadendyaliu")] = function(e) {
                t.context.dataset.yaliuRequestEnd = (new Date).getTime(), t.context.msg.broadcast("reportDp3B", {
                    bid: "10091000",
                    step: "2",
                    errorcode: "100",
                    cost: t.context.dataset.yaliuRequestEnd - t.context.dataset.yaliuRequestStart
                }), t.context.dataset.hasShowCidArr = [], t.context.dataset.canReportCids = {}, t.context.dataset.hasReportCids = {}, t.context.dataset.yaliuCidArr = [], t.dataset.expandingOrders = t.assemble(e).adList.item;
                for (var a = e.adLoc.vid, i = t.dataset.expandingOrders, s = i.length - 1; s >= 0; s--) {
                    for (var e = i[s], d = e.material.length - 1; d >= 0; d--) {
                        var n = e.material[d].url;
                        ".mp4" === n.substring(n.length - 4).toLowerCase() ? e.mp4_index = d : ".json" === n.substring(n.length - 5).toLowerCase() && (e.png_index = d)
                    }
                    e.vid = a, t.context.dataset.hasReportCids[e.cid] = !1, t.context.dataset.yaliuCidArr.push(e.cid)
                }
                t.context.dataset.yaliuFodderStart = {}
            }, Txplayer.$.each(this.dataset.eventsList, function(e, a) {
                t.context.msg.on(e, a)
            }), t.checkTime = function(e, a, i) {
                var s;
                return a *= 1e3, s = e.anchor.interval && "" != e.anchor.interval ? e.anchor.begin <= a + i && 1e3 * t.context.dataset.duration - e.anchor.end > a : e.anchor.begin <= a + i && parseInt(e.anchor.begin) + parseInt(e.duration) > a;
            }, t.preload = function(e) {
                "pc" === t.context.gpApi.pf_ex ? (t.requestMP4(e.material[e.mp4_index].url, e.cid), t.context.msg.broadcast("reportDp3B", {
                    bid: "10091000",
                    step: "3",
                    type: "mp4"
                })) : (t.requestPNG(e.material[e.png_index].url, e.cid), t.context.msg.broadcast("reportDp3B", {
                    bid: "10091000",
                    step: "3",
                    type: "png"
                })), t.context.dataset.yaliuFodderStart[e.cid] = (new Date).getTime()
            }
        }
    }, Txplayer.register("YaliuPlayer", i)
}, function(t, e) {
    function a(t) {
        i = Txplayer.$, this.msg = new Txplayer.Events, this.dataset = {}, this.context = t, this.api = {
            url: "//ra.gtimg.com/web/viewability/viewability.js",
            reportData: null,
            startMonitor: null
        }, this.init()
    }
    var i = Txplayer.$,
        s = Txplayer.util;
    Txplayer.apiList;
    a.prototype = {
        init: function() {
            this.addEventListener()
        },
        initApi: function(t) {
            var e = this;
            return i.getScript(e.api.url, function() {
                crystal && crystal.startviewability && (e.api.startMonitor = crystal.startviewability), t && t()
            }, function() {})
        },
        getReportData: function(t) {
            var e = [];
            if (!(t && t.reportUrlView && t.reportUrlView.reportitem && t.reportUrlView.reportitem.length > 0)) return this.api.reportData = null;
            for (var e = [], a = 0; a < t.reportUrlView.reportitem.length; a++) {
                var i;
                t.reportUrlView.reportitem[a] && t.reportUrlView.reportitem[a].url && (i = t.reportUrlView.reportitem[a].url), e.push(i)
            }
            return this.api.reportData = {
                objectID: this.context.$mod.$playermod.selector,
                reportItemUrl: e,
                oid: t.order_id,
                duration: t.duration,
                retry: 0
            }
        },
        addEventListener: function() {
            var t = this;
            this.dataset.eventsList = {};
            var e = this.dataset.eventsList;
            e[s.getUniqueMsgKey("startViewMonitor")] = function(e) {
                t.getReportData(e), t.api.reportData && (t.api.startMonitor ? t.api.startMonitor(t.api.reportData) : t.initApi(function() {
                    t.api.startMonitor(t.api.reportData)
                }))
            }, Txplayer.$.each(this.dataset.eventsList, function(e, a) {
                t.context.msg.on(e, a)
            })
        }
    }, Txplayer.register("ViewMonitor", a)
}, function(t, e) {
    function a(t) {
        i = Txplayer.$, this.msg = new Txplayer.Events, this.dataset = {}, this.context = t, this.init()
    }
    var i = Txplayer.$,
        s = (Txplayer.apiList, Txplayer.util);
    a.prototype = {
        init: function() {
            this.addEventListener(), this.dp3Report(1)
        },
        setReportTimeData: function() {
            if (this.dataset.adData || "object" === Txplayer.$.type(this.dataset.adData)) {
                var t = [],
                    e = this;
                this.dataset.reportData = {}, this.dataset.adData.hasOwnProperty("ReportTime") && this.dataset.adData.reportUrl && (this.dataset.reportData[this.dataset.adData.ReportTime] = [this.dataset.adData.reportUrl]), this.dataset.adData.reportUrlOther && this.dataset.adData.reportUrlOther.reportitem && (t = "object" === Txplayer.$.type(this.dataset.adData.reportUrlOther.reportitem) ? [this.dataset.adData.reportUrlOther.reportitem] : this.dataset.adData.reportUrlOther.reportitem), t.length && Txplayer.$(t).each(function(t, a) {
                    a.hasOwnProperty("reporttime") && a.url && (e.dataset.reportData[a.reporttime] || (e.dataset.reportData[a.reporttime] = []), e.dataset.reportData[a.reporttime].push(a.url))
                })
            }
        },
        getAdItemParma: function(t, e, a) {
            var i = this;
            return a && a.adJson && (i.dataset.adJson = a.adJson), i.dataset.adJson && i.dataset.adJson[t] && i.dataset.adJson[t].hasOwnProperty(e) ? i.dataset.adJson[t][e] : ""
        },
        dp3Report: function(t, e) {
            if (t) {
                e || (e = {});
                var a = this;
                a.context.dataset && a.context.dataset.adReportData && a.context.dataset.adReportData.adType && (this.dataset.adType = a.context.dataset.adReportData.adType);
                var i, d = s.cookie.get("luin") || s.cookie.get("uin") || "",
                    n = {},
                    o = {
                        requestid: this.context.dataset.guid,
                        pf: "H5",
                        chid: s.getAdChannelId(),
                        adtype: e.adType || this.dataset.adType || "",
                        timestamp: +new Date,
                        mvid: e.vid || this.context.dataset.vid || "",
                        videoDuration: this.context.dataset.duration || 0,
                        coverid: "",
                        qq: d
                    },
                    r = "//dp3.qq.com/qqvideo/?",
                    l = {};
                if (2 === t || 5 === t) {
                    var p = [],
                        c = [],
                        u = [];
                    if (items = a.getAdItemParma("adList", "item", e), items) {
                        var h = "object" === Txplayer.$.type(items) ? [items] : items;
                        Txplayer.$(h).each(function(t, e) {
                            e.order_id && e.duration && (e.duration && u.push(e.duration), e.image && e.image.vid ? c.push(e.image.vid) : "array" === Txplayer.$.type(e.image) && e.image.length && e.image[0].vid && c.push(e.image[0].vid), p.push(e.order_id))
                        })
                    }
                    l.oid = p.join(","), l.vid = c.join(","), l.videopt = u.join(",")
                }
                1 === t ? i = {} : 2 === t ? i = {
                    vid2aid: a.getAdItemParma("adLoc", "vid2aid", e),
                    aid2oid: a.context.dataset.adReportData.aid2oid || "",
                    oid2url: a.getAdItemParma("adGetv", "oid2url", e),
                    merged: 1,
                    adaptor: 1,
                    errorcode: a.context.dataset.adReportData.errorcode || "",
                    adid: a.getAdItemParma("adLoc", "aid", e),
                    oid: l.oid,
                    vid: l.vid
                } : 3 === t ? i = {
                    videofbt: a.context.dataset.adReportData.videofbt || "",
                    errorcode: a.context.dataset.adReportData.errorcode || ""
                } : 4 === t ? i = {
                    isskip: a.context.dataset.adReportData.isskip || "",
                    errorcode: a.context.dataset.adReportData.errorcode || "",
                    skiptime: a.context.dataset.adReportData.skiptime || "",
                    adDidShowTime: a.context.dataset.videoCurrentTime
                } : 5 === t && (i = {
                    errorcode: "",
                    adtt: this.context.dataset.adDuration,
                    videopt: l.videopt,
                    videott: e.adRealPlayedTime
                }), i && (n = Txplayer.$.extend(o, i), n.step = t, r += Txplayer.$.param(n), s.report(r), a.context.dataset.adReportData = {})
            }
        },
        dp3BReport: function(t) {
            var e = this;
            e.context.dataset && e.context.dataset.adReportData && e.context.dataset.adReportData.adType && (this.dataset.adType = e.context.dataset.adReportData.adType);
            var a = "//dp3.qq.com/stdlog?",
                i = {
                    bid: t.bid,
                    vid: this.context.dataset.vid,
                    coverid: this.context.dataset.cid,
                    guid: this.context.dataset.guid,
                    qq: s.cookie.get("luin") || s.cookie.get("uin") || "",
                    adtype: this.dataset.adType || "",
                    oid: t.oid || "",
                    adid: this.dataset.adJson ? this.dataset.adJson.adLoc.aid : "",
                    index: t.creativeid || "",
                    step: t.step || "",
                    errorcode: t.errorcode || "",
                    cost: t.cost || "",
                    reqid: this.context.dataset.reqid,
                    pf: "H5",
                    type: t.type || "",
                    timestamp: (new Date).getTime()
                };
            a += Txplayer.$.param(i), s.report(a)
        },
        resetDataset: function() {
            delete this.dataset.adFirstPlayTime, delete this.dataset.adFirstPlayingTime, delete this.dataset.adRealPlayedTime
        },
        getCurrentAdInfo: function() {
            if (!this.context.dataset.isPlayingAd) return {};
            var t, e = (this.context.dataset.playListType, this.context.dataset.currentPlayListIndex);
            return this.context.dataset.adList && this.context.dataset.adList[e] && (t = this.context.dataset.adList[e]), t ? t : {}
        },
        addEventListener: function() {
            var t = this;
            this.dataset.eventsList = {}, this.dataset.eventsList[s.getUniqueMsgKey("videoTimeUpdate")] = function(e) {
                if (e && "loadingad" === e.playListType && e.videoTag) {
                    "array" === Txplayer.$.type(t.dataset.adRealPlayedTime) && (t.dataset.adRealPlayedTime[t.dataset.adRealPlayedTime.length - 1] = t.dataset.adRealPlayedTime[t.dataset.adRealPlayedTime.length - 1] + 1);
                    var a = parseInt(e.videoTag.currentTime);
                    t.dataset.reportData && t.dataset.reportData[a] && Txplayer.$(t.dataset.reportData[a]).each(function(t, e) {
                        s.report(e)
                    })
                }
            }, this.dataset.eventsList[s.getUniqueMsgKey("videoPlay")] = function(e) {
                e && ("loadingad" !== e.playListType && "insertad" !== e.playListType && "endingad" !== e.playListType || (t.dataset.adRealPlayedTime || (t.dataset.adRealPlayedTime = []), t.dataset.adRealPlayedTime.hasOwnProperty(e.videoTag.src) || (t.dataset.adRealPlayedTime[e.videoTag.src] = null, t.dataset.adRealPlayedTime.push(-1)), t.dataset.adFirstPlayTime = +new Date, t.context.dataset.adReportData.videofbt = +new Date, t.dataset.adData = t.getCurrentAdInfo(), t.setReportTimeData()))
            }, this.dataset.eventsList[s.getUniqueMsgKey("videoPlaying")] = function(e) {
                e && ("loadingad" !== e.playListType && "insertad" !== e.playListType && "endingad" !== e.playListType || (t.context.dataset.adReportData.videofbt && t.context.dataset.adReportData.videofbt > 0 && (t.context.dataset.adReportData.videofbt = +new Date - t.context.dataset.adReportData.videofbt), t.dp3Report(3, {
                    adType: t.context.gpApi.adtypeMap[t.context.gpApi.videoType2AdType[e.playListType]],
                    vid: t.context.gpApi.currentVid || ""
                })))
            }, this.dataset.eventsList[s.getUniqueMsgKey("openAdLink")] = function(t) {
                if (t && t.clickReportUrlOther && t.clickReportUrlOther.reportitem) return void s.report(t.clickReportUrlOther.reportitem.url)
            }, this.dataset.eventsList[s.getUniqueMsgKey("reportAd")] = function(e) {
                var a = [];
                Txplayer.$.isArray(e) && (e = e[0]), e && "object" == typeof e && (e.reportUrl && s.report(e.reportUrl), e.report_url && s.report(e.report_url), e.reportUrlOther && e.reportUrlOther.reportitem && ("object" === Txplayer.$.type(e.reportUrlOther.reportitem) ? a.push(e.reportUrlOther.reportitem) : a = e.reportUrlOther.reportitem), Txplayer.$(a).each(function(t, e) {
                    e && e.url && s.report(e.url)
                }), t.resetDataset(), t.dataset.adType = e ? e.type : "", t.dataset.adJson = t.context.dataset.adJson, t.dp3Report(3))
            }, this.dataset.eventsList[s.getUniqueMsgKey("videoEnd")] = function(e) {
                !e.playListTypeEnd || "loadingad" !== e.playListType && "insertad" !== e.playListType && "endingad" !== e.playListType || t.dp3Report(5, {
                    adType: t.context.gpApi.adtypeMap[t.context.gpApi.videoType2AdType[e.playListType]],
                    vid: t.context.gpApi.currentVid || "",
                    adRealPlayedTime: "array" === Txplayer.$.type(t.dataset.adRealPlayedTime) ? t.dataset.adRealPlayedTime.join(",") : ""
                })
            }, this.dataset.eventsList[s.getUniqueMsgKey("lviewRequestOver")] = function(e) {
                t.resetDataset(), setTimeout(function() {
                    t.dp3Report(2, e)
                }, 100)
            }, this.dataset.eventsList[s.getUniqueMsgKey("lviewRequestError")] = function(e) {
                t.resetDataset(), setTimeout(function() {
                    t.dp3Report(2, e)
                }, 100)
            }, this.dataset.eventsList[s.getUniqueMsgKey("reportAdError")] = function(e) {
                t.resetDataset(), t.dp3Report(3, {
                    adType: t.context.gpApi.adtypeMap[t.context.gpApi.videoType2AdType[e.playListType]],
                    vid: t.context.gpApi.currentVid || ""
                })
            }, this.dataset.eventsList[s.getUniqueMsgKey("adSkip")] = function(e) {
                t.dp3Report(4, {
                    vid: t.context.gpApi.currentVid || ""
                })
            }, this.dataset.eventsList[s.getUniqueMsgKey("reportDp3B")] = function(e) {
                t.dp3BReport(e)
            }, Txplayer.$.each(this.dataset.eventsList, function(e, a) {
                t.context.msg.on(e, a)
            })
        }
    }, Txplayer.register("HdPlayerAdReport", a)
}]);
/* 2017-08-25 19:56:40 */
