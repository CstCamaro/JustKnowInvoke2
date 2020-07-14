jQuery(document).ready(function($){$(".delicacy-list .cont .l,.delicacy-map,.qmei .bok,.star-level,.daren-cont,.meishi-list").find("img").lazyload({ placeholder : "//mat1.gtimg.com/cq/tech/3c/images/default.png", effect : "fadeIn",failurelimit : 10});});

$(function(){
	
	/*jQuery("#focus_img").KinSlideshow({
		moveStyle:"left",
		intervalTime:5,
		moveSpeedTime:400,
		isHasTitleBar:true,
		titleBar:{titleBar_height:45,titleBar_bgColor:"#000000",titleBar_alpha:0.5,titleBar_bottom:45},
		titleFont:{TitleFont_size:16,TitleFont_color:"#FFFFFF",TitleFont_family:'Microsoft YaHei',TitleFont_weight:"normal",titleBar_alpha:false,titleFont_bgColor:'#f6f6f6',Text_top:'315px',Text_align:'left',Text_padding_left:'18px'},
		btn:{btn_bgColor:"#17150e",btn_bgHoverColor:"#fd7200",btn_fontColor:"#000000",
		btn_fontHoverColor:"#FFFFFF",btn_borderColor:"#cccccc",
		btn_borderHoverColor:"#2287bc",btn_borderWidth:0,btn_Width:20,btn_Height:7,btn_LineHeight:10,btn_bottom:60,btn_right:16},
		isHasCon:false,
		isHasCtrl:true,
		ctrl:{ctrl_link: '//mat1.gtimg.com/cq/kyoko/eat15/bg.png',ctrl_top: 156,ctrl_left: 15,ctrl_right: 15,ctrl_width:27,ctrl_height:50}
	});	*/
	
	$(".nav li,.daren-cont-sub .more,.section2 .cont .r p.p1 a,.r-title .bok,.r-title.xingji .bok").hover(function(){
		$(this).addClass("active");	
	},function(){
		$(this).removeClass("active");	
	})
	
	$(".delicacy-list .cont").hover(function(){
		$(this).addClass("active");	
	},function(){
		$(this).removeClass("active");	
	})
	
	$(".map-list li").hover(function(){
		$(this).addClass("active").siblings().removeClass("active");	
	})
	
	$(".section3 .l-title .tab li").hover(function(){
		var i=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".daren-cont .daren-cont-sub").eq(i).addClass("active").siblings().removeClass("active");
	})
	
	$(".meishi-list li").hover(function(){
		$(this).find(".bok").stop().animate({top:"-400px"},300);
		$(this).find("span").stop().animate({top:"0px"},300);	
	},function(){
		$(this).find(".bok").stop().animate({top:"0px"},300);
		$(this).find("span").stop().animate({top:"400px"},300);	
	})
	
	$(".qmei .bok").hover(function(){
		$(this).find("p").addClass("active");	
	},function(){
		$(this).find("p").removeClass("active");	
	})
	
	$(".daren-cont-sub .bok").hover(function(){
		$(this).find("span").addClass("active");	
	},function(){
		$(this).find("span").removeClass("active");	
	})
	

	$('.section1 .left,.section2 .cont .l,.community-activity li,.qmei .bok,.star-level,.daren-cont-sub .bok,.meishi-list li .bok').hover(function(){
		$(this).find('img').stop().animate({opacity:'0.8',filter: 'alpha(opacity=80)'}, {duration: 300});		
	},function(){
		$(this).find('img').stop().animate({opacity:'1',filter: 'alpha(opacity=100)'}, {duration: 300});
	});
	
	var topa = $(".section2").offset().top;
    var topb = $(".qmei").offset().top;
	var topc = $(".xingji").offset().top;
	var topd = $(".section3").offset().top;
	

    
    $(".nav li.li2").click(function(e){
            e.preventDefault();
            $('html,body').animate({ scrollTop:topa},500);
    });
	$(".nav li.li3").click(function(e){
            e.preventDefault();
            $('html,body').animate({ scrollTop:topb},500);
    });
	$(".nav li.li4").click(function(e){
            e.preventDefault();
            $('html,body').animate({ scrollTop:topc},500);
    });
	$(".nav li.li5").click(function(e){
            e.preventDefault();
            $('html,body').animate({ scrollTop:topd},500);
    });
	

		
})/*  |xGv00|336c688737d18a7d651a54bab8e9d0a8 */