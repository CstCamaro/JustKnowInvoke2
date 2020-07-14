K("content").css({height:K("float").height() + K("bottomElite").height() + "px" })

K("prre").hover(function(){
	K(this).addClass("preHover");
},function(){
	K(this).removeClass("preHover");	
})

function imgLoaded(){
   //K("listss li img").css("height",K(this).height() + "px");
   
}



	var slice = [].slice,
	num = document.getElementById('num').innerHTML,
	li = document.getElementById('listss').getElementsByTagName('li');
	var args = [];
	for(var i = 0, len = li.length; i < len; i++){
		args.push(li[i]);
	}
	try{
		li = slice.call( li, 0 ).reverse()
	}catch(err){
		li = args.reverse();
	};
	// 获取num对应的li
	var thisli = li[Number(num)-1];
	thisli.style.display = 'block';
	thisli.getElementsByTagName('img')[0].id = 'contImg';
	var srrc = K("contImg").attr("__src");
	//alert(srrc)
	K("contImg").attr("src",srrc)
	//alert(K("contImg").attr("__src"))
	// 获取前一个li
	var prevli = li[Number(num)-2];
	var __text = thisli.getElementsByTagName('p')[1].innerHTML
	
	if(prevli){
		var sImgSrc = document.getElementById("sImg");
		var smallImg = prevli.getElementsByTagName('em')[0].innerHTML
		sImgSrc.setAttribute("src",smallImg);
		var pres = document.getElementById("pres");
		var urls = prevli.getElementsByTagName('span')[0].innerHTML;
		pres.setAttribute("href",urls);
	}
	else{
		K("pres").hide();	
	}


function getByClass(oParent,sClass) {   
	var aTmp = [],
		aEle = oParent.getElementsByTagName('*');  
		var pattern = new RegExp("\\b"+sClass+"\\b"); 
		for (var i=0; i<aEle.length; i++ ) {  
		   if (pattern.test(aEle[i].className)){  
				aTmp.push(aEle[i]);  
			}  
	   }  
	   return aTmp;  
}  
window.onload = function(){
	var __src = document.getElementById("contImg").src;
	loadImage(__src,imgLoaded);
			
var contHeight = K("contImg").height();
var wrapHeight = K("top").height() + K("conth2").height() + K("listss").height() + K("bottom").height() + 23;
K("slide").css("height",wrapHeight + "px");
	
(function() {
    var oDiv = document.getElementById("float");
    var H = 0,
    iE6;
    var Y = oDiv;
    while (Y) {
        H += Y.offsetTop;
        Y = Y.offsetParent
    };
    iE6 = window.ActiveXObject && !window.XMLHttpRequest;
	
	var that = this;
	var floatHeight = K("float").height();
	var bottomEliteHeight = K("bottomElite").height();
	var s = document.body.scrollTop || document.documentElement.scrollTop;
	var h1 =K("slide").height();
	var h2 = K('bottomElite').height();
	var h3 = K('float').height();
	var sDiv=document.getElementById('pre');
	//
	K("pre").css("top","100px");
	
if(h1 < h2+h3){
	K('float').css({position:"static"})
	K('bottomElite').css({position:"static"})
}

if(h1 > h2+h3){
    window.onscroll = function() {
			var sDiv=document.getElementById('pre');
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			var t=scrollTop+(document.documentElement.clientHeight-sDiv.offsetHeight)/2;
			_top = parseInt(sDiv.style.top);
			if(scrollTop < wrapHeight - 250){
					startMove(parseInt(t));		
					
			}else {
				sDiv.style.top = wrapHeight - 250 + 'px';
			}
		
		oDiv.className = "div1";

		
		if(!iE6){
			
			var s = document.body.scrollTop || document.documentElement.scrollTop;
			if(s > h1 - h2 - h3) {
				K("float").css({position:"absolute",top: (h1 - h2 - h3) + "px"});	
			}else{
				K("float").css({position:"fixed",top:0});	
			}
			if(s < (K("Topnav").height() + K("topic_nav_box").height())){
				K("float").css({top: (K("Topnav").height() + K("topic_nav_box").height()) - s + 30+ "px"})
			}
			
		}

	  if (iE6) {
			if(s > h1 - h2 - h3) {
				K("float").css({position:"absolute",top: (h1 - h2 - h3) + "px"})
			}else{
				oDiv.style.top = (s - H) < 90 ? 0 : (s - H) + "px";
			}
			
		}
		
		
	}
}

var timer=null;
function startMove(iTarget)
{
	
	
	clearInterval(timer);
	timer=setInterval(function (){
		var iSpeed=(iTarget-sDiv.offsetTop)/10;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		if(sDiv.offsetTop==iTarget)
		{
			clearInterval(timer);
		}
		else
		{
			sDiv.style.top = ((sDiv.offsetTop+iSpeed) > (wrapHeight - 250) ? (wrapHeight - 250) :  sDiv.offsetTop+iSpeed) +'px';
		}
	}, 30);
}

})();
	
}


function loadImage(url, callback) {
  var img = new Image();
   img.src = url;
   img.onload = function(){ //图片下载完毕时异步调用callback函数。
     callback.call(img);   // 将callback函数this指针切换为img。
   };
}/*  |xGv00|99de7d8961fc40d4e77c4b023e62fb4a */