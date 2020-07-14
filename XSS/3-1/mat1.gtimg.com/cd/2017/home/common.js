String.prototype.trim = function() {
    return (this.replace(/(\s+)$/g, '')).replace(/^\s+/g, '');
};
String.prototype.hash = function(length) {
    length = length ? length : 32;
    var string = this;
    var start = 0, i = 0, result = '', filllen = length - string.length % length,
        stringxor = function (s1, s2) {
            var s = '';
            var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var max = Math.max(s1.length, s2.length);
            for(var i=0; i<max; i++) {
                var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
                s += hash.charAt(k % 52);
            }
            return s;
        };
    for (i = 0; i < filllen; i++) {
        string += '0';
    }
    while(start < string.length) {
        result = stringxor(result, string.substr(start, length));
        start += length;
    }
    return result;
};

/**
 * 将时间戳转换为时间
 * @param nS时间戳 返回格式   xxxx年/x月/x日
 *
 * */
var getLocalTime = function(nS) {
    var d = new Date(parseInt(nS) * 1000);    //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "/" + (d.getMonth() + 1) + "/" + (d.getDate());
    return date;
//            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}

/**
 * 截取固定长度文字显示
 *
 * @param str 原始文字字符串
 * @param len 需要显示字符长度（一个汉字占两个字符位）
 *
 * */
var cutstr = function(str, len) {
    var str_length = 0;
    var str_len = 0;
    var str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    if (str_length < len) {
        return str;
    }
}

/**
 * 判断函数（数据类型，浏览器类型）
 *
 * 判断数据类型 checkType  (返回数据类型格式)
 *
 * 判断浏览器类型 checkBrowser (返回浏览器类型)
 *
*/
var check = {
    checkType: function(data){
        return Object.prototype.toString.call(data).match(/^\[object\s?(\w+)\]$/i)[1];
    },
    checkBrowser: function(){
        if(navigator.userAgent.indexOf('MSIE')>0) {
            return 'MSIE';
        }
        if(isFirefox=navigator.userAgent.indexOf('Firefox')>0){
            return 'Firefox';
        }
        if(isSafari=navigator.userAgent.indexOf('Safari')>0) {
            return 'Safari';
        }
        if(isCamino=navigator.userAgent.indexOf('Camino')>0){
            return 'Camino';
        }
        if(isMozilla=navigator.userAgent.indexOf('Gecko/')>0){
            return 'Gecko';
        }
    }
};

/**
 * 封装统一请求数据接口的方法
 * 队列请求，延迟请求
 *
 *
 * @param url 接口地址
 * @param data 参数对象
 * @param func 回调函数，请传参为返回的结果数据
 * @param method 请求方式：GET - AJAX的GET方式（默认），POST - AJAX的POST方式，jsonp - 以JSONP方式请求
 * @param timeout 延迟加载的时间，1000 = 1秒
 *
 */
var load = function(url, data, func, method, timeout) {
    method = !method ? 'GET' : method;
    timeout = typeof timeout == 'undefined' ? 0 : timeout;
    var setting = {
        url: url,
        data: data,
        success: function(R) {
            reqQueue.num--;
            if (typeof func == 'function') {
                func(R);
            }
        },
        error: function(xhr, errorType, error) {
            reqout(this, [xhr, errorType, error]);
        },
        index: 0
    };
    if (method.toLowerCase() == 'jsonp') {
        setting.type = 'GET';
        setting.dataType = 'jsonp';
        setting.jsonp = 'callback';
    } else {
        setting.type = method;
        setting.dataType = 'json';
        setting.xhrFields = { withCredentials: true }
    }
    if (!window.reqQueue) {
        window.reqQueue = {
            list: [],
            reqs: [],
            itv: null,
            num: 0,
            gtime: 0,
            count: 0
        };
        console.log('Request begin time: ' + (new Date()).getTime());
    }
    setting.idx = reqQueue.count;
    var item = { opt: setting, trytimes: 0, timeout: timeout };
    reqQueue.list.push(item);
    reqQueue.reqs.push(item);
    reqQueue.count++;
    var maxReqCount = 4,
        reqout = function (opt, err) {
            var idx = opt.idx, item = reqQueue.reqs[idx];
            item.trytimes++;
            if (item.trytimes > 2) {
                console.warn('Request failed: ' + opt.url, 'Try ' + (item.trytimes - 1) + ' times.');
            } else {
                reqQueue.list.push(item);
                if (!reqQueue.itv) {
                    request();
                }
                console.log('Retry: ' + opt.url + ', ' + item.trytimes + ' times');
            }
        },
        request = function() {
            var dNum = maxReqCount - reqQueue.num;
            if (dNum <= 0) {
                return;
            }
            if (!reqQueue.list.length) {
                reqQueue.gtime++;
                if (reqQueue.gtime > 10 && reqQueue.itv) {
                    clearInterval(reqQueue.itv);
                    console.log('Request end time: ' + (new Date()).getTime());
                }
                return;
            }
            for (var i = 0; i < dNum; i++) {
                var item = reqQueue.list.shift();
                if (!item) {
                    break;
                }
                if (item.timeout) {
                    delay(item.opt, item.timeout);
                } else {
                    $.ajax(item.opt);
                }
                reqQueue.num++;
            }
            if (!reqQueue.itv) {
                reqQueue.itv = setInterval(request, 200);
            }
        },
        delay = function(opt, time) {
            setTimeout(function() {
                $.ajax(opt);
            }, time);
        };
    request();
};

var getData = function(url,callback){
    $.ajax({
        type: "get",
        url: url,
        dataType: "jsonp",
        jsonp: "callback",
        success: callback
    });
};

/**
 *动态脚本加载
 *
 * @param url js文件地址
 * @param callback 依赖js文件执行的函数
 * @param charset 文件编码格式 例如：'UTF-8'
 *
 */
var loadScript = function(url, callback, charset){
    var script = document.createElement ('script');
    script.type = 'text/javascript';
    if (script.readyState){ //IE
        script.onreadystatechange = function(){
            if (script.readyState == 'loaded' || script.readyState == 'complete'){
                script.onreadystatechange = null;
                if(typeof callback == 'function'){
                    script.onload = callback;
                }
            }
        };
    } else { //Others
        if(typeof callback == 'function'){
            script.onload = callback;
        }
    }
    script.src = url;
    charset && script.setAttribute('charset', charset);
    document.getElementsByTagName('head')[0].appendChild(script);
};

/**
* 定义从固定数目的数字中产生某数量的随机数
*
* @param arrLen 需要产生随机数的长度
* @param arrMax 产生随机数的最大范围
* @param arra 一个存储随机数的空数组
* 使用示例：定义一个空数组arr1， 调用函数  getArr(20,50,arr1)  从0-50中每次随机产生20个数据
*
* */
var generateRandom = function(count,arra){
    var rand = parseInt(Math.random()*count);
    for(var i = 0 ; i < arra.length; i++){
        if(arra[i] == rand){
            return false;
        }
    }
    arra.push(rand);
}
var getArr = function(arrLen, arrMax, arra){
    for(var i = 0 ; ; i++){
        if(arra.length<arrLen){
            generateRandom(arrMax,arra);
        }else{
            break;
        }
    }
};
/**
* Local Storage set(设置) get（获取）del（删除）
*
*
* set 设置localStorage
* @param key  名称
* @param value  值
* @param exp  过期时间（分钟数）
*
* get 获取localStorage 值
* @param key 需要获取值所对应的名称
*
* del 删除动态写入localStorage 的键值对
*
*
* */
var cache = {
    set: function(key, value, exp) {
        var time  = 0;
        value = JSON.stringify(value);
        if (typeof exp != 'undefined' && exp > 0) {
            time  = Math.ceil((new Date()).getTime() / 1000) + exp;
            value = time + '@' + value;
        }
        try{
            window.localStorage.setItem(key,value);
        } catch(error) {

        }
    },
    get: function(key) {
        var value = null;
        value = window.localStorage.getItem(key);
        if (value && value.indexOf('@') != -1) {
            var time = parseInt(value.substring(0, 10));
            if(Math.ceil((new Date()).getTime() / 1000) <= time) {
                value = value.substring(11);
            } else {
                value = null;
            }
        }
        return JSON.parse(value);
    },
    del: function(key) {
        localStorage.removeItem(key);
    }
};

/**
 *
 * 定义对象转数组函数
 *
 * @param iterable 对象
 *
 *
 * */
var objToArray = function(iterable) {
    if (!iterable) return [];
    if (iterable.toArray) return iterable.toArray();
    var length = iterable.length || 0, results = new Array(length);
    while (length--) results[length] = iterable[length];
    return results;
};

/**
 * 适配跳转
 *
 * */
var gotoM = function(murl){
    if(murl != null){
        if(/Android|webOS|iPhone|iPod|BlackBerry|SymbianOS/i.test(navigator.userAgent)){
            var url=window.location.href;
            if(url.indexOf("?mobile")<0){
                try{
                    /*添加移动端链接*/
                    window.location.href=murl;
                }catch(e){}
            }
        }
    }
}


/*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
 * */
var cookie = function (name, value, seconds, domain) {
    if (typeof value == 'undefined') {
        name += '=';
        value = document.cookie.split(';');
        for (var e = 0; e < value.length; e++) {
            var k = value[e].trim();
            if (k.indexOf(name) == 0) {
                return unescape(k.substring(name.length, k.length));
            }
        }
        return null;
    }
    if (seconds) {
        var expires = new Date();
        expires.setTime(expires.getTime() + seconds * 1000);
        seconds = '; expires=' + expires.toGMTString();
    } else {
        seconds = '';
    }
    document.cookie = name + '=' + escape(value) + seconds + '; path=/' + (domain ? ';domain=' + domain : '');
};


var s_code = function() {
    var s = cookie('mascot_s_code');
    return s ? encodeURIComponent(s) : '';
};

var ajax = function (url, data, func, exp, loading, ignoreErr) {
    var api = url;
    var dataType = 'json';
    var cache = false;
    exp = (typeof exp == 'undefined') ? 0 : parseInt(exp);
    ignoreErr = (typeof ignoreErr == 'undefined') ? false : true;
    if(exp > 0) {
        cache = true;
        data.exp = exp;
    }
    url += ((url.indexOf('?') > -1) ? '&' : '?') + 's_code=' + s_code();
    var setting = {
        url: url,
        data: data,
        type: 'GET',
        dataType: dataType,
        crossDomain: true,
        success: function(R) {
            if (!ignoreErr && typeof R.code != 'undefined' && R.code != 0 && R.code != 4011 && R.code != 4001) {
                _alert('出错啦！' + R.msg);
            }
            if (typeof func == 'function') {
                func(R);
            }
        },
        error: function(xhr, errorType, error) {
            //_boss_report(xhr.status, errorType + (error ? error : ''));
        }
    };
    if (dataType == 'json') {
        setting.xhrFields = { withCredentials: true };
    }
    $.ajax(setting);
};




/*  |xGv00|df74a4bd4faeba1e7b343213fc331aef */