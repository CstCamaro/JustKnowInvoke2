var click_year, click_month, click_date;

var calendar_list = "";
var calendar_list_position = 10;
var big_begin = 10;
var big_end = 32;
var latest_date = "2015-06-17";

var loading = true;

var is_game = true;

var cover_loaded = 0;
var game_num = 12;

// 是否有球员窗口弹出
var player_window_showing = false;
var player_window_hover = false;

//根据日期获取星期几

function convertDateToDay(date) {
    var _date = date.replace(/-/g, '\/'),
        num = new Date(_date).getDay(),
        txt = '';
    switch (num) {
        case 1:
            txt = '星期一';
            break;
        case 2:
            txt = '星期二';
            break;
        case 3:
            txt = '星期三';
            break;
        case 4:
            txt = '星期四';
            break;
        case 5:
            txt = '星期五';
            break;
        case 6:
            txt = '星期六';
            break;
        case 0:
            txt = '星期日';
            break;
    }
    return txt;
}

//获取最新的日期

function get_latest_date(result) {
    var today = new Date();
    var today_num = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    var distance = Infinity;

    for (var i = 0; i < result.data.data.length; i++) {
        var date_num = parseInt(result.data.data[i].date.split("-").join(''));
        var idistance = today_num - date_num;
        if (idistance >= 0 && idistance < distance) {
            distance = idistance;
            latest_date = result.data.data[i].date;
            calendar_list_position = i;
        }

        if (idistance < 0) {
            i--;
            big_begin = Math.floor(i / 9) * 9;
            return latest_date;
        }
    }
}

// 加载日历

function load_calendar_matrix(year, month) {
    //console.log("load_calendar_matrix",year,month);
    $(".matrix-content").empty();
    $(".matrix-content").append("<li>一</li>");
    $(".matrix-content").append("<li>二</li>");
    $(".matrix-content").append("<li>三</li>");
    $(".matrix-content").append("<li>四</li>");
    $(".matrix-content").append("<li>五</li>");
    $(".matrix-content").append("<li>六</li>");
    $(".matrix-content").append("<li>日</li>");
    month--; // 因为数组从0开始，月份-1
    var months = [];
    if ((year % 4 == 0) || (year % 400 == 0)) {
        months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 闰年
    } else {
        months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    var year_week = new Array();
    year_week["2015"] = 4;
    year_week["2014"] = 3;
    year_week["2013"] = 2;
    year_week["2012"] = 7;

    var before_days = 0;
    for (var i = 0; i < month; i++) {
        before_days += months[i]; // 1月1日到本月1日的天数
    }

    var firstday = (before_days + year_week[year]) % 7; // 计算本月1日是星期几
    if (firstday == 0) firstday = 7;

    var date_list = get_date_list();

    var last_month = (month + 11) % 12;
    for (var m = firstday - 1; m > 0; m--) {
        var day = months[last_month] - m + 1;
        //console.log("1:",year,month,i);
        if (has_game(year, month, day, date_list)) {
            $(".matrix-content").append('<li>' + day + '</li>');
        } else {
            $(".matrix-content").append('<li class="nogame">' + day + '</li>');
        }
    }

    for (var i = 1; i <= months[month]; i++) {
        //console.log("2:",year,month,i);

        if (has_game(year, month, i, date_list)) {
            $(".matrix-content").append('<li>' + i + '</li>');
        } else {
            $(".matrix-content").append('<li class="nogame">' + i + '</li>');
        }
    }

    for (var j = 1; j < (36 - months[month] - (firstday - 1)); j++) {
        // 在最后加入下个月的前几天
        //console.log("3:",year,month,i);

        if (has_game(year, month, j, date_list)) {
            $(".matrix-content").append('<li>' + j + '</li>');
        } else {
            $(".matrix-content").append('<li class="nogame">' + j + '</li>');
        }
    }

    var today = new Date();
    var today_li = today.getDate() + 8;
    //$(".matrix-content li:nth-child(" + today_li + ")").addClass("date-selected");

    $(".matrix-content li").on("click", function(e) {

        e.stopPropagation();
        if ($(this).hasClass("nogame")) {
            return false;
        }

        $(".matrix-content").children().removeClass("date-selected");
        $(this).addClass("date-selected");

        var select_day = $(this).html();



        $(".calendar-matrix").hide();

        var select_year = $(".matrix-year").html().match(/[1-9][0-9]*/g)[0];
        var select_month = $(".matrix-month").html().match(/[1-9][0-9]*/g)[0];

        var select_date = [];
        select_date[0] = select_year;
        select_date[1] = formatNum(select_month);
        select_date[2] = formatNum(select_day);



        $(".date-title span").html(select_date[0] + "年" + select_date[1] + "月" + select_date[2] + "日");

        load_game_list(select_date[0], select_date[1], select_date[2]);

        load_future_game(select_date, true);


    });

    $(".year-list li:nth-child(1)").addClass("date-selected");
    $(".month-list li:nth-child(1)").addClass("date-selected");
}


function load_calendar_list() {
    $.ajax({
        type: "get",
        async: true,
        url: "//matchweb.sports.qq.com/kbs/list?callback=gameList&columnId=100008&startTime=2016-10-28&endTime=2017-05-01&from=kbsweb",
        dataType: "jsonp",
        jsonpCallback: "gameList",
        success: function(result) {
            var _result = {
                "code": 0,
                "data": {
                    "today": '',
                    "data": []
                }
            };
            var today = new Date(),
                month = '';
            today.getMonth().length == 2 ? (month = today.getMonth()) : (month = '0' + (today.getMonth() + 1));
            var today_num = today.getFullYear() + '-' + month + '-' + today.getDate();
            _result.data.today = today_num;
            var _tempObj = result.data,
                _cbaDateNumTemp = [],
                ind = 0;
            for (var i in _tempObj) {
                _cbaDateNumTemp.push(_tempObj[i].length);
                _dayTemp = convertDateToDay(i);
                _result.data.data[ind] = {};
                _result.data.data[ind].date = i;
                _result.data.data[ind].number = _tempObj[i].length;
                _result.data.data[ind].weekday = _dayTemp;
                ind++;
            }

            //console.log(_result);
            get_latest_date(_result);
            var position = 0;
            //console.log(big_begin);
            var _interval = _cbaDateNumTemp.length - big_begin;
            if (_interval < 10) {
                insert_big_calendar(_result, big_begin, _interval);
            } else {
                insert_big_calendar(_result, big_begin, 10);
            }

            calendar_list = _result;

            // calendar-list左右移动
            $(".calendar-next").on("click", function() {
                big_begin += 10;
                if (big_begin > _result.data.data.length - 1) {
                    big_begin = _result.data.data.length - 10;
                }
                insert_big_calendar(_result, big_begin, 10);
            });

            $(".calendar-prev").on("click", function() {
                big_begin -= 10;
                if (big_begin < 0) {
                    big_begin = 0;
                }
                insert_big_calendar(_result, big_begin, 10);
            });

            var lastest_arr = latest_date.split('-');

            // 左上角日期和场次
            var tab_date_str = lastest_arr[0] + "年" + lastest_arr[1] + "月" + lastest_arr[2] + "日";
            $(".tab-date").html(tab_date_str);
            $(".tab-gamenum").html("比赛视频");

            load_game_list(lastest_arr[0], lastest_arr[1], lastest_arr[2]);
            load_future_game(lastest_arr);

        },
        error: function() {
            //console.log('load_calendar_list fail');
        }
    });
}

function load_small_calendar_list() {
    $.ajax({
        type: "get",
        async: true,
        url: "//matchweb.sports.qq.com/kbs/calendar?callback=calendar&columnId=208&_=1448444000786&from=kbsweb",
        dataType: "jsonp",
        jsonpCallback: "lsclcallback",
        success: function(result) {
            //console.log("load_calendar_list",result);
            var position = 0;
            insert_small_calendar(result, 0, 6);
            //$("#calendar_list_storage").html(JSON.stringify(result));
            // calendar-list左右移动
            $(".calendar-next").hover(function() {
                $(this).attr("src", "//mat1.gtimg.com/sports/test/john/nbagame/next_hover.jpg");
            }, function() {
                $(this).attr("src", "//mat1.gtimg.com/sports/test/john/nbagame/next.jpg");
            });
            $(".calendar-next").on("click", function() {
                position += 6;
                if (position > 119) {
                    position = 114;
                }
                insert_small_calendar(result, position, 6);
            });
            $(".calendar-prev").hover(function() {
                $(this).attr("src", "//mat1.gtimg.com/sports/test/john/nbagame/prev_hover.jpg");
            }, function() {
                $(this).attr("src", "//mat1.gtimg.com/sports/test/john/nbagame/prev.jpg");
            });
            $(".calendar-prev").on("click", function() {
                position -= 6;
                if (position < 0) {
                    position = 0;
                }
                insert_small_calendar(result, position, 6);
            });
        },
        error: function() {
            //console.log('load_small_calendar_list fail');
        }
    });
}

function insert_big_calendar(result, begin, num) {
    $(".calendar-list").empty();
    var end = begin + num;
    big_begin = begin;
    big_end = end;
    for (var i = begin; i < end; i++) {
        if (result.data.data[i] == undefined) {
            break;
        }
        var date = result.data.data[i].date.toString().substring(8, 10);
        var month = result.data.data[i].date.substring(5, 7);
        var weekday = "周" + result.data.data[i].weekday.charAt(2);
        var num = result.data.data[i].number + "场";
        if (result.data.data[i].date == latest_date) {
            var li_str = '<li class="today" data-date="' + result.data.data[i].date +
                '" data-position="' + i +
                '"><p>' + month + '.' + date + '</p>' +
                '<p>' + weekday + '</p>' +
                '<p>' + num + '</p></li>';
            $(".calendar-list").append(li_str);
            calendar_list_position = i;
        } else {
            var li_str = '<li data-date="' + result.data.data[i].date +
                '" data-position="' + i +
                '"><p>' + month + '.' + date + '</p>' +
                '<p>' + weekday + '</p>' +
                '<p>' + num + '</p></li>';
            $(".calendar-list").append(li_str);
        }

    }


    $(".calendar-list li").hover(function() {
        $(this).addClass("calendar-list-hover");
    }, function() {
        $(this).removeClass("calendar-list-hover");
    });
    $(".calendar-list li").on("click", function() {
        $(".calendar-list li").removeClass("today");
        $(this).removeClass("calendar-list-hover");
        $(this).addClass("today");
        calendar_list_position = $(this).attr("data-position");
        var select_date = $(this).attr("data-date").split('-');
        //console.log(select_date);
        $(".tab-date").html(select_date[0] + "年" + select_date[1] + "月" + select_date[2] + "日");
        $(".date-title span").html(select_date[0] + "年" + select_date[1] + "月" + select_date[2] + "日");

        //console.log('is_future',is_future(select_date));
        if (is_future(select_date)) {
            load_game_list(select_date[0], select_date[1], select_date[2]);
            //console.log(select_date);
            load_future_game(select_date);
        } else {
            load_game_list(select_date[0], select_date[1], select_date[2]);
            load_future_game(select_date);
        }

    });
}

function insert_small_calendar(result, begin, num) {
    $(".small-calendar-list").empty();

    var end = begin + num;
    for (var i = begin; i < end; i++) {
        var date = result.data.data[i].date.substring(8, 10);
        var weekday = "周" + result.data.data[i].weekday.charAt(2);
        var num = result.data.data[i].number + "场";
        var li_str = '<li data-date="' + result.data.data[i].date +
            '" data-num="' + num +
            '" data-position="' + i +
            '"><p>' + date + '</p>' +
            '<p>' + weekday + '</p>' +
            '</li>';
        $(".small-calendar-list").append(li_str);
    }

    $(".small-calendar-list li").hover(function() {
        $(this).addClass("calendar-list-hover");
    }, function() {
        $(this).removeClass("calendar-list-hover");
    });
    $(".small-calendar-list li").on("click", function() {
        var num = $(this).attr("data-num");
        $(this).append('<p>' + num + '</p>');

        $(".small-calendar-list li").removeClass("today");
        $(this).removeClass("calendar-list-hover");
        $(this).addClass("today");

        calendar_list_position = $(this).attr("data-position");

        var select_date = $(this).attr("data-date").split('-');
        $(".tab-date").html(select_date[0] + "年" + select_date[1] + "月" + select_date[2] + "日");
        if (is_future(select_date)) {
            load_future_game(select_date);
        } else {
            load_game_list(select_date[0], select_date[1], select_date[2]);
        }
    });
}


//展示赛事集锦

function load_game_list(year, month, date) {
    //$(".tonglan-list").empty();
    //$(".game-list").empty();
    //$(".future-game-list").empty();
    $(".future-date").show();
    if (month.toString().length < 2)
        month = "0" + month;
    if (date.toString().length < 2)
        date = "0" + date;

    $.ajax({
        url: "//mat1.gtimg.com/apps/hpage2/match_video_" + year + "-" + month + "-" + date + ".json",
        dataType: "script"
    });

    window.getMatchVideo = function(_data) {
        //console.log(_data.data);
        if (_data.data.length == 0) {
            $(".tonglan").hide();
            return;
        }
        $(".tonglan").show();
        var _tempData = {
            results: []
        };
        //(_data.data.length>10)&&(_data.data.length =10);
        _tempData.results = _data.data;
        //console.log(_tempData);
        for (var i = 0; i < _tempData.results.length; i++) {
            var temp = _tempData.results[i].duration;
            //console.log(temp);
            _tempData.results[i].dura = temp.split(":")[1] + "'" + temp.split(":")[2];
        }
        //console.log(_tempData);
        $(".tonglan-list").html(template("tpl-cba-news", _tempData));
        $(".video-item").hover(function() {
            $(this).find('.mengban-hover').show();
        }, function() {
            $(this).find('.mengban-hover').hide();
        });
    };
}



/*(function($){
    var getNewsList = function(){
        $.getScript("http://v.qq.com/commurl/json/cba/jijin.json", function(){
            var vids = [];
            if(QZOutputJson && QZOutputJson.data.length > 0){
                for(var i = 0, len = QZOutputJson.data.length; i < len; i++){
                    vids.push(QZOutputJson.data[i].video_id);
                }
            }
            vids.length = 10;
            $.ajax({
                url: "http://data.video.qq.com/fcgi-bin/data?tid=146&idlist=" + vids.join() + "&appid=10001009&appkey=c5a3e1529a7ba805&otype=json",
                dataType: "jsonp",
                success: function(data){
                    console.log(data)
                    $(".tonglan-list").html(template("tpl-cba-news", data));
                }
            });
            return vids;
        });
    }();
})(jQuery);*/

var marsData;

function formatNum(num) {

    return parseInt(num) < 10 ? '0' + num : num;

}


function load_future_game(date_arr, flag) {

    //console.log(date_arr);
    var today = new Date();
    var lastDay = '';
    var todayStr = today.getFullYear() + '-' + formatNum(today.getMonth() + 1) + '-' + formatNum(today.getDate());
    var timeArr = [];
    timeArr[0] = today.getFullYear();
    timeArr[1] = formatNum(today.getMonth() + 1);
    timeArr[2] = formatNum(today.getDate());
    var todayStr = timeArr.join('-'),
        startTime = '';
    lastDay = date_arr.join('-');

    //console.log(formatNum(today.getMonth() + 1));
    //console.log('load_future_game',arguments);


    if (!(is_today(date_arr) || is_future(date_arr))) {
        $('.future-date').hide();
    }


    $(".future-game-list").empty();
    $(".future-date").show();
    if (loading) {
        $(".date-title").find("span").html(date_arr[1] + '月' + date_arr[2] + '日');
        startTime = date_arr.join('');
        loading = false;
    } else {
        $(".date-title").find("span").html(date_arr[1] + '月' + date_arr[2] + '日');
        startTime = date_arr.join('');
        todayStr = date_arr.join('-');
    }

    if (!$(".future-game-list").empty()) {
        $(".date-title").hide();
    }

    $.ajax({
        type: "get",
        async: true,
        url: "//matchweb.sports.qq.com/kbs/list?callback=gameList&columnId=100008&startTime=" + startTime + "&endTime=" + startTime + "&from=kbsweb",
        dataType: "jsonp",
        jsonpCallback: "gameList",
        success: function(result) {
            marsData = result;
            //console.log(result);
            if (result.data[lastDay] == undefined) {
                $(".future-date").hide();
                return;
            }
            for (var i = 0, l = result.data[lastDay].length; i < l; i++) {
                var game_obj = result.data[lastDay][i];
                var my_startTime = pubtime_format(game_obj.startTime);
                var game_li = "";
                //console.log(game_obj.matchPeriod);
                if (game_obj.matchPeriod == "0") {
                    game_li = '<li><div class="startTime">' + my_startTime + '</div>' + '<img class="homeBadge" src="' +
                        game_obj.leftBadge + '"/>' + '<a class="kbs" href="//sports.qq.com/kbsweb/game.htm?mid=' +
                        game_obj.mid + '" target="_blank"><div class="homeName">' + game_obj.leftName + '</div>' +
                        '<div class="middle-gray"/>' + '<div class="awayName">' + game_obj.rightName + '</div></a>' +
                        '<img class="awayBadge" src="' + game_obj.rightBadge + '"/>' +
                        '<a target="_blank" href="//sports.qq.com/kbsweb/game.htm?mid=' + game_obj.mid +
                        '"><img data-subscribe="no" class="subscribe" src="//mat1.gtimg.com/sports/test/john/nbagame/subscribe.jpg"/></a></li>';
                } else if (game_obj.matchPeriod == "1") {
                    var mid_pic = "//mat1.gtimg.com/sports/test/john/nbagame/live.jpg";

                    game_li = '<li><div class="startTime">' + my_startTime + '</div>' + '<img class="homeBadge" src="' +
                        game_obj.leftBadge + '"/>' + '<a class="kbs" href="//sports.qq.com/kbsweb/game.htm?mid=' +
                        game_obj.mid + '" target="_blank"><div class="homeName" style="color:#f23c62">' + game_obj.leftName +
                        '</div>' + '<div class="homeGoal" style="color:#f23c62">' + game_obj.leftGoal + '</div>' +
                        '<div class="middle-red"/>' + '<div class="awayGoal" style="color:#f23c62">' + game_obj.rightGoal +
                        '</div>' + '<div class="awayName" style="color:#f23c62">' + game_obj.rightName + '</div></a>' +
                        '<img class="awayBadge" src="' + game_obj.rightBadge + '"/>' +
                        '<a target="_blank" href="//sports.qq.com/kbsweb/game.htm?mid=' + game_obj.mid +
                        '"><b class="live">立即观看</b></a></li>';
                } else if (game_obj.matchPeriod == "2") {
                    game_li = '<li><div class="startTime">' + my_startTime + '</div>' + '<img class="homeBadge" src="' +
                        game_obj.leftBadge + '"/>' + '<a class="kbs" href="//sports.qq.com/kbsweb/game.htm?mid=' +
                        game_obj.mid + '" target="_blank"><div class="homeName" style="color:#308ED9">' + game_obj.leftName +
                        '</div>' + '<div class="homeGoal" style="color:#308ED9">' + game_obj.leftGoal + '</div>' +
                        '<div class="middle-blue"/>' + '<div class="awayGoal" style="color:#308ED9">' + game_obj.rightGoal +
                        '</div>' + '<div class="awayName" style="color:#308ED9">' + game_obj.rightName + '</div></a>' +
                        '<img class="awayBadge" src="' + game_obj.rightBadge + '"/>' +
                        '<a target="_blank" href="//sports.qq.com/kbsweb/game.htm?mid=' + game_obj.mid +
                        '"><b class="jijin">视频集锦</b></a></li>';
                }

                $(".future-game-list").append(game_li);

            }


            $(".future-game-list li").hover(function() {
                $(this).css("background", "#fafafa");
            }, function() {
                $(this).css("background", "#ffffff");
            });
        },
        error: function() {
            //console.log('load_game_list fail');
        }
    });
}

function gameList(result) {

}

function lfgcallback(result) {}
// 获取有比赛的日期的列表

function get_date_list() {
    //console.log("get_date_list",calendar_list);
    var date_list = [];

    if (calendar_list == "") // 容错
    {
        date_list = ["2015-05-16", "2015-05-18"];
        return date_list;
    }

    var result = calendar_list;

    //console.log(result);

    for (var i = 0; i < result.data.data.length; i++) {
        date_list.push(result.data.data[i].date);
    }

    return date_list;
}

// 判断某一天是否有比赛

function has_game_new(year, month, day, date_list) {
    var temp = [];
    temp[0] = year;
    temp[1] = month;
    temp[2] = day;
    var flag = false;
    var dateStr = temp.join('-');
    for (var i = 0; i < date_list.length; i++) {
        if (date_list[i] == dateStr) {
            flag = true;
            break;
        }
    }
    return flag;
}

function has_game(year, month, day, date_list) {
    if (calendar_list == "") {
        return true;
    }

    var today = new Date();
    if (year > parseInt(today.getFullYear())) {
        //console.log("has_game",year);
        return false;
    } else if (year == parseInt(today.getFullYear())) {
        if (month > parseInt(today.getMonth())) {
            //console.log("has_game",month);
            return false;
        } else if (day > parseInt("has_game", today.getDate())) {
            //console.log(day);
            return false;
        }
    }

    month++;
    if (month < 10)
        month = '0' + month;
    if (day < 10)
        day = '0' + day;

    var date = year + '-' + month + '-' + day;

    for (var i = 0; i < date_list.length; i++) {
        if (date == date_list[i]) {
            return true;
        }
    }

    return false;
}

function get_touxiang(kbs_id) {
    var picurl = "";
    $.each(window["_QQNBA_PLAYER_IDS"], function(id, obj) {
        //console.log("get_touxiang",obj.ch_name);
        if (kbs_id == obj.kbs_id) {
            picurl = "//nbachina.qq.com/media/img/players/head/230x185/" + obj.nbachina_num_id + ".png";
            //console.log("get_touxiang",picurl);
        }
    });

    return picurl;
}

function get_player_page(kbs_id) {
    var url = ""
    $.each(window["_QQNBA_PLAYER_IDS"], function(id, obj) {
        if (kbs_id == obj.kbs_id) {
            url = "//sports.qq.com/nba/vids.htm?type=player&id=" + id;
            //console.log("get_player_page",url);
        }
    });

    return url;
}

function get_team_page(kbs_id) {
    var url = ""
    $.each(window["_QQNBA_TEAM_IDS"], function(id, obj) {
        if (kbs_id == obj.kbs_id) {
            url = "//sports.qq.com/nba/vids.htm?type=team&id=" + id;
            //console.log("get_player_page",url);
        }
    });

    return url;
}

function get_team_icon(kbs_id) {
    var url = "http://f.seals.qq.com/filestore/10006/da/64/87/0/sportlogo/team_2_" + kbs_id + ".png";

    return url;
}

function get_cover(img_this, matchId, kbs_id) {}

function sleep(time) {
    for (var i = 0; i < time; i++);
}

function pubtime_format(pubtime) {
    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") ==
        "MSIE7.0") {
        return "10:00";
    }

    var date_time = pubtime.split(" ");
    var date_arr = date_time[0].split("-");
    var time_arr = date_time[1].split(":");

    var my_pubtime = time_arr[0] + ":" + time_arr[1];

    if (parseInt(date_arr[0]) < 2013) // 2013年以前的过滤掉
    {
        return "";
    } else {
        return my_pubtime;
    }
}

/*
function duration_format(duration)
{
    // if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") 
    // {
    //  return "02:00";
    // }
    if(duration == undefined)
    {
        return "02:00";
    }

    var my_duration = "02:00";

    if(duration.length < 5)
    {
        var fen = Math.floor(parseInt(duration)/60);
        if(fen < 10)
            fen = "0" + fen;

        var miao = parseInt(duration)`;
        if(miao < 10)
            miao = "0" + miao;
        
        my_duration = fen + ":" + miao;
        return my_duration;
    }
    else
    {
        var time_arr = duration.split(":");
        my_duration = time_arr[1] + ":" + time_arr[2];
        return my_duration;
    }
    
}
*/

/*function view_format(view)
{
    //if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") 
    if(view == undefined)
    {
        return "10万";
    } 

    if (view > 10000)
    {
        var my_view = parseInt(view / 10000) + "万";
        return my_view;
    }
    else
    {
        return view;
    }
}*/

function is_future(date_arr) {
    var today = new Date();

    if (parseInt(today.getFullYear()) < parseInt(date_arr[0])) {
        return true;
    } else if (parseInt(today.getFullYear()) == parseInt(date_arr[0]) && parseInt(today.getMonth() + 1) < parseInt(
            date_arr[1])) {
        return true;
    } else if (parseInt(today.getFullYear()) == parseInt(date_arr[0]) && parseInt(today.getMonth() + 1) == parseInt(
            date_arr[1]) && parseInt(today.getDate()) <= parseInt(date_arr[2])) {
        return true;
    } else {
        return false;
    }
}

function is_today(date_arr) {
    var today = new Date();

    if (today.getFullYear() == date_arr[0] && (today.getMonth() + 1) == date_arr[1] && today.getDate() == date_arr[3]) {
        return true;
    } else {
        return false;
    }
}




$(function() {
    $(".game-tab").on("click", function() {
        $(".team-tab").removeClass("tab-selected");
        $(".game-tab").addClass("tab-selected");
        $(".game-list").show();
        $(".tonglan").show();
        $(".unions").hide();
        $(".waterfall").hide();
        $(".calendar,.tab-date,.tab-gamenum,.yesterday,.tomorrow").show();
        $(".zhuanji").hide();

        if ($(".future-game-list li").length > 0) {
            $(".future-date").show();
        }

        is_game = true;

        if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") ==
            "MSIE7.0") {
            $(".tcopyright").show();
        }
    });
    $(".team-tab").on("click", function() {
        $(".game-tab").removeClass("tab-selected");
        $(".team-tab").addClass("tab-selected");
        $(".unions").show();
        $(".game-list").hide();
        $(".tonglan").hide();
        $(".waterfall").show();
        $(".calendar,.tab-date,.tab-gamenum,.yesterday,.tomorrow").hide();
        $(".zhuanji").show();
        // $(".future-date").hide();

        is_game = false;

        if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") ==
            "MSIE7.0") {
            $(".tcopyright").hide();
        }

        try {
            ExposureBoss(null, "VM_team_cid_expo");
        } catch (e) {}
        try {
            ExposureBoss(null, "VM_team_vid_expo");
        } catch (e) {}

    });

    var today = new Date();
    var tab_date_str = today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日"
    //$(".tab-date").html(tab_date_str);
    $(".matrix-year").html(today.getFullYear() +
        "年<img src='//mat1.gtimg.com/sports/test/john/nbagame/list.png'/>");
    $(".matrix-month").html((today.getMonth() + 1) +
        "月<img src='//mat1.gtimg.com/sports/test/john/nbagame/list.png'/>");

    // 加载时间列表
    load_calendar_list();

    load_small_calendar_list();

    $(".calendar-more").on("click", function(e) {
        e.stopPropagation();
        $(".calendar-matrix").slideToggle();
    });
    $(document).click(function(event) {
        $(".calendar-matrix").hide();
        $(".player-window").hide();
    });

    // 加载右侧的日历牌
    setTimeout(function() {
        load_calendar_matrix(today.getFullYear(), today.getMonth() + 1);
    }, 1000);


    $(".matrix-year").on("click", function(e) {
        e.stopPropagation();
        $(".year-list").children().removeClass("date-selected");
        $(".year-list").toggle();
    });

    $(".matrix-month").on("click", function(e) {
        e.stopPropagation();
        $(".month-list").children().removeClass("date-selected");
        $(".month-list").toggle();
    });

    $(".year-list li").on("click", function(e) {
        e.stopPropagation();
        $(".year-list").children().removeClass("date-selected");
        $(this).addClass("date-selected");
        $(".matrix-year").html($(this).html() + "<img src='//mat1.gtimg.com/sports/test/john/nbagame/list.png'/>");
        $(".year-list").hide();
        var ind = +$(".matrix-month").text().replace(/月/, '') - 1;
        $(".month-list li").eq(ind).trigger('click');
    });

    $(".year-list li").hover(function() {
        $(this).addClass("date-selected");
    }, function() {
        $(this).removeClass("date-selected");
    });

    $(".month-list li").on("click", function(e) {
        e.stopPropagation();
        $(".month-list").children().removeClass("date-selected");
        $(this).addClass("date-selected");

        var month_html = $(this).html();
        $(".matrix-month").html(month_html + "<img src='//mat1.gtimg.com/sports/test/john/nbagame/list.png'/>");

        var year_html = $(".matrix-year").html();

        var select_year = year_html.match(/[1-9][0-9]*/g)[0];
        var select_month = month_html.match(/[1-9][0-9]*/g)[0];


        //if(select_year == 2015)select_month+=1;
        $(".month-list").hide();

        load_calendar_matrix(select_year, select_month);
    });
    $(".month-list li").hover(function() {
        $(this).addClass("date-selected");
    }, function() {
        $(this).removeClass("date-selected");
    });

    // 加载赛事内容列表
    click_year = today.getFullYear();
    click_month = today.getMonth() + 1;
    click_date = today.getDate();
    //load_game_list(today.getFullYear(), today.getMonth()+1, today.getDate());
    //load_game_list(click_year, click_month, click_date);
    // var today_arr = [];
    //    today_arr[0] = today.getFullYear();
    //    today_arr[1] = today.getMonth()+1;
    //    if(parseInt(today_arr[1]) < 10)
    //     today_arr[1] = "0" + today_arr[1];
    //    today_arr[2] = today.getDate();
    //    if(parseInt(today_arr[2]) < 10)
    //     today_arr[2] = "0" + today_arr[2];
    //    load_future_game(today_arr);

    var months = [];
    if ((click_year % 4 == 0) || (click_year % 400 == 0)) {
        months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 闰年
    } else {
        months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    $(".yesterday").hover(function() {
        $(this).attr("src", "//mat1.gtimg.com/sports/cbasp/images/yesterday_hover.jpg");
    }, function() {
        $(this).attr("src", "//mat1.gtimg.com/sports/cbasp/images/yesterday.jpg");
    });
    $(".yesterday").on("click", function() {
        setTimeout(function() {
            calendar_list_position--;
            //console.log("calendar_list_position",calendar_list_position);
            $(".tomorrow").show();

            if (big_begin <= calendar_list_position && calendar_list_position < big_end) {
                $(".calendar-list li").removeClass("today");
                $("li[data-position='" + calendar_list_position + "']").addClass("today");
            } else if (calendar_list_position < big_begin) {
                big_begin -= 10;
                if (big_begin < 0) {
                    big_begin = 0;
                }
                insert_big_calendar(calendar_list, big_begin, 10);

                $(".calendar-list li").removeClass("today");
                $("li[data-position='" + calendar_list_position + "']").addClass("today");
            } else if (calendar_list_position >= big_end) {
                big_begin += 10;
                if (big_begin > 119) {
                    big_begin = 104;
                }
                insert_big_calendar(calendar_list, big_begin, 10);

                $(".calendar-list li").removeClass("today");
                $("li[data-position='" + calendar_list_position + "']").addClass("today");
            }

            var date_list = get_date_list();
            var date_arr = date_list[calendar_list_position].split("-");
            $(".tab-date").html(date_arr[0] + "年" + date_arr[1] + "月" + date_arr[2] + "日");
            load_game_list(date_arr[0], date_arr[1], date_arr[2]);
            load_future_game(date_arr);
        }, 1000);
    });
    $(".tomorrow").hover(function() {
        $(this).attr("src", "//mat1.gtimg.com/sports/cbasp/images/tomorrow_hover.jpg");
    }, function() {
        $(this).attr("src", "//mat1.gtimg.com/sports/cbasp/images/tomorrow.jpg");
    });
    $(".tomorrow").on("click", function() {
        setTimeout(function() {
            calendar_list_position++;

            var date_list = get_date_list();

            var date_arr = date_list[calendar_list_position].split("-");
            var tomorrow_arr = date_list[calendar_list_position + 1].split("-");

            if (is_future(tomorrow_arr)) {
                $(".tomorrow").hide();
            }

            $(".tab-date").html(date_arr[0] + "年" + date_arr[1] + "月" + date_arr[2] + "日");

            if (big_begin <= calendar_list_position && calendar_list_position < big_end) {
                $(".calendar-list li").removeClass("today");
                $("li[data-position='" + calendar_list_position + "']").addClass("today");
            } else if (calendar_list_position < big_begin) {
                big_begin -= 10;
                if (big_begin < 0) {
                    big_begin = 0;
                }
                insert_big_calendar(calendar_list, big_begin, 10);

                $(".calendar-list li").removeClass("today");
                $("li[data-position='" + calendar_list_position + "']").addClass("today");
            } else if (calendar_list_position >= big_end) {
                big_begin += 10;
                if (big_begin > 119) {
                    big_begin = 104;
                }
                insert_big_calendar(calendar_list, big_begin, 10);

                $(".calendar-list li").removeClass("today");
                $("li[data-position='" + calendar_list_position + "']").addClass("today");
            }

            load_game_list(date_arr[0], date_arr[1], date_arr[2]);
            load_future_game(date_arr);
        }, 1000);
    });

    setTimeout(function() {
        $('.future-game-list li:nth-child(even)').addClass('edit');
    }, 150)
});







/*  |xGv00|b238d173b105ee74d72dab37b37c3258 */