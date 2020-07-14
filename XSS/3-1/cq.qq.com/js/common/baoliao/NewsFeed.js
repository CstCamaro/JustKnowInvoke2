var domainpre = (function () { var _domainpre = window.location.host.split('.'); return _domainpre[_domainpre.length - 3]; })();
function add_content_success(content_id) {
    $.cookie("post_newsfeed", 1, {expires: 1/1440});
    if ($.isFunction(f_submit_success)) {
        f_submit_success(content_id);
    } else {
        alert("您的报料已提交，正等待处理..");
    }
}
// pager
if (typeof(pager_list) == 'undefined') {
	var pager_list = 15;
}
if (typeof(c_pager_list) == 'undefined') {
	var c_pager_list = 20;
}
// data
var verify_flag = false;
var load_new = function () {
    var url = "";
    if ($.cookie("post_newsfeed")) {
        var rand = new Date().getMinutes();
        url = "http://api."+domainpre+".qq.com/baoliao/api.php?action=get_content_list_new&feed_id=" + feed_id + "&r=" + rand;
    } else {
        url = "http://api."+domainpre+".qq.com/baoliao/api.php?action=get_content_list_new&feed_id=" + feed_id;
    }
    $.getScript2(url,
        function() {
            if (data_new != null && data_new.status == 1) {
                var result = TrimPath.processDOMTemplate("feed_new_template", data_new.content);
                $("#feed_new").html(result);
            }
        }
    );
};
var load_list = function() {
    var url = "";
    if ($.cookie("post_newsfeed")) {
        var rand = new Date().getMinutes();
        url = "http://api."+domainpre+".qq.com/baoliao/api.php?action=get_content_list&feed_id=" + feed_id + "&r=" + rand;
    } else {
        url = "http://api."+domainpre+".qq.com/baoliao/api.php?action=get_content_list&feed_id=" + feed_id;
    }
    $.getScript2(url,
        function() {
            if (data_list != null) {
                var perpage = pager_list;
                var end = perpage > (data_list.total -1) ? (data_list.total -1) : perpage;
                var data_new = [];
                data_new['total'] = data_list.total;
                data_new['content_list'] = getArrPart(data_list.content_list, end);
                var id = [];
                for(var i = 0;i < end; i++){
                    id[i] = data_new['content_list'][i].content_id;
                }

                var result = TrimPath.processDOMTemplate("feed_template", data_new);
                document.getElementById("feed_list").innerHTML = result;
                var countpage = Math.ceil(data_list.total / perpage);
                $("#feed_list .turnPage").html(page(1, countpage, 'javascript:pager(.page.)'));
                $.getScript2("http://api."+domainpre+".qq.com/baoliao/api.php?action=get_content_list_extra&id=" + id.join(','),
                    function() {
                        if (data_extra != null) {
                            for (var i = 0;i < data_extra.list.length; i++) {
                                $("span#reply_" + data_extra.list[i].content_id).text(data_extra.list[i].reply);
                                $("span#view_" + data_extra.list[i].content_id).text(data_extra.list[i].view);
								var tips=data_extra.list[i].reply_status.tips;
								var status = data_extra.list[i].reply_status.status;
								if (window.feed_config_UATit)
								{
									tips=feed_config_UATit[status];
								}
                                $("span#status_" + data_extra.list[i].content_id).text(tips);
                                if (data_extra.list[i].reply_status.status != 0) {
                                    $("span#status_" + data_extra.list[i].content_id).addClass("highlight");
                                }
                            }
                        }
                    }
                );
            }
        }
    );
};
var load_info = function () {
    $.getScript2("http://api."+domainpre+".qq.com/baoliao/api.php?action=get_content_info&content_id=" + content_id,
        function() {
            if (typeof(data_content) == 'undefined' || !data_content.content || !data_content.status == 2) {
                $("div.centerBox1").hide();
                $("div.centerBox2").hide();
                $("div.centerBox3").hide();
                $("div.fullBox").html("<span class=\"backLink\" ><a href=\"./index.html\">返回首页>></a></span><div style='padding:100px 0 100px 380px;color:red;font-weight:bold;background:url(./img/error.gif) no-repeat 300px center'>你查看的报料不存在</div>");
            } else if (data_content != null && data_content.status == 1) {
            	if (data_content.content.images && data_content.content.images.length > 0 && data_content.content.content.indexOf('<img') == -1) {
            		for(var i=0; i<data_content.content.images.length; i++) {
            			data_content.content.content += '<p align="center"><img src="'+data_content.content.images[i]+'" style="max-width:800px" /></p>';
            		}
            	}
                var result = TrimPath.processDOMTemplate("content_template", data_content.content);
                document.getElementById("feed_content").innerHTML = result;
                // lock
                var lock_flag = data_content.content.lock_status;
                $.getScript2("http://api."+domainpre+".qq.com/baoliao/api.php?action=get_feed_info&feed_id=" + feed_id,
                    function() {
                        if (data_feedinfo != null) {
                            var today = new Date();
                            var hour = today.getHours();
                            var minute = today.getMinutes();
                            if (lock_flag == 'lock' || (data_feedinfo.extra.auto_close == 'yes' && data_feedinfo.extra.post_reply == 'no' && ((hour >= data_feedinfo.extra.start_hour && minute >= data_feedinfo.extra.start_minute) || (hour <= data_feedinfo.extra.end_hour && minute <= data_feedinfo.extra.end_minute)))) {
                                $("#lock_tips").show();
                                $("#form_addReply").hide();
                            } else {
                                $("#lock_tips").hide();
                                $("#form_addReply").show();
                            }
                        }
                        update_view();
                    }
                );
            }
        }
    );
};
var load_reply = function () {
    $.getScript2("http://api."+domainpre+".qq.com/baoliao/api.php?action=get_reply_list&content_id=" + content_id,
        function () {
            if (typeof(data_reply) == 'undefined') {
                return ;
            }
            // get reply list
            if (document.getElementById("reply_list")) {
                var perpage = c_pager_list;
                var reply_list = [];
                if (data_reply.reply_list.reply_list != null) {
                    var end = perpage < data_reply.reply_list.reply_list.length ? perpage : data_reply.reply_list.reply_list.length;
                    reply_list = getArrPart(data_reply.reply_list.reply_list, end);

                }
                var data_new = [];
                data_new['total'] = data_reply.reply_list.total;
                data_new['reply_list'] = reply_list;

                var result = TrimPath.processDOMTemplate("reply_template", data_new);
                document.getElementById("reply_list").innerHTML = result;
                var countpage = Math.ceil(data_reply.reply_list.total / perpage);
                $("#reply_list .turnPage").html(page(1, countpage == 0 ? 1 : countpage, 'javascript:r_page(0, .page.)', true));
            }
            // get reply pro list
            if (document.getElementById("reply_pro_list")) {
                var perpage = c_pager_list;
                var reply_list = [];
                if (data_reply.reply_list2.reply_list != null) {
                    var end = perpage < data_reply.reply_list2.reply_list.length ? perpage : data_reply.reply_list2.reply_list.length;
                    reply_list = getArrPart(data_reply.reply_list2.reply_list, end);

                }
                var data_new = [];
                data_new['total'] = data_reply.reply_list.total;
                data_new['reply_list'] = reply_list;

                var result = TrimPath.processDOMTemplate("reply_pro_template", data_new);
                document.getElementById("reply_pro_list").innerHTML = result;
                var countpage = Math.ceil(data_reply.reply_list2.total / perpage);
                $("#reply_pro_list .turnPage").html(page(1, countpage == 0 ? 1 : countpage, 'javascript:r_page(1, .page.)'));
            }
        }
    );
};
var update_view = function () {
    // update view
    var view_src = "http://api."+domainpre+".qq.com/baoliao/api.php?action=update_content_view&content_id=" + content_id;
    $.getScript2(view_src, {},
        function() {
            if (typeof(data) == 'undefined') {
                return ;
            }
            if ($("#feed_content").html() == '') {
                $("#content_template h4 > span").after('<span>浏览：' + data.view + '</span><span>回复：' + data.reply + '</span>');
            } else {
                $("#feed_content h4 > span").after('<span>浏览：' + data.view + '</span><span>回复：' + data.reply + '</span>');
            }
    }, false);
};
$(document).ready(function() {
    if (typeof(feed_id) != 'undefined') {
        // get list && new
        if (document.getElementById("feed_list")) {
            if (window.location.search) {
                var page_id = window.location.search.slice(1);
                pager(parseInt(page_id));
            } else {
                load_list();
            }
        }
		if (document.getElementById("feed_new")) {
			load_new();
		}
        // post newsfeed
        if (document.getElementById("addNewsFeed")) {
            $.getScript2("http://api."+domainpre+".qq.com/baoliao/api.php?action=get_feed_info&feed_id=" + feed_id,
                function() {
                    if (data_feedinfo != null) {
                        var today = new Date();
                        var hour = today.getHours();
                        var minute = today.getMinutes();
                        if (data_feedinfo.extra.auto_close == 'yes' && ((hour >= data_feedinfo.extra.start_hour && minute >= data_feedinfo.extra.start_minute) || (hour <= data_feedinfo.extra.end_hour && minute <= data_feedinfo.extra.end_minute))) {
                            $("#close").show();
                        } else {
                            $("#form_addNewsFeed").show();
                        }
                    }
                }
            );
        }
        // submit
        $("#form_addNewsFeed").submit(function() {
            var flag = false;
            if (document.getElementById("f_username")) {
                if (document.getElementById("f_username").value == '') {
                    alert("称呼没有填写");
                    flag = false;
                    return false;
                }
                flag = true;
            }
            if (document.getElementById("f_title")) {
                if (document.getElementById("f_title").value == '') {
                    alert("报料标题没有填写");
                    flag = false;
                    return false;
                }
                flag = true;
            }
            if (document.getElementById("f_content")) {
                if (document.getElementById("f_content").value == '') {
                    alert("报料内容没有填写");
                    flag = false;
                    return false;
                }
                flag = true;
            }
            if (document.getElementById("f_verify")) {
                if (document.getElementById("f_verify").value == '') {
                    alert("验证码没有填写");
                    flag = false;
                    return false;
                }
                flag = true;
            }
            // login
            if (!GetUIN()) {
                flag = false;
                CreateLoginFrameWin();
                //changeImg();
                //$("#form_addNewsFeed #f_verify").val("");
                //$("#form_addNewsFeed input:submit").attr("disabled", false);
            } else {
                flag = true;
            }
            if (flag) {
                $("#form_addNewsFeed").attr("target", "add_iframe");
                $("#form_addNewsFeed input:submit").attr("disabled", true);
                return true;
            }
            return false;
        });
    }
    if (typeof(content_id) != 'undefined') {
        if (document.getElementById("feed_content")) {
            if (content_id.indexOf(',') == -1) {
                load_info();
                //update_view();
                load_reply();
            } else {
                var sp = content_id.split(',');
                content_id = sp[0];
                page_id = sp[1];
                load_info();
                r_page(0, parseInt(page_id));
                r_page(1, 1);
                //update_view();
            }
        }
        // submit
        $("#form_addReply").submit(function() {
            var flag = false;
            if (document.getElementById("r_content")) {
                if (document.getElementById("r_content").value == '') {
                    alert("解答内容没有填写");
                    flag = false;
                    return false;
                }
                flag = true;
            }
            if (document.getElementById("f_verify")) {
                if (document.getElementById("f_verify").value == '') {
                    alert("验证码没有填写");
                    flag = false;
                    return false;
                }
                flag = true;
            }
            // login
            if (!GetUIN()) {
                flag = false;
                CreateLoginFrameWin();
            } else {
                flag = true;
            }
            if (flag) {
                $("#form_addReply input:submit").attr("disabled", true);
                //$.post(
                T.PostData2(
                    "http://api."+domainpre+".qq.com/baoliao/api.php?action=add_reply",
                    {content_id: content_id, data: $("#form_addReply").serialize()},
                    function (RESULT) {
                        $("#form_addReply input:submit").attr("disabled", false);
                        if (RESULT.result == 'Verify_error') {
                            verify_error();
                        } else if (RESULT.result == 'Login_error') {
                            login_error();
                        } else if (RESULT.status == 1) {
                            var rand = new Date().getMinutes();
                            $.cookie("post_reply", RESULT.reply_status, {expires: 1/1440});
                            if (RESULT.reply_status == 1) {
                                $.getScript2("http://api."+domainpre+".qq.com/baoliao/api.php?action=get_reply_list&content_id=" + content_id + "&r=" + rand,
                                    function() {
                                        var perpage = c_pager_list;

                                        var reply_list = [];
                                        if (data_reply.reply_list.reply_list != null) {
                                            var end = perpage < data_reply.reply_list.reply_list.length ? perpage : data_reply.reply_list.reply_list.length;
                                            reply_list = getArrPart(data_reply.reply_list.reply_list,end);
                                        }

                                        var data_new = [];
                                        data_new['total'] = data_reply.reply_list.total;
                                        data_new['reply_list'] = reply_list;

                                        var result = TrimPath.processDOMTemplate("reply_template", data_new);
                                        document.getElementById("reply_list").innerHTML = result;
                                        var countpage = Math.ceil(data_reply.reply_list.total / perpage);
                                        $("#reply_list .turnPage").html(page(1, countpage, 'javascript:r_page(0, .page.)', true));
                                    }
                                );
                            } else if (RESULT.reply_status == 2) {
                                $.getScript2("http://api."+domainpre+".qq.com/baoliao/api.php?action=get_reply_list&content_id=" + content_id + "&r=" + rand,
                                    function() {
                                        var perpage = c_pager_list;
                                        var reply_list = [];
                                        if (data_reply.reply_list2.reply_list != null) {
                                            var end = perpage < data_reply.reply_list2.reply_list.length ? perpage : data_reply.reply_list2.reply_list.length;
                                            reply_list = getArrPart(data_reply.reply_list2.reply_list,end);
                                        }

                                        var data_new = [];
                                        data_new['total'] = data_reply.reply_list2.total;
                                        data_new['reply_list'] = reply_list;

                                        var result = TrimPath.processDOMTemplate("reply_pro_template", data_new);
                                        document.getElementById("reply_pro_list").innerHTML = result;
                                        var countpage = Math.ceil(data_reply.reply_list2.total / perpage);
                                        $("#reply_pro_list .turnPage").html(page(1, countpage, 'javascript:r_page(1, .page.)'));
                                    }
                                );
                            }
                            $("#form_addReply li.hidden").hide();
                            verify_flag = false;
                            $("#r_content").val("");
                            $("#f_total").text("2000");
                            $("#f_verify").val("");
                            if (typeof(r_submit_success) != 'undefined') {
                                if ($.isFunction(r_submit_success)) {
                                    r_submit_success.apply();
                                }
                            } else {
                                alert("您的解答已提交，感谢您的参与");
                            }
                        } else {
							if(RESULT.status == 102) alert("报料台关闭中，不能进行回复操作");
                            else alert("您的解答提交失败，请重试");
                        }
                    },
                    function() {
                        CreateLoginFrameWin();
                        changeImg();
                    }
                );
            }
            return false;
        });
    }
});
function pager(page_num) {
    if (typeof(feed_id) == 'undefined') {
        alert("参数设置错误");
    } else {
        var url = "";
        if ($.cookie("post_newsfeed")) {
            //var rand = new Date().getMinutes();
            //if (page_num <= 5) {
            //    url = "http://api."+domainpre+".qq.com/baoliao/jsdata/baoliao_content_list_" + feed_id + ".js?" + rand;
            //} else {
                url = "http://api."+domainpre+".qq.com/baoliao/api.php?action=get_content_list&feed_id=" + feed_id + "&page=" + page_num;
            //}
        } else {
            //if (page_num <= 5) {
            //    url = "http://api."+domainpre+".qq.com/baoliao/jsdata/baoliao_content_list_" + feed_id + ".js";
            //} else {
                url = "http://api."+domainpre+".qq.com/baoliao/api.php?action=get_content_list&feed_id=" + feed_id + "&page=" + page_num;
            //}
        }
        $.getScript2(
            url,
            function() {
                if (data_list != null) {
                    var perpage = pager_list;
                    var start = 0;//page_num <= 5 ? perpage * (page_num - 1) : 0;
                    var end = start + perpage;
                    var length = data_list.content_list.length;
                    end = end < length ? end : length;

                    var data_new = [];
                    var cnt = end - start;
                    data_new['total'] = data_list.total;
                    data_new['content_list'] = getArrPart(data_list.content_list, cnt, start);
                    var id = [];
                    for(var i = 0;i < cnt; i++){
                        id[i] = data_new['content_list'][i].content_id;
                    }

                    var result = TrimPath.processDOMTemplate("feed_template", data_new);
                    document.getElementById("feed_list").innerHTML = result;
                    var countpage = Math.ceil(data_list.total / perpage);
                    $("#feed_list .turnPage").html(page(page_num, countpage, 'javascript:pager(.page.)'));
                    $.getScript2("http://api."+domainpre+".qq.com/baoliao/api.php?action=get_content_list_extra&id=" + id.join(','),
                        function() {
                            if (data_extra != null) {
                                for (var i = 0;i < data_extra.list.length; i++) {
                                    $("span#reply_" + data_extra.list[i].content_id).text(data_extra.list[i].reply);
                                    $("span#view_" + data_extra.list[i].content_id).text(data_extra.list[i].view);
									var tips=data_extra.list[i].reply_status.tips;
									var status = data_extra.list[i].reply_status.status;
									if (window.feed_config_UATit)
									{
										tips=feed_config_UATit[status];
									}
                                    $("span#status_" + data_extra.list[i].content_id).text(tips);
                                    if (data_extra.list[i].reply_status.status != 0) {
                                        $("span#status_" + data_extra.list[i].content_id).addClass("highlight");
                                    }
                                }
                            }
                        }
                    );
                }
            }
        );
		pvRepeatCount = 1;
		pgvMain();
    }
}
function r_page(type, page_num) {
    if (typeof(content_id) == 'undefined') {
        alert("参数设置错误");
    } else {
        var url = "";
        var rand = new Date().getMinutes();
        if ($.cookie("post_reply")) {
            if (page_num <= 1) {
                url = "http://api."+domainpre+".qq.com/baoliao/api.php?action=get_reply_list&content_id=" + content_id + "&r=" + rand;
            } else {
                url = "http://api."+domainpre+".qq.com/baoliao/api.php?action=get_reply_list&content_id=" + content_id + "&type=" + type + "&page=" + page_num;
            }
        } else {
            if (page_num <= 1) {
                url = "http://api."+domainpre+".qq.com/baoliao/api.php?action=get_reply_list&content_id=" + content_id;
            } else {
                url = "http://api."+domainpre+".qq.com/baoliao/api.php?action=get_reply_list&content_id=" + content_id + "&type=" + type + "&page=" + page_num;
            }
        }
        $.getScript2( url ,
            function() {
                if (type == 0) {
                    var perpage = c_pager_list;
                    var reply_list = [];
                    if (data_reply.reply_list.reply_list != null) {
                        var start = page_num <= 1 ? perpage * (page_num - 1) : 0;
                        var end = start + perpage;
                        var length = data_reply.reply_list.reply_list.length ;
                        end = end < length ? end : length;

                        var cnt = end - start;
                        reply_list = getArrPart(data_reply.reply_list.reply_list, cnt, start);
                    }

                    var data_new = [];
                    data_new['total'] = data_reply.reply_list.total;
                    data_new['reply_list'] = reply_list;

                    var result = TrimPath.processDOMTemplate("reply_template", data_new);
                    document.getElementById("reply_list").innerHTML = result;
                    var countpage = Math.ceil(data_reply.reply_list.total / perpage);
                    $("#reply_list .turnPage").html(page(page_num, countpage, 'javascript:r_page(0, .page.)', true));
                } else {
                    var perpage = c_pager_list;
                    var reply_list = [];
                    if (data_reply.reply_list2.reply_list != null) {
                        var start = page_num <= 1 ? perpage * (page_num - 1) : 0;
                        var end = start + perpage;
                        var length = data_reply.reply_list2.reply_list.length;
                        end = end < length ? end : length;

                        var cnt = end - start;
                        reply_list = getArrPart(data_reply.reply_list2.reply_list, cnt, start);
                    }

                    var data_new = [];
                    data_new['total'] = data_reply.reply_list2.total;
                    data_new['reply_list'] = reply_list;

                    var result = TrimPath.processDOMTemplate("reply_pro_template", data_new);
                    document.getElementById("reply_pro_list").innerHTML = result;
                    var countpage = Math.ceil(data_reply.reply_list2.total / perpage);
                    $("#reply_pro_list .turnPage").html(page(page_num, countpage, 'javascript:r_page(1, .page.)'));
                }
            }
        );
		pvRepeatCount = 1;
		pgvMain();
    }
}
// login
function RepUIN(uin) {
    uin = String(uin);
    if(uin.length > 15) uin = uin.substr(0, 10);
    return uin.replace(/^(\D|0)+/ig, '').replace(/(\D.*)/gi, '');
}
function GetUIN() {
    var uin = $.cookie('zzpaneluin');
	if (uin) {
	    uin = RepUIN(uin);
	} else {
        uin = $.cookie('uin');
		uin = (uin) ? RepUIN(uin) : 0;
    }
	if(!uin > 10000) uin = 0;
    return uin;
}
function CheckUserLogin() {

}
function CreateLoginFrameWin(appid,s_url) {
    $.getScript2("http://q1.city.qq.com/js/D.login.js",function(){D.login.getLogin();});
}
function login_error() {
    CreateLoginFrameWin();
}
function changeUploadBox() {
    $("li.hidden").toggle();
}
function text_limit(element, total) {
    if(total <= 500){total=2000;}
    if ($(element).val().length > total) {
        $(element).val($(element).val().substr(0, total));
    }
    $("#f_total").text(total - $(element).val().length);
}
// verify
var notice="请自觉遵守爱国、守法、自律、真实、文明的原则理性发贴。";
function show_verify_box() {
    if (document.getElementById("f_content")) {
        if($('#f_content').hasClass('notice')){
            $('#f_content').val('');
        }
        $('#f_content').removeClass("notice");
    }
    if (document.getElementById("r_content")) {
        if($('#r_content').hasClass('notice')){
            $('#r_content').val('');
        }
        $('#r_content').removeClass("notice");
    }

    if (!verify_flag) {
        $("#verify_img").attr("src", "http://ptlogin2.qq.com/getimage?aid=5000701&" + Math.random());
        $("#form_addReply li.hidden").show();
        $("#form_addNewsFeed li.hidden_f").show();
    }
    verify_flag = true;
    window.setInterval(function() {changeImg();}, 20 * 60 * 1000);
}

$(document).ready(function() {
    if (document.getElementById("f_content")) {
        $('#f_content').addClass("notice");
        if($('#f_content').val() == ''){
            $('#f_content').val(notice);
        }
    }
    if (document.getElementById("r_content")) {
        $('#r_content').addClass("notice");
        if($('#r_content').val() == ''){
            $('#r_content').val(notice);
        }
    }
    $("#f_total").text('2000');
});

function changeImg() {
    if (document.getElementById("verify_img")) {
        $("#verify_img").attr("src", "http://ptlogin2.qq.com/getimage?aid=5000701&" + Math.random());
    }
}
function verify_error() {
    alert("验证码输入错误，请重新输入");
    changeImg();
    $("#form_addNewsFeed input:submit").attr("disabled", false);
    $("#form_addReply input:submit").attr("disabled", false);
    $("#f_verify").val("");
}

function checkImg(element) {
    if ($(element).val() != '') {
        var ext = $(element).val().split('.').pop();
        if (!in_array(ext, ['gif', 'jpg'])) {
            alert("请上传gif,jpg格式的图片");
            $(element).replaceWith($(element).attr("outerHTML"));
        } else {
            if ($.browser.msie) {
                var img = new Image();
                img.src = $(element).val();
                img.onreadystatechange = function() {
                    if(img.readyState == "complete") {
                        if (img.fileSize <= 0) {
                            alert("请上传gif,jpg格式的图片");
                            $(element).replaceWith($(element).attr("outerHTML"));
                        } else if (img.fileSize > 1024 * 200) {
                            alert("图片文件大小限制在200K以内");
                            $(element).replaceWith($(element).attr("outerHTML"));
                        }
                    }
                };
            }
        }
    }
}
function in_array(needle, haystack) {
    type = typeof needle;
    if(type == 'string' || type =='number') {
        for(var i in haystack) {
            if(haystack[i] == needle) {
                return true;
            }
        }
    }
    return false;
}
function OnPTLogin2Success() {
    changeImg();
    $("#form_addNewsFeed input:submit").attr("disabled", false);
    $("#form_addReply input:submit").attr("disabled", false);
    $("#f_verify").val("");
    //$("#form_addNewsFeed").attr("target", "add_iframe");
    //$("#form_addNewsFeed").submit();
}
// pager
function page(curPage, countPage, para, f_e) {
    if (f_e == 'undefined') {
        f_e = false;
    }
    curPage = curPage < 1 ? 1: (curPage > countPage? countPage : (curPage||1));
    var pa = [];
    pa.push('<span style="margin-right:6px">' + curPage + '/' + countPage + '页</span>');
    if (countPage > 1 && f_e) {
        if (curPage == 1) {
            pa.push('<span class="disabled">首页</span>');
        } else {
            pa.push('<a href="javascript:r_page(0, 1)" >首页</a>');
        }
    }
    if(curPage <= 7){
        page_deal(pa, para, '<a href="{para}">{page}</a>', 1, curPage);
        pa.push('<span class="current">'+curPage+'</span>');
        page_deal(pa, para, '<a href="{para}">{page}</a>', curPage+1, countPage < 14 ? countPage + 1 : 14);
    } else {
        var end = curPage+7 < countPage ? curPage+7 : countPage;
        page_deal(pa, para, '<a href="{para}">{page}</a>', end-13 < 0 ? 1 : end-13, curPage);
        pa.push('<span class="current">'+curPage+'</span>');
        page_deal(pa, para, '<a href="{para}">{page}</a>', curPage+1, end);
    }
    if (countPage > 1 && f_e) {
        if (curPage == countPage) {
            pa.push('<span class="disabled">末页</span>');
        } else {
            pa.push('<a href="javascript:r_page(0, '+ countPage + ')">末页</a>');
        }
    }
    return pa.join('');
}
function page_deal(a, b, c, d, e){
    e = e || d+1;
    for(;d<e;d++){
        a.push(c.replace(/\{para\}/g, url_set(b, d)).replace(/\{page\}/g, d));
    }
}
function url_set(url, v) {
    url = url.replace(/\.page\./, v);
    return url;
}

function getArrPart(src, cnt, start) {
    start = start || 0;
    var newData = {};

    if(src instanceof Array ){
        for(var i=0; i < cnt; i++){
            if(! src[start + i]){
                break;
            }
            newData[i] = src[start + i];
        }
    }
    return newData;
}

$(document).ready(function() {
	if ($('#form_addNewsFeed').size()) {
		$('#form_addNewsFeed').attr('action', 'http://api.'+domainpre+'.qq.com/baoliao/api.php?action=add_content');
	}
});/*  |xGv00|c12252c14913fe5374a62c63b8d515a0 */