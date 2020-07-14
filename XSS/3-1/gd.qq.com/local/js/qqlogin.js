//<![CDATA[ 
document.domain="qq.com";
function ptlogin2_onResize(width, height) {
//获得浮动Div对象
login_wnd = document.getElementById("login_div");
if (login_wnd)  {
    //重新设置大小注意，一定要加px，否则firefox下有问题
    login_wnd.style.width = width + "px";
    login_wnd.style.height = height + "px";
    //最好重新调整登录框的位置， 这儿略....
    //先隐藏，在显示，这样可以避免滚动条的出现
    login_wnd.style.visibility = "hidden"
    login_wnd.style.visibility = "visible"
    login_wnd.style.marginLeft = "-"+parseInt(width/2) + 'px';
    login_wnd.style.marginTop = "-"+parseInt(height/2) + 'px';
}
}
function ptlogin2_onClose(){
document.getElementById("login_div").style.left = "-9999px";
document.getElementById("loginBg").style.display = "none";
}
function userLogin(){
document.getElementById("login_frame").src = "http://ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=636014201&target=self&s_url=http%3A//www.qq.com/qq2012/loginSuccess.htm";
document.getElementById("login_div").style.left = "50%";
document.getElementById("loginBg").style.display = "block";
document.getElementById("loginBg").style.width= document.body.clientWidth + "px";
document.getElementById("loginBg").style.height= document.body.clientHeight + "px";
}
/*一键登录数据*/
function loginAll(obj){
if(obj.result == 0){
    MblogTotalnum = obj.info.Mblog.totalnum || 0; QQ.localData.set('Mblog-totalnum', obj.info.Mblog.totalnum);
    MblogMsgnum = obj.info.Mblog.msgnum || 0; QQ.localData.set('Mblog-msgnum', obj.info.Mblog.msgnum);
    MblogAtnum = obj.info.Mblog.atnum || 0; QQ.localData.set('Mblog-atnum', obj.info.Mblog.atnum);
    MblogFansnum = obj.info.Mblog.fansnum || 0; QQ.localData.set('Mblog-fansnum', obj.info.Mblog.fansnum);
    QZoneTotalnum = obj.info.QZone.totalnum || 0; QQ.localData.set('QZone-totalnum', obj.info.QZone.totalnum);
    QZonePassivenum = obj.info.QZone.passivenum || 0; QQ.localData.set('QZone-passivenum', obj.info.QZone.passivenum);
    QZoneInitnum = obj.info.QZone.initnum || 0; QQ.localData.set('QZone-initnum', obj.info.QZone.initnum);
    QZoneAboutnum = obj.info.QZone.aboutnum || 0; QQ.localData.set('QZone-aboutnum', obj.info.QZone.aboutnum);
    QMailTotalnum = obj.info.QMail.totalnum || 0; QQ.localData.set('QMail-totalnum', obj.info.QMail.totalnum);
    QMailInboxnum = obj.info.QMail.inboxnum || 0; QQ.localData.set('QMail-inboxnum', obj.info.QMail.inboxnum);
    QMailBottlenum = obj.info.QMail.bottlenum || 0; QQ.localData.set('QMail-bottlenum', obj.info.QMail.bottlenum);
    QMailGmailnum = obj.info.QMail.gmailnum || 0; QQ.localData.set('QMail-gmailnum', obj.info.QMail.gmailnum);
    QMailDmailnum = obj.info.QMail.dmailnum || 0; QQ.localData.set('QMail-dmailnum', obj.info.QMail.dmailnum);

    userInfoUin = uin; QQ.localData.set('Uin', uin);
    userInfoName = obj.nick.replace(/</,"&lt;").replace(/>/,"&gt;"); QQ.localData.set('nick', userInfoName);
    userInfoVip = obj.Vip; QQ.localData.set('Vip', userInfoVip || 0);
    userInfoFace = obj.Face || '//mat1.gtimg.com/news/dc/temp/c1.jpg'; QQ.localData.set('Face', userInfoFace || '//mat1.gtimg.com/news/dc/temp/c1.jpg');

    UI && UI.getScript("http://mini.t.qq.com/mini/mycheck.php?r=" + (new Date).getTime());//add 20130226

    if(MblogTotalnum){
        if(MblogTotalnum > 99){
            document.getElementById("weiboNum").innerHTML = "99+";
        }else{
            document.getElementById("weiboNum").innerHTML = MblogTotalnum;
        }
        document.getElementById("weiboNum").style.padding = "0 7px";
        if(MblogMsgnum != ""){
            document.getElementById("msgNum").innerHTML = MblogMsgnum;
            document.getElementById("msgLi").style.display = "block";
        }
        if(MblogAtnum != ""){
            document.getElementById("atNum").innerHTML = MblogAtnum;
            document.getElementById("atLi").style.display = "block";
        }
        if(MblogFansnum != ""){
            document.getElementById("fansNum").innerHTML = MblogFansnum;
            document.getElementById("fansLi").style.display = "block";
        }
    }else{
        document.getElementById("weiboTitle").innerHTML = "<a href='http://t.qq.com' target='_blank'>点击查看腾讯微博</a>";
    }
    if(QZoneTotalnum){
        if(QZoneTotalnum > 99){
            document.getElementById("qzoneNum").innerHTML = "99+";
        }else{
            document.getElementById("qzoneNum").innerHTML = QZoneTotalnum;
        }
        document.getElementById("qzoneNum").style.padding = "0 7px";
        if(QZonePassivenum != ""){
            document.getElementById("passiveNum").innerHTML = QZonePassivenum;
            document.getElementById("passiveLi").style.display = "block";
        }
        if(QZoneInitnum != ""){
            document.getElementById("InitNum").innerHTML = QZoneInitnum;
            document.getElementById("InitLi").style.display = "block";
        }
        if(QZoneAboutnum != ""){
            document.getElementById("AboutNum").innerHTML = QZoneAboutnum;
            document.getElementById("AboutLi").style.display = "block";
        }
    }else{
        document.getElementById("qzoneTitle").innerHTML = "<a href='http://qzone.qq.com' target='_blank'>点击查看QQ空间</a>";
    }
    if(QMailTotalnum){
        if(QMailTotalnum > 99){
            document.getElementById("mailNum").innerHTML = "99+";
        }else{
            document.getElementById("mailNum").innerHTML = QMailTotalnum;
        }
        document.getElementById("mailNum").style.padding = "0 7px";
        weiDu = QMailTotalnum - QMailInboxnum - QMailBottlenum - QMailGmailnum - QMailDmailnum;
        if(QMailInboxnum != ""){
            if(weiDu != 0){
                document.getElementById("inboxNum").innerHTML = Number(QMailInboxnum) + Number(weiDu);
                document.getElementById("inboxLi").style.display = "block";
            }else{
                document.getElementById("inboxNum").innerHTML = QMailInboxnum;
                document.getElementById("inboxLi").style.display = "block";
            }
        }else if(weiDu != 0){
            document.getElementById("inboxNum").innerHTML = weiDu;
            document.getElementById("inboxLi").style.display = "block";
        }
        if(QMailBottlenum != ""){
            document.getElementById("bottleNum").innerHTML = QMailBottlenum;
            document.getElementById("bottleLi").style.display = "block";
        }
        if(QMailGmailnum != ""){
            document.getElementById("gmailNum").innerHTML = QMailGmailnum;
            document.getElementById("gmailLi").style.display = "block";
        }
        if(QMailDmailnum != ""){
            document.getElementById("dmailNum").innerHTML = QMailDmailnum;
            document.getElementById("dmailLi").style.display = "block";
        }
        if(QMailInboxnum == "" && QMailBottlenum == "" && QMailGmailnum == "" && QMailDmailnum == ""){
            document.getElementById("mailTitle").innerHTML = "<a href='http://mail.qq.com' target='_blank'>点击查看QQ邮箱</a>";
        }
    }else{
        document.getElementById("mailTitle").innerHTML = "<a href='http://mail.qq.com' target='_blank'>点击查看QQ邮箱</a>";
    }
    document.getElementById("mailIcon").onmouseover = function(){
        document.getElementById("mailSmart").style.display = "block";
    }
    document.getElementById("mailIcon").onmouseout = function(){
        document.getElementById("mailSmart").style.display = "none";
    }
    document.getElementById("qzoneIcon").onmouseover = function(){
        document.getElementById("qzoneSmart").style.display = "block";
    }
    document.getElementById("qzoneIcon").onmouseout = function(){
        document.getElementById("qzoneSmart").style.display = "none";
    }
    document.getElementById("weiboIcon").onmouseover = function(){
        document.getElementById("weiboSmart").style.display = "block";
    }
    document.getElementById("weiboIcon").onmouseout = function(){
        document.getElementById("weiboSmart").style.display = "none";
    }


    document.getElementById("userName").innerHTML = userInfoName;
	document.getElementById("userFace").src = userInfoFace;
    document.getElementById("logined").style.display = "block";
    document.getElementById("loginAll").style.display = "none";
    document.getElementById("loginOut").onclick = function(){
        login.loginOut();
        MI &&　MI.Login.logout();//add 20130226
    }
	document.getElementById("loginOut_Login").onclick=function(){
	    login.loginOut();
        MI &&　MI.Login.logout();//add 20130226
	}
	
    if(typeof loginAllCallBack=="function"){
        loginAllCallBack(userInfoName);
    }
}
}
function reloadLoginInfo(){
var _obj = {"result":"0","Uin":QQ.localData.get('Uin'),"nick":QQ.localData.get('nick'),"Vip":QQ.localData.get('Vip'),"Face":QQ.localData.get('Face'),"info":{"QZone":{"totalnum":parseInt(QQ.localData.get('QZone-totalnum')),"passivenum":parseInt(QQ.localData.get('QZone-passivenum')),"initnum":parseInt(QQ.localData.get('QZone-initnum')),"aboutnum":parseInt(QQ.localData.get('QZone-aboutnum'))},/*"Friend":{"totalnum":parseInt(QQ.localData.get('Friend-totalnum')),"passivenum":parseInt(QQ.localData.get('Friend-passivenum')),"initnum":parseInt(QQ.localData.get('Friend-initnum')),"aboutnum":parseInt(QQ.localData.get('Friend-aboutnum'))},*/"QMail":{"totalnum":parseInt(QQ.localData.get('QMail-totalnum')),"inboxnum":parseInt(QQ.localData.get('QMail-inboxnum')),"bottlenum":parseInt(QQ.localData.get('QMail-bottlenum')),"gmailnum":parseInt(QQ.localData.get('QMail-gmailnum')),"dmailnum":parseInt(QQ.localData.get('QMail-dmailnum'))},"Mblog":{"totalnum":parseInt(QQ.localData.get('Mblog-totalnum')),"msgnum":parseInt(QQ.localData.get('Mblog-msgnum')),"atnum":parseInt(QQ.localData.get('Mblog-atnum')),"fansnum":parseInt(QQ.localData.get('Mblog-fansnum'))}}}
loginAll(_obj);
}
window.QQ = {};
QQ.localData = {
hname:location.hostname ? location.hostname : 'localStatus',
isLocalStorage:window.localStorage ? true : false,
dataDom:null,
initDom:function(){ //初始化userData
    if(!this.dataDom){
        try{
            this.dataDom = document.createElement('input');//这里使用hidden的input元素
            this.dataDom.type = 'hidden';
            this.dataDom.style.display = "none";
            this.dataDom.addBehavior('#default#userData');//这是userData的语法
            document.body.appendChild(this.dataDom);
            var exDate = new Date();
            exDate = exDate.getDate()+30;
            this.dataDom.expires = exDate.toUTCString();//设定过期时间
        }catch(ex){
            return false;
        }
    }
    return true;
},
set:function(key,value){
    if(this.isLocalStorage){
        window.localStorage.setItem(key,value);
    }else{
        if(this.initDom()){
            this.dataDom.load(this.hname);
            this.dataDom.setAttribute(key,value);
            this.dataDom.save(this.hname)
        }
    }
},
get:function(key){
    if(this.isLocalStorage){
        return window.localStorage.getItem(key);
    }else{
        if(this.initDom()){
            this.dataDom.load(this.hname);
            return this.dataDom.getAttribute(key);
        }
    }
},
remove:function(key){
    if(this.isLocalStorage){
        localStorage.removeItem(key);
    }else{
        if(this.initDom()){
            this.dataDom.load(this.hname);
            this.dataDom.removeAttribute(key);
            this.dataDom.save(this.hname)
        }
    }
}
}
QQ.Cookie={
set:function(name,value,expires,path,domain){
    if(typeof expires=="undefined"){
        expires=new Date(new Date().getTime()+3600*1000);
    }
    document.cookie=name+"="+escape(value)+((expires)?"; expires="+expires.toGMTString():"")+((path)?"; path="+path:"; path=/")+((domain)?";domain="+domain:"");
},
get:function(name){
    var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr!=null){
        return unescape(arr[2]);
    }
    return null;
},
clear:function(name,path,domain){
    if(this.get(name)){
        document.cookie=name+"="+((path)?"; path="+path:"; path=/")+((domain)?"; domain="+domain:"")+";expires=Fri, 02-Jan-1970 00:00:00 GMT";
    }
}
};
function getExpires(a){//a:hour
var expires=new Date(new Date().getTime()+(a?a:1)*24*3600*1000);
return expires;
}

window["login"] = {
loginCheck:function(){
    if(QQ.Cookie.get("skey")){
        uin = Number(QQ.Cookie.get("uin").substring(1));
        skey = QQ.Cookie.get("skey");
        try{
            var loginScript = document.createElement ("script");
            loginScript.charset="utf-8";
            loginScript.src = "//qfwd.qq.com/?uin=" + uin + "&skey=" + skey + "&func=loginAll&refresh=0&ran="+Math.random();
            document.getElementsByTagName('head')[0].appendChild(loginScript);
            QQ.localData.set("loginTime", (new Date()).getTime());
        }catch(e){}
    }
},
loginCountCheck:function(obj){
    if(document.getElementById(obj).innerHTML != ""){
        document.getElementById(obj).innerHTML = "";
        document.getElementById(obj).parentNode.parentNode.style.display = "none";
    }
},
loginOut:function(){
    var d = (new Date).getTime();
    QQ.Cookie.clear("skey", '/', "qq.com");
    document.getElementById("logined").style.display = "none";
    document.getElementById("loginAll").style.display = "block";
    login.loginCountCheck("weiboNum");
    login.loginCountCheck("msgNum");
    login.loginCountCheck("atNum");
    login.loginCountCheck("fansNum");
    login.loginCountCheck("qzoneNum");
    login.loginCountCheck("passiveNum");
    login.loginCountCheck("InitNum");
    login.loginCountCheck("AboutNum");
    login.loginCountCheck("mailNum");
    login.loginCountCheck("inboxNum");
    login.loginCountCheck("bottleNum");
    login.loginCountCheck("gmailNum");
    login.loginCountCheck("dmailNum");
    document.getElementById("weiboTitle").innerHTML = "腾讯微博:";
    document.getElementById("qzoneTitle").innerHTML = "QQ空间:";
    document.getElementById("mailTitle").innerHTML = "QQ邮箱:";
    document.getElementById("weiboNum").style.padding = "0 14px";
    document.getElementById("qzoneNum").style.padding = "0 16px";
    document.getElementById("mailNum").style.padding = "0 15px";
    if(typeof loginOutCallBack=="function"){
        loginOutCallBack();
    }

    login.cbArr = [];
    login.cleanCbLogin();
},
loginSuccess:function(){
    document.getElementById("loginBg").style.display = "none";
    document.getElementById("login_div").style.left = "-9999px";
    document.getElementById("logined").style.display = "block";
    document.getElementById("loginAll").style.display = "none";
    //加载回调
    if(login.cbArr.length > 0){
        for(var i = login.cbArr.length-1; i >= 0; i--){
            login.cbArr[i]();
        }
    }
    //点击回调
    login.loginCheck();
    login.cbLogin();
    login.cleanCbLogin();
},
cbArr : new Array(),//加载回调
cbLogin : function(){},//点击回调
cleanCbLogin : function(){
    this.cbLogin = function(){}
}
}
function EA( node, type, listener ) {
if (node.addEventListener) {
    node.addEventListener( type, listener, false );
    return true;
} else if(node.attachEvent) {
    node['e'+type+listener] = listener;
    node[type+listener] = function(){node['e'+type+listener]( window.event );}
    node.attachEvent( 'on'+type, node[type+listener] );
    return true;
}
return false;
}
//登录本地存储
EA(window, "load", function(){
if(QQ.Cookie.get("skey")){
    var _t = QQ.localData.get('loginTime') || 0, t = new Date().getTime();
    if(t - _t > 60000 || QQ.Cookie.get("uin") != QQ.localData.get('Uin')) {
        login.loginCheck();
		//alert(1);
    }else{
        reloadLoginInfo();
		//alert(2);
    }
}
});
//]]>/*  |xGv00|fb5bf19dde74136f0da046e1af6c472a */