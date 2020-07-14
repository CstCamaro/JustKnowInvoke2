var p = 1;
var $pContainer, jsonData;
(function(){
	getData(function() {
		goto(2)
		var scw;
		var sch;
		//set page size
		function setSize() {
			sch = $(window).height();
			if (sch <= 650)
				sch = 650;
			$('.page').height(sch);
			$('.center').css('margin-top', ((sch - 650) / 2) + 'px');
			if ((sch - 650) / 2 > 30) {
				$('.next').css('height', ((sch - 650) / 2) + 'px');
			}
			//$('.nav').css('left',($(window).width()/2+510) + 'px');
		}

		setSize();

		$(window).resize(function() {
			setSize();
		});

		//nav
		$('.nav i').click(function() {
			var nid = $(this).attr('id');
			var cid = parseInt(nid.replace('c', ''));
			goto(cid);
			$('.nav i').removeClass('cur');
			$(this).addClass('cur');
		});

		//mousewhee
		var p_len = $('.page').length;
//		

		//next button
		$('.next').click(function() {
			p = p + 1;
			goto(p);
		});
		$('#p1_light').click(function() {
			p = p + 1;
			goto(p);
		});

		//执行第一页动画
		var imgCount = 0;
		var imgMax = $('#p1 img').length;
		$('#p1 img').each(function(index, ele) {
			ele.onload = function() {
				imgCount++;
			}
			if (imgCount == imgMax) {
				ap1();
			}
		});
		$('.lazy').lazyload({
			effect: "fadeIn",
			skip_invisible: false,
			failure_limit: 30,
			event : "startupload"
		});
	});// 获取数据源
})();

function goto(obj) {
    // reset_animate(p);	
    if (obj !== '') {
        // nav current change
        var theobj = $('.nav i:eq(' + (obj - 1) + ')');
        $('.nav i').removeClass('cur');
        theobj.addClass('cur');
		
        // $("html,body") 时 animate 的回调用函数就相当于被侦听了两次
		$pContainer = $("#p" + obj);
			//
		$($pContainer.find(".lazy")[1]).trigger("startupload");
		
		$('.mask_txt').addClass('hide fadeOut animated');
		var commentId = $pContainer.data("commentId");
		if(commentId){
		    $.getScript("http://coral.qq.com/article/"+commentId+"/commentnum?callback=votnum");
			window.votnum = function(da){
				$pContainer.find(".commentNum").text("("+da.data.commentnum+")");
			};
		}
		
		// scroll to target
        $("html,body").animate({scrollTop: $pContainer.offset().top}, "slow", function() {
            p = obj;
            add_animate();
        });
		
        //subnav open & close
        if (theobj.attr('cata') == '1') {
            $('.sublev[on=1]').not(theobj.next('.sublev')).slideUp('slow');
            theobj.next('.sublev').slideDown('slow');
            $('.sublev').attr('on', 0);
            theobj.next('.sublev').attr('on', 1);
        } else {
            if (theobj.parent().attr('on') == 0) {
                $('.sublev').attr('on', 0);
                $('.sublev').slideUp('slow');
                theobj.parent().attr('on', 1);
                theobj.parent().slideDown('slow');
            }
        }
    } else {
        $("html,body").animate({scrollTop: 0}, 500);
    }
};

function setFlexSlider(){
    /*
     * flexslider
     * 图片滑动插件
	 */
	$('.flexslider').flexslider({
		animation: "slide",
		direction:"horizontal",
		easing:"swing",
		slideshow:false
	});

	$("ul.flex-direction-nav").on("click","a",function(evt){
	    var picInd = $pContainer.find(".flex-active").text();
		$pContainer.find(".active").text(picInd);
		var timeStr = $($pContainer.find(".slides .txt em")[picInd]).text();
		$pContainer.find(".time").text(timeStr);
		$($pContainer.find(".slides .lazy")[picInd]).trigger("startupload");
		
		// pgvMain();
		pvRepeatCount = 1;
		vsPgvCol = "icenter";
		pvCurDomain = location.hostname;
		pvCurUrl = location.pathname;
		pgvMain();
	});
}

function getData(callback){
    data = dataPage;
    jsonData = $.parseJSON(data.replace(/\/\*(\s|.)*\*\//gi,""));
			addData(callback);
}

function addData(callback){
	// 首页
    var coverData = jsonData[0];
	$("#p1_focus").attr("src",coverData.pic);
	$("#p1_focus_title").text(coverData.author);
	$("#p1_focus_txt").append(coverData.title+"<br />"+coverData.txt);
	
	// 预先处理评论数据
		// 载入图片期刊
	var magazine = jsonData[1], htmlStr = '';
	var getHtml = function(dataTemp,g){
	    var getNextStr = g?'<em class="next">向下滚动阅读下一个故事</em>':'';
	    var str = '<div class="page slider-container" id="p'+(i+2)+'" style="background-image:url('+dataTemp.bgImage+');">'
		+'            <div class="center clx">'
		+'				<ul class="header">'
		+'					<li class="bg-black">'+dataTemp.date+'</li>'
		+'					<li class="tmp">'+dataTemp.temperature+'</li>'
		+'					<li class="bg-black time">'+dataTemp.item[0].time+'</li>'
		+'					<li class="title"><h1><a href="'+dataTemp.comment+'" target="_blank">'+dataTemp.title+'</a></h1></li>'
		+'				</ul>'
		+'				<div class="flexslider">'
		+'					<img src="'+theCoverImg+'" class="mask_txt ani hide" />'
		+'					<ul class="slides">'
		+'					</ul>'
		+'				</div>'
		+'				<div class="show-control-paging"><em class="active">1</em>/<em class="total">'+dataTemp.itemNum+'</em></div>'
		+               getNextStr
		+'            </div>'
		+'        </div>';
		
		return str;
	};
	
	var commentIdArray = [];
	for(var i=0,len=magazine.length;i<len;i++){
	    var dataTemp = magazine[i], dataItem = magazine[i].item;
		dataTemp.itemNum = dataItem.length;
		var getNext = true;
		if(i==len-1){
			getNext = false;
		}
		$("#pageContainer").append(getHtml(dataTemp,getNext));
		var pLast = $("#pageContainer .slider-container:last");
		var slide = pLast.find(".slides"), itemStr='';
		for(var j=0,jLen=dataTemp.itemNum;j<jLen;j++){
			var item = dataItem[j];
			itemStr += '<li rel="'+jLen+'">'
					+'	<div class="txt">'
					+'		<em>'+item.time+'</em>'
					+'		<p>'+item.txt+'</p>'
					+'	</div>'
					+'  <img width="990" height="510" class="lazy" src="http://mat1.gtimg.com/zj/news/summer/loading.gif" data-original="'+item.pic+'" />'
					+'</li>';
		}
		slide.append(itemStr);
		pLast.data("commentId",dataTemp.commentId);
	}
	callback();
	
	setFlexSlider();
}

//add animate to page
function add_animate() {
    switch (p) {
        case 1:
            ap1();
			$('.mask_txt').addClass('hide fadeOut animated');// 去掉当切至非首页面时，动画未完成又切回至首页面的情况；
        break;
        default:
            ap2();
        break;
    }
}

//page animate
function ap1() {
    $('#p1_reai').removeClass('hide').addClass('fadeIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
    setTimeout("$('#p1_summer').removeClass('hide').addClass('fadeInRight animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend')", 300);
	setTimeout("$('#p1_focus').removeClass('hide').addClass('fadeInLeft animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend')", 600);
	setTimeout("$('#p1_focus_title').removeClass('hide').addClass('fadeInUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend')", 1100);
	setTimeout("$('#p1_focus_txt').removeClass('hide').addClass('fadeIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend')", 1100);
	setTimeout("$('#p1_light').removeClass('hide').addClass('fadeIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend')", 1100);

}

function ap2() {
	setTimeout("$('.mask_txt').removeClass('hide fadeOut').addClass('fadeInRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend')", 600);
}

//reset animate
function reset_animate(p) {
    $('#p' + p + ' .ani').attr('class', 'ani hide');
}/*  |xGv00|e2a2ead8a2ec3a88c077810526a62887 */