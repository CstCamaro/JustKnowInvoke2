//本页需要的js基础函数
//Browser check
var Browser = new Object();

Browser.ua = window.navigator.userAgent.toLowerCase();
Browser.ie = /msie/.test(Browser.ua);
Browser.moz = /gecko/.test(Browser.ua);


//JsLoader
var JsLoader = {
	load: function(sUrl, fCallback){
		var _script = document.createElement("script");
		_script.setAttribute("type", "text/javascript");
		_script.setAttribute("src", sUrl);
		document.getElementsByTagName("head")[0].appendChild(_script);

		if (Browser.ie){
			_script.onreadystatechange = function(){
				if (this.readyState=="loaded" || this.readyState=="complete"){
					fCallback();
				}
			};
		}
		else if (Browser.moz){
			_script.onload = function(){
				fCallback();
			};
		}
		else{
			fCallback();
		}
	}
};

	function getid(div){
	  return document.getElementById(div);
  }

	//拉取黄历数据
	function loadgo108nlInfo(){
		var urlFID = 'https://nl.ibazi.com.cn/qq/query_insider.php?act=hl';
		urlFID += '&qyear=' + getid("go108_hl_iYear").value + '&qmonth=' + getid("go108_hl_iMonth").value + '&qday=' + getid("go108_hl_iDay").value;		
		JsLoader.load(urlFID,function(){
			//拿到FID
			if (typeof go108nlFID != "undefined" && go108nlFID != ""){
				var urlJson = 'https://nl.ibazi.com.cn/qq/data_insider/' + Math.floor(go108nlFID/1000) + "/" + go108nlFID + "info.js";
				JsLoader.load(urlJson, function(){
					if (typeof go108nlInfo_insider != "undefined"){

						getid("go108nl_day").innerHTML = go108nlInfo_insider["G1"];
						getid("go108nl_ylStr").innerHTML = go108nlInfo_insider["G2"];
						getid("go108nl_nlStr").innerHTML = '农历&nbsp&nbsp'+go108nlInfo_insider["G3"];
						getid("go108nl_Yi").innerHTML = go108nlInfo_insider["G4"];
						getid("go108nl_Ji").innerHTML = go108nlInfo_insider["G5"];
						// getid("go108nl_more").href   = 'https://astro.fashion.qq.com/app/huangli.htm?id='+go108nlFID
						
						
					}else{
						alert("暂无该数据，稍后填充，请随时关注最新运势。");
					}
				});
			}else
			{
				alert("暂无该数据，稍后填充，请随时关注最新运势。");
			}
		});
	}
/*  |xGv00|08543d00fa808dfb889b34cc4de38475 */