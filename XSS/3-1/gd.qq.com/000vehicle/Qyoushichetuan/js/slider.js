function ScrollBox(Context,cScrollPic,sDot,pCur,nCur,cWidth,cHeight,itemWidth,speedTime,auto){
    this.Context=[];
    this.sDot={};
    this.prevCur={};
    this.nextCUr={};
    this.cScrollPic={};
    this.cWidth=800;
    this.cHeight=400;
    this.currentDot=2;
    this._ready="ready";
    this.scrollLength=0;
    this.itemWidth=400;
    this.itemHeight=200;
    this.itemData=[];
    this.itemData[5]=[];
    this.itemData[3]=[];
    this.speed=10;
    this.tweenTime=30;
    this.speedTime = 3000;
    this.auto = false;
}
ScrollBox.prototype = {
//下一个节点
funtureDot: function (currentNum, dir, spaceNum) {
    var funtureNode = 0;
    if (dir == "prev") {
        funtureNode = currentNum - spaceNum;
        if (funtureNode < 0) {
            funtureNode = funtureNode + this.scrollLength;
        }
    } else {
        funtureNode = currentNum + spaceNum;
        if (funtureNode >= this.scrollLength) {
            funtureNode = funtureNode - this.scrollLength;
        }
    }
    return funtureNode;
},
//缓动公式
tween: function (a, b, t, d) {
    return a + b * t / d;
},
//变化数据
changData: function () {
    var spaceWidth = 0;
    var spaceHeight = 0;
    var spaceHeight2 = 0;
    spaceWidth = this.cWidth - this.itemWidth;
    if (this.scrollLength == 3) {
        spaceWidth = spaceWidth / 2;
        spaceHeight = this.itemHeight / 6 / 2;
    } else if (this.scrollLength == 5) {
        spaceWidth = spaceWidth / 4;
        spaceHeight = this.itemHeight / 6 / 2;
        spaceHeight2 = this.itemHeight / 3 / 2;
    }
    this.itemData[5] = [{ dLeft: 0, dWidth: Math.floor(this.itemWidth * 2 / 3), dHeight: Math.floor(this.itemHeight * 2 / 3), dMarginTop: Math.floor(spaceHeight2), dZIndex: 1 }, { dLeft: Math.floor(spaceWidth), dWidth: Math.floor(this.itemWidth * 5 / 6), dHeight: Math.floor(this.itemHeight * 5 / 6), dMarginTop: Math.floor(spaceHeight), dZIndex: 10 }, { dLeft: Math.floor(spaceWidth * 2), dWidth: Math.floor(this.itemWidth), dHeight: Math.floor(this.itemHeight), dMarginTop: 0, dZIndex: 100 }, { dLeft: Math.floor(this.itemWidth + spaceWidth * 3 - this.itemWidth * 5 / 6), dWidth: Math.floor(this.itemWidth * 5 / 6), dHeight: Math.floor(this.itemHeight * 5 / 6), dMarginTop: Math.floor(spaceHeight), dZIndex: 10 }, { dLeft: Math.floor(this.cWidth - this.itemWidth * 2 / 3), dWidth: Math.floor(this.itemWidth * 2 / 3), dHeight: Math.floor(this.itemHeight * 2 / 3), dMarginTop: Math.floor(spaceHeight2), dZIndex: 1}];
    this.itemData[3] = [{ dLeft: 0, dWidth: Math.floor(this.itemWidth * 5 / 6), dHeight: Math.floor(this.itemHeight * 5 / 6), dMarginTop: Math.floor(spaceHeight), dZIndex: 1 }, { dLeft: Math.floor(spaceWidth), dWidth: Math.floor(this.itemWidth), dHeight: Math.floor(this.itemHeight), dMarginTop: 0, dZIndex: 10 }, { dLeft: Math.floor(this.cWidth - this.itemWidth * 5 / 6), dWidth: Math.floor(this.itemWidth * 5 / 6), dHeight: Math.floor(this.itemHeight * 5 / 6), dMarginTop: Math.floor(spaceHeight), dZIndex: 1}];
},
//选择需要类名的元素，返回数组
selectClassName: function (o, className, tagName) {
    var tag = o.getElementsByTagName("div");
    var l = tag.length;
    var r = [];
    for (var i = 0; i < l; i++) {
        var classTag = tag[i].className.split(" ");
        var ll = classTag.length;
        for (var j = 0; j < ll; j++) {
            if (classTag[j] == className) {
                r.push(tag[i]);
            }
        }
    }

    return r;
},
//获取当前状态图片的排列顺序,返回为图片对象的序列号
currentArr: function () {
    var rArr = [];
    var sPicBox = document.getElementById(this.cScrollPic);
    var sPicBoxItem = this.selectClassName(sPicBox, "item", "div");
    for (var i = 0; i < this.scrollLength; i++) {
        for (var j = 0; j < this.scrollLength; j++) {
            var tempLeft = sPicBoxItem[j].style.left;
            tempLeft = tempLeft.replace(/[^\d.]/g, '');
            if (this.itemData[this.scrollLength][i].dLeft == tempLeft) {
                rArr.push(j);
            }
        }
    }
    return rArr;
},
//显示当前点
whichDot: function (n) {
    var m = n + 2;
    if (n == 0) m = this.scrollLength - 1;
    if (n == (this.scrollLength - 1)) m = 0;
    if (n == (this.scrollLength - 2)) m = 1;
    if (n == (this.scrollLength - 3)) m = 2;
    var dot = document.getElementById(this.sDot);
    var dotItem = dot.getElementsByTagName("span");

    var splitBox = document.getElementById(this.cScrollPic);
    var split = this.selectClassName(splitBox, 'item', 'div');

    for (var i = 0; i < this.scrollLength; i++) {
        dotItem[i].className = "";
        split[i].className = "item";
        if (i == m) {
            dotItem[i].className = "on";
            split[i].className = "item current";
        }
    }
    m = null;
},
//滚动开始吧！
scrolling: function (dir, currentone, funtureNode, n, spaceNum, changeLeft, changeWidth, changeHeight, changeMarginTop, changeZIndex, tempLeft, tempWidth, tempHeight, tempMarginTop, tempZIndex) {
    var flag = null;
    if (flag) {
        clearTimeout(flag);
    }
    var sPicBox = document.getElementById(this.cScrollPic);
    var sPicBoxItem = this.selectClassName(sPicBox, "item", "div");

    var ctempLeft = ctempWidth = ctempHeight = ctempMarginTop = ctempZIndex = 0;
    var _this = this;
    var t = 0;

    (function () {
        ctempLeft = _this.tween(tempLeft, changeLeft, t, _this.speed);
        ctempWidth = _this.tween(tempWidth, changeWidth, t, _this.speed);
        ctempHeight = _this.tween(tempHeight, changeHeight, t, _this.speed);
        ctempMarginTop = _this.tween(tempMarginTop, changeMarginTop, t, _this.speed);
        ctempZIndex = _this.tween(tempZIndex, changeZIndex, t, _this.speed);

        sPicBoxItem[n].style.cssText = "left:" + parseInt(ctempLeft) + "px;width:" + parseInt(ctempWidth) + "px;height:" + parseInt(ctempHeight) + "px;margin-top:" + parseInt(ctempMarginTop) + "px;z-index:" + parseInt(ctempZIndex);
        sPicBoxItem[n].getElementsByTagName("img")[0].style.cssText = "width:" + parseInt(ctempWidth) + "px;height:" + parseInt(ctempHeight) + "px";
        t++;
        flag = setTimeout(arguments.callee, _this.tweenTime);
        if (t > _this.speed) {
            sPicBoxItem[n].style.cssText = "left:" + _this.itemData[_this.scrollLength][funtureNode].dLeft + "px;width:" + _this.itemData[_this.scrollLength][funtureNode].dWidth + "px;height:" + _this.itemData[_this.scrollLength][funtureNode].dHeight + "px;margin-top:" + _this.itemData[_this.scrollLength][funtureNode].dMarginTop + "px;z-index:" + _this.itemData[_this.scrollLength][funtureNode].dZIndex;
            sPicBoxItem[n].getElementsByTagName("img")[0].style.cssText = "width:" + _this.itemData[_this.scrollLength][funtureNode].dWidth + "px;height:" + _this.itemData[_this.scrollLength][funtureNode].dHeight + "px";
            t = 0;
            clearTimeout(flag);
            flag = null;
            if (n == (_this.scrollLength - 1)) {
                _this._ready = "ready";
            }
        }
    })();
},
//逐一滚动
act: function (current, dir) {
    if (this._ready == "scrolling") {
        return;
    }
    this._ready = "scrolling";
    var rArr = this.currentArr();
    var changeLeft = changeWidth = changeHeight = changeMarginTop = changeZIndex = 0;
    var tempLeft = tempWidth = tempHeight = tempMarginTop = tempZIndex = 0;
    var spaceNum = 1;
    var tempCurrent = 0;

    if (dir == "") {
        var orgspaceNum = current - this.currentDot;
        spaceNum = Math.abs(orgspaceNum);
        if (orgspaceNum > 0) {
            dir = "next";
        } else if (orgspaceNum < 0) {
            dir = "prev";
        }

    }


    for (var i = 0; i < this.scrollLength; i++) {
        var funtureNode = this.funtureDot(i, dir, spaceNum);
        changeLeft = this.itemData[this.scrollLength][funtureNode].dLeft - this.itemData[this.scrollLength][i].dLeft;
        changeWidth = this.itemData[this.scrollLength][funtureNode].dWidth - this.itemData[this.scrollLength][i].dWidth;
        changeHeight = this.itemData[this.scrollLength][funtureNode].dHeight - this.itemData[this.scrollLength][i].dHeight;
        changeMarginTop = this.itemData[this.scrollLength][funtureNode].dMarginTop - this.itemData[this.scrollLength][i].dMarginTop;
        changeZIndex = this.itemData[this.scrollLength][funtureNode].dZIndex - this.itemData[this.scrollLength][i].dZIndex;

        tempLeft = this.itemData[this.scrollLength][i].dLeft;
        tempWidth = this.itemData[this.scrollLength][i].dWidth;
        tempHeight = this.itemData[this.scrollLength][i].dHeight;
        tempMarginTop = this.itemData[this.scrollLength][i].dMarginTop;
        tempZIndex = this.itemData[this.scrollLength][i].dZIndex;
        this.scrolling(dir, i, funtureNode, rArr[i], spaceNum, changeLeft, changeWidth, changeHeight, changeMarginTop, changeZIndex, tempLeft, tempWidth, tempHeight, tempMarginTop, tempZIndex);
    }
    tempCurrent = this.funtureDot(this.currentDot, dir, spaceNum);
    this.whichDot(tempCurrent);
    this.currentDot = tempCurrent;
},
//load或者reload加载事件
loadAct: function () {
    this.scrollLength = this.Context.length;
    var sPicBox = document.getElementById(this.cScrollPic);
    var elem = elemText = elemLink = elemImg = 0;
    var sDotBox = document.getElementById(this.sDot);
    var dotElem = 0;

    for (var i = 0; i < this.scrollLength; i++) {
        elem = document.createElement("div");
        elem.className = "item";
		
		elemLink=document.createElement('a');
		elemLink.href=this.Context[i].href;
		elemLink.target="_blank";
		elem.appendChild(elemLink);
		
        elemImg = document.createElement("img");
        elemImg.src = this.Context[i].img;
        elemLink.appendChild(elemImg);
		
        elemText = document.createElement("div");
        elemText.className = "iText";
        elem.appendChild(elemText);
		
        sPicBox.appendChild(elem);

        dotElem = document.createElement("span");
        sDotBox.appendChild(dotElem);
    }                                    

    var sPicBoxItem = this.selectClassName(sPicBox, "item", "div");
    this.currentDot = Math.floor(this.scrollLength / 2);
    sPicBoxItem[this.currentDot].className = "item current";
    sDotBox.getElementsByTagName("span")[this.currentDot].className = "on";
    this.changData();

    for (var n = 0; n < this.scrollLength; n++) {
        var _tempData = this.itemData[this.scrollLength][n];
        sPicBoxItem[n].style.cssText = "left:" + _tempData.dLeft + "px;width:" + _tempData.dWidth + "px;height:" + _tempData.dHeight + "px;margin-top:" + _tempData.dMarginTop + "px;z-index:" + _tempData.dZIndex;
        sPicBoxItem[n].getElementsByTagName("img")[0].style.cssText = "width:" + _tempData.dWidth + "px;height:" + _tempData.dHeight + "px";
    }
},
init: function () {
    var flag1 = flag2 = flag3 = flag4 = flag5 = flag6 = null;
    if (flag1 || flag2 || flag3) {
        clearInterval(flag1);
        clearTimeout(flag2);
        clearTimeout(flag3);
        flag1 = flag2 = flag3 = null;
    }
    var _this = this;
    this.loadAct();
    window.onload = function () {
        clearTimeout(flag2);
        clearTimeout(flag3);
        flag2 = flag3 = null;

        if (_this.auto == true) {
            flag1 = setInterval(function () {
                _this.act("", "next");
            }, _this.speedTime);
        }
    };
    document.getElementById(this.pCur).onclick = function () {
        if (flag1 || flag2 || flag3 || flag4 || flag5 || flag6) {
            clearInterval(flag1);
            clearTimeout(flag2);
            clearTimeout(flag3);
            clearTimeout(flag4);
            clearTimeout(flag5);
            clearTimeout(flag6);
            flag1 = flag2 = flag3 = flag4 = flag5 = flag6 = null;
        }
        _this.act("", "prev");
        flag4 = setTimeout(function () {
            if (_this.auto == true) {
                flag1 = setInterval(function () {
                    _this.act("", "next");
                }, _this.speedTime);
            }
        }, 1000);
    }
    document.getElementById(this.nCur).onclick = function () {
        if (flag1 || flag2 || flag3 || flag4 || flag5 || flag6) {
            clearInterval(flag1);
            clearTimeout(flag2);
            clearTimeout(flag3);
            clearTimeout(flag4);
            clearTimeout(flag5);
            clearTimeout(flag6);
            flag1 = flag2 = flag3 = flag4 = flag5 = flag6 = null;
        }
        _this.act("", "next");
        flag4 = setTimeout(function () {
            if (_this.auto == true) {
                flag1 = setInterval(function () {
                    _this.act("", "next");
                }, _this.speedTime);
            }
        }, 1000);
    }

    var sDotBox = document.getElementById(this.sDot);
    var sDotBoxItem = sDotBox.getElementsByTagName("span");
    for (var i = 0; i < this.scrollLength; i++) {
        sDotBoxItem[i].onclick = (function (m) {
            return function () {
                if (flag1 || flag2 || flag3 || flag4 || flag5 || flag6) {
                    clearInterval(flag1);
                    clearTimeout(flag2);
                    clearTimeout(flag3);
                    clearTimeout(flag4);
                    clearTimeout(flag5);
                    clearTimeout(flag6);
                    flag1 = flag2 = flag3 = flag4 = flag5 = flag6 = null;
                }
                _this.act(m, "");
                flag6 = setTimeout(function () {
                    flag1 = setInterval(function () {
                        _this.act("", "next");
                    }, _this.speedTime);
                }, 1000);

            }
        })(i);
    }
}
}/*  |xGv00|4176e8d2f821a20223b85cdad80ce6a5 */