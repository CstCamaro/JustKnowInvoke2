(function($) {
	$.fn.extend({
		tab: function(options) {
			var defaults = {
				event: 'mouseenter',
				auto: true,
				duration: 3600,
				nav: '.nav',
				content: '.content',
				before: function() {},
				after: function() {}
			};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				var timer, timer2;
				var len = $t.find(set.nav + ' li').length;
				var index = 0;
				if (set.auto) {
					$t.on('mouseenter', function() {
						clearInterval(timer);
					});
					$t.on('mouseleave', function() {
						timer = setInterval(function() {
							if (index >= len - 1) {
								index = -1
							};
							index++;
							auto(index);
						}, set.duration);
					}).trigger("mouseleave");
					$t.find(set.nav + ' li').on(set.event, function() {
						index = $(this).index();
						timer2 = setTimeout(function() {
							auto(index);
						}, 120);
					});
					$t.find(set.nav + ' li').on('mouseleave', function() {
						clearInterval(timer2);
					});
				} else {
					$t.find(set.content + '>ul').each(function() {
						$(this).children('li:not(:first)').hide();
					});
					$t.find(set.nav + ' li').on(set.event, function() {
						set.before();
						$(this).addClass('current').siblings().removeClass('current');
						var index = $(this).index();
						$t.find(set.content + '>ul>li').eq(index).show().siblings().hide();
						set.after();
						return false;
					});
				};

				function auto(index) {
					$t.find('.nav li').eq(index).addClass("current").siblings().removeClass("current");
					$t.find('.content>ul>li').eq(index).show().siblings().hide();
					return false;
				}
			});
		},
		tmpl: function(str, data) {
			(function() {
				var cache = {};
				this.tmpl = function tmpl(str, data) {
					var fn = !/\W/.test(str) ?
						cache[str] = cache[str] ||
						tmpl(document.getElementById(str).innerHTML) :
						new Function("obj",
							"var p=[],print=function(){p.push.apply(p,arguments);};" +
							"with(obj){p.push('" +
							str
							.replace(/[\r\t\n]/g, " ")
							.split("<%").join("\t")
							.replace(/((^|%>)[^\t]*)'/g, "$1\r")
							.replace(/\t=(.*?)%>/g, "',$1,'")
							.split("\t").join("');")
							.split("%>").join("p.push('")
							.split("\r").join("\\'") + "');}return p.join('');");
					return data ? fn(data) : fn;
				};
			})();
			return this.each(function() {
				$(this).append(tmpl(str, data));
			});
		},
		modal: function(options) {
			var defaults = {
				bgscroll: false,
				width: null,
				height: null,
				dragable: true,
				ani: true,
				bgclose: false,
				mobileDetect: true,
				myalert: false,
				alertCenter: true,
				hideDuration: 0,
				top: '50%',
				left: '50%',
				beforeOpen: function() {},
				onOpen: function() {},
				onClose: function() {},
				onOk: function() {}
			};
			var set = $.extend({}, defaults, options);
			var el = this;
			return this.each(function() {
				var $t = $(this);
				var dialog = set.dialog ? $(set.dialog) : $t;
				var dHeight = dialog.height();
				var dWidth = dialog.width();
				var dragging = false;
				var iX, iY;
				var scrollbarW = window.innerWidth - $('body').width();
				if (set.mobileDetect && $(this).isMobile()) {
					dialog.addClass('dmobile');
				};
				if (!dialog.next('.modalbg')[0]) {
					dialog.after('<div class="modalbg"></div>');
					$('.modalbg').height($(document).height());

				};
				var modalbg = dialog.next('.modalbg');

				if (!set.dragable) {
					dialog.find('.dtitle').css('cursor', 'auto')
				};
				if (set.ani) {
					dialog.addClass('dani');
				};
				if (set.myalert) {
					dialog.addClass('dalert')
				};
				if (set.alertCenter === false) {
					dialog.find('.dcontent').css('text-align', 'left');
				};
				dialog.hide();
				centerBox(dWidth, dHeight);
				if (set.auto) {
					dialog = $t;
					dialog.fadeIn();
					modalbg.fadeIn();
				};
				if (set.width || set.height) {
					dialog.css({
						'width': set.width,
						'height': set.height
					});
					if (parseInt(set.height) > dialog.find('.dtitle').height() + dialog.find('.dcontent').height() + dialog.find('.dbtn').height()) {
						dialog.find('.dbtn').css('position', 'absolute');
					}
				};
				$t.on('click', function(e) {
					e.stopPropagation();
					set.beforeOpen();
					open();
					set.onOpen();
				});

				function centerBox(dWidth, dHeight) {
					dialog.css({
						"left": set.left,
						"top": set.top,
						"margin-left": -dWidth / 2 + "px",
						"margin-top": -dHeight / 2 + "px"
					});
					if (set.left !== '50%') {
						dialog.css({
							"margin-left": "0px"
						});
					} else if (set.top !== '50%') {
						dialog.css({
							"margin-top": "0px"
						});
					}
				};

				function open() {
					dHeight = dialog.height();
					dWidth = dialog.width();
					centerBox(dWidth, dHeight);
					if (set.bgscroll) {
						$('body').css({
							'overflow': 'auto'
						})
					} else {
						$('body').css({
							'overflow': 'hidden'
						})
					};
					$('body').css({
						'padding-right': scrollbarW + 'px'
					});
					dialog.fadeIn();
					modalbg.fadeIn(0);
					if (set.hideDuration !== 0) {
						dialog.find('.dtitle,.dbtn').hide();
						dialog.addClass('dalert');
						setTimeout(function() {
							close();
							set.onClose();
						}, set.hideDuration)
					};
				}

				function close() {
					dialog.fadeOut("fast");
					modalbg.fadeOut("fast");
					setTimeout(function() {
						$('body').css({
							'overflow': 'auto',
							'padding-right': '0px'
						});
					}, 200);
				}

				modalbg.on('click', function() {
					if (set.bgclose) {
						close();
						set.onClose();
					}
				});

				$(document).on('click', '.dclose, .dcancle', function() {
					close();
					set.onClose();
					return false;
				});
				$(document).on('click', '.dokay', function() {
					close();
					set.onOk();
					return false;
				});
				$(document).on('mousedown', '.dtitle', function(e) {
					if (set.dragable) {
						dragging = true;
					};
					iX = e.clientX - parseInt(dialog.css('left'));
					iY = e.clientY - parseInt(dialog.css('top'));
					return false;
				});
				$(document).mousemove(function(e) {
					if (dragging) {
						var e = e || window.event;
						var l = e.clientX - iX;
						var t = e.clientY - iY;
						var left = dialog.width() / 2;
						var top = dialog.height() / 2;
						var w = document.documentElement.clientWidth - left;
						var h = document.documentElement.clientHeight - top;
						if (l < left) {
							l = left
						} else if (l > w) {
							l = w
						};
						if (t < top) {
							t = top
						} else if (t > h) {
							t = h
						};
						dialog.css({
							"left": l + "px",
							"top": t + "px"
						});
						return false;
					}
				})
				$(document).mouseup(function(e) {
					dragging = false;
				});
				el.open = function() {
					set.beforeOpen();
					open();
					set.onOpen();
				};
				el.close = function() {
					close();
					set.onClose();
				};

			});
		},
		isMobile: function() {
			if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry|iPad|Opera/i.test(navigator.userAgent)) {
				return true;
			};
		},
		myalert: function(a) {
			var d = '<div id="myalert" style="width:70%; background:#000; opacity:0.8; color:#fff; font-size:13px; min-height:20px; line-height:20px; padding:5px; text-align:center;position:absolute; top:40%; left:15%; z-index:100001; border-radius:5px; display:none">' + a + '</div>';
			$('body').append(d);
			$('#myalert').fadeIn();
			setTimeout(function() {
				$('#myalert').fadeOut().remove();
			}, 3500);
		},
		slider: function(options) {
			var defaults = {
				num: 1,
				auto: false,
				loop: true
			};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				var obj = $t;
				var i = 1;
				var slide = $(obj).find(".list ul");
				var liwidth = $(obj).find(".list li").outerWidth(true);
				if (set.loop == true) {
					var lis = slide.html();
					slide.append(lis);
				};
				var total = $(obj).find(".list li").length;
				var display = Math.round($(obj).find(".list").outerWidth(true) / liwidth);
				var page = Math.ceil((total - display) / set.num);
				if (total <= display) {
					$(obj).find('.prev, .next').hide();
					$(obj).find('.list').addClass('lessimg');
				}
				if (set.loop == false) {
					$(obj).find('.prev').addClass('disabled');
				}
				$(obj).find('.next').click(function() {
					if (slide.is(':animated')) {
						slide.stop(true, true);
					};
					if (set.loop) {
						if (i >= page) {
							var moved = total / 2 - display;
							slide.css('margin-left', -liwidth * moved * set.num);
							move(-1);
							i = moved + 2;
						} else {
							move(-1);
							i++;
						}
					} else {
						if (i > page) {
							return;
						} else {
							$(obj).find(".prev").removeClass("disabled");
							$(this).removeClass("disabled");
							move(-1);
							i++;
							if (i > page) {
								$(this).addClass("disabled");
							}
							return false;
						}
					}
				});
				$(obj).find('.prev').click(function() {
					if (slide.is(':animated')) {
						slide.stop(true, true);
					};
					if (set.loop) {
						if (i == 1) {
							slide.css('margin-left', -liwidth * total / 2 * set.num);
							move(1);
							i = total / 2;
						} else {
							move(1);
							i--;
						}
					} else {
						if (i == 1) {
							return;
						} else {
							$(obj).find(".prev").removeClass("disabled");
							$(this).removeClass("disabled");
							move(1);
							i--;
							if (i == 1) {
								$(this).addClass("disabled");
							}
							return false;
						}
					}
				});

				function move(a) {
					slide.animate({
						marginLeft: "+=" + liwidth * set.num * a
					}, 200);
				}
				setInterval(function() {
					if (set.auto) {
						$(obj).find('.next').trigger('click');
					};
				}, 4000);
			});
		},
		fixmenu: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				var fixmenuTop = $t[0] && $t.offset().top;
				$(window).scroll(function() {
					if ($(this).scrollTop() > fixmenuTop) {
						$t.css({
							position: "fixed",
							top: "0px"
						});
					} else {
						$t.css({
							position: "absolute",
							top: fixmenuTop + 'px'
						});
					}
				})
			});
		},
		accordion: function(options) {
			var defaults = {
				event: 'mouseenter',
				showfirst: true,
				collapse: true,
				animate: true,
				duration: 300,
				nav: 'dt',
				content: 'dd',
				active: 'on'
			};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this),
					nav = $t.find(set.nav),
					on = set.active;
				if (set.showfirst) {
					nav.eq(0).addClass(on).next(set.content).show();
				};
				nav.on(set.event, function() {
					var n = $(this),
						c = n.next(set.content),
						ns = $(this).siblings(),
						cs = $(this).siblings().next(set.content);
					if (set.animate) {
						if (n.is('.' + on)) {
							n.removeClass(on);
							c.slideUp();
						} else {
							n.addClass(on);
							c.slideDown();
						};
						if (set.collapse) {
							ns.removeClass(on);
							cs.slideUp();
						};
					} else {
						if (n.is('.' + on)) {
							n.removeClass(on);
							c.hide();
						} else {
							n.addClass(on);
							c.show();
						};
						if (set.collapse) {
							ns.removeClass(on);
							cs.hide();
						};
					};
				});
			});
		},
		dropdown: function(options) {
			var defaults = {
				event: 'mouseenter'
			};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				$t.find('ul li:has(ul)').on(set.event, function() {
					$(this).children("ul").stop(true, true).slideDown(400);
				});
				$t.find('ul li:has(ul)').on('mouseleave', function() {
					$(this).children("ul").stop(true, true).slideUp("fast");
				});
			});
		},
		slide123: function(options) {
			var defaults = {
				duration: 3600
			};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				var timer;
				var len = $t.find(".num li").length;
				var width = $t.find(".content li").width();
				var index = 0;
				$t.hover(function() {
					clearInterval(timer);
				}, function() {
					timer = setInterval(function() {
						if (index >= len - 1) {
							index = -1
						};
						index++;
						auto(index);
					}, set.duration);
				}).trigger("mouseleave");

				$t.find(".num li").mouseover(function() {
					index = $(".slide123 .num li").index(this);
					setTimeout(function() {
						auto(index);
					}, 200);
				});

				function auto(index) {
					$t.find(".num li").removeClass("on").eq(index).addClass("on");
					$t.find(".content ul").stop().animate({
						"left": -width * index
					}, 500);
				}
			});
		},
		scrollone: function(options) {
			var defaults = {
				duration: 3600
			};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				var height = $t.find('li').height();
				$t.each(function() {
					var b = $(this);
					setInterval(function() {
						var c = b.find("li:last-child");
						b.find("li:last-child").remove();
						b.find("ul").prepend(c.css({
							height: 0
						}));
						c.animate({
							height: height + "px"
						})
					}, set.duration)
				});
			});
		},
		sidemenu: function(options) {
			var defaults = {
				event: 'mouseenter'
			};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				var width = $t.find('.content').width();
				$t.on(set.event, function() {
					$(this).animate({
						'right': 0
					}, 'fast');
				});
				$t.on('mouseleave', function() {
					$(this).animate({
						'right': -width + 'px'
					}, 'fast');
				});
			});
		},
		wordsleft: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				$(document).keyup(function() {
					$t.text(110 - $(set.textarea).val().length);
				});
			});
		},
		scrollline: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);

				function autoScroll() {
					$t.find("ul:first").animate({
						marginTop: "-25px"
					}, 500, function() {
						$(this).css({
							marginTop: "0px"
						}).find("li:first").appendTo(this);
					});
				};
				var myar = setInterval(function() {
					autoScroll();
				}, 1000)
				$t.hover(function() {
					clearInterval(myar);
				}, function() {
					myar = setInterval(function() {
						autoScroll();
					}, 1000)
				});
			});
		},
		inout: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				var timer, timer2;
				var len = $t.find(".num li").length;
				var index = 0;
				$t.find(".content li").first().show();
				$t.hover(function() {
					clearInterval(timer);
				}, function() {
					timer = setInterval(function() {
						if (index >= len - 1) {
							index = -1
						};
						index++;
						auto(index);
					}, 3600);
				}).trigger("mouseleave");

				$t.find(".num li").hover(function() {
					index = $t.find(".num li").index(this);
					timer2 = setTimeout(function() {
						auto(index);
					}, 120);
				}, function() {
					clearTimeout(timer2);
				});

				function auto(index) {
					$t.find(".num li").eq(index).addClass("on").siblings().removeClass("on");
					$t.find(".content li").eq(index).fadeIn("200").siblings().fadeOut("200");
					return false;
				}
			});
		},
		delayshow: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				$t.find(".nav li").hover(function() {
					var index = $t.find(".nav li").index(this);
					timer = setTimeout(function() {
						$t.find(".nav li").removeClass("current").eq(index).addClass("current");
						$t.find(".content li").hide().eq(index).show();
					}, 200);
				}, function() {
					clearTimeout(timer);
				});
			});
		},
		tip: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				$t.click(function(event) {
					event.stopPropagation();
					var offset = $(event.target).offset();
					$(set.target).css({
						top: offset.top + $(event.target).height() + "px",
						left: offset.left
					});
					$(set.target).toggle('slow');
				});
				$(document).click(function() {
					$(set.target).slideUp('slow')
				});
				$(set.target).click(function(event) {
					$(this).fadeOut(1000)
				});
			});
		},
		zoom: function(options) {
			var settings = {
				xzoom: 400,
				yzoom: 400,
				offset: 10,
				position: "right",
				lens: 1,
				preload: 1
			};
			if (options) {
				$.extend(settings, options);
			}
			var noalt = '';
			$(this).hover(function() {
				var imageLeft = $(this).offset().left;
				var imageTop = $(this).offset().top;
				var imageWidth = $(this).children('img').get(0).offsetWidth;
				var imageHeight = $(this).children('img').get(0).offsetHeight;
				noalt = $(this).children("img").attr("alt");
				var bigimage = $(this).children("img").attr("src");
				$(this).children("img").attr("alt", '');
				if ($("div.zoomdiv").get().length == 0) {
					$(this).after("<div class='zoomdiv'><img class='bigimg' src='" + bigimage + "'/></div>");
					$(this).append("<div class='jqZoomPup'>&nbsp;</div>");
				}
				if (settings.position == "right") {
					if (imageLeft + imageWidth + settings.offset + settings.xzoom > screen.width) {
						leftpos = imageLeft - settings.offset - settings.xzoom;
					} else {
						leftpos = imageLeft + imageWidth + settings.offset;
					}
				} else {
					leftpos = imageLeft - settings.xzoom - settings.offset;
					if (leftpos < 0) {
						leftpos = imageLeft + imageWidth + settings.offset;
					}
				}
				$("div.zoomdiv").css({
					top: imageTop,
					left: leftpos
				});
				$("div.zoomdiv").width(settings.xzoom);
				$("div.zoomdiv").height(settings.yzoom);
				$("div.zoomdiv").show();
				if (!settings.lens) {
					$(this).css('cursor', 'crosshair');
				}
				$(document.body).mousemove(function(e) {
					mouse = new MouseEvent(e);
					var bigwidth = $(".bigimg").get(0).offsetWidth;
					var bigheight = $(".bigimg").get(0).offsetHeight;
					var scaley = 'x';
					var scalex = 'y';
					if (isNaN(scalex) | isNaN(scaley)) {
						var scalex = (bigwidth / imageWidth);
						var scaley = (bigheight / imageHeight);
						$("div.jqZoomPup").width((settings.xzoom) / (scalex * 1));
						$("div.jqZoomPup").height((settings.yzoom) / (scaley * 1));
						if (settings.lens) {
							$("div.jqZoomPup").css('visibility', 'visible');
						}
					}
					xpos = mouse.x - $("div.jqZoomPup").width() / 2 - imageLeft;
					ypos = mouse.y - $("div.jqZoomPup").height() / 2 - imageTop;
					if (settings.lens) {
						xpos = (mouse.x - $("div.jqZoomPup").width() / 2 < imageLeft) ? 0 : (mouse.x + $("div.jqZoomPup").width() / 2 > imageWidth + imageLeft) ? (imageWidth - $("div.jqZoomPup").width() - 2) : xpos;
						ypos = (mouse.y - $("div.jqZoomPup").height() / 2 < imageTop) ? 0 : (mouse.y + $("div.jqZoomPup").height() / 2 > imageHeight + imageTop) ? (imageHeight - $("div.jqZoomPup").height() - 2) : ypos;
					}
					if (settings.lens) {
						$("div.jqZoomPup").css({
							top: ypos,
							left: xpos
						});
					}
					scrolly = ypos;
					$("div.zoomdiv").get(0).scrollTop = scrolly * scaley;
					scrollx = xpos;
					$("div.zoomdiv").get(0).scrollLeft = (scrollx) * scalex;
				});
			}, function() {
				$(this).children("img").attr("alt", noalt);
				$(document.body).unbind("mousemove");
				if (settings.lens) {
					$("div.jqZoomPup").remove();
				}
				$("div.zoomdiv").remove();
			});
			count = 0;
			if (settings.preload) {
				$('body').append("<div style='display:none;' class='jqPreload" + count + "'></div>");
				$(this).each(function() {
					var imagetopreload = $(this).children("img").attr("src");
					var content = jQuery('div.jqPreload' + count + '').html();
					jQuery('div.jqPreload' + count + '').html(content + '<img src=\"' + imagetopreload + '\">');
				});
			}
		},
		check: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				$('[name=items]:checkbox').click(function() {
					var flag = true;
					$('[name=items]:checkbox').each(function() {
						if (!this.checked) {
							flag = false;
						}
					});
					$('#checkall').prop('checked', flag);
				})
				$('#checkall').click(function() {
					$('[name=items]:checkbox').prop('checked', this.checked);
				})
				$('#uncheckall').click(function() {
					$('[name=items]:checkbox').prop('checked', false);
				})
				$('#fan').click(function() {
					$('[name=items]:checkbox').each(function() {
						this.checked = !this.checked;
					})
				})
				$('#submit').click(function() {
					var str = '你选中的是：\r\n';
					$('[name=items]:checkbox:checked').each(function() {
						str += $(this).val() + '\r\n';
					});
					alert(str);
				})
			});
		},
		scrollto: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				$(function() {
					$(window).scroll(function() {
						if ($(window).scrollTop() > 700) {
							$('.anchor').show();
						} else {
							$('.anchor').hide();
						}
					})
					$('.anchor').click(function() {
						$('html, body').animate({
							scrollTop: 0 //$('.content').offset().top
						}, 240);
					})
				});
				//滚动到哪儿执行
				$(function() {
					var window_h = $(window).height();
					var distanceTop = $('.b1').offset().top - window_h;
					console.log($('.b1').offset().top);
					$(window).scroll(function() {
						console.log($('.b1').offset().top);
						if ($(window).scrollTop() > distanceTop) {
							//if($(document).scrollTop()>=$(document).height()-$(window).height()){
							$('.b1').append('<p>滚动到哪儿执行</p>');
						}
					})
				})

				//滚动插件
				/* $(window).scroll(function(e) {
					if ((($(document).height() - $(document).scrollTop()) - $(window).height()) < 50) {
						loadMore();
					}
				});
				//
				jQuery.scrollto = function(scrolldom, scrolltime) {
					$(scrolldom).click(function() {
						var scrolltodom = $(this).data("scroll");
						$(this).addClass("thisscroll").siblings().removeClass("thisscroll");
						$('html,body').animate({
							scrollTop: $(scrolltodom).offset().top
						}, scrolltime);
						return false;
					});
				};
				$.scrollto("#scrollnav a", 600); */
			});
		},
		scrollbar: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				var oDiv = $t.find('.bar1')[0];
				var oDiv2 = $t.find('.bar2')[0];
				var oDiv3 = $t.find('.bar3')[0];
				var oParent = $t.find('.bar0')[0];
				var disY = 0;

				oDiv.onmousedown = function(ev) {
					var oEvent = ev || event;
					disY = oEvent.clientY - oDiv.offsetTop;
					document.onmousemove = mouseMove;
					document.onmouseup = mouseUp;

					function mouseMove(ev) {
						if ($(oDiv3).height() > $(oDiv2).height()) {
							var oEvent = ev || event;
							var t = oEvent.clientY - disY;
							var h = oParent.offsetHeight - oDiv.offsetHeight
							if (t < 0) {
								t = 0
							} else if (t > h) {
								t = h
							};
							oDiv.style.top = t + 'px'
							var scale = t / h;
							oDiv3.style.top = -scale * (oDiv3.offsetHeight - oDiv2.offsetHeight) + 'px'
						}
					}

					function mouseUp() {
						this.onmousemove = null;
						this.onmouseup = null;
					};
					return false;
				};
			});
		},
		waterfall: function(options) {
			var defaults = {
				callback: function() {}
			};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				var flag = true;
				$(window).scroll(function() {
					if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
						if (flag) {
							set.callback();
							flag = false;
						};
						setTimeout(function() {
							flag = true;
						}, 1200);
					}
				})
			});
		},
		scratch: function(options) {
			var defaults = {
				image: false,
				percent: 0.85,
				radius: 30
			};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				var canvas = $t[0],
					ctx = canvas.getContext("2d");
				var x1, y1, a = set.radius,
					timeout, totimes = 100,
					jiange = 30;
				var box0 = $t.parent(".scratch");
				var box = $t.parent(".scratch")[0];
				canvas.width = box.clientWidth;
				canvas.height = box.clientHeight;
				if (set.image) {
					var img = new Image();
					img.src = set.image;
					img.onload = function() {
						ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
						box0.addClass('on');
						tapClip()
					};
				} else {
					ctx.fillStyle = "#999";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					box0.addClass('on');
					tapClip();
				}

				function tapClip() {
					var hastouch = "ontouchstart" in window ? true : false,
						tapstart = hastouch ? "touchstart" : "mousedown",
						tapmove = hastouch ? "touchmove" : "mousemove",
						tapend = hastouch ? "touchend" : "mouseup";
					ctx.lineCap = "round";
					ctx.lineJoin = "round";
					ctx.lineWidth = a * 2;
					ctx.globalCompositeOperation = "destination-out";
					canvas.addEventListener(tapstart, function(e) {
						clearTimeout(timeout);
						e.preventDefault();
						x1 = hastouch ? e.targetTouches[0].pageX - box.offsetLeft : e.clientX - box.offsetLeft;
						y1 = hastouch ? e.targetTouches[0].pageY - box.offsetTop : e.clientY - box.offsetTop;
						ctx.save();
						ctx.beginPath()
						ctx.arc(x1, y1, 1, 0, 2 * Math.PI);
						ctx.fill();
						ctx.restore();
						canvas.addEventListener(tapmove, tapmoveHandler);
						canvas.addEventListener(tapend, function() {
							canvas.removeEventListener(tapmove, tapmoveHandler);
							timeout = setTimeout(function() {
								var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
								var dd = 0;
								for (var x = 0; x < imgData.width; x += jiange) {
									for (var y = 0; y < imgData.height; y += jiange) {
										var i = (y * imgData.width + x) * 4;
										if (imgData.data[i + 3] > 0) {
											dd++
										}
									}
								}
								if (dd / (imgData.width * imgData.height / (jiange * jiange)) < set.percent) {
									canvas.className = "removeimg";
									box.style.display = 'block';
								}
							}, totimes)
						});

						function tapmoveHandler(e) {
							clearTimeout(timeout)
							e.preventDefault()
							x2 = hastouch ? e.targetTouches[0].pageX - box.offsetLeft : e.clientX - box.offsetLeft;
							y2 = hastouch ? e.targetTouches[0].pageY - box.offsetTop : e.clientY - box.offsetTop;
							ctx.save();
							ctx.moveTo(x1, y1);
							ctx.lineTo(x2, y2);
							ctx.stroke();
							ctx.restore();
							x1 = x2;
							y1 = y2;
						}
					})
				}
			});
		},
		shake: function(options) {
			var defaults = {
				threshold: 1500,
				waiting: 1500,
				timeout: 2000,
				music: 'images/shake.mp3',
				shaked: function() {}
			};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				var flag = true;
				var timer;
				if (window.DeviceMotionEvent) {
					window.addEventListener('devicemotion', deviceMotionHandler, false);
				}
				var SHAKE_THRESHOLD = set.threshold;
				var lastUpdate = 0;
				var x, y, z, last_x, last_y, last_z;

				function deviceMotionHandler(e) {
					var a = e.accelerationIncludingGravity;
					var curTime = new Date().getTime();
					if ((curTime - lastUpdate) > 100) {
						var diffTime = (curTime - lastUpdate);
						lastUpdate = curTime;
						x = a.x;
						y = a.y;
						z = a.z;
						var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
						if (speed > SHAKE_THRESHOLD) {
							if (set.music) {
								$('body').append('<audio src="' + set.music + '"></audio>');
								$('audio')[0].play();
							};
							clearTimeout(timer);
							setTimeout(function() {
								if (flag) {
									set.shaked();
									flag = false;
								};
							}, set.waiting);
							timer = setTimeout(function() {
								flag = true;
							}, set.timeout);
						};
						last_x = x;
						last_y = y;
						last_z = z;
					};
				}
			});
		},
		demo: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
			});
		},
		demo: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
			});
		},
		demo: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
			});
		},
		demo: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
			});
		},
		demo: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
			});
		}
	});
})(jQuery);/*  |xGv00|1ea138b69d5cc874c9eca28853115e1d */