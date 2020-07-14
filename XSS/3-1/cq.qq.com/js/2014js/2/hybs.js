// JavaScript Document
function do_list_row_show(strid){
	strid.getElementsByTagName('a')[0].className='on';
	strid.getElementsByTagName('span')[0].style.display="block";
	strid.style.position="relative";
}
function do_list_row_unshow(strid){
	strid.getElementsByTagName('a')[0].className='';
	strid.getElementsByTagName('span')[0].style.display="";
	strid.style.position="";
}
submenu = function(box,div){
	var div_classname = document.getElementById(div).getElementsByTagName('a')[0];
	if(div_classname.className=='show'){
		with(document.getElementById(box).style){
			height='auto';display='block';
		}
		div_classname.className='less';div_classname.innerHTML='收缩';
	}else{
		with(document.getElementById(box).style){
			height='0';display='none';
		}
		div_classname.className='show';div_classname.innerHTML='展开';
	}
}/*  |xGv00|e7018183105c7410c47303daf4aca548 */