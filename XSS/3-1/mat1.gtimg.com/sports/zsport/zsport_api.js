//精选内容
(function(){
    $.ajax({
        url: 'http://i.match.qq.com/pac/sports_others?action=diceng',
        type: 'GET',
        dataType: 'jsonp',
        data: {block: 'jingxuan'}
    })
        .done(function(d) {
            //console.log(d);
            if(d.code==0){
                get_html(d.data);
            }else{
                failed();
            }
        })
        .fail(function() {
            failed();
        });

    function failed(){
        var d = zsport_news_bake.slice(0, 7);
        get_html(d);
    }

    function get_html(d){
        var html = '';
        for (var i =0,len= d.length;i<len;i++) {
            var data = d[i];
            html+='<li>'
                +'<a href="'+data['url']+'" target="_blank" title="'+data['title']+'">'+data['title']+'</a>'
                +'<div class="play"></div>'
                +'</li>';
        }
        $('#api_jingxuan').html(html);
    }
})();


//热门视频
$.ajax({
    url: 'http://i.match.qq.com/pac/sports_others?action=diceng',
    type: 'GET',
    dataType: 'jsonp',
    data: {block: 'hot_videos'}
})
    .done(function(d) {
        //console.log(d);
        if(d.code==0){
            var html = '';
            var len= d.data.length;
            for (var i =0;i<len;i++) {
                var data = d.data[i];
                if(data['title'].indexOf('视频：')>-1){
                    data['title'] = data['title'].substr(3);
                }
                html+='<li bosszone="vnews'+(i+1)+'">'
                    +'<a class="picture" href="'+data['url']+'" target="_blank" title="'+data['title']+'"><img src="'+data['pic_200']+'"/><div class="play"></div></a>'
                    +'<a href="'+data['url']+'" class="atitle" target="_blank">'+data['title']+'</a>'
                    +'</li>';
            }
            $('#api_hotvideo').html(html);
        }
    })
    .fail(function() {
        console.log("error");
    });

//视觉焦点
$.ajax({
    url: 'http://i.match.qq.com/pac/sports_others?action=diceng',
    type: 'GET',
    dataType: 'jsonp',
    data: {block: 'shijue'}
})
    .done(function(d) {
        //console.log(d);
        if(d.code==0){
            var html = '';
            for (var i =0,len= d.data.length;i<len;i++) {
                var data = d.data[i];
                var className = i%2==0?'':'last';
                html+='<li class="'+className+'">'
                    +'<a class="picture" href="'+data['url']+'" target="_blank" title="'+data['title']+'"><img src="'+data['big_image']+'"/></a>'
                    +'<a href="'+data['url']+'" class="atitle" target="_blank">'+data['title']+'</a>'
                    +'</li>';
            }
            $('#api_visual_focus').html(html);
        }
    })
    .fail(function() {
        console.log("error");
    });

//为你推荐
(function(){
    function get_tuijian(page){
        $.ajax({
            url: 'http://i.match.qq.com/pac/sports_others?action=tuijian',
            type: 'GET',
            dataType: 'jsonp',
            data: {channel: 'zonghe',page:page+1}//为避免和精选内容重复
        }).done(function(d) {
            //console.log(d,'为你推荐');
            if(d.code==0){
                var html = get_html(d.data);
            }
        });
        function get_html(d){
            var html = '';
            var first = $('#recommendFirst').length>0?$.trim($('#recommendFirst').find('h3').text()).substring(0,6):false;
            //console.log(first);
            for (var i =0,len= d.length;i<len;i++) {
                var data = d[i];
                if(first&&data.title.indexOf(first)!==-1){
                    continue;
                }
                html+='<li>';
                if(data['img_url']){
                    html+='<a href="'+data['url']+'" class="picture" target="_blank"><img src="'+data['img_url']+'"></a>';
                }
                html+='<div class="cont">'
                    +'<h3><a href="'+data['url']+'" target="_blank">'+data['title']+'</a></h3>'
                    +'<div class="time">'+data.pub_time+'</div>'
                        //+'<p>'+data.intro+'</p>'
                    +'</div>'
                    +'</li>';
            }
            $('#api_tuijian').append(html);
        }
        $('#api_tuijiian_more').data('page', page);
    }

    $('#api_tuijiian_more').click(function(e){
        var page = $('#api_tuijiian_more').data('page');
        page++;
        if(page<=3){
            get_tuijian(page);
        }
        if(page==3){
            $(this).hide();
        }
    });

    get_tuijian(1);
})();
 /*  |xGv00|5cbf70c669ac43b6f29fe3cf109fc7eb */