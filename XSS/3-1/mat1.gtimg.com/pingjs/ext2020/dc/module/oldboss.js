// 旧版统一上报
$(function(){
  function ExposureBossAll(bossId, sOp){
    var a = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
    var iQQ = (null === a) ? '' : unescape(a[2]) || Math.ceil(Math.random()*10000000000000000),
        sBiz = arguments[2] || '';
    (new Image()).src = "//btrace.qq.com/kvcollect?BossId=" + bossId + "&Pwd=0&iQQ=" + iQQ + "&sOp="+ sOp +"&sUrl=" + encodeURIComponent(location.href) +"&site=" + location.host + "&_dc=" + Math.random();
  }
  ExposureBossAll(1604, 'por_all&vertical=OLDTW');
});/*  |xGv00|673897fb018f43c3d86a551368d19b1d */