	window.QVPL = window.QVPL || {};
	QVPL.version = "0.0.0.2 alpah";
	QVPL._viewappPath = "http://vv.video.qq.com/geturl";
	QVPL._scriptTimeout = 20000;
	QVPL._playerErrorTimes = new Array();
	QVPL._playerVidUrls = new Array();
	QVPL._clientPlatform = "";

	QVPL._drawPlayer = function(vid, width, height, poster, parentDiv, playAfterLoad)
	{
		var d = Math.round(Math.random()*10000);
		var jvarName = "json" + d;
		var jsurl = QVPL._viewappPath + "?vid=" + vid + "&otype=json&callvar=" + jvarName;
		var oScriptEl, oTimeoutHDL, oHead;
		oScriptEl = document.createElement("script");
		oScriptEl.type = "text/javascript";
		oScriptEl.language = "javascript";
		oScriptEl.src = jsurl;
		oScriptEl.onreadystatechange = doCallback;
    
		oScriptEl.onload = function()
		{
			this.readyState = "complete";
			doCallback(); 
		};
    
		oTimeoutHDL = window.setTimeout(doError, QVPL._scriptTimeout);
		document.getElementsByTagName("head")[0].appendChild(oScriptEl);

		function doCallback()
		{
			if (oScriptEl.readyState == "complete" || oScriptEl.readyState == "loaded")
			{
				 oScriptEl.onload = oScriptEl.onreadystatechange = new Function();
				 var htmlCode = QVPL._getPlayerHtmlCode(jvarName, width, height, poster);
				 if (htmlCode.length > 0)
				 {
					QVPL._playerErrorTimes["player_" + jvarName] = 0;
					parentDiv.innerHTML = htmlCode;
					var player = document.getElementById("player_" + jvarName);
					try {	
						if (QVPL._clientPlatform == "ipad")
						{	
							player.load();
						}
						if (playAfterLoad)
						{
							player.play();
						}
					} catch(err) {
					}
				 }
				 window.clearTimeout(oTimeoutHDL);
				 oScriptEl.parentNode.removeChild(oScriptEl);
			 }
		 };

		function doError()
		{
			 oScriptEl.parentNode.removeChild(oScriptEl);
		};
	};

	QVPL._parseParams = function(paramString, dem)
	{
		var params = new Array();
		var _params = paramString.split(dem);
		var _paramsSize = _params.length;
		for (var _paramsIndex = 0; _paramsIndex < _paramsSize; _paramsIndex++)
		{
			var _set = _params[_paramsIndex].split("=");
			if (_set.length == 2)
			{
				params[_set[0]] = _set[1];
			}
		}
		return params;
	}

	QVPL._isMp4File = function(url)
	{
        var urls = url.split("?", 1);
        var len = urls[0].length;
        var suffix = urls[0].substr(len - 3);
	
		if (suffix == "mp4")
		{
			return true;
		}
	
		return false;
	}
	
	QVPL._getPlayerId = function(jvarName)
	{
		return "player_" + jvarName;
	}

	QVPL._playerOnPlay = function(jvarName)
	{
		var id = QVPL._getPlayerId(jvarName);
		var player = document.getElementById(id);
		player.poster = "";
		player.play();
	}

	QVPL._playerOnError = function(e, jvarName)
	{
		var id = QVPL._getPlayerId(jvarName);
		QVPL._playerErrorTimes[id]++;
		if (QVPL._playerErrorTimes[id] == QVPL._playerVidUrls[id]) {
			var player = document.getElementById(id);
			var width = player.width;
			var height = player.height;
			var poster = player.poster;
			eval(jvarName+"=null;");
			var htmlCode = QVPL._getPlayerHtmlCode(jvarName, width, height, poster);
			if (htmlCode.length > 0)
			{
				var parentDiv = player.parentNode;
				parentDiv.innerHTML = htmlCode;
			}
		}
	}
	
	QVPL._playerOnEnded = function(e, jvarName)
	{
		if (typeof(onVideoPlayerCompleted) == "function") {
			onVideoPlayerCompleted();
		}
	}

	QVPL._getPlayerHtmlCode = function(jvarName, width, height, poster)
	{
		var _vidUrls = new Array();
		var htmlCode;
		var data;
		eval("data="+jvarName+";");
		if (data && data.s == "o" && data.vd.nt > 0)
		{
			// put the mp4 file first in the play list
			for (var i = data.vd.nt-1; i > -1; i--)
			{
				if (data.vd.vi[i].st == 2)
				{
					var url = data.vd.vi[i].url;
					if (QVPL._isMp4File(url))
					{
						_vidUrls.push(url);
					}
					if (!!data.vd.vi[i].burl)
					{
						var burl = data.vd.vi[i].burl;
						if (QVPL._isMp4File(burl))
						{
							_vidUrls.push(burl);
						}
					}
				}		
			}
		}
			
		var id = QVPL._getPlayerId(jvarName);
		if (_vidUrls.length > 0)
		{
			var htmlCode ="<video id=\"" + id +"\" width=\"" + width + "\" height=\"" + height + "\" controls=\"controls\" poster=\"" + poster + "\" onplay=\"QVPL._playerOnPlay(\'" + jvarName + "\')\" onended=\"QVPL._playerOnEnded(event, \'" + jvarName + "\')\" >";
			for (var i = 0; i < _vidUrls.length; i++)
			{
				var url = _vidUrls[i];
				htmlCode += "   <source src=\"" + _vidUrls[i] + "\" type=\"video/mp4\" onerror=\"QVPL._playerOnError(event, \'" + jvarName + "\')\" ></source>";
			}
			htmlCode += "</video>";	
		}
		else 
		{
			if (!isNaN(width))
			{
				width += "px";
			}
			if (!isNaN(height))
			{
				height += "px";
			}
			htmlCode = 
		"<div id=\"" + id + "\" align='center' style=\"position:relative; height:" + height + "; width:" + width + "; background-color:black\" >" +
                "   <span style=\"font-size:14px; color:#C0C1C1;line-height:24px;\">非常抱歉，暂不支持该格式的播放。<br>技术解决中，敬请期待！</span>" + 
		"</div>";
		}

		QVPL._playerVidUrls["player_" + jvarName] = _vidUrls.length;
		return htmlCode;
	}

	QVPL._checkClientPlatform = function()
	{	
		var pl = navigator.platform.toLowerCase();
		var ipad = pl.match(/ipad/);
		if (ipad) {
			QVPL._clientPlatform = "ipad";
			return true;
		}	
		var iphone = pl.match(/iphone/);
		if (iphone) {
			QVPL._clientPlatform = "iphone";
			return true;
		}
		var ipod = pl.match(/ipod/);
		if (ipod) {
			QVPL._clientPlatform = "ipod";
			return true;
		}
		return false;	
	}
		
	
	QVPL.switchVideo = function(playerId, vid, playAfterSwitch) 
	{
		var player = document.getElementById(playerId);
		if (!!player)
		{
			var parentDiv = player.parentNode;
			var width = player.width || parseInt(player.style.width);
			var height = player.height || parseInt(player.style.height);
			var poster = "";
			QVPL._drawPlayer(vid, width, height, poster, parentDiv, playAfterSwitch);
		}
	}
	
	QVPL._insertPlayerToObjectTag = function(object)
	{
		var player = object;
		var width = player.width;
		var height = player.height;
		var vid = "";
		var poster = "";
		var name_found = false;
		var paramWalker = document.createTreeWalker(player, NodeFilter.SHOW_ELEMENT, null, false);
		var param = paramWalker.firstChild();
		while (param)
		{
			var name = param.getAttribute("name");
			if (name == "movie")
			{
				var swf = param.getAttribute("value");
				if (/^(http:\/\/cache\.tv\.qq\.com\/qqplayerout\.swf)/.test(swf) 
						|| /^(http:\/\/cache\.tv\.qq\.com\/qqplayerout\.swf)/.test(swf))
				{
					var reVid = /\?v=(\S+)/;
					if (reVid.test(swf))
					{
						vid = RegExp.$1;
					}
					name_found = true;
				}
			}

			if (name == "flashvars")
			{
				var flashvars = param.getAttribute("value");
				var vars = QVPL._parseParams(flashvars, "&");
				if (vid.length == 0)
				{
					vid = vars.vid;
				}
				poster = vars.pic;
			}

			param = paramWalker.nextSibling();
		}

		if (name_found)
		{
			var parentDiv = player.parentNode;
			var playAfterLoad = false;
			QVPL._drawPlayer(vid, width, height, poster, parentDiv, playAfterLoad);
			return true;
		}
		return false;
	}	
	
	QVPL._insertPlayerToEmbedTag = function(embed)
	{
		var player = embed;
		var width = player.getAttribute("width");
		var height = player.getAttribute("height");
		var vid = "";
		var poster = "";

		var swf = player.getAttribute("src");
		if (/^(http:\/\/cache\.tv\.qq\.com\/qqplayerout\.swf)/.test(swf) 
				|| /^(http:\/\/cache\.tv\.qq\.com\/qqplayerout\.swf)/.test(swf))
		{
			var reVid = /\?v=(\S+)/;
			if (reVid.test(swf))
			{
				vid = RegExp.$1;
			}
			
			var parentDiv = player.parentNode;
			var flashvars = player.getAttribute("flashvars");
			var vars = QVPL._parseParams(flashvars, "&");
			if (vid.length == 0)
			{
				vid = vars.vid;
			}
			poster = vars.pic;
			
			var playAfterLoad = false;
			QVPL._drawPlayer(vid, width, height, poster, parentDiv, playAfterLoad);
			return true;
		}
		return false;
	}	
	
	QVPL.main = function() 
	{
		if (!QVPL._checkClientPlatform())
		{
			return;
		}

		var objList = document.getElementsByTagName("object");
		var objCount = objList.length;
		var objPlayerCount = 0;
		
		for (var objIndex = 0; objIndex < objCount; objIndex++)
		{	
			var player = objList[objIndex];
			if (QVPL._insertPlayerToObjectTag(player))
			{
				objPlayerCount++;
			}	
		}
		
		if (objPlayerCount == 0)
		{	
			var embedList = document.getElementsByTagName("embed");
			var embedCount = embedList.length;

			for (var embedIndex = 0; embedIndex < embedCount; embedIndex++)
			{	
				var player = embedList[embedIndex];
				QVPL._insertPlayerToEmbedTag(player);
			}
		}
	}
	
	QVPL.main();
/*  |xGv00|cb7b6a7d3b1e31e5acbb23560cd61f9a */