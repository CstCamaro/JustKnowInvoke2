function add_content_success(content_id) {
    $.cookie("post_newsfeed", 1, {expires: 1/1440});
    if ($.isFunction(f_submit_success)) {
        f_submit_success(content_id);
    } else {
        alert("�����������ύ�����ȴ�����..");
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
        url = "http://c2.area.qq.com/baoliao/jsdata/baoliao_content_list_new_" + feed_id + ".js?" + rand;
    } else {
        url = "http://c2.area.qq.com/baoliao/jsdata/baoliao_content_list_new_" + feed_id + ".js";
    }
    $.getScript2(url,
        function() {
            if (data_new != null && data_new.status == 1) {
                var result = TrimPath.processDOMTemplate("feed_new_template", data_new.content);
                $("#feed_new").html(result);
            }
        }
    );
}
var load_list = function() {
    var url = "";
    if ($.cookie("post_newsfeed")) {
        var rand = new Date().getMinutes();
        url = "http://c2.area.qq.com/baoliao/jsdata/baoliao_content_list_" + feed_id + ".js?" + rand;
    } else {
        url = "http://c2.area.qq.com/baoliao/jsdata/baoliao_content_list_" + feed_id + ".js"
    }
    $.getScript2(url,
        function() {
            if (data_list != null) {
                var perpage = pager_list;
                var end = perpage > data_list.total ? data_list.total : perpage;
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
                $.getScript2("http://c2.area.qq.com/baoliao/api.php?action=get_content_list_extra&id=" + id.join(','),
                    function() {
                        if (data_extra != null) {
                            for (var i = 0;i < data_extra.list.length; i++) {
                                $("span#reply_" + data_extra.list[i].content_id).text(data_extra.list[i].reply);
                                $("span#view_" + data_extra.list[i].content_id).text(data_extra.list[i].view);
                                $("span#status_" + data_extra.list[i].content_id).text(data_extra.list[i].reply_status.tips);
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
    var dir = content_id % 1000;
    $.getScript2("http://c2.area.qq.com/baoliao/jsdata/" + dir + '/baoliao_content_info_' + feed_id + '_' + content_id + ".js",
        function() {
            if (typeof(data_content) == 'undefined') {
                $("div.centerBox1").hide();
                $("div.centerBox2").hide();
                $("div.centerBox3").hide();
                $("div.fullBox").html("<span class=\"backLink\" ><a href=\"./\">������ҳ>></a></span><div style='padding:100px 0 100px 380px;color:red;font-weight:bold;background:url(./img/error.gif) no-repeat 300px center'>��鿴�����ݲ�����</div>");
            } else if (data_content != null && data_content.status == 1) {
                var result = TrimPath.processDOMTemplate("content_template", data_content.content);
                document.getElementById("feed_content").innerHTML = result;
                // lock
                var lock_flag = data_content.content.lock_status;
                $.getScript2("http://c2.area.qq.com/baoliao/jsdata/baoliao_feed_info_" + feed_id + ".js",
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
    var dir = content_id % 1000;
    $.getScript2("http://c2.area.qq.com/baoliao/jsdata/" + dir + '/baoliao_reply_list_' + content_id + ".js",
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
}

var update_view = function () {
    // update view
    var view_src = "http://c2.area.qq.com/baoliao/api.php?action=update_content_view&content_id=" + content_id;
    $.getScript2(view_src, {},
        function() {
            if (typeof(data) == 'undefined') {
                return ;
            }
            $("#spanclick").html(data.view);
            $("#spanreply").html(data.reply);
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
            $.getScript2("http://c2.area.qq.com/baoliao/jsdata/baoliao_feed_info_" + feed_id + ".js",
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
                    alert("�ƺ�û����д");
                    flag = false;
                    return false;
                }
                flag = true;
            }
            if (document.getElementById("f_title")) {
                if (document.getElementById("f_title").value == '') {
                    alert("����û����д");
                    flag = false;
                    return false;
                }
                flag = true;
            }
            if (document.getElementById("f_content")) {
                if (document.getElementById("f_content").value == '') {
                    alert("����û����д");
                    flag = false;
                    return false;
                }
                flag = true;
            }
            if (document.getElementById("f_verify")) {
                if (document.getElementById("f_verify").value == '') {
                    alert("��֤��û����д");
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
                    alert("�������û����д");
                    flag = false;
                    return false;
                }
                flag = true;
            }
            if (document.getElementById("f_verify")) {
                if (document.getElementById("f_verify").value == '') {
                    alert("��֤��û����д");
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
                    "http://c2.area.qq.com/baoliao/api.php?action=add_reply",
                    {content_id: content_id, data: $("#form_addReply").serialize()},
                    function (RESULT) {
                        $("#form_addReply input:submit").attr("disabled", false);
                        if (RESULT.result == 'Verify_error') {
                            verify_error();
                        } else if (RESULT.result == 'Login_error') {
                            login_error();
                        } else if (RESULT.status == 1) {
                            var dir = content_id % 1000;
                            var rand = new Date().getMinutes();
                            $.cookie("post_reply", RESULT.reply_status, {expires: 1/1440});
                            if (RESULT.reply_status == 1) {
                                $.getScript2("http://c2.area.qq.com/baoliao/jsdata/" + dir + '/baoliao_reply_list_' + content_id + ".js?" + rand,
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
                                $.getScript2("http://c2.area.qq.com/baoliao/jsdata/" + dir + '/baoliao_reply_list_' + content_id + ".js?" + rand,
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
                            $("#f_total").text("500");
                            $("#f_verify").val("");
                            if (typeof(r_submit_success) != 'undefined') {
                                if ($.isFunction(r_submit_success)) {
                                    r_submit_success.apply();
                                }
                            } else {
                                alert("���Ļظ����ύ����л���Ĳ���");
                            }
                        } else {
							if(RESULT.status == 102) alert("��ս�༭���ر��У����ܽ��лظ�����");
                            else alert("���Ļظ��ύʧ�ܣ�������");
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
        alert("�������ô���");
    } else {
        var url = "";
        if ($.cookie("post_newsfeed")) {
            var rand = new Date().getMinutes();
            if (page_num <= 5) {
                url = "http://c2.area.qq.com/baoliao/jsdata/baoliao_content_list_" + feed_id + ".js?" + rand;
            } else {
                url = "http://c2.area.qq.com/baoliao/api.php?action=get_content_list&feed_id=" + feed_id + "&page=" + page_num;
            }
        } else {
            if (page_num <= 5) {
                url = "http://c2.area.qq.com/baoliao/jsdata/baoliao_content_list_" + feed_id + ".js";
            } else {
                url = "http://c2.area.qq.com/baoliao/api.php?action=get_content_list&feed_id=" + feed_id + "&page=" + page_num;
            }
        }
        $.getScript2(
            url,
            function() {
                if (data_list != null) {
                    var perpage = pager_list;
                    var start = page_num <= 5 ? perpage * (page_num - 1) : 0;
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
                    $.getScript2("http://c2.area.qq.com/baoliao/api.php?action=get_content_list_extra&id=" + id.join(','),
                        function() {
                            if (data_extra != null) {
                                for (var i = 0;i < data_extra.list.length; i++) {
                                    $("span#reply_" + data_extra.list[i].content_id).text(data_extra.list[i].reply);
                                    $("span#view_" + data_extra.list[i].content_id).text(data_extra.list[i].view);
                                    $("span#status_" + data_extra.list[i].content_id).text(data_extra.list[i].reply_status.tips);
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
        alert("�������ô���");
    } else {
        var dir = content_id % 1000;
        var url = "";
        var rand = new Date().getMinutes();
        if ($.cookie("post_reply")) {
            if (page_num <= 1) {
                url = "http://c2.area.qq.com/baoliao/jsdata/" + dir + '/baoliao_reply_list_' + content_id + ".js?" + rand;
            } else {
                url = "http://c2.area.qq.com/baoliao/api.php?action=get_reply_list&content_id=" + content_id + "&type=" + type + "&page=" + page_num;
            }
        } else {
            if (page_num <= 1) {
                url = "http://c2.area.qq.com/baoliao/jsdata/" + dir + '/baoliao_reply_list_' + content_id + ".js";
            } else {
                url = "http://c2.area.qq.com/baoliao/api.php?action=get_reply_list&content_id=" + content_id + "&type=" + type + "&page=" + page_num;
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
    $.getScript2("http://q1.city.qq.com/js/fireLogin.js",function(){T.CreateLoginFrameWin(5000701)});
}
function login_error() {
    CreateLoginFrameWin();
}
function changeUploadBox() {
    $("li.hidden").toggle();
}
function text_limit(element, total) {
    if ($(element).val().length > total) {
        $(element).val($(element).val().substr(0, total));
    }
    $("#f_total").text(total - $(element).val().length);
}
// verify
var notice="���Ծ����ذ������ط������ɡ���ʵ��������ԭ�����Է�����";
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
})

function changeImg() {
    if (document.getElementById("verify_img")) {
        $("#verify_img").attr("src", "http://ptlogin2.qq.com/getimage?aid=5000701&" + Math.random());
    }
}
function verify_error() {
    alert("��֤�������������������");
    changeImg();
    $("#form_addNewsFeed input:submit").attr("disabled", false);
    $("#form_addReply input:submit").attr("disabled", false);
    $("#f_verify").val("");
}

function checkImg(element) {
    if ($(element).val() != '') {
        var ext = $(element).val().split('.').pop();
        if (!in_array(ext, ['gif', 'jpg'])) {
            alert("���ϴ�gif,jpg��ʽ��ͼƬ");
            $(element).replaceWith($(element).attr("outerHTML"));
        } else {
            if ($.browser.msie) {
                var img = new Image();
                img.src = $(element).val();
                img.onreadystatechange = function() {
                    if(img.readyState == "complete") {
                        if (img.fileSize <= 0) {
                            alert("���ϴ�gif,jpg��ʽ��ͼƬ");
                            $(element).replaceWith($(element).attr("outerHTML"));
                        } else if (img.fileSize > 1024 * 200) {
                            alert("ͼƬ�ļ���С������200K����");
                            $(element).replaceWith($(element).attr("outerHTML"));
                        }
                    }
                }
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
    pa.push('<span style="margin-right:6px">' + curPage + '/' + countPage + 'ҳ</span>');
    if (countPage > 1 && f_e) {
        if (curPage == 1) {
            pa.push('<span class="disabled">��ҳ</span>');
        } else {
            pa.push('<a href="javascript:r_page(0, 1)" >��ҳ</a>');
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
            pa.push('<span class="disabled">ĩҳ</span>');
        } else {
            pa.push('<a href="javascript:r_page(0, '+ countPage + ')">ĩҳ</a>');
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
            newData[i] = src[start + i];
        }
    }
    return newData;
}

var added = false;
function submitCheck() {
    if(added == false){
        if($('#f_type').val()){
            $("#f_title").val('['+$("#f_type").val() +']'+ $("#f_title").val());
        }
        added = true;
    }
    return true;
}

function showDivPage(w){
    if(w == 'hot'){
        $('#new_span').attr('className', 'tab_off');
        $('#hot_span').attr('className', 'tab_on');
        $('#new_tiaozhan').hide();
        $('#hot_tiaozhan').show();
    }else{
        $('#new_span').attr('className', 'tab_on');
        $('#hot_span').attr('className', 'tab_off');
        $('#new_tiaozhan').show();
        $('#hot_tiaozhan').hide();
    }
}/*  |xGv00|e91a8ad9a187476f7fc79909a2dca374 */