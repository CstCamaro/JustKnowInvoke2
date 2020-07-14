/*
function: pac
date: 20160907
author:limeizhang
*/
var gbeehiveHandler = new beehiveHandler();
var gbeehive_btrace_BOSS = new Image(1,1);
var beehiveZone = gbeehiveHandler.beehiveZone;

if(document.addEventListener){
    document.addEventListener("click", beehiveZone, false);
}else if(document.attachEvent){
    document.attachEvent("onclick", beehiveZone);
}

function beehiveHandler(){
    var sFlag=false;
	this.beehiveZone = function (ev,clickType){
	    var loopTryNum = 10;
	    try{	
			var a=document.cookie.match(new RegExp('(^|)pac_uid=([^;]*)(;|$)')),
				pac_uid=(a==null?"":unescape(a[2])),
				purl='',
				zoneId='';
			
			if(typeof clickType == 'undefined'){
			    if(sFlag) return true;
		        var ev = window.event || ev,
		        	et = ev.srcElement || ev.target,
		        	type=et.tagName.toUpperCase();
		        if (type != "A" && type != "IMG" ){
			        return true;
			    } 
			
			    if (type == "A"){
			        purl = et.href;
			    }else if (type == "IMG"){
			        purl = et.parentNode.href;
			    }
			
			    //pseudo attr
			    for (var i=loopTryNum-1,tagNode=et;i>=0;i--,tagNode=tagNode.parentNode){
			        if(tagNode.attributes['beehivezone']){
			            zoneId = tagNode.attributes['beehivezone'].nodeValue;
				    }
			        if(zoneId) break; 
			    }		
			    if(!zoneId) return;
			}else{
			    zoneId = ev.beehivezone;
				purl = ev.url;
				sFlag = true;
				setTimeout(function (){sFlag = false;},200);
			}
			
			var localUrl = location.href;
			var site = localUrl.substring(7,localUrl.indexOf('.qq.com'));
			site = site.substr(site.lastIndexOf('.')+1);
			var productOutline = "";
			if(localUrl.indexOf("wxn")>-1){
				productOutline = "wxn_detailPage";
			}else if(localUrl.indexOf("xw")>-1){
				productOutline = "xwQQ";
			}else if(localUrl.indexOf("/a/")>-1){
				productOutline = "qqCom_detailPage";
			}

			var iurl = '//btrace.qq.com/kvcollect?BossId=4118&Pwd=1894948148&productOutline='+productOutline+'&productDetail='+zoneId+'&domain='+site+'&url='+escape(location.href)+'&pacUID='+pac_uid+'&targetUrl='+escape(purl)+'&_dc=' + Math.random();
			
			gbeehive_btrace_BOSS.src = iurl;
		} catch(e){}
	}
}/*  |xGv00|206cc66ecfd90f435215cc836df62294 */