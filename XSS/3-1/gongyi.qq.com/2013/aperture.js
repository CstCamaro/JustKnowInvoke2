(function () {
    var dom = function (id) { return document.getElementById(id); }
    var _isOpend = true;
    var _root = "http://gongyi.qq.com/2013/";
    var _track_width = 548;
    var _track_height = 548;
    var _count = 0;
    var _hideWhere = 1500;
    var _startDate = new Date(2013, 2, 23, 20, 30);
    var _endDate = new Date(2013, 2, 23, 21, 30);
    var _now = new Date();
    var _isDebug = false;
    var _tmpEndDate = new Date(_endDate);
    _tmpEndDate.setDate(_endDate.getDate() + 1);
    if ((_now < new Date(_startDate.toDateString()) || _now > new Date(_tmpEndDate.toDateString())) && !_isDebug)
        return;
    //人数
    //    var _init = 1000000;
    //    var _min_increment = [1000, 800];
    //    var _sec_increment = [16, 8];
    //    var _current;
    //    var _date = new Date(2013, 2, 8, 16);
    function isIE6() {
        return !!window.ActiveXObject && !window.XMLHttpRequest;
    }
    function createImage(urlAry, callback) {
        for (var i = 0; i < urlAry.length; i++) {
            var img = new Image();
            img.onload = function () {
                _count++;
                if (_count == urlAry.length) {
                    callback();
                }
            }
            img.src = _root + urlAry[i];
        }
    }
    function fadeOut(obj, callback, opacity) {
        var _opacity = opacity || 1;
        if (_opacity <= 1 && _opacity > 0) {
            _opacity -= 0.02;
            setTimeout(function () {
                fadeOut(obj, callback, _opacity);
            }, 20);
        }
        else {
            _opacity = 0; if (callback) callback();
        }
        obj.style.opacity = _opacity;
        obj.style.filter = obj.style.filter.split(" ")[0] + ' alpha(opacity=' + parseInt(_opacity * 100) + ')';
    }
    function createMaskDiv(id) {
        var div = document.createElement("div");
        div.id = "aperture-" + id;
        div.style.backgroundColor = "black";
        div.style.position = "absolute";
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.top = "0px";
        div.style.left = "0px";
        div.style.zIndex = 99998;
        div.style.opacity = 0.8;
        div.style.filter = "alpha(opacity=80)";
        div.style.display = "none";
        return div;
    }
    function createObject(html) {
        var obj = document.createElement("div");
        obj.innerHTML = html;
        return obj.children[0];
    }
    function addEventListener(obj, type, fn) {
        if (obj.addEventListener)
            obj.addEventListener(type, fn);
        else
            obj.attachEvent("on" + type, fn);
    }
    function show() {
        var maskWrap = createObject("<div id='aperture-wrap'></div>");
        //where
        var where_mask = createObject("<div style='position:fixed;width:100%;height:100%;z-index:99998;top:0px;left:0px;background-color:black;opacity:0.8;_filter:alpha(opacity=80)'></div>");
        where_mask.style.filter = "alpha(opacity=80)";
        if (isIE6()) where_mask.style.position = "absolute";
        maskWrap.appendChild(where_mask);
        var where = createObject("<div style='position: absolute;background: url(\"" + _root + "where.png\");_background:none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + _root + "where.png\",sizingMethod=\"scale\");width:434px;height:215px;z-index:99999;zoom:1;'></div>");
        maskWrap.appendChild(where);
        //track
        var track = document.createElement("div");
        track.id = "aperture-track";
        track.style.position = "absolute";
        track.style.zIndex = 99999;
        track.style.display = "none";
        track.innerHTML = "<div style='position: absolute;background: url(\"" + _root + "aperture-top.png\");_background:none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + _root + "aperture-top.png\");width:548px;height:269px;'></div>" +
						  "<div style='position: absolute;background: url(\"" + _root + "aperture-left.png\");_background:none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + _root + "aperture-left.png\");top:269px;width:264px;height:20px;'></div>" +
						  "<div style='position: absolute;background: url(\"" + _root + "aperture-right.png\");_background:none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + _root + "aperture-right.png\");left:284px;top:269px;width:264px;height:20px;'></div>" +
						  "<div style='position: absolute;background: url(\"" + _root + "aperture-bottom.png\");_background:none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + _root + "aperture-bottom.png\");top:289px;width:548px;height:259px;'></div>";
        maskWrap.appendChild(track);
        maskWrap.appendChild(createMaskDiv("top"));
        maskWrap.appendChild(createMaskDiv("left"));
        maskWrap.appendChild(createMaskDiv("right"));
        maskWrap.appendChild(createMaskDiv("bottom"));
        //灯
        var light = createObject("<div style='display:none;position: absolute;background: url(\"" + _root + "lightbulb_text.png\");_background:none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + _root + "lightbulb_text.png\");width:50px;height:60px;top:40px;left:10px;z-index:99999;cursor: pointer;'></div>");
        light.onclick = function () {
            var display = _isOpend ? "none" : "";
            track.style.display = display; dom("aperture-top").style.display = display; dom("aperture-left").style.display = display; dom("aperture-right").style.display = display; dom("aperture-bottom").style.display = display;
            _isOpend = !_isOpend;
        }
        maskWrap.appendChild(light);
        //狗熊
        var gouxiong = createObject("<div style='display:none;position: absolute;background: url(\"" + _root + "right.png\");_background:none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + _root + "right.png\");width:103px;height:85px;z-index:99999;cursor: pointer;'></div>");
        gouxiong.onmouseover = function () {
            gouxiong.style.display = "none"; button.style.display = "";
        }
        maskWrap.appendChild(gouxiong);
        //button
        var button = createObject("<div style='display:none;position: absolute;background: url(\"" + _root + "more.png\");_background:none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + _root + "more.png\");width:103px;height:85px;z-index:99999;cursor: pointer;'></div>");
        button.onmouseout = function () {
            button.style.display = "none"; gouxiong.style.display = "";
        }
        button.onclick = function () { window.open("http://www.earthhour.org.cn/"); }
        maskWrap.appendChild(button);
        //人数
        //var people = createObject("<div style='position: absolute;left: 0px; z-index: 99999;text-align: right;color:white;text-shadow: rgb(0, 0, 0) 0px 0px 5px;'></div>");
        //maskWrap.appendChild(people);
        //调整坐标
        var _positionTimer;
        var _mouseClient = { clientX: 0, clientY: 0 };
        function resetPosition() {
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
            //maskWrap.style.width = (document.documentElement.clientWidth < document.documentElement.scrollWidth ? document.documentElement.scrollWidth : document.documentElement.clientWidth) + "px";
            //maskWrap.style.height = (document.documentElement.clientHeight < document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.documentElement.clientHeight) + "px";
            light.style.left = scrollLeft + 50 + "px";
            light.style.top = scrollTop + 40 + "px";
            gouxiong.style.left = (window.innerWidth || document.documentElement.clientWidth) + scrollLeft - 103 - 100 + "px";
            gouxiong.style.top = scrollTop + 40 + "px";
            button.style.left = (window.innerWidth || document.documentElement.clientWidth) + scrollLeft - 103 - 100 + "px";
            button.style.top = scrollTop + 40 + "px";
            if (isIE6()) {
                where_mask.style.top = scrollTop + "px";
                where_mask.style.left = scrollLeft + "px";
                where_mask.style.width = document.documentElement.clientWidth + "px";
                where_mask.style.height = document.documentElement.clientHeight + "px";
            }
            where.style.left = scrollLeft + (document.documentElement.clientWidth / 2 - 409 / 2) + "px";
            where.style.top = scrollTop + (document.documentElement.clientHeight / 2 - 214 / 2) + "px";
            window.clearTimeout(_positionTimer); _positionTimer = window.setTimeout(function () { mousemove({ clientX: _mouseClient.clientX, clientY: _mouseClient.clientY }); }, 10);
        }
        document.body.insertBefore(maskWrap, document.body.firstChild);
        function mousemove(e) {
            _mouseClient = { clientX: e.clientX, clientY: e.clientY };
            window.clearTimeout(_positionTimer);
            var scroll_height = document.documentElement.clientHeight < document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.documentElement.clientHeight;
            var scroll_width = document.documentElement.scrollWidth;
            var track_top = ((e.pageY || (e.clientY + (document.body.scrollTop || document.documentElement.scrollTop))) - _track_height / 2);
            var track_left = ((e.pageX || (e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft))) - _track_width / 2);
            //reset
            //track.children[0].style.width = "0px"; track.children[1].style.width = "0px"; track.children[1].style.height = "0px"; track.children[2].style.width = "0px"; track.children[2].style.height = "0px"; track.children[3].style.width = "0px"; track.children[3].style.height = "0px";
            //dom("aperture-left").style.height = "0px"; dom("aperture-right").style.width = "0px"; dom("aperture-right").style.height = "0px"; dom("aperture-bottom").style.width = "0px"; dom("aperture-bottom").style.height = "0px";
            //
            track.style.top = track_top + "px";
            track.style.left = track_left + "px";
            //top
            track.children[0].style.width = (scroll_width - track_left > _track_width ? _track_width : scroll_width - track_left) + "px";
            //left
            track.children[1].style.width = (scroll_width - track_left > 264 ? 264 : scroll_width - track_left) + "px";
            track.children[1].style.height = (scroll_height - (track_top + 269) > 20 ? 20 : scroll_height - (track_top + 269)) + "px";
            //right
            var rw = scroll_width - (track_left + 284);
            track.children[2].style.width = (rw > 264 ? 264 : (rw > 0 ? rw : 0)) + "px";
            track.children[2].style.height = track.children[1].style.height;
            //bottom
            track.children[3].style.width = track.children[0].style.width;
            var bh = scroll_height - (track_top + 289);
            track.children[3].style.height = (bh > 259 ? 259 : (bh > 0 ? bh : 0)) + "px";

            if (track_top > 0) {
                if (isIE6()) {
                    dom("aperture-top").style.top = 0 - (2048 - track_top) + "px";
                    dom("aperture-top").style.height = "2048px";
                } else {
                    dom("aperture-top").style.height = track_top + "px";
                }
            }
            else {
                dom("aperture-top").style.height = "0px";
            }
            dom("aperture-top").style.width = scroll_width + "px";
            if (track_left > 0)
                dom("aperture-left").style.width = track_left + "px";
            else
                dom("aperture-left").style.width = "0px";
            dom("aperture-left").style.top = track_top + "px";
            dom("aperture-left").style.height = isIE6() ? "2048px" : ((scroll_height - track_top) + "px");
            dom("aperture-right").style.left = track_left + _track_width + "px";
            dom("aperture-right").style.top = track_top + "px";
            var rw = scroll_width - parseInt(dom("aperture-right").style.left);
            dom("aperture-right").style.width = rw < 0 ? 0 : rw + "px";
            dom("aperture-right").style.height = isIE6() ? "2048px" : ((scroll_height - track_top) + "px");
            dom("aperture-bottom").style.left = track_left + "px";
            dom("aperture-bottom").style.top = track_top + _track_height + "px";
            rw = scroll_width - parseInt(dom("aperture-bottom").style.left);
            dom("aperture-bottom").style.width = (rw < _track_width ? rw : _track_width) + "px";
            var bh = scroll_height - parseInt(dom("aperture-bottom").style.top);
            dom("aperture-bottom").style.height = isIE6() ? "2048px" : (bh < 0 ? 0 : bh + "px");

            //dom("log").innerHTML = document.getElementById("aperture-left").style.width + "    " + document.getElementById("aperture-track").style.left + "<br/>";
        }
        addEventListener(document, "mousemove", function (e) { mousemove(e); });
        if (/ipad/i.test(navigator.userAgent) || /android/i.test(navigator.userAgent) || /iphone/i.test(navigator.userAgent)) {
            addEventListener(document, "touchmove", function (e) {
                if (e.touches.length == 1) {
                    e.preventDefault();
                    mousemove(e.touches.item(0));
                }
            });
        }
        addEventListener(window, "resize", resetPosition);
        addEventListener(window, "scroll", resetPosition);
        resetPosition();
        mousemove({ clientX: 0, clientY: 0 });

        function showTrack() {
            where.style.display = "none"; track.style.display = ""; dom("aperture-top").style.display = ""; dom("aperture-left").style.display = ""; dom("aperture-right").style.display = ""; dom("aperture-bottom").style.display = ""; gouxiong.style.display = ""; light.style.display = ""; where_mask.style.display = "none";
        }
        if ((_now >= _startDate && _now < _endDate) || _isDebug) {
            window.setTimeout(function () {
                if (!isIE6()) {
                    fadeOut(where, showTrack);
                }
                else {
                    showTrack();
                }
            }, _hideWhere);
        }
        else if (_now > new Date(_startDate.toDateString()) && _now < new Date(_tmpEndDate.toDateString())) {
            showTrack();
            light.click();
        }
        //计算人数
        //        function createNumber(number) {
        //            return createObject("<div style='display: inline-block;*display: inline;zoom: 1;width:14px;height:19px;background: url(\"" + _root + number + ".png\");_background:none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + _root + number + ".png\");'></div>");
        //        }
        //        _current = _init;
        //        var ms = new Date() - _date;
        //        for (var i = 0; i < Math.floor(ms / (60 * 1000)); i++) {//分钟
        //            _current += (_min_increment.length == 2 ? Math.random() * (_min_increment[1] - _min_increment[0]) + _min_increment[0] : _min_increment[0]);
        //        }
        //        for (var i = 0; i < Math.floor((ms - (Math.floor(ms / (60 * 1000)) * 60 * 1000)) / 1000); i++) {//秒
        //            _current += (_sec_increment.length == 2 ? Math.random() * (_sec_increment[1] - _sec_increment[0]) + _sec_increment[0] : _sec_increment[0]);
        //        }
        //        _current = parseInt(_current);
        //        function showPeople() {
        //            _current += parseInt((_sec_increment.length == 2 ? Math.random() * (_sec_increment[1] - _sec_increment[0]) + _sec_increment[0] : _sec_increment[0]));
        //            //people.style.display = "none";
        //            while (people.childNodes.length > 0) { people.removeChild(people.childNodes[0]); }
        //            var str = _current.toString();
        //            for (var i = 0; i < str.length; i++) {
        //                people.appendChild(createNumber(str.substr(i, 1)));
        //                if (str.length - 7 == i) {
        //                    people.appendChild(createObject("<div style='display: inline-block;*display: inline;zoom: 1;width:7px;height:19px;background: url(\"" + _root + "point.png\");_background:none;_filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + _root + "point.png\");'></div>"));
        //                }
        //                if (str.length - i == 4) {
        //                    people.appendChild(document.createTextNode(" "));
        //                }
        //            }
        //            //people.style.display = "";
        //        }
        //        showPeople();
        //        window.setInterval(showPeople, 1000);
    }
    createImage(["aperture-top.png", "aperture-left.png", "aperture-right.png", "aperture-bottom.png", "where.png", "lightbulb_text.png", "right.png", "more.png"], show);
})()/*  |xGv00|1529ddb485ff06998d16f858a087d722 */