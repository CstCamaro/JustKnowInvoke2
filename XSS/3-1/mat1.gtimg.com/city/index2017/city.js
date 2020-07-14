;(function($){
	var Focus = window["Focus"] = function(poster){
		var _this = this;
		this.focus = $(poster);
		this.focusBox = $(poster).find(".focus_inner");
		this.li = this.focusBox.find(".list");
		this.liW = this.li.width();
		this.focusDot = $(poster).find('.focus_dot');
		this.len = this.li.length;
		this.prevBtn = $(poster).find(".prevBtn");
		this.nextBtn = $(poster).find(".nextBtn");
		this.speed = 3000;
		this.index = 0;
		this.timer = null;
		this.init();
	};

	Focus.prototype = {

		play: function(){
			var _this = this;
			var $span = _this.focusDot.find('span');
			if (_this.index > _this.len-1){
                _this.index = 0;
            }else if(_this.index < 0){
             	_this.index = _this.len-1;
            }
            //左右箭头的小图
            if(_this.index == 0){
            	_this.prevBtn.find("img").attr("src", _this.li.eq(_this.len-1).find("img").attr("src"));
            	_this.nextBtn.find("img").attr("src", _this.li.eq(_this.index+1).find("img").attr("src"));	
            }else if(_this.index >= _this.len-1){
				_this.nextBtn.find("img").attr("src", _this.li.eq(0).find("img").attr("src"));
			}else if(_this.index < 0){
				 _this.prevBtn.find("img").attr("src", _this.li.eq(_this.len-1).find("img").attr("src"));
			}else{
				_this.prevBtn.find("img").attr("src", _this.li.eq(_this.index-1).find("img").attr("src"));
				_this.nextBtn.find("img").attr("src", _this.li.eq(_this.index+1).find("img").attr("src"));
			}

            $span.removeClass('on').eq(_this.index).addClass('on');
            $(_this.focusBox).stop().animate({
					left:+-_this.liW *_this.index
			},"slow");
			_this.index ++;
		},
		autoPlay: function(){
			var _this = this;
			_this.timer = window.setInterval(function(){
				_this.nextBtn.click();
			},5000);
		},
		stop: function(){
			var _this = this;
            clearInterval(_this.timer);
        },
		init: function(){
			var _this = this;
			var dot= ' ';
			for(var i=0; i< _this.len; i++){
				dot += '<span>'+(i+1)+'</span>';
			}
			_this.focusDot.html(dot);

			var w = _this.liW * _this.len;

			_this.focusBox.width(w);

			_this.autoPlay();
			_this.play();
			var $span = _this.focusDot.find('span');

			$span.bind("mouseover", function() {
                _this.index = $(this).index();
                _this.stop();
                _this.autoPlay();
                _this.play();

            });

			_this.focus.hover(
				function(){
					_this.stop();
				},
				function(){
					_this.autoPlay();
				}
			);

            _this.prevBtn.off().bind("mouseover", function() {
				$(this).addClass("focusBtnLHover");
			}).bind("mouseout", function() {
				$(this).removeClass("focusBtnLHover")
			});

			_this.nextBtn.off().bind("mouseover", function() {
				$(this).toggleClass("focusBtnRHover");
			}).bind("mouseout", function() {
				$(this).removeClass("focusBtnRHover")
			});

			//点击左右按钮
			this.prevBtn.on('click', function(){
				// if(_this.index < 0){
				// 	_this.index = _this.len-1;
				// }else{
				// 	_this.index--;
				// }
				_this.stop();
				_this.play();
				_this.autoPlay();
			});
			this.nextBtn.on('click', function(){
				// if(_this.index < _this.len-1){
				// 	_this.index++;
				// }else{
				// 	_this.index = 0;
				// }
				_this.stop();
				_this.play();
				_this.autoPlay();
				
			})

		}

	};
})(jQuery)

;(function($){
    /**
     * @name    qqfocus     页卡函数
     * @param   {Object}    初始值
     */
    $.fn.qqfocus = function(options){
        var focuser = {};
        var opts = $.extend({}, {
            event: 'mouseover',     //mouseover click
            conbox: '.focus_inner',   //内容容器
            condot: '.focus_dot',   //切换容器
            conitem: '.list',       //内容标签class
            dotitem: 'span',           //切换器标签 默认为a
            current: 'on',     //切换样式
            effect: 'fade',         //切换效果 scrollx|scrolly|fade|none
            speed: 1000,            //动画速度
            space: 3000,            //时间间隔
            auto: true,              //自动滚动
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

                 //左右箭头的小图
	            if(focuser.index == 0){
	            	focuser.prev.find("img").attr("src", focuser.conitem.eq(focuser.conitem.length-1).find("img").attr("src"));
	            	focuser.next.find("img").attr("src", focuser.conitem.eq(focuser.index+1).find("img").attr("src"));	
	            }else if(focuser.index == focuser.conitem.length-1){
	            	focuser.prev.find("img").attr("src", focuser.conitem.eq(focuser.conitem.length-2).find("img").attr("src"));
					focuser.next.find("img").attr("src", focuser.conitem.eq(0).find("img").attr("src"));
				}else{
					focuser.prev.find("img").attr("src", focuser.conitem.eq(focuser.index-1).find("img").attr("src"));
					focuser.next.find("img").attr("src", focuser.conitem.eq(focuser.index+1).find("img").attr("src"));
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

                 focuser.prev.bind("mouseover", function(){
                 	$(this).addClass("focusBtnLHover");
                 }).bind("mouseout", function() {
					$(this).removeClass("focusBtnLHover")
				});;	

				focuser.next.bind("mouseover", function() {
					$(this).addClass("focusBtnRHover");
				}).bind("mouseout", function() {
					$(this).removeClass("focusBtnRHover")
				});

/*
                // touchmove
                focuser.conbox[0].addEventListener("touchmove", touchMove, false);
                focuser.conbox[0].addEventListener("touchstart", touchStart, false);
                focuser.conbox[0].addEventListener("touchend", touchEnd, false);

                var startX = 0;
                var startY = 0;
                var curX = 0;
                var curY = 0;
                var endX = 0;
                var endY = 0;

                function touchStart(event) {
                    var tc = event.touches[0];
                    startX = tc.pageX;
                    startY = tc.pageY;
                }

                function touchEnd(event) {
                    console.log("cur", curX, curY);
                    if(curX > 50){
                        focuser.index = focuser.index == -2 ? 1 : focuser.index - 2;
                        focuser.fn.stop();
                        focuser.fn.slide();
                        focuser.fn.play();
                    }
                    if(curX < -50){
                        focuser.fn.stop();
                        focuser.fn.slide();
                        focuser.fn.play();
                    }
                }
                function touchMove(event) {
                    event.preventDefault();
                    curX = event.targetTouches[0].pageX - startX;
                    curY = event.targetTouches[0].pageY - startY;
                }
*/
            }
        };
        focuser.fn.init();
    }
})(jQuery);

//点击更多
;(function($){
	var ViewMore = window["ViewMore"] = function(poster){
		var _this = this;
		_this.moreBtn = $(poster).find(".loadmoreBtn");
		_this.moreCont = $(poster).find(".more_item");
		_this.html = $(_this.moreBtn).html();
		_this.init();
		
	};

	ViewMore.prototype = {
		play: function(){
			var _this = this;
			var flag = $(_this.moreBtn).attr("flag");
			var height = $(_this.moreBtn).height();
			if(flag == 'yes'){
				$(_this.moreCont).show();
				$(_this.moreBtn).html("收起").attr("flag","no");
			}
			else if(flag == 'no'){
				$(_this.moreCont).hide();
				$(_this.moreBtn).html(_this.html).attr("flag","yes");
			}
		},

		init: function(){
			var _this = this;
			_this.moreBtn.on('click', function(event) {
				_this.play();
			});
		}	
	}

})(jQuery)

//城市切换
$("#change_btn").on('click',  function(event) {
	$("#mod_area").show('200');
});
$("#close").on('click', function(event) {
	$("#mod_area").hide('200');
});

//天气
var  weather = {
	init: function(){
		var _this = this;
		_this.cityid =''; //城市id
		_this.cityname = ''; //城市名
		_this.pid = ''; //省份id
		_this.getCity();
	},
	getCity: function(){
		var _this = this;
		$.ajax({		
			url: '//i.city.qq.com/common/ipInfo',
			method: "get",
			dataType: "jsonp",
			jsonpCallback: "call",
			jsonp:'cb',
			success: function(res) {
				_this.cityname = res.data.cname;
				_this.cityid = res.data.cid;
				$("#cityname").html(_this.cityname);
				_this.getDeep();
			}	
		});	

	},
	getDeep: function(){
		var _this = this;
		$.ajax({		
			url: '//i.city.qq.com/common/weather?cityId=' + _this.cityid,
			method: "get",
			dataType: "jsonp",
			jsonpCallback: "call",
			jsonp:'cb',
			success: function(res) {
				var curWeather = res.data.curWeather;
				var temp = res.data.curTemp;
				var html ='';
				$("#citytemp").html(curWeather+' ' +temp + '℃');
			}	
		});	
	}

}
//页卡
;(function ($) {
    /**
     * @name    tabs        页卡函数
     * @param   {Object}    初始值
     * @type    {Object}    返回对象本身
     */
    $.fn.tabs = function (options) {
        var config = {
            index: 0,
            current:"current",
            type: "mouseover",
            hdItem: ".tab_hd_item",
            bdItem: ".tab_bd_item"
        },
        obj = $(this),
        opts = $.extend({}, config, options);

        $(opts.hdItem, obj).bind(opts.type, function(){
            if(opts.index != $(opts.hdItem, obj).index($(this))){
                opts.index = $(opts.hdItem, obj).index($(this));
                setCurrent();
            }
        });

        function setCurrent(){
            $(opts.hdItem, obj).removeClass(opts.current).eq(opts.index).addClass(opts.current);
            $(opts.bdItem, obj).css({"display":"none"}).eq(opts.index).css({"display":"block"});
            //$(opts.bdItem, obj).addClass("hide").eq(opts.index).removeClass('hide').height(height);
            //$(opts.bdItem, obj).removeClass(opts.current).eq(opts.index).addClass(opts.current);
        }
        setCurrent();
        return obj;
    };
})(jQuery);

//左右滚动
;(function($){
    // 默认值
    $.qqScroll = {
        defaults:{
            direction:"right",  // 滚动方向
            step:1,             // 滚动步长
            speed:800,          // 滚动速度
            time:4000,          // 自动滚动间隔时间
            auto:true,          // 是否自动滚动
            prev:".prevBtn",       // prev 按钮class
            next:".nextBtn",        // next 按钮class
            inner:".inner",        // next 按钮class
            list:".list",        // next 按钮class
            split:".split"        // next 按钮class
        }
    }

    $.fn.qqScroll = function (options){

        var opts = $.extend({}, $.qqScroll.defaults, options),
            obj = $(this),
            scroller = {};

            scroller.box = obj.find(opts.inner);
            scroller.list = scroller.box.find(opts.list);
            scroller.items = scroller.list.find(opts.split);
            scroller.itemSum = scroller.items.length;
            scroller.prevBtn = obj.find(opts.prev);
            scroller.nextBtn = obj.find(opts.next);
            scroller.itemWidth = scroller.items.outerWidth()+ parseInt(scroller.items.css("margin-right"));
            scroller.itemHeight = scroller.items.outerHeight();

        scroller.fn = {
            start: function() {
                if (!opts.auto) {
                    return;
                }
                scroller.fn.stop();
                scroller.run = setTimeout(function() {
                    scroller.fn.goto(opts.direction);
                }, opts.time);
            },
            stop: function() {
                if (typeof(scroller.run) !== "undefined") {
                    clearTimeout(scroller.run);
                }
            },
            addControl: function() {
                if (scroller.prevBtn.length) {
                    scroller.prevBtn.bind("click", function() {
                        scroller.fn.goto(scroller.prevVal);
                    });
                }
                if (scroller.nextBtn.length) {
                    scroller.nextBtn.bind("click", function() {
                        scroller.fn.goto(scroller.nextVal);
                    });
                }
            },
            removeControl: function() {
                if (scroller.prevBtn.length) {
                    scroller.prevBtn.unbind("click");
                }
                if (scroller.nextBtn.length) {
                    scroller.nextBtn.unbind("click");
                }
            },
            goto: function(d) {
                scroller.fn.stop();
                scroller.fn.removeControl();
                scroller.box.stop(true);
                var _max;
                var _dis;
                switch (d) {
                    case "left":
                    case "top":
                        _max = 0;
                        if (d == "left") {
                            if (parseInt(scroller.box.scrollLeft(), 10) == 0) {
                                scroller.box.scrollLeft(scroller.itemSum * scroller.moveVal);
                            }
                            _dis = scroller.box.scrollLeft() - (scroller.moveVal * opts.step);

                            if (_dis < _max) {
                                _dis = _max
                            }
                            scroller.box.animate({"scrollLeft": _dis}, opts.speed, function() {
                                if (parseInt(scroller.box.scrollLeft(), 10) <= _max) {
                                    scroller.box.scrollLeft(0);
                                }
                                scroller.fn.addControl();
                            });
                        } else {
                            if (parseInt(scroller.box.scrollTop(), 10) == 0) {
                                scroller.box.scrollTop(scroller.itemSum * scroller.moveVal);
                            }
                            _dis = scroller.box.scrollTop() - (scroller.moveVal * opts.step);
                            if (_dis < _max) {
                                _dis = _max
                            }
                            scroller.box.animate({"scrollTop": _dis}, opts.speed, function() {
                                if (parseInt(scroller.box.scrollTop(), 10) <= _max) {
                                    scroller.box.scrollTop(0);
                                }
                                scroller.fn.addControl();
                            });
                        }
                        break;
                    case "right":
                    case "bottom":
                        _max = scroller.itemSum * scroller.moveVal;
                        if (d == "right") {
                            _dis = scroller.box.scrollLeft() + (scroller.moveVal * opts.step);
                            if (_dis > _max) {
                                _dis = _max
                            }
                            scroller.box.animate({"scrollLeft": _dis}, opts.speed, function() {
                                if (parseInt(scroller.box.scrollLeft(), 10) >= _max) {
                                    scroller.box.scrollLeft(0);
                                }
                            });
                        } else {
                            _dis = scroller.box.scrollTop() + (scroller.moveVal * opts.step);
                            if (_dis > _max) {
                                _dis = _max
                            }
                            scroller.box.animate({"scrollTop": _dis}, opts.speed, function() {
                                if (parseInt(scroller.box.scrollTop(), 10) >= _max) {
                                    scroller.box.scrollTop(0);
                                };
                            });
                        }
                        break;
                }
                scroller.box.queue(function() {
                    scroller.fn.addControl();
                    scroller.fn.start();
                    $(this).dequeue();
                });
            },

            init: function(){

                if (scroller.itemSum <= 1) {
                    return;
                }

                if (opts.direction == "left" || opts.direction == "right") {
                    if (scroller.itemWidth * scroller.itemSum <= scroller.box.outerWidth()) {return;}
                    scroller.prevVal = "left";
                    scroller.nextVal = "right";
                    scroller.moveVal = scroller.itemWidth;
                } else {
                    if (scroller.itemHeight * scroller.itemSum <= scroller.box.outerHeight()) {return;}
                    scroller.prevVal = "top";
                    scroller.nextVal = "bottom";
                    scroller.moveVal = scroller.itemHeight;
                }

                scroller.list.append(scroller.list.html());
                if (opts.direction == "left" || opts.direction == "right") {
                    scroller.list.css({
                        width: scroller.itemWidth * scroller.itemSum * 2 + "px"
                    })
                }

                scroller.box.hover(function() {
                    scroller.fn.stop();
                }, function() {
                    scroller.fn.start();
                });
                scroller.fn.addControl();
                scroller.fn.start();
            }
        }

        scroller.fn.init();
    }

})(jQuery);


//鼠标滚动事件
$(window).bind("scroll",function(){
	var scrollTopH= $(window).scrollTop();
	if (scrollTopH > 300) {//右侧浮层显示与否
		//alert(scrollTopH);
		$("#mod_pop").show();
	} else {
		$("#mod_pop").hide();
	}
})
$("#mobile_enter").hover(
  function () { 
    $("#erweima").show();
  },
  function () {
     $("#erweima").hide();
  }
)
$("#gotop").click(function() {
	window.scrollTo(0,0)
	return true;
})	

//分享
function postToWb(title,pic,url){
		var _t = encodeURI(title);//当前页面title，使用document.title
		var _url = encodeURIComponent(url);//当前页的链接地址使用document.location
		var _appkey = 801298467;//你从腾讯获得的appkey，如果有appkey,直接写入key值，例如：_appkey=123456
		var _pic = encodeURI(pic);//（例如：var _pic='图片url1|图片url2|图片url3....）
		var _site = '';//你的网站地址
		var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic;
		w = window.screen.width, h = window.screen.height;
		window.open( _u,'分享到腾讯微博', "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}
//参数说明：title标题，summary摘要，pic小图片，url分享要链接到的地址
function postToQzone(title,summary,pic,url){
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
//分享到腾讯朋友

function postToPengYon(title,pic,url){
var p = {
	url:url,
	to:'pengyou',
	desc:'',/*默认分享理由(可选)*/
	summary:'',/*摘要(可选)*/
	title:title,/*分享标题(可选)*/
	site:'',/*分享来源 如：腾讯网(可选)*/
	pics:pic /*分享图片的路径(可选)*/
};
var s = [];
for(var i in p){
	s.push(i + '=' + encodeURIComponent(p[i]||''));
}
w = window.screen.width, h = window.screen.height;
var _u = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+s.join('&');
window.open( _u,'分享到朋友网', "height=580,width=708,top=" + (h-580)/2 + ",left=" + (w-708)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}
//分享到QQ邮箱
function postToQQEmail(title,summary,pic,url){
var p = {
	url:url,/*当前页面url，使用location.href*/
	to:'qqmail',
	desc:'', /*默认分享理由(可选)*/
	summary:summary,/*摘要(可选)*/
	title:title,/*分享标题(可选)*/
	site:'',/*分享来源 如：腾讯网(可选)*/
	pics:pic /*分享图片的路径(可选)*/
};
var s = [];
	for(var i in p){
	s.push(i + '=' + encodeURIComponent(p[i]||''));
}
w = window.screen.width, h = window.screen.height;
var _u = 'http://mail.qq.com/cgi-bin/qm_share?'+ s.join("&");
window.open( _u,'分享到QQ邮箱', "height=580,width=708,top=" + (h-580)/2 + ",left=" + (w-708)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
};
//分享到新浪
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
		

//分享到开心
function shareToKaixin(articleTitle,articleURL){
	var url = "http://www.kaixin001.com/rest/records.php",
	_url = articleURL,
	_title = articleTitle,
	c = '', pic = [],
	w = window.screen.width, h = window.screen.height;
	c = url + "?content=" + encodeURIComponent(_title) + "&url=" + _url + "&&starid=&aid=&style=11&t=10";
	var win = window.open(c, "shareQQ", "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}

//分享到人人

function shareToRenren(articleTitle,articleURL){
	var url = "http://widget.renren.com/dialog/share",
	_url =articleURL,
	_title =articleTitle,
	c = '', pic = [],
	w = window.screen.width, h = window.screen.height;
	
	c = url + "?resourceUrl=" + _url + "&title=" + _title + "&charset=GB2312";

	window.open(c, "shareQQ", "height=480,width=608,top=" + (h-480)/2 + ",left=" + (w-608)/2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}









/*  |xGv00|4f915f99ce143cde86957500c154aea5 */