/*

js压缩地址：http://www.jb51.net/tools/jsmin/


2008-10-24
Tencent.Penwang
Jquery extend js

global变量说明：
	Tjs_Mask_Onclickfun	遮掩层的时候存取对像的事件函数变量
	Tjs_regexEnum		正则公式 
	Tjs_aCity			身份证验证的变量设置


函数说明：
	页面属性函数
	Tjs_getPageWidth
	Tjs_getPageHeight
	Tjs_getBodyWidth
	Tjs_getBodyHeight
	Tjs_getBodyLeft
	Tjs_getBodyTop
	Tjs_getBody
	Tjs_getScreenWidth
	Tjs_getScreenHeight
	Tjs_getPageScroll
 
	Ajax方法上传文件函数
	Tjs_createUploadIframe
	Tjs_createUploadForm
	Tjs_ajaxFileUpload
	Tjs_uploadHttpData



Tjs_setCookie			设置Cookie
Tjs_getCookie			取Ｃookie值
Tjs_clearCookie			取消Cookie值	

Tjs_Get_Object_Where	得到一个对象的绝对位置
Tjs_ContronlPageObject	显示和隐藏页面中的部分无法遮掩的控件
Tjs_createmaskLayout	建立遮掩层	建立的时候将触发事件的对像onclick事件给move掉		(Tjs_Mask_Onclickfun)
Tjs_canclemaskLayout	取消遮掩层	取消后将原来的onclick事件给添加上					(Tjs_Mask_Onclickfun)
Tjs_ShowObject			动画 显示某个对像，并固定层的位置	
Tjs_MoveDiv				移动层
Tjs_CancleMoveDiv		取消移动
Tjs_OpenFlashShowDiv	动画显示层 从一点放大显示 ，然后移到需要的位置	--打开效果
Tjs_CloseFlashShowDiv	动画显示层 从一点放大显示 ，然后移到需要的位置	--关闭效果
Tjs_Arrayunique			把一唯数组中的重复元素去掉
Tjs_FormInertalertinfo	表单验证时候提示信息输出
Tjs_MoreCheckAction		表复选框的多选，多取消		--批量操作
Tjs_GetMoreSelectValue	得到选中复选框的值，返回
Tjs_isCardID			判断是否为身份证号
Tjs_RegexpressRegExp	执行正则表达公式
Tjs_StrLength			计算字符串的长度
Tjs_OnlyScrollTo		进行单行切换处理　一个页面只能处理一次
Tjs_number_format		四舍五入
Tjs_HtmlEncode			对需要出现在HTML正文里(除了HTML属性外)的不信任输入进行编码
Tjs_HtmlUnEncode		对HtmlEncode函数的结果进行解码
Tjs_Get					得到地址栏中的参数值 变量分大小写
Tjs_GetThisPageUrl		取得本页面的ＵＲＬ地址，这样取可以取得地址，文件名，参数等
Tjs_JsCopyTo			COPY文本
Tjs_CompTime				比较时间 格式 yyyy-mm-dd hh:mi:ss	
Tjs_ChangTimesViewMeth		对日期进行格式转换，如：10秒前,一个小时前，一天前，一个月前......
Tjs_CompTime　				时间比较，第二个时间大的话返回1 小的话返回-1，相等的话返回0
Tjs_Intercept_str			截取字符串函数
Tjs_Pagegotourl 			定时页面转向
Tjs_Init_ListInfoObject_Fun	页卡设置初始化函数

fn函数说明：
jQuery.fn.Tjs_FloatDiv	固定层的位置，不受滚动条显示而变位（这个函数有问题，已取消固定属性）
jQuery.fn.formcheck		表单的验证
jQuery.fn.setinfo		表单控件属性的设置
jQuery.fn.setval		对表单控件付值
*/


/* 以下为 extend函数
调用：$.函数名(参数1，参数1，参数1，......);
*/
var Tjs_Mask_Onclickfun = ""; //存取事件变量
var Tjs_regexEnum = 
{
	intege:"^([+-]?)\\d+$",					//整数
	intege1:"^([+]?)\\d+$",					//正整数
	intege2:"^-\\d+$",						//负整数
	num:"^([+-]?)\\d*\\.?\\d+$",			//数字
	num1:"^([+]?)\\d*\\.?\\d+$",			//正数
	num2:"^-\\d*\\.?\\d+$",					//负数
	decmal:"^([+-]?)\\d*\\.\\d+$",			//浮点数
	decmal1:"^([+]?)\\d*\\.\\d+$",			//正浮点数
	decmal2:"^-\\d*\\.\\d+$",				//负浮点数
	email:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
	color:"^[a-fA-F0-9]{6}$",				//颜色
	url:"^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//url
	url2:"^([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//url 不用html
	chinese:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",					//仅中文
	ascii:"^[\\x00-\\xFF]+$",				//仅ACSII字符
	zipcode:"^\\d{6}$",						//邮编
	mobile:"^(13|15)[0-9]{9}$",				//手机
	ip4:"^(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5]).(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5]).(d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5]).(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])$",				//ip地址
	notempty:"^\\S+$",						//非空
	//picture:"(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",	//图片
	//jpg\jpeg\png\gif
	picture:"(.*)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$",	//图片

	rar:"(.*)\\.(rar|zip|7zip|tgz)$",								//压缩文件
	date:"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",					//日期
	qq:"^[1-9]*[1-9][0-9]*$",				//QQ号码
	tel:"(\\d{3}-\\d{8}|\\d{4}-\\d{7})",	//国内电话 (\\d{3}-|\\d{4}-)?(\\d{8}|\\d{7})
	username:"^\\w+$",						//用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
	letter:"^[A-Za-z]+$",					//字母
	letter_u:"^[A-Z]+$",					//大写字母
	letter_l:"^[a-z]+$",					//小写字母
	idcard:"^[1-9]([0-9]{14}|[Xx0-9]{17})$",	//身份证
	chinese_name:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]{2,6}$",			//2~6个汉字
	chinese_english:"^[a-zA-Z\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",		//只能输入中文或英文
	HourMinute:"^\\d{2}:\\d{2}$",		//小时和分
	qqqun:"^([1-9][0-9]*(;[1-9][0-9]*)*)$",		//多个QQ号请用“;”分隔
	t_url:"^(http://t.qq.com/)",				//http://t.qq.com/xxxx
	qqZone:"^(http://user.qzone.qq.com/)"		//http://user.qzone.qq.com/
};
/* 省市的身分证号头两位 */
var Tjs_aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} ;

var HourArray = new Array("00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00");


var specialty_desc = new Array( Array("0","主持"),
								Array("1","法律咨询"),
								Array("2","参加大众型的公益活动"),
								Array("3","医护服务/陪伴特殊人群"),
								Array("4","能做讲课、授课、培训"),
								Array("5","能提供咨询类服务（比如法律/心里咨询等）"),
								Array("6","翻译/写作等文案工作"),
								Array("7","少年儿童教育"),
								Array("8","才艺表演/活动组织"),
								Array("9","录制处理视频音频"),
								Array("10","能提供IT技术服务"),
								Array("11","从事策划、设计类工作"),
								Array("*","其它"));


var Tjs_PageGotoMinnum	=1;



jQuery.extend({

		/* 获取页面属性 */
		Tjs_getPageWidth: function()
		{
			return document.documentElement.scrollWidth || document.body.scrollWidth || 0;
		},

		Tjs_getPageHeight: function()
		{
			return document.documentElement.scrollHeight || document.body.scrollHeight || 0;
		},

		Tjs_getBodyWidth: function()
		{
			return document.documentElement.clientWidth || document.body.clientWidth || 0;
		},

		Tjs_getBodyHeight: function()
		{
			return document.documentElement.clientHeight || document.body.clientHeight || 0;
		},

		Tjs_getBodyLeft: function()
		{
			return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
		},

		Tjs_getBodyTop: function()
		{
			return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		},

		Tjs_getBody: function()
		{
			return {
				width	: $.Tjs_getBodyWidth(),
				height	: $.Tjs_getBodyHeight(),
				left	: $.Tjs_getBodyLeft(),
				top		: $.Tjs_getBodyTop()
			};
		},

		Tjs_getScreenWidth: function()
		{
			return window.screen.width;
		},

		Tjs_getScreenHeight: function()
		{
			return window.screen.height;
		},

		Tjs_getPageScroll: function()
		{
		   var yScroll;
		   if (self.pageYOffset) {
				yScroll = self.pageYOffset;
		   } else if (document.documentElement && document.documentElement.scrollTop){   // Explorer 6 Strict
				yScroll = document.documentElement.scrollTop;
		   } else if (document.body) {// all other Explorers
				yScroll = document.body.scrollTop;
		   }else{
				yScroll =0;
		   }
		   return yScroll;
		},
		

		/* 操作ＣＯＯＫＩＥ*/
		//设置Cookie	 
		Tjs_setCookie: function(name, value, expires, path, domain){
			/*
			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			if (arr != null)
			{
				return unescape(arr[2]);
			}
			return null;
			*/
			document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString(): "") + ((path) ? "; path=" + path: "; path=/") + ((domain) ? "; domain=" + domain: "");

		},
		//取Ｃookie值
		Tjs_getCookie:function(name){
			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));

			if (arr != null)
			{
				return unescape(arr[2]);
			
			}

			return null;
		},
		//取消Cookie值
		Tjs_clearCookie:function(name, path, domain){
			if ($.Tjs_getCookie(name))
			{
				document.cookie=name+"="+((path)?"; path="+path:"; path=/")+((domain) ? "; domain=" + domain: "")+";expires=Fri, 02-Jan-1970 00:00:00 GMT";
			}
		},

		/* 得到一个对像的绝对位置*/ 
		Tjs_Get_Object_Where:function(ObjectElementName){
			var e=document.getElementById(ObjectElementName);
			var Left	=e.offsetLeft;
			var Top		=e.offsetTop;
			var Width	=e.offsetWidth;
			var Height	=e.offsetHeight;
			while(e=e.offsetParent){
				Left+=e.offsetLeft;
				Top+=e.offsetTop;
			}
			return Array(Left,Top,Width,Height);
		},


		/* Ajax方法上传文件*/
		/*
		使用方法
		$.ajaxFileUpload
		(
			{
				url:'doajaxfileupload.php?acts='+flag+"&Image_Class="+Image_Class+"&Prmitkeys_value="+Prmitkeys_value+"&log_attach_id="+log_attach_id+"&filesname="+filesname,
				secureuri:false,
				fileElementId:filesname,
				dataType: 'json',
				success: function (data, status)
				{
					if(typeof(data.error) != 'undefined'){
						if(data.error != ''){
							alert(data.error);
						}else{
							alert(data.msg);
							if(data.images_url!=""){
								if(log_attach_id!="")
									imagesobject.src = data.images_url;
								else
									imagesobject.innerHTML = "<img src='"+data.images_url+"' "+imagsepaemt+">";
							}

							if(data.logid!="" && log_attach_id==""){
								document.all.log_attach_id.value = data.logid;
							}
						}
						filesboject.readOnly = false;
						butobject.disabled   = false;
					}
				},
				error: function (data, status, e)
				{
					alert(e);
					filesboject.readOnly = false;
					butobject.disabled   = false;
				}
			}
		)
		
		*/
		
		Tjs_createUploadIframe: function(id, uri)
		{
				//create frame
				var frameId = 'jUploadFrame' + id;
				
				if(window.ActiveXObject) {
					var io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />');
					if(typeof uri== 'boolean'){
						io.src = 'javascript:false';
					}
					else if(typeof uri== 'string'){
						io.src = uri;
					}
				}
				else {
					var io = document.createElement('iframe');
					io.id = frameId;
					io.name = frameId;
				}
				io.style.position = 'absolute';
				io.style.top = '-1000px';
				io.style.left = '-1000px';

				document.body.appendChild(io);

				return io			
		},
		Tjs_createUploadForm: function(id, fileElementId)
		{
			//create form	
			var formId = 'jUploadForm' + id;
			var fileId = 'jUploadFile' + id;
			var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');	
			var oldElement = $('#' + fileElementId);
			var newElement = $(oldElement).clone();
			$(oldElement).attr('id', fileId);
			$(oldElement).before(newElement);
			$(oldElement).appendTo(form);
			//set attributes
			$(form).css('position', 'absolute');
			$(form).css('top', '-1200px');
			$(form).css('left', '-1200px');
			$(form).appendTo('body');		
			return form;
		},

		Tjs_ajaxFileUpload: function(s) {
			// TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
			s = jQuery.extend({}, jQuery.ajaxSettings, s);
			var id = new Date().getTime()        
			var form = jQuery.Tjs_createUploadForm(id, s.fileElementId);
			var io = jQuery.Tjs_createUploadIframe(id, s.secureuri);
			var frameId = 'jUploadFrame' + id;
			var formId = 'jUploadForm' + id;		
			// Watch for a new set of requests
			if ( s.global && ! jQuery.active++ )
			{
				jQuery.event.trigger( "ajaxStart" );
			}            
			var requestDone = false;
			// Create the request object
			var xml = {}   
			if ( s.global )
				jQuery.event.trigger("ajaxSend", [xml, s]);
			// Wait for a response to come back
			var uploadCallback = function(isTimeout)
			{			
				var io = document.getElementById(frameId);
				try 
				{				
					if(io.contentWindow)
					{
						 xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
						 xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
						 
					}else if(io.contentDocument)
					{
						 xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
						xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
					}						
				}catch(e)
				{
					jQuery.handleError(s, xml, null, e);
				}
				if ( xml || isTimeout == "timeout") 
				{				
					requestDone = true;
					var status;
					try {
						status = isTimeout != "timeout" ? "success" : "error";
						// Make sure that the request was successful or notmodified
						if ( status != "error" )
						{
							// process the data (runs the xml through httpData regardless of callback)
							var data = jQuery.Tjs_uploadHttpData( xml, s.dataType );    
							// If a local callback was specified, fire it and pass it the data
							if ( s.success )
								s.success( data, status );
		
							// Fire the global callback
							if( s.global )
								jQuery.event.trigger( "ajaxSuccess", [xml, s] );
						} else
							jQuery.handleError(s, xml, status);
					} catch(e) 
					{
						status = "error";
						jQuery.handleError(s, xml, status, e);
					}

					// The request was completed
					if( s.global )
						jQuery.event.trigger( "ajaxComplete", [xml, s] );

					// Handle the global AJAX counter
					if ( s.global && ! --jQuery.active )
						jQuery.event.trigger( "ajaxStop" );

					// Process result
					if ( s.complete )
						s.complete(xml, status);

					jQuery(io).unbind()

					setTimeout(function()
										{	try 
											{
												$(io).remove();
												$(form).remove();	
												
											} catch(e) 
											{
												jQuery.handleError(s, xml, null, e);
											}									

										}, 100)

					xml = null

				}
			}
			// Timeout checker
			if ( s.timeout > 0 ) 
			{
				setTimeout(function(){
					// Check to see if the request is still happening
					if( !requestDone ) uploadCallback( "timeout" );
				}, s.timeout);
			}
			try 
			{
			   // var io = $('#' + frameId);
				var form = $('#' + formId);
				$(form).attr('action', s.url);
				$(form).attr('method', 'POST');
				$(form).attr('target', frameId);
				if(form.encoding)
				{
					form.encoding = 'multipart/form-data';				
				}
				else
				{				
					form.enctype = 'multipart/form-data';
				}			
				$(form).submit();

			} catch(e) 
			{			
				jQuery.handleError(s, xml, null, e);
			}
			if(window.attachEvent){
				document.getElementById(frameId).attachEvent('onload', uploadCallback);
			}
			else{
				document.getElementById(frameId).addEventListener('load', uploadCallback, false);
			} 		
			return {abort: function () {}};	

		},

		Tjs_uploadHttpData: function( r, type ) {
			var data = !type;
			data = type == "xml" || data ? r.responseXML : r.responseText;
			// If the type is "script", eval it in global context
			if ( type == "script" )
				jQuery.globalEval( data );
			// Get the JavaScript object, if JSON is used.
			if ( type == "json" )
				eval( "data = " + data );
			// evaluate scripts within html
			if ( type == "html" )
				jQuery("<div>").html(data).evalScripts();
				//alert($('param', data).each(function(){alert($(this).attr('value'));}));
			return data;
		},
		/* Ajax方法上传文件-----结束*/









		/* 显示和隐藏页面中的部分无法遮掩的控件 */
		Tjs_ContronlPageObject:function(show){
				var windowedObjectTags = new Array("SELECT","OBJECT", "APPLET","EMBED");
				for (var i=0; i<windowedObjectTags.length; i++) {
					if(show){
						$(windowedObjectTags[i]).show();
					}else{
						$(windowedObjectTags[i]).hide();
					}
				}
		},


		/* 建立遮掩层 */
		Tjs_createmaskLayout: function(ObjectElementId,ObjectElementColor,ObjectElementopcity,objectElementbutton,ObjectLevel)
		{
			/*
			ObjectElementId,		遮掩层的ID名
			ObjectElementColor,		遮掩层的显示颜色
			ObjectElementopcity,	遮掩层的透明度
			objectElementbutton		触发遮掩层的对象名
			ObjectLevel				0为全屏，１为iframe内 默认为0
			*/

			
			//层ID名
			if(typeof(ObjectElementId)=="undefined" || !ObjectElementId){
				ObjectElementId = "_MaskLayout_gongyi_penwang";
			}
			//遮掩层颜色，默认为白色
			if(typeof(ObjectElementColor)=="undefined" || !ObjectElementColor){
				ObjectElementColor = "#FFFFFF";
			}
			//遮掩层的透明度
			if(typeof(ObjectElementopcity)=="undefined" || !ObjectElementopcity){
				ObjectElementopcity =90;
			}

			//取消触发事件
			if(typeof(objectElementbutton)!="undefined" && objectElementbutton!=""){
				$("#"+objectElementbutton).blur();
				Tjs_Mask_Onclickfun = $("#"+objectElementbutton).attr("onclick");
				$("#"+objectElementbutton).removeAttr("onclick");
				//$("#"+objectElementbutton).attr("onclick","");
				$("#"+objectElementbutton).unbind("click") 
			}


			//遮掩层的透明度
			if(typeof(ObjectLevel)=="undefined" || ObjectLevel==""){
				ObjectLevel =0;
			}

			
			/*
			var isIE6=false;
			if($.browser.msie && $.browser.version=="6.0"){
				//$("html").css("overflow-x","auto").css("overflow-y","hidden");
				$("body").css("overflow-x","auto").css("overflow-y","hidden");
				isIE6=true;
			};
			
			
			$("body").css({
				margin:"0px",
				padding:"15px 10px 0 10px",
				border:"0px",
				height:"100%",
				overflow:"auto"
			});
			*/





			// 获取所有层数，得到他们的zindex，取个最大的，然后设置成最大值+1
			var Tjs_CL_DivObjectArray = $("div").get().reverse();
			//alert(Tjs_CL_DivObjectArray);
			var Tjs_zIndex_aray = new Array();
			var Tjs_MaxzIndex_num =0;
			for(var i=0;i<Tjs_CL_DivObjectArray.length;i++){
				if(Tjs_CL_DivObjectArray[i].style.zIndex!='auto' && Tjs_CL_DivObjectArray[i].style.zIndex!=''){
					Tjs_zIndex_aray.push(parseInt(Tjs_CL_DivObjectArray[i].style.zIndex));
					if(Tjs_MaxzIndex_num<parseInt(Tjs_CL_DivObjectArray[i].style.zIndex)) Tjs_MaxzIndex_num=parseInt(Tjs_CL_DivObjectArray[i].style.zIndex);
				}
			}
			var Tjs_MaskDivzIndexNum = parseInt(Tjs_MaxzIndex_num)+10;


			$.Tjs_ContronlPageObject(false); //隐藏控件
			//var Tjs_testbutton="<br><br><br><span><input type=\"button\" name=\"Cancle_button\" value=\"关闭遮掩层\" onclick=\"$.Tjs_canclemaskLayout('"+ObjectElementId+"','"+ObjectElementColor+"','"+ObjectElementopcity+"','"+objectElementbutton+"');\"/></span>";
			var Tjs_testbutton="";
			
			$("body").prepend("<div id=\""+ObjectElementId+"\" name=\""+ObjectElementId+"\" style=\"display:none;z-index:"+Tjs_MaskDivzIndexNum+";background-color: "+ObjectElementColor+";position: absolute;top:-1px;left:-1px;filter: alpha(opacity="+ObjectElementopcity+");opacity: 0.80;-moz-opacity: 0.80;\" align=\"center\"  valign=\"middle\">"+Tjs_testbutton+"</div>"); 


			//获取高和宽
			if(ObjectLevel==0){
				var Tjs_height =(document.body.scrollHeight<screen.availHeight)?screen.availHeight:(document.body.scrollHeight+30);
				var Tjs_width  =(document.body.scrollWidth<screen.availWidth)?(screen.availWidth-20):document.body.scrollWidth;
			}else{
				var Tjs_height =document.body.scrollHeight;
				var Tjs_width  =document.body.scrollWidth;
			}
			//设置mask的高和宽
			$("#"+ObjectElementId).height(Tjs_height);
			$("#"+ObjectElementId).width(Tjs_width);
			$("#"+ObjectElementId).fadeIn("slow");


			//$("body").css("overflow","hidden"); 
		},
		



		/* 取消遮掩层 */
		Tjs_canclemaskLayout: function(ObjectElementId,ObjectElementColor,ObjectElementopcity,objectElementbutton)
		{
			/*
			ObjectElementId,		遮掩层的ID名
			ObjectElementColor,		遮掩层的显示颜色
			ObjectElementopcity,	遮掩层的透明度
			objectElementbutton		触发遮掩层的对象名
			*/



			//层ID名
			if(typeof(ObjectElementId)=="undefined" || !ObjectElementId){
				ObjectElementId = "_MaskLayout_gongyi_penwang";
			}

			//遮掩层颜色，默认为白色
			if(typeof(ObjectElementColor)=="undefined" || !ObjectElementColor){
				ObjectElementColor = "#FFFFFF";
			}
			//遮掩层的透明度
			if(typeof(ObjectElementopcity)=="undefined" || !ObjectElementopcity){
				ObjectElementopcity =90;
			}
			
			//还原事件
			if(typeof(objectElementbutton)!="undefined" && objectElementbutton!=""){
				//objectElementbutton = document.all.item(objectElementbutton);
				$("#"+objectElementbutton).bind("click",function(){$.Tjs_createmaskLayout(ObjectElementId,ObjectElementColor,ObjectElementopcity,objectElementbutton);});
			}

			//移去遮掩层
			$("#"+ObjectElementId).remove();
			$.Tjs_ContronlPageObject(true); //显示控件

			//$("body").css("overflow","auto"); 
		},

		

		/* 动画 显示某个对像，并固定层的位置*/
		Tjs_ShowObject: function(ObjectElementname,ObjectelEmentFlag,ObjectelEmentWhere,IshaveMaskLoyoutflag,ObjectLevel){
			/*
			ObjectElementname,		层的ID
			ObjectelEmentFlag,		对像显示的标识 true表示显示 false表示关闭
			ObjectelEmentWhere,		显示的位置 参数Tjs_FloatDiv 的参数设置
			IshaveMaskLoyoutflag	显示需要显示遮掩层 true显示 false不显示
			ObjectLevel				0为全屏，１为iframe内 默认为0
			*/

			//对像显示的标识
			if(typeof(ObjectelEmentFlag)=="undefined" || ObjectelEmentFlag.length==0){
				ObjectelEmentFlag =true;
			}
			//是否要遮掩层
			if(typeof(IshaveMaskLoyoutflag)=="undefined" || IshaveMaskLoyoutflag.length==0){
				IshaveMaskLoyoutflag =true;
			}
			//对象显示的位置
			if(typeof(ObjectelEmentWhere)=="undefined" || !ObjectelEmentWhere){
				ObjectelEmentWhere = "middle";
			}
			//对像名称，如果为空则返回false
			if(typeof(ObjectElementname)=="undefined" || !ObjectElementname){
				alert("请设置对像名称");
				return false;
			}
			//对象显示的位置
			if(typeof(ObjectLevel)=="undefined" || ObjectLevel==''){
				ObjectLevel = 0;
			}



			if(ObjectelEmentFlag){
				if(IshaveMaskLoyoutflag) $.Tjs_createmaskLayout('','#FFFFFF',80,"create_maskbutton",ObjectLevel); //显示遮掩层

				$("#"+ObjectElementname).Tjs_FloatDiv(ObjectelEmentWhere); //固定层的位置，不受滚动条显示而变位
				//$("#"+ObjectElementname).fadeIn("slow");
				$("#"+ObjectElementname).show();
			}else{
				if(IshaveMaskLoyoutflag) $.Tjs_canclemaskLayout('','#FFFFFF',80,'create_maskbutton'); //关闭遮掩层
				//$("#"+ObjectElementname).fadeOut("slow");
				$("#"+ObjectElementname).hide();
			}
		},

		
		/* 移动层 */
		Tjs_MoveDiv:function(ObjectElementHeadname,ObjectElementmovename,ObjectElementbodyname,ObjectElementclosename,ObjectElementsetsmallname,ObjectElementsetbigname){
			/*
			ObjectElementHeadname,		移动层的标题，即拽拖点ID
			ObjectElementmovename,		移动层的整体ID
			ObjectElementbodyname,		移动层内容ID		可以为空
			ObjectElementclosename,		移动层的关闭ID	可以为空
			ObjectElementsetsmallname,	移动层的小化ID	可以为空
			ObjectElementsetbigname		移动层的大化ID	可以为空
			*/
			
			
			
			var Tjs_x1,Tjs_y1;

			if(typeof(ObjectElementHeadname)=="undefined" || !ObjectElementHeadname){
				alert("请设置移动抓取标题对像名称");
				return false;
			}

			if(typeof(ObjectElementmovename)=="undefined" || !ObjectElementmovename){
				alert("请设置移动主体对像名称");
				return false;
			}
			
			 
			 $("#"+ObjectElementHeadname).css("cursor","move");
			 $("#"+ObjectElementHeadname).mousedown(
				 function(event){
					var offset=$("#"+ObjectElementmovename).offset();
					Tjs_x1=event.clientX-offset.left;
					Tjs_y1=event.clientY-offset.top;
					
					var witchButton=false;
					if(document.all&&event.button==1){
						witchButton=true;
					}else{
						if(event.button==0)	witchButton=true;
					}
					
					if(witchButton)//按左键,FF是0，IE是1
					{
						$(document).mousemove(function(event){
							$("#"+ObjectElementmovename).css("left",(event.clientX-Tjs_x1)+"px");
							$("#"+ObjectElementmovename).css("top",(event.clientY-Tjs_y1)+"px");
						})
					}
			 });

			 $("#"+ObjectElementHeadname).mouseup(function(event){$(document).unbind("mousemove");});	
			 
			 if(typeof(ObjectElementclosename)!="undefined" || ObjectElementclosename)
				 $("#"+ObjectElementclosename).click(function(event){$("#move_div").hide();});

			 if((typeof(ObjectElementsetsmallname)!="undefined" || ObjectElementsetsmallname) && (typeof(ObjectElementbodyname)!="undefined" || ObjectElementbodyname))
				 $("#"+ObjectElementsetsmallname).click(function(event){$("#"+ObjectElementbodyname).hide();});

			 if((typeof(ObjectElementsetbigname)!="undefined" || ObjectElementsetbigname) && (typeof(ObjectElementbodyname)!="undefined" || ObjectElementbodyname))
				 $("#"+ObjectElementsetbigname).click(function(event){$("#"+ObjectElementbodyname).show();});
		},



		/* 取消层移动*/
		Tjs_CancleMoveDiv:function(ObjectElementHeadname){
			/*
			ObjectElementHeadname 移动层拽拖点 ID
			*/
			if(typeof(ObjectElementHeadname)=="undefined" || !ObjectElementHeadname){
				alert("请设置移动抓取标题对像名称");
				return false;
			}
			$("#"+ObjectElementHeadname).unbind("mousedown");
		},

		


		/* 动画显示层 从一点放大显示 ，然后移到需要的位置 */
		Tjs_OpenFlashShowDiv:function(ObjectElementIdname,ObjectelementLocation,ObjectelementBeginWhere,SpeedNum){
			/*
			ObjectElementIdname		 层的ID
			ObjectelementLocation	 动画显示后移动的位置参数，格式如：{left:'+=200'} 
			ObjectelementBeginWhere	 层的初始化位置：格式如下：{left:'200px',top:'100px'} 
			*/
			if(typeof(ObjectElementIdname)=="undefined" || !ObjectElementIdname){
				alert("请设置需要动画处理的对像名称");
				return false;
			}

			if(typeof(ObjectelementLocation)=="undefined" || !ObjectelementLocation){
				ObjectelementLocation = "false"; //变化方向的范围
			}


			if(typeof(ObjectelementBeginWhere)=="undefined" || !ObjectelementBeginWhere){
				ObjectelementBeginWhere = "false"; //变化方向的范围
			}
			
			if(typeof(SpeedNum)=="undefined" || SpeedNum==""){
				SpeedNum = 2000; //移动的速度
			}
			


			if(ObjectelementBeginWhere!="false")
				$("#"+ObjectElementIdname).css(ObjectelementBeginWhere);

			$("#"+ObjectElementIdname).css("position","absolute");

			/*
			show(speed,[callback]) 如果想让动画完成后执行某种操作，则用这个方法处理    
			*/
			$("#"+ObjectElementIdname).show("slow"); 

			if(ObjectelementLocation!="false")
				$("#"+ObjectElementIdname).animate(ObjectelementLocation,SpeedNum); 

			return true;
		},
		


		/* 动画显示层 从一点放大显示 ，然后移到需要的位置 */
		Tjs_CloseFlashShowDiv:function(ObjectElementIdname,ObjectelementLocation){
			/*
			ObjectElementIdname	层的ID
			ObjectelementLocation 动画显示后移动的位置参数，格式如：{left:'+=200'} 
			*/
		

			if(typeof(ObjectElementIdname)=="undefined" || !ObjectElementIdname){
				alert("请设置需要动画处理的对像名称");
				return false;
			}

			if(typeof(ObjectelementLocation)=="undefined" || !ObjectelementLocation){
				ObjectelementLocation = "false"; //变化方向的范围
			}
		
			$("#"+ObjectElementIdname).css("position","absolute");

			if(ObjectelementLocation!="false")
				$("#"+ObjectElementIdname).animate(ObjectelementLocation,2000); 

			$("#"+ObjectElementIdname).hide("slow");

			return true;
		},



		/* 将数据进行唯一化 只处理一唯数组 */
		Tjs_Arrayunique:function(arraynum){
			/*
			arraynum 一唯数组
			*/
			var temp_num = new Array();
			//alert(arraynum);
			for(var i=0;i<arraynum.length;i++){
				//alert(arraynum[i]);
				//alert("====="+temp_num);
				//alert($.inArray(arraynum[i],temp_num));
				if($.inArray(arraynum[i],temp_num) == -1) temp_num.push(arraynum[i]);
			}
			return temp_num;
		},



		/*	表单验证时候提示信息输出	*/
		Tjs_FormInertalertinfo:function(objectElement,strinfo,classnameobject){
			/*
			if($("#"+objectElement).attr("tagName").toUpperCase()=="SPAN" && usetarget!="SPAN"){
				// 如果是SPAN标签，则插入ＤＩＶ后再html()
				$("#"+objectElement).empty();
				$("#"+objectElement).append("<div style='width:100%'>"+strinfo+"</div>");
				$("#"+objectElement+" div:first-child").addClass(classnameobject);
			}else{
				// 如果是DIV标签，则直接html()
				$("#"+objectElement).empty();
				$("#"+objectElement).removeClass();
				$("#"+objectElement).addClass(classnameobject);
				$("#"+objectElement).css("padding-top","5px").css("padding-bottom","5px").css("padding-right","10px");
				$("#"+objectElement).html(strinfo);
			
			}
			*/

			if(strinfo=="") {
				$("#"+objectElement).empty();
				$("#"+objectElement).removeClass();
				$("#"+objectElement).html('');
				return false;
			}

			$("#"+objectElement).empty();
			$("#"+objectElement).removeClass();
			$("#"+objectElement).addClass(classnameobject);
			

			if($("#"+objectElement).attr("tagName")=="undefined") return false;
			
			//alert(objectElement);
			//if($("#"+objectElement).attr("tagName").toUpperCase()!="DIV"){
				//alert(objectElement);
				//$("#"+objectElement).css("padding-top","2px").css("padding-bottom","6px").css("padding-right","10px");
			//}
			//alert(strinfo);
			if(strinfo!='-1')$("#"+objectElement).html(strinfo);
		},

		/* 表复选框的多选，多取消*/
		Tjs_MoreCheckAction:function(ObjectElementname,CheckFlag){
			/*
			ObjectElementname	复选框的ＩＤ
			CheckFlag			为true的时候表是选择,为false的时候取消
			
			return 
			ReturnDataArray		复选框选择后的值，数组
			*/
			
			var ReturnDataArray = new Array();
			var Check_array =  $("input[@name=" + ObjectElementname + "]");
			for(var i=0;i<Check_array.length;i++){
				if(CheckFlag){
					$(Check_array[i]).attr("checked",true);
					ReturnDataArray.push($(Check_array[i]).attr("value"));
				}else{
					$(Check_array[i]).attr("checked",false);
				}
			}
			return ReturnDataArray;
		},
		

		/* 得到选中复选框的值，返回*/
		Tjs_GetMoreSelectValue:function(ObjectElementname,PenwangCheckFlag){
			/*
			ObjectElementname			复选框的ＩＤ
			PenwangCheckFlag			为true的时候取选中的值，false的时候取未选中的值
			
			return 
			ReturnDataArray		复选框选择后的值，数组
			*/
			var ReturnDataArray_Yes = new Array();
			var ReturnDataArray_No	= new Array();
			var Check_array =  $("input[@name=" + ObjectElementname + "]");
			for(var i=0;i<Check_array.length;i++){
				if($(Check_array[i]).attr("checked")){
					ReturnDataArray_Yes.push($(Check_array[i]).attr("value"));
				}else{
					ReturnDataArray_No.push($(Check_array[i]).attr("value"));
				}
			}

			if(PenwangCheckFlag){
				return ReturnDataArray_Yes;
			}else{
				return ReturnDataArray_No;
			}
		},


		/* 判断是否为身份证号码 */
		Tjs_isCardID:function (Tjs_sId){ 
			var iSum=0 ;
			var info="" ;
			if(!/^\d{17}(\d|x)$/i.test(Tjs_sId)) return false; 
			Tjs_sId=Tjs_sId.replace(/x$/i,"a"); 

			if(Tjs_aCity[parseInt(Tjs_sId.substr(0,2))]==null){
				//alert("你的身份证地区非法"); 
				return false; 
			}
			sBirthday=Tjs_sId.substr(6,4)+"-"+Number(Tjs_sId.substr(10,2))+"-"+Number(Tjs_sId.substr(12,2));			
			var d=new Date(sBirthday.replace(/-/g,"/")) ;
			if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())){
				//alert("身份证上的出生日期非法");
				return false; 
			}
			for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(Tjs_sId.charAt(17 - i),11) ;

			if(iSum%11!=1) return false; 
			return true;
			//Tjs_aCity[parseInt(Tjs_sId.substr(0,2))]+","+sBirthday+","+(Tjs_sId.substr(16,1)%2?"男":"女") 
		},


		/* 执行正则判断 */
		Tjs_RegexpressRegExp:function(ObjectContext,RegExpChart){
			/*
			ObjectContext	需要判断的内容
			RegExpChart		需要进行正则的正则公式

			return 
			true	正则通过
			false	正则失败

			调用：$.Tjs_RegexpressRegExp("中国人民共和国","chinese");
			*/
			if(typeof(ObjectContext)=="undefined" || !ObjectContext){
				ObjectContext = "";
			}

			if(typeof(RegExpChart)=="undefined" || !RegExpChart){
				alert("请选择正则公式");
				return false;
			}
			
			var regexpress_chart = eval("Tjs_regexEnum."+RegExpChart);
			if(regexpress_chart=="undefined" || regexpress_chart==""){
				regexpress_chart= false;
			}

			var exp = new RegExp(regexpress_chart);
			if (exp.test(ObjectContext)) 
				return true;
			else 
				return false;
		},

		/* 计划字符的长度*/
		Tjs_StrLength:function(sString){
			/*
			sString	需要计算长度的字符串长度			
			return 
			icount　长度数，将一个中文转成了两个字符
			*/

		   var sStr,iCount,i,strTemp ;
		   if(sString=="" || !sString) return 0;
		   iCount = 0 ;
		   sStr = sString.split("");
			for (i = 0 ; i < sStr.length ; i ++)
			 {
				 strTemp = escape(sStr[i]);
				  if (strTemp.indexOf("%u",0) == -1)
				  {
					  iCount = iCount + 1 ;
				  }
				  else
				  {
					  iCount = iCount + 2 ;
				  }
			  }
			  return iCount ;
		},

		
		/* 进行单行切换处理　一个页面只能处理一次*/ 
		Tjs_OnlyScrollTo:function(PermitObjectname,ChirldObjectname){  
			/*
			PermitObjectname  切换主体对像名
			ChirldObjectname　切换内容对像名
			setInterval('$.Tjs_OnlyScrollTo("lie","p")',3000);
			*/
			if(typeof(PermitObjectname)=="undefined" || PermitObjectname==""){
				alert("PermitObjectname对象不能为空");
				return false;
			}
			if(typeof(ChirldObjectname)=="undefined" || ChirldObjectname==""){
				alert("ChirldObjectname对象不能为空");
				return false;
			}
			
			//$("div").data("blah"); 
			var Thisnum = $(PermitObjectname).data("ScrollTonum");
			if(typeof(ScrollTonum)=="undefined" || ScrollTonum==""){
				ScrollTonum =0;
			}


			var firstNode = $('#'+PermitObjectname+'>'+ChirldObjectname); 	
			firstNode.eq(ScrollTonum).fadeOut('slow',function(){  
				if(ScrollTonum>=$(firstNode).length-1){ScrollTonum=0;}else{ScrollTonum++;}
				firstNode.eq(ScrollTonum).fadeIn("slow");
				$(PermitObjectname).data("ScrollTonum",ScrollTonum);
			});

		},
		


		/* 去尾 */
		Tjs_formatnumber:function (value,num) 
		{
			var a,b,c,i
			a = value.toString();
			b = a.indexOf('.');
			c = a.length;
			if (num==0){
				if (b!=-1)	a = a.substring(0,b);
			}else{
				if (b==-1){
					a = a + ".";
					for (i=1;i<=num;i++) a = a + "0";
				}else{
					a = a.substring(0,b+num+1);
					for (i=c;i<=b+num;i++) a = a + "0";
				}
			}
			return a;
		},


		/* 四舍五入 */
		Tjs_number_format:function(value,num){
			/*
			value	要四舍五入的數字
			num		要保留的數位
			*/
			var a_str = $.Tjs_formatnumber(value,num);
			var a_int = parseFloat(a_str);
			if (value.toString().length>a_str.length)
			{
				var b_str = value.toString().substring(a_str.length,a_str.length+1)
				var b_int = parseFloat(b_str);
				if (b_int<5){
					return a_str;}
				else{
					var bonus_str,bonus_int;
					if (num==0)
					{bonus_int = 1;}
					else
					{
						bonus_str = "0."
						for (var i=1; i<num; i++)
						bonus_str+="0";
						bonus_str+="1";
						bonus_int = parseFloat(bonus_str);
					}
					a_str = $.Tjs_formatnumber(a_int + bonus_int, num);
				}
			}
			return a_str;
		},

		//html正文编码：对需要出现在HTML正文里(除了HTML属性外)的不信任输入进行编码
		Tjs_HtmlEncode:function (sStr)
		{
			if(typeof(sStr)=='undefined' || !sStr || sStr == "")
				return '';
			sStr = sStr.replace(/&/g,"&amp;");
			sStr = sStr.replace(/>/g,"&gt;");
			sStr = sStr.replace(/</g,"&lt;");
			sStr = sStr.replace(/"/g,"&quot;");
			sStr = sStr.replace(/'/g,"&#39;");
			return sStr;
		},

		//html正文解码：对HtmlEncode函数的结果进行解码
		Tjs_HtmlUnEncode:function (sStr)
		{
			sStr = sStr.replace(/&amp;/g,"&");
			sStr = sStr.replace(/&gt;/g,">");
			sStr = sStr.replace(/&lt;/g,"<");
			sStr = sStr.replace(/&quot;/g,'"');
			sStr = sStr.replace(/&#39;/g,"'");
			return sStr;
		},

		
		// 得到地址栏中的参数值 变量分大小写
		Tjs_Get:function(parmtname){
			//var SERVER_TEMP			= $.Tjs_HtmlEncode(window.location.search.replace(/.*\?/,"")); //HtmlEncode 进行安全验证


			var sl = location.href.indexOf('&');
			var hl = location.href.indexOf('#');
			var str = '';
			if ((sl < 0 || sl > hl) && hl > 0) str = location.hash.substr(1);
			else str = location.search.substr(1);
			
			//var SERVER_TEMP = str;
			var SERVER_TEMP			= $.Tjs_HtmlEncode(str.replace(/.*\?/,"")); //HtmlEncode 进行安全验证

			var PAGE_PARMT_ARRAY	= SERVER_TEMP.split("&amp;");
			if(PAGE_PARMT_ARRAY.length==0) return "";
			var value="";
			for(var i=0;i<PAGE_PARMT_ARRAY.length;i++){
				if(PAGE_PARMT_ARRAY[i]=="") continue;
				var GETname = PAGE_PARMT_ARRAY[i].substr(0,PAGE_PARMT_ARRAY[i].indexOf("="));
				if(GETname == parmtname){
					value = PAGE_PARMT_ARRAY[i].substr((PAGE_PARMT_ARRAY[i].indexOf("=")+1),PAGE_PARMT_ARRAY[i].length);
					return value;
					break;
				}
			}
			return "";
		},
		
		
		//取得本页面的ＵＲＬ地址，这样取可以取得地址，文件名，参数等
		Tjs_GetThisPageUrl:function(){
			//var Windows_ThispageUrl	=window.top.location.protocol+"//"+window.top.location.host+window.top.location.pathname+window.top.location.search+window.top.location.hash;
			var Windows_ThispageUrl	=window.top.location.href;
			return Windows_ThispageUrl;
		},
		
		//add by niou begin
		//取得本页面的ＵＲＬ地址，这样取可以取得地址，文件名，参数等
		Tjs_GetThisPageUrlAll:function(){
			var Windows_ThispageUrl	=top.location.href;
			return Windows_ThispageUrl;
		},
		//add by niou end

		/* COPY文本*/ 
		Tjs_JsCopyTo:function(txt){
			 if(window.clipboardData){    
				clipboardData.setData('text',txt);    
			 } else if(navigator.userAgent.indexOf("Opera") != -1) {    
				  window.location = txt;    
			 } else if (window.netscape) {    
				  try {    
					   netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");    
				  } catch (e) {    
					   alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");    
				  }    
				  var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);    
				  if (!clip)    
					   return;    
				  var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);    
				  if (!trans)    
					   return;    
				  trans.addDataFlavor('text/unicode');    
				  var str = new Object();    
				  var len = new Object();    
				  var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);    
				  var copytext = txt;    
				  str.data = copytext;    
				  trans.setTransferData("text/unicode",str,copytext.length*2);    
				  var clipid = Components.interfaces.nsIClipboard;    
				  if (!clip)    
					   return false;    
				  clip.setData(trans,null,clipid.kGlobalClipboard);    
				 // alert("复制成功！")    
			 }    
		},

		//新加函数 20110803 bypenwang
		Tjs_GetDayTimes:function()
		{
			var DateTmpStr = new Date();
			var Yearth	= DateTmpStr.getUTCFullYear();
			var Month	= DateTmpStr.getMonth() + 1;
			if(Month < 10 ) Month = "0" + Month.toString();

			var Day	= DateTmpStr.getDate();
			if(Day < 10 ) Day = "0" + Day.toString();
			
			var Hours	= DateTmpStr.getHours();
			if(Hours < 10 ) Hours = "0" + Hours.toString();
			
			var Minutes	= DateTmpStr.getMinutes();
			if(Minutes < 10 ) Minutes = "0" + Minutes.toString();
			
			var Secondes= DateTmpStr.getSeconds();
			if(Secondes < 10 ) Secondes = "0" + Secondes.toString();
			//alert(Yearth + "-" +Month+ "-" +Day + " " + Hours + ":"+ Minutes + ":"+ Secondes);
			DateTmpStr = Yearth + "-" +Month+ "-" +Day + " " + Hours + ":"+ Minutes + ":"+ Secondes;
			
			return DateTmpStr;
		},	
		/* 对日期进行格式转换，如：10秒前,一个小时前，一天前，一个月前.......*/
		Tjs_ChangTimesViewMeth:function(NeedChangTimes,SplitChart){
			/* 
			NeedChangTimes	需要进行转换的时间 
			SplitChart		日期与时间中间的符号 一般为空就可以了

			用法：$.Tjs_ChangTimesViewMeth("2008-11-04 10:56:22");
			注意时间的格式，必须是:年-月-日 时间

			return 返回字符串
			*/
			
			
			//得到当前时间
			var DateTmpStr = $.Tjs_GetDayTimes();

			NeedChangTimes = NeedChangTimes.replace("年","-");
			NeedChangTimes = NeedChangTimes.replace("月","-");
			NeedChangTimes = NeedChangTimes.replace("日","");
			
			var Timescompreslut = $.Tjs_CompTime(NeedChangTimes,DateTmpStr);
			if(Timescompreslut<0){
				return "";
			}

			if(typeof(NeedChangTimes)=="undefined" || NeedChangTimes==""){
				//alert("需要转换的时间对象不能为空");
				return "";
			}
			if(typeof(SplitChart)=="undefined" || SplitChart==""){
				var SplitChart = " ";
			}



			//分解时间字符串
			/*
			DateTmpStr = $.trim(DateTmpStr);
			var thisdateparam	= DateTmpStr.split(SplitChart);
			var nowDate			=thisdateparam[0].split("-");
			var nowTime			=thisdateparam[1].split(":");

			var Str1 = thisdateparam[0].replace(/-/g,"/");
			var ThisDay_Year	= nowDate[0];		//年份

			var ThisDay_Month	= nowDate[1];		//月份
			var ThisDay_Data	= nowDate[2];;		//天
			var ThisDay_Hours	= nowTime[0];		//小时
			var ThisDay_Minutes = nowTime[1];		//分钟
			var ThisDay_Seconds = nowTime[2];		//秒
			*/


			//分解时间字符串2
			NeedChangTimes = $.trim(NeedChangTimes);
			var NeedChangedateparam	= NeedChangTimes.split(SplitChart);
			var nowDate_C			=NeedChangedateparam[0].split("-");
			var nowTime_C			=NeedChangedateparam[1].split(":");
			var Str1 = NeedChangedateparam[0].replace(/-/g,"/");
			var NeedChangeDay_Year		= nowDate_C[0];		//年份
			var NeedChangeDay_Month		= nowDate_C[1];		//月份
			var NeedChangeDay_Data		= nowDate_C[2];	//天
			var NeedChangeDay_Hours		= nowTime_C[0];		//小时
			var NeedChangeDay_Minutes	= nowTime_C[1];		//分钟
			var NeedChangeDay_Seconds	= nowTime_C[2];		//秒

			
			//var Timesnow	= ThisDay_Month+"-"+ThisDay_Data+"-"+ThisDay_Year+" "+ThisDay_Hours+":"+ThisDay_Minutes+":"+ThisDay_Seconds;
			//var TimesChange = NeedChangeDay_Month.toString()+"-"+NeedChangeDay_Data.toString()+"-"+NeedChangeDay_Year.toString()+" "+NeedChangeDay_Hours.toString()+":"+NeedChangeDay_Minutes.toString()+":"+NeedChangeDay_Seconds.toString();
			var TimesChange_ffandie = NeedChangeDay_Month.toString()+"/"+NeedChangeDay_Data.toString()+"/"+NeedChangeDay_Year.toString()+" "+NeedChangeDay_Hours.toString()+":"+NeedChangeDay_Minutes.toString()+":"+NeedChangeDay_Seconds.toString();
			
			//alert(nowDate_C[1]);



			//这里需要注意：在FF下只能用"2/2/2009 12:50:00" 这样的格式进行比较
			var TimesChangeday = new Date(TimesChange_ffandie);
			var DyMilli = 1000*60*60*24;    
			var ChangeValue =(Date.parse(new Date())-Date.parse(TimesChangeday))/DyMilli;	//相差的天数

			


			var return_text = "";
			
			if(ChangeValue>365){
				return_text = "一年前";
			}else if(ChangeValue<=365 && ChangeValue>=30){
				var m = parseInt(ChangeValue/30);
				if(m<=0) m=1;
				return_text = m+"月前";
			}else if(ChangeValue<30 && ChangeValue>=1){
				if(ChangeValue!=15)	return_text = parseInt(ChangeValue)+"天前";	
				else return_text = "半月前";				
			}else if(ChangeValue<1){
				var ChangeValue_h	= ChangeValue*24;				//相差多少小时
				if(ChangeValue_h>=1){
					 return_text = parseInt(ChangeValue_h)+"小时前";
				}else if(ChangeValue_h<1){
					 var fengtimes = parseInt(ChangeValue_h*60);
					 if(fengtimes>0){
						 return_text = fengtimes+"分钟前";
					 }else {
						 var ChangeValue_s	= parseInt(ChangeValue*24*3600);			//相差多少秒
						 if(ChangeValue_s>0)  return_text = ChangeValue_s+"秒前";
						 else return_text = "1秒前";
					 }
				}
			}
			return return_text;
		},


		//比较时间 格式 yyyy-mm-dd hh:mi:ss	 
		Tjs_CompTime:function(beginTime,endTime){

			/*
				beginTime		比较的时间一
				endTime			比较的时间二
				如果 endTime>beginTime 返回1
				如果 endTime<beginTime 返回-1
				如果 endTime==beginTime 返回0
				其它情况返回exception

				用法：$.Tjs_CompTime("2008-05-10 12:30:22","2008-01-02 12:23:22");
				注意时间的格式
			
			*/

			if(typeof(beginTime)=="undefined" || beginTime==""){
				alert("比较的第一个时间不能为空");
				return false;
			}
			if(typeof(endTime)=="undefined" || endTime==""){
				alert("比较的第二个时间不能为空");
				return false;
			}
			
			var begintemp = beginTime.split(" ");
			var endtimesemp = endTime.split(" ");

			
			var beginTimes_array	=	begintemp[0].split("-");
			var endTimes_array	=	endtimesemp[0].split("-");
			beginTime	=	parseInt(beginTimes_array[1])+'/'+parseInt(beginTimes_array[2])+'/'+parseInt(beginTimes_array[0])+' '+begintemp[1];
			endTime		=	endTimes_array[1].toString()+'/'+endTimes_array[2].toString()+'/'+endTimes_array[0].toString()+' '+endtimesemp[1];
			//alert(beginTime + " | " + endTime);
			var beginTime_date = new Date(beginTime);
			var endTime_date = new Date(endTime);
			var a =(Date.parse(endTime_date)-Date.parse(beginTime_date))/3600/1000;
			//alert(beginTime_date + " = " + Date.parse(endTime_date) + "|" + endTime_date + "|"  + a);
			

			if(a<0){
				return -1;
			}else if (a>0){
				return 1;
			}else if (a==0){
				return 0;
			}else{
				return 'exception'
			}
		},

		//获取鼠标坐标函数 Tjs_MouseEvent 
		Tjs_MouseEvent:function() {
			var x = event.clientX
			var y = event.clientY
			return Array(x,y);
		},
		
		//ＴＩＰ操作
		//方法：$('#触发事件对象名称').bind('mouseover',function(){$.Tjs_mousemove_fun('层ＩＤ');}).bind('mouseout',function(){$.Tjs_mouseout_fun('层ＩＤ');});
		Tjs_mousemove_fun:function(Objectname,divoffset_x,divoffset_y){
			if(typeof(divoffset_x)=="undefined" || divoffset_x==""){
				var divoffset_x=5;
			}
			if(typeof(divoffset_y)=="undefined" || divoffset_y==""){
				var divoffset_y=5;
			}
			var mouse = $.Tjs_MouseEvent();//计算显示层的位置
			var BodyWidth = $.Tjs_getBodyWidth();//得到页面的宽  $.Tjs_getCookie('uin').replace(/^o0*/, ""); 
			var ObjectWidth = $('#'+Objectname).css('width').replace(/px*/, "");

			var leftnumber = mouse[0]+divoffset_x;//左边距离
			//如果计算出来的左边距离太大，大于了页面宽度，则重新定位
			if(leftnumber+parseInt(ObjectWidth) >=BodyWidth){
				leftnumber = parseInt(BodyWidth) - parseInt(ObjectWidth) - 100;
			}

			var toppos	=(mouse[1]+divoffset_y)+"px";
			var leftpos	=(leftnumber)+"px";



			$('#'+Objectname).css({top:toppos,left:leftpos,position:'absolute'});
			$('#'+Objectname).fadeIn("slow");
		},

		Tjs_mouseout_fun:function (Objectname){
			$('#'+Objectname).fadeOut("slow");
		},

		//页面中专长的数据处理HTML specialty_desc speciality   ------针对活动发起页面的JS
		Tjs_specialityToHtml:function(ObjectElementId,ObjectElementname,HtmlObject,OtherValue){
			if(typeof(ObjectElementId)=="undefined" || ObjectElementId==""){
				var ObjectElementId='speciality';
			}

			if(typeof(ObjectElementname)=="undefined" || ObjectElementname==""){
				var ObjectElementname=ObjectElementId;
			}

			if(typeof(HtmlObject)=="undefined" || HtmlObject==""){
				var HtmlObject='';
			}
			if(typeof(OtherValue)=="undefined" || OtherValue==""){
				var OtherValue='';
			}

			if(specialty_desc.length<=0) return false;

			

			var str_specialityhtml = "";
			for(var i=0;i<specialty_desc.length;i++){
				//str_specialityhtml+="<p><label><input type='checkbox' name='speciality' id='speciality' value='"+specialty_desc[i][0]+"'/>"+specialty_desc[i][1]+"</label>";
				//<p class='other'> <label><input name='specialty[]' type='checkbox' class='other' id='specialty' value='13' />其它</label><input id='other_text_input' class='other_text_input' type='text' name='specialty_other'/></p>

				if(specialty_desc[i][0]=="*" && specialty_desc[i][1] =="其它"){
					if(OtherValue!="") var desc_check = " checked"; else var desc_check="";
					//str_specialityhtml+="<p><label><input type='checkbox' name='"+ObjectElementId+"' id='"+ObjectElementname+"' value='"+specialty_desc[i][0]+"' "+desc_check+"/>"+specialty_desc[i][1]+"&nbsp;<input type='text' name='"+ObjectElementId+"_other' id='"+ObjectElementId+"_other' value='"+OtherValue+"' style='border:#999999 1px SOLID; width:100px'/></label>";
					str_specialityhtml+="<p class='other'><label><input type='checkbox' class='other' name='"+ObjectElementname+"' id='"+ObjectElementId+"' value='"+specialty_desc[i][0]+"' "+desc_check+"/>"+specialty_desc[i][1]+"</label><input type='text' name='"+ObjectElementId+"_other' id='"+ObjectElementId+"_other' value='"+OtherValue+"' class='other_text_input' maxlength='32'/></label>";
				
				}else{
					str_specialityhtml+="<p><label><input type='checkbox' name='"+ObjectElementname+"' id='"+ObjectElementId+"' value='"+specialty_desc[i][0]+"'/>"+specialty_desc[i][1]+"</label>";
				}
				
				i++;
				if(i>=specialty_desc.length-1){	str_specialityhtml+="</p>"; break;}
				
				if(specialty_desc[i][0]=="*" && specialty_desc[i][1] =="其它"){
					if(OtherValue!="") var desc_check = " checked"; else var desc_check="";
					//str_specialityhtml+="<p><label><input type='checkbox' name='"+ObjectElementId+"' id='"+ObjectElementname+"' value='"+specialty_desc[i][0]+"' "+desc_check+"/>"+specialty_desc[i][1]+"&nbsp;<input type='text' name='"+ObjectElementId+"_other' id='"+ObjectElementId+"_other' value='"+OtherValue+"' style='border:#999999 1px SOLID; width:100px'/></label>";
					str_specialityhtml+="<p class='other'><label><input type='checkbox' class='other' name='"+ObjectElementname+"' id='"+ObjectElementId+"' value='"+specialty_desc[i][0]+"' "+desc_check+"/>"+specialty_desc[i][1]+"</label><input type='text' name='"+ObjectElementId+"_other' id='"+ObjectElementId+"_other' value='"+OtherValue+"' class='other_text_input' maxlength='32'/></label>";
				}else{
					str_specialityhtml+="<label><input type='checkbox' name='"+ObjectElementname+"' id='"+ObjectElementId+"' value='"+specialty_desc[i][0]+"'/>"+specialty_desc[i][1]+"</label></p>";
				}
			}

			//alert(str_specialityhtml);
			if(HtmlObject!="") $('#'+HtmlObject).html(str_specialityhtml);
			else document.write(str_specialityhtml);
		},


		//页面中专长的数据处理显示到页面上，查看状态 
		Tjs_specialityshowinfopage:function(HtmlObject,ValueString,OtherValue,SplitChart){
			if(typeof(HtmlObject)=="undefined" || HtmlObject==""){
				var HtmlObject='';
			}
			if(typeof(OtherValue)=="undefined" || OtherValue==""){
				var OtherValue='';
			}
			if(typeof(SplitChart)=="undefined" || SplitChart==""){
				var SplitChart=';';
			}
			if(specialty_desc.length<=0) return false;

			var valuearray = ValueString.split(',');
			if(valuearray.length<=0 && OtherValue=="") return false;
			//alert(valuearray);
			var str_specialityhtml = "";
			for(var i=0;i<specialty_desc.length;i++){
				//alert($.inArray(specialty_desc[i][0],valuearray));
				if(specialty_desc[i][0]=="") continue;

				if($.inArray(specialty_desc[i][0],valuearray) !=-1){					
					str_specialityhtml+=""+specialty_desc[i][1]+SplitChart;
				}else{
					continue;
				}
			}

			if(OtherValue!=""){
				str_specialityhtml+=OtherValue;
			}


			if(HtmlObject!="") $('#'+HtmlObject).append(str_specialityhtml);
			else document.write(str_specialityhtml);
		},
		
		//对ＧＢ2312字符串进行截取
		/*
		@ str		需要处理的字符串，注意：ＧＢ2312形
		@ len		截取的长度
		@ DianTrue	是否需要点	
		*/
		Tjs_Intercept_str:function (str,len,DianTrue)
		{
			if(typeof(str)=="undefined" || str==""){
				var str='';
			}
			if(typeof(len)=="undefined" || len==""){
				var len=0;
			}
			
			if(typeof(DianTrue)=="undefined"){
				var DianTrue=true;
			}
			
			if(str=="" || len<=0) return str;
			

			var strlen = 0; 
			var s = "";
			for(var i = 0;i < str.length;i++)
			{
				if(str.charCodeAt(i) > 128)
					strlen += 2;
				else 
					strlen++;

				s += str.charAt(i);

				if(strlen >= len){ 
					if(DianTrue){ 
						return s + "...";
					}
					else
					{
						return s;
					}
				}
			}
			return s;
		},
		
		//定时将页面转向某个地址
		/*
		Timesnum		多长时间进行转向 单位：秒  默认为5秒
		Pageurl			地址		地址为空的时候不进行操作
		Timetextobject	需要时间变动的时间文本对像
		*/

		Tjs_Pagegotourl:function(Timesnum,Pageurl,Timetextobject){
			if(typeof(Timesnum)=="undefined" || Timesnum==""){
				var Timesnum=5;
			}
			if(typeof(Pageurl)=="undefined" || Pageurl==""){
				var Pageurl = "";
				return false;
			}
			if(typeof(Timetextobject)=="undefined" || Timetextobject==""){
				var Timetextobject='';
			}


			Tjs_PageGotoMinnum			= Timesnum;

			if(Timetextobject==''){ 
				setTimeout("window.location='"+Pageurl+"';",Timesnum*1000);
			}else if(Timetextobject!='') {
				setInterval("$.Tjs_Pagegotourlinterval('"+Pageurl+"','"+Timetextobject+"');",1000);
			}
		},

		Tjs_Pagegotourlinterval:function(Pageurl,Timetextobject){
			Tjs_PageGotoMinnum--;
			$('#'+Timetextobject).text(Tjs_PageGotoMinnum);
			if(Tjs_PageGotoMinnum<=0) 
				window.location=Pageurl;
		},




		/* 页卡设置函数区   --- BEGIN*/
		Tjs_PageClip_Focus_InitFun:function(divobject){
			var index =$(divobject).data('initindex');
			var focusclassname		= $(divobject).data('focusclassname');
			var lostfocusclassname	= $(divobject).data('lostfocusclassname');

			if(index=='undefined' || !index){
				var index = 0;
			}
			if(lostfocusclassname=='undefined'){
				var lostfocusclassname = '';
			}
			if(lostfocusclassname=='undefined'){
				var lostfocusclassname = '';
			}

			$(divobject).find('a').removeClass().addClass(lostfocusclassname);
			$(divobject).find('a').eq(index).removeClass().addClass(focusclassname);
		},
		
		Tjs_PageClip_Focus_Fun:function(object){
		  var parentobjec = $(object).parent();
		  var thisindex = $(parentobjec).find("a").index(object);
		  var listinfodivid 	= $(parentobjec).data('dividname');	 
		  var listinfomaxnum 	= $(parentobjec).data('listinfomaxnum');	 
		  var focusclassname	= $(parentobjec).data('focusclassname');
		  var lostfocusclassname	= $(parentobjec).data('lostfocusclassname');

		  $(parentobjec).find("a").removeClass().addClass(lostfocusclassname);
		  $(parentobjec).data('initindex',thisindex);	 
		  $(object).addClass(focusclassname);
		  
		  $.Tjs_InitListInfoDiv($(parentobjec).attr('id'),listinfodivid,thisindex,listinfomaxnum);
		},
		
		Tjs_PageClip_LostFocus_Fun:function(object){
		  var parentobjec = $(object).parent();
		  var lostfocusclassname	= $(parentobjec).data('lostfocusclassname');
		  $(parentobjec).find("a").removeClass().addClass(lostfocusclassname);
		},
		
		Tjs_InitListInfoDiv:function(listmenuobject,dividname,index,maxnum){
			for(var i=0;i<maxnum;i++){
				$('#'+dividname+i.toString()).hide();
			}
			$('#'+dividname+index.toString()).show();
			$('#'+listmenuobject).data('dividname',dividname);
			$('#'+listmenuobject).data('listinfomaxnum',maxnum);
			$.Tjs_PageClip_Focus_InitFun($('#'+listmenuobject));
		},


		/*
		Init_ListInfoObject_Fun 初始化一个页卡
		objectelemetname		页卡层对象ＩＤ名
		listdivobjectname		页卡对应显示层的层固定ＩＤ
		Maxnum					页卡最大数
		initindex				页面初始化显示页
		focusclassname			设置得到焦点的样式
		lostfocusclassname		设置失去焦点的样式，默认为空
		使用：$.Tjs_Init_ListInfoObject_Fun('paihangbang_div_id','listinfodivid',4,0,'on','');
		*/

		Tjs_Init_ListInfoObject_Fun:function(objectelemetname,listdivobjectname,Maxnum,initindex,focusclassname,lostfocusclassname){
			if(typeof(objectelemetname)=="undefined" || objectelemetname==""){alert('页卡触发点设置有误');return false;}
			if(typeof(listdivobjectname)=="undefined" || listdivobjectname==""){alert('页卡显示区域设置有误');return false;}
			if(typeof(Maxnum)=="undefined" || Maxnum==""){alert('页卡最大数量有误');return false;}
			if(typeof(focusclassname)=="undefined"){alert('页卡选中的样式有误，必须设置');return false;}
			if(typeof(lostfocusclassname)=="undefined"){var lostfocusclassname ='';return false;}
			if(typeof(initindex)=="undefined" || initindex=="" || initindex<0 ){var initindex =0;}

			$('#'+objectelemetname).data('focusclassname',focusclassname);
			$('#'+objectelemetname).data('lostfocusclassname',lostfocusclassname);
			$('#'+objectelemetname).data('initindex',initindex);
			$.Tjs_InitListInfoDiv(objectelemetname,listdivobjectname,initindex,Maxnum);
			$('#'+objectelemetname).find("a").bind('mouseover',function(){$.Tjs_PageClip_Focus_Fun($(this));});
			$('#'+objectelemetname).find("a").bind('mouseout',function(){$.Tjs_PageClip_LostFocus_Fun($(this));});
			$('#'+objectelemetname).bind('mouseout',function(){$.Tjs_PageClip_Focus_InitFun($(this));});
		},
		/* 页卡设置函数结束  --- END*/
		


		/* 分页初始化代码*/
		Tjs_NextPageClassInit:function(DateTotalNum,Pagenum_Total,Pageno,Meth,PageurlParaeter,RePageSizeNum,PageObjectName){
				/*
				DateTotalNum	多少条数据记录
				Pagenum_Total	总共有多少页
				Pageno			当前页
				Meth			==GET 为href方法翻页
								==POST 为OnClike方法翻页
				PageurlParaeter	= 需要加上地址URL里的参数字符串
				RePageSizeNum	= 重定义每页显示的数据数量
				PageObjectName	= 分页代码的对象ＩＤ
				*/	
				Meth = 'GET';
				var ThispageUrl			="http://"+window.location.host+window.location.pathname; //当前不带参数的页面地址

				if(typeof(RePageSizeNum)=="undefined") RePageSizeNum = 0;
					if(RePageSizeNum>0) PageSizeNum = RePageSizeNum;

				if(!Pageno) Pageno=1;
				
				if(Pagenum_Total==''){
					var Total_Pagenum = parseInt(DateTotalNum/PageSizeNum); //总页数
					if(Total_Pagenum==0) 
						Total_Pagenum=1;
					else
						if((DateTotalNum%PageSizeNum)>0) Total_Pagenum++;
				}else{
					Total_Pagenum= Pagenum_Total;
				}
				
				
				if(Total_Pagenum==1) {
					var PageNext_str = "";
					PageNext_str+="<div class='pagelist'>当前只有1页</div>";
					$('#'+PageObjectName).html(PageNext_str); //如果只有一页，则不显示分页
					return false;
				}
				
				if(Pageno>Total_Pagenum) Pageno=Total_Pagenum;	//如果跳转的页面数量过大，就转向最后一页

				if(!PageObjectName) Meth="GET";
				



				/*刷新页面更新翻页内容 2009-1-7  记录：Get方法有改成功，Post的方法没有改动*/

				var PageNext_str ="";
				PageNext_str+="<div class=\"pagelist\">";

				PageNext_str+=Pageno+"/"+Total_Pagenum+"页&nbsp;";
				if(Pageno>1) 
					  PageNext_str+="<a href='"+ThispageUrl+"?JSPAGENO=1"+PageurlParaeter+"'>首页</a>&nbsp;";
				var topnext = Pageno-1;

				if(topnext>0) 
					  PageNext_str+="<a href='"+ThispageUrl+"?JSPAGENO="+topnext+PageurlParaeter+"'>上一页</a>&nbsp;";

				PageNext_str+="<span class=\"pagenum\">";
				for(var i=1;i<=Total_Pagenum;i++){
					if(i==Pageno){
						PageNext_str+="<span>"+i+"</span>&nbsp;";
					}else{
						PageNext_str+="<a href='"+ThispageUrl+"?JSPAGENO="+i+PageurlParaeter+"'>"+i+"</a>&nbsp;";
					}
				}
				PageNext_str+="</span>";


				var nextpageno=Pageno+1;
				if(nextpageno<=Total_Pagenum)
					PageNext_str+="<a href='"+ThispageUrl+"?JSPAGENO="+nextpageno+PageurlParaeter+"'>下一页</a>&nbsp;";

				if(Pageno<Total_Pagenum) 
					PageNext_str+="<a href='"+ThispageUrl+"?JSPAGENO="+Total_Pagenum+PageurlParaeter+"'>尾页</a>&nbsp;";

				PageNext_str+="</div>";

				$('#'+PageObjectName).html(PageNext_str);
		}, // END FUN




		/* 无提示关闭页面*/
		Tjs_ClosePage:function(){
			window.opener=null;
			window.open('','_self','');
			window.close();
		},
		//window.opener=null;window.open('','_self','');window.close();







		/**
		 * 类型检查
		 */
		Tjs_Fis:function(v, s) {
			switch (s) {
				case 'integer':
					return typeof v === 'number' || (typeof v == 'string' && /^\d+$/.test(v));
				case 'empty':
					return v === null || v === undefined || v === '' || v === 0;
				case 'object':
					//非null非undefined的object，包含array
					return v !== null && typeof v == 'object';
				case 'array':
					return typeof v == 'object' && v !== null && typeof v.slice == 'function';
				default:
					return (typeof v == 'object' && v.constructor == s) || typeof v == s;
			}
			return false;
		},

		/**
		 * 判断是否为null、undefined、空字符串、0
		 */
		Tjs_Fempty:function(v) {
			return $.Tjs_Fis(v, 'empty');
		},

		Tjs_Fid:function(id) {
			if(id && (id.tagName || id.item)) return id;
			return document.getElementById(id);
		},




	/**
	 * 弹出框
	 * @param {String} winid
	 * @param {String} content
	 * @param {Object} properties
	 * properties属性内容：
	 * {
		 width宽度0为默认,
		 height高度0为默认,
		 tiptitle弹出框标题,
		 onsubmit确定动作,
		 onclose关闭动作,
		 oncacel取消操作,
		 winclass弹出框额外样式,
		 contentclass弹出框内容额外样式,
		 okbtntxt确定按钮文字,
		 canbtntxt取消按钮文字,
		 btns按钮显示方式,
		 exthtml额外操作(样式只支持链接)};
		 其中btns为0 无按钮 1 确定 2 取消 3 确定+取消
	 */
	  Tjs_showtips:function(winid, content, properties){
		if(!properties || typeof properties!='object') properties = {};
		var pr = properties;
		winid = winid || ('$_Gytip__$'+Math.floor(Math.random()*100));
		var win = $.Tjs_Fid(winid);
		if($.Tjs_Fempty(win)){
			win = document.createElement('div');
			win.id = winid;
			win.className = pr.winclass||'prompt';
			win.style.position = 'absolute';
			win.style.zIndex = 101;
			win.style.display = 'none';
			document.body.insertBefore(win, document.body.firstChild);
		}
		
		
		if(pr.width>0) win.style.width = pr.width+'px';
		if(pr.height>0) win.style.height = pr.height+'px';
		
		if(typeof pr.onsubmit=='function') win.cOnsubmit = pr.onsubmit;
		else win.cOnsubmit = function(){document.getElementById(winid).style.display='none';};
		if(typeof pr.onclose=='function') win.cOnclose = pr.onclose;
		else win.cOnclose = function(){document.getElementById(winid).style.display='none';};
		if(typeof pr.oncancel=='function') win.cOncancel = pr.oncancel;
		else win.cOncancel = function(){document.getElementById(winid).style.display='none';};
		
		//var htm = ['<div id="'+winid+'" class="prompt">'];
		var htm =['<div class="t" id="'+winid+'_title"><a href="javascript:$.Tjs_TipwinClick(\''+winid+'\',\'close\')"><img style=\'margin-bottom:-30px\' src="http://mat1.gtimg.com/gongyi/npoimages/close.jpg" width="32" height="32" /></a>'+(pr.tiptitle||'温馨提示：')+'</div>'];
		htm.push('<p id="'+winid+'_content">'+(content||'')+'</p>');
		if((pr.btns&&pr.btns!=0) || !!pr.exthtml){
			htm.push('<div class="btn"> <span>');
			if(pr.exthtml) htm.push(pr.exthtml);
			if((pr.btns&1)==1) {
				htm.push('<input onclick="$.Tjs_TipwinClick(\''+winid+'\',\'submit\')" style="margin-right:30px;"  value="'+(pr.okbtntxt||'确定')+'"/>');
			}
			if((pr.btns&2)==2) {
				htm.push('<input onclick="$.Tjs_TipwinClick(\''+winid+'\',\'cancel\')" value=\"'+(pr.canbtntxt||'取消')+'\" />');
			}
			htm.push('</div>');
		}
		
		win.innerHTML = htm.join('');
		$('#'+winid).Tjs_FloatDiv('middle');
		win.style.display = 'block';
	},


	/**
	 * 弹出框
	 * @param {String} winid
	 * @param {String} content
	 * @param {Object} properties
	 * properties属性内容：
	 * {
		 width宽度0为默认,
		 height高度0为默认,
		 tiptitle弹出框标题,
		 onsubmit确定动作,
		 onclose关闭动作,
		 oncacel取消操作,
		 winclass弹出框额外样式,
		 contentclass弹出框内容额外样式,
		 okbtntxt确定按钮文字,
		 canbtntxt取消按钮文字,
		 btns按钮显示方式,
		 exthtml额外操作(样式只支持链接)};
		 其中btns为0 无按钮 1 确定 2 取消 3 确定+取消
	 */
	  Tjs_showtipsforactivity:function(winid, content, properties){
		if(!properties || typeof properties!='object') properties = {};
		var pr = properties;
		winid = winid || ('$_Gytip__$'+Math.floor(Math.random()*100));
		var win = $.Tjs_Fid(winid);
		if($.Tjs_Fempty(win)){
			win = document.createElement('div');
			win.id = winid;
			win.className = pr.winclass||'prompt';
			win.style.position = 'absolute';
			win.style.zIndex = 101;
			win.style.display = 'none';
			document.body.insertBefore(win, document.body.firstChild);
		}
		
		
		if(pr.width>0) win.style.width = pr.width+'px';
		if(pr.height>0) win.style.height = pr.height+'px';
		
		if(typeof pr.onsubmit=='function') win.cOnsubmit = pr.onsubmit;
		else win.cOnsubmit = function(){document.getElementById(winid).style.display='none';};
		if(typeof pr.onclose=='function') win.cOnclose = pr.onclose;
		else win.cOnclose = function(){document.getElementById(winid).style.display='none';};
		if(typeof pr.oncancel=='function') win.cOncancel = pr.oncancel;
		else win.cOncancel = function(){document.getElementById(winid).style.display='none';};
		
		//var htm = ['<div id="'+winid+'" class="prompt">'];
		var htm =['<div class="t" id="'+winid+'_title"><a href="javascript:$.Tjs_TipwinClick(\''+winid+'\',\'close\')"><img style=\'margin-bottom:-30px\' src="http://mat1.gtimg.com/gongyi/npoimages/close.jpg" width="32" height="32" /></a>'+(pr.tiptitle||'温馨提示：')+'</div>'];
		htm.push('<p id="'+winid+'_content">'+(content||'')+'</p>');
		if((pr.btns&&pr.btns!=0) || !!pr.exthtml){
			htm.push('<div class="btn"> <span>');
			if(pr.exthtml) htm.push(pr.exthtml);
			if((pr.btns&1)==1) {
				htm.push('<input onclick="$.Tjs_TipwinClick(\''+winid+'\',\'submit\')" style="margin-right:30px;"  value="'+(pr.okbtntxt||'确定')+'"/>');
			}
			if((pr.btns&2)==2) {
				htm.push('<input onclick="$.Tjs_TipwinClick(\''+winid+'\',\'cancel\')" value=\"'+(pr.canbtntxt||'取消')+'\" />');
			}
			htm.push('</div>');
		}
		
		win.innerHTML = htm.join('');
		$('#'+winid).Tjs_FloatDiv('middle2');
		win.style.display = 'block';
	},



	Tjs_showtips_forphoto:function(winid, content, properties){	
		if(!properties || typeof properties!='object') properties = {};
		var pr = properties;
		winid = winid || ('$_Gytip__$'+Math.floor(Math.random()*100));
		var win = $.Tjs_Fid(winid);
		if($.Tjs_Fempty(win)){
			win = document.createElement('div');
			win.id = winid;
			win.className = pr.winclass||'promptforphoto';
			win.style.position = 'absolute';
			win.style.zIndex = 101;
			win.style.display = 'none';
			document.body.insertBefore(win, document.body.firstChild);
		}
		
		
		if(pr.width>0) win.style.width = pr.width+'px';
		if(pr.height>0) win.style.height = pr.height+'px';
		
		
		if(typeof pr.onsubmit=='function') win.cOnsubmit = pr.onsubmit;
		else win.cOnsubmit = function(){document.getElementById(winid).style.display='none';};
		if(typeof pr.onclose=='function') win.cOnclose = pr.onclose;
		else win.cOnclose = function(){document.getElementById(winid).style.display='none';};
		if(typeof pr.oncancel=='function') win.cOncancel = pr.oncancel;
		else win.cOncancel = function(){document.getElementById(winid).style.display='none';};

		var htm =['<div class="t" id="'+winid+'_title">'+(pr.tiptitle||'温馨提示：')+'<a href="javascript:$.Tjs_TipwinClick(\''+winid+'\',\'close\')"><img src="http://mat1.gtimg.com/gongyi/npoimages/close.jpg" width="32" height="32" /></a></div>'];
		htm.push('<p id="'+winid+'_content">'+(content||'')+'</p>');
		if((pr.btns&&pr.btns!=0) || !!pr.exthtml){
			htm.push('<div class="btn"> <span>');
			if(pr.exthtml) htm.push(pr.exthtml);
			if((pr.btns&1)==1) {
				htm.push('<input onclick="$.Tjs_TipwinClick(\''+winid+'\',\'submit\')" style="margin-right:1%;"  value="'+(pr.okbtntxt||'确定')+'"/>');
			}
			if((pr.btns&2)==2) {
				htm.push('<input onclick="$.Tjs_TipwinClick(\''+winid+'\',\'cancel\')" value=\"'+(pr.canbtntxt||'取消')+'\" />');
			}
			htm.push('</div>');
		}
		
		win.innerHTML = htm.join('');
		$('#'+winid).Tjs_FloatDiv('middle');
		win.style.display = 'block';	
	},


	Tjs_TipwinClick:function(winid, op, onlyclose){
		if(typeof onlyclose == "undefined") onlyclose=null;
		if(op!='close'&&op!='submit'&&op!='cancel') return;
		var win = $.Tjs_Fid(winid);
		if($.Tjs_Fempty(win)) return;
		var passed = true;
		if(!onlyclose && typeof win['cOn'+op]=='function') {
			passed = win['cOn'+op]();
		}
		
		if(passed!==false) {
			//FunsetModal(winid+'_modal_$');
			win.posited=false;
			win.style.display = 'none';
		}
		
	},

	
	//找到标签name对像
	Tjs_FtagName:function(tagname) {
		return document.getElementsByTagName(tagname);
	},

	//插入样式文件
	Tjs_insertCSS:function(url) {
		if (!url) return;
		var l = $.Tjs_FtagName('link');
		for (var i in l) {
			if (l[i].href == url) return;
		}
		var css = document.createElement("link");
		css.rel = 'stylesheet';
		css.media = 'screen';
		css.type = "text/css";
		css.href = url;
		$.Tjs_FtagName('HEAD').item(0).appendChild(css);
	}


























});


 









/*  以下为 fn 扩展*/
/*调用：
1 无参数调用：默认浮动在右下角
$("#id").Tjs_FloatDiv();

2 内置固定位置浮动
//右下角
$("#id").Tjs_FloatDiv("rightbottom");
//左下角
$("#id").Tjs_FloatDiv("leftbottom");
//右下角
$("#id").Tjs_FloatDiv("rightbottom");
//左上角
$("#id").Tjs_FloatDiv("lefttop");
//右上角
$("#id").Tjs_FloatDiv("righttop");
//居中
$("#id").Tjs_FloatDiv("middle");

3 自定义位置浮动
$("#id").Tjs_FloatDiv({left:"10px",top:"10px"});
以上参数，设置浮动层在left 10个像素,top 10个像素的位置
*/

jQuery.fn.Tjs_FloatDiv=function(location_xy){
	//ie6要隐藏纵向滚动条

	var isIE6=false;
	if($.browser.msie && $.browser.version=="6.0"){
		//$("html").css("overflow-x","auto").css("overflow-y","hidden");
		//$("body").css("overflow-x","auto").css("overflow-y","hidden");
		isIE6=true;
	};
	
	//alert(isIE6);
	/*
	$("body").css({
		margin:"0px",
		padding:"15px 10px 0 10px",
		border:"0px",
		height:"100%",
		overflow:"auto"
	});
	*/


	return this.each(function(){
		var loc;//层的绝对定位位置
		if(location_xy==undefined || location_xy.constructor == String){
			switch(location_xy){
				case("rightbottom")://右下角
					loc={right:"0px",bottom:"0px"};
					break;
				case("leftbottom")://左下角
					loc={left:"0px",bottom:"0px"};
					break;	
				case("lefttop")://左上角
					loc={left:"0px",top:"0px"};
					break;
				case("righttop")://右上角
					loc={right:"0px",top:"0px"};
					break;
				case("middle")://居中
					var l=0;//居左
					var t=0;//居上
					var windowWidth,windowHeight;//窗口的高和宽
					//取得窗口的高和宽
					if (self.innerHeight) {
						windowWidth=self.innerWidth;
						windowHeight=self.innerHeight;
					}else if (document.documentElement&&document.documentElement.clientHeight) {
						windowWidth=document.documentElement.clientWidth;
						windowHeight=document.documentElement.clientHeight;
					} else if (document.body) {
						windowWidth=document.body.clientWidth;
						windowHeight=document.body.clientHeight;
					}
						
					//alert(windowHeight);

					var scrolltop =$.Tjs_getPageScroll(); // $.Tjs_getPageScroll();
					l=windowWidth/2-$(this).width()/2;
					//t=windowHeight/2-$(this).height()/2;//+$.Tjs_getPageScroll();
					t = windowHeight/2 -$(this).height()/2 + scrolltop;		
					loc={left:l+"px",top:t+"px"};
					break;
				case("middle2")://居中 距离浏览器上边缘x像素
					var l=0;//居左
					var t=0;//居上
					var windowWidth,windowHeight;//窗口的高和宽
					//取得窗口的高和宽
					if (self.innerHeight) {
						windowWidth=self.innerWidth;
						windowHeight=self.innerHeight;
					}else if (document.documentElement&&document.documentElement.clientHeight) {
						windowWidth=document.documentElement.clientWidth;
						windowHeight=document.documentElement.clientHeight;
					} else if (document.body) {
						windowWidth=document.body.clientWidth;
						windowHeight=document.body.clientHeight;
					}
						

					var scrolltop =$.Tjs_getPageScroll(); // $.Tjs_getPageScroll();
					l=windowWidth/2-$(this).width()/2;
					//t=windowHeight/2-$(this).height()/2;//+$.Tjs_getPageScroll();
					t = windowHeight/2 -$(this).height()/2 + scrolltop;
								
					t=document.body.clientHeight ;
					//alert();
					t=t-450;

					loc={left:l+"px",top:t+"px"};
					break;
				default://默认为右下角
					loc={right:"0px",bottom:"0px"};
					break;
			}
		}else{
			loc=location_xy;
		}
			
		//alert(loc.left+"----"+loc.top);

		// 获取所有层数，得到他们的zindex，取个最大的，然后设置成最大值+1
		var Tjs_CL_DivObjectArray = $("div").get().reverse(); 
		/*
		var Tjs_zIndex_aray = new Array();
		var Tjs_MaxzIndex_num =0;
		for(var i=0;i<Tjs_CL_DivObjectArray.length;i++){
			Tjs_zIndex_aray.push(Tjs_CL_DivObjectArray[i].style.zIndex);
			if(Tjs_MaxzIndex_num<Tjs_CL_DivObjectArray[i].style.zIndex) Tjs_MaxzIndex_num=Tjs_CL_DivObjectArray[i].style.zIndex;
		}
		var Tjs_FlostDivZindex = Tjs_MaxzIndex_num+1;
		*/
		var Tjs_zIndex_aray = new Array();
		var Tjs_MaxzIndex_num =0;
		for(var i=0;i<Tjs_CL_DivObjectArray.length;i++){
			if(Tjs_CL_DivObjectArray[i].style.zIndex!='auto' && Tjs_CL_DivObjectArray[i].style.zIndex!=''){
				Tjs_zIndex_aray.push(parseInt(Tjs_CL_DivObjectArray[i].style.zIndex));
				if(Tjs_MaxzIndex_num<parseInt(Tjs_CL_DivObjectArray[i].style.zIndex)) Tjs_MaxzIndex_num=parseInt(Tjs_CL_DivObjectArray[i].style.zIndex);
			}
		}
		var Tjs_FlostDivZindex = Tjs_MaxzIndex_num+1;


		$(this).css("position","absolute").css("z-index",Tjs_FlostDivZindex).css(loc);



		//if(isIE6){
			if(loc.right!=undefined){
				if($(this).css("right")==null || $(this).css("right")==""){
					$(this).css("right","18px");
				}
			}
			$(this).css("position","absolute");
		//}
	});
};










/* 表单验证 */
jQuery.fn.formcheck=function(){

	var formname =$(this).attr("id");//得到本form的ＩＤ
	if(typeof(formname)=="undefined" || !formname){
		alert("Form的ID属性没有设置，必须设置form的id");
		return false;
	}

	//得到某个表单下所有的Input控件
	var formobject_input = $("#"+formname+" input"); 
	//得到某个表单下所有的Select控件
	var formobject_select = $("#"+formname+" select"); 
	//得到某个表单下所有的Check控件
	var formobject_textarea = $("#"+formname+" textarea"); 

	/* 对check和radio需要进行　id&name相同处理。进行唯一*/
	
	//alert(formobject_select);

	/* 收集这个表单里所有控件的ＩＤ*/
	var FormInput_Text		=new Array(); //收集输入框ＩＤ
	var FormInput_Check		=new Array(); //收集选择项ＩＤ
	var FormInput_Radio		=new Array(); //收集单选项ＩＤ
	var FormInput_Button	=new Array(); //收集复选项ＩＤ
	var FormInput_Files		=new Array(); //收集表单的文件上传ＩＤ

	var type = "";
	var thisid = "";
	var msgid = "";
	for(var i=0;i<formobject_input.length;i++){
		type =$(formobject_input[i]).attr("type");
		thisid=$(formobject_input[i]).attr("id")?$(formobject_input[i]).attr("id"):$(formobject_input[i]).attr("name");
		msgid=$(formobject_input[i]).attr("msgid")?$(formobject_input[i]).attr("msgid"):"";
		//stype.toUpperCase()=="FILE" && srcTag.toUpperCase()=="INPUT"
		if(type.toUpperCase()=="TEXT"){
			FormInput_Text.push(thisid);
		}else if(type.toUpperCase()=="RADIO"){
			FormInput_Radio.push(thisid);
		}else if(type.toUpperCase()=="CHECKBOX"){
			FormInput_Check.push(thisid);
		}else if(type.toUpperCase()=="FILE"){
			//alert(thisid);
			FormInput_Files.push(thisid);
		}else if(type.toUpperCase()=="BUTTON" || type.toUpperCase()=="SUBMIT"){
			FormInput_Button.push(thisid);
		}
	}


	var FormInput_Select		=new Array(); //收集选择项ＩＤ
	for(var i=0;i<formobject_select.length;i++){
		thisid=$(formobject_select[i]).attr("id")?$(formobject_select[i]).attr("id"):$(formobject_select[i]).attr("name");
		msgid=$(formobject_select[i]).attr("msgid")?$(formobject_select[i]).attr("msgid"):"";
		FormInput_Select.push(thisid);
	}


	var FormInput_textarea		=new Array(); //收集文本框ＩＤ
	for(var i=0;i<formobject_textarea.length;i++){
		thisid=$(formobject_textarea[i]).attr("id")?$(formobject_textarea[i]).attr("id"):$(formobject_textarea[i]).attr("name");
		msgid=$(formobject_textarea[i]).attr("msgid")?$(formobject_textarea[i]).attr("msgid"):"";
		FormInput_textarea.push(thisid);
	}




	FormInput_Radio = $.Tjs_Arrayunique(FormInput_Radio); 
	FormInput_Check = $.Tjs_Arrayunique(FormInput_Check); 
	
	var FocusIdname = "";
	/*　检查文本输入框 */
	var checkinpu_text_flag = true;
	for(var i=0;i<FormInput_Text.length;i++){
		var result = $("#"+FormInput_Text[i]).data("Tjs_checkresult");
		if(typeof(result)=="undefined"){
			result = true;
		}
		//alert(result);
		if(!result){
			//alert(FormInput_Text[i]);
			if(FocusIdname=="") FocusIdname = FormInput_Text[i]
			$("#"+FormInput_Text[i]).blur();
			if(checkinpu_text_flag) checkinpu_text_flag = false;
		}
	}


	/*检查必须选择文件的FIELS控件 */
	var checkinpu_files_flag = true;
	for(var i=0;i<FormInput_Files.length;i++){
		var result = $("#"+FormInput_Files[i]).data("Tjs_checkresult");
		if(typeof(result)=="undefined"){
			result = true;
		}
		//alert(result);
		if(!result){
			if(FocusIdname=="") FocusIdname = FormInput_Files[i]
			$("#"+FormInput_Files[i]).keyup();
			if(checkinpu_files_flag) checkinpu_files_flag = false;
		}
	}




	

	/*if(!checkinpu_text_flag){
		alert("请检查注册信息，将必填项正确输入text!");
		return false;
	}*/

	//alert(FormInput_Select);
	
	/*　检查下拉选择项 */
	var checkinpu_select_flag = true;
	for(var i=0;i<FormInput_Select.length;i++){
		var result = $("#"+FormInput_Select[i]).data("Tjs_checkresult");
		if(typeof(result)=="undefined"){
			result = true;
		}
		if(!result){
			if(FocusIdname=="") FocusIdname = FormInput_Select[i]
			$("#"+FormInput_Select[i]).change();
			if(checkinpu_select_flag) checkinpu_select_flag = false;
		}
	}
	

	/*
	if(!checkinpu_select_flag){
		alert("请检查注册信息，将必填项正确输入select!");
		return false;
	}
	*/

	/*　检查复选框 */
	var checkinpu_check_flag = true;
	for(var i=0;i<FormInput_Check.length;i++){
		var checkobject = $("input[@name=" + FormInput_Check[i] + "]");
		//alert(checkobject.length);
		if(checkobject.length==1) var dataobject = checkobject;
		else  var dataobject = checkobject[0];
		
		var result = $(dataobject).data("Tjs_checkresult");
		if(typeof(result)=="undefined"){
			result = true;
		}
		//alert(result);
		if(!result){
			$(dataobject).click();
			if(checkinpu_check_flag) checkinpu_check_flag = false;
		}
	}

	/*if(!checkinpu_check_flag){
		alert("请检查注册信息，将必填项正确输入check!");
		return false;
	}*/

	/*　检查单选框 */
	var checkinpu_radio_flag = true;
	for(var i=0;i<FormInput_Radio.length;i++){
		var checkobject = $("input[@name=" + FormInput_Radio[i] + "]");
		if(checkobject.length==1) var dataobject = checkobject;
		else  var dataobject = checkobject[0];
		
		var result = $(dataobject).data("Tjs_checkresult");
		if(typeof(result)=="undefined"){
			result = true;
		}
		if(!result){
			$(dataobject).change();
			if(checkinpu_radio_flag) checkinpu_radio_flag = false;
		}
	}

	/*
	if(!checkinpu_radio_flag){
		alert("请检查注册信息，将必填项正确输入radio!");
		return false;
	}
	*/

	/*　检查文本输入textarea */
	var checkinpu_area_flag = true;
	for(var i=0;i<FormInput_textarea.length;i++){
		var result = $("#"+FormInput_textarea[i]).data("Tjs_checkresult");
		if(typeof(result)=="undefined"){
			result = true;
		}
		if(!result){
			if(FocusIdname=="") FocusIdname = FormInput_textarea[i]
			$("#"+FormInput_textarea[i]).keyup();
			if(checkinpu_area_flag) checkinpu_area_flag = false;
		}
	}

	/*
	if(!checkinpu_area_flag){
		alert("请检查注册信息，将必填项正确输入textarea!");
		return false;
	}
	*/
	
	//alert(checkinpu_text_flag+"--"+checkinpu_select_flag+"--"+checkinpu_check_flag+"--"+checkinpu_radio_flag+"--"+checkinpu_area_flag)
	//checkinpu_text_flag  checkinpu_select_flag checkinpu_check_flag checkinpu_radio_flag checkinpu_area_flag
	if(FocusIdname!='') $('#'+FocusIdname).focus();
	if(checkinpu_text_flag && checkinpu_select_flag && checkinpu_check_flag && checkinpu_radio_flag && checkinpu_area_flag && checkinpu_files_flag){
		return true;
	}else{
		return false;
	}

	//alert("表单检查通过!!!");
	//return false;
};




/* 控制变量初始化 */
jQuery.fn.setinfo=function(msgOptions){
	var setting = 
	{
		defaultvalue : "",				//默认的时候显示字符（只针对TEXT和textarea控制可用）
		defaultvalue_use :true,			//默认的时候显示字符是否可以使用（只针对TEXT和textarea控制可用）和 defaultvalue 配合使用
		defaultvalue_color : "#C3C3C3",	//字体颜色（只针对TEXT和textarea控制可用）
		defaultvalue_Bcolor : "#000000",//对象的原来字体颜色（只针对TEXT和textarea控制可用）
		empty :false,					//是否能为空 true 表示要判断不能为空，false可以为空
		textnumberalert :false,			//是否需要对text 和textarea的输入数据进行数字数量提示
		inputtype : "",					//正则表达式变量
		typemsg:"您输入的数据格式有误!",	//正则失败后的提示
		maxinputnum : -1,				//最大录入字符数  注，这里是以字符算的。中文是2个字符 有些UTF8的中文需要占3个字符
		initmsg:"",						//初始化时候的提示
		onblurmsg:"",					//失去焦点时候的提示语 --没用
		errmsg:"输入有误",				//报错的提示语，如必填的时候没有填，
		sussmsg:"输入正确",				//输入完成，正确后提示语
		msg_id:"",						//提示元素的ＩＤ	
		err_class:"reg err",
		fou_class:"reg tips",
		shw_class:"reg d_tips",
		sus_class:"reg yes",
		isinputformatflag:false			//录入的值是否充许录入半角，如果为真表示不能录入，一旦录入了半角字符将替换成空格
	};

	/*
			err_class:"onError",
			fou_class:"onFocus",
			shw_class:"onShow",
			sus_class:"onSuccess"


			reg d_tips
			reg tips
			reg err
			reg yes

	*/

	//$("div").data("blah", "hello");


	msgOptions = msgOptions || {};
	$.extend(setting, msgOptions);
	return this.each(function()
	{

		var thisid		= $(this).attr("id");
		var thisname	= $(this).attr("name");
		var msgid		= $(this).attr("initmsg");
		var thisvalue	= $(this).val();
		var stype		= this.type;
		var srcTag		= this.tagName;

		$(this).removeData("Tjs_checkresult"); 
		setting.defaultvalue_Bcolor=$(this).css("color");

		if(setting.msg_id!=""){
			var penwang = $(this);
			
			if((stype.toUpperCase()=="TEXT" && srcTag.toUpperCase()=="INPUT") || srcTag.toUpperCase()=="TEXTAREA"){
				
				if(setting.empty && $(penwang).val()=="")	$(this).data("Tjs_checkresult",false);
				else $(this).data("Tjs_checkresult",true);
				


				//alert(setting.sussmsg+"---------"+thisvalue);
				//初始化提示信息
				if(setting.msg_id!="" && setting.initmsg!="" && thisvalue==""){

					if(setting.defaultvalue!=""){
						$(this).val(setting.defaultvalue);
						if(!setting.defaultvalue_use) $(this).css("color",setting.defaultvalue_color);
						//$(this).select();
						$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.shw_class);
					}else{
						$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.shw_class);
					}


					
				}else if(setting.msg_id!="" && thisvalue!=""){
					
					
					if(setting.defaultvalue=="" && setting.defaultvalue_use){
						//初始化正则						
						if(setting.inputtype!="" && !$.Tjs_RegexpressRegExp($(penwang).val(),setting.inputtype)){
							$.Tjs_FormInertalertinfo(setting.msg_id,setting.typemsg,setting.err_class);
							$(penwang).data("Tjs_checkresult",false);
							//return false;

						}else{

								//idcard 如果是身份证验证的话，则需要执行这个函数 $.Tjs_isCardID() 判断是否为身分证号
								var checkidstr = $(penwang).val();
								//if(setting.inputtype == 'idcard' && checkidstr.length==18 && !$.Tjs_isCardID(checkidstr)){
									//$.Tjs_FormInertalertinfo(setting.msg_id,'输入的身份证号码有误，请正确录入身份证号',setting.err_class);
									//$(penwang).data("Tjs_checkresult",false);
									//return false;
								//}else{

									/* 判断长度 输入超长,最大为32字符(一个汉字算两个字符)*/
									var thisvaluelength = $.Tjs_StrLength($(penwang).val());
									if(setting.maxinputnum>0 && thisvaluelength>setting.maxinputnum){
										//$.Tjs_FormInertalertinfo(setting.msg_id,"输入超长,最大为"+setting.maxinputnum+"字符(一个汉字算两个字符)，已录入"+thisvaluelength+"个字符",setting.err_class);
										$.Tjs_FormInertalertinfo(setting.msg_id,"输入超长,最大为"+setting.maxinputnum+"字符，已录入"+thisvaluelength+"个字符",setting.err_class);
										$(penwang).data("Tjs_checkresult",false);
										//return false;
									}else{

										/* 如果是TEXTAREA 则在提示语后面加上字数的信息提示*/
										if(srcTag.toUpperCase()=="TEXTAREA"){
											var LastStrlength  = setting.maxinputnum - thisvaluelength;
											//var TextAreA_BuMsg = "<font color='#0080FF'>目录您已录入<B>"+thisvaluelength+"</B>个字符/<B>"+parseInt(thisvaluelength/2)+"</B>个汉字,还可以录入<B>"+LastStrlength+"</B>个字符/<B>"+parseInt(LastStrlength/2)+"</B>个汉字</font>";
											var TextAreA_BuMsg = "还可以输入<B>"+parseInt(LastStrlength/2)+"</B>个汉字</font>";
										}else{
											var TextAreA_BuMsg = "";
										}


										if(setting.sussmsg!='-1')$.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg+TextAreA_BuMsg,setting.sus_class);
										else $.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg,setting.sus_class);
										
										if(setting.sussmsg!='-1')
										{
											$.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg+TextAreA_BuMsg,setting.sus_class);
										}else {
											if(setting.textnumberalert) $.Tjs_FormInertalertinfo(setting.msg_id,TextAreA_BuMsg,setting.sus_class);
											else $.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg,setting.sus_class);
										}

										if(setting.initmsg) $.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.shw_class);
										$(penwang).data("Tjs_checkresult",true);
									}
								//}
						}					
						

					}else{ // END 初始化正则
						$.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg,setting.sus_class);
					}
					//penwang.focus();
				}// END INIT
				



				var blur_fun = function(){
					var settings = penwang.get(0).settings;
					var isempty_this = false;
					var value_this	=	"";
			
					/* 当触发对象的时候将默认字符去掉，回复CSS*/
					if(setting.defaultvalue!="" && setting.defaultvalue==$(penwang).val() && !setting.defaultvalue_use){
						$(this).val("");
						$(this).css("color",setting.defaultvalue_Bcolor);
						isempty_this = false;
						value_this = "";
					}else{
						value_this	=$(penwang).val();	
						if(value_this!="") isempty_this = true; else isempty_this = false;
					}
					
					/*当失去焦点的时候，如果对像内容为空的话，则将默认字符加上*/
					if($(penwang).val()=="" && isempty_this && !setting.defaultvalue_use){
						$(this).val(setting.defaultvalue);
						$(this).css("color",setting.defaultvalue_color);
						$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.shw_class);
						value_this = "";
						if(isempty_this) isempty_this = false;
						//return false;
					}

					
					if(setting.empty && !isempty_this){
						$.Tjs_FormInertalertinfo(setting.msg_id,setting.errmsg,setting.err_class);
						$(penwang).data("Tjs_checkresult",false);
						return false;
					}else{
						if(!isempty_this){
							if(setting.initmsg)
								$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.fou_class);
								$(penwang).data("Tjs_checkresult",true);
								//return true;
						}else{
							/* 进行正则判断*/ 
								//alert($.Tjs_RegexpressRegExp($(penwang).val(),setting.inputtype));
							if(value_this!='' && setting.inputtype!="" && !$.Tjs_RegexpressRegExp(value_this,setting.inputtype)){
								$.Tjs_FormInertalertinfo(setting.msg_id,setting.typemsg,setting.err_class);
								$(penwang).data("Tjs_checkresult",false);
								return false;

							}else{
								$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.fou_class);

							}


							//idcard 如果是身份证验证的话，则需要执行这个函数 $.Tjs_isCardID() 判断是否为身分证号
							var checkidstr = $(penwang).val();
							//alert($.Tjs_isCardID(checkidstr));
							//if(setting.inputtype == 'idcard' && checkidstr.length==18 && !$.Tjs_isCardID(checkidstr)){
							//	$.Tjs_FormInertalertinfo(setting.msg_id,'输入的身份证号码有误，请正确录入身份证号',setting.err_class);
							//	$(penwang).data("Tjs_checkresult",false);
							//	return false;
							//}


							/* 判断长度*/
							var thisvaluelength = $.Tjs_StrLength(value_this);
							if(setting.maxinputnum>0 && thisvaluelength>setting.maxinputnum){
								//$.Tjs_FormInertalertinfo(setting.msg_id,"输入超长,最大为"+setting.maxinputnum+"字符(一个汉字算两个字符)，已录入"+thisvaluelength+"个字符",setting.err_class);
								$.Tjs_FormInertalertinfo(setting.msg_id,"输入超长,最大为"+setting.maxinputnum+"字符，已录入"+thisvaluelength+"个字符",setting.err_class);
								$(penwang).data("Tjs_checkresult",false);
								return false;
							}

							/* 如果是TEXTAREA 则在提示语后面加上字数的信息提示*/
							if(setting.textnumberalert && setting.maxinputnum>0  && srcTag.toUpperCase()=="TEXTAREA"){ //textnumberalert maxinputnum:400
								var LastStrlength  = setting.maxinputnum - thisvaluelength;
								//var TextAreA_BuMsg = "<font color='#0080FF'>目录您已录入<B>"+thisvaluelength+"</B>个字符/<B>"+parseInt(thisvaluelength/2)+"</B>个汉字,还可以录入<B>"+LastStrlength+"</B>个字符/<B>"+parseInt(LastStrlength/2)+"</B>个汉字</font>";
								var TextAreA_BuMsg = "还可以输入<B>"+parseInt(LastStrlength/2)+"</B>个汉字</font>";
							}else{
								var TextAreA_BuMsg = "";
							}


							//alert(setting.sussmsg);

							if(setting.sussmsg!=""){
								if(setting.sussmsg!='-1')
								{
									$.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg+TextAreA_BuMsg,setting.sus_class);
								}else {
									if(setting.textnumberalert) $.Tjs_FormInertalertinfo(setting.msg_id,TextAreA_BuMsg,setting.sus_class);
									else $.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg,setting.sus_class);
								}
							}else{
								$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg+TextAreA_BuMsg,setting.shw_class);
							}

							$(penwang).data("Tjs_checkresult",true);
							//return true;
						}
					}



                    //如果isinputformatflag为真表示不能录入半角字符，录入半角将自动替换成空格
					if(setting.isinputformatflag){
						var regx_value = $(penwang).val();
						var result_regx_value = regx_value.replace(/[^\u0100-\uFFFF\w]/g,'');
						//$(penwang).val(result_regx_value);
						if(result_regx_value!=regx_value)
						{
							$.Tjs_FormInertalertinfo(setting.msg_id,'该内容不能录入半角字符',setting.err_class);
							$(penwang).data("Tjs_checkresult",false);
							return false;
						}
					}

					return true;



				};

				var onfouc_fun = function(){
					//$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.shw_class);
					//return false;

					var settings = penwang.get(0).settings;
					var isempty_this = false;
					var value_this	=	"";



					/* 当触发对象的时候将默认字符去掉，回复CSS*/
					if(setting.defaultvalue!="" && setting.defaultvalue==$(penwang).val() && !setting.defaultvalue_use){
						$(this).val("");
						$(this).css("color",setting.defaultvalue_Bcolor);
						isempty_this = false;
						value_this = "";
					}else{
						value_this	=$(penwang).val();	
						if(value_this!="") isempty_this = true; else isempty_this = false;
					}
					
					/*当失去焦点的时候，如果对像内容为空的话，则将默认字符加上*/
					if($(penwang).val()=="" && isempty_this && !setting.defaultvalue_use){
						$(this).val(setting.defaultvalue);
						$(this).css("color",setting.defaultvalue_color);
						$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.shw_class);
						value_this = "";
						if(isempty_this) isempty_this = false;
						//return false;
					}else{
						$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.shw_class);
					}

					//return false;

					if(setting.empty && !isempty_this){
						//$.Tjs_FormInertalertinfo(setting.msg_id,setting.errmsg,setting.err_class);
						$(penwang).data("Tjs_checkresult",false);
						return false;
					}else{
						if(!isempty_this){
							if(setting.initmsg)
								//$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.fou_class);
								$(penwang).data("Tjs_checkresult",true);
								//return true;
						}else{
							/* 进行正则判断*/ 
								//alert($.Tjs_RegexpressRegExp($(penwang).val(),setting.inputtype));
							if(setting.inputtype!="" && !$.Tjs_RegexpressRegExp(value_this,setting.inputtype)){
								//$.Tjs_FormInertalertinfo(setting.msg_id,setting.typemsg,setting.err_class);
								$(penwang).data("Tjs_checkresult",false);
								return false;
							
							}

							//idcard 如果是身份证验证的话，则需要执行这个函数 $.Tjs_isCardID() 判断是否为身分证号
							var checkidstr = $(penwang).val();
							//if(setting.inputtype == 'idcard' && checkidstr.length==18 && !$.Tjs_isCardID(checkidstr)){
							//	$.Tjs_FormInertalertinfo(setting.msg_id,'输入的身份证号码有误，请正确录入身份证号',setting.err_class);
							//	$(penwang).data("Tjs_checkresult",false);
							//	return false;
							//}


							
							/* 判断长度*/
							var thisvaluelength = $.Tjs_StrLength(value_this);
							if(setting.maxinputnum>0 && thisvaluelength>setting.maxinputnum){
								//$.Tjs_FormInertalertinfo(setting.msg_id,"输入超长,最大为"+setting.maxinputnum+"字符(一个汉字算两个字符)，已录入"+thisvaluelength+"个字符",setting.err_class);
								$.Tjs_FormInertalertinfo(setting.msg_id,"输入超长,最大为"+setting.maxinputnum+"字符，已录入"+thisvaluelength+"个字符",setting.err_class);
								$(penwang).data("Tjs_checkresult",false);
								return false;
							}

							/* 如果是TEXTAREA 则在提示语后面加上字数的信息提示*/
							if(setting.textnumberalert && setting.maxinputnum>0  && srcTag.toUpperCase()=="TEXTAREA"){ //textnumberalert maxinputnum:400
								var LastStrlength  = setting.maxinputnum - thisvaluelength;
								//var TextAreA_BuMsg = "<font color='#0080FF'>目录您已录入<B>"+thisvaluelength+"</B>个字符/<B>"+parseInt(thisvaluelength/2)+"</B>个汉字,还可以录入<B>"+LastStrlength+"</B>个字符/<B>"+parseInt(LastStrlength/2)+"</B>个汉字</font>";
								var TextAreA_BuMsg = "还可以输入<B>"+parseInt(LastStrlength/2)+"</B>个汉字</font>";
							}else{
								var TextAreA_BuMsg = "";
							}							
							//$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg+TextAreA_BuMsg,setting.shw_class);
							if(setting.sussmsg!=''){
								if(setting.sussmsg!='-1')
								{
									$.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg+TextAreA_BuMsg,setting.sus_class);
								}else {
									if(setting.textnumberalert) $.Tjs_FormInertalertinfo(setting.msg_id,TextAreA_BuMsg,setting.sus_class);
									else $.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg,setting.sus_class);
								}
							}else{
								$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg+TextAreA_BuMsg,setting.shw_class);
							}


							$(penwang).data("Tjs_checkresult",true);
							//return true;
						}
					}



                    //如果isinputformatflag为真表示不能录入半角字符，录入半角将自动替换成空格
					if(setting.isinputformatflag){
						var regx_value = $(penwang).val();
						var result_regx_value = regx_value.replace(/[^\u0100-\uFFFF\w]/g,'');
						//$(penwang).val(result_regx_value);
						if(result_regx_value!=regx_value)
						{
							$.Tjs_FormInertalertinfo(setting.msg_id,'该内容不能录入半角字符',setting.err_class);
							$(penwang).data("Tjs_checkresult",false);
							return false;
						}
					}

					//return true;
				};



				var fun_keyup = function(){
					var settings = penwang.get(0).settings;
					var isempty_this = false;
					var value_this	=	"";


					/* 当触发对象的时候将默认字符去掉，回复CSS*/
					if(setting.defaultvalue!="" && setting.defaultvalue==$(penwang).val()){
						isempty_this = false;
						value_this = "";
					}else{
						value_this	=$(penwang).val();	
						if(value_this!="") isempty_this = true; else isempty_this = false;
					}
					

					if(setting.empty && !isempty_this){
						//$.Tjs_FormInertalertinfo(setting.msg_id,setting.errmsg,setting.err_class);




						var thisvaluelength = $.Tjs_StrLength(value_this);
						/* 如果是TEXTAREA 则在提示语后面加上字数的信息提示*/
						if(setting.textnumberalert && setting.maxinputnum>0 && srcTag.toUpperCase()=="TEXTAREA"){
							var LastStrlength  = setting.maxinputnum - thisvaluelength;
							//var TextAreA_BuMsg = "<font color='#0080FF'>目录您已录入<B>"+thisvaluelength+"</B>个字符/<B>"+parseInt(thisvaluelength/2)+"</B>个汉字,还可以录入<B>"+LastStrlength+"</B>个字符/<B>"+parseInt(LastStrlength/2)+"</B>个汉字</font>";
							var TextAreA_BuMsg = "还可以输入<B>"+parseInt(LastStrlength/2)+"</B>个汉字</font>";
						}else{
							var TextAreA_BuMsg = "";
						}


						if(setting.sussmsg!=''){
							if(setting.sussmsg!='-1')
							{
								$.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg+TextAreA_BuMsg,setting.sus_class);
							}else {
								if(setting.textnumberalert) $.Tjs_FormInertalertinfo(setting.msg_id,TextAreA_BuMsg,setting.sus_class);
								else $.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg,setting.sus_class);
							}
						}else{
							$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg+TextAreA_BuMsg,setting.shw_class);
						}

						$(penwang).data("Tjs_checkresult",false);
						return false;
					}else{
						if(!isempty_this){
							if(setting.initmsg)
								//$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.fou_class);
								$(penwang).data("Tjs_checkresult",true);
								//return true;
						}else{
							/* 进行正则判断*/ 
								//alert($.Tjs_RegexpressRegExp($(penwang).val(),setting.inputtype));
							if(setting.inputtype!="" && !$.Tjs_RegexpressRegExp(value_this,setting.inputtype)){
								//$.Tjs_FormInertalertinfo(setting.msg_id,setting.typemsg,setting.err_class);
								$(penwang).data("Tjs_checkresult",false);
								return false;
							}

						/*
						//idcard 如果是身份证验证的话，则需要执行这个函数 $.Tjs_isCardID() 判断是否为身分证号
						var checkidstr = $(penwang).val();
						if(setting.inputtype == 'idcard' && checkidstr.length==18 && !$.Tjs_isCardID(checkidstr)){
							$.Tjs_FormInertalertinfo(setting.msg_id,'输入的身份证号码有误，请正确录入身份证号',setting.err_class);
							$(penwang).data("Tjs_checkresult",false);
							return false;
						}

						*/	
							/* 判断长度*/
							var thisvaluelength = $.Tjs_StrLength(value_this);
							if(setting.maxinputnum>0 && thisvaluelength>setting.maxinputnum){
								//$.Tjs_FormInertalertinfo(setting.msg_id,"输入超长,最大为"+setting.maxinputnum+"字符(一个汉字算两个字符)，已录入"+thisvaluelength+"个字符",setting.err_class);
								$.Tjs_FormInertalertinfo(setting.msg_id,"输入超长,最大为"+setting.maxinputnum+"字符，已录入"+thisvaluelength+"个字符",setting.err_class);
								$(penwang).data("Tjs_checkresult",false);
								return false;
							}
							

							
							/* 如果是TEXTAREA 则在提示语后面加上字数的信息提示*/
							if(setting.textnumberalert && setting.maxinputnum>0 && srcTag.toUpperCase()=="TEXTAREA"){
								var LastStrlength  = setting.maxinputnum - thisvaluelength;
								//var TextAreA_BuMsg = "<font color='#0080FF'>目录您已录入<B>"+thisvaluelength+"</B>个字符/<B>"+parseInt(thisvaluelength/2)+"</B>个汉字,还可以录入<B>"+LastStrlength+"</B>个字符/<B>"+parseInt(LastStrlength/2)+"</B>个汉字</font>";
								var TextAreA_BuMsg = "还可以输入<B>"+parseInt(LastStrlength/2)+"</B>个汉字</font>";
							}else{
								var TextAreA_BuMsg = "";
							}


							if(setting.sussmsg!=''){
								if(setting.sussmsg!='-1')
								{
									$.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg+TextAreA_BuMsg,setting.sus_class);
								}else {
									if(setting.textnumberalert) $.Tjs_FormInertalertinfo(setting.msg_id,TextAreA_BuMsg,setting.sus_class);
									else $.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg,setting.sus_class);
								}
							}else{
								$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg+TextAreA_BuMsg,setting.shw_class);
							}

							$(penwang).data("Tjs_checkresult",true);
							//return true;
						}
					}




                    //如果isinputformatflag为真表示不能录入半角字符，录入半角将自动替换成空格
					if(setting.isinputformatflag){
						var regx_value = $(penwang).val();
						var result_regx_value = regx_value.replace(/[^\u0100-\uFFFF\w]/g,'');
						//$(penwang).val(result_regx_value);
						if(result_regx_value!=regx_value)
						{
							$.Tjs_FormInertalertinfo(setting.msg_id,'该内容不能录入半角字符',setting.err_class);
							$(penwang).data("Tjs_checkresult",false);
							return false;
						}
					}

					return true;

				};



				/* 取得设置好的onchange函数进行累加 */
				var OldFunString = "";
				var OldChangeFun = $(this).attr('onchange');
				
				
				if(OldChangeFun){
					var str = "function anonymous()\n{";
					OldChangeFun = $.trim(OldChangeFun.toString().replace(str,''));
					str = "function onchange(event) {";//firefox为如此定义
					OldChangeFun = $.trim(OldChangeFun.toString().replace(str,''));
					str = "function onchange()\n{";//ie8下
					OldChangeFun = $.trim(OldChangeFun.toString().replace(str,''));
					
					OldChangeFun = OldChangeFun.toString().replace('}','');
					$(penwang).removeAttr('onchange');
					OldFunString+= OldChangeFun;
				}

				var OldFocusFun = $(this).attr('onfocus');
				
				if(OldFocusFun){	
					var str = "function anonymous()\n{";
					OldFocusFun = $.trim(OldFocusFun.toString().replace(str,''));
					str = "function onfocus(event) {";//firefox为如此定义
					OldFocusFun = $.trim(OldFocusFun.toString().replace(str,''));
					str = "function onfocus()\n{";//ie8下
					OldFocusFun = $.trim(OldFocusFun.toString().replace(str,''));

					OldFocusFun = OldFocusFun.toString().replace('}','');
					//$(penwang).removeAttr('onfocus');
					OldFunString+= OldFocusFun;
				}

				
				var OldonBlurFun = $(this).attr('onblur');
				if(OldonBlurFun){
					var str = "function anonymous()\n{";
					OldonBlurFun = $.trim(OldonBlurFun.toString().replace(str,''));
					str = "function onblur(event) {";//firefox为如此定义
					OldonBlurFun = $.trim(OldonBlurFun.toString().replace(str,''));
					str = "function onblur()\n{";//firefox为如此定义
					OldonBlurFun = $.trim(OldonBlurFun.toString().replace(str,''));
					
					OldonBlurFun = OldonBlurFun.toString().replace('}','');
					$(penwang).removeAttr('onblur');
					OldFunString+= OldonBlurFun;
				}

				var OldonKeyUpFun = $(this).attr('onkeyup');
				if(OldonKeyUpFun){
					var str = "function anonymous()\n{";
					OldonKeyUpFun = $.trim(OldonKeyUpFun.toString().replace(str,''));
					str = "function onkeyup(event) {";//firefox为如此定义
					OldonKeyUpFun = $.trim(OldonKeyUpFun.toString().replace(str,''));
					str = "function onkeyup(event)\n{";//firefox为如此定义
					OldonKeyUpFun = $.trim(OldonKeyUpFun.toString().replace(str,''));

					OldonKeyUpFun = OldonKeyUpFun.toString().replace('}','');
					$(penwang).removeAttr('onkeyup');
					OldFunString+= OldonKeyUpFun;
				}

				//var OldFunString = OldChangeFun.toString()+OldFocusFun.toString()+OldonBlurFun.toString()+OldonKeyUpFun.toString();
				//if(OldFunString.length>0) alert(OldFunString);
				/* --- END ---*/
				/*
				if(OldChangeFun){
					penwang.bind("change",function(){fun();eval(OldChangeFun)});
				}else{
					penwang.bind("change",function(){fun()});
				}
				*/


				//alert(OldFocusFun);
				/* 绑定 函数*/
				//if(OldFocusFun)$(penwang).bind("focus",function(){onfouc_fun()});else$(penwang).bind("focus",function(){eval(OldFocusFun);onfouc_fun();}); 
				//if(OldonBlurFun) $(this).bind("blur",function(){fun()});else $(this).bind("blur",function(){fun();eval(OldonBlurFun);});
				//if(OldonKeyUpFun) $(this).bind("keyup",function(){fun_keyup()});else $(this).bind("keyup",function(){fun_keyup();eval(OldonKeyUpFun);});
				$(this).bind("focus",function(){onfouc_fun()}); 
				$(this).bind("blur",function(){blur_fun()});
				$(this).bind("keyup",function(){fun_keyup()});
				/* 结束*/

			}else if(srcTag.toUpperCase()=="SELECT"){
				if(thisvalue==0) thisvalue="";
				//alert(thisvalue);

				if(setting.empty && thisvalue=="")	
					$(penwang).data("Tjs_checkresult",false);
				else $(penwang).data("Tjs_checkresult",true);

				//初始化提示信息
				if(setting.msg_id!="" && setting.initmsg!="" && thisvalue==""){
					$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.shw_class);
				}else if(setting.msg_id!="" && setting.sussmsg!="" && thisvalue!=""){

					
					if(setting.defaultvalue=="" && setting.defaultvalue_use){
						//初始化正则						
						if(setting.inputtype!="" && !$.Tjs_RegexpressRegExp($(penwang).val(),setting.inputtype)){
							$.Tjs_FormInertalertinfo(setting.msg_id,setting.typemsg,setting.err_class);
							$(penwang).data("Tjs_checkresult",false);
							//return false;
						}
						
						/* 判断长度*/
						var thisvaluelength = $.Tjs_StrLength($(penwang).val());
						if(setting.maxinputnum>0 && thisvaluelength>setting.maxinputnum){
							$.Tjs_FormInertalertinfo(setting.msg_id,"您输入的数据过长！该处只能录入"+setting.maxinputnum+"个英文或"+parseInt(setting.maxinputnum/2)+"个汉字",setting.err_class);
							$(penwang).data("Tjs_checkresult",false);
							//return false;
						}

						/* 如果是TEXTAREA 则在提示语后面加上字数的信息提示*/
						if(srcTag.toUpperCase()=="TEXTAREA"){
							var LastStrlength  = setting.maxinputnum - thisvaluelength;
							var TextAreA_BuMsg = "<font color='#0080FF'>目录您已录入<B>"+thisvaluelength+"</B>个字符/<B>"+parseInt(thisvaluelength/2)+"</B>个汉字,还可以录入<B>"+LastStrlength+"</B>个字符/<B>"+parseInt(LastStrlength/2)+"</B>个汉字</font>";
						}else{
							var TextAreA_BuMsg = "";
						}
						$.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg+TextAreA_BuMsg,setting.sus_class);
						$(penwang).data("Tjs_checkresult",true);

					} // END 初始化正则


					$.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg,setting.sus_class);
					//penwang.change();
				}// END INIT

				
				/* 取得设置好的onchange函数进行累加 */
				var OldChangeFun = $(penwang).attr('onchange');
				
				if(OldChangeFun){
					var str = "function anonymous()\n{";//ie下如此定义
					OldChangeFun = $.trim(OldChangeFun.toString().replace(str,''));					
					str = "function onchange(event) {";//firefox为如此定义
					OldChangeFun = $.trim(OldChangeFun.toString().replace(str,''));
					str = "function onchange()\n{";//ie8下
					OldChangeFun = $.trim(OldChangeFun.toString().replace(str,''));
					
					OldChangeFun = OldChangeFun.toString().replace('}','');

					$(penwang).removeAttr('onchange');
				}
				/* --- END ---*/

				var fun = function(){
					var settings = penwang.get(0).settings;
					var thisvalue = $(penwang).val();
					if(thisvalue==0) thisvalue="";

					if(setting.empty && thisvalue==""){
						$.Tjs_FormInertalertinfo(setting.msg_id,setting.errmsg,setting.err_class);
						$(penwang).data("Tjs_checkresult",false);
						//return false;
					}else{
						if(thisvalue==""){
							if(setting.initmsg){
								$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.fou_class);
								$(penwang).data("Tjs_checkresult",true);
								//return true;
							}
						}else{
							$.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg,setting.sus_class);
							$(penwang).data("Tjs_checkresult",true);
							//return true;
						}
						$(penwang).data("Tjs_checkresult",true);
						//return true;
					}
				};

				/* 绑定 函数 */	
				//penwang.bind("click",fun);
				//penwang.bind("blur",fun);
				if(OldChangeFun){
					//alert(OldChangeFun);
					penwang.bind("change",function(){fun();eval(OldChangeFun)});
				}else{
					penwang.bind("change",function(){fun()});
				}
				/* 结束*/

			} else if((stype.toUpperCase()=="RADIO" || stype.toUpperCase()=="CHECKBOX")&& srcTag.toUpperCase()=="INPUT"){
				var Radio_array =  $("input[@name=" + this.name + "]");
				var penwang = $("input[@name=" + this.name + "]");
				

				//alert("befor:"+Radio_array.length);

				var ischeck =false;
				for(var i=0;i<Radio_array.length;i++){
					if($(Radio_array[i]).attr("checked")){ ischeck =true; /*break;*/ }
				}
				
				//alert("after:"+Radio_array.length);


				if(Radio_array.length==1){
					if($(Radio_array).attr("checked")){ ischeck =true;}
					if(setting.empty && !ischeck)	$(Radio_array).data("Tjs_checkresult",false);
					else $(Radio_array).data("Tjs_checkresult",true);
				}else{
					if(setting.empty && !ischeck)	$(Radio_array[0]).data("Tjs_checkresult",false);
					else $(Radio_array[0]).data("Tjs_checkresult",true);
				}


				//初始化提示信息
				if(setting.msg_id!="" && setting.initmsg!="" && !ischeck){
					$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.shw_class);
				}else if(setting.msg_id!="" && setting.sussmsg!="" && ischeck){
					$.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg,setting.sus_class);
					//penwang.click();
				}
				// END INIT


				var fun = function(){
					var settings = penwang.get(0).settings;
					var this_name=penwang.get(0).name;

					var Radio_array =  $("input[@name=" + this_name + "]");
					var ischeck =false;
					

					for(var i=0;i<Radio_array.length;i++){
						if($(Radio_array[i]).attr("checked")){ ischeck =true;}
					}
					if(Radio_array.length==1){
						if($(Radio_array).attr("checked")){ ischeck =true;}
						var dataobject = $(Radio_array);
					}else{
						var dataobject = $(Radio_array[0]);
					}




					if(setting.empty && !ischeck){
						$.Tjs_FormInertalertinfo(setting.msg_id,setting.errmsg,setting.err_class);
						$(dataobject).data("Tjs_checkresult",false);
						//return false;
					}else{
						if(!ischeck){
							if(setting.initmsg){
								$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.fou_class);
								$(dataobject).data("Tjs_checkresult",true);
								//return true;
							}
						}else{
							$.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg,setting.sus_class);
							$(dataobject).data("Tjs_checkresult",true);
							//return true;
						}
						$(dataobject).data("Tjs_checkresult",true);
						//return true;
					}
				};

				/* 绑定 函数 */	
				//penwang.bind("focus",fun);
				penwang.bind("change",fun);
				penwang.bind("click",fun);
				/* 结束*/

			} else if(stype.toUpperCase()=="FILE" && srcTag.toUpperCase()=="INPUT"){
				
				//初始化
				if(setting.initmsg && setting.msg_id){
					$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.shw_class);
				}
				if(setting.empty) $(this).data("Tjs_checkresult",false); else $(this).data("Tjs_checkresult",true);

				var fun = function(){
					$(penwang).data("Tjs_checkresult",true);
					var settings	= penwang.get(0).settings;
					if($(penwang).val()!="" && !$.Tjs_RegexpressRegExp($(penwang).val(),setting.inputtype)){
						var inputtypename = setting.inputtype;
						var upfiles_classname = $.trim(eval("Tjs_regexEnum."+inputtypename).toString());
						var upfiles_name = upfiles_classname.substr(7,parseInt(upfiles_classname.length)-9);
						$.Tjs_FormInertalertinfo(setting.msg_id,setting.typemsg+"，充许上传类型："+upfiles_name,setting.err_class);
						$(penwang).data("Tjs_checkresult",false);
					}else if($(penwang).val()!="" && $.Tjs_RegexpressRegExp($(penwang).val(),setting.inputtype)){
						if(setting.sussmsg!='-1') $.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg,setting.fou_class);
						else $.Tjs_FormInertalertinfo(setting.msg_id,setting.sussmsg,setting.sus_class);
						$(penwang).data("Tjs_checkresult",true);
					}else if($(penwang).val()=="" && setting.empty && setting.errmsg){
						$.Tjs_FormInertalertinfo(setting.msg_id,setting.errmsg,setting.err_class);
						$(penwang).data("Tjs_checkresult",false);
					
					}else if($(penwang).val()=="" && setting.msg_id && !setting.empty){
						$.Tjs_FormInertalertinfo(setting.msg_id,setting.initmsg,setting.fou_class);
						$(penwang).data("Tjs_checkresult",true);
					}

				};
				
				/* 绑定 函数 */	
				penwang.bind("focus",fun);
				penwang.bind("change",fun);
				penwang.bind("keyup",fun);
				/* 结束*/				
				
			}// END IF 


		} //  END msg_id


	}); // END EACH

};




jQuery.fn.setval=function(setvalue){
	/*
	* @ setvalue 即可以为一个间值也可以为数组，不过，只能在对checkbox进行付值的时候才能是数组，其它对像不能是数组
	*/
	//alert(setvalue.length);
	//alert(setvalue);
	//alert(setvalue);
	if(typeof(setvalue)=="undefined" && setvalue!=0){
		var setvalue="";
		return false;
	}

	if(setvalue.toString() =="") return false;
	if(setvalue.constructor == window.Array) var checkbox_value = true;else var checkbox_value=false;


	var thisid		= $(this).attr("id");
	var thisname	= $(this).attr("name");
	if(thisid=="")  var thisid=thisname;
	var stype		= $(this).attr("type");
	var srcTag		= $(this).attr("tagName");


	if((stype.toUpperCase()=="TEXT" && srcTag.toUpperCase()=="INPUT") || srcTag.toUpperCase()=="TEXTAREA"){
		if(checkbox_value){ alert("text textarea 付值不能为数组");return false;}
		$(this).val(setvalue);
	}else if(srcTag.toUpperCase()=="SELECT"){
		if(checkbox_value){ alert("SELECT 付值不能为数组");return false;}
		$(this).val(setvalue);
	} else if(stype.toUpperCase()=="CHECKBOX"&& srcTag.toUpperCase()=="INPUT"){
		if(checkbox_value){
			for(var i=0;i<setvalue.length;i++){
				$("input[@type="+stype+"][@id="+thisid+"][@value="+setvalue[i]+"]").attr("checked",true);
			}
		}else{
				$("input[@type="+stype+"][@id="+thisid+"][@value="+setvalue+"]").attr("checked",true);
		}

	} else if(stype.toUpperCase()=="RADIO"&& srcTag.toUpperCase()=="INPUT"){
		if(checkbox_value){ alert("RADIO 付值不能为数组");return false;}
		$("input[@type="+stype+"][@id="+thisid+"][@value="+setvalue+"]").attr("checked",true);
	} else if(stype.toUpperCase()=="FILE" && srcTag.toUpperCase()=="INPUT"){
		if(checkbox_value){ alert("FILE 付值不能为数组");return false;}
		$(this).val(setvalue);
	}else{
		if(checkbox_value){ alert(stype+"付值不能为数组");return false;}
		$(this).val(setvalue);
	}
};
























/* 滚动

   var roll = new MessageRoll({
		container : document.getElementById("ParentTables"), // 滚动的容器
		height : 650 + 1 , // 滚动信息条的高度,算上底边框1px,如果没有底边框则不加1
		rollElements : "li" // 滚动元素的html标记名称
   });
   roll.start(200); //开始滚动,每三秒滚动一次

*/
var MessageRoll = function() {
	this.container = null;
	this.height = 0;
	this.interval = null;
	this.rollElements = "";
	this.rollIndex = 0;
	this.nowRoll = 0;
	this.stopeda = false;
	if(arguments.length > 0) {
	   var object = arguments[0];
	   if(typeof object == "object") {
		for(var key in object) {
		 if(!this[key]) {
		  this[key] = object[key];
		 }
		}
	   }
	}
	if(this.container != null && this.height != 0) {
	   this.container.style.height = this.height + "px";
	   this.container.style.overflow = "hidden";
	}
	if(this.container != null && this.rollElements != "") {
	   this.rollElements = this.container.getElementsByTagName(this.rollElements);
	}
	this.instanceIndex = MessageRoll.instanceCount;
	MessageRoll.instanceCount++;
};

MessageRoll.instanceCount = 0;
MessageRoll.instances = [];

MessageRoll.prototype.start = function(delay) {
	this.stoped = false;
	if(typeof delay != "number" || 0 == delay || null == this.container) {
	   return;
	}
	if("" == this.rollElements || null == this.rollElements) {
	   if(arguments.length >= 2 && typeof arguments[1] == "string") {
		this.rollElements = this.container.getElementsByTagName(arguments[1]);
	   }
	}
	if(null == MessageRoll.instances[this.instanceIndex]) {
	   MessageRoll.instances[this.instanceIndex] = this;
	}
	var _messageRollCopy = MessageRoll.instances[this.instanceIndex];
	var Proc = function() {
	   with(_messageRollCopy) {
		if(rollIndex >= rollElements.length - 2) {
		 container.scrollTop = 0;
		 rollIndex = 0;
		 window.setTimeout(smallProc,delay);
		 return;
		}
	   }
	   smallProc();
	}
	var eHeight = _messageRollCopy.rollElements[0].offsetHeight;
	var smallProc = function() {
	   if(_messageRollCopy.stoped){return false;};
	   if(_messageRollCopy.nowRoll < eHeight) {
		_messageRollCopy.container.scrollTop++;
		_messageRollCopy.nowRoll++;
		window.setTimeout(smallProc,80);
	   } else {
		_messageRollCopy.nowRoll = 0;
		_messageRollCopy.rollIndex++;
		if(!_messageRollCopy.stoped) {
		 window.setTimeout(Proc,delay);
		}
	   }
	};
	window.setTimeout(Proc,delay);
};

MessageRoll.prototype.stop = function() {
	this.stoped = true;
};











function Tjs_dhscroll(){
    //author:dh20156
    var dh = this;
	//总几个块
    this.content_cnt = 1;

    this.autoid = null;
    //块1
    this.scrollDOM = null;
    //块2
    this.scrollCDOM = null;
    //展示宽度（和块1宽度一致）
    this.showwidth = 0;
    //每次滚动长度
    this.steplength =33;
    var oldlength = this.steplength;
    //滚动时间间隔
    this.steptime = 1;
    //停顿时间
    this.resttime = 9999999999999;
    //滚动长度
    this.uvwidth = 0;

    //无缝设置过程
    this.getsw = function() {
    
        var tempw = this.scrollCDOM.offsetWidth;
        var temps = this.scrollCDOM.innerHTML;
        this.scrollCDOM.innerHTML = [temps,temps].join("");
        this.scrollCDOM.style.width = tempw*2+"px";
        if(document.attachEvent){
            this.scrollDOM.attachEvent("onmouseover",dh.pause);
            this.scrollDOM.attachEvent("onmouseout",dh.goon);
        }else{
            this.scrollDOM.addEventListener("mouseover",dh.pause,true);
            this.scrollDOM.addEventListener("mouseout",dh.goon,true);
        }
        //this.uvwidth = Math.ceil(this.scrollDOM.scrollWidth / 2);
		this.uvwidth = this.showwidth*parseInt(this.content_cnt-1); //块宽度 * （块总数-1）
    }

    //从右到左
    this.scrollleft = function(){
        if(this.autoid!=null){
            window.clearTimeout(this.autoid);
        }
        var uvleft = this.scrollDOM.scrollLeft;
        uvleft += this.steplength;

        this.scrollDOM.scrollLeft = uvleft;

		//modefy by junhaiguo  滚动错误 2011.03.21
        if(uvleft>=this.uvwidth)
		{
			if(uvleft==this.uvwidth)
			{
			 	this.scrollDOM.scrollLeft = 0;
			}
			else
			{
				this.scrollDOM.scrollLeft =0;
			}
		}
		else
		{
			if(uvleft % this.showwidth == 0){
				this.autoid = window.setTimeout(function(){dh.scrollleft()},dh.resttime);
			}else{
				this.autoid = window.setTimeout(function(){dh.scrollleft()},dh.steptime);
			}
		}
        
    }

    //从左到右
    this.scrollright = function() {
        if (this.autoid != null) {
            window.clearTimeout(this.autoid);
        }
        var uvleft = this.scrollDOM.scrollLeft;
        uvleft -= this.steplength;

        this.scrollDOM.scrollLeft = uvleft;
		
		//modefy by junhaiguo  滚动错误 2011.03.21
        if (uvleft <= 0) {
			if(uvleft==0)
			{
			 	this.scrollDOM.scrollLeft = 0;
			}
			else
			{
				this.scrollDOM.scrollLeft =this.uvwidth-this.showwidth;
			}
        }
		else
		{
			if (uvleft % this.showwidth == 0) {
				this.autoid = window.setTimeout(function() { dh.scrollright() }, dh.resttime);
			} else {
				this.autoid = window.setTimeout(function() { dh.scrollright() }, dh.steptime);
			}
		}
    }

    //开始滚动，参数为方向，首屏是否停顿
    this.go = function(direction, rest) {
        if(this.autoid!=null){
            window.clearTimeout(this.autoid);
        }
        if(direction=="left"){
            if(rest){
                this.autoid = window.setTimeout(function(){dh.scrollleft()},9999999999999);
            }else{
                dh.scrollleft();
            }
        }else{
            if(rest){
                this.autoid = window.setTimeout(function(){dh.scrollright()},9999999999999);
            }else{
                dh.scrollright();
            }
        }
    }

    //往右
    this.pre = function(){
            this.scrollright();
    }
    //往左
    this.next = function(){
            this.scrollleft();
    }
    //暂停
    this.pause = function(){
        dh.oldlength = dh.steplength;
        dh.steplength = 0;
    }
    //继续
    this.goon = function(){
        dh.steplength = dh.oldlength;
    }
}









/* 下面为手写JS 和Jquery无关*/
//2008-12-16  日，将qlog_gb.js和tencent.penwang.system.gb.js 和 tencent.penwang.extendjquery.gb.js 合并成一个文件
var OldDomain =document.domain;
//document.domain="qq.com";
/* 登录JS*/
var openparam_info = "";
function ptlogin2_onResize(width, height)
{	
	login_wnd = document.getElementById("login_div");
	if (login_wnd)
	{	
		var oldtop = login_wnd.style.top;
		if(oldtop) oldtop = parseInt(oldtop.replace("px",""));
		var pagescroll = $.Tjs_getPageScroll();
		var top =oldtop+pagescroll;

		//login_wnd.style.top =top + "px";
		login_wnd.style.width = width + "px";
		login_wnd.style.height = height + "px";
		
		login_wnd.style.visibility = "hidden";
		login_wnd.style.visibility = "visible";
	}
	//frames.login_frame.document.all.u.readOnly=true;
}



function ptlogin2_onClose()
{
	
	if(ismaskflag){
		$.Tjs_ShowObject('login_div',false,'middle',true);
		//$.Tjs_canclemaskLayout('','#D9ECFF',80,'create_maskbutton');
	}
	
	login_wnd = document.getElementById("login_div");	
	login_wnd.style.display="none";
}


function ptlogin2_onLogin() {
	//.执行业务自己的代码
	//如果需要继续登录操作，则返回true, 否则，请返回false
	/* 得到录入的QQ号，查找该QQ号是否在授权范围内 */
	return true;
}



var openLogin = function (urlparam)
{
	
	document.domain="qq.com";
	//是否支持一键登录 
	var vSupportQLogin = 0;
	var firstchart = urlparam.substr(0,1);

	if(firstchart!="&" && firstchart!="?")
		var url = "http://ui.ptlogin2.qq.com/cgi-bin/login" + "?" + urlparam;
	else if(firstchart!="&")
		var url = "http://ui.ptlogin2.qq.com/cgi-bin/login?1=1"+urlparam;
	else if(firstchart!="?")
		var url = "http://ui.ptlogin2.qq.com/cgi-bin/login"+urlparam;
	

	login_wnd = document.getElementById("login_div");

	if (login_wnd != null){
		login_wnd.style.visible = "hidden";	//先隐藏，这样用户就看不到页面的尺寸变化的效果
		login_wnd.style.display = "block";	//设为block， 否则页面不会真正载入
		
		if (0 != vSupportQLogin)
		{
			url += ("&qlogin_jumpname=&qlogin_param=&qlogin_auto_login=0");
			//alert(url);
		}

		document.getElementById("login_frame").src = url; 		
	}
};


var ismaskflag =false;

/* 退出登录*/
var systemlogout = function (reback_url){
	//成功返回函数1
	if(typeof(reback_url)=="undefined" || reback_url==""){
		var reback_url			=	"";
	}

	if(ismaskflag){
		$.Tjs_ShowObject('login_div',false,'middle',true);
		//$.Tjs_canclemaskLayout('','#D9ECFF',80,'create_maskbutton');
	}
	$.Tjs_clearCookie("uin","","qq.com");
	$.Tjs_clearCookie("uin_cookie","","qq.com");
	$.Tjs_clearCookie("verifysession","","qq.com");
	$.Tjs_clearCookie("skey","","qq.com");
	$.Tjs_clearCookie("adid","","qq.com");
	$.Tjs_clearCookie("euin_cookie","","qq.com");
};



//登陆参数
var GlobalLoginTypeSet = 0; 
var ptlogin_init = function (TiTle,LoginOktoUrl,Windows_ThispageFun,FullUrl,Target,ismask,isclose){
	/*
	TiTle					登录框标题
	LoginOktoUrl			成功后返回的ＵＲＬ
	Windows_ThispageFun		成功后执行的函数
	FullUrl					如果不这空，则表示登录直接跳到该ＵＲＬ而不经过Login.cgi
	ismask					是否需要遮掩层 true表示需要false表示不需要
	*/



	/* 初始化登录层*/
	
	var w=$.Tjs_Fid('login_div');
	if($.Tjs_Fempty(w)){
		w=document.createElement('div');
		w.id='login_div';
		w.style.cssText = 'display:block;display:none;left: 0px; top: 0px; width:373px; height:280px; padding:0; margin:0px;';
		document.body.insertBefore(w, document.body.firstChild);
		w.innerHTML="<iframe name='login_frame' id='login_frame' frameborder='0' scrolling='auto' width='100%' height='100%' src=''></iframe>";
	}

	//成功返回ＵＲＬ
	if(typeof(LoginOktoUrl)=="undefined" || LoginOktoUrl==""){
		var LoginOktoUrl			=	"";
	}
	//成功返回函数2
	if(typeof(FullUrl)=="undefined" || FullUrl==""){
		var FullUrl			=	"";
	}

  	//成功执行函数名
	if(typeof(Target)=="undefined" || Target==""){
		var Target			=	"self";
	}

  	//成功执行函数名
	if(typeof(Windows_ThispageFun)=="undefined" || Windows_ThispageFun==""){
		var Windows_ThispageFun			=	"";
	}
  	//遮掩层的标识
	if(typeof(ismask)=="undefined" || ismask==""){
		var ismask			=	false;
	}
  	//是否要关闭窗口按钮
	if(typeof(isclose)=="undefined" || isclose==""){
		var isclose			=	0;
	}
	
	
	ismaskflag	=	ismask;
	if(ismaskflag){
		$.Tjs_ShowObject('login_div',true,'middle',true,0);
	}

	
	//登录标题
	if(typeof(TiTle)=="undefined" || TiTle==""){
		var title_txt			=	"&title=公益网用户登录";
	}else{
		var title_txt			=	"&title="+TiTle;
	}
	var title_txt			=	"";

	
	if(GlobalLoginTypeSet == 0)
		var cgiurl = "http://pay.gongyi.qq.com/cgi-bin/Login";
	else
		var cgiurl = "http://pay.gongyi.qq.com/cgi-bin/NpoLogin";
	
	//alert(cgiurl);

	if(FullUrl=="")
		var s_url				=	"s_url="+escape(cgiurl+"?"+Math.random()+"&rebackurl="+escape(LoginOktoUrl)+"&rebackfun="+Windows_ThispageFun);
	else
		var s_url				=	"s_url="+escape(FullUrl);
	

	var	bgimage  ="";
	var bgcolor				=	"&bgcolor=F4F6FA";

	var uin					=	"&uin=";
	var reset_text			=	"&reset_text=%D6%D8%CC%EE";
	var f_url				=	"&f_url=loginerroralert";
	var low_login			=	"&low_login=0";
	var	hide_title_bar		=	"&hide_title_bar=0";
	var	hide_close_icon		=	"&hide_close_icon="+isclose;
	var	appid				=	"&appid=30000101";
	var	style				=	"&style=0";
	var bgcolor				=	"&bgcolor=0";
	var target				=	"&target="+Target;
	var hide_uin_tip		=	"&hide_uin_tip=0";	
	var qlogin_jumpname = "&qlogin_jumpname=GongYiPtLogin2&qlogin_param="+escape(Math.random()+"&rebackurl="+escape(LoginOktoUrl)+"&rebackfun="+Windows_ThispageFun)+"&qlogin_auto_login=0";
	if(GlobalLoginTypeSet == 1) qlogin_jumpname ="";


	openparam_info		=	s_url+bgimage+bgcolor+title_txt+uin+reset_text+f_url+low_login+hide_title_bar+hide_close_icon+appid+style+bgcolor+target+hide_uin_tip+qlogin_jumpname;
	//alert(openparam_info);
};












/* 加入收藏夹*/
var addBookmark = function (title,url) {
    if (window.sidebar) { 
        window.sidebar.addPanel(title, url,""); 
    } else if( document.all ) {
        window.external.AddFavorite( url, title);
    } else if( window.opera && window.print ) {
        return true;
    }
};







/*
 * 菜单写到页面函数
 @ SelectId			当前选中的页面对页的a---id
 @ PageRebackUrl	退出后返回的页面
 @ ShowInfo			是否显示右上角个人信息条
 @ IsLoading		是否在满足条件下重新拉数据
*/
var g_donator_info	=Array();
var t_donator_info	=Array();
var total_time = 0;



var ptloginopenfun=function(npoflag){
	if(typeof npoflag =="undefined") npoflag = 0
	
	GlobalLoginTypeSet = npoflag;
	ptlogin_init('用户登录',$.Tjs_GetThisPageUrl(),'','','',true,0);
	//alert(openparam_info);
	openLogin(openparam_info);
};


var ptlogoutopenfun=function(PageRebackUrl){
	//alert(PageRebackUrl); return false;
	if(typeof(PageRebackUrl)=="undefined" || PageRebackUrl==""){
		var PageRebackUrl = "";
	}

	$.Tjs_clearCookie("uin","","qq.com");
	$.Tjs_clearCookie("skey","","qq.com");
	$.Tjs_clearCookie("uin_cookie","","qq.com");
	$.Tjs_clearCookie("verifysession","","qq.com");
	$.Tjs_clearCookie("adid","","qq.com");
	$.Tjs_clearCookie("euin_cookie","","qq.com"); 
	$.Tjs_clearCookie("GY_G_DONATOR","","qq.com"); 
	$.Tjs_clearCookie("GY_qqnick","","qq.com"); 
	$.Tjs_clearCookie("GY_ThisDo_Url","","qq.com");
	$.Tjs_clearCookie("GY_Npoobject","","qq.com");

//	try{
//		var w=$.Tjs_Fid('loginout_div');
//		if($.Tjs_Fempty(w)){
//			w=document.createElement('div');
//			w.id='loginout_div';
//			w.style.cssText = 'display:block;display:none;left: 0px; top: 0px; width:3px; height:0px; padding:0; margin:0px;';
//			document.body.insertBefore(w, document.body.firstChild);
//			w.innerHTML="<iframe name='loginout_frame' id='loginout_frame' frameborder='0' scrolling='auto' width='0' height='0' src='http://npoapp.gongyi.qq.com/weblogin/ptlogout'></iframe>";
//		}else{
//			document.getElementById("loginout_frame").src="http://npoapp.gongyi.qq.com/logou/ptlogout";
//		}
//	}catch(e) {}
	


	if(PageRebackUrl=='') window.location.reload();
	else window.location = PageRebackUrl;
};



var IsLoginAndLogin=function(){
	if (!$.Tjs_getCookie("uin") && !$.Tjs_getCookie("skey")){
		ptlogin_init('举报前请先登录',$.Tjs_GetThisPageUrl(),'','','',true,1);
		openLogin(openparam_info);
	}
};

var ShowHourPageHtml = function(OPbject,times){
	//HourArray
	if(typeof(times)=="undefined" || times==""){
		var times = "00:00";
	}

	for(var i=0;i<HourArray.length;i++){
		var newItem		=  document.createElement("OPTION") ;
		newItem.text	=  HourArray[i];
		//alert(HourArray[i]);
		newItem.value	=  HourArray[i];
		document.getElementById(OPbject).add(newItem);
	}


};








/*2010-12改版后添加 npo系统登录信息显示*/
/* 右上角登录ＪＳ*/
var Global_NpoObject  = null;
var _MenuShowRightUserInfoLoading_2011 =function (PageRebackUrl,IsLoading){
	if(typeof global_userinfoobject == "undefined" || IsLoading){
		$.getScript("http://npoapp.gongyi.qq.com/_GetUserInfo", function(){
			//alert(PageRebackUrl);
			_MenuShowNpoLoginInit(global_userinfoobject,PageRebackUrl);
		});
	}else{
		//alert(PageRebackUrl);
		_MenuShowNpoLoginInit(global_userinfoobject,PageRebackUrl);
	}
};

var _MenuShowNpoLoginInit = function(JsonoBject,PageRebackUrl){
		var Gongyi_Head_Set = "";
		if(JsonoBject.global_gongyiuserinfo== 0){
			Gongyi_Head_Set+="		<a href='javascript:ptloginopenfun(1)'>[请登录]</a>";
			
			//emilydeng(2011/6/29)
			//当ie6下PagaeLoadUserInfoDiv载入不对，特加
			if ($.browser.msie&&($.browser.version == "version6.0"))
			{
				document.getElementById("PagaeLoadUserInfoDiv").innerHTML = Gongyi_Head_Set;
			}
			else
			{
				$("#PagaeLoadUserInfoDiv").html(Gongyi_Head_Set);
			}
			return  false;
		}
	
		var usermenustr = "";
		if(JsonoBject.usertyperesult == 0)
		{
			usermenustr = "<a href='http://gongyi.qq.com/mygongyi.htm' target='_blank'>个人中心</a>";
			//20110501 junhaiguo buglist25 序列3 名称不需要链接
			Gongyi_Head_Set += "<a style=\"cursor:default;text-decoration:none\" title=\""+JsonoBject.jsonnick+"\">"+JsonoBject.jsonnick+"</a>"+usermenustr;
			//Gongyi_Head_Set += "<a href='http://gongyi.qq.com/mygongyi.htm' target='_blank' title='点击进入个人中心'>"+JsonoBject.jsonnick+"</a>"+usermenustr;
		}
		else if(JsonoBject.usertyperesult == 1)
		{
			JsonoBject.nickAll		= $.Tjs_HtmlEncode(unescape(JsonoBject.nick));
			JsonoBject.registernameAll	= $.Tjs_HtmlEncode(unescape(JsonoBject.registername));

			JsonoBject.nick		=$.Tjs_HtmlEncode(unescape(JsonoBject.nick)).substr(0,15);
			JsonoBject.registername	=$.Tjs_HtmlEncode(unescape(JsonoBject.registername)).substr(0,15);

			usermenustr = "<a href='http://npoapp.gongyi.qq.com/_OrgCenter'>管理中心</a><a href='http://gongyi.qq.com/mygongyi.htm' target='_blank'>个人中心</a>";

			//20110501 junhaiguo buglist25 序列3 名称不需要链接
			Gongyi_Head_Set += "<a style=\"cursor:default;text-decoration:none\" title=\""+JsonoBject.nickAll+"\">"+JsonoBject.nick+"</a>"+usermenustr;
			//Gongyi_Head_Set += "<a href='http://npoapp.gongyi.qq.com/_OrgCenter'  title='点击进入管理中心'>"+JsonoBject.nick+"</a>"+usermenustr;
		}
		else if(JsonoBject.usertyperesult == 2)
		{
			JsonoBject.nickAll		= $.Tjs_HtmlEncode(unescape(JsonoBject.nick));
			JsonoBject.registernameAll	= $.Tjs_HtmlEncode(unescape(JsonoBject.registername));
			JsonoBject.nick		=$.Tjs_HtmlEncode(unescape(JsonoBject.nick)).substr(0,15);
			JsonoBject.registername	=$.Tjs_HtmlEncode(unescape(JsonoBject.registername)).substr(0,15);
			usermenustr = "<a href='http://npoapp.gongyi.qq.com/_OrgCenter'>管理中心</a><a href='http://gongyi.qq.com/mygongyi.htm' target='_blank'>个人中心</a>"

			//20110501 junhaiguo buglist25 序列3 名称不需要链接
			Gongyi_Head_Set += "<a style=\"cursor:default;text-decoration:none\" title=\""+JsonoBject.nickAll+"\">"+JsonoBject.nick+"</a>"+usermenustr;
			//Gongyi_Head_Set += "<a href='http://npoapp.gongyi.qq.com/_OrgCenter'  title='点击进入管理中心'>"+JsonoBject.nick+"</a>"+usermenustr;
		}
	
		Gongyi_Head_Set +="<a href='javascript:ptlogoutopenfun(\""+PageRebackUrl+"\")'>[退出]</a>";

		$("#PagaeLoadUserInfoDiv").html(Gongyi_Head_Set);
		return Gongyi_Head_Set;	

}







var PageLoadOrgInfoRender = function (uin,type){
	$.getScript("http://npoapp.gongyi.qq.com/getjsonforweb/getShortOrgJson/"+uin, function(){
		var orgLogoImg = org_info_short.LOGO_60;
		var orgTitle = org_info_short.NAME == "" ? "default title" : org_info_short.NAME;
	

		//modify by junhaiguo 2011.3.18 客人态title和头像点击后跳转到首页

		if(type!=1)
		{	
			var url = "http://gongyi.qq.com/npo/customer.htm?uin="+uin;
			var orgTitle = "<a href="+url+"  style=\"color:#000000\" style=\"text-decoration:none\">"+orgTitle+"</a>";
			$("#PageLoadOrgInfoA").attr("href",url);
		}
		
		$("#PageLoadOrgInfoTitle").html(orgTitle);
		$("#PageLoadOrgInfoImage").attr("src",orgLogoImg);
		$("#PageLoadOrgInfoImage").attr("width",58);
		$("#PageLoadOrgInfoImage").attr("height",58);
		if($("#t_content"))
		{
			var T_Url = org_info_short.T_URL;
			if(T_Url=="" || T_Url=="undefined" || T_Url == null || typeof(T_Url=="undefined"))
			{
				var T_Src = "该组织暂未填写微博地址";
				$("#t_iframe").html(T_Src);	
				$("#t_href").html("&nbsp;");	
				$("#urltop").hide();	
				
			}
			else
			{
				var T_Name = T_Url.substr(T_Url.lastIndexOf("/")+1,T_Url.length-T_Url.lastIndexOf("/"));
				var T_Src = "http://radio.t.qq.com/open.php?type=2&value="+T_Name+"&freq=10&initNum=9&pickNum=10";
				$("#t_content").attr("src",T_Src);	
				var T_Home = "http://t.qq.com/"+T_Name;
				$("#t_home").attr("href",T_Home);	
			}
		}
	});
};



//add by niou for img begin
function   SetImgSize(pimg,iw,ih)   {                      
  var   img   =   new   Image();                           
  img.src = pimg.src;                                      
  var   w   =   iw;                                        
  var   h   =   ih;                                        
                                                           
 if(img.width>0 && img.height>0)                           
  {                                                        
  if(img.width>iw||img.height>ih)                          
  {                                                        
    if((iw   /   ih)   >   (img.width   /   img.height))   
    {                                                      
        h =  ih;                                           
        w   =   img.width   *   (ih   /   img.height);     
    }                                                      
    else                                                   
    {                                                      
        w   =   iw;                                        
        h   =   img.height   *   (iw   /   img.width);     
    }                                                      
   }                                                       
   else                                                    
   {                                                       
        w = img.width;                                     
        h = img.height;                                    
   }                                                       
 }                                                         
 else                                                      
 {                                                         
  w = iw;                                                  
  h = ih;                                                  
 }                                                         
                                                           
 pimg.width=w;                                             
 pimg.height=h;                                            
 pimg.style.display="";                                    
}    
//add by niou for img end


















/*  |xGv00|42eff00f11902a6df1498cb3c0e2c0fe */