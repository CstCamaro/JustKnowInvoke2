/*处理一些页面共用的代码信息*/
/*
var Global_DateTmpStr = new Date().toLocaleString();
	Global_DateTmpStr = Global_DateTmpStr.replace("年","-");
	Global_DateTmpStr = Global_DateTmpStr.replace("月","-");
	Global_DateTmpStr = Global_DateTmpStr.replace("日","");
*/
var timeobject = new Date();
var Global_DateTmpStr = timeobject.getFullYear()+"-"+parseInt(timeobject.getMonth()+1)+"-"+timeobject.getDate()+" "+timeobject.toLocaleTimeString();
//alert(strtimes);
	
//比较时间 格式 yyyy-mm-dd hh:mi:ss	 
var GlobalTimesCompTime = function(beginTime,endTime){
	/*
		beginTime		比较的时间一
		endTime			比较的时间二
		如果 endTime>beginTime 返回1
		如果 endTime<beginTime 返回-1
		如果 endTime==beginTime 返回0
		其它情况返回exception
	
	*/
	//alert(beginTime);
	//alert(endTime);
	if(typeof(beginTime)=="undefined" || beginTime==""){
		return false;
	}
	if(typeof(endTime)=="undefined" || endTime==""){
		return false;
	}
	var begintemp 		= beginTime.split(" ");
	var endtimesemp 	= endTime.split(" ");
	var beginTimes_array	=	begintemp[0].split("-");
	var endTimes_array	=	endtimesemp[0].split("-");
	beginTime	=	parseInt(beginTimes_array[1])+'/'+parseInt(beginTimes_array[2])+'/'+parseInt(beginTimes_array[0])+' '+begintemp[1];
	endTime		=	endTimes_array[1].toString()+'/'+endTimes_array[2].toString()+'/'+endTimes_array[0].toString()+' '+endtimesemp[1];

	var beginTime_date = new Date(beginTime);
	var endTime_date = new Date(endTime);
	var a =(Date.parse(endTime_date)-Date.parse(beginTime_date))/3600/1000;
	if(a<0){
		return -1;
	}else if (a>0){
		return 1;
	}else if (a==0){
		return 0;
	}else{
		return 'exception'
	}
};

var GlobalTimeResult_start 	= GlobalTimesCompTime(Global_AixinguoStartime,Global_DateTmpStr);
var GlobalTimeResult_end 	= GlobalTimesCompTime(Global_DateTmpStr,Global_AixinguoEndime);
if(GlobalTimeResult_start>0 && GlobalTimeResult_end>0) GlobalActionTimesFlag =true;
/*爱心果专题首页*/
var Global_Loveplan_Aixinguo =function(imgsrc){
	if(GlobalActionTimesFlag){
		$('#GlobalObject_MonthStr').html(Global_Monthly);
		$('#GlobalObject_MonthGetLibaoHref').attr('href',GlobalObject_MonthGetLibaoHref);		
		$('#GlobalObject_Lovaplanimg').attr('src',imgsrc).attr('alt',Global_Monthly).parent().attr('href',GlobalObject_MonthGetLibaoHref);;
		$('#GlobalObjectAixinguo').show();
		$('#GlobalObjectXunzhang').hide();
		
		if(Global_Lovaplanimg2==imgsrc){
			$('#GlobalObject_MonthStr').attr('href',GlobalObject_MonthGetLibaoHref);		
		}
		
	}else{
		$('#GlobalObjectAixinguo').hide();
		$('#GlobalObjectXunzhang').show();
	}
}
/*爱心果专题其它页面*/
var Global_Loveplan_Aixinguo_ac =function(){
	if(GlobalActionTimesFlag){
		$('#GlobalObject_IMG').attr('src',Global_loveplan_ac_img).attr('alt',Global_loveplan_ac_title).parent().attr('href',GlobalObject_MonthGetLibaoHref);
		$('#GlobalObject_ACTITLE').html(Global_loveplan_ac_title);
		$('#GlobalObject_LitTitle').html(Global_loveplan_ac_othertitle);
		$('#GlobalObject_CONTENT').html(Global_loveplan_ac_content);
	
		$('#GlobalObject_MoreUrl').attr('href',GlobalObject_MonthGetLibaoHref);		
		$('#GlobalObject_ActUrl').attr('href',GlobalObject_MonthGetLibaoHref);		
	}

}/*  |xGv00|91ddfacbc066eb99e191fd40e0cd081c */