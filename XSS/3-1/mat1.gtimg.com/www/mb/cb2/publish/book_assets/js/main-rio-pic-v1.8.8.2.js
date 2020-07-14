/*
* PC : 左右翻；Mobile ：上下翻  
*/

var main = {
	init : function($pageIndex, $callback){
        tool.init();
        if(tool.vptg() != 'IE'){
            parallax.initRAF();  //* 定义 requestAnimaiton
        }        
        page.init($pageIndex, $callback);
    }
}

/* Object For : Flip Page - 翻页动画页面 RotateY 的 Degree 跟随 MouseX (TouchX) 变化旋转 */
var page = {
    _elementStyle   : document.createElement('div').style,  // css属性保存对象
    _el : $('.main-container'),
    _pageWidth : $(window).width(),
    _pageHeight : $(window).height(),
    _pageHalf : Math.floor($(window).width()/2),
    _index : 0,                                                 //* 记录当期页 Index
    _oldIndex : 0,                                              //* 记录翻页前的 Index
    _targetIndex :0,                                            //* 记录翻页目标 Index
    _childIndex : 0,                                            //* Just-Mobile : 两栏布局 child-index
    _oldChildIndex : 0,                                         //* Just-Mobile : 两栏布局 child-old-index      
    _domPages : $('.main-container').children('.page'),         //* 所有静态页
    _domTurnContainer : null,                                   //* 当前动态翻页Dom的 container
    _domTurn : null,                                            //* 当前动态翻页Dom    
    _dirTurn : '',                                              //* 当前翻页方向，包括：Next || Prev
    _fireMode : '',                                             //* 触发翻页的方式，包括: CLICK || Drag
    _touchStartValX : 0,                                        //* 触摸开始获取的第一个值
    _touchStartValY : 0,                                        //* 触摸开始获取的第一个值
    _touchDeltaX    : 0,                                        //* 滑动的距离
    _touchDeltaY    : 0,
    _touchDeltaDeg  : 0,                                        //* 滑动的角度    
    _mouseDown : false,                                         //* 判断鼠标是否按下
    _moveInit : false,                                          
    _movePosition   : null,                                     //* 触摸移动的方向（左、右）
    _moveFirstInit  : false,                                    //* 标记是否启动拖拽翻页的操作
    _lockSetTimeOut : false,                                    //* 是否进入 setTimeOut 等待中 : 如果 true 标识是正在翻页
    _touchFirstArea : null,                                     //* 触摸开始所属区域
    _isContinueFlip : false,                                    //* 是否触摸释放后继续完成翻页
    _isKeepDirect : true,                                       //* 翻页过程中是保持同一方向
    _hasInitTouchTurn : false,                                  //* 标记 ：只执行一次    
    temp : 0,
    _fnHasListenAinm : false,                                   //* flip-next是否设置监听 css animation complete 
    _fpHasListenAinm : false,                                   //* prev-next是否设置监听 css animation complete
    _timeStartStamp  : 0,                                       //* 记录 touch-start timestamp 

    _nextCloneDoms : {sl:null,sr:null,af:null,ab:null},			//* 存放 flip-next 内的 clonehtml 的 Dom
    _prevCloneDoms : {sl:null,sr:null,af:null,ab:null},			//* 存放 flip-prev 内的 clonehtml 的 Dom
    _listPageObjs : new Array(),                                //* 存放 obj of all page , 用于标记当前页是否已经执行过 laoding-image
    _totalPage : 0,                                             //* 总页数
    _btnNext : null,                                            //* 按钮-翻下一页    
    _btnPrev : null,                                            //* 按钮-翻上一页
    _btnHome : null,                                            //* 按钮-返回首页 - PC
    _btnMobileHome : null,                                      //* 按钮-返回首页 - Mobile
    _hasPlayTips : false,                                       //* 是否已经播放了提示翻页动画
    _funcAfterFlipDone : null,                                  //* 翻页结束回调函数
    _hasInitClosePopupPanel : false,                            //* 是否已初始化"详情弹层"关闭按钮
    _isDisableTurnHome : true,                                 //* 可选 - 返回首页-只允许点击 “再看一遍” 按钮触发
    _isFireByBtnHome : false,                                   //* 当点击 btnHome 返回 “首页”后设定为 true；默认为 false
    _M_TITLE_IMG_SCALE : 0.7,         

    _isAlwaysOpenShow_BottomShowPageBtn : true,                 //*让最下面翻页按钮 是否一直显示

    init : function($pageIndex, $callback){
        //* init : page index
        if($pageIndex){
            page._index = $pageIndex;
        }        

        //* init : width,height of dom
        page.initStyle();

        //* init : event
        page.initEvent();

        if(tool.vptg() != 'IE'){
            //* 提示动画
            if(!page._hasPlayTips){
                page.showBtnNav(false);
                setTimeout(function() {
                    
                    page.autoPlayTips();
                    if(tool.isPC){
                        //alert('QQBrowser:pc')
                        page.autoKeyTips();
                    }else{
                        //alert('QQBrowserLmobile')
                    }

                }, 500);
            }

            //* 不提示动画 - 直接启动 drag to flip
            //page.page_start();
        }else{
            $('.keyboard-container').css('z-index', '9998');
            page.autoKeyTips();
        }



        //qiter add
        if($(".rio_book").length>=0){

            $('.rio_book').each(function(index, el) {
                olmpicPicObj.init($(el),index);
            });
           
        }

        //* browser - resizing
        $(window).resize(function() {
            page.updateResize();

            //qiter add
            $(".olympic2016").each(function(index, el) {
                olmpicPicObj.resizeHandler(index);
            });

        });

        //* 
        if($callback){
            _funcAfterFlipDone = $callback;
        }

        //*
        if(page._isDisableTurnHome){
            page._isFireByBtnHome = false;
        }else{
            page._isFireByBtnHome = true;
        }


        


    },

    //* When Browser Resizing
    updateResize : function(){
        $('#browserresizing').show();
        //
        page._pageWidth = $(window).width();
        if($('.cb_toolbar').length>0){
            if($('.cb_toolbar').css('display') == 'none'){
                $('.cb_toolbar').height(0);
            }
            page._pageHeight = $(window).height() - $('.cb_toolbar').height();
        }else{
            page._pageHeight = $(window).height();
        }
        page._pageHalf = Math.floor($(window).width()/2);

        //*
        $('.grad-line').height(page._pageHeight);
        $('.main-container').height(page._pageHeight);

        //* reinit : mCustomScrollbar
        var artDomHeight = 0;
        var S_HEIGHT = 150;
        $('.scrollBar-contatiner').each(function(index, el) {
            if($(el).attr('data-type') == '100'){
                if(tool.isPC){
                    artDomHeight = page._pageHeight - S_HEIGHT - 20;
                }else{
                    artDomHeight = page._pageHeight - S_HEIGHT + 30;
                }    
            }else if($(el).attr('data-type') == '100-50'){
                if(tool.isPC){
                    artDomHeight = page._pageHeight - S_HEIGHT - 20;
                }else{
                    artDomHeight = Math.floor( (page._pageHeight - S_HEIGHT - (S_HEIGHT/3) )/2 );
                }
            }else if($(el).attr('data-type') == '60'){
                artDomHeight = Math.floor( (page._pageHeight - (S_HEIGHT/2) )/2 );
            }else if($(el).attr('data-type') == '50'){
                if(tool.isPC){
                    artDomHeight = Math.floor( (page._pageHeight - (2*S_HEIGHT) )/2 );
                }else{
                    artDomHeight = Math.floor( (page._pageHeight - (1.5*S_HEIGHT) )/2 );
                }    
            }else if($(el).attr('data-type') == 'spec-comment'){
                var domTop_Height = $(el).prev('.top-container').outerHeight();
                if(tool.isPC){
                    domTop_Height = domTop_Height + 40;
                    artDomHeight = page._pageHeight - S_HEIGHT - domTop_Height;
                }else{
                    artDomHeight = page._pageHeight - S_HEIGHT - domTop_Height + 30;
                }
            }
            //
            $(el).css('max-height', artDomHeight+'px');
        });

        //console.log('page._pageWidth:' + $(window).width())
        
        //* after : window-resize
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(function(){
            $('#browserresizing').hide();
            //
            page._pageWidth = $(window).width();
            page._pageHalf = Math.floor(page._pageWidth/2);

            //console.log('after-page._pageWidth:' + page._pageWidth);
        
            //* reinit : chrome 有半个像素的空隙
            if(tool.vptg() == 8){
                if(tool.isPC){
                    if( (page._pageWidth%2) != 0){
                        $('.flip-rotating-pages-container').width(page._pageHalf);
                    }else{
                        $('.flip-rotating-pages-container').width('50%');
                    }         
                }     
            }
        }, 250);

        //
        tool.isPC = tool.isPCScreenWidth();
    },

    //* Fire : 提示动画
    autoPlayTips : function(){
        console.log('fire : auto play');
        page.page_click_flip('Next', true);
        return;
    },

    //* KeyTips : 键盘提示动画
    autoKeyTips : function(){
        $('.keyboard-container').fadeIn('fast');
        setTimeout(function() {
            $('.keyboard-container').fadeOut('fast');
        }, 3000); 
    },

    initStyle : function(){
        //* reset : page-height
        if($('.cb_toolbar').length>0){
            if($('.cb_toolbar').css('display') == 'none'){
                $('.cb_toolbar').height(0);
            }
            page._pageHeight = $(window).height() - $('.cb_toolbar').height();
        }

        //* init : page loading-image
        page._totalPage = page._domPages.length;
        page._domPages.each(function(index, el) {
            var pageObj = new Object();
            pageObj.hasLoadImg = false;
            page._listPageObjs.push(pageObj);
        });
        page.loadPagesImages(page._index);

        //set : style of menu-container 
        $('.menu-container').css({
            "top": "auto",
            "bottom": "20px",
            "background-color":"rgba(0,0,0,0)"
        });
        page.showBtnNav(false);

        //
        $('.main-container').height(page._pageHeight);
        if($('.cb_toolbar').length>0){
            if($('.cb_toolbar').css('display') == 'none'){
                $('.cb_toolbar').height(0);
            }
            $('.main-container').css('top', $('.cb_toolbar').height() + 'px');
        }

        //* set : flip-tips in pagebottom
        var html = '<div class="box-flipTips"></div>';
        page._domPages.each(function(index, el) {
            // console.log('total :' + page._domPages.length + ' index:' +index)
            if(index == page._domPages.length-1){
                var domInner = $(el).find('.inner');
                domInner.each(function(indexSub, elSub) {
                    if(indexSub != domInner.length-1){
                        $(elSub).after(html)
                    }
                });
            }else{
                var domInner = $(el).find('.inner');
                domInner.each(function(indexSub, elSub) {
                    $(elSub).after(html)
                });
            }
        })

        //
        $('.main-container').show();
        
        //* 只针对 Chrome : 避免半个像素bug: Screen-Width 为单数是，有半个像素的空隙
        if(tool.vptg() == 8){
            if(tool.isPC){
                if( (page._pageWidth%2) != 0){
                    console.log('chrome')  
                    $('.flip-rotating-pages-container').width(page._pageHalf);
                }
            }
              
        }else{
            //$('.flip-rotating-pages-container').width(page._pageHalf);
        }

        //* Mobile : 
        if(!tool.isPC){
           
        }

        //* 只针对 Android : 外层容器 backface-visibility 必须显示
        if(tool.vptg() == 'Android'){
            $('.flip-rotating-pages-container').css({
                "backface-visibility": "visible",
                "-webkit-backface-visibility": "visible"
            });
        }
        
        //* 设置 内页 scroll
        page.initArticleScroll();

        //* 设置 内页 video-button
        page.initVideoButton();

        //* 显示第一页
        page.setPageDisplay();

        //* 执行背景随手机移动
        parallax.prepare();        

    },

    initEvent : function(){
    	//* 翻页按钮
    	page._btnNext = $('.page-nav-next');
    	page._btnPrev = $('.page-nav-prev');
        page._btnHome = $('.page-nav-home');
        page._btnMobileHome = $('.btn-mobile-home');

    	page._btnNext.click(function(event) {
            //* click-btn to flip
            page.page_click_flip('Next');
        });

    	page._btnPrev.click(function(event) {
    		//* click-btn to flip
        	page.page_click_flip('Prev');
    	});

        page._btnHome.click(function(event) {
            page.page_click_flip('Next');
        });

        page._btnMobileHome.click(function(event) {
            page._isFireByBtnHome = true;
            page.page_click_flip('Next');
        });

        //* init : btn-prev, btn-next, key-board
        page.setBtnNav();
        if(tool.isPC){
            //* KeyBoard:Arrow-Left, Arrow-Right
            $(document).keydown(function(e) {
                switch(e.which) {
                    case 37: // left
                    if(page._hasPlayTips && !page._lockSetTimeOut){
                        if(page._index == 0){
                            //console.log('first page');
                            return;
                        }else{
                            //console.log('Prev');
                            page.page_click_flip('Prev');
                        }
                    }
                    break;

                    case 39: // right
                    if(page._hasPlayTips && !page._lockSetTimeOut){
                        if(page._index == (page._totalPage-1)){
                            if(!page._isDisableTurnHome){
                                page.page_click_flip('Next');
                            }else{
                                console.log('last page');
                            }
                        }else{
                            //console.log('Right');
                            page.page_click_flip('Next');
                        }
                    }
                    break;
                    default: return;    // exit this handler for other keys
                }
                e.preventDefault();     // prevent the default action (scroll / move caret)
            });

            //
            if(tool.vptg() != 'IE'){
                $('.grad-line').height(page._pageHeight);
                if($('.cb_toolbar').length>0){
                    $('.grad-line').css('top', $('.cb_toolbar').height() + 'px');
                }
                page._btnNext.hover(
                    function() {
                        $('.grad-line').show();
                        $('.gl-next').fadeIn('fast'); 
                    }, function() {
                        $('.grad-line').hide();
                        $('.gl-next').fadeOut('fast');
                    }
                );

                page._btnPrev.hover(
                    function() {
                        $('.grad-line').show();
                        $('.gl-prev').fadeIn('fast'); 
                    }, function() {
                        $('.grad-line').hide();
                        $('.gl-prev').fadeOut('fast');
                    }
                );
                //
                $(window).mousemove(function( event ) {
                    if(!page._hasPlayTips){
                        return;
                    }
                    var RATION_PREV = 160;
                    var RATION_NEXT = page._pageWidth - 160; 
                    if(event.pageX <= RATION_PREV){
                        page.showBtnNav(true, 'Prev');
                        if(page._index == page._totalPage-1){
                            page.showBtnNav(true, 'Home');
                        }
                    }else if(event.pageX >= RATION_NEXT){
                        if(page._index == page._totalPage-1){
                            page.showBtnNav(true, 'Home');
                        }else{
                            page.showBtnNav(true, 'Next');
                        }
                    }else{
                        if(page._index == page._totalPage-1){                            
                            page.showBtnNav(true, 'Home');
                        }else{
                            page.showBtnNav(false);
                        }
                        
                    }
                });

                //
                if(tool.isPC){
                    if(page._index == (page._totalPage-1)){
                        console.log('last page')
                        page.showBtnNav(true, 'Home');
                    }
                }

            }else{
                page._hasPlayTips = true;
                page.showBtnNav(true);
            }    
        }     

        //* init : listen : ani-finish-dom && cloneDom
        if(tool.vptg() != 'IE'){
            //* 监听翻页容器
            var domNext = $('#flip-next').find('.flip-rotating-pages-container');
            page.animateComplete(domNext);                                         //* 只需定义一次：监听翻页动画完成

            var domPrev = $('#flip-prev').find('.flip-rotating-pages-container');
            page.animateComplete(domPrev);                                         //* 只需定义一次：监听翻页动画完成

            //* 设置翻页容器内的存放clone内容的元素
            page._nextCloneDoms.sl = $('#flip-next').children('.flip-left-a').children('.flip-html-here');
            page._nextCloneDoms.sr = $('#flip-next').children('.flip-left-a').children('.flip-right-b').children('.flip-html-here');
            page._nextCloneDoms.af = domNext.children('.flip-right-a').children('.flip-rotating-pages-content').children('.flip-html-here');
            page._nextCloneDoms.ab = domNext.children('.flip-left-b').children('.flip-rotating-pages-content').children('.flip-html-here');

            page._prevCloneDoms.sl = $('#flip-prev').children('.flip-right-a').children('.flip-html-here');
            page._prevCloneDoms.sr = $('#flip-prev').children('.flip-right-a').children('.flip-left-b').children('.flip-html-here');
            page._prevCloneDoms.af = domPrev.children('.flip-left-a').children('.flip-rotating-pages-content').children('.flip-html-here');
            page._prevCloneDoms.ab = domPrev.children('.flip-right-b').children('.flip-rotating-pages-content').children('.flip-html-here');
            
            page._nextCloneDoms.sl.empty();
            page._nextCloneDoms.sr.empty();
            page._nextCloneDoms.af.empty();
            page._nextCloneDoms.ab.empty();

            page._prevCloneDoms.sl.empty();
            page._prevCloneDoms.sr.empty();
            page._prevCloneDoms.af.empty();
            page._prevCloneDoms.ab.empty();
        }
        
    },

    //* 初始化创建 : 内页 scroll:{100, 100-50, 60, 50}
    //* 100 表示 scrollBar 的 height 为屏幕整高
    //* 100-50 表示 PC scrollBar 的 height 为屏幕整高；Mobile scrollBar 的 height 占据屏幕高度的一半
    //* 60 表示 scrollBar 的 height 为屏幕整高的 60%
    //* 50 表示 PC scrollBar 的 height 为屏幕整高的50%；Mobile scrollBar 的 height 占据屏幕高度的60%
    initArticleScroll : function(){
        var artDomHeight = 0;
        var S_HEIGHT = 150;
        $('.scrollBar-contatiner').each(function(index, el) {
            if($(el).attr('data-type') == '100'){
                if(tool.isPC){
                    artDomHeight = page._pageHeight - S_HEIGHT - 20;
                }else{
                    artDomHeight = page._pageHeight - S_HEIGHT + 30;
                }  
            }else if($(el).attr('data-type') == '100-50'){
                if(tool.isPC){
                    artDomHeight = page._pageHeight - S_HEIGHT - 20;
                }else{
                    artDomHeight = Math.floor( (page._pageHeight - S_HEIGHT - (S_HEIGHT/3) )/2 );
                }
            }else if($(el).attr('data-type') == '60'){
                artDomHeight = Math.floor( (page._pageHeight - (S_HEIGHT/2) )/2 );
            }else if($(el).attr('data-type') == '50'){
                if(tool.isPC){
                    artDomHeight = Math.floor( (page._pageHeight - (2*S_HEIGHT) )/2 );
                }else{
                    artDomHeight = Math.floor( (page._pageHeight - (1.5*S_HEIGHT) )/2 );
                }    
            }else if($(el).attr('data-type') == 'spec-comment'){
                var domTop_Height = $(el).prev('.top-container').outerHeight();
                if(tool.isPC){
                    domTop_Height = domTop_Height + 40;
                    artDomHeight = page._pageHeight - S_HEIGHT - domTop_Height;
                }else{
                    artDomHeight = page._pageHeight - S_HEIGHT - domTop_Height + 30;
                }
            }

            //
            $(el).css('max-height', artDomHeight+'px');

            //* PC 状态：全部直接设置 Scroller
            if(tool.isPC){
                if($(el).attr('data-spec')!='JustMobile'){
                    $(el).mCustomScrollbar({
                        theme:"minimal-dark"    //* minimal-dark  ; dark-thin;
                    });
                }
            }else{  //* Mobile 状态 - 常规处理：直接设置 Scroller
                if($(el).attr('data-spec')!='PC'){
                    $(el).mCustomScrollbar({
                        theme:"minimal-dark"    //* minimal-dark  ; dark-thin;
                    });    
                }else{
                    //* Mobile 状态 - 特殊化处理：截取 2 行
                    page.initCutLine($(el));
                }
            }
            
        });
    },

    //* Just For Mobile : 截取 2 行，点击弹层显示详情
    initCutLine : function($el){
        var cutDom = $el.find('.cutLine');
        var titleDom = $el.find('h3');
        var isCut = cutDom[0].mlellipsis(2);
        if(isCut){  //* 如果执行了截取，设置点击按钮显示详情面板
            var fullDetail = cutDom.attr('title');
            
            //* 是否显示链接按钮
            var domHerfBtn = cutDom.next().find('.btn');
            var hasAhref = false;
            var cloneAhref;
            if(domHerfBtn.attr('href') != ''){
                hasAhref = true;
                domHerfBtn.parent().hide();
                cloneAhref = domHerfBtn.parent().clone();
            }
            //
            cutDom.addClass('prevent-area');
            //cutDom.css('text-decoration', 'underline');
            //
            titleDom.addClass('prevent-area');
            titleDom.click(function(event) {
                if(hasAhref){
                    cloneAhref = domHerfBtn.parent().clone();
                }
                page.showPopupPanel(fullDetail, hasAhref, cloneAhref);
            });
            //
            cutDom.click(function(event) {
                if(hasAhref){
                    cloneAhref = domHerfBtn.parent().clone();
                }
                page.showPopupPanel(fullDetail, hasAhref, cloneAhref);
            });

            //
            if(!page._hasInitClosePopupPanel){
                $("#ppClose").on("click", function(){
                    $("#popuppanel").hide();
                    var domP = $("#textScroller").find("p");
                    domP.text('');
                    var domBtn = $("#textScroller").find('.btnContainer');
                    domBtn.empty();
                });
                page._hasInitClosePopupPanel = true;
            }
        }
    },

    //* 显示弹层：文字详情
    showPopupPanel : function($txt, $hasAhref, $cloneAhref){
        var domP = $("#textScroller").find("p");
        domP.text($txt);
        //
        if($hasAhref){
            var domBtn = $("#textScroller").find('.btnContainer');
            domBtn.append($cloneAhref);
            domBtn.find('.box-btn').show();
        }
        //
        $("#ppClose").css({"top": 0 + "px", "left" : (page._pageWidth-$("#ppClose").width())/2 + "px"});
        $("#textScroller").css({"top" : "100px"});
        $("#popuppanel").fadeIn("fast");
    },

    //* 初始化：内页视频播放按钮
    initVideoButton : function(){
        $('.box_btn-play').each(function(index, el) {
            if($(el) && $(el).attr("data-vid")){
                $(el).click(function(event) {
                    console.log('show video:' + $(this).attr("data-vid"));
                    var isAutoPlay = true;
                    if(tool.vptg() == 'Android'){
                        isAutoPlay = false;
                    }
                    videoplayer.createVideo($(this).attr("data-vid"), $(this).attr("data-pic"), isAutoPlay, function(){parallax.enable();});
                    //
                    parallax.disable();
                });
            }
        });
    },

    //* 设置：只显示当前索引值的静态页
    setPageDisplay : function(){
    	page._domPages.hide();
        page._domPages.eq(page._index).show();
        
        //* Mobile : 
        if(!tool.isPC){
            var childTotal = page._domPages.eq(page._index).children().length;
            //* 如果：两列布局
            if(childTotal>0){
                page._childIndex = 0;
                page._domPages.eq(page._index).children().eq(page._childIndex).show();
                page._domPages.eq(page._index).children().eq(page._childIndex+1).hide();                
            }    
        }
    	
        $('.main-container').css('visibility', 'visible');
    },

    //* 点击 "翻页按钮" || "KeyBoard" : 根据方向翻页
    page_click_flip : function($dir, $isAuto){
        //
        page.showBtnNav(false);
        //
        if(parallax.chkJumbotron()){
            parallax.disable();
        }
    	//
        page._fireMode = 'CLICK';
        page._isKeepDirect = true;
        page._dirTurn = $dir;
        if(tool.vptg() != 'IE'){
            if(page._dirTurn == 'Next'){
                page._domTurnContainer = $('#flip-next');            	
            }else if(page._dirTurn == 'Prev'){
                page._domTurnContainer = $('#flip-prev');
            }
            page._domTurn = page._domTurnContainer.find('.flip-rotating-pages-container');
            
            //
            page.clone_html();
            if(!$isAuto){
                page.page_turn();
            }else{
                page.page_turn_auto(); 
            }
        }else{
             page.page_turn_ie();
        }
    },

    //* 播放提示动画
    page_turn_auto : function(){
        var targetDeg;
        page._oldIndex = page._index;
        page._targetIndex = page._index;
        page._oldChildIndex = 0;
        page._isKeepDirect = false;

        //
        page._domTurnContainer.show();            
        

        //* 必须延迟执行，否则 css-transform 没有任何效果
        page._lockSetTimeOut = true;
        if(tool.isPC){page._domTurn.addClass('anim_autoplay');}else{page._domTurn.addClass('anim_autoplay_mobile');}        
        //$callback();
    },

    //* Just For IE : Jq-Animation-Page
    page_turn_ie : function(){
        page._oldIndex = page._index;

        var oldInitPos, oldTargetPos, oldPageDom;
        var currInintPos, currTargetPos, currPageDom;
        
        if(page._dirTurn == 'Next'){
            //console.log('Click - Next');
            if(page._index<page._domPages.length-1){
                page._targetIndex = page._index + 1;
                page._index = page._targetIndex;
            }else{
               //console.log('last page');
               page._targetIndex = 0;
               page._index = page._targetIndex;
            }

            //* esc-page - data
            oldInitPos = 0;
            oldTargetPos = -page._pageWidth;
            
            // enter-page - data
            var currInintPos = page._pageWidth;
            var currTargetPos = 0;
            
        }else if(page._dirTurn == 'Prev'){
            //console.log('Click - Prev');
            if(page._index>0){
                page._targetIndex = page._index - 1;
                page._index = page._targetIndex;
            }else{
               //console.log('first page');
            }

            //* esc-page - data
            oldInitPos = 0;
            oldTargetPos = page._pageWidth;
            
            // enter-page - data
            var currInintPos = -page._pageWidth;
            var currTargetPos = 0;
        }

        //
        page._lockSetTimeOut = true;
        page.showBtnNav(false);

        //* esc-page - func
        oldPageDom = page._domPages.eq(page._oldIndex);
        oldPageDom.css('left', oldInitPos + 'px');
        oldPageDom.animate({
            opacity: 0,
            left: oldTargetPos+'px'
        }, 600);
        
        //* enter-page
        currPageDom = page._domPages.eq(page._targetIndex); 
        currPageDom.css('left', currInintPos + 'px');
        currPageDom.addClass('opaque-zero');
        currPageDom.show();
        currPageDom.animate({
            opacity: 1,
            left: currTargetPos+'px'
        }, 600, function() {
            oldPageDom.hide();
            currPageDom.removeClass('opaque-zero');
            page.loadPagesImages(page._index);
            page.setBtnNav();
            page.showBtnNav(true);
            page._lockSetTimeOut = false;
        });
        
    },

    page_turn : function(){
        var targetDeg;
        var initDeg;
        page._oldIndex = page._index;

        if(page._dirTurn == 'Next'){
            console.log('Click - Next')
            initDeg = '0deg';
            if(tool.isPC){
                targetDeg = '-180deg';
            }else{
                targetDeg = '180deg';
            }            
        }else if(page._dirTurn == 'Prev'){
            console.log('Click - Prev')
            initDeg = '0deg';
            if(tool.isPC){
                targetDeg = '180deg';
            }else{
                targetDeg = '-180deg';
            }       
        }
       
        page._index = page._targetIndex;
        //
        page._domTurnContainer.show();            
        page._domTurn.addClass('anim-ease');

        //* 必须延迟执行，否则 css-transform 没有任何效果
        page._lockSetTimeOut = true;
        setTimeout(function() {
            var rotAxis;
            if(tool.isPC){
                rotAxis = 'Y';
            }else{
                rotAxis = 'X';
            }
            console.log('rotAxis:' + rotAxis)
            page._domTurn.css(page._prefixStyle('transform'), 'rotate'+ rotAxis +'(' + targetDeg + ')');
        }, 50);
        
    },

    //* 设置：翻页按钮显示状态
    setBtnNav : function(){
        if(page._index==0){                                                    //* 封面
            var childTotal = page._domPages.eq(page._index).children().length;
            if(childTotal>1){
                if(!tool.isPC){
                   if(page._childIndex == 1){
                        page._btnPrev.show();    
                    }else if(page._childIndex == 0){
                        page._btnPrev.hide(); 
                    }  
                }else{
                    page._btnPrev.hide();
                }                
                page._btnNext.show();
                page._btnHome.hide();
                page._btnMobileHome.hide();   
            }else{
                page._btnPrev.hide();
                page._btnNext.show();
                page._btnHome.hide();
                page._btnMobileHome.hide();
            }
    	}else if(page._index>0 && page._index<(page._totalPage-1)){            //* 内页
    		page._btnPrev.show();
    		page._btnNext.show();
            page._btnHome.hide();
            page._btnMobileHome.hide();
    	}else if(page._index==(page._totalPage-1)){                            //* 封底
            var childTotal = page._domPages.eq(page._index).children().length;
            if(childTotal>1){
                if(!tool.isPC){
                    if(page._childIndex == 1){
                        page._btnNext.hide();   
                        page._btnMobileHome.show();
                    }else if(page._childIndex == 0){
                        page._btnNext.hide();
                        page._btnMobileHome.hide(); 
                    }
                }else{
                    page._btnNext.hide();
                    page._btnHome.show();
                    page._btnMobileHome.show();
                } 
                page._btnPrev.show();  
            }else{
                page._btnPrev.show();
                page._btnNext.hide();
                page._btnHome.show();
                page._btnMobileHome.show();
            }    		
    	}
    },

    //* 设置 ：翻页按钮是否显示
    showBtnNav : function($isShow, $direct){
       
        if(tool.isPC){

             //qt add ------------
            if(page._isAlwaysOpenShow_BottomShowPageBtn){
                $('.menu-container').show();
                return;
            } 
            //qt add ------------

            if($isShow){
                $('.menu-container').show();
                if($direct != null){
                    if($direct == 'Next'){
                        $('.box-nav-next').show();
                        $('.box-nav-prev').hide();
                        $('.box-nav-home').hide();
                    }else if($direct == 'Prev'){
                        $('.box-nav-next').hide();
                        $('.box-nav-prev').show();
                        $('.box-nav-home').hide();
                    }else if($direct == 'Home'){
                        $('.box-nav-next').hide();
                        $('.box-nav-prev').show();
                        $('.box-nav-home').show();
                    }
                }
            }else{
                $('.menu-container').hide();
            }
        }else{
            $('.menu-container').hide();
        }

    },

    //* clone 当前页与目标页的 html
    clone_html : function(){
    	var currIndex, tragetIndex;
        var currPageHtml, targPageHtml;
        currIndex = page._index;
        //console.log('old page : ' + page._index);
    	if(page._dirTurn == 'Next'){
    		if(tool.isPC){
                if((page._index+1) > (page._totalPage-1)){
                    tragetIndex = 0;
                }else{
                    tragetIndex = page._index+1;
                }                
                //console.log('tragetIndex:' + tragetIndex)
                currPageHtml = page._domPages.eq(currIndex).clone();
                targPageHtml = page._domPages.eq(tragetIndex).clone();
            }else{
                page._oldChildIndex = page._childIndex;
                var childTotal = page._domPages.eq(currIndex).children().length;
                if(childTotal>1){
                    console.log('currPage : 2 column');
                    if(page._childIndex == 0){
                        tragetIndex = page._index;
                        currPageHtml = page._domPages.eq(currIndex).children().eq(page._childIndex).clone();
                        targPageHtml = page._domPages.eq(currIndex).children().eq(page._childIndex+1).clone();
                        page._childIndex = page._childIndex + 1;
                    }else if(page._childIndex == 1 ){
                        if((page._index+1) > (page._totalPage-1)){
                            tragetIndex = 0;
                        }else{
                            tragetIndex = page._index+1;
                        }  
                        currPageHtml = page._domPages.eq(currIndex).children().eq(1).clone();
                        //
                        var tagetChildTotal = page._domPages.eq(tragetIndex).children().length;
                        if(tagetChildTotal>1){
                            targPageHtml = page._domPages.eq(tragetIndex).children().eq(0).clone();
                            page._childIndex = 0;
                        }else{
                            targPageHtml = page._domPages.eq(tragetIndex).children().clone();
                            page._childIndex = 0;
                        }
                    }
                }else{
                    console.log('currPage : 1 column')
                    if((page._index+1) > (page._totalPage-1)){
                        tragetIndex = 0;
                        //page._oldChildIndex = 0;
                    }else{
                        tragetIndex = page._index+1;
                    }     
                    currPageHtml = page._domPages.eq(currIndex).children().clone();
                    //
                    var childTotal = page._domPages.eq(tragetIndex).children().length;
                    if(childTotal>1){
                        console.log('tarPage : 2 column');
                        targPageHtml = page._domPages.eq(tragetIndex).children().eq(0).clone();
                        page._childIndex = 0;
                    }else{
                        console.log('tarPage : 1 column');
                        targPageHtml = page._domPages.eq(tragetIndex).children().clone();
                        page._childIndex = 0;
                    }
                }                
            }

            page._targetIndex = tragetIndex;

    		//* reFix : RaidoButton Name
            page.reFixRaidoButton(currPageHtml);
            page.reFixRaidoButton(targPageHtml);

            //
            currPageHtml.css('display', 'block');
            targPageHtml.css('display', 'block');

            
            //* fix ： ios-one-gap-line
            var parallaxImg = currPageHtml.find('.jumbotron-img');
            if(parallaxImg.length>0){
                page.fixFloatToInt(parallaxImg);
            }

            var parallaxImg = targPageHtml.find('.jumbotron-img');
            if(parallaxImg.length>0){
                 page.fixFloatToInt(parallaxImg);
            }

    		page._nextCloneDoms.sl.append(currPageHtml);
    		page._nextCloneDoms.sr.append(targPageHtml);

    		page._nextCloneDoms.af.append(currPageHtml.clone());
    		page._nextCloneDoms.ab.append(targPageHtml.clone());
    		
    	}else if(page._dirTurn == 'Prev'){
    		if(tool.isPC){
                tragetIndex = page._index-1;
                currPageHtml = page._domPages.eq(currIndex).clone();
                targPageHtml = page._domPages.eq(tragetIndex).clone();
            }else{
                page._oldChildIndex = page._childIndex;
                var childTotal = page._domPages.eq(currIndex).children().length;
                if(childTotal>1){
                    console.log('2 column');
                    if(page._childIndex == 0){
                        tragetIndex = page._index-1;
                        currPageHtml = page._domPages.eq(currIndex).children().eq(0).clone();
                        //
                        var tagetChildTotal = page._domPages.eq(tragetIndex).children().length;
                        if(tagetChildTotal>1){
                            targPageHtml = page._domPages.eq(tragetIndex).children().eq(1).clone();
                            page._childIndex = 1;
                        }else{
                            targPageHtml = page._domPages.eq(tragetIndex).children().clone();
                            page._childIndex = 0;
                        }
                    }else if(page._childIndex == 1 ){
                        tragetIndex = page._index;
                        page._targetIndex = tragetIndex;
                        currPageHtml = page._domPages.eq(currIndex).children().eq(page._childIndex).clone();
                        targPageHtml = page._domPages.eq(currIndex).children().eq(page._childIndex-1).clone();
                        page._childIndex = page._childIndex - 1;
                    }
                }else{
                    console.log('1 column')
                    tragetIndex = page._index-1;
                    currPageHtml = page._domPages.eq(currIndex).children().clone();
                    //
                    var childTotal = page._domPages.eq(tragetIndex).children().length;
                    if(childTotal>1){
                        console.log('2 column');
                        targPageHtml = page._domPages.eq(tragetIndex).children().eq(1).clone();
                        page._childIndex = 1;
                    }else{
                        console.log('1 column');
                        targPageHtml = page._domPages.eq(tragetIndex).children().clone();
                        page._childIndex = 0;
                    }
                }
            }

            page._targetIndex = tragetIndex;
            
            //* reFix : RaidoButton Name
            page.reFixRaidoButton(currPageHtml);
            page.reFixRaidoButton(targPageHtml);

            //
    		currPageHtml.css('display', 'block');
    		targPageHtml.css('display', 'block');

            //* fix ： ios-one-gap-line
            var parallaxImg = currPageHtml.find('.jumbotron-img');
            if(parallaxImg.length>0){
                page.fixFloatToInt(parallaxImg);
            }

            var parallaxImg = targPageHtml.find('.jumbotron-img');
            if(parallaxImg.length>0){
                 page.fixFloatToInt(parallaxImg);
            }

    		page._prevCloneDoms.sl.append(currPageHtml);
    		page._prevCloneDoms.sr.append(targPageHtml);

    		page._prevCloneDoms.af.append(currPageHtml.clone());
    		page._prevCloneDoms.ab.append(targPageHtml.clone());
    	}
    },

    //* ReFix : RaidoButton Name 
    reFixRaidoButton : function($domHtml){
        var domRadioWrapper = $domHtml.find('.radio');
        domRadioWrapper.each(function(index, el) {
           var domInput = $(el).children(':first-child');
           var nameDomInput = domInput.attr('name');
           domInput.attr('name', 'clone_' + nameDomInput);
        });
    },


    page_start      : function(){
        page._el.on('touchstart mousedown', page.page_touch_start);
        page._el.on('touchmove mousemove', page.page_touch_move);
        page._el.on('touchend mouseup', page.page_touch_end);
    },

    // page触摸移动start
    page_touch_start: function(e){

        var $domCurrPage = page._domPages.eq(page._index).find(".rio_book");
        var isHaveClass_olympic2016 = $domCurrPage.hasClass('rio_book');
        var isHaveClass_ContextDiv = $(e.target).hasClass('contextDiv');
        //
        if(isHaveClass_olympic2016){
            //
            if(isHaveClass_ContextDiv){
                //console.log($(e.target));
                return;
            }
            
        }


        //* touch 如为以下元素，则终止一切任务
        if($(e.target).parents('.form_wrapper').length ==1 || $(e.target).attr('class') == 'form_wrapper'){
            console.log('nothing : click on form:' + $(e.target));
            return;
        }else if($(e.target).parents('.comment_wrapper').length ==1 || $(e.target).attr('class') == 'comment_wrapper'){
            console.log('nothing : click on form:' + $(e.target));
            return;
        }
        else if($(e.target).hasClass('prevent-area') || $(e.target).parent().hasClass('prevent-area')){
            console.log('<a> prevent-area </a>');
            return;
        }
        //
        if(!page._moveInit && !page._lockSetTimeOut){
            console.log('touch-start');
            page._timeStartStamp = Date.now();
            //
            page._moveInit = true;

            if(e.type == "touchstart"){
                if(tool.isPC){
                    page._touchStartValX = window.event.touches[0].pageX;
                }else{
                    page._touchStartValY = window.event.touches[0].pageY;
                }                
            }else{
                if(tool.isPC){
                    page._touchStartValX = e.pageX||e.x;
                }else{
                    page._touchStartValY = e.pageY||e.y;
                }        
                page._mouseDown = true;
            }
           
            // 设置第一次触摸的所属区域
            var pageCenter;
            if(tool.isPC){
                pageCenter = page._pageWidth/2;    //* 页面中心点
                page._touchFirstArea = (page._touchStartValX - pageCenter) > 0 ? 'AreaB' : 'AreaA' ;  //* Area-A-左侧 , AreaB-右侧     
            }else{
                pageCenter = page._pageHeight/2;   //* 页面中心点
                page._touchFirstArea = (page._touchStartValY - pageCenter) > 0 ? 'AreaB' : 'AreaA' ;  //* Area-A-上侧 , AreaB-下侧  
            }
            console.log('page._touchFirstArea:' + page._touchFirstArea)
        }        
    },

    // page触摸移动move
    page_touch_move : function(e){
        e.preventDefault();
        if(page._moveInit && !page._lockSetTimeOut){
            // 设置变量值
            var moveP;

            // 获取移动的值
            if(e.type == "touchmove"){
                if(tool.isPC){
                    moveP = window.event.touches[0].pageX;
                }else{
                    moveP = window.event.touches[0].pageY;
                }    

                //* Hide : Menu-Nav
                page.showBtnNav(false);

                //* Disalbe : parallax-img
                if(parallax.chkJumbotron()){
                    parallax.disable();
                }

            }else{
                if(page._mouseDown){
                    if(tool.isPC){
                        moveP = e.pageX||e.x;
                    }else{
                        moveP = e.pageY||e.y;
                    }   

                    //* Hide : Menu-Nav
                    page.showBtnNav(false);

                    //* Disalbe : parallax-img
                    if(parallax.chkJumbotron()){
                        parallax.disable();
                    }
                }else return;
            }

            // 设置移动的距离
            if(tool.isPC){
                page._touchDeltaX = moveP - page._touchStartValX;
                //console.log('page._touchDeltaX:' + page._touchDeltaX)
            }else{
                page._touchDeltaY = moveP - page._touchStartValY;
                //console.log('page._touchDeltaYL:' + page._touchDeltaY)
            }            

            // 设置移动方向
            if(!page._moveFirstInit){
                if(tool.isPC){
                    if(page._touchDeltaX==0){
                        return;
                    }
                }else{
                    if(page._touchDeltaY==0){
                        return;
                    }
                }

                //
                if(tool.isPC){page._movePosition = page._touchDeltaX >0 ? 'right' : 'left';}
                else{page._movePosition = page._touchDeltaY >0 ? 'right' : 'left';}
                console.log('page._movePosition:' + page._movePosition)
                
                if(page._touchFirstArea == 'AreaB'){
                    if(page._movePosition == 'right'){
                        return;
                    }else{
                        page._moveFirstInit = true;
                    }
                }else if(page._touchFirstArea == 'AreaA'){
                    if(page._movePosition == 'left'){
                        return;
                    }else{
                        page._moveFirstInit = true;
                    }
                }
            }

            if(page._moveFirstInit){
                // 页面移动 : 翻下一页
                if(page._touchFirstArea == 'AreaB'){
                    //console.log('page._movePosition:' + page._movePosition)
                    if(page._movePosition == 'left'){
                        if(page._isDisableTurnHome){    //* 禁止 : “最后一页” 翻到到 "第一页"
                            if(page._index<page._domPages.length-1){
                                if(!page._hasInitTouchTurn){
                                    page._hasInitTouchTurn = true;
                                    page._fireMode = 'DRAG';
                                    page._dirTurn = 'Next';
                                    page._domTurnContainer = $('#flip-next');
                                    //
                                    page.page_initTouchTurn();
                                }
                                //
                                page.page_translate();
                            }
                            else if(page._index == page._domPages.length-1){
                                if(!tool.isPC){
                                    var childTotal = page._domPages.eq(page._index).children().length;
                                    if(childTotal>1){
                                        if(page._childIndex == 0 || page._oldChildIndex == 0){
                                            if(!page._hasInitTouchTurn){
                                                page._hasInitTouchTurn = true;
                                                page._fireMode = 'DRAG';
                                                page._dirTurn = 'Next';
                                                page._domTurnContainer = $('#flip-next');
                                                //
                                                page.page_initTouchTurn();
                                            }
                                            //
                                            page.page_translate();
                                        }else if(page._childIndex == 1 && page._oldChildIndex == 1){
                                            console.log('last page : nothing');
                                        }                                  
                                    }else{
                                        console.log('last page : nothing');
                                    }
                                }else{
                                    console.log('last page : nothing');
                                }
                            }
                        }else{                          //* 允许 : “最后一页” 翻到到 "第一页"
                            if(page._index<=page._domPages.length-1){
                                if(!page._hasInitTouchTurn){
                                    page._hasInitTouchTurn = true;
                                    page._fireMode = 'DRAG';
                                    page._dirTurn = 'Next';
                                    page._domTurnContainer = $('#flip-next');
                                    //
                                    page.page_initTouchTurn();
                                }
                                //
                                page.page_translate();
                            }
                        }
                        
                    }
                }

                // 页面移动 : 翻上一页
                if(page._touchFirstArea == 'AreaA'){
                    //console.log('page._movePosition:' + page._movePosition)
                    if(page._movePosition == 'right'){   //* Test : 
                        if(page._index>0){
                            if(!page._hasInitTouchTurn){
                                page._hasInitTouchTurn = true;
                                page._fireMode = 'DRAG';
                                page._dirTurn = 'Prev';
                                page._domTurnContainer = $('#flip-prev');
                                //
                                page.page_initTouchTurn();
                            }
                            //
                            page.page_translate();
                        }else if(page._index == 0){
                            if(!tool.isPC){
                                var childTotal = page._domPages.eq(page._index).children().length;
                                if(childTotal>1){
                                    //console.log('page._oldChildIndex:' + page._oldChildIndex);
                                    //console.log('page._childIndex:' + page._childIndex);
                                    if(page._oldChildIndex == 1 || page._childIndex == 1){
                                        if(!page._hasInitTouchTurn){
                                            page._hasInitTouchTurn = true;
                                            page._fireMode = 'DRAG';
                                            page._dirTurn = 'Prev';
                                            page._domTurnContainer = $('#flip-prev');
                                            //
                                            page.page_initTouchTurn();
                                        }
                                        //
                                        page.page_translate();  
                                    }else if(page._oldChildIndex == 0){
                                        console.log('first page : nothing');
                                    }                       
                                }else{
                                    console.log('first page : nothing');
                                }
                            }else{
                                console.log('first page : nothing');
                            }
                           
                        }
                    }
                }
            }
        }
    },

    page_initTouchTurn : function(){
        page._domTurn = page._domTurnContainer.find('.flip-rotating-pages-container');
        //
        page.clone_html();
        //
        page._isContinueFlip = true;
        //
        page._oldIndex = page._index;
        //
        page._domTurnContainer.show();

        console.log('start :: _oldIndex:' + page._oldIndex + ' _Index:' + page._index + ' _targetIndex:' + page._targetIndex);

        console.log('start :: childIndex:' + page._childIndex + ' oldChildIndex:' + page._oldChildIndex);

    },

    page_translate : function(){
        var pageSize, pageCenter;
        if(tool.isPC){pageSize = page._pageWidth;}else{pageSize = page._pageHeight;}
        var pageCenter = pageSize/2;                                                    //* 页面中心点
        //
        var disToCenter;
        if(tool.isPC){disToCenter = Math.abs(page._touchStartValX - pageCenter);}
        else{disToCenter = Math.abs(page._touchStartValY - pageCenter);}                //* '触摸开始获取的第一个值' 与 '中心点' 的距离
        //
        var degAmp = (pageCenter/disToCenter)<2.0 ? (pageCenter/disToCenter):2.0;       //* 角度增幅倍数，离页面中心距离越短，该值越大 
        var degDelta;                                                                   //* 旋转角度值 

        if(page._dirTurn == 'Next'){
            if(tool.isPC){
                degDelta = Math.floor((page._touchDeltaX)*180*degAmp/pageSize);
                if(degDelta<-180) { 
                    degDelta = -180
                }else if(degDelta>0){
                    degDelta = 0
                }    
            }else{
                degDelta = -Math.floor((page._touchDeltaY)*180*degAmp/pageSize);
                if(degDelta>180){ 
                    degDelta = 180
                }else if(degDelta<0){
                    degDelta = 0
                }
            }
        }else if(page._dirTurn == 'Prev'){
            if(tool.isPC){
                degDelta = Math.floor((page._touchDeltaX)*180*degAmp/pageSize);       
                if(degDelta>180) { 
                    degDelta = 180
                }else if(degDelta<0){
                    degDelta = 0
                }     
            }else{
                degDelta = -Math.floor((page._touchDeltaY)*180*degAmp/pageSize);   
                if(degDelta<-180) { 
                    degDelta = -180
                }else if(degDelta>0){
                    degDelta = 0
                }     
            }
            
        }
        page._touchDeltaDeg = degDelta;
        if(page._domTurn != null){
            var rotAxis;
            if(tool.isPC){rotAxis = 'Y'; }else{rotAxis = 'X'; } 
            page._domTurn.css(page._prefixStyle('transform'), 'rotate' + rotAxis + '(' + degDelta +'deg)');
        }
        
    },

    // page触摸移动end
    page_touch_end  : function(e){
        if(page._moveInit && !page._lockSetTimeOut){
            console.log('touch-end');
            page._mouseDown = false;
            //
            if(tool.isPC){page._touchStartValX = 0;}else{page._touchStartValY = 0;}
            //
            page._moveFirstInit = false;
            page._hasInitTouchTurn = false;           
            
            // 页面切换
            if(page._isContinueFlip){
                if(page._domTurn != null){
                    page._domTurn.addClass('anim-ease-short');
                }
                var initDeg = '0deg';
                var targetDeg;
                if(page._dirTurn == 'Next'){
                    //* 增加滑动方向判断，如果为明显的向左滑动，则也做成功翻页
                    if((Date.now()-page._timeStartStamp)<200){
                        if(tool.isPC){targetDeg = '-180deg'}else{targetDeg = '180deg'};
                        page._index = page._targetIndex;
                        page._isKeepDirect = true;
                    }else{
                        if(tool.isPC){
                            if(Math.abs(page._touchDeltaX)>=100){       // 切换成功
                               targetDeg = '-180deg';
                               page._index = page._targetIndex;
                               page._isKeepDirect = true;
                            }else{
                               targetDeg = '0deg';
                               page._index = page._oldIndex;
                               page._isKeepDirect = false;
                            }
                        }else{
                            if(Math.abs(page._touchDeltaY)>=100){       // 切换成功
                               targetDeg = '180deg';
                               page._index = page._targetIndex;
                               page._isKeepDirect = true;
                            }else{
                               targetDeg = '0deg';
                               page._index = page._oldIndex;
                               page._isKeepDirect = false;
                            }
                        }   
                    }          
                }else if(page._dirTurn == 'Prev'){
                    if((Date.now()-page._timeStartStamp)<200){
                        if(tool.isPC){targetDeg = '180deg'}else{targetDeg = '-180deg'};
                        page._index = page._targetIndex;
                        page._isKeepDirect = true;
                    }else{
                        if(tool.isPC){
                           if(Math.abs(page._touchDeltaX)>=100){       // 切换成功
                               targetDeg = '180deg';
                               page._index = page._targetIndex;
                               page._isKeepDirect = true;
                            }else{
                               targetDeg = '0deg';
                               page._index = page._oldIndex;
                               page._isKeepDirect = false;
                            } 
                        }else{
                            if(Math.abs(page._touchDeltaY)>=100){       // 切换成功
                               targetDeg = '-180deg';
                               page._index = page._targetIndex;
                               page._isKeepDirect = true;
                            }else{
                               targetDeg = '0deg';
                               page._index = page._oldIndex;
                               page._isKeepDirect = false;
                            }
                        }
                        
                    }                    
                }

                //* 是否执行自动播放
                if(Math.abs(page._touchDeltaDeg)==0 || Math.abs(page._touchDeltaDeg)==180){
                    console.log('nothing to drag : ' + Math.abs(page._touchDeltaDeg));
                    if(Math.abs(page._touchDeltaDeg)==0){
                        page._isKeepDirect = false;
                    }else if(Math.abs(page._touchDeltaDeg)==180){
                        page._isKeepDirect = true;
                    }
                    //
                    page.afterAnimPageDisplay();
                    //
                    page.resetAnimDom();
                    //
                    console.log('end   :: _oldIndex:' + page._oldIndex + ' _Index:' + page._index + ' _targetIndex:' + page._targetIndex);
                }else{
                    //* 必须延迟执行，否则 css-transform 没有任何效果
                    page._lockSetTimeOut = true;
                    setTimeout(function() {
                        if(page._domTurn != null){
                            var rotAxis;
                            if(tool.isPC){rotAxis = 'Y'}else{rotAxis = 'X'}; 
                            page._domTurn.css(page._prefixStyle('transform'), 'rotate'+ rotAxis +'(' + targetDeg + ')');
                        }                        
                    }, 50);
                    
                }

            }else{
                console.log('error to direct');
                page._domTurn = null;
                page._domTurnContainer = null;
                page._moveInit = false;
            }

            page._isContinueFlip = false;

        }
    },

    //* page-animate-complete
    animateComplete : function($element){
        tool.cssAnimate($element, function(){
            console.log('animate complete:' + page._fireMode);
            //console.log('animate complete new page._index:' + page._index);
            page.afterAnimPageDisplay();
            //
            page.resetAnimDom();
            //
            console.log('end   :: _oldIndex:' + page._oldIndex + ' _Index:' + page._index + ' _targetIndex:' + page._targetIndex);

            console.log('end :: childIndex:' + page._childIndex + ' oldChildIndex:' + page._oldChildIndex);
            
            //* tips 动画播放完成后，执行 "触摸翻页操作"
            if(!page._hasPlayTips){
                page._hasPlayTips = true;
                console.log('auto play complete');
                //* drag to flip
                page.page_start();
                //*
                if(page._index == page._totalPage-1){
                    page.showBtnNav(true, 'Home');
                }
            }

            //* 翻页结束后，回调函数
            if(_funcAfterFlipDone){



                _funcAfterFlipDone(page._index);
            }
        });
    },

    //* set : page show or hide , after animate-flip
    afterAnimPageDisplay : function(){
        //
        page.loadPagesImages(page._index);
        //
        if(tool.isPC){
            page._domPages.eq(page._oldIndex).hide();
            page._domPages.eq(page._index).show();
        }else{
            var childTotal = page._domPages.eq(page._index).children().length;  //* 新页
            //* 如果新页为两列布局
            if(childTotal>1){
                console.log('_isKeepDirect:' + page._isKeepDirect);

                if(page._isKeepDirect){
                    if(page._dirTurn == 'Next'){
                        if(page._childIndex == 1){
                            page._domPages.eq(page._index).children().eq(page._childIndex-1).hide();
                            page._domPages.eq(page._index).children().eq(page._childIndex).show();
                        }else if(page._childIndex == 0){
                            page._domPages.hide();
                            page._domPages.eq(page._index).show();
                            //
                            page._domPages.eq(page._index).children().eq(page._childIndex).show();
                            page._domPages.eq(page._index).children().eq(page._childIndex+1).hide();
                        }

                        if(page._oldIndex == page._totalPage-1){
                            if(page._isFireByBtnHome){
                                //当从最后一页翻到第一页的时候 强制 : page._oldChildIndex == 0
                                page._oldChildIndex = 0;
                            }else{
                                page._oldChildIndex = 1;
                            }

                            if(page._isDisableTurnHome){
                                page._isFireByBtnHome = false;
                            }else{
                                page._isFireByBtnHome = true;
                            }
                            
                        }else{
                            page._oldChildIndex = 1;
                        }

                    }else if(page._dirTurn == 'Prev'){
                        if(page._childIndex == 1){
                            page._domPages.hide();
                            page._domPages.eq(page._index).show();
                            //
                            page._domPages.eq(page._index).children().eq(page._childIndex-1).hide();
                            page._domPages.eq(page._index).children().eq(page._childIndex).show();
                        }else if(page._childIndex == 0){
                            page._domPages.eq(page._index).children().eq(page._childIndex).show();
                            page._domPages.eq(page._index).children().eq(page._childIndex+1).hide();                            
                        }
                        page._oldChildIndex = 0;
                    }
                }else{
                    page._childIndex = page._oldChildIndex;
                    //
                    page._domPages.hide();
                    page._domPages.eq(page._index).show();
                }
            }else{
                page._domPages.hide();
                page._domPages.eq(page._index).show();
            }

            
            //console.log('animateComplete :: 2 column :: childIndex:' + page._childIndex)

            //console.log('animateComplete :: 2 column :: oldChildIndex:' + page._oldChildIndex)


            //* 执行背景随手机移动
            parallax.prepare();            

        }
    },

    //* reset : anim-dom to init , after animate-flip
    resetAnimDom : function(){
        if(page._domTurn != null){
            page._domTurn.css(page._prefixStyle('transform'), 'rotateY(0deg)');
        }
        
        if(page._domTurnContainer != null){
            page._domTurnContainer.hide();
        }

        page.setBtnNav();
        //page.showBtnNav(true);

        if(page._fireMode == 'CLICK'){
            if(page._domTurn != null){
                page._domTurn.removeClass('anim-ease');
                if(!page._hasPlayTips){
                    if(tool.isPC){ page._domTurn.removeClass('anim_autoplay');}else{ page._domTurn.removeClass('anim_autoplay_mobile');}                   
                }
            }
            tool.btnDisalble(page._btnNext, false);
            tool.btnDisalble(page._btnPrev, false);
            tool.btnDisalble(page._btnHome, false);  
            tool.btnDisalble(page._btnMobileHome, false);       
        }
        else if(page._fireMode == 'DRAG'){
            if(page._domTurn != null){
                page._domTurn.removeClass('anim-ease-short');
            }
        }

        page._domTurn = null;
        page._domTurnContainer = null;
        page._dirTurn = '';

        page._nextCloneDoms.sl.empty();
        page._nextCloneDoms.sr.empty();
        page._nextCloneDoms.af.empty();
        page._nextCloneDoms.ab.empty();

        page._prevCloneDoms.sl.empty();
        page._prevCloneDoms.sr.empty();
        page._prevCloneDoms.af.empty();
        page._prevCloneDoms.ab.empty();

        page._lockSetTimeOut = false;
        page._moveInit = false;
    },

    //* 启动载入内页图片
    loadPagesImages : function($index){
        //* load current-page
        page.fireLoadImages($index);
        
        //* load next-page
        if($index < page._totalPage-1){
            page.fireLoadImages($index+1);
        }else{
            page.fireLoadImages(0);
        }

        //* load prev-page
        if($index > 0){
            page.fireLoadImages($index-1);
        }
    },

    //* 载入内页图片
    fireLoadImages : function($index){
        var hasLoaded = page._listPageObjs[$index].hasLoadImg;
        if(!hasLoaded){
            page._listPageObjs[$index].hasLoadImg = true;
            //
            var pageDom = page._domPages.eq($index);
            //console.log('pageDom -' + $index + " :" + pageDom.length)
            
            //* load : bg-Images
            var layerDom = pageDom.find('.loaded');
            layerDom.each(function(index, el) {
                if($(el).attr('data-src') && $(el).attr('data-src') != ''){
                    var original = $(el).attr('data-src');
                    tool.autoLoadImg(original, function($obj){
                        $(el).css({'background-image' : 'url(' + original + ')'});
                    });
                }
            });
            
            //* load : Prj-img-Images
            var imgDoms = pageDom.find('img');
            if(imgDoms.length>0){
                imgDoms.each(function(index, el) {
                    if($(el).attr('data-src') && $(el).attr('data-src') != ''){
                        var original = $(el).attr('data-src');
                        tool.autoLoadImg(original, function($obj, $width){
                            $(el).attr('src', original);
                            if(!tool.isPC){                                
                                if($(el).parent().hasClass('title-img')){
                                    var oriWidth = $obj.width;
                                    $(el).width(Math.floor(oriWidth*page._M_TITLE_IMG_SCALE));
                                }
                            }                            
                        });
                    }else{
                        if(!$(el).attr('src')){
                            $(el).hide();
                        }
                    }
                });
            }else{
                //console.log('no images');
            }
        }else{
            //console.log('已经载入过了!')
        }
    },

    //* 清除小数点，解决 : iOS-browser 翻页过程中有条间隙的 bug
    fixFloatToInt : function($element){
        var t = $element.css(page._prefixStyle('transform'));
        var xPos = t.substring(t.indexOf("(") + 1, t.indexOf(",") - 2);
        $element.css(page._prefixStyle('transform'), "translate(" + parseInt(xPos) + "px ,0px)");
    }, 

    _prefixStyle    : function (style) {
        if ( page._vendor() === false ) return false;
        if ( page._vendor() === '' ) return style;
        return page._vendor() + style.charAt(0).toUpperCase() + style.substr(1);
    },

    _vendor         : function () {
        var vendors = ['t', '-webkit-t', 'MozT', 'msT', 'OT'],
            transform,
            i = 0,
            l = vendors.length;

        for ( ; i < l; i++ ) {
            transform = vendors[i] + 'ransform';
            if ( transform in page._elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
        }
        return false;
    }

}

/* Object For : BgImg-Moving 背景跟随手机移动 */
var parallax = {
    startPos : 0,
    endPos : 0,
    currBgDom : null,
    MAGIC_NUMBER : 1,
    hw : 0,
    ix : 0,
    cx : 0,
    mx : 0,
    vx : 0,
    frictionX : 0.1, 
    raf : null,
    enabled : false,

    prepare : function(){
        //* 针对手机 ：设置所有需要'背景随手机移动'的图片-style
        if(!tool.isPC){
            page._domPages.each(function(index, el) {
                if($(el).attr('data-type') == 'jumbotron-bg-img'){
                    var bgDom = $(el).find('.jumbotron-img');
                    parallax.initBGStyle(bgDom);
                }    
            });
        }

        if(parallax.chkJumbotron()){
            var bgDom = page._domPages.eq(page._index).find('.jumbotron-img');
            parallax.init(bgDom);
        }
    },

    chkJumbotron : function(){
        if(tool.vptg()=='IE'){
            return false;
        }

        if(!tool.isPC){
            var pageType = page._domPages.eq(page._index).attr('data-type');
            if(pageType == 'jumbotron-bg-img'){
                return true;
            }else{
                return false;
            }
        }
    }, 

    init : function($dom){
        parallax.ix = 0;
        parallax.cx = 0;
        parallax.mx = 0;
        parallax.vx = 0;
        parallax.currBgDom = $dom;
        parallax.enable();
    },

    initBGStyle : function($dom){
        var bgImgHeight = page._pageHeight;
        var bgImgWidth = Math.floor((bgImgHeight/1080)*1920);
        
        $dom.css({
            "background-size": bgImgWidth + 'px ' +bgImgHeight + 'px',
            "width": bgImgWidth + 'px',
            "height": bgImgHeight + 'px',
            "left" :  -(bgImgWidth-page._pageWidth)/2 + 'px',
            "transform" : "translate(0px ,0px)"
        });

        parallax.endPos = $dom.width()-page._pageWidth;

        parallax.hw = page._pageWidth / 2;
    },

    enable : function() {
        if (!parallax.enabled) {
            parallax.enabled = true;
            //* 重力感应
            if (window.DeviceOrientationEvent) {
                console.log('support deviemotion');
                window.addEventListener('deviceorientation', parallax.onDeviceOrientation);
                //window.addEventListener('mousemove', parallax.onMouseMove);
            }else{
                window.addEventListener('mousemove', parallax.onMouseMove);
            }

            //* requestAnimationFrame : 启动-逐帧动画
            parallax.raf = requestAnimationFrame(parallax.onAnimationFrame);
        }
    },

    disable : function() {
        if (parallax.enabled) {
            parallax.enabled = false;
            if (window.DeviceOrientationEvent) {
                window.removeEventListener('deviceorientation', parallax.onDeviceOrientation);
            } else {
                window.removeEventListener('mousemove', parallax.onMouseMove);
            }
            cancelAnimationFrame(parallax.raf);
        }
    },

    onMouseMove : function(event) {
        // Calculate Input
        parallax.ix = (event.pageX - parallax.hw) / parallax.hw;
        //console.log(parallax.ix)
    },

    onAnimationFrame : function() {
        var dx = parallax.ix - parallax.cx;
        
        parallax.mx = dx * 100*6;
        if(parallax.mx <= -parallax.endPos/2){
            parallax.mx = -parallax.endPos/2;
        }

        if(parallax.mx>=parallax.endPos/2){
            parallax.mx = parallax.endPos/2;
        }

        parallax.vx += (parallax.mx - parallax.vx) * parallax.frictionX;    //* 缓动设置，达到 ease-out 效果
        parallax.setPosition(parallax.vx);
        parallax.raf = requestAnimationFrame(parallax.onAnimationFrame);    // 如果想得到连贯的逐帧动画，函数中必须重新调用 requestAnimationFrame()
    },

    setPosition : function($toLeft){
        if(parallax.currBgDom != null){
            parallax.currBgDom.css(page._prefixStyle('transform'), "translate(" + $toLeft + "px ,0px)");
        }
    },

    onDeviceOrientation : function(event){
        // Validate environment and event properties.
        if (event.beta !== null && event.gamma !== null) {
            // Extract Rotation
            var y = (event.gamma || 0) / parallax.MAGIC_NUMBER; //  * Gamma代表了设备绕Y轴的旋转,就是表示设备在竖着状态时,左右垂直旋转的角度,它的值在-180度-180度之间
            
            // Calculate Input
            parallax.ix = y/180;
            //parallax.cx = y;
        }
    },


    //* 功能等同于 setInterval , 并且效率更高
    initRAF : function(){
        //* Define : requestAnimationFrame
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];

        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
        }

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }

    }


}

/* 视频对象 */
var videoplayer = {
    createVideo : function ($vid, $vpic, $isAutoPlay, $closeCallBack){




        var video, player;
        var html = '<div id="mainvideo" class="main-video" style="display:block;">'
            html +=     '<div class="close" id="close"><i class="ico"></i></div>'
            html +=     '<div id="mod_player"></div>'
            html += '</div>';
        $('body').append(html);

        var scale = 16/9;
        var v_width = page._pageWidth > 800 ? 800 : page._pageWidth;
        var v_height = v_width / scale;
        var x_pos = (page._pageHeight - v_height)/2;
        var y_pos = (page._pageWidth - v_width)/2;
        $("#mod_player").css({"top": x_pos + "px", "left" : y_pos + "px"});
        $("#close").css({"top": x_pos -100 + "px", "left" : (page._pageWidth-$("#close").width())/2 + "px"});

        //
        $("#close").on("click", function(){

            console.log("关闭")
            $("#mainvideo").remove();
            video = null;
            player = null;
            if($closeCallBack){
                $closeCallBack();
            }
        });
        
        //
        video = new tvp.VideoInfo();
        video.setVid($vid);
        player = new tvp.Player();
        player.create({
            width: v_width,
            height: v_height,
            video:video,
            modId:"mod_player",                          
            pic: $vpic,
            flashWmode:"direct",            //* 避免 IE8 遮挡 flashWmode:"transparent" , web-kit 使用 flashWmode:"direct"
            autoplay:$isAutoPlay
        });
        //
        setTimeout(function(){
            $("#mod_player>div").height( page._pageWidth / scale);
        }, 100);
    }
}

/* Object For : Tools */
var tool = {
    isPC : true,

    init : function(){
       tool.isPC = tool.isPCScreenWidth();
    },

    getHashIndex : function(){
        var index = 0;
        if(window.location.hash){
            if(parseInt(window.location.hash.substr(1))){
                index = parseInt(window.location.hash.substr(1));
            }else{
                index = 0;
            }
        }
        return index;
    },

    cssAnimate : function($element, $callback){
        $element.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e){ 
            $callback();
        });
    },

    btnDisalble : function($element, $isDisable){
        if($isDisable){
            $element.css('pointer-events', 'none');
        }else{
            $element.css('pointer-events', 'auto');
        }
    },

    //* 动态载入图片，并监测图片是否载入完成
    autoLoadImg : function(src, callback){
        var tmpImg = new Image();                           
        tmpImg.onload = function(){                         
            tmpImg.onload = null;
            callback(tmpImg);
            tmpImg = null;          
        }
        tmpImg.src = src;
    },

    isPCScreenWidth : function (){
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        if(x>=768){
            return true;
        }else{
            if(tool.vptg()== 3){
                return true;
            }
            return false;
        }
    },

    vptg : function() {
        var dvid = 0;
        var nvua = navigator.userAgent;

        if (nvua.indexOf("Android") > -1) {
            dvid = 1;
            if (Math.floor(navigator.userAgent.substr(nvua.indexOf("Android") + 8, 1)) >= 4) {
                dvid = 2
            }
            dvid = 'Android';
        }
        if (nvua.indexOf("Chrome/") > -1){
            dvid = 8;
        }
        if (nvua.indexOf("iPad") > -1) {
            dvid = 3
        }
        if (nvua.indexOf("iPhone") > -1) {
            dvid = 4;
            if (window.devicePixelRatio >= 2) {
                dvid = 5;
                if (window.screen.height == 568) {
                    dvid = 5;
                }
            }
        }
        if (nvua.indexOf("MSIE") > -1){
            dvid = 'IE';
        }
        return dvid;
    }
}




/* PhotoSwipe */ 
var photoSwipeObj = {
    init : function($items, $index){
        photoSwipeObj.openPhotoSwipe($index, $items);
    },

    parseThumbnailElements : function($domListThumb){
        var items = [];
        $domListThumb.each(function(index, el) {
            var largeSrc = $(this).attr('data-large');
            var size = $(this).attr('data-size').split('x');
            var title = $(this).attr('data-title');
            // create slide object
            var item = {
                src: largeSrc,   //* 大图  src
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
                title : title
            };
            //
            items.push(item);
        });

        return items;
    },

    openPhotoSwipe : function($index, $items){
        var pswpElement = document.querySelectorAll('.pswp')[0];

        // define options (if needed)
        var options = {
            index: $index,

            history: false,
            focus: false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0,
            loop : false,
            shareEl : false,                
            fullscreenEl : false,   
            closeOnVerticalDrag:false,
            closeOnScroll:false,
            clickToCloseNonZoomable: false,
            bgOpacity:1,       
            counterEl : false
            
        
        };
        
        //
        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, $items, options);
        gallery.init();
    },

    createPhotoSwipeDom : function($target){
        var html = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"> <div class="pswp__bg"></div> <div class="pswp__scroll-wrap"> <div class="pswp__container"> <div class="pswp__item"></div> <div class="pswp__item"></div> <div class="pswp__item"></div> </div> <div class="pswp__ui pswp__ui--hidden"> <div class="pswp__top-bar"> <div class="pswp__counter"></div> <button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> <div class="pswp__preloader"> <div class="pswp__preloader__icn"> <div class="pswp__preloader__cut"> <div class="pswp__preloader__donut"></div> </div> </div> </div> </div> <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> <div class="pswp__share-tooltip"></div> </div> <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"> </button> <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"> </button> <div class="pswp__caption"> <div class="pswp__caption__center"></div> </div> </div> </div> </div>';
        $target.append(html)
    }
}

/* 奥运图片展示 */
var olmpicPicObj = {

    index:null,
    $rootTag:null,
    $picTag:null,
    totalPicNum:0,
    currIndex:0,
    picDataArr:null,
    itemCol:4,
    maxTotalPic:20,
    maxTitleLen:200,
    isShowBigText:true,
    
    init : function($tag,index){
        //
        olmpicPicObj.index = index;
        olmpicPicObj.$rootTag = $tag;
        olmpicPicObj.buildPicList($tag,index);
        //设置id
        olmpicPicObj.$rootTag.parent().attr("id","rio_book_"+index);
        olmpicPicObj.$rootTag.parent().attr("data-current",0);
        /*setTimeout(function(){
            olmpicPicObj.resizeHandler(index);
            console.log("resizeHandler");            
        },1500)*/
    },

    buildPicList : function($target,index){
        var _this = this;
        //
        if($target.length>0){
            //
            var $picList = $target.find(".rio_show_list");
            var $picLi = $picList.find("li");
            var picNum = $picLi.length;
            var thumbPath = $picLi.eq(0).attr("data-large-pic-path");

            $picLi.attr("data-item",index);
            
            $picTag = $picList;

            for(var i=0;i<picNum;i++){
                var $spanBg = $picLi.find("span").eq(i);
                var small_thumbPath = $picLi.eq(i).attr("data-thumb-path");
                olmpicPicObj.showThumbList($spanBg,small_thumbPath);
            }
            //
            olmpicPicObj.totalPicNum = picNum;
            olmpicPicObj.picDataArr = olmpicPicObj.picDataList($target);
            olmpicPicObj.showBigPic(index,thumbPath,"");
            olmpicPicObj.resizeHandler(index);
            olmpicPicObj.buildClickEvent(index);
            //预加载第二张图片
            _this.preloadimages([$picLi.eq(1).attr("data-large-pic-path")]);

        }

    },
    picDataList : function($target){
        var _this = this;
        var picDataArr = [];
        if($target.length>0){
            //
            var picDataArr = [];
            var $picList = $target.find(".rio_show_list");
            var $domPic = $picList.find("li");
            $domPic.each(function(index, el) {
                if(picDataArr.length>(_this.maxTotalPic-1)){
                    $(el).remove();
                    return;
                }
                var thumbPath = $(el).attr("data-thumb-path");
                var largeSrc = $(el).attr("data-large-pic-path");
                var size = $(this).attr('data-size').split('x');
                var title = $(this).attr('data-title');
                var item = {
                    small_src:thumbPath,
                    src: largeSrc,   //* 大图  src
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10),
                    title : title
                };
                picDataArr.push(item);
            });
            
        }
        return picDataArr;
    },

    resizeHandler : function(__index){

        var _this = this;
        var pageWidth = $(window).width();
        var pageHeight = $(window).height();
        var halfPageWidth = pageWidth*0.25;

        var itemId = __index;
        var $root = $(".olympic2016").eq(itemId);
        var $rio_list_pic = $root.find(".rio_list_pic");
        var $rio_bottom_text = $root.find(".rio_bottom_text");
        var $rio_big_container = $root.find(".rio_big_container");
        var $rio_mobile = $root.find(".rio_mobile");
        var $li = $rio_list_pic.find("li");

        if($li.length>0){
            //mobile
            if(!tool.isPC){
                $rio_list_pic.hide();
                //$rio_list_pic.find("ul").html("");
                $rio_big_container.hide();
                $rio_big_container.html("");

                //var thumbPath = $li.eq(0).attr("data-thumb-path");
                var thumbPath = $li.eq(0).attr("data-large-pic-path");
                var title = $li.eq(0).attr("data-title");
                title = _this.getCheckString(title);

                var $domBigPic = $rio_mobile.find(".title-img img");
                $domBigPic.attr({"src":thumbPath});
                $domBigPic.show();

                var $domTitle = $rio_mobile.find(".title_container p");
                //$domTitle.html(title);

                var pageNumDom = '<span class="pageTextNum">1/'+$root.find("li").length+'</span>';
                $domTitle.html(pageNumDom+title);
                //console.log(pageNumDom);

            }else{

                $rio_list_pic.show();
                //$rio_bottom_text.show();
                $rio_big_container.show();
                $rio_mobile.hide();

                var widthPercent = 0;
                var $mask = $rio_list_pic.find("li .mask");
                var $li = $rio_list_pic.find("li span");
                //var liWidth = $li.width();
                var liWidth = Math.abs(halfPageWidth*0.8/_this.itemCol)-3;
                var obj = {width:liWidth,height:liWidth};
                $li.css(obj);
                $mask.css(obj);
                //
                var $rio_bottom_text = $root.find(".rio_bottom_text");
                
                var navHeight = $(window).height()*0.05;
                var h = $(window).height() - thumbHeight - navHeight;
                var top = thumbHeight+navHeight - 10;
                $rio_bottom_text.css({height:"auto","bottom":"0%"});
                var thumbHeight = $root.find(".rio_show_list").outerHeight();
                //var marginTop = ($(window).height()-40-thumbHeight-150)/2;
                //$root.find(".rio_show_list").css({"margin-top":marginTop});
                //
                var $contextDiv = $root.find(".contextDiv");
                var $prev_next_btn = $contextDiv.find("span");
                $contextDiv.css({height:pageHeight});
                //
                var title = $li.parent().eq(0).attr("data-title")
                title = _this.getCheckString(title);
                var $article = $root.find(".rio_bottom_text .article-block");
                $article.html(title);
                //
                var $pageshow = $root.find(".rio_bottom_text .pageshow");
                $pageshow.html("1/"+$li.length);
                //------------------------------------
                var $bigPicText = $rio_big_container.find(".rio_big_bottom_text .text_content");
                $bigPicText.html(title);
            }
            

        }

    },
    buildClickEvent : function(__index){
        var _this = this;
        var itemId = __index
        var $root = $(".olympic2016").eq(itemId);
        var $li = $root.find("li");
        if($root.length>0){
            $li.click(function(e){
                var indexId = $li.index(this);
                //var thumbPath = $(this).attr("data-thumb-path");
                var thumbPath = $(this).attr("data-large-pic-path");
                var thumbInfoText = $(this).attr("data-title");
                thumbInfoText = _this.getCheckString(thumbInfoText);
                var liItem= $(this).attr("data-item");
                $li.removeClass("active");
                $(this).addClass("active");
                //
                var $root = $(".olympic2016").eq(itemId);
                $root.attr("data-current",indexId);
                //
                olmpicPicObj.currIndex = indexId;
                olmpicPicObj.showBigPic(liItem,thumbPath,thumbInfoText);
                //
            });
            //
            var $prevBtn = $root.find(".preArrow");
            var $nextBtn = $root.find(".nextArrow");
            $prevBtn.attr("data-item",__index);
            $nextBtn.attr("data-item",__index);
            if(tool.isPC){
                /*$prevBtn.hover(function(){
                        $(this).addClass('divOver');        
                    },function(){
                        //鼠标离开时移除divOver样式
                        $(this).removeClass('divOver'); 
                    }
                );*/
                $prevBtn.click(function(e){
                    var itemId = $(this).attr("data-item");
                    olmpicPicObj.prevPic(itemId);
                });

                $nextBtn.click(function(e){
                    var itemId = $(this).attr("data-item");
                    olmpicPicObj.nextPic(itemId);
                });

                var $ArrowPicIcon = $root.find(".rio_big_bottom_text .leftArrowPic");
                $ArrowPicIcon.click(function(e){
                    if(_this.isShowBigText){
                        $(this).parent().addClass("open");
                    }else{
                        $(this).parent().removeClass("open");
                    }
                    _this.isShowBigText = !_this.isShowBigText;
                });

                $ArrowPicIcon.on("mouseover",function(e){
                    if(_this.isShowBigText){
                        $(this).attr("title","关闭文字说明")
                    }else{
                        $(this).attr("title","打开文字说明")
                    }
                });

            }else{
                $prevBtn.bind("touchend",function(e){
                    var itemId = $(this).attr("data-item");
                    olmpicPicObj.prevPic(itemId);
                });

                $nextBtn.bind("touchend",function(e){
                    var itemId = $(this).attr("data-item");
                    olmpicPicObj.nextPic(itemId);
                });
                
            }
            

        }

    },
    showThumbList : function($target_spanBg,__picUrlPath){
        var picUrlPathStr = __picUrlPath;
        $target_spanBg.css({
            'display':'block',
            'background' : 'url(' + picUrlPathStr + ') center center',
            'background-size'  : 'cover'
        });
    },
    showBigPic : function(__item,__picUrlPath,__textStr){
        var _this = this;
        var itemId = __item;
        var picPath = __picUrlPath;
        var textStr = __textStr;
        textStr = _this.getCheckString(textStr);
        var $root = $(".olympic2016").eq(itemId);
        var curPage = Number($root.attr("data-current"))||0;
        var $bigContainer = $root.find(".rio_big_container");
        if(!tool.isPC){
            //
            $bigContainer = $root.find(".rio_mobile");
            $domPageNum = $bigContainer.find(".pageNum");
            $domTitle = $bigContainer.find(".title_container p");
            var percent = (curPage+1)/$root.find("li").length;
            var $domPercent = $domPageNum.find("span");
            $bigContainer.show();
            $domPercent.css({width:$(window).width()*percent});

            var pageNumDom = '<span class="pageTextNum">'+(curPage+1)+'/'+$root.find("li").length+'</span>';
            $domTitle.html(pageNumDom+textStr);
            //
        }
        //
        var $root = $(".olympic2016").eq(itemId);
        var $article = $root.find(".rio_bottom_text .article-block");
        var $pageshow = $root.find(".rio_bottom_text .pageshow");
        $article.html(textStr); 
        //
        var $bigPicText = $bigContainer.find(".rio_big_bottom_text .text_content");
        $bigPicText.html(textStr);
        //
        var $bigPageshow = $root.find(".rio_big_bottom_text .pageshow");
        $bigPageshow.html((curPage+1)+"/"+$root.find("li").length);
        //
        var currId = $root.find("ul .active").index();
        if(currId==-1){
            $root.find("ul li").eq(0).attr("class","active");
        }else{
            $pageshow.html((curPage+1)+"/"+$root.find("li").length);
        }
        
        //
        var $titleImgContainer = $root.find(".title-img");
        $titleImgContainer.html("");
        $titleImgContainer.html("<img src='"+picPath+"'>");
        var img = new Image();
        img.onload = function(){
            if(this.width>this.height){
                //row
            }else{
                //col
                var percentNum = 0.65;
                if(!tool.isPC){percentNum = 1;}
                var whObj = _this.autoResizeImage($(window).width()*percentNum,($(window).height()-140),img);
                $titleImgContainer.find("img").css("width",whObj.width,"height",whObj.height);
            }            
        }
        img.src = picPath;

    },
    nextPic : function(__item){
        var _this = this;
        var itemId = __item;
        var $root = $(".olympic2016").eq(itemId);
        var curPage = Number($root.attr("data-current"));
        var $li = $root.find("li");
        if(curPage>=0 && curPage<$li.length-1){
            var currentId = $root.attr("data-current");
            currentId++;
            $root.attr("data-current",currentId);
            $li.removeClass("active");
            var $tagli = $li.eq(currentId);
            var thumbPath = $tagli.attr("data-large-pic-path");
            var thumbInfoText = $tagli.attr("data-title");
            thumbInfoText = _this.getCheckString(thumbInfoText);
            $tagli.addClass("active");
            olmpicPicObj.showBigPic(itemId,thumbPath,thumbInfoText);
            //
            //预加载图片
            var preloadId = currentId;
            var largePic01 = $li.eq(currentId+1).attr("data-large-pic-path");
            var largePic02 = $li.eq(currentId+2).attr("data-large-pic-path");
            if(largePic01!=null && largePic02!=null ){
                _this.preloadimages([
                    largePic01,
                    largePic02
                ]);
            }
            
        }else{

            $root.attr("data-current",$li.length-1);
            if($root.children().eq(0).find(".alertPrevPage").length==0){
                $root.children().eq(0).append("<div class='alertPrevPage anim'><p>已经是最后图片</p></div>")
                setTimeout(function(){
                    $root.find(".alertPrevPage").remove();
                },1500);
                //alert("已经是最后页");
            }
        }
    },
    prevPic : function(__item){
        var _this = this;
        var itemId = __item;
        var $root = $(".olympic2016").eq(itemId);
        var curPage = Number($root.attr("data-current"))
        var $li = $root.find("li");
        if(curPage>0 && curPage<=$li.length-1){
            var currentId = $root.attr("data-current");
            currentId--;
            $root.attr("data-current",currentId);
            $li.removeClass("active");
            var $tagli = $li.eq(currentId);
            var thumbPath = $tagli.attr("data-large-pic-path");
            var thumbInfoText = $tagli.attr("data-title");
            thumbInfoText = _this.getCheckString(thumbInfoText);
            $tagli.addClass("active");
            olmpicPicObj.showBigPic(itemId,thumbPath,thumbInfoText);

            //预加载图片
            var preloadId = currentId;
            var largePic01 = $li.eq(preloadId-1).attr("data-large-pic-path");
            var largePic02 = $li.eq(preloadId-2).attr("data-large-pic-path");
            if((preloadId-1)>=0 && largePic01!=null && largePic02!=null ){
                _this.preloadimages([
                    largePic01,
                    largePic02
                ]);
            }
        }else{
            $root.attr("data-current",0);
            if($root.find(".alertPrevPage").length==0){
                if($root.children().eq(0).find(".alertPrevPage").length==0){
                    $root.children().eq(0).append("<div class='alertPrevPage anim'><p>已经是第一张图片</p></div>");
                    setTimeout(function(){
                        $root.find(".alertPrevPage").remove();
                    },1500);
                }
                
            }
        }
    },
    getCheckString : function(__text){
        var _this = this;
        var textStr = __text;
        var subLen = _this.maxTitleLen;
        return textStr.substring(0,subLen-1);
    },
    autoResizeImage : function (maxWidth,maxHeight,objImg){
        var img = new Image();
        img.src = objImg.src;
        var hRatio;
        var wRatio;
        var Ratio = 1;
        var w = img.width;
        var h = img.height;
        wRatio = maxWidth / w;
        hRatio = maxHeight / h;
        if (maxWidth ==0 && maxHeight==0){
        Ratio = 1;
        }else if (maxWidth==0){//
        if (hRatio<1) Ratio = hRatio;
        }else if (maxHeight==0){
        if (wRatio<1) Ratio = wRatio;
        }else if (wRatio<1 || hRatio<1){
        Ratio = (wRatio<=hRatio?wRatio:hRatio);
        }
        if (Ratio<1){
        w = w * Ratio;
        h = h * Ratio;
        }
        objImg.height = h;
        objImg.width = w;
        return {width:objImg.width,height:objImg.height}
    },
    preloadimages : function(arr){  
        //var _this = this; 
        var newimages=[], loadedimages=0
        var postaction=function(){}  //此处增加了一个postaction函数
        var arr=(typeof arr!="object")? [arr] : arr
        function imageloadpost(){
            loadedimages++
            if (loadedimages==arr.length){
                postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
            }
        }
        for (var i=0; i<arr.length; i++){
            newimages[i]=new Image()
            newimages[i].src=arr[i]
            newimages[i].onload=function(){
                imageloadpost()
            }
            newimages[i].onerror=function(){
                imageloadpost()
            }
        }
        return { //此处返回一个空白对象的done方法
            done:function(f){
                postaction=f || postaction
            }
        }
    }
}/*  |xGv00|6eb344424010c143ca955e437928ea25 */