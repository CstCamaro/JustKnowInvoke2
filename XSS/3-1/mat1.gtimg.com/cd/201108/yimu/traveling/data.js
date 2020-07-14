/**
 * @fileOverview 存放和处理旅游平台常用的，但变化不频繁的数据
 * @author <a href="mailto:arthurlin@tencent.com">arthurlin</a>, <a
 *         href="mailto:cargepeng@tencent.com">cargepeng</a>
 * @version 1.0.1
 * 
 * @createDate 2010.07.23
 * @updaeDate 2011.04.06
 */

var Xiake = Xiake || {};

Xiake.Data = (function() {
	// 航空公司列表, 二字码为key, 数组[名称]
	var _airlineCompanyList = {
		"2Z" : [ "长安航空" ],
		"3Q" : [ "云南航空" ],
		"3U" : [ "四川航空" ],
		"3W" : [ "南京航空" ],
		"6U" : [ "乌克兰航空" ],
		"8C" : [ "东星航空" ],
		"8L" : [ "云南祥鹏航空" ],
		"AA" : [ "美国航空" ],
		"AC" : [ "加拿大航空" ],
		"AF" : [ "法国航空" ],
		"AI" : [ "印度航空" ],
		"AY" : [ "芬兰航空" ],
		"AZ" : [ "意大利航空" ],
		"BA" : [ "英国航空" ],
		"BI" : [ "汶莱航空" ],
		"BK" : [ "奥凯航空" ],
		"BR" : [ "长荣航空" ],
		"CA" : [ "中国国航" ],
		"CI" : [ "中华航空" ],
		"CJ" : [ "北方航空" ],
		"CN" : [ "大新华航空" ],
		"CO" : [ "大陆航空" ],
		"CX" : [ "国泰航空" ],
		"CZ" : [ "南方航空" ],
		"DL" : [ "三角航空" ],
		"EK" : [ "阿联酋航空" ],
		"ET" : [ "埃塞阿比亚航空" ],
		"EU" : [ "成都航空" ],
		"F6" : [ "浙江航空" ],
		"FI" : [ "冰岛航空" ],
		"FM" : [ "上海航空" ],
		"G4" : [ "贵州航空" ],
		"G8" : [ "长城航空" ],
		"GA" : [ "嘉鲁达印度尼西亚航空" ],
		"GE" : [ "台湾复兴航空" ],
		"GF" : [ "海湾航空" ],
		"GS" : [ "天津航空" ],
		"HO" : [ "吉祥航空" ],
		"HU" : [ "海南航空" ],
		"IB" : [ "西班牙航空" ],
		"IV" : [ "福建航空" ],
		"JD" : [ "首都航空" ],
		"JL" : [ "日本航空" ],
		"JS" : [ "朝鲜航空" ],
		"KA" : [ "港龙航空" ],
		"KE" : [ "大韩航空" ],
		"KL" : [ "荷兰航空" ],
		"KN" : [ "联合航空" ],
		"KU" : [ "科威特航空" ],
		"KY" : [ "昆明航空" ],
		"LH" : [ "汉莎航空" ],
		"LO" : [ "波兰航空" ],
		"LY" : [ "以色列航空" ],
		"MA" : [ "匈牙利航空" ],
		"MF" : [ "厦门航空" ],
		"MH" : [ "马来西亚航空" ],
		"MS" : [ "埃及航空" ],
		"MU" : [ "东方航空" ],
		"NH" : [ "全日空航空" ],
		"NW" : [ "美国西北航空" ],
		"NZ" : [ "新西兰航空" ],
		"OA" : [ "希腊奥林匹克航空" ],
		"OM" : [ "蒙古航空" ],
		"OS" : [ "奥地利航空" ],
		"OZ" : [ "韩亚航空" ],
		"PK" : [ "巴基斯坦航空" ],
		"PN" : [ "西部航空" ],
		"PR" : [ "菲律宾航空" ],
		"QF" : [ "澳洲航空" ],
		"QR" : [ "卡塔尔航空" ],
		"RG" : [ "巴西航空" ],
		"SA" : [ "南非航空" ],
		"SC" : [ "山东航空" ],
		"SK" : [ "北欧航空" ],
		"SQ" : [ "新加坡航空" ],
		"SZ" : [ "西南航空" ],
		"TG" : [ "泰国航空" ],
		"TK" : [ "土耳其航空" ],
		"UA" : [ "美国联合航空" ],
		"UL" : [ "斯里兰卡航空" ],
		"UM" : [ "津巴布韦航空" ],
		"UX" : [ "西班牙欧洲航空" ],
		"VN" : [ "越南航空" ],
		"VS" : [ "维珍航空" ],
		"WH" : [ "西北航空" ],
		"WU" : [ "武汉航空" ],
		"X2" : [ "新华航空" ],
		"XO" : [ "新疆航空" ],
		"Z2" : [ "中原航空" ],
		"ZH" : [ "深圳航空" ]
	};

	// 国内机场列表, 机场三字码为key, 数组[名称, 是否国际机场标识]
	var _airportList = {
		"AAT" : [ "阿勒泰", 0 ],
		"ACX" : [ "兴义", 0 ],
		"AEB" : [ "百色", 0 ],
		"AKA" : [ "五里铺", 0 ],
		"AKU" : [ "阿克苏", 0 ],
		"AOG" : [ "鞍山", 0 ],
		"AQG" : [ "安庆", 0 ],
		"BAV" : [ "包头", 0 ],
		"BHY" : [ "北海福成", 0 ],
		"BJS" : [ "首都", 0 ],
		"BPX" : [ "昌都", 0 ],
		"BSD" : [ "保山", 0 ],
		"CAN" : [ "新白云", 0 ],
		"CGD" : [ "常德", 0 ],
		"CGO" : [ "郑州", 0 ],
		"CGQ" : [ "长春", 0 ],
		"CHG" : [ "朝阳", 0 ],
		"CIF" : [ "赤峰", 0 ],
		"CIH" : [ "长治", 0 ],
		"CKG" : [ "江北", 1 ],
		"CSX" : [ "长沙", 0 ],
		"CTU" : [ "双流", 0 ],
		"CZX" : [ "奔牛", 0 ],
		"DAT" : [ "大同", 0 ],
		"DAX" : [ "达县", 0 ],
		"DDG" : [ "丹东", 0 ],
		"DIG" : [ "香格里拉", 0 ],
		"DLC" : [ "周水子", 0 ],
		"DLU" : [ "大理", 0 ],
		"DNH" : [ "敦煌", 0 ],
		"DOY" : [ "东营", 0 ],
		"DQA" : [ "萨尔图", 0 ],
		"DSN" : [ "鄂尔多斯", 0 ],
		"DYG" : [ "张家界", 0 ],
		"ENH" : [ "恩施", 0 ],
		"ENY" : [ "延安", 0 ],
		"ERL" : [ "赛乌苏", 1 ],
		"FOC" : [ "福州", 0 ],
		"FUG" : [ "阜阳", 0 ],
		"FUO" : [ "佛山沙堤", 0 ],
		"GOQ" : [ "格尔木", 0 ],
		"GYS" : [ "广元", 0 ],
		"HAK" : [ "美兰", 0 ],
		"HDG" : [ "邯郸", 0 ],
		"HEK" : [ "黑河", 0 ],
		"HET" : [ "呼和浩特", 0 ],
		"HFE" : [ "骆岗", 0 ],
		"HGH" : [ "杭州", 0 ],
		"HJJ" : [ "怀化", 0 ],
		"HKG" : [ "香港", 0 ],
		"HLD" : [ "海拉尔", 0 ],
		"HLH" : [ "乌兰浩特", 0 ],
		"HMI" : [ "哈密", 0 ],
		"HRB" : [ "哈尔滨", 0 ],
		"HSN" : [ "舟山", 0 ],
		"HTN" : [ "和田", 0 ],
		"HYN" : [ "黄岩", 0 ],
		"HZG" : [ "汉中", 0 ],
		"HZH" : [ "黎平", 0 ],
		"INC" : [ "银川", 0 ],
		"IQM" : [ "且末", 0 ],
		"IQN" : [ "庆阳", 0 ],
		"JDZ" : [ "景德镇", 0 ],
		"JGN" : [ "嘉峪关", 0 ],
		"JGS" : [ "井冈山", 0 ],
		"JHG" : [ "西双版纳", 0 ],
		"JIL" : [ "吉林", 0 ],
		"JIU" : [ "九江", 0 ],
		"JJN" : [ "晋江", 0 ],
		"JMU" : [ "佳木斯", 0 ],
		"JNG" : [ "济宁", 0 ],
		"JNZ" : [ "锦州", 0 ],
		"JUZ" : [ "衢州", 0 ],
		"JXA" : [ "兴凯湖", 0 ],
		"JZH" : [ "九黄", 0 ],
		"KCA" : [ "库车", 0 ],
		"KGT" : [ "康定", 0 ],
		"KHG" : [ "喀什", 0 ],
		"KHH" : [ "高雄", 0 ],
		"KHN" : [ "昌北", 0 ],
		"KJI" : [ "喀纳斯", 0 ],
		"KMG" : [ "巫家坝", 0 ],
		"KOW" : [ "赣州", 0 ],
		"KRL" : [ "库尔勒", 0 ],
		"KRY" : [ "克拉玛依", 0 ],
		"KWE" : [ "贵阳", 0 ],
		"KWL" : [ "桂林", 0 ],
		"LCX" : [ "连城", 0 ],
		"LDS" : [ "林都", 0 ],
		"LHW" : [ "兰州", 0 ],
		"LJG" : [ "丽江", 0 ],
		"LLF" : [ "永州", 0 ],
		"LNJ" : [ "临沧", 0 ],
		"LUM" : [ "芒市", 0 ],
		"LXA" : [ "拉萨", 0 ],
		"LYA" : [ "洛阳", 0 ],
		"LYG" : [ "连云港", 0 ],
		"LYI" : [ "临沂", 0 ],
		"LZH" : [ "柳州", 0 ],
		"LZO" : [ "泸州", 0 ],
		"LZY" : [ "林芝", 0 ],
		"MDG" : [ "牡丹江", 0 ],
		"MFM" : [ "澳门", 0 ],
		"MIG" : [ "绵阳", 0 ],
		"MXZ" : [ "梅县", 0 ],
		"NAO" : [ "南充", 0 ],
		"NAY" : [ "南苑", 0 ],
		"NBS" : [ "长白山", 0 ],
		"NDG" : [ "齐齐哈尔", 0 ],
		"NGB" : [ "栎社", 0 ],
		"NKG" : [ "禄口", 1 ],
		"NLT" : [ "那拉提", 0 ],
		"NNG" : [ "南宁", 0 ],
		"NNY" : [ "南阳", 0 ],
		"NTG" : [ "南通", 0 ],
		"NZH" : [ "满洲里", 0 ],
		"OHE" : [ "漠河", 0 ],
		"PEK" : [ "首都", 1 ],
		"PVG" : [ "浦东", 1 ],
		"PZI" : [ "攀枝花", 0 ],
		"SHA" : [ "虹桥", 1 ],
		"SHE" : [ "桃仙", 1 ],
		"SHP" : [ "秦皇岛", 0 ],
		"SHS" : [ "沙市", 0 ],
		"SJW" : [ "石家庄", 0 ],
		"SWA" : [ "汕头", 0 ],
		"SYM" : [ "思茅", 0 ],
		"SYX" : [ "凤凰", 0 ],
		"SZX" : [ "宝安", 1 ],
		"TAO" : [ "青岛", 0 ],
		"TCG" : [ "塔城", 0 ],
		"TCZ" : [ "驼峰", 0 ],
		"TEN" : [ "铜仁", 0 ],
		"TGO" : [ "通辽", 0 ],
		"THQ" : [ "天水", 0 ],
		"TLQ" : [ "吐鲁番", 0 ],
		"TNA" : [ "济南", 1 ],
		"TPE" : [ "台北", 0 ],
		"TSN" : [ "天津", 0 ],
		"TVS" : [ "三女河", 0 ],
		"TXN" : [ "黄山", 0 ],
		"TYN" : [ "武宿", 0 ],
		"URC" : [ "乌鲁木齐", 0 ],
		"UYN" : [ "榆林", 0 ],
		"WEF" : [ "潍坊", 0 ],
		"WEH" : [ "威海", 0 ],
		"WNH" : [ "文山", 0 ],
		"WNZ" : [ "温州", 0 ],
		"WUA" : [ "乌海", 0 ],
		"WUH" : [ "武汉", 0 ],
		"WUS" : [ "武夷山", 0 ],
		"WUX" : [ "无锡", 0 ],
		"WUZ" : [ "长洲岛", 0 ],
		"WXN" : [ "万县", 0 ],
		"XFN" : [ "襄樊", 0 ],
		"XIC" : [ "西昌", 0 ],
		"XIL" : [ "锡林浩特", 0 ],
		"XIY" : [ "咸阳", 0 ],
		"XMN" : [ "高崎", 0 ],
		"XNN" : [ "曹家堡", 0 ],
		"XUZ" : [ "徐州", 0 ],
		"YBP" : [ "莱坝", 0 ],
		"YCU" : [ "运城", 0 ],
		"YIH" : [ "宜昌", 0 ],
		"YIN" : [ "伊宁", 0 ],
		"YIW" : [ "义乌", 0 ],
		"YNJ" : [ "延吉", 0 ],
		"YNT" : [ "烟台", 0 ],
		"YNZ" : [ "盐城", 0 ],
		"YUS" : [ "巴塘", 0 ],
		"ZAT" : [ "昭通", 0 ],
		"ZHA" : [ "湛江", 0 ],
		"ZHY" : [ "香山", 0 ],
		"ZUH" : [ "珠海", 0 ],
		"HIA" : [ "涟水", 0 ]
	};

	// 国内机场取票点列表, 机场三字码为key
	var _airportServiceDeskList = {
		"CAN" : [ "广州白云机场3楼国内出发厅（13号门正对柜台，手扶电梯附近）信天游机场服务柜台" ],
		"CGO" : [ "郑州机场24号值机柜台对面信天游柜台（八达航空售票处）" ],
		"CKG" : [ "重庆江北国际机场出发厅2号门左侧信天游柜台（万宁超市旁）" ],
		"CSX" : [ "长沙黄花机场出发厅2楼（补票柜台）信天游机场服务柜台" ],
		"CTU" : [ "成都双流国际机场三号大厅售票区15号（原39号）信天游机场服务柜台" ],
		"DLC" : [ "大连周水子机场候机楼2楼4号门右侧（北方假日柜台）信天游机场服务柜台" ],
		"FOC" : [ "福州长乐国际机场候机楼2楼机场售票4号信天游机场服务柜台" ],
		"HAK" : [ "海口美兰机场候机楼2楼出发厅2号门左侧（机场补票柜台）信天游机场服务柜台" ],
		"HET" : [ "呼和浩特白塔国际机场二层国内出发大厅D岛信天游机场服务柜台" ],
		"LHW" : [ "兰州中川机场二楼出发厅信天游机场服务柜台(一号门左侧第二个柜台或二号门右侧第二个柜台)" ],
		"PEK" : [ "北京首都国际机场二号航站楼二层国际出发大厅69号柜台（正对2号门和4号门中间）", "北京首都国际机场T3航站楼4楼出发大厅（安检通道旁边哈根达斯对面的航空保险圆岛柜台）信天游机场服务柜台" ],
		"PVG" : [ "上海浦东国际机场T1航站楼出发厅5号们信天游服务柜台", "上海浦东机场磁悬浮站B06室（T1,T2步行道中间）信天游服务柜台", "上海浦东机场T2航站楼3楼出发大厅23号对面（D岛和E岛之间）信天游服务柜台", "上海浦东国际机场T1航站楼3楼出发厅5号门正对面信天游机场服务柜台", "上海浦东国际机场T2航站楼国内出发厅（29号门M岛岛头补票柜台）信天游机场服务柜台" ],
		"SHA" : [ "上海虹桥机场T2航站楼出发厅6号门331、332号信天游服务柜台", "上海虹桥机场T2航站楼出发厅3号门301柜台或6号门329柜台" ],
		"SHE" : [ "沈阳市沈河区青年大街56号沈阳城市候机楼信天游服务柜台", "沈阳桃仙国际机场候机楼2层东侧信天游柜台（近A岛自动扶梯口，东航售票柜台左侧）" ],
		"SZX" : [ "深圳宝安国际机场B楼2楼出发厅7号门32、33号信天游机场服务柜台" ],
		"TSN" : [ "天津滨海国际机场航站楼出港大厅2号门右侧信天游机场服务柜台" ],
		"TYN" : [ "山西太原武宿机场2号航站楼出港大厅安检通道对面信天游服务柜台" ],
		"WNZ" : [ "温州永强机场国内厅2号大门内信天游机场服务柜台（进门旁边的中转联程柜台）" ],
		"WUH" : [ "武汉天河机场国内候机楼2楼出发厅3号门右侧信天游机场服务柜台" ],
		"XIY" : [ "西安咸阳机场2号候机楼出发大厅3号门里15号信天游机场服务柜台" ],
		"XMN" : [ "厦门高崎机场国内出发大厅航空售票38号（c岛对面）信天游机场服务柜台" ],
		"ZUH" : [ "珠海机场候机楼2楼出发大厅1号门内信天游机场服务柜台（1号门进直走30米，珠海机场售票处柜台旁）" ]
	};

	// 国内热门城市列表, 城市三字码为key, 数组[中文名, 拼音]
	var _hotCityList = {
		"PEK" : [ "北京", "beijing", "bj" ],
		"SZX" : [ "深圳", "shenzhen", "sz" ],
		"SHA" : [ "上海", "shanghai", "sh" ],
		"SYX" : [ "三亚", "sanya", "sy" ],
		"CTU" : [ "成都", "chengdu", "cd" ],
		"XMN" : [ "厦门", "xiamen", "xm" ],
		"HGH" : [ "杭州", "hangzhou", "hz" ],
		"CGQ" : [ "长春", "changchun", "cc" ],
		"CSX" : [ "长沙", "changsha", "cs" ],
		"CKG" : [ "重庆", "chongqing", "cq" ],
		"DLC" : [ "大连", "dalian", "dl" ],
		"CAN" : [ "广州", "guangzhou", "gz" ],
		"KWL" : [ "桂林", "guilin", "gl" ],
		"KWE" : [ "贵阳", "guiyang", "gy" ],
		"HRB" : [ "哈尔滨", "haerbin", "heb" ],
		"HAK" : [ "海口", "haikou", "hk" ],
		"HFE" : [ "合肥", "hefei", "hf" ],
		"KMG" : [ "昆明", "kunming", "km" ],
		"LHW" : [ "兰州", "lanzhou", "lz" ],
		"KHN" : [ "南昌", "nanchang", "nc" ],
		"NKG" : [ "南京", "nanjing", "nj" ],
		"NNG" : [ "南宁", "nanning", "nn" ],
		"TAO" : [ "青岛", "qingdao", "qd" ],
		"SHE" : [ "沈阳", "shenyang", "sy" ],
		"TSN" : [ "天津", "tianjin", "tj" ],
		"WNZ" : [ "温州", "wenzhou", "wz" ],
		"WUH" : [ "武汉", "wuhan", "wh" ],
		"URC" : [ "乌鲁木齐", "wulumuqi", "wlmq" ],
		"XIY" : [ "西安", "xian", "xa" ],
		"CGO" : [ "郑州", "zhengzhou", "zz" ]
	};

	// 国内城市列表, 城市三字码为key, 数组[中文名, 拼音, 拼音首字母]
	var _cityList = {
		"AKU" : [ "阿克苏", "akesu", "aks" ],
		"AAT" : [ "阿勒泰", "aletai", "alt" ],
		"AKA" : [ "安康", "ankang", "ak" ],
		"AQG" : [ "安庆", "anqing", "aq" ],
		"AOG" : [ "鞍山", "anshan", "as" ],
		"MFM" : [ "澳门", "aomen", "am" ],
		"AEB" : [ "百色", "baise", "bs" ],
		"BSD" : [ "保山", "baoshan", "bs" ],
		"BAV" : [ "包头", "baotou", "bt" ],
		"BHY" : [ "北海", "beihai", "bh" ],
		"PEK" : [ "北京", "beijing", "bj" ],
		"NBS" : [ "长白山", "changbais", "cbs" ],
		"CGQ" : [ "长春", "changchun", "cc" ],
		"CGD" : [ "常德", "changde", "cd" ],
		"BPX" : [ "昌都", "changdu", "cd" ],
		"CSX" : [ "长沙", "changsha", "cs" ],
		"CIH" : [ "长治", "changzhi", "cz" ],
		"CZX" : [ "常州", "changzhou", "cz" ],
		"CHG" : [ "朝阳", "chaoyang", "cy" ],
		"CTU" : [ "成都", "chengdu", "cd" ],
		"CIF" : [ "赤峰", "chifeng", "cf" ],
		"CKG" : [ "重庆", "chongqing", "cq" ],
		"DLU" : [ "大理", "dali", "dl" ],
		"DLC" : [ "大连", "dalian", "dl" ],
		"DDG" : [ "丹东", "dandong", "dd" ],
		"DQA" : [ "大庆", "daqing", "dq" ],
		"DAT" : [ "大同", "datong", "dt" ],
		"DAX" : [ "达县", "daxian", "dx" ],
		"DOY" : [ "东营", "dongying", "dy" ],
		"DNH" : [ "敦煌", "dunhuang", "dh" ],
		"DSN" : [ "鄂尔多斯", "eerduosi", "eeds" ],
		"ENH" : [ "恩施", "enshi", "es" ],
		"ERL" : [ "二连浩特", "erlianhaote", "elht" ],
		"FUO" : [ "佛山", "foshan", "fs" ],
		"FUG" : [ "阜阳", "fuyang", "fy" ],
		"FOC" : [ "福州", "fuzhou", "fz" ],
		"KOW" : [ "赣州", "ganzhou", "gz" ],
		"KHH" : [ "高雄", "gaoxiong", "gx" ],
		"GOQ" : [ "格尔木", "geermu", "gem" ],
		"GYS" : [ "广元", "guangyuan", "gy" ],
		"CAN" : [ "广州", "guangzhou", "gz" ],
		"KWL" : [ "桂林", "guilin", "gl" ],
		"KWE" : [ "贵阳", "guiyang", "gy" ],
		"HRB" : [ "哈尔滨", "haerbin", "heb" ],
		"HAK" : [ "海口", "haikou", "hk" ],
		"HLD" : [ "海拉尔", "hailaer", "hle" ],
		"HMI" : [ "哈密", "hami", "hm" ],
		"HDG" : [ "邯郸", "handan", "hd" ],
		"HGH" : [ "杭州", "hangzhou", "hz" ],
		"HZG" : [ "汉中", "hanzhong", "hz" ],
		"HFE" : [ "合肥", "hefei", "hf" ],
		"HEK" : [ "黑河", "heihe", "hh" ],
		"HTN" : [ "和田", "hetian", "ht" ],
		"HJJ" : [ "怀化", "huaihua", "hh" ],
		"TXN" : [ "黄山", "huangshan", "hs" ],
		"HYN" : [ "黄岩", "huangyan", "hy" ],
		"HET" : [ "呼和浩特", "huhehaote", "hhht" ],
		"JMU" : [ "佳木斯", "jiamusi", "jms" ],
		"JGN" : [ "嘉峪关", "jiayuguan", "jyg" ],
		"JIL" : [ "吉林", "jilin", "jl" ],
		"TNA" : [ "济南", "jinan", "jn" ],
		"JDZ" : [ "景德镇", "jingdezhen", "jdz" ],
		"JGS" : [ "井冈山", "jinggangshan", "jgs" ],
		"JNG" : [ "济宁", "jining", "jn" ],
		"JJN" : [ "晋江", "jinjiang", "jj" ],
		"JNZ" : [ "锦州", "jinzhou", "jz" ],
		"JIU" : [ "九江", "jiujiang", "jj" ],
		"JZH" : [ "九寨沟", "jiuzhaigou", "jzg" ],
		"JXA" : [ "鸡西", "jixi", "jx" ],
		"KJI" : [ "喀纳斯", "kanasi", "kns" ],
		"KGT" : [ "康定", "kangding", "kd" ],
		"KHG" : [ "喀什", "kashi", "ks" ],
		"KRY" : [ "克拉玛依", "kelamayi", "klmy" ],
		"DIG" : [ "克雷格", "keleige", "klg" ],
		"KCA" : [ "库车", "kuche", "kc" ],
		"KRL" : [ "库尔勒", "kuerle", "kel" ],
		"KMG" : [ "昆明", "kunming", "km" ],
		"LHW" : [ "兰州", "lanzhou", "lz" ],
		"LXA" : [ "拉萨", "lasa", "ls" ],
		"LCX" : [ "连城", "liancheng", "lc" ],
		"LYG" : [ "连云港", "lianyungang", "lyg" ],
		"LJG" : [ "丽江", "lijiang", "lj" ],
		"LNJ" : [ "临沧", "lincang", "lc" ],
		"LYI" : [ "临沂", "linyi", "ly" ],
		"LZY" : [ "林芝", "linzhi", "lz" ],
		"HZH" : [ "黎平", "liping", "lp" ],
		"LZH" : [ "柳州", "liuzhou", "lz" ],
		"LYA" : [ "洛阳", "luoyang", "ly" ],
		"LZO" : [ "泸州", "luzhou", "lz" ],
		"LUM" : [ "芒市", "mangshi", "ms" ],
		"NZH" : [ "满洲里", "manzhouli", "mzl" ],
		"MXZ" : [ "梅县", "meixian", "mx" ],
		"MIG" : [ "绵阳", "mianyang", "my" ],
		"OHE" : [ "漠河", "mohe", "mh" ],
		"MDG" : [ "牡丹江", "mudanjiang", "mdj" ],
		"NLT" : [ "那拉提", "nalati", "nlt" ],
		"KHN" : [ "南昌", "nanchang", "nc" ],
		"NAO" : [ "南充", "nanchong", "nc" ],
		"NKG" : [ "南京", "nanjing", "nj" ],
		"NNG" : [ "南宁", "nanning", "nn" ],
		"NTG" : [ "南通", "nantong", "nt" ],
		"NNY" : [ "南阳", "nanyang", "ny" ],
		"NGB" : [ "宁波", "ningbo", "nb" ],
		"PZI" : [ "攀枝花", "panzhihua", "pzh" ],
		"IQM" : [ "且末", "qiemo", "qm" ],
		"TAO" : [ "青岛", "qingdao", "qd" ],
		"IQN" : [ "庆阳", "qingyang", "qy" ],
		"SHP" : [ "秦皇岛", "qinhuangdao", "qhd" ],
		"NDG" : [ "齐齐哈尔", "qiqihaer", "qqhe" ],
		"JUZ" : [ "衢州", "quzhou", "qz" ],
		"SYX" : [ "三亚", "sanya", "sy" ],
		"SHA" : [ "上海", "shanghai", "sh" ],
		"SWA" : [ "汕头", "shantou", "st" ],
		"SHS" : [ "沙市", "shashi", "ss" ],
		"SHE" : [ "沈阳", "shenyang", "sy" ],
		"SZX" : [ "深圳", "shenzhen", "sz" ],
		"SJW" : [ "石家庄", "shijiazhuang", "sjz" ],
		"SYM" : [ "思茅", "simao", "sm" ],
		"SUB" : [ "泗水", "sishui", "ss" ],
		"TCG" : [ "塔城", "tacheng", "tc" ],
		"TPE" : [ "台北", "taibei", "tb" ],
		"TYN" : [ "太原", "taiyuan", "ty" ],
		"TVS" : [ "唐山", "tangshan", "ts" ],
		"TSN" : [ "天津", "tianjin", "tj" ],
		"THQ" : [ "天水", "tianshui", "ts" ],
		"TGO" : [ "通辽", "tongliao", "tl" ],
		"TEN" : [ "铜仁", "tongren", "tr" ],
		"TLQ" : [ "吐鲁番", "tulufan", "tlf" ],
		"TCZ" : [ "腾冲", "tengchong", "tc" ],
		"WXN" : [ "万县", "wanxian", "wx" ],
		"WEF" : [ "潍坊", "weifang", "wf" ],
		"WEH" : [ "威海", "weihai", "wh" ],
		"WNH" : [ "文山", "wenshan", "ws" ],
		"WNZ" : [ "温州", "wenzhou", "wz" ],
		"WUA" : [ "乌海", "wuhai", "wh" ],
		"WUH" : [ "武汉", "wuhan", "wh" ],
		"HLH" : [ "乌兰浩特", "wulanhaote", "wlht" ],
		"URC" : [ "乌鲁木齐", "wulumuqi", "wlmq" ],
		"WUX" : [ "无锡", "wuxi", "wx" ],
		"WUS" : [ "武夷山", "wuyishan", "wys" ],
		"WUZ" : [ "梧州", "wuzhou", "wz" ],
		"XMN" : [ "厦门", "xiamen", "xm" ],
		"XIY" : [ "西安", "xian", "xa" ],
		"XFN" : [ "襄樊", "xiangfan", "xf" ],
		"HKG" : [ "香港", "xianggang", "xg" ],
		"XIC" : [ "西昌", "xichang", "xc" ],
		"XIL" : [ "锡林浩特", "xilinhaote", "xlht" ],
		"ACX" : [ "兴义", "xingyi", "xy" ],
		"XNN" : [ "西宁", "xining", "xn" ],
		"JHG" : [ "西双版纳", "xishuangbanna", "xsbn" ],
		"XUZ" : [ "徐州", "xuzhou", "xz" ],
		"ENY" : [ "延安", "yanan", "ya" ],
		"YNZ" : [ "盐城", "yancheng", "yc" ],
		"YNJ" : [ "延吉", "yanji", "yj" ],
		"YNT" : [ "烟台", "yantai", "yt" ],
		"YBP" : [ "宜宾", "yibin", "yb" ],
		"YIH" : [ "宜昌", "yichang", "yc" ],
		"LDS" : [ "伊春", "yichun", "yc" ],
		"INC" : [ "银川", "yinchuan", "yc" ],
		"YIN" : [ "伊宁", "yining", "yn" ],
		"YIW" : [ "义乌", "yiwu", "yw" ],
		"LLF" : [ "永州", "yongzhou", "yz" ],
		"UYN" : [ "榆林", "yulin", "yl" ],
		"YCU" : [ "运城", "yuncheng", "yc" ],
		"YUS" : [ "玉树", "yushu", "ys" ],
		"DYG" : [ "张家界", "zhangjiajie", "zjj" ],
		"ZHA" : [ "湛江", "zhanjiang", "zj" ],
		"ZAT" : [ "昭通", "zhaotong", "zt" ],
		"CGO" : [ "郑州", "zhengzhou", "zz" ],
		"ZHY" : [ "中卫", "zhongwei", "zw" ],
		"HSN" : [ "舟山", "zhoushan", "zs" ],
		"ZUH" : [ "珠海", "zhuhai", "zh" ],
		"HIA" : [ "淮安", "huaian", "ha" ]
	};

	// 机票城市选择框tab, 数组[开始字符, 结束字符, tab标题]
	var _flightCityTabList = {
		'hot' : [ '', '', '热门城市' ],
		'a' : [ 'a', 'g', 'ABC DEFG' ],
		'h' : [ 'h', 'n', 'HIJK LMN' ],
		'o' : [ 'o', 't', 'OPQ RST' ],
		'u' : [ 'u', 'z', 'UVW XYZ' ]
	};

	// 供应商信息, 数组[名称, 客服电话, 图片样式名] -- 记得同时更新 管理后台--供应商管理
	var _supplierList = {
		"1427076" : [ "同程网", "4007-777-777", "tongcheng" ]
	};

	// 支付类型, 数组[名称, 保留] -- 记得同时更新 flight_def.h 文件
	var _payTypeList = {
		"0" : [ "未知", "" ],
		"1" : [ "网上银行", "" ],
		"2" : [ "信用卡", "" ],
		"3" : [ "财付通", "" ],
		"4" : [ "其他", "" ]
	};

	// 配送各类型, 数组[名称] -- 记得同时更新 flight_def.h 文件
	var _deliveryTypeList = {
		"1" : [ "送票上门" ],
		"2" : [ "无需行程单" ],
		"3" : [ "挂号信" ],
		"4" : [ "机场自取" ],
		"5" : [ "快递" ]
	}; // /

	// 证件ID类型, 数组[名称] -- 记得同时更新 flight_def.h 文件
	var _cardTypeList = {
		"1" : [ "身份证" ],
		"2" : [ "护照" ],
		"3" : [ "军人证" ],
		"4" : [ "回乡证" ],
		"5" : [ "台胞证" ],
		"6" : [ "港澳通行证" ],
		"7" : [ "国际海员证" ],
		"8" : [ "外国人永久居住证" ],
		"9" : [ "旅行证" ],
		"11" : [ "香港身份证" ],
		"10" : [ "其他" ]
	};// "3":["军人证"],

	// 常旅类型, 数组[名称] -- 记得同时更新 flight_def.h 文件
	var _passengerTypeList = {
		"1" : [ "成人", "12周岁以上" ],
		"2" : [ "儿童", "2-12周岁" ],
		"3" : [ "婴儿", "小于两周岁" ]
	};

	// 保险供应商(+类型), 数组[保险公司名称, 保险类型名称, 验真地址]
	var _insureTypeList = {
		"1" : [ "太平洋保险公司", "航空意外险", "http://www.cpic.com.cn/cpicweb/index/cx_index/customerService/validatingEpolicyAndDownload.html" ]
	};

	var _feeList = {
		"insure" : [ 2000 ],// 保险单价，单位分
		"express" : [ 1000 ]
	// 快递费用，单位分
	};

	function _getInsureType(type) {
		if (_insureTypeList.hasOwnProperty(type)) {
			return _insureTypeList[type];
		}
		return [];
	}
	function _getAirlineCompany(code) {
		if (_airlineCompanyList.hasOwnProperty(code)) {
			return _airlineCompanyList[code];
		}
		return [];
	}
	function _getAirport(code) {
		if (_airportList.hasOwnProperty(code)) {
			return _airportList[code];
		}
		return [];
	}
	function _getSupplier(id) {
		if (_supplierList.hasOwnProperty(id)) {
			return _supplierList[id];
		} else {// 其他供应商都认为是同程
			return _supplierList['1427076'];
		}
	}
	function _getPayType(type) {
		if (_payTypeList.hasOwnProperty(type)) {
			return _payTypeList[type];
		}
		return [];
	}
	function _getDeliveryType(type) {
		if (_deliveryTypeList.hasOwnProperty(type)) {
			return _deliveryTypeList[type];
		}
		return [];
	}
	function _getCardType(type) {
		if (_cardTypeList.hasOwnProperty(type)) {
			return _cardTypeList[type];
		}
		return [];
	}
	function _getCardTypeByName(name) {
		var type = [];
		for ( var t in _cardTypeList) {
			if (_cardTypeList[t][0] == name) {
				type.push(t);
			}
		}
		return type;
	}

	function _getPassengerType(type) {
		if (_passengerTypeList.hasOwnProperty(type)) {
			return _passengerTypeList[type];
		}
		return [];
	}
	function _getPassengerTypeByName(name) {
		var type = [];
		for ( var t in _passengerTypeList) {
			if (_passengerTypeList[t][0] == name) {
				type.push(t);
			}
		}
		return type;
	}
	function _getAirportServiceDesk(code) {
		if (_airportServiceDeskList.hasOwnProperty(code)) {
			return _airportServiceDeskList[code];
		}
		return [];
	}
	function _getCity(key) {
		if (_cityList.hasOwnProperty(key)) {
			return _cityList[key];
		}
		return [];
	}
	/**
	 * name 可以是城市的中文名、拼音、三字码和拼音首字母 如果是首字母拼音，找到第一个后立刻返回
	 */
	function _getCityCode(name) {
		if (!name) {
			return '';
		}
		for ( var code in _cityList) {
			if (_cityList[code][0] == name || _cityList[code][1] == name || _cityList[code][2] == name || name.toUpperCase() == code) {
				return code;
			}
		}
		return '';
	}
	function _getDeliveryTypeList() {
		return _deliveryTypeList;
	}
	function _getCardTypeList() {
		return _cardTypeList;
	}
	function _getPassengerTypeList() {
		return _passengerTypeList;
	}
	function _getAirportServiceDeskList() {
		return _airportServiceDeskList;
	}
	function _getHotCityList() {
		return _hotCityList;
	}
	function _getCityList() {
		return _cityList;
	}
	function _getFlightCityTabList() {
		return _flightCityTabList;
	}
	function _getInsureTypeList() {
		return _insureTypeList;
	}
	function _getAirlineCompanyList() {
		return _airlineCompanyList;
	}
	function _getFee(type) {
		if (_feeList.hasOwnProperty(type)) {
			return _feeList[type];
		}
		return [];
	}
	function _getFeeList() {
		return _feeList();
	}
	return {
		getInsureType : _getInsureType,
		getCityCode : _getCityCode,
		getHotCityList : _getHotCityList,
		getCityList : _getCityList,
		getCity : _getCity,
		getFlightCityTabList : _getFlightCityTabList,
		getAirlineCompany : _getAirlineCompany,
		getAirport : _getAirport,
		getSupplier : _getSupplier,
		getPayType : _getPayType,
		getDeliveryType : _getDeliveryType,
		getDeliveryTypeList : _getDeliveryTypeList,
		getCardType : _getCardType,
		getCardTypeByName : _getCardTypeByName,
		getCardTypeList : _getCardTypeList,
		getPassengerType : _getPassengerType,
		getPassengerTypeByName : _getPassengerTypeByName,
		getPassengerTypeList : _getPassengerTypeList,
		getAirportServiceDesk : _getAirportServiceDesk,
		getAirportServiceDeskList : _getAirportServiceDeskList,
		getInsureTypeList : _getInsureTypeList,
		getAirlineCompanyList : _getAirlineCompanyList,
		getFee : _getFee,
		getFeeList : _getFeeList
	};

})();
/*  |xGv00|8e1f1a9dd08f67bb7b22afc6c2eb741c */