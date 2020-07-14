//乐捐微博jquery扩展包
//
(function($) {     
	$.fn.succor_weibo = function(options) {    
		var defaults = {
			weiboId:options.weiboId,		//微博ID  
			actId:options.actId,			//项目ID
			txtCount : 140,					//最多字数
			type:options.type?options.actId:1,	//1：发微博，2：转发微博，3：评论微博	
			default_text:options.default_text,		//微博ID 
			countHmtl:options.countHtml,				//字数统计框
			btnId:options.btnId,			//提交按钮
			callback:options.callback,		//回调函数
			return_code:0,
			return_data:null,
			wbContents:'',
			pid:options.pid,
			buin:options.buin,
			attach_url:options.url,
			weibo_title:options.weibo_title	//微博话题
		}; 
		
		var opts = $.extend(defaults, options);	
		
		if(typeof(opts.textarea_id) != 'undefined' && opts.textarea_id)
		{
			var txtarea = $(this).find("#"+opts.textarea_id);
			var cntHtml = $(this).find("#"+opts.countHmtl);
			var btn = $(this).find("#"+opts.btnId);
		}else{
			var txtarea = $(this).find("textarea");
			var cntHtml = $(this).find("em");
			//var btn = $(this).find("input#send");
			var btn = $(this).find("#send");
		}
		//微博初始化话题
		var init_content = '';
		function _construst()
		{
			var init_textarea = '';
			if(typeof(opts.weibo_title) != 'undefined' && opts.weibo_title != "")
			{
				init_textarea = init_content = '#'+opts.weibo_title+'#';
			}
			if(typeof(opts.default_text) != 'undefined' && opts.default_text != "")
			{
				init_textarea = init_content+opts.default_text;
			}
			if(init_textarea != '') txtarea.val(init_textarea);
			zfCln();
		}
		
		txtarea.bind('keyup',function(){
			zfCln();//计算字数			
		});
		
		btn.bind('click',function(){
			//用户登陆判断
			//if(global_userinfoobject.nick.length <= 0 || global_userinfoobject.global_gongyiuserinfo != 1)
			//if(global_userinfoobject.nick.length <= 0)
			if(global_userinfoobject.code != 0)
			{
				ptloginopenfun();
				return false;
			}
			//是否填写验证
			var content = txtarea.val();
			if(content=="" || init_content==content)
			{
				alert('请填写内容！');
				txtarea.focus();
				return false;
			}
			opts.wbContents = encodeURIComponent(content);
			//按钮变灰
			btn.attr('disabled','disabled').addClass('udClick');
			//发微博
			if(opts.type == 1)
			{
				weibo_send();
			}
			//评论
			else if(opts.type == 2)
			{
				weibo_comment();
			}
			//转播
			else if(opts.type == 3)
			{
				weibo_broadcast();
			}
			//祝福
			else if(opts.type == 4)
			{
				weibo_zhufu();
			}
			//发布项目进展
			else if(opts.type == 5)
			{
				sendProcess();
			}
			else if(opts.type == 6){
				weibo_sendv2();
			}
		});
		
		
		//广播
		function weibo_send()
		{
			var gy_key = setGyToken();
			var url = 'http://npoapp.gongyi.qq.com/succor/weibo_v1/broadcastv2?gy_key='+gy_key+'&isajax=1&comment='+opts.wbContents+'&id='+opts.weiboId+'&jsoncallback=?';
			$.getJSON(url,function(data){
				if(data.status == 1)
				{
					showTips1('广播成功！');
					btnResume();
					if(typeof(opts.callback) == 'function')
					{
						opts.callback(data);
					}
				}else{
					showTips1(data.info.code+" 操作失败！",2);
					return false;
				}
			});
		}
		
		//广播
		//	kidxiong
		//	2013-08-26
		function weibo_sendv2()
		{
			var gy_key = setGyToken();
			var url = 'http://npoapp.gongyi.qq.com/succor/weibo_v1/sendv2/'+global_userinfoobject.uin+'/?gy_key='+gy_key+'&isajax=1&comment='+opts.wbContents+opts.attach_url+'&jsoncallback=?';
			$.getJSON(url,function(data){
				if(data.status == 1)
				{
					showTips1('广播成功！');
					btnResume();
					if(typeof(opts.callback) == 'function')
					{
						opts.callback(data);
					}
				}else{
					showTips1(data.info.code+" 操作失败！",2);
					return false;
				}
			});
		}
		
		//评论
		function weibo_comment()
		{
			var gy_key = setGyToken();
			var url = 'http://npoapp.gongyi.qq.com/succor/weibo_v1/sendCommentv2?gy_key='+gy_key+'&isajax=1&comment='+opts.wbContents+'&id='+opts.weiboId+'&jsoncallback=?';
			$.getJSON(url,function(data){
				if(data.status == 1)
				{
					showTips1('评论成功！');
					btnResume();
				}else{
					showTips1(data.info.code+" 操作失败！",2);
					return false;
				}
			});
		}
		
		//转播
		function weibo_broadcast()
		{
			var gy_key = setGyToken();
			var url = 'http://npoapp.gongyi.qq.com/succor/weibo_v1/broadcastv2/'+global_userinfoobject.uin+'/'+opts.weiboId+'?gy_key='+gy_key+'&isajax=1&content='+opts.wbContents+'&jsoncallback=?';
			$.getJSON(url,function(data){
				if(data.status == 1)
				{
					showTips1('转播成功！');
					btnResume();
				}else{
					showTips1(getWeiboErrorCode(data.info.code),2);
					return false;
				}
			});
		}
		
		//发祝福
		function weibo_zhufu()
		{
			var gy_key = setGyToken();
			var url = 'http://npoapp.gongyi.qq.com/succor/wish_v1/send_wish?gy_key='+gy_key+'&isajax=1&uin='+global_userinfoobject.uin+'&pcontent='+opts.wbContents+'&pid='+opts.pid+'&buin='+opts.buin+'&jsoncallback=?';
			$.getJSON(url,function(data){
				if(data.status == 1)
				{
					showTips1('祝福成功！');
					btnResume();
					if(typeof(opts.callback) == 'function')
					{
						opts.callback(data);
					}
				}else{
					showTips1(getWeiboErrorCode(data.info.code),2);
					return false;
				}
			});
		}
		//发项目反馈
		function sendProcess()
		{
			var gy_key = setGyToken();
			var url = 'http://npoapp.gongyi.qq.com/succor/process_v1/saveProcess/'+opts.pid+'?gy_key='+gy_key+'&isajax=1&fcontent='+opts.wbContents+'&jsoncallback=?';
			$.getJSON(url,function(data){
				if(data.status == 1)
				{
					showTips1('发布项目进展成功！');
					btnResume();
					if(typeof(opts.callback) == 'function')
					{
						opts.callback(data);
					}
				}else{
					showTips1(getWeiboErrorCode(data.info.code),2);
					return false;
				}
			});
		}
		
		//提交按钮恢复可点
		function btnResume()
		{
			btn.removeAttr('disabled').removeClass('udClick');
		}
		
		 //私有函数，计算剩余字符
		function zfCln()
		{
			var maxCount = opts.txtCount;
			var sy;
			var content = txtarea.val();
			sy = clnTextCount(content,maxCount);
			if(sy<0)
			{
				txtarea.val(getStrByLen(content,maxCount));
				//alert('超过规定字符数');//$('p#boradcast_tips').html('内容超过限制...');
				//cntHtml.next("")
				//is_send = false;
				sy = "0";	
			}
			if(cntHtml) cntHtml.html(sy);	
		}	
		//计算字符
		function clnTextCount(D,maxCount)
		{
			if(!maxCount) maxCount = opts.txtCount;
			D = D.replace(/\s/ig,"");
			var C = maxCount - strlen(D);
			return C;
		} 
		/* Private 计算字符串长度*/
		function strlen(D) {
			var C = 0;
			for (i = 0; i < D.length; i++) {
				if (isChinese(D.charAt(i)) == true) {
					C = C + 1
				} else {
					C = C + 0.5
			}
		}
			return Math.floor(C)
		}
		
		// Private 判断是否中文字符
		function isChinese(D) {
			var C = /[u00-uFF]/ig;
			return ! C.test(D)
		}
		// Private 截取内容
		function getStrByLen(K, J) {
			if(typeof(K)=='undefined') return '';
			if(typeof(J)=='undefined') J=0;
			else{
				J = parseInt(J);
			if(J<0)
				J=100;
			}
			var G = "";
			var L = 0;
			var H = "";
			for (var I = 0; I < K.length; I++) {
				H = K.charAt(I);
				if (H.match(/[^\x00-\xff]/ig) != null) {
					L += 1
				} else {
					L += 0.5
				}
				if (L > J) {
					break
				}
				G += H
			}
			if(K.length>J) G+='...';
			return G
		}
		
		//微博错误提示
		function getWeiboErrorCode(errorCode)
		{
			//if(errorCode<=0) return false;
			errorCode = Math.abs(errorCode);
			switch(errorCode)
			{
				case '3':errorMsg='您还没有开通微博&nbsp;&nbsp;&nbsp;&nbsp;[<a href="http://t.qq.com" target="_blank">马上开通微博</a>]';break;
				case '13':errorMsg='请不要反复广播相同内容的微博';break;
				case '4':errorMsg='请不要广播不文明的微博';break;
				case '5':errorMsg='禁止访问';break;
				case '8':errorMsg='广播的内容过长';break;
				case '9':errorMsg='请不要广播垃圾信息';break;
				case '10':errorMsg='您的广播太快';break;
				default:errorMsg='微博处理错误';break; 
			}
			return errorMsg;
			
		}
		//构造
		_construst();
		
	}
	
	
	
	
	
})(jQuery); 


//输入框字数校验等
(function($) {     
	$.fn.succor_weibo_input = function(options) {    
		var defaults = {
			default_text:options.default_text,		//微博ID  
			textarea_id:options.textarea_id,		//项目ID
			txtCount : 140,					//最多字数
			countHmtl:options.countHtml				//字数统计框
		};
		var opts = $.extend(defaults, options);
		
		if(typeof(opts.textarea_id) != 'undefined' && opts.textarea_id)
		{
			var txtarea = $(this).find("#"+opts.textarea_id);
			var cntHtml = $(this).find("#"+opts.countHmtl);
		}else{
			var txtarea = $(this).find("textarea");
			var cntHtml = $(this).find("em");
		}
		
		function _construst()
		{
			if(typeof(opts.default_text) != 'undefined' && opts.default_text != "")
			{
				txtarea.val(opts.default_text);
			}
			zfCln();
		}
		
		txtarea.bind('keyup',function(){
			zfCln();//计算字数			
		});
		
		
		 //私有函数，计算剩余字符
		function zfCln()
		{
			var maxCount = opts.txtCount;
			var sy;
			var content = txtarea.val();
			sy = clnTextCount(content,maxCount);
			if(sy<0)
			{
				txtarea.val(getStrByLen(content,maxCount));
				//alert('超过规定字符数');//$('p#boradcast_tips').html('内容超过限制...');
				//cntHtml.next("")
				//is_send = false;
				sy = "0";	
			}
			if(cntHtml) cntHtml.html(sy);	
		}	
		//计算字符
		function clnTextCount(D,maxCount)
		{
			if(!maxCount) maxCount = opts.txtCount;
			D = D.replace(/\s/ig,"");
			var C = maxCount - strlen(D);
			return C;
		} 
		/* Private 计算字符串长度*/
		function strlen(D) {
			var C = 0;
			for (i = 0; i < D.length; i++) {
				if (isChinese(D.charAt(i)) == true) {
					C = C + 1
				} else {
					C = C + 0.5
			}
		}
			return Math.floor(C)
		}
		
		// Private 判断是否中文字符
		function isChinese(D) {
			var C = /[u00-uFF]/ig;
			return ! C.test(D)
		}
		// Private 截取内容
		function getStrByLen(K, J) {
			if(typeof(K)=='undefined') return '';
			if(typeof(J)=='undefined') J=0;
			else{
				J = parseInt(J);
			if(J<0)
				J=100;
			}
			var G = "";
			var L = 0;
			var H = "";
			for (var I = 0; I < K.length; I++) {
				H = K.charAt(I);
				if (H.match(/[^\x00-\xff]/ig) != null) {
					L += 1
				} else {
					L += 0.5
				}
				if (L > J) {
					break
				}
				G += H
			}
			if(K.length>J) G+='...';
			return G
		}
		
		//
		_construst();
	}
})(jQuery);

function setGyToken()
{
	//getCookie_h('skey')
	var str = _cookie_obj.get("skey"),hash = 5381;
	for(var i = 0, len = str.length; i < len; ++i)
	{
		hash += (hash << 5) + str.charAt(i).charCodeAt();
	}
	return hash & 0x7fffffff;
}
/*  |xGv00|1bcea1a7b144c5d65917a5a40a2cc8ff */