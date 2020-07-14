var main = {
    getHashParameters: function() {
        var arr = (location.hash || "").replace(/^\#/,'').split("&");
        var params = {};
        for(var i=0; i < arr.length; i++){
            var data = arr[i].split("=");
            if(data.length == 2){
                params[data[0]] = data[1];
            }
        }
        return params;
    },
    getHashParameter: function(key) {
        var params = main.getHashParameters();
        return params[key];
    },
    checkType: function (data) {
        return Object.prototype.toString.call(data).match(/^\[object\s?(\w+)\]$/i)[1];
    },
    checkItemShow: function() {
        console.log($(document).scrollTop() + 'docScrollTop');
        console.log($(window).height() + 'windowHeight');
        console.log($(document).outerHeight() + 'outerHeight');

        return $(document).scrollTop() + $(window).height() + 50 >= $(document).outerHeight() ? !0 :!1;
    },
    cutstr: function(str, len) {
        var str_length = 0;
        var str_len = 0;
        var str_cut = new String();
        str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        if (str_length < len) {
            return str;
        }
    },
    loadData: function(url, data, callback) {
        $.ajax({
            data:data,
            url:url,
            type:"get",
            dataType:"JSONP",
            success:callback,
            error:function () {
                alert("\u63d0\u53d6\u6570\u636e\u51fa\u9519\uff0c\u8bf7\u5237\u65b0\u9875\u9762")
            }
        })
    },
    next: function () {
        main.clearPlay();
        if(current == ($('.more_list .split').size())){ current = 0 }
        current++;
        columSlide(current);
    },
    prev: function () {
        main.clearPlay();
        current--;
        if(current == 0){current = $('.more_list .split').size()}
        columSlide(current);
    },
    autoPlay: function (){
        auto = setInterval(function(){
            //next(event);
        },5000);
    },
    clearPlay: function (){
        clearInterval(auto);
    },
    filterData: function(msg) {
        var article = msg.article;
        var tplBox = [];
        var tLen = article.length;
        if(!tLen) return false;
        for(var i=0; i < tLen; i++){
            var single = article[i];
            var tags = single.tags;
            for(var k=0; k < tags.length; k++){
                var tag = tags[k];
                tag["ecdname"] = encodeURIComponent(tag["name"]);
            }
            var tplinfo = {
                num: msg.total-(i+pagesize*(currentPageNum-1)),
                title: main.cutstr((single.title).split("#")[0],50),
                url: single.url,
                headimg: main.checkType(single.headimg) == 'Array' ?single.headimg[0] : single.headimg,
                listimg: main.checkType(single.listimg) == 'Array' ?single.listimg[0] : single.listimg,
                intro: main.cutstr(single.intro,80),
                author: single.title.split("#")[1],
                authorimg: main.checkType(single.listimg) == 'Array' ? single.listimg[1] : single.listimg
            };
            if(widw<=768){
                tplBox.push(template("conm-temp",tplinfo));
            }
            else{
                tplBox.push(template("con-temp",tplinfo));
            }
        }
        return tplBox;
    },
    totalPage: function(total){
        return total > pagesize ? Math.ceil(total/pagesize) : 1 ;
    }
};


var widw = $(window).width(), winh = $(window).height();
nowColumn = {
    xb:columnP1name.xb[0],
    banimg:columnP1name.banimg[0],
    id: columnP1id[0],
    cname: columnP1name.cname[0],
    cimg:columnP1name.cimg[0],
    color:columnP1name.color[0],
    cslogn: columnP1name.cslogn[0]
};

var bodyO = $("body");
var miniNav = $(".mininav_box");
var bannerImg = $(".banner>img");
var nowColName =$("#nowName");
var nowColSlogn =$("#firstArt");
var menuId = $("#menu");

if(widw<=768){
    bodyO.addClass("mobile");
    miniNav.hide();
};
$(window).resize(function(){
    widwr = $(window).width();
    if(widwr <= 768){
        bodyO.addClass("mobile");
        miniNav.hide();
    }
});

var currentPageNum = 0,getItemsState = true,pagesize = 5;
function menuSet(msg, obj, imgurl, mtit, icolor){
    var tplBox = [];
    if(!msg.article.length){ return }
    if(!msg){
        if(widw <= 768){
            $(obj).text("").html('<h3 class="list_name">'+ mtit +'<i>+</i></h3>');
        }
        else{
            $(obj).empty().html('<img src="'+ imgurl +'" />');
        }
        return;
    }
    var tplinfo = {
        title: main.cutstr((msg.article[0].title).split("#")[0],50),
        url: msg.article[0].url,
        intro: main.cutstr(msg.article[0].intro,80)
    };
    tplBox.push(template("colum-temp", tplinfo));
    $(obj).append(tplBox);
    if(widw <= 768){
        $(obj).find('h3').text(mtit).append('<i>+</i>').find("i").css('color', icolor);
    }
    else{
        $(obj).find(".list_name").empty().html('<img src="'+ imgurl +'" />');
    }
    return tplBox;
};

$(".more_btn").click(function(event){
    event.stopPropagation();
});

function articleSet(){
    $(".columnContact, .author").css("border-left", "3px solid "+ nowColumn.color);
    $(".con_article p>a").css("color", nowColumn.color);
    $(".yelloBox, .con div.f16, .toTop, .now_column, .now_c>span").css("background-color", nowColumn.color);
    menuId.css("background-color", nowColumn.color);
    $(".con_article h3>a").hover(function(){
        $(this).css("color", nowColumn.color);
    },function(){
        $(this).css("color", "#333");
    });
};

var current = 1, auto = null;
function init() {
    var getSnum = main.getHashParameter('tab');
    console.log(getSnum);

    if(!!columnP1id){
        var p1Len = columnP1id.length;
    }
    if(!!columnP2id){
        var p2Len = columnP2id.length;
    }
    P1Len = p1Len > 0 ?  p1Len : 0, p2Len = p2Len > 0 ?  p2Len : 0;
    if(!getSnum || getSnum < 0 || getSnum > (parseInt(p1Len) + parseInt(p2Len))){
        getSnum = 1;
    }
    var arrayNum, sliNum;
    getSnum <=4 ? arrayNum = parseInt(getSnum) -1: arrayNum = parseInt(getSnum) -1-4;
    if(getSnum <=4){
        sliNum = 1;
        nowColumn ={
            xb: columnP1name.xb[arrayNum],
            banimg: columnP1name.banimg[arrayNum],
            id: columnP1id[arrayNum],
            cname: columnP1name.cname[arrayNum],
            cimg: columnP1name.cimg[arrayNum],
            color: columnP1name.color[arrayNum],
            cslogn: columnP1name.cslogn[arrayNum]
        };
    };
    if(getSnum <=8 && getSnum >4){
        sliNum = 2;
        nowColumn ={
            xb: columnP2name.xb[arrayNum],
            banimg: columnP2name.banimg[arrayNum],
            id: columnP2id[arrayNum],
            cname: columnP2name.cname[arrayNum],
            cimg: columnP2name.cimg[arrayNum],
            color: columnP2name.color[arrayNum],
            cslogn: columnP2name.cslogn[arrayNum]
        };
    };
    articleSet();
    nowColName.empty().text(nowColumn.cname);
    nowColSlogn.empty().text(nowColumn.cslogn);
    widwn = $(window).width();
    if(widwn<=768){
        bannerImg.attr("src", nowColumn.banimg.small);
    }
    else {
        bannerImg.attr("src", nowColumn.banimg.big);
    };
    $('#m-coldes').empty().text(nowColumn.cslogn);
    $(".columnContact, .author").css("border-left","3px solid " + nowColumn.color);
    $(".more_list .split").hide().eq(0).show();

    sliNum == 1 ? $('#split1 li:eq('+arrayNum+')').addClass('active').siblings().removeClass('active') : $('#split2 li:eq('+arrayNum+')').addClass('active').siblings().removeClass('active');
    $(".columnContact .xbname").empty().text(nowColumn.xb.name);
    $(".columnContact .xbtel").empty().text(nowColumn.xb.tel);

    window.location.hash = 'tab='+ getSnum;
    columSlide(sliNum);
    initM(nowColumn.id,nowColumn.color);
};

function appendColum(splitPage, slideNum){
    if(widw<=768){
        for(var i = 0; i < 4; i++){
            $(".split:eq("+(slideNum-1)+")").find("li:eq("+ i +")").find(".list_name span").text("").text(splitPage.cname[i]);
            $(".split:eq("+(slideNum-1)+")").find("li:eq("+ i +")").find(".list_name i").css("color",splitPage.color[i]);
        };
    }
    else{
        for(var i =0;i<4;i++) {
            $(".split:eq("+(slideNum-1)+")").find("li:eq("+ i +") .list_name").empty().html('<img src="'+splitPage.cimg[i]+'" />');
        };
    };
};

function columSlide(slideNum){
    var splitPage ;
    var totalLen = $('.more_list .split').size();
    if(slideNum > totalLen){
        return;
    }
    else if(slideNum == 1){
        splitPage = columnP1name;
    }
    else if(slideNum == 2){
        splitPage = columnP2name;
    };
    appendColum(splitPage, slideNum);
    $('.more_list .split').eq(slideNum-1).fadeIn('slow').siblings().hide();
};


$('.more_list').hover(function(){
    main.clearPlay();
},function(){

});

$(".split li").click(function(){
    $("html,body").animate({scrollTop: 0},1000);
    bannerImg.attr("src", 'http://mat1.gtimg.com/cd/pjq2015/2018/cdbb/loadimg.png');
    var tabNum = '';
    var listIndex = $(this).index();
    var parentId = $(this).parent().attr('data-id');
    var slideNum = parentId.split('split')[1];
    slideNum == 1 ? tabNum = parseInt(listIndex) + 1 : tabNum = parseInt(listIndex)+1+4;

    if(slideNum == 1){
        nowColumn = {
            xb:[columnP1name.xb[listIndex]],
            banimg:[columnP1name.banimg[listIndex]],
            id : columnP1id[listIndex],
            cname : columnP1name.cname[listIndex],
            cimg : columnP1name.cimg[listIndex],
            color : columnP1name.color[listIndex],
            cslogn: columnP1name.cslogn[listIndex]
        };
    }
    else if(slideNum == 2) {
        nowColumn = {
            xb: [columnP2name.xb[listIndex]],
            banimg: [columnP2name.banimg[listIndex]],
            id: columnP2id[listIndex],
            cname: columnP2name.cname[listIndex],
            cimg: columnP2name.cimg[listIndex],
            color: columnP2name.color[listIndex],
            cslogn: columnP2name.cslogn[listIndex]
        };
    };

    widwn = $(window).width();
    if(widwn <= 768){
        bodyO.removeClass("mobile").addClass("mobile");
        bannerImg.attr("src", nowColumn.banimg[0].small);
        $('#m-coldes').empty().text(nowColumn.cslogn);
    }
    else{
        bannerImg.attr("src", nowColumn.banimg[0].big);
        nowColName.empty().text(nowColumn.cname);
        nowColSlogn.empty().text(nowColumn.cslogn);
    };
    $(".columnContact .xbname").empty().text(nowColumn.xb[0].name);
    $(".columnContact .xbtel").empty().text(nowColumn.xb[0].tel);
    initM(nowColumn.id, nowColumn.color);
    window.location.hash='tab=' + tabNum;
    return;
});

/*main Data*/
window["appendData"] = function (msg) {
    if(msg.article.length == 0){
        $(".tips").show();
        getItemsState = false;
        return;
    }
    var items = main.filterData(msg);
    if(currentPageNum == 1){
        $(".mainM").empty().append(items.join(""));
    }
    else{
        $(".mainM").append(items.join(""));
    };
    articleSet();
    getItemsState = true;
    if(currentPageNum >= main.totalPage(parseInt(msg.total))){
        $(".tips").show();
        getItemsState = false;
        return;
    };
};

function decideIfGet(){
    console.log(1111);
    console.log(main.checkItemShow());
    if(main.checkItemShow()){
        setTimeout(function(){
            if(!getItemsState){
                return false;
            };
            getItemsState = false;
            currentPageNum++;
            main.loadData("//cd.city.qq.com/interface/skanda/getlisttag?tid="+ nowColumn.id +"&rt=jsonp&callback=function&timeStamp=" + new Date().getTime(),
                {page: currentPageNum, size: pagesize}, appendData);
        }, 1000);
    };
};
$(window).on("scroll", function () {
    decideIfGet();
});
window["initM"] = function() {
    currentPageNum = 1;
    main.loadData("//cd.city.qq.com/interface/skanda/getlisttag?tid="+ nowColumn.id +"&rt=jsonp&callback=function&timeStamp=" + new Date().getTime(),
        { page: currentPageNum, size: pagesize }, appendData);

};


/*mobile more colume*/
$(function(){
    init();
    $(".body").click(function(){
        if($(".more_column").hasClass("open")){
            $(".mainR .more_column").removeClass("open").addClass("close");
            setTimeout(function(){ menuId.show() },500);
        };
    });
    menuId.click(function(){
        $(this).hide();
        $(".toTop").hide();
        $(".mainR .more_column").removeClass("close").addClass("open");
        var mhead = $(".m_head").height();
        $(".m_con,.more_list, .more_list>ul").css("height", (winh-mhead-40)+"px");
        $(".m_close").click(function(){
            $(".mainR .more_column").removeClass("open").addClass("close");
            menuId.show('slow');
        });
    });
});/*  |xGv00|c5e53b16ab2d9d43ef2c430aa1bd718a */