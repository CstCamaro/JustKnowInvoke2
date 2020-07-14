define(function(require, exports, module) {
	exports = function() {

		var fixed_menu = true;
		window.jQuery = window.$ = jQuery;
		/*All JS Plugins and Scripts*/

		/* *** jquery.easing.1.3.js *** */
		/*
		 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
		 *
		 * Uses the built in easing capabilities added In jQuery 1.1
		 * to offer multiple easing options
		 *
		 * TERMS OF USE - jQuery Easing
		 * 
		 * Open source under the BSD License. 
		 * 
		 * Copyright ? 2008 George McGinley Smith
		 * All rights reserved.
		 * 
		 * Redistribution and use in source and binary forms, with or without modification, 
		 * are permitted provided that the following conditions are met:
		 * 
		 * Redistributions of source code must retain the above copyright notice, this list of 
		 * conditions and the following disclaimer.
		 * Redistributions in binary form must reproduce the above copyright notice, this list 
		 * of conditions and the following disclaimer in the documentation and/or other materials 
		 * provided with the distribution.
		 * 
		 * Neither the name of the author nor the names of contributors may be used to endorse 
		 * or promote products derived from this software without specific prior written permission.
		 * 
		 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
		 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
		 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
		 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
		 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
		 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
		 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
		 * OF THE POSSIBILITY OF SUCH DAMAGE. 
		 *
		*/

		// t: current time, b: begInnIng value, c: change In value, d: duration
		jQuery.easing['jswing'] = jQuery.easing['swing'];

		jQuery.extend( jQuery.easing,
		{
			def: 'easeOutQuad',
			swing: function (x, t, b, c, d) {
				//alert(jQuery.easing.default);
				return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
			},
			easeInQuad: function (x, t, b, c, d) {
				return c*(t/=d)*t + b;
			},
			easeOutQuad: function (x, t, b, c, d) {
				return -c *(t/=d)*(t-2) + b;
			},
			easeInOutQuad: function (x, t, b, c, d) {
				if ((t/=d/2) < 1) return c/2*t*t + b;
				return -c/2 * ((--t)*(t-2) - 1) + b;
			},
			easeInCubic: function (x, t, b, c, d) {
				return c*(t/=d)*t*t + b;
			},
			easeOutCubic: function (x, t, b, c, d) {
				return c*((t=t/d-1)*t*t + 1) + b;
			},
			easeInOutCubic: function (x, t, b, c, d) {
				if ((t/=d/2) < 1) return c/2*t*t*t + b;
				return c/2*((t-=2)*t*t + 2) + b;
			},
			easeInQuart: function (x, t, b, c, d) {
				return c*(t/=d)*t*t*t + b;
			},
			easeOutQuart: function (x, t, b, c, d) {
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			easeInOutQuart: function (x, t, b, c, d) {
				if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
				return -c/2 * ((t-=2)*t*t*t - 2) + b;
			},
			easeInQuint: function (x, t, b, c, d) {
				return c*(t/=d)*t*t*t*t + b;
			},
			easeOutQuint: function (x, t, b, c, d) {
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			easeInOutQuint: function (x, t, b, c, d) {
				if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			},
			easeInSine: function (x, t, b, c, d) {
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			},
			easeOutSine: function (x, t, b, c, d) {
				return c * Math.sin(t/d * (Math.PI/2)) + b;
			},
			easeInOutSine: function (x, t, b, c, d) {
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
			},
			easeInExpo: function (x, t, b, c, d) {
				return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
			},
			easeOutExpo: function (x, t, b, c, d) {
				return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			},
			easeInOutExpo: function (x, t, b, c, d) {
				if (t==0) return b;
				if (t==d) return b+c;
				if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
				return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
			},
			easeInCirc: function (x, t, b, c, d) {
				return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
			},
			easeOutCirc: function (x, t, b, c, d) {
				return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
			},
			easeInOutCirc: function (x, t, b, c, d) {
				if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
				return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
			},
			easeInElastic: function (x, t, b, c, d) {
				var s=1.70158;var p=0;var a=c;
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			},
			easeOutElastic: function (x, t, b, c, d) {
				var s=1.70158;var p=0;var a=c;
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
			},
			easeInOutElastic: function (x, t, b, c, d) {
				var s=1.70158;var p=0;var a=c;
				if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
				if (a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
			},
			easeInBack: function (x, t, b, c, d, s) {
				if (s == undefined) s = 1.70158;
				return c*(t/=d)*t*((s+1)*t - s) + b;
			},
			easeOutBack: function (x, t, b, c, d, s) {
				if (s == undefined) s = 1.70158;
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			},
			easeInOutBack: function (x, t, b, c, d, s) {
				if (s == undefined) s = 1.70158; 
				if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
			},
			easeInBounce: function (x, t, b, c, d) {
				return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
			},
			easeOutBounce: function (x, t, b, c, d) {
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
				} else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
				} else {
					return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
				}
			},
			easeInOutBounce: function (x, t, b, c, d) {
				if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
				return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
			}
		});

		/*
		 *
		 * TERMS OF USE - EASING EQUATIONS
		 * 
		 * Open source under the BSD License. 
		 * 
		 * Copyright ? 2001 Robert Penner
		 * All rights reserved.
		 * 
		 * Redistribution and use in source and binary forms, with or without modification, 
		 * are permitted provided that the following conditions are met:
		 * 
		 * Redistributions of source code must retain the above copyright notice, this list of 
		 * conditions and the following disclaimer.
		 * Redistributions in binary form must reproduce the above copyright notice, this list 
		 * of conditions and the following disclaimer in the documentation and/or other materials 
		 * provided with the distribution.
		 * 
		 * Neither the name of the author nor the names of contributors may be used to endorse 
		 * or promote products derived from this software without specific prior written permission.
		 * 
		 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
		 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
		 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
		 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
		 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
		 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
		 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
		 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
		 * OF THE POSSIBILITY OF SUCH DAMAGE. 
		 *
		 */
		 
		/*
		jQuery Waypoints - v2.0.2
		Copyright (c) 2011-2013 Caleb Troughton
		Dual licensed under the MIT license and GPL license.
		https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
		*/
		(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(window);
		 
		/* *** jquery.carousel.min *** */
		/* jQuery Carousel 0.9.8
		Copyright 2010 Thomas Lanciaux and Pierre Bertet.
		This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
		*/
		;(function($){
			
			$.fn.carousel = function(params){
				
				var params = $.extend({
					direction: "horizontal",
					loop: false,
					dispItems: 1,
					pagination: false,
					paginationPosition: "inside",
					nextBtn: '<input type="button" value="" />',
					prevBtn: '<input type="button" value="" />',
					btnsPosition: "inside",
					nextBtnInsert: "insertAfter",
					prevBtnInsert: "insertBefore",
					nextBtnInsertFn: false,
					prevBtnInsertFn: false,
					autoSlide: false,
					autoSlideInterval: 3000,
					delayAutoSlide: false,
					combinedClasses: false,
					effect: "slide",
					slideEasing: "swing",
					animSpeed: 300,
					equalWidths: "true",
					verticalMargin: 0,
					callback: function () {}, 
					useAddress: false,
					adressIdentifier: "carousel",
					tabLabel: function (tabNum) { return tabNum; },
					showEmptyItems: true,
					ajaxMode:false,
					ajaxUrl:"",
					stopSlideBtn: false,
					stopSlideTextPause: "Pause",
					stopSlideTextPlay: "Play"
				}, params);
				
				// Buttons position
				if (params.btnsPosition == "outside"){
					params.prevBtnInsert = "insertBefore";
					params.nextBtnInsert = "insertAfter";
				}
				
				// Slide delay
				params.delayAutoSlide = 0 + params.delayAutoSlide;
				
				return this.each(function(){
					
					// Env object
					var env = {
						$elts: {},
						params: params,
						launchOnLoad: []
					};
							
					// Carousel main container
					env.$elts.carousel = $(this).addClass("js");
					
					// Carousel content
					env.$elts.content = $(this).children().css({position: "static", "top": 0});
					
					// Content wrapper
					env.$elts.wrap = env.$elts.content.wrap('<div class="carousel-wrap"></div>').parent().css({overflow: "hidden", position: "relative"});
					env.$elts.content.wrap('<div class="margin-fixer"></div>');
					
					// env.steps object
					env.steps = {
						first: 0, // First step
						count: env.$elts.content.children().length // Items count
					};
					
					// Loader 
					env.$elts.loader = $('<div class="loader"></div>').css({'position':'absolute'});
					
					// Last visible step
					env.steps.last = env.steps.count - 1;
					
					// Pagination
					if (env.params.pagination) {
						initPagination(env);
					}
					
					// Prev Button
					if ($.isFunction(env.params.prevBtnInsertFn)) {
						env.$elts.prevBtn = env.params.prevBtnInsertFn(env.$elts);
					} else { 
						if (params.btnsPosition == "outside"){
							env.$elts.prevBtn = $(params.prevBtn)[params.prevBtnInsert](env.$elts.carousel);
						} else {
							env.$elts.prevBtn = $(params.prevBtn)[params.prevBtnInsert](env.$elts.wrap);
						}
					}
					
					// Next Button
					if ($.isFunction(env.params.nextBtnInsertFn)) {
						env.$elts.nextBtn = env.params.nextBtnInsertFn(env.$elts);
					} else {
						if (params.btnsPosition == "outside"){
							env.$elts.nextBtn = $(params.nextBtn)[params.nextBtnInsert](env.$elts.carousel);
						} else {
							env.$elts.nextBtn = $(params.nextBtn)[params.nextBtnInsert](env.$elts.wrap);
						}
					}
					
					// Add buttons classes / data
					env.$elts.nextBtn.addClass("carousel-control next carousel-next");
					env.$elts.prevBtn.addClass("carousel-control previous carousel-previous");
					
					// Last items to load in ajaxMode var
					env.lastItemsToLoad;
					
					// Bind events on next / prev buttons
					initButtonsEvents(env);
					
					// Bind events on focus for keyboard control
					env.$elts.carousel.attr('tabindex',0).add(env.$elts.carousel.children()).bind({
						focus : function(e){
							$(document).bind('keypress', function(e){
								switch (e.keyCode) {
									case 39 : env.$elts.nextBtn.click(); break;
									case 37 : env.$elts.prevBtn.click(); break;
								}
								switch (e.charCode) {
									case 110 : env.$elts.nextBtn.click(); break;
									case 112 : env.$elts.prevBtn.click(); break;
								}
							});
						}, 
						blur : function(){
							$(document).unbind('keypress');
						}
					});
					
					// Address plugin
					initAddress(env);
					
					// On document load...
					$(function(){
						
						// Launch carousel initialization
						initCarousel(env);
						
						// Launch function added to "document ready" event
						$.each(env.launchOnLoad, function(i,fn){
							fn();
						});
						
						// Launch autoslide
						if (env.params.autoSlide){
							initAutoSlide(env);
						}
						
						// Control Slide Button
						if(params.stopSlideBtn == true){
							env.$elts.stopSlideBtn = $('<button type="button" class="slide-control play">'+params.stopSlideTextPause+'</button>');
							createBtnStopAutoslide(env);
						}
						
					});
					
				});
				
			};
			
			// Init carousel dimensions
			function initCarousel(env){
				//Set max Height with the highest element
				var $items = env.$elts.content.children();
				var $maxHeight = 0;
				
				$items.each(function () {
					$item = $(this);
					$itemHeight = $item.outerHeight();
					if ($itemHeight > $maxHeight) {
						$maxHeight = $itemHeight;
					}
				});
				if (env.params.verticalMargin > 0) {
					$maxHeight = $maxHeight + env.params.verticalMargin;
				}
				
				$items.height($maxHeight);
				// First item
				var $firstItem = env.$elts.content.children(":first");
				
				// Width 1/1 : Get default item width
				env.itemWidth = $firstItem.outerWidth();
				
				// Width 2/3 : Define content width
				if (env.params.direction == "vertical"){
					env.contentWidth = env.itemWidth;
					
				} else {
					
					if (env.params.equalWidths) {
						env.contentWidth = env.itemWidth * env.steps.count;
						
					} else {
						env.contentWidth = (function(){
								var totalWidth = 0;
								
								env.$elts.content.children().each(function(){
									totalWidth += $(this).outerWidth();
								});
								
								return totalWidth;
							})();
					}
				}
				
				// Width 3/3 : Set content width to container
				env.$elts.content.width(env.contentWidth);
				
				// Height 1/2 : Get default item height
				env.itemHeight = $maxHeight;
				
				// Height 2/2 : Set content height to container
				if (env.params.direction == "vertical") {
					env.$elts.content.css({
						height: env.itemHeight * env.steps.count + "px"
					});
					env.$elts.content.parent().css({
						height: env.itemHeight * env.params.dispItems + "px"
					});
				} else {
					env.$elts.content.parent().css({
						height: env.itemHeight + "px"
					});
				}
				
				// Update Next / Prev buttons state
				updateButtonsState(env);
			}
			
			// Next / Prev buttons events only
			function initButtonsEvents(env){
			
				env.$elts.nextBtn.add(env.$elts.prevBtn)
					
					.bind("enable", function(){
						
						var $this = $(this)
							.unbind("click")
							.bind("click", function(){
								// Ajax init
								if(env.params.ajaxMode && $this.is('.next') && getActivePageIndex(env) == (getPageTotal(env)-1) && !env.lastItemsToLoad) {
									// Append content in ajax
									ajaxLoad(env);
									// Go to next page of the carousel
									env.$elts.content.ajaxSuccess(function() {
																	
									});
								}else{							
									goToStep( env, getRelativeStep(env, ($this.is(".next")? "next" : "prev" )) );
									
									if(env.params.stopSlideBtn == true){
										env.$elts.stopSlideBtn.trigger('pause');
									} else {
										stopAutoSlide(env);
									}
								}						
							})
							.removeClass("disabled").removeAttr('disabled');
						
						// Combined classes (IE6 compatibility)
						if (env.params.combinedClasses) {
							$this.removeClass("next-disabled previous-disabled").removeAttr("disabled");
						}
					})
					.bind("disable", function(){
						
						var $this = $(this).unbind("click").addClass("disabled").attr("disabled","disabled");
						
						// Combined classes (IE6 compatibility)
						if (env.params.combinedClasses) {
							
							if ($this.is(".next")) {
								$this.addClass("next-disabled");
								
							} else if ($this.is(".previous")) {
								$this.addClass("previous-disabled");
								
							}
						}
					})
					.hover(function(){
						$(this).toggleClass("hover");
					});
			};
			
			// Pagination
			function initPagination(env) {
					env.$elts.pagination = $('<div class="center-wrap"><div class="carousel-pagination"><p></p></div></div>')[((env.params.paginationPosition == "outside") ? "insertAfter" : "appendTo")](env.$elts.carousel).find("p");
					env.$elts.paginationBtns = $([]);

					env.$elts.content.find("li").each(function (i) {
						if (i % env.params.dispItems == 0) {
							addPage(env, i);
						}
					});
			};
			
			// Add a page in pagintion (@ the end)
			function addPage(env, firststep) {
				if(env.params.pagination){
					env.$elts.paginationBtns = env.$elts.paginationBtns.add($('<a role="button"><span>' + env.params.tabLabel(env.$elts.paginationBtns.length + 1) + '</span></a>').data("firstStep", firststep))
					.appendTo(env.$elts.pagination);
					env.$elts.paginationBtns.slice(0, 1).addClass("active");
					env.$elts.paginationBtns.click(function (e) {
						goToStep(env, $(this).data("firstStep"));
						if(env.params.stopSlideBtn == true){
							env.$elts.stopSlideBtn.trigger('pause');
						} else {
							stopAutoSlide(env);
						}
					});
				}
			}
			
			// Address plugin
			function initAddress(env) {
				
				if (env.params.useAddress && $.isFunction($.fn.address)) {
					
					$.address
						.init(function(e) {
							var pathNames = $.address.pathNames();
							if (pathNames[0] === env.params.adressIdentifier && !!pathNames[1]) {
								goToStep(env, pathNames[1]-1);
							} else {
								$.address.value('/'+ env.params.adressIdentifier +'/1');
							}
						})
						.change(function(e) {
							var pathNames = $.address.pathNames();
							if (pathNames[0] === env.params.adressIdentifier && !!pathNames[1]) {
								goToStep(env, pathNames[1]-1);
							}
						});
				} else {
					env.params.useAddress = false;
				}
			};
			
			function goToStep(env, step) {
				
				// Callback
				env.params.callback(step);
				
				// Launch animation
				transition(env, step);
				
				// Update first step
				env.steps.first = step;
				
				// Update buttons status
				updateButtonsState(env);
				
				// Update address (jQuery Address plugin)
				if ( env.params.useAddress ) {
					$.address.value('/'+ env.params.adressIdentifier +'/' + (step + 1));
				}
				
			};
			
			// Get next/prev step, useful for autoSlide
			function getRelativeStep(env, position) {
				if (position == "prev") {
					if (!env.params.showEmptyItems) {
						if (env.steps.first == 0) {
							return ((env.params.loop) ? (env.steps.count - env.params.dispItems) : false);
						} else {
							return Math.max(0, env.steps.first - env.params.dispItems);
						}
					} else {
						if ((env.steps.first - env.params.dispItems) >= 0) {
							return env.steps.first - env.params.dispItems;
						} else {
							return ((env.params.loop) ? (env.steps.count - env.params.dispItems) : false);
						}
					}
				} else if (position == "next") {
					if ((env.steps.first + env.params.dispItems) < env.steps.count) {
						if (!env.params.showEmptyItems) {
							return Math.min(env.steps.first + env.params.dispItems, env.steps.count - env.params.dispItems);
						} else {
							return env.steps.first + env.params.dispItems;
						}
					} else {
						return ((env.params.loop) ? 0 : false);
					}
				}
			};
			
			// Animation
			function transition(env, step) {
				
				// Effect
				switch (env.params.effect){
					
					// No effect
					case "no":
						if (env.params.direction == "vertical"){
							env.$elts.content.css("top", -(env.itemHeight * step) + "px");
						} else {
							env.$elts.content.css("left", -(env.itemWidth * step) + "px");
						}
						break;
					
					// Fade effect
					case "fade":
						if (env.params.direction == "vertical"){
							env.$elts.content.hide().css("top", -(env.itemHeight * step) + "px").fadeIn(env.params.animSpeed);
						} else {
							env.$elts.content.hide().css("margin-left", -(env.itemWidth * step) + "px").fadeIn(env.params.animSpeed);
						}
						break;
					
					// Slide effect
					default:
						if (env.params.direction == "vertical"){
							env.$elts.content.stop().animate({
								top : -(env.itemHeight * step) + "px"
							}, env.params.animSpeed, env.params.slideEasing);
						} else {
							env.$elts.content.stop().animate({
								'margin-left' : -(env.itemWidth * step) + "px"
							}, env.params.animSpeed, env.params.slideEasing);
						}
						break;
				}
				
			};
			
			// Update all buttons state : disabled or not
			function updateButtonsState(env){
				
				if (getRelativeStep(env, "prev") !== false) {
					env.$elts.prevBtn.trigger("enable");
					
				} else {
					env.$elts.prevBtn.trigger("disable");
				}
				
				if (getRelativeStep(env, "next") !== false) {
					env.$elts.nextBtn.trigger("enable");
					
				} else {
					env.$elts.nextBtn.trigger("disable");
				}
				
				if (env.params.pagination){
					env.$elts.paginationBtns.removeClass("active")
					.filter(function(){ 			
						return ($(this).data("firstStep") == env.steps.first) 
					})
					.addClass("active");
				}
			};	
			
			// Launch Autoslide
			function initAutoSlide(env) {
				env.delayAutoSlide = window.setTimeout(function(){
					env.autoSlideInterval = window.setInterval(function(){
						goToStep( env, getRelativeStep(env, "next") );
					}, env.params.autoSlideInterval);
				}, env.params.delayAutoSlide);
			};
			
			// Stop autoslide
			function stopAutoSlide(env) {
				window.clearTimeout(env.delayAutoSlide);
				window.clearInterval(env.autoSlideInterval);
				env.params.delayAutoSlide = 0;
			};
			
			// Create button "stop autoslide"
			function createBtnStopAutoslide(env){
				var jButton = env.$elts.stopSlideBtn;
				
				jButton.bind({
					'play' : function(){
						initAutoSlide(env);
						jButton.removeClass('pause').addClass('play').html(env.params.stopSlideTextPause);
					}, 
					'pause' : function(){
						stopAutoSlide(env);
						jButton.removeClass('play').addClass('pause').html(env.params.stopSlideTextPlay);
					}
				});
				
				jButton.click(function(e){
					if(jButton.is('.play')){
						jButton.trigger('pause');
					} else if (jButton.is('.pause')){
						jButton.trigger('play');
					}
				});
				
				jButton.prependTo(env.$elts.wrap);
			};
			
			// Get total number of page in the carousel
			function getPageTotal(env) {
				return env.$elts.pagination.children().length;
			};
			
			function getActivePageIndex(env){
				return env.steps.first/env.params.dispItems;
			}
			
			// Load next page via Ajax
			function ajaxLoad(env) {
				// insert loader
				env.$elts.carousel.prepend(env.$elts.loader);
				
				// ajax call				
				$.ajax({
					url: env.params.ajaxUrl,
					dataType: 'json',
					success: function(data) {
						// set if the last item of the carousel have been loaded and add items to the carousel
						env.lastItemsToLoad = data.bLastItemsToLoad;
						$(env.$elts.content).append(data.shtml);
						
						// reinit count (number of items have changed after ajax call)
						env.steps = {
							first: env.steps.first + env.params.dispItems,
							count: env.$elts.content.children().length
						};
						env.steps.last = env.steps.count - 1;
						
						// rewrite carousel dimensions
						initCarousel(env);
						// rewrite/append pagination
						addPage(env,env.steps.first);
						
						// slide to next page
						goToStep( env, env.steps.first );
						if(env.params.stopSlideBtn == true){
							env.$elts.stopSlideBtn.trigger('pause');
						} else {
							stopAutoSlide(env);
						}
						
						// remove loader
						env.$elts.loader.remove();
					}
				});		
			}
			
		})(jQuery);


		/* *** jquery.prettyPhoto.js *** */
		/* ------------------------------------------------------------------------
			Class: prettyPhoto
			Use: Lightbox clone for jQuery
			Author: Stephane Caron (http://www.no-margin-for-errors.com)
			Version: 3.1.5
		------------------------------------------------------------------------- */
		(function(e){function t(){var e=location.href;hashtag=e.indexOf("#prettyPhoto")!==-1?decodeURI(e.substring(e.indexOf("#prettyPhoto")+1,e.length)):false;return hashtag}function n(){if(typeof theRel=="undefined")return;location.hash=theRel+"/"+rel_index+"/"}function r(){if(location.href.indexOf("#prettyPhoto")!==-1)location.hash="prettyPhoto"}function i(e,t){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n="[\\?&]"+e+"=([^&#]*)";var r=new RegExp(n);var i=r.exec(t);return i==null?"":i[1]}e.prettyPhoto={version:"3.1.5"};e.fn.prettyPhoto=function(s){function g(){e(".pp_loaderIcon").hide();projectedTop=scroll_pos["scrollTop"]+(d/2-a["containerHeight"]/2);if(projectedTop<0)projectedTop=0;$ppt.fadeTo(settings.animation_speed,1);$pp_pic_holder.find(".pp_content").animate({height:a["contentHeight"],width:a["contentWidth"]},settings.animation_speed);$pp_pic_holder.animate({top:projectedTop,left:v/2-a["containerWidth"]/2<0?0:v/2-a["containerWidth"]/2,width:a["containerWidth"]},settings.animation_speed,function(){$pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(a["height"]).width(a["width"]);$pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed);if(isSet&&S(pp_images[set_position])=="image"){$pp_pic_holder.find(".pp_hoverContainer").show()}else{$pp_pic_holder.find(".pp_hoverContainer").hide()}if(settings.allow_expand){if(a["resized"]){e("a.pp_expand,a.pp_contract").show()}else{e("a.pp_expand").hide()}}if(settings.autoplay_slideshow&&!m&&!f)e.prettyPhoto.startSlideshow();settings.changepicturecallback();f=true});C();s.ajaxcallback()}function y(t){$pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility","hidden");$pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed,function(){e(".pp_loaderIcon").show();t()})}function b(t){t>1?e(".pp_nav").show():e(".pp_nav").hide()}function w(e,t){resized=false;E(e,t);imageWidth=e,imageHeight=t;if((p>v||h>d)&&doresize&&settings.allow_resize&&!u){resized=true,fitting=false;while(!fitting){if(p>v){imageWidth=v-200;imageHeight=t/e*imageWidth}else if(h>d){imageHeight=d-200;imageWidth=e/t*imageHeight}else{fitting=true}h=imageHeight,p=imageWidth}if(p>v||h>d){w(p,h)}E(imageWidth,imageHeight)}return{width:Math.floor(imageWidth),height:Math.floor(imageHeight),containerHeight:Math.floor(h),containerWidth:Math.floor(p)+settings.horizontal_padding*2,contentHeight:Math.floor(l),contentWidth:Math.floor(c),resized:resized}}function E(t,n){t=parseFloat(t);n=parseFloat(n);$pp_details=$pp_pic_holder.find(".pp_details");$pp_details.width(t);detailsHeight=parseFloat($pp_details.css("marginTop"))+parseFloat($pp_details.css("marginBottom"));$pp_details=$pp_details.clone().addClass(settings.theme).width(t).appendTo(e("body")).css({position:"absolute",top:-1e4});detailsHeight+=$pp_details.height();detailsHeight=detailsHeight<=34?36:detailsHeight;$pp_details.remove();$pp_title=$pp_pic_holder.find(".ppt");$pp_title.width(t);titleHeight=parseFloat($pp_title.css("marginTop"))+parseFloat($pp_title.css("marginBottom"));$pp_title=$pp_title.clone().appendTo(e("body")).css({position:"absolute",top:-1e4});titleHeight+=$pp_title.height();$pp_title.remove();l=n+detailsHeight;c=t;h=l+titleHeight+$pp_pic_holder.find(".pp_top").height()+$pp_pic_holder.find(".pp_bottom").height();p=t}function S(e){if(e.match(/youtube\.com\/watch/i)||e.match(/youtu\.be/i)){return"youtube"}else if(e.match(/vimeo\.com/i)){return"vimeo"}else if(e.match(/\b.mov\b/i)){return"quicktime"}else if(e.match(/\b.swf\b/i)){return"flash"}else if(e.match(/\biframe=true\b/i)){return"iframe"}else if(e.match(/\bajax=true\b/i)){return"ajax"}else if(e.match(/\bcustom=true\b/i)){return"custom"}else if(e.substr(0,1)=="#"){return"inline"}else{return"image"}}function x(){if(doresize&&typeof $pp_pic_holder!="undefined"){scroll_pos=T();contentHeight=$pp_pic_holder.height(),contentwidth=$pp_pic_holder.width();projectedTop=d/2+scroll_pos["scrollTop"]-contentHeight/2;if(projectedTop<0)projectedTop=0;if(contentHeight>d)return;$pp_pic_holder.css({top:projectedTop,left:v/2+scroll_pos["scrollLeft"]-contentwidth/2})}}function T(){if(self.pageYOffset){return{scrollTop:self.pageYOffset,scrollLeft:self.pageXOffset}}else if(document.documentElement&&document.documentElement.scrollTop){return{scrollTop:document.documentElement.scrollTop,scrollLeft:document.documentElement.scrollLeft}}else if(document.body){return{scrollTop:document.body.scrollTop,scrollLeft:document.body.scrollLeft}}}function N(){d=e(window).height(),v=e(window).width();if(typeof $pp_overlay!="undefined")$pp_overlay.height(e(document).height()).width(v)}function C(){if(isSet&&settings.overlay_gallery&&S(pp_images[set_position])=="image"){itemWidth=52+5;navWidth=settings.theme=="facebook"||settings.theme=="pp_default"?50:30;itemsPerPage=Math.floor((a["containerWidth"]-100-navWidth)/itemWidth);itemsPerPage=itemsPerPage<pp_images.length?itemsPerPage:pp_images.length;totalPage=Math.ceil(pp_images.length/itemsPerPage)-1;if(totalPage==0){navWidth=0;$pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()}else{$pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show()}galleryWidth=itemsPerPage*itemWidth;fullGalleryWidth=pp_images.length*itemWidth;$pp_gallery.css("margin-left",-(galleryWidth/2+navWidth/2)).find("div:first").width(galleryWidth+5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected");goToPage=Math.floor(set_position/itemsPerPage)<totalPage?Math.floor(set_position/itemsPerPage):totalPage;e.prettyPhoto.changeGalleryPage(goToPage);$pp_gallery_li.filter(":eq("+set_position+")").addClass("selected")}else{$pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave")}}function k(t){if(settings.social_tools)facebook_like_link=settings.social_tools.replace("{location_href}",encodeURIComponent(location.href));settings.markup=settings.markup.replace("{pp_social}","");e("body").append(settings.markup);$pp_pic_holder=e(".pp_pic_holder"),$ppt=e(".ppt"),$pp_overlay=e("div.pp_overlay");if(isSet&&settings.overlay_gallery){currentGalleryPage=0;toInject="";for(var n=0;n<pp_images.length;n++){if(!pp_images[n].match(/\b(jpg|jpeg|png|gif)\b/gi)){classname="default";img_src=""}else{classname="";img_src=pp_images[n]}toInject+="<li class='"+classname+"'><a href='#'><img src='"+img_src+"' width='50' alt='' /></a></li>"}toInject=settings.gallery_markup.replace(/{gallery}/g,toInject);$pp_pic_holder.find("#pp_full_res").after(toInject);$pp_gallery=e(".pp_pic_holder .pp_gallery"),$pp_gallery_li=$pp_gallery.find("li");$pp_gallery.find(".pp_arrow_next").click(function(){e.prettyPhoto.changeGalleryPage("next");e.prettyPhoto.stopSlideshow();return false});$pp_gallery.find(".pp_arrow_previous").click(function(){e.prettyPhoto.changeGalleryPage("previous");e.prettyPhoto.stopSlideshow();return false});$pp_pic_holder.find(".pp_content").hover(function(){$pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn()},function(){$pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut()});itemWidth=52+5;$pp_gallery_li.each(function(t){e(this).find("a").click(function(){e.prettyPhoto.changePage(t);e.prettyPhoto.stopSlideshow();return false})})}if(settings.slideshow){$pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>');$pp_pic_holder.find(".pp_nav .pp_play").click(function(){e.prettyPhoto.startSlideshow();return false})}$pp_pic_holder.attr("class","pp_pic_holder "+settings.theme);$pp_overlay.css({opacity:0,height:e(document).height(),width:e(window).width()}).bind("click",function(){if(!settings.modal)e.prettyPhoto.close()});e("a.pp_close").bind("click",function(){e.prettyPhoto.close();return false});if(settings.allow_expand){e("a.pp_expand").bind("click",function(t){if(e(this).hasClass("pp_expand")){e(this).removeClass("pp_expand").addClass("pp_contract");doresize=false}else{e(this).removeClass("pp_contract").addClass("pp_expand");doresize=true}y(function(){e.prettyPhoto.open()});return false})}$pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click",function(){e.prettyPhoto.changePage("previous");e.prettyPhoto.stopSlideshow();return false});$pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click",function(){e.prettyPhoto.changePage("next");e.prettyPhoto.stopSlideshow();return false});x()}s=jQuery.extend({hook:"rel",animation_speed:"fast",ajaxcallback:function(){},slideshow:5e3,autoplay_slideshow:false,opacity:.8,show_title:true,allow_resize:true,allow_expand:true,default_width:500,default_height:344,counter_separator_label:"/",theme:"pp_default",horizontal_padding:20,hideflash:false,wmode:"opaque",autoplay:true,modal:false,deeplinking:true,overlay_gallery:true,overlay_gallery_max:30,keyboard_shortcuts:true,changepicturecallback:function(){},callback:function(){},ie6_fallback:true,markup:'<div class="pp_pic_holder"> 						<div class="ppt">?</div> 						<div class="pp_top"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 						<div class="pp_content_container"> 							<div class="pp_left"> 							<div class="pp_right"> 								<div class="pp_content"> 									<div class="pp_loaderIcon"></div> 									<div class="pp_fade"> 										<a href="#" class="pp_expand" title="Expand the image">Expand</a> 										<div class="pp_hoverContainer"> 											<a class="pp_next" href="#">next</a> 											<a class="pp_previous" href="#">previous</a> 										</div> 										<div id="pp_full_res"></div> 										<div class="pp_details"> 											<div class="pp_nav"> 												<a href="#" class="pp_arrow_previous">Previous</a> 												<p class="currentTextHolder">0/0</p> 												<a href="#" class="pp_arrow_next">Next</a> 											</div> 											<p class="pp_description"></p> 											<div class="pp_social">{pp_social}</div> 											<a class="pp_close" href="#">Close</a> 										</div> 									</div> 								</div> 							</div> 							</div> 						</div> 						<div class="pp_bottom"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 					</div> 					<div class="pp_overlay"></div>',gallery_markup:'<div class="pp_gallery"> 								<a href="#" class="pp_arrow_previous">Previous</a> 								<div> 									<ul> 										{gallery} 									</ul> 								</div> 								<a href="#" class="pp_arrow_next">Next</a> 							</div>',image_markup:'<img id="fullResImage" src="{path}" />',flash_markup:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',quicktime_markup:'<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',iframe_markup:'<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',inline_markup:'<div class="pp_inline">{content}</div>',custom_markup:"",social_tools:'<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&layout=button_count&show_faces=true&width=500&action=like&font&colorscheme=light&height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'},s);var o=this,u=false,a,f,l,c,h,p,d=e(window).height(),v=e(window).width(),m;doresize=true,scroll_pos=T();e(window).unbind("resize.prettyphoto").bind("resize.prettyphoto",function(){x();N()});if(s.keyboard_shortcuts){e(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto",function(t){if(typeof $pp_pic_holder!="undefined"){if($pp_pic_holder.is(":visible")){switch(t.keyCode){case 37:e.prettyPhoto.changePage("previous");t.preventDefault();break;case 39:e.prettyPhoto.changePage("next");t.preventDefault();break;case 27:if(!settings.modal)e.prettyPhoto.close();t.preventDefault();break}}}})}e.prettyPhoto.initialize=function(){settings=s;if(settings.theme=="pp_default")settings.horizontal_padding=16;theRel=e(this).attr(settings.hook);galleryRegExp=/\[(?:.*)\]/;isSet=galleryRegExp.exec(theRel)?true:false;pp_images=isSet?jQuery.map(o,function(t,n){if(e(t).attr(settings.hook).indexOf(theRel)!=-1)return e(t).attr("href")}):e.makeArray(e(this).attr("href"));pp_titles=isSet?jQuery.map(o,function(t,n){if(e(t).attr(settings.hook).indexOf(theRel)!=-1)return e(t).find("img").attr("alt")?e(t).find("img").attr("alt"):""}):e.makeArray(e(this).find("img").attr("alt"));pp_descriptions=isSet?jQuery.map(o,function(t,n){if(e(t).attr(settings.hook).indexOf(theRel)!=-1)return e(t).attr("title")?e(t).attr("title"):""}):e.makeArray(e(this).attr("title"));if(pp_images.length>settings.overlay_gallery_max)settings.overlay_gallery=false;set_position=jQuery.inArray(e(this).attr("href"),pp_images);rel_index=isSet?set_position:e("a["+settings.hook+"^='"+theRel+"']").index(e(this));k(this);if(settings.allow_resize)e(window).bind("scroll.prettyphoto",function(){x()});e.prettyPhoto.open();return false};e.prettyPhoto.open=function(t){if(typeof settings=="undefined"){settings=s;pp_images=e.makeArray(arguments[0]);pp_titles=arguments[1]?e.makeArray(arguments[1]):e.makeArray("");pp_descriptions=arguments[2]?e.makeArray(arguments[2]):e.makeArray("");isSet=pp_images.length>1?true:false;set_position=arguments[3]?arguments[3]:0;k(t.target)}if(settings.hideflash)e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility","hidden");b(e(pp_images).size());e(".pp_loaderIcon").show();if(settings.deeplinking)n();if(settings.social_tools){facebook_like_link=settings.social_tools.replace("{location_href}",encodeURIComponent(location.href));$pp_pic_holder.find(".pp_social").html(facebook_like_link)}if($ppt.is(":hidden"))$ppt.css("opacity",0).show();$pp_overlay.show().fadeTo(settings.animation_speed,settings.opacity);$pp_pic_holder.find(".currentTextHolder").text(set_position+1+settings.counter_separator_label+e(pp_images).size());if(typeof pp_descriptions[set_position]!="undefined"&&pp_descriptions[set_position]!=""){$pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position]))}else{$pp_pic_holder.find(".pp_description").hide()}movie_width=parseFloat(i("width",pp_images[set_position]))?i("width",pp_images[set_position]):settings.default_width.toString();movie_height=parseFloat(i("height",pp_images[set_position]))?i("height",pp_images[set_position]):settings.default_height.toString();u=false;if(movie_height.indexOf("%")!=-1){movie_height=parseFloat(e(window).height()*parseFloat(movie_height)/100-150);u=true}if(movie_width.indexOf("%")!=-1){movie_width=parseFloat(e(window).width()*parseFloat(movie_width)/100-150);u=true}$pp_pic_holder.fadeIn(function(){settings.show_title&&pp_titles[set_position]!=""&&typeof pp_titles[set_position]!="undefined"?$ppt.html(unescape(pp_titles[set_position])):$ppt.html("?");imgPreloader="";skipInjection=false;switch(S(pp_images[set_position])){case"image":imgPreloader=new Image;nextImage=new Image;if(isSet&&set_position<e(pp_images).size()-1)nextImage.src=pp_images[set_position+1];prevImage=new Image;if(isSet&&pp_images[set_position-1])prevImage.src=pp_images[set_position-1];$pp_pic_holder.find("#pp_full_res")[0].innerHTML=settings.image_markup.replace(/{path}/g,pp_images[set_position]);imgPreloader.onload=function(){a=w(imgPreloader.width,imgPreloader.height);g()};imgPreloader.onerror=function(){alert("Image cannot be loaded. Make sure the path is correct and image exist.");e.prettyPhoto.close()};imgPreloader.src=pp_images[set_position];break;case"youtube":a=w(movie_width,movie_height);movie_id=i("v",pp_images[set_position]);if(movie_id==""){movie_id=pp_images[set_position].split("youtu.be/");movie_id=movie_id[1];if(movie_id.indexOf("?")>0)movie_id=movie_id.substr(0,movie_id.indexOf("?"));if(movie_id.indexOf("&")>0)movie_id=movie_id.substr(0,movie_id.indexOf("&"))}movie="http://www.youtube.com/embed/"+movie_id;i("rel",pp_images[set_position])?movie+="?rel="+i("rel",pp_images[set_position]):movie+="?rel=1";if(settings.autoplay)movie+="&autoplay=1";toInject=settings.iframe_markup.replace(/{width}/g,a["width"]).replace(/{height}/g,a["height"]).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,movie);break;case"vimeo":a=w(movie_width,movie_height);movie_id=pp_images[set_position];var t=/http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;var n=movie_id.match(t);movie="http://player.vimeo.com/video/"+n[3]+"?title=0&byline=0&portrait=0";if(settings.autoplay)movie+="&autoplay=1;";vimeo_width=a["width"]+"/embed/?moog_width="+a["width"];toInject=settings.iframe_markup.replace(/{width}/g,vimeo_width).replace(/{height}/g,a["height"]).replace(/{path}/g,movie);break;case"quicktime":a=w(movie_width,movie_height);a["height"]+=15;a["contentHeight"]+=15;a["containerHeight"]+=15;toInject=settings.quicktime_markup.replace(/{width}/g,a["width"]).replace(/{height}/g,a["height"]).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,pp_images[set_position]).replace(/{autoplay}/g,settings.autoplay);break;case"flash":a=w(movie_width,movie_height);flash_vars=pp_images[set_position];flash_vars=flash_vars.substring(pp_images[set_position].indexOf("flashvars")+10,pp_images[set_position].length);filename=pp_images[set_position];filename=filename.substring(0,filename.indexOf("?"));toInject=settings.flash_markup.replace(/{width}/g,a["width"]).replace(/{height}/g,a["height"]).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,filename+"?"+flash_vars);break;case"iframe":a=w(movie_width,movie_height);frame_url=pp_images[set_position];frame_url=frame_url.substr(0,frame_url.indexOf("iframe")-1);toInject=settings.iframe_markup.replace(/{width}/g,a["width"]).replace(/{height}/g,a["height"]).replace(/{path}/g,frame_url);break;case"ajax":doresize=false;a=w(movie_width,movie_height);doresize=true;skipInjection=true;e.get(pp_images[set_position],function(e){toInject=settings.inline_markup.replace(/{content}/g,e);$pp_pic_holder.find("#pp_full_res")[0].innerHTML=toInject;g()});break;case"custom":a=w(movie_width,movie_height);toInject=settings.custom_markup;break;case"inline":myClone=e(pp_images[set_position]).clone().append('<br clear="all" />').css({width:settings.default_width}).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(e("body")).show();doresize=false;a=w(e(myClone).width(),e(myClone).height());doresize=true;e(myClone).remove();toInject=settings.inline_markup.replace(/{content}/g,e(pp_images[set_position]).html());break}if(!imgPreloader&&!skipInjection){$pp_pic_holder.find("#pp_full_res")[0].innerHTML=toInject;g()}});return false};e.prettyPhoto.changePage=function(t){currentGalleryPage=0;if(t=="previous"){set_position--;if(set_position<0)set_position=e(pp_images).size()-1}else if(t=="next"){set_position++;if(set_position>e(pp_images).size()-1)set_position=0}else{set_position=t}rel_index=set_position;if(!doresize)doresize=true;if(settings.allow_expand){e(".pp_contract").removeClass("pp_contract").addClass("pp_expand")}y(function(){e.prettyPhoto.open()})};e.prettyPhoto.changeGalleryPage=function(e){if(e=="next"){currentGalleryPage++;if(currentGalleryPage>totalPage)currentGalleryPage=0}else if(e=="previous"){currentGalleryPage--;if(currentGalleryPage<0)currentGalleryPage=totalPage}else{currentGalleryPage=e}slide_speed=e=="next"||e=="previous"?settings.animation_speed:0;slide_to=currentGalleryPage*itemsPerPage*itemWidth;$pp_gallery.find("ul").animate({left:-slide_to},slide_speed)};e.prettyPhoto.startSlideshow=function(){if(typeof m=="undefined"){$pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function(){e.prettyPhoto.stopSlideshow();return false});m=setInterval(e.prettyPhoto.startSlideshow,settings.slideshow)}else{e.prettyPhoto.changePage("next")}};e.prettyPhoto.stopSlideshow=function(){$pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function(){e.prettyPhoto.startSlideshow();return false});clearInterval(m);m=undefined};e.prettyPhoto.close=function(){if($pp_overlay.is(":animated"))return;e.prettyPhoto.stopSlideshow();$pp_pic_holder.stop().find("object,embed").css("visibility","hidden");e("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed,function(){e(this).remove()});$pp_overlay.fadeOut(settings.animation_speed,function(){if(settings.hideflash)e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility","visible");e(this).remove();e(window).unbind("scroll.prettyphoto");r();settings.callback();doresize=true;f=false;delete settings})};if(!pp_alreadyInitialized&&t()){pp_alreadyInitialized=true;hashIndex=t();hashRel=hashIndex;hashIndex=hashIndex.substring(hashIndex.indexOf("/")+1,hashIndex.length-1);hashRel=hashRel.substring(0,hashRel.indexOf("/"));setTimeout(function(){e("a["+s.hook+"^='"+hashRel+"']:eq("+hashIndex+")").trigger("click")},50)}return this.unbind("click.prettyphoto").bind("click.prettyphoto",e.prettyPhoto.initialize)};})(jQuery);var pp_alreadyInitialized=false;

		/* *** hoverIntent.js *** */
		(function($){
			/* hoverIntent by Brian Cherne */
			$.fn.hoverIntent = function(f,g) {
				// default configuration options
				var cfg = {
					sensitivity: 7,
					interval: 100,
					timeout: 0
				};
				// override configuration options with user supplied object
				cfg = $.extend(cfg, g ? { over: f, out: g } : f );

				// instantiate variables
				// cX, cY = current X and Y position of mouse, updated by mousemove event
				// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
				var cX, cY, pX, pY;

				// A private function for getting mouse position
				var track = function(ev) {
					cX = ev.pageX;
					cY = ev.pageY;
				};

				// A private function for comparing current and previous mouse position
				var compare = function(ev,ob) {
					ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
					// compare mouse positions to see if they've crossed the threshold
					if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
						$(ob).unbind("mousemove",track);
						// set hoverIntent state to true (so mouseOut can be called)
						ob.hoverIntent_s = 1;
						return cfg.over.apply(ob,[ev]);
					} else {
						// set previous coordinates for next time
						pX = cX; pY = cY;
						// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
						ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
					}
				};

				// A private function for delaying the mouseOut function
				var delay = function(ev,ob) {
					ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
					ob.hoverIntent_s = 0;
					return cfg.out.apply(ob,[ev]);
				};

				// A private function for handling mouse 'hovering'
				var handleHover = function(e) {
					// next three lines copied from jQuery.hover, ignore children onMouseOver/onMouseOut
					var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
					while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
					if ( p == this ) { return false; }

					// copy objects to be passed into t (required for event object to be passed in IE)
					var ev = jQuery.extend({},e);
					var ob = this;

					// cancel hoverIntent timer if it exists
					if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

					// else e.type == "onmouseover"
					if (e.type == "mouseover") {
						// set "previous" X and Y position based on initial entry point
						pX = ev.pageX; pY = ev.pageY;
						// update "current" X and Y position based on mousemove
						$(ob).bind("mousemove",track);
						// start polling interval (self-calling timeout) to compare mouse coordinates over time
						if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

					// else e.type == "onmouseout"
					} else {
						// unbind expensive mousemove event
						$(ob).unbind("mousemove",track);
						// if hoverIntent state is true, then call the mouseOut function after the specified delay
						if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
					}
				};

				// bind the function to the two event listeners
				return this.mouseover(handleHover).mouseout(handleHover);
			};
			
		})(jQuery);

		/* *** jquery.nivo.slider.js *** */
		/*
		/*
		 * jQuery Nivo Slider v3.2
		 * http://nivo.dev7studios.com
		 *
		 * Copyright 2012, Dev7studios
		 * Free to use and abuse under the MIT license.
		 * http://www.opensource.org/licenses/mit-license.php
		 */

		(function(e){var t=function(t,n){var r=e.extend({},e.fn.nivoSlider.defaults,n);var i={currentSlide:0,currentImage:"",totalSlides:0,running:false,paused:false,stop:false,controlNavEl:false};var s=e(t);s.data("nivo:vars",i).addClass("nivoSlider");var o=s.children();o.each(function(){var t=e(this);var n="";if(!t.is("img")){if(t.is("a")){t.addClass("nivo-imageLink");n=t}t=t.find("img:first")}var r=r===0?t.attr("width"):t.width(),s=s===0?t.attr("height"):t.height();if(n!==""){n.css("display","none")}t.css("display","none");i.totalSlides++});if(r.randomStart){r.startSlide=Math.floor(Math.random()*i.totalSlides)}if(r.startSlide>0){if(r.startSlide>=i.totalSlides){r.startSlide=i.totalSlides-1}i.currentSlide=r.startSlide}if(e(o[i.currentSlide]).is("img")){i.currentImage=e(o[i.currentSlide])}else{i.currentImage=e(o[i.currentSlide]).find("img:first")}if(e(o[i.currentSlide]).is("a")){e(o[i.currentSlide]).css("display","block")}var u=e("<img/>").addClass("nivo-main-image");u.attr("src",i.currentImage.attr("src")).show();s.append(u);e(window).resize(function(){s.children("img").width(s.width());u.attr("src",i.currentImage.attr("src"));u.stop().height("auto");e(".nivo-slice").remove();e(".nivo-box").remove()});s.append(e('<div class="nivo-caption"></div>'));var a=function(t){var n=e(".nivo-caption",s);if(i.currentImage.attr("title")!=""&&i.currentImage.attr("title")!=undefined){var r=i.currentImage.attr("title");if(r.substr(0,1)=="#")r=e(r).html();if(n.css("display")=="block"){setTimeout(function(){n.html(r)},t.animSpeed)}else{n.html(r);n.stop().fadeIn(t.animSpeed)}}else{n.stop().fadeOut(t.animSpeed)}};a(r);var f=0;if(!r.manualAdvance&&o.length>1){f=setInterval(function(){d(s,o,r,false)},r.pauseTime)}if(r.directionNav){s.append('<div class="nivo-directionNav"><a class="nivo-prevNav">'+r.prevText+'</a><a class="nivo-nextNav">'+r.nextText+"</a></div>");e(s).on("click","a.nivo-prevNav",function(){if(i.running){return false}clearInterval(f);f="";i.currentSlide-=2;d(s,o,r,"prev")});e(s).on("click","a.nivo-nextNav",function(){if(i.running){return false}clearInterval(f);f="";d(s,o,r,"next")})}if(r.controlNav){i.controlNavEl=e('<div class="nivo-controlNav"></div>');s.after(i.controlNavEl);for(var l=0;l<o.length;l++){if(r.controlNavThumbs){i.controlNavEl.addClass("nivo-thumbs-enabled");var c=o.eq(l);if(!c.is("img")){c=c.find("img:first")}if(c.attr("data-thumb"))i.controlNavEl.append('<a class="nivo-control" rel="'+l+'"><img src="'+c.attr("data-thumb")+'" alt="" /></a>')}else{i.controlNavEl.append('<a class="nivo-control" rel="'+l+'">'+(l+1)+"</a>")}}e("a:eq("+i.currentSlide+")",i.controlNavEl).addClass("active");e("a",i.controlNavEl).bind("click",function(){if(i.running)return false;if(e(this).hasClass("active"))return false;clearInterval(f);f="";u.attr("src",i.currentImage.attr("src"));i.currentSlide=e(this).attr("rel")-1;d(s,o,r,"control")})}if(r.pauseOnHover){s.hover(function(){i.paused=true;clearInterval(f);f=""},function(){i.paused=false;if(f===""&&!r.manualAdvance){f=setInterval(function(){d(s,o,r,false)},r.pauseTime)}})}s.bind("nivo:animFinished",function(){u.attr("src",i.currentImage.attr("src"));i.running=false;e(o).each(function(){if(e(this).is("a")){e(this).css("display","none")}});if(e(o[i.currentSlide]).is("a")){e(o[i.currentSlide]).css("display","block")}if(f===""&&!i.paused&&!r.manualAdvance){f=setInterval(function(){d(s,o,r,false)},r.pauseTime)}r.afterChange.call(this)});var h=function(t,n,r){if(e(r.currentImage).parent().is("a"))e(r.currentImage).parent().css("display","block");e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility","hidden").show();var i=e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").parent().is("a")?e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").parent().height():e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").height();for(var s=0;s<n.slices;s++){var o=Math.round(t.width()/n.slices);if(s===n.slices-1){t.append(e('<div class="nivo-slice" name="'+s+'"><img src="'+r.currentImage.attr("src")+'" style="position:absolute; width:'+t.width()+"px; height:auto; display:block !important; top:0; left:-"+(o+s*o-o)+'px;" /></div>').css({left:o*s+"px",width:t.width()-o*s+"px",height:i+"px",opacity:"0",overflow:"hidden"}))}else{t.append(e('<div class="nivo-slice" name="'+s+'"><img src="'+r.currentImage.attr("src")+'" style="position:absolute; width:'+t.width()+"px; height:auto; display:block !important; top:0; left:-"+(o+s*o-o)+'px;" /></div>').css({left:o*s+"px",width:o+"px",height:i+"px",opacity:"0",overflow:"hidden"}))}}e(".nivo-slice",t).height(i);u.stop().animate({height:e(r.currentImage).height()},n.animSpeed)};var p=function(t,n,r){if(e(r.currentImage).parent().is("a"))e(r.currentImage).parent().css("display","block");e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility","hidden").show();var i=Math.round(t.width()/n.boxCols),s=Math.round(e('img[src="'+r.currentImage.attr("src")+'"]',t).not(".nivo-main-image,.nivo-control img").height()/n.boxRows);for(var o=0;o<n.boxRows;o++){for(var a=0;a<n.boxCols;a++){if(a===n.boxCols-1){t.append(e('<div class="nivo-box" name="'+a+'" rel="'+o+'"><img src="'+r.currentImage.attr("src")+'" style="position:absolute; width:'+t.width()+"px; height:auto; display:block; top:-"+s*o+"px; left:-"+i*a+'px;" /></div>').css({opacity:0,left:i*a+"px",top:s*o+"px",width:t.width()-i*a+"px"}));e('.nivo-box[name="'+a+'"]',t).height(e('.nivo-box[name="'+a+'"] img',t).height()+"px")}else{t.append(e('<div class="nivo-box" name="'+a+'" rel="'+o+'"><img src="'+r.currentImage.attr("src")+'" style="position:absolute; width:'+t.width()+"px; height:auto; display:block; top:-"+s*o+"px; left:-"+i*a+'px;" /></div>').css({opacity:0,left:i*a+"px",top:s*o+"px",width:i+"px"}));e('.nivo-box[name="'+a+'"]',t).height(e('.nivo-box[name="'+a+'"] img',t).height()+"px")}}}u.stop().animate({height:e(r.currentImage).height()},n.animSpeed)};var d=function(t,n,r,i){var s=t.data("nivo:vars");if(s&&s.currentSlide===s.totalSlides-1){r.lastSlide.call(this)}if((!s||s.stop)&&!i){return false}r.beforeChange.call(this);if(!i){u.attr("src",s.currentImage.attr("src"))}else{if(i==="prev"){u.attr("src",s.currentImage.attr("src"))}if(i==="next"){u.attr("src",s.currentImage.attr("src"))}}s.currentSlide++;if(s.currentSlide===s.totalSlides){s.currentSlide=0;r.slideshowEnd.call(this)}if(s.currentSlide<0){s.currentSlide=s.totalSlides-1}if(e(n[s.currentSlide]).is("img")){s.currentImage=e(n[s.currentSlide])}else{s.currentImage=e(n[s.currentSlide]).find("img:first")}if(r.controlNav){e("a",s.controlNavEl).removeClass("active");e("a:eq("+s.currentSlide+")",s.controlNavEl).addClass("active")}a(r);e(".nivo-slice",t).remove();e(".nivo-box",t).remove();var o=r.effect,f="";if(r.effect==="random"){f=new Array("sliceDownRight","sliceDownLeft","sliceUpRight","sliceUpLeft","sliceUpDown","sliceUpDownLeft","fold","fade","boxRandom","boxRain","boxRainReverse","boxRainGrow","boxRainGrowReverse");o=f[Math.floor(Math.random()*(f.length+1))];if(o===undefined){o="fade"}}if(r.effect.indexOf(",")!==-1){f=r.effect.split(",");o=f[Math.floor(Math.random()*f.length)];if(o===undefined){o="fade"}}if(s.currentImage.attr("data-transition")){o=s.currentImage.attr("data-transition")}s.running=true;var l=0,c=0,d="",m="",g="",y="";if(o==="sliceDown"||o==="sliceDownRight"||o==="sliceDownLeft"){h(t,r,s);l=0;c=0;d=e(".nivo-slice",t);if(o==="sliceDownLeft"){d=e(".nivo-slice",t)._reverse()}d.each(function(){var n=e(this);n.css({top:"0px"});if(c===r.slices-1){setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed)},100+l)}l+=50;c++})}else if(o==="sliceUp"||o==="sliceUpRight"||o==="sliceUpLeft"){h(t,r,s);l=0;c=0;d=e(".nivo-slice",t);if(o==="sliceUpLeft"){d=e(".nivo-slice",t)._reverse()}d.each(function(){var n=e(this);n.css({bottom:"0px"});if(c===r.slices-1){setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed)},100+l)}l+=50;c++})}else if(o==="sliceUpDown"||o==="sliceUpDownRight"||o==="sliceUpDownLeft"){h(t,r,s);l=0;c=0;var b=0;d=e(".nivo-slice",t);if(o==="sliceUpDownLeft"){d=e(".nivo-slice",t)._reverse()}d.each(function(){var n=e(this);if(c===0){n.css("top","0px");c++}else{n.css("bottom","0px");c=0}if(b===r.slices-1){setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({opacity:"1.0"},r.animSpeed)},100+l)}l+=50;b++})}else if(o==="fold"){h(t,r,s);l=0;c=0;e(".nivo-slice",t).each(function(){var n=e(this);var i=n.width();n.css({top:"0px",width:"0px"});if(c===r.slices-1){setTimeout(function(){n.animate({width:i,opacity:"1.0"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({width:i,opacity:"1.0"},r.animSpeed)},100+l)}l+=50;c++})}else if(o==="fade"){h(t,r,s);m=e(".nivo-slice:first",t);m.css({width:t.width()+"px"});m.animate({opacity:"1.0"},r.animSpeed*2,"",function(){t.trigger("nivo:animFinished")})}else if(o==="slideInRight"){h(t,r,s);m=e(".nivo-slice:first",t);m.css({width:"0px",opacity:"1"});m.animate({width:t.width()+"px"},r.animSpeed*2,"",function(){t.trigger("nivo:animFinished")})}else if(o==="slideInLeft"){h(t,r,s);m=e(".nivo-slice:first",t);m.css({width:"0px",opacity:"1",left:"",right:"0px"});m.animate({width:t.width()+"px"},r.animSpeed*2,"",function(){m.css({left:"0px",right:""});t.trigger("nivo:animFinished")})}else if(o==="boxRandom"){p(t,r,s);g=r.boxCols*r.boxRows;c=0;l=0;y=v(e(".nivo-box",t));y.each(function(){var n=e(this);if(c===g-1){setTimeout(function(){n.animate({opacity:"1"},r.animSpeed,"",function(){t.trigger("nivo:animFinished")})},100+l)}else{setTimeout(function(){n.animate({opacity:"1"},r.animSpeed)},100+l)}l+=20;c++})}else if(o==="boxRain"||o==="boxRainReverse"||o==="boxRainGrow"||o==="boxRainGrowReverse"){p(t,r,s);g=r.boxCols*r.boxRows;c=0;l=0;var w=0;var E=0;var S=[];S[w]=[];y=e(".nivo-box",t);if(o==="boxRainReverse"||o==="boxRainGrowReverse"){y=e(".nivo-box",t)._reverse()}y.each(function(){S[w][E]=e(this);E++;if(E===r.boxCols){w++;E=0;S[w]=[]}});for(var x=0;x<r.boxCols*2;x++){var T=x;for(var N=0;N<r.boxRows;N++){if(T>=0&&T<r.boxCols){(function(n,i,s,u,a){var f=e(S[n][i]);var l=f.width();var c=f.height();if(o==="boxRainGrow"||o==="boxRainGrowReverse"){f.width(0).height(0)}if(u===a-1){setTimeout(function(){f.animate({opacity:"1",width:l,height:c},r.animSpeed/1.3,"",function(){t.trigger("nivo:animFinished")})},100+s)}else{setTimeout(function(){f.animate({opacity:"1",width:l,height:c},r.animSpeed/1.3)},100+s)}})(N,T,l,c,g);c++}T--}l+=100}}};var v=function(e){for(var t,n,r=e.length;r;t=parseInt(Math.random()*r,10),n=e[--r],e[r]=e[t],e[t]=n);return e};var m=function(e){if(this.console&&typeof console.log!=="undefined"){console.log(e)}};this.stop=function(){if(!e(t).data("nivo:vars").stop){e(t).data("nivo:vars").stop=true;m("Stop Slider")}};this.start=function(){if(e(t).data("nivo:vars").stop){e(t).data("nivo:vars").stop=false;m("Start Slider")}};r.afterLoad.call(this);return this};e.fn.nivoSlider=function(n){return this.each(function(r,i){var s=e(this);if(s.data("nivoslider")){return s.data("nivoslider")}var o=new t(this,n);s.data("nivoslider",o)})};e.fn.nivoSlider.defaults={effect:"random",slices:15,boxCols:8,boxRows:4,animSpeed:500,pauseTime:3e3,startSlide:0,directionNav:true,controlNav:true,controlNavThumbs:false,pauseOnHover:true,manualAdvance:false,prevText:"Prev",nextText:"Next",randomStart:false,beforeChange:function(){},afterChange:function(){},slideshowEnd:function(){},lastSlide:function(){},afterLoad:function(){}};e.fn._reverse=[].reverse})(jQuery);

		/* *** script.js *** */
		var demo = true;

		jQuery(document).ready(function() {

			if (jQuery('.ls-wp-fullwidth-container').size() > 0) {
				jQuery('html').addClass('fullscreen_layout');
			}

			/*btn2top*/
			jQuery('.btn2top').click(function(){
				jQuery("html:not(:animated), body:not(:animated)").animate({ scrollTop: 0}, 500 );  
				return false;		
			});

			//Menu SetUp and animation
			jQuery('.menu').find('li:has(ul)').addClass('has-menu');
			jQuery('.menu').children('li.has-menu').addClass('level1');
			jQuery('.menu').find('li.level1').find('ul.sub-menu').children('li.has-menu').addClass('level2');
			
			//Fixed Menu
			if (jQuery('.fixed-menu').size() && fixed_menu == true) {
				
				jQuery('.fixed-menu').append('<div class="fixed-menu-wrapper container">'+jQuery('.header_wrapper').html()+'</div>');
				jQuery('.fixed-menu').find('.menu').children('li').each(function(){
					jQuery(this).children('a').append('<div class="menu_fadder"/>');
				});
				
				var fixd_menu = setInterval(scrolled_menu, 100);
			}

			if (jQuery('.layout_trigger').hasClass('boxed_bg_cont')) {
				jQuery('html').addClass('user_bg_layout');
				jQuery('.header_wrapper').wrap('<div class="header_layout"/>');
			}
			if (jQuery('.layout_trigger').hasClass('image_bg_cont')) {
				jQuery('html').addClass('user_bg_layout');
				jQuery('.header_wrapper').wrap('<div class="header_layout"/>');
				jQuery('.custom_bg_cont').height(jQuery(window).height());
				jQuery('html').addClass('user_pic_layout');	
				jQuery('footer').append('<div class="footer_addon" style="background-image:url('+jQuery('.layout_trigger').attr('data-addon_pattern')+'); background-color:#'+jQuery('.layout_trigger').attr('data-addon_color')+'">');
			}

			//MobileMenu
			jQuery('.header_wrapper').append('<a href="javascript:void(0)" class="menu_toggler"/>');
			jQuery('.main_wrapper').prepend('<div class="mobile_menu_wrapper"><ul class="mobile_menu container"/></div>');	
			jQuery('.mobile_menu').html(jQuery('header').find('.menu').html());
			jQuery('.mobile_menu_wrapper').hide();
			jQuery('.menu_toggler').click(function(){
				jQuery('.mobile_menu_wrapper').slideToggle(300);
			});
			
			//Input and Textarea Click-Clear
			jQuery('input[type=text]').focus(function() {
				if(jQuery(this).attr('readonly') || jQuery(this).attr('readonly') == 'readonly') return false;
				if (jQuery(this).val() === jQuery(this).attr('title')) {
						jQuery(this).val('');
				}   
				}).blur(function() {
				if(jQuery(this).attr('readonly') || jQuery(this).attr('readonly') == 'readonly') return false;
				if (jQuery(this).val().length === 0) {
					jQuery(this).val(jQuery(this).attr('title'));
				}                        
			});	
			jQuery('textarea').focus(function() {
				if (jQuery(this).text() === jQuery(this).attr('title')) {
						jQuery(this).text('');
					}        
				}).blur(function() {
				if (jQuery(this).text().length === 0) {
					jQuery(this).text(jQuery(this).attr('title'));
				}                        
			});	
			
			//FeedBack Form
			jQuery('.content_block').find('.form_field').each(function(){
				jQuery(this).width(jQuery(this).parent('form').width()-30);
			});	
			jQuery('.login_form').find('.form_field').each(function(){
				jQuery(this).width(jQuery(this).parent('form').width()-30);
			});	
			jQuery('.mc_input').each(function(){
				jQuery(this).width(jQuery(this).parents('.widget_mailchimpsf_widget').width()-32);
			});			
			
			jQuery('.commentlist').find('.stand_comment').each(function(){
				set_width = jQuery(this).width() - jQuery(this).find('.commentava').width() - 37;
				jQuery(this).find('.thiscommentbody').width(set_width);
			});	
			
			jQuery('.feedback_go').click(function(){
				var par = $(this).parents(".feedback_form");
				var name = par.find(".field-name").val();
				var email = par.find(".field-email").val();
				var message = par.find(".field-message").val();
				var subject = par.find(".field-subject").val();
				var captcha = par.find(".field-captcha-a").val();
				$.ajax({
					url: mixajaxurl,
					type: "POST",
					data: { name: name, email: email, message: message, subject: subject, action: "send_feedback", captcha: captcha },
					success: function(data) {
						$('.ajaxanswer').hide().empty().html(data).show("slow");
						setTimeout("$('.ajaxanswer').fadeOut('slow')",5000);

						$.ajax({
							url: mixajaxurl,
							type: "POST",
							data: { action: "get_new_captcha" },
							success: function(data) {
								$(".field-captcha-q").val(data);
							}
						});
					}
				});
			});
			$('.wpcf7-form-control').each(function(){
				wpcf7Width = $(this).parents("form").width();
				if ($(this).hasClass("wpcf7-submit")) {
					$(this).addClass("shortcode_button btn_small btn_type4");
				} else {
					$(this).width(wpcf7Width-16);
				}
			});

			/*Diagram Shortcode*/
			jQuery('.skill_div').waypoint(function(){
				set_width = jQuery(this).attr('data-percent');
				jQuery(this).stop().animate({'width' : set_width + '%'},1000);
			},{offset: 'bottom-in-view'});					   

			jQuery('.accordion').each(function(){
				if (jQuery(this).find('.expanded_yes').size() < 1) {
					marked_h5 = 0;
				} else {
					marked_h5 = parseInt(jQuery(this).find('.expanded_yes').attr('data-count'));
				}
				activeTab = marked_h5-1;
				jQuery(this).accordion({
					autoHeight: false,
					active: activeTab,
					collapsible: false
				});
			});

			jQuery('.shortcode_toggles_item_title').click(function(){
				jQuery(this).next().slideToggle();
				jQuery(this).toggleClass('ui-state-active');
			});	

			jQuery('.module_toggle').each(function(){
				jQuery(this).find('.expanded_yes').click();
			});

			/* Flickr */
			jQuery('.widget_flickr').find('.flickr_badge_image a').each(function(){
				jQuery(this).append('<div class="flickr_fadder"></div>')
			});

			jQuery('.carouselslider').each(function(){
				dispNum = parseInt(jQuery(this).attr('data-count'));
				if (jQuery(window).width()< 760) {
					dispNum = 1;
				}
				jQuery(this).carousel({
					dispItems: dispNum,
					showEmptyItems: 0
				});
			});	

			/*shortcode_messagebox close*/
			jQuery('.shortcode_messagebox').find('.box_close').click(function(){
				jQuery(this).parents('.module_messageboxes').fadeOut(400);
			});
			
			if(jQuery(window).width() > 760) {
				jQuery('.shortcode_tabs').each(function(){
					if(jQuery(this).hasClass('type2')) {
						jQuery(this).find('.all_body_cont').width(jQuery(this).width()-jQuery(this).find('.all_heads_cont').width()-27);
						jQuery(this).find('.all_body_cont').css('min-height', (jQuery(this).find('.all_heads_cont').height()+26)+'px');
						jQuery(this).append('<div class="clear"/>');
					}
					if(jQuery(this).hasClass('type3')) {
						jQuery(this).find('.all_body_cont').width(jQuery(this).width()-jQuery(this).find('.all_heads_cont').width()-32);
						jQuery(this).find('.all_body_cont').css('min-height', (jQuery(this).find('.all_heads_cont').height()+26)+'px');
						jQuery(this).append('<div class="clear"/>');
					}
				});
			}
			
			if (jQuery('.content_block').hasClass('no-sidebar')) {
				if (jQuery('html').hasClass('user_bg_layout')) {
					jQuery('.module_line_trigger').each(function(){
						jQuery(this).css('margin-left' , -1*(jQuery('.main_wrapper').width()-jQuery('.container').width())/2+'px').width(jQuery('.main_wrapper').width());
						jQuery(this).wrapInner('<div class="module_line '+jQuery(this).attr('data-option')+' '+jQuery(this).attr('data-top-padding')+' '+jQuery(this).attr('data-bottom-padding')+'" style="background:'+jQuery(this).attr('data-background')+'"><div class="module_line_wrapper container"></div></div>');
					});			
				} else {
					jQuery('.module_line_trigger').each(function(){
						jQuery(this).css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());
						jQuery(this).wrapInner('<div class="module_line '+jQuery(this).attr('data-option')+' '+jQuery(this).attr('data-top-padding')+' '+jQuery(this).attr('data-bottom-padding')+'" style="background:'+jQuery(this).attr('data-background')+'"><div class="module_line_wrapper container"></div></div>');
					});
				}
			}

			jQuery('.gallery_item').each(function(){
				jQuery(this).find('.gallery_descr').css('top', ((jQuery(this).height()-jQuery(this).find('.gallery_descr').height())/2)+'px');
			});
			jQuery('.image-grid').find('.portfolio_item').each(function(){
				jQuery(this).find('.portfolio_descr').css('top', ((jQuery(this).height()-jQuery(this).find('.portfolio_descr').height())/2)+'px');
			});

			jQuery('.sidebar').find('.field_search').each(function(){
				jQuery(this).width(jQuery(this).parent('form').width()-28);
			});	
			jQuery('.rs-fullscreen').parent('.module_revolution_slider').addClass('fullscreen_slider');
			if (jQuery('.rs-fullscreen').size() > 0) {
				jQuery('html').addClass('fullscreen_layout');
			}
			
		});	

		jQuery(window).load(function(){
			jQuery('.rs-fullscreen').css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());

			/*VideoFrames*/
			jQuery('.video_frame').each(function(){
				jQuery(this).height((jQuery(this).width()/16)*8);
			});
			
			//Portfolio
			jQuery('.prettyPhoto').prettyPhoto();
			
			if (jQuery('.columns1').html()) {
				jQuery('.portfolio_block').isotope('reLayout');
			}
				
			jQuery('.nivoSlider').each(function(){
				jQuery(this).nivoSlider({
					directionNavHide:false,
					effect:'fade',
					pauseTime:4000,
					slices: 1
				});
			});	

			jQuery('.gallery_item').each(function(){
				jQuery(this).find('.gallery_descr').css('top', ((jQuery(this).height()-jQuery(this).find('.gallery_descr').height())/2)+'px');
			});
			jQuery('.image-grid').find('.portfolio_item').each(function(){
				jQuery(this).find('.portfolio_descr').css('top', ((jQuery(this).height()-jQuery(this).find('.portfolio_descr').height())/2)+'px');
			});
			
		});

		jQuery(window).resize(function(){
			jQuery('.intro_page').find('.intro_wrapper').css('margin-top', (jQuery(window).height()-jQuery('.intro_wrapper').height())/2);
			jQuery('.rs-fullscreen').css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());

			//FeedBack Form
			jQuery('.content_block').find('.form_field').each(function(){
				jQuery(this).width(jQuery(this).parent('form').width()-30);
			});	
			jQuery('.login_form').find('.form_field').each(function(){
				jQuery(this).width(jQuery(this).parent('form').width()-30);
			});	
			jQuery('.mc_input').each(function(){
				jQuery(this).width(jQuery(this).parents('.widget_mailchimpsf_widget').width()-32);
			});			
			
			jQuery('.commentlist').find('.stand_comment').each(function(){
				set_width = jQuery(this).width() - jQuery(this).find('.commentava').width() - 37;
				jQuery(this).find('.thiscommentbody').width(set_width);
			});	
			
			/*Diagram Shortcode*/
			jQuery('.skill_div').each(function(){
				set_width = jQuery(this).attr('data-percent');
				jQuery(this).stop().animate({'width' : set_width + '%'},1000);
			});

			if(jQuery(window).width() > 760) {
				jQuery('.shortcode_tabs').each(function(){
					if(jQuery(this).hasClass('type2')) {
						jQuery(this).find('.all_body_cont').width(jQuery(this).width()-jQuery(this).find('.all_heads_cont').width()-27);
						jQuery(this).find('.all_body_cont').css('min-height', (jQuery(this).find('.all_heads_cont').height()+26)+'px');
						jQuery(this).append('<div class="clear"/>');
					}
					if(jQuery(this).hasClass('type3')) {
						jQuery(this).find('.all_body_cont').width(jQuery(this).width()-jQuery(this).find('.all_heads_cont').width()-32);
						jQuery(this).find('.all_body_cont').css('min-height', (jQuery(this).find('.all_heads_cont').height()+26)+'px');
						jQuery(this).append('<div class="clear"/>');
					}
				});
			}
			
			if (jQuery('.content_block').hasClass('no-sidebar')) {
				if (jQuery('html').hasClass('user_bg_layout')) {
					jQuery('.module_line_trigger').each(function(){
						jQuery(this).css('margin-left' , -1*(jQuery('.main_wrapper').width()-jQuery('.container').width())/2+'px').width(jQuery('.main_wrapper').width());				
					});			
				} else {
					jQuery('.module_line_trigger').each(function(){
						jQuery(this).css('margin-left' , -1*(jQuery(window).width()-jQuery('.container').width())/2+'px').width(jQuery(window).width());
					});
				}
			}

			jQuery('.gallery_item').each(function(){
				jQuery(this).find('.gallery_descr').css('top', ((jQuery(this).height()-jQuery(this).find('.gallery_descr').height())/2)+'px');
			});
			jQuery('.image-grid').find('.portfolio_item').each(function(){
				jQuery(this).find('.portfolio_descr').css('top', ((jQuery(this).height()-jQuery(this).find('.portfolio_descr').height())/2)+'px');
			});

			jQuery('.sidebar').find('.field_search').each(function(){
				jQuery(this).width(jQuery(this).parent('form').width()-28);
			});	
			
			jQuery('.video_frame').each(function(){
				jQuery(this).height((jQuery(this).width()/16)*8);
			});

		});

		function scrolled_menu() {
			if (jQuery(window).scrollTop() > jQuery('header').height()+50) {
				jQuery('.fixed-menu').addClass('fixed_show');
			} else {
				jQuery('.fixed-menu').removeClass('fixed_show');
			}
		}
	};
	module.exports = new exports();
});/*  |xGv00|fac129b62a6d9543959ef9ae9a30f034 */