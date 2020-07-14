/*
* @Author: Administrator
* @Date:   2016-06-06 12:59:57
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-24 13:49:50
*/

'use strict';
var Slide2 = function(opt) {
	var option = {
		$wrap:null,				//容器
		$sliderouter:null,		//slide元素的第一个外层元素
		slideClassName:null,	//slide元素的className
		dotClassName:null,
		$prevBtn:null,			//前进
		$nextBtn:null,			//后退
		autoplay: true,			//自动播放
		dotActiveModel:"click",	//dot的触发模式 click mouseover
        onSlideStart:null,      //开始滑动之前的动作
        onSlideEnd: null,       //结束滑动之后的动作
        initIndex: 0,             //初始定位
        loop: false,             //是否循环
        isAutoWidth: false,      //是否自定义宽度
        isChangeWidth: false    //是否宽度会变化
	},$wrap;
	this._O = $.extend(option,opt);
	$wrap = this._O.$wrap;
	this.$sliderouter = this._O.$sliderouter;
    this._EC = $wrap.find("."+this._O.dotClassName);
    this._CE = $wrap.find("."+this._O.slideClassName);
    this._L = this._CE.length;
    this._N = 'current';
    this._Prev = this._O.$prevBtn;
    this._Next = this._O.$nextBtn;
    this._InitLeft = 0;
    this._InitIndex = this._O.initIndex;
    this.loop = this._O.loop;
    this.moving = false;
    this.onSlideStart = this._O.onSlideStart;
    this.onSlideEnd = this._O.onSlideEnd;
    this._isAutoWidth = this._O.isAutoWidth;
    this._isChangeWidth = this._O.isChangeWidth;
    this.init();
}
Slide2.utils = {};
Slide2.utils.calculationDiffW = function($slide){
    var i, l, w, tw;
    if($slide instanceof jQuery){
        l = $slide.length;
        if(l === 1 ){
            $slide.diffW
            return $slide[0].offsetLeft;
        }else if( l === 0 ){
            return 0;
        }else if(l > 0 ){
            w = [];
            for(i = 0 ;i < l;i++){
                tw = $slide[i].offsetLeft;
                $($slide[i]).diffW = tw;
                w.push(tw);
            }
            return w;
        }
    }
    return 0;

}
Slide2.prototype = {
    init: function() {
        var _this = this;
        _this._W = _this._CE.width();
        _this._I = _this._InitIndex;

        //添加元素
        if(_this._L <= 1){
            _this.loop = false;
            _this._Prev && _this._Prev.css("display","none");
            _this._Next && _this._Next.css("display","none");
        }
        if(_this.loop){
            _this.$sliderouter.append($(_this._CE[0]).clone());
            _this.$sliderouter.prepend($(_this._CE[_this._L - 1]).clone());
        }
        _this.$slides = this.$sliderouter.find("."+this._O.slideClassName);
        //给第一个元素添加this._N
        $(_this._CE[_this._I]).addClass(_this._N);
        //初始化 sliderourter的初始left值
        if(!_this._isAutoWidth && !_this._isChangeWidth){
            _this._InitLeft = ((_this.loop?1:0) + _this._InitIndex)*_this._W;
        }else if(_this._isAutoWidth){
            _this.diffW = Slide2.utils.calculationDiffW(_this._O.$wrap.find("."+this._O.slideClassName));
            _this._InitLeft = _this.diffW[(_this.loop?1:0) + _this._InitIndex];
        }else if(_this._isChangeWidth){
            _this._InitLeft = Slide2.utils.calculationDiffW($(_this._CE[_this._I]));
        }

        _this.$sliderouter.css("left",-(_this._InitLeft)+"px");

        if (_this._Prev) {
            _this._Prev.on('click', function() {
                if(_this.moving){return;}
                _this._I = _this._I - 1;
                _this.slide();
            });
        }
        if (_this._Next) {
            _this._Next.on('click', function() {
                if(_this.moving){return;}
                _this._I = _this._I + 1;
                _this.slide();
            });
        }
        if (_this._O.dotActiveModel == "click") {
            _this._EC.on('click', function() {
                _this._I = $(this).index();
                _this.slide();
            });
        }
        if (_this._O.dotActiveModel == "mouseover") {
            _this._EC.on('mouseover', function() {
                _this._I = $(this).index();
                _this.slide();
            });
        }
        if(typeof _this._O.autoplay == "undefined" || _this._O.autoplay){
            _this._HD = setTimeout(function() { _this._I = _this._I + 1; _this.slide(_this); }, 3000);
        }
    },
    slide: function() {

        var _this = this, left;
        if (_this._HD) { clearTimeout(_this._HD); }
        _this._CE.clearQueue(); _this._CE.stop();
        _this.moving = true;
        //如果不循环的话，就直接进入对应元素
        if(!_this.loop){
            if (_this._I == _this._L) {
                _this._I = 0;
            }else if (_this._I <= -1){
                _this._I = _this._L + _this._I%_this._L;
            }
        }
        if(!_this._isAutoWidth && !_this._isChangeWidth){
            left = -(_this._I+(_this.loop?1:0))*_this._W;
        }else if(_this._isAutoWidth){
            left = -_this.diffW[_this._I+(_this.loop?1:0)];
        }else if(_this._isChangeWidth){
            left = -Slide2.utils.calculationDiffW($(_this.$slides[_this._I+(_this.loop?1:0)]));
        }
        var slideAnimate = function(me,callback){
            var _this = me;
            _this.$sliderouter.animate({ left: left + 'px' }, 300, function() {
                if(_this._I == _this._L || _this._I == -1){
                    if (_this._I == _this._L) {
                        _this._I = 0;
                    }else if (_this._I == -1){
                        _this._I = _this._L - 1;
                    }
                    if(!_this._isAutoWidth && !_this._isChangeWidth){
                        _this.$sliderouter.css('left', -(_this._I+(_this.loop?1:0))*_this._W  + 'px');
                    }else if(_this._isAutoWidth){
                        _this.$sliderouter.css('left', -_this.diffW[_this._I+(_this.loop?1:0)] + 'px');
                    }else if(_this._isChangeWidth){
                        _this.$sliderouter.css('left', -Slide2.utils.calculationDiffW($(_this.$slides[_this._I+(_this.loop?1:0)])) + 'px');
                    }
                }

                _this._CE.filter('.' + _this._N).removeClass(_this._N);
                _this._CE.eq(_this._I).addClass(_this._N);
                _this._EC.filter('.' + _this._N).removeClass(_this._N);
                _this._EC.eq(_this._I).addClass(_this._N);
                _this.moving = false;
                if(typeof _this._O.autoplay == "undefined" || _this._O.autoplay){
                    _this._HD = setTimeout(function() { _this._I = _this._I + 1; _this.slide(_this); }, 3000);
                }
                if(callback && typeof callback == "function"){
                    callback();
                }
            });
        }
        if(_this.onSlideStart && typeof _this.onSlideStart == "function"){
            _this.onSlideStart(function(){
                slideAnimate(_this,_this.onSlideEnd);
            });
        }else{
            slideAnimate(_this,_this.onSlideEnd);
        }

    }
}

/*  |xGv00|fa683ecaab247e1f20c43f5b3bf8a0d0 */