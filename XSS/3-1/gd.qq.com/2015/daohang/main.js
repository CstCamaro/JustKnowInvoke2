// หันท
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
    CPID[0] = "sogou-wsse-b58ac8403eb9cf17-0050";
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


/*  |xGv00|1cc9247eb30a6f89f4792bf2970906ff */