(typeof $ != 'undefined' && $.noConflict && typeof jQuery != 'object') && $.noConflict();
(typeof jQuery != 'undefined' && typeof jQuery.widget === 'function') && jQuery(document).ready(function($){
	var projectName = 'TXPRICE';
	(function(){
		var self,op;
		var doc  = document,_doc = $(doc),port='',win  = window,_win = $(win),_loc = location,_host = _loc.host;
		document.domain = 'qq.com';
		$.widget("ui."+projectName,{
			options:{
					pageInfo: window.TXCAR_infomation,
					jsRoot: (/(lindan|q).qq.com/i.test(location.href)) ? 'js/' : 'http://mat1.gtimg.com/auto/js/car2013/',
					jspath: (/(lindan|q).qq.com/i.test(location.href)) ? 'js/' : 'http://mat1.gtimg.com/auto/js/car2013/cutprice/'+window.TXCAR_infomation.version+'/',
					jsask: (/(lindan|q).qq.com/i.test(location.href)) ? 'js/' : 'http://mat1.gtimg.com/auto/js/car2013/cutprice/20141219/',
					currentProxy: '/index/index/proxy',
		        	getLoading: function(){
			        	var oLoad = $('.showLoading').length ? $('.showLoading') : $('<span class="showLoading"></span>').unbind().click(function(e){
			        	}).appendTo(document.body);
			        	return oLoad;
			        },
	        		validator:{
	        			repeat:{must: true,type: 'blur'},
		    			must:{must: true,type: 'blur'},
		    			tips:{must: false,placeholder: ''},
        				qq:{must: true,placeholder: '请输入QQ号码',max: 18,type: 'blur',regexp: '^[0-9]{5,}$',match: '[^0-9]',error: 'QQ号码仅限5位以上数字'},
				        name:{must: true,placeholder: '仅限中英文字符和_',max : 10,type: 'keyup',regexp: '^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z_])*$',match: '[^\u4E00-\uFA29\uE7C7-\uE7F3a-zA-Z_]',error: '姓名仅限中英文和_'},
						mobile:{must: true,placeholder: '仅限11位手机号码',max: 11,min:11,type: 'blur',regexp: '^1{1}[3|8|5]\\d{9}$',match: '[^0-9]',error: '仅限11位手机号码'},
						zip:{must: true,placeholder: '仅限6位数字',max: 6,type: 'keyup',regexp: '^[0-9]{0,6}$',match: '[^0-9]',error: '仅限6位数字'},
						phone:{must: true,placeholder: '仅限数字和+-',max: 20,type: 'keyup',regexp: '^[0-9+-]+$',match: '[^0-9+-]',error: '仅限数字和+-'},
						url:{must: true,placeholder: '',max: 255,type: 'blur',regexp: '^http(s)?\:\/\/+[^\'\"<>\\\\]+$',error: '网址格式错误,eg: http(s)://www.qq.com'},
						email:{must: true,placeholder: '',max: 255,type: 'blur',regexp: '^[a-zA-Z0-9_.\-]+@+[a-zA-Z0-9_\-]+(\\.[a-zA-Z0-9_\-]+)+$',error: '邮箱格式错误'},
						time:{must: true,placeholder: '日期格式:2013-01-01',regexp: '^\\d{4}\-\\d{2}\-\\d{2}$',max:10,min:0,type:'blur',error:'日期格式错误'},
						auto:{must: false,placeholder: '你可输入100字',max: 100,min: 0,showNumber: true,type: 'keyup'},
						english:{must: false,placeholder: '仅限英文字符',max : 30,type: 'keyup',regexp: '^[a-zA-Z]{0,30}$',match: '[^a-zA-Z]',error: '仅限英文字符'},
						number:{must: false,placeholder: '仅限数字',max : 10,type: 'keyup',regexp: '^[0-9]{0,10}$',match: '[^0-9]',error: '仅限数字'},
						floatnumber:{must: true,placeholder: '',max : 10,type: 'blur',regexp: '^(?:0|[^0]{1}\\d{0,3})(?:\\.\\d{1,2})?$',match: '[^0-9.]',error: '报价范围为0 - 9999.99'}
					},
					QQ:{
			        	check: function(){
							return window.login.loginCheck();
	        			},
	        			login: function(){
	        				return window.userLogin();
	        			},
	        			loginout:function(){
	        				return window.login.loginOut();
	        			},
	        			uin:function(){
							var uin 	= $.cookie('uin');
								uin 	= uin ? uin.replace(/^o0*/,'') : '';
							return $.trim(uin);
	        			},
	        			skey:function(){
							var skey = $.cookie('skey');
							return $.trim(skey);
	        			}
	        		},
	        		tpl:{
	        			layer: '<div id="txcar_layer_box">\
						   			<div class="txcar_layer_content">\
		        						<div class="border">\
						   					<div class="txcar_layer_hd"><h3></h3><a href="javascript:void(0);" class="txcar_layer_close">×</a></div>\
						   					<div class="txcar_layer_bd"></div>\
						   					<div class="txcar_layer_ft"><a href="javascript:void(0);" class="confirm">确定</a><a href="javascript:void(0);" class="cancel">取消</a></div>\
						   				</div>\
						   				<div class="txcar_layer_filter"></div>\
					   				</div>\
					   				<div class="txcar_layer_shadow"><div class="handler"></div><iframe frameborder="0" src="about:blank"></iframe></div>\
					   			</div>'
					}
			},
			_create:function(){
				self = this;
				this.addExtends();
				op   = this.options;
				win[this.widgetName] = this;
				jQuery.extend({widgetName:this.widgetName});
				this.init();
			},
			destroy:function(){
				win[this.widgetName] = null
				delete win[this.widgetName];
			},
			addExtends:function(){
				var userAgent = navigator.userAgent.toString().toLowerCase();
				$.browser = {
					tt  : /tencenttraveler|qqbrowser/i.test( userAgent ),
					ie6 : !-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent),
					ie7 : /msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (doc.documentMode == 7),
					ie8 : /msie.[8]\.0/i.test(userAgent) || (doc.documentMode == 8),
					ie67 : ((!-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent)) || (/msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (doc.documentMode == 7))),
					ie78 : /msie.[7|8]\.0/i.test(userAgent),
					ie678: !$.support.leadingWhitespace,
					ie9 : /msie.[7|9]\.0/i.test(userAgent) && /mozilla\/[4|5]\.0/i.test(userAgent) && /trident\/5\.0/i.test(userAgent) || (doc.documentMode == 9),
					safari: /version\/([\d.]+).*safari/i.test( userAgent ), 
					chrome: /chrome\/([\d.]+).*safari/i.test(userAgent) && /mozilla/i.test(userAgent) ,
					msie: /msie/i.test(userAgent) && !/opera/.test(userAgent),
					ff: /.*(firefox)\/([\w.]+).*/i.test(userAgent),
					opera: window.opera
				};
			//	($.browser.ie678) && self.bindResponse();//调取响应式布局IE6/7兼容
			//	$.ajaxSetup({scriptCharset:'utf-8',ifModified:true,cache:true});
				$.ajaxSetup({scriptCharset:'utf-8',ifModified:false,cache:false});
				
			},
			bindResponse: function(){
				(function resize(){
					var w = _win.width(),cls = '';
					switch(true){
						case w>1399:
							break;
						case (w>959 && w<1400):
							cls = 'w960';
							break;
						case (w>859 && w<960):
							cls = 'w860';
							break;
						case (w>759 && w<860):
							cls = 'w760';
							break;
						case (w>639 && w<760):
							cls = 'w640';
							break;
						case (w>319 && w<640):
							cls = 'w320';
							break;
						case (w>0 && w<320):
							cls = 'w0';
							break;
					}
					var _body = $('body');
					(cls != '') ? _body.removeAttr('class') : (!_body.hasClass(cls) && _body.removeClass().addClass(cls));
					w     = null;
					cls   = null;
					_body = null;
				})();
				_win.resize(resize);
			},
			_stopEvent:function(event){
				if(!event){
					return null;
				}
				(event && event.stopPropagation) ? event.stopPropagation() : (event.cancelBubble = true);
				(event && event.preventDefault) ? event.preventDefault() : (event.returnValue = false);
			},
			Boss: function(a,b,c){
				try{
					win.g_btrace_boss = [];
					var rnd = Math.floor(Math.random()*10);
					win.g_btrace_boss[rnd]=new Image(1,1);
					function trimUin(uin) {
					    var value = '';
					    if (typeof uin == 'string') {
					        uin = uin.replace(new RegExp("[^0-9]", "gm"), "");
					        value = uin.replace(new RegExp("^0+", "gm"), "");
					        if (value == '') value = '';
					    }
					    return value;
					}
					b = typeof b != 'undefined' ? b : 1318;
					var d = trimUin($.cookie("pt2gguin") || $.cookie("luin") || $.cookie("uin") || $.cookie("o_cookie") || $.cookie("uin_cookie"));
					var param = '';
					if(typeof c != 'undefined'){
						if(typeof c == 'object'){
							$.each(c,function(key,value){
								param += '&'+key+'='+value;
							});
						}else{
							param = c;
						}
					}
					
				/*http://btrace.qq.com/collect?sIp=&iQQ="+uin+"&sBiz=serial&sOp="+sOp+"&iSta=&iTy=1710&iFlow=&iValue=";*/
					win.g_btrace_boss[rnd].src="http://btrace.qq.com/collect?sIp=&iQQ="+d+"&sBiz=serial&sOp="+a+"&iSta=&iTy="+b+"&iFlow=0&iValue=" + param+'&_='+this.getRandom();
				}catch(d){}
			},
			Qoss: function(_name){
				win.QosSS.c = new Image();
				var _c = win.QosSS.c;
				_c.onload = (_c.onerror = function() {delete _c;});
				var _t = win.QosSS.t;
				_name = typeof _name != 'undefined' ? _name : win.bellaPages;
				_c.src="http://qos.report.qq.com/collect?type=1&name=bella_"+ _name +"&1="+ (_t[1]- _t[0])+"&2="+ (_t[2]- _t[0])+ "&3="+ (_t[3]- _t[0])+"&4="+ (_t[4]- _t[0])+ "&5="+ (_t[5]- _t[0]);
			},
			sort: function(arr,type,item){
				type = (typeof type != 'undefined' && type == 1) ? 1 : 0;
				switch (type){
					case 0:
						var _sort = function(a,b){
							a = typeof item != 'undefined' && a[item] ? a[item] : a;
							b = typeof item != 'undefined' && b[item] ? b[item] : b;
							return a < b ? -1 : (a==b) ? 0 : 1;
						};
						return arr.sort(_sort); 
						break; 
					default:
						var _sort = function(a,b){
							a = typeof item != 'undefined' && a[item] ? a[item] : a;
							b = typeof item != 'undefined' && b[item] ? b[item] : b;
							return a > b ? -1 : (a==b) ? 0 : 1;
						};
						return arr.sort(_sort); 
						break; 
				}
			},
        	getParam: function(name){
				var reg = new RegExp("[^|&\?]?"+ name +"=([^(&|#)]*)(&|$)"); 
				var r = arguments[1] ? arguments[1].match(reg) : win.location.search.match(reg); 
				if (r!=null) return unescape(r[1]); return null; 
			},
		    getRandom: function(o,n){
				if(arguments.length === 0){
	            	return ((new Date).getTime() / 1);
				}
	        	n = n ? ((o && o.length < n) ? o.length : n) : 1;
        		var randomArray = function(oLen){
					var len = oLen || 100,
						oldsource = [];
					for(var j = 0;j < len ;j++){
						var random = Math.floor(Math.random()*(j+0.9999));
						oldsource[j] = oldsource[random];
						oldsource[random] = j+1;
					}
					if((typeof o != "undefined")){
						var out   = [];
						for (var k = 0,l = oldsource.length; k < l; k++) {
							oldsource[k] && out.push(o[oldsource[k]]);
						}
						return out;
					}else{
						return oldsource;
					}
					
				}
				return randomArray(n);
	        },
			formatParam : function( a ,form, type) {
				function buildParams( prefix, obj, add ) {
					var name;
					var rbracket = /\[\]$/;
					var _my      = arguments.callee;
					if ( $.isArray( obj ) ) {
						$.each(obj, function(i, v) {
							(rbracket.test( prefix )) ? add( prefix, v ) : _my( prefix + "[" + i + "]", v, add );
						});
					} else if ( $.type( obj ) === "object" ) {
						for ( name in obj ) {
							_my( prefix + "[" + name + "]", obj[ name ], add );
						}
					} else {
						add( prefix, obj );
					}
				}
				var prefix,
					s   = [],
					arr = {},
					add = function( key, value ) {
						value = $.isFunction( value ) ? value() : ( value == null ? "" : value );
						if(typeof form != 'undefined'){
							if(typeof type != 'undefined' && type=="object"){
								if(value != '' || ($.isArray(value) && value.length >0)){
									if(arr[key]){
										var _key = arr[key];
										arr[key] = _key + ',' + value;
									}else{
										arr[key] = value;
									}
								}
							}else{
								var oEl = $('input[name="'+key+'"],textarea[name="'+key+'"]');
								if((oEl.length && oEl.val() != '' && oEl.val() != oEl.attr('placeholder')) || !oEl.length){
									s.push('<textarea name="'+key+'" style="height:0;width:0;">'+value+'</textarea>');
								}
							}
						}else{
							s.push('<textarea name="'+key+'" style="height:0;width:0;">'+value+'</textarea>');
						}
					};
				if ( $.isArray( a ) || ( a.jquery && !$.isPlainObject( a ) ) ) {
					$.each( a, function() {
						add( this.name, this.value );
					});
				} else {
					for ( prefix in a ) {
						buildParams( prefix, a[ prefix ], add );
					}
				}
				return s.length > 0 ? s : (!$.isEmptyObject(arr)) ? arr : s;
			},
			getToken: function(){
				 var str=$.cookie('skey')||'';
				 var hash=5381;
				 for(var i=0,len=str.length;i<len;++i){
				  	hash+=(hash<<5)+str.charCodeAt(i);
				 }
				 return hash&0x7fffffff;
			},
			setValidator : function(oForm){
				oForm = $(oForm);
				if(!oForm || !oForm.length){return;}
				var conf = op.validator;
				return ({
					init: function(){
						var _this    = this;
						var selector = [];
						conf && $.each(conf,function(key,value){
							selector.push('[match="'+key+'"]:not(:radio)');
							var oEl = $('[match="'+key+'"]',oForm);
							(oEl.length) && $.each(oEl,function(){
								var _ele = $(this);
								var _placeholder = value.placeholder;
								var _max = _ele.attr('max') || _ele.attr('maxlength');
								if(!isNaN(_max) && _max != value.max && !!_placeholder){
									_placeholder = _placeholder.replace(/\d+/i,_max);
									value.placeholder = _placeholder;
								}
								if((value.must == true && !_ele.attr('must') || _ele.attr('must') == 'true')){
									var oEm  = '<strong title="必填项">*</strong>';
									var oTd  = _ele.parents('td').prev('td');
									!oTd.find('strong,em').length && oTd.html(oEm+oTd.html());
								}
								if(typeof _ele[0].placeholder != 'undefined'){
									(!_ele.attr('placeholder') && _placeholder != '') ? _ele.attr('placeholder',_placeholder) : _ele.attr('placeholder') == 'false' ? (_ele.removeAttr('placeholder')): (_placeholder = _ele.attr('placeholder'));
									if($.browser.ie6){
										($.trim(_ele.val()) == '') && _ele.prop('value',_placeholder);
										($.trim(_ele.val()) == '') && _ele.prop('value',value.placeholder);
									}
								}else{
									
									if(value.placeholder){
										_ele.attr('placeholder',value.placeholder);
										(_ele.val() == '') && _ele.prop('value',value.placeholder);
									}
									
								}
								if(value.max > 0){
									if(_ele.is('input[type="text"],input[type="password"]')){
										(value.max && !_ele.attr('maxlength')) && _ele.attr('maxlength',value.max);
										(value.min && !_ele.attr('min')) && _ele.attr('min',value.min);
									}else{
										(value.max && !_ele.attr('max') && !_ele.attr('maxlength')) ? _ele.attr('max',value.max) : (value.max = _ele.attr('max'));
										(value.min && !_ele.attr('min')) ? _ele.attr('min',value.min) : (value.min = _ele.attr('min'));
										(value.showNumber == true) && _this.getTip(_ele);
									}
								}
							});
						});
						return this.on(selector);
					},
					getErr: function(dom){
	            		var pNode  = dom.parent();
	            		var pTable = dom.parents('table');
	            		var css    = {};
		            	var oErr   = dom.siblings('.errorMsg');
	            		dom.is(':hidden') && (dom = pNode);
	            		dom.is(':checkbox') && (oErr=pNode.siblings('.errorMsg'),pNode=dom.parents('td'),dom = pNode);
	            		if(pTable.length){
							css = {top:dom.position().top + dom.innerHeight() + 2,left:dom.position().left};
							//$.browser.ie6 && (css.left = dom.position().left - pTable.position().left );
	            		}else{
							css = {top:dom.position().top + dom.innerHeight() + 2,left:dom.position().left};
	            		}
		            	if(!oErr.length){
		            		oErr = $('<div class="errorMsg"></div>').css(css).click(function(){
		            			$(this).fadeOut();
		            		}).appendTo(pNode);
		            	}else{
		            		oErr.css(css);
		            	}
		            	pNode=null,pTable=null,css=null,dom=null;
		            	return oErr;
					},
					getMax: function(dom){
				        var max   = dom.attr('max') || dom.attr('maxlength');
			            return max ? parseInt(max) : 0;
					},
					getMin: function(dom){
				        var min   = dom.attr('min');
			            return min ? parseInt(min) : 0;
					},
					getTip: function(dom,flag){
						var oTips = dom.siblings('.showTips');
						var _this = this;
						function setPosition(dom){
							var pNode  = dom.parent();
		            		var pTable = dom.parents('table');
							var oNum  = oTips.find('.num');
							if(pNode.is('td')){
								var css   = {'z-index':4,top:dom.position().top + dom.innerHeight() -oTips.innerHeight() - 2,left:dom.position().left + parseInt(dom[0].clientWidth) - oTips.width() - 5};
							}else{
								pNode.css('position','relative');
								var css   = {top:parseInt(parseInt(dom.innerHeight()) - oTips.innerHeight() - 5),left:parseInt(parseInt(dom[0].clientWidth) - oTips.width()) - 5};
							}
							oTips.css(css);
							($.trim(dom.val()).length > 0  && dom.val() != dom.attr('placeholder')) && oNum.text($.trim(dom.val()).length);
							var _min = _this.getMin(dom);
							var _max = _this.getMax(dom);
							var _val = parseInt(oNum.text());
							((_min > 0  && _min < _val) || (_val > 0 && _max == _val)) && oNum.css('color','#f00');
						}
						if(!oTips.length){
							oTips = $('<span class="showTips"><em class="num">0</em>/<em>'+this.getMax(dom)+'</em></span>').insertAfter(dom);
							setPosition(dom);
						}
						(flag == true) && setPosition(dom);
		            	return oTips;
					},
					check: function(dom,val,_msg,isCheck){
						if(isCheck == true){return;}
					    var _conf = conf[dom.attr('match')];
						if(!!dom.attr('action') && (!!val && op.data.lastValue != val && val != _conf.placeholder)){
			            	var url = dom.attr('action');
			            	if(!/^(http[s]?:\/\/)/i.test(url)){
			            		url = op.pageInfo.host + url;
			            	}
			            	if(!op.dada && !op.data.lastValue){
			            		op.dada = {};
			            		op.data.lastValue = null;
			            	}
			            	if(val == dom.attr('title')){
			            		return (op.data.lastValue = null);
			            	}
			            	op.checkTiemer = setTimeout(function(){
			            		var queue = function(){
			            			var _data = {};
			            			dom[0].blur();
			            			op.data.lastValue = val;
			            			_data[dom.attr('name')] = op.data.lastValue;
			            			var oCheck = op.getCheck();
									var css    = {left: dom.offset().left + dom.innerWidth() + 7,top: dom.offset().top - ((oCheck.innerHeight() - dom.height())/2)};
									oCheck.css(css).show();
			            			self.crossAjax(url,function(oRet){
			            				oCheck.hide();
			            				if(oRet && oRet.ret == 0){
			            					_msg.addClass('succMsg').html(oRet.info).show();
			            				}else{
			            				//	dom[0].focus();
			            					_msg.removeClass('succMsg').html(oRet.info).show();
			            				}
			            			},{data:_data});
			            			_data = null;
			            		}
			            		$(document).queue('getListData',queue).dequeue('getListData');
			            	},500);
			            }
					},
					doExp: function(ele,oTip,conf,type){
						if(conf && conf.regexp != ''){
							if(conf.type == type){
				            	var _rep = new RegExp(conf.regexp,'ig');
								var flag = _rep.test($.trim(ele.val()));
								if(!flag){
									oTip.removeClass('succMsg').empty().html((ele.attr('error') || conf.error)).css('display','inline-block');
									if(conf.match && conf.match != ''){
										_rep = new RegExp(conf.match,'ig');
										var _val = ele.val().replace(_rep,'');
										ele.val(_val);
									}
									return false;
								}else{
									oTip.removeClass('succMsg').empty().hide();
								}
							}else{
								if(conf.match && conf.match != ''){
									var _rep = new RegExp(conf.match,'ig');
									var _val = ele.val().replace(_rep,'');
									ele.val(_val);
								}
							}
			            }
			            return true;
					},
					on: function(selector){
						var _self = this;
						selector  = selector.join(',');
						var event = $.browser.msie ? 'focusin focusout keydown' : 'focusin focusout keyup';
						oForm.off(event,selector).on(event,selector,function(e,S){
							var type  = e.type;
							var _this = $(e.target || e.srcElement);
							var val   = $.trim(_this.val());
					        var _msg  = _self.getErr(_this);
					        var _conf = conf[_this.attr('match')];
							switch(type){
								case 'focusin':
									if(_this.is('select')){
										return;
									}
					            	(val == '' || val == _this.attr('placeholder')) && _this.prop('value','');
					            	_this.css('color','');
					            	_msg.removeClass('succMsg').hide();
									break;
								case 'blur':
								case 'focusout':
									op.checkTiemer && clearTimeout(op.checkTiemer);
					            	if(val == '' || val == _this.attr('placeholder')){
					            		(_this.is('input[type="text"],textarea') && _this.attr('placeholder')) && _this.prop('value',_this.attr('placeholder')).css('color','#999');
					            		if(_this.is('input[type="text"],input[type="password"],input[type="hidden"],select,textarea') && (((_conf.must == true && typeof _this.attr('must') == 'undefined') || _this.attr('must') == 'true'))){
					            			_msg.removeClass('succMsg').html('此项不能为空').show();
					            		}else{
						            		_msg.removeClass('succMsg').hide();
						            	}
					            	}else{
					            		var min   = parseInt(_self.getMin(_this));
					            		if(min > 0 && (parseInt(val.length) < min)){
					            			return _msg.removeClass('succMsg').html('还不到'+ min +'个字符').show();
					            		}else{
					            			_msg.removeClass('succMsg').hide();
					            		}
										if(_conf.regexp != ''){
											var _rep = new RegExp(_conf.regexp,'g');
											var flag = _rep.test(val);
											if(!flag){
												return _msg.removeClass('succMsg').empty().html((_this.attr('error') || _conf.error)).css('display','inline-block');
											}else{
												_msg.removeClass('succMsg').empty().hide();
											}
										}
										_self.check(_this,val,_msg,S);
					            	}
									break;
								case 'keydown':
								case 'keyup':
									if(_this.is('select')){
										return;
									}
									var ob  = e || window.event;
					                var key = ob.keyCode || ob.witch;
					                if(key == 17 && ob.ctrlKey){return false;}
					            	var max   = _self.getMax(_this);
					            	var min   = _self.getMin(_this);
					                setTimeout(function(){
					                	val = $.trim(_this.val());
								    	var len   = val.length;
										if(_this.is('input')){
								            var flag  = (_conf.type != 'keyup' && (!_conf.match || _conf.match == '')) ? true : _self.doExp(_this,_msg,_conf,(type == 'keydown' ? 'keyup': type));
								            if(!flag){return false;}
							                if(max > 0){
								                if(len > max){
									        		if((key != 32 && key != 13)){
									        			($.browser.msie) && _this.prop('value',val.substring(0,max));
									                	_msg.removeClass('succMsg').html('最多可输入'+ max +'个字符');
														_msg.css('display','inline-block');
									        			return false;
									        		}
								                	_this.prop('value',val.substr(0,max));
								                	_msg.removeClass('succMsg').html('最多可输入'+ max +'个字符');
													_msg.css('display','inline-block');
													if(op.data.lastValue == val || val == ''){
														return;
													}
								                }else{
								                	_msg.removeClass('succMsg').html('').hide();
								                }
								            }
								        }else{
											var oNum  = (_conf.showNumber == true) ? _self.getTip(_this,true).find('.num') : $();
								        	if(min > 0){
									        	if(len < max){
									        		len < min ? oNum.css('color','#f00').text(len) : oNum.css('color','').text(len);
									        	}else{
									        		oNum.css('color','#f00').text(max);
									        		_this.prop('value',val.substring(0,max));
									        	}
								        	}else{
									        	if(len < max){
									        		oNum.css('color','').text(len);
									        	}else{
									        		if((key != 32 || key != 13)){
									        			($.browser.msie) && _this.prop('value',val.substring(0,max));
										        		oNum.css('color','#f00').text(max);
									        			return false;
									        		}
									        		oNum.css('color','#f00').text(max);
									        		_this.prop('value',val.substring(0,max));
									        	}
									        }
								        }
						            },0);
									break;
							}
						});
						return this;
					}
				}).init();
			},
			_createIframe: function(target,func,result,errFunc,load){
				if(!result){result = 'data';}
				if(!target || target == ''){target = '_uploaderPost';}
	            var oFrame    = $('#'+target).length ? $('#'+target) : $('<iframe id="'+target+'" name="'+target+'" style="display:none" src="about:blank"></iframe>').appendTo(document.body);
	            oFrame.unbind().bind('load',function(ret){
	            	self.pop({hide:true});
					self.posted = false;
					delete self.posted;
					try{
						var oData = this.contentWindow[result];
					}catch(error){
					//	var oData = {result:1,info:"数据获取失败，请稍候再试！"};
					}
					(oData && typeof func === 'function') && func(oData);
					this.onload=null;
				});
				return oFrame;
			},
			Ajax: function(_url,func,options){
				/*	var _form   = self.createPostContainer(url,function(_data){
		            			  //success
					              },{form:form,param:[{name:'uin',value:op.QQ.uin}]});
		            if(_form && _form.length){
						var form   = _form.empty().append($('<input name="FMID" type="hidden" value="'+ FMID +'"/>'))
									 .append($('<input name="skey" type="hidden" value="'+ self._skey() +'"/>'));
						_form.submit();
					}
				*/
				var container,errFunc,method = 'POST',form = null,token = false,param = [],result = 'data',target='_uploaderPost',load=true;
				if(typeof options == 'object'){
					form      = options.form ? options.form : form;
					param     = (options.param && $.isArray(options.param)) ? options.param : param;
					container = options.container;
					errFunc   = options.err;
					method    = (options.type && options.type.toLowerCase()) === 'get' ? 'GET' : 'POST';
					token     = (options.token && options.token == true) ? true : false;
					result    = (options.result && typeof options.result == 'string') ? options.result : result;
					target    = (options.target && typeof options.target == 'string') ? options.target : target;
					load      = (options.load && typeof options.load == 'boolean') ? options.load : load;
					if(_url == '' && form && form.attr('action') != ''){
						_url = form.attr('action');
					}
				}
				var oFrame  = self._createIframe(target,func,result,errFunc,load);
				var _form = $('#_uploaderForm');
				(_form && _form.length) ? (function(){
					_form.attr('action',_url).attr('target',target).empty();
					_form.get(0).reset();
				})() : (_form = $('<form action="'+ _url +'" method="'+method+'" target="'+target+'" id="_uploaderForm" style="display:none;"></form>').appendTo(document.body));
				token && $.merge(param,[{name:'token',value:self.getToken()}]);//是否加入token
				if(form != null){
					var elem     =  form.serializeArray();
					(param.length) && $.merge(elem,param);
					var elements = self.formatParam(elem,form);
					_form.append(elements);
				}else if(param.length){
					var elements = self.formatParam(param);
					_form.append(elements);
				}
				(load == true && target != 'about:blank') && _form.unbind().submit(function(){
					self.pop({load: true});
				});
				return _form;
			},
			crossAjax: function(_url,func,options){
				var _proxy = (!!_url) ? _url : location.href,_data = {},async = true,load = false,_name = '_proxy_iframe',token = op.token,proxy = '';
				if(options){
					_data  = options.data ? options.data : _data;
					async  = options.async ? options.async : async;
					load   = options.load ? options.load : load;
					token  = options.token ? options.token : token;
				}
				(!op.data.xmlHttp) && (op.data.xmlHttp = {});
				load == true && self.pop({load: true});
				!!token && (_data.token = self.getToken());
				_data.r = self.getRandom();
				var Test  = (_proxy && /^(?:(?:[^:\/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(\?(?:[^#]*))?(?:#(.*))?$/.test(_proxy));
				var _host = (!!RegExp.$1) ? RegExp.$1 : op.pageInfo.host.replace('http://','');
				if(Test && !!_host && location.host != _host){
					_name  = '_proxy_'+ _host.replace(/(\.|\:|\?|\/)/ig,'');
					_proxy = (options && !!options.proxy) ? 'http://' + _host + options.proxy : 'http://' + _host + op.currentProxy;
					var oFrame    = $('#'+_name);
					oFrame.length ? (function(){
						(oFrame.attr('src') != _proxy || !op.data.xmlHttp[_name]) ? oFrame.unbind('load').load(sendAjax) : sendAjax(oFrame[0]);
					})() : (function(){
						oFrame = $('<iframe id="'+_name+'" name="'+_name+'" style="display:none;" src="'+_proxy+'"></iframe>');
						oFrame.unbind('load').load(sendAjax).appendTo(document.body);
					})();
				}else{
					var ajax = $.ajax({
						type: (options && options.type ? options.type : 'POST'),
						url: _url,
						async: async,
						data:_data
					});
					ajax.always(resultHandler);
				}
				function sendAjax(e){
					var iframe = e;
					if(iframe && iframe.type == 'load'){
						iframe = iframe.target || iframe.srcElement;     //捕获事件源
					}
					try{
						var xmlHttp = op.data.xmlHttp[_name] || iframe.contentWindow.xmlHttp;
						op.data.xmlHttp[_name] = xmlHttp;
					}catch(error){
						var xmlHttp = null;
					}
					if(xmlHttp){
						if($.browser.msie){
							$.support.cors = true; //IE下跨域必须设置
						}
						var ajax = $.ajax({      //在代理iframe下进行ajax请求，实现同源访问
							type: (options && options.type ? options.type : 'POST'),
							url: _url,
							async: async,
							xhr: xmlHttp,
							data: _data
						});
						ajax.always(resultHandler);
					}
				}
				function resultHandler(oResult){
					self.posted = false;
					delete self.posted;
					op.data.doQueue = false;
					delete op.data.doQueue;
					load == true && self.pop({hide: true});
					if(typeof oResult == 'object'){
							oResult = {ret:-999,info: '服务器异常!'};
					}else{
						try{
							oResult = [].slice.call(oResult.split('{"'),1);
							oResult = '{"'+oResult.join('{"').replace(/;?<\/+\w+>$/,'');
							oResult = $.parseJSON(oResult);
						}catch(err){
							oResult = {ret:-998,info: '服务器错误!'};
						}
						if(oResult.ret == -1){
							return self.pop({content:'<span class="fail">'+oResult.info+'</span>',autoHide:true,refer: function(){
								if(oResult.url){
									top.location.href = window.TXCAR_infomation.host + oResult.url;
								}
							}});
						}
					}
					typeof func == 'function' && func(oResult);
				}
				
			},
			pop: function(option){
				var oPop    = $('#txcar_layer_box');
				if(!oPop.length){
					oPop  = $(op.tpl.layer).appendTo(document.body);
				}
				var doc     = $(document),
					win     = $(window);
				return ({
					Default:{
						element: null,
						type: '',
						ajax: null,
						title: '',
						load: false,
						css: 'dealer',
						content: '',
						width: 'auto',
						height: 'auto',
						minWidth: 'auto',
						shadow: false,
						position: 'center',
						close: true,
						confirm: null,
						cancel: null,
						autoShow: true,
						autoHide: false,
						refer: null,
						clickHide: true,
						show: function(){},
						result: function(){}
					},
					element: {
						ele: option.element,
						box: oPop,
						shadow: oPop.find('.txcar_layer_shadow'),
						handler: oPop.find('.txcar_layer_shadow .handler'),
						iframe: oPop.find('.txcar_layer_shadow iframe'),
						title: oPop.find('.txcar_layer_hd h3'),
						hd: oPop.find('.txcar_layer_hd'),
						bd: oPop.find('.txcar_layer_bd'),
						ft: oPop.find('.txcar_layer_ft'),
						border: oPop.find('.border'),
						close: oPop.find('.txcar_layer_hd .txcar_layer_close'),
						oLoad: oPop.find('.loading'),
						content: oPop.find('.txcar_layer_content'),
						confirm: oPop.find('.txcar_layer_ft .confirm'),
						cancel: oPop.find('.txcar_layer_ft .cancel')
					},
					init: function(){
						var _this = this;
						$.extend(true,this.Default,option);
						option = this.Default;
						if(option.hide == true){
							return this.element.box.hide();
						}
						(option.autoShow == false) && (option.load = true);
						this.element.box.add(this.element.handler).add(this.element.iframe).height(doc.height()).show();
						this.element.content.stop(true,true).show();
						option.load == true ? this.element.content.addClass('loading') : this.element.content.removeClass('loading');
						switch(option.type){
							case 'nothing':
								option.css && this.box.removeClass(option.css).addClass(option.type);
								this.element.hd.hide();
								this.element.bd.show();
								this.element.ft.hide();
								break;
							case 'confirm':
								this.element.hd.show();
								this.element.bd.show();
								this.element.ft.show();
								this.element.close.hide();
								option.css && this.element.box.removeClass(option.css).addClass(option.css);
								option.confirm == false && this.element.confirm.hide();
								option.cancel == false && this.element.cancel.hide();
								break;
							default:
								(option.close != true) && (this.element.close.hide());
								option.css && this.element.box.removeClass(option.css).addClass(option.css);
								if(option.load == true){
									this.element.hd.hide(),this.element.bd.hide(),this.element.ft.hide();
								}else{
									this.element.hd.show();
									this.element.bd.show();
									this.element.ft.hide();
								}
								break;
						}
						(option.shadow == false) ? this.element.shadow.removeClass('opacity') : this.element.shadow.addClass('opacity');
						(option.title != '') && this.element.title.length && this.element.title.html(option.title);
						if(!$.isEmptyObject(option.ajax) || option.ajax != null){
								var isObj=$.isPlainObject(option.ajax),url,data,callBack;
								if(isObj){
									url	  = option.ajax.url;
									data  = option.ajax.data;
								}else{
									url   = option.ajax;
									data  = {};
								}
								this.element.bd.load(url,data,function(result){
									_this.element.data = result;
									_this.ret();
									_this.show();
									_this.fixed();
								});
						}else{
							option.content && this.element.bd.html(option.content);
							this.ret();
							option.autoShow == true && this.show();
							this.fixed();
						}
						return this;
					},
					ret: function(){
						var _this = this;
						option.close == true && this.element.close.length && this.element.close.show().unbind().click(function(e){
							_this.hide();
						});
						this.element.confirm.length && option.type == 'confirm' && this.element.confirm.unbind().click(function(e){
							if(typeof option.confirm == 'function'){
								var flag = option.confirm.call(_this,arguments);
								(!_this.element.content.find('.errorMsg:visible').length) && _this.element.content.addClass('loading');
								(flag) && _this.hide();
							}else{
								_this.hide();
							}
						});
						this.element.cancel && option.type == 'confirm' && this.element.cancel.unbind().click(function(e){
							typeof option.cancel == 'function' && option.cancel.call(_this,arguments);
							_this.hide();
						});
						if(option.autoHide){
				        	var _time = /[0-9]/.test(option.autoHide) ? parseInt(option.autoHide) : option.autoHide == true ? 2000 : 0;
				        	if(_time > 0){
				        		_this.element.content.removeClass('loading');
				        		_this.element.hd.hide();
				        		_this.element.bd.show();
				        		_this.element.ft.hide();
								op.autoHideObj && clearTimeout(op.autoHideObj);
			        		    op.autoHideObj = setTimeout(function(){
									if(option.refer){
										switch(typeof option.refer){
											case 'string':
												location.href = option.refer;
												break;
											case 'function':
												option.refer();
												break;
										}
									}else{
										_this.hide();
									}
			        			},_time);
			        		}
				        }else{
				        	option.clickHide == true && option.type != 'nothing' && _this.element.handler.unbind().click(function(e){
								!_this.element.content.is('.loading') && _this.hide();
							});
				        }
						$.browser.ie6 && this.element.box[0].focus();
						(option && typeof option.show == 'function') && (option.show.call(this,this.element.content));
						return false;
					},
					show: function(){
						(option.load != true || option.autoShow == false)&& this.element.content.removeClass('loading');
						this.element.border.stop(true,true).fadeTo('normal',1);
						return this;
					},
					hide: function(){
						var _this = this;
						this.element.content && this.element.content.stop(true,true).fadeOut('normal',function(){
							_this.element.box.length && _this.element.box.hide();
							_this.element.border.length && _this.element.border.removeAttr('style');
							doc     = null,
							win     = null;
							!$.browser.msie && delete this;
						});
					},
					fixed: function(){
						var region ={};
						if(option){
							region.width = (!isNaN(option.width)) ? option.width : '';
							region.height = (!isNaN(option.height)) ? option.height : '';
							region.minWidth = (!isNaN(option.minWidth)) ? option.minWidth : '';
						}
						region.top = this.getTop(this.element.content);
						this.element.content.css(region);
						this.element.box.add(this.element.handler).add(this.element.iframe).height(doc.height());
						return this;
					},
					getTop: function(dom){
						var sTop = $('body').scrollTop() || $('html,body').scrollTop();
						var h    = win.height() - dom.innerHeight();
						var top  = Math.max(parseInt(h/2) + sTop,sTop);
						return top;
					}
				}).init();
			},
			init:function(){
				$.getScript(op.jsask+'price.js',function(){
					self.initPrice();
				});
			}
    	});
	})();
	(typeof window[projectName] == 'undefined') && $(document)[projectName]();
});/*  |xGv00|12e2c4bd91a612f417142f14d757b3dc */