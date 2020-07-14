/*
省，城市
二维数组，[0]为省,[1]为城市名数组,[2] 为对应市下的区数组，[3]为0的时候为直辖市，1是省
*/


var Province_City=new Array();
var ArrahLength=0;





Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="北京";

Province_City[ArrahLength][1] = new Array("东城区","西城区","崇文区","宣武区","朝阳区","海淀区","丰台区","石景山区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区","怀柔区","平谷区","密云县","延庆县");
Province_City[ArrahLength][2] = 1;
Province_City[ArrahLength][3] = 1;
ArrahLength++;

/* 定义区数据 三维数组的下标要和城市名称的下标对应*/
/*
 * //Province_City[ArrahLength][1]=new Array("市辖区","市辖县");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("东城区","西城区","崇文区","宣武区","朝阳区","海淀区","丰台区","石景山区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区","怀柔区","平谷区");	
Province_City[ArrahLength][2][1]=Array("密云县","延庆县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;
*/

/*

Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="天津";
Province_City[ArrahLength][1]=new Array("市辖区","市辖县");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("和平区","河东区","河西区","南开区","河北区","红桥区","塘沽区","汉沽区","大港区","东丽区","西青区","北辰区","津南区","武清区","宝坻区");
Province_City[ArrahLength][2][1]=Array("静海县","宁河县","蓟县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;

*/


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="天津";
Province_City[ArrahLength][1]=new Array("和平区","河东区","河西区","南开区","河北区","红桥区","塘沽区","汉沽区","大港区","东丽区","西青区","北辰区","津南区","武清区","宝坻区","静海县","宁河县","蓟县");
Province_City[ArrahLength][2] = 1;
Province_City[ArrahLength][3] = 1;
ArrahLength++;


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="河北";
Province_City[ArrahLength][1]=new Array("石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","沧州市","廊坊市","衡水市");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("长安区","桥东区","桥西区","新华区","裕华区","井陉矿区","辛集市","藁城市","晋州市","新乐市","鹿泉市","平山县","井陉县","栾城县","正定县","行唐县","灵寿县","高邑县","赵县","赞皇县","深泽县","无极县","元氏县");
Province_City[ArrahLength][2][1]=Array("路北区","路南区","古冶区","开平区","丰润区","丰南区","遵化市","迁安市","迁西县","滦南县","玉田县","唐海县","乐亭县","滦县");
Province_City[ArrahLength][2][2]=Array("海港区","山海关区","北戴河区","昌黎县","卢龙县","抚宁县","青龙满族自治县");
Province_City[ArrahLength][2][3]=Array("丛台区","复兴区","邯山区","峰峰矿区","武安市","邯郸县","永年县","曲周县","馆陶县","魏县","成安县","大名县","涉县","鸡泽县","邱县","广平县","肥乡县","临漳县","磁县");
Province_City[ArrahLength][2][4]=Array("桥东区","桥西区","南宫市","沙河市","邢台县","柏乡县","任县","清河县","宁晋县","威县","隆尧县","临城县","广宗县","临西县","内丘县","平乡县","巨鹿县","新河县","南和县");
Province_City[ArrahLength][2][5]=Array("新市区","南市区","北市区","涿州市","定州市","安国市","高碑店市","满城县","清苑县","涞水县","阜平县","徐水县","定兴县","唐县","高阳县","容城县","涞源县","望都县","安新县","易县","曲阳县","蠡县","顺平县","博野县","雄县");
Province_City[ArrahLength][2][6]=Array("桥西区","桥东区","宣化区","下花园区","宣化县","康保县","张北县","阳原县","赤城县","沽源县","怀安县","怀来县","崇礼县","尚义县","蔚县","涿鹿县","万全县");
Province_City[ArrahLength][2][7]=Array("双桥区","双滦区","鹰手营子矿区","承德县","兴隆县","隆化县","平泉县","滦平县","丰宁满族自治县","围场满族蒙古族自治县","宽城满族自治县");
Province_City[ArrahLength][2][8]=Array("运河区","新华区","泊头市","任丘市","黄骅市","河间市","沧县","青县","献县","东光县","海兴县","盐山县","肃宁县","南皮县","吴桥县","孟村回族自治县");
Province_City[ArrahLength][2][9]=Array("安次区","广阳区","霸州市","三河市","固安县","永清县","香河县","大城县","文安县","大厂回族自治县");
Province_City[ArrahLength][2][10]=Array("桃城区","冀州市","深州市","饶阳县","枣强县","故城县","阜城县","安平县","武邑县","景县","武强县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="山西";
Province_City[ArrahLength][1]=new Array("太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁市");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("杏花岭区","小店区","迎泽区","尖草坪区","万柏林区","晋源区","古交市","阳曲县","清徐县","娄烦县");
Province_City[ArrahLength][2][1]=Array("城区","矿区","南郊区","新荣区","大同县","天镇县","灵丘县","阳高县","左云县","广灵县","浑源县");
Province_City[ArrahLength][2][2]=Array("城区","矿区","郊区","平定县","盂县");
Province_City[ArrahLength][2][3]=Array("城区","郊区","潞城市","长治县","长子县","平顺县","襄垣县","沁源县","屯留县","黎城县","武乡县","沁县","壶关县");
Province_City[ArrahLength][2][4]=Array("城区","高平市","泽州县","陵川县","阳城县","沁水县");
Province_City[ArrahLength][2][5]=Array("朔城区","平鲁区","山阴县","右玉县","应县","怀仁县");
Province_City[ArrahLength][2][6]=Array("榆次区","介休市","昔阳县","灵石县","祁县","左权县","寿阳县","太谷县","和顺县","平遥县","榆社县");
Province_City[ArrahLength][2][7]=Array("盐湖区","河津市","永济市","闻喜县","新绛县","平陆县","垣曲县","绛县","稷山县","芮城县","夏县","万荣县","临猗县");
Province_City[ArrahLength][2][8]=Array("忻府区","原平市","代县","神池县","五寨县","五台县","偏关县","宁武县","静乐县","繁峙县","河曲县","保德县","定襄县","岢岚县");
Province_City[ArrahLength][2][9]=Array("尧都区","侯马市","霍州市","汾西县","吉县","安泽县","大宁县","浮山县","古县","隰县","襄汾县","翼城县","永和县","乡宁县","曲沃县","洪洞县","蒲县");
Province_City[ArrahLength][2][10]=Array("离石区","孝义市","汾阳市","文水县","中阳县","兴县","临县","方山县","柳林县","岚县","交口县","交城县","石楼县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;

Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="内蒙古";
Province_City[ArrahLength][1]=new Array("呼和浩特市","包头市","乌海市","赤峰市","通辽市","鄂尔多斯市","呼伦贝尔市","巴彦淖尔市","乌兰察布市","锡林郭勒盟","阿拉善盟","兴安盟");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("回民区","玉泉区","新城区","赛罕区","托克托县","清水河县","武川县","和林格尔县","土默特左旗");
Province_City[ArrahLength][2][1]=Array("昆都仑区","青山区","东河区","九原区","石拐区","白云矿区","固阳县","土默特右旗","达尔罕茂明安联合旗");
Province_City[ArrahLength][2][2]=Array("海勃湾区","乌达区","海南区");
Province_City[ArrahLength][2][3]=Array("红山区","元宝山区","松山区","宁城县","林西县","喀喇沁旗","巴林左旗","敖汉旗","阿鲁科尔沁旗","翁牛特旗","克什克腾旗","巴林右旗");
Province_City[ArrahLength][2][4]=Array("科尔沁区","霍林郭勒市","开鲁县","科尔沁左翼中旗","科尔沁左翼后旗","库伦旗","奈曼旗","扎鲁特旗");
Province_City[ArrahLength][2][5]=Array("东胜区","准格尔旗","乌审旗","伊金霍洛旗","鄂托克旗","鄂托克前旗","杭锦旗","达拉特旗");
Province_City[ArrahLength][2][6]=Array("海拉尔区","满洲里市","牙克石市","扎兰屯市","根河市","额尔古纳市","陈巴尔虎旗","阿荣旗","新巴尔虎左旗","新巴尔虎右旗","鄂伦春自治旗","莫力达瓦达斡尔族自治旗","鄂温克族自治旗");
Province_City[ArrahLength][2][7]=Array("临河区","五原县","磴口县","杭锦后旗","乌拉特中旗","乌拉特前旗","乌拉特后旗");
Province_City[ArrahLength][2][8]=Array("集宁区","丰镇市","兴和县","卓资县","商都县","凉城县","化德县","四子王旗","察哈尔右翼前旗","察哈尔右翼中旗","察哈尔右翼后旗");
Province_City[ArrahLength][2][9]=Array("锡林浩特市","二连浩特市","多伦县","阿巴嘎旗","西乌珠穆沁旗","东乌珠穆沁旗","苏尼特左旗","苏尼特右旗","太仆寺旗","正镶白旗","正蓝旗","镶黄旗");
Province_City[ArrahLength][2][10]=Array("阿拉善左旗","阿拉善右旗","额济纳旗");
Province_City[ArrahLength][2][11]=Array("乌兰浩特市","阿尔山市","突泉县","扎赉特旗","科尔沁右翼前旗","科尔沁右翼中旗");
Province_City[ArrahLength][3] = 1;
ArrahLength++;


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="辽宁";
Province_City[ArrahLength][1]=new Array("沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","锦州市","葫芦岛市","营口市","盘锦市","阜新市","辽阳市","铁岭市","朝阳市");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("沈河区","皇姑区","和平区","大东区","铁西区","苏家屯区","东陵区","新城子区","于洪区","新民市","法库县","辽中县","康平县");
Province_City[ArrahLength][2][1]=Array("西岗区","中山区","沙河口区","甘井子区","旅顺口区","金州区","瓦房店市","普兰店市","庄河市","长海县");
Province_City[ArrahLength][2][2]=Array("铁东区","铁西区","立山区","千山区","海城市","台安县","岫岩满族自治县");
Province_City[ArrahLength][2][3]=Array("顺城区","新抚区","东洲区","望花区","抚顺县","清原满族自治县");
Province_City[ArrahLength][2][4]=Array("平山区","明山区","溪湖区","南芬区","本溪满族自治县","桓仁满族自治县");
Province_City[ArrahLength][2][5]=Array("振兴区","元宝区","振安区","东港市","凤城市","宽甸满族自治县");
Province_City[ArrahLength][2][6]=Array("太和区","古塔区","凌河区","凌海市","北宁市","黑山县","义县");
Province_City[ArrahLength][2][7]=Array("龙港区","南票区","连山区","兴城市","绥中县","建昌县");
Province_City[ArrahLength][2][8]=Array("站前区","西市区","鲅鱼圈区","老边区","大石桥市","盖州市");
Province_City[ArrahLength][2][9]=Array("双台子区","兴隆台区","盘山县","大洼县");
Province_City[ArrahLength][2][10]=Array("海州区","新邱区","太平区","清河门区","细河区","彰武县","阜新蒙古族自治县");
Province_City[ArrahLength][2][11]=Array("白塔区","文圣区","宏伟区","太子河区","弓长岭区","灯塔市","辽阳县");
Province_City[ArrahLength][2][12]=Array("银州区","清河区","调兵山市","开原市","铁岭县","昌图县","西丰县");
Province_City[ArrahLength][2][13]=Array("双塔区","龙城区","凌源市","北票市","朝阳县","建平县","喀喇沁左翼蒙古族自治县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;

Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="吉林";
Province_City[ArrahLength][1]=new Array("长春市","吉林市","四平市","辽源市","通化市","白山市","松原市","白城市","延边朝鲜族自治州");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("朝阳区","宽城区","二道区","南关区","绿园区","双阳区","九台市","榆树市","德惠市","农安县");
Province_City[ArrahLength][2][1]=Array("船营区","昌邑区","龙潭区","丰满区","舒兰市","桦甸市","蛟河市","磐石市","永吉县");
Province_City[ArrahLength][2][2]=Array("铁西区","铁东区","公主岭市","双辽市","梨树县","伊通满族自治县");
Province_City[ArrahLength][2][3]=Array("龙山区","西安区","东辽县","东丰县");
Province_City[ArrahLength][2][4]=Array("东昌区","二道江区","梅河口市","集安市","通化县","辉南县","柳河县");
Province_City[ArrahLength][2][5]=Array("八道江区","临江市","靖宇县","抚松县","江源县","长白朝鲜族自治县");
Province_City[ArrahLength][2][6]=Array("宁江区","乾安县","长岭县","扶余县","前郭尔罗斯蒙古族自治县");
Province_City[ArrahLength][2][7]=Array("洮北区","大安市","洮南市","镇赉县","通榆县");
Province_City[ArrahLength][2][8]=Array("延吉市","图们市","敦化市","龙井市","珲春市","和龙市","安图县","汪清县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="黑龙江";
Province_City[ArrahLength][1]=new Array("哈尔滨市","齐齐哈尔市","鹤岗市","双鸭山市","鸡西市","大庆市","伊春市","牡丹江市","佳木斯市","七台河市","黑河市","绥化市","大兴安岭地区");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("松北区","道里区","南岗区","动力区","平房区","香坊区","道外区","呼兰区","阿城市","尚志市","双城市","五常市","方正县","宾县","依兰县","巴彦县","通河县","木兰县","延寿县");
Province_City[ArrahLength][2][1]=Array("龙沙区","昂昂溪区","铁峰区","建华区","富拉尔基区","碾子山区","梅里斯达斡尔族区","讷河市","富裕县","拜泉县","甘南县","依安县","克山县","泰来县","克东县","龙江县");
Province_City[ArrahLength][2][2]=Array("兴山区","工农区","南山区","兴安区","向阳区","东山区","萝北县","绥滨县");
Province_City[ArrahLength][2][3]=Array("尖山区","岭东区","四方台区","宝山区","集贤县","宝清县","友谊县","饶河县");
Province_City[ArrahLength][2][4]=Array("鸡冠区","恒山区","城子河区","滴道区","梨树区","麻山区","密山市","虎林市","鸡东县");
Province_City[ArrahLength][2][5]=Array("萨尔图区","红岗区","龙凤区","让胡路区","大同区","林甸县","肇州县","肇源县","杜尔伯特蒙古族自治县");
Province_City[ArrahLength][2][6]=Array("伊春区","带岭区","南岔区","金山屯区","西林区","美溪区","乌马河区","翠峦区","友好区","上甘岭区","五营区","红星区新青区","汤旺河区","乌伊岭区","铁力市","嘉荫县");
Province_City[ArrahLength][2][7]=Array("爱民区","东安区","阳明区","西安区","绥芬河市","宁安市","海林市","穆棱市","林口县","东宁县");
Province_City[ArrahLength][2][8]=Array("前进区","永红区","向阳区","东风区","郊区","同江市","富锦市","桦川县","抚远县","桦南县","汤原县");
Province_City[ArrahLength][2][9]=Array("桃山区","新兴区","茄子河区","勃利县");
Province_City[ArrahLength][2][10]=Array("爱辉区","北安市","五大连池市","逊克县","嫩江县","孙吴县");
Province_City[ArrahLength][2][11]=Array("北林区","安达市","肇东市","海伦市","绥棱县","兰西县","明水县","青冈县","庆安县","望奎县");
Province_City[ArrahLength][2][12]=Array("呼玛县","塔河县","漠河县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;

/*
Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="上海";
Province_City[ArrahLength][1]=new Array("市辖区");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("黄浦区","卢湾区","徐汇区","长宁区","静安区","普陀区","闸北区","虹口区","杨浦区","宝山区","闵行区","嘉定区","浦东新区","金山区","松江区","青浦区","南汇区","奉贤区","崇明县");
Province_City[ArrahLength][3] =1;
ArrahLength++;
*/

Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="上海";
Province_City[ArrahLength][1]=new Array("黄浦区","卢湾区","徐汇区","长宁区","静安区","普陀区","闸北区","虹口区","杨浦区","宝山区","闵行区","嘉定区","浦东新区","金山区","松江区","青浦区","南汇区","奉贤区","崇明县");
Province_City[ArrahLength][2] = 1;
Province_City[ArrahLength][3] = 1;
ArrahLength++;



Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="江苏";
Province_City[ArrahLength][1]=new Array("南京市","无锡市","徐州市","常州市","苏州市","南通市","连云港市","淮安市","盐城市","扬州市","镇江市","泰州市","宿迁市");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("玄武区","鼓楼区","建邺区","白下区","秦淮区","下关区","雨花台区","浦口区","栖霞区","江宁区","六合区","溧水县","高淳县");
Province_City[ArrahLength][2][1]=Array("崇安区","北塘区","南长区","锡山区","惠山区","滨湖区","江阴市","宜兴市");
Province_City[ArrahLength][2][2]=Array("云龙区","鼓楼区","九里区","贾汪区","泉山区","邳州市","新沂市","铜山县","睢宁县","沛县","丰县");
Province_City[ArrahLength][2][3]=Array("钟楼区","天宁区","戚墅堰区","新北区","武进区","金坛市","溧阳市");
Province_City[ArrahLength][2][4]=Array("金阊区","沧浪区","平江区","虎丘区","吴中区","相城区","常熟市","张家港市","太仓市","昆山市","吴江市");
Province_City[ArrahLength][2][5]=Array("崇川区","港闸区","如皋市","通州市","海门市","启东市","海安县","如东县");
Province_City[ArrahLength][2][6]=Array("新浦区","连云区","海州区","东海县","灌云县","赣榆县","灌南县");
Province_City[ArrahLength][2][7]=Array("清河区","清浦区","楚州区","淮阴区","涟水县","洪泽县","金湖县","盱眙县");
Province_City[ArrahLength][2][8]=Array("亭湖区","盐都区","东台市","大丰市","建湖县","响水县","阜宁县","射阳县","滨海县");
Province_City[ArrahLength][2][9]=Array("广陵区","维扬区","邗江区","高邮市","江都市","仪征市","宝应县");
Province_City[ArrahLength][2][10]=Array("京口区","润州区","丹徒区","丹阳市","扬中市","句容市");
Province_City[ArrahLength][2][11]=Array("海陵区","高港区","泰兴市","姜堰市","靖江市","兴化市");
Province_City[ArrahLength][2][12]=Array("宿城区","宿豫区","沭阳县","泗阳县","泗洪县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="浙江";
Province_City[ArrahLength][1]=new Array("杭州市","宁波市","温州市","嘉兴市","湖州市","绍兴市","金华市","衢州市","舟山市","台州市","丽水市");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("拱墅区","西湖区","上城区","下城区","江干区","滨江区","余杭区","萧山区","建德市","富阳市","临安市","桐庐县","淳安县");
Province_City[ArrahLength][2][1]=Array("海曙区","江东区","江北区","镇海区","北仑区","鄞州区","余姚市","慈溪市","奉化市","宁海县","象山县");
Province_City[ArrahLength][2][2]=Array("鹿城区","龙湾区","瓯海区","瑞安市","乐清市","永嘉县","洞头县","平阳县","苍南县","文成县","泰顺县");
Province_City[ArrahLength][2][3]=Array("南湖区","秀洲区","海宁市","平湖市","桐乡市","嘉善县","海盐县");
Province_City[ArrahLength][2][4]=Array("吴兴区","南浔区","长兴县","德清县","安吉县");
Province_City[ArrahLength][2][5]=Array("越城区","诸暨市","上虞市","嵊州市","绍兴县","新昌县");
Province_City[ArrahLength][2][6]=Array("婺城区","金东区","兰溪市","义乌市","东阳市","永康市","武义县","浦江县","磐安县");
Province_City[ArrahLength][2][7]=Array("柯城区","衢江区","江山市","龙游县","常山县","开化县");
Province_City[ArrahLength][2][8]=Array("定海区","普陀区","岱山县","嵊泗县");
Province_City[ArrahLength][2][9]=Array("椒江区","黄岩区","路桥区","临海市","温岭市","玉环县","天台县","仙居县","三门县");
Province_City[ArrahLength][2][10]=Array("莲都区","龙泉市","缙云县","青田县","云和县","遂昌县","松阳县","庆元县","景宁畲族自治县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;



Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="安徽";
Province_City[ArrahLength][1]= new Array("合肥市","芜湖市","蚌埠市","淮南市","马鞍山市","淮北市","铜陵市","安庆市","黄山市","滁州市","阜阳市","宿州市","巢湖市","六安市","亳州市","池州市","宣城市");
Province_City[ArrahLength][2]= new Array();
Province_City[ArrahLength][2][0]=Array("庐阳区","瑶海区","蜀山区","包河区","长丰县","肥东县","肥西县");
Province_City[ArrahLength][2][1]=Array("镜湖区","新芜区","马塘区","鸠江区","芜湖县","南陵县","繁昌县");
Province_City[ArrahLength][2][2]=Array("蚌山区","龙子湖区","禹会区","淮上区","怀远县","固镇县","五河县");
Province_City[ArrahLength][2][3]=Array("田家庵区","大通区","谢家集区","八公山区","潘集区","凤台县");
Province_City[ArrahLength][2][4]=Array("雨山区","花山区","金家庄区","当涂县");
Province_City[ArrahLength][2][5]=Array("相山区","杜集区","烈山区","濉溪县");
Province_City[ArrahLength][2][6]=Array("铜官山区","狮子山区","郊区","铜陵县");
Province_City[ArrahLength][2][7]=Array("迎江区","大观区","宜秀区","桐城市","宿松县","枞阳县","太湖县","怀宁县","岳西县","望江县","潜山县");
Province_City[ArrahLength][2][8]=Array("屯溪区","黄山区","徽州区","休宁县","歙县","祁门县","黟县");
Province_City[ArrahLength][2][9]=Array("琅琊区","南谯区","天长市","明光市","全椒县","来安县","定远县","凤阳县");
Province_City[ArrahLength][2][10]=Array("颍州区","颍东区","颍泉区","界首市","临泉县","颍上县","阜南县","太和县");
Province_City[ArrahLength][2][11]=Array("埇桥区","萧县","泗县","砀山县","灵璧县");
Province_City[ArrahLength][2][12]=Array("居巢区","含山县","无为县","庐江县","和县");
Province_City[ArrahLength][2][13]=Array("金安区","裕安区","寿县","霍山县","霍邱县","舒城县","金寨县");
Province_City[ArrahLength][2][14]=Array("谯城区","利辛县","涡阳县","蒙城县");
Province_City[ArrahLength][2][15]=Array("贵池区","东至县","石台县","青阳县");
Province_City[ArrahLength][2][16]=Array("宣州区","宁国市","广德县","郎溪县","泾县","旌德县","绩溪县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="福建";
Province_City[ArrahLength][1]=new Array("福州市","厦门市","莆田市","三明市","泉州市","漳州市","南平市","龙岩市","宁德市");
Province_City[ArrahLength][2]= new Array();
Province_City[ArrahLength][2][0]=Array("鼓楼区","台江区","仓山区","马尾区","晋安区","福清市","长乐市","闽侯县","闽清县","永泰县","连江县","罗源县","平潭县");
Province_City[ArrahLength][2][1]=Array("思明区","海沧区","湖里区","集美区","同安区","翔安区");
Province_City[ArrahLength][2][2]=Array("城厢区","涵江区","荔城区","秀屿区","仙游县");
Province_City[ArrahLength][2][3]=Array("梅列区","三元区","永安市","明溪县","将乐县","大田县","宁化县","建宁县","沙县","尤溪县","清流县","泰宁县");
Province_City[ArrahLength][2][4]=Array("鲤城区","丰泽区","洛江区","泉港区","石狮市","晋江市","南安市","惠安县","永春县","安溪县","德化县","金门县");
Province_City[ArrahLength][2][5]=Array("芗城区","龙文区","龙海市","平和县","南靖县","诏安县","漳浦县","华安县","东山县","长泰县","云霄县");
Province_City[ArrahLength][2][6]=Array("延平区","建瓯市","邵武市","武夷山市","建阳市","松溪县","光泽县","顺昌县","浦城县","政和县");
Province_City[ArrahLength][2][7]=Array("新罗区","漳平市","长汀县","武平县","上杭县","永定县","连城县");
Province_City[ArrahLength][2][8]=Array("蕉城区","福安市","福鼎市","寿宁县","霞浦县","柘荣县","屏南县","古田县","周宁县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="江西";
Province_City[ArrahLength][1]=new Array("南昌市","景德镇市","萍乡市","九江市","新余市","鹰潭市","赣州市","吉安市","宜春市","抚州市","上饶市");
Province_City[ArrahLength][2]= new Array();
Province_City[ArrahLength][2][0]=Array("东湖区","西湖区","青云谱区","湾里区","青山湖区","新建县","南昌县","进贤县","安义县");
Province_City[ArrahLength][2][1]=Array("珠山区","昌江区","乐平市","浮梁县");
Province_City[ArrahLength][2][2]=Array("安源区","湘东区","莲花县","上栗县","芦溪县");
Province_City[ArrahLength][2][3]=Array("浔阳区","庐山区","瑞昌市","九江县","星子县","武宁县","彭泽县","永修县","修水县","湖口县","德安县","都昌县");
Province_City[ArrahLength][2][4]=Array("渝水区","分宜县");
Province_City[ArrahLength][2][5]=Array("月湖区","贵溪市","余江县");
Province_City[ArrahLength][2][6]=Array("章贡区","瑞金市","南康市","石城县","安远县","赣县","宁都县","寻乌县","兴国县","定南县","上犹县","于都县","龙南县","崇义县","信丰县","全南县","大余县","会昌县");
Province_City[ArrahLength][2][7]=Array("吉州区","青原区","井冈山市","吉安县","永丰县","永新县","新干县","泰和县","峡江县","遂川县","安福县","吉水县","万安县");
Province_City[ArrahLength][2][8]=Array("袁州区","丰城市","樟树市","高安市","铜鼓县","靖安县","宜丰县","奉新县","万载县","上高县");
Province_City[ArrahLength][2][9]=Array("临川区","南丰县","乐安县","金溪县","南城县","东乡县","资溪县","宜黄县","广昌县","黎川县","崇仁县");
Province_City[ArrahLength][2][10]=Array("信州区","德兴市","上饶县","广丰县","鄱阳县","婺源县","铅山县","余干县","横峰县","弋阳县","玉山县","万年县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="山东";
Province_City[ArrahLength][1]=new Array("济南市","青岛市","淄博市","枣庄市","东营市","潍坊市","烟台市","威海市","济宁市","泰安市","日照市","莱芜市","临沂市","德州市","聊城市","滨州市","菏泽市");
Province_City[ArrahLength][2]= new Array();
Province_City[ArrahLength][2][0]=Array("市中区","历下区","天桥区","槐荫区","历城区","长清区","章丘市","平阴县","济阳县","商河县");
Province_City[ArrahLength][2][1]=Array("市南区","市北区","城阳区","四方区","李沧区","黄岛区","崂山区","胶南市","胶州市","平度市","莱西市","即墨市");
Province_City[ArrahLength][2][2]=Array("张店区","临淄区","淄川区","博山区","周村区","桓台县","高青县","沂源县");
Province_City[ArrahLength][2][3]=Array("市中区","山亭区","峄城区","台儿庄区","薛城区","滕州市");
Province_City[ArrahLength][2][4]=Array("东营区","河口区","垦利县","广饶县","利津县");
Province_City[ArrahLength][2][5]=Array("潍城区","寒亭区","坊子区","奎文区","青州市","诸城市","寿光市","安丘市","高密市","昌邑市","昌乐县","临朐县");
Province_City[ArrahLength][2][6]=Array("芝罘区","福山区","牟平区","莱山区","龙口市","莱阳市","莱州市","招远市","蓬莱市","栖霞市","海阳市","长岛县");
Province_City[ArrahLength][2][7]=Array("环翠区","乳山市","文登市","荣成市");
Province_City[ArrahLength][2][8]=Array("市中区","任城区","曲阜市","兖州市","邹城市","鱼台县","金乡县","嘉祥县","微山县","汶上县","泗水县","梁山县");
Province_City[ArrahLength][2][9]=Array("泰山区","岱岳区","新泰市","肥城市","宁阳县","东平县");
Province_City[ArrahLength][2][10]=Array("东港区","岚山区","五莲县","莒县");
Province_City[ArrahLength][2][11]=Array("莱城区","钢城区");
Province_City[ArrahLength][2][12]=Array("兰山区","罗庄区","河东区","沂南县","郯城县","沂水县","苍山县","费县","平邑县","莒南县","蒙阴县","临沭县");
Province_City[ArrahLength][2][13]=Array("德城区","乐陵市","禹城市","陵县","宁津县","齐河县","武城县","庆云县","平原县","夏津县","临邑县","经济开发区","运河经济开发区");
Province_City[ArrahLength][2][14]=Array("东昌府区","临清市","高唐县","阳谷县","茌平县","莘县","东阿县","冠县");
Province_City[ArrahLength][2][15]=Array("滨城区","邹平县","沾化县","惠民县","博兴县","阳信县","无棣县");
Province_City[ArrahLength][2][16]=Array("牡丹区","鄄城县","单县","郓城县","曹县","定陶县","巨野县","东明县","成武县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;



Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="河南";
Province_City[ArrahLength][1]=new Array("郑州","开封","洛阳","平顶山","安阳","鹤壁","新乡","焦作","濮阳","许昌","漯河","三门峡","南阳","商丘","信阳","巩义","荥阳","新密","新郑","登封","偃师","舞钢","汝州","林州","卫辉","辉县","济源","沁阳","孟州","禹州","长葛","义马","灵宝","邓州","永城","周口","项城","驻马店");
Province_City[ArrahLength][2]= new Array();
Province_City[ArrahLength][2][0]=Array("中原区","金水区","二七区","管城回族区","上街区","惠济区","巩义市","新郑市","新密市","登封市","荥阳市","中牟县");
Province_City[ArrahLength][2][1]=Array("鼓楼区","龙亭区","顺河回族区","南关区","郊区","开封县","尉氏县","兰考县","杞县","通许县");
Province_City[ArrahLength][2][2]=Array("西工区","老城区","涧西区","瀍河回族区洛龙区","吉利区","偃师市","孟津县","汝阳县","伊川县","洛宁县","嵩县","宜阳县","新安县","栾川县");
Province_City[ArrahLength][2][3]=Array("新华区","卫东区","湛河区","石龙区","汝州市","舞钢市","宝丰县","叶县","郏县","鲁山县");
Province_City[ArrahLength][2][4]=Array("北关区","文峰区","殷都区","龙安区","林州市","安阳县","滑县","内黄县","汤阴县");
Province_City[ArrahLength][2][5]=Array("淇滨区","山城区","鹤山区","浚县","淇县");
Province_City[ArrahLength][2][6]=Array("卫滨区","红旗区","凤泉区","牧野区","卫辉市","辉县市","新乡县","获嘉县","原阳县","长垣县","封丘县","延津县");
Province_City[ArrahLength][2][7]=Array("解放区","中站区","马村区","山阳区","沁阳市","孟州市","修武县","温县","武陟县","博爱县");
Province_City[ArrahLength][2][8]=Array("华龙区","濮阳县","南乐县","台前县","清丰县","范县");
Province_City[ArrahLength][2][9]=Array("魏都区","禹州市","长葛市","许昌县","鄢陵县","襄城县");
Province_City[ArrahLength][2][10]=Array("源汇区","郾城区","召陵区","临颍县","舞阳县");
Province_City[ArrahLength][2][11]=Array("湖滨区","义马市","灵宝市","渑池县","卢氏县","陕县");
Province_City[ArrahLength][2][12]=Array("卧龙区","宛城区","邓州市","桐柏县","方城县","淅川县","镇平县","唐河县","南召县","内乡县","新野县","社旗县","西峡县");
Province_City[ArrahLength][2][13]=Array("梁园区","睢阳区","永城市","宁陵县","虞城县","民权县","夏邑县","柘城县","睢县");
Province_City[ArrahLength][2][14]=Array("浉河区","平桥区","潢川县","淮滨县","息县","新县","商城县","固始县","罗山县","光山县");
Province_City[ArrahLength][2][15]=Array("川汇区","项城市","商水县","淮阳县","太康县","鹿邑县","西华县","扶沟县","沈丘县","郸城县");
Province_City[ArrahLength][2][16]=Array("驿城区","确山县","新蔡县","上蔡县","西平县","泌阳县","平舆县","汝南县","遂平县","正阳县");
Province_City[ArrahLength][2][17]=Array("济源市");
Province_City[ArrahLength][3] = 1;
ArrahLength++;




Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="湖北";
Province_City[ArrahLength][1]=new Array("武汉市","黄石市","襄樊市","十堰市","荆州市","宜昌市","荆门市","鄂州市","孝感市","黄冈市","咸宁市","随州市","恩施土家族苗族自治州","省直辖行政单位");
Province_City[ArrahLength][2]= new Array();
Province_City[ArrahLength][2][0]=Array("江岸区","武昌区","江汉区","硚口区","汉阳区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区");
Province_City[ArrahLength][2][1]=Array("黄石港区","西塞山区","下陆区","铁山区","大冶市","阳新县");
Province_City[ArrahLength][2][2]=Array("襄城区","樊城区","襄阳区","老河口市","枣阳市","宜城市","南漳县","谷城县","保康县");
Province_City[ArrahLength][2][3]=Array("张湾区","茅箭区","丹江口市","郧县","竹山县","房县","郧西县","竹溪县");
Province_City[ArrahLength][2][4]=Array("沙市区","荆州区","洪湖市","石首市","松滋市","监利县","公安县","江陵县");
Province_City[ArrahLength][2][5]=Array("西陵区","伍家岗区","点军区","猇亭区","夷陵区","宜都市","当阳市","枝江市","秭归县","远安县","兴山县","五峰土家族自治县","长阳土家族自治县");
Province_City[ArrahLength][2][6]=Array("东宝区","掇刀区","钟祥市","京山县","沙洋县");
Province_City[ArrahLength][2][7]=Array("鄂城区","华容区","梁子湖区");
Province_City[ArrahLength][2][8]=Array("孝南区","应城市","安陆市","汉川市","云梦县","大悟县","孝昌县");
Province_City[ArrahLength][2][9]=Array("黄州区","麻城市","武穴市","红安县","罗田县","浠水县","蕲春县","黄梅县","英山县","团风县");
Province_City[ArrahLength][2][10]=Array("咸安区","赤壁市","嘉鱼县","通山县","崇阳县","通城县");
Province_City[ArrahLength][2][11]=Array("曾都区","广水市");
Province_City[ArrahLength][2][12]=Array("恩施市","利川市","建始县","来凤县","巴东县","鹤峰县","宣恩县","咸丰县");
Province_City[ArrahLength][2][13]=Array("仙桃市","天门市","潜江市","神农架林区");
Province_City[ArrahLength][3] = 1;
ArrahLength++;



Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="湖南";
Province_City[ArrahLength][1]=new Array("长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永州市","怀化市","娄底市","湘西州");
Province_City[ArrahLength][2]= new Array();
Province_City[ArrahLength][2][0]=Array("岳麓区","芙蓉区","天心区","开福区","雨花区","浏阳市","长沙县","望城县","宁乡县");
Province_City[ArrahLength][2][1]=Array("天元区","荷塘区","芦淞区","石峰区","醴陵市","株洲县","炎陵县","茶陵县","攸县");
Province_City[ArrahLength][2][2]=Array("雨湖区","岳塘区","湘乡市","韶山市","湘潭县");
Province_City[ArrahLength][2][3]=Array("雁峰区","珠晖区","石鼓区","蒸湘区","南岳区","耒阳市","常宁市","衡阳县","衡东县","衡山县","衡南县","祁东县");
Province_City[ArrahLength][2][4]=Array("双清区","大祥区","北塔区","武冈市","邵东县","洞口县","新邵县","绥宁县","新宁县","邵阳县","隆回县","城步苗族自治县");
Province_City[ArrahLength][2][5]=Array("岳阳楼区","君山区","云溪区","临湘市","汨罗市","岳阳县","湘阴县","平江县","华容县");
Province_City[ArrahLength][2][6]=Array("武陵区","鼎城区","津市市","澧县","临澧县","桃源县","汉寿县","安乡县","石门县");
Province_City[ArrahLength][2][7]=Array("永定区","武陵源区","慈利县","桑植县");
Province_City[ArrahLength][2][8]=Array("赫山区","资阳区","沅江市","桃江县","南县","安化县");
Province_City[ArrahLength][2][9]=Array("北湖区","苏仙区","资兴市","宜章县","汝城县","安仁县","嘉禾县","临武县","桂东县","永兴县","桂阳县");
Province_City[ArrahLength][2][10]=Array("冷水滩区","芝山区","祁阳县","蓝山县","宁远县","新田县","东安县","江永县","道县","双牌县","江华瑶族自治县");
Province_City[ArrahLength][2][11]=Array("鹤城区","洪江市","会同县","沅陵县","辰溪县","溆浦县","中方县","新晃侗族自治县","芷江侗族自治县","通道侗族自治县","靖州苗族侗族自治县","麻阳苗族自治县");
Province_City[ArrahLength][2][12]=Array("娄星区","冷水江市","涟源市","新化县","双峰县");
Province_City[ArrahLength][2][13]=Array("吉首市","古丈县","龙山县","永顺县","凤凰县","泸溪县","保靖县","花垣县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;


//18

Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="广东";
Province_City[ArrahLength][1]=new Array("广州市","深圳市","珠海市","汕头市","韶关市","佛山市","江门市","湛江市","茂名市","肇庆市","惠州市","梅州市","汕尾市","河源市","阳江市","清远市","东莞市","中山市","潮州市","揭阳市","云浮市");
/* 定义区数据 三维数组的下标要和城市名称的下标对应*/
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("越秀区越秀区","海珠区","荔湾区","天河区","白云区","黄埔区","花都区","番禺区","南沙区","萝岗区","从化市","增城市海珠区","荔湾区","天河区","白云区","黄埔区","花都区","番禺区","南沙区","萝岗区","从化市","增城市");
Province_City[ArrahLength][2][1]=Array("福田区","罗湖区","南山区","宝安区","龙岗区","盐田区");
Province_City[ArrahLength][2][2]=Array("香洲区","斗门区","金湾区");
Province_City[ArrahLength][2][3]=Array("金平区","龙湖区","濠江区","澄海区","潮阳区","潮南区","南澳县");
Province_City[ArrahLength][2][4]=Array("浈江区","武江区","曲江区","乐昌市","南雄市","仁化县","始兴县","翁源县","新丰县","乳源瑶族自治县");
Province_City[ArrahLength][2][5]=Array("禅城区","南海区","顺德区","三水区","高明区");
Province_City[ArrahLength][2][6]=Array("江海区","蓬江区","新会区","台山市","开平市","鹤山市","恩平市");
Province_City[ArrahLength][2][7]=Array("赤坎区","霞山区","坡头区","麻章区","廉江市","雷州市","吴川市","遂溪县","徐闻县");
Province_City[ArrahLength][2][8]=Array("茂南区","茂港区","高州市","化州市","信宜市","电白县");
Province_City[ArrahLength][2][9]=Array("端州区","鼎湖区","高要市","四会市","广宁县","德庆县","封开县","怀集县");
Province_City[ArrahLength][2][10]=Array("惠城区","惠阳区","惠东县","博罗县","龙门县");
Province_City[ArrahLength][2][11]=Array("梅江区","兴宁市","梅县","蕉岭县","大埔县","丰顺县","五华县","平远县");
Province_City[ArrahLength][2][12]=Array("城区","陆丰市","海丰县","陆河县");
Province_City[ArrahLength][2][13]=Array("源城区","和平县","龙川县","紫金县","连平县","东源县");
Province_City[ArrahLength][2][14]=Array("江城区","阳春市","阳西县","阳东县");
Province_City[ArrahLength][2][15]=Array("清城区","英德市","连州市","佛冈县","阳山县","清新县","连山壮族瑶族自治县","连南瑶族自治县");
Province_City[ArrahLength][2][16]=Array("市区");
Province_City[ArrahLength][2][17]=Array("市区");
Province_City[ArrahLength][2][18]=Array("湘桥区","潮安县","饶平县");
Province_City[ArrahLength][2][19]=Array("榕城区","普宁市","揭东县","揭西县","惠来县");
Province_City[ArrahLength][2][20]=Array("云城区","罗定市","云安县","新兴县","郁南县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;



Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="广西";
Province_City[ArrahLength][1]=new Array("南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("青秀区","兴宁区","西乡塘区","良庆区","江南区","邕宁区","武鸣县","隆安县","马山县","上林县","宾阳县","横县");
Province_City[ArrahLength][2][1]=Array("城中区","鱼峰区","柳北区","柳南区","柳江县","柳城县","鹿寨县","融安县","融水苗族自治县","三江侗族自治县");
Province_City[ArrahLength][2][2]=Array("秀峰区","叠彩区","象山区","七星区","雁山区","阳朔县","临桂县","灵川县","全州县","平乐县","兴安县","灌阳县","荔浦县","资源县","永福县","龙胜各族自治县","恭城瑶族自治县");
Province_City[ArrahLength][2][3]=Array("万秀区","蝶山区","长洲区","岑溪市","苍梧县","藤县","蒙山县");
Province_City[ArrahLength][2][4]=Array("海城区","银海区","铁山港区","合浦县");
Province_City[ArrahLength][2][5]=Array("港口区","防城区","东兴市","上思县");
Province_City[ArrahLength][2][6]=Array("钦南区","钦北区","灵山县","浦北县");
Province_City[ArrahLength][2][7]=Array("港北区","港南区","覃塘区","桂平市","平南县");
Province_City[ArrahLength][2][8]=Array("玉州区","北流市","容县","陆川县","博白县","兴业县");
Province_City[ArrahLength][2][9]=Array("右江区","凌云县","平果县","西林县","乐业县","德保县","田林县","田阳县","靖西县","田东县","那坡县","隆林各族自治县");
Province_City[ArrahLength][2][10]=Array("八步区","钟山县","昭平县","富川瑶族自治县");
Province_City[ArrahLength][2][11]=Array("金城江区","宜州市","天峨县","凤山县","南丹县","东兰县","都安瑶族自治县","罗城仫佬族自治县","巴马瑶族自治县","环江毛南族自治县","大化瑶族自治县");
Province_City[ArrahLength][2][12]=Array("兴宾区","合山市","象州县","武宣县","忻城县","金秀瑶族自治县");
Province_City[ArrahLength][2][13]=Array("江州区","凭祥市","宁明县","扶绥县","龙州县","大新县","天等县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;



/*
Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="海南";
Province_City[ArrahLength][1]=new Array("海口市","三亚市","省直辖行政单位");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("龙华区","秀英区","琼山区","美兰区");
Province_City[ArrahLength][2][1]=Array("市辖区");
Province_City[ArrahLength][2][2]=Array("五指山市","琼海市","儋州市","文昌市","万宁市","东方市","澄迈县","定安县","屯昌县","临高县","白沙黎族自治县","昌江黎族自治县","乐东黎族自治县","陵水黎族自治县","保亭黎族苗族自治县","琼中黎族苗族自治县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;
*/


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="海南";
Province_City[ArrahLength][1]=new Array("海口","三亚","五指山","琼海","儋州","文昌","万宁","东方","安定","屯昌","澄迈","临高","白沙","昌江","乐东","陵水","保亭","琼中","西沙","南沙","中沙");
Province_City[ArrahLength][2] = 1;
Province_City[ArrahLength][3] = 1;
ArrahLength++;


/*
Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="重庆";
Province_City[ArrahLength][1]=new Array("市辖区","县级市");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("渝中区","大渡口区","江北区","沙坪坝区","九龙坡区","南岸区","北碚区","万盛区","双桥区","渝北区","巴南区","万州区","涪陵区","黔江区","长寿区");
Province_City[ArrahLength][2][1]=Array("永川市","合川市","江津市","南川市","綦江县","潼南县","荣昌县","璧山县","大足县","铜梁县","梁平县","城口县","垫江县","武隆县","丰都县","奉节县","开县","云阳县","忠县","巫溪县","巫山县","石柱土家族自治县","秀山土家族苗族自治县","酉阳土家族苗族自治县","彭水苗族土家族自治县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;
*/

Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="重庆";
Province_City[ArrahLength][1]=new Array("渝中区","大渡口区","江北区","沙坪坝区","九龙坡区","南岸区","北碚区","万盛区","双桥区","渝北区","巴南区","万州区","涪陵区","黔江区","长寿区","永川市","合川市","江津市","南川市","綦江县","潼南县","荣昌县","璧山县","大足县","铜梁县","梁平县","城口县","垫江县","武隆县","丰都县","奉节县","开县","云阳县","忠县","巫溪县","巫山县","石柱土家族自治县","秀山土家族苗族自治县","酉阳土家族苗族自治县","彭水苗族土家族自治县");
Province_City[ArrahLength][2] = 1;
Province_City[ArrahLength][3] = 1;
ArrahLength++;


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="四川";
Province_City[ArrahLength][1]=new Array("成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","内江市","乐山市","南充市","眉山市","宜宾市","广安市","达州市","雅安市","巴中市","资阳市","阿坝藏族羌族自治州","甘孜藏族自治州","凉山彝族自治州");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("青羊区","锦江区","金牛区","武侯区","成华区","龙泉驿区","青白江区","新都区","温江区","都江堰市","彭州市","邛崃市","崇州市","金堂县","郫县","新津县","双流县","蒲江县","大邑县");
Province_City[ArrahLength][2][1]=Array("大安区","自流井区","贡井区","沿滩区","荣县","富顺县");
Province_City[ArrahLength][2][2]=Array("东区","西区","仁和区","米易县","盐边县");
Province_City[ArrahLength][2][3]=Array("江阳区","纳溪区","龙马潭区","泸县","合江县","叙永县","古蔺县");
Province_City[ArrahLength][2][4]=Array("旌阳区","广汉市","什邡市","绵竹市","罗江县","中江县");
Province_City[ArrahLength][2][5]=Array("涪城区","游仙区","江油市","盐亭县","三台县","平武县","安县","梓潼县","北川羌族自治县");
Province_City[ArrahLength][2][6]=Array("市中区","元坝区","朝天区","青川县","旺苍县","剑阁县","苍溪县");
Province_City[ArrahLength][2][7]=Array("船山区","安居区","射洪县","蓬溪县","大英县");
Province_City[ArrahLength][2][8]=Array("市中区","东兴区","资中县","隆昌县","威远县");
Province_City[ArrahLength][2][9]=Array("市中区","五通桥区","沙湾区","金口河区","峨眉山市","夹江县","井研县","犍为县","沐川县","马边彝族自治县","峨边彝族自治县");
Province_City[ArrahLength][2][10]=Array("顺庆区","高坪区","嘉陵区","阆中市","营山县","蓬安县","仪陇县","南部县","西充县");
Province_City[ArrahLength][2][11]=Array("东坡区","仁寿县","彭山县","洪雅县","丹棱县","青神县");
Province_City[ArrahLength][2][12]=Array("翠屏区","宜宾县","兴文县","南溪县","珙县","长宁县","高县","江安县","筠连县","屏山县");
Province_City[ArrahLength][2][13]=Array("广安区","华蓥市","岳池县","邻水县","武胜县");
Province_City[ArrahLength][2][14]=Array("通川区","万源市","达县","渠县","宣汉县","开江县","大竹县");
Province_City[ArrahLength][2][15]=Array("雨城区","芦山县","石棉县","名山县","天全县","荥经县","宝兴县","汉源县");
Province_City[ArrahLength][2][16]=Array("巴州区","南江县","平昌县","通江县");
Province_City[ArrahLength][2][17]=Array("雁江区","简阳市","安岳县","乐至县");
Province_City[ArrahLength][2][18]=Array("马尔康县","九寨沟县","红原县","汶川县","阿坝县","理县","若尔盖县","小金县","黑水县","金川县","松潘县","壤塘县","茂县");
Province_City[ArrahLength][2][19]=Array("康定县","丹巴县","炉霍县","九龙县","甘孜县","雅江县","新龙县","道孚县","白玉县","理塘县","德格县","乡城县","石渠县","稻城县","色达县","巴塘县","泸定县","得荣县");
Province_City[ArrahLength][2][20]=Array("西昌市","美姑县","昭觉县","金阳县","甘洛县","布拖县","雷波县","普格县","宁南县","喜德县","会东县","越西县","会理县","盐源县","德昌县","冕宁县","木里藏族自治县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="贵州";
Province_City[ArrahLength][1]=new Array("贵阳市","六盘水市","遵义市","安顺市","铜仁地区","毕节地区","黔西南布依族苗族自治州","黔东南苗族侗族自治州","黔南布依族苗族自治州");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("南明区","云岩区","花溪区","乌当区","白云区","小河区","清镇市","开阳县","修文县","息烽县");
Province_City[ArrahLength][2][1]=Array("钟山区","水城县","盘县","六枝特区");
Province_City[ArrahLength][2][2]=Array("红花岗区","汇川区","赤水市","仁怀市","遵义县","绥阳县","桐梓县","习水县","凤冈县","正安县","余庆县","湄潭县","道真仡佬族苗族自治县","务川仡佬族苗族自治县");
Province_City[ArrahLength][2][3]=Array("西秀区","普定县","平坝县","镇宁布依族苗族自治县","紫云苗族布依族自治县","关岭布依族苗族自治县");
Province_City[ArrahLength][2][4]=Array("铜仁市","德江县","江口县","思南县","石阡县","玉屏侗族自治县","松桃苗族自治县","印江土家族苗族自治县","沿河土家族自治县","万山特区");
Province_City[ArrahLength][2][5]=Array("毕节市","黔西县","大方县","织金县","金沙县","赫章县","纳雍县","威宁彝族回族苗族自治县");
Province_City[ArrahLength][2][6]=Array("兴义市","望谟县","兴仁县","普安县","册亨县","晴隆县","贞丰县","安龙县");
Province_City[ArrahLength][2][7]=Array("凯里市","施秉县","从江县","锦屏县","镇远县","麻江县","台江县","天柱县","黄平县","榕江县","剑河县","三穗县","雷山县","黎平县","岑巩县","丹寨县");
Province_City[ArrahLength][2][8]=Array("都匀市","福泉市","贵定县","惠水县","罗甸县","瓮安县","荔波县","龙里县","平塘县","长顺县","独山县","三都水族自治县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="云南";
Province_City[ArrahLength][1]=new Array("昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","思茅市","临沧市","文山州","红河州","西双版纳州","楚雄州","大理州","德宏州","怒江州","迪庆州");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("盘龙区","五华区","官渡区","西山区","东川区","安宁市","富民县","嵩明县","呈贡县","晋宁县","宜良县","禄劝彝族苗族自治县","石林彝族自治县","寻甸回族自治县");
Province_City[ArrahLength][2][1]=Array("麒麟区","宣威市","陆良县","会泽县","富源县","罗平县","马龙县","师宗县","沾益县");
Province_City[ArrahLength][2][2]=Array("红塔区","华宁县","澄江县","易门县","通海县","江川县","元江哈尼族彝族傣族自治县","新平彝族傣族自治县","峨山彝族自治县");
Province_City[ArrahLength][2][3]=Array("隆阳区","施甸县","昌宁县","龙陵县","腾冲县");
Province_City[ArrahLength][2][4]=Array("昭阳区","永善县","绥江县","镇雄县","大关县","盐津县","巧家县","彝良县","威信县","水富县","鲁甸县");
Province_City[ArrahLength][2][5]=Array("古城区","华坪县","永胜县","玉龙纳西族自治县","宁蒗彝族自治县");
Province_City[ArrahLength][2][6]=Array("翠云区","普洱哈尼族彝族自治县","景东彝族自治县","镇沅彝族哈尼族拉祜族自治县","景谷彝族傣族自治县","墨江哈尼族自治县","澜沧拉祜族自治县","西盟佤族自治县","江城哈尼族彝族自治县","孟连傣族拉祜族佤族自治县");
Province_City[ArrahLength][2][7]=Array("临翔区","镇康县","凤庆县","云县","永德县","双江拉祜族佤族布朗族傣族自治县","沧源佤族自治县","耿马傣族佤族治县");
Province_City[ArrahLength][2][8]=Array("文山县","麻栗坡县","砚山县","广南县","马关县","富宁县","西畴县","丘北县");
Province_City[ArrahLength][2][9]=Array("蒙自县","个旧市","开远市","弥勒县","红河县","绿春县","泸西县","建水县","元阳县","石屏县","金平苗族瑶族傣族自治县","河口瑶族自治县","屏边苗族自治县");
Province_City[ArrahLength][2][10]=Array("景洪市","勐海县","勐腊县");
Province_City[ArrahLength][2][11]=Array("楚雄市","元谋县","南华县","牟定县","武定县","大姚县","双柏县","禄丰县","永仁县","姚安县");
Province_City[ArrahLength][2][12]=Array("大理市","剑川县","弥渡县","云龙县","洱源县","鹤庆县","祥云县","宾川县","永平县","漾濞彝族自治县","巍山彝族回族自治县","南涧彝族自治县");
Province_City[ArrahLength][2][13]=Array("潞西市","瑞丽市","盈江县","梁河县","陇川县");
Province_City[ArrahLength][2][14]=Array("泸水县","福贡县","兰坪白族普米族自治县","贡山独龙族怒族自治县");
Province_City[ArrahLength][2][15]=Array("香格里拉县","德钦县","维西傈僳族自治县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="陕西";
Province_City[ArrahLength][1]=new Array("西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("莲湖区","新城区","碑林区","雁塔区","灞桥区","未央区","阎良区","临潼区","长安区","高陵县","蓝田县","户县","周至县");
Province_City[ArrahLength][2][1]=Array("耀州区","王益区","印台区","宜君县");
Province_City[ArrahLength][2][2]=Array("渭滨区","金台区","陈仓区","岐山县","凤翔县","陇县","太白县","麟游县","扶风县","千阳县","眉县","凤县");
Province_City[ArrahLength][2][3]=Array("秦都区","渭城区","杨陵区","兴平市","礼泉县","泾阳县","永寿县","三原县","彬县","旬邑县","长武县","乾县","武功县","淳化县");
Province_City[ArrahLength][2][4]=Array("临渭区","韩城市","华阴市","蒲城县","潼关县","白水县","澄城县","华县","合阳县","富平县","大荔县");
Province_City[ArrahLength][2][5]=Array("宝塔区","安塞县","洛川县","子长县","黄陵县","延川县","富县","延长县","甘泉县","宜川县","志丹县","黄龙县","吴旗县");
Province_City[ArrahLength][2][6]=Array("汉台区","留坝县","镇巴县","城固县","南郑县","洋县","宁强县","佛坪县","勉县","西乡县","略阳县");
Province_City[ArrahLength][2][7]=Array("榆阳区","清涧县","绥德县","神木县","佳县","府谷县","子洲县","靖边县","横山县","米脂县","吴堡县","定边县");
Province_City[ArrahLength][2][8]=Array("汉滨区","紫阳县","岚皋县","旬阳县","镇坪县","平利县","石泉县","宁陕县","白河县","汉阴县");
Province_City[ArrahLength][2][9]=Array("商州区","镇安县","山阳县","洛南县","商南县","丹凤县","柞水县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;



Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="甘肃";
Province_City[ArrahLength][1]=new Array("兰州市","金昌市","白银市","天水市","嘉峪关市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西市","陇南市","临夏州","甘南州");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("城关区","七里河区","西固区","安宁区","红古区","永登县","榆中县","皋兰县");
Province_City[ArrahLength][2][1]=Array("金川区","永昌县");
Province_City[ArrahLength][2][2]=Array("白银区","平川区","靖远县","景泰县","会宁县");
Province_City[ArrahLength][2][3]=Array("秦州区","麦积区","武山县","甘谷县","清水县","秦安县","张家川回族自治县");
Province_City[ArrahLength][2][4]=Array("嘉峪关市");
Province_City[ArrahLength][2][5]=Array("凉州区","民勤县","古浪县","天祝藏族自治县");
Province_City[ArrahLength][2][6]=Array("甘州区","民乐县","山丹县","临泽县","高台县","肃南裕固族自治县");
Province_City[ArrahLength][2][7]=Array("崆峒区","灵台县","静宁县","崇信县","华亭县","泾川县","庄浪县");
Province_City[ArrahLength][2][8]=Array("肃州区","玉门市","敦煌市","安西县","金塔县","阿克塞哈萨克族自治县","肃北蒙古族自治县");
Province_City[ArrahLength][2][9]=Array("西峰区","庆城县","镇原县","合水县","华池县","环县","宁县","正宁县");
Province_City[ArrahLength][2][10]=Array("安定区","岷县","渭源县","陇西县","通渭县","漳县","临洮县");
Province_City[ArrahLength][2][11]=Array("武都区","成县","礼县","康县","文县","两当县","徽县","宕昌县","西和县");
Province_City[ArrahLength][2][12]=Array("临夏市","临夏县","康乐县","永靖县","广河县","和政县","东乡族自治县","积石山保安族东乡族撒拉族自治县");
Province_City[ArrahLength][2][13]=Array("合作市","临潭县","卓尼县","舟曲县","迭部县","玛曲县","碌曲县","夏河县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="青海";
Province_City[ArrahLength][1]=new Array("西宁市","海东地区","海北州","黄南州","海南州","果洛州","玉树州","海西州");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("城中区","城东区","城西区","城北区","湟源县","湟中县","大通回族土族自治县");
Province_City[ArrahLength][2][1]=Array("平安县","乐都县","民和回族土族自治县","互助土族自治县","化隆回族自治县","循化撒拉族自治县");
Province_City[ArrahLength][2][2]=Array("海晏县","祁连县","刚察县","门源回族自治县");
Province_City[ArrahLength][2][3]=Array("同仁县","泽库县","尖扎县","河南蒙古族自治县");
Province_City[ArrahLength][2][4]=Array("共和县","同德县","贵德县","兴海县","贵南县");
Province_City[ArrahLength][2][5]=Array("玛沁县","班玛县","甘德县","达日县","久治县","玛多县");
Province_City[ArrahLength][2][6]=Array("玉树县","杂多县","称多县","治多县","囊谦县","曲麻莱县");
Province_City[ArrahLength][2][7]=Array("德令哈市","格尔木市","乌兰县","天峻县","都兰县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;



Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="宁夏";
Province_City[ArrahLength][1]=new Array("银川市","石嘴山市","吴忠市","固原市","中卫市");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("兴庆区","金凤区","西夏区","灵武市","永宁县","贺兰县");
Province_City[ArrahLength][2][1]=Array("大武口区","惠农区","平罗县");
Province_City[ArrahLength][2][2]=Array("利通区","青铜峡市","同心县","盐池县");
Province_City[ArrahLength][2][3]=Array("原州区","西吉县","隆德县","泾源县","彭阳县");
Province_City[ArrahLength][2][4]=Array("沙坡头区","中宁县","海原县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;



Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="新疆";
Province_City[ArrahLength][1]=new Array("乌鲁木齐市","克拉玛依市","直辖行政单位","吐鲁番地区","哈密地区","和田地区","阿克苏地区","喀什地区","克孜勒苏州","巴音郭楞州","昌吉州","博尔塔拉州","伊犁州","塔城地区","阿勒泰地区");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("天山区","沙依巴克区","新市区","水磨沟区","头屯河区","达坂城区","东山区","乌鲁木齐县");
Province_City[ArrahLength][2][1]=Array("克拉玛依区","独山子区","白碱滩区","乌尔禾区");
Province_City[ArrahLength][2][2]=Array("石河子市","阿拉尔市","图木舒克市","五家渠市");
Province_City[ArrahLength][2][3]=Array("吐鲁番市","托克逊县","鄯善县");
Province_City[ArrahLength][2][4]=Array("哈密市","伊吾县","巴里坤哈萨克自治县");
Province_City[ArrahLength][2][5]=Array("和田市","和田县","洛浦县","民丰县","皮山县","策勒县","于田县","墨玉县");
Province_City[ArrahLength][2][6]=Array("阿克苏市","温宿县","沙雅县","拜城县","阿瓦提县","库车县","柯坪县","新和县","乌什县");
Province_City[ArrahLength][2][7]=Array("喀什市","巴楚县","泽普县","伽师县","叶城县","岳普湖县","疏勒县","麦盖提县","英吉沙县","莎车县","疏附县","塔什库尔干塔吉克自治县");
Province_City[ArrahLength][2][8]=Array("阿图什市","阿合奇县","乌恰县","阿克陶县");
Province_City[ArrahLength][2][9]=Array("库尔勒市","和静县","尉犁县","和硕县","且末县","博湖县","轮台县","若羌县","焉耆回族自治县");
Province_City[ArrahLength][2][10]=Array("昌吉市","阜康市","米泉市","奇台县","玛纳斯县","吉木萨尔县","呼图壁县","木垒哈萨克自治县");
Province_City[ArrahLength][2][11]=Array("博乐市","精河县","温泉县");
Province_City[ArrahLength][2][12]=Array("伊宁市","奎屯市","伊宁县","特克斯县","尼勒克县","昭苏县","新源县","霍城县","巩留县","察布查尔锡伯自治县");
Province_City[ArrahLength][2][13]=Array("塔城市","乌苏市","额敏县","裕民县","沙湾县","托里县","和布克赛尔蒙古自治县");
Province_City[ArrahLength][2][14]=Array("阿勒泰市","青河县","吉木乃县","富蕴县","布尔津县","福海县","哈巴河县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;

Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="西藏";
Province_City[ArrahLength][1]=new Array("拉萨市","那曲地区","昌都地区","山南地区","日喀则地区","阿里地区","林芝地区");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("城关区","林周县","达孜县","尼木县","当雄县","曲水县","墨竹工卡县","堆龙德庆县");
Province_City[ArrahLength][2][1]=Array("那曲县","嘉黎县","申扎县","巴青县","聂荣县","尼玛县","比如县","索县","班戈县","安多县");
Province_City[ArrahLength][2][2]=Array("昌都县","芒康县","贡觉县","八宿县","左贡县","边坝县","洛隆县","江达县","类乌齐县","丁青县","察雅县");
Province_City[ArrahLength][2][3]=Array("乃东县","琼结县","措美县","加查县","贡嘎县","洛扎县","曲松县","桑日县","扎囊县","错那县","隆子县","浪卡子县");
Province_City[ArrahLength][2][4]=Array("日喀则市","定结县","萨迦县","江孜县","拉孜县","定日县","康马县","聂拉木县","吉隆县","亚东县","谢通门县","昂仁县","岗巴县","仲巴县","萨嘎县","仁布县","白朗县","南木林县");
Province_City[ArrahLength][2][5]=Array("噶尔县","措勤县","普兰县","革吉县","日土县","札达县","改则县");
Province_City[ArrahLength][2][6]=Array("林芝县","墨脱县","朗县","米林县","察隅县","波密县","工布江达县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;


/*
Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="香港";
Province_City[ArrahLength][1]=new Array("香港特别行政区");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("中西区","东区","九龙城区","观塘区","南区","深水埗区","黄大仙区","湾仔区","油尖旺区","离岛区","葵青区","北区","西贡区","沙田区","屯门区","大埔区","荃湾区","元朗区");
Province_City[ArrahLength][3] = 1;
ArrahLength++;



Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="澳门";
Province_City[ArrahLength][1]=new Array("澳门特别行政区");
Province_City[ArrahLength][3] = 0;
ArrahLength++;



Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="台湾";
Province_City[ArrahLength][1]=new Array("台北市","高雄市","基隆市","台中市","台南市","新竹市","嘉义市","其他县");
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("中正区","大同区","中山区","松山区","大安区","万华区","信义区","士林区","北投区","内湖区","南港区","文山区");
Province_City[ArrahLength][2][1]=Array("新兴区","前金区","芩雅区","盐埕区","鼓山区","旗津区","前镇区","三民区","左营区","楠梓区","小港区");
Province_City[ArrahLength][2][2]=Array("仁爱区","信义区","中正区","中山区","安乐区","暖暖区","七堵区");
Province_City[ArrahLength][2][3]=Array("中区","东区","南区","西区","北区","北屯区","西屯区","南屯区");
Province_City[ArrahLength][2][4]=Array("中西区","东区","南区","北区","安平区","安南区");
Province_City[ArrahLength][2][5]=Array("东区","北区","香山区");
Province_City[ArrahLength][2][6]=Array("东区","西区");
Province_City[ArrahLength][2][7]=Array("台北县","宜兰县","新竹县","桃园县","苗栗县","台中县","彰化县","南投县","嘉义县","云林县","台南县","高雄县","屏东县","台东县","花莲县","澎湖县");
Province_City[ArrahLength][3] = 1;
ArrahLength++;

*/


Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="全国范围";
Province_City[ArrahLength][1]=new Array("所有城市");
/*
Province_City[ArrahLength][2] = new Array();
Province_City[ArrahLength][2][0]=Array("所有城市");
*/
Province_City[ArrahLength][3] =0;
ArrahLength++;

Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="中西部地区";
Province_City[ArrahLength][1]=new Array("所有城市");
Province_City[ArrahLength][3] =0;
ArrahLength++;

Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="西南地区";
Province_City[ArrahLength][1]=new Array("所有城市");
Province_City[ArrahLength][3] =0;
ArrahLength++;

Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="青藏地区";
Province_City[ArrahLength][1]=new Array("所有城市");
Province_City[ArrahLength][3] =0;
ArrahLength++;

Province_City[ArrahLength]=new Array();
Province_City[ArrahLength][0]="爱无国界(非中国)";
Province_City[ArrahLength][1]=new Array("所有城市");
Province_City[ArrahLength][3] =0;
ArrahLength++;


var InitName_0 = new Array();			//Province
var InitName_1 = new Array();			//city
var InitName_2 = new Array();			//region
var ishaveregion = true;			//是否需要区数据
var InitNameLength = 0;

var forview = true; //是否显示下拉按钮 默认true表示不显示 当页面要选择（修改操作）时 必须设置为false



function GetNamewherexy (arraydata,name){
	for(var i=0;i<arraydata.length;i++){
		if(arraydata[i] == name) return i;
	}
}


function SaveNameArray(firstname,secondname,thirdname){
	var ishave = true;
	for(var i=0;i<InitName_0.length;i++){
		if(InitName_0[i] == firstname)
		{
			ishave = false;
		}
	}
	if(ishave){
		InitName_0.push(firstname);
		InitName_1.push(secondname);
		InitName_2.push(thirdname);
	}
}



function AddOption (sText,sValue,obSelect2) 
{
	var newItem = document.createElement("OPTION") ;
	newItem.text =  sText ;
	newItem.value =  sValue ;
	document.getElementById(obSelect2).options.add(newItem);		
}

function DelOption (obSelect2) 
{
	var iLength = document.getElementById(obSelect2).options.length ;
	for ( var i = iLength - 1 ; i >= 0 ; i -- )
		document.getElementById(obSelect2).options[i]=null ;
}



function ChangeChild (value, sArray, obSelect2)
{	

	if(value<0) return fasle;
	var listid = GetNamewherexy(InitName_1,obSelect2);

	//jQuery("#region").setinfo({empty:false,inputtype:"",initmsg:"",msg_id:"province_msg",errmsg:"",sussmsg:""});
	if(InitName_2[listid]!='') jQuery("#"+InitName_2[listid]).setinfo({empty:false,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"",sussmsg:""});

	//alert('修改省');
	

	var i;
	DelOption(obSelect2);
	AddOption ("请选择", "0", obSelect2);
	for ( i = 0 ; i < sArray.length ; i ++ )
	{
		AddOption (sArray[i],(i+1),obSelect2) ;		
	}
	

	
	if(ishaveregion){
		if(Province_City[value][3]==0){
			jQuery('#'+InitName_1[listid]).val('1');
			jQuery('#'+InitName_1[listid]).hide();
			Changeregion(value,0,InitName_2[listid]);	

			jQuery('#'+InitName_1[listid]).val(1);
			jQuery('#'+InitName_2[listid]).val(0);			
			if(typeof(Province_City[value][2])!="undefined" && typeof(Province_City[value][2][0])!="undefined" && Province_City[value][2][0].length >0){
				//alert('1');
				jQuery("#"+InitName_2[listid]+"_select_span").show();
				jQuery('#'+InitName_1[listid]).setinfo({empty:true,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"必选项",sussmsg:""});
				jQuery('#'+InitName_2[listid]).setinfo({empty:true,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"必选项",sussmsg:""});
			}else{
				//alert('2');
				jQuery("#"+InitName_2[listid]+"_select_span").hide();
				jQuery('#'+InitName_2[listid]).setinfo({empty:false,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"",sussmsg:""});
				jQuery('#'+InitName_1[listid]).setinfo({empty:true,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"必选项",sussmsg:""});
			}
		}else{
			jQuery('#'+InitName_1[listid]).fadeIn("slow");
			jQuery("#"+InitName_2[listid]+"_select_span").hide();
			//Changeregion(value,0,InitName_2);	
			jQuery('#'+InitName_1[listid]).val(0);
			jQuery('#'+InitName_2[listid]).val(0);			
			if(typeof(Province_City[value][2])!="undefined" && typeof(Province_City[value][2][0])!="undefined" && Province_City[value][2][0].length >0){
				//alert('3');
				jQuery('#'+InitName_1[listid]).setinfo({empty:true,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"必选项",sussmsg:""});
				jQuery('#'+InitName_2[listid]).setinfo({empty:true,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"必选项",sussmsg:""});
			}else{
				//alert('4');
				jQuery('#'+InitName_2[listid]).setinfo({empty:false,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"",sussmsg:""});
				jQuery('#'+InitName_1[listid]).setinfo({empty:true,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"必选项",sussmsg:""});
			}


		}
	}else{
		if(Province_City[value][3]==0){
			jQuery('#'+InitName_1[listid]).val('1');
			jQuery('#'+InitName_1[listid]).hide();
			jQuery('#'+InitName_1[listid]).val(1);
			jQuery('#'+InitName_1[listid]).setinfo({empty:true,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"必选项",sussmsg:""});

		}else{
			jQuery('#'+InitName_1[listid]).fadeIn("slow");
			jQuery('#'+InitName_1[listid]).val(0);
			jQuery('#'+InitName_1[listid]).setinfo({empty:true,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"必选项",sussmsg:""});
		}
	}

}


function Changeregion(value,citypos,obSelectCity){
	//alert('修改城市'+citypos+"----"+value+obSelectCity);
	//alert(jQuery("#city").val());
	//alert(value+"----"+citypos+"----"+obSelectCity);
	//if(citypos<0) citypos=0;
	
	var listid = GetNamewherexy(InitName_2,obSelectCity);


	if(InitName_2[listid]!='') jQuery('#'+InitName_2[listid]).setinfo({empty:false,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"",sussmsg:""});

	if(value<0)	{
		jQuery("#"+obSelectCity+"_select_span").hide();
		return false;
	}

	if(citypos<0) {
		jQuery("#"+obSelectCity+"_select_span").hide();
		return false;
	}

	if(typeof(Province_City[value][2])=="undefined" || typeof(Province_City[value][2][citypos])=="undefined"){
		jQuery("#"+obSelectCity+"_select_span").hide();
		return false;
	}

	//alert(citypos);
	var region_array = Province_City[value][2][citypos];	
	//alert(region_array);
	DelOption(obSelectCity);
	AddOption ("请选择", "0", obSelectCity);
	var ishide = true;
	for(i=0;i<region_array.length;i++){
		if(region_array[i]!="") {
			AddOption (region_array[i],(i+1),obSelectCity) ;
			ishide=false;
		}
	}

	if(!ishide){
		jQuery("#"+obSelectCity+"_select_span").show();
		jQuery('#'+InitName_1[listid]).setinfo({empty:true,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"必选项",sussmsg:""});
		jQuery('#'+InitName_2[listid]).setinfo({empty:true,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"必选项",sussmsg:""});
	}else{
		jQuery("#"+obSelectCity+"_select_span").hide();
		jQuery('#'+InitName_2[listid]).setinfo({empty:false,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"",sussmsg:""});
		jQuery('#'+InitName_1[listid]).setinfo({empty:true,inputtype:"",initmsg:"",msg_id:InitName_0[listid]+"_msg",errmsg:"必选项",sussmsg:""});
	}
}



function inarray(array,value){
	for(var i=0;i<array.length;i++){
		if(array[i] == value) return true;
	}
	return false;
}








/*
* 参数说明：
	sArray 省信息
	obSelect1 省对像
	obSelect2 市对像
	obSelect3 区对像
	initprovince 默认选择省
	initcity 默认选择城市
	ishaveregion 是否显示区控件
	Searcharray 默认省对像中显示哪些省
*/
function Init(sArray,obSelect1,obSelect2,obSelect3,initprovince,initcity,ishaveregion,Searcharray)
{

	SaveNameArray(obSelect1,obSelect2,obSelect3);
	var listid = GetNamewherexy(InitName_0,obSelect1);

	if(typeof(initprovince)=="undefined" || initprovince==""){
		initprovince = 0;
	}
	if(typeof(initcity)=="undefined" || initcity==""){
		initcity = 0;
	}
	
	//如果ishaveregion没有定义则付值为true
	if(typeof(ishaveregion)=="undefined" || ishaveregion.length==0){
		ishaveregion = true;
	}

	if(typeof(Searcharray)=="undefined" || Searcharray.length==0){
		Searcharray = new Array();
	}


	/* 因为ＩＤ从　１开始计算，因此在这里需要将取得的值减去一*/
	initprovince--;
	initcity--;

	AddOption ("请选择", "0", obSelect1);

	var s="";
	//DelOption(obSelect1);
	//AddOption ("请选择", "0", obSelect1);
	//alert(Searcharray);
	for ( i = 0 ; i < sArray.length; i ++ )
	{	
		if(Searcharray.length>0 && !inarray(Searcharray,(i+1))){
			continue;
		}

		//inarray
		s=sArray[i][0];
		
		var newItem		=  document.createElement("OPTION") ;
		newItem.text	=  s;
		newItem.value	=  (i+1);
		document.getElementById(obSelect1).options.add(newItem);
		//AddOption (s,(i+1), obSelect1);
	}






	//alert(initprovince+'---'+initcity);


	if(sArray[initprovince][3]==0){
		jQuery('#'+InitName_1[listid]).hide();

		if(initprovince>=0) ChangeChild(initprovince,sArray[initprovince][1],obSelect2);
		if(initprovince>=0 && ishaveregion) Changeregion(initprovince,0,obSelect3);
		
		jQuery('#'+InitName_1[listid]).val('1');
		if(ishaveregion){
			if(typeof(Province_City[initprovince][2])!="undefined" && typeof(Province_City[initprovince][2][0])!="undefined" && Province_City[initprovince][2][0].length >0){
				jQuery("#"+InitName_2[listid]+"_select_span").show();
			}else{
				jQuery("#"+InitName_2[listid]+"_select_span").hide();
			}
		}		
	}	
	else{
		jQuery('#'+InitName_1[listid]).fadeIn("slow");
		if(initprovince>=0) ChangeChild(initprovince,sArray[initprovince][1],obSelect2);	
		if(initprovince>=0 && initcity>=0 && ishaveregion) Changeregion(initprovince,initcity,obSelect3);
	}

	//隐藏显示的时候的直辖市的区下拉列表
	if(sArray[initprovince][2]==1 && forview)
	{
		jQuery('#'+InitName_2[listid]).hide();
	}
	//隐藏显示时候的澳门的市和区下拉列表
	if(sArray[initprovince][3]==0 && forview)
	{
		jQuery('#'+InitName_2[listid]).hide();
	}
 



}



function Writepageinit(ObjectElementname,ProvinceValue,CityValue,RegionValue,SArray,returnflag){
	if(typeof(returnflag)=="undefined" || returnflag==""){
		returnflag = "0";
	}


	if(ProvinceValue-1>=0){
		var Province = SArray[ProvinceValue-1][0]; 
	}else{
		var Province="";
		return false;
	}
	


	if(Province =='全国') {
		if(returnflag==0) jQuery("#"+ObjectElementname).html('全国');
		else return '全国';
	}




	if(SArray[ProvinceValue-1][3]==1){
		if(CityValue-1>=0){
			var City	 = SArray[ProvinceValue-1][1][CityValue-1]; 
		}else{
			var City	 = "";
			return false;
		}

		var Region	 ="";
		if(typeof(SArray[ProvinceValue-1][2])!="undefined" && typeof(SArray[ProvinceValue-1][2][CityValue-1])!="undefined" && RegionValue>0){
			//Region = SArray[ProvinceValue-1][2][CityValue-1][RegionValue-1]+"区";
			Region = SArray[ProvinceValue-1][2][CityValue-1][RegionValue-1];
			if(Region == undefined) Region="";
		}

		//jQuery("#"+ObjectElementname).html(Province+"省"+City+"市"+Region);
		if(returnflag==0) jQuery("#"+ObjectElementname).html(Province+"省"+City+Region);
		else return Province+"省"+City+Region;
	}else{

		//只显示澳门
		if(SArray[ProvinceValue-1][3]==0)
		{
			 return Province;
		}


		var Region	 ="";
		if(typeof(SArray[ProvinceValue-1][2])!="undefined" && typeof(SArray[ProvinceValue-1][2][0])!="undefined" && RegionValue>0){
			//Region = SArray[ProvinceValue-1][2][0][RegionValue-1]+"区";
			Region = SArray[ProvinceValue-1][2][0][RegionValue-1];
		}
		
		//jQuery("#"+ObjectElementname).html(Province+"市"+Region);
		if(returnflag==0) jQuery("#"+ObjectElementname).html(Province+Region);
		else return Province+"省"+City+Region;
	}
}






//只显示城市或区域，有区域的话就显示区域，没有的话就显示城市
function ShowCityRegion(ObjectElementname,ProvinceValue,CityValue,RegionValue,SArray,returnflag){

	if(typeof(returnflag)=="undefined" || returnflag==""){
		returnflag = "0";
	}

		
	if(ProvinceValue-1>=0){
		var Province = SArray[ProvinceValue-1][0]; 
	}else{
		var Province="";
		return false;
	}

	
	

	if(SArray[ProvinceValue-1][3]==1){
		if(CityValue-1>=0){
			var City	 = SArray[ProvinceValue-1][1][CityValue-1]; 
		}else{
			var City	 = "";
			return false;
		}
		
		

		var Region	 ="";
		if(typeof(SArray[ProvinceValue-1][2])!="undefined" && typeof(SArray[ProvinceValue-1][2][CityValue-1])!="undefined" && RegionValue>0){
			Region = SArray[ProvinceValue-1][2][CityValue-1][RegionValue-1];
		}
		
		if(City =='undefined' || !City) City =  SArray[ProvinceValue-1][0];
		if(City=='市辖区' || City =='市辖县' || City=='省直辖行政单位' || City=='县级市') City =  SArray[ProvinceValue-1][0];
		if(Region =='undefined' || !Region) Region='';

		if($.inArray(Province,['全国','中西部地区','西南地区','青藏地区','爱无国界(非中国)'])) {
			City	= Province;
			Region	='';
		}

		if(returnflag==0){
			//if(ObjectElementname !='' &&  ObjectElementname!="-1") jQuery("#"+ObjectElementname).html(City+"市"+Region);
			if(ObjectElementname !='' &&  ObjectElementname!="-1") jQuery("#"+ObjectElementname).html(City+Region);
			//else if(ObjectElementname=="-1") return City+"市"+Region;
			else if(ObjectElementname=="-1") return City+Region;
			//else document.write(City+"市"+Region);
			else document.write(City+Region);
		}else{
			if(ObjectElementname !='' &&  ObjectElementname!="-1") jQuery("#"+ObjectElementname).html(City);
			else if(ObjectElementname=="-1") return City;
			else document.write(City);
		}


	}else{
		var Region	 ="";
		if(typeof(SArray[ProvinceValue-1][2])!="undefined" && typeof(SArray[ProvinceValue-1][2][0])!="undefined" && RegionValue>0){
			Region = SArray[ProvinceValue-1][2][0][RegionValue-1];
		}
		if(returnflag==0){
			//if(ObjectElementname !='' &&  ObjectElementname!="-1") jQuery("#"+ObjectElementname).html(Province+"市"+Region);
			if(ObjectElementname !='' &&  ObjectElementname!="-1") jQuery("#"+ObjectElementname).html(Province+Region);
			//else if(ObjectElementname=="-1") return Province+"市"+Region;
			else if(ObjectElementname=="-1") return Province+Region;
			//else document.write(Province+"市"+Region);
			else document.write(Province+Region);
		}else{
			if(ObjectElementname !='' &&  ObjectElementname!="-1") jQuery("#"+ObjectElementname).html(Province);
			else if(ObjectElementname=="-1") return Province;
			else document.write(Province);
		}

	}
}








var OrganizerType_Array = new Array();

OrganizerType_Array[0] = Array(1,'国内正式基金会');
OrganizerType_Array[1] = Array(2,'(地方)政府管理的志愿者/义工组织');
OrganizerType_Array[2] = Array(3,'民政部门独立注册的志愿者/义工组织');
OrganizerType_Array[3] = Array(4,'大学公益社团');
OrganizerType_Array[4] = Array(5,'其他知名民间志愿者/义工组织');

var OrganizerType_Init = function(ObjectElementname){

	if(typeof(ObjectElementname)=="undefined" || ObjectElementname==""){
		alert("对象为空-374");
		return false;
	}
	if(typeof(Value)=="undefined" || Value==""){
		Value = 0;
	}

	DelOption(ObjectElementname);
	AddOption ("请选择", "0", ObjectElementname);

	for(i=0;i<OrganizerType_Array.length;i++){
		if(OrganizerType_Array[i][1]!="") {
			AddOption (OrganizerType_Array[i][1],OrganizerType_Array[i][0],ObjectElementname) ;
		}
	}
}
/*  |xGv00|28f8366bce7daa90d341d7735fbc921c */