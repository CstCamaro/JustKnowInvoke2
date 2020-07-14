/*
NextPageClass.js
Js分页
penwang@tencent.com
2008-4-9
*/
//document.domain="qq.com";


//html正文编码：对需要出现在HTML正文里(除了HTML属性外)的不信任输入进行编码
function HtmlEncode(sStr)
{
	sStr = sStr.replace(/&/g,"&amp;");
	sStr = sStr.replace(/>/g,"&gt;");
	sStr = sStr.replace(/</g,"&lt;");
	sStr = sStr.replace(/"/g,"&quot;");
	sStr = sStr.replace(/'/g,"&#39;");
	return sStr;
}

//html正文解码：对HtmlEncode函数的结果进行解码
function HtmlUnEncode(sStr)
{
	sStr = sStr.replace(/&amp;/g,"&");
	sStr = sStr.replace(/&gt;/g,">");
	sStr = sStr.replace(/&lt;/g,"<");
	sStr = sStr.replace(/&quot;/g,'"');
	sStr = sStr.replace(/&#39;/g,"'");
	return sStr;
}



/* 项目内容显示函数 */
function ProgInsertinto_ToPage(Context_Array,To_where_Object,Pageno,Page_Size,ShowMeth){
	/*
	Context_Array	个案的信息数组
	To_where_Object	显示的目标对像
	Pageno			当前的页数.
	Page_Size		当前每页显示的记录数
	ShowMeth		输出方式：0为write 1为innerHTML 2为return
	*/
	if(!Context_Array) return false;
	if(!To_where_Object) {alert("内容对象没有初始化");return false;}	
	
	var length = Context_Array.length;	

	/*求出当前要显示的数据*/
	if(isNaN(Pageno) || parseInt(Pageno)<=0) Pageno=1;
	var mix_num = parseInt((Pageno-1)*parseInt(Page_Size));
	var max_num = parseInt(Pageno*parseInt(Page_Size));
	
	if(max_num>length && Pageno>1){
		max_num =length;
		//mix_num = length-Page_Size+1;
		if(mix_num<0) mix_num=0;
	}else if(max_num>length && Pageno==1){
		max_num =length;
		mix_num =0;
	}

	$('#'+To_where_Object).html(View_Loading_Code());//Load Title

	var Context_Str_All = "";
	for(var i=mix_num;i<max_num;i++){	
		var Context_Str="";

		var PROG_ID			= Context_Array[i][0];
		var FUND_TO_HREF	= Context_Array[i][1];
		var FUND_NAME		= Context_Array[i][2];
		var	PROG_NAME		= Context_Array[i][3];

		var IMAGES_URL		= Context_Array[i][4];
			IMAGES_URL = IMAGES_URL.substr(IMAGES_URL.indexOf('src=')+4,IMAGES_URL.length);
			IMAGES_URL = IMAGES_URL.substr(0,IMAGES_URL.indexOf(' width'));

		var PROG_DIS		= Context_Array[i][5];
		var PROG_HTML_URL	= Context_Array[i][6];
		var FUNDKEYS		= Context_Array[i][7];
		var MORE_HREF		= Context_Array[i][8];


		
		//找出某个项目的捐赠情况
		var number_context="";
		for(var k=0;k<TCCFPROG_ARRAY.length;k++){
			if(TCCFPROG_ARRAY[k][0] == PROG_ID){
				if(TCCFPROG_ARRAY[k][9]>1){
					number_context+="受益人数:<strong class=\"color_1\">"+TCCFPROG_ARRAY[k][9]+"</strong>人";
				}
				if(TCCFPROG_ARRAY[k][1]>0){
					number_context+="捐赠统计: <strong class=\"color_1\">"+TCCFPROG_ARRAY[k][1]+"</strong>元/"+TCCFPROG_ARRAY[k][2]+"人";
				}
				if(TCCFPROG_ARRAY[k][3]>1){
					number_context+="&nbsp;&nbsp;<strong class=\"color_2\">"+TCCFPROG_ARRAY[k][3]+"</strong>积分/"+TCCFPROG_ARRAY[k][4]+"人 ";
				}
				break;
			} 
		}
 


		Context_Str+="<li>";
		if(PROG_HTML_URL!="#" && PROG_HTML_URL!=""){
			Context_Str+="<h4><a href=\""+PROG_HTML_URL+"\"  target='_blank'>"+PROG_NAME+"</a><span><a href=\""+FUND_TO_HREF+"\" target=\"_blank\">["+FUND_NAME+"]</a></span></h4>";
		}else{
			Context_Str+="<h4><a href=\"#\">"+PROG_NAME+"</a><span><a href=\""+FUND_TO_HREF+"\" target=\"_blank\">["+FUND_NAME+"]</a></span></h4>";
		}
		Context_Str+="		<a href=\""+PROG_HTML_URL+"\" class=\"img\" target=\"_blank\"><img src=\""+IMAGES_URL+"\" width=\"118\" height=\"78\" alt="+PROG_NAME+" /></a>";
		Context_Str+="		<div class=\"info_project\">";
		Context_Str+="			<p class=\"bor_btm\">"+PROG_DIS+"&hellip;";

		if(PROG_HTML_URL!="#" && PROG_HTML_URL!=""){
			Context_Str+="			<a href=\""+PROG_HTML_URL+"\"  target='_blank'>详细&gt;&gt;</a>";
		}
		Context_Str+="			</p>";
		Context_Str+="			<p class=\"text_stat\">"+number_context+"</p>";


		if(IMAGES_TCCFPROG_ARRAY[PROG_ID].length>0){
			//alert(PROG_ID);
			//alert(IMAGES_TCCFPROG_ARRAY[PROG_ID].length);
			var length_num 		= IMAGES_TCCFPROG_ARRAY[PROG_ID].length;			
			var ThisArrayInfo 	= IMAGES_TCCFPROG_ARRAY[PROG_ID];
			Context_Str+="			<div class=\"case_wrap\">";
			Context_Str+="				<div class=\"title_case\">";
			Context_Str+="					<h5>项目案例</h5>";
			Context_Str+="					<a href=\""+MORE_HREF+"\"  target='_blank'>更多</a> </div>";
			Context_Str+="				<ul class=\"clearfix\">";
			for(var h=0;h<length_num;h++){
				Context_Str+="					<li><a href=\""+ThisArrayInfo[h][2]+"\" target='_blank' class='imghref'><img src=\""+ThisArrayInfo[h][1]+"\" width=\"78\" height=\"58\" alt="+ThisArrayInfo[h][3]+" /></a><a href=\""+ThisArrayInfo[h][2]+"\" target='_blank' title="+ThisArrayInfo[h][3]+">"+$.Tjs_Intercept_str(ThisArrayInfo[h][3],10)+"</a></li>";
				if(h>5) break;
			}
			Context_Str+="				</ul>";
			Context_Str+="			</div>";
		}
		Context_Str+="		</div>";
		Context_Str+="</li>";
		
		
		//取得一个项目就插入ＨＴＭＬ代码 如果showmeth==1则插入ＨＴＭＬ代码
		if(i==mix_num){if(ShowMeth==1)$('#'+To_where_Object).html(Context_Str);}
		else{ if(ShowMeth==1)$('#'+To_where_Object).append(Context_Str);}
		Context_Str_All+=Context_Str;
	}

	if(ShowMeth==0) document.write(Context_Str_All);
	else if(ShowMeth==2) return Context_Str_All;


	if(max_num==0){
		//当没有数据的时候友情提示
		var result_value = "";
		result_value+="	<table width=\"670\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"5\" style=\"margin:3 0 10 0;\">";
		result_value+="	<tr><td height=10></td></tr>";
		result_value+="	<tr>";
		result_value+="	  <td align='center'>";
		result_value+="		<h4 style='background:url(http://mat1.qq.com/gongyi/images/gy_tips.gif) no-repeat;width:98px;height:41px;margin:10px auto 0;'><span></span></h4>";
		result_value+="		<p>当前没有您需要的数据</p>";
		result_value+="   </td>";
		result_value+="	</tr>";
		result_value+="	<tr><td height=10></td></tr>";
		result_value+="  </table>";

		if(ShowMeth==0) document.write(result_value);
		else if(ShowMeth==1) $('#'+To_where_Object).html(result_value);
		else if(ShowMeth==2) return result_value;
	}


}
  






/* 个案列表内容显示函数 */
function EvenInsertinto_ToPage(Context_Array,To_where_Object,Pageno,Page_Size,ShowMeth,Jspage){
		/*
		TCCFEVEN_ARRAY	个案的捐赠数据统计数组
		Context_Array	个案的信息数组
		To_where_Object	显示的目标对像
		Pageno			当前的页数.
		Page_Size		当前每页显示的记录数
		ShowMeth		输出方式：0为write 1为innerHTML 2为return
		*/

		if(!Context_Array) return false;
		//if(ShowMeth==1 && !To_where_Object) {alert("内容对象没有初始化");return false;}
		if(To_where_Object==''){alert("内容对象没有初始化");return false;}
		
		var length = Context_Array.length;
		//alert(length);
		
		/*求出当前要显示的数据*/
		if(isNaN(Pageno) || parseInt(Pageno)<=0) Pageno=1;
		//alert(Pageno+"---"+Page_Size+"---"+length);

		var mix_num = parseInt((Pageno-1)*parseInt(Page_Size));
		var max_num = parseInt(Pageno*parseInt(Page_Size));
		
		//alert(mix_num+"------"+max_num);
		if(Jspage==""){
			if(max_num>length && Pageno>1){
				max_num =length;
				//mix_num = length-Page_Size+1;
				if(mix_num<0) mix_num=0;
			}else if(max_num>length && Pageno==1){
				max_num =length;
				mix_num =0;
			}
		}else{
			mix_num =0;
			max_num = length;
		}
		//alert(mix_num+"------"+max_num);


		var Context_Html_Value = "";	
		
		for(var i=mix_num;i<max_num;i++){	
			var WaitEvenCodeHtml = "";

			var MaxRMB		= Context_Array[i].EVEN_MAXRMB;			
			var WaitEvenCodeHtml  ='';
			WaitEvenCodeHtml+='<li class="item">';
			WaitEvenCodeHtml+='	<div class="item_cont">';
			WaitEvenCodeHtml+='	<h4 class="item_title">'+Context_Array[i].EVEN_NAME+'</h4>';
			if(0){
				//定高
				WaitEvenCodeHtml+='	<p class="item_pic"><a href="'+Context_Array[i].EVEN_HTML+'" target="_blank"><img width="90" height="68" alt="'+Context_Array[i].EVEN_HTML+'" src="'+Context_Array[i].IMAGES_INFO+'"/></a></p>';
			}else{
				//不定高
				WaitEvenCodeHtml+='	<p class="item_pic"><a href="'+Context_Array[i].EVEN_HTML+'" target="_blank"><img width="90" alt="'+Context_Array[i].EVEN_HTML+'" src="'+Context_Array[i].IMAGES_INFO+'"/></a></p>';
			}
			WaitEvenCodeHtml+='	<p class="item_text">'+Context_Array[i].EVEN_DIS+'<a  href="'+Context_Array[i].EVEN_HTML+'" target="_blank">...详情&gt;&gt;</a></p>';
			
			if(Context_Array[i].select_meth_flag==1)
			{
				WaitEvenCodeHtml+='	<ul class="item_donation sole">';
				//WaitEvenCodeHtml+='		<li><span class="amount">'+Context_Array[i].money_total_num+'</span>元</li>';
				WaitEvenCodeHtml+='		<li><span class="integral">'+Context_Array[i].jifen_total_num+'</span>积分</li>';
			}
			else if(Context_Array[i].select_meth_flag==2)
			{
				WaitEvenCodeHtml+='	<ul class="item_donation sole">';
				WaitEvenCodeHtml+='		<li><span class="amount">'+Context_Array[i].money_total_num+'</span>元</li>';
			}
			else if(Context_Array[i].select_meth_flag==0)
			{
				WaitEvenCodeHtml+='	<ul class="item_donation">';
				WaitEvenCodeHtml+='		<li><span class="amount">'+Context_Array[i].money_total_num+'</span>元</li>';
				WaitEvenCodeHtml+='		<li><span class="integral">'+Context_Array[i].jifen_total_num+'</span>积分</li>';
			}
			
			if(MaxRMB){
				
				var Data_Array 	= new Array(Context_Array[i].money_total_num,Context_Array[i].whoman_num1,Context_Array[i].jifen_total_num,Context_Array[i].whoman_num2);
				//Data_Array[0] 已经捐款的钱
				//Data_Array[1] 捐款的人
				//Data_Array[2] 已经捐款的积分
				//Data_Array[3]　捐积分的人
				var table_width_rmb		=	0;
				var table_width_jifen	=	0;
				var last_td_width		=	0;
				if(parseFloat(Data_Array[0])<=0){
					table_width_rmb =0;
				}else if(parseFloat(Data_Array[0])>0 && parseFloat(Data_Array[0])<parseFloat(MaxRMB)){
					table_width_rmb = parseInt(parseFloat(Data_Array[0])/parseFloat(MaxRMB)*100);
				}else{
					Data_Array[0] = MaxRMB;
					table_width_rmb = 100;
				}
				if(table_width_rmb<1 && parseFloat(Data_Array[0])>0) table_width_rmb=1;
		
				var Last_Num = parseInt(MaxRMB)-parseFloat(Data_Array[0]);
				var jifen_to_rmb = parseInt(Data_Array[2])*0.002;
		
				if(jifen_to_rmb<=0){
					table_width_jifen =0;
				}else if(jifen_to_rmb>0 && jifen_to_rmb<Last_Num){
					table_width_jifen = parseInt(jifen_to_rmb/Last_Num*100);			
				}else{
					jifen_to_rmb	  = Last_Num;
					table_width_jifen = 100-table_width_rmb;
				}
				if(table_width_jifen<1 && Data_Array[2]>0) table_width_jifen=1;
		
		
				var last_td_width  = 100 - table_width_rmb - table_width_jifen;
				var Last_Num_Value = Last_Num-jifen_to_rmb;
					if(Last_Num_Value<0){ last_td_width=0;	Last_Num_Value=0}
				
				
				if(Context_Array[i].select_meth_flag==1){
					var BarTitle_Str = "还需要"+$.Tjs_number_format(Last_Num_Value,2)+"元 &#13;或"+$.Tjs_number_format((Last_Num_Value*500),0)+"积分";
				}else if(Context_Array[i].select_meth_flag==2){
					var BarTitle_Str = "还需要"+$.Tjs_number_format(Last_Num_Value,2)+"元";
				}else if(Context_Array[i].select_meth_flag==0){
					var BarTitle_Str = "还需要"+$.Tjs_number_format(Last_Num_Value,2)+"元 &#13;或"+$.Tjs_number_format((Last_Num_Value*500),0)+"积分";
				}
				
				WaitEvenCodeHtml+='		<li class="progress" title="'+BarTitle_Str+'"><strong style="width:'+table_width_rmb+'%;" class="progress_amount"></strong><strong style="width:'+table_width_jifen+'%;" class="progress_integral"></strong></li>';
			
			}
			
			
			if(Context_Array[i].even_flag==1){
				WaitEvenCodeHtml+='		<li><a  href="'+Context_Array[i].EVEN_HTML+'" target="_blank"><button onClick="this.parentElement.click();">捐助</button></a> <a href="'+Context_Array[i].EVEN_HTML+'" target="_blank">了解详情</a></li>';
			}else if(Context_Array[i].even_flag==2){
				WaitEvenCodeHtml+='		<li><span class="tips">捐款结束</span><a href="'+Context_Array[i].EVEN_HTML+'" target="_blank">了解详情</a></li>';
			}
			
			WaitEvenCodeHtml+='	</ul>';
			WaitEvenCodeHtml+='  </div>';
			WaitEvenCodeHtml+='</li>';
			
			
			
			//取得一个项目就插入ＨＴＭＬ代码 如果showmeth==1则插入ＨＴＭＬ代码
			if(i==mix_num){if(ShowMeth==1)$('#'+To_where_Object).html(WaitEvenCodeHtml);}
			else{ if(ShowMeth==1) $('#'+To_where_Object).append(WaitEvenCodeHtml);}
			Context_Html_Value+=WaitEvenCodeHtml;
			
		}

		if(ShowMeth==0) $('#'+To_where_Object).append(Context_Html_Value);
		else if(ShowMeth==2) return Context_Html_Value;

		if(max_num==0){
			//当没有数据的时候友情提示
			var result_value = "";
			result_value+="	<table width=\"670\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"5\" style=\"margin:3 0 10 0;\">";
			result_value+="	<tr><td height=10></td></tr>";
			result_value+="	<tr>";
			result_value+="	  <td align='center'>";
			result_value+="		<h4 style='background:url(http://mat1.qq.com/gongyi/images/gy_tips.gif) no-repeat;width:98px;height:41px;margin:10px auto 0;'><span></span></h4>";
			result_value+="		<p>当前没有您需要的数据</p>";
			result_value+="   </td>";
			result_value+="	</tr>";
			result_value+="	<tr><td height=10></td></tr>";
			result_value+="  </table>";

			if(ShowMeth==0) document.write(result_value);
			else if(ShowMeth==1) $('#'+To_where_Object).html(result_value);
			else if(ShowMeth==2) return result_value;
		}

}		  




/*		以下JS为　TITLE处理效果JS		---BEGIN*/

//***********默认设置定义.*********************
tPopWait	=50;		//停留tWait豪秒后显示提示。
tPopShow	=6000;		//显示tShow豪秒后关闭提示
showPopStep	=20;
popOpacity	=95;
fontcolor	="#000000";
bgcolor		="#D7F2FF";
bordercolor	="#008040";

//***************内部变量定义*****************
sPop=null;curShow=null;tFadeOut=null;tFadeIn=null;tFadeWaiting=null;

document.write("<style type='text/css'id='defaultPopStyle'>");
document.write(".cPopText {  background-color: " + bgcolor + ";color:" + fontcolor + "; border: 1px " + bordercolor + " solid;font-color: font-size: 12px; padding-right: 4px; padding-left: 4px; height: 20px; padding-top: 2px; padding-bottom: 2px; filter: Alpha(Opacity=0)}");
document.write("</style>");
document.write("<div id='dypopLayer' style='position:absolute;z-index:1000;' class='cPopText'></div>");


function showPopupText(){
	var o=event.srcElement;
	MouseX=event.x;
	MouseY=event.y;
	if(o.alt!=null && o.alt!=""){o.dypop=o.alt;o.alt=""};
        if(o.title!=null && o.title!=""){o.dypop=o.title;o.title=""};
	if(o.dypop!=sPop) {
			sPop=o.dypop;
			clearTimeout(curShow);
			clearTimeout(tFadeOut);
			clearTimeout(tFadeIn);
			clearTimeout(tFadeWaiting);	
			if(sPop==null || sPop=="") {
				dypopLayer.innerHTML="";
				dypopLayer.style.filter="Alpha()";
				dypopLayer.filters.Alpha.opacity=0;	
				}
			else {
				if(o.dyclass!=null) popStyle=o.dyclass 
					else popStyle="cPopText";
				curShow=setTimeout("showIt()",tPopWait);
			}
			
	}
}

function showIt(){
		dypopLayer.className=popStyle;
		dypopLayer.innerHTML=sPop;
		popWidth=dypopLayer.clientWidth;
		popHeight=dypopLayer.clientHeight;
		if(MouseX+12+popWidth>document.body.clientWidth) popLeftAdjust=-popWidth-24
			else popLeftAdjust=0;
		if(MouseY+12+popHeight>document.body.clientHeight) popTopAdjust=-popHeight-24
			else popTopAdjust=0;
		dypopLayer.style.left=MouseX+12+document.body.scrollLeft+popLeftAdjust;
		dypopLayer.style.top=MouseY+12+document.body.scrollTop+popTopAdjust;
		dypopLayer.style.filter="Alpha(Opacity=0)";
		fadeOut();
}

function fadeOut(){
	if(dypopLayer.filters.Alpha.opacity<popOpacity) {
		dypopLayer.filters.Alpha.opacity+=showPopStep;
		tFadeOut=setTimeout("fadeOut()",1);
		}
		else {
			dypopLayer.filters.Alpha.opacity=popOpacity;
			tFadeWaiting=setTimeout("fadeIn()",tPopShow);
			}
}

function fadeIn(){
	if(dypopLayer.filters.Alpha.opacity>0) {
		dypopLayer.filters.Alpha.opacity-=1;
		tFadeIn=setTimeout("fadeIn()",1);
		}
}
//document.onmouseover=showPopupText;
/*		以上JS为　TITLE处理效果JS		---END*/






/*
NextPageClass.js
Js分页
penwang@tencent.com
2008-4-8
*/

var PageNext_str		= ""; //输出变量
var PageSizeNum			= 10; //每页多少条记录
var PageListNum			= 10; //翻页的标识一页显示多少个
var ThispageUrl			="http://"+window.location.host+window.location.pathname; //当前不带参数的页面地址

var To_ShowObject		= "";
var ThisPageNo_Color	= "#FF8042";	//当前页码的字数的着色
var OnClick_FunFlag		= "";
/* 获得html地址中的参数值*/
var SERVER_TEMP			= HtmlEncode(window.location.search.replace(/.*\?/,"")); //HtmlEncode 进行安全验证
var JSPAGENO = $.Tjs_Get("JSPAGENO"); //得到翻页值
if(!JSPAGENO || isNaN(JSPAGENO)) JSPAGENO=1;


/*	初始化分页	*/
function NextPageClassInit(DateTotal_Num,Pageno,Meth,To_Object,FunFlag,pageurlpamestr,RePageSizeNum,PageObjectName){
		/*
		DateTotal_Num	多少条数据记录
		Pageno			当前页
		Meth			==GET 为href方法翻页
						==POST 为OnClike方法翻页
		FunFlag			当POST的时候执行哪个函数
		pageurlpamestr	= 需要加上地址URL里的参数字符串
		RePageSizeNum	= 重定义每页显示的数据列数量
		PageObjectName	= 分页代码的对象ＩＤ
		*/
		//if(FunFlag =="EVEN") document.onmouseover=showPopupText; //对title进行处理

		if(typeof(RePageSizeNum)=="undefined") RePageSizeNum = 0;
			if(RePageSizeNum>0) PageSizeNum = RePageSizeNum;

		if(!Pageno) Pageno=1;
		OnClick_FunFlag		=	FunFlag;
		
		var Total_Pagenum = parseInt(DateTotal_Num/PageSizeNum); //总页数
		if(Total_Pagenum==0) 
			Total_Pagenum=1;
		else
			if((DateTotal_Num%PageSizeNum)>0) Total_Pagenum++;
		if(Total_Pagenum==1) {
			var PageNext_str = "";
			PageNext_str+="<div class=\"pagelist\">当前只有1页</div>";
			$('#'+PageObjectName).html(PageNext_str); //如果只有一页，则不显示分页
			return false;
		}
		
		if(Pageno>Total_Pagenum) Pageno=Total_Pagenum;	//如果跳转的页面数量过大，就转向最后一页
		
		PageNext_str+="<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width='100%'>";
		PageNext_str+="<tr>";
		PageNext_str+="<td class=\"pagel\" align=\"right\">";
		
		if(!To_Object) Meth="GET";
		Meth = 'GET';


		if(Meth=="GET"){
			/*刷新页面更新翻页内容 2009-1-7  记录：Get方法有改成功，Post的方法没有改动*/

			var PageNext_str ="";
			PageNext_str+="<div class=\"pagelist\">";


			PageNext_str+=Pageno+"/"+Total_Pagenum+"页&nbsp;";
			if(Pageno>1) 
				  PageNext_str+="<a href='"+ThispageUrl+"?JSPAGENO=1"+pageurlpamestr+"'>首页</a>&nbsp;";
			var topnext = Pageno-1;

			if(topnext>0) 
				  PageNext_str+="<a href='"+ThispageUrl+"?JSPAGENO="+topnext+pageurlpamestr+"'>上一页</a>&nbsp;";

			PageNext_str+="<span class=\"pagenum\">";
			for(var i=1;i<=Total_Pagenum;i++){
				if(i==Pageno){
					PageNext_str+="<span>"+i+"</span>&nbsp;";
				}else{
					PageNext_str+="<a href='"+ThispageUrl+"?JSPAGENO="+i+pageurlpamestr+"'>"+i+"</a>&nbsp;";
				}
			}
			PageNext_str+="</span>";


			var nextpageno=Pageno+1;
			if(nextpageno<=Total_Pagenum)
				PageNext_str+="<a href='"+ThispageUrl+"?JSPAGENO="+nextpageno+pageurlpamestr+"'>下一页</a>&nbsp;";

			if(Pageno<Total_Pagenum) 
				PageNext_str+="<a href='"+ThispageUrl+"?JSPAGENO="+Total_Pagenum+pageurlpamestr+"'>尾页</a>&nbsp;";

			PageNext_str+="</div>";

			/*
			PageNext_str+="<div class=\"pagelimit\">每页显示";
			PageNext_str+="<select name=\"provinces\" id=\"provinces\">";
			PageNext_str+="<option>20</option>";
			PageNext_str+="</select>";
			PageNext_str+="条信息</div>";
			*/

			$('#'+PageObjectName).html(PageNext_str);
		
		}else{
			/*不刷新页面更新翻页内容 2009-1-7  记录：Get方法有改成功，Post的方法没有改动*/
			To_ShowObject = To_Object;

			PageNext_str+="<a href='#' id='view_pageinfo_id'>"+Pageno+"/"+Total_Pagenum+"页&nbsp;</a>";

			PageNext_str+="<a href='#' onclick=\"OnclickGoToPage(1,"+Total_Pagenum+")\" style='cursor:pointer' id='first_id_span' style='display:none'>首页</a>&nbsp;";
			var topnext = Pageno-1;
			PageNext_str+="<a href='#' onclick=\"OnclickGoToPage('top',"+Total_Pagenum+")\" style='cursor:pointer' id='befor_id_span' style='display:none'>上页</a>&nbsp;";

			for(var i=1;i<=Total_Pagenum;i++){
				PageNext_str+="<a href='#' onclick=\"OnclickGoToPage("+i+","+Total_Pagenum+")\" style='cursor:pointer' id='"+i+"_id_span'>"+i+"</a>&nbsp;";
			}
			
			var nextpageno=Pageno+1;
			PageNext_str+="<a href='#' onclick=\"OnclickGoToPage('next',"+Total_Pagenum+")\" style='cursor:pointer' id='next_id_span'>下页</a>&nbsp;";
			PageNext_str+="<a href='#' onclick=\"OnclickGoToPage("+Total_Pagenum+","+Total_Pagenum+")\" style='cursor:pointer' id='end_id_span'>尾页</a>&nbsp;";
			
			PageNext_str+="</td>";
			PageNext_str+="<td  align=\"right\" style=\"width:30px;\">";
				PageNext_str+="<input name=\"Pageon_input\" type=\"text\" class=\"imgbor2\" size=\"2\" style=\"width:24px;\" onkeyup=\"value=this.value.replace(/[^0-9|\.]*/g,'');\">";
			PageNext_str+="</td>";
			PageNext_str+="<td  align=\"right\" style=\"width:40px;\">";
				PageNext_str+="<img src=\"http://mat1.qq.com/gongyi/images/gongyi/gy_img_077.gif\" width=\"38\" height=\"18\" style='cursor:pointer' onClick='OnclickGoToPage(document.all.Pageon_input.value,"+Total_Pagenum+")'>";
			PageNext_str+="</td>";
			PageNext_str+="</tr>";
			PageNext_str+="</table>";


		}
} // END FUN










//把内容写入页面
function View_PageNext_Code(flag){
	if(flag==0)
		document.write(PageNext_str);
	else 
		return PageNext_str;
} // END FUN


//传入参数到地址栏,然后转向
function GoToPage(Total_Pagenum,pageurlpamestr){
	var ob = document.all.Pageon_input;
	if(ob.value=="") return false;
	var Pageon=parseInt(ob.value);
	if(Pageon>Total_Pagenum){alert("转向页数量过大！");ob.focus();ob.select();return false;}
	window.location=ThispageUrl+"?JSPAGENO="+Pageon+pageurlpamestr;
} // END FUN


//分页代码 Onclick loading方式分页
var ThisPageNo_TempValue=1;
function OnclickGoToPage(topagenum,totalpagenum){
	if(topagenum =="top") topagenum = parseInt(parseInt(ThisPageNo_TempValue)-1);
	else if(topagenum =="next") topagenum = parseInt(parseInt(ThisPageNo_TempValue)+1);
	
	if(topagenum==0) topagenum=1;
	else if(topagenum>=totalpagenum) topagenum=totalpagenum;


	var Loading_code = View_Loading_Code();
	To_ShowObject.innerHTML = Loading_code;

	/* 下面的IF 由用户自行添加 */
	if(OnClick_FunFlag == "PROG")
		ProgInsertinto_ToPage(ThisPageNumber,To_ShowObject,topagenum,PageSizeNum,1);
	else if(OnClick_FunFlag == "EVEN")
		EvenInsertinto_ToPage(ThisPageNumber,To_ShowObject,topagenum,PageSizeNum,1);

	if(topagenum ==1){
		document.all.first_id_span.style.display='none';
		document.all.befor_id_span.style.display='none';
		document.all.next_id_span.style.display='';
		document.all.end_id_span.style.display='';
	}else{
		document.all.first_id_span.style.display='';
		document.all.befor_id_span.style.display='';
		if(topagenum ==totalpagenum){
			document.all.next_id_span.style.display='none';
			document.all.end_id_span.style.display='none';
		}else{
			document.all.next_id_span.style.display='';
			document.all.end_id_span.style.display='';
		}
	}

	document.all.view_pageinfo_id.innerHTML = topagenum+"/"+totalpagenum+"页&nbsp;";
	document.all.item(topagenum+"_id_span").innerHTML="<font color="+ThisPageNo_Color+"><B>"+topagenum+"</B></font>";
	ThisPageNo_TempValue	=	topagenum;
} // END FUN





//Loading......
function View_Loading_Code(){
	//http://mat1.qq.com/gongyi/images/gongyi/load2.gif
	var value = "<br><img src=\"http://mat1.qq.com/gongyi/images/gongyi/load3.gif\"><font color=\"#FF0000\"> 正在载入中......</font><br>";
	return value;
} // END FUN



/*	分页JS	---END*//*  |xGv00|6a0ad3d2a53e2037be7830770947e479 */