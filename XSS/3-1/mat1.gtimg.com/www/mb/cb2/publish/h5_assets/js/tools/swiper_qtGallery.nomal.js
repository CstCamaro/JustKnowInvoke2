/**
 * Created by qiterqi on 14-10-14.
 */

; (function ($) {
    $.fn.gallery = function (option) {
        var opts = $.extend({}, $.fn.gallery.defaults, option), //配置选项
            $this = this;
        var selName = ".g" + opts.galleryId;
        var intervalId = null;
        //如果超过最大宽度，图片轮播的宽度不变
        var max_stageWidth = opts.max_galleryWidth;
        //设定图片浏览高度
        var max_stageHeight = opts.galleryHeight;//最小高度不得少于120px，因为css里面设置了最小高度120px
        var stage_galleryHeight = opts.galleryHeight;//最小高度不得少于120px，因为css里面设置了最小高度120px
        //图片浏览-背景颜色
        var bgColorGallery = opts.bgColorGallery;
        //数据数组 -----[{title:"广告图片",imgUrl:"assets/images/prj/gallery_img/0.jpg",gotoUrl:"#"}];
        var dataArr = opts.galleryDataArr;
        //
        var isClickUrl = opts.isClickUrl;
        var galleryBtnBgColor = opts.galleryBtnBgColor;
        //
        var mySwiperwidth = $this.width();
        var mySwiper = $this.swiper({
            mode: 'horizontal',
            noSwiping: true,
            width: mySwiperwidth,
            //
            onSlideChangeStart: function (swiper) {
                //
                showAllImg(true);
            },
            /* qt add ----------图片浏览翻页完成后 触发事件*/
            onSlideChangeEnd: function (e) {
                //
                var pageIndex = e.activeIndex;
                setGallery(pageIndex);
                //
                setImgShow(pageIndex);

            }
        });

        creatGallery();

        /* resize 响应式宽度适应*/
        //$(window).on("resize",function(e){
        //resizeHandler();
        //});
        function showAllImg (__b) {
            var isShow = __b;
            var $sid = $(selName + " .swiper-wrapper").find(".swiper-slide");
            var $imgAll = $sid.find('img');
            if (isShow) {
                $imgAll.show();
            } else {
                $imgAll.hide();
            }
        }
        function setImgShow (__currentIndex) {
            var curId = __currentIndex;
            var $sid = $(selName + " .swiper-wrapper").find(".swiper-slide");
            showAllImg(false);
            var images = $sid.eq(curId).find('img');
            images.show();
        }
        function creatGallery () {
            //添加id名称，为了判断，在页面上，属于第几个循环的轮播代码
            $this.addClass("g" + opts.galleryId);
            $this.addClass("swiper-container_hor");
            //创建内容结构
            $this.append('<div class="swiper_pic_comments"><div class="title"><span class="pLeft"></span><span class="pRight"></span></div><div class="msg"><div class="controls_page"><div class="pointLayer"></div></div></div> </div><div class="galleryBtn"><span class="ctrl_left"></span><span class="ctrl_right"></span></div>');
            var $swiper = $(selName + ' .swiper-wrapper');//图片容器结构
            var $swiperMsg = $(selName + ' .pointLayer');//图注说明结果
            var $comments = $(selName + " .swiper_pic_comments");

            var $slideImg = $(selName + " .swiper-slide img");
            var $container_hor = $this;
            $swiper.html("");
            $swiperMsg.html("");
            $swiperMsg.html("<ul></ul>");
            var len = dataArr.length;
            for (var i = 0; i < len; i++) {
                var noSwiperDrag = "";// "swiper-no-swiping";
                var className = "point";
                if (i == 0) className = "active";
                $swiper.append('<div class="swiper-slide ' + noSwiperDrag + '"></div>');
                $swiperMsg.children().append('<li class="' + className + '"></li>');
            }

            //设置两边 翻页按钮背景
            $(selName + " .galleryBtn span").css({ backgroundColor: galleryBtnBgColor });
            //
            //
            var $slide = $(selName + " .swiper-slide");
            if ($(window).width() < 768) {
                $slide.css({ height: (opts.galleryHeight - 70) + "px" });
            }
            //
            //启动 updata
            setGallery(0);
            //重载mySwiper
            mySwiper.reInit();

            //
            if ($(window).width() >= 768) {
                var colorUint = opts.borderColor;
                if (colorUint == "") colorUint = "#b0c8ec";
                var $gloDiv = $(".g" + opts.galleryId);
                //
                $gloDiv.css({ border: "1px solid " + colorUint });

                $(selName + ' .swiper-slide').css({ float: "left" });

                $gloDiv.css({ background: bgColorGallery, overflow: "hidden" });

                $comments.insertAfter($gloDiv);

            }

            //响应式，pc版本控制按钮
            //resizeHandler();
            //----------------------------------------------

            //隐藏按钮层
            var $galleryDiv = $(selName + " .galleryBtn");
            if ($(window).width() < 768) {
                $galleryDiv.hide();
            } else {
                //$galleryDiv.hide();
                $container_hor.on("mouseover", function (e) {
                    //alert($galleryDiv);
                    $galleryDiv.show();
                });
                $container_hor.on("mouseout", function (e) {
                    $galleryDiv.hide();
                });
                //
                var $ctrlLeft = $(selName + " .galleryBtn .ctrl_left");
                $ctrlLeft.on("mouseover", function (e) {
                    //$ctrlLeft.css("opacity",0.7);
                    //alert($galleryDiv);
                });
                $ctrlLeft.on("mouseout", function (e) {
                    //$ctrlLeft.css("opacity",1);
                });
                $ctrlLeft.on("click", function (e) {
                    //已经是首页了
                    e.preventDefault();
                    //
                    if (mySwiper.activeIndex <= 0) {
                        mySwiper.swipeTo(len - 1);
                    }
                    mySwiper.swipePrev();

                });
                //------------------
                var $ctrlRight = $(selName + " .galleryBtn .ctrl_right");
                $ctrlRight.on("mouseover", function (e) {
                    //$ctrlRight.css("opacity",0.7);
                });
                $ctrlRight.on("mouseout", function (e) {
                    //$ctrlRight.css("opacity",1);
                });
                $ctrlRight.on("click", function (e) {
                    //已经是尾页了
                    e.preventDefault();
                    if (mySwiper.activeIndex >= len - 1) {
                        mySwiper.swipeTo(0);
                    }
                    mySwiper.swipeNext();
                });



            }

            //点击小圆点按钮，切换页面-------------------
            var $point = $swiperMsg.find("li");
            $point.on("mouseover", function (e) {
                $point.css({ cursor: "pointer" });
                //
            });
            $point.on("mouseout", function (e) {
                $point.css({ cursor: null });
                //console.log(this);
            });
            $point.on("click", function (e) {
                e.preventDefault();
                var pageId = $(this).index();
                mySwiper.swipeTo(pageId);
            });
            //点击小圆点按钮，切换页面-------------------

        }
        function imgadapter (__obj, width, height) {
            var obj = __obj;
            var max_height = height; //设置最大高度
            var max_width = width; //设置最大宽度
            var real_height = obj.height;
            var real_width = obj.width;
            obj.height = max_height;
            obj.width = Math.round(obj.height * real_width / real_height);
            return obj;
        }
        function resizeHandler () {
            var minH = max_stageHeight - 40;
            var stageWidth = $(window).width();
            var stageHeight = $(window).height();
            var $wrapper = $(selName + " .swiper-wrapper");
            var $slide = $(selName + " .swiper-slide");
            var $slideImg = $(selName + " .swiper-slide img");
            var $container_hor = $(selName + " .swiper-container_hor");
            var galleryWidth = stageWidth;

            if (galleryWidth > max_stageWidth) {
                galleryWidth = max_stageWidth;
            }

            if (stageWidth > 767) {
                $wrapper.css({ height: max_stageHeight });
                $slide.css({ height: minH });
                $slideImg.css({ width: 'auto', height: '100%', verticalAlign: top });
            }

            if (stageWidth < 768) {
                $container_hor.css({ margin: 0 });
                $slideImg.css({ width: '100%', height: 'auto', verticalAlign: top });
            }

            $(selName + " .swiper-container_hor").css({ width: galleryWidth });
            $(selName + " .swiper-slide").css({ width: galleryWidth });



            $wrapper.css({ width: galleryWidth * dataArr.length });
            clearTimeout(intervalId);
            intervalId = setTimeout(function () {
                mySwiper.reInit();
                if (stageWidth > 767) {
                    $slide.css({ height: minH });
                }
            }, 800);


        }
        //qt add ----------控制图片注释 内容等 updata
        function setGallery (__currentIndex) {
            var currentIndex = __currentIndex;
            //设置高度
            if ($(window).width() >= 768) {
                $this.parent().height(opts.galleryHeight + 70);
                $this.height(opts.galleryHeight);
            }
            var $swip = $(selName + " .swiper-wrapper");
            var $slide = $swip.find(".swiper-slide");
            var totalPageNum = $(selName + " .swiper-wrapper").find(".swiper-slide").length;
            var $curSlide = $swip.eq(currentIndex);

            var $gloDiv = $(".g" + opts.galleryId);
            var $comments = $gloDiv.parent().find('.swiper_pic_comments');
            var $pointLayer = $gloDiv.parent().find('.pointLayer');
            var $comments_title = $comments.find('.title');
            var $comments_title_span = $comments_title.find('span');
            var $comments_title_ul = $pointLayer.find('ul');
            var $comments_title_ul_li = $pointLayer.find('li');

            $comments_title_span.eq(0).html(dataArr[currentIndex].title);
            $comments_title_span.eq(1).html((currentIndex + 1) + "/" + totalPageNum);
            $comments_title_ul_li.attr("class", "point");
            var $pointLi = $comments_title_ul_li.eq(currentIndex);
            $pointLi.attr("class", "active");

            //----------------------------------------
            //设置翻页按钮位置
            var $galleryBtn = $(selName + " .galleryBtn");
            $galleryBtn.css({ top: (stage_galleryHeight - 60) / 2 });
            //延时加载图片
            var loadDivHeight = 30;
            var $sid = $(selName + " .swiper-wrapper").find(".swiper-slide");

            var $imgAll = $sid.find('img');
            var images = $sid.eq(currentIndex).find('img');

            if (!images.length) {
                var divHeight = opts.galleryHeight;
                var loadingPosY = (divHeight - 60) / 2;
                if ($(window).width() > 768) {
                    //
                } else {
                    loadingPosY = (divHeight - 70) / 2 - 25;
                }
                var loadingStr = "<div class='loadingTxt' style='position:relative;top:" + loadingPosY + "px;color: #5c5c5c;height:" + divHeight + "px;'><span style='padding:5px;color: #2c4bae;height:" + loadDivHeight + "px;line-height: " + loadDivHeight + "px;'>加载中...</span></div>"
                $sid.eq(currentIndex).html(loadingStr);
                var imgDpObj = {};
                var picObj = new Image();
                picObj.onload = function () {
                    picObj.onload = null;
                    //
                    if ($(window).width() >= 768) {

                    } else {
                        $(selName + " .swiper-wrapper").css({ zIndex: -100 });
                    }
                    //
                    var pObj = { width: picObj.width, height: picObj.height };
                    imgDpObj = imgadapter(pObj, 1000000, opts.galleryHeight);
                    //
                    var htmlStr = "";
                    var gotoUrlStr = dataArr[currentIndex].gotoUrl;
                    var imgUrlStr = dataArr[currentIndex].imgUrl;
                    if (isClickUrl) {
                        //
                        htmlStr = "<span></span><a href='" + gotoUrlStr + "'><img src='" + imgUrlStr + "'></a>";
                    } else {

                        htmlStr = "<span></span><img src='" + imgUrlStr + "'>";
                    }
                    $sid.eq(currentIndex).html(htmlStr);
                    //
                    var moveDis = 0;
                    var startPosX = 0;
                    var $img = $sid.eq(currentIndex).find('img');
                    //
                    //very important code image height setting 100%；
                    //$img.css({maxWidth:"auto",maxHeight:"100%"});
                    if ($(window).width() >= 768) {
                        $img.css({ maxWidth: "auto", maxHeight: "100%" });
                    } else {
                        $sid.css({ height: (opts.galleryHeight - 40) + "px" });
                        $img.css({ maxWidth: "auto", maxHeight: opts.galleryHeight - 40 });
                    }
                    $img.off("touchstart").on("touchstart", mousedown_handler);
                    //
                    $img.off("mousedown").on("mousedown", mousedown_handler);
                    //
                    function mousedown_handler (e) {
                        switch (e.type) {
                            case "touchstart":
                                break;
                            case "mousedown":
                                startPosX = e.pageX;
                                $img.off("mousemove").on("mousemove", mousemove_handler);
                                $img.off("mouseup").on("mouseup", mouseup_handler);
                                //
                                break;
                        }
                        //mousedown时候，显示全部图片
                        showAllImg(true);
                    }
                    function mousemove_handler (e) {
                        switch (e.type) {
                            case "touchmove":
                                break;
                            case "mousemove":
                                break;
                        }
                    }
                    function mouseup_handler (e) {
                        switch (e.type) {
                            case "touchend":
                                $img.off("touchmove", mousemove_handler);
                                break;
                            case "mouseup":
                                moveDis = Math.abs(Number(e.pageX) - Number(startPosX));
                                $img.off("mousemove", mousemove_handler);
                                //
                                break;
                        }

                    }
                    //------------------------------------
                    $img.off("click").on("click", function (e) {
                        var gotoUrl = dataArr[currentIndex].gotoUrl;
                        if (moveDis < 10 && gotoUrl != "") {
                            window.location.href = gotoUrl;
                            //$(selName+" .swiper_pic_comments .title span").eq(0).html(dataArr[currentIndex].title+"--"+gotoUrl);
                        }
                    });

                };
                setTimeout(function () {
                    picObj.src = dataArr[currentIndex].imgUrl;
                }, 200);

            }


        }


        //链式返回
        return this;
    };

    $.fn.gallery.defaults = {
        advancedSupport: false,
        borderColor: "#e1e1e1",
        bgColorGallery: "#fafafa",
        galleryBtnBgColor: null,
        galleryId: 0,
        galleryDataArr: [],//图片数据数组
        max_galleryWidth: 1000000,  //
        galleryWidth: 1200,  //
        galleryHeight: 220,  //
        isClickUrl: false,  //
        itemSelector: '.swiper-slider' //子元素选择器
    };
    //
})(jQuery);/*  |xGv00|cc3edecefc2b05a2b5e1abd17d031ea9 */