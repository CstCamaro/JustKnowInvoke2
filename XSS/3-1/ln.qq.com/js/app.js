
var sjdSlide = {
    i: 0,
    len: 0,
    sw: 420,
    dots: undefined,
    body: undefined,
    desc: undefined,
    init: function() {
        var _this = this;
        this.body = $('#slideBody'), this.dots = $('#slideDots > .dot'), this.desc = $('#slideDesc > .slideDesc');
        this.len = this.dots.length;
        if (this.len == 0 || this.dots.length != this.desc.length) return;
        var html = this.body.html();
        this.body.html(html + html);
        this.body.width(this.len * this.sw * 2);
        var cur = this.dots.filter('current');
        if (cur.length == 0) { this.dots.eq(0).addClass('current'); this.i = 0; }
        else {
            this.i = cur.index();
        }
	_this.dots.live('mouseover', function() {
            _this.body.stop();
            clearTimeout(_this.timeHandler);
            var i = $(this).index();
            _this.i = i - 1;
            _this.slide(_this);
        });
        _this.timeHandler = setTimeout(function() { _this.slide(_this); }, 4000);
    },
    slide: function(e) {
        var _this = e;
        var l = _this.i + 1;
        this.body.animate({ left: "-" + l * _this.sw + "px" }, 400, function() {
            if (l == _this.len) {
                _this.body.css('left', 0);
                _this.i = 0;
            } else { _this.i = l; }
            var cur = _this.dots.filter('.current');
            var index = cur.index();
            cur.removeClass('current');
            _this.desc.eq(index).hide();
            _this.desc.eq(_this.i).show();
            _this.dots.eq(_this.i).addClass('current');
            _this.timeHandler = setTimeout(function() { _this.slide(_this); }, 4000);
        });
    }
}
$(document).ready(function() {
    sjdSlide.init();

    var autoSlide = function(e) {
        var evts = e.find('.mouseoverEvt'), enow;
        var index = evts.index(evts.filter('.current'));
        if (index == evts.length - 1) { enow = evts.eq(0); }
        else enow = evts.eq(index + 1);
        enow.mouseover();
        setTimeout(function() { autoSlide(e); }, 5000);
    }

    $('#cardAuto').each(function(i) {
        var _this = $(this);
        setTimeout(function() { autoSlide(_this); }, 5000);
    });
/*  $('#fin_Tab').find('li').mouseover(function(){
 	var index = $(this).index();
	var cur = $('#fin_Tab').find('li').filter('.current');
	var curIndex = cur.index();	
	cur.removeClass('current');
	$(this).addClass('current');
	var id = "#fin_Tab"+index, curId = '#fin_Tab'+curIndex;
	$(curId).hide();
	$(id).show();
    });   */

});
/****
    鍔熻兘锛氬湪.mouseoverEvt绫讳笂鐩戝惉榧犳爣鍒掕繃浜嬩欢
    澶囨敞锛氭椂闂村叧绯伙紝娌℃湁鍒朵綔瀵瑰簲鐨勬彃浠�
***/
$(document).on('mouseover', '.mouseoverEvt', function() {
    var _this = $(this);
    if (_this.hasClass('current')) { return; }
    var id = _this.attr('id'), ag = _this.attr('action-group');
    var cur = $('.mouseoverEvt[action-group="' + ag + '"][class*="current"]');
    var cid = cur.attr('id');
    $("#" + cid + 'Ctn').hide();
    $('#' + id + "Ctn").show();
    cur.removeClass('current');
    _this.addClass('current');
});

/****
    鐩戝惉榧犳爣鍒掕繃锛岀獊鍑哄垝杩囧璞★紝浠ユ柟渚跨敤鎴风‘璁ゅ綋鍓嶆煡鐪嬬殑瀵硅薄锛�
    鑰冭檻鏌愪簺娴忚鍣ㄤ笉鍏煎浼被锛屾墍浠ユ坊鍔犱簨浠�
****/ 
$(document).on('mouseover', '.overBorderEvt', function() {
    $(this).css('border-color', '#ccc');
}).on('mouseleave', '.overBorderEvt', function() {
    $(this).css('border-color', '#fff');
});/*  |xGv00|1bc82f3e788ea2e78f71348e4bc7fc20 */