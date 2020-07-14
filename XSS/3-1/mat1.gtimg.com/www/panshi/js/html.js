String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

var JsLoader = {
    load: function(sUrl, fCallback) {
        var _script = document.createElement("script");
        _script.setAttribute("type", "text/javascript");
        _script.setAttribute("src", sUrl);
        document.getElementsByTagName("head")[0].appendChild(_script);

        if (/msie/.test(window.navigator.userAgent.toLowerCase())) {
            _script.onreadystatechange = function() {
                if (this.readyState == "loaded" || this.readyState == "complete") {
                    fCallback();
                }
            };
        } else if (/gecko/.test(window.navigator.userAgent.toLowerCase())) {
            _script.onload = function() {
                fCallback();
            };
        } else {
            fCallback();
        }
    }
};

if (typeof jQuery == "undefined") {
    JsLoader.load("http://mat1.gtimg.com/www/panshi/dist/js/jquery.js", function() {
        $(document).on("click", "#submit_survey", submitSurvey);
        $(document).on("click", "#view_survey", view);
    })
} else {
    $(document).on("click", "#submit_survey", submitSurvey);
    $(document).on("click", "#view_survey", view);
}
if (typeof JSON == "undefined") {
    JsLoader.load("http://mat1.gtimg.com/www/panshi/dist/js/json2.js", function() {

    })
}

function getAnswer() {
    var form = $("#form_survey").serializeArray();
    var tmp = {};

    for (var i = 0, len = form.length; i < len; i++) {
        if (/sbj_\d+\[\]/.test(form[i]['name'])) {
            var qid = form[i]['name'].replace(/\D+/g, "");
            if (typeof tmp[qid] == "undefined") {
                tmp[qid] = {};
            }
            if (typeof tmp[qid]['selected'] == "undefined") {
                tmp[qid]['selected'] = [];
            }
            tmp[qid]['selected'].push(form[i]['value']);
        }
        if (/sbj_\d+\[\d+\]/.test(form[i]['name']) && form[i]['value'].trim().length != 0) {
            //输入
            var qid = form[i]['name'].replace(/\[\d+\]/, "").replace(/\D+/g, "");
            var oid = form[i]['name'].replace(/sbj_\d+/, "").replace(/\D+/g, "");
            if (typeof tmp[qid] == "undefined") {
                tmp[qid] = {};
            }
            if (typeof tmp[qid]['others'] == "undefined") {
                tmp[qid]['others'] = {};
            }
            if (typeof tmp[qid]['selected'] == "undefined") {
                tmp[qid]['selected'] = [];
            }
            tmp[qid]['selected'].push(oid);
            tmp[qid]['others'][oid] = form[i]['value'];
        }
    }

    var data = {
        'answer': JSON.stringify(tmp),
        'login': 1,
        'source': 1,
        'format': "script",
        'callback': 'parent.callback'
    };
    return data;
}

function formPost(url, data) {
    var _target = 'post_iframe';
    if (!$('#post_iframe').length) {
        $("body").append('<iframe id="post_iframe" name="post_iframe" style="display:none"></iframe>');
    }
    var _$form = $('#_messageform').length ?
        $('#_messageform').attr('action', url).empty() :
        $('<form action="' + url + '" method="post" target="' + _target + '" id="_messageform" style="display:none;" enctype="multipart/form-data" accept-charset="utf-8" onsubmit="document.charset=\'utf-8\';"></form>').appendTo($("body"));
    for (name in data) {
        _$form.append($('<input name="' + name + '" type="hidden" value="" />').val(data[name]));
    }
    _$form.submit();
}

function view() {
    var url = 'http://panshi.qq.com/vote/' + SURVEY_ID + '/view?type=result';
    //var url = 'http://panshi.qq.com/v2/' + SURVEY_ID + '/result';
    window.open(url);
}

function submitSurvey() {
    formPost('http://panshi.qq.com/vote/' + SURVEY_ID + '/submit', getAnswer());
}

function callback(data) {
    if (data.errCode == 0) {
        alert("\u6295\u7968\u6210\u529f");
    } else if (data.errCode == 34 || data.errCode == 35 || data.errCode == 36) {
        alert("\u8bf7\u9009\u62e9\u540e\u518d\u63d0\u4ea4");
    } else if (data.errCode == 20 || data.errCode == 25) {
        alert("\u8bf7\u767b\u5f55");
    } else if (data.errCode == 21) {
        alert("\u5df2\u53c2\u4e0e");
    }
}/*  |xGv00|e2f03837b9c1a74f096a8f39a45fe890 */