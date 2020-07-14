$(function(){
	'use strict';

	var tool = {
		focus : function(){
			var $focus = $('.first .focus'),
				$item = $focus.find('.item'),
				$focus_dot = $focus.find('.focus_dot'),
				item_len = $item.length,
				dot_html = '';

			for(var i=0; i<item_len; i++){
				dot_html += '<a href="javascript:;"></a>';
			}

			$focus_dot.html( dot_html );
			$focus.qqfocus({
		        effect: 'scrollx',
		        prev: ".prev",
		        auto : 1,
		        next: ".next",
		        speed: 600,
		        isSeamless: true
		    });
		},

		showTabHd : function($obj, index){
			var $li = $obj.find('.tab-hd li'),
				// index = index ? index : $obj.find('.tab-hd .current').index(),
				$tab_bd_item = $obj.find('.tab-bd-item'),
				item_len = $tab_bd_item.length;

			if( !index ){
				index = $obj.find('.tab-hd .current').index();
				$li.removeClass('current').eq(index).addClass('current');
			}
			
			if( index<item_len ){
				$tab_bd_item.removeClass('active').eq(index).addClass('active');
			}
		},

		show : function(){
			this.showTabHd( $('.gold') );
			this.showTabHd( $('.silver') );
			this.showTabHd( $('.copper') );
		},

		// 灏嗙墝姒�
		getGold : function(){
			var _limitdisplayshowget = _limitdisplayshow || "7";
			
			$.ajax({
				type:"GET",
				url:"http://ziliaoku.sports.qq.com/cube/index?cubeId=34&dimId=67&limit="+ _limitdisplayshowget +"&from=sportsdatabase",
				dataType:'jsonp',
				success:function(data){
					var _gdata = data.data.OlyMedalList;
					if(_gdata == undefined) return;
					var goldlength = _gdata.length,goldjsonp='';
					var html = [];
					var _color = "#ff8327";
					for(var i=0;i<goldlength;i++){
						if(i>2){
							_color = "#999";
						}
						html = [];
						var goldsrc = _gdata[i];
						goldjsonp = {
							_bgcolor:_color,
							_number: i+1,
							_name : goldsrc.countryCnName,
							_gold : goldsrc.gold,
							_silver: goldsrc.silver,
							_bronze: goldsrc.bronze,
							_allnum: Number(goldsrc.gold)+ Number(goldsrc.silver) + Number(goldsrc.bronze)
						}
						html.push((template.render("list04",goldjsonp)));
						$(".winresult ul").append(html);
					}	
				}
			});
		},

		init : function(){
			this.focus();
			this.show();
			this.getGold();
		}
	}

	tool.init();
	// @update $(".tab")-> $(".tab-hd") @wpzheng
	$('.tab .tab-hd').on('mouseenter', 'li', function(){
		var $this = $(this);

		if( !$this.hasClass('disabled') ){
			var index = $this.index();

			$this.addClass('current').siblings().removeClass('current');
			tool.showTabHd( $this.parents('.tab'), index );
		}
	})
})/*  |xGv00|e9e47cdcef950603c28496089e13a746 */