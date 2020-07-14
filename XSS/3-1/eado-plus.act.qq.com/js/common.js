var _choiceNumber = 0;  //选择第几个图片
var _game = null;
var _personNumber = 3; //第几位助力的人



$(function(){
	$(".kv .video").css("height",$(window).height())
	var height = parseInt($(".kv .video video").css("height"));
	$(".kv .video video").css("top",($(window).height()-height)/2 + "px");
	$(window).bind("resize load", function(){
		w = $(".box").width();
		h = $(window).height();
		$(".kv .video").css("height",h)
		var height = parseInt($(".kv .video video").css("height"));
		$(".kv .video video").css("top",(h-height)/2 + "px");
		console.log(h,height)
	})

 
    //kv轮播
    // var kvSwiper = new Swiper('.kv_pics', {
    //     loop : false,
	// 	autoplay: false,//可选选项，自动滑动
	// 	autoHeight: true, //高度随内容变化
    //     pagination: {
    //         el: '.kv .swiper-pagination'
	// 	},
	// 	on: {
	// 		slideChangeTransitionEnd: function(){
	// 			console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
	// 			var number = this.activeIndex;
	// 			if(number == 0){
	// 				$(".kv video")[0].pause();
	// 				$(".box").css({"position":"","top":""});
	// 				$(".box").removeClass("active");
	// 				$(document).scrollTop(_top)
	// 			}else{
	// 				if(!$(".box").hasClass("active")) _top = $(document).scrollTop();
	// 				$(".box").css({"position":"fixed","top":-_top});
	// 				$(".box").addClass("active");
	// 				$(".kv .video .btn").show();
	// 			}
	// 		},
	// 	  },
    // });

	$(".kv .video .btn").on("click",function(){
		$(".kv .video video")[0].play();
		$(".kv .video .btn").hide();

	})




/*--------------------------预约试驾---------------------------*/
	//省市联动信息
	linkage(config);
	//选择框-省份
	funcSelectChange($("#pro"),"city","dealer");
	//选择框-城市
	funcSelectChange($("#city"),"dealer");
	//选择框-经销商
	funcSelectChange($("#dealer"));
	//声明选择框
	$(".drive .whether").on("click",function(){
		$(".drive .whether .right").toggleClass("active")
	})
	//提交
	$(".drive .btn").on("click",verify);

	$(".drive .text .yinsi").on("click",function(){
		$(".mask").show();
		if(!$(".box").hasClass("active")) _top = $(document).scrollTop();
		$(".box").css({"position":"fixed","top":-_top});
		$(".box").addClass("active");
	})
	$(".mask .close").on("click",function(){
		$(".mask").hide();
		$(".box").css({"position":"","top":""});
        $(".box").removeClass("active");
        $(document).scrollTop(_top)
	})



	$(".bright5 .btn").on("click",function(){
		jump(_guanUrl)
	})

	//奥运点赞轮播
	var olympiadSwiper = new Swiper('.olympiad_pics', {
		loop : true,
		autoplay: false,//可选选项，自动滑动
		pagination: {
			el: '.olympiad .swiper-pagination'
		}
	});


	Poster.Preload.load(progress, complete);
	$(".olympiad .btn").on("click",function(){
		_choiceNumber  = $(".olympiad_pics .swiper-slide-active").attr("data-url");
		console.log(_choiceNumber);
		_game.reStart();
		// _game.setTime();
		// _game.setPerson(_personNumber);
	
		_game.on(Poster.Event.CREATE,createPic);
		create();
		$(".popup").show();
		setTimeout(function(){
			$(".popup .creat").show();
			$(".popup .text").hide();
		},2000)
		if(!$(".box").hasClass("active")) _top = $(document).scrollTop();
		$(".box").css({"position":"fixed","top":-_top});
		$(".box").addClass("active");
		
	})


	$(".popup .close").on("click",function(){
		$(".popup").hide();
		$(".popup .creat").hide();
		$(".popup .text").show();
		$(".box").css({"position":"","top":""});
        $(".box").removeClass("active");
        $(document).scrollTop(_top)

	})



})

function jump(url) {
	console.log('jump url: ', url)
	window.open(url);
}



//轮播图
function funcSlick(obj, role, number,ver,scroll,speed, prev, next) {
    if (obj.attr("data-slick") == 'yes') return false;
    obj.attr("data-slick", "yes");
    obj.slick({
        dots: role ? false : true,
        infinite: true,
		arrows: true,
		swipe:!ver,
		autoplaySpeed:speed || 2000,
        draggable: false,
        prevArrow: obj.parent().parent().find(prev || ".prev"),
        nextArrow: obj.parent().parent().find(next || ".next"),
		autoplay: true,
		vertical: ver,
        slidesToShow: number || 1,
        slidesToScroll: scroll || 1
	});
}
/**
 * 视频
 */
function livePlayer(vid,id,type){
	var player = h5e.video.init({
		 modId: id,
		 vid: vid,
		 width: "100%",
		 height: "100%",
		 type: type,
		 autoplay:false
		//  volume:0
	 });
 }
/*---------------------------验证------------------------------*/
function verify(){
	var _this = $(".drive")
	//姓名 
	var name = _this.find(".name").val();
    if(name=="姓名(或称谓)" || name == ""){
		alert("请填写姓名(或称谓)");
		return false;
    }
    if (!validName(name)){
        alert("请输入正确的姓名");
        return false;
    }
//	手机
	var phone = _this.find(".mobile").val();
    if (validPhone(phone)){
    }else {
    	if(phone == ""){
    		alert("请填写手机号码");
	        return false;
    	}else{	
    	    alert("请填写正确的手机号码");
	        return false;
    	}
    }
//	省份
	var pro = _this.find(".pro span").text();
	if(!pro || pro == "请选择省份" || pro == "省份"){
		alert("请选择省份");
        return false;
	}
//	城市
	var city = _this.find(".city span").text();
	if(!city || city == "请选择城市" || city == "城市"){
		alert("请选择城市");
        return false;
	}
//	经营商
	var dealer = _this.find(".dealer span").text();
	if(!dealer || dealer=="请选择经销商" || dealer=="经销商"){
		alert("请选择经销商");
        return false;
	}
//	协议
	var agreement = _this.find(".whether .right").hasClass("active");
	if(!agreement){
		alert("请勾选我已阅读并接受个人信息保护《法律声明》");
        return false;
	}
	//省份ID
	var proId = _proCode[pro][0];
	//城市ID
	var cityId = _cityCode[city][0];
	//经销商ID
	var id = _data[pro][city][dealer][0];
	//编码
	// var code = _dealerCode[dealer][0];
    var adtag = h5e.util.getQueryString('ADTAG');
    //数据保存
    var data = {
    	name	: name,
    	phone	: phone,
    	pro		: pro,
    	city	: city,
		dealer	: dealer,
		proId : proId,
		cityId: cityId,
		id	: id,
		// code: code,
		adtag: adtag,
    	agreement: agreement
    }

    $.ajax({
		type: "post",
		dataType:"json",
		url:'default/saveuser',  //接口地址请按需修改
		data:data,   //参数设置：姓名为name、手机为mobile、省份为province、城市为city等
		success:function(data){
			if(data.code==0){
				//数据提交后调用提交成功弹层
				alert("保存成功");
				testDriveInit();
				
			}else{
				alert(data.message)
			}
	
		}
	});
	// 验证姓名的正则表达式
	function validName(name){
	    var pattern=/^([a-zA-Z]{1,20}|[\u4e00-\u9fa5]{1,10}|[\u4e00-\u9fa5a-zA-Z]{1,20})$/;
	    return pattern.test(name)
	}
	//手机号的验证  正则表达式
	function validPhone(phone){
		var pattern=/^(((17[0-9]{1})|(13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(16[6]{1})|(19[89]{1}))+\d{8})$/;
		return pattern.test(phone)
	}
}
//选择框改变
function funcSelectChange(obj,obj1,obj2){		
	obj.on("change", function(){
		var text = $(this).find("option:selected").text()
		$(this).prev().text(text)
		if(obj1) testDriveInit(obj1)
		if(obj2) testDriveInit(obj2)
	})
}
//验证初始化
function testDriveInit(number){
	var _this = $(".drive")
	if(!number) number = "all";
	if(number == "name" || number == "all" ) _this.find(".name").val("");
	if(number == "phone" || number == "all" ) _this.find(".mobile").val("");
	if(number == "pro" || number == "all" ) _this.find(".pro span").text("请选择省份")
	if(number == "city" || number == "all" ) _this.find(".city span").text("请选择城市");
	if(number == "dealer" || number == "all" ) _this.find(".dealer span").text("请选择经销商");
	if(number == "config" || number == "all" ) {
		_this.find(".selectInit").empty();
		linkage(config);
	}
}

/**
 * 替换系统弹窗
 * @param {Object} text
 */
function alert(text){
	Vogsojs.alert(text);
	// setTimeout(function(){
	// 	$(window).one("click",function(){$(".maskAlert .alertSure").click()})
	// },100)
}





/**
 * 加载中
 */
var _progress = true;
var compNub = 0;
function progress(e){
    var per = Math.floor(e.loaded * 10000) /100 *2;
    var number = Math.floor(per).toString() ;
    // console.log(number.length);

}

/**
 * 加载完成
 */
function complete(e){
    _game = new Poster.main($("#poster")[0]);
}


/**
 * 生成图片
 */
function createPic(e){
    $(".popup canvas").hide();
    $(".popup .poster_img img").remove();
    var img = new Image();
    img.src = e.data;
    _imgUrl = e.data;
    $(".popup .poster_img").append(img);
    //$(".Photo .mask_photo img").attr("src",e.data);
}


function create(){
    _game.getImageData();
}