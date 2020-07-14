/*
 * Created by limeizhang on 2016/06/12.
 */
jQuery(function(){
    var vid = config.vid,
    	subjid = "",
    	optid = "",
    	total = 0,
    	voted = false;

    var zs = $(".formore");
    if(zs.length>0){
    	$('<div class="xhBtn"><a><span>0</span></a></div>').insertBefore(zs.parent("div"));
    }else{
    	$(".articleContent").append('<div class="xhBtn"><a><span>0</span></a></div>');
    }

    var getVote = function(vid){
        var getUrl = "http://panshi.qq.com/v2/vote/"+vid+"?source=1&callback=?";
        $.getJSON(getUrl,function(data){
            // console.log(data);
            if(data.code == 0){
                var _subj = data.data.subject[0];
                subjid = _subj.subjectid;
                optid = _subj.option[0].optionid;
                total = data.data.votedtotal;
                $(".dianzan").text(total);
                $(".xhBtn span").text(total);
            }
        });
    };


    function callback(){}
    
    var doVote = function(vid){
        var json = '{"'+ subjid +'":{"selected":["'+optid+'"]}}';
        var callback = function(data){}
        var data = {
            'answer': json,
            'login': 1,
            'source': 1,
            'format': "script",
            'callback':"callback"
        };
        form_post("http://panshi.qq.com/v2/vote/"+vid+"/submit",data);
        // var cback = setTimeout(function(){
        //     console.log("xxx");
        // });
		voted = true;
        $(".dianzan").text(Number(total)+1);
        $(".xhBtn span").text(Number(total)+1);
        $(".xhBtn a").addClass("voted");
    };
    getVote(vid);

    $("body").on("click",".xhBtn a",function(){
    	if(!voted){
			doVote(vid);
    	}
    });

    function form_post(url, data) {
        //create frame
        var _target = 'post_iframe';
        if (!$('#post_iframe').length) {
            $("body").append('<iframe id="post_iframe" name="post_iframe" style="display:none"><script type="text/javascript">document.domain = "qq.com";</script></iframe>');
        }
        var _$form = $('#_messageform').length ?
            $('#_messageform').attr('action', url).empty() :
            $('<form action="' + url + '" method="post" target="' + _target + '" id="_messageform" style="display:none;"></form>').appendTo($("body"));

        for (name in data) {
            _$form.append($('<input name="' + name + '" type="hidden" value="" />').val(data[name]));
        }
        _$form.submit();
    }

});/*  |xGv00|53444282953c67d7f7b049faa5abef53 */