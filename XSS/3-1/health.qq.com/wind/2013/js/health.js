var GG = jQuery.noConflict();
var Health=function(){};
Health.prototype={
	firstNav:function(){
		GG("#healthNav li").hover(function(){
				GG(this).addClass("show" + GG(this).attr("name"));
				GG(this).find("span").attr("class",GG(this).attr("name"));
				GG(this).find("div").css("z-index","10").show().parent().siblings().find("div").css("z-index","1").hide();
				GG("#subNavBg").show();
				if(GG("body").attr("id") !== ""){
					GG(this).find("div").show();
				}
				if(GG(this).find("div").html() ===""){
					GG("#subNavBg").show();
					GG(this).find("div").hide();
				}
				if(GG(this).find("div").html() ==="" && GG("body").attr("id") === ""){
					GG("#subNavBg").hide();
					GG(this).find("div").hide();
				}
			},function(){
				GG(this).removeClass("show" + GG(this).attr("name"));
				GG("#subNavBg").hide();
				GG(this).find("div").hide();
				if(GG("body").attr("id") !== ""){
					GG("#subNavBg").show();
				}
				if(GG(this).find("div").html() ===""){
					GG("#subNavBg").show();
				}
				if(GG(this).find("div").html() ==="" && GG("body").attr("id") === ""){
					GG("#subNavBg").hide();
					GG(this).find("div").hide();
				}
			});
			if(GG("body").attr("id") == ""){
				GG("#healthNav a").each(function(){
					GG(this).attr("target","_blank")
				})
			}
	},
	focusFirst:function(){
		var sWidth = GG("#focus").width(); //获取焦点图的宽度（显示面积）
		var len = GG("#focus ul li").length; //获取焦点图个数
		var index = 0;
		var picTimer;
		
		//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
		var btn = "<div class='btnBg'></div><div class='btn'>";
		for(var i=0; i < len; i++) {
			btn += "<span></span>";
		}
		btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
		GG("#focus").append(btn);
	
		//为小按钮添加鼠标滑入事件，以显示相应的内容
		GG("#focus .btn span").mouseover(function() {
			index = GG("#focus .btn span").index(this);
			showPics(index);
		}).eq(0).trigger("mouseover");
	
		//上一页、下一页按钮透明度处理
		GG("#focus .preNext").css("opacity",1).hover(function() {
			GG(this).stop(true,false);
		},function() {
			GG(this).stop(true,false);
		});
	
		//上一页按钮
		GG("#focus .pre").click(function() {
			index -= 1;
			if(index == -1) {index = len - 1;}
			showPics(index);
		});
	
		//下一页按钮
		GG("#focus .next").click(function() {
			index += 1;
			if(index == len) {index = 0;}
			showPics(index);
		});
	
		//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
		GG("#focus ul").css("width",sWidth * (len));
		
		//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
		GG("#focus").hover(function() {
			clearInterval(picTimer);
		},function() {
			picTimer = setInterval(function() {
				showPics(index);
				index++;
				if(index == len) {index = 0;}
			},4000); //此4000代表自动播放的间隔，单位：毫秒
		}).trigger("mouseleave");
		
		//显示图片函数，根据接收的index值显示相应的内容
		function showPics(index) { //普通切换
			var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
			GG("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
			GG("#focus .btn span").stop(true,false).addClass("on").eq(index).stop(true,false).removeClass("on"); //为当前的按钮切换到选中的效果
		}
		GG("#focus").hover(function(){
			GG(".preNext").show();
		},function(){
			GG(".preNext").hide();	
		})
	},
	tabs:function(){
		GG(".f_tab p a").hover(function(){
			GG(this).addClass("on").siblings().removeClass("on");
			var index = GG(".f_tab p a").index(this);
			GG(".f_tab_con ul").eq(index).attr("class","dis").siblings().attr("class","undis");
		})	
	},
	trumpHover:function(){
		GG("#trumpCon li").hover(function(){
			GG("#trumpCon .bd").hide();
			GG(this).find(".bd").show();
			GG(this).css("border-color","#ffffff").siblings().css("border-color","#d6d6d6");
		});
	},
	convenientTool:function(){
		GG("#convenientTool img").each(function(){
			GG(this).hover(function(){
				GG(this).animate({opacity:"1"});
			},function(){
				GG(this).animate({opacity:"0.4"});	
			})	
		})	
	},
	videoSYtab:function(vi,ci){
		GG(vi).hover(function(){
			GG(this).attr("id",GG(this).attr("class")).siblings().attr("id","");
			//var vIndex = GG(vi).index(this);
			//GG(ci).eq(vIndex).show().siblings().hide();
		},function(){
			GG(this)	.attr("id","")
		})	
	},
	healthTab:function(ht,hc){
		GG(ht).hover(function(){
			GG(this).addClass("on").siblings().removeClass("on");	
			var hIndex = GG(ht).index(this);
			GG(hc).eq(hIndex).show().siblings().hide();
		})	
	},
	newsLoadMore:function(ni,nii){
		GG(ni).click(function(){
			GG(this).siblings("ul").eq(1).slideDown();
			GG(this).hide();
			GG(nii).removeClass("undis").show();
				
		})
		GG(nii).click(function(){
			GG(this).siblings("ul").eq(1).slideUp();	
			GG(this).hide();
			GG(ni).removeClass("undis").show();
		})
	},
	backTop:function(){
		(function() {
			var GbackToTopTxt = "返回顶部", GbackToTopEle = GG('<a class="backToTop"></a>').appendTo(GG("body"))
				.text(GbackToTopTxt).attr("title", GbackToTopTxt).click(function() {
					GG("html, body").animate({ scrollTop: 0 }, 120);
			}), GbackToTopFun = function() {
				var st = GG(document).scrollTop(), winh = GG(window).height();
				(st > 500)? GbackToTopEle.show(): GbackToTopEle.hide();    
				//IE6下的定位
				if (!window.XMLHttpRequest) {
					GbackToTopEle.css("top", st + winh - 166);    
				}
			};
			GG(window).bind("scroll", GbackToTopFun);
			GG(function() { GbackToTopFun(); });
			GG(".backToTop").hover(function(){
				GG(this).addClass("backToTop_hover")	
			},function(){
				GG(this).removeClass("backToTop_hover")	
			})
		})();
	},
	wxtip:function(){
		GG.ajax({
			url : "http://999.act.qq.com/user/seasonShow",
			dataType : 'jsonp',
			data :'',
			success : function(e){
				var jsn = GG.parseJSON(e);
				var seasonDate=jsn.data.seasonDate;
				var mystr=seasonDate.split("-");
	
				GG(".BBC_seasonShowY").html(mystr[0]);
				GG(".BBC_seasonShowM").html(mystr[1]);
				GG(".BBC_seasonShowD").html(mystr[2]); 
				GG(".BBC_seasonName").html(jsn.data.seasonShowText.seasonName);
				GG(".BBC_seasonIntro").html('<span class="fb">节气简介：</span>'+jsn.data.seasonShowText.seasonIntro);
				if(jsn.data.seasonShowText.seasonHealth.length>22){
						jsn.data.seasonShowText.seasonHealth=jsn.data.seasonShowText.seasonHealth.substring(0,22)+"...";}
					else{
						jsn.data.seasonShowText.seasonHealth=jsn.data.seasonShowText.seasonHealth
				}
				GG(".BBC_seasonHealth").html('<span class="fb">最佳饮食：</span>'+jsn.data.seasonShowText.seasonHealth);
			}
		})
	},
	secWeiBoHeader:function(){
		GG("#zhuan").click(function(){
			var _t = "【" + GG(this).parent().parent().parent().find("h3").text() + "】" + GG(this).parent().parent().parent().find("p.text span").text();
			var _url = "http://health.qq.com" + GG(this).parent().parent().parent().find("h3 a").attr("href");
			var _appkey = encodeURI("");
			var _pic = GG(this).parent().parent().parent().find("img").attr("src");
			var _site = '';
			var _u = 'http://v.t.qq.com/share/share.php?url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic+'&title='+_t;
			window.open( _u,'', 'width=900, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
			return false;
			
		})	
	}

}

function postToWb(title,pic,url){
	var _t = title;//当前页面title，使用document.title
	var _url = encodeURIComponent(url);//当前页的链接地址使用document.location
	var _appkey = '';//你从腾讯获得的appkey，如果有appkey,直接写入key值，例如：_appkey=123456
	var _pic = encodeURI(pic);//（例如：var _pic='图片url1|图片url2|图片url3....）
	var _site = '';//你的网站地址
	var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic;
	window.open( _u,'', 'width=900, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
}

var wind = new Health;
wind.firstNav();
wind.focusFirst();
wind.tabs();
wind.convenientTool();
wind.trumpHover();
wind.videoSYtab("#video .hd ul li",".vCons .vCons_con");
wind.videoSYtab("#healthPic .hd p a",".#healthPic .bd ul");
wind.healthTab(".hBtn a","#healthFocus .con .box");
wind.healthTab(".fFouce span a",".fFouce .con .boxx");
wind.newsLoadMore();
wind.newsLoadMore("#newsMore","#newsMoreClose")
wind.newsLoadMore("#diseaseMore","#diseaseMoreClose")
wind.newsLoadMore("#foodSafetyMore","#foodSafetyMoreClose")
wind.newsLoadMore("#sybjMore","#sybjMoreClose")
wind.backTop();
wind.wxtip();
wind.secWeiBoHeader();

/*  |xGv00|3b6b99736ddeef65e702580b291da6ea */