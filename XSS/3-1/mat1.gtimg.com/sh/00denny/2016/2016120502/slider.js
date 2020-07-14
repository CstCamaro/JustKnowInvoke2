;
(function($) {
	var plugin = {};
	var defaults = {
		// GENERAL
		mode: 'horizontal',
		event: 'click',
		loop: true,
		slideMargin: 0,
		start: 0,
		captions: false,
		ticker: false,
		tickerHover: false,
		disableBtn: false,
		speed: 500,
		slideSelector: '',
		easing: null,
		randomStart: false,
		adaptiveHeight: false,
		adaptiveHeightSpeed: 500,
		video: false,
		useCSS: true,
		preloadImages: 'visible',
		responsive: true,
		slideZIndex: 50,
		wrapperClass: 'sl-wrapper',
		outside: false,

		// TOUCH
		touchEnabled: true,
		swipeThreshold: 50,
		oneToOneTouch: true,
		preventDefaultSwipeX: true,
		preventDefaultSwipeY: false,

		// PAGER
		pager: true,
		pagerType: 'full',
		pagerShortSeparator: ' / ',
		pagerSelector: null,
		buildPager: null,
		pagerCustom: null,

		// CONTROLS
		controls: true,
		nextText: 'Next',
		prevText: 'Prev',
		nextSelector: null,
		prevSelector: null,
		autoControls: false,
		startText: 'Start',
		stopText: 'Stop',
		autoControlsCombine: false,
		autoControlsSelector: null,

		// AUTO
		auto: false,
		pause: 4000,
		autoStart: true,
		autoDirection: 'next',
		autoHover: false,
		autoDelay: 0,
		autoSlideForOnePage: false,

		// carousel
		minSlides: 1,
		maxSlides: 1,
		num: 1,
		move: 0,
		slideWidth: 0,
		cOutside: true,

		// gallery
		gallery: false,
		galleryMode: 'horizontal',
		galleryNum: 5,
		galleryMargin: 5,
		galleryMove: 1,

		// callbacks
		onLoad: function() {},
		onSlideBefore: function() {},
		onSlideAfter: function() {},
		onSlideNext: function() {},
		onSlidePrev: function() {},
		onResize: function() {}
	}

	$.fn.slider = function(options) {
		if (this.length == 0) return this;
		// support mutltiple elements
		if (this.length > 1) {
			this.each(function() {
				$(this).slider(options)
			});
			return this;
		}
		// create a namespace to be used throughout the plugin
		var sl = {};
		// set a reference to our sl element
		var el = this;
		plugin.el = this;
		/**
		 * Makes slideshow responsive
		 */
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var set;

		/**
		 * ===================================================================================
		 * = PRIVATE FUNCTIONS
		 * ===================================================================================
		 */

		/**
		 * Initializes namespace set to be used throughout plugin
		 */
		var init = function() {
			set = el.set = $.extend({}, defaults, options);
			set.slideWidth = parseInt(set.slideWidth);
			sl.children = el.children(set.slideSelector);
			if (sl.children.length < set.minSlides) set.minSlides = sl.children.length;
			if (sl.children.length < set.maxSlides) set.maxSlides = sl.children.length;
			if (set.randomStart) set.start = Math.floor(Math.random() * sl.children.length);
			sl.active = {
				index: set.start
			}
			if (set.num > 1) {
				set.minSlides = set.maxSlides = set.num;
			};
			sl.carousel = set.minSlides > 1 || set.maxSlides > 1;
			if (sl.carousel) {
				set.preloadImages = 'all';
			}
			sl.minThreshold = (set.minSlides * set.slideWidth) + ((set.minSlides - 1) * set.slideMargin);
			sl.maxThreshold = (set.maxSlides * set.slideWidth) + ((set.maxSlides - 1) * set.slideMargin);
			sl.working = false;
			sl.controls = {};
			sl.interval = null;
			sl.animProp = set.mode == 'vertical' ? 'top' : 'left';
			sl.usingCSS = set.useCSS && set.mode != 'fade' && (function() {
				var div = document.createElement('div');
				var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
				for (var i in props) {
					if (div.style[props[i]] !== undefined) {
						sl.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
						sl.animProp = '-' + sl.cssPrefix + '-transform';
						return true;
					}
				}
				return false;
			}());
			// if vertical mode always make maxSlides and minSlides equal
			if (set.mode == 'vertical')
				set.maxSlides = set.minSlides;
			// save original style data
			el.data("origStyle", el.attr("style"));
			el.children(set.slideSelector).each(function() {
				$(this).data("origStyle", $(this).attr("style"));
			});

			setup();

		}

		/**
		 * Performs all DOM and CSS modifications
		 */
		var setup = function() {
			var out = el.parent();
			if (set.outside === true) {
				out.addClass('outside');
			};
			if (set.cOutside === true && sl.carousel) {
				out.addClass('outside');
			}
			if (set.gallery == true) {
				el.set.pager = false;
				out.find('.gallery').wrap('<div class="outside"></div>');
			};
			out.addClass(set.mode);
			el.wrap('<div class="' + set.wrapperClass + '"><div class="sl-viewport"></div></div>');
			sl.viewport = el.parent();
			sl.wrapper = el.parents('.sl-wrapper');
			sl.loader = $('<div class="sl-loading" />');
			sl.viewport.prepend(sl.loader);
			if (set.galleryMode == 'vertical') {
				out.addClass('gvertical');
				sl.wrapper.width(set.galleryWidth);
			};
			// set el to a massive width, to hold any needed slides
			// also strip any margin and padding from el
			el.css({
				width: set.mode == 'horizontal' ? (sl.children.length * 100 + 215) + '%' : 'auto',
				position: 'relative'
			});

			if (sl.usingCSS && set.easing) {
				el.css('-' + sl.cssPrefix + '-transition-timing-function', set.easing);
			} else if (!set.easing) {
				set.easing = 'swing';
			}
			var slidesShowing = getNumberSlidesShowing();
			// make modifications to the viewport (.sl-viewport)
			sl.viewport.css({
				width: '100%',
				overflow: 'hidden',
				position: 'relative'
			});

			sl.viewport.parent().css({
				maxWidth: getViewportMaxWidth()
			});
			// make modification to the wrapper (.sl-wrapper)
			if (!set.pager) {
				sl.viewport.parent().css({
					margin: '0 auto 0px'
				});
			}
			sl.children.css({
				'float': set.mode == 'horizontal' ? 'left' : 'none',
				listStyle: 'none',
				position: 'relative'
			});
			// apply the calculated width after the float is applied to prevent scrollbar interference
			sl.children.css('width', getSlideWidth());
			var img = sl.children.find('img');
			img.width(getSlideWidth() - parseInt(img.css('border-width')));
			// if slideMargin is supplied, add the css
			if (set.mode == 'horizontal' && set.slideMargin > 0) {
				sl.children.css('marginRight', set.slideMargin);
			};
			if (set.mode == 'vertical' && set.slideMargin > 0) sl.children.css('marginBottom', set.slideMargin);
			if (set.mode == 'fade') {
				sl.children.css({
					position: 'absolute',
					zIndex: 0,
					display: 'none'
				});
				// prepare the z-index on the showing element
				sl.children.eq(set.start).css({
					zIndex: set.slideZIndex,
					display: 'block'
				});
			}

			sl.controls.el = $('<div class="sl-controls" />');
			// if captions are requested, add them
			if (set.captions) appendCaptions();
			// check if start is last slide
			sl.active.last = set.start == getPagerQty() - 1;
			// if video is true, set up the fitVids plugin
			if (set.video) el.fitVids();
			// set the default preload selector (visible)
			var preloadSelector = sl.children.eq(set.start);
			if (set.preloadImages == "all") preloadSelector = sl.children;
			// only check for control addition if not in "ticker" mode
			if (!set.ticker) {
				// if pager is requested, add it
				if (set.pager) appendPager();
				// if controls are requested, add them 
				if (set.controls) appendControls();
				// if auto is true, and auto controls are requested, add them
				if (set.auto && set.autoControls) appendControlsAuto();
				// if any control option is requested, add the controls wrapper
				if (set.controls || set.autoControls || set.pager) sl.viewport.after(sl.controls.el);
				// if ticker mode, do not allow a pager
			} else {
				set.pager = false;
			}

			// preload all images, then perform final DOM / CSS modifications that depend on images being loaded
			loadElements(preloadSelector, start);

		}

		var loadElements = function(selector, callback) {
			var total = selector.find('img, iframe').length;
			if (total == 0) {
				callback();
				return;
			}
			var count = 0;
			selector.find('img, iframe').each(function() {
				$(this).one('load', function() {
					if (++count == total) callback();
				}).each(function() {
					if (this.complete) $(this).load();
				});
			});

		}

		/**
		 * Start the sl
		 */
		var start = function() {
			// if infinite loop, prepare additional slides
			if (set.loop && set.mode != 'fade' && !set.ticker) {
				var slice = set.mode == 'vertical' ? set.minSlides : set.maxSlides;
				var sliceAppend = sl.children.slice(0, slice).clone().addClass('sl-clone');
				var slicePrepend = sl.children.slice(-slice).clone().addClass('sl-clone');
				el.append(sliceAppend).prepend(slicePrepend);
			}
			// remove the loading DOM element
			sl.loader.remove();
			// set the left / top position of "el"
			setSlidePosition();
			// if "vertical" mode, always use adaptiveHeight to prevent odd behavior
			//if (set.mode == 'vertical') set.adaptiveHeight = true;
			// set the viewport height
			sl.height = getViewportHeight();
			sl.viewport.height(getViewportHeight());
			// make sure everything is positioned just right (same as a window resize)
			el.update();
			// onslLoad callback
			set.onLoad(sl.active.index);
			// sl has been fully initialized
			sl.initialized = true;
			// bind the resize call to the window
			if (set.responsive) $(window).on('resize', resize);
			// if auto is true and has more than 1 page, start the show
			if (set.auto && set.autoStart && (getPagerQty() > 1 || set.autoSlideForOnePage)) initAuto();
			// if ticker is true, start the ticker
			if (set.ticker) initTicker();
			if (set.gallery) initGallery();
			// if pager is requested, make the appropriate pager link active
			if (set.pager) updatePagerActive(set.start);
			// check for any updates to the controls (like disableBtn updates)
			if (set.controls) updateDirectionControls();
			// if touchEnabled is true, setup the touch events
			if (set.touchEnabled && !set.ticker) initTouch();
		}

		/**
		 * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
		 */
		var getViewportHeight = function() {
			var height = 0;
			// first determine which children (slides) should be used in our height calculation
			var children = $();
			// if mode is not "vertical" and adaptiveHeight is false, include all children
			if (set.mode != 'vertical' && !set.adaptiveHeight) {
				children = sl.children;
			} else {
				// if not carousel, return the single active child
				if (!sl.carousel) {
					children = sl.children.eq(sl.active.index);
					// if carousel, return a slice of children
				} else {
					// get the individual slide index
					var currentIndex = set.move == 1 ? sl.active.index : sl.active.index * getMoveBy();
					// add the current slide to the children
					children = sl.children.eq(currentIndex);
					// cycle through the remaining "showing" slides
					for (i = 1; i <= set.maxSlides - 1; i++) {
						// if looped back to the start
						if (currentIndex + i >= sl.children.length) {
							children = children.add(sl.children.eq(i - 1));
						} else {
							children = children.add(sl.children.eq(currentIndex + i));
						}
					}
				}
			}
			// if "vertical" mode, calculate the sum of the heights of the children
			if (set.mode == 'vertical') {
				children.each(function(index) {
					height += $(this).outerHeight();
				});
				// add user-supplied margins
				if (set.slideMargin > 0) {
					height += set.slideMargin * (set.minSlides - 1);
				}
				// if not "vertical" mode, calculate the max height of the children
			} else {
				height = Math.max.apply(Math, children.map(function() {
					return $(this).outerHeight(false);
				}).get());
			}

			if (sl.viewport.css('box-sizing') == 'border-box') {
				height += parseInt(sl.viewport.css('padding-top')) + parseInt(sl.viewport.css('padding-bottom')) +
					parseInt(sl.viewport.css('border-top-width')) + parseInt(sl.viewport.css('border-bottom-width'));
			} else if (sl.viewport.css('box-sizing') == 'padding-box') {
				height += parseInt(sl.viewport.css('padding-top')) + parseInt(sl.viewport.css('padding-bottom'));
			}

			return height;
		}

		/**
		 * Returns the calculated width to be used for the outer wrapper / viewport
		 */
		var getViewportMaxWidth = function() {
			var width = '100%';
			if (set.slideWidth > 0) {
				if (set.mode == 'horizontal') {
					width = (set.maxSlides * set.slideWidth) + ((set.maxSlides - 1) * set.slideMargin);
				} else {
					width = set.slideWidth;
				}
			}
			return width;
		}

		/**
		 * Returns the calculated width to be applied to each slide
		 */
		var getSlideWidth = function() {
			// start with any user-supplied slide width
			var newElWidth = set.slideWidth;
			// get the current viewport width
			var wrapWidth = sl.viewport.width();
			// if slide width was not supplied, or is larger than the viewport use the viewport width
			if (set.slideWidth == 0 ||
				(set.slideWidth > wrapWidth && !sl.carousel) ||
				set.mode == 'vertical') {
				newElWidth = wrapWidth;
				// if carousel, use the thresholds to determine the width
			} else if (set.maxSlides > 1 && set.mode == 'horizontal') {
				if (wrapWidth > sl.maxThreshold) {

				} else if (wrapWidth < sl.minThreshold) {
					newElWidth = (wrapWidth - (set.slideMargin * (set.minSlides - 1))) / set.minSlides;
				}
			}
			if (set.slideWidth == 0 && sl.carousel) {
				newElWidth = (wrapWidth - (set.slideMargin * (set.minSlides - 1))) / set.minSlides;
			}
			return newElWidth;
		}

		/**
		 * Returns the number of slides currently visible in the viewport (includes partially visible slides)
		 */
		var getNumberSlidesShowing = function() {
			var slidesShowing = 1;
			if (set.mode == 'horizontal' /* && set.slideWidth > 0*/ ) {
				// if viewport is smaller than minThreshold, return minSlides
				if (sl.viewport.width() < sl.minThreshold) {

					slidesShowing = set.minSlides;
					// if viewport is larger than minThreshold, return maxSlides
				} else if (sl.viewport.width() > sl.maxThreshold) {
					slidesShowing = set.maxSlides;
					// if viewport is between min / max thresholds, divide viewport width by first child width
				} else {
					var childWidth = sl.children.first().width() + set.slideMargin;
					slidesShowing = Math.floor((sl.viewport.width() +
						set.slideMargin) / childWidth);
				}
				// if "vertical" mode, slides showing will always be minSlides
			} else if (set.mode == 'vertical') {
				slidesShowing = set.minSlides;
			}
			return slidesShowing;
		}

		/**
		 * Returns the number of pages (one full viewport of slides is one "page")
		 */
		var getPagerQty = function() {
			var pagerQty = 0;
			// if move is specified by the user
			if (set.move > 0) {
				if (set.loop) {
					pagerQty = Math.ceil(sl.children.length / getMoveBy());
				} else {
					// use a while loop to determine pages
					var breakPoint = 0;
					var counter = 0
						// when breakpoint goes above children length, counter is the number of pages
					while (breakPoint < sl.children.length) {
						++pagerQty;
						breakPoint = counter + getNumberSlidesShowing();
						counter += set.move <= getNumberSlidesShowing() ? set.move : getNumberSlidesShowing();
					}
				}
				// if move is 0 (auto) divide children length by sides showing, then round up
			} else {
				pagerQty = Math.ceil(sl.children.length / getNumberSlidesShowing());
			}
			return pagerQty;
		}

		/**
		 * Returns the number of indivual slides by which to shift the sl
		 */
		var getMoveBy = function() {
			// if move was set by the user and move is less than number of slides showing
			if (set.move > 0 && set.move <= getNumberSlidesShowing()) {
				return set.move;
			}
			// if move is 0 (auto)
			return getNumberSlidesShowing();
		}

		/**
		 * Sets the sl's (el) left or top position
		 */
		var setSlidePosition = function() {
			// if last slide, not infinite loop, and number of children is larger than specified maxSlides
			if (sl.children.length > set.maxSlides && sl.active.last && !set.loop) {
				if (set.mode == 'horizontal') {
					// get the last child's position
					var lastChild = sl.children.last();
					var position = lastChild.position();
					// set the left position
					setPositionProperty(-(parseInt(position.left) - (sl.viewport.width() - lastChild.outerWidth())), 'reset', 0);
				} else if (set.mode == 'vertical') {
					// get the last showing index's position
					var lastShowingIndex = sl.children.length - set.minSlides;
					var position = sl.children.eq(lastShowingIndex).position();
					// set the top position
					setPositionProperty(-parseInt(position.top), 'reset', 0);
				}
				// if not last slide
			} else {
				// get the position of the first showing slide
				var position = sl.children.eq(sl.active.index * getMoveBy()).position();
				// check for last slide
				if (sl.active.index == getPagerQty() - 1) sl.active.last = true;
				// set the repective position
				if (position != undefined) {
					if (set.mode == 'horizontal') setPositionProperty(-parseInt(position.left), 'reset', 0);
					else if (set.mode == 'vertical') setPositionProperty(-parseInt(position.top), 'reset', 0);
				}
			}
		}

		/**
		 * Sets the el's animating property position (which in turn will sometimes animate el).
		 * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
		 *
		 * @param value (int)
		 *  - the animating property's value
		 *
		 * @param type (string) 'sl', 'reset', 'ticker'
		 *  - the type of instance for which the function is being
		 *
		 * @param duration (int)
		 *  - the amount of time (in ms) the transition should occupy
		 *
		 * @param params (array) optional
		 *  - an optional parameter containing any variables that need to be passed in
		 */
		var setPositionProperty = function(value, type, duration, params) {
			// use CSS transform
			if (sl.usingCSS) {
				// determine the translate3d value
				var propValue = set.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
				// add the CSS transition-duration
				el.css('-' + sl.cssPrefix + '-transition-duration', duration / 1000 + 's');
				if (type == 'slide') {
					// set the property value
					el.css(sl.animProp, propValue);
					// bind a callback method - executes when CSS transition completes
					el.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
						// off the callback
						el.off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
						updateAfterSlideTransition();
					});
				} else if (type == 'reset') {
					el.css(sl.animProp, propValue);
				} else if (type == 'ticker') {
					// make the transition use 'linear'
					el.css('-' + sl.cssPrefix + '-transition-timing-function', 'linear');
					el.css(sl.animProp, propValue);
					// bind a callback method - executes when CSS transition completes
					el.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
						// off the callback
						el.off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
						// reset the position
						setPositionProperty(params['resetValue'], 'reset', 0);
						// start the loop again
						tickerLoop();
					});
				}
				// use JS animate
			} else {
				var animateObj = {};
				animateObj[sl.animProp] = value;
				if (type == 'slide') {
					el.animate(animateObj, duration, set.easing, function() {
						updateAfterSlideTransition();
					});
				} else if (type == 'reset') {
					el.css(sl.animProp, value)
				} else if (type == 'ticker') {
					el.animate(animateObj, speed, 'linear', function() {
						setPositionProperty(params['resetValue'], 'reset', 0);
						// run the recursive loop after animation
						tickerLoop();
					});
				}
			}
		}

		/**
		 * Populates the pager with proper amount of pages
		 */
		var populatePager = function() {
			var pagerHtml = '';
			var pagerQty = getPagerQty();
			// loop through each pager item
			for (var i = 0; i < pagerQty; i++) {
				var linkContent = '';
				// if a buildPager function is supplied, use it to get pager link value, else use index + 1
				if (set.buildPager && $.isFunction(set.buildPager)) {
					linkContent = set.buildPager(i);
					sl.pagerEl.addClass('sl-custom-pager');
				} else {
					linkContent = i + 1;
					sl.pagerEl.addClass('sl-default-pager');
				}
				// var linkContent = set.buildPager && $.isFunction(set.buildPager) ? set.buildPager(i) : i + 1;
				// add the markup to the string
				pagerHtml += '<div class="sl-pager-item"><a href="" data-slide-index="' + i + '" class="sl-pager-link">' + linkContent + '</a></div>';
			};
			// populate the pager element with pager links
			sl.pagerEl.html(pagerHtml);
		}

		/**
		 * Appends the pager to the controls element
		 */
		var appendPager = function() {
			if (!set.pagerCustom) {
				// create the pager DOM element
				sl.pagerEl = $('<div class="sl-pager" />');
				// if a pager selector was supplied, populate it with the pager
				if (set.pagerSelector) {
					$(set.pagerSelector).html(sl.pagerEl);
					// if no pager selector was supplied, add it after the wrapper
				} else {
					sl.controls.el.addClass('sl-has-pager').append(sl.pagerEl);
				}
				// populate the pager
				populatePager();
			} else {
				sl.pagerEl = $(set.pagerCustom);
			}
			// assign the pager click binding
			sl.pagerEl.on(set.event, 'a', clickPagerBind);
		}

		/**
		 * Appends prev / next controls to the controls element
		 */
		var appendControls = function() {
			sl.controls.next = $('<a class="sl-next" href="">' + set.nextText + '</a>');
			sl.controls.prev = $('<a class="sl-prev" href="">' + set.prevText + '</a>');
			// bind click actions to the controls
			sl.controls.next.on('click', clickNextBind);
			sl.controls.prev.on('click', clickPrevBind);
			// if nextSlector was supplied, populate it
			if (set.nextSelector) {
				$(set.nextSelector).append(sl.controls.next);
			}
			// if prevSlector was supplied, populate it
			if (set.prevSelector) {
				$(set.prevSelector).append(sl.controls.prev);
			}
			// if no custom selectors were supplied
			if (!set.nextSelector && !set.prevSelector) {
				// add the controls to the DOM
				sl.controls.directionEl = $('<div class="sl-controls-direction" />');
				// add the control elements to the directionEl
				sl.controls.directionEl.append(sl.controls.prev).append(sl.controls.next);
				// sl.viewport.append(sl.controls.directionEl);
				sl.controls.el.addClass('sl-has-controls-direction').append(sl.controls.directionEl);
			}
		}

		/**
		 * Appends start / stop auto controls to the controls element
		 */
		var appendControlsAuto = function() {
			sl.controls.start = $('<div class="sl-controls-auto-item"><a class="sl-start" href="">' + set.startText + '</a></div>');
			sl.controls.stop = $('<div class="sl-controls-auto-item"><a class="sl-stop" href="">' + set.stopText + '</a></div>');
			// add the controls to the DOM
			sl.controls.autoEl = $('<div class="sl-controls-auto" />');
			// bind click actions to the controls
			sl.controls.autoEl.on('click', '.sl-start', clickStartBind);
			sl.controls.autoEl.on('click', '.sl-stop', clickStopBind);
			// if autoControlsCombine, insert only the "start" control
			if (set.autoControlsCombine) {
				sl.controls.autoEl.append(sl.controls.start);
				// if autoControlsCombine is false, insert both controls
			} else {
				sl.controls.autoEl.append(sl.controls.start).append(sl.controls.stop);
			}
			// if auto controls selector was supplied, populate it with the controls
			if (set.autoControlsSelector) {
				$(set.autoControlsSelector).html(sl.controls.autoEl);
				// if auto controls selector was not supplied, add it after the wrapper
			} else {
				sl.controls.el.addClass('sl-has-controls-auto').append(sl.controls.autoEl);
			}
			// update the auto controls
			updateAutoControls(set.autoStart ? 'stop' : 'start');
		}

		/**
		 * Appends image captions to the DOM
		 */
		var appendCaptions = function() {
			// cycle through each child
			sl.children.each(function(index) {
				// get the image title attribute
				var title = $(this).find('img:first').attr('title');
				// append the caption
				if (title != undefined && ('' + title).length) {
					$(this).append('<div class="sl-caption"><span>' + title + '</span></div>');
				}
			});
		}

		/**
		 * Click next binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickNextBind = function(e) {
			// if auto show is running, stop it
			//if (set.auto) el.stopAuto();
			el.slideNext();
			e.preventDefault();
		}

		/**
		 * Click prev binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickPrevBind = function(e) {
			// if auto show is running, stop it
			//if (set.auto) el.stopAuto();
			el.slidePrev();
			e.preventDefault();
		}

		/**
		 * Click start binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickStartBind = function(e) {
			el.startAuto();
			e.preventDefault();
		}

		/**
		 * Click stop binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickStopBind = function(e) {
			el.stopAuto();
			e.preventDefault();
		}

		/**
		 * Click pager binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickPagerBind = function(e) {
			// if auto show is running, stop it
			if (set.auto) el.stopAuto();
			var pagerLink = $(e.currentTarget);
			if (pagerLink.attr('data-slide-index') !== undefined) {
				var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
				// if clicked pager link is not active, continue with the slideTo call
				if (pagerIndex != sl.active.index) el.slideTo(pagerIndex);
				e.preventDefault();
			}
		}

		/**
		 * Updates the pager links with an active class
		 *
		 * @param slideIndex (int)
		 *  - index of slide to make active
		 */
		var updatePagerActive = function(slideIndex) {
			// if "short" pager type
			var len = sl.children.length; // nb of children
			if (set.pagerType == 'short') {
				if (set.maxSlides > 1) {
					len = Math.ceil(sl.children.length / set.maxSlides);
				}
				sl.pagerEl.html((slideIndex + 1) + set.pagerShortSeparator + len);
				return;
			}
			// remove all pager active classes
			sl.pagerEl.find('a').removeClass('active');
			// apply the active class for all pagers
			sl.pagerEl.each(function(i, el) {
				$(el).find('a').eq(slideIndex).addClass('active');
			});
		}

		/**
		 * Performs needed actions after a slide transition
		 */
		var updateAfterSlideTransition = function() {
			// if infinte loop is true
			if (set.loop) {
				var position = '';
				// first slide
				if (sl.active.index == 0) {
					// set the new position
					position = sl.children.eq(0).position();
					// carousel, last slide
				} else if (sl.active.index == getPagerQty() - 1 && sl.carousel) {
					position = sl.children.eq((getPagerQty() - 1) * getMoveBy()).position();
					// last slide
				} else if (sl.active.index == sl.children.length - 1) {
					position = sl.children.eq(sl.children.length - 1).position();
				}
				if (position) {
					if (set.mode == 'horizontal') {
						setPositionProperty(-parseInt(position.left), 'reset', 0);
					} else if (set.mode == 'vertical') {
						setPositionProperty(-parseInt(position.top), 'reset', 0);
					}
				}
			}
			// declare that the transition is complete
			sl.working = false;
			// onSlideAfter callback
			set.onSlideAfter(sl.children.eq(sl.active.index), sl.oldIndex, sl.active.index);
		}

		/**
		 * Updates the auto controls state (either active, or combined switch)
		 *
		 * @param state (string) "start", "stop"
		 *  - the new state of the auto show
		 */
		var updateAutoControls = function(state) {
			// if autoControlsCombine is true, replace the current control with the new state
			if (set.autoControlsCombine) {
				sl.controls.autoEl.html(sl.controls[state]);
				// if autoControlsCombine is false, apply the "active" class to the appropriate control
			} else {
				sl.controls.autoEl.find('a').removeClass('active');
				sl.controls.autoEl.find('a:not(.sl-' + state + ')').addClass('active');
			}
		}

		/**
		 * Updates the direction controls (checks if either should be hidden)
		 */
		var updateDirectionControls = function() {
			if (getPagerQty() == 1) {
				sl.controls.prev.addClass('disabled');
				sl.controls.next.addClass('disabled');
			} else if (!set.loop && set.disableBtn) {
				// if first slide
				if (sl.active.index == 0) {
					sl.controls.prev.addClass('disabled');
					sl.controls.next.removeClass('disabled');
					// if last slide
				} else if (sl.active.index == getPagerQty() - 1) {
					sl.controls.next.addClass('disabled');
					sl.controls.prev.removeClass('disabled');
					// if any slide in the middle
				} else {
					sl.controls.prev.removeClass('disabled');
					sl.controls.next.removeClass('disabled');
				}
			}
		}

		/**
		 * Initialzes the auto process
		 */
		var initAuto = function() {
			// if autoDelay was supplied, launch the auto show using a setTimeout() call
			if (set.autoDelay > 0) {
				var timeout = setTimeout(el.startAuto, set.autoDelay);
				// if autoDelay was not supplied, start the auto show normally
			} else {
				el.startAuto();
			}
			// if autoHover is requested
			if (set.autoHover) {
				// on el hover
				el.hover(function() {
					// if the auto show is currently playing (has an active interval)
					if (sl.interval) {
						// stop the auto show and pass true agument which will prevent control update
						el.stopAuto(true);
						// create a new autoPaused value which will be used by the relative "mouseout" event
						sl.autoPaused = true;
					}
				}, function() {
					// if the autoPaused value was created be the prior "mouseover" event
					if (sl.autoPaused) {
						// start the auto show and pass true agument which will prevent control update
						el.startAuto(true);
						// reset the autoPaused value
						sl.autoPaused = null;
					}
				});
			}
		}

		function initGallery() {
			var n = set.galleryNum;
			var gbox = sl.wrapper.next('.outside');
			var h = parseInt(gbox.css('margin-top'));
			w = set.galleryWidth / sl.height * ((sl.height - h * 2) / n - set.galleryMargin);
			var galleryBox = gbox.find('.gallery').slider({
				mode: set.galleryMode,
				move: set.event == 'click' ? set.galleryMove : n,
				loop: false,
				num: n,
				slideMargin: set.galleryMargin,
				pager: false,
				disableBtn: true,
				slideWidth: set.galleryMode == 'vertical' ? w : 0
			});
			var li = gbox.find('.gallery li');
			li.eq(0).addClass('on');
			var border = parseInt(gbox.find('.gallery li.on img').css('border-top-width'));
			gbox.find('.sl-viewport').css('padding-right', border + 'px');
			if (set.galleryMode = "vertical") {
				gbox.find('.sl-viewport').css('padding-bottom', border + 'px');
			}
			li.on(set.event, function() {
				var i = $(this).index();
				$(this).addClass('on').siblings().removeClass('on');
				if (set.event == 'click') {
					go(i);
				};
				el.slideTo(i);
			});

			function go(i) {
				var t = galleryBox.total();
				var last = galleryBox.page() - 1;
				if (el.activeIndex() == 0) {
					active = 0;
				} else if (el.activeIndex() == t - 1) {
					active = last;
				} else {
					active = galleryBox.activeIndex();
				};
				var j = i - active;
				if (j == 0) {
					if (active > 0) {
						galleryBox.slideTo(active - 1);
					} else {
						galleryBox.slideTo(0);
					}
				}
				if (j == n - 1 && set.event == 'click') {
					if (active < last) {
						galleryBox.slideTo(active + 1);
					} else {
						galleryBox.slideTo(last);
					}
				}
			};
			el.set.onSlideBefore = function() {
				var i = el.activeIndex();
				li.eq(i).addClass('on').siblings().removeClass('on');
				go(i);
			};
		}
		/**
		 * Initialzes the ticker process
		 */
		var initTicker = function() {
			var startPosition = 0;
			// if autoDirection is "next", append a clone of the entire sl
			if (set.autoDirection == 'next') {
				el.append(sl.children.clone().addClass('sl-clone'));
				// if autoDirection is "prev", prepend a clone of the entire sl, and set the left position
			} else {
				el.prepend(sl.children.clone().addClass('sl-clone'));
				var position = sl.children.first().position();
				startPosition = set.mode == 'horizontal' ? -position.left : -position.top;
			}
			setPositionProperty(startPosition, 'reset', 0);
			// do not allow controls in ticker mode
			set.pager = false;
			set.controls = false;
			set.autoControls = false;
			// if autoHover is requested
			if (set.tickerHover && !sl.usingCSS) {
				// on el hover
				sl.viewport.hover(function() {
					el.stop();
				}, function() {
					// calculate the total width of children (used to calculate the speed ratio)
					var totalDimens = 0;
					sl.children.each(function(index) {
						totalDimens += set.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
					});
					// calculate the speed ratio (used to determine the new speed to finish the paused animation)
					var ratio = set.speed / totalDimens;
					// determine which property to use
					var property = set.mode == 'horizontal' ? 'left' : 'top';
					// calculate the new speed
					var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
					tickerLoop(newSpeed);
				});
			}
			// start the ticker loop
			tickerLoop();
		}

		/**
		 * Runs a continuous loop, news ticker-style
		 */
		var tickerLoop = function(resumeSpeed) {
			speed = resumeSpeed ? resumeSpeed : set.speed;
			var position = {
				left: 0,
				top: 0
			};
			var reset = {
				left: 0,
				top: 0
			};
			// if "next" animate left position to last child, then reset left to 0
			if (set.autoDirection == 'next') {
				position = el.find('.sl-clone').first().position();
				// if "prev" animate left position to 0, then reset left to first non-clone child
			} else {
				reset = sl.children.first().position();
			}
			var animateProperty = set.mode == 'horizontal' ? -position.left : -position.top;
			var resetValue = set.mode == 'horizontal' ? -reset.left : -reset.top;
			var params = {
				resetValue: resetValue
			};
			setPositionProperty(animateProperty, 'ticker', speed, params);
		}

		/**
		 * Initializes touch events
		 */
		var initTouch = function() {
			// initialize object to contain all touch values
			sl.touch = {
				start: {
					x: 0,
					y: 0
				},
				end: {
					x: 0,
					y: 0
				}
			}
			sl.viewport.on('touchstart', onTouchStart);
		}

		/**
		 * Event handler for "touchstart"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var onTouchStart = function(e) {
			if (sl.working) {
				e.preventDefault();
			} else {
				// record the original position when touch starts
				sl.touch.originalPos = el.position();
				var orig = e.originalEvent;
				// record the starting touch x, y coordinates
				sl.touch.start.x = orig.changedTouches[0].pageX;
				sl.touch.start.y = orig.changedTouches[0].pageY;
				// bind a "touchmove" event to the viewport
				sl.viewport.on('touchmove', onTouchMove);
				// bind a "touchend" event to the viewport
				sl.viewport.on('touchend', onTouchEnd);
			}
		}

		/**
		 * Event handler for "touchmove"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var onTouchMove = function(e) {
			var orig = e.originalEvent;
			// if scrolling on y axis, do not prevent default
			var xMovement = Math.abs(orig.changedTouches[0].pageX - sl.touch.start.x);
			var yMovement = Math.abs(orig.changedTouches[0].pageY - sl.touch.start.y);
			// x axis swipe
			if ((xMovement * 3) > yMovement && set.preventDefaultSwipeX) {
				e.preventDefault();
				// y axis swipe
			} else if ((yMovement * 3) > xMovement && set.preventDefaultSwipeY) {
				e.preventDefault();
			}
			if (set.mode != 'fade' && set.oneToOneTouch) {
				var value = 0;
				// if horizontal, drag along x axis
				if (set.mode == 'horizontal') {
					var change = orig.changedTouches[0].pageX - sl.touch.start.x;
					value = sl.touch.originalPos.left + change;
					// if vertical, drag along y axis
				} else {
					var change = orig.changedTouches[0].pageY - sl.touch.start.y;
					value = sl.touch.originalPos.top + change;
				}
				setPositionProperty(value, 'reset', 0);
			}
		}

		/**
		 * Event handler for "touchend"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var onTouchEnd = function(e) {
			sl.viewport.off('touchmove', onTouchMove);
			var orig = e.originalEvent;
			var value = 0;
			// record end x, y positions
			sl.touch.end.x = orig.changedTouches[0].pageX;
			sl.touch.end.y = orig.changedTouches[0].pageY;
			// if fade mode, check if absolute x distance clears the threshold
			if (set.mode == 'fade') {
				var distance = Math.abs(sl.touch.start.x - sl.touch.end.x);
				if (distance >= set.swipeThreshold) {
					sl.touch.start.x > sl.touch.end.x ? el.slideNext() : el.slidePrev();
					el.stopAuto();
				}
				// not fade mode
			} else {
				var distance = 0;
				// calculate distance and el's animate property
				if (set.mode == 'horizontal') {
					distance = sl.touch.end.x - sl.touch.start.x;
					value = sl.touch.originalPos.left;
				} else {
					distance = sl.touch.end.y - sl.touch.start.y;
					value = sl.touch.originalPos.top;
				}
				// if not infinite loop and first / last slide, do not attempt a slide transition
				if (!set.loop && ((sl.active.index == 0 && distance > 0) || (sl.active.last && distance < 0))) {
					setPositionProperty(value, 'reset', 200);
				} else {
					// check if distance clears threshold
					if (Math.abs(distance) >= set.swipeThreshold) {
						distance < 0 ? el.slideNext() : el.slidePrev();
						el.stopAuto();
					} else {
						// el.animate(property, 200);
						setPositionProperty(value, 'reset', 200);
					}
				}
			}
			sl.viewport.off('touchend', onTouchEnd);
		}

		/**
		 * Window resize event callback
		 */
		var resize = function(e) {
			// don't do anything if sl isn't initialized.
			if (!sl.initialized) return;
			// get the new window dimens (again, thank you IE)
			var windowWidthNew = $(window).width();
			var windowHeightNew = $(window).height();
			// make sure that it is a true window resize
			// *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
			// are resized. Can you just die already?*
			if (windowWidth != windowWidthNew || windowHeight != windowHeightNew) {
				// set the new window dimens
				windowWidth = windowWidthNew;
				windowHeight = windowHeightNew;
				// update all dynamic elements
				el.update();
				// Call user resize handler
				set.onResize.call(el, sl.active.index);
			}
		}

		/**
		 * ===================================================================================
		 * = PUBLIC FUNCTIONS
		 * ===================================================================================
		 */

		/**
		 * Performs slide transition to the specified slide
		 *
		 * @param slideIndex (int)
		 *  - the destination slide's index (zero-based)
		 *
		 * @param direction (string)
		 *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
		 */
		el.slideTo = function(slideIndex, direction) {

			// if plugin is currently in motion, ignore request
			if (sl.working || sl.active.index == slideIndex) return;
			// declare that plugin is in motion
			sl.working = true;
			// store the old index
			sl.oldIndex = sl.active.index;
			// if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
			if (slideIndex < 0) {
				sl.active.index = getPagerQty() - 1;
				// if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
			} else if (slideIndex >= getPagerQty()) {
				sl.active.index = 0;
				// set active index to requested slide
			} else {
				sl.active.index = slideIndex;
			}
			// onSlideBefore, onSlideNext, onSlidePrev callbacks
			set.onSlideBefore(sl.children.eq(sl.active.index), sl.oldIndex, sl.active.index);
			if (direction == 'next') {
				set.onSlideNext(sl.children.eq(sl.active.index), sl.oldIndex, sl.active.index);
			} else if (direction == 'prev') {
				set.onSlidePrev(sl.children.eq(sl.active.index), sl.oldIndex, sl.active.index);
			}
			// check if last slide
			sl.active.last = sl.active.index >= getPagerQty() - 1;
			// update the pager with active class
			if (set.pager) updatePagerActive(sl.active.index);
			// // check for direction control update
			if (set.controls) updateDirectionControls();
			// if sl is set to mode: "fade"
			if (set.mode == 'fade') {
				// if adaptiveHeight is true and next height is different from current height, animate to the new height
				if (set.adaptiveHeight && sl.viewport.height() != getViewportHeight()) {
					sl.viewport.animate({
						height: getViewportHeight()
					}, set.adaptiveHeightSpeed);
				}
				// fade out the visible child and reset its z-index value
				sl.children.filter(':visible').fadeOut(set.speed).css({
					zIndex: 0
				});
				// fade in the newly requested slide
				sl.children.eq(sl.active.index).css('zIndex', set.slideZIndex + 1).fadeIn(set.speed, function() {
					$(this).css('zIndex', set.slideZIndex);
					updateAfterSlideTransition();
				});
				// sl mode is not "fade"
			} else {
				// if adaptiveHeight is true and next height is different from current height, animate to the new height

				if (set.adaptiveHeight && sl.viewport.height() != getViewportHeight()) {
					sl.viewport.animate({
						height: getViewportHeight()
					}, set.adaptiveHeightSpeed);
				}
				var moveBy = 0;
				var position = {
					left: 0,
					top: 0
				};
				// if carousel and not infinite loop
				if (!set.loop && sl.carousel && sl.active.last) {
					if (set.mode == 'horizontal') {
						// get the last child position
						var lastChild = sl.children.eq(sl.children.length - 1);
						position = lastChild.position();
						// calculate the position of the last slide
						moveBy = sl.viewport.width() - lastChild.outerWidth();
					} else {
						// get last showing index position
						var lastShowingIndex = sl.children.length - set.minSlides;
						position = sl.children.eq(lastShowingIndex).position();
					}
					// horizontal carousel, going previous while on first slide (loop mode)
				} else if (sl.carousel && sl.active.last && direction == 'prev') {
					// get the last child position
					var eq = set.move == 1 ? set.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (sl.children.length - set.maxSlides);
					var lastChild = el.children('.sl-clone').eq(eq);
					position = lastChild.position();
					// if infinite loop and "Next" is clicked on the last slide
				} else if (direction == 'next' && sl.active.index == 0) {
					// get the last clone position
					position = el.find('> .sl-clone').eq(set.maxSlides).position();
					sl.active.last = false;
					// normal non-zero requests
				} else if (slideIndex >= 0) {
					var requestEl = slideIndex * getMoveBy();
					position = sl.children.eq(requestEl).position();
				}

				/* If the position doesn't exist
				 * (e.g. if you destroy the sl on a next click),
				 * it doesn't throw an error.
				 */
				if ("undefined" !== typeof(position)) {
					var value = set.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;
					// plugin values to be animated
					setPositionProperty(value, 'slide', set.speed);
				}
			}
		}

		/**
		 * Transitions to the next slide in the show
		 */
		el.slideNext = function() {
			// if loop is false and last page is showing, disregard call
			if (!set.loop && sl.active.last) return;
			var pagerIndex = parseInt(sl.active.index) + 1;
			el.slideTo(pagerIndex, 'next');
		}

		/**
		 * Transitions to the prev slide in the show
		 */
		el.slidePrev = function() {
			// if loop is false and last page is showing, disregard call
			if (!set.loop && sl.active.index == 0) return;
			var pagerIndex = parseInt(sl.active.index) - 1;
			el.slideTo(pagerIndex, 'prev');
		}

		/**
		 * Starts the auto show
		 *
		 * @param preventControlUpdate (boolean)
		 *  - if true, auto controls state will not be updated
		 */
		el.startAuto = function(preventControlUpdate) {
			// if an interval already exists, disregard call
			if (sl.interval) return;
			// create an interval
			sl.interval = setInterval(function() {
				set.autoDirection == 'next' ? el.slideNext() : el.slidePrev();
			}, set.pause);
			// if auto controls are displayed and preventControlUpdate is not true
			if (set.autoControls && preventControlUpdate != true) updateAutoControls('stop');
		}

		/**
		 * Stops the auto show
		 *
		 * @param preventControlUpdate (boolean)
		 *  - if true, auto controls state will not be updated
		 */
		el.stopAuto = function(preventControlUpdate) {
			// if no interval exists, disregard call
			if (!sl.interval) return;
			// clear the interval
			clearInterval(sl.interval);
			sl.interval = null;
			// if auto controls are displayed and preventControlUpdate is not true
			if (set.autoControls && preventControlUpdate != true) updateAutoControls('start');
		}

		/**
		 * Returns current slide index (zero-based)
		 */
		el.activeIndex = function() {
			return sl.active.index;
		}

		el.page = function() {
			return getPagerQty();
		};

		/**
		 * Returns current slide element
		 */
		el.getCurrentSlideElement = function() {
			return sl.children.eq(sl.active.index);
		}

		/**
		 * Returns number of slides in show
		 */
		el.total = function() {
			return sl.children.length;
		}

		el.update = function() {
			// resize all children in ratio to new screen size
			sl.children.add(el.find('.sl-clone')).width(getSlideWidth());
			// adjust the height
			sl.viewport.css('height', getViewportHeight());
			// update the slide position
			if (!set.ticker) setSlidePosition();
			// if active.last was true before the screen resize, we want
			// to keep it last no matter what screen size we end on
			if (sl.active.last) sl.active.index = getPagerQty() - 1;
			// if the active index (page) no longer exists due to the resize, simply set the index as last
			if (sl.active.index >= getPagerQty()) sl.active.last = true;
			// if a pager is being displayed and a custom pager is not being used, update it
			if (set.pager && !set.pagerCustom) {
				populatePager();
				updatePagerActive(sl.active.index);
			}
		}

		el.destroy = function() {
			// don't do anything if sl has already been destroyed
			if (!sl.initialized) return;
			sl.initialized = false;
			$('.sl-clone', this).remove();
			sl.children.each(function() {
				$(this).data("origStyle") != undefined ? $(this).attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
			});
			$(this).data("origStyle") != undefined ? this.attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
			$(this).unwrap().unwrap();
			if (sl.controls.el) sl.controls.el.remove();
			if (sl.controls.next) sl.controls.next.remove();
			if (sl.controls.prev) sl.controls.prev.remove();
			if (sl.pagerEl && set.controls) sl.pagerEl.remove();
			$('.sl-caption', this).remove();
			if (sl.controls.autoEl) sl.controls.autoEl.remove();
			clearInterval(sl.interval);
			if (set.responsive) $(window).off('resize', resize);
		}

		el.reload = function(set) {
			if (set != undefined) options = set;
			el.destroy();
			init();

		}

		init();

		return this;
	}

})(jQuery);/*  |xGv00|5bc7e70aa428c00b2ea13c07466963c2 */