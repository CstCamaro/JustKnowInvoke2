$(function(){
	'use strict';

	var Player = {
		player : [],
		video : [],
		init : function(){
			var $mod_player = $('.jingpinlanmu .mod_player');

			$mod_player.each(function( index ){
				$(this).attr('id', 'mod_player_'+index);
			})
		},

		create : function(index, $player, vid, autoplay){

			this.video[index] = new tvp.VideoInfo();
			this.video[index].setVid( vid );
			this.player[index] = new tvp.Player();

			this.player[index].create({
			    width:676,
			    height:382,
			    video: this.video[index],
			    modId:$player.attr('id'),
			    isHtml5ShowLoadingAdOnStart : 0,
				isVodFlashShowSearchBar:0,
				isVodFlashShowEnd:0,
				flashWmode: "transparent",
				vodFlashSkin:"http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf",
			    autoplay:autoplay
			});
		},

		play : function( index, vid ){
			this.player[index].play( this.video[index].setVid( vid ) )
		}
	}
	Player.init();

	var tool = {
		// 获取播放列表
		getPlayData : function($obj, func){
			var cid = $obj.data('cid');

			if( cid ){
				$.ajax({
					type: "GET",
	                url: "http://data.video.qq.com/fcgi-bin/data",
	                data: {
	                    tid: "426",
	                    idlist: cid,
	                    appid: "10001009",
	                    appkey: "c5a3e1529a7ba805",
	                    otype: "json"
	                },
	                dataType: "jsonp"
				}).done(function(data){
					var videos = data.results[0].fields.videos,
						len = videos.length > 4 ? 4 : videos.length,
						html = '';

					for(var i=0; i<len; i++){
						var cls = i==0?'active':'',
							item = videos[i];

						html += '<li class="'+cls+'">\
                                    <a href="javascript:;" data-vid="'+item.c_vid+'">'+item.c_title+'<span class="num">'+item.allnumc+'</span></a>\
                                </li>';
					}

					$obj.html( '<ul class="clearfix">'+html+'</ul>' );

					$.isFunction( func ) && func();
				})
			}
		},

		// 侧边的视频列表
		getListData : function($obj){
			var columnid = $obj.data('columnid');

			if( columnid && $obj.data('listloaded')!='loaded' ){
				$.ajax({
					url : 'http://sportlist.video.qq.com/fcgi-bin/list_common_cgi?otype=json&platform=1&version=10000&intfname=web_sports_common_cid_list&tid=502&uappid=20001162&uappkey=9da00e02b727f1cd&type=4&sourcetype=2&pagesize=24&offset=0&sort=3&novalue=1',
					type : 'get',
					data : {c_column_id : columnid},
					dataType : 'jsonp'
				}).done(function(data){
					if( data.total>0 && data.ret==0 ){
						$obj.attr('data-listloaded', 'loaded');
					
						var results = data.jsonvalue.results,
							len = results.length > 6 ? 6 : results.length,
							html = '';

						for(var i=0; i<len; i++){
							var fields = results[i].fields;

							html += '<li><a href="'+fields.url+'" title="'+fields.title+'" target="_blank"><img src="'+fields.pic_228_128+'" alt="'+fields.title+'"><div class="shadow"><em></em>'+fields.title.substring(0, 14)+'</div></a></li>';
						}
						$obj.html( '<ul class="clearfix">'+html+'</ul>' );
					}
					
				})
			}
		},

		init:function(){
			var $play_list = $('.jingpinlanmu .play_list'),
				$list = $('.jingpinlanmu .list'),
				self = this;

			$play_list.each(function(index){
				self.getPlayData( $(this) , function(){
					index==0 && Player.create( 0, $('#mod_player_0'), $('#mod_player_0').next('.play_list').find('.active a').data('vid'), false );
				});
			});

			self.getListData( $list.eq(0) );

			$('.shendu .item img').each(function(){
				$(this).attr('src', $(this).attr('_src')).removeAttr('_src');
			});
		}
	}

	tool.init();

	// 首屏轮播图
	$("#videoscroll").paraScroll({
		direction: "right",
		step: 1,
		inner:'.vsinner'
	});

	// 金牌时刻
	$("#scroll_jpsk").length && $("#scroll_jpsk").qqScroll({
		direction:"bottom",
		prev:".prev-btn",
		next:".next-btn",
		auto:false,
		step:3
	});

	// 里约议事厅
	$("#scroll_b").length && $("#scroll_b").qqScroll({
		direction:"left",
		prev:".prev",
		next:".next"
	});

	// 独家专访
	$("#scroll_c").length && $("#scroll_c").qqScroll({
		direction: "right",
		prev: ".prev",
		next: ".next",
		step : 4
	});

	$(".dkzk_mod .scroll_B").length && $(".dkzk_mod .scroll_B").qqScroll({
	    direction:"right",
	    prev:".prev-btn",
	    next:".next-btn",
	    auto:false,
	    step:6
	});

	$('.jingpinlanmu').on('click', '.play_list a', function(){
		var $this = $(this),
			$player = $this.parents('.player').find('.mod_player'),
			index = $this.parents('.tab-bd-item').index();

		$this.parent().addClass('active').siblings().removeClass('active');
		// Player.create($player, $this.data('vid'), true);
		Player.play( index, $this.data('vid') );
	}).on('click', '.tab-hd-item', function(){
		var $this = $(this),
			index = $this.index(),
			$tab_bd = $this.parents('.tab').find('.tab-bd'),
			$tab_bd_item = $tab_bd.find('.tab-bd-item');

		$this.addClass('active').siblings().removeClass('active');
		$tab_bd_item.removeClass('show').eq(index).addClass('show');

		if( $this.attr('play_loaded')!='loaded' ){
			$this.attr('play_loaded', 'loaded');
			Player.create( index, $('#mod_player_'+index), $('#mod_player_'+index).next('.play_list').find('.active a').data('vid'), false );
		}

		// 加载列表
		var $cur_list = $tab_bd_item.eq(index).find('.list');
		if( $cur_list.data('listloaded')!='loaded' ){
			tool.getListData( $cur_list );
		}
	});

	function show_date_gold(index){
		var $gold = $('.gold'),
			$li = $gold.find('.tab-hd li'),
			$tab_bd_item = $gold.find('.tab-bd-item'),
			len = $tab_bd_item.length;

		if( !index ){
			index = $gold.find('.tab-hd .current').index();
			$li.removeClass('current').eq(index).addClass('current');
		}

		if( index<len && index>-1 ){
			var $current = $tab_bd_item.eq(index);

			$tab_bd_item.removeClass('active');
			$current.addClass('active');
		}
	}

	show_date_gold();
	$('.gold').on('mouseenter', '.tab-hd li', function(){
		var $this = $(this);
		if( !$this.hasClass('disabled') ){
			$this.addClass('current').siblings().removeClass('current');
			show_date_gold( $this.index() );
		}
	});
	
	$(".scanarea").hover(function(){
		$(".appear").addClass('show');
	},function(){
		$(".appear").removeClass('show');
	});
})/*  |xGv00|ad859f971221b68a050c9bc8bef1bcdd */