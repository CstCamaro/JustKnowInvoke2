
var simplexhr = {
    doxhr: function (container, url) {
        if (!document.getElementById || !document.createTextNode) { return; }
        simplexhr.outputContainer = document.getElementById(container);
        if (!simplexhr.outputContainer) { return; }
        var request;
        try {
            request = new XMLHttpRequest();
        } catch (error) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (error) {
                return true;
            }
        }
        request.open('get', url, true);
        request.onreadystatechange = function () {
            if (request.readyState == 1) {
                simplexhr.outputContainer.innerHTML = 'loading...';
            }
            if (request.readyState == 4) {
                if (request.status && /200|304/.test(request.status)) {
                    simplexhr.retrieved(request);
                } else {
                    simplexhr.failed(request);
                }
            }
        }
        request.setRequestHeader('If-Modified-Since', 'Wed, 05 Apr 2006 00:00:00 GMT');
        request.send(null);
        return false;
    },
    retrieved: function (requester) {
        var data = requester.responseText;
        simplexhr.outputContainer.innerHTML = data;
        return false;
    },
    failed: function (requester) {
        //alert(requester.status+'的问题！重新刷一下页面试试O(∩_∩)~' );
        return true;
    },
    encode: function (string) {
        return escape(this._utf8_encode(string));
    },
    decode: function (string) {
        return this._utf8_decode(unescape(string));
    },
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};

function weatherInfo() { }

weatherInfo.prototype = {
    getArgs: function () {
        var args = {};
        var query = location.search.substring(1);
        var pairs = query.split("&");
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf("=");
            if (pos == -1) continue;
            var argname = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos + 1);
            value = decodeURIComponent(value);
            args[argname] = value;
        }
        return args;
    },
    //获取准确城市ID
    getCityID: function () {
        var _this = this;
        var proviceName = IPData[2];
        var cityName = IPData[3];
        var cityId = null;

        var _url = window.location.href;
        var mode1 = 'acity';
        var mode2 = 'icity';

        if (_url.indexOf(mode2) != -1) {
            var iPos = _url.indexOf(mode2);
            var txt = _url.substr(iPos);
            cityId = _this.getArgs().icity;
        } else if (_url.indexOf(mode1) != -1) {
            var iPos = _url.indexOf(mode1);
            var txt = _url.substr(iPos);
            var cityTxt = txt.split('.')[0].substr(5);
            //var cityTxt = _this.getArgs().acity;
            cityTxt = simplexhr.decode(cityTxt);
            cityId = cSite.dirCity.city[cityTxt];
            if (cityId == undefined) {
                cityId = cSite.dirCity.defaultCity;
            }
        } else {
            if ((proviceName != '')) {
                if (cityName == '' || cityName == '未知') {
                    cityId = Site.Weather.city[proviceName]['_'];
                } else {
                    cityId = Site.Weather.city[proviceName][cityName];
                }
            } else {
                cityId = Site.Weather.defaultCity;
            }
        }
        return cityId;
    },
    //加载js
    loadJs: function (url, charsetMode, jsName, callback) {
        var script = document.createElement('script');
        script.charset = charsetMode;
        script.id = jsName;
        script.src = url;
        script.type = 'text/javascript';
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
        if (script.attachEvent) {
            script.attachEvent('onreadystatechange', function () {
                if (script.readyState == 4 || script.readyState == 'complete' || script.readyState == 'loaded') {
                    callback();
                }
            });
        } else if (script.addEventListener) {
            script.addEventListener('load', callback, false)
        }
    },
    //删除js
    removeJs: function (jsName) {
        var script = document.getElementById(jsName);
        var head = document.getElementsByTagName('head')[0];
        head.removeChild(script);
    },
    //获取天气信息，例如气温，经度纬度等
    getWeatherInfo: function () {
        var _this = this;
        var cityId = this.getCityID();

        var icoUrl = Site.weatherInfo.icoUrl;
        var ie6 = ! -[1, ] && !window.XMLHttpRequest;
        var H17 = wTime.currentHours < 17;

        /* 当日天气 */
        function getDayWeather(wInfo, icoUrl, wtObj, bgOnNight, icoOnNight){
            var curW = $("#cur-box");
            if (wInfo.sk_wt) {
                var bgImg = icoUrl + wtObj.bg + bgOnNight +".jpg";
                var icoImg = icoUrl + "TB_" + wtObj.ico + icoOnNight +".png";
                $(".page").css({"background-image": "url(" + bgImg + ")"});
                if (!ie6) {
                    curW.find(".big-ico").html('<img src="' + icoImg + '" /> ');
                } else {
                    curW.find(".big-ico").css({'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + icoImg + '" ,sizingMethod="noscale")'});
                }
            }
			$("#cateWeatherInfo").html('<p>'+wInfo.bi_name+'</p><p>'+wtObj.name+' '+wInfo.sk_tp+'度</p>');
        }

        // 城市接口数据
        this.loadJs('http://weather.gtimg.cn/city/' + cityId + '.js', 'gb2312', 'weatherJs', function () {

            var wInfo = __weather_city;
            var icoOnNight = "";
            var bgOnNight = "";
            // 图片名及路径
            var wtObj = Site.weatherInfo.data[wInfo.sk_wt];

            var curTime = wTime.currentHours + wTime.currentMinute;
            function dayOrNightFn(){
                return wTime.currentHours > wInfo.bi_sr.split(":")[0] && wTime.currentHours < wInfo.bi_ss.split(":")[0] ? '_baitian' : '_yejian';
                //return curTime > wInfo.bi_sr.replace(/:/g,"") && curTime < wInfo.bi_ss.replace(/:/g,"") ? '_baitian' : '_yejian';
            }
            switch(wInfo.sk_wt){
                case "00":
                case "01":
                    icoOnNight = dayOrNightFn();
                    bgOnNight = dayOrNightFn();
                    break;
                case "02":
                case "04":
                case "05":
                case "18":
                case "53":
                    bgOnNight = dayOrNightFn();
                    break;
                case "03":
                case "13":
                    icoOnNight = dayOrNightFn();
                    break;
            };

            // 当日天气
            getDayWeather(wInfo, icoUrl, wtObj, bgOnNight, icoOnNight);

            _this.removeJs('weatherJs');
        });
    }
}
weatherInfo.prototype.getWeatherInfo();
/*  |xGv00|f7e0c7112f81633171f19657e917ad7d */