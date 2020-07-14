var global_userinfoobject = {'nick':'','uin':0};
var newMsgCount = 0;
var global_actidtotal = 0;
var global_donatetotal = {"donation_cnt":0,"donation_money":0,"donation_getjifen":0,"donation_defcnt":0};
var projnumObj = 0;
var volunteerStat = {"unauth":0,"authed":0};
var global_uinobject = {"npoactivity_userinfo":[],"npoactivity_orginfo":[],"EnterTotal_Cnt":0,"FMoneyOfRemain":0};
var NeedAppraiseObject = [];
var _cookie_obj = GyLib.Cookie();

var ISURGENCY = true;
changeNavTab(1);

function getGySkeyFromCookie(){
    var _gy_skey = _cookie_obj.get("gy_skey");
    if(_gy_skey.length>0){//cookie中有用户信息
        var _arr = _gy_skey.split('|');
        global_userinfoobject.code = 0;
        global_userinfoobject.nick = eval('"'+unescape(_arr[0])+'"');
        global_userinfoobject.idcode = _arr[1];
        global_userinfoobject.head = _arr[2];
        global_userinfoobject.donation_cnt = _arr[3];
        global_userinfoobject.donation_money = _arr[4];
        global_userinfoobject.donation_getjifen = _arr[5];
        global_userinfoobject.donation_defcnt = _arr[6];
        global_userinfoobject.love_point = _arr[7];
        global_userinfoobject.love_step = _arr[8];
        global_userinfoobject.unauthnum = _arr[9];
        global_userinfoobject.publishnum = _arr[10];
        global_userinfoobject.msgNum = _arr[11];
        global_userinfoobject.needPayProjectNum =_arr[12];
        global_userinfoobject.uin = _arr[13];
        global_userinfoobject.skey = _arr[14];
        global_userinfoobject.donateProjectNum = _arr[15];
        global_userinfoobject.recommendProject = _arr[16];
        global_userinfoobject.needPayID = _arr[17];
        global_userinfoobject.doubleIcon = _arr[18];
        global_userinfoobject.universay  = _arr[19];
    }
    return _gy_skey;
}

function setGySkeyToCookie(data){
    var _arr = [];
    _arr[0] = escape(data.nick);
    _arr[1] = data.idcode;
    _arr[2] = data.head;
    _arr[3] = data.donation_cnt;
    _arr[4] = data.donation_money;
    _arr[5] = data.donation_getjifen;
    _arr[6] = data.donation_defcnt;
    _arr[7] = data.love_point;
    _arr[8] = data.love_step;
    _arr[9] = data.unauthnum;
    _arr[10] = data.publishnum;
    _arr[11] = data.msgNum;
    _arr[12] = data.needPayProjectNum;
    _arr[13] = data.uin;
    _arr[14] = data.skey;
    _arr[15] = data.donateProjectNum;
    _arr[16] = data.recommendProject;
    _arr[17] = data.needPayID;
    _arr[18] = data.doubleIcon;
    _arr[19] = data.universay;
    var _str = _arr.join('|');
    var expires = new Date();
    expires.setTime(expires.getTime() + 50 * 60 * 1000); //50分钟有效
    _cookie_obj.set("gy_skey",_str,expires,"/","gongyi.qq.com");
    
    global_userinfoobject.code = 0;
    global_userinfoobject.skey = data.skey;
    global_userinfoobject.uin = data.uin;
    global_userinfoobject.nick = eval('"'+data.nick+'"');
    global_userinfoobject.head = data.head;
    global_userinfoobject.idcode = data.idcode;
    global_userinfoobject.donation_cnt = data.donation_cnt;
    global_userinfoobject.donation_money = data.donation_money;
    global_userinfoobject.donation_getjifen = data.donation_getjifen;
    global_userinfoobject.donation_defcnt = data.donation_defcnt;
    global_userinfoobject.love_point = data.love_point;
    global_userinfoobject.love_step = data.love_step;
    global_userinfoobject.unauthnum = data.unauthnum;
    global_userinfoobject.publishnum = data.publishnum;
    global_userinfoobject.msgNum = data.msgNum;
    global_userinfoobject.needPayProjectNum = data.needPayProjectNum;
    global_userinfoobject.donateProjectNum = data.donateProjectNum;
    global_userinfoobject.recommendProject = data.recommendProject;
    global_userinfoobject.needPayID = data.needPayID;
    global_userinfoobject.doubleIcon = data.doubleIcon;
    global_userinfoobject.universay  = data.universay;
}

/*初始化登录状态*/
function initHeaderLoginPlane(callback){
    try{
        if(!ISURGENCY){//常态，动态拉取数据
            var _url = 'http://yundonate.gongyi.qq.com/cgi-bin/Login?jsoncallback=?';
            $.getJSON(_url,function(data){
                if(data.code==0){
                    global_userinfoobject = data.info;
                    global_userinfoobject.nick = eval('"'+global_userinfoobject.nick+'"');
                    Global_PageHeardLoginInfo_v2("Global_pageheardObj");
                }
                if(typeof callback=='function')
                    callback();
                return ;
            });
            $.ajax({
                type:"GET",
                url:'http://yundonate.gongyi.qq.com/cgi-bin/Login',
                dataType:'jsonp',
                data:{},
                jsonp : "jsoncallback",
                "jsoncallback":'?',
                success:function (data) {
                    console.log(data);
                    if(data.code==0){
                        data.skey = _skey;
                        setGySkeyToCookie(data.info);
                        Global_PageHeardLoginInfo_v2("Global_pageheardObj");
                    }
                    if(typeof callback=='function')
                        callback();
                },
                scriptCharset:'utf-8',
                contentType: "application/x-www-form-urlencoded; charset=utf-8"
            })
            
        }
        else{//紧急态，cookie拉取数据
            var _skey = _cookie_obj.get('skey');
            if(_skey.length>0){
                var _gy_skey = getGySkeyFromCookie();
                if(_gy_skey.length>0&&global_userinfoobject.skey==_skey){//cookie中有用户信息
                    Global_PageHeardLoginInfo_v2("Global_pageheardObj");
                    setGySkeyToCookie(global_userinfoobject);
                    if(typeof callback=='function')
                        callback();
                }
                else{
                    /*var _url = 'http://yundonate.gongyi.qq.com/cgi-bin/Login?jsoncallback=?';
                    $.getJSON(_url,function(data){
                        if(data.code==0){
                            data.skey = _skey;
                            setGySkeyToCookie(data.info);
                            Global_PageHeardLoginInfo_v2("Global_pageheardObj");
                        }
                        if(typeof callback=='function')
                            callback();
                    });*/
                    $.ajax({
                        type:"GET",
                        url:'http://yundonate.gongyi.qq.com/cgi-bin/Login',
                        dataType:'jsonp',
                        data:{},
                        jsonp : "jsoncallback",
                        "jsoncallback":'?',
                        success:function (data) {
                            if(data.code==0){
                                data.skey = _skey;
                                setGySkeyToCookie(data.info);
                                Global_PageHeardLoginInfo_v2("Global_pageheardObj");
                            }
                            if(typeof callback=='function')
                                callback();
                        },
                        scriptCharset:'utf-8',
                        contentType: "application/x-www-form-urlencoded; charset=utf-8"
                    })
                }
            }
            else{
                global_userinfoobject.code = -1;
                _cookie_obj.clear("gy_skey","","/","gongyi.qq.com");
                if(typeof callback=='function')
                    callback();
            }
        }
    }catch(e){}
}

/*
 *	desc			创建一个提示浮动层
 *	author			kidxiong
 *	date			2013-4-19
 */
function createTipDiv(options){
    var _o = $.extend({'contentId':'floatDiv','maskId':'tipsMask','opacity':0.9},options);
    //创建遮罩层
    _maskObj = GyLib.Effect.Mask({id:_o.maskId,opacity:_o.opacity});
    _maskObj.create();
    
    //创建内容层
    var _obj = $('#'+_o.contentId);
    if(_obj[0]!=null)
        return [_obj,_maskObj];
    var _content = '<div id="'+_o.contentId+'" class="floatDiv"><div class="floatTitle"><a href="javascript:void(0)" class="floatClose">X</a><h4>温馨提示</h4></div><div class="floatContent" id="floatContent"><h4 class="tips-title"></h4><p class="tips-content"></p></div><div style="text-align:center;padding-bottom:15px;"><a class="floatCloseBtn" id="sureBtn" style="float:none;margin:0 auto">确定</a></div></div>';
    $('body').append(_content);
    $('.floatClose').bind('click',function(){closeTipDiv()});
    //$('.floatCloseBtn').bind('click',function(){closeTipDiv()});
    
    if(typeof(options)!="undefined" && typeof(options.successBack)!="undefined" && typeof(options.successBack)=="function")
    {
        //var _funss = options.successBack;
        //$('#sureBtn').attr('href',"javascript:void("+options.successBack+"())");
        $('#sureBtn').bind('click',options.successBack);
    }
    else
        $('#sureBtn').bind('click',function(){closeTipDiv()});
    
    _obj = $('#'+_o.contentId);
    return [_obj,_maskObj];
    
}

/*
 *	desc			关闭当前的浮动层[包括提示层和确认层]
 *	author			kidxiong
 *	date			2013-4-19
 */
function closeTipDiv(){
    $('.floatDiv').hide();
    $('#'+GyLib.Effect.Mask.handlerID).hide();
}

/*
 *	desc			创建一个确认提示层
 *	author			kidxiong
 *	date			2013-4-19
 */
function createPromptDiv(options){
    var _o = $.extend({'promptId':'promptDiv','maskId':'tipsMask','opacity':0.9,'okFunc':function(){}},options);
    //创建遮罩层
    _maskObj = GyLib.Effect.Mask({id:_o.maskId,opacity:_o.opacity});
    _maskObj.create();
    
    //创建内容层
    var _obj = $('#'+_o.promptId);
    if(_obj[0]!=null)
        return [_obj,_maskObj];
    var _content = '<div id="'+_o.promptId+'" class="floatDiv"><div class="floatTitle"><a href="javascript:void(0);" class="floatClose">X</a><h4>温馨提示</h4></div><div class="floatContent" id="floatContent"><p></p><div style="clear:both"></div><div style="width:100%;float:left;text-align:center;"><div style="text-align:center;"><div id="floatOkBtn" class="floatOkBtn">确定</div><div style="margin-left:15px;" id="floatCloseBtn" class="floatCloseBtn">取消</div></div></div></div></div>';
    $('body').append(_content);
    $('#floatOkBtn').bind('click',function(){_o.okFunc()});
    $('.floatClose').bind('click',function(){closeTipDiv()});
    $('.floatCloseBtn').bind('click',function(){closeTipDiv()});
    _obj = $('#'+_o.promptId);
    return [_obj,_maskObj];
}

/*
 *	desc			显示创建的确认提示层
 *	author			kidxiong
 *	date			2013-4-19
 */
function _showPromptDiv(text,callback){
    var _promptObj = createPromptDiv({'okFunc':callback});
    var _maskObj = _promptObj[1];
    var _promptDiv = _promptObj[0];
    _maskObj.show();
    var _index = _maskObj.getIndex();
    _promptDiv.find(".floatContent p").html(text);
    _promptDiv.floatDiv('middle').css('zIndex',_index+1).show();
    _promptDiv.show();
}

function getUrlParamVal(paras){
    var url = window.location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {}
    for (i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return returnValue;
    }
}

var showTips1 = function(content,flag,opt)
{
    var cssClass = '';
    if(typeof(flag) != 'number') flag = 1;
    if(flag==1)
    {
        cssClass = 'tips_success';
    }else if(flag==2)
    {
        cssClass = 'tips_error';
    }else if(flag==3)
    {
        cssClass = 'tips_warning';
    }
    //var _tipsOpt = {};
    
    
    var _tipsObj = createTipDiv();
    var _contentDiv = _tipsObj[0];
    var _maskObj = _tipsObj[1];
    _maskObj.show();
    var _index = _maskObj.getIndex();
    
    if(typeof(opt) != 'undefined')
    {
        if(typeof(opt.title) != 'undefined')
        {
            _contentDiv.find('#floatContent').html('<h4 class="tips-title '+cssClass+'">'+opt.title+'</h4>');
            _contentDiv.find('#floatContent').append('<p class="tips-content">'+content+'</p>');
        }
        else{
            _contentDiv.find('#floatContent').html('<p class="'+cssClass+'">'+content+'</p>');
        }
        if(typeof(opt.width) != 'undefined') _contentDiv.width(opt.width);
        if(typeof(opt.sBackFun) != "undefined" && typeof(opt.sBackFun) == "function")
        {
            //_tipsOpt = {successBack:opt.sBackFun};
            $('#sureBtn').bind('click',opt.sBackFun);
        }
        
    }else{
        _contentDiv.find('#floatContent').html('<p class="'+cssClass+'">'+content+'</p>');
    }
    
    //_contentDiv.floatDiv('middle').css('zIndex',_index+1).show();
    var win = GyLib.Window().viewSize();
    win.width = (win.width - _contentDiv.width())/2;
    win.width = win.width<0?0:win.width;
    win.height = (win.height - _contentDiv.height())/2;
    win.height = win.height<0?0:win.height;
    _contentDiv.PositionFixed({x:win.width,y:win.height}).show();
    return;
}
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                //date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                date.setTime(date.getTime() + (options.expires * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

Date.prototype.getCurrentDate = function(){
    var _date = new Date();
    var _y = _date.getFullYear();
    var _m = parseInt(_date.getMonth())+1;
    _m = _m<10 ? ('0'+_m) : _m;
    var _d = _date.getDate();
    _d = _d<10 ?('0'+_d): _d;
    return _y+'-'+_m+'-'+_d;
}

function getCurrentDate(){
    var _date = new Date();
    return _date.getCurrentDate();
}

function showDonateDiv(title,fundid,projectid){
    GyLib.Donate.show(0,title,fundid,projectid,1,1,0);
}

/* 月捐关闭提示框 */

function closeMonthDiv(title,projectid){
    var Box = "<div class='closeMonthBox'><h5 class='title'>捐赠项目："+title+"<span class='closeBox'></span></h5><div class='cont'><img src='http://mat1.gtimg.com/gongyi/2013/loveplan/code/p"+projectid+".png'><p>微信扫描二维码 快速捐款</p><p style='text-align:left;padding:0px 30px;margin-top:15px;color:#a9a9a9;'>温馨提示：<br>微信开通月捐无法在腾讯公益网页和手Q版本里查看捐赠记录。无法点亮QQ图标和赠送成长积分<br>请前往微信>钱包>腾讯公益>个人中心 查看微信月捐记录</p></div></div>";
    if($("body").find("closeMonthBox").length==0){
        $("body").append(Box);
    }
    if($("body").find(".mask_level").length == 0){
        $("body").append("<div class='mask_level'></div>");
    }
    $(".closeMonthBox").show();
    $(".mask_level").show();
    $(".closeBox").unbind("click");
    $(".closeBox").click(function(){
        $(".closeMonthBox").hide();
        $(".mask_level").hide();
    })
}

/* ----------------- */


function Marquee(container,source,copy){
    if(copy.offsetTop-container.scrollTop<=0)    //当滚动至demo1与demo2交界时
        container.scrollTop-=source.offsetHeight    //demo跳到最顶端
    else{
        container.scrollTop++
    }
}

function autoMove(containerId,sourceId,copyId){
    var container = document.getElementById(containerId);
    var source = document.getElementById(sourceId);
    var copy = document.getElementById(copyId);
    var speed=30;    //滚动速度值，值越大速度越慢
    var distance=200/source.offsetHeight;
    for(i=0;i<distance;i++){source.innerHTML+="<br />"+ source.innerHTML}
    copy.innerHTML = source.innerHTML    //克隆demo2为demo1
    var MyMar = setInterval(function(){
        Marquee(container,source,copy)
    },speed);        //设置定时器
    container.onmouseover = function(){clearInterval(MyMar)}    //鼠标经过时清除定时器达到滚动停止的目的
    container.onmouseout = function(){
        MyMar = setInterval(function(){
            Marquee(container,source,copy)
        },speed)
    }//鼠标移开时重设定时器
}

window.onresize = function(){
    $('.h_nav').css('width','100%');
    $('.h_nav').css('width',document.body.scrollWidth+'px');
}

window.onload = function(){
    $('.h_nav').css('width','100%');
    $('.h_nav').css('width',document.body.scrollWidth+'px');
}/*  |xGv00|981a2fb20d1f7b8cf1e1b43bccf86ab0 */