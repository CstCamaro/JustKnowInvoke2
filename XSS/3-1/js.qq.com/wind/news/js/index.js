var sWidth = $("#focus").width();
var len = $("#focus ul li").length;
var index = 0;
var picTimer;

var btn = "<div class='btnBg'></div><div class='btn'>";
for(var i=0; i < len; i++) {
	btn += "<span></span>";
}
btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
$("#focus").append(btn);
$("#focus .btnBg").css("opacity",0.5);

$("#focus .btn span").css("opacity",1).mouseover(function() {
	index = $("#focus .btn span").index(this);
	showPics(index);
}).eq(0).trigger("mouseover");

$("#focus .preNext").css("opacity",0.8).hover(function() {
	$(this).stop(true,false).animate({"opacity":"0.5"},300);
},function() {
	$(this).stop(true,false).animate({"opacity":"0.8"},300);
});

$("#focus .pre").click(function() {
	index -= 1;
	if(index == -1) {index = len - 1;}
	showPics(index);
});

$("#focus .next").click(function() {
	index += 1;
	if(index == len) {index = 0;}
	showPics(index);
});

$("#focus ul").css("width",sWidth * (len));

//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
$("#focus").hover(function() {
	clearInterval(picTimer);
},function() {
	picTimer = setInterval(function() {
		showPics(index);
		index++;
		if(index == len) {index = 0;}
	},4000); //此4000代表自动播放的间隔，单位：毫秒
}).trigger("mouseleave");

function showPics(index) { //普通切换
	var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
	$("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
	$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
}

//独家策划滚动
var sWidth2 = $("#scrollLeft").width();
var len2 = $("#scrollLeft ul li").length;
var index2 = 0;
var picTimer2;

var btn2 = "<div class='btnBg2'></div><div class='btn2'>";
for(var i=0; i < len2; i++) {
	btn2 += "<span></span>";
}
btn2 += "</div>";
$("#scrollLeft").append(btn2);

$("#scrollLeft .btn2 span").css("opacity",1).mouseover(function() {
	index2 = $("#scrollLeft .btn2 span").index(this);
	showPics2(index2);
}).eq(0).trigger("mouseover");

$("#scrollLeft ul").css("width",sWidth2 * (len2));

$("#scrollLeft").hover(function() {
	clearInterval(picTimer2);
},function() {
	picTimer2 = setInterval(function() {
		showPics2(index2);
		index2++;
		if(index2 == len2) {index2 = 0;}
	},4000); 
}).trigger("mouseleave");

function showPics2(index) { 
	var nowLeft2 = -index2*sWidth2;
	$("#scrollLeft ul").stop(true,false).animate({"left":nowLeft2},300);
	$("#scrollLeft .btn2 span").removeClass("on").eq(index2).addClass("on");
}

//视界鼠标经过js
$("#fourId li").hover(function(){
	$(this).addClass("on").siblings().removeClass("on");
},function(){
	$("#fourId li").removeClass("on")
})


$("#wblList dt").hover(function(){
	$("#wblList dd").hide();
	$("#wblList dt").removeClass("wblOn");
	$(this).addClass("wblOn");
	$(this).next("dd").show();	
})/*  |xGv00|1d9078f8a78a95963500da39cbe629f1 */