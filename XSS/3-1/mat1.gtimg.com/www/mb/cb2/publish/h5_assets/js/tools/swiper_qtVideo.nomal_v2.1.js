/**
 * Created by qiterqi on 14-11-13.
 */

;(function($){
    $.fn.video_gallery = function(option){
        var opts = $.extend({}, $.fn.video_gallery.defaults, option), //配置选项
            $this = this;
        var selName = ".v"+opts.videoId;

        //数据数组 -----[{title:"广告图片",imgUrl:"assets/images/prj/gallery_img/0.jpg",vidUrl:"#"}];
        var dataArr = opts.videoDataArr;
        //
        var isClickUrl = opts.isClickUrl;
        var galleryBtnBgColor = opts.galleryBtnBgColor;
        
        //
        var slide_startPosX = 0;
        var slide_moveDis = 0;
        var perNum = 3;
        var pageTotalNum = Math.floor(dataArr.length/perNum);//loopNum

        var leavelNum = dataArr.length%perNum;//%num
        var mySwiper = $this.swiper({
        //var mySwiper = new Swiper(selName,{
            mode:'horizontal',
            paginationClickable: true,
            slidesPerView: 1,
            noSwiping:true,
            //
            onSlideChangeStart: function(swiper){
                //
            },
            /* qt add ----------图片浏览翻页完成后 触发事件*/
            onSlideChangeEnd:function(e){
                //
                var pageIndex = e.activeIndex;
                setGallery(pageIndex);
                //

            }
        });

        creatGallery();



        setThumbClear = function (__selectobj){
            //
            var idObj = __selectobj;
            var totalNum = dataArr.length;
            for(var i=0;i<totalNum;i++){
                var videoThumbId = idObj.id;
                var seleteName = ".v"+idObj.index;
                var $videoA = $(seleteName+' .videoStyle').eq(i);
                var titleStr = $videoA.find("p").text();
                //$videoA.html("<img src='http://mat1.gtimg.com/www/mb/cb2/publish/h5_assets/images/icon_play_1.png'><p>"+titleStr+"</p>");
            }

        }

        clickVideo = function (__str) {
        	//
            var idObj = getStrId(__str);
            //
            var videoThumbId = idObj.id;
            var seleteName = ".v"+idObj.index;
            var $videoA = $(seleteName+' .videoStyle').eq(videoThumbId);
            var titleStr = $videoA.find("p").text();
            var vidUrlStr = $videoA.attr("data-vid");
            //
            if(slide_moveDis<10 && vidUrlStr!=""){
                //setThumbClear(idObj);
                //$videoA.html("<span>正在播放...</span><p>"+titleStr+"</p>");
                //eachId:div each id
                //thumbId:video pic id
                //vid: qqVideo vid
                opts.onThumbClick({eachId:idObj.index,thumbId:videoThumbId,vid:vidUrlStr});
            }
            //
        }

        getStrId = function (__str){
            var str = __str;
            var pos0 = str.indexOf("_")+1;
            var pos1 = str.lastIndexOf("_");
            var id0 = str.substring(pos0,pos1);
            var id1 = str.substring(pos1+1);
            return {index:id0,id:id1};
        }

        function creatGallery(){
            //添加id名称，为了判断，在页面上，属于第几个循环的轮播代码
            $this.addClass("v"+opts.videoId);
            $this.addClass("swiper-video-container_hor");

            //创建内容结构
            $this.append('<div class="swiper_video_pic_comments"><!--<div class="title"><span class="pLeft"></span><span class="pRight"></span></div>--><div class="msg"></div></div><div class="galleryBtn"><span class="ctrl_left"></span><span class="ctrl_right"></span></div>');
            var $swiper = $(selName+' .swiper-wrapper');//图片容器结构
            var $swiperMsg = $(selName+' .pointLayer');//图注说明结果
            var $comments = $(selName+" .swiper_video_pic_comments");
            var $slideImg = $(selName+" .swiper-slide img");

            var $container_hor = $this;
            $swiper.html("");
            $swiperMsg.html("");
            $swiperMsg.html("<ul></ul>");
            var len = dataArr.length;
            var startid = 0;
            if(1){
                if(pageTotalNum>=1){
                    for(var i=0;i<pageTotalNum;i++){
                        var noSwiperDrag = "";// "swiper-no-swiping";
                        var className = "point";
                        if(i==0)className = "active";
                        var padding0 = "";
                        var htmlStr="";
                        for(var a =0 ;a<3;a++){
                            var styleStr = "";
                            var titleStr = dataArr[startid].title;
                            var vidUrlStr = dataArr[startid].vidUrl;
                            var imgUrlStr = dataArr[startid].imgUrl;
                            if(startid%perNum==0){
                                styleStr = "float:left;";
                            }else if(startid%perNum==1){
                                styleStr = "float:left;margin-left:0.5%;";
                                if($(window).width()==768 || $(window).width()==1024){
                                    styleStr = "float:left;margin-left:0.7%;";
                                }
                            }else if(startid%perNum==2){
                                styleStr = "float:right;";
                            }
                            var paramStr = "id_"+opts.videoId+"_"+startid;//\""+paramStr+"\"
                            htmlStr +="<a id=qtVideoThumb_"+opts.videoId+"_"+startid+" href='javascript:void(0);' onclick='clickVideo(\""+paramStr+"\");' data-vid="+vidUrlStr+" style='"+styleStr+"background:url("+imgUrlStr+") center center no-repeat; background-size: conver;"+padding0+"'  class='videoStyle'><img src='http://mat1.gtimg.com/www/mb/cb2/publish/h5_assets/images/icon_play_1.png'><p>"+titleStr+"</p></a>";
                            //
                            startid++;
                        }

                        $swiper.append('<div class="swiper-slide '+noSwiperDrag+'">'+htmlStr+'</div>');
                        $swiperMsg.children().append('<li class="'+className+'"></li>');
                    }

                    var htmlStr = "";
                    for(var i=0;i<leavelNum;i++){
                        var styleStr = "";
                        var titleStr = dataArr[startid].title;
                        var vidUrlStr = dataArr[startid].vidUrl;
                        var imgUrlStr = dataArr[startid].imgUrl;
                        if(startid%perNum==0){
                            styleStr = "float:left;";
                        }else if(startid%perNum==1){
                            styleStr = "margin-left:0.7%;";
                        }else if(startid%perNum==2){
                            styleStr = "float:right;";
                        }

                        var paramStr =  "id_"+opts.videoId+"_"+startid;

                        htmlStr +="<a id=qtVideoThumb_"+opts.videoId+"_"+startid+"  href='javascript:void(0);' onclick='clickVideo(\""+paramStr+"\");'  data-vid="+vidUrlStr+" style='"+styleStr+"background:url("+imgUrlStr+") center center no-repeat; background-size: conver;"+padding0+"'  class='videoStyle'><img src='http://mat1.gtimg.com/www/mb/cb2/publish/h5_assets/images/icon_play_1.png'><p>"+titleStr+"</p></a>";
                        //
                        startid++;
                    }
                    //
                    $swiper.append('<div class="swiper-slide '+noSwiperDrag+'">'+htmlStr+'</div>');
                    $swiperMsg.children().append('<li class="'+className+'"></li>');

                }
            }


            //设置两边 翻页按钮背景
            $(selName+" .galleryBtn span").css({backgroundColor:galleryBtnBgColor});
            //
            //
            var $slide = $(selName+" .swiper-slide");
            if($(window).width()<768){
                $slide.css({height:(opts.videoHeight-70)+"px"});
            }
            //
            //启动 updata
            setGallery(0);
            //re init mySwiper
            mySwiper.reInit();

            //----------------------------------------------
            //隐藏按钮层
            var $galleryDiv = $(selName+" .galleryBtn");

            if(len<=3){
                $galleryDiv.hide();
                $(selName+' .swiper-slide').addClass("swiper-no-swiping");
            }


            if($(window).width()<768){
                $galleryDiv.hide();
            }else{
                //$galleryDiv.hide();
                $container_hor.on("mouseover",function(e){
                    if(len>3) $galleryDiv.show();
                });
                $container_hor.on("mouseout",function(e){
                    $galleryDiv.hide();
                    //$galleryDiv.show();
                });
                //
                var $ctrlLeft = $(selName+" .galleryBtn .ctrl_left");
                $ctrlLeft.on("mouseover",function(e){
                });
                $ctrlLeft.on("mouseout",function(e){
                });
                $ctrlLeft.on("click",function(e){
                    //已经是首页了
                    e.preventDefault();
                    //
                    var id = mySwiper.activeIndex;

                    if(id <=0){
                       mySwiper.swipeTo(pageTotalNum);
                    }
                    mySwiper.swipePrev();
                });
                //------------------
                var $ctrlRight = $(selName+" .galleryBtn .ctrl_right");
                $ctrlRight.on("mouseover",function(e){
                });
                $ctrlRight.on("mouseout",function(e){
                });
                $ctrlRight.on("click",function(e){
                    //已经是尾页了
                    e.preventDefault();
                    var id = mySwiper.activeIndex;
                    if(id>=len%perNum-1){
                        mySwiper.swipeTo(0);

                    }
                    mySwiper.swipeNext();

                });



            }

            //点击小圆点按钮，切换页面-------------------
            var $point = $swiperMsg.find("li");
            $point.on("mouseover",function(e){
                $point.css({cursor:"pointer"});
                //
            });
            $point.on("mouseout",function(e){
                $point.css({cursor:null});
                //console.log(this);
            });
            $point.on("click",function(e){
                e.preventDefault();
                var pageId = $(this).index();
                mySwiper.swipeTo(pageId);
            });
            //点击小圆点按钮，切换页面-------------------

            //var $swiper
            $slide.off("touchstart").on("touchstart",$slide_mousedown_handler);
            //
            $slide.off("mousedown").on("mousedown",$slide_mousedown_handler);
            function $slide_mousedown_handler(e){

                slide_moveDis = 0;

                switch(e.type){
                    case "touchstart":
                        break;
                    case "mousedown":
                        slide_startPosX = e.pageX;
                        $slide.off("mousemove").on("mousemove",$slide_mousemove_handler);
                        $slide.off("mouseup").on("mouseup",$slide_mouseup_handler);
                        //
                        break;
                }
                //mousedown时候，显示全部图片

            }
            function $slide_mousemove_handler(e){
                switch(e.type){
                    case "touchmove":
                        break;
                    case "mousemove":
                        break;
                }
            }
            function $slide_mouseup_handler(e){
                switch(e.type){
                    case "touchend":
                        $slide.off("touchmove",$slide_mousemove_handler);
                        break;
                    case "mouseup":
                        slide_moveDis = Math.abs(Number(e.pageX) - Number(slide_startPosX));

                        //
                        break;
                }

            }


        }



        //qt add ----------控制图片注释 内容等 updata
        function setGallery(__currentIndex){
            var currentIndex = __currentIndex;
            //设置高度
            if($(window).width()>=768){
                $this.height(opts.videoHeight);
            }

            //----------------------------------------
            //设置翻页按钮位置
            var $galleryBtn = $(selName+" .galleryBtn");
            //居中的注释掉
            //$galleryBtn.css({top:(stage_videoHeight - 90)/2});
            $galleryBtn.css({top:0});
            //延时加载图片



        }



        //链式返回
        return this;
    };

    $.fn.video_gallery.defaults = {
        advancedSupport:false,
        borderColor:"#b0c8ec",
        bgColorGallery:"#fafafa",
        galleryBtnBgColor:null,
        videoId:0,
        videoDataArr:[],//图片数据数组
        max_videoWidth: 1000000,  //
        videoWidth: 1200,  //
        videoHeight: 220,  //
        isClickUrl: false,  //
        itemSelector: '.swiper-slider', //子元素选择器
        videoPlayer: null,
        onThumbClick: function(obj){ //滑动结束后事件
            //console.log(obj);
        }
    };
    //
})(jQuery);/*  |xGv00|362102d9cd10c4fc56e4ac96bf4f4905 */