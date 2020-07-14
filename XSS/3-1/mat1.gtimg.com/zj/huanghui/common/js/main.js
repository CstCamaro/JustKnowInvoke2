define(function(require, exports, module) {
    require("page/jquery.js"),require("page/layerslider.kreaturamedia.jquery.js"),require("page/jquerytransit.js"),require("page/theme.js"),require("page/flexslider.js");
    var winHeight =  $(window).height();
    var lsjQuery = jQuery, setJoinContentHeight = false;
    // 配置初始化页面
    if(typeof(window.firstLayerInit) == "undefined"){
        var getParam = function(){
            var paramArray = [], searchStr = window.location.search;
            if (searchStr.indexOf("?") == 0 && searchStr.indexOf("=")>1){
                var arrSource = (searchStr).substring(1,searchStr.length).split("&");
                i = 0;
                while (i < arrSource.length){
                    if (arrSource[i].indexOf("=") > 0){
                        var arg = arrSource[i].split("=");
                        paramArray[arg[0]] = arg[1];
                    }
                    i++;
                }
            }
            return paramArray;
        };
        var identify = getParam()["p"];// firstLayerInit
        window.firstLayerInit  = (identify=="about")?1:(identify=="join"?2:(identify=="activity"?3:(identify=="condition"?4:(identify=="contact"?5:(identify=="cooperation"?6:1)))));
    }

    function setLayerSlider(){
        $(".app").css({height:winHeight+"px"});
        var scroll = require("page/scroll.js");
        scroll.init();
        if(typeof lsjQuery.fn.layerSlider == "undefined") {
            lsShowNotice('zpContainer','jquery');
        }else if(typeof lsjQuery.transit == "undefined" || typeof lsjQuery.transit.modifiedForLayerSlider == "undefined") {
            lsShowNotice('zpContainer', 'transit');
        }else {
            var a = lsjQuery("#zpContainer").layerSlider({
                width : '100%',
                // height : winHeight+"px",
                height:"655px",
                responsive : true,
                responsiveUnder : 1200,
                sublayerContainer : 1270,
                autoStart : false,// true
                pauseOnHover : true,
                firstLayer : window.firstLayerInit,
                animateFirstLayer : true,
                randomSlideshow : false,
                twoWaySlideshow : true,
                loops : 0,
                forceLoopNum : true,
                autoPlayVideos : false,
                autoPauseSlideshow : 'auto',
                youtubePreview : 'maxresdefault.jpg',
                keybNav : true,
                touchNav : false,

                skinsPath: '',
                skin: 'dazhe/zhaopin/',
                thumbnailNavigation : 'disabled',// hover

                globalBGColor : '',
                navPrevNext : false,
                navStartStop : false,
                navButtons : true,
                hoverPrevNext : false,
                hoverBottomNav : false,
                showBarTimer : false,
                showCircleTimer : false,

                tnWidth : 100,
                tnHeight : 60,
                tnContainerWidth : '60%',
                tnActiveOpacity : 35,
                tnInactiveOpacity : 100,
                imgPreload : true,
                yourLogo : false,
                yourLogoStyle : 'left: 10px; top: 10px;',
                yourLogoLink : false,
                yourLogoTarget : '_self',
                cbInit : function(element) {
                    $(".ls-join-sprite .btn").on("click",function(e){
                        $('#zpContainer').layerSlider(5);
                    });
                    // 配置导航样式
                    $(".ls-bottom-slidebuttons a").each(function(ind, elem){
                        elem.className = "slidebuttons-"+ind;
                    });

                    $("#joinContent").on("click","dt",function(e){
                        var t = $(e.currentTarget), item = t.next();
                        if(e.currentTarget.className.indexOf("active")>-1){
                            item.stop().animate({height:10}, 1000);
                            t.removeClass("active").find("i").text("+");
                        }else{
                            t.addClass("active").siblings("dt").removeClass("active");
                            $("#joinContent dt i").text("+");
                            $("#joinContent dt.active i").text("CLOSE");
                            item.stop().animate({height:item.attr("rel")}, 500);
                            item.siblings("dd").stop().animate({height:10}, 500);
                        }

                    });
                    $(".flexslider").flexslider({
                        animation: "slide",animationLoop: true,controlNav: false,slideshow:false,move:1, direction:"vertical",prevText: "〈",nextText: "〉"
                    });


                },
                cbStart : function(data) { },
                cbStop : function(data) { },
                cbPause : function(data) { },
                cbAnimStart : function(data) { },
                cbAnimStop : function(data) {
                    var curInd = data.nextLayer.index();// +1
                    if(curInd==1&&!setJoinContentHeight){// curInd==2
                        $("#joinContent dd").each(function(ind, elem){
                            var itemHeight = elem.getBoundingClientRect().height||elem.offsetHeight||$(elem).height();
                            while(itemHeight==0){
                                itemHeight = 490;
                                //itemHeight = "100%";
                            }
                            $(elem).attr("rel",itemHeight);
                            $(elem).height(10);
                        });
                        setJoinContentHeight = true;
                        // var itemDdInit = $("#joinContent dd:eq(0)");
                        // $("#joinContent dt:eq(0) i").text("CLOSE");
                        // itemDdInit.stop().animate({height:itemDdInit.attr("rel")}, 1000);

                    }
                },
                cbPrev : function(data) { },
                cbNext : function(data) { }
            });

        }

    }

    lsjQuery(document).ready(function() {
        $.ajax({
            dataType: 'xml',
            url:"https://mat1.gtimg.com/zj/galaxyw/subject2015/zhaopin/assets/data.xml?v=1.0.2",
            //url:"assets/data.xml",
            success:function(xml){
                $(xml).find("root>layer").each(function(ind,elem){
                    var temp = $(elem);
                    var htmlStr = '';
                    switch(temp.attr("name").toLowerCase()){
                        case "about":
                            $("#lsAboutSprite").append(temp.find("content").text());
                            break;
                        case "join":
                            temp.find("content>item").each(function(ind,elem){
                                var item = $(this), closeStatus = "+";
                                htmlStr += '<dt class="active"><h2>'+item.attr("name")+'</h2><i>'+closeStatus+'</i></dt>';
                                htmlStr += '<dd class=""><br>'
                                    /*+'<h3><span>人数 ：'+item.attr("count")+'</span><span>部门 ： '+item.attr("depart")+'</span></h3>'*/
                                    +'<p>'
                                    +'	'+item.find("responsibility").attr("name")+'：<br />'
                                    +item.find("responsibility").text()
                                    +'</p>'
                                    +'<p>'
                                    +'	'+item.find("requirement").attr("name")+'：<br />'
                                    +item.find("requirement").text()
                                    +'</p>'
                                    +'<a class="btn" href="javascript:;">立即申请〉</a>'
                                    +'</dd>';

                            });
                            $("#joinContent").append(htmlStr);
                            break;
                        case "activity":
                            temp.find("content>item").each(function(ind,elem){
                                var item = $(this);
                                var pics = item.attr("pic").split('|'), picStr = '';
                                for(var i=0,len=pics.length;i<len;i++){
                                    picStr += '<p class="pic"><img src="'+pics[i]+'" /></p>';

                                }

                                htmlStr+='<li>'
                                    +'<em class="title">'+item.attr("date")+'</em>'
                                    +'<div class="content">'
                                    +'	<div class="dumascroll">'
                                    +'	<p class="pic">'
                                    //+'		<img src="'+item.attr("pic")+'" />'
                                    +'		<span class="tit">'+item.attr("name")+'</span>'
                                    +'	</p>'
                                    +'	<p class="txt">'
                                    +item.text()
                                    +'	</p>'
                                    + picStr
                                    +'	</div>'
                                    +'</div>'
                                    +'</li>';

                            });
                            $("#activityContent").append(htmlStr);
                            break;
                        case "weal":
                            temp.find("content>item").each(function(ind,elem){
                                var item = $(this);
                                htmlStr+='<h2>'+item.attr("name")+'</h2>'
                                    +'<p>'
                                    +item.text()
                                    +'</p>';
                            });
                            $("#wealContent").append(htmlStr);
                            break;
                        case "contact":
                            temp.find("content").each(function(ind,elem){
                                var item = $(this);
                                $("#contactContent").append(item.text());
                            });
                            break;
                        default:
                            break;
                    };
                });
                setLayerSlider();
            }
        });

    });
});
/*  |xGv00|f20d77330c0873623a1fd46b48cece70 */