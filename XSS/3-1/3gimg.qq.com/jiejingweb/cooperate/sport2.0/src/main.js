/**
 * Created by qiangliu on 2015/4/23.
 */
(function () {
     var ShareImgUrl = 'http://layer.map.qq.com/qrencode?chl=';
    var MOBILEURL = 'http://jiejing.qq.com/#';
    function getMobileLink(){
        var url = [
            MOBILEURL,
                'pano='+pano.getPano()
        ];
        return url.join('');
    }

     function createNode (tagName, obj, parent) {
        var node = document.createElement(tagName || "div");
        if (obj) {
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    switch (attr) {
                        case "cls":
                        case "className":
                            node.className = obj.cls || obj.className;
                            break;
                        case "style":
                            node.style.cssText = obj[attr];
                            break;
                        case "innerHTML":
                        case "html":
                            node.innerHTML = obj.html || obj.innerHTML || '';
                            break;
                        default:
                            if (node.setAttribute) {
                                node.setAttribute(attr, obj[attr]);
                            } else {
                                node[attr] = obj[attr];
                            }
                    }
                }
            }
        }
        if (parent) {
            parent.appendChild(node);
        }
        return node;
    }

    function getShareUrl () {
        var svid = pano.getPano();
        var pov = pano.getPov();
        return "http://map.qq.com/#pano="+svid+"&heading="+pov.heading+"&pitch="+pov.pitch;
    }

    window.shareTo = function(evt){
        evt = evt ? evt : (window.event ? window.event : null);
        if(evt){
            var target = evt.srcElement || evt.target;
            var options = {
                url: getShareUrl(),
                imageUrl: 'http://sv0.map.qq.com/view?svid='+pano.getPano()+'&r=50&from=web&size=0&no_decrypt_svid=1'
            };
            shareWith(target.getAttribute('id'),options);
        }

    }

    var shareWith = (function(){

        var rc = {};
        /**
         * 分享链接相关
         */
        rc.ShareLink = {
            Title: '分享街景',
            Blog: '#腾讯街景地图#我正宅在家里逛街景呢，每一个想去的地方都变得很真实！我在逛这里，你想去哪呢？'
        };

        var _share_tencent_weibo = function (data) {
            var url = data.url;
            var imageUrl = data.imageUrl;
            String.prototype.elength = function () {
                return this.replace(/[^\u0000-\u00ff]/g, "aa").length;
            };
            String.prototype.tripurl = function () {
                return this.replace(new RegExp("((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*", "gi"), new Array(12).join("aa"));
            };
            if (!!window.find) {
                HTMLElement.prototype.contains = function (B) {
                    return this.compareDocumentPosition(B) - 19 > 0;
                };
            };
            var _appkey = "800047175";
            var _web = {
                "name": data.desc || rc.ShareLink.Blog,
                "href": url,
                "hash": location.hash,
                "target":
                    "toolbar=0,status=0,resizable=1,width=630,height=530"
            };
            var _pic = imageUrl;
            var _text = function () {
                var s1 = (arguments[0] || "").tripurl(),
                    s2 = Array().slice.call(arguments, 1).join(" ").
                        replace(/[\s\n]+/g, " "),
                    k = 257 - s1.elength();
                var s = s2.slice(0, (k - 4) >> 1);
                if (s2.elength() > k) {
                    k = k - 3;
                    for (var i = k >> 1; i <= k; i++) {
                        if ((s2.slice(0, i)).tripurl().elength() >= k) {
                            break;
                        }
                        else {
                            s = s2.slice(0, i);
                        }
                    }
                    s += "...";
                } else {
                    s = s2;
                }
                return [s1, s];
            };
            var _u = "http://share.v.t.qq.com/index.php?c=share&" +
                "a=index&url=$url$&appkey=" + _appkey +
                "&assname=&title=$title$&pic=$pic$";

            var share_area = function (_arr) {
                if (_arr[1]) {
                    if ((typeof _arr[1] == "object" && _arr[1].length) ||
                        (_arr[1].constructor == Array)) {
                        return _arr[1];
                    } else {
                        return [_arr[1]];
                    }
                }
                else {
                    return [document.body];
                }
            } (arguments);
            var current_area = share_area[0];
            window.open(_u.replace("$title$", encodeURIComponent(_text(_web.name, "").join(" "))).replace("$url$", encodeURIComponent(_web.href)).replace("$pic$", encodeURIComponent(_pic)).substr(0, 2048), new Date().getTime(), _web.target);
            var _select = function () {
                return (document.selection ? document.selection.createRange().text : document.getSelection()).toString().replace(/[\s\n]+/g, " ");
            };
        };

        function _share_tencent_qzone(data) {
            var url = data.url;
            var imageUrl = data.imageUrl;
            var p = {
                url: url,
                pics: imageUrl,
                showcount: '0',
                desc: data.desc || rc.ShareLink.Blog,
                summary: data.desc || '街景是腾讯地图最新推出的一项全景地图服务。通过街景，只要坐在电脑前就可以真实的看到街道上的高清景象。',
                title: data.shareType == 'poi' ? '腾讯地图分享' : '腾讯街景地图',
                site: 'http://map.qq.com',
                style: '101',
                width: 142,
                height: 30
            };
            var s = [];
            for (var i in p) {
                if (p.hasOwnProperty(i)) {
                    s.push(i + '=' + encodeURIComponent(p[i] || ''));
                }
            }
            window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&'), new Date().getTime(), "toolbar=0,status=0,resizable=1,width=630,height=600");
        }

        function _share_tencent_friends(data) {
            var url = data.url;
            var imageUrl = data.imageUrl;
            var p = {
                url: url,
                pics: imageUrl,
                to: 'pengyou',
                desc: data.desc ||rc.ShareLink.Blog,
                summary: data.desc || '街景是腾讯地图最新推出的一项全景地图服务。通过街景，只要坐在电脑前就可以真实的看到街道上的高清景象。',
                title: data.shareType == 'poi' ? '腾讯地图分享' : '腾讯街景地图',
                site: 'http://map.qq.com'
            };
            var s = [];
            for (var i in p) {
                if (p.hasOwnProperty(i)) {
                    s.push(i + '=' + encodeURIComponent(p[i] || ''));
                }
            }
            window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&'), new Date().getTime(), "toolbar=0,status=0,resizable=1,width=630,height=600");
        }

        function _share_sina_weibo(data){
            var url = data.url;
            var imageUrl = data.imageUrl;
            var p = {
                pic: imageUrl,
                title: data.desc || rc.ShareLink.Blog,
                ralateUid: '2381461594', //新浪微博 腾讯地图官方帐号
                url: url,
                appKey: '1681459862'
            };
            var s = [];
            for (var i in p) {
                if (p.hasOwnProperty(i)) {
                    s.push(i + '=' + encodeURIComponent(p[i] || ''));
                }
            }
            window.open('http://service.weibo.com/share/share.php?' + s.join('&'), new Date().getTime(), "toolbar=0,status=0,resizable=1,width=630,height=600");
        }

        function _share_renren(data){
            var url = data.url;
            var imageUrl = data.imageUrl;


            var p = {
                resourceUrl : url,   //分享的资源Url
                pic : imageUrl,       //分享的主题图片Url
                title : '腾讯地图',     //分享的标题
                description : data.desc || rc.ShareLink.Blog    //分享的详细描述
            };
            var s = [];
            for (var i in p) {
                if (p.hasOwnProperty(i)) {
                    s.push(i + '=' + encodeURIComponent(p[i] || ''));
                }
            }
            window.open('http://widget.renren.com/dialog/share?' + s.join('&'), new Date().getTime(), "toolbar=0,status=0,resizable=1,width=700,height=650,scrollbars=1");
        }

        function _share_kaixin(data){
            var url = data.url;
            var imageUrl = data.imageUrl;
            var p = {
                type: 'records',
                content: data.desc || rc.ShareLink.Blog,
                url: url,
                style: '11',
                pic: imageUrl
            };
            var s = [];
            for (var i in p) {
                if (p.hasOwnProperty(i)) {
                    s.push(i + '=' + encodeURIComponent(p[i] || ''));
                }
            }
            window.open('http://www.kaixin001.com/rest/records.php?' + s.join('&'), new Date().getTime(), "toolbar=0,status=0,resizable=1,width=700,height=650,scrollbars=1");
        }
        return  function(type,newData) {
            var _data = newData;
            switch(type) {
                case 'blog':
                    _share_tencent_weibo(_data);
                    break;
                case 'qzone':
                    _share_tencent_qzone(_data);
                    break;
                case 'friends':
                    _share_tencent_friends(_data);
                    break;
                case 'weibo':
                    _share_sina_weibo(_data);
                    break;
                case 'renren':
                    _share_renren(_data);
                    break;
                case 'kaixin':
                    _share_kaixin(_data);
                    break;
            }
        };
    })();

    function Sport() {
        this.buttons = ["place","hotel","region","share"];
        this.svid = "10013501120801172332600";  //首页svid
        this.region = "1001-3-501-120801";  // 区域id
        this.hotelData = [                      //旅馆数据
            {
                name: "北京盘古七星酒店",
                poiId: "4565841242480867432",
                star: 5,
                price: "2472",
                dis: "880m",
                pano: {
                    svid: "100130JH140417100219140",
                    heading: 260,
                    pitch: 8,
                    zoom: 1
                }
            },
            {
                name: "北京五洲皇冠国际酒店",
                star: 5,
                dis: "780m",
                price: "2052",
                poiId: "2994245811937592637",
                pano: {
                    svid: "100170J4131129094719770",
                    heading: 97,
                    pitch: 7,
                    zoom: 1
                }
            },
            {
                name: "名人国际大酒店",
                star: 5,
                price: "1530",
                poiId: "18191549603842028799",
                dis: "940m",
                pano: {
                    svid: "100130U8131217094043830",
                    heading: 360,
                    pitch: -2,
                    zoom: 1
                }
            },
            {
                name: "北京歌华开元大酒店",
                dis: "3.1km",
                price: "727",
                star: 5,
                poiId: "3845354179404809739",
                pano: {
                    svid: "100131JF140304105230100",
                    heading: 162,
                    pitch: 15,
                    zoom: 1
                }
            },
            {
                name: "北京北辰洲际酒店",
                price: "1404",
                star: 5,
                dis: "918m",
                poiId: "15971117148232442262",
                pano: {
                    svid: "100132JF140317152022500",
                    heading: 352,
                    pitch: 10,
                    zoom: 1
                }
            },
            {
                name: "北京金隅喜来登酒店",
                dis: "3km",
                price: "1102",
                star: 5,
                poiId: "11975079809601719411",
                pano: {
                    svid: "100138J3141021140642990",
                    heading: 261,
                    pitch: 11,
                    zoom: 1
                }
            },
            {
                name: "福建大厦",
                dis: "2.7km",
                price: "499",
                star: 4,
                poiId: "17592586786919312832",
                pano: {
                    svid: "100132JH140316103156000",
                    heading: 179,
                    pitch: 11,
                    zoom: 1
                }
            },
            {
                name: "国家会议中心大酒店",
                price: "1188",
                star: 5,
                dis: "1.3km",
                poiId: "8407584788931234946",
                pano: {
                    svid: "100132J4140319120353000",
                    heading: 223,
                    pitch: 14,
                    zoom: 1
                }
            },
            {
                name: "长白山国际酒店",
                dis: "1.5km",
                price: "811",
                star: 5,
                poiId: "13301749539898944187",
                pano: {
                    svid: "100130J4131223092952360",
                    heading: 165,
                    pitch: -7,
                    zoom: 1
                }
            },
            {
                name: "凯迪克格兰云天大酒店",
                price: "599",
                dis: "290m",
                star: 5,
                poiId: "1172061733328180700",
                pano: {
                    svid: "100130Y2131126104318000",
                    heading: 1,
                    pitch: 1,
                    zoom: 1
                }
            },
            {
                name: "北京中澳华美达大酒店",
                dis: "1.5km",
                price: "698",
                star: 3,
                poiId: "3608030907173454246",
                pano: {
                    svid: "100131JC140326132551150",
                    heading: 357,
                    pitch: 6,
                    zoom: 1
                }
            },
            {
                name: "北京亚奥国际酒店",
                dis: "2.4km",
                price: "487",
                star: 4,
                poiId: "4638213074063380691",
                pano: {
                    svid: "100171J1131117062032710",
                    heading: 170,
                    pitch: 24,
                    zoom: 1
                }
            },
            {
                name: "亚丁湾商务酒店",
                dis: "1.2km",
                price: "386",
                star: 3,
                poiId: "11261410496836945488",
                pano: {
                    svid: "100130Y6130426132949050",
                    heading: 20,
                    pitch: 12,
                    zoom: 1
                }
            },
            {
                name: "北京元辰鑫国际酒店",
                dis: "2.6km",
                price: "458",
                star: 4,
                poiId: "16734137205321095810",
                pano: {
                    svid: "100130Y1130428101248200",
                    heading: 88,
                    pitch: 10,
                    zoom: 1
                }
            },
            {
                name: "中澳马哥孛罗大酒店",
                dis: "1.7km",
                price: "884",
                star: 5,
                poiId: "5910905364155101521",
                pano: {
                    svid: "100132J9140326100002200",
                    heading: 48,
                    pitch: 3,
                    zoom: 1
                }
            },
            {
                name: "凯富国际酒店",
                dis: "1.6km",
                price: "790",
                star: 5,
                poiId: "15736410651022348837",
                pano: {
                    svid: "100130Y2131112135150270",
                    heading: 166,
                    pitch: 15,
                    zoom: 1
                }
            },
            {
                name: "北辰汇园酒店公寓贵宾楼",
                dis: "814m",
                price: "958",
                star: 4,
                poiId: "13307219342356461047",
                pano: {
                    svid: "10011039140422150807200",
                    heading: 314,
                    pitch: -29,
                    zoom: 1
                }
            },
            {
                name: "西藏大厦",
                dis: "1.6km",
                price: "516",
                star: 4,
                poiId: "11991245532414422323",
                pano: {
                    svid: "10011007130403114211700",
                    heading: 214,
                    pitch: 11,
                    zoom: 1
                }
            },
            {
                name: "安徽大厦",
                dis: "1.8km",
                price: "375",
                star: 3,
                poiId: "10148025346167816495",
                pano: {
                    svid: "10011007130403115307600",
                    heading: 227,
                    pitch: -35,
                    zoom: 1
                }
            },
            {
                name: "国玉大酒店",
                price: "450",
                star: 4,
                dis: "1.4km",
                poiId: "6110459025748674156",
                pano: {
                    svid: "10011039140422154451100",
                    heading: 350,
                    pitch: -14,
                    zoom: 1
                }
            },
            {
                name: "北辰五洲大酒店",
                price: "751",
                star: 4,
                dis: "743m",
                poiId: "17074153956877377374",
                pano: {
                    svid: "10011039140422142822000",
                    heading: 178,
                    pitch: -7,
                    zoom: 1
                }
            },
            {
                name: "国奥村花园酒店",
                dis: "2.3km",
                price: "633",
                star: 5,
                poiId: "13804108261968024797",
                pano: {
                    svid: "10011007131111152630000",
                    heading: 279,
                    pitch: 15,
                    zoom: 1
                }
            },
            {
                name: "国家奥林匹克体育中心-奥体公寓",
                dis: "1.1km",
                price: "486",
                star: 4,
                poiId: "10612541285554568342",
                pano: {
                    svid: "10011029131218122239100",
                    heading: 86,
                    pitch: -16,
                    zoom: 1
                }
            },
            {
                name: "北京外国专家大厦",
                dis: "1.4km",
                price: "318",
                star: 4,
                poiId: "3667494713286725424",
                pano: {
                    svid: "10011013150109101624600",
                    heading: 142,
                    pitch: -9,
                    zoom: 1
                }
            },
            {
                name: "北辰亚运村宾馆",
                dis: "840m",
                price: "648",
                star: 3,
                poiId: "12736354489054699072",
                pano: {
                    svid: "10011039140422151609600",
                    heading: 122,
                    pitch: -10,
                    zoom: 1
                }
            },
            {
                name: "奥友宾馆",
                dis: "460m",
                price: "233",
                star: 3,
                poiId: "6783419723452189614",
                pano: {
                    svid: "10011007131112124518100",
                    heading: 57,
                    pitch: -13,
                    zoom: 1
                }
            },
            {
                name: "鼎春德酒店",
                dis: "2.8km",
                price: "310",
                star: 4,
                poiId: "1969119955289426322",
                pano: {
                    svid: "10011001140827122440200",
                    heading: 64,
                    pitch: -7,
                    zoom: 1
                }
            },
            {
                name: "科通宏宇酒店",
                dis: "1.5km",
                price: "259",
                star: 3,
                poiId: "16053848118308605630",
                pano: {
                    svid: "10011026131002161347200",
                    heading: 84,
                    pitch: 0,
                    zoom: 1
                }
            },
            {
                name: "北京云冈酒店",
                dis: "1.4km",
                price: "218",
                star: 3,
                poiId: "16593779494209949400",
                pano: {
                    svid: "10011026131012113134700",
                    heading: 207,
                    pitch: -8,
                    zoom: 1
                }
            }
        ];
        this.regionData = [
            {
                name: "故宫博物院",
                price: "60",
                star: 5,
                dis: "7.7km",
                poiId: "5866905815035848227",
                pano: {
                    svid: "100130Y1150427135627510",
                    heading: 2,
                    pitch: -4,
                    zoom: 1
                }
            },
            {
                name: "颐和园",
                poiId: "12609347545913930473",
                star: 5,
                price: "60",
                dis: "10km",
                pano: {
                    svid: "10013511120530170220800",
                    heading: 309,
                    pitch: 10,
                    zoom: 1
                }
            },
            {
                name: "天坛公园",
                star: 5,
                dis: "12.4km",
                price: "15",
                poiId: "6621879543162709731",
                pano: {
                    svid: "10011501120406140516000",
                    heading: 309,
                    pitch: -1,
                    zoom: 1
                }
            },
            {
                name: "景山公园",
                star: 4,
                price: "10",
                poiId: "18004506485022383500",
                dis: "7.5km",
                pano: {
                    svid: "10011504120714123710200",
                    heading: 356,
                    pitch: 0,
                    zoom: 1
                }
            },

            {
                name: "天安门广场",
                price: "免费",
                star: 5,
                dis: "9.4km",
                poiId: "8314157447236438749",
                pano: {
                    svid: "10011501120802180048500",
                    heading: 358,
                    pitch: 8,
                    zoom: 1
                }
            },
            {
                name: "恭王府",
                dis: "6.3km",
                price: "210",
                star: 5,
                poiId: "14159776522485002844",
                pano: {
                    svid: "10013XTY1405190SCENE017",
                    heading: 193,
                    pitch: 15,
                    zoom: 1
                }
            },

            {
                name: "八达岭长城",
                price: "45",
                star: 4,
                dis: "51.8km",
                poiId: "7077656971587797755",
                pano: {
                    svid: "10013500111228000000111",
                    heading: 107,
                    pitch: -6,
                    zoom: 1
                }
            },
            {
                name: "北京动物园",
                price: "20",
                star: 4,
                dis: "7.8km",
                poiId: "14567413370587960451",
                pano: {
                    svid: "10011591120917102750200",
                    heading: 0,
                    pitch: 11,
                    zoom: 1
                }
            },
            {
                name: "北京大观园",
                price: "40",
                star: 4,
                dis: "13.8km",
                poiId: "13723660690930962636",
                pano: {
                    svid: "26153XTY1404020SCENE003",
                    heading: 15,
                    pitch: 0,
                    zoom: 1
                }
            },
            {
                name: "朝阳公园",
                price: "200",
                star: 4,
                dis: "9.7km",
                poiId: "6170450787219713040",
                pano: {
                    svid: "100131J9150116104435440",
                    heading: 1,
                    pitch: 1,
                    zoom: 1
                }
            },
            {
                name: "北京欢乐谷",
                price: "1280",
                star: 4,
                dis: "16.5km",
                poiId: "11382835658603189596",
                pano: {
                    svid: "10011503120518094202500",
                    heading: 48,
                    pitch: 0,
                    zoom: 1
                }
            },
            {
                name: "水立方",
                price: "260",
                star: 5,
                dis: "535m",
                poiId: "10640217382929455440",
                pano: {
                    svid: "10012010120414194740500",
                    heading: 66,
                    pitch: 8,
                    zoom: 1
                }
            },
            {
                name: "北海公园",
                price: "10",
                star: 4,
                dis: "7.5km",
                poiId: "4478872004779949464",
                pano: {
                    svid: "10011591120809182050300",
                    heading: 239,
                    pitch: 16,
                    zoom: 1
                }
            },
            {
                name: "香山公园",
                price: "10",
                star: 4,
                dis: "17.6km",
                poiId: "10208528317531322697",
                pano: {
                    svid: "10013560121031100400400",
                    heading: 270,
                    pitch: -16,
                    zoom: 1
                }
            },
            {
                name: "雁栖湖",
                price: "224",
                star: 4,
                dis: "51km",
                poiId: "16108962962368599428",
                pano: {
                    svid: "10011010120508120912000",
                    heading: 290,
                    pitch: 12,
                    zoom: 1
                }
            },
            {
                name: "圆明园遗址公园",
                price: "15",
                star: 4,
                dis: "8km",
                poiId: "10743810419307442475",
                pano: {
                    svid: "10011670121217155702800",
                    heading: 270,
                    pitch: 0,
                    zoom: 1
                }
            },
            {
                name: "玉渊潭公园",
                price: "43",
                star: 4,
                dis: "11km",
                poiId: "2023833468915499718",
                pano: {
                    svid: "10011591120830162929300",
                    heading: 298,
                    pitch: 4,
                    zoom: 1
                }
            },
            {
                name: "居庸关长城",
                price: "40",
                star: 4,
                dis: "42.6km",
                poiId: "11795676119371916301",
                pano: {
                    svid: "100130J3150127144854000",
                    heading: 180,
                    pitch: 4,
                    zoom: 1
                }
            },
            {
                name: "石景山游乐园",
                price: "10",
                star: 4,
                dis: "18.4km",
                poiId: "16690702538416700738",
                pano: {
                    svid: "10011591120829173227900",
                    heading: 198,
                    pitch: -20,
                    zoom: 1
                }
            },
            {
                name: "世界公园",
                price: "100",
                star: 4,
                dis: "22km",
                poiId: "5725209911340936453",
                pano: {
                    svid: "10011039130430161555500",
                    heading: 218,
                    pitch: 0,
                    zoom: 1
                }
            },
            {
                name: "雍和宫",
                price: "25",
                star: 4,
                dis: "5.3km",
                poiId: "1263788827820498683",
                pano: {
                    svid: "10011508120328101448200",
                    heading: 18,
                    pitch: -6,
                    zoom: 1
                }
            },
            {
                name: "北京奥林匹克森林公园",
                price: "140",
                star: 4,
                dis: "2.2km",
                poiId: "879764101861325484",
                pano: {
                    svid: "10011591120722181931700",
                    heading: 50,
                    pitch: 0,
                    zoom: 1
                }
            },
            {
                name: "中央广播电视塔",
                price: "63",
                star: 4,
                dis: "11km",
                poiId: "8457812914797921661",
                pano: {
                    svid: "10011039131016131104900",
                    heading: 269,
                    pitch: -17,
                    zoom: 1
                }
            },
            {
                name: "八大处公园",
                price: "10",
                star: 4,
                dis: "18.5km",
                poiId: "15116646283219390823",
                pano: {
                    svid: "10013XTY1405020SCENE011",
                    heading: 72,
                    pitch: 8,
                    zoom: 1
                }
            },
            {
                name: "中国科学技术馆",
                price: "198",
                star: 4,
                dis: "1.5km",
                poiId: "9560781265108171332",
                pano: {
                    svid: "10011007131112120913100",
                    heading: 271,
                    pitch: -3,
                    zoom: 1
                }
            },
            {
                name: "首都博物馆",
                price: "免费",
                star: 4,
                dis: "10.7km",
                poiId: "16092003920256072236",
                pano: {
                    svid: "10013TDD1304420SCENE006",
                    heading: 99,
                    pitch: 7,
                    zoom: 1
                }
            },
            {
                name: "什刹海公园",
                price: "28",
                star: 4,
                dis: "5.7km",
                poiId: "464095628784311799",
                pano: {
                    svid: "10011509120331095425000",
                    heading: 0,
                    pitch: -1,
                    zoom: 1
                }
            },
            {
                name: "北京凤凰岭自然风景公园",
                price: "20",
                star: 4,
                dis: "28.6km",
                poiId: "4025937126124380803",
                pano: {
                    svid: "10011014120407154129100",
                    heading: 65,
                    pitch: 0,
                    zoom: 1
                }
            },

            {
                name: "陶然亭公园",
                price: "5",
                star: 4,
                dis: "13.2km",
                poiId: "9452270297978051049",
                pano: {
                    svid: "10013TDD1304160SCENE011",
                    heading: 95,
                    pitch: -5,
                    zoom: 1
                }
            }
        ];
        this.init();
    }

    var sp = Sport.prototype;

    sp.init = function () {
        this._initControl();
        this._initList();
        this.initShareUi();
    }

    sp._initControl = function () {
        var t = this;
        t._changeButtonState(0, "", t.buttons[0]+"Select");
        t.select = 0;
        for (var i=0; i<3; i++) {
           $("#" + t.buttons[i]).bind('click',(function (index) {
               return function () {
                   if (t.select == index) {
                       if (t[t.buttons[index] + "Click"]) {
                           t[t.buttons[index] + "Click"]();
                       }
                       return;
                   }
                   t._changeButtonState(index, "", t.buttons[index]+"Select");
                   t._changeButtonState(t.select, t.buttons[t.select]+"Select", "");
                   if (t[t.buttons[index] + "Click"]) {
                       t[t.buttons[index] + "Click"]();
                   }
                   t.select = index;
               }
           })(i));
        }
        $("#" + t.buttons[3]).bind('click',function () {
            t.clickShareButton();
        });
        $('#control').css({
            display: 'block'
        });
    }

    sp.clickShareButton = function (flag) {
        var t = this;
        if (!$("#" + t.buttons[3]).hasClass(t.buttons[3]+"Select") && !flag) {
            t._changeButtonState(3, "", t.buttons[3]+"Select");
        } else {
            t._changeButtonState(3, t.buttons[3]+"Select", "");
        }

        if (t[t.buttons[3] + "Click"]) {
            t[t.buttons[3] + "Click"]();
        }
    };

    sp.placeClick = function () {
        this.hideShareDia();
        if (this.select !== 0) {
            this.setPano(this.svid, {
                heading: 190,
                pitch: 17
            });
        }
        this.hideList();
    }

    sp.hotelClick = function () {
        this.hideShareDia();
        if (this.select !== 1) {
            this.showList(this.hotelData, 169, 1);
        } else {
            if( $(this.listContainer).css('display') == '' ||
                $(this.listContainer).css('display') == 'none') {
                $(this.listContainer).css('display', 'block')
            } else {
                $(this.listContainer).css('display', 'none');
            }
        }
    };

    sp.regionClick = function () {
        this.hideShareDia();
        if (this.select !== 2) {
            this.showList(this.regionData, 242, 0);
        } else {
            if( $(this.listContainer).css('display') == '' ||
                $(this.listContainer).css('display') == 'none') {
                $(this.listContainer).css('display', 'block')
            } else {
                $(this.listContainer).css('display', 'none');
            }
        }
    };

    sp.shareClick = function () {
        this.hideList();
        if ($(this.shareCon).css('display') == 'none') {
           this.showShareDia();
        } else {
            this.hideShareDia();
        }
    }

    sp._changeButtonState = function (index, rc, ac) {
        $("#" + this.buttons[index]).addClass(ac)
        $("#" + this.buttons[index]).removeClass(rc);
    };

    sp.showList = function (data, top, type) {
        var result = "";
        this.selectIndex = null;
        for(var i=0; i<data.length; i++) {
            data[i].index = i+1;
            result += this.createItem(data[i], type);
        }
        this.listContent.innerHTML =  result;
        $(this.listContent).scrollTop(0);
        $(this.listContainer).css({
            display: 'block',
            top: top
        });
        this.listData = data;
        this.selectItem(0);
        this.listStep(0);
    };

    sp.onItemClick = function (index) {
        if (this.selectIndex != (index-1)) {
            this.selectItem(index - 1);
        }
    }

    sp.next = function () {
        if (!this.step) {
             this.step = 0;
        }
        this.step = this.step + 1;
        this.listStep(this.step);
    }

    sp.pre = function () {
        if (!this.step) {
            this.step = 1;
        }
        this.step = this.step - 1;
        this.listStep(this.step);
    }

    sp.listStep = function (step) {
        $(this.listContent).scrollTop(step*222);
        if (step == 0) {
            $(this.preButton).css({
                display: "none"
            })
        }else {
            $(this.preButton).css({
                display: "block"
            })
        }
        if(step == 2) {
            $(this.nexButton).css({
                display: "none"
            })
        } else {
            $(this.nexButton).css({
                display: "block"
            })
        }
        this.step = step;
    }

    sp.hideList = function () {
        $(this.listContainer).css('display', 'none');
    };

    sp._initList = function () {
       this.listContainer = document.getElementById('list');
       this.preButton = document.createElement('div');
       this.preButton.id = 'pre';
       this.preButton.className = 'pre';
       this.listContent = document.createElement('ul');
       this.listContent.className = 'content';
       this.nexButton = document.createElement('div');
       this.nexButton.id = 'nex';
       this.nexButton.className = 'nex';
       this.listContainer.appendChild(this.preButton);
       this.listContainer.appendChild(this.listContent);
       this.listContainer.appendChild(this.nexButton);
       this.preButton.onclick = (function (t) {
           return function () {
               t.pre();
           }
       })(this);
        this.nexButton.onclick = (function (t) {
            return function () {
                t.next();
            }
        })(this);
    };

    sp.createItem = function (data, type) {
         var result = '<li id="dd_'+data.index+'" class="item" onclick="sport.onItemClick('+ data.index+');">' +
             '<div class="no">' + data.index + '</div>' +
             '<div class="tit">' + data.name + '</div>' +
             '<div class="dis">' + data.dis+ '</div>' +
             '<div class="starCon">';
          for(var i=0; i<data.star; i++) {
              result += '<span class="star"></span>';
          }
          if (type && data.price!='暂无' && data.price!='免费') {
              result += '</div>' +
                  '<div class="price">￥'+data.price+'起</div>';
          } else if(data.price!='暂无' && data.price!='免费'){
              result += '</div>' +
                  '<div class="price">￥'+data.price+'</div>';
          } else {
              result += '</div>' +
                  '<div class="price">'+data.price+'</div>';
          }

        if (type) {
           result +=  '<a target="_blank" href="http://map.qq.com/poi/?sm='+data.poiId + '&scroll=1&keyfrom=2">' +
               '<div class="book"></div>' +
               '</a>';
        }
        return result;
    }

    sp.setPano = function (svid, pov) {
        if (svid) {
            pano.setPano(svid);
        }

        if (pov) {
            pano.setPov(pov);
        }
    };

    sp.selectItem = function (index) {
        if (this.listData) {
            var panoData = this.listData[index].pano;
            this.setPano(panoData.svid, {
                heading: panoData.heading,
                pitch: panoData.pitch
            });
            $("#dd_"+(index + 1)).addClass("itemSelect");
            if (this.selectIndex || this.selectIndex == 0) {
                $("#dd_" + (this.selectIndex+1)).removeClass("itemSelect");
            }
        }
        this.selectIndex = index;
    } ;

    sp.initShareUi = function () {
        this.shareCon = document.getElementById("shareCon");
        var t = this;
        var content = '<div id="share" style="margin:20px 0 0 2px;" onclick="shareTo(event)"> ' +
            '<div style="float:left;font-size:11px; height: 16px;line-height: 17px;margin-right:7px;color:#fff;">分享到</div>' +
            '    <a href="javascript:void(0);" hidefocus="true" title="腾讯微博" >' +
            '        <img id="blog" border="0" style="margin-right:0px;background:url(' + "'theme/img/shareto.gif'" + ') 0 0 no-repeat;width:16px;height:16px;" src="theme/img/blank.gif" alt="腾讯微博"></a>' +
            '    <a href="javascript:void(0);" hidefocus="true"  title="QQ空间">' +
            '        <img id="qzone" border="0" hidefocus="true"  style="margin-right:0px;background:url(' + "'theme/img/shareto.gif'" + ') 0 -16px no-repeat;width:16px;height:16px;" src="theme/img/blank.gif" alt="QQ空间"></a>' +
            '    <a href="javascript:void(0);"  hidefocus="true" title="朋友网">' +
            '        <img id="friends" border="0" style="margin-right:0px;background:url(' + "'theme/img/shareto.gif'" + ') 0 -32px no-repeat;width:16px;height:16px;" src="theme/img/blank.gif" title="朋友网"></a>' +
            '    <a href="javascript:void(0);" hidefocus="true" title="新浪微博">' +
            '        <img id="weibo" border="0" style="margin-right:0px;background:url(' + "'theme/img/shareto.gif'" + ') 0 -48px no-repeat;width:16px;height:16px;" src="theme/img/blank.gif" alt="新浪微博"></a>' +
            '    <a href="javascript:void(0);" hidefocus="true" title="人人网">' +
            '        <img id="renren" border="0" style="margin-right:0px;background:url(' + "'theme/img/shareto.gif'" + ') 0 -64px no-repeat;width:16px;height:16px;" src="theme/img/blank.gif" alt="人人网"></a>' +
            '    <a href="javascript:void(0);" hidefocus="true" title="开心网">' +
            '        <img id="kaixin" border="0" style="margin-right:0px;background:url(' + "'theme/img/shareto.gif'" + ') 0 -80px no-repeat;width:16px;height:16px;" src="theme/img/blank.gif" alt="开心网"></a>' +
            '</div>';
        this.shareCon.innerHTML = content;
        var share2ImgCon = createNode('div',{
            style: 'position:absolute;bottom:40px;right:45px;border:1px solid #ffffff;width:72px;height:72px;'
        },this.shareCon);

        t.share2Img = new Image();
        t.share2Img.width = 72;
        t.share2Img.height = 72;
        t.share2Img.style.width = '72px';
        t.share2Img.style.height = '72px';
        t.share2Img.onload = function(){
            share2ImgCon.appendChild(t.share2Img);
            t.share2Img.width = 72;
            t.share2Img.height = 72;
        };
        var content = createNode('div', {
            style: "position:absolute;color:#fff;font-size:11px;left:40px;bottom:15px;",
            innerHTML: "扫一扫 手机看街景"
        },this.shareCon);
    };

    sp.showShareDia = function () {
        this.shareCon.style.display = "block";
        var url = getMobileLink();
        var imgUrl = ShareImgUrl + encodeURIComponent(url);
        this.share2Img.src = imgUrl;
    }

    sp.hideShareDia = function () {
        this.shareCon.style.display = "none";
        this._changeButtonState(3, this.buttons[3]+"Select", "");
    }

    sp.startAutoPlay = function () {
        this.isAutoPlay = true;
        this.play();
    }

    sp.play = function () {
//        this.autoTimer && cancelRequestAnimationFrame(this.autoTimer);
        this.isAutoPlay = true;
        var fun = window.requestAnimationFrame || window.setTimeout
        var t = this;
        this.autoTimer = fun(function(){
            var pov = pano.getPov();
            var heading = (pov.heading+0.04)%360;
            pano.setPov({
                heading: heading,
                pitch: pov.pitch
            });
            if (t.isAutoPlay) {
                t.play();
            }
        })
    };


    sp.stopAutoPlay = function () {
        this.isAutoPlay = false;
    }

    window.sport = new Sport();

    setTimeout(function () {
       sport.startAutoPlay();
    }, 3000);

    $(document).bind('mousedown', function () {
       sport.stopAutoPlay();
    })

    sp.animi = function () {
        requestAnimationFrame
    }


})();

