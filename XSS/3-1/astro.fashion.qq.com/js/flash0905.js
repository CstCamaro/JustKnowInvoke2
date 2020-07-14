function insertFlash(elm, url, w, h,pic,link,text,textheight) 
{
	if (!document.getElementById(elm)) return;
	if(arguments.length>4)
	{
		var fh = h - textheight;
	}
	var str = '';
	str += '<object ID="focus_flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+ w +'" height="'+ h +'">';
	str += '<param name="allowScriptAccess" value="sameDomain"><param name="movie" value="'+url+'"><param name="quality" value="high"><param name="bgcolor" value="#FFFFFF">';
	str += '<param name="menu" value="false"><param name=wmode value="opaque">';
	if(arguments.length>4)
	{
		str += '<param name="FlashVars" value="pics='+pic+'&links='+link+'&texts='+text+'&borderwidth='+w+'&borderheight='+fh+'&textheight='+textheight+'">';
		str += '<embed ID="focus_flash" src="'+url+'" wmode="opaque" FlashVars="pics='+pic+'&links='+link+'&texts='+text+'&borderwidth='+w+'&borderheight='+fh+'&textheight='+textheight+'" menu="false" bgcolor="#C5C5C5" quality="high" width="'+ w +'" height="'+ h +'" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';	
	}
	else
	{
		str += '<embed src="'+url+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+w+'" height="'+h+'"></embed>'
	}
	document.getElementById(elm).innerHTML = str;
}