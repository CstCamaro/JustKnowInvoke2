//页面常量设置
//var yearArr = ["2018","2017","2016","2015","2014"];//年份数组(可扩充)
var yearID = yearArr[0];//默认年份
var tabArr =["date","pageview","comment","level","brand","useway","country"];//时间,关注度,评论热度,级别,品牌,车辆用途,国别

doAjax(tabArr[0],yearID);//加载默认页面

//年份选择
function yearFn(n){
	for(i=0;i<$(".year dd").length;i++){
		$(".year dd")[i].className=i==n?"active":"";
	}
	yearID = yearArr[n];
	tabFn(0);//选择年份后默认加载第一个功能
	//console.log(yearID);
}

//功能选择
function tabFn(n){
	for(i=0;i<$("#tabTit li").length;i++){
		$("#tabTit li")[i].className=i==n?"active":"";
		$("#tabBod div")[i].className=n==1||n==2?"undis":i==n?"dis":"undis";
		$("#lists")[0].className="lists"+n;
	}

	doAjax(tabArr[n],yearID);
}

//渲染li
function drawLi(d,tab){
	var liStr = '';
	var imgSrc = d.FHtmlTitle.substr(0,5) == 'http:' ? d.FHtmlTitle : d.FImgUrl;
	liStr += '\t\t\t' + '<li>' + '\n';
	liStr += '\t\t\t\t' + '<a target="_blank" href="' + d.FUrl + '">\n';
	liStr += '\t\t\t\t\t' + '<img _src="' + imgSrc + '" alt="' + d.FTitle + '" title="' + d.FTitle + '" />' + '\n';
	liStr += '\t\t\t\t' + '</a>' + '\n';
	liStr += '\t\t\t\t' + '<h4>' + '\n';
	liStr += '\t\t\t\t\t' + '<a target="_blank" href="' + d.FUrl + '">' + d.FTitle + '</a>' + '\n';
	liStr += '\t\t\t\t' + '</h4>' + '\n';
	liStr += '\t\t\t\t' + '<p class="argument">' + '\n';
	liStr += '\t\t\t\t\t' + '<a target="_blank" href="//data.auto.qq.com/car_serial/' + d.FSerialID + '/">\u8F66\u578B\u5E93</a>|' + '\n';
	liStr += '\t\t\t\t\t' + '<a target="_blank" href="//data.auto.qq.com/car_serial/' + d.FSerialID + '/modelscompare.shtml">\u53C2\u914D</a>|' + '\n';
	liStr += '\t\t\t\t\t' + '<a target="_blank" href="//data.auto.qq.com/piclib/index.shtml#sid=' + d.FSerialID + '">\u56FE\u5E93</a>|' + '\n';
	liStr += '\t\t\t\t\t' + '<a target="_blank" href="//data.auto.qq.com/car_serial/' + d.FSerialID + '/news.shtml">\u65B0\u95FB</a>|' + '\n';
	liStr += '\t\t\t\t' + '</p>' + '\n';
	liStr += '\t\t\t\t' + '<p class="info">' + '\n';
	liStr += '\t\t\t\t\t' + '<a href="javascript:void(0);" target="_self" class="date">' + d.FDate.substr(0,4) + '.' + d.FDate.substr(4,2) + '.' + d.FDate.substr(6,2) + '</a>' + '\n';
	if(d.FPV != 0){
		liStr += '\t\t\t\t\t' + '<a href="javascript:void(0);" target="_self" class="pv">' + d.FPV + '</a>' + '\n';
	}
	liStr += '\t\t\t\t\t' + '<a target="_blank" class="comment" href="//coral.qq.com/' + d.FCommentID + '">' + d.FCommentNum + '</a>' + '\n';
	liStr += '\t\t\t\t' + '</p>' + '\n';
	liStr += '\t\t\t\t' + '<a class="askprice btn" href="javascript:void(0);" autobussboss="trydrive|carsdaily_serial|16" sign_type="2" serial_id="' + d.FSerialID + '">\u9884\u7EA6\u8BD5\u9A7E</a>' + '\n';
	//liStr += '\t\t\t\t' + '<strong>\u9884\u7EA6\u8BD5\u9A7E</strong>' + '\n';
	if((tab == "date") && d.FIsHot == "1"){
		liStr += '\t\t\t\t' + '<em></em>' + '\n';
	}
	liStr += '\t\t\t' + '</li>' + '\n';
	return liStr;
}

//列表结尾
function drawFoot(){
	$("body").append('<script type="text/javascript" src="//mat1.gtimg.com/auto/js/car2013/dealer_admin/registration.js?action=pop&type=calendar_pic&w=480&bgcolor=ffffff&color=676767" charset="utf-8"><\/script>');

	//滚动定位
	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('!5($){5 x(r,7){8 u=$.E(2.u,2),e=$(r).1b("14")?$(z):$(r),c;2.7=$.S({},$.9.p.H,7);2.s=e.A("C.C.3-G",u);2.B=(2.7.L||((c=$(r).12("c"))&&c.1p(/.*(?=#[^\\s]+$)/,""))||"")+" .1i R > a";2.b=$("14").A("U.C.3-G",2.B,u);2.16();2.u()}x.X={1j:x,16:5(){2.q=2.b.M(2.B).19(5(){8 c=$(2).12("c");n/^#\\w/.1h(c)&&$(c).W?c:y});2.o=$.19(2.q,5(1c){n $(1c).D().h})},u:5(){8 g=2.s.g()+2.7.6,o=2.o,q=2.q,I=2.I,i;1k(i=o.W;i--;){I!=q[i]&&g>=o[i]&&(!o[i+1]||g<=o[i+1])&&2.V(q[i])}},V:5(L){8 k;2.I=L;2.b.M(2.B).N(".k").18("k");k=2.b.M(2.B+\'[c="\'+L+\'"]\').N("R").P("k");d(k.N(".T-1r")){k.1q("R.T").P("k")}}};$.9.p=5(f){n 2.K(5(){8 t=$(2),3=t.3("p"),7=m f=="O"&&f;d(!3){t.3("p",(3=Y x(2,7)))}d(m f=="Z"){3[f]()}})};$.9.p.13=x;$.9.p.H={6:10};$(5(){$(\'[3-15="C"]\').K(5(){8 s=$(2);s.p(s.3())})})}(z.1e);!5($){8 J=5(r,7){2.7=$.S({},$.9.4.H,7);2.w=$(z).A("C.4.3-G",$.E(2.F,2)).A("U.4.3-G",$.E(5(){1m($.E(2.F,2),1)},2));2.e=$(r);2.F()};J.X.F=5(){d(!2.e.1b(":1l")){n}8 1f=$(1s).1a(),g=2.w.g(),D=2.e.6(),6=2.7.6,l=6.v,j=6.h,11="4 4-h 4-v",4;d(m 6!="O"){l=j=6}d(m j=="5"){j=6.h()}d(m l=="5"){l=6.v()}4=2.Q!=y&&(g+2.Q<=D.h)?1g:l!=y&&(D.h+2.e.1a()>=1f-l)?"v":j!=y&&g<=j?"h":1g;d(2.1d===4){n}2.1d=4;2.Q=4=="v"?D.h-g:y;2.e.18(11).P("4"+(4?"-"+4:""))};8 17=$.9.4;$.9.4=5(f){n 2.K(5(){8 t=$(2),3=t.3("4"),7=m f=="O"&&f;d(!3){t.3("4",(3=Y J(2,7)))}d(m f=="Z"){3[f]()}})};$.9.4.13=J;$.9.4.H={6:0};$.9.4.1o=5(){$.9.4=17;n 2};$(z).A("1n",5(){$(\'[3-15="4"]\').K(5(){8 s=$(2),3=s.3();3.6=3.6||{};3.l&&(3.6.v=3.l);3.j&&(3.6.h=3.j);s.4(3)})})}(z.1e);',62,91,'||this|data|affix|function|offset|options|var|fn|||href|if||option|scrollTop|top||offsetTop|active|offsetBottom|typeof|return|offsets|scrollspy|targets|element|||process|bottom||ScrollSpy|null|window|on|selector|scroll|position|proxy|checkPosition|api|defaults|activeTarget|Affix|each|target|find|parent|object|addClass|unpin|li|extend|dropdown|click|activate|length|prototype|new|string||reset|attr|Constructor|body|spy|refresh|old|removeClass|map|height|is|id|affixed|jQuery|scrollHeight|false|test|nav|constructor|for|visible|setTimeout|load|noConflict|replace|closest|menu|document'.split('|'),0,{}));

	$(".sortsBar").affix({
		offset: {
			top: function() {
				return $(".sorts").offset().top;
			}
		}
	});
	$("#lists h2").each(function(i){
		$("#lists h2").eq(i).affix({
			offset: {
				top: function() {
					return $("#lists h2").eq(i).parent("div.item").offset().top - 135;
				}
			}
		});
	});
	$("#lists .brandLetter").each(function(i){
		$("#lists .brandLetter").eq(i).affix({
			offset: {
				top: function() {
					return $("#lists .brandLetter").eq(i).parent(".brandItem").eq(0).offset().top - 135;
				}
			}
		});
	});
	$(".brandItem .item").each(function(i){
		var n = $(this).find("li").length;
		$(".brandItem .item").eq(i).css({"height":328*Math.ceil(n/3)+35});
	});
	$('body').scrollspy('refresh');//当滚动监听所作用的DOM有增删页面元素的操作时，需要调用refresh方法
	$('body').scrollspy({
		target: '.sortsBar',
		offset: -90
	});
	$("#tabBod li a").click(function(event) {
		event.preventDefault();
		var $target = $(this.hash);
		var targetOffset = $target.offset().top - 135;
		$(this).parent().addClass('active').siblings().removeClass('active')
		$('html, body').animate({
			scrollTop: targetOffset
		}, 500);
	});

	if($("#lists li").length == 0){
		$("#lists").empty().append('<div class="loading">\u672C\u5E74\u5EA6\u6CA1\u6709\u65B0\u8F66\u6570\u636E\u3002</div>');
	}

	//分屏加载(用拼接是因为IE7不兼容为name属性赋值，比如用attr(key,value))
	var imgArr= document.getElementById("lists").getElementsByTagName("img");
	for(var i=0; i<imgArr.length; i++){
		var imgStrArr = [];
		imgStrArr = imgArr[i].outerHTML.split("_src");
		imgArr[i].outerHTML = imgStrArr[0] + 'name="page_cnt_' + (Math.floor(i/9) + 1) + '" _src' + imgStrArr[1];
	}

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

}

//按需加载
function doAjax(tabItem,yearID){
	$("#lists").empty().append('<div class="loading"><img src="//mat1.gtimg.com/auto/00s/0/rili/images/loading-aio.gif" alt="\u6B63\u5728\u52A0\u8F7D\u5185\u5BB9, \u8BF7\u7A0D\u5019..." />\u6B63\u5728\u52A0\u8F7D\u5185\u5BB9, \u8BF7\u7A0D\u5019...</div>');

	//时间(data)
	if(tabItem == "date"){
		$.ajax({
			url:"//cgi.data.auto.qq.com/php/index.php?mod=carnews&act=carsdaily&year=" + yearID + "&sort=1",
			dataType:"jsonp",
			success: function(d){
				var monthNumArr = ["12","11","10","09","08","07","06","05","04","03","02","01"];
				//刷新页卡列表
				$("#tabBod ul").empty().removeClass("nav");
				$(".month").empty().addClass("nav");
				for(var i=0; i<monthNumArr.length; i++){
					$(".month").append($('<li><a href="#month'+ monthNumArr[i] +'" target="_self">' + monthNumArr[i] + '</a></li>'));
				}
				var liHtml = '\t' + '<!-------- \u65F6\u95F4 -------->' + '\n';
				$("#lists").empty().append(liHtml);

				//按月份索引写好DOM容器
				var monthHtml = '';
				for(var j=0; j<monthNumArr.length; j++){
					monthHtml += '\t' + '<!-------- ' + monthNumArr[j] +'\u6708 -------->' + '\n';
					monthHtml += '\t' + '<div class="item" id="month' + monthNumArr[j] + '">' + '\n';
					monthHtml += '\t\t' + '<h2 class="affix"><em></em>' + yearID + '\u5E74' + monthNumArr[j] + '\u6708</h2>' + '\n';
					monthHtml += '\t\t' + '<ul>' + '\n';
					monthHtml += '\t\t' + '</ul>' + '\n';
					monthHtml += '\t' + '</div>' + '\n';
				}
				$("#lists").append(monthHtml);
				monthHtml = null;

				//将数据按月份依次追加到所属DOM容器
				for(var i=0,j=0; i<d.total; i++){//遍历接口数据
					if(d.data[i].FDate.substr(4,2) == monthNumArr[j]){//如果当前数据品牌字母等于当前字母索引
						//在指定DOM下填充li
						$('#month' + monthNumArr[j] + ' ul').append(drawLi(d.data[i],tabItem));
					}else{
						j++;//开始对照下一个月份索引
						i--;//在月份索引下移后补回漏掉的数据
					}
				}

				//初始化月份导航，复位锚点
				for(var i=0; i<12; i++){
					$(".month li").eq(i).html($('<a href="#month'+ (((12-i)<10) ? ('0' + (12-i)) : (12-i)) +'" target="_self">'+ (((12-i)<10) ? ('0' + (12-i)) : (12-i)) +'\u6708</a>'));
				}
				//将没内容的容器删除，导航变灰
				var itemArr = $("#lists .item");
				for(var i=0; i<12; i++){
					if(itemArr.eq(i).find("ul li").length == 0){
						itemArr.eq(i).remove();
						$(".month li").eq(i).html($('<span>'+ (((12-i)<10) ? ('0' + (12-i)) : (12-i)) +'\u6708</span>'));
					}
				}
				$(".month a").eq(0).parent().addClass("active");//点亮第一个对应有内容的导航
				drawFoot();
			}
		});
	}

	//关注度(pageview)
	if(tabItem == "pageview"){
		$.ajax({
			url:"//cgi.data.auto.qq.com/php/index.php?mod=carnews&act=carsdaily&year=" + yearID + "&sort=2",
			dataType:"jsonp",
			success: function(d){
				//渲染关注度内容
				var liHtml = '\t' + '<!-------- \u5173\u6CE8\u5EA6 -------->' + '\n';
				liHtml += '\t' + '<div class="lineY"></div>' + '\n';
				liHtml += '\t' + '<div class="lineYHot"></div>' + '\n';
				liHtml += '\t' + '<div class="item">' + '\n';
				liHtml += '\t\t' + '<ul>' + '\n';
				for(var i=0; i<d.total; i++){
					liHtml += drawLi(d.data[i],tabItem);
				}
				liHtml += '\t\t' + '</ul>' + '\n';
				liHtml += '\t' + '</div>' + '\n';
				$("#lists").empty().append(liHtml);
				drawFoot();
			}
		});
	}

	//评论热度(comment)
	if(tabItem == "comment"){
		$.ajax({
			url:"//cgi.data.auto.qq.com/php/index.php?mod=carnews&act=carsdaily&year=" + yearID + "&sort=3",
			dataType:"jsonp",
			success: function(d){
				//渲染评论热度内容
				var liHtml = '\t' + '<!-------- \u8BC4\u8BBA\u70ED\u5EA6 -------->' + '\n';
				liHtml += '\t' + '<div class="lineY"></div>' + '\n';
				liHtml += '\t' + '<div class="lineYHot"></div>' + '\n';
				liHtml += '\t' + '<div class="item">' + '\n';
				liHtml += '\t\t' + '<ul>' + '\n';
				for(var i=0; i<d.total; i++){
					liHtml += drawLi(d.data[i],tabItem);
				}
				liHtml += '\t\t' + '</ul>' + '\n';
				liHtml += '\t' + '</div>' + '\n';
				$("#lists").empty().append(liHtml);
				drawFoot();
			}
		});
	}

	//品牌(brand)
	if(tabItem == "brand"){
		var letterIndex = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
		//刷新页卡列表
		$("#tabBod ul").empty().removeClass("nav");
		$(".brand").empty().addClass("nav");
		for(var i=0; i<letterIndex.length; i++){
			$(".brand").append($('<li><a href="#brand'+ letterIndex[i] +'" target="_self">' + letterIndex[i] + '</a></li>'));
		}
		var liHtml = '\t' + '<!-------- \u54C1\u724C -------->' + '\n';
		$("#lists").empty().append(liHtml);

		//将数据按字母和品牌依次追加到所属DOM容器
		$.ajax({
			url:"//cgi.data.auto.qq.com/php/index.php?mod=carnews&act=carsdaily&year=" + yearID + "&sort=4",
			dataType:"jsonp",
			success: function(d){
				var brandItemHtml = '';
				//按字母索引写好DOM容器
				for(var j=0; j<letterIndex.length; j++){
					brandItemHtml += '\t' + '<!-------- ' + letterIndex[j] +' -------->' + '\n';
					brandItemHtml += '\t' + '<div class="brandItem" id="brand' + letterIndex[j] + '">' + '\n';
					brandItemHtml += '\t\t' + '<div class="brandLetter affix">' + '\n';
					brandItemHtml += '\t\t\t' + '<strong>' + letterIndex[j] + '</strong>' + '\n';
					brandItemHtml += '\t\t' + '</div>' + '\n';
					brandItemHtml += '\t' + '</div>' + '\n';
				}
				$("#lists").append(brandItemHtml);
				brandItemHtml = null;
				var brandArr = [];//同字母不同品牌ID临时数组
				for(var i=0,j=0; i<d.total; i++){//遍历接口数据
					if(d.data[i].FCarBrandLetter == letterIndex[j]){//如果当前数据品牌字母等于当前字母索引
						if($.inArray(d.data[i].FCarBrandID, brandArr) == "-1"){//如果当前数据品牌ID不在临时数组
							brandArr.push(d.data[i].FCarBrandID);//将不重复品牌ID存入临时数组
							//为不重复品牌追加DOM容器
							var itemHtml = '';
							itemHtml += '\t\t' + '<div class="item item' + d.data[i].FCarBrandID + '">' + '\n';
							itemHtml += '\t\t\t' + '<h2 class="affix">' + d.data[i].FCarBrandName + '</h2>' + '\n';
							itemHtml += '\t\t\t' + '<ul>' + '\n';
							itemHtml += '\t\t\t' + '</ul>' + '\n';
							itemHtml += '\t\t' + '</div>' + '\n';
							$('#brand' + letterIndex[j]).append(itemHtml);
						}
						//在指定DOM下填充li
						$('#brand' + letterIndex[j] + ' .item' + d.data[i].FCarBrandID + ' ul').append(drawLi(d.data[i],tabItem));
					}else{
						j++;//开始对照下一个字母索引
						i--;//在字母索引下移后补回漏掉的数据
						brandArr = [];//清空上一个同字母不同品牌ID临时数组
					}
				}
				itemHtml = null;

				//初始化字母索引导航，复位锚点
				for(var i=0; i<letterIndex.length; i++){
					$(".brand li").eq(i).html($('<a href="#brand'+ letterIndex[i] +'" target="_self">'+ letterIndex[i] +'</a>'));
				}

				//将没内容的容器删除，导航变灰
				var itemArr = $("#lists .brandItem");
				for(var i=0; i<letterIndex.length; i++){
					if(itemArr.eq(i).find("ul li").length == 0){
						itemArr.eq(i).remove();
						$(".brand li").eq(i).html($('<span>'+ letterIndex[i] +'</span>'));
					}
				}

				$(".brand a").eq(0).parent().addClass("active");//点亮第一个对应有内容的导航
				drawFoot();
			}
		});
				
	}

	//对照表
	$.getScript("//js.data.auto.qq.com/serialconfigs.js", function(){

		//级别(level)
		if(tabItem == "level"){
			//刷新页卡列表
			var levelArr = [];
			$("#tabBod ul").empty().removeClass("nav");
			$(".level").empty().addClass("nav");
			for(var one in configs.data.CarSerialLevel){
				$(".level").append($('<li><a href="#level'+ configs.data.CarSerialLevel[one].value +'" target="_self">' + configs.data.CarSerialLevel[one].show + '</a></li>'));
				levelArr.push(configs.data.CarSerialLevel[one].value);
			}
			$(".level").append($('<li><a href="#level_" target="_self">\u5176\u4ED6</a></li>'));
			//按照级别分类展示
			$.ajax({
				url:"//cgi.data.auto.qq.com/php/index.php?mod=carnews&act=carsdaily&year=" + yearID + "&sort=1",
				dataType:"jsonp",
				success: function(d){
					var liHtml = '\t' + '<!-------- \u7EA7\u522B -------->' + '\n';
					for(var one in configs.data.CarSerialLevel){
						var levelID = configs.data.CarSerialLevel[one].value;
						var levelName = configs.data.CarSerialLevel[one].show;
						//按级别加载数据
						liHtml += '\t' + '<div class="item" id="level' + levelID + '">' + '\n';
						liHtml += '\t\t' + '<h2 class="affix"><em></em>' +  levelName + '</h2>' + '\n';
						liHtml += '\t\t' + '<ul>' + '\n';
						for(var k=0; k<d.total; k++){
							if(d.data[k].FLevel == levelID){
								liHtml += drawLi(d.data[k],tabItem);
							}else{
								continue;
							}
						}
						liHtml += '\t\t' + '</ul>' + '\n';
						liHtml += '\t' + '</div>' + '\n';
					}
					//其他级别加载数据
					liHtml += '\t' + '<div class="item" id="level_">' + '\n';
					liHtml += '\t\t' + '<h2 class="affix"><em></em>\u5176\u4ED6</h2>' + '\n';
					liHtml += '\t\t' + '<ul>' + '\n';
					for(var k=0; k<d.total; k++){
						if($.inArray(d.data[k].FLevel, levelArr) == "-1"){
							liHtml += drawLi(d.data[k],tabItem);
							//console.log(d.data[k].FLevel + '_' + levelArr);
						}else{
							continue;
						}
					}
					liHtml += '\t\t' + '</ul>' + '\n';
					liHtml += '\t' + '</div>' + '\n';
					$("#lists").empty().append(liHtml);
					//初始化级别导航，复位锚点
					var itemN = 0;
					var itemArr = $("#lists .item");
					for(var one in configs.data.CarSerialLevel){
						if(itemArr.eq(itemN).find("ul li").length == 0){
							itemArr.eq(itemN).remove();
							$(".level li").eq(itemN).html($('<span>'+ configs.data.CarSerialLevel[one].show +'</span>'));
						}
						itemN++;
					}
					if($("#level_").find("ul li").length == 0){
						$("#level_").remove();
						$(".level li").eq($(".level li").length - 1).html($('<span>\u5176\u4ED6</span>'));
					}
					$(".level a").eq(0).parent().addClass("active");//点亮第一个对应有内容的导航
					drawFoot();
				}
			});
		}

		//车辆用途(useway)
		if(tabItem == "useway"){
			//刷新页卡列表
			var usewayArr = [];
			$("#tabBod ul").empty().removeClass("nav");
			$(".useway").empty().addClass("nav");
			for(var one in configs.data.UseWay){
				$(".useway").append($('<li><a href="#useway'+ configs.data.UseWay[one].value +'" target="_self">' + configs.data.UseWay[one].show + '</a></li>'));
				usewayArr.push(configs.data.UseWay[one].value);
			}
			$(".useway").append($('<li><a href="#useway_" target="_self">\u5176\u4ED6</a></li>'));
			//按照车辆用途分类展示
			$.ajax({
				url:"//cgi.data.auto.qq.com/php/index.php?mod=carnews&act=carsdaily&year=" + yearID + "&sort=1",
				dataType:"jsonp",
				success: function(d){
					var liHtml = '\t' + '<!-------- \u8F66\u8F86\u7528\u9014 -------->' + '\n';
					for(var one in configs.data.UseWay){
						var usewayID = configs.data.UseWay[one].value;
						var usewayName = configs.data.UseWay[one].show;
						//按车辆用途加载数据
						liHtml += '\t' + '<div class="item" id="useway' + usewayID + '">' + '\n';
						liHtml += '\t\t' + '<h2 class="affix"><em></em>' +  usewayName + '</h2>' + '\n';
						liHtml += '\t\t' + '<ul>' + '\n';
						for(var k=0; k<d.total; k++){
							if(d.data[k].FUseway == usewayID){
								liHtml += drawLi(d.data[k],tabItem);
							}else{
								continue;
							}
						}
						liHtml += '\t\t' + '</ul>' + '\n';
						liHtml += '\t' + '</div>' + '\n';
					}
					//其他车辆用途加载数据
					liHtml += '\t' + '<div class="item" id="useway_">' + '\n';
					liHtml += '\t\t' + '<h2 class="affix"><em></em>\u5176\u4ED6</h2>' + '\n';
					liHtml += '\t\t' + '<ul>' + '\n';
					for(var k=0; k<d.total; k++){
						if($.inArray(d.data[k].FUseway, usewayArr) == "-1"){
							liHtml += drawLi(d.data[k],tabItem);
						}else{
							continue;
						}
					}
					liHtml += '\t\t' + '</ul>' + '\n';
					liHtml += '\t' + '</div>' + '\n';
					$("#lists").empty().append(liHtml);
					//初始化车辆用途导航，复位锚点
					var itemN = 0;
					var itemArr = $("#lists .item");
					for(var one in configs.data.UseWay){
						if(itemArr.eq(itemN).find("ul li").length == 0){
							itemArr.eq(itemN).remove();
							$(".useway li").eq(itemN).html($('<span>'+ configs.data.UseWay[one].show +'</span>'));
						}
						itemN++;
					}
					if($("#useway_").find("ul li").length == 0){
						$("#useway_").remove();
						$(".useway li").eq($(".useway li").length - 1).html($('<span>\u5176\u4ED6</span>'));
					}
					$(".useway a").eq(0).parent().addClass("active");//点亮第一个对应有内容的导航
					drawFoot();
				}
			});
		}

		//国别(country)
		if(tabItem == "country"){
			//刷新页卡列表
			var countryArr = [];
			$("#tabBod ul").empty().removeClass("nav");
			$(".country").empty().addClass("nav");
			for(var one in configs.data.country){
				$(".country").append($('<li><a href="#country'+ configs.data.country[one].value +'" target="_self">' + configs.data.country[one].show + '</a></li>'));
				countryArr.push(configs.data.country[one].value);
			}
			$(".country").append($('<li><a href="#country_" target="_self">\u5176\u4ED6</a></li>'));
			//按照国家分类展示
			$.ajax({
				url:"//cgi.data.auto.qq.com/php/index.php?mod=carnews&act=carsdaily&year=" + yearID + "&sort=1",
				dataType:"jsonp",
				success: function(d){
					var liHtml = '\t' + '<!-------- \u56FD\u522B -------->' + '\n';
					//列表内国家加载数据
					for(var one in configs.data.country){
						var countryID = configs.data.country[one].value;
						var countryName = configs.data.country[one].show;
						//按国别加载数据
						liHtml += '\t' + '<div class="item" id="country' + countryID + '">' + '\n';
						liHtml += '\t\t' + '<h2 class="affix"><em></em>' +  countryName + '</h2>' + '\n';
						liHtml += '\t\t' + '<ul>' + '\n';
						for(var k=0; k<d.total; k++){
							if(d.data[k].FCountry == countryID){
								liHtml += drawLi(d.data[k],tabItem);
							}else{
								continue;
							}
						}
						liHtml += '\t\t' + '</ul>' + '\n';
						liHtml += '\t' + '</div>' + '\n';
					}
					//其他国家加载数据
					liHtml += '\t' + '<div class="item" id="country_">' + '\n';
					liHtml += '\t\t' + '<h2 class="affix"><em></em>\u5176\u4ED6</h2>' + '\n';
					liHtml += '\t\t' + '<ul>' + '\n';
					for(var k=0; k<d.total; k++){
						if($.inArray(d.data[k].FCountry, countryArr) == "-1"){
							liHtml += drawLi(d.data[k],tabItem);
						}else{
							continue;
						}
					}
					liHtml += '\t\t' + '</ul>' + '\n';
					liHtml += '\t' + '</div>' + '\n';
					$("#lists").empty().append(liHtml);
					//初始化国别导航，复位锚点
					var itemN = 0;
					var itemArr = $("#lists .item");
					for(var one in configs.data.country){
						if(itemArr.eq(itemN).find("ul li").length == 0){
							itemArr.eq(itemN).remove();
							$(".country li").eq(itemN).html($('<span>'+ configs.data.country[one].show +'</span>'));
						}
						itemN++;
					}
					if($("#country_").find("ul li").length == 0){
						$("#country_").remove();
						$(".country li").eq($(".country li").length - 1).html($('<span>\u5176\u4ED6</span>'));
					}
					$(".country a").eq(0).parent().addClass("active");//点亮第一个对应有内容的导航
					drawFoot();
				}
			});
		}

	});

}

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

//预约试驾点击记录
function autoBussBoss(ev){
	var loopTryNum = 10;
	var autoBossID = 2586; 
	try{		
		var a=document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
		var iQQ=(a==null?"":unescape(a[2]));
		var purl='';
		var autoBussBoss = '';
		var ev = window.event || ev;
		var et = ev.srcElement || ev.target;
		var type=et.tagName;
		if (type != "A" && type != "IMG" ) {
			return true;
		} 
	
		if (type == "A"){
			purl = et.href;
		}else if (type == "IMG"){
			purl = et.parentNode.href;
		}
		
		for (var i=loopTryNum-1,tagNode=et;i>=0;i--,tagNode=tagNode.parentNode){
			autoBussBoss = tagNode.getAttribute('autobussboss');
			if(autoBussBoss) break; 
		}	
		
		if(!autoBussBoss) return;
	
		var localUrl = location.href;
		
		if(autoBussBoss){
			autoBossImg = new Image(1,1);
			var autoBossData = autoBussBoss.split('|');
			if(autoBossData[3] == undefined){
				autoBossData[3] = autoBossID;
			}
			var timestamp = Date.parse(new Date());
			var autourl = '//btrace.qq.com/kvcollect?ftime=&sIp=&iQQ='+iQQ+'&sBiz=dealerExposure&sOp='+autoBossData[0]+'&iSta=&iTy='+autoBossData[3]+'&iFlow='+timestamp+'&sUrl='+escape(localUrl)+'&sRef='+escape(purl)+'&sPageId='+autoBossData[2]+'&sPos='+autoBossData[1];
			autoBossImg.src = autourl;
		}
	} catch (e) {}
}
if(!window.autoBussBoss){
	if(document.addEventListener){
	document.addEventListener("click", autoBussBoss, false);
	}
	else if(document.attachEvent){
		document.attachEvent("onclick", autoBussBoss);
	}
}
/*  |xGv00|f06498ddc40286a79a899e85084ae135 */