document.writeln("<div id=\"sc\" style=\"POSITION:fixed;Z-INDEX:99999;RIGHT:0px;bottom:5px;width: 300px;border:1px solid #ccc;padding:1px;font-size:12px\"><div style=\"width: 300px;text-align:center;line-height:25px;padding:1px;background: #efefef;\"><span onclick=\"javascript:closeSC()\" style=\"cursor:pointer;\">腾讯房产网 house.qq.com 关闭<\/span><\/div>																																																																			<IFRAME marginHeight=0 marginWidth=0 noResize scrolling=no frameBorder=0 src=//haerbin.house.qq.com/mudanjiang/mdj-shichuang.htm width=300 height=200><\/IFRAME><\/div>")
function closeSC(){
	document.getElementById("sc").innerHTML='';
	document.getElementById("sc").style.visibility='hidden';
	document.getElementById("sc").style.display='none';
}
//setTimeout("closeSC();", 25000); 

/*  |xGv00|0b53f625468523db06c4566a8e8de107 */