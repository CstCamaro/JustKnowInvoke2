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

        //* browser - resizing
        $(window).resize(function() {
            page.updateResize();
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
        }, 2000); 
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
        if($('.box_btn-play').length>0){
            videoplayer.init(function(){parallax.enable()});
        }

        $('.box_btn-play').each(function(index, el) {
            if($(el) && $(el).attr("data-vid")){
                $(el).click(function(event) {
                    console.log('show video:' + $(this).attr("data-vid"));
                    var isAutoPlay = true;
                    if(tool.vptg() == 'Android'){
                        isAutoPlay = false;
                    }
                    videoplayer.createVideo($(this).attr("data-vid"), $(this).attr("data-pic"), isAutoPlay);
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
    init : function($callback){
        $("#close").on("click", function(){
            $("#mainvideo").hide();
            $("#mod_player div").remove();
            if($callback){
                $callback();
            }
        });
    },

    createVideo : function ($vid, $vpic, $isAutoPlay){
        var scale = 16/9;
        var v_width = page._pageWidth > 800 ? 800 : page._pageWidth;
        var v_height = v_width / scale;
        var x_pos = (page._pageHeight - v_height)/2;
        var y_pos = (page._pageWidth - v_width)/2;
        $("#mod_player").css({"top": x_pos + "px", "left" : y_pos + "px"});

        //
        $("#close").css({"top": x_pos -100 + "px", "left" : (page._pageWidth-$("#close").width())/2 + "px"});
        $("#mainvideo").show();
        //
        var video = new tvp.VideoInfo();
        video.setVid($vid);
        var player = new tvp.Player();
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
}/*  |xGv00|4e5f74ec7d5bece8977112db0bf84c66 */