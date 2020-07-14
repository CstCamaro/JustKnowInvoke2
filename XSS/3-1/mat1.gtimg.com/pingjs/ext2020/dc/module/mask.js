//文章内组图 2017-3-14
//old://mat1.gtimg.com/news/dc/js/gallery/mask_v1.1.8.js
function Gallery() {}
Gallery.prototype = {
    author          : 'curlsli',
    name            : 'myGallery',  // 实例名
    inited          : false,        // 是否已完成初始化
// 功能状态
    initedAD        : false,
    isReady         : false,
    hotkey          : true,         // 快捷按键是否可用
    slide           : true,         // 幻灯片播放是否可用
    auto            : true,         // 自动播放是否可用
    zoomAnimation   : false,        // 放到效果是有有效
// 参数
    loadingImage: "//mat1.gtimg.com/joke/curls/loading.gif",   // 加载中提示图片路径
    titleStr        : document.title,
    article_url     : ARTICLE_INFO.article_url,
    fadeInModulus: 5,               // 渐显系数
    fadeOutModulus: 8,              // 渐隐系数
    actionSpeed: 20,                // 动作速度(越小越快，1秒=1000)
    itemWidth: 92,                  // 列表项宽度(像素)
    pageHref: "",                   // 页面url
    maskOpacity: 0.9,               // 浮层透明度
    perPicOpacity: 1,               // 透明度步进值
    autoInterval: 3000,              // 自动播放间歇(1秒=1000)

// 计时器
    doLoad          : null,          // 图片加载
    doFadePicHint   : null,          // 百分比
    doSlideHide     : null,          // 底部list
    doZoom          : null,          // 放大
    doAuto          : null,          // 自动播放
// 变量
    arrItems: [],                    // 列表数据
    arrCount: -1,                    // 列表数量
    currentNo: 0,                    // 当前图片no
    oldNo: 0,                        //
    viewNo: 0,
    viewCount: 0,
    initialCoord: [0, 0],            // 图片初始坐标
    currentCoord: [0, 0],
    innerSize: [0, 0],
    isLoaded: false,
    isSlide: false,
    isZooming: false,
    isPicStatus: false,
    isItemsStatus: "hide",
    isAutoPlaying   : false,        // 是否正在自动播放
    moveDistance: [0, 0],
    scrollTop : 0,
    defaulePerMax: 85,
    defaultSizePer: 100,
    fullSizePer: 100,
    currentSizePer: 100,
    currentZoomSize: [0, 0],
    currentZoomCoord: [0, 0],
    zoomModulus: 6,
    zoomSpeed: 0.8,
    zoomMin: 10,
    zoomMax: 5000,
    Img: new Image(),
    preImg: new Image(),
    nextImg: new Image(),
    GalleryItems: qq.GT(qq.G('galleryList'), 'ul')[0],
    lng: {
        prev: "\u4e0a\u4e00\u5f20\u56fe\u7247",
        next: "\u4e0b\u4e00\u5f20\u56fe\u7247",
        loading: "\u56fe\u7247\u52a0\u8f7d\u4e2d..."
    },
    initialize: function() {
        var _this = this,
            len = photoJson.length,
            info, url, s_url, title;
        if (len == 0) {
            return
        }

        for (var d = 0; d < len; d++) {
            url = String(photoJson[d].bigpic).replace('http:', '');
            s_url = String(photoJson[d].smallpic).replace('http:', '');
            //  info = String(photoJson[d].showtxt).cut(194);
            info = String(photoJson[d].showtxt);
            title = String(photoJson[d].showtit).cut(194);
            this.arrItems.push(new Array(url, info, [0, 0], s_url, title))
        }
        //this.arrItems.pop();
        this.arrCount = this.arrItems.length;
        this.currentNo = this.RequestNowCount() >= this.arrCount ? (this.arrCount - 1) : this.RequestNowCount() ;
        this.setSideAd();
        this.showPic();
        //this._LastAdHTML();
        if (this.hotkey) {
            this.setKeyboard(true)
        }

    },
    // 自动播放
    /*autoPlayAction : function() {
     if(!this.auto) return;
     if(this.isAutoPlaying) {
     clearTimeout(this.doAuto);
     this.isAutoPlaying = false;
     }else{
     this.autoPlay();
     this.isAutoPlaying = true;
     }

     this.setButton(this.btnAutoPlay, this.isAutoPlaying);
     },*/
    setSideAd: function(){
        if(window['sideAd'] && sideAd[ARTICLE_INFO.site]){
            this.sideAd = sideAd[ARTICLE_INFO.site];
        }else{
            this.sideAd = 'huandeng_F_clcf';
        }
    },
    autoPlay : function() {
        var self = this;

        this.doAuto = setInterval(function() {
            var No = self.currentNo >= self.arrCount ? self.arrCount : self.currentNo + 1;
            self.changeImage(No);
        }, this.autoInterval);

    },
    RequestNowCount: function() {
        var str = location.href.toString(), pos = str.indexOf("#p=");
        var nub = 1;

        if(pos!==-1){
            nub=str.match(/\#p\=(\d{1,})/i)[1];
        }
        return parseInt(nub - 1);
    },
    showPic: function(){
        var _this = this,
            _list = qq.GT(this.GalleryItems, 'li');
        this.createItems(this.GalleryItems);//幻灯List
        this.setLayoutItems(this.GalleryItems, qq.G('galleryList'));

        this.loadImage();
        this.setGalleryEvent();

        qq.showOpacity(qq.G('galleryList'), 400, 100);
        qq.addClass(_list[this.currentNo], "hover");
        this.oldNo = this.currentNo;
        this.changeHash(this.currentNo);
        //qq.G('galleryInfo').style.visibility = 'visible';
    },
    showMask: function() {
        var _this = this;
        isMask = true;
        if (!this.inited) {
            this.createFrame();
            this.createItems(_this.MaskItems);
            this.setMaskEvent();
            this.inited = true;
        }
        this.setLayoutItems(_this.MaskItems, _this.List);

        var _items = qq.GT(_this.MaskItems, 'li'), _list = qq.GT(this.GalleryItems, 'li');
        qq.removeClass(_list[_this.currentNo], "hover");
        // qq.removeClass(_items[_this.arrCount], "hover");
        if (this.hotkey) {
            this.setKeyboard(true)
        }
        this.setFrameLayout();
        this.scrollBarHidden();
        this.PicStatu("show");
        this.loadImage();
        qq.addClass(_items[_this.currentNo], "hover");
        this.oldNo = this.currentNo
    },
    createFrame: function() {
        this.mask = qq.DC("div");
        this.mask.id = "MyMaskWrap";
        document.body.appendChild(this.mask);
        this.frame = qq.DC("div");
        this.frame.id = "MyMaskCon";
        this.frame.setAttribute("bossZone", "MaskShow");
        this.frame.innerHTML = '<a class="pop_iv_bg" id="Mask_pop_close" title="\u5173\u95ed"  bossZone="MaskShowClose" href="javascript:void(0)">\u5173\u95ed</a><div id="Mask_Pic_wrap"><img id="Mask_Picture" src="" /><div class="Mask-share-box">\u6211\u8981\u5206\u4EAB:<a href="javascript:void(0)" id="t_weibo" bossozne="Masktmblog"></a></div><div class="galleryTool" id="galleryTool"><div class="galleryTool-wrap"><div class="galleryTool-num ff-t" id="mCount"><em class="fw-b" id="num_cur">0</em>/<em id="num_count">0</em></div><div class="galleryTool-btn"><a href="javascript:void(0)" class="g-btn g-btn-left" id="m_btn_left"></a><a href="javascript:void(0)" class="g-btn g-btn-pause" id="m_btn_pause"></a><a href="javascript:void(0)" class="g-btn g-btn-right" id="m_btn_right"></a></div></div></div><!--a class="pop_iv_bg" id="Mask_pop_close" title="\u5173\u95ed"  bossZone="MaskShowClose" href="javascript:void(0)">\u5173\u95ed</a--><a href="javascript:void(0);" bossZone="MaskShowLeft" id="mask_cur_prev" class="mask_cur mask_cur_prev" hidefocus="true"></a><a href="javascript:void(0);" bossZone="MaskShowRight" id="mask_cur_next" class="mask_cur mask_cur_next" hidefocus="true"></a><a href="javascript:void(0);" class="mask_zoom" id="mask_zoom" style="display:none" bossZone="MaskShowZoom" hidefocus="true"></a></div><div id="Mask_Info" class="Mask_Info"></div><a id="Mask_Big_Prev" bossZone="MaskShowPre" href="javascript:void(0);" class="mask_btn mask_btn_prev" title="\u4e0a\u4e00\u5f20" hidefocus="true"><span></span></a><a id="Mask_Big_Next" bossZone="MaskShowNext"  href="javascript:void(0);" class="mask_btn mask_btn_next" title="\u4e0b\u4e00\u5f20" hidefocus="true"><span></span></a><div id="Mask_Hint"></div><div id="Mask_Bottom"><div id="Mask_Count"></div><div id="Mask_Items"><div id="Mask_List"><ul bossZone="MaskShowList"></ul></div><a href="javascript:void(0);" bossZone="MaskShowUp" id="Item_Btn_L" class="galleryList-btn galleryList-btn-l" hidefocus="true"></a><a href="javascript:void(0);" bossZone="MaskShowDown" class="galleryList-btn galleryList-btn-r" id="Item_btn_R" hidefocus="true"></a></div></div></div>';
        document.body.appendChild(this.frame);
        this.Picture = qq.G("Mask_Picture");
        this.Wrap = qq.G("Mask_Pic_wrap");
        this.fHint = qq.G("Mask_Hint");
        this.popClose = qq.G("Mask_pop_close");
        this.info = qq.G("Mask_Info");
        this.Bottom = qq.G("Mask_Bottom");
        this.Count = qq.G("Mask_Count");
        this.Num_Count = qq.G("num_Count");
        this.Num_Cur = qq.G("num_Cur");
        this.MaskItems = qq.GT(qq.G("Mask_Items"), "ul")[0];
        this.List = qq.G("Mask_List");
        this.imgPrev = qq.G("Mask_Big_Prev");
        this.imgNext = qq.G("Mask_Big_Next");
        this.itemsPrev = qq.G("Item_Btn_L");
        this.itemsNext = qq.G("Item_btn_R");
        this.curPrev = qq.G("mask_cur_prev");
        this.curNext = qq.G("mask_cur_next");
        this.zoomBtn = qq.G("mask_zoom");
        this.m_btn_L = qq.G('m_btn_left');
        this.m_btn_R = qq.G('m_btn_right');
        this.m_btn_pause = qq.G('m_btn_pause');
        this.mCount = qq.G('mCount');
        var a = this;

        qq.C(this.mask, "opacity", this.maskOpacity);
        // this.scrollBarHidden()
    },
    scrollBarHidden: function() {
        this.scrollTop = qq.scrollY();
        qq.C(document.body, "overflow", "hidden");
        qq.C(document.body, "height", "100%");
        qq.C(document.documentElement, "overflow", "hidden");
        qq.C(document.documentElement, "height", "100%")
    },
    scrollBarShow: function() {
        var _this = this;
        qq.C(document.body, "overflow", "");
        qq.C(document.body, "height", "");
        qq.C(document.documentElement, "overflow", "");
        qq.C(document.documentElement, "height", "")
        qq.scrollTo(0, _this.scrollTop);
    },
    createItems: function(wrap) {
        var itemStr = "", lastItem;
        for (var i = 0; i < this.arrCount; i++) {
            itemStr += '<li><a href="javascript:void(0);" hidefocus="true" class=""  onclick="' + this.name + ".changeImage(" + i + '); return false;"><img /></a></li>'
        }
        lastItem = '<li><a href="javascript:void(0);" hidefocus="true" class="" onclick="' + this.name + ".changeImage(" + this.arrCount + '); return false;"><img src="//mat1.gtimg.com/joke/curls/end.png" alt="\u66f4\u591a\u7ec4\u56fe" /></a></li>';
        wrap.innerHTML = itemStr + lastItem;
    },
    setLayoutItems: function(ulList, divList) {
        var _this = this,
            _viewWidth = 0,
            _list = qq.GT(ulList, "li"),
            _windowWidth = isMask ? qq.windowWidth() : 640 ,
            _w = 88,
            _o = {},
            _items = qq.GT(ulList, 'li');

        this.viewCount = Math.ceil((_windowWidth) / (_w + 4));
        this.viewNo =  Math.floor(this.viewCount / 2);
        _viewWidth = this.viewCount * (_w + 4) - 4;

        divList.style.width = _viewWidth + "px";
        ulList.style.width = (_w + 4) * (this.arrCount + 1) + "px";
        if (this.currentNo < this.viewNo || this.arrCount <= this.viewCount) {
            _o = this.calObjShow(parseInt(qq.C(ulList,"left")),0);
            this.picListDelay(_o);
            qq.C(ulList, "left", 0)
        } else {
            if (this.currentNo + this.viewNo > this.arrCount) {
                _o = this.calObjShow(parseInt(qq.C(ulList,"left")),-(this.arrCount + 1 - this.viewCount) * 92);
                this.picListDelay(_o);
                qq.C(ulList, "left", -(this.arrCount + 1 - this.viewCount) * 92 + "px")
            } else {
                _o = this.calObjShow(parseInt(qq.C(ulList,"left")),-(this.currentNo - this.viewNo) * 92 );
                this.picListDelay(_o);
                qq.C(ulList, "left", -(this.currentNo - this.viewNo) * 92 + "px")
            }
        }
    },
    calObjShow:function(preLeft,nowLeft){
        var obj={};
        var d = 88;
        var preStart = -Math.floor(preLeft/(d+4));nowStart = -Math.floor(nowLeft/(d+4));
        var a = isMask ? qq.windowWidth() : 640;
        this.viewCount = Math.ceil((a) / (d + 4));
        for (var j=0;j<this.viewCount;j++) {
            if(obj[preStart+j]!==false){
                obj[preStart+j] = false;
            }
            if(obj[nowStart+j]!==false){
                obj[nowStart+j] = false;
            }
        }
        return obj;
    },
    picListDelay:function(obj){//小图延时加载
        for(var num in obj){
            if (obj[num]===false && num>=0 && num<this.arrCount) {
                var tmpLi = isMask ? qq.GT(this.MaskItems, "li")[num] : qq.GT(this.GalleryItems, "li")[num];
                var node = tmpLi.getElementsByTagName("img")[0];
                node.src= this.arrItems[num][3];
            }
        }
    },
    setGalleryEvent: function(){
        var _this = this;
        qq.EA(qq.G('g_btn_play'), "click", function() {
            _this.showMask();
            if(m_btn_pause && qq.hasClass(m_btn_pause, 'g-btn-pause')) _this.autoPlay();
            return false
        });

        qq.EA(qq.G('galleryList_btn_l'), "click", function() {
            _this.changeImage(_this.currentNo - 1);
            return false
        });
        qq.EA(qq.G('galleryList_btn_r'), "click", function() {
            _this.changeImage(_this.currentNo + 1);
            return false
        });
        qq.EA(qq.G('g_btn_left'), "click", function() {
            _this.changeImage(_this.currentNo - 1);
            return false
        });
        qq.EA(qq.G('g_btn_right'), "click", function() {
            _this.changeImage(_this.currentNo + 1);
            return false
        });
        qq.EA(qq.G('preArrow'), "click", function() {
            _this.changeImage(_this.currentNo - 1);
            return false
        });
        qq.EA(qq.G('nextArrow'), "click", function() {
            _this.changeImage(_this.currentNo + 1);
            return false
        });
        qq.EA(qq.G('gallery_btn_close'), "click", function() {
            qq.G('galleryInfo').style.visibility = 'hidden';
            qq.G('gallery_btn_close').style.display = 'none';
            qq.G('gallery_btn_open').style.display = 'block';
        });

        qq.EA(qq.G('gallery_btn_open'), "click", function() {
            qq.G('galleryInfo').style.visibility = 'visible';
            qq.G('gallery_btn_close').style.display = 'block';
            qq.G('gallery_btn_open').style.display = 'none';
        });
        qq.EA(qq.G('galleryPicWrap'), "mouseover", function() {
            qq.G('galleryTool').style.visibility = 'visible';
            qq.G('gallery_btn_open').style.visibility = 'visible';
        });
        qq.EA(qq.G('galleryPicWrap'), "mouseout", function() {
            qq.G('galleryTool').style.visibility = 'hidden';
            qq.G('gallery_btn_open').style.visibility = 'hidden';
        });
        qq.EA(qq.G('galleryPicWrap'), 'contextmenu', function(e){
            _this.end(e);
            _this.getMenu(e, photoJson[_this.currentNo].bigpic);
        });
    },
    setMaskEvent: function() {
        var _this = this;
        this.popClose.onclick = function() {
            clearInterval(_this.doAuto);
            _this.close()
        };
        this.Picture.onclick = this.end;
        qq.EA(_this.imgPrev, "click",  function() {
            _this.changeImage(_this.currentNo - 1);
            return false
        });
        qq.EA(_this.imgNext, "click", function() {
            _this.changeImage(_this.currentNo + 1);
            return false
        });
        qq.EA(_this.m_btn_L, "click",  function() {
            _this.changeImage(_this.currentNo - 1);
            return false
        });
        qq.EA(_this.m_btn_R, "click", function() {
            _this.changeImage(_this.currentNo + 1);
            return false
        });
        qq.EA(_this.itemsPrev, "click", function() {
            _this.changeImage(_this.currentNo - 1);
            return false
        });
        qq.EA(_this.itemsNext, "click", function() {
            _this.changeImage(_this.currentNo + 1);
            return false
        });
        qq.EA(_this.curPrev, "click", function() {
            _this.changeImage(_this.currentNo - 1);
            return false
        });
        qq.EA(_this.curNext, "click", function() {
            _this.changeImage(_this.currentNo + 1);
            return false
        });
        qq.EA(qq.G('m_btn_pause'), "click", function() {
            var pause = qq.G('m_btn_pause');
            if(qq.hasClass(pause, 'g-btn-pause')){
                clearInterval(_this.doAuto);
                pause.className = 'g-btn g-btn-play';
            }else{
                _this.autoPlay();
                pause.className = 'g-btn g-btn-pause';
            }
            return false
        });
        qq.EA(document, "mousemove", function(e) {
            _this.mousemove(e)
        });
        qq.EA(window, "resize", function() {
            _this.setLayoutItems(_this.MaskItems, _this.List);
            _this.setPos()
        });
        this.zoomBtn.onclick = function() {
            _this.zoomAction(0);
            return false
        };
        qq.EA(window, "unload", function() {
            _this.destruction()
        });
        qq.EA(qq.G('t_weibo'), 'click', function(){
            var _t = ARTICLE_INFO.title;
            var _s = encodeURIComponent(location.href.toString());
            var _p = encodeURIComponent(_this.arrItems[_this.currentNo][0]);
            _MI.Share.pop({txt: _this.info.title, surl:_this.info.url, pic:_p, pref:'qqcom.tmbloghd'});//转播此图到微博
        });
    },
    setFrameLayout: function() {
        var _this = this;

        document.documentElement.scrollTop = 0;
        qq.show(this.mask);
        qq.show(this.frame);
        this.initialCoord = [Math.round(qq.windowWidth()) / 2, Math.round(qq.windowHeight()) / 2]
    },
    loadImage: function() {
        var _this = this,
            d, W, H, w, h, image = new Image(),
            g = null;
        image.src = this.arrItems[this.currentNo][0];
        if (this.currentNo == 0) {
            this.nextImg.src = this.arrItems[this.currentNo + 1][0]

        } else {
            if (this.currentNo != Number(this.arrCount - 1)) {

                this.nextImg.src = this.arrItems[this.currentNo + 1][0]
            }
            this.preImg.src = this.arrItems[this.currentNo - 1][0]
        }

        W = image.width,
            H = image.height;

        if (image.complete) {
            _this.loadImgFun(W, H);
            return;
        }

        image.onerror = function() {
            image.src = this.arrItems[this.currentNo + 1][0];
            image = image.onload = image.onerror = null
        };
        image.onload = function() {
            w = image.width;
            h = image.height;
            _this.loadImgFun(w, h);
            image = image.onload = image.onerror = null;
        }
        image.src = this.arrItems[this.currentNo][0];
    },
    loadImgFun: function(w, h) {
        var g = this;
        var size = g.arrItems[g.currentNo][2] = [w, h];
        if(isMask) {
            var windowWidth = qq.windowWidth(), windowHeight = qq.windowHeight();
            var widthPer = Math.round((w / windowWidth) * 100);
            qq.C(g.zoomBtn, "display", "none");
            var heightPer = Math.round((h / windowHeight) * 100);

            qq.C(g.Picture, "opacity", 0.2);

            if (size[0] > 780 || size[1] > 550) {
                var widthPer = Math.round((w / (2 * g.initialCoord[0])) * 100);
                var heightPer = Math.round((h / (2 * g.initialCoord[1])) * 100);
                var j = widthPer / heightPer,
                    V = 1.4;
                var sizePer = 100;
                sizePer = Math.round(Math.min(780 / w, 550 / w) * 100);
                g.zoomAction(sizePer, true, false);
                qq.C(g.zoomBtn, "display", "block")
            } else {
                qq.C(g.Wrap, "width", size[0] + 18 + "px");
                qq.C(g.Wrap, "height", size[1] + 48 + "px");
                qq.C(g.Picture, "width", size[0] + "px");
                qq.C(g.Picture, "height", size[1] + "px");
                if (qq.B.ie6) {
                    qq.C(g.curPrev, "width", (size[0] + 16) / 2 + "px");
                    qq.C(g.curPrev, "height", size[1] + 16 + "px");
                    qq.C(g.curNext, "width", (size[0] + 16) / 2 + "px");
                    qq.C(g.curNext, "height", size[1] + 16 + "px")
                }
            }

            this.Picture.src = this.arrItems[this.currentNo][0];

            if (this.currentNo == 0) {
                qq.C(this.imgPrev, "display", "none");
                qq.C(this.itemsPrev, "display", "none");
                this.isPicStatus = false
            }
            this.fadeAction(1, g.Picture, 1);
            qq.show(g.info);
            this.setPos()
        }else{
            var W = w > 640 ? 640 : w, H = (W/w)*h > 310 ? (W/w)*h : 310;
            qq.G('galleryPic').style.width = W + 'px';
            qq.G('galleryPicWrap').style.height = Math.floor(H) + 'px';
            qq.G('galleryPic').src = this.arrItems[this.currentNo][0];
            this.fadeAction(1, qq.G('galleryPic'), 1);
        }

        this.showInfo(this.currentNo);
        this.showNum(this.currentNo);
    },
    setPos: function() {
        var _this = this;
        this.initialCoord = [Math.round(qq.windowWidth()) / 2, Math.round(qq.windowHeight()) / 2];
        this.innerSize = [Math.round(qq.width(_this.Wrap)) / 2, Math.round(qq.height(_this.Wrap) + qq.height(_this.info)) / 2];
        qq.C(_this.Wrap, "left", this.initialCoord[0] - this.innerSize[0] + "px");
        qq.C(_this.Wrap, "top", this.initialCoord[1] - this.innerSize[1] + "px");
        qq.C(_this.info, "top", this.initialCoord[1] + qq.height(_this.Wrap) / 2 + "px")
    },
    changeImage: function() {
        var _this = this,  _items = isMask ? qq.GT(this.MaskItems, 'li') :  qq.GT(this.GalleryItems, 'li'), No = arguments[0];

        if (No < 0) {
            No = 0;
            return
        } else {
            if (No >= this.arrCount) {
                clearTimeout(this.doLoad);
                clearInterval(this.doAuto);

                this.lastFram();
                this.currentNo = this.arrCount;
                qq.G('galleryPicWrap').style.height = '488px';
                if(isMask){
                    qq.C(_this.Wrap, 'width', '640px');
                    qq.C(_this.Wrap, 'height', '488px');
                    this.PicStatu('hide');
                    qq.C(this.Wrap, "display", "block");
                    this.setPos();
                    qq.C(this.itemsNext, "display", "none");
                    qq.C(this.imgNext, "display", "none");
                }
                if (this.oldNo != this.arrCount) {
                    qq.removeClass(_items[this.oldNo], "hover");
                    this.oldNo = this.arrCount
                }
                qq.addClass(_items[this.arrCount], "hover");
                this.lastGoto("open");
                return false
            }
        }
        this.currentNo = No;
        addCount(this.currentNo);
        this.loadImage();
        if (this.currentNo != this.oldNo) {
            this.moveAction(this.currentNo)
        }
        if (this.oldNo != this.currentNo) {
            qq.removeClass(_items[this.oldNo], "hover")
        }
        qq.addClass(_items[this.currentNo], "hover");
        this.oldNo = this.currentNo;
        if (!this.isPicStatus) {
            this.statusPic()
        }
        _this.hideMenu();
        this.changeHash(_this.currentNo);
        this.lastGoto("close");
    },
    changeHash: function(n){
        var hash = /\#p\=/i.test(location.hash);
        if(!hash){
            location.hash = "#p=1";
        }else{
            location.hash = "#p="+parseInt(n+1);
        }
    },
    statusPic: function() {
        this.isPicStatus = true;
        qq.C(this.imgPrev, "display", "");
        qq.C(this.imgNext, "display", "");
        qq.C(this.itemsPrev, "display", "");
        qq.C(this.itemsNext, "display", "");
        qq.C(this.Picture, "display", "block");
        qq.C(this.popClose, "display", "block");
        clearInterval(this.doZoom)
    },
    fadeAction: function() {
        var args = arguments;
        if (args[3]) {
            qq.C(args[0], "opacity", args[3])
        }
        var _this = this;
        var modulus = args[0] == 1 ? this.fadeInModulus: this.fadeOutModulus;
        var intervalID = setInterval(function() {
            _this.fadeLoop(args[1], args[2], modulus, intervalID)
        }, this.actionSpeed);
        return intervalID
    },
    fadeLoop: function() {
        var args = arguments;
        var d = args[0];
        var currOpacity = Number(qq.C(d, "opacity"), 10);
        var modulus = parseInt(args[2], 10) || 5;
        space = args[1] - currOpacity;
        speed = space / 3 > 0.01 ? space / 3 : 0.01;
        if (currOpacity < args[1]) {
            currOpacity += speed;
            qq.C(d, "opacity", currOpacity)
        } else {
            qq.C(d, "opacity", 1);
            clearInterval(args[3])
        }
    },
    slideLoop: function(obj, styleName, start, end, speed, u){

        if(typeof(u) == 'undefined'){u = 'px'};
        clearTimeout(obj['_extend_' + styleName.replace(/\-\.\=/,'_') + '_timeOut']);
        if(start > end){
            speed = - Math.abs(speed);
        }else{
            speed = Math.abs(speed);
        };
        var now = start;
        var length = end - start;
        obj['_extend_' + styleName.replace(/\-\.\=/,'_') + '_timeOut'] = setTimeout(function(){
            now += speed;
            var space = end - now;
            if(start < end){
                if(space < length/3){
                    speed = Math.ceil(space/3);
                };
                if(space <= 0){
                    obj[styleName] = end + u;
                    return;
                };
            }else{
                if(space > length/3){
                    speed = Math.floor(space/3);
                };
                if(space >= 0){

                    obj[styleName] = end + u;
                    return;
                };
            };

            obj[styleName] = now + u;
            obj['_extend_' + styleName.replace(/\-\.\=/,'_') + '_timeOut'] = setTimeout(arguments.callee,20);

        },20);

    },
    slideShow: function() {
        var _this = this;
        this.isItemsStatus = "show";
        this.slideLoop(_this.Bottom.style, "height", 29, 117, 10)
    },
    slideHide: function() {
        var _this = this;
        this.isItemsStatus = "hide";
        this.slideLoop(_this.Bottom.style, "height", 117, 29, 10)
    },
    mousemove: function(e) {
        var mouseY = qq.E(e).y,
            hotArea,
            _this = this;
        if (this.isItemsStatus == "hide") {
            hotArea = 29
        } else {
            hotArea = 117
        }
        clearTimeout(_this.doSlideHide);
        if (qq.windowHeight() - mouseY < hotArea) {
            if (this.isItemsStatus == "show") {
                return
            }
            this.slideShow()
        }
        if (qq.windowHeight() - mouseY > hotArea) {
            clearTimeout(_this.doSlideHide);
            if (this.isItemsStatus == "hide") {
                return
            }
            this.doSlideHide = setTimeout(function() {
                    _this.slideHide()
                },
                500)
        }
    },
    zoomAction: function() {
        var g = this;
        clearInterval(this.doZoom);
        switch (arguments[0]) {
            case - 1 : this.currentSizePer *= this.zoomSpeed;
                break;
            case 0:
                this.currentSizePer = 100;
                break;
            case 1:
                this.currentSizePer /= this.zoomSpeed;
                break;
            default:
                this.currentSizePer = arguments[0];
                break
        }
        if (!arguments[1]) {
            if (this.currentSizePer < this.zoomMin) {
                this.currentSizePer = this.zoomMin
            }
            if (this.currentSizePer > this.zoomMax) {
                this.currentSizePer = this.zoomMax
            }
            this.currentSizePer = Math.round(this.currentSizePer)
        }
        var c = this.arrItems[this.currentNo][2];
        this.currentZoomSize = [Math.round(c[0] * this.currentSizePer / 100), Math.round(c[1] * this.currentSizePer / 100)];
        this.innerSize = [Math.round(this.currentZoomSize[0] - c[0]), Math.round(this.currentZoomSize[1] - c[1])];
        this.currentZoomCoord = [Math.round(this.initialCoord[0] - this.currentZoomSize[0] / 2), Math.round(this.initialCoord[1] - this.currentZoomSize[1] / 2)];
        var f = [Math.round(this.moveDistance[0] * this.currentSizePer / 100), Math.round(this.moveDistance[1] * this.currentSizePer / 100)];
        var a = this.currentZoomSize;
        var e = [this.currentZoomCoord[0] - f[0], this.currentZoomCoord[1] - f[1]];
        var d = arguments[2] == undefined ? this.zoomAnimation: arguments[2];
        if (d) {
            var b = this;
            this.doZoom = setInterval(function() {
                    b.zoomLoop(a, e)
                },
                this.actionSpeed);
            this.isZooming = true
        } else {
            qq.C(g.Wrap, "width", a[0] + 18 + "px");
            qq.C(g.Wrap, "height", a[1] + 48 + "px");
            qq.C(g.Picture, "width", a[0] + "px");
            qq.C(g.Picture, "height", a[1] + "px");
            qq.C(g.Wrap, "left", g.initialCoord[0] - a[0] / 2 + "px");
            qq.C(g.Wrap, "top", g.initialCoord[1] - a[1] / 2 + "px");
            if (qq.B.ie6) {
                qq.C(g.curPrev, "width", (a[0] + 16) / 2 + "px");
                qq.C(g.curPrev, "height", a[1] + 16 + "px");
                qq.C(g.curNext, "width", (a[0] + 16) / 2 + "px");
                qq.C(g.curNext, "height", a[1] + 16 + "px")
            }
        }
        qq.C(g.zoomBtn, "display", "none")
    },
    zoomLoop: function() {
        var a = arguments[0];
        var d = arguments[1];
        var c = [Math.round((a[0] - this.Picture.width) / this.zoomModulus * 10) / 10, Math.round((a[1] - this.Picture.height) / this.zoomModulus * 10) / 10];
        var b = [Math.round((d[0] - this.Picture.offsetLeft) / this.zoomModulus * 10) / 10, Math.round((d[1] - this.Picture.offsetTop) / this.zoomModulus * 10) / 10];
        if ((c.join(",") != "0,0") || b.join(",") != "0,0") {
            this.Picture.width += (c[0] > 0 ? Math.ceil(c[0]) : Math.floor(c[0]));
            this.Picture.height += (c[1] > 0 ? Math.ceil(c[1]) : Math.floor(c[1]));
            this.perHint(Math.round(this.Picture.width / this.arrItems[this.currentNo][2][0] * 100))
        } else {
            clearInterval(this.doZoom);
            this.isZooming = false
        }
    },
    moveAction: function() {
        var _this = this,
            obj = isMask ? this.MaskItems : this.GalleryItems,
            _o = {},
            _left = parseInt(qq.C(obj, "left")) || parseInt(obj.style.left);
        //_left = parseInt(qq.C(obj, "left"));

        var runc = (arguments[0] - this.viewNo) * (_this.itemWidth) + _left;
        if (this.currentNo + 1 + this.viewNo >= this.arrCount + 1) {
            if (_left > -(this.arrCount + 1 - this.viewCount) * (_this.itemWidth)) {
                _o = this.calObjShow(parseInt(_left),parseInt(-(this.arrCount + 1 - this.viewCount) * (_this.itemWidth)));
                this.picListDelay(_o);
                this.slideLoop(obj.style, "left", _left, -(this.arrCount + 1 - this.viewCount) * (_this.itemWidth), 10)
            } else {
                return
            }
            return
        }

        if (this.currentNo <= this.viewNo) {
            if (_left < 0) {
                _o = this.calObjShow(parseInt(_left),0);
                this.picListDelay(_o);
                this.slideLoop(obj.style, "left", _left, 0, 10)
            }
            return
        }
        _o = this.calObjShow(parseInt(_left),parseInt(_left + -runc));
        this.picListDelay(_o);
        this.slideLoop(obj.style, "left", _left, (_left + -runc), 10)
    },
    getMenu: function(e, picUrl) {
        var el = qq.E(e), _this = this,parent = qq.G('Cnt-Main-Article-QQ'), _x = qq.getX(parent), _y = qq.getY(parent),X = qq.scrollX(),  Y = qq.scrollY();
        qq.G("cmenu").style.display = "block";
        qq.G("cmenu").style.left = parseInt(el.x + X - _x) + "px";
        qq.G("cmenu").style.top = parseInt(el.y + Y - _y) + "px";
        qq.G("prop").onclick = function() {
            window.open(picUrl);
            _this.hideMenu();
        };
        return false;
    },
    hideMenu: function() {
        qq.G("cmenu").style.display = "none";
    },
    nowSite: function(){
        var siteN = ARTICLE_INFO.article_url.match(/http:\/\/([^\/]+)\//i)[1], nowSite=siteN.split(".")[0];
        return nowSite;
    },
    secondSite : function(){
        var siteN = ARTICLE_INFO.article_url.match(/http:\/\/([^\/]+)\//i)[1], secondSite=siteN.split(".")[1];
        return secondSite;
    },
    subDomain: function(){//域名除去.qq.com后的部分
        return location.hostname.replace(/\.qq\.com/, "");
    },
    lastGoto: function(a) {
        var _this = this;

        var nowSite = this.nowSite();

        var showAD = false;

        if(nowSite == 'news' && ARTICLE_INFO.isShowLastAD && ARTICLE_INFO.isShowLastAD == 1){
            showAD = true;
        }
        var _s_ad = window['QQ_Ad_Config'].sideAd || 'huandeng_F_clcf1';
        if (a == 'open') {
            qq.G('lastCon').style.height = 488 + "px";
            if(isMask) this.Wrap.appendChild(qq.G('lastCon'));
            else qq.G('Gallery').appendChild(qq.G('lastCon'));
            qq.G('lastCon').style.display = 'block';
            qq.G('replayPic').href = "javascript:void(0)";
            qq.EA(qq.G('replayPic'), 'click', function(){
                _this.lastGoto("close");
                _this.currentNo = 0;
                _this.changeImage(0);
            });
            if(window['QQ_Ad_Config'].noAd.indexOf(nowSite)==-1 || showAD){//有AD频道
                window.crystal && crystal.getArea(_s_ad).invoke('open');
            }
            return false;
        } else {
            qq.G("lastCon").style.display = 'none';
            if(window['QQ_Ad_Config'].noAd.indexOf(nowSite)==-1 || showAD){//有AD频道
                window.crystal && crystal.getArea(_s_ad).invoke('close');
            }
            return false;
        }
    },
    _AD_id: '',
    _LastAdHTML: function(){
        var i = LastADSet.length - 1, ch = '';

        for(; i >= 0; i--){
            ch = LastADSet[i].split("|")[0];
            if( ch == this.nowSite()){
                this._AD_id = LastADSet[i].split("|")[1];
                break;
            }
        }

        /*this._AD_id = this._AD_id || 'huandeng_F_pic';
         var str = '<div id="' + this._AD_id + '" style="width:550px;height:320px;display:none;" class="l_qq_com" bossZone="photoShowEndAD"></div>';
         qq.G('galleryAD').innerHTML = str;
         crystal.request(this._AD_id);*/
    },
    _lastTmpl: '<li bosszone="photoshowRe{N}" articleType="{articleType}"><a class="lastImg" href="{url}" target="_blank"><img src="{imgUrl}" title="{title}" /></a><a class="lastTxt" href="{url}" target="_blank" title="{title}">{shortTitle}</a></li>',
    _formatTmpl: function(obj, html, n){
        var str = html.replace(/\{([^\}]+)\}/gi, function(m, r){
            switch(r){
                case 'N':
                    return n + 1;
                case 'n':
                    return n;
                case 'url':
                    return obj.url.indexOf('http:') > -1 ? obj.url : 'http:\/\/' + obj.url;
                case 'title':
                    return obj.title;
                case 'shortTitle':
                    return obj.title.realLength() > 36 ? (obj.title.cut(36) + '\u2026') : obj.title;
                case 'imgUrl':
                    return obj.fimg.replace('http:', '');
                case 'articleType':
                    return (obj.xh_flag && obj.xh_flag == 1) ? 'xh_flag' : ' ';
            }
        });
        return str;
    },
    _last_is_ksh: function(){// 当前站点是否使用可视化末页数据(通过域名匹配)
        var subdm = this.subDomain(),
            sitesArr = window['lastPic_ksh_sites'];
        if ( subdm && sitesArr && jQuery.isArray(sitesArr) ) {
            if ( jQuery.inArray(subdm, sitesArr) > -1 ) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    _lastData: [],
    _url: '//i.match.qq.com/web/hdpicture?ch=' + ARTICLE_INFO.site,
    _lastArr: function(id){

        var _this = this;

        if(typeof ExposureBoss === 'function') ExposureBoss(1604, 'EXphotoshowRe1');

        if(this._lastData.length > 0) {
            qq.G(id).innerHTML = _this._lastData.join('');
            return;
        }

        //末页备份接口数据
        var subdomain = this.subDomain();
        if(window.Hd_config && (Hd_config.lastPageSafe || Hd_config.articleLastSafe.indexOf(subdomain)!==-1)){
            getSafeCon(null,1);
            return;
        }

        //注入水星平台修改内容
        getSafeCon(function(){
            $.ajax('//i.match.qq.com/xinghai?channel_id=8',{dataType:'jsonp'}).done(function (d) {
                //console.log(d);
                if(d.data.length>0){
                    for(var i=0;i<d.data.length;i++){
                        var item = d.data[i];
                        var data = {
                            url:item.url,
                            title:item.title,
                            fimg:item.img.replace('http:', '')
                        }
                        _this._lastData[item.position] = _this._formatTmpl(data, _this._lastTmpl, item.position)
                    }
                }
                qq.G(id).innerHTML = _this._lastData.join('');
            }).fail(function(){
                qq.G(id).innerHTML = _this._lastData.join('');
            });
        });

        //安全内容
        function getSafeCon(callback,append){
            //抓取//ws.cms.webdev.com/cgi-bin/article.php?site=video&cnt=20&of=js&oe=GBK&callback=hd2013
            //新闻频道页面片,ID:2193
            $.ajax({
                url: "//news.qq.com/c/hd2017.js",
                dataType: "jsonp",
                jsonpCallback:'hd2013'
            }).done(function(json){
                //console.log(json);
                var count = 0;
                for(var i = 0,len=json.data.length; i < len; i++){
                    if(json.data[i].group_images){
                        var data = {
                            url:json.data[i].url,
                            title:json.data[i].title,
                            fimg:json.data[i].mimgs&&json.data[i].mimgs.imgurl31?json.data[i].mimgs.imgurl31:json.data[i].img
                        };
                        data.fimg = data.fimg.replace('http:', '')
                        _this._lastData.push(_this._formatTmpl(data, _this._lastTmpl, i));
                        count++;
                        //console.log(i,count);
                        if(count>=12) break;
                    }else{
                        continue;
                    }
                }
                callback&&callback();
                append&&(qq.G(id).innerHTML = _this._lastData.join(''))

            })
        }

    },
    lastFram: function() {
        var _this = this;
        this._lastArr('listCon');
        qq.EA(qq.G("replayPic"), "click", function() {
            _this.lastGoto("close");
            _this.currentNo = 0;
            _this.changeImage(0);
        });
    },
    PicStatu: function() {
        if (arguments[0] == "show") {
            qq.C(this.Picture, "display", "block");
            qq.C(this.info, "display", "block");
        } else {
            if (arguments[0] == "hide") {
                qq.C(this.Picture, "display", "none");
                qq.C(this.info, "display", "none");
                this.isPicStatus = false
            } else {
                return false
            }
        }
    },
    setKeyboard: function(a) {
        var c = this;
        if (a) {
            document.onkeydown = function(b) {
                c.keyboardAction(b)
            }
        } else {
            document.onkeydown = null
        }
    },
    keyboardAction: function(c) {
        c = c || window.event;
        var b = c.keyCode;
        var a = false;
        if (b == 27) {
            this.close();
            a = true
        } else {
            if (b == 37) {
                this.changeImage(this.currentNo - 1);
                a = true
            } else {
                if (b == 39) {
                    this.changeImage(this.currentNo + 1);
                    a = true
                }
            }
        }
        if (a) {
            this.end(c)
        }
    },
    stopAll: function() {
        clearTimeout(this.doLoad);
        clearTimeout(this.doFadePicHint);
        clearInterval(this.doZoom);
        clearInterval(this.doAuto);
    },
    close: function() {
        isMask = false;
        var _this = this, _items = qq.GT(this.MaskItems, 'li'), _list = qq.GT(this.GalleryItems, 'li');
        this.stopAll();
        qq.C(this.mask, "display", "none");
        qq.C(this.frame, "display", "none");
        qq.C(this.Picture, "display", "block");
        qq.C(this.itemsNext, "display", "block");
        qq.C(this.imgNext, "display", "block");
        qq.C(this.popClose, "display", "block");
        this.scrollBarShow();
        clearInterval(_this.doAuto);
        qq.removeClass(_items[_this.currentNo], "hover");

        this.setLayoutItems(this.GalleryItems, qq.G('galleryList'));
        this.loadImage();
        qq.addClass(_list[this.currentNo], "hover");
        this.oldNo = this.currentNo;
    },
    showNum: function() {

        var str_num = '<span><em class="num_Cur">' + Number(arguments[0] + 1) + '</em>/<em class="num_Count">' + this.arrCount + '</em></span>';

        isMask ? this.Count.innerHTML = this.mCount.innerHTML = str_num : qq.G('galleryCount').innerHTML  = str_num;
    },
    showInfo: function() {
        var f = this;
        var d = /[^\x00-\xff]/g,
            c = qq.trim(this.arrItems[arguments[0]][1]),
            b = qq.trim(this.arrItems[arguments[0]][4]),
            a,
            e;
        b.replace(d, "mm").length > 126 ? qq.removeClass(f.info, "txtC") : qq.addClass(f.info, "txtC");
        if(b.replace(d, "mm").length == 0){
            qq.G('galleryInfo').style.visibility = 'hidden';
            qq.G('gallery_btn_close').style.display = 'none';
        } else {
            qq.G('galleryInfo').style.visibility = 'visible';
            qq.G('gallery_btn_close').style.display = 'block';
        }
        qq.G('galleryTxt').innerHTML = b;
        if(this.info) this.info.innerHTML = b;
        qq.G('contTxt').innerHTML = c;

    },
    hint: function() {
        var a = "";
        if (arguments[0]) {
            a = arguments[0]
        } else {
            a = this.hintTxt
        }
        this.fHint.innerHTML = a
    },
    end: function(a) {
        a = a || window.event;
        a.stopPropagation && (a.preventDefault(), a.stopPropagation()) || (a.cancelBubble = true, a.returnValue = false)
    },
    destruction: function() {
        this.stopAll();
        this.mask = null;
        this.frame = null;
        this.Picture = null;
        this.fHint = null;
        this.imgPrev = null;
        this.imgNext = null;
        window[this.name] = null
    }
};
function setTit() {
    //var newTitle = document.title;
    //newTitle = document.title.replace(/#p=\d/g,'');
    var originalTitle = document.title.split("#")[0];
    try {
        document.attachEvent('onpropertychange', function (evt) {
            if(evt.propertyName === 'title' && document.title !== originalTitle) {
                setTimeout(function () {
                    document.title = originalTitle;
                }, 1);
            }
        });
    } catch (e) {
        // noop
    }
    document.title = originalTitle;
}
function creatIF() {
    if(getDomain()=="2012"){
        var a = document.createElement("iframe");
        a.id = "iframeP";
        a.name = "iframeP";
        a.style.display = "none";
        a.width = "0px";
        a.height = "0px";
        qq.G("PGViframe").appendChild(a);
    }
    setTit();
}
function getDomain(){//返回域名
    var Do = location.hostname;
    return Do.split(".")[0];
}
function addCount(a) {
    function oldPgvDetail(){
        if (typeof pgvMain == "function"){
            if(typeof photoJson[a].pgv!=="undefined"){
                if(photoJson[a].pgv!==""){
                    pvCurDomain=photoJson[a].pgv;
                }else{
                    pvCurDomain=("comic.qq.com" === window.location.host) ? "ac.qq.com" : window.location.host;
                }
            }
            pvRefDomain = location.host;
            pvRefUrl = location.pathname;
            pvRepeatCount = 1;
            pgvMain();
        }
    }
    function newPgvDetail(){
        var catalogPathR1 = ARTICLE_INFO.catalog_full.toString().replace(/-/g,".");
        var catalogPath = catalogPathR1.toString().replace(/_/g, "-"), L, Z, W, M, P;

        if(ARTICLE_INFO.topic.name.length > 0){
            L = "L.",
                Z = "Z." + catalogPath + "." + ARTICLE_INFO.topic.name;
        }else{
            L = "L." + catalogPath,
                Z = "Z.";
        }
        W = "W." + ARTICLE_INFO.type,
            M = "M." + ARTICLE_INFO.tpl.type + ARTICLE_INFO.tpl.stype,
            P = "P." + ARTICLE_INFO.site.replace(/_/g,"-"),
            pgvInfo = L + "_" + Z + "_" + W + "_" + M + "_" + P;
        if(typeof photoJson[a].pgv!=="undefined"){
            if(photoJson[a].pgv!==""){
                pvCurDomain=photoJson[a].pgv;
            }else{
                pvCurDomain=("comic.qq.com" === window.location.host) ? "ac.qq.com" : window.location.host;
            }
        }
        pvRefDomain = location.host;
        pvRefUrl = location.pathname;
        pvRepeatCount = 1;
        if(typeof(pgvMain) == 'function'){if(typeof(pgvInfo) != 'undefined'){pgvMain({pgUserType:pgvInfo});}}
    }
    //pgv 20130711
    if(window['ARTICLE_INFO'] && window['ARTICLE_INFO']['catalog_full']){
        newPgvDetail();
    }else {
        oldPgvDetail();
    }
    // 添加统一上报
    if(typeof ExposureBoss === 'function'){
        ExposureBoss(1604, 'por_all&vertical=CZTW');
    }else{
        function ExposureBoss(bossId, sOp){
            var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
            var iQQ = (null === a) ? Math.ceil(Math.random()*1e15) : unescape(a[2]),
                sBiz = arguments[2] || '';
            (new Image()).src = "//btrace.qq.com/kvcollect?BossId=" + bossId + "&Pwd=0&iQQ=" + iQQ + "&sOp="+ sOp +"&sUrl=" + encodeURIComponent(location.href) +"&site=" + location.host + "&_dc=" + Math.random();
        }
        ExposureBoss(1604, 'por_all&vertical=CZTW');
    }
}
qq.EA(window, "load", creatIF);/*  |xGv00|7dfa1181f710c98dd8f5e5cf6df1396e */