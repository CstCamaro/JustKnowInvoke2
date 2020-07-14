$(function() {
	var browserWidth, browserHeight, currImg = 0, imgs = [];

	function getCommentNum() {
		if (cmt_id.length >= 10) {
			$.getScript("http://coral.qq.com/article/" + cmt_id + "/commentnum?callback=votnum");
			window.votnum = function(da) {
				$("#commNum").html(da.data.commentnum);
			}
		}
	}

	function initImgWrap(n) {
		var str = "";
		
		for (var i = 0; i < imgData.length; i++) {
			imgs[imgData[i].sortid] = imgData[i];
		};
		for (var i = 0; i < imgs.length; i++) {
			str += '<div class="split imageWrap" imgindex=' + i + '>';
			str += '<div class="box-middle"><div class="box-inner">'
			str += '<img _src="' + imgs[i].url + '" title="' + imgs[i].imgname + '" alt="' + imgs[i].imgname + '" />';
			str += '</div></div></div>';
		};
		$("#pageNum").find(".totalNum").html(imgs.length);
		$("#imagesWrap").after(str).remove();
		$("#coverwrap").find("img").css({
			width : "",
			height : ""
		}).unbind().load(function() {
			var self = $(this), ratio = (self.height() / self.width());
			var wid = self.parent().width();
			var hei = self.parent().height();

			if ((hei / wid) > ratio) {
				resizeHeight(self, hei, ratio);

			} else {
				resizeWidth(self, wid, ratio);
			}
			self.css('left', (wid - self.width()) / 2);
			self.css('top', (hei - self.height()) / 2);
		})
		$(".recommBox").find("img").css({
			width : "",
			height : ""
		}).unbind().load(function() {
			var self = $(this), ratio = (self.height() / self.width()).toFixed(2);
			var wid = self.parent().width();
			var hei = self.parent().height();
			if ((hei / wid) > ratio) {
				resizeHeight(self, hei, ratio);

			} else {
				resizeWidth(self, wid, ratio);
			}

			self.css('left', (wid - self.width()) / 2);
			self.css('top', (hei - self.height()) / 2);
		});
	}

	function callShare(n) {
		var shareWrap = $(".shareWrap");
		if (n == 1) {
			shareWrap.show();

		} else {
			shareWrap.hide();
		};
	}

	function callFullScreenMenu(n) {
		var fullScreenMenu = $("#fullScreenMenu");
		if (n == 1) {
			fullScreenMenu.fadeIn();
		} else {
			fullScreenMenu.fadeOut();
		};
	}

	function callImgDesc(n) {
		var imgDesc = $("#imgDesc"), imgDescBox = $("#imgDescBox"), imgDescButton = $("#imgDescButton");
		imgDesc.find(".descarrdown").unbind();
		imgDesc.find(".tumb").unbind();
		imgDesc.find(".descarrdown").click(function() {
			$("#thumbBox").hide();
			imgDesc.slideUp("", function() {
				imgDescBox.removeClass("imgDescBoxFilter");
				callImgDescButton(1);
			});
		})
		imgDesc.find(".tumb").click(function() {
			if ($(this).hasClass("tumbOn")) {
				$(this).removeClass("tumbOn");
			} else {
				$(this).addClass("tumbOn");
			}
			callThumb();
		})
		if (n == 1) {
			imgDesc.attr("hasShow", "true");
			$("#imgDesc").mouseenter(function(e) {
				if($(this).is(":animated")) {return;}
				$("#descWrap").stop().animate({
					height : $("#descWrap")[0].scrollHeight + "px"
				});
			}).mouseleave(function(e) {
				if($(this).is(":animated")) {return;}
				$("#descWrap").stop().animate({
					height : "48px"
				})
			})
			imgDesc.slideDown("fast", function() {
				imgDescBox.addClass("imgDescBoxFilter");
			});
		} else {
			$("#imgDesc").stop().unbind();
			imgDesc.attr("hasShow", "fasle");
			$("#thumbBox").hide();
			imgDesc.slideUp();
		};

	}

	function callImgDescButton(n) {
		var imgDesc = $("#imgDescButton"), imgDescBox = $("#imgDescBox"), fullScreenMenu = $("#fullScreenMenu");
		imgDesc.find(".descarrup").unbind();
		imgDesc.find(".descarrup").click(function() {
			imgDesc.slideUp("", function() {
				imgDescBox.addClass("imgDescBoxFilter");
				callImgDesc(1);
			});

		})
		if (n == 1) {
			imgDescBox.removeClass("imgDescBoxFilter");
			imgDesc.slideDown();
		} else {
			imgDesc.slideUp();
		};

	}

	function callVideoPlay(n) {
		var video, videoPlayer = $("#video_player");
		if (videoPlayer.attr("data-vid")) {
			if (n == 1) {
				video = new tvp.VideoInfo();
				video.setVid(videoPlayer.attr("data-vid")), player = new tvp.Player();
				player.create({
					width : "100%",
					height : "100%",
					video : video,
					modId : "video_player",
					autoplay : 0,
					flashWmode : "transparent",
					pic : videoPlayer.attr("data-vcover")
				});
			} else {
				videoPlayer.html("");
			}

		}

	}

	function showAlert(str) {
		var tips = $("<div />").addClass("tipsAlter");
		if ($(".tipsAlter").length > 0) {
			return;
		}
		tips.html(str);
		tips.appendTo($("#globalwrap"));
		tips.fadeIn("fast", function() {
			setTimeout(function() {
				tips.fadeOut("fast", function() {
					tips.remove();
				});
			}, 1000)
		})
	}

	function resizeWidth(obj, width, ratio) {
		obj.width(width);
		obj.height(width * ratio);
	};

	function resizeHeight(obj, height, ratio) {
		obj.height(height);
		obj.width(height / ratio);
	};

	function resizeNow(oTarget, nMinW, nMinH, nMaxHoffset, nWoffset, nHoffset) {
		var self, maxWidth, maxHeight;
		browserWidth = $(window).width();
		browserHeight = $(window).height();
		self = $(oTarget);
		nMaxHoffset = nMaxHoffset || 0;
		nWoffset = nWoffset || 0;
		nHoffset = nHoffset || 0;
		maxWidth = browserWidth;
		maxHeight = browserHeight + nMaxHoffset;
		if (maxWidth < nMinW) {
			self.width(nMinW);
		} else {
			self.width(maxWidth + nWoffset);
		}
		if (maxHeight < nMinH) {
			self.height(nMinH);
		} else {
			self.height(maxHeight + nHoffset);
		}
	}

	function resizeImage(obj, w, h) {
		var browserW = w || $(window).width();
		browserH = h || $(window).height();
		var self = $(obj), ratio = (self.height() / self.width()).toFixed(2);
		if ((browserH / browserW) > ratio) {
			resizeWidth(self, browserW, ratio);
		} else {
			resizeHeight(self, browserH, ratio)
		}
	}

	window["menuScrollTo"] = function(path) {
		var splits = $("#scrollBox").find(".split");
		switch (path) {
			case "images" :
				screenScrollTo(splits.index($(".imageWrap:visible")[0]));
				break;
			case "video" :
				screenScrollTo(splits.index($("#videoWrap:visible")[0]));
				break;
			case "text" :
				screenScrollTo(splits.index($(".wordBox:visible")[0]));
				break;
			case "donation" :
				screenScrollTo(splits.index($(".donation:visible")[0]));
				break;
			case "recom" :
				screenScrollTo(splits.index($(".recom:visible")[0]));
				break;
			case "comment" :
				screenScrollTo(splits.index($(".comment:visible")[0]));
				break;
			case "weibo" :
				//window.open("http://e.t.qq.com/huozhestory");
				break;
			case "home" :
				screenScrollTo(0);
				break;
			case "list" :
				
				break;
		}
	}
	function initMenu() {
		var menus = $("#menuBox").find(".living_menu");
		$("#weixinqr").mouseover(function() {
			$("#QR_tipas").toggle();
		}).mouseout(function() {
			$("#QR_tipas").toggle();
		});
		$("#scrollBox").find(".split:hidden").remove();
		menus.mouseover(function() {
			var w = $(this).hasClass("menu_long") ? "133px" : "103px";
			if (!$(this).hasClass("menu_curr")) {
				$("#menuBox").find(".menu_curr").stop().animate({
					width : "45px"
				}, 500);
			}
			$(this).stop().animate({
				width : w
			}, 500);
		})
		menus.mouseout(function(e) {

			var w = $(this).hasClass("menu_long") ? "133px" : "103px";
			$(this).stop().animate({
				width : "45px"
			}, 500, function() {
				menus.css("width", "");
			});
			$("#menuBox").find(".menu_curr").stop().animate({
				width : w
			}, 500, function() {
				menus.css("width", "");
			});

		})
	}

	function contentResize() {
		var minHeight, minWidth, fsHeight, browserWidth = $(window).width(), browserHeight = $(window).height();
		if (browserWidth <= 980) {
			minWidth = 980;
		}
		minHeight = browserHeight - 160;
		fsHeight = browserHeight;

		$("#globalwrap").each(function() {
			resizeNow(this, minWidth, fsHeight, 0);
		});
		$(".split").each(function() {
			resizeNow(this, minWidth, minHeight, -160, -2, -2);
		});
		$("#coverwrap").each(function() {
			resizeNow(this, minWidth, minHeight, -105, 0);
		});
		$("#videoWrap").each(function() {
			resizeNow(this, minWidth, fsHeight, 0);
		});
		$(".imageWrap").each(function() {
			resizeNow(this, minWidth, fsHeight, 0);
		});
		$("#notesWrap").each(function() {
			var self = $(this);
			if (self.width() >= 800) {
				self.css("width", "800px");
			} else {
				self.css("width", "");
			}
			self.height(browserHeight - 236);
		});
		$(".commentBox").each(function() {
			var self = $(this);
			if (self.width() >= 800) {
				self.css("width", "800px");
			} else {
				self.css("width", "");
			}
			self.height(browserHeight - 236);
		});
		$("#commentIframe").each(function() {
			var self = $(this);
			self.width(self.parent().width() * 0.96);
		})
		$(".imageWrap").find("img").each(function() {
			if (this.src != "") {
				if (!this.complete) {
					return;
				}
				resizeImage(this);
			}
		});
		$("#coverwrap").find("img").css({
			width : "",
			height : ""
		}).each(function() {
			var self = $(this), ratio = (self.height() / self.width());
			var wid = self.parent().width();
			var hei = self.parent().height();
			if (!this.complete) {
				return;
			}

			if ((hei / wid) > ratio) {
				resizeHeight(self, hei, ratio);

			} else {
				resizeWidth(self, wid, ratio);
			}
			self.css('left', (wid - self.width()) / 2);
			self.css('top', (hei - self.height()) / 2);
		})
		$(".recommBox").find("img").css({
			width : "",
			height : ""
		}).each(function() {
			var self = $(this), ratio = (self.height() / self.width()).toFixed(2);
			var wid = self.parent().width();
			var hei = self.parent().height();
			if (!this.complete) {
				return;
			}
			if ((hei / wid) > ratio) {
				resizeHeight(self, hei, ratio);

			} else {
				resizeWidth(self, wid, ratio);
			}

			self.css('left', (wid - self.width()) / 2);

			self.css('top', (hei - self.height()) / 2);
		});
	}

	function pgvGo() {
		if ( typeof (pgvMain) == 'function') {
			pvRepeatCount = 1;
			vsPgvCol = "icenter";
			pvCurDomain = location.hostname;
			pvCurUrl = location.pathname;
			pgvMain();
		}
	}

	function callThumb() {
		var str = "";
		for (var i = 0; i < imgs.length; i++) {
			str += '<a href="javascript:void(0)" class="thumbImg" onclick="imgScrollTo(' + i + ')">';
			str += '<img src="' + imgs[i].url + '" />';
			str += '</a>';
		};

		if ($("#thumbBox .loading").html() == "") {
			$("#thumbWrap").find(".loading").html(str);
			$("#thumbBox").slideToggle("fast", thumbWriteDone);
			return;
		}
		$("#thumbBox").slideToggle("fast");
		function thumbWriteDone() {
			selectThumbImg(currImg);
			if (isMobile) {
				var thumbScroll = new iScroll('thumbWrap', {
					momentum : false,
					bounce : false,
					snap : "a.thumbImg",
					vScroll : false,
					hScrollbar : false
				});
				$("#thumbBox").find('.arrL').click(function() {
					thumbScroll.scrollToPage("prev");
				});

				$("#thumbBox").find('.arrR').click(function() {
					thumbScroll.scrollToPage("next");
				});
			} else {
				$("#thumbWrap").jcarousel();
				$("#thumbWrap").jcarousel("reload");
				$("#thumbBox").find('.arrL').click(function() {
					$("#thumbWrap").jcarousel("scroll", "-=1");
				});

				$("#thumbBox").find('.arrR').click(function() {
					$("#thumbWrap").jcarousel("scroll", "+=1");
				});
			}
			$("#thumbWrap img").each(function() {
				resizeImage(this, 90, 60);
			})
		}

	}

	var toolScroll = function(n) {
		var top = $("#topBox"), copyRight = $("#copyrightbox");
		if (n == 0) {
			top.show();
			copyRight.show();
		} else if (n == 1) {
			top.hide();
			copyRight.hide();
		} else if (n == 2) {
			top.show();
			copyRight.hide();
		}
		;

	}
	/*$("#contentwrap").click(function() {
	 $("#topBox").animate({
	 height : 0
	 }, 1000);
	 })*/

	function splitScrollDone(target) {
		var isImage = target.hasClass("imageWrap"), isVideo = target.attr("id") == "videoWrap", isFullScreen = isImage || isVideo;
		$("#menuBox").find(".living_menu").removeClass("menu_curr");
		pgvGo();
		if (isFullScreen) {
			if ($("#videoWrap").length > 0) {
				$("#fullScreenMenu").find(".fs_video").show();
			}
			if (isImage) {
				$("#pics").addClass("menu_curr");
				$("#pageNum").find(".currNum").html(parseInt(target.attr("imgindex")) + 1);
				$("#descWrap").html("<p>" + imgs[target.attr("imgindex")].imgcontent + "</p>");
				if (!isMobile) {
					target.prev(".imageWrap").find("img").unbind().load(function() {
						$(this).show();
						resizeImage(this);
					});
					target.next(".imageWrap").find("img").unbind().load(function() {
						$(this).show();
						resizeImage(this);
					});
					target.prev(".imageWrap").find("img").attr("src", target.prev().find("img").attr("_src"));
					target.next(".imageWrap").find("img").attr("src", target.next().find("img").attr("_src"));
					target.prev(".imageWrap").find("img").each(function() {
						if (!this.complete) {
							return;
						}
						$(this).show();
						resizeImage(this);
					});

				}
				target.find("img").unbind().load(function() {
					$(this).show();
					resizeImage(this);
				});
				target.find("img").attr("src", target.find("img").attr("_src"));

				target.find("img").each(function() {
					if (!this.complete) {
						return;
					}
					$(this).show();
					resizeImage(this);
				});

				$("#fullScreenMenu").find(".fs_download").hide();
				currImg = target.attr("imgindex")
				selectThumbImg(currImg);
				if ($("#imgDesc").attr("hasShow") == "true") {
					return;
				}

				callVideoPlay(0);
				callImgDesc(1);
				callShare(1);
				callImgDescButton(0);
			} else {
				$("#video").addClass("menu_curr");
				$("#fullScreenMenu").find(".fs_download").attr("href", $("#video_player").attr("data-url")).show();
				$(".imageWrap").find("img").hide().attr("src", "");
				callVideoPlay(1);
				callImgDesc(0);
				callShare(0);
				callImgDescButton(0);
			}
			callFullScreenMenu(1);
			toolScroll(1);
		} else {
			if (target.hasClass("donation")) {
				$("#menuBox").find(".living_menu").removeClass("menu_curr");
				$("#donation").addClass("menu_curr");
			} else if (target.hasClass("wordBox")) {
				$("#text").addClass("menu_curr");
			} else if (target.hasClass("recom")) {
				$("#recom").addClass("menu_curr");
			} else if (target.hasClass("comment")) {
				$("#comment").addClass("menu_curr");
			} else if (target.attr("id") == "coverwrap") {
				$("#pics").addClass("menu_curr");
			}
			if (isMobile) {
				$(".imageWrap").find("img").hide().attr("src", "");
			}
			callVideoPlay(0);
			callImgDesc(0);
			callShare(0);
			callImgDescButton(0);
			callFullScreenMenu(0);
			if (target.attr("id") == "coverwrap") {
				toolScroll(2);
				return;
			}
			toolScroll(0);
		}
	}

	function selectThumbImg(n) {
		var thumb = $("#thumbWrap").find(".thumbImg");
		for (var i = 0; i < thumb.length; i++) {
			if (n == i) {
				$(thumb[i]).addClass("curr");
			} else {
				$(thumb[i]).removeClass("curr");
			}
		}
	}

	function mobileDev() {
		var myScroll = $('#scrollWrap'), notesScroll = $("#notesScroll"), commentsScroll = $("#commentsScroll");

		for (var p in menuHidden) {
			if (!Object.hasOwnProperty(p)) {
				if (menuHidden[p] == 0) {
					$("#" + p).remove();
					$(".fs_" + p).remove();
				}
			}
		}

		myScroll = new iScroll('scrollWrap', {
			momentum : false,
			bounce : false,
			snap : "div.split",
			vScroll : false,
			hScrollbar : false,
			onBeforeScrollStart : function(e) {
			},
			onScrollMove : function(e) {
				e.preventDefault();
			},
			onScrollEnd : function() {
				var target = $(this.scroller).children().eq(this.currPageX);
				if (this.currPageX == 0) {
					showAlert("\u5df2\u7ecf\u662f\u7b2c\u4e00\u9875\uff01");
				} else if (this.currPageX == this.pagesX - 1) {
					showAlert("\u5df2\u7ecf\u662f\u6700\u540e\u4e00\u9875\uff01");
				}
				splitScrollDone($(target));
			}
		});

		if (notesScroll.length > 0) {
			notesScroll = new iScroll('notesScroll', {
				momentum : true,
				bounce : true,
				hScroll : false,
				hScrollbar : false,
				onBeforeScrollStart : function() {
				},
				onScrollMove : function(e) {
					var that = this;
					if (that.absDistX < that.absDistY + 50) {
						e.stopPropagation();
					} else if (that.absDistY > that.absDistX + 50) {
						e.stopPropagation();
					}
				}
			});
		}

		if (commentsScroll.length > 0) {
			commentsScroll = new iScroll('commentsScroll', {
				momentum : true,
				bounce : true,
				hScroll : false,
				hScrollbar : false,
				onBeforeScrollStart : function(e) {
				},
				onScrollMove : function(e) {
					var that = this;
					if (that.absDistX < that.absDistY + 50) {
						e.stopPropagation();
					} else if (that.absDistY > that.absDistX + 50) {
						e.stopPropagation();
					}
				}
			});
		}

		$('.jcarousel-control-prev').click(function() {
			myScroll.scrollToPage("prev");
		});

		$('.jcarousel-control-next').click(function() {
			myScroll.scrollToPage("next");
		});

		window["screenScrollTo"] = function(n) {
			myScroll.scrollToPage(n, 0);
		}
		window["imgScrollTo"] = function(n, m) {
			selectThumbImg(n);
			myScroll.scrollToPage($(myScroll.scroller).find(".split").index($(".imageWrap[imgindex=" + n + "]")[0]), 0);
		}
		showAlert("\u8bd5\u8bd5\u6eda\u52a8\u9f20\u6807\u67e5\u770b");
	}

	function desktopDev() {
		var scrollObj = $('#scrollWrap');
		for (var p in menuHidden) {
			if (!Object.hasOwnProperty(p)) {
				if (menuHidden[p] == 0) {
					$("#" + p).remove();
					$(".fs_" + p).remove();
				}
			}
		}
		scrollObj = $('#scrollWrap').jcarousel();
		function scrollDone(e, carousel) {
			splitScrollDone(carousel.target());
		}

		window["screenScrollTo"] = function(n) {
			scrollObj.jcarousel("scroll", n);
		}
		window["imgScrollTo"] = function(n, m) {

			if (m == "next") {
				$("#thumbWrap").jcarousel("scroll", "+=1");
				return;
			} else if (m == "prev") {
				$("#thumbWrap").jcarousel("scroll", "-=1");
				return;
			}
			;
			selectThumbImg(n);
			$('.jcarousel').jcarousel("scroll", $(".imageWrap[imgindex=" + n + "]"));
			$("#thumbWrap").jcarousel("scroll", n);
		}

		scrollObj.on('jcarousel:animateend', scrollDone);
		function prev(callback) {
			if (!scrollObj.jcarousel("hasPrev")) {
				showAlert("\u5df2\u7ecf\u662f\u7b2c\u4e00\u9875\uff01");
				return;
			}
			scrollObj.jcarousel('scroll', '-=1');
		}

		function next(callback) {
			if (!scrollObj.jcarousel("hasNext")) {
				showAlert("\u5df2\u7ecf\u662f\u6700\u540e\u4e00\u9875\uff01");
				return;
			}
			scrollObj.jcarousel('scroll', '+=1');
		}


		$('.jcarousel-control-prev').click(function() {
			prev()
		});

		$('.jcarousel-control-next').click(function() {
			next()
		});
		$('#scrollWrap').on('mousewheel', function(event, delta) {
			var toE = $(event.target), viewObj, viewHeight;
			if (toE.hasClass("notes") || toE.parents().hasClass("notes") || toE.hasClass("commentsWrap") || toE.parents().hasClass("commentsWrap")) {
				viewObj = toE.parents("#commentsScroll").context.nodeName == "IFRAME" ? $("#commentsScroll") : toE.parents("#notesScroll") || toE.parents("#commentsScroll");
				viewHeight = viewObj.height();
				viewObj = viewObj[0] || viewObj.context;
				event.stopPropagation();
				if (delta == '1' && viewObj.scrollTop == 0) {
					prev(scrollDone && toE.scrollTop() == 0);
				} else if (delta == '-1' && viewObj.scrollTop >= viewObj.scrollHeight - viewHeight) {
					next(scrollDone);
				}

			} else {
				if (delta == '1') {
					prev(scrollDone);
				} else if (delta == '-1') {
					next(scrollDone);
				}
			}
		});
		$(window).keydown(function(e) {
			if (e.which == 39) {
				next(scrollDone);
			} else if (e.which == 37) {
				prev(scrollDone);
			}
		})
		showAlert("\u8bd5\u8bd5\u6eda\u52a8\u9f20\u6807\u67e5\u770b");
	}

	initImgWrap();
	getCommentNum();
	contentResize();
	initMenu();
	if (isMobile) {
		mobileDev();
	} else {
		desktopDev();
	}
	$(window).resize(contentResize);

	if (document.addEventListener)
		document.addEventListener("click", registerZone2, false);
	else if (document.attachEvent)
		document.attachEvent("onclick", registerZone2);
	var gImage;
	function registerZone2(ev, clickType) {
		var loopTryNum = 10;
		var bossID = 1508;
		var column = "living";
		try {
			var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
			var iQQ = (a == null ? "" : unescape(a[2]));
			var purl = '';
			var zoneId = '';
			if ( typeof clickType == 'undefined') {
				var ev = window.event || ev;
				var et = ev.srcElement || ev.target;
				var type = et.tagName;
				if (type != "A" && type != "IMG") {
					return true;
				}

				if (type == "A") {
					purl = et.href;
				} else if (type == "IMG") {
					purl = et.parentNode.href;
				}

				for (var i = loopTryNum - 1, tagNode = et; i >= 0; i--, tagNode = tagNode.parentNode) {
					if (tagNode.attributes['bossZone']) {
						zoneId = tagNode.attributes['bossZone'].nodeValue;
					} else if (tagNode.attributes['bosszone']) {
						zoneId = tagNode.attributes['bosszone'].nodeValue;
					} else if (tagNode.attributes['BossZone']) {
						zoneId = tagNode.attributes['BossZone'].nodeValue;
					} else if (tagNode.attributes['Bosszone']) {
						zoneId = tagNode.attributes['Bosszone'].nodeValue;
					}

					if (zoneId)
						break;
				}
				if (!zoneId)
					return;
			} else {
				zoneId = ev.bossZone;
				purl = ev.url;
			}

			var localUrl = location.href;
			var site = localUrl.substring(7, localUrl.indexOf('.qq.com'));
			site = site.substr(site.lastIndexOf('.') + 1);

			var iurl = 'http://btrace.qq.com/collect?sIp=&iQQ=' + iQQ + '&sBiz=' + column + '&sOp=' + zoneId + '&iSta=&iTy=' + bossID + '&iFlow=&site=' + site + '&sUrl=' + escape(purl) + '&sLocalUrl=' + escape(location.href) + '&articleType=' + '&' + Math.random();
			gImage = new Image(1, 1);
			gImage.src = iurl;
		} catch (e) {
		}
	}


	$.getScript("//mat1.gtimg.com/ping.js", function() {
		if ( typeof (pgvMain) == 'function') {
			pgvMain();
		}
	})
})/*  |xGv00|7a56c3224dced3800e683bacfdc07c90 */