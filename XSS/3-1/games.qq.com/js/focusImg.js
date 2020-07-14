var focusImg = {
	dc : {},
	data : "",
	options : {
		boxId : "focusImgBox",
		step : 20,
		time : 7000
	},
	preIndex : 0,
	isMove : true,
	count : 0,
	playIndex : 0,
	sildeTime : 0,
	autoSildeTimer : "",
	autoSelectTimer : "",
	showTimer : "",
	isShow : true,
	init : function(data, options) {
		if (!data) {
			alert("data is null!");
			return;
		}
		beast.extend(this.options, options);
		this.dc["mainBox"] = beast.getId(this.options["boxId"]);
		this.data = data;
		this.createHtml();
		this.addSimgEvent();
		this.slideEvent();
		this.sildeTime = this.options["time"] * 4;
		this.autoPlay();
	},
	createHtml : function() {
		var data = this.data;
		this.dc["showBox"] = beast.create("div");
		this.dc["showBox"].className = "showBox";
		this.dc["imgBox"] = beast.create("a");
		this.dc["imgBox"].className = "imgBox";
		this.dc["imgBox"].target = "_blank";
		var tempImg = "";
		for (var i = 0; i < data.length; i++) {
			tempImg = beast.create("img");
			tempImg.src = data[i]["img"];
			tempImg.alt = data[i]["title"];
			if (i == 0) {
				tempImg.style.display = "block";
				tempImg.style.zIndex = 2;
				this.dc["imgBox"].href = data[i]["link"];
			}
			this.dc["imgBox"].appendChild(tempImg);
		}
		this.dc["showBox"].appendChild(this.dc["imgBox"]);
		this.dc["mainBox"].appendChild(this.dc["showBox"]);
		this.dc["slideBox"] = beast.create("div");
		this.dc["slideBox"].className = "slideBox";
		this.dc["btnLeft"] = beast.create("div");
		this.dc["btnLeft"].className = "btn_focusImg left_focusImg";
		this.dc["slideBox"].appendChild(this.dc["btnLeft"]);
		this.dc["listBox"] = beast.create("div");
		this.dc["listBox"].className = "listBox";
		this.dc["slideBox"].appendChild(this.dc["listBox"]);
		this.dc["btnRight"] = beast.create("div");
		this.dc["btnRight"].className = "btn_focusImg right_focusImg";
		this.dc["slideBox"].appendChild(this.dc["btnRight"]);
		this.dc["simgBox"] = beast.create("div");
		this.dc["simgBox"].className = "simgBox";
		this.dc["simgBox"].style.left = "0px";
		this.dc["simgList1"] = beast.create("ul");
		this.dc["simgList2"] = beast.create("ul");
		var tempLi = "";
		var tempLi2 = "";
		var tempA = "";
		for (var i = 0; i < data.length; i++) {
			tempA = beast.create("a");
			tempA.href = data[i]["link"];
			tempA.target = "_blank";
			tempLi = beast.create("li");
			if (i == 0) {
				tempLi.className = "here";
			}
			tempImg = beast.create("img");
			tempImg.src = data[i]["simg"];
			tempImg.alt = data[i]["title"];
			tempA.appendChild(tempImg);
			tempLi.appendChild(tempA);
			this.dc["simgList1"].appendChild(tempLi);
			tempLi2 = tempLi.cloneNode(true);
			this.dc["simgList2"].appendChild(tempLi2);
		}
		this.dc["simgBox"].appendChild(this.dc["simgList1"]);
		this.dc["simgBox"].appendChild(this.dc["simgList2"]);
		this.dc["listBox"].appendChild(this.dc["simgBox"]);
		this.dc["mainBox"].appendChild(this.dc["slideBox"]);
	},
	closureSelect : function(index) {
		var a = this;
		return function() {
			a.select(index);
			if (a.autoSelectTimer != "") {
				clearInterval(a.autoSelectTimer);
			}
		}
	},
	addSimgEvent : function() {
		var a = this;
		var imgs1 = this.dc["simgList1"].getElementsByTagName("img");
		var imgs2 = this.dc["simgList2"].getElementsByTagName("img");
		for (var i = 0; i < imgs1.length; i++) {
			beast.addEvent(imgs1[i], "mouseover", a.closureSelect(i));
			beast.addEvent(imgs2[i], "mouseover", a.closureSelect(i));
			beast.addEvent(imgs1[i], "mouseout", function() {
						if (a.getNowIndex() != 1) {
							a.autoSelect();
						}
					});
			beast.addEvent(imgs2[i], "mouseout", function() {
						if (a.getNowIndex() != 1) {
							a.autoSelect();
						}
					});
		}
	},
	showImg : function(obj, obj2) {
		var a = this;
		if (a.showTimer) {
			clearInterval(a.showTimer);
		}
		var op = 0;
		obj.style.zIndex = 2;
		obj.style.display = "block";
		obj2.style.zIndex = 0;
		if (beast.isIE) {
			obj.style.filter = "alpha(opacity=0)";
		} else {
			obj.style.opacity = 0;
		}
		a.showTimer = setInterval(function() {
					op += 10;
					if (op >= 100) {
						clearInterval(a.showTimer);
						obj2.style.display = "none";
						obj.style.display = "block";
						op = 100;
					}
					if (beast.isIE) {
						obj.style.filter = "alpha(opacity=" + op + ")";
					} else {
						obj.style.opacity = op * 0.01;
					}
				}, 40);
	},
	select : function(index) {
		var a = this;
		if (a.preIndex == index) {
			return false;
		}
		var lis1 = a.dc["simgList1"].getElementsByTagName("li");
		var lis2 = a.dc["simgList2"].getElementsByTagName("li");
		var imgs = a.dc["imgBox"].getElementsByTagName("img");
		a.dc["imgBox"].href = a.data[index]["link"];
		a.showImg(imgs[index], imgs[a.preIndex]);
		lis1[a.preIndex].className = "";
		lis2[a.preIndex].className = "";
		lis1[index].className = "here";
		lis2[index].className = "here";
		a.preIndex = index;
		a.playIndex = index;
		if (a.getNowIndex() == 1) {
			clearInterval(a.autoSelectTimer);
		}
		a.setSildeTime();
		a.autoSilde();
	},
	slideEvent : function() {
		var a = this;
		beast.addEvent(this.dc["btnLeft"], "click", function() {
					a.move(false);
				});
		beast.addEvent(this.dc["btnRight"], "click", function() {
					a.move(true);
				});
	},
	move : function(flag) {
		var a = this;
		if (a.isMove) {
			clearInterval(a.autoSelectTimer);
			a.isMove = false;
			var slide = this.dc["simgBox"];
			var px = a.options["step"];
			var oneWidth = 316 / 4;
			var totalWidth = oneWidth * this.data.length;
			var left = parseInt(slide.style.left);
			var moveMax = 316;
			var moveWidth = 0;
			var slideTime = "";
			if (flag) {
				slideTimer = setInterval(function() {
							left -= px;
							moveWidth += px;
							slide.style.left = left + "px";
							if (moveWidth > moveMax) {
								a.count += 4;
								left = -(a.count * oneWidth);
								slide.style.left = left + "px";
								clearInterval(slideTimer);
								if (a.count >= this.data.length) {
									a.count = a.count - this.data.length;
									left = -(a.count * oneWidth);
									slide.style.left = left + "px";
								}
								a.select(a.count);
								a.autoSelect();
								a.isMove = true;
							}
						}, 50);
			} else {
				if (left == 0) {
					left = -totalWidth;
					slide.style.left = -totalWidth + "px";
					a.count = Math.abs(left) / oneWidth;
				}
				slideTimer = setInterval(function() {
							left += px;
							moveWidth += px;
							slide.style.left = left + "px";
							if (moveWidth > moveMax) {
								a.count -= 4;
								left = -(a.count * oneWidth);
								slide.style.left = left + "px";
								clearInterval(slideTimer);
								if (a.count < 4) {
									a.count = this.data.length + a.count;
									left = -(a.count * oneWidth);
									slide.style.left = left + "px";
								}
								var firstIndex = a.count;
								if (firstIndex >= a.data.length) {
									firstIndex = firstIndex - a.data.length;
								}
								a.select(firstIndex);
								a.autoSelect();
								a.isMove = true;
							}
						}, 50);
			}
		}
	},
	autoSelect : function() {
		var a = this;
		if (a.autoSelectTimer) {
			clearInterval(a.autoSelectTimer);
		}
		a.autoSelectTimer = setInterval(function() {
					if (a.playIndex == (this.data.length - 1)) {
						a.playIndex = 0;
					} else {
						a.playIndex += 1;
					}
					a.select(a.playIndex);
				}, a.options["time"]);
	},
	autoSilde : function() {
		var a = this;
		if (a.autoSildeTimer) {
			clearInterval(a.autoSildeTimer);
		}
		a.autoSildeTimer = setInterval(function() {
					a.move(true);
				}, this.sildeTime);
	},
	getNowIndex : function() {
		var nowIndex = 0;
		nowIndex = 4 - (this.playIndex - this.count);
		if (nowIndex > (this.data.length - 1)) {
			nowIndex = nowIndex - this.data.length;
		}
		return nowIndex;
	},
	setSildeTime : function() {
		this.sildeTime = this.options["time"] * this.getNowIndex();
	},
	autoPlay : function() {
		this.autoSelect();
		this.autoSilde();
	}
};/* |xGv00|c7b6a5c0e4c899be24d5b78fa9ceeace *//*  |xGv00|ec28b903857afc5ee17508f5aca91163 */