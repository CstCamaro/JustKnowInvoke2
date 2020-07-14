/**
 * @author photoqiu
 */
function D(values) {
	return document.getElementById(values);
}
var Browser = {};
Browser.ua = window.navigator.userAgent.toLowerCase();
Browser.ie = /msie/.test(Browser.ua);
Browser.moz = /gecko/.test(Browser.ua);
Browser.tt = /tencent/.test(Browser.ua);
Browser.sa = /safari/.test(Browser.ua);
Browser.op = /opera/.test(Browser.ua);
function addEventHandler(oTarget, sEventType, fnHandler) {
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEventType, fnHandler, false);
	} else if (oTarget.attachEvent) {
		oTarget.attachEvent("on" + sEventType, fnHandler);
	} else {
		oTarget["on" + sEventType] = fnHandler;
	}
};
function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else { 
        oTarget["on" + sEventType] = null;
    }
};
var sportsFrame = {
	currentPage:0,
	totalPage : 0, 
	pageArr : [],
	alphaNums : 0,
	indexPageUrl : '',
	listPageUrl : '',
	frameObj :null,
	divName:'',
	musicUrl:'',
	swfUrl:'',
	ctrlBarObj:null,
	timerNums:0,
	initSystems : function () {
		sportsFrame.totalPage = sportsFrame.pageArr.length;
		sportsFrame.ctrlBarObj = D('bottom');
		sportsFrame.frameObj = D('listShow');
		var handlerDshow = sportsFrame.ctrlBarObj.getElementsByTagName('a');
		addEventHandler(handlerDshow[0], "click", sportsFrame.indexHandler);
		addEventHandler(handlerDshow[1], "click", sportsFrame.endHandler);
		addEventHandler(handlerDshow[2], "click", sportsFrame.listHandler);
		addEventHandler(handlerDshow[3], "click", sportsFrame.musicHandler);
		addEventHandler(handlerDshow[4], "click", sportsFrame.pageDownHandler);
		addEventHandler(handlerDshow[5], "click", sportsFrame.pageUpHandler);
		addEventHandler(document, "keydown", sportsFrame.keyDownHandler);
		sportsFrame.loaderPage(sportsFrame.pageArr[0]);
	},
	indexHandler : function () {
		//sportsFrame.clearPage();
		sportsFrame.currentPage  = 0;
		sportsFrame.loaderPage(sportsFrame.pageArr[0]);
	},
	endHandler : function () {
		var endNums = parseInt(sportsFrame.totalPage, 10) - 1;
		sportsFrame.currentPage  = endNums;
		sportsFrame.loaderPage(sportsFrame.pageArr[endNums]);
	},
	listHandler : function () {
		sportsFrame.currentPage  = 2;
		sportsFrame.loaderPage(sportsFrame.pageArr[2]);
	},
	musicHandler : function () {
		if (D(sportsFrame.div).innerHTML == '') {
			sportsFrame.playerMusic();
		} else {
			sportsFrame.stopMusic();
		}
	},
	pageDownHandler : function () {
		sportsFrame.currentPage++;
		if (sportsFrame.currentPage >= parseInt(sportsFrame.totalPage, 10)) {
			var endNums = parseInt(sportsFrame.totalPage, 10) - 1;
			sportsFrame.currentPage  = endNums;
			sportsFrame.loaderPage(sportsFrame.pageArr[endNums]);
		} else {
			sportsFrame.loaderPage(sportsFrame.pageArr[sportsFrame.currentPage]);
		}
	},
	pageUpHandler : function () {
		sportsFrame.currentPage--;
		if (sportsFrame.currentPage <= 0) {
			sportsFrame.loaderPage(sportsFrame.pageArr[0]);
		} else {
			sportsFrame.loaderPage(sportsFrame.pageArr[sportsFrame.currentPage]);
		}
	},
	initMusic : function () {
		var soMusic = new SWFObject(sportsFrame.swfUrl, "musicCtrl", "1","1", "9.0.28", "#000000"); 
			 soMusic.addParam("allowNetworking", "all"); 
			 soMusic.addParam("allowScriptAccess", "always"); 
			 soMusic.addParam("allowFullScreen", "false"); 
			 soMusic.addParam("scale", "noscale");
			 soMusic.addParam("wmode", "transparent"); 
			 soMusic.addVariable("musicurl", sportsFrame.musicUrl);
			 soMusic.write(sportsFrame.div);
	},
	playerMusic : function () {
		sportsFrame.initMusic();
	},
	stopMusic : function () {
		if (D(sportsFrame.div)) {
			D(sportsFrame.div).innerHTML = '';
		}
	},
	keyDownHandler :function (event) {
		var nKey = -1;
		if (Browser.moz) {
			nKey = event.which
		} else {
			nKey = event.keyCode
		}
		switch(nKey) {
			case 38:case 36:case 104:case 103:case 45:case 96:
				sportsFrame.indexHandler();
			break;
			case 40:case 35:case 98:case 97:case 46:case 110:
				sportsFrame.endHandler();
			break;
			case 33:case 37:case 100:case 105:
				sportsFrame.pageUpHandler();
			break;
			case 34:case 39:case 102:case 99:
				sportsFrame.pageDownHandler();
			break;
		}
	},
	loaderPage : function (url) {
		if (sportsFrame.currentPage == 0) {
			D('nextPage').innerHTML = '<img src="http://mat1.gtimg.com/worldcup/zz0707/blank.gif" title="下一页" class="btn3"  />';
			D('perPage').innerHTML = '<img src="http://mat1.gtimg.com/worldcup/zz0707/blank.gif" title="首页" class="btn3"  />';
		} else if (sportsFrame.currentPage == sportsFrame.totalPage - 1) {
			D('nextPage').innerHTML = '<img src="http://mat1.gtimg.com/worldcup/zz0707/blank.gif" title="最后一页" class="btn3"  />';
			D('perPage').innerHTML = '<img src="http://mat1.gtimg.com/worldcup/zz0707/blank.gif" title="上一页" class="btn3"  />';
		} else {
			D('nextPage').innerHTML = '<img src="http://mat1.gtimg.com/worldcup/zz0707/blank.gif" title="下一页" class="btn3"  />';
			D('perPage').innerHTML = '<img src="http://mat1.gtimg.com/worldcup/zz0707/blank.gif" title="上一页" class="btn3"  />';
		}
		sportsFrame.frameObj.src = url;
		if (typeof sportsFrame.frameObj.window == 'object') {
			sportsFrame.frameObj.window.location.reload(true);
		}
	}
}

/*  |xGv00|40e105fb1067e83d9a37d2faa1cc96ea */