var GG = jQuery.noConflict();
var Ency=function(){};
Ency.prototype={
	headMove:function(){
		function startMove(obj,json,fnEnd){
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				doMove(obj,json,fnEnd);
			},30);
		}
		function doMove(obj,json,fnEnd){
			var iCur = 0;
			var attr = null;
			var bStop = true;
			for(attr in json){
				if(attr=='opacity'){
					iCur = parseInt(100*getStyle(obj,attr)) || 0;
				}
				else{
					iCur = parseInt(getStyle(obj,attr)) || 0;
				}
				var iSpeed = (json[attr] - iCur)/8;
				iSpeed = (iSpeed>0) ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				
				if(iCur!=json[attr]){
					bStop = false;
				}
				
				if(attr=='opacity'){
					obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
					obj.style.opacity = (iCur + iSpeed)/100;
				}
				else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
				
			}
			if(bStop){
				clearInterval(obj.timer);
				if(fnEnd){
					fnEnd.call(obj);
				}
			}
			
		}
		function getStyle(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}
			else{
				return getComputedStyle(obj)[attr];
			}
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
		var oParent = document.getElementById('wmenu');
		var aItem = getByClass(oParent,'myitem');
		
		for(var i=0;i<aItem.length;i++){
			aItem[i].onmouseover = function(){
				for(var i=0;i<aItem.length;i++){
					startMove(aItem[i],{'width':40});
				}
				var thisItem = getByClass(this,'item_content')[0];
				startMove(this,{'width':110});
				thisItem.style.display = 'block';
			}
			aItem[i].onmouseout = function(){
				var thisItem = getByClass(this,'item_content')[0];
				thisItem.style.display = 'block';
				startMove(this,{'width':40});
				
				for(var i=0;i<aItem.length;i++){
					//startMove(aItem[0],{'width':110});
				}
			}
		}
		getByClass(oParent,'icon_wb')[0].onmouseover = function(){
			for(var i=0;i<aItem.length;i++){
				startMove(aItem[i],{'width':40});
			}
			var thisItem = getByClass(aItem[0],'item_content')[0];
			startMove(this,{'width':110});
			this.className = 'link icon_wb htIco_on_24';
			thisItem.style.display = 'block';
		}
		getByClass(oParent,'icon_wb')[0].onmouseout = function(){
			this.className = 'link icon_wb';
			var thisItem = getByClass(aItem[0],'item_content')[0];
			thisItem.style.display = 'block';
			startMove(this,{'width':40});
			
			for(var i=0;i<aItem.length;i++){
				//startMove(aItem[0],{'width':110});
			}
		}

		getByClass(oParent,'icon_find')[0].onmouseover = function(){
			for(var i=0;i<aItem.length;i++){
				startMove(aItem[i],{'width':40});
			}
			var thisItem = getByClass(aItem[1],'item_content')[0];
			startMove(this,{'width':110});
			this.className = 'link icon_find hMailIco_on_24';
			thisItem.style.display = 'block';
		}
		getByClass(oParent,'icon_find')[0].onmouseout = function(){
			this.className = 'link icon_find';
			var thisItem = getByClass(aItem[1],'item_content')[0];
			thisItem.style.display = 'block';
			startMove(this,{'width':40});
			
			for(var i=0;i<aItem.length;i++){
				//startMove(aItem[0],{'width':110});
			}
		}

		getByClass(oParent,'icon_mail')[0].onmouseover = function(){
			for(var i=0;i<aItem.length;i++){
				startMove(aItem[i],{'width':40});
			}
			var thisItem = getByClass(aItem[2],'item_content')[0];
			startMove(this,{'width':110});
			this.className = 'link icon_mail hLxIco_on_24';
			thisItem.style.display = 'block';
		}
		getByClass(oParent,'icon_mail')[0].onmouseout = function(){
			this.className = 'link icon_mail';
			var thisItem = getByClass(aItem[2],'item_content')[0];
			thisItem.style.display = 'block';
			startMove(this,{'width':40});
			
			for(var i=0;i<aItem.length;i++){
				//startMove(aItem[0],{'width':110});
			}
		}

		getByClass(oParent,'icon_home')[0].onmouseover = function(){
			for(var i=0;i<aItem.length;i++){
				startMove(aItem[i],{'width':40});
			}
			var thisItem = getByClass(aItem[2],'item_content')[0];
			startMove(this,{'width':110});
			this.className = 'link icon_home hIndexIco_on_24';
			thisItem.style.display = 'block';
		}
		getByClass(oParent,'icon_home')[0].onmouseout = function(){
			this.className = 'link icon_home hIndexIco_on_24';
			var thisItem = getByClass(aItem[2],'item_content')[0];
			thisItem.style.display = 'block';
			startMove(this,{'width':40});
			
			for(var i=0;i<aItem.length;i++){
				//startMove(aItem[0],{'width':110});
			}
		}
	},
	navHover:function(){
		GG("#nav .navMenu").hover(function(){
			GG(this).find("span").addClass("Gico " + "show" + GG(this).find("span").attr("name"));
			GG(this).find("span").next(".second").show();
		},function(){
			GG(this).find("span").removeClass("Gico " + "show" + GG(this).find("span").attr("name"));
			GG(this).find(".second").hide();;
		})
		GG("#nav .navMenu").find("span").eq(3).hover(function(){
			GG(this).next(".second").show().css("left","-217px");
		})
		GG("#nav .navMenu").find("span").eq(4).hover(function(){
			GG(this).next(".second").show().css("left","-217px");
		})
		GG("#nav .navMenu").find("span").eq(5).hover(function(){
			GG(this).next(".second").show().css("left","auto").css("right","-222px");
		})
		GG("#nav .navMenu").find("span").eq(6).hover(function(){
			GG(this).next(".second").show().css("left","auto").css("right","-91px");
		})
	},
	imgSRC:function(){
		GG("#market img").each(function(){
			GG(this).attr("src",GG(this).attr("_src"));
		})
		
	}

}

var wind = new Ency;
wind.headMove();
wind.navHover();
wind.imgSRC();




/*  |xGv00|428de9ecb71ff1c45c07613a6311a6f7 */