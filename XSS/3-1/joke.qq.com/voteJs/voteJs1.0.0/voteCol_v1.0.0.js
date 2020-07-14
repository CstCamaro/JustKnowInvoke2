function ColPic(votePrjId,voteNumL,voteNumR,colPicL,voteDiggMode){
	this.voteId=votePrjId;
	this.voteNum1=voteNumL;
	this.voteNum2=voteNumR;
	this.voteCol1=colPicL;
	this.voteAdd1=0;
	this.voteAdd2=0;
	this.voteMode=voteDiggMode;
	if(!ColPic.childs){
		ColPic.childs=[];
	}
	this.ID=ColPic.childs.length;
	ColPic.childs.push(this);
	
	//获取投票数据
	this.getVoteNum=function(){

		if(document.getElementById(this.voteId)==""){
			return;
		}
		
		var votenum=[];
		votenum[0]=parseInt(document.getElementById("apps_svy_opt_count_"+this.voteId+"_0").innerHTML);
		votenum[1]=parseInt(document.getElementById("apps_svy_opt_count_"+this.voteId+"_1").innerHTML);
		return votenum;
	};
	
	//画柱状图
	this.drawCol=function(){
		var colHeight=document.getElementById(this.voteCol1).clientWidth;
		
		
		var n1=0;
		var flag1=0;
		
		var tempArr=this.getVoteNum();
		if(this.voteMode=="0"){
			if((document.getElementById("apps_svy_opt_title_"+this.voteId+"_0").getElementsByTagName("a").length>0)&&(document.getElementById("apps_svy_opt_title_"+this.voteId+"_1").getElementsByTagName("a").length>0)){
				
				tempArr[0]=tempArr[0]+this.voteAdd1;
				tempArr[1]=tempArr[1]+this.voteAdd2;
				
				this.voteAdd1=this.voteAdd2=0;
			}else{return;}
		}else if(this.voteMode=="1"){
			if((document.getElementById("apps_svy_opt_title_"+this.voteId+"_0").getElementsByTagName("a").length>0)||(document.getElementById("apps_svy_opt_title_"+this.voteId+"_1").getElementsByTagName("a").length>0)){
				
				tempArr[0]=tempArr[0]+this.voteAdd1;
				tempArr[1]=tempArr[1]+this.voteAdd2;
				
				this.voteAdd1=this.voteAdd2=0;
			}else{return;}
		}
		var allVoteNum=tempArr[0]+tempArr[1];
		
		var colL=Math.ceil(tempArr[0]/allVoteNum*100)/100;

		var voteImg1=this.voteCol1;
		var votenum1=this.voteNum1;
		var votenum2=this.voteNum2;
		
		
		document.getElementById(voteImg1).getElementsByTagName("div")[0].style.width=parseInt(colHeight*colL)+"px";
		document.getElementById(votenum1).innerHTML=Math.ceil(colL*100)+"%";

		
		document.getElementById(votenum2).innerHTML=(100-Math.ceil(colL*100))+"%";
	
			
	};
	this.addEvent=function(o,handle,fn){
		if(o.attachEvent){
			o.attachEvent("on"+handle,fn);
		}else{
			if(o=="window"){
				window.addEventListener(handle,fn,false);
			}else{
				o.addEventListener(handle,fn,false);
			}
		}
	}
	this.init=function(){
		var iid=this.ID;
		var flag3=0;
		this.addEvent(window,"load",function(){if(flag3){clearTimeout(flag3);};flag3=setTimeout(function(){ColPic.childs[iid].drawCol()},100)});
		this.addEvent(document.getElementById("apps_svy_opt_title_"+this.voteId+"_0"),"click",function(){ ColPic.childs[iid].voteAdd1++;ColPic.childs[iid].drawCol()});
		this.addEvent(document.getElementById("apps_svy_opt_title_"+this.voteId+"_1"),"click",function(){ColPic.childs[iid].voteAdd2++;ColPic.childs[iid].drawCol()});

	};
	
}/*  |xGv00|cf0cd6980bd1d37b4e3a82e5a25d0195 */