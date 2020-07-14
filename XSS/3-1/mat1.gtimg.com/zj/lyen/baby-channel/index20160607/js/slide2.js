/*
* @Author: Administrator
* @Date:   2016-06-06 12:59:57
* @Last Modified by:   Administrator
* @Last Modified time: 2016-06-30 17:57:22
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
		dotActiveModel:"click"	//dot的触发模式 click mouseover
	},$wrap;
	this._O = $.extend(option,opt);
	$wrap = this._O.$wrap;
	this.$sliderouter = this._O.$sliderouter;
    this._EC = $wrap.find("."+this._O.dotClassName);
    this._CE = $wrap.find("."+this._O.slideClassName);
    this._L = this._CE.length;
    this._N = 'current';
    this._Prev = $wrap.find(this._O.$prevBtn);
    this._Next = $wrap.find(this._O.$nextBtn);
    this.moving = false;
    this.init();
}
Slide2.prototype = {
    init: function() {
        var _this = this;
        _this.$sliderouter.append($(_this._CE[0]).clone());
        _this._W = _this._CE.width();
        _this._I = 0;
        if (_this._Prev) {
            _this._Prev.on('click', function() {
                if(_this.moving){return;}
                _this._I = _this._I - 1;
                if (_this._I == -1)
                    _this._I = _this._L - 1;
                _this.slide(_this);
            });
        }
        if (_this._Next) {
            _this._Next.on('click', function() {
                if(_this.moving){return;}
                _this._I = _this._I + 1;
                if (_this._I == _this._L)
                    _this._I = 0;
                _this.slide(_this);
            });
        }
        if (_this._O.dotActiveModel == "click") {
            _this._EC.on('click', function() {
                _this._I = $(this).index();
                _this.slide(_this);
            });
        }
        if (_this._O.dotActiveModel == "mouseover") {
            _this._EC.on('mouseover', function() {
                _this._I = $(this).index();
                _this.slide(_this);
            });
        }
        if(typeof _this._O.autoplay == "undefined" || _this._O.autoplay){
            _this._HD = setTimeout(function() { _this._I = _this._I + 1; _this.slide(_this); }, 3000);
        }
    },
    slide: function(e) {
        var _this = e
        if (_this._HD) { clearTimeout(_this._HD); }
        _this._CE.clearQueue(); _this._CE.stop();
        _this.moving = true;
        var left = _this._W * _this._I;
        _this.$sliderouter.animate({ left: '-' + left + 'px' }, 300, function() {
            if (_this._I == _this._L) {
                _this._I = 0;
                _this._CE.css('left', '0px');
            }
            _this._EC.filter('.' + _this._N).removeClass(_this._N);
            _this._EC.eq(_this._I).addClass(_this._N);
            _this.moving = false;
            if(typeof _this._O.autoplay == "undefined" || _this._O.autoplay){
                _this._HD = setTimeout(function() { _this._I = _this._I + 1; _this.slide(_this); }, 3000);
            }
        });
    }
}

/*  |xGv00|438d1abb5c9e63759b42e71b0f21fb52 */