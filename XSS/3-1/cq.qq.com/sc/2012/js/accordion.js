(function($){
	
/**
 * 生成随机字符串
 * @param int 长度，默认32位
 * @return string
 */
$.randomString = function(length){	
	length = length || 32;  
    var source = "abcdefghzklmnopqrstuvwxyz";  
    var random = "";  
    for(var i = 0;i < length; i++)  {  
        random += source.charAt(Math.ceil(Math.random()*100000000)%source.length);  
    }  
    return random;
}

$.fn.accordion = function() {			//设定一个叫accordion的插件
	var oList = $(".floor-top");		//取到页面的class floor-top 得到一个floor-top的对象
	$.each( oList, function(i, n){		//用jquery的each循环得到的floor-top对象 i是循环的数 n是取的dom对象
		$(n).attr("id", $.randomString(8)); //用$()+ n 得到一个jquery对象，调用.attr函数赋一个值 "id"= 1个8位的随机数
	}); 
	$(".floor-top p").mouseover(function(){		//绑定一个鼠标移入时间
		var parentId = $(this).parent().attr("id");	//用当前$this取父元素里面的id的值.赋值给parentId
		//alert('parentId：'+parentId);	
		$("#" + parentId + " p").removeClass("selected").css("color","#636363");	//用#+取到的值+ 空格P = {#8位随机数 p} 调用一个删除所有里面的的class=selected的函数
		$(this).addClass("selected").css("color","#c41e1e");	//用当前调用添加一个class=selected 后面是css样式
	});

};

})(jQuery);/*  |xGv00|72237af295a65412dd075f6903673f99 */