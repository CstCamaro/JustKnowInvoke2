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
/* APP Common End*/



AppPlatform.User = {

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

		login: function(callback)
		{
			this.LoginBox.login(callback);
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
				AppPlatform.$("Login_Frame").src = "http://ui.ptlogin2.qq.com/cgi-bin/login?link_target=blank&f_url=loginerroralert&hide_title_bar=1&style=1&appid=5000501&s_url=" + global_guesshtml +"&qlogin_param="+ encodeURIComponent("u1="+global_guesshtml)  ;
				this.oY = AppPlatform.Page.getBodyTop(); 
				//this.oTimer = window.setInterval(LoginBox.scroll, 1);
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

			login: function(callback)
			{
			
				AppPlatform.HashTable.getInstance().set("login_callback", callback);
				this.show();
				
			},

			ok: function()
			{
				if (typeof AppPlatform.HashTable.getInstance().get("login_callback") == "function")
				{
					AppPlatform.HashTable.getInstance().get("login_callback")();
					AppPlatform.HashTable.getInstance().remove("login_callback");
				}
				else
				{
					AppPlatform.Guess.submit();
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
function ptlogin2_onResize(width, height) {
		login_wnd = document.getElementById("login_div");
		if (login_wnd)	{
			login_wnd.style.width = width + "px";
			login_wnd.style.height =   "180px";
			login_wnd.style.visibility = "hidden"
			login_wnd.style.visibility = "visible"
		}
}
/*  |xGv00|6291c7373197ffaed029fa4fd40c5af0 */