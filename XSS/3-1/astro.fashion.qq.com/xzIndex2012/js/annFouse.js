/*
author:annan@tencent.com
*/
var cowboy={};
       cowboy.fn = {
           $$: function (d) {
               return document.getElementById(d);
           },
           addEvent: function (o, handle, fn) {
               if (o.attachEvent) {
                   o.attachEvent('on' + handle, fn);
               } else {
                   o.addEventListener(handle, fn, false);
               }
           }
       };


       function SwitchPic(content,currenIndex,leftCur,rightCur,imgShowBox,thumbnailBox,txtTitle,curOnClass,onEvents,switchNum,showNum,isAuto,speed) {
           this.content = content;
           this.currentIndex = currenIndex;
           this.leftCur = leftCur;
           this.rightCur = rightCur;
           this.imgShowBox = imgShowBox;
           this.thumbnailBox = thumbnailBox;
           this.txtTitle = txtTitle;
           this.curOnClass = curOnClass;
           this.onEvents = onEvents;
           this.switchNum = switchNum;
           this.showNum = showNum;
           this.isAuto = isAuto;
           this.speed=speed;

           this.itemNum=null;
           this.imgShowCont=null;
           this.thumbnailCont= null;
           this.txtTitleCont = null;
           this.opa=0;
           this.effectFlag=null;
           this.autoFlag = null;
           this.oldPos = null;
           this.cardWidth = null;
           this.cardIndex = null;
           this.sflag = null;
           if (!SwitchPic.childs) {
               SwitchPic.childs = [];
           }
           this.ID = SwitchPic.childs.length;
           SwitchPic.childs.push(this);
       }
       SwitchPic.prototype = {
           //初始化
           init: function () {
               this.itemNum = this.content.length;
               var bigPic = thumbPic = txtT = [];

               this.imgShowCont = cowboy.fn.$$(this.imgShowBox);
               this.thumbnailCont = cowboy.fn.$$(this.thumbnailBox);
               this.txtTitleCont = cowboy.fn.$$(this.txtTitle);

               var tempSmallPic = document.createElement('div');

               for (var i = 0; i < this.itemNum; i++) {
                   if (i == this.currentIndex) {
                       bigPic[i] = '<a href="' + this.content[i].slink + '" class="' + this.curOnClass.imgC + '" target="_blank"><img src=' + this.content[i].img1 + '></a>';
                       this.imgShowCont.innerHTML += bigPic[i];

                       thumbPic[i] = '<a href="javascript:;" class="' + this.curOnClass.thumbC + '"><img src=' + this.content[i].img2 + '></a>';
                       tempSmallPic.innerHTML += thumbPic[i];

                       txtT[i] = '<a href="' + this.content[i].slink + '" class="' + this.curOnClass.titC + '" target="_blank">' + this.content[i].title + '</a>';
                       this.txtTitleCont.innerHTML += txtT[i];
                   } else {
                       bigPic[i] = '<a href="' + this.content[i].slink + '" target="_blank"><img src=' + this.content[i].img1 + '></a>';
                       this.imgShowCont.innerHTML += bigPic[i];

                       thumbPic[i] = '<a href="javascript:;"><img src=' + this.content[i].img2 + '></a>';
                       tempSmallPic.innerHTML += thumbPic[i];

                       txtT[i] = '<a href="' + this.content[i].slink + '" target="_blank">' + this.content[i].title + '</a>';
                       this.txtTitleCont.innerHTML += txtT[i];
                   }

               }
               var temp = document.createElement('div');
               temp.style.position = 'relative';
               temp.appendChild(tempSmallPic);
               this.thumbnailCont.appendChild(temp);
               var itemWidth = tempSmallPic.getElementsByTagName('a')[0].offsetWidth;
               this.cardWidth = itemWidth * this.switchNum;
               var tempItemWidth = itemWidth * this.itemNum + 1000;

               this.thumbnailCont.getElementsByTagName('div')[0].getElementsByTagName('div')[0].style.cssText = 'width:' + tempItemWidth + 'px;position:absolute; left:0px;top:0px;';
               var tempItemHeight = this.thumbnailCont.getElementsByTagName('div')[0].getElementsByTagName('div')[0].offsetHeight;
               this.thumbnailCont.getElementsByTagName('div')[0].style.height = tempItemHeight + 'px';
               cowboy.fn.addEvent(this.imgShowCont.parentNode, 'mouseover', Function('SwitchPic.childs[' + this.ID + '].clearAuto()'));
               cowboy.fn.addEvent(this.imgShowCont.parentNode, 'mouseout', Function('SwitchPic.childs[' + this.ID + '].autoPlays()'));

               for (var j = 0; j < this.itemNum; j++) {
                   cowboy.fn.addEvent(this.thumbnailCont.getElementsByTagName('a')[j], this.onEvents, Function('SwitchPic.childs[' + this.ID + '].clickGo(' + j + ')'));
               }

               if (document.getElementById(this.leftCur)) {
                   cowboy.fn.addEvent(document.getElementById(this.leftCur), 'click', Function('SwitchPic.childs[' + this.ID + '].goCardPrev();'));
               }

               if (document.getElementById(this.rightCur)) {
                   cowboy.fn.addEvent(document.getElementById(this.rightCur), 'click', Function('SwitchPic.childs[' + this.ID + '].goCardNext()'));
               }

               this.cardIndex = Math.floor(this.currentIndex / this.switchNum);
               this.oldPos = this.cardIndex
               this.autoPlays();

           },
           //渐变效果
           showEffect: function () {
               if (this.opa < 100) {
                   this.opa += 10;
                   this.imgShowCont.style.filter = 'alpah(opacity=' + this.opa + ')';
                   this.imgShowCont.style.opacity = this.opa / 100;
                   this.effectFlag = setTimeout('SwitchPic.childs[' + this.ID + '].showEffect()', 50);
               } else {
                   clearTimeout(this.effectFlag);
                   this.opa = 0;
               }
           },
           //点击小图切换大图图片
           clickGo: function (n) {
               for (var i = 0; i < this.itemNum; i++) {
                   if (i == n) {
                       this.imgShowCont.getElementsByTagName('a')[i].className = this.curOnClass.imgC;
                       this.thumbnailCont.getElementsByTagName('a')[i].className = this.curOnClass.thumbC;
                       this.txtTitleCont.getElementsByTagName('a')[i].className = this.curOnClass.titC;

                       this.showEffect();

                       this.currentIndex = i;
                   } else {
                       this.imgShowCont.getElementsByTagName('a')[i].className = '';
                       this.thumbnailCont.getElementsByTagName('a')[i].className = '';
                       this.txtTitleCont.getElementsByTagName('a')[i].className = '';
                   }
               }
           },
           //向前
           /*goPrev: function () {
           this.oldIndex = this.currentIndex;
           if (this.currentIndex > 0) {
           this.currentIndex--;
           } else {
           this.currentIndex = this.itemNum - 1;
           }
           this.clickGo(this.currentIndex);
           },*/
           //向后
           goNext: function () {
               if (this.currentIndex < this.itemNum - 1) {
                   this.currentIndex++;
               } else {
                   this.currentIndex = 0;
               }
               this.clickGo(this.currentIndex);
               this.isSwitch('');
           },
           //左侧箭头
           goCardPrev: function () {
               if (this.currentIndex > 0) {
                   this.cardIndex -= 1;

               } else {				   
                   this.cardIndex = Math.floor(this.itemNum / this.switchNum) - 1;
               }
			   if(this.cardIndex<0){
				   this.cardIndex = Math.floor(this.itemNum / this.switchNum) - 1;
				}
               this.isSwitch('prev');
           },
           //右侧箭头
           goCardNext: function () {
               if (this.currentIndex < (this.itemNum - this.switchNum)) {
                   this.cardIndex += 1;
               } else {
                   this.cardIndex = 0;
               }
               this.isSwitch('next');
           },
           //自动
           autoPlays: function () {
               if (this.isAuto == true) {
                   this.autoFlag = setInterval(Function('SwitchPic.childs[' + this.ID + '].goNext()'), this.speed * 1000);
               }
           },
           //清除自动
           clearAuto: function () {
               clearInterval(this.autoFlag);
           },
           //缓动公式
           f: function (a, b, t, d) {
               return a + b * t / d;
           },
           //缓动
           scrolling: function (startPos, durPos) {
               var t = 0;
               var _this = this;
               var time = 15;
               var durTime = 30;
               var flag = null;
               (function () {
                   t++;
                   var temp = _this.f(startPos, durPos, t, time);
                   _this.thumbnailCont.getElementsByTagName('div')[0].getElementsByTagName('div')[0].style.left = temp + 'px';
                   flag = setTimeout(arguments.callee, durTime);

                   if (t > time) {
                       clearTimeout(flag);
                       _this.thumbnailCont.getElementsByTagName('div')[0].getElementsByTagName('div')[0].style.left = startPos + durPos + 'px';
					   flag=null;
                   }
               })();
           },
           isSwitch: function (dir) {
               var switchDot = this.currentIndex % this.switchNum;

               if (switchDot == 0||dir=='prev'||dir=='next') {
                   if (dir == '') {

                       this.cardIndex = Math.floor(this.currentIndex / this.switchNum);

                   }
                   var newPos = -this.cardIndex * this.cardWidth;
                   var dur = newPos - this.oldPos;
                   this.scrolling(this.oldPos, dur);

                   this.currentIndex = this.cardIndex * this.switchNum;
                   if (this.currentIndex >= this.itemNum) {
                       this.currentIndex = 0;
                   }
                   this.clickGo(this.currentIndex);
                   this.oldPos = newPos;
               }
           }

       }
/*  |xGv00|06a28b5d0549d35027e07109a2d203f9 */