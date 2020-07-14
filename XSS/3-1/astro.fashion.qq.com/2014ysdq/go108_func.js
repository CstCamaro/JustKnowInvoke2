//本页需要的js基础函数
//Browser check
var Browser = new Object();

Browser.ua = window.navigator.userAgent.toLowerCase();
Browser.ie = /msie/.test(Browser.ua);
Browser.moz = /gecko/.test(Browser.ua);
//JsLoader
var JsLoader = {
	load: function(sUrl, fCallback)
	{
		var _script = document.createElement("script");
		_script.setAttribute("type", "text/javascript");
		_script.setAttribute("src", sUrl);
		document.getElementsByTagName("head")[0].appendChild(_script);

		if (Browser.ie)
		{
			_script.onreadystatechange = function()
			{
				if (this.readyState=="loaded" || this.readyState=="complete")
				{
					fCallback();
				}
			};
		}
		else if (Browser.moz)
		{
			_script.onload = function()
			{
				fCallback();
			};
		}
		else
		{
			fCallback();
		}
	}
};


	function getid(div){
	  return document.getElementById(div);
  }
	
	//拉取黄历数据
	function loadgo108nlInfo()
	{
		var urlFID = 'http://nl.go108.com.cn/qq/fquery.php?act=fortune';
		urlFID += '&qyear=' + getid("go108_hl_iYear").value + '&qmonth=' + getid("go108_hl_iMonth").value + '&qday=' + getid("go108_hl_iDay").value;		
		
		JsLoader.load(urlFID,function()
		{
			//拿到FID
			if (typeof go108nlFID != "undefined" && go108nlFID != "")
			{
				var urlJson = 'http://nl.go108.com.cn/qq/fdata/fortune/' + Math.floor(go108nlFID/1000) + "/" + go108nlFID + "info.js";

				JsLoader.load(urlJson, function()
				{
					if (typeof go108nlInfo != "undefined")
					{
						getid("go108nl_ShowTime").innerHTML = '农历：'+go108nlInfo["G1"];
						getid("go108nl_Yi").innerHTML = '<span class="span1">宜</span>'+go108nlInfo["G3"];
						getid("go108nl_Ji").innerHTML = '<span class="span2">忌</span>'+go108nlInfo["G4"];
						
						getid("go108nl_wedd").href = 'http://astro.fashion.qq.com/app/jiehun.htm?id='+go108nlFID+'1';
						getid("go108nl_banj").href = 'http://astro.fashion.qq.com/app/huangli.htm?id='+go108nlFID+'2';
						getid("go108nl_chux").href = 'http://astro.fashion.qq.com/app/huangli.htm?id='+go108nlFID+'3';
						
					}else{
						alert("暂无该数据，稍后填充，请随时关注最新运势。");
					}
				});
			}else
			{
				alert("暂无该数据，稍后填充，请随时关注最新运势。");
			}
		});
	}/*  |xGv00|53e4b9ea02b75a70d7835eed642f00a6 */