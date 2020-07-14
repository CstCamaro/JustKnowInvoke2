//showHotTab
function showHotTab(n1,n2){
	var h=document.getElementById("tab"+n1).getElementsByTagName("h3");
	var d=document.getElementById("tab"+n1).getElementsByTagName("h4");
	for(var i=0;i<h.length;i++){
		if(n2-1==i){
			h[i].className+=" up";
			d[i].className+=" block";
		}
		else {
			h[i].className=" ";
			d[i].className=" ";
		}
	}
}/*  |xGv00|6f72df4e7f1269221a1c7caa369aaf9a */