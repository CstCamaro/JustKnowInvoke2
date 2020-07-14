/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3000/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\workspace\\qq_time\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\workspace\\qq_time\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	__webpack_require__(121);
	var QQ = __webpack_require__(123);
	var imgPrefix = 'http://mat1.gtimg.com/ipad/qq_time/imgs/';
	window.data = window.data && window.data.data.list;
	var util = __webpack_require__(108);
	var getImgURL = util.getImgURL;

	/* user */
	var User = {};
	User.getInfo = function () {
		var obj = this.getObj() || {};

		this.obj = obj; //当前节气的数据对象
		this.url = location.href;
		this.title = obj.title || '秋分 | 螃蟹肥，菱角鲜，梧叶舞秋风';
		this.pics = getImgURL(obj.imgUrl || '20170923_qiufen.jpg');

		document.title = this.title;
	};
	/*获取当前主题的对象数据*/
	User.getObj = function () {
		var data = window.data;
		var mobj = window.QA_Config;
		var item,
		    i = 0,
		    len = data.length;

		for (; i < len; i++) {
			item = data[i];
			if (item.date == mobj.date) {
				return item;
			}
		}
	};

	/*article*/
	var Article = {};
	Article.imgPrefix = 'http://mat1.gtimg.com/ipad/qq_time/imgs/';
	Article.init = function () {
		this.render();
		this.renderBanner();
		this.renderMeta();
		this.handleRelate();
		util.renderfooter();
	};
	Article.render = function () {
		var $src = $('#' + (window.QA_Config.domId || 'qaconfig_dom')); //兼容旧的文章子页面片模版
		var $tar = $('#J_article');

		//article
		$tar.html($src.html());
		$src.html('');

		//移动端暂不支持视频
		$("#video1").hide();
		//只在PC端展示的内容节点
		$(".J_onlyPC").hide();
	};
	Article.renderBanner = function () {
		var mobj = User.obj;

		var html = ['<img src="', getImgURL(mobj.imgUrl2 || mobj.imgUrl), '" alt="', mobj.title, '">', '<p class="title">', mobj.title, '</p>'].join('');
		$("#J_banner").html(html);

		var dates = mobj.date.split('-');
		var dhtml = [dates[0], '年', dates[1], '月', dates[2], '日'].join('');
		$("#J_date").html(dhtml);
	};
	Article.renderMeta = function () {
		var meta;
		var mobj = User.obj;

		meta = ['<link rel="apple-touch-icon" href="', getImgURL(mobj.imgUrl), '">', '<meta name="msapplication-TileImage" content="', getImgURL(mobj.imgUrl), '">'].join('');

		$($('head')[0]).append(meta);
	};
	Article.handleRelate = function () {
		if (!window.data) {
			return;
		}

		var data = window.data;
		var mobj = window.QA_Config;
		var item,
		    odata = [],
		    i = 0,
		    len = data.length;
		var flag = true,
		    splitIndex = 0,
		    mdata = [];

		for (; i < len; i++) {
			item = data[i];
			if (item.date == mobj.date) {
				flag = false;
				continue;
			}
			if (!item.murl) {
				continue;
			}

			odata.push(item);
			if (flag) {
				splitIndex++;
			}
		}

		var index = odata.length - splitIndex;
		if (index < 3 && index >= 0) {
			mdata = odata.splice(splitIndex);
			mdata = mdata.concat(odata.splice(0, 3 - index));
		} else {
			mdata = odata.splice(splitIndex, 3);
		}

		this.renderRelate(mdata);
	};
	Article.renderRelate = function (odata) {
		if (!odata || odata.length < 1) {
			return;
		}

		var html = [];
		var first = odata[0];
		var left = odata.splice(1);
		var item;
		html.push(['<h3>相关阅读</h3>', '<a class="m-banner r1" href="', first.murl, '" target="_blank">', '<img src="', getImgURL(first.imgUrl), '" alt="', first.title, '">', '<p class="title">', first.title, '</p>', '</a>'].join(''));

		html.push('<ul class="rleft">');
		for (var i = 0; i < left.length; i++) {
			item = left[i];
			html.push(['<li class="item">', '<a class="item-link1" href="', item.murl, '" target="_blank">', '<img src="', getImgURL(item.imgUrl), '" alt="', item.title, '">', '</a>', '<a class="item-link2" href="', item.murl, '" target="_blank">', '<span class="txt">', item.title, '</span>', '</a>', '</li>'].join(''));
		}
		html.push('</ul');

		$("#J_relate").html(html.join(''));
	};

	/* share */
	var Share = {};
	Share.$con = $("#J_share");
	Share.init = function (beforeback) {
		beforeback && beforeback();
		this.render();
		this.bindEvent();
	};
	Share.bindEvent = function () {
		this.$con.on('click', '[data-action]', function (ele) {
			var action = $(ele.target).data('action');
			Share[action] && Share[action]();
		});
	};
	Share.wx = function () {
		var e = document.createElement("div");

		e.className = "weixin_layout";
		document.body.appendChild(e);
		e.onclick = function () {
			e.style.display = "none";
			clearTimeout(o);
		};
		var o = setTimeout(function () {
			e.style.display = "none";
		}, 1000);
	};
	Share.qzone = function () {
		location.href = ["http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=", User.url, "&site=&title=", User.title, "&pics=", User.pics].join('');
	};
	Share.wb = function () {
		location.href = ["http://service.weibo.com/share/share.php?url=", User.url, "&pic=", User.pics, "&searchPic=false&style=simple&language=zh_cn"].join('');
	};
	Share.getBroswer = function () {
		var e = navigator.userAgent.toLowerCase();

		return {
			iphone: /iphone/.test(e),
			android: /android/.test(e),
			winphone: /windows phone/.test(e),
			qqnews: /qqnews/.test(e),
			weixin: /micromessenger/.test(e),
			mqqbrowser: /mqqbrowser/.test(e),
			qq: /\sqq/.test(e),
			ucbrowser: e.match(/ucbrowser/)
		};
	};
	Share.render = function () {
		if (this.getBroswer().weixin) {
			this.$con.removeClass('m-share-w');
		}
	};

	/* comment */
	Comment = {
		init: function init() {
			this.createIframe();
			this.utilFunc();
			window.cmt_id = window.QA_Config.cmd_id;
		},

		utilFunc: function utilFunc() {
			var curUrl = encodeURIComponent(encodeURIComponent(window.location.href));
			var loginUrl = 'http://ui.ptlogin2.qq.com/cgi-bin/login?hide_close_icon=1&style=9&appid=636014201&s_url=http://kb.qq.com/loginproxy.htm?sourceUrl=' + curUrl + '&target=blank&low_login=0&daid=261&sid=&isLogin=true';

			//检测用户是否登录 拉取头像
			if (QQ.Cookie.get("skey")) {
				var uin = QQ.Cookie.get("uin") || QQ.Cookie.get("luin") || QQ.Cookie.get("pt2qquin") || QQ.Cookie.get("o_cookie") || "";
				var skey = QQ.Cookie.get("skey");

				uin = parseInt(Number(uin.replace("o", ""))).toString();
				User.uin = uin;

				try {
					QQ.LoadScript("http://qfwd.qq.com/?uin=" + uin + "&skey=" + skey + "&func=loginAll&refresh=0&ran=" + Math.random(), function () {}, "utf-8");
				} catch (e) {}
			}

			// 请求一键登录接口成功
			window.loginAll = function (obj) {

				User.Face = obj.Face;
				User.bigFace = obj.Face && obj.Face.replace(/s=40/g, function (word) {
					return 's=100';
				});
				User.nick = obj.nick;
				User.Face = obj.Face;
				//实例化登录框
				document.getElementById('commentIframe').contentWindow.publicLogined(User.uin, User.nick, User.Face);
			};

			// 评论统一回调
			var cmt_css = 'http://mat1.gtimg.com/ipad/qq_time/imgs/m/commentSmall.css';
			window.registerCoralEvent = {
				//site:'video', // 视频为vedio 看比赛为kbs 电脑管家为 pm ---- 频道分离
				//code: 0, // 1.页面为gbk 0为utf-8
				//source: 9,  // 不同平台需要定义此参数
				listHiden: 0, // 不显示评论，只显示评论框 - 奇葩需求  1为不显示 0为显示
				ownStyle: cmt_css, // 私有样式可复写评论样式 // **不推荐
				commentNums: 3, // 首屏默认显示评论条数。默认值 10条 （有可能显示的条数比设置的少，是因为部分评论审核未通过不予显示）
				commentLink: 0, // 0 是不需要链接
				commentHot: 0, // 默认有置顶评论，如果设置为 0 取消置顶评论
				loginEvent: function loginEvent() {
					QQ.LoadScript("https://ui.ptlogin2.qq.com/js/ptloginout.js", function () {
						window.pt_logout.logout(function (n) {
							if (n) {
								//退出登录回调
								document.getElementById('commentIframe').contentWindow.publicLogout();
								window.location.href = loginUrl;
							}
						});
					});
					//login.setLogin(); // 注册登陆事件 ----需要修改
				},
				publicLogined: function publicLogined(uin, nick, headUrl) {// 20130716 登陆成功回调  ----需要执行
					//document.getElementById('commentIframe').contentWindow.publicLogined(window.CONFIG.uin,window.CONFIG.nick,window.CONFIG.Face);
				},
				publicLogout: function publicLogout() {// 退出回调  ----需要执行
					//document.getElementById('commentIframe').contentWindow.publicLogout();
				}
			};
		},

		createIframe: function createIframe() {
			var iframe = document.createElement('iframe');
			iframe.onload = function () {
				User.uin || iframe.contentWindow.publicLogined(User.uin, User.nick, User.Face);
			};
			iframe.setAttribute('frameborder', 'no', 0);
			iframe.setAttribute('id', 'commentIframe');
			iframe.setAttribute('src', 'http://www.qq.com/coral/coralBeta3/coralMainDom3.0.htm');
			iframe.setAttribute('scrolling', 'no');
			iframe.setAttribute('width', '100%');
			iframe.setAttribute('height', '400');
			document.getElementById('np_frame').appendChild(iframe);
		}
	};

	Share.init(function () {
		User.getInfo();
	});
	Article.init();
	Comment.init();

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\workspace\\qq_time\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 3:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\workspace\\qq_time\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\workspace\\qq_time\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	exports.transitionHeight = function (element, time) {
		if (typeof window.getComputedStyle == "undefined") {
			return;
		}

		var height = window.getComputedStyle(element).height;
		element.style.transition = "none"; //reset
		element.style.height = "auto";

		var targetHeight = window.getComputedStyle(element).height;
		element.style.height = height; //设置初始高度
		element.offsetWidth;
		if (time) {
			element.style.transition = "height " + time + "ms";
		}
		element.style.height = targetHeight; //设置目标高度
	};

	exports.handleList = function () {
		var list = window.data.data.list;
		list.forEach(function (item, index, arr) {
			var date = item.date.split('-');
			item.year = parseInt(date[0], 10);
			item.month = parseInt(date[1], 10);
			item.day = parseInt(date[2], 10);
		});
	};

	/*
	 *@param prefix | String | 控制url的前缀目录名称
	 *@param suffix | String | 控制文件的扩展名
	 */
	exports.getImgURL = function (url, prefix, suffix) {
		var reg = /^http(s)*:\/\//;
		prefix = prefix || 'http://mat1.gtimg.com/ipad/qq_time/imgs/';

		if (reg.test(url)) {
			return url;
		} else {
			if (/\.\w+$/.test(url)) {
				// 如果存在格式扩展名，则将原定的扩展名去掉
				suffix = '';
			}

			return [prefix, url, suffix || ''].join('');
		}
	};

	exports.getFullYear = function () {
		if (window.curDateObj) {
			return curDateObj.getFullYear();
		} else {
			return new Date().getFullYear();
		}
	};

	exports.renderfooter = function () {
		var mfooter = 'Copyright ©' + this.getFullYear() + ' Tencent.';
		$ && $(".J_footer").html(mfooter);
	};

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\workspace\\qq_time\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "util.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(122);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	exports.push([module.id, "@charset \"UTF-8\";\n* {\n  margin: 0;\n  padding: 0;\n  outline: none;\n  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n  -webkit-touch-callout: none;\n  background: linear-gradient(180deg, transparent, transparent); }\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section, summary {\n  display: block; }\n\nhtml {\n  font-size: 12px;\n  color: #666;\n  font-family: 'Microsoft Yahei'  'Helvetica Neue', Helvetica, STHeiTi, Arial, sans-serif; }\n\nbody {\n  height: 100%;\n  overflow-x: hidden;\n  -webkit-overflow-scrolling: touch; }\n\naudio, canvas, progress, video {\n  display: inline-block;\n  vertical-align: baseline; }\n\nimg {\n  border: none;\n  vertical-align: middle; }\n\na {\n  text-decoration: none;\n  outline: none;\n  /*设置的tap  A标签的时候出现的黑色高亮*/\n  -webkit-tap-highlight-color: transparent; }\n\na:active {\n  outline: 0; }\n\n.clearfix {\n  zoom: 1; }\n\n.clearfix:before,\n.clearfix:after {\n  content: '';\n  display: table; }\n\n.clearfix:after {\n  clear: both; }\n\nem {\n  font-style: normal; }\n\ninput {\n  outline: none; }\n\ninput[type=\"text\"],\ninput[type=\"tel\"] {\n  -webkit-tap-highlight-color: transparent; }\n\n/* 去除iphone ipad 设备默认按钮样式 */\ninput[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"] {\n  -webkit-appearance: none;\n  border-radius: 0; }\n\ninput::-webkit-outer-spin-button,\ninput::-webkit-inner-spin-button {\n  -webkit-appearance: none !important;\n  margin: 0; }\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  color: #cccccc; }\n\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n  color: #cccccc; }\n\ninput::-webkit-input-placeholder, textarea::-webkit-input-placeholder {\n  color: #cccccc; }\n\nhtml {\n  font-size: 100%; }\n\nbody {\n  background: #f5f5f5; }\n\n.container {\n  background: #fff;\n  max-width: 500px;\n  min-height: 1000px;\n  margin: 0 auto;\n  font-family: \"PingFang SC\", sans-serif; }\n\n.header {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 99;\n  background: #fff;\n  width: 100%;\n  box-sizing: border-box;\n  border-bottom: 1px solid #d2d2d2;\n  padding: 7px 0 3px;\n  text-align: center; }\n  .header .back {\n    position: absolute;\n    left: 0;\n    color: #333;\n    margin-left: 10px; }\n  .header .title {\n    display: inline-block;\n    min-width: 120px;\n    width: 7.5rem;\n    height: 22px;\n    background: url(//mat1.gtimg.com/ipad/qq_time/imgs/m/mlogo.png) no-repeat 50%;\n    background-size: contain;\n    text-indent: -9999px; }\n\n.content {\n  padding: 0 0.9375rem;\n  margin-top: 40px; }\n\n.footer {\n  height: 3rem;\n  width: 100%;\n  margin-top: 1.5rem;\n  color: #b3b8bc;\n  text-align: center; }\n\n.header .back:before {\n  content: '\\0020';\n  display: inline-block;\n  background: url(//mat1.gtimg.com/www/mobi/2017/image/shareicons-temp.png) -285px -30px no-repeat;\n  background-size: auto 50px;\n  width: 10px;\n  height: 20px;\n  vertical-align: sub; }\n\n.m-banner, .m-text {\n  margin: 0 -0.9375rem; }\n\n.m-banner {\n  position: relative;\n  margin-top: 40px; }\n  .m-banner img {\n    width: 100%; }\n  .m-banner .title {\n    color: #fff;\n    width: 100%;\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    text-align: center;\n    font-size: 1.3rem;\n    background: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));\n    padding: 2px 0; }\n\n.m-text {\n  margin-top: .5rem; }\n  .m-text .mgr {\n    margin: .5rem .9375rem; }\n  .m-text .logo {\n    display: inline-block;\n    width: 73px;\n    height: 25px;\n    background: url(//mat1.gtimg.com/ipad/qq_time/imgs/m/qqlogo.png) 50% no-repeat;\n    background-size: contain; }\n  .m-text .text {\n    display: inline-block;\n    float: right;\n    color: #888; }\n\n.m-article h2, .m-article h3, .m-article h4, .m-relate h2, .m-relate h3, .m-relate h4 {\n  margin: 1.5rem 0 1rem;\n  font-weight: 700;\n  color: #222;\n  line-height: 1.2; }\n\n.m-article h2, .m-relate h2 {\n  font-size: 1.375rem; }\n\n.m-article h3, .m-relate h3 {\n  font-size: 1.25rem; }\n\n.m-article h4, .m-relate h4 {\n  font-size: 1.125rem; }\n\n.m-article {\n  color: #454545; }\n  .m-article blockquote {\n    font-family: Georgia,Times New Roman,Times,SimSun,serif;\n    padding: .625rem .625rem .625rem .9375rem;\n    margin: 0 0 1rem;\n    border-left: 3px solid #ddd; }\n  .m-article p {\n    line-height: 1.6;\n    font-size: 1rem;\n    margin: 1rem 0; }\n  .m-article img {\n    max-width: 100%;\n    height: auto; }\n  .m-article ul, .m-article li {\n    list-style: none; }\n\n.m-share {\n  margin: 30px 8px 20px; }\n  .m-share .txt {\n    color: #767676;\n    vertical-align: middle;\n    font-weight: 700; }\n  .m-share .icon {\n    display: inline-block;\n    width: 30px;\n    height: 30px;\n    margin-left: 5px;\n    background-image: url(http://mat1.gtimg.com/ipad/qq_time/imgs/shareicon.png);\n    background-size: 120px 30px;\n    background-repeat: no-repeat;\n    vertical-align: middle; }\n  .m-share .share-qzone {\n    background-position: -90px 0; }\n  .m-share .share-wb {\n    background-position: 0 0; }\n  .m-share .share-wx-t {\n    background-position: -60px 0; }\n  .m-share .share-wx-f {\n    background-position: -30px 0; }\n\n.m-share-w .share-wx-t, .m-share-w .share-wx-f {\n  display: none; }\n\n.weixin_layout {\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  background: url(http://mat1.gtimg.com/www/mobi/image/weinxin_share_dialog.png) right top no-repeat rgba(0, 0, 0, 0.8);\n  -webkit-background-size: 234px 95px;\n  -moz-background-size: 234px 95px;\n  background-size: 234px 95px;\n  z-index: 999999; }\n\n.m-relate h3 {\n  margin-top: 0; }\n\n.m-relate .r1 {\n  display: block;\n  margin: 0;\n  box-shadow: 0 0 6px #999; }\n  .m-relate .r1 .title {\n    font-size: 16px; }\n\n.m-relate .rleft .item {\n  display: flex;\n  margin: 1rem 0; }\n\n.m-relate .rleft .item-link1 {\n  flex: 2; }\n\n.m-relate .rleft img {\n  max-width: 100%; }\n\n.m-relate .rleft .item-link2 {\n  flex: 3;\n  color: #454545;\n  padding-left: 5%; }\n  .m-relate .rleft .item-link2 .txt {\n    line-height: 1.6; }\n\n.m-push {\n  margin: 1rem 0; }\n  .m-push .link {\n    display: block;\n    min-height: 50px;\n    width: 100%;\n    background-size: contain; }\n  .m-push img {\n    width: 100%; }\n", ""]);

/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\workspace\\qq_time\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\workspace\\qq_time\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	module.exports = {
	  Cookie: {
	    set: function set(name, value, expires, path, domain) {
	      if (typeof expires == "undefined") {
	        expires = new Date(new Date().getTime() + 3600 * 1000);
	      }
	      document.cookie = name + "=" + escape(value) + (expires ? "; expires=" + expires.toGMTString() : "") + (path ? "; path=" + path : "; path=/") + (domain ? ";domain=" + domain : "");
	    },
	    get: function get(name) {
	      var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	      if (arr != null) {
	        return unescape(arr[2]);
	      }
	      return null;
	    },
	    clear: function clear(name, path, domain) {
	      if (this.get(name)) {
	        document.cookie = name + "=" + (path ? "; path=" + path : "; path=/") + (domain ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
	      }
	    }
	  },
	  LoadScript: function LoadScript(url, callback, charset) {
	    var script = document.createElement("script");
	    script.type = "text/javascript";
	    if (charset) {
	      script.setAttribute("charset", charset);
	    }
	    if (script.readyState) {
	      script.onreadystatechange = function () {
	        if (script.readyState == "loaded" || script.readyState == "complete") {
	          script.onreadystatechange = null;
	          callback();
	          document.getElementsByTagName("head")[0].removeChild(this);
	        }
	      };
	    } else {
	      script.onload = function () {
	        callback();
	        document.getElementsByTagName("head")[0].removeChild(this);
	      };
	    }
	    script.src = url;
	    document.getElementsByTagName("head")[0].appendChild(script);
	  },
	  /* 封装ajax函数
	  * @param {string}opt.type http连接的方式，包括POST和GET两种方式
	  * @param {string}opt.url 发送请求的url
	  * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
	  * @param {object}opt.data 发送的参数，格式为对象类型
	  * @param {function}opt.success ajax发送并接收成功调用的回调函数
	  * 使用示例
	  	ajax({
	     method: 'POST',
	     url: 'test.php',
	     data: {
	         name1: 'value1',
	         name2: 'value2'
	     },
	     success: function (response) {
	        console.log(response)；
	     }
	  });
	  */
	  ajax: function ajax(opt) {
	    opt = opt || {};
	    opt.method = opt.method.toUpperCase() || 'POST';
	    opt.url = opt.url || '';
	    opt.async = opt.async || true;
	    opt.data = opt.data || null;
	    opt.success = opt.success || function () {};
	    var xmlHttp = null;
	    if (XMLHttpRequest) {
	      xmlHttp = new XMLHttpRequest();
	    } else {
	      xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	    }var params = [];
	    for (var key in opt.data) {
	      params.push(key + '=' + opt.data[key]);
	    }
	    var postData = params.join('&');
	    if (opt.method.toUpperCase() === 'POST') {
	      xmlHttp.open(opt.method, opt.url, opt.async);
	      xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
	      xmlHttp.send(postData);
	    } else if (opt.method.toUpperCase() === 'GET') {
	      xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
	      xmlHttp.send(null);
	    }
	    xmlHttp.onreadystatechange = function () {
	      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	        opt.success(xmlHttp.responseText);
	      }
	    };
	  }
	};

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\workspace\\qq_time\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "QQ.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }

/******/ });/*  |xGv00|e57b13b2e6a0a6005a2d597e769411b8 */