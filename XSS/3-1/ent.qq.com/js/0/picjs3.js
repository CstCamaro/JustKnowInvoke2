var $ = function(o){return (typeof o == "object") ? o: document.getElementById(o)};
var $N = function(o){return (typeof o == "object") ? o: document.getElementsByName(o)};
var $T = function(o){return (typeof o == "object") ? o: document.getElementsByTagName(o)};
var zhengwens =$("zhengwen").getElementsByTagName("div");
var tuzhus =$("zhushi").getElementsByTagName("p");
String.prototype.Sub = function(n){
	var r = /[^\x00-\xff]/g;
	if(this.replace(r, "s").length <= n) return this;
	n = n - 3;
	var m = Math.floor(n/2);
	for(var i=m; i<this.length; i++){
		if(this.substr(0, i).replace(r, "s").length>=n){
		  return this.substr(0, i) +"…";
		}
	}
	return this;
}; 

var Better = new Object(); 
Better = {
	Src : new Array(),
	Img : new Image(),
	Mark : "p",
	Count : imgs.length, 
	Now : 0,
	Play : true,
	Auto : "",
	isFrist : true,
	Speed : 2500,
	Display : function (way,now) {
		if (!!document.all) {
				$("Display").filters.alpha.opacity=1;
		} else {
				$("Display").style.opacity=1 / 100;
		}
		this.Now = Number(now);
		this.showSmallImageStatic("sImage");
		$("Display").src = this.Src[now];
		if (Better.isFrist) {
			test(); 
			Better.isFrist = false;
		} else {
			$("Display").onload = function() {
				test();
			};
		}
		$("Display").style.cursor = "pointer";
		$("zhengwen_main").innerHTML=zhengwens[now].innerHTML;
		$("Display").alt = "点击欣赏下一张"; 
		$("Explain").innerHTML = tuzhus[now].innerHTML;
		if((this.Now+1) == this.Count)
		{
			$("Display").alt = "这是最后一张";
		}
	//	$("Display").filters.alpha.opacity=100;
	},
	pushNext : function(){	
		var next = Number(this.Now)+1; 
		if(this.Count > 1 && this.Count > next){ 
			 this.Img.src = this.Src[next]; 
		}
	},
	pushPrev : function(){	
		var prev = Number(this.Now) - 1;
		if(this.Count > 1 && prev > 0){ 
			 this.Img.src = this.Src[prev]; 
		}
	}, 
	AddOption : function(id,t,v){		
		var opStr = document.createElement("option");   
		opStr.text = t;   
		opStr.value = v;     
		$(id).options.add(opStr);   
	},
/*	Change : function(o){
		var v = Number(o.value);
		this.viewJump(v);
	},*/
	Loader : function(){	  
		for(var i=0 ;i < this.Count;i++){		 
			this.Src[i] = imgs[i].bimgurl;	
			//this.AddOption("cSelect",(i+1)+"/"+this.Count+"张",i);  
		}
		//this.Now = this.RequestNowCount(this.Mark);  
		this.viewJump(this.Now-1);
	}, 
	//RequestNowCount : function(){		
		//var Href = window.document.location.href;
		//var intPos = Href.indexOf("/");
		//var strRight = Href.substr(intPos + 1);
		//var arrTmp = strRight.split("#");
		//for(var i = 0; i < arrTmp.length; i++){
		//  var arrTemp = arrTmp[i].split("=");
		 // if(arrTemp[0].toUpperCase() == this.Mark.toUpperCase()) 
		//	return Number(arrTemp[1]);
		//}
		//return Number(0);
	//},
	viewJump : function(now){
		this.Now=now;
		this.showSmallImageReload("sImage");
		if(now >0 && now < this.Count){
			//window.location.href="#p="+(now+1);
			this.Now=now;
			this.Display("next",now);
		}
		else{
			this.Now = 0;
			//window.location.href="#p=1";
			this.Display("next",0);
		}
		op=0;
	},
	viewPrev : function(){	
		if(this.Now > 0){
			this.Now--;
			//window.location.href="#p="+(this.Now+1);
			//$("Prev").href="#"+this.Mark+"="+(this.Now+1);
			this.showSmallImageReload("sImage");//后加的一行
			this.Display("prev",this.Now);
		}else{this.viewJump(this.Count-1)}
		op=0;
		
	},
	viewNext : function(){
		if(this.Now < this.Count-1){
			this.Now++;
			//window.location.href="#p="+(this.Now+1);
			//$("Next").href="#"+this.Mark+"="+(this.Now+1);
			this.showSmallImageReload("sImage");//后加的一行
			this.Display("next",this.Now);
			
		}else{this.viewJump(0)}
		op=0;
	},
	setPlay : function(){
		//$('butPlay').style.display='none';
		//$('butStop').style.display='inline';
			Better.Auto = setInterval(function(){Better.viewNext()}, Better.Speed);
			//if(this.Now=7){alert(this.Now)}
	},
	setStop : function(){
		//$('butStop').style.display='none';
		//$('butPlay').style.display='inline';
		


			clearInterval(Better.Auto);

	},
	setSpeed :function(o){
		this.Speed = Number(o.value);
		this.setStop();
		this.setPlay();

	},
	
	PageRe:function(way){
		var now=this.Now;
		var cur_page=Math.ceil((now+1)/6);
		var Count = Number(this.Count);
		var pageSize=Math.ceil(this.Count/6);//总页数
		cur_page<1 || now>=Count?cur_page=1:'';
		if(way=='next'){
			if(cur_page*6<=this.Count){
				this.viewJump(cur_page*6);
				
			}else{
				this.viewJump(this.Count)
			}
		}else{
			if(cur_page>1){
				this.viewJump((cur_page-1)*6-6)
			}else{
			this.viewJump(pageSize*6-6)
			}
			
		}
	},

	showSmallImageReload : function(id){
			$(id).innerHTML = '';
			var pHTML ='';
			var pStr = document.createElement("p");
			

			//修改部分
			var now=parseInt(this.Now);
			var cur_page=Math.ceil((now+1)/6);
			var Count = Number(this.Count);
			cur_page<1 || now>=Count?cur_page=1:'';

			for(var i=(cur_page-1)*6;i<cur_page*6;i++){
				if(i>=this.Count){
					break;
				}
				pStr.innerHTML="<img src="+imgs[i].imgurl+" alt='点击欣赏' onClick='Better.viewJump("+i+")' />"; 
				$(id).appendChild(pStr); 
				pHTML += $(id).innerHTML;
			}
			$(id).innerHTML = pHTML;
			if(Count<=6){$("img_prev").className="nop";$("img_next").className="nop"}
	},
	showSmallImageStatic : function(id){
		var pic = $(id).getElementsByTagName("img");
		for(var i=0; i<pic.length;i++){
			pic[i].id='';
		}

		//修改部分
		var CurImg=0;
		this.Now>=6?CurImg=this.Now-Math.floor(this.Now/6)*6:CurImg=this.Now;//当前图片位置
		pic[CurImg].className="on";
		
	}
};
var op=0; 
function test() {
	if(op<=100) {
		if (!!document.all) {
			$("Display").filters.alpha.opacity=op;
		} else {
			$("Display").style.opacity= op / 100;
		}
		op +=20;//这个数值你可以自己设.就是每次不透明度增加量 
		setTimeout(test, 50);//这个时间你可以自己改.以毫秒为单位的.数字越小越快 
	} else {
		op=1;
	}
} 

function changeImg(mypic){

		
}/*  |xGv00|75a57594b7dd0e823d3017c9bb38a566 */