var imgBaseSmalUrl = "http://imgnode.gtimg.cn/hq_img?type=minute&size=11&proj=financedachuw",
imgBaseBigUrl = "http://imgnode.gtimg.cn/hq_img?type=minute&size=12&proj=financedachuw",
limitWidth = 1280;

var listImg = jQuery(".dataCss").find("img");
var isSmallMode = jQuery(window).width() > limitWidth ? true: false;
window.cronJobs = (function() {
    var a = null;
    return {
        getCronInstance: function() {
            if (!a) {
                a = new __.FnCronLoader()
            }
            return a
        }
    }
})(); (function() {
    var a = "__.qsUtility",
    b = {
        formatNum: function(h, g) {
            h = String(h).split(".");
            var d = [];
            for (var e = 0,
            c = h[0].length; e < c; e++) {
                var f = h[0].charAt(c - e - 1);
                e % 3 == 0 && f >= 0 && f <= 9 && d.length && d.push(",");
                d.push(f)
            }
            h[0] = d.reverse().join("");
            if (h[1]) {
                d = [];
                for (var e = 0,
                c = h[1].length; e < c; e++) {
                    var f = h[1].charAt(e);
                    e % 3 == 0 && f >= 0 && f <= 9 && d.length && d.push(",");
                    d.push(f)
                }
                h[1] = d.join("")
            }
            return h.join(".")
        },
        trimString: function(k, f, g) {
            g = g && true;
            var m = 0,
            d = /^[\u4e00-\u9fa5]+$/,
            h = [],
            l = 0,
            e,
            j;
            for (e = 0; e < k.length; e++) {
                j = k.charAt(e);
                if (d.test(j)) {
                    m += 2
                } else {
                    m += 1
                }
                if (m <= f) {
                    h.push(j)
                }
            }
            if (h.length === f) {
                return h.join("") + (g ? "...": "")
            } else {
                return h.join("")
            }
        },
        addNoBorderClass: function(e, d, c) {
            if (c + 1 === d) {
                __.dom.addClass(e, "noborder")
            }
        },
        getColor: function(e, c, d) {
            d = d === false ? false: true;
            return c > 0 ? '<span class="fc3">' + e + "</span>": (c < 0 ? '<span class="fc4">' + e + "</span>": (d ? '<span style="color:#000">' + e + "</span>": e))
        },
        getColorPercent: function(d, c) {
            if (__.lang.isNumber(Number(d)) && d !== "" && d !== "-") {
                var e = d > 0 ? "+": "";
                return __.qsUtility.getColor(e + d + "%", d, c)
            } else {
                return "--"
            }
        },
        isIndexCode: function(c) {
            if (c.substr(0, 4) === "sh00" || c.substr(0, 4) === "sz39") {
                return true
            } else {
                return false
            }
        },
        convert_code: function(f) {
            var d = null;
            var c = null;
            try {
                var d = f.split("_")[0];
                var c = f.split("_")[1];
                if (d.indexOf(".") != -1) {
                    d = d.split(".")[0]
                }
            } catch(g) {}
            if (d !== null) {
                d = this.get_code_mkt(d, c)
            }
            return d
        },
        getMarket: function(c) {
            var d = {
                "00": "sz",
                "30": "sz",
                "60": "sh",
                "20": "sz",
                "90": "sh"
            };
            if (c) {
                return d[c.substr(0, 2)]
            }
        },
        get_code_mkt: function(d, c) {
            if ( !! d) {
                switch (c) {
                case "1":
                    d = "sh" + d;
                    break;
                case "51":
                    d = "sz" + d;
                    break;
                case "100":
                    d = "hk" + d;
                    break;
                case "200":
                    d = "us" + d;
                    break;
                case "350":
                    d = "qh" + d;
                    break;
                default:
                    d = "jj" + d;
                    break
                }
            }
            return d
        },
        getStockName: function(d, c) {
            return c[1]
        },
        getQtKeys: function(d) {
            var c = [];
            __.each(d,
            function(e) {
                if (e.indexOf("hk") === 0) {
                    c.push("s_r_" + e)
                } else {
                    if (e.indexOf("jj") !== -1) {} else {
                        c.push(e)
                    }
                }
            });
            return c
        },
        getQtValue: function(c) {
            if (c.indexOf("hk") === 0) {
                return window["v_s_r_" + c]
            } else {
                if (c.indexOf("jj") !== -1) {} else {
                    return window["v_" + c]
                }
            }
        },
        getChangeMount: function(d, e) {
            var c = d.substr(0, 2);
            switch (c) {
            case "us":
            case "sh":
            case "sz":
            case "r_":
                return e[31];
                break;
            case "gz":
                return e[4];
                break;
            case "s_":
                return e[4];
                break;
            case "fq":
                return e[6];
                break;
            case "wh":
                return e[3] - e[6];
                break;
            case "hf":
                return e[0] - e[7];
                break
            }
        },
        getNewCost: function(d, e) {
            var c = d.substr(0, 2);
            switch (c) {
            case "fq":
                return e[5];
                break;
            case "hf":
                return e[0];
                break;
            default:
                return e[3];
                break
            }
        },
        getChangeRank: function(d, e) {
            var c = d.substr(0, 2);
            switch (c) {
            case "us":
            case "r_":
            case "sh":
            case "sz":
                return e[32];
                break;
            case "gz":
                return e[5];
                break;
            case "s_":
                return e[5];
                break;
            case "fq":
                return ((e[6]) / (e[5] - e[6])) * 100;
                break;
            case "wh":
                return ((e[3] - e[6]) / e[6]) * 100;
                break;
            case "hf":
                return e[1];
                break
            }
        },
        bindThatToFn: function(c, d) {
            return function() {
                return c.apply(d, arguments)
            }
        },
        findTriggler: function(c, e, d) {
            e = e || "xxxxxxxxx";
            d = d || 4;
            do {
                if (__.dom.hasClass(c, e) || (c.nodeType == 1 && c.nodeName == "LI")) {
                    return c
                } else {
                    c = c.parentNode
                }
            } while ( d --&& c );
            return null
        },
        changeStates: function(j, k, l) {
            l = l || {};
            l.navType = l.navType || "tag",
            l.nav = l.nav || "li";
            l.containnerId = l.containnerId || "data4";
            l.activeClass = l.activeClass || "on";
            l.difClass = l.difClass || "dif";
            if (l.navType === "class") {
                var f = __.dom.$("." + l.nav, l.containnerId)
            } else {
                if (l.navType === "tag") {
                    var f = __.dom.f(l.containnerId).getElementsByTagName("li")
                }
            }
            var c = __.dom.f("." + j) || __.dom.f(j);
            var d = null;
            for (var e = 0,
            g = f.length; e < g; e++) {
                d = f[e];
                if (f[e] !== c) {
                    __.dom.remClass(f[e], l.activeClass)
                } else {
                    __.dom.addClass(f[e], l.activeClass)
                }
            }
            if (d === c) {
                __.dom.remClass(d, l.difClass)
            } else {
                __.dom.addClass(d, l.difClass)
            }
            for (e in k) {
                if (k.hasOwnProperty(e)) {
                    var h = __.dom.f(k[e]);
                    if (e === j) {
                        if (h.nodeType == 1 && h.nodeName == "IMG") {
                            h.style.display = "inline"
                        } else {
                            h.style.display = "block"
                        }
                    } else {
                        h.style.display = "none"
                    }
                }
            }
        }
    };
    __.set(a, b)
})();
function MemoBase(c, a, b) {
    this.interfaceUrl = c || "http://web.ifzq.gtimg.cn/stock/doctor/qs/gg?_var=gpysValue&codes=";
    this.returnName = a || "gpysValue";
    this.refreshTimeSpan = b || 1000 * 60 * 60;
    this.keysValue = {};
    this.refresh()
}
MemoBase.prototype.refresh = function() {
    var a = this;
    setInterval(function() {
        var b = __.lang.keys(a.keysValue);
        a.keysValue = {};
        a.getValues(b, null)
    },
    this.refreshTimeSpan)
};
MemoBase.prototype.parseReturnData = function(d, e) {
    var a = window[this.returnName];
    if (a.code === 0) {
        var b = a.data;
        for (var c in b) {
            if (b.hasOwnProperty(c)) {
                e && e(c, b[c]);
                this.keysValue[c] = b[c]
            }
        }
    }
};
MemoBase.prototype.getValues = function(f, h, g) {
    g = g || "";
    var e = [],
    d = this,
    c = [];
    for (var b = 0,
    a = f.length; b < a; b++) {
        if (this.keysValue[f[b]]) {
            h && h(f[b], this.keysValue[f[b]])
        } else {
            c.push(g + f[b]);
            e.push(f[b])
        }
    }
    if (e.length > 0) {
        __.load(d.interfaceUrl + c.join(","),
        function(i) {
            d.parseReturnData(e, h)
        })
    }
}; (function() {
    __.fnTable.processors.GET_COLOR = __.qsUtility.getColor;
    __.fnTable.processors.GET_PERCENT = __.qsUtility.getColorPercent
})();
Function.prototype.bind = function(a) {
    var b = this;
    return function() {
        return b.apply(a, arguments)
    }
}; (function() {
    var a = "__.Tabs";
    var b = function(c) {
        this.cfg = {
            triggerType: "mouseover",
            elementId: "#ybxg_c1",
            indentifyClassToContainnerMap: {
                mbzfzd: "tab2_content1",
                pjzg: "tab2_content2",
                jgscgz: "tab2_content3",
                gzdzggg: "tab2_content4",
                gzdzghy: "tab2_content5"
            },
            tabConDataActionMap: {
                mbzfzd: null,
                pjzg: null,
                jgscgz: null,
                gzdzggg: null,
                gzdzghy: null
            }
        };
        __.extend(this.cfg, c);
        var d = __.dom.f(this.cfg.elementId);
        var e = this;
        function f(j, i) {
            i = i || 200;
            var h;
            function k(l) {
                if (e.cfg.triggerType === "mouseover") {
                    k.stop();
                    h = setTimeout(function() {
                        j(l)
                    },
                    i)
                } else {
                    j(l)
                }
            }
            k.stop = function() {
                if (h) {
                    clearTimeout(h);
                    h = 0
                }
            };
            return k
        }
        var g = function(p) {
            var m = p.target;
            var l = __.qsUtility.findTriggler(m);
            if (l) {
                var r = l.className;
                var q = r;
                var j = ["on", "dif"];
                for (var k = 0,
                o = j.length; k < o; k++) {
                    var h = new RegExp(j[k], "ig");
                    q = q.replace(h, "")
                }
                q = q.replace(/\s*/ig, "");
                __.qsUtility.changeStates(q, e.cfg.indentifyClassToContainnerMap, {
                    containnerId: e.cfg.elementId,
                    navType: "tag",
                    nav: "li"
                });
                e.cfg.tabConDataActionMap[q]()
            }
        };
        __.event.on(d, this.cfg.triggerType, f(g))
    };
    __.set(a, b)
})(); (function() {
    function a(f) {
        var e = b(f);
        e.init()
    }
    var b = (function() {
        var e = americaObj = europeObj = futuresObj = forexObj = null;
        var f = isSmallMode ? imgBaseSmalUrl: imgBaseBigUrl;
        return function(g) {
            switch (g) {
            case "asian":
                if (!e) {
                    e = new c({
                        containnerId: "fin_Tab0",
                        codes: ["s_sh000001", "s_sz399001", "s_r_hkHSI", "s_sh000847"],
                        hasImageCodes: ["s_sh000001", "s_sz399001", "s_r_hkHSI", "s_sh000847"],
                        codesImageMap: {
                            s_sh000001: f + "&code=sh000001&r=",
                            s_sz399001: f + "&code=sz399001&r=",
                            s_r_hkHSI: f + "&code=hkHSI&r=",
                            s_sh000847: f + "&code=sh000847&r="
                        },
                        indentifyIdToContainnerMap: {
                            chinazs_s_sh000001: "chinaImage_s_sh000001",
                            chinazs_s_sz399001: "chinaImage_s_sz399001",
                            chinazs_s_r_hkHSI: "chinaImage_s_r_hkHSI",
                            chinazs_s_sh000847: "chinaImage_s_sh000847"
                        }
                    })
                }
                return e;
                break;
            case "america":
                if (!americaObj) {
                    americaObj = new c({
                        containnerId: "fin_Tab1",
                        codes: ["usDJI", "usIXIC", "usINX", "gzGSPTSE"],
                        hasImageCodes: ["usDJI", "usIXIC"],
                        codesImageMap: {
                            usDJI: f + "&code=us.DJI&r=",
                            usIXIC: f + "&code=us.IXIC&r=",
                            usINX: f + "&code=us.INX&r="
                        },
                        indentifyIdToContainnerMap: {
                            chinazs_usDJI: "chinaImage_usDJI",
                            chinazs_usIXIC: "chinaImage_usIXIC"
                        }
                    })
                }
                return americaObj;
                break;
            case "europe":
                if (!europeObj) {
                    europeObj = new c({
                        containnerId: "fin_Tab2",
                        codes: ["gzFTSE", "gzGDAXI", "gzFCHI", "gzSSMI", "gzMIBTEL", "gzSMSI", "gzISEQ", "gzAEX", "gzIBEX"],
                        hasImageCodes: []
                    })
                }
                return europeObj;
                break;
            case "futures":
                if (!futuresObj) {
                    futuresObj = new c({
                        containnerId: "fin_Tab3",
                        codes: ["hf_CL", "hf_GC", "hf_HG", "hf_TRB", "hf_C", "hf_W", "hf_XAG", "hf_DJS", "hf_NAS"],
                        hasImageCodes: []
                    })
                }
                return futuresObj;
                break;
            case "forex":
                if (!forexObj) {
                    forexObj = new c({
                        containnerId: "fin_Tab4",
                        codes: ["whEURUSD", "whGBPUSD", "whUSDJPY", "whAUDUSD", "whUSDCHF", "whUSDCAD", "whUSDHKD", "whUSDCNY", "whSGDUSD"],
                        hasImageCodes: [],
                        precision: 4
                    })
                }
                return forexObj;
                break
            }
        }
    })();
    function c(e) {
        this.codes = e && e.codes;
        this.codesImageMap = e && e.codesImageMap;
        this.indentifyIdToContainnerMap = e && e.indentifyIdToContainnerMap;
        this.containnerId = e && e.containnerId;
        this.hasImageCodes = e && e.hasImageCodes || [];
        this.precision = e && e.precision || 2;
        this.jobId = null;
        this.inited = false;
        if (this.hasImageCodes.length > 0) {
            this.addEventHandle()
        }
    }
    c.prototype.addEventHandle = function() {
        var e = __.dom.f(this.containnerId);
        var f = this;
        __.event.on(e, "mouseover",
        function(j) {
            var g = j.target;
            var i = __.qsUtility.findTriggler(g);
            if (i) {
                var h = i.id;
                if (f.indentifyIdToContainnerMap[h]) {
                    __.qsUtility.changeStates(h, f.indentifyIdToContainnerMap, {
                        containnerId: f.containnerId
                    })
                }
            }
        })
    };
    c.prototype.fillQtField = function() {
        var j = this;
        function p() {
            for (var u = 0,
            t = j.codes.length; u < t; u++) {
                if (__.lang.inArray(j.codes[u], j.hasImageCodes)) {
                    var v = __.dom.f("chinaImage_" + j.codes[u]);
                    v.src = j.codesImageMap[j.codes[u]] + Math.random()
                }
            }
        }
        for (var h = 0,
        l = this.codes.length; h < l; h++) {
            var f = __.dom.f("chinazs_" + this.codes[h]);
            var r = window["v_" + this.codes[h]];
            if (r && f) {
                var m = f.getElementsByTagName("span");
                if ( !! m && m.length == 4) {
                    var k = r.split("~"),
                    s = "fc3";
                    if (k.length === 1) {
                        k = r.split(",")
                    }
                    var q = this.getFirstFieldValue(this.codes[h], k);
                    var e = this.getSecondFieldValue(this.codes[h], k);
                    var g = this.getThirdFieldValue(this.codes[h], k);
                    var o = g >= 0 ? "+": "";
                    if (e < 0) {
                        s = "fc4"
                    }
                    __.dom.addClass(f, s);
                    m[1].innerHTML = isNaN(q) ? "--": (Number(q).toFixed(this.precision));
                    m[2].innerHTML = isNaN(e) ? "--": o + (Number(e).toFixed(this.precision));
                    m[3].innerHTML = isNaN(g) ? "--": o + (Number(g).toFixed(this.precision)) + "%"
                }
            }
        }
        p()
    };
    c.prototype.init = function() {
        var e = this;
        if (!e.inited) {
            e.inited = true;
            this.jobId = window.cronJobs.getCronInstance().addJob({
                type: 2,
                interval: 10,
                keys: e.codes,
                onData: e.fillQtField.bind(e),
                noWait: true
            })
        }
    };
    c.prototype.cancleJob = function() {
        if (this.jobId) {
            window.cronJobs.getCronInstance().remJob(this.jobId);
            this.jobId = 0
        }
    };
    c.prototype.getFirstFieldValue = function(f, e) {
        return __.qsUtility.getNewCost(f, e)
    };
    c.prototype.getSecondFieldValue = function(f, e) {
        return __.qsUtility.getChangeMount(f, e)
    };
    c.prototype.getThirdFieldValue = function(f, e) {
        return __.qsUtility.getChangeRank(f, e)
    };
    var d = new __.Tabs({
        triggerType: "mouseover",
        elementId: "#fin_Tab",
        indentifyClassToContainnerMap: {
            asianNav: "fin_Tab0",
            americaNav: "fin_Tab1",
            europeNav: "fin_Tab2",
            futuresNav: "fin_Tab3",
            forexNav: "fin_Tab4"
        },
        tabConDataActionMap: {
            asianNav: function() {
                a("asian")
            },
            americaNav: function() {
                a("america")
            },
            europeNav: function() {
                a("europe")
            },
            futuresNav: function() {
                a("futures")
            },
            forexNav: function() {
                a("forex")
            }
        }
    });
    a("asian")
})(); 
/*  |xGv00|0ffb4383d7983a432a4c975e9f59fcc4 */