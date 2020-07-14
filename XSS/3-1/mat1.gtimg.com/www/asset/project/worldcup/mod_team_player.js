define(function(require, exports, module) {
		var boss = require('boss');
		aTp=$(".competition-player-card");
		aTp.each(function(){
			init($(this).attr('data-team'),$(this).attr('data-player'))
			
		})

		function init(teamId,playerId){
				$.getScript('http://sportswebapi.qq.com/team/cardNew?competitionId=4&teamId='+teamId+'&from=2014qqCom&callback=matches',function(){

					$.getScript('http://sportswebapi.qq.com/player/cardNew?competitionId=4&playerId='+playerId+'&from=2014qqCom&callback=player')
				
				});
				var wd = document.getElementById('wd');
				boss.Exposure(wd, 'EXshuju', 'team_player_Info');
		}
		
			
		/*球队信息、赛程*/
		window.matches=function (obj){
			
			var oVs='';
			var oInfo='<div class="info"><div class="flag"><a href="'+obj[1].url+'" target="_blank"><img src="'+obj[1].teamUrl+'" /></a></div><div class="txt"><span class="country"><a href="'+obj[1].url+'" target="_blank">'+obj[1].name+'</a></span><div class="support"><em class="add1">+1</em><span onclick="registerZone2({bossZone: \'zhichi\', url: \'\'},1)" class="do">支持</span><span class="numwrap"><em class="num" data="'+obj[1].teamId+'">'+obj[1].support+'</em>人</span></div><div class="mark"><span class="lastRecord">上届成绩：'+obj[1].lastRecord+'</span><span class="worldRank">世界排名：'+obj[1].worldRank+'</span></div></div></div>'
			for (var i = 0,len=obj[1].matches.length;i<len;i++){

				var startTime=obj[1].matches[i].startTime.substring(5,16)
		 		var homeName=obj[1].matches[i].homeName.substring(0,5);
		 		var awayName=obj[1].matches[i].awayName.substring(0,5);
		 		var State='';

		 		if (obj[1].matches[i].period =="已结束") {
		 			State='<span class="playback"><a href="http://sports.qq.com/kbsweb/football.htm?matchId='+obj[1].matches[i].matchId+'&competitionId=4" target="_blank" bossZone="huifang">回放</a></span>'

		 		}else{
		 			State = '<div class="r"><div class="matchBtn matchBtnSmall" data-competitionid="' + obj[1].matches[i].competitionId + '" data-matchid="' + obj[1].matches[i].matchId + '">'+
								'<div class="attBtn addAttBtn">'+
									'<div class="attBtnIn">'+
										'<a href="javascript:;" bossZone="guanzhu">关注</a>'+
									'</div>'+
								'</div>'+
								'<div class="attBtn delAttBtn" style="display:none">'+
									'<div class="attBtnIn"><span>已关注</span>'+
										'<a href="javascript:;">取消关注</a>'+
									'</div>'+
								'</div>'+
								'<span id=one_' + obj[1].matches[i].matchId + ' class="addOne"></span>'+
							'</div>'+
							'</div>';
		 		}
		 		


				oVs+='<li><span class="time">'+startTime+'</span><span class="vs"><a href="http://sports.qq.com/kbsweb/football.htm?matchId='+obj[1].matches[i].matchId+'&competitionId=4" target="_blank" bossZone="saishi">'+homeName+'vs'+awayName+'</a></span>'+State+'</li>';
				
			}
			
			oMatch='<div class="mod_team_player">'+oInfo+'<div class="match"><ul>'+oVs+'</ul></div><div style="display:none" class="player" bosszone="SJBstar" id="team_'+obj[1].teamId+'"></div></div>';

			
			$('#wd').prepend(oMatch);

			$('.do').unbind().click(function(){
				//$(this).children().css('color','#07923d')
				$(this).parent().find('.add1').css('display','block').animate({top:"-15px",opacity:"1"}).fadeOut('slow');
				$(this).css({background:'url(http://mat1.gtimg.com/2014/images/dc/sup_pic2.png) no-repeat 0 -56px',color:'#666'}).html('已支持')
				$(this).unbind('click').css('cursor','default')
				
				var _num = $(this).parent().find('.num');
				_num.html(parseInt(_num.html())+1);

				$.getScript('http://sportswebapi.qq.com/team/support?teamId='+_num.attr('data')+'&type=1&from=newsApp');
				
			})
		}

		/*球员信息*/
		window.player = function (obj){
			
			oPlayer='<div class="pic"><a href="'+obj[1].url+'" target="_blank"><img src="'+obj[1].icon+'" onload="loadImg(60, 64, this)"/></a></div><ul><li><a href="'+obj[1].url+'" target="_blank">'+obj[1].name+'</a></li><li>'+obj[1].birth+'</li><li>身高：'+obj[1].height+'</li><li>体重：'+obj[1].weight+'</li><li>'+obj[1].param[0].name+'：'+obj[1].param[0].value+'</li><li>'+obj[1].param[1].name+'：'+obj[1].param[1].value+'</li></ul>';
			//console.log(obj[1].countryTeamId)
			$('#team_'+obj[1].countryTeamId).css({display: 'block'}).append(oPlayer);
			//$('#wd').append(oPlayer)
		}
	

});

/*  |xGv00|562a1985bc4ed14072dfb8ca2be2ac12 */