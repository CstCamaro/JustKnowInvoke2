/* 广告背景关闭 */
$(document).ready(function(){
	$("#adbg-close a").click(function(){
		$("#adbg").css({"background":"none","padding":"5px"});
		$(".adbgclose").slideToggle();
	});
});

/* 专题图片滚动 */
$(function(){
	var $cur = 1;//初始化显示的版面
	var $i = 1;//每版显示数
	var $len = $('.topica>ul>li').length;//计算列表总长度(个数)
	var $pages = Math.ceil($len / $i);//计算展示版面数量
	var $w = $('.fr_c').width();//取得展示区外围宽度
	var $showbox = $('.topica');
	var $num = $('span.num li')
	var $pre = $('div.toleft')
	var $next = $('div.toright');
	var $autoFun;
	autoSlide();
	$pre.click(function(){
		if (!$showbox.is(':animated')) {  //判断展示区是否动画
			if ($cur == 1) {   //在第一个版面时,再向前滚动到最后一个版面
				$showbox.animate({
				left: '-=' + $w * ($pages - 1)
			}, 1000); //改变left值,切换显示版面,500(ms)为滚动时间,下同
			$cur = $pages; //初始化版面为最后一个版面
			} else {
				$showbox.animate({
					left: '+=' + $w
				}, 1000); //改变left值,切换显示版面
				$cur--; //版面累减
			}
			$num.eq($cur - 1).addClass('numcur').siblings().removeClass('numcur'); //为对应的版面数字加上高亮样式,并移除同级元素的高亮样式
		}
	});
	$next.click(function(){
		if (!$showbox.is(':animated')) { //判断展示区是否动画
			if ($cur == $pages) {  //在最后一个版面时,再向后滚动到第一个版面
				$showbox.animate({
					left: 0
				}, 1000); //改变left值,切换显示版面,500(ms)为滚动时间,下同
				$cur = 1; //初始化版面为第一个版面
			} else {
				$showbox.animate({
					left: '-=' + $w
				}, 1000);//改变left值,切换显示版面
				$cur++; //版面数累加
			}
			$num.eq($cur - 1).addClass('numcur').siblings().removeClass('numcur'); //为对应的版面数字加上高亮样式,并移除同级元素的高亮样式
		}
	});
	$num.click(function(){
		if (!$showbox.is(':animated')) { //判断展示区是否动画
			var $index = $num.index(this); //索引出当前点击在列表中的位置值
			$showbox.animate({
				left: '-' + ($w * $index)
			}, 1000); //改变left值,切换显示版面,500(ms)为滚动时间
			$cur = $index + 1; //初始化版面值,这一句可避免当滚动到第三版时,点击向后按钮,出面空白版.index()取值是从0开始的,故加1
			$(this).addClass('numcur').siblings().removeClass('numcur'); //为当前点击加上高亮样式,并移除同级元素的高亮样式
		}
	});
	clearFun($showbox);
	clearFun($pre);
	clearFun($next);
	clearFun($num);
	function clearFun(elem){
		elem.hover(function(){
		clearAuto();
		}, function(){
			autoSlide();
		});
	}
	function autoSlide(){
		$next.trigger('click');
		$autoFun = setTimeout(autoSlide, 3000);//此处不可使用setInterval,setInterval是重复执行传入函数,这会引起第二次划入时停止失效
	}
	function clearAuto(){
		clearTimeout($autoFun);
	}
});

/* 幻灯图片滚动 */
function Changeimg() {

this.create = function(elementId,imgListId,temp) {
	this.id = document.getElementById(elementId);
	this.list = document.getElementById(imgListId);
	var divA = "divA"+temp;
	var divT ="divT"+temp;
	var divImg = "divImg"+temp;
	var imgUrl = "imgUrl"+temp;

	if(!this.id || !this.list) return false;
	this.span = this.list.getElementsByTagName('span');
	this.p = this.list.getElementsByTagName('p');
	this.length = this.span.length;
	this.$href = /href=(\"|\')[^\'\"\s]*/;
	this.$src = /src=(\"|\')[^\'\"\>\s]*/;
	this.data = {href:[],src:[],text:[]};
	this.numA = '';
	for(var i=0; i<this.length; i++) {
		var temphref = this.span[i].innerHTML.match(this.$href);
		var tempsrc = this.span[i].innerHTML.match(this.$src);
		var temp_i = i + 1;
		this.data.href[i] = temphref[0].substr(6,temphref[0].length-6).replace(/&amp;/gi, '&').replace(/&gt;/gi, '>');
		this.data.src[i] = tempsrc[0].substr(5,tempsrc[0].length-5);
		this.data.text[i] = (this.p.length == 0)?'':this.p[i].innerHTML;
		this.numA += '<a href="#" class="styleA" onclick="Imgs.change_img('+ i +'); return false;" onfocus="if(this.blur)this.blur()">'+ temp_i +'</a>';
	}
	this.tempA = '<div id="'+divA+'" class="divA">'+ this.numA + '</div>';
	this.tempT = '<div class="divT"><p id="'+divT+'"></p></div>';
	this.tempD = '<div class="divBox sta_img"><a id="'+imgUrl+'" href="" target="_blank"><img id="'+divImg+'" class="divImg" src="'+this.data.src[0]+'"/></a></div>';
	this.id.innerHTML = this.tempD + this.tempA + this.tempT;
	this.aList = document.getElementById(divA).getElementsByTagName('a');
	this.tText = document.getElementById(divT);
	this.Href = document.getElementById(imgUrl);
	this.Src = document.getElementById(divImg);
	if(this.length > 1){
		this.play();
	} else {
		this.Href.setAttribute('href',this.data.href[0]);
		this.Src.setAttribute('src',this.data.src[0]);
		this.Src.setAttribute('alt',this.data.text[0]);
		this.tText.innerHTML = '<a href="'+ this.data.href[0] +'" target="_blank">' + this.data.text[0] + '</a>';
	}
}

this.flag = 0;
this.play = function() {

	this.Href.setAttribute('href',this.data.href[this.flag]);
	this.tText.innerHTML = '<a href="'+ this.data.href[this.flag] +'" target="_blank">' + this.data.text[this.flag] + '</a>';

	if(navigator.appName.indexOf("Explorer") != -1) {
		this.Src.filters[0].Apply();
		this.Src.filters[0].Transition=23;
		this.Src.filters[0].Play();
	}

	this.Src.setAttribute('src',this.data.src[this.flag]);
	this.Src.setAttribute('alt',this.data.text[this.flag]);

	for(var i=0; i<this.length; i++){this.aList[i].className = 'styleA';}
	this.aList[this.flag].className = 'styleB';
	this.flag += 1;
	if(this.flag >= this.length) {this.flag = 0}
	this.timer = setTimeout('Imgs.play()',5000);
}

this.change_img = function(i) {
	clearInterval(this.timer);
	this.flag = i;
	this.play();
}

} //end
var Imgs = new Changeimg();

/* 模拟select下拉选框 */
jQuery.fn.CRselectBox = jQuery.fn.sBox = function() {
	var _self = this;
	/* build */
	var _parent = _self.parent();
	var cityarea = _self.attr("id");
	var pid = "sbox_" + cityarea;
	var wrapHtml = '<div class="CRselectBox" id="'+pid+'"></div>';
	var $wrapHtml = $(wrapHtml).appendTo(_parent);
	var selectedOptionValue = _self.find("option:selected").attr("value");
	var selectedOptionTxt = _self.find("option:selected").text();
	var name = _self.attr("name");
	var id = _self.attr("id");
	var inputHtml = '<input type="hidden" value="'+selectedOptionValue+'" name="'+name+'" id="'+id+'"/>';
	$(inputHtml).appendTo($wrapHtml);
	var inputTxtHtml = '<input type="hidden" value="'+selectedOptionTxt+'" name="'+name+'_CRtext" id="'+id+'_CRtext"/>';
	$(inputTxtHtml).appendTo($wrapHtml);
	var aHtml = '<a class="CRselectValue" href="#">'+selectedOptionTxt+'</a>';
	$(aHtml).appendTo($wrapHtml);
	var ulHtml = '<ul class="CRselectBoxOptions"></ul>';
	var $ulHtml = $(ulHtml).appendTo($wrapHtml);
	var liHtml = "";
	_self.find("option").each(function() {
		if($(this).attr("selected")) {
			liHtml += '<li class="CRselectBoxItem"><a href="#" class="selected" rel="'+$(this).attr("value")+'">'+$(this).text()+'</a></li>';
		} else {
			liHtml += '<li class="CRselectBoxItem"><a href="#" rel="'+$(this).attr("value")+'">'+$(this).text()+'</a></li>';
		}
	});
	$(liHtml).appendTo($ulHtml);
	/* add effect */
	/*
	$( $wrapHtml, _parent).hover(function() {
		$(this).addClass("CRselectBoxHover");
	},function(){
		$(this).removeClass("CRselectBoxHover");
	});
	*/
	$(".CRselectValue",$wrapHtml).click(function() {
		$(this).blur();
		$(".CRselectBoxOptions",$wrapHtml).show();
		return false;
	});
	$(".CRselectBoxItem a",$wrapHtml).click(function() {
		$(this).blur();
		var value = $(this).attr("rel");
		var txt = $(this).text();
		$("#"+id).val(value);
		$("#"+id+"_CRtext").val(txt);
		$(".CRselectValue",$wrapHtml).text(txt);
		$(".CRselectBoxItem a",$wrapHtml).removeClass("selected");
		$(this).addClass("selected");
		$(".CRselectBoxOptions",$wrapHtml).hide();
		return false;
	});
	$(document).click(function(event) {
		if( $(event.target).attr("class") != "CRselectBox" ){
			$(".CRselectBoxOptions",$wrapHtml).hide();
		}
	});
	_self.remove();
	return _self;
}

$(function() {
	$("#city").CRselectBox();
	$("#area").CRselectBox();
	$("#cat").CRselectBox();
	$("#grp").CRselectBox();
	$("#price").CRselectBox();
	$("#space").CRselectBox();
	$("#house").CRselectBox();
	$("#mtr").CRselectBox();

	$("#city2").CRselectBox();
	$("#area2").CRselectBox();
	$("#cat2").CRselectBox();
	$("#grp2").CRselectBox();
	$("#price2").CRselectBox();
	$("#space2").CRselectBox();
	$("#house2").CRselectBox();
	$("#mtr2").CRselectBox();

	$("#city3").CRselectBox();
	$("#area3").CRselectBox();
	$("#cat3").CRselectBox();
	$("#grp3").CRselectBox();
	$("#price3").CRselectBox();
	$("#space3").CRselectBox();
	$("#house3").CRselectBox();
	$("#mtr3").CRselectBox();
})

$(document).ready(function() {
	$(".es").hover(function(){
		$("#es").show();
		$("#findzf").hide();
		$("#findpeople").hide();
		$(this).addClass("cur");
		$(".fzf").removeClass("cur");
		$(".fpl").removeClass("cur");
		return false;
	});
	$(".fzf").hover(function(){
		$("#es").hide();
		$("#findzf").show();
		$("#findpeople").hide();
		$(this).addClass("cur");
		$(".es").removeClass("cur");
		$(".fpl").removeClass("cur");
		return false;
	});
	$(".fpl").hover(function(){
		$("#es").hide();
		$("#findzf").hide();
		$("#findpeople").show();
		$(this).addClass("cur");
		$(".es").removeClass("cur");
		$(".fzf").removeClass("cur");
		return false;
	});
	$(".xsdg").hover(function(){
		$(".lb").show();
		$(".esf").hide();
		$(this).addClass("cur");
		$(".cjjg").removeClass("cur");
		return false;
	});
	$(".cjjg").hover(function(){
		$(".lb").hide();
		$(".esf").show();
		$(this).addClass("cur");
		$(".xsdg").removeClass("cur");
		return false;
	});
	$(".srch_es").hover(function(){
		$(".srch_es_c").show();
		$(".srch_zf_c").hide();
		$(".srch_sp_c").hide();
		$(".srch_xzl_c").hide();
		$(this).addClass("cur");
		$(".srch_zf").removeClass("cur");
		$(".srch_sp").removeClass("cur");
		$(".srch_xzl").removeClass("cur");
		return false;
	});
	$(".srch_zf").hover(function(){
		$(".srch_es_c").hide();
		$(".srch_zf_c").show();
		$(".srch_sp_c").hide();
		$(".srch_xzl_c").hide();
		$(this).addClass("cur");
		$(".srch_es").removeClass("cur");
		$(".srch_sp").removeClass("cur");
		$(".srch_xzl").removeClass("cur");
		return false;
	})
	$(".srch_sp").hover(function(){
		$(".srch_es_c").hide();
		$(".srch_zf_c").hide();
		$(".srch_sp_c").show();
		$(".srch_xzl_c").hide();
		$(this).addClass("cur");
		$(".srch_es").removeClass("cur");
		$(".srch_zf").removeClass("cur");
		$(".srch_xzl").removeClass("cur");
		return false;
	})
	$(".srch_xzl").hover(function(){
		$(".srch_es_c").hide();
		$(".srch_zf_c").hide();
		$(".srch_sp_c").hide();
		$(".srch_xzl_c").show();
		$(this).addClass("cur");
		$(".srch_zf").removeClass("cur");
		$(".srch_sp").removeClass("cur");
		$(".srch_es").removeClass("cur");
		return false;
	});
	$(".rqph").hover(function(){
		$(".rqphlist").show();
		$(".fwphlist").hide();
		$(this).addClass("cur");
		$(".fwph").removeClass("cur");
		return false;
	});
	$(".fwph").hover(function(){
		$(".rqphlist").hide();
		$(".fwphlist").show();
		$(this).addClass("cur");
		$(".rqph").removeClass("cur");
		return false;
	});
	$(".city").hover(function(){
		$(".cityslt").show();
	},function(){
		$(".cityslt").hide();
	});
	$(".thq").hover(function(){
		$(".th").show();
		$(".hz").hide();
		$(".py").hide();
		$(".by").hide();
		$(".yx").hide();
		$(".hp").hide();
		$(".lg").hide();
		$(".ns").hide();
		$(".hd").hide();
		$(".zc").hide();
		$(".ch").hide();
		$(this).addClass("ec_t_c");
		$(".hzq").removeClass("ec_t_c");
		$(".pyq").removeClass("ec_t_c");
		$(".byq").removeClass("ec_t_c");
		$(".yxq").removeClass("ec_t_c");
		$(".hpq").removeClass("ec_t_c");
		$(".lgq").removeClass("ec_t_c");
		$(".nsq").removeClass("ec_t_c");
		$(".hdq").removeClass("ec_t_c");
		$(".zcs").removeClass("ec_t_c");
		$(".chs").removeClass("ec_t_c");
		return false;
	});
	$(".hzq").hover(function(){
		$(".th").hide();
		$(".hz").show();
		$(".py").hide();
		$(".by").hide();
		$(".yx").hide();
		$(".hp").hide();
		$(".lg").hide();
		$(".ns").hide();
		$(".hd").hide();
		$(".zc").hide();
		$(".ch").hide();
		$(this).addClass("ec_t_c");
		$(".thq").removeClass("ec_t_c");
		$(".pyq").removeClass("ec_t_c");
		$(".byq").removeClass("ec_t_c");
		$(".yxq").removeClass("ec_t_c");
		$(".hpq").removeClass("ec_t_c");
		$(".lgq").removeClass("ec_t_c");
		$(".nsq").removeClass("ec_t_c");
		$(".hdq").removeClass("ec_t_c");
		$(".zcs").removeClass("ec_t_c");
		$(".chs").removeClass("ec_t_c");
		return false;
	});
	$(".pyq").hover(function(){
		$(".th").hide();
		$(".hz").hide();
		$(".py").show();
		$(".by").hide();
		$(".yx").hide();
		$(".hp").hide();
		$(".lg").hide();
		$(".ns").hide();
		$(".hd").hide();
		$(".zc").hide();
		$(".ch").hide();
		$(this).addClass("ec_t_c");
		$(".hzq").removeClass("ec_t_c");
		$(".thq").removeClass("ec_t_c");
		$(".byq").removeClass("ec_t_c");
		$(".yxq").removeClass("ec_t_c");
		$(".hpq").removeClass("ec_t_c");
		$(".lgq").removeClass("ec_t_c");
		$(".nsq").removeClass("ec_t_c");
		$(".hdq").removeClass("ec_t_c");
		$(".zcs").removeClass("ec_t_c");
		$(".chs").removeClass("ec_t_c");
		return false;
	});
	$(".byq").hover(function(){
		$(".th").hide();
		$(".hz").hide();
		$(".py").hide();
		$(".by").show();
		$(".yx").hide();
		$(".hp").hide();
		$(".lg").hide();
		$(".ns").hide();
		$(".hd").hide();
		$(".zc").hide();
		$(".ch").hide();
		$(this).addClass("ec_t_c");
		$(".hzq").removeClass("ec_t_c");
		$(".pyq").removeClass("ec_t_c");
		$(".thq").removeClass("ec_t_c");
		$(".yxq").removeClass("ec_t_c");
		$(".hpq").removeClass("ec_t_c");
		$(".lgq").removeClass("ec_t_c");
		$(".nsq").removeClass("ec_t_c");
		$(".hdq").removeClass("ec_t_c");
		$(".zcs").removeClass("ec_t_c");
		$(".chs").removeClass("ec_t_c");
		return false;
	});
	$(".yxq").hover(function(){
		$(".th").hide();
		$(".hz").hide();
		$(".py").hide();
		$(".by").hide();
		$(".yx").show();
		$(".hp").hide();
		$(".lg").hide();
		$(".ns").hide();
		$(".hd").hide();
		$(".zc").hide();
		$(".ch").hide();
		$(this).addClass("ec_t_c");
		$(".hzq").removeClass("ec_t_c");
		$(".pyq").removeClass("ec_t_c");
		$(".byq").removeClass("ec_t_c");
		$(".tgq").removeClass("ec_t_c");
		$(".hpq").removeClass("ec_t_c");
		$(".lgq").removeClass("ec_t_c");
		$(".nsq").removeClass("ec_t_c");
		$(".hdq").removeClass("ec_t_c");
		$(".zcs").removeClass("ec_t_c");
		$(".chs").removeClass("ec_t_c");
		return false;
	});
	$(".hpq").hover(function(){
		$(".th").hide();
		$(".hz").hide();
		$(".py").hide();
		$(".by").hide();
		$(".yx").hide();
		$(".hp").show();
		$(".lg").hide();
		$(".ns").hide();
		$(".hd").hide();
		$(".zc").hide();
		$(".ch").hide();
		$(this).addClass("ec_t_c");
		$(".hzq").removeClass("ec_t_c");
		$(".pyq").removeClass("ec_t_c");
		$(".byq").removeClass("ec_t_c");
		$(".yxq").removeClass("ec_t_c");
		$(".tgq").removeClass("ec_t_c");
		$(".lgq").removeClass("ec_t_c");
		$(".nsq").removeClass("ec_t_c");
		$(".hdq").removeClass("ec_t_c");
		$(".zcs").removeClass("ec_t_c");
		$(".chs").removeClass("ec_t_c");
		return false;
	});
	$(".lgq").hover(function(){
		$(".th").hide();
		$(".hz").hide();
		$(".py").hide();
		$(".by").hide();
		$(".yx").hide();
		$(".hp").hide();
		$(".lg").show();
		$(".ns").hide();
		$(".hd").hide();
		$(".zc").hide();
		$(".ch").hide();
		$(this).addClass("ec_t_c");
		$(".hzq").removeClass("ec_t_c");
		$(".pyq").removeClass("ec_t_c");
		$(".byq").removeClass("ec_t_c");
		$(".yxq").removeClass("ec_t_c");
		$(".hpq").removeClass("ec_t_c");
		$(".thq").removeClass("ec_t_c");
		$(".nsq").removeClass("ec_t_c");
		$(".hdq").removeClass("ec_t_c");
		$(".zcs").removeClass("ec_t_c");
		$(".chs").removeClass("ec_t_c");
		return false;
	});
	$(".nsq").hover(function(){
		$(".th").hide();
		$(".hz").hide();
		$(".py").hide();
		$(".by").hide();
		$(".yx").hide();
		$(".hp").hide();
		$(".lg").hide();
		$(".ns").show();
		$(".hd").hide();
		$(".zc").hide();
		$(".ch").hide();
		$(this).addClass("ec_t_c");
		$(".hzq").removeClass("ec_t_c");
		$(".pyq").removeClass("ec_t_c");
		$(".byq").removeClass("ec_t_c");
		$(".yxq").removeClass("ec_t_c");
		$(".hpq").removeClass("ec_t_c");
		$(".lgq").removeClass("ec_t_c");
		$(".thq").removeClass("ec_t_c");
		$(".hdq").removeClass("ec_t_c");
		$(".zcs").removeClass("ec_t_c");
		$(".chs").removeClass("ec_t_c");
		return false;
	});
	$(".hdq").hover(function(){
		$(".th").hide();
		$(".hz").hide();
		$(".py").hide();
		$(".by").hide();
		$(".yx").hide();
		$(".hp").hide();
		$(".lg").hide();
		$(".ns").hide();
		$(".hd").show();
		$(".zc").hide();
		$(".ch").hide();
		$(this).addClass("ec_t_c");
		$(".hzq").removeClass("ec_t_c");
		$(".pyq").removeClass("ec_t_c");
		$(".byq").removeClass("ec_t_c");
		$(".yxq").removeClass("ec_t_c");
		$(".thq").removeClass("ec_t_c");
		$(".lgq").removeClass("ec_t_c");
		$(".nsq").removeClass("ec_t_c");
		$(".thq").removeClass("ec_t_c");
		$(".zcs").removeClass("ec_t_c");
		$(".chs").removeClass("ec_t_c");
		return false;
	});
	$(".zcs").hover(function(){
		$(".th").hide();
		$(".hz").hide();
		$(".py").hide();
		$(".by").hide();
		$(".yx").hide();
		$(".hp").hide();
		$(".lg").hide();
		$(".ns").hide();
		$(".hd").hide();
		$(".zc").show();
		$(".ch").hide();
		$(this).addClass("ec_t_c");
		$(".hzq").removeClass("ec_t_c");
		$(".pyq").removeClass("ec_t_c");
		$(".byq").removeClass("ec_t_c");
		$(".yxq").removeClass("ec_t_c");
		$(".hpq").removeClass("ec_t_c");
		$(".lgq").removeClass("ec_t_c");
		$(".nsq").removeClass("ec_t_c");
		$(".hdq").removeClass("ec_t_c");
		$(".thq").removeClass("ec_t_c");
		$(".chs").removeClass("ec_t_c");
		return false;
	});
	$(".chs").hover(function(){
		$(".th").hide();
		$(".hz").hide();
		$(".py").hide();
		$(".by").hide();
		$(".yx").hide();
		$(".hp").hide();
		$(".lg").hide();
		$(".ns").hide();
		$(".hd").hide();
		$(".zc").hide();
		$(".ch").show();
		$(this).addClass("ec_t_c");
		$(".hzq").removeClass("ec_t_c");
		$(".pyq").removeClass("ec_t_c");
		$(".byq").removeClass("ec_t_c");
		$(".yxq").removeClass("ec_t_c");
		$(".hpq").removeClass("ec_t_c");
		$(".lgq").removeClass("ec_t_c");
		$(".nsq").removeClass("ec_t_c");
		$(".hdq").removeClass("ec_t_c");
		$(".zcs").removeClass("ec_t_c");
		$(".thq").removeClass("ec_t_c");
		return false;
	});
});/*  |xGv00|24c90013b9633fefc82d7772b2f62277 */