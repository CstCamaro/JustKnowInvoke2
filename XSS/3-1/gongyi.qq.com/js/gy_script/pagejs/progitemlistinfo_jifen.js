var TCCFPROG_ARRAY = new Array();
var IMAGES_TCCFPROG_ARRAY = new Array();
var ProgContext_Array = new Array();
ProgContext_Array[0]=Array('18','http://qbar.qq.com/fupin','中国扶贫基金会','和腾讯一起，追逐梦想','<img src=http://mat1.qq.com/gongyi/images/juanzeng/ym2008/donate_foucs080618.jpg width=120  class=imgbor7 alt=和腾讯一起，追逐梦想>','腾讯公益为”圆梦2008“公益行动搭建在线募捐平台。腾讯QQ会员出资20万，腾讯公益慈善基金会更开展匹配捐赠活动：网友通过财付通每捐1元，腾讯匹配1元；每捐1000个QQ积分，腾讯捐2元。赶快参加吧！','http://gongyi.qq.com/html/prog/080612181808791.htm','15','http://gongyi.qq.com/html/list/18_evenlist.htm');
TCCFPROG_ARRAY[0]=Array('18','236655.7','12675','382393119','339686','RMB','JIFEN','0','所','0');
IMAGES_TCCFPROG_ARRAY[18] =Array();
IMAGES_TCCFPROG_ARRAY[18][0]=Array('18','http://mat1.qq.com/gongyi/images/juanzeng/ym2008/litter/hy_a01.jpg','http://gongyi.qq.com/html/even/080617171637984.htm','海原县曹洼小学');
IMAGES_TCCFPROG_ARRAY[18][1]=Array('18','http://mat1.qq.com/gongyi/images/juanzeng/ym2008/litter/hy_b02.jpg','http://gongyi.qq.com/html/even/080617173742486.htm','海原县关桥小学');
IMAGES_TCCFPROG_ARRAY[18][2]=Array('18','http://mat1.qq.com/gongyi/images/juanzeng/ym2008/litter/hy_c02.jpg','http://gongyi.qq.com/html/even/080617173742303.htm','海原县李旺中心学校');
IMAGES_TCCFPROG_ARRAY[18][3]=Array('18','http://mat1.qq.com/gongyi/images/juanzeng/ym2008/litter/hy_d01.jpg','http://gongyi.qq.com/html/even/080617191441445.htm','海原县西安镇西安中心小学');
IMAGES_TCCFPROG_ARRAY[18][4]=Array('18','http://mat1.qq.com/gongyi/images/juanzeng/ym2008/litter/hy_e02.jpg','http://gongyi.qq.com/html/even/080617192341418.htm','海原县郑旗小学');


 function Gongyi_Abandon_Info_Array_InIt(Permitkeys,number_object,flag){
		var ishave=false;var arraylogin =TCCFPROG_ARRAY.length;
		var textstr="";
		for(var i=0;i<arraylogin;i++){
			if(TCCFPROG_ARRAY[i][0] == Permitkeys){
				if(TCCFPROG_ARRAY[i][9]>1){
					textstr+="受益人数: <span class='b rednl'>"+TCCFPROG_ARRAY[i][9]+"</span>人";
				}
				if(TCCFPROG_ARRAY[i][1]>0){
					textstr+="  捐赠统计: <span class='b orred1'>"+TCCFPROG_ARRAY[i][1]+"</span>元/"+TCCFPROG_ARRAY[i][2]+"人";
				}
				if(TCCFPROG_ARRAY[i][3]>1){
					textstr+="  <span class='b lvred1'>"+TCCFPROG_ARRAY[i][3]+"</span>积分/"+TCCFPROG_ARRAY[i][4]+"人 ";
				}

				if(flag==0){ 
					document.write(textstr);
					ishave=true;
					break;
				}else{ 
					return textstr;
				}
			} 
		}
		if(flag==0){
			if(ishave) 
			number_object.style.display=''; 
			else 
			number_object.style.display='none';
		}
	} 

/*-------以上为数据-2010-03-12 09:30:47-------*/
function Show_Images_Fun(Keys,this_tr_object,flag,more_href){
	if(!IMAGES_TCCFPROG_ARRAY[Keys]) return false;
	var length_num 		= IMAGES_TCCFPROG_ARRAY[Keys].length;
 if(flag==0 && this_tr_object!=""){		if(length_num==0){
			this_tr_object.style.display='none';
			return false;
		}else{
			this_tr_object.style.display='';
		}
	}else{if(length_num==0) return ""; }
	var ThisArrayInfo 	= IMAGES_TCCFPROG_ARRAY[Keys];
	var html_text ="";
	html_text="<table width='100%' border='0' cellpadding='0' cellspacing='0' background='http://mat1.qq.com/gongyi/images/gongyi/gy_img_070.gif'>";
	html_text+="<tr>";
	html_text+="<td width='32' height='64' background='http://mat1.qq.com/gongyi/images/gongyi/gy_img_069.gif'></td>";
	html_text+="<td style='background-image:url(http://mat1.qq.com/gongyi/images/gongyi/gy_img_071.gif); background-repeat: no-repeat; background-position: right;'>";
	for(var i=0;i<length_num;i++){
		html_text+="<a href='"+ThisArrayInfo[i][2]+"' target='_blank'><img src='"+ThisArrayInfo[i][1]+"' height='60' hspace='6' border='0' class='imgbor7' alt='"+ThisArrayInfo[i][3]+"'></a>";
	}
	html_text+="<a href='"+more_href+"' target='_blank'><img src='http://mat1.qq.com/gongyi/images/gongyi/gy_img_072.gif' width='50' height='50' hspace='6' border='0' alt='更多'></a>";
	html_text+="</td>";
	html_text+="</tr>";
	html_text+="</table>";
	if(flag==0)document.write(html_text);else return html_text
}
/*  |xGv00|c06ab6e2851b7d19c837f103d34b3f80 */