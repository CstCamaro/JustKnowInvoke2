/*
<DIV id=icefable1>
	 <DIV>11111111111111111</DIV>
	 <DIV>22222222222222222</DIV>
	 <DIV>33333333333333333</DIV>
	 <DIV>44444444444444444</DIV>
	 <DIV>55555555555555555</DIV>
	 <DIV>66666666666666666</DIV>
	 <DIV>77777777777777777</DIV>
	 <DIV>88888888888888888</DIV>
	 <DIV>99999999999999999</DIV>
	 <DIV>00000000000000000</DIV>
	 <DIV>1aaaaaaaaaaaaaaaaa</DIV>
	 <DIV>2bbbbbbbbbbbbbbbbb</DIV>
	 <DIV>3ccccccccccccccccc</DIV>
	 <DIV>4ddddddddddddddddd</DIV>
	 <DIV>5eeeeeeeeeeeeeeeee</DIV>
</DIV>

<SCRIPT>
*/

function marquees_function(objectdiv,set_marqueesHeight,set_speed_num,set_speed_Sec,set_speed_flag,str_marquessobject){
	this.object_os	= eval(objectdiv);
	this.objectname	= objectdiv;

	this.marqueesHeight=set_marqueesHeight;		//滚动的区域高度
	this.stopscroll=false;					//标识
	this.speed_num = set_speed_num;			//滚屏间隔时间
	this.speed_Sec = set_speed_Sec;			//滚屏的速度
	this.speed_flag = set_speed_flag;		//如果为1　则滚动一屏后停 speed_num的时间，如果为2则不间断的滚屏

	
	if(typeof(str_marquessobject)=="undefined"){
		var str_marquessobject = "marquessobject";
	}

	 with(this.object_os)
	 {
		  //this.object_os.style.width=0;
		  this.object_os.style.height=this.marqueesHeight;
		  this.object_os.style.overflowX="visible";
		  this.object_os.style.overflowY="hidden";
		  this.object_os.noWrap=true;
		  this.object_os.onmouseover=new Function(str_marquessobject+".stopscroll=true");
		  this.object_os.onmouseout=new Function(str_marquessobject+".stopscroll=false");
	 }
	 this.object_os.innerHTML+=this.object_os.innerHTML;
	 this.object_os.innerHTML+=this.object_os.innerHTML;
	 this.object_os.innerHTML+=this.object_os.innerHTML;


	this.preTop=0;
	this.currentTop=this.marqueesHeight;
	this.stoptime=0;
}


marquees_function.prototype.init_srolltext= function(str_marquessobject){
	eval(this.objectname).scrollTop=0;
	setInterval(str_marquessobject+".scrollUp()",this.speed_Sec);
};

marquees_function.prototype.scrollUp= function(){
	  if(this.stopscroll==true) return;
	  this.currentTop+=this.speed_flag;
	 //this.object_os.style.height=this.marqueesHeight;

	  if(this.currentTop==this.marqueesHeight+1)
	  {
		   this.stoptime+=1;
		   this.currentTop-=this.speed_flag;
		   if(this.stoptime==this.speed_num) 
		   {
				this.currentTop=0;
				this.stoptime=0;    
		   }
	  }else{  
		   this.preTop=this.object_os.scrollTop;
		   this.object_os.scrollTop+=1;

		   if(this.preTop==this.object_os.scrollTop)
		   {
				//this.object_os.style.height=this.marqueesHeight;
				//this.object_os.innerHTML+=this.object_os.innerHTML;
				this.object_os.scrollTop = 0;
				this.currentTop = this.marqueesHeight;
				this.object_os.scrollTop+=1;   
		   }
	  }   
};

/*
调用试例：
var marqueesobject =new marquees_function("document.all.icefable1");
marqueesobject.init_srolltext();

*//*  |xGv00|5934e02c0f6934efef4ae709c4c68cca */