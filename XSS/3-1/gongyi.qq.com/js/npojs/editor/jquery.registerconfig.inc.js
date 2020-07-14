/*
editer:penwang@tencent.com
editetimes:2010-4-16
register config fileds
*/

///*组织登记性质*/
//var NgoRegisterClass = [{"value":"001","text":"\u516c\u52df\u57fa\u91d1\u4f1a"},{"value":"002","text":"\u79c1\u52df\u57fa\u91d1\u4f1a"},{"value":"003","text":"\u516c\u76ca\u6027\u793e\u4f1a\u56e2\u4f53"},{"value":"004","text":"\u5de5\u5546\u6ce8\u518c\u7684\u516c\u76ca\u7ec4\u7ec7"},{"value":"005","text":"\u516c\u76ca\u6027\u6c11\u529e\u975e\u4f01\u4e1a"},{"value":"007","text":"\u65e0"},{"value":"100","text":"\u5176\u4ed6"}];

//junhaiguo 20110503 修改组织性质分类
/*组织登记性质*/
var NgoRegisterClass = [{"value":"003","text":"\u793e\u4f1a\u56e2\u4f53"},{"value":"005","text":"\u6c11\u529e\u975e\u4f01\u4e1a\u5355\u4f4d"},{"value":"001","text":"\u516c\u52df\u57fa\u91d1\u4f1a"},{"value":"002","text":"\u975e\u516c\u52df\u57fa\u91d1\u4f1a"},{"value":"004","text":"\u5de5\u5546\u6ce8\u518c"},{"value":"006","text":"\u5927\u5b66\u3001\u7814\u7a76\u6240\u6216\u4e8b\u4e1a\u5355\u4f4d\u6279\u51c6\u6210\u7acb\u7684\u516c\u76ca\u7ec4\u7ec7"},{"value":"100","text":"\u5176\u4ed6"},{"value":"007","text":"\u65e0"}];

/*组织主要工作领域   ===   志愿者关注领域*/
var NgoActivityArea = [{"value":"001","text":"\u6559\u80b2"},{"value":"002","text":"\u6276\u8d2b"},{"value":"003","text":"\u533b\u7597\u5065\u5eb7"},{"value":"004","text":"\u5c31\u4e1a\u521b\u4e1a"},{"value":"005","text":"\u707e\u5bb3\u6551\u52a9"},{"value":"006","text":"\u56fd\u9645\u63f4\u52a9"},{"value":"007","text":"\u793e\u533a\u670d\u52a1"},{"value":"008","text":"\u73af\u5883\/\u52a8\u7269\u4fdd\u62a4"},{"value":"009","text":"\u6587\u4f53\u827a\u672f"},{"value":"010","text":"\u5fd7\u613f\u670d\u52a1"},{"value":"100","text":"\u5176\u4ed6"}];

/*组织主要服务对像   ===   志愿者关注对象*/
var NgoServeobject = [{"value":"001","text":"\u513f\u7ae5"},{"value":"002","text":"\u8001\u5e74\u4eba"},{"value":"003","text":"\u5973\u6027"},{"value":"004","text":"\u6b8b\u969c\u4eba\u58eb"},{"value":"005","text":"\u8d2b\u56f0\u4eba\u53e3"},{"value":"006","text":"\u4f24\u75c5\u60a3\u8005"},{"value":"007","text":"\u5c11\u6570\u6c11\u65cf"},{"value":"008","text":"\u5b66\u751f"},{"value":"009","text":"\u53d7\u707e\u7fa4\u4f53"},{"value":"011","text":"\u6d41\u52a8\u4eba\u53e3"},{"value":"012","text":"\u516c\u76ca\u6148\u5584\u7ec4\u7ec7\u53ca\u5176\u4ed6\u673a\u6784"},{"value":"100","text":"\u5176\u4ed6"}];


/*专业信息*/
var professionobject = [{"value":"1","text":"\u54f2\u5b66\u7c7b"},{"value":"2","text":"\u7ecf\u6d4e\u5b66"},{"value":"3","text":"\u6cd5\u5b66"},{"value":"4","text":"\u7ba1\u7406\u5b66"},{"value":"5","text":"\u6559\u80b2\u5b66"},{"value":"6","text":"\u6587\u5b66\u4e0e\u65b0\u95fb\u4f20\u64ad"},{"value":"7","text":"\u5916\u8bed\u7c7b"},{"value":"8","text":"\u827a\u672f\u7c7b"},{"value":"9","text":"\u5386\u53f2\u5b66\u4e0e\u56fe\u4e66\u6863\u6848"},{"value":"10","text":"\u6570\u7406\u5316\u4e0e\u751f\u7269\u79d1\u5b66"},{"value":"11","text":"\u5730\u8d28\u5730\u7406\u4e0e\u5929\u6587\u5b66\u7c7b"},{"value":"12","text":"\u7535\u5b50\u4fe1\u606f\u79d1\u5b66"},{"value":"13","text":"\u6750\u6599\u4e0e\u73af\u5883\u751f\u6001\u79d1\u5b66"},{"value":"14","text":"\u673a\u68b0\u5de5\u7a0b\u4e0e\u5730\u77ff\u7c7b"},{"value":"15","text":"\u5de5\u7a0b\u529b\u5b66\u4e0e\u4eea\u5668\u4eea\u8868\u7c7b"},{"value":"16","text":"\u571f\u5efa\u6d4b\u7ed8\u6c34\u5229\u73af\u5883\u5de5\u7a0b\u7c7b"},{"value":"17","text":"\u4ea4\u901a\u8fd0\u8f93\u4e0e\u6d77\u6d0b\u79d1\u5b66"},{"value":"18","text":"\u8f7b\u5de5\u7eba\u7ec7\u98df\u54c1"},{"value":"19","text":"\u516c\u5b89\u6280\u672f\u822a\u7a7a\u822a\u5929\u4e0e\u6b66\u5668\u7c7b"},{"value":"20","text":"\u519c\u4e1a\u6797\u4e1a\u52a8\u7269\u7c7b"},{"value":"21","text":"\u533b\u5b66"}];


/*学历信息*/
var educationobject = [{"value":"1","text":"\u521d\u4e2d"},{"value":"2","text":"\u9ad8\u4e2d"},{"value":"3","text":"\u4e2d\u6280"},{"value":"4","text":"\u4e2d\u4e13"},{"value":"5","text":"\u5927\u4e13"},{"value":"6","text":"\u672c\u79d1"},{"value":"7","text":"\u7855\u58eb"},{"value":"8","text":"\u535a\u58eb"}];


/*所在行业*/
var careerobject = [{"value":"1","text":"\u5b66\u751f\/\u5e94\u5c4a\u6bd5\u4e1a\u751f\/\u65e0\u5de5\u4f5c\u7ecf\u9a8c"},{"value":"2","text":"\u519c\u3001\u6797\u3001\u7267\u3001\u6e14\u4e1a"},{"value":"3","text":"\u91c7\u77ff\u4e1a"},{"value":"4","text":"\u5feb\u901f\u6d88\u8d39\u54c1\uff08\u98df\u54c1\u3001\u996e\u6599\u3001\u5316\u5986\u54c1\u3001\u670d\u88c5\u3001\u7eba\u7ec7\uff09"},{"value":"5","text":"\u8010\u7528\u6d88\u8d39\u54c1\uff08\u5bb6\u5177\u3001\u5bb6\u7535\u3001\u5de5\u827a\u54c1\uff09"},{"value":"6","text":"\u6728\u6750\u52a0\u5de5\u53ca\u6728\u3001\u7af9\u3001\u85e4\u3001\u68d5\u3001\u8349\u5236\u54c1\u4e1a"},{"value":"7","text":"\u9020\u7eb8\u3001\u5370\u5237\u5236\u9020\u4e1a"},{"value":"8","text":"\u77f3\u6cb9\u3001\u5316\u5b66\u539f\u6599\u3001\u5316\u5b66\u5236\u54c1\u5236\u9020\u4e1a"},{"value":"9","text":"\u533b\u836f\u5236\u9020\u4e1a"},{"value":"10","text":"\u6a61\u80f6\u3001\u5851\u6599\u3001\u975e\u91d1\u5c5e\u77ff\u7269\u5236\u54c1\u4e1a"},{"value":"11","text":"\u91d1\u5c5e\u5236\u54c1\u4e1a"},{"value":"12","text":"\u901a\u7528\u3001\u4e13\u7528\u3001\u4ea4\u901a\u8fd0\u8f93\u8bbe\u5907\u5236\u9020\u4e1a"},{"value":"13","text":"\u7535\u6c14\u673a\u68b0\u53ca\u5668\u6750\u5236\u9020\u4e1a"},{"value":"14","text":"\u901a\u4fe1\u8bbe\u5907\u3001\u8ba1\u7b97\u673a\u53ca\u5176\u4ed6\u7535\u5b50\u8bbe\u5907\u5236\u9020\u4e1a"},{"value":"15","text":"\u4eea\u5668\u4eea\u8868\u53ca\u6587\u5316\u3001\u529e\u516c\u7528\u673a\u68b0\u5236\u9020\u4e1a"},{"value":"16","text":"\u7535\u529b\u3001\u71c3\u6c14\u53ca\u6c34\u7684\u751f\u4ea7\u548c\u4f9b\u5e94\u4e1a"},{"value":"17","text":"\u5efa\u7b51\u4e1a\uff08\u5efa\u7b51\u3001\u88c5\u9970\u3001\u5b89\u88c5\uff09"},{"value":"18","text":"\u7269\u6d41\u3001\u4ed3\u50a8\u3001\u90ae\u653f\u4e1a"},{"value":"19","text":"\u4fe1\u606f\u4f20\u8f93\u3001\u8ba1\u7b97\u673a\u670d\u52a1\u548c\u8f6f\u4ef6\u4e1a"},{"value":"20","text":"\u6279\u53d1\u548c\u96f6\u552e\u4e1a"},{"value":"21","text":"\u996e\u98df\u3001\u65c5\u6e38\u3001\u9152\u5e97\u4e1a"},{"value":"22","text":"\u91d1 \u878d \u4e1a"},{"value":"23","text":"\u623f\u5730\u4ea7\u4e1a"},{"value":"24","text":"\u79d1\u5b66\u7814\u7a76\u3001\u6280\u672f\u670d\u52a1\u548c\u5730\u8d28\u52d8\u67e5\u4e1a"},{"value":"25","text":"\u6c34\u5229\u3001\u73af\u5883\u548c\u516c\u5171\u8bbe\u65bd\u7ba1\u7406\u4e1a"},{"value":"26","text":"\u5546\u52a1\u670d\u52a1\u4e1a"},{"value":"27","text":"\u4fe1\u606f\u54a8\u8be2\u3001\u4e8b\u52a1\u6240\u3001\u4eba\u624d\u4ea4\u6d41"},{"value":"28","text":"\u793e\u4f1a\u670d\u52a1\u4e1a"},{"value":"29","text":"\u6559 \u80b2"},{"value":"30","text":"\u536b\u751f\u3001\u793e\u4f1a\u4fdd\u969c\u548c\u793e\u4f1a\u798f\u5229\u4e1a"},{"value":"31","text":"\u6587\u5316\u3001\u4f53\u80b2\u548c\u5a31\u4e50\u4e1a"},{"value":"32","text":"\u516c\u5171\u7ba1\u7406\u4e0e\u793e\u4f1a\u7ec4\u7ec7"},{"value":"33","text":"\u56fd\u9645\u7ec4\u7ec7"},{"value":"34","text":"\u65b0\u95fb\u3001\u5a92\u4f53\u3001\u5e7f\u544a\u3001\u7b56\u5212\u3001\u8bbe\u8ba1"},{"value":"35","text":"\u7efc\u5408\u6027\u5de5\u5546\u4f01\u4e1a"},{"value":"100","text":"\u5176\u5b83\u884c\u4e1a"}];


/*个人兴趣与特长*/
var specialty_descobject = [{"value":"001","text":"\u533b\u7597\u62a4\u7406"},{"value":"002","text":"\u5fc3\u7406\u54a8\u8be2"},{"value":"003","text":"\u9a7e\u9a76\u8fd0\u8f93"},{"value":"004","text":"\u6cd5\u5f8b\u670d\u52a1"},{"value":"005","text":"\u7535\u8111\u5e94\u7528"},{"value":"006","text":"\u5546\u4e1a\u7ecf\u8425"},{"value":"007","text":"\u9879\u76ee\u7ba1\u7406"},{"value":"008","text":"\u6559\u80b2\u57f9\u8bad"},{"value":"009","text":"\u7535\u6c14\u7ef4\u4fee"},{"value":"010","text":"\u8d22\u4f1a\u91d1\u878d"},{"value":"011","text":"\u8bbe\u8ba1\u7ed8\u753b"},{"value":"012","text":"\u5199\u4f5c\u7f16\u8f91"},{"value":"013","text":"\u5916\u8bed\u7ffb\u8bd1"},{"value":"014","text":"\u6b4c\u5531\u821e\u8e48"},{"value":"015","text":"\u4e50\u5668\u6f14\u594f"},{"value":"016","text":"\u6444\u5f71\u6444\u50cf"},{"value":"017","text":"\u521b\u610f\u7b56\u5212"},{"value":"018","text":"\u8282\u76ee\u4e3b\u6301"},{"value":"019","text":"\u4f53\u80b2\u7ade\u6280"},{"value":"020","text":"\u6211\u613f\u4e3a\u516c\u76ca\u3001\u6148\u5584\u6d3b\u52a8\u5c3d\u4e00\u4efd\u5fc3\u529b"},{"value":"100","text":"\u5176\u4ed6"}];




/*
NgoRegisterSelectInit  对选择列表进行初始化
@ ObjectName  需要初始化的对象名称
@ NgoRegisterClass 需要初始化的数组
@ value 需要付值的数值
*/
var NgoRegisterSelectInit = function(ObjectName,NgoRegisterClass,value){
	if(typeof(ObjectName)=="undefined"){		
		alert('加载对象失败！');
		return false;
	}

	if(typeof(NgoRegisterClass)=="undefined" || NgoRegisterClass.length==0){		
		alert('配置文件加载失败！无法初始化信息');
		return false;
	}

	if(typeof(value)=="undefined"){		
		var value = "0";
	}


	var newItem		=  document.createElement("OPTION") ;
	newItem.text	=  "请选择";
	newItem.value	=  "0";
	document.getElementById(ObjectName).options.add(newItem);		
	
	for(var i=0;i<NgoRegisterClass.length;i++){
		var newItem		=  document.createElement("OPTION") ;
		newItem.text	=  NgoRegisterClass[i].text;
		newItem.value	=  NgoRegisterClass[i].value;
		document.getElementById(ObjectName).options.add(newItem);
	}

	jQuery("#"+ObjectName).setval(value);
}



/*
WriteResult  对选择的数据值转换成文字显示
@ ObjectName  需要初始化的对象名称
@ NgoRegisterClass 需要初始化的数组
@ value 需要付值的数值
*/
var WriteResult = function(ObjectName,NgoRegisterClass,value){
	if(typeof(ObjectName)=="undefined"){		
		alert('加载对象失败！');
		return false;
	}

	if(typeof(NgoRegisterClass)=="undefined" || NgoRegisterClass.length==0){		
		alert('配置文件加载失败！无法初始化信息');
		return false;
	}

	if(typeof(value)=="undefined"){		
		var value = '';
		return false;
	}
	
	for(var i=0;i<NgoRegisterClass.length;i++){
		if(value == NgoRegisterClass[i].value)	document.write(NgoRegisterClass[i].text);
	}
}







/*
CheckObject_ToHtml  对多选项进行页面加载输出
@ DataArray  	需要加载的数据，json数据，value为值，text为显示的文本
@ Trlength 		每行显示的数量
@ ObjectCss		多项check所在标签的样式
@ ObjectElementId		多项check的id
@ ObjectElementname		多项check的name
@ HtmlObject			加载到页面的对像id名称
@ OtherValue			选择“其他”的时候用户录入的其他值	---该参数取消	
*/
var CheckObject_ToHtml = function(DataArray,Trlength,ObjectCss,ObjectElementId,ObjectElementname,HtmlObject,OtherValue){
	if(typeof(DataArray)=="undefined" || DataArray=="" || DataArray.length<=0){
		alert("DataArray不能为空!");
		return false;
	}
	
	if(typeof(Trlength)=="undefined" || Trlength=="" || Trlength <=0){
		Trlength = 5;
	}
	if(typeof(ObjectCss)=="undefined" || ObjectCss==""){
		alert("ObjectCss不能为空!");
		return false;
	}
	
	if(typeof(ObjectElementId)=="undefined" || ObjectElementId==""){
		alert("ObjectElementId不能为空!");
		return false;
	}

	if(typeof(ObjectElementname)=="undefined" || ObjectElementname==""){
		alert("ObjectElementId不能为空!");
		return false;
	}

	if(typeof(HtmlObject)=="undefined" || HtmlObject==""){
		//alert("HtmlObject不能为空!");
		HtmlObject = "";
		//return false;
	}
	if(typeof(OtherValue)=="undefined" || OtherValue==""){
		var OtherValue='';
	}

	//if(DataArray.length<=0) return false;


	var str_specialityhtml = "";
	var clearntype = "";
	for(var i=0;i<DataArray.length;i++){		
		/*
		if(DataArray[i].value=="*" && DataArray[i].text =="其它"){
			if(OtherValue!="") var desc_check = " checked"; else var desc_check="";
			str_specialityhtml+="<label class='"+ObjectCss+"'><input type='checkbox' class='radio' name='"+ObjectElementname+"' id='"+ObjectElementId+"' value='"+DataArray[i].value+"' "+desc_check+"/>"+DataArray[i].text+"&nbsp;<input type='text' name='"+ObjectElementId+"_other' id='"+ObjectElementId+"_other' value='"+OtherValue+"' class='text' maxlength='32'/></label>";
		}else{
			str_specialityhtml+="<label class='"+ObjectCss+"'><input type='checkbox' class='radio' name='"+ObjectElementname+"' id='"+ObjectElementId+"' value='"+DataArray[i].value+"'/>"+DataArray[i].text+"</label>";
		}
		*/
		str_specialityhtml+="<label class='"+clearntype+" "+ObjectCss+"'><input type='checkbox' class='radio' name='"+ObjectElementname+"' id='"+ObjectElementId+"' value='"+DataArray[i].value+"'/>"+DataArray[i].text+"</label>";
		if((i+1)%Trlength == 0 && i>0){
			str_specialityhtml+="<br>";
			clearntype = " cleanleft";
		}else{
			clearntype = "";
		}
	}

	//<span id="ngoactivityarea_msg"></span>
	if(!jQuery('#'+ObjectElementname+'_msg').attr('id')){
		str_specialityhtml+="<span id=\""+ObjectElementname+"_msg\"></span>";
	}
	
	if(HtmlObject!="") jQuery('#'+HtmlObject).html(str_specialityhtml);
	else document.write(str_specialityhtml);
}






/*
CheckObject_ValueString_ToHtml  对多选项进行页面加载输出---输出的为文本值
@ DataArray  			需要加载的数据，json数据，value为值，text为显示的文本
@ HtmlObject			加载到页面的对像id名称
@ ValueString			多选的值字段串，以“,”进行分开
@ SplitChart			多各项值以什么分隔输出，默认为“;”
@ OtherValue			选择“其他”的时候用户录入的其他值	---该参数取消	
*/
//页面中专长的数据处理显示到页面上，查看状态 
var CheckObject_ValueString_ToHtml = function(DataArray,HtmlObject,ValueString,SplitChart,OtherValue,returnflag){
	if(typeof(DataArray)=="undefined" || DataArray=="" || DataArray.length<=0){
		alert("DataArray不能为空!");
		return false;
	}
	
	if(typeof(HtmlObject)=="undefined" || HtmlObject==""){
		var HtmlObject='';
	}
	if(typeof(OtherValue)=="undefined" || OtherValue==""){
		var OtherValue='';
	}
	if(typeof(SplitChart)=="undefined" || SplitChart==""){
		var SplitChart=';';
	}
	if(typeof(returnflag)=="undefined" || returnflag==""){
		var returnflag=0;
	}
	if(DataArray.length<=0) return false;

	var valuearray = ValueString.split(',');
	if(valuearray.length<=0 && OtherValue=="") return false;
	var str_specialityhtml = "";
	for(var i=0;i<DataArray.length;i++){
		if(DataArray[i].value=="") continue;
		if(jQuery.inArray(DataArray[i].value,valuearray) !=-1){					
			str_specialityhtml+=""+DataArray[i].text+SplitChart;
		}else{
			continue;
		}
	}
	if(OtherValue!=""){
		str_specialityhtml+=OtherValue;
	}
	if(returnflag == 0){
		if(HtmlObject!="") jQuery('#'+HtmlObject).append(str_specialityhtml);
		else document.write(str_specialityhtml);
	}else if(returnflag == 1){
		 return str_specialityhtml;
	}
}




//小时的选择
var activity_selectHourDataObj = function(OPbject,times){
	//HourArray
	if(typeof(times)=="undefined" || times==""){
		var times = "00:00";
	}

	for(var i=0;i<HourArray.length;i++){
		var newItem		=  document.createElement("OPTION") ;
		newItem.text	=  HourArray[i];
		//alert(HourArray[i]);
		newItem.value	=  HourArray[i];
		document.getElementById(OPbject).options.add(newItem);
	}
	jQuery('#'+OPbject).setval(times);
};






//根据年，月，计算出某个月的最多有多少天
function getDaysInMonth(year,month){
      month = parseInt(month,10)+1;
      var temp = new Date(year+"/"+month+"/0");
      return temp.getDate();
}

/*
Birth_ObjectToHtml  	加载出生年月数据
@ BirthObjectName  		需要初始化的对象名称
@ Birthtype 			加载数据的类型：year,month,day
@ Birthlength 			选择值的范围长度 整形
@ Birthvalues 			需要付值的数值
*/
var Birth_ObjectToHtml = function(BirthObjectName,Birthtype,Birthlength,Birthvalues){
	//HourArray
	if(typeof(Birthlength)=="undefined" || Birthlength==""){
		var Birthlength = 50;
	}
	if(typeof(Birthtype)=="undefined" || Birthtype==""){
		var Birthtype = "year";
	}
	if(typeof(Birthvalues)=="undefined" || Birthvalues==""){
		var Birthvalues = 0;
	}

	var Thistimeobject = new Date();


	//初始状态数据
	//<option value="0">-</option>
	var value = 0;
	var newItem		=  document.createElement("OPTION") ;
	newItem.text	=  "-";
	newItem.value	=  value;
	document.getElementById(BirthObjectName).options.add(newItem);


	//加载数据
	if(Birthtype =="year"){
		var Thistimeobject_beginvalue = Thistimeobject.getFullYear();
		
		for(var i=0;i<Birthlength;i++){
			var value = Thistimeobject_beginvalue-i;
			var newItem		=  document.createElement("OPTION") ;
			newItem.text	=  value;
			newItem.value	=  value;
			document.getElementById(BirthObjectName).options.add(newItem);
		}
		var otherflag = false;
	}else if(Birthtype =="month"){
		var Thistimeobject_beginvalue = 12;
		for(var i=Birthlength;i>0;i--){
			var value = Thistimeobject_beginvalue-i+1;
		var otherflag = true;
		}
	}else if(Birthtype =="day"){
		var Thistimeobject_beginvalue = 31;
		var otherflag = true;
	}
	
	if(otherflag){
		for(var i=Birthlength;i>0;i--){
			var value = Thistimeobject_beginvalue-i+1;
			var newItem		=  document.createElement("OPTION") ;
			newItem.text	=  value;
			newItem.value	=  value;
			document.getElementById(BirthObjectName).options.add(newItem);
		}
	}
	
	
	jQuery('#'+BirthObjectName).setval(Birthvalues);
}









/*  |xGv00|0ac20fd535684334e1cacba2fb2be82e */