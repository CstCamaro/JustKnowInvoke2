
$(function() {
    // 展开收起
    $(".btn_hide_options").click(function() {
        $(this).addClass("hide");
        $(".btn_show_options").removeClass("hide");
        $(".style_con").addClass("hide");
        $(".style_list").addClass("hide");
    });
    $(".btn_show_options").click(function() {
        $(this).addClass("hide");
        $(".btn_hide_options").removeClass("hide");
        $(".style_con").removeClass("hide");
        $(".style_list").removeClass("hide");
    });

    // IE8兼容
    $(".style_con a:last-child").css("padding-right",0);

    $(".zhankai").click(function(){
        var _this = $(this);
        if (_this.hasClass("shouqi")) {
            _this.removeClass("shouqi").text("展开");
            _this.parents().find(".condtions").css("height","32");
        }else{
            _this.addClass("shouqi").text("收起");
            _this.parents().find(".condtions").css("height","auto");
        }
    })
    
    // 返回顶部 
    window.onscroll = function() { 
    var winHeight = $(window).height();
            var wScrolltop = $(window).scrollTop(); 
            if (wScrolltop >= 250) {
                $('.go_top').removeClass('hide');
            }else{
                $('.go_top').addClass('hide');
            }
             
    };
    $(".go_top").click(function(){
         $("html,body").animate({
                scrollTop: 0
            }, 500);
    })  

    //跳转链接
    $(".option").click(function(){
        // window.location.href = ;
        var href = $(this).find(".list_pic").attr("href");
        $(this).attr('data-href',href);
        $(this).find(".list_pic").attr("href","javascript:;");
        var nhref = $(this).attr("href");
        // console.log(nhref);
        window.open(href);
        window.location.reload();
    }) 

    //点赞
    var JsLoader={
        load:function(sUrl,fCallback){
            var _script = document.createElement("script");
            _script.setAttribute("type","text/javascript");
            _script.setAttribute("src",sUrl);
            document.getElementsByTagName("head")[0].appendChild(_script);

            if(/msie/.test(window.navigator.userAgent.toLowerCase())){
                _script.onreadystatechange=function(){
                    if(this.readyState=="loaded"||this.readyState=="complete"){
                        fCallback();
                    }
                };
            }else if(/gecko/.test(window.navigator.userAgent.toLowerCase())){
                _script.onload=function(){
                    fCallback();
                };
            }else{
                fCallback();
            }
        }
    };

    // 点赞功能
    if(typeof jQuery == "undefined"){ 
        JsLoader.load("//mat1.gtimg.com/www/panshi/dist/js/jquery.js",function(){});
    }
    JsLoader.load("//mat1.gtimg.com/www/panshi/js/digg2.js", function()
    {
        AppPlatform.Survey.Digg.init({
            PrjId: 10388282, /*调查ID*/
            SubjId: 427998, /*问题ID*/
            DiggMode: 0, /*0：单选模式 1：多选模式*/
            ShowResult: 1,
            /*｛'选项ID': '索引'｝，快速评价列表，可以根据需要删减*/
            OptIdObject: 
            {"999814":0,"999815":1,"999816":2,"999817":3,"999818":4,"999819":5,"999820":6,"999821":7,"999822":8,"999823":9,"999824":10,"999825":11,"999826":12,"999827":13,"999828":14,"999829":15,"999830":16,"999831":17,"999832":18,"999833":19,"999834":20,"999835":21,"999836":22,"999837":23,"999838":24,"999839":25,"999840":26,"999841":27,"999842":28,"999843":29}
        });
    });

    //阅读量统计
    if(typeof jQuery == "undefined"){ 
        JsLoader.load("//mat1.gtimg.com/www/panshi/dist/js/jquery.js",function(){});
    }
    JsLoader.load("//mat1.gtimg.com/www/panshi/js/digg2.js", function()
    {
        AppPlatform.Survey.Digg.init({
            PrjId: 10388270, /*调查ID*/
            SubjId: 427986, /*问题ID*/
            DiggMode: 0, /*0：单选模式 1：多选模式*/
            ShowResult: 1,
            /*｛'选项ID': '索引'｝，快速评价列表，可以根据需要删减*/
            OptIdObject: 
{"999763":0,"999775":1,"999776":2,"999777":3,"999778":4,"999779":5,"999780":6,"999781":7,"999782":8,"999783":9,"999784":10,"999785":11,"999786":12,"999787":13,"999788":14,"999789":15,"999790":16,"999791":17,"999792":18,"999793":19,"999794":20,"999795":21,"999796":22,"999797":23,"999798":24,"999799":25,"999800":26,"999801":27,"999802":28,"999803":29,"1103844":30,"1103845":31,"1103846":32,"1103847":33,"1103848":34,"1103849":35,"1103850":36,"1103851":37,"1103852":38,"1103853":39,"1103854":40,"1103855":41,"1103856":42,"1103857":43,"1103858":44,"1103859":45,"1103860":46,"1161057":47,"1161058":48,"1161059":49,"1161060":50,"1161061":51,"1161062":52,"1161063":53,"1161064":54,"1161065":55,"1161066":56,"1161067":57,"1161068":58,"1161069":59,"1161070":60,"1161071":61,"1161072":62,"1161073":63,"1161074":64,"1161075":65,"1161076":66,"1161077":67,"1161078":68,"1161079":69,"1161080":70,"1161081":71,"1161082":72,"1161083":73,"1161084":74,"1161085":75,"1161086":76,"1161087":77,"1161088":78,"1161089":79,"1161090":80,"1161091":81,"1161092":82,"1161093":83,"1161094":84,"1161095":85,"1161096":86,"1161097":87,"1161098":88,"1400798":89,"1400799":90,"1400800":91,"1400801":92,"1400802":93,"1400803":94,"1400804":95,"1400805":96,"1400806":97,"1400807":98,"1400808":99,"1400809":100,"1400810":101,"1400811":102,"1400812":103,"1400813":104,"1400814":105,"1400815":106,"1400816":107,"1400817":108,"1400818":109,"1400819":110,"1400820":111,"1400821":112,"1400822":113,"1400823":114,"1400824":115,"1400825":116,"1400826":117,"1400827":118,"1400828":119,"1400829":120,"1400830":121,"1400831":122,"1400832":123,"1400833":124,"1400838":125,"1400839":126,"1400840":127,"1400841":128,"1400842":129}
	});
});

}) 
/*  |xGv00|d054f396f5bdfdecf78ad28ac3f39ec6 */