var Poster = {};
Poster.VER = "1.0.0";
Poster.Event = {
	CREATE:"create"

};


/**
 *	预先加载
 */
Poster.Preload = {
	_queue : null,	//loder
	_images : [
		{id:"pic1",src:"pic_1.png"},
        {id:"pic2",src:"pic_2.png"},
        {id:"pic3",src:"pic_3.png"},
        {id:"code",src:"code.png"},
    ],


	/**
	 *	初始化
	 */
	init : function(number,type){
		this._queue = new createjs.LoadQueue(false);
		this._queue.loadManifest(this._images, false, "poster/");
        // this._queue.loadManifest(this._images, false, "https://news.qq.com/zt2020/inews/html/laogong/images/");
        // this._queue.loadFile({id:"head", src:Poster.common._head});
	},

	/**
	 *	加载
	 */
	load : function(progress, complete,number){
		if(!this._queue) this.init(number);
		if(progress)this._queue.on("progress", progress, this);//资源载入中
		if(complete)this._queue.on("complete", complete, this);//资源载入完毕
		this._queue.load();
	},
	/**
	 *	获取loader
	 */
	getQueue : function(){
		return this._queue;
	},
	/**
	 *	获取文件实体
	 */
	getResult : function(id){
		return this._queue.getResult(id);
	}
};

/**
 * 主函数
 */
Poster.main = function(canvas){
	var _this = this;
	var FPS = 60;
	var WIDTH = 542,
		HEIGHT = 1078;

	var __game = null;

	var __scene = null; //改变的
    var __pic = null;
    var __code = null; //二维码
 

    var __person = null;    
 

	_this.init = function(canvas){
		_this.Stage_constructor(canvas);//继承stage
		createjs.Ticker.setFPS = FPS;	//帧频
		createjs.Ticker.addEventListener('tick', _this);	//按照帧频更新舞台
		createjs.Touch.enable(_this);	//启用tauch

        __game = new createjs.Container();
        __scene = new createjs.Container();
        __person = new createjs.Container();

        // var __bg = Poster.common.addBitmap({id:"bg",x:0,y:0});
        var __bg = new createjs.Shape();
        __bg.graphics.beginFill("#000").drawRect(0, 0, WIDTH, HEIGHT);

        // var __againBtn = Poster.common.addBitmap({id:"againBtn",x:79,y:1276});
     
        __code = Poster.common.addBitmap({id:"code",x:426,y:20});
    

		__game.addChild(__bg,__scene,__code,__person);
        // _this.reStart();
        _this.resize(canvas);
        _this.addChild(__game);

	};

	/**
     * 在玩一次
     * */
	_this.reStart = function(){
        __scene.removeAllChildren();
        var _pic = new createjs.Bitmap(Poster.Preload.getResult("pic" + _choiceNumber));
        // var _pic = new createjs.Bitmap(Poster.Preload.getResult("pic" + 1));
        _pic.x = 0;
        _pic.y = 0;
        var _time = new createjs.Bitmap(Poster.Preload.getResult("time" + _choiceNumber)); 
        _time.x = 97;
        _time.y = 130;

        __scene.addChild(_pic)
    };

    /**
    * 设置名字
    **/
    _this.setName = function(txt){
        __name.getChildByName("USER").text = txt;
        __name.getChildByName("USER").color = __nameColor;
        __name.x = (WIDTH-__name.getBounds().width)/2;
        __name.y = 142;
    };

    /**
    * 设置倒计时
    **/
    _this.setTime = function(){
        __day.removeAllChildren();
        __hour.removeAllChildren();
        var timeStart = new Date().getTime();//设定开始时间(等于系统当前时间)
        // var time_end = new Date("2017/08/16 15:00:00").getTime(); //设定结束时间
        //计算时间差
        var timeDistance = _timeEnd - timeStart;
        if(timeDistance > 0) {
            // 天时分秒换算
            var intDay = Math.floor(timeDistance / 86400000);
            timeDistance -= intDay * 86400000;
            var intHour = Math.floor(timeDistance / 3600000);
            timeDistance -= intHour * 3600000;
            
            var dayStr = intDay.toString();
            var hourStr = intHour.toString();
            console.log(dayStr,hourStr)
            for(var i=0;i<dayStr.length;i++){
                var number = dayStr.charAt(i);
                console.log(number);
                var _dayNumber = Poster.common.addBitmap({id:"timeNumber_"+number,x: i*45,y: 0});
                // _dayNumber.y = 172;
                var dayWidth = _dayNumber.getBounds().width;
                console.log(dayWidth);
                __day.y = 180;
                if(dayStr.length==1){
                    __day.x = 170;
                }else if(dayStr.length==2){
                    __day.x = 124;
                }else if(dayStr.length==3){
                    __day.x = 80;
                }
                __day.addChild(_dayNumber);
               
            }

            for(var i=0;i<hourStr.length;i++){
                var number = hourStr.charAt(i);
                console.log(number);
                var _hourNumber = Poster.common.addBitmap({id:"timeNumber_"+number,x: i*43,y: 0});
                // _dayNumber.y = 172;
                var dayWidth = _hourNumber.getBounds().width;
                console.log(dayWidth);
                __hour.addChild(_hourNumber);
                __hour.y = 180;
               if(hourStr.length>1){
                __hour.x = 275;
               }else{
                __hour.x = 307;
               }
            }


        }else{
            // $(".timeDay").html('00');
            // $(".timeHour").html('00');
        }        

    };


    /**
    * 设置第几名
    **/
   _this.setPerson = function(personNumber){
        __person.removeAllChildren();
        var personStr = personNumber.toString();
        for(var i=0;i<personStr.length;i++){
            var number = personStr.charAt(i);
            console.log(number);
            var _personNumber = Poster.common.addBitmap({id:"personNumber_"+number,x: i*28,y: 0});
            // _dayNumber.y = 172;
            var dayWidth = _personNumber.getBounds().width;
            console.log(dayWidth);
            __person.y = 843;
            if(personStr.length==1){
                __person.x = 181;
                __personText_1.x = 90;
                __personText_2.x = 220;
            }else if(personStr.length==2){
                __person.x = 168;
                __personText_1.x = 75;
                __personText_2.x = 240;
            }else if(personStr.length==3){
                __person.x = 155;
                __personText_1.x = 65;
                __personText_2.x = 250;
            }else if(personStr.length==4){
                __person.x = 140;
                __personText_1.x = 45;
                __personText_2.x = 270;
            }else if(personStr.length==5){
                __person.x = 128;
                __personText_1.x = 35;
                __personText_2.x = 280;
            }
            __person.addChild(_personNumber);
            
        }
    };

    /**
     * 播放声音
     */
    _this.playSound = function(id,unlock,loop){
        var sound = new Poster.Sound(id,loop);
        sound.name = id;
        if(unlock) sound.stop();
        __sounds.addChild(sound);
        return sound;
    };

    _this.createPic = function (bol) {
        // if (bol) {
        //     __code.visible = true;
        //     __resultText.visible = false;
        // } else {
        //     __code.visible = false;
        //     __resultText.visible = true;
        // }
    };
	/*
	 * 获得图片base64编码
	 */
	_this.getImageData = function(){
        _this.createPic(true);
		__game.cache(0,0,WIDTH,HEIGHT);
		var data = __game.getCacheDataURL();
		var img = new Image();
		img.src = data;
		img.onload = function(e){
			compress(img,WIDTH,HEIGHT)
		};
		__game.uncache();
        _this.createPic();
		return data;
	};
	function compress (source, width, height){
//		var img = new Image();
//		img.src = source;
//		console.log(img)
		var mime_type = "image/jpeg";
		var quality = 0.8;
		var cvs = document.createElement('canvas');
		//naturalWidth真实图片的宽度
		cvs.width = width;
		cvs.height = height;
		var ctx = cvs.getContext("2d").drawImage(source, 0,0, width, height);
		var data = cvs.toDataURL(mime_type, quality);
		isCreate(data);
//		return data;
	}
	/**
	 * 可以生成
	 */
	function isCreate(data){
		var evt = new createjs.Event(Poster.Event.CREATE);
		evt.data = data;
		_this.dispatchEvent(evt);
	}
	_this.getToDataURL = function(){
		var data = $("#Poster")[0].toDataURL("image/jpeg");
		return data;
	};
    _this.resize = function(canvas){
        var width = $(window).width(),
            height = $(window).height();
        var scale = WIDTH / width;
        // __footer.y = height*scale;
        // __code.y = height*scale - 28;
    };
	_this.init(canvas);
};
Poster.main.prototype = createjs.extend(Poster.main, createjs.Stage);
Poster.main = createjs.promote(Poster.main, "Stage");

/**
 * 声音
 */
Poster.Sound = function(id,loo) {
	var _this = this;
	var __sound = null,
		_loop = loo;
	_this.init = function(id) {
		_this.Container_constructor(); //构造
		__sound = new createjs.Sound.play(id,{loop:_loop});
		_this.on("tick", onTick)
	};
	_this.play = function(){
		__sound.play()
	};
	_this.stop = function(){
		_loop = false;
		__sound.stop();
	};
	function onTick(){
		_this.removeEventListener("tick", onTick);
		if(_loop) __sound.play();
	}
	_this.init(id)
};
Poster.Sound.prototype = createjs.extend(Poster.Sound, createjs.Container);
Poster.Sound = createjs.promote(Poster.Sound, "Container");


/**
 * 公用
 */
Poster.common = {
    SCALE: 1,
    FEAMERATE: 8,
    INTERVAL: 1000,
    /**
     * 添加图片
     */
    addBitmap : function(obj){
        if(!obj.v) obj.v = true;
        if(!obj.x) obj.x = 0;
        if(!obj.y) obj.y = 0;
        var bit = new createjs.Bitmap(Poster.Preload.getResult(obj.id));
        bit.x = obj.x;
        bit.y = obj.y;
        bit.visible = obj.v;
        return bit;
    },
    /**
     * 添加雪碧图
     */
    addSprite: function (obj) {
        console.log(obj)
        if (!obj.s) obj.s = Poster.common.SCALE;
        if (!obj.f) obj.f = Poster.common.FEAMERATE;
        var data = {
            images: [Poster.Preload.getResult(obj.id)],
            frames: { width: obj.w, height: obj.h },
            framerate: obj.f
        };
        var spriteSheet = new createjs.SpriteSheet(data);
        var sheet = new createjs.Sprite(spriteSheet);
        if (obj.name) sheet.name = obj.name
        sheet.play();
        sheet.x = obj.x;
        sheet.y = obj.y;
        console.log(sheet)
        return sheet;
    },
    weixinSound: function(){
        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {
                    webKit: u.indexOf('AppleWebKit') > -1,
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                    weixin: u.indexOf('MicroMessenger') > -1,
                    txnews: u.indexOf('qqnews') > -1,
                    sinawb: u.indexOf('weibo') > -1,
                    mqq: u.indexOf('QQ') > -1
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };

        // ios下的微信和qq自动播放视频
        if (browser.versions.ios && (browser.versions.weixin || browser.versions.mqq)) {
            if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                //已经错过事件不能再自动播放
            } else {
                if (document.addEventListener) {
                    document.addEventListener("WeixinJSBridgeReady", loadVideo, false);
                } else if (document.attachEvent) {
                    document.attachEvent("WeixinJSBridgeReady", loadVideo);
                    document.attachEvent("onWeixinJSBridgeReady", loadVideo);
                }
            };
        }
        //加载视频
        function loadVideo() {
            Poster.common._sound = document.getElementById("music");
            if(!Poster.common._sound) loadVideo();
            Poster.common._sound.play();
            //alert(Poster.common._sound)
//             Poster.common._sound.pause();
            //Poster.common._sound.currentTime = 0
        }

    }

}
