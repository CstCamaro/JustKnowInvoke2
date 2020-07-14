function Mask(){}

Mask.prototype = {
    name            : 'MyMask',
    inited          : false, //是否已完成初始化
    initedAD        : false, //是否已完成初始化
    isReady         : false,
    data            : hdPic.fn._tmpArray,

    hotkey          : true,
    zoomAnimation	: false,			// 图片缩放动画是否可用

    loadingImage	: 'http://mat1.gtimg.com/joke/curls/loading.gif',		// 加载中提示图片路径
    fadeInModulus	: 5,			// 渐显系数
    fadeOutModulus	: 8,			// 渐隐系数
    actionSpeed		: 20,			// 动作速度(越小越快，1秒=1000)
    itemWidth       : 110,
    pageHref        : '',

    maskOpacity     : 0.9,
    perPicOpacity   : 1,

    doLoad          : null,
    doFadePicHint   : null,
    doSlideHide     : null,
    doZoom          : null,
    doADTime        : null,
    doADanimate     : null,

    arrItems        : [],
    arrCount        : -1,
    currentNo       : 0,
    oldNo           : 0,
    viewNo          : 0,           //中间数字
    viewCount       : 0,
    leftNo          : 0,
    initialCoord    : [0, 0],      //当前屏幕中间坐标
    currentCoord    : [0, 0],     //当前图片大小
    innerSize       : [0, 0],
    isLoaded        : false,
    isSlide         : false,
    isZooming		: false,		// 是否正在缩放图片
    isPicStatus     : false,
    isItemsStatus   : 'hide',
    moveDistance	: [0, 0],		// 图片拖拽移动距离
    defaulePerMax	: 85,			// 初始图片最大占屏幕百分比
    defaultSizePer	: 100,			// 默认图片大小百分比
    fullSizePer		: 100,			// 满屏图片大小百分比
    currentSizePer	: 100,			// 当前图片大小百分比
    currentZoomSize	: [0, 0],		// 当前图片大小
    currentZoomCoord: [0, 0],		// 当前图片坐标
    zoomModulus		: 6,			// 缩放系数
    zoomSpeed		: .8,			// 缩放步长
    zoomMin			: 10,			// 缩放最小百分比
    zoomMax			: 5000,			// 缩放最大百分比

    winWidth		: $(window).width(),
    winHeight		: $(window).height(),



    Img             : null,
    preImg          : null,
    nextImg         : null,
    lng             : {
        'prev'		: '上一张图片',
        'next'		: '下一张图片',
        'loading'	: '图片加载中...'
    },

    initialize: function(){
        //console.log('initialize_S');
        var _this = this,
            data = this.data,
            count = data.length,
            info, url, s_url, tit;
        if(count == 0) return;

        for(var i = 0; i < count; i++){
            url = String(data[i].bigpic);
            s_url = String(data[i].smallpic);
            info = String(data[i].showtxt).cut(194);
            tit = String(data[i].showtit).cut(194);
            this.arrItems.push(new Array(url, info, [0, 0], s_url, tit));
        }

        this.pageHref = window.location.href;
        this.currentNo = Number(this.pageHref.indexOf('p=') > 0 ? this.pageHref.substring(this.pageHref.indexOf('p=') + 2) - 1: hdPic.fn._pageNow);
        this.arrCount = this.arrItems.length;
        if(!this.inited){
            //ADD.getCss(cssHref);
            this.createFrame();
            this.createItems();
            window.setTimeout(function(){
                _this.setLayoutItems();
                _this.setElementEvent();
            }, 50);
            $(window).bind('unload', function(){
                _this.destruction();
            });
            this.inited = true;
            //this.display();
        }
        //console.log('initialize_E');
    },
    createFrame: function(){
        //console.log('createFrame_S');

        $('<div id="maskBg"></div>').appendTo($('body'));
        //this.frame = $('div');
        //this.frame.attr('id', 'maskBody');
        //this.frame.attr('bossZone', '');
        var str = '<div id="maskBody">' +
            '<div id="Mask_Pic_wrap">'+
            '<img id="Mask_Picture" src="" />'+
            '<a class="pop_iv_bg" id="Mask_pop_close" title="关闭"  bossZone="MaskShowClose" href="javascript:void(0)" hidefocus="true">关闭</a>'+
            '<a href="javascript:void(0);" bossZone="MaskShowLeft" id="mask_cur_prev" class="mask_cur mask_cur_prev" hidefocus="true"></a>'+
            '<a href="javascript:void(0);" bossZone="MaskShowRight" id="mask_cur_next" class="mask_cur mask_cur_next" hidefocus="true"></a>'+
            '<a href="javascript:void(0);" class="mask_zoom" id="mask_zoom" style="display:none" bossZone="MaskShowZoom" hidefocus="true"></a>'+
            '</div>'+
            '<div id="Mask_Info" class="Mask_Info"></div>'+
            '<a id="Mask_Big_Prev" bossZone="MaskShowPre" href="javascript:void(0);" class="mask_btn mask_btn_prev" title="上一张" hidefocus="true"><span></span></a>'+
            '<a id="Mask_Big_Next" bossZone="MaskShowNext"  href="javascript:void(0);" class="mask_btn mask_btn_next"2012-5-2 title="下一张" hidefocus="true"><span></span></a>'+
            '<div id="Mask_Hint"></div>'+
            '<div id="Mask_Bottom">'+
            '<div id="Mask_Count">'+
            '</div>'+
            '<div id="Mask_Items">'+
            '<div id="Mask_List"><ul bossZone="MaskShowList"></ul></div>'+
            '<a href="javascript:void(0);" bossZone="MaskShowUp" id="Item_Btn_L" class="Mask_Items_btn Mask_Items_btnL" hidefocus="true"></a>'+
            '<a href="javascript:void(0);" bossZone="MaskShowDown" class="Mask_Items_btn Mask_Items_btnR" id="Item_btn_R" hidefocus="true"></a>'+
            '</div>'+
            '</div>'+
            '<div id="lastCon" style="display:none">'+
            '<div class="endMain">'+
            '<div class="hd">'+
            '<h2>大家都在看</h2>'+
            '</div>'+
            '<div class="bd">'+
            '<ul id="slide_listCon"></ul>'+
            '</div>'+
            '</div>'+
            '<div class="endSider">'+
            '<div class="endCon">'+
            '<h2>高清标题</h2>'+
            '<div class="endBtn clearfix">'+
            '<a href="javascript:;" id="MaskReplayPic" class="btnReplay left" hidefocus="true">再看一次</a>'+
            '<a href="javascript:;" target="_blank" id="MaskEnterPicSite" class="btnEnter right" hidefocus="true">进入图片中心</a>'+
            '</div>'+
            '</div>'+
            '<div id="slideEndAD"></div>'+
            '</div>'+
            '<div id="slide_lastAD" style="width:564px; height:362px;"></div>'+
            '<a href="javascript:;" id="MaskLastClose" class="lastClose" hidefocus="true"></a>'+
            '</div>'+
            '</div>';
        $(str).appendTo($('body'));
        this.bg         = $('#maskBg');
        this.body        = $('#maskBody');
        this.Picture	  = $('#Mask_Picture');            // 大图
        this.Wrap		  = $('#Mask_Pic_wrap');			     // 图片框

        this.fHint		  = $('#Mask_Hint');				 // 底部提示框
        this.popClose     = $('#Mask_pop_close');          // 浮动框关闭按钮
        this.info         = $('#Mask_Info');                // 图片文字说明
        this.Bottom       = $('#Mask_Bottom');
        this.Count        = $('#Mask_Count');                // 图片文字说明
        this.Num_Count    = $('#num_Count');                // 图片当前次序
        this.Num_Cur      = $('#num_Cur');                // 图片文字说明
        this.Items        = $('#Mask_Items ul');              //底部生成列表
        this.List         = $('#Mask_List');              //底部列表框
        this.AD           = $('#maskAD');                 //广告
        // 按钮对象
        this.imgPrev	  = $('#Mask_Big_Prev');
        this.imgNext	  = $('#Mask_Big_Next');
        this.itemsPrev	  = $('#Item_Btn_L');
        this.itemsNext	  = $('#Item_btn_R');
        this.curPrev	  = $('#mask_cur_prev');
        this.curNext	  = $('#mask_cur_next');
        this.zoomBtn      = $('#mask_zoom');
        var _this = this;
        this.Img = new Image();
        this.preImg = new Image;
        this.nextImg  = new Image();

        this.viewCount = Math.floor((this.winWidth - 76)/(88 + 22));
        this.viewNo = Math.floor(this.viewCount / 2);

        // 设置遮罩层透明度
        this.bg.css('opacity', this.maskOpacity);
        //this.scrollBarHidden();
        //console.log('createFrame_E');
    },
    scrollBarHidden: function(){
        $('body').css({'overflow' : 'hidden', 'height' : '100%'});
        $('html').css({'overflow' : 'hidden', 'height' : '100%'});
    },
    scrollBarShow: function(){
        $('body').css({'overflow' : '', 'height' : ''});
        $('html').css({'overflow' : '', 'height' : ''});
    },

    //生成列表项
    createItems: function(){
        //console.log('createItems_S');
        var itemStr = '', lastItem;
        for(var i = 0; i < this.arrCount; i++){
            itemStr += '<li><a href="javascript:void(0);" hidefocus="true" class="" onclick="' + this.name + '.changeImage(' + i + '); return false;"><img src="' + this.arrItems[i][3] + '" /></a></li>';
        }
        lastItem = '<li><a href="javascript:void(0);" hidefocus="true" class="" onclick="' + this.name + '.changeImage(' + this.arrCount + '); return false;"><img src="http://mat1.gtimg.com/joke/curls/end.png" alt="更多组图" /></a></li>'
        this.Items.html(itemStr + lastItem);
        //console.log('createItems_E');
    },
    setLayoutItems: function(){
        //console.log('setLayoutItems_S');
        var _this = this, _viewWidth = 0,
            _list = this.Items.find('li'),
            _windowWidth = this.winWidth, _w = 88, _items = this.Items.find('a');
        _viewWidth = this.viewCount * (_w + 22) - 22;
        this.List.css({width: _viewWidth + 'px'});
        this.Items.css({width: (_w + 22) * (this.arrCount + 1) + 'px'});
//console.log(this.currentNo, this.viewNo, this.arrCount, this.viewCount);
        if(this.currentNo < this.viewNo || this.arrCount <= this.viewCount){
            this.Items.css({left: 0});
        }else{
            if(this.currentNo + this.viewNo > this.arrCount){
                this.Items.css({left: -(this.arrCount+1 - this.viewCount)*110 + 'px'});
            }else{
                this.Items.css({left: -(this.currentNo - this.viewNo)*110 + 'px'});
            }
        }
        //console.log('setLayoutItems_E');
    },
    setElementEvent : function(){
        //console.log('setElementEvent_S');
        var _this = this;

        this.popClose.click(function(){
            _this.close()
        });
        this.Picture.click(function(){
            this.end()
        });

        this.imgPrev.click(function(){
            _this.changeImage(_this.currentNo-1); return false;
        });
        this.imgNext.click(function(){
            _this.changeImage(_this.currentNo+1); return false;
        });
        this.itemsPrev.click(function(){
            //_this.changeImage(_this.currentNo-1); return false;
            _this._clickListLeft()
        });
        this.itemsNext.click(function(){
            //_this.changeImage(_this.currentNo+1); return false;
            _this._clickListRight();
        });
        this.curPrev.click(function(){
            _this.changeImage(_this.currentNo-1); return false;
        });
        this.curNext.click(function(){
            _this.changeImage(_this.currentNo+1); return false;
        });

        $(document).bind('mousemove', function(e){_this.mousemove(e)});

        $(window).bind('resize', function(){
            _this.winWidth = $(window).width();
            _this.winHeight = $(window).height();
            _this.setLayoutItems();
            _this.setPos()
        });

        this.zoomBtn.click(function(){
            _this.zoomAction(0); return false;
        });

        $("#MaskLastClose").bind("click",function(){
            _this._hideLast();
            //hdPic.fn._showBig(data,hdPic.fn._pageNow);
        });

        //var myScroll = new iScroll('Mask_List');
        //console.log('setElementEvent_E');
    },
    display: function(){
        //console.log('display_S');
        if(!this.inited) this.initialize();
        var _this = this, _items = _this.Items.find('a');

        _items.eq(_this.oldNo).removeClass('hover');
        _items.eq(_this.arrCount).removeClass('hover');
        _this.currentNo = hdPic.fn._pageNow || 0;//高清联动
        if(this.hotkey) this.setKeyboard(true);
        this.setFrameLayout();
        this.scrollBarHidden();
        this.PicStatu('show');
        this.loadImage();
        _items.eq(_this.currentNo).addClass('hover');
        this.moveAction(this.currentNo);
        this.oldNo = this.currentNo;



        //console.log('display_E');
    },
    setFrameLayout: function(){
        //console.log('setFrameLayout_S');
        var _this = this;
        isMask = true;
        document.documentElement.scrollTop = 0;
        _this.bg.show();
        _this.body.show();

        this.initialCoord = [Math.round(this.winWidth)/2, Math.round(this.winHeight)/2];
        //console.log('setFrameLayout_E');
    },
    loadImage: function(){
        //console.log('loadImage_S');
        var _this = this, w, h, W, H, img = new Image();

        img.src = this.arrItems[this.currentNo][0];
        if (this.currentNo == 0) {
            this.nextImg.src = this.arrItems[this.currentNo + 1][0];
        } else {
            if (this.currentNo != Number(this.arrCount - 1)) {
                this.nextImg.src = this.arrItems[this.currentNo + 1][0];
            }
            this.preImg.src = this.arrItems[this.currentNo - 1][0];
        };
        w = img.width, h = img.height;
        if(img.complete){
            _this.loadImgFun(w, h);
            return;
        }else{ }
        img.onerror = function(){
            img.src = this.arrItems[this.currentNo + 1][0];
            img = img.onload = img.onerror = null;
        };
        img.onload = function(){
            W = img.width;
            H = img.height;
            _this.loadImgFun(W, H);
            img = img.onload = img.onerror = null;
            return;
        };
        //console.log('loadImage_E');
    },
    loadImgFun: function(w, h){
        //console.log('loadImgFun_S');
        var _this = this;
        var size = _this.arrItems[_this.currentNo][2] = [w, h];
        var windowWidth = this.winWidth, windowHeight = this.winHeight, zoomWidth = this.winWidth*0.9, zoomHeight = this.winHeight*0.95;
        var widthPer = Math.round((w/windowWidth)*100);
        _this.zoomBtn.css('display', 'none');
        var heightPer = Math.round((h/windowHeight)*100);
        _this.Picture.css('opacity', 0.2);
        if(size[0] > zoomWidth || size[1] > zoomHeight){
            var widthPer = Math.round((w/(2*_this.initialCoord[0]))*100);
            var heightPer = Math.round((h/(2*_this.initialCoord[1]))*100);
            var _v = widthPer/heightPer, V = 1;
            var sizePer = 100;
            sizePer = Math.round(Math.min(zoomWidth/w, zoomHeight/h)*100);
            this.zoomAction(sizePer, true, false);

            _this.zoomBtn.css({display: 'block'});
        }else{
            _this.Wrap.css({width: size[0] + 16 + 'px', height: size[1] + 16 + 'px'});
            _this.Picture.css({width: size[0] + 'px', height: size[1] + 'px'});
        };
        this.Picture.attr('src', this.arrItems[this.currentNo][0]);
        if(this.currentNo == 0) {
            this.imgPrev.css({display: 'none'});
            this.itemsPrev.css({display: 'none'});
            this.isPicStatus = false;
        }
        this.fadeAction(1, _this.Picture, 1);
        this.info.show();
        this.showInfo(this.currentNo);
        this.showNum(this.currentNo);
        this.setPos();
        //console.log('loadImgFun_E');
    },
    setPos: function(){
        //console.log('setPos_S');
        var _this = this;
        this.initialCoord = [Math.round(this.winWidth)/2, Math.round(this.winHeight)/2];
        this.innerSize = [Math.round(_this.Wrap.width())/2, Math.round(_this.Wrap.height() + _this.info.height())/2];

        this.Wrap.css({left: this.initialCoord[0] - this.innerSize[0] + 'px', top: this.initialCoord[1] - this.innerSize[1] + 'px'});
        this.info.css({top: this.initialCoord[1] + _this.Wrap.height()/2 + 'px'});
        //console.log('setPos_E');
    },
    changeImage: function(){
        //console.log('changeImage_S');
        var _this = this, _items = this.Items.find('a');
        var No = arguments[0];
        if(No < 0) {
            No = 0;
            return;
        }else if(No >= this.arrCount){

            this.lastFram();
            this.Wrap.hide();
            if(this.oldNo != this.arrCount) { _items.eq(this.oldNo).removeClass('hover'); this.oldNo = this.arrCount }
            _items.eq(this.arrCount).addClass('hover');
            this._isHideLast = false;
            return false;
        }
        this.Wrap.show();
        if(!this._isHideLast) this._hideLast();
        this.currentNo = No;
        if(this.currentNo != this.oldNo) this.moveAction(this.currentNo);
        if(this.oldNo != this.currentNo) { _items.eq(this.oldNo).removeClass('hover') }
        _items.eq(this.currentNo).addClass('hover');
        this.oldNo = this.currentNo;
        if(!this.isPicStatus) {
            this.statusPic();
        }
        this.loadImage();
        var addr = window.location.href.split(".htm")[0] + ".htm";
        var b = addr + "#" + "p=" + (parseInt(Number(this.currentNo), 10) + 1);
        window.location.href = b;
        //console.log('changeImage_E');
    },
    _clickListLeft: function(){
        this._listMove(1);
    },
    _clickListRight: function(){
        this._listMove(2);
    },
    _listMove: function(n){
        var lw = this.Items.width(), w = this.List.width(), wLi = 150, l = parseInt(this.Items.css('left'));
        if(this.Items.is(":animated")) return;

        if(n == 2){
            if(Math.abs(l) + 2*w < lw){
                this.Items.animate({left: '-' + (Math.abs(l) + w)}, 'slow', 'swing', function(){});
            }else{
                this.Items.animate({left: '-' + (lw - w)}, 'slow', 'swing', function(){});
            }
        }
        if(n == 1 && l < 0){
            this.Items.animate({left: (l + w > 0 ? 0 : (l + w))}, 'slow', 'swing', function(){});
        }
    },
    statusPic: function(){
        this.isPicStatus = true;
        this.imgPrev.show();
        this.imgNext.show();
        this.itemsPrev.show();
        this.itemsNext.show();
        this.AD.css({top: '-999px'});
        this.Picture.css({display: 'block'});

        this.popClose.css({display: 'block'});

        clearInterval(this.doZoom);
    },
    // 渐变
    fadeAction: function() {
        //console.log('fadeAction_S');
        var args = arguments;
        if(args[3]) args[1].css({opacity: arg[3]});

        var _this = this;
        var modulus = args[0] == 1 ? this.fadeInModulus : this.fadeOutModulus;

        var intervalID = setInterval(function(){
            _this.fadeLoop(args[1], args[2], modulus, intervalID)
        }, this.actionSpeed);
        return intervalID;
    },
    fadeLoop: function() {
        var args = arguments;
        var o = args[0];
        var currOpacity = Number(o.css('opacity'), 10);
        var modulus = parseInt(args[2], 10) || 5;
        space = args[1] - currOpacity;
        speed = space/3 > 0.01 ? space/3 : 0.01;
        if(currOpacity < args[1]) {
            currOpacity += speed;
            //alert(currOpacity);
            o.css({'opacity': currOpacity});
        }else{
            o.css({'opacity': 1});
            clearInterval(args[3]);
        }
    },
    slideShow: function(){
        var _this = this;
        this.isItemsStatus = 'show';
        //this.slideLoop(_this.Bottom.style, 'height', 29, 117, 10);
        this.Bottom.animate({height: '117px'}, 'slow');
    },
    slideHide: function(){
        var _this = this;
        this.isItemsStatus = 'hide';
        //clearTimeout(this.doSlideHide);
        //this.slideLoop(_this.Bottom.style, 'height', 117, 29, 10);
        this.Bottom.animate({height: '29px'}, 'slow');
        //this.doSlideHide = setTimeout(function(){this.slideLoop(_this.Bottom.style, 'height', 117, 29, 10);}, 1000);
    },
    mousemove: function(event){
        var mouseY = event.pageY, hotArea, _this = this;
        if(this.isItemsStatus == 'hide'){
            hotArea = 29;
        }else{
            hotArea = 117;
        };

        clearTimeout(_this.doSlideHide);
        if(this.winHeight - mouseY < hotArea ){
            if(this.isItemsStatus == 'show') return;
            this.slideShow();
        };
        if(this.winHeight - mouseY > hotArea ){
            clearTimeout(_this.doSlideHide);
            if(this.isItemsStatus == 'hide') return;
            //this.slideHide();
            this.doSlideHide = setTimeout(function(){_this.slideHide()},500);
            //alert(this.doSlideHide);
        };
    },
    zoomAction: function(){
        //console.log('zoomAction_S');
        var _this = this;
        //if(!this.isLoaded) return;
        clearInterval(this.doZoom);
        switch(arguments[0]){
            case -1 :
                this.currentSizePer *= this.zoomSpeed;
                break;
            case 0 :
                this.currentSizePer = 100;
                break;
            case 1 :
                this.currentSizePer /= this.zoomSpeed;
                break;
            default :
                this.currentSizePer = arguments[0];
                break;
        }

        if(!arguments[1]){
            if(this.currentSizePer < this.zoomMin) this.currentSizePer = this.zoomMin;
            if(this.currentSizePer > this.zoomMax) this.currentSizePer = this.zoomMax;
            this.currentSizePer   = Math.round(this.currentSizePer);
        }

        var size = this.arrItems[this.currentNo][2];
        this.currentZoomSize = [Math.round(size[0]*this.currentSizePer/100), Math.round(size[1]*this.currentSizePer/100)];

        this.innerSize = [Math.round(this.currentZoomSize[0] - size[0]), Math.round(this.currentZoomSize[1] - size[1])];
        //alert(size[1] +':'+this.zoomSpeed+':'+this.innerSize);
        this.currentZoomCoord = [Math.round(this.initialCoord[0]-this.currentZoomSize[0]/2), Math.round(this.initialCoord[1]-this.currentZoomSize[1]/2)];
        //alert(this.currentZoomSize);
        //alert(this.currentZoomSize +':'+ this.currentZoomCoord);

        var moveDistance = [Math.round(this.moveDistance[0]*this.currentSizePer/100), Math.round(this.moveDistance[1]*this.currentSizePer/100)];
        //alert(moveDistance);
        var zoomSize = this.currentZoomSize;

        var zoomCoord = [this.currentZoomCoord[0]-moveDistance[0], this.currentZoomCoord[1]-moveDistance[1]]
        var animation = arguments[2]==undefined ? this.zoomAnimation : arguments[2];
        if(animation) {
            var self = this;
            this.doZoom = setInterval(function() {
                self.zoomLoop(zoomSize, zoomCoord);
            }, this.actionSpeed);
            this.isZooming = true;
        }else{
            //console.log(_this.initialCoord);
            _this.Wrap.css({width: zoomSize[0] + 16 + 'px', height: zoomSize[1] + 16 + 'px'});
            _this.Picture.css({width: zoomSize[0] + 'px', height: zoomSize[1] + 'px'});
            _this.Wrap.css({left: _this.initialCoord[0] - zoomSize[0]/2 + 'px', top: _this.initialCoord[1] - zoomSize[1] /2+ 'px'});
        }
        _this.zoomBtn.hide();
        //console.log('zoomAction_E');
    },
    zoomLoop: function() {
        var zoomSize = arguments[0];
        var zoomCoord = arguments[1];
        var sizeSpeed = [Math.round((zoomSize[0]-this.Picture.width)/this.zoomModulus*10)/10, Math.round((zoomSize[1]-this.Picture.height)/this.zoomModulus*10)/10]
        var coordSpeed = [Math.round((zoomCoord[0]-this.Picture.offsetLeft)/this.zoomModulus*10)/10, Math.round((zoomCoord[1]-this.Picture.offsetTop)/this.zoomModulus*10)/10]

        if((sizeSpeed.join(',')!='0,0') || coordSpeed.join(',')!='0,0') {
            this.Picture.width += (sizeSpeed[0]>0 ? Math.ceil(sizeSpeed[0]) : Math.floor(sizeSpeed[0]));
            this.Picture.height += (sizeSpeed[1]>0 ? Math.ceil(sizeSpeed[1]) : Math.floor(sizeSpeed[1]));
            //this.Picture.style.left = (this.Picture.offsetLeft+(coordSpeed[0]>0 ? Math.ceil(coordSpeed[0]) : Math.floor(coordSpeed[0]))) +'px';
            //this.Picture.style.top = (this.Picture.offsetTop+(coordSpeed[1]>0 ? Math.ceil(coordSpeed[1]) : Math.floor(coordSpeed[1]))) +'px';

            this.perHint(Math.round(this.Picture.width/this.arrItems[this.currentNo][2][0]*100));
        }else{
            clearInterval(this.doZoom);
            this.isZooming = false;
        }
    },
    moveAction: function(){
        //console.log('moveAction_S');
        var _this = this, _left = parseInt(this.Items.css('left'));
        var runc = (arguments[0]-this.viewNo)*(_this.itemWidth) + _left;
        if(this.currentNo + this.viewNo >= this.arrCount){
            if(_left  > -(this.arrCount + 1 - this.viewCount)*(_this.itemWidth)) {
                //this.slideLoop(_this.Items.style, 'left', _left, -(this.arrCount + 1 - this.viewCount)*(_this.itemWidth), 10);
                _this.Items.animate({left: -(this.arrCount + 1 - this.viewCount)*(_this.itemWidth)}, 'fast');
            }
            return;
        }
        if(this.currentNo <= this.viewNo) {
            if(_left < 0) {
                _this.Items.animate({left: 0}, 'fast');
            }
            return;
        }
        _this.Items.animate({left: _left - runc}, 'fast');
        //console.log('moveAction_E');
    },

    //末页广告推荐
    createAD: function(){
        var _this = this;
        this.AD.innerHTML =
            //末页广告
            '<div id="maskAD_inner" style="width:550px;height:320px;display:none;"></div>' +
                //末页推荐
            '<div id="mask-last-photo" style="display:none" class="mask-last-photo" bossZone="maskShowLast">' +
            '<div class="hd">' +
            '<dl  class="m-picList">' +
            '<dd class="m-picList-pic"><a href="#" class="mask-last-top-pic"><img src="' + this.arrItems[0][3] + '" /></a></dd>' +
            '<dt class="m-picList-title"><a href="javascript:void(0)" class="mask-last-top-picTitle" id="m_picTitle" bossZone="maskShowTitle"></a></dt>' +
            '<dd class="m-picList-btn"><a href="#" id="replayPic" class="btn-replayPic" onclick="' + this.name + '.changeImage(0)" bossZone="maskShowReplay"><span></span><em></em>重新播放</a><a href="javascript:void(0)" id="m_MIcblog" class="btn-MIcblog" bossZone="maskShowAllToMblog"><span></span><em></em>转播到微博</a></dd>' +
            '</dl>' +
            '</div>' +
            '<div class="bd">' +
            '<h3>你可能还喜欢</h3>' +
            '<ul id="maskComend" class="maskComend"></ul>' +
            '</div>' +
            '</div>';

    },
    _isHideLast: false,
    _hideLast: function(){//隐藏末页推荐
        var _this = this; this._isAD = false;

        $("#lastCon").hide();
        this.Wrap.show();
        this._isHideLast = true;
    },
    _showLast: function(){
        var h = $(window).height()/2 - 40;
        $("#lastCon").show().css({top: h});
    },
    lastFram: function() {
        var _this = this;
        hdPic.fn._lastArr('#slide_listCon');
        this._showLast();
        this._lastAD();
        this.currentNo = this.arrCount;
        $('#MaskEnterPicSite').attr('href', hdPic.fn._siteLink);
        $("#MaskReplayPic").bind("click",function(){
            _this._hideLast();
            _this.currentNo = 0;
            _this.changeImage(_this.currentNo);
        });
    },
    _lastAD: function(){
        $('#slideEndAD').html($('#lastAD').html());
        setTimeout(function(){//末页推荐延迟100ms
            if(hdPic.fn._AD_id){
                crystal.getArea(hdPic.fn._AD_id).invoke('open');
            }
        },100);
    },
    PicStatu: function() {
        if(arguments[0] == 'show'){
            this.Picture.show();
            this.info.show();
            this.AD.css({top: '-999px'});

        }else if(arguments[0] == 'hide') {
            this.Picture.hide();
            this.info.hide();
            this.AD.css({top: '0'});
            this.isPicStatus = false;
        }else{
            return false;
        }
    },
    setKeyboard: function( b ){
        var _this = this;
        if(b) {
            document.onkeydown = function(e) { _this.keyboardAction(e) }
        }else{
            document.onkeydown = null;
        }
    },
    keyboardAction: function(e) {
        if(!isMask) return;
        e = e || window.event;
        var key = e.keyCode;
        var isHotKey = false;
        if(key==27) {
            this.close();
            isHotKey = true;
        }else if(key==37) {
            this.changeImage(this.currentNo-1);
            isHotKey = true;
        }else if(key==39) {
            this.changeImage(this.currentNo+1);
            isHotKey = true;
        }
        if(isHotKey) this.end(e);
    },
    stopAll: function(){
        clearTimeout(this.doLoad);
        clearTimeout(this.doFadePicHint);
        clearInterval(this.doZoom);
        clearInterval(this.doADanimate);
        clearInterval(this.doADTime);
    },
    close: function(){
        isMask = false;
        var _this = this;
        this.stopAll();
        this.oldNo = this.currentNo;
        this.bg.hide();
        this.body.hide();
        this.Picture.show();
        this.itemsNext.show();
        this.imgNext.show();
        this.popClose.show();
        this.scrollBarShow();
        //picShow.viewJump(_this.currentNo);
        hdPic.fn._showBig(hdPic.fn._tmpArray, _this.currentNo);
    },
    //数字显示
    showNum: function(){
        var str = '<span><em id="num_Cur">' + Number(arguments[0] + 1) + '</em>/<em id="num_Count">' + this.arrCount + '</em></span>';
        this.Count.html(str);
    },
    //信息显示
    showInfo: function(){
        //console.log('showInfo_S');
        var _this = this;
        var _reg = /[^\x00-\xff]/g, _info = this.arrItems[arguments[0]][1].replace(/^\s+|\s+$/g, ""), _tit = this.arrItems[arguments[0]][4].replace(/^\s+|\s+$/g, ""), _txt, _stu;

        _txt = _info.length == 0 ? _tit : _info;
        _txt.replace(_reg, 'mm').length > 126 ? _this.info.addClass('txtC') : _this.info.removeClass('txtC');
        this.info.html(_txt);
        //console.log('showInfo_E');
    },
    hint: function(){
        var msg = '';
        if(arguments[0]){
            msg = arguments[0]
        }else{
            msg = this.hintTxt;
        }
        this.fHint.innerHTML = msg;
    },
    end: function(e){
        e = e || window.event;
        e.stopPropagation && (e.preventDefault(), e.stopPropagation()) || (e.cancelBubble = true, e.returnValue = false);
    },
    // 销毁
    destruction: function() {
        this.stopAll();
        this.bg		= null;
        this.body		= null;
        this.Picture	= null;
        //	this.Loading	= null;
        this.fHint		= null;

        // 按钮对象
        this.imgPrev    = null;
        this.imgNext    = null;

        //this.activeImage  = null;
        window[this.name] = null;
    }
}

/*============================================================
 - 实例化Mask
 ============================================================*/
var MyMask = new Mask();


$('#slide').click(function(){
    MyMask.display();
    return false;
});
/*  |xGv00|988e152fdbd3ea130c301c9f841346e0 */