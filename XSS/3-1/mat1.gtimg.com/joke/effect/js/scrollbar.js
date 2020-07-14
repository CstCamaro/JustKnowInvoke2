/**
 * @description scrollBar模拟滚动条事件 依赖 jQuery
 * @author jianminlu
 * @update 2013-09-04 16:31
 * @version v0.1
 */
(function($){
    var scrollBar = window['scrollBar'] = function(o){
        return new _scrollBar(o);
    },
    _scrollBar = function(o){
        var _this = this;
        this.mod = $("#" + o.mod);
        this.con = $("#" + o.con);
        this.bar = $("#" + o.bar);
        this.btn = $("#" + o.btn);
        this.modH = this.mod.height();
        this.conH = this.con.height();
        this.barH = this.bar.height();
        this.btnH = (this.modH * this.modH / this.conH) < 20 ? 20 : (this.modH * this.modH / this.conH);
        this.TxtScroll();
    };
    _scrollBar.prototype = {
        TxtScroll: function(){
            var _this = this;
            if(_this.conH - _this.modH > 0){
                _this.bar.css({height: _this.modH});
                _this.bar.show();
                _this.startDrag(_this.btn);
            }else{
                _this.bar.hide();
            }
            _this.btn.css("height", _this.btnH);
        },
        startDrag: function(btn){
            var _this = this,
                _move = false,  //移动标记
                _y; //鼠标离控件左上角的相对位置
            btn.click(function(){}).mousedown(function(e){
                _move = true;
                _y = e.pageY - parseInt(btn.css("top"));
                btn.fadeTo(20, 0.9);    //点击后开始拖动并透明显示
                return false;
            });
            $(document).mousemove(function(e){
                if(_move){  //移动时根据鼠标位置计算控件左上角的绝对位置
                    _this.drag(e.pageY - _y);
                }
            }).mouseup(function(){
                _move = false;
                btn.fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
            });
            _this.con.bind('mousewheel DOMMouseScroll', function(e, delta){
                if(_this.bar.css('display') == 'none') return;
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
                var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);
                var y = parseInt(btn.css('top'));
                if(delta < 0){
                    y += 10;
                }else{
                    y -= 10;
                }
                _this.drag(y);
                return false;
            });
        },
        drag: function (y){
            var _this = this;
            if(y <= 0){
                y = 0;
            }else if( y >= (_this.modH - _this.btnH)){
                y = (_this.modH - _this.btnH)
            }
            var t = (_this.modH - _this.conH) * y / (_this.modH - _this.btnH);
            _this.btn.css({top: y});   //控件新位置
            _this.con.css({top: t});
        },
        scrollTo: function(t){
            var _this = this;
            var y = -(_this.modH - _this.btnH) * t / (_this.modH - _this.conH);
            if(y <= 0){
                y = 0;
            }else if( y >= (_this.modH - _this.btnH)){
                y = (_this.modH - _this.btnH)
            }
            var t = (_this.modH - _this.conH) * y / (_this.modH - _this.btnH);
            _this.btn.css({top: y});
            _this.con.animate({top: t});
        }
    }
})(jQuery)
/*  |xGv00|a933589f764ce27777dd07489beb9e7a */