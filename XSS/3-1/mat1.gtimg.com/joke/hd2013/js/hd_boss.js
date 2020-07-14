if(document.addEventListener){
        document.addEventListener("click", registerZone2, false);
}
else if(document.attachEvent){
        document.attachEvent("onclick", registerZone2);
}
var gImage;

//取自定义属性
function registerZone2(ev,clickType)
{
    var loopTryNum = 10;
    var bossID = 1408;
	  
    try
	{
		var a=document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
		var iQQ=(a==null?"":unescape(a[2]));
		var purl='';
		var zoneId='';
		if(typeof clickType == 'undefined')
		{
	        var ev = window.event || ev;
	        var et = ev.srcElement || ev.target;
		    var type=et.tagName;
	        if (type != "A" && type != "IMG" && type != "LI") 
		    {
		        return true;
		    } 
		    if (type == "A")
		    {
		        purl = et.href;
		    }
		    else if (type == "IMG")
		    {
		        purl = et.parentNode.href;
		    }
		    //pseudo attr
		    for (var i=loopTryNum-1,tagNode=et;i>=0;i--,tagNode=tagNode.parentNode)
		    {
		        if(tagNode.attributes['bossZone'])
			    {
		            zoneId = tagNode.attributes['bossZone'].nodeValue;
			    } else if(tagNode.attributes['bosszone'])
			    {
			        zoneId = tagNode.attributes['bosszone'].nodeValue;
			    }
			    else if(tagNode.attributes['BossZone'])
			    {
			        zoneId = tagNode.attributes['BossZone'].nodeValue;
			    }
			    else if(tagNode.attributes['Bosszone'])
			    {
			        zoneId = tagNode.attributes['Bosszone'].nodeValue;
			    }

		        if(zoneId) break; 
		    }		
		    if(!zoneId) return;
		}
		else
		{
		    zoneId = ev.bossZone;
			purl = ev.url;
		}
		//site
		var localUrl = location.href;
		var site = localUrl.substring(7,localUrl.indexOf('.qq.com'));
		site = site.substr(site.lastIndexOf('.')+1);
		var iurl = 'http://btrace.qq.com/collect?sIp=&iQQ='+iQQ+'&sBiz=qq.com&sOp='+zoneId+'&iSta=&iTy='+bossID+'&iFlow=&site='+site
		      +'&sUrl='+escape(purl)+'&sLocalUrl='+escape(location.href)+'&articleType='+'&tmplType=&'+Math.random();
		
		gImage = new Image(1,1);
		gImage.src = iurl;
	} catch (e) {}
}/*  |xGv00|6ecd18350fcd45e1efb20d1be606f756 */