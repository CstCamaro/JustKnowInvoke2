var miniNavConf = [
    { name: '腾讯大楚网', link: 'http://hb.qq.com/', boss: 'mainNav' },
    { name: '资讯', link: 'http://hb.qq.com/news/', boss: 'mainNav' },
    { name: '视觉', link: 'http://hb.qq.com/v/', boss: 'mainNav' },
    { name: '财经', link: 'http://hb.qq.com/economic/', boss: 'mainNav' },
    { name: '房产', link: 'http://wh.house.qq.com/', boss: 'mainNav' },
    { name: '理财', link: 'http://hb.qq.com/money/', boss: 'mainNav' },
    { name: '家居', link: 'http://hb.qq.com/home/', boss: 'mainNav' },
    { name: '微信', link: 'http://hb.qq.com/weixin/', boss: 'mainNav' },
    { name: '健康', link: 'http://hb.qq.com/health/', boss: 'mainNav' },
    { name: '教育', link: 'http://hb.qq.com/edu/', boss: 'mainNav' },
    { name: '慈善', link: 'http://hb.qq.com/cishan/', boss: 'mainNav' },
    { name: '旅游', link: 'http://hb.qq.com/tour/', boss: 'mainNav' },
    { name: '创业', link: 'http://hb.qq.com/chuangye/', boss: 'mainNav' },
    { name: '报料', link: 'http://hb.qq.com/baoliao/', boss: 'mainNav' },
    { name: '跑途', link: 'http://hb.qq.com/pt/', boss: 'mainNav' },
    { name: '游戏', link: 'http://hb.qq.com/whzw/yx/', boss: 'mainNav' },
    {
        name: '更多城市',
        link: null,
        subnav: [
            { name: '宜昌', link: '/yc/', boss: 'mainNav' },
            { name: '黄石', link: '/hs/', boss: 'mainNav' },
            { name: '十堰', link: '/sy/', boss: 'mainNav' },
            { name: '孝感', link: '/xg/', boss: 'mainNav' },
            { name: '荆门', link: '/jm/', boss: 'mainNav' },
            { name: '荆州', link: '/jz/', boss: 'mainNav' },
            { name: '恩施', link: '/es/', boss: 'mainNav' },
            { name: '潜江', link: '/qj/', boss: 'mainNav' }
        ]
    }
];



        (function () {
        var id = ARTICLE_INFO.id;
            var time = id.substr(0, 4);

            if (parseInt(time) < 2020) {
                console.log(time);
                var userAgentInfo = navigator.userAgent;
                var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
                var flag = true;
                for (var v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        window.location.href = "https://hb.qq.com/zt/2008/hymn/index2017.htm";
                    }
                }
                window.location.href = "https://hb.qq.com/";
            } else {
                // console.log(time);
            }
        })();