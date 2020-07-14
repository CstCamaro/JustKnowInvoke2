var citys = {};
citys.ipUrl = "//fw.qq.com/ipaddress";
citys.list=[
	{
		name:"深圳",
		cn:"sz"
	},
	{
		name:"东莞",
		cn:"dg"
	},
	{
		name:"惠州",
		cn:"hz"
	},
	{
		name:"珠海",
		cn:"zh"
	},
	{
		name:"中山",
		cn:"zs"
	},
	{
		name:"江门",
		cn:"jm"
	},
	{
		name:"湛江",
		cn:"zj"
	},
	{
		name:"佛山",
		cn:"fs"
	},
	{
		name:"河源",
		cn:"hy"
	},
	{
		name:"清远",
		cn:"qy"	
	},
	{
		name:"汕头",
		cn:"st"
	},
	{
		name:"澳门",
		cn:"macau"
	},
	{
		name:"香港",
		cn:"hk"
	},
	{
		name:"肇庆",
		cn:"zq"
	},
	{
		name:"阳江",
		cn:"yangjiang"
	},
	{
		name:"茂名",
		cn:"maoming"
	},
	{
		name:"梅州",
		cn:"meizhou"
	},
	{
		name:"汕尾",
		cn:"shanwei"
	},
	{
		name:"韶关",
		cn:"shaoguan"
	},
	{
		name:"揭阳",
		cn:"jieyang"
	},
	{
		name:"广西",
		cn:"gx"
	},
	{
		name:"江西",
		cn:"jx"
	}
]
function ipPosition(){
	var isIpSign = window.location.href.indexOf("?from=city");
	if(isIpSign==-1){
		$.ajax({ 
			url:citys.ipUrl,
			method: "get",
			scriptCharset:'gb2312',
			dataType: "script",
			success: function() {
				var iPData = IPData;
				var area='',
					href=''
					cityname = '';
                                if( $.trim(iPData[2]) == '广西' ||  $.trim(iPData[2]) == '江西省'){
					cityname = ($.trim(iPData[2])).replace(/市|区|省/,"");
				}else if( $.trim(iPData[3]).length == 0 ){
					cityname = ($.trim(iPData[2])).replace(/市|区|省/,"");
				}else{
					cityname = ($.trim(iPData[3])).replace(/市|区|省/,"");
				}
				for(var i = 0; i<citys.list.length;i++){
					if(citys.list[i].name == cityname || cityname.indexOf(citys.list[i].name)>-1){
						area = citys.list[i].cn;
					}
				}
				if(area!=""){
					href = "http://gd.qq.com/"+area;
					window.location.href = href;
				}
				
			}
	    });	
	}
}
ipPosition();/*  |xGv00|36f7d11b75d0486cc27f889f2d6a5e0f */