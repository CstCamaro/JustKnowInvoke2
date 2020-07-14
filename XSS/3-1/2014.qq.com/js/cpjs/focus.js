
//½¹µãÍ¼		 
Focus = function(args) {
		return new _Focus(args);
	},
	_Focus = function(args) {
		this.focus = $(args.focus);
		this.slid = this.focus.find(args.bigImg);
		this.imgs = this.focus.find(args.bigImg).find(args.bigTag);
		if (args.txt) {
			this.txt = this.focus.find(args.txt).find(args.txtTag);
		}
		this.left = this.focus.find(args.BTL);
		this.leftHover = args.BTLhover;
		this.rightHover = args.BTRhover;
		this.right = this.focus.find(args.BTR);
		this.nubmer = this.focus.find(args.number).find(args.numberTag);
		this.index = 0;
		this.Timer = args.Timer;
		this.TimeMag = null;
		this.init();
	};
	_Focus.prototype = {
		init: function() {
			var px = this.imgs.eq(0).width(),
			_self = this,
			index = this.index;
			this.slid.css({width:px * this.imgs.length});
			//KK(".focusImgs").css("marginLeft":"-680px")
			this.left.bind("mouseover", function() {
				$(this).toggleClass(_self.leftHover);
				_self.clearAuto();
			}).bind("mouseout", function() {
				$(this).toggleClass(_self.leftHover);
				_self.setAuto(_self.index);
			}).bind("click", function() {
				
				if (_self.index > 0) {
					_self.index--;
					_self.slid.animate({ marginLeft: -px * _self.index},_self.change());
				} else if (_self.index == 0) {
				//alert(_self.imgs.length-2);
					//_self.slid.css({marginLeft: -px * (_self.imgs.length-2)})
					_self.index = _self.imgs.length - 1;
					_self.slid.animate({ marginLeft:-px * _self.index},_self.change());
				}
				
			});

			this.right.bind("mouseover", function() {
				$(this).toggleClass(_self.rightHover);
				_self.clearAuto();
			}).bind("mouseout", function() {
				$(this).toggleClass(_self.rightHover);
				_self.setAuto(_self.index);
			}).bind("click", function() {
				if (_self.index < _self.imgs.length - 1) {
					_self.index++;
					_self.slid.animate({ marginLeft:-px * _self.index},_self.change());
				} else if(_self.index==_self.imgs.length - 1){
					//_self.slid.css({marginLeft:-px * 1})
					_self.index = 0;
					//_self.index = 0;
					_self.slid.animate({ marginLeft:-px * _self.index},function() {
					_self.change();
				});
				}
				//console.log(_self.index);
			});
			this.nubmer.each(function(index,obj) {
				
				$(obj).click(function() {
					_self.slid.animate({ marginLeft:-px * index},
						_self.index = index,
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
			if (next < this.imgs.length - 1) {
				next++;
			} else if(next == this.imgs.length - 1){
				next = 0;
			}
			/*if (this.right.find("img")) {
				this.right.find("img").eq(0).attr("src", this.imgs.eq(next).attr("src"));
				this.left.find("img").eq(0).attr("src", this.imgs.eq(next - 2).attr("src"));
			}*/
			this.nubmer.each(function(index,obj) {
				$(obj).attr("class","");
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
				if (_self.index < _self.imgs.length - 1) {
					_self.index++;
					_self.slid.animate({ marginLeft:-px * _self.index},_self.change());
				} else if(_self.index==_self.imgs.length - 1){
					//_self.slid.css({marginLeft:-px * 1})
					_self.index = 0;
					//_self.index = 0;
					_self.slid.animate({ marginLeft:-px * _self.index},_self.change());
				}
				
			}, _self.Timer)
		},
		clearAuto: function() {
			clearInterval(this.TimeMag);
			this.TimeMag = null;
		}
	}
/*  |xGv00|842fb205db2787b72af4862eb682a9b6 */