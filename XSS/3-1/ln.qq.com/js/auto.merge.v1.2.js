



$(function(){
    
	/*热门车型推荐*/
	$(".hotCarTab > li > a").click(function(){
	     $(this).parent().addClass("xz").siblings().removeClass("xz");
	})
    $("#navon0").hover(function(){
	   $("#div0").fadeIn("slow");
	   $("#div1").fadeOut("slow");
	   $("#div2").fadeOut("slow");
	   $("#div3").fadeOut("slow");
	   $(".hotCarTab > li > a").eq(0).parent().addClass("xz").siblings().removeClass("xz");
	},function(){

	})
	$("#navon1").hover(function(){
	   $("#div0").fadeOut("slow");
	   $("#div1").fadeIn("slow");
	   $("#div2").fadeOut("slow");
	   $("#div3").fadeOut("slow");
	   $(".hotCarTab > li > a").eq(1).parent().addClass("xz").siblings().removeClass("xz");
	},function(){
		
	})
	$("#navon2").hover(function(){
	   $("#div0").fadeOut("slow");
	   $("#div1").fadeOut("slow");
	   $("#div2").fadeIn("slow");
	   $("#div3").fadeOut("slow");
	   $(".hotCarTab > li > a").eq(2).parent().addClass("xz").siblings().removeClass("xz");
	},function(){
		
	})
    $("#navon3").hover(function(){
	  $("#div0").fadeOut("slow");
	   $("#div1").fadeOut("slow");
	   $("#div2").fadeOut("slow");
	   $("#div3").fadeIn("slow");
	   $(".hotCarTab > li > a").eq(3).parent().addClass("xz").siblings().removeClass("xz");
	},function(){
		
	})
    /*--热门车型推荐--*/
})
/*============================auto.js=================================*/
typeof $ === 'undefined' && typeof jQuery !== 'undefined' && ($=jQuery);


/**
 * ip定向保存空间
 **/


//焦点图
/**
 * @version 0.3 添加左右按钮, 修改按钮bug
 * @author  jianminlu
 * @update  2014-02-13 11:46
 */
(function($){
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
})(jQuery);


/*回到顶部*/
var ie6=!-[1,]&&!window.XMLHttpRequest;
$(window).scroll(function () {
	if ($(window).scrollTop() > $(window).height()) {
		$("#toTop").show();
		if (ie6) {
			$("#toTop").css({
				"position":"absolute",
				"top":$(window).scrollTop()+$(window).height()-100
			});
			
		}
	} else {
		$("#toTop").hide();
	}
});


function getBtraceUrl(param) {
    var url = '//btrace.qq.com/kvcollect?BossId=3827&Pwd=1690839746';
    var tempParam = '',
        tempArr = [];
    try{
    	for (var key in param) {
	      tempArr.push(key + '=' + param[key])
	    }
    }catch(err){
    	console.log('param参数有问题，请检查。'+err);
    }
    tempParam = tempArr.join("&");
	//console.log('tempParam',tempParam)
    if(tempParam){
    	return url + '&' + tempParam +'&'+Math.random();
    }else{
    	return url;
    }
}

function btraceDo(param){
	var iurl = getBtraceUrl(param);
	var gImage = new Image(1,1);
		gImage.src = iurl;
}

/*
 * jQuery Cookie Plugin v1.3.1
 */
;(function(e,f,b){var d=/\+/g;function g(j){return j}function h(j){return c(unescape(j.replace(d," ")))}function c(j){if(j.indexOf('"')===0){j=j.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}return j}function i(j){return a.json?JSON.parse(j):j}var a=e.cookie=function(r,q,w){if(q!==b){w=e.extend({},a.defaults,w);if(q===null){w.expires=-1}if(typeof w.expires==="number"){var s=w.expires,v=w.expires=new Date();v.setDate(v.getDate()+s)}q=a.json?JSON.stringify(q):String(q);return(f.cookie=[escape(r),"=",a.raw?q:escape(q),w.expires?"; expires="+w.expires.toUTCString():"",w.path?"; path="+w.path:"",w.domain?"; domain="+w.domain:"",w.secure?"; secure":""].join(""))}var j=a.raw?g:h;var u=f.cookie.split("; ");var x=r?null:{};for(var p=0,n=u.length;p<n;p++){var o=u[p].split("=");var k=j(o.shift());var m=j(o.join("="));if(r&&r===k){x=i(m);break}if(!r){x[k]=i(m)}}return x};a.defaults={};e.removeCookie=function(k,j){if(e.cookie(k)!==null){e.cookie(k,null,j);return true}return false}})(jQuery,document);

(function($){

	if(!$)return;
	document.domain = 'qq.com';
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
				var rs=new Array('<ul><li><a class="first" href="javascript:void(0);" data-value="0,\u9009\u62e9\u8f66\u7cfb\u0028\u53ef\u4e0d\u9009\u0029">\u9009\u62e9\u8f66\u7cfb\u0028\u53ef\u4e0d\u9009\u0029</a></li>')
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
				var rs=new Array('<ul><li><a class="first" href="javascript:void(0);" data-value="0,\u9009\u62e9\u8f66\u7cfb\u0028\u53ef\u4e0d\u9009\u0029">\u9009\u62e9\u8f66\u7cfb\u0028\u53ef\u4e0d\u9009\u0029</a></li>')
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
			btraceDo(param);
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

	// 曾经看过
	require.registar('visitHistory',function(exports){
		exports.init=function(el){
			var history= $.cookie("wz_autoapp_ReviewSerials")||'',visitLink=['<span><em class="eye"></em>\u66fe\u7ecf\u770b\u8fc7:</span>'];
			history=history.split("|").reverse();
			$.each(history,function(a,b){
				var item;
				b&&(item=b.split(","));
				if(item && item.length==3){
					visitLink.push('<a target="_blank"  href="//data.auto.qq.com/car_serial/'+item[1]+'">'+item[0]+'</a>');
				}					
			});
			visitLink.length>1&&$(el).find('.history_links').append(visitLink.splice(0,6).join(''));
		}	
	});

	//每日头条右侧滚动
	function AutoAcrollInit(obj){
		var liNum = $(obj).find("li").length;
		if(liNum <= 3){
			$(obj).css({
				width:155 * liNum + "px"
			});
		}else{
			$(obj).css({
				width:155 * 3 + "px"
			});
			$(obj).find("ul").css({
				width:155 * liNum + "px"
			})
			setInterval(function(){
				$(".toutiaoAD").find("ul").animate({
					marginLeft:"-155px"
				},500,function(){
					$(this).css({
						marginLeft:"0"
					}).find("li:first").appendTo(this);
				});
			},3000);
		}
	}
	AutoAcrollInit(".toutiaoAD");

	$(function(){
		require('selectCarCenter').init(); //选车中心
		$('#cp_cxdq').length && require('visitHistory').init('#cp_cxdq'); //浏览历史
		$('.search_ipt').length && $.getScript('//mat1.gtimg.com/auto/2014/js/auto.dev.js'); //顶部搜索
	})

    $("#typeBox .typeBox-tab").find("li").hover(function () {
        $("#typeBox").find("li").removeClass("active");
        $(this).addClass("active");
        var ind = $(this).index() + 1;
        $(".typeBox-container-tablist").hide();
        $("#tab-1" + ind).show();
    });
	
	//新闻列表
	$(".newsList li:nth-child(odd)").addClass("altRow");
	$(".newsList ul li").hover(
		function(){$(this).addClass("hover");},
		function(){$(this).removeClass("hover");}
	);
	$(".newFoot .share").hover(
		function(){
			$(this).find(".shareList").fadeIn("fast");
			$(this).addClass("hover");
		},
		function(){
			$(this).find(".shareList").fadeOut("slow");
			$(this).removeClass("hover");
		}
	);
	$(".newFoot .comment").hover(
		function(){$(this).addClass("hover");},
		function(){$(this).removeClass("hover");}
	);

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
					var oOption = $('<option selected="selected" value="0">选择品牌</option> ');
					oSelect.append(oOption);
					for(var n=0; n<brand.length; n++){
						var oOption = $('<option value="'+brand[n].ID+'">'+brand[n].FirstLetter+'&nbsp;&nbsp;'+brand[n].Name+'</option>');
						oSelect.append(oOption);
					}
				}else{
					console.log("询价品牌数据出错。");
				}
			}
		});
	}
	//生成车系下拉框
	function askSerial(){
		var oSelect = $('#def_serial');
		var oOption = $('<option selected="selected" value="0">选择车系</option> ');
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
						var oOption = $('<option selected="selected" value="0">选择车系</option> ');
						oSelect.append(oOption);
						for(var n=0; n<serial.length; n++){
							var oOption = $('<option value="'+serial[n].ID+'">'+serial[n].Name+'</option>');
							oSelect.append(oOption);
						}
					}else{
						console.log("询价车系数据出错。");
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
			alert("请选择品牌车系。");
			return false;
		}
	};
	askBrand();
	askSerial();
	$("#def_brand").unbind("change", askBrandChange).bind("change", askBrandChange);
	$("#def_serial").unbind("change", askSerialChange).bind("change", askSerialChange);

})(window.jQuery);

/*  |xGv00|f65daf8c303d50653e1e159ee02cd554 */