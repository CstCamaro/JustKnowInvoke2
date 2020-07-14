function slider(options){
	var defaults = {
		id:'slide-group',
		action:'left',
		bigFrame:'big-frame',
		bigList:'big-list',
		bigDirection:'left',
		smallFrame:'small-frame',
		smallList:'small-list',
		smallDirection:'left',
		prevBtn:'slide-prev',
		nextBtn:'slide-next',
		arrow:'arrow-up',
		auto:true,
		autoInterval:6000,
		bigStyle:1
	};
	var o = jQuery.extend(defaults, options);

	this.id = o.id;
	this.bigFrame = o.bigFrame;
	this.bigList = o.bigList;
	this.smallFrame = o.smallFrame;
	this.smallList = o.smallList;
	this.bigDirection = o.bigDirection;
	this.smallDirection = o.smallDirection;
	this.prevBtn = o.prevBtn;
	this.nextBtn = o.nextBtn;
	this.slideLength = $("#"+this.smallList+" >li").length;//总的slider数量
	this.currentSlide = 0;
	this.bigFrameHeight = $("#"+this.bigFrame).height();
	this.bigFrameWidth = $("#"+this.bigFrame).width();
	this.smallFrameHeight = $("#"+this.smallFrame).height();
	this.smallFrameWidth = $("#"+this.smallFrame).width();
	var _li = $("#"+this.smallList+" > li").eq(0);
	$('#'+this.smallList).width((_li.outerWidth()+10)*this.slideLength);
	this.smallListHeight = _li.outerHeight(true);
	this.smallListWidth = _li.outerWidth(true);
	this.marginLeft = parseInt($('#'+this.smallList).css('margin-left'));
	this.arrowObj = $('#'+o.arrow);
	this.arrowWidth = parseInt(this.arrowObj.css('borderBottomWidth'));
	this.auto = o.auto;
	this.autoInterval = o.autoInterval;
	//大图切换方式
	this.bigStyle = o.bigStyle;
	var self = this;
	for(var i = 0; i<this.slideLength; i++) {
		$("#"+this.smallList+" > li").eq(i).data("index",i);
		$("#"+this.smallList+" > li").eq(i).bind('click',function(){
			self.go($(this).data("index"));
		});
	};
	//给“上一个”、“下一个”按钮添加动作
	$("#"+this.nextBtn).bind('click',function(){
		self.forward();
		return false;
	});
	$("#"+this.prevBtn).bind('click',function(){
		self.back();
		return false;
	});
	//定论鼠标划过时，自动轮换的处理
	/*
	$("#"+this.frame+",#"+this.Lframe+",#"+this.forwardEle+",#"+this.backEle).bind('mouseover',function(){
		clearTimeout(self.autoExt);
	});
	$("#"+this.frame+",#"+this.Lframe+",#"+this.forwardEle+",#"+this.backEle).bind('mouseout',function(){
		clearTimeout(self.autoExt);
		self.autoExt = setTimeout(function(){
			self.extInterval();
		},self.autoInterval);
	});
	//开始自动轮换
	*/
	if(this.auto){
		this.autoExt = setTimeout(function(){
			self.extInterval();
		},this.autoInterval);
	}
	this.arrowObj.show();
}

//执行运动
slider.prototype.go = function(index){
	this.currentSlide = index;
	if (this.bigDirection == "left"){
		if(this.bigStyle == 2){
			$("#"+this.bigList+" li").hide().eq(index).show();
		}else{
			$("#"+this.bigList).animate({
				marginLeft: (-index*this.bigFrameWidth)+"px"
			}, {duration:600,queue:false});
		}
		
	} else if (this.bigDirection == "top"){
		if (this.bigStyle == 2) {
			$("#" + this.bigList + " li").hide().eq(index).show();
		}
		else {
			$("#" + this.bigList).animate({
				marginTop: (-index * this.bigFrameHeight) + "px"
			}, {
				duration: 600,
				queue: false
			});
		}
	}
	$("#"+this.smallList+" > li").removeClass("current");
	$("#"+this.smallList+" > li").eq(index).addClass("current");
	//对于缩略图的滚动处理
	if(this.smallDirection == "left"){
		var _realLen = this.slideLength*this.smallListWidth;
		var _maskLen = this.smallFrameWidth;
		if(_realLen > _maskLen){
			var spaceWidth = (this.smallFrameWidth - this.smallListWidth)/2;
			var hiddenSpace = this.smallListWidth * this.currentSlide - spaceWidth;
			hiddenSpace-=this.marginLeft;
			var middleSpace = hiddenSpace;
			if (hiddenSpace > this.marginLeft){
				if(hiddenSpace+this.smallFrameWidth <= this.slideLength*this.smallListWidth){
					$("#"+this.smallList).animate({
						marginLeft: -hiddenSpace+"px"
					}, {duration:600,queue:false});
				} else {
					var endHidden = this.slideLength * this.smallListWidth - this.smallFrameWidth;
					endHidden-=this.marginLeft;
					middleSpace = endHidden;
					$("#"+this.smallList).animate({
						marginLeft: -endHidden+"px"
					}, {duration:600,queue:false});
				}
			} else {
				middleSpace = -this.marginLeft/2;
				$("#"+this.smallList).animate({
					marginLeft: this.marginLeft+"px"
				}, {duration:600,queue:false});
			}
			var middleLeft = this.smallListWidth*this.currentSlide-middleSpace+this.smallListWidth/2;
			middleLeft -= this.arrowWidth;
			this.arrowObj.css('left',middleLeft+'px');
		}
	} else if (this.smallDirection == "top"){
		if(this.slideLength * this.smallListHeight > this.smallFrameHeight){
			var spaceHeight = (this.smallFrameHeight - this.smallListHeight)/2;
			var hiddenSpace = this.smallListHeight * this.currentSlide - spaceHeight;
			if (hiddenSpace > 0){
				if(hiddenSpace + this.smallFrameHeight <= this.slideLength*this.smallListHeight){
					$("#"+this.smallList).animate({
						marginTop: -hiddenSpace+"px"
					}, {duration:600,queue:false});
				} else {
					var endHidden = this.slideLength*this.smallListHeight - this.smallFrameHeight;
					$("#"+this.smallList).animate({
						marginTop: -endHidden+"px"
					}, {duration:600,queue:false});
				}
			} else {
				$("#"+this.smallList).animate({
					marginTop: "0px"
				}, {duration:600,queue:false});
			}
		}
	}
}
//前进
slider.prototype.forward = function(){
	if(this.currentSlide<this.slideLength-1){
		this.currentSlide += 1;
		this.go(this.currentSlide);
	}else {
		this.currentSlide = 0;
		this.go(0);
	}
}
//后退
slider.prototype.back = function(){
	if(this.currentSlide>0){
		this.currentSlide -= 1;
		this.go(this.currentSlide);
	}else {
		this.currentSlide = this.slideLength-1;
		this.go(this.slideLength-1);
	}
}
//自动执行
slider.prototype.extInterval = function(){
	if(this.currentSlide<this.slideLength-1){
		this.currentSlide += 1;
		this.go(this.currentSlide);
	}else {
		this.currentSlide = 0;
		this.go(0);
	}
	var self = this;
	this.autoExt = setTimeout(function(){
		self.extInterval();
	},this.autoInterval);
}/*  |xGv00|952049d6fdc4e9f7cc2422cddee700e1 */