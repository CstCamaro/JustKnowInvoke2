var FBrowser = (function() {
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
        isIE: !!window.attachEvent && !isOpera,
        isOpera: isOpera,
        isSafari: ua.indexOf('AppleWebKit/') > -1,
        isFirefox: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
        MobileSafari: /Apple.*Mobile.*Safari/.test(ua),
        isChrome: !!window.chrome
    }
})();
FBrowser.isIE6 = FBrowser.isIE && !window.XMLHttpRequest;
FBrowser.isIE7 = FBrowser.isIE && !!window.XMLHttpRequest;
String.prototype.lTrim = function() {
    return this.replace(/^\s*/, "")
};
String.prototype.rTrim = function() {
    return this.replace(/\s*$/, "")
};
String.prototype.trim = function() {
    return this.rTrim().lTrim()
};
function Fid(id) {
    return document.getElementById(id)
};
function Fempty(v) {
    if (v != null && (typeof(v) == 'object' || typeof(v) == 'function')) return false;
    return (("" == v || undefined == v || null == v) ? true: false)
};
var FObjId = function(s) {
    return (typeof s == "object") ? s: document.getElementById(s)
};
var FJsLoader = {
    load: function(sId, sUrl, fCallback, chset) {
        try {
            FObjId(sId).parentNode.removeChild(FObjId(sId))
        } catch(e) {}
        var _script = document.createElement("script");
        _script.setAttribute("id", sId);
        _script.setAttribute("type", "text/javascript");
        _script.setAttribute("src", sUrl);
        if (chset) {
            _script.setAttribute("charset", chset)
        } else {
            _script.setAttribute("charset", "gb2312")
        };
        document.getElementsByTagName("head")[0].appendChild(_script);
        if (FBrowser.isIE) {
            _script.onreadystatechange = function() {
                if (this.readyState == "loaded" || this.readyState == "complete") {
                    try {
                        FObjId(_script).parentNode.removeChild(FObjId(_script))
                    } catch(e) {}
                    fCallback()
                }
            }
        } else if (FBrowser.isFirefox || FBrowser.isSafari || FBrowser.isOpera || FBrowser.isChrome) {
            _script.onload = function() {
                try {
                    FObjId(_script).parentNode.removeChild(FObjId(_script))
                } catch(e) {}
                fCallback()
            }
        } else {
            try {
                FObjId(_script).parentNode.removeChild(FObjId(_script))
            } catch(e) {}
            fCallback()
        }
    }
};
function FSelectValue(selId) {
    var selObj = Fid(selId);
    return selObj.options[selObj.selectedIndex].value
};
function SmartBox(_smartbox_name, _formId, _inputBoxId, _resultListBoxId, _resultListId, _searchBtnId, _itemIdPrefix, _params, len, _citySubName) {
    this.formId = _formId;
    this.inputBoxId = _inputBoxId;
    this.resultListBoxId = _resultListBoxId;
    this.resultListId = _resultListId;
    this.searchBtnId = _searchBtnId;
    this.inputBoxMsg = '请输入关键字(楼盘名/别名/拼音等)';
    this.defaultBoxMsg = typeof g_smartbox_init_tip_txt == 'undefined' ? '' : g_smartbox_init_tip_txt; 
    this.noResultMsg = '';
    this.itemIdPrefix = _itemIdPrefix;
    this.curItemIdx = -1;
    this.itemCount = 0;
    this.inputBoxMsgColor = '#AEAEAE';
    this.inputColor = '#000000';
    this.filterStr = "[^\u4e00-\u9fA5a-z0-9@·]";
    this.promptMsg = '请输入要搜索的内容';
    this.citySubName = _citySubName;
    this.domain = 'db.house.qq.com';
    this.cache = null;
    this.lastIndex = '';
    this.input = '';
    this.smartbox_name = _smartbox_name;
    this.params = _params;
    this.len = len;
    this.boxNo = this.formId.slice(this.formId.length - 1, this.formId.length)
};
SmartBox.prototype = {
    constructor: SmartBox,
    ajax: function() {
        var inputValue = Fid(this.inputBoxId).value;
        var reg = new RegExp(this.filterStr, 'ig');
        inputValue = inputValue.replace(reg, '');
        var url = '//'+this.domain + '/index.php?mod=smartbox&act=query&q=' + encodeURIComponent(inputValue) + '&c=' + this.citySubName + '&r=' + Math.random();
        var that = this;
        FJsLoader.load('smartbox_ajax', url,
        function() {
            var resultList = Fid(that.resultListId);
            if (typeof smartbox_data_json == 'undefined' || Fempty(smartbox_data_json)) {
                that.closeResultBox();
                return
            } else {
                var list = smartbox_data_json;
                that.itemCount = list.length;
                if (that.itemCount <= 0) {
                    that.closeResultBox();
                    return
                };
                that.cache = list;
                that.hasData = true;
                resultList.innerHTML = '';
                for (var i = 0; i < list.length; i++) {
                    if (list[i].houseName.length >= that.len + 2) {
                        var showName = list[i].houseName.substr(0, that.len);
                        showName += '...';
                        var li = document.createElement("li");
                        li.id = that.itemIdPrefix + i;
                        li.className = '';
                        li.title = list[i].houseName;
                        li.src = list[i].houseId + ';' + list[i].houseDomain;
                        li.onclick = function(event) {
                            window['smartbox_' + that.boxNo].clickItem(event, window['smartbox_' + that.boxNo])
                        };
                        li.onmouseover = function() {
                            this.className = "focus"
                        };
                        li.innerHTML = '<div>' + showName + '</div>';
                    } else {
                        var li = document.createElement("li");
                        li.id = that.itemIdPrefix + i;
                        li.className = '';
                        li.src = list[i].houseId + ';' + list[i].houseDomain;
                        li.onclick = function(event) {
                            window['smartbox_' + that.boxNo].clickItem(event, window['smartbox_' + that.boxNo])
                        };
                        li.onmouseover = function() {
                            this.className = "focus"
                        };
                        li.innerHTML = '<div>' + list[i].houseName + '</div>';
                    };
                    resultList.appendChild(li)
                };
                var resultBox = Fid(that.resultListBoxId);
                resultBox.style.display = 'block';
                resultList.style.display = "block";
                resultList.style.top = "12px";
                resultList.style.width = "242px";
                resultBox.onmouseout = function() {
                    that.mouseOutList()
                }
            }
        })
    },
    keyup: function(e) {
        var input = Fid(this.inputBoxId);
        var ev = e ? e: window.event;

        if (ev.keyCode == 27) {
            this.closeResultBox()
        } else if (ev.keyCode == 40) {
            if (Fid(this.inputBoxId).value == '') {
                return false
            };
            if (this.curItemIdx < this.itemCount - 1) {
                this.curItemIdx++;
                input.value = this.cache[this.curItemIdx].houseName
            } else {
                this.curItemIdx = -1;
                input.value = this.input
            };
            this.focusItem(this.curItemIdx, this.smartbox_name)
        } else if (ev.keyCode == 38) {
            if (Fid(this.inputBoxId).value == '') {
                return false
            };
            if (this.curItemIdx == -1) {
                this.curItemIdx = this.itemCount - 1;
                input.value = this.cache[this.curItemIdx].houseName
            } else if (this.curItemIdx > 0) {
                this.curItemIdx--;
                input.value = this.cache[this.curItemIdx].houseName
            } else {
                this.curItemIdx--;
                input.value = this.input
            };
            this.focusItem(this.curItemIdx, this.smartbox_name)
        } else if (ev.keyCode == 13) {
            this.input = input.value;
            if (this.smartbox_name == 'smartbox_3') {
                var idx = smartbox_3.curItemIdx;
                var cache = smartbox_3.cache;
                if (cache != null && idx != -1) {
                    var obj = cache[idx];
                    Fid('submit_id_str').value = obj.houseId
                }
            };
            if ('' == input.value.trim()) {
                this.closeResultBox()
            } else {
                this.openResultBox()
            }
        } else {
            this.input = input.value;
            if ('' == input.value.trim()) {
                this.closeResultBox()
            } else {
                this.openResultBox()
            }
        };
        return false
    },
    mouseOutList: function() {
        this.curItemIdx = -1;
        this.focusItem(this.curItemIdx, this.smartbox_name)
    },
    click: function(event) {
        for (var i = 1; window['smartbox_' + i]; i++) {
            window['smartbox_' + i].closeResultBox()
        };
        var e = event ? event: window.event;
        if (e.stopPropagation) {
            e.stopPropagation()
        } else {
            e.cancelBubble = true
        };
        var input = Fid(this.inputBoxId);
		
	if((this.inputBoxMsg != '' && input.value == this.inputBoxMsg) || input.value == this.defaultBoxMsg)
		{
			input.value = '';
            input.style.color = this.inputColor
		}
		
        this.openResultBox()
    },
	
	//初始化提示框
    initInputBoxMsg: function() {
        var input = Fid(this.inputBoxId);

        if ('' == input.value.trim()) {
			//有输入的为输入的，没有则为默认的
            input.value = this.defaultBoxMsg ? this.defaultBoxMsg : this.inputBoxMsg;
			
            input.style.color = this.inputBoxMsgColor;
        }
    },
	//恢复提示框
	 recoverInputBoxMsg: function() {
        var input = Fid(this.inputBoxId);
		var val = input.value.trim();

		//如果是默认值，或提示语则设为空
		if((this.defaultBoxMsg != '' && val == this.defaultBoxMsg) || val == this.inputBoxMsg)
		{
			input.value = '';
            input.style.color = this.inputColor
		}else if(val == ''){//如果是空的则设为提示语
			input.value = this.inputBoxMsg;
			input.style.color = this.inputBoxMsgColor
		}
    },
    openResultBox: function() {
        var target = 'smartbox_' + this.boxNo;
        document.onclick = function() {
            window[target].recoverInputBoxMsg();
            window[target].closeResultBox();
            document.onclick = null
        };
        this.curItemIdx = -1;
        var input = Fid(this.inputBoxId);
        if ('' == input.value.trim() || '0' == input.value.trim()) {
            return
        };
        this.ajax()
    },
    closeResultBox: function() {
        var resultBox = Fid(this.resultListBoxId);
        resultBox.style.display = 'none';
        var resultList = Fid(this.resultListId);
        resultList.innerHTML = ''
    },
    search: function() {
        var input = Fid(this.inputBoxId);
        var inputVal = input.value;
        if (inputVal == this.inputBoxMsg) {
            inputVal = ''
        };
        var reg = new RegExp(this.filterStr, 'ig');
        inputVal = inputVal.replace(reg, ' ');
        inputVal = inputVal.trim();
        var searchURL = '//'+this.domain + '/index.php?mod=search&city=' + this.citySubName + '&all=';
        searchURL += encodeURIComponent(inputVal);
        for (var param in this.params) {
            var selObj = Fid(this.params[param]).getElementsByTagName("select")[0];
            var param_val = selObj.value.trim();
            param_val = (param_val == '') ? '': param_val;
            searchURL += '&' + param + '=' + encodeURIComponent(param_val)
        };
        var url = searchURL;
        if (typeof g_search_info_smartbox != "undefined" && g_search_info_smartbox == 1) {
            window.location = url
        } else {
            window.open(url)
        };
        return false
    },
    addEventSimple: function(obj, evt, fn) {
        if (obj.attachEvent) {
            obj.attachEvent('on' + evt, fn)
        } else if (obj.addEventListener) {
            obj.addEventListener(evt, fn, false)
        }
    },
    checkHouseName: function(houseName) {
        var cache = smartbox_3.cache;
        cache = cache || [];
        for (var i = 0,
        len = cache.length; i < len; i++) {
            var obj = cache[i];
            if (houseName == obj.houseName) {
                return true
            }
        };
        return false
    },
    init: function() {
        var input = Fid(this.inputBoxId);
        if (!Fempty(input)) {
            this.addEventSimple(window, 'load',
            function() {
                input.blur()
            });
            var target = 'smartbox_' + this.boxNo;
            input.onclick = function(event) {
                window[target].click(event)
            };
            input.onkeyup = function(event) {
                window[target].keyup(event);
            }
        };
        if (this.formId != null) {
            var form = Fid(this.formId);
            if (!Fempty(form)) {
                var that = this;
                form.onsubmit = function() {
                    if ( - 1 != that.curItemIdx) {
                        var idx = that.cache[that.curItemIdx].houseDomain;
                        var houseId = that.cache[that.curItemIdx].houseId;
                        if ('' == idx) {
                            idx = houseId
                        };
                        var url = '//'+that.domain + '/' + that.citySubName + '_' + idx + '/';
                        window.open(url)
                    } else {
                        that.search()
                    };
                    return false
                }
            }
        }
    },
    clickItem: function(event, that, houseId, houseDomain) {
        var e = event ? event: window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
            var arg = (e.target).parentNode.src
        } else {
            e.cancelBubble = true;
            var arg = (e.srcElement).parentElement.src;
            if (!arg) arg = e.srcElement.src
        };
        for (var i = 1; window['smartbox_' + i]; i++) {
            if (that.smartbox_name.slice(that.smartbox_name.length - 1, that.smartbox_name.length) == i) {
                var obj = window['smartbox_' + i];
                break
            }
        };
        var idx = arg.split(';')[1];
        if ('' == idx) {
            idx = arg.split(';')[0]
        };
        var url = '//'+obj.domain + '/' + obj.citySubName + '_' + idx + '/';
        window.open(url);
        return false
    },
    mouseoverItem: function(smartbox_name, itemIdx) {
        for (var i = 1; window['smartbox_' + i]; i++) {
            if (smartbox_name.slice(smartbox_name.length - 1, smartbox_name.length) == i) {
                var obj = window['smartbox_' + i];
                break
            }
        };
        for (var i = 0; i < obj.itemCount; i++) {
            var item = Fid(obj.itemIdPrefix + i);
            if (item == null) {
                return
            };
            if (i == itemIdx) {
                item.className = 'focus'
            } else {
                item.className = ''
            }
        }
    },
    focusItem: function(itemIdx, smartbox_name) {
        for (var i = 1; window['smartbox_' + i]; i++) {
            if (smartbox_name.slice(smartbox_name.length - 1, smartbox_name.length) == i) {
                var obj = window['smartbox_' + i];
                break
            }
        };
        for (var i = 0; i < obj.itemCount; i++) {
            var item = Fid(obj.itemIdPrefix + i);
            if (item == null) {
                return
            };
            if (i == itemIdx) {
                item.className = 'focus'
            } else {
                item.className = ''
            }
        }
    }
};
function createSmartbox(targetPositionId, params, city) {
    if (!targetPositionId) {
        return
    };
    var iform = targetPositionId.slice(targetPositionId.length - 1, targetPositionId.length);
    var inputText = document.createElement("input");
    inputText.type = "text";
    inputText.autocomplete = "off";
    inputText.id = "smartbox_" + iform;
    inputText.name = "smartbox_" + iform;
    var ul = document.createElement("ul");
    ul.id = "smartbox_list_" + iform;
    ul.style.margin = 0;
    ul.style.padding = 0;
    var divInside = document.createElement("div");
    divInside.id = "smartbox_result_" + iform;
    divInside.style.display = "none";
    divInside.appendChild(ul);
    var inputSubmit = document.createElement("input");
    inputSubmit.type = "submit";
    inputSubmit.id = "smartbox_search_" + iform;
    inputSubmit.name = "Submit";
    inputSubmit.value = "";
    var divOutside = document.createElement("div");
    divOutside.style.position = "relative";
    divOutside.style.zIndex = 10;
    divOutside.id = "smartboxDiv_" + iform;
    divOutside.appendChild(inputText);
    divOutside.appendChild(divInside);
    divOutside.appendChild(inputSubmit);
    document.getElementById(targetPositionId).appendChild(divOutside);
    var style = document.createElement("style");
    style.type = "text/css";
    var css = "#smartbox_result_" + iform;
    css += '{background: none repeat scroll 0 0 #FFFFFF;display: none;left: 0;position: absolute;text-align: left;top:22px;width:242px;}';
    css += '#smartbox_list_' + iform + ' li';
    css += '{border: 0 none;height:30px;line-height:30px;text-align: left;list-style:none;}';
    css += '#smartbox_list_' + iform + ' .focus';
    css += '{background: none repeat scroll 0 0 #DEEFFF;cursor: pointer;display: block;height: 30px;line-height:30px;text-decoration: none;}';
    try {
        style.appendChild(document.createTextNode(css))
    } catch(ex) {
        style.styleSheet.cssText = css
    };
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
    var str = "smartbox_" + iform;
    var wid = document.getElementById(str).offsetWidth;
    var len = Math.floor(wid / 13);
    window["smartbox_" + iform] = new SmartBox(inputText.id, targetPositionId, inputText.id, divInside.id, ul.id, inputSubmit.id, 'smartbox_item_' + iform + '_', params, len, city);
    window["smartbox_" + iform].init();
    document.getElementById(divInside.id).style.width = (wid - 2) + "px";
    window["smartbox_" + iform].initInputBoxMsg()
}/*  |xGv00|752faff813486a117c5f5325a0ba2cf9 */