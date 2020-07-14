// 搜狗
(function(d, fname, useSuggest,isChannelPage,pid) {
  var frm = d.forms[fname], elems = frm.elements, input = elems['query'];
  var IS_MSIE = navigator.userAgent.toLowerCase().indexOf('msie') != -1 && !window.opera;
  var isIE6 = navigator.userAgent.toLowerCase().indexOf('msie 6.0') != -1;
  var sHost = location.host||'www.qq.com',sitePrefix='www';
   //var sHost = "sports.qq.com/lottery";
  var CPID = new Array();
  //if(sHost == 'localhost') return;
  if(sHost){
    var arr = sHost.replace(/\.qq\.com$/i,'').split('.');
    //sitePrefix = arr.pop();
    sitePrefix = arr[0];
    document.getElementById("sogouSite").value = sitePrefix + ".qq.com";
  }
      getCPID();
  createHiddenInput('hdq',CPID[0],false);
  var scField = createHiddenInput('sourceid',CPID[1],false);
      var sub = document.getElementById("sub");
     // sub.onclick = changeSugg();
  if(typeof sosoArticlKey != 'undefined' && sosoArticlKey.length){
    setFieldValue(input,sosoArticlKey);
  }
  
  function disableHidden(inpt) {
    inpt.disabled = 'disabled';
  }
  function getCPID(){
    var path = window.location.pathname;
    if(sitePrefix == "tech"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0001";
        CPID[1] = "sugg";
        return;
    }
     if(sitePrefix == "sports"){
         if(path.indexOf("lottery") != -1){
             CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0021";
             CPID[1] = "sugg";
             return;
         }
         if(path.indexOf("csocce") != -1){
             CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0020";
             CPID[1] = "sugg";
             return;
         }
         if(path.indexOf("nba") != -1){
             CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0019";
             CPID[1] = "sugg";
             return;
         }
         if(path.indexOf("f_players") != -1){
             CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0002";
             CPID[1] = "sugg";
             return;
         }
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0018";
        CPID[1] = "sugg";
         return;
    }
     if(sitePrefix == "news"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0004";
        CPID[1] = "sugg";
         return;
    }
    if(sitePrefix == "cul"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-00024";
        CPID[1] = "sugg";
        return;
    }
    if(sitePrefix == "fashion"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0005";
        CPID[1] = "sugg";
        return;
    }
    if(sitePrefix == "house"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0006";
        CPID[1] = "sugg";
        return;
    }
    if(sitePrefix == "games"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0007";
        CPID[1] = "sugg";
        return;
    }

    if(sitePrefix == "ent"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0009";
        CPID[1] = "sugg";
        return;
    }
    if(sitePrefix == "comic"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0010";
        CPID[1] = "sugg";
        return;
    }
     if(sitePrefix == "blog"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0011";
        CPID[1] = "sugg";
         return;
    }
     if(sitePrefix == "cd"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0012";
        CPID[1] = "sugg";
         return;
    }
     if(sitePrefix == "weather"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0014";
        CPID[1] = "sugg";
         return;
    }
     if(sitePrefix == "auto"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0013";
        CPID[1] = "sugg";
         return;
    }
     if(sitePrefix == "kid"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0015";
        CPID[1] = "sugg";
        return;
    }
     if(sitePrefix == "finance"){
        if(path.indexOf("fund") != -1){
            CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0017";
            CPID[1] = "sugg";
            return;
        }
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0017";
        CPID[1] = "sugg";
         return;
    }

    if(sitePrefix == "gongyi"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0022";
        CPID[1] = "sugg";
        return;
    }
    if(sitePrefix == "foxue"){
        CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0023";
        CPID[1] = "sugg";
        return;
    }
    CPID[0] = "sogou-wsse-acf922154627f678-0009";
    CPID[1] = "sugg";
  }
  function createHiddenInput(name, value, disabled) {
    if(elems[name]) {
      elems[name].value = value;
      if(disabled) elems[name].disabled = 'disabled';
      else elems[name].removeAttribute('disabled');
      return elems[name];
    }
    try{
      var element = document.createElement('<input name="'+name+'" />');
    }catch(e){}
    
    if(!element || element.nodeName.toUpperCase() != 'INPUT'){
      var element = document.createElement('input');    
    }
    element.type = 'hidden';
    element.name = name;
    element.value = value;
    if(disabled)
      element.disabled = disabled;
    frm.appendChild(element);
    return element;
  }
  
  function setFieldValue(field, val) {
    field.value = val;
  }
  if(useSuggest) {
    var fnToRun = function() {
      var fileLoaded = function() {
        if (IS_MSIE && ac.readyState != "complete" && ac.readyState != "loaded") return;
        if(!sososmart) return;
        var divs = frm.getElementsByTagName('div');
        var inputWrap;
        for(var i=0,len=divs.length;i<len;i++){
          if(divs[i].className != 'inputWarp') continue;
          inputWrap = divs[i];
          break;
        }
        
        sososmart.init(frm,input,true,'',true,inputWrap,null,null,CPID[0],scField);
      }
      var ac = d.createElement('script');
      ac.type = 'text/javascript';
      ac.async = true;
      ac.src = '//mat1.gtimg.com/www/js/qq2012/suggestion.v1.0.2.js';
      var s = d.getElementsByTagName('script')[0];
      
      if(IS_MSIE && !window.opera) {
        ac.onreadystatechange = fileLoaded;
      } else {
        ac.onload = fileLoaded;
      }
      s.parentNode.insertBefore(ac, s);
    };
    if(IS_MSIE){
      if(window.attachEvent){
        window.attachEvent('onload',fnToRun,false);
      }else{
        window.addEventListener('load',fnToRun);
      }
    }else{
      fnToRun();
    }
  }
})(document, 'soso_search_box', true,true, "sogou-wsse-b58ac8403eb9cf17-0007");

// 天气
Qfast.add('ipaddress', { path: "//fw.qq.com/ipaddress", type: "js" });
Qfast.add('weatherMap', { path: "//mat1.gtimg.com/www/js/qq2012/weatherNew_1.5.js", type: "js", requires: ['ipaddress'] });
Qfast(false, 'weatherMap', function () {
  var proName = IPData[2],
      cityName = IPData[3],
      weatherId = weatherMap["湖南省"]["_"];

  if(proName == "湖南省" && weatherMap[proName][cityName]){
      weatherId = weatherMap[proName][cityName];
  }

  Qfast.add('weatherCity',{path:"http://weather.gtimg.cn/city/" + weatherId + ".js?ref=xian",type:"js"});
  Qfast(false,'weatherCity',function(){
    $.ajax({
      cache: false,
      success: function(data, textStatus, xhr) {
        var nowTime = new Date(xhr.getResponseHeader("Date")),
            nowYear = nowTime.getFullYear(),
            nowMonth = nowTime.getMonth()+1,
            nowDate = nowTime.getDate(),
            nowTimeDay = nowTime.getDay(),
            nowTimeHour = nowTime.getHours(),
            tsTime = nowYear + '-' + nowMonth + '-' + nowDate,
            weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
            nowTimeWeek = weeks[nowTimeDay],
            
            weatherCityName,
            weatherTemperature,
            weatherIcon,
            weatherText;
        //ip城市
        weatherCityName = __weather_city["bi_name"];
        if(weatherCityName == "长沙市"){
          weatherCityName = "长沙";
        }
        //平均温度
        weatherTemperature = __weather_city["sk_tp"];
        weatherText = weatherMap["weatherIcon"][__weather_city.sk_wt]["txt"];
        //天气图标
        if(nowTimeHour >4 && nowTimeHour<20){
          weatherIcon = weatherMap["weatherIcon"][__weather_city.sk_wt]["day"];
        }else{
          weatherIcon = weatherMap["weatherIcon"][__weather_city.sk_wt]["night"];
        }

        if(nowTimeHour >8 && nowTimeHour<20){
          tsTime = tsTime + ' 8:00:00';
        }else{
          tsTime = tsTime + ' 20:00:00';
        }
        $('.weather-week').html(nowTimeWeek);
        $('.weather-ipCity').html(weatherCityName);
        $(".weather-icon").html('<img src="'+weatherIcon+'" title="'+weatherText+'" />');
        $(".weather-temperature").html(weatherTemperature + "℃");
      }
    });
  });
});

// 导航更多
$(function(){
  $('.qq-sub-site-hd .more-wrap').on({
    'mouseenter': function(){
      $(this).addClass('more-wrap-active');
    },
    'mouseleave': function(){
      $(this).removeClass('more-wrap-active');
    }
  })
});
/*  |xGv00|fb86d3f63064aae3cffd81824810317a */