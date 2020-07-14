jQuery.extend(
{	
gyUtil:{
		/**
		 * 获取skey的token
		 */
		getToken:function(){
			var str = GyLib.Cookie().get('skey'),hash = 5381;
			if(!str) return false;
			for(var i = 0, len = str.length; i < len; ++i)
			{
				hash += (hash << 5) + str.charAt(i).charCodeAt();
			}
			return hash & 0x7fffffff;
		},
		htmlEncode:function(sStr){
			sStr = sStr.replace(/&/g,"&amp;");
			sStr = sStr.replace(/>/g,"&gt;");
			sStr = sStr.replace(/</g,"&lt;");
			sStr = sStr.replace(/"/g,"&quot;");
			sStr = sStr.replace(/'/g,"&#39;");
			return sStr;
		},
		/**
		 * 解析?后的URL
		 */
		getQueryStr:function(name) 
		{ 
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
			var r = window.location.search.substr(1).match(reg); 
			if (r!=null) return this.htmlEncode(unescape(r[2])); return null; 
		},
		/**
		 * 解析URL#后的参数
		 */
		getHashStr:function(name) 
		{ 
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
			var r = window.location.hash.substr(1).match(reg); 
			if (r!=null) return unescape(r[2]); return null; 
		},
		/**
		 * 时间戳转时间格式
		 */
		str2date:function(d){
			var d = new Date(parseInt(d) * 1000);
			var year = d.getFullYear();
			//alert(d.getFullYear());
			//alert(du.getYear());
			var month = d.getMonth()+1;
			var date = d.getDate();
			var day = d.getDay();
			var hours = d.getHours();
			var minutes = d.getMinutes();
			var seconds = d.getSeconds();
			var ms = d.getMilliseconds();  
			if(month<10) month='0'+month;
			if(date<10) date='0'+date;
			if(hours<10) hours='0'+hours;
			if(minutes<10) minutes='0'+minutes;
			if(seconds<10) seconds='0'+seconds;			
			var curDateTime= year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds;
			return curDateTime;
		},
		/**
		 * 捐款页面片
		 * @author hunterguo
		 */
		/**
		 * 分享sns
		 * @author hunterguo
		 */
		shareSNS:function(type,data){
			//console.log(data);
			var shareObj = {};
			shareObj = {
				'kaixin':{'title':'分享到开心网','url':'http://www.kaixin001.com/rest/records.php?content='+data['title']+'&url='+data['url']+'&style=11&pic='+data['pic']},
				'renren':{'title':'分享到人人网','url':'http://widget.renren.com/dialog/share?url='+data['url']+'&title='+data['title']+'&pic='+data['pic']+'&description=%20&message='},
				'sinaweibo':{'title':'分享到新浪微博','url':'http://v.t.sina.com.cn/share/share.php?title='+data['title']+'&url='+data['url']+'&pic='+data['pic']},
				'pengyou':{'title':'分享到朋友网'},
				'weixin':{'title':'分享到微信'},
				'qzone':{'title':'分享到QQ空间','url':'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title='+data['title']+'&url='+encodeURIComponent(data['url'])+'&pics='+data['pic']+'&summary=%20'},
				'txweibo':{'title':'分享到腾讯微博','url':'http://v.t.qq.com/share/share.php?title='+data['title']+'&url='+data['url']+'&appkey=&site='+data['site']+'&pic='+data['pic']}
			};
			var _share_url = "";
			if(!shareObj[type]) return false;
			window.open(shareObj[type].url,shareObj[type].title, 'width=770, height=540, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
		},
		/**
		 * 共用弹出层
		 * @author hunterguo
		 */
		showDialog1 : function(obj){
			var cssClass = '';
			if(!obj.flag) obj.flag = 1;
			if(obj.flag==1)
			{
				obj.cssClass = 'tips_success';
			}else if(obj.flag==2)
			{
				obj.cssClass = 'tips_error';
			}else if(obj.flag==3)
			{
				obj.cssClass = 'tips_warning';
			}
			if (!document.getElementById("cTips")) $('html body').append('<div id="cTips" class="floatDiv"></div>');
			showDialog.show({id:'cTips',bgcolor:"#000000",opacity:70,onPopupCallback:function(){
				if(typeof(obj.title) == "undefined") obj.title = "温馨提示";
				if(typeof(obj.content) == "undefined") obj.content = "";
				var _content = "";
				_content += '<div class="floatTitle"><a href="javascript:showDialog.hide();" class="floatClose">X</a><h4 class="floatTitle-h4">'+obj.title+'</h4></div>\
				<div class="floatContent" id="floatContent"><p class="'+obj.cssClass+'">'+obj.content+'</p></div>';
				if(typeof(obj.noSureBtn) == "undefined" && obj.noSureBtn != true){
					_content += '<div style="text-align:center;padding-bottom:15px;"><a class="floatCloseBtn" id="sureBtn" href="javascript:';
					if(typeof(obj.sureCallback) == "undefined" || !obj.sureCallback) _content += 'showDialog.hide()';
					 _content += ';" style="float:none;margin:0 auto">确定</a></div>';
				}
				$("#cTips").html(_content);
				if(typeof(obj.sureCallback) != "undefined" && !!obj.sureCallback){
					$("#sureBtn",$("#cTips")).unbind('click');
					$("#sureBtn",$("#cTips")).click(function(){					
						if(!!obj.sureCallback && typeof(obj.sureCallback) == 'function'){
							obj.sureCallback();
						} 
					});
				}
			},onCloseCallback:obj.closeCallback});
		},
		/**
		 * loading...层
		 * @author hunterguo
		 */
		showLoading : function(obj){
			if (!document.getElementById("cTips")) $('html body').append('<div id="cTips" class="floatDiv"></div>');
			showDialog.show({id:'cTips',bgcolor:"#000000",opacity:70,onPopupCallback:function(){
				if(typeof(obj.title) == "undefined") obj.title = "温馨提示";
				if(typeof(obj.content) == "undefined") obj.content = "";
				var _content = "";
				_content += '<div class="floatTitle"><h4 class="floatTitle-h4">'+obj.title+'</h4></div>\
				<div class="floatContent" id="floatContent"><p class="tips-loading">'+obj.content+'</p></div>';
				$("#cTips").html(_content);
			}});
		},
		/**
		 * 确认框
		 * @author hunterguo
		 */
		confirm : function(obj){
			if (!document.getElementById("cTips")) {
				$('html body').append('<div id="cTips" class="floatDiv"></div>');
			}
			showDialog.show({id:'cTips',bgcolor:"#000000",opacity:70,onPopupCallback:function(){
				if(typeof(obj.title) == "undefined") obj.title = "温馨提示";
				if(typeof(obj.content) == "undefined") obj.content = "";
				var _content = "";
				_content += '<div class="floatTitle"><a class="floatClose" id="float_close">X</a><h4 class="floatTitle-h4">'+obj.title+'</h4></div>\
				<div class="floatContent" id="floatContent"><p class="'+obj.cssClass+'">'+obj.content+'</p></div>\
				<div style="text-align:center;padding-bottom:15px;" class="dialog-btn-wrap"><a class="floatCloseBtn" id="sureBtn">确定</a><a class="floatCloseBtn" id="cancelBtn" style="margin-left:15px;">取消</a></div>';
				$("#cTips").html(_content);
				$("#sureBtn",$("#cTips")).click(function(){
					
					if(!!obj.sureCallback && typeof(obj.sureCallback) == 'function'){
						obj.sureCallback();
					} 
				});
				$("#cancelBtn",$("#cTips")).click(function(){
					if(!!obj.cancelCallback && typeof(obj.cancelCallback) == 'function'){
						obj.cancelCallback();
					}
					showDialog.hide();
				});
				$("#float_close",$("#cTips")).click(function(){
					if(!!obj.cancelCallback && typeof(obj.cancelCallback) == 'function'){
						obj.cancelCallback();
					}
					showDialog.hide();
				});
			},onCloseCallback:obj.closeCallback});
		},
		/**
		 * 微博收听
		 * @author hunterguo
		 */
		listenWeibo:function(u){
			var _gyToken = this.getToken();
			var _url = 'http://npoapp.gongyi.qq.com/succor/weibo_v1/listen/?u='+u+'&gy_key='+_gyToken+'&jsoncallback=?';
			$.getJSON(_url,function(data){
				try{
					if(data.status == 1)
					{
						$.gyUtil.showDialog1({'content':'微博收听成功！'});
						return;
					}else{
						var _msg = "";
						if(data.status == 80103)
							_msg = '您已经收听过此公益组织';
						else if(data.status == -99){
							ptloginopenfun();
							return;
						}
						else
							_msg = data.info;
						$.gyUtil.showDialog1({'content':_msg,'flag':3});
						return false;
					}
				}catch(e){
					$.gyUtil.showDialog1({'content':'处理失败','flag':3});
				}
				
			});
		},
		//时间函数
		dateTime:{
			calcDateToView:function(begin, end){
				if(!end){
					end = new Date();
				}
				var _diffTime = $.gyUtil.dateTime.calcDiff(begin,end);
				var _diffTimeArray = _diffTime.split(";");
				var _days = _diffTimeArray[0];
				var _hours = _diffTimeArray[1];
				var _minutes = _diffTimeArray[2];
				if(_days>0){
					if(_days>=30){
						var m = parseInt(_days/30);
						if(m<=0) m=1;
						return m+"月前";
					}
					if(_days>=15){
						return "半月前";
					}
					return _days+"天前";
				}
				if(_hours>0){
					return _hours+"小时前";
				}
				if(_minutes>0){
					return _minutes+"分钟前"
				}
				return "刚刚";
			},
			calcDiff:function(p_csBegDate, p_csEndDate){
				var _p_csBegDate = Date.parse(p_csBegDate.replace('-','/').replace('-','/'));
				//var _p_csEndDate = Date.parse(p_csEndDate.replace('-','/').replace('-','/'));
				var date3 = p_csEndDate.getTime() - _p_csBegDate;  //时间差的毫秒数	 
				//计算出相差天数
				var days=Math.floor(date3/(24*3600*1000));			
				//计算出小时数
				var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
				var hours=Math.floor(leave1/(3600*1000));			
				//计算相差分钟数
				var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
				var minutes=Math.floor(leave2/(60*1000));
				 
				//计算相差秒数
				var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
				var seconds=Math.round(leave3/1000);
				
				if( days < 0) days = 0 ;
				if( hours < 0) hours = 0 ;
				if( minutes < 0) minutes = 0 ;
				if( seconds < 0) seconds = 0 ;			
				return days+';'+hours+';'+minutes+';'+seconds;
			}
		},
		// Private 截取内容
		getCnStrByLen:function(K, J) {
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
			//if(K.length>J) G+='...';
			return G
		},
		// Private 截取内容
		getCnLen:function(K) {
			if(typeof(K)=='undefined') return '';
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
			}
			//if(K.length>J) G+='...';
			return parseInt(L);
		}
		,newGetJSON:function(url, callback, mothed){
		    mothed = mothed || '_Callback';
		    window[mothed] = function (data){callback(data); /* delete _Callback; */} 
		    $.getScript(url);
		} 
		,strToObj:function(a,b){var e,f,g,c=[],d={};for(a=a.replace(/\?/g,"&"),c=a.split("&"),g=c.length,e=0;g>e;e++)c[e].indexOf("=")<0||(f=c[e].split("="),d[f[0]]=b?decodeURIComponent(f[1]):f[1]);return d}
		,pushHash:function(a){location.hash=this.objToHash(a)},objToHash:function(a){var b=a.pageId,c=this.objToStr(a.urlParams,!0);return c.length>0?b+"/"+c:b}
		,objToStr:function(a,b){var d,e,c="";for(d in a)"undefined"!=typeof a[d]&&(e=b?encodeURIComponent(a[d]):a[d],c+=d+"="+e+"&");return c.slice(0,c.length-1)}
		,jsonToString:function(a){var c,d,e,f,g,b=this;switch(typeof a){case"string":return'"'+a.replace(/(["\\])/g,"\\$1")+'"';case"array":return"["+a.map(b.jsonToString).join(",")+"]";case"object":if(a instanceof Array){for(c=[],d=a.length,e=0;d>e;e++)c.push(b.jsonToString(a[e]));return"["+c.join(",")+"]"}if(null==a)return"null";f=[];for(g in a)f.push(b.jsonToString(g)+":"+b.jsonToString(a[g]));return"{"+f.join(",")+"}";case"number":return a;case!1:return a}}
		,stringToJSON:function(obj){return eval("("+obj+")")}

	}
});	/*  |xGv00|dcf51a2279a273554383244ae1adf8bf */