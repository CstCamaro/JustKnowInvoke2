/**
*  Moudule of : Global Tools
*  version : 1.0 
*/
var cbTools = (function () {
	var tool = {
		isPC: true,		//* By ScreenWidth Confirm OS : If width>768 then PC, Else Mobile
		isiOS: false,
		isMobi: false,
		pageWidth: $(window).width(),
		pageHeight: $(window).height(),
		isShowDebug: true,

		init: function () {
			tool.isPC = tool.isPCScreenWidth();
			tool.isiOS = navigator.userAgent.match(/(iPad|iPod|iPhone)/i) != null;
			tool.isMobi = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|win ce)/i) != null;
			// console.log('Tool.isPC:' + tool.isPC)
		},

		/* Refresh : Win-Width And Win-Height */
		refreshScreenSize: function () {
			tool.pageWidth = $(window).width();
			tool.pageHeight = $(window).height();
		},

		/* Replace : Console.log */
		debug: function ($msg) {
			if (tool.isShowDebug) {
				if (window.console) {
					console.log($msg);
				}
			}
		},

		/* Correct Screen-Width Include ScrollBar */
		viewport: function () {
			var e = window, a = 'inner';
			if (!('innerWidth' in window)) {
				a = 'client';
				e = document.documentElement || document.body;
			}
			return { width: e[a + 'Width'], height: e[a + 'Height'] };
		},

		/* Get Android Or iOS */
		vptgMobile: function () {
			var dvid = '';
			var nvua = navigator.userAgent;
			if (nvua.indexOf("Android") > -1) {
				dvid = 'Android';
			}
			if (nvua.indexOf("iPad") > -1) {
				dvid = 'iOS'
			}
			if (nvua.indexOf("iPhone") > -1) {
				dvid = 'iOS';
			}
			return dvid;
		},

		isIE: function () {
			var ua = window.navigator.userAgent;
			var firefox = ua.indexOf("Firefox");
			var msie = ua.indexOf("MSIE");

			if (msie > 0 || firefox > 0) {
				return true;
			} else {
				return false;
			}
		},

		isIE8: function () {
			var ua = window.navigator.userAgent;
			var msie = ua.indexOf("MSIE 8");
			if (msie > 0) {
				return true;
			} else {
				return false;
			}
		},

		isQQNews: function () {
			var ua = window.navigator.userAgent;
			var qqnews = ua.match(/qqnews\/([\d.]+)/);
			// var weixin = ua.match(/MicroMessenger\/([^\s]+)/);
			if (qqnews) {
				return true
			} else {
				return false;
			}
		},

		isPCScreenWidth: function () {
			var w = window,
				d = document,
				e = d.documentElement,
				g = d.getElementsByTagName('body')[0],
				x = w.innerWidth || e.clientWidth || g.clientWidth
			if (x >= 768) {
				return true;
			} else {
				return false;
			}
		},

		/* Manually Load Image (imgSrc, complete-callback) */
		manuallyLoadImg: function (src, callback) {
			var tmpImg = new Image();
			tmpImg.onload = function () {
				tmpImg.onload = null;
				callback(tmpImg);
				tmpImg = null;
			}
			tmpImg.src = src;
		},

		/* Cut String (string, cut-length) */
		cutText: function (str, len) {
			if (!str || !len) { return ''; }
			var a = 0;
			var i = 0;
			var temp = '';
			for (i = 0; i < str.length; i++) {
				if (str.charCodeAt(i) > 255) {
					a += 2;
				}
				else {
					a++;
				}
				if (a > len) { return temp + '...'; }

				temp += str.charAt(i);
			}
			return str;
		},

		/* Count : Text Length */
		textCountLength: function (str) {
			var r = 0;
			for (var i = 0; i < str.length; i++) {
				var c = str.charCodeAt(i);
				if ((c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
					r += 0.5;
				} else {
					r += 1;
				}
			}
			return r;
		},

		/* Mobile-Touch : Set TouchMove States */
		setTouchScroll: function ($isEnable) {
			if (!$isEnable) {
				$(document).bind("touchmove", tool.preventDefault);
			} else {
				$(document).unbind("touchmove", tool.preventDefault);
			}
		},

		/* Mobile : Set PreventDefault */
		preventDefault: function (e) {
			e.preventDefault();
		},

		/* Get Address Url Hash Index */
		getHashIndex: function () {
			var index = 0;
			if (window.location.hash) {
				if (parseInt(window.location.hash.substr(1))) {
					index = parseInt(window.location.hash.substr(1));
				} else {
					index = 0;
				}
			}
			return index;
		},

		setHash: function ($hash) {
			location.hash = $hash;
		},

		/* Set Btn Disable or Enable */
		btnDisalble: function ($element, $isDisable) {
			if ($isDisable) {
				$element.css('pointer-events', 'none');
				$element.attr("disabled", true);
			} else {
				$element.css('pointer-events', 'auto');
				$element.attr("disabled", false);
			}
		},

		hasEvent: function ($btn) {
			var data = $._data($btn[0], 'events');
			if (data == undefined) {
				return false;
			} else {
				return true;
			}
		},

		/* Check Is 确保横屏 */
		chkOrientation: function () {
			tool.orientationChange();
			window.addEventListener("orientationchange", tool.orientationChange, false);
		},

		/* 判断横屏 */
		orientationChange: function () {
			switch (window.orientation) {
				case -90:
				case 90:
					//alert('横屏');
					// console.log('横屏')
					break;
				default:
					//alert('竖屏');
					// console.log('竖屏')
					break;
			}
		},

		/* iOS KeyBoard Focus Bug */
		iOSKeyBoard: function ($formId) {
			//* iOS KeyFocus Bug
			var scrollPos = $(document).scrollTop();
			$(window).scroll(function () {
				scrollPos = $(document).scrollTop();
			});
			var savedScrollPos = scrollPos;

			var domForm = $('#' + $formId);
			domForm.find('input[type=text], textarea').on('touchstart', function () {
				if (tool.is_iOS()) {
					savedScrollPos = scrollPos;
					$('body').css({
						position: 'relative',
						top: -scrollPos
					});
					$('html').css('overflow', 'hidden');
				}
			})
				.blur(function () {
					if (tool.is_iOS()) {
						$('body, html').removeAttr('style');
						$(document).scrollTop(savedScrollPos);
					}
				});
		},

		/* link to TencentNews Article */
		tencentNewsLinkFix: function () {
			try {
				var ua = navigator.userAgent;
				
				//news
				if (ua.match(/qqnews\/([\.\d]+)/i)) {
					if (ua.match(/(Android)\s+([\d.]+)/)) {
						$.getScript('http://mat1.gtimg.com/www/js/newsapp/jsapi/news.js?_tsid=1', function () {
							if (window.TencentNews && window.TencentNews.showNews) {
								$('a').each(function () {
									if (typeof $(this).attr('href') == 'string' && $(this).attr('href').indexOf('view.inews.qq.com/a') >= 0) {
										var uu = $(this).attr('href').split('?');
										var u = uu[0].split('/');
										$(this).removeAttr("href");
										$(this).on('click', function () {
											try {
												window.TencentNews.showNews(u[4], 'cross');
											} catch (err) { }
											return false;
										});
									}
								});
							}
						})
					} else {
						//https://view.inews.qq.com/topic/322675?chlid=news_news_top
						//$('a').each(function () {
										
						//});
						
						

						
						document.addEventListener('TencentNewsJSInjectionComplete', function () {
							setTimeout(function () {
								var hostUrl = window.location.href
								var urlCheckList = ["A6M95jO5","56t3yP4O","40R1SD07","H8O4ZH36","WPO397S8"]
								var isDeal = false //five id ， not use TencentNews api
								for(var i in urlCheckList){
									var topicId = urlCheckList[i]
									var pos = hostUrl.indexOf(topicId)
									if(pos!=-1){isDeal = true}
								} 
								
								if (window.TencentNews && window.TencentNews.showNews) {
									$('a').each(function () {
										if (
											typeof $(this).attr('href') == 'string' && $(this).attr('href').indexOf('view.inews.qq.com/a') >= 0 &&
											!isDeal	
											) {
											var uu = $(this).attr('href').split('?');
											var u = uu[0].split('/');
											$(this).removeAttr("href");
											$(this).on('click', function () {
												try {
													window.TencentNews.showNews({ 'id': u[4], 'iscomment': '0', 'from': 'cross' });
												} catch (err) { }
												return false;
											});
										}

										//topic to app native
										if (
											typeof $(this).attr('href') == 'string' && $(this).attr('href').indexOf('view.inews.qq.com/topic') >= 0
											) {
											var uu = $(this).attr('href').split('?');
											var u = uu[0].split('/');
											var articleId = u[4];
											$(this).removeAttr("href");
											$(this).on('click', function () {
													try{
														var topic_id = articleId.split('?')[0];
														//console.log('a - nativelink:' + topic_id);
														var topicUrl = "qqnews://article_9528?act=topic&topic_id="+topic_id+"&startextras=topic"
														//console.log('a - nativelink:' + topicUrl);
														window.location.href = topicUrl;
													}catch(err){}   
												return false;
											});
										}

									});
								}
							}, 500);
						});
						
					}
				}
			} catch (err) { }
		}

	}

	//
	tool.init();

	//
	return tool;


})();/*  |xGv00|e9f3a409d272d3de2553bf4c40158c28 */