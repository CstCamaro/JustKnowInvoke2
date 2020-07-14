$('.wrapper img').lazyload({
	effect : 'fadeIn'
})

// 滚动2
var config02 = {
	direction: "right",
	step: 1,
	inner:'.vsinner'
};
$("#videoscroll").paraScroll(config02);

var config03 = {
	direction: "right",
	step: 1,
	inner:'.vinner'
};
$("#videolistNav").paraScroll(config03);

var config04 = {
	direction: "right",
	step: 1,
	auto:false,
	inner:'.dtinner'
};
$("#daytimescroll").paraScroll(config04);

var config05 = {
	direction: "right",
	step: 5,
	auto:true,
	inner:'.tsinner'
};
$("#scrollteam").paraScroll(config05);



$("#videotab").tabs({
    index: 0,
    type: "mouseenter",
    current: "current",
    hdItem: ".tab_hd_item",
    bdItem: ".tab_bd_item"
});
$("#chinaNews").tabs({
    index: 0,
    type: "mouseenter",
    current: "current",
    hdItem: ".tab_hd_item",
    bdItem: ".tab_bd_item"
});

$("#vsresult").tabs({
    index: 0,
    type: "click",
    current: "current",
    hdItem: ".tab_hd_item",
    bdItem: ".tab_bd_item"
});

$(".shijian .timeline").mCustomScrollbar({
	theme:"minimal-dark",
	scrollbarPosition : 'outside',
	autoHideScrollbar : true
});

function setTimeLineShow( $a ){
	if( !$('.shijian').length || !$('.shijian').find('.con').length || !$a.length ){
		return;
	}

	var $show = $('.shijian .show'),
		$img = $show.find('img'),
		$laytop = $show.find('.top'),
		$laybottom = $show.find('.bottom'),
		$desc = $show.find('.desc'),
		con_offset_top = $('.shijian').find('.con').offset().top,
		a_offset_top = $a.offset().top,
		diff = a_offset_top - con_offset_top;

	$img.attr('src', $a.data('img'));
	$desc.html( '<p>'+ $a.data('desc') +'...[<a href="'+ $a.data('url') +'" target="_blank" class="more">详细</a>]</p>'  );
	$laytop.css('height', diff-10);
	$laybottom.css('height', 473-diff)
}

setTimeLineShow( $('.shijian .timeline p').eq(0).children('a') );

$('.shijian .timeline').on('mouseover', 'a', function(){
	setTimeLineShow( $(this) );
});

String.prototype.gblen = function() {    
    var len = 0;    
    for (var i=0; i<this.length; i++) {    
        if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {    
             len += 2;    
         } else {    
             len ++;    
         }    
     }    
    return len;    
} 

var tool = {
	// 视频精选
	getVideoData : function(){
		var $qxzj = $('.qxzj'),
			$con = $qxzj.find('.con');
		$.ajax({
			url : $con.data('url'),
			type : 'get',
			dataType : 'jsonp'
		}).done(function(data){
			if( data.ret==0 ){
				var results = data.jsonvalue.results,
					len = results.length,
					len = len > 5 ? 5 : len,
					html = '';

				for(var i=0; i<len; i++){
					var cls = i==0 ? 'first' : '',
						max = i==0 ? 21 : 12,
						item = results[i].fields;

					var title = item.title.length>max ? item.title.substring(0, max)+'...' : item.title;

					html += '<li class="'+cls+'">\
								<a href="'+item.url+'" title="'+item.title+'" target="_blank">\
									<img src="'+item.pic_640_360+'" alt="'+item.title+'" />\
									<div class="overlay">\
										<em></em>'+title+'\
									</div>\
								</a>\
							</li>';
				}

				$con.find('ul').html( html );
			}
		})
	},

	// 精彩视频
	getWonderVideo : function(){
		var $tjspCon = $('.tjsp .tjspCon'),
			cid = $tjspCon.data('cid');

		$.ajax({
            method: "GET",
            url: "http://data.video.qq.com/fcgi-bin/data",
            data: {
                tid: "426",
                idlist: cid,
                appid: "10001009",
                appkey: "c5a3e1529a7ba805",
                otype: "json"
            },
            dataType: "jsonp",
            cache: !0,
            scriptCharset: "utf-8"
        }).done(function(data){
        	if( data.errorno==0 ){
        		var videos = data.results[0].fields.videos,
        			len = videos.length,
        			len = len > 12 ? 12 : len,
        			html = '';

        		for(var i=0; i<len; i++){
        			var item = videos[i],
        				time = item.c_tl,
        				minute = parseInt( time/60 ),
        				minute = minute<10 ? '0'+minute : minute,
        				second = parseInt( time%60 ),
        				t = minute +':'+second;

        			html += '<li>\
								<a href="'+item.c_play_url+'" target="_blank">\
									<img src="'+item.c_pic_228_128+'" alt="'+item.c_title+'" />\
									<div class="shadow"><span class="time">'+t+'</span><span class="num">'+item.allnumc+'</span></div>\
								</a>\
								<p>'+item.c_title+'</p>\
							</li>';
        		}

        		$tjspCon.find('ul').html( html );
        	}
        })
	},

	init : function(){
		this.getVideoData();
		this.getWonderVideo();
	}
}

tool.init();/*  |xGv00|375e4f07de2cfa534359a08e626bd0da */