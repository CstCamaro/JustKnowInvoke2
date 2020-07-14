/**
 * 带缩略小图的焦点图
 * 
 */
(function($, $$) {
	$.Focus = function(args) {
		return new _Focus(args);
	},
	_Focus = function(args) {
		this.focus = K(args.focus);
		this.slid = this.focus.find(args.bigImg).item(0);
		this.imgs = this.focus.find(args.bigImg).item(0).find(args.bigTag);
		if (args.txt) {
			this.txt = this.focus.find(args.txt).item(0).find(args.txtTag);
		}
		this.left = this.focus.find(args.BTL).item(0);
		this.leftHover = args.BTLhover;
		this.rightHover = args.BTRhover;
		this.right = this.focus.find(args.BTR).item(0);
		this.nubmer = this.focus.find(args.number).item(0).find(args.numberTag);
		this.index = 0;
		this.Timer = args.Timer;
		this.TimeMag = null;
		this.init();
	};
	_Focus.prototype = {
		init: function() {
			var px = this.imgs.item(0).width(),
			_self = this,
			index = this.index;
			this.slid.css("width:" + px * this.imgs.len + "px");

			this.left.bind("mouseover", function() {
				this.toggleClass(_self.leftHover);
				_self.clearAuto();
			}).bind("mouseout", function() {
				this.toggleClass(_self.leftHover);
				_self.setAuto(_self.index);
			}).bind("click", function() {
				if (_self.index > 0) {
					_self.index--;
				} else {
					_self.index = _self.imgs.len - 1;
				}
				_self.slid.go({ marginLeft: "-" + px * _self.index + "px"}, 'fast', '', function() {
					_self.change();
				});
			});

			this.right.bind("mouseover", function() {
				this.toggleClass(_self.rightHover);
				_self.clearAuto();
			}).bind("mouseout", function() {
				this.toggleClass(_self.rightHover);
				_self.setAuto(_self.index);
			}).bind("click", function() {
				if (_self.index < _self.imgs.len - 1) {
					_self.index++;
				} else {
					_self.index = 0;
				}
				_self.slid.go({ marginLeft: "-" + px * _self.index + "px"}, 'fast', '', function() {
					_self.change();
				});
			});

			this.nubmer.each(function(o, i) {
				o.click(function() {
					_self.slid.go({ marginLeft: "-" + px * i + "px" }, 'fast', '', function() {
						_self.index = i;
						_self.change();
					});
				});
				if (_self.focus.find(".focusShare")) {
					_self.focus.find(".focusShare").item(i).bind("mouseover", function() {
						_self.clearAuto()
					}).bind("mouseout", function() {
						_self.setAuto(_self.index)
					});
				}
				_self.imgs.item(i).bind("mouseover", function() {
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
			if (next < this.imgs.len - 1) {
				next += 1;
			} else {
				next = 0;
			}
			if (this.right.find("img")) {
				this.right.find("img").item(0).attr("src", this.imgs.item(next).attr("src"));
				this.left.find("img").item(0).attr("src", this.imgs.item(next - 2).attr("src"));
			}
			this.nubmer.each(function(o, i) {
				o.node.className = "";
				_self.imgs.item(i).parent(2).node.className = "";
				if (_self.txt) {
					_self.txt.item(i).hide();
				}
			});
			if (this.txt) {
				this.txt.item(_self.index).slideToggle('fast');
			}
			this.nubmer.item(_self.index).node.className = "on";
			this.imgs.item(_self.index).parent(2).node.className = "on";
		},
		setAuto: function() {
			var _self = this,
			px = this.imgs.item(0).width();
			this.TimeMag = setInterval(function() {
				if (_self.index < _self.imgs.len - 1) {
					_self.index++;
				} else {
					_self.index = 0;
				}
				_self.slid.go({ marginLeft: "-" + px * _self.index + "px" }, 'fast', '', function() {
					_self.change();
				});
			}, _self.Timer)
		},
		clearAuto: function() {
			clearInterval(this.TimeMag);
			this.TimeMag = null;
		}
	}
})(K, KK)/*  |xGv00|02036f66957e2991eec6797fb53c5c15 */