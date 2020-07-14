(function($){
	$f = window.$f || {
        is: function(A, _) {
            var $ = Object.prototype.toString.call(_).slice(8, -1).toLowerCase();
            return _ !== undefined && _ !== null && $ === A.toLowerCase()
        },
		sizeOf:function(A){
			if(this.is('array',A)||this.is('string',A)){
				return A.length;
			}else if(this.is('object',A)){
				var _ = 0;
				for(var i in A){_++;}
				return _;
			}else{
				return 0;
			}
		},
		create:function(c,p){
			var _ = this;
			if(_.is("function",c))return new c(p);
		},
		extend:function(a,b){
			return $.extend(a,b);
		}
	};
	//1.slide 
	$f.slide = function(_){
		var options = {
			parent:'body',
			target:'',
			nav:'.nav',
			current:'current',
			start:0,
			auto:false,
			dir:1,
			time:3000,
			duration:1000,
			easing:'swing'
		};
		this.options = {};
		this.init(options,_);
		//this.render();
	};
	$f.slide.prototype = {
		init:function(_a,_b){
			var _ = this,__ = _.options = $f.extend(_a,_b);
			!!__.target&&(_.par = $(__.parent),_.tar = $(__.target,__.parent),_.nav = $(__.nav,__.parent))&&_.render();
		},
		render:function(){
			var _ = this,__ = _.options;
			_.tar.hide().eq(__.start).show().addClass(__.current);
			_.nav.bind('click',function(e,f){
				var _self = this;
				if(!_.CLICK&&!$(_self).hasClass(__.current)){
					var _f = _.nav.index(_.nav.filter('.'+__.current)),_t = _.nav.index(_self);
					_.slideHandler(_f,_t,f);
				}
			}).removeClass(__.current).eq(__.start).addClass(__.current);
			__.auto&&_.timerHandler();
		},
		slideHandler:function(f,t,flag,c){
			var _ = this,__ = _.options;_.CLICK = true ;
			_.nav.eq(f).removeClass(__.current);
			_.nav.eq(t).addClass(__.current);
			_.tar.eq(t).stop(true,false).addClass(__.current).css({"display":"block","left":!!flag?(f>t?"100%":"-100%"):(f>t?"-100%":"100%"),"z-index":1}).animate({left:"0%"},__.duration,__.easing,c);
			_.tar.eq(t).trigger("slideIn");
			_.tar.eq(f).trigger("slideOut");
			if(f<t&&!flag){
				_.tar.eq(t).trigger("slideInPos");
				_.tar.eq(f).trigger("slideOutPos")
			}else{
				_.tar.eq(t).trigger("slideInNeg");
				_.tar.eq(f).trigger("slideOutNeg")
			}

			_.tar.eq(f).stop(true,false).removeClass(__.current).css({"display":"block","z-index":0}).animate({left:!!flag?(f>t?"-100%":"100%"):(f>t?"100%":"-100%")},__.duration,__.easing,function(){
				$(this).hide().trigger("slideOutEnd");
				_.tar.eq(t).trigger("slideInEnd");
				_.CLICK = false;
			});
			_.tar.eq(f).removeClass(__.current);_.tar.eq(t).addClass(__.current);
		},
		slideLeftRightHanler:function(dir){
			var _ = this,__ = _.options;
			var _s = $(_.nav).size(),_i = dir==0?-1:1,_f = $(_.nav).index($(_.nav).filter('.'+__.current)),_t = _f+_i<0?_s-1:_f+_i>=_s?0:_f+_i;
			$(_.nav).eq(_t).trigger("click",(_f+_i<0||_f+_i>=_s)?true:false);
		},
		timerHandler:function(){
			var _ = this,__ = _.options,_timerStop=function(){
				_.timmer & clearTimeout(_.timmer);
			},_timerStart=function(_t){
				_timerStop();
				_.timmer = setTimeout(_timer,_t);
			},_timer=function(){
				_.slideLeftRightHanler(__.dir);
				_timerStart(__.time+__.duration);
			};
			_.par.bind("mouseenter",function(){
				_timerStop();
			}).bind("mouseleave",function(){
				_timerStart(__.time);
			}).trigger("mouseleave");
		}
	};
	
	//2.mask
	$f.mask = function(tar,_){
		if(!$(tar)[0])return;
		var isIE6 = navigator.userAgent.toLowerCase().indexOf("msie 6")>-1;
		var self=this,options = {
			closeElement : '',
			position : 'static',
			align:'center',
			valign:'middle',
			zIndex:1000,
			maskClose : true
		},$mask = $('<div class="f_mask"></div>'),_pos=['fixed','absolute','static'];
		options = $.extend(options,_);
		$mask.attr("id","f_mask_"+(!$f.mask.id?$f.mask.id=0:$f.mask.id++));
		$mask.css({
			width:document.body.scrollWidth,
			height:document.body.scrollHeight,
			position:'absolute',
			backgroundColor:'#000',
			opacity:0.5,
			left:0,top:0,
			zIndex:options.zIndex
		}).appendTo('body');
		!$f.mask.list&&($f.mask.list=[],$(window).bind("resize",function(){
			$('.f_mask').css({width:$('body').width(),
			height:document.body.scrollHeight});
		}));
		$f.mask.list.push(tar);
		switch(options.position){
			case 'fixed':
				$(tar).css({
					position:!!isIE6?'absolute':'fixed',
					left:'50%',top:!!isIE6?$(window).height()/2+$(window).scrollTop():'50%',
					marginLeft:-$(tar).width()/2,marginTop:-$(tar).height()/2,
					'z-index':$f.mask.id+options.zIndex+1
				}).show();
			break;
			case 'absolute':
				$(tar).css({
					position:'absolute',
					left:'50%',top:$(window).height()/2+$(window).scrollTop(),
					marginLeft:-$(tar).width()/2,marginTop:-$(tar).height()/2,
					'z-index':$f.mask.id+options.zIndex+1
				}).show();
			break;
			default:
				$(tar).css({'z-index':$f.mask.id+options.zIndex+1}).show();
			break;
		}
		!!options.closeElement&&$(tar).find(options.closeElement).bind("click",function(){
			self.unmask(tar);
		});
	}
	$f.unmask = function(tar){
		$(tar).hide();
		$('div').remove('.f_mask');
	}
	$f.select = function(tar,_){
		var options = {
			wrapper:'.f_select',
			formInput:'',
			showInput:'.f_select_value',
			optionContainer:'ul',
			option:'li',
			optionVlaue:'',
			optionHoverClass:'hover',
			toggleClass:'open',
			toggle:true,
			index:-1,
			onChange:null,
			context:null
		}
		options = $.extend(options,_);
		$(tar).each(function(index, element) {
			var self = this,_sel;
			$(self).bind('open',function(){
				$(self).addClass('open');
				$(options.optionContainer,self).show();
				!!_sel&&$(_sel).addClass(options.optionHoverClass);
			}).bind('close',function(){
				$(self).removeClass('open');
				$(options.optionContainer,self).hide();
			});
			if(!!options.toggle){
				$(self).hover(function(e){
					$(self).trigger('open');
				},function(e){
					$(self).trigger('close')
				});
			}
			options.opt = options.optionContainer+' '+options.option;
			$(options.optionContainer,self).delegate(options.option,"mouseenter",function(){
				$(options.opt,self).removeClass(options.optionHoverClass);
				$(this).addClass(options.optionHoverClass);
			}).delegate(options.option,"mouseleave",function(){
				$(this).removeClass(options.optionHoverClass);
			}).delegate(options.option,'click',function(){
				$(options.showInput,self).text($(this).text());
				!!options.formInput&&(_temp = $(options.formInput,self).val(),$(options.formInput,self).val(!!options.optionVlaue?$(this).attr(options.optionVlaue):$(this).text()),_temp!=$(options.formInput,self).val()&&!!options.onChange&&(!!options.context?options.onChange.call(options.context):options.onChange.call(self)));
				_sel = this ;
				$(self).trigger('close');
			});
			if(options.index>-1){
				$(options.opt,self).eq(options.index).trigger('click');
			}
		});
	}
}).call(window,jQuery)
/*  |xGv00|7ae45d8e4598a16db0e2effcdf192461 */