//动态添加焦点图前后各一张
function initFoucs(){
				var kuandu = jQuery(window).width();
				var kuan = document.body.clientWidth + document.documentElement.clientWidth - 1000;
				jQuery('#focus').css({width:kuandu});
				jQuery(".focusBtnL2").css({width:kuan/2});
				jQuery(".focusBtnL2").css({left:-kuan/2});
				jQuery(".focusBtnR2").css({width:kuan/2});
				jQuery(".focusBtnR2").css({right:-kuan/2});
					var picArr = jQuery('#focusImgs'), tit = jQuery('#foucsTit'), titHtml = tit.html();
					var li = jQuery('#focusImgs li'), len = li.length;
					var one = li.eq(0).html(), final = li.eq(len - 1).html();
					
					function LI(str){
						
						return '<li>' + str + '</li>';
					}

				var html = LI(final) +  jQuery('#focusImgs').html() + LI(one);
					picArr.html(html);
				tit.html(tit.html() + '<span></span> <span style="display:none"></span>');
					jQuery('#foucsTit span').eq(0).hide();
				}
//焦点图		 
Focus = function(args) {
		return new _Focus(args);
	},
	_Focus = function(args) {
		this.focus = jQuery(args.focus);
		this.slid = this.focus.find(args.bigImg);
		this.imgs = this.focus.find(args.bigImg).find(args.bigTag);
		if (args.txt) {
			this.txt = this.focus.find(args.txt).find(args.txtTag);
		}
		this.left = this.focus.find(args.BTL);
		this.leftHover = args.BTLhover;
		this.rightHover = args.BTRhover;
		this.right = this.focus.find(args.BTR);
		this.left2 = this.focus.find(args.BTL2);
		this.right2 = this.focus.find(args.BTR2);
		this.nubmer = this.focus.find(args.number).find(args.numberTag);
		this.index = 1;
		this.Timer = args.Timer;
		this.TimeMag = null;
		this.init();
	};
	_Focus.prototype = {
		init: function() {
			//var px = this.imgs.eq(0).width()+10,
			var px = 1000,
			_self = this,
			index = this.index;
			this.slid.css({width:px * this.imgs.length});
			//KK(".focusImgs").css("marginLeft":"-680px")
			this.left.bind("mouseover", function() {
				jQuery(this).toggleClass(_self.leftHover);
				_self.clearAuto();
			}).bind("mouseout", function() {
				jQuery(this).toggleClass(_self.leftHover);
				_self.setAuto(_self.index);
			}).bind("click", function() {
				
				if (_self.index > 1) {
					_self.index--;
					_self.slid.animate({ marginLeft: -px * _self.index},_self.change());
				} else if (_self.index == 1) {
				//alert(_self.imgs.length-2);
					_self.slid.css({marginLeft: -px * (_self.imgs.length-1)})
					_self.index = _self.imgs.length - 2;
					_self.slid.animate({ marginLeft:-px * _self.index},_self.change());
				}
				
			});

			this.right.bind("mouseover", function() {
				jQuery(this).toggleClass(_self.rightHover);
				_self.clearAuto();
			}).bind("mouseout", function() {
				jQuery(this).toggleClass(_self.rightHover);
				_self.setAuto(_self.index);
			}).bind("click", function() {
				if (_self.index < _self.imgs.length - 2) {
					_self.index++;
					_self.slid.animate({ marginLeft:-px * _self.index},_self.change());
				} else if(_self.index==_self.imgs.length - 2){
					_self.slid.css({marginLeft:0})
					_self.index = 1;
					//_self.index = 0;
					_self.slid.animate({ marginLeft:-px * _self.index},_self.change())
					//_self.change();
				
				}
				//console.log(_self.index);
			});
            this.left2.bind("mouseover", function() {
				jQuery(this).toggleClass(_self.leftHover);
				_self.clearAuto();
			}).bind("mouseout", function() {
				jQuery(this).toggleClass(_self.leftHover);
				_self.setAuto(_self.index);
			}).bind("click", function() {
				
				if (_self.index > 1) {
					_self.index--;
					_self.slid.animate({ marginLeft:-px * _self.index},_self.change());
				} else if (_self.index == 1) {
				//alert(_self.imgs.length-2);
					_self.slid.css({marginLeft:-px * (_self.imgs.length-1)})
					_self.index = _self.imgs.length - 2;
					_self.slid.animate({ marginLeft:-px * _self.index},_self.change());
				}
				
			});

			this.right2.bind("mouseover", function() {
				jQuery(this).toggleClass(_self.rightHover);
				_self.clearAuto();
			}).bind("mouseout", function() {
				jQuery(this).toggleClass(_self.rightHover);
				_self.setAuto(_self.index);
			}).bind("click", function() {
				if (_self.index < _self.imgs.length - 2) {
					_self.index++;
					_self.slid.animate({ marginLeft:-px * _self.index},_self.change());
				} else if(_self.index==_self.imgs.length - 2){
					_self.slid.css({marginLeft:0})
					_self.index = 1;
					//_self.index = 0;
					_self.slid.animate({ marginLeft:-px * _self.index},_self.change())
					//_self.change();
				
				}
				
			});
			this.nubmer.each(function(index,obj) {
				
				jQuery(obj).bind("click",function() {
					_self.index = index,
					_self.slid.animate({ marginLeft:-px * index},
						_self.change()
					);
				});
				if (_self.focus.find(".focusShare")) {
					_self.focus.find(".focusShare").eq(index).bind("mouseover", function() {
						_self.clearAuto()
					}).bind("mouseout", function() {
						_self.setAuto(_self.index)
					});
				}
				_self.imgs.eq(index).bind("mouseover", function() {
					_self.clearAuto();
				}).bind("mouseout", function() {
					_self.setAuto(_self.index);
				})
			});

			this.setAuto();
			this.change();
		},
		change: function() {
			var next = this.index,
			_self = this;
			if (next < this.imgs.length - 2) {
				next++;
			} else if(next == this.imgs.length - 2){
				next = 1;
			}
			/*if (this.right.find("img")) {
				this.right.find("img").eq(0).attr("src", this.imgs.eq(next).attr("src"));
				this.left.find("img").eq(0).attr("src", this.imgs.eq(next - 2).attr("src"));
			}*/
			this.nubmer.each(function(index,obj) {
				jQuery(obj).attr("class","");
				_self.imgs.parent().parent().attr("class","");
				/*if (_self.txt) {
					_self.txt.eq(index).hide();
				}*/
			});
			/*if (this.txt) {
				this.txt.eq(_self.index).slideToggle('fast');
			}
			*/
			this.nubmer.eq(_self.index).attr("class","on");
			this.imgs.eq(_self.index).parent().parent().attr("class","on");
			//console.log(this.imgs.eq(_self.index));
		},
		setAuto: function() {
			var _self = this,
			px = this.imgs.eq(0).width();
			this.TimeMag = setInterval(function() {
				if (_self.index < _self.imgs.length - 2) {
					_self.index++;
					_self.slid.animate({ marginLeft:-px * _self.index},_self.change());
				} else if(_self.index==_self.imgs.length - 2){
					_self.slid.css({marginLeft:0})
					_self.index = 1;
					//_self.index = 0;
					_self.slid.animate({ marginLeft:-px * _self.index},_self.change())
					//_self.change();
				}
				
			}, _self.Timer)
		},
		clearAuto: function() {
			clearInterval(this.TimeMag);
			this.TimeMag = null;
		}
	}
/*  |xGv00|51e023931728a100cdc611c1af3bf50d */