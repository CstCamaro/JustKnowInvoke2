
/////input 变色提示函数
		function tip_blur(input,id) {
			if($(input).val().replace(/(^\s*)|(\s*$)/g, '')==''){
				$(input).css("border","1px dashed red");
				$(id).css("color","red");
			}
		}
		
		function tip_focus(_input,_id) {
			$(_input).css("border","1px solid #ccc");	     
			$(_id).css("color","#acacac");
		}

/////地址 省市 单独函数	
		function tip_blur_1(input,id) {
			if($(input).val()=='0'){
				$(input).css("border","1px dashed red");
				$(id).css("color","red");
			}
		}

// 跳转函数
	function click_scroll(id_) {
	  var scroll_offset = $(id_).offset();  //得到pos这个div层的offset，包含两个值，top和left
	  $("body,html").animate({
	   scrollTop:scroll_offset.top  //让body的scrollTop等于pos的top，就实现了滚动
	   },500);
	   return false;
	  
	 }	

//加载验证码//图片验证成功后就失效
		function veriyfyCode_fun(){
			var captcha_img = document.getElementById('captcha_img');
			captcha_img.src = "http://captcha.qq.com/getimage?aid=30000101&"+Math.random();	
		}




//------------ http://www.npo_application_project.html--------------------------------------------

	function check_agree(){//是否同意《协议》
	//未登录提示
			if(global_userinfoobject.uin<10000){
				ptloginopenfun()
				return false ;
			};
		if(!$("input[type='checkbox']").attr("checked"))
		{$.gyUtil.showDialog1({title:'温馨提示',content:'请同意腾讯用户协议',flag:3});
		return false;}
	}
	//检测setp1是否提交过，提交过则自动填写提交过的内容
		function isSubmit_npo1(){
			$.ajax({
				'url':'http://npoapp.gongyi.qq.com/npov2/reg/step1?g_tk='+$.gyUtil.getToken(),
				'type':'get',
				'dataType':'jsonp',
				'jsonp':'jsoncallback',
				success:function(data){
						//已经实名认证 跳到首页
						if(data.code==2111){window.location = 'http://gongyi.qq.com/succor/'}
						
						//已经提交过(0)、审核通过(1),和不通过(3),可以打开页面，不可修改
						if(data.info.status==0||data.info.status==3||data.info.status==1){
								if(data.info.type==1){window.location = 'http://gongyi.qq.com/npov2/jigou_application_project6.html'}
								
						}
						//返回修改(2) 可以修改
						if(data.info.status==2){
								if(data.info.type==1){window.location = 'http://gongyi.qq.com/succor/'}
								//if(data.info.type==2){window.location = 'http://gongyi.qq.com/succor/'}
						}

					
					//判断注册到第几步
					if(data.info.step==1){
							$("#nav_2").wrap("<a  class='no_decoration'  href='http://gongyi.qq.com/npov2/npo_application_project2.html'></a>");
	 					   $("#nav_3").wrap("<a  class='no_decoration'  href='http://gongyi.qq.com/npov2/npo_application_project3.html'></a>");}
						if(data.info.step==2){
							$("#nav_2").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project2.html'></a>");
							 $("#nav_3").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project3.html'></a>");
							 $("#nav_4").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project4.html'></a>");
							 }
						 //除了提交中 ，其他状态都可点击页卡；
						if(data.info.status==0||data.info.status==1||data.info.status==2||data.info.status==3){
							$("#nav_2").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project2.html'></a>");
							 $("#nav_3").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project3.html'></a>");
							 $("#nav_4").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project4.html'></a>");
							}
						
						
				}
			});
		}
//------------ http://www.npo_application_project2.html--------------------------------------------
	
//检测setp1是否提交过，提交过则自动填写提交过的内容
	var step=""//判断注册到第几步
	
	
		function isSubmit_npo2(){
			$.ajax({
				'url':'http://npoapp.gongyi.qq.com/npov2/reg/step1?g_tk='+$.gyUtil.getToken(),
				'type':'get',
				'dataType':'jsonp',
				'jsonp':'jsoncallback',
				success:function(data){
					//已经实名认证 跳到首页
						if(data.code==2111){window.location = 'http://gongyi.qq.com/succor/'}
						
						//已经提交过(0)、审核通过(1),和不通过(3),可以打开页面，不可修改0l
						if(data.info.status==0||data.info.status==3||data.info.status==1){
								if(data.info.type==1){window.location = 'http://gongyi.qq.com/succor/'}
								$("input").attr("disabled","disabled");
							    $('.form_radio_group label').die();
								$("select").attr("disabled","disabled");
								$("textarea").attr("disabled","disabled");
								$(".form_group.row").eq(10).hide();
								$(".col_main.form_btn_group.form_btn_group2").html('<a href="http://gongyi.qq.com/npov2/npo_application_project.html" class="btn_default_large fl">返回上一页</a><input type="button" name="button"  value="保存，下一步" class="btn_primary_large fl" />');
								$("input[type='button']").click(function(){window.location ='http://gongyi.qq.com/npov2/npo_application_project3.html'});
						}
						//返回修改(2) 可以修改
						if(data.info.status==2){
								if(data.info.type==1){window.location = 'http://gongyi.qq.com/succor/'}
								//if(data.info.type==2){window.location = 'http://gongyi.qq.com/succor/'}
						}


				
					if(data.code== 0){
						
								
						//填写过了则自动填写（所有 <input> class=getdat）
						$('.getdate').each(function(){
							if(!!data.info[$(this).attr('name')]) 
								$(this).val(data.info[$(this).attr('name')]);
						});
						
						//ie 输入框默认提示
						if(data.info.address){
								
									if(data.info.status==2||data.info.status==5){
										$("#address").addClass("black")
									}
							}
						else{
									$("#address").val("详细地址").addClass("grey")
									}
						if(data.info.summary){
							if(data.info.status==2||data.info.status==5){
										$("#summary").addClass("black")
									}
									
							}
						else{
									$("#summary").val("筹款来源、特色项目、服务片区、机构愿景、希望解决的社会问题").addClass("grey");
							}
						if(data.info.home_web){
							if(data.info.status==2||data.info.status==5){
										$("#home_web").addClass("black")
									}
									
							}
						else{
									$("#home_web").val("网页/博客/QQ空间/微博").addClass("grey");
							}
						
						if(data.info.type==1){$("input[name='type']").val(2)}
						if(data.info.sub_type==1){$("input[name='sub_type']").val("")}
						if(!!data.info[$('.getdate_1').attr('name')]) {
							$('.getdate_1').val(data.info[$('.getdate_1').attr('name')]);
						}
						//判断注册到第几步
					if(data.info.step==1){
							$("#nav_1").wrap("<a  class='no_decoration'  href='http://gongyi.qq.com/npov2/npo_application_project.html'></a>");
	 					   $("#nav_3").wrap("<a  class='no_decoration'  href='http://gongyi.qq.com/npov2/npo_application_project3.html'></a>");}
						if(data.info.step==2){
							$("#nav_1").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project.html'></a>");
							 $("#nav_3").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project3.html'></a>");
							 $("#nav_4").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project4.html'></a>");
							 }
							 //除了提交中 ，其他状态都可点击页卡；
						if(data.info.status==0||data.info.status==1||data.info.status==2||data.info.status==3){
							$("#nav_1").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project.html'></a>");
							 $("#nav_3").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project3.html'></a>");
							 $("#nav_4").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project4.html'></a>");
							}
						
						//省市地址联动函数
						ChangeChild(data.info.province_id-1,Province_City[data.info.province_id-1][1], 'city');
						
						if(!!data.info[$('.getdate_2').attr('name')]) {
							$('.getdate_2').val(data.info[$('.getdate_2').attr('name')]);
						}
						if(data.info.area_id){
							$('#'+data.info.area_id).addClass("on");
							$("input[name='area_id']").each(function() {
									if($(this).attr("value")==data.info.area_id){$(this).attr("checked","checked")};
							});
						}
						
						
			
						
					}
					
		}
	});
}

	
////////////提交前检查函数/////


		var m="";
		var n=0;
		function check_befor_submit_npo2(){
			//未登录提示
			if(global_userinfoobject.uin<10000){
				ptloginopenfun()
				return false ;
			};
			if ($("input[name='uin']").val()==""){
				tip_blur("input[name='uin']","");m="input[name='uin']";
			}
			if ($("#vcard").val()==""){
				tip_blur("#vcard","");
				$("#vcard_tip").css("display","inline");
				m="#vcard";
			}
			if ($("#summary").val().replace(/(^\s*)|(\s*$)/g, '')==""||$("#summary").val()=="筹款来源、特色项目、服务片区、机构愿景、希望解决的社会问题"){
				//$("#summary").val("筹款来源、特色项目、服务片区、机构愿景、希望解决的社会问题").addClass("grey");
				//tip_blur("#summary","");
				$("#summary").css("border","1px dashed red");
				$("#summary_msg1").css("display","none"); 
				$("#summary_msg2").css("display","block");
				m="#summary";
			}
			//官方主页提示	
				var str=$("#home_web").val();
				var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
				var objExp=new RegExp(Expression);
			if (!objExp.test(str)||$("#home_web").val()=="网页/博客/QQ空间/微博") {
				//$("#home_web").val("网页/博客/QQ空间/微博").addClass("grey");
				//tip_blur("#home_web","");
				$("#home_web").css("border","1px dashed red");
				$("#home_web_msg").css("display","block");
				m="#home_web";}
				
			if($("#qz_num").val()==''){
				tip_blur("#qz_num","");
				$("#scope_tips").css("display","block");
				m="#qz_num";
			}
			if($("#jz_num").val()==''){
				tip_blur("#jz_num","");
					$("#scope_tips").css("display","block");
				m="#jz_num";
			}
			if($("#zyz_num").val()==''){
				tip_blur("#zyz_num","");
					$("#scope_tips").css("display","block");
				m="#zyz_num";
			}
			if($("#year_money").val()==''){
				tip_blur("#year_money","");
				$("#per_year_money_tips").css("color","red");
				m="#year_money";
			}
			
			$("input[name='area_id']").each(function(){
				if(	$(this).attr("checked")=="checked"){
					n=1;
				}
			});
			
			if(n==0){
				m="#71";
				$("#area_id_tips").css("display","block");
				$("label.form_radio_label").css("border","1px red dashed");
			}

			if($("#org_property").val()==''){
				tip_blur("#org_property","");
				$("#type_tips").css("display","block");
				m="#org_property";
			}

			if ($("#address").val().replace(/(^\s*)|(\s*$)/g, '')==""||$("#address").val()=="详细地址") {
				//$("#address").val("详细地址").addClass("grey");
				$("#address").css("border","1px dashed red");
				$("#address_tips").css({"display":"block","padding-left":"305px"});
				m="#address";
			}
			if($("#city").val()=='0'){
				tip_blur_1("#city","");
				$("#address_tips").css({"display":"block","padding-left":"150px"});
				m="#city";
			}
			if($("#province").val()=='0'){
				tip_blur_1("#province","");
				$("#address_tips").css({"display":"block","padding-left":"0px"});
				m="#province";
			}

			if($("#phone").val().length<8&&$("#phone").val().length>0){
				$("#phone").css("border","1px dashed red");
				$("#proj_tel_msg_1").css("display","inline");
				$("#proj_tel_msg").css("display","none");m="#phone";
			}
			else if ($("#phone").val().length==''){
				tip_blur("#phone","#proj_tel_msg");
				m="#phone";
			}
			
			if ($("#full_name").val().replace(/(^\s*)|(\s*$)/g, '')=="") {
				tip_blur("#full_name","#full_name_msg");
				m="#full_name";
			}
			if(!$("#checkbox_confirm").attr("checked")){
				$("#proj_qq_confirm").css("color","red");
				m="#checkbox_confirm";
			}
			
			if(m!=""){
				click_scroll(m);
				m="";
				return false;
			}
			
		}

//表格回调函数
		var callback_from_npo2 = function(data){
			if(data.code != 0) 
			{
			     if(data.code == 2093){
					 $.gyUtil.showDialog1({title:'温馨提示',content:'验证码错误',flag:3})}
			     else  if(data.code == 2106){
					// $.gyUtil.showDialog1({title:'温馨提示',content:'主页地址错误，地址请用"http://"开头',flag:3})
					}

				 else{
					 $.gyUtil.showDialog1({title:'温馨提示',content:data.info,flag:3})}
				

				veriyfyCode_fun();
				return false;
			}
			window.location = "http://gongyi.qq.com/npov2/npo_application_project3.html";
		}

//------------ http://www.npo_application_project3.html--------------------------------------------


//检测上一步是否提交过没有则跳回上一步,提交过了自动填写
	function  isSubmit_npo3(){
		$.ajax({
			'url':'http://npoapp.gongyi.qq.com/npov2/reg/step2?g_tk='+$.gyUtil.getToken(),
			'type':'get',
			'dataType':'jsonp',
			'jsonp':'jsoncallback',
			success:function(data){
						//已经实名认证 跳到首页
						if(data.code==2111){window.location = 'http://gongyi.qq.com/succor/'}
						
						//已经提交过(0)、审核通过(1),和不通过(3),可以打开页面，不可修改0l
						if(data.info.status==0||data.info.status==3||data.info.status==1){
								if(data.info.type==1){window.location = 'http://gongyi.qq.com/succor/'}
								
								$("input").attr("disabled","disabled");
							   $(".col_main.form_btn_group.form_btn_group2").html('<a href="http://gongyi.qq.com/npov2/npo_application_project2.html" class="btn_default_large fl">返回上一页</a><input type="button" name="button" value="保存，下一步" class="btn_primary_large fl" />');
								$("input[type='button']").click(function(){window.location ='http://gongyi.qq.com/npov2/npo_application_project4.html'});
						}
						//返回修改(2) 可以修改
						if(data.info.status==2){
								if(data.info.type==1){window.location = 'http://gongyi.qq.com/succor/'}
								//if(data.info.type==2){window.location = 'http://gongyi.qq.com/succor/'}
						}

				
				if(data.code == 2101){
					
					$.gyUtil.showDialog1({title:'温馨提示',content:'上一步没有填写',flag:3,sureCallback:function(){window.location = 'http://gongyi.qq.com/npov2/npo_application_project.html'}
						});
				
					return false;
					}
				else if(data.code==0)
				
					{
							
						//判断注册到第几步
					if(data.info.step==1){
							$("#nav_1").wrap("<a  class='no_decoration'  href='http://gongyi.qq.com/npov2/npo_application_project.html'></a>");
	 					   $("#nav_2").wrap("<a  class='no_decoration'  href='http://gongyi.qq.com/npov2/npo_application_project2.html'></a>");}
						if(data.info.step==2){
							$("#nav_1").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project.html'></a>");
							 $("#nav_2").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project2.html'></a>");
							 $("#nav_4").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project4.html'></a>");
							 } 
							 //除了提交中 ，其他状态都可点击页卡；
						if(data.info.status==0||data.info.status==1||data.info.status==2||data.info.status==3){
							$("#nav_1").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project.html'></a>");
							 $("#nav_2").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project2.html'></a>");
							 $("#nav_4").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project4.html'></a>");
							}
							if(data.info.type==1){window.location = "http://gongyi.qq.com/npov2/npo_application_project.html";}
						$('.getdate').each(function(){
						if(!!data.info[$(this).attr('name')]) $(this).val(data.info[$(this).attr('name')]);})
						
						
					}
				else 
					{
					//alert(data.info);
					return false;
					}
				
				}
			});
	}


////提交按钮检测
	
	function check_befor_submit_npo3(){
		//未登录提示
			if(global_userinfoobject.uin<10000){
				ptloginopenfun()
				return false ;
			};
		
		var m_npo3="";
		var s = $("input[name='master_email']").val();
		var o=/@/ig;
		var r=o.test(s);	
		if ($("input[name='master_email']").val()=="") {tip_blur("input[name='master_email']","#master_email_span");m_npo3="#master_email"}
			if (!r) {$("input[name='master_email']").css("border","1px dashed red");$("#master_email_span").hide();$("#9").show();m_npo3="#master_email"}
			
			if ($("input[name='master_user_phone']").val()=="") {tip_blur("input[name='master_user_phone']","#master_user_phone_span");m_npo3="#master_user_phone"}
			if($("input[name='master_user_phone']").val().length>0&&$("input[name='master_user_phone']").val().length<7){
				$("input[name='master_user_phone']").css("border","1px dashed red");
			    $("#master_user_phone_span").css("display","none");$("#master_user_phone_1").css("display","inline");m_npo3="#master_user_phone"}
			
			if ($("input[name='master_cardid']").val()=="") {tip_blur("input[name='master_cardid']","#master_cardid_span");m_npo3="#master_cardid"}
			if($("input[name='master_cardid']").val().length>0&&$("input[name='master_cardid']").val().length<15){
				$("input[name='master_cardid']").css("border","1px dashed red");
			    $("#master_cardid_span").css("display","none");$("#master_cardid_1").css("display","inline");m_npo3="#master_cardid"}
				
			
			if ($("input[name='master_user_name']").val().replace(/(^\s*)|(\s*$)/g, '')=="") {tip_blur("input[name='master_user_name']","#master_user_name_span");m_npo3="#master_user_name"}
			
			if ($("input[name='charge_phone']").val()=="") {tip_blur("input[name='charge_phone']","#charge_phone_span");m_npo3="#charge_phone"}
			if($("input[name='charge_phone']").val().length>0&&$("input[name='charge_phone']").val().length<11){
				$("input[name='charge_phone']").css("border","1px dashed red");
			    $("#charge_phone_span").css("display","none");$("#charge_phone_1").css("display","inline");m_npo3="#charge_phone"}
			
			if ($("input[name='charge_office_phone']").val()=="") {tip_blur("input[name='charge_office_phone']","#charge_office_phone_span");m_npo3="#charge_office_phone"}
			if($("input[name='charge_office_phone']").val().length>0&&$("input[name='charge_office_phone']").val().length<7){
				$("input[name='charge_office_phone']").css("border","1px dashed red");
			    $("#charge_office_phone_span").css("display","none");$("#charge_office_phone_1").css("display","inline");m_npo3="#charge_office_phone"}
			
			if ($("input[name='charge_cardid']").val()=="") {tip_blur("input[name='charge_cardid']","#charge_cardid_span");m_npo3="#charge_cardid"}
			if($("input[name='charge_cardid']").val().length>0&&$("input[name='charge_cardid']").val().length<15){
				$("input[name='charge_cardid']").css("border","1px dashed red");$("#charge_cardid_span").css("display","none");$("#charge_cardid_1").css("display","inline");m_npo3="#charge_cardid"}
			
			if ($("input[name='charge_name']").val().replace(/(^\s*)|(\s*$)/g, '')=="") {tip_blur("input[name='charge_name']","#charge_name_span");m_npo3="#charge_name"}
			
			if(m_npo3!=""){ click_scroll(m_npo3);m_npo3="";return false;}
		
		
		}
//提交项目后的回调函数

	var callback_from_npo3 = function(data){
		
		if(data.code != 0){
			
			$.gyUtil.showDialog1({title:'温馨提示',content:data.info,flag:3});
			return false;} 
		window.location = 'http://gongyi.qq.com/npov2/npo_application_project4.html';
	}
	
	
//------------ http://www.npo_application_project4.html--------------------------------------------			




		var logo=0;  //判断logo是否上传过
		var cert=0;  //判断cert是否上传过
		var cert_preview="";//预览按钮链接
		var url="";
		var logo_url="";
//本页面提交过了，则自动填写提交的内容		
		
		function isSubmit_npo4(){
		$.ajax({
		
			'url':'http://npoapp.gongyi.qq.com/npov2/reg/step3?g_tk='+$.gyUtil.getToken(),
			'type':'get',
			'dataType':'jsonp',
			'jsonp':'jsoncallback',
			success:function(data){
						//已经实名认证 跳到首页
						if(data.code==2111){window.location = 'http://gongyi.qq.com/succor/'}
						
						//已经提交过(0)、审核通过(1),和不通过(3),可以打开页面，不可修改0l
						if(data.info.status==0||data.info.status==3||data.info.status==1){
								if(data.info.type==1){window.location = 'http://gongyi.qq.com/succor/'}
								$("select").attr("disabled","disabled");
								$("input").attr("disabled","disabled");
								$("#logo_upload,#uploadImg,#uploadImg_3,#cert_upload,#view_img,#cert_tip").hide();
								
							   $(".col_main.form_btn_group.form_btn_group2").html('<a href="http://gongyi.qq.com/npov2/npo_application_project3.html" class="btn_default_large fl">返回上一页</a><input type="button" name="button" id="submit_4" value="保存，下一步" class="btn_primary_large fl" />');
								$("#submit_4").click(function(){window.location ='http://gongyi.qq.com/npov2/npo_application_project5.html'});
						}
						//返回修改(2) 可以修改
						if(data.info.status==2){
								if(data.info.type==1){window.location = 'http://gongyi.qq.com/succor/'}
								//if(data.info.type==2){window.location = 'http://gongyi.qq.com/succor/'}
						}

				
				
				  if(data.code == 2101){
					 
						$.gyUtil.showDialog1({title:'温馨提示',content:'上一步没有填写',flag:3,sureCallback:function(){window.location = 'http://gongyi.qq.com/npov2/npo_application_project.html';}});
						return false;
						}
					if(data.code==0){	
						// ie 输入框提示
						if(data.info.bank_name){
								 bank_name=data.info.bank_name.split('-');
								 $("#bank_name_1").val(bank_name[0]);
							$("#bank_name_2").val(bank_name[1]);
							if(data.info.status==2||data.info.status==5){
									$("#bank_name_2").addClass("black");
									}
							       
							}
						else{
									$("#bank_name_2").val("请填写支行信息").addClass("grey")
									}
					
						if(data.info.bank_user_code){
							if(data.info.status==2||data.info.status==5){
									$("#use_code").addClass("black").val(data.info.bank_user_code)
									}
									
							}
						else{
									$("#use_code").val("请填写机构银行账户号码").addClass("grey")
							}
						
						//判断注册到第几步
						if(step ==1){
							   $.gyUtil.showDialog1({title:'温馨提示',content:'上一步没有填写',flag:3,sureCallback:function(){
								window.location = 'http://gongyi.qq.com/npov2/npo_application_project3.html';}});
								return false;
						}
						if(data.info.step==2){
							$("#nav_1").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project.html'></a>");
							 $("#nav_2").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project2.html'></a>");
							 $("#nav_3").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project3.html'></a>");
							 } 
							 //除了提交中 ，其他状态都可点击页卡；
						if(data.info.status==0||data.info.status==1||data.info.status==2||data.info.status==3){
							$("#nav_1").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project.html'></a>");
							 $("#nav_2").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project2.html'></a>");
							 $("#nav_3").wrap("<a   class='no_decoration' href='http://gongyi.qq.com/npov2/npo_application_project3.html'></a>");
							}
						
							
							if(data.info.type==1){window.location = "http://gongyi.qq.com/npov2/npo_application_project.html";}
							$('.getdate').each(function(){
							if(!!data.info[$(this).attr('name')]) $(this).val(data.info[$(this).attr('name')]);})
							
							$("#use_name").val(data.info.full_name);
							
							if(data.info.logo&&data.info.logo.syn_url){
								logo=1;
								logo_url=data.info.logo.syn_url;
								$("#uploadImg_logo").html('<img  style="padding-top:10px;" src="'+logo_url+'/200?'+Math.random()+'" />');
								  $("#logo_upload").text("更改图片");
								};
								
							if(data.info.cert&&data.info.cert.syn_url){
								
								cert=1;
								cert_preview=data.info.cert.syn_url+"/800"+"?_t"+Math.random();
								$("#cert_img").attr("src",data.info.cert.syn_url+'/800');
								$("#cert_img").css({"height":"200px","width":"200px","display":"block"})
								 $("#cert_tip").css("display","none");
								   $("#cert_upload").text("更改图片");
								   if(data.info.status==2||data.info.status==5){
								  		  $("#view_img").css("display","block");
									}
									
							   };
							   

							 
						}
						
				
				
			}
			});
		}
///////////提交前检查函数////////////////////////
	function befor_submit_check_npo4(){
		//未登录提示
			if(global_userinfoobject.uin<10000){
				ptloginopenfun()
				return false ;
			};
				var m_npo4="";
				
				/*if ($("#use_code").val().length>21||$("#use_code").val().length<13) 
							{$("#use_code").val("请填写正确机构银行账户号码").addClass("grey");$("#use_code").css("border","1px dashed red");m_npo4="#use_code";}*/
				if ($("#use_code").val()==""||$("#use_code").val()=="请填写机构银行账户号码") 
					{$("#use_code").val("请填写机构银行账户号码").addClass("grey");$("#use_code").css("border","1px dashed red");m_npo4="#use_code";}
				if ($("#bank_name_2").val().replace(/(^\s*)|(\s*$)/g, '')==""||$("#bank_name_2").val()=="请填写支行信息") 
					{$("#bank_name_2").val("请填写支行信息").addClass("grey");$("#bank_name_2").css("border","1px dashed red");m_npo4="#bank_name_2";}	
				if($("#bank_name_1").val()==""){$("#bank_name_1").css("border","1px dashed red");m_npo4='#bank_name_1';}
				if(m_npo4!=""){click_scroll(m_npo4);m_npo4="";return false;}
				if(logo==0){$.gyUtil.showDialog1({title:'温馨提示',content:'请上传机构logo',flag:3});return false}
				if(cert==0){$.gyUtil.showDialog1({title:'温馨提示',content:'请上传机构证书',flag:3});return false}
				if($("#bank_name_1").val()!=""){$("#bank_name").val($("#bank_name_1").val()+"-"+$("#bank_name_2").val())}
		
		}
		
//表格回调函数
		var callback_form_npo4 = function(data){
			
			if(data.code != 0){
				 $.gyUtil.showDialog1({title:'温馨提示',content:data.info,flag:3});
				 return false;
				
				 }
			 window.location = 'http://gongyi.qq.com/npov2/npo_application_project5.html';
		}

//上传机构证书回调函数

		var callback_cert_npo4 = function(data){
			
			if(data.code==0){	
				
				url=data.info.tfs.url+"/800"+"?_t"+Math.random();
			        cert_preview=url;
					$("#cert_img").attr("src",url);
					$("#cert_img").css("height","200px");
					$("#cert_img").css("width","200px");
					$("#cert_img").css("display","block");
					 $("#cert_tip").css("display","none");
					  $("#cert_upload").text("更改图片");
					  $("#view_img").css("display","block");
				cert=1;
				}
			/*else if(data.code==99){
					
					$.gyUtil.showDialog1({title:'温馨提示',content:"图片大小不能超过1M",flag:3});
				}*/
			else
				$.gyUtil.showDialog1({title:'温馨提示',content:data.info,flag:3});
			}
/////////////////////////图片上传/////////////////////////////////////////////////////
  			 var logo_preview="";
			var logoImg = {};
		logoImg = {
			'defaultSize':{'x':200,'y':200},
			'submit':function(){
				$("#form_upload").prepend('<input type="hidden" name="g_tk" value="'+$.gyUtil.getToken()+'" />');
				$("#form_upload").submit();
			},
			'uploadData':{},
			'afterUpload':function(data){
				
				
				logoImg.uploadData = data.info;
				if(data.code != 0){
					/*if(data.code==99){
						$.gyUtil.showDialog1({title:'温馨提示',content:"图片大小不能超过1M",flag:3});
						return false;}
					else*/
					 $.gyUtil.showDialog1({title:'温馨提示',content:data.info,flag:3});
					return false;
				}
				//$('#updateBtn2').show();
				//初始化截图工具
				$("#uploadImg_logo").show().tmpl('tpl_uploadFile',data.info);
				$("#uploadFormWrap").tmpl('tpl_uploadForm',data.info);
				var _minWidth = Math.ceil(this.defaultSize['x']*this.defaultSize['x']/parseInt(data.info.width));
				var _minHeight = Math.ceil(_minWidth*9/16);
				jQuery('#cropbox_logo').Jcrop({
					setSelect:[0,0,this.defaultSize['x'],this.defaultSize['y']],
					aspectRatio: this.defaultSize['x']/this.defaultSize['y'],
					onSelect: logoImg.updateCoords,
					onChange: logoImg.showPreview,
					allowSelect:false,
					minSize:[_minWidth,_minHeight]
				});
				//$('#updateBtn2').show();
			},
			//预览视图
			showPreview:function(coords)
			{
				var _curSize = {w:200, h:parseInt(logoImg.uploadData.height*200/logoImg.uploadData.width)}
				var rx = 100 / coords.w;
				var ry = 100 / coords.h;	
				$('#preview_logo').css({
					width: Math.round(rx * _curSize.w) + 'px',
					height: Math.round(ry * _curSize.h) + 'px',
					marginLeft: '-' + Math.round(rx * coords.x) + 'px',
					marginTop: '-' + Math.round(ry * coords.y) + 'px'
				});
				
				var rx2 = 60 / coords.w;
				var ry2 = 60 / coords.h;	
				$('#preview_logo2').css({
					width: Math.round(rx2 * _curSize.w) + 'px',
					height: Math.round(ry2 * _curSize.h) + 'px',
					marginLeft: '-' + Math.round(rx2 * coords.x) + 'px',
					marginTop: '-' + Math.round(ry2 * coords.y) + 'px'
				});
			},
			//更新截图坐标
			'updateCoords':function(c){
				$('#update_img_logo'+' #x').val(c.x);
				$('#update_img_logo'+' #y').val(c.y);
				$('#update_img_logo'+' #w').val(c.w);
				$('#update_img_logo'+' #h').val(c.h);
			},
			'submitUpdate':function(){
				$("#update_img_logo").prepend('<input type="hidden" name="g_tk" value="'+$.gyUtil.getToken()+'" />');
				$("#update_img_logo").submit();
			},
			'afterUpdate':function(data){
				if(data.code != 0){
					if(logo==1){
						$("#uploadImg_logo").html('<img  style="padding-top:10px;" src="'+logo_url+'/200?'+Math.random()+'" />');
					}
					 $.gyUtil.showDialog1({title:'温馨提示',content:data.info,flag:3});
					return false;
				}
				logo=1;
				 $("#logo_upload").text("更改图片");
				 logo_preview=data.info.tfs.url+'/200?'+Math.random();
				$("#uploadImg_logo").html("").html('<img style="padding-top:10px;" src="'+logo_preview+'" />');
				
			}
			
		}
//上传logo取消函数
 function cancel(){

	if(logo==1)//之前已经上传过logo
	 	{ 
		$("#uploadImg_logo").html('<img  style="padding-top:10px;" src="'+logo_url+'/200?'+Math.random()+'" />');
		}
	else{
		  		if(logo_preview!=""){ // 打开页面上传logo
				$("#uploadImg_logo").html('<img  style="padding-top:10px;" src="'+logo_url+'/200?'+Math.random()+'" />');
				}
				else{
						$("#uploadImg_logo").html("");
							}
						
		}	
	 
}		
//------------ http://www.npo_application_project5.html--------------------------------------------	

//本页面提交过了，则自动填写提交的内容

	function 	isSubmit_npo5(){
	$.ajax({
	
		'url':'http://npoapp.gongyi.qq.com/npov2/reg/step3?g_tk='+$.gyUtil.getToken(),
		'type':'get',
		'dataType':'jsonp',
		'jsonp':'jsoncallback',
		success:function(data){
			
			if(data.code == 2101){
				
						 $.gyUtil.showDialog1({title:'温馨提示',content:'上一步没有填写',flag:3,sureCallback:function(){
							 window.location = 'http://gongyi.qq.com/npov2/npo_application_project.html';}});
					
					return false;
					}
				
				//已经实名认证 跳到首页
						if(data.code==2111){window.location = 'http://gongyi.qq.com/succor/'}
						if(data.code==0){
							if(data.info.type==1){window.location = 'http://gongyi.qq.com/succor/'}
									//、审核通过(1),和不通过(3),
									if(data.info.status==1){
										$("h3:eq(0)").html('<i class="icon icon_success"></i>通过审核！');
										$("p:eq(0)").text('您的公益机构申请已正式通过审核，请注意查收。');
										}
									if(data.info.status==3){
										$("h3:eq(0)").html('审核未通过！');
										$("p:eq(0)").text('您的公益机构申请被评定为不通过，感谢您的支持！');
										$(".result_opt").html('<a href="http://gongyi.qq.com/succor/" class="btn_primary_large">返回首页</a>');
										}
							}
				
					
			}
		});
	}/*  |xGv00|4c7483d599cbd7d042a2c554d3c3d127 */