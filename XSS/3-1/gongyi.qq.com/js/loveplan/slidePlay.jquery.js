var slidePlay = function(obj){
	this.leftBtnId = obj.leftBtnId;
	this.rightBtnId = obj.rightBtnId;
	this.wrapId = obj.wrapId;
	this.boxId = obj.boxId;
	this.hzw = obj.hzw;
	this.current = 1;
	this.maxscoll = obj.maxscoll;
	this._bind();
}
slidePlay.prototype = {
	play:function(num){
		var tosize = (num-1)*this.hzw;
		var current = (this.current-1)*this.hzw;
		var max = this.hzw;
		var count = 0;
		var tu = '';
		var boxId = this.boxId;
		if(current<tosize){
			tu = 'left';
		}else{
			tu = 'right';
		}

		this.current = num;
		
		function _go(){
			var tmp = Math.floor((max-count)/3);
			if(tmp <= 1){
				tmp = 1;
			}
			count += tmp;
			var nod = $('#'+boxId);
			var x = parseInt(nod.css('left'));
			if(tu == 'right'){
				x = x-tmp;
			}else{
				x = x+tmp;

			}
			try{
				$('#'+boxId).css('left',x+'px');
			}catch(e){}
			if(count>=max){
				try{
					$('#'+boxId).css('left',tosize+'px');
				}catch(e){}
				return;
			}
			setTimeout(_go,50);
		}
		_go();

	},
	_bind:function(){
		(function($A){
			$('#'+$A.leftBtnId).bind('click',function(){$A.pre();});
			$('#'+$A.rightBtnId).bind('click',function(){$A.next();});
		})(this);

	},
	next:function(){
		var num = this.current+1;
		if(num>1)return false;
		this.play(num);
		return true;
	},
	pre:function(){
		var num = this.current-1;
		if(num<=this.maxscoll*-1)return false;
		this.play(num);
		return true;
	},
	def:'l',
	auto:function(t){
		var tim = 5000;
		if(t){
			tim = t;
		}
		if(this.def == 'l'){
			if(!this.next()){
				this.def = 'r';
				this.pre();
			}
		}else{
			if(!this.pre()){
				this.def = 'l';
				this.next();
			}
		}
		var $A =  this;
		setTimeout(function(){$A.auto(tim);},tim);
	}
}
/*  |xGv00|4d24fdc6f73cc293fa7e3fe4fb442fba */