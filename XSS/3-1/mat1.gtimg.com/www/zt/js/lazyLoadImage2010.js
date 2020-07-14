btLLI={
	getTop:function(el){
		var parEl = el.offsetParent;
		var _sTop = el.offsetTop;
		if(!parEl){return el}
		if(parEl.nodeName.toLowerCase() == 'html' || parEl.nodeName.toLowerCase() == 'body'){
			return _sTop;
		}else{
			_sTop += btLLI.getTop(parEl);
			return _sTop; 
		}
	},
	getScrollHeight:function(){		
		var t = 0;
		var h = parseInt(window.screen.height, 10);
		if(window.pageYOffset){//DOM
			t = window.pageYOffset;
		}else if(document.compatMode && document.compatMode == 'CSS1Compat'){//IE
			t = document.documentElement.scrollTop;
		}else{
			t = document.body.scrollTop;
		}
		return t + h;
	}
}

function lazyLoadImage(){
	if(window.lazyLoadImageLoaded){		
		lazyLoadImage.init();
	}
}
lazyLoadImage.allBoxes = [];
lazyLoadImage.viewBoxes = [];
lazyLoadImage.viewImages = [];
lazyLoadImage.allImages = [];
lazyLoadImage.winTop = window.clientHeight;
lazyLoadImage.init = function(){
	/* initial */
	//get scroll height
	lazyLoadImage.winTop = btLLI.getScrollHeight();
	//get boxes need lazyload
	lazyLoadImage.getAllBoxes();
	lazyLoadImage.getViewBox();
	/* end initial */
	if(window.onscroll){
		var scrll = window.onscroll;
	}
	window.onscroll = function(){
		//get sroll height
		lazyLoadImage.winTop = btLLI.getScrollHeight();
		/* get boxs viewable */
		//clear timeout
		if(lazyLoadImage.delay){
			lazyLoadImage.delay = null;
			clearTimeout(lazyLoadImage.delay);
		}
		//set timeout
		lazyLoadImage.delay = setTimeout(lazyLoadImage.getViewBox, 300);
		/* end get boxs viewable */
		scrll && scrll();
	}
}
lazyLoadImage.getAllBoxes = function(){
	var allUls = document.getElementsByTagName('ul');
	var ulLen = allUls.length;
	for(var i = 0; i < ulLen; i++){
		if(allUls[i].getAttribute('lazy') && allUls[i].getAttribute('lazy') == 'lazy'){
			var _sTop = btLLI.getTop(allUls[i]);
			lazyLoadImage.allBoxes.push({el:allUls[i], sTop:_sTop, idx:i});
		}
	}
}
lazyLoadImage.getViewBox = function(){
	var boxs = lazyLoadImage.allBoxes;
	var boxLen = boxs.length;
	if(boxLen > 0){
		for(var i = 0; i < boxLen; i++){
			if(boxs[i].sTop < lazyLoadImage.winTop && !boxs[i].el.view){
				boxs[i].el.view = true;
				lazyLoadImage.viewBoxes.push(boxs[i]);
			}
		}
		lazyLoadImage.getImages();
	}	
}
lazyLoadImage.getImages = function(){
	var viewUls = lazyLoadImage.viewBoxes;
	var viewUlLen = viewUls.length;
	if(viewUlLen > 0){
		for(var i = 0; i < viewUlLen; i++){
			var imgs = viewUls[i].el.getElementsByTagName('img');
			var imgLen = imgs.length;
			for(var j = 0; j < imgLen; j++){
				if(imgs[j].getAttribute('lazy') && imgs[j].getAttribute('lazy') == 'lazy'){
					try{var _sTop = imgs[i].getAttribute('sTop');}catch(e){}
					if(!_sTop){
						_sTop = btLLI.getTop(imgs[i]);
						imgs[i].setAttribute('sTop',_sTop);
					} 
					lazyLoadImage.allImages.push({el:imgs[j], sTop:_sTop, idx:j});
				}
			};
		}
		lazyLoadImage.getViewImages();
	}
}
lazyLoadImage.getViewImages = function(){
	var images = lazyLoadImage.allImages;
	var imgLen = images.length;
	for(var i = 0; i < imgLen; i++){
		if(images[i].sTop < lazyLoadImage.winTop && !images[i].el.view){
			lazyLoadImage.viewImages.push(images[i]);
		}
	}
	lazyLoadImage.updateSrc();
}
lazyLoadImage.updateSrc = function(){
	var viewImgs = lazyLoadImage.viewImages;
	var viewImgLen = viewImgs.length;
	if(viewImgLen > 0){
		for(var i = 0; i < viewImgLen; i++){
			viewImgs[i].el.setAttribute('src', viewImgs[i].el.getAttribute('_src')) ;
			viewImgs[i].el.view = true;
		}
	}
	lazyLoadImage.viewImages = [];
	lazyLoadImage.viewBoxes = [];
}

lazyLoadImage.delay = null;
if(window.addEventListener){
	window.addEventListener('load',function(){
		window.lazyLoadImageLoaded = true;
		lazyLoadImage.init();
	},false)
}else if(window.attachEvent){
	window.attachEvent('onload',function(){
		window.lazyLoadImageLoaded = true;
		lazyLoadImage.init();
	})
}

/*  |xGv00|83e46ecb00fd10e0572281745d551fd7 */