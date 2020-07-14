/**
 * 省市联动
 * @param config
 * linkage(config);
 * 2017/8/1
 */
var config = {
    // 'url': '/default/getdata',
    'data': _data,
    'select': [
        {'id': 'pro', 'text': '请选择省份', 'value': '请选择省份'},	//省
        {'id': 'city', 'text': '请选择城市','value': '请选择城市'},			//市
        {'id': 'dealer', 'text': '请选择经销商','value': '请选择经销商'}				//code
    ]
};
var linkage = function(config,prefix){
    //设置select默认选项
    function setDefault(obj, text, value) {
        obj.options[0] = new Option(text, value);
    }
    //设置select选项
    function setOption(obj, text, value) {
        obj.options[obj.options.length] = new Option(text, value);
    }
    //重置select选项
    function resetOptions(id) {
        var obj = document.getElementById(id);
        while (obj.options.length > 1) {
            obj.remove(1);
        }
    }
    //获取选中的值
    function getSelectValue(id) {
        var obj = document.getElementById(id);

        return obj.options[obj.selectedIndex].value;
    }
    //设置onchange事件
    function setChange(obj, data, i) {
        addEvent(obj, 'change', function(){
            //重置本级以后所有的select
            for (var j = i+1; j < config.select.length; j++) {
                resetOptions(config.select[j].id);
            }
            //如果当前不是默认选项，设置下一级的相应选项
            var v = config.select[i].value ? config.select[i].value : '';
            if (this.value != v) {
                var next_obj = document.getElementById(config.select[i+1].id);
                var next_data = data;
                for (var x = 0; x <= i; x++) {
                    var index = getSelectValue(config.select[x].id);
                    next_data = next_data[index];
                }
                for (var d in next_data) {
                    //next_data可能是数组也可能是object
                    var k = next_data.length ? next_data[d] : d;
                    setOption(next_obj, k, k);
                }
            }
        });
    }
    var _addEventArr = new Array();
    function addEvent(d, c, b) {
        var a = d;
        if (typeof(d) == "string") {
            d = document.getElementById(d)
        } else {
            a = d.id
        }
        if (_addEventArr[a] == 1) {
            return
        } else {
            _addEventArr[a] = 1
        }
        if (d.addEventListener) {
            d.addEventListener(c, b, false)
        } else {
            if (d.attachEvent) {
                d.attachEvent("on" + c, function() {
                    return b.apply(d, new Array(window.event))
                })
            }
        }
    }
    //初始化
    function init(data) {
        for (var i in config.select) {
//      	config.select[i].id = prefix + config.select[i].id
            var item = config.select[i];
            var obj = document.getElementById(item.id);
            var text = item.text ? item.text : '请选择';
            var value = item.value ? item.value : '';
            //设置默认选项
            setDefault(obj, text, value);
            //为第一级设置选项
            if (i == 0) {
                for (var d in data) {
                    setOption(obj, d, d);
                }
            }
            //除了最后一级，设置onchange事件
            if (i < config.select.length - 1) {
                setChange(obj, data, parseInt(i));
            }
        }
    };
    if (config.data) {
        init(config.data);
    } else if (config.url) {
        loader('ajax/ajax', function(){
            $.ajax.getJSON(config.url, function(data){
                init(data);
            });
        });
    } else {
        alert('linkage has no data or url');
    }
};
