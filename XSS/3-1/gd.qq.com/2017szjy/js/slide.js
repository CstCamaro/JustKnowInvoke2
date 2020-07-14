
$.fn.slider=function(){

	var pUl = this.find('ul');
	var pLi = pUl.children();
	var oLi = this.find('ol li');

	var wid = this.width();
	var hei = this.height();

	this.find('ul li').css({'width':wid,'height':hei})
	pUl.css('width', oLi.length*pLi.width()+'px');
	this.find('ol').css('margin-left',-0.5*(this.find("ol").width()-5));
	
	//mouseover in ol
	var curNum = 0; //current image flag
	oLi.mouseover(function(){
		curNum = $(this).index();
		tab();
	});
	function tab(){
		//change index
		oLi.removeClass('active');
		oLi.addClass('normal');
		oLi.eq(curNum).addClass('active');
		
		//change image
		pUl.stop().animate({left: -curNum*pLi.width()+'px'});
	}
	
	//aoto change image
	setInterval(changeImg, 4500);
	
	function changeImg(){
		if(curNum == oLi.length-1){
			curNum=0;
		}
		else{
			curNum++;
		}
		
		//change flag
		oLi.removeClass('active');
		oLi.addClass('normal');
		oLi.eq(curNum).addClass('active');
		
		//chage image
		pUl.stop().animate({left: -curNum*pLi.width()+'px'});
	}
	
	//prev image
	this.find('.prev').click(function(){
		curNum--;
		if(curNum == -1){
			curNum = oLi.length-1;
		}
		tab();
	});
	this.find('.prev').mousedown(function(){
		return false;
	});
	
	//next image
	this.find('.next').click(function(){
		curNum++;
		if(curNum == oLi.length){
			curNum=0;
		}
		tab();
	});
	this.find('.next').mousedown(function(){
		return false;
	});
}/*  |xGv00|3bdf259f25015cffce982567c930fac0 */