var ads_argv_array=new Array();//保存请求的参数
var ads_argv_complate_array='';//保存请求的key完整值

var ads_argv_key='';//保存请求的唯一key值

var  ads_fillcontent=function()
{
	var jsonobj = ads_getmencache();//获取数据
}


var ads_calladsid=function(functionid,adsid,divid)//js方法id,广告位id，前端div名称
{
	ads_argv_array.push(new Array(functionid,adsid,divid));
}


var key_calladsid=function(key)//单次请求的key
{
	ads_argv_key=key;
}


var ads_getmencache=function()
{
	
	
	for(var i=0;i<ads_argv_array.length;i++)
	{
		if(i==0)
		{
			ads_argv_str=ads_argv_array[i][1];
			ads_argv_complate_array='WEB_GONGYI_JSON_GONGYI_ADS_'+ads_argv_array[i][1]+'_v0';
		}
		else
		{
			ads_argv_str+=";"+ads_argv_array[i][1];
			ads_argv_complate_array+=';WEB_GONGYI_JSON_GONGYI_ADS_'+ads_argv_array[i][1]+'_v0';
		}
		
	}
	
	
	if(ads_argv_str)
	{
		 cacheurl='http://npoapp.gongyi.qq.com/ads/pos/get/'+ads_argv_str+'?t='+Math.random()+'&jsoncallback=?';
		 $.ajax({
		   type: "GET",
		   async :false,
		   url: cacheurl,
		   dataType:"jsonp" ,
		   success: function(data){
			   if(data.code !=0 ){
			   	alert(data.info);
				return;
			   } 
				var json = data.info;
				if(!json || json.ads_leghth<1)
				{
					debugTicket = 1;
					debugRefer = ads_argv_complate_array;
					return;
				}
				
				for(var j=0;j<json.ads_leghth;j++)
				{
					
					var adskey="ads_"+ads_argv_array[j][1];
				
					if(json[adskey].code==0)
					{
						var jsoninfo=json[adskey].info; 
						//alert(jsoninfo.info.length);
						var subfunctionname='ads_fillcontent_'+ads_argv_array[j][0];
						
						
						//alert(jsoninfo);
						switch(ads_argv_array[j][0])
						{
							case 1:
							ads_fillcontent_1(jsoninfo,ads_argv_array[j][2]);
							break;
							case 2:
							ads_fillcontent_2(jsoninfo,ads_argv_array[j][2]);
							break;	
							case 3:
							ads_fillcontent_3(jsoninfo,ads_argv_array[j][2]);
							break;
							case 4:
							ads_fillcontent_4(jsoninfo,ads_argv_array[j][2]);
							break;
							default:
							debugTicket = 1;
							debugRefer = ads_argv_complate_array;
							break;
						}
					}
					else
					{
						debugTicket = 1;
						debugRefer = ads_argv_complate_array;
						return;
					}
			   }
			},
		   error: function(){
				debugTicket = 1;
				debugRefer = ads_argv_complate_array;
			}
		 }); 		
		
	}
	else
	{
		debugTicket = 1;
		debugRefer = ads_argv_complate_array;
	}
}


//公益网合作-彩贝-推荐
var  ads_fillcontent_1=function(ads_return_obj,ads_argv_obj)
{
	var json=ads_return_obj;
	var divid=ads_argv_obj;

	var html='';
	
	for(var i=0;i<json.info.length;i++)
	{	

		json.info[i].indexurl=json.info[i].indexurl+'?attach=200.2212.00.114.02&ticket=20130123103514237454';

		html+='<div class="gy_hd_bg">';
		html+='<a  target="_blank" href="'+json.info[i].indexurl+'"><img   alt="'+json.info[i].title+'" src="'+json.info[i].img_826205+'" width="826px" height="205px"></a>';
		html+='</div>';

		html+='<div class="gy_hd_act">';
		html+='<div class="item_yuan">'+fedNum(formatNum(parseInt(json.info[i].progcnt.T_L_MONEY)+parseInt(json.info[i].progcnt.T_M_MONEY)))+'<span class="unit">元</span></div>';

		html+='<div class="item_ren">已有<strong>'+(parseInt(json.info[i].progcnt.T_L_PEOPLE)+parseInt(json.info[i].progcnt.T_M_PEOPLE))+'</strong>人参加</div>';

		html+='<div class="item_act"><a class="up_ico up_ico_gybtn" href="javascript:Global_OpenWindowsToDone('+json.info[i].progid+','+json.info[i].fundid+',\''+json.info[i].title+'\',\''+json.info[i].type+'\');void(0);"><span class="hidden">我要献爱心</span></a></div>';

		var title = "#月捐力量#每月10元，累积起来，就能让无数孤儿在阳光下温暖成长！我在@qqcaibei 看到了网助成长-e万行动农村孤儿助养计划[ http://gongyi.qq.com/loveplan/helponline ]，让更多贫困农村孤儿能顺利完成学业，让我们一起行动起来吧！小积分，大慈善，彩贝积分捐赠支持腾讯月捐，小付出，大力量！";
		var tlogo  = "http://t1.qlogo.cn/mbloghead/1586795ce2ff2a402f26/100";//如果需要图片就添加到url里的 pic="+encodeURIComponent(tlogo)+"
		var from   = encodeURIComponent('http://cb.qq.com/jifen/cash.html#8');
		var turl = "http://v.t.qq.com/share/share.php?title="+encodeURIComponent(title)+"&pic=&appkey=&site=&url="+from;


		html+='<div class="item_org"><strong>传递爱心力量：</strong><a target="_blank"  href="'+turl+'" style="cursor:pointer" id="Global_TblogUrlObj"><span class="up_ico up_ico_weibo"></span></a></div>';
		html+='</div>';

		//html+='<div class="gy_hd_intro"> <strong>简介：</strong>'+json.info[i].simpledesc+'</div>';

	}
	 html+='';
	$('#'+divid).html(html);
}

//公益网合作-彩贝-项目列表页
var  ads_fillcontent_2=function(ads_return_obj,ads_argv_obj)
{
	var json=ads_return_obj;
	var divid=ads_argv_obj;
	var html='<ul class="gy_bd_list">';						
	
	for(var i=0;i<json.info.length;i++)
	{

		json.info[i].indexurl=json.info[i].indexurl+'?attach=200.2212.00.114.02&ticket=20130123103514237454';
	
		html+='<li id='+json.info[i].progid+'>';
		html+='<div class="item_img"><a href="'+json.info[i].indexurl+'" target="_blank"><img alt="" width="188px" height="118px" src="'+json.info[i].img_188118+'"></a></div>';
		html+='<h3 class="item_name"><a href="'+json.info[i].indexurl+'" target="_blank">'+json.info[i].title+'</a></h3>';
		html+='<div class="item_org"><strong>执行机构：</strong><a  target="_blank" href="'+json.info[i].weibo+'">'+json.info[i].fundame+'</a></div>';
		html+='<div class="item_intro"><strong>简介：</strong>'+json.info[i].simpledesc+'</div>';
		html+='<div class="item_act"><a class="mod_btn mod_btn_gr2" href="javascript:Global_OpenWindowsToDone('+json.info[i].progid+','+json.info[i].fundid+',\''+json.info[i].title+'\',\''+json.info[i].type+'\');void(0);"><span class="mod_btn_bd">我要献爱心</span></a><span class="item_ren">本月<span style="color:#FF4E00">'+json.info[i].progcnt.THIS_M_PEOPLE+'</span>人捐款</span></div>';
		html+='</li>';

	}
	
	 html+='</ul>';

	$('#'+divid).html(html);

	changeprog(4);
}

//网站部-右侧公益咨询-推荐项目大图 http://gongyi.qq.com/a/20130320/000003.htm
var  ads_fillcontent_3=function(ads_return_obj,ads_argv_obj)
{
	var json=ads_return_obj;
	var divid=ads_argv_obj;
	var html='';

	for(var i=0;i<json.info.length;i++)
	{
		json.info[i].indexurl=json.info[i].indexurl+'?ticket=20130320175942347064';
	
		html+='<a href="'+json.info[i].indexurl+'" target="_blank"><img src="'+json.info[i].img_300150+'" width="300" height="150" alt="我也来献爱心" /></a>';
		html+='<p class="line">'+json.info[i].simpledesc2+'</p>';
		html+='<p class="color"><a href="'+json.info[i].indexurl+'" class="kt_but r" target="_blank">开通月捐</a><span>本月<strong>'+json.info[i].progcnt.THIS_M_PEOPLE+'</strong>人支持</span></p>';
		html+='<h4></h4><a href="'+json.info[i].indexurl+'" class="h4text" target="_blank">'+json.info[i].title+'</a>';
	}
	
	$('#'+divid).html(html);
}


//网站部-右侧公益咨询-推荐项目小图 http://gongyi.qq.com/a/20130320/000003.htm
var  ads_fillcontent_4=function(ads_return_obj,ads_argv_obj)
{
	var json=ads_return_obj;
	var divid=ads_argv_obj;
	var html='<ul class="ulb">';

	for(var i=0;i<json.info.length;i++)
	{
		json.info[i].indexurl=json.info[i].indexurl+'?ticket=20130320175942347064';
		html+='<li><a href="'+json.info[i].indexurl+'" target="_blank"><img src="'+json.info[i].img_10085+'" width="100" height="85" alt="'+json.info[i].title+'"/></a>';
		html+='<div class="text"><h4><a href="'+json.info[i].indexurl+'" target="_blank"><strong>'+json.info[i].title_13+'</strong></a></h4><p>'+json.info[i].simpledesc2+'</p><a href="'+json.info[i].indexurl+'" class="kt_but" target="_blank">开通月捐</a></div></li>';
	}
	html+='</ul>';

	$('#'+divid).html(html);
}



/*  |xGv00|b0fc74f575dc907fffa89d33d94ac487 */