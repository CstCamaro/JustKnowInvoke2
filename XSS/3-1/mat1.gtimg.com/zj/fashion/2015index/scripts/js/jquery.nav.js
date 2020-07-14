$.fn.extend({
	fixedMe: function() {
		var me = $(this);
		var offset = me.offset();
		var _defautlTop = offset.top;
		var _defautlLeft = offset.left - $(window).scrollLeft();
		var _position = $(this).css('position');
		var _top = $(this).css('top');
		var _left = $(this).css('left');
		var _zIndex = $(this).css('z-index');
		if (_defautlTop < 0) {
		me.css({'position': 'fixed', 'top': 0, 'left': _defautlLeft, 'z-index': 9});
		_defautlTop = offset.top;
		}
		$(window).scroll(function() {
		if ($(this).scrollTop() > _defautlTop) {

			me.css({'position': 'fixed', 'top': 0, 'left': _defautlLeft, 'z-index': 9});

		} else {
			me.css({'position': _position, 'top': _top, 'left': _left, 'z-index': _zIndex});
		}
		});
	},
	slideBar: function() {
		var _this_ = $(this);
		_this_.find('.tjitem').mouseover(function() {
		if (_this_.find('.tytit').eq($(this).index()).hasClass('tjcur')) {
			return;
		}
		_this_.find('.tjitem').stop(true, true).animate({height: '44px'}, 500);
		$(this).stop(true, true).animate({height: '150px'}, 500);
		_this_.find('.tytit').removeClass('tjcur');
		_this_.find('.tytit').eq($(this).index()).addClass('tjcur');
		});
	},
	showTab: function() {
		var _this = $(this);
		if (_this.hasClass('tabCurrent')) {
		return;
		}
		var id = _this.attr('id'), ag = _this.attr('action-group');
		var cur = $('.tabEvt[action-group="' + ag + '"]').filter(".tabCurrent");
		var cid = cur.attr('id');
		$("#" + cid + 'Ctn').hide();
		$('#' + id + "Ctn").show();
		cur.removeClass('tabCurrent');
		_this.addClass('tabCurrent');
	}
});/*  |xGv00|75a9a197ccb5ca790c5f95be16bc7f0b */