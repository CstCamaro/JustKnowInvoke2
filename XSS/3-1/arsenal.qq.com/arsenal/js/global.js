$(function() {


// µ¼º½
var nav = function() {
	var container = $('#nav .nav-list'),
		firstLevel = $('.first-level', container),
		secondLevel = $('.sencond-level', container),
		thirdLevel = $('.third-level', container),
		secondCont = $('.second-cont', container),
		thirdCont = $('.third-cont', container),
		firstLevelCurCls = 'first-level-cur',
		curFirstLevel;


	firstLevel.hover(function() {
		var _this = $(this);
		
		curFirstLevel = firstLevel.filter('.' + firstLevelCurCls);

		_this.addClass(firstLevelCurCls).siblings().removeClass(firstLevelCurCls)
		.end()
		.children('.second-cont').show().children('.second-level').has('.has-next').hover(function() {
			var _this = $(this);
			$('.third-cont', _this).show();
		}, function() {
			thirdCont.hide();
		});
	}, function() {
		secondCont.hide();
		thirdCont.hide();
		curFirstLevel.addClass(firstLevelCurCls).siblings().removeClass(firstLevelCurCls);
	});
};
nav();

// ËÑË÷¿ò
var searchBox = function() {
	var searchInput = $('#search-area .input-txt'),
		placeholder = searchInput.attr('placeholder');

	searchInput.val(placeholder);
	searchInput.bind({
		focus: function() {
			var _this = $(this);
			_this.val('');
		},
		blur: function() {
			var _this = $(this);
			searchInput.val(placeholder);
		}
	});

};
searchBox();


//µã»÷ÇÐ»»Ð§¹û
	var tabToggle = function(trigger, panel, cls) {
		trigger.click(function() {
			var _this = $(this),
				_index = _this.index();

			if(cls) {
				_this.addClass(cls).siblings().removeClass(cls);
			}
			panel.eq(_index).show().siblings().hide();
		});
	};

	tabToggle($('.season-data-stat-triggers li'), $('.season-data-stat-panel'), 'season-data-stat-cur');
	$.each($('.data-stat-tab'), function() {
		var _this = $(this);
		tabToggle($('.data-stat-tab-triggers li', _this), $('.data-stat-panel', _this), 'data-stat-cur');
	});

});/*  |xGv00|34b2afe5453f130090a05f6264c552cb */