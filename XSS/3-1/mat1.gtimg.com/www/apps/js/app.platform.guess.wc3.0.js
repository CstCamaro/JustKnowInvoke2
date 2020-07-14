/* APP Common Begin*/
try
{
	document.domain = "qq.com";
}
catch (e)
{
}

if (typeof AppPlatform == "undefined")
{
	var AppPlatform = new Object();
}

AppPlatform.$ = function(s)
{
	return (typeof s == "object") ? s: document.getElementById(s);
};

AppPlatform.Cookie = {
	getCookie: function(name)
	{
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));

		if (arr != null)
		{
			return window.unescape(arr[2]);

		}

		return null;
	},
	setCookie:function(name,value,expires,path,domain,secure){
        var expDays = expires*24*60*60*1000;
        var expDate = new Date();
        expDate.setTime(expDate.getTime()+expDays);
        var expString = expires ? "; expires="+expDate.toGMTString() : "";
        var pathString = "; path="+(path||"/");
		var domain = domain ? "; domain="+domain : "";
        document.cookie = name + "=" + escape(value) + expString + domain + pathString + (secure?"; secure":"");
	}
};

AppPlatform.HashTable = function()
{
	this.__construct();
};

AppPlatform.HashTable.prototype = {
	__construct: function()
	{
		this._hash = new Object();
	},

	set: function(key, value, rewrite)
	{
		if (rewrite !== false)
		{
			this._hash[key] = value;
		}
		else if (this.get(key) != null)
		{
			this._hash[key] = value;
		}
	},

	get: function(key)
	{
		if (typeof this._hash[key] != "undefined")
		{
			return this._hash[key];
		}
		else
		{
			return null;
		}
	},

	remove: function(key)
	{
		delete this._hash[key];
	}
};

AppPlatform.HashTable.getInstance = function()
{
	if (!this.__instance__)
	{
		this.__instance__ = new AppPlatform.HashTable();
	};

	return this.__instance__;
};

AppPlatform.Element = {
	getElementLeft: function(e)
	{
		return (e==null) ? 0 :
		(AppPlatform.$(e).offsetLeft + AppPlatform.Element.getElementLeft(AppPlatform.$(e).offsetParent));
	},

	getElementTop: function(e)
	{
		return (e==null) ? 0 :
		(AppPlatform.$(e).offsetTop + AppPlatform.Element.getElementTop(AppPlatform.$(e).offsetParent));
	},

	scrollIntoView: function(e)
	{
		var x = AppPlatform.Element.getElementLeft(e);
		var y = AppPlatform.Element.getElementTop(e);
		window.scrollTo(x, y);
	},

	remove: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			try
			{
				AppPlatform.$(arguments[i]).parentNode.removeChild(AppPlatform.$(arguments[i]));
			}
			catch (e)
			{ 
			}
		}
	}
};

AppPlatform.Page = {
	getPageWidth: function()
	{
		return document.body.scrollWidth || document.documentElement.scrollWidth || 0;
	},

	getPageHeight: function()
	{
		return document.body.scrollHeight || document.documentElement.scrollHeight || 0;
	},

	getBodyWidth: function()
	{
		return document.body.clientWidth || document.documentElement.clientWidth || 0;
	},

	getBodyTop: function()
	{
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	}
};
AppPlatform.Browser = new Object();
AppPlatform.Browser.ua = window.navigator.userAgent.toLowerCase();
AppPlatform.Browser.ie = /msie/.test(AppPlatform.Browser.ua);
AppPlatform.Browser.moz = /gecko/.test(AppPlatform.Browser.ua);
//JsLoader
AppPlatform.JsLoader = {
	PrjId: 0,
	load: function(sId, sUrl, fCallback)
	{
		
		var _script = document.createElement("script");
		_script.setAttribute("id", sId);
		_script.setAttribute("type", "text/javascript");
		_script.setAttribute("src", sUrl);

		if (AppPlatform.Browser.ie)
		{
			_script.onreadystatechange = function()
			{
				if (this.readyState=="loaded" || this.readyState=="complete")
				{
					AppPlatform.Element.remove(_script);
					fCallback();
				}
			};
		}
		else if (AppPlatform.Browser.moz)
		{
			_script.onload = function()
			{
				AppPlatform.Element.remove(_script);
				fCallback();
			};
		}
		else
		{
			AppPlatform.Element.remove(_script);
			fCallback();
		}

		document.getElementsByTagName("head")[0].appendChild(_script);
	}
};
/* APP Common End*/
AppPlatform.Guess = {
	_options:[],
	_userGuess:null,
	_isEnd:false,
	_userstake:0,
	_usernum:0,
	_host : '',
	_mouseoverTR:null,
	initOption:function(optionArray){
		this._options = optionArray;
	},
	gethost:function(){
		var reg = /^(apps.)([0-9A-Za-z]+)(.qq.com)$/;
		if(reg.test(AppPlatform.Guess._host)==true){
			return AppPlatform.Guess._host;
		}else{
			return window.location.host;
		}
	},
	showOption:function()
	{
		for(var i=0;i<this._options.length;i++)
		{
			option = this._options[i];
			AppPlatform.$("g_opt_count_"+option.id).innerHTML = ""+option.count+"人";
			if(AppPlatform.$("g_opt_line_"+option.id)!=null)
			{
				var count = (option.count/AppPlatform.Guess._totaluser)*100;//(option.count/10000)*100;
				if(count<1)count=1; if(count>100)count=100;
				//count = count*103/100;
				AppPlatform.$("g_opt_line_"+option.id).style.width = (count)+'%';
			}
		}
	},
	initUser:function(userGuess)
	{
		this._userGuess = userGuess;
	},
	showUser:function(callback)
	{
		if(this._userGuess!=null)
		{//已经参与
			//g_opt_view_
			if(AppPlatform.$("g_opt_view_"+this._userGuess.optId)==null){
				return;
			}
			if(this._isEnd===true){
				AppPlatform.$("g_opt_view_"+this._userGuess.optId).innerHTML = "您竞猜了此项";
			}else{
				AppPlatform.$("viewsType").innerHTML = '<table width="150" border="0" cellspacing="0" cellpadding="0" class="textC colorOrange lineH21">'
      												 + '<tr>'
        											 + '<td>竞猜成功！</td>'
      												 + '</tr>'
      												 + '<tr>'
        											 + '<td>您的<strong>'+this._userGuess.stake+'</strong>积分已被抵押</td>'
      												 + '</tr>'
    												 + '</table>';
 				AppPlatform.$("g_opt_view_"+this._userGuess.optId).innerHTML = "您竞猜了此项";
 				AppPlatform.$("viewsType").className = "";
			}
			AppPlatform.$("g_opt_view_"+this._userGuess.optId).className = "colorGray";
			AppPlatform.$("g_opt_tr_"+this._userGuess.optId).className = "floatL yesBor";
			AppPlatform.$("g_opt_radio_"+this._userGuess.optId).checked = true;
			for(var i=0;i<this._options.length;i++)
			{
				option = this._options[i];
				if(this._userGuess.optId == option.id)//重算参与数
				{
					if(callback ==1) option.count++;
					AppPlatform.$("g_opt_count_"+option.id).innerHTML = ""+option.count+"人";//参与后
				}
				AppPlatform.$("g_opt_radio_"+option.id).disabled = true;
			}
			if(AppPlatform.Guess._mouseoverTR!=null){//猜中选项
				//AppPlatform.Guess._mouseoverTR.style.backgroundColor = "#ffffff";
				AppPlatform.Guess._mouseoverTR.className = "floatL  yesBor";
			}
		}
	},
	end:function()
	{
		this._isEnd = true;
		for(var i=0;i<this._options.length;i++)
		{
			option = this._options[i];
			AppPlatform.$("g_opt_radio_"+option.id).disabled = true;
		}
	},
	opiontTrMouseover:function(optionTr)
	{
		if(this._userGuess!=null )
		return;
		optionTr.style.backgroundColor = "#ededed";
		AppPlatform.Guess._mouseoverTR = optionTr;
	},
	checkstsake:function(_obj){
		var   type="^[0-9]*[1-9][0-9]*$";
		var   re   =   new   RegExp(type);
		if(_obj.value.match(re)==null)
		{
			_obj.value ='';
			if(typeof document.getElementById('wincount')!='undefined')
			{
				document.getElementById('wincount').innerHTML ='';
			}
			return false;
		}
		if(parseInt(_obj.value)>0){
			if(AppPlatform.$('wincount')!=null){
				var formGuess = AppPlatform.$("form_guess");
				for(var i=0;i<formGuess.optId.length;i++)
				{
					if(formGuess.optId[i].checked)
					{
						if(typeof optionArray[i]!='undefined'){
							var _opt = optionArray[i];
							var _optstake = _opt.optionstake;
							AppPlatform.$('wincount').innerHTML = Math.floor(parseInt(_obj.value)*parseInt(AppPlatform.Guess._totalstake)/(parseInt(_obj.value)+parseInt(_optstake)));
						}
						break;
					}
				}
			}
		}
	},
	opiontTrMouseout:function(optionTr,optionId)
	{

		if(this._userGuess!=null)
		return;
		optionTr.style.backgroundColor = "#ffffff";
		AppPlatform.Guess._mouseoverTR = null;
	},
	_curOptId:-1,
	optionTrClick:function(optionId)
	{
		if(this._userGuess!=null || this._isEnd)//用户已参与或已结束
		return;
		if(this._curOptId == optionId)//已经选择该选项
		return;
		if(AppPlatform.Guess.User.getUin()==0)
		{
			AppPlatform.Guess.User.LoginBox.login(function(){AppPlatform.Guess.optionTrClick(optionId)});
			return ;
		}
		/**
		stakeHtml = '<table width="200" border="0" cellspacing="0" cellpadding="0" class="guess_q2">'
		+'	<tr>'
		+'		<td width="64" valign="bottom" class="color_gray line_h_30">投入积分：</td><td width="53">'
		+'			<input id="_ustake" name="stake" type="text" class="G_in1"  onKeyUp="AppPlatform.Guess.checkstsake(this)"/> </td><td width="83">'
		+'			<img src="http://mat1.gtimg.com/www/apps/g_images/guess.gif" onmouseover="this.style.cursor=\'pointer\'" '
		+'			width="52" height="22" align="absmiddle" border="0" onclick="AppPlatform.Guess.submit();return false;"/>'
		+'		</td>'
		+'	</tr>'
		+'</table>'
		+'<table width="200" cellspacing="0" cellpadding="0">'
		+'<tbody><tr><td style="height: 16px; line-height: 16px;border-top:0px solid #FFFFFF">'
		+'若猜对,您将获得<span id="wincount"></span>积分'
		+'</td></tr></tbody>'
		+'</table>'
		;
		for(var i=0;i<this._options.length;i++)
		{
			option = this._options[i];
			if(option.id==optionId)
			{
				AppPlatform.$("g_opt_view_"+optionId).innerHTML = stakeHtml;
			}
			else
			{
				AppPlatform.$("g_opt_view_"+option.id).innerHTML = ""
			}
		}
		**/
		AppPlatform.$("viewsType").innerHTML ='';
		AppPlatform.$("viewsType").className = "";
		AppPlatform.$("viewsType").innerHTML = '<table width="170" border="0" cellspacing="0" cellpadding="0" class="lineH24">'
		+'<tr><td>投入积分：</td></tr>'
		+'<tr><td>'
		+'<table width="151" border="0" cellspacing="0" cellpadding="0">'
		+'<tr>'
		+'<td width="95">'
		+'<input type="text" id="_ustake" name="stake" onKeyUp="AppPlatform.Guess.checkstsake(this)" class="inp1" />'
		+'</td>'
		+'<td width="56">'
		+'<img src="http://mat1.gtimg.com/www/apps/wc/guess10.png" width="56" height="23" onmouseover="this.style.cursor=\'pointer\'" onclick="AppPlatform.Guess.submit();return false;"/>'
		+'</td>'
		+'</tr>'
		+'</table>'
		+'</td></tr>'
		+'<tr><td class="colorGreen">(若猜对，你将获得<strong><span id="wincount"></span></strong>积分)</td></tr>'
		+'</table>';
		AppPlatform.$("g_opt_radio_"+optionId).checked = true;
		this._curOptId = optionId;
	},
	optionTrClickUser:function(optionId)
	{
		if(this._userGuess!=null || this._isEnd)
		return;
		if(this._curOptId == optionId)
		return;
		if(AppPlatform.Guess.User.getUin()==0)
		{
			AppPlatform.Guess.User.LoginBox.login(function(){AppPlatform.Guess.optionTrClickUser(optionId)});
			return false;
		}
		if(AppPlatform.$("login_tr")!=null){
			AppPlatform.$("login_tr").parentNode.removeChild(AppPlatform.$("login_tr"));
		}
		stakeHtml = '<table width="200" border="0" cellspacing="0" cellpadding="0" class="guess_q2">'
		+'	<tr>'
		+'		<td width="64" valign="bottom" class="color_gray line_h_30">投入积分：</td><td width="53">'
		+'			<input id="_ustake" name="stake" type="text" class="G_in1"   onKeyUp="AppPlatform.Guess.checkstsake(this)"/> </td><td width="83">'
		+'			<img src="http://mat1.gtimg.com/www/apps/g_images/guess.gif" onmouseover="this.style.cursor=\'pointer\'" '
		+'			width="52" height="22" align="absmiddle" border="0" onclick="AppPlatform.Guess.submit();return false;"/>'
		+'		</td>'
		+'	</tr>'
		+'</table>';
		for(var i=0;i<this._options.length;i++)
		{
			option = this._options[i];
			if(option.id==optionId)
			{
				AppPlatform.$("g_opt_view_"+optionId).innerHTML = stakeHtml;
			}
			else
			{
				AppPlatform.$("g_opt_view_"+option.id).innerHTML = ""
			}
		}
		AppPlatform.$("g_opt_radio_"+optionId).checked = true;
		/**if(AppPlatform.Guess.User.getUin()==0)//用户未登录
		{
		try{
		var childnode = AppPlatform.$("g_opt_tr_"+optionId).nextSibling;
		var _loginbox = document.createElement('tr');
		_loginbox.setAttribute('id','login_tr');
		AppPlatform.$("g_opt_tr_"+optionId).parentNode.insertBefore(_loginbox,childnode);
		var td1 = document.createElement('td');
		td1.setAttribute('width',44);
		var td2 = document.createElement('td');
		td2.setAttribute('id','login_td'),
		_loginbox.appendChild(td1);_loginbox.appendChild(td2);
		AppPlatform.$("login_td").innerHTML = '<span>QQ：<input type="text" style="width: 78px;"  name="uid"/> 密码：<input type="password" style="width: 78px;"  name="pwd"/> <input type="text" onfocus="listCode(1)" onblur="listCode()" onclick="if(this.value==\'输入验证码\') this.value=\'\'" value="输入验证码" style="height:15px;width: 70px; margin-right: 6px;" name="vcode"/></span><span id="vCode2" style="display:none;position:absolute;width:100px;margin-top:-5px;margin-left:-6px;"><img id="imgVerify"  onclick="changeImg()" src="http://ptlogin2.qq.com/getimage?aid=5000301&'+Math.random()+'"/></span>';
		}catch(e){}
		}**/
		this._curOptId = optionId;
	},
	getUserInfo:function(){
		AppPlatform.JsLoader.load('userinfo',"http://"+AppPlatform.Guess.gethost()+"/guess/guess/user?r="+Math.random(),function(){AppPlatform.Guess.showuserstake();});
	},
	showuserstake:function(){
		if( typeof AppPlatform.Guess._userstake !='undefined'&&AppPlatform.Guess._userstake!==0){
			//AppPlatform.$("userstake").innerHTML = ''+AppPlatform.Guess._userstake+'';
			if(AppPlatform.Guess.User._usernick!=0){
				AppPlatform.Cookie.setCookie('guess_nick',AppPlatform.Guess.User._usernick);
			}
			var user_nick =AppPlatform.Guess.User.getnick();
/**			if(AppPlatform.Guess.User._usernick!=0){
				user_nick = AppPlatform.Guess.User._usernick;
			}else if(typeof AppPlatform.Cookie.getCookie('guess_nick')!='undefined'){
				user_nick =AppPlatform.Cookie.getCookie('guess_nick');
			}else if(typeof AppPlatform.Cookie.getCookie('uin')!='undefined'){
				user_nick = AppPlatform.Cookie.getCookie('uin');
			}
**/
			if( AppPlatform.$("guess_user_info")!=null ){
				AppPlatform.$("guess_user_info").innerHTML = '<span  class="login"><span class="colorGreen"><strong><a href="#">'+user_nick+'</a></strong></span>  积分：<span id=\'userstake\' class="colorGreen">'+AppPlatform.Guess._userstake+'</span>分 [<span class="colorBlue"><a href="http://apps.worldcup.qq.com/guess/logout?t=1" >退出</a>]</span></span>';
			}
		}
	},
	submit:function()
	{
		var formGuess = AppPlatform.$("form_guess");
		var stakeObj = formGuess.stake;
		if(stakeObj.value=="")
		{
			alert("请输入您所投入的积分数");
			stakeObj.select();
			return false;
		}
		var   type="^[0-9]*[1-9][0-9]*$";
		var   re   =   new   RegExp(type);
		if(stakeObj.value.match(re)==null)
		{
			alert("请输入您正确的积分数");
			stakeObj.select();
			return false;
		}
		var stake = parseInt(stakeObj.value);
		if(isNaN(stake))
		{
			alert("请输入您正确的积分数");
			stakeObj.select();
			return false;
		}
		var optionObj = formGuess.optId;
		var isCheck = false;
		for(var i=0;i<optionObj.length;i++)
		{
			if(optionObj[i].checked)
			{
				isCheck = true;
				break;
			}
		}
		if(!isCheck)
		{
			alert("请选择题目");
			return false;
		}

		if(AppPlatform.Guess.User.getUin()==0)
		{
			AppPlatform.Guess.User.LoginBox.login();
			return false;
		}
		
		formGuess.submit();
		return false;
	},
	rsubmit:function(){//http://apps.worldcup.qq.com/guess/reward/submit-inajax-1
		AppPlatform.JsLoader.load('rsubmit',"http://"+AppPlatform.Guess.gethost()+"/guess/reward/submit-inajax-1?r="+Math.random(),function(){});
	},
	rdcallback:function(retCode,msg)
	{
		if(retCode==-4)//未登录
		{
			AppPlatform.Guess.User.LoginBox.login();
		}
		else if(retCode==1){//成功
			if(typeof msg !='undefined'&&msg!="")alert(msg);
			if(typeof document.getElementById("reward")!="undefined")
			{
				document.getElementById("reward").src ="http://mat1.gtimg.com/www/apps/images/button_gray.gif";
				document.getElementById("reward").onclick =function(){};
				document.getElementById("reward").style.cursor = "";
			}
			if(typeof document.getElementById("addyiqian")!="undefined"){
				document.getElementById("addyiqian").style.display ="";
			}
			//隐藏
		}
		else if(retCode==2){//已经加分过
			if(typeof msg !='undefined'&&msg!="")alert(msg);
			if(typeof document.getElementById("reward")!="undefined")
			{
				document.getElementById("reward").src ="http://mat1.gtimg.com/www/apps/images/button_gray.gif";
				document.getElementById("reward").onclick =function(){};
				document.getElementById("reward").style.cursor = "";
			}
			//隐藏
		}
		else{
			if(typeof msg !='undefined'&&msg!="")alert(msg);
		}
	},
	callback:function(retCode,msg)
	{
		if(retCode==-4)//未登录
		{
			AppPlatform.Guess.User.LoginBox.login();
		}
		else if(retCode==0)//成功
		{
			try{
				msg = eval('('+msg+')');
				var formGuess = AppPlatform.$("form_guess");
				var optionObj = formGuess.optId;
				var optionId = 0;
				for(var i=0;i<optionObj.length;i++)
				{
					if(optionObj[i].checked)
					{
						optionId = optionObj[i].value;
						break;
					}
				}
				if(typeof msg.usertotalstake !='undefined'&&parseInt(msg.usertotalstake)>=0){//USER STAKE
					if(AppPlatform.$("userstake")!=null)
					AppPlatform.$("userstake").innerHTML=''+msg.usertotalstake+'';
					//if(AppPlatform.$("guess_user_info")!=null  )
					//AppPlatform.$("guess_user_info").innerHTML = AppPlatform.Cookie.getCookie('guess_nick')==null?'':AppPlatform.Cookie.getCookie('guess_nick')+'(<span>共有'+msg.usertotalstake+'积分</span>) | <a href="http://apps.worldcup.qq.com/guess/logout?t=1">退出</a>';	
					if( AppPlatform.$("guess_user_info")!=null){
						AppPlatform.$("guess_user_info").innerHTML = '<span  class="login"><span class="colorGreen"><strong><a href="#">'+AppPlatform.Guess.User.getnick()+'</a></strong></span>  积分：<span id=\'userstake\' class="colorGreen">'+msg.usertotalstake+'</span>分 [<span class="colorBlue"><a href="http://apps.worldcup.qq.com/guess/logout?t=1" >退出</a>]</span></span>';
					}
				}
				var stakeObj = formGuess.stake;
				var stake = parseInt(stakeObj.value);
				this.initUser({"optId":optionId,"stake":stake});
				this.showUser(1);
			}catch(e){}
		}else if(retCode==2)//已经参加
		{
			try{
				msg = eval('('+msg+')');
				if(typeof msg.f_Stake =='undefined'||typeof msg.f_OptId =='undefined'){
					 if(typeof msg.msg!='undefined'&&msg.msg!=""){
					 		alert(msg.msg);
						}
				}
				var formGuess = AppPlatform.$("form_guess");
				var optionObj = formGuess.optId;//radio
				var optionId = 0;

				for(var i=0;i<optionObj.length;i++)
				{
					if(AppPlatform.$("g_opt_view_"+optionObj[i].value)!=null)
					AppPlatform.$("g_opt_view_"+optionObj[i].value).innerHTML ='';
					if(optionObj[i].value == msg.f_OptId)
					{
						//optionId = optionObj[i].value;
						optionObj[i].checked =true;
						//break;
					}
				}
				//alert(msg.f_OptId+' '+msg.f_Stake)
				//var stake = parseInt(stakeObj.value);
				this.initUser({"optId":msg.f_OptId,"stake":msg.f_Stake});
				this.showUser(0);
				if(typeof msg.msg!='undefined'&&msg.msg!=""){
					 		alert(msg.msg);
				}
			}catch(e){}
		}else if(retCode==1){
			if(typeof msg !='undefined'&&msg!="")alert(msg);
			if(typeof AppPlatform.$("_ustake")!=null &&AppPlatform.Guess._userstake>0)
			{
					AppPlatform.$("_ustake").value = AppPlatform.Guess._userstake;
					if( _opt = document.getElementById("form_guess")._ustake)
					{
									AppPlatform.Guess.checkstsake(_opt);	
							
					}
			}
			 return;
		}	
		else
		{
			if(typeof msg !='undefined'&&msg!="")alert(msg);
		}
	},
	commndnews:function(){
		if(typeof guessnews !='undefined')
		{
			if(AppPlatform.$("commndnews")!=null){
				var _html = '';
				var _count =0;
				for(var i in guessnews){
					if(_count==5) break;
					if(typeof guessnews[i]['title']!='undefined' &&typeof guessnews[i]['url']!='undefined'){
						_html += '<li>·<a href="'+guessnews[i]['url']+'" target="_blank">'+guessnews[i]['title']+'</a></li>';
						_count++;
					}
				}
				if(_html!='') AppPlatform.$("commndnews").innerHTML = _html;
				if(AppPlatform.$("news_table")!=null) AppPlatform.$("news_table").style.display='';
			}
		}
	},
	friendslist:function(guessid){
		try{
			var personjson = eval('('+'personjson_'+guessid+')');
		}catch(e){}
		if(typeof personjson !='undefined')
		{ 
		try{
 
			 if(AppPlatform.$(guessid+"_personjson")!=null){
					var _html = '';
					var _count =0;
					for(var i in personjson){
						if(_count==4) break;
						if(typeof personjson[i]['f_QQId']!='undefined' &&typeof personjson[i]['f_Time']!='undefined' && typeof personjson[i]['f_OptId']!='undefined' && parseInt(personjson[i]['f_Stake'])>0){
							var _optionname='';
							if(typeof optionArray=='undefined') continue;
							for(var q in optionArray){		
								if(typeof optionArray[q]['id']!='undefined' &&optionArray[q]['id']==personjson[i]["f_OptId"]&&typeof optionArray[q]['name']!='undefined'){
									_optionname =  optionArray[q]['name'];
									_html += '<li><div class="mr">名人</div><div class="qd">'+personjson[i]["f_QQId"]+'</div><div class="jf">于'+personjson[i]["f_Time"]+' 下注了'+_optionname+' '+personjson[i]['f_Stake']+'分</div></li>';
									_count++;	
									_optionname ='';	
									break;
								}
							}
						}
					}
 

					if(_html!=''){
						AppPlatform.$(guessid+"_personjson").innerHTML = _html;
					}
					AppPlatform.$("personjson").style.display='';
				}
		 }catch(e){}
		}else{//
			if(AppPlatform.$("personjson")!=null){
				//AppPlatform.$("personjson").style.display='none';
			}
		}
	}
};

AppPlatform.Guess.User = {
	_usernick:0,
	getUin: function()
	{
		if (AppPlatform.Cookie.getCookie("uin") && AppPlatform.Cookie.getCookie("skey"))
		{
			return parseInt(AppPlatform.Cookie.getCookie("uin").replace(/^o0*/, ""));
		}
		else
		{
			return 0;
		}
	},
	getnick:function(){
		var _nick ='';
		if(AppPlatform.Cookie.getCookie('guess_nick')!=null){
							_nick = AppPlatform.Cookie.getCookie('guess_nick');
					}else if(AppPlatform.Guess.User._usernick!=0){
						_nick =AppPlatform.Guess.User._usernick;
					}else{
						_nick = AppPlatform.Guess.User.getUin();
					}
		return _nick;
	},
	login: function(callback)
	{
		this.LoginBox.login(callback);
	},
    loginout: function(t){
    	try{
    		if(t==1){
    			window.location.href = 	'http://apps.worldcup.qq.com/guess/logout?t=1';
    		}else{
    		 AppPlatform.JsLoader.load('_loginout',"http://apps.worldcup.qq.com/guess/logout?r="+Math.random(),function(){try{AppPlatform.Guess.User.LoginBox.loginout()}catch(e){}});
    		}
    	}catch(e){}
    	return false;
	},
	LoginBox: {
		show: function(callback)
		{
			var mini_style ='';
			AppPlatform.$("Float").style.width = AppPlatform.Page.getPageWidth() + "px";
			AppPlatform.$("Float").style.height = AppPlatform.Page.getPageHeight() + "px";
			AppPlatform.$("Float").style.display = "block";
			AppPlatform.$("Login_Box").style.left = (AppPlatform.Page.getBodyWidth() - 340)/2 + "px";
			AppPlatform.$("Login_Box").style.top = AppPlatform.Page.getBodyTop() + 100 + "px";
			AppPlatform.$("Login_Box").style.display = "block";
			if(document.URL.indexOf('t=common')!=-1){
				mini_style = '&hide_close_icon=1';
				AppPlatform.$("Login_Box").style.top = '0px';
			}
			AppPlatform.$("Login_Frame").src = "http://ui.ptlogin2.qq.com/cgi-bin/login?link_target=blank&f_url=loginerroralert&hide_title_bar=1"+mini_style+"&style=1&target=self&appid=5000301&s_url=http://www.qq.com/apps/html/guess_login.html";
			this.oY = AppPlatform.Page.getBodyTop();
			//this.oTimer = window.setInterval(LoginBox.scroll, 1);
		},
		isLogin:function(){
			if(AppPlatform.Cookie.getCookie('guess_nick')&&AppPlatform.Guess.User.getUin()>0&&AppPlatform.Cookie.getCookie('guess_nick')!=0){
				this.showUserBox(1);
			}else{
				//if(AppPlatform.Guess.User.getUin()==0){//未登录
				AppPlatform.$("user_box").style.display ='';
				AppPlatform.Guess._userstake =-1;
				//}else{//登录无昵称
				//	this.showUserBox(2);
				//}
			}
		},
		showUserBox:function(ei){
			/**
			AppPlatform.$("user_box").innerHTML = ' <div id="G_login2"><div class="float_l" >'
                								  +' <ul><li class="font_s_14 font_w_b" >欢迎您，<span id="login2_nick"></span></li>'
                								  								+'<li><img src="http://mat1.gtimg.com/www/apps/g_images/gold.gif"/> 体育积分：<span id="login2_stake"></span></li>'
                                                  +'</ul></div></div>'
                                                  +'<ul class="line_h_21"><li  class="font_s_14"><span class="color_dy">> 我参与的竞猜</span><span id="login2_num"></span></li></ul>';
            **/                          
            AppPlatform.$("user_box").innerHTML ='<table width="250" border="0" cellspacing="0" cellpadding="0">'                                     
            									+'<tr>'
            									+'<td height="12" background="http://mat1.gtimg.com/www/apps/wc/top09.png"></td>'
            									+'</tr>'
            									+'<tr>'
            									+'<td height="125" valign="top" class="bg1"><table width="220" border="0" align="center" cellpadding="0" cellspacing="0" class="mt16">'
            									+'<tr>'
            									+'<td height="30" valign="top" class="bgLogin"><span class="fontS14 fontB">欢迎您，<span class="colorGreen" id="login2_nick"></span> </span>[<span class="colorBlue"><a href="http://apps.worldcup.qq.com/guess/logout?t=1">退出</a></span>]</td>'
            									+'</tr>'
            									+'<tr><td height="26"><img id="reward" /></td></tr>'
            									+'<tr>'
            									+'<td height="50"><table width="220" border="0" cellspacing="0" cellpadding="0" class="colorGray lineH22">'
            									+'<tr>'
            									+'<td width="95">积分：<span id="login2_stake"></span></td>'
												+'<td><span id="addyiqian" style="position: relative; display: none;">'
            									+'<span id="newCountFollower" style="" class="bubbleW"><span id="addnumber">+<strong>1000</strong></span><span class="bubble">'
												+'</span>'
												+'</span>'
												+'</span></td>'
            									+'<td width="125">参与：<span id="login2_num"></span>场</td>'
            									+'</tr>'
            									+'</table></td></tr>'
            									+'<tr>'
            									+'<td class="colorBlue lineH21"><a href="http://my.worldcup.qq.com/?c=guess">查看我的竞猜</a></td>'
            									+'</tr>'
            									+'</table></td></tr></table>'; 
            var _url =AppPlatform.Guess.gethost();
					if(_url.indexOf('apps')==-1){
						_url = 'apps.'+_url.substring(0,_url.indexOf('.'))+'.qq.com';
					}
            //反分
            if(typeof document.getElementById("reward")!="undefined"){
            	AppPlatform.JsLoader.load('reward',
					"http://"+_url+"/guess/reward/isreward?r="+Math.random(),
					function(){
						if(typeof isreward!="undefined" &&isreward==1){//已经参与
							document.getElementById("reward").src ="http://mat1.gtimg.com/www/apps/images/button_gray.gif";
							document.getElementById("reward").onclick =function(){};
						}else{//未参与
							document.getElementById("reward").src ="http://mat1.gtimg.com/www/apps/images/button_blue.gif";
							document.getElementById("reward").onclick =function(){ AppPlatform.Guess.rsubmit() };
							document.getElementById("reward").style.cursor = "pointer";
							
						}
					});
            }
            //      
			AppPlatform.$("user_box").className = 'G_login_box2';
			if(ei==1){//已登录 resush
				AppPlatform.JsLoader.load('userinfo',
					"http://"+_url+"/guess/guess/user?r="+Math.random(),
					function(){AppPlatform.Guess.User.LoginBox.showuserinfo();});
			}else{//未登录
				//if(AppPlatform.Guess.User._usernick != 0&& typeof AppPlatform.Guess.User._usernick  !='undefined'){
				//	if(typeof AppPlatform.$("login2_nick")!='undefined'){
				//	AppPlatform.$("login2_nick").innerHTML = AppPlatform.Guess.User._usernick;
				//	AppPlatform.Cookie.setCookie('guess_nick',AppPlatform.Guess.User._usernick);
				//	}
				//	this.show_head_userinfo();
				//}else{
					AppPlatform.JsLoader.load('userinfo',
					"http://"+_url+"/guess/guess/user?r="+Math.random(),
					function(){AppPlatform.Guess.User.LoginBox.showuserinfo();});
				//}
			}
			AppPlatform.$("user_box").style.display ='';
			//首页处理
					var gframe1 ,gframe2;
					if(gframe1 =  AppPlatform.$("gframe1")){
						document.getElementById('gframe1').src ="http://worldcup.qq.com/guess/guessone.htm";
					}
					if(gframe2 =  AppPlatform.$("gframe2")){
						document.getElementById('gframe2').src ="http://worldcup.qq.com/guess/guesstow.htm"
					}
		},
		show_head_userinfo:function(){
			if(typeof AppPlatform.Guess._userstake!='undefined'){
				if( AppPlatform.$("guess_user_info")!=null){
					AppPlatform.$("guess_user_info").innerHTML = AppPlatform.Cookie.getCookie('guess_nick')+'(<span>共有'+AppPlatform.Guess._userstake+'积分</span>) | <a href="http://apps.worldcup.qq.com/guess/logout?t=1" >退出</a>';
				}
			}else{
				 if(AppPlatform.Cookie.getCookie('guess_nick')!=null)
				   AppPlatform.$("guess_user_info").innerHTML = AppPlatform.Cookie.getCookie('guess_nick')+'| <a href="http://apps.worldcup.qq.com/guess/logout?t=1" >退出</a>';
			}
		},
		showuserinfo:function(){
			if( typeof AppPlatform.Guess.User._usernick  !='undefined'){
				if(typeof AppPlatform.$("login2_nick")!='undefined'){
					if(AppPlatform.Guess.User._usernick!=0)
					{
						AppPlatform.$("login2_nick").innerHTML = AppPlatform.Guess.User._usernick;
					}
					if(typeof AppPlatform.Guess._userstake!='undefined'&&typeof AppPlatform.Guess._usernum!='undefined'){
					AppPlatform.$("login2_stake").innerHTML = AppPlatform.Guess._userstake;
					AppPlatform.$("login2_num").innerHTML = ''+AppPlatform.Guess._usernum+'';
				  }
					AppPlatform.Cookie.setCookie('guess_nick',AppPlatform.Guess.User._usernick);
				}
				this.show_head_userinfo();
			}
		},
		hide: function()
		{
			AppPlatform.$("Float").style.display = "none";
			AppPlatform.$("Login_Box").style.display = "none";
			AppPlatform.$("Login_Frame").src = "about:blank";

			//window.clearInterval(this.oTimer);
		},
		oY: 0,
		oTimer: null,
		scroll: function()
		{
			//alert(LoginBox.oY);
			var winY = AppPlatform.Page.getBodyTop();
			var curY = AppPlatform.Element.getElementTop("Login_Box");
			var percent = 0.2 * (winY - this.oY);
			//alert(winY+' '+this.oY)
			if (percent > 0)
			{
				percent = Math.ceil(percent);
			}
			else
			{
				percent = Math.floor(percent);
			}
			AppPlatform.$("Login_Box").style.top = curY + percent + "px";
			this.oY += percent;
			AppPlatform.$("Float").style.width = AppPlatform.Page.getPageWidth() + "px";
			AppPlatform.$("Float").style.height = AppPlatform.Page.getPageHeight() + "px";
			AppPlatform.$("Float").style.display = "block";
		},
        loginout: function()
		{ 
			try{
			 //document.URL=location.href 	
			 window.location.href =window.location.href+' ';
			 window.location.replace(window.location.href);
			 if(AppPlatform.Browser.ie){
			 	document.URL=location.href;
			 	window.history.go(0);
			 }else{
			 	window.history.back(0);
			 }
			 
			}catch(e){}
		},
		login: function(callback)
		{
			AppPlatform.HashTable.getInstance().set("login_callback", callback);
			this.show();

		},
		ok: function()
		{
			if (typeof AppPlatform.HashTable.getInstance().get("login_callback") == "function")
			{
				if(AppPlatform.Guess._userstake == 0){
					AppPlatform.Guess.getUserInfo();
				}
				AppPlatform.HashTable.getInstance().get("login_callback")();
				AppPlatform.HashTable.getInstance().remove("login_callback");
			}
			else
			{
				AppPlatform.Guess.submit();//NOUSER
			}
			this.hide();
		},

		cancel: function()
		{
			AppPlatform.HashTable.getInstance().remove("login_callback");
			this.hide();
		}
	}
};
function changeImg(){
	var img = document.getElementById("imgVerify");
	img.src = "http://ptlogin2.qq.com/getimage?aid=5000301&"+Math.random();
}
function listCode(v){
	try{
		if(typeof document.getElementById("imgVerify").src == 'undefined'||document.getElementById("imgVerify").src=='')
		{
			document.getElementById("imgVerify").src =  "http://ptlogin2.qq.com/getimage?aid=5000301&"+Math.random();
		}
		if(v==1){
			document.getElementById("vCode2").style.display='';
		}else{
			document.getElementById("vCode2").style.display='none';
		}
	}catch(e){}
}
function copyLink(guessid){
	try{
		var cText ='';
		if(typeof guessid!='undefined')
		{
			cText = 'http://apps.worldcup.qq.com/guess/guess/show-id-'+guessid;
		}else{
			cText=document.location.toString();
		}
		cText = "我正在参加腾讯世界杯竞猜，你来跟我一起参加吧：" +cText;
		if(window.clipboardData){
			window.clipboardData.setData("Text",cText);
			alert("复制完成!");
				return false;
		}else if(window.netscape){
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}catch(e){
				alert("您的浏览器设置为不允许复制！\n如果需要此操作，请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true',再重试复制操作!");
				return false;
			}
			}
			
		}catch(e){}
}
function ptlogin2_onResize(b, c) {
		var d;
		if(!b||b<300){b=371;c=276;}
		if(d=document.getElementById("Login_Box")){
			d=d.style;
			d.height=c+"px";
			d.visibility="hidden";
			d.visibility="visible";
		}
}/*  |xGv00|c4895a781a62ffad931392e853a14cc7 */