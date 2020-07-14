/***ip定向保存空间**/
var citys = {};
citys.cityID = '',
citys.ipUrl = "//fw.qq.com/ipaddress";
citys.exist = false;
citys.list = [
	{
		name:"北京",
		cn:"beijing",
		cityId:54
	},{
		name:"沈阳",
		cn:"shenyang",
		cityId:262
	},{
		name:"南京",
		cn:"nanjing",
		cityId:220
	},{
		name:"杭州",
		cn:"hangzhou",
		cityId:395
	},{
		name:"上海",
		cn:"shanghai",
		cityId:321
	},{
		name:"福州",
		cn:"fuzhou",
		cityId:56
	},{
		name:"广州",
		cn:"guangzhou",
		cityId:68
	},{
		name:"武汉",
		cn:"wuhan",
		cityId:173
	},{
		name:"长沙",
		cn:"changsha",
		cityId:179
	},{
		name:"成都",
		cn:"chengdu",
		cityId:302
	},{
		name:"重庆",
		cn:"chongqing",
		cityId:55
	},{
		name:"西安",
		cn:"xian",
		cityId:296
	},{
		name:"郑州",
		cn:"zhengzhou",
		cityId:161
	},{
		name:"济南",
		cn:"jinan",
		cityId:337
	},
	{
		name:"大连",
		cn:"dalian",
		cityId:254
	},
	{
		name:"东莞",
		cn:"dongguan",
		cityId:66
	},
	{
		name:"佛山",
		cn:"foshan",
		cityId:67
	},
	{
		name:"合肥",
		cn:"hefei",
		cityId:46
	},
	{
		name:"昆明",
		cn:"kunming",
		cityId:385
	},
	{
		name:"南昌",
		cn:"nanchang",
		cityId:235
	},
	{
		name:"青岛",
		cn:"qingdao",
		cityId:342
	},
	{
		name:"深圳",
		cn:"shenzhen",
		cityId:78
	},
	{
		name:"石家庄",
		cn:"shijiazhuang",
		cityId:200
	},
	{
		name:"太原",
		cn:"taiyuan",
		cityId:328
	},
	{
		name:"厦门",
		cn:"xiamen",
		cityId:63
	},
	{
		name:"贵阳",
		cn:"guiyang",
		cityId:102
	},
	{
		name:"宁波",
		cn:"ningbo",
		cityId:400
	},
	{
		name:"中山",
		cn:"zhongshan",
		cityId:82
	},
	{
		name:"珠海",
		cn:"zhuhai",
		cityId:85
	},
	{
		name:"湛江",
		cn:"zhanjiang",
		cityId:84
	},
	{
		name:"江门",
		cn:"jiangmen",
		cityId:72
	},
	{
		name:"惠州",
		cn:"huizhou",
		cityId:69
	},
	{
		name:"宜昌",
		cn:"yichang",
		cityId:178
	},
	{
		name:"南宁",
		cn:"nanning",
		cityId:96
	},
	{
		name:"金华",
		cn:"jinhua",
		cityId:398
	},
	{
		name:"湖州",
		cn:"huzhou",
		cityId:396
	},
	{
		name:"温州",
		cn:"wenzhou",
		cityId:404
	},
	{
		name:"嘉兴",
		cn:"jiaxing",
		cityId:397
	},
	{
		name:"绍兴",
		cn:"shaoxing",
		cityId:402
	},
	{
		name:"台州",
		cn:"taizhou",
		cityId:403
	},
	{
		name:"保定",
		cn:"baoding",
		cityId:193
	},
	{
		name:"邢台",
		cn:"xingtai",
		cityId:202
	},
	{
		name:"泸州",
		cn:"luzhou",
		cityId:310
	},
	{
		name:"秦皇岛",
		cn:"qinhuangdao",
		cityId:199
	},
	{
		name:"孝感",
		cn:"xiaogan",
		cityId:175
	},
	{
		name:"唐山",
		cn:"tangshan",
		cityId:201
	},
	{
		name:"绵阳",
		cn:"mianyang",
		cityId:312
	},
	{
		name:"茂名",
		cn:"maoming",
		cityId:73
	},
	{
		name:"阳江",
		cn:"yangjiang",
		cityId:80
	},
	{
		name:"南通",
		cn:"nantong",
		cityId:221
	},
	{
		name:"苏州",
		cn:"suzhou",
		cityId:222
	},
	{
		name:"徐州",
		cn:"xuzhou",
		cityId:226
	},
	{
		name:"无锡",
		cn:"wuxi",
		cityId:225
	},
	{
		name:"常州",
		cn:"changzhou",
		cityId:217
	},
	{
		name:"镇江",
		cn:"zhenjiang",
		cityId:229
	},
	{
		name:"天津",
		cn:"tianjin",
		cityId:350
	},
	{
		name:"衡水",
		cn:"hengshui",
		cityId:196
	},
	{
		name:"十堰",
		cn:"shiyan",
		cityId:169
	},
	{
		name:"沧州",
		cn:"cangzhou",
		cityId:195
	},
	{
		name:"盐城",
		cn:"yancheng",
		cityId:227
	},
	{
		name:"邯郸",
		cn:"handan",
		cityId:197
	},
	{
		name:"泉州",
		cn:"quanzhou",
		cityId:61
	},
	{
		name:"南充",
		cn:"nanchong",
		cityId:313
	},
	{
		name:"淮安",
		cn:"huaian",
		cityId:218
	},
	{
		name:"扬州",
		cn:"yangzhou",
		cityId:228
	},
	{
		name:"泰州",
		cn:"tz",
		cityId:224
	},
	{
		name:"蚌埠",
		cn:"bengbu",
		cityId:38
	},
	{
		name:"芜湖",
		cn:"wuhu",
		cityId:51
	},
	{
		name:"南阳",
		cn:"nanyang",
		cityId:151
	},
	{
		name:"衡阳",
		cn:"hengyang",
		cityId:183
	},
	{
		name:"承德",
		cn:"chengde",
		cityId:194
	},
	{
		name:"黄山",
		cn:"huangshan",
		cityId:453
	},
	{
		name:"大理",
		cn:"dali",
		cityId:381
	},
	{
		name:"岳阳",
		cn:"yueyang",
		cityId:1474
	},
	{
		name:"曲靖",
		cn:"qujing",
		cityId:390
	},
	{
		name:"洛阳",
		cn:"luoyang",
		cityId:149
	},
	{
		name:"济南",
		cn:"jinan",
		cityId:337
	},
	{
		name:"兰州",
		cn:"lanzhou",
		cityId:115
	},
	{
		name:"海口",
		cn:"haikou",
		cityId:130
	},
	{
		name:"乌鲁木齐",
		cn:"wlmq",
		cityId:369
	},
	{
		name:"济宁",
		cn:"jining",
		cityId:338
	},
	{
		name:"襄阳",
		cn:"xiangyang",
		cityId:174
	},
	{
		name:"淄博",
		cn:"zibo",
		cityId:349
	},
	{
		name:"潍坊",
		cn:"weifang",
		cityId:346
	},
	{
		name:"淮北",
		cn:"huaibei",
		cityId:44
	},
	{
		name:"菏泽",
		cn:"heze",
		cityId:336
	},
	{
		name:"咸宁",
		cn:"xianning",
		cityId:176
	},
	{
		name:"韶关",
		cn:"shaoguan",
		cityId:77
	},
	{
		name:"西宁",
		cn:"xining",
		cityId:288
	},
	{
		name:"临沂",
		cn:"linyi",
		cityId:341
	},
	{
		name:"阜阳",
		cn:"fuyang",
		cityId:42
	},
	{
		name:"伊宁",
		cn:"yining",
		cityId:369
	},
	{
		name:"马鞍山",
		cn:"mas",
		cityId:48
	},{
		name:"哈尔滨",
		cn:"haerbin",
		cityId:208
	},{
		name:"吉林",
		cn:"jilin",
		cityId:244
	},{
		name:"德州",
		cn:"dezhou",
		cityId:334
	},{
		name:"烟台",
		cn:"yantai",
		cityId:347
	},{
		name:"长春",
		cn:"changchun",
		cityId:243
	},{
		name:"安庆",
		cn:"anqing",
		cityId:36
	},{
		name:"哈密",
		cn:"hami",
		cityId:359
	},{
		name:"宣城",
		cn:"xuancheng",
		cityId:52
	},{
		name:"宜宾",
		cn:"yibin",
		cityId:318
	},{
		name:"泰安",
		cn:"taian",
		cityId:344
	},{
		name:"聊城",
		cn:"liaocheng",
		cityId:340
	},{
		name:"临沂",
		cn:"linyi",
		cityId:341
	},{
		name:"泰州",
		cn:"tz",
		cityId:224
	},{
		name:"湘潭",
		cn:"xiangtan",
		cityId:186
	},{
		name:"内江",
		cn:"neijiang",
		cityId:314
	},{
		name:"德阳",
		cn:"deyang",
		cityId:304
	},{
		name:"乐山",
		cn:"leshan",
		cityId:308
	},{
		name:"松原",
		cn:"songyuan",
		cityId:246
	},{
		name:"四平",
		cn:"siping",
		cityId:247
	},{
		name:"延边",
		cn:"yanji",
		cityId:249
	},{
		name:"赣州",
		cn:"ganzhou",
		cityId:231
	},{
		name:"运城",
		cn:"yuncheng",
		cityId:331
	},{
		name:"珠海",
		cn:"zhuhai",
		cityId:85
	},{
		name:"资阳",
		cn:"ziyang",
		cityId:319
	},{
		name:"广安",
		cn:"guangan",
		cityId:306
	},{
		name:"六安",
		cn:"luan",
		cityId:47
	},{
		name:"连云港",
		cn:"lyg",
		cityId:219
	},{
		name:"肇庆",
		cn:"zhaoqing",
		cityId:83
	},{
		name:"周口",
		cn:"zhoukou",
		cityId:159
	},{
		name:"百色",
		cn:"baise",
		cityId:87
	},{
		name:"梧州",
		cn:"wuzhou",
		cityId:98
	},{
		name:"郴州",
		cn:"chenzhou",
		cityId:181
	},{
		name:"承德",
		cn:"chengde",
		cityId:194
	},{
		name:"张家口",
		cn:"zjk",
		cityId:203
	},{
		name:"廊坊",
		cn:"langfang",
		cityId:198
	},{
		name:"保定",
		cn:"baoding",
		cityId:193
	},{
		name:"镇江",
		cn:"zhenjiang",
		cityId:229
	},{
		name:"大同",
		cn:"datong",
		cityId:322
	},{
		name:"银川",
		cn:"yinchuan",
		cityId:280
	},{
		name:"呼和浩特",
		cn:"huhehaote",
		cityId:270
	},{
		name:"平顶山",
		cn:"pingdingshan",
		cityId:153
	},{
		name:"海口",
		cn:"haikou",
		cityId:130
	}
];
citys.curCity = {
	name:'全国',
	cn:''
};

//获取接口链接
citys.getUrl = function(key,area,id){
	var add ={
        'hq':'//' + area +'.auto.qq.com/15index/15foc/hangqing.htm',
        'jj':'//wecar.qq.com/api/lowprice/hotLowPriceSerial?cityid=' + id + '&pagesize=5&format=jsonp',
        'hqall':'//auto.qq.com/15index/15foc/hangqing.htm',
        'all':'//wecar.qq.com/api/AutoHomePage/getInfos?city_id=' + id + '&format=jsonp'
    };
    return add[key];
};
//获取行情数据
citys.gethqpage = function(_url){
	$.ajax({
	  	type: 'get',
	  	url:_url,
	  	dataType:'html',
	  	scriptCharset:'gb2312',
	  	success:function(data){
	  		//console.log(data)
	  	}
	});
};
//获取降价数据
citys.getjjpage = function(_url){
	$.ajax({
	  	type: 'GET',
	  	url:_url,
	  	dataType:'jsonp',
	  	success:function(data){
	  		var tpl = '',_data = data.data,remainDay=0,d,seconds=0;
	  		tpl += '<table><thead><tr><th class="fst">降价车系</th><th>降价幅度</th><th>价格</th><th class="lst">活动时间</th></tr></thead><tbody>';
	  		if(_data.length > 5){
				_data.length =5;
			}
			for(var i = 0; i < _data.length; i++){
	  			/*d = new Date();
				seconds = Math.floor(d.getTime()/1000);
	  			remainDay = Math.floor((_data[i].send_time - seconds)/86400);
	  			if(remainDay<0){
	  				remainDay = 0;
	  			}*/
	  			tpl += '<tr><td class="tl"><a href="//auto.qq.com/jiangjia.htm?brandid=' + _data[i].sbrand_id + '&serialid=' + _data[i].sserial_id + '&cityid=' + _data[i].scity_id + '&pgv_ref=article';
		  		tpl += '" target="_blank">'+ _data[i].FName +'</a></td>';
				tpl += '<td class="tc">' + _data[i].sdiscount_amount + '万<em class="share10-downbg"></em></td>';
				tpl += '<td class="tc">' + _data[i].sdiscount_price + '万</td>';
				tpl += '<td class="tr">' + _data[i].left_day + '天<td></tr>';
			}
			tpl += '</tbody></table>';
			$('#discount_price').html(tpl);
	  	}
	});
};
//获取报价数据
citys.getbjpage = function(cityId) {
	var _url = '//wecar.qq.com/api/recomm/index?num=7&site=dwhome&provinceid=' + cityId + '?callback=call';
	var form = util.createPostContainer_flag(_url,function(_data){
		var list = _data.data;
		//console.log(list);
		var priceRangeMap = ['8万以内','8-12万','12-18万','18-25万','25-45万','45万以上'];
		var thead = '<thead><tr><th><a href="javascript:void(0);">车系</a></th><th><a href="javascript:void(0);">车型</a></th><th><a href="javascript:void(0);">经销商报价</a></th><th><a href="javascript:void(0);">指导价</a></th><th><a href="javascript:void(0);">经销商</a></th></tr></thead>';
		var tpl = '';
		for(var k = 0; k< 6; k++){
			tpl += '<table summary="' + priceRangeMap[k] + '" style="display:';
			if(k == 0){
				tpl += 'table';
			}else{
				tpl += 'none';
			}
			tpl += '">'+ thead +'<tbody>';
			for(var j = 0; j< list[k].length; j++){
				if( j%2 == 0 ){
					tpl += '<tr class="altRow">';
				}else{
					tpl += '<tr>';
				}
				tpl += '<td><a href="' + list[k][j].model_url + '" target="_blank">' + list[k][j].serial_name  + '</a></td>';
				tpl += '<td><a href="' + list[k][j].model_url + '" target="_blank">' + list[k][j].model_name  + '</a></td>';
				tpl += '<td class="r"><strong><a href="' + list[k][j].model_url + '" target="_blank">' + list[k][j].shop_price  + '万</a></strong></td>';
				tpl += '<td class="r2"><span>' + list[k][j].guide_price  + '万</span></td>';
				tpl += '<td><a href="' + list[k][j].dealer_url + '" target="_blank">' + list[k][j].dealer_name  + '</a></td>';
				tpl += '<td class="r"><a href="' +list[k][j].model_url+ '" class="ask" target="_blank">询价</a>';
				tpl += '<a class="drive" href="' +list[k][j].model_url+ '#drive" target="_blank">试驾</a></td>';
				tpl += '</tr>';
			}
			tpl += '</tbody></table>'
		}
		$(".areaprice .bd .priceCon").html(tpl);
	},'','','bj');
	form.submit();
};
//IP地址定位
function fixPosition(){
	$.ajax({
		type:'GET',
		url:citys.ipUrl,
		scriptCharset:'gb2312',
		dataType:'script',
		success:function(){
			//console.log(IPData);
			var tem = IPData,add = '',href ='',area ='',cityId = '0',cn = '';
			if( $.trim(tem[3]).length == 0 ){
				add = ($.trim(tem[2])).replace(/市|区|省/,"");
			}else{
				add = ($.trim(tem[3])).replace(/市|区|省/,"");
			}
			for(var i = 0; i<citys.list.length ;i++){
				if(citys.list[i].name == add){
					area = citys.list[i].cn;
					cityId = citys.list[i].cityId;
					cn = citys.list.cn;
				}
			}
			//襄樊改名襄阳
			if((IPData[2].split("省")[0] == '湖北') && (IPData[3].split("市")[0] == '襄樊')){
				area = "xiangyang";
				add = "襄阳";
				cn = "xiangyang";
				cityId = 174;
			}
			//定位为大理州修复
			if((IPData[2].split("省")[0] == '云南') && (IPData[3].split("州")[0] == '大理')){
				area = "dali";
				add = "大理";
				cn = "dali";
				cityId = 381;
			}
			//泉州定位是泉市
			if((IPData[2].split("省")[0] == '福建') && (IPData[3].split("市")[0] == '泉')){
				area = "quanzhou";
				add = "泉州";
				cn = "quanzhou";
				cityId = 61;
			}

			//泉州定位是泉市
			if((IPData[2].split("省")[0] == '新疆') && (IPData[3].split("地区")[0] == '哈密')){
				area = "hami";
				add = "哈密";
				cn = "hami";
				cityId = 359;
			}
			
			//延边定位是延边州
			if((IPData[2].split("省")[0] == '吉林') && (IPData[3].split("州")[0] == '延边')){
				area = "yanji";
				add = "延边";
				cn = "yanji";
				cityId = 249;
			}
			
			citys.getIpInfo(citys.getUrl('all','',cityId),cn);
			href = '//' + area +'.auto.qq.com/';
			$('#position').html(add).parent().attr('href',href);
			if( !!area.length){
				//拉取对应城市的行情、降价、报价信息
				$("#cityHQ").html(add);
				$("#cityJJ").html(add);
				$("#cityBJ").html(add);
				citys.getbjpage(cityId);
				citys.getjjpage(citys.getUrl('jj','',cityId));
			//	citys.getEscMore(cityId);//2017.11.30 超值二手车栏目更多链接
			}else{
				//拉取北京站的信息
			}
		}
	});
};
fixPosition();
citys.getIpInfo =  function(_url){
	var hangqing = '',hangqingTemp='',shangjia = '',shangjiaTemp = '',chengxin = '',chengxinTemp1 = '',chengxinTemp2 = '',tips = '',tipsHead = '',tipsTemp1 = '',tipsTemp2 = '',tipsTemp3 = '',areaUrl = "//beijing.auto.qq.com/";
	$.ajax({
		type: 'GET',
		url:_url,
		dataType:'jsonp',
		jsonp:'callback',
		success:function(data){
			//console.log(data.data);
			hangqing = data.data[1]['gedi_hangqing'];
			hangqingTemp += '<h2><a target="_blank" href="' + data.data[1]['gedi_hangqing'][0].url;
			hangqingTemp += '">' + data.data[1]['gedi_hangqing'][0].title + '</a> <a target="_blank" href="'+ data.data[1]['gedi_hangqing'][1].url;
			hangqingTemp += '">' + data.data[1]['gedi_hangqing'][1].title + '</a></h2><ul>';
			hangqingTemp += '<li><a href="' + data.data[1]['gedi_hangqing'][2].url + '" target="_blank">' + data.data[1]['gedi_hangqing'][2].title + '</a>| ';
			hangqingTemp += '<a href="' + data.data[1]['gedi_hangqing'][3].url + '" target="_blank">' + data.data[1]['gedi_hangqing'][3].title + '</a></li>';
			hangqingTemp += '<li><a href="' + data.data[1]['gedi_hangqing'][4].url + '" target="_blank">' + data.data[1]['gedi_hangqing'][4].title + '</a>| ';
			hangqingTemp += '<a href="' + data.data[1]['gedi_hangqing'][5].url + '" target="_blank">' + data.data[1]['gedi_hangqing'][5].title + '</a></li>';
			hangqingTemp += '<li><a href="' + data.data[1]['gedi_hangqing'][6].url + '" target="_blank">' + data.data[1]['gedi_hangqing'][6].title + '</a>| ';
			hangqingTemp += '<a href="' + data.data[1]['gedi_hangqing'][7].url + '" target="_blank">' + data.data[1]['gedi_hangqing'][7].title + '</a></li>';
			hangqingTemp += '<li><a href="' + data.data[1]['gedi_hangqing'][8].url + '" target="_blank">' + data.data[1]['gedi_hangqing'][8].title + '</a>| ' ;
			hangqingTemp += '<a href="' + data.data[1]['gedi_hangqing'][9].url + '" target="_blank">' + data.data[1]['gedi_hangqing'][9].title + '</a></li>';
			hangqingTemp += '<li><a href="' + data.data[1]['gedi_hangqing'][10].url + '" target="_blank">' + data.data[1]['gedi_hangqing'][10].title + '</a>| ';
			hangqingTemp += '<a href="' + data.data[1]['gedi_hangqing'][11].url + '" target="_blank">' + data.data[1]['gedi_hangqing'][11].title + '</a></li>';
			hangqingTemp + '</ul>';
			$("#hqInfo").html(hangqingTemp);
			shangjia = data.data[2]['shangjia_cuxiao'];
            //console.log(shangjia);
			for(var i = 0 ; i <= 4 ; i++){
				shangjiaTemp += '<li><a target="_blank" href="' + data.data[2]['shangjia_cuxiao'][i].url + '">' + data.data[2]['shangjia_cuxiao'][i].title + '</a></li>';
			}
			$("#cuxiao").html(shangjiaTemp);
			chengxin = data.data[3]['chengxin_dealer'];
			//console.log(chengxin);
			for(var m = 0 ; m <= 6 ; m++ ){
				chengxinTemp1 += '<li><div class="con"><div class="con-nr"><img src="' + data.data[3]['chengxin_dealer'][m].brand_url + '"> <p class="s4name">' + data.data[3]['chengxin_dealer'][m].dealer_name + '</p><p class="s4tel"><span>[电话]</span>' + data.data[3]['chengxin_dealer'][m].phone + '</p><a href="' + data.data[3]['chengxin_dealer'][m].consult_url + '" class="s4contact" target="_blank">在线咨询</a></div><div class="ewm"><img src="' + data.data[3]['chengxin_dealer'][m].qrcode_url + '"><p>微信扫描加关注</p></div></div><div class="ewmtip share10-ewmtipbg"></div></li>'
			}
			$("#dealer1").html(chengxinTemp1);
			$("#dealer1 li").last().addClass('last');
			for(var n = 7 ; n <= 13 ; n++ ){
				chengxinTemp2 += '<li><div class="con"><div class="con-nr"><img src="' + data.data[3]['chengxin_dealer'][n].brand_url + '"> <p class="s4name">' + data.data[3]['chengxin_dealer'][n].dealer_name + '</p><p class="s4tel"><span>[电话]</span>' + data.data[3]['chengxin_dealer'][n].phone + '</p><a href="' + data.data[3]['chengxin_dealer'][n].consult_url + '" class="s4contact" target="_blank">在线咨询</a></div><div class="ewm"><img src="' + data.data[3]['chengxin_dealer'][n].qrcode_url + '"><p>微信扫描加关注</p></div></div><div class="ewmtip share10-ewmtipbg"></div></li>'
			}
			$("#dealer2").html(chengxinTemp2);
			$("#dealer2 li").last().addClass('last');
			/****诚信经销商交互js****/
			$(".cxjxs .bd ul li .con-nr").hover(function(){
				$(this).find(".s4contact").css({"display":"block"});
				$(this).css({"border-style":"solid","border-width":"1px","border-color":"#9cb5d8"});
				$($(this).siblings()).hide();
				$(this).parent().siblings().show();
			},function(){
				$(this).find(".s4contact").css({"display":"none"});
				$(this).css({"border":"none"});
				$(this).parent().siblings().hide();
			});

			$(".cxjxs .bd ul li .ewmtip").hover(function(){
				$(this).parent().find(".ewm").show();
				$(this).hide();
			});
			$(".cxjxs .bd ul li .con .ewm").hover(function(){},function(){
				$(this).siblings().show();
				$(this).hide();
			});
			tips = data.data[4];
            tipsHead += '<a href="javascript:void(0);" style="text-decoration:none;">' + data.data[4].tips_city[0].title + '优惠</a><a href="' + data.data[4].tips_city[0].url + '" target="_blank">[进入' + data.data[4].tips_city[0].title + '站]</a>';
			tipsTemp1 = '<li><a href="' + data.data[4].tips_pic[0].url + '" target="_blank"><img width="110" height="75" src="' + data.data[4].tips_pic[0].img_url + '" alt=""><p>' + data.data[4].tips_pic[0].title + '</p></a></li>';
			tipsTemp2 = '<a href="' + data.data[4].tips_txt[0].url + '" target="_blank" title="' + data.data[4].tips_txt[0].title + '">' + data.data[4].tips_txt[0].title + '</a>'
			tipsTemp3 += '<li><a href="' + data.data[4].tips_txt[1].url + '" target="_blank" title="' + data.data[4].tips_txt[1].title + '">' + data.data[4].tips_txt[1].title + '</a> | <a href="' + data.data[4].tips_txt[2].url + '" target="_blank" title="' + data.data[4].tips_txt[2].title + '">' + data.data[4].tips_txt[2].title + '</a></li>';
			tipsTemp3 += '<li><a href="' + data.data[4].tips_txt[3].url + '" target="_blank" title="' + data.data[4].tips_txt[3].title + '">' + data.data[4].tips_txt[3].title + '</a> | <a href="' + data.data[4].tips_txt[4].url + '" target="_blank" title="' + data.data[4].tips_txt[4].title + '">' + data.data[4].tips_txt[4].title + '</a></li>';
			tipsTemp3 += '<li><a href="' + data.data[4].tips_txt[5].url + '" target="_blank" title="' + data.data[4].tips_txt[5].title + '">' + data.data[4].tips_txt[5].title + '</a> | <a href="' + data.data[4].tips_txt[6].url + '" target="_blank" title="' + data.data[4].tips_txt[6].title + '">' + data.data[4].tips_txt[6].title + '</a></li>';
			tipsTemp3 += '<li><a href="' + data.data[4].tips_txt[7].url + '" target="_blank" title="' + data.data[4].tips_txt[7].title + '">' + data.data[4].tips_txt[7].title + '</a> | <a href="' + data.data[4].tips_txt[8].url + '" target="_blank" title="' + data.data[4].tips_txt[8].title + '">' + data.data[4].tips_txt[8].title + '</a></li>';
			$("#tipsBD .picTxt").html(tipsTemp1);
			$("#tipsTitle").html(tipsTemp2);
			$("#tipslist").html(tipsTemp3);
			$("#tipsHead").html(tipsHead);
			//$('#tips').show();
		}
	});
};




citys.getESCInfo = function(cityId){
	$.ajax({
	  url:"//ucar.qq.com/js/recommendlist?cityid=" + cityId + "&format=jsonp&callback=",
	  dataType: "jsonp",
	  callback: 'callback',
	  success:function(data){
		  var temp = data.data.todayRecmd,todayRecmdArr= [] ;
		  var DATA= {
			todayRecmdArr:[]
		  };
		  for(var i in temp){
			todayRecmdArr.push(temp[i]);
		  }
		  for(var j=0;j <todayRecmdArr.length;j++){
			todayRecmdArr[j].licensedDate = todayRecmdArr[j].licensedDate.split('-')[0];
		  }
		  DATA.todayRecmdArr = todayRecmdArr;
		  //var html = template("czescTpl",DATA);
		  //$("#czesc").html(html);
	  }
	});
}

//citys.getESCInfo(54);

//2017.11.30 超值二手车栏目更多链接
citys.getEscMore = function(cityId){
	////ucar.qq.com/js/recommendlist?cityid=54&format=jsonp&callback=&callback=jQuery190022042583131765658_1512030253007&_=1512030253008(对接edyang)
	$.ajax({
	  url : '//ucar.qq.com/js/recommendlist',
	  data : {
		cityid : cityId,
		format : 'jsonp'
	  },
	  dataType : 'jsonp',
	  success : function(res) {
		if(res.info == 'ok'){
			if(typeof(res.data.moreUrl) != 'undefined'){
				$(".czesc .bh .more a").attr("href",res.data.moreUrl);
			}
		}
	  }
	});
}


$("#hotcity_hq a,#tabb_hq a,#hotcity_jj a,#tabb_jj a,#hotcity_bj a,#tabb_bj a").on('click',function(){
	var name = $(this).text(),cityId ='',cn='';
	for(var i in citys.list){
		if(citys.list[i].name == name ){
			cityId = citys.list[i].cityId;
			cn = citys.list[i].cn;
			citys.getIpInfo(citys.getUrl('all','',cityId),cn);
			citys.getjjpage(citys.getUrl('jj','',cityId));
			citys.getbjpage(cityId);
		//	citys.getESCInfo(cityId);
		//	citys.getEscMore(cityId);//2017.11.30 超值二手车栏目更多链接
			break;
		}
	}
	changeCityName(name,cn);
});
function changeCityName(name,cn){
	var href = '//' + cn +'.auto.qq.com/';
	$('#position').html(name).parent().attr('href',href);
	$('#cityHQ').html(name);
	$('#cityJJ').html(name);
	$('#cityBJ').html(name);
}

/*  |xGv00|b65f695afafcc7ed205ed282fce5bca8 */