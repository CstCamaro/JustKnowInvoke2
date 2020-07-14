// JavaScript Document
//视频查询通栏
;
(function () {


    var T = {
        renderer: {},
        render: function (tempalte_selector, data) {
            var template;
            if (!this.renderer[tempalte_selector]) {
                template = document.getElementById(tempalte_selector).innerHTML;
                this.renderer[tempalte_selector] = new Function('tpl_data', "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(tpl_data){p.push('" + template.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
            }
            return this.renderer[tempalte_selector](data);
        }
    };


    //初始化当前焦点dom
    var query_dom = $(".mod_schedule");
    var schedule_dom = query_dom.find(".schedule_l");
    var video_dom = query_dom.find(".schedule_r");


    //var curCompetitionId = 8;   //比赛id值

    initTeamList(curCompetitionId);
    initPlayerList(curCompetitionId);

    //不同类型的联赛，总轮次数不同
    var roundCount = 34;
    if (curCompetitionId == 8 || curCompetitionId == 21 || curCompetitionId == 23) {
        roundCount = 38;
    } else if (curCompetitionId == 22) {
        roundCount = 34;
    } else if (curCompetitionId == 208) {
        roundCount = 30;
    }

    var _html = "";
    for (var i = 1; i <= roundCount; i++) {
        _html += "<li data-round=" + i + ">" + i + "</li>";
    }
    schedule_dom.find("ul.data-rounds").html(_html);


    var curDate = new Date();
    var baseMonth = curMonth = curDate.getMonth() + 1;
    var baseYear = curYear = curDate.getFullYear();
    var baseDay = curDate.getDate();

    schedule_dom.on('click', 'ul.data-calendar li', function () {
        var curDay = $(this).html();
        var roundStr = "";
        roundStr += curYear;
        if (curMonth < 10) {
            roundStr += '0';
        }
        roundStr += curMonth;
        if (curDay.length == 1) {
            roundStr += '0';
        }
        roundStr += curDay;
    });

    schedule_dom.on('click', '.sch_team_all', function () {
        $('.sl_team_spread').fadeIn();
    });

    schedule_dom.on('click', '.sch_people_all', function () {
        $('.sl_people_spread').fadeIn();
    });

    schedule_dom.find('.sl_team_spread').on('click', '.btn_close_list', function () {
        $('.sl_team_spread').fadeOut();
    });

    schedule_dom.find('.sl_people_spread').on('click', '.btn_close_list', function () {
        $('.sl_people_spread').fadeOut();
    });

    schedule_dom.on('click', 'li[data-teamid]', function () {
        //球队数据
        video_dom.hide();

        var team_id = $(this).attr("data-teamid");
        var eventTar = $(this);
        var url = 'http://sportswebapi.qq.com/sportWeb/getFootballTeamVideo?teamId=' + team_id + '&competitionId=' + curCompetitionId;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: "teamCallback",
            success: function (res) {
                var _len = 12;
                if (!res.data || res.data.length == 0) {
                    return false;
                }
                if (res.data.length > _len) {
                    res.data.length = _len;
                }
                var match_data = {};
                match_data.matches = res.data;

                schedule_dom.find('li[data-teamid]').removeClass('current');
                schedule_dom.find('li[data-player]').removeClass('current');
                schedule_dom.find('li[data-round]').removeClass('current');
                $(eventTar).addClass('current');
                var _html = T.render('match_video_list_template', match_data);
                video_dom.html(_html);
                video_dom.fadeIn();
            }
        });
    });

    schedule_dom.on('click', 'li[data-round]', function () {//赛程
        video_dom.hide();
        var roundid = $(this).attr("data-round");
        
        schedule_dom.find('li[data-teamid]').removeClass('current');
        schedule_dom.find('li[data-player]').removeClass('current');
        schedule_dom.find('li[data-round]').removeClass('current');
        
        $(this).addClass("current");
        var url = 'http://sportswebapi.qq.com/sportsVideo/round?competitionId=' + curCompetitionId + '&round=' + roundid;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: "roundCallback",
            success: function (data) {
                var match_data = {};
                match_data.matches = [];

                for (var i = 0; i < data[1].length; i++) {
                    for (var j = 0; j < data[1][i].cover.length; j++) {
                        var coverObj = data[1][i].cover[j];
                        match_data.matches.push(coverObj);
                    }
                    if (data[1][i].cover.length == 0 && data[1][i].video.length > 0) {
                        var videoObj = data[1][i].video[0];
                        match_data.matches.push(videoObj);
                    }
                    if (data[1][i].cover.length == 0 && data[1][i].video.length > 1) {
                        var videoObj = data[1][i].video[1];
                        match_data.matches.push(videoObj);
                    }
                }
                console.log("match_data.matches:", match_data.matches.length == 0);
                if(match_data.matches.length == 0){
                    video_dom.html("\u6682\u65e0\u6570\u636e").fadeIn();
                    return false;
                }
                var _html = T.render('match_video_list_template', match_data);
                video_dom.html(_html);
                video_dom.fadeIn();
            }
        });
    });
  	schedule_dom.on('click','li[data-player]',function(){
		video_dom.hide();
		var pid=$(this).attr("data-player");
		var cid=$(this).parent().attr("data-column");
		var url="http://data.video.qq.com/fcgi-bin/list/comm_list?&otype=json&field="+pid+"&appid=100005&appkey=8144a07ca6b90bfb&filter="+cid;
		if(cid==2048){//NBA的接口和其他的不一样
			url="http://data.video.qq.com/fcgi-bin/list/comm_list?&otype=json&field="+pid+"&appid=100007&appkey=88f84517bb5eee09";
		}
		var eventTar=$(this);
		 $.ajax({
			url:url,
			dataType:'jsonp',
			success:function(data){
			  if(data.returncode!=0)
				return;
			  var match_data={};
			  match_data.matches=[];
			  var vidlist="";
			  for(var i=0;i<data.data.length;i++){
					vidlist+=data.data[i].video_id;
					vidlist+=",";
			  }
			  if(data.data.length>0);
				vidlist=vidlist.substring(0,vidlist.length-1);
			 var url2="http://data.video.qq.com/fcgi-bin/data?tid=135&idlist="+vidlist+"&appid=10001007&appkey=e075742beb866145&otype=json";
			  $.ajax({
				url:url2,
				dataType:'jsonp',
				success:function(data){
				  if(data.errorno!=0)
					return;
				  var match_data={};
				  match_data.matches=[];
				  for(var i=0;i<data.results.length;i++){
					var item={};
					item.id=data.results[i].id;
					item.url=data.results[i].fields.url;
					item.title=data.results[i].fields.title;
					item.pic=data.results[i].fields.pic160x90;
					item.secondTitle=data.results[i].fields.second_title;
					item.count=viewCountFormat(data.results[i].fields.view_all_count);
					match_data.matches.push(item);
				  }
				  schedule_dom.find('li[data-player]').removeClass('current');
				  schedule_dom.find('li[data-teamid]').removeClass('current');
				  $(eventTar).addClass('current');
				  var _html = T.render('match_video_list_template',match_data);
				  video_dom.html(_html);
				  video_dom.fadeIn();
				}
			  });
			  
			}
		 });
	});

	$('.mod_video_album_section .btn_close_list').click(function(){
		$('.mod_video_album_section').hide();
	});
	$('.mod_schedule .mod_types').on('click', 'li', function(){
		$(this).addClass('current').siblings().removeClass('current');

	});

    //初始化
    //initCalendar(baseYear,baseMonth);
    //var initTarget=schedule_dom.find("ul.data-calendar li").eq(baseDay-1);
    //initTarget.addClass("current");
    //initTarget.trigger('click');

    function initTeamList(competition_id) {
        var url = 'http://sportswebapi.qq.com/sportsVideo/team?teamId=allTeams&competitionId=' + competition_id;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function (data) {
                var team_data = {};
                team_data.teams = data[1];
                var _html = T.render('mod_team_list_template', team_data);
                schedule_dom.find("ul.team_list").html(_html);
                schedule_dom.find("ul.team_spread_list").html(_html);
                var initTarget = schedule_dom.find("ul.team_list li").eq(0);
                initTarget.addClass("current");
                initTarget.trigger('click');
            }
        });
    }

    function initPlayerList(competition_id) {
        return;
        var url = 'http://sportswebapi.qq.com/sportsVideo/team?teamId=allTeams&competitionId=' + competition_id;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function (data) {
                var team_data = {};
                team_data.teams = data[1];
                var _html = T.render('mod_team_list_template', team_data);
                tab_target_dom.html(_html);
            }
        });
    }

    //获得一个月的天数
    function DayNumOfMonth(Year, Month) {
        var d = new Date(Year, Month, 0);
        return d.getDate();
    }

    //播放量字符串转换
    function viewCountFormat(str) {
        var count = parseInt(str, 10);
        var result = "";
        if (count > 10000) {
            result += Math.round(count / 10000);
            result += "万";
        }
        else {
            result = str;
        }
        return result;
    }


})();/*  |xGv00|06ae0bb4f03bc7cc33480fe285d4240f */