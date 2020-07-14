/**
 * 前端错误监控
 * http://km.oa.com/group/20807/articles/show/207071
 * 注：
 * 1. 如果需要使用Mta上报错误，需要提前加载 http://tajs.qq.com/h5?sId=500000560
 * 2. 后续有条件之后，再搭建上报接收服务器（可以考虑自助接入Boss数据）
 * @pingback
 */
(function(){
  var Report = {};
  Report.pics = [];
  Report.idx = 0;
  Report.count = 10;
  Report.url = '//d.auto.qq.com';
  Report.upload = function(data){
    var pic = Report.pics[Report.idx];
    Report.idx++;
    if(Report.idx == Report.count){
      Report.idx = 0;
    }
    if(typeof MtaH5 != 'undefined'){
      MtaH5.clickStat(encodeURIComponent(data.url) + '----' + data.hint);
    }
    else{
      pic.src = Report.url + '?' + obj2qs(data);
    }
  };
  
  for(var i = 0; i < Report.count; i++){
    Report.pics.push(new Image());
  }

  var obj2qs = function(obj){
    var qs = '';
    for(var key in obj){
      qs += key + '=' + encodeURIComponent(obj[key]) + '&';
    }
    qs = qs.replace(/&$/g,'');//去掉末尾多加的那个"&"
    return qs;
  }

  window.onerror = function(msg,url,line,col,error){
    //没有URL不上报！上报也不知道错误
    if (msg != "Script error." && !url){
      return false;
    }
    //采用异步的方式
    //我遇到过在window.onunload进行ajax的堵塞上报
    //由于客户端强制关闭webview导致这次堵塞上报有Network Error
    //我猜测这里window.onerror的执行流在关闭前是必然执行的
    //而离开文章之后的上报对于业务来说是可丢失的
    //所以我把这里的执行流放到异步事件去执行
    //脚本的异常数降低了10倍
    setTimeout(function(){
      var data = {};
      //不一定所有浏览器都支持col参数
      col = col || (window.event && window.event.errorCharacter) || 0;

      data.url = url || location.href;
      data.line = line;
      data.col = col;
      data.hint = msg;
      if (!!error && !!error.stack){
        //如果浏览器有堆栈信息
        //直接使用
        data.msg = error.stack.toString();
      }else if (!!arguments.callee){
        //尝试通过callee拿堆栈信息
        var ext = [];
        var f = arguments.callee.caller, c = 3;
        //这里只拿三层堆栈信息
        while (f && (--c>0)) {
          ext.push(f.toString());
          if (f  === f.caller) {
            break;//如果有环
          }
          f = f.caller;
        }
        ext = ext.join(",");
        data.msg = ext;
      }
      //把data上报到后台！
      Report.upload(data);
    },0);

    return false;
  };
}());
/*  |xGv00|3ca704d604e895d2d8846ef7b8f610ac */