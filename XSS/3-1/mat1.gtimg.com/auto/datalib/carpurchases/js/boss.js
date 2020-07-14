//BOSS统计方法
function FgetUin(){
	var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
	var uin = (a==null?"":unescape(a[2]));
	if(uin==""){
		return false;
	}else{
		return uin;
	}
}
var g_boss_purchases_t = new Image(1,1);
function purchasesBossClick(sBiz,sOp){
  var uin = FgetUin();
  if ( uin == false ){
    uin='';
  }
  g_boss_purchases_t.src = "http://btrace.qq.com/collect?sIp=&iQQ="+uin+"&sBiz="+sBiz+"&sOp="+sOp+"&iSta=&iTy=1659&iFlow=&iValue=";
}/*  |xGv00|33a53f4594b1702d03801aac89e64905 */