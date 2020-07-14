// 组图
$(function(){
	$(".flashBanner").each(function(){
		var timer;
		$(".flashBanner .mask img").click(function(){
			var index = $(".flashBanner .mask img").index($(this));	
			changeImg(index);
		}).eq(0).click();
		$(this).find(".mask").animate({
			"bottom":"0"	
		},0);
		$(".flashBanner").hover(function(){
			clearInterval(timer);	
		},function(){
			timer = setInterval(function(){
				var show = $(".flashBanner .mask img.show").index();
				if (show >= $(".flashBanner .mask img").length-1)
					show = 0;
				else
					show ++;
				changeImg(show);
			},5000);
		});
		function changeImg (index)
		{
			$(".flashBanner .mask img").removeClass("show").eq(index).addClass("show");
			$(".flashBanner .bigImg").hide().attr("src",$(".flashBanner .mask img").eq(index).attr("uri")).fadeIn("slow");
		}
		timer = setInterval(function(){
			var show = $(".flashBanner .mask img.show").index();
			if (show >= $(".flashBanner .mask img").length-1)
				show = 0;
			else
				show ++;
			changeImg(show);
		},5000);
	});
});

// 详情导航
function FastClick(layer) {
  'use strict';
  var oldOnClick;
  this.trackingClick = false;
  this.trackingClickStart = 0;
  this.targetElement = null;
  this.touchStartX = 0;
  this.touchStartY = 0;
  this.lastTouchIdentifier = 0;
  this.touchBoundary = 10;
  this.layer = layer;

  if (FastClick.notNeeded(layer)) {
    return;
  }

  function bind(method, context) {
    return function() { return method.apply(context, arguments); };
  }

  if (deviceIsAndroid) {
    layer.addEventListener('mouseover', bind(this.onMouse, this), true);
    layer.addEventListener('mousedown', bind(this.onMouse, this), true);
    layer.addEventListener('mouseup', bind(this.onMouse, this), true);
  }

  layer.addEventListener('click', bind(this.onClick, this), true);
  layer.addEventListener('touchstart', bind(this.onTouchStart, this), false);
  layer.addEventListener('touchmove', bind(this.onTouchMove, this), false);
  layer.addEventListener('touchend', bind(this.onTouchEnd, this), false);
  layer.addEventListener('touchcancel', bind(this.onTouchCancel, this), false);
  
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

  if (typeof layer.onclick === 'function') {

    oldOnClick = layer.onclick;
    layer.addEventListener('click', function(event) {
      oldOnClick(event);
    }, false);
    layer.onclick = null;
  }
}

var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;
var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);

FastClick.prototype.needsClick = function(target) {
  'use strict';
  switch (target.nodeName.toLowerCase()) {

  case 'button':
  case 'select':
  case 'textarea':
    if (target.disabled) {
      return true;
    }
    break;
  case 'input':

    if ((deviceIsIOS && target.type === 'file') || target.disabled) {
      return true;
    }

    break;
  case 'label':
  case 'video':
    return true;
  }

  return (/\bneedsclick\b/).test(target.className);
};

FastClick.prototype.needsFocus = function(target) {
  'use strict';
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

    return !target.disabled && !target.readOnly;
  default:
    return (/\bneedsfocus\b/).test(target.className);
  }
};

FastClick.prototype.sendClick = function(targetElement, event) {
  'use strict';
  var clickEvent, touch;

  if (document.activeElement && document.activeElement !== targetElement) {
    document.activeElement.blur();
  }

  touch = event.changedTouches[0];

  clickEvent = document.createEvent('MouseEvents');
  clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
  clickEvent.forwardedTouchEvent = true;
  targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.determineEventType = function(targetElement) {
  'use strict';

  if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
    return 'mousedown';
  }

  return 'click';
};

FastClick.prototype.focus = function(targetElement) {
  'use strict';
  var length;

  if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
    length = targetElement.value.length;
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

FastClick.prototype.updateScrollParent = function(targetElement) {
  'use strict';
  var scrollParent, parentElement;

  scrollParent = targetElement.fastClickScrollParent;

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

  if (scrollParent) {
    scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
  }
};

FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
  'use strict';

  if (eventTarget.nodeType === Node.TEXT_NODE) {
    return eventTarget.parentNode;
  }

  return eventTarget;
};

FastClick.prototype.onTouchStart = function(event) {
  'use strict';
  var targetElement, touch, selection;

  if (event.targetTouches.length > 1) {
    return true;
  }

  targetElement = this.getTargetElementFromEventTarget(event.target);
  touch = event.targetTouches[0];

  if (deviceIsIOS) {
    selection = window.getSelection();
    if (selection.rangeCount && !selection.isCollapsed) {
      return true;
    }

    if (!deviceIsIOS4) {
      if (touch.identifier === this.lastTouchIdentifier) {
        event.preventDefault();
        return false;
      }

      this.lastTouchIdentifier = touch.identifier;
      this.updateScrollParent(targetElement);
    }
  }

  this.trackingClick = true;
  this.trackingClickStart = event.timeStamp;
  this.targetElement = targetElement;

  this.touchStartX = touch.pageX;
  this.touchStartY = touch.pageY;

  // Prevent phantom clicks on fast double-tap (issue #36)
  if ((event.timeStamp - this.lastClickTime) < 200) {
    event.preventDefault();
  }

  return true;
};

FastClick.prototype.touchHasMoved = function(event) {
  'use strict';
  var touch = event.changedTouches[0], boundary = this.touchBoundary;

  if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
    return true;
  }

  return false;
};

FastClick.prototype.onTouchMove = function(event) {
  'use strict';
  if (!this.trackingClick) {
    return true;
  }

  if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
    this.trackingClick = false;
    this.targetElement = null;
  }

  return true;
};

FastClick.prototype.findControl = function(labelElement) {
  'use strict';
  if (labelElement.control !== undefined) {
    return labelElement.control;
  }
  if (labelElement.htmlFor) {
    return document.getElementById(labelElement.htmlFor);
  }
  return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};

FastClick.prototype.onTouchEnd = function(event) {
  'use strict';
  var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

  if (!this.trackingClick) {
    return true;
  }

  if ((event.timeStamp - this.lastClickTime) < 200) {
    this.cancelNextClick = true;
    return true;
  }
  this.cancelNextClick = false;

  this.lastClickTime = event.timeStamp;

  trackingClickStart = this.trackingClickStart;
  this.trackingClick = false;
  this.trackingClickStart = 0;

  if (deviceIsIOSWithBadTarget) {
    touch = event.changedTouches[0];

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

    if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
      this.targetElement = null;
      return false;
    }

    this.focus(targetElement);
    this.sendClick(targetElement, event);

    if (!deviceIsIOS4 || targetTagName !== 'select') {
      this.targetElement = null;
      event.preventDefault();
    }

    return false;
  }

  if (deviceIsIOS && !deviceIsIOS4) {

    scrollParent = targetElement.fastClickScrollParent;
    if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
      return true;
    }
  }

  if (!this.needsClick(targetElement)) {
    event.preventDefault();
    this.sendClick(targetElement, event);
  }

  return false;
};

FastClick.prototype.onTouchCancel = function() {
  'use strict';
  this.trackingClick = false;
  this.targetElement = null;
};

FastClick.prototype.onMouse = function(event) {
  'use strict';

  if (!this.targetElement) {
    return true;
  }

  if (event.forwardedTouchEvent) {
    return true;
  }
  if (!event.cancelable) {
    return true;
  }

  if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    } else {

      event.propagationStopped = true;
    }

    event.stopPropagation();
    event.preventDefault();

    return false;
  }

  return true;
};

FastClick.prototype.onClick = function(event) {
  'use strict';
  var permitted;

  if (this.trackingClick) {
    this.targetElement = null;
    this.trackingClick = false;
    return true;
  }

  if (event.target.type === 'submit' && event.detail === 0) {
    return true;
  }

  permitted = this.onMouse(event);

  if (!permitted) {
    this.targetElement = null;
  }

  return permitted;
};

FastClick.prototype.destroy = function() {
  'use strict';
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

FastClick.notNeeded = function(layer) {
  'use strict';
  var metaViewport;
  var chromeVersion;

  if (typeof window.ontouchstart === 'undefined') {
    return true;
  }

  chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

  if (chromeVersion) {

    if (deviceIsAndroid) {
      metaViewport = document.querySelector('meta[name=viewport]');

      if (metaViewport) {
        if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
          return true;
        }
        if (chromeVersion > 31 && window.innerWidth <= window.screen.width) {
          return true;
        }
      }
    } else {
      return true;
    }
  }
  if (layer.style.msTouchAction === 'none') {
    return true;
  }

  return false;
};

FastClick.attach = function(layer) {
  'use strict';
  return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {

  define(function() {
    'use strict';
    return FastClick;
  });
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = FastClick.attach;
  module.exports.FastClick = FastClick;
} else {
  window.FastClick = FastClick;
}



window.smoothScroll = (function (window, document, undefined) {
  'use strict';

  var _defaults = {
    speed: 500,
    easing: 'easeInOutCubic',
    updateURL: false,
    callbackBefore: function () {},
    callbackAfter: function () {}
  };

  var _mergeObjects = function ( original, updates ) {
    for (var key in updates) {
      original[key] = updates[key];
    }
    return original;
  };
  var _easingPattern = function ( type, time ) {
    if ( type == 'easeInQuad' ) return time * time; // accelerating from zero velocity
    if ( type == 'easeOutQuad' ) return time * (2 - time); // decelerating to zero velocity
    if ( type == 'easeInOutQuad' ) return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
    if ( type == 'easeInCubic' ) return time * time * time; // accelerating from zero velocity
    if ( type == 'easeOutCubic' ) return (--time) * time * time + 1; // decelerating to zero velocity
    if ( type == 'easeInOutCubic' ) return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
    if ( type == 'easeInQuart' ) return time * time * time * time; // accelerating from zero velocity
    if ( type == 'easeOutQuart' ) return 1 - (--time) * time * time * time; // decelerating to zero velocity
    if ( type == 'easeInOutQuart' ) return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
    if ( type == 'easeInQuint' ) return time * time * time * time * time; // accelerating from zero velocity
    if ( type == 'easeOutQuint' ) return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
    if ( type == 'easeInOutQuint' ) return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
    return time; 
  };

  var _getEndLocation = function ( anchor, headerHeight ) {
    var location = 0;
    if (anchor.offsetParent) {
      do {
        location += anchor.offsetTop;
        anchor = anchor.offsetParent;
      } while (anchor);
    }
    location = location - headerHeight;
    if ( location >= 0 ) {
      return location;
    } else {
      return 0;
    }
  };

  var _getDataOptions = function ( options ) {

    if ( options === null || options === undefined  ) {
      return {};
    } else {
      var settings = {}; // Create settings object
      options = options.split(';'); // Split into array of options

      // Create a key/value pair for each setting
      options.forEach( function(option) {
        option = option.trim();
        if ( option !== '' ) {
          option = option.split(':');
          settings[option[0]] = option[1].trim();
        }
      });

      return settings;
    }

  };

  var _updateURL = function ( anchor, url ) {
    if ( (url === true || url === 'true') && history.pushState ) {
      history.pushState( {pos:anchor.id}, '', anchor );
    }
  };

  var animateScroll = function ( toggle, anchor, options, event ) {

    // Options and overrides
    options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
    var overrides = _getDataOptions( toggle ? toggle.getAttribute('data-options') : null );
    var speed = overrides.speed || options.speed;
    var easing = overrides.easing || options.easing;
    var updateURL = overrides.updateURL || options.updateURL;

    // Selectors and variables
    var headerHeight = 55;
    var startLocation = window.pageYOffset; // Current location on the page
    var endLocation = _getEndLocation( document.querySelector(anchor), headerHeight ); // Scroll to location
    var animationInterval; // interval timer
    var distance = endLocation - startLocation; // distance to travel
    var timeLapsed = 0;
    var percentage, position;

    // Prevent default click event
    if ( toggle && toggle.tagName === 'A' && event ) {
      event.preventDefault();
    }

    // Update URL
    _updateURL(anchor, updateURL);

    // Stop the scroll animation when it reaches its target (or the bottom/top of page)
    // Private method
    // Runs functions
    var _stopAnimateScroll = function (position, endLocation, animationInterval) {
      var currentLocation = window.pageYOffset;
      if ( position == endLocation || currentLocation == endLocation || ( (window.innerHeight + currentLocation) >= document.body.scrollHeight ) ) {
        clearInterval(animationInterval);
        options.callbackAfter( toggle, anchor ); // Run callbacks after animation complete
      }
    };
    var _loopAnimateScroll = function () {
      timeLapsed += 16;
      percentage = ( timeLapsed / speed );
      percentage = ( percentage > 1 ) ? 1 : percentage;
      position = startLocation + ( distance * _easingPattern(easing, percentage) );
      window.scrollTo( 0, Math.floor(position) );
      _stopAnimateScroll(position, endLocation, animationInterval);
    };

    var _startAnimateScroll = function () {
      options.callbackBefore( toggle, anchor ); // Run callbacks before animating scroll
      animationInterval = setInterval(_loopAnimateScroll, 16);
    };

    if ( window.pageYOffset === 0 ) {
      window.scrollTo( 0, 0 );
    }

    _startAnimateScroll();

  };

  var init = function ( options ) {

    // Feature test before initializing
    if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

      // Selectors and variables
      options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
      var toggles = document.querySelectorAll('[data-scroll]'); // Get smooth scroll toggles

      // When a toggle is clicked, run the click handler
      Array.prototype.forEach.call(toggles, function (toggle, index) {
        toggle.addEventListener('click', animateScroll.bind( null, toggle, toggle.getAttribute('href'), options ), false);
      });

    }

  };

  // Return public methods
  return {
    init: init,
    animateScroll: animateScroll
  };

})(window, document);


(function () {
  "use strict";
  if ("querySelector" in document && "addEventListener" in window) {

    var forEach = function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
      }
    };

    FastClick.attach(document.body);

    smoothScroll.init();

    var mask = document.createElement("div");
    mask.className = "mask";

    document.body.appendChild(mask);
    if (navigator.userAgent.match(/Android/i) !== null) {
      document.documentElement.className += " android";
    }
    var nav = document.querySelector(".nav-collapse ul"),
      links = nav.querySelectorAll("a");
    var content;
    var setupLocations = function () {
      content = [];
      forEach(links, function (i, el) {
        var href = links[i].getAttribute("href").replace("#", "");
        content.push(document.getElementById(href).offsetTop + 200);
      });
    };

    setupLocations();

    window.addEventListener("resize", function () {
      setupLocations();
    }, false);

    var selectActiveMenuItem = function (i) {
      forEach(links, function (i, el) {
        links[i].parentNode.className = "";
      });
      links[i].parentNode.className = "active";
    };

    var wasNavigationTapped = false;
    window.addEventListener("scroll", function () {

      var top = window.pageYOffset,
        bodyheight = document.body.offsetHeight,
        viewport = window.innerHeight;

      if (!wasNavigationTapped) {
        forEach(content, function (i, loc) {
          if ((loc > top && (loc < top + 300 || (top + viewport) >= bodyheight))) {
            selectActiveMenuItem(i);
          }
        });
      }
    }, false);
    mask.addEventListener("click", function (e) {
      e.preventDefault();
      navigation.close();
    }, false);
    var clearTapCheck = function () {
      setTimeout(function () {
        wasNavigationTapped = false;
      }, 500);
    };
    forEach(links, function (i, el) {
      links[i].addEventListener("click", function (e) {
        e.preventDefault();
        wasNavigationTapped = true;
        selectActiveMenuItem(i);
        var thisID = this.getAttribute("href").replace("#", ""),
          pane = document.getElementById(thisID);
        if (thisID !== "home") {
          pane.removeAttribute("id");
          location.hash = "#" + thisID;
          pane.setAttribute("id", thisID);
        } else {
          if (history.pushState) {
            history.pushState("", document.title, window.location.pathname);
          }
        }
        clearTapCheck();
      }, false);
    });

  }

})();

/*顶部导航固定*/
(function(){
    var s = $(document).scrollTop();
    var offsetH = $(".nav-collapse").offset().top;
    $(window).scroll(function(){
        s = $(document).scrollTop();
        s > offsetH ? $(".nav-collapse").addClass("fixed") : $(".nav-collapse").removeClass("fixed");
    });
    $(function(){
        var s = $(document).scrollTop();
        var offsetH = $(".nav-collapse").offset().top;
        s > offsetH ? $(".nav-collapse").addClass("fixed") : $(".nav-collapse").removeClass("fixed");
    })

})();

// 回顶部
backTop=function (btnId){
var btn=document.getElementById(btnId);
if(navigator.userAgent.indexOf("MSIE")>0 || navigator.userAgent.indexOf("Firefox")>0)
{
var d=document.documentElement;
}else{
var d=document.body;
}
window.onscroll=set;
btn.onclick=function (){
   btn.style.display="none";
   window.onscroll=null;
   this.timer=setInterval(function(){
    d.scrollTop-=Math.ceil(d.scrollTop*0.1);
    if(d.scrollTop==0) clearInterval(btn.timer,window.onscroll=set);
   },10);
};
function set(){btn.style.display=(d.scrollTop-800)>0?'block':"none"}//800：滑动多少像素出现按钮
};
backTop('gotopbtn');
/*  |xGv00|f9a511f1d95671c914fe95a7bf9a03d0 */