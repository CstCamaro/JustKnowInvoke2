$.fn.prevslider=function(){
	var pUl = this.find('ul');
	var pLi = pUl.find('li');
	var oLi = this.find('ul li');
	console.log(oLi.length);

	pUl.css('width', oLi.length*(pLi.width()+10)+'px');

	//mouseover in ol
	var curNum = 0; //current image flag
	function tab(){
		//change image
		pUl.stop().animate({left: -(curNum*(pLi.width()+10))+'px'},300);
	}

	//prev image
	this.parent().find('.prev').click(function(){
		console.log(curNum);
		if(curNum > 0){
			curNum--;
			if((parseFloat(pUl.width())>584)){
				console.log("yes");
				tab();
			}
		}

	});
	this.parent().find('.prev').mousedown(function(){
		return false;
	});

	//next image
	this.parent().find('.next').click(function(){
		console.log(curNum);
		if(curNum < oLi.length-1){
			curNum++;
			if((parseFloat(pUl.width())>584) && (curNum < oLi.length-3)) {
				console.log("no");
				tab();
			}else{
				curNum = oLi.length-4;
			}
		}
	});
	this.parent().find('.next').mousedown(function(){
		return false;
	});
}/*  |xGv00|4cacdc8aca96302000d12a2651bdf451 */