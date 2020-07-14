define(function(require) {
    lazyLoadImg.init();
    specPageItem.init();
    jumpTop.init();

    var paraNavObj;     //* Use In Welcomle

    //* Create : Mobile-Welcome-Page
    if($('.pbt_front_container').length>0){
        if(!cbTools.isPC){
            require(['lib/welcome'], function($welcome){
                $welcome.init(lazyLoadImg.setLazyLoad, function(){ return paraNavObj});
            });
        }
    }else{
        supplement.setNoneWelcomePage();
    }

    //* Creata : ParaNavMenu
    if($('.main_nav').length>0){
        require(['lib/paranav'], function($paranav){
            var hasFrontPage = false;
            if($('.pbt_front_container').length == 0){
                hasFrontPage = true;
            }
            $paranav.init(hasFrontPage);
            //
            paraNavObj = $paranav;
        }); 
    }

    //* Create : Video -Singel-Player
    if($('.videoSinglePlayer').length>0){
        require(['lib/videosingle'], function($videoplayer){
            $('.videoSinglePlayer').each(function(index, el) {
                var vid = $(el).attr('data-vid');
                var domId = $(el).attr('id');
                $videoplayer.createVideo(vid,domId,false);
            });
        });
    }

    //* Create : Video-Albumn-Player
    if($('.videoAlbumnPlayer').length>0){
        require(['lib/videoalbumn'],function($videoalbum){
            $('.videoAlbumnPlayer').each(function(index, el) {
                var domEl = $(el);
                //qt add--------
                var qqorcidType = domEl.attr('data-qqorcid-type');
                var cidNum = domEl.attr('data-cid');
                //qt add--------
                var euin = domEl.attr('data-euin');
                var cvid = domEl.attr('data-cvid');
                var bgColorObj = domEl.data("bgcolor");
                var domId = domEl.attr('id');
                //
                if(qqorcidType == 0){
                    //
                    $videoalbum.init_cid(cidNum, bgColorObj, domId);
                }else if (qqorcidType == 1){
                    //
                    $videoalbum.init(euin, cvid, bgColorObj, domId);
                }
                
            });
        })
    }

    //* Create : SubTab
    if($('.pbt_subtabs_grid').length>0){
        require(['lib/subtab'], function($subtab){
            $('.pbt_subtabs_grid').each(function(index, el) {
                var domEP = $(el);
                var objType = domEP.attr('data-type');
                if(objType == 'subTabTB'){
                    $subtab.init_alignTB(domEP.find('.box_subtab'), cbTools.isPC);
                }else if(objType == 'subTabLR'){
                    $subtab.init_alignLR(domEP.find('.box_subtab_PC'), domEP.find('.box_subtab_Mobile'), cbTools.isPC);    
                }
            });
        });
    }

    //* Create : CarouselPhoto
    if($('.carouselPhoto').length>0){
        require(['lib/carouselphoto'], function($carousel){
            $('.carouselPhoto').each(function(index, el) {
                var domEl = $(el);
                $carousel.init(domEl, true);
            });
            
        });
    }
    

    //* Create : live_video
    if($('.live_main').length>0){
        require(['lib/livevideo_requirejs_v2'], function($live_video){
            $('.live_main').each(function(index, el) {
                var domEl = $(el);
                $live_video.init(domEl);
            });
        });
    }
    
    //* Create : hichart
    if($('.hiChart').length>0){
        require(['lib/hichart_requirejs_v1'], function($hiChart){
            $('.hiChart').each(function(index, el) {
                var domEl = $(el);
                $hiChart.init(domEl);
            });            
        });
    }
    
    //* Create : dianzan
    if($('.dianzan_vote').length>0){
        require(['lib/dianzan_requirejs_v1'], function($dianzanObj){
            $('.dianzan_vote').each(function(index, el) {
                var domEl = $(el);
                $dianzanObj.init(domEl);
            });            
        });
    }
    
});

/* Other Supplement */
var supplement = {
    setNoneWelcomePage : function (){
        $('.pbt_main_container').removeClass('anim');
        $('.pbt_main_container').css('top', '0px');
        if($('.main_nav').length>0){
            $('.main_nav').show();
        }
    }
} 

/* Special Image And PC And CopyRight*/ 
var specPageItem = {
    init : function(){
        specPageItem.setLazyIcon();
        specPageItem.justPC();
        specPageItem.setCopyRight();
        specPageItem.styleDoms();
    },

    setLazyIcon : function(){
        var lazyIconDom = $('.lazy-icon');      //* 段落标题模块的Icon-Img : 只针对财经频道
        if(lazyIconDom.length>0){
            lazyIconDom.each(function(index, el) {
                if($(el).attr('data-src') && $(el).attr('data-src') != ''){
                    var original = $(el).attr('data-src');
                    cbTools.manuallyLoadImg(original, function($obj){
                        $(el).attr('src', original);
                        if(!cbTools.isPC){
                            var imgWidth = Math.floor($(el).width()*0.65);
                            $(el).width(imgWidth)
                        }                        
                    });
                }
            });
        }
    },

    justPC : function(){
        if(cbTools.isPC){
            //* Set : PC-Body-BGImg
            var bgUrl = $('body').attr('data-src');
            if(bgUrl !=''){
                $('body').attr('style', 'background-image:url(' + bgUrl + ');');    
            }        

            //* Set : Just For PC-Images - Author 模块：只有 PC 端载入图，Mobile 不载入
            var imgDoms = $(".lazy-pc");
            if(imgDoms.length>0){
                imgDoms.each(function(index, el) {                
                    var imgUrl = $(el).attr('data-src');
                    $(el).attr('src', imgUrl);
                });
            }   
        }
    },

    setCopyRight : function(){
        //* Set : Channel-Logo-size
        if(!cbTools.isQQNews()){
            var logoImgDom = $('#copyrightPanel').find('img.lazyCB');
            if(logoImgDom.length>0){
                var initData = logoImgDom.parent().attr('data-init');
                if(initData !== 'null'){
                    var size = logoImgDom.attr('data-size').split('x');
                    var w = parseInt(size[0], 10); 
                    if(initData === 'default'){
                        logoImgDom.parent().width(w/2);
                    }else if(initData === 'user'){
                        logoImgDom.parent().width(w/2);
                    }
                }else{
                   $('#copyrightPanel .just-mobile').hide(); 
                }
            }
        }else{
            $('#copyrightPanel .just-mobile').hide();
        }  
    },

    styleDoms : function(){
        $('h2').each(function(index, el) {
            if($(el).text() == ''){
                $(el).css('margin-bottom', '0');
            }
        });
    }      
}

/* Btn Jump To Top Obj */ 
var jumpTop = {
    btnOnTop : $('#pbt_backToTop'),    
    init : function(){
        if(jumpTop.btnOnTop.length>0){
            jumpTop.btnOnTop.click(function(event) {
                var scrollDom;
                if(cbTools.isIE()){
                    scrollDom = "html";
                }else{
                    scrollDom = "body";
                }
                $(scrollDom).scrollTop(0);                
            });

            jumpTop.onWindowScroll();
        }
    },

    onWindowScroll : function(){
        var scrollDom;
        if(cbTools.isIE()){
            scrollDom = "html";
        }else{
            scrollDom = "body";
        }
        $(window).scroll(function() {
            var currScrollTop = $(scrollDom).scrollTop();            
            jumpTop.setVisible(currScrollTop);
        })
    },

    setVisible : function ($scrollValue){
        var ratio = 300;
        if($scrollValue>ratio){
            jumpTop.btnOnTop.show();
        }else{
            jumpTop.btnOnTop.hide();
        }
    }
}

/* LazyLoad Obj */ 
var lazyLoadImg = {
    init : function(){
        lazyLoadImg.initMobileOrPcLazyImg();
        lazyLoadImg.initLazyLoadImgDom();
        lazyLoadImg.setLazyLoad();
    },

    initMobileOrPcLazyImg : function(){
        if($("img.MobileOrPC").length>0){
            $("img.MobileOrPC").each(function(index, el) {
                var domImg = $(el);
                var initSize, initSrc;
                if(cbTools.isPC){
                    initSize = domImg.attr('data-pc-size');
                    initSrc = domImg.attr('data-pc-src');
                }else{
                    initSize = domImg.attr('data-mobile-size');
                    initSrc = domImg.attr('data-mobile-src');
                }
                //
                if(initSrc !== ''){
                    domImg.attr('data-size', initSize);
                    domImg.attr('data-original', initSrc);
                }else{
                    domImg.removeClass('lazyCB');
                    domImg.hide();
                }                
            });
        }
    },

    initLazyLoadImgDom : function(){
        //* Special : For OwlCarousel First Image
        if($('.owl-carousel').length>0){
            $('.owl-carousel').each(function(index, el) {
                var imgDom = $(el).children().eq(0).find('img');
                imgDom.removeClass('lazyOwl');
                imgDom.addClass('lazyCB');
                imgDom.attr('data-original', imgDom.attr('data-src'));
            });
        }

        //* Init : LazyCB Size
        var MAX_WRAPPER = 960;
        var pageWidth = $(window).width();
        if (pageWidth < MAX_WRAPPER){
            var padLR = 0;
            if(cbTools.isPC){
                padLR = 40;
            }
            pageWidth = $(window).width() - padLR;     //* 40 : page - paddingLeft and paddingRight
        }

        //
        $('.lazyCB').each(function(index, el) {
            if ($(this).attr('data-size') === undefined || $(this).attr('data-size') === false) {
                return;
            }
            var size = $(this).attr('data-size').split('x');
            var w = parseInt(size[0], 10);
            var h = parseInt(size[1], 10);
            var ratio = pageWidth/w;
            var newWidth, newHeight;            
            if(ratio<1){
                newWidth = Math.floor(pageWidth);
                newHeight = Math.floor(h*ratio); 
                //* Special For : Carousel-First Image
                if($(this).parent().hasClass('item')){
                    if(pageWidth >= MAX_WRAPPER){
                        newWidth = $(this).parent().parent().width();
                        newHeight = Math.floor((newWidth/w)*h);
                    }                    
                }  
            }else{
                //* Special For : Carousel-First Image
                if($(this).parent().hasClass('item')){
                    newWidth = $(this).parent().parent().width();
                    var owlRatio = newWidth/w;
                    newHeight = Math.floor(h*owlRatio);   
                }else{
                    newWidth = w;
                    newHeight = h;
                }
            }
            $(this).attr('style', 'width:' + newWidth + 'px!important;' + 'height:'+ newHeight + 'px!important;' + 'visibility:visible !important;');
        });
    },

    setLazyLoad : function(){
        if($("img.lazyCB").length>0){
            $("img.lazyCB").lazyload({
                threshold : 600,        //* Setting threshold to 200 causes image to load 200 pixels before it appears on viewport.
                skip_invisible : false, 
                load:function(){
                    $(this).attr('style', 'width:auto!important;visibility:visible!important; height:auto!important;');
                }
            });
        }
    }
}

/* tools function */


cbTools.debug('Main Version 3.2');

/*  |xGv00|670f0e7f38a17a847762cc999cfa24ce */