/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	var LSwiperMaker = __webpack_require__(24);
	var $ShopIndex = $('#J_ShopIndex ul'); //dom元素
	var mapConObject = JSON.parse($CONFIG.shop.pc_page_config);//得到的字符串;
	var title = $CONFIG.shop.title;
	document.title = title;

	var html = '';
	$ShopIndex.html(html);

	var solidPicNum=0;
	function getS(s){
	    return s.substring(0,s.lastIndexOf('/')+1);
	}

	// 1.解析config配置生成dom元素
	parseObjectToHtml(mapConObject);
	function parseObjectToHtml(mapConObject){
	    for(index in mapConObject){
	        var val = mapConObject[index];
	        if(typeof(val.anchor) === 'undefined' || val.anchor == 'undefined'){
	            val.anchor = ''
	        }
	        console.log(val.anchor,'---------------')
	        if(val['Pictype']== 'solid'){
	            var con = val['con'];
	            html+= '<li class="solid" id="'+val.anchor+'">';
	            html+='<div id="J_Slide" class="hy-slide solidPicNum'+solidPicNum+'">\
	                    <div class="bd">\
	                        <ul>';
	            for(index2 in con){
	                if(con[index2]['pic']){
	                    var url = con[index2]['url'];
	                    if(url){
	                        var ahref = 'href="'+url+'"';
	                    }else{
	                        var ahref = 'onclick="javascript:return false;"';
	                    }
	                    if(index2==0){
	                        html+= '<li>\
	                                     <a '+ahref+'><img src="'+con[index2]['pic']+'" alt=""></a>\
	                                </li>';
	                    }else{
	                        html+= '<li>\
	                                     <a '+ahref+'><img src="'+con[index2]['pic']+'" alt=""></a>\
	                                </li>';
	                    }
	                }
	            }
	            html+= ' </ul>\
	                    </div>\
	                    <div class="xz">\
	                     <ul>';
	            for(index2 in con){
	                if(con[index2]['pic']){
	                    if(index2==0){
	                        html+= '<li class="on"></li>';
	                    }else{
	                        html+= '<li></li>';
	                    }
	                }
	            }
	            html+= '</ul>\
	                    </div>\
	            <div class="hd-num">\
	                     <ul>';
	            for(index2 in con){
	                if(con[index2]['pic']){
	                    var nowIndex = index2-0+1;
	                    if(index2==0){
	                        html+= '<li class="on">第'+nowIndex+'张</li>';
	                    }else{
	                        html+= '<li>第'+nowIndex+'张</li>';
	                    }
	                }
	            }
	            html+= '</ul>\
	                    </div>\
	                </div>\
	            </li>';
	            solidPicNum++;
	            // 视频
	        }else if(val['Pictype']== 'video'){

	            html+= '<li  class="hot-video J_Video J_Video'+index+'" id="'+val.anchor+'">';
	            html+= '<div id="J_videoIdDom" class="video-dom" data-vid="'+val.vid+'"></div>';
	            if(val.con &&　val.con.length>0){
	                var dataBj = val.con[0]['pic'];
	                html+= '<img class="video-dom-bj" src="'+dataBj+'">';
	            }
	            html+=  '</li>';
	            // 直播
	        }else if(val['Pictype'] == 'live'){
	            /**
	             * 直播 $CONFIG.shop.pc_page_config  直播字段说明f(val['Pictype'] == 'live')
	             *  Pictype : 直播
	             *  commentid: id
	             *  背景图 : con[0]{pic}
	             *  liveType: statusid
	             *  pid : pid,
	             *  //playType:playType
	             *  sid: sid;
	             *  start:startTime;
	             *  title: title;
	             *  vid: vid,
	             *  img : yuCon[0]['pic']
	             */
	            var liveVideo = {
	                pid: val['pid'], //节目id
	                sid: val['sid'], //直播流id
	                vid: val['vid'], //点播id
	                commentid: val['id'], //评论id
	                title: val['title'], //视频标题
	                img: val['yuCon'][0]['pic'], //封面图（900*495）
	                statusid: val['liveType'], //播放状态id(0:即将开始 ,1:直播中,2:观看视频)
	                start: val['startTime'] //开始时间（yyyy-mm-dd hh:mm:ss）
	            }
	            if(val['liveType'] ==0){
	                liveVideo.sid = '';
	                liveVideo.vid = '';
	                liveVideo.commentid = '';
	            }

	            var defailtImg = liveVideo.img || '';
	            html+= ' <li class="hy-live" id="'+val.anchor+'">';
	            html+= '<div class="videoBox">\
	                <div class="wrapper">\
	                <div class="barL910">\
	                <div class="videoPlayer">\
	                <div id="mod_player"></div>\
	                <img src="'+defailtImg+'" />\
	                <div class="videoTitle">\
	                <div class="bg"></div>\
	                <div class="con">\
	                <h6> <i></i> <strong>0</strong> <span>人围观</span> </h6>\
	                </div>\
	                </div>\
	                </div>\
	                <div class="videoH1"></div>\
	                </div>\
	                <div class="barR330">\
	                <!-- 评论区(直播中) -->\
	                <div class="videoPlaying" bosszone="comment">\
	                <h3 class="title">车友热议</h3>\
	                <a href="javascript:void(0);" target="_self" class="moreComments">加载更多</a>\
	                <!-- 评论列表 -->\
	                <div class="videoComment swiper-container" id="comments_list_wrap">\
	                </div>\
	                <!-- 视频无评论信息 -->\
	                <div class="noComment">\
	                <span></span>\
	                <p>暂无弹幕，赶紧来抢沙发吧</p>\
	            </div>\
	            <!-- 评论输入框 -->\
	            <div class="mod_add_comment">\
	                <div class="add_comment" id="addComment">\
	                <input type="text" placeholder="围观的我怎能不留言~" class="inp_text" id="inp_text" maxlength="25" onkeydown="textCounter();" onkeyup="textCounter();" />\
	                <div class="face"></div>\
	                </div>\
	                <a href="javascript:void(0);" class="btn_submit" title="&quot;Ctrl + Enter&quot; 快捷键直接发送。" bosszone="cybutton">发送</a>\
	                </div>\
	                </div>\
	                <!-- 评论区(未开始) -->\
	                <div class="videoNotStart">\
	                <h3><i></i><span>预 始时间</span></h3>\
	                <div class="time">\
	                <strong>00</strong>\
	                <span>月</span>\
	                <strong>00</strong>\
	                <span>日</span>\
	                <strong>00</strong>\
	                <span>时</span>\
	                <strong>00</strong>\
	                <span>分</span>\
	                </div>\
	                </div>\
	                </div>\
	                <div class="cls"></div>\
	                </div>\
	                </div>';
	            if(val.con[0]['pic']){
	                html+= '<img class="video-dom-bj" src="'+val.con[0]['pic']+'">';
	            }
	            html+= '</li>';

	            var jsSrc = '//qzs.qq.com/tencentvideo_v1/js/txv.base.min.js';
	            var jsSrc1 = '//imgcache.qq.com/tencentvideo_v1/tvp/js/tvp.player_v2_jq.js';
	            var jsSrc2 = '//auto.qq.com/2017/autolive.min.js';
	            // var jsSrc3 = '/application/fe/web/dist/js/entry/page/video2after.js';
	          loadScript('//qzs.qq.com/tencentvideo_v1/js/tvp/tvp.player.js',function(){
	            loadScript(jsSrc,function(){
	              loadScript(jsSrc1,function(){
	                loadScript(jsSrc2,function(){
	                  var cfg = liveVideo; //获取视频配置信息
	                  $(".videoH1").html(cfg.title); //视频标题
	                  timeFn(cfg); //开始时间
	                  viewerFn(cfg); //围观人数
	                  commentFn(cfg); //评论控制
	                  //视频设置
	                  $("#mod_player").attr("data-vid",cfg.vid).attr("data-sid",cfg.sid).attr("data-status",cfg.statusid).attr("data-pic",cfg.img);
	                  $("#mod_player").autoQqPlay({
	                    width: 900,
	                    height: 540,
	                    autoplay: !!cfg.statusid
	                  });

	                });
	              })
	            },'UTF-8');
	          },'UTF-8');
	        }
	        else{
	            var imgUrl = val['Uurl'];
	            imgUrl = getS(imgUrl);
	            html+= '<li class="map" id="'+val.anchor+'"><img src="'+imgUrl+'" alt=""/>';
	            var posiition =val['position'];
	            for(index2 in posiition){
	                var nowVal = posiition[index2];
	                if(nowVal!=null){
	                    var left = nowVal.showStartX*100+'%';
	                    var top = nowVal.showStartY*100+'%';
	                    var width = nowVal.showWidth*100+'%';
	                    var height = nowVal.showHeight*100+'%';
	                    html+='<a style="left:'+left+';top:'+top+';width:'+width+';height:'+height+';" href="'+nowVal['url']+'"></a>';
	                }
	            }
	            html+='</li><p style="height: 0;width: 100%"></p>';
	        }
	    }
	}
	$ShopIndex.html(html);
	// 3.播放视频

	loadScript('//vm.gtimg.cn/tencentvideo_v1/3party/zepto.js',function() {
	  loadScript('//vm.gtimg.cn/tencentvideo/txp/js/txplayer.js',function() {
	    videoPlay($('#J_videoIdDom'),$('#J_videoIdDom').attr('data-vid'));
	  },'UTF-8')
	},'UTF-8')
	    // 3.1调用视频插件
	function videoPlay(dom,vid) {
	    if(!vid){
	        return false;
	    }
	    var domP = dom.parent('li');
	    var videoWidth = domP.width();
	    var videoHeight = 9/16*videoWidth;


	  var player_width = window.innerWidth > 540 ? 540 : window.innerWidth; //视频播放器宽
	  var player_height = parseInt(player_width / 16 * 9); //视频播放器高
	  player_height = player_height > window.innerHeight ? window.innerHeight : player_height;




	  domP.height(videoHeight);
	    if(typeof player=='undefined'){
	      var playerConfig = {
	        containerId: 'J_videoIdDom',
	        vid: vid,
	        width: videoWidth,
	        height: videoHeight,
	        // poster:$('.video-dom-bj').attr('src'),
	        // videoType: 'vod',
	        // playerType: 'h5',
	        // useComboService: true,
	        autoplay: true
	        // isUseIgnore:true

	      };
	      var player = new Txplayer(playerConfig);
	      //
	        // var video = new tvp.VideoInfo();
	        // video.setVid(vid);//视频vid
	        // video.setTitle("嘿嘿发车-混动顾虑多？一次全解答");//视频标题
	        // var player = new tvp.Player(videoWidth,videoHeight);//播放器尺寸
	        // player.setCurVideo(video);
	        // player.addParam("searchbar","0");//是否显示顶部搜索框
	        // player.addParam("showend","0");//是否显示播放结束后的推荐视频
	        // player.addParam("autoplay","0");//是否自动播放
	        // // player.addParam("pic","http://img1.gtimg.com/auto/pics/hv1/209/230/2228/144934559.jpg");//默认图片地址，当auto=0时有效；不传入则使用视频截图，图宽=播放器宽，图高=播放器高-46
	        // player.write("J_videoIdDom");
	        //
	        // //
	        // // var video = new tvp.VideoInfo();
	        // // //向视频对象传入视频vid
	        // // video.setVid(vid);
	        // // //定义播放器对象
	        // // var player = new tvp.Player(videoWidth, videoHeight);
	        // // player.setCurVideo(video);
	        // // //设置精简皮肤，仅点播有效
	        // // player.addParam("flashskin", "http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf");
	        // // player.addParam("autoplay", "1");
	        // // player.addParam("wmode", "transparent");
	        // // //视频结束，音频播放
	        //
	        //
	        // player.onended = function(){
	        //     musicPlayFn();
	        // }
	        // player.write("J_videoIdDom");
	    }else{
	        // player.play();
	    }
	}
	// 2.循环调用幻灯片
	for(i=0;i<solidPicNum;i++){
	    hySlide('.solidPicNum'+i);
	}
	function hySlide(dom){
	    var dWidth = $(dom).width();
	    var newdWidth = 0; //现在外层容器停止后移动到的距离；
	    var $J_Slide = $(dom);
	    var J_Slide = $(dom).find('.bd')[0];
	    var index = 0; // li的索引值；
	    var $ul = $(dom).find('.bd ul');
	    var $li = $ul.find('li');
	    $li.width(dWidth);
	    var liLength = $li.length;
	    init();
	    //幻灯片的初始化函数
	    function init(){
	        chagenum();
	        bindSlide();
	        $(dom).find('.xz').on('click','li',function(){
	            moveNum($(this).index());
	            return false;
	        })

	        var inTime = setInterval(function(){
	            if(index >= liLength-1){
	                index=0;
	            }else{
	                index++;
	            }
	            moveNum(index);
	        },3000);
	    }

	    function addIndex(){
	        
	    }
	    var lastX = 0;
	    var YesClick = true;
	    var isdown = false;
	    var conNum = 0;
	    $(dom).find('.bd').mousedown(function(e) {
	        isdown = true;
	        lastX = e.pageX;
	        if ( e && e.stopPropagation )
	            //因此它支持W3C的stopPropagation()方法
	            e.stopPropagation();
	        else
	            //否则，我们需要使用IE的方式来取消事件冒泡
	            window.event.cancelBubble = true;
	        return false;
	        e.preventDefault();

	    });

	    $(dom).find('.bd').mousemove(function(e) {
	        if(!isdown){
	            return false;
	        }
	        YesClick =false;
	         // 移动的值
	         var moveX = e.pageX+newdWidth;
	         console.log(moveX)
	        if(Math.abs(moveX)>dWidth/9){
	            return false;
	        }else{

	            huyue.translate ($ul[0],moveX,0);
	        }

	        // lastX = e.pageX;
	        if ( e && e.stopPropagation )
	        //因此它支持W3C的stopPropagation()方法
	            e.stopPropagation();
	        else
	        //否则，我们需要使用IE的方式来取消事件冒泡
	            window.event.cancelBubble = true;
	        return false;
	        e.preventDefault();
	    });

	    $(dom).find('.bd').mouseup(function(e) {
	        isdown = false;
	        if (lastX > e.pageX-0+10) {
	            index ++;
	            if(index >= liLength){
	                //临界点判断
	                index = liLength-1;
	                newdWidth += dWidth;
	            }else{
	            }
	            // moveli('left');
	            moveNum(index)

	        } else if (lastX < e.pageX-10) {
	            index --;
	            if(index <=1){
	                //临界点判断
	                index = 0;
	                newdWidth -= dWidth;
	            }else{

	            }
	            // moveli('right');
	            moveNum(index)

	        } else {
	            // $("#dirSpan").text("—");
	        }

	        // lastX = e.pageX;
	        if ( e && e.stopPropagation )
	        //因此它支持W3C的stopPropagation()方法
	            e.stopPropagation();
	        else
	        //否则，我们需要使用IE的方式来取消事件冒泡
	            window.event.cancelBubble = true;
	        // e.preventDefault();
	        setTimeout(function(){
	            yesClickTrue();
	        },0)
	        return false;
	    });

	    function yesClickTrue(){
	        YesClick = true;
	    }
	    $(dom).find('.bd a').click(function(){
	        console.log(YesClick)
	        if(!YesClick){
	            return false;
	        }
	    })



	    //按参数移动
	    function moveNum (num){
	        newdWidth =   -(num*dWidth);
	        huyue.translate ($ul[0],newdWidth,0);
	        var thisDom = $(dom).find('.bd li').eq(num);
	        thisDom.addClass('on');
	        thisDom.siblings().removeClass('on');

	        var thisDom = $(dom).find('.xz li').eq(num);
	        thisDom.addClass('on');
	        thisDom.siblings().removeClass('on');

	        var thisDom = $(dom).find('.hd-num li').eq(num);
	        thisDom.addClass('on');
	        thisDom.siblings().removeClass('on');

	    }
	    //移动一格格
	    function moveli(direction){
	        chagenum()
	        if(direction == 'left'){
	            newdWidth -= dWidth;
	            huyue.translate ($ul[0],newdWidth,0);
	        }else if(direction == 'right'){
	            newdWidth += dWidth;
	            huyue.translate ($ul[0],newdWidth,0);
	        }
	    }
	    //改变数字
	    function chagenum(){
	        var $ConBox = $(dom+' .count_box')
	        var nliLength = liLength;
	        $ConBox.html(index+'/<span>'+nliLength+'</span>');
	    }
	    //banding事件
	    function bindSlide (){
	        var oLSwiperMaker = new LSwiperMaker({
	            bind: J_Slide,  // 绑定的DOM对象
	            dire_h:false,     //true 判断左右， false 判断上下在，老版本上判断;
	            callStart:function(o){

	            },
	            callMove:function(o){

	                //X 轴滚动的累加值
	                var moveX = o.info.x; //X 移动的值；
	                if(Math.abs(moveX)>dWidth/3){
	                    return false;
	                }else{
	                    var callMoveX = newdWidth + moveX;
	                    huyue.translate ($ul[0],callMoveX,0);
	                }
	            },
	            callEnd:function(o){
	                var x = o.info.contX; //X 轴滚动的累加值；
	                var moveX = o.info.x; //X 移动的值；
	                var xDirection = o.info.isx; // 移动方向；
	                //记数器和临界点判断
	                if(xDirection == 'left' && Math.abs(moveX)>10){
	                    index ++;
	                    if(index >= liLength){
	                        //临界点判断
	                        index = liLength-1;
	                        newdWidth += dWidth;
	                    }else{
	                    }
	                    // moveli('left');
	                    moveNum(index)
	                }else if(xDirection == 'right' && Math.abs(moveX)>10){
	                    index --;
	                    if(index <=1){
	                        //临界点判断
	                        index = 0;
	                        newdWidth -= dWidth;
	                    }else{

	                    }
	                    // moveli('right');
	                    moveNum(index)
	                }
	                console.log(index,'index');
	                console.log(liLength,'liLength')
	                return false;
	            }
	        })
	    }

	}


	$(function () {
	    // 所有商品展开
	    allGoods();

	    // 排序
	    // 按车系展开
	    carSeries();
	    // 按价格展开
	    zPrice();
	    // 按级别展开
	    zLevel();
	})


	// 所有商品展开

	function allGoods() {
	    var goodsTab = $('.J_AllGoods'),
	        layer = $('.J_layer');
	    goodsTab.hover(function () {
	        var _this = $(this);
	        if (_this.data('status') != 1) {
	            _this.data('status', 1);
	            $(this).addClass('current');
	            layer.show();

	        } else {
	            _this.data('status', 0);
	            $(this).removeClass('current');
	            layer.hide();
	        }
	    });
	    // layer.find('.text').click(function() {
	    //     layer.hide();
	    // });

	    layer.hover(function () {
	        $(this).show();
	        goodsTab.addClass('current');
	    }, function () {
	        $(this).hide();
	        goodsTab.removeClass('current');
	    });
	    layer.find('.text').hover(function () {
	        $(this).addClass('current').siblings().removeClass('current');
	    }, function () {
	        $(this).removeClass('current');
	    });
	}

	// 按车系展开
	function carSeries() {
	    var series = $('.J_CarSeries'),
	        seriesCont = $('.J_LayerSeriesCont');

	    series.hover(function () {
	        var _this = $(this);

	        if (_this.data('status') != 1) {
	            _this.data('status', 1);
	            $(this).addClass('current');
	            seriesCont.show();

	        } else {
	            _this.data('status', 0);
	            $(this).removeClass('current');
	            seriesCont.hide();
	        }
	    });

	    seriesCont.hover(function () {
	        $(this).show();
	        series.addClass('current');
	    }, function () {
	        $(this).hide();
	        series.removeClass('current');
	    });

	    seriesCont.find('.item').hover(function () {
	        $(this).addClass('current').siblings().removeClass('current');
	    }, function () {
	        $(this).removeClass('current');
	    });
	}



	//按价格展开
	function zPrice() {
	    var price = $('.J_Price'),
	        priceCont = $('.J_ZpriceCont');

	    price.hover(function () {
	        var _this = $(this);

	        if (_this.data('status') != 1) {
	            _this.data('status', 1);
	            $(this).addClass('current');
	            priceCont.show();

	        } else {
	            _this.data('status', 0);
	            $(this).removeClass('current');
	            priceCont.hide();
	        }
	    });

	    priceCont.hover(function () {
	        $(this).show();
	        price.addClass('current');
	    }, function () {
	        $(this).hide();
	        price.removeClass('current');
	    });

	    priceCont.find('.item').hover(function () {
	        $(this).addClass('current').siblings().removeClass('current');
	    }, function () {
	        $(this).removeClass('current');
	    });
	}


	//按级别展开
	function zLevel() {
	    var level = $('.J_Level'),
	        levelCont = $('.J_ZlevelCont');
	    level.hover(function () {
	        var _this = $(this);

	        if (_this.data('status') != 1) {
	            _this.data('status', 1);
	            $(this).addClass('current');
	            levelCont.show();

	        } else {
	            _this.data('status', 0);
	            $(this).removeClass('current');
	            levelCont.hide();
	        }
	    });

	    levelCont.hover(function () {
	        $(this).show();
	        level.addClass('current');
	    }, function () {
	        $(this).hide();
	        level.removeClass('current');
	    });

	    levelCont.find('.item').hover(function () {
	        $(this).addClass('current').siblings().removeClass('current');
	    }, function () {
	        $(this).removeClass('current');
	    });
	}

	// 点击弹层里的内容添加类
	$('.layer1 .item').hover(function () {
	    $(this).addClass('current').siblings().removeClass('current');
	})

	hotMap('.banner')
	function hotMap(dom) {
	    var $ShopIndex = $(dom); //dom元素
	    var mapConObject = $CONFIG_BANNER;//JSON.parse($CONFIG.shop.pc_page_config);//得到的字符串;
	//        var title = $CONFIG.shop.title;
	//        document.title = title;

	    var html = '';
	    $ShopIndex.html(html);

	    function getS(s) {
	        return s.substring(0, s.lastIndexOf('/') + 1);
	    }

	    parseObjectToHtml(mapConObject);
	    function parseObjectToHtml(mapConObject) {
	        for (index in mapConObject) {
	            var imgUrl = mapConObject[index]['Uurl'];
	            imgUrl = getS(imgUrl);
	            html += '<li><img src="' + imgUrl + '" alt=""/>';
	            var posiition = mapConObject[index]['position'];
	            for (index2 in posiition) {
	                var nowVal = posiition[index2];
	                if(nowVal!=null){
	                    var left = nowVal.showStartX * 100 + '%';
	                    var top = nowVal.showStartY * 100 + '%';
	                    var width = nowVal.showWidth * 100 + '%';
	                    var height = nowVal.showHeight * 100 + '%';
	                    html += '<a  target="_blank" style="left:' + left + ';top:' + top + ';width:' + width + ';height:' + height + ';" href="' + nowVal['url'] + '"></a>';
	                }
	            }
	            html += '</li><p style="height: 0;width: 100%"></p>';
	        }
	    }

	    $ShopIndex.html(html);

	    var $img = $(dom).find('img');
	    var $a = $(dom).find('a');
	    $a.css({
	        position: "absolute",
	        display: "inline-block",
	        zIndex: "2"
	    })
	    $img.css({width:'100%'});
	    $ShopIndex.height('auto');

	}

	// 这函数需要写到页面上面，不能放到这里，因为调用这个js的页面至少有两个， 其中的dom结构是不一样的
	// function autoHHeight(){
	//
	//         var headerHeight  = $('.automall-header').height();
	//         var shopIndexheight = $('#J_ShopIndex').height();
	//         var dh = $(document).height();
	//
	//         if(dh>headerHeight-0+shopIndexheight){
	//             $('.fixFooter').css({
	//                 position: 'absolute',
	//                 bottom: 0,
	//                 width: '100%'
	//             })
	//         }
	// }
	// autoHHeight()

	$('.nav-item').on('mouseover',function(){
	    $(this).addClass('active');
	    $(this).find('.second').show();
	    $('.active').on('click','.second',function(){
	        $(this).hide();
	    })
	});



	$('.nav-item').on('mouseout',function(){
	    $(this).removeClass('active');
	    $(this).find('.second').hide();
	});


	$('.nav-wrap .second').find('a').click(function(){
	    gotoThisHome(this);
	})

	$('.nav-item > a').click(function(){
	    gotoThisHome(this);
	})


	function gotoThisHome(dom){
	    var $this = $(dom);
	    var href = $this.attr('href');
	    try{
	        if($($this).length){
	            var topNum = huyue.getDomslideTop(href);
	            $("html,body").animate({scrollTop: topNum+'px'},300);
	        }else{
	            window.location.href= href;
	        }
	    }catch(error){
	        window.location.href= href;
	    }
	}
	var navStr = '.nav-wrap';
	var $navStr = $(navStr); //导航的jq对象
	var domNavContTopNum = huyue.getDomslideTop(navStr);  //导航到头部的高度
	var afterDomNavCont =  huyue.addDomAfter(navStr);     //导航底部的div
	$(afterDomNavCont).hide();
	$(window).scroll(function(event){
	    var nowScrollNum = $(window).scrollTop();
	    if(nowScrollNum>=domNavContTopNum){
	        $navStr.addClass('nav-wrap-fiexd');
	        $(afterDomNavCont).show();
	    }else{
	        $navStr.removeClass('nav-wrap-fiexd');
	        $(afterDomNavCont).hide();
	    }
	});




/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	//公共模块
	__webpack_require__(3)
	 //require('../lib/zepto/touch.js')
	__webpack_require__(5)

	//加入常用函数
	__webpack_require__(6);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v1.8.3 jquery.com | jquery.org/license */
	(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,"function"=="function"&&__webpack_require__(4)&&__webpack_require__(4).jQuery&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return v}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))})(window);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';

		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */

		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/


		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;

			options = options || {};

			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;


			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;


			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;


			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;


			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;


			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;


			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;


			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;

			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;

			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;

			if (FastClick.notNeeded(layer)) {
				return;
			}

			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}


			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}

			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}

			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);

			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};

				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}

			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {

				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}

		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {

			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}

				break;
			case 'input':

				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}

				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}

			return (/\bneedsclick\b/).test(target.className);
		};


		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}

				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};


		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;

			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}

			touch = event.changedTouches[0];

			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};

		FastClick.prototype.determineEventType = function(targetElement) {

			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}

			return 'click';
		};


		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;

			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};


		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;

			scrollParent = targetElement.fastClickScrollParent;

			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}

					parentElement = parentElement.parentElement;
				} while (parentElement);
			}

			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};


		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}

			return eventTarget;
		};


		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;

			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}

			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];

			if (deviceIsIOS) {

				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}

				if (!deviceIsIOS4) {

					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}

					this.lastTouchIdentifier = touch.identifier;

					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}

			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;

			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;

			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}

			return true;
		};


		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;

			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}

			return false;
		};


		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}

			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}

			return true;
		};


		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {

			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}

			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}

			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};


		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

			if (!this.trackingClick) {
				return true;
			}

			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}

			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}

			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;

			this.lastClickTime = event.timeStamp;

			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;

			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];

				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}

			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}

					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {

				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}

				this.focus(targetElement);
				this.sendClick(targetElement, event);

				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}

				return false;
			}

			if (deviceIsIOS && !deviceIsIOS4) {

				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}

			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}

			return false;
		};


		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};


		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {

			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}

			if (event.forwardedTouchEvent) {
				return true;
			}

			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}

			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {

					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}

				// Cancel the event
				event.stopPropagation();
				event.preventDefault();

				return false;
			}

			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};


		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;

			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}

			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}

			permitted = this.onMouse(event);

			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}

			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};


		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;

			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}

			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};


		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;

			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}

			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

			if (chromeVersion) {

				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}

				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}

			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}

			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}

			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			return false;
		};


		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};


		if (true) {

			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * 通常这里不需要修改
	 */
	__webpack_require__(7); //tool工具
	//require('./ui.js');   // ui
	//require('./widget.js'); //小挂件


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	
	__webpack_require__(8); // ajax函数
	__webpack_require__(9); // arr数组工具
	__webpack_require__(10); // 基础
	__webpack_require__(11); // bom浏览器，设备，一切与dom事件无关的操作
	__webpack_require__(12); // 画图
	__webpack_require__(13); // css样式文件操作函数
	__webpack_require__(14); // 调试函数
	__webpack_require__(15); // dom操作函数
	__webpack_require__(16); // 全局，不是huyue对象的方法;
	__webpack_require__(17); // obj
	__webpack_require__(18); // 字符串
	__webpack_require__(19); // time
	__webpack_require__(20); // 触摸事件
	__webpack_require__(21); // 验证
	__webpack_require__(22); // gotop

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	(function(window){
	    var huyue = window.huyue || {};

	        /**
	         * zjh 20161208 v1.0  请求完成后才发送第二次请求的ajax;
	         * 思路 在ajax函数中间加一个中间层， 来控制 一些常用的设置 比如现在的标示符;
	         * [objectAjax] ajax 对象，这个对象的使用和$.ajax函数一样
	         * [markStr] 如果需要一个页面多次用到这个函数的时候，用标示符区分
	         *
	         * 实例
	         * hy.ajax({
	                        url: oajaxGetList.url,
	                        type: 'post',
	                        dataType: 'json',
	                        data: data,
	                        success: function(res){},
	                        error: function(){}
	                    },'search');
	         */

	        var ajaxConfig ={
	            isAjaxIn:false
	        };
	    huyue.ajax = function(objectAjax,markStr){
	            // console.log(ajaxConfig);
	            if(markStr){
	                var isAjaxIn = markStr+'isAjaxIn';

	            }else{
	                isAjaxIn='isAjaxIn';
	            }

	            if(ajaxConfig[isAjaxIn]){
	                return false;
	            }

	            var ajax =  $.ajax;

	            // 过滤undefined
	            objectAjax.data = hy.getNotUndefindObj(objectAjax.data,true);

	            ajax({
	                url: objectAjax.url,
	                type: objectAjax.type,
	                dataType: objectAjax.dataType,
	                data: objectAjax.data,
	                //请求发出前
	                beforeSend: function (res){
	                    ajaxConfig[isAjaxIn] = true;
	                    if(objectAjax.beforeSend){
	                        objectAjax.beforeSend(res);
	                    }
	                },
	                //请求发出完成后
	                complete: function(res){
	                    ajaxConfig[isAjaxIn] = false;
	                    if(objectAjax.complete){
	                        objectAjax.complete(res);
	                    }
	                },
	                success: function(res){
	                    if (res.ret != 0) {
	                        hy.popMsg(res.msg);
	                        return false;
	                    }

	                    if(objectAjax.success){
	                        objectAjax.success(res);
	                    }
	                },
	                error: function(res){
	                    if(objectAjax.error){
	                        hy.popMsg('网络异常，请重试');
	                        objectAjax.error(res);
	                    }
	                }
	            })

	        }

	    window.huyue = window.hy = huyue;
	    module.exports = huyue;
	})(window)



/***/ }),
/* 9 */
/***/ (function(module, exports) {

	(function(window){
	    var huyue = window.huyue || {};

	    /**
	     * 判断是否是数组
	     * @return {Boolean}         [description]
	     */
	    huyue.isArray = function(varType){
	        return varType instanceof Array;
	    }

	    /**
	     console.info($erase([1,2,3,4,5],3));	//[1,2,4,5]
	     删除数组中的对象
	     @param {array} arr 要操作的数组
	     @param {*} item 要清除的对象
	     @return {number} 对象原本所在位置
	     **/
	    huyue.delArrVal = function(arr, item){
	        var index = arr.indexOf(item);
	        if(index >= 0){
	            arr.splice(index, 1);
	        }
	        return index;
	    };


	    /**
	     确认对象是否在数组中
	     @param {array} arr 要操作的数组
	     @param {*} item 要搜索的对象
	     @return {boolean} 如果对象在数组中，返回true
	     **/
	    huyue.isArrVal = function(arr, item){
	        var index = arr.indexOf(item);
	        return index >= 0;
	    };

	    /**
	     查找符合条件的元素在数组中的位置
	     @param {array} arr 要操作的数组
	     @param {function} fn 条件函数
	     @param {object} [context] 函数的this指向
	     @return {array} 符合条件的元素在数组中的位置
	     **/
	    huyue.findArrVal = function(arr, fn, context){
	        var positions = [];
	        arr.forEach(function(item, index){
	            if(fn.call(context, item, index, arr)){
	                positions.push(index);
	            }
	        });
	        return positions;
	    };












	    window.huyue = window.hy = huyue;
	    module.exports = huyue;
	})(window)



/***/ }),
/* 10 */
/***/ (function(module, exports) {

	(function(window){
	    var huyue = window.huyue || {};


	    /**
	     * ���ߺ���
	     * remתpx�ĺ���
	     * @param  {[num]} num        [�ڵ�ǰ����ͼ�ϵ�ֵ]
	     * @param  {[num]} defaulTnum [��ǰ����ͼ�ϵ��ܿ���]
	     * @return {[type]}            [��ǰ����ͼ�ϵ�ֵ�ڵ�ǰ�ֱ����ϵ�ֵ]
	     * remTopx(80,640)
	     */
	    huyue.remTopx = function (num,defaulTnum){
	        defaulTnum = defaulTnum?defaulTnum:750;
	        var b = num/defaulTnum;
	        var winW = $(document).width();
	        return Math.round(winW*b);
	    }

	    // �ж϶����Ƿ�Ϊ��
	    huyue.isEmptyObject = function(e) {
	        var t;
	        for (t in e)
	            return !1;
	        return !0
	    }

	    /**
	     * ���ߺ���
	     * �жϱ����Ƿ������˱仯;
	     * zjh20161123 1.0
	     * @param  {[str]} k [������]
	     * @param  {[str]} v [����ֵ]
	     * @return {[Boole]}   [���ر����Ƿ��仯��false �Ǳ仯��true��û�б仯]
	     */
	    huyue.ifonChanged =function (k,v){
	        if(!k||!v){
	            clg('����Ҫ����һ�������Ľ���ֵ');
	            return true;
	        }
	        var isK = 0; //�Ƿ�������ֵ;
	        Gvariable = window.Gvariable || {};
	        // ��һ�θ�ֵ Ϊ��ʱ
	        if(huyue.isEmptyObject(Gvariable)){Gvariable[k] = v; return true;}
	        // if ������Ϊ��
	        for(var i in Gvariable){
	            if(i==k){
	                isK = 1;
	                if(Gvariable[i] == v){
	                    return true;
	                }else{
	                    Gvariable[i] = v
	                    return false;
	                }
	            }
	        }
	        window.Gvariable = Gvariable;
	    }

	    /**
	     * �õ�geturl�Ĳ���
	     * @param  {[type]} name         [description]
	     * @param  {[type]} cancelBubble [description]
	     * @return {[type]}              [description]
	     */
	    huyue.getParameter = function (name,cancelBubble){
	        var r = new RegExp("(\\?|#|&)"+name+"=([^&#]*)(&|#|$)");
	        var m = location.href.match(r);
	        if ((!m || m=="") && !cancelBubble) m = top.location.href.match(r);
	        return (!m?"":m[2]);
	    }


	    // huyue.local = function(localUrl){
	    //         window.location.href = localUrl;
	    // };
	    /**
	     * ��ת  cnitc zjh 20161023
	     * @method
	     * @for window
	     * @param   {url} ��תurl��{time} �ӳٶ೤ʱ����ת
	     * @return
	     */
	    huyue.local = function(url,time){
	        local = function(){
	            window.location.href = url;
	        }
	        time = time||0;
	        setTimeout(local,time);
	    }

	    huyue.reloadLocal = function(localUrl){
	        var dtime = new Date()
	        var dtime = dtime.getTime();
	        if(localUrl == '#'){
	            str=location.href;
	            localUr = str;
	        }
	        window.location.href = localUrl+'?_hydc=' + dtime;
	    };


	    /**
	     * ֱ�����������ռ䣬�� . �ָ�,����ҪGLOBALǰ׺
	     * @param  {string} name �����ռ�����
	     * @return {object}      GLOBALȫ�ֶ���
	     */
	    huyue.namespace = function (name) {
	        // �������ֿռ����ַ���
	        var arr = name.split(".");
	        window.huyue = {};
	        g = GLOBAL;

	        // ѭ������ÿһ������
	        for (var i = 0; i < arr.length; i++) {
	            var domain = arr[i];
	            // ���������Ŀռ�δ������
	            if (typeof(g[domain]) == "undefined") {
	                // ������
	                g[domain] = {};
	            }
	            // ���õ�ǰ��Ϊ�˴�ѭ������
	            g = g[domain];
	        }
	        return g;
	    }


	    /**
	     * ��ֹ�����¼� cnitc zjh
	     * @method
	     * @for window
	     * @param   {is} ����is Ϊ 1 ����������  0 �رգ�
	     * @return
	     */
	    huyue.ifPop = function(is){
	        submitFalse = function () {
	            //$(".msg20151118").remove();
	            var $box = $("<div id='J_submitFalse'></div>");
	            $box.css({
	                "background": "rgba(255,255,255,0)",
	                "width": "100%",
	                "top": "0",
	                "left":"0",
	                "height":"100%",
	                "position":"fixed",
	                "Z-index":"999"
	            })
	            $("body").append($box);
	        }
	        submitTrue = function () {
	            $("#J_submitFalse").remove();
	        }

	        if(is==1){
	            submitFalse();
	        }else{
	            submitTrue();
	        }
	    }

	    /**
	     * �����������ֵİٷֱ�  cnitc zjh
	     * @method
	     * @for
	     * @param {Number} ��������С����
	     * @return {Element} �������ֵ�����%��
	     */
	    huyue.goPercentage = function (a){
	        if(a==1){
	            return 100+'%';
	        }
	        b=a.toFixed(4);
	        c=b.slice(2,4)+"."+b.slice(4,6);
	        c=Math.round(c);// ȡ��   todo ���ﲢû��������λС�������жϣ�������Ҫ�ľ�ȥ��ȥ��;
	        c=c+'%';
	        return c;
	    },


	    window.huyue = window.hy = huyue;
	    module.exports = huyue;
	})(window)



/***/ }),
/* 11 */
/***/ (function(module, exports) {

	(function(window){
	    var huyue = window.huyue || {};


	    // �����������»���
	    huyue.bodyScroll = function() {
	        // document.body.style.overflow = "visible";
	        // $("html").css({"height": "auto", "overflow": "visible"});
	        // document.body.style.height = "auto";
	        var html = document.getElementsByTagName("html")[0];
	        html.style.height = "auto";
	        html.style.overflow = "visible";
	        document.body.style.height = "auto";
	        document.body.style.overflow = "visible";
	    }

	    // ��ֹ�������»���
	    huyue.bodyNoScroll = function() {
	        // $("html").css({"height": "100%", "overflow": "hidden"});
	        // document.body.style.height = "100%";
	        // document.body.style.overflow = "hidden";
	        //
	        var html = document.getElementsByTagName("html")[0];
	        html.style.height = "100%";
	        html.style.overflow = "hidden";
	        document.body.style.height = "100%";
	        document.body.style.overflow = "hidden";
	    }


	    /**
	     * �ж��ֻ������
	     * @param  {[fun]} hpFun [�����Ļص�����]
	     * @param  {[fun]} spFun [�����Ļص�����]
	     * @return {[noting]}
	     */
	    huyue.getFacilityAcross = function (spFun,hpFun,noinit){
	        function hp(){
	            if(window.orientation==180||window.orientation==0){
	                spFun && spFun();
	            }
	            if(window.orientation==90||window.orientation==-90){
	                hpFun && hpFun();
	            }
	        }
	        !noinit && hp();
	        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hp, false);
	    }


	    //����ȫ��
	    huyue.requestFullScreen = function() {
	        var de = document.documentElement;
	        if (de.requestFullscreen) {
	            de.requestFullscreen();
	        } else if (de.mozRequestFullScreen) {
	            de.mozRequestFullScreen();
	        } else if (de.webkitRequestFullScreen) {
	            de.webkitRequestFullScreen();
	        }
	    }

	    /**
	     * 提示错误弹出层，3秒消失;
	     * @param  {string} msg  错误提示
	     * @param  {int} time 几秒后退出，1000 等于1秒
	     * @param  {Boole} isIng  如果同时有多个弹出的时候，true 为不弹出，false 为覆盖前个弹出；，作用就是先弹出那个
	     * @return {[type]}      [description]
	     */
	    huyue.popMsg = function(msg,time,isIng,callBack){
	        if(isIng && $('.msg20151118').length>0){
	            return false;
	        }
	        var w = $(window).width();
	        var h = $(window).height();
	        if($(".msg20151118")){
	            $(".msg20151118").remove();
	        }
	        var $box = $('<div class="msg20151118" style="display:inline-block;"></div>');
	        $box.css({
	            "background" : "rgba(0,0,0,.6)",
	            "width" : "80%",
	            "padding" : "10px",
	            "line-height" : "24px",
	            "font-size" : "14px",
	            "text-align" : "center",
	            "border-radius" : "10px",
	            "color" : "#fff",
	            'z-index':9999999999999
	        })
	        $box.text(msg)
	        $("body").append($box);
	        var width = $box.width();
	        var height = $box.height();
	        w = (w-width)/2;
	        h = (h-height)/2;
	        $box.css({
	            "position" : "fixed",
	            "top" : h,
	            "left" : w
	        })
	        setTimeout(function(){
	            $box.remove();
	            callBack && callBack();
	        },time || 3000);
	    }

	    //�˳�ȫ��
	    huyue.exitFullscreen =function () {
	        var de = document;
	        if (de.exitFullscreen) {
	            de.exitFullscreen();
	        } else if (de.mozCancelFullScreen) {
	            de.mozCancelFullScreen();
	        } else if (de.webkitCancelFullScreen) {
	            de.webkitCancelFullScreen();
	        }
	    }




	    window.huyue = window.hy = huyue;
	    module.exports = huyue;
	})(window)



/***/ }),
/* 12 */
/***/ (function(module, exports) {

	(function(window){
	    var huyue = window.huyue || {};

	    /**
	     * zjh 201611
	     * 初始化cnava函数
	     * @param  {[str]} 'canvas id' [一个cnavas元素的id]
	     * @return {[object]}     [str]  返回一个canvas对象，初始化canvas函数
	     * 使用方法 var oconvas = new CanvasInit('canvas',convasSizeWidth,convasSizeHeight);
	     */

	    // canvas 扩展函数
	    function CanvasExtend(){
	        this.istrue = 1;
	    }
	    // canvas 扩展函数原型对象
	    CanvasExtend.prototype = {
	        ccc: function(dom){
	            console.log(dom);
	        },
	        /**
	         * 每秒刷新多少频率
	         * @param  {[num]} frequencyTime [需要的频率值]
	         * @return {[num]}               [得到的频率值]
	         */
	        getGrequency:function (frequencyTime){
	            frequencyTime = frequencyTime?frequencyTime:60;
	            var frequency = 1000/frequencyTime; //频率;
	            return frequency;
	        },
	        /**
	         * 得到
	         * @param  {[type]} num [description]
	         * @return {[type]}     [description]
	         */
	        getPi:function (num){
	            return num*Math.PI;
	        },
	        /**
	         *终止PI函数
	         * [getOverPiPercentageNum 以百分比数字传入函数，返回num + PercentageNum 百分比函数值]
	         * @param  {[type]} num           [当前PI]
	         * @param  {[type]} PercentageNum [从当前PI，跑百分之多少]
	         * @return {[type]}               [百分比的PI]
	         * getOverPiPercentageNum(1.5,50)
	         */
	        getOverPercentagePi : function (num,PercentageNum){
	            return num*Math.PI+2*Math.PI*(PercentageNum/100);
	        }
	    }

	    function CanvasInit(canvasDomId,width,height){
	        var canvas = document.getElementById(canvasDomId);
	        if(!canvas){
	            console.log('没有得到传入的id是'+canvasDomId+'的dom');
	        }
	        // 配置变量
	        this.config = {
	            width:null,
	            height:null,
	        }
	        this.canvas = null; // canvas dom js对象
	        this.context = null; //context对象

	        // 初始化变量
	        this.config.width = width;
	        this.config.height = height;
	        this.canvas = canvas;

	        // 初始化 画布
	        this.canvas.width = width;
	        this.canvas.height = height;
	        // 检查兼容性
	        this.ifCanvas();
	        // 检查发生问题的可能性，提高健壮性；
	        this.checkInit();
	        // 扩展 context 对象
	        this.extend();
	        return this;
	    }
	    //方法原型
	    CanvasInit.prototype = {
	        //检查兼容性函数
	        ifCanvas : function(){
	            var self = this;
	            if(!self.canvas.getContext('2d')){
	                alert('你的浏览器不支持canvas');
	            }else{
	                self.context = self.canvas.getContext('2d');
	            }
	        },
	        // 检查高和宽
	        checkInit: function(){
	            var slef = this;
	            if(!slef.config.width){
	                console.log('你没有设置canvas的宽，var oconvas = new CanvasInit(\'canvas\',1024,820);');
	            }
	            if(!slef.config.height){
	                console.log('你没有设置canvas的高，var oconvas = new CanvasInit(\'canvas\',1024,820);');
	            }
	        },
	        // 扩展函数
	        extend: function(){
	            var self = this;
	            if(typeof self.context == 'object'){
	                var context = self.context
	                if(typeof CanvasExtend == 'function'){
	                    context.hy  = new CanvasExtend();
	                }
	            }else{
	                console.log('self.context 对象出现问题');
	            }
	        }
	    }

	    window.huyue = window.hy = huyue;
	    module.exports = huyue;
	})(window)



/***/ }),
/* 13 */
/***/ (function(module, exports) {

	(function(window){
	    var huyue = window.huyue || {};


	    huyue.addCSS = function (cssText){
	        var head = document.head || document.getElementsByTagName('head')[0];
	        var style = document.createElement('style');
	        style.innerHTML = cssText;
	        $('body').append(style);
	    }
	    window.huyue = window.hy = huyue;
	    module.exports = huyue;
	})(window)



/***/ }),
/* 14 */
/***/ (function(module, exports) {

	

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	(function(window){
	    var huyue = window.huyue || {};



	    /**
	     * 得到当前dom 距离document顶部的距离;
	     * @param domStr
	     * @returns {number}
	     * hy.getDomslideTop('div');
	     */
	    huyue.getDomslideTop=function(domStr){
	        if($(domStr)[0]){
	            var mTop = $(domStr)[0].offsetTop;
	            //减去滚动条的高度
	            var sTop = document.body.scrollTop;
	            sTop=0;
	            var result = mTop - sTop;
	            console.log(result,'到头部的距离');
	            return result;
	        }else{
	            
	            console.log('dom不存在')
	            return 0
	        }
	    }


	    /**
	     * 从第几个之前几行的dom添加一个class；
	     * @param DomArrStr
	     * @param num
	     * @param ClassName
	     */
	    huyue.addClassHowMany = function (DomArrStr,num,ClassName){
	        //初始化参数
	        $DomArrStr = $(DomArrStr);
	        if(!ClassName){
	            ClassName = 'on';
	        }

	        $DomArrStr.each(function(index , key){
	            if(num-1>=index){
	                $(key).addClass(ClassName);
	            }else{
	                $(key).removeClass(ClassName);
	            }

	        })
	    }


	    /**
	     * 选项卡函数   zjh 20170223 v1.0
	     * 点检第一个dom集合，对应的index索引值的第二个index都会增加on类，兄弟元素删除on类；
	     * @param navDomArr 导航的集合
	     * @param conDomArr  控制显示的集合
	     * 例子  hy.tabNav('.ca-buy-tip .ca-nav li','.ca-con .dc-detail');
	     */
	    huyue.tabNav = function(navDomArr,conDomArr,ClassName,callBack){
	        $navDomArr = $(navDomArr);
	        $conDomArr = $(conDomArr);
	        $navDomArr.css({'cursor':'pointer'});

	        if(!ClassName){
	            ClassName = 'on';
	        }


	        $(document).on('click',navDomArr,function(){
	            var index = $(this).index();

	            //切换标题
	            $navDomArr.removeClass(ClassName);
	            $(this).addClass(ClassName);
	            //切换内容
	            $conDomArr.removeClass(ClassName);
	            $conDomArr.eq(index).addClass(ClassName);

	            callBack && callBack();
	        })
	    }

	    // 传入一个dom 类，在dom 后面创建一个dom+after类命的 div，并且返回其名字;
	    huyue.addDomAfter = function(dom,isHide){
	        var beginStr = '';
	        var $dom = $(dom);
	        // 赋高度值
	        var domHeight = $dom.height();
	        //选择符 加#
	        var oldDomAfter = dom+'-after';

	        if(dom.indexOf('#')>=0){
	            // 替换字符串
	            beginStr = '#';
	            domAfter = oldDomAfter.replace(/#/,'');

	            if($(oldDomAfter).length <=0){
	                // 判断是否隐蔽
	                if(isHide){
	                    $dom.after('<div id="'+domAfter+'" style="display:none"></div>');
	                }else{
	                    $dom.after('<div id="'+domAfter+'"></div>');
	                }
	            }
	            $('#'+domAfter).height(domHeight);
	        }else if(dom.indexOf('.')>=0){
	            // 替换字符串
	            beginStr = '.';
	            domAfter = oldDomAfter.replace(/./,'');
	            if($(oldDomAfter).length <=0){
	                // 判断是否隐蔽
	                if(isHide){
	                    $dom.after('<div class="'+domAfter+'" style="display:none"></div>');
	                }else{
	                    $dom.after('<div class="'+domAfter+'"></div>');
	                }
	            }
	            $('.'+domAfter).height(domHeight);
	        }
	        // 在dom元素后面添加 after dom节点
	        console.log(domHeight);
	        // 返回after dom节点选择器;
	        return oldDomAfter;
	    }

	    //示例 huyue.floatDom('#floatMe');
	    huyue.floatDom = function(dom){
	        var domAfter = huyue.addDomAfter(dom);
	        var $dom = $(dom);
	        var ooffset = $dom.offset();
	        $(window).scroll(function(){
	            if($(window).scrollTop()>=ooffset.top){
	                $dom.addClass('fixed')
	                $(domAfter).show();
	            }else{
	                $dom.removeClass('fixed')
	                $(domAfter).hide();
	            }
	        });
	    }


	    /**;
	     * 得到当前dom 的全部的高度和宽的的数组记录
	     * @param domStr
	     * @param fx  指定要得到高度数组，和宽度数组;
	     * @returns {Array} 返回需要的数组;
	     */
	    huyue.getDomStrArrWH = function (domStr,fx){
	        var $dom = $(domStr);
	        var domLen = $dom.length;
	        var documentHeight = $(document).height();
	        var documentWidth = $(document).width();
	        var bodyH = $(window).height();
	        //alert(bodyH)
	        var domArr = [];
	        var BgeinHeight = 0;
	        var BgeinWeight = 0;
	        if($dom && domLen>0){
	            for(i=0; i<domLen; i++){
	                if(fx){
	                    if(fx == 'H'){
	                        addHeightNum(i);
	                    }else if(fx =='W'){
	                        addWeightNum(i)
	                    }else{
	                        addHeightNum(i);
	                        addWeightNum(i)
	                    }

	                }else{
	                    addHeightNum(i);
	                    addWeightNum(i)
	                }

	            }
	        }
	        function addHeightNum(i){
	            if(typeof domArr[i] == 'undefined'){
	                domArr[i]={};
	            }
	            domArr[i]['bH'] = BgeinHeight;
	            var iH =bodyH;

	            if(!iH){
	                iH = bodyH
	            }
	            BgeinHeight+=iH;
	            domArr[i]['oH'] = BgeinHeight;
	        }
	        function addWeightNum(i){
	            if(typeof domArr[i] == 'undefined'){
	                domArr[i]={};
	            }
	            domArr[i]['bW'] = BgeinWeight;
	            var iW = $($dom[i]).width()
	            if(!iW){
	                iW = documentWidth;
	            }
	            BgeinWeight+=iW;
	            domArr[i]['oW'] = BgeinWeight;
	        }
	        return domArr;
	    }



	    /**
	     *  动画控制函数,使用2d，以后需要使用3d 来渲染;3d可以调用GPU
	     * @param _dom dom对象
	     * @param x     改变至x轴
	     * @param y     改变至y轴
	     * @param time  改变需要的时间
	     * @param speed 改变的方式，运动轨迹
	     * @param callback 结束后的回调函数
	     */
	    huyue.translate = function(_dom,x,y,time,speed,callback){
	        if(!time){
	            time = 500;
	        }
	        if(!speed){
	            speed='ease';
	        }
	        _dom.style.transition="-webkit-transform "+time+"ms "+speed+"";
	        _dom.style.webkitTransform="translate("+x+"px,"+y+"px)";
	        setTimeout(function(){
	            callback && callback();
	        },time);
	    }



	    /**
	     * 加载图片函数
	     * @param imgPathObj 图片数组
	     *
	     * @returns {{加载好的图片对象}}
	     */
	    huyue.loadImg = function(imgPathObj,callback,cenCallBack){
	        var len = huyue.objCount(imgPathObj);
	        // 用来存储不同的图像对象
	        var imgObj = {};
	        // 用来统计当前已经加载了多种张图片
	        var imgLoadCount = 0;
	        // 遍历全部路径
	        for (var key in imgPathObj) {
	            var path = imgPathObj[key];
	            var img = new Image();
	            img.src = path;
	            // 按照存路径时的key来存储图像对象
	            imgObj[key] = img;

	            img.addEventListener('load', function () {
	                // 每一张图片加载完毕，那么就让imgLoadCount累加一次
	                imgLoadCount++;
	                cenCallBack && cenCallBack(Math.round(imgLoadCount/len*100));
	                if (imgLoadCount >= len) {
	                    callback && callback(imgObj);
	                }
	            });

	        }
	    }



	    window.huyue = window.hy = huyue;
	    module.exports = huyue;
	})(window)



/***/ }),
/* 16 */
/***/ (function(module, exports) {

	function loadScript(src, callback, charset) {
	    var el = document.createElement('script');
	    if (callback) {
	        el.onload = el.onerror = el.onreadystatechange = function () {
	            var s = this.readyState;
	            if (!s || (s && (s == 'loaded' || s == 'complete'))) {
	                callback(src);
	            }
	        }
	    }
	    el.type = 'text/javascript';
	    el.src = src;
	    el.async = 'true';
	    if (charset) {
	        el.charset = charset;
	    }
	    document.getElementsByTagName('head')[0].appendChild(el);
	}
	window.loadScript = loadScript;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	(function(window){
	    var huyue = window.huyue || {};

	    /**
	     * 得到对象长度
	     * @param o 对象
	     * @returns {长度}
	     */
	    huyue.objCount = function (o){
	        var t = typeof o;
	        if(t == 'string'){
	            return o.length;
	        }else if(t == 'object'){
	            var n = 0;
	            for(var i in o){
	                n++;
	            }
	            return n;
	        }
	        return false;
	    };

	    /**
	     * 判断是否是对象
	     * @return {Boolean}         [description]
	     */
	    huyue.isObject = function(varType){
	        return varType instanceof Object;
	    }

	    /**
	     * 过滤 对象中的undefined ;
	     * @param  {[type]} value [对象]
	     * @param  {[type]} str   [去掉空对象的val，赋值为空还是删除key]
	     * @return {[type]} str   [返回去掉空的val]
	     */
	    hy.getNotUndefindObj = function(o,isDelete) {
	        for( index in o){
	            if(!o[index]){
	                if(isDelete){
	                    delete o[index];
	                }else{
	                    o[index]='';
	                }
	            }
	        }
	        return o;
	    }


	    window.huyue = window.hy = huyue;
	    module.exports = huyue;
	})(window)



/***/ }),
/* 18 */
/***/ (function(module, exports) {

	(function(window){
	    var huyue = window.huyue || {};


	    /**
	     * zjh 20161216 v1.0
	     * ���ַ����а�һ���Ĺ�������ָ���ַ���������ָ������
	     * һ���ַ���ÿ�����ٸ��������� str ��
	     *
	     * @param {[str]} value        [Ҫ��ʽ�����ַ���]
	     * @param {[num/Array]} step   [�й��ɵļ�����ָ��num���͵ļ�������������д������]
	     * @param {[str]} str          [Ҫ���ӵ��ַ���]
	     * @param {[num]} maxLen       [���Ƴ���,Ϊû�и�ʽ֮ǰ�ĳ���]
	     * hy.addStr(this.value,4,' ',16);
	     * hy.addStr(this.value,[0,4,8,12,16,20],' ',16);
	     */
	    huyue.addStr = function(value,step,str,maxLen) {
	        // console.log(str)
	        value = value.replace(new RegExp(str,'g'),'');
	        // console.log(value)
	        if(maxLen){
	            value = value.substring(0,maxLen)
	        }
	        var valLength = value.toString().length;
	        var temp = [];
	        if(hy.isArray(step)){
	            console.log('instanceof Array');
	            var stepLen = step.length
	            for(i=0; i<stepLen; i++){
	                temp[i] = value.slice(step[i], step[i+1]);
	            }
	        }else if(!isNaN(step)){
	            var nowNumLeng = Math.ceil(valLength/4);
	            for(j = 0,i=0; i<nowNumLeng; i++){
	                temp[i] = value.slice(j,j+step);
	                j+=step;
	            }
	        }
	        return temp.join(str).trim();
	        return value;
	    }



	    /**
	     * �õ�ȥ��ָ���ַ������ĳ���;
	     * @param  {[type]} value [description]
	     * @param  {[type]} str   [description]
	     * @return {[type]}       [description]
	     */
	    huyue.getDeleteStrLength = function(value,str) {
	        value = value.replace(new RegExp(str,'g'),'');
	        var valLength = value.toString().length;
	        return valLength;
	    }



	    /**
	     * �õ�ȥ��ָ���ַ���;
	     * @param  {[type]} value [ԭ�ַ���]
	     * @param  {[type]} str   [ȥʲô�ַ���]
	     * @return {[type]} str   [�����ַ���]
	     */
	    huyue.getDeleteStr = function(value,str) {
	        value = value.replace(new RegExp(str,'g'),'');
	        return value;
	    }


	    /**
	     * ���أ� ȥ���ַ������ߵĿո���
	     * @method
	     * @for
	     * @param {str} �����ַ���
	     * @return {str} ����ȥ�����߿ո����ַ���
	     */

	    huyue.trimStr = function (str) {
	        if(str=='undefined'){
	            alert('trimStr==undefade')
	        }
	        if(!str){
	            str='';
	        }
	        return str.replace(/(^\s*)|(\s*$)/g, "");
	    },


	        //��ȡA��B֮�����ַ���
	        huyue.strAinB = function (str,A,B){
	            return str.substring(str.indexOf(A) + 1,str.indexOf(B))
	        },

	        huyue.strEachAinB = function(str,A,B,oldArr){
	            // arr=str.split(��|��);
	            // var w=myString.indexOf(��v��);
	            var newStr = str;
	            var cont=(str.split(A)).length-1;
	            var arr = [];
	            for(var i = 0 ; i<cont ; i++){
	                arr[i] = huyue.strAinB(str,A,B);
	                var index=str.indexOf(B);
	                str =  str.substring(index+1);
	            }
	            return arr;
	        },





	        window.huyue = window.hy = huyue;
	    module.exports = huyue;
	})(window)



/***/ }),
/* 19 */
/***/ (function(module, exports) {

	(function(window){
	    var huyue = window.huyue || {};

	    /**
	     * 倒计时组件，
	     * @constructor
	     * @for 倒计时
	     * @param {str} timestr  //时间戳对象，这里我们可以替换成一个$('test').attr('data-time') 之类
	     * @param {str} dom     //需要放在的一个dom中
	     * @param {str} domHtm  //需要的格式 ，可以直接使用html 样式了，不用改js，后台有匹配
	     * @param {function} callBack  //回调函数，你可以再这里请求服务器状态，继续进行倒计时
	     * 调用示例
	     *  var timeOver = new huyue.timeObj({
	            timestr:500000000,  //时间戳对象，这里我们可以替换成一个$('test').attr('data-time') 之类的
	            dom:'.d_act_time span',  //需要放在的一个dom中
	            domHtml: '<p>{day}天{hour}时{minute}分{second}秒</p>', //需要的格式
	            callBack: function(){   //回调函数，你可以再这里请求服务器状态，继续进行倒计时
	                location.reload(true);
	            }
	            });
	     *
	     */

	        // 倒计时对象  cnitc zjh
	    huyue.TimeDown =function(oConfig){
	        this.timestr = null;  //时间戳
	        this.callBack = null;
	        this.dom = null;
	        this.domHtml = null;

	        this.gapTime = 1000;

	        this.day =   null;
	        this.hour =  null;
	        this.minute =null;
	        this.second =null;
	        $.extend(this,oConfig);
	        this.init();
	        // var test = huyue.strReplaceEachAinB(this.domHtml,'{','}');
	    },

	        huyue.TimeDown.prototype = {
	            init : function(){
	                this.timePiece(this.formattingTime(this.timestr),this.writeIn());
	            },
	            // 格式化时间戳
	            formattingTime : function(timeStr){
	                var leftTime = timeStr;
	                var leftsecond = parseInt(leftTime/1000);
	                var day1=Math.floor(leftsecond/(60*60*24));
	                var hour=Math.floor((leftsecond-day1*24*60*60)/3600);
	                var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60);
	                var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);

	                this.day = day1>9?day1:'0'+day1;
	                this.hour = hour>9?hour:'0'+hour;
	                this.minute = minute>9?minute:'0'+minute;
	                this.second = second>9?second:'0'+second;

	                this.day = day1?day1:'00';
	                this.hour = hour?hour:'00';
	                this.minute = minute?minute:'00';
	                this.second = second?second:'0';
	            },
	            // 倒计时函数
	            timePiece:function(){
	                var self = this;
	                var timer = setInterval(function(){
	                    self.timestr -= 1000;
	                    self.formattingTime(self.timestr);
	                    // console.log(self.timestr);
	                    if(self.timestr<=0){
	                        clearInterval(timer);
	                        if(self.callBack){
	                            self.callBack();
	                        }
	                    }
	                    if(self.timestr>1){
	                        self.writeIn();
	                    }
	                },this.gapTime);

	            },
	            // callBack:function(){
	            //     location.reload(true)
	            // },
	            writeIn : function(){
	                var self = this;
	                var str = this.domHtml;
	                str = str.replace(/{day}/g,this.day);
	                str = str.replace(/{hour}/g,this.hour);
	                str = str.replace(/{minute}/g,this.minute);
	                str = str.replace(/{second}/g,this.second);
	                $(self.dom).html(str);
	            }
	        }

	    window.huyue = window.hy = huyue;
	    module.exports = huyue;
	})(window)



/***/ }),
/* 20 */
/***/ (function(module, exports) {

	(function(window){
	    var huyue = window.huyue || {};

	    /**
	     * zjh 20161206 上划触发事件函数
	     * 思路 这个函数传入一个回调函数
	     * hy.upMoveLoad(oajaxGetList.upMoveLoadAjax,100);
	     * @param  {[function]} callBack [回调函数]
	     * @param  {[num]} topNun   [距离底部多少距离调用函数]
	     *
	     * @return {[noting]}        [noting]
	     */
	    huyue.upMoveLoad = function(callBack,topNun,Effecton){
	        //console.log(this);
	        //console.log(callBack);
	        if(!callBack){
	            throw('callback 函数为 undefined');
	            window.document.removeEventListener("scroll", winScroll, false);
	            return false;
	        }
	        window.document.addEventListener("scroll", winScroll, false);
	        function winScroll(){
	            if(!callBack){return false;}
	            var windowScrollTop = $(window).scrollTop();
	            var documentHeight = $(document).height();
	            var windowHeight = $(window).height();

	            // console.log('windowScrollTop:'+windowScrollTop);
	            // console.log('documentHeight:'+documentHeight);
	            // console.log('windowHeight:'+windowHeight);

	            topNun = topNun?topNun:100;
	            topNun = topNun-0;
	            top1 = documentHeight-windowScrollTop-topNun;
	            if(top1 <=  windowHeight){
	                // console.log('加载新的数据');
	                if(Effecton){
	                    callBack && callBack.call(Effecton);
	                }else{
	                    callBack&&callBack();
	                }
	            }
	        }
	    }


	    window.huyue = window.hy = huyue;
	    module.exports = huyue;
	})(window)



/***/ }),
/* 21 */
/***/ (function(module, exports) {

	

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	
	function goTopEx() {
	    var obj = document.getElementById("fhdb_nr");
	    var h = $(window).height();
	    $(obj).click(function() {
	        $(window).scrollTop(0);
	    });

	    function getScrollTop() {
	        return document.body.scrollTop || document.documentElement.scrollTop;

	    }

	    function setScrollTop(value) {
	        document.documentElement.scrollTop = value;
	    }
	    window.onscroll = function() {
	        getScrollTop() > h ? obj.style.display = "block" : obj.style.display = "none";
	    }
	}

/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

	/**
	 * 记录手指移动信息的底层
	 * zjh 20161120 1.0
	 * 下面代码有详细注释
	 */

	var ZSwiperMaker = function(o){ 
	    var that = this;
	    this.info = {};
	    this.info.x ='0'; //x 轴移动距离;
	    this.info.y ='0'; //y 轴移动距离;
	    this.info.contX = 0; //X 轴滚动的累加值
	    this.info.contY = 0; //Y 轴滚动的累加值
	    this.info.isx =''; //x 轴的移动方向，-为左  +为右；
	    this.info.isy =''; //y 轴的移动方向，-为上  +为下；

	    this.sPos = {}; //起点坐标数组；
	    this.mPos = {}; //移动同时当前坐标数组;
	    this.config = o; //传入的对象
	    this.control = false; //优化使用阀门
	    this.dire;
	    // this.config.bind.addEventListener('touchstart', function(){ return that.start(); } ,false);
	    // 这样不对的，event对象只在事件发生的过程中才有效;
	    this.config.bind.addEventListener('touchstart', function(e){ return that.start(e); } ,true);
	    this.config.bind.addEventListener('touchmove', function(e){ return that.move(e); } ,true);
	    this.config.bind.addEventListener('touchend', function(e){ return that.end(e); } ,false);
	}   
	 ZSwiperMaker.prototype.test = function(e){
	   console.log('test');
	 },

	ZSwiperMaker.prototype.start = function(e){
	    var that = this;
	    var point = e.touches ? e.touches[0] : e;
	    this.sPos.x = point.screenX;
	    this.sPos.y = point.screenY;
	    // 得到值
	    this.info.contY = this.config.bind.getAttribute('data-y') || 0;
	    this.info.contX = this.config.bind.getAttribute('data-x') || 0;
	    // 开始时的回调函数
	    if(this.config.callStart){
	        this.config.callStart(this);
	    }
	    e.cancelable=false;
	    e.preventDefault();
	}
	ZSwiperMaker.prototype.move = function(e){
	    var that = this;
	    buffer(behavior(e),160);
	    e.cancelable=false;
	    e.preventDefault();
	    if ( e && e.stopPropagation )
	    //因此它支持W3C的stopPropagation()方法
	         e.stopPropagation(); 
	    else
	    //否则，我们需要使用IE的方式来取消事件冒泡 
	        window.event.cancelBubble = true;
	        return false;
	    function buffer(fn, ms) {
	      var timeout;
	      return function() {
	        if (timeout) return;
	        var args = arguments;
	        timeout = setTimeout(function() {
	          fn.apply(null, args);
	        }, ms);
	          // timeout = null;
	      }
	    }

	    function behavior(e){
	        var point = e.touches ? e.touches[0] : e;
	        that.control = true;
	        that.mPos.x = point.screenX;
	        that.mPos.y = point.screenY; 
	        // 移动时的回调函数
	        if(that.config.callMove){
	            that.getMoveNum();
	            that.config.callMove(that);
	        }
	    }
	}

	ZSwiperMaker.prototype.end = function(e){
	    var that = this;
	    this.control = false;
	    // 赋累加值
	    var yNum = Math.round(that.info.y);
	    var nYNum = Math.round(that.info.contY);
	    var nowYNum = yNum+nYNum;

	    var xNum = Math.round(that.info.x);
	    var nXNum = Math.round(that.info.contX);
	    var nowXNum = xNum+nXNum;
	    this.info.contY = nowYNum;
	    this.info.contX = nowXNum;

	    this.config.bind.setAttribute('data-y',nowYNum);
	    this.config.bind.setAttribute('data-x',nowXNum);
	    // 结束时的回调函数
	    if(this.config.callEnd){
	        this.getMoveNum();
	        this.config.callEnd(this);
	    }
	},

	/**
	 * 得到移动的方向
	 */
	ZSwiperMaker.prototype.getMoveNum = function(e){
	     this.info.x = this.mPos.x-this.sPos.x;
	     this.info.y = this.mPos.y-this.sPos.y;

	     if(this.info.x==0){
	        this.info.isx = null;
	     }else if(this.info.x>0){
	        this.info.isx = 'right';
	     }else{
	        this.info.isx = 'left';
	     }
	     if(this.info.y==0){
	        this.info.isy = null;
	     }else if(this.info.y>0){
	        this.info.isy = 'top';
	     }else{
	        this.info.isy = 'bottom';
	     }
	}
	// window.ZSwiperMaker = ZSwiperMaker;
	// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);// 禁止微信touchmove冲突
	module.exports = ZSwiperMaker;


/***/ })
/******/ ]);