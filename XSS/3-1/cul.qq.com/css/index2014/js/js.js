
var tab = function(obj) {
    return new _tab(obj)
},
_tab = function(obj) {
    this.id = jQuery(obj.id);
    this.cardBtn = this.id.find(obj.cardBtn);
    this.cardBtnLi = this.cardBtn.find("span");
    //this.txt = jQuery(obj.txt);
	//this.txtLi = this.txt.find("li");
    this.cardBody = this.id.find(obj.cardBody);
    this.cardBodyDiv = this.cardBody.find("li");
    this.len = this.cardBodyDiv.length;
    this.iNow = 0;
    this.speed = 0;
	//this.oLeft = jQuery(obj.left);
	//this.oRight = jQuery(obj.right);
    this.iWidth = this.cardBodyDiv.eq(0).width();
    this.time = obj.time;
    this.pao = null;
    this.zidong = obj.zidong || false;
    this.run();
    this.int();
};
_tab.prototype = {
    int: function() {
        var _this = this;
        var current = 0;
        this.cardBody.css({width:this.iWidth*this.len});
		  this.cardBtnLi.each(function(index,obj){
		     jQuery(obj).bind("click",function(){
			  _this.iNow = index;
			  _this.yundong(_this.iNow);
			 })
			 jQuery(obj).bind("mouseover",function(){
				_this.clearAuto();								   
			 });
			 jQuery(obj).bind("mouseout",function(){
				_this.run();								   
			 })	
		  }) 
		  /*this.oLeft.bind("click",function(){
			_this.left();							   
		  });
		  this.oLeft.bind("mouseover",function(){
			_this.clearAuto();							   
		  });
		  this.oLeft.bind("mouseout",function(){
			_this.run();							   
		  })
		  this.oRight.bind("click",function(){
			_this.right();							   
		  });
		  this.oRight.bind("mouseover",function(){
			_this.clearAuto();							   
		  });
		  this.oRight.bind("mouseout",function(){
			_this.run();							   
		  })*/
    },
yundong: function(idx) {
    var _this = this;
	for (var i = 0, j = this.cardBtnLi.length; i < j; i++) {
              _this.cardBtnLi[i].className = "";
			 // _this.cardBodyDiv[i].className = "";
     }
			 _this.cardBtnLi[idx].className = "current";
     _this.cardBody.animate({
        left: -_this.iWidth * idx
     },500);
},
left: function() {
        var _this = this;
            if (_this.iNow > 0) {
                _this.iNow--;
				_this.yundong(_this.iNow);
            } else if (_this.iNow == 0) {
                _this.iNow = _this.cardBodyDiv.length - 3;
                _this.yundong(_this.iNow);
            }
			
},
right: function() {
        var _this = this;
            if (_this.iNow < _this.cardBodyDiv.length -3) {
				_this.iNow++;
                _this.yundong(_this.iNow);
				
            } else if (_this.iNow == _this.cardBodyDiv.length-3 ) {
                _this.iNow = 0;
                _this.yundong(0);
            }  
			//console.log(_this.iNow);
},
run: function() {
    var _this = this;
    if (this.zidong) {
        this.pao = setInterval(function() {
            _this.auto()
        },
        _this.time)
    }
},
auto: function() {
    var _this = this;
    this.right();

},
clearAuto: function() {
    var _this = this;
    clearInterval(this.pao)
 }
}

var tab2 = function(obj) {
    return new _tab2(obj)
},
_tab2 = function(obj) {
    this.id = jQuery(obj.id);
    this.cardBody = this.id.find(obj.cardBody);
    this.cardBodyDiv = this.cardBody.find("li");
	this.totalNum = this.id.find(obj.totalNum);
	this.currentNum = this.id.find(obj.currentNum);
	this.oLeft = this.id.find(obj.left);
	this.oRight = this.id.find(obj.right);
    this.len = this.cardBodyDiv.length;
    this.iNow = 0;
    this.speed = 0;
    this.iWidth = this.cardBodyDiv.eq(0).width();
    this.time = obj.time;
    this.pao = null;
    this.zidong = obj.zidong || false;
    this.run();
    this.int();
};
_tab2.prototype = {
    int: function() {
        var _this = this;
        var current = 0;
        this.cardBody.css({width:this.iWidth*this.len});
		this.totalNum.html(this.len);
		this.currentNum.html("1");
		  /*this.cardBtnLi.each(function(index,obj){
		     jQuery(obj).bind("click",function(){
			  _this.iNow = index;
			  _this.yundong(_this.iNow);
			  console.log(index);
			  jQuery(this).addClass("current").siblings().removeClass("current");
			 });
			 jQuery(obj).bind("mouseover",function(){
				_this.clearAuto();								   
			 });
			 jQuery(obj).bind("mouseout",function(){
				_this.run();								   
			 })	
		  }) */
		 this.oLeft.bind("click",function(){
			_this.left();							   
		  });
		  this.oLeft.bind("mouseover",function(){
			_this.clearAuto();							   
		  });
		  this.oLeft.bind("mouseout",function(){
			_this.run();							   
		  })
		  this.oRight.bind("click",function(){
			_this.right();							   
		  });
		  this.oRight.bind("mouseover",function(){
			_this.clearAuto();							   
		  });
		  this.oRight.bind("mouseout",function(){
			_this.run();							   
		  }) 
    },
yundong: function(idx) {
    var _this = this;
	   this.currentNum.html(idx+1);
        _this.cardBody.animate({
            left: -_this.iWidth * idx
        },
        500);
},
left: function() {
        var _this = this;
            if (_this.iNow > 0) {
                _this.iNow--;
				_this.yundong(_this.iNow);
				
            } else if (_this.iNow == 0) {
                _this.iNow = _this.cardBodyDiv.length - 1;
                _this.yundong(_this.iNow);
            }
			
},
right: function() {
        var _this = this;
            if (_this.iNow < _this.cardBodyDiv.length -1) {
                _this.iNow++;
                _this.yundong(_this.iNow);
            } else if (_this.iNow == _this.cardBodyDiv.length-1 ) {
                _this.iNow = 0;
                _this.yundong(0);
            }  
},
run: function() {
    var _this = this;
    if (this.zidong) {
        this.pao = setInterval(function() {
            _this.auto()
        },
        _this.time)
    }
},
auto: function() {
    var _this = this;
    this.right();

},
clearAuto: function() {
    var _this = this;
    clearInterval(this.pao)
 }
};
/*  |xGv00|7bc7292e7771671abb789b93c5617f68 */