// 通过专辑id, 获取专辑视频 (借用底层相关视频)
var getVideoListByCoverId = function(cid, callback) {

    callback = callback || $.noop;

    if ("string" !== typeof cid) {
        callback(null);
        return;
    }

    $.ajax({
        method: "GET",
        url: "http://data.video.qq.com/fcgi-bin/data?tid=352&appid=10001009&appkey=c5a3e1529a7ba805&otype=json&callback=cb",
        data: {
            idlist: cid
        },
        dataType: "jsonp",
        cache: true,
        scriptCharset: "utf-8"
    }).done(function(json){
        // 接口返回检查
        if (!json || json.errorno) {
            callback(null);
            return;
        }
        // 接口数据过滤整理
        var videoList = [];
        var fields = json.results[0].fields,
            //list = fields.c_vids || fields.c_vclips || [];
            list = fields.videos;
        $.each(list, function(i, n){
            videoList.push({
                vid: n.c_vid,
                title: n.c_title,
                pic: n.c_pic_160_90,
                url: n.c_play_url,
                allnumc: parseInt(n.allnumc, 10),
                duration: n.c_tl
            });
        });
        // 返回
        callback(videoList, cid);
    }).fail(function(){
        callback(null);
    });
};
/*  |xGv00|fd05bfee1a7de6e7c1c33a61f491593f */