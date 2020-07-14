
/*============================auto.js=================================*/

/*
 * jQuery Cookie Plugin v1.3.1
 */
;(function(e,f,b){var d=/\+/g;function g(j){return j}function h(j){return c(unescape(j.replace(d," ")))}function c(j){if(j.indexOf('"')===0){j=j.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}return j}function i(j){return a.json?JSON.parse(j):j}var a=e.cookie=function(r,q,w){if(q!==b){w=e.extend({},a.defaults,w);if(q===null){w.expires=-1}if(typeof w.expires==="number"){var s=w.expires,v=w.expires=new Date();v.setDate(v.getDate()+s)}q=a.json?JSON.stringify(q):String(q);return(f.cookie=[escape(r),"=",a.raw?q:escape(q),w.expires?"; expires="+w.expires.toUTCString():"",w.path?"; path="+w.path:"",w.domain?"; domain="+w.domain:"",w.secure?"; secure":""].join(""))}var j=a.raw?g:h;var u=f.cookie.split("; ");var x=r?null:{};for(var p=0,n=u.length;p<n;p++){var o=u[p].split("=");var k=j(o.shift());var m=j(o.join("="));if(r&&r===k){x=i(m);break}if(!r){x[k]=i(m)}}return x};a.defaults={};e.removeCookie=function(k,j){if(e.cookie(k)!==null){e.cookie(k,null,j);return true}return false}})(jQuery,document);


$(function(){
		
		
	 
		

	(function($){
		if(!$)return;
		//document.domain = 'qq.com';
		var doc  = document,port='',win  = window,_loc = location;

	/*
	* 公共部分
	*/
		
		// 模拟commonJS require
		var require=function(module){
			var exports={};
			module=require.modules[module]||undefined;
			typeof module=='function'&&module.call(exports,exports);
			return exports;
		}
		
		require.modules={};

		require.registar=function(module,fn){
			module&&fn&&(require.modules[module]=fn);
		}
		
		// 浏览器判断
		var userAgent = navigator.userAgent.toString().toLowerCase();
		$.browser = {
			tt  : /tencenttraveler|qqbrowser/i.test( userAgent ),
			ie6 : !-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent),
			ie7 : /msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (document.documentMode == 7),
			ie8 : /msie.[8]\.0/i.test(userAgent) || (document.documentMode == 8),
			ie67 : ((!-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent)) || (/msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (document.documentMode == 7))),
			ie78 : /msie.[7|8]\.0/i.test(userAgent),
			ie678: !$.support.leadingWhitespace,
			ie9 : /msie.[7|9]\.0/i.test(userAgent) && /mozilla\/[4|5]\.0/i.test(userAgent) && /trident\/5\.0/i.test(userAgent) || (document.documentMode == 9),
			safari: /webkit/i.test( userAgent ), 
			chrome: /chrome/i.test(userAgent) && /mozilla/i.test(userAgent) ,
			msie  : /msie/i.test(userAgent) && !/opera/.test(userAgent),
			ff:  /.*(firefox)\/([\w.]+).*/i.test(userAgent)
		};
		
		// 事件停止响应
		$.stopEvent=function(event){
			if(event){
				(event && event.stopPropagation) ? event.stopPropagation() : (event.cancelBubble = true);
				(event && event.preventDefault) ? event.preventDefault() : (event.returnValue = false);
			}
		}
		//  事件订阅
		var eventSubscribeBox={};
		function eventSubscribe(type,fn){
			eventSubscribeBox[type]=eventSubscribeBox[type]||[];
			eventSubscribeBox[type].push(fn);				
		}
		function eventSpeaker(type,evt){
			var box=eventSubscribeBox[type];
			if(box){
				var i=box.length;
				while(i){
					i--;
					box[i](evt)
				}
			}
		}

	/*
	* 各个功能模块
	*/
		/*模拟滚动条*/
		function scroll(id) {
			var self = this;
			this.obj = document.getElementById(id);
			this.content = this.obj.getElementsByTagName('div')[0];
					 this.bar = document.createElement('div');
			this.bar.className = 'scrollBar';
			this.barBg = document.createElement('p');
			this.barBg.className = 'barBg';
			this.topBg = document.createElement('p');
			this.topBg.className = 'topBg';
			this.bar.style.marginTop = 0;
			this.bar.style.height = '34px';
			this.obj.appendChild(this.bar);
			this.bar.appendChild(this.barBg);
			this.barBg.appendChild(this.topBg);
			this.bar.y;
			this.srcElement;
			this.marginTop;
			this.bar.onmousedown = function(e) {
				self.mousedown(e);
			}
		}
		scroll.prototype = {
			mousedown: function(e) {
				var self = this;
				var e = e || window.event;
				self.bar.y = e.clientY;
				self.bar.t = parseInt(self.bar.style.marginTop);
				document.onmousemove = function(e) {
					self.mousemove(e);
				}
				stopDefault(e);
			},
			mousemove: function(e) {
				var e = e || window.event;
				this.marginTop = this.bar.t + (e.clientY - this.bar.y);
				if (this.marginTop < 0) {
					this.marginTop = 0;
				}
				if (this.marginTop > this.obj.clientHeight - this.bar.offsetHeight) {
					this.marginTop = this.obj.clientHeight - this.bar.offsetHeight;
				}
				this.bar.style.marginTop = this.marginTop + 'px';
				this.content.scrollTop = (this.content.scrollHeight - this.obj.offsetHeight) * parseInt(this.marginTop) / (this.obj.clientHeight - this.bar.clientHeight);
				document.onmouseup = function(e) {
					document.onmousemove = null;
				}
				stopDefault(e);
			}
		}

		function stopDefault(e) {
			if (e && e.preventDefault) e.preventDefault();
			else window.event.returnValue = false;
			return false;
		}

		var p = new scroll('scrollBox');
		var p2 = new scroll('scrollBox2');

		//焦点图
		/**
		 * @name    qqfocus     页卡函数
		 * @param   {Object}    初始值
		 */
		$.fn.qqfocus = function(options){
			var focuser = {};
			var opts = $.extend({}, {
				event: 'mouseover',  //mouseover click
				conbox: '.focus_con',//内容容器
				condot: '.focus_dot',//切换容器
				conitem: 'li',       //内容标签class
				dotitem: 'li',       //切换器标签 默认为li
				current: 'current',  //切换样式
				effect: 'fade',      //切换效果 scrollx|scrolly|fade|none
				speed: 1000,         //动画速度
				space: 3000,         //时间间隔
				auto: true,          //自动滚动
				prev: ".prevBtn",
				next: ".nextBtn"
			}, options);
			focuser.timer = "";
			focuser.index = 0;
			focuser.last_index = 0;
			focuser.conbox = $(this).find(opts.conbox);
			focuser.conitem = focuser.conbox.find(opts.conitem);
			focuser.condot = $(this).find(opts.condot);
			focuser.dotitem = focuser.condot.find(opts.dotitem);
			focuser.prev = $(this).find(opts.prev);
			focuser.next = $(this).find(opts.next);

			focuser.fn = {
				slide: function () {
					if (focuser.index >= focuser.conitem.length){
						focuser.index = 0;
					}
					focuser.dotitem.removeClass(opts.current).eq(focuser.index).addClass(opts.current);
					switch (opts.effect) {
						case 'scrollx':
							focuser.conitem.css({"float":"left"});
							focuser.conbox.css({"position": "relative"});
							focuser.conbox.width(focuser.conitem.length * focuser.conitem.width());
							focuser.conbox.stop().animate({left:-focuser.conitem.width() * Math.abs(focuser.index) + 'px'}, opts.speed);
							break;
						case 'scrolly':
							focuser.conitem.css({display:'block'});
							focuser.conbox.css({"position": "relative"});
							focuser.conbox.stop().animate({top:-focuser.conitem.height() * Math.abs(focuser.index) + 'px'}, opts.speed);
							break;
						case 'fade':
							if(focuser.conbox.css('opacity') == 1){
								focuser.conbox.css('opacity', 0);
							}
							focuser.conbox.animate({'opacity':1}, opts.speed / 2);
							focuser.conitem.eq(focuser.last_index).stop().css('display', "none").end().eq(focuser.index).css('display', "block").stop();
							break;
						case 'none':
							focuser.conitem.hide().eq(focuser.index).show();
							break;
					}
					focuser.last_index = focuser.index;
					focuser.index ++;
				},
				next: function(){
					focuser.fn.stop();
					focuser.fn.slide();
					focuser.fn.play();
				},
				prev: function () {
					focuser.index = focuser.index < 2 ? (focuser.conitem.length - focuser.index) : focuser.index - 2;
					focuser.fn.stop();
					focuser.fn.slide();
					focuser.fn.play();
				},
				stop: function(){
					clearInterval(focuser.timer);
				},
				play: function(){
					if (opts.auto) {
						focuser.timer = setInterval(focuser.fn.slide, opts.space);
					}
				},
				init: function(){
					if (opts.effect == 'fade') {
						focuser.conitem.eq(focuser.index).css({'display':"block"}).siblings().css({'display':"none"});
					}
					if (opts.auto){
						focuser.fn.play();
					}else{
						focuser.fn.stop();
					}
					focuser.dotitem.bind(opts.event, function() {
						focuser.index = $(this).index();
						focuser.fn.stop();
						focuser.fn.slide();
						focuser.fn.play();
					});
					focuser.conbox.hover(focuser.fn.stop, focuser.fn.play);
					focuser.fn.slide();
					focuser.prev.bind("click", focuser.fn.prev);
					focuser.next.bind("click", focuser.fn.next);
				}
			};
			focuser.fn.init();
		}

		// 焦点图
		$("#focus_A").qqfocus({effect:'scrollx', speed:500, space:8000});
		
		//切换城市
		$('.switchCity').click(function(){
			var arrow = $(this).find('em').eq(0);
			$('.cityList').is(':visible') ? hide() : show();
			//点击列表之外的地方隐藏列表
			$(document).bind('click', function(e){
				var $clicked = $(e.target);
				(! $clicked.parents().hasClass("selectCity")) && hide();
			});
			//点击城市之后隐藏列表
			$("#cityWinUl li p a").bind('click', function(e){
				hide();
			});
			function show(){
				arrow.removeClass('arrowDown');
				arrow.addClass('arrowUp');
				$('.cityList').show("fast");
			}
			function hide(){
				arrow.removeClass('arrowUp');
				arrow.addClass('arrowDown');
				$('.cityList').hide("fast");
			}
		});

		//选车中心  selectCarCenter.js
		require.registar('selectCarCenter',function(exports){
			var configs = {
				el:"#chooseBox .chooseBox-content-search"
			};



			var getId = function(id){
				return document.getElmentById(id||'');
			}

			configs.getApi = function(key,id){
				var api = {
					'brand':'//js.data.auto.qq.com/car_public/1/manufacturer_list_json.js',
					'serial':'//js.data.auto.qq.com/car_manufacturer/'+id+'/serial_list_json.js',
					'models':'//js.data.auto.qq.com/car_serial/'+ id +'/model_list.js',
					'searcarByBrand':'//cgi.data.auto.qq.com/php/search.php?brand_id=' + id,
					'searBySerial':'//data.auto.qq.com/car_serial/'+ id +'/',
					'searByModel':'//data.auto.qq.com/car_models/' + id + '/',
					'searpriByBand':'//baojia.auto.qq.com/php/baojia_center.php?brandid=' + id,
					'searpriBySerial':'//baojia.auto.qq.com/php/baojia_detail.php?info=0&serialID=' + id,
					'searpriByModel':'//baojia.auto.qq.com/php/baojia_detail.php?info=1&modelID=' + id
				};
				return api[key]||'';
			}

			function select(options){
				var aClass = 'subItemBtnActive';
				var selector = options.selector || '';
				var module = '_' + Math.random();
				var el = $(selector);
				var btn = options.btn;
				var popBody = btn.siblings('div');

				function blur(){
					popBody.removeClass(aClass).hide();
					$(document.documentElement).unbind('click',blur);
				}

				function show(){
					popBody.addClass(aClass).show();
					$(document.documentElement).bind('click',blur);
				}

				btn.bind('click',function(e){
					$.stopEvent(e);
					eventSpeaker('click',module);
					if($(this).parent().hasClass('selectBox-band')){
						if(popBody.find('.pp_ops_item').length){
							return popBody.hasClass(aClass)?blur():show();
						}
					}else{
						if(popBody.find('ul li').length){
							return popBody.hasClass(aClass)?blur():show();
						}
					}
				});

				eventSubscribe('click',function(active){
					if(active != module) blur();
				});
			}


			function subSelect(event,type){
				var option= $(event.target).closest('a');
				var inputBox= $(event.target).closest('.items').children('.tips');
				var isBrand= !!$(event.target).closest('.selectBox-band').length;
				if(option.length){
					var val=option.attr('data-value')||'';
					var valArr=val.split(',');
					if(valArr.length==2){
						var valId=valArr[0],valName=valArr[1];
						inputBox.attr('data-value',val).children('span').addClass('checked').text(valName);
						isBrand&&setTimeout(function(){getSerial(valId)},0);
					}
				}
			}

			function subSelect1(event,type){
				var option = $(event.target).closest('a');
				var inputBox = $(event.target).closest('.items').children('.tips');
				var isSerial = !!$(event.target).parents().find('.selectBox-carx').length;
				if(option.length){
					var val=option.attr('data-value')||'';
					var valArr=val.split(',');
					if(valArr.length==2){
						var valId=valArr[0],valName=valArr[1];
						inputBox.attr('data-value',val).children('span').addClass('checked').text(valName);
						isSerial && setTimeout(function(){getModel(valId)},0);
					}
				}
			}

			var getBand = exports.getBand = function(){
				$.getScript(configs.getApi('brand'),parse);
				function parse(){
					var rs = new Array();
					var tmp={},temp="",tempL="",flag = 0,count=0;
					if(window.oManufacturerData){
						var bandlist = oManufacturerData.arrManufacturer;
						$.each(bandlist,function(index,item){

							if( tempL == '' ){
								if(flag == 0){
									temp +='<div class="pp_ops_item" id="' + bandlist[index].FirstLetter + '">';
									temp +='<span class="" id="'+ bandlist[index].FirstLetter +'">'+ bandlist[index].FirstLetter + '</span>';
								}

								tempL = bandlist[index].FirstLetter;

							}

							if(bandlist[index].FirstLetter == tempL){
								if(index>0 && bandlist[index-1].FirstLetter!=bandlist[index].FirstLetter&&count ){
									tempL = bandlist[index-1].FirstLetter;
									count == 0;

								}else{
									temp +='<a href="javascript:;" data-value="'+bandlist[index].ID+','+bandlist[index].Name+'">'+bandlist[index].Name+'</a>';
									count++;
								}


							}
							

							if( bandlist[index].FirstLetter != tempL ){
								temp +='</div>';
								temp +='<div class="pp_ops_item" id="' + bandlist[index].FirstLetter + '">';
								temp +='<span class="" id="'+ bandlist[index].FirstLetter +'">'+ bandlist[index].FirstLetter + '</span>';
								temp +='<a href="javascript:;" data-value="'+bandlist[index].ID+','+bandlist[index].Name+'">'+bandlist[index].Name+'</a>';
								tempL = '';
								flag = 1;
								count++;
							}

						});
						$("#bandlist").html(temp);
						var banditems = $(".bandselect  .pp_ops_item");
						for(var i = 0 ; i < banditems.length; i++){
							$(banditems[i]).find("a").last().css({"border-bottom":"none"});
						}

						$(".bandselect .selectBox .pp_ops_item a").hover(function(){
							$(".bandselect .selectBox .pp_ops_item a").removeClass("active");
							$(this).addClass("active");
						});
						
						$("#bandlist").bind('click',subSelect);
					}
				}
			}

			var getSerial = exports.getSerial = function(bandId){
				$.getScript(configs.getApi('serial',bandId),parse);
				function parse(){
					var rs=new Array('<ul><li><a class="first" href="javascript:void(0);" data-value="0,选择车系(可不选)">选择车系(可不选)</a></li>')
					if(window.oManufacturerSerialData){
						var tmp={};
						$.each(oManufacturerSerialData.arrSerial,function(index,item){
							var bName = item.BrandName;
							var sName = item.Name;
							!tmp[bName] && (tmp[bName] = ['<li><span>'+bName+'</span></li>']);
							tmp[bName].push('<li><a href="javascript:;" title="'+sName+'" data-value="'+item.ID+','+sName+'">'+sName+'</a></li>');
						});
						for(var key in tmp)
							rs.push(tmp[key].join('')||'');
							rs.push('</ul>');
						$(configs.el).find('#seriallist').html(rs.join('')).unbind('click').bind('click',subSelect1).find('a').first().trigger('click');
						$(configs.el).find('#moduellist').find('a').first().trigger('click');
						$(configs.el).find('#moduellist').html('');
					}
				
				}	
			}

			var getModel = exports.getModel = function(serialId){
				$.getScript(configs.getApi('models',serialId),parse);
				function parse(){
					var rs=new Array('<ul><li><a class="first" href="javascript:void(0);" data-value="0,选择车型(可不选)">选择车系(可不选)</a></li>')
					if(window.oSameSerialModelData){
						var tmp={};
						$.each(oSameSerialModelData.arrModel,function(index,item){
							var bName = item.BrandName;
							var sName = item.Name;
							!tmp[bName] && (tmp[bName] = ['<li><span>'+bName+'</span></li>']);
							tmp[bName].push('<li><a href="javascript:;" title="'+sName+'" data-value="'+item.ID+','+sName+'">'+sName+'</a></li>');
						});
						for(var key in tmp)
							rs.push(tmp[key].join('')||'');
							rs.push('</ul>');
						$(configs.el).find('#moduellist').html(rs.join('')).unbind('click').bind('click',subSelect).find('a').first().trigger('click');
					}
				}	
			}
			
			exports.submit = function(event){
				//$.stopEvent(event);
				
				var brand=[],serial=[],model=[],url='';
				$(configs.el).find('.tips').each(function(index,item){
					var value=$(item).attr('data-value')||'';
					if($(item).parent().hasClass('selectBox-band')){
						brand= value.split(',');
					}
					if($(item).parent().hasClass('selectBox-cars')){
						serial=value.split(',');
					}
					if($(item).parent().hasClass('selectBox-carx')){
						model=value.split(',');
					}
				});
				if( $(event.target).hasClass('zxc') ){
					if(brand.length!==2){alert('请选择品牌或车系或车型');return}
						url=configs.getApi('searcarByBrand',brand[0]);
					if(+serial[0]){
						url=configs.getApi('searBySerial',serial[0]);
					}
					if(+model[0]){
						url=configs.getApi('searByModel',model[0]);
					}
				}else{
					if(brand.length!==2){alert('请选择品牌或车系或车型');return}
						url=configs.getApi('searpriByBand',brand[0]);
					if(+serial[0]){
						url=configs.getApi('searpriBySerial',serial[0]);
					}
					if(+model[0]){
						url=configs.getApi('searpriByModel',model[0]);
					}
				}
				var iFlow = 0;
				if($(event.target).hasClass('zxc')){
					iFlow = 1;
				}else{
					iFlow = 2;
				}
				var a=document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
				var iQQ=(a==null?"":unescape(a[2]));
				var param = {
					sIp:'',
					iQQ: iQQ,
					sBiz:1,
					iFlow: iFlow,
					sOp:3,
					sUrl:escape(url),
					sLocalUrl: escape(location.href),
					bId: $('#band_select').attr('data-value').split(',')[0],
					modelId: $('#cars_select').attr('data-value').split(',')[0],
					sId: $('#carx_select').attr('data-value').split(',')[0]
				}
				//console.log(param);
				window.open(url);
				//$(".zxc").attr('href',url);
			};

			exports.init = function(opt){
				$.extend(configs,opt);
				$(configs.el).find('.letterlist a').bind('click',function(e) {
					$.stopEvent(e);
					var zm = $(this).text();
					var selector = '#' + zm;
					var height = 0;
					var bandlists = $(configs.el).find('#bandlist');
					if( bandlists.children('div').length ){
						var prevDoms = $(selector).prevAll();
						for (var i = 0; i < prevDoms.length; i++) {
							 height += $(prevDoms[i]).height();
						};
					}
					$(configs.el).find('#bandbox .optionbox-container').scrollTop(height);
				});
				this.getBand();
				$(configs.el).find(".items").each(function(){
					var $self = $(this);
					select({
						selector: $self,
						btn: $self.find('.tips').attr('data-value','')
					});
				});
				$(configs.el).find('.zxc').bind('click',this.submit);
				$(configs.el).find('.xbj').bind('click',this.submit);

			}
		});

		

		$(function(){
			require('selectCarCenter').init(); //选车中心
			$('#cp_cxdq').length && require('visitHistory').init('#cp_cxdq'); //浏览历史
			$('.search_ipt').length && $.getScript('//mat1.gtimg.com/auto/js/ait/sites/auto.price.js'); //顶部搜索
		}())

		/* $("#typeBox .typeBox-tab").find("li").hover(function () {
			$("#typeBox").find("li").removeClass("active");
			$(this).addClass("active");
			var ind = $(this).index();
			$(".typeBox-container-tablist").eq(ind).show().siblings().hide();
		}); */


		/* 询价 */
		var ask_brand_id = 0;
		var ask_serial_id = 0;
		//生成品牌下拉框
		function askBrand(){
			$.ajax({
				url:"//js.data.auto.qq.com/car_public/1/manufacturer_list_json.js",
				dataType:"script",
				success: function (){
					var brand = oManufacturerData.arrManufacturer;
					if(brand && brand.length > 0){
						var oSelect = $('#def_brand');
						var oOption = $('<option selected="selected" value="0">\u9009\u62E9\u54C1\u724C</option> ');
						oSelect.append(oOption);
						for(var n=0; n<brand.length; n++){
							var oOption = $('<option value="'+brand[n].ID+'">'+brand[n].FirstLetter+'&nbsp;&nbsp;'+brand[n].Name+'</option>');
							oSelect.append(oOption);
						}
					}else{
						console.log("\u8BE2\u4EF7\u54C1\u724C\u6570\u636E\u51FA\u9519\u3002");
					}
				}
			});
		}
		//生成车系下拉框
		function askSerial(){
			var oSelect = $('#def_serial');
			var oOption = $('<option selected="selected" value="0">\u9009\u62E9\u8F66\u7CFB</option> ');
			oSelect.append(oOption);
		}
		//选择品牌
		var askBrandChange = function(){
			var selectedValue = $(this).val();
			ask_brand_id = selectedValue;
			askBrandID = selectedValue;
			if(parseInt(selectedValue) != 0){
				$.ajax({
					url:"//js.data.auto.qq.com/car_manufacturer/"+selectedValue+"/serial_list_json.js",
					dataType:"script",
					success: function (){
						var serial = oManufacturerSerialData.arrSerial;
						if(serial && serial.length > 0){
							var oSelect = $('#def_serial');
							oSelect.empty();
							var oOption = $('<option selected="selected" value="0">\u9009\u62E9\u8F66\u7CFB</option> ');
							oSelect.append(oOption);
							for(var n=0; n<serial.length; n++){
								var oOption = $('<option value="'+serial[n].ID+'">'+serial[n].Name+'</option>');
								oSelect.append(oOption);
							}
						}else{
							console.log("\u8BE2\u4EF7\u8F66\u7CFB\u6570\u636E\u51FA\u9519\u3002");
						}
					}
				});
			}
		};
		//选择车系
		var askSerialChange = function(){
			var _url= window.location.href;
			ask_serial_id = $(this).val();
			if(ask_brand_id != 0 && ask_serial_id != 0){
				var askUrl = '//auto.qq.com/buycar/askprice.htm?type=local_aichetuan&brand_id='+ask_brand_id+'&serial_id='+ask_serial_id+'&autobussboss=askprice|local_search|2&url='+_url;
				$(".askBt").attr("href",askUrl);
				$(".askBt").attr("target","_blank");
			}else{
				$(".askBt").attr("target","_self");
				alert("\u8BF7\u9009\u62E9\u54C1\u724C\u8F66\u7CFB\u3002");
				return false;
			}
		};
		askBrand();
		askSerial();
		$("#def_brand").unbind("change", askBrandChange).bind("change", askBrandChange);
		$("#def_serial").unbind("change", askSerialChange).bind("change", askSerialChange);
		
		
		
		//附近车市
		 (function getFjcity(){
			var curcityname = $('#app').attr('cityname');
			var links = $('#scrollBox2 a');
			var dls = $('#scrollBox2 .dt');
			var _siblings='';
			if(curcityname == '北京'){
				_siblings += '<a target="_blank" href="https://tianjin.auto.qq.com">天津</a>';
				$.each(dls,function(){
					var _this = $(this);
					var _html = _this.html();
					if(_html.replace(/ /g,'') == '河北'){
						_siblings += _this.siblings('.dd').html();
					}
				})			
			}else if(curcityname == '天津'){
				_siblings += '<a target="_blank" href="https://beijing.auto.qq.com">北京</a>';
				$.each(dls,function(){
					var _this = $(this);
					var _html = _this.html();
					if(_html.replace(/ /g,'') == '河北'){
						_siblings += _this.siblings('.dd').html();
					}
				})
			}else if(curcityname == '上海'){
				$.each(dls,function(){
					var _this = $(this);
					var _html = _this.html();
					if(_html.replace(/ /g,'') == '江苏'){
						_siblings += _this.siblings('.dd').html();
					}
					if(_html.replace(/ /g,'') == '浙江'){
						_siblings += _this.siblings('.dd').html();
					}
				})
			}else if(curcityname == '重庆'){
				$.each(dls,function(){
					var _this = $(this);
					var _html = _this.html();
					if(_html.replace(/ /g,'') == '四川'){
						_siblings += _this.siblings('.dd').html();
					}
				})
			}else{
				$.each(links,function(){
					var _this = $(this);
					var _html = _this.html();
					if(curcityname == _html){
						_siblings = _this.siblings();
					}
				})
			}
			_siblings.length >0 && $('.autoMarket').html('附近车市：').append(_siblings).show() 
		})() 
		
		//goTop		
		var goTopBtn = document.getElementById("goTop");
		function goTop()
		{
			if(goTopBtn)
			{ 
				goTopBtn.onclick = function()
				{
					var doc = (document.documentElement.scrollTop)? document.documentElement : document.body;
					var time;
					time = setInterval(function(){
						doc.scrollTop -= Math.ceil(doc.scrollTop*0.7);
						if(doc.scrollTop<=0) clearInterval(time);
					},1)
				}
			}
		} 
		goTop();
		window.onscroll = function()
		{
			if(goTopBtn)
			{ 
				document.documentElement.className = '';
				var doc = (document.documentElement.scrollTop)? document.documentElement : document.body;
				goTopBtn.style.visibility = doc.scrollTop ?"visible":"hidden";
			}
		}


	})(window.jQuery);


})/*  |xGv00|f17c3a1492aff42f91ca7224b14e2314 */