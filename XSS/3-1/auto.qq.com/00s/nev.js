/**** 汽车图片 ****/

;(function($) {
	document.domain = 'qq.com';
	var doc  = document,port='',win  = window,_loc = location;
	//公共部分
	// 模拟commonJS require
	var require=function(module){
		var exports={};
		module = require.modules[module]||undefined;
		typeof module == 'function' && module.call(exports,exports);
		return exports;
	}
	require.modules={};
	require.registar=function(module,fn){
		module && fn && (require.modules[module]=fn);
	};
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
	//事件停止响应
	$.stopEvent=function(event){
		if(event){
			(event && event.stopPropagation) ? event.stopPropagation() : (event.cancelBubble = true);
			(event && event.preventDefault) ? event.preventDefault() : (event.returnValue = false);
		}
	}
	//事件订阅
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
	//各个功能模块

	//汽车图片
	require.registar('selectpic',function(exports){
		var configs = {
			el:"#searchpic"
		};

		var getId = function(id){
			return document.getElmentById(id||'');
		}

		configs.getApi = function(key,id){
			var api = {
				'brand':'//js.data.auto.qq.com/car_public/1/manufacturer_list_json.js',
				'serial':'//js.data.auto.qq.com/car_manufacturer/'+id+'/serial_list_json.js',
				'bandpic':'http://data.auto.qq.com/piclib/index.shtml#bid=' + id,
				'serialpic':'http://data.auto.qq.com/piclib/index.shtml#sid=' + id
			}
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
			var option = $(event.target).closest('a');
			var inputBox = $(event.target).closest('.items').children('.tips');
			var isBrand = !!$(event.target).closest('.selectBox-band').length;
			if(option.length){
				var val=option.attr('data-value')||'';
				var valArr=val.split(',');
				if(valArr.length==2){
					var valId=valArr[0],valName=valArr[1];
					inputBox.attr('data-value',val).children('span').addClass('checked').text(valName);
					isBrand && setTimeout(function(){getSerial(valId)},0);
				}
			}
		}

		var getBand = exports.getBand = function(){
			$.getScript(configs.getApi('brand'),parse);
			function parse(){
				var rs = new Array();
				var tmp={},temp='',tempL='';
				if(window.oManufacturerData){
					var bandlist = oManufacturerData.arrManufacturer;
					$.each(bandlist,function(index,item){
						if(tempL == '' || tempL == 'undefined'){
							temp +='<div class="pp_ops_item" id="' + bandlist[index].FirstLetter + '1">'; 
							tempL = bandlist[index].FirstLetter;
							temp +='<span class="" id="'+ bandlist[index].FirstLetter +'">'+ bandlist[index].FirstLetter + '</span>';
						}
						if(bandlist[index].FirstLetter == tempL){
							temp +='<a href="javascript:;" data-value="'+bandlist[index].ID+','+bandlist[index].Name+'">'+bandlist[index].Name+'</a>';
						}else{
							temp +='</div>';
							tempL = "";
						}
					});
					$("#pic_bandlist").html(temp);
					var banditems = $('.carpic  .pp_ops_item');
					for(var i = 0 ; i < banditems.length; i++){
						$(banditems[i]).find("a").last().css({'border-bottom':'none'});
					}

					$('.carpic .optionbox .optionbox-container .pp_ops_item a').hover(function(){
						$('.carpic .optionbox .optionbox-container .pp_ops_item a').removeClass("active");
						$(this).addClass("active");
					});

					$("#pic_bandlist").bind('click',subSelect);
				}
			}
		}


		var getSerial = exports.getSerial = function(bandId){
			$.getScript(configs.getApi('serial',bandId),parse);

			function parse(){
				var rs=new Array('<ul><li><a href="javascript:;" data-value="0,\u9009\u62E9\u8F66\u7CFB(\u53EF\u4E0D\u9009)" >\u9009\u62E9\u8F66\u7CFB(\u53EF\u4E0D\u9009)</a></li>')
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

					$(configs.el).find('.selectBox-cars #pic_seriallist').html(rs.join('')).unbind('click').bind('click',subSelect).find('a').first().trigger('click');				
				}
			
			}	
		}

		exports.submit = function(event){
			//$.stopEvent(event);
			var brand=[],serial=[],url='';
			$(configs.el).find('.tips').each(function(index,item){
				var value= $(item).attr('data-value')||'';
				if( $(item).closest('.selectBox-band').length){
					brand=value.split(',');
				}else{				
					serial=value.split(',');
				}
			});
			if(brand.length!==2){alert('\u8BF7\u9009\u62E9\u54C1\u724C\u6216\u8F66\u7CFB');return } //请选择品牌或车系
				url=configs.getApi('bandpic',brand[0]);
			if(+serial[0]){
				url=configs.getApi('serialpic',serial[0]);
			}
			
	
			var a=document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
			var iQQ=(a==null?"":unescape(a[2]));
			var param = {
				sIp:'',
				iQQ: iQQ,
				sBiz:1,
				sOp:4,
				sUrl:escape(url),
				sLocalUrl: escape(location.href),
				bId: $('#pic_band_select').attr('data-value').split(',')[0],
				sId: $('#pic_cars_select').attr('data-value').split(',')[0]
			}
			//console.log('param1',param);
			btraceDo(param);
			window.open(url);
		}

		exports.init = function(opt){
			$.extend(configs,opt);

			$(configs.el).find('.letterlist a').bind('click',function(e) {
				$.stopEvent(e);
				var zm = $(this).text();
				var selector = '#' + zm + '1';
				var height = 0;
				var bandlists = $(configs.el).find('#pic_bandlist');
				if( bandlists.children('div').length ){
					var prevDoms = $(selector).prevAll();
					for (var i = 0; i < prevDoms.length; i++) {
						 height += $(prevDoms[i]).height();
					};
				}
				$(configs.el).find('#pic_bandbox .optionbox-container').scrollTop(height);
			});

			this.getBand();
			$(configs.el).find(".items").each(function(){
				select({
					selector:$(this),
					btn:$(this).find('.tips').attr('data-value','')
				});
			});
			$(configs.el).find('.xbj').bind('click',this.submit);
		}
	});
	
		
	$(function(){
		require('selectpic').init();//汽车图片
	});
})(jQuery);



/**** 新闻列表 ****/

//加载更多
function getMoreInit(select,more,interval){
    var node = $(select),more = $(more);
    var sum = node.length,count = interval,i = 0;
    if(sum < count ){
        node.show();
        node.each(function(index,item){
             var src = $(item).find('img').attr('_src');
             $(item).find('img').attr('src',src)
        });
        more.hide();
        return;
    }
   if(select == "#xinche li"){
        more.show();
    }
    for(; i < count ; i++){
        node.eq(i).show()
        var src1 = node.eq(i).find('img').attr('_src');
        node.eq(i).find('img').attr('src',src1)
     }
    more.on('click',function(){
        if(i <= sum){
            for(var j =0;j<5;j++){
                node.eq(i+1).show();
                var src2 = node.eq(i+1).find('img').attr('_src');
                node.eq(i+1).find('img').attr('src',src2)
                i++;
            }
            if(i >= sum){
                more.hide();
            }
        }
    });
}
getMoreInit("#xinche li","#xincheGM",6);

//切换列表
$(".news_list .menus li").on("mouseover", function () {
    var ind = $(this).index();
    var flag = $(this).attr('flag');
    var name = $(this).attr('name');
    if( flag == 'true' ){
        getMoreInit("#"+ name +" li","#"+ name  +"GM",6);
        $(this).attr('flag',false);
     }
    $(".news_list .menus li a").removeClass('active');
    $(this).find('a').addClass('active');
    $(".news_list .list").hide().eq(ind).show();
    $(".news_list .list").eq(ind).length
    if($(".news_list .list").eq(ind).find('li').length <= 6 ){
        $(".getMore").hide().eq(ind).hide();
    }else{
        $(".getMore").hide().eq(ind).show();
    }
});

//分享
$('.newFoot .share').hover(function(){
    $(this).find('.shareList').show();
},function(){
    $(this).find('.shareList').hide();
});

//更新时间
var diyDays = 1; //特殊显示最近天数设置
$('.news_list .newFoot h5').each(function(){
	var pubtime = $(this).attr('data-pubtime');
	var pub_timestamp = Date.parse(pubtime) / 1000; //获取文章时间戳(以s为单位)
	var now_timestamp = Date.parse(new Date()) / 1000; //获取当前时间戳(以s为单位)
	var len_time = 60 * 60 * 24 * diyDays; //diyDays天的秒数
	var seconds = now_timestamp - pub_timestamp; //求时间差(以s为单位)
	if(seconds < len_time){
		var nD,nH,nM,nS,str='\u7EA6'; //约
		nD = Math.floor(seconds / (60 * 60 * 24));
		nH = Math.floor(seconds / (60 * 60)) % 24;
		nM = Math.floor(seconds / 60) % 60;
		nD && (str += nD + '\u5929'); //天
		nH && (str += nH + '\u5C0F\u65F6'); //小时
		nM && (str += nM + '\u5206\u949F'); //分钟
		str += '\u524D'; //前
		//console.log(now_timestamp + " - " + pub_timestamp + " = " + (now_timestamp - pub_timestamp));
		$(this).html(str);
	}
});

//分享到腾讯微博
function postToWb(title,pic,url){//参数说明：title说明文字，pic小图片，url分享要链接到的地址
	var _t = encodeURI(title);//当前页面title，使用document.title
	var _url = encodeURIComponent(url);//当前页的链接地址使用document.location
	var _appkey = 801298467;//你从腾讯获得的appkey，如果有appkey,直接写入key值，例如：_appkey=123456
	var _pic = encodeURI(pic);//（例如：var _pic='图片url1|图片url2|图片url3....）
	var _site = '';//你的网站地址
	var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic;
	w = window.screen.width, h = window.screen.height;
	window.open( _u,'分享到腾讯微博', "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}

//分享到QQ空间
function postToQzone(title,summary,pic,url){//参数说明：title标题，summary摘要，pic小图片，url分享要链接到的地址
	var p = {
		url:url,
		showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
		desc:'',/*默认分享理由(可选)*/
		summary:summary,/*分享摘要(可选)*/
		title:title,/*分享标题(可选)*/
		site:'',/*分享来源 如：腾讯网(可选)*/
		pics:pic, /*分享图片的路径(可选)*/
		style:'203',
		width:98,
		height:22
	};
	var s = [];
	for(var i in p){
		s.push(i + '=' + encodeURIComponent(p[i]||''));
	}
	var _u='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+s.join('&');
	w = window.screen.width, h = window.screen.height;
	window.open( _u,'分享到QQ空间和朋友网', "height=580,width=708,top=" + (h-580)/2 + ",left=" + (w-708)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}

//分享到新浪微博
function shareToSina(articleTitle,articleURL){
	var url = "http://v.t.sina.com.cn/share/share.php",
	_url = articleURL,
	_title = articleTitle,
	_appkey = '',
	_ralateUid = '',
	c = '', pic = [];
	w = window.screen.width, h = window.screen.height;
	c = url + "?url=" + encodeURIComponent(_url) + "&appkey=" + _appkey + "&title=" + _title + "&pic" + pic + "&ralateUid=" + _ralateUid + "&language=";
	window.open(c, "shareQQ", "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}


/**** 分屏加载图片 ****/

(function(){
var th=this;
th.pageSize=1000;/* 每屏大概高度为1000px */
th.pageQuotiety=0.5;/* 提前下载量 */
th.imgName="page_cnt_";/* 图片通用名 */
th.imgs=[];/* 每屏图片 [每屏所有图片，第一张图片，第一张图片绝对top:加载图片的top] */
var B = {};/* Browser check */B.ua = window.navigator.userAgent.toLowerCase();B.ie = /msie/.test(B.ua);B.moz = /gecko/.test(B.ua);B.opera = /opera/.test(B.ua);B.safari = /safari/.test(B.ua);
var $N=function(s,docu){var doc=docu?docu:document;return(typeof s=="object")?s:doc.getElementsByName(s);};
th.getWindowSize=function(){var a={};if(window.self&&self.innerWidth){a.width=self.innerWidth;a.height=self.innerHeight;return a;}if(document.documentElement&&document.documentElement.clientHeight){a.width=document.documentElement.clientWidth;a.height=document.documentElement.clientHeight;return a;}a.width=document.body.clientWidth;a.height=document.body.clientHeight;return a;}
th.getObjPosition=function(obj){var a={};a.x = obj.offsetLeft,a.y = obj.offsetTop;while(obj=obj.offsetParent){a.x += obj.offsetLeft;a.y += obj.offsetTop;}return a;}
th._getPageScroll=function(){var s;if (typeof(window.pageYOffset)!="undefined"){s = window.pageYOffset;}else if (document.documentElement && document.documentElement.scrollTop){s = document.documentElement.scrollTop;}else if (document.body){s = document.body.scrollTop;}return s;}
th._loadImages=function(a){if(!a)	return;var obj = a;if(typeof a == "string"){obj=$N(a);}for(var i=0;i<obj.length;i++){var s = obj[i];if(typeof s == "object"){if(s.getAttribute("_src")){s.setAttribute("src",s.getAttribute("_src"));s.removeAttribute("_src",0);}}}delete obj;obj=null;}
th._loadAllImgs=function(){var i=0;while(th.imgs[i]){th._loadImages(th.imgs[i][0]);i++;}}
th.getImgPosition=function(){var i=1;var p=$N(th.imgName+i);while(p&&p.length>0){var p=$N("page_cnt_"+i);var t=th.getImgLoadPosition(p[0]);th.imgs.push([p,p[0],t]);i++;p=$N(th.imgName+i);}}
th.getImgLoadPosition=function(a){var t={imgTop : 0  ,pageTop : 0};if(a){var w=th.getWindowSize();t.imgTop=parseInt(th.getObjPosition(a).y);t.pageTop=parseInt((t.imgTop/1000-th.pageQuotiety)*1000);}return t;}
th._addScrollEven=function(){if(B.ie){window.attachEvent("onscroll",th._scrollFn);}else{window.addEventListener("scroll",th._scrollFn,false);}}
th._removeScrollEven=function(){if(B.ie){window.detachEvent("onscroll",th._scrollFn);}else{window.removeEventListener("scroll",th._scrollFn,false);}}
th._scrollFn=function(){var y=th._getPageScroll();var w=th.getWindowSize().height;if(w==0){th._loadAllImgs();return;}var i=0;var j=0;while(th.imgs[i]){if( !( y+w < th.imgs[i][2].pageTop ) ){th._loadImages(th.imgs[i][0]);j++}i++;if(j>=th.imgs.length){th._removeScrollEven();}}}
th.getImgPosition();th._addScrollEven();th._scrollFn();
}
)()
/*  |xGv00|fba21c129f02c2d4fd1c1da166fdff6c */